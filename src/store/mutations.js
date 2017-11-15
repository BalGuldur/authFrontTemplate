import * as types from './mutation-types'
import Vue from 'vue'

export default {
  [types.SET_MODEL] (state, items) {
    Object.keys(items || {}).map(modelName => {
      console.log('modelName', modelName)
      Object.keys(items[modelName] || {}).map(modelId => {
        console.log('modelId', modelId)
        if (!state[modelName]) {
          Vue.set(state, modelName, {})
        }
        Vue.set(state[modelName], parseInt(modelId), items[modelName][modelId])
      })
    })
  }
}
