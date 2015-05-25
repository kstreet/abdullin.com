package value_object

import "time"

// start example value-object__bad
func Register(email, name, password string) {}

func bad_use() {
	Register("bob", "bob@landor.com", "fizbuz")
}

// end example

// start example value-object__good
type Email string
type Password string
type Name string

func Register2(email Email, pass Password, name Name) {}

func good_use() {
	var email = Email("rinat@landor.com")
	var password = Password("fizbuz")
	var name = Name("Jack Rich")

	Register2(email, password, name)
}

// end example

// start example value-object__samples

type DocumentId [16]byte
type AccountId int

type Birthday struct {
	time.Time
}

// end example
