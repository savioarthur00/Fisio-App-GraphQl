const db = require('../../config/db')

module.exports = {
    pacientes(sinal) {
        return db('pacientes')
            .join(
                'pacientes_sinais',
                'pacientes.id',
                'pacientes_sinais.paciente_id'
            )
            .where({ sinal_id: sinal.id })
    }
}