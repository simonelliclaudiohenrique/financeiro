<template>
  <v-container>
    <loading
      :loading="loading"
    />
    <notificacao
       v-model="notificacao.value"
        :color="notificacao.color"
        :text="notificacao.text"
    />
    <modal
      :modal="modal"
      :salvar="!!(!controle.exibir && !controle.editar)"
      :editar="!!(controle.exibir && !controle.inserir)"
      @cancelar="resetFormulario()"
      @editar="controle.exibir = false"
      @salvar="salvarRegistro()"
    >
        <template v-if="controle.exibir" v-slot:maisOpcoes>
          <v-btn
            light
            small
            class="red--text"
            @click="excluirRegistro()"
          >
            <v-icon color="error">
              mdi-trash-can
            </v-icon>
            excluir
          </v-btn>
        </template>
       <template v-slot:formulario>
        <validation-observer ref="observer">
            <v-form>
            <v-row class="mx-2">
              <v-col
                cols="12"
                lg="4"
                xl="4"
                md="6"
                xs="12"
              >
              <validation-provider
                v-slot="{ errors }"
                name="Nome"
                rules="required"
                vid="nome"
              >
                <v-text-field
                  v-model="formulario.nome"
                  :error-messages="errors"
                  :hide-details="!errors.length"
                  :disabled="controle.exibir"
                  outlined
                  dense
                  label="nome"
                />
              </validation-provider>
              </v-col>
              <v-col
                cols="12"
                lg="4"
                xl="4"
                md="6"
                xs="12"
              >
              <validation-provider
                v-slot="{ errors }"
                name="E-mail"
                rules="required"
                vid="email"
              >
                <v-text-field
                  v-model="formulario.email"
                  :error-messages="errors"
                  :hide-details="!errors.length"
                  :disabled="controle.exibir"
                  outlined
                  dense
                  label="E-mail"
                />
              </validation-provider>
              </v-col>
              <v-col
                cols="12"
                lg="4"
                xl="4"
                md="6"
                xs="12"
              >
              <validation-provider
                v-slot="{ errors }"
                name="Senha"
                rules="required"
                vid="senha"
              >
                <v-text-field
                  v-model="formulario.senha"
                  :error-messages="errors"
                  :hide-details="!errors.length"
                  :disabled="controle.exibir"
                  outlined
                  dense
                  label="senha"
                />
              </validation-provider>
              </v-col>
            </v-row>
          </v-form>
        </validation-observer>
       </template>
    </modal>

    <div v-if="!modal">
      <filtro
        @pesquisar="listarRegistros()"
        @adicionar="modal = true"
        @limparFiltro="limparFiltros()"
      >
        <template v-slot:filtro>
          <v-col
            cols="12"
            sm="6"
            md="6"
          >
            <v-text-field
              v-model="filtro.nome"
              color="primary"
              outlined
              hide-details
              label="Nome"
              dense
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
          >
            <v-text-field
              v-model="filtro.email"
              color="primary"
              outlined
              hide-details
              label="E-mail"
              dense
            ></v-text-field>
          </v-col>
        </template>
      </filtro>
      <tabela
        :colunas="colunas"
        :registros="registros"
        @exibir="exibirRegistro($event)"
      />
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import notificacao from '../../components/notificacao.vue'
export default {
  components: { notificacao },
  name: 'paginaUsuarios',
  data: () => ({
    colunas: [
      {
        text: 'Ação',
        align: 'center',
        sortable: false,
        value: 'acao',
        width: 60
      },
      {
        text: 'Nome',
        align: 'start',
        sortable: false,
        value: 'nome',
        width: 300
      },
      {
        text: 'E-mail',
        align: 'start',
        sortable: false,
        value: 'email'
      },
      {}
    ],
    loading: false,
    modal: false,
    controle: {
      inserir: false,
      exibir: false,
      editar: false
    },
    filtro: {
      nome: null,
      email: null
    },
    formulario: {
      id: null,
      nome: null,
      email: null
    },
    notificacao: {
      value: null,
      text: '',
      color: ''
    }
  }),

  computed: {
    ...mapState('paginaCadastroUsuario', ['registros'])
  },

  async created () {
    await this.listarRegistros()
  },

  methods: {
    ...mapActions('paginaCadastroUsuario', [
      'listar',
      'exibir',
      'salvar',
      'excluir',
      'editar'
    ]),

    async listarRegistros () {
      this.loading = true
      await this.listar({
        nome: this.filtro.nome || null,
        email: this.filtro.email || null
      })
      this.loading = false
    },

    async exibirRegistro (id) {
      this.loading = true
      const res = await this.exibir(id)
      if (res && !res.erro) {
        this.formulario = {
          id: res.id || null,
          nome: res.nome || null,
          email: res.email || null,
          senha: res.senha || null
        }
      } else if (typeof res.erro === 'object') {
        this.notificacao = {
          value: true,
          text: res.erro,
          color: 'error'
        }
      }
      this.modal = true
      this.controle.exibir = true
      this.loading = false
    },
    async salvarRegistro () {
      if (await this.$refs.observer.validate()) {
        this.loading = true
        const form = {
          id: this.formulario.id || undefined,
          nome: this.formulario.nome || undefined,
          email: this.formulario.email || undefined,
          senha: this.formulario.senha || undefined
        }
        let res
        if (form.id) res = await this.editar(form)
        else if (!form.id) res = await this.salvar(form)
        if (res) {
          if (res && !res.erro) {
            this.notificacao = {
              value: true,
              text: res.message,
              color: 'success'
            }
            this.resetFormulario()
          } else {
            this.$refs.observer.setErrors(res.erro)
            this.notificacao = {
              value: true,
              text: res.erro,
              color: 'error'
            }
          }
        }
        this.loading = false
      }
    },

    async excluirRegistro () {
      this.loading = true
      const res = await this.excluir(this.formulario.id)
      if (res && !res.erro) {
        this.notificacao = {
          value: true,
          text: res,
          color: 'success'
        }
        this.resetFormulario()
      } else {
        this.notificacao = {
          value: true,
          text: res.erro,
          color: 'error'
        }
      }
      this.loading = false
    },

    resetFormulario () {
      this.controle = {
        exibir: false,
        inserir: false,
        editar: false
      }
      this.formulario = {
        id: null,
        nome: null,
        email: null
      }
      this.listarRegistros()
      this.modal = false
    },
    limparFiltros () {
      this.filtro = {
        nome: null,
        email: null
      }
      this.listarRegistros()
    }
  }
}
</script>
