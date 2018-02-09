local fs = js.global.process.mainModule:require("fs")

table.insert(package.searchers, function(name)
	-- js.global.console:log('Loading ' .. name)

	local paths = {
		'core',
		'core/lualib',
		'data/base',
	}
	for _, path in ipairs(paths) do

		path = path .. "/"..name:gsub("%.", "/")..".lua"
		-- js.global.console:log('find ' .. path)
		if fs:existsSync(path) then
			local contents = fs:readFileSync(path, "utf8")
			local loaded = load(contents, "@"..path), path
			-- js.global.console:log('Loaded')
			return loaded
		end
	end
	-- js.global.console:log('Loading ' .. name .. ' FAILED')

end)

require 'prefix'
