const db = require('../../config/db')

module.exports = {
    evolucoes(parent, args, ctx) {
        ctx && ctx.validarAdmin()
        return db('evolucoes')
    },
    evolucao(_, { filtro }, ctx) {
        ctx && ctx.validarAdmin()
        
        if(!filtro) return null
        const { id, dataEvolucao } = filtro
        if(id) {
            return db('evolucoes')
                .where({ id })
                .first()
        } else if(dataEvolucao) {
            return db('evolucoes')
                .where({ dataEvolucao })
                .first()
        }else {
            return null
        }
    }
}