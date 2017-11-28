<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12 sm6 md4 offset-md2)
      v-card
        //- TODO: Add User Profile Info
        v-card-text User Profile Info
    v-flex(xs12 sm6 md4)
      v-card
        v-card-text
          UserProfileActions
</template>

<<script>
import UserProfileActions from './UserProfileActions'

export default {
  components: { UserProfileActions }
}
</script>
