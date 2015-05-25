// start example go__http
package main

import (
	"fmt"
	"net/http"
)

var queue chan string
var joblist []string

func init() {
	queue = make(chan string, 10)
	joblist = make([]string, 0)
}

func handler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "POST":
		val := r.PostFormValue("job")
		fmt.Fprintln(w, "VALUE: ", val)
		queue <- val
	case "GET":
		fmt.Fprintln(w, joblist)
	default:
		fmt.Fprintf(w, "Not supported")
	}
}
func projection() {
	for req := range queue {
		joblist = append(joblist, req)
	}
}
func main() {
	go projection()

	http.HandleFunc("/", handler)
	http.ListenAndServe(":8080", nil)
}

// end example
