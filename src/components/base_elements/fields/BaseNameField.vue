<template lang="pug">
  v-text-field(
    name="name"
    label="Имя"
    v-model="localValue"
    :rules="nameRules"
    :required="required"
  )
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      nameRules: [
        (v) => !!v || 'Необходимо заполнить',
        (v) => v.length <= 15 || 'Имя должно быть меньше 15 символов'
      ]
    }
  },
  computed: {
    localValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>
