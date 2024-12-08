var a = 10;

function outer() {
    var count = 0;
    return function increamentCount() {
        count++;
        console.log(count, a);
    }
}

var y = outer();
y();

// Closure is a returned function with all it's lexical environment 
// attached to it. This function come as a bundle with all lexical variables 
// attached. So even if the outer function is finished execution, the variables 
// which is used in inner function doesn't get removed from memory and inner 
// function can still refers to lexical variable.
// 