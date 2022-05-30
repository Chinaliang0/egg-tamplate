'use strict';
module.exports = () => {
    return async function validateApi(ctx, next) {
        const sign = ctx.request.header.sign;
        console.log(sign);
        // await next()
        if (sign === 'ee') {
            await next()
        } else {
            ctx.throw(401, 'sign not found');
        }
    };
};
