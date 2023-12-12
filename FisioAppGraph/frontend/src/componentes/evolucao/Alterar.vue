<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Filtrar Evolução</h1>
                    <v-divider class="mb-3" />
                    <div v-if="erros">
                        <Erros :erros="erros" />
                    </div>
                    <v-text-field label="ID"
                        v-model.number="filtro.id" />
                    

                    <h1 class="mt-4 headline">Alterar Evolução</h1>
                    <v-divider class="mb-3" />
              
                    
                        
                    <v-menu
                            ref="Data da evolução"
                            v-model="dataDaEvolucaoMenu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="evolucao.dataDaEvolucao"
                                    label="Data da evolução"
                                    readonly
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="evolucao.dataDaEvolucao" @input="calculateAge" no-title></v-date-picker>
                        </v-menu>

                     
                     <v-text-field label="Conduta Aplicada" v-model="evolucao.condutaAplicada"  />

                     <v-text-field label=" Descrição do Estado Geral"
                        v-model="evolucao.descricaoDoEstadoGeral" />
                    
                        
                        
                    <v-text-field label=" Eventuais Intercorrencias"
                        v-model="evolucao.eventuaisIntercorrencias" />
                    
                        <v-textarea label="Texto" v-model="evolucao.texto" />

                    <v-select label="Pacientes"
                        v-model="evolucao.pacientes"
                        :items="pacientes"
                        item-value="id"
                        item-text="nome"
                        attach multiple
                        chips deletable-chips />
                    <v-btn class="ml-0 mt-3"
                        @click="obterPacientes">
                        Obter Paciente
                    </v-btn>
                    <v-btn color="primary" class="ml-0 mt-3"
                        @click="alterarEvolucao">
                        Alterar Evolução
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
                    <v-text-field label="Data da Evolução" readonly v-model="dados.dataDaEvolucao" />                    
                    <v-text-field label="Descrição do Estado Geral" readonly v-model="dados.descricaoDoEstadoGeral" />
                    <v-text-field label="Conduta Aplicada" readonly v-model="dados.condutaAplicada" />
                    <v-text-field label="Eventuais Intercorrencias" readonly v-model="dados.eventuaisIntercorrencias" />
                    <v-text-field label="Pacientes" readonly :value="pacientesNomes" />
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
            evolucao: {},
            pacientes: [],
            dados: null,
            erros: null
        }
    },
    computed: {
        pacientesNomes() {
            return this.dados && this.dados.pacientes &&
                this.dados.pacientes.map(p => p.nome).join(', ')
        },
        pacientesSelecionados() {
            if(this.evolucao.pacientes) {
                return this.evolucao.pacientes.map(id => ({ id }))
            } else {
                return null
            }
        }
    },
    methods: {
       
        alterarEvolucao() {
            this.$api.mutate({
                mutation: gql `
                    mutation(
                        $idFiltro: Int                        
                                          
                        $pacientes:[PacienteFiltro]
                        $dataDaEvolucao:String
                        $descricaoDoEstadoGeral: String
                        $condutaAplicada: String
                        $eventuaisIntercorrencias: String
                        $texto:String                       
                    ){
                        alterarEvolucao(
                            filtro:{
                                id: $idFiltro
                               

                            }
                            dados:{
                            pacientes:$pacientes
                            dataDaEvolucao:$dataDaEvolucao
                            descricaoDoEstadoGeral:$descricaoDoEstadoGeral
                            condutaAplicada:$condutaAplicada
                            eventuaisIntercorrencias:$eventuaisIntercorrencias
                            texto:$texto              
                            }
                        ){
                            id texto
                            dataDaEvolucao
                            descricaoDoEstadoGeral
                            condutaAplicada
                            eventuaisIntercorrencias                           
                            pacientes {
                                nome
                            }
                        }}
                
                `,
                variables: {
                    idFiltro: this.filtro.id,
                    
                    texto: this.evolucao.texto,
                    dataDaEvolucao: this.evolucao.dataDaEvolucao,                   
                    condutaAplicada: this.evolucao.condutaAplicada,
                    eventuaisIntercorrencias: this.evolucao.eventuaisIntercorrencias,
                    descricaoDoEstadoGeral: this.evolucao.descricaoDoEstadoGeral,                  

                    pacientes: this.pacientesSelecionados
                }
            }). then (resultado =>{
                this.dados = resultado.data.alterarEvolucao
                this.filtro = {}
                this.evolucao = {}
                this.erros = null

            }).catch(e=>{
                this.erros = e
            })
        },
        obterPacientes() {
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

</style>
