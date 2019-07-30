const ejs = require('ejs')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const authSession = require('./helpers/authLogin')
const index = require('./routes/index')
const loginRoutes = require('./routes/login')
const siswaRoutes = require('./routes/siswa')
const perkiraanRoutes = require('./routes/perkiraan')
const logoutRoutes = require('./routes/logout')
const bendaharaRoutes = require('./routes/bendahara')
const transaksiRoutes = require('./routes/transaksi')
const tunggkanRoutes = require('./routes/tunggakan')
const jurnalRoutes = require('./routes/jurnal')
const laporanPembayaranRoutes = require('./routes/laporan_pembayaran')
const laporanTunggakanRoutes = require('./routes/laporan_tunggakan')
const penerimaanKasRoutes = require('./routes/penerimaan_kas')
const app = express()


app.set('view engine', 'ejs')
app.set('view cache', false)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', express.static(process.cwd() + '/public'))
app.set('trust proxy', 1)
app.use(session({
  secret: 'bayar-spp',
}))

app.use('/login', loginRoutes)
app.use('/logout', logoutRoutes)

app.use((req, res, next) => {
  res.locals.userSession = req.session.bendahara
  next()
})

app.use('/', authSession.checkSession, index)
app.use('/siswa', authSession.checkSession, siswaRoutes)
app.use('/bendahara', authSession.checkSession, bendaharaRoutes)
app.use('/perkiraan', authSession.checkSession, perkiraanRoutes)
app.use('/transaksi', authSession.checkSession, transaksiRoutes)
app.use('/tunggakan', authSession.checkSession, tunggkanRoutes)
app.use('/jurnal', authSession.checkSession, jurnalRoutes)
app.use('/laporan_pembayaran', authSession.checkSession, laporanPembayaranRoutes)
app.use('/laporan_tunggakan', authSession.checkSession, laporanTunggakanRoutes)
app.use('/penerimaan_kas', authSession.checkSession, penerimaanKasRoutes)

app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'))
