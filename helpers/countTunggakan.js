const Model = require('../models')
const { typeTransaksi, title, getMonth, getYear, bulanName, findDiff, spp, praktek } = require('../constant')
const Op = require('sequelize').Op

module.exports = {
	countTunggakan: (dateTunggakan = null) => {
		let filtering = {}
		filtering.where = {
			bayar_tahun: getYear
		}
		if (dateTunggakan) {
			filtering.where.tgl_bayar = {
				[Op.lte]: dateTunggakan
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
									siswaTunggakanSpp.push({
										id: tr.siswaId,
										totalTunggakan: bulanTunggakan.length * spp,
										bulanTunggakan: bulanTunggakan,
										totalBayar: tr.jumlah
									})
								}
								if (tr.type_transaksi === typeTransaksi[1]) {
									siswaTunggakanPraktek.push({
										id: tr.siswaId,
										totalTunggakan: bulanTunggakan.length * praktek,
										bulanTunggakan: bulanTunggakan,
										totalBayar: tr.jumlah
									})
								}
							})
							siswas.forEach(sw => {
								const siswaSpp = siswaTunggakanSpp.filter(spp => spp.id === sw.id)
								const siswaPraktek = siswaTunggakanPraktek.filter(tgk => tgk.id === sw.id)
								sw.dataValues.tunggakan_spp = siswaSpp.length > 0 ? siswaSpp[0].totalTunggakan : bulanBerjalan.length * spp
								sw.dataValues.tunggakan_praktek = siswaPraktek.length > 0 ? siswaPraktek[0].totalTunggakan : bulanBerjalan.length * praktek
								sw.dataValues.tunggakan_spp_bulan = siswaSpp.length > 0 ? siswaSpp[0].bulanTunggakan : bulanBerjalan
								sw.dataValues.tunggakan_praktek_bulan = siswaPraktek.length > 0 ? siswaPraktek[0].bulanTunggakan : bulanBerjalan
								sw.dataValues.total_bayar_spp = siswaSpp.length > 0 ? siswaSpp[0].totalBayar : 0
								sw.dataValues.total_bayar_praktek = siswaPraktek.length > 0 ? siswaPraktek[0].totalBayar : 0
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