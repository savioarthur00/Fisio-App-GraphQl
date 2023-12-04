const db = require('../../config/db')

module.exports = {
    pacientes(evolucao) {
        return db('pacientes')
            .join(
                'pacientes_evolucoes',
                'paciente.id',
                'pacientes_evolucoes.paciente_id'
            )
            .where({ evolucao_id: evolucao.id })
    }
}