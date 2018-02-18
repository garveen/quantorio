export default {
  icon (item, defaults) {
    let ret
    if (typeof item === 'string' && window.meta.items[item]) {
      ret = window.meta.items[item].icon
    } else if (item && item.icon) {
      ret = item.icon
    } else if (item) {
      if (item.name && window.meta.items[item.name]) {
        ret = window.meta.items[item.name].icon
      }
      if (!ret && item.showName && window.meta.items[item.showName]) {
        ret = window.meta.items[item.showName].icon
      }
    }

    if (ret && window.files[ret]) {
      ret.replace(/.*\./, '')
      return 'data:image/' + ret.replace(/.*\./, '') + ';base64,' + window.files[ret]
    }

    switch (defaults) {
      case 'module':
        return 'data:image/png;base64,' + window.files['slot-icon-module.png']
    }
    console.log(item, ret, defaults)
  },

  sortByOrder (a, b) {
    if (!a) {
      return -1
    } else if (!b) {
      return 1
    }
    let aName = a.showName || a.name
    let bName = b.showName || b.name
    let aOrders, bOrders
    aOrders = window.meta.items[aName].order.split('-')
    bOrders = window.meta.items[bName].order.split('-')
    try {
    } catch (error) {
    }
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
    aName = parseInt(aName.replace(/^.*-/, ''))
    bName = parseInt(bName.replace(/^.*-/, ''))

    if (aName > bName) {
      return 1
    } else if (aName < bName) {
      return -1
    }
    return 0
  },

  translate (vue, entity, falling) {
    let i18n = vue.$i18n
    if (!i18n) {
      console.trace()
    }
    let locale = falling ? i18n.fallbackLocale : i18n.locale
    if (!entity) return false
    if (typeof entity === 'string') {
      if (i18n.te(entity, locale)) {
        return i18n.t(entity, locale)
      }
      if (!falling) {
        return this.translate(vue, entity, true)
      }
      return entity
    }

    let name = entity.showName || entity.name

    if (i18n.te(name, locale)) {
      return i18n.t(name, locale)
    }
    if (!falling) {
      return this.translate(vue, entity, true)
    }
    return name
  }
}
