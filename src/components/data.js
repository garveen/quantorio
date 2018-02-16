import Helpers from './Helpers'

let p = Promise.all([import('lua.vm.js'), import('JSZip')]).then(([LuaVM, JSZip]) => {
  let loadZip = (name) => {
    return fetch('public/' + name + '.zip').then((response) => {
      return response.blob()
    }).then(JSZip.loadAsync)
  }

  return Promise.all([loadZip('lualib'), loadZip('core'), loadZip('base'), loadZip('quantorio')]).then(values => {
    let l = window.luaState = new LuaVM.Lua.State()

    let promises = []

    let e = LuaVM.emscripten

    let fs = {}
    let files = {}
    e.FS_createFolder('/', 'locale', true, true)

    values.forEach((zip, index) => {
      zip.forEach((relativePath, file) => {
        if (file.dir) {
          let dir = fs
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
              files[file.name] = content

              let dir = fs
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
              if (index === 3 && !file.dir) {
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
              files[file.name] = content
            }))
          }
        }
      })
    })

    return Promise.all(promises).then((values) => {
      window.getFileContent = (path) => {
        return files[path]
      }

      window.fs = fs

      window.files = files

      l.execute('modules = {"core", "base", length=2}')
      window.dataPrefix = 'src/data'
      window.iconPrefix = 'src/assets'
      l.execute(`js.global.meta = require "quantorio"`)

      return window.meta
    }).then((meta) => {
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
            Object.keys(meta.subgroups[subgroupName]).forEach(itemName => {
              if (meta.items[itemName] && meta.recipes[itemName]) {
                let item = {}
                Object.keys(meta.items[itemName]).forEach(k => {
                  item[k] = meta.items[itemName][k]
                })
                if (!item.name) {
                  item.name = itemName
                }

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
      // meta.groups.sort(Helpers.sortByOrder)

      return meta
    }).catch(error => {
      if (error.lua_stack) {
        console.error(error.lua_stack)
      } else {
        throw error
      }
    })
  })
})

export default p
