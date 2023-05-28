const {Schema, model} = require('mongoose')

const MensajeSchema = Schema({
    message: {
        type: String,
        require: true
    },
    from: {
        type: String,
        require: true
    }
})

module.exports = model('Mensaje', MensajeSchema)