const db = require('../../config/db')

module.exports = {
    cardiorespiratorios(parent, args, ctx) {
        ctx && ctx.validarAdmin()
        return db('cardiorespiratorios')
    },
    cardiorespiratorio(_, { filtro }, ctx) {
        ctx && ctx.validarAdmin()
        
        if(!filtro) return null
        const { id, nome, pacientes } = filtro
        if(id) {
            return db('cardiorespiratorios')
                .where({ id })
                .first()
        } else if(dataEvolucao) {
            return db('cardiorespiratorios')
                .where({ nome })
                .first()
        } else if(pacientes) {
            return db('cardiorespiratorios')
                .whereIn('paciente_id', pacientes)
                .first()
        }  else {
            return null
        }
    }
}