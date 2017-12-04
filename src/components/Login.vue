<template lang="pug">
  v-layout(column align-center)
    div.login
      h1 Login
      v-text-field(
        name="email"
        label="Email"
        v-model="email"
        )
      passwordInput(
        v-model="password"
        @keyup.enter.native="signIn({user: {email, password}})"
        )
      v-btn(
        flat
        block
        color="primary"
        outline
        @click="signIn({user: {email, password}})"
        ) Войти
      v-btn(
        flat
        block
        color="primary"
        outline
        @click="vkAuth"
      ) Войти с помощью VK
      v-btn(
        flat
        block
        color="primary"
        outline
        @click="$router.push('/registration')"
        ) Зарегестрироваться
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
    ...mapActions('auth', ['signIn']),
    ...mapActions('vkAuth', ['vkAuth'])
  }
}
</script>
