import * as types from '../mutation-types'
import router from '@/router'

// initial state
const state = {
  leftNavIsOpen: false,
  topNavTitle: '',
  navItems: [
    {icon: 'list', title: 'Тест', link: '/test'},
    {icon: 'list', title: 'Пользователи', link: '/users'}
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
  },
  goToProfile () {
    router.push('/profile')
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
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
