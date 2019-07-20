'use strict';
const Op = require('sequelize').Op
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  var Bendahara = sequelize.define('Bendahara', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username harus di isi !!'
        },
        isUnique: function (value, next) {
          Bendahara.findAll({
            where: {
              username: value,
              id: { [Op.ne]: this.id, }
            }
          })
            .then(function (bendahara) {
              if (bendahara.length == 0) {
                next()
              } else {
                next('Username sudah terdaftar !')
              }
            })
            .catch(function (err) {
              next(err)
            })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password harus di isi !!'
        },
        len: {
          args: [6, 255],
          msg: 'Password minimal 6 karakter !!'
        }
      }
    },
    nama: DataTypes.STRING,
    last_login: DataTypes.DATE
  }, {
      hooks: {
        beforeCreate: (Bendahara, options) => {
          return bcrypt.hash(Bendahara.password, 10)
            .then((hash) => {
              Bendahara.password = hash
            })
        },
        beforeUpdate: (Bendahara, options) => {
          return bcrypt.hash(Bendahara.password, 10)
            .then((hash) => {
              Bendahara.password = hash
            })
        }
      },
      instanceMethods: {
        comparePassword: function (BendaharaPassword, callback) {
          bcrypt.compare(BendaharaPassword, this.password)
            .then((isMatch) => {
              callback(isMatch)
            })
        }
      }
    });

  Bendahara.prototype.check_password = function (bendaharaPassword, callback) {
    bcrypt.compare(bendaharaPassword, this.password)
      .then((isMatch) => {
        callback(isMatch)
      })
      .catch((err) => {
        callback(err)
      })
  }
  Bendahara.associate = function (models) {
    // associations can be defined here
    Bendahara.hasMany(models.Jurnal)
    Bendahara.hasMany(models.Transaksi)
  };

  return Bendahara;
};
