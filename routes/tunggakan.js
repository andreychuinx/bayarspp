const express = require('express')
const Sequelize = require('sequelize')
const Model = require('../models')
const Router = express.Router()
const { typeTransaksi, title, getMonth, getYear, bulanName, findDiff, spp, praktek } = require('../constant')

Router.get('/', (req, res) => {
	Model.Transaksi.findAll({
		where: {
			bayar_tahun: getYear
		}
	})
		.then(transaksis => {
			Model.Siswa.findAll()
				.then(siswas => {
					let siswaTunggakanSpp = []
					let siswaTunggakanPraktek = []
					let bulanBerjalan = bulanName.slice(0, getMonth + 1)
					transaksis.forEach(tr => {
						let bulanBayar = tr.bayar_bulan.split(',')
						let bulanTunggakan = findDiff(bulanBerjalan, bulanBayar)
						if (tr.type_transaksi === typeTransaksi[0]) {
							siswaTunggakanSpp.push({ id: tr.siswaId, totalTunggakan: bulanTunggakan.length * spp })
						}
						if (tr.type_transaksi === typeTransaksi[1]) {
							siswaTunggakanPraktek.push({ id: tr.siswaId, totalTunggakan: bulanTunggakan.length * praktek })
						}

					})
					siswas.forEach(sw => {
						const siswaSpp = siswaTunggakanSpp.filter(spp => spp.id === sw.id)
						const siswaPraktek = siswaTunggakanPraktek.filter(tgk => tgk.id === sw.id)
						sw.dataValues.tunggakan_spp = siswaSpp.length > 0 ? siswaSpp[0].totalTunggakan : bulanBerjalan.length * spp
						sw.dataValues.tunggakan_praktek = siswaPraktek.length > 0 ? siswaPraktek[0].totalTunggakan : bulanBerjalan.length * praktek
					})
					res.render('./tunggakan', {
						title: title,
						sidebar: 'tunggakan',
						siswa: siswas,
						errMessage: false,
					})
				})


		})
})


module.exports = Router;
