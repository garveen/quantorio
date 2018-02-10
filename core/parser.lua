local dkjson = require 'dkjson'
local fs = js.global.process.mainModule:require("fs")
local path = js.global.process.mainModule:require("path")

local meta = {
	groups = {},
	subgroups = {},
	inserters = {},
	recipes = {},
	modules = {},
	items = {},
	icons = {},
}

function dump (o)
	print(dkjson.encode(o, {indent = true}))
end

function is_int(n)
  return n == math.floor(n)
end


function Set (list)
	local set = {}
	for _, l in ipairs(list) do
		set[l] = true
	end
	return set
end

function buildItem(source, params)
	target = {}
	target.name = source.name
	for param, default in pairs(params) do
		local has_default = true
		if is_int(param) then
			param = default
			has_default = false
		end
		if not (source[param] == nil) then
			target[param] = source[param]
		else
			if has_default then target[param] = default end
		end
	end
	return target
end

function saveItem(entity, name)
end

function saveIcon (entity)
	local icon  = entity.icon
	if (icon:find('__core__')) then
		return
	end
	local icon  = entity.icon
	if (icon:find('__core__')) then
		return
	end

	local origin = icon:gsub('^__base__', 'data/base')
	local save = icon:gsub('^__base__', 'graphics/base')
	local remote = 'public/' .. save
	if not fs:existsSync(origin) then
		print(origin)
		error()
	end
	meta.icons[entity.name] = {
		origin,
		save,
		remote,
	}
	return save

end

function copyIcons ()
	for _, setup in pairs(meta.icons) do
		local origin, save, remote = setup
		if not fs:existsSync(origin) then
			print(origin)
			error()
		end
		if not fs:existsSync(path:dirname(remote)) then
			js.global:mkDirByPathSync(path:dirname(remote))
		end
		fs:copyFileSync(origin, remote)
	end
end

function saveGroup (entity)
	local checkGroup = function (groupName)
		if not meta.groups[groupName] then
			meta.groups[groupName] = {
				icon = '',
				order = '',
				subgroups = {},
			}
		end
	end
	local groupName
	if (entity.type == 'item-group') then
		checkGroup(entity.name)
		meta.groups[entity.name].icon = saveIcon(entity)
		meta.groups[entity.name].order = entity.order
	else
		checkGroup(entity.group)
		meta.groups[entity.group].subgroups[entity.name] = entity.order
	end
end

function saveInserter (entity)
	local inserter = {}
	local angles = {}
	local distances = {}
	local x, y
	for _, position in pairs({'pickup_position', 'insert_position'}) do
		x = entity[position][1]
		y = entity[position][2]

		if (x == 0) then
			local sign = 0
			if (y > 0) then
				sign = 1
			end
			if (y < 0) then
				sign = -1
			end
			angles[position] = math.pi / 2 * sign
		else
			angles[position] = math.atan(y / x)
		end

		distances[position] = math.sqrt(x * x + y * y)
	end
	angle = math.abs(angles.pickup_position - angles.insert_position)
	rotation_turns_per_minute = 60 --[[seconds]] * (entity.rotation_speed * 60 --[[tick]]) * math.pi / angle

	delta_distance = math.abs(distances.pickup_position - distances.insert_position)
	extension_turns_per_minute = delta_distance / entity.extension_speed * 60
	inserter.turns_per_minute = math.min(rotation_turns_per_minute, extension_turns_per_minute)
	inserter.name = entity.name
	inserter.stack = entity.stack or false

	table.insert(meta.inserters, inserter)
end

function saveModule (entity)
	local module = buildItem(entity, {
		'type',
		'effect',
		'order',
	})
	table.insert(meta.modules, module)
	saveItem(entity)
end

for type, entities in pairs(data.raw) do
	for _, entity in pairs(entities) do
		local type = entity.type
		if type == 'item-group' or type == 'item-subgroup' then saveGroup(entity) end
		if type == 'inserter' then saveInserter(entity) end
		if type == 'module' then saveModule(entity) end
		-- if type == 'beacon' then saveBeacon(entity) end
		-- if type == 'recipe' then saveRecipe(entity) end
		-- if type == 'resource' then saveResource(entity) end

		if (entity.subgroup) then
			if not meta.subgroups[entity.subgroup] then
				meta.subgroups[entity.subgroup] = {}
			end
			meta.subgroups[entity.subgroup][entity.name] = true
		end

		-- if entity.crafting_categories or entity.resource_categories then
		--	 saveMachine(entity)
		-- end
	end
end

dump(meta.modules)