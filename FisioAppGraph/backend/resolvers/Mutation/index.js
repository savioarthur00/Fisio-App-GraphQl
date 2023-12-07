const usuario = require('./usuario')
const perfil = require('./perfil')
const paciente = require('./paciente')
const evolucao = require('./evolucao')
const exame = require('./exame')

 module.exports = {
    ...usuario,
    ...perfil,
    ...paciente,
    ...evolucao,
    ...exame
 }