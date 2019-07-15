'use strict';
module.exports = (sequelize, DataTypes) => {
  const Siswa = sequelize.define('Siswa', {
    nis: DataTypes.STRING,
    nama: DataTypes.STRING,
    jurusan: DataTypes.STRING,
    kelas: DataTypes.STRING,
    jenis_kelamin: DataTypes.STRING,
    tgl_lahir: DataTypes.STRING,
    alamat: DataTypes.STRING,
    no_telepon: DataTypes.STRING
  }, {});
  Siswa.associate = function(models) {
    // associations can be defined here
    Siswa.hasMany(models.Transaksi)
  };
  return Siswa;
};