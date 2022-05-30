'use strict'

const Service = require('egg').Service
const utils = require('../../utils/index')
class serviceSMS extends Service {
    async smsSend({ phone }) {
        const { ctx, app } = this
        const user = await ctx.model.User.findOne({ where: { phone } })
        // 发送验证码
        if (!user) return ctx.helper.fail('该手机号没注册！')
        const userCode = await ctx.model.UserSms.findOne({ where: { phone } })
        if (userCode) await userCode.destroy()
        const smsCode = utils.getSmsCode(6)
        ctx.model.UserSms.create({
            phone,
            sms_code: smsCode,
            type: 1,
        })
        return ctx.helper.succful({ smsCode }, '获取成功！')
    }
    // TODO: 需要完成验证码登录
    async login({ phone, code }) {
        const { ctx, app } = this
        const userSms = await ctx.model.UserSms.findOne({ where: { phone, status: 0 } })
        if (!userSms) return ctx.helper.fail('没有该手机号的验证码！')
        if (userSms.sms_code !== code) return ctx.helper.fail('验证码不正确！')
        await ctx.model.User.findOrCreate({ where: { phone } })
        await userSms.update({ status: 1 }, { where: phone })
        const token = ctx.app.jwt.sign({ phone, code }, app.config.jwt.secret, {
            expiresIn: app.config.security.expiresIn,
        })
        return ctx.helper.succful({ token }, '手机验证码登录成功！')
    }
}

module.exports = serviceSMS
