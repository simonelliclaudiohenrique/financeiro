<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
          <v-data-table
            :id="!$vuetify.theme.dark ? 'table' : ''"
            :headers="colunas"
            :items="registros"
            :item-key="itemKey"
            dense
            class="elevation-4"
          >
            <template v-slot:top>
              <v-toolbar class="white--text" color="primary" dense>
                <v-toolbar-title>
                  {{ titulo }}
                </v-toolbar-title>
                <v-spacer />
                <slot name="botoes" />
              </v-toolbar>
            </template>
            <template v-slot:[`item.acao`]="{ item }">
              <v-icon class="mr-2" @click="$emit('exibir', item[itemKey])">
                mdi-eye
              </v-icon>
            </template>
            <template v-slot:[`footer.page-text`]> </template>
          </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'componentTabela',
  props: {
    colunas: {
      required: true,
      type: Array
    },
    registros: {
      required: true,
      type: Array
    },
    titulo: {
      type: String,
      default: 'Registros'
    },
    itemKey: {
      type: String,
      default: 'id'
    }
  }
}
</script>

<style>
#table tbody tr:nth-of-type(even) {
  background-color: #E0E0E0;
}
tbody tr:hover {
  background-color: #a388ee !important;
}
</style>
