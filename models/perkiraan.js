'use strict';
module.exports = (sequelize, DataTypes) => {
  const Perkiraan = sequelize.define('Perkiraan', {
    no_perkiraan: DataTypes.INTEGER,
    nama_perkiraan: DataTypes.STRING,
    type_perkiraan: DataTypes.STRING,
  }, {});
  Perkiraan.associate = function(models) {
    // associations can be defined here
    Perkiraan.hasMany(models.Detail_jurnal)
  };
  return Perkiraan;
};