const express = require('express')
const controller = require('../controllers/message.js')
const router = express.Router();


//Definimos rutas
router.post('/save', controller.save)
router.get('/messages', controller.getMessages)

module.exports = router