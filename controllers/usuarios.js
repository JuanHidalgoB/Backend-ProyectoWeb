const express = require('express')
const Usuario = require('../models/Usuario.js')

const obtenerUsuarios = async (req, res) => {
    try {
      const usuarios = await Usuario.find();
  
      res.status(200).json({
        ok: true,
        usuarios,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        error,
      });
    }
  };

  module.exports = {obtenerUsuarios}
