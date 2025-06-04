import { Application } from "@splinetool/runtime";

const mainScript = () => {
    barba.use(barbaPrefetch);
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    const lenis = new Lenis()

    gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    const viewport = {
        w: window.innerWidth,
        h: window.innerHeight
    }
    function updateViewportSize() {
        viewport.w = window.innerWidth;
        viewport.h = window.innerHeight;
    }
    $(window).on('resize', updateViewportSize)
    function reinitializeWebflow() {
        console.log('reinitialize webflow');
        window.Webflow && window.Webflow.destroy();
        window.Webflow && window.Webflow.ready();
    }
    function debounce(func, delay = 100){
        let timer;
        return function(event) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, delay, event);
        };
    }
    const parseRem = (input) => {
        return input / 10 * parseFloat($('html').css('font-size'))
    }

    const checkSameNamespace = (namespace, current, next) => {
        let result = (current === next) && (current === namespace) && (next === namespace);
        return result;
    }

    function removeAllScrollTrigger() {
        let triggers = ScrollTrigger.getAll();
        triggers.forEach(trigger => {
            trigger.kill();
        });
    }

    $.easing.exponentialEaseOut = function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
    };

    const convertHyphen = (field) => {
        return field.replace(/-/g, '‑')
    }
    const childSelect = (parent) => {
		return (child) => child ? $(parent).find(child) : parent;
    }

    const initDecimal = () => {
        $('[data-decimal]').each((idx, el) => {
            let decimal = $(el).data('decimal');
            $(el).text($(el).text().toString().padStart(decimal, '0'));
        })
    }

    function reinitializeWebflow() {
        console.log('reinitialize webflow');
        window.Webflow && window.Webflow.destroy();
        window.Webflow && window.Webflow.ready();
    }
    function replaceHyphen(className) {
        $(className).html(function (index, oldHtml) {
            return oldHtml.replaceAll("-", "<span>-</span>");
        });
    }
    const formSubmitEvent = (function () {
        const init = ({
            onlyWorkOnThisFormName,
            onSuccess,
            onFail
        }) => {
            let inputSubmit = $(`#${getIDFormName(onlyWorkOnThisFormName)} .input-submit-wrap .txt`);

            $(document).on('ajaxSend', function (event, xhr, settings) {
                if (settings.url.includes("https://webflow.com/api/v1/form/")) {
                    inputSubmit.text('Please wait...');
                }
            });
            $(document).on('ajaxComplete', function (event, xhr, settings) {
                if (settings.url.includes("https://webflow.com/api/v1/form/")) {
                    const isSuccessful = xhr.status === 200
                    const isWorkOnAllForm = onlyWorkOnThisFormName == undefined
                    const isCorrectForm = !isWorkOnAllForm && settings.data.includes(getSanitizedFormName(onlyWorkOnThisFormName));

                    if (isWorkOnAllForm) {
                        if (isSuccessful) {
                            onSuccess?.()
                            inputSubmit.text('Sent');
                        } else {
                            onFail?.()
                        }
                    } else if (isCorrectForm) {
                        if (isSuccessful) {
                            onSuccess?.()
                            inputSubmit.text('Sent');
                        } else {
                            onFail?.()
                        }
                    }
                }
            });
        }
        function getIDFormName(name) {
            return name.toLowerCase().replaceAll(" ", "-");
        }
        function getSanitizedFormName(name) {
            return name.replaceAll(" ", "+")
        }
        return {
            init
        }
    })();

    function resetScroll() {
        if (window.location.hash !== '') {
            console.log("run")
            console.log('has hash')
            if ($(window.location.hash).length >= 1) {
                console.log('dom hash')
                window.scrollTo(0, $(window.location.hash).offset().top)
                setTimeout(() => {
                    window.scrollTo(0, $(window.location.hash).offset().top)
                }, 300);
            } else {
                scrollTop()
            }
        } else if (window.location.search !== '') {
            let searchObj = JSON.parse('{"' + decodeURI(location.search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
            console.log('has search')
            if (searchObj.sc) {
                if ($(`#${searchObj.sc}`).length >= 1) {
                    console.log('dom search')
                    let target = `#${searchObj.sc}`;
                    setTimeout(() => {
                        lenis.scrollTo(`#${searchObj.sc}`, {
                            offset: -60,
                        })
                        history.replaceState({}, '', `${window.location.pathname + target}`);
                    }, 500);
                } else {
                    scrollTop()
                }
            }
        } else {
            scrollTop()
        }
    }
    function scrollTop() {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        } else {
            window.addEventListener('pageshow', function(event) {
                if (!event.persisted) {
                    window.scrollTo(0, 0);
                }
            });
        }
        window.scrollTo(0, 0);
    }
    function activeItemGlobal(elArr, index) {
        elArr.forEach((el, idx) => {
            $(el).removeClass('active').eq(index).addClass('active')
        })
    }
    function slideItemGlobal(elArr, index) {
        if(viewport.w >767){
            elArr.forEach((el, idx) => {
            $(el).slideUp().eq(index).slideDown();
        })
        }
        else {
            elArr.forEach((el, idx) => {
                $(el).slideUp('slow').eq(index).slideDown('slow');
            })
        }
    }
    const updateCurrentNav = () => {
        $(".w--current").removeClass("w--current");
        $("a").each(function (index, link) {
			if ($(this).attr("href") == window.location.pathname) {
                $(this).addClass("w--current");
            }
            const [urlPath, anchor] = $(this).attr('href').split('#');

            if (!anchor) {
                return;
            }
            else {
                if (urlPath === window.location.pathname || urlPath === '') {
                    $(this).attr('href', `${window.location.pathname}#${anchor}`);
                }
                else {
                    $(this).attr('href', `${urlPath}?sc=${anchor}`);
                }
            }
        });
    };


    if (viewport.w <= 991) {
        $('.header-menu-links').prop('data-lenis-prevent', 'true');
        $('.header-ham').on('click', function () {
            $('.header').toggleClass('nav-active');
            if ($('.header').hasClass('nav-active')) {
            }
            else {
                setTimeout(() => {
                    $('.header-menu-dropdown-cms').slideUp();
                    $('.header-menu-dropdown').removeClass('active');
                }, 300);
            }
        })
        $('.header-menu-dropdown-cms').slideUp();
        $('.header-menu-dropdown-label').on('click', function () {
            $(this).parent().toggleClass('active');
            $(this).next('.header-menu-dropdown-cms').slideToggle();
        })
        $('.header-menu-link, .header-logo-link').on('click', function () {
            setTimeout(() => {
                $('.header').removeClass('nav-active');
            }, 500);
        })
    }

    function refreshOnBreakpoint() {
        let initialViewportWidth = window.innerWidth || document.documentElement.clientWidth;
        let newViewportWidth;
        // portrait mobile viewport initial, any change refresh
        if (initialViewportWidth < 480) {
            $(window).on('resize', debounce(function() {
                newViewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (newViewportWidth > 479) {
                    location.reload();
                }
            }))
        }
        // landscape mobile viewport initial, any change refresh
        else if (initialViewportWidth < 768) {
            $(window).on('resize', debounce(function() {
                newViewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (newViewportWidth > 767) {
                    location.reload();
                }
            }))
        }
        // tablet viewport initial, any change refresh
        else if (initialViewportWidth > 767 && initialViewportWidth < 992)  {
            $(window).on('resize', debounce(function() {
                newViewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (newViewportWidth < 768 || newViewportWidth > 991) {
                    location.reload();
                }
            }))
        }
        // web viewport initial, any change refresh
        else if (initialViewportWidth > 991) {
            $(window).on('resize', debounce(function() {
                newViewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (newViewportWidth < 992) {
                    location.reload();
                }
            }))
        }
    }
    refreshOnBreakpoint();

    function isInHeaderCheck(el) {
        const rect = $(el).get(0).getBoundingClientRect();
        const headerRect = $('.header').get(0).getBoundingClientRect();
        return (
            rect.bottom >= 0 &&
            rect.top - headerRect.height / 2 <=0
        );
    }

    const pointer = {
        x: $(window).width() / 2,
        y: $(window).height() / 2,
        xNor: $(window).width() / 2 / $(window).width(),
        yNor: $(window).height() / 2 / $(window).height()
    }

    //Header
    lenis.on('scroll', (inst) => {
        updateOnScroll(inst)
    })
    function updateOnScroll(inst) {
        if (inst.direction == 0 && inst.scroll >= ($('.header').height() * 3)) {
            $('.header').addClass('on-scroll');
        }
        else if (inst.direction == 1) {
            if (inst.scroll >= ($('.header').height() * 3)) {
                $('.header').addClass('on-hide on-scroll');
            } else {
                $('.header').removeClass('on-hide');
                $('.header').addClass('on-scroll');
            }
        } else if (inst.direction == -1) {
            if (inst.scroll >= ($('.header').height() * 3)) {
                $('.header').removeClass('on-hide');
                $('.header').addClass('on-scroll');
            } else {
                $('.header').removeClass('on-hide on-scroll');
            }
        }
        $('[data-header-dark]').each((idx, el) => $('.header').toggleClass('on-scroll-dark', isInHeaderCheck(el)));
    }

    function updateSliderText() {
        const allSlideWrap = $('.txt-slider-wrap');
        gsap.set(allSlideWrap, {perspective: parseRem(82.5)})
        allSlideWrap.each((idx, wrapEl) => {
            let allSlideItems = $(wrapEl).find('.txt-slider-inner > *');
            let tlMaster = gsap.timeline({
                paused: true,
                onComplete: () => {
                    tlMaster.progress(0);
                },
            });
            gsap.set(allSlideItems, {
                transformOrigin: true
                ? 'center center -.1em !important'
                : 'center center -.26em !important',
            });
            allSlideItems.each((idx, text) => {
                let dur = 3;
                let ease = 'expo.inOut';
                let transform = {
                out: `translate3d(0px, ${parseRem(25.5961)}px, -${parseRem(26.0468)}px) rotateX(-91deg)`,
                in: `translate3d(0px, -${parseRem(25.5961)}px, -${parseRem(26.0468)}px) rotateX(91deg)`,
                };
                if (idx == allSlideItems.length - 1) {
                gsap.set(text, { transform: 'none', autoAlpha: 1 });
                } else {
                gsap.set(text, { transform: transform.out, autoAlpha: 0 });
                }
                let tlChild = gsap.timeline({});

                if (idx === allSlideItems.length - 1) {
                tlChild
                    .set(text, { transform: 'none', autoAlpha: 1 })
                    .to(text, { transform: transform.in, autoAlpha: 0, duration: dur, ease: ease }, '<=0')
                    .to(text, { duration: dur * idx - 1 * dur })

                    .set(text, { transform: transform.out, autoAlpha: 0 })
                    .to(text, { transform: 'none', autoAlpha: 1, duration: dur, ease: ease });
                } else {
                tlChild
                    .set(text, { transform: transform.out, autoAlpha: 0 })
                    .to(text, { duration: dur * idx }, '<=0')
                    .to(text, { transform: 'none', autoAlpha: 1, duration: dur, ease: ease })
                    .to(text, { transform: transform.in, autoAlpha: 0, duration: dur, ease: ease })
                    .to(text, { duration: (allSlideItems.length - 2 - idx) * dur });
                }
                tlMaster.add(tlChild, 0);
            });
            tlMaster.progress((1 / allSlideItems.length).toFixed(2));
            ScrollTrigger.create({
                trigger: wrapEl,
                start: 'top center',
                end: 'bottom center',
                once: true,
                onEnter: () => {
                    tlMaster.play();
                }
            })
        })
    }

    class SlideText {
        constructor(wrapEl) {
            this.wrapEl = wrapEl;
            this.tlMaster;
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
                    .to(text, { transform: DEFAULT.transform.in, autoAlpha: 0, duration: DEFAULT.duration, ease: DEFAULT.ease }, '<=0')
                    .to(text, { duration: DEFAULT.duration * idx - 1 * DEFAULT.duration })

                    .set(text, { transform: DEFAULT.transform.out, autoAlpha: 0 })
                    .to(text, { transform: 'none', autoAlpha: 1, duration: DEFAULT.duration, ease: DEFAULT.ease });
                } else {
                tlChild
                    .set(text, { transform: DEFAULT.transform.out, autoAlpha: 0 })
                    .to(text, { duration: DEFAULT.duration * idx }, '<=0')
                    .to(text, { transform: 'none', autoAlpha: 1, duration: DEFAULT.duration, ease: DEFAULT.ease })
                    .to(text, { transform: DEFAULT.transform.in, autoAlpha: 0, duration: DEFAULT.duration, ease: DEFAULT.ease })
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

    class Loading {
        constructor() {
            this.isLoaded = sessionStorage.getItem("isLoaded") == 'true' ? true : false;
            this.doneLoad = false;

            this.tlLoading = gsap.timeline({
                paused: true,
                defaults: {
                    ease: 'none'
                },
                onUpdate() {
                    let progVal = Math.floor(this.progress() * 100)
                    // $('.header .header-counter').text(progVal)
                    // let curr = gsap.getProperty('.cursor-prog circle', 'stroke-dashoffset');
                }
            })


            const centerCircle = $('.loading-fav .center-circle').get(0);
            const bbox = centerCircle.getBBox();
            const centerX = bbox.x + bbox.width / 2;
            const centerY = bbox.y + bbox.height / 2;

            this.tlLoading
                // .from('.loading-prog', { autoAlpha: 0, duration: .8, ease: 'circ.inOut' })
                // .fromTo('.loading-prog-inner circle', {'stroke-dashoffset': 100 }, {'stroke-dashoffset': 0, duration: 2 })
                .from('.loading-fav', { width: parseRem(700), ease: 'circ.inOut', duration: 3 })
                .from('.outer-shape', {
                    duration: 1.5,
                    x: function(index, target) {
                        const bbox = target.getBBox();
                        const targetX = bbox.x + bbox.width / 2;
                        return (targetX - centerX) * 2; // Di chuyển theo hướng ngược lại với tâm
                    },
                    y: function(index, target) {
                        const bbox = target.getBBox();
                        const targetY = bbox.y + bbox.height / 2;
                        return (targetY - centerY) * 2; // Di chuyển theo hướng ngược lại với tâm
                    },
                    opacity: 0,
                    scale: 2,
                    stagger: .08,
                    transformOrigin: 'center',// Dần dần ẩn đi
                    ease: 'circ.inOut'// Tạo độ trễ giữa các phần tử để hiệu ứng mượt hơn
                }, "<=0")
                .from('.center-circle', {
                    duration: .6,
                    autoAlpha: 0,
                    fill: '#9747ff',
                    scale: 1.3,
                    transformOrigin: 'center center',
                    ease: 'back.out(1.3)'
                }, "<=0")
                .from('.outer-circle', {
                    duration: 1,
                    scale: .8,
                    opacity: 0,
                    transformOrigin: 'center center',
                    ease: 'back.out(1.3)'
                }, "<=0")

            this.tlLoadMaster = gsap.timeline({
                paused: true,
                delay: this.isLoaded ? 0 : 1,
            })

            // if (this.isLoaded) {

            // }
            this.tlLoadMaster
                .to(this.tlLoading, {progress: 1, duration: 2 })
                // .to(this.tlLoading, {progress: .5, duration: .8 })
                // .to(this.tlLoading, { progress: 1, duration: 1.2 })

        }
        init() {
            this.tlLoadMaster.play()
        }
    }
    // let load = new Loading();
    // Animation
    class HomeHero {
        constructor() {
            this.tl;
        }
        setup() {
            const canvas = $('.orb-canvas').get(0);
            const app = new Application(canvas);
            gsap.set('.orb-canvas-wrap', { autoAlpha: 0, duration: 0 })
            app.load("https://cdnwf.bear.plus/ArmorxAI/armorxAI.splinecode").then(() => {
                gsap.to('.orb-img', { autoAlpha: 0, duration: .3, ease: 'linear' })
                gsap.set('.orb-canvas-wrap', { autoAlpha: 1, duration: 0 })
            });

            // app.emitEvent("mouseDown", "Cube");
            const title = new SplitType('.home-hero-title', { types: 'lines, words' });
            const label = new SplitType('.home-hero-label', { types: 'lines, words' });
            const sub = new SplitType('.home-hero-sub', { types: 'lines, words' });
            const partLabel = new SplitType('.home-hero-part-label', { types: 'lines, words'});

            let labelSlide = new SlideText('.home-hero-label-outer .txt-slider-wrap');
            labelSlide.setup();

            const cloneAmount = Math.ceil(viewport.w / $('.home-hero-part-list').width()) + 1;
            new Array(cloneAmount).fill().forEach((_, index) => {
                let itemClone = $('.home-hero-part-list').clone();
                $('.home-hero-part-cms').append(itemClone);
            })

            // let partCMSClone = $('.home-hero-part-cms').clone();
            // $('.home-hero-part').append(partCMSClone);

            let distance = $('.home-hero-part-list').eq(0).width() + parseRem(viewport.w > 767 ? 36 : 10);

            let cloneRing = $('.home-orb-ring.ring-inner').clone();
            $('.home-orb-rings').html('');
            const countRing = 3;

            for (let i = 0; i < countRing; i++) {
                let html = cloneRing.clone();
                html.css("animation-delay", `${(-15 / countRing) * i}s`);
                $('.home-orb-rings').append(html);
            }

            this.tl = gsap.timeline({
                paused: true,
                onStart: () => {
                },
                onComplete: () => {
                    title.revert();
                    label.revert();
                    sub.revert();
                    partLabel.revert();
                    labelSlide.play();
                    gsap.set('.home-hero-label-outer .txt-slider-inner', { clearProps: 'all' });
                }
            });

            this.tl
                .from('.home-orb-glow, .home-orb-glow-back', { autoAlpha: 0, filter: 'blur(20px)', scale: .8, duration: 1.2, stagger: .08, ease: 'circ.inOut', onComplete: () => $('.home-orb-glow-back').eq(0).addClass('anim-breathing'), clearProps: 'all' }, "<=0")
                .from('.home-orb-main-3d', { autoAlpha: 0, scale: .8, duration: 1.2, ease: 'back.out(1.3)', clearProps: 'all' }, "<=.1")
                .from('.home-orb-rings', { scale: .8, autoAlpha: 0, duration: 1, clearProps: 'all' }, '<=.35')
                .from([label.words, '.home-hero-label-outer .txt-slider-inner'], { autoAlpha: 0, yPercent: 70, duration: .8, stagger: 0.03 }, "<=.25")
                .from(title.words, { autoAlpha: 0, yPercent: 70, duration: .8, stagger: 0.05 }, "<=.1")
                .from(sub.words, { autoAlpha: 0, yPercent: 70, duration: .6, stagger: 0.01 }, "<=.1")
                .from(partLabel.words, { autoAlpha: 0, yPercent: 70, duration: .6, stagger: 0.02 }, "<=.1")
                .from('.home-hero-part-item', { autoAlpha: 0, y: 20, duration: .6, stagger: 0.06, clearProps: 'all' }, "<=.1")

            function animationMarquee() {
                let xTarget = gsap.getProperty('.home-hero-part', 'x');
                if (xTarget < -distance) {
                    xTarget = 0;
                } else if (xTarget > 0) {
                    xTarget = -distance;
                }
                // let tlDir = lenis.direction >= 0 ? 1 : -1;
                // gsap.quickSetter('.home-hero-part', 'x', 'px')(xTarget + (lenis.velocity * .1 + tlDir * -1));
                gsap.quickSetter('.home-hero-part', 'x', 'px')(xTarget - .5);

                requestAnimationFrame(animationMarquee);
            }
            requestAnimationFrame(animationMarquee);

            this.play();
        }
        play() {
            this.tl.play();
        }
    }
    let homeHero = new HomeHero();

    class HomeProb {
        constructor() {
            this.tlTrigger;
            this.tlFade
        }
        setTrigger() {
            if (viewport.w <= 767) {
                this.setup();
            }
            else {
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.home-prob',
                        start: 'top bottom+=50%',
                        end: 'bottom top',
                        once: true,
                        onEnter: () => {
                            this.setup();
                        },
                    }
                })
            }
        }
        setup() {
            const title = new SplitType('.home-prob-title', { types: 'lines, words' });
            const sub = new SplitType('.home-prob-sub', { types: 'lines, words' });

            this.tlFade = gsap.timeline({
                delay: (viewport.w > 767 && viewport.w <= 991) ? 1.5 : 0,
                scrollTrigger: {
                    trigger: '.home-prob-title-wrap',
                    start: 'top top+=65%',
                    once: true
                },
                onComplete: () => {
                    title.revert();
                    gsap.fromTo(sub.words, { autoAlpha: 0.4 }, {
                        autoAlpha: 1, duration: 1, stagger: .4, ease: 'linear', scrollTrigger: {
                            trigger: '.home-prob-title-wrap',
                            start: 'bottom top+=65%',
                            end: 'bottom-=50% top+=65%',
                            endTrigger: '.home-prob-cms',
                            scrub: true
                    } })
                }
            })

            gsap.set(sub.words, { autoAlpha: 0, yPercent: 70, duration: 0 });
            this.tlFade
                .from('.home-prob-label', { y: 20, autoAlpha: 0, duration: 1, clearProps: 'all' })
                .to(sub.words, { autoAlpha: 0.4, yPercent: 0, duration: .4, stagger: 0.02 }, "<=0")
                .from(title.words, { autoAlpha: 0, yPercent: 70, duration: .8, stagger: 0.03 }, "<=.1")

            $('.home-prob-item').each((idx, el) => {
                const titleItem = new SplitType($(el).find('.home-prob-item-title'), { types: 'lines, words' });
                const subItem = new SplitType($(el).find('.home-prob-item-sub'), { types: 'lines, words' });
                this.tlFade
                    .from($(el).find('.home-prob-item-line'), { scaleX: 0, transformOrigin: 'left', duration: 1, clearProps: 'all' }, `<=${idx * 0.1}`)
                    .from($(el).find('.home-prob-item-label'), { y: 15, autoAlpha: 0, duration: .6, clearProps: 'all' }, "<=0")
                    .from(titleItem.words, { autoAlpha: 0, yPercent: 70, duration: .8, stagger: 0.03, onComplete: () => titleItem.revert() }, "<=0")
                    .from($(el).find('.home-prob-item-img'), { scale: .7, y: 20, autoAlpha: 0, duration: 1, clearProps: 'all' }, "<=0")
                    .from(subItem.words, { autoAlpha: 0, yPercent: 70, duration: .6, stagger: 0.02, onComplete: () => subItem.revert() }, "<=0.1")
            })


            if (viewport.w <= 767) {
                $('.home-prob-content [data-swiper]').each((_, item) => {
                    if ($(item).attr('data-swiper') == 'swiper')
                        $(item).addClass('swiper')
                    else
                        $(item).addClass(`swiper-${$(item).attr('data-swiper')}`)
                })
                let swiperProd = new Swiper('.home-prob-cms', {
                    spaceBetween: 0,
                    slidesPerView: 'auto',
                });
            }
        }
    }
    let homeProb = new HomeProb();

    class HomeSol {
        constructor() {
            this.tlTrigger;
            this.tlFade;
        }
        setTrigger() {
            if (viewport.w <= 767) {
                this.setup();
            }
            else {
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.home-sol',
                        start: 'top bottom+=50%',
                        end: 'bottom top',
                        once: true,
                        onEnter: () => {
                            this.setup()
                            // this.interact();
                        },
                    }
                })
            }
        }
        setup() {
            let pagiTemp = $('.home-sol-pagi-item').eq(0).clone()
            for (let i = 0; i < $('.home-sol-item').length - 1; i++) {
                $('.home-sol-pagi').append(pagiTemp.clone())
            }

            const title = new SplitType('.home-sol-title', { types: 'lines, words' });
            let itemSol = $('.home-sol-item');
            gsap.set(itemSol, { zIndex: (i) => itemSol.length - i })

            this.tlFade = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-sol-title-wrap',
                    start: 'top top+=65%',
                    once: true
                },
                onComplete: () => {
                    console.log("oncomplete")
                    title.revert();
                    gsap.set(itemSol, { clearProps: 'all' })
                    if (viewport.w <= 767) {
                        this.interact();
                    }
                }
            })

            this.tlFade
                .from('.home-sol-label', { y: 20, autoAlpha: 0, duration: 1, clearProps: 'all' })
                .from(title.words, { autoAlpha: 0, yPercent: 70, duration: .8, stagger: 0.03 }, "<=.1")
                .from('.home-sol-cms', {
                    yPercent: 20, autoAlpha: 0, duration: .8, clearProps: 'all',
                    onStart: () => {
                        if (viewport.w <= 767) return;
                        setTimeout(() => this.interact(), 300);
                    } }, "<=.1")
                .from('.home-sol-bg-light', { y: 50, autoAlpha: 0, duration: .8, ease: 'expo.out', clearProps: 'all' }, "<=.3")

            if (viewport.w > 767) {
                gsap.from('.home-sol-pagi', {
                    y: 20, autoAlpha: 0, duration: .6, clearProps: 'all', scrollTrigger: {
                        trigger: '.home-sol-pagi',
                        start: 'top bottom-=5%',
                    }
                })
            }
        }
        interact() {
            // console.log("riun")
            // function activeItem(index) {
            //     if ($('.home-sol-item').eq(index).hasClass('active')) return
            //     $('.home-sol-pagi-item').removeClass('active')
            //     $('.home-sol-pagi-item').eq(index).addClass('active')
            //     $('.home-sol-item').removeClass('active active-2 active-3')
            //     $('.home-sol-item').eq(index).addClass('active')
            //     $('.home-sol-item:not(.active)').each((idx, el) => {
            //         $(el).addClass(`active-${idx + 2}`)
            //     })
            // }
            function activeItem(index) {
                console.log(index)
                if ($('.home-sol-item').eq(index).hasClass('active')) return
                $('.home-sol-pagi-item').removeClass('active')
                $('.home-sol-pagi-item').eq(index).addClass('active')
                $('.home-sol-item').removeClass('active active-2 active-3')
                $('.home-sol-item').eq(index).addClass('active')
                // $('.home-sol-item').eq(index + 1).addClass('active-2')

                let start = $('.home-sol-item').length - index -1;
                let startNext = 0;
                $('.home-sol-item').each((idx, el) => {
                    if (idx == index){
                        return;
                    }
                    else if (idx < index){
                        $(el).addClass(`active-${start+2}`);
                        start ++;
                    }
                    else{
                        $(el).addClass(`active-${startNext+2}`);
                        startNext++;
                    }
                })
            }
            if (viewport.w > 767) {
                $('.home-sol-item').on('click', function(e) {
                    e.preventDefault();
                    activeItem($(this).index())
                })
                $('.home-sol-pagi-item').on('click', function(e) {
                    e.preventDefault();
                    activeItem($(this).index())
                })
                activeItem(0)
            }
            else {
                $('.home-sol-content [data-swiper]').each((_, item) => {
                    if ($(item).attr('data-swiper') == 'swiper')
                        $(item).addClass('swiper')
                    else
                        $(item).addClass(`swiper-${$(item).attr('data-swiper')}`)
                })
                let swiperSol = new Swiper('.home-sol-cms', {
                    spaceBetween: 0,
                    slidesPerView: 1,
                });
            }
        }
    }
    let homeSol = new HomeSol()

    class HomeWhy {
        constructor() {
            this.tlTrigger;
            this.tlFade;
        }
        setTrigger() {
            if (viewport.w <= 767) {
                this.setup();
            }
            else {
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.home-why',
                        start: 'top bottom+=50%',
                        end: 'bottom top',
                        once: true,
                        onEnter: () => {
                            this.setup();
                        },
                    }
                })
            }
        }
        setup() {
            const title = new SplitType('.home-why-title', { types: 'lines, words' });

            let labelSlide = new SlideText('.home-why-title-outer .txt-slider-wrap');
            labelSlide.setup();

            this.tlFade = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-why-title-wrap',
                    start: 'top top+=65%',
                    once: true,
                },
                onComplete: () => {
                    title.revert();
                    labelSlide.play();
                    gsap.set('.home-why-title-outer .txt-slider-inner', { clearProps: 'all' });
                }
            })
            this.tlFade
                .from('.home-why-label', { y: 20, autoAlpha: 0, duration: 1, clearProps: 'all' })
                .from([title.words, '.home-why-title-outer .txt-slider-inner'], { autoAlpha: 0, yPercent: 70, duration: .8, stagger: 0.03 }, "<=.1")
                .from('.home-why-btn', { y: 20, autoAlpha: 0, duration: .6 }, "<=0.1")

            $('.home-why-item').each((idx, el) => {
                const titleItem = new SplitType($(el).find('.home-why-item-title'), { types: 'lines, words' });
                const subItem = new SplitType($(el).find('.home-why-item-sub'), { types: 'lines, words' });

                this.tlFade
                    .from($(el).find('.home-why-item-line'), { scaleX: 0, transformOrigin: 'left', duration: .6, clearProps: 'all' }, `<=${idx * 0.05}`)
                    .from($(el).find('.home-why-item-img'), { scale: .7, y: 20, autoAlpha: 0, duration: .8, clearProps: 'all' }, "<=0")
                    .from(titleItem.words, { autoAlpha: 0, yPercent: 70, duration: .8, stagger: 0.03, onComplete: () => titleItem.revert() }, "<=0.1")
                    .from($(el).find('.home-why-item-label'), { autoAlpha: 0, y: 15, duration: .6 }, "<=0.1")
                    .from(subItem.words, { autoAlpha: 0, yPercent: 70, duration: .6, stagger: 0.02, onComplete: () => subItem.revert() }, "<=0.1")
            })

            if (viewport.w <= 767) {
                $('.home-why-content [data-swiper]').each((_, item) => {
                    if ($(item).attr('data-swiper') == 'swiper')
                        $(item).addClass('swiper')
                    else
                        $(item).addClass(`swiper-${$(item).attr('data-swiper')}`)
                })
                let swiperWhy = new Swiper('.home-why-cms', {
                    spaceBetween: 0,
                    slidesPerView: 'auto',
                });
            }
        }
    }
    let homeWhy = new HomeWhy();

    class AboutHero {
        constructor() {
            this.tlFade;
        }
        setup() {
            const title = new SplitType('.about-hero-title', { types: 'lines, words' });
            const sub = new SplitType('.about-hero-sub', { types: 'lines, words' });

            this.tlFade = gsap.timeline({
                paused: true,
                onComplete: () => {
                    title.revert();
                    sub.revert();
                }
            })

            this.tlFade
            .from('.about-hero-radar-scan-inner', { rotation: 100, duration: 1.2, ease: 'circ.inOut', clearProps: 'all', onStart: () => $('.about-hero-radar-scan').addClass('anim-spin')  })
            .from('.about-hero-radar-scan', { rotation: 100, autoAlpha: 0, duration: 1.2, ease: 'circ.inOut', clearProps: 'all', }, "<=.05")
            .from('.about-hero-ellipse', { borderRadius: 0, duration: 1.2, ease: 'circ.inOut', clearProps: 'all', }, "<=.05")
            .from('.about-hero-radar-dot', { autoAlpha: 0, scale: 1.5, stagger: .1, duration: 1.5, ease: 'back.out(1.3)', clearProps: 'all', }, "<=0.5")
            .from('.about-hero-radar-circle circle, .about-hero-radar-circle ellipse', { autoAlpha: 0, duration: 1.2, stagger: .1, ease: 'circ.out', clearProps: 'all', }, "<=0")
            .from(title.words, { autoAlpha: 0, yPercent: 70, duration: .8, stagger: 0.05 }, "<=0")
            .from(sub.words, { autoAlpha: 0, yPercent: 70, duration: .6, stagger: 0.02 }, "<=.2")

            this.tlFade.play();
        }
    }
    let aboutHero = new AboutHero();

    class AboutQuote {
        constructor() {
            this.tlTrigger;
            this.tlFade;
        }
        setTrigger() {
            if (viewport.w <= 767) {
                this.setup();
            }
            else {
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.about-quote',
                        start: 'top bottom+=50%',
                        end: 'bottom top',
                        once: true,
                        onEnter: () => {
                            this.setup();
                        },
                    }
                })
            }
        }
        setup() {
            replaceHyphen('.about-quote-title')
            const title = new SplitType('.about-quote-title-wrap', { types: 'lines, words' });
            const author = new SplitType('.about-quote-author', { types: 'lines, words' });
            const position = new SplitType('.about-quote-position', { types: 'lines, words' });

            title.words.forEach(word => word.innerHTML = convertHyphen(word.innerHTML));

            this.tlFade = gsap.timeline({
                scrollTrigger: {
                    trigger: viewport.w > 767 ? '.about-quote-title-wrap' : '.about-quote-img',
                    start: `top top+=${viewport.w > 767 ? 65 : 75}%`,
                    once: true
                },
                delay: (viewport.w > 767 && viewport.w <= 991) ? .6 : 0,
                onComplete: () => {
                    title.revert();
                    author.revert();
                    position.revert();
                    gsap.set('.about-quote-title-quote-ic', { clearProps: 'all' });
                }
            })

            this.tlFade
                .from(['.about-quote-title-quote-ic', title.words], { autoAlpha: 0, yPercent: 70, duration: .6, stagger: 0.02 })
                .from('.about-quote-img', { autoAlpha: 0, y: 50, duration: .8, clearProps: 'all' }, "<=.1")
                .from(author.words, { autoAlpha: 0, yPercent: 80, duration: .6, stagger: 0.02 }, ">=-.1")
                .from(position.words, { autoAlpha: 0, yPercent: 70, duration: .6, stagger: 0.02 }, "<=0.2")
        }
    }
    let aboutQuote = new AboutQuote();
    class AboutTeam {
        constructor() {
            this.tlTrigger;
            this.tlFade;
        }
        setTrigger() {
            if (viewport.w <= 767) {
                this.setup();
                this.interact();
            }
            else {
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.about-team',
                        start: 'top bottom+=50%',
                        end: 'bottom top',
                        once: true,
                        onEnter: () => {
                            this.setup();
                            this.interact();
                        },
                    }
                })
            }
        }
        setup(){
            replaceHyphen('.about-team-sub');
            const title = new SplitType('.about-team-title', { types: 'words' });
            const sub = new SplitType('.about-team-sub', { types: 'words' });
            this.tlFade = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-team-title-wrap',
                    start: 'top top+=65%',
                    once: true
                },
                onComplete: () => {
                    console.log("oncomplete")
                    title.revert();
                    sub.revert();
                }
            })
            this.tlFade
                .from('.about-team-label', { y: 20, autoAlpha: 0, duration: 1, clearProps: 'all' })
                .from(title.words, { autoAlpha: 0, yPercent: 70, duration: .8, stagger: 0.02 }, "<=0")
                .from(sub.words, { autoAlpha: 0, yPercent: 60, duration: .4, stagger: 0.02 }, "<=.2")
                .from('.about-team-tab-wrap', { autoAlpha: 0, yPercent: 60, duration: .6, stagger: 0.02 }, "<=.3");
            let allItems = $('.about-team-cms').eq(0).find('.about-team-item');
            let tlItem =  gsap.timeline({
                scrollTrigger: {
                    trigger: ".about-team-cms",
                    start: $(window).width() > 767 ? "top top+=65%" : "top bottom-=40%",
                },
            })
            allItems.each((idx, item) => {
                tlItem
                .from($(item).find('.about-team-item-img'), {autoAlpha: 0, scale: .8, duration: .8, ease: 'power1.inOut' }, `${idx == 0 ? "<=" : ""}${0 + idx * 0.2}`)
                .from($(item).find('.about-team-item-info'), {autoAlpha: 0, yPercent: 20, duration: .6, ease: 'power1.inOut', clearProps: 'all' }, '<=.2')
                // .from($(item).find('.about-team-item-desc'), {autoAlpha: 0, yPercent: 60, duration: .6, ease: 'power1.inOut', clearProps: 'all' }, '<=.2')
            })
            let tlJoin = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-team-join',
                    start: 'top top+=75%'
                }
            })
            const titleJoin = new SplitType('.about-team-join-title', { types: 'words' });
            const subJoin = new SplitType('.about-team-join-sub', { types: 'words' });
            tlJoin
                .from(titleJoin.words, {autoAlpha: 0, yPercent: 50, duration: .8, stagger: .02})
                .from(subJoin.words, {autoAlpha: 0, yPercent: 80, duration: .4, stagger: .02}, '<=.2')
                .from('.about-team-join-btn', {autoAlpha: 0, yPercent: 50, duration: .4, stagger: .02}, '<=.3');
            $('.about-team-cms').eq(0).css('z-index', '2');
        }
        interact() {
            gsap.set('.about-team-item-img', { autoAlpha: 0, scale: .8, duration: 0 });
            gsap.set('.about-team-item-info', { autoAlpha: 0, y: 10, duration: 0 });

            const activeIndex = (index) => {
                if ($('.about-team-tab-inner').hasClass('animating')) return;

                $('.about-team-tab-inner').addClass('animating');

                $('.about-team-tab').removeClass('active');
                $('.about-team-tab').eq(index).addClass('active');
                $('.about-team-cms').css('z-index', '1');
                $('.about-team-cms').eq(index).css('z-index', '2');
                gsap.set($('.about-team-cms').eq(index).find('.about-team-item-img'), { autoAlpha: 0, scale: .8, duration: 0 });
                gsap.to($('.about-team-cms').eq(index).find('.about-team-item-img'), { autoAlpha: 1, scale: 1, duration: .6,  stagger: .04, ease: 'power3.inOut'  });
                gsap.to($('.about-team-cms').not($('.about-team-cms').eq(index)).find('.about-team-item-img'), { autoAlpha: 0, duration: .5, ease: 'power3.inOut'  });

                gsap.set($('.about-team-cms').eq(index).find('.about-team-item-info'), { autoAlpha: 0, y: 10, duration: 0 });
                gsap.to($('.about-team-cms').eq(index).find('.about-team-item-info'), { autoAlpha: 1, y: 0, duration: .6, stagger: .04, delay: .1, ease: 'power3.inOut'  });
                gsap.to($('.about-team-cms').not($('.about-team-cms').eq(index)).find('.about-team-item-info'), { autoAlpha: 0, duration: .3, ease: 'power3.inOut'  });

                gsap.to('.about-team-tab-bg', { xPercent: 100 * index, duration: 1, delay: .1, ease: 'expo.out', onComplete: () => $('.about-team-tab-inner').removeClass('animating') });
            }
            $('.about-team-tab').on('click', function (e) {
                e.preventDefault();
                console.log("click")
                let index = $(this).index();
                activeIndex(index)
            })
            // activeIndex(0);
        }
    }
    let aboutTeam = new AboutTeam();

    class AboutAchieve {
        constructor() {
            this.tlTrigger;
            this.tlFade;
        }
        setTrigger() {
            if (viewport.w <= 767) {
                this.setup();
            }
            else {
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.about-achieve',
                        start: 'top bottom+=50%',
                        end: 'bottom top',
                        once: true,
                        onEnter: () => {
                            this.setup();
                        },
                    }
                })
            }
        }
        setup() {
            if (viewport.w <= 767) {
                $('.about-achieve-content [data-swiper]').each((_, item) => {
                    if ($(item).attr('data-swiper') == 'swiper')
                        $(item).addClass('swiper')
                    else
                        $(item).addClass(`swiper-${$(item).attr('data-swiper')}`)
                })
                let swiperAchieve = new Swiper('.about-achieve-wrapper', {
                    spaceBetween: 0,
                    slidesPerView: 'auto',
                });
            }
            const title = new SplitType('.about-achieve-title', { types: 'lines, words' });
            const sub = new SplitType('.about-achieve-sub', { types: 'lines, words' });
            this.tlFade = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-achieve-title-wrap',
                    start: 'top top+=65%',
                    once: true
                },
                onComplete: () => {
                    console.log("oncomplete")
                    title.revert();
                    sub.revert();
                }
            })
            this.tlFade
                .from('.about-achieve-label', { y: 20, autoAlpha: 0, duration: 1, clearProps: 'all' })
                .from(title.words, { autoAlpha: 0, yPercent: 70, duration: .8, stagger: 0.02 }, "<=0")
                .from(sub.words, { autoAlpha: 0, yPercent: 60, duration: .4, stagger: 0.02 }, "<=.2")
            const allItems = $('.about-achieve-item');
            allItems.each((idx, item) => {
                let titleItem = new SplitType($(item).find('.about-achieve-item-title'), {types: 'words'});
                let subItem = new SplitType($(item).find('.about-achieve-item-sub'), {types: 'words'});
                let tlItem = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: 'top top+=75%',
                        once: true
                    },
                    onComplete: () => {
                        titleItem.revert();
                        subItem.revert();
                    }
                })
                tlItem
                    .from($(item).find('.div-line.ver-vertical'), {autoAlpha:0, scale: .8, duration: 1, clearProps: 'all'})
                    .from($(item).find('.about-achieve-item-order'), {autoAlpha: 0, yPercent: 100, duration: .8, clearProps: 'all'}, "<=0")
                    .from($(item).find('.about-achieve-item-ic'), {autoAlpha: 0, yPercent: 70, duration: 1, clearProps: 'all'}, "<=0.1")
                    .from(titleItem.words, {autoAlpha: 0, yPercent: 100, duration: .8, stagger: .02 }, "<=.2")
                    .from(subItem.words, {autoAlpha: 0, yPercent: 100, duration: .5, stagger: .015 }, "<=.2")
            })
        }
    }
    let aboutAchieve = new AboutAchieve();

    class AboutCollab {
        constructor(){
            this.tlTrigger;
            this.tlFade;
        }
        setTrigger() {
            if (viewport.w <= 767) {
                this.setup();
            }
            else {
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.about-collab',
                        start: 'top bottom+=50%',
                        end: 'bottom top',
                        once: true,
                        onEnter: () => {
                            this.setup();
                        },
                    }
                })
            }
        }
        setup() {
            const title = new SplitType('.about-collab-title', { types: 'words' });
            const sub = new SplitType('.about-collab-sub', { types: 'words' });
            this.tlFade = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-collab-title-wrap',
                    start: 'top top+=65%',
                    once: true
                },
                onComplete: () => {
                    title.revert();
                    sub.revert();
                }
            })
            this.tlFade
                .from('.about-collab-label', { y: 20, autoAlpha: 0, duration: 1, clearProps: 'all' })
                .from(title.words, { autoAlpha: 0, yPercent: 70, duration: .8, stagger: 0.05 }, "<=0")
                .from(sub.words, { autoAlpha: 0, yPercent: 60, duration: .4, stagger: 0.02 }, "<=.2")
                .from('.about-collab-btn', { autoAlpha: 0, y: 20, duration: .6 }, "<=.3")
            const allItems = $('.about-collab-partner-item');
            let tlItem = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-collab-partner-list',
                    start: 'top top+=65%',
                    once: true
                },
            })
            tlItem
                .from($(allItems).find('.div-line'), {autoAlpha: 0, scale: 0, duration: .5, stagger: .04, clearProps: 'all'})
                .from($(allItems).find('img'), {autoAlpha: 0, yPercent: 40, duration: 1, stagger: .15, clearProps: 'all'}, '<=0')
        }
    }
    let aboutCollab = new AboutCollab();

    class ContactHero {
        constructor() {
            this.tlFade;
        }
        setup() {
            const title = new SplitType('.contact-hero-title', { types: 'lines, words' });
            const sub = new SplitType('.contact-hero-sub', { types: 'lines, words' });
            $('[data-hidden]').slideUp('fast');
            $('[data-hidden] input').prop('required', false);

            this.tlFade = gsap.timeline({
                paused: true,
                onComplete: () => {
                    title.revert();
                    sub.revert();

                    this.interact();
                }
            })

            this.tlFade
                .from('.contact-hero-bg-inner', { autoAlpha: 0, y: 50, duration: 1.5, ease: 'back.out(1.3)' })
                .from(title.words, { autoAlpha: 0, yPercent: 70, duration: .8, stagger: 0.05 }, "<=0.1")
                .from(sub.words, { autoAlpha: 0, yPercent: 70, duration: .6, stagger: 0.02 }, "<=.2")
                .from('.contact-hero-form-block', { autoAlpha: 0, y: 20, duration: .6 }, "<=0")
                .from('.contact-hero-form > *', { autoAlpha: 0, y: 20, duration: .6, stagger: 0.06, clearProps: 'all' }, "<=.2")
            this.tlFade.play();
        }
        interact() {
            const dropdownAction = {
                open: (parent) => {
                    const selector = (child) => parent ? parent(child) : $(child);
                    selector('.select-field-grp').addClass('active');
                    selector('.select-dropdown-opts').addClass('active');
                    selector('.select-dropdown-toggle').addClass('active');
                    // selector('.dropdown-select').slideDown();
                },
                close: (parent) => {
                    const selector = (child) => parent ? parent(child) : $(child);
                    selector('.select-field-grp').removeClass('active');
                    selector('.select-dropdown-opts').removeClass('active');
                    selector('.select-dropdown-toggle').removeClass('active');
                    // selector('.dropdown-select').slideUp();
                },
                toggle: (parent) => {
                    parent().toggleClass('active');
                    $(`.select-field-grp`).not(parent()).removeClass('active');

                    parent('.select-dropdown-opts').toggleClass('active');
                    $(`.select-dropdown-opts`).not(parent('.select-dropdown-opts')).removeClass('active');

                    parent('.select-dropdown-toggle').toggleClass('active');
                    $(`.select-dropdown-toggle`).not(parent('.select-dropdown-toggle')).removeClass('active');

                    // parent('.dropdown-select').slideToggle();
                    // $(`.dropdown-select`).not(parent('.dropdown-select')).slideUp();
                }
            }
            $(`.select-dropdown-toggle`).on('click', function (e) {
                console.log("rclick")
                let parent = childSelect($(this).parents('.select-field-grp'));
                dropdownAction.toggle(parent);
            })

            $(window).on('click', (e) => {
                if (!$('.select-dropdown-toggle:hover').length)
                    if (!$('.select-dropdown-opts:hover').length)
                        dropdownAction.close();
            })

            $('.select-dropdown-opt').on('click', function (e) {
                e.preventDefault();
                const parent = childSelect($(this).parents('.select-field-grp'));

                if ($(this).hasClass('active')) return;
                $(this).siblings().removeClass('active');
                $(this).addClass('active');

                let valText = $(this).text();
                parent('.input-field.type-select').val(valText);
                dropdownAction.close(parent);

                if ($(this).attr('id')) {
                    let target = `?${parent('input').attr('data-name').toLowerCase()}=${$(this).attr('id')}`;
                    history.replaceState({}, '', `${window.location.pathname + target}`);
                }

                if (parent('.select-dropdown-toggle').attr('data-toggle-hidden')) {
                    $(`[data-hidden="${valText}"]`).slideDown('fast');
                    $(`[data-hidden]:not([data-hidden="${valText}"])`).slideUp('fast');

                    $(`[data-hidden="${valText}"] input`).prop('required', true);
                    $(`[data-hidden]:not([data-hidden="${valText}"]) input`).prop('required', false);
                }
            })

            $('.input-field-grp [type="tel"]').bind('change keydown keyup', function (e) {
                let inputVal = $(this).val();
                $(this).val(inputVal.replace(/\D/g, ''));
            })

            $('.input-field-grp .input-field').on('blur', function (e) {
                if ($(this).val() != '') {
                    $(this).closest('.input-field-grp').addClass('filled')
                }
                else {
                    $(this).closest('.input-field-grp').removeClass('filled')
                }
            })

            let searchParam = new URLSearchParams(window.location.search);
            let topicParam = searchParam.get('topic');
            if (topicParam) {
                $(`#${topicParam}`).trigger('click');
            }
            else {
                history.replaceState({}, '', window.location.pathname);
            }

            const onSuccessForm = (formID) => {
                $('.contact-hero-popup').addClass('active');
                $('.header').addClass('on-hide');
                gsap.fromTo('.contact-hero-popup-content', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: .6, ease: 'power3.out' });
                lenis.stop();

                $('.contact-hero-popup-close').on('click', function (e) {
                    e.preventDefault();
                    $('.contact-hero-popup').removeClass('active');
                    $('.header').removeClass('on-hide');
                    gsap.fromTo('.contact-hero-popup-content', { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: 20, duration: .6, ease: 'power3.out' });
                    lenis.start();
                    $(`${formID} .input-submit-wrap .txt`).text('Submit');
                })

                $(window).on('click', (e) => {
                    if (!$('.contact-hero-popup-content:hover').length) {

                        $('.contact-hero-popup').removeClass('active');
                        $('.header').removeClass('on-hide');
                        gsap.fromTo('.contact-hero-popup-content', { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: 20, duration: .6, ease: 'power3.out' });
                        lenis.start();
                        $(`${formID} .input-submit-wrap .txt`).text('Submit');
                    }
                })

                setTimeout(() => {
                    $(formID).trigger('reset');
                    $('.input-field-grp').removeClass('filled');
                    $('.select-dropdown-opt').removeClass('active');
                }, 1000);
            }

            formSubmitEvent.init({
                onlyWorkOnThisFormName: 'Contact Form',
                onSuccess: () => onSuccessForm('#contact-form')
            })
        }
    }
    let contactHero = new ContactHero();

    class SubsContent {
        constructor() {
            this.tlTrigger;
            this.tlFade;
        }
        setTrigger() {
            if (viewport.w <= 767) {
                this.setup();
            }
            else {
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.subs-content',
                        start: 'top bottom+=50%',
                        end: 'bottom top',
                        once: true,
                        onEnter: () => {
                            this.setup();
                        },
                    }
                })
            }
        }
        setup() {
            let tocHeadings = $('.subs-content-main h2');

            let tocWrap = $('.subs-content-tocs');
            if (tocHeadings.length <= 1) {
                tocWrap.parents('.subs-content-toc-wrap').remove();
            }
            tocWrap.html('');

            for (let i = 0; i < tocHeadings.length; i++) {
                tocHeadings.eq(i).attr('id', `toc-${i}`);
                let tocItem = $('<a></a>').addClass('subs-content-toc').attr('href', `#toc-${i}`);
                let tocName = $('<div></div>').addClass('txt txt-16 txt-med subs-toc-txt').text(tocHeadings.eq(i).text());

                tocName.appendTo(tocItem)
                tocWrap.append(tocItem);
            }

            $('.subs-content-toc').each((idx, el) => {
                gsap.from(el, {
                    autoAlpha: 0, yPercent: 70, duration: .8, stagger: 0.02, delay: idx * .05, clearProps: 'all', onComplete: () => {
                        if (idx == $('.subs-content-toc').length - 1) {
                            this.interact();
                        }
                    }
                });
            })
            gsap.from('.subs-content-inner', { autoAlpha: 0, y: 20, duration: .6 });
        }
        interact() {
            let tocHeadings = $('.subs-content-main h2');

            lenis.on('scroll', function (e) {
                let currScroll = e.scroll;
                for (let i = 0; i < tocHeadings.length; i++) {
                    let top = tocHeadings.eq(i).get(0).getBoundingClientRect().top;
                    if (top > 0 && top < (viewport.h / 5)) {
                        $(`.subs-content-toc[href="#toc-${i}"]`).addClass('active');
                        $(`.subs-content-toc`).not(`[href="#toc-${i}"]`).removeClass('active');
                    }
                }
            });

            $('.subs-content-toc').on('click', function (e) {
                e.preventDefault();
                let target = $(this).attr('href');

                lenis.scrollTo(target, {
                    offset: -100,
                })

                history.replaceState({}, '', `${window.location.pathname + target}`);
                return false;
            })

            const currToc = window.location.hash;
            if ($(currToc).length) {
                setTimeout(() => {
                    $(`.subs-content-toc[href='${currToc}']`).trigger('click');
                }, 10)
            }
            else {
                history.replaceState({}, '', window.location.pathname);
            }
        }
    }
    let subsContent = new SubsContent();
    class SRAAHero{
        constructor(){
            this.tlFade;
        }
        setup(){
            // $('.raa-hero-thumb-circ circle').removeClass('anim-spin');
            // $('.raa-hero-thumb-light g').css('transform-origin', 'center center !important')
            const title = new SplitType('.raa-hero-title', {types : 'words'})
            const sub = new SplitType('.raa-hero-sub',  {types : 'words'})
            this.tlFade = gsap.timeline({
                onComplete: () => {
                    title.revert();
                    sub.revert();
                    setTimeout(() => {
                        if (viewport.w > 767) {
                            loopAnim();
                        }
                    },100)
                }
            })

            gsap.set(`.raa-hero-thumb-circ.only-${viewport.w>767 ? 'desk' : 'mb'} svg`, { autoAlpha: 0, scale: 1.2, filter: 'blur(5px)', duration: 0 })
            gsap.set(`.raa-hero-thumb-light.only-${viewport.w>767 ? 'desk' : 'mb'}`, { scale: 1.05, duration: 0 }, '<=.4')


            this.tlFade
                .from(title.words, {autoAlpha: 0, yPercent: 70, stagger: .05, duration: .8})
                .from(sub.words, {autoAlpha: 0, yPercent: 70, stagger: .02, duration: .6 }, '<=.1')
                .from('.raa-hero-btn', { y: 20, autoAlpha: 0, duration: .6, clearProps: 'all' }, "<=.1")

            this.tlFade
                .from('.raa-hero-thumb-main .img-basic.raa-hero-thumb-main-lock-layer.layer-1', {autoAlpha: 0, filter: 'blur(20px)', scale: .6, duration: 1.2, ease: 'circ.inOut'}, '<=-0.4')
                .from('.raa-hero-thumb-main .img-basic.raa-hero-thumb-main-lock-layer.layer-2', {autoAlpha: 0,scale: .8, duration: 1.5, ease: 'back.out(1.3)' }, '<=0.1')
                .from(`.raa-hero-thumb-light.only-${viewport.w>767 ? 'desk' : 'mb'} circle`, { autoAlpha: 0, duration: 1.2, stagger: .06, ease: 'back.out(1.3)' }, '<=0')
                .to(`.raa-hero-thumb-circ.only-${viewport.w>767 ? 'desk' : 'mb'} svg`, { autoAlpha: 1, scale: 1.05, filter: 'blur(0px)', duration: 1.2, stagger: .06, ease : 'back.out(1.3)'}, '<=.2')
                .from('.raa-hero-thumb-main-fire', { autoAlpha: 0, scaleX: 1.4, scaleY: .5, y: 20, transformOrigin: 'center top',  duration: 1.5, stagger: .1, ease:'circ.inOut' }, '<=0')
                .from('.raa-hero-thumb-main .img-basic.raa-hero-thumb-main-lock-layer.layer-3', { autoAlpha: 0, duration: .6, ease: 'none'}, '<=0.1')

            const loopAnim = () => {
                let tlThumb = gsap.timeline({
                    repeat: -1,
                })
                tlThumb
                    .set(`.raa-hero-thumb-circ.only-${viewport.w>767 ? 'desk' : 'mb'} svg`, { scale: 1.05, duration: 0 })
                    .to(`.raa-hero-thumb-circ.only-${viewport.w>767 ? 'desk' : 'mb'} svg`, { scale: 1, duration: 3, stagger: .1, ease: 'back.out(1.3)'})
                    .to('.raa-hero-thumb-main-fire', {autoAlpha: 0, duration: 1.5, ease:'linear' }, '<=.0')
                    .to('.raa-hero-thumb-main .img-basic.raa-hero-thumb-main-lock-layer.layer-3', { autoAlpha: 0, duration: .6, ease: 'none'}, '<=0.1')
                    .to(`.raa-hero-thumb-light.only-${viewport.w>767 ? 'desk' : 'mb'} circle`, { autoAlpha: 0, duration: 1, stagger: .1, ease: 'none' },'<=.2' )
                    .to('.raa-hero-thumb-main-lock ', { scale: .98, duration: 1.2, ease: 'back.out(1.3)' })
                    .to(`.raa-hero-thumb-circ.only-${viewport.w>767 ? 'desk' : 'mb'} svg`, { scale: 1.05, stagger: .06, duration: 2, ease: 'back.out(1.3)' }, '<=0')
                    .to('.raa-hero-thumb-main-fire', { autoAlpha: 1, duration: 1,  ease:'linear' }, '<=0')
                    .to('.raa-hero-thumb-main .img-basic.raa-hero-thumb-main-lock-layer.layer-3', { autoAlpha: 1, duration: .6, ease: 'none'}, '<=0.1')
                    .to(`.raa-hero-thumb-light.only-${viewport.w>767 ? 'desk' : 'mb'} circle`, { autoAlpha: 1, duration: 1.2, stagger: .06, ease: 'linear'},'<=.2')
                    .to('.raa-hero-thumb-main-lock', { scale: 1, duration: 1.2, ease: 'sine.inOut'})
            }
        }
    }
    let srraaHero = new SRAAHero();
    class SRAAFea{
        constructor(){
            this.tlTrigger;
            this.tlFade;
        }
        setTrigger() {
            if (viewport.w <= 767) {
                this.setup();
                this.interact();
            }
            else {
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.raa-fea',
                        start: 'top bottom+=50%',
                        end: 'bottom top',
                        once: true,
                        onEnter: () => {
                            this.setup();
                            this.interact();
                        },
                    }
                })
            }
        }
        setup(){
            let arrClass = ['.raa-fea-cms-img-item', '.raa-fea-cms-item'];
            let arrSlide = ['.raa-fea-cms-item-content-wrap'];
            activeItemGlobal(arrClass, 0);
            slideItemGlobal(arrSlide, 0);
            const title = new SplitType('.raa-fea-title', {types: 'words'});
            const sub = new SplitType('.raa-fea-sub', {types: 'words'});
            this.tlFade = gsap.timeline({
                scrollTrigger: {
                    trigger: '.raa-fea-title-wrap',
                    start: 'top top+=70%',
                    once: true,
                },
                onComplete: () => {
                    title.revert();
                    sub.revert();
                }
            })
            this.tlFade
                .from('.raa-fea-label', {autoAlpha: 0, y: 20, duration: 1 , clearProps: 'all'})
                .from(title.words, {autoAlpha: 0, yPercent: 70, stagger: .02, duration: .8},'<=0')
                .from(sub.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .4 }, '<=0')
                .from('.raa-fea-btn', {autoAlpha: 0, y: 20, duration: .6 }, '<=.2')
                .from($('.raa-fea-sub-wrap').next('.div-line'), {autoAlpha: 0,scale: 0, duration: .8}, '<=.2')
            let tlImg = gsap.timeline({
                scrollTrigger: {
                    trigger: '.raa-fea-cms-img-item.active',
                    start: 'top top+=65%',
                    once: true
                }
            })
            tlImg
                .from('.raa-fea-cms-list-img', {autoAlpha: 0, y: 40, duration: .5, clearProps: 'all'})
            let allItems = $('.raa-fea-cms-item');
            let tlItem = gsap.timeline({
                scrollTrigger: {
                    trigger: '.raa-fea-cms',
                    start: 'top top+=65%',
                    once: true,
                }
            })
            allItems.each((idx, item) => {
                let title = new SplitType($(item).find('.raa-fea-cms-item-title-txt'), {type: 'words'})
                tlItem
                    .from(title.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .6, onComplete: () => {title.revert()}}, idx * 0.2)
                if(idx == 0){
                    let content = new SplitType($(item).find('.raa-fea-cms-item-content p'), {type: 'words'})
                    tlItem
                        .from(content.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .6, onComplete: () => {title.revert()}}, '<=.2')
                }
                tlItem
                    .from($(item).find('.raa-fea-cms-item-ic'), {autoAlpha: 0 , scale: 0, duration: .4, clearProps: 'all'}, '<=.0')
                    .from($(item).find('.div-line'), {autoAlpha: 0 , scale: 0, duration: .4, clearProps: 'all'}, '<=.2')
            })

        }
        interact(){
            let arrClass = ['.raa-fea-cms-img-item', '.raa-fea-cms-item'];
            let arrSlide = ['.raa-fea-cms-item-content-wrap'];
            $('.raa-fea-cms-item').on('click', function(){
                let indexActive = $('.raa-fea-cms-item.active').index();
                console.log(indexActive)
                let index = $(this).index();
                if(indexActive !== index){
                    activeItemGlobal(arrClass, index)
                    slideItemGlobal(arrSlide, index)
                }
                else{
                    $('.raa-fea-cms-item').removeClass('active')
                    $('.raa-fea-cms-item-content-wrap').slideUp();
                }
            })
        }
    }
    let sraaFea = new SRAAFea();
    class SRAAApp{
        constructor(){
            this.tlTrigger;
            this.tlFade;
        }
        setTrigger() {
            if (viewport.w <= 767) {
                this.setup();
            }
            else {
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.raa-app',
                        start: 'top bottom+=50%',
                        end: 'bottom top',
                        once: true,
                        onEnter: () => {
                            this.setup();
                        }
                    }
                })
            }
        }
        setup(){
            const title = new SplitType('.raa-app-title', {types: 'words'});
            const sub = new SplitType('.raa-app-sub', {types: 'words'});
            this.tlFade = gsap.timeline({
                scrollTrigger: {
                    trigger: '.raa-app-title',
                    start : 'top top+=65%',
                    once: true,
                    onComplete: () => {
                        title.revert();
                        sub.revert();
                    }
                }
            })
            this.tlFade
                .from(title.words, {autoAlpha: 0, yPercent: 60, duration: .6, stagger: .02})
                .from(sub.words, {autoAlpha: 0, yPercent: 60, duration: .4, stagger: .02}, '<=.2')
                .from('.raa-app-btn', {autoAlpha: 0, y: 20, duration: .8}, '>=-.3')
            let tlThumb = gsap.timeline({
                scrollTrigger: {
                    trigger: '.raa-app-thumb',
                    start: 'top top+=65%',
                    once: true
                }
            })
            tlThumb
                .from('.raa-app-thumb-main', {autoAlpha: 0, y: 100, duration: .6, clearProps: 'all'})
                .from('.raa-app-thumb-circ', {autoAlpha: 0, scale: .8, duration: 1.6, },'<=.1')

            let listTitle = new SplitType('.raa-app-list-title', { types: 'words' });

            let tlItem = gsap.timeline({
                scrollTrigger: {
                    trigger: '.raa-app-list',
                    start: 'top top+=80%',
                },
                onComplete: () => {
                    listTitle.revert();
                }
            })
            tlItem
                .from(listTitle.words, { autoAlpha: 0, yPercent: 60, duration: .6, stagger: .02 })
                .from('.raa-app-card', {autoAlpha: 0, y: 20, x: viewport.w > 991 ? 20 : 0, duration: .6, stagger: .1, clearProps: 'all'}, '<=.0')
        }
    }
    let sraaApp = new SRAAApp();
    class SRAAHiW {
        constructor() {
            this.tlTrigger;
            this.tlFade;
        }
        setTrigger() {
            if (viewport.w <= 767) {
                this.setup();
            }
            else {
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.raa-hiw',
                        start: 'top bottom+=50%',
                        end: 'bottom top',
                        once: true,
                        onEnter: () => {
                            this.setup();
                        },
                    }
                })
            }
        }
        setup(){
            const title = new SplitType('.raa-hiw-title', {types: 'words'});
            const sub = new SplitType('.raa-hiw-sub', {types: 'words'});
            this.tlFade = gsap.timeline({
                scrollTrigger: {
                    trigger: '.raa-hiw-title-wrap',
                    start: 'top top+=65%',
                    once: true,
                    onComplete: () => {
                        title.revert();
                        sub.revert();
                    }
                }
            })
            this.tlFade
                .from('.raa-hiw-label', {autoAlpha: 0, yPercent: 100, duration: .5, clearProps: 'all'})
                .from(title.words, {autoAlpha: 0, yPercent: 60, duration: .8,stagger: 0.02},'<=.2')
                .from(sub.words, {autoAlpha: 0, yPercent: 80, duration: .4, stagger: 0.02}, '<=0')
            let tlItem = gsap.timeline({
                scrollTrigger: {
                    trigger: '.raa-hiw-main',
                    start: 'top top+=65%',
                    once: true
                },
                onComplete: () => {
                    gsap.set('.raa-hiw-main-bg-cliplayer', {autoAlpha: 1})
                    this.interact();
                }
            })
            let allItems = $('.raa-hiw-main-bg-under');
            gsap.set('.raa-hiw-main-bg-cliplayer', {autoAlpha: 0})
            allItems.each((idx, item) => {
                tlItem
                    .from($(item).find('path'), {autoAlpha: 0, duration: .4, clearProps: 'all', ease: 'power2.out'},idx * 0.2)
                if($('.raa-hiw-main-title-inner').eq(idx).length > 0){
                    tlItem.from($('.raa-hiw-main-title-inner').eq(idx), { autoAlpha: 0, x: -10, stagger: .03, duration: .6, ease: 'power2.out', clearProps: 'all'}, '>=.1')
                }
            })
        }
        interact() {
            $('.raa-hiw-main-title-inner').on('mouseenter', function(e) {
                e.preventDefault();
                $('.raa-hiw-main-bg-under').eq($(this).index() + 1).addClass('active');
            })
            $('.raa-hiw-main-title-inner').on('mouseleave', function(e) {
                $('.raa-hiw-main-bg-under').eq($(this).index() + 1).removeClass('active');
            })

            const createItem = (item, parent, delay) => {
                gsap.to(item, {
                    y: `+=${gsap.utils.random(-3, 3)}`,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    duration: 2
                });
                gsap.to(item, {
                    repeat: -1,
                    yoyo: true,
                    ease: "linear",
                    rotation: `+=${gsap.utils.random(-45, 45)}`,
                    transformOrigin: "center",
                    duration: 20
                });
                gsap.fromTo(item, {
                    x: -item.width(),
                    y: gsap.utils.random(-parent.height() / 3.5, parent.height() / 3.5),
                    opacity: 1,
                    filter: 'saturate(1) blur(0px)',
                    scale: gsap.utils.random(.8, 1),
                },
                {
                    x: $('.raa-hiw-main-bg-topper').width() / 100 * 80,
                    y: parent.height() / 10 - item.height() / 2,
                    scale: 0,
                    delay: delay,
                    opacity: .9,
                    filter: 'saturate(0.5) blur(1px)',
                    duration: 10,
                    ease: "linear",
                    immediateRender: false
                })
            };

            const playAnimations = (parent, idx) => {
                const baseItem = parent.find('.raa-hiw-main-bg-malware');

                parent.html('')

                const items = [];
                let cloneAmount = 4;
                let delay = [idx];

                for (let i = 0; i < cloneAmount; i++) {
                    const newItem = baseItem.clone();
                    gsap.set(newItem, { opacity: 0, scale: 1, x: 0, y: gsap.utils.random(-parent.height() / 3.5, parent.height() / 3.5) });
                    parent.append(newItem);
                    items.push(newItem);
                    if (i > 0) {
                        delay.push(gsap.utils.random(4, 5));
                    }
                }

                const sumToIndex = (arr, index) => arr.slice(0, index + 1).reduce((sum, value) => sum + value, 0);
                const repeatAnimation = () => {
                    items.forEach((item, index) => {
                        createItem(item, parent, sumToIndex(delay, index));
                    });
                };

                repeatAnimation();
                let totalDelay = delay.reduce((a, b) => a + b, 0);
                gsap.delayedCall(totalDelay, function repeat() {
                    repeatAnimation();
                    gsap.delayedCall(totalDelay, repeat);
                });
            };

            $('.raa-hiw-main-bg-cliplayer').each((idx, item) => {
                playAnimations($(item), idx);
            })
        }
    }
    let sraaHiw = new SRAAHiW();

    class DMSHero {
        constructor() {
            this.tlFade;
        }
        setup() {
            const title = new SplitType('.dms-hero-title', { types: 'lines, words' });
            const sub = new SplitType('.dms-hero-sub', { types: 'lines, words' });
            this.tlFade = gsap.timeline({
                paused: true,
                onComplete: () => {
                    title.revert();
                    sub.revert();
                }
            })

            this.tlFade
                .from('.dms-hero-ellipse', { autoAlpha: 0, duration: 1.5, ease: 'back.out(1.3)' }, "<=0")
                .from('.dms-hero-thumb-light', { autoAlpha: 0, filter: 'blur(20px)', scale: .6, duration: 1.2, stagger: .1, ease: 'circ.inOut', clearProps: 'all', onComplete: () => $('.dms-hero-thumb-light').addClass('anim-fade-dot') }, "<=.1")
                .from('.dms-hero-thumb-board', { autoAlpha: 0, scale: .9, duration: 1.2, ease: 'back.out(1.5)', clearProps: 'all', onComplete: () => $('.dms-hero-thumb-main').addClass('anim-floating') }, "<=.1")
                .from('.dms-hero-thumb-icon1, .dms-hero-thumb-icon2, .dms-hero-thumb-icon3', {
                    autoAlpha: 0, y: -5, stagger: .08, duration: 1.5, ease: 'back.out(1.5)', clearProps: 'all', onComplete: () => {
                        $('.dms-hero-thumb-icon1, .dms-hero-thumb-icon2, .dms-hero-thumb-icon3').addClass('anim-floating');
                }  }, "<=.2")
                .from(title.words, {autoAlpha: 0, yPercent: 70, stagger: .05, duration: .8}, "<=0")
                .from(sub.words, {autoAlpha: 0, yPercent: 70, stagger: .02, duration: .6 }, '<=.1')
                .from('.dms-hero-btn', { autoAlpha: 0, y: 20, duration: .6, clearProps: 'all' }, "<=.2")

            this.tlFade.play();
        }
    }
    let dmsHero = new DMSHero();
    class DMSFea {
        constructor() {
            this.tlTrigger;
            this.tlFade;
        }
        setTrigger() {
            if (viewport.w <= 767) {
                this.setup();
            }
            else {
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.dms-fea',
                        start: 'top bottom+=50%',
                        end: 'bottom top',
                        once: true,
                        onEnter: () => {
                            this.setup();
                        },
                    }
                })
            }
        }
        setup() {
            let title = new SplitType('.dms-fea-title', { types: 'words' });
            let sub = new SplitType('.dms-fea-sub', { types: 'words' });

            this.tlFade = gsap.timeline({
                scrollTrigger: {
                    trigger: '.dms-fea-title-wrap',
                    start: 'top top+=70%',
                    once: true,
                    onComplete: () => {
                        title.revert();
                        sub.revert();
                    }
                }
            })

            this.tlFade
                .from('.dms-fea-label', { autoAlpha: 0, y: 20, duration: .6, clearProps: 'all' })
                .from(title.words, { autoAlpha: 0, yPercent: 70, stagger: .05, duration: .8 }, '<=0')
                .from(sub.words, { autoAlpha: 0, yPercent: 60, stagger: .02, duration: .4 }, '<=.1')

            const allItems = $('.dms-fea-cms-item');

            allItems.each((idx, item) => {
                let titleItem = new SplitType($(item).find('.dms-fea-cms-item-title'), {types: 'words'});
                let subItem = new SplitType($(item).find('.dms-fea-cms-item-sub'), {types: 'words'});
                let tlItem = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: 'top top+=65%',
                        once: true
                    },
                    onComplete: () => {
                        titleItem.revert();
                        subItem.revert();
                    }
                })
                tlItem
                    .from($(item).find('.div-line'), {autoAlpha:0, scale: .8, duration: .6, clearProps: 'all'})
                    .from($(item).find('.dms-fea-cms-item-order'), {autoAlpha: 0, yPercent: 100, duration: .8, clearProps: 'all'}, "<=0")
                    .from($(item).find('.dms-fea-cms-item-ic'), {autoAlpha: 0, yPercent: 70, duration: 1, clearProps: 'all'}, "<=0.1")
                    .from(titleItem.words, {autoAlpha: 0, yPercent: 100, duration: .8, stagger: .02 }, "<=.2")
                    .from(subItem.words, {autoAlpha: 0, yPercent: 100, duration: .5, stagger: .015 }, "<=.2")
            })

            if (viewport.w <= 767) {
                $('.dms-fea-content [data-swiper]').each((_, item) => {
                    if ($(item).attr('data-swiper') == 'swiper')
                        $(item).addClass('swiper')
                    else
                        $(item).addClass(`swiper-${$(item).attr('data-swiper')}`)
                })
                let swiperFea = new Swiper('.dms-fea-cms', {
                    spaceBetween: 0,
                    slidesPerView: "auto",
                });
            }
        }
    }
    let dmsFea = new DMSFea();

    class DMSApp {
        constructor() {
            this.tlTrigger;
            this.tlFade;
        }
        setTrigger() {
            if (viewport.w <= 767) {
                this.setup();
            }
            else {
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.dms-app',
                        start: 'top bottom+=50%',
                        end: 'bottom top',
                        once: true,
                        onEnter: () => {
                            this.setup();
                        }
                    }
                })
            }
        }
        setup() {
            const title = new SplitType('.dms-app-title', { types: 'words' });
            const sub = new SplitType('.dms-app-sub', { types: 'words' });

            this.tlFade = gsap.timeline({
                scrollTrigger: {
                    trigger: '.dms-app-title',
                    start: 'top top+=65%',
                    once: true,
                },
                onComplete: () => {
                    title.revert();
                    sub.revert();
                }
            })

            this.tlFade
                .from('.dms-app-thumb', { autoAlpha: 0, y: 100, duration: .8, clearProps: 'all' })
                .from(title.words, { autoAlpha: 0, yPercent: 70, duration: .8, stagger: .02 }, '<=0')
                .from(sub.words, { autoAlpha: 0, yPercent: 60, duration: .4, stagger: .02 }, '<=0.1')
                .from('.dms-app-btn', { autoAlpha: 0, y: 20, duration: .8 }, '<=.1')

            let listTitle = new SplitType('.raa-app-list-title', { types: 'words' });

            let tlItem = gsap.timeline({
                scrollTrigger: {
                    trigger: '.raa-app-list',
                    start: 'top top+=75%'
                },
                onComplete: () => {
                    listTitle.revert();
                }
            })
            tlItem
                .from(listTitle.words, { autoAlpha: 0, yPercent: 60, duration: .6, stagger: .02 })
                .from('.raa-app-card', { autoAlpha: 0, y: 20, x: viewport.w > 991 ? 20 : 0, duration: .6, stagger: .1, clearProps: 'all' }, '<=.0')
        }
    }
    let dmsApp = new DMSApp();
    class MainDocument {
        constructor() {
            this.tlTrigger;
            this.tlFade;
            this.scrollHandler = null;
        }
        setTrigger() {
            if (viewport.w <= 767) {
                this.setup();
            }
            else {
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.doc-main',
                        start: 'top bottom+=50%',
                        end: 'bottom top',
                        once: true,
                        onEnter: () => {
                            this.setup();
                        }
                    }
                })
            }
        }
        setup() {
            this.handleForm();
            this.handlePDF();
        }
        handlePDF() {
            let totalPages = 0;
            let currentPage = 1;
            let currentScale = 1;
            let baseScale = 1.0;
            let pdfDoc = null;

            const iframe = $('.doc-main-pdf-embed iframe');
            const viewer = $('.doc-main-pdf-embed');
            const url = iframe.attr('src').toString();

            viewer.html('');

            pdfjsLib.getDocument(url).promise.then((pdf) => {
                pdfDoc = pdf;
                totalPages = pdf.numPages;
                renderPDF.init();
                $('.doc-main-pdf-page-total .txt').text(totalPages);
                $('.doc-main-pdf-page-curr .txt').text(currentPage);
                this.scrollHandler = trackScroll;
                window.addEventListener('scroll', this.scrollHandler);
                $('.doc-main-pdf-embed').css('opacity', 1);
            }).catch((error) => {
                console.error('Error loading PDF:', error);
            })

            const renderPDF = {
                init: () => {
                    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
                        pdfDoc?.getPage(pageNum).then((page) => {
                            let canvas = $('<canvas></canvas>').addClass('pdf-page');
                            viewer.append(canvas);
                            const context = canvas.get(0).getContext('2d');

                            let viewport = page.getViewport({ scale: currentScale });
                            canvas.attr('data-page', pageNum);
                            requestAnimationFrame(() => {
                                if (pageNum === 1) {
                                    baseScale = (viewer.width() / viewport.width);
                                    currentScale = baseScale;
                                }

                                viewport = page.getViewport({ scale: baseScale });
                                const outputScale = window.devicePixelRatio || 1;
                                canvas.attr('width', Math.floor(viewport.width * outputScale));
                                canvas.attr('height', Math.floor(viewport.height * outputScale));

                                canvas.css('width', Math.floor(viewport.width) + 'px');
                                canvas.css('height', Math.floor(viewport.height) + 'px');

                                const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

                                page.render({
                                    canvasContext: context,
                                    viewport: viewport,
                                    transform: transform,
                                });
                            })
                        });
                    }
                },
                update: () => {
                    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
                        pdfDoc?.getPage(pageNum).then((page) => {
                            let canvas = viewer.find('.pdf-page').eq(pageNum - 1)
                            const context = canvas.get(0).getContext('2d');

                            let viewport = page.getViewport({ scale: currentScale });

                            const outputScale = window.devicePixelRatio || 1;
                            canvas.attr('width', Math.floor(viewport.width * outputScale));
                            canvas.attr('height', Math.floor(viewport.height * outputScale));

                            canvas.css('width', Math.floor(viewport.width) + 'px');
                            canvas.css('height', Math.floor(viewport.height) + 'px');

                            const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

                            page.render({
                                canvasContext: context,
                                viewport: viewport,
                                transform: transform,
                            });
                        });
                    }
                },
            }
            let onScrollTo = false;
            let isInit = true;
            function trackScroll() {
                const pages = $('.pdf-page');
                let maxVisibleHeight = 0;
                let activePageNum = currentPage;

                pages.each(function() {
                    const rect = this.getBoundingClientRect();
                    const viewRect = viewer.get(0).getBoundingClientRect();

                    const visibleHeight = Math.min(rect.bottom, $(window).height()) - Math.max(rect.top, 0);

                    if (visibleHeight > maxVisibleHeight) {
                        maxVisibleHeight = visibleHeight;
                        activePageNum = parseInt($(this).data('page'));
                        if (isInit || onScrollTo) {
                            $('.doc-main-pdf-page-curr .txt').text(activePageNum);
                        }
                    }
                });
            };
            $('.doc-main-pdf-page-curr').bind('change keydown keyup', function (e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    let inputVal = parseInt($(this).find('.txt').text());
                    if (inputVal > totalPages) {
                        inputVal = totalPages;
                    }
                    else if (inputVal < 1) {
                        inputVal = 1;
                    }
                    currentPage = inputVal;
                    onScrollTo = false;
                    isInit = false;
                    $('.doc-main-pdf-page-curr .txt').text(currentPage);
                    $('.doc-main-pdf-page-curr').addClass('disable');
                    requestAnimationFrame(() => {
                        let targetTop = $(`.pdf-page[data-page=${currentPage}]`).offset().top - ($(window).width() <= 767 ? 215 : 120);
                        $("html, body").animate({ scrollTop: targetTop }, 1200, 'exponentialEaseOut', () => {
                            onScrollTo = true;
                            $('.doc-main-pdf-page-curr').removeClass('disable');
                        });
                    })
                }
            })
            function onZoom(delta) {
                currentScale += delta;
                if (currentScale < 0.1) currentScale = 0.1;
                $('.doc-main-pdf-zoom-val .txt').text(`${Math.round(currentScale * 100 / baseScale)}%`);
                renderPDF.update();
            }

            $('.doc-main-pdf-zoom-btn').on('click', function (e) {
                if (!$('.doc-main-pdf-embed').hasClass('zooming')) {
                    $('.doc-main-pdf-embed').addClass('zooming');
                    setTimeout(() => {
                        $('.doc-main-pdf-embed').removeClass('zooming');
                    }, 1000);
                }
                if ($(this).hasClass('decrease')) {
                    onZoom(-.1);
                }
                else if ($(this).hasClass('increase')) {
                    onZoom(.1);
                }
                else return;
            })

            if ($(window).width() > 991) {
                let safeDistance = $('.doc-main-stick-inner').height() - $('.doc-main-desc-head').innerHeight();
                $('.doc-main-pdf-head').css('margin-bottom', parseRem(safeDistance));
                $('.doc-main-pdf-body').css('margin-top', parseRem(safeDistance) * -1);
            }
        }
        handleForm() {
            $('[data-document-name]').text($('.res-hero-title').text());
            const iframe = $('.doc-main-pdf-embed iframe');
            const url = iframe.attr('src').toString();

            if (localStorage.getItem('isSubmittedDownload') == 'true') {
                $('.doc-main-btn').attr('href', url);
                $('.doc-main-pdf-link').attr('href', url);
            }
            else {
                $('.download-form-link').attr('href', url);

                $('.doc-main-btn, .doc-main-pdf-link').on('click', function (e) {
                    if (localStorage.getItem('isSubmittedDownload') == 'true') {
                        return;
                    }
                    e.preventDefault();
                    $('.doc-popup').addClass('active');

                    setTimeout(() => {
                        $('.popup').addClass('active');
                    }, 200);
                })
                $('.popup--close').on('click', function (e) {
                    $('.popup').removeClass('active');
                    setTimeout(() => {
                        $('.doc-popup').removeClass('active');
                    }, 800);
                })

                const onSuccessForm = (formID) => {
                    $('.download-form-title').text('Thanks for reaching out!');
                    $('.download-form-desc').text('Your download link is ready!');
                    $('.doc-main-btn').attr('href', url);
                    $('.doc-main-pdf-link').attr('href', url);
                    localStorage.setItem('isSubmittedDownload', true);

                    setTimeout(() => {
                        $(formID).trigger('reset');
                        $('.input-field-grp').removeClass('filled');
                    }, 1000);
                }

                formSubmitEvent.init({
                    onlyWorkOnThisFormName: 'Download Form',
                    onSuccess: () => onSuccessForm('#download-form')
                })
            }
        }
        destroyScrollHandler() {
            $("html, body").stop();

            if (this.scrollHandler) {
                window.removeEventListener('scroll', this.scrollHandler);
                this.scrollHandler = null;
            }
        }
    }
    let mainDocument = new MainDocument();

    class DMSHiW {
        constructor() {
            this.tlTrigger;
            this.tlFade;
        }
        setTrigger() {
            if (viewport.w <= 767) {
                this.setup();
            }
            else {
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.dms-hiw',
                        start: 'top bottom+=50%',
                        end: 'bottom top',
                        once: true,
                        onEnter: () => {
                            this.setup();
                        },
                    }
                })
            }
        }
        setup() {
            const title = new SplitType('.dms-hiw-title', { types: 'words' });
            const sub = new SplitType('.dms-hiw-sub', { types: 'words' });

            this.tlFade = gsap.timeline({
                scrollTrigger: {
                    trigger: '.dms-hiw-title-wrap',
                    start: 'top top+=65%',
                    once: true,
                },
                onComplete: () => {
                    title.revert();
                    sub.revert();
                }
            })

            this.tlFade
                .from('.dms-hiw-label', { autoAlpha: 0, y: 20, duration: .6, clearProps: 'all' })
                .from(title.words, { autoAlpha: 0, yPercent: 70, stagger: .05, duration: .8 }, '<=0')
                .from(sub.words, { autoAlpha: 0, yPercent: 60, stagger: .02, duration: .6 }, '<=.2')

            gsap.from('.dms-hiw-main-card', {
                scrollTrigger: { trigger: '.dms-hiw-main-card', start: 'top top+=75%' },
                autoAlpha: 0,
                y: 20,
                duration: .6,
            })
            gsap.from('.dms-hiw-point-line', {
                scrollTrigger: {  trigger: '.dms-hiw-point-line', start: 'top top+=75%' },
                autoAlpha: 0,
                y: -20,
                duration: .6
            })

            let subTitle = new SplitType('.dms-hiw-sub-content-title', { types: 'words' });

            let subTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.dms-hiw-sub-content',
                    start: 'top top+=75%',
                    once: true
                },
                onComplete: () => {
                    subTitle.revert();
                }
            })

            subTl
                .from(subTitle.words, { autoAlpha: 0, yPercent: 60, stagger: .02, duration: .6 })
                .from('.dms-hiw-sub-card', { autoAlpha: 0, y: 20, x: viewport > 767 ? 20 : 0, duration: .6, stagger: .1, clearProps: 'all' }, '<=.1')

        }
    }
    let dmsHiw = new DMSHiW();
    class CTASec {
        constructor() {
            this.tlTrigger = null;
            this.tlFade = null;
            this.tlScrub = null;
        }
        setTrigger(namespace, current, next) {
            let isSamePage = checkSameNamespace(namespace, current, next);
            if (isSamePage) return;

            if (viewport.w <= 767) {
                this.setup();
            }
            else {
                this.tlTrigger = gsap.timeline({
                    data: "tl-cta-trigger",
                    scrollTrigger: {
                        trigger: '.about-cta',
                        start: 'top bottom+=50%',
                        end: 'bottom top',
                        once: true,
                        onEnter: () => {
                            this.setup();
                        },
                    }
                })
            }
        }
        setup() {
            const title = new SplitType('.about-cta-title', { types: 'lines, words' });
            const sub = new SplitType('.about-cta-sub', { types: 'lines, words' });

            this.tlFade = gsap.timeline({
                data: "tl-cta-fade",
                scrollTrigger: {
                    trigger: '.about-cta',
                    start: 'top top+=75%',
                    end: 'bottom top',
                    once: true
                },
                onComplete: () => {
                    title.revert();
                    sub.revert();
                }
            })

            this.tlFade
                .from('.about-cta-img-circle-item', { autoAlpha: 0, filter: 'blur(20px)', scale: .6, duration: 1.2, stagger: .1, ease: 'circ.inOut', clearProps: 'all' })
                .from('.about-cta-img', { autoAlpha: 0, scale: .8, duration: 1.2, ease: 'back.out(1.3)', clearProps: 'all' }, "<=.1")
                .from('.about-cta-bg', { autoAlpha: 0, duration: 1.5, ease: 'back.out(1.3)', clearProps: 'all' }, "<=.1")
                .from('.about-cta-bg-light', { y: -20, autoAlpha: 0, duration: 1.2, ease: 'back.out(.8)', clearProps: 'all' }, "<=.2")
                .from(title.words, { autoAlpha: 0, yPercent: 70, duration: .8, stagger: 0.03 }, "<=0")
                .from(sub.words, { autoAlpha: 0, yPercent: 70, duration: .6, stagger: 0.04 }, "<=.1")
                .from('.about-cta-btn', { y: 20, autoAlpha: 0, duration: .6, clearProps: 'all' }, "<=.1")

            if (viewport.w > 991) {
                // this.tlScrub = gsap.timeline({
                //     scrollTrigger: {
                //         trigger: '.about-cta',
                //         start: 'top bottom',
                //         end: 'bottom bottom',
                //         endTrigger: '.about-cta-bg-light',
                //         scrub: true
                //     }
                // })
                //     .fromTo('.about-cta-outer', { scale: .8, transformOrigin: 'center bottom' }, { scale: 1, duration: 1 })
                //     .fromTo('.about-cta-title-wrap, .about-cta-img-wrap', { scale: 1.2, transformOrigin: 'center top' }, { scale: 1, duration: 1 }, "<=0")
            }
        }
        destroy() {
            gsap.globalTimeline
                .getChildren()
                .filter((e) => e.data === "tl-cta-trigger" || e.data === "tl-cta-fade")
                .forEach((el) => {
                    setTimeout(() => {
                        el?.scrollTrigger?.refresh();
                    }, 500);
                });
        }
    }

    let ctaSec = new CTASec();
    class Footer {
        constructor() {
            this.tlTrigger = null;
            this.tlFade = null;
        }
        setTrigger(namespace, current, next) {
            let isSamePage = checkSameNamespace(namespace, current, next);
            if (isSamePage) return;

            if (viewport.w <= 767) {
                this.setup();
            }
            else {
                this.tlTrigger = gsap.timeline({
                    data: "tl-footer-trigger",
                    scrollTrigger: {
                        trigger: '.footer',
                        start: 'top bottom+=50%',
                        end: 'bottom top',
                        once: true,
                        onEnter: () => {
                            this.setup();
                        },
                    }
                })
            }
        }
        setup() {
            this.tlFade = gsap.timeline({
                data: "tl-footer-fade",
                scrollTrigger: {
                    trigger: '.footer-wrap',
                    start: 'top top+=75%',
                    end: 'bottom top',
                    once: true
                },
                onComplete: () => {
                    // this.interact();
                }
            })
            this.tlFade
                .from('.footer-logo-base img', { autoAlpha: 0, duration: .8, yPercent: 70 })
                .from('.footer-nav-line-top', { scaleX: 0, transformOrigin: 'left', duration: .6 }, "<=.1")
                .from('.footer-menu-link', { yPercent: 40, autoAlpha: 0, duration: .6, stagger: .05 }, "<=.2")
                .from('.footer-menu-social', { y: 40, autoAlpha: 0, duration: .6, stagger: .05 }, "<=.2")
                .from('.footer-nav-line-bot', { scaleX: 0, transformOrigin: 'left', duration: .6 }, "<=.2")
                .from('.footer-copy, .footer-legal-link, .footer-legal-div', { yPercent: 40, autoAlpha: 0, duration: .6, stagger: .03 }, "<=.1")
        }
        interact() {
            let allItems = $('.footer-logo-triggers path')
            let currentIndex = 0;
            function toggleItem(index) {
                $('.footer-logo-hover-item').removeClass('active')
                if (index == -1) return
                $('.footer-logo-hover-item').eq(index).addClass('active')
            }
            function loopActive() {
                setInterval(function() {
                    toggleItem(currentIndex);
                    currentIndex = (currentIndex + 1) % allItems.length;
                }, 400);
            }

            if (viewport.w > 767) {
                allItems.on('mouseenter', function(e) {
                    e.preventDefault();
                    toggleItem($(this).index())
                })
                allItems.on('mouseleave', function(e) {
                    toggleItem(-1)
                })
            }
            else {
                // loopActive();
            }
        }
        destroy() {
            gsap.globalTimeline
            .getChildren()
            .filter((e) => e.data === "tl-footer-trigger" || e.data === "tl-footer-fade")
            .forEach((el) => {
                setTimeout(() => {
                    el?.scrollTrigger?.refresh();
                }, 500);
            });
        }
    }
    let footer = new Footer();

    const SCRIPTS = {
        loading: {
            namespace: 'loading',
            afterEnter() {
                console.log('loading afterEnter');
                // load.init();
            },
            beforeLeave() {
                // ctaSec.destroy();
                // footer.destroy();
                console.log('loading clean')
            }
        },
        home: {
            namespace: 'home',
            afterEnter(data) {
                console.log('home afterEnter');
                homeHero.setup();
                homeProb.setTrigger();
                homeSol.setTrigger();
                homeWhy.setTrigger();
                ctaSec.setTrigger(this.namespace, data.current.namespace, data.next.namespace);
                footer.setTrigger(this.namespace, data.current.namespace, data.next.namespace);
            },
            beforeLeave() {
                console.log($(this))
                // ctaSec.destroy();
                // footer.destroy();
                console.log('home clean')
            }
        },
        about: {
            namespace: 'about',
            afterEnter(data) {
                console.log('about afterEnter');
                aboutHero.setup();
                aboutQuote.setTrigger();
                aboutTeam.setTrigger();
                aboutAchieve.setTrigger();
                aboutCollab.setTrigger();
                ctaSec.setTrigger(this.namespace, data.current.namespace, data.next.namespace);
                footer.setTrigger(this.namespace, data.current.namespace, data.next.namespace);
            },
            beforeLeave() {
                ctaSec.destroy();
                footer.destroy();
                console.log('about clean')
            }
        },
        contact: {
            namespace: 'contact',
            afterEnter(data) {
                console.log('contact afterEnter');
                contactHero.setup();
                footer.setTrigger(this.namespace, data.current.namespace, data.next.namespace);
            },
            beforeLeave() {
                footer.destroy();
                console.log('contact clean');
            }
        },
        subs: {
            namespace: 'subs',
            afterEnter(data) {
                console.log('subs afterEnter');
                subsContent.setTrigger();
                ctaSec.setTrigger(this.namespace, data.current.namespace, data.next.namespace);
                footer.setTrigger(this.namespace, data.current.namespace, data.next.namespace);
            },
            beforeLeave() {
                ctaSec.destroy();
                footer.destroy();
                console.log('subs clean');
            }
        },
        sRAA: {
            namespace: 'sRAA',
            afterEnter(data) {
                console.log('sRAA afterEnter');
                srraaHero.setup();
                sraaFea.setTrigger();
                sraaApp.setTrigger();
                sraaHiw.setTrigger();
                ctaSec.setTrigger(this.namespace, data.current.namespace, data.next.namespace);
                footer.setTrigger(this.namespace, data.current.namespace, data.next.namespace);
            },
            beforeLeave() {
                ctaSec.destroy();
                footer.destroy();
                console.log('sRAA clean');
            }
        },
        sDMS: {
            namespace: 'sDMS',
            afterEnter(data) {
                console.log('sDMS afterEnter');
                dmsHero.setup();
                dmsFea.setTrigger();
                dmsApp.setTrigger();
                dmsHiw.setTrigger();
                ctaSec.setTrigger(this.namespace, data.current.namespace, data.next.namespace);
                footer.setTrigger(this.namespace, data.current.namespace, data.next.namespace);
            },
            beforeLeave() {
                ctaSec.destroy();
                footer.destroy();
                console.log('sDMS clean');
            }
        },
        resource: {
            namespace: 'resource',
            afterEnter(data) {
                console.log('resource afterEnter');
                // ctaSec.setTrigger(this.namespace, data.current.namespace, data.next.namespace);
                // footer.setTrigger(this.namespace, data.current.namespace, data.next.namespace);
            },
            beforeLeave() {
                // ctaSec.destroy();
                // footer.destroy();
                console.log('resource clean');
            }
        },
        document: {
            namespace: 'document',
            afterEnter(data) {
                console.log('document afterEnter');
                mainDocument.setTrigger();
                // ctaSec.setTrigger(this.namespace, data.current.namespace, data.next.namespace);
                // footer.setTrigger(this.namespace, data.current.namespace, data.next.namespace);
            },
            beforeLeave() {
                // ctaSec.destroy();
                // footer.destroy();
                mainDocument.destroyScrollHandler();
                console.log('document clean');
            }
        }
    }
    const VIEWS = Object.values(SCRIPTS);

    barba.init({
        preventRunning: true,
        sync: true,
        debug: true,
        timeout: 5000,
        transitions: [{
            name: 'default-transition',
            sync: true,
            once(data) {
                console.log('once global')
                updateOnScroll(lenis);
                gsap.set('[data-init-hidden]', { autoAlpha: 1, duration: 0 });
                if (!localStorage.getItem('isSubmittedDownload')) {
                    localStorage.setItem('isSubmittedDownload', false);
                }
                initDecimal();
                updateCurrentNav();
                resetScroll();
            },
            leave(data) {
                window.scrollTo(0, 0);
                resetScroll();
                removeAllScrollTrigger();
                updateOnScroll(lenis);
                $('.header').removeClass('on-scroll on-hide');
            },
            after(data) {
                gsap.set('[data-init-hidden]', { autoAlpha: 1, duration: 0 });
                initDecimal();
                reinitializeWebflow();
                updateCurrentNav();
            }
        }],
        views: VIEWS
    })

}
export default mainScript
// window.onload = mainScript;