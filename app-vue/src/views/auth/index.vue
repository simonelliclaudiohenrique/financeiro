<template>
  <v-main id="login">
    <v-container class="fill-height d-flex justify-center align-center">
      <notificacao
        v-model="notificacao.value"
        :color="notificacao.color"
        :text="notificacao.text"
    />

    <loading
     :loading="loading"
    />
      <v-col cols="12" lg="6" xl="6" xs="12">
        <v-card
          id="card"
          width="400"
          height="380"
          color="#222"
        >
          <v-card-text class="text-center">
            <h1 :style="{ color: '#dec36a' }">Login</h1>
          </v-card-text>
          <v-card-text>
            <validation-observer ref="observer">
              <v-form>
                <validation-provider
                  v-slot="{ errors }"
                  name="Email"
                  rules="required"
                  vid="email"
                >
                  <v-text-field
                    class="mb-10 mt-10"
                    v-model="formulario.email"
                    :error-messages="errors"
                    :hide-details="!errors.length"
                    outlined
                    rounded
                    dark
                    background-color="#777"
                    dense
                    clearable
                    label="E-mail"
                  @keydown.enter="efetuarLogin()"
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Senha"
                  rules="required"
                  vid="senha"
                >
                <v-text-field
                  id="senha"
                  ref="senha"
                  v-model="formulario.senha"
                  :error-messages="errors"
                  :hide-details="!errors.length"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  outlined
                  rounded
                  dark
                  background-color="#777"
                  dense
                  clearable
                  label="senha"
                  @click:append="show = !show"
                  @keydown.enter="efetuarLogin()"
                />
                </validation-provider>
              </v-form>
            </validation-observer>
          </v-card-text>
          <v-card-actions class="d-flex align-center justify-center">
            <v-btn
              class="mt-10 mb-0"
              width="300"
              rounded
              color="success"
              @click="efetuarLogin()"
            >
              login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-container>
  </v-main>
</template>

<script>
import { mapActions } from 'vuex'
import loading from '../../components/loading.vue'
export default {
  components: { loading },
  name: 'loginApp',
  data: () => ({
    show: false,
    formulario: {
      email: '',
      senha: ''
    },
    notificacao: {
      value: false,
      text: '',
      color: 'primary'
    },
    loading: false
  }),
  created () {
    setTimeout(() => {
      this.formulario.email = localStorage.getItem('financeiro:email')
        ? window.atob(localStorage.getItem('financeiro:email'))
        : ''
    }, 100)
    if (this.$refs.senha) {
      setTimeout(() => { this.$refs.senha.focus() }, 600)
    }
  },
  methods: {
    ...mapActions('app', [
      'login'
    ]),
    async efetuarLogin () {
      if (await this.$refs.observer.validate()) {
        this.loading = true
        const res = await this.login({
          email: this.formulario.email || undefined,
          senha: this.formulario.senha
        })

        if (res && !res.erro) {
          if (this.$router.currentRoute.path !== '/') this.$router.push('/')
        } else {
          this.$refs.observer.setErrors(res.erro)
          this.notificacao = {
            value: true,
            text: res.erro,
            color: 'error'
          }
        }
        this.loading = false
      }
    }
  }
}
</script>

<style>
#login {
  background: black;
  background-image: url("../../assets/sifrao-fundo.jpg");
  background-size: cover;
}
#card {
  opacity: 1;
  border-radius: 10px;
}
</style>
