import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueI18n from 'vue-i18n'
import vueHeadful from 'vue-headful'

import list from '../public/languages'

Vue.config.productionTip = false
Vue.use(Vuex)
// Vue.use(ElementUI)
Vue.use(VueI18n)
Vue.component('vue-headful', vueHeadful)

let languages = {}
let languagesList = Object.keys(list).sort((a, b) => {
  return list[a].localeCompare(list[b])
})
languagesList.forEach((name) => {
  languages[name] = list[name]
})

let all = {}
languagesList.forEach(lang => {
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
    difficulty: 'normal',
    groups: {},
    languages: languages,
  },
  mutations: {
    setDifficulty (state, v) {
      state.difficulty = v
    },
    setGroups (state, v) {
      state.groups = v
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
