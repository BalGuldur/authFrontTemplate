// TODO: Add plugin watch auth/userToken getter and change axios.defaults.headers.common
import axios from 'axios'
import * as types from '@/store/mutation-types'
import { apiVerPrefix, apiProdLink, apiLocalLink, authHeaderName } from '@/initializers/Api'

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
  // send request w
  request ({getters, dispatch, commit}, {method, link, data, params, addErrorType, withoutApiPref}) {
    commit('ERASE_API_ERRORS')
    const url = withoutApiPref ? link : apiVerPrefix + link // send request with or withoutApiPref
    return getters.axios.request({url, method, data, params}).then(
      response => Promise.resolve(response)
    ).catch(error => dispatch('rejectError', {error, addErrorType}))
  },
  // get ({getters, dispatch, commit}, {link, params, addErrorType, withoutApiPref}) {
  //   commit('ERASE_API_ERRORS')
  //   const url = withoutApiPref ? link : apiVerPrefix + link // send request with or withoutApiPref
  //   return getters.axios.get(url, {params}).then(
  //     response => Promise.resolve(response)
  //   ).catch(error => dispatch('rejectError', {error, addErrorType}))
  // },
  fetchModel ({dispatch, commit}, {link, params}) {
    return dispatch('request', {method: 'get', link, params}).then(
      response => {
        commit('SET_MODELS', response.data, {root: true}) // Run root mutation
        return Promise.resolve(response.data)
      }
    )
  },
  deleteModelItem ({dispatch, commit}, {link}) {
    return dispatch('request', {method: 'delete', link}).then(
      response => {
        commit('REMOVE_MODELS', response.data, {root: true}) // Run root mutation
        return Promise.resolve(response.data)
      }
    )
  },
  // return error in Promise.reject when catch error on axios requiests
  rejectError ({commit}, {error, addErrorType}) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const errorMutType = addErrorType || 'ADD_API_ERRORS'
      commit(errorMutType, error.response.data, {root: true})
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      commit('ADD_API_ERRORS', {error: apiErrorStr})
      commit('ADD_API_ERRORS', {error: error.request})
    } else {
      // Something happened in setting up the request that triggered an Error
      commit('ADD_API_ERRORS', {error: apiErrorStr})
      commit('ADD_API_ERRORS', {error: error.message})
    }
    return Promise.reject()
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
