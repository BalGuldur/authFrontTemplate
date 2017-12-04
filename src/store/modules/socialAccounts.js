const state = {
  data: {}
}

const getters = {
  data: state => state.data,
  array: state => Object.keys(state.data || {}).map(userId => state.data[userId]),
  byPlatformType: (state, getters) => {
    return getters.array.reduce((prev, socAccount) => {
      return {...prev, [socAccount.platform]: socAccount}
    }, {})
  }
}

const actions = {
  fetchSocialAccounts ({dispatch}) {
    dispatch('api/fetchModel', {link: '/social_accounts'}, {root: true})
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
