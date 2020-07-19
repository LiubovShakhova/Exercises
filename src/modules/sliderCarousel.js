const sliderCarousel = () => {
	const main = document.querySelector('.companies-wrapper'),
		wrap = document.querySelector('.companies-hor'),
		slides = document.querySelector('.companies-hor').children,
		next = document.createElement('button'),
		prev = document.createElement('button');

	let position = 0,
		slidesToShow = 4,
		infinity = true,
		responsive = [{
			breakpoint: 1024,
			slidesToShow: 3
		},
		{
			breakpoint: 768,
			slidesToShow: 2
		},
		{
			breakpoint: 576,
			slidesToShow: 1
		}
		],
		maxPosition = slides.length - slidesToShow,
		widthSlide = Math.floor(100 / slidesToShow);

	if (!main || !wrap) {
		console.warn('You need main and wrap to continue');
	}

	const addGloClass = () => {
		main.classList.add('glo-slider');
		wrap.classList.add('glo-slider__wrap');

		for (const item of slides) {
			item.classList.add('glo-slider__item');
		}
	};
	addGloClass();

	const addStyle = () => {

		const style = document.createElement('style');

		style.textContent = `
      .glo-slider {
        overflow: hidden;
      }
      .glo-slider__wrap {
        display:flex !important;
        transition: transform 0.5s !important;
        will-change:transform !important;
      }
      .glo-slider__item {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        flex: 0 0 ${widthSlide}% !important;
        margin: auto 0 !important;
			}
			#companies {
				position: relative !important;
			}
    `;
		document.head.appendChild(style);
	};
	addStyle();

	const prevSlider = () => {
		if (infinity || position > 0) {
			--position;
			if (position < 0) {
				position = maxPosition;
			}
			wrap.style.transform = `translateX(-${position * widthSlide}%)`;
		}
	};
	const nextSlider = () => {
		if (infinity || position < maxPosition) {
			++position;
			if (position > maxPosition) {
				position = 0;
			}
			wrap.style.transform = `translateX(-${position * widthSlide}%)`;
		}
	};

	const addArrow = () => {
		prev.className = 'glo-slider__prev';
		next.className = 'glo-slider__next';
		document.getElementById('companies').appendChild(prev);
		document.getElementById('companies').appendChild(next);
		const style = document.createElement('style');
		style.textContent = `
      .glo-slider__prev,
      .glo-slider__next {
				margin: 0 10px;
        border: 15px solid transparent;
        background: transparent;
      }
      .glo-slider__next {
				border-left-color: #19b5fe;
				opacity: 0.5;
				position: absolute !important;
				top: 50%;
				right: 2%;
      }
      .glo-slider__prev {
				border-right-color: #19b5fe;
				opacity: 0.5;
				position: absolute !important;
				top: 50%;
				left: 2%;
      }
      .glo-slider__prev:hover,
      .glo-slider__next:hover,
      .glo-slider__prev:focus,
      .glo-slider__next:focus {
        background:transparent;
        outline:transparent;
      }
      `;
		document.head.appendChild(style);
		prev.addEventListener('click', prevSlider);
		next.addEventListener('click', nextSlider);
	};
	addArrow();

	const responseInit = () => {
		const slidesToShowDefault = slidesToShow;
		const allResponse = responsive.map(item => item.breakpoint);
		const maxResponse = Math.max(...allResponse);

		const checkResponse = () => {
			const widthWindow = document.documentElement.clientWidth;

			if (widthWindow < maxResponse) {
				for (let i = 0; i < allResponse.length; i++) {
					if (widthWindow < allResponse[i]) {
						slidesToShow = responsive[i].slidesToShow;
						widthSlide = Math.floor(100 / slidesToShow);
						addStyle();
					} 
				} 
			} else {
				slidesToShow = slidesToShowDefault;
				widthSlide = Math.floor(100 / slidesToShow);
				addStyle();
			}
		}; 
		checkResponse();
		window.addEventListener('resize', checkResponse);
	};
	if (responsive) {
		responseInit();
	}

	


};



export default sliderCarousel;
