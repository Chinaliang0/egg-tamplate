'use strict'

const Controller = require('egg').Controller

/*
    author: junup
    time: 2020-06-02 15-40-19
    function:
*/
class TagController extends Controller {
    async index() {
        const { ctx, app } = this
        const { Op } = app.Sequelize
        const rule = {
            page: { type: 'string', required: true, message: '分页' },
            limit: { type: 'string', required: true, message: '分页数量' },
        }
        const data = await ctx.service.admin.tag.list()
        ctx.helper.success(ctx, data, '获取成功')
    }
    async pageList() {
        const { ctx } = this
        const page = ctx.helper.parseInt(ctx.query.page || 1)
        const limit = ctx.helper.parseInt(ctx.query.limit || 10)
        const paging = { limit, offset: (page - 1) * limit }
        const rule = {
            page: { type: 'string', required: true, message: '分页' },
            limit: { type: 'string', required: true, message: '分页数量' },
        }
        const data = await ctx.service.admin.tag.pageList(paging)
        ctx.helper.success(ctx, data, '获取成功')
    }
    async create() {
        const { ctx, app } = this
        const { name } = ctx.request.body
        const rule = {
            name: { type: 'articleTitle', required: true, message: '标签名称不能为空' },
            // content: { type: 'articleTitle', required: true, message: '标题不能为空' },
        }
        ctx.validate(rule, { name })
        const data = await ctx.service.admin.tag.create(ctx.request.body)
        ctx.helper.success(ctx, data, '创建成功')
    }
}
module.exports = TagController
