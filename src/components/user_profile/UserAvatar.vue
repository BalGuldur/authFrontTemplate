<template lang="pug">
  //- TODO: Change router.push to action in modules
  v-btn(
    @click="$router.push('/profile')"
    flat
    color="indigo"
    )
    v-icon account_circle
    div {{ currentUser.fullname }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', ['currentUser'])
  }
}
</script>
