const db = require('../../config/db')
const { exame: obterExame } = require('../Query/Exame')
const {paciente: obterPaciente}= require('../Query/paciente')
const {usuario: obterUsuario, usuario} = require('../Query/usuario')

module.exports = {
    async novoExame(_, { dados }, ctx) {
        ctx && ctx.validarAdmin()

        const idsPacientes = []
        const idsUsuarios = []

            if(!dados.pacientes || !dados.pacientes.length) {
                dados.pacientes = [{
                    nome: 'Sem paciente'
                }]
            }
            if(!dados.usuarios || !dados.usuarios.length){
                dados.usuarios = [{
                    nome: 'Sem atendentes' 
                }]
            }

            for(let filtro of dados.pacientes) {
                const paciente = await obterPaciente(_, {
                    filtro
                })
                if(paciente) idsPacientes.push(paciente.id)
            }
            
            for(let filtro of dados.usuarios){
                const usuario = await obterUsuario(_,{filtro})
                if(usuario) idsUsuarios.push(usuario.id)
            }
       
        try {
            delete dados.pacientes
            delete dados.usuarios

            const [ id ] = await db('exames')
                .insert(dados)

            for(let paciente_id of idsPacientes) {
                for(let usuario_id of idsUsuarios){
                    await db('pacientes_exames')
                    .insert({ paciente_id, exames_id: id })
                    await db('pacientes_usuarios_exames').insert({paciente_id,usuario_id, exames_id: id})
                }
               
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
                await db('pacientes_usuarios_exames').where({id}).delete()
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
                        const paciente = await obterPaciente(_, {filtro})
                  
                        if(paciente) {
                                await db('pacientes_exames')
                                    .insert({
                                        paciente_id: paciente.id,
                                        exame_id: id
                        })}   
                        for( let filtro of dados.usuarios){
                            const usuario = await obterUsuario(_,{filtro})
                        
                            if(usuario) {
                                await db('pacientes_usuario_exames')
                                    .insert({
                                        paciente_id: paciente.id,
                                        usuario_id: usuario.id,
                                        exame_id: id
                        })}     
                        
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