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

let originPath = process.cwd()
try {
  let e = LuaVM.emscripten
  e.FS_createFolder('/', 'core', true, true)
  e.FS_createFolder('/core', 'lualib', true, true)
  fs.readdirSync('./core').forEach(filename => {
    e.FS_createDataFile('/core', filename, fs.readFileSync('core/' + filename, "utf8"), true, false)
  })
  fs.readdirSync('./data/core/lualib').forEach(filename => {
    e.FS_createDataFile('/core/lualib', filename, fs.readFileSync('./data/core/lualib/' + filename, "utf8"), true, false)
  })

  l.execute('modules = {"core", "base", length=2}')
  _global.dataPrefix = 'src/data'
  _global.iconPrefix = 'src/assets'
  l.execute('require "core.quantorio"')
  console.log('done')
} catch(error) {
  if (error.lua_stack) {
    console.log(error.lua_stack)
  } else {
    console.log(error)
  }
}
