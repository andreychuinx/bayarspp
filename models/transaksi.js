'use strict';
const { writeData } = require('../templates/kwitansi_pembayaran')
module.exports = (sequelize, DataTypes) => {
  const Transaksi = sequelize.define('Transaksi', {
    siswaId: DataTypes.INTEGER,
    bendaharaId: DataTypes.INTEGER,
    type_transaksi: DataTypes.STRING,
    bayar_bulan: DataTypes.STRING,
    bayar_tahun: DataTypes.INTEGER,
    tgl_bayar: DataTypes.DATE,
    jumlah: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: { msg: "Data yang di input bukan nomor" }
      }
    }
  }, {});
  // Transaksi.afterCreate((data, options) => {
  //   sequelize.models.Siswa.findOne({
  //     where: {
  //       id: data.siswaId
  //     }
  //   }).then(siswa => {
  //     data.dataValues.Siswa = siswa
  //     writeData(data)
  //   })
  // })
  Transaksi.associate = function (models) {
    // associations can be defined here
    Transaksi.belongsTo(models.Siswa)
    Transaksi.belongsTo(models.Bendahara)
  };
  return Transaksi;
};