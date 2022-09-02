<template>
  <v-container>
    <loading
      :loading="loading"
    />
    <modal
      :modal="modal"
      :salvar="!!(!controle.exibir && !controle.editar)"
      :editar="!!(controle.exibir && !controle.inserir)"
      @cancelar="resetFormulario()"
      @editar="controle.exibir = false"
    >
       <template v-slot:formulario>
        <v-form>
        <v-row class="mx-2">
          <v-col
            cols="12"
            lg="4"
            xl="4"
            md="6"
            xs="12"
          >
            <v-text-field
              v-model="formulario.nome"
              :disabled="controle.exibir"
              outlined
              hide-details
              dense
              label="nome"
            />
          </v-col>
          <v-col
            cols="12"
            lg="4"
            xl="4"
            md="6"
            xs="12"
          >
            <v-text-field
              v-model="formulario.email"
              :disabled="controle.exibir"
              outlined
              hide-details
              dense
              label="e-mail"
            />
          </v-col>
          <v-col
            cols="12"
            lg="4"
            xl="4"
            md="6"
            xs="12"
          >
            <v-text-field
              v-model="formulario.senha"
              :disabled="controle.exibir"
              outlined
              hide-details
              dense
              label="senha"
            />
          </v-col>
        </v-row>
      </v-form>
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
export default {
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
        width: 200
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
    }
  }),

  computed: {
    ...mapState('paginaCadastroUsuario', ['registros'])
  },

  async created () {
    await this.listarRegistros()
  },

  methods: {
    ...mapActions('paginaCadastroUsuario', ['listar', 'exibir']),

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
      }
      window.console.log(res)
      this.modal = true
      this.controle.exibir = true
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
