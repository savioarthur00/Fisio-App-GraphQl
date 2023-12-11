<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Excluir Evolução</h1>
                    <v-divider class="mb-3" />
                    <div v-if="erros">
                        <Erros :erros="erros" />
                    </div>
                    <v-text-field label="ID"
                        v-model.number="filtro.id" />
                    <v-text-field label="texto"
                        v-model="filtro.texto" />

                    <v-btn color="error" class="ml-0 mt-3"
                        @click="excluirEvolucao">
                        Excluir Evolução
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
                        <v-text-field label="Texto" readonly
                            v-model="dados.texto" />
                        
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
            dados: null,
            erros: null
        }
    },
    methods: {
        excluirEvolucao() {
            this.$api.mutate({
                mutation: gql `
                    mutation(
                        $id: Int 
                        $texto: String

                    ){
                        excluirEvolucao(
                            filtro:{
                                id: $id
                                texto: $texto
                            }
                        ){
                            id texto
                        }
                    }
                `, variables: {
                    id: this.filtro.id,
                    texto: this.filtro.texto
                }
            }).then(resultado =>{
                this.dados = resultado.data.excluirEvolucao

                this.filtro ={}
                this.erros = null
            }).catch(e=>{
                this.erros= e
            })
        }
    }
}
</script>

<style>

</style>
