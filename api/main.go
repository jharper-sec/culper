package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

var (
	// APIName ...
	APIName = "equip"

	// APIVersion ...
	APIVersion = "v1"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/", rootHandler)

	o := r.PathPrefix("/auth").Subrouter()
	o.HandleFunc("/{service}", authServiceHandler)
	o.HandleFunc("/{service}/callback", authCallbackHandler)

	fmt.Println(http.ListenAndServe(":3000", r))
}
