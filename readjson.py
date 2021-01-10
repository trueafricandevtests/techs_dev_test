import json


with open('V:/Github/techs_dev_test/data.json') as json_file:
    data1 = json.load(json_file)
    recipe_count = 0
    delivery_count = 0
    data_str_one = []
    data_str_two = []
    data_str_three = []
    data_str_four = []
    data_str_five = []
    unique_recipe_name = []
    post_code1 = []
    post_code2 = []
    fdata = []
    for r in data1:
        data_str_one.append(r['recipe'])
        data_str_two.append(r['recipe'])
        data_str_three.append(r['delivery'])
        data_str_four.append(r['delivery'])
        data_str_five.append(r['postcode'])

    fin_delivery = 0
    unique_recipe_count = 0
    for i in data_str_one:
        recipe_count = 0
        for j in data_str_two:
            if i == j:
                recipe_count += 1
        if recipe_count == 1:
            unique_recipe_name.append(i)
            unique_recipe_count += 1
    test1 = []
    test2 = []
    d = 0
    t = 0
    delivery_length = range(len(data_str_three))
    for d in delivery_length:
        delivery_count = 0
        test1 = data_str_three[d]
        test2 = data_str_five[d]
        t = d + 1
        for t in delivery_length:
            if test1 == data_str_three[t]:
                delivery_count += 1

        if fin_delivery <= delivery_count:
            fin_delivery = delivery_count
            post_code1.append(test2)
            post_code2.append(data_str_three[t])
pc = []
for p in post_code1:
    if p not in pc:
        pc.append(p)

compare_recipe = ['potato','Veggie','mushroom']
listrecipe = []
for crecipe in compare_recipe:
   for drecipe in data_str_one:
        booldata = crecipe in drecipe
        if booldata == True:
            listrecipe.append(drecipe)

unique_recipe_name.sort()
listrecipe.sort()

fdata = f'1.\n[ \n "Unique_recipe_count:" {unique_recipe_count} \n ]'
for fd in unique_recipe_name:
    fdata += f'2.\n[\n "Count_per_recipe": [ \n[\n "recipe": {fd}\n "count": 1\n],'
for postc in pc:
    fdata += f'\n]\n]\n]\n3.\n\n "busiest_postcode": [\n "postcode": {postc}, \n"delivery_count": {fin_delivery}\n]'
fdata += f'\n4.\n"match_by_name": [\n {listrecipe}\n]\n'
with open('C:/Users/HP/Documents/github/data.json', 'w') as outfile:
    json.dump(fdata, outfile)

