import Vue from 'vue'
import App from './App'
import store from './store'
import i18n from './i18n'

Vue.config.productionTip = false

// async import to reduce size of app.js and vendor.js
let imports = [
  import('./element').then(Element => Element.default()),
  import('vue-transmit').then(transmit => Vue.use(transmit.default)),
]

Promise.all(imports).then(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    store,
    i18n,
    render: h => h(App)
  })
})
