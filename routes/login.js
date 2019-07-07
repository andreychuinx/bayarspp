const express   = require('express')
const Model     = require('../models')
const Sequelize = require('sequelize')
const Router    = express.Router()
const title     = 'BAYARSPP Management'

Router.get('/', (req, res) => {
  res.render('login', {
    title       : title,
    errMessage  : null,
  })
})

module.exports = Router