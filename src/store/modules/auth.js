import * as types from '@/store/mutation-types'
import Vue from 'vue'
import router from '@/router'
import { needAuthStr } from '@/initializers/AuthErrors'

// Get and set userToken to LocalStorage
const getTokenFromLs = () => {
  return Vue.ls.get('userToken')
}
const setTokenToLs = (token) => {
  Vue.ls.set('userToken', token)
}
// Authenticate and authorizate users
const state = {
  currentUser: {},
  userToken: undefined,
  errors: []
}

const getters = {
  currentUser: state => state.currentUser,
  userToken: state => state.userToken,
  errors: state => state.errors
}

const actions = {
  setToken ({dispatch, commit}, token) {
    setTokenToLs(token)
    dispatch('api/setAuthHeaders', token, {root: true}) // config headers for ajax requests
    commit('SET_USER_TOKEN', token)
  },
  signIn ({dispatch, commit}, {user}) {
    commit('ERASE_AUTH_ERRORS')
    dispatch('api/post', {link: '/users/sign_in.json', params: {user}, addErrorType: 'auth/ADD_AUTH_ERRORS'}, {root: true}).then(
      response => {
        // Success sign in, set token and redirect to /
        const respToken = response.headers.authorization
        dispatch('setToken', respToken)
        router.push('/')
      }
    )
  },
  signOut ({dispatch, commit}) {
    commit('ERASE_AUTH_ERRORS')
    dispatch('setToken', undefined)
    router.push('/login')
  },
  checkAuthorization ({dispatch, getters, commit}) {
    const token = getters.userToken || getTokenFromLs()
    // Don't send request to api if token undefined (anyway it's don't auth)
    if (token) {
      dispatch('api/setAuthHeaders', token, {root: true}) // config headers for ajax requests
      return dispatch('api/post', {link: '/check.json', addErrorType: 'auth/ADD_AUTH_ERRORS'}, {root: true}).then(
        response => {
          dispatch('setToken', token)
          return Promise.resolve()
        },
        () => {
          commit('ADD_AUTH_ERRORS', {error: needAuthStr})
          return Promise.reject()
        }
      )
    } else {
      commit('ADD_AUTH_ERRORS', {error: needAuthStr})
      return Promise.reject()
    }
  },
  regCompany ({dispatch, commit}, {email, companyTitle, password}) {
    dispatch('testSetToken')
  }
}

const mutations = {
  [types.SET_USER_TOKEN] (state, token) {
    state.userToken = token
  },
  [types.ADD_AUTH_ERRORS] (state, error) {
    if (error) {
      state.errors.push(error)
    }
  },
  [types.ERASE_AUTH_ERRORS] (state) {
    state.errors = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
