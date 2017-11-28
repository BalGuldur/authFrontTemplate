import router from '@/router'

const state = {
}

const getters = {
}

const actions = {
  vkAuth ({rootState}) {
    const currentUserId = rootState.auth.currentUser && rootState.auth.currentUser.id
    const rootVkAuth = 'https://oauth.vk.com/authorize?'
    const appId = 'client_id=6273528'
    const redirectUri = '&redirect_uri=http://localhost:8080/vk-auth-redirect'
    const respType = '&response_type=token'
    const additionalInfo = '&state=user_id:' + currentUserId
    const vkAuthUri = rootVkAuth + appId + redirectUri + respType + additionalInfo
    window.location.href = vkAuthUri
  },
  addVkIdToUser ({dispatch}, {vkUserId, userId}) {
    dispatch('auth/checkAuthorization', null, {root: true})
      .then(
        repsonse => {
          return dispatch('api/request', {
            link: '/users/add_social_account.json',
            method: 'post',
            data: {socialUserId: vkUserId, platform: 'vk'}
          }, {root: true})
        }
      ).then(
        router.push('/profile')
      )
    // router.push('/profile')
  }
}

const mutations = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
