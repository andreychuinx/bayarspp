const express = require('express')
const Router = express.Router()
const Model = require('../models')
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { countTunggakan } = require('../helpers/countTunggakan')
const { bulanName } = require('../constant')
var Excel = require('exceljs')

Router.get('/', async (req, res) => {
  const { query } = req
  if (Object.keys(query).length > 0) {
    const { tgl_export_tunggakan } = query
    let data = []
    let dateExp = new Date(tgl_export_tunggakan)
    let getMonth = dateExp.getMonth()
    let bulanBerjalan = bulanName.slice(0, getMonth + 1)
    let totalJumlah = 0
    let dataTunggakan = await countTunggakan(tgl_export_tunggakan)
    dataTunggakan.siswas.forEach((r, i) => {
      let dataRow = [i + 1, tgl_export_tunggakan && new Date(tgl_export_tunggakan).toLocaleDateString(), r.nama, r.kelas, r.dataValues.tunggakan_spp, r.dataValues.tunggakan_praktek, `${r.dataValues.tunggakan_spp_bulan.join(',')} - ${new Date().getFullYear()}`, `${r.dataValues.tunggakan_praktek_bulan.join(',')} - ${new Date().getFullYear()}`, r.dataValues.tunggakan_spp + r.dataValues.tunggakan_praktek]
      totalJumlah += r.dataValues.tunggakan_spp + r.dataValues.tunggakan_praktek
      data.push(dataRow)
    })
    var workbook = new Excel.Workbook()
    let dataFieldsFirstRow = ['NO', 'TGL', 'NAMA', 'KELAS', 'JENIS PEMBAYARAN', '', '', '', 'JUMLAH']
    var ws = workbook.addWorksheet('WORKSHEET')
    var column = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    var arrColumn = column.split('')

    var fontHeader = {
      name: "Comic Sans MS",
      size: 14,
      bold: true
    }
    var alignmentCenter = {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: true
    }
    ws.getCell('A2').value = `LAPORAN TUNGGAKAN ${tgl_export_tunggakan}`
    ws.getCell('A3').value = ''

    ws.getColumn('B').width = 20
    ws.getColumn('C').width = 25
    ws.getColumn('D').width = 15
    ws.getColumn('E').width = 25
    ws.getColumn('F').width = 30
    ws.getColumn('G').width = 50
    ws.getColumn('H').width = 50
    ws.getColumn('I').width = 15
    ws.getColumn('J').width = 20
    ws.getColumn('K').width = 20
    ws.getColumn('L').width = 20
    ws.getColumn('M').width = 20
    ws.addRow(dataFieldsFirstRow)
    arrColumn.forEach((d, i) => {
      return ws.getColumn(d).alignment = alignmentCenter
    });

    ws.mergeCells('A2:I2')
    ws.mergeCells('A4:A5')
    ws.mergeCells('B4:B5')
    ws.mergeCells('C4:C5')
    ws.mergeCells('D4:D5')
    ws.mergeCells('I4:I5')
    ws.mergeCells('E4:H4')

    ws.getCell('E5').value = 'TUNGGAKAN SPP'
    ws.getCell('F5').value = 'TUNGGAKAN PRAKTEK'
    ws.getCell('G5').value = 'TUNGGAKAN BULAN SPP'
    ws.getCell('H5').value = 'TUNGGAKAN BULAN PRAKTEK'
    for (let i = 0; i < data.length; i++) {
      ws.addRow(data[i])
      ws.getRow(`${i + 6}`).height = 30
    }
    arrColumn.forEach((d, i) => {
      return ws.getColumn(d).alignment = alignmentCenter
    });

    for (let i = 4; i < data.length + 7; i++) {
      arrColumn.forEach((d, j) => {
        if (j < 9) {
          return ws.getCell(`${d}${i}`).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        }
      })
    }
    ws.mergeCells(`A${data.length + 6}:H${data.length + 6}`)
    ws.getCell(`A${data.length + 6}`).value = 'TOTAL JUMLAH'
    ws.getCell(`I${data.length + 6}`).value = totalJumlah


    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + `laporan_tunggakan_${tgl_export_tunggakan}.xlsx`);
    workbook.xlsx.write(res).then(() => {
      res.end()
      console.log('done')
    })


  } else {
    res.render('laporan_tunggakan', {
      title: 'Laporan Tunggakan SPP dan Praktek',
      sidebar: 'laporan_tunggakan',
      errMessage: null
    })
  }

})

module.exports = Router;
