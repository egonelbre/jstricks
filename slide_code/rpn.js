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



isNumber = isFinite;

ops = {
    "+": [2, function(a,b) {return a + b;}],
    "-": [2, function(a,b) {return a - b;}],
    "*": [2, function(a,b) {return a * b;}],
    "/": [2, function(a,b) {return a / b;}],
    "sin": [1, function(a){return Math.sin(a);}]
};

function assert(v, msg){if(!v){throw msg;}}

function ev(expr) {
    var stack = [], args = [];
    stack = expr.split(/\s+/).reverse();
    while (stack.length > 0) {
        var token = stack.pop();
        if (isNumber(token)) {
            args.push(parseFloat(token));
        } else {
            var op = ops[token],
                arg = [];
            assert(typeof op != "undefined", "Operator not defined");
            for (var i = op[0]; i > 0; i -= 1)
                arg.push(args.pop());
            assert(arg.length == op[0], "Not enough arguments!");
            var result = op[1].apply(null,arg);
            stack.push(result);
        }
    }
    return args;
}

log("test", ev("5 3 4 + *"))
log("test", ev("5 3 4 + * sin"))
​