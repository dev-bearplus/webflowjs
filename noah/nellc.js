const script = () => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({
        invalidateOnRefresh: true
    });
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
            const counter = new countUp.CountUp(this.el, counterTo, {
                duration: 1,
                decimalPlaces,
                decimal,
                suffix,
                enableScrollSpy: true,
                ...this.options
            });
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
			this.lenis = new Lenis();
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
            if (viewport.w <= 991) {
                this.toggleNav();
            }
        }
        updateOnScroll(inst) {
            this.toggleHide(inst);
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
        toggleNav() {
            $(this.el).find('.header-toggle').on('click', this.handleClick.bind(this));
            $(this.el).find('.header-link, .header-logo, .header-btn').on('click', () => setTimeout(() => this.close(), 800));
        }
        handleClick(e) {
            e.preventDefault();
            this.isOpen ? this.close() : this.open();
        }
        open() {
            if (this.isOpen) return;
            $(this.el).addClass('on-open-nav');
            $(this.el).find('.header-toggle').addClass('active');
            this.isOpen = true;
            smoothScroll.lenis.stop();
        }
        close() {
            if (!this.isOpen) return;
            $(this.el).removeClass('on-open-nav');
            $(this.el).find('.header-toggle').removeClass('active');
            this.isOpen = false;
            smoothScroll.lenis.start();
        }
    }
    const header = new Header();
    header.init();

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
                    .fromTo('.home-hero-front-cta', { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: 10, duration: .6, ease: 'none' }, "<=0")
                    .to('.home-hero-front-title-flex:nth-child(3) .heading:nth-child(1)', { x: cvUnit(-250, 'rem'), y: -cvUnit(15, 'rem'), scale: .9, autoAlpha: 0, duration: .6, ease: 'power2.inOut' }, "<=.1")
                    .to('.home-hero-front-title-flex:nth-child(3) .heading:nth-child(2)', { x: cvUnit(285, 'rem'), y: -cvUnit(15, 'rem'), scale: .9, autoAlpha: 0, duration: .6, ease: 'power2.inOut' }, '<=0')
                    .to('.home-hero-front-title-flex:nth-child(2) .heading:nth-child(1)', { x: cvUnit(-340, 'rem'), y: -cvUnit(15, 'rem'), scale: .9, autoAlpha: 0, duration: .6, ease: 'power2.inOut' }, "<=.3")
                    .to('.home-hero-front-title-flex:nth-child(2) .heading:nth-child(2)', { x: cvUnit(250, 'rem'), y: -cvUnit(15, 'rem'), scale: .9, autoAlpha: 0, duration: .6, ease: 'power2.inOut' }, '<=0')
                    .to('.home-hero-front-title .heading:nth-child(1)', { y: -cvUnit(15, 'rem'), scale: .9, autoAlpha: 0, duration: .6, ease: 'power2.inOut' }, '<=0.1')
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
                $('.home-stats-item-val [data-counter]').each((index, item) => new CounterUp(item, { scrollSpyDelay: index * 0.2}));
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
                $('.location-dot').on('click', (e) => {
                    e.preventDefault();
                    $(e.currentTarget).closest('.location-area').addClass('active').siblings().removeClass('active');
                    $(e.currentTarget).addClass('active').closest('.location-area').siblings().find('.location-dot').removeClass('active');
                    updateLocationPopup($(e.currentTarget).closest('.location-area').attr('id'));
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
                $('.team-hero-cms').each((_, item) => new Marquee({ list: $(item), duration: 40, direction: 'ver' }).setup());
            }
            interact() {
            }
            destroy() {
                this.tlTrigger.kill();
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
        }
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
        loan: LoanPage
    };
    const registry = {};
    registry[pageName]?.destroy();
    scrollTop(() => pageConfig[pageName] && (registry[pageName] = new PageManager(pageConfig[pageName])));
    documentHeightObserver("init");
    refreshOnBreakpoint();
}
window.onload = script
