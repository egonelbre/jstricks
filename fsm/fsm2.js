function Machine(){
	this.next = null;
}

Machine.prototype.update = function() {
	this.next && this.next(m);
};

tick = function(m){
	console.log("tick");
	m.next = tock;
};

tock = function(m){
	console.log("tock");
	m.next = tick;
};

M = new Machine();
M.next = tick;

for(var i = 0; i < 10; i += 1)
	M.update();