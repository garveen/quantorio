function print(...)
	js.global.console:log(...)
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

fs = require 'fs'
function findfile(filename)
	for i = 1, originPathsLength do
		local path = originPaths[i]
		filename = filename:gsub('%.', '/')
		local fullname = path:gsub('%?', filename)
		local content = fs.readFile(fullname)
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

function translate(inTable)
	-- Array or Object?
	local isArray = true
	if not inTable[1] then
		isArray = false
	end

	-- Recurse on table elements
	local obj = {}
	for k,v in pairs(inTable) do
		if type(v) == 'table' then
			obj[k] = translate(v)
		else
			obj[k] = v
		end
	end

	-- Create new Array or Object
	if isArray then
		return js.global:Array(table.unpack(obj))
	else
		local output = js.global:Object()
		for k,v in pairs(obj) do
			output[k] = v
		end
		return output
	end
end



table.insert(package.searchers, function(name)
	local loaded, path = findfile(name)
	if loaded then return loaded, path end
end)

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

local dkjson = require 'dkjson'
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

local to_be_zipped = {}

function zipIt(name)
	to_be_zipped[name] = true
end

function loadModules(modules)
	local old_require = require
	local to_be_removed = {}
	require('util')

	require = function (name)
		_, fullname = findfile(name)
		zipIt(fullname)
		if not package.loaded[name] then
			to_be_removed[name] = true
		end
		return old_require(name)
	end

	defines = require 'defines'

	defines.difficulty_settings = {
		technology_difficulty = {
			normal = 0
		},
		recipe_difficulty = {
			normal = 0
		}
	}

	require "dataloader"

	for _, name in pairs({'data', 'data-updates', 'data-final-fixes'}) do

		for i = 1, modules.length do
			local moduleName = modules[i]
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
		generator.saveLanguages(moduleName)
	end

	require = old_require
end



function loadINI(file)
	local section = '{}'
	local data = {}
	data[section] = {}
	local testSection
	local str = fs.readFile(file, "utf8") .. '\n'
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

originPaths = {
	"?.lua",
	"lualib/?.lua",
}
originPathsLength = 2

generator = require "generator"
loadModules(modules)

generator.parse(data.raw)

if not js.global.window then
	-- nodejs
	if js.global.process.env.NODE_ENV == 'development' then
		files = generator.copyIcons(nil, true)
	else
		files = generator.copyIcons()
	end
	all = {}
	for k in pairs(to_be_zipped) do
		table.insert(all, k)
	end
	for k in pairs(files) do
		table.insert(all, k)
	end
	js.global:zipStockFiles(js.global:Array(table.unpack(all)))
else
	-- browser
	generator.copyIcons(nil, true)
end

return translate(generator.getMeta())
