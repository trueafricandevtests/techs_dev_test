# Small Stats API
This project is built using Node, a run-time engine for JavaScript.
## Setup Scripts
1. Option 1: Without docker
```sh
$ npm install
$ npm run dev

```
2. Option 2: With Docker
```sh
$ docker build -t true_dev_small_api .
$ docker run -it -p 3001:3001 true_dev_small_api

```
In both options, the api can be accessed at http://localhost:3001

## Test Script
```sh
$ npm run test

```

## API Endpoints.
 NOTE: Each request here should be sent along with a json input file to be processed.
1. To count the number of unique recipe names.
    endpoint: ```/unique_recipe_count```
    method: ```POST```
2. Count the number of occurences for each unique recipe name (alphabetically ordered by recipe name).
    endpoint: ```/count_per_recipe```
    method: ```POST```
3. Find the postcode with most delivered recipes.
    endpoint: ```/busiest_postcode```
    method: ```POST```
 4. Search by recipe names
    This enpoint expects search names to be passed as query paramaters 
    E.g ```http://localhost/match_by_name?search=Chicken&search=Potato```
    endpoint: ```/match_by_name```
    method: ```POST```

## Supporting notes on taken decisions and further clarifications.

- I decided to use mostly promises for my controller functions to take advantage of the    single threaded non-blocking behaviour of Node.
- For each request, a json fixtures file must be sent.
- 
