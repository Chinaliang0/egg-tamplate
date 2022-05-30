'use strict'

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize
    const { model } = app
    const Tag = app.model.define(
        'my_tag',
        {
            id: { type: INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: STRING },
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
    Tag.associate = function () {
        model.Tag.belongsToMany(model.Article, { as: 'TagArticle', through: model.ArticleTag, foreignKey: 'tag_id' })

        // app.model.Tag.belongsTo(app.model.ArticleTag, {
        //     foreignKey: 'id',
        //     as: 'tag',
        //     targetKey: 'tag_id',
        // })
    }
    return Tag
}
