
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

	const	smoothScroll = elem => elem.scrollIntoView({ behavior: "smooth" });
	//Menu
	const toggleMenu = () => {
		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu');

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
			}
		});
	};
	toggleMenu();

	// переход на другой слайд
	const btnDown = () => {
		const scrollBtn = document.querySelector('a[href="#service-block"]');
		scrollBtn.addEventListener("click", () => {
			event.preventDefault();
			smoothScroll(document.querySelector(scrollBtn.hash));
		});
	};
	btnDown();

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

	//Slider
	const slider = () => {
		const slide = document.querySelectorAll('.portfolio-item'),
			btn = document.querySelectorAll('portfolio-btn'),
			slider = document.querySelector('.portfolio-content');

		let currentSlide = 0,
			interval,
			dot = document.querySelectorAll('.dot');

		const prevSlide = (elem, index, strClass) => {
			elem[index].classList.remove(strClass);
		};

		const nextSlide = (elem, index, strClass) => {
			elem[index].classList.add(strClass);
		};

		const autoPlaySlide = () => {

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			currentSlide++;
			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		};

		const startSlide = (time = 3000) => {
			interval = setInterval(autoPlaySlide, time);
		};

		const stopSlide = () => {
			clearInterval(interval);
		};

		slider.addEventListener('click', event => {
			event.preventDefault();
			const target = event.target;

			if (!target.matches('.portfolio-btn, .dot')) {
				return;
			}
			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');

			if (target.matches('#arrow-right')) {
				currentSlide++;
			} else if (target.matches('#arrow-left')) {
				currentSlide--;
			} else if (target.matches('.dot')) {
				dot.forEach((elem, index) => {
					if (elem === target) {
						currentSlide = index;
					}
				});
			}

			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			if (currentSlide < 0) {
				currentSlide = slide.length - 1;
			}

			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		});

		slider.addEventListener('mouseover', event => {
			if (event.target.matches('.portfolio-btn') ||
			event.target.matches('.dot')) {
				stopSlide();
			}
		});
		slider.addEventListener('mouseout', event => {
			if (event.target.matches('.portfolio-btn') ||
			event.target.matches('.dot')) {
				startSlide();
			}
		});

		//точки с классом dot
		const getDots = () => {
			slide.forEach((item, index) => {
				const li = document.createElement('li');
				li.classList.add('dot');
				if (index === 0) {
					li.classList.add('dot-active');
				}
				document.querySelector('.portfolio-dots').append(li);
			});
			dot = document.querySelectorAll('.dot');
		};

		getDots();
		startSlide(3000);
	};
	slider();

	//Team
	const myTeam = () => {
		const teamRow = document.querySelector('.command>.container>.row');

		const changePhoto = event => {
			const target = event.target;

			if (target.classList.contains("command__photo")) {
				const src = target.src;
				target.src = target.dataset.img;
				target.dataset.img = src;
			}
		};
		teamRow.addEventListener("mouseover", changePhoto);
		teamRow.addEventListener("mouseout", changePhoto);
	};
	myTeam();

	//Calculate
	const calculator = () => {
		const calcBlock = document.querySelector('.calc-block');

		const validation = event => {
			const target = event.target;

			if (target.tagName === 'INPUT') {
				target.value = target.value.replace(/\D/, "");
			}
		};
		calcBlock.addEventListener("input", validation);
	};
	calculator(); 

	const calc = (price = 100) => {
		const calcBlock = document.querySelector('.calc-block'),
			calcType = document.querySelector('.calc-type'),
			calcSquare = document.querySelector('.calc-square'),
			calcDay = document.querySelector('.calc-day'),
			calcCount = document.querySelector('.calc-count'),
			totalValue = document.getElementById('total');

		//перебор цифр
		let interval;
		const animate = (total) => {
      let i = 0;
        if (total) {
          interval = setInterval(() => {
						if (i >= total){
              clearInterval(interval);
            } else {
              i += 100;
              totalValue.textContent = i; 
            }
					}, 40);
        }
    };

		const countSum = () => {
			let total = 0,
					countValue = 1,
					dayValue = 1;
			const typeValue = calcType.options[calcType.selectedIndex].value,
					squareValue = +calcSquare.value;

			if (calcCount.value > 1) {
				countValue += (calcCount.value - 1) / 10;
			}

			if (calcDay.value && calcDay.value < 5) {
				dayValue *= 2;
			} else if (calcDay.value && calcDay.value < 10) {
				dayValue *= 1.5;
			}

			if (typeValue && squareValue) {
				total = price * typeValue * squareValue * countValue * dayValue;
			}
			if (total) {
        animate(total);
      }
		};

		calcBlock.addEventListener('change', (event) => {
			const target = event.target;

			if (target.matches('select') || target.matches('input')) {
				countSum();
			}
		});
	};
	calc(100);

	//send-ajax-form
	const sendForm = () => {
		const errorMessage = 'Что-то пошло не так...',
				loadMessage = 'Загрузка...',
				successMessage = 'Спасибо! Мы скоро с Вами свяжемся.';
		const form = document.getElementById('form1');
		
		const statusMessage = document.createElement('div');
		statusMessage.style.cssText = 'font-size: 2rem';

		form.addEventListener('submit', (event) => {
			event.preventDefault();
			form.append(statusMessage);
			statusMessage.textContent = loadMessage;
			const formData = new FormData(form);
			let body = {};
			/* for (let val of formData.entries()) {
				body[val[0]] = val[1];
			} */
			formData.forEach((val, key) => {
				body[key] = val;
			})
			postData(body, 
				() => {
					statusMessage.textContent = successMessage;
				}, 
				(error) => {
					statusMessage.textContent = errorMessage;
					console.error(error);
				}
				);
		});

		const postData = (body, outputData, errorData) => {
			const request = new XMLHttpRequest();
			request.addEventListener('readystatechange', () => {
				if (request.readyState !== 4) {
					return;
				}
				if (request.status === 200) {
					outputData();			
				} else {
					errorData(request.status);
				}
			});
			request.open('POST', './server.php');
			request.setRequestHeader('Content-Type', /* 'multipart/form-data' */ 'application/json');
			request.send(JSON.stringify(body));

		}		
	};
	sendForm();

});
