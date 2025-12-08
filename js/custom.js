(function () {

	'use strict'


	AOS.init({
		duration: 800,
		easing: 'slide',
		once: true
	});

	var preloader = function () {

		var loader = document.querySelector('.loader');
		var overlay = document.getElementById('overlayer');

		function fadeOut(el) {
			el.style.opacity = 1;
			(function fade() {
				if ((el.style.opacity -= .1) < 0) {
					el.style.display = "none";
				} else {
					requestAnimationFrame(fade);
				}
			})();
		};

		setTimeout(function () {
			fadeOut(loader);
			fadeOut(overlay);
		}, 200);
	};
	preloader();


	var tinySdlier = function () {

		var heroSlider = document.querySelectorAll('.hero-slide');
		var propertySlider = document.querySelectorAll('.property-slider');
		var imgPropertySlider = document.querySelectorAll('.img-property-slide');
		var testimonialSlider = document.querySelectorAll('.testimonial-slider');


		if (heroSlider.length > 0) {
			var tnsHeroSlider = tns({
				container: '.hero-slide',
				mode: 'carousel',
				speed: 700,
				autoplay: true,
				controls: false,
				nav: false,
				autoplayButtonOutput: false,
				controlsContainer: '#hero-nav',
			});
		}


		if (imgPropertySlider.length > 0) {
			var tnsPropertyImageSlider = tns({
				container: '.img-property-slide',
				mode: 'carousel',
				speed: 700,
				items: 1,
				gutter: 30,
				autoplay: true,
				controls: false,
				nav: true,
				autoplayButtonOutput: false
			});
		}

		if (propertySlider.length > 0) {
			var tnsSlider = tns({
				container: '.property-slider',
				mode: 'carousel',
				speed: 700,
				gutter: 30,
				items: 3,
				autoplay: true,
				autoplayButtonOutput: false,
				controlsContainer: '#property-nav',
				responsive: {
					0: {
						items: 1
					},
					700: {
						items: 2
					},
					900: {
						items: 3
					}
				}
			});
		}


		if (testimonialSlider.length > 0) {
			var tnsSlider = tns({
				container: '.testimonial-slider',
				mode: 'carousel',
				speed: 700,
				items: 3,
				gutter: 50,
				autoplay: true,
				autoplayButtonOutput: false,
				controlsContainer: '#testimonial-nav',
				responsive: {
					0: {
						items: 1
					},
					700: {
						items: 2
					},
					900: {
						items: 3
					}
				}
			});
		}
	}
	tinySdlier();

	// Configurar imagens de fundo do hero
	var setHeroBackgrounds = function () {
		var heroSlides = document.querySelectorAll('.hero-slide .img');
		heroSlides.forEach(function (slide) {
			var imgUrl = slide.getAttribute('data-image');
			if (imgUrl) {
				slide.style.backgroundImage = 'url(' + imgUrl + ')';
				slide.style.backgroundSize = 'cover';
				slide.style.backgroundPosition = 'center';
				slide.style.backgroundRepeat = 'no-repeat';
				slide.style.height = '100vh';
				// slide.style.width = '100%';
			}
		});
	};

	// Executar quando o DOM estiver pronto
	document.addEventListener('DOMContentLoaded', setHeroBackgrounds);
	// Executar depois que o slider for inicializado
	setTimeout(setHeroBackgrounds, 100);

	// Controle do vídeo modal
	var setupVideoModal = function () {
		var modal = document.getElementById('videoModal');
		var video = document.getElementById('testimonialVideo');
		var playButton = document.querySelector('.video-modal-button');

		if (modal && video && playButton) {
			// Ao clicar no botão play da preview
			playButton.addEventListener('click', function () {
				// Garante que o vídeo está pronto para reproduzir
				video.load();
			});

			// Quando o modal é mostrado
			modal.addEventListener('shown.bs.modal', function () {
				video.focus();
				// Tenta reproduzir o vídeo
				var playPromise = video.play();
				if (playPromise !== undefined) {
					playPromise
						.then(function () {
							// Reprodução iniciada com sucesso
							console.log('Vídeo iniciado com sucesso');
						})
						.catch(function (error) {
							// Reprodução automática bloqueada
							console.log('Reprodução automática bloqueada:', error);
							// Adiciona mensagem visual para clicar no play se necessário
							video.setAttribute('poster', video.poster || 'images/familia2.jpg');
						});
				}
			});

			// Quando o modal é fechado
			modal.addEventListener('hide.bs.modal', function () {
				video.pause();
				video.currentTime = 0;
			});

			// Tratamento de erros do vídeo
			video.addEventListener('error', function (e) {
				console.error('Erro no vídeo:', e);
			});
		}
	};
	setupVideoModal();

})()