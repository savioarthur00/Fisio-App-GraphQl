
exports.up = function(knex, Promise) {
    return knex.schema.createTable('pacientes_evolucoes', table => {
        table.integer('paciente_id').unsigned()
        table.integer('evolucao_id').unsigned()
        table.foreign('paciente_id').references('pacientes.id')
        table.foreign('evolucao_id').references('evolucoes.id')
        table.primary(['paciente_id', 'evolucao_id'])
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pacientes_evolucoes')
};