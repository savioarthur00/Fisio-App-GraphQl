const usuario = require('./usuario')
const perfil = require('./perfil')
const paciente = require('./paciente')

 module.exports = {
    ...usuario,
    ...perfil,
    ...paciente
 }