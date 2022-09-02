import axios from '@/plugins/axios'

export const listar = async ({ commit }, filtros) => {
  try {
    const res = await axios.get('/usuarios', {
      params: filtros
    })

    if (res && !res.data.erro) { commit('registros', res.data) }

    return res.data
  } catch (error) {
    return null
  }
}

export const exibir = async ({ commit }, id) => {
  try {
    const res = await axios.get(`/usuarios/${id}`)

    return res.data
  } catch (error) {
    return null
  }
}
