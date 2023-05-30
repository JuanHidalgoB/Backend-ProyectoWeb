const express = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario.js')
const { generarJWT } = require('../helpers/jwt.js')

const crearUsuario = async(req, res) => {
    const {name,nickname, email, password } = req.body

    try{
        var usuario = await Usuario.findOne({email: email})
        if (usuario){
            return res.status(400).json({
                ok: false,
                msg: "Este correo ya está en uso"
            })
        }

        var usuario = await Usuario.findOne({nickname: nickname})
        if (usuario){
            return res.status(400).json({
                ok: false,
                msg: "Este nickname ya está en uso"
            })
        }
        usuario = new Usuario(req.body)
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password, salt)
        await usuario.save()

        res.status(200).json({
            ok: true,
            usuario
        })

    }catch(error){
        res.status(500).json({
            ok:false,
            error
        })
    }
}


const loginUsuario = async(req, res) => {
    const {email, password} = req.body
    try{
        const usuario = await Usuario.findOne({email: email})
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario no existe"
            })
        }

        const passwordValid = bcrypt.compareSync(password, usuario.password)
        if (!passwordValid){
            return res.status(400).json({
                ok: false,
                msg: "la contraseña no es correcta"
            })
        }

        //generar token
        const token = await generarJWT(usuario.id, usuario.name)

        res.status(200).json({
            ok: true,
            usuario,
            token
        })
    }catch(e){
        console.log(e)
        res.status(500).json({
            ok: false,
            e
        })
    }
}

const revalidarToken = async(req, res) => {
    const {uid, name} = req
    const token = await(generarJWT(uid, name))
    res.json({
        ok: true,
        token
    })
}

module.exports = {
    loginUsuario,
    crearUsuario,
    revalidarToken
}