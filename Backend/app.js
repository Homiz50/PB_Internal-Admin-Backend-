const dotenv = require('dotenv')
dotenv.config();
const cors = require('cors')
const express = require('express')
const conectToDb = require('./db/db')
const cookieparser = require('cookie-parser')
const app = express();
const userRoutes = require('./routes/admin.route')
const PropertyRoutes = require('./routes/Property.route')
const port =  3000; // Updated to use environment variable
const reader = require('xlsx')

// Reading our test file
// const file = reader.readFile('./demo.xlsx')
// let data = []
// const sheets = file.SheetNames

// for(let i = 0; i < sheets.length; i++)
// { 
//    const temp = reader.utils.sheet_to_json(
//         file.Sheets[file.SheetNames[i]])
//    temp.forEach((res) => {
//       data.push(res)
//    })
// }
// // Printing data
// console.log(data)

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

module.exports = app