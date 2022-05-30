'use strict'

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize

    const Permission = app.model.define(
        'my_permission',
        {
            id: { type: INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: STRING(30), comment: '权限名称' },
            status: { type: INTEGER, comment: '0 不可用 1可用' },
            permission_id: { type: INTEGER, comment: '当前表id' },
            uri: { type: STRING(200), unique: true, after: 'name', comment: '唯一权限' },
            created_at: DATE,
            updated_at: DATE,
            deleted_at: DATE,
        },
        {
            freezeTableName: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            paranoid: true,
        }
    )
    Permission.associate = function () {
        app.model.Permission.belongsTo(app.model.Permission, {
            as: 'permission',
            foreignKey: 'permission_id',
        })
        app.model.Permission.belongsToMany(app.model.Role, {
            as: 'permissionRole',
            through: app.model.RolePermission,
            foreignKey: 'permission_id',
        })
    }
    return Permission
}
