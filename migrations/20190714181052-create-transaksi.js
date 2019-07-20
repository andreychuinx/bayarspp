'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transaksis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      siswaId: {
        type: Sequelize.INTEGER
      },
      bendaharaId: {
        type: Sequelize.INTEGER
      },
      type_transaksi: {
        type: Sequelize.STRING
      },
      bayar_bulan: {
        type: Sequelize.STRING
      },
      bayar_tahun: {
        type: Sequelize.INTEGER
      },
      tgl_bayar: {
        type: Sequelize.DATE
      },
      jumlah: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Transaksis');
  }
};