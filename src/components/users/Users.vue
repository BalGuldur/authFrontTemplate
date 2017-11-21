<template lang="pug">
  UsersTable(
    :users="users"
    :deleteUser="deleteUser"
    )
</template>

<script>
import UsersTable from './UsersTable'

import { mapActions, mapGetters } from 'vuex'

export default {
  components: { UsersTable },
  created () {
    this.fetchUsers()
  },
  computed: {
    ...mapGetters({users: 'users/array'})
  },
  methods: {
    ...mapActions('users', (['fetchUsers', 'deleteUser']))
  }
}
</script>
