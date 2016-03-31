old_require = require
require = function (path)
	return old_require(php_findfile(path))
end
function module()
end

game = {}
defines = {}
defines.direction = {}
util = {}
util.multiplystripes = function() end
