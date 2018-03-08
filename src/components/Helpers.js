import i18n from '../i18n'
import Data from './data'
import store from '../store'

let state = store.state

export default {
  icon (item, defaults) {
    let ret
    if (typeof item === 'string' && state.meta.items[item]) {
      ret = state.meta.items[item].icon
    } else if (item && item.icon) {
      ret = item.icon
    } else if (item) {
      if (item.name && state.meta.items[item.name]) {
        ret = state.meta.items[item.name].icon
      }
      if (!ret && item.showName && state.meta.items[item.showName]) {
        ret = state.meta.items[item.showName].icon
      }
    }

    if (ret && Data.files[ret]) {
      ret.replace(/.*\./, '')
      return 'data:image/' + ret.replace(/.*\./, '') + ';base64,' + Data.files[ret]
    }

    switch (defaults) {
      case 'module':
        return 'data:image/png;base64,' + Data.files['slot-icon-module.png']
    }
    console.log(item, ret, defaults)
  },

  translate (entity, falling) {
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
        return this.translate(entity, true)
      }
      return entity
    }

    if (i18n.te(entity.name, locale)) {
      return i18n.t(entity.name, locale)
    } else if (i18n.te(entity.showName, locale)) {
      return i18n.t(entity.showName, locale)
    }

    if (!falling) {
      return this.translate(entity, true)
    }
    return name
  },

  isValid (obj) {
    return obj && obj.name && obj.name !== 'dummy'
  }
}
