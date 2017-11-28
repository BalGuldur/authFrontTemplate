<template lang="pug">
  div
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('vkAuth', ['addVkIdToUser'])
  },
  mounted () {
    const vkUserId = this.$route.query.user_id
    const userId = this.$route.query.state.split(':')[1]
    this.addVkIdToUser({vkUserId, userId})
  }
}
</script>
