'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaksi = sequelize.define('Transaksi', {
    siswaId: DataTypes.INTEGER,
    type_transaksi: DataTypes.STRING,
    bayar_bulan: DataTypes.STRING,
    bayar_tahun: DataTypes.INTEGER,
    tgl_bayar: DataTypes.DATE,
    bayar: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: { msg: "Data yang di input bukan nomor"}
      }
    }
  }, {});
  Transaksi.associate = function(models) {
    // associations can be defined here
    Transaksi.belongsTo(models.Siswa)
  };
  return Transaksi;
};