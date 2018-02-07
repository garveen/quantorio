import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueI18n from 'vue-i18n'
import vueHeadful from 'vue-headful'

import list from '../public/translations/list'

Vue.config.productionTip = false
Vue.use(Vuex)
// Vue.use(ElementUI)
Vue.use(VueI18n)
Vue.component('vue-headful', vueHeadful)

let all = {}
list.forEach((lang) => {
  try {
    all[lang] = require('../public/translations/' + lang).default
    all[lang].el = require('element-ui/lib/locale/lang/' + lang).default.el
  } catch (ex) {
  }
})

const i18n = new VueI18n({
  locale: 'zh-CN',
  fallbackLocale: 'en',
  messages: all
})

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  i18n,
  render: h => h(App)
})
