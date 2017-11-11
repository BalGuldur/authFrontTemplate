<template lang="slm">
  div
    h1 Login
    v-text-field(name="input-1" label="Email" v-model="email")
    passwordInput v-model="password"
    v-btn(flat block color="primary" outline @click="signIn({email, password})") Войти
</template>

<script>
import passwordInput from '@/components/base_elements/PasswordInput'

import { mapActions } from 'vuex'

export default {
  components: { passwordInput },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('auth', ['signIn'])
  }
}
</script>
