# Small Stats API IN Python
This API has been developed using a `wsgi utility library werkzeug`  in a package format.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for testing purposes.

After merging the pull request and pulling the code into your local machine, use the following commands to start the api

```pip install python venv```
```py -m venv env```
On Windows, run: ```env\Scripts\activate```
On Unix or MacOS, run: ```source env/bin/activate```
Then run ```pip install -r requirements.txt```
After installing the dependencies run the following command ```python run.py```
ment server starting head to ```http://127.0.0.1:5000/```

## Endponts for querying
Method | Endpoint | Functionality
--- | --- | ---
GET | `/` | List the endpoints
GET | `/count_per_recipe` | Lists count per recipe
GET | `/busiest_postcode` | To get the busiest_postcode
GET | `/recipe` | To list the `match_by_name`. To get a custom filter send a `q=parameter`
GET | `/statistic` | Over all statistic and the json file `output_data.json` is also generated at the end located `/app/datasets/output_data.json`
