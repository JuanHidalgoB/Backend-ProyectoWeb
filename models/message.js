const {Schema, model} = require('mongoose')

const MessageSchema = Schema({
    message: {
        type: String,
        require: true
    },
    from: {
        type: String,
        require: true
    }
})

module.exports = model('Message', MessageSchema)