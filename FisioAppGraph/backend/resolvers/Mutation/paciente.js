const db = require('../../config/db')
const { paciente: obterPaciente } = require('../Query/paciente')
const { usuario: obterUsuario } = require('../Query/usuario')
module.exports = {
    async novoPaciente(_, { dados }, ctx) {
        ctx && ctx.validarAdmin()

        const idsUsuarios = []

            if(!dados.usuarios || !dados.usuarios.length) {
                dados.usuarios = [{
                    nome: 'Sem atendente'
                }]
            }

            for(let filtro of dados.usuarios) {
                const usuario = await obterUsuario(_, {
                    filtro
                })
                if(usuario) idsUsuarios.push(usuario.id)
            }
       
        try {
            delete dados.usuarios
            const [ id ] = await db('pacientes')
                .insert(dados)

            for(let usuario_id of idsUsuarios) {
                await db('usuarios_pacientes')
                    .insert({ usuario_id, paciente_id: id })
            }

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