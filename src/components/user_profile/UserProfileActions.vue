<template lang="pug">
  v-layout(column)
    v-btn(@click="vkAuth")
      v-icon fa-vk
      v-spacer
      span Связать с VK
    v-btn test2
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('vkAuth', ['vkAuth'])
  }
}
</script>

