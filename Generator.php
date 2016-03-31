<?php
require 'Parser.php';

class FactorioGenerator
{

    public $subgroups = [];
    public $groups = [];
    public $orders = [];
    public $machines = [];
    public $categories = [];
    public $recipes = [];
    public $resources = [];
    public $items = [];
    public $languages = [];
    public $translations = [];

    public $info = [];

    public $datastr = '';

    public $descPath = '.';
    public $basePath = '';
    public $firstSub = 0;

    public function __construct($descPath = '.')
    {
        $this->descPath = rtrim($descPath, '/');
    }

    public function parseMods($path, $data = false)
    {
        $path = rtrim($path, '/') . '/*';
        foreach (glob($path) as $mod) {
            $this->addMod($mod);
        }
        if ($data) {
            $this->firstSub = 1;
            foreach ($data as $types) {
                foreach ($types as $entity) {
                    $this->parseEntity($entity);
                }
            }
            foreach (glob($path) as $mod) {
                $this->parseMod($mod, true);
            }

        } else {
            $this->firstSub = 0;
            foreach (glob($path) as $mod) {
                $this->parseMod($mod);
            }
        }
        return $this;
    }

    public function addMod($path)
    {
        $info = json_decode(file_get_contents("{$path}/info.json"));
        $info->_path = $path;
        $this->info[$info->name] = $info;
    }

    public function parseMod($path, $only_locale = false)
    {
        if ($only_locale) {
            $dirs = ['locale'];
        } else {
            $dirs = ['locale', 'prototypes'];
        }
        foreach ($dirs as $dir) {
            $this->travel($path . '/' . $dir);
        }
    }

    public function save()
    {
        $this->writeJs('subgroups', $this->subgroups);
        foreach ($this->groups as $k => $group) {
            asort($this->groups[$k]['subgroups']);
        }
        array_multisort(array_unique($this->orders), $this->groups);

        $this->writeJs('groups', $this->groups);
        $this->writeJs('machines', $this->machines);
        $this->writeJs('categories', $this->categories);
        $this->writeJs('recipes', $this->recipes);
        $this->writeJs('resources', $this->resources);
        $this->writeJs('items', $this->items);
        foreach ($this->translations as $name => $content) {
            $this->writeJs("translations/{$name}", $content, '', false);
        }
        $this->languages = array_unique($this->languages);
        sort($this->languages);
        $this->writeJs('translations/list', $this->languages, 'languages');
        $this->writeData();
        copy('index.htm', $this->descPath . '/index.htm');
        copy('index.js', $this->descPath . '/index.js');

    }

    public function convertPath($path, $is_source)
    {
        return preg_replace_callback('~__([^_]+?)__~', function ($matches) use ($is_source) {
            if (isset($this->info[$matches[1]])) {
                if ($is_source) {
                    return $this->info[$matches[1]]->_path;
                } else {
                    return $matches[1];
                }
            } else {
                return $matches[0];
            }
        }, $path);
    }

    public function saveIcon($file)
    {
        $converted = $this->convertPath($file, false);
        $source = $this->convertPath($file, true);
        $target = $this->descPath . '/graphics/' . $converted;
        if (!is_file($target)) {
            $dir = dirname($target);
            if (!is_dir($dir)) {
                mkdir($dir, 0755, true);
            }
            if (is_file($source)) {
                copy($source, $target);
            }
        }
        return 'graphics/' . $converted;
    }

    public function saveItem($entity)
    {
        if (!isset($entity['icon']) || !isset($entity['order'])) {
            return;
        }
        $item = [
            'order' => $entity['order'],
            'icon' => $this->saveIcon($entity['icon']),
        ];

        $this->items[$entity['name']] = $item;
    }

    public function saveResource($entity)
    {
        $resource = $this->buildItem($entity, [
            'category' => 'basic-solid',
        ]);
        $resource['hardness'] = $entity['minable']['hardness'];
        $resource['mining_time'] = $entity['minable']['mining_time'];
        $this->resources[$entity['name']] = $resource;

    }

    public function saveRecipe($entity)
    {
        $recipe = $this->buildItem($entity, [
            'result_count' => 1,
            'category' => 'crafting',
            'energy_required' => 0.5,
            'results',
        ]);
        $recipe['ingredients'] = [];
        foreach ($entity['ingredients'] as $ingredient) {
            if (isset($ingredient['type'])) {
                $recipe['ingredients'][$ingredient['name']] = $ingredient['amount'];

            } else {
                $recipe['ingredients'][$ingredient[$this->firstSub]] = $ingredient[$this->firstSub + 1];
            }
        }
        $recipe['ingredient_count'] = count($recipe['ingredients']);
        if (isset($recipe['results']) && count($recipe['results']) == 1) {
            $recipe['result_count'] = $recipe['results'][$this->firstSub]['amount'];
            unset($recipe['results']);
        }
        $this->recipes[$entity['name']] = $recipe;
    }

    public function saveMachine($entity)
    {

        $machine = $this->buildItem($entity, [
            'type',
            'crafting_speed' => 1,
            'mining_speed',
            'mining_power',
            'ingredient_count',
            'energy_source' => [],
            'energy_usage' => 0,
            'drain',
        ]);
        if (
            isset($machine['energy_source']) &&
            isset($machine['energy_source']['emissions']) &&
            preg_match('~([0-9.]+)\s*/\s*([0-9.]+)~', $machine['energy_source']['emissions'], $match)
        ) {
            $machine['energy_source']['emissions'] = $match[1] / $match[2];
        }

        $machine['energy_usage'] = (int) $machine['energy_usage'];

        unset($machine['energy_source']['smoke']);
        unset($machine['energy_source']['fuel_inventory_size']);
        unset($machine['energy_source']['usage_priority']);
        isset($machine['energy_source']['type']) or $machine['energy_source']['type'] = 'biologic';
        isset($machine['energy_source']['emissions']) or $machine['energy_source']['emissions'] = 0;
        foreach (['resource_categories', 'crafting_categories'] as $category_group) {
            if (isset($entity[$category_group])) {
                foreach ($entity[$category_group] as $category) {
                    $this->categories[$category][] = $entity['name'];
                }
            }
        }

        $this->machines[$entity['name']] = $machine;

    }

    public function saveLanguage($path)
    {

        $language = basename(dirname($path));
        $this->languages[] = $language;

        $locale = parse_ini_file($path, true, INI_SCANNER_RAW);
        $translation = [];
        foreach ([
            'item-name',
            'entity-name',
            'fluid-name',
            'equipment-name',
            'recipe-name',
        ] as $group) {
            if (isset($locale[$group])) {
                $translation = array_merge($translation, $locale[$group]);
            }

        }

        if (is_file($ex = "locale/{$language}.ini")) {
            $translation = array_merge($translation, parse_ini_file($ex, false, INI_SCANNER_RAW));
        }
        if (isset($this->translations[$language])) {
            $this->translations[$language] = array_merge($this->translations[$language], $translation);
        } else {
            $this->translations[$language] = $translation;

        }

    }

    public function parseEntity($entity)
    {

        if (!isset($entity['type'])) {
            return;
        }
        switch ($entity['type']) {
            case 'item-group':
                $this->groups[$entity['name']]['icon'] = $this->saveIcon($entity['icon']);
                $this->groups[$entity['name']]['order'] = $entity['order'];
                $this->orders[] = $entity['order'];
                break;
            case 'item-subgroup':
                $this->groups[$entity['group']]['subgroups'][$entity['name']] = $entity['order'];
                break;
            case 'technology':
                break;
            case 'resource':
            case 'recipe':
                $this->{"save{$entity['type']}"}($entity);
            default:
                $this->saveItem($entity);
                break;

        }
        if (isset($entity['subgroup']) && !isset($this->subgroups[$entity['subgroup']][$entity['name']])) {
            $this->subgroups[$entity['subgroup']][$entity['name']] = true;
        }

        if (isset($entity['crafting_categories']) || isset($entity['resource_categories'])) {

            $this->saveMachine($entity);
        }
    }
    public function travel($currentPath)
    {
        foreach (glob($currentPath) as $path) {
            if (is_dir($path)) {
                $this->travel($path . '/*');
                continue;
            }
            if ('cfg' == $ext = pathinfo($path, PATHINFO_EXTENSION)) {
                $this->saveLanguage($path);
            } elseif ('lua' == $ext) {
                echo "Parsing $path...\n";
                $result = ((new FactorioLuaParser)->parseFile($path));
                if (!$result) {
                    continue;
                }

                foreach ($result as $field) {
                    if (!isset($field[0]) || !isset($field[0][0])) {
                        continue;
                    }

                    foreach ($field[0][0] as $entity) {
                        $this->parseEntity($entity);
                    }
                }
            }
        }
    }

    protected function buildItem($source, $params)
    {
        $target = [];
        foreach ($params as $param => $default) {
            $has_default = true;
            if (is_int($param)) {
                $param = $default;
                $has_default = false;
            }
            if (isset($source[$param])) {
                $target[$param] = $source[$param];
            } else {
                $has_default and $target[$param] = $default;
            }
        }
        return $target;
    }

    protected function writeJs($name, $content, $prefix = true, $concat = true)
    {
        $prefix = true === $prefix ? $name . "=\n" : ($prefix ? $prefix . " =\n" : '');
        if ($concat) {
            $this->datastr .= $prefix . json_encode($content, JSON_UNESCAPED_UNICODE) . "\n";
        }
        if (!is_dir(dirname("{$this->descPath}/{$name}"))) {
            mkdir(dirname("{$this->descPath}/{$name}"), 0755, true);
        }
        file_put_contents("{$this->descPath}/{$name}.js", $prefix . json_encode($content, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . "\n");
        var_dump($name);
    }

    protected function writeData()
    {
        unlink("{$this->descPath}/data.js");
        file_put_contents("{$this->descPath}/data.js", $this->datastr);
    }
}
