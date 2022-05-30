'use strict'

const Service = require('egg').Service
class serviceRole extends Service {
    async permission(params) {
        const { ctx } = this
        const tree = await ctx.model.Permission.findAll({})
        const parseData = JSON.parse(JSON.stringify(tree))
        const toTreeData = await toTree(parseData)
        function toTree(data) {
            // 删除 所有 children,以防止多次调用
            data.forEach(function (item) {
                delete item.children
            })

            // 将数据存储为 以 id 为 KEY 的 map 索引数据列
            const map = {}
            data.forEach(function (item) {
                // 在该方法中可以给每个元素增加其他属性
                item.text = item.name
                map[item.id] = item
            })
            //  console.log(map);

            const val = []
            data.forEach(function (item) {
                // 以当前遍历项，的pid,去map对象中找到索引的id
                const parent = map[item.permission_id]

                // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
                if (parent) {
                    // 可以给每个父节点添加属性
                    parent.iconCls = 'i-folder'
                    //  添加到父节点的子节点属性中
                    ;(parent.children || (parent.children = [])).push(item)
                } else {
                    // 如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
                    val.push(item)
                }
            })
            return val
        }
        return toTreeData
    }
    async list(paging, search) {
        const { ctx } = this
        const data = await ctx.model.Role.findAndCountAll({
            ...paging,
        })
        return data
    }
    async info({ roleId }) {
        const { ctx } = this

        const roleInfo = await ctx.model.Role.findOne({
            where: { id: roleId },
        })
        const permissionList = await ctx.model.RolePermission.findAll({
            where: { role_id: roleId },
            include: {
                model: ctx.model.Role,
                as: 'role',
            },
        })

        const permissionIdList = permissionList.map(item => item.permission_id)
        const tree = await ctx.model.Permission.findAll({
            where: {
                id: permissionIdList,
            },
        })
        return ctx.helper.succful({ role: roleInfo, roleList: tree }, '获取成功！')
    }
    //
    async update({ id, roleList }) {
        const { ctx } = this
        const role = await this.ctx.model.Role.findByPk(id)
        const permissions = await this.ctx.model.Permission.findAll({ where: { id: roleList } })
        role.setRolePermission(permissions)
        return ctx.helper.succful(role, '获取成功！')
    }
}

module.exports = serviceRole
