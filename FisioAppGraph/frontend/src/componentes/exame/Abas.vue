<template>
    <v-container fluid>
        <v-tabs color="grey lighten-3"
            slider-color="blue">
            <v-tab ripple>
                Listar
            </v-tab>

            <v-tab ripple>
                Consultar
            </v-tab>

            <v-tab ripple>
                Adicionar
            </v-tab>

            <v-tab ripple>
                Alterar
            </v-tab>
            
          

            <v-tab-item>
                <Lista />
            </v-tab-item>

            <v-tab-item>
                <Consulta />
            </v-tab-item>

            <v-tab-item>
                <Novo />
            </v-tab-item>
            
            <v-tab-item>
                <Alterar />
            </v-tab-item>
            
            
        </v-tabs>
    </v-container>
</template>

<script>
import Lista from './Lista'
import Consulta from './Consulta'
import Novo from './Novo'
import Alterar from './Alterar'


export default {
    components: { Lista, Consulta, Novo, Alterar}
}
</script>

<style>

</style>
