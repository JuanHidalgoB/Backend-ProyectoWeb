const express = require('express')
const router = express.Router()
const {crearUsuario, registrarUsuario, loginUsuario, revalidarToken} = require('../controllers/auth.js')
const {check} = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos.js')

router.post('/login', loginUsuario)

router.post(
    '/new',
    [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('nickname', 'El nickname es obligatorio').not().isEmpty(),
    check( 'email', 'El email es  obligatorio').isEmail(),
    check('password',).isLength({min: 6}),
    validarCampos
    ],
 crearUsuario)

router.get('/renew',revalidarToken)

module.exports = router