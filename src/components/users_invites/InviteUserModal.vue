<template lang="pug">
  div
    v-btn(v-if="!withoutButton" @click.stop="isOpen = true") Пригласить пользователя
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
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    inviteUser: {
      type: Function,
      required: true
    },
    withoutButton: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      name: '',
      surname: '',
      email: '',
      isOpen: this.value
    }
  },

  methods: {
    invite () {
      let { name, surname, email } = this
      this.inviteUser({name, surname, email})
      .then(response => { this.isOpen = false })
    }
  },

  watch: {
    value () {
      if (this.value !== this.isOpen) {
        this.isOpen = this.value
      }
    },
    isOpen () {
      if (this.isOpen !== this.value) {
        this.$emit('input', this.isOpen)
      }
    }
  }
}
</script>
