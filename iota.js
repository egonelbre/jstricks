function Counter(start){
	this.start = start - 1;
}

Counter.prototype.next = function(){
	this.start += 1;
	return this.start;
}

c = new Counter(0);
c.next() // 0
c.next() // 1
c.next() // 2


function NewIota(start){
	start -= 1;
	return function(){
		start += 1;
		return start;
	}
}

iota = NewIota(0)
iota() // 0
iota() // 1
iota() // 2

// easy enumeration
enum = NewIota(0)
var itemTyp = {
	Error : enum(),
	Bool : enum(),
	Complex : enum(),
	EOF : enum()
}
