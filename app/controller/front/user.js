'use strict'

const Controller = require('egg').Controller

/*
    author: junup
    time: 2020-06-02 15-40-19
    function:
*/
class UserController extends Controller {
    async index() {
        const { ctx } = this
        const rule = {
            page: { type: 'string', required: false, message: '分页' },
            limit: { type: 'string', required: false, message: '分页数量' },
            username: { type: 'string', required: false, message: '用户名' },
        }
        ctx.validate(rule, ctx.query)
        const page = ctx.helper.parseInt(ctx.query.page || 1)
        const limit = ctx.helper.parseInt(ctx.query.limit || 10)
        const paging = { limit, offset: (page - 1) * limit }
        const search = { username: ctx.query.username || null }
        const data = await ctx.service.front.user.list(paging, search)
        //  where: { username: { $link: username }
        // console.log(ctx.model.User.belongsTo(ctx.model.Role, { as: 'role' }));
        // ctx.model.User.belongsTo(ctx.model.Role, { as: 'role' })
        // console.log(ctx.model.Role)
        ctx.helper.success(ctx, data, '获取成功')
    }
    async create() {
        const { ctx, app } = this
        const rule = {
            username: { type: 'string', required: true, message: '用户名必填项' },
            password: { type: 'string', required: true, message: '密码必填项' },
        }
        ctx.validate(rule, ctx.request.body)
        const data = await ctx.service.front.user.create(ctx.request.body)
        ctx.helper.result(ctx, data)
    }
    async login() {
        const { ctx, app } = this
        const rule = {
            username: { type: 'string', required: true, message: '用户名必填项' },
            password: { type: 'string', required: true, message: '密码必填项' },
        }
        ctx.validate(rule, ctx.request.body)
        const result = await ctx.service.front.user.login(ctx.request.body)
        ctx.helper.result(ctx, result)
    }

    async info() {
        const { ctx, app } = this
        const data = await ctx.service.front.user.info()
        ctx.helper.success(ctx, data, '获取成功！')
    }
}
module.exports = UserController
