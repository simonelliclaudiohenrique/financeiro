/* eslint-disable */
import { ValidationObserver, ValidationProvider, extend, setInteractionMode } from 'vee-validate'
import { length, max, max_value, numeric, required } from 'vee-validate/dist/rules'
import Vue from 'vue'

extend('length', {
  ...length,
  message: 'O campo {_field_} deve ter {length} caracteres'
})
extend('numeric', {
  ...numeric,
  message: 'O campo {_field_} requer somente números'
})
extend('required', {
  ...required,
  message: 'O campo {_field_} é obrigatório'
})

extend('max', {
  ...max,
  message: 'Valor máximo para {_field_} é: {max}'
})

extend('max_value', {
  ...max_value,
  message: 'Valor máximo para {_field_} é: {max}'
})

setInteractionMode('passive')

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
