'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bendaharas', [{
      username: 'admin@admin.com',
      password: '$2b$10$mlt7Le2d8wXjVm8LC7oQtO1ugsGpoYRNchOVCSftNDZ6T2qX7zxPe',
      nama: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'user_1@user.com',
      password: '$2b$10$mlt7Le2d8wXjVm8LC7oQtO1ugsGpoYRNchOVCSftNDZ6T2qX7zxPe',
      nama: 'user_1',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'user_2@user.com',
      password: '$2b$10$mlt7Le2d8wXjVm8LC7oQtO1ugsGpoYRNchOVCSftNDZ6T2qX7zxPe',
      nama: 'user_2',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Bendaharas', null, {})
  }
};
