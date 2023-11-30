
exports.up = function(knex, Promise) {
    return knex.schema.createTable('pacientes', table => {
        table.increments('id').primary()
        table.string('nome').notNull().unique()
        table.string('dataDaAvaliacao').notNull()
        table.string('sexo').notNull()
        table.string('estadocivil').notNull()
        table.string('idade').notNull()
        table.string('raca').notNull()
        table.string('dataDoNascimento').notNull()
        table.string('diagnosticoClinico').notNull()
        table.timestamp('data_criacao')
            .defaultTo(knex.fn.now())
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pacientes')
  };
 