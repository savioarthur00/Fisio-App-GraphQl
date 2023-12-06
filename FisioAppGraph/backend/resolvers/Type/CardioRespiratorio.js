const db = require('../../config/db')

module.exports = {
    pacientes(cardiorespiratorio) {
        return db('pacientes')
            .join(
                'pacientes_cardiorespiratorios',
                'paciente.id',
                'pacientes_cardiorespiratorios.paciente_id'
            )
            .where({ cardiorespiratorio_id: cardiorespiratorio.id })
    }
}