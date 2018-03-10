local fs = require 'fs'
local dkjson = require 'dkjson'
local generator = {}
local pathMapping = {}

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
local typesLength = 17

local meta

local icons = {}
local icons_to_copy = {}

local function init()
	icons = {}
	icons_to_copy = {}
	pathMapping = {}

	meta = {
		groups = {},
		subgroups = {},
		items = {},
		inserters = {},
		recipes = {
			dummy = {
				name = 'dummy',
				category = 'dummy',
				normal = {
					energy_required = 0.5,
					results = {},
					ingredients = {},
					ingredient_count = 0,
				}
			},
		},
		modules = {},
		beacons = {},
		resources = {},
		categories = {
			dummy = {'dummy'},
		},
		machines = {
			{
				name = 'dummy',
				type = 'dummy',
				module_slots = 0,
				crafting_speed = 0,
				energy_usage = 0,
				allowed_effects = {},
				energy_source = {
					type = 'biologic'
				},
			}
		},
		technologies = {},
		languages = {},
		translations = {},
	}
end

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

local function copyIcon(entity, name)
	if name then
		icons_to_copy[name] = true
	end
	if entity then
		icons_to_copy[entity.name] = true
	end
end

local function translateIconPath(entity)
	local icon = entity.icon
	if (entity.icons) then
		icon = entity.icons[1].icon
	end
	if not icon then return end
	return icon:gsub('^__%w+__', pathMapping)
end

local function saveItem(entity)
	local path = translateIconPath(entity)

	icons[entity.name] = icons[entity.name] or {}
	icons[entity.name][entity.type] = path

	local name = entity.name

	if entity.minable and entity.minable.result then
		name = entity.minable.result
	end

	local item = {}
	if meta.items[name] then item = meta.items[name] end

	if not item.icon then item.icon = path end
	if not item.name then item.name = name end
	if not item.type then item.type = entity.type end
	if not item.order then item.order = entity.order end
	meta.items[name] = item
	return path
end

local function finalize()

	local files = {}
	for name in pairs(icons_to_copy) do
		local path
		for i = 1, typesLength do
			if not icons[name] then break end
			path = icons[name][legalTypes[i]]
			if path then
				break
			end
		end
		if not path then
			goto continue
		end
		if not fs.exists(path) and isNode() then
			print(name, path)
			error()
		end

		files[path] = true

		::continue::
	end
	return files
end

local function saveLanguages(moduleName)
	print('loading language ' .. moduleName)
	-- Will be called when parsing a mod
	-- The working directory is different
	for _, language in pairs(fs.readDir('data/' .. moduleName .. '/locale')) do
		for _, filename in pairs(fs.readDir('data/' .. moduleName .. '/locale/' .. language)) do
			local fullname = 'data/' .. moduleName .. '/locale/' .. language .. '/' .. filename
			if filename == 'info.json' then
				zipIt(fullname)
				local content = fs.readFile(fullname)
				local name = dkjson.decode(content)['language-name']
				meta.languages[language] = name
			elseif filename:sub(-4) == '.cfg' then
				zipIt(fullname)
				local ini = loadINI(fullname)
				meta.translations[language] = meta.translations[language] or {}
				for _, groupName in pairs({
						'gui-menu',
						'gui-technology',
						'item-name',
						'entity-name',
						'fluid-name',
						'equipment-name',
						'recipe-name',
						'technology-name',
						''
						}) do
					if ini[groupName] then
						if not meta.translations[language][groupName] then
							meta.translations[language][groupName] = {}
						end
						local group = ini[groupName]
						for k, v in pairs(group) do
							meta.translations[language][groupName][k] = v
						end
					end
				end
			end
		end
	end
end

local function saveQuantorioLanguages()
	for _, file in pairs(fs.readDir('locale')) do
		local language = file:match('(.-)%.')
		if meta.translations[language] then
			local ini = loadINI('locale/' .. file)
			for _, group in pairs(ini) do
				for k, v in pairs(group) do
					meta.translations[language][k] = v
				end
			end
		end
	end
end

local function saveGroup(entity)
	if not meta.groups[entity.name] then
		meta.groups[entity.name] = {
			name = entity.name,
			subgroups = {},
		}
	end
	meta.groups[entity.name].icon = translateIconPath(entity)
	copyIcon(entity)
end

local function saveSubGroup(entity)
	meta.groups[entity.group].subgroups[entity.name] = meta.groups[entity.group].subgroups[entity.name] or {}
	meta.subgroups[entity.name] = entity
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
		'limitation',
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

	local lastResult = nil
	local resultTypeCount = 0

	for difficulty, config in pairs(all) do
		recipe[difficulty] = {
			ingredients = {},
		}
		local count = 0
		for _, ingredient in pairs(config.ingredients) do
			count = count + 1
			if ingredient.type then
				recipe[difficulty].ingredients[ingredient.name] = ingredient.amount
				copyIcon(ingredient)
			else
				recipe[difficulty].ingredients[ingredient[1]] = ingredient[2]
				copyIcon(nil, ingredient[1])
			end
		end
		recipe[difficulty].ingredient_count = count
		local results = {}
		if config.result then
			results[config.result] = config.result_count or 1
			lastResult = config.result
			resultTypeCount = 1
		else
			for _, result in pairs(config.results) do
				results[result.name] = result.amount
				lastResult = result.name
				resultTypeCount = resultTypeCount + 1
			end
		end
		results.type = nil
		recipe[difficulty].results = results
		recipe[difficulty].energy_required = config.energy_required or 0.5
	end

	local name
	if lastResult and lastResult ~= name and resultTypeCount == 1 then
		name = lastResult
		recipe.showName = name
	end

	meta.recipes[entity.name] = recipe

	copyIcon(entity, name)
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

	if entity.pumping_speed then
		entity.resource_categories = {entity.fluid}
		machine.crafting_speed = entity.pumping_speed
		if not meta.recipes[entity.fluid] then
			local recipe =
				{
					name = entity.fluid,
					category = entity.fluid,
					normal = {
						energy_required = 1,
						results = {},
						ingredients = {},
						ingredient_count = 0,
					}
				}
			recipe.normal.results[entity.fluid] = 60
			recipe.showName = entity.fluid
			meta.recipes[entity.fluid] = recipe
		end
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

local function saveTechnology(entity)
	local technology = buildItem(entity, {
		'type',
		'effects',
		'order',
		'prerequisites',
	})
	meta.technologies[entity.name] = technology
end

local function pushGroup(entity)
	if not entity.subgroup then return end
	meta.groups[meta.subgroups[entity.subgroup].group].subgroups[entity.subgroup][entity.name] = true
end

local function parse(data, m)
	-- global
	pathMapping = m

	local mapping = {
		{ name = 'inserter', saver = saveInserter },
		{ name = 'module', saver = saveModule },
		{ name = 'beacon', saver = saveBeacon },
		{ name = 'resource', saver = saveResource },
		{ name = 'recipe', saver = saveRecipe },
		{ name = 'fluid', saver = copyIcon },
		{ name = 'player', saver = saveMachine },
		{ name = 'assembling-machine', saver = saveMachine },
		{ name = 'furnace', saver = saveMachine },
		{ name = 'mining-drill', saver = saveMachine },
		{ name = 'rocket-silo', saver = saveMachine },
		{ name = 'offshore-pump', saver = saveMachine },
		{ name = 'technology', saver = saveTechnology },
	}

	local mappingLength = 13

	for _, entity in pairs(data['item-group']) do
		saveItem(entity)
		saveGroup(entity)
	end

	for _, entity in pairs(data['item-subgroup']) do
		saveItem(entity)
		saveSubGroup(entity)
	end

	for i = 1, typesLength do
		local typeName = legalTypes[i]
		local entities = data[typeName]
		for _, entity in pairs(entities) do
			saveItem(entity)
			pushGroup(entity)
		end
	end

	for i = 1, mappingLength do
		local typeName = mapping[i].name
		local saver = mapping[i].saver
		local entities = data[typeName]

		for _, entity in pairs(entities) do
			if saver then
				saver(entity)
			end
			pushGroup(entity)
		end
	end
end

return {
	init = init,
	parse = parse,
	finalize = finalize,
	saveLanguages = saveLanguages,
	saveQuantorioLanguages = saveQuantorioLanguages,
	getMeta = function ()
		return meta
	end,
}
