'use strict'

let LuaVM = require('lua.vm.js')

let l = new LuaVM.Lua.State()
let fs = require('fs')

try {
  l.execute(fs.readFileSync('core/js-prefix.lua', "utf8"))
  l.execute('require "dataloader"')
  l.execute(fs.readFileSync('data/base/data.lua', "utf8"))
} catch(error) {
  console.log(error)
}
