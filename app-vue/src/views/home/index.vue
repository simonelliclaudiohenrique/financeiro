<template>
  <v-container
    fluid
  >
    <v-row class="d-flex justify-center align-center">
      <v-col
        cols="6"
        ms="12"
      >
            <v-card-title class="d-flex justify-center align-center ma-2">
                  <v-img max-width="200"
                    src="@/assets/sifrao-logo.png"
                  />
            </v-card-title>
            <v-card-title class="d-flex justify-center align-center ma-2">
              <h1>Finananças Pessoais</h1>
            </v-card-title>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'paginaHome',
  data: () => ({
    links: [
      {
        path: '/usuarios',
        icone: 'mdi-account-multiple',
        nome: 'Usuarios'
      },
      {
        path: '/despesas',
        icone: 'mdi-cash-minus',
        nome: 'Despesas'
      },
      {
        path: '/receitas',
        icone: 'mdi-cash-plus',
        nome: 'Receitas'
      }
    ]
  })

}
</script>
<style scoped>

</style>
