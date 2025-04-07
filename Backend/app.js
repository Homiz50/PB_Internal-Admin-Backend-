const dotenv = require('dotenv')
dotenv.config();
const cors = require('cors')
const express = require('express')
const conectToDb = require('./db/db')
const cookieparser = require('cookie-parser')
const app = express();
const userRoutes = require('./routes/admin.route')
const PropertyRoutes = require('./routes/Property.route')
const properties = require('./routes/userlisting.route')
const port =  3000; // Updated to use environment variable
const reader = require('xlsx')

conectToDb()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieparser())

app.get('/', (req, res) => {
  res.send('Hello World! Cursure Code')
})

app.use('/admin',userRoutes);
app.use('/data',PropertyRoutes);
app.use('/user',properties)
module.exports = app