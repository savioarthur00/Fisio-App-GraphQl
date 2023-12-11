<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Consultar Paciente</h1>
                    <v-divider class="mb-3" />
                        <div v-if="erros">
                            <Erros :erros="erros" />
                        </div>
                        <v-text-field label="ID"
                            v-model.number="filtro.id" />
                        <v-text-field label="nome"
                            v-model="filtro.nome" />
                        <v-btn color="primary" class="ml-0 mt-3"
                            @click="consultar">
                            Consultar
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
import gql from    'graphql-tag'

export default {
    components: { Erros },
    data() {
        return {
            filtro: {},
            usuarios: [],
            dados: null,
            erros: null
        }
    },
    computed: {
        usuariosNomes() {
            return this.dados && this.dados.usuarios &&
                this.dados.usuarios.map(p => p.nome).join(', ')
        }
    },
    methods: {
        consultar() {            
            this.$api.query({
                query: gql `
                    query(
                        $id: Int
                        $nome: String
                    ){
                        paciente(
                            filtro:{
                                id: $id
                                nome: $nome
                            }
                        ){
                            id nome usuarios{nome}
                        }
                    }

                ` ,
                variables: {
                    id: this.filtro.id,
                    nome: this.filtro.nome
                },
                fetchPolicy: 'network-only'

            }).then(resultado =>{
                this.dados = resultado.data.paciente
                this.filtro ={}
                this.erros= null
            }).catch(e=> {
                this.erros = e
            })

        }
    }
}
</script>

<style>

</style>
