

exports.up = function(knex, Promise) {
    return knex.schema.createTable('sintomas', table => {
        table.increments('id').primary()
        table.string('nome')       
              
        table.timestamp('data_criacao')
            .defaultTo(knex.fn.now())
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('sintomas')
};
