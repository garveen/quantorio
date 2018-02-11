local dkjson = require 'dkjson'
local fs = js.global.process.mainModule:require("fs")
local path = js.global.process.mainModule:require("path")

local meta = {
	groups = {},
	subgroups = {},
	items = {},
	inserters = {},
	recipes = {},
	modules = {},
	beacons = {},
	resources = {},
	categories = {},
	machines = {},
}

local icons = {}
local icons_to_copy = {}

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
	if not (entity.icon or entity.icons) or not entity.order then return end
	local item = {
		order = entity.order,
		icon = saveIcon(entity),
	}
	if name then
		item.name = name
	end
	meta.items[entity.name] = item
end

function saveIcon(entity)
	local icon = entity.icon

	if (entity.icons) then
		icon = entity.icons[1].icon
	end

	local origin = icon:gsub('^__(%w+)__', 'data/%1')
	local save = icon:gsub('^__(%w+)__', 'graphics/%1')
	local remote = 'public/' .. save
	if not fs:existsSync(origin) then
		dump(origin)
		error()
	end
	icons[entity.name] = {
		origin = origin,
		save = save,
		remote = remote,
	}
	return save

end

function copyIcons()
	for name in pairs(icons_to_copy) do
		local setup = icons[name]
		local origin, save, remote = setup.origin, setup.save, setup.remote
		if not fs:existsSync(origin) then
			dump(name)
			error()
		end
		if not fs:existsSync(path:dirname(remote)) then
			js.global:mkDirByPathSync(path:dirname(remote))
		end
		fs:copyFileSync(origin, remote)
	end
end

function writeFiles(prefix)
	if prefix then
		prefix = prefix .. '/'
	end
	for name, content in pairs(meta) do
		fs:writeFileSync(prefix .. name .. '.js', 'export default ' .. dkjson.encode(content, {indent = true}))
	end
end

function saveGroup(entity)
	local checkGroup = function (groupName)
		if not meta.groups[groupName] then
			meta.groups[groupName] = {
				order = '',
				subgroups = {},
			}
		end
	end
	local groupName
	if (entity.type == 'item-group') then
		checkGroup(entity.name)
		meta.groups[entity.name].icon = saveIcon(entity)
		icons_to_copy[entity.name] = true
		meta.groups[entity.name].order = entity.order
	else
		checkGroup(entity.group)
		meta.groups[entity.group].subgroups[entity.name] = entity.order
	end
end

function saveInserter(entity)
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

function saveModule(entity)
	local module = buildItem(entity, {
		'type',
		'effect',
		'order',
	})
	table.insert(meta.modules, module)

end

function saveBeacon(entity)
	local beacon = buildItem(entity, {
		'type',
		'energy_usage',
		'distribution_effectivity',
	})
	beacon.allowed_effects = {}
	for _, effect in pairs(entity.allowed_effects) do
		table.insert(beacon.allowed_effects, effect)
	end
	beacon.module_slots = entity.module_specification.module_slots
	table.insert(meta.beacons, beacon)
end

function saveResource(entity)
	local resource = buildItem(entity, {
		category = 'basic-solid',
	})
	resource.hardness = entity.minable.hardness
	resource.mining_time = entity.minable.mining_time
	if entity.minable.required_fluid then
		resource.fluid_amount = entity.minable.fluid_amount
		resource.required_fluid = entity.minable.required_fluid
	end
	meta.resources[entity.name] = resource
	icons_to_copy[entity.name] = true
end

function saveRecipe(entity)
	local recipe = buildItem(entity, {
		category = 'crafting',
		'results',
	})

	local all = {
		normal = entity
	}

	if entity.normal then
		all.normal = entity.normal
	end
	if entity.expensive then
		all.expensive = entity.expensive
	end

	for difficulty, config in pairs(all) do
		recipe[difficulty] = {
			ingredients = {},
		}
		local count = 0
		for _, ingredient in pairs(config.ingredients) do
			count = count + 1
			if ingredient.type then
				recipe[difficulty].ingredients[ingredient.name] = ingredient.amount
			else
				recipe[difficulty].ingredients[ingredient[1]] = ingredient[2]
			end
		end
		recipe[difficulty].ingredient_count = count
		local results = {}
		if config.result then
			results[config.result] = config.result_count or 1
		else
			for _, result in pairs(config.results) do
				results[result.name] = result.amount
			end
		end
		results.type = nil
		recipe[difficulty].results = results
		recipe[difficulty].energy_required = config.energy_required or 0.5
	end

	meta.recipes[entity.name] = recipe

	local name
	if next(recipe.normal.results) ~= name and size(recipe.normal.results) == 1 then
		name = next(recipe.normal.results)
	end

	icons_to_copy[entity.name] = true

	saveItem(entity, name)
end

function saveMachine(entity)

	local machine = buildItem(entity, {
		'type',
		crafting_speed = 1,
		'mining_speed',
		'mining_power',
		'ingredient_count',
		energy_source = {},
		energy_usage = 0,
		'drain',
		'researching_speed',
	})
	if entity.module_specification and entity.module_specification.module_slots then
		machine.module_slots = entity.module_specification.module_slots
	else
		machine.module_slots = 0
	end


	machine.energy_usage = tonumber(string.sub(machine.energy_usage, 0, -3)) or 0

	machine.energy_source.smoke = nil
	machine.energy_source.fuel_inventory_size = nil
	machine.energy_source.usage_priority = nil
	machine.energy_source.type = machine.energy_source.type or 'biologic'
	machine.energy_source.emissions = machine.energy_source.emissions or 0

	for _, category_group in pairs({'resource_categories', 'crafting_categories'}) do
		if entity[category_group] then
			for _, category in pairs(entity[category_group]) do
				if not meta.categories[category] then
					meta.categories[category] = {}
				end
				table.insert(meta.categories[category], entity.name)
			end
		end
	end
	machine.allowed_effects = {}
	if entity.allowed_effects then
		for _, effect in pairs(entity.allowed_effects) do
			table.insert(machine.allowed_effects, effect)
		end
	end
	table.insert(meta.machines, machine)
	icons_to_copy[entity.name] = true
end

function parse(data)
	for type, entities in pairs(data) do
		for _, entity in pairs(entities) do
			saveItem(entity)
			local type = entity.type
			if type == 'item-group' or type == 'item-subgroup' then saveGroup(entity) end
			if type == 'inserter' then saveInserter(entity) end
			if type == 'module' then saveModule(entity) end
			if type == 'beacon' then saveBeacon(entity) end
			if type == 'resource' then saveResource(entity) end
			if type == 'recipe' then saveRecipe(entity) end

			if type == 'fluid' then icons_to_copy[entity.name] = true end

			if (entity.subgroup) then
				if not meta.subgroups[entity.subgroup] then
					meta.subgroups[entity.subgroup] = {}
				end
				meta.subgroups[entity.subgroup][entity.name] = true
			end

			if entity.crafting_categories or entity.resource_categories then
				saveMachine(entity)
			end
		end
	end
end
