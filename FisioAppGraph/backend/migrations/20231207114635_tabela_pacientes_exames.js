
exports.up = function(knex, Promise) {
    return knex.schema.createTable('pacientes_exames', table => {
        table.integer('paciente_id').unsigned()
        table.integer('exame_id').unsigned()
        table.foreign('paciente_id').references('pacientes.id')
        table.foreign('exame_id').references('exames.id')
        table.primary(['paciente_id', 'exame_id'])
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pacientes_exames')
};