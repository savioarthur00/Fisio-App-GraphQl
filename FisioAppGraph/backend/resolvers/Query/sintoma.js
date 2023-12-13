const db = require('../../config/db');

module.exports = {
  sintomas(parent, args, ctx) {
       return db('sintomas');
  },
  sintoma(_, { filtro }, ctx) {
    ctx && ctx.validarAdmin();    

    if (!filtro) return null;
    const { id, nome } = filtro;

    if (id) {
      return db('sintomas')
        .where({ id })
        .first();
    } else if (nome) {
      return db('sintomas')
        .where('nome', 'ilike', `%${nome}%`) 
        .first();
    } 
     else {
      return null;
    }
  },
};
