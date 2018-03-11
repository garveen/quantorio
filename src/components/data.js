import Recipe from './Recipe'
import store from '../store'
import i18n from '../i18n'
import quantorioBridge from './bridge'

let luaState
let _items

let loaded = {}

window.quantorioBridge = quantorioBridge

let callLua = (mods, onlyLanguage) => {
  return import('lua.vm.js').then(LuaVM => {
    let modules = [
      'core',
      'base',
    ]
    mods = mods || []
    modules = modules.concat(mods)

    if (!luaState) {
      luaState = new LuaVM.Lua.State()

      luaState.push(quantorioBridge)
      luaState.setglobal('quantorioBridge')

      luaState.execute(`
        package.path = '?.lua'
        require("quantorio")
        require("dataloader")
        generator = require("generator")
        dkjson = require 'dkjson'
      `)
    }

    if (onlyLanguage) {
      luaState.execute(`
        data.raw = {}
        loadLanguages({'${modules.join("','")}'}, ${modules.length})
        quantorioBridge.meta = dkjson.encode(generator.getMeta())
        `)
      quantorioBridge.meta = JSON.parse(quantorioBridge.meta)
      setTranslation(quantorioBridge.meta)
    } else {
      luaState.execute(`
        data.raw = {}
        quantorioBridge.meta = dkjson.encode(browserParse({'${modules.join("','")}'}, ${modules.length}))
      `)
      let meta = JSON.parse(quantorioBridge.meta)
      // for sorting
      _items = meta.items
      quantorioBridge.meta = parseMeta(meta)
    }

    return quantorioBridge.meta
  })
}

let sortByOrder = (a, b) => {
  if (!a) {
    return -1
  } else if (!b) {
    return 1
  }
  let aName = a.showName || a.name
  let bName = b.showName || b.name
  let aOrders, bOrders
  aOrders = _items[aName].order.split('-')
  bOrders = _items[bName].order.split('-')
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
}

let parseMeta = (meta) => {
  // flip, sort, flip back
  let languages = meta.languages
  let fliped = {}
  Object.keys(languages).forEach(k => {
    fliped[languages[k]] = k
  })
  meta.languages = {}
  Object.keys(fliped).sort().forEach(k => {
    meta.languages[fliped[k]] = k
  })

  meta.modules.sort(sortByOrder)

  let insertersMap = {}
  let inserters = []

  meta.inserters.sort((a, b) => sortByOrder(meta.items[a.name], meta.items[b.name]))
  meta.inserters.forEach(inserter => {
    if (!insertersMap[inserter.turns_per_minute]) {
      insertersMap[inserter.turns_per_minute] = {}
    }
    if (!insertersMap[inserter.turns_per_minute][inserter.stack]) {
      insertersMap[inserter.turns_per_minute][inserter.stack] = true
      inserters.push(inserter)
    }
  })
  meta.inserters = inserters

  meta.machines.sort((a, b) => {
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

  let recipes = {}

  Object.keys(meta.recipes).forEach(recipeName => {
    recipes[recipeName] = new Recipe(meta.recipes[recipeName])
  })
  meta.recipes = recipes

  Object.keys(meta.groups).forEach(groupName => {
    let group = meta.groups[groupName]
    if (!group.subgroups) {
      delete meta.groups[groupName]
      return
    }
    group.subgroupsWithItems = []
    let itemCount = 0

    Object.keys(group.subgroups).forEach(subgroupName => {
      if (meta.subgroups[subgroupName]) {
        // foreach the subgroup
        let subgroupItems = []
        Object.keys(group.subgroups[subgroupName]).forEach(itemName => {
          if (meta.items[itemName] && meta.recipes[itemName]) {
            let item = meta.recipes[itemName]

            subgroupItems.push(item)
            itemCount++
          }
          subgroupItems.sort(sortByOrder)
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
      group.subgroupsWithItems.sort(sortByOrder)
    } else {
      delete meta.groups[groupName]
    }
  })
  meta.groups = Object.values(meta.groups).sort(sortByOrder)
  console.log('done')
  return meta
}

let allFetches = []
let fetchEx = (name) => {
  return fetch(name, {mode: 'cors'})
  // Retrieve its body as ReadableStream
  .then(response => {
    let length = response.headers.get('Content-Length')

    if (!length || !response.body) {
      return response.blob()
    }

    let id = allFetches.length

    allFetches.push({
      length: 0,
      loaded: 0,
    })

    allFetches[id].length = Number(length)

    const reader = response.body.getReader()

    let result = new Uint8Array(length)

    function pump () {
      return reader.read().then(({ done, value }) => {
        if (done) {
          return result
        }
        result.set(value, allFetches[id].loaded)

        allFetches[id].loaded += value.byteLength
        let total = 0
        let loaded = 0
        allFetches.forEach(setup => {
          total += setup.length
          loaded += setup.loaded
        })
        store.commit('setNetworkProgress', loaded / (total + 1))
        return pump()
      })
    }
    return pump()
  })
}

let loadZip = (name, file) => {
  if (loaded[name]) {
    return loaded[name]
  }
  console.log('loading file ' + name)
  let p
  let origName = name
  if (file) {
    p = import('jszip').then(JSZip => JSZip.loadAsync(file))
  } else {
    /*
    // wait for Access-Control-Expose-Headers: Content-Length
    if (process.env.TRAVIS_TAG) {
      name = `https://raw.githubusercontent.com/garveen/quantorio/${process.env.TRAVIS_TAG}/public/` + name
    }
    */
    p = fetchEx(name + '.zip').then(blob => {
      return import('jszip').then(JSZip => JSZip.loadAsync(blob))
    })
  }
  p = p.then(zip => {
    return [name, zip]
  })
  loaded[origName] = p
  return p
}

let loadFiles = zips => {
  let promises = []
  zips.forEach(([name, file]) => {
    promises.push(loadZip(name, file))
  })
  return Promise.all(promises).then(zips => {
    let names = []
    zips.forEach(([_, zip]) => {
      let name = zip.folder(/^[^/]+\/$/)[0].name
      names.push(name.substring(0, name.length - 1))
    })
    return parse(zips, 'data', names)
  })
  .then(setVue)
}

let init = (fallbackLanguage) => {
  return Promise.all([loadZip('lualib'), loadZip('core'), loadZip('base'), loadZip('quantorio'), loadZip('locale/' + fallbackLanguage)])
  .then(parse)
  .then(setVue)
  .then(meta => {
    store.commit('setNetworkProgress', 1)
    loadTranslation(fallbackLanguage)
    return meta
  }).catch(e => {
    throw e
  })
}

let setTranslation = (meta) => {
  Object.keys(meta.translations).forEach(lang => {
    let message = meta.translations[lang]
    i18n.mergeLocaleMessage(lang, message)
    store.commit('saveTranslation', [lang, message])
  })
}

let loadTranslation = (name) => {
  return loadZip('locale/' + name)
  .then(zip => {
    return parse([zip], undefined, undefined, true)
  })
  .then(meta => {
    setTranslation(meta)
    store.commit('loadedLanguage', name)
    return name
  })
  .catch(error => {
    console.error(error)
    alert('error when loading ' + name)
  })
}

let parse = (zips, prefix, mods, onlyLanguage) => {
  return quantorioBridge.extractZipToVirtualFS(zips, prefix)
  .then(() => {
    console.log('lua...')
    return callLua(mods, onlyLanguage)
  })
}

let setVue = (meta) => {
  store.commit('setMeta', meta)
  setTranslation(meta)
  return meta
}

export default {
  init: init,
  parse: parse,
  setVue: setVue,
  loadTranslation: loadTranslation,
  loadFiles: loadFiles,
  files: quantorioBridge.files,
  sortByOrder: sortByOrder,
}
