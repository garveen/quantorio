<template>
  <div class='container-fluid' id='container' type='flex'>
    <vue-headful :title='translate("factorio-quantizative-tool")'></vue-headful>
    <el-row type='flex' justify='space-between'>

      <el-col :span='12'>
        <h1>
        <span data-type='quantorio'>{{ translate('factorio-quantizative-tool') }}</span>
        </h1>
      </el-col>
      <el-col :span='8' :style='{"text-align": "end"}'>
        <el-button type='primary' plain @click="window.location.href = 'https://github.com/garveen/quantorio'">View on GitHub</el-button>
        <el-select v-model='locale' filterable default-first-option>
          <el-option v-for="item in languages" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table :data='tableData' :row-class-name="tableRowClassName">
      <el-table-column width='64' :render-header='renderHeaderOperation'>
        <template slot-scope="scope">
          <template v-if='scope.row.isData'>
            <div :style='{display: "flex", "flex-direction": "column"}'>
              <el-button v-if='scope.row.type === "req"' class='operation' type="danger" size='small' @click='handleRemove(scope.$index, scope.row)'>-</el-button>
              <el-button v-if='scope.row.expended' class='operation' type="warning" size='small' @click='scope.row.expended = false'>&lt;</el-button>
              <el-button v-else-if='scope.row.canExpend' class='operation' type="primary" size='small' @click='scope.row.expended = true'>&gt;</el-button>
            </div>
          </template>
        </template>
      </el-table-column>
      <el-table-column :label="translate('name')">
        <template slot-scope="scope">
          <template v-if='scope.row.isData'>
            <el-row>
              <el-col :offset='scope.row.indent'>
                <div :style='{display: "flex"}'>
                  <img class='icon' :src='scope.row.icon' />
                  <span v-bind:style='{margin: "auto 0 auto 10px"}' v-t='scope.row.name'></span>
                </div>
              </el-col>
            </el-row>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="needs" :label="translate('requirement-per-minute')">
        <template slot-scope="scope">
          <template v-if='scope.row.isData'>
            <el-input-number v-if='scope.row.type === "req"' v-model="scope.row.needs" :min=0 controls-position="right" size='small'></el-input-number>
            <span v-else>{{ scope.row.needs }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="made_in" :render-header='renderHeaderMachine'>
        <template slot-scope="scope">
          <el-popover v-if='scope.row.isData' placement="bottom" trigger='click' popper-class='machine-popper'>
            <div slot='reference'  class='flex button'>
              <img :src='icon(scope.row.machine)' class='button icon'>
              <img v-for='module in scope.row.modules' v-if='module' class='icon' :src='icon(module)'>
              <span v-t='scope.row.machine.name' :style='{"margin-right": "8px"}'></span>
              <span v-for='beaconConfig in scope.row.beacons' v-if='beaconConfig.count !== 0' class='flex'>
                <span>, {{ beaconConfig.count }} X</span>
                <img class='icon' :src='icon(beaconConfig.beacon)'>
                <img v-for='module in beaconConfig.modules' v-if='module' class='icon' :src='icon(module)'>
              </span>
            </div>
            <div>
              <span class='flex'>
                <el-popover
                  ref="machinePopover"
                  placement="bottom"
                  trigger="hover">
                  <div>
                    <template v-for='machine in machines' v-if='categories[scope.row.recipe.category].includes(machine.name)'>
                      <img :src='items[machine.name].icon' @click='selectMachine(scope.row, machine)' class='button icon icon-bordered'>
                    </template>
                  </div>
                  <span slot='reference'>
                    <img class='icon button' :src='items[scope.row.machine.name].icon'>
                  </span>
                </el-popover>
                <ModuleSelector ref="modulePopover" v-for="index in scope.row.machine.module_slots" :key='index' :allows='scope.row.machine.allowed_effects' :module.sync='scope.row.modules[index - 1]'></ModuleSelector>
              </span>
            </div>
            <div>
              <span v-for="beaconConfig in scope.row.beacons" class='flex'>
                <img class='icon' :src='icon(beaconConfig.beacon)'>
                <ModuleSelector ref="modulePopover" v-for="index in beaconConfig.beacon.module_slots" :key='index' :allows='beaconConfig.beacon.allowed_effects' :module.sync='beaconConfig.modules[index - 1]'></ModuleSelector>
                <el-input-number :min=0 controls-position="right" v-model='beaconConfig.count' size='small'></el-input-number>
              </span>
            </div>
          </el-popover>
          <span v-if='scope.row.type === "sums"'>
            {{ scope.row.consumption }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="" :label="translate('machine-number')">
        <template slot-scope="scope">
          <template v-if='scope.row.isData'>
            {{ scope.row.machineCount().toFixed(2) }}
          </template>
          <template v-if='scope.row.type === "sums"'>
            <span v-for='machine in scope.row.machines' :style='{margin: "0 5px"}'>
              <img :src='icon(machine)'>{{ machine.count }}
            </span>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="" :render-header='renderHeaderInserter'>
        <template slot-scope="scope">
          <template v-if='scope.row.isData'>
            <span class='flex around'>
              <span v-for='inserter in inserters'>
                {{ scope.row.inserterCount(inserter).toFixed(2) }}
              </span>
            </span>
          </template>
        </template>
      </el-table-column>
      <!-- <el-table-column
          prop="power"
          :label="translate('electric-consumption')">
        </el-table-column>
        <el-table-column
          prop="pollution"
          :label="translate('pollution')">
        </el-table-column> -->
    </el-table>
    <RequirementSelector :visible.sync="selectTargetDialogVisiable" @select='doAdd' :key='locale'></RequirementSelector>


  </div>
</template>
<script>
import throttle from 'lodash/throttle'
import ModuleSelector from './ModuleSelector'
import Helpers from './Helpers'
import Row from './Row'
import RequirementSelector from './RequirementSelector'
import languages from '../../public/translations/list'
import groups from '../../public/groups'
import subgroups from '../../public/subgroups'
import recipes from '../../public/recipes'
import items from '../../public/items'
import machines from '../../public/machines'
import resources from '../../public/resources'
import categories from '../../public/categories'
import inserters from '../../public/inserters'
import allModules from '../../public/modules'
export default {
  components: {
    ModuleSelector,
    RequirementSelector,
  },
  name: 'Index',
  data () {
    return {
      resetMachine: 'player',
      languages: languages,
      locale: 'zh-CN',
      selectTargetDialogVisiable: false,
      requirements: [],
      remainders: [],
      remainderSources: {},
      groups: groups,
      subgroups: subgroups,
      recipes: recipes,
      items: items,
      machines: machines,
      resources: resources,
      categories: categories,
      inserters: inserters,
      requirementsUnWatcher: null,
      requirementsWatcherCallback: null,
      remaindersUnWatcher: null,
      remaindersWatcherCallback: null,
      window: window,
      rowIdIncrement: 1,
    }
  },
  methods: {
    tableRowClassName ({
      row,
      rowIndex
    }) {
      if (row.type === 'req') {
        return 'success-row'
      } else if (row.type === 'remainder') {
        return 'warning-row'
      } else if (row.type === 'split' && this.requirements.length) {
        return 'blue-row'
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
      let row = new Row(name, 'req', 0, false)
      row.needs = 1
      this.requirements.push(row)
      this.selectTargetDialogVisiable = false
    },

    renderHeaderOperation (h, {
      column,
      $index
    }) {
      return <el-button class="operation" type="success" size="mini" on-click={this.handleAdd}>+</el-button>
      /* / */
    },

    renderHeaderInserter (h, {
      column,
      $index
    }) {
      let items = this.inserters.map((inserter, index) => {
        return <img class="icon" src={this.icon(inserter)} />
      })
      let row = <span class='flex around'>{items}</span>
      /* / */
      return row
    },

    renderHeaderMachine (h, {
      column,
      $index
    }) {
      let items = this.machines.map((machine, index) => {
        return <el-option label={this.translate(machine)} value={machine.name}></el-option>
        /* / */
      })
      let row = <el-select value='' placeholder={this.translate('made-in')} on-input={this.changeAllMachine}>{items}</el-select>
      /* / */
      return row
    },

    changeAllMachine (machineName) {
      let machine = this.machines.find((machine) => {
        return machine.name === machineName
      })

      let changeMachine
      changeMachine = (row) => {
        if (categories[row.recipe.category].includes(machineName)) {
          row.machine = machine
        }
        row.sub.forEach((subrow) => {
          changeMachine(subrow)
        })
      }

      this.requirements.forEach(changeMachine)
      this.remainders.forEach(changeMachine)
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

    translate (...names) {
      return Helpers.translate(this.$i18n, ...names)
    },

    sortByOrder: Helpers.sortByOrder,
    icon: Helpers.icon,

  },
  created () {
    let translateFallback = 'en'
    let currentLanguage
    let testLanguage = navigator.language || navigator.userLanguage
    if (this.languages.indexOf(testLanguage) < 0) {
      currentLanguage = translateFallback
    } else {
      currentLanguage = testLanguage
    }
    this.language = currentLanguage

    allModules.sort(Helpers.sortByOrder)
    allModules.unshift(null)

    this.inserters.sort((a, b) => Helpers.sortByOrder(this.items[a.name], this.items[b.name]))

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

    this.recipes.dummy = {
      'name': 'dummy',
      'result_count': 1,
      'category': 'crafting',
      'energy_required': 0.5,
      'ingredients': {
      },
      'ingredient_count': 0
    }

    Object.keys(this.groups).forEach((groupName) => {
      let group = this.groups[groupName]
      if (!group.subgroups) {
        delete this.groups[groupName]
        return
      }
      group.subgroupsWithItems = []
      let itemCount = 0
      Object.keys(group.subgroups).forEach((subgroupName) => {
        if (this.subgroups[subgroupName]) {
          // foreach the subgroup
          let subgroupItems = []
          Object.keys(this.subgroups[subgroupName]).forEach((itemName) => {
            if (this.items[itemName] && this.recipes[itemName]) {
              let item = {}
              Object.keys(this.items[itemName]).forEach((k) => {
                item[k] = items[itemName][k]
              })
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

  mounted () {
  },

  computed: {
    tableData () {
      return this.shownData.concat(this.summaryData)
    },

    shownData () {
      let data = this.expends({sub: this.requirements})
      data.push({
        type: 'split',
      })

      let remainderData = this.expends({sub: this.remainders})

      let removing = []

      remainderData.forEach((row, index) => {
        row.saveRecipeConfig()
        if (Math.abs(row.needs) < 0.0001) {
          removing.push(index)
        }
      })

      removing.sort((a, b) => { return b - a }).forEach((index) => {
        remainderData.splice(index, 1)
      })
      return data.concat(remainderData)
    },

    summaryData () {
      let sums = {}
      let consumption = 0
      let machines = []
      this.shownData.forEach((row) => {
        if (!row.isData) return
        let machine = machines.find((machine) => {
          return machine.name === row.machine.name
        })
        if (!machine) {
          machine = {
            name: row.machine.name,
            count: 0,
          }
          machines.push(machine)
        }
        machine.count += parseInt(Math.ceil(row.machineCount()))
        if (row.machine.energy_source.type === 'electric') {
          consumption += row.machine.energy_usage * (1 + row.bonus.consumption) * row.machineCount()
        }
      })

      sums.type = 'sums'
      sums.consumption = '' + consumption + 'W'
      sums.machines = machines
      return [sums]
    },
  },

  watch: {
    locale () {
      this.$i18n.locale = this.locale
    },

    requirements: {
      handler: throttle(function () {
        this.requirements.forEach(row => row.update())
        this.remainders = []
      }, 50, {
        trailing: false,
      }),
      deep: true,
    },

    remainders: {
      handler: throttle(function () {
        let res
        let remainders = this.remainders
        remainders.forEach(row => { row.sources = [] })

        res = (row) => {
          row.sub.forEach((subrow) => {
            if (!row.expended) {
              let remainder = remainders.find((remainder) => { return remainder.name === subrow.name })
              if (!remainder) {
                remainder = new Row(subrow.name, 'remainder', 0, subrow.isResource)
                remainders.push(remainder)
              }
              if (!remainder.sources.find(source => source.id === subrow.id)) {
                remainder.sources.push(subrow)
              }
            } else {
              res(subrow)
            }
          })
        }

        this.requirements.forEach(res)

        remainders.forEach((row) => {
          row.needs = row.sources.reduce((acc, cur) => acc + cur.needs, 0)
          row.update()
        })

        remainders.forEach(res)

        remainders.forEach((row) => {
          row.needs = row.sources.reduce((acc, cur) => acc + cur.needs, 0)
          row.update()
        })
      }, 50, {
        trailing: false,
      }),
      deep: true,
    },
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

a:hover {
  cursor: pointer;
}

</style>
<style scoped>
>>>.flex {
  display: flex;
  align-items: center;
}

>>>.flex.around {
  justify-content: space-around;
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

>>> .success-row {
  background-color: #f0f9eb;
}
>>> .warning-row {
  background-color: oldlace;
}

>>> .blue-row {
  background-color: #ecf5ff;
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

</style>
