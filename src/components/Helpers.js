import items from '../../public/items'

export default {
  icon (item, defaults) {
    if (typeof item === 'string' && items[item]) {
      return items[item].icon
    }
    if (item && item.name && items[item.name]) {
      return items[item.name].icon
    }
    switch (defaults) {
      case 'module':
        return 'core/slot-icon-module.png'
    }
  },
  sortByOrder (a, b) {
    if (!a) {
      return -1
    } else if (!b) {
      return 1
    }
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
  },
}
