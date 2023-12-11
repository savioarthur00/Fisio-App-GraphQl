<template>
    <v-container fluid>
      <v-layout>
        <v-flex>
          <v-layout column class="ma-3">
            <h1 class="headline">Nova Evolução</h1>
            <v-divider class="mb-3" />
            <div v-if="erros">
              <Erros :erros="erros" />
            </div>
                    
            
            <v-select
                      label="Pacientes"
                      v-model="evolucao.pacientes"
                      :items="pacientes"
                      item-value="id"
                      item-text="nome"
                      attach
                      multiple
                      chips
                      deletable-chips
           />

            <v-btn class="ml-0 mt-3"
                            @click="obterPaciente">
                            Selecionar Paciente
            </v-btn>
            
            <v-menu
              ref="dataDaEvolucaoMenu"
              v-model="dataDaEvolucaoMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
            <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="evolucao.dataDaEvolucao"
                  label="Data Da Evolução"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="evolucao.dataDaEvolucao" no-title></v-date-picker>
            </v-menu>

            <v-text-field label="Descricao Do EstadoGeral" v-model="evolucao.descricaoDoEstadoGeral" />

            <v-text-field label="Conduta Aplicada" v-model="evolucao.condutaAplicada" />

            <v-text-field label="Eventuais Intercorrencias" v-model="evolucao.eventuaisIntercorrencias" />
            
            <v-textarea label="Texto" v-model="evolucao.texto" />

                        
           
            <v-btn color="primary" class="ml-0 mt-3" @click="novoEvolucao">
              Adicionar Evolução
            </v-btn>


          </v-layout>
        </v-flex>
        <v-flex>
          <v-layout column class="ma-3">
            <h1 class="headline">Resultado</h1>
            <v-divider />
            <template v-if="dados">
              
              <v-text-field label="ID" readonly v-model="dados.id" />
              <v-text-field label="Pacientes" readonly:value="pacientesNomes" />
              <v-text-field label="Data da Avaliação" readonly v-model="dados.dataDaEvolucao" />

              <v-text-field label="descricaoDoEstadoGeral" readonly v-model="dados.descricaoDoEstadoGeral" />
              
              <v-text-field label="condutaAplicada" readonly v-model="dados.condutaAplicada" />

              <v-text-field label="eventuaisIntercorrencias" readonly v-model="dados.eventuaisIntercorrencias" />

              <v-text-field label="texto" readonly v-model="dados.texto" />
              
              
              

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
        evolucao:{},
        pacientes: [],
        dados: null,
        erros: null,
       
      }
    },

    computed: {
    
    pacientesNomes() {
          return (
            this.dados &&
            this.dados.pacientes &&
            this.dados.pacientes.map(p => p.nome).join(', ')
          );
    },
    
    pacientesSelecionados() {
        if (Array.isArray(this.evolucao.pacientes)) {
            return this.evolucao.pacientes.map(id => ({ id }));
        } else {
            return null;
        }
    }

    },
    methods: {      
      novoEvolucao() {
        this.$api.mutate({
          mutation: gql `
            mutation(

            
              $dataDaEvolucao: String
              $descricaoDoEstadoGeral: String
              $condutaAplicada: String
              $eventuaisIntercorrencias: String
              $texto: String
              $pacientes: [PacienteFiltro]  
              
              
            ){
              novoEvolucao(
            dados: {
              
              dataDaEvolucao: $dataDaEvolucao
              descricaoDoEstadoGeral: $descricaoDoEstadoGeral
              condutaAplicada: $condutaAplicada
              eventuaisIntercorrencias: $eventuaisIntercorrencias
              texto: $texto
              pacientes: $pacientes
                
             
            }
          ){
           
            id          
            dataDaEvolucao
            descricaoDoEstadoGeral
            condutaAplicada
            eventuaisIntercorrencias
            texto
            pacientes{ 
               id nome
            }
          }
          }
          `,
          variables: {
            
            dataDaEvolucao: this.evolucao.dataDaEvolucao,
            descricaoDoEstadoGeral: this.evolucao.descricaoDoEstadoGeral,
            condutaAplicada: this.evolucao.condutaAplicada,
            eventuaisIntercorrencias: this.evolucao.eventuaisIntercorrencias,
            texto: this.evolucao.texto,
            pacientes: this.pacientesSelecionados
            
            
          }
        }).then(resultado =>{
          this.dados = resultado.data.novoEvolucao;
          this.evolucao = {};
          this.erros = null;
        }).catch(e=> {
          this.erros = e;
        })
      },
      
      obterPaciente() {
        this.$api.query({
            query: gql ` {pacientes {id nome}} `
        }).then(resultado => {
            this.pacientes = resultado.data.pacientes
            this.erros = null
        }).catch(e=> {
            this.erros = e
        })
            
        }
    }
  }
  </script>
  
  <style>
  /* Estilos conforme necessário */
  </style>
  