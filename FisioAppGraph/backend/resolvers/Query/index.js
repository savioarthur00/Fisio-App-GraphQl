const usuario = require('./usuario')
const perfil = require('./perfil')
const paciente = require('./paciente')
const evolucao = require('./evolucao')
const exame = require('./Exame')
const sinal = require('./sinal')

 module.exports = {
    ...usuario,
    ...perfil,
    ...paciente,
    ...evolucao,
    ...exame,
    ...sinal
 }