'use strict'
/**
 * 
 * npx sequelize db:migrate --env production 
 * npx sequelize migration:generate --name=init-users
 * npx sequelize db:migrate
 */
const Controller = require('egg').Controller

class HomeController extends Controller {
    async index() {
        const { ctx } = this
        ctx.body = 'hi, egg'
    }
}

module.exports = HomeController
