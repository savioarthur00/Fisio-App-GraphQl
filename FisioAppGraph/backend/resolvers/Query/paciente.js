const db = require('../../config/db')

module.exports = {
    pacientes(parent, args, ctx) {
        ctx && ctx.validarAdmin()
        return db('pacientes')
    },
    paciente(_, { filtro }, ctx) {
        ctx && ctx.validarAdmin()
        
        if(!filtro) return null
        const { id, nome } = filtro
        if(id) {
            return db('pacientes')
                .where({ id })
                .first()
        } else if(nome) {
            return db('pacientes')
                .where({ nome })
                .first()
        } else {
            return null
        }
    }
}