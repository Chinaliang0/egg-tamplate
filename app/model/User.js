'use strict'

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize

    const User = app.model.define(
        'my_user',
        {
            id: { type: INTEGER, primaryKey: true, autoIncrement: true },
            nickname: { type: STRING(30), comment: '用户昵称' },
            username: { type: STRING(64), comment: '账号' },
            password: { type: STRING(32), comment: '密码' },
            phone: { type: STRING(11), comment: '手机号码' },
            email: { type: STRING(64), comment: '邮箱' },
            age: { type: INTEGER, comment: '性别 0 女 1 男' },
            avatar: { type: STRING(32), comment: '头像' },
            is_admin: { type: INTEGER, comment: '是否管理员 0 否 1是' },
            role_id: { type: INTEGER, comment: '角色id' },
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
    User.associate = function () {
        app.model.User.belongsTo(app.model.Role, {
            foreignKey: 'role_id',
            as: 'role',
            targetKey: 'id',
        })
        // app.model.User.belongsTo(app.model.ArticleTag, {
        //     foreignKey: 'id',
        //     as: 'articleTag',
        //     targetKey: 'user_id',
        // })
    }
    return User
}
