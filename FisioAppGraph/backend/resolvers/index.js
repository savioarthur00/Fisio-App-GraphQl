const Query = require('./Query')
const Mutation = require('./Mutation')
const Usuario = require('./Type/Usuario')
const Perfil = require('./Type/Perfil')
const Paciente = require('./Type/Paciente')
const Evolucao = require('./Type/Evolucao')
const Exame = require('./Type/Exame')
const Sinal = require('./Type/Sinal')
const Sintoma = require('./Type/Sintoma')

module.exports = {
    Query,
    Mutation,
    Usuario,
    Perfil,
    Paciente,    
    Evolucao,
    Exame,
    Sinal,
    Sintoma
}