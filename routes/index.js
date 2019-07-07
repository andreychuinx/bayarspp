const express = require('express')
  , Router = express.Router()
  , Model = require('../models')

Router.get('/', (req, res) => {
	res.render('index', {
		title: 'BAYARSPP App',
		sidebar: 'dashboard',
	})

})

module.exports = Router;
