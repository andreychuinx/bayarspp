'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Perkiraans', [{
      no_perkiraan: 100001,
      nama_perkiraan: 'Pendapatan SPP',
      type_perkiraan: 'pendapatan_spp',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      no_perkiraan: 100002,
      nama_perkiraan: 'Pendapatan Praktek',
      type_perkiraan: 'pendapatan_praktek',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      no_perkiraan: 100002,
      nama_perkiraan: 'Piutang SPP',
      type_perkiraan: 'piutang_spp',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      no_perkiraan: 100002,
      nama_perkiraan: 'Piutang Praktek',
      type_perkiraan: 'piutang_praktek',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      no_perkiraan: 100002,
      nama_perkiraan: 'Kas',
      type_perkiraan: 'kas',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Perkiraans', null, {})
  }
};
