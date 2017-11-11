<template lang="slm">
  div
    LeftNav
    TopToolbar
    main
      v-content
        v-container(fluid)
          v-slide-y-transition mode="out-in"
            v-layout(column align-center)
              router-view
    MyFooter
</template>

<script>
import LeftNav from '@/components/layout/LeftNavigate'
import TopToolbar from '@/components/layout/TopToolbar'
import MyFooter from '@/components/layout/MyFooter'

export default {
  components: { LeftNav, TopToolbar, MyFooter }
}
</script>
