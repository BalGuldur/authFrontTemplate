import * as types from '../mutation-types'

// initial state
const state = {
  leftNavIsOpen: true,
  topNavTitle: '',
  navItems: [
    {icon: 'list', title: 'Тест', link: '/test'}
  ]
}

// getters
const getters = {
  leftNavIsOpen: state => state.leftNavIsOpen,
  navItems: state => state.navItems,
  topNavTitle: state => state.topNavTitle
}

// actions
const actions = {
  changeNavIsOpen ({commit}) {
    commit(types.CHANGE_NAV_IS_OPEN)
  }
}

// mutations
const mutations = {
  [types.CHANGE_NAV_IS_OPEN] (state) {
    state.leftNavIsOpen = !state.leftNavIsOpen
  }
}

// general
export default {
  state,
  getters,
  actions,
  mutations
}
