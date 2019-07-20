const express = require('express')
const Router = express.Router()
const Model = require('../models')
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { generate } = require('../helpers/generatePdf')
const { title, typeTransaksi, getMonth, bulanName } = require('../constant')

Router.get('/', (req, res) => {
	Model.Transaksi.findAll({
		include: [Model.Siswa],
		order: [['createdAt', 'DESC']]
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
				title: 'Transaksi',
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
			console.log(transaksi, 'ini trans')
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
	const { id_siswa, tgl_bayar, bayar_tahun, type_transaksi, jumlah } = req.body
	console.log(req.body, 'ini jumlah')
	let objTransaksi = {
		siswaId: id_siswa,
		bendaharaId: req.session.bendahara.id,
		type_transaksi: type_transaksi,
		bayar_bulan: Array.isArray(req.body['bayar_bulan[]']) ? req.body['bayar_bulan[]'].join(',') : req.body['bayar_bulan[]'],
		bayar_tahun,
		tgl_bayar,
		jumlah,
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

Router.post('/edit/:id', (req, res) => {
	const { id_siswa, tgl_bayar, bayar_tahun, type_transaksi, jumlah } = req.body
	let objTransaksi = {
		siswaId: id_siswa,
		bendaharaId: req.session.bendahara.id,
		type_transaksi: type_transaksi,
		bayar_bulan: Array.isArray(req.body['bayar_bulan[]']) ? req.body['bayar_bulan[]'].join(',') : req.body['bayar_bulan[]'],
		bayar_tahun,
		tgl_bayar,
		jumlah,
		updatedAt: new Date(),
	}
	Model.Transaksi.update(objTransaksi, {
		where: {
			id: req.params.id,
		}
	})
		.then(() => {
			res.redirect('/transaksi')
		})
		.catch(err => {
			Model.Transaksi.findByPk(req.params.id)
				.then(transaksi => {
					res.render('./transaksi_add', {
						title: title,
						sidebar: 'transaksi',
						transaksi: transaksi,
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
