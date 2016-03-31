<?php

class FactorioLuaParser
{
    public function parseFile($filename)
    {
        return $this->parseString(file_get_contents($filename));

    }

    public function parseString($str)
    {
        if (strpos($str, 'data:extend') === false) {
            return null;
        }

        $fields = preg_split('~(data:extend)~', $str);
        $returns = [];
        foreach ($fields as $str) {
            $str = trim($str);
            if (!preg_match('~^\(\s*\{~', $str)) {
                continue;
            }

            $str = preg_replace('~^\s*--\s.*$~m', '', $str);
            $len = strlen($str);
            $current = '';
            $key = '';
            $in_string = '';
            $is_string = false;

            $root = [];
            $chain = [ & $root];
            $node = &$root;

            for ($i = 0; $i < $len; $i++) {
                $chr = $str[$i];
                if ($in_string) {
                    if ($in_string == $chr) {
                        $in_string = '';
                    } else {
                        $current .= $chr;
                    }
                } elseif ($chr == "'" || $chr == '"') {
                    $is_string = true;
                    $in_string = $chr;
                } elseif ($chr == '[' || $chr == '(' || $chr == '{') {
                    unset($son);
                    $son = [];
                    $chain[] = &$son;
                    if ($key === '') {
                        $node[] = &$son;
                    } else {
                        $node[$key] = &$son;
                    }
                    end($chain);
                    unset($node);
                    $node = &$chain[key($chain)];
                    // $this->push($node, $key, &$son, $is_string);
                    // $node = &$son;
                    $key = '';
                    $current = '';
                    $is_string = false;

                } elseif ($chr == ']' || $chr == ')' || $chr == '}') {
                    if ($current) {

                        $this->push($node, $key, $current, $is_string);
                        $current = '';
                        $is_string = false;
                    }
                    array_pop($chain);
                    end($chain);
                    unset($node);
                    $node = &$chain[key($chain)];

                } elseif ($chr == '=') {
                    $key = $current;
                    $current = '';
                } elseif ($chr == ',') {
                    if ($current) {
                        $this->push($node, $key, $current, $is_string);
                    }
                    $key = '';
                    $current = '';
                    $is_string = false;
                } elseif (trim($chr) !== '') {
                    $current .= $chr;
                }
            }
            $returns[] = $root;
        }
        // var_dump($returns);
        // exit;
        return $returns;
    }

    public function push(&$node, $key, $value, $is_string)
    {
        // var_dump($key, $value);
        if (!$is_string) {
            if ($value == 'false') {
                $value = false;
            } elseif ($value == 'true') {
                $value = true;
            } elseif (is_numeric($value)) {
                if (strpos($value, '.') !== false) {
                    $value = (float) $value;
                } else {
                    $value = (int) $value;
                }
            }

        }
        if ($key === '') {
            $node[] = $value;
        } else {
            $node[$key] = $value;
        }
    }
}
