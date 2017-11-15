import Vue from 'vue'
import Router from 'vue-router'
// templates
import General from '@/components/layout/General'
import OutGeneral from '@/components/layout/OutGeneral'

// routes without Nav
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import RegCompany from '@/components/RegCompany'
// import for link store when reload page (and store in router.app.$store don't init)
import store from '@/store'

// routes in Nav

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'General',
      component: General,
      children: [
        { path: '/test', name: 'Тест', component: Hello }
      ],
      beforeEnter: (to, from, next) => {
        console.log('beforeEnter')
        store.dispatch('auth/checkAuthorization')
          .then(resolve => next(), reject => next('/login'))
      }
    },
    {
      path: '/',
      name: 'OutGeneral',
      component: OutGeneral,
      children: [
        { path: '/login', name: 'Login', component: Login },
        { path: '/regCompany', name: 'RegCompany', component: RegCompany }
      ]
    }
  ]
})

export default router
