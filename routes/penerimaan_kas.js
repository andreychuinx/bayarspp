const express = require('express')
const Router = express.Router()
const Model = require('../models')
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { templatePenerimaanKas, bulanName } = require('../constant')
const { countTunggakan } = require('../helpers/countTunggakan')
const jsreport = require('jsreport')

Router.get('/', async (req, res) => {
  const { query } = req
  if (Object.keys(query).length > 0) {
    const { tgl_export_penerimaan } = query
    let data = {
      tgl_export_penerimaan,
      penerimaan_pembayaran: {
        kas: 0,
        pendapatan: 0
      },
      pembayaran_menunggak: {
        piutang: 0,
        pendapatan: 0,
      },
      penerimaan_pembayaran_menunggak: {
        kas: 0,
        piutang: 0
      }
    }
    let dateExp = new Date(tgl_export_penerimaan)
    let getMonth = dateExp.getMonth()
    let bulanBerjalan = bulanName.slice(0, getMonth + 1)
    let totalJumlah = 0
    let dataTunggakan = await countTunggakan(tgl_export_penerimaan)
    dataTunggakan.siswas.forEach((r, i) => {
      data.penerimaan_pembayaran.kas += r.dataValues.total_bayar_spp + r.dataValues.total_bayar_praktek
      data.penerimaan_pembayaran.pendapatan += r.dataValues.total_bayar_spp + r.dataValues.total_bayar_praktek
      data.pembayaran_menunggak.piutang += r.dataValues.tunggakan_spp + r.dataValues.tunggakan_praktek
      data.pembayaran_menunggak.pendapatan += r.dataValues.total_bayar_spp + r.dataValues.total_bayar_praktek
      data.penerimaan_pembayaran_menunggak.kas += r.dataValues.total_bayar_spp + r.dataValues.total_bayar_praktek + r.dataValues.tunggakan_spp + r.dataValues.tunggakan_praktek
      data.penerimaan_pembayaran_menunggak.piutang += r.dataValues.tunggakan_spp + r.dataValues.tunggakan_praktek

    })
    jsreport.render({
      template: {
        content: templatePenerimaanKas(data),
        engine: 'handlebars',
        recipe: 'chrome-pdf'
      }
    }).then((out) => {
      out.stream.pipe(res);
    })
  } else {
    res.render('penerimaan_kas', {
      title: 'Export Laporan Penerimaan Kas',
      sidebar: 'penerimaan_kas',
      errMessage: null
    })
  }
})

module.exports = Router;
