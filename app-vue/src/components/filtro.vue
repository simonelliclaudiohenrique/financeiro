<template>
  <v-container>
    <v-card
      class="elevation-4"
    >
      <v-toolbar dense color="primary"
        class="white--text"
      >
        <v-toolbar-title>{{ titulo }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('pesquisar')">
          <v-icon color="white" >mdi-filter</v-icon>
        </v-btn>
      </v-toolbar>
      <v-row class="ma-2">
       <slot name="filtro"/>
      </v-row>
      <v-card-actions class="d-flex align-center justify-end">
        <v-btn
          color="primary"
          outlined
          @click="$emit('adicionar')"
        >
          <v-icon>mdi-plus</v-icon>
          Adiconar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'componentFiltro',
  props: {
    titulo: {
      type: String,
      default: 'Filtro'
    }
  }
}
</script>
