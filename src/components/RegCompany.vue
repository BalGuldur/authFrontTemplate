<template lang="slm">
  div
    h1 Регистрация
    v-text-field(name="companyTitle" label="Название комп." v-model="companyTitle")
    v-text-field(name="email" label="Email" v-model="email")
    passwordInput v-model="password"
    v-btn(flat block color="primary" outline @click="regCompany({email, companyTitle, password})") Создать компанию
</template>

<script>
import passwordInput from '@/components/base_elements/PasswordInput'

import { mapActions } from 'vuex'

export default {
  components: { passwordInput },
  data () {
    return {
      companyTitle: '',
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('auth', ['regCompany'])
  }
}
</script>
