<template>
  <v-container>
    <v-card>
      <v-data-table
        :headers="colunas"
        :items="registros"
        :items-per-page="5"
        class="elevation-4"
      >
        <template v-slot:top>
          <v-toolbar
            class="white--text"
            color="primary"
            dense
          >
            <v-toolbar-title>
              {{ titulo }}
            </v-toolbar-title>
            <v-spacer />
            <slot name="botoes"/>
          </v-toolbar>
        </template>
        <template v-slot:[`item.acao`]="{ item }">
      <v-icon
        class="mr-2"
        @click="$emit('exibir', item[itemKey])"
      >
        mdi-eye
      </v-icon>
    </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'componentTabela',
  props:
    {
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
      }
    }

}
</script>

<style>
tbody tr:hover{
    background-color: #a388ee !important;
  }

</style>
