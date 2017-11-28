<template lang="pug">
  v-layout(column align-center)
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
        @click="registration"
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
    registration () {
      const { email, password, companyTitle, token } = this
      if (token) {
        this.regByUserInvite({email, password, token})
      } else {
        this.regCompany({email, password, companyTitle})
      }
    },
    ...mapActions('auth', ['regCompany', 'regByUserInvite'])
  }
}
</script>
