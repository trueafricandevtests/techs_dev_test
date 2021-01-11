'use strict'

const fs = require('fs');
const http = require('http')

let parsedData;

// IIFE that loads the data.json fiel and parses it into a javascript object
// load date
(()=>{
    try {
        const data = fs.readFileSync('./data.json')
        parsedData = JSON.parse(data)
    } catch (err) {
        console.log(err)
    }
})()


// This particular function generate an hash of recipeNames with an array of deliveryCount and the postcal code associated with the recipe
// making the algo efficient O(n) instead of looping each and every time we want to proecss the data
 const processData = (data) => {
    const hash = {}
    data && data.map(order => {
        if (hash[order.recipe]) {
            hash[order.recipe][0] += 1
        } else {
            hash[order.recipe] = [1, order.postcode]
        }
    })
    return hash;
}

const recipeHash = processData(parsedData)
const recipeNames = Object.keys(recipeHash).sort()
let busiestPostcalCode = {}

// Returns the total unique recipes in the data.json file

const countRecipes = () => {
    return { "unique_recipe_count": recipeNames.length }
}

// return an hash of unique recipe names with there frequency of delivery
const uniqueRecipeNamesCount = () => {
    const count = []
    let maxCount = 0
    recipeNames.map(name => {
        count.push({
            recipe: name,
            count: recipeHash[name][0]
        })
        // update the reipeName with max count
        if (recipeHash[name][0] > maxCount) {
            maxCount = recipeHash[name][0];
            busiestPostcalCode = {
                postcode: recipeHash[name][1],
                delivery_count: maxCount
            }
        }

    })

    return count

}


const busiestRecipePostcalCode = () => {
    return ({
        busiest_postcode: busiestPostcalCode
    })
}

// Filter the recipe names based on the search params

const customSearchQuery = ['Potato','Mushroom', 'Veggie']

const searchByCriteria = (queryList, names)=> { 
    const matchRegex = new RegExp(queryList.join("|"), 'ig')
    let  filterdList = []
    names.forEach((name)=>matchRegex.test(name) ? filterdList.push(name) : '') 
    return ({"martch_by_name":filterdList})
}


//  format the final response before exporting the module
const response = {
    ...countRecipes(),
    cout_per_recipe: [...uniqueRecipeNamesCount()], 
    busiest_postcode: busiestPostcalCode, 
    ...searchByCriteria(customSearchQuery, recipeNames)
}

exports.response = response;
