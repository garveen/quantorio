resources =
{
    "stone": {
        "id": "stone",
        "is_resource": true,
        "assemble_by": [
            "basic-mining-drill",
            "burner-mining-drill"
        ],
        "time": 2,
        "capacity": 1,
        "materials": []
    },
    "iron-ore": {
        "id": "iron-ore",
        "is_resource": true,
        "assemble_by": [
            "basic-mining-drill",
            "burner-mining-drill"
        ],
        "time": 2,
        "capacity": 1,
        "materials": []
    },
    "copper-ore": {
        "id": "copper-ore",
        "is_resource": true,
        "assemble_by": [
            "basic-mining-drill",
            "burner-mining-drill"
        ],
        "time": 2,
        "capacity": 1,
        "materials": []
    },
    "coal": {
        "id": "coal",
        "is_resource": true,
        "assemble_by": [
            "basic-mining-drill",
            "burner-mining-drill"
        ],
        "time": 2,
        "capacity": 1,
        "materials": []
    },
    "crude-oil": {
        "id": "crude-oil",
        "is_resource": false,
        "assemble_by": [],
        "time": 0,
        "capacity": 1,
        "materials": []
    },
    "raw-wood": {
        "id": "raw-wood",
        "is_resource": true,
        "assemble_by": [],
        "time": 0,
        "capacity": 1,
        "materials": []
    },
    "alien-artifact": {
        "id": "alien-artifact",
        "is_resource": true,
        "assemble_by": [],
        "time": 0,
        "capacity": 1,
        "materials": []
    },
    "water": {
        "id": "water",
        "is_resource": true,
        "assemble_by": [],
        "time": 0,
        "capacity": 1,
        "materials": []
    },
    "heavy-oil": {
        "id": "heavy-oil",
        "is_resource": false,
        "assemble_by": [],
        "time": 0,
        "capacity": 1,
        "materials": []
    },
    "light-oil": {
        "id": "light-oil",
        "is_resource": false,
        "assemble_by": [],
        "time": 0,
        "capacity": 3,
        "materials": []
    },
    "petroleum-gas": {
        "id": "petroleum-gas",
        "is_resource": false,
        "assemble_by": [],
        "time": 0,
        "capacity": 2,
        "materials": []
    },
    "solid-fuel": {
        "id": "solid-fuel",
        "is_resource": false,
        "assemble_by": [
            "chemical-plant"
        ],
        "time": 3,
        "capacity": 1,
        "materials": [
            {
                "id": "heavy-oil",
                "quantity": "2"
            }
        ]
    },
    "sulfuric-acid": {
        "id": "sulfuric-acid",
        "is_resource": false,
        "assemble_by": [
            "chemical-plant"
        ],
        "time": 1,
        "capacity": 5,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "1"
            },
            {
                "id": "sulfur",
                "quantity": "5"
            },
            {
                "id": "water",
                "quantity": "10"
            }
        ]
    },
    "basic-oil-processing": {
        "id": "basic-oil-processing",
        "is_resource": false,
        "assemble_by": [
            "oil-refinery"
        ],
        "time": 5,
        "capacity": 1,
        "materials": [
            {
                "id": "crude-oil",
                "quantity": "10"
            }
        ]
    },
    "advanced-oil-processing": {
        "id": "advanced-oil-processing",
        "is_resource": false,
        "assemble_by": [
            "oil-refinery"
        ],
        "time": 5,
        "capacity": 1,
        "materials": [
            {
                "id": "water",
                "quantity": "5"
            },
            {
                "id": "crude-oil",
                "quantity": "10"
            }
        ]
    },
    "heavy-oil-cracking": {
        "id": "heavy-oil-cracking",
        "is_resource": false,
        "assemble_by": [
            "chemical-plant"
        ],
        "time": 5,
        "capacity": 1,
        "materials": [
            {
                "id": "water",
                "quantity": "3"
            },
            {
                "id": "heavy-oil",
                "quantity": "4"
            }
        ]
    },
    "light-oil-cracking": {
        "id": "light-oil-cracking",
        "is_resource": false,
        "assemble_by": [
            "chemical-plant"
        ],
        "time": 5,
        "capacity": 1,
        "materials": [
            {
                "id": "water",
                "quantity": "3"
            },
            {
                "id": "light-oil",
                "quantity": "3"
            }
        ]
    },
    "lubricant": {
        "id": "lubricant",
        "is_resource": false,
        "assemble_by": [
            "chemical-plant"
        ],
        "time": 1,
        "capacity": 1,
        "materials": [
            {
                "id": "heavy-oil",
                "quantity": "1"
            }
        ]
    },
    "wood": {
        "id": "wood",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 2,
        "materials": [
            {
                "id": "raw-wood",
                "quantity": "1"
            }
        ]
    },
    "iron-plate": {
        "id": "iron-plate",
        "is_resource": false,
        "assemble_by": [
            "electric-furnace",
            "steel-furnace",
            "stone-furnace"
        ],
        "time": 3.5,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-ore",
                "quantity": "1"
            }
        ]
    },
    "copper-plate": {
        "id": "copper-plate",
        "is_resource": false,
        "assemble_by": [
            "electric-furnace",
            "steel-furnace",
            "stone-furnace"
        ],
        "time": 3.5,
        "capacity": 1,
        "materials": [
            {
                "id": "copper-ore",
                "quantity": "1"
            }
        ]
    },
    "steel-plate": {
        "id": "steel-plate",
        "is_resource": false,
        "assemble_by": [
            "electric-furnace",
            "steel-furnace",
            "stone-furnace"
        ],
        "time": 17.5,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "5"
            }
        ]
    },
    "stone-brick": {
        "id": "stone-brick",
        "is_resource": false,
        "assemble_by": [
            "electric-furnace",
            "steel-furnace",
            "stone-furnace"
        ],
        "time": 3.5,
        "capacity": 1,
        "materials": [
            {
                "id": "stone",
                "quantity": "2"
            }
        ]
    },
    "sulfur": {
        "id": "sulfur",
        "is_resource": false,
        "assemble_by": [
            "chemical-plant"
        ],
        "time": 1,
        "capacity": 2,
        "materials": [
            {
                "id": "water",
                "quantity": "3"
            },
            {
                "id": "petroleum-gas",
                "quantity": "3"
            }
        ]
    },
    "plastic-bar": {
        "id": "plastic-bar",
        "is_resource": false,
        "assemble_by": [
            "chemical-plant"
        ],
        "time": 1,
        "capacity": 2,
        "materials": [
            {
                "id": "coal",
                "quantity": "1"
            },
            {
                "id": "petroleum-gas",
                "quantity": "3"
            }
        ]
    },
    "empty-barrel": {
        "id": "empty-barrel",
        "is_resource": false,
        "assemble_by": [],
        "time": 0,
        "capacity": 1,
        "materials": []
    },
    "fill-crude-oil-barrel": {
        "id": "fill-crude-oil-barrel",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 1,
        "capacity": 1,
        "materials": [
            {
                "id": "empty-barrel",
                "quantity": "1"
            },
            {
                "id": "crude-oil",
                "quantity": "25"
            }
        ]
    },
    "crude-oil-barrel": {
        "id": "crude-oil-barrel",
        "is_resource": false,
        "assemble_by": [],
        "time": 0,
        "capacity": 1,
        "materials": []
    },
    "empty-crude-oil-barrel": {
        "id": "empty-crude-oil-barrel",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 1,
        "capacity": 1,
        "materials": [
            {
                "id": "crude-oil-barrel",
                "quantity": "1"
            }
        ]
    },
    "iron-stick": {
        "id": "iron-stick",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 2,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "1"
            }
        ]
    },
    "iron-gear-wheel": {
        "id": "iron-gear-wheel",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "2"
            }
        ]
    },
    "electronic-circuit": {
        "id": "electronic-circuit",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "1"
            },
            {
                "id": "copper-cable",
                "quantity": "3"
            }
        ]
    },
    "advanced-circuit": {
        "id": "advanced-circuit",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 8,
        "capacity": 1,
        "materials": [
            {
                "id": "plastic-bar",
                "quantity": "2"
            },
            {
                "id": "electronic-circuit",
                "quantity": "2"
            },
            {
                "id": "copper-cable",
                "quantity": "4"
            }
        ]
    },
    "processing-unit": {
        "id": "processing-unit",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 15,
        "capacity": 1,
        "materials": [
            {
                "id": "electronic-circuit",
                "quantity": "20"
            },
            {
                "id": "advanced-circuit",
                "quantity": "2"
            },
            {
                "id": "sulfuric-acid",
                "quantity": "0.5"
            }
        ]
    },
    "engine-unit": {
        "id": "engine-unit",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 20,
        "capacity": 1,
        "materials": [
            {
                "id": "pipe",
                "quantity": "2"
            },
            {
                "id": "steel-plate",
                "quantity": "1"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "1"
            }
        ]
    },
    "electric-engine-unit": {
        "id": "electric-engine-unit",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 20,
        "capacity": 1,
        "materials": [
            {
                "id": "electronic-circuit",
                "quantity": "2"
            },
            {
                "id": "engine-unit",
                "quantity": "1"
            },
            {
                "id": "lubricant",
                "quantity": "2"
            }
        ]
    },
    "explosives": {
        "id": "explosives",
        "is_resource": false,
        "assemble_by": [
            "chemical-plant"
        ],
        "time": 5,
        "capacity": 1,
        "materials": [
            {
                "id": "coal",
                "quantity": "1"
            },
            {
                "id": "sulfur",
                "quantity": "1"
            },
            {
                "id": "water",
                "quantity": "1"
            }
        ]
    },
    "battery": {
        "id": "battery",
        "is_resource": false,
        "assemble_by": [
            "chemical-plant"
        ],
        "time": 5,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "1"
            },
            {
                "id": "copper-plate",
                "quantity": "1"
            },
            {
                "id": "sulfuric-acid",
                "quantity": "2"
            }
        ]
    },
    "flying-robot-frame": {
        "id": "flying-robot-frame",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 20,
        "capacity": 1,
        "materials": [
            {
                "id": "steel-plate",
                "quantity": "1"
            },
            {
                "id": "electronic-circuit",
                "quantity": "3"
            },
            {
                "id": "electric-engine-unit",
                "quantity": "1"
            },
            {
                "id": "battery",
                "quantity": "2"
            }
        ]
    },
    "copper-cable": {
        "id": "copper-cable",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 2,
        "materials": [
            {
                "id": "copper-plate",
                "quantity": "1"
            }
        ]
    },
    "red-wire": {
        "id": "red-wire",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "electronic-circuit",
                "quantity": "1"
            },
            {
                "id": "copper-cable",
                "quantity": "1"
            }
        ]
    },
    "green-wire": {
        "id": "green-wire",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "electronic-circuit",
                "quantity": "1"
            },
            {
                "id": "copper-cable",
                "quantity": "1"
            }
        ]
    },
    "science-pack-1": {
        "id": "science-pack-1",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 5,
        "capacity": 1,
        "materials": [
            {
                "id": "copper-plate",
                "quantity": "1"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "1"
            }
        ]
    },
    "science-pack-2": {
        "id": "science-pack-2",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 6,
        "capacity": 1,
        "materials": [
            {
                "id": "basic-transport-belt",
                "quantity": "1"
            },
            {
                "id": "basic-inserter",
                "quantity": "1"
            }
        ]
    },
    "science-pack-3": {
        "id": "science-pack-3",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 12,
        "capacity": 1,
        "materials": [
            {
                "id": "smart-inserter",
                "quantity": "1"
            },
            {
                "id": "steel-plate",
                "quantity": "1"
            },
            {
                "id": "advanced-circuit",
                "quantity": "1"
            },
            {
                "id": "battery",
                "quantity": "1"
            }
        ]
    },
    "alien-science-pack": {
        "id": "alien-science-pack",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 12,
        "capacity": 10,
        "materials": [
            {
                "id": "alien-artifact",
                "quantity": "1"
            }
        ]
    },
    "wooden-chest": {
        "id": "wooden-chest",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "wood",
                "quantity": "4"
            }
        ]
    },
    "iron-chest": {
        "id": "iron-chest",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "8"
            }
        ]
    },
    "steel-chest": {
        "id": "steel-chest",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "steel-plate",
                "quantity": "8"
            }
        ]
    },
    "smart-chest": {
        "id": "smart-chest",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "steel-chest",
                "quantity": "1"
            },
            {
                "id": "electronic-circuit",
                "quantity": "3"
            }
        ]
    },
    "storage-tank": {
        "id": "storage-tank",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 3,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "20"
            },
            {
                "id": "steel-plate",
                "quantity": "5"
            }
        ]
    },
    "basic-transport-belt": {
        "id": "basic-transport-belt",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 2,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "1"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "1"
            }
        ]
    },
    "fast-transport-belt": {
        "id": "fast-transport-belt",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "basic-transport-belt",
                "quantity": "1"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "5"
            }
        ]
    },
    "express-transport-belt": {
        "id": "express-transport-belt",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "fast-transport-belt",
                "quantity": "1"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "5"
            },
            {
                "id": "lubricant",
                "quantity": "2"
            }
        ]
    },
    "basic-transport-belt-to-ground": {
        "id": "basic-transport-belt-to-ground",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 1,
        "capacity": 2,
        "materials": [
            {
                "id": "basic-transport-belt",
                "quantity": "5"
            },
            {
                "id": "iron-plate",
                "quantity": "10"
            }
        ]
    },
    "fast-transport-belt-to-ground": {
        "id": "fast-transport-belt-to-ground",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 2,
        "materials": [
            {
                "id": "basic-transport-belt-to-ground",
                "quantity": "2"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "20"
            }
        ]
    },
    "express-transport-belt-to-ground": {
        "id": "express-transport-belt-to-ground",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 2,
        "materials": [
            {
                "id": "fast-transport-belt-to-ground",
                "quantity": "2"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "40"
            }
        ]
    },
    "basic-splitter": {
        "id": "basic-splitter",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 1,
        "capacity": 1,
        "materials": [
            {
                "id": "basic-transport-belt",
                "quantity": "4"
            },
            {
                "id": "iron-plate",
                "quantity": "5"
            },
            {
                "id": "electronic-circuit",
                "quantity": "5"
            }
        ]
    },
    "fast-splitter": {
        "id": "fast-splitter",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 2,
        "capacity": 1,
        "materials": [
            {
                "id": "fast-transport-belt",
                "quantity": "4"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "10"
            },
            {
                "id": "electronic-circuit",
                "quantity": "10"
            }
        ]
    },
    "express-splitter": {
        "id": "express-splitter",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 2,
        "capacity": 1,
        "materials": [
            {
                "id": "express-transport-belt",
                "quantity": "4"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "10"
            },
            {
                "id": "advanced-circuit",
                "quantity": "10"
            }
        ]
    },
    "burner-inserter": {
        "id": "burner-inserter",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "1"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "1"
            }
        ]
    },
    "basic-inserter": {
        "id": "basic-inserter",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "1"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "1"
            },
            {
                "id": "electronic-circuit",
                "quantity": "1"
            }
        ]
    },
    "long-handed-inserter": {
        "id": "long-handed-inserter",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "basic-inserter",
                "quantity": "1"
            },
            {
                "id": "iron-plate",
                "quantity": "1"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "1"
            }
        ]
    },
    "fast-inserter": {
        "id": "fast-inserter",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "basic-inserter",
                "quantity": "1"
            },
            {
                "id": "iron-plate",
                "quantity": "2"
            },
            {
                "id": "electronic-circuit",
                "quantity": "2"
            }
        ]
    },
    "smart-inserter": {
        "id": "smart-inserter",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "fast-inserter",
                "quantity": "1"
            },
            {
                "id": "electronic-circuit",
                "quantity": "4"
            }
        ]
    },
    "small-electric-pole": {
        "id": "small-electric-pole",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 2,
        "materials": [
            {
                "id": "wood",
                "quantity": "2"
            },
            {
                "id": "copper-cable",
                "quantity": "2"
            }
        ]
    },
    "medium-electric-pole": {
        "id": "medium-electric-pole",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "copper-plate",
                "quantity": "2"
            },
            {
                "id": "steel-plate",
                "quantity": "2"
            }
        ]
    },
    "big-electric-pole": {
        "id": "big-electric-pole",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "copper-plate",
                "quantity": "5"
            },
            {
                "id": "steel-plate",
                "quantity": "5"
            }
        ]
    },
    "substation": {
        "id": "substation",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "copper-plate",
                "quantity": "5"
            },
            {
                "id": "steel-plate",
                "quantity": "10"
            },
            {
                "id": "advanced-circuit",
                "quantity": "5"
            }
        ]
    },
    "pipe": {
        "id": "pipe",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "1"
            }
        ]
    },
    "pipe-to-ground": {
        "id": "pipe-to-ground",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 2,
        "materials": [
            {
                "id": "pipe",
                "quantity": "10"
            },
            {
                "id": "iron-plate",
                "quantity": "5"
            }
        ]
    },
    "small-pump": {
        "id": "small-pump",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 2,
        "capacity": 1,
        "materials": [
            {
                "id": "pipe",
                "quantity": "1"
            },
            {
                "id": "steel-plate",
                "quantity": "1"
            },
            {
                "id": "electric-engine-unit",
                "quantity": "1"
            }
        ]
    },
    "straight-rail": {
        "id": "straight-rail",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 2,
        "materials": [
            {
                "id": "stone",
                "quantity": "1"
            },
            {
                "id": "steel-plate",
                "quantity": "1"
            },
            {
                "id": "iron-stick",
                "quantity": "1"
            }
        ]
    },
    "curved-rail": {
        "id": "curved-rail",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 2,
        "materials": [
            {
                "id": "stone",
                "quantity": "4"
            },
            {
                "id": "steel-plate",
                "quantity": "4"
            },
            {
                "id": "iron-stick",
                "quantity": "4"
            }
        ]
    },
    "train-stop": {
        "id": "train-stop",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "10"
            },
            {
                "id": "steel-plate",
                "quantity": "3"
            },
            {
                "id": "electronic-circuit",
                "quantity": "5"
            }
        ]
    },
    "rail-signal": {
        "id": "rail-signal",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "5"
            },
            {
                "id": "electronic-circuit",
                "quantity": "1"
            }
        ]
    },
    "diesel-locomotive": {
        "id": "diesel-locomotive",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "steel-plate",
                "quantity": "10"
            },
            {
                "id": "electronic-circuit",
                "quantity": "5"
            },
            {
                "id": "engine-unit",
                "quantity": "15"
            }
        ]
    },
    "cargo-wagon": {
        "id": "cargo-wagon",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "20"
            },
            {
                "id": "steel-plate",
                "quantity": "5"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "10"
            }
        ]
    },
    "car": {
        "id": "car",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "20"
            },
            {
                "id": "steel-plate",
                "quantity": "5"
            },
            {
                "id": "engine-unit",
                "quantity": "8"
            }
        ]
    },
    "logistic-robot": {
        "id": "logistic-robot",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "advanced-circuit",
                "quantity": "2"
            },
            {
                "id": "flying-robot-frame",
                "quantity": "1"
            }
        ]
    },
    "construction-robot": {
        "id": "construction-robot",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "electronic-circuit",
                "quantity": "2"
            },
            {
                "id": "flying-robot-frame",
                "quantity": "1"
            }
        ]
    },
    "logistic-chest-active-provider": {
        "id": "logistic-chest-active-provider",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "smart-chest",
                "quantity": "1"
            },
            {
                "id": "advanced-circuit",
                "quantity": "1"
            }
        ]
    },
    "logistic-chest-passive-provider": {
        "id": "logistic-chest-passive-provider",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "smart-chest",
                "quantity": "1"
            },
            {
                "id": "advanced-circuit",
                "quantity": "1"
            }
        ]
    },
    "logistic-chest-storage": {
        "id": "logistic-chest-storage",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "smart-chest",
                "quantity": "1"
            },
            {
                "id": "advanced-circuit",
                "quantity": "1"
            }
        ]
    },
    "logistic-chest-requester": {
        "id": "logistic-chest-requester",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "smart-chest",
                "quantity": "1"
            },
            {
                "id": "advanced-circuit",
                "quantity": "1"
            }
        ]
    },
    "roboport": {
        "id": "roboport",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 15,
        "capacity": 1,
        "materials": [
            {
                "id": "steel-plate",
                "quantity": "45"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "45"
            },
            {
                "id": "advanced-circuit",
                "quantity": "45"
            }
        ]
    },
    "iron-axe": {
        "id": "iron-axe",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "3"
            },
            {
                "id": "iron-stick",
                "quantity": "2"
            }
        ]
    },
    "steel-axe": {
        "id": "steel-axe",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "steel-plate",
                "quantity": "5"
            },
            {
                "id": "iron-stick",
                "quantity": "2"
            }
        ]
    },
    "repair-pack": {
        "id": "repair-pack",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-gear-wheel",
                "quantity": "1"
            },
            {
                "id": "electronic-circuit",
                "quantity": "1"
            }
        ]
    },
    "blueprint": {
        "id": "blueprint",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 1,
        "capacity": 1,
        "materials": [
            {
                "id": "advanced-circuit",
                "quantity": "1"
            }
        ]
    },
    "deconstruction-planner": {
        "id": "deconstruction-planner",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 1,
        "capacity": 1,
        "materials": [
            {
                "id": "advanced-circuit",
                "quantity": "1"
            }
        ]
    },
    "boiler": {
        "id": "boiler",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "pipe",
                "quantity": "1"
            },
            {
                "id": "stone-furnace",
                "quantity": "1"
            }
        ]
    },
    "steam-engine": {
        "id": "steam-engine",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "pipe",
                "quantity": "5"
            },
            {
                "id": "iron-plate",
                "quantity": "5"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "5"
            }
        ]
    },
    "small-lamp": {
        "id": "small-lamp",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "1"
            },
            {
                "id": "iron-stick",
                "quantity": "3"
            },
            {
                "id": "electronic-circuit",
                "quantity": "1"
            }
        ]
    },
    "solar-panel": {
        "id": "solar-panel",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "copper-plate",
                "quantity": "5"
            },
            {
                "id": "steel-plate",
                "quantity": "5"
            },
            {
                "id": "electronic-circuit",
                "quantity": "15"
            }
        ]
    },
    "basic-accumulator": {
        "id": "basic-accumulator",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "2"
            },
            {
                "id": "battery",
                "quantity": "5"
            }
        ]
    },
    "burner-mining-drill": {
        "id": "burner-mining-drill",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 2,
        "capacity": 1,
        "materials": [
            {
                "id": "stone-furnace",
                "quantity": "1"
            },
            {
                "id": "iron-plate",
                "quantity": "3"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "3"
            }
        ]
    },
    "basic-mining-drill": {
        "id": "basic-mining-drill",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 2,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "10"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "5"
            },
            {
                "id": "electronic-circuit",
                "quantity": "3"
            }
        ]
    },
    "offshore-pump": {
        "id": "offshore-pump",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "pipe",
                "quantity": "1"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "1"
            },
            {
                "id": "electronic-circuit",
                "quantity": "2"
            }
        ]
    },
    "pumpjack": {
        "id": "pumpjack",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 20,
        "capacity": 1,
        "materials": [
            {
                "id": "pipe",
                "quantity": "10"
            },
            {
                "id": "steel-plate",
                "quantity": "15"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "10"
            },
            {
                "id": "electronic-circuit",
                "quantity": "10"
            }
        ]
    },
    "stone-furnace": {
        "id": "stone-furnace",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "stone",
                "quantity": "5"
            }
        ]
    },
    "steel-furnace": {
        "id": "steel-furnace",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 3,
        "capacity": 1,
        "materials": [
            {
                "id": "steel-plate",
                "quantity": "8"
            },
            {
                "id": "stone-brick",
                "quantity": "10"
            }
        ]
    },
    "electric-furnace": {
        "id": "electric-furnace",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 5,
        "capacity": 1,
        "materials": [
            {
                "id": "steel-plate",
                "quantity": "15"
            },
            {
                "id": "stone-brick",
                "quantity": "10"
            },
            {
                "id": "advanced-circuit",
                "quantity": "5"
            }
        ]
    },
    "assembling-machine-1": {
        "id": "assembling-machine-1",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "9"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "5"
            },
            {
                "id": "electronic-circuit",
                "quantity": "3"
            }
        ]
    },
    "assembling-machine-2": {
        "id": "assembling-machine-2",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "assembling-machine-1",
                "quantity": "1"
            },
            {
                "id": "iron-plate",
                "quantity": "9"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "5"
            },
            {
                "id": "electronic-circuit",
                "quantity": "3"
            }
        ]
    },
    "assembling-machine-3": {
        "id": "assembling-machine-3",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "assembling-machine-2",
                "quantity": "1"
            },
            {
                "id": "speed-module",
                "quantity": "4"
            }
        ]
    },
    "oil-refinery": {
        "id": "oil-refinery",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 20,
        "capacity": 1,
        "materials": [
            {
                "id": "pipe",
                "quantity": "10"
            },
            {
                "id": "steel-plate",
                "quantity": "15"
            },
            {
                "id": "stone-brick",
                "quantity": "10"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "10"
            },
            {
                "id": "electronic-circuit",
                "quantity": "10"
            }
        ]
    },
    "chemical-plant": {
        "id": "chemical-plant",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 10,
        "capacity": 1,
        "materials": [
            {
                "id": "pipe",
                "quantity": "5"
            },
            {
                "id": "steel-plate",
                "quantity": "5"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "5"
            },
            {
                "id": "electronic-circuit",
                "quantity": "5"
            }
        ]
    },
    "lab": {
        "id": "lab",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 5,
        "capacity": 1,
        "materials": [
            {
                "id": "basic-transport-belt",
                "quantity": "4"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "10"
            },
            {
                "id": "electronic-circuit",
                "quantity": "10"
            }
        ]
    },
    "basic-beacon": {
        "id": "basic-beacon",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 15,
        "capacity": 1,
        "materials": [
            {
                "id": "steel-plate",
                "quantity": "10"
            },
            {
                "id": "electronic-circuit",
                "quantity": "20"
            },
            {
                "id": "advanced-circuit",
                "quantity": "20"
            },
            {
                "id": "copper-cable",
                "quantity": "10"
            }
        ]
    },
    "speed-module": {
        "id": "speed-module",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 15,
        "capacity": 1,
        "materials": [
            {
                "id": "electronic-circuit",
                "quantity": "5"
            },
            {
                "id": "advanced-circuit",
                "quantity": "5"
            }
        ]
    },
    "speed-module-2": {
        "id": "speed-module-2",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 30,
        "capacity": 1,
        "materials": [
            {
                "id": "speed-module",
                "quantity": "4"
            },
            {
                "id": "advanced-circuit",
                "quantity": "5"
            },
            {
                "id": "processing-unit",
                "quantity": "5"
            }
        ]
    },
    "speed-module-3": {
        "id": "speed-module-3",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 60,
        "capacity": 1,
        "materials": [
            {
                "id": "speed-module-2",
                "quantity": "4"
            },
            {
                "id": "alien-artifact",
                "quantity": "1"
            },
            {
                "id": "advanced-circuit",
                "quantity": "5"
            },
            {
                "id": "processing-unit",
                "quantity": "5"
            }
        ]
    },
    "effectivity-module": {
        "id": "effectivity-module",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 15,
        "capacity": 1,
        "materials": [
            {
                "id": "electronic-circuit",
                "quantity": "5"
            },
            {
                "id": "advanced-circuit",
                "quantity": "5"
            }
        ]
    },
    "effectivity-module-2": {
        "id": "effectivity-module-2",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 30,
        "capacity": 1,
        "materials": [
            {
                "id": "effectivity-module",
                "quantity": "4"
            },
            {
                "id": "advanced-circuit",
                "quantity": "5"
            },
            {
                "id": "processing-unit",
                "quantity": "5"
            }
        ]
    },
    "effectivity-module-3": {
        "id": "effectivity-module-3",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 60,
        "capacity": 1,
        "materials": [
            {
                "id": "effectivity-module-2",
                "quantity": "4"
            },
            {
                "id": "alien-artifact",
                "quantity": "1"
            },
            {
                "id": "advanced-circuit",
                "quantity": "5"
            },
            {
                "id": "processing-unit",
                "quantity": "5"
            }
        ]
    },
    "productivity-module": {
        "id": "productivity-module",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 15,
        "capacity": 1,
        "materials": [
            {
                "id": "electronic-circuit",
                "quantity": "5"
            },
            {
                "id": "advanced-circuit",
                "quantity": "5"
            }
        ]
    },
    "productivity-module-2": {
        "id": "productivity-module-2",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 30,
        "capacity": 1,
        "materials": [
            {
                "id": "productivity-module",
                "quantity": "4"
            },
            {
                "id": "advanced-circuit",
                "quantity": "5"
            },
            {
                "id": "processing-unit",
                "quantity": "5"
            }
        ]
    },
    "productivity-module-3": {
        "id": "productivity-module-3",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 60,
        "capacity": 1,
        "materials": [
            {
                "id": "productivity-module-2",
                "quantity": "4"
            },
            {
                "id": "alien-artifact",
                "quantity": "1"
            },
            {
                "id": "advanced-circuit",
                "quantity": "5"
            },
            {
                "id": "processing-unit",
                "quantity": "5"
            }
        ]
    },
    "pistol": {
        "id": "pistol",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 1,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "5"
            },
            {
                "id": "copper-plate",
                "quantity": "5"
            }
        ]
    },
    "submachine-gun": {
        "id": "submachine-gun",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 3,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "10"
            },
            {
                "id": "copper-plate",
                "quantity": "5"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "10"
            }
        ]
    },
    "shotgun": {
        "id": "shotgun",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 4,
        "capacity": 1,
        "materials": [
            {
                "id": "wood",
                "quantity": "5"
            },
            {
                "id": "iron-plate",
                "quantity": "15"
            },
            {
                "id": "copper-plate",
                "quantity": "10"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "5"
            }
        ]
    },
    "combat-shotgun": {
        "id": "combat-shotgun",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 8,
        "capacity": 1,
        "materials": [
            {
                "id": "wood",
                "quantity": "10"
            },
            {
                "id": "copper-plate",
                "quantity": "10"
            },
            {
                "id": "steel-plate",
                "quantity": "15"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "5"
            }
        ]
    },
    "rocket-launcher": {
        "id": "rocket-launcher",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 5,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "5"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "5"
            },
            {
                "id": "electronic-circuit",
                "quantity": "5"
            }
        ]
    },
    "flame-thrower": {
        "id": "flame-thrower",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 10,
        "capacity": 1,
        "materials": [
            {
                "id": "steel-plate",
                "quantity": "5"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "10"
            }
        ]
    },
    "land-mine": {
        "id": "land-mine",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 5,
        "capacity": 4,
        "materials": [
            {
                "id": "steel-plate",
                "quantity": "1"
            },
            {
                "id": "explosives",
                "quantity": "2"
            }
        ]
    },
    "basic-bullet-magazine": {
        "id": "basic-bullet-magazine",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 2,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "2"
            }
        ]
    },
    "piercing-bullet-magazine": {
        "id": "piercing-bullet-magazine",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 3,
        "capacity": 1,
        "materials": [
            {
                "id": "copper-plate",
                "quantity": "5"
            },
            {
                "id": "steel-plate",
                "quantity": "1"
            }
        ]
    },
    "shotgun-shell": {
        "id": "shotgun-shell",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 3,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "2"
            },
            {
                "id": "copper-plate",
                "quantity": "2"
            }
        ]
    },
    "piercing-shotgun-shell": {
        "id": "piercing-shotgun-shell",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 8,
        "capacity": 1,
        "materials": [
            {
                "id": "copper-plate",
                "quantity": "2"
            },
            {
                "id": "steel-plate",
                "quantity": "2"
            }
        ]
    },
    "rocket": {
        "id": "rocket",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 8,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "2"
            },
            {
                "id": "electronic-circuit",
                "quantity": "1"
            },
            {
                "id": "explosives",
                "quantity": "2"
            }
        ]
    },
    "explosive-rocket": {
        "id": "explosive-rocket",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 8,
        "capacity": 1,
        "materials": [
            {
                "id": "explosives",
                "quantity": "5"
            },
            {
                "id": "rocket",
                "quantity": "1"
            }
        ]
    },
    "flame-thrower-ammo": {
        "id": "flame-thrower-ammo",
        "is_resource": false,
        "assemble_by": [
            "chemical-plant"
        ],
        "time": 3,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "5"
            },
            {
                "id": "heavy-oil",
                "quantity": "2.5"
            },
            {
                "id": "light-oil",
                "quantity": "2.5"
            }
        ]
    },
    "basic-grenade": {
        "id": "basic-grenade",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 8,
        "capacity": 1,
        "materials": [
            {
                "id": "coal",
                "quantity": "10"
            },
            {
                "id": "iron-plate",
                "quantity": "5"
            }
        ]
    },
    "poison-capsule": {
        "id": "poison-capsule",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 8,
        "capacity": 1,
        "materials": [
            {
                "id": "coal",
                "quantity": "10"
            },
            {
                "id": "steel-plate",
                "quantity": "3"
            },
            {
                "id": "electronic-circuit",
                "quantity": "3"
            }
        ]
    },
    "slowdown-capsule": {
        "id": "slowdown-capsule",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 8,
        "capacity": 1,
        "materials": [
            {
                "id": "coal",
                "quantity": "5"
            },
            {
                "id": "steel-plate",
                "quantity": "2"
            },
            {
                "id": "electronic-circuit",
                "quantity": "2"
            }
        ]
    },
    "defender-capsule": {
        "id": "defender-capsule",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 8,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-gear-wheel",
                "quantity": "3"
            },
            {
                "id": "electronic-circuit",
                "quantity": "2"
            },
            {
                "id": "piercing-bullet-magazine",
                "quantity": "1"
            }
        ]
    },
    "distractor-capsule": {
        "id": "distractor-capsule",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 15,
        "capacity": 1,
        "materials": [
            {
                "id": "advanced-circuit",
                "quantity": "3"
            },
            {
                "id": "defender-capsule",
                "quantity": "4"
            }
        ]
    },
    "destroyer-capsule": {
        "id": "destroyer-capsule",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 15,
        "capacity": 1,
        "materials": [
            {
                "id": "speed-module",
                "quantity": "1"
            },
            {
                "id": "distractor-capsule",
                "quantity": "4"
            }
        ]
    },
    "basic-electric-discharge-defense-remote": {
        "id": "basic-electric-discharge-defense-remote",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "electronic-circuit",
                "quantity": "1"
            }
        ]
    },
    "basic-armor": {
        "id": "basic-armor",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 3,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "40"
            }
        ]
    },
    "heavy-armor": {
        "id": "heavy-armor",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 8,
        "capacity": 1,
        "materials": [
            {
                "id": "copper-plate",
                "quantity": "100"
            },
            {
                "id": "steel-plate",
                "quantity": "50"
            }
        ]
    },
    "basic-modular-armor": {
        "id": "basic-modular-armor",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 15,
        "capacity": 1,
        "materials": [
            {
                "id": "steel-plate",
                "quantity": "50"
            },
            {
                "id": "advanced-circuit",
                "quantity": "30"
            },
            {
                "id": "processing-unit",
                "quantity": "5"
            }
        ]
    },
    "power-armor": {
        "id": "power-armor",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 20,
        "capacity": 1,
        "materials": [
            {
                "id": "steel-plate",
                "quantity": "100"
            },
            {
                "id": "alien-artifact",
                "quantity": "10"
            },
            {
                "id": "processing-unit",
                "quantity": "100"
            },
            {
                "id": "electric-engine-unit",
                "quantity": "30"
            }
        ]
    },
    "power-armor-mk2": {
        "id": "power-armor-mk2",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 25,
        "capacity": 1,
        "materials": [
            {
                "id": "speed-module-3",
                "quantity": "5"
            },
            {
                "id": "effectivity-module-3",
                "quantity": "5"
            },
            {
                "id": "steel-plate",
                "quantity": "50"
            },
            {
                "id": "alien-artifact",
                "quantity": "50"
            },
            {
                "id": "processing-unit",
                "quantity": "200"
            }
        ]
    },
    "solar-panel-equipment": {
        "id": "solar-panel-equipment",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 10,
        "capacity": 1,
        "materials": [
            {
                "id": "solar-panel",
                "quantity": "5"
            },
            {
                "id": "steel-plate",
                "quantity": "5"
            },
            {
                "id": "processing-unit",
                "quantity": "1"
            }
        ]
    },
    "fusion-reactor-equipment": {
        "id": "fusion-reactor-equipment",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 10,
        "capacity": 1,
        "materials": [
            {
                "id": "alien-artifact",
                "quantity": "30"
            },
            {
                "id": "processing-unit",
                "quantity": "100"
            }
        ]
    },
    "energy-shield-equipment": {
        "id": "energy-shield-equipment",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 10,
        "capacity": 1,
        "materials": [
            {
                "id": "steel-plate",
                "quantity": "10"
            },
            {
                "id": "advanced-circuit",
                "quantity": "5"
            }
        ]
    },
    "energy-shield-mk2-equipment": {
        "id": "energy-shield-mk2-equipment",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 10,
        "capacity": 1,
        "materials": [
            {
                "id": "processing-unit",
                "quantity": "10"
            },
            {
                "id": "energy-shield-equipment",
                "quantity": "10"
            }
        ]
    },
    "battery-equipment": {
        "id": "battery-equipment",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 10,
        "capacity": 1,
        "materials": [
            {
                "id": "steel-plate",
                "quantity": "10"
            },
            {
                "id": "battery",
                "quantity": "5"
            }
        ]
    },
    "battery-mk2-equipment": {
        "id": "battery-mk2-equipment",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 10,
        "capacity": 1,
        "materials": [
            {
                "id": "processing-unit",
                "quantity": "20"
            },
            {
                "id": "battery",
                "quantity": "10"
            }
        ]
    },
    "basic-laser-defense-equipment": {
        "id": "basic-laser-defense-equipment",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 10,
        "capacity": 1,
        "materials": [
            {
                "id": "steel-plate",
                "quantity": "5"
            },
            {
                "id": "processing-unit",
                "quantity": "1"
            },
            {
                "id": "laser-turret",
                "quantity": "5"
            }
        ]
    },
    "basic-electric-discharge-defense-equipment": {
        "id": "basic-electric-discharge-defense-equipment",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 10,
        "capacity": 1,
        "materials": [
            {
                "id": "steel-plate",
                "quantity": "20"
            },
            {
                "id": "processing-unit",
                "quantity": "5"
            },
            {
                "id": "laser-turret",
                "quantity": "10"
            }
        ]
    },
    "basic-exoskeleton-equipment": {
        "id": "basic-exoskeleton-equipment",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 10,
        "capacity": 1,
        "materials": [
            {
                "id": "steel-plate",
                "quantity": "20"
            },
            {
                "id": "processing-unit",
                "quantity": "10"
            },
            {
                "id": "electric-engine-unit",
                "quantity": "30"
            }
        ]
    },
    "night-vision-equipment": {
        "id": "night-vision-equipment",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 10,
        "capacity": 1,
        "materials": [
            {
                "id": "steel-plate",
                "quantity": "10"
            },
            {
                "id": "advanced-circuit",
                "quantity": "5"
            }
        ]
    },
    "wall": {
        "id": "wall",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-1",
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "stone-brick",
                "quantity": "5"
            }
        ]
    },
    "gun-turret": {
        "id": "gun-turret",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 5,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "10"
            },
            {
                "id": "copper-plate",
                "quantity": "5"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "5"
            }
        ]
    },
    "laser-turret": {
        "id": "laser-turret",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 5,
        "capacity": 1,
        "materials": [
            {
                "id": "steel-plate",
                "quantity": "5"
            },
            {
                "id": "electronic-circuit",
                "quantity": "5"
            },
            {
                "id": "battery",
                "quantity": "3"
            }
        ]
    },
    "radar": {
        "id": "radar",
        "is_resource": false,
        "assemble_by": [
            "assembling-machine-2",
            "assembling-machine-3"
        ],
        "time": 0.5,
        "capacity": 1,
        "materials": [
            {
                "id": "iron-plate",
                "quantity": "10"
            },
            {
                "id": "iron-gear-wheel",
                "quantity": "5"
            },
            {
                "id": "electronic-circuit",
                "quantity": "5"
            }
        ]
    }
}
