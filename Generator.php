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
    public $technologys = [];
    public $inserters = [];

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
        foreach ($this->subgroups as &$subgroup) {
            ksort($subgroup);
        }
        $this->writeJs('subgroups', $this->subgroups);
        $this->groups['technology']['icon'] = $this->groups['fluids']['icon'];
        $this->groups['technology']['order'] = 'y';
        $orders = [];
        foreach ($this->groups as $k => $group) {
            ksort($this->groups[$k]['subgroups']);
            $orders[] = $group['order'];
        }
        array_multisort($orders, $this->groups);

        $this->writeJs('groups', $this->groups);
        $this->writeJs('machines', $this->machines);

        foreach ($this->categories as $category => $content) {
            $orders = [];
            foreach ($content as $name) {
                if ($name == 'player') {
                    $orders[] = '0';
                } else {
                    $orders[] = $this->items[$name]['order'];
                }
            }
            array_multisort($orders, $this->categories[$category]);
        }
        $this->writeJs('categories', $this->categories);
        $this->writeJs('recipes', $this->recipes);
        $this->writeJs('resources', $this->resources);
        $this->writeJs('items', $this->items);
        $this->writeJs('technologys', $this->technologys);
        $this->writeJs('inserters', $this->inserters);
        foreach ($this->translations as $name => $content) {
            foreach ($content as $k => &$v) {
                if (is_array($v)) {
                    if (count(array_count_values($v)) == 1) {
                        $v = reset($v);
                    }
                }
            }
            $this->writeJs("translations/{$name}", $content, false, "translations['{$name}']=\n");
        }
        $this->languages = array_unique($this->languages);
        sort($this->languages);
        $this->writeJs('translations/list', $this->languages, true, "languages=\n");
        $this->writeData();
        if ($this->descPath != '.') {
            unlink($this->descPath . '/index.htm');
            unlink($this->descPath . '/index.js');
            unlink($this->descPath . '/index.css');
        }
        copy('index.htm', $this->descPath . '/index.htm');
        copy('index.js', $this->descPath . '/index.js');
        copy('index.css', $this->descPath . '/index.css');

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
            'order' => preg_replace('~\[.*?\]~', '', $entity['order']),
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
        if (isset($entity['ingredients'])) {
            $ingredients = $entity['ingredients'];
        } elseif (isset($entity['normal']['ingredients'])) {
            $ingredients = $entity['normal']['ingredients'];
        }
        // var_dump($entity);exit;
        foreach ($ingredients as $ingredient) {
            if (isset($ingredient['type'])) {
                $recipe['ingredients'][$ingredient['name']] = $ingredient['amount'];

            } else {
                $recipe['ingredients'][$ingredient[$this->firstSub]] = $ingredient[$this->firstSub + 1];
            }
        }
        $recipe['ingredient_count'] = count($recipe['ingredients']);
        if (isset($recipe['results']) && count($recipe['results']) == 1) {
            $recipe['result_count'] = $recipe['results'][$this->firstSub]['amount'];
            $recipe['type'] = $recipe['results'][$this->firstSub]['type'];
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
            'researching_speed',
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

    public function saveTechnology($entity)
    {
        $technology = $this->buildItem($entity, [
            'upgrade' => false,
        ]);
        $technology['prerequisites'] = [];
        if (isset($entity['prerequisites'])) {
            foreach ($entity['prerequisites'] as $prerequisite) {
                $technology['prerequisites'][] = $prerequisite;
            }

        }
        foreach ($entity['unit']['ingredients'] as $ingredient) {
            $technology['ingredients'][$ingredient[$this->firstSub]] = $ingredient[$this->firstSub + 1];

        }
        $technology['icon'] = $this->saveIcon($entity['icon']);
        $technology['order'] = preg_replace('~\[.*?\]~', '', $entity['order']);
        $firstOrder = preg_replace('~-.*~', '', $technology['order']);
        $technology['time'] = $entity['unit']['time'];
        $technology['count'] = 1; //$entity['unit']['count'];
        $technology['category'] = 'lab';
        $this->technologys[$entity['name']] = $technology;
        // $this->subgroups["technology-{$firstOrder}"][$entity['name']] = true;
        $this->groups['technology']['subgroups']["technology-{$firstOrder}"] = $firstOrder;

    }

    public function finishTechnologys()
    {
        $calcLevel = function ($name, &$technology) use (&$calcLevel) {
            $maxLevel = -1;
            foreach ($technology['prerequisites'] as $prerequisite_name) {
                $prerequisite = &$this->technologys[$prerequisite_name];
                if (!isset($prerequisite['level'])) {
                    $calcLevel($prerequisite_name, $prerequisite);
                }
                if ($prerequisite['level'] > $maxLevel) {
                    $maxLevel = $prerequisite['level'];
                }
            }
            if ($technology['upgrade']) {
                $technology['level'] = $maxLevel;
            } else {
                $technology['level'] = $maxLevel + 1;
            }

        };
        foreach ($this->technologys as $name => &$technology) {
            $this->subgroups['technology'][] = $name;
            $calcLevel($name, $technology);
            foreach ($technology['prerequisites'] as $prerequisite) {

            }
        }
    }

    public function saveInserter($entity)
    {
        $inserter = [];
        $angles = [];
        $distances = [];
        foreach (['pickup_position', 'insert_position'] as $position) {
            $x = $entity[$position][$this->firstSub];
            $y = $entity[$position][$this->firstSub + 1];

            if ($x == 0) {
                $angles[$position] = pi() / 2 * (($y > 0) - ($y < 0));
            } else {
                $angles[$position] = atan($y / $x);
            }

            $distances[$position] = sqrt($x * $x + $y * $y);
        }
        $angle = abs($angles['pickup_position'] - $angles['insert_position']);
        $rotation_turns_per_minute = 60/*seconds*/ * ($entity['rotation_speed'] * 60/* tick */) * pi() / $angle;

        $delta_distance = abs($distances['pickup_position'] - $distances['insert_position']);
        $extension_turns_per_minute = $delta_distance / $entity['extension_speed'] * 60;
        $inserter['turns_per_minute'] = min($rotation_turns_per_minute, $extension_turns_per_minute);

        // $inserter['icon'] = $this->saveIcon($entity['icon']);
        $this->inserters[$entity['name']] = $inserter;
    }

    public function saveLanguage($path)
    {

        $language = basename(dirname($path));
        $this->languages[] = $language;

        if (isset($this->translations[$language])) {
            $translation = $this->translations[$language];
        } else {
            $translation = [];

            if (is_file($ex = "locale/{$language}.ini")) {
                $translation = parse_ini_file($ex, false, INI_SCANNER_RAW);
            }

        }
        $locale = parse_ini_file($path, true, INI_SCANNER_RAW);
        foreach ([
            'item-name',
            'entity-name',
            'fluid-name',
            'equipment-name',
            'recipe-name',
            'technology-name',
        ] as $groupName) {
            if (isset($locale[$groupName])) {
                $group = $locale[$groupName];
                foreach ($group as $k => $v) {
                    $translation[$k][$groupName] = $v;
                }
            }
        }

        $this->translations[$language] = $translation;

    }

    public function parseEntity($entity)
    {
        $ksort_recursive = function (&$arr) use (&$ksort_recursive) {
            ksort($arr);
            foreach ($arr as $k => &$v) {
                if (is_array($v)) {
                    $ksort_recursive($v);
                }
            }
        };
        $ksort_recursive($entity);

        $checkGroup = function ($entity) {
        };
        if (!isset($entity['type'])) {
            return;
        }
        switch ($entity['type']) {
            case 'item-group':
            case 'item-subgroup':
                if ($entity['type'] == 'item-group') {
                    $groupName = $entity['name'];
                } else {
                    $groupName = $entity['group'];
                }
                if (!isset($this->groups[$groupName])) {
                    $this->groups[$groupName] = ['icon' => '', 'order' => '', 'subgroups' => []];
                }
                if ($entity['type'] == 'item-group') {

                    $this->groups[$entity['name']]['icon'] = $this->saveIcon($entity['icon']);
                    $this->groups[$entity['name']]['order'] = $entity['order'];
                } else {

                    $this->groups[$entity['group']]['subgroups'][$entity['name']] = $entity['order'];
                }
                break;
            case 'inserter':
                $this->saveInserter($entity);
                break;
            case 'technology':
                $this->saveTechnology($entity);
                break;
            case 'lab':
                $this->categories['lab'][] = $entity['name'];
                $this->saveMachine($entity);
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

    protected function buildItem(&$source, $params)
    {
        if (isset($source['normal'])) {
            foreach ($source['normal'] as $k => $v) {
                $source[$k] = $v;
            }
        }
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

    protected function writeJs($name, $content, $concat = true, $prefix = '', $postfix = '')
    {
        if ($sort) {
            ksort($content);
        }

        if ($prefix === '') {
            $prefix = "$name=\n";
        }

        if ($concat) {
            $this->datastr .= $prefix . json_encode($content, JSON_UNESCAPED_UNICODE) . "\n";
        }
        if (!is_dir(dirname("{$this->descPath}/{$name}"))) {
            mkdir(dirname("{$this->descPath}/{$name}"), 0755, true);
        }
        unlink("{$this->descPath}/{$name}.js");
        file_put_contents("{$this->descPath}/{$name}.js", $prefix . json_encode($content, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . "\n") . $postfix;
        var_dump($name);
    }

    protected function writeData()
    {
        unlink("{$this->descPath}/data.js");
        file_put_contents("{$this->descPath}/data.js", $this->datastr);
    }
}
