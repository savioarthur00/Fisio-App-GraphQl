const db = require('../../config/db')

module.exports = {
    exames(sintoma) {
        return db('exames')
            .join(
                'exames_sintomas',
                'exames.id',
                'exames_sintomas.exame_id'
            )
            .where({ sintoma_id: sintoma.id })
    }
}