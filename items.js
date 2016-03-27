items =
{
    "water": {
        "id": "water",
        "is_resource": true,
        "type": "fluid",
        "time": 0.5,
        "capacity": 1,
        "materials": [],
        "assemble_by": []
    },
    "crude-oil": {
        "id": "crude-oil",
        "is_resource": true,
        "type": "resource",
        "hardness": 1,
        "time": 0.5,
        "capacity": 1,
        "materials": [],
        "assemble_by": [
            "pumpjack"
        ]
    },
    "heavy-oil": {
        "id": "heavy-oil",
        "is_resource": false,
        "type": "fluid",
        "time": 0.5,
        "capacity": 1,
        "materials": [],
        "assemble_by": []
    },
    "light-oil": {
        "id": "light-oil",
        "is_resource": false,
        "type": "fluid",
        "time": 0.5,
        "capacity": 1,
        "materials": [],
        "assemble_by": []
    },
    "petroleum-gas": {
        "id": "petroleum-gas",
        "is_resource": false,
        "type": "fluid",
        "time": 0.5,
        "capacity": 1,
        "materials": [],
        "assemble_by": []
    },
    "lubricant": {
        "id": "lubricant",
        "is_resource": false,
        "type": "recipe",
        "time": 1,
        "capacity": 1,
        "materials": {
            "heavy-oil": 1
        },
        "assemble_by": [
            "chemical-plant"
        ]
    },
    "sulfuric-acid": {
        "id": "sulfuric-acid",
        "is_resource": false,
        "type": "recipe",
        "time": 1,
        "capacity": 5,
        "materials": {
            "sulfur": 5,
            "iron-plate": 1,
            "water": 10
        },
        "assemble_by": [
            "chemical-plant"
        ]
    },
    "piercing-bullet-magazine": {
        "id": "piercing-bullet-magazine",
        "is_resource": false,
        "type": "recipe",
        "time": 3,
        "capacity": 1,
        "materials": {
            "copper-plate": 5,
            "steel-plate": 1
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "flame-thrower-ammo": {
        "id": "flame-thrower-ammo",
        "is_resource": false,
        "type": "recipe",
        "time": 3,
        "capacity": 1,
        "materials": {
            "iron-plate": 5,
            "light-oil": 2.5,
            "heavy-oil": 2.5
        },
        "assemble_by": [
            "chemical-plant"
        ]
    },
    "rocket": {
        "id": "rocket",
        "is_resource": false,
        "type": "recipe",
        "time": 8,
        "capacity": 1,
        "materials": {
            "electronic-circuit": 1,
            "explosives": 2,
            "iron-plate": 2
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "explosive-rocket": {
        "id": "explosive-rocket",
        "is_resource": false,
        "type": "recipe",
        "time": 8,
        "capacity": 1,
        "materials": {
            "rocket": 1,
            "explosives": 5
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "shotgun-shell": {
        "id": "shotgun-shell",
        "is_resource": false,
        "type": "recipe",
        "time": 3,
        "capacity": 1,
        "materials": {
            "copper-plate": 2,
            "iron-plate": 2
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "piercing-shotgun-shell": {
        "id": "piercing-shotgun-shell",
        "is_resource": false,
        "type": "recipe",
        "time": 8,
        "capacity": 1,
        "materials": {
            "copper-plate": 2,
            "steel-plate": 2
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "railgun-dart": {
        "id": "railgun-dart",
        "is_resource": false,
        "type": "recipe",
        "time": 8,
        "capacity": 1,
        "materials": {
            "steel-plate": 5,
            "electronic-circuit": 5
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "cannon-shell": {
        "id": "cannon-shell",
        "is_resource": false,
        "type": "recipe",
        "time": 8,
        "capacity": 1,
        "materials": {
            "steel-plate": 4,
            "plastic-bar": 2,
            "explosives": 1
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "explosive-cannon-shell": {
        "id": "explosive-cannon-shell",
        "is_resource": false,
        "type": "recipe",
        "time": 8,
        "capacity": 1,
        "materials": {
            "steel-plate": 4,
            "plastic-bar": 2,
            "explosives": 4
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "heavy-armor": {
        "id": "heavy-armor",
        "is_resource": false,
        "type": "recipe",
        "time": 8,
        "capacity": 1,
        "materials": {
            "copper-plate": 100,
            "steel-plate": 50
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "basic-modular-armor": {
        "id": "basic-modular-armor",
        "is_resource": false,
        "type": "recipe",
        "time": 15,
        "capacity": 1,
        "materials": {
            "advanced-circuit": 30,
            "processing-unit": 5,
            "steel-plate": 50
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "power-armor": {
        "id": "power-armor",
        "is_resource": false,
        "type": "recipe",
        "time": 20,
        "capacity": 1,
        "materials": {
            "processing-unit": 40,
            "electric-engine-unit": 20,
            "steel-plate": 40,
            "alien-artifact": 10
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "power-armor-mk2": {
        "id": "power-armor-mk2",
        "is_resource": false,
        "type": "recipe",
        "time": 25,
        "capacity": 1,
        "materials": {
            "effectivity-module-3": 5,
            "speed-module-3": 5,
            "processing-unit": 40,
            "steel-plate": 40,
            "alien-artifact": 50
        },
        "assemble_by": [
            "assembling-machine-3"
        ]
    },
    "basic-grenade": {
        "id": "basic-grenade",
        "is_resource": false,
        "type": "recipe",
        "time": 8,
        "capacity": 1,
        "materials": {
            "iron-plate": 5,
            "coal": 10
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "poison-capsule": {
        "id": "poison-capsule",
        "is_resource": false,
        "type": "recipe",
        "time": 8,
        "capacity": 1,
        "materials": {
            "steel-plate": 3,
            "electronic-circuit": 3,
            "coal": 10
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "slowdown-capsule": {
        "id": "slowdown-capsule",
        "is_resource": false,
        "type": "recipe",
        "time": 8,
        "capacity": 1,
        "materials": {
            "steel-plate": 2,
            "electronic-circuit": 2,
            "coal": 5
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "defender-capsule": {
        "id": "defender-capsule",
        "is_resource": false,
        "type": "recipe",
        "time": 8,
        "capacity": 1,
        "materials": {
            "piercing-bullet-magazine": 1,
            "electronic-circuit": 2,
            "iron-gear-wheel": 3
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "distractor-capsule": {
        "id": "distractor-capsule",
        "is_resource": false,
        "type": "recipe",
        "time": 15,
        "capacity": 1,
        "materials": {
            "defender-capsule": 4,
            "advanced-circuit": 3
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "destroyer-capsule": {
        "id": "destroyer-capsule",
        "is_resource": false,
        "type": "recipe",
        "time": 15,
        "capacity": 1,
        "materials": {
            "distractor-capsule": 4,
            "speed-module": 1
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "basic-electric-discharge-defense-remote": {
        "id": "basic-electric-discharge-defense-remote",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "electronic-circuit": 1
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "basic-bullet-magazine": {
        "id": "basic-bullet-magazine",
        "is_resource": false,
        "type": "recipe",
        "time": 2,
        "capacity": 1,
        "materials": {
            "iron-plate": 2
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "basic-armor": {
        "id": "basic-armor",
        "is_resource": false,
        "type": "recipe",
        "time": 3,
        "capacity": 1,
        "materials": {
            "iron-plate": 40
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "pistol": {
        "id": "pistol",
        "is_resource": false,
        "type": "recipe",
        "time": 1,
        "capacity": 1,
        "materials": {
            "copper-plate": 5,
            "iron-plate": 5
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "submachine-gun": {
        "id": "submachine-gun",
        "is_resource": false,
        "type": "recipe",
        "time": 3,
        "capacity": 1,
        "materials": {
            "iron-gear-wheel": 10,
            "copper-plate": 5,
            "iron-plate": 10
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "stone-brick": {
        "id": "stone-brick",
        "is_resource": false,
        "type": "recipe",
        "time": 3.5,
        "capacity": 1,
        "materials": {
            "stone": 2
        },
        "assemble_by": [
            "stone-furnace",
            "steel-furnace",
            "electric-furnace"
        ]
    },
    "raw-wood": {
        "id": "raw-wood",
        "is_resource": true,
        "type": "item",
        "time": 0.5,
        "capacity": 1,
        "materials": [],
        "assemble_by": []
    },
    "coal": {
        "id": "coal",
        "is_resource": true,
        "type": "resource",
        "hardness": 0.9,
        "time": 0.5,
        "capacity": 1,
        "materials": [],
        "assemble_by": [
            "basic-mining-drill",
            "burner-mining-drill"
        ]
    },
    "stone": {
        "id": "stone",
        "is_resource": true,
        "type": "resource",
        "hardness": 0.4,
        "time": 0.5,
        "capacity": 1,
        "materials": [],
        "assemble_by": [
            "basic-mining-drill",
            "burner-mining-drill"
        ]
    },
    "iron-ore": {
        "id": "iron-ore",
        "is_resource": true,
        "type": "resource",
        "hardness": 0.9,
        "time": 0.5,
        "capacity": 1,
        "materials": [],
        "assemble_by": [
            "basic-mining-drill",
            "burner-mining-drill"
        ]
    },
    "copper-ore": {
        "id": "copper-ore",
        "is_resource": true,
        "type": "resource",
        "hardness": 0.9,
        "time": 0.5,
        "capacity": 1,
        "materials": [],
        "assemble_by": [
            "basic-mining-drill",
            "burner-mining-drill"
        ]
    },
    "wood": {
        "id": "wood",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 2,
        "materials": {
            "raw-wood": 1
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "iron-plate": {
        "id": "iron-plate",
        "is_resource": false,
        "type": "recipe",
        "time": 3.5,
        "capacity": 1,
        "materials": {
            "iron-ore": 1
        },
        "assemble_by": [
            "stone-furnace",
            "steel-furnace",
            "electric-furnace"
        ]
    },
    "copper-plate": {
        "id": "copper-plate",
        "is_resource": false,
        "type": "recipe",
        "time": 3.5,
        "capacity": 1,
        "materials": {
            "copper-ore": 1
        },
        "assemble_by": [
            "stone-furnace",
            "steel-furnace",
            "electric-furnace"
        ]
    },
    "iron-stick": {
        "id": "iron-stick",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 2,
        "materials": {
            "iron-plate": 1
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "iron-gear-wheel": {
        "id": "iron-gear-wheel",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "iron-plate": 2
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "copper-cable": {
        "id": "copper-cable",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 2,
        "materials": {
            "copper-plate": 1
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "electronic-circuit": {
        "id": "electronic-circuit",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "iron-plate": 1,
            "copper-cable": 3
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "wooden-chest": {
        "id": "wooden-chest",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "wood": 4
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "stone-furnace": {
        "id": "stone-furnace",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "stone": 5
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "burner-mining-drill": {
        "id": "burner-mining-drill",
        "is_resource": false,
        "type": "recipe",
        "time": 2,
        "capacity": 1,
        "materials": {
            "iron-gear-wheel": 3,
            "stone-furnace": 1,
            "iron-plate": 3
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "basic-mining-drill": {
        "id": "basic-mining-drill",
        "is_resource": false,
        "type": "recipe",
        "time": 2,
        "capacity": 1,
        "materials": {
            "electronic-circuit": 3,
            "iron-gear-wheel": 5,
            "iron-plate": 10
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "basic-transport-belt": {
        "id": "basic-transport-belt",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 2,
        "materials": {
            "iron-plate": 1,
            "iron-gear-wheel": 1
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "burner-inserter": {
        "id": "burner-inserter",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "iron-plate": 1,
            "iron-gear-wheel": 1
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "basic-inserter": {
        "id": "basic-inserter",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "electronic-circuit": 1,
            "iron-gear-wheel": 1,
            "iron-plate": 1
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "offshore-pump": {
        "id": "offshore-pump",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "electronic-circuit": 2,
            "pipe": 1,
            "iron-gear-wheel": 1
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "pipe": {
        "id": "pipe",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "iron-plate": 1
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "boiler": {
        "id": "boiler",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "stone-furnace": 1,
            "pipe": 1
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "steam-engine": {
        "id": "steam-engine",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "iron-gear-wheel": 5,
            "pipe": 5,
            "iron-plate": 5
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "small-electric-pole": {
        "id": "small-electric-pole",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 2,
        "materials": {
            "wood": 2,
            "copper-cable": 2
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "radar": {
        "id": "radar",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "electronic-circuit": 5,
            "iron-gear-wheel": 5,
            "iron-plate": 10
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "small-plane": {
        "id": "small-plane",
        "is_resource": false,
        "type": "recipe",
        "time": 30,
        "capacity": 1,
        "materials": {
            "plastic-bar": 100,
            "advanced-circuit": 200,
            "electric-engine-unit": 20,
            "battery": 100
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "small-lamp": {
        "id": "small-lamp",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "electronic-circuit": 1,
            "iron-stick": 3,
            "iron-plate": 1
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "alien-artifact": {
        "id": "alien-artifact",
        "is_resource": true,
        "type": "item",
        "time": 0.5,
        "capacity": 1,
        "materials": [],
        "assemble_by": []
    },
    "pipe-to-ground": {
        "id": "pipe-to-ground",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 2,
        "materials": {
            "pipe": 10,
            "iron-plate": 5
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "assembling-machine-1": {
        "id": "assembling-machine-1",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "electronic-circuit": 3,
            "iron-gear-wheel": 5,
            "iron-plate": 9
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "red-wire": {
        "id": "red-wire",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "electronic-circuit": 1,
            "copper-cable": 1
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "green-wire": {
        "id": "green-wire",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "electronic-circuit": 1,
            "copper-cable": 1
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "repair-pack": {
        "id": "repair-pack",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "electronic-circuit": 1,
            "iron-gear-wheel": 1
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "stone-wall": {
        "id": "stone-wall",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "stone-brick": 5
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "iron-axe": {
        "id": "iron-axe",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "iron-stick": 2,
            "iron-plate": 3
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "gun-turret": {
        "id": "gun-turret",
        "is_resource": false,
        "type": "recipe",
        "time": 10,
        "capacity": 1,
        "materials": {
            "iron-gear-wheel": 10,
            "copper-plate": 10,
            "iron-plate": 20
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "solar-panel-equipment": {
        "id": "solar-panel-equipment",
        "is_resource": false,
        "type": "recipe",
        "time": 10,
        "capacity": 1,
        "materials": {
            "solar-panel": 5,
            "processing-unit": 1,
            "steel-plate": 5
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "fusion-reactor-equipment": {
        "id": "fusion-reactor-equipment",
        "is_resource": false,
        "type": "recipe",
        "time": 10,
        "capacity": 1,
        "materials": {
            "processing-unit": 100,
            "alien-artifact": 30
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "energy-shield-equipment": {
        "id": "energy-shield-equipment",
        "is_resource": false,
        "type": "recipe",
        "time": 10,
        "capacity": 1,
        "materials": {
            "advanced-circuit": 5,
            "steel-plate": 10
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "energy-shield-mk2-equipment": {
        "id": "energy-shield-mk2-equipment",
        "is_resource": false,
        "type": "recipe",
        "time": 10,
        "capacity": 1,
        "materials": {
            "energy-shield-equipment": 10,
            "processing-unit": 10
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "battery-equipment": {
        "id": "battery-equipment",
        "is_resource": false,
        "type": "recipe",
        "time": 10,
        "capacity": 1,
        "materials": {
            "battery": 5,
            "steel-plate": 10
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "battery-mk2-equipment": {
        "id": "battery-mk2-equipment",
        "is_resource": false,
        "type": "recipe",
        "time": 10,
        "capacity": 1,
        "materials": {
            "battery-equipment": 10,
            "processing-unit": 20
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "basic-laser-defense-equipment": {
        "id": "basic-laser-defense-equipment",
        "is_resource": false,
        "type": "recipe",
        "time": 10,
        "capacity": 1,
        "materials": {
            "processing-unit": 1,
            "steel-plate": 5,
            "laser-turret": 5
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "basic-electric-discharge-defense-equipment": {
        "id": "basic-electric-discharge-defense-equipment",
        "is_resource": false,
        "type": "recipe",
        "time": 10,
        "capacity": 1,
        "materials": {
            "processing-unit": 5,
            "steel-plate": 20,
            "laser-turret": 10
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "basic-exoskeleton-equipment": {
        "id": "basic-exoskeleton-equipment",
        "is_resource": false,
        "type": "recipe",
        "time": 10,
        "capacity": 1,
        "materials": {
            "processing-unit": 10,
            "electric-engine-unit": 30,
            "steel-plate": 20
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "personal-roboport-equipment": {
        "id": "personal-roboport-equipment",
        "is_resource": false,
        "type": "recipe",
        "time": 10,
        "capacity": 1,
        "materials": {
            "processing-unit": 10,
            "iron-gear-wheel": 40,
            "steel-plate": 20,
            "battery": 45
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "night-vision-equipment": {
        "id": "night-vision-equipment",
        "is_resource": false,
        "type": "recipe",
        "time": 10,
        "capacity": 1,
        "materials": {
            "advanced-circuit": 5,
            "steel-plate": 10
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "flame-thrower": {
        "id": "flame-thrower",
        "is_resource": false,
        "type": "recipe",
        "time": 10,
        "capacity": 1,
        "materials": {
            "steel-plate": 5,
            "iron-gear-wheel": 10
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "land-mine": {
        "id": "land-mine",
        "is_resource": false,
        "type": "recipe",
        "time": 5,
        "capacity": 4,
        "materials": {
            "steel-plate": 1,
            "explosives": 2
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "rocket-launcher": {
        "id": "rocket-launcher",
        "is_resource": false,
        "type": "recipe",
        "time": 5,
        "capacity": 1,
        "materials": {
            "iron-plate": 5,
            "iron-gear-wheel": 5,
            "electronic-circuit": 5
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "shotgun": {
        "id": "shotgun",
        "is_resource": false,
        "type": "recipe",
        "time": 4,
        "capacity": 1,
        "materials": {
            "iron-plate": 15,
            "iron-gear-wheel": 5,
            "copper-plate": 10,
            "wood": 5
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "combat-shotgun": {
        "id": "combat-shotgun",
        "is_resource": false,
        "type": "recipe",
        "time": 8,
        "capacity": 1,
        "materials": {
            "steel-plate": 15,
            "iron-gear-wheel": 5,
            "copper-plate": 10,
            "wood": 10
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "railgun": {
        "id": "railgun",
        "is_resource": false,
        "type": "recipe",
        "time": 8,
        "capacity": 1,
        "materials": {
            "steel-plate": 15,
            "copper-plate": 15,
            "electronic-circuit": 10,
            "advanced-circuit": 5
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "iron-chest": {
        "id": "iron-chest",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "iron-plate": 8
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "steel-chest": {
        "id": "steel-chest",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "steel-plate": 8
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "smart-chest": {
        "id": "smart-chest",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "steel-chest": 1,
            "electronic-circuit": 3
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "fast-transport-belt": {
        "id": "fast-transport-belt",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "iron-gear-wheel": 5,
            "basic-transport-belt": 1
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "express-transport-belt": {
        "id": "express-transport-belt",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "iron-gear-wheel": 5,
            "fast-transport-belt": 1,
            "lubricant": 2
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "long-handed-inserter": {
        "id": "long-handed-inserter",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "iron-gear-wheel": 1,
            "iron-plate": 1,
            "basic-inserter": 1
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "fast-inserter": {
        "id": "fast-inserter",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "electronic-circuit": 2,
            "iron-plate": 2,
            "basic-inserter": 1
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "smart-inserter": {
        "id": "smart-inserter",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "fast-inserter": 1,
            "electronic-circuit": 4
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "assembling-machine-2": {
        "id": "assembling-machine-2",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "iron-plate": 9,
            "electronic-circuit": 3,
            "iron-gear-wheel": 5,
            "assembling-machine-1": 1
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "assembling-machine-3": {
        "id": "assembling-machine-3",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "speed-module": 4,
            "assembling-machine-2": 2
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "solar-panel": {
        "id": "solar-panel",
        "is_resource": false,
        "type": "recipe",
        "time": 10,
        "capacity": 1,
        "materials": {
            "steel-plate": 5,
            "electronic-circuit": 15,
            "copper-plate": 5
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "diesel-locomotive": {
        "id": "diesel-locomotive",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "engine-unit": 20,
            "electronic-circuit": 10,
            "steel-plate": 30
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "cargo-wagon": {
        "id": "cargo-wagon",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "iron-gear-wheel": 10,
            "iron-plate": 20,
            "steel-plate": 20
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "straight-rail": {
        "id": "straight-rail",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 2,
        "materials": {
            "stone": 1,
            "iron-stick": 1,
            "steel-plate": 1
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "curved-rail": {
        "id": "curved-rail",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 2,
        "materials": {
            "stone": 4,
            "iron-stick": 4,
            "steel-plate": 4
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "player-port": {
        "id": "player-port",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "electronic-circuit": 10,
            "iron-gear-wheel": 5,
            "iron-plate": 1
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "gate": {
        "id": "gate",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "stone-wall": 1,
            "steel-plate": 2,
            "electronic-circuit": 2
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "car": {
        "id": "car",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "engine-unit": 8,
            "iron-plate": 20,
            "steel-plate": 5
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "tank": {
        "id": "tank",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "engine-unit": 16,
            "steel-plate": 50,
            "iron-gear-wheel": 15,
            "advanced-circuit": 5
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "science-pack-1": {
        "id": "science-pack-1",
        "is_resource": false,
        "type": "recipe",
        "time": 5,
        "capacity": 1,
        "materials": {
            "copper-plate": 1,
            "iron-gear-wheel": 1
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "science-pack-2": {
        "id": "science-pack-2",
        "is_resource": false,
        "type": "recipe",
        "time": 6,
        "capacity": 1,
        "materials": {
            "basic-inserter": 1,
            "basic-transport-belt": 1
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "science-pack-3": {
        "id": "science-pack-3",
        "is_resource": false,
        "type": "recipe",
        "time": 12,
        "capacity": 1,
        "materials": {
            "battery": 1,
            "advanced-circuit": 1,
            "smart-inserter": 1,
            "steel-plate": 1
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "alien-science-pack": {
        "id": "alien-science-pack",
        "is_resource": false,
        "type": "recipe",
        "time": 12,
        "capacity": 10,
        "materials": {
            "alien-artifact": 1
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "lab": {
        "id": "lab",
        "is_resource": false,
        "type": "recipe",
        "time": 5,
        "capacity": 1,
        "materials": {
            "electronic-circuit": 10,
            "iron-gear-wheel": 10,
            "basic-transport-belt": 4
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "train-stop": {
        "id": "train-stop",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "electronic-circuit": 5,
            "iron-plate": 10,
            "steel-plate": 3
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "rail-signal": {
        "id": "rail-signal",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "electronic-circuit": 1,
            "iron-plate": 5
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "rail-chain-signal": {
        "id": "rail-chain-signal",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "electronic-circuit": 1,
            "iron-plate": 5
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "steel-plate": {
        "id": "steel-plate",
        "is_resource": false,
        "type": "recipe",
        "time": 17.5,
        "capacity": 1,
        "materials": {
            "iron-plate": 5
        },
        "assemble_by": [
            "stone-furnace",
            "steel-furnace",
            "electric-furnace"
        ]
    },
    "basic-transport-belt-to-ground": {
        "id": "basic-transport-belt-to-ground",
        "is_resource": false,
        "type": "recipe",
        "time": 1,
        "capacity": 2,
        "materials": {
            "iron-plate": 10,
            "basic-transport-belt": 5
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "fast-transport-belt-to-ground": {
        "id": "fast-transport-belt-to-ground",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 2,
        "materials": {
            "iron-gear-wheel": 20,
            "basic-transport-belt-to-ground": 2
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "express-transport-belt-to-ground": {
        "id": "express-transport-belt-to-ground",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 2,
        "materials": {
            "iron-gear-wheel": 40,
            "fast-transport-belt-to-ground": 2
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "basic-splitter": {
        "id": "basic-splitter",
        "is_resource": false,
        "type": "recipe",
        "time": 1,
        "capacity": 1,
        "materials": {
            "electronic-circuit": 5,
            "iron-plate": 5,
            "basic-transport-belt": 4
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "fast-splitter": {
        "id": "fast-splitter",
        "is_resource": false,
        "type": "recipe",
        "time": 2,
        "capacity": 1,
        "materials": {
            "basic-splitter": 1,
            "iron-gear-wheel": 10,
            "electronic-circuit": 10
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "express-splitter": {
        "id": "express-splitter",
        "is_resource": false,
        "type": "recipe",
        "time": 2,
        "capacity": 1,
        "materials": {
            "fast-splitter": 1,
            "iron-gear-wheel": 10,
            "advanced-circuit": 10,
            "lubricant": 8
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "advanced-circuit": {
        "id": "advanced-circuit",
        "is_resource": false,
        "type": "recipe",
        "time": 8,
        "capacity": 1,
        "materials": {
            "electronic-circuit": 2,
            "plastic-bar": 2,
            "copper-cable": 4
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "processing-unit": {
        "id": "processing-unit",
        "is_resource": false,
        "type": "recipe",
        "time": 15,
        "capacity": 1,
        "materials": {
            "electronic-circuit": 20,
            "advanced-circuit": 2,
            "sulfuric-acid": 0.5
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "logistic-robot": {
        "id": "logistic-robot",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "flying-robot-frame": 1,
            "advanced-circuit": 2
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "construction-robot": {
        "id": "construction-robot",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "flying-robot-frame": 1,
            "electronic-circuit": 2
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "logistic-chest-passive-provider": {
        "id": "logistic-chest-passive-provider",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "smart-chest": 1,
            "advanced-circuit": 1
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "logistic-chest-active-provider": {
        "id": "logistic-chest-active-provider",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "smart-chest": 1,
            "advanced-circuit": 1
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "logistic-chest-storage": {
        "id": "logistic-chest-storage",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "smart-chest": 1,
            "advanced-circuit": 1
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "logistic-chest-requester": {
        "id": "logistic-chest-requester",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "smart-chest": 1,
            "advanced-circuit": 1
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "rocket-silo": {
        "id": "rocket-silo",
        "is_resource": false,
        "type": "recipe",
        "time": 30,
        "capacity": 1,
        "materials": {
            "steel-plate": 1000,
            "concrete": 1000,
            "pipe": 100,
            "processing-unit": 200,
            "electric-engine-unit": 200
        },
        "assemble_by": [
            "assembling-machine-3"
        ]
    },
    "roboport": {
        "id": "roboport",
        "is_resource": false,
        "type": "recipe",
        "time": 15,
        "capacity": 1,
        "materials": {
            "steel-plate": 45,
            "iron-gear-wheel": 45,
            "advanced-circuit": 45
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "big-electric-pole": {
        "id": "big-electric-pole",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "steel-plate": 5,
            "copper-plate": 5
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "medium-electric-pole": {
        "id": "medium-electric-pole",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "steel-plate": 2,
            "copper-plate": 2
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "substation": {
        "id": "substation",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "steel-plate": 10,
            "advanced-circuit": 5,
            "copper-plate": 5
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "basic-accumulator": {
        "id": "basic-accumulator",
        "is_resource": false,
        "type": "recipe",
        "time": 10,
        "capacity": 1,
        "materials": {
            "iron-plate": 2,
            "battery": 5
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "steel-furnace": {
        "id": "steel-furnace",
        "is_resource": false,
        "type": "recipe",
        "time": 3,
        "capacity": 1,
        "materials": {
            "steel-plate": 8,
            "stone-brick": 10
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "electric-furnace": {
        "id": "electric-furnace",
        "is_resource": false,
        "type": "recipe",
        "time": 5,
        "capacity": 1,
        "materials": {
            "steel-plate": 15,
            "advanced-circuit": 5,
            "stone-brick": 10
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "basic-beacon": {
        "id": "basic-beacon",
        "is_resource": false,
        "type": "recipe",
        "time": 15,
        "capacity": 1,
        "materials": {
            "electronic-circuit": 20,
            "advanced-circuit": 20,
            "steel-plate": 10,
            "copper-cable": 10
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "storage-tank": {
        "id": "storage-tank",
        "is_resource": false,
        "type": "recipe",
        "time": 3,
        "capacity": 1,
        "materials": {
            "iron-plate": 20,
            "steel-plate": 5
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "small-pump": {
        "id": "small-pump",
        "is_resource": false,
        "type": "recipe",
        "time": 2,
        "capacity": 1,
        "materials": {
            "electric-engine-unit": 1,
            "steel-plate": 1,
            "pipe": 1
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "blueprint": {
        "id": "blueprint",
        "is_resource": false,
        "type": "recipe",
        "time": 1,
        "capacity": 1,
        "materials": {
            "advanced-circuit": 1
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "deconstruction-planner": {
        "id": "deconstruction-planner",
        "is_resource": false,
        "type": "recipe",
        "time": 1,
        "capacity": 1,
        "materials": {
            "advanced-circuit": 1
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "pumpjack": {
        "id": "pumpjack",
        "is_resource": false,
        "type": "recipe",
        "time": 20,
        "capacity": 1,
        "materials": {
            "steel-plate": 15,
            "iron-gear-wheel": 10,
            "electronic-circuit": 10,
            "pipe": 10
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "oil-refinery": {
        "id": "oil-refinery",
        "is_resource": false,
        "type": "recipe",
        "time": 20,
        "capacity": 1,
        "materials": {
            "steel-plate": 15,
            "iron-gear-wheel": 10,
            "stone-brick": 10,
            "electronic-circuit": 10,
            "pipe": 10
        },
        "assemble_by": [
            "assembling-machine-3"
        ]
    },
    "chemical-plant": {
        "id": "chemical-plant",
        "is_resource": false,
        "type": "recipe",
        "time": 10,
        "capacity": 1,
        "materials": {
            "steel-plate": 5,
            "iron-gear-wheel": 5,
            "electronic-circuit": 5,
            "pipe": 5
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "sulfur": {
        "id": "sulfur",
        "is_resource": false,
        "type": "recipe",
        "time": 1,
        "capacity": 2,
        "materials": {
            "water": 3,
            "petroleum-gas": 3
        },
        "assemble_by": [
            "chemical-plant"
        ]
    },
    "empty-barrel": {
        "id": "empty-barrel",
        "is_resource": false,
        "type": "recipe",
        "time": 1,
        "capacity": 1,
        "materials": {
            "steel-plate": 1
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "crude-oil-barrel": {
        "id": "crude-oil-barrel",
        "is_resource": false,
        "type": "item",
        "time": 0.5,
        "capacity": 1,
        "materials": [],
        "assemble_by": []
    },
    "solid-fuel": {
        "id": "solid-fuel",
        "is_resource": false,
        "type": "item",
        "time": 0.5,
        "capacity": 1,
        "materials": [],
        "assemble_by": []
    },
    "plastic-bar": {
        "id": "plastic-bar",
        "is_resource": false,
        "type": "recipe",
        "time": 1,
        "capacity": 2,
        "materials": {
            "petroleum-gas": 3,
            "coal": 1
        },
        "assemble_by": [
            "chemical-plant"
        ]
    },
    "engine-unit": {
        "id": "engine-unit",
        "is_resource": false,
        "type": "recipe",
        "time": 20,
        "capacity": 1,
        "materials": {
            "steel-plate": 1,
            "iron-gear-wheel": 1,
            "pipe": 2
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "electric-engine-unit": {
        "id": "electric-engine-unit",
        "is_resource": false,
        "type": "recipe",
        "time": 20,
        "capacity": 1,
        "materials": {
            "engine-unit": 1,
            "lubricant": 2,
            "electronic-circuit": 2
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "explosives": {
        "id": "explosives",
        "is_resource": false,
        "type": "recipe",
        "time": 5,
        "capacity": 1,
        "materials": {
            "sulfur": 1,
            "coal": 1,
            "water": 1
        },
        "assemble_by": [
            "chemical-plant"
        ]
    },
    "battery": {
        "id": "battery",
        "is_resource": false,
        "type": "recipe",
        "time": 5,
        "capacity": 1,
        "materials": {
            "sulfuric-acid": 2,
            "iron-plate": 1,
            "copper-plate": 1
        },
        "assemble_by": [
            "chemical-plant"
        ]
    },
    "flying-robot-frame": {
        "id": "flying-robot-frame",
        "is_resource": false,
        "type": "recipe",
        "time": 20,
        "capacity": 1,
        "materials": {
            "electric-engine-unit": 1,
            "battery": 2,
            "steel-plate": 1,
            "electronic-circuit": 3
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "arithmetic-combinator": {
        "id": "arithmetic-combinator",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "copper-cable": 5,
            "electronic-circuit": 5
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "decider-combinator": {
        "id": "decider-combinator",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "copper-cable": 5,
            "electronic-circuit": 5
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "constant-combinator": {
        "id": "constant-combinator",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "copper-cable": 5,
            "electronic-circuit": 2
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "low-density-structure": {
        "id": "low-density-structure",
        "is_resource": false,
        "type": "recipe",
        "time": 30,
        "capacity": 1,
        "materials": {
            "steel-plate": 10,
            "copper-plate": 5,
            "plastic-bar": 5
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "rocket-fuel": {
        "id": "rocket-fuel",
        "is_resource": false,
        "type": "recipe",
        "time": 30,
        "capacity": 1,
        "materials": {
            "solid-fuel": 10
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "rocket-control-unit": {
        "id": "rocket-control-unit",
        "is_resource": false,
        "type": "recipe",
        "time": 30,
        "capacity": 1,
        "materials": {
            "processing-unit": 1,
            "speed-module": 1
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "rocket-part": {
        "id": "rocket-part",
        "is_resource": false,
        "type": "recipe",
        "time": 3,
        "capacity": 1,
        "materials": {
            "low-density-structure": 10,
            "rocket-fuel": 10,
            "rocket-control-unit": 10
        },
        "assemble_by": [
            "rocket-silo"
        ]
    },
    "satellite": {
        "id": "satellite",
        "is_resource": false,
        "type": "recipe",
        "time": 3,
        "capacity": 1,
        "materials": {
            "low-density-structure": 100,
            "solar-panel": 100,
            "basic-accumulator": 100,
            "radar": 5,
            "processing-unit": 100,
            "rocket-fuel": 50
        },
        "assemble_by": [
            "assembling-machine-3"
        ]
    },
    "concrete": {
        "id": "concrete",
        "is_resource": false,
        "type": "recipe",
        "time": 10,
        "capacity": 10,
        "materials": {
            "stone-brick": 5,
            "iron-ore": 1,
            "water": 10
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "steel-axe": {
        "id": "steel-axe",
        "is_resource": false,
        "type": "recipe",
        "time": 0.5,
        "capacity": 1,
        "materials": {
            "steel-plate": 5,
            "iron-stick": 2
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "productivity-module": {
        "id": "productivity-module",
        "is_resource": false,
        "type": "recipe",
        "time": 15,
        "capacity": 1,
        "materials": {
            "advanced-circuit": 5,
            "electronic-circuit": 5
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "productivity-module-2": {
        "id": "productivity-module-2",
        "is_resource": false,
        "type": "recipe",
        "time": 30,
        "capacity": 1,
        "materials": {
            "productivity-module": 4,
            "advanced-circuit": 5,
            "processing-unit": 5
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "productivity-module-3": {
        "id": "productivity-module-3",
        "is_resource": false,
        "type": "recipe",
        "time": 60,
        "capacity": 1,
        "materials": {
            "productivity-module-2": 5,
            "advanced-circuit": 5,
            "processing-unit": 5,
            "alien-artifact": 1
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "laser-turret": {
        "id": "laser-turret",
        "is_resource": false,
        "type": "recipe",
        "time": 20,
        "capacity": 1,
        "materials": {
            "steel-plate": 20,
            "electronic-circuit": 20,
            "battery": 12
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "basic-oil-processing": {
        "id": "basic-oil-processing",
        "is_resource": false,
        "type": "recipe",
        "time": 5,
        "capacity": 1,
        "capacities": [
            {
                "type": "fluid",
                "name": "heavy-oil",
                "amount": 3
            },
            {
                "type": "fluid",
                "name": "light-oil",
                "amount": 3
            },
            {
                "type": "fluid",
                "name": "petroleum-gas",
                "amount": 4
            }
        ],
        "materials": {
            "crude-oil": 10
        },
        "assemble_by": [
            "oil-refinery"
        ]
    },
    "advanced-oil-processing": {
        "id": "advanced-oil-processing",
        "is_resource": false,
        "type": "recipe",
        "time": 5,
        "capacity": 1,
        "capacities": [
            {
                "type": "fluid",
                "name": "heavy-oil",
                "amount": 1
            },
            {
                "type": "fluid",
                "name": "light-oil",
                "amount": 4.5
            },
            {
                "type": "fluid",
                "name": "petroleum-gas",
                "amount": 5.5
            }
        ],
        "materials": {
            "water": 5,
            "crude-oil": 10
        },
        "assemble_by": [
            "oil-refinery"
        ]
    },
    "heavy-oil-cracking": {
        "id": "heavy-oil-cracking",
        "is_resource": false,
        "type": "recipe",
        "time": 5,
        "capacity": 3,
        "materials": {
            "water": 3,
            "heavy-oil": 4
        },
        "assemble_by": [
            "chemical-plant"
        ]
    },
    "light-oil-cracking": {
        "id": "light-oil-cracking",
        "is_resource": false,
        "type": "recipe",
        "time": 5,
        "capacity": 2,
        "materials": {
            "water": 3,
            "light-oil": 3
        },
        "assemble_by": [
            "chemical-plant"
        ]
    },
    "solid-fuel-from-light-oil": {
        "id": "solid-fuel-from-light-oil",
        "is_resource": false,
        "type": "recipe",
        "time": 3,
        "capacity": 1,
        "materials": {
            "light-oil": 1
        },
        "assemble_by": [
            "chemical-plant"
        ]
    },
    "solid-fuel-from-petroleum-gas": {
        "id": "solid-fuel-from-petroleum-gas",
        "is_resource": false,
        "type": "recipe",
        "time": 3,
        "capacity": 1,
        "materials": {
            "petroleum-gas": 2
        },
        "assemble_by": [
            "chemical-plant"
        ]
    },
    "solid-fuel-from-heavy-oil": {
        "id": "solid-fuel-from-heavy-oil",
        "is_resource": false,
        "type": "recipe",
        "time": 3,
        "capacity": 1,
        "materials": {
            "heavy-oil": 2
        },
        "assemble_by": [
            "chemical-plant"
        ]
    },
    "fill-crude-oil-barrel": {
        "id": "fill-crude-oil-barrel",
        "is_resource": false,
        "type": "recipe",
        "time": 1,
        "capacity": 1,
        "materials": {
            "crude-oil": 25,
            "empty-barrel": 1
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "empty-crude-oil-barrel": {
        "id": "empty-crude-oil-barrel",
        "is_resource": false,
        "type": "recipe",
        "time": 1,
        "capacity": 1,
        "capacities": [
            {
                "type": "fluid",
                "name": "crude-oil",
                "amount": 25
            },
            {
                "type": "item",
                "name": "empty-barrel",
                "amount": 1
            }
        ],
        "materials": {
            "crude-oil-barrel": 1
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "speed-module": {
        "id": "speed-module",
        "is_resource": false,
        "type": "recipe",
        "time": 15,
        "capacity": 1,
        "materials": {
            "advanced-circuit": 5,
            "electronic-circuit": 5
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "speed-module-2": {
        "id": "speed-module-2",
        "is_resource": false,
        "type": "recipe",
        "time": 30,
        "capacity": 1,
        "materials": {
            "speed-module": 4,
            "processing-unit": 5,
            "advanced-circuit": 5
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "speed-module-3": {
        "id": "speed-module-3",
        "is_resource": false,
        "type": "recipe",
        "time": 60,
        "capacity": 1,
        "materials": {
            "speed-module-2": 4,
            "advanced-circuit": 5,
            "processing-unit": 5,
            "alien-artifact": 1
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "effectivity-module": {
        "id": "effectivity-module",
        "is_resource": false,
        "type": "recipe",
        "time": 15,
        "capacity": 1,
        "materials": {
            "advanced-circuit": 5,
            "electronic-circuit": 5
        },
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "effectivity-module-2": {
        "id": "effectivity-module-2",
        "is_resource": false,
        "type": "recipe",
        "time": 30,
        "capacity": 1,
        "materials": {
            "effectivity-module": 4,
            "advanced-circuit": 5,
            "processing-unit": 5
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    },
    "effectivity-module-3": {
        "id": "effectivity-module-3",
        "is_resource": false,
        "type": "recipe",
        "time": 60,
        "capacity": 1,
        "materials": {
            "effectivity-module-2": 5,
            "advanced-circuit": 5,
            "processing-unit": 5,
            "alien-artifact": 1
        },
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ]
    }
}
