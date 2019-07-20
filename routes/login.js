const express   = require('express')
const Model     = require('../models')
const Sequelize = require('sequelize')
const Router    = express.Router()
const title     = 'BAYARSPP'

Router.get('/', (req, res) => {
  res.render('./login', {
    title       : title,
    errMessage  : null,
  })
})

Router.post('/checkUser', (req, res) => {
  Model.Bendahara.findOne({
    where: {
      username: req.body.username,
    }
  })
  .then((bendahara) => {
    if (bendahara == null) {
      res.render('./login', {
        title       : title,
        errMessage  : 'Username atau Password tidak sesuai !!',
      })
    } else {
      bendahara.check_password(req.body.password, (isMatch) => {
        if (isMatch) {
          let objBendahara = {
            last_login: new Date(),
          }
          Model.Bendahara.update(objBendahara, {
            where: {
              id: bendahara.id
            }
          })
          .then(() => {
            req.session.isLogin = true
            req.session.bendahara = bendahara
            res.redirect('/')
          })
        } else {
          req.session.isLogin = false
          req.session.bendahara = undefined
          res.render('./login', {
            title       : title,
            errMessage  : 'Email atau Password tidak sesuai !!',
          })
        }
      })
    }
  })
  .catch((err) => {
    res.render('./login', {
      title       : title,
      errMessage  : err.message,
    })
  })
})

module.exports = Router;
