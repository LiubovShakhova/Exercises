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

export default calculator;