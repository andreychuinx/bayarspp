'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email       : 'admin@admin.com',
      password    : '$2b$10$mlt7Le2d8wXjVm8LC7oQtO1ugsGpoYRNchOVCSftNDZ6T2qX7zxPe',
      role        : 'admin',
      createdAt   : new Date(),
      updatedAt   : new Date()
    }, {
      email       : 'user_1@user.com',
      password    : '$2b$10$mlt7Le2d8wXjVm8LC7oQtO1ugsGpoYRNchOVCSftNDZ6T2qX7zxPe',
      role        : 'admin',
      createdAt   : new Date(),
      updatedAt   : new Date()
    }, {
      email       : 'user_2@user.com',
      password    : '$2b$10$mlt7Le2d8wXjVm8LC7oQtO1ugsGpoYRNchOVCSftNDZ6T2qX7zxPe',
      role        : 'admin',
      createdAt   : new Date(),
      updatedAt   : new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
