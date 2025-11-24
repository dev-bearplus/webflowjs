const mainScript = () => {
    const pageName = $('.main-inner').attr('data-barba-namespace');

    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.defaults({
        invalidateOnRefresh: true,
        scroller: '.main-inner',
    });
    const viewport = {
		get w() {
			return window.innerWidth;
		},
		get h() {
			return window.innerHeight;
		},
	}
    const cvUnit = (val, unit) => {
		let result;
		switch (true) {
			case unit === "vw":
				result = window.innerWidth * (val / 100);
				break;
			case unit === "vh":
				result = window.innerHeight * (val / 100);
				break;
			case unit === "rem":
				result = (val / 10) * parseFloat($("html").css("font-size"));
				break;
			default:
				break;
		}
		return result;
	};
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
			this.lenis = new Lenis({
				content: document.querySelector('.main-inner'),
				wrapper: document.querySelector('.main-inner')
			});
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

    class Nav {
        constructor() {
            this.el = null;
            this.isOpen = false;
        }
        init(data) {
			this.el = document.querySelector('.nav');
			this.interact();
        }
		update(data) {
			console.log("run")
            if (data.next.namespace === "home") {
                $(this.el).removeClass('active');
            } else if (data.next.namespace === "notes") {
				$(this.el).addClass('active');
			}
		}
		interact() {
			$(this.el).find('.nav-bot-archived-btn, .nav-archived-btn').on('click', function () {
				$(this).toggleClass('active');
				$('.nav-archived-blog-main').slideToggle();
			});
		}
    }
	const nav = new Nav();
	nav.init();

    const NotePage = {
        'note-content-wrap': class extends HTMLElement {
            constructor() {
                super();
                this.el = this;
            }
            connectedCallback() {
                this.onTrigger();
            }
            onTrigger() {
				this.interact();
			}
			interact() {
				$(this.el).find('.note-content-hero-link[data-slug]').on('click', function (e) {
					let originText = $(this).find('.txt').text();
					e.preventDefault();
					let textArea = document.createElement('textarea');
					let text = `${window.location.origin}/notes/${$(this).attr('data-slug')}`;
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
					$(this).find('.txt').text('Copied');
					setTimeout(() => {
						$(this).find('.txt').text(originText);
					}, 1000);
					document.body.removeChild(textArea);
                });
                $(this.el).find('.note-header-list-toggle').on('click', () => {
					$(this.el).find('.note-header').toggleClass('active');
                });

                smoothScroll.lenis.on('scroll', (e) => {
                    if (viewport.w <= 767) {
                        gsap.set($(this.el).find('.note-header-cms-item-link.w--current').siblings('.line').find('.line-inner'), { scaleX: e.progress })
                    }
                    else {
                        gsap.set($(this.el).find('.note-content-links-totop'), { '--progress': e.progress })
                    }
                });
                $(this.el).find('.note-content-links-totop').on('click', () => {
                    smoothScroll.scrollTo('top', { lock: true });
				});

				$(this.el).find('.note-header-cms-archived-title').on('click', function () {
					$(this).toggleClass('active');
					$('.note-header-cms-archived-content').slideToggle();
				});
				$(window).on('click', () =>{
					if (!$('.note-header:hover').length)
						$(this.el).find('.note-header').removeClass('active');
				});
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

    const pageConfig = {
        notes: NotePage
    };
    const registry = {};
    registry[pageName]?.destroy();
    pageConfig[pageName] && (registry[pageName] = new PageManager(pageConfig[pageName]));
    refreshOnBreakpoint();
}
window.onload = mainScript