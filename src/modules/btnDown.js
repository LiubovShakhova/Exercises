const btnDown = () => {
	const scrollBtn = document.querySelector('a[href="#service-block"]');
	scrollBtn.addEventListener("click", () => {
		event.preventDefault();
		const	smoothScroll = elem => elem.scrollIntoView({ behavior: "smooth" });
		smoothScroll(document.querySelector(scrollBtn.hash));
	});
};

export default btnDown;
