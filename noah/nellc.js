const script = () => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.innerWidth > 767) {
        ScrollTrigger.defaults({
            invalidateOnRefresh: true
        });
    }
    else {
        ScrollTrigger.defaults({
            scroller: '.body-inner',
        });
    }
    const xGetter = (el) => gsap.getProperty(el, 'x');
    const yGetter = (el) => gsap.getProperty(el, 'y');
    const xSetter = (el) => gsap.quickSetter(el, 'x', `px`);
    const ySetter = (el) => gsap.quickSetter(el, 'y', `px`);

    const cvUnit = (val, unit) => {
        let result;
        switch (true) {
            case unit === 'vw':
                result = window.innerWidth * (val / 100);
                break;
            case unit === 'vh':
                result = window.innerHeight * (val / 100);
                break;
            case unit === 'rem':
                result = val / 10 * parseFloat($('html').css('font-size'));
                break;
            default: break;
        }
        return result;
    }
    const viewport = {
		get w() {
			return window.innerWidth;
		},
		get h() {
			return window.innerHeight;
		},
    }
    const device = { desktop: 991, tablet: 767, mobile: 479 }
    const debounce = (func, timeout = 300) => {
        let timer

        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(() => { func.apply(this, args) }, timeout)
        }
    }
    const isInViewport = (el, orientation = 'vertical') => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (orientation == 'horizontal') {
                return (
                    rect.left <= (window.innerWidth) &&
                    rect.right >= 0
                );
        } else {
                return (
                    rect.top <= (window.innerHeight) &&
                    rect.bottom >= 0
                );
        }
    }
    const refreshOnBreakpoint = () => {
        const breakpoints = Object.values(device).sort((a, b) => a - b);
        const initialViewportWidth = window.innerWidth || document.documentElement.clientWidth;
        const breakpoint = breakpoints.find(bp => initialViewportWidth < bp) || breakpoints[breakpoints.length - 1];
        window.addEventListener('resize', debounce(function () {
            const newViewportWidth = window.innerWidth || document.documentElement.clientWidth;
            if ((initialViewportWidth < breakpoint && newViewportWidth >= breakpoint) ||
                (initialViewportWidth >= breakpoint && newViewportWidth < breakpoint)) {
                location.reload();
            }
        }));
    }
    const documentHeightObserver = (() => {
        let previousHeight = document.documentElement.scrollHeight;
        let resizeObserver;
        let debounceTimer;

        function refreshScrollTrigger() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const currentHeight = document.documentElement.scrollHeight;

                if (currentHeight !== previousHeight) {
                    console.log("Document height changed. Refreshing ScrollTrigger...");
                    ScrollTrigger.refresh();
                    previousHeight = currentHeight;
                }
            }, 200); // Adjust the debounce delay as needed
        }

        return (action) => {
            if (action === "init") {
                console.log("Initializing document height observer...");
                resizeObserver = new ResizeObserver(refreshScrollTrigger);
                resizeObserver.observe(document.documentElement);
            }
            else if (action === "disconnect") {
                console.log("Disconnecting document height observer...");
                if (resizeObserver) {
                    resizeObserver.disconnect();
                }
            }
        };
    })();
    const getAllScrollTrigger = (fn) => {
        let triggers = ScrollTrigger.getAll();
        triggers.forEach(trigger => {
            if (fn === "refresh") {
                if (trigger.progress === 0) {
                    trigger[fn]?.();
                }
            } else {
                trigger[fn]?.();
            }
        });
    };
    function resetScroll() {
        if (window.location.hash !== '') {
            if ($(window.location.hash).length >= 1) {
                $("html").animate({ scrollTop: $(window.location.hash).offset().top - 100 }, 1200);

                setTimeout(() => {
                    $("html").animate({ scrollTop: $(window.location.hash).offset().top - 100 }, 1200);
                }, 300);
            } else {
                scrollTop()
            }
        } else if (window.location.search !== '') {
            let searchObj = JSON.parse('{"' + decodeURI(location.search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
            if (searchObj.sc) {
                if ($(`#${searchObj.sc}`).length >= 1) {
                    let target = `#${searchObj.sc}`;
                    setTimeout(() => {
                        smoothScroll.scrollTo(`#${searchObj.sc}`, {
                            offset: -100
                        })
                    }, 500);
                } else {
                    scrollTop()
                }
            }
        } else {
            scrollTop()
        }
    };
    function scrollTop(onComplete) {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
        smoothScroll.scrollToTop({
            onComplete: () => {
                onComplete?.();
                getAllScrollTrigger("refresh");
            }
        });
    }
    class ParallaxImage {
        constructor({ el, scaleOffset = 0.1 }) {
            this.el = el;
            this.elWrap = null;
            this.scaleOffset = scaleOffset;
            this.init();
        }
        init() {
            this.elWrap = this.el.parentElement;
            this.setup();
        }
        setup() {
            const scalePercent = 100 + 5 + ((this.scaleOffset - 0.1) * 100);
            gsap.set(this.el, {
                width: scalePercent + '%',
                height: $(this.el).hasClass('img-fill') ? scalePercent + '%' : 'auto'
            });
            this.scrub();
        }
        scrub() {
            let dist = this.el.offsetHeight - this.elWrap.offsetHeight;
            let total = this.elWrap.getBoundingClientRect().height + window.innerHeight;
            this.updateOnScroll(dist, total);
            smoothScroll.lenis.on('scroll', () => {
                this.updateOnScroll(dist, total);
            });
        }
        updateOnScroll(dist, total) {
            if (this.el) {
                if (isInViewport(this.elWrap)) {
                    let percent = this.elWrap.getBoundingClientRect().top / total;
                    gsap.quickSetter(this.el, 'y', 'px')(-dist * percent * 1.2);
                    gsap.set(this.el, { scale: 1 + (percent * this.scaleOffset) });
                }
            }
        }
    }
    class CounterUp {
        constructor(el, options = {}) {
            this.el = el;
            this.options = options;
            this.counter = null;
            this.init();
        }
        init() {
            this.setup();
        }
        setup() {
            if (this.el.dataset.counter == 'false') return;
            let value = this.el.innerHTML;
            let hasDecimal = value.includes('.') || value.includes(',');
            let decimal = value.includes('.') ? '.' : value.includes(',') ? ',' : '';
            let suffix = value.includes('+') ? '+' : '';
            let counterTo = value.replace(/[,]/g, '.').replace(/[+]/g, '').replace(/[+]/g, '');
            let decimalPlaces = hasDecimal && counterTo.length - value.indexOf(decimal) - 1;
            this.counter = new countUp.CountUp(this.el, counterTo, {
                duration: 1,
                decimalPlaces,
                decimal,
                suffix,
                enableScrollSpy: true,
                ...this.options
            });
            // Store instance on element for easy access
            this.el._countUpInstance = this.counter;
        }
        start() {
            if (this.counter && typeof this.counter.start === 'function') {
                this.counter.start();
            }
        }
    }
    class Marquee {
        constructor({ list, duration = 40, direction = 'hor', isReverse = false }) {
            this.list = list;
            this.duration = duration;
            this.direction = direction;
            this.isReverse = isReverse;
        }
        setup(isReverse) {
            let cloneAmount = 1;
            let itemClone = this.list.find('[data-marquee="item"]').clone();
            let itemWidth = 0;
            if (this.direction !== 'hor') {
                cloneAmount = cloneAmount + Math.ceil(viewport.h / this.list.height());
                itemWidth = this.list.find('[data-marquee="item"]').height();
            } else {
                cloneAmount = cloneAmount + Math.ceil(viewport.w / this.list.width());
                itemWidth = this.list.find('[data-marquee="item"]').width();
            }
            this.list.html('');
            new Array(cloneAmount).fill().forEach(() => {
                let html = itemClone.clone()
                html.css('animation-duration', `${Math.ceil(itemWidth / this.duration)}s`);
                if (this.isReverse) {
                    html.css('animation-direction', 'reverse');
                }
                html.addClass(`anim-marquee-${this.direction}`);
                this.list.append(html);
            });
        }
    }
    class SmoothScroll {
		constructor() {
			this.lenis = null;
			this.scroller = {
				scrollX: window.scrollX,
				scrollY: window.scrollY,
				velocity: 0,
				direction: 0,
			};
			this.lastScroller = {
				scrollX: window.scrollX,
				scrollY: window.scrollY,
				velocity: 0,
				direction: 0,
			};
		}

		init() {
			this.reInit();

			$.easing.lenisEase = function (t) {
				return Math.min(1, 1.001 - Math.pow(2, -10 * t));
			};

			gsap.ticker.add((time) => {
				if (this.lenis) {
					this.lenis.raf(time * 1000);
				}
			});
			gsap.ticker.lagSmoothing(0);
		}

		reInit() {
			if (this.lenis) {
				this.lenis.destroy();
			}
            this.lenis = new Lenis({
                content:
                    viewport.w > 767 ? document.documentElement : document.querySelector('.main'),
                wrapper:
                    viewport.w > 767 ? document.documentElement : document.querySelector('.body-inner'),
                smoothTouch: false
            })
			this.lenis.on("scroll", (e) => {
				this.updateOnScroll(e);
				ScrollTrigger.update();
			});
		}
		reachedThreshold(threshold) {
			if (!threshold) return false;
			const dist = distance(
				this.scroller.scrollX,
				this.scroller.scrollY,
				this.lastScroller.scrollX,
				this.lastScroller.scrollY
			);

			if (dist > threshold) {
				this.lastScroller = { ...this.scroller };
				return true;
			}
			return false;
		}

		updateOnScroll(e) {
			this.scroller.scrollX = e.scroll;
			this.scroller.scrollY = e.scroll;
			this.scroller.velocity = e.velocity;
            this.scroller.direction = e.direction;
            if (header) {
                header.updateOnScroll(this.lenis);
            }
		}

		start() {
			if (this.lenis) {
				this.lenis.start();
			}
			$(".body").css("overflow", "initial");
		}

		stop() {
			if (this.lenis) {
				this.lenis.stop();
			}
			$(".body").css("overflow", "hidden");
		}

		scrollTo(target, options = {}) {
			if (this.lenis) {
				this.lenis.scrollTo(target, options);
			}
		}

		scrollToTop(options = {}) {
            if (this.lenis) {
                this.lenis.scrollTo("top", { duration: .0001, immediate: true, lock: true, ...options });
            }
		}

		destroy() {
			if (this.lenis) {
				gsap.ticker.remove((time) => {
					this.lenis.raf(time * 1000);
				});
				this.lenis.destroy();
				this.lenis = null;
			}
		}
	}
	const smoothScroll = new SmoothScroll();
    smoothScroll.init();

    class TriggerSetup extends HTMLElement {
        constructor() {
            super();
            this.tlTrigger = null;
            this.onTrigger = () => { };
        }
        connectedCallback() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: $(this).find('section'),
                    start: 'top bottom+=50%',
                    end: 'bottom top-=50%',
                    once: true,
                    onEnter: () => {
                        this.onTrigger?.();
                    }
                }
            });
        }
        destroy() {
            if (this.tlTrigger) {
                this.tlTrigger.kill();
                this.tlTrigger = null;
            }
        }
    }

    class Header {
        constructor() {
            this.el = null;
            this.isOpen = false;
        }
        init(data) {
            this.el = document.querySelector('.header');
            console.log("run")
            if (viewport.w > 991) {
                this.toggleMenu();
                this.handleHover();
            }
            else {
                this.toggleNav();
            }
        }
        updateOnScroll(inst) {
            // this.toggleHide(inst);
            this.toggleScroll(inst);
        }
        toggleScroll(inst) {
            if (inst.scroll > $(this.el).height() * 2) $(this.el).addClass("on-scroll");
            else $(this.el).removeClass("on-scroll");
        }
        toggleHide(inst) {
            if (inst.direction == 1) {
                if (inst.scroll > ($(this.el).height() * 3)) {
                    $(this.el).addClass('on-hide');
                }
            } else if (inst.direction == -1) {
                if (inst.scroll > ($(this.el).height() * 3)) {
                    $(this.el).addClass("on-hide");
                    $(this.el).removeClass("on-hide");
                }
            }
            else {
                $(this.el).removeClass("on-hide");
            }
        }
        toggleMenu() {
            $('.header-menu .header-link').on('mouseenter', this.open.bind(this));
            $('.header').on('mouseleave', this.close.bind(this));
            // $(window).on('click', function (e) {
            //     if (!e.target.closest('.header-menu .header-link')) {
            //         $('.header-nav').slideUp(() => $('.header-nav-item').removeClass('active'));
            //         $('.header').removeClass('force-show');
            //         $('.header-menu .header-link').removeClass('active');
            //         header.isOpen = false;
            //     }
            // });
            $('.header-nav-item').eq(1).addClass('active');
            $('.header-nav-dropdown').eq(0).addClass('active');
        }
        toggleNav() {
            $('.header-ham').on('click', this.handleClick.bind(this));
            $(window).on('click', function (e) {
                if (!e.target.closest('.header-menu .header-link, .header-ham, header-nav-link, .header-link-grp')) {
                    $('.header-link-grp').slideUp();
                    $('.header').removeClass('force-show');
                    $('.header-menu .header-link').removeClass('active');
                    $('.header').removeClass('on-active-nav');
                    header.isOpen = false;
                }
            });
            $('.header-nav-link:not(a)').on('click', function (e) {
                let parent = $(this).parent();
                let index = $(this).index();
                $('.header-link-grp').addClass('active-sub-nav');
                setTimeout(() => {
                    $('.header-nav-item').eq(parent.index()).addClass('active').siblings().removeClass('active');
                    $('.header-nav-item').eq(parent.index()).find('.header-nav-link-cate .header-nav-link').eq(index).addClass('active').siblings().removeClass('active');
                    $('.header-nav-item').eq(parent.index()).find('.header-nav-link-child .header-nav-dropdown').eq(index).addClass('active').siblings().removeClass('active');
                    $('.header-nav-item').eq(parent.index()).find('.header-nav-img .header-nav-img-inner').eq(index).addClass('active').siblings().removeClass('active');
                }, 300);
            })
            $('.header-nav-link-back').on('click', function (e) {
                $('.header-nav-link-child .header-nav-dropdown').removeClass('active');
                $('.header-nav-link-cate .header-nav-link').removeClass('active');
                $('.header-nav-item').removeClass('active');
                setTimeout(() => {
                    $('.header-link-grp').removeClass('active-sub-nav');
                }, 100);
            })
            if (viewport.w <= 767) {
                $('.header-link-grp').attr('data-lenis-prevent', true);
            }
            // $(this.el).find('.header-link, .header-logo, .header-btn').on('click', () => setTimeout(() => this.close(), 800));
        }
        handleClick(e) {
            e.preventDefault();
            if (this.isOpen) {
                this.close();
            }
            else {
                this.open();
            }
        }
        handleHover() {
            // $('.header-nav-item.active')
            $('.header-nav-link-cate .header-nav-link').eq(0).addClass('active');
            $('.header-nav-link-child .header-nav-dropdown').eq(0).addClass('active');
            $('.header-nav-link-cate .header-nav-link').mouseenter(function () {
                let index = $(this).index();
                $(this).addClass('active').siblings().removeClass('active');
                $(this).closest('.header-nav-item').find('.header-nav-img-inner').eq(index).addClass('active').siblings().removeClass('active');
                $(this).closest('.header-nav-item').find('.header-nav-dropdown').eq(index).addClass('active').siblings().removeClass('active');
            });
        }
        open(e) {
            if (viewport.w > 991) {
                let index = $(e.currentTarget).index();
                $('.header-menu .header-link').eq(index).addClass('active').siblings().removeClass('active');
                $('.header-nav-item').eq(index).addClass('active').siblings().removeClass('active');
                $('.header-nav').slideDown('fast');
            }
            else {
                $('.header').addClass('on-active-nav');
                $('.header-link-grp').slideDown();
                smoothScroll.stop();
            }
            $('.header').addClass('force-show');
            this.isOpen = true;
        }
        close() {
            if (viewport.w > 991) {
                if (this.isOpen) {
                    $('.header-menu .header-link').removeClass('active');
                    $('.header-nav').slideUp('fast',() => $('.header-nav-item').removeClass('active'));
                }
            }
            else {
                $('.header').removeClass('on-active-nav');
                $('.header-link-grp').slideUp();
                smoothScroll.start();
            }
            $('.header').removeClass('force-show');
            this.isOpen = false;
        }
    }
    const header = new Header();
    header.init();

    class Popup {
        constructor() {
            this.init();
        }
        init() {
            this.popup = $('.popup');
            this.popupVid = $('.popup-vid-wrap');
            this.popupOpen = $('[data-popup="open"]');
            this.popupClose = $('[data-popup="close"]');
            this.isPopupVid = false;
            this.isReady = true;

            this.popupOpen.on('click', (e) => {
                if ($(e.currentTarget).attr('data-short-youtube-id') || $(e.currentTarget).attr('data-full-youtube-id')) {
                    if (!this.isReady) return;
                    this.isPopupVid = true;
                    if ($(e.currentTarget).attr('data-short-youtube-id')) {
                        if (viewport.w <= 767) {
                            this.openPopupVid($(e.currentTarget).attr('data-short-youtube-id'));
                        }
                        else {
                            this.openPopupVid($(e.currentTarget).attr('data-full-youtube-id'));
                        }
                    }
                    else {
                        this.openPopupVid($(e.currentTarget).attr('data-full-youtube-id'));
                    }
                }
                else {
                    this.isPopupVid = false;
                    this.popup.addClass('active');
                }
            });
            this.popupClose.on('click', () => {
                console.log(this.isPopupVid)
                this.closePopup();
            });
            $(window).on('click', (e) => {
                if (!e.target.closest('.popup-content, [data-popup="open"], .popup-work')) {
                    this.closePopup();
                }
            });
            $(window).on('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closePopup();
                }
            });
        }
        createIframe(videoId) {
            let iframe = $('.popup-vid-wrap iframe').length > 0 ? $('.popup-vid-wrap iframe'): $('<iframe></iframe>');
            let iframeSrc = new URL(`https://www.youtube.com/embed/${videoId}?origin=${window.location.origin}&autoplay=1`);
            iframe.attr({
                'src': iframeSrc,
                'allow': 'autoplay',
                'allowfullscreen': '',
                'width': '100%',
                'height': '100%',
                'frameborder': 0,
                'allow': 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
                'referrerpolicy': 'strict-origin-when-cross-origin'
            });
            return iframe;
        }
        destroyIframe() {
            $('.popup-vid-wrap iframe').remove();
        }
        openPopupVid(videoId) {
            if (viewport.w <= 767) {
                this.popupVid.addClass('is-short');
            }
            this.popupVid.append(this.createIframe(videoId));
            $('.popup').addClass('active');
            this.isReady = false;
        }
        closePopupVid() {
            this.popup.removeClass('active');
            setTimeout(() => {
                this.popupVid.removeClass('is-short');
                this.destroyIframe();
                this.isReady = true;
            }, 300);
        }
        closePopup() {
            if (this.isPopupVid) {
                this.closePopupVid();
            }
            else {
                this.popup.removeClass('active');
            }
        }
    }
    const popup = new Popup();
    popup.init();

    const HomePage = {
        'home-hero-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.interact();
                };
            }
            animationReveal() {
                new MasterTimeline({
                    timeline: gsap.timeline({
                        onStart: () => {
                            $('[data-init-hidden]').removeAttr('data-init-hidden');
                            requestAnimationFrame(() => {
                                $('.body').css({
                                    'overflow': 'initial',
                                    'position': 'relative',
                                    'max-height': 'none',
                                    'inset': 'auto',
                                    'overflow-y': 'initial'
                                })
                            })
                            setTimeout(() => {
                                this.animationScrub();
                            }, 1000);
                        }
                    }),
                    allowMobile: true,
                    tweenArr: [
                        new FadeSplitText({ el: $('.home-hero-front-title').get(0) }),
                        new FadeIn({ el: $('.home-hero-front-logo').get(0) }),
                        new FadeIn({ el: $('.home-hero-front-main-img .home-hero-front-main-img-bg').get(0) }),
                        new FadeIn({ el: $('.home-hero-front-sub-img.left .home-hero-front-sub-img-bg').get(0), type: 'left' }),
                        new FadeIn({ el: $('.home-hero-front-sub-img.right .home-hero-front-sub-img-bg').get(0), type: 'right' }),
                        new FadeIn({ el: $('.home-hero-front-cta').get(0), from: { y: 10 } })
                    ]
                });
            }
            animationScrub() {
                this.tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.home-hero',
                        start: 'top-=1px top',
                        end: 'bottom bottom+=10%',
                        scrub: 1,
                        onToggle: (self) => {
                            if (self.isActive) {
                                $(header.el).addClass('force-hide');
                            }
                            else {
                                if (self.progress === 1) {
                                    $(header.el).removeClass('force-hide');
                                }
                            }
                        }
                    }
                })

                let originalWidth = $('.home-hero-front-main-img').width();
                gsap.set('.home-hero-front-main-img', { scale: 1, y: 0, width: originalWidth });
                let middleOffsetTop = $('.home-hero-front-main-img-bg').get(0).getBoundingClientRect().top - $('.home-hero-front-title-flex').eq(0).get(0).getBoundingClientRect().top;

                let offsetBottom = $(window).height() - $('.home-hero-front-main-img').get(0).getBoundingClientRect().bottom;
                let scaleOffSet = $('.home-hero-main-img.full').height() / $('.home-hero-front-main-img-inner').height();

                this.tl
                    .to('.home-hero-front-sub-img.left', { rotation: 0, x: 0, y: 0, duration: .6, ease: 'none' }, 0)
                    .to('.home-hero-front-sub-img.right', { rotation: 0, x: 0, y: 0, duration: .6, ease: 'none' }, 0)
                    .fromTo('.home-hero-front-main-img', { y: 0 }, { y: -middleOffsetTop, transformOrigin: 'center top', ease: 'none', duration: 1 })
                    .set('.home-hero-front-sub-img', { autoAlpha: 0, duration: 0 }, "<=0")
                    .fromTo('.home-hero-front-cta, .home-hero-front-logo', { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: 10, duration: .6, ease: 'none' }, "<=0")
                    .to($('.home-hero-front-title-flex').eq(1).find('.heading').eq(0), { x: cvUnit(-250, 'rem'), y: -cvUnit(15, 'rem'), scale: .9, autoAlpha: 0, duration: .6, ease: 'power2.inOut' }, "<=.1")
                    .to($('.home-hero-front-title-flex').eq(1).find('.heading').eq(1), { x: cvUnit(285, 'rem'), y: -cvUnit(15, 'rem'), scale: .9, autoAlpha: 0, duration: .6, ease: 'power2.inOut' }, '<=0')
                    .to($('.home-hero-front-title-flex').eq(0).find('.heading').eq(0), { x: cvUnit(-340, 'rem'), y: -cvUnit(15, 'rem'), scale: .9, autoAlpha: 0, duration: .6, ease: 'power2.inOut' }, "<=.3")
                    .to($('.home-hero-front-title-flex').eq(0).find('.heading').eq(1), { x: cvUnit(250, 'rem'), y: -cvUnit(15, 'rem'), scale: .9, autoAlpha: 0, duration: .6, ease: 'power2.inOut' }, '<=0')
                    .to($('.home-hero-front-title').find('.heading').eq(0).get(0), { y: -cvUnit(15, 'rem'), scale: .9, autoAlpha: 0, duration: .6, ease: 'power2.inOut' }, '<=0.1')
                    .set('.home-hero-front-main-img', { scale: 1, y: -middleOffsetTop, width: originalWidth, transformOrigin: `center bottom`, duration: 0 }, "-=.1")
                    .to('.home-hero-front-main-img', { scale: scaleOffSet, y: offsetBottom, width: originalWidth * scaleOffSet, duration: 1,  ease: 'power1.inOut'}, "<=0")
                    .to('.home-hero-front-main-img-inner', { marginLeft: 0, duration: .7, ease: 'power1.inOut'  }, "<=0")
                    .to('.home-hero-front-main-img-bg', { borderRadius: 0, borderWidth: 0, duration: .8,  ease: 'power1.inOut' }, "<=0")
                    .to('.home-hero-front', { autoAlpha: 0, duration: .8,  ease: 'power1.inOut'  }, "-=.25")
                    .to('.home-hero-text-wrap', { y: 0, duration: 1, ease: 'power1.inOut' }, "<=0.2")
            }
            interact() {
            }
            destroy() {
                super.destroy();
            }
        },
        'home-intro-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                };
            }
            animationReveal() {
            }
            animationScrub() {
                if (viewport.w > 991) {
                    this.tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: '.home-intro-stick-wrap',
                            start: 'top top',
                            end: 'bottom bottom',
                            endTrigger: '.home-intro',
                            scrub: 1
                        }
                    })
                    // let offsetTop = $('.home-intro-img.main').get(0).getBoundingClientRect().top - cvUnit(86, 'rem');
                    let offsetLeft = $('.home-intro-thumb').get(0).getBoundingClientRect().left - $('.home-intro-img.main').get(0).getBoundingClientRect().left;
                    let scaleOffset = $('.home-intro-thumb').width() / $('.home-intro-img.main').width();
                    gsap.set('.home-intro-img.main', { scale: 1, x: $('.home-intro-img.clone').offset().left - $('.home-intro-img.main').offset().left + cvUnit(131, 'rem')  });
                    this.tl
                    .fromTo('.home-intro-img.main',
                        { clipPath: `inset(0% 10% round ${cvUnit(16, 'rem')}px)`, transformOrigin: 'left 8%', scale: 1 },
                        {  x: offsetLeft + cvUnit(131, 'rem'), scale: scaleOffset, clipPath: `inset(0% 0% round ${cvUnit(32/scaleOffset, 'rem')}px)`, duration: 1, ease: 'power2.inOut'})
                    .fromTo('.home-intro-img.main .video-card-play',
                        { scale: scaleOffset / 100 },
                        { scale: 1 / scaleOffset, duration: 1, ease: 'power2.inOut' }, 0)
                    .fromTo('.home-intro-title, .home-intro-desc',
                        { autoAlpha: 1 },
                        { autoAlpha: 0, duration: 1, ease: 'power2.inOut', stagger: 0.1 }, 0)
                }
            }
            interact() {
            }
            destroy() {
                this.tlTrigger.kill();
            }
        },
        'home-path-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                };
            }
            animationScrub() {
                $('.home-path-item-img-inner').each((_, item) => new ParallaxImage({ el: $(item).find('img').get(0), scaleOffset: 0.2 }));
            }
            animationReveal() {
            }
            interact() {
            }
            destroy() {
                super.destroy();
            }
        },
        'home-stats-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                };
            }
            animationReveal() {
            }
            animationScrub() {
                $('.home-stats-item-val [data-counter]').each((index, item) => {
                    const $item = $(item);
                    if ($item.is(':visible') && $item.length) {
                        // On mobile, disable scroll spy and trigger manually
                        const options = viewport.w <= 767
                            ? { enableScrollSpy: false, scrollSpyDelay: 0 }
                            : { scrollSpyDelay: index * 0.2 };

                        const counter = new CounterUp(item, options);

                        // On mobile, use IntersectionObserver to trigger when element enters viewport
                        if (viewport.w <= 767) {
                            const rect = item.getBoundingClientRect();
                            const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

                            if (isInViewport) {
                                // Already in viewport, trigger immediately
                                counter.start();
                            } else {
                                // Not in viewport yet, use IntersectionObserver
                                const observer = new IntersectionObserver((entries) => {
                                    entries.forEach(entry => {
                                        if (entry.isIntersecting) {
                                            setTimeout(() => {
                                                counter.start();
                                            }, 100 + (index * 200));
                                            observer.unobserve(entry.target);
                                        }
                                    });
                                }, { threshold: 0.1 });
                                observer.observe(item);
                            }
                        }
                    }
                });
            }
            interact() {
            }
            destroy() {
                this.tlTrigger.kill();
            }
        },
        'home-val-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                };
            }
            animationScrub() {
                $('.home-val-item-img-inner img').each((_, item) => new ParallaxImage({ el: item, scaleOffset: 0.2 }));
            }
            animationReveal() {
            }
            interact() {
            }
            destroy() {
                super.destroy();
            }
        },
        'home-state-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                };
            }
            animationReveal() {
            }
            animationScrub() {
            }
            interact() {
                const updateLocationPopup = (slug) => {
                    const updatePosition = () => {
                        let rectWrap = $(`.home-state-map`).get(0).getBoundingClientRect();
                        let dotRect = $(`.location-area[id="${slug}"] .location-dot`).get(0).getBoundingClientRect();
                        let popupRect = $(`.location-infor`).get(0).getBoundingClientRect();
                        let x = ((dotRect.left - rectWrap.left + dotRect.width - cvUnit(viewport.w > 767 ? 5 : 0, 'rem')) / rectWrap.width) * 100;

                        let actualLeft = rectWrap.left + (x / 100) * rectWrap.width;
                        let popupRight = actualLeft + popupRect.width;
                        let screenWidth = window.innerWidth;

                        if (popupRight > screenWidth) {
                            x = ((dotRect.left - rectWrap.left - popupRect.width + cvUnit(viewport.w > 767 ? 5 : 0, 'rem')) / rectWrap.width) * 100;
                        }

                        let y = ((dotRect.top - rectWrap.top - popupRect.height + cvUnit(viewport.w > 767 ? 5 : 0, 'rem')) / rectWrap.height) * 100;
                        gsap.set($(`.location-infor`), {
                            left: `${x}%`,
                            top: `${y}%`
                        });
                    }
                    if ($(`.location-infor`).hasClass('active')) {
                        $(`.location-infor`).removeClass('active');
                        setTimeout(() => {
                            $(`.location-infor [data-popup-state="name"]`).text($(`.home-state-btn-item[data-slug="${slug}"] [data-popup-state="name"]`).text());
                            $(`.location-infor`).addClass('active');
                            updatePosition();
                        }, 400);
                    }
                    else {
                        $('.location-infor').addClass('active');
                        $(`.location-infor [data-popup-state="name"]`).text($(`.home-state-btn-item[data-slug="${slug}"] [data-popup-state="name"]`).text());
                        updatePosition();
                    }
                }
                $('.home-state-btn-item').on('click', (e) => {
                    e.preventDefault();
                    const slug = $(e.currentTarget).attr('data-slug');
                    $(e.target).addClass('active').siblings().removeClass('active');
                    $(`.location-area#${slug}`).addClass('active').siblings().removeClass('active');
                    $(`.location-dot`).removeClass('active');
                    $(`.location-area#${slug} .location-dot`).addClass('active');
                    updateLocationPopup(slug);
                    smoothScroll.scrollTo(`.location-area[id="${slug}"]`, { offset: -150 });
                });
                $('.location-area').on('mouseenter', (e) => {
                    e.preventDefault();
                    const slug = $(e.currentTarget).attr('id');
                    if ($(e.target).closest('.location-dot').length > 0) {
                        return;
                    }
                    $(e.currentTarget).addClass('active').siblings().removeClass('active');
                    $(`.home-state-btn-item[data-slug="${slug}"]`).addClass('active').siblings().removeClass('active');
                    $('.location-dot').removeClass('active');
                    debounce(() => updateLocationPopup(slug), 100)();
                });
                $('.location-area').on('mouseleave', (e) => {
                    e.preventDefault();
                    if (!$('.location-infor').hasClass('active')) {
                        return;
                    }
                    $('.location-infor').removeClass('active');
                    $('.location-dot').removeClass('active');
                    $('.home-state-btn-item').removeClass('active');
                    $('.location-area').removeClass('active');
                });
                $('.location-dot').on('pointerenter', (e) => {
                    e.preventDefault();
                    let slug = $(e.currentTarget).closest('.location-area').attr('id');
                    $(e.currentTarget).closest('.location-area').addClass('active').siblings().removeClass('active');
                    $(e.currentTarget).addClass('active').closest('.location-area').siblings().find('.location-dot').removeClass('active');
                    debounce(() => updateLocationPopup(slug), 100)();
                });
                $(window).on('click', (e) => {
                    if (!e.target.closest('.location-dot'))
                        if (!e.target.closest('.home-state-btn-item'))
                            $('.location-infor').removeClass('active');
                })

                $('.home-state-map-btn').on('click', () => {
                    $('.home-state-map-list').toggleClass('active');
                    $('.home-state-map-btn-item.active').removeClass('active').siblings().addClass('active');
                });
            }
            destroy() {
                super.destroy();
            }
        },
        'home-process-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationScrub();
                    this.animationReveal();
                    this.interact();
                };
            }
            animationScrub() {
                if (viewport.w > 767) {
                    let defaultTop = parseFloat($('.home-process-item').eq(0).css('top'));
                    $('.home-process-item').each((i, item) => {
                        let scale, rotate = 0;
                        if (i !== $('.home-process-item').length - 1) {
                            scale = .9 + .025 * i;
                            rotate = -10;
                            new ParallaxImage({ el: $(item).find('.home-process-item-img-inner img').get(0) });
                        }
                        let tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: item,
                                start: 'top ' + (250 + 40 * i),
                                end: 'bottom bottom',
                                endTrigger: '.home-process-list',
                                scrub: 1.5
                            }
                        })
                        gsap.set(item, { top: defaultTop + 20 * i });
                        tl.fromTo(item, { scale: 1, rotationX: 0 }, {
                            scale,
                            rotationX: rotate,
                            transformOrigin: 'top center',
                            ease: 'none',
                            duration: 1,
                            overwrite: true
                        })
                    })
                }

                // let tlProgress = gsap.timeline({
                //     scrollTrigger: {
                //         trigger: '.home-process-main',
                //         start: 'top 50%',
                //         end: 'bottom 50%',
                //         scrub: 1.5
                //     }
                // })
                // tlProgress.fromTo('.home-process-prog-inner', { scaleY: 0 }, { scaleY: 1, ease: 'none' });
            }
            animationReveal() {
            }
            interact() {
            }
            destroy() {
                super.destroy();
            }
        },
        'home-testi-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationScrub();
                    this.animationReveal();
                    this.interact();
                };
            }
            animationScrub() {
            }
            animationReveal() {
            }
            interact() {
                $('.home-testi-cms').addClass('swiper');
                $('.home-testi-list').addClass('swiper-wrapper');
                $('.home-testi-card').addClass('swiper-slide');

                $('.home-testi-list').css('gap', 0);
                let swiper = new Swiper('.home-testi-cms', {
                    slidesPerView: 'auto',
                    spaceBetween: cvUnit(16, 'rem')
                });
            }
            destroy() {
                super.destroy();
            }
        },
    }

    const AboutPage = {
        'about-hero-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                };
            }
            animationReveal() {
                requestAnimationFrame(() => {
                    $('.body').css({
                        'overflow': 'initial',
                        'position': 'relative',
                        'max-height': 'none',
                        'inset': 'auto',
                        'overflow-y': 'initial'
                    })
                })
            }
            animationScrub() {
                new Marquee({ list: $('.about-hero-title-inner'), duration: 40 }).setup();
                new ParallaxImage({ el: $('.about-hero-thumb-inner img').get(0) });
            }
            interact() {
            }
            destroy() {
                super.destroy();
            }
        },
        'about-mission-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                };
            }
            animationScrub() {
            }
            animationReveal() {
                this.tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.about-mission-title',
                        start: 'top 85%',
                        end: 'bottom 55%',
                        scrub: 1
                    }
                })

                let titleSplit = SplitText.create(".about-mission-title", { type: "chars" });
                gsap.set(titleSplit.chars, { autoAlpha: 0.2 });
                this.tl.fromTo(titleSplit.chars, { autoAlpha: 0.2 }, { autoAlpha: 1, duration: 1, ease: 'power2.inOut', stagger: 0.05 }, 0)
            }
            interact() {
                $('.about-mission-slides').addClass('swiper');
                $('.about-mission-slides-wrapper').addClass('swiper-wrapper');
                $('.about-mission-slides-item').addClass('swiper-slide');

                $('.about-mission-slides-wrapper').css('gap', 0);
                let swiper = new Swiper('.about-mission-slides', {
                    slidesPerView: 'auto',
                    spaceBetween: cvUnit(16, 'rem'),
                    centeredSlides: true,
                    breakpoints: {
                        767: {
                            spaceBetween: cvUnit(32, 'rem'),
                            centeredSlides: false
                        }
                    }
                });
            }
            destroy() {
                super.destroy();
            }
        },
        'about-why-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                };
            }
            animationScrub() {
                $('.about-why-item-img-inner img').each((_, item) => new ParallaxImage({ el: item }));
            }
            animationReveal() {
            }
            interact() {
            }
            destroy() {
                super.destroy();
            }
        },
        'about-work-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                };
            }
            animationScrub() {
                new ParallaxImage({ el: $('.about-work-img-inner img').get(0) });
            }
            animationReveal() {
            }
            interact() {
            }
            destroy() {
                super.destroy();
            }
        },
    }

    const TeamPage = {
        'team-hero-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                };
            }
            animationReveal() {
                requestAnimationFrame(() => {
                    $('.body').css({
                        'overflow': 'initial',
                        'position': 'relative',
                        'max-height': 'none',
                        'inset': 'auto',
                        'overflow-y': 'initial'
                    })
                })
            }
            animationScrub() {
                $('.team-hero-cms').each((idx, item) => new Marquee({ list: $(item), duration: 40, isReverse: idx }).setup());
            }
            interact() {
            }
            destroy() {
                this.tlTrigger.kill();
            }
        },
        'team-listing-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                };
            }
            animationReveal() {
            }
            animationScrub() {
            }
            interact() {
                $('.team-listing-main').each((idx, item) => {
                    let hideItem = $(item).find('.team-listing-cms-item-inner.w-condition-invisible');
                    if (hideItem.length <= 0) {
                        $(item).find('.team-listing-btn').remove();
                    }
                    else {
                        $(item).find('.team-listing-btn').on('click', () => {
                            if ($(item).find('.team-listing-cms-item-inner.w-condition-invisible').length <= 0) {
                                hideItem.addClass('w-condition-invisible');
                                $(item).find('.team-listing-btn .txt').text('View more');
                            }
                            else {
                                hideItem.removeClass('w-condition-invisible');
                                $(item).find('.team-listing-btn .txt').text('View less');
                            }
                        });
                    }
                });
            }
            destroy() {
                super.destroy();
            }
        },
    }

    const LoanPage = {
        'loan-hero-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                };
            }
            animationReveal() {
                requestAnimationFrame(() => {
                    $('.body').css({
                        'overflow': 'initial',
                        'position': 'relative',
                        'max-height': 'none',
                        'inset': 'auto',
                        'overflow-y': 'initial'
                    })
                })
            }
            animationScrub() {
            }
            interact() {
            }
            destroy() {
                this.tlTrigger.kill();
            }
        },
        'loan-hiw-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                };
            }
            animationReveal() {
            }
            animationScrub() {
                if (viewport.w > 767) {
                    let defaultTop = parseFloat($('.loan-hiw-main-item').eq(0).css('top'));
                    $('.loan-hiw-main-item').each((i, item) => {
                        let scale, rotate = 0;
                        if (i !== $('.loan-hiw-main-item').length - 1) {
                            scale = .9 + .025 * i;
                            rotate = -10;
                            new ParallaxImage({ el: $(item).find('.loan-hiw-main-item-img-inner img').get(0) });
                        }
                        let tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: item,
                                start: 'top ' + (250 + 40 * i),
                                end: 'bottom bottom',
                                endTrigger: '.loan-hiw-main-list',
                                scrub: 1.5
                            }
                        })
                        gsap.set(item, { top: defaultTop + 20 * i });
                        tl.fromTo(item, { scale: 1, rotationX: 0 }, {
                            scale,
                            rotationX: rotate,
                            transformOrigin: 'top center',
                            ease: 'none',
                            duration: 1,
                            overwrite: true
                        })
                    })
                }
            }
            interact() {
            }
            destroy() {
                super.destroy();
            }
        },
        'loan-goal-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                };
            }
            animationReveal() {
            }
            animationScrub() {
                if (viewport.w <= 767) {
                    $('.loan-goal-main').addClass('swiper');
                    $('.loan-goal-list').addClass('swiper-wrapper');
                    $('.loan-goal-item').addClass('swiper-slide');

                    $('.loan-goal-list').css('gap', 0);
                    let swiper = new Swiper('.loan-goal-main', {
                        slidesPerView: 1,
                        spaceBetween: cvUnit(20, 'rem'),
                        centeredSlides: true,
                        pagination: {
                            el: '.loan-goal-pagin',
                            type: 'bullets',
                            bulletClass: 'loan-goal-pagin-dot',
                            bulletActiveClass: 'active',
                            clickable: true
                        }
                    });
                }
            }
            interact() {
            }
            destroy() {
                super.destroy();
            }
        },
        'loan-story-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                };
            }
            animationReveal() {
            }
            animationScrub() {
            }
            interact() {
                if (viewport.w <= 767) {
                    $('.loan-story-main').addClass('swiper');
                    $('.loan-story-main-list').addClass('swiper-wrapper');
                    $('.loan-story-main-item').addClass('swiper-slide');

                    $('.loan-story-main-list').css('gap', 0);
                    let swiper = new Swiper('.loan-story-main', {
                        slidesPerView: 'auto',
                        spaceBetween: cvUnit(20, 'rem'),
                        centeredSlides: true,
                        pagination: {
                            el: '.loan-story-pagin',
                            type: 'bullets',
                            bulletClass: 'loan-story-pagin-dot',
                            bulletActiveClass: 'active'
                        }
                    });
                }
            }
            destroy() {
                super.destroy();
            }
        },
        'loan-faq-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                };
            }
            animationReveal() {
            }
            animationScrub() {
            }
            interact() {
                $('.loan-faq-item-title').on('click', function(e) {
                    $(this).parent().toggleClass('active');
                    $(this).parent().find('.loan-faq-item-desc').slideToggle();
                });
            }
            destroy() {
                super.destroy();
            }
        },
    }
    const VeteranPage = {
        'vc-hero-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                };
            }
            animationReveal() {
                requestAnimationFrame(() => {
                    $('.body').css({
                        'overflow': 'initial',
                        'position': 'relative',
                        'max-height': 'none',
                        'inset': 'auto',
                        'overflow-y': 'initial'
                    })
                })
            }
            animationScrub() {
            }
            interact() {
            }
            destroy() {
                super.destroy();
            }
        },
        'vc-type-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                };
            }
            animationReveal() {
            }
            animationScrub() {
            }
            interact() {
                if (viewport.w <= 767) {
                    $('.vc-type-main').addClass('swiper');
                    $('.vc-type-list').addClass('swiper-wrapper');
                    $('.vc-type-item').addClass('swiper-slide');

                    $('.vc-type-list').css('gap', 0);
                    let swiper = new Swiper('.vc-type-main', {
                        slidesPerView: 'auto',
                        spaceBetween: cvUnit(20, 'rem'),
                        centeredSlides: true,
                        pagination: {
                            el: '.vc-type-pagin',
                            type: 'bullets',
                            bulletClass: 'vc-type-pagin-dot',
                            bulletActiveClass: 'active'
                        }
                    });
                }
            }
            destroy() {
                super.destroy();
            }
        },
        'loan-hiw-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                };
            }
            animationReveal() {
            }
            animationScrub() {
                if (viewport.w > 767) {
                    let defaultTop = parseFloat($('.loan-hiw-main-item').eq(0).css('top'));
                    $('.loan-hiw-main-item').each((i, item) => {
                        let scale, rotate = 0;
                        if (i !== $('.loan-hiw-main-item').length - 1) {
                            scale = .9 + .025 * i;
                            rotate = -10;
                            new ParallaxImage({ el: $(item).find('.loan-hiw-main-item-img-inner img').get(0) });
                        }
                        let tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: item,
                                start: 'top ' + (250 + 40 * i),
                                end: 'bottom bottom',
                                endTrigger: '.loan-hiw-main-list',
                                scrub: 1.5
                            }
                        })
                        gsap.set(item, { top: defaultTop + 20 * i });
                        tl.fromTo(item, { scale: 1, rotationX: 0 }, {
                            scale,
                            rotationX: rotate,
                            transformOrigin: 'top center',
                            ease: 'none',
                            duration: 1,
                            overwrite: true
                        })
                    })
                }
            }
            interact() {
            }
            destroy() {
                super.destroy();
            }
        },
        'vc-learn-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                };
            }
            animationReveal() {
            }
            animationScrub() {
                if (viewport.w <= 767) {
                    $('.vc-learn-main-sample').addClass('swiper');
                    $('.vc-learn-main-sample-list').addClass('swiper-wrapper');
                    $('.vc-learn-main-sample-item').addClass('swiper-slide');

                    $('.vc-learn-main-sample-list').css('gap', 0);
                    let swiper = new Swiper('.vc-learn-main-sample', {
                        slidesPerView: 1.1,
                        spaceBetween: cvUnit(20, 'rem'),
                        navigation: {
                            nextEl: '.vc-learn-main-ctrl-arr.next',
                            prevEl: '.vc-learn-main-ctrl-arr.prev',
                            disabledClass: 'disabled',
                        }
                    });
                }
            }
            interact() {
            }
            destroy() {
                super.destroy();
            }
        },
        'vc-tool-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                };
            }
            animationReveal() {
            }
            animationScrub() {
            }
            interact() {
                $('.vc-tool-news-cms').addClass('swiper');
                $('.vc-tool-news-list').addClass('swiper-wrapper');
                $('.vc-tool-news-item').addClass('swiper-slide');

                $('.vc-tool-news-list').css('gap', 0);
                let swiper = new Swiper('.vc-tool-news-cms', {
                    slidesPerView: 'auto',
                    spaceBetween: cvUnit(viewport.w > 991 ? 32 : 22, 'rem'),
                    navigation: {
                        nextEl: '.vc-tool-news-ctrl-arr.next',
                        prevEl: '.vc-tool-news-ctrl-arr.prev',
                        disabledClass: 'disabled',
                    }
                });
            }
            destroy() {
                super.destroy();
            }
        },
        'vc-commit-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                };
            }
            animationReveal() {
            }
            animationScrub() {
            }
            interact() {
                if (viewport.w <= 767) {
                    $('.vc-commit-main').addClass('swiper');
                    $('.vc-commit-main-list').addClass('swiper-wrapper');
                    $('.vc-commit-main-item').addClass('swiper-slide');

                    $('.vc-commit-main-list').css('gap', 0);
                    let swiper = new Swiper('.vc-commit-main', {
                        slidesPerView: 'auto',
                        spaceBetween: cvUnit(20, 'rem'),
                        centeredSlides: true,
                        pagination: {
                            el: '.vc-commit-pagin',
                            type: 'bullets',
                            bulletClass: 'vc-commit-pagin-dot',
                            bulletActiveClass: 'active'
                        }
                    });
                }
            }
            destroy() {
                super.destroy();
            }
        },
    }
    const CalculatorPage = {
        'calc-hero-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                    requestAnimationFrame(() => {
                        $('.body').css({
                            'overflow': 'initial',
                            'position': 'relative',
                            'max-height': 'none',
                            'inset': 'auto',
                            'overflow-y': 'initial'
                        })
                    })
                };
            }
            animationReveal() {
            }
            animationScrub() {
            }
            interact() {
                $('.calc-hero-tab').on('click', function(e) {
                    let index = $(this).index();
                    $(this).addClass('active').siblings().removeClass('active');
                    if (index === 0) {
                        $('.calc-hero-main-inner').show();
                    } else {
                        $('.calc-hero-main-inner').eq(index - 1).show().siblings().hide();
                    }
                });
            }
            destroy() {
                super.destroy();
            }
        },
        'calc-learn-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                };
            }
            animationReveal() {
            }
            animationScrub() {
            }
            interact() {
                if (viewport.w <= 767) {
                    $('.calc-learn-main-cms').addClass('swiper');
                    $('.calc-learn-main-cms-list').addClass('swiper-wrapper');
                    $('.calc-learn-main-cms-item').addClass('swiper-slide');

                    $('.calc-learn-main-cms-list').css('gap', 0);
                    let swiper = new Swiper('.calc-learn-main-cms', {
                        slidesPerView: 'auto',
                        spaceBetween: cvUnit(18, 'rem'),
                        pagination: {
                            el: '.calc-learn-pagin',
                            type: 'bullets',
                            bulletClass: 'calc-learn-pagin-dot',
                            bulletActiveClass: 'active'
                        }
                    });
                }
            }
            destroy() {
                super.destroy();
            }
        },
    }
    const ToolPage = {
        'tool-main-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                    requestAnimationFrame(() => {
                        $('.body').css({
                            'overflow': 'initial',
                            'position': 'relative',
                            'max-height': 'none',
                            'inset': 'auto',
                            'overflow-y': 'initial'
                        })
                    })
                };
            }
            animationReveal() {
            }
            animationScrub() {
            }
            interact() {
            }
            destroy() {
                super.destroy();
            }
        },
        'tool-news-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                };
            }
            animationReveal() {
            }
            animationScrub() {
            }
            interact() {
                $('.tool-news-cms').addClass('swiper');
                $('.tool-news-list').addClass('swiper-wrapper');
                $('.tool-news-item').addClass('swiper-slide');

                $('.tool-news-list').css('gap', 0);
                let swiper = new Swiper('.tool-news-cms', {
                        slidesPerView: 'auto',
                    spaceBetween: cvUnit(viewport.w > 991 ? 32 : 22, 'rem'),
                    navigation: {
                        nextEl: '.tool-news-ctrl-arr.next',
                        prevEl: '.tool-news-ctrl-arr.prev',
                        disabledClass: 'disabled',
                    }
                });
            }
            destroy() {
                super.destroy();
            }
        },
    }
    const HubPage = {
        'hub-hero-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                    requestAnimationFrame(() => {
                        $('.body').css({
                            'overflow': 'initial',
                            'position': 'relative',
                            'max-height': 'none',
                            'inset': 'auto',
                            'overflow-y': 'initial'
                        })
                    })
                };
            }
            animationReveal() {
            }
            animationScrub() {
            }
            interact() {
                $('.hub-hero-cate-item').on('click', function(e) {
                    let slug = $(this).attr('data-slug');
                    $('.hub-hero-cate-item').removeClass('active');
                    $(this).addClass('active');
                    $('.hub-hero-main-inner').hide();
                    if (slug) {
                        $('.hub-hero-main-inner[data-slug="' + slug + '"]').show();
                    } else {
                        $('.hub-hero-main-inner').show();
                    }
                });
                if (viewport.w <= 767) {
                    $('.hub-hero-main-cms').addClass('swiper');
                    $('.hub-hero-main-cms-list').addClass('swiper-wrapper');
                    $('.hub-hero-main-cms-item').addClass('swiper-slide');

                    $('.hub-hero-main-cms-list').css('gap', 0);
                    let swiper = new Swiper('.hub-hero-main-cms', {
                        slidesPerView: 'auto',
                        spaceBetween: cvUnit(18, 'rem'),
                        pagination: {
                            el: '.hub-hero-pagin',
                            type: 'bullets',
                            bulletClass: 'hub-hero-pagin-dot',
                            bulletActiveClass: 'active'
                        }
                    });
                }
            }
            destroy() {
                super.destroy();
            }
        },
    }
    const ArticlePage = {
        'article-hero-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                    requestAnimationFrame(() => {
                        $('.body').css({
                            'overflow': 'initial',
                            'position': 'relative',
                            'max-height': 'none',
                            'inset': 'auto',
                            'overflow-y': 'initial'
                        })
                    })
                };
            }
            animationReveal() {
            }
            animationScrub() {
            }
            interact() {
                // $('.article-hero-tab').on('click', function(e) {
                //     let index = $(this).index();
                //     console.log(index)
                //     // // $('.article-hero-tab').addClass('active').siblings().removeClass('active');
                //     // if (index === 0) {
                //     //     $('.article-hero-other-item').show();
                //     //     $('.article-hero-main').show();
                //     // } else {
                //     //     $('.article-hero-main').hide();
                //     //     $('.article-hero-other-item').eq(index - 1).show().siblings().hide();
                //     // }
                // });
                $('.article-hero-tab').on('click', function(e) {
                    let slug = $(this).attr('data-slug');
                    $('.article-hero-tab').removeClass('active');
                    $(this).addClass('active');
                    $('.article-hero-main').hide();
                    if (slug !== 'all') {
                        $('.article-hero-other-item').hide();
                        $('.article-hero-other-item[data-slug="' + slug + '"]').show();
                    } else {
                        $('.article-hero-other-item').show();
                        $('.article-hero-main').show();
                    }
                });
                if (viewport.w <= 767) {
                    $('.article-hero-other-item, .article-hero-main .article-hero-cms:not(.main-one)').addClass('swiper');
                    $('.article-hero-other-item .article-hero-cms-list, .article-hero-main .article-hero-cms:not(.main-one) .article-hero-cms-list').addClass('swiper-wrapper');
                    $('.article-hero-other-item .article-hero-cms-item, .article-hero-main .article-hero-cms:not(.main-one) .article-hero-cms-item').addClass('swiper-slide');
                    $('.article-hero-other-item .article-hero-cms-list, .article-hero-main .article-hero-cms:not(.main-one) .article-hero-cms-list').css('gap', 0);

                    new Swiper('.article-hero-other-item', {
                        slidesPerView: 1.1,
                        spaceBetween: cvUnit(18, 'rem'),
                        navigation: {
                            nextEl: '.article-hero-other-ctrl-arr.next',
                            prevEl: '.article-hero-other-ctrl-arr.prev',
                            disabledClass: 'is-list-pagination-disabled',
                        }
                    });
                    new Swiper('.article-hero-main .article-hero-cms:not(.main-one)', {
                        slidesPerView: 1.1,
                        spaceBetween: cvUnit(18, 'rem'),
                    });
                }
                else {
                    const itemOnPage = 5;
                    const updateCurrentPage = (parent, currentPage) => {
                        const items = $(parent).find('.article-hero-cms-item');
                        const totalItems = items.length;
                        const maxPage = Math.ceil(totalItems / itemOnPage);
                        const startIdx = (currentPage - 1) * itemOnPage;
                        const endIdx = Math.min(startIdx + itemOnPage, totalItems);

                        // Remove 'half' class from all items first
                        items.removeClass('half');

                        items.each((idx, item) => {
                            const $item = $(item);
                            if (idx >= startIdx && idx < endIdx) {
                                $item.show();
                                // Add 'half' class to first 2 items of current page
                                if (idx === startIdx || idx === startIdx + 1) {
                                    $item.addClass('half');
                                }
                            } else {
                                $item.hide();
                            }
                        });

                        // Update button states
                        const $parent = $(parent);
                        const $nextBtn = $parent.find('.article-hero-other-ctrl-arr.next');
                        const $prevBtn = $parent.find('.article-hero-other-ctrl-arr.prev');
                        const $paginationContainer = $nextBtn.parent(); // Container của pagination buttons

                        // Hide pagination if maxPage <= 2
                        if (maxPage <= 1) {
                            $paginationContainer.hide();
                        } else {
                            $paginationContainer.show();

                            if (currentPage >= maxPage) {
                                $nextBtn.addClass('is-list-pagination-disabled');
                            } else {
                                $nextBtn.removeClass('is-list-pagination-disabled');
                            }

                            if (currentPage <= 1) {
                                $prevBtn.addClass('is-list-pagination-disabled');
                            } else {
                                $prevBtn.removeClass('is-list-pagination-disabled');
                            }
                        }
                    };

                    $('.article-hero-other-item').each(function () {
                        const $target = $(this);
                        let currentPage = 1;

                        $target.find('.article-hero-other-ctrl-arr').on('click', function(e) {
                            e.preventDefault();
                            const items = $target.find('.article-hero-cms-item');
                            const totalItems = items.length;
                            const maxPage = Math.ceil(totalItems / itemOnPage);

                            if ($(this).hasClass('next')) {
                                if (currentPage < maxPage) {
                                    currentPage++;
                                }
                            } else if ($(this).hasClass('prev')) {
                                if (currentPage > 1) {
                                    currentPage--;
                                }
                            }

                            requestAnimationFrame(() => {
                                updateCurrentPage($target[0], currentPage);
                            });
                        });

                        updateCurrentPage($target[0], currentPage);
                    });
                }
            }
            destroy() {
                super.destroy();
            }
        },
    }
    const PostPage = {
        'post-hero-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                    requestAnimationFrame(() => {
                        $('.body').css({
                            'overflow': 'initial',
                            'position': 'relative',
                            'max-height': 'none',
                            'inset': 'auto',
                            'overflow-y': 'initial'
                        })
                    })
                    console.log("run")
                };
            }
            animationReveal() {
            }
            animationScrub() {
            }
            interact() {
                $('.post-related-cms').addClass('swiper');
                $('.post-related-list').addClass('swiper-wrapper');
                $('.post-related-item').addClass('swiper-slide');

                $('.post-related-list').css('gap', 0);
                let swiper = new Swiper('.post-related-cms', {
                    slidesPerView: 'auto',
                    spaceBetween: cvUnit(viewport.w > 991 ? 32 : 22, 'rem'),
                    navigation: {
                        nextEl: '.post-related-ctrl-arr.next',
                        prevEl: '.post-related-ctrl-arr.prev',
                        disabledClass: 'disabled',
                    }
                });

                function socialShare() {
                    const url = window.location.href;
                    const encodedUrl = encodeURIComponent(url);
                    $('.post-hero-share-btn').each((_, icon) => {
                        icon.setAttribute('target', '_blank');
                        switch (icon.getAttribute('data-share')) {
                            case 'linkedin': icon.setAttribute('href', `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`); break;
                            case 'facebook': icon.setAttribute('href', `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`); break;
                            case 'x': icon.setAttribute('href', `https://twitter.com/intent/tweet?url=${encodedUrl}`); break;
                            case 'copy': break;
                            default: break;
                        }
                    });

                    $('[data-share="copy"]').on('click', function (e) {
                        e.preventDefault();
                        copyTextToClipboard(url);
                    })

                    function copyTextToClipboard(text) {
                        let textArea = document.createElement('textarea');
                        textArea.style.display = 'none';
                        textArea.value = text;
                        document.body.appendChild(textArea);
                        textArea.select();
                        navigator.clipboard
                            .writeText(text)
                            .then(() => {
                                console.log('Text copied to clipboard');
                            })
                            .catch((error) => {
                                console.error('Failed to copy text to clipboard:', error);
                            });
                        document.body.removeChild(textArea);

                        $('.ar-content-share-popup').addClass('active');
                        setTimeout(() => {
                            $('.ar-content-share-popup').removeClass('active');
                        }, 2000);
                    }
                }
                socialShare();
            }
            destroy() {
                super.destroy();
            }
        },
    }
    const LegalPage = {
        'legal-main-wrap': class extends TriggerSetup {
            constructor() {
                super();
                this.onTrigger = () => {
                    this.animationReveal();
                    this.animationScrub();
                    this.interact();
                    requestAnimationFrame(() => {
                        $('.body').css({
                            'overflow': 'initial',
                            'position': 'relative',
                            'max-height': 'none',
                            'inset': 'auto',
                            'overflow-y': 'initial'
                        })
                    })
                };
            }
            animationReveal() {
            }
            animationScrub() {
            }
            interact() {
            }
            destroy() {
                super.destroy();
            }
        },
    }
    class PageManager {
        constructor(page) {
            if (!page || typeof page !== 'object') {
                throw new Error('Invalid page configuration');
            }

            // Store registered component names to prevent duplicate registration
            this.registeredComponents = new Set();

            this.sections = Object.entries(page).map(([name, Component]) => {
                if (typeof Component !== 'function') {
                    throw new Error(`Section "${name}" must be a class constructor`);
                }

                // Only register the custom element if not already registered
                if (!this.registeredComponents.has(name)) {
                    try {
                        customElements.define(name, Component);
                        this.registeredComponents.add(name);
                    } catch (error) {
                        // Handle case where element is already defined
                        console.warn(`Custom element "${name}" is already registered`);
                    }
                }

                return new Component();
            });
        }

        // Method to cleanup sections if needed
        destroy() {
            this.sections.forEach(section => {
                if (typeof section.destroy === 'function') {
                    section.destroy();
                }
            });
        }
    }
    const pageName = $('.main-inner').attr('data-namespace');
    const pageConfig = {
        home: HomePage,
        about: AboutPage,
        team: TeamPage,
        loan: LoanPage,
        veteran: VeteranPage,
        calculators: CalculatorPage,
        tool: ToolPage,
        hub: HubPage,
        articles: ArticlePage,
        post: PostPage,
        legal: LegalPage
    };
    const registry = {};
    registry[pageName]?.destroy();
    scrollTop(() => pageConfig[pageName] && (registry[pageName] = new PageManager(pageConfig[pageName])));
    documentHeightObserver("init");
    refreshOnBreakpoint();
}
window.onload = script
