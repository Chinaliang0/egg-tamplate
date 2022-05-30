'use strict'
module.exports = options => {
    return async function jwt(ctx, next) {
        const authorization = ctx.request.header.authorization || ''
        const splitPrefix = authorization.split('Bearer ')
        const token = splitPrefix.length > 1 && splitPrefix[1]
        let decode
        if (token) {
            try {
                // 解码token
                decode = ctx.app.jwt.verify(token, options.secret)
                ctx.state.user = decode
                await next()
            } catch (err) {
                ctx.status = 400
                ctx.body = {
                    code: ctx.status,
                    data: null,
                    msg: 'token 过期',
                }
                return
            }
        } else {
            ctx.status = 400
            ctx.body = {
                code: ctx.status,
                data: null,
                msg: 'No authorization token was found',
            }
            return
        }
    }
}
