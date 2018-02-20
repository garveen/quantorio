import Helpers from './Helpers'
import Recipe from './Recipe'

let luaState

let callLua = (fs, files, mods) => {
  return import('lua.vm.js').then(LuaVM => {
    window.getFileContent = (path) => {
      let content = window.files[path]
      if (!content) {
        // console.log(path)
      }
      return content
    }
    window.fs = fs
    window.files = files
    let modules = [
      'core',
      'base',
    ]
    mods = mods || []
    modules = modules.concat(mods)

    if (!luaState) {
      luaState = new LuaVM.Lua.State()
      luaState.execute(`
        require("quantorio")
        require("dataloader")
      `)
    }

    luaState.execute(`
      data.raw = {}
      js.global.meta = browserParse({'${modules.join("','")}'}, ${modules.length})
    `)
    return window.meta
  })
}

let parseMeta = (meta) => {
  meta.modules.sort(Helpers.sortByOrder)
  meta.modules.unshift(null)

  meta.inserters.sort((a, b) => Helpers.sortByOrder(meta.items[a.name], meta.items[b.name]))

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
          subgroupItems.sort(Helpers.sortByOrder)
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
      group.subgroupsWithItems.sort(Helpers.sortByOrder)
    } else {
      delete meta.groups[groupName]
    }
  })
  meta.groups = Object.values(meta.groups).sort(Helpers.sortByOrder)
  return meta
}

let extractZipToVirtualFS = (zips, prefix) => {
  console.log('extracting...')
  let fs = window.fs || {}
  let files = window.files || {}

  return import('lua.vm.js').then(LuaVM => {
    prefix = prefix || ''
    let rootDir
    if (prefix) {
      rootDir = fs
      fs[prefix] = fs[prefix] || {}
      rootDir = fs[prefix]
      prefix += '/'
    } else {
      rootDir = fs
    }

    let e = LuaVM.emscripten
    let promises = []

    try {
      e.FS_createFolder('/', 'locale', true, true)
    } catch (e) {}

    zips.forEach(([name, zip], index) => {
      let baseDir = rootDir

      console.log('extracting ' + name)

      zip.forEach((relativePath, file) => {
        if (file.dir) {
          let dir = baseDir
          file.name.split('/').forEach(part => {
            if (dir[part]) {
              dir = dir[part]
            } else if (part) {
              dir[part] = {}
            }
          })
          let matches = file.name.match(/(.*)\/(.+)/)
          if (!matches || !matches[2]) {
            matches = {
              '1': '',
              '2': file.name
            }
          }
        } else {
          let suffix = file.name.substring(file.name.length - 4, file.name.length)
          if (suffix === '.lua' || suffix === '.cfg' || suffix === '.ini' || suffix === 'json') {
            promises.push(file.async('text').then((content) => {
              files[prefix + file.name] = content

              let dir = baseDir
              file.name.split('/').forEach(part => {
                if (part && dir[part]) {
                  dir = dir[part]
                } else {
                  dir[part] = true
                }
              })

              let matches = file.name.match(/(.*)\/(.+)/)
              if (!matches) {
                matches = {
                  '1': '',
                  '2': file.name
                }
              }
              if (index === 3 && !file.dir && !prefix) {
                try {
                  return e.FS_createDataFile('/' + matches[1], matches[2], content, true, false)
                } catch (error) {
                  if (error.code !== 'EEXIST') {
                    throw error
                  }
                }
              }
            }))
          } else {
            promises.push(file.async('base64').then((content) => {
              files[prefix + file.name] = content
            }))
          }
        }
      })
    })
    return Promise.all(promises)
  }).then(() => {
    return [fs, files]
  })
}

let loadZip = (name) => {
  return import('jszip').then(JSZip => {
    if (process.env.TRAVIS_TAG) {
      name = `//raw.githubusercontent.com/garveen/quantorio/${process.env.TRAVIS_TAG}/public/` + name
    }
    return fetch(name + '.zip', {mode: 'cors'})
    .then(response => response.blob())
    .then(JSZip.loadAsync)
    .then(zip => {
      return [name, zip]
    })
  })
}

let init = (fallbackLanguage) => {
  return Promise.all([loadZip('lualib'), loadZip('core'), loadZip('base'), loadZip('quantorio'), loadZip(fallbackLanguage)]).then(parse)
}

let loadSingle = (name) => {
  return loadZip(name).then(zip => [zip]).then(parse)
}

let setTranslation = ($vm, meta) => {
  Object.keys(meta.translations).forEach(lang => {
    let message = meta.translations[lang]
    try {
      message.el = require('element-ui/lib/locale/lang/' + lang).default.el
    } catch (ex) {
    }
    $vm.$i18n.mergeLocaleMessage(lang, message)
    $vm.$store.commit('saveTranslation', [lang, message])
  })
}

let loadTranslation = ($vm, name) => {
  $vm.$store.commit('setLoading', true)
  return loadSingle(name).then(meta => {
    setTranslation($vm, meta)
    $vm.$store.commit('setLoading', false)
  })
}

let parse = (zips, prefix, mods) => {
  return extractZipToVirtualFS(zips, prefix)
  .then(([fs, files]) => {
    console.log('lua...')
    return callLua(fs, files, mods)
  })
  .then(parseMeta)
  .then(meta => {
    console.log('done')
    window.meta = meta
    return meta
  }).catch(error => {
    if (error.lua_stack) {
      console.error(error.lua_stack)
    } else {
      throw error
    }
  })
}

let setVue = ($vm, meta) => {
  window.items = meta.items
  $vm.$store.commit('setMeta', meta)
  setTranslation($vm, meta)
}

export default {
  init: init,
  parse: parse,
  setVue: setVue,
  loadSingle: loadSingle,
  loadTranslation: loadTranslation,
}
