const Query = require('./Query')
const Mutation = require('./Mutation')
const Usuario = require('./Type/Usuario')
const Perfil = require('./Type/Perfil')
const Paciente = require('./Type/Paciente')
const Evolucao = require('./Type/Evolucao')
const CardioRespiratorio = require('./Type/CardioRespiratorio')

module.exports = {
    Query,
    Mutation,
    Usuario,
    Perfil,
    Paciente,    
    Evolucao,
    CardioRespiratorio
}