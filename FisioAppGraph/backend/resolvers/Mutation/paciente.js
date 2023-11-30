const db = require('../../config/db')
const { paciente: obterPaciente } = require('../Query/paciente')

module.exports = {
    async novoPaciente(_, { dados }, ctx) {
        ctx && ctx.validarAdmin()
       
        try {
            const [ id ] = await db('pacientes')
                .insert(dados)
            return db('pacientes')
                .where({ id }).first()
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    },
    async excluirPaciente(_, args, ctx) {
        ctx && ctx.validarAdmin()

        try {
            const paciente = await obterPaciente(_, args)
            if(paciente) {
                const { id } = paciente
                await db('usuarios_pacientes')
                    .where({ paciente_id: id }).delete()
                await db('pacientes')
                    .where({ id }).delete()
            }
            return paciente
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    },
    async alterarPaciente(_, { filtro, dados }, ctx) {
        ctx && ctx.validarAdmin()
        try {
            const paciente= await obterPaciente(_, { filtro })
            if(paciente) {
                const { id } = paciente
                await db('pacientes')
                    .where({ id })
                    .update(dados)
            }
            return { ...paciente, ...dados }
        } catch(e) {
            throw new Error(e.sqlMessage)
        }
    }
}