let fs = {}
let files = {}
let meta

export default {
  fs: fs,
  files: files,
  meta: meta,

  getFileContent: function (path) {
    let content = files[path]
    return content
  },

  exists: function (path) {
    let dir = fs
    return !path.split('/').some(part => !(dir = dir[part]))
  },

  readDir: function (path) {
    let dir = fs
    path.split('/').forEach(part => dir ? (dir = dir[part]) : false)
    if (!dir) { return '' }
    return Object.keys(dir).join('|')
  },

  extractZipToVirtualFS: (zips, prefix) => {
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
        console.log('extracting ' + name)
        let baseDir = rootDir

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
                if (name === 'quantorio' && !file.dir) {
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
    })
  }
}
