function Machine(){
	this.cur  = function(a){};
	this.next = false;
}

Machine.prototype.update(){
	if( this.next ){
		this.cur("stop");
		this.cur = this.next;
		this.next = false;
		this.cur("start");
	}
	this.cur("update");
}

state = {
	def : function(s){
		if(mouse.down)
			M.next = state.line;
		mouse.render();
	},
	line : function(){
		var start = {x:0,y:0}, last = {x:0,y:0};
		return function(s){
			if(s == "start")
				start = mouse.pos;
			last = mouse.pos;
			renderLine(start, last);
			if(!mouse.down)
				M.next = state.def;
			if(s == "stop")
				addLine(start, last);
	}}()
}

M = new Machine();
M.next = M.def = function(s){
	if(mouse.down)
		this.next = this.line;
	mouse.render();
};

M.line = function(){
	var start = {x:0,y:0}, last = {x:0,y:0};
	return function(s){
			if(s == "start")
				start = mouse.pos;
			last = mouse.pos;
			renderLine(start, last);
			if(!mouse.down)
				this.next = this.def;
			if(s == "stop")
				addLine(start, last);
	}
}();

setInterval(M.update, 33);