const express = require('express')
const Sequelize = require('sequelize')
const Model = require('../models')
const Router = express.Router()
const title = 'Data Jurnal'
const { getYear } = require('../constant')
const Op = require('sequelize').Op


Router.get('/', (req, res) => {
	Model.Jurnal.findAll({
		order: ['id'],
		include: [Model.Bendahara],
	})
		.then(jurnals => {
			res.render('./jurnal', {
				title: title,
				sidebar: 'user',
				jurnals,
				errMessage: null
			})
		})
})

Router.get('/add', (req, res) => {
	res.render('./jurnal_add', {
		title: 'Add Jurnal',
		sidebar: 'jurnal',
		jurnal: false,
		errMessage: null,
	})
})
Router.get('/detail/:id', (req, res) => {
	const findJurnal = Model.Jurnal.findByPk(req.params.id, {
		include: [Model.Bendahara]
	})
	const findDetailJurnal = Model.Detail_jurnal.findAll({
		where: {
			jurnalId: req.params.id,
		},
		include: [Model.Perkiraan]
		
	})
	Promise.all([findJurnal, findDetailJurnal]).then(result => {
		Model.Transaksi.findAll({
			include: [Model.Siswa],
			where: {
				bayar_tahun: getYear,
				createdAt: {
					[Op.lte]: new Date(result[0].dataValues.tgl_jurnal).setHours(3)
				}
			}
		}).then(transaksi => {
			res.render('./jurnal_detail', {
				title: 'Detail Jurnal',
				sidebar: 'jurnal',
				jurnal: result[0],
				detailJurnals: result[1],
				transaksi: transaksi,
				errMessage: null,
			})
		})
		
	})
})

Router.post('/add', (req, res) => {
	let objJurnal = {
		nama_jurnal: req.body.nama_jurnal,
		bendaharaId: req.session.bendahara.id,
		tgl_jurnal: req.body.tgl_jurnal,
		keterangan: req.body.keterangan,
		createdAt: new Date(),
		updatedAt: new Date()
	}
	Model.Jurnal.create(objJurnal)
		.then(() => {
			res.redirect('/jurnal')
		})
		.catch(err => {
			res.render('./jurnal_add', {
				title: title,
				sidebar: 'jurnal',
				jurnal: false,
				errMessage: err.message,
			})
		})
})

module.exports = Router;
