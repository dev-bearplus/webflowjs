const script = () => {
    barba.use(barbaPrefetch);
    gsap.registerPlugin(ScrollTrigger);
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
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
            rect.left <= (window.innerWidth) &&
            rect.right >= 0
        );
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
            this.lenis = new Lenis({
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: "vertical",
                gestureOrientation: "both",
                smoothWheel: true,
                infinite: false,
            })
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
            this.list.css('animation-duration', `${Math.ceil(this.list.width() / this.duration)}s`);

            new Array(cloneAmount).fill().forEach(() => {
                let itemClone = this.list.find('[data-marquee="item"]').clone();
                this.list.append(itemClone);
            });
            this.list.addClass('anim-marquee');
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
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerEl,
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => setup(),
                }
            })
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
                new Marquee($(this.el).find('[data-marquee="list"'), 40).setup();
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
        Solution: class extends TriggerSetup {
            constructor() {
                super();
                this.el = null;
            }
            trigger(data) {
                this.el = data.next.container.querySelector('.home-solution-wrap');
                super.setTrigger(this.el, this.setup.bind(this));
            }
            setup() {
                this.sections = this.el.querySelectorAll('section');
                this.horizontalLayout(this.sections);
            }
            horizontalLayout(sections) {
                let sizeScroller = 0;
                let totalWidth = 0;
                let heightOverlap = $(window).height();
                gsap.set(this.el, { marginTop: heightOverlap * -1 })
                gsap.set(this.el.querySelector('.home-solution-inner'), { position: 'sticky', top: 0, display: 'flex' })
                gsap.set(this.el.querySelector('.home-solution-stick'), { width: $(window).width() })

                sections.forEach(function (slide, index) {
                    // gsap.set(slide, { width: window.innerWidth })
                    if (index < sections.length - 1) {
                        sizeScroller += slide.offsetWidth;
                    }
                    totalWidth += slide.offsetWidth;
                });
                gsap.set(this.el.querySelector('.solution-scroller'), { height: sizeScroller + heightOverlap })
                // gsap.set(this.el.querySelector('.home-solution-inner'), { width: totalWidth })

                gsap.to(this.el.querySelector('.home-solution-inner'),
                    {
                        scrollTrigger: {
                            trigger: '.solution-scroller',
                            start: `top+=${heightOverlap} top`,
                            end: 'bottom bottom',
                            scrub: true,
                            // markers:true,
                            invalidateOnRefresh: true,
                            anticipatePin:1,
                            fastScrollEnd:true
                        },
                        x: -sizeScroller,
                        transformOrigin: "top",
                        ease: "none",
                        onUpdate:()=>{

                        },
                        onComplete: () => {
                            ScrollTrigger.refresh();
                        }
                    }
                )
            }
            destroy() {
            }
        }
    }
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
                function checkFormStatusWithRAF() {
                    const formInner = document.querySelector('.contact-hero-form-inner');
                    const successBox = document.querySelector('.contact-hero-form-success');
                    if (!formInner || !successBox) return;
                    let rafId;
                    function check() {
                      const isHidden = window.getComputedStyle(formInner).display === 'none';
                      if (isHidden) {
                        formInner.classList.add('active');
                        successBox.classList.add('active');
                        cancelAnimationFrame(rafId);
                      } else {
                        rafId = requestAnimationFrame(check);
                      }
                    }
                    rafId = requestAnimationFrame(check);
                  }
                  checkFormStatusWithRAF();


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
    class Footer extends TriggerSetup {
        constructor() {
            super();
        }
        setup() {
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
    const footer = new Footer('.footer-cta');
    class PageManager {
        constructor(sections = []) {
            this.sections = sections;

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
        constructor() {
            const hero = new HomePage.Hero();
            const solution = new HomePage.Solution();
            super([hero, solution]);
        }
    }

    const homePageManager = new HomePageManager();
    class ContactPageManager extends PageManager {
        constructor() {
            const hero = new ContactPage.Hero();
            super([hero]);
        }
    }

    const contactPageManager = new ContactPageManager();
    const PageManagerRegistry = {
        home: new HomePageManager(),
        contact: new ContactPageManager()
    };
    const SCRIPT = {
        home: {
            namespace: 'home',
            afterEnter(data) {
                homePageManager.initEnter(data);
            },
            beforeLeave(data) {
                homePageManager.destroy(data);
            }
        },
        contact: {
            namespace: 'contact',
            afterEnter(data) {
                contactPageManager.initEnter(data);
            },
            beforeLeave(data) {
                contactPageManager.destroy(data);
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
                footer.setup();
                PageManagerRegistry[namespace]?.initOnce?.(data);

            },
            async leave(data) {
                await pageTrans.play(data);
            },
        }],
        views: VIEWS
    })
}

window.onload = script