import axios from '@/plugins/axios'

export const listar = async ({ commit }, filtros) => {
  try {
    const res = await axios.get('/usuarios', filtros)

    if (res && !res.data.erro) commit('registros', res.data)

    return res.data
  } catch (error) {
    return error
  }
}
