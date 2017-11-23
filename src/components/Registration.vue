<template lang="pug">
  div
    h1 Регистрация
    v-text-field(v-if="!token" name="companyTitle" label="Название комп." v-model="companyTitle")
    v-text-field(name="email" label="Email" v-model="email")
    passwordInput(v-model="password")
    v-btn(
      flat
      block
      color="primary"
      outline
      @click="regCompany({email, companyTitle, password})"
      ) {{ token ? 'Зарегестрироваться' : 'Создать компанию' }}
    v-btn(
      flat
      block
      color="primary"
      outline
      @click="$router.push('/login')"
      ) Авторизоваться
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
  computed: {
    token () {
      return this.$route.query.token
    }
  },
  methods: {
    ...mapActions('auth', ['regCompany'])
  }
}
</script>
