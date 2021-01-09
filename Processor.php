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

    public function get_count_per_recipe()
    {
        return $this->data;
    }


    public function get_unique_recipe_count()
    {
        return $this->data;
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
