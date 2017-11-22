<template lang="pug">
  v-dialog(v-model="isOpen")
    v-card
      v-card-title Пригласить пользователя
      v-card-text
        v-text-field(name="name" label="Имя" v-model="name")
        v-text-field(name="surname" label="Фамилия" v-model="surname")
        v-text-field(name="email" label="Email" v-model="email")
      v-card-actions
        v-btn(
          color="primary"
          flat
          @click.stop="isOpen = false"
          ) Закрыть
        v-btn(
          color="primary"
          flat
          @click.stop="invite"
          ) Пригласить
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      name: '',
      surname: '',
      email: ''
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
  },
  methods: {
    invite () {
      let { name, surname, email } = this
      this.inviteUser({name, surname, email})
      .then(response => { this.isOpen = false })
    },
    ...mapActions('users', ['inviteUser'])
  }
}
</script>
