<template lang="pug">
    v-data-table(
      :headers="headers"
      :items="users"
      hide-actions
      class="elevation-1"
      )
      template(slot="items" slot-scope="props")
        td {{ props.item.fullname }}
        td {{ props.item.email }}
        td
          v-btn(flat icon)
            v-icon(:color="props.item.admin ? 'success' : ''" check_box)
          v-btn(flat icon)
            v-icon(:color="props.item.admin ? '' : 'success'" indeterminate_check_box)
        td
          v-btn(flat icon color="error" @click="deleteUser(props.item)")
            v-icon delete
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true
    },
    deleteUser: {
      type: Function,
      required: true
    }
  },
  data () {
    return { editedUsers: {} }
  },
  computed: {
    headers () {
      return [
        {text: 'Полное имя', sortable: false, align: 'center'},
        {text: 'email', sortable: false, align: 'center'},
        {text: 'админ', sortable: false, align: 'center'},
        {text: 'Действия', sortable: false, align: 'center'}
      ]
    }
  },
  methods: {
    enableEditUser (user) {
      this.$set(this.editedUsers, user.id, true)
    }
  }
}
</script>
