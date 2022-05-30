/* eslint-disable jsdoc/check-param-names */
'use strict'
const Controller = require('egg').Controller

class SmsController extends Controller {
    async index() {
        const { ctx, app } = this
        const { phone } = ctx.request.body
        const data = await ctx.service.front.sms.smsSend({ phone })
        ctx.helper.result(ctx, data)
    }

    async login() {
        const { ctx, app } = this
        const data = await ctx.service.front.sms.login(ctx.request.body)
        ctx.helper.result(ctx, data)
    }
}
module.exports = SmsController
