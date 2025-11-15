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

    const HomePage = {
        'home-hero-wrap': class extends HTMLElement {
            constructor() {
                super();
                this.el = this;
                this.tlTrigger = null;
            }
            connectedCallback() {
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: this,
                        start: 'top bottom+=50%',
                        end: 'bottom top-=50%',
                        once: true,
                        onEnter: () => {
                            this.onTrigger();
                        }
                    }
                });
            }
            onTrigger() {

                this.animationReveal();
                this.interact();
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
                        scrub: true,
                        onToggle: (self) => {
                            if (self.isActive) {
                                $('.header').addClass('on-hide');
                            }
                            else {
                                if (self.progress === 1) {
                                    $('.header').removeClass('on-hide');
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
                    .fromTo('.home-hero-front-main-img', { y: 0, transformOrigin: 'center top' }, { y: -middleOffsetTop, ease: 'none', duration: 1 }, "<=0")
                    .fromTo('.home-hero-front-cta', { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: 10, duration: .6, ease: 'none' }, 0)
                    .to('.home-hero-front-sub-img.left', { xPercent: -20, yPercent: -20, autoAlpha: 0, duration: .6, ease: 'none' }, 0)
                    .to('.home-hero-front-sub-img.right', { xPercent: 20, yPercent: -20, autoAlpha: 0, duration: .6, ease: 'none' }, 0)
                    .to('.home-hero-front-title-flex:nth-child(3) .heading:nth-child(1)', { x: cvUnit(-250, 'rem'), y: -cvUnit(15, 'rem'), scale: .9, autoAlpha: 0, duration: .6, ease: 'power2.inOut' }, "<=.1")
                    .to('.home-hero-front-title-flex:nth-child(3) .heading:nth-child(2)', { x: cvUnit(285, 'rem'), y: -cvUnit(15, 'rem'), scale: .9, autoAlpha: 0, duration: .6, ease: 'power2.inOut' }, '<=0')
                    .to('.home-hero-front-title-flex:nth-child(2) .heading:nth-child(1)', { x: cvUnit(-340, 'rem'), y: -cvUnit(15, 'rem'), scale: .9, autoAlpha: 0, duration: .6, ease: 'power2.inOut' }, "<=.3")
                    .to('.home-hero-front-title-flex:nth-child(2) .heading:nth-child(2)', { x: cvUnit(250, 'rem'), y: -cvUnit(15, 'rem'), scale: .9, autoAlpha: 0, duration: .6, ease: 'power2.inOut' }, '<=0')
                    .to('.home-hero-front-title .heading:nth-child(1)', { y: -cvUnit(15, 'rem'), scale: .9, autoAlpha: 0, duration: .6, ease: 'power2.inOut' }, '<=0.1')
                    .fromTo('.home-hero-front-main-img',
                        { scale: 1, y: -middleOffsetTop, width: originalWidth, transformOrigin: `center bottom` },
                        { scale: scaleOffSet, y: offsetBottom, width: originalWidth * scaleOffSet, duration: 1,  ease: 'power1.inOut'
                    }, "-=.1")
                    .to('.home-hero-front-main-img-inner', { marginLeft: 0, duration: .7, ease: 'power1.inOut'  }, "<=0")
                    .to('.home-hero-front-main-img-bg', { borderRadius: 0, borderWidth: 0, duration: .8,  ease: 'power1.inOut' }, "<=0")
                    .to('.home-hero-front', { autoAlpha: 0, duration: .8,  ease: 'power1.inOut'  }, "-=.25")
                    .to('.home-hero-text-wrap', { y: 0, duration: 1, ease: 'power1.inOut' }, "<=0.1")
            }
            interact() {
            }
            destroy() {
                this.tlTrigger.kill();
            }
        },
        'home-state-wrap': class extends HTMLElement {
            constructor() {
                super();
                this.el = this;
                this.tlTrigger = null;
            }
            connectedCallback() {
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: this,
                        start: 'top bottom+=50%',
                        end: 'bottom top-=50%',
                        once: true,
                        onEnter: () => {
                            this.onTrigger();
                        }
                    }
                });
            }
            onTrigger() {
                this.animationScrub();
                this.animationReveal();
                this.interact();
            }
            animationReveal() {
            }
            animationScrub() {
            }
            interact() {
                const updateLocationPopup = (slug) => {
                    const updatePosition = () => {
                        let rectWrap = $(this.el).find(`.home-state-map`).get(0).getBoundingClientRect();
                        let dotRect = $(this.el).find(`.location-area[id="${slug}"] .location-dot`).get(0).getBoundingClientRect();
                        let popupRect = $(this.el).find(`.location-infor`).get(0).getBoundingClientRect();
                        let x = ((dotRect.left - rectWrap.left + dotRect.width) / rectWrap.width) * 100;
                        let y = ((dotRect.top - rectWrap.top - popupRect.height) / rectWrap.height) * 100;
                        gsap.set($(this.el).find(`.location-infor`), {
                            left: `${x}%`,
                            top: `${y}%`
                        });
                    }
                    if ($(this.el).find(`.location-infor`).hasClass('active')) {
                        $(this.el).find(`.location-infor`).removeClass('active');
                        setTimeout(() => {
                            $(this.el).find(`.location-infor [data-popup-state="name"]`).text($(this.el).find(`.home-state-btn-item[data-slug="${slug}"] [data-popup-state="name"]`).text());
                            $(this.el).find(`.location-infor [data-popup-state="address"]`).text($(this.el).find(`.home-state-btn-item[data-slug="${slug}"] [data-popup-state="address"]`).text());
                            $(this.el).find(`.location-infor [data-popup-state="image"]`).attr('src', $(this.el).find(`.home-state-btn-item[data-slug="${slug}"] [data-popup-state="image"]`).attr('src'));
                            $(this.el).find(`.location-infor`).addClass('active');
                            updatePosition();
                        }, 400);
                    }
                    else {
                        $(this.el).find(`.location-infor`).addClass('active');
                        $(this.el).find(`.location-infor [data-popup-state="name"]`).text($(this.el).find(`.home-state-btn-item[data-slug="${slug}"] [data-popup-state="name"]`).text());
                        $(this.el).find(`.location-infor [data-popup-state="address"]`).text($(this.el).find(`.home-state-btn-item[data-slug="${slug}"] [data-popup-state="address"]`).text());
                        $(this.el).find(`.location-infor [data-popup-state="image"]`).attr('src', $(this.el).find(`.home-state-btn-item[data-slug="${slug}"] [data-popup-state="image"]`).attr('src'));
                        updatePosition();
                    }
                }
                $('.home-state-btn-item').on('click', (e) => {
                    e.preventDefault();
                    const slug = $(e.currentTarget).attr('data-slug');
                    $(e.target).addClass('active').siblings().removeClass('active');
                    $(this.el).find(`.location-area#${slug}`).addClass('active').siblings().removeClass('active');
                    $('.location-dot').removeClass('active');
                });
                $('.location-area').on('click', (e) => {
                    e.preventDefault();
                    const slug = $(e.currentTarget).attr('id');
                    if ($(e.target).closest('.location-dot').length > 0) {
                        return;
                    }
                    $(e.currentTarget).addClass('active').siblings().removeClass('active');
                    $(this.el).find(`.home-state-btn-item[data-slug="${slug}"]`).addClass('active').siblings().removeClass('active');
                    $('.location-dot').removeClass('active');
                });
                // $('.location-dot').on('click', (e) => {
                //     e.preventDefault();
                //     $(e.currentTarget).closest('.location-area').addClass('active').siblings().removeClass('active');
                //     $(e.currentTarget).addClass('active').closest('.location-area').siblings().find('.location-dot').removeClass('active');
                //     updateLocationPopup($(e.currentTarget).closest('.location-area').attr('id'));
                // });
                // $(window).on('click', (e) => {
                //     if (!e.target.closest('.location-dot')) {
                //         $(this.el).find(`.location-infor`).removeClass('active');
                //     }
                // })
            }
            destroy() {
                this.tlTrigger.kill();
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
        home: HomePage
    };
    const registry = {};
    registry[pageName]?.destroy();
    scrollTop(() => pageConfig[pageName] && (registry[pageName] = new PageManager(pageConfig[pageName])));
    refreshOnBreakpoint();
}
window.onload = script
