<template lang="pug">
  //- v-navigation-drawer.left-nav(persistent enable-resize-watcher app v-model="drawer")
  v-navigation-drawer.left-nav(temporary disable-resize-watcher v-model="drawer" light absolute)
    v-list
      v-list-tile(
        v-for="(item, i) in navItems"
        :key="i"
        :to="item.link"
        )
        v-list-tile-action
          v-icon(light v-html="item.icon")
        v-list-tile-content
          v-list-tile-title(v-text="item.title")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      drawer: false,
      items: [
        {icon: 'bubble_chart', title: 'Inspire'}
      ]
    }
  },
  computed: {
    ...mapGetters('navigation', ['leftNavIsOpen', 'navItems'])
  },
  methods: {
    ...mapActions('navigation', ['changeNavIsOpen'])
  },
  watch: {
    drawer () {
      if (this.drawer !== this.leftNavIsOpen) {
        this.changeNavIsOpen()
      }
    },
    leftNavIsOpen () {
      if (this.drawer !== this.leftNavIsOpen) {
        this.drawer = this.leftNavIsOpen
      }
    }
  },
  created () {
    this.drawer = this.leftNavIsOpen
  }
}
</script>
