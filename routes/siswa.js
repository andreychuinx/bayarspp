const express = require('express')
const Model = require('../models')
const Sequelize = require('sequelize')
const Router = express.Router()
const title = 'BAYARSPP Management'

Router.get('/', (req, res) => {
	Model.Siswa.findAll({ order: [['nis', 'ASC']] })
		.then(result => {
			res.render('siswa', {
				siswa: result,
				errMessage: false,
				title: 'Data Siswa',
				sidebar: 'siswa'
			})
		})
})

Router.get('/add', (req, res) => {
	res.render('siswa_add', {
		siswa: false,
		jenis_kelamin: ['Laki-laki', 'Perempuan'],
		errMessage: false,
		title: 'New Siswa',
		sidebar: 'siswa'
	})
})

Router.get('/edit/:id', (req, res) => {
	Model.Siswa.findByPk(req.params.id)
		.then(siswa => {
			siswa.tempat_lahir = siswa.tgl_lahir.split(',')[0]
			siswa.tgl_lahir = siswa.tgl_lahir.split(',')[1]
			res.render('./siswa_add', {
				title: title,
				sidebar: 'siswa',
				siswa: siswa,
				jenis_kelamin: ['Laki-laki', 'Perempuan'],
				errMessage: null,
			})
		})
		.catch(err => {
			console.log(err, 'ini erro')
		})
})

Router.post('/add', (req, res) => {
	let objSiswa = {
		nis: req.body.nis,
		nama: req.body.nama,
		jurusan: req.body.jurusan,
		kelas: req.body.kelas,
		jenis_kelamin: req.body.jenis_kelamin,
		tgl_lahir: `${req.body.tempat_lahir}, ${req.body.tgl_lahir}`,
		alamat: req.body.alamat,
		no_telepon: req.body.no_telepon,
		createdAt: new Date(),
		updatedAt: new Date()
	}
	Model.Siswa.create(objSiswa)
		.then(() => {
			res.redirect('/siswa')
		})
		.catch(err => {
			res.render('./siswa_add', {
				title: title,
				sidebar: 'siswa',
				siswa: false,
				errMessage: err.message,
			})
		})
})

Router.post('/edit/:id', (req, res) => {
  let objSiswa = {
    nis: req.body.nis,
		nama: req.body.nama,
		jurusan: req.body.jurusan,
		kelas: req.body.kelas,
		jenis_kelamin: req.body.jenis_kelamin,
		tgl_lahir: `${req.body.tempat_lahir}, ${req.body.tgl_lahir}`,
		alamat: req.body.alamat,
		no_telepon: req.body.no_telepon,
		createdAt: new Date(),
		updatedAt: new Date()
  }
  Model.Siswa.update(objSiswa, {
    where: {
      id: req.params.id,
    }
  })
  .then(() => {
    res.redirect('/siswa')
  })
  .catch(err => {
    Model.Siswa.findByPk(req.params.id)
    .then(siswa => {
      res.render('./siswa_add', {
        title       : title,
        sidebar     : 'siswa',
        siswa      : siswa,
        errMessage  : err.message,
      })
    })
  })
})

Router.get('/delete/:id', (req, res) => {
  Model.Siswa.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/siswa')
  })
})


module.exports = Router