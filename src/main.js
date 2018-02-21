import Vue from 'vue'
import App from './App'
import vueHeadful from 'vue-headful'
import VueTransmitPlugin from 'vue-transmit'
import store from './store'
import i18n from './i18n'

Vue.config.productionTip = false
Vue.use(VueTransmitPlugin)
Vue.component('vue-headful', vueHeadful)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  i18n,
  render: h => h(App)
})
