const state = {
  data: {}
}

const getters = {
  data: state => state.data,
  array: state => Object.keys(state.data || {}).map(userId => state.data[userId])
}

// TODO: Add check exists data for userInvites
const actions = {
  fetchUserInvites ({dispatch}) {
    dispatch('api/fetchModel', {link: '/user_invites'}, {root: true})
  },
  deleteUserInvite ({dispatch}, user) {
    dispatch('api/deleteModelItem', {link: '/user_invites', item: user}, {root: true})
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
