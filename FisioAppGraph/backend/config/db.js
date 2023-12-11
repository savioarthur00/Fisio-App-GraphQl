const config = require('../knexfile.js');
const knex = require('knex')(config);

// Ativar o modo de debug para ver logs
knex.on('query', (query) => {
  console.log('Knex query:', query);
});

module.exports = knex;
