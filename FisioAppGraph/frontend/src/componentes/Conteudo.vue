
<template>
	<v-layout column>
		<v-flex>
			<UsuarioLogado />
		</v-flex>
		<v-flex>
			<v-tabs centered  dark icons-and-text>
				<v-tabs-slider color="white"></v-tabs-slider>

				<v-tab>
					Autenticação
					<v-icon>fingerprint</v-icon>
				</v-tab>

				<v-tab>
					Fisioterapeutas
					<v-icon>people</v-icon>
				</v-tab>
				<v-tab>
					Perfis
					<v-icon>people</v-icon>
				</v-tab>				

				<v-tab>
					Pacientes
					<v-icon>people</v-icon>
				</v-tab>
				
				<v-tab>
					Evoluções
					<v-icon>arrow_upward</v-icon>
				</v-tab>

				<v-tab>
					Exames
					<v-icon>description</v-icon>
				</v-tab>

				<v-tab-item>
					<AutenticacaoAbas />
				</v-tab-item>

				<v-tab-item>
					<UsuarioAbas />
				</v-tab-item>

				<v-tab-item>
					<PerfilAbas />
				</v-tab-item>

				<v-tab-item>
					<PacienteAbas />					
				</v-tab-item>

				<v-tab-item>
					<EvolucaoAbas />					
				</v-tab-item>

				<v-tab-item>
					<ExameAbas />					
				</v-tab-item>


			</v-tabs>
		</v-flex>
	</v-layout>
</template>

<script>
import AutenticacaoAbas from './autenticacao/Abas'
import UsuarioLogado from './autenticacao/UsuarioLogado'
import UsuarioAbas from './usuario/Abas'
import PerfilAbas from './perfil/Abas'
import PacienteAbas from './paciente/Abas'
import EvolucaoAbas from './evolucao/Abas'
import ExameAbas from './exame/Abas'


export default {
	components: {
		AutenticacaoAbas,
		UsuarioLogado,
		UsuarioAbas,
		PerfilAbas,
		PacienteAbas,
		EvolucaoAbas,
		ExameAbas
	},
}
</script>

<style>

</style>
