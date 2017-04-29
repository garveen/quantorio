old_require = require
require = function (path)
	return old_require(php_findfile(path))
end
function module()
end

game = {}
defines = require 'defines'
builder = require 'builder'
util = require 'util'
