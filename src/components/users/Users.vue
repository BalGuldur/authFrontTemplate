<template lang="slm">
  div
    h1 Пользователи
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created () {
    console.log('fetch')
    this.fetchModel({link: '/api/users.json'})
  },
  methods: {
    ...mapActions('api', (['fetchModel']))
  }
}
</script>
