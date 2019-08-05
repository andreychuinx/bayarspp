'use strict';
module.exports = (sequelize, DataTypes) => {
  const Detail_jurnal = sequelize.define('Detail_jurnal', {
    jurnalId: DataTypes.INTEGER,
    perkiraanId: DataTypes.INTEGER,
    debet: DataTypes.INTEGER,
    kredit: DataTypes.INTEGER
  }, {});
  Detail_jurnal.associate = function (models) {
    // associations can be defined here
    Detail_jurnal.belongsTo(models.Perkiraan)
    Detail_jurnal.belongsTo(models.Jurnal)
  };
  return Detail_jurnal;
};