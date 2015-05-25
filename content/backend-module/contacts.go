package backend_module

type ContactItemModel struct {
	ContactId Id
	Name      string
	Email     string
}

type ContactListModel struct {
	Items []ContactItemModel
}

// start example golang__sample
func (m *ContactsModule) handleList(r *ApiRequest) ApiResponse {
	return NewObjectResponse(&ContactListModel{})
}

type ContactsModule struct{}

func (m *ContactsModule) Register(r Runtime) {
	r.HandleApi("GET", "/contacts", m.handleList)
}

// end example golang__sample

func simple_use_case() *UseCase {
	return &UseCase{
		Name: "Empty List",
		When: GetJson("/contacts", nil),
	}
}

func filled_list() *UseCase {

	var santaId = ""
	//var memberId = ""

	return &UseCase{
		Name: "Return proper contact list",
		//	When: Get("/contacts").As(memberId),
		ThenEvents: Map{
			"[0]": Map{
				"type":     "contact-list-viewed",
				"eventId":  ValidId(),
				"memberId": ValidId(),
			},
			"length": 1,
		},
		ThenResponse: Map{
			"items[0]": Map{
				"name":  "Santa Claws",
				"id":    santaId,
				"age":   GreaterThan(12),
				"email": "badboy@north.pole",
			},
			"items.length": 1,
			"continue":     santaId,
		},
	}
}
