const script = () => {
    $.easing.exponentialEaseOut = function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
    };
    barba.use(barbaPrefetch);
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    gsap.registerPlugin(ScrollTrigger, SplitText);
    ScrollTrigger.defaults({
        invalidateOnRefresh: true,
        fastScrollEnd: true
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
    const isTouchDevice = () => {
        return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
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
    const viewport = {
        w: window.innerWidth,
        h: window.innerHeight,
    };
    const device = { desktop: 991, tablet: 767, mobile: 479 }

    const viewportBreak = (options) => {
        const { desktop, tablet, mobile } = options;
        let result;
        switch (true) {
            case viewport.w <= device.tablet:
                result = mobile;
                break;
            case viewport.w <= device.desktop:
                result = tablet;
                break;
            default:
                result = desktop;
                break;
        }
        return (result instanceof Function) ? result() : result;
    }
    function reinitializeWebflow() {
        console.log('reinitialize webflow');
        window.Webflow && window.Webflow.destroy();
        window.Webflow && window.Webflow.ready();
    }
    const getAllScrollTrigger = (fn) => {
        let triggers = ScrollTrigger.getAll();
        triggers.forEach(trigger => {
            trigger[fn]();
        });
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

    function resetScroll(data) {
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
                        smoothScroll.lenis.scrollTo(`#${searchObj.sc}`, {
                            offset: -100
                        })
                    }, 500);
                    barba.history.add(`${window.location.pathname + target}`, 'barba', 'replace');
                } else {
                    scrollTop()
                }
            }
        } else {
            scrollTop()
        }
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
    // const mouse = new Mouse();
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
                duration: .5,
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
        setup(isReverse) {
            const cloneAmount = Math.ceil(viewport.w / this.list.width()) + 1;
            let itemClone = this.list.find('[data-marquee="item"]').clone();
            let itemWidth = this.list.find('[data-marquee="item"]').width();
            this.list.html('');
            new Array(cloneAmount).fill().forEach(() => {
                let html = itemClone.clone()
                html.css('animation-duration', `${Math.ceil(itemWidth / this.duration)}s`);
                if (isReverse) {
                    html.css('animation-direction', 'reverse');
                }
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
            this.onCycleComplete = onCycleComplete;
        }
        setup() {
            let allSlideItems = $(this.wrapEl).find('.txt-slider-inner > *');
            this.tlMaster = gsap.timeline({
                paused: true,
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
            $("a").each(function (index, link) {
                if ($(this).attr('data-sub-link') && (!$(this).attr('href').includes('#')) && (!$(this).attr('href').includes('sc'))) {
                    $(this).attr('href', `${$(this).attr('href')}#${$(this).attr('data-sub-link')}`);
                    $(this).attr('data-barba-history', 'replace');
                }

                const [urlPath, anchor] = $(this).attr('href').includes('#') ? $(this).attr('href').split('#') : $(this).attr('href').includes('sc') ? $(this).attr('href').split('?sc=') : [$(this).attr('href'), ''];

                $(this).toggleClass("w--current", $(this).attr("href") == `${window.location.pathname}${window.location.hash}`);
                if (!anchor) {
                    return;
                }
                else {
                    if (urlPath === `${window.location.pathname}` || urlPath === '') {
                        $(this).attr('href', `${window.location.pathname}#${anchor}`);
                    }
                    else {
                        $(this).attr('href', `${urlPath}?sc=${anchor}`);
                    }
                }
            });
            $('a').on('click', function (e) {
                if ($(this).attr('data-sub-link')) {
                    barba.history.add(`${window.location.pathname + `#${$(this).attr('data-sub-link')}`}`, 'barba', 'replace');

                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            $(`#${$(this).attr('data-sub-link')}`).trigger('click');
                        }, $(this).hasClass('w--current') ? 0 : 1000);

                        $("a").each(function (index, link) {
                            $(link).toggleClass("w--current", $(link).attr('href') == `${window.location.pathname}${window.location.hash}`);
                        });
                    })
                }
            })
        }
        refreshOnBreakpoint() {
            const breakpoints = [479, 767, 991];
            const initialViewportWidth = viewport.w || document.documentElement.clientWidth;
            const breakpoint = breakpoints.find(bp => initialViewportWidth < bp) || breakpoints[breakpoints.length - 1];
            window.addEventListener('resize', debounce(function () {
                const newViewportWidth = viewport.w || document.documentElement.clientWidth;
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
                delay: .5,
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
            scrollTop();
            resetScroll();
            smoothScroll.start();
            reinitializeWebflow();
            if (data.current.container) {
                data.current.container.remove();
            }
        }
    }
    const pageTrans = new PageTrans();

    class TriggerSetup {
        constructor() {
            this.tlTrigger = null;
            this.isPlayed = false;
            this.once = true;
        }
        setTrigger(triggerEl, onTrigger) {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerEl,
                    start: 'clamp(top bottom+=50%)',
                    end: 'clamp(bottom top)',
                    onEnter: () => {
                        if (this.isPlayed && this.once) {
                            this.once = false;
                            this.onTrigger();
                        }
                    }
                }
            })
        }
        playTrigger() {
            this.isPlayed = true;
            if (window.scrollY === 0) window.scrollTo(0, 1)
        }
        cleanTrigger() {
            if (this.isPlayed) {
                this.isPlayed = false;
            }
            if (!this.once) {
                this.once = true;
            }
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
            if (viewport.w < 767) {
                this.toggleNav();
                this.adjustNavHeight();

                window.addEventListener('resize', () => this.adjustNavHeight());
                window.addEventListener('load', () => this.adjustNavHeight());
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
            $('.header').addClass('on-open-nav');
            $('.header-toggle').addClass('active');
            this.isOpen = true;
            smoothScroll.lenis.stop();
        }
        close() {
            if (!this.isOpen) return;
            $('.header').removeClass('on-open-nav');
            $('.header-toggle').removeClass('active');
            this.isOpen = false;
            smoothScroll.lenis.start();
        }
        adjustNavHeight() {
            $(this.el).find('.header-act').css('height', viewport.h - $(this.el).outerHeight());
        }
    }
    const header = new Header();
    class Footer extends TriggerSetup {
        constructor() {
            super();
            this.el = null;
            this.tlOverlap = null;
        }
        trigger(data) {
            this.el = data.next.container.querySelector('.footer');
            super.setTrigger(this.el, this.onTrigger.bind(this));
        }
        onTrigger() {
            new Marquee($(this.el).find('.footer-bot-text [data-marquee="list"]'), 40).setup();
            new Marquee($(this.el).find('.footer-bot-ruler [data-marquee="list"]'), 10).setup();
            $(this.el).find('.footer-cta-submit input[type="submit"]').on('click', (e) => {
                let email = $(this.el).find('.footer-cta-input[name="email"]');

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
            this.animationReveal();
            this.animationScrub();
        }
        animationReveal() {
            new MasterTimeline({
                triggerInit: this.el,
                scrollTrigger: { trigger: $(this.el).find('.footer-cta-content'), start: 'top top+=70%' },
                allowMobile: true,
                tweenArr: [
                    new FadeSplitText({ el: $(this.el).find('.footer-cta-title').get(0) }),
                    new FadeSplitText({ el: $(this.el).find('.footer-cta-desc').get(0) }),
                    new FadeIn({ el: $(this.el).find('.footer-cta-main').get(0) }),
                    new ScaleLine({ el: $(this.el).find('.footer-cta-line').get(0) })
                ]
            })
            new MasterTimeline({
                triggerInit: this.el,
                scrollTrigger: { trigger: $(this.el).find('.footer-main-menu'), start: 'top top+=70%' },
                allowMobile: true,
                tweenArr: [
                    ...Array.from($(this.el).find('.footer-main-link')).flatMap((el, idx) => new FadeSplitText({ el: $(el).get(0) }))
                ]
            })
            new MasterTimeline({
                triggerInit: this.el,
                scrollTrigger: { trigger: $(this.el).find('.footer-main-info'), start: 'top top+=70%' },
                allowMobile: true,
                tweenArr: [
                    ...Array.from($(this.el).find('.footer-main-info-col')).flatMap((el, idx) => ([
                        new FadeSplitText({ el: $(el).find('.footer-main-info-label').get(0) }),
                        ...Array.from($(el).find('.footer-main-info-val-item')).flatMap((item, idx) => new FadeSplitText({ el: $(item).get(0) })),
                    ])),
                    new ScaleLine({ el: $(this.el).find('.footer-main-logo-line').get(0) }),
                    new FadeIn({ el: $(this.el).find('.footer-main-logo').get(0) })
                ]
            })
            new MasterTimeline({
                triggerInit: this.el,
                scrollTrigger: { trigger: $(this.el).find('.footer-main-wrap'), start: 'bottom top+=80%' },
                allowMobile: true,
                tweenArr: [
                    new FadeIn({ el: $(this.el).find('.footer-bot-text').get(0) }),
                    new FadeIn({ el: $(this.el).find('.footer-bot-ruler').get(0) }),
                    ...Array.from($(this.el).find('.footer-bot-link')).flatMap((el, idx) => new FadeSplitText({ el: $(el).get(0) })),
                    new FadeSplitText({ el: $(this.el).find('.footer-copyright-main').get(0) }),
                    new ScaleLine({ el: $(this.el).find('.footer-main-line').get(0) })
                ]
            })
        }
        animationScrub() {
            this.tlOverlap = gsap.timeline({
                scrollTrigger: {
                    trigger: $(this.el).find('.footer-main-wrap'),
                    start: 'bottom bottom',
                    end: `bottom bottom-=${$(this.el).find('.footer-bot').outerHeight()}`,
                    scrub: 1
                }
            })
            this.tlOverlap.fromTo($(this.el).find('.footer-bot'), { yPercent: 20 }, { yPercent: 0, ease: 'sine.out' });
        }
        destroy() {
            if (this.tlOverlap) {
                this.tlOverlap.kill();
            }
        }
    }
    const footer = new Footer();
    class CTA extends TriggerSetup {
        constructor() {
            super();
            this.el = null;
            this.tlOverlap = null;
        }
        trigger(data) {
            this.el = data.next.container.querySelector('.main-cta-wrap');
            super.setTrigger(this.el, this.onTrigger.bind(this));
        }
        onTrigger() {
            this.animationReveal();
        }
        animationReveal() {
            new MasterTimeline({
                triggerInit: this.el,
                scrollTrigger: { trigger: $(this.el).find('.main-cta-inner') },
                allowMobile: true,
                tweenArr: [
                    new FadeIn({ el: $(this.el).find('.main-cta-bg').get(0) }),
                    new FadeSplitText({ el: $(this.el).find('.main-cta-title').get(0) }),
                    new FadeIn({ el: $(this.el).find('.main-cta-btn').get(0) }),
                    new FadeIn({ el: $(this.el).find('.main-cta-decor').get(0) })
                ]
            })
        }
        destroy(data) {
            if (this.tlOverlap) {
                this.tlOverlap.kill();
            }
        }
    }
    // p-home
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

                this.animationReveal(this.tlOnce);
            }
            setupEnter(data) {
                this.tlEnter = gsap.timeline({
                    paused: true,
                    onStart: () => $('[data-init-hidden]').removeAttr('data-init-hidden')
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

                this.animationReveal(this.tlEnter);
            }
            playOnce() {
                this.tlOnce.play();
            }
            playEnter() {
                if (isInViewport(this.el)) {
                    this.tlEnter.play();
                }
            }
            animationReveal(timeline) {
                new MasterTimeline({
                    timeline,
                    allowMobile: true,
                    tweenArr: [
                        new FadeSplitText({ el: $(this.el).find('.home-hero-title').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.home-hero-desc-txt').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.home-hero-cta').get(0) }),
                        new FadeIn({ el: $(this.el).find('.home-hero-main-gif').get(0) }),
                        new FadeIn({ el: $(this.el).find('.home-hero-client').get(0), delay: "<=.3" }),
                    ]
                });
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
                this.tlOverlap = null;
                this.tlChangeText = null;
            }
            trigger(data) {
                this.el = data.next.container.querySelector('.home-about-wrap');
                this.tlOverlap = [];
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.animationReveal();
                this.animationScrub();
            }
            animationReveal() {
                new MasterTimeline({
                    triggerInit: this.el,
                    scrollTrigger: { trigger: this.el },
                    allowMobile: true,
                    tweenArr: [
                        new ScaleInset({ el: $(this.el).find('.home-about-thumb-inner').get(0), elInner: $(this.el).find('.home-about-thumb-inner video') }),
                        new FadeSplitText({ el: $(this.el).find('.home-about-label').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.home-about-title').get(0) })
                    ]
                })

                new MasterTimeline({
                    triggerInit: this.el,
                    scrollTrigger: { trigger: $(this.el).find('.home-about-desc'), start: 'top top+=90%' },
                    allowMobile: true,
                    tweenArr: [
                        new FadeSplitText({ el: $(this.el).find('.home-about-desc-txt').get(0) }),
                        new FadeIn({ el: $(this.el).find('.home-about-btn').get(0), delay: "<=.3" })
                    ]
                })

                gsap.set($(this.el).find('.home-about-story-content-text .txt-slider-wrap .heading:not(:first-child)'), { autoAlpha: 0 })

                let headingFlipping = new FlipText('.home-about-story-content-text .txt-slider-wrap');
                headingFlipping.setup();

                new MasterTimeline({
                    triggerInit: this.el,
                    scrollTrigger: {
                        trigger: $(this.el).find('.home-about-main'),
                        start: `bottom top+=${viewport.h * 0.65 - $(this.el).find('.home-about-story-content-item').height()}`
                    },
                    allowMobile: true,
                    tweenArr: [
                        new FadeSplitText({ el: $(this.el).find('.home-about-story-content-text .heading').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.home-about-story-content-text .txt-slider-wrap .heading:first-child').get(0), delay: "<=.04", onComplete: () => headingFlipping.play() }),
                        new FadeIn({ el: $(this.el).find('.home-about-story-content-decor').get(0) })
                    ]
                })
            }
            animationScrub() {
                // new ParallaxImage({el: this.el.querySelector('.home-about-thumb-inner video'), scaleOffset: 0.1 });
                this.el.querySelectorAll('.home-about-story-item').forEach((el, idx) => new ParallaxImage({el: el.querySelector('img'), scaleOffset: 0.2 }))
                this.tlOverlap.push(
                    gsap
                        .timeline({
                            scrollTrigger: {
                                trigger: $(this.el).find('.home-about-main'),
                                start: 'bottom bottom',
                                end: `bottom+=${viewport.h * 0.5} top`,
                                scrub: 1
                            }
                        })
                        .from($(this.el).find('.home-about-story-content'), { scale: 0.95, autoAlpha: 0.8, duration: 1, ease: 'power2.out'  }, 0)
                        .from($(this.el).find('.home-about-story-item:first-child .home-about-story-item-img'), { scale: 1.2, transformOrigin: 'top', autoAlpha: 0.5, duration: 1, ease: 'none' }, 0));

                this.tlOverlap.push(
                    gsap
                        .timeline({
                            scrollTrigger: {
                                trigger: this.el,
                                start: `bottom-=${viewport.h * 1.5} bottom`,
                                end: `bottom bottom`,
                                scrub: 1
                            },
                        })
                        .to($(this.el).find('.home-about-story-content'), { scale: 0.8, autoAlpha: 0.6, duration: 1, ease: 'power2.in', overwrite: true }, 0)
                        .to($(this.el).find('.home-about-story-list'), { scale: 1.3, transformOrigin: 'bottom', autoAlpha: 0.5, duration: 1, ease: 'none', overwrite: true}, 0));
            }
            changeTextOnScroll() {
                let wrapTextSlide = $(this.el).find('.home-about-story-content-text .txt-slider-wrap')
                let allSlideItems = $(wrapTextSlide).find('.txt-slider-inner > *');
                const DEFAULT = {
                    duration: .7,
                    ease: 'power1.inOut',
                    transform: {
                        out: `translate3d(0px, ${parseRem(25.5961)}px, -${parseRem(26.0468)}px) rotateX(-91deg)`,
                        in: `translate3d(0px, -${parseRem(25.5961)}px, -${parseRem(26.0468)}px) rotateX(91deg)`,
                    }
                }
                gsap.set(wrapTextSlide, { perspective: parseRem(82.5) })
                gsap.set(allSlideItems, {
                    transformOrigin: true
                        ? 'center center -.1em !important'
                        : 'center center -.26em !important',
                });


                gsap.set(allSlideItems, { transform: (i) => i === 0 ? 'none' : DEFAULT.transform.out, autoAlpha: (i) => i === 0 ? 1 : 0 });

                let lastIndex = 0;
                this.tlChangeText = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
                        start: `top+=${viewport.h * 1.2} top`,
                        end: `bottom-=${viewport.h * 1.2} bottom`,
                        scrub: true,
                        fastScrollEnd: true,
                        onUpdate: ({ progress }) => {
                            let index = this.getProgressIndex({ progress, N: allSlideItems.length, rootMargin: -0.01 });
                            if (index === lastIndex) return;

                            gsap.to(allSlideItems[index], { transform: 'translate(0px, 0px)', autoAlpha: 1, duration: DEFAULT.duration, ease: DEFAULT.ease } )
                            gsap.to(allSlideItems[lastIndex], { transform: DEFAULT.transform[index > lastIndex ? 'in' : 'out'], autoAlpha: 0, duration: DEFAULT.duration, ease: DEFAULT.ease } )

                            lastIndex = index;
                        }
                    }
                });
                this.tlChangeText.to($(this.el).find('.home-about-story-content-item'), { autoAlpha: 1 });
            }
            getProgressIndex({ progress, N, rootMargin = 0}) {
                const headSegment = 0.5 / (N - 1);
                const middleSegment = headSegment * 2;
                const totalLength = headSegment + middleSegment * (N - 2) + headSegment;
                const scale = 1 / totalLength;
                const scaledHead = headSegment * scale;
                const scaledMiddle = middleSegment * scale;

                let thresholds = [];
                let acc = scaledHead;
                for (let i = 1; i < N - 1; i++) {
                    thresholds.push(acc);
                    acc += scaledMiddle;
                }
                thresholds.push(acc);
                thresholds = thresholds.map(threshold => threshold + rootMargin);
                for (let i = 0; i < thresholds.length; i++) {
                    if (progress < thresholds[i]) {
                        return i;
                    }
                }
                return N - 1;
            }
            destroy() {
                if (this.tlOverlap.length > 0) {
                    this.tlOverlap.forEach(tl => tl.kill());
                }
            }
        },
        Challenge: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
                this.tlParallax = null;
                this.tlCardStack = null;
            }
            trigger(data) {
                this.el = data.next.container.querySelector('.home-challenge-wrap');
                this.tlParallax = [];
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.animationReveal();
                this.handleAccordion();
            }
            animationReveal() {
                new MasterTimeline({
                    triggerInit: this.el,
                    scrollTrigger: { trigger: this.el },
                    allowMobile: true,
                    tweenArr: [
                        new FadeSplitText({ el: $(this.el).find('.home-challenge-label').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.home-challenge-title').get(0), isDisableRevert: true })
                    ]
                })
                new MasterTimeline({
                    triggerInit: this.el,
                    scrollTrigger: { trigger: this.el },
                    allowMobile: true,
                    tweenArr: [
                        ...Array.from($(this.el).find('.home-challenge-item')).flatMap((el, idx) => {
                            let tween = [
                                new ScaleLine({ el: $(el).find('.home-challenge-item-line').get(0) }),
                                new FadeSplitText({ el: $(el).find('.home-challenge-item-label').get(0) }),
                                new FadeSplitText({ el: $(el).find('.home-challenge-item-title').get(0) }),
                                new FadeIn({ el: $(el).find('.home-challenge-item-ic').get(0) })
                            ]
                            if (idx === 0) {
                                tween.push(new FadeSplitText({ el: $(el).find('.home-challenge-item-desc-txt .txt-richtext p').get(0), splitType: 'lines' }))
                                tween.push(...Array.from($(el).find('.home-challenge-item-desc-txt .txt-richtext li')).map((li, idx) =>
                                    new FadeIn({ el: $(li).get(0), delay: idx === 0 ? '>=-1' : "<=.2" })))
                            }

                            return tween;
                        })
                    ]
                })
            }
            animationScrub() {
                this.tlCardStack = gsap.timeline({
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
                    this.tlCardStack
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
                this
            }
            handleAccordion() {
                $(this.el).find('.home-challenge-item').on('click', debounce(function (e) {
                    let current = $(e.target).closest('.home-challenge-item');
                    $(current).addClass('active').siblings().removeClass('active');
                }, 100))
            }
            destroy() {
                if (this.tlParallax.length > 0) {
                    this.tlParallax.forEach(tl => tl.kill());
                }
                if (this.tlCardStack) {
                    this.tlCardStack.kill();
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
                this.tlFadeHead = null;
                this.tlFadeBody = null;
            }
            trigger(data) {
                this.el = data.next.container.querySelector('.home-solution-wrap');
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                if(viewport.w > 767)  {
                    this.animationScrub();
                }
                this.animationReveal();
            }
            animationReveal() {
                let headingFlipping = new FlipText('.home-made-title-slide .txt-slider-wrap',
                    (idx) =>
                        setTimeout(() => {
                            $(this.el).find('.home-made-map-img').eq(idx).addClass('active').siblings().removeClass('active');
                        }, 1000)
                    );
                headingFlipping.setup();
                if (viewport.w < 991) {
                    new MasterTimeline({
                        triggerInit: this.el,
                        scrollTrigger: {
                            trigger: this.el,
                            start: `top top+=75%`
                        },
                        allowMobile: true,
                        tweenArr: [
                            new FadeSplitText({ el: $(this.el).find('.home-solution-label').get(0) }),
                            new FadeSplitText({ el: $(this.el).find('.home-solution-title').get(0) }),
                            new FadeSplitText({ el: $(this.el).find('.home-solution-desc').get(0) }),
                        ]
                    })
                    new MasterTimeline({
                        triggerInit: this.el,
                        scrollTrigger: {
                            trigger: this.el,
                            start: `top top+=75%`
                        },
                        allowMobile: true,
                        tweenArr: [
                            new FadeIn({ el: $(this.el).find('.home-solution-main-transform').get(0), clearProps: 'transform, opacity' }),
                            new FadeIn({ el: $(this.el).find('.home-solution-main-decor').get(0) }),
                            new FadeIn({ el: $(this.el).find('.home-solution-main-vid').get(0) })
                        ]
                    })
                }

                this.tlFadeHead = gsap.timeline({ paused: true })
                if (viewport.w < 767) {
                    // this.tlFadeHead = gsap.timeline({
                    //     trigger: $(this.el).find('.home-made-head'),
                    //     start: `top top+=75%`
                    // })
                }
                new MasterTimeline({
                    triggerInit: this.el,
                    timeline: this.tlFadeHead,
                    // allowMobile: true,
                    tweenArr: [
                        new FadeSplitText({ el: $(this.el).find('.home-made-title').get(0), onComplete: () => headingFlipping.play() }),
                        new FadeIn({ el: $(this.el).find('.home-made-map').get(0) })
                    ],
                })

                this.tlFadeBody = gsap.timeline({ paused: true })
                if (viewport.w < 767) {
                    // this.tlFadeBody = gsap.timeline({
                    //     trigger: $(this.el).find('.home-made-body'),
                    //     start: `top top+=75%`,
                    //     markers: true
                    // })
                }
                new MasterTimeline({
                    triggerInit: this.el,
                    timeline: this.tlFadeBody,
                    // allowMobile: true,
                    tweenArr: [
                        new ScaleLine({ el: $(this.el).find('.home-solution-line').get(0) }),
                        new ScaleLine({ el: $(this.el).find('.home-made-head-line').get(0) }),
                        ...Array.from($(this.el).find('.home-made-body-item')).flatMap((el, idx) => (
                            [
                                new FadeSplitText({ el: $(el).find('.home-made-body-item-title').get(0) }),
                                new FadeIn({ el: $(el).find('.home-made-body-item-title-ic').get(0) }),
                                new FadeSplitText({ el: $(el).find('.home-made-body-item-desc').get(0) }),
                                new FadeIn({ el: $(el).find('.home-made-body-item-ic').get(0) }),
                                new ScaleLine({ el: $(el).find('.home-made-body-item-line').get(0) })
                            ]
                        ))
                    ],
                    stagger: .03
                })
            }
            animationScrub() {
                if (viewport.w > 991) {
                    this.sections = this.el.querySelectorAll('section');
                    this.horizontalLayout(this.sections);

                    this.tlFadeShirt = gsap.timeline({
                        scrollTrigger: {
                            trigger: $(this.el).find('.home-solution'),
                            start: `top+=${viewport.h} bottom`,
                            end: `bottom-=${viewport.h * 2} bottom`,
                            scrub: 1,
                            anticipatePin: 1
                        },
                    })
                    this.tlFadeShirt.fromTo($(this.el).find('.home-solution-main-inner'), { autoAlpha: 0 }, { autoAlpha: 1 });

                    this.tlStickSol = gsap.timeline({
                        scrollTrigger: {
                            trigger: $(this.el).find('.home-solution'),
                            start: `top+=${viewport.h * .8} top`,
                            end: `bottom-=${viewport.h * .2} bottom`,
                            scrub: 1,
                            anticipatePin: 1
                        },
                    })

                    this.tlStickSol
                        .fromTo($(this.el).find('.home-solution-main-transform'), { bottom: '100%' }, { bottom: '0%' })
                        .fromTo($(this.el).find('.home-solution-main-vid-halftone'), { height: '100%' }, { height: '0%' }, "<=0")

                    //notes: animation overlap card

                    // this.tlStickMade = gsap.timeline({
                    //     scrollTrigger: {
                    //         trigger: $(this.el).find('.home-made'),
                    //         scrub: 1,
                    //         start: `top+=${$(this.el).find('.home-solution').height() - (viewport.h * 1.9)} top`,
                    //         end: 'bottom bottom',
                    //         anticipatePin: 1
                    //     }
                    // })

                    // const space_accord_process = parseInt($(this.el).find('.home-made-body-item-size').css('width'))
                    // this.el.querySelectorAll('.home-made-body-item').forEach((item, index) => {
                    //     if (($(this.el).find('.home-made-body-item').length - 1) > index) {
                    //         this.tlStickMade.to(item, { width: space_accord_process, ease: 'none' })
                    //         this.tlStickMade.to($(item).find('.home-made-body-item-desc'), {autoAlpha:0,ease:'none'}, '<')
                    //     }
                    //     else {
                    //         let space_accord_remaining = viewport.w - (space_accord_process * (this.el.querySelectorAll('.home-made-body-item').length - 1))
                    //         this.tlStickMade.to(item, { width: space_accord_remaining, ease: 'none' }, 0)
                    //     }
                    // })
                }

                // this.tlOverlap = gsap.timeline({
                //     scrollTrigger: {
                //         trigger: this.el,
                //         start: `bottom-=${viewport.h * 2} bottom`,
                //         end: `bottom bottom`,
                //         scrub: 1
                //     },
                // })
                // this.tlOverlap
                //     .to('.home-made-body', { scale: 0.8, transformOrigin: 'top', autoAlpha: 0.6, duration: 1, ease: 'power2.in' })
                //     .to('.home-made-title', { scale: .95, transformOrigin: 'bottom', autoAlpha: 0.6, duration: 1, ease: 'power2.in' }, "<=0")
                //     .fromTo('.home-made-map', { scale: 1, autoAlpha: 1 }, { scale: 1.05, autoAlpha: 0.6, duration: 1, ease: 'power2.in' }, "<=0")
            }
            horizontalLayout(sections) {
                let sizeScroller = $(this.el).find('.solution-scroller').height();
                gsap.set(this.el.querySelector('.home-solution-inner'), { display: 'flex' })
                ScrollTrigger.getAll().forEach(trigger => {
                    if (trigger.progress === 0) {
                        trigger.refresh();
                    }
                });

                let fadeIn = false;
                this.tlHorizontal = gsap.timeline({
                    scrollTrigger: {
                        trigger: $(this.el).find('.solution-scroller'),
                        start: `top+=${viewport.h * 1.5} top`,
                        end: `bottom+=${viewport.h * 1.5} bottom`,
                        scrub: 1,
                        anticipatePin: 1,
                        snap: 1,
                        onUpdate: (self) => {
                            if (self.progress > 0.5 && !fadeIn) {
                                fadeIn = true;
                                if (viewport.w >= 767) {
                                    this.tlFadeHead.play();
                                    this.tlFadeBody.play();
                                }
                            }
                        }
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
        News: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
                this.tlOverlap = null;
            }
            trigger(data) {
                this.el = data.next.container.querySelector('.home-news-wrap');
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.animationScrub();
                this.animationReveal();
            }
            animationReveal() {
                new MasterTimeline({
                    triggerInit: this.el,
                    scrollTrigger: { trigger: $(this.el).find('.home-news-main') },
                    allowMobile: true,
                    tweenArr: [
                        new FadeSplitText({ el: $(this.el).find('.home-news-label').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.home-news-title').get(0) }),
                        new ScaleLine({ el: $(this.el).find('.line-ver.home-news-main-line').get(0) }),
                        new ScaleLine({ el: $(this.el).find('.home-news-main-line').get(0) }),
                        ...Array.from($(this.el).find('.home-news-main-item')).flatMap((el, idx) => [
                            new FadeSplitText({ el: $(el).find('.home-news-main-item-label').get(0) }),
                            new FadeSplitText({ el: $(el).find('.home-news-main-item-title').get(0) }),
                            new ScaleLine({ el: $(el).find('.home-news-main-item-line').get(0) })
                        ])
                    ]
                })
            }
            animationScrub() {
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
            destroy() {
                if (this.tlOverlap) {
                    this.tlOverlap.kill();
                }
            }
        },
        CTA: class extends CTA {
            constructor() { super(); }
        },
        Footer: class extends Footer {
            constructor() { super(); }
        }
    }
    //p-product
    const ProductPage = {
        Hero: class {
            constructor() {
                this.el = null;
                this.tlOnce = null;
                this.tlEnter = null;
                this.tlTriggerEnter = null;
                this.rafID = null;
            }
            setup(data, mode) {
                this.el = data.next.container.querySelector('.prod-hero-wrap');
                if (mode === 'once') {
                    this.setupOnce(data);
                } else if (mode === 'enter') {
                    this.setupEnter(data);
                }
                else return;
                $(this.el).find('.prod-hero-main-marquee').each(function () {
                    new Marquee($(this).find('[data-marquee="list"]'), 40).setup(true);
                })
                this.dragTransform();
            }
            setupOnce(data) {
                this.tlOnce = gsap.timeline({
                    paused: true,
                    onStart: () => $('[data-init-hidden]').removeAttr('data-init-hidden')
                })

                this.animationReveal(this.tlOnce);
            }
            setupEnter(data) {
                this.tlEnter = gsap.timeline({
                    paused: true,
                    onStart: () => $('[data-init-hidden]').removeAttr('data-init-hidden')
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
                this.animationReveal(this.tlEnter);
            }
            playOnce() {
                this.tlOnce.play();
            }
            playEnter() {
                if (isInViewport(this.el)) {
                    this.tlEnter.play();
                }
            }
            dragTransform() {
                const scanInner = $(this.el).find('.prod-hero-decor-scan').get(0);
                const track = $(this.el).find('.prod-hero-decor-scan-inner').get(0);
                const maskItemBefore = $(this.el).find('.prod-hero-main-marquee.before').get(0);
                const maskItemAfter = $(this.el).find('.prod-hero-main-marquee.after').get(0);
                const blur = $(this.el).find('.prod-hero-decor-shape-inner').get(0)

                $(this.el).find('.prod-hero-decor-scan-inner').attr({
                    'data-mouse-down-at': scanInner.getBoundingClientRect().width / 2,
                    'data-percentage': -50,
                    'data-prev-percentage': -50
                });

                let isDragging = false;
                let targetPercentage = -50;
                let currentPercentage = -50;
                const MOVEMENT_THRESHOLD = 2;
                let hasMoved = false;

                const handleOnDown = (e) => {
                    if (viewport.w > 991 && !$(this.el).find('.prod-hero-decor-scan-drag-inner:hover').length) return;
                    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
                    track.dataset.mouseDownAt = clientX - scanInner.getBoundingClientRect().left;
                    track.dataset.prevPercentage = track.dataset.percentage || -50;
                    isDragging = true;
                };

                const handleOnUp = () => {
                    track.dataset.mouseDownAt = "0";
                    track.dataset.prevPercentage = currentPercentage;
                    isDragging = false;
                };

                const animate = () => {
                    if (isDragging && track.dataset.mouseDownAt !== "0") {
                        const mouseDelta = parseFloat(track.dataset.mouseDownAt) - (track.dataset.currentX || 0);
                        const maxDelta = scanInner.getBoundingClientRect().width;
                        const percentage = (mouseDelta / maxDelta) * -100;
                        const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) - percentage;
                        targetPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
                    }

                    currentPercentage = lerp(currentPercentage, targetPercentage, 0.1);
                    track.dataset.percentage = currentPercentage;

                    gsap.set([track, maskItemBefore, maskItemAfter], { '--hidden-mask': `${currentPercentage * -1}%` });
                    gsap.set(blur, { left: `${currentPercentage * -1}%` });

                    this.rafID = requestAnimationFrame(animate);
                };

                const handleOnMove = (e) => {
                    if (!isDragging) return;

                    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
                    track.dataset.currentX = clientX - scanInner.getBoundingClientRect().left;

                    const movement = Math.abs(parseFloat(track.dataset.currentX) - parseFloat(track.dataset.initialX));
                    if (movement > MOVEMENT_THRESHOLD) {
                        hasMoved = true;
                        track.dataset.mouseDownAt = track.dataset.currentX;
                    }
                };

                scanInner.onmousedown = (e) => handleOnDown(e);
                scanInner.ontouchstart = (e) => handleOnDown(e);

                scanInner.onmouseup = () => handleOnUp(e);
                scanInner.ontouchend = () => handleOnUp(e);

                scanInner.onmousemove = (e) => handleOnMove(e);
                scanInner.ontouchmove = (e) => handleOnMove(e);

                this.rafID = requestAnimationFrame(animate);
            }
            animationReveal(timeline) {
                new MasterTimeline({
                    timeline,
                    allowMobile: true,
                    tweenArr: [
                        new FadeIn({ el: $(this.el).find('.prod-hero-main.before').get(0), type: 'right' }),
                        new FadeIn({ el: $(this.el).find('.prod-hero-main.after').get(0), type: 'right', delay: "<=0" }),
                        new FadeIn({ el: $(this.el).find('.prod-hero-decor-scan').get(0), type: 'right' }),
                        new FadeIn({ el: $(this.el).find('.prod-hero-decor-shape-inner').get(0), type: 'right' }),
                        new FadeIn({ el: $(this.el).find('.prod-hero-decor-inner').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.prod-hero-title').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.prod-hero-desc').get(0) }),
                        new ScaleLine({ el: $(this.el).find('.prod-hero-line').get(0) })
                    ]
                });
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
                cancelAnimationFrame(this.rafID);
                this.rafID = null;
            }
        },
        Solution: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
            }
            trigger(data) {
                this.el = data.next.container.querySelector('.prod-solution-wrap');
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.animationReveal();
            }
            animationReveal() {
                new MasterTimeline({
                    triggerInit: this.el,
                    scrollTrigger: { trigger: this.el },
                    allowMobile: true,
                    tweenArr: [
                        new ScaleInset({ el: $(this.el).find('.prod-solution-thumb-inner').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.prod-solution-label').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.prod-solution-title').get(0) })
                    ]
                })

                new MasterTimeline({
                    triggerInit: this.el,
                    scrollTrigger: { trigger: $(this.el).find('.prod-solution-desc'), start: 'top top+=90%' },
                    allowMobile: true,
                    tweenArr: [
                        new FadeSplitText({ el: $(this.el).find('.prod-solution-desc-txt').get(0) }),
                        new FadeIn({ el: $(this.el).find('.prod-solution-btn').get(0), delay: "<=50%" })
                    ]
                })
            }
        },
        Benefit: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
            }
            trigger(data) {
                this.el = data.next.container.querySelector('.about-benefit-wrap');
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.animationReveal();
            }
            animationReveal() {
                new MasterTimeline({
                    triggerInit: this.el,
                    scrollTrigger: {
                        trigger: this.el,
                        start: `top top+=50%`
                    },
                    allowMobile: true,
                    tweenArr: [
                        new FadeSplitText({ el: $(this.el).find('.about-benefit-label').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.about-benefit-title').get(0) }),
                        new FadeIn({ el: $(this.el).find('.about-benefit-btn').get(0) })
                    ]
                })
                new MasterTimeline({
                    triggerInit: this.el,
                    scrollTrigger: {
                        trigger: this.el,
                        start: `top top+=50%`
                    },
                    allowMobile: true,
                    tweenArr: [
                        ...Array.from($(this.el).find('.about-benefit-item')).flatMap((el, idx) => [
                            new ScaleLine({ el: $(el).find('.line').get(0) }),
                            new FadeIn({ el: $(el).find('.about-benefit-item-ic').get(0) }),
                            new FadeSplitText({ el: $(el).find('.about-benefit-item-content').get(0) })
                        ])
                    ],
                    stagger: .08
                })
            }
        },
        HIW: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
                this.slider = null;
            }
            trigger(data) {
                this.el = data.next.container.querySelector('.prod-hiw-wrap');
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.interact();
                this.animationReveal();
            }
            interact() {
                this.cardSlide();
            }
            animationReveal() {
                new MasterTimeline({
                    triggerInit: this.el,
                    scrollTrigger: { trigger: $(this.el).find('.prod-hiw-text') },
                    allowMobile: true,
                    tweenArr: [
                        new FadeSplitText({ el: $(this.el).find('.prod-hiw-label').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.prod-hiw-title').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.prod-hiw-desc').get(0) })
                    ]
                })
                new MasterTimeline({
                    triggerInit: this.el,
                    scrollTrigger: { trigger: $(this.el).find('.prod-hiw-main') },
                    allowMobile: true,
                    tweenArr: [
                        new FadeIn({ el: $(this.el).find('.prod-hiw-main-active').get(0) }),
                        new FadeIn({ el: $(this.el).find('.home-hiw-main-decor').get(0) }),
                        ...Array.from($(this.el).find('.prod-hiw-main-item')).flatMap((el, idx) => ([
                            idx !== 0 && new FadeIn({ el: $(el).find('.prod-hiw-main-item-inner') }),
                            idx !== 0 && new FadeSplitText({ el: $(el).find('.prod-hiw-main-item-title').get(0) }),
                        ])),
                        new FadeIn({ el: $(this.el).find('.prod-hiw-main-ruler').get(0), onComplete: () => {
                            setTimeout(() => {
                                this.slider.startAutoplay();
                            }, 1000);
                            this.activeIndex(0);
                        } }),
                        new FadeSplitText({ el: $(this.el).find('.prod-hiw-main-content-item.active .prod-hiw-main-content-title').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.prod-hiw-main-content-item.active .prod-hiw-main-content-desc').get(0) })
                    ]
                })
            }
            cardSlide() {
                $(this.el).find(".prod-hiw-main-list").addClass('keen-slider');
                $(this.el).find(".prod-hiw-main-list > *").addClass('keen-slider__slide');
                gsap.set($(this.el).find('.prod-hiw-main-ruler-inner'), { '--progress': 0 });
                let cloneRuler = $(this.el).find('.prod-hiw-ruler-list').clone();
                $(this.el).find('.prod-hiw-main-ruler-inner').append(cloneRuler);
                let rulerW = $(this.el).find('.prod-hiw-main-ruler-inner').width();

                const animationSlide = {
                    start: () => {
                        gsap.to($(this.el).find('.prod-hiw-main-active'), { duration: .5, opacity: 0, filter: 'blur(2px)', scale: .98 });
                        gsap.to($(this.el).find('.prod-hiw-main-active-ic'), { duration: 1.5, filter: 'contrast(0.3)' });
                        gsap.to($(this.el).find('.prod-hiw-main-ruler-prog'), { scaleY: .9, duration: 1.5, opacity: .5 });
                        gsap.to($(this.el).find('.prod-hiw-main-ruler-inner'), { duration: 1.5, filter: 'blur(2px)' });
                    },
                    end: () => {
                        gsap.to($(this.el).find('.prod-hiw-main-active'), { duration: .5, opacity: 1, filter: 'blur(0px)', scale: 1, overwrite: true, clearProps: 'all' });
                        gsap.to($(this.el).find('.prod-hiw-main-active-ic'), { duration: 1.5, filter: 'contrast(1.5)',overwrite: true, clearProps: 'all'  });
                        gsap.to($(this.el).find('.prod-hiw-main-ruler-prog'), { scaleY: 1, duration: 1, opacity: 1, overwrite: true, clearProps: 'all'  });
                        gsap.to($(this.el).find('.prod-hiw-main-ruler-inner'), { duration: 1, filter: 'blur(0px)', overwrite: true });
                    },
                }
                const onSlide = () => {
                    setTimeout(animationSlide.start, 50);
                    setTimeout(animationSlide.end, 300);
                }

                let slider = new KeenSlider($(this.el).find(".prod-hiw-main-list").get(0), {
                    slides: {
                        perView: "auto",
                        spacing: parseRem(6)
                    },
                    defaultAnimation: {
                        duration: 1200,
                    },
                    loop: true,
                    mode: "snap",
                    breakpoints: {
                        "(min-width: 768px)": {
                            slides: {
                                perView: "auto",
                                spacing: parseRem(43)
                            },
                        },
                        "(min-width: 992px)": {
                            slides: {
                                perView: "auto",
                                spacing: parseRem(215)
                            },
                        },
                    },
                    rubberband: false,
                    created: () => {
                        $(this.el).find(".prod-hiw-main-list").css('grid-column-gap', 0);
                        setTimeout(() => this.activeIndex(-1), 500);
                    },
                    detailsChanged: (slider) => {
                        const details = slider.track.details;
                        const current = details.rel;
                        const total = details.slides.length;
                        let progress = slider.track.details.progress;
                        console.log(current)
                        this.activeIndex(current);
                        let progressX = ((progress * -50) * rulerW / 100) + (progress * parseRem(58));
                        let currentX = gsap.getProperty($(this.el).find('.prod-hiw-main-ruler-inner').get(0), 'x')
                        gsap.quickSetter($(this.el).find('.prod-hiw-main-ruler-inner'), 'x', 'px')(lerp(currentX, progressX, 0.25));

                        $(this.el).find('.slide-control.next').toggleClass('disable', current === details.maxIdx);
                        $(this.el).find('.slide-control.prev').toggleClass('disable', current === details.minIdx);

                        (viewport.w <= 767) && gsap.set($(this.el).find(".prod-hiw-main-progress-inner"), { scaleX: `${((current + 1) / total) * 100}%` })
                    },
                    dragStarted: (slider) => {
                        animationSlide.start();
                        $(this.el).find('.prod-hiw-main-slide').addClass('on-grabbing');
                    },
                    dragEnded: (slider) => {
                        animationSlide.end();
                        $(this.el).find('.prod-hiw-main-slide').removeClass('on-grabbing');
                    },
                },
                [(slider) => {
                    let timeout
                    let isAutoplay = false;

                    function nextTimeout() {
                        clearTimeout(timeout)
                        if (!isAutoplay) return;

                        timeout = setTimeout(() => {
                            slider.next();
                            onSlide();
                        }, 2900)
                    }

                    const startAutoplay = () => {
                        isAutoplay = true;
                        nextTimeout();
                    }

                    const stopAutoplay = () => {
                        isAutoplay = false;
                        clearTimeout(timeout);
                    }
                    slider.on("created", () => {
                        slider.container.onmouseover = () => stopAutoplay();
                        slider.container.ontouchmove = () => stopAutoplay();

                        slider.container.onmouseout = () => startAutoplay();
                        slider.container.ontouchend = () => startAutoplay();
                        nextTimeout();
                    })
                    slider.on("dragStarted", stopAutoplay);
                    slider.on("animationEnded", nextTimeout);
                    slider.on("updated", nextTimeout);

                    slider.startAutoplay = startAutoplay;
                    slider.stopAutoplay = stopAutoplay;
                }]
                )
                this.slider = slider;

                $(this.el).find('.slide-control.next').on('click', function() {
                    slider.next();
                    onSlide();
                });
                $(this.el).find('.slide-control.prev').on('click', function() {
                    slider.prev();
                    onSlide();
                });
            }
            activeIndex(idx) {
                $(this.el).find('.prod-hiw-main-item').removeClass('active');
                $(this.el).find(`.prod-hiw-main-item.step-${idx + 1}`).addClass('active');

                $(this.el).find('.prod-hiw-main-content-item').removeClass('active');
                $(this.el).find('.prod-hiw-main-content-item').eq(idx - 1).addClass('active');
            }
        },
        Compare: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
            }
            trigger(data) {
                this.el = data.next.container.querySelector('.prod-compare-wrap');
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.interact();
                this.animationReveal();
            }
            animationReveal() {
                new MasterTimeline({
                    triggerInit: this.el,
                    scrollTrigger: { trigger: $(this.el).find('.prod-compare-text') },
                    allowMobile: true,
                    tweenArr: [
                        new FadeSplitText({ el: $(this.el).find('.prod-compare-label').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.prod-compare-title').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.prod-compare-desc').get(0) }),
                    ]
                })
                new MasterTimeline({
                    triggerInit: this.el,
                    scrollTrigger: { trigger: $(this.el).find('.prod-compare-table-head') },
                    allowMobile: true,
                    tweenArr: [
                        new ScaleLine({ el: $(this.el).find('.prod-compare-table-head .prod-compare-table-line').get(0) }),
                        ...Array.from($(this.el).find('.prod-compare-table-title')).flatMap((el, idx) => new FadeSplitText({ el: $(el).get(0) }))
                    ]
                })
                new MasterTimeline({
                    triggerInit: this.el,
                    scrollTrigger: { trigger: $(this.el).find('.prod-compare-table-body') },
                    allowMobile: true,
                    tweenArr: [
                        ...Array.from($(this.el).find('.prod-compare-table-item')).flatMap((el, idx) => ([
                            new ScaleLine({ el: $(el).find('.prod-compare-table-line').get(0) }),
                            new FadeIn({ el: $(el).find('.prod-compare-table-item-ic').get(0) }),
                            new FadeSplitText({ el: $(el).find('.prod-compare-table-item-label-txt').get(0) }),
                            ...Array.from($(el).find('.prod-compare-table-item-content')).flatMap((item, idx) => ([
                                new FadeIn({ el: $(item).find('.prod-compare-table-item-content-ic').get(0) }),
                                new FadeSplitText({ el: $(item).find('.prod-compare-table-item-content-txt').get(0) })
                            ]))
                        ]))
                    ],
                    stagger: 0.05
                })
            }
            interact() {
                if (viewport.w < 767) {
                    this.cardSlide();
                }
            }
            cardSlide() {
                $(this.el).find(".prod-compare-table-body").addClass('keen-slider');
                $(this.el).find(".prod-compare-table-item").addClass('keen-slider__slide');
                $(this.el).find(".prod-compare-table-body").css('grid-column-gap', 0);
                let slider = new KeenSlider($(this.el).find(".prod-compare-table-body").get(0), {
                    slides: {
                        perView: 'auto',
                        spacing: parseRem(20),
                    },
                    defaultAnimation: {
                        duration: 1000
                    },
                    dragSpeed: 1.2,
                    rubberband: false,
                    detailsChanged: (slider) => {
                        const details = slider.track.details;
                        const current = details.rel;
                        const total = details.slides.length;
                        (viewport.w <= 767) && gsap.set($(this.el).find(".prod-compare-progress-inner"), { scaleX: `${((current + 1) / total) * 100}%` })
                    }
                })
            }
        },
        CTA: class extends CTA {
            constructor() { super(); }
        },
        Footer: class extends Footer {
            constructor() { super(); }
        }
    }
    // p-about
    const AboutPage = {
        Hero: class {
            constructor() {
                this.el = null;
                this.tlOnce = null;
                this.tlEnter = null;
                this.tlTriggerEnter = null;
            }
            setup(data, mode) {
                this.el = data.next.container.querySelector('.about-hero-wrap');
                if (mode === 'once') {
                    this.setupOnce(data);
                } else if (mode === 'enter') {
                    this.setupEnter(data);
                }
                else return;
            }
            setupOnce(data) {
                this.tlOnce = gsap.timeline({
                    paused: true,
                    onStart: () => $('[data-init-hidden]').removeAttr('data-init-hidden')
                })

                this.animationReveal(this.tlOnce);
            }
            setupEnter(data) {
                this.tlEnter = gsap.timeline({
                    paused: true,
                    onStart: () => $('[data-init-hidden]').removeAttr('data-init-hidden')
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
                this.animationReveal(this.tlEnter);
            }
            playOnce() {
                this.tlOnce.play();
            }
            playEnter() {
                if (isInViewport(this.el)) {
                    this.tlEnter.play();
                }
            }
            animationReveal(timeline) {
                new MasterTimeline({
                    timeline,
                    allowMobile: true,
                    tweenArr: [
                        new FadeIn({ el: $(this.el).find('.about-hero-circ-1').get(0), type: 'top' }),
                        new FadeIn({ el: $(this.el).find('.about-hero-circ-2').get(0),type: 'top', onComplete: () => $(this.el).find('.about-hero-circ-2').addClass('anim-rotation') }),
                        new FadeIn({ el: $(this.el).find('.about-hero-circ-3').get(0), type: 'top' }),
                        new ScaleInset({ el: $(this.el).find('.about-hero-main-logo').get(0), elInner: $(this.el).find('.about-hero-main-logo .logo').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.about-hero-title').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.about-hero-desc').get(0) })
                    ]
                });
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
        Story: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
            }
            trigger(data) {
                this.el = data.next.container.querySelector('.about-story-wrap');
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.interact();
                this.animationReveal();
            }
            animationReveal() {
                new MasterTimeline({
                    triggerInit: this.el,
                    scrollTrigger: { trigger: $(this.el).find('.about-story-text') },
                    allowMobile: true,
                    tweenArr: [
                        new FadeIn({ el: $(this.el).find('.about-story-ruler').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.about-story-label').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.about-story-title').get(0) })
                    ]
                })
                $(this.el).find('.about-story-item').each((idx, el) => {
                    (viewport.w > 767) && new ParallaxImage({ el: $(el).find('img').get(0) })

                    new MasterTimeline({
                        triggerInit: this.el,
                        scrollTrigger: { trigger: $(el) },
                        allowMobile: true,
                        tweenArr: [
                            new ScaleInset({ el: $(el).find('.about-story-item-img').get(0), elInner: $(el).find('.about-story-item-img-inner').get(0) }),
                            new FadeSplitText({ el: $(el).find('.about-story-item-content').get(0),  })
                        ]
                    })
                })
            }
            interact() {
                if (viewport.w <= 767) {
                    this.slideCard();
                }
            }
            slideCard() {
                $(this.el).find('.about-story-list').addClass('keen-slider');
                $(this.el).find('.about-story-item').addClass('keen-slider__slide');

                new KeenSlider($(this.el).find(".about-story-list").get(0), {
                    slides: {
                        perView: 'auto',
                        spacing: parseRem(20),
                    },
                    defaultAnimation: {
                        duration: 1000
                    },
                    dragSpeed: 1.2,
                    detailsChanged: (slider) => {
                        const details = slider.track.details;
                        const current = details.rel + 1;
                        const total = details.slides.length;
                        const progress = current / (total );

                        $(this.el).find(".about-story-progress-inner").css('width', `${progress * 100}%`);
                    },
                })
            }
        },
        Vision: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
            }
            trigger(data) {
                this.el = data.next.container.querySelector('.about-vision-wrap');
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger(data) {
                this.animationReveal();
            }
            animationReveal() {
                new MasterTimeline({
                    triggerInit: this.el,
                    scrollTrigger: { trigger: $(this.el).find('.about-vision-text') },
                    allowMobile: true,
                    tweenArr: [
                        new FadeSplitText({ el: $(this.el).find('.about-vision-label').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.about-vision-title').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.about-vision-desc').get(0) })
                    ]
                })

                new MasterTimeline({
                    triggerInit: this.el,
                    scrollTrigger: { trigger: $(this.el).find('.about-vision-thumb-logo') },
                    allowMobile: true,
                    tweenArr: [
                        new ScaleInset({ el: $(this.el).find('.about-vision-thumb-logo').get(0), elInner: $(this.el).find('.about-vision-thumb-logo .logo').get(0) }),
                        new ScaleInset({ el: $(this.el).find('.about-vision-thumb-inner').get(0) })
                    ]
                })
            }
        },
        Team: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
                this.tlOverlap = null;
                this.currentIdx = 0;
            }
            trigger(data) {
                this.el = data.next.container.querySelector('.about-team-wrap');
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.animationReveal();
                if (viewport.w > 767) {
                    this.animationScrub();
                }
            }
            animationReveal() {
                new MasterTimeline({
                    triggerInit: this.el,
                    scrollTrigger: { trigger: $(this.el).find('.about-team-text')  },
                    allowMobile: true,
                    tweenArr: [
                        new FadeSplitText({ el: $(this.el).find('.about-team-label').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.about-team-title').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.about-team-desc').get(0) }),
                        new FadeIn({ el: $(this.el).find('.about-team-btn').get(0) })
                    ]
                })

                if (viewport.w > 767) {
                    new MasterTimeline({
                        triggerInit: this.el,
                        scrollTrigger: { trigger: $(this.el).find('.about-team-main') },
                        allowMobile: true,
                        tweenArr: [
                            ...Array.from($(this.el).find('.about-team-info-avt-item')).flatMap((item, idx) => new FadeIn({ el: $(item).get(0) })),
                            new FadeIn({ el: $(this.el).find('.about-team-info-avt-active-wrap').get(0) }),
                            new ScaleInset({ el: $(this.el).find('.about-team-avt-item-inner').eq(0).get(0) }),
                            new FadeSplitText({ el: $(this.el).find('.about-team-info-item.active .about-team-info-name').get(0) }),
                            new FadeSplitText({ el: $(this.el).find('.about-team-info-item.active .about-team-info-role').get(0) }),
                            new FadeSplitText({ el: $(this.el).find('.about-team-info-item.active .about-team-info-desc').get(0) }),
                            new FadeIn({ el: $(this.el).find('.about-team-info-item.active .about-team-info-linkedin').get(0) }),
                            new ScaleLine({ el: $(this.el).find('.about-team-info-item.active .about-team-info-head .about-team-info-item-line').get(0) }),
                            ...Array.from($(this.el).find('.about-team-info-body')).flatMap((item, idx) => [
                                new FadeSplitText({ el: $(item).find('.about-team-info-body-label').get(0) }),
                                new FadeSplitText({ el: $(item).find('.about-team-info-body-richtext').get(0), isDisableRevert: true }),
                                ...Array.from($(item).find('li')).map((li, idx) => new FadeIn({ el: $(li).get(0) })),
                                new ScaleLine({ el: $(item).find('.about-team-info-item-line').get(0) })
                            ])
                        ]
                    })
                }
                else {
                    $(this.el).find('.about-team-info-item').each((idx, el) => (
                        new MasterTimeline({
                            triggerInit: this.el,
                            scrollTrigger: { trigger: $(el) },
                            allowMobile: true,
                            tweenArr: [
                                new ScaleInset({ el: $(el).find('.about-team-info-avt-inner').get(0) }),
                                new FadeSplitText({ el: $(el).find('.about-team-info-name').get(0) }),
                                new FadeSplitText({ el: $(el).find('.about-team-info-role').get(0) }),
                                new FadeSplitText({ el: $(el).find('.about-team-info-desc').get(0) }),
                                new FadeIn({ el: $(el).find('.about-team-info-linkedin').get(0) }),
                                new ScaleLine({ el: $(el).find('.about-team-info-head .about-team-info-item-line').get(0) }),
                            ]
                        })
                    ))
                }
            }
            animationScrub() {
                const itemLength = $(this.el).find('.about-team-info-item').length;
                const step = 1 / itemLength;
                const breakPoints = Array.from({ length: itemLength + 1 }, (_, index) => parseFloat((index * step).toPrecision(2)));

                this.tlActive = gsap.timeline({
                    scrollTrigger: {
                        trigger: $(this.el),
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 1,
                        onUpdate: (self) => {
                            onUpdateProgress(self.progress);
                        }
                    }
                })

                const activeIndex = (index) => {
                    $(this.el).find('.about-team-avt-item').eq(index).addClass('active').siblings().removeClass('active');
                    $(this.el).find('.about-team-info-item').eq(index).addClass('active').siblings().removeClass('active');

                    gsap.to($(this.el).find('.about-team-info-avt-active-inner'), { scale: .8, filter: 'blur(2px)', duration: .4, clearProps: 'all' });
                    gsap.to($(this.el).find('.about-team-info-avt-active-ic'), { filter: 'contrast(0.3)', duration: .4, clearProps: 'all' });
                    $(this.el).find('.about-team-info-avt-item').eq(index).addClass('active').siblings().removeClass('active');
                    setTimeout(() => {
                        $(this.el).find('.about-team-info-avt-active').css('grid-template-rows', `${index}fr 1fr ${itemLength - index - 1}fr`)
                    }, 100);
                }
                activeIndex(0);

                const scrollTop = window.scrollY || window.pageYOffset;
                const rectTop = $(this.el).get(0).getBoundingClientRect().top;
                $(this.el).find('.about-team-info-avt-item').on('click', function () {
                    // smoothScroll.lenis.scrollTo((scrollTop + rectTop) + (viewport.h * (viewport > 991 ? 1 : .25) * $(this).index()));
                })

                const onUpdateProgress = (progress) => {
                    for (let i = 0; i < breakPoints.length - 1; i++) {
                        const startPoint = breakPoints[i];
                        const endPoint = breakPoints[i + 1];

                        if (progress >= startPoint && progress < endPoint) {
                            if (this.currentIdx !== i) {
                                this.currentIdx = i;
                                activeIndex(this.currentIdx);
                            };
                        }
                    }
                }
            }
        },
        News: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
                this.tlOverlap = null;
            }
            trigger(data) {
                this.el = data.next.container.querySelector('.about-news-wrap');
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.animationScrub();
                this.animationReveal();
            }
            animationReveal() {
                new MasterTimeline({
                    triggerInit: this.el,
                    scrollTrigger: { trigger: $(this.el).find('.about-news-main') },
                    allowMobile: true,
                    tweenArr: [
                        new FadeSplitText({ el: $(this.el).find('.about-news-label').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.about-news-title').get(0) }),
                        new ScaleLine({ el: $(this.el).find('.line-ver.about-news-main-line').get(0) }),
                        new ScaleLine({ el: $(this.el).find('.about-news-main-line').get(0) }),
                        ...Array.from($(this.el).find('.about-news-main-item')).flatMap((el, idx) => [
                            new FadeSplitText({ el: $(el).find('.about-news-main-item-label').get(0) }),
                            new FadeSplitText({ el: $(el).find('.about-news-main-item-title').get(0) }),
                            new ScaleLine({ el: $(el).find('.about-news-main-item-line').get(0) })
                        ])
                    ]
                })
            }
            animationScrub() {
                new ParallaxImage({ el: this.el.querySelector('.about-news-thumb img') });
                this.tlOverlap = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el.querySelector('.about-news-thumb'),
                        start: `top 10%`,
                        end: `bottom bottom`,
                        endTrigger: this.el,
                        scrub: 1
                    },
                })
                .to($(this.el).find('.about-news-thumb-inner'), { scale: .9, autoAlpha: 0.5, duration: 1, ease: 'power2.in' })
            }
            destroy() {
                if (this.tlOverlap) {
                    this.tlOverlap.kill();
                }
            }
        },
        Job: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
            }
            trigger(data) {
                this.el = data.next.container.querySelector('.about-job-wrap');
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.interact();
                this.animationReveal();
            }
            animationReveal() {
                new MasterTimeline({
                    triggerInit: this.el,
                    scrollTrigger: { trigger: $(this.el).find('.about-job-main-text') },
                    allowMobile: true,
                    tweenArr: [
                        new FadeSplitText({ el: $(this.el).find('.about-job-main-label').get(0) }),
                        new FadeSplitText({ el: $(this.el).find('.about-job-main-title').get(0) }),
                        new FadeIn({ el: $(this.el).find('.about-job-main-control').get(0) }),
                        new FadeIn({ el: $(this.el).find('.about-job-main-cms').get(0) })
                    ]
                })
            }
            interact() {
                this.cardSlide();
            }
            cardSlide() {
                $(this.el).find(".about-job-main-list").addClass('keen-slider');
                $(this.el).find(".about-job-main-list").css('grid-column-gap', 0);
                $(this.el).find(".about-job-main-item").addClass('keen-slider__slide');
                let slider = new KeenSlider($(this.el).find(".about-job-main-list").get(0), {
                    slides: {
                        perView: 'auto',
                        spacing: parseRem(20),
                    },
                    defaultAnimation: {
                        duration: 1000
                    },
                    dragSpeed: 1.2,
                    rubberband: false,
                    breakpoints: {
                        "(min-width: 768px)": {
                            slides: { perView: 3, spacing: parseRem(20)  },
                        },
                        "(min-width: 992px)": {
                            slides: { perView: 4, spacing: parseRem(32) },
                        },
                    },
                    dragStarted: () => {
                        $(this.el).find('.about-job-main-item').css('pointer-events', 'none');
                    },
                    dragEnded: () => {
                        setTimeout(() => {
                            $(this.el).find('.about-job-main-item').css('pointer-events', '');
                        }, 250);
                    },
                    created: (slider) => {
                        const totalSlides = slider.track.details.slides.length;
                        const perView = slider.options.slides.perView;
                        if (totalSlides <= perView) {
                            $(this.el).find('.about-job-main-control').hide();
                        }
                    },
                    detailsChanged: (slider) => {
                        const details = slider.track.details;
                        const current = details.rel;
                        const total = details.slides.length;
                        const progress = (current + 1) / (total);

                        $(this.el).find(".about-job-progress-inner").css('width', `${progress * 100}%`);

                        $(this.el).find('.slide-control.next').toggleClass('disable', current === details.maxIdx);
                        $(this.el).find('.slide-control.prev').toggleClass('disable', current === details.minIdx);
                    }
                })
                $(this.el).find('.slide-control.next').on('click', slider.next);
                $(this.el).find('.slide-control.prev').on('click', slider.prev);
            }
            destroy() {
            }
        },
        CTA: class extends CTA {
            constructor() { super(); }
        },
        Footer: class extends Footer {
            constructor() { super(); }
        }
    }
    // p-contact
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
                    if ($(this).val().trim() !== '') {
                        $(this).addClass('has-value');
                    } else {
                        $(this).removeClass('has-value');
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
                $('.contact-hero-form-input[type="tel"]').bind('change keydown keyup', function (e) {
                    let inputVal = $(this).val();
                    $(this).val(inputVal.replace(/\D/g, ''));
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
        },
        Footer: class extends Footer {
            constructor() { super(); }
        }
    }
    //p-privacy
    const PrivacyPage = {
        Hero: class {
            constructor() {
                this.el = null;
                this.tlOnce = null;
                this.tlEnter = null;
                this.tlTriggerEnter = null;
            }
            setup(data, mode) {
                this.el = data.next.container.querySelector('.sub-hero');
                if (mode === 'once') {
                    this.setupOnce(data);
                } else if (mode === 'enter') {
                    this.setupEnter(data);
                }
                else return;
            }
            setupOnce(data) {
                this.tlOnce = gsap.timeline({
                    paused: true,
                    onStart: () => $('[data-init-hidden]').removeAttr('data-init-hidden')
                })

                // new MasterTimeline({
                //     timeline: this.tlOnce,
                //     allowMobile: true,
                //     tweenArr: [
                //         new FadeSplitText({ el: $(this.el).find('.home-hero-title').get(0) }),
                //         new FadeSplitText({ el: $(this.el).find('.home-hero-desc-txt').get(0) }),
                //         new FadeSplitText({ el: $(this.el).find('.home-hero-cta').get(0) }),
                //         new FadeIn({ el: $(this.el).find('.home-hero-main-gif').get(0) }),
                //         new FadeIn({ el: $(this.el).find('.home-hero-client').get(0), delay: "<=.3" }),
                //     ]
                // });
            }
            setupEnter(data) {
                this.tlEnter = gsap.timeline({
                    paused: true,
                    onStart: () => $('[data-init-hidden]').removeAttr('data-init-hidden')
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
        Content: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
                this.tlOverlap = null;
            }
            trigger(data) {
                this.el = data.next.container.querySelector('.sub-inner');
                super.setTrigger(this.el, this.onTrigger.bind(this));
            }
            onTrigger() {
                this.animationReveal();
                this.animationScrub();
                this.createTOC();
            }
            animationReveal() {

            }
            animationScrub() {
                this.tlOverlap = gsap
                    .timeline({
                        scrollTrigger: {
                            trigger: this.el,
                            start: `top top`,
                            end: `bottom top`,
                            endTrigger: $(this.el).find('.sub-hero'),
                            scrub: 1
                        },
                    })

                gsap.set($(this.el).find('.sub-hero'), { filter: 'brightness(1)' })
                this.tlOverlap
                    .to($(this.el).find('.sub-hero'), { filter: 'brightness(0)', duration: 1, ease: 'power2.in' }, 0)
                    .to($(this.el).find('.sub-hero-title'), { scale: 0.8, autoAlpha: 0, transformOrigin: 'top', duration: 1, ease: 'power2.in' }, 0)
            }
            createTOC() {
                let headings = $(this.el).find('.sub-content-main h2');
                let tocWrap = $(this.el).find('.sub-content-toc-list-inner');

                let tocClone = $(this.el).find('.sub-content-toc-item').clone();
                tocWrap.html('');
                headings.each(function (idx, heading) {
                    let text = $(heading).text().replace(/^\d+\.\s*/, '').replace(/\s*\([^)]*\)/g, '');
                    let id = text.toLowerCase().trim().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '');
                    let link = tocClone.clone();

                    $(heading).attr('id', id);
                    link.attr('href', `#${id}`);
                    link.find('.sub-content-toc-item-txt .txt').text(text);
                    link.find('.sub-content-toc-item-num .txt').text((idx + 1).toString().padStart(2, "0"));
                    tocWrap.append(link);
                })

                smoothScroll.lenis.on('scroll', function (e) {
                    let currScroll = e.scroll;
                    const updateHeadings = debounce(() => {
                        headings.each(function (idx, heading) {
                            let top = $(this).get(0).getBoundingClientRect().top;
                            let id = $(this).attr('id');
                            if (top > 0 && top < (viewport.h / 5)) {
                                $(`.sub-content-toc-item[href="#${id}"]`).addClass('active');
                                $('.sub-content-toc-item').not(`[href="#${id}"]`).removeClass('active');
                            }
                        });
                    }, 600);

                    updateHeadings();
                });

                $(this.el).find('.sub-content-toc-item').on('click', function (e) {
                    e.preventDefault();
                    let target = $(this).attr('href');

                    if ($("html").hasClass("lenis-smooth")) {
                        smoothScroll.lenis.scrollTo(target, {
                            offset: -100,
                        })
                    } else {
                        let targetTop = $(target).offset().top - 100;
                        $("html, body").animate({ scrollTop: targetTop }, 1200, 'exponentialEaseOut');
                    }

                    barba.history.add(`${window.location.pathname + target}`, 'barba', 'replace');
                    return false;
                })

                const currToc = window.location.hash;
                if ($(this.el).find(currToc).length) {
                    setTimeout(() => {
                        resetScroll();
                    }, 10)
                }
                else {
                    barba.history.add(`${window.location.pathname}`, 'barba', 'replace');
                }
                $('.sub-content-toc').height() >= viewport.h && $('.sub-content-toc-list-inner').attr('data-lenis-prevent', '');
            }
        }
    }
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
                if (section.playTrigger) {
                    section.playTrigger();
                }
            });
        }

        enterPlayHandler(event) {
            this.sections.forEach(section => {
                if (section.playEnter) {
                    section.playEnter(event.detail);
                }
                if (section.playTrigger) {
                    section.playTrigger();
                }
            });
        }

        setupHandler(event) {
            const data = event.detail;
            const mode = event.mode;
            this.sections.forEach(section => {
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
            container.removeEventListener("oncePlay", this.boundOncePlayHandler);
            container.removeEventListener("enterSetup", this.boundSetupHandler);
            container.removeEventListener("enterPlay", this.boundEnterPlayHandler);

            this.sections.forEach(section => {
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
        constructor(page) { super(page); }
    }
    class ProductPageManager extends PageManager {
        constructor(page) { super(page); }
    }
    class AboutPageManager extends PageManager {
        constructor(page) { super(page); }
    }
    class ContactPageManager extends PageManager {
        constructor(page) { super(page); }
    }
    class PrivacyPageManager extends PageManager {
        constructor(page) { super(page); }
    }

    const PageManagerRegistry = {
        home: new HomePageManager(HomePage),
        product: new ProductPageManager(ProductPage),
        about: new AboutPageManager(AboutPage),
        contact: new ContactPageManager(ContactPage),
        privacy: new PrivacyPageManager(PrivacyPage)
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
        product: {
            namespace: 'product',
            afterEnter(data) {
                PageManagerRegistry.product.initEnter(data);
            },
            beforeLeave(data) {
                PageManagerRegistry.product.destroy(data);
            }
        },
        about: {
            namespace: 'about',
            afterEnter(data) {
                PageManagerRegistry.about.initEnter(data);
            },
            beforeLeave(data) {
                PageManagerRegistry.about.destroy(data);
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
        privacy: {
            namespace: 'privacy',
            afterEnter(data) {
                PageManagerRegistry.privacy.initEnter(data);
            },
            beforeLeave(data) {
                PageManagerRegistry.privacy.destroy(data);
            }
        }
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
                resetScroll();
                header.init(data);
            },
            async leave(data) {
                await pageTrans.play(data);
            },
        }],
        views: VIEWS
    })
}

window.onload = script