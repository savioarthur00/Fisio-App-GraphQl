const db = require('../../config/db')

module.exports = {
    pacientes(exame) {
        return db('pacientes')
            .join(
                'pacientes_exames',
                'pacientes.id',
                'pacientes_exames.paciente_id'
            )
            .where({ exame_id: exame.id })
    }
}