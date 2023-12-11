const db = require('../../config/db')

module.exports = {
    evolucoes(parent, args, ctx) {
        ctx && ctx.validarAdmin()
        return db('evolucoes')
    },
    evolucao(_, { filtro }, ctx) {
        ctx && ctx.validarAdmin()
        
        if(!filtro) return null
        const { id, texto } = filtro
        if(id) {
            return db('evolucoes')
                .where({ id })
                .first()
        }else if(texto) {
            return db('evolucoes')
                .where({ texto })
                .first()
        }
       
        else {
            return null
        }
    }
}