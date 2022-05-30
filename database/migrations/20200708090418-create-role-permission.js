'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('my_role_permission', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      role_id: { type: STRING(30), comment: '角色id' },
      permission_id: { type: INTEGER, comment: '权限id' },
      created_at: DATE,
      updated_at: DATE,
      deleted_at: DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
