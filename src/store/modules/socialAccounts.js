const state = {
  data: {}
}

const getters = {
  data: state => state.data,
  array: state => Object.keys(state.data || {}).map(socialAccountId => state.data[socialAccountId]),
  byPlatformType: (state, getters) => {
    return getters.array.reduce((prev, socAccount) => {
      return {...prev, [socAccount.platform]: socAccount}
    }, {})
  }
}

const actions = {
  fetchSocialAccounts ({dispatch}) {
    dispatch('api/fetchModel', {link: '/social_accounts'}, {root: true})
  },
  deleteSocialAccount ({dispatch}, socialAccount) {
    dispatch('api/deleteModelItem', {link: '/social_accounts', item: socialAccount}, {root: true})
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
