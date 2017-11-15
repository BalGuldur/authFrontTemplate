<template lang="slm">
  div
    h1 Пользователи
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created () {
    this.fetchUsers()
  },
  methods: {
    ...mapActions('users', (['fetchUsers']))
  }
}
</script>
