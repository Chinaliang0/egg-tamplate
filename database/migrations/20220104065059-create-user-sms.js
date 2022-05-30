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
        await queryInterface.createTable('my_user_sms', {
            id: { type: INTEGER, primaryKey: true, autoIncrement: true },
            phone: { type: STRING, comment: '手机号' },
            sms_code: { type: STRING(6), comment: '验证码' },
            status: { type: INTEGER(1), comment: '1为已使用，0为未使用' },
            type: { type: INTEGER, comment: '短信类型' },
            created_at: DATE,
            updated_at: DATE,
            deleted_at: DATE,
        })
    },

    down: async (queryInterface, Sequelize) => {
        /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
        await queryInterface.dropTable('my_user_sms')
    },
}
