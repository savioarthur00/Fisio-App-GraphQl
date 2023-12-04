<template>
    <v-container fluid>
        <v-layout column>
            <v-flex>
                <v-btn color="primary" class="ml-0 mb-4"
                    @click="obterPacientes">
                    Obter Pacientes
                </v-btn>
            </v-flex>
            <v-flex>
                <div v-if="erros" class="mb-4">
                    <Erros :erros="erros" />
                </div>
            </v-flex>
            <v-flex>
                <v-data-table :headers="headers" :items="pacientes" 
                    hide-actions class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td>{{ props.item.nome }}</td>
                        <td>{{ props.item.usuarios
                                .map(p => p.nome)
                                .join(', ') }}</td>
                    </template>
                </v-data-table>
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
            erros: null,
            pacientes: [],
            headers: [
                { text: 'ID', value: 'id' },
                { text: 'Nome', value: 'nome' },
                { text: 'Usuarios', value: 'usuarios' },
            ],
        }
    },
    methods: {
        obterPacientes() {
            this.$api.query({
                query: gql `
                
                    query{
                        pacientes {
                            id nome  usuarios {nome}
                        }
                    }
                
                `,
                fetchPolicy: 'network-only'


            }).then(resultado =>{
                this.pacientes = resultado.data.pacientes
                this.erros = null
            }).catch(e=>{
                this.pacientes = []
                this.erros = e
            })
        }
    }
}
</script>

<style>

</style>
