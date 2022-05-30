'use strict'
module.exports = {
    schedule: {
        interval: '10s',
        type: 'all', // 指定所有的 worker 都需要执行
        disable: true,
    },
    async task(ctx) {
        console.log('这是定时器')
        // const res = await ctx.curl('http://www.api.com/cache', {
        //     dataType: 'json',
        // })
        // ctx.app.cache = res.data
    },
}
