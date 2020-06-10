'use strict';

let arr = ['345', '5678', '677890', '2345', '456789', '567788', '25678'];

for ( let i = 0; i < arr.length; i++ ) {
  if (arr[i].startsWith('2') || arr[i].startsWith('4')) {
    console.log(arr[i]);
  }
}


let num = 100;
for ( let i = 2; i <= num; i++ ) {
  let res = 1;
  for ( let j = 2; j <= i / 2 && res === 1; j++ ) {
    if ( i % j === 0) {
    res = 0;
  } 
}
if (res === 1) {
  console.log(i + ' Делители этого числа: 1 и ' + i);
}
}