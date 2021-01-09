# Small Stats API
This API has been developed using a `wsgi utility libary werkzeug in Python`  in a package format.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for testing purposes.

After merging the pull reques and pulling the code into your local machine, use the following commands to start the api
## 1
```pip install python venv```
### 2
```py -m venv env```
#### 3
On Windows, run: ```env\Scripts\activate```
On Unix or MacOS, run: ```source env/bin/activate```
##### 4
Then run ```pip install -r requirements.txt```
After installing the dependencies run the following command ```python run.py```
###### 5
After the development server starting head to ```http://127.0.0.1:5000/```

###### 6 Endponts for querying
Method | Endpoint | Functionality
--- | --- | ---
GET | `/` | List the endpoints
GET | `/count_per_recipe` | Lists count per recipe
GET | `/busiest_postcode` | To get the busiest_postcode
GET | `/recipe` | To list the `match_by_name`. To get a custom filter send a `q=parameter`
GET | `/statistic` | Over all statistic and the json file `output_data.json` is also generated at the end located `/app/datasets/output_data.json`
