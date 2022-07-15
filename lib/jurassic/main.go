package main

import (
	"fmt"
	"net/http"
	"strings"
)

func handleRequest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Methods", "HACK")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	if r.Method != "HACK" {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	magicWord := r.Header.Get("Magic-Word")
	if strings.ToLower(magicWord) != "please" {
		fmt.Fprintf(w, "Na ah ah, you didn't say the Magic-Word!\n")
		fmt.Fprintf(w, "Na ah ah, you didn't say the Magic-Word!\n")
		fmt.Fprintf(w, "Na ah ah, you didn't say the Magic-Word!\n")
		fmt.Fprintf(w, "Na ah ah, you didn't say the Magic-Word!\n")
		fmt.Fprintf(w, "Na ah ah, you didn't say the Magic-Word!\n")
		w.WriteHeader(http.StatusForbidden)
		return
	}

	fmt.Fprintf(w, "GXYZ{w31c0m3_2_ju24551c_p42k}")

}

func main() {
	handler := http.HandlerFunc(handleRequest)
	http.Handle("/", handler)
	http.ListenAndServe(":8080", nil)
}
