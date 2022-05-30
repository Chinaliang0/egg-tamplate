'use strict'
const moment = require('moment')
exports.parseInt = string => {
    if (typeof string === 'number') return string
    if (!string) return string
    return parseInt(string) || 0
}
exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss')
exports.success = (ctx, res, msg, code = 200) => {
    ctx.body = {
        code,
        data: res,
        msg,
    }
    ctx.status = 200
}
exports.fail = (res, msg, code = 404) => {
    if (typeof res === 'string') {
        return { data: null, msg: res, code }
    }
    return { data: res, msg, code }
}
exports.succful = (res, msg, code = 200) => {
    return { data: res, msg, code }
}
exports.result = (ctx, { data, msg = '', code = 200 }) => {
    ctx.body = {
        code,
        data,
        msg,
    }
    ctx.status = 200
}
exports.validate = (rule, params) => {}
