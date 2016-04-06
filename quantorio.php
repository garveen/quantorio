<?php

require 'Generator.php';

$target = 'public';

if (class_exists('lua')) {

    $lua = new lua;
    $lua->registerCallback('putdata', function ($data) use ($target) {
        (new FactorioGenerator($target))->parseMods('data', $data)->save();

    });
    $mod;
    $lua->registerCallback('php_findfile', function ($path) use (&$mod) {
        $path = str_replace('.', '/', $path);
        var_dump($path);
        if (is_file("core/lualib/{$path}.lua")) {
            return "core/lualib/$path";
        } elseif (is_file("{$mod}/{$path}.lua")) {
            return "{$mod}/{$path}";
        }
    });
    $lua->include('core/prefix.lua');
    foreach (glob('core/lualib/*.lua') as $luafile) {
        $lua->include($luafile);
    }
    foreach (glob('data/*') as $mod) {
        $lua->include("{$mod}/data.lua");
    }
    $lua->eval('putdata(data.raw)');
} else {

    (new FactorioGenerator($target))->parseMods('data')->save();
}
