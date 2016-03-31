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
        foreach($fields as $str) {
            $str = trim($str);
            if(!preg_match('~^\(\s*\{~', $str)) continue;

            $str = preg_replace('~^\s*--\s.*$~m', '', $str);
            $len = strlen($str);
            $stack = [];
            $current = '';
            $key = '';
            $in_string = '';
            $is_string = false;

            $root = new Node;
            $chain = [$root];
            $node = $root;

            for ($i = 0; $i < $len; $i++) {
                $chr = $str[$i];
                if ($in_string) {
                    if ($in_string == $chr) {
                        $in_string = '';
                    } else {
                        $current .= $chr;
                    }
                }elseif ($chr == "'" || $chr == '"') {
                        $is_string = true;
                        $in_string = $chr;
                } elseif ($chr == '[' || $chr == '(' || $chr == '{') {

                    $son = new Node;
                    $chain[] = $son;
                    $node->push($key, $son, false);
                    $node = $son;
                    $key = '';
                    $current = '';
                    $is_string = false;

                } elseif ($chr == ']' || $chr == ')' || $chr == '}') {
                    if ($current) {

                        $node->push($key, $current, $is_string);
                        $current = '';
                        $is_string = false;
                    }
                    array_pop($chain);
                    $node = end($chain);

                } elseif ($chr == '=') {
                    $key = $current;
                    $current = '';
                } elseif ($chr == ',') {
                    if ($current) {
                        $node->push($key, $current, $is_string);

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
        return $returns;
    }
}

class Node implements ArrayAccess, Iterator, Countable, JsonSerializable
{
    protected $data = [];
    public function rewind()
    {
        return reset($this->data);
    }

    public function current()
    {
        return current($this->data);
    }

    public function key()
    {
        return key($this->data);
    }

    public function next()
    {
        return next($this->data);
    }

    public function valid()
    {
        return isset($this->data[$this->key()]);
    }
    public function offsetExists($key)
    {
        return isset($this->data[$key]);
    }
    public function offsetSet($key, $value)
    {
        $this->data[$key] = $value;
    }
    public function offsetGet($key)
    {
        return $this->data[$key];
    }
    public function offsetUnset($key)
    {
        unset($this->data[$Key]);
    }
    public function push($key, $value, $is_string)
    {
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
            $this->data[] = $value;
        } else {
            $this->data[$key] = $value;
        }
    }
    public function toArray()
    {
        return $this->data;
    }

    public function count() {
        return count($this->data);
    }

    public function jsonSerialize() {
        return $this->data;
    }

    public function __get($key)
    {
        if(!isset($this->data[$key])) {
            debug_print_backtrace();
        }
        return $this->data[$key];
    }
    public function __set($key, $value)
    {
        return $this->data[$key] = $value;
    }

    public function __unset($key)
    {
        unset($this->data[$key]);
    }

    public function __isset($key)
    {
        return $this->offsetExists($key);
    }
}
