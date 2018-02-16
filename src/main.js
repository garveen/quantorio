import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import vueHeadful from 'vue-headful'
import Element from './element'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueI18n)
Vue.component('vue-headful', vueHeadful)

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {}
})

Element(Vue, i18n)

const store = new Vuex.Store({
  state: {
    difficulty: 'normal',
    meta: {},
    languages: {},
  },
  mutations: {
    setDifficulty (state, v) {
      state.difficulty = v
    },
    setMeta (state, v) {
      state.meta = v
    },
    setLanguages (state, v) {
      state.languages = v
    },
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  i18n,
  render: h => h(App)
})
