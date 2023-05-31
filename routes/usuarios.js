const express = require('express')
const router = express.Router()
const {obtenerUsuarios} = require('../controllers/usuarios')

router.get('/users', obtenerUsuarios)

module.exports = router