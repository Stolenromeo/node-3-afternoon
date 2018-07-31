const express = require('express');
const bodyPar = require('body-parser');
const session = require('express-session')
require('dotenv').config()


const checkForSession = require('./middlewares/checkForSession');
const swagCtrl = require('./Controllers/swagCtrl');
const authCtrl = require('./Controllers/authCtrl');
const cartCtrl = require('./Controllers/cartCtrl');
const searchCtrl = require('./Controllers/searchCtrl');

const app = express();
app.use(bodyPar.json())
app.use(session({
    resave:false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}))
app.use(checkForSession)
app.use(express.static(`${__dirname}/build`))

//Swag
app.get('/api/swag', swagCtrl.read)

//Authorized
app.post('/api/login', authCtrl.login)
app.post('/api/register', authCtrl.register)
app.post('/api/signout', authCtrl.signout)
app.get('/api/user', authCtrl.getUser)

//Cart
app.post('/api/cart', cartCtrl.add)
app.post('/api/cart/checkout', cartCtrl.checkout)
app.delete('/api/cart', cartCtrl.delete)

//Search
app.get('/api/search', searchCtrl.search)

app.listen(process.env.SERVER_PORT, () => console.log(`You must construct additional pylons on port ${process.env.SERVER_PORT}!`))