'use strict'
module.exports = app => {
    const { validator } = app

    // 校验用户名是否正确
    validator.addRule('articleTitle', (rule, value) => {
        const { required, message } = rule
        if (required) if (!value) return message
    })

    // 校验用户名是否正确
    validator.addRule('articleContent', (rule, value) => {
        const { required, message } = rule
        if (required) if (value) return message
        if (/^\d+$/.test(value)) {
            return '内容应该是字符串'
        } else if (value.length < 10) {
            return '内容的长度应该在10'
        }
    })

    // 添加自定义参数校验规则
    validator.addRule('articleId', (rule, value) => {
        const { required, message } = rule
        if (required) if (!value) return message
    })
}
