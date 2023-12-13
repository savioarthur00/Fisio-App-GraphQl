const db = require('../../config/db')

module.exports = {
    exames(sinal) {
        return db('exames')
            .join(
                'exames_sinais',
                'exames.id',
                'exames_sinais.exame_id'
            )
            .where({ sinal_id: sinal.id })
    }
}