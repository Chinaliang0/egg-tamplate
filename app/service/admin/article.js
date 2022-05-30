'use strict'

const Service = require('egg').Service
/**
 * @params {distinct}  因为使用了连表查询的方式，当前的 pageList count 会是详情查询的的综合数量。使用distinct:true 不会查询详情
 * @params  attributes: { exclude: [] },
 */
class serviceUser extends Service {
    async list(paging, search) {
        const { ctx, app } = this
        const { Op, col, fn } = app.Sequelize
        const { title, tagId } = search
        const where = {}
        let tagWhere
        if (title) where.title = { [Op.like]: '%' + title + '%' }
        // where['$article_tag.id$'] = tagId // 使用前提   duplicating  subQuery 使用这俩个属性（不使用子查询）
        // where.idd = 1
        if (tagId) {
            // 查询中间表
            const ArticleTagList = await ctx.model.ArticleTag.findAll({
                ...paging,
                where: { '$tag.id$': tagId },
                distinct: true,
                // right: true, // 右连接
                // paranoid: false, // 显示软删除数据
                subQuery: false, // 不使用子查询
                // duplicating: false,
                attributes: {
                    exclude: ['deleted_at', 'username'],
                },
                include: [
                    {
                        model: ctx.model.Tag,
                        as: 'tag',
                        attributes: {},
                    },
                    {
                        model: ctx.model.Article,
                        as: 'article',
                        attributes: { exclude: ['deleted_at', 'username'] },
                    },
                ],
                // raw: true,
                // required: true,
            })
            const articleIds = ArticleTagList.map(item => item.article_id)
            where.id = articleIds
        }
        const ArticleList = await ctx.model.Article.findAndCountAll({
            ...paging,
            where,
            distinct: true,
            right: true, // 右连接
            // paranoid: false, // 显示软删除数据
            // subQuery: false, // 不使用子查询
            // duplicating: false,
            attributes: {
                exclude: ['deleted_at', 'username'],
            },
            // attributes: [
            //     [fn('COUNT', col('article_tag.id')), 'article_tag.count'],
            //     {
            //         exclude: ['deleted_at', 'username'],
            //     },
            // ],
            order: [
                ['created_at', 'DESC'],
                ['article_tag', 'created_at', 'DESC'],
            ],
            include: [
                {
                    // all: true, // 要包含所有属性
                    // nested: true,
                    model: ctx.model.Tag,
                    as: 'article_tag',
                    // attributes: ['name', 'id'],
                    attributes: [
                        [col('id'), 'tag_id'],
                        [col('name'), 'tag_name'],
                    ],
                    through: { attributes: [] },
                    // duplicating: false, //  duplicating: false 将include标记为重复，将阻止使用子查询 
                },
                {
                    model: ctx.model.User,
                    as: 'user',
                    attributes: ['nickname'],
                },
            ],
            // raw: true,
            // required: true,
        })
        return ArticleList
    }
    async create({ article_tag, content, title, id, imgUrl }) {
        const { ctx } = this
        const user = ctx.state.user
        const userData = await this.ctx.model.User.findOne({ where: { username: user.username } })
        const article = await ctx.model.Article.create({ content, title, img_url: imgUrl, user_id: userData.id })
        const tags = await ctx.model.Tag.findAll({ where: { id: article_tag } })
        article.addArticle_tag(tags)
        return article
    }
    //
    async update({ article_tag, content, title, id, imgUrl }) {
        const article = await this.ctx.model.Article.findByPk(id)
        const tags = await this.ctx.model.Tag.findAll({ where: { id: article_tag } })
        article.update({ content, title, img_url: imgUrl })
        article.setArticle_tag(tags)
        article.setDataValue('tagid', tags)
        return article
    }
    async info(id) {
        const { ctx } = this
        const Article = await this.ctx.model.Article.findOne({
            where: { id },
            attributes: { exclude: ['deleted_at'] },
            include: [
                {
                    model: ctx.model.Tag,
                    as: 'article_tag',
                    through: { attributes: [] },
                    attributes: { exclude: ['deleted_at'] },
                },
                {
                    model: ctx.model.User,
                    as: 'user',
                    attributes: { exclude: ['deleted_at'] },
                },
            ],
        })
        return Article
    }
    //
    async delete({ id }) {
        const Article = await this.ctx.model.Article.findByPk(id)
        if (!Article) {
            // this.ctx.throw(404, 'Article not found')
            return this.ctx.helper.fail({}, '文章不存在！', 404)
        }
        // { force: true } 强行删除
        return this.ctx.helper.succful(Article.destroy(), '删除成功！') 
    }
}

module.exports = serviceUser
