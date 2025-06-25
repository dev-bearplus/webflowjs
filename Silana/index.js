const script = () => {
    barba.use(barbaPrefetch);
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({
        invalidateOnRefresh: true,
    });
    const parseRem = (input) => {
        return input / 10 * parseFloat($('html').css('font-size'))
    }
    function validateEmail(email) {
        if (typeof email !== 'string') return false;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email.trim());
    }
    const debounce = (func, timeout = 300) => {
        let timer

        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(() => { func.apply(this, args) }, timeout)
        }
    }
    const lerp = (a, b, t) => (1 - t) * a + t * b;
    const distance = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);
    const isInViewport = (el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight) &&
            rect.bottom >= 0
        );
    }
    const getAllScrollTrigger = (fn) => {
        let triggers = ScrollTrigger.getAll();
        triggers.forEach(trigger => {
            trigger[fn]();
        });
    }
    function scrollTop(onComplete) {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
        smoothScroll.lenis.scrollTo("top", {
            duration: .0001, lock: true,
            onComplete: () => {
                onComplete?.();
                getAllScrollTrigger("refresh");
            }
        });
    }
    class Mouse {
        constructor() {
            this.mousePos = {x: 0, y: 0};
            this.cacheMousePos = {...this.mousePos};
            this.lastMousePos = {...this.mousePos};
            this.normalizeMousePos = {
                current: {x: 0.5, y: 0.5},
                target: {x: 0.5, y: 0.5}
            };
            this.cursorRaf = null;
            this.init();
        }
        init() {
            window.addEventListener('mousemove', this.updateOnMove);
            window.addEventListener('touchmove', this.updateOnMove);
        }
        updateOnMove = (ev) => {
            const pointerPos = this.getPointerPos(ev.touches ? ev.touches[0] : ev);
            this.mousePos = pointerPos;
            this.cacheMousePos.x = lerp(this.cacheMousePos.x, pointerPos.x, 0.1);
            this.cacheMousePos.y = lerp(this.cacheMousePos.y, pointerPos.y, 0.1);

            this.normalizeMousePos.target.x = pointerPos.x / window.innerWidth;
            this.normalizeMousePos.target.y = pointerPos.y / window.innerHeight;

            if (!this.cursorRaf) {
                this.cursorRaf = requestAnimationFrame(this.lerpCursorPos.bind(this));
            }
        }
        getPointerPos(ev) {
            const posx = ev.pageX || ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft || 0;
            const posy = ev.pageY || ev.clientY + document.body.scrollTop + document.documentElement.scrollTop || 0;
            return { x: posx, y: posy };
        }
        lerpCursorPos = () => {
            this.normalizeMousePos.current.x = lerp(this.normalizeMousePos.current.x, this.normalizeMousePos.target.x, 0.05);
            this.normalizeMousePos.current.y = lerp(this.normalizeMousePos.current.y, this.normalizeMousePos.target.y, 0.05);

            const delta = distance(
                this.normalizeMousePos.target.x,
                this.normalizeMousePos.current.x,
                this.normalizeMousePos.target.y,
                this.normalizeMousePos.current.y
            );

            if (delta < 0.001 && this.cursorRaf) {
                cancelAnimationFrame(this.cursorRaf);
                this.cursorRaf = null;
                return;
            }
            this.cursorRaf = requestAnimationFrame(this.lerpCursorPos.bind(this));
        }
        reachedThreshold(threshold) {
            if (!threshold) return false;
            const dist = distance(this.mousePos.x, this.mousePos.y, this.lastMousePos.x, this.lastMousePos.y);
            if (dist > threshold) {
                this.lastMousePos = { ...this.mousePos };
                return true;
            }
            return false;
        }
    }
    const mouse = new Mouse();

    class SmoothScroll {
        constructor() {
            this.lenis = null;
            this.scroller = {
                scrollX: window.scrollX,
                scrollY: window.scrollY,
                velocity: 0,
                direction: 0
            }

            this.lastScroller = {
                scrollX: window.scrollX,
                scrollY: window.scrollY,
                velocity: 0,
                direction: 0
            }
        }
        init(data) {
            this.reInit(data);
            gsap.ticker.add((time) => {
                if (this.lenis) {
                    this.lenis.raf(time * 1000);
                }
            });
            gsap.ticker.lagSmoothing(0);
        }
        reInit(data) {
            let namespace = data ? data.next.namespace : $('[data-barba="container"]').attr('data-barba-namespace');
            this.lenis = new Lenis({})
            this.lenis.on('scroll', ScrollTrigger.update)
            this.lenis.on('scroll', (e) => {
                this.updateOnScroll(e);
            });
        }
        start() {
            this.lenis.start();
            $('.body').css('overflow', '');
        }
        stop() {
            this.lenis.stop();
            $('.body').css('overflow', 'hidden');
        }
        destroy() {
            gsap.ticker.remove((time) => {
                this.lenis.raf(time * 1000);
            });
            this.lenis.destroy();
            this.lenis = null;
        }
        reachedThreshold(threshold) {
            if (!threshold) return false;
            const dist = distance(this.scroller.scrollX, this.scroller.scrollY, this.lastScroller.scrollX, this.lastScroller.scrollY);

            if (dist > threshold) {
                this.lastScroller = {...this.scroller };
                return true;
            }
        }
        updateOnScroll = (e) => {
            this.scroller.scrollX = e.scroll
            this.scroller.scrollY = e.scroll

            this.scroller.velocity = e.velocity * .2
            this.scroller.direction = e.direction;
            if (header) {
                header.updateOnScroll(smoothScroll.lenis);
            };
        }
    }
    const smoothScroll = new SmoothScroll();

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
        }
    }
    const loader = new Loader();

    class Marquee {
        constructor(list, duration = 40) {
            this.list = list;
            this.duration = duration;
        }
        setup() {
            const cloneAmount = Math.ceil($(window).width() / this.list.width()) + 1;
            let itemClone = this.list.find('[data-marquee="item"]').clone();
            let itemWidth = this.list.find('[data-marquee="item"]').width();
            this.list.html('');
            new Array(cloneAmount).fill().forEach(() => {
                let html = itemClone.clone()
                html.css('animation-duration', `${Math.ceil(itemWidth / this.duration)}s`);
                html.addClass('anim-marquee');
                this.list.append(html);
            });
        }
    }

    class ParallaxImage {
        constructor({ el, scaleOffset = 0.3 }) {
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
            gsap.set(this.el, { height: '120%' });
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
                    let percent = this.elWrap.getBoundingClientRect().bottom / total;
                    gsap.quickSetter(this.el, 'y', 'px')(-dist * percent * 1.2);
                    gsap.set(this.el, { scale: 1 + (percent * this.scaleOffset) });
                }
            }
        }
    }
    class FlipText {
        constructor(wrapEl, onCycleComplete = () => {}) {
            this.wrapEl = wrapEl;
            this.tlMaster;
            this.onCycleComplete = onCycleComplete; // Store callback
        }
        setup() {
            let allSlideItems = $(this.wrapEl).find('.txt-slider-inner > *');
            this.tlMaster = gsap.timeline({
                paused: true,
                onStart: () => {
                },
                onComplete: () => {
                    this.tlMaster.progress(0);
                }
            });


            const DEFAULT = {
                duration: 3,
                ease: 'expo.inOut',
                transform: {
                    out: `translate3d(0px, ${parseRem(25.5961)}px, -${parseRem(26.0468)}px) rotateX(-91deg)`,
                    in: `translate3d(0px, -${parseRem(25.5961)}px, -${parseRem(26.0468)}px) rotateX(91deg)`,
                }
            }
            gsap.set(this.wrapEl, { perspective: parseRem(82.5) })
            gsap.set(allSlideItems, {
                transformOrigin: true
                    ? 'center center -.1em !important'
                    : 'center center -.26em !important',
            });

            allSlideItems.each((idx, text) => {
                if (idx == allSlideItems.length - 1) {
                    gsap.set(text, { transform: 'none', autoAlpha: 1 });
                } else {
                    gsap.set(text, { transform: DEFAULT.transform.out, autoAlpha: 0 });
                }
                let tlChild = gsap.timeline({});

                if (idx === allSlideItems.length - 1) {
                    tlChild
                        .set(text, { transform: 'none', autoAlpha: 1 })
                        .to(text, { transform: DEFAULT.transform.in, autoAlpha: 0, duration: DEFAULT.duration, ease: DEFAULT.ease, onStart: () => { this.onCycleComplete(idx) } }, '<=0')
                        .to(text, { duration: DEFAULT.duration * idx - 1 * DEFAULT.duration })
                        .set(text, { transform: DEFAULT.transform.out, autoAlpha: 0 })
                        .to(text, { transform: 'none', autoAlpha: 1, duration: DEFAULT.duration, ease: DEFAULT.ease });
                } else {
                    tlChild
                        .set(text, { transform: DEFAULT.transform.out, autoAlpha: 0 })
                        .to(text, { duration: DEFAULT.duration * idx }, '<=0')
                        .to(text, { transform: 'none', autoAlpha: 1, duration: DEFAULT.duration, ease: DEFAULT.ease })
                        .to(text, { transform: DEFAULT.transform.in, autoAlpha: 0, duration: DEFAULT.duration, ease: DEFAULT.ease, onStart: () => { this.onCycleComplete(idx) } })
                        .to(text, { duration: (allSlideItems.length - 2 - idx) * DEFAULT.duration });
                }
                this.tlMaster.add(tlChild, 0);
            });
            this.tlMaster.progress((1 / allSlideItems.length).toFixed(2));
        }
        play() {
            this.tlMaster.play();
        }
    }

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
            document.querySelectorAll('a').forEach((el) => {
                const href = el.getAttribute('href');
                const currentPath = `${window.location.pathname}${window.location.hash}`;
                el.classList.toggle('w--current', href === currentPath);
            })
        }
        refreshOnBreakpoint() {
            const breakpoints = [479, 767, 991];
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
    }
    const globalChange = new GlobalChange();

    class GlobalHooks {
        constructor() {
        }
        triggerEvent(eventName, data) {
            const event = new CustomEvent(eventName, { detail: data });
            data.next.container.dispatchEvent(event);
        }
        triggerOnceSetup(data) {
            console.log('Global Hooks: onceSetup');
            this.triggerEvent("onceSetup", data);
        }
        triggerOncePlay(data) {
            console.log('Global Hooks: oncePlay');
            this.triggerEvent("oncePlay", data);
        }
        triggerEnterSetup(data) {
            console.log('Global Hooks: enterSetup');
            this.triggerEvent("enterSetup", data);
        }
        triggerEnterPlay(data) {
            console.log('Global Hooks: enterPlay');
            this.triggerEvent("enterPlay", data);
        }
    }
    const globalHooks = new GlobalHooks();

    class PageTrans {
        constructor() {
            this.tlLeave = null;
            this.tlEnter = null;
            this.el = document.querySelector('.trans');
        }
        leaveAnim(data) {
            this.tlLeave = gsap.timeline({
                onStart: () => {
                    this.updateBeforeTrans.bind(this)(data);
                },
                onComplete: () => {
                    this.updateAfterTrans.bind(this)(data);
                }
            })
            this.tlLeave
                .fromTo(data.current.container, {opacity: 1}, {duration: .6, opacity: 0})

            return this.tlLeave;
        }
        enterAnim(data) {
            this.tlEnter = gsap.timeline({
                delay: .4,
                onStart: () => {
                    this.enterSetup(data);
                    setTimeout(() => {
                        this.enterPlay(data);
                    }, 100);
                },
            })

            this.tlEnter
                .fromTo(data.next.container, { opacity: 0 }, { duration: .6, opacity: 1, clearProps: 'all' }, 0)
            return this.tlEnter;
        }
        async play(data) {
            await pageTrans.leaveAnim(data).then(() => {
                pageTrans.enterAnim(data)
            })
        }
        enterSetup(data) {
            globalHooks.triggerEnterSetup(data);
        }
        enterPlay(data) {
            globalHooks.triggerEnterPlay(data);
        }
        updateBeforeTrans(data) {
            gsap.set(data.next.container, { opacity: 0, 'pointer-events': 'none', zIndex: 1 })
            smoothScroll.stop();
            smoothScroll.destroy();
            if (data.current.container) {
                $(data.current.container).css('z-index', 2);
            }
        }
        updateAfterTrans(data) {
            smoothScroll.reInit(data)
            globalChange.update(data)
            smoothScroll.start();
            if (data.current.container) {
                data.current.container.remove();
            }
        }
    }
    const pageTrans = new PageTrans();

    class TriggerSetup {
        constructor() {
            this.tlTrigger;
        }
        setTrigger(triggerEl, setup) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setup();
                        observer.unobserve(entry.target); // Only trigger once
                    }
                });
            }, {
                threshold: 0,
                rootMargin: `-${window.innerHeight}px 0px 0px 0px`
            });
            observer.observe(triggerEl);
        }
    }

    const HomePage = {
        Hero: class {
            constructor() {
                this.el = null;
                this.tlOnce = null;
                this.tlEnter = null;
                this.tlTriggerEnter = null;
            }
            setup(data, mode) {
                this.el = data.next.container.querySelector('.home-hero-wrap');
                if (mode === 'once') {
                    this.setupOnce(data);
                } else if (mode === 'enter') {
                    this.setupEnter(data);
                }
                else return;
                new Marquee($(this.el).find('[data-marquee="list"]'), 40).setup();
            }
            setupOnce(data) {
                this.tlOnce = gsap.timeline({
                    paused: true,
                    onStart: () => $('[data-init-hidden]').removeAttr('data-init-hidden')
                })
            }
            setupEnter(data) {
                this.tlEnter = gsap.timeline({
                    paused: true
                })

                if (!isInViewport(this.el)) {
                    this.tlTriggerEnter = gsap.timeline({
                        scrollTrigger: {
                            trigger: this.el,
                            start: 'top bottom+=50%',
                            end: 'bottom top',
                            once: true,
                            onEnter: () => this.tlEnter.play(),
                            onStart: () => $('[data-init-hidden]').removeAttr('data-init-hidden')
                        }
                    })
                }
            }
            playOnce() {
                this.tlOnce.play();
            }
            playEnter() {
                if (isInViewport(this.el)) {
                    this.tlEnter.play();
                }
            }
            destroy() {
                if (this.tlOnce) {
                    this.tlOnce.kill();
                }
                if (this.tlEnter) {
                    this.tlEnter.kill();
                }
                if (this.tlTriggerEnter) {
                    this.tlTriggerEnter.kill();
                }
            }
        },
        About: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
                this.tlParallax = null;
            }
            trigger(data) {
                this.el = data.next.container.querySelector('.home-about-wrap');
                this.tlParallax = [];
                super.setTrigger(this.el, this.setup.bind(this));
            }
            setup() {
                new ParallaxImage({el: this.el.querySelector('.home-about-thumb-inner img')});
                this.el.querySelectorAll('.home-about-story-item').forEach((el, idx) => new ParallaxImage({el: el.querySelector('img'), scaleOffset: 0.2 }))
                this.tlParallax.push(
                    gsap
                        .timeline({
                            scrollTrigger: {
                                trigger: $(this.el).find('.home-about-story-list'),
                                start: `top top+=50%`,
                                end: 'bottom top+=50%',
                                scrub: 1,
                                defaults: { ease: 'none' }
                            }
                        })
                        .fromTo($(this.el).find('.home-about-story-content-item'), { yPercent: -50 }, { yPercent: 50 }))

                    this.tlParallax.push(
                        gsap
                            .timeline({
                                scrollTrigger: {
                                    trigger: this.el,
                                    start: `bottom-=${$(window).height() * 1.5} bottom`,
                                    end: `bottom bottom`,
                                    scrub: 1
                                },
                            })
                            .to($(this.el).find('.home-about-story-content'), { scale: 0.8, autoAlpha: 0.6, duration: 1, ease: 'power2.in' }, 0)
                            .to($(this.el).find('.home-about-story-item:last-child .home-about-story-item-img'), { scale: 1.3, transformOrigin: 'bottom', autoAlpha: 0.5, duration: 1, ease: 'none'}, 0));
            }
            destroy() {
                if (this.tlParallax.length > 0) {
                    this.tlParallax.forEach(tl => tl.kill());
                }
            }
        },
        Challenge: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
                this.tlParallax = null;
            }
            trigger(data) {
                this.el = data.next.container.querySelector('.home-challenge-wrap');
                this.tlParallax = [];
                super.setTrigger(this.el, this.setup.bind(this));
            }
            setup() {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: $(this.el).find('.home-challenge-main'),
                        scrub: 1,
                        start: 'top-=5% top',
                        end: 'bottom bottom',
                        default: { ease: 'none' }
                    }
                })

                this.el.querySelectorAll('.home-challenge-item').forEach((item, index) => {
                    gsap.set($(item).find('.home-challenge-item-halftone'), { autoAlpha: index === 0 ? .08 : 0 });
                    index === 0 && gsap.set($(this.el).find('.home-challenge-item-content-overlay'), { autoAlpha: 1 });
                    gsap.set($(item), { 'flex-grow': index === 0 ? 1 : 0 });

                    if (index == this.el.querySelectorAll('.home-challenge-item').length - 1) return;
                    tl
                        .to(item,
                            { 'flex-grow': 0, duration: 1 })
                        .to($(this.el).find('.home-challenge-item').eq(index + 1),
                            { 'flex-grow': 1, duration: 1 }, "<=0")
                        .to($(item).find('.home-challenge-item-halftone'),
                            { autoAlpha: 0, duration: 1 }, "<=0")
                        .to($(this.el).find('.home-challenge-item').eq(index + 1).find('.home-challenge-item-halftone'),
                            { autoAlpha: 0.08, duration: 1 }, "<=0")
                        .to($(this.el).find('.home-challenge-item').eq(index + 1).find('.home-challenge-item-content-overlay'),
                            { autoAlpha: 1, duration: .2 }, '<=0.1')
                        .to($(item).find('.home-challenge-item-content-overlay'),
                            { autoAlpha: 0, duration: .2 }, "-=.6")
                })

            }
            destroy() {
                if (this.tlParallax.length > 0) {
                    this.tlParallax.forEach(tl => tl.kill());
                }
            }
        },
        Solution: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
                this.tlStickSol = null;
                this.tlStickMade = null;
                this.tlHorizontal = null;
                this.tlOverlap = null;
            }
            trigger(data) {
                this.el = data.next.container.querySelector('.home-solution-wrap');
                super.setTrigger(this.el, this.setup.bind(this));
            }
            setup() {
                this.sections = this.el.querySelectorAll('section');
                this.horizontalLayout(this.sections);


                let headingFlipping = new FlipText('.home-made-title-slide .txt-slider-wrap',
                    (idx) =>
                        setTimeout(() => {
                            $(this.el).find('.home-made-map-img').eq(idx).addClass('active').siblings().removeClass('active');
                        }, 1000)
                    );
                headingFlipping.setup();
                headingFlipping.play();

                this.tlStickSol = gsap.timeline({
                    scrollTrigger: {
                        trigger: $(this.el).find('.home-solution'),
                        start: `top+=${$(window).height() * .8} top`,
                        end: `bottom-=${$(window).height() * 1.2} bottom`,
                        scrub: 1,
                        anticipatePin: 1
                    }
                })

                this.tlStickSol
                    .fromTo($(this.el).find('.home-solution-main-transform'), { bottom: '100%' }, { bottom: '2%' })
                    .fromTo($(this.el).find('.home-solution-main-vid-halftone'), { height: '100%' }, { height: '2%' }, "<=0")

                this.tlStickMade = gsap.timeline({
                    scrollTrigger: {
                        trigger: $(this.el).find('.home-made'),
                        scrub: 1,
                        start: `top+=${$(this.el).find('.home-solution').height() - ($(window).height() * 2)} top`,
                        end: 'bottom bottom',
                        anticipatePin: 1
                    }
                })

                const space_accord_process = parseInt($(this.el).find('.home-made-body-item-size').css('width'))
                this.el.querySelectorAll('.home-made-body-item').forEach((item, index) => {
                    if (($(this.el).find('.home-made-body-item').length - 1) > index) {
                        this.tlStickMade.to(item, { width: space_accord_process, ease: 'none' })
                        this.tlStickMade.to($(item).find('.home-made-body-item-desc'), {autoAlpha:0,ease:'none'}, '<')
                    }
                    else {
                        let space_accord_remaining = $(window).width() - (space_accord_process * (this.el.querySelectorAll('.home-made-body-item').length - 1))
                        this.tlStickMade.to(item, { width: space_accord_remaining, ease: 'none' }, 0)
                    }
                })
                this.tlOverlap = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
                        start: `bottom-=${$(window).height() * 1.5} bottom`,
                        end: `bottom bottom`,
                        scrub: 1
                    },
                })
                this.tlOverlap
                    .to('.home-made-body', { scale: 0.8, transformOrigin: 'top', autoAlpha: 0.6, duration: 1, ease: 'power2.in' })
                    .to('.home-made-title', { scale: .95, transformOrigin: 'bottom', autoAlpha: 0.6, duration: 1, ease: 'power2.in' }, "<=0")
                    .to('.home-made-map', { scale: 1.05, autoAlpha: 0.6, duration: 1, ease: 'power2.in' }, "<=0")
            }
            horizontalLayout(sections) {
                let sizeScroller = $(this.el).find('.solution-scroller').height();
                gsap.set(this.el.querySelector('.home-solution-inner'), { display: 'flex' })

                this.tlHorizontal = gsap.timeline({
                    scrollTrigger: {
                        trigger: $(this.el).find('.solution-scroller'),
                        start: `top+=${$(window).height() * 1.3} top`,
                        end: `bottom+=${$(window).height() * 1.3} bottom`,
                        scrub: 1,
                        anticipatePin: 1,
                        snap: 1
                    }
                })

                this.tlHorizontal
                    .to($(this.el).find('.home-solution-main-inner'), { rotationX: '30deg' })
                    .to($(this.el).find('.home-solution-main'), { xPercent: 10 }, "<=0")
                    .to(this.el.querySelector('.home-solution-inner'), { x: -sizeScroller, transformOrigin: "top", ease: "none" }, "<=0")
            }
            destroy() {
                if (this.tlStickSol) {
                    this.tlStickSol.kill()
                }
                if (this.tlStickMade) {
                    this.tlStickMade.kill()
                }
                if (this.tlHorizontal) {
                    this.tlHorizontal.kill()
                }
                if (this.tlOverlap) {
                    this.tlOverlap.kill()
                }
            }
        },
        Benefit: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
            }
            trigger(data) {
                this.el = data.next.container.querySelector('.home-benefit-wrap');
                super.setTrigger(this.el, this.setup.bind(this));
            }
            setup() {
                console.log("run benefit")
            }
        },
        News: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
                this.tlOverlap = null;
            }
            trigger(data) {
                this.el = data.next.container.querySelector('.home-news-wrap');
                super.setTrigger(this.el, this.setup.bind(this));
            }
            setup() {
                console.log("run news")
                new ParallaxImage({ el: this.el.querySelector('.home-news-thumb img') });
                this.tlOverlap = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el.querySelector('.home-news-thumb'),
                        start: `top 10%`,
                        end: `bottom bottom`,
                        endTrigger: this.el,
                        scrub: 1
                    },
                })
                .to($(this.el).find('.home-news-thumb-inner'), { scale: .9, autoAlpha: 0.5, duration: 1, ease: 'power2.in' })
            }
        }
    }
    const formSubmitEvent = (function () {
        const init = ({
            onlyWorkOnThisFormName,
            onSuccess,
            onFail
        }) => {
            let inputSubmitWrap = $('.contact-hero-form-submit-wrap');
            let inputSubmitText = $('.contact-hero-form-submit .txt');
            let inputSubmitTextFirst = $('.contact-hero-form-submit .top').text();
            const isWorkOnAllForm = onlyWorkOnThisFormName == undefined
            $(document).on('ajaxSend', function (event, xhr, settings) {
                if (settings.url.includes("https://webflow.com/api/v1/form/")) {
                    const isCorrectForm = !isWorkOnAllForm && settings.data.includes(getSanitizedFormName(onlyWorkOnThisFormName));

                    if (isCorrectForm) {
                        inputSubmitWrap.addClass('disable');
                        inputSubmitText.text('Please wait...');
                    }
                }
            });

            $(document).on('ajaxComplete', function (event, xhr, settings) {
                if (settings.url.includes("https://webflow.com/api/v1/form/")) {
                    const isSuccessful = xhr.status === 200
                    const isCorrectForm = !isWorkOnAllForm && settings.data.includes(getSanitizedFormName(onlyWorkOnThisFormName));

                    if (isWorkOnAllForm) {
                        if (isSuccessful) {
                            onSuccess?.()
                            inputSubmitWrap.removeClass('disable');
                            inputSubmitText.text(inputSubmitTextFirst);

                        } else {
                            onFail?.()
                        }
                    } else if (isCorrectForm) {
                        if (isSuccessful) {
                            onSuccess?.()
                            console.log(inputSubmitText)
                            inputSubmitWrap.removeClass('disable');
                            inputSubmitText.text(inputSubmitTextFirst);
                        } else {
                            onFail?.()
                        }
                    }
                }
            });
        }
        function getSanitizedFormName(name) {
            return name.replaceAll(" ", "+")
        }
        return {
            init
        }
    })();
    const ContactPage = {
        Hero: class {
            constructor() {
                this.el = null;
                this.tlOnce = null;
                this.tlEnter = null;
                this.tlTriggerEnter = null;
            }
            setup(data, mode) {
                this.el = data.next.container.querySelector('.contact-hero-wrap');
                if (mode === 'once') {
                    this.setupOnce(data);
                } else if (mode === 'enter') {
                    this.setupEnter(data);
                }
                else return;
                this.initInputValueCheck('.contact-hero-form-input');
                this.interact();
            }
            initInputValueCheck(selector = 'input') {
                $(document).on('input', selector, function () {
                    const $this = $(this);
                    if ($this.val().trim() !== '') {
                        $this.addClass('has-value');
                    } else {
                        $this.removeClass('has-value');
                    }
                });
            }
            interact() {
                let initTextSubject = $('.contact-hero-form-select-title').text();
                $('.contact-hero-form-select').on('click', function(){
                    $(this).find('.contact-hero-form-select-inner').toggleClass('active');
                })
                $(".contact-hero-form-option-item").on("click", function(){
                    let text = $(this).find('.contact-hero-form-option-item-txt').text();
                    $(".contact-hero-form-option-item").removeClass('active');
                    $('.contact-hero-form-input-wrap.contact-hero-form-select-wrap').removeClass('valid-null');
                    $(this).addClass('active');
                    $('.contact-hero-form-input[name="Subject"]').val(text);
                    $('.contact-hero-form-select-title').text(text);
                    $(".contact-hero-form-select").removeClass("active");
                })
                $('.contact-hero-form-submit-real').on('click', function(e){
                    let name = $('.contact-hero-form-input[name="name"]');
                    let email = $('.contact-hero-form-input[name="Email"]');
                    let phone = $('.contact-hero-form-input[name="Phone"]');
                    let subject = $('.contact-hero-form-input[name="Subject"]');
                    let flag = false;
                    if(name.val() === ''){
                        name.closest('.contact-hero-form-input-wrap').addClass('valid-null');
                        flag = true;
                    }
                    else {
                        name.closest('.contact-hero-form-input-wrap').removeClass('valid-null');
                    }
                    if(phone.val() === ''){
                        phone.closest('.contact-hero-form-input-wrap').addClass('valid-null');
                        flag = true;
                    }
                    else {
                        phone.closest('.contact-hero-form-input-wrap').removeClass('valid-null');
                    }
                    if(email.val() === ''){
                        email.closest('.contact-hero-form-input-wrap').addClass('valid-null');
                        flag = true;
                    }
                    else if(!validateEmail(email.val())){
                        email.closest('.contact-hero-form-input-wrap').removeClass('valid-null');
                        email.closest('.contact-hero-form-input-wrap').addClass('valid-format');
                        flag = true;
                    }
                    else {
                        email.closest('.contact-hero-form-input-wrap').removeClass('valid-null');
                        email.closest('.contact-hero-form-input-wrap').removeClass('valid-format');
                    }
                    if(subject.val() === ''){
                        subject.closest('.contact-hero-form-input-wrap').addClass('valid-null');
                        flag = true;
                    }
                    else {
                        subject.closest('.contact-hero-form-input-wrap').removeClass('valid-null');
                    }
                    if(flag){
                        e.preventDefault();
                        return;
                    }
                })
                $('.contact-hero-form-input').on('input', function() {
                    const $wrap = $(this).closest('.contact-hero-form-input-wrap');
                    if ($(this).val().trim() !== '') {
                        $wrap.removeClass('valid-null');
                    }
                    if ($(this).attr('name') === 'Email') {
                        if (validateEmail($(this).val().trim())) {
                            $wrap.removeClass('valid-format');
                        }
                    }
                });
                $('.contact-hero-form .overlay-bg').on('click', function(){
                    $('.contact-hero-form-success').removeClass('active');
                })
                const formInner = $('.contact-hero-form-inner');
                const successBox = $('.contact-hero-form-success');
                formSubmitEvent.init({
                    onlyWorkOnThisFormName: 'Contact Form',
                    onSuccess: () => {
                        console.log('success');
                        formInner.addClass('active');
                        successBox.addClass('active');
                        $('input, textarea').val('');
                        $('.contact-hero-form-select-title').text(initTextSubject);
                        $('.contact-hero-form-option-item').removeClass('active');
                    },
                    onFail: () => {
                        console.log('fail')
                    }
                })
                
            }
            setupOnce(data) {
                this.tlOnce = gsap.timeline({
                    paused: true,
                    onStart: () => $('[data-init-hidden]').removeAttr('data-init-hidden')
                })
            }
            setupEnter(data) {
                this.tlEnter = gsap.timeline({
                    paused: true
                })

                if (!isInViewport(this.el)) {
                    this.tlTriggerEnter = gsap.timeline({
                        scrollTrigger: {
                            trigger: this.el,
                            start: 'top bottom+=50%',
                            end: 'bottom top',
                            once: true,
                            onEnter: () => this.tlEnter.play(),
                            onStart: () => $('[data-init-hidden]').removeAttr('data-init-hidden')
                        }
                    })
                }
            }
            playOnce() {
                this.tlOnce.play();
            }
            playEnter() {
                if (isInViewport(this.el)) {
                    this.tlEnter.play();
                }
            }
            destroy() {
                if (this.tlOnce) {
                    this.tlOnce.kill();
                }
                if (this.tlEnter) {
                    this.tlEnter.kill();
                }
                if (this.tlTriggerEnter) {
                    this.tlTriggerEnter.kill();
                }
            }
        }
    }

    class Header {
        constructor() {
            this.el = null;
        }
        init(data) {
            this.el = document.querySelector('.header');
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
        isOpen() {
            return this.el.classList.contains('on-open-nav');
        }
    }
    const header = new Header();
    class Footer extends TriggerSetup {
        constructor() {
            super();
        }
        trigger(data) {
            this.el = document.querySelector('.footer');
            super.setTrigger(this.el, this.setup.bind(this));
        }
        setup() {
            new Marquee($(this.el).find('.footer-bot-text [data-marquee="list"]'), 40).setup();
            new Marquee($(this.el).find('.footer-bot-ruler [data-marquee="list"]'), 10).setup();

            $('.footer-cta-submit input[type="submit"]').on('click', function(e) {
                let email = $('.footer-cta-input[name="email"]');
                let flag = false;
                if(email.val() === ''){
                    email.closest('.footer-cta-input-wrap').addClass('valid-null');
                    flag = true;
                }
                else if(!validateEmail(email.val())){
                    email.closest('.footer-cta-input-wrap').removeClass('valid-null');
                    email.closest('.footer-cta-input-wrap').addClass('valid-format');
                    flag = true;
                }
                else {
                    email.closest('.footer-cta-input-wrap').removeClass('valid-null');
                    email.closest('.footer-cta-input-wrap').removeClass('valid-format');
                }
                if(flag){
                    e.preventDefault();
                    return;
                }
            })
        }
    }
    const footer = new Footer();
    class PageManager {
        constructor(page) {
            this.sections = Object.values(page).map(section => new section());

            // Bind event handlers
            this.boundSetupHandler = this.setupHandler.bind(this);
            this.boundOncePlayHandler = this.oncePlayHandler.bind(this);
            this.boundEnterPlayHandler = this.enterPlayHandler.bind(this);
        }

        initOnce(data) {
            const container = data.next.container;
            container.addEventListener("onceSetup", (event) => {
                this.boundSetupHandler({ detail: event.detail, mode: 'once' });
            });
            container.addEventListener("oncePlay", this.boundOncePlayHandler);
        }

        initEnter(data) {
            const container = data.next.container;
            container.addEventListener("enterSetup", (event) => {
                this.boundSetupHandler({ detail: event.detail, mode: 'enter' });
            });
            container.addEventListener("enterPlay", this.boundEnterPlayHandler);
        }

        oncePlayHandler(event) {
            this.sections.forEach(section => {
                if (section.playOnce) {
                    section.playOnce(event.detail);
                }
            });
        }

        enterPlayHandler(event) {
            this.sections.forEach(section => {
                if (section.playEnter) {
                    section.playEnter(event.detail);
                }
            });
        }

        destroy(data) {
            const container = data.next.container;
            container.removeEventListener("onceSetup", this.boundSetupHandler);
            container.removeEventListener("oncePlay", this.boundOncePlayHandler);
            container.removeEventListener("enterSetup", this.boundSetupHandler);
            container.removeEventListener("enterPlay", this.boundEnterPlayHandler);
            this.destroyHandler(data);
        }

        setupHandler(event) {
            const data = event.detail;
            const mode = event.mode;
            this.sections.forEach(section => {
                if (section.trigger) {
                    section.trigger(data);
                }
                else {
                    if (section.setup) {
                        section.setup(data, mode);
                    }
                }
            });
        }

        destroyHandler(data) {
            this.sections.forEach(section => {
                if (section.destroy) {
                    section.destroy();
                }
            });
        }
    }

    class HomePageManager extends PageManager {
        constructor(page) { super(page); }
    }
    class ContactPageManager extends PageManager {
        constructor(page) { super(page); }
    }

    const PageManagerRegistry = {
        home: new HomePageManager(HomePage),
        contact: new ContactPageManager(ContactPage)
    };
    const SCRIPT = {
        home: {
            namespace: 'home',
            afterEnter(data) {
                PageManagerRegistry.home.initEnter(data);
            },
            beforeLeave(data) {
                PageManagerRegistry.home.destroy(data);
            }
        },
        contact: {
            namespace: 'contact',
            afterEnter(data) {
                PageManagerRegistry.contact.initEnter(data);
            },
            beforeLeave(data) {
                PageManagerRegistry.contact.destroy(data);
            }
        },
    }
    const VIEWS = Object.values(SCRIPT);

    let namespace = $('.main-inner').attr('data-barba-namespace');
    barba.init({
        preventRunning: true,
        timeout: 5000,
        debug: true,
        transitions: [{
            name: 'default-transition',
            sync: true,
            beforeOnce(data) {
                smoothScroll.init(data);
                globalChange.init(data);
            },
            once(data) {
                loader.init(data);
                loader.play(data);
                scrollTop(PageManagerRegistry[namespace]?.initOnce?.(data));
                header.init(data);
                footer.trigger();
            },
            async leave(data) {
                await pageTrans.play(data);
            },
        }],
        views: VIEWS
    })
}

window.onload = script