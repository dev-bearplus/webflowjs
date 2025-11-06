const mainScript = () => {
	gsap.registerPlugin(ScrollTrigger);
	ScrollTrigger.defaults({
		invalidateOnRefresh: true,
		scroller: ".main-inner",
	});
	const xSetter = (el) => gsap.quickSetter(el, "x", "px");
	const ySetter = (el) => gsap.quickSetter(el, "y", "px");
	const xGetter = (el) => gsap.getProperty(el, "x");
	const yGetter = (el) => gsap.getProperty(el, "y");

	const viewport = {
		get w() {
			return window.innerWidth;
		},
		get h() {
			return window.innerHeight;
		},
	};
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
	const isInViewport = (el, orientation = "vertical") => {
		if (!el) return;
		const rect = el.getBoundingClientRect();
		if (orientation == "horizontal") {
			return rect.left <= window.innerWidth && rect.right >= 0;
		} else {
			return rect.top <= window.innerHeight && rect.bottom >= 0;
		}
	};

	const isMouseInArea = (el, mousePos) => {
		if (!el) return false;
		const rect = el.getBoundingClientRect();
		return (
			mousePos.x >= rect.left &&
			mousePos.x <= rect.right &&
			mousePos.y >= rect.top &&
			mousePos.y <= rect.bottom
		);
	};
	const debounce = (func, timeout = 300) => {
		let timer;

		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				func.apply(this, args);
			}, timeout);
		};
	};
	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	const lerp = (a, b, t) => (1 - t) * a + t * b;
	const distance = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);
	const normalize = (mousePos, maxDis) => (mousePos / maxDis - 0.5) * 2;
	const getAllScrollTrigger = (fn) => {
		let triggers = ScrollTrigger.getAll();
		triggers.forEach((trigger) => {
			if (fn === "refresh") {
				if (trigger.progress === 0) {
					trigger[fn]?.();
				}
			} else {
				trigger[fn]?.();
			}
		});
	};
	const checkSameNamespace = (namespace, current, next) => {
        let result = (current === next) && (current === namespace) && (next === namespace);
        return result;
    }
	function documentHeightObserver(action, data, callback) {
		let resizeObserver;
		let debounceTimer;
		let observerEl = data?.next.container.querySelector(".main-content");
		let previousHeight = observerEl?.scrollHeight;

		function onRefresh() {
			clearTimeout(debounceTimer);
			debounceTimer = setTimeout(() => {
				const currentHeight = observerEl.scrollHeight;

				if (currentHeight !== previousHeight) {
					if (smoothScroll.lenis) {
						smoothScroll.lenis.resize();
						getAllScrollTrigger("refresh");
					}
					if (callback) {
						callback();
					}
					previousHeight = currentHeight;
				}
			}, 200);
		}

		if (action === "init") {
			if (!observerEl) return;
			resizeObserver = new ResizeObserver(onRefresh);
			resizeObserver.observe(observerEl);
		} else if (action === "disconnect") {
			if (resizeObserver) {
				resizeObserver.disconnect();
			}
		}
	}
	function resetScroll(data) {
		if (window.location.hash !== "") {
			if ($(window.location.hash).length >= 1) {
				$("html").animate({ scrollTop: $(window.location.hash).offset().top - 100 }, 1200);

				setTimeout(() => {
					$("html").animate({ scrollTop: $(window.location.hash).offset().top - 100 }, 1200);
				}, 300);
			} else {
				scrollTop();
			}
		} else if (window.location.search !== "") {
			let searchObj = JSON.parse(
				'{"' +
					decodeURI(location.search.substring(1))
						.replace(/"/g, '\\"')
						.replace(/&/g, '","')
						.replace(/=/g, '":"') +
					'"}'
			);
			if (searchObj.sc) {
				if ($(`#${searchObj.sc}`).length >= 1) {
					let target = `#${searchObj.sc}`;
					setTimeout(() => {
						smoothScroll.scrollTo(`#${searchObj.sc}`, {
							offset: -100,
						});
					}, 500);
					barba.history.add(
						`${window.location.pathname + target}`,
						"barba",
						"replace"
					);
				} else {
					scrollTop();
				}
			}
		} else {
			scrollTop();
		}

		if (data.next.namespace === 'notes') {
			const currentScroll = smoothScroll.scroller.scrollX;
			const targetScroll = $(`#${$(data.next.container).attr('data-slug')}`).offset()?.top || 0;
			const scrollHeight = smoothScroll.lenis.limit;
			smoothScroll.lenis.scrollTo(currentScroll, { duration: 0.001 });
			const distanceDown = (scrollHeight - currentScroll) + targetScroll;
			const distanceUp = currentScroll - targetScroll;
			if (targetScroll <= 0) return;
			if (distanceDown < distanceUp) {
				requestAnimationFrame(() => {
					smoothScroll.lenis.scrollTo(scrollHeight + targetScroll - cvUnit(60, 'rem'));
				});
			} else {
				requestAnimationFrame(() => {
					smoothScroll.lenis.scrollTo(targetScroll - cvUnit(60, 'rem'));
				});
			}
		}
	}
	function scrollTop(onComplete) {
		if ("scrollRestoration" in history) {
			history.scrollRestoration = "manual";
		}
		window.scrollTo(0, 0);
		smoothScroll.scrollToTop({
			onComplete: () => {
				onComplete?.();
				getAllScrollTrigger("refresh");
			},
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

		init(data) {
			this.reInit(data);

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

		reInit(data) {
			if (this.lenis) {
				this.lenis.destroy();
			}
			this.lenis = new Lenis({
				content: data.next.container,
				wrapper: data.next.container,
				smoothTouch: false,
				infinite: true
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
	const reinitializeWebflow = (data) => {
		if (!window.Webflow) return;

		try {
			window.Webflow.destroy();
			window.Webflow.ready();
			const ix2 = window.Webflow.require("ix2");
			if (ix2 && typeof ix2.init === "function") {
				ix2.init();
			}
			const forms = window.Webflow.require("forms");
			if (forms && typeof forms.ready === "function") {
				forms.ready();
			}
			["slider", "tabs", "dropdown", "navbar"].forEach((module) => {
				try {
					const mod = window.Webflow.require(module);
					if (mod && typeof mod.ready === "function") {
						mod.ready();
					}
				} catch (e) {}
			});
			if (window.Webflow.redraw) {
				window.Webflow.redraw.up();
			}

			if (data) {
				let parser = new DOMParser();
				let dom = parser.parseFromString(data.next.html, "text/html");
				let webflowPageId = $(dom).find("html").attr("data-wf-page");
				$("html").attr("data-wf-page", webflowPageId);
			}
		} catch (e) {
			console.warn("Webflow reinit failed:", e);
		}
    };
    class Loader {
        constructor() {
            this.isLoaded = sessionStorage.getItem('isLoaded') === 'true' ? true : false;
            this.tlLoadDone = null;
            this.tlLoadMaster = null;
        }
        init(data) {
			this.tlLoading = gsap.timeline({
				paused: true
			})
			this.tlLoadMaster = gsap.timeline({
				paused: true,
				delay: this.isLoaded ? 0 : 1,
				duration:1,
				onStart: () => {
						this.onceSetup(data);
				},
				onComplete: () => {
						this.oncePlay(data);
				}
			})
			this.tlLoadMaster
				.to(this.tlLoading, { duration: this.tlLoading.totalDuration(), progress: 1, ease: 'none' })
        }
        play(data) {
            // requestAnimationFrame(() => {
            //     this.devMode(data);
            // })
            // return;
            this.tlLoadMaster.play();
        }
        devMode(data) {
            this.onceSetup(data);
            this.oncePlay(data);
            $('.loader').remove();
        }
        onceSetup(data) {
            globalHooks.triggerOnceSetup(data);
        }
        oncePlay(data) {
            globalHooks.triggerOncePlay(data);
            $('.loader').css('pointer-events', 'none');
            sessionStorage.setItem('isLoaded', true);
            if (viewport.w > 767) {
                $('.body').css({
                    'overflow': 'initial',
                    'position': 'relative',
                    'max-height': 'none',
                    'inset': 'auto'
                })
            }
        }
    }
    const loader = new Loader();

	class Mouse {
		constructor() {
			this.mousePos = { x: 0, y: 0 };
			this.cacheMousePos = { ...this.mousePos };
			this.lastMousePos = { ...this.mousePos };
			this.normalizeMousePos = {
				current: { x: 0.5, y: 0.5 },
				target: { x: 0.5, y: 0.5 },
			};
			this.cursorRaf = null;
			this.init();

			// Add mouse move event listener
			window.addEventListener("mousemove", (e) => {
				this.mousePos = this.getPointerPos(e);
			});
			window.addEventListener("touchmove", () => {
				this.mousePos = this.getPointerPos(e);
			});
		}

		init() {
			if (viewport.w > 991) {
				requestAnimationFrame(this.update.bind(this));
			}
		}

		update() {
			this.cacheMousePos.x = lerp(
				this.cacheMousePos.x,
				this.mousePos.x,
				0.1
			);
			this.cacheMousePos.y = lerp(
				this.cacheMousePos.y,
				this.mousePos.y,
				0.1
			);

			this.normalizeMousePos.target.x =
				this.mousePos.x / window.innerWidth;
			this.normalizeMousePos.target.y =
				this.mousePos.y / window.innerHeight;

			if (!this.cursorRaf) {
				this.cursorRaf = requestAnimationFrame(
					this.lerpCursorPos.bind(this)
				);
			}
			// this.toggleCursor();
			requestAnimationFrame(this.update.bind(this));
		}

		getPointerPos(ev) {
			if (ev.touches) {
				return {
					x: ev.touches[0].clientX,
					y: ev.touches[0].clientY,
				};
			}
			return {
				x: ev.clientX,
				y: ev.clientY,
			};
		}

		lerpCursorPos = () => {
			this.normalizeMousePos.current.x = lerp(
				this.normalizeMousePos.current.x,
				this.normalizeMousePos.target.x,
				0.1
			);
			this.normalizeMousePos.current.y = lerp(
				this.normalizeMousePos.current.y,
				this.normalizeMousePos.target.y,
				0.1
			);

			const delta = distance(
				this.normalizeMousePos.target.x,
				this.normalizeMousePos.current.x,
				this.normalizeMousePos.target.y,
				this.normalizeMousePos.current.y
			);

			if (delta < 0.001 && this.cursorRaf) {
				cancelAnimationFrame(this.cursorRaf);
				this.cursorRaf = null;
				this.resetCursor();
				return;
			} else {
				this.cursorRaf = requestAnimationFrame(
					this.lerpCursorPos.bind(this)
				);
				this.toggleCursor();
			}
		};

		reachedThreshold(threshold) {
			if (!threshold) return false;
			const dist = distance(
				this.mousePos.x,
				this.mousePos.y,
				this.lastMousePos.x,
				this.lastMousePos.y
			);
			if (dist > threshold) {
				this.lastMousePos = { ...this.mousePos };
				return true;
			}
			return false;
		}
		toggleCursor() {
			const hoverElements = $("[data-cursor]:hover");
			const cursor = $(".cursor-main");

			if (hoverElements.length) {
				xSetter(cursor)(
					this.normalizeMousePos.current.x * window.innerWidth
				);
				ySetter(cursor)(
					this.normalizeMousePos.current.y * window.innerHeight
				);

				// Get the last hovered element's cursor type (topmost element)
				const type = $(hoverElements[hoverElements.length - 1]).attr(
					"data-cursor"
				);
				switch (type) {
					case "drag":
						// Add drag cursor styling
						cursor.removeClass("hidden");
						$(".cursor-drag").addClass("active");
						break;
					case "hidden":
						cursor.addClass("hidden");
						break;
					default:
						// Reset cursor to default
						cursor.removeClass("hidden");
						$(".cursor-drag").removeClass("active");
						break;
				}
			} else {
				this.resetCursor();
			}
		}

		resetCursor() {
			// Reset cursor styles
			$(".cursor-drag").removeClass("active");
		}
	}
	// const mouse = new Mouse();

	class GlobalChange {
		constructor() {
			this.namespace = null;
		}
		init(data) {
			this.namespace = data.next.namespace;
			this.refreshOnBreakpoint();
			this.updateLink(data);
		}
		update(data) {
			this.updateLink(data);
		}
        updateLink(data) {
			$("a").each(function (index, link) {
				let href = $(this).attr("href").replace(/\/$/, "") || "/";

				if (
					$(this).attr("data-sub-link") &&
					!href.includes("#") &&
					!href.includes("?sc=")
				) {
					$(this).attr(
						"href",
						`${href}#${$(this).attr("data-sub-link")}`
					);
					$(this).attr("data-barba-history", "replace");
				}

				const [urlPath, anchor] = href.includes("#")
					? href.split("#")
					: href.includes("?sc=")
					? href.split("?sc=")
					: [href, ""];

				$(this).toggleClass(
					"w--current",
					href == `${window.location.pathname}${window.location.hash}`
				);
				$(this).attr(
					"aria-current",
					$(this).hasClass("w--current") ? "page" : ""
				);

				if (!anchor) {
					return;
				} else {
					if (
						urlPath === `${window.location.pathname}` ||
						urlPath === ""
					) {
						$(this).attr(
							"href",
							`${window.location.pathname}#${anchor}`
						);
					} else {
						$(this).attr("href", `${urlPath}?sc=${anchor}`);
					}
				}
			});
			$("a").on("click", function (e) {
				if ($(this).attr("data-sub-link")) {
					barba.history.add(
						`${
							window.location.pathname +
							`#${$(this).attr("data-sub-link")}`
						}`,
						"barba",
						"replace"
					);

					requestAnimationFrame(() => {
						setTimeout(
							() => {
								$(`#${$(this).attr("data-sub-link")}`).trigger(
									"click"
								);
							},
							$(this).hasClass("w--current") ? 0 : 1000
						);

						$("a").each(function (index, link) {
							$(link).toggleClass(
								"w--current",
								$(link).attr("href") ==
									`${window.location.pathname}${window.location.hash}`
							);
						});
					});
				}
			});
		}
		refreshOnBreakpoint() {
			const breakpoints = [479, 767, 991];
			const initialViewportWidth =
				viewport.w || document.documentElement.clientWidth;
			const breakpoint =
				breakpoints.find((bp) => initialViewportWidth < bp) ||
				breakpoints[breakpoints.length - 1];
			window.addEventListener(
				"resize",
				debounce(function () {
					const newViewportWidth =
						viewport.w || document.documentElement.clientWidth;
					if (
						(initialViewportWidth < breakpoint &&
							newViewportWidth >= breakpoint) ||
						(initialViewportWidth >= breakpoint &&
							newViewportWidth < breakpoint)
					) {
						location.reload();
					}
				})
			);
		}
	}
	const globalChange = new GlobalChange();

	class GlobalHooks {
		constructor() {}
		triggerEvent(eventName, data) {
			const event = new CustomEvent(eventName, { detail: data });
			data.next.container.dispatchEvent(event);
		}
		triggerOnceSetup(data) {
			console.log("Global Hooks: onceSetup");
			this.triggerEvent("onceSetup", data);
		}
		triggerOncePlay(data) {
			console.log("Global Hooks: oncePlay");
			this.triggerEvent("oncePlay", data);
			requestAnimationFrame(
				() => window.scrollY === 0 && window.scrollTo(0, 1)
			);
		}
		triggerEnterSetup(data) {
			console.log("Global Hooks: enterSetup");
			this.triggerEvent("enterSetup", data);
			requestAnimationFrame(
				() => window.scrollY === 0 && window.scrollTo(0, 1)
			);
		}
		triggerEnterPlay(data) {
			console.log("Global Hooks: enterPlay");
			this.triggerEvent("enterPlay", data);
		}
	}
	const globalHooks = new GlobalHooks();

	class PageTrans {
		constructor() {
			this.tlLeave = null;
			this.tlEnter = null;
			this.el = document.querySelector(".trans");
		}
		leaveAnim(data) {
			this.tlLeave = gsap.timeline({
				onStart: () => {
                    this.updateBeforeTrans.bind(this)(data);
					nav.leaveSetup(data);
				},
				onComplete: () => {
					this.updateAfterTrans.bind(this)(data);
				},
			});
			this.tlLeave.fromTo(data.current.container,
				{ opacity: 1 },
				{ duration: 0.6, opacity: checkSameNamespace('notes', data.current.namespace, data.next.namespace) ? 1 : 0 }
			);

			return this.tlLeave;
		}
		enterAnim(data) {
			this.tlEnter = gsap.timeline({
				onStart: () => {
                    this.enterSetup(data);
					setTimeout(() => {
						this.enterPlay(data);
						nav.enterSetup(data);
					}, 100);
				},
			});

			this.tlEnter.fromTo(data.next.container,
				{ opacity: checkSameNamespace('notes', data.current.namespace, data.next.namespace) ? 1 : 0 },
				{ duration: 0.6, opacity: 1, clearProps: "all" },
				0
			);
			return this.tlEnter;
		}
		async play(data) {
			await pageTrans.leaveAnim(data).then(() => {
				pageTrans.enterAnim(data);
			});
		}
		enterSetup(data) {
			globalHooks.triggerEnterSetup(data);
		}
		enterPlay(data) {
			globalHooks.triggerEnterPlay(data);
		}
		updateBeforeTrans(data) {
			gsap.set(data.next.container, {
				opacity: 0,
				"pointer-events": "none",
				zIndex: 1,
			});
			smoothScroll.stop();
			smoothScroll.destroy();
			getAllScrollTrigger("kill");
			documentHeightObserver("disconnect");
			if (data.current.container) {
				$(data.current.container).css("z-index", 2);
			}
		}
		updateAfterTrans(data) {
			smoothScroll.reInit(data);
			// scrollTop();
			smoothScroll.start();
			globalChange.update(data);

			documentHeightObserver("init", data);
			reinitializeWebflow(data);
			if (data.current.container) {
				data.current.container.remove();
			}

			$(data.next.container).find('.note-content-hero-title').attr('id', $(data.next.container).find('.note-content-item').eq(0).find('.note-content-item-inner').attr('id'));
			$(data.next.container).find('.note-content-item').eq(0).find('.note-content-item-inner').removeAttr('id');
			resetScroll(data);
		}
	}
	const pageTrans = new PageTrans();

	class TriggerSetup {
		constructor() {
		}
        setTrigger(triggerEl, onTrigger) {
            onTrigger();
		}
		cleanTrigger() {
		}
    }
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
            if (data.next.namespace === "home") {
                $(this.el).removeClass('active');
            } else if (data.next.namespace === "notes") {
				$(this.el).addClass('active');
			}
		}
		leaveSetup(data) {
			this.update(data);
			$(this.el).find('.nav-body-blog-main').css('pointer-events', 'none');
			if (data.next.namespace === 'notes') {
				gsap.to($(this.el).find('.nav-body-blog-active-inner'), {
					autoAlpha: checkSameNamespace('notes', data.current.namespace, data.next.namespace) ? 1 : 0,
					duration: 0.2,
					ease: "power2.out",
				});
			}
		}
		enterSetup(data) {
			$(this.el).find('.nav-body-blog-main').css('pointer-events', 'auto');
			if (data.next.namespace === 'notes') {
				let slug = $(data.next.container).attr('data-slug');
				if (checkSameNamespace('notes', data.current.namespace, data.next.namespace)) {
					gsap.to($(this.el).find('.nav-body-blog-active-inner'), {
						y: $(this.el).find(`.nav-body-blog-item[data-slug="${slug}"]`).offset().top - $(this.el).find('.nav-body-blog-main').offset().top + $(this.el).find(`.nav-body-blog-item[data-slug="${slug}"]`).outerHeight() / 2,
						autoAlpha: 1,
						duration: 0.6,
						ease: "power2.out",
					});
				} else {
					gsap.set($(this.el).find('.nav-body-blog-active-inner'), {
						y: $(this.el).find(`.nav-body-blog-item[data-slug="${slug}"]`).offset().top - $(this.el).find('.nav-body-blog-main').offset().top + $(this.el).find(`.nav-body-blog-item[data-slug="${slug}"]`).outerHeight() / 2
					});
					gsap.to($(this.el).find('.nav-body-blog-active-inner'), {
						autoAlpha: 1,
						delay: .1,
						duration: 0.2,
						ease: "power2.out",
					});
				}
			}
			else {
				gsap.to($(this.el).find('.nav-body-blog-active-inner'), {
					y: 0,
					autoAlpha: 0.2,
					duration: 0.6,
					ease: "power2.out",
				});
			}
		}
		interact() {
			$('.nav-body-blog-item').on('mouseenter', (e) => {
				if (!$('.nav').hasClass('active')) {
					console.log("zo")
					gsap.to($(this.el).find('.nav-body-blog-active-inner'), {
						y: $(e.currentTarget).offset().top - $(this.el).find('.nav-body-blog-main').offset().top + $(e.currentTarget).outerHeight() / 2,
						autoAlpha: 1,
						duration: 0.5,
						ease: "power2.out",
					})
				}
			});
			$('.nav-body-blog-list').on('mouseleave', (e) => {
				if (!$('.nav').hasClass('active')) {
					gsap.to($(this.el).find('.nav-body-blog-active-inner'), {
						y: 0,
						autoAlpha: 0.2,
						duration: 0.5,
						ease: "power2.out",
					})
				}
			});
		}
    }
    const nav = new Nav();

	const HomePage = {
	};
    const NotesPage = {
		Content: class extends TriggerSetup {
			constructor() {
				super();
				this.el = null;
			}
			trigger(data) {
				this.el = data.next.container.querySelector('.note-content-wrap');
				super.setTrigger(this.el, this.onTrigger.bind(this));
			}
			onTrigger() {
				this.setup();
				this.interact();
			}
			setup() {
				$(this.el).find('.note-content-hero-title').attr('id', $(this.el).find('.note-content-item').eq(0).find('.note-content-item-inner').attr('id'));
				$(this.el).find('.note-content-item').eq(0).find('.note-content-item-inner').removeAttr('id');
			}
			interact() {
				$('.note-content-item-link').on('click', function (e) {
					let originText = $(this).find('.txt').text();
					e.preventDefault();
					let slug = $(this).attr('data-slug');
					let textArea = document.createElement('textarea');
					let text = `${window.location.origin}/notes/${slug}`;
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
				$('.note-content-hero-link').eq(1).on('click', function (e) {
					let originText = $(this).find('.txt').text();
					e.preventDefault();
					console.log("click")
					let textArea = document.createElement('textarea');
					let text = `${window.location.origin}/notes`;
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
				this.scrollActive();
			}
			scrollActive() {
				smoothScroll.lenis.on('scroll', (e) => {
					let currScroll = e.scroll;
					$(this.el).find('.note-content-item').each(function (index, section) {
						let top = $(this).get(0).getBoundingClientRect().top;
						let slug = $(this).attr('data-slug');
						if (top > 0 && top < (viewport.h / 2)) {
							$(nav.el).find(`.nav-body-blog-item-link[href="/notes/${slug}"]`).addClass('w--current');
							$(nav.el).find('.nav-body-blog-item-link').not(`[href="/notes/${slug}"]`).removeClass('w--current');
							gsap.to($(nav.el).find('.nav-body-blog-active-inner'), {
								y: $(nav.el).find(`.nav-body-blog-item[data-slug="${slug}"]`).offset().top - $(nav.el).find('.nav-body-blog-main').offset().top + $(nav.el).find(`.nav-body-blog-item[data-slug="${slug}"]`).outerHeight() / 2,
								autoAlpha: 1,
								duration: 0.6,
								ease: "power2.out",
							});
							barba.history.add(`/notes/${slug}`, 'barba', 'replace');
						}
					});
				});
			}
        },
	};

	class PageManager {
		constructor(page) {
			this.sections = Object.values(page).map((section) => new section());
			// Bind event handlers
			this.boundSetupHandler = this.setupHandler.bind(this);
			this.boundOncePlayHandler = this.oncePlayHandler.bind(this);
			this.boundEnterPlayHandler = this.enterPlayHandler.bind(this);
		}

		initOnce(data) {
            const container = data.next.container;
			container.addEventListener("onceSetup", (event) => {
				this.boundSetupHandler({ detail: event.detail, mode: "once" });
			});
			container.addEventListener("oncePlay", this.boundOncePlayHandler);
		}

		initEnter(data) {
			const container = data.next.container;
			container.addEventListener("enterSetup", (event) => {
				this.boundSetupHandler({ detail: event.detail, mode: "enter" });
			});
			container.addEventListener("enterPlay", this.boundEnterPlayHandler);
		}

		oncePlayHandler(event) {
			this.sections.forEach((section) => {
				if (section.playOnce) {
					section.playOnce(event.detail);
				}
			});
		}

		enterPlayHandler(event) {
			this.sections.forEach((section) => {
				if (section.playEnter) {
					section.playEnter(event.detail);
				}
			});
		}

		setupHandler(event) {
			const data = event.detail;
            const mode = event.mode;
			this.sections.forEach((section) => {
				if (section.trigger) {
					section.trigger(data);
				}
				if (section.setup) {
					section.setup(data, mode);
				}
			});
		}

		destroy(data) {
			const container = data.next.container;
			container.removeEventListener("onceSetup", this.boundSetupHandler);
			container.removeEventListener(
				"oncePlay",
				this.boundOncePlayHandler
			);
			container.removeEventListener("enterSetup", this.boundSetupHandler);
			container.removeEventListener(
				"enterPlay",
				this.boundEnterPlayHandler
			);

			this.sections.forEach((section) => {
				if (section.destroy) {
					section.destroy();
				}
				if (section.cleanTrigger) {
					section.cleanTrigger();
				}
			});
		}
	}
	class HomePageManager extends PageManager {
		constructor(page) {
			super(page);
		}
    }
    class NotesPageManager extends PageManager {
        constructor(page) {
            super(page);
        }
    }
	const PageManagerRegistry = {
		home: new HomePageManager(HomePage),
		notes: new NotesPageManager(NotesPage)
	};

	const SCRIPT = {
		home: {
			namespace: "home",
			afterEnter(data) { PageManagerRegistry.home.initEnter(data); },
			beforeLeave(data) { PageManagerRegistry.home.destroy(data); }
		},
		notes: {
			namespace: "notes",
			afterEnter(data) { PageManagerRegistry.notes.initEnter(data); },
			beforeLeave(data) { PageManagerRegistry.notes.destroy(data); }
		}
	};

	let namespace = $(".main-inner").attr("data-barba-namespace");
	const VIEWS = Object.values(SCRIPT);

	barba.use(barbaPrefetch);
	barba.init({
		preventRunning: true,
		timeout: 5000,
		views: VIEWS,
		transitions: [
			{
				name: "default-transition",
				sync: true,

                beforeOnce(data) {
					smoothScroll.init(data);
					globalChange.init(data);
					documentHeightObserver("init", data);
				},
                once(data) {
                    loader.init(data);
                    loader.play(data);
                    nav.init(data);
					nav.update(data);
                    PageManagerRegistry[namespace]?.initOnce?.(data)
					requestAnimationFrame(() => {
						resetScroll(data);
					});
				},
				async leave(data) {
					await pageTrans.play(data);
				},
			},
		],
	});
};

window.onload = mainScript;
