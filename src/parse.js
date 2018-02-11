'use strict'

let LuaVM = require('lua.vm.js')

let l = new LuaVM.Lua.State()

let fs = require('fs')

let path = require('path')

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

let originPath = process.cwd()
try {
  l.execute(fs.readFileSync('core/js-prefix.lua', "utf8"))
  l.execute('require "dataloader"')
  l.execute('modules = {"core", "base"}')
  l.execute('loadModules()')
  l.execute('require "generator"')

  l.execute('parse(data.raw)')
  l.execute('copyIcons()')
  l.execute('writeFiles("public")')

  console.log('done')
} catch(error) {
  console.log(error.lua_stack)
}
