<template>
    <div v-if="itens && itens.length">
      <v-alert v-for="(item, index) in itens" :key="index" :value="true" type="error">
        {{ item.message }}
        <template v-if="item.extensions">
          <pre>{{ JSON.stringify(item.extensions, null, 2) }}</pre>
        </template>
      </v-alert>
    </div>
  </template>
  
  <script>
  export default {
    props: ['erros'],
    computed: {
      itens() {
        if (!this.erros) return null;
  
        const e = this.erros;
        const itens = [];
  
        if (e.graphQLErrors) {
          itens.push(...e.graphQLErrors);
        }
  
        if (e.networkError) {
          itens.push({
            message: 'Erro de rede',
            extensions: e.networkError,
          });
        }
  
        if (itens.length === 0) {
          itens.push({
            message: 'Erro! Você deixou algum campo sem preencher?',
          });
        }
  
        return itens;
      },
    },
  };
  </script>
  
  <style>
  </style>
  