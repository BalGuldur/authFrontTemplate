// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import App from './App'
import store from './store'
import router from './router'

import VueLocalStorage from 'vue-ls'
Vue.use(VueLocalStorage, {namespace: 'vuejs_auth_template__'})

Vue.use(Vuetify)

Vue.config.productionTip = false
if (window.location.pathname === '/vk-auth-redirect') {
  window.location.href = window.location.origin + '/#/vk-auth-redirect' + '?' + window.location.hash.split('/')[1]
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
