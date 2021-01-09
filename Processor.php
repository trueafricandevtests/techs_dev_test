<?php

class Processor
{
    private $data = array();
    private $search_term = '';

    public function __construct($file_data)
    {
        $this->data = $file_data;
    }

    public function get_count_per_recipe()
    {
        $dictionary = array();
        foreach ($this->data as $recipe) {
            $recipe_name = $recipe['recipe'];
            $key = str_replace(' ', '_', $recipe_name);
            if (array_key_exists($key, $dictionary)) {
                $dictionary[$key] = (int) $dictionary[$key] + 1;
            } else {
                $dictionary[$key] = 1;
            }
        }
        return array_map(function ($count, $key) {
            $recipe = str_replace('_', ' ', $key);
            return  array("recipe" => $recipe, "count" => $count);
        }, $dictionary, array_keys($dictionary));
    }


    public function get_unique_recipe_count()
    {
        $unique =  0;
        $tallied_recipes = $this->get_count_per_recipe();
        foreach ($tallied_recipes  as $recipe) {
            if ($recipe['count'] === 1) {
                $unique += 1;
            }
        }
        return array("unique_recipe_count" => $unique);
    }

    public function get_busiest_postcode()
    {
        $dictionary = array();
        foreach ($this->data as $recipe) {
            $postcode = $recipe['postcode'];
            if (array_key_exists($postcode, $dictionary)) {
                $dictionary[$postcode] = (int) $dictionary[$postcode] + 1;
            } else {
                $dictionary[$postcode] = 1;
            }
        }
        arsort($dictionary);
        $busiest_post_code  = array_keys($dictionary)[0];
        return array(
            "postcode" => $busiest_post_code,
            "delivery_count" => $dictionary[$busiest_post_code]
        );
    }

    public function match_by_name($name)
    {
        $this->search_term = $name;
        $found_recipes = array_filter($this->data, function ($value) {
            return strpos(strtolower($value['recipe']), strtolower($this->search_term));
        });
        return array_map(function ($value) {
            return $value['recipe'];
        }, array_values($found_recipes));
    }
}
