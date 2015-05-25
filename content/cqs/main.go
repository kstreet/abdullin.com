package cqs

// scaffolding

type User struct {
	Name string
	Age  int
}

func NewUser(name string, age int) User {
	return User{name, age}
}

var users []User

func RenderErrors(r *Result) {}

type Result struct {
	Valid bool
	Error string
}

func NewError(err string) *Result {
	return &Result{false, err}
}

// end of scaffolding

// start example cqs__command

func CreateUser(name string, age int) {
	users = append(users, NewUser(name, age))
}

// end example

// start example cqs__query
func ValidateUser(name string, age int) *Result {
	if name == "" {
		return NewError("Name is empty")
	}
	if age <= 0 || age >= 100 {
		return NewError("Age is out of range")
	}
	return nil
}

// end example

func RenderSaveButton() {}

// start example cqs__refactored-validation
func InputChanged(name string, age int) {
	var result = ValidateUser(name, age)
	if !result.Valid {
		RenderErrors(result)
	} else {
		RenderSaveButton()
	}
}

// end example

// start example cqs__refactored-save
func SaveButtonClicked(name string, age int) {
	var result = ValidateUser(name, age)
	if !result.Valid {
		// protect from programmer error
		panic(result)
	}
	SaveUser(name, age)
}

// end example

// start example cqs__bad

func SaveUser(name string, age int) *Result {
	if name == "" {
		return NewError("Name is empty")
	}
	if age <= 0 || age >= 100 {
		return NewError("Age is out of range")
	}
	users = append(users, NewUser(name, age))
	return nil
}

// end example
