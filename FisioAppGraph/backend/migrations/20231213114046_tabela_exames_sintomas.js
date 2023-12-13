
exports.up = function(knex, Promise) {
    return knex.schema.createTable('exames_sintomas', table => {
        table.integer('exame_id').unsigned()
        table.integer('sintoma_id').unsigned()
        table.foreign('exame_id').references('exames.id')
        table.foreign('sintoma_id').references('sintomas.id')
        table.primary(['exame_id', 'sintoma_id'])
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('exames_sintomas')
};