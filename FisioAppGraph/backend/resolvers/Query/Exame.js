const db = require('../../config/db')

module.exports = {
    exames(parent, args, ctx) {
        ctx && ctx.validarAdmin()
        return db('exames')
    },
    exame(_, { filtro }, ctx) {
        ctx && ctx.validarAdmin()
        
        if(!filtro) return null
        const { id, nome, pacientes, sinais, sintomas } = filtro
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
              .join('pacientes_exames', 'exames.id', 'pacientes_exames.exame_id')
              .join('pacientes', 'pacientes.id', 'pacientes_exames.paciente_id')
              .where((builder) => {
                conditions.forEach((condition) => {
                  builder.orWhere(condition);
                });
              })
              .first();
          } else if (sinais && sinais.length > 0) {
            const conditions = sinais.map((sinal) => ({
              'sinais.nome': sinal.nome,
            }));
        
            return db('exames')
              .join('exames_sinais', 'exames.id', 'exames_sinais.exame_id')
              .join('sinais', 'sinais.id', 'exames_sinais.sinal_id')
              .where((builder) => {
                conditions.forEach((condition) => {
                  builder.orWhere(condition);
                });
              })
              .first();
          }else if (sintomas && sintomas.length > 0) {
            const conditions = sintomas.map((sintoma) => ({
              'sintomas.nome': sintoma.nome,
            }));
        
            return db('exames')
              .join('exames_sintomas', 'exames.id', 'exames_sintomas.exame_id')
              .join('sintomas', 'sintomas.id', 'exames_sintomas.sintoma_id')
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