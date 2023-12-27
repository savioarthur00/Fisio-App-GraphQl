<template>
  <v-container fluid>
      <v-layout column>
          <v-flex>
              <v-btn color="primary" class="ml-0 mb-4"
                  @click="obterEvolucoes">
                  Obter Evoluções
              </v-btn>
          </v-flex>
          <v-flex>
              <div v-if="erros" class="mb-4">
                  <Erros :erros="erros" />
              </div>
          </v-flex>
          <v-flex>
              <v-data-table :headers="headers" :items="evolucoes" 
                  hide-actions class="elevation-1">
                 
                  <template slot="items" slot-scope="props">
                    

                      <td>{{ props.item.id }}</td>
                      <td>{{ props.item.pacientes
                              .map(p => p.nome)
                              .join(', ') }}</td>
                      <td>{{ props.item.texto}}</td>

                      <td>
                        <v-icon @click="apagarEvolucao(props.item)">delete</v-icon>
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
          evolucoes:[],
          headers: [
              { text: 'ID', value: 'id' },
              { text: 'Pacientes', value: 'pacientes' },
              { text: 'Texto', value: 'texto' },
              { text: 'Excluir', value: 'excluir', sortable: false },
          ],
      }
  },
  methods: {
      obterEvolucoes () {
          this.$api.query({
              query: gql `
              
                  query{
                    evolucoes  {
                          id texto pacientes {nome}
                      }
                  }
              
              `
              ,
              fetchPolicy: 'network-only',
             


          }).then(resultado =>{
            console.log('Resultado:', resultado);
            this.evolucoes = resultado.data.evolucoes;
            this.erros = null;
          }).catch(e=>{
              this.evolucoes  = []
              this.erros = e
          })
      },
      apagarEvolucao(evolucao){
        const id = evolucao.id;
        this.$api.mutate({
                mutation: gql `
                    mutation($id: Int!)
                    {excluirEvolucao(
                            filtro:{id: $id }
                        ){
                            id texto
                        }
                    }
                `, variables: {
                    id: id,
                    
                }
            }).then(resultado => {
        if (resultado.data && resultado.data.excluirEvolucao) {
            this.evolucoes = this.evolucoes.filter(ex => ex.id !== resultado.data.excluirEvolucao.id);
            this.erros = null;
        } else {
            this.erros = "Erro ao excluir evolução.";
        }
    }).catch(e => {
        this.erros = e;
    });
    }
  }
}
</script>

<style>

</style>
