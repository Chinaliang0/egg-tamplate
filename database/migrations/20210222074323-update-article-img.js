'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
        const { STRING } = Sequelize
        return Promise.all([
            queryInterface.addColumn('my_article', 'img_url', {
                type: STRING(200),
                comment: '图片路径',
                after: 'content',
            }),
            queryInterface.removeColumn('my_article', 'article_tag_id'),
        ])
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
