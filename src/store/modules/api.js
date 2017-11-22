// TODO: Add plugin watch auth/userToken getter and change axios.defaults.headers.common
import axios from 'axios'
import * as types from '@/store/mutation-types'
import { apiVerPrefix, apiProdLink, apiLocalLink, authHeaderName } from '@/initializers/Api'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? apiLocalLink : apiProdLink

const apiErrorStr = 'System error on API request'

// Api requests
const state = {
  axios: axios,
  errors: [],
  qtyRequestsInProgress: 0
}

const getters = {
  axios: state => state.axios,
  errors: state => state.errors,
  waitResponse: state => state.qtyRequestsInProgress > 0
}

const actions = {
  // Set headers for auth later requests
  setAuthHeaders ({getters}, token) {
    getters.axios.defaults.headers.common[authHeaderName] = token
  },
  // send request to link with method and url params and data
  // addErrorType - mutation-type for add errors on request - optional - (API_ADD_ERROR by default)
  // withoutApiPref - boolean, don't add apiVerPrefix like 'api/1' to request link - (false by default)
  request ({getters, dispatch, commit}, {method, link, data, params, addErrorType, withoutApiPref}) {
    commit('ERASE_API_ERRORS')
    commit('INCREMENT_WAIT_REQUESTS')
    const url = withoutApiPref ? link : apiVerPrefix + link // send request with or withoutApiPref
    return getters.axios.request({url, method, data, params}).then(
      response => {
        commit('DECREMENT_WAIT_REQUESTS')
        return Promise.resolve(response)
      }
    ).catch(error => {
      commit('DECREMENT_WAIT_REQUESTS')
      dispatch('rejectError', {error, addErrorType})
      return Promise.reject(error)
    })
  },
  // fetch model from link with params, if success set all models from response.data
  fetchModel ({dispatch, commit}, {link, params}) {
    return dispatch('request', {method: 'get', link: link + '.json', params})
    .then(
      response => {
        commit('SET_MODELS', response.data, {root: true}) // Run root mutation
        return Promise.resolve(response.data)
      }
    )
  },
  // add model from link, if success add all models from response.data
  addModelItem ({dispatch, commit}, {link, item}) {
    return dispatch('request', {method: 'post', link: link + '.json', data: item})
    .then(
      response => {
        commit('ADD_MODELS', response.data, {root: true}) // Run root mutation
        return Promise.resolve(response.data)
      }
    )
  },
  // delete model from link, if success delete all models from response.data
  deleteModelItem ({dispatch, commit}, {link, item}) {
    return dispatch('request', {method: 'delete', link: link + '/' + item.id + '.json'})
    .then(
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
      const errorMutType = addErrorType || 'api/ADD_API_ERRORS'
      const data = error.response.data
      // commit(errorMutType, msg, {root: true})
      if (Array.isArray(data.error)) {
        error.response.data.error.map(msg => commit(errorMutType, {error: msg}, {root: true}))
      } else {
        commit(errorMutType, data, {root: true})
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      commit('ADD_API_ERRORS', {error: apiErrorStr})
      Object.keys(error.request || {}).length > 0 && commit('ADD_API_ERRORS', {error: error.request})
    } else {
      // Something happened in setting up the request that triggered an Error
      commit('ADD_API_ERRORS', {error: apiErrorStr})
      Object.keys(error.message || {}).length > 0 && commit('ADD_API_ERRORS', {error: error.message})
    }
    return Promise.resolve()
  }
}

const mutations = {
  [types.ADD_API_ERRORS] (state, error) {
    state.errors.push(error)
  },
  [types.ERASE_API_ERRORS] (state) {
    state.errors = []
  },
  [types.INCREMENT_WAIT_REQUESTS] (state) {
    state.qtyRequestsInProgress = state.qtyRequestsInProgress + 1
  },
  [types.DECREMENT_WAIT_REQUESTS] (state) {
    if (state.qtyRequestsInProgress > 0) {
      state.qtyRequestsInProgress = state.qtyRequestsInProgress - 1
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
