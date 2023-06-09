const mongoose = require('mongoose')

const dbConnection = async () => {
    try{
        mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true }, {
            autoIndex: true
        }).then(() => {console.log('DB online')})
        
    }catch(error){
        console.log(error)
        throw new Error('Erro al conectar a la base de datos')
    }
}

module.exports = {dbConnection}