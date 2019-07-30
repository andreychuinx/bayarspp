'use strict';
const { typeTransaksi, getMonth, getYear, bulanName, findDiff, spp, praktek } = require('../constant')
const Op = require('sequelize').Op

Array.prototype.sum = function (props) {
  var total = 0
  for (var i = 0, _len = this.length; i < _len; i++) {
    total += this[i].dataValues[props]
  }
  return total
}
module.exports = (sequelize, DataTypes) => {
  const Jurnal = sequelize.define('Jurnal', {
    nama_jurnal: DataTypes.STRING,
    bendaharaId: DataTypes.INTEGER,
    tgl_jurnal: DataTypes.DATE,
    keterangan: DataTypes.STRING
  }, {});
  Jurnal.associate = function (models) {
    // associations can be defined here
    Jurnal.belongsTo(models.Bendahara)

  };
  Jurnal.afterCreate(function (data, options) {
    let objDetailJurnal = []
    let totalTransaksiSPP = 0
    let totalTransaksiPraktek = 0
    let filtering = {}
    filtering.where = {
      bayar_tahun: getYear,
      createdAt: {
        [Op.lte]: new Date(data.tgl_jurnal).setHours(3)
      }
    }
    sequelize.models.Transaksi.findAll(filtering)
      .then(transaksis => {
        sequelize.models.Siswa.findAll()
          .then(siswas => {
            let siswaTunggakanSpp = []
            let siswaTunggakanPraktek = []
            let bulanBerjalan = bulanName.slice(0, getMonth + 1)
            transaksis.forEach(tr => {
              if (tr.type_transaksi === 'SPP') {
                totalTransaksiSPP += tr.jumlah
              } else if (tr.type_transaksi === 'Praktek') {
                totalTransaksiPraktek += tr.jumlah
              }
              let bulanBayar = tr.bayar_bulan.split(',')
              let bulanTunggakan = findDiff(bulanBerjalan, bulanBayar)
              if (tr.type_transaksi === typeTransaksi[0]) {
                siswaTunggakanSpp.push({ id: tr.siswaId, totalTunggakan: bulanTunggakan.length * spp })
              }
              if (tr.type_transaksi === typeTransaksi[1]) {
                siswaTunggakanPraktek.push({ id: tr.siswaId, totalTunggakan: bulanTunggakan.length * praktek })
              }

            })
            siswas.forEach(sw => {
              const siswaSpp = siswaTunggakanSpp.filter(spp => spp.id === sw.id)
              const siswaPraktek = siswaTunggakanPraktek.filter(tgk => tgk.id === sw.id)
              sw.dataValues.tunggakan_spp = siswaSpp.length > 0 ? siswaSpp[0].totalTunggakan : bulanBerjalan.length * spp
              sw.dataValues.tunggakan_praktek = siswaPraktek.length > 0 ? siswaPraktek[0].totalTunggakan : bulanBerjalan.length * praktek
            })
            sequelize.models.Perkiraan.findAll().then((perkiraans) => {
              perkiraans.forEach(pk => {
                if (pk.type_perkiraan === 'pendapatan_spp' || pk.type_perkiraan === 'pendapatan_praktek') {
                  objDetailJurnal.push({
                    jurnalId: data.id,
                    perkiraanId: pk.id,
                    debet: pk.type_perkiraan === 'pendapatan_spp' ? totalTransaksiSPP : totalTransaksiPraktek,
                    // kredit: pk.type_perkiraan === 'pe' ? siswas.sum('tunggakan_spp') : siswas.sum('tunggakan_praktek')
                    kredit: 0
                  })
                } else if (pk.type_perkiraan === 'piutang_spp' || pk.type_perkiraan === 'piutang_praktek') {
                  objDetailJurnal.push({
                    jurnalId: data.id,
                    perkiraanId: pk.id,
                    debet: 0,
                    kredit: pk.type_perkiraan === 'piutang_spp' ? siswas.sum('tunggakan_spp') : siswas.sum('tunggakan_praktek'),
                  })
                } else {
                  objDetailJurnal.push({
                    jurnalId: data.id,
                    perkiraanId: pk.id,
                    debet: totalTransaksiSPP + totalTransaksiPraktek,
                    kredit: siswas.sum('tunggakan_spp') + siswas.sum('tunggakan_praktek')
                  })
                }



              })
              return sequelize.models.Detail_jurnal.bulkCreate(objDetailJurnal)
            })

          })


      })

  })
  Jurnal.afterUpdate(function (data, options) {
  })
  return Jurnal;
};