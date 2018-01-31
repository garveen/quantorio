<template>
  <div class='container-fluid' id='container' type='flex'>
    <el-row type='flex' justify='space-between' :style='{"align-items": "center"}'>

      <el-col :span='12'>
        <h1>
        <span data-type='quantorio'>{{ $t('factorio-quantizative-tool') }}</span>
        </h1>
      </el-col>
      <el-col :span='8' :style='{"text-align": "end"}'>
        <el-button type='primary' plain>{{ $t('rebuild-icon') }}</el-button>
        <el-button type='primary' plain href="https://github.com/acabin/quantorio">View on GitHub</el-button>
        <el-select v-model='locale' filterable default-first-option>
          <el-option v-for="item in languages" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table :data='tableData' :row-class-name="tableRowClassName">
      <el-table-column width='64' :render-header='renderHeaderOperation'>
        <template slot-scope="scope">
          <div :style='{display: "flex", "flex-direction": "column"}'>
            <el-button v-if='scope.row.type === "req"' class='operation' type="danger" size='small' @click='handleRemove(scope.$index, scope.row)'>-</el-button>
            <el-button v-if='scope.row.expended' class='operation' type="warning" size='small' @click='scope.row.expended = false'>&lt;</el-button>
            <el-button v-else-if='scope.row.canExpend' class='operation' type="primary" size='small' @click='scope.row.expended = true'>&gt;</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('name')">
        <template slot-scope="scope">
          <el-row>
            <el-col :offset='scope.row.indent'>
              <div :style='{display: "flex"}'>
                <img class='icon' :src='scope.row.icon' />
                <span v-bind:style='{margin: "auto 0 auto 10px"}' v-t='scope.row.name'></span>
              </div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="needs" :label="$t('requirement-per-minute')">
        <template slot-scope="scope">
          <el-input-number v-if='scope.row.type === "req"' v-model="scope.row.needs" :min=0 controls-position="right" size='small'></el-input-number>
        </template>
      </el-table-column>
      <el-table-column prop="made_in" :label="$t('made-in')">
        <template slot-scope="scope">
          <el-popover placement="bottom" trigger='click' popper-class='machine-popper'>
            <div slot='reference'  class='flex button'>
              <img :src='icon(scope.row.machine)' class='button icon'>
              <img v-for='module in scope.row.modules' v-if='module' class='icon' :src='icon(module)'>
              <span v-t='scope.row.machine.name' :style='{"margin-right": "8px"}'></span>
              <span v-for='(beacon, beaconName) in scope.row.beacons' v-if='beacon.count !== 0' class='flex'>
                <span>, {{ beacon.count }} X</span>
                <img class='icon' :src='icon(beaconName)'>
                <img v-for='module in beacon.modules' v-if='module' class='icon' :src='icon(module)'>
              </span>
            </div>
            <div>
              <span class='flex'>
                <el-popover
                  ref="machinePopover"
                  placement="bottom"
                  trigger="hover">
                  <div>
                    <img :src='items[machine.name].icon' @click='selectMachine(scope.row, machine)' v-for='machine in machines' class='button icon icon-bordered'>
                  </div>
                  <span slot='reference'>
                    <img class='icon button' :src='items[scope.row.machine.name].icon'>
                  </span>
                </el-popover>
                <ModuleSelector ref="modulePopover" v-for="index in scope.row.machine.module_slots" :key='index' :module.sync='scope.row.modules[index - 1]'></ModuleSelector>
              </span>
            </div>
            <div>
              <span v-for="beacon in beacons" class='flex'>
                <img class='icon' :src='icon(beacon)'>
                <ModuleSelector ref="modulePopover" v-for="index in beacon.module_slots" :key='index' :module.sync='scope.row.beacons[beacon.name].modules[index - 1]'></ModuleSelector>
                <el-input-number :min=0 controls-position="right" v-model='scope.row.beacons[beacon.name].count' size='small'></el-input-number>
              </span>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="machine_number" :label="$t('machine-number')">
      </el-table-column>
      <!-- <el-table-column
          prop="power"
          :label="$t('electric-consumption')">
        </el-table-column>
        <el-table-column
          prop="pollution"
          :label="$t('pollution')">
        </el-table-column> -->
    </el-table>
    <el-dialog :show-close='false' :visible.sync="selectTargetDialogVisiable">
      <el-tabs type="border-card">
        <el-tab-pane v-for='group in groups' :key='group.name'>
          <span slot="label"><img :src='group.icon' class='group'></span>
          <div>
            <div v-for='subgroup in group.subgroupsWithItems'>
              <abbr v-for='(item) in subgroup.items' :title="$te(item.name + '.item-name') ? $t(item.name + '.item-name') : $t(item.name)">
                <a @click='doAdd(item.name)'>
                  <img class='icon icon-bordered' :src='item.icon'>
                </a>
              </abbr>
              <!-- <img v-for='items in group.items' :src='items.icon'> -->
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

  </div>
</template>
<script>
import ModuleSelector from './ModuleSelector'
import Helpers from './Helpers'
import languages from '../../public/translations/list'
import groups from '../../public/groups'
import subgroups from '../../public/subgroups'
import recipes from '../../public/recipes'
import items from '../../public/items'
import machines from '../../public/machines'
import beacons from '../../public/beacons'
import resources from '../../public/resources'
import allModules from '../../public/modules'
export default {
  components: {
    ModuleSelector
  },
  name: 'Index',
  data () {
    return {
      languages: languages,
      locale: 'zh-CN',
      msg: 'Welcome to Your Vue.js App',
      selectTargetDialogVisiable: false,
      requirements: [],
      remainders: [],
      groups: groups,
      subgroups: subgroups,
      recipes: recipes,
      items: items,
      machines: machines,
      beacons: beacons,
      resources: resources,
    }
  },
  methods: {
    tableRowClassName ({
      row,
      rowIndex
    }) {
      if (row.type === 'req') {
        return 'success-row'
      }
    },

    handleAdd () {
      this.selectTargetDialogVisiable = true
    },

    handleRemove (index, row) {
      this.requirements.splice(index, 1)
    },

    selectMachine (row, machine) {
      row.machine = machine
      let len = machine.module_slots ? machine.module_slots : 0
      row.modules.splice(len)
    },

    doAdd (name) {
      let config = this.buildRow(name, 'req', 0)
      this.requirements.push(config)
      this.selectTargetDialogVisiable = false
    },

    buildRow (name, type, indent, machine) {
      let row = {
        name: name,
        machine: machine || this.machines.find((machine) => { return machine.name === 'player' }),
        recipe: type === 'resource' ? this.resources[name] : this.recipes[name],
        icon: this.icon(name),
        modules: [],
        beacons: {},
        type: type,
        sub: [],
        canExpend: true,
        expended: false,
        indent: indent,
      }
      this.beacons.forEach((beacon) => {
        row.beacons[beacon.name] = {
          count: 0,
          modules: [],
        }
      })
      if (type !== 'resource') {
        row.sub = this.getUpstreamsRecursive(row)
      }

      return row
    },

    renderHeaderOperation (createElement, {
      column,
      $index
    }) {
      return createElement('el-button', {
        class: {
          operation: true
        },
        props: {
          type: 'success',
          size: 'mini',
        },
        domProps: {
          innerHTML: '+',
        },
        on: {
          click: this.handleAdd,
        },
      })
    },

    getUpstreamsRecursive (row, maxDepth) {
      let quantities = []
      if (typeof maxDepth === 'undefined') maxDepth = -1
      maxDepth = Math.ceil(maxDepth)
      if (maxDepth === 0) {
        return quantities
      }
      maxDepth--

      if (!row.recipe) {
        return quantities
      }

      let ingredients = row.recipe.ingredients
      Object.keys(ingredients).forEach((ingredient) => {
        let type = typeof this.resources[ingredient] !== 'undefined' ? 'resource' : ''
        let subrow = this.buildRow(ingredient, type, row.indent + 1)

        quantities.push(subrow)
      })

      return quantities
    },

    expends (row) {
      let arr = []
      row.sub.forEach((subrow) => {
        arr.push(subrow)
        if (subrow.expended) {
          arr.push(...this.expends(subrow))
        }
      })
      return arr
    },

    sortByOrder: Helpers.sortByOrder,
    icon: Helpers.icon,

  },
  mounted () {
    allModules.sort(Helpers.sortByOrder)
    allModules.unshift(null)
    this.machines.sort((a, b) => {
      // put player first
      if (a.name === 'player') {
        return -1
      } else if (b.name === 'player') {
        return 1
      }

      if (a.name > b.name) {
        return 1
      } else {
        return -1
      }
    })

    Object.keys(this.groups).forEach((groupName) => {
      let group = this.groups[groupName]
      group.subgroupsWithItems = []
      let itemCount = 0
      Object.keys(group.subgroups).forEach((subgroupName) => {
        if (this.subgroups[subgroupName]) {
          // foreach the subgroup
          let subgroupItems = []
          Object.keys(this.subgroups[subgroupName]).forEach((itemName) => {
            if (this.items[itemName] && this.recipes[itemName]) {
              let item = this.items[itemName]
              item.name = itemName
              subgroupItems.push(item)
              itemCount++
            }
            subgroupItems.sort(this.sortByOrder)
          })
          let subgroup = {
            order: group.subgroups[subgroupName],
            items: subgroupItems,
            name: subgroupName
          }
          group.subgroupsWithItems.push(subgroup)
        }
      })
      if (itemCount !== 0) {
        group.subgroupsWithItems.sort(this.sortByOrder)
      } else {
        delete this.groups[groupName]
      }
    })
  },
  computed: {
    tableData () {
      let data = []
      this.requirements.filter((row, index) => {
        data.push(row)
        if (row.expended) {
          data.push(...this.expends(row))
        }
      })
      return data.concat(this.remainders)
    }
  },
  watch: {
    locale () {
      this.$i18n.locale = this.locale
    },
    requirements: {
      handler: function () {
        this.requirements.forEach((row) => {
        })

        console.log('watching...')
      },
      deep: true
    }
  }
}
</script>

<style>
.machine-popper .el-input-number {
  margin: auto 10px
}
.icon {
  width: 32px;
  height: 32px;
  padding: 2px;
  margin: 1px;
}
.button {
  cursor: pointer;
}
.icon-bordered {
  display: initial;
  background-color: #ddd;
  border: 1px solid #ccc;
}
</style>
<style scoped>
.flex {
  display: flex;
  align-items: center;
}

a:hover {
  cursor: pointer;
}

img.group {
  padding: 10px 0
}

img {
  padding: auto 0;
}



div.cell {
  padding: 10px auto
}

>>> .el-dialog .el-input-number {
  margin: auto 10px
}

>>> .success-row {
  background-color: #f0f9eb;
}

>>> .el-button.operation {
  font-family: Courier, monospace;
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  margin: 0
}

>>> .el-dialog__header {
  display: none
}

>>> .el-tabs__item {
  height: 92px;
}
</style>
