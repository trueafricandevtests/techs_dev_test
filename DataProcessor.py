import json
import itertools as it
from collections import Counter

 
f=open('data.json')

data = json.load(f)
Datalength = len(data)
print(Datalength)

#QN1 COUNT THE NUMBER OF UNIQUE RECIPE NAMES
#Creating a list to store unique recipes

NewList=[]
for i in data:
	if i['recipe'] not in NewList:
		NewList.append(i['recipe'])
		print(i['recipe'])

unique_recipe_count = len(NewList)
print("The number of unique recipe names is ", len(NewList))

#QN2 Count the number of occurences for each unique recipe name (alphabetically ordered by recipe name)

#Sorting the list in alphabetical order
NewList.sort()

count_per_recipe = {}
for x in NewList:
	count_per_recipe[x]= 0
	for i in data:
		if x== i['recipe']:
			count_per_recipe[x]+=1
#count= count_per_recipe[x]

count_per_recipe_lst = []
for i in count_per_recipe_lst:
    lst.append({"recipe" : i, "count": count_per_recipe_lst[i]})

for x in count_per_recipe:
	print(x, " has ", count_per_recipe[x], " Occurences")


#QN3 Find the postcode with most delivered recipes.

PostCodeArray=[]
for i in data:
	if i['postcode'] not in NewList:
		PostCodeArray.append(i['postcode'])
PostCodeArray.sort()

Occurences = {}
for x in PostCodeArray:
	Occurences[x]=0
	for i in data:
		if x==i['postcode']:
			Occurences[x]+=1

max_postcode = max(Occurences, key=Occurences.get)
delivery_count = Occurences[max_postcode]

print("Postcode with most recipes is: ", max_postcode, "and it appeared ",Occurences[max_postcode], "times")

# QN4 List the recipe names (alphabetically ordered) that contain in their name one of the following words:
#Potato
#Veggie
#Mushroom

List4 =[]
for x in NewList:
	if x.find("Potato")!=-1 or x.find("Veggie")!=-1 or x.find("Mushroom")!=-1:
		List4.append(x)
List4.sort()

print("The list below contains Potato, Veggie and Mushroom in their names \n")
for i in List4:
	print(i)

f.close()

#Storing the answers in a JSON file format

SortedRecipe = {}
SortedRecipe["unique_recipe_count"]= unique_recipe_count
SortedRecipe["count_per_recipe"]= count_per_recipe_lst
SortedRecipe["busiest_postcode"]={
	"postcode": max_postcode,
	"delivery_count": delivery_count
}
SortedRecipe["match_by_name"]=List4

with open("OutPutFile.json", "w") as outfile:
	json.dump(SortedRecipe, outfile)
