package main
 
import "fmt"
 
const (
	Start	= 1
	Update	= 0
	Stop	= -1
)
 
type StateFunc func(m *Machine, s int)
 
func empty(m *Machine, s int) {
}
 
type Machine struct {
	cur	StateFunc
	Next	StateFunc
}
 
func New() *Machine {
	return &Machine{empty, nil}
}
 
func (m *Machine) Update() {
	if m.Next != nil {
		m.cur(m, Stop)
		m.cur = m.Next
		m.Next = nil
		m.cur(m, Start)
	}
	m.cur(m, Update)
}
 
func tick(m *Machine, s int) {
	switch s {
	case Update:
		fmt.Println("tick!")
		m.Next = tock
	}
}
 
func tock(m *Machine, s int) {
	switch s {
	case Update:
		fmt.Println("tock!")
		m.Next = tick
	}
}
 
func main() {
	m := New()
	m.Next = tick
	for i := 0; i < 10; i += 1 {
		m.Update()
	}
}
 
