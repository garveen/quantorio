import resources from '../../public/resources'
import recipes from '../../public/recipes'
import machines from '../../public/machines'
import categories from '../../public/categories'
import beacons from '../../public/beacons'
import Helpers from './Helpers'

let rowIdIncrement = 1
let recipeConfigs = {}

class Row {
  constructor (name, type, indent, isResource, machine) {
    this.id = rowIdIncrement++
    this.name = name
    this.machine = machine
    this.recipe = isResource ? resources[name] : recipes[name]
    this.icon = Helpers.icon(name)
    this.needs = 0
    this.modules = []
    this.beacons = []
    this.type = type
    this._sub = null
    this.canExpend = true
    this.expended = false
    this.isResource = isResource
    this.indent = indent
    this.bonus = {}
    this.batchTime = 0.5
    this.sources = []
    this.isData = true

    if (!machine) {
      if (!this.recipe) {
        this.recipe = recipes.dummy
      }
      this.machine = machines.find(machine => machine.name === categories[this.recipe.category][0])
    }

    beacons.forEach(beacon => {
      this.beacons.push({
        count: 0,
        modules: [],
        beacon: beacon
      })
    })

    if (recipeConfigs[name]) {
      recipeConfigs[name].forEach(config => {
        this[config.k] = config.v
      })
    }
  }

  get sub () {
    if (this._sub === null) {
      this.update()
    }
    return this._sub
  }

  machineCount () {
    return this.needs / this.calcResultPerMachinePerMinute()
  }

  inserterCount (inserter) {
    return this.calcResultPerMachinePerMinute() / inserter.turns_per_minute
  }

  calcResultPerMachinePerMinute () {
    let recipe = this.recipe
    let machine = this.machine
    let count
    if (this.isResource) {
      count = 60 / (recipe.mining_time / machine.mining_speed / (machine.mining_power - recipe.hardness))
    } else {
      count = 60 / (recipe.energy_required / machine.crafting_speed) * recipe.result_count
    }

    if (this.bonus.productivity) count *= (1 + this.bonus.productivity)
    if (this.bonus.speed) count *= (1 + this.bonus.speed)
    return count
  }

  update () {
    if (this._sub === null) {
      this._sub = []
    }

    this.bonus = {
      productivity: 0,
      speed: 0,
      consumption: 0,
      pollution: 0,
    }

    Object.keys(this.bonus).forEach(name => {
      let moduleFilter = module => {
        if (module && module.effect[name]) {
          this.bonus[name] += module.effect[name].bonus
        }
      }

      this.modules.forEach(moduleFilter)

      this.beacons.forEach(beaconConfig => {
        beaconConfig.modules.forEach(module => {
          if (module && module.effect[name]) {
            this.bonus[name] += module.effect[name].bonus * beaconConfig.count * beaconConfig.beacon.distribution_effectivity
          }
        })
      })
    })

    if (this.isResource) {
      return
    }

    let recipe = this.recipe

    let ingredients = recipe.ingredients
    Object.keys(ingredients).forEach(ingredient => {
      let value = ingredients[ingredient]
      let subrow = this._sub.find(subrow => {
        return subrow.name === ingredient
      })
      if (!subrow) {
        subrow = new Row(ingredient, 'sub', this.indent + 1, ingredient in resources)
        this._sub.push(subrow)
      }
      subrow.needs = this.needs / recipe.result_count * value / (1 + this.bonus.productivity)

      if (typeof resources[ingredient] === 'undefined') {
        subrow.update()
      }
    })
  }

  saveRecipeConfig () {
    recipeConfigs[this.name] = [
      { k: 'machine', v: this.machine },
      { k: 'beacons', v: this.beacons },
      { k: 'modules', v: this.modules },
    ]
  }
}

export default Row
