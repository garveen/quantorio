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
    let aOrders = a.order.split('-')
    let bOrders = b.order.split('-')
    let result = 0
    aOrders.forEach((aa, index) => {
      if (bOrders[index] === undefined) {
        result = 1
      }
      if (aOrders[index] !== bOrders[index]) {
        result = aOrders[index] > bOrders[index] ? 1 : -1
      }
    })
    if (result) return result
    if (bOrders.length > aOrders.length) {
      return -1
    }
    let aName = parseInt(a.name.replace(/^.*-/, ''))
    let bName = parseInt(b.name.replace(/^.*-/, ''))

    if (aName > bName) {
      return 1
    } else if (aName < bName) {
      return -1
    }
    return 0
  },
  translate (i18n, ...names) {
    let translation = false
    let first = false
    names.some((name) => {
      if (name && typeof name !== 'string') {
        name = name.name
      }
      if (!first) first = name
      if (i18n.te(name + '.item-name')) {
        translation = i18n.t(name + '.item-name')
        return true
      }
      if (i18n.te(name)) {
        translation = i18n.t(name)
        return true
      }
    })
    if (translation) {
      return translation
    } else {
      return i18n.t(first, 'en')
    }
  }
}
