const express = require('express')
  , Router = express.Router()
	, Model = require('../models')
	var Sequelize = require('sequelize');

Router.get('/', (req, res) => {
	const transaksiCount = Model.Transaksi.findAll({
		attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'total_transaksi']]
	})
	const siswaCount = Model.Siswa.findAll({
		attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'total_siswa']]
	})
	const bendaharaCount = Model.Bendahara.findAll({
		attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'total_bendahara']]
	})
	const totalPembayaran = Model.Transaksi.findAll({
		attributes: [[Sequelize.fn('SUM', Sequelize.col('jumlah')), 'total_pembayaran']]
	})
	Promise.all([transaksiCount, siswaCount, bendaharaCount, totalPembayaran])
		.then((values) => {
			let dataDashboard = {}
			values.forEach(val => {
				dataDashboard[Object.keys(val[0].dataValues)[0]] = val[0].dataValues[Object.keys(val[0].dataValues)[0]]
			})
			res.render('index', {
				title: 'BAYARSPP App',
				sidebar: 'dashboard',
				dashboard: dataDashboard
			})
		})
	

})

module.exports = Router;
