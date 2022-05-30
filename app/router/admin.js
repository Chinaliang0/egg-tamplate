'use strict'
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, jwt } = app
    router.post('/admin/user/login', controller.admin.user.login)
    router.get('/admin/user/info', jwt, controller.admin.user.info)
    router.get('/admin/user', jwt, controller.admin.user.index)
    router.get('/admin/article', controller.admin.article.index)
    router.get('/admin/article/:id', controller.admin.article.info)
    router.post('/admin/article/create', jwt, controller.admin.article.create)
    router.post('/admin/article/update', jwt, controller.admin.article.update)
    router.post('/admin/article/delete', jwt, controller.admin.article.delete)
    router.get('/admin/role', controller.admin.role.index)
    router.get('/admin/role/info', controller.admin.role.info)
    router.get('/admin/role/permission', controller.admin.role.permission)
    router.post('/admin/role/permission/update', controller.admin.role.update)
    router.get('/admin/tag', controller.admin.tag.index)
    router.get('/admin/tagList', controller.admin.tag.pageList)
    router.post('/admin/tag/create', jwt, controller.admin.tag.create)
    router.get('/admin/flutter', controller.admin.flutter.index)
}
