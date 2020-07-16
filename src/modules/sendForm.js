const sendForm = () => {
	const errorMessage = 'Что-то пошло не так...',
		successMessage = 'Спасибо! Мы скоро с Вами свяжемся.';

	const statusMessage = document.createElement('div');
	statusMessage.style.cssText = 'font-size: 2rem';

	let preloader;
	const animatePreloader = () => {
		preloader =  document.createElement('div');
		preloader.className = 'loader d-none';
		preloader.innerHTML = `
          <span></span>
          <span></span>
          <span></span>
          <span></span>
      `;
	};
	animatePreloader();

	const postData = body => fetch('./server.php', {
		method: 'POST',
		mode: 'same-origin',
		cache: 'default',
		headers: {
			'Form-Data': 'multipart/form-data'
		},
		body: JSON.stringify(body),
		credentials: 'include'
	});
	document.body.addEventListener('submit', event => {
		if (event.target.tagName.toLowerCase() !== 'form') {
			return;
		}
		const form = event.target;
		event.preventDefault();
		form.append(statusMessage);
		form.append(preloader);
		preloader.classList.remove('d-none');

		const formData = new FormData(form);
		const body = {};
		formData.forEach((val, key) => {
			body[key] = val;
		});

		postData(body)
			.then(response => {
				if (response.status !== 200) {
					throw new Error('Network error, status is not 200');
				}
				preloader.classList.add('d-none');
				statusMessage.textContent = successMessage;
				[...form.elements].forEach(elem => {
					if (elem.tagName.toLowerCase() === 'input') {
						elem.value = '';
					}
				});
				form.addEventListener('input', () => {
					if (statusMessage) {
						statusMessage.textContent = '';
					}
				});
			})
			.catch(error => {
				preloader.classList.add('d-none');
				statusMessage.textContent = errorMessage;
				console.error(error);
				[...form.elements].forEach(elem => {
					if (elem.tagName.toLowerCase() === 'input') {
						elem.value = '';
					}
				});
				form.addEventListener('input', () => {
					if (statusMessage) {
						statusMessage.textContent = '';
					}
				});
			});
	});
};

export default sendForm;