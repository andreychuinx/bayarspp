const express = require('express')
const Router = express.Router()
const Model = require('../models')
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const title = 'BAYARSPP Management'
const typeTransaksi = ['SPP', 'Praktek']
const bulanName = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

Router.get('/', (req, res) => {
	Model.Transaksi.findAll({
		include: [Model.Siswa],
	})
		.then(result => {
			res.render('transaksi', {
				transaksi: result,
				title: 'Transaksi Pembayaran',
				sidebar: 'pembayaran'
			})
		})
})

Router.get('/add', (req, res) => {
	Model.Siswa.findAll()
		.then((siswa) => {
			res.render('./transaksi_add', {
				title: 'Add Transaksi',
				sidebar: 'transaksi',
				transaksi: false,
				type_transaksi: typeTransaksi,
				bulanName,
				siswa: siswa,
				errMessage: null,
			})
		})
})

Router.get('/edit/:id', (req, res) => {
	Model.Transaksi.findByPk(req.params.id)
		.then(transaksi => {
			Model.Siswa.findAll()
				.then((siswa) => {
					res.render('./transaksi_add', {
						title: title,
						sidebar: 'transaksi',
						transaksi,
						type_transaksi: typeTransaksi,
						bulanName,
						siswa,
						errMessage: null,
					})
				})
		})
})

Router.post('/add', (req, res) => {
	const { id_siswa, tgl_bayar, bayar_tahun, type_bayar, bayar } = req.body
	let objTransaksi = {
		siswaId: id_siswa,
		type_transaksi: type_bayar,
		bayar_bulan: req.body['bayar_bulan[]'].join(','),
		bayar_tahun,
		tgl_bayar,
		bayar,
		createdAt: new Date(),
		updatedAt: new Date(),
	}
	Model.Transaksi.create(objTransaksi)
		.then(() => {
			res.redirect('/transaksi')
		})
		.catch((err) => {
			console.log(err, 'ini err')
			Model.Siswa.findAll()
				.then((siswa) => {
					res.render('./transaksi_add', {
						title: 'Add Transaksi',
						sidebar: 'transaksi',
						transaksi: false,
						type_transaksi: typeTransaksi,
						bulanName,
						siswa: siswa,
						errMessage: err.message,
					})
				})
		})

})
Router.get('/delete/:id', (req, res) => {
  Model.Transaksi.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/transaksi')
  })
})


module.exports = Router;
