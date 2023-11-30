const db = require('../../config/db')

module.exports = {
    medicamentos(parent, args, ctx) {
        ctx && ctx.validarAdmin()
        return db('medicamentos')
    },
    medicamento(_, { filtro }, ctx) {
        ctx && ctx.validarAdmin()
        
        if(!filtro) return null
        const { id, nome } = filtro
        if(id) {
            return db('medicamentos')
                .where({ id })
                .first()
        } else if(nome) {
            return db('medicamentos')
                .where({ nome })
                .first()
        } else {
            return null
        }
    }
}