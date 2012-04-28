function isNumber(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function ev(expr){
    var stack = expr.split(/\s+/).reverse(),
        args = [];
    while (stack.length > 0){        
        token = stack.pop();
        if( isNumber(token)) {
            a = parseFloat(token);
            args.push(a);
        } else if( token == "+" ){
            a = args.pop();
            b = args.pop();
            stack.push(a+b);
        } else if ( token == "-" ){
            a = args.pop();
            b = args.pop();
            stack.push(a-b);
        } else if (token == "sin" ){
            a = args.pop();
            stack.push(Math.sin(a));
        } else {
            log("err: ", token, ":", stack, ":", args);
            throw "up";
        }
   }
   return args;
}

result = ev("3 4 +");
​log("result", result)​​​​​​​​





ops = {
    "+" : [2,function(a){return a[0]+a[1]}],
    "-" : [2,function(a){return a[0]-a[1]}],
    "*" : [2,function(a){return a[0]*a[1]}],
    "/" : [2,function(a){return a[0]/a[1]}],
    "sin" : [1,function(a){return Math.sin(a[0])}],
}

function assert(v){ if(!v){throw "up"}}
function ev(expr){
    var stack = expr.split(/\s+/).reverse(),
        args = [];
    while (stack.length > 0){        
        token = stack.pop();
        if( isNumber(token)) {
            a = parseFloat(token);
            args.push(a);
        } else {
            op = ops[token];
            assert(typeof op == "undefined");
            a = args.splice(0,op[0]);
            assert(a.length < op[0]);
            stack.push(op[1](a));
        }
   }
   return args;
}

