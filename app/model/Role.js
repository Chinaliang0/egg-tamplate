'use strict'

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize

    const Role = app.model.define(
        'my_role',
        {
            id: { type: INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: STRING(30), comment: '角色名称' },
            status: { type: INTEGER, comment: '0 不可用 1可用' },
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
    Role.associate = function () {
        app.model.Role.hasMany(app.model.User, {
            as: 'user',
            foreignKey: 'id',
            targetKey: 'role_id',
        })
        app.model.Role.belongsToMany(app.model.Permission, {
            as: 'rolePermission',
            through: app.model.RolePermission,
            foreignKey: 'role_id',
        })
    }
    return Role
}
