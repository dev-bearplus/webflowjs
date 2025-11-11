const script = () => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({
        invalidateOnRefresh: true
    });

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
				this.lenis.scrollTo("top", {
					duration: 0.0001,
					immediate: true,
					lock: true,
					...options,
				});
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
                    console.log("run")
                    $(e.currentTarget).addClass('active').siblings().removeClass('active');
                    $(this.el).find(`.home-state-btn-item[data-slug="${slug}"]`).addClass('active').siblings().removeClass('active');
                    $('.location-dot').removeClass('active');
                });
                $('.location-dot').on('click', (e) => {
                    e.preventDefault();
                    console.log("click")
                    // const slug = $(e.currentTarget).attr('id');
                    $(e.currentTarget).closest('.location-area').addClass('active').siblings().removeClass('active');
                    $(e.currentTarget).addClass('active').closest('.location-area').siblings().find('.location-dot').removeClass('active');
                    // $(this.el).find(`.home-state-btn-item[data-slug="${slug}"]`).addClass('active').siblings().removeClass('active');
                });
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
    pageConfig[pageName] && (registry[pageName] = new PageManager(pageConfig[pageName]));
    refreshOnBreakpoint();
}
window.onload = script
