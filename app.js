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
const userRoutes = require('./routes/user')
const transaksiRoutes = require('./routes/transaksi')
// const tempatRoutes = require('./routes/tempat')
// const tempatBarangRoutes = require('./routes/tempatbarang')
// const reqBarangRoutes = require('./routes/pemesanan')
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
  res.locals.userSession = req.session.user
  next()
})

app.use('/', authSession.checkSession, index)
app.use('/siswa', authSession.checkSession, siswaRoutes)
app.use('/user', authSession.checkSession, userRoutes)
app.use('/perkiraan', authSession.checkSession, perkiraanRoutes)
app.use('/transaksi', authSession.checkSession, transaksiRoutes)
// app.use('/barang', barangRoutes)
// app.use('/tempat', authSession.checkSession, tempatRoutes)
// app.use('/tempatbarang', tempatBarangRoutes)
// app.use('/pemesanan', authSession.checkSession, reqBarangRoutes)


app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'))
