Small Stats API
====

In the given assignment we suggest you to process an automatically generated JSON file with some data and calculated some stats.

Instructions
-----

1. Clone this repository.
2. Create a new branch called `true_dev`.
3. Create a pull request from your `true_dev` branch to the master branch.
4. Reply to the thread you're having with our HR department telling them we can start reviewing your code

Given
-----

Json data found in this repo.

Functional Requirements
------

1. Count the number of unique recipe names.
2. Count the number of occurences for each unique recipe name (alphabetically ordered by recipe name).
3. Find the postcode with most delivered recipes.
4. List the recipe names (alphabetically ordered) that contain in their name one of the following words:
    - Potato
    - Veggie
    - Mushroom

Non-functional Requirements
--------

1. The application is packaged with [Docker](https://www.docker.com/).
2. Setup scripts are provided.
3. The submission is provided web `API`. Functional requirements are presented querable endpoints. 
4. It should be possible to (implementation is up to you):  
    a. provide a custom fixtures file as input  
    b. provide custom recipe names to search by (functional reqs. 4)  

Expected output
---------------

Generate a JSON file of the following format:

1. 
```json5
    {
        "unique_recipe_count": 15
    }
```
2.
```json5
{
    "count_per_recipe": [
        {
            "recipe": "Mediterranean Baked Veggies",
            "count": 1
        },
        {
            "recipe": "Speedy Steak Fajitas",
            "count": 1
        },
        {
            "recipe": "Tex-Mex Tilapia",
            "count": 3
        }
    ]
}
```
3. 
```json5
    "busiest_postcode": {
        "postcode": "10120",
        "delivery_count": 1000
    }
```
4.
```json5
    "match_by_name": [
        "Mediterranean Baked Veggies", "Speedy Steak Fajitas", "Tex-Mex Tilapia"
    ]
}
```

Review Criteria
---

We expect that the assignment will not take more than 2-3 hours of work. In our judgement we rely on common sense
and do not expect production ready code. We are rather instrested in your problem solving skills and command of the programming language that you chose.

It worth mentioning that we will be testing your submission against different input data sets.

__General criteria from most important to less important__:

1. Functional and non-functional requirements are met.
2. Prefer application efficiency over code organisation complexity.
3. Code is readable and comprehensible. Setup instructions and run instructions are provided.
4. Tests showcased are a plus (_no need to cover everything_).
5. Supporting notes on taken decisions and further clarifications are welcome.
6. Avoid use of web frameworks. 

MY SOLUTION
==================================
My language of choice
------------------------------
PHP for the api.
Also used Javascript and HTML5 to create a client that consumes the api backend coded in PHP.
===============================

===============================
How I implemented the solution
------------------------------
1. Deigned 4 end points each handling the highlighted stat in question. They are:
  a. search 
      This is used for searching specific item(s) from the file passed. It returns recipes that contains searched term
  b. unique_recipe_count
      This returns the total unique recipes in the read data
  c. count_recipe_occur
      This returns a each recipe and the number of times it occurs in the read data
  d. busy_post_code
      This returns the postcode which received mosts deliveries and the total number of deliveries it received
2. Created the api folder which contains the index.php file responsible for handling api requests.
Each request is processed depending on the passed end point. 
It returns the data requested as a JSON object or returns error with 404 Not found code if no end point is passed

3. Created indes.php at the server root for invoking the end points.
 It invokes the api through AJAX calls and display the received object in the document body.

The file has 3 buttons each handling a single end point as reflected in the button text.

Each click triggers the javascript getJsonObject function which handles AJAX calls.
===============================

===============================
Decisions I made 
------------------------------
1. I created a client that consumes the api because am not certain of the True Africa HR's coding of clients to consume the api during evaluation of my work.

2. Because I don't have docker experience as per now, I hosted the solution at my subdomain(http://truedev.fredmusisi.cf)

It can be tested online via the same link.




