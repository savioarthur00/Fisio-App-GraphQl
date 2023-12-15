const usuario = require('./usuario')
const perfil = require('./perfil')
const paciente = require('./paciente')
const evolucao = require('./evolucao')
const exame = require('./Exame')
const sinal = require('./sinal')
const sintoma = require('./sintoma')

 module.exports = {
    ...usuario,
    ...perfil,
    ...paciente,
    ...evolucao,
    ...exame,
    ...sinal,
    ...sintoma
 }