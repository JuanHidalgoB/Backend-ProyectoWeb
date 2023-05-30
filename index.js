const express = require('express')
const { dbConnection } = require('./database/config.js')
require('dotenv').config()
const cors = require('cors')
const morgan = require('morgan')



const app = express()

//base de datos
dbConnection()

const headers = {
    origin: '*',
    METHOD: ["GET", "POST"]
}
//Middlewares
app.use(cors(headers))
app.use(morgan('dev'))
app.use(express.json())

//Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/chat', require('./routes/message'))

app.listen(process.env.PORT, ()=>{
    console.log('Escuchando en el puerto', process.env.PORT)
})