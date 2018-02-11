local fs = js.global.process.mainModule:require("fs")
local originPath = js.global.process:cwd()
print(originPath)
function split(inputstr, sep)
        if sep == nil then
                sep = "%s"
        end
        local t={} ; i=1
        for str in string.gmatch(inputstr, "([^"..sep.."]+)") do
                t[i] = str
                i = i + 1
        end
        return t
end

function log(...)
	print(...)
end

function loadModules()
	for _, name in pairs({'data', 'data-updates', 'data-final-fixes'}) do
		for _, module in pairs(modules) do
			local path = originPath .. '/data/' .. module
			js.global.process:chdir(path)
			local loaded = findfile(path .. '/' .. name .. '.lua')
			if loaded then
				print(module, name)
				require(name)
				package.loaded[name] = nil
			end
		end
	end
	js.global.process:chdir(originPath)
end

function findfile(path)
	if fs:existsSync(path) then
		local contents = fs:readFileSync(path, "utf8")
		local loaded, err = load(contents, "@"..path)
		if (err) then
			error(err)
		end
		return loaded
	end
end

table.insert(package.searchers, function(name)

	local paths = {
		'.',
		originPath .. '/core',
		originPath .. '/data/core/lualib',
	}
	for _, path in ipairs(split(package.path, ';')) do
		path = string.gsub(path, '%?', name)
		local loaded = findfile(path)
		if loaded then return loaded, path end
	end

	for _, path in ipairs(paths) do
		path = path .. "/"..name:gsub("%.", "/") .. ".lua"
		local loaded = findfile(path)
		if loaded then return loaded, path end
	end
	-- print('Loading ' .. name .. ' FAILED')

end)

require 'prefix'
