<template>
  <el-popover
    placement="bottom"
    trigger="click"
    v-model="visiable"
    >
    <span>
      <img v-for='_module in modules' class='icon icon-bordered button' :src='icon(_module, "module")' @click="update(_module)">
    </span>
    <span slot='reference'>
      <img class='icon icon-bordered button' :src='icon(selectedModule, "module")'>
    </span>
  </el-popover>
</template>
<script>
import Helpers from './Helpers'
import modules from '../../public/modules'
export default {
  props: ['module'],
  data () {
    return {
      modules: modules,
      selectedModule: module,
      visiable: false,
    }
  },
  methods: {
    icon: Helpers.icon,
    update (_module) {
      this.selectedModule = _module
      this.visiable = false
      this.$emit('update:module', _module)
    }
  }
}
</script>