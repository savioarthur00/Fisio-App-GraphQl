const db = require('../../config/db')
const { exame: obterExame } = require('../Query/Exame')
const {paciente: obterPaciente}= require('../Query/paciente')
module.exports = {
    async novoExame(_, { dados }, ctx) {
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
            const [ id ] = await db('exames')
                .insert(dados)

            for(let paciente_id of idsPacientes) {
                await db('pacientes_exames')
                    .insert({ paciente_id, exames_id: id })
            }

            return db('exames')
                .where({ id }).first()

            
        } catch(e) {
            throw new Error(e.sqlMessage)
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
                }

               

                delete dados.pacientes
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