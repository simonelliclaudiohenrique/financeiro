<template>
  <v-container>
    <v-card>
      <v-data-table
        :id="!$vuetify.theme.dark ? 'table' : ''"
        :headers="colunas"
        :items="registros"
        :items-per-page="5"
        :item-key="itemKey"

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
    <!-- <v-style v-if="!$vuetify.theme.dark">
      tbody tr:nth-of-type(even) {background-color: red; importante!}
    </v-style>
    <v-style v-if="lineHouver">
    </v-style> -->
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
  background-color: #f5f5;
}
tbody tr:hover{
    background-color: #a388ee !important;
  }

</style>
