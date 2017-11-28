<template lang="pug">
  v-layout(column)
    v-btn(@click="goToVkAuth")
      v-icon fa-vk
      v-spacer
      span Связать с VK
    v-btn test2
</template>

<script>
export default {
  methods: {
    goToVkAuth () {
      const rootVkAuth = 'https://oauth.vk.com/authorize?'
      const appId = 'client_id=6273528'
      const redirectUri = '&redirect_uri=http://localhost:8080/vk-auth-redirect'
      const respType = '&response_type=token'
      const vkAuthUri = rootVkAuth + appId + redirectUri + respType
      window.location.href = vkAuthUri
    }
  }
}
</script>

