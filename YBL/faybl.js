
const mainScript = () => {
    // Get is_login value from cookies
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    };
    const isLogin = getCookie('is_login')
    const pathname = window.location.pathname
    const isPathNotRedirect = pathname.includes('privacy-policy') || pathname.includes('terms-of-use')
    console.log('isLogin', isLogin)

    if (isLogin && !isPathNotRedirect) {
        window.location.href = 'https://app.faybl.com/'
    }

    gsap.registerPlugin(ScrollTrigger);

    $('html').css('scroll-behavior', 'auto');
    $('html').css('height', 'auto');

    let lenis = new Lenis({})

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    const viewport = {
        w: window.innerWidth,
        h: window.innerHeight
    }
    const pointer = {
        x: $(window).width() / 2,
        y: $(window).height() / 2,
        xNor: $(window).width() / 2 / $(window).width(),
        yNor: $(window).height() / 2 / $(window).height()
    }
    const xSetter = (el) => gsap.quickSetter(el, 'x', `px`);
    const ySetter = (el) => gsap.quickSetter(el, 'y', `px`);
    const xGetter = (el) => gsap.getProperty(el, 'x');
    const yGetter = (el) => gsap.getProperty(el, 'y');
    const lerp = (a, b, t = 0.08) => {
        return a + (b - a) * t;
    }
    const isTouchDevice = () => {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    }
    if (!isTouchDevice()) {
        $('html').attr('data-has-cursor', 'true')
        window.addEventListener('pointermove', function (e) {
            updatePointer(e)
        })
    } else {
        $('html').attr('data-has-cursor', 'false')
        window.addEventListener('pointerdown', function (e) {
            updatePointer(e)
        })
    }
    function customLinkRichText(el) {
        $(el).find('a').each(function (idx, item) {
            $(item).attr('data-link-prevent', 'true')
        })
    }
    function updatePointer(e) {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        pointer.xNor = ((e.clientX / $(window).width()) - .5) * 2;
        pointer.yNor = ((e.clientY / $(window).height()) - .5) * 2;
        if (cursor.userMoved != true) {
            cursor.userMoved = true;
            cursor.init()
        }
    }
    const parseRem = (input) => {
        return (input / 10) * parseFloat($("html").css("font-size"));
    };
    function isInHeaderCheck(el) {
        const rect = $(el).get(0).getBoundingClientRect();
        const headerRect = $('.header').get(0).getBoundingClientRect();
        return (
            rect.bottom >= 0 &&
            rect.top - headerRect.height / 2 <= 0
        );
    }
    let currentSpaceName = $(".main").attr("data-barba-namespace");
    console.log(currentSpaceName)
    let ratioScrollHeader = viewport.w > 767 ? 1 : .5;
    if (currentSpaceName == 'product') {
        ratioScrollHeader = viewport.w > 767 ? 0 : .5;
    }
    $('.product-cta-close').on('click', function () {
        $('.product-cta').slideUp();
    })
    const HEADER = {
        toggleHide: (inst) => {
            const scrollTop = document.documentElement.scrollTop || window.scrollY
            if ($('.header').hasClass('active')) return;
            const isScrollHeader = scrollTop > $('.header-container').height() * (viewport.w > 767 ? 4 : 1.5)
            let debounceTimer;

            debounceTimer && clearTimeout(debounceTimer);

            debounceTimer = setTimeout(() => {
                if (isScrollHeader) {
                    if (inst.direction >= 1) {
                        $('.header').addClass('on-hide');
                        $('.term-content-menu').addClass('on-top');
                    } else {
                        $('.header').removeClass('on-hide');
                        $('.term-content-menu').removeClass('on-top');
                    }
                } else {
                    $('.header').removeClass('on-hide');
                    $('.term-content-menu').removeClass('on-top');
                }
            }, 100);
        },
        toggleOnScroll: (inst) => {
            const scrollTop = document.documentElement.scrollTop || window.scrollY
            const isScrollHeader = scrollTop > $('.header-container').height() * ratioScrollHeader
            let debounceTimer;
            debounceTimer && clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                if (isScrollHeader) {
                    $('.header').addClass('on-scroll');
                    $('.header').addClass('on-expand');
                } else {
                    $('.header').removeClass('on-scroll');
                    $('.header').removeClass('on-expand');
                }
            }, 100);
        },
        toggleDarkMode: () => {
            let elArr = Array.from($('[data-section="dark"]'));
            if (elArr.some(function (el) { return isInHeaderCheck(el) })) {
                $('.header').addClass('on-dark');
            } else {
                $('.header').removeClass('on-dark');
            }
        },
    }
    function setupMarquee(marqueeClass) {
        marqueeClass.each(function (index, item) {
            console.log($(item).find("[data-marquee = inner]").width())
            const width = $(item).find("[data-marquee = inner]").width();
            const length = Math.floor($(item).width() / width) + 1;
            const time = viewport.w > 767 ? $(item).find("[data-marquee = inner]").width() / 100 : $(item).find("[data-marquee = inner]").width() / 50;
            for (var i = 0; i < length; i++) {
                let $originalListLogo = $(item).find("[data-marquee = inner]").eq(0);
                let $clonedListLogo = $originalListLogo.clone();
                $(item).append($clonedListLogo);
            }
            $(item).find("[data-marquee = inner]").css("animation-duration", `${time}s`);
            $(item).find("[data-marquee = inner]").addClass("anim");
        });
    }

    const enterLeaveTransition = () => {
        $("a:not([data-link-prevent])").on('click', function (e) {
            const href = $(this).attr('href');
            if ($(this).attr('target') === '_blank') return;
            if (href && href === '#') return;
            e.preventDefault();

            const tl = gsap.timeline({
                onStart: () => {
                    $('.header').removeClass('active');
                },
                onComplete: () => {
                    window.history.pushState({ url: window.location.href }, '');
                    window.location.href = href;
                }
            });
            tl
                .set('.loader', { autoAlpha: 1 })
                .set('.faybl-logo', { opacity: 0 })
                .fromTo('.loader', { yPercent: 100 }, { yPercent: 0, duration: .6, ease: 'circ.in' })
        })
    }
    class TriggerSetup {
        constructor(triggerEl) {
            this.tlTrigger;
            this.triggerEl = triggerEl;
        }
        setTrigger(setup) {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: this.triggerEl,
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => setup(),
                }
            })
        }
    }
    class Loading {
        constructor() {

        }
        isDoneLoading() {
            return true;
        }
    }
    let load = new Loading;

    class Cursor {
        constructor() {
            this.targetX = pointer.x;
            this.targetY = pointer.y;
            this.userMoved = false;
            xSetter('.cursor-main')(this.targetX)
            ySetter('.cursor-main')(this.targetY)
        }
        init() {
            requestAnimationFrame(this.update.bind(this))
            $('.cursor-main .cursor-inner').addClass('active')
        }
        isUserMoved() {
            return this.userMoved;
        }
        update() {
            if (this.userMoved || load.isDoneLoading()) {
                this.updatePosition()
            }
            requestAnimationFrame(this.update.bind(this))
        }
        updatePosition() {
            this.targetX = pointer.x;
            this.targetY = pointer.y;
            let targetInnerX = xGetter('.cursor-main');
            let targetInnerY = yGetter('.cursor-main');

            if ($('[data-cursor]:hover').length) {
                this.onHover()
            } else {
                this.reset()
            }

            if (Math.hypot(this.targetX - targetInnerX, this.targetY - targetInnerY) > 1 || Math.abs(lenis.velocity) > .1) {
                xSetter('.cursor-main')(lerp(targetInnerX, this.targetX, 0.1))
                ySetter('.cursor-main')(lerp(targetInnerY, this.targetY - lenis.velocity / 16, 0.1))
            }
        }
        onHover() {
            let type = $('[data-cursor]:hover').attr('data-cursor');
            let gotBtnSize = false;
            if ($('[data-cursor]:hover').length) {
                switch (type) {
                    case 'drag':
                        $('.cursor-inner').addClass('on-hover-drag')
                        break;
                    default:
                        break;
                }
            }
            else {
                gotBtnSize = false;

            }
        }
        reset() {
            $('.cursor-inner').removeClass('on-hover-drag')
        }
    }
    let cursor = new Cursor;
    class TriggerSetupHero {
        constructor() {
        }
        init(play) {
            let tl = gsap.timeline({
                onStart: () => {
                    setTimeout(() => play(), viewport.w > 767 ? 2000 : 1200);
                }
            });
            tl
                .fromTo('.loader', { yPercent: 0 }, { yPercent: -100, duration: .8, delay: viewport.w > 767 ? 1.6 : 1, ease: 'quart.in' })
                .fromTo('.faybl-logo', { y: 0 }, { y: viewport.h + 20, duration: .8, ease: 'quart.in' }, '<=0')

            window.addEventListener("pageshow", function (event) {
                event.preventDefault();
                var historyTraversal = event.persisted ||
                    (typeof window.performance != "undefined" &&
                        window.performance.navigation.type === 2);
                if (historyTraversal) {
                    const href = window.location.href;
                    gsap.fromTo('.loader', { yPercent: 0 }, { yPercent: 100, delay: 1, duration: .5, ease: 'circ.in' })
                }
            })
        }
    }
    class HomeHero extends TriggerSetupHero {
        constructor() {
            super();
            this.tl = null;
        }
        trigger() {
            this.setup();
            super.init(this.play.bind(this));
        }
        setup() {
            this.tl = gsap.timeline({
                onStart: () => {
                    console.log("start")
                    $('[data-init-df]').removeAttr('data-init-df');
                },
                paused: true
            });
            new MasterTimeline({
                timeline: this.tl,
                allowMobile: true,
                tweenArr: [
                    new FadeSplitText({ el: $('.home-hero-title').get(0), onMask: true, headingType: true }),
                    new FadeSplitText({ el: $('.home-hero-sub').get(0), onMask: true, delay: '<=.4' }),
                    new FadeIn({ el: $('.home-hero-act-request').get(0), delay: "<=0" }),
                    new FadeIn({ el: $('.home-hero-act-key').get(0) }),
                    new ScaleInset({ el: $('.home-hero-video').get(0) }),
                ]
            });
        }
        play() {
            this.tl.play();
        }
    }
    const homeHero = new HomeHero();

    class HomeUser extends TriggerSetup {
        constructor(triggerEl) {
            super(triggerEl);
        }
        trigger() {
            super.setTrigger(this.setup.bind(this));
        }
        setup() {
            new MasterTimeline({
                triggerInit: this.triggerEl,
                scrollTrigger: { trigger: '.home-user', start: 'top 60%' },
                tweenArr: [
                    new FadeIn({ el: $('.home-user-content').get(0), from: { y: 50 } }),
                    new FadeIn({ el: $('.home-user-thumb').get(0), from: { y: 50 } }),
                    new ScaleInset({ el: $('.home-user-thumb-inner').get(0) }),
                    new FadeIn({ el: $('.home-user-content-ic').get(0), delay: "<=0" }),
                    new FadeSplitText({ el: $('.home-user-content-sub').get(0), onMask: true }),
                    new FadeSplitText({ el: $('.home-user-content-name').get(0), onMask: true, breakType: 'words', delay: "<=.6" }),
                    new FadeSplitText({ el: $('.home-user-content-position').get(0), onMask: true, breakType: 'words' }),
                ]
            })
        }
    }
    const homeUser = new HomeUser('.home-user-wrap');

    class HomeFeature extends TriggerSetup {
        constructor(triggerEl) {
            super(triggerEl);
        }
        trigger() {
            super.setTrigger(this.setup.bind(this));
        }
        setup() {
            setupMarquee($('.home-feature-item-marquee-wrap'));
            if (viewport.w < 768) {
                $('.home-feature-list').addClass('swiper');
                $('.home-feature-list-inner').addClass('swiper-wrapper');
                $('.home-feature-item').addClass('swiper-slide');
                let swiper = new Swiper('.home-feature-list', {
                    slidesPerView: 1,
                    spaceBetween: parseRem(10),
                    pagination: {
                        el: '.home-feature-pagi',
                        bulletClass: 'home-feature-pagi-item',
                        bulletActiveClass: 'active',
                        clickable: true,
                    }
                });
            }
            new MasterTimeline({
                triggerInit: this.triggerEl,
                scrollTrigger: { trigger: '.home-feature-title-wrap' },
                tweenArr: [
                    new FadeIn({ el: $('.home-feature-label').get(0) }),
                    new FadeSplitText({ el: $('.home-feature-title').get(0), onMask: true, headingType: true, delay: "<=.2" }),
                    new FadeSplitText({ el: $('.home-feature-sub').get(0), onMask: true, delay: "<=.3" })
                ]
            })

            viewport.w > 767 && gsap.set('.home-feature-item', { autoAlpha: 0 });
            $.each($('.home-feature-item'), function (idx, el) {
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 75%',
                    }
                });
                viewport.w > 767 && tl.to(el, { autoAlpha: 1, duration: 0.6 });
                if ($(el).find('.home-feature-item-img').length > 0) {
                    new MasterTimeline({
                        timeline: tl,
                        tweenArr: [
                            // new ScaleInset({ el: $(el).find('.home-feature-item-img').get(0) }),
                            new FadeSplitText({ el: $(el).find('.home-feature-item-title').get(0), onMask: true, delay: "<=.5" }),
                            new FadeSplitText({ el: $(el).find('.home-feature-item-sub').get(0), onMask: true, delay: "<=.3" }),
                        ]
                    })
                }
                else {
                    new MasterTimeline({
                        timeline: tl,
                        tweenArr: [
                            new FadeSplitText({ el: $(el).find('.home-feature-item-title').get(0), onMask: true, delay: "<=.5" }),
                            new FadeSplitText({ el: $(el).find('.home-feature-item-sub').get(0), onMask: true, delay: "<=.3" }),
                        ]
                    })
                }
            })



        }
    }
    const homeFeature = new HomeFeature('.home-feature-wrap');

    class HomeWhy extends TriggerSetup {
        constructor(triggerEl) {
            super(triggerEl);
        }
        trigger() {
            super.setTrigger(this.setup.bind(this));
        }
        setup() {
            new MasterTimeline({
                triggerInit: this.triggerEl,
                scrollTrigger: { trigger: '.home-why-title-wrap' },
                tweenArr: [
                    new FadeIn({ el: $('.home-why-label').get(0) }),
                    new FadeSplitText({ el: $('.home-why-title').get(0), onMask: true, headingType: true }),
                    ...$('.home-why-control-btn').map((idx, el) => new FadeIn({ el })),
                ]
            })

            new MasterTimeline({
                triggerInit: this.triggerEl,
                scrollTrigger: { trigger: '.home-why-cms-wrap', from: 'top 70%' },
                tweenArr: [
                    ...Array.from($('.home-why-item')).flatMap((el, idx) => {
                        let delayI = (index, initDelay = .1) => (index !== 0 ? initDelay * (index + 1) : initDelay);
                        return [
                            new FadeIn({ el, isDisableRevert: true, from: { y: parseRem(50), delay: delayI(idx) } }),
                            new FadeSplitText({ el: $(el).find(".home-why-item-title").get(0), onMask: true, delay: delayI(idx, .15) }),
                            new FadeSplitText({ el: $(el).find(".home-why-item-sub").get(0), onMask: true, delay: delayI(idx, .15) }),
                            new ScaleInset({ el: $(el).find('.home-why-item-img').get(0), delay: delayI(idx, .15) })
                        ];
                    })
                ]
            })

            let swiper = new Swiper('.home-why-cms', {
                slidesPerView: 1,
                spaceBetween: parseRem(10),
                pagination: {
                    el: '.home-why-pagi',
                    bulletClass: 'home-why-pagi-item',
                    bulletActiveClass: 'active',
                    clickable: true,
                },
                on: {
                    init: function () {
                        let realIndex = this.realIndex;
                        toggleControl(realIndex);
                    },
                    slideChange: function () {
                        let realIndex = this.realIndex;
                        console.log(realIndex);
                        toggleControl(realIndex);
                    }
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                        spaceBetween: parseRem(10),
                    },
                    991: {
                        slidesPerView: 'auto',
                        slidesPerGroup: 4,
                        spaceBetween: parseRem(20),
                    }
                }
            });
            function toggleControl(realIndex) {
                $('.home-why-control-btn').addClass('active');
                let totalSlide;
                if (viewport.w < 768) {
                    totalSlide = $('.home-why-cms .swiper-slide').length - 1;
                } else if (viewport.w < 991) {
                    totalSlide = $('.home-why-cms .swiper-slide').length - 2;
                }
                else {
                    totalSlide = $('.home-why-cms .swiper-slide').length - 4;
                }
                if (realIndex === totalSlide) {
                    $('.home-why-control-btn[target = next]').removeClass('active');
                } else if (realIndex === 0) {
                    $('.home-why-control-btn[target = prev]').removeClass('active');
                }
            }
            $('.home-why-control-btn').on('click', function () {
                let realIndex = swiper.realIndex;
                let target = $(this).attr('target');
                console.log(target)
                if (target === 'next') {
                    swiper.slideNext();
                } else {
                    swiper.slidePrev();
                }
            })
        }
    }
    const homeWhy = new HomeWhy('.home-why-wrap');

    class HomeTesti extends TriggerSetup {
        constructor(triggerEl) {
            super(triggerEl);
        }
        trigger() {
            super.setTrigger(this.setup.bind(this));
        }
        setup() {
            if (viewport.w < 768) {
                $('.home-testi-cms').addClass('swiper');
                $('.home-testi-list').addClass('swiper-wrapper');
                $('.home-testi-item').addClass('swiper-slide');
                let swiper = new Swiper('.home-testi-cms', {
                    slidesPerView: 1,
                    spaceBetween: parseRem(10),
                    pagination: {
                        el: '.home-testi-pagi',
                        bulletClass: 'home-testi-pagi-item',
                        bulletActiveClass: 'active',
                        clickable: true,
                    }
                });
            }
            else {
                setupMarquee($('.home-testi-cms'));
            }
            new MasterTimeline({
                triggerInit: this.triggerEl,
                scrollTrigger: { trigger: '.home-testi-title-wrap' },
                tweenArr: [
                    new FadeIn({ el: $('.home-testi-label').get(0) }),
                    new FadeSplitText({ el: $('.home-testi-title').get(0), onMask: true }),
                ]
            })
            new MasterTimeline({
                triggerInit: this.triggerEl,
                scrollTrigger: { trigger: '.home-testi-cms-wrap', from: 'top 70%' },
                tweenArr: [
                    ...Array.from($('.home-testi-item')).flatMap((el, idx) => {
                        let delayI = (index, initDelay = .1) => (index !== 0 ? initDelay * (index + 1) : initDelay);
                        return [
                            new FadeIn({ el: $(el).find(".home-testi-item-content").get(0), delay: delayI(idx, .15) }),
                            new FadeIn({ el: $(el).find('.home-testi-item-img').get(0), delay: delayI(idx, .15) })
                        ];
                    })
                ]
            })

        }
    }
    const homeTesti = new HomeTesti('.home-testi-wrap');

    class AboutHero extends TriggerSetupHero {
        constructor() {
            super();
            this.tl = null;
        }
        trigger() {
            this.setup();
            super.init(this.play.bind(this));
        }
        setup() {
            this.tl = gsap.timeline({
                onStart: () => {
                    console.log("start")
                    $('[data-init-df]').removeAttr('data-init-df');
                },
                paused: true
            });
            new MasterTimeline({
                timeline: this.tl,
                allowMobile: true,
                tweenArr: [
                    new FadeSplitText({ el: $('.about-hero-title').get(0), onMask: true, headingType: true }),
                    new FadeSplitText({ el: $('.about-hero-sub').get(0), onMask: true, delay: '<=.3' }),
                    new ScaleInset({ el: $('.about-hero-img').get(0) }),
                    new FadeIn({ el: $('.about-hero-content').get(0), delay: "<=0" }),
                    new FadeSplitText({ el: $('.about-hero-content-txt').get(0), delay: "<=0" }),
                    new FadeIn({ el: $('.about-hero-content-btn').get(0) }, '<=.6'),
                ]
            });
        }
        play() {
            this.tl.play();
        }
    }
    const aboutHero = new AboutHero();

    class AboutVision extends TriggerSetup {
        constructor(triggerEl) {
            super(triggerEl);
        }
        trigger() {
            super.setTrigger(this.setup.bind(this));
        }
        setup() {
            let heightContainer = $('.about-vision .container').height();
            $('.about-vision-wrap').css('height', heightContainer);
            let tlTransfrom = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-vision-wrap .container',
                    start: 'top bottom-=50%',
                    end: 'bottom top',
                    scrub: 1,
                }
            });
            tlTransfrom
                .fromTo('.about-vision-content-deco', { y: 0 }, { y: -heightContainer, ease: 'none' })
            $('.about-vision-content-deco-item').each((idx, item) => {
                let image = $(item).find('img');
                const yPercentRandomVal = gsap.utils.random(10, 30);
                let scaleItem = 1 + (yPercentRandomVal / 100);
                gsap.set(image, { scale: scaleItem });
                let tlItem = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    }
                })
                requestAnimationFrame(() => {
                    tlItem.fromTo(image, { yPercent: -yPercentRandomVal / 2 }, { yPercent: yPercentRandomVal / 2 })
                })
            })
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-vision-content',
                    start: 'top top+=65%',
                }
            })
            new MasterTimeline({
                timeline: tl,
                tweenArr: [
                    new FadeIn({ el: $('.about-vision-label').get(0) }),
                    new FadeSplitText({ el: $('.about-vision-title').get(0), onMask: true, headingType: true }),
                    ...Array.from($('.about-vision-content-deco-item')).flatMap((el, idx) => new FadeIn({ el })),
                ]
            })
        }
    }
    const aboutVision = new AboutVision('.about-vision-wrap');
    class AboutService extends TriggerSetup {
        constructor(triggerEl) {
            super(triggerEl);
        }
        trigger() {
            super.setTrigger(this.setup.bind(this));
        }
        setup() {
            $('.about-service-content').each((idx, item) => {
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: 'top top+=65%',
                    }
                });
                new MasterTimeline({
                    timeline: tl,
                    tweenArr: [
                        new FadeSplitText({ el: $(item).find('.about-service-content-title').get(0), onMask: true, headingType: true }),
                        ...Array.from($(item).find('.about-service-content-sub')).flatMap((el, idx) => new FadeSplitText({ el, onMask: true, delay: "<=.3" })),
                    ]
                })
            })
            $('.about-service-img').each((idx, item) => {
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: 'top top+=65%',
                    }
                });
                new MasterTimeline({
                    timeline: tl,
                    tweenArr: [
                        new ScaleInset({ el: $(item).find('.about-service-img-inner').get(0) }),
                    ]
                })
            })
        }
    }
    const aboutService = new AboutService('.about-service-wrap');
    class AboutContact extends TriggerSetup {
        constructor(triggerEl) {
            super(triggerEl);
        }
        trigger() {
            super.setTrigger(this.setup.bind(this));
        }
        setup() {
            $('.about-contact-map-item').on('click', function () {
                let index = $(this).index();
                $('.about-contact-map-item').removeClass('active');
                $(this).addClass('active');
                $('.about-contact-img-inner').removeClass('active');
                $('.about-contact-img-inner').eq(index).addClass('active');
            })
            let tl = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-contact-content',
                    start: 'top top+=65%',
                }
            });
            new MasterTimeline({
                timeline: tl,
                tweenArr: [
                    new FadeIn({ el: $('.about-contact-content-label').get(0) }),
                    new FadeSplitText({ el: $('.about-contact-title').get(0), onMask: true, headingType: true, delay: '.1' }),
                    ...Array.from($('.about-contact-map-item')).flatMap((el, idx) => {
                        return [
                            new FadeIn({ el }),
                            new FadeSplitText({ el: $(el).find('.about-contact-map-item-title').get(0), delay: "<=.3" }),
                            new FadeSplitText({ el: $(el).find('.about-contact-map-item-sub').get(0), onMask: true, delay: "<=.1" }),
                            new FadeSplitText({ el: $(el).find('.about-contact-map-item-link .txt').get(0), delay: "<=.2" })
                        ]
                    }
                    ),
                ]
            })
            let tlImg = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-contact-img',
                    start: 'top top+=65%',
                }
            })
            new MasterTimeline({
                timeline: tlImg,
                tweenArr: [
                    new ScaleInset({ el: $('.about-contact-img-inner').get(0) }),
                ]
            })
        }
    }
    const aboutContact = new AboutContact('.about-contact-wrap');
    class AboutTeam extends TriggerSetup {
        constructor(triggerEl) {
            super(triggerEl);
        }
        trigger() {
            super.setTrigger(this.setup.bind(this));
        }
        setup() {
            if (viewport.w < 992) {
                $('.about-team-person-wrap').each((idx, item) => {
                    $(item).find('.about-team-person-inner').addClass('swiper');
                    $(item).find('.about-team-person').addClass('swiper-wrapper');
                    $(item).find('.about-team-person-item').addClass('swiper-slide');
                    new Swiper($(item).find('.about-team-person-inner')[0], {
                        slidesPerView: 'auto',
                        spaceBetween: parseRem(20),
                        pagination: {
                            el: '.about-team-person-pagi',
                            bulletClass: 'about-team-person-pagi-item',
                            bulletActiveClass: 'active',
                            clickable: true,
                        }
                    });
                })
            }
            let tl = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-team-title-wrap',
                    start: 'top top+=70%',
                }
            })
            new MasterTimeline({
                timeline: tl,
                tweenArr: [
                    new FadeIn({ el: $('.about-team-label').get(0), onMask: true, headingType: true }),
                    new FadeSplitText({ el: $('.about-team-title').get(0), onMask: true, delay: "<=.2" }),
                ]
            })
            $('.about-team-person-wrap').each((idx, itemWrap) => {
                let tlEl = new gsap.timeline({
                    scrollTrigger: {
                        trigger: itemWrap,
                        start: 'top top+=70%',
                    }
                })
                new MasterTimeline({
                    timeline: tlEl,
                    tweenArr: [
                        new FadeSplitText({ el: $(itemWrap).find('.about-team-type-txt').get(0), onMask: true }),
                    ]
                })
                $(itemWrap).find('.about-team-person-item').each((idx, item) => {
                    let tl = new gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: 'top top+=70%',
                        }
                    })
                    new MasterTimeline({
                        timeline: tl,
                        tweenArr: [
                            new FadeIn({ el: $(item).get(0) }),
                            new ScaleInset({ el: $(item).find('.about-team-person-item-img').get(0), delay: '<=.1' }),
                            new FadeSplitText({ el: $(item).find('.about-team-person-item-title').get(0), delay: '<=.3' }),
                            new FadeSplitText({ el: $(item).find('.about-team-person-item-sub').get(0), delay: '<=.1' })
                        ]
                    })
                })
            })
        }
    }
    const aboutTeam = new AboutTeam('.about-team-wrap');

    class PricingHero extends TriggerSetupHero {
        constructor() {
            super();
            this.tl = null;
        }
        trigger() {
            this.setup();
            super.init(this.play.bind(this));
        }
        setup() {
            this.tl = gsap.timeline({
                onStart: () => {
                    console.log("start")
                    $('[data-init-df]').removeAttr('data-init-df');
                },
                paused: true
            });
            new MasterTimeline({
                timeline: this.tl,
                allowMobile: true,
                tweenArr: [
                    new FadeSplitText({ el: $('.pricing-hero-title').get(0) }),
                    new FadeSplitText({ el: $('.pricing-hero-sub').get(0), onMask: true, delay: "<=0.3" }),
                    ...Array.from($('.pricing-hero-item')).flatMap((el, idx) => new FadeIn({ el }))
                ]
            });
            let tlSub = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.pricing-hero-addition-wrap',
                    start: 'top top+=75%',
                }
            })
            new MasterTimeline({
                timeline: tlSub,
                tweenArr: [
                    new FadeIn({ el: $('.pricing-hero-addition').get(0) }),
                    new FadeSplitText({ el: $('.pricing-hero-addition-title').get(0), onMask: true }),
                    new FadeSplitText({ el: $('.pricing-hero-addition-sub').get(0), onMask: true, delay: "<=.2" }),
                    new FadeSplitText({ el: $('.pricing-hero-addition-price-title').get(0), onMask: true, delay: "<=-.2" }),
                    new FadeSplitText({ el: $('.pricing-hero-addition-price-sub').get(0), onMask: true, delay: "<=.2" }),
                ]
            })
        }
        play() {
            this.tl.play();
        }
    }
    let pricingHero = new PricingHero();

    class PricingHow extends TriggerSetup {
        constructor(triggerEl) {
            super(triggerEl);
        }
        trigger() {
            super.setTrigger(this.setup.bind(this));
        }
        setup() {
            let tl = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.pricing-how-title-wrap',
                    start: 'top top+=75%',
                }
            })
            new MasterTimeline({
                timeline: tl,
                tweenArr: [
                    new FadeSplitText({ el: $('.pricing-how-title').get(0), onMask: true, headingType: true }),
                    new FadeSplitText({ el: $('.pricing-how-sub').get(0), onMask: true, delay: "<=.2" }),
                    new FadeIn({ el: $('.pricing-how-btn').get(0), delay: "<=.2" }),
                ]
            })
            let tlImg = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.pricing-how-img-wrap',
                    start: 'top top+=65%',
                }
            })
            new MasterTimeline({
                timeline: tlImg,
                tweenArr: [
                    new ScaleInset({ el: $('.pricing-how-img').get(0) })
                ]
            })
        }
    }
    const pricingHow = new PricingHow('.about-contact-wrap');

    class ProductHero extends TriggerSetupHero {
        constructor() {
            super();
            this.tl = null;
        }
        trigger() {
            this.setup();
            super.init(this.play.bind(this));
        }
        setup() {
            $('.product-popup-close').on('click', () => {
                $('.product-popup').removeClass('active');
                this.pausedvideo();
            })
            $('.product-hero-btn').on('click', (e) => {
                e.preventDefault();
                $('.product-popup').addClass('active');
                this.playVideo();
            })
            $(document).on('click', (e) => {
                if ($('.product-popup').hasClass('active') && !$('.product-popup').has(e.target).length) {
                    if ($(e.target).closest('.product-popup-inner').length == 0 && $(e.target).closest('.product-hero-btn').length == 0) {
                        $('.product-popup').removeClass('active');
                        this.pausedvideo();
                    }
                }
            })
            this.tl = gsap.timeline({
                onStart: () => {
                    console.log("start")
                    $('[data-init-df]').removeAttr('data-init-df');
                },
                paused: true
            });
            new MasterTimeline({
                timeline: this.tl,
                allowMobile: true,
                tweenArr: [
                    new FadeSplitText({ el: $('.product-hero-title').get(0), onMask: true, headingType: true }),
                    new FadeSplitText({ el: $('.product-hero-sub').get(0), onMask: true, delay: "<=0.2" }),
                    new FadeSplitText({ el: $('.product-hero-desc').get(0), onMask: true, delay: "<=0.2" }),
                    new FadeIn({ el: $('.product-hero-btn').get(0), onMask: true, delay: "<=0.2" }),
                    ...Array.from($('.product-hero-tab-item')).flatMap((el, idx) => new FadeIn({ el })),
                    new FadeSplitText({ el: $('.product-hero-content-title').get(0), onMask: true }),
                    new FadeIn({ el: $('.product-hero-content-img').get(0) }),
                    new ScaleInset({ el: $('.product-hero-content-img').get(0) })
                ]
            });

            $('.product-hero-tab-item').on('click', function () {
                let index = $(this).index();
                $('.product-hero-tab-item').removeClass('active');
                $(this).addClass('active');
                $('.product-hero-content').removeClass('active');
                $('.product-hero-content').eq(index).addClass('active');
            })
        }
        playVideo() {
            $('.product-popup-video')[0].play();
        }
        pausedvideo() {
            $('.product-popup-video')[0].pause();
        }
        play() {
            this.tl.play();
        }
    }
    let productHero = new ProductHero();

    class ProductFeature extends TriggerSetup {
        constructor(triggerEl) {
            super(triggerEl);
        }
        trigger() {
            super.setTrigger(this.setup.bind(this));
        }
        setup() {
            let tlTitle = gsap.timeline({
                scrollTrigger: {
                    trigger: '.product-feature-title-wrap',
                    start: 'top top+=75%',
                }
            });
            new MasterTimeline({
                timeline: tlTitle,
                tweenArr: [
                    new FadeSplitText({ el: $('.product-feature-title').get(0), onMask: true, headingType: true }),
                    new FadeSplitText({ el: $('.product-feature-sub').get(0), onMask: true, delay: '<=.3' }),
                ]
            })
            let tlImg = gsap.timeline({
                scrollTrigger: {
                    trigger: '.product-feature-img',
                    start: 'top top+=65%',
                }
            });
            new MasterTimeline({
                timeline: tlImg,
                tweenArr: [
                    new ScaleInset({ el: $('.product-feature-img-inner').get(0) }),
                ]
            })
        }
    }
    let productFeature = new ProductFeature('.product-feature-wrap');
    class ProductService extends TriggerSetup {
        constructor(triggerEl) {
            super(triggerEl);
        }
        trigger() {
            super.setTrigger(this.setup.bind(this));
        }
        setup() {
            $('.product-service-content').each((idx, item) => {
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: 'top top+=65%',
                    }
                });
                new MasterTimeline({
                    timeline: tl,
                    tweenArr: [
                        new FadeSplitText({ el: $(item).find('.product-service-content-title').get(0), onMask: true, headingType: true }),
                        ...Array.from($(item).find('.product-service-content-sub')).flatMap((el, idx) => new FadeSplitText({ el, onMask: true, delay: "<=.3" })),
                        new FadeIn({ el: $(item).find('.product-services-link-fade').get(0), delay: "<=.15" }),
                        $(item).find('.product-service-content-ic').length > 0 && new FadeIn({ el: $(item).find('.product-service-content-ic').get(0), delay: "<=.3" }),
                    ]
                })
            })
            $('.product-service-img').each((idx, item) => {
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: 'top top+=65%',
                    }
                });
                new MasterTimeline({
                    timeline: tl,
                    tweenArr: [
                        new FadeIn({ el: $(item) }),
                        new ScaleInset({ el: $(item).find('.product-service-img-inner').get(0) }),
                    ]
                })
            })
        }
    }
    let productService = new ProductService('.product-service-wrap');

    class TermHero extends TriggerSetupHero {
        constructor() {
            super();
            this.tl = null;
        }
        trigger() {
            this.setup();
            super.init(this.play.bind(this));
        }
        setup() {
            if (viewport.w > 768) {
                this.createToc($('.term-content-main'));
            }
            this.tl = gsap.timeline({
                onStart: () => {
                    $('[data-init-df]').removeAttr('data-init-df');
                },
                paused: true
            });
            new MasterTimeline({
                timeline: this.tl,
                allowMobile: true,
                tweenArr: [
                    new FadeSplitText({ el: $('.term-hero-title').get(0), onMask: true, headingType: true }),
                    new FadeSplitText({ el: $('.term-hero-sub').get(0), onMask: true, delay: "<=0.3" }),
                    new FadeIn({ el: $('.term-content-menu-wrap').get(0), delay: "<=0" }),
                    new FadeIn({ el: $('.term-content-main').get(0) })
                ]
            });
        }
        createToc(richTextEl) {
            let headings = $(richTextEl).find('h2');
            let tocWrap = $('.term-content-menu-inner');
            console.log(tocWrap.parent())
            if (headings.length <= 1) {
                tocWrap.parent().remove();
            }

            tocWrap.html('');
            for (let i = 0; i < headings.length; i++) {
                headings.eq(i).attr('id', `toc-${i}`);
                let tocItem = $('<a></a>').addClass('txt txt-link txt-16 txt-med term-content-menu-item').attr('href', `#toc-${i}`);
                let tocOrdinal = $('<div></div>').addClass('term-content-menu-number').text(`${i + 1}.`).appendTo(tocItem);
                let tocName = $('<div></div>').addClass('term-content-menu-title').text(headings.eq(i).text()).appendTo(tocItem)
                tocWrap.append(tocItem);
            }

            lenis.on('scroll', function (e) {
                let currScroll = e.scroll;
                for (let i = 0; i < headings.length; i++) {
                    let top = headings.eq(i).get(0).getBoundingClientRect().top;
                    if (top > 0 && top < ($(window).height() / 5)) {
                        $(`.term-content-menu-item[href="#toc-${i}"]`).addClass('active');
                        $(`.term-content-menu-item`).not(`[href="#toc-${i}"]`).removeClass('active');
                    }
                }
            });
            console.log(tocWrap.height(), $('.term-content-menu').height())
            if (tocWrap.height() > $('.term-content-menu').height()) {
                console.log('prevent')
                $('.term-content-menu').attr('data-lenis-prevent', true);
            }
            $('.term-content-menu-item').on('click', function (e) {
                e.preventDefault();

                let target = $(this).attr('href');

                lenis.scrollTo(target, {
                    offset: -155
                })

                return false;
            })
        }
        play() {
            this.tl.play();
        }
    }
    let termHero = new TermHero();
    class CTA extends TriggerSetup {
        constructor(triggerEl) {
            super(triggerEl);
        }
        trigger() {
            super.setTrigger(this.setup.bind(this));
        }
        setup() {
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-cta-inner',
                    start: 'top top+=70%',
                }
            });
            new MasterTimeline({
                timeline: tl,
                tweenArr: [
                    new FadeSplitText({ el: $('.home-cta-title').get(0), onMask: true, headingType: true }),
                    new FadeIn({ el: $('.home-cta-btn').get(0), delay: '.3' })
                ]
            })
        }
    }
    const cta = new CTA('.home-cta');
    class Footer extends TriggerSetup {
        constructor(triggerEl) {
            super(triggerEl);
        }
        trigger() {
            super.setTrigger(this.setup.bind(this));
        }
        setup() {
            let tlLeft = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.footer-left',
                    start: 'top top+=65%',
                }
            })
            new MasterTimeline({
                timeline: tlLeft,
                tweenArr: [
                    new FadeIn({ el: $('.footer-left-logo').get(0) }),
                    new FadeSplitText({ el: $('.footer-left-contact-label').get(0), onMask: true }),
                    new FadeSplitText({ el: $('.footer-left-contact-label').get(0), onMask: true }),
                    new FadeIn({ el: $('.footer-left-contact-title ').get(0) }),
                    new FadeSplitText({ el: $('.footer-left-social-label').get(0) }),
                    ...Array.from($('.footer-left-social-item')).flatMap((el, idx) => new FadeIn({ el })),
                ]
            })
            let tlRightMenu = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.footer-right',
                    start: 'top top+=65%',
                }
            })
            new MasterTimeline({
                timeline: tlRightMenu,
                tweenArr: [
                    ...Array.from($('.footer-right-menu-item')).flatMap((el, idx) => new FadeIn({ el: el })),
                ]
            })
            let tlRightContent = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.footer-right',
                    start: 'top top+=65%',
                }
            })
            new MasterTimeline({
                timeline: tlRightContent,
                tweenArr: [
                    ...Array.from($('.footer-right-address-item')).flatMap((el, idx) => {
                        return [
                            new FadeSplitText({ el: $(el).find('.footer-right-address-item-title').get(0), onMask: true }),
                            new FadeIn({ el: $(el).find('.footer-right-address-item-sub-wrap .txt').get(0) })
                        ]
                    }),
                    new ScaleLine({ el: $('.footer-right-content .line.footer-right-content-line').get(0) }),
                    new FadeSplitText({ el: $('.footer-right-content-sub').get(0), onMask: true }),
                    ...Array.from($('.footer-bottom .txt')).flatMap((el, idx) => new FadeIn({ el })),
                ]
            })
        }
    }
    const footer = new Footer('.footer-wrap');
    const SCRIPT = {
        homeScript: () => {
            homeHero.trigger();
            homeUser.trigger();
            homeFeature.trigger();
            homeWhy.trigger();
            homeTesti.trigger();
        },
        aboutScript: () => {
            aboutHero.trigger();
            // aboutVision.trigger();
            aboutService.trigger();
            aboutTeam.trigger();
            aboutContact.trigger();
            // homeTesti.trigger();
        },
        pricingScript: () => {
            pricingHero.trigger();
            pricingHow.trigger();
        },
        productScript: () => {
            productHero.trigger();
            productFeature.trigger();
            productService.trigger();
        },
        termScript: () => {
            termHero.trigger();
        },
    };

    const initGlobal = () => {
        cursor.init();
        viewport.w > 767 && cta.trigger();
        viewport.w > 767 && footer.trigger();
        if ($('.term-content-main-txt').length > 0) {
            customLinkRichText('.term-content-main-txt')
        }
        enterLeaveTransition();
        const pageName = $(".main").attr("data-barba-namespace");
        if (pageName) {
            SCRIPT[`${pageName}Script`]();
        }

        HEADER.toggleOnScroll(lenis);
        // HEADER.toggleDarkMode();
        lenis.on('scroll', function (inst) {
            HEADER.toggleOnScroll(inst);
            HEADER.toggleHide(inst);
            // HEADER.toggleDarkMode();
        })
    }

    /** (💡)  - Header */
    $('.header-menu-btn').on('click', function (e) {
        e.preventDefault();
        $('.header').toggleClass('active');
    })
    /** (💡)  - End Header */

    /** (💡)  - Footer */
    $('.txt-year').text(new Date().getFullYear())
    /** (💡)  - End Footer */

    /** (💡)  - START PAGE */
    if (window.scrollY > 0) {
        lenis.scrollTo("top", {
            duration: .001,
            onComplete: () => initGlobal()
        });
    }
    else {
        initGlobal();
    }
    /** (💡) **/
}
window.onload = mainScript;