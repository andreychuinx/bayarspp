const express = require('express')
const Sequelize = require('sequelize')
const Model = require('../models')
const Router = express.Router()
const { typeTransaksi, getMonth, getYear, bulanName, findDiff, spp, praktek } = require('../constant')
const { countTunggakan } = require('../helpers/countTunggakan')

const title = 'Tunggakan Management'

Router.get('/', (req, res) => {
	countTunggakan().then(values => {
		if (values.siswas) {
			res.render('./tunggakan', {
				title: title,
				sidebar: 'tunggakan',
				siswa: values.siswas,
				errMessage: false,
			})
		} else {
			res.render('./tunggakan', {
				title: title,
				sidebar: 'tunggakan',
				siswa: null,
				errMessage: values.err,
			})
		}
	})

})


module.exports = Router;
