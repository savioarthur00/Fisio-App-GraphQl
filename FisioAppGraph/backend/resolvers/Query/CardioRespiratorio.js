const db = require('../../config/db')

module.exports = {
    cardiorespiratorios(parent, args, ctx) {
        ctx && ctx.validarAdmin()
        return db('cardiorespiratorios')
    },
    cardiorespiratorio(_, { filtro }, ctx) {
        ctx && ctx.validarAdmin()
        
        if(!filtro) return null
        const { id, dataEvolucao, pacientes, usuarios } = filtro
        if(id) {
            return db('cardiorespiratorios')
                .where({ id })
                .first()
        } else if(dataEvolucao) {
            return db('cardiorespiratorios')
                .where({ dataEvolucao })
                .first()
        } else if(pacientes) {
            return db('cardiorespiratorios')
                .where({ pacientes })
                .first()
        } else if(usuarios) {
            return db('cardiorespiratorios')
                .where({ usuarios })
                .first()
        } else {
            return null
        }
    }
}