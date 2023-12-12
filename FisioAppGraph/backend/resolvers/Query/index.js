const usuario = require('./usuario')
const perfil = require('./perfil')
const paciente = require('./paciente')
const evolucao = require('./evolucao')

 module.exports = {
    ...usuario,
    ...perfil,
    ...paciente,
    ...evolucao
 }