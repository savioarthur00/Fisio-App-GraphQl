<template>
    <v-container fluid>
      <v-layout>
        <v-flex>
          <v-layout column class="ma-3">
            <h1 class="headline">Novo Exame</h1>
            <v-divider class="mb-3" />
            <div v-if="erros">
              <Erros :erros="erros" />
            </div>
                    
            
            <v-select
                      label="Pacientes"
                      v-model="exame.pacientes"
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
            
            <v-text-field label="Nome" v-model="exame.nome" />
            <v-text-field label="FC" v-model="exame.fc" />
            <v-text-field label="FR" v-model="exame.fR" />
            <v-text-field label="PA" v-model="exame.pA" />
            <v-text-field label="SpO2" v-model="exame.spO2" />
            <v-text-field label="Temperatura" v-model="exame.temperatura" />
            <v-text-field label="Peso" v-model="exame.peso" />
            <v-text-field label="Altura" v-model="exame.altura" />
            <v-text-field label="IMC" v-model="exame.iMC" />
            <v-text-field label="Ausculta Pulmonar" v-model="exame.auscultaPulmonar" />

            <v-select
              label="Consciência"
              v-model="exame.consciencia"
              :items="['Normal', 'Obnubilação', 'Torpor', 'Coma']"
              outlined />  



            <v-select
              label="Formato do Tórax"
              v-model="exame.formatoTorax"
              :items="['Normal', 'Tonel', 'Carinatum', 'Scavatum', 'Sinus']"
              outlined
            />


            <v-text-field label="Outro formato" v-model="exame.outros" />

            <v-select
                label="Via de Acesso do Ar"
                v-model="exame.viaDeAcessoDoAr"
                :items="['Nasal', 'Oral', 'Traqueostomia']"
                outlined
              />
            
           
              <v-select
                label="Uso de Oxigenoterapia"
                v-model="exame.usoDeOxigenoterapia"
                :items="['Não', 'Sim', 'Contínuo', 'Durante horários específicos']"
                outlined
            />

            <v-text-field label="Horário de Uso de Oxigenoterapia" v-model="exame.horario_usoDeOxigenoterapia" />
            <v-text-field label="FiO2" v-model="exame.fiO2" />

            <v-select
              label="Padrão Muscular Ventilatório"
              v-model="exame.padraoMuscularVentilatorio"
              :items="['Apical', 'Diafragmático', 'Misto', 'Paradoxal']"
              outlined
          />


          <v-select
              label="Ritmo Ventilatório"
              v-model="exame.ritmoVentilatorio"
              :items="['Regular', 'Irregular']"
              outlined
          />


            <v-select
              label="Expansibilidade Torácica"
              v-model="exame.expansibilidadeToracica"
              :items="['Normal', 'Reduzida', 'Simétrica' , 'Assimétrica']"
              outlined
            />
                        
            <v-text-field label="Quanto de Expansibilidade Torácica Assimétrica" v-model="exame.expansibilidadeToracica_Assimetrica" />


            <v-select
              label="Sinais"
              v-model="exame.sinais"
              :items="['Cianose', 'Edema', 'Palidez', 'Tiragem', 'Batimento da Asa do Nariz', 'Aumento da FR', 'Gemido']"
              attach
              multiple
              chips
              deletable-chips
            />


            <v-text-field label="Demais Sinais" v-model="exame.demaisSinais" />


            

            <v-select
              label="Sintomas"
              v-model="exame.sintomas"
              :items="['Dispneia', 'Dor', 'Tontura']"
              attach
              multiple
              chips
              deletable-chips
            />


            <v-text-field label="Demais Sintomas" v-model="exame.demaisSintomas" />


            <v-select
              label="Uso de Musculatura Acessória"
              v-model="exame.usoDeMusculaturaAcessoria"
              :items="['Não', 'Sim']"
              outlined
            />

            <v-select
              label="Tosse"
              v-model="exame.tosse"
              :items="['Ausente', 'Presente', 'Produtiva', 'Improdutiva', 'Eficaz', 'Ineficaz']"
              outlined
            />

            <v-select
              label="Secreção"
              v-model="exame.secrecao"
              :items="['Mucóide', 'Mucopurulenta', 'Purulenta', 'Hemática', 'Outros']"
              outlined
            />

            <v-select
              label="Dispneia"
              v-model="exame.dispneia"
              :items="['Ausente', 'Presente']"
              outlined
            />



            <v-text-field label="Borg" v-model="exame.borg" />
            <v-text-field label="Classificação" v-model="exame.classificacao" />
            <v-text-field label="Escala Modificada do MRC (Pacientes Portadores de DPOC)" v-model="exame.escalaModificadaDoMRC_Pacientes_Portadores_DPOC" />

            <v-select
              label="Cianose"
              v-model="exame.cianose"
              :items="['Ausente', 'Presente']"
              outlined
            />


            <v-text-field label="Avaliação Postural" v-model="exame.avaliacaoPostural" />
            <v-text-field label="Palpação" v-model="exame.palpacao" />

            
           
            <v-btn color="primary" class="ml-0 mt-3" @click="novoExame">
              Adicionar Exame
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
              <v-text-field label="Sinais" readonly :value="dados.sinais" />
              <v-text-field label="Demais Sinais" readonly v-model="dados.demaisSinais" />
              <v-text-field label="Sintomas" readonly :value="dados.sintomas" />
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
        exame:{},
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
        if (Array.isArray(this.exame.pacientes)) {
            return this.exame.pacientes.map(id => ({ id }));
        } else {
            return null;
        }
    }

    },
    methods: {      
      novoExame() {
        this.$api.mutate({
          mutation: gql `
            mutation(

            $pacientes: [PacienteFiltro]  
            $nome:String
            $fc:String
            $fR: String
            $pA:String
            $spO2: Int
            $temperatura: Int
            $peso: Float
            $altura: Float
            $iMC: Float
            $auscultaPulmonar: String
            $consciencia: String
            $formatoTorax:String
            $outros: String
            $viaDeAcessoDoAr: String
            $usoDeOxigenoterapia: String
            $horario_usoDeOxigenoterapia: String
            $fiO2: String
            $padraoMuscularVentilatorio: String
            $ritmoVentilatorio: String
            $expansibilidadeToracica: String
            $expansibilidadeToracica_Assimetrica: String
            $sinais: [String]
            $demaisSinais: String
            $sintomas: [String]
            $demaisSintomas: String
            $usoDeMusculaturaAcessoria: String
            $tosse:String
            $secrecao: String
            $dispneia: String
            $borg: String
            $classificacao: String
            $escalaModificadaDoMRC_Pacientes_Portadores_DPOC:String
            $cianose: String
            $avaliacaoPostural: String
            $palpacao: String   
                         
             
              
            ){
              novoExame(
            dados: {
              
              
            pacientes: $pacientes
            nome:$nome
            fc:$fc
            fR:$fR 
            pA:$pA
            spO2:$spO2 
            temperatura:$temperatura 
            peso:$peso 
            altura:$altura 
            iMC:$iMC 
            auscultaPulmonar:$auscultaPulmonar 
            consciencia: $consciencia 
            formatoTorax:$formatoTorax
            outros:$outros 
            viaDeAcessoDoAr:$viaDeAcessoDoAr 
            usoDeOxigenoterapia:$usoDeOxigenoterapia 
            horario_usoDeOxigenoterapia:$horario_usoDeOxigenoterapia 
            fiO2:$fiO2 
            padraoMuscularVentilatorio :$padraoMuscularVentilatorio 
            ritmoVentilatorio:$ritmoVentilatorio 
            expansibilidadeToracica:$expansibilidadeToracica 
            expansibilidadeToracica_Assimetrica:$expansibilidadeToracica_Assimetrica 
            sinais:$sinais 
            demaisSinais:$demaisSinais 
            sintomas:$sintomas 
            demaisSintomas:$demaisSintomas 
            usoDeMusculaturaAcessoria:$usoDeMusculaturaAcessoria 
            tosse:$tosse
            secrecao :$secrecao 
            dispneia:$dispneia 
            borg:$borg 
            classificacao:$classificacao 
            escalaModificadaDoMRC_Pacientes_Portadores_DPOC: $escalaModificadaDoMRC_Pacientes_Portadores_DPOC
            cianose:$cianose 
            avaliacaoPostural:$avaliacaoPostural 
            palpacao:$palpacao    
                
             
            }
          ){
           
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
            sinais
            demaisSinais
            sintomas
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
          nome: this.exame.nome,
          pacientes: this.pacientesSelecionados,
          fc: this.exame.fc,
          fR: this.exame.fR,
          pA: this.exame.pA,
          spO2: parseInt(this.exame.spO2, 10),
          temperatura: parseInt(this.exame.temperatura, 10),
          peso: parseFloat(this.exame.peso, 10),
          altura:  parseFloat(this.exame.altura, 10),
          iMC: parseFloat(this.exame.iMC, 10),
          auscultaPulmonar: this.exame.auscultaPulmonar,
          consciencia: this.exame.consciencia,
          formatoTorax: this.exame.formatoTorax,
          outros: this.exame.outros,
          viaDeAcessoDoAr: this.exame.viaDeAcessoDoAr,
          usoDeOxigenoterapia: this.exame.usoDeOxigenoterapia,
          horario_usoDeOxigenoterapia: this.exame.horario_usoDeOxigenoterapia,
          fiO2: this.exame.fiO2,
          padraoMuscularVentilatorio: this.exame.padraoMuscularVentilatorio,
          ritmoVentilatorio: this.exame.ritmoVentilatorio,
          expansibilidadeToracica: this.exame.expansibilidadeToracica,
          expansibilidadeToracica_Assimetrica: this.exame.expansibilidadeToracica_Assimetrica,
          sinais: this.exame.sinais,
          demaisSinais: this.exame.demaisSinais,
          sintomas: this.exame.sintomas,
          demaisSintomas: this.exame.demaisSintomas,
          usoDeMusculaturaAcessoria: this.exame.usoDeMusculaturaAcessoria,
          tosse: this.exame.tosse,
          secrecao: this.exame.secrecao,
          dispneia: this.exame.dispneia,
          borg: this.exame.borg,
          classificacao: this.exame.classificacao,
          escalaModificadaDoMRC_Pacientes_Portadores_DPOC: this.exame.escalaModificadaDoMRC_Pacientes_Portadores_DPOC,
          cianose: this.exame.cianose,
          avaliacaoPostural: this.exame.avaliacaoPostural,
          palpacao: this.exame.palpacao
        }

        }).then(resultado =>{
          this.dados = resultado.data.novoExame;
          this.exame = {};
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
  