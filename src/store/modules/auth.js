import * as types from '@/store/mutation-types'
import Vue from 'vue'
import router from '@/router'
import { needAuthStr } from '@/initializers/AuthErrors'

const addErrorType = 'auth/ADD_AUTH_ERRORS'
const withoutApiPref = true

// Get and set userToken to LocalStorage
const getTokenFromLs = () => {
  return Vue.ls.get('userToken')
}
const setTokenToLs = (token) => {
  Vue.ls.set('userToken', token)
}
// Authenticate and authorizate users
const state = {
  currentUser: undefined,
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
    dispatch('api/setAuthHeaders', undefined, {root: true}) // need when user token not empty, but not auth
    dispatch('api/request', {method: 'post', link: '/users/sign_in.json', data: {user}, addErrorType, withoutApiPref}, {root: true}).then(
      response => {
        // Success sign in, set token and redirect to /
        const respToken = response.headers.authorization
        dispatch('setToken', respToken)
        commit('SET_CURR_USER', response.data)
        router.push('/')
      }
    )
  },
  signOut ({dispatch, commit}) {
    // TODO: Send logout request to API
    commit('ERASE_AUTH_ERRORS')
    commit('SET_CURR_USER', undefined)
    dispatch('setToken', undefined)
    router.push('/login')
  },
  checkAuthorization ({dispatch, getters, commit}) {
    const token = getters.userToken || getTokenFromLs()
    // Don't send request to api if token undefined (anyway it's don't auth)
    if (token) {
      dispatch('api/setAuthHeaders', token, {root: true}) // config headers for ajax requests
      return dispatch('api/request', {method: 'post', link: '/check.json', addErrorType, withoutApiPref}, {root: true}).then(
        response => {
          dispatch('setToken', token)
          commit('SET_CURR_USER', response.data)
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
  [types.SET_CURR_USER] (state, user) {
    state.currentUser = user
  },
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
