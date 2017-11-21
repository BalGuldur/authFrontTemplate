<template lang="pug">
  div
    template(v-if="authErrors.length > 0")
      v-snackbar(
        :timeout="authTimeout"
        :top="authPosition.top"
        :right="authPosition.right"
        :multi-line="true"
        color="error"
        :value="true"
        )
        div
          div(
            v-for="error, index in authErrors"
            :key="'authError' + index"
            ) {{ error.error }}
    template(v-if="apiErrors.length > 0")
      v-snackbar(
        :timeout="apiTimeout"
        :top="apiPosition.top"
        :right="apiPosition.right"
        :multi-line="true"
        color="error"
        :value="true"
        )
        div
          div(
            v-for="error, index in apiErrors"
            :key="'apiError' + index"
            ) {{ error.error }}
</template>

<script>
import Snackbar from '@/components/base_elements/Snackbar'
import { showTimeout as authTimeout, showPosition as authPosition } from '@/initializers/AuthErrors'
import { showTimeout as apiTimeout, showPosition as apiPosition } from '@/initializers/ApiErrors'

import { mapGetters } from 'vuex'

export default {
  components: { Snackbar },
  data () {
    return {
      authTimeout: authTimeout,
      authPosition: authPosition,
      apiTimeout: apiTimeout,
      apiPosition: apiPosition
    }
  },
  computed: {
    ...mapGetters({authErrors: 'auth/errors', apiErrors: 'api/errors'})
  }
}
</script>
