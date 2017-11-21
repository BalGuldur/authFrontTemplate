<template lang="pug">
  div
    v-btn(@click.stop="inviteUserIsOpen = true") Пригласить пользователя
    InviteUserModal(v-model="inviteUserIsOpen")
    UsersTable(
      :users="users"
      :deleteUser="deleteUser"
      )
</template>

<script>
import UsersTable from './UsersTable'
import InviteUserModal from './InviteUserModal'

import { mapActions, mapGetters } from 'vuex'

export default {
  components: { UsersTable, InviteUserModal },

  data () {
    return {
      inviteUserIsOpen: false
    }
  },

  computed: {
    ...mapGetters({users: 'users/array'})
  },

  methods: {
    ...mapActions('users', (['fetchUsers', 'deleteUser']))
  },

  created () {
    this.fetchUsers()
  }
}
</script>
