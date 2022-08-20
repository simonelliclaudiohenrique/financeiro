import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../layout'),
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'paginaHome',
        component: () => import('@/views/home')
      },
      {
        path: '/despesas',
        name: 'Pagina Despesas',
        component: () => import('@/views/despesas')
      },
      {
        path: '/usuarios',
        name: 'Pagina Usuarios',
        component: () => import('@/views/usuarios')
      }
    ],
    beforeEnter: (to, from, next) => localStorage.getItem('financeiro:token') ? next() : next('/login')
  },
  {
    path: '/login',
    component: () => import('@/views/auth/'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/views/auth/')
      }
    ],
    beforeEnter: (to, from, next) => localStorage.getItem('financeiro:token') ? next('/') : next()
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
