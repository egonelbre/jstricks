


// ja debugima hakates

myFunction = function(a,b,c){
	console.log("enter:", a,b,c);
	b = a * c + b;
	r = a + b + c;
	console.log("exit:",a,b,c, "res:",r);
	return r;
}


debug = function(fun, name){
	return function(a,b,c){
		console.log("enter:", name, a,b,c);
		r = fun(a,b,c);
		console.log("exit:", name, a,b,c, "res:", r);
		return r;
	}
}

myFunction = function(a,b,c){
	b = a * c + b;
	return a + b + c;
}

myFunction = debug(myFunction, "my");
myFunction(1,2,3);
// enter: my 1 2 3
// exit: my 1 2 3 res: 9
9





function toArray(args){
    return Array.prototype.slice.call(args);
}

debug = function (fun, name){
    return function(){
        var args = toArray(arguments);
        console.log("enter:", name, args);
        var r = fun.apply(this, args);
        console.log("exit:", name, args, 'res:', r);
        return r;
    }
};


myFunction = function(a,b,c,v){
    b = a * c + b;
    return a + b + c - v;
}
    
​myFunction = debug(myFunction, "my");
log("result:", myFunction(1,2,3,4))​​​​;​​​​



debugObject = function(obj, name){
	for(var n in obj){
		if(typeof obj[n] == "function"){
			obj[n] = debug(obj[n], name + ":" + n)
		}
	}
}

​obj = {
    alpha : function(a,b)​{return a + b},
    beta : function(a,b,c){return a * b * c}
}

debugObject(obj, "obj");

obj.alpha(1,2);
obj.beta(1,2,3);

// enter: obj:alpha [1, 2]
// exit: obj:alpha [1, 2] res: 3
// enter: obj:beta [1, 2, 3]
// exit: obj:beta [1, 2, 3] res: 6 