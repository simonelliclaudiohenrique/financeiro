<template>
  <v-app>
    <v-main fluid>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',

  data: () => ({
    //
  }),
  computed: {
    ...mapState('app', [
      'titulo'
    ])
  },
  metaInfo () {
    return {
      title: this.titulo,
      titleTemplate: '%s'
    }
  }
}
</script>
