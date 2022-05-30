'use strict'

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize

    const ArticleTag = app.model.define(
        'my_article_tag',
        {
            id: { type: INTEGER, primaryKey: true, autoIncrement: true },
            article_id: { type: INTEGER },
            tag_id: { type: INTEGER },
            updated_at: DATE,
            deleted_at: DATE,
        },
        {
            freezeTableName: true,
            // 将createdAt对应到数据库的created_at字段
            createdAt: 'created_at',
            // 将updatedAt对应到数据库的updated_at字段
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            paranoid: true,
        }
    )
    ArticleTag.associate = function () {
        app.model.ArticleTag.belongsTo(app.model.Tag, {
            as: 'tag',
        })
        app.model.ArticleTag.belongsTo(app.model.Article, {
            as: 'article',
        })
    }
    return ArticleTag
}
