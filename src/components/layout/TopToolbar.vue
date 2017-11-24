<template lang="pug">
  v-toolbar(fixed app)
    v-toolbar-side-icon(
      v-if="currentUser"
      @click.stop="changeNavIsOpen"
      light
      )
    // TODO: Вынести title в vuex
    v-toolbar-title {{ this.$route.name }}
    v-spacer
    UserAvatar
    v-btn(v-if="currentUser" @click="signOut") Logout
</template>

<script>
import UserAvatar from '@/components/user_profile/UserAvatar'

import { mapActions, mapGetters } from 'vuex'

export default {
  components: { UserAvatar },
  methods: {
    ...mapActions('navigation', ['changeNavIsOpen']),
    ...mapActions('auth', ['signOut'])
  },
  computed: {
    ...mapGetters('auth', ['currentUser'])
  }
}
</script>
