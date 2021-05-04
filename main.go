package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"sort"
	"strings"
)

func main() {
	
	fmt.Println("started application")
	http.HandleFunc("/unique", getUnique)
	http.HandleFunc("/recipeCounter", reciepeCounter)
	http.HandleFunc("/busypostcode", busyPostCode)
	http.HandleFunc("/getname", getByName)
	log.Fatal(http.ListenAndServe(":9005", nil))
}

type Resturant struct {
	Postcode string `json:"postcode"`
	Reciepe  string `json:"recipe"`
	Delivery string `json:"delivery"`
}

type recipe struct {
	Recipe string `json:"recipe"`
	Count int `json:"count"`
}

func getUnique(w http.ResponseWriter, r *http.Request) {
	jsonResult := readJSONFile()
	count := improvedUniqueRecipeNamesCounter(jsonResult)
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")

	response := map[string]interface{}{}
	response["unique_recipe_count"] = count
	json.NewEncoder(w).Encode(response)
}

func reciepeCounter(w http.ResponseWriter, r *http.Request) {
	jsonResult := readJSONFile()
	receipeResult := recipeCountMap(jsonResult)

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	response := map[string]interface{}{}
	response["count_per_recipe"] = receipeResult
	json.NewEncoder(w).Encode(response)
}

func busyPostCode(w http.ResponseWriter, r *http.Request) {
	jsonResult := readJSONFile()
	postcodes := busiestPostCode(jsonResult)

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")

	response := map[string]interface{}{}
	response["busiest_postcode"] = postcodes
	json.NewEncoder(w).Encode(response)
}

func getByName(w http.ResponseWriter, r *http.Request) {
	jsonResult := readJSONFile()
	query := r.URL.Query()
	filters, ok := query["name"];
	if !ok {
		log.Panic("param name is missing")
	}
	
	response := map[string]interface{}{}
	receipes:= receipeContains(filters, jsonResult)
	response["match_by_name"] = receipes
	json.NewEncoder(w).Encode(response)
}

type kv struct {
	Key   string `json:"postcode"`
	Value int `json:"delivery_count"`
}

func readJSONFile() []Resturant {
	data, err := ioutil.ReadFile("./data.json")
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Successfully opened file")

	var result []Resturant
	err = json.Unmarshal(data, &result)
	if err != nil {
		fmt.Printf("err: %v", err)
	}

	return result
}

func contains(s []string, e string) bool {
	for _, val := range s {
		if val == e {
			return false
		}
	}
	return true
}

func uniqueRecipeNames(input []Resturant) int {
	store := []string{}
	counter := 0
	for _, val := range input {
		if contains(store, val.Reciepe) {
			counter++
		}
		store = append(store, val.Reciepe)
	}
	return counter
}

func improvedUniqueRecipeNamesCounter(input []Resturant) int {
	store := map[string]int{}
	counter := 0

	for _, val := range input {
		if _, ok := store[val.Reciepe]; !ok {
			store[val.Reciepe] = 0
			counter++
		}
	}
	return counter
}

func recipeCountMap(input []Resturant) []recipe {
	store := map[string]int{}

	for _, val := range input {
		if _, ok := store[val.Reciepe]; !ok {
			store[val.Reciepe] = 0
		}
	}

	for _, val2 := range input {
		if _, ok := store[val2.Reciepe]; ok {
			store[val2.Reciepe] += 1
		}
	}

	var ss []recipe
	for k, v := range store {
		ss = append(ss, recipe{k, v})
	}
	return ss
}

func busiestPostCode(input []Resturant) kv {
	store := map[string]int{}

	for _, val := range input {
		if _, ok := store[val.Postcode]; !ok {
			store[val.Postcode] = 0
		}
	}

	for _, val := range input {
		if _, ok := store[val.Postcode]; ok {
			store[val.Postcode] += 1
		}
	}

	var ss []kv
	for k, v := range store {
		ss = append(ss, kv{k, v})
	}

	sort.Slice(ss, func(i, j int) bool {
		return ss[i].Value > ss[j].Value
	})

	return ss[0]
}

func receipeContains(input []string, inputs []Resturant) []string {
	var recps []string
	for _, val := range input {
		for _, value := range inputs {
			if strings.Contains(strings.ToLower(value.Reciepe), strings.ToLower(val)) {
				if contains(recps, value.Reciepe) {
					recps = append(recps, value.Reciepe)
				}
			}
		}
	}
	return recps
}
