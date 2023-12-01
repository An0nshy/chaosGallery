package UseCases

import (
	"fmt"
	"log"
	"os"
)

var newFiles []string

func AllPictures() []string {
	var allFiles []string
	allFiles = nil
	files, err := os.ReadDir("./assets/pictures/")
	if err != nil {
		log.Fatal(err)
	}

	for _, f := range files {
		allFiles = append(allFiles, f.Name())
	}
	return allFiles
}

func contains(s []string, str string) bool {
	if len(s) == 0 {
		fmt.Println("length 0")
		newFiles = append(newFiles, str)
	}
	for _, v := range s {
		if v == str {
			return true
		}
	}
	return false
}
