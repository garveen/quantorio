<template>
  <div id="app">
    <index v-if="inited"/>
    <Loading v-if="loading"></Loading>
  </div>
</template>

<script>
import Data from './components/data'
import Index from './components/Index'
import Loading from './components/Loading'
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
  created () {
    Data.init().then((meta) => {
      Data.setVue(this, meta)
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
</style>
