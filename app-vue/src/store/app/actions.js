import axios from '@/plugins/axios'

export const login = async ({ commit }, dados) => {
  try {
    const res = await axios.post('/login', {
      ...dados
    })

    if (res && !res.data.erro) {
      localStorage.setItem('financeiro:token', res.data.token)
      localStorage.setItem('financeiro:nome', window.btoa(res.data.payload.nome))
      localStorage.setItem('financeiro:email', window.btoa(res.data.payload.email))

      window.console.log(res.data)
      commit('app/login', res.data.payload.email, { root: true })
      commit('app/nome', res.data.payload.name, { root: true })

      axios.defaults.headers.Authorization = 'Bearer ' + res.data.token
    }

    return res.data
  } catch (error) {
    return null
  }
}

export const logout = async ({ commit }) => {
  try {
    localStorage.removeItem('financeiro:token')
    localStorage.removeItem('financeiro:nome')
    delete axios.defaults.headers.Authorization

    return ''
  } catch (error) {
    return null
  }
}
