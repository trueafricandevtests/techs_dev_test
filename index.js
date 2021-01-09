const { count } = require('console');
const fs = require('fs')

// a) Function to load json data
function loadJsonData(filename){
    return JSON.parse(
        fs.existsSync(filename) 
            ? fs.readFileSync(filename).toString() 
            : '" "'
    )
}

// b) function to save json data 
function saveJosnData(filename, gotData){
    return fs.writeFileSync(filename, JSON.stringify(gotData, null, 2))
}

// Main data pool
const data = loadJsonData('data.json');

const uniqueNames = new Set();
data.forEach(recipe => {uniqueNames.add(recipe.recipe)})

console.log(uniqueNames.size)
// const a = [...uniqueNames]
// console.log(a)

const uniqueRecipesTosave = {"unique_recipe_count": uniqueNames.size}

// c) sorting alphabetically
const uniqe = [];
const newData = data.map(item => {
    // console.log(item.recipe === "Mediterranean Baked Veggies")
    if (uniqe.includes(item.recipe)){
        item["count"] += 1
        return item
    } 
    uniqe.push(item.recipe)
    item["count"] = 1
    return  item
})

// c) highest occurence
let mapPostcodes = {}
let maxValue = 0;
let maxPostCount = 0;
const highOccur = data.map(value => value.postcode)

// loop through the array
for(let item of highOccur){
    if(mapPostcodes[item] == null){
        mapPostcodes[item] = 1;
    }else{
        mapPostcodes[item]++
    }

    if(mapPostcodes[item] > maxPostCount){
        maxValue = item;
        maxPostCount = mapPostcodes[item];
    }
}
// console.log(`value : ${maxValue}, Count : ${maxPostCount}`)

const busiest_postcode = {
    "busiest_postcode": {
        "postcode" : maxValue,
        "delivery_count" : maxPostCount

    }
}

// d) List recipe names that contain in their name one of the following words
// console.log(data)


const someKeyWords = data.map(keywords => keywords.recipe)


const containsRecipes = (string) => {
    let newString = string.split(" ")
    return newString.includes("Potato") || newString.includes("Veggie") || newString.includes("Mushroom") 
}
const newMaped = () => someKeyWords.filter(containsRecipes)
// const keyWordFind =(Potato, Veggie, Mushroom) => {
//     someKeyWords.some(
//         recipeName => recipeName.recipe === Potato || recipeName.recipe === Veggie ||  recipeName.recipe === Mushroom )
// }

const ListOfRecipeWords = {
    "match_by_name": newMaped().sort()
}

console.log(ListOfRecipeWords)  

// keyWordFind()


// Display what is unique and the length
// console.log(uniqe, uniqe.length)

saveJosnData('mydata.json',uniqueRecipesTosave)
saveJosnData('sortedItems.json', newData)
saveJosnData('busiest_postcode.json', busiest_postcode)
saveJosnData('keyWordList.json', ListOfRecipeWords)



