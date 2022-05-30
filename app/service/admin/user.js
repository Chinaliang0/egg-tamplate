'use strict'

const Service = require('egg').Service
const crypto = require('crypto')
const await = require('await-stream-ready/lib/await')
class serviceUser extends Service {
    async list(paging, search) {
        const { ctx, app } = this
        const { Op } = app.Sequelize
        const { username } = search
        const where = {}

        if (username) where.username = { [Op.like]: '%' + username + '%' }
        const data = await ctx.model.User.findAndCountAll({
            ...paging,
            where,
            include: {
                model: ctx.model.Role,
                as: 'role',
            },
            raw: false,
        })
        return ctx.helper.succful(data, '获取成功！')
    }
    async login(params) {
        const data = await this.ctx.model.User.findOne({ where: { username: params.username } })
        const { ctx, app } = this
        if (data !== null) {
            let token = null
            if (data.is_admin !== 1) return ctx.helper.fail({}, '该账号不是管理员！', 404)
            const password = crypto.createHash('md5').update(params.password).digest('hex')
            if (password !== data.password) {
                return ctx.helper.fail({}, '用密码不正确！', 404)
            }
            token = this.ctx.app.jwt.sign(params, this.app.config.jwt.secret, {
                expiresIn: this.app.config.security.expiresIn,
            })
            return ctx.helper.succful({ token }, '获取成功！')
        }
        return ctx.helper.fail({}, '用户不存在！', 404)
    }
    async create(params) {
        const { ctx } = this
        const data = await this.ctx.model.User.findOne({ where: { username: params.username } })
        if (data !== null) {
            return ctx.helper.fail(null, '用户存在！', 404)
        }
        params.password = crypto.createHash('md5').update(params.password).digest('hex')
        return ctx.helper.succful(this.ctx.model.User.create(params), '创建成功')
    }

    async info() {
        const { ctx } = this
        const user = ctx.state.user
        const data = await ctx.model.User.findOne({
            where: { username: user.username },
            attributes: { exclude: ['password'] },
        })
        data.roles = []
        const permissionList = await ctx.model.RolePermission.findAll({
            where: { role_id: data.role_id },
            include: {
                model: ctx.model.Permission,
                as: 'permission',
            },
            // group: 'permission_id',
        })
        const permissionIdList = permissionList.map(item => item.permission_id)
        const tree = await ctx.model.Permission.findAll({
            where: {
                id: permissionIdList,
            },
            attributes: { exclude: ['permission_id'] },
        })
        const parseData = JSON.parse(JSON.stringify(tree))
        // const toTreeData = await toTree(parseData)
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
        data.avatar = this.config.ossUrl + data.avatar
        data.setDataValue('roles', parseData)
        return data
    }
}

module.exports = serviceUser
