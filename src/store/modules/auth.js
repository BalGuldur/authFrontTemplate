import * as types from '@/store/mutation-types'
import Vue from 'vue'

// Аутентификация, авторизация пользователя
const state = {
  currentUser: {},
  userToken: undefined
}

const getters = {
  currentUser: state => state.currentUser,
  userToken: state => state.userToken && state.userToken || Vue.ls.get('userToken')
}

const actions = {
  testSetToken ({dispatch}) {
    dispatch('setToken', 'test')
  },
  signIn ({dispatch, commit}, {email, password}) {
    dispatch('testSetToken')
  },
  regCompany ({dispatch, commit}, {email, companyTitle, password}) {
    dispatch('testSetToken')
  },
  setToken ({commit}, token) {
    Vue.ls.set('userToken', token)
    commit('SET_JWT_TOKEN', token)
  },
  checkAuthorization ({dispatch, getters}) {
    return new Promise((resolve, reject) => {
      console.log('checkAuth')
      resolve(true)
      // reject(false)
    })
  }
}

const mutations = {
  [types.SET_JWT_TOKEN] (state, token) {
    state.userToken = token
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
