<template lang="pug">
  v-btn(
    @click="goToProfile"
    flat
    color="indigo"
    )
    v-icon account_circle
    div {{ currentUser.fullname }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', ['currentUser'])
  },
  methods: {
    ...mapActions('navigation', ['goToProfile'])
  }
}
</script>
