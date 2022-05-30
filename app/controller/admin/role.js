'use strict'

const Controller = require('egg').Controller

/*
    author: junup
    time: 2020-06-02 15-40-19
    function:
*/
class RoleController extends Controller {
    async index() {
        const { ctx, app } = this
        const { Op } = app.Sequelize
        const rule = {
            page: { type: 'string', required: true, message: '分页' },
            limit: { type: 'string', required: true, message: '分页数量' },
        }
        const data = await ctx.service.admin.role.list()
        ctx.helper.success(ctx, data, '获取成功')
    }
    async info() {
        const { ctx, app } = this
        const { Op } = app.Sequelize
        const roleId = ctx.query.roleId
        const data = await ctx.service.admin.role.info({ roleId })
        ctx.helper.result(ctx, data)
    }

    async permission() {
        const { ctx, app } = this
        const data = await ctx.service.admin.role.permission()
        ctx.helper.success(ctx, data, '获取成功')
    }
    async create() {
        const { ctx, app } = this
        const name = ctx.request.body.name
        const data = this.ctx.model.Role.create({ name })
        // const data = await ctx.service.admin.user.create(ctx.request.body)
        ctx.helper.success(ctx, data, '创建成功')
    }
    async update() {
        const { ctx, app } = this
        const data = this.ctx.service.admin.role.update(ctx.request.body)
        ctx.helper.result(ctx, data)
    }
}
module.exports = RoleController
