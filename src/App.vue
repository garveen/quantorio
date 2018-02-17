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

    Data.init().then((meta) => {
      Data.setVue(this, meta)
      this.loaded = true
      loading.close()
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
