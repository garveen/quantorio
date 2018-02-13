import items from '../data/items'

export default {
  icon (item, defaults) {
    let ret
    if (typeof item === 'string' && items[item]) {
      ret = items[item].icon
    } else if (item && item.name && items[item.name]) {
      ret = items[item.name].icon
    } else if (item && item.icon) {
      ret = item.icon
    }
    if (ret) {
      return '/public/' + ret
    }
    switch (defaults) {
      case 'module':
        return 'core/slot-icon-module.png'
    }
    console.log(item)
  },
  sortByOrder (a, b) {
    if (!a) {
      return -1
    } else if (!b) {
      return 1
    }
    let aOrders = a.order.split('-')
    let bOrders = b.order.split('-')
    for (let i = 0; i < Math.max(aOrders.length, bOrders.length); i++) {
      if (aOrders[i] === undefined) {
        return -1
      }
      if (bOrders[i] === undefined) {
        return 1
      }
      if (aOrders[i] !== bOrders[i]) {
        return aOrders[i] > bOrders[i] ? 1 : -1
      }
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
    names.some(name => {
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
