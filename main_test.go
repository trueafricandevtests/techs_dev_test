package main

import "testing"

func TestUniqueNames(t *testing.T) {
	results := readJSONFile("./data_test.json")
	got := uniqueRecipeNames(results)
	want := 5
	if got != want {
		t.Errorf("Wanted %v got %v", want ,got)
	}
}

func TestImprovedUniqueRecipeNamesCounter(t *testing.T) {
	results := readJSONFile("./data_test.json")
	got := improvedUniqueRecipeNamesCounter(results)
	want := 5
	if got != want {
		t.Errorf("Wanted %v got %v", want ,got)
	}
}

func TestBusiestPostCode(t *testing.T) {
	results := readJSONFile("./data_test.json")
	got := busiestPostCode(results)
	want := 2
	if got.Value != want {
		t.Errorf("Wanted %v got %v", want ,got)
	}
}

func TestReceipeContains(t *testing.T) {
	results := readJSONFile("./data_test.json")
	count := 0
	got := receipeContains([]string{"pork"},results)
	for range got {
		count++
	}
	want := 1
	if count != want {
		t.Errorf("Wanted %v got %v", want , count)
	}
}

func TestReceipeContainsWithList(t *testing.T) {
	results := readJSONFile("./data_test.json")
	count := 0
	got := receipeContains([]string{"Potato","Veggie", "Mushroom"},results)
	for range got {
		count++
	}
	want := 0
	if count != want {
		t.Errorf("Wanted %v got %v", want , count)
	}
}
