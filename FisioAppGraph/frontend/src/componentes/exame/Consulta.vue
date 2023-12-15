<template>
    <v-container fluid>
      <v-layout>
        <v-flex>
          <v-layout column class="ma-3">
            <h1 class="headline">Consultar Exame</h1>
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
              <v-text-field label="Pacientes" readonly:value="pacientesNomes" />
              <v-text-field label="Nome" readonly v-model="dados.nome" />
              <v-text-field label="FC" readonly v-model="dados.fc" />
              <v-text-field label="FR" readonly v-model="dados.fR" />
              <v-text-field label="PA" readonly v-model="dados.pA" />
              <v-text-field label="SpO2" readonly v-model="dados.spO2" />
              <v-text-field label="Temperatura" readonly v-model="dados.temperatura" />
              <v-text-field label="Peso" readonly v-model="dados.peso" />
              <v-text-field label="Altura" readonly v-model="dados.altura" />
              <v-text-field label="IMC" readonly v-model="dados.iMC" />
              <v-text-field label="Ausculta Pulmonar" readonly v-model="dados.auscultaPulmonar" />
              <v-text-field label="Consciência" readonly v-model="dados.consciencia" />
              <v-text-field label="Formato do Tórax" readonly v-model="dados.formatoTorax" />
              <v-text-field label="Outro formato" readonly v-model="dados.outros" />
              <v-text-field label="Via de Acesso do Ar" readonly v-model="dados.viaDeAcessoDoAr" />
              <v-text-field label="Uso de Oxigenoterapia" readonly v-model="dados.usoDeOxigenoterapia" />
              <v-text-field label="Horário de Uso de Oxigenoterapia" readonly v-model="dados.horario_usoDeOxigenoterapia" />
              <v-text-field label="FiO2" readonly v-model="dados.fiO2" />
              <v-text-field label="Padrão Muscular Ventilatório" readonly v-model="dados.padraoMuscularVentilatorio" />
              <v-text-field label="Ritmo Ventilatório" readonly v-model="dados.ritmoVentilatorio" />
              <v-text-field label="Expansibilidade Torácica" readonly v-model="dados.expansibilidadeToracica" />
              <v-text-field label="Expansibilidade Torácica Assimétrica" readonly v-model="dados.expansibilidadeToracica_Assimetrica" />
              <v-text-field label="Sinais" readonly :value="sinaisNomes" />
              <v-text-field label="Demais Sinais" readonly v-model="dados.demaisSinais" />
              <v-text-field label="Sintomas" readonly :value="sintomasNomes" />
              <v-text-field label="Demais Sintomas" readonly v-model="dados.demaisSintomas" />
              <v-text-field label="Uso de Musculatura Acessória" readonly v-model="dados.usoDeMusculaturaAcessoria" />
              <v-text-field label="Tosse" readonly v-model="dados.tosse" />
              <v-text-field label="Secreção" readonly v-model="dados.secrecao" />
              <v-text-field label="Dispneia" readonly v-model="dados.dispneia" />
              <v-text-field label="Borg" readonly v-model="dados.borg" />
              <v-text-field label="Classificação" readonly v-model="dados.classificacao" />
              <v-text-field label="Escala Modificada do MRC (Pacientes Portadores de DPOC)" readonly v-model="dados.escalaModificadaDoMRC_Pacientes_Portadores_DPOC" />
              <v-text-field label="Cianose" readonly v-model="dados.cianose" />
              <v-text-field label="Avaliação Postural" readonly v-model="dados.avaliacaoPostural" />
              <v-text-field label="Palpação" readonly v-model="dados.palpacao" />
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
                exame(
                  filtro: { id: $id }
                ) {
                  id
                pacientes {
                  id
                  nome
                }
                nome
                fc
                fR
                pA
                spO2
                temperatura
                peso
                altura
                iMC
                auscultaPulmonar
                consciencia
                formatoTorax
                outros
                viaDeAcessoDoAr
                usoDeOxigenoterapia
                horario_usoDeOxigenoterapia
                fiO2
                padraoMuscularVentilatorio
                ritmoVentilatorio
                expansibilidadeToracica
                expansibilidadeToracica_Assimetrica
                sinais{
                  nome
                }
                demaisSinais
                sintomas {
                  nome
                }
                demaisSintomas
                usoDeMusculaturaAcessoria
                tosse
                secrecao
                dispneia
                borg
                classificacao
                escalaModificadaDoMRC_Pacientes_Portadores_DPOC
                cianose
                avaliacaoPostural
                palpacao

                }
              }
            `,
            variables: {
              id: this.filtro.id
            },
            fetchPolicy: 'network-only'
          })
          .then((resultado) => {
            this.dados = resultado.data.exame
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
  