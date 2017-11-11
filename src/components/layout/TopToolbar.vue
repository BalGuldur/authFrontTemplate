<template lang="slm">
  v-toolbar(fixed app)
    v-toolbar-side-icon(@click.stop="changeNavIsOpen" light)
    // TODO: Вынести title в vuex
    v-toolbar-title
      . {{ this.$route.name }}
    v-spacer
    v-btn @click="login" Login
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['changeNavIsOpen', 'login'])
  }
}
</script>
