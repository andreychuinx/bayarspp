'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Perkiraans', [{
      no_perkiraan: 100001,
      nama_perkiraan: 'Pendapatan SPP',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      no_perkiraan: 100002,
      nama_perkiraan: 'Pendapatan Praktek',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Perkiraans', null, {})
  }
};
