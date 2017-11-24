<template lang="pug">
  v-text-field(
    name="surname"
    label="Фамилия"
    v-model="localValue"
    :rules="surnameRules"
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
      surnameRules: [
        (v) => !!v || 'Необходимо заполнить',
        (v) => v.length <= 15 || 'Фамилия должна быть меньше 15 символов'
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
