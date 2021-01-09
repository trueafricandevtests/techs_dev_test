
import json


class Recipe:

    def __init__(self):
        
        self.input_file = 'data.json'
        self.output_file = 'output.json'
        self.match_by_names = ['Steak', 'Baked', 'Mushroom']
        
        # read both input and output json files
        with open(self.input_file) as input_json_file:
            self.recipes = json.load(input_json_file)
        
        with open(self.output_file) as output_json_file:
            self.json_data = json.load(output_json_file) if type(
                output_json_file) == list else []

    def unique_recipe_names(self):

        # get unique recipe names as a set
        self.unique_recipes = set([recipe['recipe']
                                   for recipe in self.recipes])

        self.json_data.append({"unique_recipe_count": len(
            self.unique_recipes)})

    def recipe_ocurrences_count(self):
        count_per_recipe = []
        for unique_recipe in sorted(self.unique_recipes):
            recipe_count = 0
            for recipe in self.recipes:
                if recipe["recipe"] == unique_recipe:
                    recipe_count += 1

            count_per_recipe.append({
                "recipe": unique_recipe,
                "count": recipe_count
            })

        self.json_data.append({"count_per_recipe": count_per_recipe})

    def busiest_postcode(self):
        max_delivered_recipe = {}
        recipes_delivery_count = []

        for recipe in self.recipes:
            if not any(recipe['postcode'] == recipes_delivered['postcode'] for recipes_delivered in recipes_delivery_count):

                recipes_delivery_count.append(
                    {"postcode": recipe['postcode'], "delivery_count": 1})
            else:
                for recipes_delivered in recipes_delivery_count:
                    if recipes_delivered["postcode"] == recipe['postcode']:
                        recipes_delivered["delivery_count"] = recipes_delivered["delivery_count"] + 1

        for recipes_delivery in recipes_delivery_count:
            if not max_delivered_recipe:
                max_delivered_recipe = recipes_delivery

            elif recipes_delivery["delivery_count"] > max_delivered_recipe["delivery_count"]:
                max_delivered_recipe = recipes_delivery

        self.json_data.append({"busiest_postcode": max_delivered_recipe})

    def recipe_names_with_words(self):
        recipe_with_word = []

        for recipe in self.unique_recipes:
            if any(match_by_name in recipe for match_by_name in self.match_by_names):
                recipe_with_word.append(recipe)

        self.json_data.append({"match_by_name": sorted(recipe_with_word)})

    # function to add to JSON
    def write_json(self, data):
        with open(self.output_file, 'w') as out_file:
            json.dump(data, out_file, indent=4)

    # run all recipes functions and write to json file
    def run_recipe_fun(self):
        self.unique_recipe_names()
        self.recipe_ocurrences_count()
        self.busiest_postcode()
        self.recipe_names_with_words()
        self.write_json(self.json_data)
