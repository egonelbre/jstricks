function map(arr, fun){
    var r = [];
    for(var i=0; i<arr.length; i+=1 )
        arr[i] = fun(arr[i]);
    return r
}

map([1,2,3], 
     function(x){return x*x})
// [1,4,9]


power = function(p){
	return function(x){
		return Math.pow(x,p)
	}
}
sqr = power(2)
sqr(3)

power(3)(2)
// 8
map([1,2,3], power(3))