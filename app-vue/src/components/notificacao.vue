<template>
  <v-snackbar
    :color="color"
    :value="value"
    :timeout="-1"
    absolute
    top
  >
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn
        text
        v-bind="attrs"
        @click="$emit('input', false)"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnackBarComponent',
  props: {
    value: {
      default: false,
      required: true
    },
    color: {
      default: 'primary'
    },
    text: {
      default: '',
      required: true
    }
  }
}
</script>
