exports.up = function(knex, Promise) {
    return knex.schema.createTable('exames', table => {
        table.increments('id').primary()
        table.string('nome').notNull().unique()
        table.string('fc')
        table.string('fR')
        table.string('pA')
        table.integer('spO2')
        table.integer('temperatura')
        table.float('peso')
        table.float('altura')
        table.float('IMC')
        table.string('auscultaPulmonar')
        table.string('consciencia')
        table.string('formatoTorax')
        table.string('outros')
        table.string('viaDeAcessoDoAr')
        table.string('usoDeOxigenoterapia')
        table.string('horario_usoDeOxigenoterapia')
        table.string('fiO2')
        table.string('padraoMuscularVentilatorio')
        table.string('ritmoVentilatorio')
        table.string('expansibilidadeToracica')
        table.string('expansibilidadeToracica_Assimetrica')
        table.string('demaisSinais')
        table.string('demaisSintomas')
        table.string('usoDeMusculaturaAcessoria')
        table.string('tosse')
        table.string('secrecao')
        table.string('dispneia')
        table.string('borg')
        table.string('classificacao')
        table.string('escalaModificadaDoMRC_Pacientes_Portadores_DPOC')
        table.string('cianose')
        table.string('avaliacaoPostural')
        table.string('palpacao')
              
        table.timestamp('data_criacao')
            .defaultTo(knex.fn.now())
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('exames')
  };
 