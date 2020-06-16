'use strict';
/* let now = new Date();
var days =["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
console.log('Сегодня ' + days[now.getDay()] + now.toUTCString()); */
function startTime () {

  let monthsArr = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", 
  "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

  let daysArr = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

  let dateObj = new Date();

  let year = dateObj.getFullYear();
  let month = dateObj.getMonth();
  let numDay = dateObj.getDate();
  let day = dateObj.getDay();
  let hour = dateObj.getHours();
  let minute = dateObj.getMinutes();
  let second = dateObj.getSeconds();

//Для вывода в формате (а) напишите функцию, которая будет менять менять склонение слов в зависимости от числа, "час, часов, часа"
  let onehour, onesecond, oneminute;
  let timechange = function() {
    if (hour === 1 || hour === 21) {
      onehour = 'час';
    } else if (hour === 2 || hour === 3 || hour === 22 || hour === 23 || hour === 24) {
      onehour = 'часа';
    } else {
      onehour = 'часов';
    }
    
    if (minute === 1 || minute === 21 || minute === 31 || minute === 41 || minute === 51) {
      oneminute = 'минута';
    } else if ( 2 <= minute <= 4 || 22 <= minute <= 24 || 32 <= minute <= 34 || 42 <= minute <= 44 || 52 <= minute <= 54 ) {
      oneminute = 'минуты';
    } else {
      oneminute = 'минут';
    }

    if (second === 1 || second === 21 || second === 31 || second === 41 || second === 51) {
      onesecond = 'секунда';
    } else if ( 2 <= second <= 4 || 22 <= second <= 24 || 32 <= second <= 34 || 42 <= second <= 44 || 52 <= second <= 54 ) {
      onesecond = 'секунды';
    } else if (second === 0 || 5 <= second <= 20 || 25 <= second <= 30 || 35 <= second <= 40 || 45 <= second <= 50 || 55 <= second <= 60) {
      onesecond = 'секунд';
    }

    if (minute < 10) {
      minute = '0' + minute;
    } else if (second < 10) {
      second = '0' + second;
    } else if (month < 10) {
      month = '0' + month;
    }

  };
  timechange();

//a) 'Сегодня Вторник, 4 февраля 2020 года, 21 час 5 минут 33 секунды'  (1 БАЛЛ)
  let now ='Сегодня ' + daysArr[dateObj.getDay()] + ', ' + numDay + ' ' + monthsArr[dateObj.getMonth()] + ' ' + year + ' года, ' + hour + ' ' + onehour + ' ' + minute + ' ' + oneminute + ' ' + second +' ' + onesecond;

  //б) '04.02.2020 - 21:05:33' (1 БАЛЛ)
  //let otherDate = dateObj.toLocaleString().split(', ').join(' - ');
  let otherDate = numDay + '.' + month + '.' + year + ' - ' + hour + ':' + minute + ':' + second;
  

  document.getElementById('clock').innerHTML= now + '<br>' + otherDate;
}

//4) С помощью функции setInterval, реализуйте вывод даты и времени каждую секунду (1 БАЛЛ)
setInterval(startTime, 1000);


