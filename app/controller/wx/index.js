/* eslint-disable jsdoc/check-param-names */
'use strict'
const Controller = require('egg').Controller
const sha1 = require('sha1')
const rawBody = require('raw-body')
const contentType = require('content-type')
const tool = require('../../utils/index')

const wxTextTemplate = ({ ToUserName, FromUserName, MsgType, MsgId, send = 'haha' }) => {
    const createTime = Date.parse(new Date())
    return `<xml>
    <ToUserName><![CDATA[${FromUserName}]]></ToUserName>
    <FromUserName><![CDATA[${ToUserName}]]></FromUserName>
    <CreateTime>${createTime}</CreateTime>
    <MsgType><![CDATA[${MsgType}]]></MsgType>
    <Content><![CDATA[${send}]]></Content>
    <MsgId>${MsgId}</MsgId>
    </xml>`
}

const getArrayFirstValue = arr => {
    if (Array.isArray(arr) && arr.length > 0) return arr[0]
    return null
}
class WxIndexController extends Controller {
    async index() {
        const { ctx, app } = this
        const { signature, echostr, timestamp, nonce } = ctx.query
        const str = [this.config.wxPublicConfig.token, timestamp, nonce].sort().join('')
        const sha = sha1(str)
        const data = await rawBody(ctx.req, {
            length: ctx.request.headers['content-length'],
            limit: '1mb',
            encoding: contentType.parse(ctx.request).parameters.charset,
        })
        const jsonData = await tool.parseXMLAsync(data)
        const getData = jsonData.xml
        const MsgType = getArrayFirstValue(getData.MsgType)
        const ToUserName = getArrayFirstValue(getData.ToUserName)
        const FromUserName = getArrayFirstValue(getData.FromUserName)
        const MsgId = getArrayFirstValue(getData.MsgId)
        const typeMsg = {
            text: wxTextTemplate({ MsgType, ToUserName, FromUserName, MsgId }),
        }
        this.ctx.body = typeMsg[MsgType]
        // if (sha === signature) this.ctx.body = echostr + ''
        // ctx.helper.success(ctx, , '获取成功！')
    }
}
module.exports = WxIndexController
