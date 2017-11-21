<template lang="pug">
  v-app
    v-content
      v-container
        v-slide-y-transition(mode="out-in")
          v-layout(column align-center)
            ShowErrors
            router-view
    MyFooter
</template>

<script>
import MyFooter from '@/components/layout/MyFooter'
import ShowErrors from '@/components/ShowErrors'

export default {
  components: { MyFooter, ShowErrors }
}
</script>
