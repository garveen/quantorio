<template>
  <div id="app">
    <index/>
  </div>
</template>

<script>
import Index from './components/Index'
export default {
  components: {
    Index
  },
  name: 'app',
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
