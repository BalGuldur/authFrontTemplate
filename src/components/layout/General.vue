<template lang="slm">
  v-app
    LeftNav
    TopToolbar
    v-content.padding
      v-container(fluid)
        v-slide-y-transition mode="out-in"
          v-layout(column align-center)
            ShowErrors
            ProgressBar
            router-view
    MyFooter
</template>

<script>
import LeftNav from '@/components/layout/LeftNavigate'
import TopToolbar from '@/components/layout/TopToolbar'
import MyFooter from '@/components/layout/MyFooter'
import ShowErrors from '@/components/ShowErrors'
import ProgressBar from '@/components/base_elements/ProgressBar'

export default {
  components: { LeftNav, TopToolbar, MyFooter, ShowErrors, ProgressBar }
}
</script>
