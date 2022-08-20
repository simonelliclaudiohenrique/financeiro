<template>
  <v-container>
   <v-row>
     <v-card
      v-for="(item, i) in links"
      :key="i"
      class="ma-3 elevation-5 d-flex d-inline-flex justify-center align-center"
      width="300"
      :to="item.path"
      color="grey"
    >
          <v-card-text>
            <v-btn
              text
            >
            <v-icon
              large
              color="white"
            >
              {{ item.icone }}
            </v-icon>
          </v-btn>
          </v-card-text>
              <v-card-text><h1>{{ item.nome }}</h1></v-card-text>
    </v-card>
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
