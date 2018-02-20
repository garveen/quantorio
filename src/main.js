import Vue from 'vue'
import App from './App'
import VueI18n from 'vue-i18n'
import vueHeadful from 'vue-headful'
import VueTransmitPlugin from 'vue-transmit'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(VueTransmitPlugin)
Vue.component('vue-headful', vueHeadful)

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {}
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  i18n,
  render: h => h(App)
})
