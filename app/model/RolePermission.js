'use strict'

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize

    const RolePermission = app.model.define(
        'my_role_permission',
        {
            id: { type: INTEGER, primaryKey: true, autoIncrement: true },
            role_id: { type: STRING(30), comment: '角色id' },
            permission_id: { type: INTEGER, comment: '权限id' },
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
    RolePermission.associate = function () {
        app.model.RolePermission.belongsTo(app.model.Role, { as: 'role' })
        app.model.RolePermission.belongsTo(app.model.Permission, { as: 'permission' })
    }
    return RolePermission
}
