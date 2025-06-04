const script = () => {
	let widthSC = $(window).width();
	let heightSC = $(window).height();

    // LENIS SCROLL

    $("html").css("scroll-behavior", "auto");
	$("html").css("height", "auto");

	function easing(x) {
		return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
	}

	const lenis = new Lenis({
		easing: easing,
	});

	lenis.on("scroll", ({ scroll, limit, velocity, direction, progress }) => {});

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);

    // HOOKS

    const useRem = (initPX, maxWidth) => {
		// let initPX = 10;
		const calcVW = (initPX / maxWidth) * 100;

		initPX = widthSC < maxWidth ? (calcVW * widthSC) / 1000 : initPX / 10;

		return (value) => value * initPX;
	};

	let rem;
	const responsiveRem = () => {
		rem = useRem(8.5, 1600);

		if (widthSC <= 991) {
			rem = useRem(10, 991);
		}
		else if (widthSC <= 767) {
			rem = useRem(15, 767);
		}
		else if (widthSC <= 497) {
			rem = useRem(10, 497);
		}
	}

	responsiveRem();

    const addBgHeader = () => {
        const scrollPos = { y: window.pageYOffset, x: window.pageXOffset };
		if (scrollPos.y > $("header").height()) $("header").addClass("active");
		else $("header").removeClass("active");

	}

	addBgHeader();

    let lastScrollTop = 0;
	const toggleHeader = (e) => {
		if (widthSC >= 767) {
			let st = $(this).scrollTop();
			if (st > lastScrollTop) {
				if (st > 440) {
					$("header").addClass("hide");
				}
			} else {
				if (st > 440) {
					$("header").addClass("hide");
					$("header").removeClass("hide");
				}
			}
			lastScrollTop = st;
		}

	}

	const headerFn = () => {
		const DOM = {
			hamburger: $(".hamburger"),
			dropdownTitle: $(".header-dropdown-wrap"),
			dropdownList: $('.nav-dropdown-list')
		};

		const toggleNav = () => {
			DOM.hamburger.on("click", function (e) {
				e.preventDefault();
				if ($("body").hasClass("openNav")) {
					DOM.dropdownList.slideUp();
					DOM.dropdownTitle.removeClass("isDrop");
					$("body").removeClass("openNav");

					// lenis.start();
				} else {
					DOM.dropdownList.slideUp();
					$("body").addClass("openNav");

					// lenis.stop();
				}
			});
		};

		const toggleDropdown = () => {
			DOM.dropdownList.hide();
			DOM.dropdownTitle.removeClass("isDrop");

			DOM.dropdownTitle.on("click", function () {
				if ($(this).hasClass(".isDrop")) {
					$(this).removeClass("isDrop");
					$(this).siblings(".nav-dropdown-list").slideUp();
				} else {
					$(this).toggleClass("isDrop");
					$(this).siblings(".nav-dropdown-list").slideToggle();

					DOM.dropdownTitle.not($(this)).removeClass("isDrop");
					DOM.dropdownTitle.not($(this)).siblings(".nav-dropdown-list").slideUp();
				}
			});
		};


		if (widthSC <= 991) {
			toggleNav();
			toggleDropdown();
		}
	}

	headerFn();

	const swiperCommon = (slideClass, paginationClass) => {
		const swiperSetup = new Swiper(slideClass, {
			slidesPerView: 1,
			spaceBetween: rem(30),
			pagination: {
				el: paginationClass,
				type: "bullets",
			},
			breakpoints: {
				768: {
					slidesPerView: 2,
					spaceBetween: rem(20),
					// pagination: false,
					pagination: {
						el: paginationClass,
						type: "bullets",
					},
				},
			},
		});
	}

	const readMore = (classParent, indexDetect = 1) => {
		let classDetect = $(classParent).children().first().find("p").eq(indexDetect);
		classDetect.hide();
		console.log("classDetect 👉️", classDetect)

		$(classParent)
			.find(".btn-main.readmore")
			.on("click", function (e) {
				e.preventDefault();
				$(this).slideUp();
				classDetect.slideDown();
			});
	}

	const SCRIPT = {};

	SCRIPT.homeScript = () => {
        console.log("homepage");
		const handleTestimonialFunc = () => {
			let avatarWrap = $(".avatar-wrap");

			const testimonialText = new Swiper(".sc-testimonial-slide", {
				slidesPerView: 1,
				spaceBetween: 0,
				effect: "fade",
				fadeEffect: {
					crossFade: true,
				},
				allowTouchMove: false,
				autoplay: {
					delay: 10000,
					disableOnInteraction: false,
				},
			});

			console.log('init swiper');

			testimonialText.on("realIndexChange", function (e) {
				let index = e.activeIndex;
				console.log("index 👉️", index);

				playAnim(index);
			});
			function playAnim(index) {
				avatarWrap.removeClass('active');
				avatarWrap.eq(index).addClass('active')
				let el = avatarWrap.eq(index).find(".avatar-line-outside");
				let tl = gsap.timeline({});
				tl.set(el, {background: "conic-gradient(currentColor 0grad, 0grad, transparent 400grad)", overwrite: true})
				.to(el, {background: "conic-gradient(currentColor 400grad, 400grad, transparent 400grad)", duration: 10})
			}

			avatarWrap.on('click', function(e) {
				e.preventDefault();
				let index = $(this).parent().index();
				testimonialText.slideTo(index)
			})
			// avatarWrap.on('mouseenter', function(e) {
			// 	if ($(this).hasClass('active')) {
			// 		e.preventDefault();
			// 		console.log('hover stop')
			// 		testimonialText.autoplay.stop()
			// 	}
			// })
			// avatarWrap.on('mouseleave', function(e) {
			// 	if ($(this).hasClass('active')) {
			// 		e.preventDefault();
			// 		console.log('hover start')
			// 		testimonialText.autoplay.start()
			// 		//testimonialText.slideNext();
			// 	}
			// })
			playAnim(0);
		}
		if (widthSC <= 991) {
			swiperCommon(".sc-care-area", ".sc-care-area-pagin");
		}
		handleTestimonialFunc();
	}
	SCRIPT.serviceScript = () => {
		const DOM = {
			serviceSwiper: $(".servicedetail-swiper-wrap")

		}
		const handleAccordion = () => {
			const DOM = {
				accordionList: $(".accordion-list"),
				title: $(".accordion-title"),
				content: $(".accordion-content"),
			};

			DOM.content.hide();

			const activeAccordion = (currentContent, detectList) => {
				currentContent.slideToggle();
				currentContent.parent().toggleClass("active");

				detectList.children().find(DOM.content).not(currentContent).slideUp();
				detectList.children().not(currentContent.parent()).removeClass("active");
			};

			DOM.accordionList.each(function () {
				$(this).children().first().addClass("active");
				$(this).children().first().find(DOM.content).show();
				let temp = $(this);
				$(this).children()
					.find(DOM.title)
					.on("click", function () {
						const detectList = $(this).closest(temp);
						const currentContent = $(this).parent().find(DOM.content);

						activeAccordion(currentContent, detectList);
					});
			});
		}


		if (widthSC <= 991) {
			DOM.serviceSwiper.each(function () {

				const currentSwiper = $(this).find(".servicedetail-swiper")[0];
				const currentPagin = $(this).find(".servicedetail-swiper-pagin")[0];

				swiperCommon(currentSwiper, currentPagin);

			});

			swiperCommon(".service-step-wrap", ".service-step-slide-pagin");
			swiperCommon(".servicedetail-other-service-area", ".servicedetail-sc-other-service-pagin");
		}

		if (widthSC <= 767) {
			const swiperSetup = new Swiper(".servicedetail-cycle-slide", {
				slidesPerView: 1,
				spaceBetween: rem(30),
			});

			let totalIndex = $(".servicedetail-cycle-item").length;
			$(".servicedetail-cycle-slide-count .slide-count-total").html(totalIndex);

			swiperSetup.on("realIndexChange", function (e) {
				let index = e.activeIndex;
				$(".servicedetail-cycle-slide-count .slide-count-current").html(index + 1);
			});

			swiperCommon(".asso-how-swiper", ".asso-how-pagin");
		}

		handleAccordion();
	};

	SCRIPT.serviceFertilityPreservationScript = () => {
		if (widthSC <= 991) {
			swiperCommon(".servicedetail-methods-detail-area", ".servicedetail-methods-detail-pagin");
			swiperCommon(".servicedetail-other-service-area", ".servicedetail-sc-other-service-pagin");
		}
		if (widthSC <= 767) {
			swiperCommon(".servicedetail2-secondmethod-slide", ".servicedetail2-secondmethod-slide-pagin");
			swiperCommon(".servicedetail2-thirdmethod-testi", ".servicedetail2-thirdmethod-testi-pagin");
		}
	};

	SCRIPT.understandingFertilityScript = () => {
		if (widthSC <= 767) {
			swiperCommon(".unstand-male-assess-slide", ".unstand-male-assess-slide-paging");
		}
	};

	SCRIPT.advancedFertilityTestsScript = () => {
		if (widthSC <= 767) {
			readMore(".ser-aft-mira-firstthumb");
			readMore(".ser-aft-mira-secondthumb");
		}
	};

	SCRIPT.contactScript = () => {

		const cusSelectField = () => {
			$(".cus-select-field").each(function () {
				$(this).children().first().attr("disabled", "disabled");
			});
		};

		cusSelectField();
	}

	$(window).on("scroll", function () {
		addBgHeader();
		toggleHeader();
	});

	function calculateVh() {
		var vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", vh + "px");
	}

	// Initial calculation
	calculateVh();

	// Re-calculate on resize
	window.addEventListener("resize", calculateVh);

	// Re-calculate on device orientation change
	window.addEventListener("orientationchange", calculateVh);

	const pageName = $(".main").attr("name-space");
	if (pageName) {
		// detectPage(pageName);
		SCRIPT[`${pageName}Script`]();
	}
}


window.onload = function () {
	script();
	console.log("loaded");
};