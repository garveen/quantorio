old_require = require
require = function (path)
	return old_require(php_findfile(path))
end

require 'prefix'
