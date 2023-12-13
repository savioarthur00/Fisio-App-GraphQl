const Query = require('./Query')
const Mutation = require('./Mutation')
const Usuario = require('./Type/Usuario')
const Perfil = require('./Type/Perfil')
const Paciente = require('./Type/Paciente')
const Evolucao = require('./Type/Evolucao')
const Exame = require('./Type/Exame')
const Sinais = require('./Type/Sinais')
const Sintoma = require('./Type/Sintomas')

module.exports = {
    Query,
    Mutation,
    Usuario,
    Perfil,
    Paciente,    
    Evolucao,
    Exame,
    Sinais,
    Sintomas
}