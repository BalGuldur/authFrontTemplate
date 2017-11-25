<template lang="pug">
  v-app
    LeftNav
    TopToolbar
    v-content
      v-container(fluid)
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
