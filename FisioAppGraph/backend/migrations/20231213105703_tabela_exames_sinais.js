
exports.up = function(knex, Promise) {
    return knex.schema.createTable('exames_sinais', table => {
        table.integer('exame_id').unsigned()
        table.integer('sinal_id').unsigned()
        table.foreign('exame_id').references('exames.id')
        table.foreign('sinal_id').references('sinais.id')
        table.primary(['exame_id', 'sinal_id'])
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('exames_sinais')
};