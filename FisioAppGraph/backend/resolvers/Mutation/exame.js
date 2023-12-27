const db = require('../../config/db')
const { exame: obterExame } = require('../Query/Exame')
const { sinal: obterSinal, sinal } = require('../Query/sinal')
const { sintoma: obterSintoma } = require('../Query/sintoma')
const {paciente: obterPaciente}= require('../Query/paciente')



module.exports = {
    async novoExame(_, { dados }, ctx) {
        ctx && ctx.validarAdmin();
    
        const idsPacientes = [];
        const idsSintomas = [];
        const idsSinais = [];
    
        if (!dados.pacientes || !dados.pacientes.length) {
            dados.pacientes = [{
                nome: 'Sem atendente'
            }];
        }
        if (!dados.sintomas || !dados.sintomas.length) {
            dados.sintomas = [{
                nome: 'Sem atendente'
            }];
        }
        if (!dados.sinais || !dados.sinais.length) {
            dados.sinais = [{
                nome: 'Sem atendente'
            }];
        }
    
        for (let filtro of dados.pacientes) {
            const paciente = await obterPaciente(_, {
                filtro
            });
            if (paciente) idsPacientes.push(paciente.id);
        }
        for (let filtro of dados.sinais) {
            const sinal = await obterSinal(_, {
                filtro
            });
            if (sinal) idsSinais.push(sinal.id);
        }
        for (let filtro of dados.sintomas) {
            const sintoma = await obterSintoma(_, {
                filtro
            });
            if (sintoma) idsSintomas.push(sintoma.id);
        }
    
        try {
            delete dados.pacientes;
            delete dados.sinais;
            delete dados.sintomas; 

            const [id] = await db('exames')
                .insert(dados);
    
            for (let paciente_id of idsPacientes) {
                await db('pacientes_exames')
                    .insert({ paciente_id, exame_id: id });
            }
            for (let sinal_id of idsSinais) {
                await db('exames_sinais')
                    .insert({sinal_id,exame_id: id });
            }
            for (let sintoma_id of idsSintomas) {
                await db('exames_sintomas')
                    .insert({ sintoma_id, exame_id: id });
            }
    
            const exameComPaciente = await obterExame(_, { filtro: { id } });
           
    
            return exameComPaciente;
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    },
    

    async excluirExame(_, args, ctx) {
        ctx && ctx.validarAdmin()

        try {
            const exame = await obterExame(_, args)
            if(exame) {
                const { id } = exame
                await db('pacientes_exames')
                    .where({ exame_id: id }).delete()
                await db('exames_sinais')
                    .where({ exame_id: id }).delete()
                await db('exames_sintomas')
                    .where({ exame_id: id }).delete()
                await db('exames')
                    .where({ id }).delete()
            }
            return exame
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    },

    async alterarExame(_, { filtro, dados }, ctx) {
       
        try {
            const exame = await obterExame(_, { filtro })
            if(exame) {
                const { id } = exame
                if(ctx.admin && dados.pacientes) {
                    await db('pacientes_exames')
                        .where({ exame_id: id }).delete()

                    for(let filtro of dados.pacientes) {
                        const paciente = await obterPaciente(_, {
                            filtro
                        })
                        
                        if(paciente) {
                            await db('pacientes_exames')
                                .insert({
                                    paciente_id: paciente.id,
                                    exame_id: id
                                })
                        }
                    }
                    for(let filtro of dados.pacientes) {
                        const sinal = await obterSinal(_, {
                            filtro
                        })
                        if(sinal) {
                            await db('exames_sinais')
                                .insert({
                                    sinal_id: sinal.id,
                                    exame_id: id
                                })
                        }
                    }
                    for(let filtro of dados.pacientes) {
                        const sintoma = await obterSintoma(_, {
                            filtro
                        })
                    
                        if(sintoma) {
                            await db('exames_sintomas')
                                .insert({
                                    sintoma_id: sintoma.id,
                                    exame_id: id
                                })
                        }
                    
                    }
                }
             

                
                await db('exames')
                    .where({ id })
                    .update(dados)
            }
            return !exame ? null : { ...exame, ...dados }
        } catch(e) {
            throw new Error(e)
        }
    }
}