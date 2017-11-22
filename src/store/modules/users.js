const state = {
  data: {}
}

const getters = {
  data: state => state.data,
  array: state => Object.keys(state.data || {}).map(userId => state.data[userId])
}

const actions = {
  fetchUsers ({dispatch}) {
    dispatch('api/fetchModel', {link: '/users'}, {root: true})
  },
  deleteUser ({dispatch}, user) {
    dispatch('api/deleteModelItem', {link: '/users', item: user}, {root: true})
  },
  inviteUser ({dispatch}, user) {
    return dispatch('api/request', {method: 'post', link: '/users/invite.json', data: {user}}, {root: true})
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
