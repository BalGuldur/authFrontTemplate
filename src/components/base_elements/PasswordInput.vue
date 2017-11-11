<!-- Поле с вводом пароля -->
<template lang="slm">
  v-text-field(name="input-10-1" label="Введите пароль" hint="от 8 симв." min="8" :value="value" @input="changeValue" counter
  :append-icon="secIsOn ? 'visibility' : 'visibility_off'"
  :append-icon-cb="() => (secIsOn = !secIsOn)"
  :type="secIsOn ? 'password' : 'text'")
</template>

<script>
export default {
  data () {
    return {
      // Не показывать символы в пароле
      secIsOn: true
    }
  },
  props: {
    // value - значение поля, можно передавать через v-model
    value: {
      type: String
    }
  },
  methods: {
    // эмитим событие input для v-model
    changeValue (value) {
      this.$emit('input', value)
    }
  }
}
</script>
