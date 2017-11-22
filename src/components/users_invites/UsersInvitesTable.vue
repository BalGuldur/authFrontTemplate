<template lang="pug">
  v-card
    v-card-title Приглашенные пользователи
    v-spacer
    InviteUserModal(:inviteUser="inviteUser")
    v-data-table(
      :headers="headers"
      :items="userInvites"
      hide-actions
      class="elevation-1"
      )
      template(slot="items" slot-scope="props")
        td {{ props.item.user.name }}
        td {{ props.item.user.surname }}
        td {{ props.item.user.email }}
        td
          v-btn(flat icon color="error" @click="deleteUserInvite(props.item)")
            v-icon delete
</template>

<script>
import InviteUserModal from './InviteUserModal'

export default {
  components: { InviteUserModal },
  props: {
    userInvites: {
      type: Array,
      required: true
    },
    deleteUserInvite: {
      type: Function,
      required: true
    },
    inviteUser: {
      type: Function,
      required: true
    }
  },
  computed: {
    headers () {
      return [
        {text: 'Имя', sortable: false, align: 'center'},
        {text: 'Фамилия', sortable: false, align: 'center'},
        {text: 'email', sortable: false, align: 'center'},
        {text: 'Действия', sortable: false, align: 'center'}
      ]
    }
  }
}
</script>
