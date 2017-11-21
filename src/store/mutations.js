import * as types from './mutation-types'
import Vue from 'vue'

export default {
  [types.SET_MODELS] (state, items) {
    Object.keys(items || {}).map(modelName => {
      Vue.set(state[modelName], 'data', items[modelName])
    })
  },
  [types.REMOVE_MODELS] (state, items) {
    Object.keys(items || {}).map(modelName => {
      Object.keys(items[modelName] || {}).map(modelId => {
        Vue.delete(state[modelName]['data'], modelId)
      })
    })
  },
  [types.ADD_MODELS] (state, items) {
    Object.keys(items || {}).map(modelName => {
      Object.keys(items[modelName] || {}).map(modelId => {
        Vue.set(state[modelName]['data'], parseInt(modelId), items[modelName][modelId])
      })
    })
  }
}
