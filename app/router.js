'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, jwt } = app
    router.prefix('/api')
    require('./router/admin')(app)
    require('./router/front')(app)
    router.post('/admin/user/create', controller.admin.user.create)
    router.get('/user', controller.admin.user.index)
    router.post('/role/create', controller.admin.role.create)
    router.get('/permission', controller.admin.role.permission)
    router.post('/admin/upload/img', controller.admin.upload.create)
    router.post('/admin/upload/oss/img', jwt, controller.admin.upload.creataOss)
    router.post('/admin/upload/oss/file', jwt, controller.admin.upload.createFile)
    router.post('/wx/user', controller.wx.login.index)
    router.get('/wx/getopenid', controller.wx.login.openid)
    router.post('/wx/info', controller.wx.index.index)

}
