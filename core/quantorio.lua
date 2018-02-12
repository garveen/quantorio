local fs = js.global.process.mainModule:require("fs")

root = js.global.process:cwd()
print(root)
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

function dump(...)
	local info = debug.getinfo(2, 'Sl')
	local line = info.short_src .. ':' .. info.currentline .. ':'
	for _, v in ipairs({...}) do
		line = line .. ' ' .. dkjson.encode(v, {indent = true})
	end
	print(line)
end

function is_int(n)
	if type(n) ~= 'number' then return false end
	return n == math.floor(n)
end

function size(T)
  local count = 0
  for _ in pairs(T) do count = count + 1 end
  return count
end

function Set(list)
	local set = {}
	for _, l in ipairs(list) do
		set[l] = true
	end
	return set
end

function loadModules()
	local old_require = require
	local to_be_removed = {}
	local generator = require('generator')
	require = function (name)
		if not package.loaded[name] then
			to_be_removed[name] = true
		end
		return old_require(name)
	end
	for _, name in pairs({'data', 'data-updates', 'data-final-fixes'}) do
		for _, module in pairs(modules) do
			local path = root .. '/data/' .. module
			js.global.process:chdir(path)
			local loaded = findfile(path .. '/' .. name .. '.lua')
			if loaded then
				require(name)
				for name in pairs(to_be_removed) do
					package.loaded[name] = nil
				end
				to_be_removed = {}
			end
		end
	end
	for _, module in pairs(modules) do
		local path = root .. '/data/' .. module
		js.global.process:chdir(path)
		generator.saveLanguages()
	end

	require = old_require
	js.global.process:chdir(root)
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

function loadINI(file)
	local section = '{}'
	local data = {}
	data[section] = {}
	local testSection
	local str = fs:readFileSync(file, "utf8") .. '\n'
	for line in str:gmatch('(.-)\r?\n') do
		testSection = line:match('^%[([^%[%]]+)%]$')
		if testSection then
			section = tonumber(testSection) or testSection
			data[section] = data[section] or {};
		else
			local k, v = line:match('(.-)=(.+)')
			if k and v then
				if tonumber(v) then
					v = tonumber(v)
				elseif v == 'true' then
					v = true
				elseif v == 'false' then
					v = false
				end
				if tonumber(k) then
					k = tonumber(k)
				end
				data[section][k] = v
			end
		end
	end
	return data
end

do -- Create js.ipairs and js.pairs functions. attach as __pairs and __ipairs on JS userdata objects.
	local _PROXY_MT = debug.getregistry()._PROXY_MT

	-- Iterates from 0 to collection.length-1
	local function js_inext(collection, i)
		i = i + 1
		if i >= collection.length then return nil end
		return i, collection[i]
	end
	function js.ipairs(collection)
		return js_inext, collection, -1
	end
	_PROXY_MT.__ipairs = js.ipairs

	function js.pairs(ob)
		local keys = js.global.Object:getOwnPropertyNames(ob) -- Should this be Object.keys?
		local i = 0
		return function(ob, last)
			local k = keys[i]
			i = i + 1;
			return k, ob[k]
		end, ob, nil
	end
	_PROXY_MT.__pairs = js.pairs
end

table.insert(package.searchers, function(name)

	local paths = {
		'.',
		root .. '/core',
		root .. '/data/core/lualib',
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

defines = require 'defines'

defines.difficulty_settings = {
	technology_difficulty = {
		normal = 0
	},
	recipe_difficulty = {
		normal = 0
	}
}

dkjson = require 'dkjson'
require "dataloader"
loadModules()

generator = require "generator"
generator.parse(data.raw)
generator.copyIcons()
generator.writeFiles()

