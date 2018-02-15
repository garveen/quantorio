root = js.global.process:cwd()

print(root)

function readFile(filename)
	local fp = io.open(filename)
	if (fp) then
		local content = fp:read('*a')
		fp:close()
		return content
	end
	if js.global.window then
		-- browser
	else
		-- node
		local fs = js.global.process.mainModule:require("fs")
		if fs:existsSync(filename) then
			return fs:readFileSync(filename, 'utf8')
		else
			return false
		end
	end
end

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

function loadModules(modules)
	local old_require = require
	local to_be_removed = {}
	local generator = require('generator')
	require('util')

	require = function (name)
		if not package.loaded[name] then
			to_be_removed[name] = true
		end
		return old_require(name)
	end
	for _, name in pairs({'data', 'data-updates', 'data-final-fixes'}) do

		for i = 1, modules.length do
			local moduleName = modules[i]
			currentModule = moduleName
			table.insert(originPaths, 1, 'data/' .. moduleName .. '/?.lua')
			originPathsLength = originPathsLength + 1
			local loaded = findfile(name)
			if loaded then
				require(name)

				for name in pairs(to_be_removed) do
					package.loaded[name] = nil
				end
				to_be_removed = {}
			end
			originPathsLength = originPathsLength - 1
			table.remove(originPaths, 1)
		end
	end
	for i = 1, modules.length do
		local moduleName = modules[i]
		currentModule = moduleName
		local path = root .. '/data/' .. moduleName
		js.global.process:chdir(path)
		generator.saveLanguages()
	end

	require = old_require
	js.global.process:chdir(root)
end

function findfile(filename)
	for i = 1, originPathsLength do
		path = originPaths[i]
		filename = filename:gsub('%.', '/')
		local fullname = path:gsub('%?', filename)
		local content = readFile(fullname)
		if content then
			loaded, err = load(content, '@' .. fullname)
			if (loaded) then
				return loaded, fullname
			else
				print(err)
			end
		end
	end
	return false
end

function loadINI(file)
	local section = '{}'
	local data = {}
	data[section] = {}
	local testSection
	local str = readFile(file, "utf8") .. '\n'
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
	local loaded, path = findfile(name)
	if loaded then return loaded, path end
end)


originPaths = {
	"?.lua",
	"core/?.lua",
	"core/lualib/?.lua",
}
originPathsLength = 3

currentModule = nil

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
loadModules(modules)

generator = require "generator"
generator.parse(data.raw)
generator.writeFiles()

