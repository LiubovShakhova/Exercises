'use strict';

let num = 266219;
let arr = num.toString().split('');

// Result with Reduce
/* arr = arr.reduce((a,b) => a*b);
console.log(arr);

let multiply = arr**3;
console.log(multiply);

multiply = String(multiply);
console.log(multiply);

console.log(multiply.substr(0, 2));
alert(`${multiply.substr(0, 2)}`);
 */

//Variable with forEach
let multiply = 1;
arr.forEach(function(i, arr) {
  multiply *= i;
  console.log(multiply);
});

multiply = multiply**3;
console.log(multiply);

multiply = String(multiply);
console.log(multiply);

console.log(multiply.substr(0, 2));
alert(`${multiply.substr(0, 2)}`);








