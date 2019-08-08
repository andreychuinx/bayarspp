const express = require('express')
const Model = require('../models')
const Sequelize = require('sequelize')
const Router = express.Router()
const title = 'BAYARSPP Management'

Router.get('/', (req, res) => {
	Model.Perkiraan.findAll({ order: [['no_perkiraan', 'ASC']] })
		.then(result => {
			res.render('perkiraan', {
				perkiraan: result,
				errMessage: false,
				title: 'Data Perkiraan',
				sidebar: 'perkiraan'
			})
		})
})

Router.get('/add', (req, res) => {
	res.render('perkiraan_add', {
		perkiraan: false,
		errMessage: false,
		title: 'Form Data Perkiraan',
		sidebar: 'perkiraan'
	})
})

Router.get('/edit/:id', (req, res) => {
	Model.Perkiraan.findByPk(req.params.id)
		.then(perkiraan => {
			res.render('./perkiraan_add', {
				title: title,
				sidebar: 'perkiraan',
				perkiraan: perkiraan,
				errMessage: null,
			})
		})
		.catch(err => {
			console.log(err, 'ini erro')
		})
})

Router.post('/add', (req, res) => {
	let objPerkiraan = {
		no_perkiraan: req.body.no_perkiraan,
		nama_perkiraan: req.body.nama_perkiraan,
		createdAt: new Date(),
		updatedAt: new Date()
	}
	Model.Perkiraan.create(objPerkiraan)
		.then(() => {
			res.redirect('/perkiraan')
		})
		.catch(err => {
			res.render('./perkiraan_add', {
				title: title,
				sidebar: 'perkiraan',
				perkiraan: false,
				errMessage: err.message,
			})
		})
})

Router.post('/edit/:id', (req, res) => {
	let objPerkiraan = {
		no_perkiraan: req.body.no_perkiraan,
		nama_perkiraan: req.body.nama_perkiraan,
		createdAt: new Date(),
		updatedAt: new Date()
	}
	Model.Perkiraan.update(objPerkiraan, {
		where: {
			id: req.params.id,
		}
	})
		.then(() => {
			res.redirect('/perkiraan')
		})
		.catch(err => {
			Model.Perkiraan.findByPk(req.params.id)
				.then(perkiraan => {
					res.render('./perkiraan_add', {
						title: title,
						sidebar: 'perkiraan',
						perkiraan: perkiraan,
						errMessage: err.message,
					})
				})
		})
})

Router.get('/delete/:id', (req, res) => {
	Model.Perkiraan.destroy({
		where: {
			id: req.params.id
		}
	})
		.then(() => {
			res.redirect('/perkiraan')
		})
})


module.exports = Router