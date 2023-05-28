const express = require('express')
const { dbConnection } = require('./database/config.js')
require('dotenv').config()
const cors = require('cors')


const app = express()

//base de datos
dbConnection()

const headers = {
    origin: '*',
    METHOD: ["GET", "POST"]
}
app.use(cors(headers))

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/chat', require('./routes/message'))

app.listen(process.env.PORT, ()=>{
    console.log('Escuchando en el puerto', process.env.PORT)
})