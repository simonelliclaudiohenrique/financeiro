<template>
  <v-container fluid v-if="modal">
    <v-row>
      <v-col cols="12">
        <v-card elevation-3>
          <v-row dense>
            <v-toolbar dense dark color="primary">
              Formulario
              <v-spacer></v-spacer>
              <slot name="maisOpcoes" />
            </v-toolbar>
          </v-row>
          <v-row>
            <v-col cols="12">
              <slot name="formulario" />
            </v-col>
          </v-row>
          <v-row justify="space-around">
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn
                width="150"
                dense
                v-if="salvar"
                color="success"
                @click="$emit('salvar')"
              >
                salvar
              </v-btn>
              <v-btn
                width="150"
                v-if="editar"
                color="success"
                @click="$emit('editar')"
              >
                editar
              </v-btn>
              <v-btn
                width="150"
                dense
                class="mx-2"
                color="error"
                @click="$emit('cancelar')"
              >
                cancelar
              </v-btn>
            </v-card-actions>
          </v-row>
        </v-card>
      </v-col>
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
