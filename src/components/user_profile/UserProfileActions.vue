<template lang="pug">
  v-layout(column)
    v-btn(@click="changeVkAuth")
      v-icon fa-vk
      v-spacer
      span(v-if="!hasVkAccount") Связать с VK
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
        this.deleteSocialAccount(this.socAccsByPlatform['vk'])
      }
    },
    ...mapActions('vkAuth', ['vkAuth']),
    ...mapActions('socialAccounts', ['fetchSocialAccounts', 'deleteSocialAccount'])
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

