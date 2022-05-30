'use strict'

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize
    const { model } = app
    const Article = model.define(
        'my_article',
        {
            id: { type: INTEGER, primaryKey: true, autoIncrement: true },
            title: { type: STRING(30), comment: '' },
            user_id: { type: INTEGER, comment: '' },
            img_url: {
                type: STRING(200),
                comment: '',
                get() {
                    if (this.getDataValue('img_url')) {
                        if (this.getDataValue('img_url').indexOf(this.getDataValue('img_url')) > -1) {
                            return this.getDataValue('img_url')
                        }
                        return app.config.ossUrl + this.getDataValue('img_url')
                    }
                    return null
                },
            },
            content: { type: STRING(6000), comment: '' },
            created_at: DATE,
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
    Article.associate = function () {
        model.Article.belongsToMany(model.Tag, {
            as: 'article_tag',
            through: model.ArticleTag,
            foreignKey: 'article_id',
        })
        model.Article.belongsTo(model.User, {
            as: 'user',
            targetKey: 'id',
            foreignKey: 'user_id',
          
        })
        // app.model.Role.hasMany(app.model.Tag, {
        //     as: 'user',
        //     foreignKey: 'id',
        //     targetKey: 'role_id',
        // })
        // app.model.Article.hasMany(app.model.Tag, {
        //     foreignKey: 'tag_id',
        //     as: 'tag',
        //     targetKey: 'id',
        // })
    }
    return Article
}
