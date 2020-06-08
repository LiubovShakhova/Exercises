'use strict';

let lang = prompt('Выберите русский(ru) или английский(en) язык', 'ru');

//Version with IF
/* if (lang === 'ru'){
  alert('	понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');
} else if (lang === 'en') {
  alert('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
} else {
  prompt('Неверный ввод. Выберите русский(ru) или английский(en) языk', 'ru');
} */

//Version with SWITCH
switch(lang) {
  case 'ru':
    alert('понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');
    break;
  case 'en':
    alert('Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday');
    break;
  default:
    prompt('Неверный ввод. Выберите русский(ru) или английский(en) языk', 'ru'); 
} 

//Version with Array
/* let arr = [
  ["ru", "понедельник, вторник, среда, четверг, пятница, суббота, воскресенье"],
  ["en", "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday"]
];
for ( let i = 0; i < arr.length; i++ ){
  for (let j = 0; j < arr[i].length; j++ ) {
    alert(arr[i][j]);
}
} */

let namePerson = prompt('Введите имя');
namePerson === 'Артем' ? console.log('директор') : 'Максим' ? console.log('преподаватель') : console.log('студент');

