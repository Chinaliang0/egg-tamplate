'use strict'

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize

    const Attachment = app.model.define(
        'my_attachment',
        {
            extname: { type: STRING(50), comment: '' },
            filename: { type: STRING(50), comment: '' },
            url: {
                type: STRING(50),
                comment: '',
                get() {
                    return app.config.ossUrl + this.getDataValue('url')
                },
            },
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
    return Attachment
}
