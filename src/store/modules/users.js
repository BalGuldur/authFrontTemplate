const state = {
  data: {}
}

const getters = {
  data: state => state.data
}

const actions = {
  fetchUsers ({dispatch}) {
    dispatch('api/fetchModel', {link: '/users.json'}, {root: true})
  }
}

const mutations = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
