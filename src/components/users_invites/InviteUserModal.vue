<template lang="pug">
  div
    v-btn(v-if="!withoutButton" @click.stop="isOpen = true") Пригласить пользователя
    v-dialog(v-model="isOpen" max-width="500px")
      v-card
        v-card-title Пригласить пользователя
        v-card-text
          v-form(v-if="isOpen" v-model="valid" lazy-validation)
            BaseNameField(
              v-model="name"
              required
            )
            BaseSurnameField(
              v-model="surname"
              required
            )
            BaseEmailField(
              v-model="email"
              required
            )
        v-card-actions
          v-btn(
            color="primary"
            flat
            @click.stop="closeModal"
            ) Закрыть
          v-btn(
            color="primary"
            flat
            @click.stop="invite"
            :disabled="!valid"
            ) Пригласить
</template>

<script>
import BaseNameField from '@/components/base_elements/fields/BaseNameField'
import BaseSurnameField from '@/components/base_elements/fields/BaseSurnameField'
import BaseEmailField from '@/components/base_elements/fields/BaseEmailField'

export default {
  components: { BaseNameField, BaseSurnameField, BaseEmailField },
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
      isOpen: this.value,
      valid: false
    }
  },

  methods: {
    invite () {
      let { name, surname, email } = this
      this.inviteUser({name, surname, email})
        .then(response => { this.isOpen = false })
    },
    resetData () {
      this.name = ''
      this.surname = ''
      this.email = ''
    },
    closeModal () {
      this.resetData()
      this.isOpen = false
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
