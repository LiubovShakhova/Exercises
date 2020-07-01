'use strict';

const greeting = document.getElementById('greeting'),
	today = document.getElementById('today'),
	timeNow = document.getElementById('time_now');
const date = new Date(),
	newYear = new Date('December 31, 2020').getTime(),
	todayDate = new Date().getTime();
let waitNewYear = document.getElementById('wait_new_year');

const getDate = () => {
	let hours = date.getHours(),
		minutes = date.getMinutes(),
		seconds = date.getSeconds(),
		hoursName;


	if (hours >= 6 && hours <= 11) {
		greeting.textContent = 'Доброе утро!';
	} else if (hours > 11 && hours <= 17) {
		greeting.textContent = 'Добрый день!';
	} else if (hours > 17 && hours <= 23) {
		greeting.textContent = 'Добрый вечер!';
	} else {
		greeting.textContent = 'Доброй ночи!';
	}

	const arr = new Array('Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота');
	const weekDay = date.getDay();
	today.textContent = `Сегодня: ${arr[weekDay]}`;

	if (hours < 10) {
		hours = `0${hours}`;
	} else if (minutes < 10) {
		minutes = `0${minutes}`;
	} else if (seconds < 10) {
		seconds = `0${seconds}`;
	}
	hoursName = hours <= 12 ? 'AM' : 'PM';
	timeNow.textContent = `Текущее время: ${hours}:${minutes}:${seconds} ${hoursName}`;

	const timeBefore = Math.floor((newYear - todayDate) / 1000 / 3600 / 24);
	waitNewYear.textContent = `До нового года осталось ${timeBefore} дней`;
};

getDate();
