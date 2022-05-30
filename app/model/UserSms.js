'use strict'

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize
    const { model } = app
    const Tag = app.model.define(
        'my_user_sms',
        {
            id: { type: INTEGER, primaryKey: true, autoIncrement: true },
            phone: { type: STRING },
            sms_code: { type: STRING(6) },
            status: {
                type: INTEGER(1),
                defaultValue: 0,
            },
            type: { type: INTEGER },
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
    return Tag
}
