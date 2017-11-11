<template lang="slm">
  div
    main
      v-content
        v-container
          v-slide-y-transition mode="out-in"
            v-layout(column align-center)
              router-view
    MyFooter
</template>

<script>
import MyFooter from '@/components/layout/MyFooter'

export default {
  components: { MyFooter }
}
</script>
