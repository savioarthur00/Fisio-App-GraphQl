const db = require('../../config/db')

module.exports = {
    exames(parent, args, ctx) {
        ctx && ctx.validarAdmin()
        return db('exames')
    },
    exame(_, { filtro }, ctx) {
        ctx && ctx.validarAdmin()
        
        if(!filtro) return null
        const { id, nome, pacientes } = filtro
        if(id) {
            return db('exames')
                .where({ id })
                .first()
        } else if(dataEvolucao) {
            return db('exames')
                .where({ nome })
                .first()
        } else if (pacientes && pacientes.length > 0) {
            const conditions = pacientes.map((paciente) => ({
              'pacientes.nome': paciente.nome,
            }));
        
            return db('exames')
              .join('pacientes_exames', 'exames.id', 'pacientes_exames.evolucao_id')
              .join('pacientes', 'pacientes.id', 'pacientes_exames.paciente_id')
              .where((builder) => {
                conditions.forEach((condition) => {
                  builder.orWhere(condition);
                });
              })
              .first();
          }  else {
            return null
        }
    }
}