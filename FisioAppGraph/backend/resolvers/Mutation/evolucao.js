const db = require('../../config/db')
const { evolucao: obterEvolucao } = require('../Query/evolucao')
const {paciente: obterPaciente}= require('../Query/paciente')


module.exports = {
    async novoEvolucao(_, { dados }, ctx) {
        ctx && ctx.validarAdmin()

        const idsPacientes = []
       

            if(!dados.pacientes || !dados.pacientes.length) {
                dados.pacientes = [{
                    nome: 'Sem paciente'
                }]
            }
            

            for(let filtro of dados.pacientes) {
                const paciente = await obterPaciente(_, {
                    filtro
                })
                if(paciente) idsPacientes.push(paciente.id)
            }
       
        try {
            delete dados.pacientes
            const [ id ] = await db('evolucoes')
                .insert(dados)

            for(let paciente_id of idsPacientes) {
                await db('pacientes_evolucoes')
                    .insert({ paciente_id, evolucoes_id: id })
            }

            return db('evolucoes')
                .where({ id }).first()

            
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    },


    async excluirEvolucao(_, args, ctx) {
        ctx && ctx.validarAdmin()

        try {
            const evolucao = await obterEvolucao(_, args)
            if(evolucao) {
                const { id } = evolucao
                await db('pacientes_evolucoes')
                    .where({ evolucao_id: id }).delete()
                await db('evolucoes')
                    .where({ id }).delete()
            }
            return evolucao
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    },

    async alterarEvolucao(_, { filtro, dados }, ctx) {
       
        try {
            const evolucao = await obterEvolucao(_, { filtro })
            if(evolucao) {
                const { id } = evolucao
                if(ctx.admin && dados.pacientes) {
                    await db('pacientes_evolucoes')
                        .where({ evolucao_id: id }).delete()

                    for(let filtro of dados.pacientes) {
                        const paciente = await obterPaciente(_, {
                            filtro
                        })
                        
                        if(paciente) {
                            await db('pacientes_evolucoes')
                                .insert({
                                    paciente_id: paciente.id,
                                    evolucao_id: id
                                })
                        }
                    }
                }

               

                delete dados.pacientes
                await db('evolucoes')
                    .where({ id })
                    .update(dados)
            }
            return !evolucao ? null : { ...evolucao, ...dados }
        } catch(e) {
            throw new Error(e)
        }
    }
}