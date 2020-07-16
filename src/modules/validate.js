const validate = () => {
	document.body.addEventListener('input', event => {
		const target = event.target;
		if (target.classList.contains('form-phone')) {
			target.value = target.value.replace(/[^+\d]/g, '');
		} else if (target.classList.contains('form-name') ||
    target.classList.contains('mess') || target.matches('#form2-name')) {
			target.value = target.value.replace(/[^а-яё\s]/ig, '');
		}
	});
};

export default validate;