<template>
  <el-popover
    placement="bottom"
    trigger="click"
    v-model="visiable"
    >
    <span>
      <img v-for='_module in allowedModules' class='icon icon-bordered button' :src='icon(_module, "module")' @click="update(_module)">
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
  props: ['module', 'allows'],
  data () {
    return {
      modules: modules,
      allowedModules: [],
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
  },
  mounted () {
    this.modules.forEach((module) => {
      let allowed = true
      if (module) {
        Object.keys(module.effect).forEach((effect) => {
          if (!this.allows.includes(effect)) {
            allowed = false
          }
        })
      }
      if (allowed) {
        this.allowedModules.push(module)
      }
    })
  }
}
</script>