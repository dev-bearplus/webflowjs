const script = () => {
    function easing(x) {
		return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
	}

	const lenis = new Lenis({
		easing: easing,
    });

    let velo = 1;
    lenis.on("scroll", ({ scroll, limit, velocity, direction, progress }) => {
        velo = gsap.utils.clamp(1, 3, Math.abs(velocity).toFixed(3));
    });

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
    requestAnimationFrame(raf);

    //Variables
    let viewport = {
        width: $(window).width(),
        height: $(window).height(),
        pixelRatio: window.devicePixelRatio,
    }

    //HOOKS
    const useRem = (initPX, maxWidth) => {
		const calcVW = (initPX / maxWidth) * 100;

		initPX = viewport.width < maxWidth ? (calcVW * viewport.width) / 1000 : initPX / 10;

		return (value) => value * initPX;
    };

	let rem;
    const responsiveRem = () => {
		rem = useRem(10, 1728);

		switch (true) {
			case viewport.width <= 991:
				rem = useRem(10, 991);
				break;
			case viewport.width <= 767:
				rem = useRem(15, 767);
				break;
			case viewport.width <= 497:
				rem = useRem(10, 497);
				break;
		}
    };

    const vh = (val) => window.innerHeight * (val/100);
    const vw = (val) => window.innerWidth * (val/100);
    const percentage = (percent, total) => ((percent / 100) * total).toFixed(2);

    const childrenSelect = (parent) => {
		return (child) => $(parent).find(child);
	}

    const debounce = (fn, delay) => {
        delay = delay || 0;
        let timerId;
        return () => {
            if (timerId) {
                clearTimeout(timerId);
                timerId = null;
            }
            timerId = setTimeout(() => fn(), delay);
        }
    }

    const swiper = {
        setup: (parent, options = {}) => {
            return new Swiper(parent('.swiper').get(), {
                slidesPerView: options.onView || 1,
                spaceBetween: options.spacing || 0,
                allowTouchMove: options.touchMove || false,
                navigation: options.nav ? ({
                    nextEl: parent('.next').get(),
                    prevEl: parent('.prev').get(),
                    disabledClass: "disabled"
                }) : false,
                ...options,
                on: options.on
            })
        },
        changeCurrentItem: function (parent, index, callback) {
            parent(".curr-item").html(index);
            if (callback) callback();
        },
        initTotalSlide: function (parent) {
            let totalSlide = parent(".swiper-slide").length;
            parent(".total-slide").html(totalSlide);
        }
    }

    const marquee = (item, wrap, duration, start = "right") => {
        const direction = {
            right: "-=",
            left: "+="
        };
        gsap.set(item, { x: (i) => (i - 1) * item.eq(0).width() });
        let mqTl = gsap.timeline({
            repeat: -1,
            onReverseComplete() {
                this.totalTime(this.rawTime() + this.duration() * 10);
            }
        });
        mqTl.to(wrap, {
            x: direction[start] + `${item.eq(0).width()}`,
            duration: duration,
            ease: "none",
        });

        return mqTl;
    }

    function createToc(richTextEl) {
        let headings = $(richTextEl).find('h3');
        let tocWrap = $('.toc-inner');

        if (headings.length <= 1) {
            tocWrap.parent().remove();
        }

        tocWrap.html('');
        for (let i = 0; i < headings.length; i++) {
            headings.eq(i).attr('id', `toc-${i}`);
            let tocItem = $('<a></a>').addClass('toc-item-link').attr('href', `#toc-${i}`);
            let tocOrdinal = $('<div></div>').addClass('txt txt-14 toc-item-ordinal').text(`${i + 1}.`).appendTo(tocItem);
            let [ordinal, ...[title]] = headings.eq(i).text().split('. ');
            let tocName = $('<span></span>').addClass('txt txt-14 toc-item-txt').text(`${[ordinal].join('')}`).appendTo(tocItem)
            tocWrap.append(tocItem);
        }

        lenis.on('scroll', function (e) {
            let currScroll = e.scroll;
            for (let i = 0; i < headings.length; i++) {
                let top = headings.eq(i).get(0).getBoundingClientRect().top;
                if (top > 0 && top < ($(window).height() / 5)) {
                    $(`.toc-item-link[href="#toc-${i}"]`).addClass('active');
                    $(`.toc-item-link`).not(`[href="#toc-${i}"]`).removeClass('active');
                }
            }
        });

        $('.toc-item-link').on('click', function (e) {
            e.preventDefault();
            let target = $(this).attr('href');

            lenis.scrollTo(target, {
                offset: -100,
            })

            history.replaceState({}, '', `${window.location.pathname + target}`);
            return false;
        })

        function updateToc() {
            const currToc = window.location.hash;
            if (!currToc) return;
            if ($(currToc).length) {
                setTimeout(() => {
                    $(`.toc-item-link[href='${currToc}']`).trigger('click');
                }, 10)
            }
            else {
                history.replaceState({}, '', window.location.pathname);
            }
        }
        updateToc();
    }
    let lastScrollTop = 0;

    function toggleHeader() {
        let st = $(this).scrollTop();
        function toggleBG() {
            if (st > ($(".header-main").height()) * 2) $(".header-fixed").addClass("active");
            else $(".header-fixed").removeClass("active");
        }
        function toggleHideDesktop() {
            if (st > ($(".header-fixed").outerHeight() * 6)) {
                if (st > lastScrollTop) {
                    $(".header-fixed").addClass("hide ev-none");
                }
                else {
                    $(".header-fixed").removeClass("hide ev-none");
                }
            } else {
                $(".header-fixed").addClass("hide ev-none");
            }
            lastScrollTop = st;
        }
        function toggleHideMobile() {
            if (st > lastScrollTop) {
				if (st > ($(".header-fixed").outerHeight() * 3)) {
					$(".header-fixed").addClass("hide");
				}
			} else {
				if (st > ($(".header-fixed").outerHeight() * 3)) {
					$(".header-fixed").addClass("hide");
					$(".header-fixed").removeClass("hide");
				}
			}
			lastScrollTop = st;
        }
        if (viewport.width > 991) {
            toggleHideDesktop();
        }
        if (viewport.width <= 991) {
            toggleHideMobile();
            toggleBG();
        }
    }

    function navHandle() {
        function toggleNav() {
            $('.header-ham-wrap').on('click', function (e) {
                e.preventDefault();
                if ($('body').hasClass('open-nav')) {
                    $('body').removeClass('open-nav');
                    lenis.start();
                }
                else {
                    $('body').addClass('open-nav');
                    lenis.stop();
                }
            })
        }
        toggleNav();

        function toggleAccordionNav() {
            const parent = childrenSelect('.nav-content');
            const DOM = {
                accordion: parent('.nav-list-item'),
                accordionTitle: parent('.nav-item-link-wrap'),
                accordionContent: parent('.nav-list-item-drop')
            }
            parent(DOM.accordionContent).hide();
            function activeAccordion(index) {
                DOM.accordionContent.eq(index).slideToggle("slow");
                DOM.accordionTitle.eq(index).toggleClass("active");

                DOM.accordionContent.not(DOM.accordionContent.eq(index)).slideUp("slow");
                DOM.accordionTitle.not(DOM.accordionTitle.eq(index)).removeClass("active");
            };

            DOM.accordionTitle.on("click", function () {
                let index = $(this).index();
                activeAccordion(index);
            })
        }
        toggleAccordionNav();

    }

    function buttonHover() {
        let button = $('.btn').append('<span class="round"></span>');
        $('.btn').each((_, item) => {
            let round = $(item).find('.round');
            let heightItem = $(item).outerHeight();
            const getOffSet = (e) => {
                return {
                    x: e.offsetX,
                    y: e.offsetY
                }
            }
            $(item).on("mouseenter", (e) => {
                const offsetBtn = getOffSet(e);
                if (offsetBtn.y < (heightItem / 2)) {
                    round.css("top", '0px');
                } else if (offsetBtn.y > percentage(60, heightItem)) {
                    round.css("top", `${rem(heightItem)}px`);
                }

                round.css("left", `${offsetBtn.x}px`);
                round.css("width", "1px")
                round.css("height", "1px")
            })
            $(item).on("mouseleave", (e) => {
                const offsetBtn = getOffSet(e);
                if (offsetBtn.y < (heightItem / 2)) {
                    round.css("top", '0px');
                } else if (offsetBtn.y > percentage(60, heightItem)) {
                    round.css("top", `${rem(heightItem)}px`);
                }
                round.css("left", `${offsetBtn.x}px`);
            })
        })
    }
    buttonHover();

    function openIntercome() {
        $('[data-intercom]').on('click', function (e) {
            e.preventDefault();
            window.Intercom('show');
        })
    }

    function footerAccordion() {
        const parent = childrenSelect('.footer-content');
        const DOM = {
            accordion: parent('.footer-content-link-wrap'),
            accordionContent: parent('.accordion-content')
        }
        parent(DOM.accordionContent).hide();
        function activeAccordion(index) {
            DOM.accordionContent.eq(index).slideToggle("slow");
            DOM.accordion.eq(index).toggleClass("active");

            DOM.accordionContent.not(DOM.accordionContent.eq(index)).slideUp("slow");
            DOM.accordion.not(DOM.accordion.eq(index)).removeClass("active");
        };

        DOM.accordion.on("click", function () {
            let index = $(this).index();
            activeAccordion(index);
        })
    }
    function splitTextFadeUpSetup(className, types) {
        const splitTextItem = new SplitText(className, { type: 'lines, words', linesClass: "splittext-lines" });
        gsap.set(splitTextItem.lines, { overflow: 'hidden' });
        gsap.set(splitTextItem.words, { yPercent: 100 });
        gsap.set(className, { autoAlpha: 1 });
        return splitTextItem;
    }
    function refreshAllSTrigger() {
        console.log('remove scroll trigger')
        let triggers = ScrollTrigger.getAll();
        triggers.forEach(trigger => {
            trigger.refresh();
        });
    }

    const initAnimation = () => {
        const animGeneration = {
            initSelfSTrigger: (attr, fn) => {
                let listAttr = $(`[data-anim=${attr}]`);
                listAttr.each((_, item) => fn(item));
            },
            initStaggerSTrigger: (fn) => {
                let listTriggerWrap = $(`[data-anim-stagger-el="wrapper"]`);
                listTriggerWrap.each((_, item) => fn(item));
            },
            start: (item, originStart) => Number($(item).attr('data-anim-start')) || originStart,
            stagger: (item, originStagger) => Number($(item).attr('data-anim-stagger-distance')) || originStagger
        }

        function animFadeUp() {
            const ORIGIN_START = 90;
            const ANIM_ATTR = "fade-up";
            const ORIGIN_STAGGER = .1;
            const fadeUpType = {
                self: () => {
                    animGeneration.initSelfSTrigger(ANIM_ATTR, (item) => {
                        gsap.timeline({
                            scrollTrigger: {
                                trigger: item,
                                start: `top top+=${viewport.width > 767 ? animGeneration.start(item, ORIGIN_START) : 75}%`,
                            },
                        }).fromTo(item,
                            { yPercent: viewport.width > 767 ? 50 : 20, autoAlpha: 0, opacity: 0 },
                            { yPercent: 0, autoAlpha: 1, opacity: 1, duration: .8, ease: "power1.out", clearProps:'all' });
                    })
                },
                stagger: () => {
                    animGeneration.initStaggerSTrigger((stage) => {
                        let triggerItem = $(stage).find(`[data-anim-stagger-el="item"][data-anim-stagger=${ANIM_ATTR}]`);
                        gsap.timeline({
                            scrollTrigger: {
                                trigger: stage,
                                start: `top top+=${animGeneration.start(stage, ORIGIN_START)}%`,
                            },
                        }).fromTo(triggerItem,
                        { autoAlpha: 0, opacity: 0, yPercent: 50 },
                        { autoAlpha: 1, opacity: 1, yPercent: 0, duration: .8, stagger: animGeneration.stagger(stage, ORIGIN_STAGGER), clearProps:'all' })
                    });
                }
            }
            fadeUpType.self();
            fadeUpType.stagger();
        }

        function animFadeLeft() {
            const ORIGIN_START = 90;
            const ANIM_ATTR = "fade-left";
            const fadeUpType = {
                self: () => {
                    animGeneration.initSelfSTrigger(ANIM_ATTR, (item) => {
                        gsap.timeline({
                            scrollTrigger: {
                                trigger: item,
                                start: `top top+=${animGeneration.start(item, ORIGIN_START)}%`,
                            },
                        }).fromTo(item,
                            { x: -10, autoAlpha: 0, opacity: 0 },
                            { x: 0, autoAlpha: 1, opacity: 1, duration: .8, ease: "power1.out", clearProps:'all' });
                    })
                },
                stagger: () => {}
            }
            fadeUpType.self();
            fadeUpType.stagger();
        }

        function animFadeUpSplitText() {
            const ORIGIN_START = 85;
            const ANIM_ATTR = "fade-up-splitext";
            const ORIGIN_STAGGER = .15;
            const fadeUpSplitTextType = {
                self: () => {
                    animGeneration.initSelfSTrigger(ANIM_ATTR, (item) => {
                        let splitItem = new SplitText(item, { type: 'lines, words', linesClass: "splittext-lines" });
                        gsap.set(splitItem.lines, { overflow: 'hidden' });
                        gsap.set(splitItem.words, { yPercent: 100 });
                        gsap.timeline({
                            scrollTrigger: {
                                trigger: item,
                                start: `top top+=${viewport.width > 767 ? animGeneration.start(item, ORIGIN_START) : 75}%`,
                            },
                        }).to(splitItem.words, {
                            yPercent: 0, duration: .8, stagger: .04, ease: 'power2.out',
                            onComplete: () => {
                                splitItem.revert();
                            }
                        })
                    })
                },
                stagger: () => {
                    animGeneration.initStaggerSTrigger((stage) => {
                        let triggerItem = $(stage).find(`[data-anim-stagger-el="item"][data-anim-stagger=${ANIM_ATTR}]`);
                        gsap.set(triggerItem, { autoAlpha: 0 });

                        ScrollTrigger.batch(triggerItem, {
                            start: `top top+=${animGeneration.start(stage, ORIGIN_START)}%`,
                            onEnter: batch => {
                                batch.forEach((item, index) => {
                                    let splitItem = new SplitText(item, { type: 'lines, words', linesClass: "splittext-lines" });
                                    gsap.set(item, { autoAlpha: 1 });
                                    gsap.set(splitItem.lines, { overflow: 'hidden' });
                                    gsap.set(splitItem.words, { yPercent: 100, autoAlpha: 0 });
                                    let delayItem = (index, initDelay) => index != 0 ? initDelay * (index + 1) : initDelay;
                                    gsap.to(splitItem.words, { autoAlpha: 1, yPercent: 0, duration: .8, ease: 'power2.out',
                                            delay: delayItem(animGeneration.stagger(stage, ORIGIN_STAGGER), .5),
                                            onComplete: () => {
                                                splitItem.revert();
                                            }
                                        })
                                })
                            }
                        })
                    })
                }
            }
            fadeUpSplitTextType.self();
            fadeUpSplitTextType.stagger();
        }

        function animScaleX() {
            const ORIGIN_START = 100;
            const ANIM_ATTR = "scale-x";

            const scaleXType = {
                self: () => {
                    animGeneration.initSelfSTrigger(ANIM_ATTR, (item) => {
                        gsap.timeline({
                            scrollTrigger: {
                                trigger: item,
                                start: `top top+=${animGeneration.start(item, ORIGIN_START)}%`,
                            },
                        }).fromTo(item,
                            { scaleX: 0, transformOrigin: 'left', autoAlpha: 0, opacity: 0 },
                            { scaleX: 1, autoAlpha: 1, opacity: 1, duration: 1, ease: 'power1.inOut', clearProps: 'all' })
                    })
                },
                stagger: () => {}
            }
            scaleXType.self();
            scaleXType.stagger();
        }

        function animScaleInset() {
            const ORIGIN_START = 70;
            const ANIM_ATTR = "scale-inset";
            const ORIGIN_INSET = 20;

            const scaleInsetType = {
                self: () => {
                    animGeneration.initSelfSTrigger(ANIM_ATTR, (item) => {
                        let innerOfItem = $(item).find('[data-anim-inset="inner"]');
                        let insetItem = $(item).attr('data-anim-inset') || ORIGIN_INSET;
                        gsap.set(item, { clipPath: `inset(${insetItem}%)` });
                        gsap.set(innerOfItem, { scale: 1.4, autoAlpha: 0 });
                        gsap.timeline({
                            scrollTrigger: {
                                trigger: item,
                                start: `top top+=${animGeneration.start(item, ORIGIN_START)}%`,
                            },
                        })
                        .to(item, { clipPath: 'inset(0%)', duration: 1.5, ease: 'expo.out', clearProps:'all' })
                        .to(innerOfItem, { scale: 1, duration: 1.5, autoAlpha: 1, ease: 'expo.out', clearProps:'all' }, 0)
                    })
                },
                stagger: () => {}
            }
            scaleInsetType.self();
            scaleInsetType.stagger();
        }

        refreshAllSTrigger();
        setTimeout(() => {
            animFadeUp();
            animFadeLeft();
            animFadeUpSplitText();
            animScaleX();
            animScaleInset();
        }, 200);
    }

    const addRatioImage = () => {
        $('[data-img-ratio]').each((_, item) => {
            let ratio = $(item).attr('data-img-ratio');
            gsap.set($(item), { paddingBottom: `${ratio}%` })
        })
    }

    const SCRIPT = {};

    SCRIPT.homeScript = () => {
        console.log("homepage 👉️");

        function homeHero() {
            let DOM = {
                marqueeList: $('.home-hero-showcase-wrap'),
                marqueeItem: $('.home-hero-showcase-list')
            }
            let cloneAmount = 2;
            const cloneAdditional = Math.floor(viewport.width / DOM.marqueeItem.width());
            if (cloneAmount >= 1) {
                cloneAmount += cloneAdditional;
            }
            for (let i = 0; i < cloneAmount; i++) {
                let itemClone = DOM.marqueeItem.clone();
                gsap.set(itemClone,{ position: "absolute", top: 0, left: 0 })
                DOM.marqueeList.append(itemClone);
            }

            let newMarqueeItem = $('.home-hero-showcase-list');
            newMarqueeItem.eq(0).css({ position: "relative", top: 0, left: 0 });
            const tlMarquee = marquee(newMarqueeItem, DOM.marqueeList, 30, "right");
            const updateScroll = new gsap.timeline({
                scrollTrigger: {
                    trigger: DOM.marqueeList,
                    onUpdate(self) {
                        let direction = 1;
                        if (viewport.width > 767) {
                            if (self.direction !== direction) direction *= -1;
                        }
                        gsap.to(tlMarquee, { timeScale: direction * velo, ease: 'power1.inOut', duration: 0.1, overwrite: true });
                    }
                }
            })

            function animShowEl() {
                const homeHeroTitle = splitTextFadeUpSetup('.home-hero-title');
                const homeHeroSub = splitTextFadeUpSetup('.home-hero-sub');
                const homeHeroReason = splitTextFadeUpSetup('.home-hero-reason-text');

                gsap.set('.home-hero-showcase-item', { autoAlpha: 0, yPercent: 40, xPercent: 30, rotate: -2 });
                gsap.set('.home-hero-reason-ic', { autoAlpha: 0 });
                gsap.set('.home-hero-btn', { autoAlpha: 0, y: 20 });
                gsap.set('.home-hero-link', { autoAlpha: 0, y: 20 });
                gsap.set('.home-hero-shopify-btn', { autoAlpha: 0, scale: .95 });
                gsap.set('.home-hero-showcase-bg', { yPercent: 100, autoAlpha: 1 });

                const homeHeroTl = gsap.timeline({ delay: 0.5 });
                homeHeroTl
                    .to(homeHeroTitle.words, {
                        yPercent: 0, duration: .8, stagger: .04, ease: 'power2.out',
                        onComplete: () => {
                            homeHeroTitle.revert();
                        }
                    }, '>-.4')
                    .to(homeHeroSub.words, {
                        yPercent: 0, duration: .5, stagger: .02, ease: 'power2.out',
                        onComplete: () => {
                            homeHeroSub.revert();
                        }
                    }, '>-.5')
                    .to('.home-hero-reason-ic', {
                        autoAlpha: 1, duration: 1, stagger: .06
                    }, '>-.4')
                    .to(homeHeroReason.words, {
                        yPercent: 0, duration: 1, stagger: .03, ease: 'power2.out',
                        onComplete: () => {
                            homeHeroReason.revert();
                        }
                    }, '>-1.3')
                    .to('.home-hero-btn', {
                        autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out'
                    }, '>-.8')
                    .to('.home-hero-showcase-item', {
                        autoAlpha: 1, yPercent: 0, xPercent: 0, rotate: 0, duration: 1.2, stagger: .05, ease: 'power2.inOut'
                    }, .35)
                    .to('.home-hero-showcase-bg', {
                        yPercent: 0, duration: 2.1, ease: 'power2.inOut'
                    }, '>-1.8')
                    .to('.home-hero-link', {
                        autoAlpha: 1, y: 0
                    }, '>-1.6')
                    .to('.home-hero-shopify-btn', {
                        autoAlpha: 1, scale: 1, duration: .4, ease: 'power2.out'
                    }, '>-.6')
            }
            animShowEl();
        }

        function homeIntro() {
            function activeTextSub() {
                function activeFade(index) {
                    $('.home-intro-thumb-txt').removeClass('fade-in');
                    $('.home-intro-thumb-txt').eq(index).addClass('fade-in');
                    $('.home-intro--item-txt').removeClass('active');
                    $('.home-intro--item-txt').eq(index).addClass('active');
                    $('.home-intro-thumb-img').removeClass('active');
                    $('.home-intro-thumb-img-wrap').each((_, item) => {
                        let img = $(item).find('.home-intro-thumb-img');
                        img.eq(index).addClass('active');
                    })
                }
                $('.home-intro--item').on('mouseenter', function (e) {
                    e.preventDefault();
                    let index = $(this).index();
                    activeFade(index)
                })
                activeFade(0);
            }

            function animShowEl() {
                $('.home-hiwork-wrapper').removeAttr('data-anim-stagger-el')
                $('.home-hiwork-wrapper').removeAttr('data-anim-stagger-distance')
                $('.home-hiwork-wrapper').attr('data-anim', 'fade-up');
                $('.home-hiwork-item').removeAttr('data-anim-stagger-el')
                $('.home-hiwork-item').removeAttr('data-anim-stagger')
            }

            if (viewport.width > 991) {
                activeTextSub();
            }
            else {
                animShowEl();
            }
        }

        function homeFeature() {
            function featureListScrollInit() {
                let allowScrollInner = false;
                let allItems = $('.home-feature-content-wrap .home-feature-content-cms-item');
                let allItemsImg = $('.home-feature-content .home-feature-content-img-cms-item .home-feature-content-img');
                let currIndex = 0;
                let animating = false;
                allItems.removeClass('prev')

                allItemsImg.eq(currIndex).addClass('active');
                $('.home-feature-content-total').text(allItemsImg.length);
                gsap.set('.home-feature-content-img-cms', { backgroundColor: allItemsImg.eq(0).attr('data-bg') });

                lenis.on('scroll', (inst) => {
                    // if (inst.scroll > $('.home-feature-main').offset().top && $('.home-feature-content-img-wrap').get(0).getBoundingClientRect().top - parseFloat($('.home-feature-content-img-wrap').css('margin-top')) >= -1) {
                    //     allowScrollInner = true;
                    // } else {
                    //     allowScrollInner = false;
                    // }
                    for (let i = 0; i < allItems.length; i++) {
                        let top = allItems.eq(i).get(0).getBoundingClientRect().top;
                        if (top > 0 && top < parseFloat($('.home-feature-content-img-wrap').css('margin-top'))) {
                            currIndex = i;
                            allItems.removeClass('active');
                            allItemsImg.removeClass('active');
                            allItems.eq(currIndex).addClass('active');
                            allItemsImg.eq(currIndex).addClass('active');
                            gsap.set('.home-feature-content-img-cms', { backgroundColor: allItemsImg.eq(currIndex).attr('data-bg') });
                            $('.home-feature-content-current').text(i + 1);
                        }
                        if (i < currIndex) {
                            allItems.eq(i).addClass('prev');
                        } else {
                            allItems.eq(i).removeClass('prev');
                        }
                    }
                })
                // function gotoSection(index) {
                //     if (index < 0 || index > allItems.length - 1) {
                //         return;
                //     }
                //     lenis.stop();
                //     animating = true;
                //     lenis.scrollTo(allItems.eq(index).get(0), {
                //         offset: -parseFloat($('.home-feature-content-img-wrap').css('margin-top')),
                //         force: true,
                //         duration: 1,
                //     })
                //     setTimeout(() => {
                //         lenis.start()
                //         animating = false;
                //     }, 1000);

                //     for (let i = 0; i < allItems.length; i++) {
                //         if (i < index) {
                //             allItems.eq(i).addClass('prev')
                //         } else {
                //             allItems.eq(i).removeClass('prev')
                //         }
                //     }

                //     allItemsImg.find('.home-feature-content-img').removeClass('active')
                //     allItemsImg.eq(index).find('.home-feature-content-img').addClass('active')
                //     $('.home-feature-content-current').text(index + 1)
                // }

                // Observer.create({
                //     type: "wheel,touch,pointer",
                //     wheelSpeed: 1,
                //     target: '.main',
                //     onDown: () => {
                //         if (allowScrollInner && !animating) {
                //             if (currIndex <= 0) {
                //                 currIndex = 0;
                //             }
                //             currIndex = currIndex + 1;
                //             gotoSection(currIndex)
                //         }
                //     },
                //     onUp: () => {
                //         if (allowScrollInner && !animating) {
                //             if (currIndex >= allItems.length - 1) {
                //                 currIndex = allItems.length - 1;
                //             }
                //             currIndex = currIndex - 1;
                //             gotoSection(currIndex)
                //         }
                //     },
                //     tolerance: 10,
                //     preventDefault: true
                // });
            }
            function featureListSlide() {
                const parent = childrenSelect('.home-feature-list-mb-wrap');
                $('.home-feature-list-mb-img-cms-item').fadeOut();
                $('.home-feature-list-mb-img-cms-item').eq(0).fadeIn();
                gsap.set('.home-feature-list-mb-img-list', {
                    backgroundColor: $('.home-feature-list-mb-img-cms-item').eq(0).attr('data-bg'),
                });
                const activeImage = (index) => {
                    $('.home-feature-list-mb-img-cms-item').fadeOut();
                    gsap.to('.home-feature-list-mb-img-list', {
                        backgroundColor: $('.home-feature-list-mb-img-cms-item').eq(index).attr('data-bg'),
                    });
                    $('.home-feature-list-mb-img-cms-item').eq(index).fadeIn();
                }
                swiper.setup(parent, {
                    nav: true,
                    on: {
                        init: () => swiper.changeCurrentItem(parent, 1),
                        slideChange: (slide) => {
                            let index = slide.activeIndex;
                            swiper.changeCurrentItem(parent, index + 1, activeImage(index));
                        },
                        beforeInit: () => swiper.initTotalSlide(parent)
                    }
                })
            }

            //init All Function
            function initSection() {
                if (viewport.width >767) {
                    featureListScrollInit();
                }
                if (viewport.width <= 767) {
                    featureListSlide();
                }
            }
            initSection();
        }

        function homeHowItWork() {
            const parent = childrenSelect('.home-hiwork-img-wrap');

            function playProgress(index) {
                let listItem = $('.home-hiwork-item');

                listItem.removeClass('active');
                listItem.eq(index).addClass('active');

                gsap.set('.home-hiwork-item-progress-line', { scaleX: 0, overwrite: true });
                let el = listItem.eq(index).find(".home-hiwork-item-progress-line");
                let tl = gsap.timeline();
                tl.set(el, { scaleX: 0, overwrite: true }).to(el, { scaleX: 1, duration: 5, overwrite: true });
            }
            playProgress(0);
            const activeImage = (index) => {
                $('.home-hiwork-img').removeClass('active');
                $('.home-hiwork-img').eq(index).addClass('active');
                playProgress(index);
            }
            $('.home-hiwork-img').removeClass('active');
            const homeHowItWorkSwiper = swiper.setup(parent, {
                nav: true,
                touchMove: true,
                speed: 1000,
                effect: "fade",
                fadeEffect: {
					crossFade: true,
                },
                autoplay: {
					delay: 5000,
					disableOnInteraction: false,
                },
                on: {
                    init: () => swiper.changeCurrentItem(parent, 1),
                    slideChange: (slide) => {
                        let index = slide.activeIndex;
                        swiper.changeCurrentItem(parent, index + 1, activeImage(index));
                    },
                    beforeInit: () => swiper.initTotalSlide(parent)
                }
            })
            if (viewport.width > 991) {
                $('.home-hiwork-item').on('click', function () {
                    let index = $(this).index();
                    playProgress(index);
                    homeHowItWorkSwiper.slideTo(index);
                })
            }
        }

        function homeLib() {
            function libMarquee(item) {
                let index = $(item).index();
                const DOM = {
                    marqueeList: $(item).find('.home-lib-marquee-cms-item'),
                    marqueeItem: $(item).find('.home-lib-marquee-list')
                }
                let cloneAmount = 2;
                const cloneAdditional = Math.floor(viewport.width / DOM.marqueeItem.width());
                if (cloneAmount >= 1) {
                    cloneAmount += cloneAdditional;
                }
                for (let i = 0; i < cloneAmount; i++) {
                    let itemClone = DOM.marqueeItem.clone();
                    itemClone.css({ position: "absolute", top: 0, left: 0 })
                    DOM.marqueeList.append(itemClone);
                };
                let newMarqueeItem = $(item).find('.home-lib-marquee-list');
                newMarqueeItem.eq(0).css({ position: "relative", top: 0, left: 0 });

                const tlMarquee = marquee(newMarqueeItem, DOM.marqueeList, 80, index == 0 ? "left" : "right");
                let isHover = false;
                const updateScroll = new gsap.timeline({
                    scrollTrigger: {
                        trigger: DOM.marqueeList,
                        onUpdate() {
                            if (!isHover) gsap.set(tlMarquee, { timeScale: 1 * velo, ease: 'power1.inOut', duration: 0.3, overwrite: true });
                        }
                    }
                })

                $(item).on("pointerenter", (event) => {
                    isHover = true;
                    gsap.to(tlMarquee, { timeScale: 0, ease: 'power1.inOut', duration: 0.3, overwrite: true });
                });
                $(item).on("pointerleave", (event) => {
                    isHover = false;
                    gsap.to(tlMarquee, { timeScale: 1, ease: 'power1.inOut', duration: 0.3, overwrite: true });
                });
            }
            $('.home-lib-marquee-item-overal').each((_, item) => libMarquee(item));

            // observer = new IntersectionObserver(entries => {
            //     entries.forEach(entry => {
            //         const el = entry.target;
            //         if (entry.isIntersecting) {
            //             libMarquee(el);
            //             observer.unobserve(el);
            //         } else {
            //         }
            //     });
            // });

            // document.querySelectorAll('.home-lib-marquee-item-overal').forEach(item => {
            //     observer.observe(item);
            // });
        }

        function homelvUp() {
            const parent = childrenSelect('.home-levelup-list-wrap');
            const DOM = {
                accordion: parent('.accordion'),
                accordionContent: parent('.accordion-content')
            }
            parent(DOM.accordionContent).hide();
            function activeAccordion(index) {
                DOM.accordionContent.eq(index).slideToggle("slow");
                DOM.accordion.eq(index).toggleClass("active");

                DOM.accordionContent.not(DOM.accordionContent.eq(index)).slideUp("slow");
                DOM.accordion.not(DOM.accordion.eq(index)).removeClass("active");
            };

            DOM.accordion.on("click", function () {
                let index = $(this).index();
                activeAccordion(index);
            })

            // setTimeout(() => {
            //     const tl = gsap.timeline({
            //         scrollTrigger: {
            //             trigger: '.home-levelup-thumb-title',
            //             start: `top top+=${rem(140)}`,
            //             markers: true,
            //             scrub: true
            //         }
            //     });
            //     tl.to('.home-levelup-thumb-title-txt', { y: -100, duration: 0.6, ease: 'linear' })
            // }, 500)
        }

        function homeNews() {
            const parent = childrenSelect('.home-news-testi-cms-img-out');

            function activeContentTesti(index) {
                const contentSplit = new SplitText('.home-news-testi-txt-content', { type: 'lines, words' });
                const nameSplit = new SplitText('.home-news-testi-txt-name', { type: 'lines, words' });
                const jobSplit = new SplitText('.home-news-testi-txt-job', { type: 'lines, words' });

                gsap.set([contentSplit.lines, nameSplit.lines, jobSplit.lines], {overflow: 'hidden'})

                gsap.to([contentSplit.words, nameSplit.words, jobSplit.words], {
                    autoAlpha: 0, duration: .4, ease: 'power1.out',
                    onComplete() {
                        $(".home-news-testi-txt-wrap").slideUp({
                            duration: 300,
                            ease: 'linear',
                            complete: () => gsap.set([contentSplit.words, nameSplit.words, jobSplit.words], { autoAlpha: 1 })
                        });
                        $('.home-news-testi-txt-wrap').eq(index).slideDown({
                            duration: 300,
                            ease: 'linear',
                            start: () => {
                                gsap.set([contentSplit.words, nameSplit.words, jobSplit.words], { autoAlpha: 0, yPercent: 100 })
                                gsap.to([contentSplit.words, nameSplit.words, jobSplit.words], { yPercent: 0, duration: .2, stagger: .01, ease: 'power1.in' })
                            }
                        });
                } })
            }
            activeContentTesti(0);
            swiper.setup(parent, {
                nav: true,
                touchMove: true,
                speed: 1200,
                effect: 'fade',
                fadeEffect: { crossFade: true },
                on: {
                    slideChange: () => swiper.changeCurrentItem(parent, 1),
                    slideChange: (slide) => {
                        let index = slide.activeIndex;
                        swiper.changeCurrentItem(parent, index + 1, activeContentTesti(index));
                    },
                    beforeInit: () => swiper.initTotalSlide(parent)
                }
            })
        }

        function homeInit() {
            homeHero();
            homeIntro();
            homeFeature();
            homeHowItWork();
            homeLib();
            homelvUp();
            homeNews();
        }

        homeInit();
    }

    SCRIPT.pricingScript = () => {
        console.log("pricingpage 👉️");

        function pricingHero() {
            function activePlan(index) {
                $('.pricing-hero-plan-options-btn').removeClass('active ev-none');
                gsap.to('.btn-bg', { x: index * $('.btn-bg').width(), duration: 0.5, ease: 'swing' })
                $('.pricing-hero-plan-options-btn').eq(index).addClass('active ev-none');
                $('.pricing-hero-plan-item-head-price').each((i, item) => {
                    let prices = $(item).find('.pricing-hero-plan-item-head-price-txt');
                    if (i != 0) {
                        prices.removeClass('active');
                        prices.eq(index).addClass('active');
                    };
                })
                $('.pricing-hero-plan-item-head-price-txt.active').each((i, item) => {
                    let prices = $(item).text();
                    $('.pricing-compare-table-cta-content-price-val').eq(i).html(`$${prices}`);
                })
                $('.pricing-hero-plan-item-head-sub-wrap').each((i, item) => {
                    let text = $(item).find('.pricing-hero-plan-item-head-sub');
                    text.removeClass('active');
                    text.eq(index).addClass('active');
                })
                $('.switch-button').toggleClass('active');

                $('.pricing-compare-table-cta-switch-txt').removeClass('active');
                $('.pricing-compare-table-cta-switch-txt').eq(index).addClass('active');
                $('[data-plan-index]').attr('data-plan-index', index);
                let curr = $('[data-plan-index]').attr('data-plan-index');
                console.log("curr 👉️", curr)
            }

            $('.switch-button').on('click', function (e) {
                e.preventDefault();
                let curr = $('[data-plan-index]').attr('data-plan-index');
                activePlan(curr == 1 ? 0 : 1);
            })

            $('.pricing-compare-table-cta-switch-txt').on('click', function (e) {
                e.preventDefault();
                let curr = $('[data-plan-index]').attr('data-plan-index');
                let target = $('.pricing-compare-table-cta-switch-txt').index(this);
                if (curr == target) return;
                activePlan(target);
            })

            $('.pricing-hero-plan-options-btn').on('click', function (e) {
                let index = $(this).index();
                e.preventDefault();
                activePlan(index);
            })

            function activeTooltip() {
                tippy('.pricing-compare-body-grid [data-tooltip]', {
                    content: (item) => item.getAttribute('data-tooltip'),
                    theme: "light-cus",
                    duration: 350,
                    delay: 200,
                    arrow: false,
                    placement: 'auto-start'
                });
                tippy('.pricing-hero-plan-item-info-item [data-tooltip]', {
                    content: (item) => item.getAttribute('data-tooltip'),
                    theme: "light-cus",
                    duration: 350,
                    delay: 200,
                    arrow: false,
                    placement: 'top-end'
                })
            }

            function planSlide() {
                const parent = childrenSelect('.pricing-hero-plan-area');
                swiper.setup(parent, {
                    spaceBetween: rem(20),
                    initialSlide: 2,
                    touchMove: true,
                    pagination: {
                        el: '.pricing-hero-plan-pagin',
                        type: "bullets",
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 3,
                            initialSlide: 1
                        }
                    }
                })
            }

            function animShowEl() {
                const pricingHeroTitle = splitTextFadeUpSetup('.pricing-hero-title');
                const pricingHeroSub = splitTextFadeUpSetup('.pricing-hero-sub');
                const pricingHeroLabel = splitTextFadeUpSetup('.pricing-hero-label');
                const pricingHeroAnnual = splitTextFadeUpSetup('.pricing-annual-txt');

                gsap.set('.pricing-hero-plan-options', {
                    autoAlpha: 0, y: 20
                });
                gsap.set([$('.pricing-hero-plan-item').eq(0), $('.pricing-hero-plan-item').eq(1)], {
                    autoAlpha: 0, x: 20
                });
                gsap.set([$('.pricing-hero-plan-item').eq(3), $('.pricing-hero-plan-item').eq(4)], {
                    autoAlpha: 0, x: -20
                });
                gsap.set('.pricing-hero-plan-item.special', {
                    scale: 1.02, x: 0, autoAlpha: 0
                });

                const pricingHeroTl = gsap.timeline({ delay: 0.25 });
                pricingHeroTl
                    .to(pricingHeroLabel.words, {
                        yPercent: 0, duration: .6, stagger: .02, ease: 'power2.out',
                        onComplete: () => {
                            pricingHeroLabel.revert();
                        }
                    })
                    .to(pricingHeroTitle.words, {
                        yPercent: 0, duration: .8, stagger: .04, ease: 'power2.out',
                        onComplete: () => {
                            pricingHeroTitle.revert();
                        }
                    }, '>-.4')
                    .to(pricingHeroSub.words, {
                        yPercent: 0, duration: .5, stagger: .01, ease: 'power2.out',
                        onComplete: () => {
                            pricingHeroSub.revert();
                        }
                    }, '>-.6')
                    .to('.pricing-hero-plan-options', {
                        autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out'
                    }, '>-.5')
                    .to(pricingHeroAnnual.words, {
                        yPercent: 0, duration: .8, ease: 'power2.out',
                        onComplete: () => {
                            pricingHeroAnnual.revert();
                        }
                    }, '>-.8')
                    .to('.pricing-hero-plan-item.special', {
                        autoAlpha: 1, scale: 1, transformOrigin: "", duration: 1, ease: 'power2.out'
                    }, '>-.2')
                    .to($('.pricing-hero-plan-item:odd'), {
                        autoAlpha: 1, x: 0, duration: .8, ease: 'power2.out'
                    }, '>-.6')
                    .to($('.pricing-hero-plan-item:even'), {
                        autoAlpha: 1, x: 0, duration: .8, ease: 'power2.out'
                    }, '>-.6')
            }
            animShowEl();

            if (viewport.width > 767) {
                activeTooltip();
            }
            if (viewport.width <= 991) {
                planSlide();
            }
        }

        function pricingCompare() {
            function activePlanFeature() {
                $('.pricing-compare-table-head-plan').on('click', function (e) {
                    let index = $(this).index();
                    $('.pricing-compare-table-head-plan').removeClass('active');
                    $(this).addClass('active');

                    $('.pricing-compare-body-grid').each((_, item) => {
                        let itemContent = $(item).find('.pricing-compare-body-content')
                        itemContent.removeClass('active');
                        itemContent.eq(index).addClass('active');
                    })
                })
            }

            function activeStickyHeaderTable() {
                const sentinalEl = document.querySelector(".pricing-compare-title-wrap")
                const headerTable = document.querySelector(".pricing-compare-table-head-wrap")
                const observer = new IntersectionObserver(
                    ([e]) => {
                        if (!e.isIntersecting) {
                            headerTable.classList.add('stick-line');
                        } else {
                            headerTable.classList.remove('stick-line')
                        }
                });

                observer.observe(sentinalEl);
            }

            function accordionTable() {
                const parent = childrenSelect('.pricing-compare-table-body');
                const DOM = {
                    accordion: $('.pricing-compare-table-body-item'),
                    accordionTitle: $('.pricing-compare-body-head-green'),
                    accordionContent: $('.accordion-content')
                }
                DOM.accordion.on("click", function () {
                    let index = $(this).index();
                    DOM.accordionTitle.eq(index).toggleClass("active");
                    DOM.accordionContent.eq(index).slideToggle("slow");
                })
            }

            function scrollActiveFixedCTA() {
                const DOM = {
                    startStage: document.querySelector(".pricing-sc--compare"),
                    endStage: document.querySelector(".pricing-sc--cta"),
                    fixedWrap: document.querySelector(".pricing-compare-btn-fix-wrap")
                };
                const CTA = (state) => {
                    const event = (action) =>
                        action === 'add' ?
                            DOM.fixedWrap.classList.add('active') :
                        action === 'remove' ?
                                DOM.fixedWrap.classList.remove('active') :
                        new Error("Invalid state. Expected 'add' or 'remove'.")

                    return (
                        state === 'add' ? (
                            function addHandle(entries) {
                                entries.forEach(entry => {
                                    if (entry.isIntersecting) event('add')
                                    else event('remove')
                                })
                            }
                        ) :
                        state === 'remove' ? (
                            function removeHandle(entries) {
                                entries.forEach(entry => {
                                    if (entry.isIntersecting) event('remove')
                                    else event('add')
                                })
                            }
                        ) :
                        new Error("Invalid state. Expected 'add' or 'remove'.")
                    )
                }

                const observerAdd = new IntersectionObserver(CTA('add'), { threshold: 0 });
                observerAdd.observe(DOM.startStage);
                const observerRemove = new IntersectionObserver(CTA('remove'), { threshold: 0 });
                observerRemove.observe(DOM.endStage);
            }

            function activeCompareTable() {
                $('.pricing-compare-title-wrap').on('click', function (e) {
                    e.preventDefault();
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active');
                        $('.pricing-compare-table-head-wrap').removeClass('top-stick');
                        $('.pricing-compare-table-cta').removeClass('active');
                        setTimeout(() => {
                            $('.pricing-compare-table-wrap').slideUp(800);
                            if (viewport.width <= 767) {
                                //remove fixed cta at the bottom
                                $(".pricing-compare-btn-fix-wrap").removeClass('active');
                            }
                        },200)
                    }
                    else {
                        $(this).addClass('active');
                        $('.pricing-compare-table-wrap').slideDown(800, () => {
                            $('.pricing-compare-table-head-wrap').addClass('top-stick');
                            $('.pricing-compare-table-cta').addClass('active');
                            if (viewport.width <= 767) {
                                //enable intersection fixed cta at the bottom
                                scrollActiveFixedCTA();
                            }
                        });
                    }
                })
            }

            function onChangeTopPosSticky() {
                lenis.on('scroll', () => {
                    if ($('.header-fixed').hasClass('hide')
                    && $(".pricing-compare-table-head-wrap").hasClass('top-stick')) {
                        $(".pricing-compare-table-head-wrap").addClass('hide-header')
                    }
                    else {
                        $(".pricing-compare-table-head-wrap").removeClass('hide-header')
                    }
                })
            }

            onChangeTopPosSticky();
            activeCompareTable();
            activeStickyHeaderTable();
            if (viewport.width <= 767) {
                activePlanFeature();
                accordionTable();
            }
        }

        function pricingFaq() {
            const parent = childrenSelect('.pricing-faq-content');
            const DOM = {
                accordion: parent('.accordion'),
                accordionContent: parent('.accordion-content')
            }
            // parent(DOM.accordionContent).hide();
            function activeAccordion(index) {
                DOM.accordionContent.eq(index).slideToggle("slow");
                DOM.accordion.eq(index).toggleClass("active");

                DOM.accordionContent.not( DOM.accordionContent.eq(index)).slideUp("slow");
                DOM.accordion.not(DOM.accordion.eq(index)).removeClass("active");
            };

            DOM.accordion.on("click", function () {
                let index = $(this).index();
                activeAccordion(index);
            })
        }

        function pricingCta() {
        }

        function pricingInit() {
            pricingHero();
            pricingCompare();
            pricingFaq();

            if (viewport.width > 991) {
                pricingCta();
            }
        }

        pricingInit();
    }

    SCRIPT.templateScript = () => {
        console.log("template page 👉️");

        function templateMain() {
            // let gutter = rem(32);
            // let column = 4;
            // let columnWidth = ($('.template-main-body-area').width() / column) - ((gutter * (column - 1)) / column);


            let templatesGrid = $('.template-main-body-cms-list').masonry({
                itemSelector: '.template-main-body-cms-item',
            });

            function updateMasonry() {
                setTimeout(() => {
                    templatesGrid.masonry('destroy');
                    templatesGrid = $('.template-main-body-cms-list').masonry({
                        itemSelector: '.template-main-body-cms-item',
                    });
                }, 10);
            }

            gsap.set('.template-main-body-clear', { autoAlpha: 0 });
            gsap.set('.template-main-body-title', { autoAlpha: 1 });

            let previousTotal = 0;
            window.fsAttributes = window.fsAttributes || [];
            window.fsAttributes.push([
            'cmsfilter',
                (filterInstances) => {
                    filterInstances.forEach((item, index) => {
                        switch (index) {
                            // filter search render items
                            case 0:
                            case 1:
                            case 2: {
                                const filterBySearch = filterInstances[index];
                                filterBySearch.listInstance.on('renderitems', (renderedItems) => {
                                    //Hidden the result list when searching
                                    let countItem = renderedItems.length;
                                    let searchResult = $(".template-main-search-popup-result").eq(index);

                                    if (countItem == 0) searchResult.addClass('hidden')
                                    else searchResult.removeClass('hidden')
                                })
                            }
                            // filter checkbox render items
                            case 3: {
                                const filterByPopup = filterInstances[index];
                                filterByPopup.listInstance.on('renderitems', (renderedItems) => {
                                    let durationBG = $('[fs-cmsfilter-duration]').attr('fs-cmsfilter-duration');
                                    gsap.fromTo('.template-main-body-black-layer', { opacity: 1 }, { opacity: 0, duration: durationBG * 2 / 1000 });
                                    updateMasonry();
                                    let countTotal = $('.template-main-cate-item .is-active-inputactive').length;

                                    //Update checkbox's quantity selected of each dropdown
                                    function countSelectedEach() {
                                        $('.template-main-cate-item').each((_, item) => {
                                            let activeItem = $(item).find('.is-active-inputactive');
                                            let countActive = activeItem.length;
                                            $(item).find('.template-main-cate-item-tag-num').text(countActive);
                                        });
                                    }
                                    // Update total checkbox selected
                                    function countTotalSelected() {
                                        let countTotal = $('.temp-checkbox_field.is-active-inputactive').length;
                                        $('.template-main-open-sort-count').text(countTotal);
                                    }
                                    countSelectedEach();
                                    countTotalSelected();
                                });
                            }
                        }
                    })
                },
            ]);

            function searchTemp() {
                function activeDropdown(DOM) {
                    DOM.toggleClass('active');
                    $('.template-main-cate-item-tag-list').not(DOM).removeClass('active');
                }

                //Update filter between Popular and Latest
                $('.template-main-cate-item-link').on('click', function (e) {
                    updateMasonry();
                    console.log("click 👉️");
                    let elActive = $('.template-main-cate-item-tag-op.current');
                    let elHidden = $('.template-main-cate-item-link.hidden');
                    gsap.to(elActive, {
                        yPercent: -100, autoAlpha: 0, duration: 0.4, ease: 'power1.inOut',
                        onStart() {
                            $(this).addClass('ev-none');
                            elActive.removeClass('current');
                            elHidden.removeClass('hidden');
                        }
                    });

                    gsap.set($('.template-main-cate-item-tag-op').not(elActive), { yPercent: 100, autoAlpha: 0 });
                    gsap.to($('.template-main-cate-item-tag-op').not(elActive), {
                        yPercent: 0, autoAlpha: 1, duration: 0.4, ease: 'power1.inOut',
                        onComplete() {
                            $(this).removeClass('ev-none');
                        }
                    });
                    $('.template-main-cate-item-link').not(elHidden).addClass('hidden');
                    $('.template-main-cate-item-tag-op').not(elActive).addClass('current');
                });

                //Open tag group filter popup
                $('.template-main-cate-item-tag-title').on('click', function (e) {
                    e.preventDefault();
                    let dropdown = $(this).siblings('.template-main-cate-item-tag-list');
                    activeDropdown(dropdown);
                })

                const searchPopup = {
                    init: () => {
                        $('.template-main-search-popup').fadeOut();
                    },
                    open: () => {
                        $('.template-main-search-popup').fadeIn();
                        $('.template-main-search-form').addClass('active');
                    },
                    close: () => {
                        $('.template-main-search-popup').fadeOut();
                        $('.template-main-search-form').removeClass('active');
                        $('.template-main-search-form').trigger('reset');
                    }
                }

                // Init search result popup
                searchPopup.init();
                // Open search result popup
                $('.templates-main-search-input').on('click', () => searchPopup.open());
                //Close search result popup
                $('.template-main-search-close').on('click', () => searchPopup.close());

                //Open and update search result
                $('#Search-template').on('keyup', function () {
                    $('.template-main-search-popup').fadeIn();
                    $('.template-main-cate-item-tag-list').removeClass('active');
                    function toggleNoResult() {
                        const lengthHidden = $('.template-main-search-popup-result.hidden').length;
                        const lengthResult = $('.template-main-search-popup-result').length;
                        if (lengthResult === lengthHidden) $('.template-main-search-no-result').removeClass('hidden');
                        else $('.template-main-search-no-result').addClass('hidden');
                        requestAnimationFrame(toggleNoResult);
                    }
                    requestAnimationFrame(toggleNoResult);
                })

                //Click the result in search popup
                $('.template-main-search-popup-cms-item a').on('click', function (e) {
                    e.preventDefault();
                    $(`.temp-checkbox_field[data-slug='${$(this).attr('id')}']`).trigger('click');
                    searchPopup.close();
                })

                // Anim Tag List Show
                function handleTagListShow(total) {
                    const listTagAnim = {
                        on: () => {
                            let tl = gsap.timeline({});
                            gsap.set('.template-main-tag-selected-list', { autoAlpha: 0 });
                            tl
                                .to('.template-main-body-title', { x: -10, autoAlpha: 0, duration: 0.3, ease: 'power2.out' })
                                .to('.template-main-tag-selected-list', { autoAlpha: 1 })
                                .to('.template-main-body-clear', { autoAlpha: 1 }, "0")
                        },
                        off: () => {
                            let tl = gsap.timeline({});
                            gsap.set('.template-main-tag-selected-list', { autoAlpha: 1 });
                            tl
                                .to('.template-main-tag-selected-list', { autoAlpha: 0 })
                                .to('.template-main-body-clear', { autoAlpha: 0 }, "0")
                                .to('.template-main-body-title', { x: 0, autoAlpha: 1, duration: 0.5, ease: 'power2.out' })
                        }
                    }

                    if (total > 0) {
                        if (previousTotal < total) {
                            if (total > 1) return previousTotal = total;
                            listTagAnim.on();
                        }
                        else {
                            if (total >= 1) return previousTotal = total;
                            listTagAnim.on();
                        }
                    }
                    else listTagAnim.off();
                    previousTotal = total;
                }

                // Listen all event onclick check tag
                $('.template-main-cate-drop-cms-item input').on('change', function () {
                    setTimeout(() => {
                        let countTotal;
                        if (viewport.width > 991) {
                            countTotal = $('.template-main-cate-item.cate .is-active-inputactive').length;
                        }
                        else {
                            countTotal = $('.temp-checkbox_field.is-active-inputactive').length;
                        }

                        if (countTotal > 0) {
                            gsap.fromTo('.template-main-body-clear', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 })
                        }
                        else {
                            gsap.fromTo('.template-main-body-clear', { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.3 })
                        }
                    }, 200)
                })

                //Click outside window close popup
                $(window).on('click', (e) => {
                    if (!$('.template-main-cate-item-tag-title:hover').length)
                        if (!$('.template-main-cate-item-tag-list:hover').length) {
                            $('.template-main-cate-item-tag-list').removeClass('active')
                        }
                    if (!$('.template-main-search-form:hover').length)
                        if (!$('.template-main-search-popup-scrollwrap:hover').length) {
                            $('.template-main-search-popup').fadeOut();
                            $('.template-main-search-form').removeClass('active');
                    }
                })
            }
            searchTemp();
            //Sort popular when start
            $('[fs-mirrorclick-element="trigger-3"]').trigger('click');

            function handlePopupSort() {
                const parent = childrenSelect('.template-main-cate-mb-wrap');
                const DOM = {
                    btnOpen: $('.template-main-open-sort-btn'),
                    btnApply: $('.template-sort-apply-btn'),
                    btnClose: $('.template-sort-close-btn'),
                    accordion: parent('.accordion'),
                    accordionTitle: parent('.accordion-title'),
                    accordionContent: parent('.accordion-content')
                }

                //Accordion
                parent(DOM.accordionContent).hide();
                function activeAccordion(index) {
                    DOM.accordionContent.eq(index).slideToggle();
                    DOM.accordion.eq(index).toggleClass("active");
                };

                DOM.accordionTitle.on("click", function () {
                    let index = $(this).parent().index();
                    activeAccordion(index - 1);
                })
                activeAccordion(0);

                //Open popup sort
                DOM.btnOpen.on('click', function (e) {
                    e.preventDefault();
                    $('.template-main-cate-form').addClass('active');
                    setTimeout(() => $('.fixed-layer').addClass('active'), 450);
                    gsap.set('body', { overflow: 'hidden' })
                    lenis.stop();
                })
                // Close popup sort
                DOM.btnApply.on('click', function (e) {
                    e.preventDefault();
                    $('.fixed-layer').removeClass('active');
                    $('.template-main-cate-form').removeClass('active');
                    gsap.set('body', { overflow: 'auto' })
                    lenis.start();
                })
                DOM.btnClose.on('click', function (e) {
                    e.preventDefault();
                    $('.fixed-layer').removeClass('active');
                    $('.template-main-cate-form').removeClass('active');
                    gsap.set('body', { overflow: 'auto' })
                    lenis.start();
                })
            }

            if (viewport.width <= 767) {
                handlePopupSort();
            }
        }
        templateMain();

        function animShowEl() {
            const templateHeroTitle = splitTextFadeUpSetup('.template-hero-title');
            const templateHeroDesc = splitTextFadeUpSetup('.template-hero-desc');
            const templateBodyTitle = splitTextFadeUpSetup('.template-main-body-title');

            gsap.set('.template-hero-link-wrap', { y: 10, autoAlpha: 0 });
            gsap.set('.template-main-line', { scaleX: 0, autoAlpha: 0 })
            gsap.set('.template-main-header .container', { autoAlpha: 0 });
            gsap.set('.template-main-body-area', { autoAlpha: 0, y: 20 });
            const templateHeroTl = gsap.timeline({
                delay: .5
            });

            templateHeroTl
                .to(templateHeroTitle.words, {
                    yPercent: 0, duration: .8, stagger: .02, ease: 'power2.out',
                    onComplete: () => {
                        templateHeroTitle.revert();
                    }
                })
                .to(templateHeroDesc.words, {
                    yPercent: 0, duration: .8, ease: 'power2.out',
                    onComplete: () => {
                        templateHeroDesc.revert();
                    }
                }, '< 0')
                .to('.template-hero-link-wrap', {
                    y: 0, autoAlpha: 1, duration: .8, ease: 'power2.out' }, '>-.4')
                .to('.template-main-line', {
                    scaleX: 1, autoAlpha: 1, transformOrigin: 'left', duration: 1.5, ease: 'expo'
                }, '0')
                .to('.template-main-header .container', {
                    autoAlpha: 1, duration: 1.5, ease: 'power2.out'
                }, '0')
                .to(templateBodyTitle.words, {
                    yPercent: 0, duration: .8, ease: 'power2.out',
                    onComplete: () => {
                        templateBodyTitle.revert();
                    }
                }, '>-1')
                .to('.template-main-body-area', {
                    autoAlpha: 1, y: 0, duration: .8, ease: 'power2.out'
                }, '>-.2')
        }
        animShowEl();
    }

    SCRIPT.solutionGELScript = () => {
        console.log("Solution - Grow email list 👉️");

        function libMarquee(item) {
            let index = $(item).index();
            const DOM = {
                marqueeList: $(item).find('.solu-lib-marquee-cms'),
                marqueeItem: $(item).find('.solu-lib-marquee-cms-list')
            }
            let cloneAmount = 2;
            const cloneAdditional = Math.floor(viewport.width / DOM.marqueeItem.width());
            if (cloneAmount >= 1) {
                cloneAmount += cloneAdditional;
            }
            for (let i = 0; i < cloneAmount; i++) {
                let itemClone = DOM.marqueeItem.clone();
                itemClone.css({ position: "absolute", top: 0, left: 0 })
                DOM.marqueeList.append(itemClone);
            };
            let newMarqueeItem = $(item).find('.solu-lib-marquee-cms-list');
            newMarqueeItem.eq(0).css({ position: "relative", top: 0, left: 0 });

            const tlMarquee = marquee(newMarqueeItem, DOM.marqueeList, 80, "left");
            let isHover = false;
            const updateScroll = new gsap.timeline({
                scrollTrigger: {
                    trigger: DOM.marqueeList,
                    onUpdate() {
                        if (!isHover) gsap.set(tlMarquee, { timeScale: 1 * velo, ease: 'power1.inOut', duration: 0.3, overwrite: true });
                    }
                }
            })

            $(item).on("pointerenter", (event) => {
                isHover = true;
                gsap.to(tlMarquee, { timeScale: 0, ease: 'power1.inOut', duration: 0.3, overwrite: true });
            });
            $(item).on("pointerleave", (event) => {
                isHover = false;
                gsap.to(tlMarquee, { timeScale: 1, ease: 'power1.inOut', duration: 0.3, overwrite: true });
            });
        }
        libMarquee($('.solu-lib-marquee'));

        // observer = new IntersectionObserver(entries => {
        //     entries.forEach(entry => {
        //         const el = entry.target;
        //         if (entry.isIntersecting) {
        //             console.log('in of view');
        //             libMarquee(el);
        //             observer.unobserve(el);
        //         } else {
        //             console.log('out of view');
        //         }
        //     });
        // });

        // document.querySelectorAll('.solu-lib-marquee').forEach(item => {
        //     observer.observe(item);
        // });

        function solutionSample() {
            $('.solu-sample-item').each((_, item) => {
                let embedTitle = $(item).find('.embed-to-html');
                let textTitle = $(item).find('h6');

                gsap.set(embedTitle, { autoAlpha: 0 });

                gsap.to(textTitle, {
                    display: 'none',
                    onComplete: () => {
                        gsap.to(embedTitle, { autoAlpha: 1 });
                        textTitle.remove();
                    }
                })
            })
        }

        function solutionTool() {
            function solutionListSlide() {
                const parent = childrenSelect('.solu-tool-list-wrap-mb');
                $('.solu-tool--mb-img-list-item').fadeOut();
                $('.solu-tool--mb-img-list-item').eq(0).fadeIn();
                const activeImage = (index) => {
                    $('.solu-tool--mb-img-list-item').fadeOut();
                    $('.solu-tool--mb-img-list-item').eq(index).fadeIn();
                }

                swiper.setup(parent, {
                    nav: true,
                    touchMove: true,
                    on: {
                        init: () => swiper.changeCurrentItem(parent, 1),
                        slideChange: (slide) => {
                            let index = slide.activeIndex;
                            swiper.changeCurrentItem(parent, index + 1, activeImage(index));
                        },
                        beforeInit: () => swiper.initTotalSlide(parent)
                    }
                })
            }

            if (viewport.width <= 767) {
                solutionListSlide();
            }
        }

        function handlePopupReview() {
            function slidePopup() {
                const swiperHandle = {
                    setup: function () {
                        const parent = childrenSelect('.pu-usecase-wrap-outside');
                        const activeImage = (index) => {
                            $('.pu-usecase-nav-txt').removeClass('active');
                            $('.pu-usecase-nav-txt').eq(index).addClass('active');
                        }
                        return swiper.setup(parent, {
                            nav: true,
                            touchMove: true,
                            effect: 'fade',
                            speed: 1000,
                            fadeEffect: {
                                crossFade: true,
                            },
                            on: {
                                init: () => swiper.changeCurrentItem(parent, 1),
                                slideChange: (slide) => {
                                    let index = slide.activeIndex;
                                    swiper.changeCurrentItem(parent, index + 1, activeImage(index));
                                },
                                beforeInit: () => {
                                    swiper.initTotalSlide(parent);
                                    $('.pu-usecase-nav-txt').eq(0).addClass('active');
                                }
                            }
                        })
                    },
                    destroy: function(swiper) {
                        swiper.destroy(true, false);
                    }
                }
                function setupPopup(el) {
                    $('.swiper-wrapper.pu-usecase-wrapper').html('');
                    $('.pu-usecase-nav-txt-wrap').html('');
                    let dataSrc = el.each((_, item) => {
                        let imgSrc = $(item).attr('src');
                        let imgAlt = $(item).attr('alt');
                        let slideItemHTML = $(`<div class="swiper-slide pu-usecase-slide"><img class="img-default contain" src=${imgSrc} /></div>`)
                        let slideCaptionHTML = $(`<div class="txt txt-20 _w-medium pu-usecase-nav-txt ev-none">${imgAlt}</div>`)
                        $('.swiper-wrapper.pu-usecase-wrapper').append(slideItemHTML);
                        $('.pu-usecase-nav-txt-wrap').append(slideCaptionHTML);
                    });
                }
                function togglePopup() {
                    let popupSwiper;
                    $('[data-popup]').on('click', function (e) {
                        e.preventDefault();
                        if ($(this).attr('data-popup') == 'open') {
                            let data = $(this).parent().siblings().find('[data-img="preview"]');
                            setupPopup(data);
                            $('[data-popup="wrapper"]').addClass('active');
                            popupSwiper = swiperHandle.setup();
                            lenis.stop();
                        }
                        else if ($(this).attr('data-popup') == 'close') {
                            $('[data-popup="wrapper"]').removeClass('active');
                            swiperHandle.destroy(popupSwiper);
                            lenis.start();
                        }
                    })
                }
                togglePopup();
            }
            slidePopup();
        }

        function activeImage() {
            $('.solu-tool-logo-cms-item').eq(0).addClass('active');
            lenis.on('scroll', function (e) {
                $('.solu-tool-content-cms-item').each((index, item) => {
                    let top = $(item).get(0).getBoundingClientRect().top;
                    if (top > 0 && top < rem(200)) {
                        $('.solu-tool-logo-cms-item').removeClass('active');
                        $('.solu-tool-logo-cms-item').eq(index).addClass('active');
                    }
                })
            })
        }

        function animShowEl() {
            function heroAnim() {
                const solutionHeroLabel = splitTextFadeUpSetup('.slu-hero-content-label');
                const solutionHeroTitle = splitTextFadeUpSetup('.slu-hero-content-title');
                const solutionHeroSub = splitTextFadeUpSetup('.slu-hero-content-sub');

                gsap.set('.slu-hero-content-direct .btn', { y: 10, autoAlpha: 0 });
                gsap.set('.slu-hero-content-direct .slu-link-wrap', { y: 10, autoAlpha: 0 });
                const solutionHeroTl = gsap.timeline({
                    delay: .25
                });

                solutionHeroTl
                    .to(solutionHeroLabel.words, {
                        yPercent: 0, duration: .6, stagger: .02, ease: 'power2.out',
                        onComplete: () => {
                            solutionHeroLabel.revert();
                        }
                    })
                    .to(solutionHeroTitle.words, {
                        yPercent: 0, duration: .8, stagger: .04, ease: 'power2.out',
                        onComplete: () => {
                            solutionHeroTitle.revert();
                        }
                    }, '>-.4')
                    .to(solutionHeroSub.words, {
                        yPercent: 0, duration: .5, stagger: .01, ease: 'power2.out',
                        onComplete: () => {
                            solutionHeroSub.revert();
                        }
                    }, '>-.6')
                    .to('.slu-hero-content-direct .btn', {
                        y: 0, autoAlpha: 1, duration: .5, ease: 'power2.out',
                    }, '>-.3')
                    .to('.slu-hero-content-direct .slu-link-wrap', {
                        y: 0, autoAlpha: 1, duration: .5, ease: 'power2.out',
                    }, '>-.2')
            }
            heroAnim();
            function responsiveBreakAnimChange() {
                if (viewport.width <= 767) {
                    $('.solu-feature-list').removeAttr('data-anim-stagger-el')
                    $('.solu-feature-list').removeAttr('data-anim-start')
                    $('.solu-feature-cms-item').removeAttr('data-anim-stagger-el')
                    $('.solu-feature-cms-item').removeAttr('data-anim-stagger')
                    $('.solu-feature-cms-item').attr('data-anim', 'fade-up')
                }
            }
            responsiveBreakAnimChange();
        }
        if (viewport.width > 767) {
            activeImage();
        }
        animShowEl();
        solutionSample();
        handlePopupReview();
        solutionTool();
    }

    SCRIPT.featureScript = () => {
        console.log("feature page 👉️");

        function featureLib() {
            const positionItem = [
                { row: 1, column: 4 }, { row: 1, column: 1 }, { row: 2, column: 8 }, { row: 2, column: 6 }, { row: 3, column: 3 }, { row: 3, column: 1 },
                { row: 4, column: 2 }, { row: 5, column: 3 }, { row: 5, column: 6 }, { row: 5, column: 8 }, { row: 6, column: 1 }, { row: 8, column: 2 },
                { row: 8, column: 7 }, { row: 8, column: 5 }, { row: 9, column: 1 }, { row: 10, column: 6 }, { row: 10, column: 4 }, { row: 11, column: 3 },
                { row: 12, column: 6 }, { row: 13, column: 3 }, { row: 14, column: 5 }, { row: 15, column: 1 }, { row: 16, column: 2 }, { row: 14, column: 7 },
                { row: 16, column: 8 }, { row: 18, column: 3 }, { row: 19, column: 5 }, { row: 20, column: 4 }, { row: 21, column: 2 }, { row: 22, column: 7 }
            ]

            //setup position
            $('.grid-img-item').each((index, item) => {
                $(item).css({
                    "--r": `${positionItem[index].row}`,
                    "--c": `${positionItem[index].column}`
                })
            })

            function scrollAnimationGrid() {
                const gridItems = document.querySelectorAll('.grid-img-item')
                gridItems.forEach(item => {
                    const image = item.querySelector('.grid-img-item img');

                    const yPercentRandomVal = gsap.utils.random(-100,100);

                    gsap.timeline()
                    .addLabel('start', 0)
                    .to(image, {
                        ease: 'none',
                        scrollTrigger: {
                            trigger: item,
                            start: "top 80%",
                            end: "top top",
                            scrub: true,
                        }
                    }, 'start')
                    .to(item, {
                        ease: 'none',
                        yPercent: yPercentRandomVal,
                        scrollTrigger: {
                            trigger: item,
                            start: "top bottom",
                            end: "top top",
                            scrub: true
                        }
                    }, 'start');
                });
            }

            function libMarquee(item) {
                let index = $(item).index();
                const DOM = {
                    marqueeList: $(item).find('.fea-lib-marquee-cms'),
                    marqueeItem: $(item).find('.fea-lib-marquee-cms-list')
                }
                let cloneAmount = 2;
                const cloneAdditional = Math.floor(viewport.width / DOM.marqueeItem.width());
                if (cloneAdditional >= 1) {
                    cloneAmount += cloneAdditional;
                }
                for (let i = 0; i < cloneAmount; i++) {
                    let itemClone = DOM.marqueeItem.clone();
                    itemClone.css({ position: "absolute", top: 0, left: 0 })
                    DOM.marqueeList.append(itemClone);
                };
                let newMarqueeItem = $(item).find('.fea-lib-marquee-cms-list');
                newMarqueeItem.eq(0).css({ position: "relative", top: 0, left: 0 });

                const tlMarquee = marquee(newMarqueeItem, DOM.marqueeList, 80, "left");
                let isHover = false;
                const updateScroll = new gsap.timeline({
                    scrollTrigger: {
                        trigger: DOM.marqueeList,
                        onUpdate() {
                            if (!isHover) gsap.set(tlMarquee, { timeScale: 1 * velo, ease: 'power1.inOut', duration: 0.3, overwrite: true });
                        }
                    }
                })

                $(item).on("pointerenter", (event) => {
                    isHover = true;
                    gsap.to(tlMarquee, { timeScale: 0, ease: 'power1.inOut', duration: 0.3, overwrite: true });
                });
                $(item).on("pointerleave", (event) => {
                    isHover = false;
                    gsap.to(tlMarquee, { timeScale: 1, ease: 'power1.inOut', duration: 0.3, overwrite: true });
                });
            }

            if($('.fea-lib-marquee').css('display') == 'block') {
                libMarquee('.fea-lib-marquee')
            }
            else {
                scrollAnimationGrid();
            }
        }

        function featureCamp() {
            $('.fea-camp-slide-img-item').fadeOut();
            $('.fea-camp-slide-img-item').eq(0).fadeIn();

            const parent = childrenSelect('.fea-camp-slide-content');
            const activeImage = (index) => {
                $('.fea-camp-slide-img-item').fadeOut();
                $('.fea-camp-slide-img-item').eq(index).fadeIn();
            }
            swiper.setup(parent, {
                nav: true,
                touchMove: true,
                effect: "fade",
                speed: 1000,
                fadeEffect: {
                    crossFade: true,
                },
                on: {
                    init: () => swiper.changeCurrentItem(parent, 1),
                    slideChange: (slide) => {
                        let index = slide.activeIndex;
                        swiper.changeCurrentItem(parent, index + 1, activeImage(index));
                    },
                    beforeInit: () => swiper.initTotalSlide(parent)
                }
            })

            function activeTextSub() {
                function activeFade(index) {
                    $('.fea-camp-thumb-txt').removeClass('fade-in');
                    $('.fea-camp-thumb-txt').eq(index).addClass('fade-in');
                    $('.home-intro--item-txt').removeClass('active');
                    $('.home-intro--item-txt').eq(index).addClass('active');
                    $('.fea-camp-thumb-img').removeClass('active');
                    $('.fea-camp-thumb-img').eq(index).addClass('active');
                }
                $('.home-intro--item').on('click', function (e) {
                    e.preventDefault();
                    let index = $(this).index();
                    activeFade(index);
                })
                activeFade(0);
            }

            if (viewport.width > 767) {
                activeTextSub();
            }
        }

        function handleStickyHeader() {
            lenis.on('scroll', function (e) {
                let topNav = $('.fea-subnav-wrap').get(0).getBoundingClientRect().top;
                let topNavHeight = $('.fea-subnav-wrap').outerHeight();
                let headerFixedHeight = $('.header-fixed').outerHeight();
                gsap.set('.fea-subnav-sticky-calc', { height: `${headerFixedHeight}px` })

                if (topNav - topNavHeight < -200) {
                    $('.fea-subnav-sticky').removeClass('hide');
                    if ($('.header-fixed').hasClass('hide') && !($('.fea-subnav-sticky').hasClass('hide'))) {
                        gsap.set('.fea-subnav-sticky', { top: `-${headerFixedHeight}px`, ease: 'linear' })
                    }
                    else {
                        gsap.set('.fea-subnav-sticky', { top: 0, ease: 'linear' })
                    }
                }
                else {
                    $('.fea-subnav-sticky').addClass('hide');
                }
            })
            if (viewport.width <= 767) {
                function scrollToLink(el) {
                    const container = $(".fea-subnav-sticky-menu-wrap");
                    const elOffset = el.position().left;
                    const containerScroll = container.scrollLeft();
                    const containerWidth = container.width();

                    const scrollTo =
                        containerScroll +
                        elOffset -
                        containerWidth / 2 +
                        el.width() / 2;
                    container.animate({ scrollLeft: scrollTo }, 500);
                    return false;
                }

                $(".fea-subnav-link-item-stick").on("click", function (e) {
                    scrollToLink($(this));
                })

                observer = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        const el = $(`.fea-subnav-link-item-stick[href="#${entry.target.id}"]`);
                        if (entry.isIntersecting) {
                            scrollToLink(el);
                        } else {}
                    });
                }, {rootMargin: "0px 0px -170px 0px"});

                document.querySelectorAll('.fea-sticky-wrap section').forEach(section => {
                    observer.observe(section);
                });
            }
        }

        function featureBuilder() {
            function mobileBuilderSlide() {
                const parent = childrenSelect('.fea-sc--builder');

                swiper.setup(parent, {
                    nav: true,
                    speed: 1000,
                    touchMove: true,
                    effect: "fade",
                    fadeEffect: {
                        crossFade: true,
                    },
                    on: {
                        init: () => swiper.changeCurrentItem(parent, 1),
                        slideChange: function (slide) {
                            let index = slide.activeIndex;
                            swiper.changeCurrentItem(parent, index + 1);
                        },
                        beforeInit: () => swiper.initTotalSlide(parent)
                    }
                })

                parent('.swiper-wrapper').removeAttr('data-anim-stagger-el');
                parent('.swiper-wrapper').removeAttr('data-anim-stagger-distance');
                parent('.swiper-slide').removeAttr('data-anim-stagger-el');
                parent('.swiper-slide').removeAttr('data-anim-stagger');

                parent('.swiper-wrapper').attr('data-anim', 'fade-up');

            }
            if (viewport.width > 991) {

            }
            else if (viewport.width <= 767) {
                mobileBuilderSlide();
            }
        }

        function featureIntegration() {
            // let countWave = 4;
            // let circleWave = $(".fea-integr-decor-cir-clone").eq(0).clone();
            // $(".fea-integr-decor-cir.lv-2").html("");
			// for (let x = 0; x < countWave; x++) {
			// 	let html = circleWave.clone();
			// 	html.css("animation-delay", `${(-30 / countWave) * x}s`);
			// 	$(".fea-integr-decor-cir.lv-2").append(html);
			// }

        }

        function animShowEl() {
            const featureHeroTitle = splitTextFadeUpSetup('.fea-hero-title');
            const featureHeroLabel = splitTextFadeUpSetup('.fea-hero-label');
            const featureHeroSub = splitTextFadeUpSetup('.fea-hero-sub');

            // gsap.set('.fea-hero-img-inside', { scale: 1.5 });
            gsap.set('.fea-subnav-wrap', { yPercent: 100, autoAlpha: 1 });
            const featureHeroTl = gsap.timeline({
                delay: .25
            })
            featureHeroTl
                // .to('.fea-hero-img img', { scale: 1, duration: 40, ease: "power2.out" })
                .to(featureHeroLabel.words, {
                    yPercent: 0, duration: .6, stagger: .02, ease: 'power2.out',
                    onComplete: () => {
                        featureHeroLabel.revert();
                    }
                })
                .to(featureHeroTitle.words, {
                    yPercent: 0, duration: .8, stagger: .04, ease: 'power2.out',
                    onComplete: () => {
                        featureHeroTitle.revert();
                    }
                }, '>-.4')
                .to(featureHeroSub.words, {
                    yPercent: 0, duration: .5, stagger: .01, ease: 'power2.out',
                    onComplete: () => {
                        featureHeroSub.revert();
                    }
                }, '>-.6')
                .to('.fea-subnav-wrap', {
                    yPercent: 0, duration: .8, ease: 'power2.out'
                }, '>-.6')
        }

        animShowEl();
        handleStickyHeader();
        featureBuilder();
        featureCamp();
        featureLib();
        featureIntegration();
    }

    SCRIPT.subpageScript = () => {
        createToc('.sub-content-richtxt');

        function animShowEl() {
            const subHeroTitle = splitTextFadeUpSetup('.sub-hero-heading');
            const subHeroDate = splitTextFadeUpSetup('.sub-hero-effective-date');
            const subHeroLink = splitTextFadeUpSetup('.sub-hero-link-item');

            gsap.set('.border-line', { scaleX: 0, autoAlpha: 1 });
            gsap.set('.toc-item-link', { y: 10, autoAlpha: 0 });
            gsap.set('.sub-content-richtxt-wrap', { y: 20, autoAlpha: 0 });
            const subHeroTl = gsap.timeline({});

            subHeroTl
                .to(subHeroTitle.words, {
                    yPercent: 0, duration: .8, stagger: .04, ease: 'power2.out',
                    onComplete: () => {
                        subHeroTitle.revert();
                    }
                })
                .to(subHeroDate.words, {
                    yPercent: 0, duration: .5, stagger: .05, ease: 'power2.out',
                    onComplete: () => {
                        subHeroTitle.revert();
                    }
                }, '>-.4')
                .to('.border-line', {
                    scaleX: 1, transformOrigin: 'left', duration: 0.6, ease: 'power2.inOut'
                }, '>-0.3')
                .to(subHeroLink.words, {
                    yPercent: 0, duration: .5, stagger: .02, ease: 'power2.out',
                    onComplete: () => {
                        subHeroLink.revert();
                    }
                }, '>-0.5')
                .to('.toc-item-link', {
                    y: 0, autoAlpha: 1, duration: 1, stagger: .1, ease: 'power2.out'
                })
                .to('.sub-content-richtxt-wrap', {
                    y: 0, autoAlpha: 1, duration: 1, ease: 'power2.out'
                }, "<0.3")
        }
        animShowEl();
    }

    //init func GLOBAL
    function initGlobal() {
        $("html").css("scroll-behavior", "auto");
        $("html").css("height", "auto");
        lenis.scrollTo("top", {
            duration: .001,
            onComplete: () => initAnimation()
        });
        $('.debug-area').remove();
        $('.container-column').remove();

        // let hash = window.location.hash;
        // if (hash == "") {
        //     lenis.scrollTo("top", {
        //         duration: .001,
        //         onComplete: () => initAnimation()
        //     });
        // }
        responsiveRem();
        openIntercome();
        addRatioImage();

        if (viewport.width <= 991) {
            navHandle();
            $(".header-fixed").removeClass("hide");
        }
        if (viewport.width <= 767) {
            footerAccordion();
        }

        $(window).on('scroll', function () {
            toggleHeader();
        })
    }
    initGlobal();

    const pageName = $('main.main').attr('name-space');
    if (pageName) {
        SCRIPT[`${pageName}Script`]();
    }
}

window.onload = script;