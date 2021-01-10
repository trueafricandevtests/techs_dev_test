from app.utils import expose, url_for, application, render_response
from collections import Counter
import json

def preparedata(request):
    postcodes=[]
    recipes=[]
    filter_list=[]

    with open("app/datasets/data.json") as recipe_dataset:
	    dataset = json.load(recipe_dataset)

    if request.method == 'GET':
        if request.args.get('q'):
            filter_list.append(request.args.get('q'))
    else:
        return {"Message":"Method type should be GET"}
    
    for data in dataset:
        recipes.append(data['recipe'])
        postcodes.append(data['postcode'])

    return {"recipes":recipes, "postcodes":postcodes}

@expose('/')
def instructions(request):
    return render_response({
        "count_per_recipe": "GET /count_per_recipe",
        "busiest_postcode": "GET /busiest_postcode",
        "match_by_name": "GET /recipe To get a custom send q=parameter",
        "overall_statistic": "GET /statistic This too generates the json file"
    })


@expose('/statistic')
def statistic_page(request):
    resp=preparedata(request)

    if "Message" in resp:
        return render_response(resp)    
    busiest_postcode=most_frequent(resp['postcodes'])
    statistics_data=[{
        "unique_recipe_count": len(Counter(resp['recipes']).keys()),
        "count_per_recipe": count_per_recipe(resp['recipes']),
        "busiest_postcode": {
            'postcode': busiest_postcode[0], 
            'delivery_count':busiest_postcode[1]
            },
        "match_by_name": recipe_matcher(resp['recipes'])
    }]

    with open('app/datasets/output_data.json', 'w') as outfile:
        json.dump(statistics_data, outfile, indent=4)

    return render_response(statistics_data)

@expose('/count_per_recipe')
def count_recipe(request):
    resp=preparedata(request)
    if "Message" in resp:
        return render_response(resp)
    return render_response({"count_per_recipe": count_per_recipe(resp['recipes']),})


@expose('/busiest_postcode')
def busiest_postcode(request):
    resp=preparedata(request)
    if "Message" in resp:
        return render_response(resp)
    busiest_postcode=most_frequent(resp['postcodes'])

    return render_response({"busiest_postcode": {
            'postcode': busiest_postcode[0], 
            'delivery_count':busiest_postcode[1]
            }})

@expose('/recipe')
def custom_recipe_search(request):
    resp=preparedata(request)
    if "Message" in resp:
        return render_response(resp)
    return render_response({"match_by_name": recipe_matcher(resp['recipes'])})


#Resources
def most_frequent(List): 
    occurence_count = Counter(List) 
    return occurence_count.most_common(1)[0]

def count_per_recipe(recipes):
    count_per_recipe=[]
    seen_recipes=[]
    for recipe in recipes:
        if recipe not in seen_recipes:
            seen_recipes.append(recipe)
            count_per_recipe.append({"recipe": recipe, "count": recipes.count(recipe)})
    
    def realsort(e):
        return e['recipe']

    count_per_recipe.sort(key=realsort)
    return count_per_recipe

def recipe_matcher(recipes,matchers=[]):
    if not matchers:
        matchers = ['Potato','Veggie', 'Mushroom']
    matching = [recipe for recipe in recipes if any(partner in recipe for partner in matchers)]
    return list(set(matching))