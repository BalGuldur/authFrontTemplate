<template lang="pug">
  v-text-field(
    name="email"
    label="Email"
    v-model="localValue"
    :rules="emailRules"
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
      emailRules: [
        (v) => !!v || 'Необходимо заполнить',
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(v) || 'E-mail неверного формата'
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
