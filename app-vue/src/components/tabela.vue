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
            height="60"
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
        small
        class="mr-2"
        @click="exibir(item)"
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
tbody tr:nth-of-type(even) {
    background-color: #dfdcf7;
}

tbody tr:hover{
    background-color: #bab8c6 !important;
  }

</style>
