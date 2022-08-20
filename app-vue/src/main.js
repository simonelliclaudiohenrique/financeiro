/* eslint-disable vue/multi-word-component-names */
import '@/plugins/axios'
import '@/plugins/validate'

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
Vue.component('notificacao', () => import('./components/notificacao'))
Vue.component('tabela', () => import('../src/components/tabela'))
Vue.component('loading', () => import('../src/components/loading'))
Vue.component('filtro', () => import('../src/components/filtro'))
Vue.component('modal', () => import('../src/components/modal'))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
