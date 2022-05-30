'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
        const { STRING } = Sequelize
        return queryInterface.addColumn('my_permission', 'uri', {
            type: STRING(200),
            comment: '唯一权限',
            unique: true,
            after: 'name',
        })
    },

    down: (queryInterface, Sequelize) => {
        /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
      
    */
        return queryInterface.removeColumn('my_permission', 'uri')
    },
}
