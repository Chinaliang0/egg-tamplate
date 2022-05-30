/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = (exports = {})

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1594177457587_8070'
    config.jwt = {
        secret: '$.liang',
        match: '/api/admin/',
    }
    // ignore 忽略路由
    config.middleware = ['auth', 'validateApi', 'errorHandler']
    config.auth = {
        ignore: ['/api/front/sms/send', '/api/front/sms/login', '/api/wx/getopenid', '/api/admin/user/login'],
    }
    config.errorHandler = {
        match: ['/api'],
    }
    config.validateApi = {
        match: ['/api/v1'],
    }

    config.sequelize = {
        dialect: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        password: '123456',
        database: 'my_app',
        timezone: '+08:00',
        dialectOptions: {
            dateStrings: true,
            typeCast: true,
        },
    }
    config.multipart = {
        fileExtensions: ['.apk', '.pptx', '.docx', '.csv', '.doc', '.ppt', '.pdf', '.pages', '.wav', '.mov', 'jpg'], // 增加对 .apk 扩展名的支持
    }
    exports.security = {
        csrf: false,
        expiresIn: '24H',
    }
    exports.ossUrl = 'http://liangliangooaaa.oss-cn-shenzhen.aliyuncs.com/'
    // 微信小程序
    exports.wxConfig = {
        appid: 'xx',
        secret: 'xx',
    }
    // 微信公众号
    exports.wxPublicConfig = {
        appid: 'xx',
        secret: 'xx',
        token: 'liang',
    }
    // exports.oss = {
    //     client: {
    //         accessKeyId: 'xx',
    //         accessKeySecret: 'xx',
    //         bucket: 'xx',
    //         endpoint: 'xx',
    //         timeout: 'xx',
    //     },
    // }
    // config/config.default.js
    exports.i18n = {
        // 默认语言，默认 "en_US"
        defaultLocale: 'zh-CN',
        // URL 参数，默认 "locale"
        queryField: 'locale',
        // Cookie 记录的 key, 默认："locale"
        // cookieField: 'locale',
        // // Cookie 的 domain 配置，默认为空，代表当前域名有效
        // cookieDomain: '',
        // // Cookie 默认 `1y` 一年后过期， 如果设置为 Number，则单位为 ms
        // cookieMaxAge: '1y',
    }
    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    }
    config.validate = {
        // convert: true,
        // widelyUndefined: true,
    }

    return {
        ...config,
    }
}
