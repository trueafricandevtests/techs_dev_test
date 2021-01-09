<?php

class Processor
{
    private $data = array();

    public function __construct($file_data)
    {
        $this->data = $file_data;
    }

    public function sort_data($data, $delimiter)
    {
    }


    public function cleanUp($data)
    {
        $clean = array();
        foreach ($data as $key => $count) {
            $recipe = str_replace('_', ' ', $key);
            array_push($clean, array("recipe" => $recipe, "count" => $count));
        }
        return $clean;
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
        return $this->cleanUp($dictionary);
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
        return $this->data;
    }

    public function match_by_name()
    {
        return $this->data;
    }
}
