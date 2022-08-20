<template>
  <v-app>
      <router-view/>
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
