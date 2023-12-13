const db = require('../../config/db');

module.exports = {
  sinais(parent, args, ctx) {
       return db('sinais');
  },
  sinal(_, { filtro }, ctx) {
    ctx && ctx.validarAdmin();    

    if (!filtro) return null;
    const { id, nome } = filtro;

    if (id) {
      return db('sinais')
        .where({ id })
        .first();
    } else if (nome) {
      return db('sinais')
        .where('nome', 'ilike', `%${nome}%`) 
        .first();
    } 
     else {
      return null;
    }
  },
};
