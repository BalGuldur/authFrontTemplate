<template lang="pug">
  v-layout(column align-center)
    div
      UsersInvitesTable(
        :userInvites="userInvites"
        :deleteUserInvite="deleteUserInvite"
        :inviteUser="inviteUser"
        )
      UsersTable(
        :users="users"
        :deleteUser="deleteUser"
        )
</template>

<script>
import UsersTable from './UsersTable'
import InviteUserModal from '@/components/users_invites/InviteUserModal'
import UsersInvitesTable from '@/components/users_invites/UsersInvitesTable'

import { mapActions, mapGetters } from 'vuex'

export default {
  components: { UsersTable, InviteUserModal, UsersInvitesTable },

  data () {
    return {
      inviteUserIsOpen: false
    }
  },

  computed: {
    ...mapGetters({
      users: 'users/array',
      userInvites: 'userInvites/array'
    })
  },

  methods: {
    ...mapActions('users', ['fetchUsers', 'deleteUser', 'inviteUser']),
    ...mapActions('userInvites', ['fetchUserInvites', 'deleteUserInvite'])
  },

  created () {
    this.fetchUsers()
    this.fetchUserInvites()
  }
}
</script>
