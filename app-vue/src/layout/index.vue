<template>
   <div>
       <v-app-bar
        color="#222"
       >
        <div>
          <v-img
            :style="{cursor: 'pointer'}"
            src="@/assets/sifrao-logo.png"
            max-width="60"
            @click="$router.push('/')"
          />
        </div>
        <h1
          class="cursor:pointer"
          :style="{color: '#dec36a', cursor: 'pointer'}"
          @click="$router.push('/')"
        >
          Finances
        </h1>
        <v-spacer></v-spacer>
        <div>
          <v-menu
            rounded="b-xl"
            right
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-btn
                :style="{color: '#dec36a'}"
                class="ma-5 title"
                outlined
                text
                large
                v-on="on"
              >
                <v-icon
                  left
                  size="25"
                >
                  mdi-menu
                </v-icon>
                Menus
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, idx) in links"
                :key="idx"
                :to="item.path"
                link
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icone" />
                </v-list-item-icon>
                <v-list-item-title>
                  {{ item.nome }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="d-flex d-inline-flex">
          <v-menu
            bottom
            left
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-avatar
                :style="{cursor: 'pointer'}"
                color="#dec36a"
                class="black--text font-weight-black headline"
                size="45"
                v-on="on"
              >
                {{ nome.substring(0,2) }}
              </v-avatar>
            </template>
            <v-card>
              <v-card-title class="subtitle justify-center mb-3">
                {{ login }}
              </v-card-title>
              <v-card-subtitle>
                {{ nome }}
              </v-card-subtitle>
              <v-divider class="mb-1" />
              <v-card-actions>
                <v-btn
                  color="primary"
                  block
                  @click="deslogar()"
                >
                  <v-icon
                    left
                    size="28"
                  >
                    mdi-logout-variant
                  </v-icon>
                  SAIR
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </div>
      </v-app-bar>
       <v-container
        fluid
        class="ma-0 pa-0"
     >
       <v-main>
        <router-view/>
      </v-main>
     </v-container>

       <v-footer app
      id="footer"
      height="40"
      class="d-flex d-inline-flex align-center justify-center"
      color="#222"
       >
      <p>direitos reservados</p>
       </v-footer>
   </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'layaoutSistema',
  data: () => ({
    dataAtual: '',
    loading: false,
    login: localStorage.getItem('financeiro:email')
      ? window.atob(localStorage.getItem('financeiro:email'))
      : '',
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
    ],
    nome: localStorage.getItem('financeiro:nome')
      ? window.atob(localStorage.getItem('financeiro:nome'))
      : ''
  }),

  methods: {
    ...mapActions('app', [
      'logout'
    ]),
    async deslogar () {
      this.loading = true
      const res = await this.logout()
      if (!res.erro) this.$router.push('/login')
      this.loading = false
    }
  }
}
</script>
<style scoped>
#footer p {
  color: #dec36a;
}
</style>
