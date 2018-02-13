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
  l.execute('modules = {"core", "base"}')
  _global.prefix = 'src/data'
  l.execute(fs.readFileSync('core/quantorio.lua', "utf8"))
  console.log('done')
} catch(error) {
  console.log(error.lua_stack)
}
