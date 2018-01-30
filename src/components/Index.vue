<template>
  <div class='container-fluid' id='container' type='flex'>
    <el-row>
      <el-col :span=12>
        <h1>
        <span data-type='quantorio'>{{ $t('factorio-quantizative-tool') }}</span>
        </h1>
      </el-col>
      <el-col :span=6 :offset=6>
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
          <el-button v-if='scope.row.type === "req"' class='operation' type="danger" size='small' @click='handleRemove(scope.$index, scope.row)'>-</el-button>
        </template>
      </el-table-column>
      <el-table-column :label="$t('name')">
        <template slot-scope="scope">
          <div :style='{display: "flex"}'>
            <img class='icon' :src='scope.row.icon' />
            <span v-bind:style='{margin: "auto 0 auto 10px"}' v-t='scope.row.name'></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="amount" :label="$t('requirement-per-minute')">
        <template slot-scope="scope">
          <el-input-number v-if='scope.row.type === "req"' v-model="scope.row.needs" :min=0 controls-position="right" size='small'></el-input-number>
        </template>
      </el-table-column>
      <el-table-column prop="made_in" :label="$t('made-in')">
        <template slot-scope="scope">
          <img class='icon' :src='items[scope.row.machine].icon' @click='handleModule(scope.$index, scope.row)'>
<!--           <el-select v-if='scope.row.type === "req"' v-model="scope.row.machine" placeholder="请选择" filterable default-first-option>
            <el-option v-for="machine in machines" :key="machine.name" :label="$t(machine.name)" :value="machine.name">
              <div :style='{display: "flex"}'>
                <img class='icon' :style='{margin: "auto 4px"}' :src='items[machine.name].icon'><span :style='{margin: "auto 4px"}'>{{ $t(machine.name) }}</span>
              </div>
            </el-option>
          </el-select> -->
        </template>
      </el-table-column>
      <el-table-column :label="$t('module')">
        <template slot-scope="scope">
          <img @click='handleModule(scope.$index, scope.row)' class='icon' src='core/slot-icon-module.png'>
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
                  <img class='icon' :src='item.icon'>
                </a>
              </abbr>
              <!-- <img v-for='items in group.items' :src='items.icon'> -->
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog :show-close='false' :visible.sync="selectModuleDialogVisiable">
      <div v-if='moduleDialogMachine'>
        <div>
          <el-popover
            ref="modulePopover"
            placement="bottom"
            trigger="hover">
            <div>
              <img v-for='machine in machines' class='icon' :src='items[machine.name].icon' @click='selectMachine(machine)'>
            </div>
            <img class='icon' slot='reference' :src='items[moduleDialogMachine.name].icon'>
          </el-popover>
          <span v-for="n in moduleDialogMachine.module_slots">
            <el-popover
              ref="modulePopover"
              placement="bottom"
              trigger="hover">
              <div>
                <img v-for='module in modules' :src='items[module.name].icon' @click='selectModule("machine", module)'>
              </div>
              <img slot='reference' class='icon' src='core/slot-icon-module.png'>
            </el-popover>
          </span>
          <!-- <span v-if='moduleDialogMachine.module_slots' v-for="n in moduleDialogMachine.module_slots"><img v-popover:modulePopover class='icon' src='core/slot-icon-module.png'></span> -->
        </div>
        <div>
          <span v-for="beacon in beacons" class='flex'>
            <img class='icon' :src='items[beacon.name].icon'>
            <span v-for="n in beacon.module_slots" >
              <el-popover
                ref="modulePopover"
                placement="bottom"
                trigger="hover">
                <div>
                  <img v-for='module in modules' :src='items[module.name].icon' @click='selectModule("beacon", module, beacon)'>
                </div>
                <img slot='reference' class='icon' src='core/slot-icon-module.png'>
              </el-popover>
            </span>
            <el-input-number :min=0 controls-position="right" v-model='moduleDialogBeacons[beacon.name]' size='small'></el-input-number>
          </span>
        </div>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import languages from '../../public/translations/list'
import groups from '../../public/groups'
import subgroups from '../../public/subgroups'
import recipes from '../../public/recipes'
import items from '../../public/items'
import machines from '../../public/machines'
import modules from '../../public/modules'
import beacons from '../../public/beacons'
export default {
  components: {},
  name: 'Index',
  data () {
    return {
      languages: languages,
      locale: 'zh-CN',
      msg: 'Welcome to Your Vue.js App',
      selectTargetDialogVisiable: false,
      selectModuleDialogVisiable: false,
      moduleDialogRowIndex: 0,
      moduleDialogMachine: null,
      moduleDialogBeacons: {},
      requirements: [],
      remainders: [
        // {
        //   name: 'xxx'
        // }
      ],
      groups: groups,
      subgroups: subgroups,
      recipes: recipes,
      items: items,
      machines: machines,
      modules: modules,
      beacons: beacons,
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
      console.log('add...')
    },
    handleRemove (index, row) {
      this.requirements.splice(index, 1)
    },
    handleModule (index, row) {
      this.moduleDialogRowIndex = index
      this.moduleDialogMachine = this.machines.find((machine) => {
        return machine.name === row.machine
      })
      this.moduleDialogBeacons = {}
      this.selectModuleDialogVisiable = true
    },
    selectModule (type, beaconName) {
    },
    selectMachine (machine) {
      this.moduleDialogMachine = machine
      if (this.tableData[this.moduleDialogRowIndex].type === 'req') {
        this.requirements[this.moduleDialogRowIndex].machine = machine.name
      }
    },
    doAdd (name) {
      this.requirements.push({
        name: name,
        machine: 'player',
        recipe: this.recipes[name],
        icon: this.items[name].icon,
      })
      console.log(name)
      this.selectTargetDialogVisiable = false
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
    sortByOrder (a, b) {
      if (a.order > b.order) {
        return 1
      } else if (a.order < b.order) {
        return -1
      } else {
        let aName = parseInt(a.name.replace(/^.*-/, ''))
        let bName = parseInt(b.name.replace(/^.*-/, ''))

        if (aName > bName) {
          return 1
        } else if (aName < bName) {
          return -1
        }
      }
      return 0
    }
  },
  mounted () {
    this.modules.sort(this.sortByOrder)
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
      return this.requirements.map((r) => {
        r.type = 'req'
        return r
      }).concat(this.remainders)
    }
  },
  watch: {
    locale () {
      this.$i18n.locale = this.locale
    }
  }
}
</script>
<style scoped>
.flex {
  display: flex
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

.icon {
  width: 32px;
  height: 32px;
  padding: 2px;
  margin: 1px;
}

div.cell {
  padding: 10px auto
}

.el-dialog .icon, .el-popover .icon {
  display: initial;
  background-color: #ddd;
  border: 1px solid #ccc;
}

>>> .el-dialog .el-input-number {
  margin: auto 10px
}

>>> .success-row {
  background-color: #f0f9eb;
}

>>> .el-button.operation {
  padding: 9px 14px;
  font-family: Courier, monospace;
  font-weight: 900
}

>>> .el-dialog__header {
  display: none
}

>>> .el-tabs__item {
  height: 92px;
}
</style>
