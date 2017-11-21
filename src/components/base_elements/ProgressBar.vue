<template lang="pug">
  v-progress-linear(v-if="waitResponse" :indeterminate="true")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('api', ['waitResponse'])
  }
}
</script>
