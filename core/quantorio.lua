old_print = print
_G.print = function(...)
	local info = debug.getinfo(2, 'Sl')
	local line = info.short_src .. ':' .. info.currentline .. ':'
	old_print(line, ...)
end
log = print

originPaths = {
	"?.lua",
	"lualib/?.lua",
}
originPathsLength = 2


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

function isNode()
	return not js.global.window
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

table.insert(package.searchers, function(name)
	local loaded, path = findfile(name)
	if loaded then return loaded, path end
end)

generator = require "generator"
local dkjson = require 'dkjson'

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

function dump(...)
	local info = debug.getinfo(2, 'Sl')
	local line = info.short_src .. ':' .. info.currentline .. ':'
	for _, v in ipairs({...}) do
		line = line .. ' ' .. dkjson.encode(v, {indent = true})
	end
	old_print(line)
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

defines = require 'lualib.defines'

defines.difficulty_settings = {
	technology_difficulty = {
		normal = 0
	},
	recipe_difficulty = {
		normal = 0
	}
}

function loadModules(modules, modulesLength)
	local old_require = require


	require = function (filename)
		loaded, fullname = findfile(filename)
		zipIt(fullname)
		return old_require(filename)
	end
	-- packup package.loaded
	-- cannot assign directly by lua's design
	local ploaded = {}
	for k, v in pairs(package.loaded) do
		ploaded[k] = v
	end

	for _, filename in pairs({'data', 'data-updates', 'data-final-fixes'}) do
		for i = 1, modulesLength do
			for k, v in pairs(package.loaded) do
				package.loaded[k] = nil
			end
			local moduleName = modules[i]
			table.insert(originPaths, 1, 'data/' .. moduleName .. '/?.lua')
			originPathsLength = originPathsLength + 1
			local chunk = findfile(filename)
			if chunk then
				print('loading ' .. moduleName .. '/' .. filename .. '.lua')
				require(filename)
			else
			end
			originPathsLength = originPathsLength - 1
			table.remove(originPaths, 1)
		end
	end
	for k, v in pairs(ploaded) do
		package.loaded[k] = v
	end

	require = old_require

	return loadLanguages(modules, modulesLength)
end

function loadLanguages(modules, modulesLength)
	local mapping = {}
	for i = 1, modulesLength do
		local moduleName = modules[i]
		local part = moduleName:gmatch('[^_]+')()
		mapping['__' .. part .. '__'] = 'data/' .. moduleName
		generator.saveLanguages(moduleName)
		generator.saveQuantorioLanguages()
	end
	return mapping
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

function parse(modules, modulesLength)
	generator.init()
	local mapping = loadModules(modules, modulesLength)
	generator.parse(data.raw, mapping)
	local files = generator.finalize()
	local meta = generator.getMeta()
	return meta, files
end

function browserParse(modules, modulesLength)
	local meta = parse(modules, modulesLength)
	return meta
end


function localParse()
	require "dataloader"
	local modules = {'core', 'base'}
	local modulesLength = 2
	local meta, files = parse(modules, modulesLength)

	-- nodejs
	files = generator.finalize()
	all = {}
	for k in pairs(to_be_zipped) do
		table.insert(all, k)
	end
	for k in pairs(files) do
		table.insert(all, k)
	end
	js.global:zipStockFiles(js.global:Array(table.unpack(all)))

	return meta
end

