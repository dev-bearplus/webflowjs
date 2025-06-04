gsap.registerPlugin(ScrollTrigger);

const script = () => {
	let widthSC = $(window).width();
	let heightSC = $(window).height();

	const domain = window.location.host;
	const isStaging = domain.includes('webflow') ? true : false;

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
		const calcVW = (initPX / maxWidth) * 100;

		initPX = widthSC < maxWidth ? (calcVW * widthSC) / 1000 : initPX / 10;

		return (value) => value * initPX;
	};

	let rem;
	const responsiveRem = () => {
		rem = useRem(10, 1600);

		switch (true) {
			case widthSC <= 991:
				rem = useRem(10, 991);
				break;
			case widthSC <= 767:
				rem = useRem(15, 767);
				break;
			case widthSC <= 497:
				rem = useRem(10, 497);
				break;
		}
	};
	responsiveRem();

	select = (e) => document.querySelector(e);
	selectAll = (e) => document.querySelectorAll(e);

	const hooks = {
		convertQueryURLToObj: (queryString = window.location.search) => {
			try {
				var search = queryString.substring(1);
				return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
			} catch (err) {
				return {};
			}
		},
		changeQueryURL: () => {},
		copyLinkToClipboard: (link) => {
			let $temp = $("<input>");
			$("body").append($temp);
			$temp.val(link).select();
			document.execCommand("copy");
			$temp.remove();
		},
	};

    let lastScrollTop = 0;

	const handleHeader = {
		toggleHide: (e) => {
			let st = $(this).scrollTop();
			let headerHeight = $(".header").outerHeight();
			if (st > lastScrollTop) {
				if (st > (headerHeight * 3)) {
					$("header").addClass("hide");
				}
			} else {
				if (st > (headerHeight * 3)) {
					$("header").addClass("hide");
					$("header").removeClass("hide");
				}
			}
			lastScrollTop = st;
		},
		addBG: () => {
			const scrollPos = {
				x: window.pageXOffset,
				y: window.pageYOffset,
			};
			if (scrollPos.y > $("header").height()) $("header").addClass("active");
			else $("header").removeClass("active");
        },
        toggleNav: () => {
			$(".hamburger").on("click", function (e) {
				e.preventDefault();

                if ($("body").hasClass("openNav")) {
					$("body").removeClass("openNav");

					$(".header-link").removeClass("active");
					$(".nav-dropdown-list").slideUp();
					// $("header").css("transform", "translate(0px, 0px)");

                    lenis.start();
                }
                else {
                    $("body").addClass("openNav");

                    lenis.stop();
                }
            })
		},
		toggleDropdown: () => {
			const DOM = {
				dropdownTitle: $(".header-link"),
				dropdownList: $(".nav-dropdown-list"),
			};

			DOM.dropdownList.hide();
			DOM.dropdownTitle.removeClass('active');

			DOM.dropdownTitle.on("click", function () {
				if ($(this).hasClass(".active")) {
					$(this).removeClass("active");
					$(this).siblings(".nav-dropdown-list").slideUp();
				}
				else {
					$(this).toggleClass("active");
					$(this).siblings(".nav-dropdown-list").slideToggle();

					DOM.dropdownTitle.not($(this)).removeClass("active");
					DOM.dropdownTitle.not($(this)).siblings(".nav-dropdown-list").slideUp();
				}
			});
		},
		resetLinkCurrenPage: () => {
			const DOM = {
				linkPage: $(".nav-dropdown-item-link"),
			}

			DOM.linkPage.on("click", function (e) {
				if (!$(this).attr("href").includes(window.location.pathname)) return;

				$(".hamburger").trigger("click");
			})
		}

	};

	const readMore = (classDetect) => {
		classDetect.hide();

		$(".btn-main.read-more").on("click", function (e) {
			e.preventDefault();
			$(this).hide();
			classDetect.slideDown();
		});
	};

	const parentSelect = (parent) => {
		return (child) => $(parent).find(child);
	}

	const socialShare = (btnList) => {
		let slug = window.location.pathname.split("/").slice(1);

		if (slug.length > 1) {
			const url = window.location.href;
			const title = document.title;

			for (let i = 0; i < $(btnList).length; i++) {
				let href, options;
				const typeBtn = $(btnList).eq(i).attr("data-share-link");

				switch (typeBtn) {
					case "facebook":
						href = "https://www.facebook.com/sharer/sharer.php?u=";
						options = "%3F";
						break;
					case "twitter":
						href = "https://twitter.com/share?url=";
						options = "&summary=";
						break;
					case "linkedin":
						href = "https://www.linkedin.com/shareArticle?mini=true&url=";
						options = "&summary=";
						break;
					default: break;
				}

				// setHref
				$(btnList).eq(i).attr("href", `${href}${url}%2F&title=${title}${options}`);
			}
			$(btnList)
				.closest(".link")
				.on("click", function (e) {
					hooks.copyLinkToClipboard(url);
				});
		}
	}


	const activeDOM = (domDetect, index) => {
		domDetect.removeClass('active');
		domDetect.eq(index).addClass('active');
	}

	const dehydratorsSwiperGroup = {
		swiperTimeline: () => {
			const parent = parentSelect(".dehy-hwork-timeline-area-wrap");

			const swiperSetup = new Swiper(parent(".swiper").get(), {
				slidesPerView: 1,
				spaceBetween: 0,
				navigation: {
					nextEl: parent(".ctrl-next").get(),
					prevEl: parent(".ctrl-prev").get(),
					disabledClass: "disabled",
				},
				on: {
					slideChange: function () {
						let currentIndex = this.realIndex + 1;
						parent(".current-index").html(currentIndex);
					},
					beforeInit: function () {
						let totalSlide = parent(".swiper-slide").length;
						parent(".total-slide").html(totalSlide);
					},
				},
			});
		},
		swiperService: () => {
			const parent = parentSelect(".dehy-service-step");

			const swiperSetup = new Swiper(parent(".swiper").get(), {
				slidesPerView: 1,
				spaceBetween: rem(30),
				navigation: {
					nextEl: parent(".ctrl-next").get(),
					prevEl: parent(".ctrl-prev").get(),
					disabledClass: "disabled",
				},
				on: {
					slideChange: function () {
						let currentIndex = this.realIndex + 1;
						parent(".current-index").html(currentIndex);
					},
					beforeInit: function () {
						let totalSlide = parent(".swiper-slide").length;
						parent(".total-slide").html(totalSlide);
					},
				},
			});
		}
	}

	const capture = (video, canvas) => {
		const w = video.videoWidth;
		const h = video.videoHeight;
		let ctx = canvas.getContext('2d');

		video.load();
		video.addEventListener('loadedmetadata', function() {
			canvas.width = w;
			canvas.height = h;
		});

		video.addEventListener('canplay', function() {
			canvas.style.display = 'inline';
			ctx.drawImage(video, 0, 0, w, h);
		});
	}

	const vidFirstStart = (video) => {
		const DOM = {
			playArea: $(".dehy-hwork-vid-layer"),
			canvas: $("#video-canvas"),
			btnPlay: $(".btn-play-wrap")
		}

		if (!DOM.btnPlay.length) return;

		video.on("click", function () {
			gsap.to(DOM.canvas, {
				autoAlpha: 0,
				pointerEvents: "none"
			})
			gsap.to(video, {
				autoAlpha: 1,
			})
			gsap.to(DOM.btnPlay, {
				scale: 0.5,
				duration: 0.5,
				autoAlpha: 0,
				onComplete: () => {
					DOM.btnPlay.remove();
				}
			})
		})
	}

	const SCRIPT = {};

	SCRIPT.homeScript = () => {
		console.log("homepage 👉️");

		const heroAnim = () => {
			let templateArr = $(".home-hero-circle-arr-wrap").eq(0).clone();
            let countArr = 3;
			let countWave = 4;

			$(".home-hero-circle-gr-arrows").html("");
			for (let x = 0; x < countArr; x++) {
				let html = templateArr.clone();
				html.css("transform", `rotate(${80 + (360 / countArr) * x}deg)`);
				$(".home-hero-circle-gr-arrows").append(html);
			}
			let templateWave = $(".home-circle-wave-item").eq(0).clone();
			$(".home-circle-wave-inner").html("");
			for (let x = 0; x < countWave; x++) {
				let html = templateWave.clone();
				html.css("animation-delay", `${(-24 / countWave) * x}s`);
				$(".home-circle-wave-inner").append(html);
			}
        };

        const swiperCaseStudy = () => {
			const parent = parentSelect(".home-cstudy-area");
            const swiperSetup = new Swiper(parent(".swiper").get(), {
				slidesPerView: 1,
				spaceBetween: rem(30),
				navigation: {
					nextEl: parent(".ctrl-next").get(),
					prevEl: parent(".ctrl-prev").get(),
					disabledClass: "disabled",
				},
				on: {
					slideChange: function () {
						let currentIndex = this.realIndex + 1;
						parent(".current-index").html(currentIndex);
					},
					beforeInit: function () {
						let totalSlide = parent(".swiper-slide").length;
						parent(".total-slide").html(totalSlide);
					},
				},
				breakpoints: {
					768: {
						slidesPerView: 2,
						spaceBetween: rem(24),
					},
				},
			});
		}

		const swiperHomeProduct = () => {
			const parent = parentSelect(".home-hwork-mainimg");

			let cateEl = $('[data-link="category"]');
			cateEl.on("click", function (e) {
				$(this).attr("href", `/case-study?category=${$(this).text().replace(" ", "+")}`);
			})

			const updateLinkButton = (index) => {
				let href = $(".home-hwork-tab-item").eq(index).data("slug");

				$(".home-hwork-btn").removeAttr("href");
				$(".home-hwork-btn").attr("href", `/${href}`);
			}

			const swiperSetup = new Swiper(parent(".swiper").get(), {
				slidesPerView: 1,
				spaceBetween: 0,
				speed: 1500,
				effect: 'fade',
				fadeEffect: { crossFade: true },
				allowTouchMove: false,
				autoplay: {
					delay: 3000,
					disableOnInteraction: false
				},
				loop: true,
				on: {
					slideChange: function () {
						let currentIndex = this.realIndex + 1;
						activeDOM($(".home-hwork-tab-item"), currentIndex - 1);
						activeDOM($(".home-hwork-mainimg-wrap"), this.activeIndex);
						updateLinkButton(currentIndex - 1);
					},
					beforeInit: function () {
					},
				},
			});

			$(".home-hwork-tab-item").on('click', function (e) {
				e.preventDefault();
				let index = $(this).index();
				updateLinkButton(index);
				swiperSetup.slideTo(index + 1);
			})
		}

		const popupFullScreenHandle = () => {
			const DOM = {
				popupWrap: $('.popup-area'),
				close: $('.popup-close'),
				backgroundLayer: $('.popup-bg')
			}

			gsap.set(DOM.popupWrap, {
				autoAlpha: 0,
			})
			gsap.to(DOM.popupWrap, {
				autoAlpha: 1,
				duration: 0.5,
				pointerEvents: "auto",
				ease: 'linear',
				onComplete: () => {
					lenis.stop();
					$(".body").css("overflow", "hidden");
				}
			})

			const closePopup = () => {
				gsap.to(DOM.popupWrap, {
					autoAlpha: 0,
					duration: 0.5,
					ease: 'linear',
					clearProps: "all",
					onComplete: () => {
						DOM.popupWrap.remove();
						lenis.start();
						$(".body").css("overflow", "auto");

					}
				})
			}

			DOM.close.on('click', function (e) {
				e.preventDefault();
				closePopup();
			})

			DOM.backgroundLayer.on('click', function () {
				closePopup();
			})
		}


		function init() {
			heroAnim();
			popupFullScreenHandle();
			swiperHomeProduct();

			activeDOM($(".home-hwork-tab-item"), 0);
			activeDOM($(".home-hwork-mainimg-wrap"), 0);

			if (widthSC <= 991) {
				swiperCaseStudy();
			}
			if (widthSC <= 767) {
				readMore($(".home-chal-sub-hide"));
			}
		}

		init();

    };

    SCRIPT.productScript = () => {
		console.log("productPage 👉️");

		$(".dehy-prod-list").each(function () {

			const parent = parentSelect($(this));
			let totalIndex = parent(".total-slide").length;

			if (widthSC <= 991) {
				const swiperProduct = new Swiper(parent(".swiper").get(), {
					slidesPerView: 1,
					spaceBetween: rem(30),
					navigation: {
						nextEl: parent(".ctrl-next").get(),
						prevEl: parent(".ctrl-prev").get(),
						disabledClass: "disabled",
					},
					on: {
						slideChange: function () {
							let currentIndex = this.realIndex + 1;
							parent(".current-index").html(currentIndex);
						},
						beforeInit: function () {
							let totalSlide = parent(".swiper-slide").length;
							parent(".total-slide").html(totalSlide);
						},
					},
					breakpoints: {
						768: {
							slidesPerView: 2,
							spaceBetween: rem(20),
						},
					},
				});
			}
		});

		const toggleInterest = () => {
			const DOM = {
				stage: $(".dehy-sc-prod"),
				form: $(".interest-form"),
			};
			gsap.set(".interest-form", { autoAlpha: 0, y: 30 });
			const toggleHide = (autoAlpha) => {
				if (autoAlpha === 1) gsap.to(DOM.form, { ease: "power2", autoAlpha: 1, y: 0, duration: 0.5 });
				else gsap.to(".interest-form", { ease: "power2", autoAlpha: 0, y: 30, duration: 0.5 });
			};
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: DOM.stage,
					start: "top+=300 bottom",
					end: "bottom+=300 bottom",
					onEnter: () => {
						toggleHide(1);
					},
					onLeave: () => {
						toggleHide(0);
					},
					onEnterBack: () => {
						toggleHide(1);
					},
					onLeaveBack: () => {
						toggleHide(0);
					},
				},
			});
		};

		if (widthSC <= 991) {

        }
        if (widthSC <= 767) {
            dehydratorsSwiperGroup.swiperTimeline();
			dehydratorsSwiperGroup.swiperService();
			readMore($(".dehy-hwork-sub").find("p").eq(1));
		}
		toggleInterest();
	}

	SCRIPT.contactScript = () => {
		console.log("contactPage 👉️");

		const cusSelectField = () => {
			$(".cus-select-field").each(function () {
				$(this).children().first().attr("disabled", "disabled");
			});
		};

		cusSelectField();

	}

	SCRIPT.aboutUsScript = () => {
		console.log("aboutPage 👉️");
		const swiperProduct = new Swiper(".about-prod-slide", {
			slidesPerView: 1,
			spaceBetween: 0,
			grabCursor: true,
			loop: true,
			loopAdditionalSlides: 4,
			autoplay: {
				delay: 3000,
			},
			navigation: {
				nextEl: ".about-prod-control-btn.ctrl-next",
				prevEl: ".about-prod-control-btn.ctrl-prev",
				disabledClass: "disabled",
			},
			breakpoints: {
				992: {
					navigation: {
						enabled: false,
					},
				},
			},
		});

		const swiperBenefit = () => {
			const parent = parentSelect(".about-benefit-slide");

			const swiperSetup = new Swiper(parent(".swiper").get(), {
				slidesPerView: 1,
				spaceBetween: rem(30),
				navigation: {
					nextEl: parent(".ctrl-next").get(),
					prevEl: parent(".ctrl-prev").get(),
					disabledClass: "disabled",
				},
				on: {
					slideChange: function () {
						let currentIndex = this.realIndex + 1;
						parent(".current-index").html(currentIndex);
					},
					beforeInit: function () {
						let totalSlide = parent(".swiper-slide").length;
						parent(".total-slide").html(totalSlide);
					}
				}
			});
		}


		const swiperService = () => {
			const parent = parentSelect(".about-service-step");

			const swiperSetup = new Swiper(parent(".swiper").get(), {
				slidesPerView: 1,
				spaceBetween: rem(30),
				navigation: {
					nextEl: parent(".ctrl-next").get(),
					prevEl: parent(".ctrl-prev").get(),
					disabledClass: "disabled",
				},
				on: {
					slideChange: function () {
						let currentIndex = this.realIndex + 1;
						parent(".current-index").html(currentIndex);
					},
					beforeInit: function () {
						let totalSlide = parent(".swiper-slide").length;
						parent(".total-slide").html(totalSlide);
					},
				},
			});
		}

		if (widthSC <= 767) {
			swiperBenefit();
			swiperService();
		}
	}


	SCRIPT.caseStudyScript = () => {
		console.log('case studies');

		let param = location.search;
		if (param != '') {
			$('[fs-cmsfilter-element="reset"]').removeClass('active')
		}

		$('[fs-cmsfilter-element="reset"]').on("click", function (e) {
			$(this).addClass("active");
		});

		$(".case-filter-radio [fs-cmsfilter-field]").on("click", function (e) {
			$('[fs-cmsfilter-element="reset"]').removeClass("active");
		});

		$(".case-item-cate").on("click", function () {
			$(`.case-filter-radio:contains(${$(this).text()})`).trigger("click");
			$('[fs-cmsfilter-element="reset"]').removeClass("active");
		});

		$(".btn-main.mod-news").on("click", function() {
			$(".case-item-cate").on("click", function () {
				$(`.case-filter-radio:contains(${$(this).text()})`).trigger("click");
				const scrollToTop = () => $("html, body").animate({ scrollTop: 0 }, 1000);
				const myTimeout = setTimeout(scrollToTop, 300);

				$('[fs-cmsfilter-element="reset"]').removeClass("active");
			});

			$(".case-item-cate").on("click", function () {
				return false;
			});
		});
	}

	SCRIPT.caseStudyDetailScript = () => {
		console.log('case study detail')
		socialShare(".case-temp-social-ic");

		let cateEl = $('[data-link="category"]');
		cateEl.attr('href',`/case-study?category=${cateEl.text().replace(' ', '+')}`)
	}

	SCRIPT.newsTempScript = () => {
		console.log("newsTemp");

		socialShare(".case-temp-social-ic");

		if (widthSC <= 991) {
			const parent = parentSelect(".news-related-area")
			const swiperSetup = new Swiper(parent(".swiper").get(), {
				slidesPerView: 1,
				spaceBetween: rem(30),
				navigation: {
					nextEl: parent(".ctrl-next").get(),
					prevEl: parent(".ctrl-prev").get(),
					disabledClass: "disabled",
				},
				on: {
					slideChange: function () {
						let currentIndex = this.realIndex + 1;
						parent(".current-index").html(currentIndex);
					},
					beforeInit: function () {
						let totalSlide = parent(".swiper-slide").length;
						parent(".total-slide").html(totalSlide);
					},
				},
				breakpoints: {
					768: {
						slidesPerView: 2,
						spaceBetween: rem(24),
					},
				},
			});
		}
	}

	SCRIPT.cirFoodEcoScript = () => {
		console.log("circleFood 👉️");
		if (widthSC <= 767) {
			const parent = parentSelect(".cir-certi-area");

			const swiperSetup = new Swiper(parent(".swiper").get(), {
				slidesPerView: 1,
				spaceBetween: rem(30),
				navigation: {
					nextEl: parent(".ctrl-next").get(),
					prevEl: parent(".ctrl-prev").get(),
					disabledClass: "disabled",
				},
				on: {
					slideChange: function () {
						let currentIndex = this.realIndex + 1;
						parent(".current-index").html(currentIndex);
					},
					beforeInit: function () {
						let totalSlide = parent(".swiper-slide").length;
						parent(".total-slide").html(totalSlide);
					},
				},
			});
		}
	};

	SCRIPT.householdScript = () => {
		console.log('house hold');

		const DOM = {
			imgWrap: $('.dehy-preorder-thumb-item-wrap'),
			infoTabTitle: $('.dehy-preorder-info-tab-item'),
			infoTabContent: $('.dehy-preorder-info-content-item'),
			radioBtn: $('.dehy-preorder-info-radio'),

			wave: $('.dehy-preorder-main-wave'),
			waveWrap: $('.dehy-preorder-main-wave-inner'),

			waitingBtn: $('.dehy-preorder-btn'),
			waitingPopupBtn: $('.waiting-list-btn'),
			waitingFormArea: $('.dehy-preorder-form'),
			waitingForm: $('.waiting-form-block-wrap'),
			waitingFormSuccess: $('.success-message'),
			waitingClose: $('.waiting-form-close'),
			waitingLayer: $('.popup-bg'),

			video: select(".benchtop-vid"),
			canvas: select("#video-canvas")

		}
		const parent = parentSelect(".dehy-preorder-main-wrap");

		const swiper = new Swiper(parent('.swiper').get(), {
			slidesPerView: 1,
			spaceBetween: 0,
			effect: 'fade',
			speed: 1000,
			fadeEffect: { crossFade: true },
			allowTouchMove: false,
			autoplay: {
				delay: 10000,
				disableOnInteraction: false,
			},
			on: {
				slideChange: (slide) => {
					playAnimCircle(slide.realIndex);
				}
			}
		})

		const playAnimCircle = (index) => {
			activeDOM(DOM.imgWrap, index);

			let el = DOM.imgWrap.eq(index).find('.dehy-preorder-thumb-item-loading');
			let tl = gsap.timeline({});
			tl
				.set(el, {
					background: 'conic-gradient(currentColor 0grad, 0grad, transparent 400grad)',
					overwrite: true
				})
				.to(el, {
					background: 'conic-gradient(currentColor 400grad, 400grad, transparent 400grad)',
					duration: 10
				}, 0)

		}
		DOM.imgWrap.on('click', function(e) {
			e.preventDefault();
			let index = $(this).parent().index();
			swiper.slideTo(index);
		})

		DOM.infoTabTitle.on('click', function (e) {
			e.preventDefault();
			let index = $(this).index();
			activeDOM(DOM.infoTabTitle, index);
			activeDOM(DOM.infoTabContent, index);
		})

		DOM.radioBtn.on('click', function (e) {
			e.preventDefault();
			let index = $(this).index();
			activeDOM(DOM.radioBtn, index);
		})

		const waveAnim = () => {
			countWave = 2;

			let waveArr = DOM.waveWrap.eq(0).clone();
			DOM.wave.html("");
			for (let i = 0; i < countWave; i++) {
				let html = waveArr.clone();
				html.css("animation-delay", `${(-24 / countWave) * i}s`);
				DOM.wave.append(html);
			}
		}

		const handleWaitingListForm = () => {
			const openPopup = () => DOM.waitingFormArea.addClass('active');
			const closePopup = () => {
				DOM.waitingFormArea.removeClass('active');
				DOM.waitingForm.css('display', 'grid');

				if (!(DOM.waitingFormSuccess.css('display') == 'none')) {
					DOM.waitingForm.trigger('reset');
					DOM.waitingFormSuccess.css('display', 'none');
				}
			};

			DOM.waitingBtn.on('click', function(e) {
				e.preventDefault();
				openPopup();
			});
			DOM.waitingPopupBtn.on('click', function (e) {
				e.preventDefault();
				openPopup();
			})
			DOM.waitingClose.on('click', function(e) {
				e.preventDefault();
				closePopup();
			})
			DOM.waitingLayer.on('click', function() {
				closePopup();
			})
		}

		const popupHorizontalHandle = () => {
			const DOM = {
				stage: $('.dehy-sc-preorder'),
				popup: $('.popup-horizontal'),
				close: $('.popup-horizontal .popup-close')
			}
			gsap.set(DOM.popup, {
				yPercent: 30,
				autoAlpha: 0,
			})
			gsap.to(DOM.popup, {
				yPercent: 0,
				duration: 1,
				delay: 0.2,
				autoAlpha: 1,
				ease: "easeInOut",
				pointerEvents: "auto",
			})

			const toggleHide = (autoAlpha) => {
				if (autoAlpha === 1)
					gsap.to(DOM.popup, {
						autoAlpha: 1,
						y: 0,
						duration: 1,
						delay: 0.2,
						ease: "easeInOut",
						pointerEvents: "auto",
					})
				else
					gsap.to(DOM.popup, {
						autoAlpha: 0,
						y: 30,
						duration: 1,
						ease: "easeInOut",
						pointerEvents: "none",
					});
			}
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: DOM.stage,
					start: "top top+=70%",
					onEnter: () => {
						if (widthSC > 767) toggleHide(0);
					},
					onLeaveBack: () => {
						if (widthSC > 767) toggleHide(1);
					},
				},
			});

			DOM.close.on("click", function (e) {
				e.preventDefault();
				if (widthSC <= 767) {
					toggleHide(0);
				}
			})
		}

		function init() {
			playAnimCircle(0);
			// waveAnim();
			popupHorizontalHandle();
			// handleWaitingListForm();

			activeDOM(DOM.infoTabTitle, 0);
			activeDOM(DOM.infoTabContent, 0);
			activeDOM(DOM.radioBtn, 0);

			if (widthSC <= 767) {
				dehydratorsSwiperGroup.swiperTimeline();
				dehydratorsSwiperGroup.swiperService();
			}
		}

		init();
	}

	SCRIPT.cardTaggingScript = () => {
		console.log("card tagging 👉️");
		const DOM = {
			video: select(".card-access-vid"),
			canvas: select("#video-canvas")
		}

		function init() {
			if (widthSC <= 767) {
				dehydratorsSwiperGroup.swiperTimeline();
				dehydratorsSwiperGroup.swiperService();
			}
		}

		init();
	}

	SCRIPT.faqScript = () => {
		console.log("faq 👉️");

		const handleAccordion = () => {
			const DOM = {
				el: $(".accordion"),
				title: $(".accordion-title"),
				content: $(".accordion-content"),
			}
			DOM.content.hide();

			const activeAccordion = (el) => {
				el.slideToggle();
				el.parent().toggleClass("active");

				$(".accordion-content").not(el).slideUp();
				$(".accordion-content").not(el).parent().removeClass("active");
			};

			$('.faq-content-result-linkblock').on('click', function (e) {
				e.preventDefault();
				var target = $(e.target);
				if (target.is("a")) target.preventDefault();

				else if (target.hasClass('accordion-title')) {
					const contentEl = target.siblings(DOM.content);
					activeAccordion(contentEl);
				}
			})
		}

		const handleTab = (index) => {
			const DOM = {
				tab: $('.faq-title-tabs-item'),
				content: $('.faq-content-tabs-item'),
			}
			const activeTab = (index) => {
				activeDOM(DOM.tab, index);
				activeDOM(DOM.content, index);

				DOM.content.fadeOut("slow");
				DOM.content.eq(index).fadeIn("slow");
			}

			DOM.tab.on('click', function (e) {
				e.preventDefault();
				let index = $(this).parent().index();
				const scrollToTop = () => lenis.scrollTo("top", {
					duration: 1.7,
					lock: true,
					easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
				})

				const myTimeout = setTimeout(() => {
					if (widthSC > 767) scrollToTop();
					activeTab(index);
				}, 300);
			})

			function initTab() {
				activeTab(0);

				gsap.to('.white-layer', {
					opacity: 0,
					duration: 0.3,
					ease: "easeInOut",
					delay: 0.5,
					onComplete: () => {
						$('.white-layer').remove();
					}
				})
			}
			initTab();
		}

		function init() {
			handleAccordion();
			handleTab(0);
		}
		init();

	}

	handleHeader.toggleNav();

	if (widthSC <= 991) {
		handleHeader.toggleDropdown();
		handleHeader.resetLinkCurrenPage();
	}

	$(window).on("scroll", function () {
        handleHeader.addBG();
        handleHeader.toggleHide();
	});

	const pageName = $(".main").attr("name-space");
	if (pageName) {
		SCRIPT[`${pageName}Script`]();
	}
}

window.onload = function () {
    script();
    console.log("loaded");
}