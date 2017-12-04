<template lang="pug">
  div
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('vkAuth', ['addVkIdToUser', 'signInWithVk'])
  },
  mounted () {
    const vkUserId = this.$route.query.user_id
    const userId = this.$route.query.state.split(':')[1]
    console.log('userId', userId)
    if (userId !== 'undefined') {
      this.addVkIdToUser({vkUserId, userId})
    } else {
      this.signInWithVk({vkUserId})
    }
  }
}
</script>
