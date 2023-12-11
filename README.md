# Fisio App

## Descrição
O Fisio App é um projeto desenvolvido para fisioterapeutas facilitarem o gerenciamento de atendimentos aos seus pacientes. O sistema permite o cadastro de usuários, pacientes, preenchimento de fichas de anamnese e registro de evoluções.

## Tecnologias Utilizadas
- **Frontend:** Vue.js
- **Backend:** GraphQL
- **Banco de Dados:** MySQL

## Instalação

### Pré-requisitos
Certifique-se de ter o Node.js e o npm instalados em sua máquina.

### Backend
1. Navegue até o diretório `backend/`.
2. Execute `npm install` para instalar as dependências.
3. Configure as informações do banco de dados no arquivo `.env`.
4. Execute `npm start` para iniciar o servidor GraphQL.

### Frontend
1. Navegue até o diretório `frontend/`.
2. Execute `npm install` para instalar as dependências.
3. Execute `npm run serve` para iniciar o servidor de desenvolvimento Vue.js.

## Funcionalidades

### Cadastro de Usuários
- Registre fisioterapeutas e equipe administrativa.

### Cadastro de Pacientes
- Adicione informações detalhadas sobre os pacientes.

### Ficha de Anamnese
- Preencha fichas de anamnese para registrar histórico médico e informações relevantes.

### Registro de Evoluções
- Acompanhe o progresso dos pacientes por meio de registros de evoluções.

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).
# Diagrama de classe 
```mermaid
classDiagram
  class Usuario {
    - userId: int
    - username: String
    - password: String
    
  }

  class Fisioterapeuta {
    -id: int    
    -crm: String
    -especialidade:String 
    -List<Pacientes>
    -identificacao: Identificacao
    + realizaEvolucoes(evolucao: Evolucao): void
    + preencheFichaDeAnamnese(fichaAnamnese:FichaAnamnese):void
    + addPaciente(paciente: Paciente): void
    + removePaciente(paciente: Paciente): void
    + getPacientes(): List<Paciente>  
     
  }

  class Paciente {
    - pacienteId: int
    - indetificacao: Identificacao
    - evolucao: List<Evolucao>
    - fichasAnamnese: List<FichaAnamnese>
    + getFichasAnamnese(): List<FichaAnamnese>
  }

  class FichaAnamnese {
    - fichaId: int
    - identificacao: Identificacao
    - exameFisico: ExameFisico
    - historiaClinica: HistoriaClinica
    + getIdentificacao(): Identificacao
    + getExameFisico():ExameFisico
    + getHistoriaClinica():HistoriaClinica
  }
  class HistoriaClinica{
    -historiaClinicaId: int
    -habitosDeVida: HabitosDeVida
    -medicamentos: String
    -antecedentesPessoais:AntecedentesPessoais
    -queixaPrincipal:String
    -historiaDaDoenca:String
    -historiaFamiliar:String 
    -historiaPsicosocial:String
    -cirurgias: String
    -Internações:String
    -antecedentesMaternos: String
    -habitosAlimentares:String
    -sono:String
    
}

  class HabitosDeVida {
    -habitosDeVidaID: int
    -alergia:String
    -alimentacao: String
    -exerciciosFisicos: String
    -exerciciosFisicos_QntVezesNaSemana: int
    -ingestaoDeAguaPorDia_QuantosLitros: String
    -fumante: String
    -ingestaoDeBebidaAlcoolica: String
}
 
  class AntecedentesPessoais{
    - antecedentesPessoaisId: int
    - alergia:String
    - doençaCardiorrespiratoria: Boolean
    - constipacaoIntestinal: Boolean
    - doençaRenal: Boolean
    - hemorroidas: Boolean
    - neoplasias: Boolean
    - infeccaoUrinária: Boolean
    - diabetes: Boolean
    - obesidade: Boolean
    - tabagismo/etilismo: Boolean
    - outros:String
}

class ExameCardiorespiratorio{
  - exameCardiorespiratorioId: int
  - fc:String
  - fR: String
  - pA:String
  - spO2: int
  - temperatura: int 
  - peso: double
  - altura: double
  - iMC: double
  - auscultaPulmonar: String
  - consciência: String
  - formato Tórax:String
  - outros: String
  - viaDeAcessoDoAr:  String
  - usoDeOxigenoterapia: String
  - horario_usoDeOxigenoterapia: String
  - fiO2: String
  - padraoMuscularVentilatório: String
  - ritmoVentilatório: String
  - expansibilidadeTorácica: String
  - expansibilidadeTorácica_Assimetrica: String
  - sinais: Sinais
  - demaisSinais: String
  - sintomas: Sintomas
  - demaisSintomas: String
  - usoDeMusculaturaAcessória: String
  - tosse:String
  - secreção: String
  - dispneia: String
  - borg: String
  - classificação: String
  - escalaModificadaDoMRC_Pacientes_Portadores_DPOC:String
  - cianose: String
  - avaliaçãoPostural: String
  - palpação: String  
}

  

  class Evolucao{
    evolucaoId: int
    data:Date
    descriçãoDoEstadoGeral:String
    condutaAplicada:String
    eventuaisIntercorrências: String
    assinatura: String
}

  class Indentificacao {
       -identificacaoId: int
       -endereco: Endereco
       -nome: String
       -dataDaAvaliação: Date
       -sexo: String
       -estado civil: String
       -idade: int
       -raça: String
       -dataDoNascimento: String
       -profissão: String 
       -ocupação: String
       -contato: Contato
       -diagnósticoClínico: String
       -cLassificacaoDasDoencas: String
       

   }
  class Bebê {
    - bebeId: int
    - pesoAoNascer: String
    - tipoDeParto: String
    - idadeGestacional: int
    - intercorrenciasIntraparto: String
    - intercorrenciasPosParto: String 
    - escalaAPGAR_1Min: String 
    - escalaAPGAR_5Min: String
    - desenvolvimento: String
    - alergias: boolean
    - descricaoAlergias: String
    - imunizacoes: String
}

class Contato {
    -contatoId: int
    -Telefone: String 
    -Email: String
}

  class Endereco {
    - enderecoId: int
    - rua: String
    - cep: String
    - numero: String
    - bairro: String
  }



  Usuario <|-- Fisioterapeuta   : É um
  Fisioterapeuta --o Endereco : Possui
  Fisioterapeuta -- Paciente : Atende
  Fisioterapeuta -- Evolucao: Realiza
  Fisioterapeuta -- FichaAnamnese: Preenche
  Fisioterapeuta -- Indentificacao: Preenche
  Bebê --|> Paciente: É
  Paciente --o Evolucao: Possui
  Paciente --o FichaAnamnese : Possui
  Paciente --o Indentificacao: Possui
  Indentificacao --o Endereco : Contém
  Indentificacao --o Contato : Contém
  FichaAnamnese --o Indentificacao : Contém
  FichaAnamnese --o ExameCardiorespiratorio : Contém
  FichaAnamnese --o HistoriaClinica : Contém
  HistoriaClinica --o AntecedentesPessoais: Contém
  HistoriaClinica --o HabitosDeVida: Contém
 
  

```
