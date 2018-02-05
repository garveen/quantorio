<template>
  <div class='container-fluid' id='container' type='flex'>
    <el-row type='flex' justify='space-between'>

      <el-col :span='12'>
        <h1>
        <span data-type='quantorio'>{{ translate('factorio-quantizative-tool') }}</span>
        </h1>
      </el-col>
      <el-col :span='8' :style='{"text-align": "end"}'>
        <el-button type='primary' plain @click="window.location.href = 'https://github.com/acabin/quantorio'">View on GitHub</el-button>
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
      <el-table-column :label="translate('name')">
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
      <el-table-column prop="needs" :label="translate('requirement-per-minute')">
        <template slot-scope="scope">
          <el-input-number v-if='scope.row.type === "req"' v-model="scope.row.needs" :min=0 controls-position="right" size='small'></el-input-number>
          <span v-else>{{ scope.row.needs }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="made_in" :render-header='renderHeaderMachine'>
        <template slot-scope="scope">
          <el-popover placement="bottom" trigger='click' popper-class='machine-popper'>
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
        </template>
      </el-table-column>
      <el-table-column prop="" :label="translate('machine-number')">
        <template slot-scope="scope">
          {{ (scope.row.needs / calcResultPerMachinePerMinute(scope.row)).toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column prop="" :render-header='renderHeaderInserter'>
        <template slot-scope="scope">
          <span class='flex around'>
            <span v-for='inserter in inserters'>
              {{ (calcResultPerMachinePerMinute(scope.row) / inserter.turns_per_minute).toFixed(2) }}
            </span>
          </span>
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
import ModuleSelector from './ModuleSelector'
import Helpers from './Helpers'
import RequirementSelector from './RequirementSelector'
import languages from '../../public/translations/list'
import groups from '../../public/groups'
import subgroups from '../../public/subgroups'
import recipes from '../../public/recipes'
import items from '../../public/items'
import machines from '../../public/machines'
import beacons from '../../public/beacons'
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
      recipeConfigs: {},
      originRemainders: {},
      groups: groups,
      subgroups: subgroups,
      recipes: recipes,
      items: items,
      machines: machines,
      beacons: beacons,
      resources: resources,
      categories: categories,
      inserters: inserters,
      requirementsUnWatcher: null,
      requirementsWatcherCallback: null,
      remaindersUnWatcher: null,
      remaindersWatcherCallback: null,
      window: window,
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
      let config = this.buildRow(name, 'req', 0, false)
      config.needs = 1
      this.requirements.push(config)
      this.selectTargetDialogVisiable = false
    },

    buildRow (name, type, indent, isResource, machine) {
      let row = {
        name: name,
        machine: machine,
        recipe: isResource ? this.resources[name] : this.recipes[name],
        icon: this.icon(name),
        needs: 0,
        modules: [],
        beacons: [],
        type: type,
        sub: [],
        canExpend: true,
        expended: false,
        isResource: isResource,
        indent: indent,
        bonus: {},
        batchTime: 0.5,
      }
      if (!machine) {
        if (!row.recipe) {
          row.recipe = this.recipes.dummy
        }
        row.machine = this.machines.find((machine) => { return machine.name === this.categories[row.recipe.category][0] })
      }

      this.beacons.forEach((beacon) => {
        row.beacons.push({
          count: 0,
          modules: [],
          beacon: beacon
        })
      })

      if (this.recipeConfigs[name]) {
        this.recipeConfigs[name].forEach((config) => {
          row[config.k] = config.v
        })
      }

      return row
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

    getUpstreamsRecursive (row, maxDepth) {
      let subrows = row.sub

      row.bonus = {
        productivity: 0,
        speed: 0,
        consumption: 0,
        pollution: 0,
      }

      Object.keys(row.bonus).forEach((name) => {
        let moduleFilter = (module) => {
          if (module && module.effect[name]) {
            row.bonus[name] += module.effect[name].bonus
          }
        }

        row.modules.forEach(moduleFilter)

        row.beacons.forEach((beaconConfig) => {
          beaconConfig.modules.forEach((module) => {
            if (module && module.effect[name]) {
              row.bonus[name] += module.effect[name].bonus * beaconConfig.count * beaconConfig.beacon.distribution_effectivity
            }
          })
        })
      })

      if (typeof maxDepth === 'undefined') maxDepth = -1
      maxDepth = Math.ceil(maxDepth)
      if (maxDepth === 0) {
        return subrows
      }
      maxDepth--

      if (row.isResource) {
        return subrows
      }

      let recipe = row.recipe

      let ingredients = recipe.ingredients
      Object.keys(ingredients).forEach((ingredient) => {
        let value = ingredients[ingredient]
        let subrow = row.sub.find((subrow) => {
          return subrow.name === ingredient
        })
        if (!subrow) {
          subrow = this.buildRow(ingredient, 'sub', row.indent + 1, ingredient in this.resources)
          subrows.push(subrow)
        }
        subrow.needs = row.needs / recipe.result_count * value / (1 + row.bonus.productivity)

        if (typeof this.resources[ingredient] === 'undefined') {
          subrow.sub = this.getUpstreamsRecursive(subrow)
        }
      })

      return subrows
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

    calcResultPerMachinePerMinute (row) {
      let recipe = row.recipe
      let machine = row.machine
      let count
      if (row.isResource) {
        count = 60 / (recipe.mining_time / machine.mining_speed / (machine.mining_power - recipe.hardness))
      } else {
        count = 60 / (recipe.energy_required / machine.crafting_speed) * recipe.result_count
      }

      if (row.bonus.productivity) count *= (1 + row.bonus.productivity)
      if (row.bonus.speed) count *= (1 + row.bonus.speed)
      return count
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

    this.inserters.sort((a, b) => {
      return Helpers.sortByOrder(this.items[a.name], this.items[b.name])
    })

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
    this.remaindersWatcherCallback = (opt) => {
      this.remaindersUnWatcher()
      this.remaindersUnWatcher = null

      let remainders

      remainders = Object.values(this.originRemainders)

      remainders.forEach((row) => {
        row.sub = this.getUpstreamsRecursive(row)
      })
      this.remainders = remainders

      if (!this.remaindersUnWatcher) {
        this.remaindersUnWatcher = this.$watch('remainders', this.remaindersWatcherCallback, {deep: true})
      }
    }
    this.remaindersUnWatcher = this.$watch('remainders', this.remaindersWatcherCallback, {deep: true})

    this.requirementsWatcherCallback = () => {
      this.requirementsUnWatcher()
      this.requirementsUnWatcher = null
      this.requirements.forEach((row) => {
        row.sub = this.getUpstreamsRecursive(row)
      })

      let res
      let originRemainders = {}
      this.remainders = []
      res = (row, expended) => {
        if (!row.expended) {
          expended = false
        }

        row.sub.filter((subrow) => {
          if (!expended) {
            if (!originRemainders[subrow.name]) {
              originRemainders[subrow.name] = this.buildRow(subrow.name, 'remainder', 0, subrow.isResource)
            }
            originRemainders[subrow.name].needs += subrow.needs
          }
          res(subrow, expended)
        })
      }
      this.requirements.forEach((row) => {
        res(row, row.expended)
      })

      this.originRemainders = originRemainders

      this.remaindersWatcherCallback('plain')
      if (!this.requirementsUnWatcher) {
        this.requirementsUnWatcher = this.$watch('requirements', this.requirementsWatcherCallback, {deep: true})
      }
    }
    this.requirementsUnWatcher = this.$watch('requirements', this.requirementsWatcherCallback, {deep: true})
  },

  computed: {
    tableData () {
      let data = []
      this.requirements.forEach((row) => {
        data.push(row)
        if (row.expended) {
          data.push(...this.expends(row))
        }
      })
      let remainderData = []
      this.remainders.forEach((row) => {
        remainderData.push(row)
        if (row.expended) {
          remainderData.push(...this.expends(row))
        }
      })
      remainderData.forEach((row) => {
        this.recipeConfigs[row.name] = [
          { k: 'machine', v: row.machine },
          { k: 'beacons', v: row.beacons },
          { k: 'modules', v: row.modules },
        ]
      })
      return data.concat(remainderData)
    },
  },
  watch: {
    locale () {
      this.$i18n.locale = this.locale
    },
    // requirements watcher is at mounted()
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
