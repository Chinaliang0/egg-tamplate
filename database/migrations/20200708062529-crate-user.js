'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
        const { INTEGER, DATE, STRING } = Sequelize
        await queryInterface.createTable('my_user', {
            id: { type: INTEGER, primaryKey: true, autoIncrement: true },
            nickname: { type: STRING(30), comment: '用户昵称' },
            username: { type: STRING(64), comment: '账号' },
            password: { type: STRING(32), comment: '密码' },
            phone: { type: STRING(11), comment: '手机号码' },
            email: { type: STRING(64), comment: '邮箱' },
            age: { type: INTEGER, comment: '性别 0 女 1 男' },
            avatar: { type: STRING(32), comment: '头像' },
            is_admin: { type: INTEGER, comment: '是否管理员 0 否 1是' },
            role_id: { type: INTEGER, comment: '角色id' },
            created_at: DATE,
            updated_at: DATE,
            deleted_at: DATE,
        })
    },

    down: (queryInterface, Sequelize) => {
        /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    },
}
