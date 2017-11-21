import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex/dist/vuex.js'
// import store from '@/store'
import Login from '@/components/Login'
Vue.use(Vuetify)
Vue.use(Vuex)

describe('Login.vue', () => {
  // check component options
  // it('has a created hook', () => {
  //   expect(typeof MyComponent.created).toBe('function')
  // })

  // Check methods result in options
  // it('sets the correct default data', () => {
  //   expect(typeof MyComponent.data).toBe('function')
  //   const defaultData = MyComponent.data()
  //   expect(defaultData.message).toBe('hello!')
  // })

  // Check instance component after mount
  // it('correctly sets the message when created', () => {
  //   const vm = new Vue(MyComponent).$mount()
  //   expect(vm.message).toBe('bye!')
  // })

  // Монтирование экземпляра и оценка вывода сразу после рендера
  // it('renders the correct message', () => {
  //   const Ctor = Vue.extend(Login)
  //   const vm = new Ctor().$mount()
  //   expect(vm.$el.textContent).to.equal('bye!')
  // })

  // Монтирование экземпляра и оценка вывода после nextTick
  it('renders the correct message', done => {
    const Ctor = Vue.extend(Login)
    const vm = new Ctor().$mount()

    vm.$nextTick()
      .then(() => {
        expect(vm.$el.querySelector('.login div'))
          .to.exist
        expect(vm.$el.querySeletcor('.login h1').textContent)
          .to.equal('Login')
        done()
      })
      .catch(done)
  })
})
