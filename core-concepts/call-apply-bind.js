let name = {
    fName: 'Gautam',
    lName: 'Rana',
    printFullName: function() {
        console.log(`${this.fName} ${this.lName}`);
        return `${this.fName} ${this.lName}`
    }
};

let name2 = {
    fName: 'Drishani',
    lName: 'Sinha'  
};

// call the function for name
console.log('==============call and function borrowing==================');
name.printFullName(); // 'Gautam Rana'

// suppose you want the same functionality for name2 obj, so instead of copying
// the same functionality, we will borrow the function from name obj
// , and this is call FUNCTION BORROWING. And this can be done by using 
// 'call' keyword.

name.printFullName.call(name2); // 'Drishani Sinha'
// we can read this as, call the function printFullName from name obj and
// pass name2 obj as reference of 'this' of the printFullName fn

console.log('=======call for global fn and  passing reference and params ================');

// let's say 'printDetails' is defined in global space and also accept some parameters,
// so how call, apply and bind can be used with this.

function printDetails (city, state) {
    console.log(`${this.fName} ${this.lName} ${city} ${state}`);
    return `${this.fName} ${this.lName} ${city} ${state}`;
}

// ---using 'call' and passing obj reference for this---
printDetails.call(name, 'Ramgarh', 'Jharkhand');
printDetails.call(name2, 'Ranchi', 'Jharkhand');

console.log('=======apply for global fn and  passing reference and params ================');

// ---using 'apply' and passing obj reference for this---
// in 'call', we pass args using comma separated but in 'apply' we pass args
// in an array. that's the only difference between 'call' & 'apply'
printDetails.apply(name, ['Ramgarh', 'Jharkhand']);
printDetails.apply(name2, ['Ranchi', 'Jharkhand']);

console.log('=======bind for global fn and  passing reference and params ================');

// ---using 'bind' and passing obj reference for this---
// 'bind', just bind the function with passed reference and args to get
// it to be invoked later

let gautamDetails = printDetails.bind(name, 'Ramgarh', 'Jharkhand');
let drishaniDetails = printDetails.bind(name2, 'Ranchi', 'Jharkhand');

gautamDetails();
drishaniDetails();