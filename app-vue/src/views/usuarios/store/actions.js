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

export const excluir = async ({ commit }, id) => {
  try {
    const res = await axios.delete(`/usuarios/${id}`)

    return res.data
  } catch (error) {
    return null
  }
}

export const salvar = async ({ commit }, dados) => {
  try {
    const res = await axios.post('/usuarios', dados)

    return res.data
  } catch (error) {
    return null
  }
}

export const editar = async ({ commit }, dados) => {
  try {
    const res = await axios.put(`/usuarios/${dados.id}`, dados)

    return res.data
  } catch (error) {
    return null
  }
}
