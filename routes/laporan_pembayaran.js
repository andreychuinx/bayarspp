const express = require('express')
const Router = express.Router()
const Model = require('../models')
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

var Excel = require('exceljs')

Router.get('/', (req, res) => {
  const { query } = req
  if (Object.keys(query).length > 0) {
    const { date_export } = query
    let splitDate = date_export.split(' - ')
    Model.Transaksi.findAll({
      where: {
        tgl_bayar: {
          [Op.between]: [splitDate[0], splitDate[1]]
        }
      },
      include: [Model.Siswa]
    }).then((result) => {
      let data = []
      let totalJumlah = 0
      console.log(result, 'ini resul')
      result.forEach((r, i) => {
        let dataRow = [i + 1, r.tgl_bayar && new Date(r.tgl_bayar).toLocaleDateString(), r.Siswa.nama, r.Siswa.kelas, r.type_transaksi === 'SPP' ? r.jumlah : '', r.type_transaksi === 'Praktek' ? r.jumlah : '', `${r.bayar_bulan} - ${r.bayar_tahun}`, r.jumlah]
        totalJumlah += r.jumlah
        data.push(dataRow)
      })
      var workbook = new Excel.Workbook()
      let dataFieldsFirstRow = ['NO', 'TGL', 'NAMA', 'KELAS', 'JENIS PEMBAYARAN', '', '', 'JUMLAH']
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
      ws.getCell('A2').value = `LAPORAN PEMBAYARAN ${date_export}`
      ws.getCell('A3').value = ''

      ws.getColumn('B').width = 20
      ws.getColumn('C').width = 25
      ws.getColumn('D').width = 15
      ws.getColumn('E').width = 25
      ws.getColumn('F').width = 15
      ws.getColumn('G').width = 15
      ws.getColumn('H').width = 15
      ws.getColumn('I').width = 15
      ws.getColumn('J').width = 20
      ws.getColumn('K').width = 20
      ws.getColumn('L').width = 20
      ws.getColumn('M').width = 20
      ws.addRow(dataFieldsFirstRow)
      arrColumn.forEach((d, i) => {
        return ws.getColumn(d).alignment = alignmentCenter
      });

      ws.mergeCells('A2:H2')
      ws.mergeCells('A4:A5')
      ws.mergeCells('B4:B5')
      ws.mergeCells('C4:C5')
      ws.mergeCells('D4:D5')
      ws.mergeCells('H4:H5')
      ws.mergeCells('E4:G4')

      ws.getCell('E5').value = 'SPP'
      ws.getCell('F5').value = 'PRAKTEK'
      ws.getCell('G5').value = 'BULAN'
      for (let i = 0; i < data.length; i++) {
        ws.addRow(data[i])
        ws.getRow(`${i + 6}`).height = 30
      }
      arrColumn.forEach((d, i) => {
        return ws.getColumn(d).alignment = alignmentCenter
      });

      for (let i = 4; i < data.length + 7; i++) {
        arrColumn.forEach((d, j) => {
          if (j < 8) {

            return ws.getCell(`${d}${i}`).border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' }
            };
          }
        })
      }

      ws.mergeCells(`A${data.length + 6}:G${data.length + 6}`)
      ws.getCell(`A${data.length + 6}`).value = 'TOTAL JUMLAH'
      ws.getCell(`H${data.length + 6}`).value = totalJumlah


      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader("Content-Disposition", "attachment; filename=" + `laporan_pembayaran_${date_export}.xlsx`);
      workbook.xlsx.write(res).then(() => {
        res.end()
      })
    })

  } else {
    res.render('laporan_pembayaran', {
      title: 'Laporan Pembayaran SPP dan Praktek',
      sidebar: 'laporan_pembayaran',
      errMessage: null
    })
  }

})

module.exports = Router;
