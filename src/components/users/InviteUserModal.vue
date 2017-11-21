<template lang="pug">
  v-dialog(v-model="isOpen")
    v-card
      v-card-title Пригласить пользователя
      v-card-text
      v-card-actions
        v-btn(
          color="primary"
          flat
          @click.stop="isOpen = false"
          ) Закрыть
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isOpen: {
      get () {
        return this.value
      },
      set (newValue) {
        if (newValue !== this.value) {
          this.$emit('input', newValue)
        }
      }
    }
  }
}
</script>
