function(a){return a[0]+a[1]}

l("x[0]+x[1]")
==
function(x){return x[0]+x[1]}


l("x*x")(5)
// 25




l = function(expr){
	var body = "return (" + expr + ");";
	return new Function("x", body);
}

sqr = l("x*x")
sqr(5)
// 25


ops = {
    "+" :   [2, l("x[0]+x[1]")],
    "-" :   [2, l("x[0]-x[1]")],
    "*" :   [2, l("x[0]*x[1]")],
    "/" :   [2, l("x[0]/x[1]")],
    "sin" : [1, l("Math.sin(x[0])")]
}

// or for extremely lazy
bin = function(o){return l("x[0]"+o+"x[1]")}
ops = {
    "+" :   [2, bin("+")],
    "-" :   [2, bin("-")],
    "*" :   [2, bin("*")],
    "/" :   [2, bin("/")],
    "sin" : [1, l("Math.sin(x[0])")]
}




obj = {
	alpha : 4,
	beta  : 10,
	gamma : 123
}

function filterAlpha(arr, min, max){
	r = [];
	if((min != NaN) && (max != NaN)){
		for(var i=0; i < arr.length; i += 1){
			if( (arr[i].alpha >= min) && (arr[i].alpha <= max))
				r.push(arr[i])
		}
	} else if (min != NaN){
		for(var i=0; i < arr.length; i += 1){
			if( (arr[i].alpha >= min))
				r.push(arr[i])
		}
	} else if (max != NaN){
		for(var i=0; i < arr.length; i += 1){
			if( (arr[i].alpha <= max))
				r.push(arr[i])
		}
	}
	...
}

function filter(arr, fun){
	r = [];
	for(var i=0; i < arr.length; i += 1){
		if ( fun(arr[i]) ) 
			r.push(arr[i]);
	}
	return r;
}

function filterAlpha(arr, min, max){
	if((min != NaN) && (max != NaN)){
		return filter(arr, l("(x.alpha >= min) && (x.alpha <= max)"));
	} else if (min != NaN){
		return filter(arr, l("(x.alpha >= min)"));
	} else if (max != NaN){
		return filter(arr, l("(x.alpha <= max)"));
	}
}

function filterer(valfun, min, max){
	if((min != NaN) && (max != NaN)){
		return function(x){
			return (valfun(x) >= min) && (valfun(x) <= max);
		};
	} else if (min != NaN){
		return function(x){ return (valfun(x) >= min); };
	} else if (max != NaN){
		return function(x){ return (valfun(x) <= max); };
	} else {
		return function(x){ return true; }
	}
}

function filterAlpha(arr, min, max){
	var fun = filterer(l("x.alpha"), min, max);
	return filter(arr, fun);
}

function filterBeta(arr, min, max){
	var fun = filterer(l("x.beta"), min, max);
	return filter(arr, fun);
}


function filterer(valfun, min, max){
	if((min != NaN) && (max != NaN)){
		return function(x){
			return (valfun(x) >= min) && (valfun(x) <= max);
		};
	} else if (min != NaN){
		return function(x){ return (valfun(x) >= min); };
	} else if (max != NaN){
		return function(x){ return (valfun(x) <= max); };
	} else {
		return function(x){ return true; }
	}
}

function makeFilter(value){
	return function(arr, min, max){
		var fun = filterer(l("x." + value), min, max);
		return filter(arr, fun);
	};
}

filterAlpha = makeFilter("alpha");
filterBeta  = makeFilter("beta");
filterGamma = makeFilter("gamma");