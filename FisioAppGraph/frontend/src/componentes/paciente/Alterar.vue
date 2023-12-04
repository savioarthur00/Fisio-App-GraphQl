<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Filtrar Paciente</h1>
                    <v-divider class="mb-3" />
                    <div v-if="erros">
                        <Erros :erros="erros" />
                    </div>
                    <v-text-field label="ID"
                        v-model.number="filtro.id" />
                    <v-text-field label="nome"
                        v-model="filtro.nome" />

                    <h1 class="mt-4 headline">Alterar Paciente</h1>
                    <v-divider class="mb-3" />
                    <v-text-field label="Nome"
                        v-model="paciente.nome" />                    
                    <v-select label="Usuarios"
                        v-model="paciente.usuarios"
                        :items="usuarios"
                        item-value="id"
                        item-text="nome"
                        attach multiple
                        chips deletable-chips />
                    <v-btn class="ml-0 mt-3"
                        @click="obterUsuarios">
                        Obter Usuario
                    </v-btn>
                    <v-btn color="primary" class="ml-0 mt-3"
                        @click="alterarPaciente">
                        Alterar Paciente
                    </v-btn>
                </v-layout>
            </v-flex>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Resultado</h1>
                    <v-divider />
                    <template v-if="dados">
                        <v-text-field label="ID" readonly
                            v-model="dados.id" />
                        <v-text-field label="Nome" readonly
                            v-model="dados.nome" />
                        
                        <v-text-field label="Usuarios" readonly
                            :value="usuariosNomes" />
                    </template>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Erros from '../comum/Erros'
import gql from 'graphql-tag'

export default {
    components: { Erros },
    data() {
        return {
            filtro: {},
            paciente: {},
            usuarios: [],
            dados: null,
            erros: null
        }
    },
    computed: {
        usuariosNomes() {
            return this.dados && this.dados.usuarios &&
                this.dados.usuarios.map(p => p.nome).join(', ')
        },
        usuariosSelecionados() {
            if(this.paciente.usuarios) {
                return this.paciente.usuarios.map(id => ({ id }))
            } else {
                return null
            }
        }
    },
    methods: {
        alterarPaciente() {
            this.$api.mutate({
                mutation: gql `
                    mutation(
                        $idFiltro: Int                        
                        $nomeFiltro: String                    
                        $nome: String
                        $usuarios: [UsuarioFiltro]
                    ){
                        alterarPaciente(
                            filtro:{
                                id: $idFiltro
                                nome: $nomeFiltro

                            }
                            dados:{
                                nome: $nome
                                usuarios:$usuarios
                            }
                        ){
                            id nome usuarios {nome}
                        }
                    }
                
                `,
                variables: {
                    idFiltro: this.filtro.id,
                    nomeFiltro: this.filtro.nome,
                   
                    usuarios: this.usuariosSelecionados
                }
            }). then (resultado =>{
                this.dados = resultado.data.alterarPaciente
                this.filtro = {}
                this.paciente = {}
                this.erros = null

            }).catch(e=>{
                this.erros = e
            })
        },
        obterUsuarios() {
            this.$api.query({
            query: gql ` {usuarios {id nome}} `
        }).then(resultado => {
            this.usuarios = resultado.data.usuarios
            this.erros = null
        }).catch(e=> {
            this.erros = e
        })
        }
    }
}
</script>

<style>

</style>
