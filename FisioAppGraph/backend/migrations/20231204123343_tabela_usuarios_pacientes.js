
exports.up = function(knex, Promise) {
    return knex.schema.createTable('usuarios_pacientes', table => {
        table.integer('usuario_id').unsigned()
        table.integer('paciente_id').unsigned()
        table.foreign('usuario_id').references('usuarios.id')
        table.foreign('paciente_id').references('pacientes.id')
        table.primary(['usuario_id', 'paciente_id'])
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('usuarios_pacientes')
};