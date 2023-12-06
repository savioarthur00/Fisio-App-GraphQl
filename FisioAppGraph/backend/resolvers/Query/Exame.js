const db = require('../../config/db')

module.exports = {
    exames(parent, args, ctx) {
        ctx && ctx.validarAdmin()
        return db('exames')
    },
    exame(_, { filtro }, ctx) {
        ctx && ctx.validarAdmin()
        
        if(!filtro) return null
        const { id, nome, pacientes } = filtro
        if(id) {
            return db('exames')
                .where({ id })
                .first()
        } else if(dataEvolucao) {
            return db('exames')
                .where({ nome })
                .first()
        } else if(pacientes) {
            return db('exames')
                .whereIn('paciente_id', pacientes)
                .first()
        }  else {
            return null
        }
    }
}