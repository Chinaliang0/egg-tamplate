'use strict'
module.exports = app => {
    const { validator } = app

    // 校验用户名是否正确
    validator.addRule('content', (rule, value) => {
        console.log('111111111')
        if (/^\d+$/.test(value)) {
            return '用户名应该是字符串'
        } else if (value.length < 3 || value.length > 10) {
            console.log('用户名的长度应该在3-10之间')
        }
    })

    // 添加自定义参数校验规则
    validator.addRule('123', (rule, value) => {
        if (value !== '123') {
            return 'must be 123'
        }
    })
}
