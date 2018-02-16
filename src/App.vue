<template>
  <div id="app">
    <index v-if="loaded"/>
  </div>
</template>

<script>
import Data from './components/data'
import Index from './components/Index'
export default {
  components: {
    Index
  },
  name: 'app',
  data () {
    return {
      loaded: false,
    }
  },
  created () {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0)'
    })

    Data.then((data) => {
      this.$store.commit('setLanguages', data.languages)
      this.$store.commit('setMeta', data)
      window.items = data.items

      Object.keys(data.translations).forEach(lang => {
        let message = data.translations[lang]
        try {
          message.el = require('element-ui/lib/locale/lang/' + lang).default.el
        } catch (ex) {
        }
        this.$i18n.setLocaleMessage(lang, message)
      })
      loading.close()
      this.loaded = true
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
</style>
