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

                                
                <td>
                <v-icon @click="apagarPaciente(props.item)">delete</v-icon>
                </td>
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
        },
        
        async apagarPaciente(paciente) {
    const id = paciente.id;

    try {
      
      const { data } = await this.$api.query({
        query: gql`
          query {
            pacientes_by_pk(id: ${id}) {
              id
              evolucoes {
                id
              }
            }
          }
        `,
      });

      const evolucoes = data.pacientes_by_pk.evolucoes;

       if (evolucoes.length > 0) {
        this.erros = "Há evoluções registradas nesse paciente. Você deve removê-las antes de apagar o paciente.";
        return;
      }

    
      await this.$api.mutate({
        mutation: gql`
          mutation($id: Int!) {
            excluirPaciente(filtro: { id: $id }) {
              id
            }
          }
        `,
        variables: {
          id: id,
        },
      });

      this.erros = null; 
    } catch (error) {
      this.erros = "Erro ao excluir paciente. Por favor, tente novamente mais tarde.";
      console.error(error); 
  }        
 }}
}
</script>

<style>

</style>
