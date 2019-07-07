const express   = require('express')
const Model     = require('../models')
const Sequelize = require('sequelize')
const Router    = express.Router()
const title     = 'BAYARSPP Management'

Router.get('/', (req, res) => {
  res.render('siswa', {
    title       : title,
		errMessage  : null,
		sidebar: 'siswa'
  })
})

Router.get('/add', (req, res) => {
	res.render('siswa_add', {
			siswa: false,
			errMessage: false,
			title: 'New Siswa',
			sidebar: 'siswa'
	})
})
module.exports = Router