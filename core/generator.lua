if generator then return generator end

local fs = require 'fs'
local dkjson = require 'dkjson'
local generator = {}

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
	languages = {},
	translations = {},
}

local icons = {}
local icons_to_copy = {}

local function buildItem(source, params)
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

local function prepareCopyIcon(entity, name)
	local icon = entity.icon

	if (entity.icons) then
		icon = entity.icons[1].icon
	end

	local origin = icon:gsub('^__(%w+)__', 'data/%1')
	local save = icon:gsub('^__(%w+)__', 'graphics/%1')

	if not fs.exists(origin) then
		dump(origin)
		error()
	end
	icons[entity.name] = icons[entity.name] or {}
	icons[entity.name][entity.type] = {
		origin = origin,
		save = save,
		order = entity.order,
		name = name,
	}

	return save
end

local function saveItem(entity, name)
	if not (entity.icon or entity.icons) or not entity.order then return end
	prepareCopyIcon(entity, name)
end

local function copyIcon(entity)
	if(not entity.name) then
		dump(entity)
	end
	icons_to_copy[entity.name] = true
end

local function copyIcons(prefix)
	local legalTypes = {
		'item',
		'armor',
		'ammo',
		'capsule',
		'fluid',
		'gun',
		'item-group',
		'item-with-entity-data',
		'mining-tool',
		'module',
		'player',
		'rail-planner',
		'recipe',
		'repair-tool',
		'resource',
		'technology',
		'tool',

	}
	typesLength = 17

	for name in pairs(icons_to_copy) do
		local setup
		for i = 1, typesLength do
			setup = icons[name][legalTypes[i]]
			if setup then
				break
			end
		end
		if not setup then
			error()
		end
		if not fs.exists(setup.origin) then
			dump(name)
			error()
		end
		meta.items[name] = {
			order = setup.order,
			icon = setup.save,
			name = setup.name,
		}
		local remote = prefix .. setup.save
		if not fs.exists(fs.dirname(remote)) then
			js.global:mkDirByPathSync(fs.dirname(remote))
		end
		fs.copyFile(setup.origin, remote)
		::continue::
	end
end

local function writeFiles(dataPrefix, iconPrefix)
	prefix = dataPrefix or js.global.dataPrefix or ''
	if prefix then
		prefix = prefix .. '/'
	end

	iconPrefix = iconPrefix or js.global.iconPrefix or ''
	if iconPrefix then
		iconPrefix = iconPrefix .. '/'
	end
	copyIcons(iconPrefix)

	meta.recipes.dummy = {
	  name = 'dummy',
	  category = 'crafting',
	  normal = {
			energy_required = 0.5,
			results = {},
			ingredients = {},
			ingredient_count = 0,
		}
	}

	for name, content in pairs(meta) do
		if name == 'translations' then
			js.global:mkDirByPathSync(prefix .. 'translations')
			for language, data in pairs(meta.translations) do
				fs.writeFile(prefix .. 'translations/' .. language .. '.js', 'export default ' .. dkjson.encode(data, {indent = true}))
			end
		else
			fs.writeFile(prefix .. name .. '.js', 'export default ' .. dkjson.encode(content, {indent = true}))
		end
	end
end

local function saveLanguages(moduleName)
	-- Will be called when parsing a mod
	-- The working directory is different
	for _, language in pairs(fs.readDir('data/' .. moduleName .. '/locale')) do
		for _, filename in pairs(fs.readDir('data/' .. moduleName .. '/locale/' .. language)) do
			if filename == 'info.json' then
				local content = fs.readFile('data/' .. moduleName .. '/locale/' .. language .. '/' .. filename)
				local name = dkjson.decode(content)['language-name']
				meta.languages[language] = name
			elseif filename:sub(-4) == '.cfg' then
				local ini = loadINI('data/' .. moduleName .. '/locale/' .. language .. '/' .. filename)
				meta.translations[language] = meta.translations[language] or {}
				for _, groupName in pairs({
						'item-name',
						'entity-name',
						'fluid-name',
						'equipment-name',
						'recipe-name',
						-- 'technology-name',
						}) do
					if ini[groupName] then
					    local group = ini[groupName]
					    for k, v in pairs(group) do
					    	meta.translations[language][k] = v
					    end
					end
				end
			end
		end
	end

	for _, file in pairs(fs.readDir('locale')) do
		local language = file:match('(.-)%.')
		local ini = loadINI('locale/' .. file)
		for _, group in pairs(ini) do
			for k, v in pairs(group) do
				meta.translations[language][k] = v
			end
		end
	end

end

local function saveGroup(entity)
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
		meta.groups[entity.name].icon = prepareCopyIcon(entity)
		copyIcon(entity)
		meta.groups[entity.name].order = entity.order
	else
		checkGroup(entity.group)
		meta.groups[entity.group].subgroups[entity.name] = entity.order
	end
end

local function saveInserter(entity)
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

local function saveModule(entity)
	local module = buildItem(entity, {
		'type',
		'effect',
		'order',
	})
	table.insert(meta.modules, module)

end

local function saveBeacon(entity)
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

local function saveResource(entity)
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
	copyIcon(entity)
end

local function saveRecipe(entity)
	if entity.subgroup == 'empty-barrel' or entity.subgroup == 'fill-barrel' then return end
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

	copyIcon(entity)

	saveItem(entity, name)
end

local function saveMachine(entity)
	if entity.name == 'default' and entity.type == 'god-controller' then return end

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
	copyIcon(entity)
end

local function parse(data)
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

			if type == 'fluid' then copyIcon(entity) end

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

generator = {
	parse = parse,
	writeFiles = writeFiles,
	saveLanguages = saveLanguages,
}
return generator
