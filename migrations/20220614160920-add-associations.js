'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // return queryInterface.addColumn(
    //   'Menus',
    //   'UserId',
    //   {
    //     type: Sequelize.INTEGER,
    //     references: {
    //       model: 'Users',
    //       key: 'id',
    //     },
    //     onUpdate: 'CASCADE',
    //     onDelete: 'RESTRICT',
    //   }
    // )
    // .then(() => {
    //   return queryInterface.createTable('CoachTrainees',
    //   {
    //       CoachId: {
    //         type: Sequelize.INTEGER,
    //         references: { model: 'Users', key: 'id' }
    //       },
    //       TraineeId: {
    //         type: Sequelize.INTEGER,
    //         references: { model: 'Users', key: 'id' }
    //       },
    //   });
    // });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // return queryInterface.removeColumn(
    //   'Menus',
    //   'UserId'
    // )
    // .then(() => {
    //   return queryInterface.dropTable('CoachTrainees');
    // });
  }
};
