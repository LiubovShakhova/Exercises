
window.addEventListener('DOMContentLoaded', () => {
	//Timer
	function countTimer(deadline) {
		const timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds');

		function getTimeRemaining() {
			const dateStop = new Date(deadline).getTime(),
				dateNow = new Date().getTime(),
				timeRemaining = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timeRemaining % 60),
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor(timeRemaining / 60 / 60);
			return { timeRemaining, hours, minutes, seconds };
		}

		function updateClock() {
			const timer = getTimeRemaining();
			timerHours.textContent = timer.hours;
			timerMinutes.textContent = timer.minutes;
			timerSeconds.textContent = timer.seconds;

			if (timer.timeRemaining < 0) {
				timerHours.textContent = '00';
				timerMinutes.textContent = '00';
				timerSeconds.textContent = '00';
			} else {
				timerHours.textContent = timer.hours < 10 ? `0${timer.hours}` : timer.hours;
				timerMinutes.textContent = timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes;
				timerSeconds.textContent = timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds;
			}
		}
		setInterval(updateClock, 1000);
	}
	countTimer('5 july 2020');

	//Menu
	const toggleMenu = () => {
		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu'),
			closeBtn = document.querySelector('.close-btn'),
			menuItems = menu.querySelectorAll('ul > li'),
			scrollBtn = document.querySelector('a[href="#service-block"]');

		const	smoothScroll = elem => elem.scrollIntoView({ behavior: "smooth" });
		const handlerMenu = () => menu.classList.toggle('active-menu');

		document.body.addEventListener('click', event => {
			let target = event.target;
			if (target.classList.contains('close-btn') || target.closest('.menu')) {
				return handlerMenu();
			}

			target = target.closest('menu > ul > li > a');
			
			if (target) {
				event.preventDefault();
				smoothScroll(document.querySelector(target.hash));
				handlerMenu();
			//если клик произошел мимо меню, оно закрывается
			} else if (menu.classList.contains('active-menu')) {
				handlerMenu();
			} else if (scrollBtn) {
				event.preventDefault();
				smoothScroll(document.querySelector(scrollBtn.hash));
			}
		});
	};
	toggleMenu(event);

	//popup
	const togglePopUp = () => {
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn');

		//анимацию появления модального окна
		let counter = 0;

		const animate = () => {
			const animation = requestAnimationFrame(animate);
			if (counter >= 1) {
				counter = 0;
				return cancelAnimationFrame(animation);
			}
			counter += 0.05;
			popup.style.opacity = counter;
		};

		popupBtn.forEach(elem => {
			elem.addEventListener('click', () => {
				popup.style.display = 'block';
				if (document.body.clientWidth >= 768) {
					animate();
				}
			});
		});

		popup.addEventListener('click', event => {
			let target = event.target;

			if (target.classList.contains('popup-close')) {
				popup.style.display = 'none';
			} else {
				target = target.closest('.popup-content');

				if (!target) {
					popup.style.display = 'none';
				}
			}
		});
	};
	togglePopUp();

	//Tabs
	const tabs = () => {
		const tabHeader = document.querySelector('.service-header'),
			tab = tabHeader.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');

		const toggleTabContent = index => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');
				}
			}
		};
		tabHeader.addEventListener('click', event => {
			let target = event.target;
			target = target.closest('.service-header-tab');
			if (target) {
				tab.forEach((item, i) => {
					if (item === target) {
						toggleTabContent(i);
					}
				});
			}
		});
	};
	tabs();
});
