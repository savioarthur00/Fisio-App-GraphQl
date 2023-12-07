

exports.up = function(knex, Promise) {
    return knex.schema.createTable('evolucoes', table => {
        table.increments('id').primary()
        table.string('nome').notNull().unique()
        table.string('dataDaEvolucao')
        table.string('descricaoDoEstadoGeral')
        table.string('condutaAplicada')
        table.string('eventuaisIntercorrencias')  
        table.string('texto')     
              
        table.timestamp('data_criacao')
            .defaultTo(knex.fn.now())
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('evolucoes')
};
