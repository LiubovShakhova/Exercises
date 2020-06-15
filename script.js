'use strict';

let week = ['понедельник', ' вторник', ' среда', ' четверг', ' пятница', ' суббота', ' воскресенье'];

let toDay = new Date();
console.log(toDay);
//Вывести на экран все дни недели
const myArr = document.getElementById('arr');
myArr.innerHTML = week.slice();

//Каждый из них с новой строчки
let newArr = document.getElementById('newArr');
let str = [];
for ( let i = 0; i < week.length; i++) {
  str += week[i] +'<br>';
  //Выходные дни - курсивом
  if (week[i] === ' суббота' || week[i] === ' воскресенье') {
    document.write(` <p><em>${week[i]}</em></p>`);
}  
}
newArr.innerHTML = str;
//Текущий день - жирным шрифтом(использовать объект даты)
document.write(` <p><b>${toDay}</b></p>`);


