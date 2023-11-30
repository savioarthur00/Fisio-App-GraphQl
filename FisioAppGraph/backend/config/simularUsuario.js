const db = require('./db')
const {getUsuarioLogado} = require('../resolvers/Comum/usuario')

const sql = 
`
    select 
        u.*
    from 
        usuarios u,
        usuarios_perfis up,
        perfis p
    where 
        up.usuario_id = u.id and 
        up.perfil_id = p.id and
        u.ativo = 1 and 
        p.nome = :nomePerfil
    limit 1
`

const getUsuario = async nomePerfil =>{

    const resposta= await db.raw(sql,{nomePerfil})
    return resposta ? resposta[0][0] : null

}

module.exports = async req =>{
    const usuario = await getUsuario('comum')
    if(usuario){
        const {token} = await getUsuarioLogado(usuario)

        req.headers = {
            authorization: `Bearer ${token}`
        }
    }
}