'use strict'
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, jwt } = app
    router.post('/front/sms/send', controller.front.sms.index)
    router.post('/front/sms/login', controller.front.sms.login)
    router.get('/front/user/info', jwt, controller.front.user.info)
}
