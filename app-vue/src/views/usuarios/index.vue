<template>
  <v-container>
    <loading
      :loading="loading"
    />
    <modal
      :modal="modal"
      :salvar="!!(!controle.exibir && !controle.editar)"
      :editar="!!(controle.exibir && !controle.salvar)"
      @cancelar="resetFormulario()"
    >
       <template slot="formulario">
        <v-form>
        <v-row>
          <v-col
            cols="12"
            lg="4"
            xl="4"
            md="6"
            xs="12"
          >
            <v-text-field
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
              outlined
              hide-details
              dense
              label="nome"
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
      >
        <template slot="filtro">
          <v-col
            cols="12"
            sm="6"
            md="6"
          >
            <v-text-field
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
    }
  }),

  computed: {
    ...mapState('paginaCadastroUsuario', ['registros'])
  },

  async created () {
    this.listarRegistros()
  },

  methods: {
    ...mapActions('paginaCadastroUsuario', ['listar']),

    async listarRegistros () {
      this.loading = true
      await this.listar()
      this.loading = false
    },

    resetFormulario () {
      this.modal = false
    }
  }
}
</script>
