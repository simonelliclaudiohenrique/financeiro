<template>
  <v-container
   v-if="modal"
  >
  <v-row class="mb-1">
   <v-col cols="12">
     <v-toolbar dense dark color="primary">
        Formulario
    </v-toolbar>
   </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <slot name="formulario"/>
    </v-col>
  </v-row>
    <v-row justify="space-around">
      <v-spacer></v-spacer>
    <v-btn
      v-if="salvar"
      color="success"
      @click="$emit('salvar')"
    >
      salvar
    </v-btn>
    <v-btn
      v-if="editar"
      color="primary"
    >
      editar
    </v-btn>
    <v-btn
      class="ml-2"
      color="error"
      @click="$emit('cancelar')"
    >
      cancelar
    </v-btn>
  </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'componentModal',
  props: {
    modal: {
      type: Boolean,
      default: false
    },
    salvar: {
      type: Boolean,
      default: false
    },
    editar: {
      type: Boolean,
      default: false
    }
  }
}
</script>
