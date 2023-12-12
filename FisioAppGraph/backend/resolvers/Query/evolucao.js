const db = require('../../config/db');

module.exports = {
  evolucoes(parent, args, ctx) {
    ctx && ctx.validarAdmin();
    return db('evolucoes');
  },
  evolucao(_, { filtro }, ctx) {
    ctx && ctx.validarAdmin();
    console.log('Filtro:', filtro);

    if (!filtro) return null;
    const { id, texto, pacientes } = filtro;

    if (id) {
      return db('evolucoes')
        .where({ id })
        .first();
    } else if (texto) {
      return db('evolucoes')
        .where('texto', 'ilike', `%${texto}%`) 
        .first();
    } else if (pacientes && pacientes.length > 0) {
      const conditions = pacientes.map((paciente) => ({
        'pacientes.nome': paciente.nome,
      }));
  
      return db('evolucoes')
        .join('pacientes_evolucoes', 'evolucoes.id', 'pacientes_evolucoes.evolucao_id')
        .join('pacientes', 'pacientes.id', 'pacientes_evolucoes.paciente_id')
        .where((builder) => {
          conditions.forEach((condition) => {
            builder.orWhere(condition);
          });
        })
        .first();
    } else {
      return null;
    }
  },
};
