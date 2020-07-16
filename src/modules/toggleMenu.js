
const toggleMenu = () => {
	const menu = document.querySelector('menu');
	const handlerMenu = () => menu.classList.toggle('active-menu');

	document.body.addEventListener('click', event => {
		let target = event.target;
		if (target.classList.contains('close-btn') || target.closest('.menu')) {
			return handlerMenu();
		}

		target = target.closest('menu > ul > li > a');

		if (target) {
			event.preventDefault();
			const	smoothScroll = elem => elem.scrollIntoView({ behavior: "smooth" });
			smoothScroll(document.querySelector(target.hash));
			handlerMenu();
			//если клик произошел мимо меню, оно закрывается
		} else if (menu.classList.contains('active-menu')) {
			handlerMenu();
		}
	});
};

export default toggleMenu;
