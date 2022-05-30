'use strict'

const await = require('await-stream-ready/lib/await')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
        const { INTEGER, DATE, STRING } = Sequelize
        await queryInterface.changeColumn('my_user', 'avatar', {
            type: STRING(200),
            comment: '头像',
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
