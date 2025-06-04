const Script = () => {
    $('.loader-wrap').removeClass('on-edit')
    //Common vars
    var shipX;
    var starfield;
    CustomEase.create("slowMoIn", "M0,0 C0,0 0.065,0.464 0.096,0.618 0.096,0.618 0.096,0.618 0.096,0.618 0.096,0.618 0.096,0.618 0.096,0.618 0.104,0.66 0.124,0.751 0.156,0.781 0.189,0.813 0.285,0.832 0.33,0.844 0.496,0.887 0.864,0.96 1,1 ")
    CustomEase.create("slowMoOut", "M0,0 C0.118,0.034 0.6,0.157 0.8,0.213 0.81,0.216 0.831,0.226 0.84,0.235 0.85,0.245 0.864,0.27 0.87,0.284 0.876,0.3 0.886,0.334 0.89,0.352 0.919,0.513 1,1 1,1 ")
    // Ultilities
    function shareMedia() {
        let currLocation = window.location.href;

        //$(`[href="#twitter"]`).attr('href', `https://twitter.com/share?url=${currLocation}`)
        $(`[href="#linkedin"]`).attr('href', `https://www.linkedin.com/sharing/share-offsite/?url=${currLocation}`)
        $(`[href="#facebook"]`).attr('href', `https://www.facebook.com/sharer/sharer.php?u=${currLocation}`)
        $('[href="#url"]').on('click', function (e) {
            e.preventDefault();
            let path = window.location.href;
            copyClipboard(path);
        })
    }
    function copyClipboard(path) {
        navigator.clipboard.writeText(path)
        createFloat("URL copied to clipboard")
    }
    function createFloat(content = '', dur = 3000, type = 'mess') {
        if (type == 'mess') {
            $('.float-copy .floating-mess').text(content);
            $('.floating-container.float-copy').addClass('show');
        } else if (type == 'job') {
            $('.floating-container.float-job').addClass('show');
        } else if (type == 'contact') {
            $('.floating-container.float-contact').addClass('show');
        }
        const removeFunc = setTimeout(function () {
            $('.floating-container').removeClass('show');
        }, dur);
        $('.float-ic-close-wrap').on('click', function (e) {
            $('.floating-container').removeClass('show');
        })
    }

    gsap.registerPlugin(ScrollTrigger);

    let scrollmain;
    let doneMainAnim = false;

    const body = document.body;
    const select = (e) => document.querySelector(e);
    const selectAll = (e) => document.querySelectorAll(e);

    initPageTransitions();

    function initLoader() {
        console.log('load - basic');

        const iconPaths = $('.loader-logo-icon path')
        const typePaths = $('.loader-logo-type path')
        const tlLoaderHome = new gsap.timeline({
            delay: .4,
            onComplete: () => {
                $('.loader-wrap').remove();
            }
        })
        tlLoaderHome
            .set(iconPaths, { drawSVG: '0%' })
            .set(typePaths, { drawSVG: '0%' })
            .to(iconPaths, { drawSVG: "100%", duration: .8, stroke: "#909090", strokeWidth: .8, stagger: .04 })
            .to(iconPaths, { stroke: "transparent", duration: .8, stagger: .04, fillOpacity: 1 }, '>=-.6')
            .to(typePaths, { drawSVG: "100%", duration: .8, stroke: "#909090", strokeWidth: .8, stagger: .04 }, '0')
            .to(typePaths, { stroke: "transparent", duration: .8, stagger: .04, fillOpacity: 1 }, '>=-.6')
            .to('.loader-wrap', { xPercent: -100, duration: .8 }, '>')
            .to('.loader-inner', { xPercent: 100, duration: .8, autoAlpha: 0 }, '<=0')
    }

    function initLoaderHome() {
        console.log('load - home');
        const iconPaths = $('.loader-logo-icon path')
        const typePaths = $('.loader-logo-type path')
        const tlLoaderHome = new gsap.timeline({
            delay: .4,
            onStart: () => {
                gsap.set('.home-ship-scale', { autoAlpha: 0 })
            },
            onComplete: () => {
                $('.loader-wrap').remove();
                gsap.fromTo('.home-ship-scale', { scale: 2, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1, ease: Power3.easeOut, overwrite: true });
            }
        })
        tlLoaderHome
            .set(iconPaths, { drawSVG: '0%' })
            .set(typePaths, { drawSVG: '0%' })
            .to(iconPaths, { drawSVG: "100%", duration: .8, stroke: "#909090", strokeWidth: .8, stagger: .04 })
            .to(iconPaths, { stroke: "transparent", duration: .8, stagger: .04, fillOpacity: 1 }, '>=-.6')
            .to(typePaths, { drawSVG: "100%", duration: .8, stroke: "#909090", strokeWidth: .8, stagger: .04 }, '0')
            .to(typePaths, { stroke: "transparent", duration: .8, stagger: .04, fillOpacity: 1 }, '>=-.6')
            .to('.loader-wrap', { xPercent: -100, duration: .8 }, '>')
            .to('.loader-inner', { xPercent: 100, duration: .8, autoAlpha: 0 }, '<=0')
    }

    function pageTransitionIn(data) {
        console.log('trans - in');
        const currentContainer = data.current.container;
        const tlTransIn = new gsap.timeline({
            onStart: () => {
                if ($('html').get(0).classList.contains('has-scroll-smooth')) {
                    scrollmain.stop();
                } else {
                    $('body').addClass('stop-scroll')
                }
                $('.trans-wrap').addClass('transitioning')
                $('.trans-ship-bub, .trans-ship-heat, .trans-lights, .trans-ship-glow').addClass('anim')
                $('.header').addClass('header-mustbe-hidden');
            }
        });
        tlTransIn
            .set('.trans-bg', { xPercent: 100, overwrite: true })
            .set('.trans-ship-wrap', { xPercent: 20, autoAlpha: 0, overwrite: true })

            .to(currentContainer, { autoAlpha: 0, duration: .8 })
            .to('.home-hero-bg', { autoAlpha: 0, duration: .8 }, '<')
            .fromTo('.trans-bg', { xPercent: 100 }, { xPercent: 0, duration: 1 }, '0')
            .fromTo('.trans-ship-wrap',
                { xPercent: 40, autoAlpha: 1 },
                { xPercent: 0, autoAlpha: 1, duration: .8, ease: 'slowMoIn' }, '.2')
            .fromTo('.trans-lights-wrap',
                { xPercent: -30, autoAlpha: 1 },
                { xPercent: 0, autoAlpha: 1, duration: .8, ease: 'slowMoIn' }, '<')
        return tlTransIn;
    }

    function pageTransitionOut(data) {
        // Setup
        console.log('trans - out');
        const nextContainer = data.next.container;
        const tlTransOut = new gsap.timeline({
            onStart: () => {
                if (data.next.namespace == 'home') {
                    if ($('html').get(0).classList.contains('has-scroll-smooth')) {
                        scrollmain.stop();
                    } else {
                        $('body').addClass('stop-scroll')
                    }
                } else {
                    if ($('html').get(0).classList.contains('has-scroll-smooth')) {
                        scrollmain.start();
                    } else {
                        $('body').removeClass('stop-scroll')
                    }
                }
            },
            onComplete: () => {
                $('.header').removeClass('header-mustbe-hidden');
                $('.header').removeClass('header-hidden');
                $('.trans-wrap').removeClass('transitioning')
                $('.trans-ship-bub, .trans-ship-heat, .trans-lights, .trans-ship-glow').removeClass('anim');
                if (!data.next.namespace == 'home') {
                    if ($('html').get(0).classList.contains('has-scroll-smooth')) {
                        scrollmain.start();
                    } else {
                        $('body').removeClass('stop-scroll')
                    }
                }
            }
        });

        tlTransOut
            .fromTo('.trans-ship-wrap',
                { xPercent: 0, autoAlpha: 1 },
                { xPercent: -40, autoAlpha: 0, duration: .8, ease: 'slowMoOut' })
            .fromTo('.trans-lights-wrap',
                { xPercent: 0, autoAlpha: 1 },
                { xPercent: 30, autoAlpha: 0, duration: .8, ease: 'slowMoOut' }, '<')
            .fromTo('.trans-bg', { xPercent: 0 }, { xPercent: -100, duration: .8 }, '>')
            .from(nextContainer, { opacity: 0, duration: .8 }, '.8')
        if (data.next.namespace == 'home') {
            tlTransOut.to('.home-hero-bg', { autoAlpha: 1, duration: 1 }, '0.8');
            tlTransOut.from('.home-ship-scale', { scale: 2, autoAlpha: 0, duration: 1.4, ease: 'slowMoIn' }, '1');
        }
        // Trans out

        return tlTransOut;
    }

    function initPageTransitions() {
        // do something before the transition starts
        console.log('init barba');

        barba.hooks.before(() => {
            select('html').classList.add('is-transitioning');
        })

        // do somthing after the transition finishes
        barba.hooks.after(() => {
            select('html').classList.remove('is-transitioning');
            //scrollmain.init();
            onScroll();
        })

        //scroll to the top of the page
        barba.hooks.enter(() => {
            //scrollmain.destroy();
        })

        //scroll to the top of the page
        barba.hooks.afterEnter(() => {
            window.scrollTo(0, 0);
            buttonHover();
        })

        barba.init({
            sync: true,
            debug: false,
            timeout: 7000,
            transitions: [{
                name: 'default',
                once(data) {
                    // do something once on the initial page load
                    firstSetup();
                    detectLinks(data.next.namespace);
                    initSmoothScroll(data.next.container);
                    onScroll();
                    initScript(data.next.namespace);
                    initLoader();
                    backToTop();
                },
                async leave(data) {
                    // Reset event
                    ResetBeforeTrans();
                    // animate loading screen in
                    const done = this.async();
                    const tlIn = pageTransitionIn(data);
                    tlIn.then(() => {
                        done();
                    })
                    //data.current.container.remove();
                },
                async enter(data) {
                    const tlOut = pageTransitionOut(data);
                    tlOut.then(() => {
                        console.log('done out')
                        SetupAfterTrans(data);
                        detectLinks(data.next.namespace);
                    })
                },
                async beforeEnter(data) {
                    ScrollTrigger.getAll().forEach(t => t.kill());
                    //scrollmain.destroy();
                    initSmoothScroll(data.next.container);
                    initScript(data.next.namespace);
                }
            },
            {
                name: 'to-home',
                from: {
                },
                to: {
                    namespace: ['home']
                },
                async once(data) {
                    // do something once on the initial page load
                    console.log('to home load')
                    firstSetup();
                    detectLinks(data.next.namespace);
                    initSmoothScroll(data.next.container);
                    onScroll();
                    initScript(data.next.namespace);
                    initLoaderHome();
                    backToTop();
                }
            }]
        });

        function initSmoothScroll(container) {
            console.log('init scroll')
            console.log(scrollmain);
            if (scrollmain) {
                //scrollmain.destroy();
                //scrollmain.off('scroll')
            }
            scrollmain = new LocomotiveScroll({
                el: container.querySelector('[data-scroll-container]'),
                smooth: true,
                getDirection: true,
                resetNativeScroll: false,
                tablet: {
                    breakpoints: 768,
                    smooth: false,
                },
                smartphone: {
                    smooth: false,
                }
            });

            window.onresize = scrollmain.update();

            scrollmain.on('scroll', () => ScrollTrigger.update());

            ScrollTrigger.scrollerProxy('[data-scroll-container]', {
                scrollTop(value) {
                    return arguments.length ? scrollmain.scrollTo(value, 0, 0) : scrollmain.scroll.instance.scroll.y;
                }, // we don't have to define a scrollLeft because we're only scrolling vertically.
                getBoundingClientRect() {
                    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
                },
                // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
                pinType: container.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
            });

            if ($('html').get(0).classList.contains('has-scroll-smooth')) {
                ScrollTrigger.defaults({
                    scroller: document.querySelector('[data-scroll-container]'),
                });
            }

            // Remove Old Locomotive Scrollbar

            const scrollbar = selectAll('.c-scrollbar');

            if (scrollbar.length > 1) {
                scrollbar[0].remove();
            }

            // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
            ScrollTrigger.addEventListener('refresh', () => scrollmain.update());

            // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
            ScrollTrigger.refresh();
        }
    }

    function firstSetup() {
        $('.floating-wrap').css('z-index', '999');
        gsap.set('.trans-bg', { xPercent: 100, overwrite: true })
        gsap.set('.trans-ship-wrap', { xPercent: 20, autoAlpha: 0, overwrite: true })
    }
    function ResetBeforeTrans() {
        console.log('reset')
        $(window).off('pointermove');
        offScroll();
        doneMainAnim = false;
        $('.menu-toggle').removeClass('active');
        $('.nav').removeClass('active');
        $('.popup-wrap').removeClass('show');
        console.log('reset')
        window.fsAttributes = null;
        console.log(window.fsAttributes)
        $('.floating-container').removeClass('show');
    }
    function SetupAfterTrans(data) {
        backToTop();
        onScroll();
        if ($('.homepage').length) {
            $('.home-hero-bg').removeClass('hidden');
            if ($('html').get(0).classList.contains('has-scroll-smooth')) {
                scrollmain.stop();
            } else {
                $('body').addClass('stop-scroll')
            }
        } else {
            $('.home-hero-bg').addClass('hidden');
            if ($('html').get(0).classList.contains('has-scroll-smooth')) {
                scrollmain.start();
            } else {
                $('body').removeClass('stop-scroll')
            }
        }
    }

    // Conmmon scripts
    function onScroll() {
        console.log('onscroll event')
        scrollmain.on('scroll', onScrollFunc)
    }
    function offScroll() {
        scrollmain.off('scroll', onScrollFunc)
    }
    function onScrollFunc(inst) {
        if ($('html').get(0).classList.contains('has-scroll-smooth')) {
            window.pageYOffset = inst.scroll.y;
        }
        if (doneMainAnim) {
            if (inst.scroll.y <= $(window).height() * 7 / 10) {
                $('.bh-hole-ship-wrap, .embed-home-hole-vid video, .starfall-wrap').addClass('hiddenForNow')
                $('.home-ship-wrap').removeClass('hiddenForNow')
            } else {
                $('.bh-hole-ship-wrap, .embed-home-hole-vid video, .starfall-wrap').removeClass('hiddenForNow')
                $('.home-ship-wrap').addClass('hiddenForNow')
            }
        }
        if (inst.scroll.y > $('.header').height()) {
            $('.header').addClass('header-scroll')
        } else {
            $('.header').removeClass('header-scroll')
        }
        if (inst.direction == 'down') {
            $('.header').addClass('header-hidden')
        } else if (inst.direction == 'up') {
            if ($('.homepage').length) {
                if (inst.scroll.y <= 0) {
                    if ($('html').get(0).classList.contains('has-scroll-smooth')) {
                        scrollmain.stop();
                    } else {
                        $('body').addClass('stop-scroll')
                    }
                    doneMainAnim = false;
                }
            }
            $('.header').removeClass('header-hidden')
        }
    }
    // Fire all scripts on page load

    function initScript(pageName) {
        console.log('init script');

        $('html').imagesLoaded(function () {
            console.log('DONE  - all images have been successfully loaded');
            scrollmain.update()
            if (pageName == 'careers') {
                if (window.location.hash == '#careerJob') {
                    console.log('aloha')
                    scrollmain.scrollTo('#careerJob', {
                        duration: 100
                    });
                }
            }
        });
        // setInterval(() => {
        //     scrollmain.update();
        // }, 3000);

        const SCRIPT = {};
        SCRIPT.homeScript = function () {
            console.log('welcome home');
            initWebGl();
            HomeHeroInt();
            starFall();
            if ($(window).width() > 768) {
                homeShipFollow();
            }
            homeScrollTrigger();
            homeAnimLoop();
            homeSwiper();
            hoverHomeNews();
            scrollNext();
        };

        SCRIPT.aboutScript = function () {
            console.log('welcome about');
            //hoverFounder();
            hoverValue();
            handlePopup();
            if ($(window).width() > 991) {
                stickyCenter('.abt-value-wrapper', '.abt-value-content', '7.5rem')
            }
            if ($(window).width() < 768) {
                aboutSwiper();
            } else {
                aboutScrollTrigger();
            }
        };

        SCRIPT.blogsScript = function () {
            console.log('welcome blogs');
            blogPaginationFilter();
            blogFeature();
        };

        SCRIPT.blogdetailScript = function () {
            console.log('welcome blog detail');
            shareMedia();
            relatedBlog();
        };

        SCRIPT.careersScript = function () {
            console.log('welcome careers');
            careerInteraction();
            if ($(window).width() > 991) {
                stickyCenter('.career-rs-title-2-wrap', '.career-rs-content-2', '7.5rem')
            }
            if ($(window).width() < 768) {
                careersSwiper();
            }
            marqueeTeam()
        };

        SCRIPT.jobScript = function () {
            console.log('welcome job');
            jobInteraction();
            handleFormJob();
        };

        SCRIPT.notfoundScript = function () {
            console.log("Look like you're lost");
            notfoundLoop();
        };

        SCRIPT.contactScript = function () {
            console.log("welcome contact");
            handleFormContact();
            starFall();
        };

        if (pageName) {
            SCRIPT[`${pageName}Script`]();
        }

    }
    handleNav();
    //Common
    function backToTop() {
        $('.ft-backtotop').on('click', function (e) {
            e.preventDefault();
            if ($('html').get(0).classList.contains('has-scroll-smooth')) {
                scrollmain.scrollTo(0, { duration: 1000, disableLerp: false })
                if ($('.homepage').length) {
                    scrollmain.stop()
                    // setTimeout(() => {
                    //     scrollmain.update();
                    //     //scrollmain.start()
                    // }, 1000);
                    console.log("backtotop")
                }
            } else {
                window.scrollTo(0, 0);
            };
        })
    }
    function stickyCenter(parent, child, offset) {
        let stickyEleHeight = $(child).height();
        $(parent).css({
            'margin-top': `calc((-100vh + ${stickyEleHeight}px) / 2)`,
            'margin-bottom': `calc((100vh - ${stickyEleHeight}px) / 2 + ${offset})`,
            'padding-top': `calc((100vh - ${stickyEleHeight}px) / 2)`
        })
    }
    function clearActive() {
        $('[data-link]').removeClass('active');
        $('[data-link]').attr('style', '')
    }
    function detectLinks(curPage) {
        clearActive();
        $(`[data-link="${curPage}"]`).addClass('active');
        if (curPage == 'blogdetail') {
            $('[data-link="blogs"').addClass('active');
            $('[data-link="blogs"').css('pointer-events', 'auto')
        } else if (curPage == 'job') {
            $('[data-link="careers"').addClass('active')
            $('[data-link="careers"').css('pointer-events', 'auto')
        }
    }
    function getTeamData(e) {
        let teamImg = $(e).find('.abt-team-img-main').attr('src');
        let teamName = $(e).find('.abt-team-item-name').text();
        let teamTitle = $(e).find('.abt-team-item-title').text();
        let teamAbout = $(e).next('.richtext-hidden').html();

        $('.popup-right-inner img').attr('src', teamImg);
        $('.popup-main-name').text(teamName)
        $('.popup-main-job').text(teamTitle)
        $('.popup-main-content-txt').html(teamAbout)
    }
    function handlePopup() {
        $('[data-popup]').on('click', function () {
            console.log('click')
            let value = $(this).attr('data-popup');
            if (value == 'open') {
                getTeamData($(this))
                setTimeout(() => {
                    $('.popup-wrap').addClass('show');
                    if ($('html').get(0).classList.contains('has-scroll-smooth')) {
                        scrollmain.stop();
                    } else {
                        $('body').addClass('stop-scroll')
                    }
                }, 200);
            } else if (value == 'close') {
                $('.popup-wrap').removeClass('show');
                document.querySelector('.popup-main-content').scrollTop = 0;
                if ($('html').get(0).classList.contains('has-scroll-smooth')) {
                    scrollmain.start();
                } else {
                    $('body').removeClass('stop-scroll')
                }
            }
        });
    }
    function initWebGl() {
        if ($('.homepage').length) {
            $('.home-hero-bg').removeClass('hidden')
        } else {
            $('.home-hero-bg').addClass('hidden')
        }
        let webglOpts;
        if ($(window).width() > 768) {
            webglOpts = {
                starCount: 1500,
                follow: true
            }
        } else {
            webglOpts = {
                starCount: 300,
                follow: false
            }
        }
        starfield = new WebGLBackground({
            canvas: document.querySelector('#starfield'),
            button: document.querySelector('.webgl-center'),
            backgroundColor: "#020518",
            followButton: webglOpts.follow,
            starCount: webglOpts.starCount,
            starsScrollRange: [0, $('.home-hero-bg').height() * 2 / 3],
            cloudsScrollRange: [0, $('.home-hero-bg').height() * 2 / 3 - 200],
            idleIntensity: .1,
            clickIntensity: .1,
            buttonIntensity: .1,
        });


    };
    function buttonHover() {
        const createSVG = (width, height, radius) => {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            const rectangle = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "rect"
            );

            svg.setAttributeNS(
                "http://www.w3.org/2000/svg",
                "viewBox",
                `0 0 ${width} ${height}`
            );

            rectangle.setAttribute("x", "0");
            rectangle.setAttribute("y", "0");
            rectangle.setAttribute("width", "100%");
            rectangle.setAttribute("height", "100%");
            rectangle.setAttribute("rx", `${radius}`);
            rectangle.setAttribute("ry", `${radius}`);
            rectangle.setAttribute("pathLength", "10");

            svg.appendChild(rectangle);

            return svg;
        };

        document.querySelectorAll(".btn-primary").forEach((button) => {
            const style = getComputedStyle(button);

            const lines = document.createElement("div");

            lines.classList.add("lines");

            const groupTop = document.createElement("div");
            const groupBottom = document.createElement("div");

            const svg = createSVG(
                button.offsetWidth,
                button.offsetHeight,
                parseInt("30px", 10)
            );

            groupTop.appendChild(svg);
            groupTop.appendChild(svg.cloneNode(true));
            groupTop.appendChild(svg.cloneNode(true));
            groupTop.appendChild(svg.cloneNode(true));

            groupBottom.appendChild(svg.cloneNode(true));
            groupBottom.appendChild(svg.cloneNode(true));
            groupBottom.appendChild(svg.cloneNode(true));
            groupBottom.appendChild(svg.cloneNode(true));

            lines.appendChild(groupTop);
            lines.appendChild(groupBottom);

            button.appendChild(lines);

            button.addEventListener("pointerenter", () => {
                button.classList.add("start");
            });

            svg.addEventListener("animationend", () => {
                button.classList.remove("start");
            });
        });
    };

    function handleNav() {
        $('.menu-toggle').on('click', function (e) {
            e.preventDefault();
            $(this).toggleClass('active');
            $('.nav').toggleClass('active');
        })
    }
    //Home
    function HomeHeroInt() {
        if ($('html').get(0).classList.contains('has-scroll-smooth')) {
            scrollmain.scrollTo(0, { duration: 1000, disableLerp: true });
            scrollmain.stop();
        } else {
            window.scrollTo(0, 0);
            $('body').addClass('stop-scroll')
        }

        let animation;
        shipRayLoop();
        function shipRayLoop() {
            animation = gsap.timeline()
            let targets = document.querySelectorAll(".home-hero-ship-back-ray-item")
            let numberOfTargets = targets.length

            let duration = 2.8
            let pause = -2

            let stagger = .8
            let repeatDelay = (stagger * (numberOfTargets - 1)) + pause

            animation
                .from(targets, {
                    autoAlpha: .5, scale: 1, duration: duration, opacity: 0, stagger: {
                        each: stagger,
                        repeat: -1,
                        repeatDelay: repeatDelay
                    }
                })
                .to(targets, {
                    autoAlpha: 1, scale: 1.8, duration: duration, opacity: 0, stagger: {
                        each: stagger,
                        repeat: -1,
                        repeatDelay: repeatDelay
                    }
                }, stagger)
                .to(targets, {
                    autoAlpha: 0, scale: 1.8, duration: duration, opacity: 0, stagger: {
                        each: stagger,
                        repeat: -1,
                        repeatDelay: repeatDelay
                    }
                }, stagger * 2)
        }

        let homeHeroMainBtn;
        if ($(window).width() > 768) {
            homeHeroMainBtn = $('.home-hero-content .btn-primary')
        } else {
            homeHeroMainBtn = $('.sc-home-hero .btn-primary-ic')
        }
        setInterval(() => {
            if (!homeHeroMainBtn.hasClass('start')) {
                homeHeroMainBtn.addClass('start');
            }
        }, 3000);

        if ($(window).width() > 768) {
            homeHeroMainBtn.on('mouseenter', (e) => {
                e.preventDefault();
                starfield.app.idleIntensity = .4;
                starfield.app.buttonIntensity = .4;
                $('.home-ship-wrap').addClass('rumble')
                gsap.to(animation, { timeScale: 2, duration: .4 })
                gsap.to('body', { '--time': '0.4s', duration: .4 })
                $('.home-ship-img-back-li, .home-hero-ship-back-long-wrap').addClass('anim')
            });
            homeHeroMainBtn.on('mouseleave', (e) => {
                e.preventDefault();
                starfield.app.idleIntensity = .1;
                starfield.app.buttonIntensity = .1;
                $('.home-ship-wrap').removeClass('rumble')
                gsap.to(animation, { timeScale: 1, duration: .4 })
                gsap.to('body', { '--time': '1.8s', duration: .4 })
                $('.home-ship-img-back-li, .home-hero-ship-back-long-wrap').removeClass('anim')
            });
        }

        homeHeroMainBtn.on('click', (e) => {
            e.preventDefault();
            starfield.app.idleIntensity = 2;
            starfield.app.buttonIntensity = 2;

            const tlHomeHero1 = new gsap.timeline({
                onStart: () => {
                    $('.home-ship-wrap').removeClass('rumble')
                    $('.home-ship-wrap').addClass('anim')
                    $('.home-hero-btn-mb').addClass('hidden')
                    $('video').get(0).play();
                },
                onComplete: () => {
                    scrollmain.scrollTo('.sc-home-hole', { duration: 0, disableLerp: true })
                    animHomeHero2()
                    resetHomeHero();
                    $('.home-ship-wrap').removeClass('anim');
                    $('.home-hero-btn-mb').removeClass('hidden')
                }
            });

            let offsetX = (shipX / window.innerWidth / 2) * $('.home-ship').width() / 10;
            tlHomeHero1.to('.home-hero-content', { scale: 5, duration: 1, yPercent: -200, autoAlpha: 0, ease: 'slowMoOut' })
                .to('.home-ship', { scale: 0, duration: 1, yPercent: -100, autoAlpha: 0, xPercent: -offsetX, ease: 'slowMoOut', overwrite: true }, '0')
                .to('canvas', { autoAlpha: 0, duration: 1 }, '0.2')

            function animHomeHero2() {
                const tlHomeHero2 = new gsap.timeline({
                    onStart: () => {
                        //$('.bh-hold-ship-wrap img').addClass('anim');
                        $('.bh-hold-ship-wrap .trans-ship-heat').removeClass('idle');
                        $('.bh-hold-ship-wrap .trans-ship-heat').addClass('burst');
                        setTimeout(() => {
                            //$('.bh-hold-ship-wrap img').removeClass('anim');
                            $('.bh-hold-ship-wrap .trans-ship-heat').addClass('idle');
                            $('.bh-hold-ship-wrap .trans-ship-heat').removeClass('burst');
                            doneMainAnim = true;
                        }, 800)
                    },
                })
                tlHomeHero2
                    .set('.bh-hold-ship-wrap', { xPercent: 0, autoAlpha: 0, overwrite: true })
                    //.fromTo('.bh-hole-wrap', { autoAlpha: 0, duration: 1, delay: .2 }, { autoAlpha: 1 }, '0')
                    //.from('.bh-hole-img.lower, .bh-hole-img.upper', { scale: 0, autoAlpha: 0, duration: .6, ease: 'slowMoIn' }, '0')
                    .from('.embed-home-hole-vid', { scale: 0, autoAlpha: 0, duration: .6, ease: 'slowMoIn' }, '0')
                    .fromTo('.home-cols-wrap img', { yPercent: 10, autoAlpha: 0 }, {
                        yPercent: 0, autoAlpha: 1, duration: 2, ease: Power1.easeInOut, stagger: .04, onComplete: () => {
                            if ($('html').get(0).classList.contains('has-scroll-smooth')) {
                                scrollmain.start();
                            } else {
                                $('body').removeClass('stop-scroll')
                            }
                        }
                    }, '0')
                    .fromTo('.scroll-indicate', { autoAlpha: 0 }, { autoAlpha: 1, ease: Power1.easeInOut, duration: 1 }, '<')
                    .fromTo('.bh-hold-ship-wrap', { x: 0, autoAlpha: 0 }, { autoAlpha: 1, x: -$('.container').width() / 3 * 2, ease: 'slowMoIn', duration: .8 }, '0')
                    .to('.bh-hold-ship-wrap', { x: -$('.container').width() + 20, duration: 20, ease: 'none' }, '>')
                return tlHomeHero2;
            }

            function resetHomeHero() {
                starfield.app.idleIntensity = .1;
                starfield.app.buttonIntensity = .1;
                const tlHomeHeroReset = new gsap.timeline({})
                tlHomeHeroReset.delay(.5);
                $('.bh-hole-ship-wrap, .embed-home-hole-vid video, .starfall-wrap').removeClass('hiddenForNow')
                $('.home-ship-wrap').addClass('hiddenForNow')
                tlHomeHeroReset.set('.home-hero-content', { scale: 1, yPercent: 0, autoAlpha: 1 })
                    .set('.home-ship', { scale: 1, yPercent: 0, autoAlpha: 1 })
                    .set('canvas', { autoAlpha: 1 })
                homeHeroMainBtn.removeClass('hidden')
            }
        })
    }
    function homeShipFollow() {
        var x = 0;
        var y = 0;
        var r = 0;
        shipX = x;
        var shipY = y;
        var shipR = r;
        let rotX, curRotX, rot;
        rotX = 0;
        curRotX = rotX;
        rot = (rotX - curRotX);
        var shipDif = rot;

        let xSetter = gsap.quickSetter('.home-ship', "x", "px");
        let ySetter = gsap.quickSetter('.home-ship', "y", "px");
        let xRotSetter = gsap.quickSetter('.home-ship', "rotation", "deg");

        function shipMove(e) {
            rotX = e.pageX;
            if ($(window).width > 991) {
                x = (e.pageX / window.innerWidth - .5) * window.innerWidth / 2;
            } else {
                x = (e.pageX / window.innerWidth - .5) * window.innerWidth / 1.4;
            };
            y = (e.pageY / window.innerHeight - .5) * $('.home-ship').height();
        }
        function loop() {
            rot = (rotX - curRotX);
            xSetter(shipX);
            ySetter(shipY);
            xRotSetter(shipDif / 2);
            curRotX = rotX;
            shipDif += (rot - shipDif) * .01;
            shipX += (x - shipX) * 0.008;
            shipY += (y - shipY) * 0.008;
            shipR += (r - shipR) * 0.005;
            requestAnimationFrame(loop)
        }

        loop();

        $(window).on('pointermove', shipMove);
    };
    function homeAnimLoop() {
        gsap.to('.home-ship .home-ship-img-inner', {
            keyframes: {
                "0%": { yPercent: 0 },
                "50%": { yPercent: 10 },
                "100%": { yPercent: 0 }
            },
            repeat: -1,
            ease: 'none',
            duration: 4
        });

        gsap.to('#fea4Obj', {
            repeat: -1, duration: 6, ease: 'none', motionPath: {
                path: "#fea4Path",
                align: "#fea4Path",
                alignOrigin: [0.5, 0.5],
                autoRotate: false,
                start: 0,
                end: 1,
            }, keyframes: {
                "0%": { opacity: 1 },
                "24%": { opacity: .8 },
                "35%": { opacity: 0 },
                "50%": { opacity: 0 },
                "65%": { opacity: 0 },
                "86%": { opacity: .8 },
                "100%": { opacity: 1 },
            }
        });

        const dots = $('.home-fea-1-img-comp-light svg path');
        for (let x = 0; x < dots.length; x++) {
            gsap.to(dots.eq(x), {
                keyframes: {
                    '0%': { 'fill': '#25054D' },
                    '25%': { 'fill': '#4B61B8' },
                    '50%': { 'fill': '#2AF6FF' },
                    '75%': { 'fill': '#4B61B8' },
                    '100%': { 'fill': '#25054D' },
                }, duration: 3, repeat: -1, delay: gsap.utils.random(-1, 1, 0.01)
            })
        }
    };
    function homeSwiper() {
        $('.home-news-main-nav .ic-btn').eq(1).addClass('home-news-main-nxt')
        $('.home-news-main-nav .ic-btn').eq(0).addClass('home-news-main-prev')
        const homeNewsSwiper = new Swiper('.home-news-main', {
            slidesPerView: 1,
            spaceBetween: 20,
            navigation: {
                nextEl: '.home-news-main-nav .home-news-main-nxt',
                prevEl: '.home-news-main-nav .home-news-main-prev',
            },
            breakpoints: {
                767: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                991: {
                    slidesPerView: 4,
                    spaceBetween: 32
                }
            }
        })
    };
    function hoverHomeNews() {
        $('.abt-value-item').css('height', `${$('.home-news-cms').height()}px`);
        setTimeout(() => {
            $('.abt-value-item').css('height', `${$('.home-news-cms').height()}px`);
        }, 1600);
        if ($(window).width() > 768) {
            $('.home-news-item-desc').slideUp();
            $('.abt-value-item').on('pointerenter', function () {
                $(this).find('.home-news-item-desc').slideDown();
            })
            $('.abt-value-item').on('pointerleave', function () {
                $(this).find('.home-news-item-desc').slideUp();
            })
        }
    };
    function homeScrollTrigger() {
        const tlHomeFea1 = new gsap.timeline({
            scrollTrigger: {
                trigger: '.home-fea-item:nth-child(1)',
                start: "top 65%",
                end: "top top",
            },
            onComplete: () => {
                $('.home-fea-1-ship').addClass('floating')
            }
        })
        tlHomeFea1.from('.home-fea-1-li-lg', { autoAlpha: .2, duration: 2, ease: 'none' })
            .from('.home-fea-1-li-sm-t', { autoAlpha: .2, duration: 1.6, ease: 'none' }, '0')
            .from('.home-fea-1-ship', { autoAlpha: 0, duration: 2 }, '0')
            .from('.home-fea-1-ship', { yPercent: -140, duration: 4, ease: Power1.easeOut }, '0')
            .to('body', { "--scale": ".01", duration: 4, ease: Power1.easeOut }, '0')
            .to('body', { "--transY": "-300%", duration: 4, ease: Power1.easeOut }, '0')
            .to('.home-fea-1-li-sm-t', { scaleY: .5, duration: 3, ease: Power1.easeOut }, '0');

        const tlHomeHole = new gsap.timeline({
            scrollTrigger: {
                trigger: '.sc-home-hole',
                start: 'top top',
                end: '60% top',
                scrub: true,
            }
        })
        tlHomeHole.to('.col-1', { yPercent: -50, ease: 'none', duration: 1 })
            .to('.col-2', { yPercent: -25, ease: 'none', duration: 1 }, '0')
            .to('.col-3', { yPercent: -15, ease: 'none', duration: 1 }, '0')
            .to('.scr-indicate-wrap', { autoAlpha: 0, ease: 'none', duration: .4 }, '0')

        if ($(window).width() > 768) {
            const tlHomeEth = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-eth-top',
                    start: "-100% top",
                    end: "top top",
                    scrub: true,
                }
            })
            tlHomeEth.from('.home-eth-top', { yPercent: -15, ease: 'none' })
        }

        const tlHomeHire = new gsap.timeline({
            scrollTrigger: {
                trigger: '.sc-home-hire',
                start: "-55% top",
                end: "bottom top",
                scrub: true,
            }
        });
        tlHomeHire.to('.home-hire-bg-wrap', { yPercent: -20, ease: 'none' })
            .from('.home-hire-ship-img', { xPercent: 10, ease: 'none' }, '0')

        $('.sc-home-conn .btn-primary').on('pointerenter', (e) => {
            $('.home-conn-ship, .home-conn-upper-light').addClass('show')
        });
        $('.sc-home-conn .btn-primary').on('pointerleave', (e) => {
            $('.home-conn-ship, .home-conn-upper-light').removeClass('show')
        })
    };
    function scrollNext() {
        $('.scr-indicate-inner').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            scrollmain.scrollTo('.sc-home-fea', { duration: 1200, disableLerp: false })
        })
    }
    function starFall() {
        console.log('init starfall');
        //Helpers
        function lineToAngle(x1, y1, length, radians) {
            var x2 = x1 + length * Math.cos(radians),
                y2 = y1 + length * Math.sin(radians);
            return { x: x2, y: y2 };
        }
        function randomRange(min, max) {
            return min + Math.random() * (max - min);
        }
        function degreesToRads(degrees) {
            return degrees / 180 * Math.PI;
        }
        //Particle
        var particle = {
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            radius: 0,

            create: function (x, y, speed, direction) {
                var obj = Object.create(this);
                obj.x = x;
                obj.y = y;
                obj.vx = Math.cos(direction) * speed;
                obj.vy = Math.sin(direction) * speed;
                return obj;
            },

            getSpeed: function () {
                return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            },

            setSpeed: function (speed) {
                var heading = this.getHeading();
                this.vx = Math.cos(heading) * speed;
                this.vy = Math.sin(heading) * speed;
            },

            getHeading: function () {
                return Math.atan2(this.vy, this.vx);
            },

            setHeading: function (heading) {
                var speed = this.getSpeed();
                this.vx = Math.cos(heading) * speed;
                this.vy = Math.sin(heading) * speed;
            },

            update: function () {
                this.x += this.vx;
                this.y += this.vy;
            }
        };

        //Canvas and settings
        var canvas = document.getElementById("starfall"),
            context = canvas.getContext("2d"),
            width = canvas.width = window.innerWidth,
            height = canvas.height = window.innerHeight,
            stars = [],
            shootingStars = [],
            layers = [
                { speed: 0.015, scale: 0.2, count: 320 },
                { speed: 0.03, scale: 0.5, count: 50 },
                { speed: 0.05, scale: 0.75, count: 30 }
            ],
            starsAngle = 145,
            shootingStarSpeed = {
                min: 15,
                max: 20
            },
            shootingStarOpacityDelta = 0.01,
            trailLengthDelta = 0.01,
            shootingStarEmittingInterval = 2000,
            shootingStarLifeTime = 500,
            maxTrailLength = 300,
            starBaseRadius = 2,
            shootingStarRadius = 3,
            paused = false;

        //Create all stars
        for (var j = 0; j < layers.length; j += 1) {
            var layer = layers[j];
            for (var i = 0; i < layer.count; i += 1) {
                var star = particle.create(randomRange(0, width), randomRange(0, height), 0, 0);
                star.radius = starBaseRadius * layer.scale;
                star.setSpeed(layer.speed);
                star.setHeading(degreesToRads(starsAngle));
                stars.push(star);
            }
        }

        function createShootingStar() {
            var shootingStar = particle.create(randomRange(width / 2, width), randomRange(0, height / 2), 0, 0);
            shootingStar.setSpeed(randomRange(shootingStarSpeed.min, shootingStarSpeed.max));
            shootingStar.setHeading(degreesToRads(starsAngle));
            shootingStar.radius = shootingStarRadius;
            shootingStar.opacity = 0;
            shootingStar.trailLengthDelta = 0;
            shootingStar.isSpawning = true;
            shootingStar.isDying = false;
            if (shootingStars.length <= 2) {
                shootingStars.push(shootingStar);
            }
        }

        function killShootingStar(shootingStar) {
            setTimeout(function () {
                shootingStar.isDying = true;
            }, shootingStarLifeTime);
        }

        function update() {
            if (!paused) {
                context.clearRect(0, 0, width, height);
                context.fillStyle = "transparent";
                context.fillRect(0, 0, width, height);
                context.fill();

                for (var i = 0; i < stars.length; i += 1) {
                    var star = stars[i];
                    star.update();
                    drawStar(star);
                    if (star.x > width) {
                        star.x = 0;
                    }
                    if (star.x < 0) {
                        star.x = width;
                    }
                    if (star.y > height) {
                        star.y = 0;
                    }
                    if (star.y < 0) {
                        star.y = height;
                    }
                }

                for (i = 0; i < shootingStars.length; i += 1) {
                    var shootingStar = shootingStars[i];
                    if (shootingStar.isSpawning) {
                        shootingStar.opacity += shootingStarOpacityDelta;
                        if (shootingStar.opacity >= 1.0) {
                            shootingStar.isSpawning = false;
                            killShootingStar(shootingStar);
                        }
                    }
                    if (shootingStar.isDying) {
                        shootingStar.opacity -= shootingStarOpacityDelta;
                        if (shootingStar.opacity <= 0.0) {
                            shootingStar.isDying = false;
                            shootingStar.isDead = true;
                        }
                    }
                    shootingStar.trailLengthDelta += trailLengthDelta;

                    shootingStar.update();
                    if (shootingStar.opacity > 0.0) {
                        drawShootingStar(shootingStar);
                    }
                }

                //Delete dead shooting shootingStars
                for (i = shootingStars.length - 1; i >= 0; i--) {
                    if (shootingStars[i].isDead) {
                        shootingStars.splice(i, 1);
                    }
                }
            }
            requestAnimationFrame(update);
        }

        function drawStar(star) {
            context.fillStyle = "rgb(161, 159, 198)";
            context.beginPath();
            context.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
            context.fill();
        }

        function drawShootingStar(p) {
            var x = p.x,
                y = p.y,
                currentTrailLength = (maxTrailLength * p.trailLengthDelta),
                pos = lineToAngle(x, y, -currentTrailLength, p.getHeading());

            context.fillStyle = "rgba(255, 255, 255, " + p.opacity + ")";
            // context.beginPath();
            // context.arc(x, y, p.radius, 0, Math.PI * 2, false);
            // context.fill();
            var starLength = 5;
            context.beginPath();
            context.moveTo(x - 1, y + 1);

            context.lineTo(x, y + starLength);
            context.lineTo(x + 1, y + 1);

            context.lineTo(x + starLength, y);
            context.lineTo(x + 1, y - 1);

            context.lineTo(x, y + 1);
            context.lineTo(x, y - starLength);

            context.lineTo(x - 1, y - 1);
            context.lineTo(x - starLength, y);

            context.lineTo(x - 1, y + 1);
            context.lineTo(x - starLength, y);

            context.closePath();
            context.fill();

            //trail
            context.fillStyle = "rgba(255, 255, 255, " + p.opacity + ")";
            context.beginPath();
            context.moveTo(x - 1, y - 1);
            context.lineTo(pos.x, pos.y);
            context.lineTo(x + 1, y + 1);
            context.closePath();
            context.fill();
        }

        //Run
        update();

        //Shooting stars
        setInterval(function () {
            if (paused) return;
            createShootingStar();
        }, shootingStarEmittingInterval);

        window.onfocus = function () {
            paused = false;
        };

        window.onblur = function () {
            paused = true;
        };
    }
    //About
    function hoverFounder() {
        var screenWidth = window.screen.width / 2,
            screenHeight = window.screen.height / 2,
            elems = document.getElementsByClassName("abt-ceo-prof-img"),
            validPropertyPrefix = '',
            otherProperty = 'perspective(1000px)',
            elemStyle = elems[0].style;

        if (typeof elemStyle.webkitTransform == 'string') {
            validPropertyPrefix = 'webkitTransform';
        } else if (typeof elemStyle.MozTransform == 'string') {
            validPropertyPrefix = 'MozTransform';
        }

        document.addEventListener('pointermove', function (e) {
            var centroX = e.clientX - screenWidth,
                centroY = screenHeight - (e.clientY + 13),
                degX = centroX * 0.04,
                degY = centroY * 0.02,
                ele

            for (var i = 0; i < elems.length; i++) {
                ele = elems[i];
                ele.style[validPropertyPrefix] = otherProperty + 'rotateY(' + degX + 'deg)  rotateX(' + degY + 'deg)';
            };
        });
    };
    function aboutSwiper() {
        const swiperAboutValue = new Swiper('.abt-value-cms', {
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: {
                el: '.abt-value-pagintaion',
                type: 'bullets',
            },
        })
    };
    function hoverValue() {
        const abtValItems = $('.abt-value-item');
        const allHeight = [];
        for (let x = 0; x < abtValItems.length; x++) {
            let height = abtValItems.eq(x).height();
            allHeight.push(height);
        };
        const maxHeight = Math.max.apply(Math, allHeight)
        console.log(maxHeight)
        // $(window).on('resize', () => {
        //     $('.abt-value-item').css('height', $('.abt-value-item').height());
        // })
        // $(window).resize();
        // $('.abt-value-item').on('pointerenter', function () {
        //     $(this).find('.abt-value-item-img-wrap').slideUp();
        //     $(this).find('.abt-value-item-sub').slideDown();
        // })
        // $('.abt-value-item').on('pointerleave', function () {
        //     $(this).find('.abt-value-item-img-wrap').slideDown();
        //     $(this).find('.abt-value-item-sub').slideUp();
        // })
    };
    function aboutScrollTrigger() {
        const tlAboutHero = new gsap.timeline({
            scrollTrigger: {
                trigger: '.sc-abt-hero',
                start: 'top top',
                end: '50% top',
                scrub: true,
            }
        });
        tlAboutHero.to('.abt-hero-title', { yPercent: 500, scale: .2, autoAlpha: 0, ease: 'none' })
            .to('.home-eth-main.mod-abt-hero', { yPercent: -10, ease: 'none' }, '0')
            .to('.abt-hero-eth-sd', { yPercent: 20, ease: 'none' }, '0');

        const tlAboutStory = new gsap.timeline({
            scrollTrigger: {
                trigger: '.sc-abt-story',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        });
        tlAboutStory.to('.abt-story-land-near', { yPercent: -20, ease: 'none' })
            .to('.abt-story-land-mount', { yPercent: 5, ease: 'none' }, '0')
    }
    //Blog
    function blogFeature() {
        $('.blogs-hero-pagi .ic-btn').eq(0).addClass('prev')
        $('.blogs-hero-pagi .ic-btn').eq(1).addClass('next');
        let swiperBlogsHero;
        if ($(window).width() > 768) {
            swiperBlogsHero = new Swiper('.blogs-hero-main', {
                slidesPerView: 1,
                spaceBetween: 32,
                speed: 600,
                allowTouchMove: false,
                navigation: {
                    nextEl: '.ic-btn.next',
                    prevEl: '.ic-btn.prev',
                },
                loop: true,
                autoplay: {
                    delay: 5000,
                },
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
            });
        } else {
            swiperBlogsHero = new Swiper('.blogs-hero-main', {
                slidesPerView: 1,
                spaceBetween: 20,
                speed: 600,
                loop: true,
                autoplay: {
                    delay: 5000,
                }
            })
        }
        trans(0);
        swiperBlogsHero.on('activeIndexChange', function () {
            let index = this.realIndex;
            trans(index);
        })

        $('.blogs-hero-thumb-item-inner').on('click', function () {
            let index = $(this).parent().index();
            swiperBlogsHero.slideTo(index + 1);
            trans(index);
        });

        function trans(i) {
            $('.blogs-hero-thumb-item-inner').removeClass('active')
            $('.blogs-hero-thumb-item-inner').eq(i).addClass('active')
            if ($('.blogs-hero-thumb-prb').length >= 1) {
                gsap.set('.blogs-hero-thumb-prb', { scaleX: 0, transformOrigin: 'left', overwrite: true });
                gsap.to($('.blogs-hero-thumb-prb').eq(i), {
                    scaleX: 1, duration: 5, ease: 'none', onComplete: () => {
                        if (i == 2) {
                            i = -1;
                        }
                        swiperBlogsHero.slideTo(i + 2);
                        trans(i + 1)
                    }
                });
            }
        }
    }
    function blogPaginationFilter() {
        window.fsAttributes = null;
        console.log(window.fsAttributes);
        setTimeout(() => {
            cmsFilter();
            cmsLoad();
        }, 800);
        $('.pagi-wrap').on('click', () => {
            if ($('html').get(0).classList.contains('has-scroll-smooth')) {
                scrollmain.scrollTo($('.blogs-main-title').offset().top - 100, { duration: 600, disableLerp: true })
            } else {
                window.scrollTo({ top: $('.blogs-main-title').offset().top - 100, behavior: 'smooth' })
            }

            setTimeout(() => {
                scrollmain.update();
            }, 800);
        })
        $('.blogs-main-cat').on('click', function (e) {
            $('.blogs-main-cat').removeClass('active')
            $(this).addClass('active')
            setTimeout(() => {
                scrollmain.update();
            }, 800);
        })
    }
    // Blog Detail 
    function relatedBlog() {
        window.fsAttributes = null;
        console.log(window.fsAttributes)
        setTimeout(() => {
            cmsFilter();
            cmsLoad();
            console.log(window.fsAttributes)
            const currCate = $('.blogdtl-hero-cat').html();
            console.log(currCate);
            if (currCate == 'Blog') {
                console.log('blog')
                $('.blogdtl-filter-radio').eq(0).click();
            } else if (currCate == 'Events') {
                console.log('evn')
                $('.blogdtl-filter-radio').eq(1).click();
            }
        }, 800);
    }
    //Career 
    function marqueeTeam() {
        let cloneContent = $('.career-rs-marquee-cms').html();
        $('.career-rs-marquee-cms').append(cloneContent)
        const tlMarqueeTeam = new gsap.timeline({})
        tlMarqueeTeam.to('.career-rs-marquee-inner', { xPercent: -100, duration: 68, repeat: -1, ease: 'none' })
        $('.career-rs-marquee-item').on('pointerenter', (e) => {
            gsap.to(tlMarqueeTeam, { timeScale: 0, duration: .6 });
        });
        $('.career-rs-marquee-item').on('pointerleave', (e) => {
            gsap.to(tlMarqueeTeam, { timeScale: 1, duration: .6 });
        })
    }
    function careerInteraction() {
        $('[href="#careerJob"]').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('click')
            scrollmain.scrollTo('#careerJob', {
                duration: 100
            });
        });
    }
    function careersSwiper() {
        const swiperCareerReason = new Swiper('.career-rs-main-cms', {
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: {
                el: '.abt-value-pagintaion',
                type: 'bullets',
            },
        })
    }

    //Job
    function jobInteraction() {
        let childHeight = 0;
        $('.job-main-form-sticky').children().each(function () {
            childHeight += childHeight + $(this).height();
        })
        let offset = 5 * ($(window).height() / 100);
        console.log(childHeight - offset);
        console.log($(window).height())

        $('.job-main-form-sticky').on('pointerenter', function () {
            if (childHeight - offset > $(window).height()) {
                if ($('html').get(0).classList.contains('has-scroll-smooth')) {
                    scrollmain.stop();
                } else {
                    $('body').addClass('stop-scroll')
                }
            }
        });
        $('.job-main-form-sticky').on('pointerleave', function () {
            if (childHeight - offset > $(window).height()) {
                if ($('html').get(0).classList.contains('has-scroll-smooth')) {
                    scrollmain.start();
                } else {
                    $('body').removeClass('stop-scroll')
                }
            }
        });
    }
    function handleFormJob() {
        $('.input-field').on('change keyup blur input', hanldeInput);
        $('#job-form .btn-primary').on('click', function (e) {
            e.preventDefault();
            $('#job-form').submit();
        })
        const fileEle = initBtnUploadFile();
        const form = initForm('#job-form', {
            onSuccess: () => {
                // success form callback
                $('#job-form').find('.btn-txt').text('Send')
                createFloat('', 3000, 'job')
            },
            submitEle: {
                ele: '.btn-primary',
                textEle: '.btn-txt',
            },
            hubspot: {
                portalId: '22164009',
                formId: 'fee8effe-120c-40cb-acf3-c5cb38f1dea2'
            },
            pageName: 'Career page',
            prepareMap: (ele) => {
                const job = $('.job-main-body-title').text();
                const locate = $('.info-location').text();
                const salary = $('.info-salary').text();

                ele.find('input[name=job]').val(job);
                ele.find('input[name=location]').val(locate);
                ele.find('input[name=salary]').val(salary);
            },
            fileOptions: {
                fileEle: fileEle,
                required: true,
                folder: 'career'
            },
            fields: [
                {
                    name: 'firstname',
                    value: (data) => data.name,
                },
                {
                    name: 'email',
                    value: (data) => data.email,
                },
                {
                    name: 'job',
                    value: (data) => `${data.job} - ${data.locate} (${data.salary})`,
                },
                {
                    name: 'phone',
                    value: (data) => data.phone,
                },
                {
                    name: 'resume',
                    value: (data) => data.fileUrl,
                },
                {
                    name: 'message',
                    value: (data) => data.message
                },
            ]
        })
    }
    //Contact 
    function handleFormContact() {
        $('.input-field').on('change keyup blur input', hanldeInput);
        $('#contact-form .btn-primary').on('click', function (e) {
            e.preventDefault();
            $('#contact-form').submit();
        })
        const form = initForm('#contact-form', {
            onSuccess: () => {
                // success form callback
                createFloat('', 3000, 'contact')
                $('#contact-form').find('.btn-txt').text('Submit')
            },
            hubspot: {
                portalId: '22164009',
                formId: 'f86cc368-6d7e-4114-9475-635711b656a7'
            },
            submitEle: {
                ele: '.btn-primary',
                textEle: '.btn-txt',
            },
            pageName: 'Career page',
            prepareMap: (ele) => {
            },
            fields: [
                {
                    name: 'firstname',
                    value: (data) => data.name,
                },
                {
                    name: 'email',
                    value: (data) => data.email,
                },
                {
                    name: 'phone',
                    value: (data) => data.phone,
                },
                {
                    name: 'subject',
                    value: (data) => data.subject,
                },
                {
                    name: 'message',
                    value: (data) => data.message
                },
            ]
        })
    }

    //NotFound
    function notfoundLoop() {
        gsap.fromTo('.notfound-ship', { x: -($(window).width() / 2 + 100), rotation: 0 }, { x: $(window).width() / 2 + 100, rotation: 360, duration: 60, ease: 'none', repeat: -1 })
    }

    //Career Form uploadfile
    function hanldeInput() {
        if ($(this).val()) {
            $(this).prev().addClass('show')
        } else if ($(this).val() == '') {
            $(this).prev().removeClass('show')
        }
    };
    function mapFormToObject(ele) {
        return (parsedFormData = [...new FormData(ele).entries()].reduce(
            (prev, cur) => {
                const name = cur[0];
                const val = cur[1];
                return { ...prev, [name]: val };
            },
            {}
        ));
    }
    function initForm(form, options) {
        const { submitEle = {}, onSuccess, onError, handleSubmit, prepareMap, fileOptions, fields, pageName = "Form", hubspot } = options;
        const { ele, textEle } = submitEle;

        let submitBtn = $(form).find('input[type=submit]');
        if (ele) {
            submitBtn = $(form).find(ele);
        }
        let defaultText = submitBtn.clone().val();
        if (textEle) {
            defaultText = submitBtn.find(textEle).clone().text();
        }
        // console.log(submitBtn.find(textEle).clone().text(), defaultText)

        let url = $(form).attr('action');

        if (hubspot) {
            const { portalId, formId } = hubspot;
            url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
        }

        const setLoading = (isLoading) => {
            console.log(isLoading)
            if (isLoading) {
                console.log(textEle)
                if (textEle) {
                    submitBtn.find(textEle).text('Please wait ...');
                } else {
                    submitBtn.val('Please wait ...');
                }

                submitBtn.css({ 'pointer-events': 'none' })
            }
            else {
                if (textEle) {
                    submitBtn.find(textEle).text(defaultText);
                } else {
                    submitBtn.val(defaultText)
                }
                submitBtn.css({ 'pointer-events': '' })
            }
        }

        const showError = (message = "Something error") => {
            alert(message)
        }
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
        const sendSubmission = (data) => {
            const mappedFields = mapField(data);
            const dataSend = {
                fields: mappedFields,
                context: {
                    pageUri: window.location.href,
                    pageName: pageName,
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
                    $(form).get(0).reset()
                    if (fileOptions) {
                        const { fileEle } = fileOptions;
                        fileEle.reset();
                    }
                    if (onSuccess) onSuccess();
                    // alert('Success');
                    setLoading(false);
                },
                error: function (error) {
                    if (error.readyState === 4) {
                        const errors = error.responseJSON.errors
                        const errorArr = errors[0].message.split('.')
                        const errorMess = errorArr[errorArr.length - 1]

                        showError(errorMess);
                    }
                    else {
                        showError('Something error');
                    }
                    setLoading(false)
                },
            });
        }

        $(form).on("submit", function (e) {
            e.preventDefault();
            setLoading(true);
            if (prepareMap) {
                prepareMap($(this));
            }
            const data = mapFormToObject(e.target);
            if (fileOptions) {
                const { fileEle, required, folder } = fileOptions;
                const file = fileEle.getFile();
                if (required && !file) {
                    showError('Missed file upload');
                    setLoading(false);
                    return false;
                }
                uploadFile(file, folder).then((result) => {
                    data.fileUrl = result.url;
                    sendSubmission(data);
                })
                return false;
            }
            if (handleSubmit) handleSubmit(data);
            sendSubmission(data);
            return false;

        });
    }
    function initBtnUploadFile() {
        const currentTextUpload = $('.upload-file-inner').find('.text-link-text').clone().text();
        const maxAllowedSize = 10 * 1024 * 1024;
        const resetBtnUploadFile = (ele) => {
            $('.ic-upload').removeClass('hidden')
            $('.embed-upload-del').addClass('hidden');

            ele.find('input[type=file]').val("");
            ele.find('.text-link-text').text(currentTextUpload);
        }

        const handleUploadFile = (ele, file) => {
            $('.ic-upload').addClass('hidden')
            $('.embed-upload-del').removeClass('hidden');

            const fileName = shortedFileName(file.name);
            ele.find('.text-link-text').text(fileName);
        }
        $(".career-rs-link").on("click", function (e) {
            e.preventDefault();
            $(this).find('.text-link-text').text('Uploading...')
            console.log('uploading')
            $(this).closest(".upload-file-inner").find('input[type=file]').click();
        })
        $('.ic-upload-del').on("click", function () {
            const wrapper = $(this).closest('.upload-file-inner');
            resetBtnUploadFile(wrapper);
        })
        $('input[type=file]').change(function () {
            const file = $(this).get(0).files[0] //the file
            if (file.size > maxAllowedSize) {
                alert('Maximum allowed size file');
                return;
            }
            const wrapper = $(this).closest('.upload-file-inner');
            if (!file) {
                resetBtnUploadFile(wrapper);
                return;
            };
            handleUploadFile(wrapper, file)
        })

        return {
            reset: () => resetBtnUploadFile($('.upload-file-inner')),
            upload: () => $(".upload-file-inner .career-rs-link").trigger("click"),
            getFile: () => $('input[type=file]').get(0).files[0]
        }
    }
    function shortedFileName(name, size = 16) {
        const splitFile = name.split('.');
        function truncate(source, size) {
            return source.length > size ? source.slice(0, size - 1) + "…" : source;
        }
        return `${truncate(splitFile[0], size)}.${splitFile[1]}`;
    }
    function uploadFile(file, folder) {
        // https://script.google.com/macros/s/AKfycbzgEHbrlmRFl2vD9jZ0bzULaroPwX4mYxS3hMezfkXB6FVHs-RwFNinfdOuy2z8J7o/exec
        const idScript = 'AKfycbwuclYpKTLT1t9NbXHN1tRhp4a0YgtEU5GFm4BWqea69gLQ1W9n5kVi0h4J1V3QHDLj'
        const endpoint = `https://script.google.com/macros/s/${idScript}/exec`
        return new Promise((res, rej) => {
            if (!file) res({});
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function (e) {
                const rawLog = reader.result.split(',')[1];
                const dataSend = {
                    dataReq: {
                        data: rawLog,
                        name: file.name,
                        type: file.type,
                        folderName: folder
                    },
                    fname: "uploadFilesToGoogleDrive"
                };
                fetch(endpoint, { method: "POST", body: JSON.stringify(dataSend) })
                    .then(res => res.json()).then((a) => {
                        res(a)
                    }).catch(e => rej(e))
            }
        })
    }
};
window.onload = function () {
    Script()
    console.log('loaded')
}