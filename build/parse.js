'use strict'

let LuaVM = require('lua.vm.js')

let l = new LuaVM.Lua.State()

let fs = require('fs')

let path = require('path')

let _global
if (typeof window == 'undefined') {
  _global = global
} else {
  _global = window
}


_global.mkDirByPathSync = (targetDir, {isRelativeToScript = false} = {}) => {
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

_global.zipStockFiles = (files) => {
  let JSZip = require("jszip")
  let zips = {
    core: new JSZip(),
    base: new JSZip(),
    lualib: new JSZip(),
    quantorio: new JSZip(),
  }

  files.forEach(file => {
    let zip
    let zipname
    // console.log(file)
    if (file.substring(0, 10) === 'data/core/') {
      zip = zips.core
      zipname = file
    } else if (file.substring(0, 10) === 'data/base/') {
      zip = zips.base
      zipname = file
    } else {
      // lualib or quantorio, will be zipped later
      return
    }
    zip.file(zipname, fs.readFileSync(file))
  })

  fs.readdirSync('./data/core/lualib').forEach(filename => {
    zips.lualib.file('lualib/' + filename, fs.readFileSync('data/core/lualib/' + filename))
  })

  fs.readdirSync('./core').forEach(filename => {
    zips.quantorio.file(filename, fs.readFileSync('core/' + filename))
  })
  fs.readdirSync('./locale').forEach(filename => {
    zips.quantorio.file('locale/' + filename, fs.readFileSync('./locale/' + filename))
  })

  let names = ['core', 'base', 'lualib', 'quantorio']
  names.forEach((name) => {
    zips[name]
    .generateNodeStream({type:'nodebuffer',streamFiles:true})
    .pipe(fs.createWriteStream('public/' + name + '.zip'))
    .on('finish', () => {
        console.log(name + ".zip written.")
    })
  })
}

let originPath = process.cwd()
try {
  let e = LuaVM.emscripten
  e.FS_createFolder('/', 'lualib', true, true)
  e.FS_createFolder('/', 'locale', true, true)

  fs.readdirSync('./core').forEach(filename => {
    e.FS_createDataFile('/', filename, fs.readFileSync('core/' + filename, "utf8"), true, false)
  })

  fs.readdirSync('./data/core/lualib').forEach(filename => {
    e.FS_createDataFile('/lualib', filename, fs.readFileSync('./data/core/lualib/' + filename, "utf8"), true, false)
  })

  l.execute('modules = {"core", "base", length=2}')
  _global.dataPrefix = 'src/data'
  _global.iconPrefix = 'src/assets'
  l.execute('require "quantorio"; localParse()')
  console.log('done')
} catch(error) {
  if (error.lua_stack) {
    console.log(error.lua_stack)
  } else {
    console.log(error)
  }
}
