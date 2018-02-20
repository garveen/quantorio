import Store from '../store'

class Recipe {
  constructor (recipe) {
    Object.assign(this, recipe)
  }

  getProp (prop) {
    let dif
    if (this[Store.state.difficulty]) {
      dif = this[Store.state.difficulty]
    } else {
      dif = this.normal
    }
    return dif[prop]
  }

  get results () { return this.getProp('results') }
  // eslint-disable-next-line camelcase
  get energy_required () { return this.getProp('energy_required') }
  // eslint-disable-next-line camelcase
  get ingredients () { return this.getProp('ingredients') }
  // eslint-disable-next-line camelcase
  get ingredient_count () { return this.getProp('ingredient_count') }
}

export default Recipe
