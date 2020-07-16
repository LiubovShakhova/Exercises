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

export default togglePopUp;