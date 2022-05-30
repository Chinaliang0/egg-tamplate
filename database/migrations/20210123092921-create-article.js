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
        await queryInterface.createTable('my_article', {
            id: { type: INTEGER, primaryKey: true, autoIncrement: true },
            title: { type: STRING(30), comment: '标题' },
            user_id: { type: INTEGER, comment: '' },
            article_tag_id: { type: INTEGER, comment: '' },
            content: { type: STRING(6000), comment: '' },
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
