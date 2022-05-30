/* eslint-disable jsdoc/check-param-names */
'use strict'
const Controller = require('egg').Controller
const WXBizDataCrypt = require('../../utils/WXBizDataCrypt')

class WxLoginController extends Controller {
    async index() {
        const { ctx, app } = this
        const { encryptedData, iv, session_key, nickName, avatarUrl } = ctx.request.body
        const pc = new WXBizDataCrypt(this.config.wxConfig.appid, session_key)
        const data = pc.decryptData(encryptedData, iv)
        const user = await this.ctx.model.User.findOne({ where: { phone: data.phoneNumber } })
        if (user == null) {
            this.ctx.model.User.create({
                nickname: nickName,
                phone: data.phoneNumber,
                avatar: avatarUrl,
            })
        }
        ctx.helper.success(
            ctx,
            {
                ...data,
                nickName,
                avatarUrl,
            },
            '获取成功'
        )
    }

    async openid() {
        // https://api.weixin.qq.com/sns/jscode2session
        const { ctx, app } = this
        const { code } = ctx.query
        const res = await ctx.curl('https://api.weixin.qq.com/sns/jscode2session', {
            data: {
                appid: this.config.wxConfig.appid,
                secret: this.config.wxConfig.secret,
                js_code: code,
            },
            dataType: 'json',
        })
        ctx.helper.success(ctx, { ...res.data }, '获取成功')
    }
}
module.exports = WxLoginController
