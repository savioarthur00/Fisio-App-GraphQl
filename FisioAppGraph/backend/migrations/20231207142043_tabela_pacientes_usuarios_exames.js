

exports.up = function(knex, Promise) {
    return knex.schema.createTable('pacientes_usuarios_exames', table => {
        table.integer('paciente_id').unsigned()
        table.integer('usuario_id').unsigned()
        table.integer('exame_id').unsigned()
        table.foreign('paciente_id').references('pacientes.id')
        table.foreign('exame_id').references('exames.id')
        table.foreign('usuario_id').references('usuarios.id')
        table.primary(['paciente_id', 'exame_id','usuario_id'])
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pacientes_usuarios_exames')
};