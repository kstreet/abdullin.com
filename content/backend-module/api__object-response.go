package backend_module

import "net/http"

type ObjectResponse struct {
	subject interface{}
}

func NewObjectResponse(subject interface{}) ApiResponse {
	return &ObjectResponse{subject}

}

func (j *ObjectResponse) Write(w http.ResponseWriter, r *http.Request) {

}
