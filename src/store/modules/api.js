// TODO: Add plugin watch auth/userToken getter and change axios.defaults.headers.common
import axios from 'axios'
import * as types from '@/store/mutation-types'

const apiProdLink = 'http://lidscatch.skyspace.cloud:80'
const apiLocalLink = 'http://localhost:3000'
const authHeaderName = 'Authorization'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? apiLocalLink : apiProdLink

const apiErrorStr = 'System error on API request'

// Api requests
const state = {
  axios: axios,
  errors: []
}

const getters = {
  axios: state => state.axios,
  errors: state => state.errors
}

const actions = {
  // Set headers for auth later requests
  setAuthHeaders ({getters}, token) {
    getters.axios.defaults.headers.common[authHeaderName] = token
  },
  post ({getters, dispatch, commit}, {link, params, addErrorType}) {
    commit('ERASE_API_ERRORS')
    return getters.axios.post(link, params).then(
      response => Promise.resolve(response)
    ).catch(error => dispatch('rejectError', {error, addErrorType}))
  },
  // return error in Promise.reject when catch error on axios requiests
  rejectError ({commit}, {error, addErrorType}) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      commit(addErrorType, error.response.data, {root: true})
      return Promise.reject()
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      commit('ADD_API_ERRORS', {error: apiErrorStr})
      return Promise.reject()
    } else {
      // Something happened in setting up the request that triggered an Error
      commit('ADD_API_ERRORS', {error: apiErrorStr})
      return Promise.reject()
    }
  }
}

const mutations = {
  [types.ADD_API_ERRORS] (state, error) {
    state.errors.push(error)
  },
  [types.ERASE_API_ERRORS] (state) {
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
