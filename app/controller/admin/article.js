/* eslint-disable jsdoc/check-param-names */
'use strict'
const Controller = require('egg').Controller

/*
    author: junup
    time: 2020-06-02 15-40-19
    function:
*/

/**
 *  @param {String} content 内容
 *  @param {String} title 标题
 *  @param {Array} tab_ids 标签
 *
 */

class ArticleController extends Controller {
    async index() {
        const { ctx } = this
        // const rule = {
        //     page: { type: 'string', required: true, message: '分页' },
        //     limit: { type: 'string', required: true, message: '分页数量' },
        //     username: { type: 'string', required: true, message: '用户名' },
        // }
        // ctx.validate(rule, ctx.query)
        const { title, tagId } = ctx.query
        console.log(ctx.params()); 

        const page = ctx.helper.parseInt(ctx.query.page || 1)
        const limit = ctx.helper.parseInt(ctx.query.limit || 10)
        const paging = { limit, offset: (page - 1) * limit }
        const search = { title, tagId }
        const data = await ctx.service.admin.article.list(paging, search)
        ctx.helper.success(ctx, data, '获取成功')
    }
    async create() {
        const { ctx, app } = this
        const { title, content } = ctx.request.body
        const rule = {
            title: { type: 'articleTitle', required: true, message: '标题不能为空' },
            // content: { type: 'articleTitle', required: true, message: '标题不能为空' },
        }
        ctx.validate(rule, { title, content })
        const data = await ctx.service.admin.article.create(ctx.request.body)
        ctx.helper.success(ctx, data, '创建成功')
    }
    async update() {
        const { ctx, app } = this
        const rule = {
            title: { type: 'articleTitle', required: true, message: '标题不能为空' },
            // content: { type: 'articleTitle', required: true, message: '标题不能为空' },
        }
        ctx.validate(rule, ctx.request.body)
        const data = await ctx.service.admin.article.update(ctx.request.body)
        ctx.helper.success(ctx, data, '修改成功')
    }
    async delete() {
        const { ctx, app } = this
        const { id } = ctx.request.body
        const rule = {
            id: { type: 'articleId', required: true, message: 'id不能为空' },
            // content: { type: 'articleTitle', required: true, message: '标题不能为空' },
        }
        ctx.validate(rule, { id })
        const data = await ctx.service.admin.article.delete(ctx.request.body)
        ctx.helper.result(ctx, data)
    }
    async info() {
        const { ctx, app } = this
        const { id } = ctx.params
        const data = await ctx.service.admin.article.info(id)
        ctx.helper.success(ctx, data, '获取成功')
    }
}
module.exports = ArticleController
