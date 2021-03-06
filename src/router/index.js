import Vue from 'vue'
import Router from 'vue-router'
// templates
import General from '@/components/layout/General'

// routes with Nav
import Hello from '@/components/Hello'
import Users from '@/components/users/Users'
import UserProfile from '@/components/user_profile/UserProfile'

// routes without Nav
import Login from '@/components/Login'
import Registration from '@/components/Registration'
import VkAuthRedirect from '@/components/oauth_redirects/VkAuthRedirect'
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
        { path: '/test', name: 'Тест', component: Hello },
        { path: '/users', name: 'Пользователи', component: Users },
        { path: '/profile', name: 'Профиль', component: UserProfile }
      ],
      beforeEnter: (to, from, next) => {
        store.dispatch('auth/checkAuthorization')
          .then(resolve => next(), reject => next('/login'))
      }
    },
    {
      path: '/',
      name: 'OutGeneral',
      component: General,
      children: [
        { path: '/login', name: 'Авторизация', component: Login },
        { path: '/registration', name: 'Регистрация', component: Registration },
        { path: '/vk-auth-redirect', component: VkAuthRedirect }
      ]
    }
  ]
})

export default router
