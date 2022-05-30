'use strict'

const Service = require('egg').Service
const crypto = require('crypto')
class serviceUser extends Service {
    async list(paging, search) {
        const { ctx, app } = this
        const { Op } = app.Sequelize
        const { username } = search
        const where = {}

        if (username) where.username = { [Op.like]: '%' + username + '%' }
        const data = await ctx.model.User.findAndCountAll({
            ...paging,
            where,
            include: {
                model: ctx.model.Role,
                as: 'role',
            },
            raw: false,
        })
        return data
    }
    // async find(id) {
    //     const user = await this.ctx.model.User.findByPk(id);
    //     if (!user) {
    //         this.ctx.throw(404, 'user not found');
    //     }
    //     return user;
    // }
    //
    async login(params) {
        const data = await this.ctx.model.User.findOne({ where: { username: params.username } })
        const { ctx, app } = this
        if (data !== null) {
            // if(data)
            let token = null
            if (data.is_admin !== 1) return ctx.helper.fail({}, '该账号不是管理员！', 404)
            const password = crypto.createHash('md5').update(params.password).digest('hex')
            if (password !== data.password) {
                return ctx.helper.fail({}, '用密码不正确！', 404)
            }
            token = this.ctx.app.jwt.sign(params, this.app.config.jwt.secret, {
                expiresIn: this.app.config.security.expiresIn,
            })
            return ctx.helper.succful({ token }, '获取成功！')
        }
        return ctx.helper.fail({}, '用户不存在！', 404)
    }
    async create(params) {
        const { ctx } = this
        const data = await this.ctx.model.User.findOne({ where: { username: params.username } })
        if (data !== null) {
            return ctx.helper.fail(null, '用户存在！', 404)
        }
        params.password = crypto.createHash('md5').update(params.password).digest('hex')
        return ctx.helper.succful(this.ctx.model.User.create(params), '创建成功')
    }

    async info() {
        const { ctx, app } = this
        const { Op } = app.Sequelize
        const { username = '', phone = '' } = ctx.state.user
        const data = await ctx.model.User.findOne({
            where: {
                [Op.or]: [
                    {
                        username,
                    },
                    {
                        phone,
                    },
                ],
            },
            attributes: { exclude: ['password'] },
        })
        // ctx.logger.info('打印日志：', phone)
        data.avatar = this.config.ossUrl + data.avatar
        return data
    }
    //
    // async update({ id, updates }) {
    //     const user = await this.ctx.model.User.findByPk(id);
    //     if (!user) {
    //         this.ctx.throw(404, 'user not found');
    //     }
    //     return user.update(updates);
    // }
    //
    // async del(id) {
    //     const user = await this.ctx.model.User.findByPk(id);
    //     if (!user) {
    //         this.ctx.throw(404, 'user not found');
    //     }
    //     return user.destroy();
    // }
}

module.exports = serviceUser
