<template>
  <div id="app">
    <transition name='fade'>
      <index v-if="!loading && inited"/>
    </transition>
    <transition name='fade'>
      <Loading v-if="loading"></Loading>
    </transition>
  </div>
</template>

<script>
import Data from './components/data'
import Index from './components/Index'
import Loading from './components/Loading'
import Vue from 'vue'
export default {
  components: {
    Index,
    Loading,
  },
  name: 'app',
  data () {
    return {
      inited: false,
    }
  },
  beforeCreate () {
    import('./element').then((Element) => {
      Element.default(Vue, this.$i18n)
    })
  },
  mounted () {
    this.$store.commit('setLoading', true)

    let translateFallback = this.$i18n.fallbackLocale
    Data.init(translateFallback).then((meta) => {
      let currentLanguage
      let testLanguage = navigator.language || navigator.userLanguage
      if (meta.languages[testLanguage]) {
        currentLanguage = testLanguage
      } else {
        currentLanguage = translateFallback
      }
      if (currentLanguage !== translateFallback) {
        return Data.loadTranslation(currentLanguage)
      } else {
        return currentLanguage
      }
    })
    .then(language => {
      this.$i18n.locale = language
      this.inited = true
      this.$store.commit('setLoading', false)
    })
  },

  computed: {
    loading () {
      return this.$store.state.loading
    }
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
