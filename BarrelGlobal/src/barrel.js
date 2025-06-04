import { marquee } from "./animation";
import { useRem, preloadImages } from "./ultis";
const script = () => {
	select = (e) => document.querySelector(e);
	selectAll = (e) => document.querySelectorAll(e);

	$("html").css("scroll-behavior", "initial");

	function easing(x) {
		return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
	}

	const lenis = new Lenis({
		duration: 1.2,
		easing: easing,
		smooth: true,
		direction: "vertical",
	});

	lenis.on("scroll", ({ scroll, limit, velocity, direction, progress }) => {
	});

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);

	let widthSC = $(window).width();
	let heightSC = $(window).height();

	const rem = useRem(1728);

	const topBarrelSlide = new Swiper(".sc-home-barrellist-slide", {
		slidesPerView: 4,
		spaceBetween: rem(40),
		navigation: {
			nextEl: ".sc-home-barrellist-control .btn-slide.next",
			prevEl: ".sc-home-barrellist-control .btn-slide.prev",
		},
	});

	let numOfSlides;

	const specialSlide = new Swiper(".sc-home-special-wrap", {
		slidesPerView: 1,
		effect: "fade",
		loop: true,
		fadeEffect: {
			crossFade: true,
		},
		on: {
			beforeInit() {
				numOfSlides = this.wrapperEl.querySelectorAll(".sc-home-special-item").length;
			},
		},
		navigation: {
			nextEl: ".btn-special.next",
			prevEl: ".btn-special.prev",
		},
		pagination: {
			el: ".swiper-pagination",
			type: "bullets",
		},
	});

	const animActiveSlideSpecial = () => {
		const DOM = {
			// slideActive: select(".sc-home-special-item.swiper-slide-active"),
		};
		// specialSlide.on(".slideChange", function {
		//     TweenMax.to()
		// });
	};

	const categoriesSetup = () => {
		let cloneWrap = $(".sc-home-categories .categories-list");

		$(".sc-home-categories .categories-wrap").append(cloneWrap.clone());
		$(".sc-home-categories .categories-wrap").append(cloneWrap.clone());
		$(".sc-home-categories .categories-wrap").append(cloneWrap.clone());

		let newWrap = $(".sc-home-categories .categories-list");

		for (let i = 0; i < newWrap.length; i++) {
			if (i === 0) {
				newWrap.eq(i).css({
					position: "relative",
					top: 0,
					left: 0,
				});
			} else {
				newWrap.eq(i).css({
					position: "absolute",
					top: 0,
					left: 0,
				});
			}
		}
	};

	categoriesSetup();

	const animCategories = () => {
		const DOM = {
			categoriesList: $(".sc-home-categories .categories-list"),
			categoriesWrap: $(".sc-home-categories .categories-wrap"),
		};

		let tlWrap = marquee(DOM.categoriesList, DOM.categoriesWrap, 20);

		const updateScroll = new gsap.timeline({
			scrollTrigger: {
				trigger: ".sc-home-categories .categories-wrap",
				onUpdate() {
					let velo = gsap.utils.clamp(1, 3, Math.abs(lenis.velocity).toFixed(3));

					gsap.set(tlWrap, { timeScale: 1 * velo, overwrite: true });
				},
			},
		});
	};

	const textLineSetup = () => {
		const DOM = {
			textLarge: $(".sc-home-special-textrun.first-text .special-text-wrap"),
			wrapTextLarge: $(".sc-home-special-textrun.first-text"),

			textSmall: $(".sc-home-special-textrun.second-text .special-text-wrap"),
			wrapTextSmall: $(".sc-home-special-textrun.second-text"),
        };

		DOM.wrapTextLarge.append(DOM.textLarge.clone());
		DOM.wrapTextLarge.append(DOM.textLarge.clone());
		DOM.wrapTextLarge.append(DOM.textLarge.clone());

		DOM.wrapTextSmall.append(DOM.textSmall.clone());
		DOM.wrapTextSmall.append(DOM.textSmall.clone());
		DOM.wrapTextSmall.append(DOM.textSmall.clone());

		const totalTextLarge = $(".sc-home-special-textrun.first-text .special-text-wrap");
		const totalTextSmall = $(".sc-home-special-textrun.second-text .special-text-wrap");

		function cssCloneSetup(total) {
			for (let i = 0; i < total.length; i++) {
				if (i === 0) {
					total.eq(i).css({
						position: "relative",
						top: 0,
						left: 0,
					});
				} else {
					total.eq(i).css({
						position: "absolute",
						top: 0,
						left: 0,
					});
				}
			}
		}

		cssCloneSetup(totalTextLarge);
		cssCloneSetup(totalTextSmall);
	};

	textLineSetup();

	const animTextSpecial = () => {
		const DOM = {
			textLarge: $(".sc-home-special-textrun.first-text .special-text-wrap"),
			wrapTextLarge: $(".sc-home-special-textrun.first-text"),

			textSmall: $(".sc-home-special-textrun.second-text .special-text-wrap"),
			wrapTextSmall: $(".sc-home-special-textrun.second-text"),
		};

		let tl = marquee(DOM.textLarge, DOM.wrapTextLarge, 20);
        marquee(DOM.textSmall, DOM.wrapTextSmall, 20, "left");

        const updateScroll = new gsap.timeline({
			scrollTrigger: {
				trigger: DOM.wrapTextLarge,
				onUpdate() {
					let velo = gsap.utils.clamp(1, 3, Math.abs(lenis.velocity).toFixed(3));
					gsap.set(tl, { timeScale: 1 * velo, overwrite: true });
				},
			},
        });
	};

	const latestReleaseSlide = new Swiper(".sc-home-latest-slide", {
		slidesPerView: 6,
		spaceBetween: rem(40),
		initialSlide: 1,
		navigation: {
			nextEl: ".sc-home-latest-control .btn-slide.next",
			prevEl: ".sc-home-latest-control .btn-slide.prev",
		},
	});

	let header = document.querySelector("header");

	const addBgHeader = () => {
		let scrollY = window.pageYOffset;
		if (scrollY > header.offsetHeight) header.classList.add("isActive");
		else header.classList.remove("isActive");
	};

	const pageName = $(".main").attr("data-barba-namespace");
	if (pageName) {
		SCRIPT[`${pageName}Script`]();
	}

	$(window).on("scroll", function () {
		addBgHeader();
	});

	// function imageOnReady() {
	// 	preloadImages(".barrellist-item-img").then((_) => document.body.classList.remove("loading"));
	// }

	// imageOnReady();
	const initAnim = () => {
		animActiveSlideSpecial();
		animCategories();
		animTextSpecial();

		$("body")
			.imagesLoaded()
			.progress({ background: true }, function (instance, image) {})
			.always(function (instance) {
				$(".loading").addClass("--show");
			})
			.fail(function () {
				console.log('all images loaded, at least one is broken');
			})
			.done(function (instance) {
				$(".loading").removeClass("--show").addClass("--hide");
				console.log('all images successfully loaded');
			});
	};

	initAnim();

};

window.onload = function () {
	// select = (e) => document.querySelector(e);
	// selectAll = (e) => document.querySelectorAll(e);

	script();
	console.log("abc");
};
