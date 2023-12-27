<template>
    <v-container fluid>
      <v-layout column>
        <v-flex>
          <v-btn color="primary" class="ml-0 mb-4" @click="obterExames">
            Obter Exames
          </v-btn>
        </v-flex>
        <v-flex>
          <div v-if="erros" class="mb-4">
            <Erros :erros="erros" />
          </div>
        </v-flex>
        <v-flex>
          <v-data-table :headers="headers" :items="exames" hide-actions class="elevation-1">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.id }}</td>
              <td>{{ props.item.pacientes.map(p => p.nome).join(', ') }}</td>
              <td>{{ props.item.nome }}</td>
             
              <td>
                <v-icon @click="editarExame(props.item.id)">edit</v-icon>
              </td>
              
              <td>
             <v-icon @click="apagarExame(props.item)">delete</v-icon>
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
          exames:[],
          headers: [
              { text: 'ID', value: 'id' },
              { text: 'Pacientes', value: 'pacientes' },
              { text: 'Nome', value: 'nome' },
              { text: 'Editar', value: 'editar', sortable: false },
        { text: 'Excluir', value: 'excluir', sortable: false },
          ],
      }
  },
  methods: {
      obterExames () {
        this.$api.query({
              query: gql `              
                  query{
                    exames  {id nome pacientes {nome}}
                    }              
              `,
              fetchPolicy: 'network-only',      


          }).then(resultado =>{
            console.log('Resultado:', resultado);
            this.exames = resultado.data.exames;
            this.erros = null;
          }).catch(e=>{
              this.exames  = []
              this.erros = e
          })
      },
      editarExame(exame) {
      // Lógica para editar o exame
      console.log('Editar exame:', exame);
    },
    apagarExame(exame) {
    const id = exame.id;
    this.$api.mutate({
        mutation: gql `
            mutation($id: Int!) {
                excluirExame(filtro: { id: $id }) {
                    id
                    nome
                }
            }
        `,
        variables: {
            id: id,
        }
    }).then(resultado => {
        if (resultado.data && resultado.data.excluirExame) {
            this.exames = this.exames.filter(ex => ex.id !== resultado.data.excluirExame.id);
            this.erros = null;
        } else {
            this.erros = "Erro ao excluir o exame.";
        }
    }).catch(e => {
        this.erros = e;
    });
  },
  
}
}


</script> 

<style>

</style>
