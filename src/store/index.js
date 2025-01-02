import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    titulo: 'algum título do Vuex',
    cliente: {
      nome: 'nome fictício do cliente',
      idade: 'idade fictícia do cliente',
      altura: 'altura fictícia do cliente',
    },
    clientesFicitios: [
      { nome: 'José', idade: 199, altura: 1.66},
      { nome: 'Josefina', idade: 200, altura: 1.65},
      { nome: 'José Santos', idade: 201, altura: 1.64},
      { nome: 'José aldo', idade: 202, altura: 1.62},
    ]
  },
  getters: {
    totalClientesFicitios(state) {
      return state.clientesFicitios.length
    },
    totalClientesFicitiosMaisUm(state, getters) { //encadeamento de getters
      return getters.totalClientesFicitios + 1
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
