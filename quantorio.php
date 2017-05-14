<?php

require 'Generator.php';

$target = 'public';

if (class_exists('lua')) {

    foreach (glob('core/lualib/*.lua') as $luafile) {
        $content = file_get_contents($luafile);
        if (strpos($content, 'module(') !== false) {
            echo $luafile . "\n";
            preg_match_all('~function\s+([\w\.-_]+)~', $content, $matches);
            $str = '';
            foreach ($matches[1] as $match) {
                if (strpos($match, ':') !== false) {
                    continue;
                }

                $str .= "$match = $match,";
            }
            preg_match_all('~^([\w\.-_]+)\s*=~m', $content, $matches);

            foreach ($matches[1] as $match) {
                if (strpos($match, ':') !== false) {
                    continue;
                }

                $str .= "$match = $match,";
            }
            $str = "return { $str }";
            $content = preg_replace('~module\(.+~', '', $content);
            // var_dump($str);
            $content .= $str;
            file_put_contents($luafile, $content);
        }
        // $lua->eval($content);
    }

    $lua = new lua;
    $lua->registerCallback('putdata', function ($data) use ($target) {
        (new FactorioGenerator($target))->parseMods('data', $data)->save();

    });
    $mod;
    $lua->registerCallback('php_findfile', function ($path) use (&$mod) {
        $ret = null;
        $path = str_replace('.', '/', $path);
        if (is_file("core/lualib/{$path}.lua")) {
            $ret = "core/lualib/$path";
        } elseif (is_file("{$mod}/{$path}.lua")) {
            $ret = "{$mod}/{$path}";
        }
        if ($ret === null) {
            var_dump($ret);
            var_dump($path);
        }
        return $ret;
    });
    $lua->include('core/prefix.lua');
    foreach ([
        'dataloader',
    ] as $luafile) {
        $lua->include("core/lualib/$luafile.lua");
    }

    foreach (glob('data/*') as $mod) {
        $lua->include("{$mod}/data.lua");
    }
    $lua->eval('putdata(data.raw)');
} else {

    (new FactorioGenerator($target))->parseMods('data')->save();
}
