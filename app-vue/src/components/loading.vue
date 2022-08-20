<template>
 <v-container>
   <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
 </v-container>
</template>

<script>
export default {
  name: 'componentLoading',
  props: {
    loading: {
      required: true,
      type: Boolean
    }
  }
}
</script>
