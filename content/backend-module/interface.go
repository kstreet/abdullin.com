package backend_module

import (
	"net/http"
	"net/url"
)

type Id [16]byte

type Event interface{}

type Request struct {
	Method  string
	Path    string
	Headers map[string]string
	Subject interface{}
}

func GetJson(path string, uri url.Values) *Request {
	return nil

}

type Response struct {
	Headers map[string]string
	Status  int
	Subject interface{}
}

type UseCase struct {
	Name         string
	Given        []Event
	When         *Request
	ThenResponse Map
	ThenEvents   Map
}

type Assertion interface {
	Verify(subject interface{}) (bool, string)
	Describe() string
}

type EqualityAssertion struct {
	path  string
	value string
}

type Runtime interface {
	HandleApi(method string, path string, handler ApiHandler, roles ...Role)
}

type Role byte

type ApiRequest struct {
	Raw *http.Request
}

type ApiResponse interface {
	Write(w http.ResponseWriter, r *http.Request)
}

type ApiHandler func(r *ApiRequest) ApiResponse

type Module interface {
	Register(r Runtime)
}

type Map map[string]interface{}
type Check interface{}

func Is(name string) Check {
	return nil
}
func GreaterThan(value int) Check {
	return nil
}

func ValidId() Check {
	return nil
}

var m = Map{

	"items[0]": Map{
		"name":  "Santa Claws",
		"email": "bad@boy.ny",
		"age":   GreaterThan(12),
	},
	"next": ValidId(),
}
