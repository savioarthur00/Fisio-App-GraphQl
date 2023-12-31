<template>
    <v-container fluid>
      <v-layout>
        <v-flex>
          <v-layout column class="ma-3">
            <h1 class="headline">Novo Paciente</h1>
            <v-divider class="mb-3" />
            <div v-if="erros">
              <Erros :erros="erros" />
            </div>
                    

            <v-text-field label="Nome" v-model="paciente.nome" />

            <v-menu
              ref="dataDoNascimentoMenu"
              v-model="dataDoNascimentoMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
          >
              <template v-slot:activator="{ on }">
                  <v-text-field
                      v-model="paciente.dataDoNascimento"
                      label="Data de Nascimento"
                      readonly
                      v-on="on"
                  ></v-text-field>
              </template>
              <v-date-picker v-model="paciente.dataDoNascimento" @input="calculateAge" no-title></v-date-picker>
          </v-menu>
          <v-text-field label="Idade" v-model="paciente.idade" readonly />



            <v-select label="Sexo" v-model="paciente.sexo" :items="['M', 'F']" outlined></v-select>
            <v-select
                label="Estado Civil"
                v-model="paciente.estadocivil"
                :items="['Solteiro', 'Casado', 'Viúvo']"
                outlined
            ></v-select>
                    
            
            <v-select
                label="Raça"
                v-model="paciente.raca"
                :items="['Branco', 'Preto', 'Pardo', 'Indígena', 'Outro']"
                outlined
            ></v-select>

            
            <v-text-field label="Diagnóstico Clínico" v-model="paciente.diagnosticoClinico" />


            <v-menu
              ref="dataDaAvaliacaoMenu"
              v-model="dataDaAvaliacaoMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="paciente.dataDaAvaliacao"
                  label="Data da Avaliação"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="paciente.dataDaAvaliacao" no-title></v-date-picker>
            </v-menu>

            <v-select label="Usuarios"
                            v-model="paciente.usuarios"
                            :items="usuarios"
                            item-value="id"
                            item-text="nome"
                            attach multiple
                            chips deletable-chips />
                        <v-btn class="ml-0 mt-3"
                            @click="obterUsuario">
                            Selecionar Fisioterapeuta
                        </v-btn>
            <v-btn color="primary" class="ml-0 mt-3" @click="novoPaciente">
              Novo Paciente
            </v-btn>
          </v-layout>
        </v-flex>
        <v-flex>
          <v-layout column class="ma-3">
            <h1 class="headline">Resultado</h1>
            <v-divider />
            <template v-if="dados">
              <v-text-field label="ID" readonly v-model="dados.id" />
              <v-text-field label="Nome" readonly v-model="dados.nome" />
              <v-text-field label="Data da Avaliação" readonly v-model="dados.dataDaAvaliacao" />
              <v-text-field label="Sexo" readonly v-model="dados.sexo" />
              <v-text-field label="Estado Civil" readonly v-model="dados.estadocivil" />
              <v-text-field label="Idade" readonly v-model="dados.idade" />
              <v-text-field label="Raça" readonly v-model="dados.raca" />
              <v-text-field label="Data de Nascimento" readonly v-model="dados.dataDoNascimento" />
              <v-text-field label="Diagnóstico Clínico" readonly v-model="dados.diagnosticoClinico" />
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
        
        paciente: {},
        dados: null,
        erros: null,
        usuarios: []
      }
    },

    computed: {
    usuariosNomes() {
          return (
            this.dados &&
            this.dados.usuarios &&
            this.dados.usuarios.map(p => p.nome).join(', ')
          );
    },
        usuariosSelecionados() {
        if (this.paciente.usuarios) {
          return this.paciente.usuarios.map(id => ({ id }));
        } else {
          return null;
        }
    }

    },
    methods: {
      calculateAge() {
        const birthDate = new Date(this.paciente.dataDoNascimento);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthDate.getFullYear();

       
        if (currentDate.getMonth() < birthDate.getMonth() || (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
            this.paciente.idade = age - 1;
        } else {
            this.paciente.idade = age;
        }
    },
      novoPaciente() {
        this.$api.mutate({
          mutation: gql `
            mutation(
              $nome: String
              $dataDaAvaliacao: String
              $sexo: String
              $estadocivil: String
              $idade: Int
              $raca: String
              $dataDoNascimento: String
              $diagnosticoClinico: String
              $usuarios: [UsuarioFiltro]
            ){
              novoPaciente(
            dados: {
              nome: $nome
              dataDaAvaliacao: $dataDaAvaliacao
              sexo: $sexo
              estadocivil: $estadocivil
              idade: $idade
              raca: $raca
              dataDoNascimento: $dataDoNascimento
              diagnosticoClinico: $diagnosticoClinico     
              usuarios: $usuarios
            }
          ){
            id nome
            dataDaAvaliacao
            sexo idade
            raca dataDoNascimento
            diagnosticoClinico
            estadocivil
            usuarios {
              id
              nome
            }
          }
            }
          `,
          variables: {
            nome: this.paciente.nome,
            dataDaAvaliacao: this.paciente.dataDaAvaliacao,
            sexo: this.paciente.sexo,
            estadocivil: this.paciente.estadocivil,
            idade: parseInt(this.paciente.idade, 10),
            raca: this.paciente.raca,
            dataDoNascimento: this.paciente.dataDoNascimento,
            diagnosticoClinico: this.paciente.diagnosticoClinico,
            usuarios: this.usuariosSelecionados
          }
        }).then(resultado =>{
          this.dados = resultado.data.novoPaciente;
          this.paciente = {};
          this.erros = null;
        }).catch(e=> {
          this.erros = e;
        })
      },
      obterUsuario() {
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
  /* Estilos conforme necessário */
  </style>
  