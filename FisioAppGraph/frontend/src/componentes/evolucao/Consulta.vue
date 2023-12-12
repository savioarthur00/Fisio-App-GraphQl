<template>
    <v-container fluid>
      <v-layout>
        <v-flex>
          <v-layout column class="ma-3">
            <h1 class="headline">Consultar Evolução</h1>
            <v-divider class="mb-3" />
            <div v-if="erros">
              <Erros :erros="erros" />
            </div>
            <v-text-field label="ID" v-model.number="filtro.id" />
            <v-btn color="primary" class="ml-0 mt-3" @click="consultar">
              Consultar
            </v-btn>
          </v-layout>
        </v-flex>
        <v-flex>
          <v-layout column class="ma-3">
            <h1 class="headline">Resultado</h1>
            <v-divider />
            <template v-if="dados">
              <v-text-field label="ID" readonly v-model="dados.id" />
              <v-text-field label="Texto" readonly v-model="dados.texto" />
              <v-text-field label="Data da Evolucao" readonly v-model="dados.dataDaEvolucao" />
              <v-text-field label="Descrição do Estado Geral" readonly v-model="dados.descricaoDoEstadoGeral" />
              <v-text-field label="Conduta Aplicada" readonly v-model="dados.condutaAplicada" />
              <v-text-field label="Eventuais Intercorrencias" readonly v-model="dados.eventuaisIntercorrencias" />

              <v-text-field
                label="Paciente"
                readonly
                :value="pacientesNomes"
              />
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
    computed: {
      pacientesNomes() {
        return (
          this.dados &&
          this.dados.pacientes &&
          this.dados.pacientes.map((p) => p.nome).join(', ')
        )
      }
    },
    methods: {
      consultar() {
        this.$api
          .query({
            query: gql`
              query($id: Int) {
                evolucao(
                  filtro: { id: $id }
                ) {
                  id
                  texto
                  dataDaEvolucao
                  descricaoDoEstadoGeral
                  condutaAplicada
                  eventuaisIntercorrencias
                  pacientes {
                    nome
                  }

                }
              }
            `,
            variables: {
              id: this.filtro.id
            },
            fetchPolicy: 'network-only'
          })
          .then((resultado) => {
            this.dados = resultado.data.evolucao
            this.filtro = {}
            this.erros = null
          })
          .catch((e) => {
            this.erros = e
          })
      }
    }
  }
  </script>
  
  <style></style>
  