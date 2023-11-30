const db = require('../../config/db')

module.exports = {
    usuarios(paciente) {
        return db('usuarios')
            .join(
                'usuarios_pacientes',
                'usuarios.id',
                'usuarios_pacientes.usuario_id'
            )
            .where({ paciente_id: paciente.id })
    }
}