const express = require('express')
const Sequelize = require('sequelize')
const Model = require('../models')
const Router = express.Router()
const title = 'Data Bendahara'

Router.get('/', (req, res) => {
  Model.Bendahara.findAll({ order: ['username'] })
    .then(bendaharas => {
      res.render('./bendahara', {
        title: title,
        sidebar: 'bendahara',
        bendahara: bendaharas,
      })
    })
})

Router.get('/add', (req, res) => {
  res.render('./bendahara_add', {
    title: title,
    sidebar: 'bendahara',
    bendahara: false,
    errMessage: null,
  })
})

Router.post('/add', (req, res) => {
  let objBendahara = {
    username: req.body.username,
    password: req.body.password,
    nama: req.body.nama,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  Model.Bendahara.create(objBendahara)
    .then(() => {
      res.redirect('/bendahara')
    })
    .catch(err => {
      res.render('./bendahara_add', {
        title: title,
        sidebar: 'bendahara',
        bendahara: false,
        errMessage: err.message,
      })
    })
})

Router.get('/edit/:id', (req, res) => {
  Model.Bendahara.findByPk(req.params.id)
    .then(bendahara => {
      res.render('./bendahara_add', {
        title: title,
        sidebar: 'bendahara',
        bendahara,
        errMessage: null,
      })
    })
})

Router.post('/edit/:id', (req, res) => {
  let objBendahara = {
    id: req.params.id,
    username: req.body.username,
    password: req.body.password,
    nama: req.body.nama,
    updatedAt: new Date(),
  }
  Model.Bendahara.update(objBendahara, {
    where: {
      id: req.params.id,
    },
    individualHooks: true,
  })
    .then(() => {
      res.redirect('/bendahara')
    })
    .catch(err => {
      Model.Bendahara.findByPk(req.params.id)
        .then(bendahara => {
          res.render('./bendahara_add', {
            title: title,
            sidebar: 'bendahara',
            bendahara: bendahara,
            errMessage: err.message,
          })
        })
    })
})

Router.get('/delete/:id', (req, res) => {
  Model.Bendahara.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.redirect('/bendahara')
    })
})

module.exports = Router;
