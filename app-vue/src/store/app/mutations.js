export default {
  nome (state, param) {
    state.nome = param
  },
  login (state, param) {
    state.login = param
  },
  reset: () => {},
  titulo (state, titulo) {
    state.titulo = titulo || ''
  }
}
