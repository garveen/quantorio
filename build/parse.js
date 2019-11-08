'use strict'

let LuaVM = require('lua.vm.js')
let fs = require('fs')
let path = require('path')

let l = new LuaVM.Lua.State()

let quantorioBridge = {
  getFileContent: function (path) {
    return fs.readFileSync(path, 'utf8')
  },

  exists: function (path) {
    return fs.existsSync(path)
  },

  readDir: function (path) {
    return fs.readdirSync(path).join('|')
  },
}

l.push(quantorioBridge)
l.setglobal('quantorioBridge')

let getFilePathsRecursiveSync = (dir) => {
  let results = []
  let list = fs.readdirSync(dir)
  let pending = list.length
  if (!pending) return results

  for (let file of list) {
    file = path.resolve(dir, file)
    let stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      let res = getFilePathsRecursiveSync(file)
      results = results.concat(res)
    } else {
      results.push(file)
    }
    if (!--pending) return results
  }

  return results
}

global.mkDirByPathSync = (targetDir, {isRelativeToScript = false} = {}) => {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
      console.log(`Directory ${curDir} created!`);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }

      console.log(`Directory ${curDir} already exists!`);
    }

    return curDir;
  }, initDir);
}

global.zipStockFiles = (files) => {
  let JSZip = require("jszip")
  let zips = {
    core: new JSZip(),
    base: new JSZip(),
    lualib: new JSZip(),
    quantorio: new JSZip(),
  }

  files.sort().forEach(file => {
    let zip
    if (file.substring(10, 16) === 'locale' && file.substring(file.length - 4) === '.cfg') {
      let locale = /.*?locale\/([^/]+)/.exec(file)[1]
      locale = 'locale/' + locale
      if (!zips[locale]) {
        zips[locale] = new JSZip()
      }
      zip = zips[locale]
    }else if (file.substring(0, 10) === 'data/core/') {
      zip = zips.core
    } else if (file.substring(0, 10) === 'data/base/') {
      zip = zips.base
    } else {
      // lualib or quantorio, will be zipped later
      return
    }
    zip.file(file, fs.readFileSync(file))
  })

  let lualibPath = './data/core/lualib'
  let allPaths = getFilePathsRecursiveSync(lualibPath)

  for (let filePath of allPaths) {
    let addPath = path.posix.relative(path.join(lualibPath, ".."), filePath)
    let data = fs.readFileSync(filePath)
    zips.lualib.file(addPath, data)
  }

  fs.readdirSync('./core').forEach(filename => {
    zips.quantorio.file('core/' + filename, fs.readFileSync('core/' + filename))
  })
  fs.readdirSync('./locale').forEach(filename => {
    zips.quantorio.file('locale/' + filename, fs.readFileSync('./locale/' + filename))
  })

  Object.keys(zips).forEach((name) => {
    zips[name]
    .generateNodeStream({type:'nodebuffer',streamFiles:true, compression: 'DEFLATE', compressionOptions: { level: 9 }})
    .pipe(fs.createWriteStream('public/' + name + '.zip'))
    .on('finish', () => {
        console.log(name + ".zip written.")
    })
  })
}

let originPath = process.cwd()
try {
  let proxy = l.load(fs.readFileSync('core/quantorio.lua', 'utf8'), 'core/quantorio.lua', 't')
  proxy()
  proxy.free()
  l.execute('localParse()')
  console.log('done')
} catch(error) {
  if (error.lua_stack) {
    console.log(error.lua_stack)
  } else {
    console.log(error)
  }
}
