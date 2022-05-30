'use strict'

const Service = require('egg').Service
class serviceTag extends Service {
    async list(paging, search) {
        const { ctx, app } = this
        const { Op } = app.Sequelize
        const where = {}
        const data = await ctx.model.Tag.findAll({
            ...paging,
            where,
            raw: false,
        })
        return data
    }

    async pageList(paging, search) {
        const { ctx, app } = this
        const { Op } = app.Sequelize
        const where = {}
        const data = await ctx.model.Tag.findAndCountAll({
            ...paging,
            where,
            raw: false,
        })
        return data
    }
    async create({ name }) {
        const { ctx } = this
        // const user = ctx.state.user
        // const userData = await this.ctx.model.User.findOne({ where: { username: user.username } })
        const article = await ctx.model.Tag.create({ name })
        return article
    }
}

module.exports = serviceTag
