<template>
  <el-dialog :show-close='false' :visible.sync="_visible">
    <el-tabs type="border-card" v-once>
      <el-tab-pane v-for='group in groups' :key='group.name'>
        <span slot="label"><img :src='icon(group)' class='group'></span>
        <div>
          <div v-for='subgroup in group.subgroupsWithItems'>
            <abbr v-for='(item) in subgroup.items' :title="translate(item, items[item.name])">
              <a @click='doAdd(item.name)'>
                <img class='icon icon-bordered' :src='icon(item)'>
              </a>
            </abbr>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>
<script>
import Helpers from './Helpers'
import items from '../data/items'
export default {
  props: ['visible'],
  data () {
    return {
      items: items,
    }
  },
  methods: {
    translate (...names) {
      return Helpers.translate(this.$i18n, ...names)
    },
    doAdd (name) {
      this.$emit('select', name)
      this.$emit('update:visible', false)
    },
    icon: Helpers.icon
  },
  computed: {
    _visible: {
      get: function () {
        return this.visible
      },
      set: function (val) {
        this.$emit('update:visible', val)
      }
    },
    groups () {
      return this.$store.state.groups
    },
  },
}
</script>
<style scoped>
>>> .el-dialog .el-input-number {
  margin: auto 10px
}

>>> .el-dialog__header {
  display: none
}

>>> .el-tabs__item {
  height: 92px;
  display: inline-flex;
  align-items: center;
  line-height: normal;
}
</style>