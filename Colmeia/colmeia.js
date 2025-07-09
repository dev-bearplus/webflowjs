const mainScript = () => {
    $.easing.exponentialEaseOut = function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
    };

    $.fn.hasAttr = function (name) {
        return this.attr(name) !== undefined;
    };

    // barba.use(barbaPrefetch);
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    const GLOBAL_DELAY = 1;

    const lenis = new Lenis({})

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0);

    const viewport = {
        w: window.innerWidth,
        h: window.innerHeight
    }

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

    function updateViewportSize() {
        viewport.w = window.innerWidth;
        viewport.h = window.innerHeight;
    }
    $(window).on('resize', updateViewportSize);

    function isInViewport(el) {
        if (!$(el).length) return;
        const rect = document.querySelector(el).getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
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

    function refreshOnBreakpoint() {
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
                        lenis.scrollTo(`#${searchObj.sc}`, {
                            offset: -100
                        })
                    }, 500);
                    // barba.history.add(`${window.location.pathname + target}`, 'barba', 'replace');
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
        }
        window.scrollTo(0, 0);
        lenis.scrollTo("top", {
            duration: .0001, lock: true, onComplete: () => {
                getAllScrollTrigger("refresh");
            }
        });
    }

    const debounce = (func, wait = 100) => {
        let timer;
        return function (event) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, wait, event);
        };
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

    const cvUnit = (val, unit) => {
        let result;
        switch (true) {
            case unit === 'vw':
                result = $(window).width() * (val / 100);
                break;
            case unit === 'vh':
                result = $(window).height() * (val / 100);
                break;
            case unit === 'rem':
                result = val / 10 * parseFloat($('html').css('font-size'));
                break;
            default: break;
        }
        return result;
    }

    const childSelect = (parent) => {
        return (child) => child ? $(parent).find(child) : parent;
    }

    function convertHyphen(className) {
        $(className).contents().each(function () {
            if (this.nodeType === Node.TEXT_NODE) {
                this.nodeValue = this.nodeValue.replace(/-/g, '‑');
            }
        });
    }

    const isObjectEmpty = (objectName) => {
        return (
            objectName &&
            Object.keys(objectName).length === 0 &&
            objectName.constructor === Object
        );
    };

    function mapFormToObject(ele) {
        return ([...new FormData(ele).entries()].reduce(
            (prev, cur) => {
                const name = cur[0];
                const val = cur[1];
                return { ...prev, [name]: val };
            },
            {}
        ));
    }

    const getIDFormName = (name) => name.toLowerCase().replaceAll(" ", "-");

    const swiper = {
        setup: (parent, options = {}) => {
            return new Swiper(parent('.swiper:visible').get(), {
                slidesPerView: options.onView || 1,
                spaceBetween: options.spacing || 0,
                allowTouchMove: options.touchMove || true,
                navigation: options.nav ? ({
                    nextEl: parent('.next').get(),
                    prevEl: parent('.prev').get(),
                    disabledClass: "disabled"
                }) : false,
                pagination: options.pag ? ({
                    el: parent('[data-swiper="pagination"]').get()
                }) : false,
                ...options,
                on: options.on
            })
        },
        initClassName: (parent) => {
            parent('[data-swiper]:visible').each((_, item) => {
                if ($(item).attr('data-swiper') == 'swiper')
                    $(item).addClass('swiper')
                else
                    $(item).addClass(`swiper-${$(item).attr('data-swiper')}`)
            })
        }
    }
    const animGeneration = {
        initSelfSTrigger: (attr, fn) => {
            let listAttr = $(`[data-anim=${attr}]`);
            listAttr.each((_, item) => fn(item));
        },
        initStaggerSTrigger: (attr, fn) => {
            let listTriggerWrap = $(`[data-anim-stagger-el="wrapper"][data-anim-stagger="${attr}"]`);
            listTriggerWrap.each((_, item) => fn(item));
        },
        start: (item, { START }) => Number($(item).attr('data-anim-start')) || START,
        stagger: (item, { STAGGER }) => Number($(item).attr('data-anim-stagger')) || STAGGER,
        staggerItem: (item, { STAGGER_ITEM }) => Number($(item).attr('data-anim-stagger-distance')) || STAGGER_ITEM,
        delay: (item, { DELAY }) => Number($(item).attr('data-anim-delay')) || DELAY,
        duration: (item, { DUR }) => Number($(item).attr('data-anim-dur')) || DUR,
        scrub: (item, { SCRUB }) => Number($(item).attr('data-anim-scrub')) || SCRUB,
        scale: (item, { SCALE }) => Number($(item).attr('data-anim-scale')) || SCALE,
        inset: (item, { INSET }) => Number($(item).attr('data-anim-inset')) || INSET,
        fromY: (item, { Y, Y_PERCENT }) => {
            let fromY = $(item).attr('data-anim-y') ?
                Number($(item).attr('data-anim-y')) || Y :
                $(item).attr('data-anim-yp') ?
                    Number($(item).attr('data-anim-yp')) : Y_PERCENT;
            return fromY;
        },
        typeOfY: (type, trigger, ORIGIN) => {
            let result;
            if ($(trigger).attr('data-anim-y')) {
                switch (type) {
                    case 'y':
                        result = animGeneration.fromY(trigger, ORIGIN);
                        break;
                    case 'yPercent':
                        result = 0;
                        break;
                }
            }
            else {
                switch (type) {
                    case 'y':
                        result = 0;
                        break;
                    case 'yPercent':
                        result = animGeneration.fromY(trigger, ORIGIN);
                        break;
                }
            }
            return result;
        }
    }

    function animFadeUp() {
        const ANIM_ATTR = "fade-up";
        const ORIGIN = {
            START: 90,
            STAGGER_ITEM: .1,
            Y: 45,
            Y_PERCENT: 50,
            DELAY: 0,
            DUR: .8
        }
        const fadeUpType = {
            self: () => {
                animGeneration.initSelfSTrigger(ANIM_ATTR, (item) => {
                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: `top top+=${viewportBreak({ desktop: animGeneration.start(item, ORIGIN), mobile: 75 })}%`
                        },
                        delay: animGeneration.delay(item, ORIGIN)
                    })
                    requestAnimationFrame(() => {
                        tl.fromTo(item,
                            {
                                y: viewportBreak({ desktop: animGeneration.typeOfY('y', item, ORIGIN), mobile: 20 }),
                                yPercent: viewportBreak({ desktop: animGeneration.typeOfY('yPercent', item, ORIGIN), mobile: 20 }),
                                autoAlpha: 0
                            },
                            { y: 0, yPercent: 0, autoAlpha: 1, opacity: 1, duration: animGeneration.duration(item, ORIGIN), ease: "power1.out", clearProps: 'all' });
                    })
                })
            },
            stagger: () => {
                animGeneration.initStaggerSTrigger(ANIM_ATTR, (stage) => {
                    let triggerItem = $(stage).find(`[data-anim-stagger-el="item"]`);

                    if (stage.hasAttribute('data-anim-none-mobile') && viewport.w <= 767) return;
                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: stage,
                            start: `top top+=${animGeneration.start(stage, ORIGIN)}%`
                        },
                    })
                    requestAnimationFrame(() => {
                        tl.fromTo(triggerItem,
                            {
                                y: viewportBreak({ desktop: animGeneration.typeOfY('y', stage, ORIGIN), mobile: 20 }),
                                yPercent: viewportBreak({ desktop: animGeneration.typeOfY('yPercent', stage, ORIGIN), mobile: 20 }),
                                autoAlpha: 0
                            },
                            { y: 0, yPercent: 0, autoAlpha: 1, duration: animGeneration.duration(stage, ORIGIN), stagger: animGeneration.staggerItem(stage, ORIGIN), clearProps: 'all' })
                    })
                });
            }
        }
        fadeUpType.self();
        fadeUpType.stagger();
    }

    function animFadeLeft() {
        const ANIM_ATTR = "fade-left";
        const ORIGIN = {
            START: 90,
            DELAY: 0
        }
        const fadeUpType = {
            self: () => {
                animGeneration.initSelfSTrigger(ANIM_ATTR, (item) => {
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: `top top+=${animGeneration.start(item, ORIGIN)}%`
                        },
                        delay: animGeneration.delay(item, ORIGIN)
                    }).fromTo(item,
                        { x: -10, autoAlpha: 0, opacity: 0 },
                        { x: 0, autoAlpha: 1, opacity: 1, duration: .8, ease: "power1.out", clearProps: 'all' });
                })
            },
            stagger: () => { }
        }
        fadeUpType.self();
        fadeUpType.stagger();
    }

    function animFadeUpSplitText(sec) {
        const ANIM_ATTR = "fade-up-splitext";
        const ORIGIN = {
            START: 85,
            STAGGER: .03,
            STAGGER_ITEM: .15,
            DELAY: 0,
            DUR: .8,
        }
        const fadeUpSplitTextType = {
            self: () => {
                $(sec).find(`[data-anim=${ANIM_ATTR}]`).each((_, item) => {
                    convertHyphen(item);
                    let splitItem = new SplitType(item, { types: 'lines, words', lineClass: "splittext-lines" });
                    // gsap.set(splitItem.lines, { overflow: 'hidden' });
                    gsap.set(splitItem.words, { yPercent: 100, autoAlpha: 0 });

                    gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: `top top+=${viewportBreak({ desktop: animGeneration.start(item, ORIGIN), mobile: 75 })}%`
                        },
                        delay: animGeneration.delay(item, ORIGIN)
                    }).to(splitItem.words, {
                        autoAlpha: 1,
                        yPercent: 0,
                        duration: animGeneration.duration(item, ORIGIN),
                        stagger: animGeneration.stagger(item, ORIGIN),
                        ease: 'power2.out',
                        onComplete: () => {
                            splitItem.revert();
                            gsap.set(item, { clearProps: 'all' });
                        }
                    })
                });
            },
            stagger: () => {
                $(sec).find(`[data-anim-stagger-el="wrapper"][data-anim-stagger="${ANIM_ATTR}"]`).each((_, item) => {
                    let triggerItem = $(stage).find(`[data-anim-stagger-el="item"]`);
                    if (stage.hasAttribute('data-anim-none-mobile') && viewport.w <= 767) return;

                    gsap.set(triggerItem, { autoAlpha: 0 });
                    ScrollTrigger.batch(triggerItem, {
                        start: `top top+=${animGeneration.start(stage, ORIGIN)}%`,
                        onEnter: batch => {
                            batch.forEach((item, index) => {
                                convertHyphen(item);
                                let splitItem = new SplitType(item, { types: 'lines, words', lineClass: "splittext-lines" });

                                gsap.set(item, { autoAlpha: 1 });
                                // gsap.set(splitItem.lines, { overflow: 'hidden' });
                                gsap.set(splitItem.words, { yPercent: 100, autoAlpha: 0 });
                                let delayItem = (index, initDelay) => index != 0 ? initDelay * (index + 1) : initDelay;
                                gsap.to(splitItem.words, {
                                    autoAlpha: 1,
                                    yPercent: 0,
                                    duration: animGeneration.duration(item, ORIGIN),
                                    stagger: animGeneration.stagger(item, ORIGIN),
                                    ease: 'power2.out',
                                    delay: delayItem(animGeneration.staggerItem(stage, ORIGIN), .5),
                                    onComplete: () => {
                                        splitItem.revert();
                                        gsap.set(item, { clearProps: 'all' });
                                    }
                                })
                            })
                        },
                        once: true
                    })
                })
            }
        }
        fadeUpSplitTextType.self();
        fadeUpSplitTextType.stagger();
    }

    function animScaleX() {
        const ANIM_ATTR = "scale-x";
        const ORIGIN = {
            START: 100,
            DELAY: 0
        }

        const scaleXType = {
            self: () => {
                animGeneration.initSelfSTrigger(ANIM_ATTR, (item) => {
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: `top top+=${animGeneration.start(item, ORIGIN)}%`,
                            once: true
                        },
                        delay: animGeneration.delay(item, ORIGIN)
                    }).fromTo(item,
                        { scaleX: 0, transformOrigin: 'left', autoAlpha: 0, opacity: 0 },
                        { scaleX: 1, autoAlpha: 1, opacity: 1, duration: 1, ease: 'power1.inOut' })
                })
            },
            stagger: () => { }
        }
        scaleXType.self();
    }

    function animScaleInset() {
        const ANIM_ATTR = "scale-inset";
        const ORIGIN = {
            START: 70,
            INSET: 20,
            DELAY: 0,
            SCALE: 1.4
        }

        const scaleInsetType = {
            self: () => {
                animGeneration.initSelfSTrigger(ANIM_ATTR, (item) => {
                    let innerOfItem = $(item).find('[data-anim-inset="inner"]');

                    gsap.set(item, { clipPath: `inset(${animGeneration.inset(item, ORIGIN)}%)` });
                    gsap.set(innerOfItem, { scale: animGeneration.scale(item, ORIGIN), autoAlpha: 0 });
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: `top top+=${animGeneration.start(item, ORIGIN)}%`,
                            once: true
                        },
                        delay: animGeneration.delay(item, ORIGIN),
                    })
                        .to(item, { clipPath: 'inset(0%)', duration: 1.5, ease: 'expo.out', clearProps: 'all' })
                        .to(innerOfItem, { scale: 1, autoAlpha: 1, duration: 1.5, ease: 'expo.out', clearProps: 'all' }, 0)
                })
            },
            stagger: () => { }
        }
        scaleInsetType.self();
        scaleInsetType.stagger();
    }

    function animScrubParallax() {
        const ANIM_ATTR = "scrub-para";
        const ORIGIN = {
            Y: 45,
            Y_PERCENT: 30,
            DELAY: 0,
            SCRUB: true,
        }
        const scrubParallax = {
            self: () => {
                animGeneration.initSelfSTrigger(ANIM_ATTR, (item) => {
                    const negative = (val) => val * -1;
                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: animGeneration.scrub(item, ORIGIN)
                        },
                        delay: animGeneration.delay(item, ORIGIN)
                    })
                    requestAnimationFrame(() => {
                        tl.fromTo(item,
                            {
                                y: viewportBreak({ desktop: animGeneration.typeOfY('y', item, ORIGIN), mobile: 8 }),
                                yPercent: viewportBreak({ desktop: animGeneration.typeOfY('yPercent', item, ORIGIN), mobile: 5 }),
                                ease: "none",
                            },
                            {
                                y: negative(viewportBreak({ desktop: animGeneration.typeOfY('y', item, ORIGIN), mobile: 8 })),
                                yPercent: negative(viewportBreak({ desktop: animGeneration.typeOfY('yPercent', item, ORIGIN), mobile: 5 })),
                                // y: 0, yPercent: 0,
                                ease: "none",
                            }
                        );
                    })
                })
            }
        }
        scrubParallax.self();
    }

    function animImgParallax() {
        const ANIM_ATTR = "img-para";
        const ORIGIN = {
            Y: 25,
            Y_PERCENT: 8,
            DELAY: 0,
            SCRUB: true,
        }
        const imgParallax = {
            self: () => {
                animGeneration.initSelfSTrigger(ANIM_ATTR, (item) => {
                    const negative = (val) => val * -1;
                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: animGeneration.scrub(item, ORIGIN)
                        },
                        delay: animGeneration.delay(item, ORIGIN)
                    })
                    requestAnimationFrame(() => {
                        gsap.set(item, { willChange: "transform", scale: 1.2 })
                        tl.fromTo(item,
                            {
                                y: viewportBreak({ desktop: animGeneration.typeOfY('y', item, ORIGIN), mobile: 8 }),
                                yPercent: viewportBreak({ desktop: animGeneration.typeOfY('yPercent', item, ORIGIN), mobile: 4 }),
                                ease: "none",
                            },
                            {
                                y: negative(viewportBreak({ desktop: animGeneration.typeOfY('y', item, ORIGIN), mobile: 8 })),
                                yPercent: negative(viewportBreak({ desktop: animGeneration.typeOfY('yPercent', item, ORIGIN), mobile: 4 })),
                                ease: "none",
                            }
                        );
                    })
                })
            }
        }
        imgParallax.self();
    }
    const initAnimation = () => {
        getAllScrollTrigger("refresh");
        setTimeout(() => {
            animFadeUp();
            animFadeLeft();
            animScaleX();
            animScaleInset();
            animImgParallax();
            animScrubParallax();
        }, 200);
        $('section').each((_, sec) => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: sec,
                    start: 'top bottom+=100vh',
                    end: 'bottom top',
                    once: true,
                    scrub: false,
                    onEnter: () => {
                        animFadeUpSplitText(sec);
                    }
                }
            })
        })
    }

    function splitTextFadeUpSetup(className, types) {
        const splitTextItem = new SplitType(className, { types: 'lines, words', lineClass: "splittext-lines" });

        // gsap.set(splitTextItem.lines, { overflow: 'hidden' });
        // gsap.set(className, { autoAlpha: 1 });
        gsap.set(splitTextItem.words, { yPercent: 100, autoAlpha: 0 });
        return splitTextItem;
    }

    function isInHeaderCheck(el) {
        const rect = $(el).get(0).getBoundingClientRect();
        const headerRect = $('.header').get(0).getBoundingClientRect();
        return (
            rect.bottom >= 0 &&
            rect.top - headerRect.height / 2 <= 0
        );
    }

    const formSubmitEvent = (function () {
        const init = ({
            onlyWorkOnThisFormName,
            onSuccess,
            onFail
        }) => {
            let form = $(`#${getIDFormName(onlyWorkOnThisFormName)}`);
            let inputSubmit = form.find('.input-submit .txt');
            let inputSubmitText = form.find('.input-submit .btn-txt--top').text();

            const isWorkOnAllForm = onlyWorkOnThisFormName == undefined

            $(document).on('ajaxSend', function (event, xhr, settings) {
                if (settings.url.includes("https://webflow.com/api/v1/form/")) {
                    const isCorrectForm = !isWorkOnAllForm && settings.data.includes(getSanitizedFormName(onlyWorkOnThisFormName));

                    if (isCorrectForm) {
                        inputSubmit.text('Please wait...');
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
                            console.log(inputSubmitText)
                            inputSubmit.text(inputSubmitText);
                        } else {
                            onFail?.()
                        }
                    } else if (isCorrectForm) {
                        if (isSuccessful) {
                            onSuccess?.()
                            console.log(inputSubmitText)
                            inputSubmit.text(inputSubmitText);
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

    const initAllForm = () => {
        initForm({
            formName: 'Contact us',
            hubspot: {
                portalId: '144330454',
                formId: 'd9d563ae-e649-4eb1-927c-e22368a3c440',
                fields: [
                    { name: 'firstname', value: (data) => data['First-Name'] },
                    { name: 'lastname', value: (data) => data['Last-Name'] },
                    { name: 'phone', value: (data) => data['Phone-Number'] },
                    { name: 'email', value: (data) => data['Business-Email'] },
                    { name: 'company', value: (data) => data['Company'] },
                    { name: 'jobtitle', value: (data) => data['Job-Title'] },
                    { name: 'message', value: (data) => data['Message'] }
                ]
            }
        });
        initForm({
            formName: 'Request download guide',
            hubspot: {
                portalId: '144330454',
                formId: '68a98d72-450e-40a5-97d0-5921c538259f',
                fields: [
                    { name: 'firstname', value: (data) => data['First-Name'] },
                    { name: 'lastname', value: (data) => data['Last-Name'] },
                    { name: 'email', value: (data) => data['Business-Email'] },
                    { name: 'company', value: (data) => data['Company'] },
                    { name: 'document_whitepaper', value: (data) => data['Document-Whitepaper'] },
                    { name: 'whitepaperdownloadlink', value: (data) => data['Document-File'] }
                ]
            }
        });
    }
    const initAllPopup = () => {
        initPopup('demo', {
            onOpen: () => {
                let iframe = $('.demo-vid-inner iframe').length > 0 ? $('.demo-vid-inner iframe'): $('<iframe></iframe>');
                let iframeSrc = new URL(`https://www.youtube.com/embed/${$('.demo-vid-inner').attr('data-iframe-id')}?origin=${window.location.origin}&autoplay=1`);
                iframe.attr({
                    'src': iframeSrc,
                    'allow': 'autoplay',
                    'title': 'COLMEIA - Job Architecture Made Easy!',
                    'allowfullscreen': '',
                    'width': '100%',
                    'height': '100%',
                    'frameborder': 0,
                    'allow': 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
                    'referrerpolicy': 'strict-origin-when-cross-origin'
                });
                iframe.appendTo('.demo-vid-inner');
            },
            onClose: () => {
                let iframe = $('.demo-vid-inner iframe');
                if (iframe) {
                    let iframeSrc = iframe.attr('src');
                    iframe.attr('src', '');
                }
            }
        });
        initPopup('contact', {
            onOpen: () => {
                $(`[data-popup-contact='wrap'] .iti__country-list`).each(function () {
                    $(this).css('width', $(this).closest('.input-field-group').width());
                })
            }
        });
        initPopup('download', {
            onOpen: (e) => {
                $(`[data-popup-download='wrap'] .iti__country-list`).each(function () {
                    $(this).css('width', $(this).closest('.input-field-group').width());
                })

                let activeItem = $(`#request-download-guide .pdf-info-cms-item[data-uid="${$(e.target).attr('data-uid')}"]`);
                activeItem.addClass('active').siblings().removeClass('active');
                requestAnimationFrame(() => {
                    $('#request-download-guide .input-field[data-name="Document Whitepaper"]').val(activeItem.find('.pdf-info-title').text());
                    $('#request-download-guide .input-field[data-name="Document File"]').val(activeItem.find('.pdf-info-link').attr('href'));
                })
            }
        });
    }
    let pageName = $('[data-page-name]').attr('data-page-name');
    let subPageName = $('[data-page-name]').attr('data-page-name') === $('[data-gtm-page]').attr('data-gtm-page') ? '' : $('[data-gtm-page]').attr('data-gtm-page');
    let gtm_page = `${subPageName.length === 0 ? '' : `${subPageName}: `}${pageName}`;
    const updateCurrentNav = () => {
        $("a").each(function (index, link) {
            if ($(this).attr('data-sub-link') && (!$(this).attr('href').includes('#')) && (!$(this).attr('href').includes('sc'))) {
                $(this).attr('href', `${$(this).attr('href')}#${$(this).attr('data-sub-link')}`);
                // $(this).attr('data-barba-history', 'replace');
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
                    //comment for disable barba
                    // $(this).attr('href', `${urlPath}?sc=${anchor}`);
                }
            }
        });

        $('a').on('click', function (e) {
            if ($(this).attr('data-sub-link')) {
                // barba.history.add(`${window.location.pathname + `#${$(this).attr('data-sub-link')}`}`, 'barba', 'replace');

                requestAnimationFrame(() => {
                    setTimeout(() => {
                        $(`#${$(this).attr('data-sub-link')}`).trigger('click');
                    }, $(this).hasClass('w--current') ? 0 : 1000);

                    $("a").each(function (index, link) {
                        $(link).toggleClass("w--current", $(link).attr('href') == `${window.location.pathname}${window.location.hash}`);
                    });
                    if (viewport.w <= 991) {
                        if ($('.header').hasClass('open-nav')) {
                            $('.header').removeClass('open-nav');
                            $('.header__hamburger').removeClass('active');
                        }
                    }
                    else {
                        $('.header__link:has(.header__dropdown)').removeClass('active');
                    }
                })
            }
        })

        $('[data-gtm-medium]').each(function (index, el) {
            $(el).attr('data-gtm-page', gtm_page);
        })
    };

    $('.header__hamburger').on('click', function () {
        $(this).toggleClass('active');
        $('.header').toggleClass('open-nav');
        $('.header').removeClass('on-hide');
    })

    if (viewport.w > 991) {
        $('.header__link:has(.header__dropdown)').on('mouseenter', function () {
            $(this).addClass('active');
        })
        $('.header__link:has(.header__dropdown)').on('mouseleave', function () {
            $(this).removeClass('active');
        })
    }
    else {
        $('.header__act-wrap').attr('data-lenis-prevent', '');
        $('.header__link:has(.header__dropdown)').on('click', function () {
            $(this).toggleClass('active').siblings().removeClass('active');
        })
    }

    lenis.on('scroll', (inst) => {
        ScrollTrigger.update();
        HEADER.toggleHide(lenis);
        HEADER.toggleScroll(lenis);
    })

    const initPopup = (name, options = {}) => {
        const { onOpen, onClose } = options;
        let popupWrap = $(`[data-popup-${name}='wrap']`);
        const popupAction = {
            open: (e) => {
                e.preventDefault();
                $('.global-popup').addClass('active');
                setTimeout(() => {
                    popupWrap.addClass('active');
                }, 200);
                onOpen?.(e);
            },
            close: (e) => {
                if (!popupWrap.hasClass('active')) return;
                setTimeout(() => {
                    popupWrap.removeClass('active');
                    setTimeout(() => {
                        $('.global-popup').removeClass('active');
                    }, 800);
                    onClose?.(e);
                }, 100)
            }
        }
        $(`[data-popup-${name}]`).on('click', function (e) {
            if ($(this).attr(`data-popup-${name}`) === 'open') {
                e.preventDefault();
                requestAnimationFrame(() => {
                    if ($(`[data-popup-${name}='wrap'] .popup--inner-content`).hasAttr('data-lenis-prevent')) return;
                    $(`[data-popup-${name}='wrap'] .popup-form-slot`).height() >= $(`[data-popup-${name}='wrap'] .popup--inner-content`).height() && $(`[data-popup-${name}='wrap'] .popup--inner-content`).attr('data-lenis-prevent', '');

                    $(`[data-popup-${name}='wrap'] .bot-hunter`).val('');
                })
                popupAction.open(e);
            }
            else if ($(this).attr(`data-popup-${name}`) === 'close') {
                e.preventDefault();
                popupAction.close(e);
            }
            else return;
        });

        // $(window).on('click', (e) => {
        //     if (!$(`[data-popup-${name}='open']:hover`).length)
        //         if (!$(`[data-popup-${name}='wrap'] .popup--inner-content:hover`).length)
        //             popupAction.close();
        // })

        $(`[data-popup-${name}="wrap"] .popup-overlay`).on('click', function (e) {
            popupAction.close();
        })
    }

    const HEADER = {
        toggleHide: (inst) => {
            if (inst.direction == 1) {
                if (inst.scroll > ($('.header').height() * 3)) {
                    $('.header').addClass('on-hide');
                }
            } else if (inst.direction == -1) {
                if (inst.scroll > ($('.header').height() * 3)) {
                    $('.header').addClass("on-hide");
                    $('.header').removeClass("on-hide");
                }
            }
            else {
                $('.header').removeClass("on-hide");
            }
        },
        toggleScroll: (inst) => {
            if (inst.scroll > $('.header').height() * 2) $('.header').addClass("on-scroll");
            else $('.header').removeClass("on-scroll");
        },
        swapMode: () => {
            $('.header').removeClass('on-light on-dark on-mix');
            $('.header').addClass(`on-${$('[data-header]').attr('data-header') || 'light'}`);
            $('.header').hasAttr('data-current-mode') && $('.header').removeAttr('data-current-mode');
        }
    }

    function animFooter() {
        let titleCta = splitTextFadeUpSetup('.footer-cta-title-txt', { type: 'lines, words' });
        let addressLabel = splitTextFadeUpSetup('.footer-main-address-label', { type: 'lines, words' });
        let addressTxt = splitTextFadeUpSetup('.footer-main-address-txt', { type: 'lines, words' });
        let addressLink = splitTextFadeUpSetup('.footer-main-address .footer-link', { type: 'lines, words' });

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.footer',
                start: 'top top+=85%',
                default: { ease: 'power2.out' },
                onComplete: () => {
                    titleCta.revert();
                }
            }
        })
        tl
            .to(titleCta.words, { autoAlpha: 1, yPercent: 0, duration: .8, stagger: .03 })
            .from('.footer-cta-btn', { autoAlpha: 0, y: 50, duration: .8, clearProps: 'all' }, "<=.2")
            .from('.footer-logo', { autoAlpha: 0, y: 50, duration: .8, clearProps: 'all' }, "<=.2")
            .to(addressLabel.words, { autoAlpha: 1, yPercent: 0, duration: .8, stagger: .03 }, "<=.2")
            .to(addressTxt.words, { autoAlpha: 1, yPercent: 0, duration: .8, stagger: .03 }, "<=.2")
            .to(addressLink.words, { autoAlpha: 1, yPercent: 0, duration: .8, stagger: .03 }, "<=.2")
            .from('.footer-linkedin', { autoAlpha: 0, y: 20, duration: .8, clearProps: 'all' }, "<=.2")

        $('.footer-main-links-item').each((index, item) => {
            let parent = childSelect(item);

            let tlItem = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: 'top top+=85%',
                    defaults: { ease: 'power2.out' },
                }
            })
            requestAnimationFrame(() => {
                tlItem.from([parent('.footer-label'), parent('.footer-content')], {
                    yPercent: 100, autoAlpha: 0, duration: .8, stagger: .03, clearProps: 'all'
                })
            })
        })

        $('.footer-main-contact-item').each((index, item) => {
            let parent = childSelect(item);

            let tlItem = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: 'top top+=85%',
                    default: { ease: 'power2.out' },
                }
            })
            requestAnimationFrame(() => {
                tlItem.from([parent('.footer-label'), parent('.footer-main-contact-item-link')], {
                    yPercent: 100, autoAlpha: 0, duration: .8, stagger: .03, clearProps: 'all'
                })
            })
        });

        let tlBot = gsap.timeline({
            scrollTrigger: {
                trigger: '.footer-bot',
                start: 'top bottom',
                default: { ease: 'power2.out' },
                onComplete: () => {
                    footerCopyright.revert();
                    footerTermLink.revert();
                }
            }
        })

        let footerCopyright = splitTextFadeUpSetup('.footer-copyright', { type: 'lines, words' });
        let footerTermLink = splitTextFadeUpSetup('.footer-main-bot-term .footer-link', { type: 'lines, words' });
        tlBot
            .from('.footer-bot .line', { scaleX: 0, autoAlpha: 0, duration: 1, transformOrigin: 'left', ease: 'power1.inOut', clearProps: 'all' })
            .to(footerCopyright.words, { autoAlpha: 1, yPercent: 0, duration: .8, stagger: .03 }, "<=.1")
            .to(footerTermLink.words, { autoAlpha: 1, yPercent: 0, duration: .8, stagger: .03 }, "<=.2")
    }

    if (viewport.w <= 767) {
        $('.footer-main-links-item').on('click', function (e) {
            $(this).toggleClass('active').siblings().removeClass('active');
        })
    }

    function initForm({ formName, onSuccess, hubspot }) {
        const dropdownAction = {
            open: (parent) => {
                const selector = (child) => parent ? parent(child) : $(child);
                selector('.select-dropdown-opts').addClass('active');
                selector('.select-dropdown-toggle').addClass('active');
            },
            close: (parent) => {
                const selector = (child) => parent ? parent(child) : $(child);
                selector('.select-dropdown-opts').removeClass('active');
                selector('.select-dropdown-toggle').removeClass('active');

                if (selector('.select-dropdown-opt.sub-opt.active').length === 0) {
                    setTimeout(() => {
                        selector('[data-sub-list]').removeClass('active');
                        gsap.set(selector('.select-dropdown-opts, .select-dropdown-opt, .select-dropdown-sub-opts-back'), { clearProps: 'all' })
                    }, 400);
                }
                else {
                    let subList = selector('.select-dropdown-opt.sub-opt.active').parents('[data-sub-list]');
                    subList.addClass('active');
                    setTimeout(() => {
                        gsap.set(selector('.select-dropdown-main-opts .select-dropdown-opt'), { autoAlpha: 0, y: 5 });
                        gsap.set([subList.find('.select-dropdown-sub-opts-back'), subList.find('.select-dropdown-opt')], { autoAlpha: 1, y: 0 });
                        gsap.set(selector('.select-dropdown-opts'), { height: subList.height() });
                    }, 400);
                }
            },
            toggle: (parent) => {
                parent('.select-dropdown-opts').toggleClass('active');
                $(`.select-dropdown-opts`).not(parent('.select-dropdown-opts')).removeClass('active');

                parent('.select-dropdown-toggle').toggleClass('active');
                $(`.select-dropdown-toggle`).not(parent('.select-dropdown-toggle')).removeClass('active');

                if (parent('.select-dropdown-opt.sub-opt.active').length === 0) {
                    setTimeout(() => {
                        parent('[data-sub-list]').removeClass('active');
                        gsap.set(parent('.select-dropdown-opts, .select-dropdown-opt, .select-dropdown-sub-opts-back'), { clearProps: 'all' })
                    }, 400);
                }
                else {
                    let subList = parent('.select-dropdown-opt.sub-opt.active').parents('[data-sub-list]');
                    subList.addClass('active');
                    setTimeout(() => {
                        gsap.set(parent('.select-dropdown-main-opts .select-dropdown-opt'), { autoAlpha: 0, y: 5 });
                        gsap.set([subList.find('.select-dropdown-sub-opts-back'), subList.find('.select-dropdown-opt')], { autoAlpha: 1, y: 0 });
                        gsap.set(parent('.select-dropdown-opts'), { height: subList.height() });
                    }, 400);
                }
            }
        }
        let formID = `#${getIDFormName(formName)}`;

        $(`${formID} .input-field-group .input-field.type-select`).attr('readonly', 'readonly');
        // $(`${formID} .input-field-group.hidden .input-field`).attr('disabled', '');

        $(`${formID} .input-field-group [type="tel"] [ms-code-phone-number]`).bind('change keydown keyup', function (e) {
            // let inputVal = $(this).val();
            // $(this).val(inputVal.replace(/\D/g, ''));
        })
        $(`${formID} .input-field-group [ms-code-phone-number]`).each(function() {
            let input = this;
            let preferredCountries = $(input).attr('ms-code-phone-number').split(',');

            let iti = window.intlTelInput(input, {
                preferredCountries: preferredCountries,
                utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
            });

            $.get("https://ipinfo.io", function(response) {
                var countryCode = response.country;
                iti.setCountry(countryCode);
            }, "jsonp");

            input.addEventListener('change', formatPhoneNumber);
            input.addEventListener('keyup', formatPhoneNumber);

            // Restrict input to digits and the plus sign
            input.addEventListener('input', function() {
                this.value = this.value.replace(/[^\d+]/g, '');
            });

            function formatPhoneNumber() {
                let formattedNumber = iti.getNumber(intlTelInputUtils.numberFormat.INTERNATIONAL);
                input.value = formattedNumber;
            }

            // var form = $(input).closest('form');
            // form.submit(function() {
            //     var formattedNumber = iti.getNumber(intlTelInputUtils.numberFormat.INTERNATIONAL);
            //     input.value = formattedNumber;
            // });
        });
        $(`${formID} .input-field-group .input-field`).on('focus', function (e) {
            $(this).closest('.input-field-group').addClass('active');
            if ($(this).hasClass('type-select')) {
                dropdownAction.open(childSelect($(this).parents('.input-field-group')));
            }
        })
        $(`${formID} .input-field-group .input-field`).on('blur', function (e) {
            if ($(this).hasAttr('ms-code-phone-number')) {
                if (!$(`${formID} .iti__flag-container:hover`).length) {
                    $(this).closest('.input-field-group').removeClass('active');
                    $(this).closest('.input-field-group').toggleClass('filled', $(this).val() != '');
                }
            }
            else {
                $(this).closest('.input-field-group').removeClass('active');
                $(this).closest('.input-field-group').toggleClass('filled', $(this).val() != '');
            }
        })

        // $(`${formID} .select-dropdown-toggle`).on('click', function (e) {
        //     const parent = childSelect($(this).parents('.input-field-group'));
        //     dropdownAction.toggle(parent);
        // })
        // $(`${formID} .select-dropdown-opt`).on('click', function (e) {
        //     e.preventDefault();
        //     const parent = childSelect($(this).parents('.input-field-group'));

        //     if ($(this).attr('data-sub')) {
        //         let subList = parent(`[data-sub-list="${$(this).attr('data-sub')}"]`);
        //         gsap.fromTo(parent('.select-dropdown-opts'), { height: parent('.select-dropdown-main-opts').height() }, { height: subList.height(), duration: 0.5, ease: 'power1.out' });
        //         gsap.to(parent('.select-dropdown-opt:not(.sub-opt)'), {
        //             y: -5, autoAlpha: 0, duration: 0.3, stagger: 0.04, ease: 'power1.out', onComplete: () => {
        //                 subList.addClass('active').siblings().removeClass('active');
        //             } });
        //         gsap.fromTo([subList.find('.select-dropdown-sub-opts-back'), subList.find('.select-dropdown-opt')], { y: 5, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, stagger: 0.04, delay: .3, ease: 'power1.in' });
        //     }
        //     else {
        //         if (!parent().hasClass('filled')) {
        //             parent().addClass('filled')
        //         };
        //         if ($(this).hasClass('active')) return;
        //         $(this).siblings().removeClass('active');
        //         $(this).addClass('active');
        //         if ($(this).hasClass('sub-opt')) {
        //             parent('.select-dropdown-main-opts .select-dropdown-opt').removeClass('active');
        //         }
        //         else {
        //             parent('.select-dropdown-sub-opts .select-dropdown-opt').removeClass('active');
        //         }
        //         let valText = $(this).text();
        //         dropdownAction.close(parent);
        //         parent('.input-field.type-select').val(valText);
        //     }
        // })
        // $(`${formID} .select-dropdown-sub-opts-back`).on('click', function (e) {
        //     const parent = childSelect($(this).parents('.input-field-group'));
        //     let subList = parent('.select-dropdown-sub-opts.active');
        //     setTimeout(() => {
        //         gsap.fromTo(parent('.select-dropdown-opts'), { height: subList.height() }, { height: parent('.select-dropdown-main-opts').height(), duration: 0.5, ease: 'power1.out' });
        //     }, subList.height() > parent('.select-dropdown-main-opts').height() ? subList.find('.select-dropdown-opt').length * 20 : 400);

        //     gsap.fromTo(parent('.select-dropdown-opt:not(.sub-opt)'), { y: 5, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, stagger: 0.04, ease: 'power1.in'});
        //     gsap.to([$(this), subList.find('.select-dropdown-opt')], { y: -5, autoAlpha: 0, duration: 0.3, stagger: 0.04, ease: 'power1.out', onComplete: () => {
        //         parent(`[data-sub-list]`).removeClass('active');
        //     } });
        // })
        $(`${formID} .input-confirm .checkbox-field-group input:checkbox`).on('change', function (e) {
            $(`${formID} .input-submit-btn .btn`).toggleClass('disable', !this.checked);
        })

        let firstName = '';
        let lastName = '';
        $(`${formID} .input-field[data-name="First Name"]`).bind('change keydown keyup', function (e) {
            firstName = $(this).val();
        })
        $(`${formID} .input-field[data-name="Last Name"]`).bind('change keydown keyup', function (e) {
            lastName = $(this).val();
        })

        // $(window).on('click', (e) => {
        //     if (!$(`${formID} .select-dropdown-toggle:hover`).length)
        //         if (!$(`${formID} .select-dropdown-opts:hover`).length)
        //             dropdownAction.close();
        // })
        if (!hubspot) return;
        let url = '';
        const { portalId, formId, fields } = hubspot;
        url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
        formSubmitEvent.init({
            onlyWorkOnThisFormName: formName,
            onSuccess: () => {
                let parent = childSelect($(formID).parents('.popup'));
                let originalFormTitle = parent('[data-form-el="title"]').text();
                let originalFormSub = parent('[data-form-el="subtitle"]').text();
                let fullName = `${firstName} ${lastName}`;

                parent('[data-form-el="title"]').text(`Thank you, ${fullName}!`);
                parent('[data-form-el="subtitle"]').text(parent('[data-form-el="subtitle"]').attr('data-success-replace'));
                setTimeout(() => {
                    $(formID).trigger('reset');
                    $(`${formID} .input-field-group`).removeClass('filled');
                    $(`${formID} .select-dropdown-opt`).removeClass('active');
                }, 1000);

                setTimeout(() => $('.popup').removeClass('active'), 5000);
                setTimeout(() => {
                    gsap.set(parent('.form-inner, .form-success'), { clearProps: 'all' });
                    parent('[data-form-el="title"]').text(originalFormTitle);
                    parent('[data-form-el="subtitle"]').text(originalFormSub);
                }, 5500);

                onSuccess && onSuccess(parent);
            }
        })

        const mapField = (data) => {
            if (!fields.length) return [];

            const result = fields.map((field) => {
                const { name, value } = field;
                if (!value) {
                    return {
                        name,
                        value: data[name] || ""
                    }
                }
                else {
                    const getValue = value(data);
                    return {
                        name,
                        value: getValue || ''
                    }
                }
            })
            return result;
        }
        $(formID).on('submit', function (e) {
            if ($(`${formID} #bot-hunter`).val() != '') return;

            const data = mapFormToObject(e.target);
            const mappedFields = mapField(data);
            const dataSend = {
                fields: mappedFields,
                context: {
                    pageUri: window.location.href,
                    pageName: $('[data-page-name]').attr('data-page-name'),
                },
            };
            $.ajax({
                url: url,
                method: 'POST',
                data: JSON.stringify(dataSend),
                dataType: 'json',
                headers: {
                    accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                contentType: 'application/json',
                success: function (response) {
                    console.log(response);
                },
                error: function (xhr, resp, text) {
                    console.log(xhr, resp, text)
                }
            });
        })
    }

    let requestID;
    const SCRIPTS = {
        home: {
            namespace: 'home',
            afterEnter() {
                function scHero() {
                    function marqueeLogo() {
                        const cloneAmount = 2;
                        new Array(cloneAmount).fill().forEach((_, index) => {
                            let itemClone = $('.home-hero-company-list').clone();
                            $('.home-hero-company-cms').append(itemClone);
                        })
                        $('.home-hero-company-list').addClass('animMarquee')
                    }
                    marqueeLogo();

                    function animShowEl() {
                        const heroLabel = splitTextFadeUpSetup('.home-hero-label');
                        const heroTitle = splitTextFadeUpSetup('.home-hero-title');
                        const heroSub = splitTextFadeUpSetup('.home-hero-sub');
                        const companyTitle = splitTextFadeUpSetup('.home-hero-company-title');

                        const tl = gsap.timeline({
                            delay: GLOBAL_DELAY,
                            defaults: { ease: 'power2.out' },
                            onComplete: () => {
                                heroLabel.revert();
                                heroTitle.revert();
                                heroSub.revert();
                                companyTitle.revert();
                            }
                        });
                        if (viewport.w > 991) {
                            tl
                            .from('.home-hero-thumb-inner', { autoAlpha: 0, y: 50, filter: 'blur(5px)', duration: 1.5, ease: 'expo.out', clearProps: 'all' })
                            .from('.home-hero-thumb-decor', { autoAlpha: 0, scale: .8, duration: 1.5, ease: 'back.out(1.3)', clearProps: 'all' }, "<=.4")
                            .to(heroLabel.words, { yPercent: 0, autoAlpha: 1, duration: .8, stagger: .04 }, 0)
                            .to(heroTitle.words, { yPercent: 0, autoAlpha: 1, duration: .8, stagger: .04 }, '>-.4')
                            .to(heroSub.words, { yPercent: 0, autoAlpha: 1, duration: .5, stagger: .02 }, '>-.5')
                            .from('.home-hero-btn', { autoAlpha: 0, y: 20, duration: 1, clearProps: 'all' }, '>-.6')
                            .to(companyTitle.words, { yPercent: 0, autoAlpha: 1, duration: .8, stagger: .04 }, '>-.8')
                            .from($('.home-hero-company .line:visible'), { scaleX: 0, transformOrigin: 'left', duration: 1, clearProps: 'all' }, '>-.8')
                            .from($('.home-hero-company-item:visible'), { autoAlpha: 0, yPercent: 40, xPercent: -30, rotate: 2, duration: 1.2, stagger: .05 }, '>-.85')
                        }
                        else {
                            tl
                            .to(heroLabel.words, { yPercent: 0, autoAlpha: 1, duration: .8, stagger: .04 }, 0)
                            .to(heroTitle.words, { yPercent: 0, autoAlpha: 1, duration: .8, stagger: .04 }, '>-.4')
                            .to(heroSub.words, { yPercent: 0, autoAlpha: 1, duration: .5, stagger: .02 }, '>-.5')
                            .from('.home-hero-btn', { autoAlpha: 0, y: 20, duration: 1, clearProps: 'all' }, '>-.6')
                            .to(companyTitle.words, { yPercent: 0, autoAlpha: 1, duration: .8, stagger: .04 }, '>-.8')
                            .from('.home-hero-thumb-inner', { autoAlpha: 0, y: 50, filter: 'blur(5px)', duration: 1.5, ease: 'expo.out', clearProps: 'all' }, "<=0")
                            .from('.home-hero-thumb-decor', { autoAlpha: 0, scale: .8, duration: 1.5, ease: 'back.out(1.3)', clearProps: 'all' }, "<=.4")
                            .from($('.home-hero-company .line:visible'), { scaleX: 0, transformOrigin: 'left', duration: 1, clearProps: 'all' }, '>-.8')
                            .from($('.home-hero-company-item:visible'), { autoAlpha: 0, yPercent: 40, xPercent: -30, rotate: 2, duration: 1.2, stagger: .05 }, '>-.85')
                        }
                    }

                    animShowEl();

                    let iframeSrc = new URL($('.home-hero-thumb-vid-inner').attr('data-iframe-src'));
                    $('.home-hero-thumb-btn a').on('click', function (e) {
                        e.preventDefault();
                        iframeSrc += `?origin=${window.location.origin}&autoplay=1`;
                        let iframe = $('<iframe></iframe>');
                        iframe.attr({
                            'src': iframeSrc,
                            'allow': 'autoplay',
                            'allowfullscreen': '',
                            'width': '100%',
                            'height': '100%',
                            'frameborder': 0,
                            'allow': 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
                            'referrerpolicy': 'strict-origin-when-cross-origin'
                        });
                        iframe.appendTo('.home-hero-thumb-vid-inner');
                        gsap.to('.home-hero-thumb-overlay, .home-hero-thumb-btn', {
                            autoAlpha: 0, onComplete: () => {
                            $('.home-hero-thumb-overlay').remove();
                            $('.home-hero-thumb-btn').remove();
                        } });
                    })
                }
                scHero();

                function scProduct() {
                    function shapeRotation() {
                        let tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: '.home-prod-content',
                                start: 'top-=100% bottom',
                                end: 'bottom+=100% top',
                                scrub: 1
                            }
                        })

                        tl.fromTo('.home-prod-shape-main', { yPercent: -5 }, { yPercent: 5, ease: 'none' })
                            .fromTo('.home-prod-shape-other-wrap.wrap-1', { yPercent: -2, scale: .9 }, { yPercent: 2, scale: 1, transformOrigin: 'center center', ease: 'none' }, 0)
                            .fromTo('.home-prod-shape-other-wrap.wrap-2', { yPercent: 3, scale: .95 }, { yPercent: -3, scale: 1, transformOrigin: 'center center', ease: 'none' }, 0)
                            .fromTo('.home-prod-shape-other-wrap.wrap-3', { yPercent: -2, scale: 1 }, { yPercent: 2, scale: 1.05, transformOrigin: 'center center', ease: 'none' }, 0)

                        const shapeAnim = ({ wrap, start, end }) => {
                            const parent = childSelect(wrap);
                            return ({
                                motionPath: {
                                    path: parent('[data-anim-path]').get(0),
                                    align: parent('[data-anim-path]').get(0),
                                    alignOrigin: [0.5, 0.5],
                                    start,
                                    end,
                                },
                                scrollTrigger: {
                                    trigger: wrap,
                                    start: 'top-=100px bottom',
                                    end: 'bottom+=100px top',
                                    scrub: true,
                                },
                                ease: 'none'
                            })
                        }

                        gsap.to('.home-prod-shape-other-1.item-1', shapeAnim({ wrap: '.home-prod-shape-other-wrap.wrap-1', start: .28, end: .2 }));
                        gsap.to('.home-prod-shape-other-1.item-2', shapeAnim({ wrap: '.home-prod-shape-other-wrap.wrap-1', start: .49, end: .3 }));
                        gsap.to('.home-prod-shape-other-1.item-3', shapeAnim({ wrap: '.home-prod-shape-other-wrap.wrap-1', start: .75, end: .65 }));
                        gsap.to('.home-prod-shape-other-1.item-4', shapeAnim({ wrap: '.home-prod-shape-other-wrap.wrap-1', start: -.01, end: -.19 }));

                        gsap.to('.home-prod-shape-other-2.item-1', shapeAnim({ wrap: '.home-prod-shape-other-wrap.wrap-2', start: .45, end: .35 }));
                        gsap.to('.home-prod-shape-other-2.item-2', shapeAnim({ wrap: '.home-prod-shape-other-wrap.wrap-2', start: .7, end: .55 }));
                        gsap.to('.home-prod-shape-other-2.item-3', shapeAnim({ wrap: '.home-prod-shape-other-wrap.wrap-2', start: .03, end: -.2 }));
                        gsap.to('.home-prod-shape-other-2.item-4', shapeAnim({ wrap: '.home-prod-shape-other-wrap.wrap-2', start: .1, end: 0.02 }));

                        gsap.to('.home-prod-shape-other-3.item-1', shapeAnim({ wrap: '.home-prod-shape-other-wrap.wrap-3', start: .35, end: .2 }));
                        gsap.to('.home-prod-shape-other-3.item-2', shapeAnim({ wrap: '.home-prod-shape-other-wrap.wrap-3', start: .85, end: .63 }));
                    }
                    if (viewport.w > 767) {
                        gsap.timeline({
                            scrollTrigger: {
                                trigger: '.home-prod',
                                start: 'top bottom+=100vh',
                                once: true,
                                scrub: false,
                                onEnter: () => requestAnimationFrame(() => shapeRotation())
                            }
                        })
                    }

                    function impactSlider() {
                        $('.home-prod-item').each(function (index, item) {
                            let paginationClone = $('.home-prod-pagin-item').clone();

                            let parent = childSelect(item);
                            let allDetail = parent('.home-prod-item-sub-wrap p');
                            parent('.home-prod-item-sub-wrap h3').remove();
                            parent('.home-prod-item-sub-wrap figure').remove();
                            let total = allDetail.length;
                            allDetail.addClass('txt fs-16 fw-med home-prod-item-sub');
                            allDetail.eq(0).addClass('active');

                            // parent('.home-prod-item-sub-wrap .home-prod-item-sub').each((_, sub) => {
                            //     new SplitType(sub, { types: 'lines, words', wordClass: 'word' })
                            //         .words.forEach((word, index) => gsap.set(word, { '--trans-delay': `${(index + 1) * .05}s` }))
                            // })

                            parent('.home-prod-pagin').html(total > 1 ? new Array(total).fill().map((_, i) => paginationClone.prop('outerHTML')).join('') : '');

                            parent('.home-prod-pagin-item').removeClass('active');
                            parent('.home-prod-item-sub').eq(0).addClass('active');
                            parent('.home-prod-pagin-item').eq(0).addClass('active');

                            parent('.home-prod-item-control-btn').on('click', function (e) {
                                let current = parent('.home-prod-item-sub-wrap .home-prod-item-sub.active');
                                let currentPagin = parent('.home-prod-pagin-item.active');

                                if ($(e.target).hasClass('next')) {
                                    let next = current.next().length ? current.next() : parent('.home-prod-item-sub-wrap .home-prod-item-sub').first();
                                    let nextPagin = currentPagin.next().length ? currentPagin.next() : parent('.home-prod-pagin-item').first();

                                    current.removeClass('active');
                                    currentPagin.removeClass('active');

                                    next.addClass('active');
                                    nextPagin.addClass('active');
                                }
                                else if ($(e.target).hasClass('prev')) {
                                    let prev = current.prev().length ? current.prev() : parent('.home-prod-item-sub-wrap .home-prod-item-sub').last();
                                    let prevPagin = currentPagin.prev().length ? currentPagin.prev() : parent('.home-prod-pagin-item').last();

                                    current.removeClass('active');
                                    currentPagin.removeClass('active');

                                    prev.addClass('active');
                                    prevPagin.addClass('active');
                                }
                                else return;
                            })
                        });
                    }
                    impactSlider();
                }
                scProduct();

                function scWhy() {
                    function hoverInteract() {
                        let enterTimeout;
                        $('.home-why-thumb-item').on('mouseenter', function (e) {
                            clearTimeout(enterTimeout);
                            $('.home-why-thumb-desc').removeClass('active');
                            $('.home-why-thumb-desc').css({ opacity: 0 });
                            gsap.set('.home-why-thumb-item', { clearProps: 'all' });
                            enterTimeout = setTimeout(() => {
                                $('.home-why-thumb-item').not($(this)).css({ backgroundColor: '#e4e6e0', transform: 'scale(.96)' });
                                $('.home-why-thumb-desc').text($(this).find('[data-content="desc"]').text());
                                $('.home-why-thumb-desc').css({ opacity: 1 });
                                $('.home-why-thumb-desc').addClass('active');
                            }, 200);
                        })

                        $('.home-why-thumb-item').on('mouseleave', function (e) {
                            clearTimeout(enterTimeout);
                            $('.home-why-thumb-desc').removeClass('active');
                            $('.home-why-thumb-desc').css({ opacity: 0 });
                            gsap.set('.home-why-thumb-item', { clearProps: 'all' });
                        })
                    }

                    function slideListing() {
                        const parent = childSelect('.home-why-thumb');
                        swiper.initClassName(parent);
                        swiper.setup(parent, { spacing: cvUnit(20, 'rem'), pag: true });
                    }
                    if (viewport.w > 767) {
                        hoverInteract();
                    }
                    else {
                        slideListing();
                    }
                }
                scWhy();

                function scCustomer() {
                    $('.home-cus-main-item').removeClass('active');
                    requestAnimationFrame(() => {
                        $('.home-cus-main-item').eq(0).addClass('active');
                        $('.home-cus-avt-item').eq(0).addClass('active');
                    })

                    $('.home-cus-main-item-logo [data-replace="company"]').attr('src', $('.home-cus-main-item').eq(0).find('[data-content="company"]').attr('src'));

                    $('.home-cus-avt-item').on('click', function () {
                        let index = $(this).index();
                        $(this).addClass('active').siblings().removeClass('active');

                        $('.home-cus-main-item').eq(index).addClass('active').siblings().removeClass('active');
                        gsap.timeline()
                            .to('.home-cus-main-item-logo-img', {
                                duration: 0.4, autoAlpha: 0, ease: 'linear', onComplete: () => {
                                    $('.home-cus-main-item-logo [data-replace="company"]').attr('src', $('.home-cus-main-item').eq(index).find('[data-content="company"]').attr('src'));
                                }
                            })
                            .set('.home-cus-main-item-logo-img', { autoAlpha: 0 })
                            .to('.home-cus-main-item-logo-img', { duration: 0.4, autoAlpha: 1, ease: 'linear' });
                    })

                    $('.home-cus-main-item').each(function (index, item) {
                        let splitTextArr = [
                            { el: '.home-cus-main-item-name', delay: .35 },
                            { el: '.home-cus-main-item-role', delay: .4 },
                            { el: '.home-cus-main-item-content', delay: .55 }];
                        splitTextArr.forEach(({ el, delay }) => {
                            $(el).eq(index).addClass('active').siblings().removeClass('active');
                        })
                    })
                }
                scCustomer();

                function checkActionRedirect() {
                    let searchParam = new URLSearchParams(window.location.search);
                    let actionParam = searchParam.get('action');
                    if (actionParam) {
                        setTimeout(() => {
                            $(`[data-popup-${actionParam}="open"]`)?.eq(0)?.trigger('click');
                        }, 2000);
                    }
                }
                checkActionRedirect();
            },
            beforeLeave() {
                requestID && cancelAnimationFrame(requestID);
            }
        },
        about: {
            namespace: 'about',
            afterEnter() {
                console.log("enter about");

                function scHero() {
                    function animShowEl() {
                        const heroTitle = splitTextFadeUpSetup('.about-hero-title');
                        const heroSub = splitTextFadeUpSetup('.about-hero-sub');

                        const tl = gsap.timeline({
                            delay: GLOBAL_DELAY,
                            defaults: { ease: 'power2.out' },
                            onComplete: () => {
                                heroTitle.revert();
                                heroSub.revert();
                            }
                        });
                        tl
                            .to(heroTitle.words, { yPercent: 0, autoAlpha: 1, duration: .8, stagger: .04 })
                            .from('.about-hero-ic', { y: 20, autoAlpha: 0, duration: 1, clearProps: 'all' }, '<=.2')
                            .to(heroSub.words, { yPercent: 0, autoAlpha: 1, duration: .5, stagger: .02 }, "<=.1")
                            .from('.about-hero-grid-img', { autoAlpha: 0, filter: 'blur(5px)', scale: 1.1, duration: 1.5, ease: 'circ.out', clearProps: 'all' }, "<=0.1")
                            .from('.about-hero-content', { backgroundColor: 'rgba(255, 255, 255, 0)', ease: 'circ.out', duration: 1.5, clearProps: 'all' }, "<=0.1")
                            .from('.about-hero-logo', { autoAlpha: 0, y: 10, scale: .8, ease: 'back.out(1.3)', duration: 1.5, clearProps: 'all' }, "<=.1")
                    }
                    animShowEl();
                }
                scHero();

                function scTeam() {
                    const parent = childSelect('.about-team');
                    $('.about-team-cms-item').removeClass('active');

                    const activeIndex = (index, realIndex = index) => {
                        $('.about-team-cms-item').eq(realIndex).addClass('active').siblings().removeClass('active');
                        $('.about-team-content-cms .about-team-content-cms-item').eq(index).addClass('active').siblings().removeClass('active');
                        if (viewport.w <= 767) {
                            $('.about-team-content-cms.only-mb .about-team-content-cms-item').eq(index).addClass('active').siblings().removeClass('active');
                        }

                        parent('[data-replace="name"]').text($('.about-team-content-cms-item').eq(index).find('[data-content="name"]').text());
                        parent('[data-replace="role"]').text($('.about-team-content-cms-item').eq(index).find('[data-content="role"]').text());
                        parent('[data-replace="linkedin"]').attr('href', $('.about-team-content-cms-item').eq(index).find('[data-content="linkedin"]').text());
                    }
                    let itemLength = $('.about-team-content-cms.only-mb .about-team-content-cms-item').length;

                    swiper.initClassName(childSelect($(viewport.w > 767 ? '.about-team-content' : '.about-team-content-mb')));


                    const swiperTeam = swiper.setup(parent, {
                        onView: 'auto',
                        spacing: cvUnit(9, 'rem'),
                        nav: true,
                        initialSlide: Math.floor(itemLength / 2),
                        centeredSlides: true,
                        slidesPerGroupAuto: true,
                        on: {
                            slideChange: ({ activeIndex: index, realIndex }) => {
                                activeIndex(index, realIndex);
                            },
                        },
                        breakpoints: {
                            768: {
                                slidesPerView: 'auto',
                                spaceBetween: cvUnit(3, 'rem'),
                                centeredSlides: false,
                                initialSlide: 0,
                                // loop: true,
                                // loopAdditionalSlides: 12
                            }
                        },
                    });
                    $('.about-team-content-cms-item').on('click', function (e) {
                        activeIndex($(this).index());
                        if ($(this).index() >= $('.swiper-slide.about-team-content-cms-item').length - 2) {
                            swiperTeam.slideTo($('.swiper-slide.about-team-content-cms-item').length - 3);
                        }
                        else {
                            swiperTeam.slideTo($(this).index())
                        }
                    })

                    if (viewport.w <= 767) {
                        parent('.w-dyn-list').each(function (_, cms) {
                            $(cms).find('.w-dyn-item').each(function (index, item) {
                                if (index > Math.floor(itemLength / 2)) {
                                    $(item).prependTo($(cms).find('.w-dyn-items'));
                                }
                            });
                        })
                        activeIndex(Math.floor(itemLength / 2));
                    }
                    else {
                        activeIndex(0);
                    }

                    // requestAnimationFrame(() => {
                    //     console.log("run")
                    // })
                    // setTimeout(() => {
                    //     activeIndex(3);
                    //     swiperTeam.slideTo(3);
                    // }, 1000);
                }
                scTeam();

                function scBenefit() {
                    const parent = childSelect('.about-benefit .about-benefit-main');
                    if (viewport.w <= 767) {
                        swiper.initClassName(parent);
                        swiper.setup(parent, { spacing: cvUnit(20, 'rem'), pag: true });
                    }
                }
                scBenefit();
            }
        },
        data: {
            namespace: 'data',
            afterEnter() {
                console.log("enter data");

                function scHero() {
                    const title = splitTextFadeUpSetup('.data-hero-title');
                    const sub = splitTextFadeUpSetup('.data-hero-sub');

                    let tl = gsap.timeline({
                        delay: GLOBAL_DELAY,
                        defaults: { ease: 'power2.out' },
                        onComplete: () => {
                            title.revert();
                            sub.revert();
                        }
                    })

                    tl
                        .to(title.words, { yPercent: 0, autoAlpha: 1, duration: .8, stagger: .04 })
                        .to(sub.words, { yPercent: 0, autoAlpha: 1, duration: .5, stagger: .02 }, "<=.1")
                }
                scHero();

                function scContent() {
                    let tocHeadings = $('.data-content-richtext h2');

                    let tocWrap = $('.data-content-toc-listing');
                    if (tocHeadings.length <= 1) {
                        let tocWrap = $('.data-content-toc-listing').parents('.data-content-toc').remove();
                    }
                    tocWrap.html('');

                    for (let i = 0; i < tocHeadings.length; i++) {
                        tocHeadings.eq(i).attr('id', `toc-${i}`);
                        let tocItem = $('<a></a>').addClass('data-content-toc-item').attr({ href: `#toc-${i}`, 'data-anim-stagger-el': 'item' });
                        let tocPoint = $('<div></div>').addClass('data-content-toc-item-point');
                        let tocName = $('<div></div>').addClass('txt fs16 fw-med data-content-toc-item-txt').text(tocHeadings.eq(i).text());

                        tocPoint.appendTo(tocItem);
                        tocName.appendTo(tocItem);
                        tocWrap.append(tocItem);
                    }

                    lenis.on('scroll', function (e) {
                        let currScroll = e.scroll;
                        for (let i = 0; i < tocHeadings.length; i++) {
                            let top = tocHeadings.eq(i).get(0).getBoundingClientRect().top;
                            if (top > 0 && top < (viewport.h / 5)) {
                                $(`.data-content-toc-item[href="${window.location.pathname}#toc-${i}"]`).addClass('active');
                                $(`.data-content-toc-item`).not(`[href="${window.location.pathname}#toc-${i}"]`).removeClass('active');
                            }
                        }

                        if (e.direction == 0 && e.scroll >= ($('.header').height() * 3)) {
                            $('.data-content-toc-wrap, .data-content-toc').addClass('on-scroll');
                        }
                        else if (e.direction == 1) {
                            if (e.scroll >= ($('.header').height() * 3)) {
                                $('.data-content-toc-wrap, .data-content-toc').removeClass('on-scroll');
                            } else {
                                $('.data-content-toc-wrap, .data-content-toc').addClass('on-scroll');
                            }
                        } else if (e.direction == -1) {
                            if (e.scroll >= ($('.header').height() * 3)) {
                                $('.data-content-toc-wrap, .data-content-toc').addClass('on-scroll');
                            } else {
                                $('.data-content-toc-wrap, .data-content-toc').removeClass('on-scroll');
                            }
                        }
                    });
                    $('.data-content-toc-item').on('click', function (e) {
                        e.preventDefault();
                        let target = $(this).attr('href');

                        if ($("html").hasClass("lenis-smooth")) {
                            lenis.scrollTo(target, {
                                offset: -100,
                            })
                        } else {
                            let targetTop = $(target).offset().top - 100;
                            $("html, body").animate({ scrollTop: targetTop }, 1200, 'exponentialEaseOut');
                        }

                        // barba.history.add(`${window.location.pathname + target}`, 'barba', 'replace');
                        return false;
                    })

                    const currToc = window.location.hash;
                    if ($(currToc).length) {
                        setTimeout(() => {
                            $(`.data-content-toc-item[href='${currToc}']`).trigger('click');
                        }, 10)
                    }
                    else {
                        // barba.history.add(`${window.location.pathname}`, 'barba', 'replace');
                    }
                    $('.data-content-toc-wrap').height() >= viewport.h && $('.data-content-toc').attr('data-lenis-prevent', '');
                }
                scContent();

            }
        },
        legal: {
            namespace: 'legal',
            afterEnter() {
                function scHero() {
                    const title = splitTextFadeUpSetup('.legal-hero-title');
                    const sub = splitTextFadeUpSetup('.legal-hero-sub');

                    let tl = gsap.timeline({
                        delay: GLOBAL_DELAY,
                        defaults: { ease: 'power2.out' },
                        onComplete: () => {
                            title.revert();
                            sub.revert();
                        }
                    })

                    tl
                        .to(title.words, { yPercent: 0, autoAlpha: 1, duration: .8, stagger: .04 })
                        .to(sub.words, { yPercent: 0, autoAlpha: 1, duration: .5, stagger: .02 }, "<=.1")
                        .from('.legal-hero-clip', { marginTop: 0, duration: 1.2, ease: 'power1.out', clearProps: 'all' }, "<=.1")
                }
                scHero();
            }
        },
        article: {
            namespace: 'article',
            afterEnter() {
                console.log("enter article")
                function socialShare() {
                    const url = window.location.href;
                    $('.ar-content-share-ic-link').each((_, icon) => {
                        icon.setAttribute('target', '_blank');
                        switch (icon.getAttribute('data-share')) {
                            case 'linkedin': icon.setAttribute('href', `https://www.linkedin.com/sharing/share-offsite/?url=${url}`); break;
                            case 'facebook': icon.setAttribute('href', `https://www.facebook.com/sharer/sharer.php?u=${url}`); break;
                            case 'twitter': icon.setAttribute('href', `https://twitter.com/intent/tweet?url=${url}`); break;
                            case 'copy': break;
                            default: break;
                        }
                    });

                    $('[data-share="copy"]').on('click', function (e) {
                        e.preventDefault();
                        copyTextToClipboard(url);
                    })
                }
                socialShare();

                function copyTextToClipboard(text) {
                    let textArea = document.createElement('textarea');
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
                    document.body.removeChild(textArea);

                    $('.ar-content-share-popup').addClass('active');
                    setTimeout(() => {
                        $('.ar-content-share-popup').removeClass('active');
                    }, 2000);
                }
            }
        },
        insight: {
            namespace: 'insight',
            afterEnter() {
                console.log("enter insight")
                function scHero() {
                    let title = splitTextFadeUpSetup('.ins-hero-title');
                    let tl = gsap.timeline({
                        delay: GLOBAL_DELAY,
                        default: { ease: 'power2.out' },
                        onComplete: () => {
                            title.revert();
                        }
                    })
                    tl.to(title.words, {
                        yPercent: 0, autoAlpha: 1, duration: .8, stagger: .04,
                        delay: 1,
                        onComplete: () => {
                            title.revert();
                            gsap.set('.ins-hero-title', { clearProps: 'all' });
                        }
                    }).from('.ins-hero-clip', { marginTop: 0, duration: 1.2, ease: 'power1.out' }, "<=.1")
                }
                scHero();

                function scListing() {
                    let limit = 5;
                    function loadMoreArticles(index) {
                        const parent = childSelect($('.ins-listing-content-cms').eq(index));
                        const totalItems = parent('.ins-listing-content-cms-item').length;
                        const loadedItems = parent('.ins-listing-content-cms-item.loaded').length;

                        if (totalItems <= limit || loadedItems >= totalItems) {
                            $('.ins-listing-load-btn').hide();
                        } else {
                            $('.ins-listing-load-btn').show();
                        }

                        parent('.ins-listing-content-cms-item').each((index, item) => {
                            if (index >= limit && !$(item).hasClass('loaded')) {
                                $(item).hide();
                            }
                        });

                        $('.ins-listing-load-btn .btn').off('click').on('click', function (e) {
                            e.preventDefault();
                            let hiddenItems = parent('.ins-listing-content-cms-item:hidden');
                            let hiddenItemsLength = hiddenItems.length;
                            let showItems = hiddenItemsLength >= limit ? limit : hiddenItemsLength;
                            hiddenItems.each((index, item) => {
                                if (index < showItems) {
                                    gsap.fromTo(item, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, stagger: .05, duration: 0.5, display: 'block', onComplete: () => $(item).addClass('loaded') });
                                }
                            });
                            if (hiddenItemsLength <= limit) {
                                $(this).parent().hide();
                            }
                        });
                    }
                    const activeIndex = (index) => {
                        if ($('.ins-listing-tabs').hasClass('animating')) return;

                        $('.ins-listing-tabs').addClass('animating');

                        $('.ins-listing-cms-item').eq(index).addClass('active').siblings().removeClass('active');
                        $('.ins-listing-content-cms').eq(index).css('z-index', '2').siblings().css('z-index', '1');


                        gsap.set($('.ins-listing-content-cms').eq(index).find('.insight-card'), { autoAlpha: 0, y: 30, duration: 0 })
                        setTimeout(() => {
                            $('.ins-listing-content-cms').eq(index).addClass('active').siblings().removeClass('active')
                            gsap.to($('.ins-listing-content-cms').eq(index).find('.insight-card'), { autoAlpha: 1, y: 0, duration: .6, stagger: .06, ease: 'power2.inOut' });
                            $('.ins-listing-tabs').removeClass('animating');
                        }, 500);

                        gsap.to($('.ins-listing-content-cms').not($('.ins-listing-content-cms').eq(index)).find('.insight-card'), { autoAlpha: 0, y: 20, duration: .5, stagger: .06, ease: 'power2.inOut' });

                        if (viewport.w <= 767) {
                            loadMoreArticles(index);
                        }
                    }
                    $('.ins-listing-cms-item').on('click', function (e) {
                        e.preventDefault();
                        let index = $(this).index();
                        activeIndex(index);
                        $(this).find('.ins-listing-cms-item-link').addClass('w--current').parent().siblings().find('.ins-listing-cms-item-link').removeClass('w--current');
                        let id = $(this).find('.ins-listing-cms-item-link').attr('id');
                        window.history.pushState(null, null, `${window.location.pathname + `#${id}`}`);
                        // barba.history.add(`${window.location.pathname + `#${id}`}`, 'barba', 'replace');
                    })
                    if (viewport.w <= 767) {
                        $('.ins-listing-content-cms').each((_, item) => {
                            $(item).find('.ins-listing-content-cms-item').each((index, item) => index < limit && $(item).addClass('loaded'));
                        })
                    }
                    setTimeout(() => {
                        let currCategory = window.location.hash;
                        if ($(currCategory).length) {
                            $('.ins-listing-cms-item-link').eq($(currCategory).parent().index()).addClass('w--current');
                            activeIndex($(currCategory).parent().index());
                        }
                        else {
                            $('.ins-listing-cms-item-link').eq(0).addClass('w--current');
                            activeIndex(0);
                        }
                    }, 500);
                }
                scListing();
            }
        },
        usecase: {
            namespace: 'usecase',
            afterEnter() {
                console.log("enter use case");
                function scHero() {
                    function animShowEl() {
                        const heroTitle = splitTextFadeUpSetup('.uc-hero-title h1');
                        const heroSub = splitTextFadeUpSetup('.uc-hero-sub');
                        const heroDesc = splitTextFadeUpSetup('.uc-hero-desc');

                        const tl = gsap.timeline({
                            delay: GLOBAL_DELAY,
                            defaults: { ease: 'power2.out' },
                            onComplete: () => {
                                heroTitle.revert();
                                heroSub.revert();
                                heroDesc.revert();
                            }
                        });

                        tl
                            .from('.uc-hero-decor', { autoAlpha: 0, scale: .8, duration: 1.5, ease: 'back.out(1.3)', clearProps: 'all' })
                            .from('.uc-hero-clip', { y: cvUnit(viewportBreak({ desktop: 76, mobile: 33 }), 'rem'), duration: 1.2, ease: 'power1.out', clearProps: 'all' }, '<=.1')
                            .to(heroTitle.words, { yPercent: 0, autoAlpha: 1, duration: .8, stagger: .04 }, "<=.2")
                            .to(heroSub.words, { yPercent: 0, autoAlpha: 1, duration: .5, stagger: .02 }, '<=.1')
                            .to(heroDesc.words, { yPercent: 0, autoAlpha: 1, duration: .5, stagger: .02 }, '<=.1')
                            .from('.uc-hero-ic', { autoAlpha: 0, y: 20, duration: 1, clearProps: 'all' }, '<=.1')
                            .from('.uc-hero-btn .btn', { autoAlpha: 0, y: 20, duration: 1, stagger:  .1, clearProps: 'all' }, "<=.1")
                    }
                    animShowEl();
                }
                scHero();

                function scIntro() {
                    let cloneCard = $('.uc-intro-card-wrap').eq(0).clone();
                    $('.uc-intro-card-wrap').eq(0).remove();
                    $('.uc-intro .hidden-content h3').each((i, h3) => {
                        let html = cloneCard.clone();
                        let parent = childSelect(html);
                        parent('.uc-intro-card-title').text($(h3).text());
                        parent('.uc-intro-card-desc').text($(h3).next().text());
                        html.toggleClass('active', i === 0);
                        $('.uc-intro-listing').append(html);
                    })
                    if (viewport.w > 767) {
                        if ($('.uc-intro-card-wrap').length % 2 == 0) {
                            $('.uc-intro-listing').addClass('even-layout');
                        }
                    }
                }
                scIntro();

                function scInsight() {
                    const parent = childSelect('.us-insight-listing');
                    if (viewport.w <= 767) {
                        swiper.initClassName(parent);
                        swiper.setup(parent, { spacing: cvUnit(20, 'rem'), pag: true });
                    }
                }
                scInsight();

                function scCustomer() {
                    $('.home-cus-main-item').removeClass('active');
                    requestAnimationFrame(() => {
                        $('.home-cus-main-item').eq(0).addClass('active');
                        $('.home-cus-avt-item').eq(0).addClass('active');
                    })

                    $('.home-cus-main-item-logo [data-replace="company"]').attr('src', $('.home-cus-main-item').eq(0).find('[data-content="company"]').attr('src'));

                    $('.home-cus-avt-item').on('click', function () {
                        let index = $(this).index();
                        $(this).addClass('active').siblings().removeClass('active');

                        $('.home-cus-main-item').eq(index).addClass('active').siblings().removeClass('active');
                        gsap.timeline()
                            .to('.home-cus-main-item-logo-img', {
                                duration: 0.4, autoAlpha: 0, ease: 'linear', onComplete: () => {
                                    $('.home-cus-main-item-logo [data-replace="company"]').attr('src', $('.home-cus-main-item').eq(index).find('[data-content="company"]').attr('src'));
                                }
                            })
                            .set('.home-cus-main-item-logo-img', { autoAlpha: 0 })
                            .to('.home-cus-main-item-logo-img', { duration: 0.4, autoAlpha: 1, ease: 'linear' });
                    })

                    $('.home-cus-main-item').each(function (index, item) {
                        let splitTextArr = [
                            { el: '.home-cus-main-item-name', delay: .35 },
                            { el: '.home-cus-main-item-role', delay: .4 },
                            { el: '.home-cus-main-item-content', delay: .55 }];
                        splitTextArr.forEach(({ el, delay }) => {
                            $(el).eq(index).addClass('active').siblings().removeClass('active');
                        })
                    })
                }
                scCustomer();
            }
        },
        product: {
            namespace: 'product',
            afterEnter(data) {
                function scHero() {
                    $('.prod-hero-thumb-item').each(function (index, item) {
                        const parent = childSelect(item);
                        parent('.prod-hero-thumb-item-shape').each((i, shape) => {
                            gsap[index === 1 ? 'to' : 'from'](shape, {
                                duration: 50,
                                ease: "linear",
                                delay: i * index * -1 * 13.33,
                                repeat: -1,
                                motionPath: {
                                    path: parent('[data-anim-path]').get(0),
                                    align: parent('[data-anim-path]').get(0),
                                    alignOrigin: [0.5, 0.5]
                                },
                            })
                        })
                    })

                    function animShowEl() {
                        const heroTitle = splitTextFadeUpSetup('.prod-hero-title');
                        const heroSub = splitTextFadeUpSetup('.prod-hero-sub');
                        const heroDesc = splitTextFadeUpSetup('.prod-hero-desc');

                        let tl = gsap.timeline({
                            delay: GLOBAL_DELAY,
                            defaults: { ease: 'power2.out' },
                            onComplete: () => {
                                heroTitle.revert();
                                heroSub.revert();
                                heroDesc.revert();
                            }
                        })
                        tl
                            .from('.prod-hero-thumb-inner', { autoAlpha: 0, y: 50, filter: 'blur(5px)', duration: 1.5, ease: 'expo.out', clearProps: 'all' })
                            .to(heroDesc.words, { yPercent: 0, autoAlpha: 1, duration: .5, stagger: .02 }, '<=.1')
                            .to(heroTitle.words, { yPercent: 0, autoAlpha: 1, duration: .8, stagger: .04 }, "<=.1")
                            .to(heroSub.words, { yPercent: 0, autoAlpha: 1, duration: .5, stagger: .02 }, '<=.1')
                            .from('.prod-hero-btn .btn', { autoAlpha: 0, y: 20, duration: 1, clearProps: 'all' },  '>-.6')
                    }
                    animShowEl();

                    let iframeSrc = new URL($('.prod-hero-thumb-vid-inner').attr('data-iframe-src'));
                    let iframeTitle = $('.prod-hero-thumb-vid-inner').attr('data-iframe-title');
                    $('.prod-hero-thumb-btn a').on('click', function (e) {
                        e.preventDefault();
                        iframeSrc += `?origin=${window.location.origin}&autoplay=1`;
                        let iframe = $('<iframe></iframe>');
                        iframe.attr({
                            'src': iframeSrc,
                            'title': iframeTitle,
                            'allow': 'autoplay',
                            'allowfullscreen': '',
                            'width': '100%',
                            'height': '100%',
                            'frameborder': 0,
                            'allow': 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
                            'referrerpolicy': 'strict-origin-when-cross-origin'
                        });
                        iframe.appendTo('.prod-hero-thumb-vid-inner');
                        gsap.to('.prod-hero-thumb-overlay, .prod-hero-thumb-btn', {
                            autoAlpha: 0, onComplete: () => {
                            $('.prod-hero-thumb-overlay').remove();
                            $('.prod-hero-thumb-btn').remove();
                        } });
                    })
                }
                scHero();

                function scBenefit() {
                    const parent = childSelect('.prod-benefit .about-benefit-main');
                    if (viewport.w <= 767) {
                        swiper.initClassName(parent);
                        swiper.setup(parent, { spacing: cvUnit(20, 'rem'), pag: true });
                    }
                }
                scBenefit();

                function scService() {
                    const parent = childSelect('.prod-service');

                    let cloneService = $('.prod-service-item').eq(0).clone();
                    $('.prod-service-item').eq(0).remove()
                    $('.prod-service-main .hidden-content h3').each((i, h3) => {
                        let html = cloneService.clone();
                        let parent = childSelect(html);
                        parent('.prod-service-item-title').text($(h3).text());
                        parent('.prod-service-item-desc').text($(h3).next().text());
                        html.insertBefore('.prod-service-item:last');
                    })

                    if (viewport.w > 767) {
                        if ($('.prod-service-item').length === 3) {
                            $('.prod-service-list').addClass('three-item');
                        }
                    }

                    if (viewport.w <= 767) {
                        swiper.initClassName(parent);
                        swiper.setup(parent, { spacing: cvUnit(20, 'rem'), pag: true });
                    }
                }
                scService();

                function scCustomer() {
                    $('.home-cus-main-item').removeClass('active');
                    requestAnimationFrame(() => {
                        $('.home-cus-main-item').eq(0).addClass('active');
                        $('.home-cus-avt-item').eq(0).addClass('active');
                    })

                    $('.home-cus-main-item-logo [data-replace="company"]').attr('src', $('.home-cus-main-item').eq(0).find('[data-content="company"]').attr('src'));

                    $('.home-cus-avt-item').on('click', function () {
                        let index = $(this).index();
                        $(this).addClass('active').siblings().removeClass('active');

                        $('.home-cus-main-item').eq(index).addClass('active').siblings().removeClass('active');
                        gsap.timeline()
                            .to('.home-cus-main-item-logo-img', {
                                duration: 0.4, autoAlpha: 0, ease: 'linear', onComplete: () => {
                                    $('.home-cus-main-item-logo [data-replace="company"]').attr('src', $('.home-cus-main-item').eq(index).find('[data-content="company"]').attr('src'));
                                }
                            })
                            .set('.home-cus-main-item-logo-img', { autoAlpha: 0 })
                            .to('.home-cus-main-item-logo-img', { duration: 0.4, autoAlpha: 1, ease: 'linear', });
                    })

                    $('.home-cus-main-item').each(function (index, item) {
                        let splitTextArr = [
                            { el: '.home-cus-main-item-name', delay: .05 },
                            { el: '.home-cus-main-item-role', delay: .05 },
                            { el: '.home-cus-main-item-content', delay: .08 }];
                        splitTextArr.forEach(({ el, delay }) => {
                            $(el).eq(index).addClass('active').siblings().removeClass('active');
                        })
                    })
                }
                scCustomer();

                function scSolution() {
                    let isGlobalJobCatalog = window.location.pathname.split('/').at(-1) == '';
                    let cloneSolution = $('.prod-solution-main-item').eq(0).clone();
                    let cloneImg = isGlobalJobCatalog ? $('.prod-solution-sub-img-inner').eq(0).clone() : $('.prod-solution-main-img-inner').eq(0).clone();

                    $('.prod-solution-main-item').eq(0).remove();
                    if (isGlobalJobCatalog) {
                        $('.prod-solution-main-img').hide();
                        $('.prod-solution-sub-img').show();
                        $('.prod-solution-sub-img').css('display', 'grid');
                    }

                    $(`.prod-solution-${isGlobalJobCatalog ? 'sub' : 'main'}-img-inner`).eq(0).remove();
                    $('.prod-solution-main-inner .hidden-content h3').each((i, h3) => {
                        let solutionText = cloneSolution.clone();
                        let solutionImg = cloneImg.clone();

                        childSelect(solutionText)('.prod-solution-main-item-title-txt').text($(h3).text());
                        childSelect(solutionText)('.prod-solution-main-item-content .txt').text($(h3).next().text());

                        childSelect(solutionImg)('img').attr('src', $(h3).next().next().find('img').attr('src'));

                        solutionText.toggleClass('active', i === 0);
                        solutionImg.toggleClass('active', i === 0);
                        $('.prod-solution-main-inner').append(solutionText);
                        $(`.prod-solution-${isGlobalJobCatalog ? 'sub' : 'main'}-img`).append(solutionImg);
                    })

                    $('.prod-solution-main .accordion-title').on('click', function (e) {
                        let parent = $(this).parents('.accordion-item');
                        parent.toggleClass('active');
                        parent.siblings().removeClass('active');
                        $(`.prod-solution-${isGlobalJobCatalog ? 'sub' : 'main'}-img-inner`).eq(parent.index() - 1).addClass('active').siblings().removeClass('active');
                        ScrollTrigger.refresh();
                    })
                }
                scSolution();

                function scUseCase() {
                    $('.prod-uc-main-inner .accordion-item').eq(0).addClass('active');
1
                    $('.prod-uc-main .accordion-title').on('click', function (e) {
                        let parent = $(this).parents('.accordion-item');
                        parent.toggleClass('active');
                        parent.siblings().removeClass('active');
                        gsap.to('.prod-uc-thumb-img', {
                            autoAlpha: 0, duration: 0.3, onComplete: () => {
                                $('.prod-uc-thumb-img img').attr('src', parent.find('[data-content="image"]').attr('src'));
                            }
                        });
                        ScrollTrigger.refresh();

                        gsap.to('.prod-uc-thumb-img', { autoAlpha: 1, duration: 0.3, delay: .3 });
                    })
                }
                scUseCase();
            },
            beforeLeave() {
                // $('input[type="radio"][name="Product"]').prop('checked', false);
            }
        },
        comparison: {
            namespace: 'comparison',
            afterEnter() {
                function scHero() {
                    let heroTitle = splitTextFadeUpSetup('.comp-hero-title');
                    let heroDesc = splitTextFadeUpSetup('.comp-hero-desc');

                    let tl = gsap.timeline({
                        delay: GLOBAL_DELAY,
                        defaults: { ease: 'power2.out' },
                        onComplete: () => {
                            heroTitle.revert();
                            heroDesc.revert();
                        }
                    })

                    tl
                        .from('.comp-hero-thumb-logo', { autoAlpha: 0, x: 15, duration: .8, clearProps: 'all' })
                        .from('.comp-hero-thumb-sub-wrap', { autoAlpha: 0,  x: -15, duration: .8, clearProps: 'all' }, "<=0")
                        .from('.comp-hero-thumb-div', { autoAlpha: 0, scale: 1.2, duration: .8, clearProps: 'all' }, "<=.1")
                        .to(heroTitle.words, { yPercent: 0, autoAlpha: 1, duration: .8, stagger: .04 }, "<=.1")
                        .to(heroDesc.words, { yPercent: 0, autoAlpha: 1, duration: .5, stagger: .02 }, "<=.1")
                        .from('.comp-hero-btn .btn', { autoAlpha: 0, y: 20, duration: 1, stagger:  .1, clearProps: 'all' }, "<=.1")
                }
                scHero();
                function scCompare() {
                    let compareItem = $('.comp-fea-item').eq(0).clone();
                    let compareData = $('.comp-fea-body-content p');
                    $('.comp-fea-body').html('');

                    compareData.each((i, p) => {
                        const text = p.textContent.trim();
                        const [title, first, second] = text.match(/^(.*)\s\[(.*?)\]\s\[(.*?)\]$/).slice(1);
                        let parent = childSelect(compareItem.clone());
                        parent('.comp-fea-item-title').text(title.trim());
                        parent('[data-compare-value]').eq(0).attr('data-compare-value', first);
                        parent('[data-compare-value]').eq(1).attr('data-compare-value', second);
                        $('.comp-fea-body').append(parent);
                    });
                }
                scCompare();

                function scFAQ() {
                    $('.accordion-item').eq(0).addClass('active');

                    $('.accordion-title').on('click', function (e) {
                        let parent = $(this).closest('.accordion-item');
                        parent.toggleClass('active');
                        $('.accordion-item').not(parent).removeClass('active');
                    })
                }
                scFAQ();

            }
        },
        blog: {
            namespace: 'blog',
            afterEnter() {
                function scHero() {
                    let heroTitle = splitTextFadeUpSetup('.ar-hero-title');
                    let heroSub = $('.ar-hero-sub').text().length !== 0 ? splitTextFadeUpSetup('.ar-hero-sub') : [];

                    gsap.set('.ar-content-thumb', { clipPath: 'inset(20%)' });
                    gsap.set('.ar-content-thumb img', { scale: 1.4, autoAlpha: 0 });
                    gsap.set('.ar-content-cta', { autoAlpha: 0, y: 50 });

                    let tl = gsap.timeline({
                        delay: GLOBAL_DELAY,
                        defaults: { ease: 'power2.out' },
                        once: true,
                        onComplete: () => {
                            heroTitle.revert();
                            heroSub.length !== 0 && heroSub.revert();
                        }
                    })

                    tl
                        .to(heroTitle.words, { yPercent: 0, autoAlpha: 1, duration: .8, stagger: .04 })
                        .to('.ar-content-thumb', { clipPath: 'inset(0%)', duration: 1.5, ease: 'expo.out' }, "<=.1")
                        .to('.ar-content-thumb img', { scale: 1, autoAlpha: 1, duration: 1.5, ease: 'expo.out', clearProps: 'all' }, "<=0")
                        .to('.ar-content-cta', { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out' }, "<=0")
                    heroSub.length !== 0 && tl.to(heroSub.words, { yPercent: 0, autoAlpha: 1, duration: .5, stagger: .02 }, "<=.1")

                }
                scHero();

                function scContent() {
                    $('.ar-content-inner a').each(function (_, el) {
                        if ($(el).attr('href').includes('#popup')) {
                            let isDownload = $(el).attr('href').includes('download');
                            let uid = isDownload ? $(el).attr('href').split('popup-download-')[1] : 0;
                            let popup = isDownload ? 'popup-download' : $(el).attr('href').split('#')[1];

                            $(el).replaceWith(function () {
                                return $('<button />', {
                                    html: $(this).html(),
                                    class: $(this).attr('class'),
                                    [`data-${popup}`]: 'open',
                                    ...(uid !== 0 && { 'data-uid': uid })
                                });
                            });
                        }
                        if ($(el).attr('href').includes('/schedule-demo')) {
                            $(el).parent().attr({
                                'data-gtm-medium': 'image cta',
                                'data-gtm-section': 'content',
                                'data-gtm-page': gtm_page
                            })
                        }
                    });

                    function socialShare() {
                        const url = window.location.href;
                        $('.ar-content-share-ic-link').each((_, icon) => {
                            icon.setAttribute('target', '_blank');
                            switch (icon.getAttribute('data-share')) {
                                case 'linkedin': icon.setAttribute('href', `https://www.linkedin.com/sharing/share-offsite/?url=${url}`); break;
                                case 'facebook': icon.setAttribute('href', `https://www.facebook.com/sharer/sharer.php?u=${url}`); break;
                                case 'twitter': icon.setAttribute('href', `https://twitter.com/intent/tweet?url=${url}`); break;
                                case 'copy': break;
                                default: break;
                            }
                        });

                        $('[data-share="copy"]').on('click', function (e) {
                            e.preventDefault();
                            copyTextToClipboard(url);
                        })
                    }
                    socialShare();

                    function copyTextToClipboard(text) {
                        let textArea = document.createElement('textarea');
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
                        document.body.removeChild(textArea);

                        $('.ar-content-share-popup').addClass('active');
                        setTimeout(() => {
                            $('.ar-content-share-popup').removeClass('active');
                        }, 2000);
                    }
                }
                scContent();

                function scRelated() {
                    const parent = childSelect('.ar-related-content');

                    if (viewport.w <= 767) {
                        swiper.initClassName(parent);
                        swiper.setup(parent, { spacing: cvUnit(20, 'rem'), pag: true });
                    }
                }
                scRelated();
            }
        },
        story: {
            namespace: 'story',
            afterEnter() {
                function scHero() {
                    let heroTitle = splitTextFadeUpSetup('.story-hero-title');
                    let heroFeedbackContent = splitTextFadeUpSetup('.story-hero-feedback-content');
                    let heroFeedbackAuthor = splitTextFadeUpSetup('.story-hero-feedback-author');

                    gsap.set('.story-content-thumb', { clipPath: 'inset(20%)' });
                    gsap.set('.story-content-thumb img', { scale: 1.4, autoAlpha: 0 });

                    let tl = gsap.timeline({
                        delay: GLOBAL_DELAY,
                        defaults: { ease: 'power2.out' },
                        onComplete: () => {
                            heroTitle.revert();
                            heroFeedbackContent.revert();
                            heroFeedbackAuthor.revert();
                            gsap.set('.story-hero-title, .story-hero-feedback-content, .story-hero-feedback-author', { clearProps: 'all' });
                        }
                    })

                    tl
                        .to(heroTitle.words, { yPercent: 0, duration: .8, stagger: .04 })
                        .to(heroFeedbackContent.words, { yPercent: 0, duration: .5, stagger: .02 }, "<=.1")
                        .to(heroFeedbackAuthor.words, { yPercent: 0, duration: .5, stagger: .02 }, "<=.1")
                        .to('.story-content-thumb', { clipPath: 'inset(0%)', duration: 1.5, ease: 'expo.out' }, "<=.1")
                        .to('.story-content-thumb img', { scale: 1, autoAlpha: 1, duration: 1.5, ease: 'expo.out', clearProps: 'all' }, "<=0")
                }
                scHero();

                function scContent() {
                    function socialShare() {
                        const url = window.location.href;
                        $('.story-content-share-ic-link').each((_, icon) => {
                            icon.setAttribute('target', '_blank');
                            switch (icon.getAttribute('data-share')) {
                                case 'linkedin': icon.setAttribute('href', `https://www.linkedin.com/sharing/share-offsite/?url=${url}`); break;
                                case 'facebook': icon.setAttribute('href', `https://www.facebook.com/sharer/sharer.php?u=${url}`); break;
                                case 'twitter': icon.setAttribute('href', `https://twitter.com/intent/tweet?url=${url}`); break;
                                case 'copy': break;
                                default: break;
                            }
                        });

                        $('[data-share="copy"]').on('click', function (e) {
                            e.preventDefault();
                            copyTextToClipboard(url);
                        })
                    }
                    socialShare();

                    function copyTextToClipboard(text) {
                        let textArea = document.createElement('textarea');
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
                        document.body.removeChild(textArea);

                        $('.story-content-share-popup').addClass('active');
                        setTimeout(() => {
                            $('.story-content-share-popup').removeClass('active');
                        }, 2000);
                    }
                }
                scContent();
            }
        },
        schedule: {
            namespace: 'schedule',
            afterEnter() {
                function marqueeLogo() {
                    const cloneAmount = 2;
                    new Array(cloneAmount).fill().forEach((_, index) => {
                        let itemClone = $('.schedule-hero-client-cms-list').clone();
                        $('.schedule-hero-client-cms').append(itemClone);
                    })
                    $('.schedule-hero-client-cms-list').addClass('animMarquee')
                }
                marqueeLogo();
            }
        },
        contact: {
            namespace: 'contact',
            afterEnter() {
                function contactHero() {
                    let heroTitle = splitTextFadeUpSetup('.contact-form-title');
                    let heroSub = splitTextFadeUpSetup('.contact-form-sub');
                    gsap.set('.form-inner', { autoAlpha: 0, y: 60 });
                    let tl = gsap.timeline({
                        defaults: { ease: 'power2.out' },
                        onComplete: () => {
                            heroTitle.revert();
                            heroSub.revert();
                            gsap.set('.contact-form-title, .contact-form-sub', { clearProps: 'all' });
                            gsap.set('.form-inner', { clearProps: 'all' });
                        }
                    })

                    tl
                        .to(heroTitle.words, { yPercent: 0, autoAlpha: 1, duration: .8, stagger: .025 })
                        .to(heroSub.words, { yPercent: 0, autoAlpha: 1, duration: .5, stagger: .015 }, "<=.1")
                        .to('.form-inner', { autoAlpha: 1, y: 0, duration: 1 }, "<=.3")
                    
                    let tlItem = gsap.timeline({
                        defaults: { ease: 'power2.out' },
                        onComplete: () => {
                            gsap.set('.contact-form-thumb-label, .contact-form-thumb-val', { clearProps: 'all' });
                        }
                    })
                    $('.contact-form-thumb-info').each((_, item) => {
                        let labelItem = splitTextFadeUpSetup($(item).find('.contact-form-thumb-label'))
                        let valItem = splitTextFadeUpSetup($(item).find('.contact-form-thumb-val'))
                        tlItem
                            .to(labelItem.words, { yPercent: 0, autoAlpha: 1, duration: .6, stagger: .015 }, '<=.1')
                            .to(valItem.words, { yPercent: 0, autoAlpha: 1, duration: .8, stagger: .025 }, "<=.2")
                    })
                }
                contactHero();
            }
        }
    }
    const enterTransition = (data) => {
        const nextContainer = data.next.container;
        const currentContainer = data.current.container;

        const tlEnter = gsap.timeline({
            defaults: {
                duration: 0.65,
                ease: 'power2.inOut'
            },
            onComplete: () => {
                lenis.start();
            }
        });

        // tlEnter.to(".loading-item", {
        //     yPercent: 100,
        //     stagger: 0.2,
        //     duration: 0.8,
        //     ease: "easeInOut",
        //     onComplete: () => {
        //         pointerEvents: "auto";
        //     },
        // });
        return tlEnter;
    }


    const leaveTransition = (data) => {
        const nextContainer = data.next.container;
        const currentContainer = data.current.container;

        const tlLeave = gsap.timeline({
            defaults: {
                duration: 0.65,
                ease: 'power2.inOut'
            },
            onStart: () => {
                updateBeforeTrans(data);
            }
        });

        tlLeave.set(".loading-item", {
            yPercent: 100,
            autoAlpha: 1,
            pointerEvents: "none",
        }).to(".loading-item", {
            yPercent: 0,
            stagger: 0.2,
            duration: 0.5,
            ease: "easeInOut",
            onComplete: () => {
                updateAfterTrans(data);
                setTimeout(() => {
                    HEADER.toggleHide(lenis);
                    HEADER.toggleScroll(lenis);
                }, 300);
            }
        });
        return tlLeave;
    }

    function updateBeforeTrans(data) {
        if (data.current.container) {
            $(data.current.container).css('z-index', 2)
        }
    }

    const updateAfterTrans = (data) => {
        if (data.current.container) {
            ScrollTrigger.getAll().filter(trigger => data.current.container.contains(trigger.trigger)).forEach(trigger => trigger.kill());
            data.current.container.remove()
        }
        scrollTop()
        resetScroll();
        getAllScrollTrigger("refresh");

        gsap.timeline({
            scrollTrigger: {
                trigger: '.footer',
                start: 'top bottom+=100vh',
                once: true,
                scrub: false,
            }
        })
        reinitializeWebflow();
        HEADER.toggleHide(lenis);
        HEADER.toggleScroll(lenis);
        HEADER.swapMode();
        setTimeout(updateCurrentNav, 500);
        $('.header__link:has(.header__dropdown)').removeClass('active');
        $('.header').removeClass('open-nav')
        $('.header__hamburger').removeClass('active');
    }

    const initOnce = (data) => {
        HEADER.toggleHide(lenis);
        HEADER.toggleScroll(lenis);
        $('[data-cp-year]').text(new Date().getFullYear())

        resetScroll();
        updateCurrentNav();
        HEADER.swapMode();
        refreshOnBreakpoint();
        setTimeout(() => {
            initAllForm();
            initAllPopup();
            gsap.to('.loading', { opacity: 0, duration: 0.3, onComplete: () => setTimeout(() => {$('.loading').remove()}, 1000)});
            $('[data-init-hidden]').removeAttr('data-init-hidden');
        }, 500);
        if (viewport.w > 767) {
            setTimeout(initAnimation, 500);
            documentHeightObserver('init');
            animFooter();
        }
    }

    const VIEWS = Object.values(SCRIPTS);

    const initScriptPage = () => {
        const dataNamespace = $('[data-barba-namespace]').attr('data-barba-namespace');
        VIEWS.forEach(page => {
            if (dataNamespace == page.namespace) {
                page.afterEnter();
            }
        });
    }

    initOnce();
    initScriptPage();

    // barba.init({
    //     debug: true,
    //     timeout: 5000,
    //     preventRunning: true,
    //     transitions: [{
    //         name: 'default-transition',
    //         sync: true,
    //         once(data) {
    //             console.log('once global')
    //             initOnce();
    //         },
    //         enter(data) {
    //             console.log('enter global')
    //         },
    //         after(data) {
    //             console.log('after global')
    //         },
    //         afterEnter(data) {
    //             setTimeout(() => {
    //                 $('[data-init-hidden]').removeAttr('data-init-hidden');
    //             }, 1000);
    //             setTimeout(initAllPopup, 500);
    //             if (viewport.w > 767) {
    //                 initAnimation();
    //             }
    //         },
    //         beforeLeave({ current }) {
    //             console.log('before leave global')
    //         },
    //         leave(data) {
    //             console.log('leave global')
    //             // await leaveTransition(data).then(() => {
    //             //     enterTransition(data);
    //             // });
    //             updateAfterTrans(data);
    //             setTimeout(() => {
    //                 HEADER.toggleHide(lenis);
    //                 HEADER.toggleScroll(lenis);
    //             }, 300);
    //         },
    //         afterLeave(data) {
    //             console.log('after leave global')
    //         }
    //     }],
    //     views: VIEWS
    // })
}
export default mainScript;
