<template lang="pug">
  v-layout(column)
    v-btn(@click="changeVkAuth")
      v-icon fa-vk
      v-spacer
      span(v-if="hasVKAccount") Связать с VK
      span(v-else) Отвязать от VK
    v-btn test2
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    changeVkAuth () {
      if (!this.hasVkAccount) {
        this.vkAuth()
      } else {
        console.log('delete vk auth')
      }
    },
    ...mapActions('vkAuth', ['vkAuth']),
    ...mapActions('socialAccounts', ['fetchSocialAccounts'])
  },
  computed: {
    hasVkAccount () {
      return (this.socAccsByPlatform['vk'] && true) || false
    },
    ...mapGetters({
      currentUser: 'auth/currentUser',
      socAccsByPlatform: 'socialAccounts/byPlatformType'
    })
  },
  beforeMount () {
    this.fetchSocialAccounts()
  }
}
</script>

