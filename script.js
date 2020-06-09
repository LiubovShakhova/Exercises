'use strict';

function test(a){
  if (typeof a !== 'string'){
    alert('This is not a string');
  }
  a += '';
  a = a.trim();
  if (a.length > 30){
    a = a.substr(0, 30) + '...';
  }
  return a;
}
console.log(test('        Du bist kommunikativ und ein Teamplayer.'));

