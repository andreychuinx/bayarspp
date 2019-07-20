const Model = require('../models')
const { typeTransaksi, title, getMonth, getYear, bulanName, findDiff, spp, praktek } = require('../constant')
const Op = require('sequelize').Op

module.exports = {
	countTunggakan: (dateJurnal = null) => {
		let filtering = {}
		filtering.where = {
			bayar_tahun: getYear
		}
		if (dateJurnal) {
			filtering.where = {
				createdAt: {
					[Op.lte]: new Date(dateJurnal).setHours(3)
				}
			}
		}
		return new Promise((resolve, reject) => {
			Model.Transaksi.findAll(filtering)
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
							if (siswas) {
								resolve({
									siswas,
									err: null
								})
							} else {
								reject({
									siswas: null,
									err: 'Cant Count Tunggakan'
								})
							}

						})


				}).catch(err => {
					console.log(err)
				})
		})
	}
}