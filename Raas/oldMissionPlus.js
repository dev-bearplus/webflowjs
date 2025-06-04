const Script = () => {
    console.log('local')
    $('.popup-job').css('z-index', '999');
    //--------------------------------------------------------------------------------------------------------------------------------------------------
    // PAGE TRANSITIONS
    //--------------------------------------------------------------------------------------------------------------------------------------------------
    barba.hooks.before(() => {
        if ($(window).width() < 767) {
            headerScrollLogo.toggleClass('show');
        }
        navToggleHeader.removeClass('show');
        menuScrollContent.removeClass('show');
        $('.logo.headerscroll').removeClass('show');
    });
    barba.hooks.after(() => {
        console.clear()
        afterInitScroll()
        scrollmain.update();
        scrollmain.scrollTo(0, 0);
        detectLinks();
        initScrollTo();
        footerScript();
        scriptAllPage();
        if ($('.blogspage').length) {
            setTimeout(() => {
                location = self.location.href;
                //window.location.replace("https://mission.plus");
                let blogTabs = $('.filter-button');
                blogTabs.click(function (e) {
                    e.preventDefault();
                    setTimeout(() => {
                        scrollmain.update();
                    }, 300);
                    blogTabs.removeClass('filter-active');
                    $(this).addClass('filter-active');
                });

                let blogsCategory = $('.post-info-categories');
                blogsCategory.click(function (e) {
                    e.preventDefault();
                    let filter = $(this).text();
                    console.log(filter);
                    document.getElementById('filter' + filter).dispatchEvent(new Event('click'));
                    console.log("clicked");
                });

                $('.pagination-container').on("click", function () {
                    scrollmain.update();
                });
            }, 1000);
        };
        if ($('.processpage').length) {
            setTimeout(() => {
                x1 = $('#processItem-1').offset().top;
                x2 = $('#processItem-2').offset().top;
                x3 = $('#processItem-3').offset().top;
            }, 1000)
        };

    });

    function pageTranstion() {
        let tl = gsap.timeline();

        tl.to('.transition-wrap .transition-inner', { duration: 0.5, scaleY: 1, transformOrigin: "bottom left", stagger: 0.2 })
        tl.to('.transition-wrap .transition-inner', { duration: 0.5, scaleY: 0, transformOrigin: "bottom left", stagger: 0.1, delay: 0.1 })
    };

    function delay(n) {
        n = n || 2000;
        return new Promise(done => {
            setTimeout(() => {
                done();
            }, n);
        });
    };

    barba.init({
        sync: true,
        timeout: 5000,
        transitions: [
            {
                async leave(data) {
                    const done = this.async();

                    pageTranstion();
                    await delay(1300);
                    done();
                },
                async enter(data) {
                }
            }
        ]
    });

    gsap.registerPlugin(ScrollTrigger);
    let scrollmain = new LocomotiveScroll({
        el: document.querySelector('.scrollmain'),
        smooth: true,
        getDirection: true,
    });
    let header = $('.header');
    let headerScroll = $('.header-scroll');
    let navToggleHeader = $('.header-scroll-toggle');
    let menuScrollContent = $('.menu-scroll');
    let headerScrollLogo = $('.logo.headerscroll');
    let headerTriggerHeight;
    let x1, x2, x3;
    if ($('.processpage').length) {
        x1 = $('#processItem-1').offset().top;
        x2 = $('#processItem-2').offset().top;
        x3 = $('#processItem-3').offset().top;
    };
    if ($(window).width() >= 991) {
        headerTriggerHeight = header.outerHeight();
    } else {
        headerTriggerHeight = headerScroll.outerHeight();
    };

    if ($(window).width() < 991) {
        headerScroll.addClass('active');
    };

    scrollmain.on('scroll', (instance) => {
        if (instance.scroll.y > headerTriggerHeight) {
            if (instance.direction == 'down') {
                headerScroll.removeClass('active');
            } else {
                headerScroll.addClass('active');
            }
        } else if (instance.scroll.y < headerTriggerHeight) {
            if ($(window).width() >= 991) {
                headerScroll.removeClass('active');
                navToggleHeader.removeClass('show');
                menuScrollContent.removeClass('show');
            }
        };
        if ($('.homepage').length) {
            if ($(window).width() >= 991) {
                if (instance.scroll.y >= 1800) {
                    if (instance.direction == 'down') {
                        $('.schow-content-wrapper').css('margin-top', '46px')
                    } else {
                        $('.schow-content-wrapper').css('margin-top', '100px')
                    }
                } else {
                    $('.schow-content-wrapper').css('margin-top', '46px')
                }
            } else {
                $('.schow-content-wrapper').css('margin-top', '0px')
            }
        };

        if ($('.blogspage').length) {
            if ($(window).width() >= 991) {
                if (instance.scroll.y >= $('.filter-wrapper').offset().top) {
                    if (instance.direction == 'down') {
                        $('.filter-wrapper').css('margin-top', '80px')
                    } else {
                        $('.filter-wrapper').css('margin-top', '100px')
                    }
                } else {
                    $('.filter-wrapper').css('margin-top', '80px')
                }
            } else if ($(window).width() >= 768) {
                if (instance.scroll.y >= $('.filter-wrapper').offset().top) {
                    if (instance.direction == 'down') {
                        $('.filter-wrapper').css('margin-top', '80px')
                    } else {
                        $('.filter-wrapper').css('margin-top', '140px')
                    }
                } else {
                    $('.filter-wrapper').css('margin-top', '80px')
                }
            }
        };

        if ($('.blogdetailpage').length) {
            if ($(window).width() >= 991) {
                if (instance.scroll.y >= $('.blogdetail-share-wrap').offset().top) {
                    if (instance.direction == 'down') {
                        $('.blogdetail-share-wrap').css('margin-top', '73px')
                        $('.blogdetail-related-wrap').css('margin-top', '100px')
                    } else {
                        $('.blogdetail-share-wrap').css('margin-top', '100px')
                        $('.blogdetail-related-wrap').css('margin-top', '100px')
                    }
                } else {
                    $('.blogdetail-share-wrap').css('margin-top', '73px')
                    $('.blogdetail-related-wrap').css('margin-top', '100px')
                }
            } else if ($(window).width() >= 768) {
                if (instance.scroll.y >= $('.blogdetail-share-wrap').offset().top) {
                    if (instance.direction == 'down') {
                        $('.blogdetail-share-wrap').css('margin-top', '73px')
                    } else {
                        $('.blogdetail-share-wrap').css('margin-top', '140px')
                    }
                } else {
                    $('.blogdetail-share-wrap').css('margin-top', '73px')
                }
            }
        };

        if ($('.processpage').length) {
            function scrollAway(i, topValue) {
                let scrollValue;
                scrollValue = Math.round(((instance.scroll.y + 300) - topValue) * 100 / $('#processItem-' + i).outerHeight());
                if (scrollValue >= 0 && scrollValue < 100) {
                    $('#processMenu-' + i + ' .circular-wrap').css('background', `conic-gradient(#44B965 ${scrollValue}%, rgba(0,0,0,.1) ${scrollValue}%)`);
                    $('#processMenu-' + i).addClass('complete');
                    $('#processMenu-' + i + ' .process-menu-number').addClass('complete');
                    $('#processMenu-' + i + ' .process-menu-title').addClass('complete');
                } else if (scrollValue >= 100) {
                    scrollValue = 100;
                    $('#processMenu-' + i + ' .circular-wrap').css('background', `conic-gradient(#44B965 ${scrollValue}%, rgba(0,0,0,.1) ${scrollValue}%)`)
                    $('#processMenu-' + i + ' .process-menu-number').removeClass('complete');
                    $('#processMenu-' + i + ' .process-menu-title').removeClass('complete');
                } else {
                    scrollValue = 0;
                    $('#processMenu-' + i + ' .circular-wrap').css('background', `conic-gradient(#44B965 ${scrollValue}%, rgba(0,0,0,.1) ${scrollValue}%)`)
                    $('#processMenu-' + i + ' .process-menu-number').removeClass('complete');
                    $('#processMenu-' + i + ' .process-menu-title').removeClass('complete');
                };
            };
            scrollAway(1, x1);
            scrollAway(2, x2);
            scrollAway(3, x3);
        };

        if ($('.casedetailpage').length) {
            if ($(window).width() >= 991) {
                if (instance.scroll.y >= $('.scmaincasedetail-cat').offset().top) {
                    if (instance.direction == 'down') {
                        $('.scmaincasedetail-cat').css('margin-top', '80px')
                    } else {
                        $('.scmaincasedetail-cat').css('margin-top', '100px')
                    }
                } else {
                    $('.scmaincasedetail-cat').css('margin-top', '80px')
                };
                let introTop = document.querySelector('#intro').offsetTop - 100;
                let solutionTop = document.querySelector('#solution').offsetTop - 100;
                let outcomeTop = document.querySelector('#outcome').offsetTop - 100;
                $('.casedetail-cat-link').removeClass('active');
                if (instance.scroll.y < introTop) {
                    $('.casedetail-cat-link').removeClass('active');
                } else if (instance.scroll.y < solutionTop) {
                    $('[data-casedetail="#intro"]').addClass('active');
                } else if (instance.scroll.y < outcomeTop) {
                    $('[data-casedetail="#solution"]').addClass('active');
                } else {
                    $('[data-casedetail="#outcome"]').addClass('active');
                };

            };
        };
    });

    navToggleHeader.on("click", function () {
        navToggleHeader.toggleClass('show');
        menuScrollContent.toggleClass('show');
        if ($(window).width() < 767) {
            headerScrollLogo.toggleClass('show');
        }
    });

    function afterInitScroll() {
        //--------------------------------------------------------------------------------------------------------------------------------------------------
        // SMOOTH SCROLL ACTIVATE
        //--------------------------------------------------------------------------------------------------------------------------------------------------    
        gsap.registerPlugin(ScrollTrigger);
        scrollmain.on("scroll", ScrollTrigger.update);

        ScrollTrigger.scrollerProxy('.scrollmain', {
            scrollTop(value) {
                return arguments.length ? scrollmain.scrollTo(value, 0, 0) : scrollmain.scroll.instance.scroll.y;
            }, // we don't have to define a scrollLeft because we're only scrolling vertically.
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            pinType: document.querySelector('.scrollmain').style.transform ? "transform" : "fixed"
        });

        setTimeout(() => {
            scrollmain.update();
        }, 500);

        $(window).on("resize", function () {
            scrollmain.update();
        });
    };

    afterInitScroll();

    //--------------------------------------------------------------------------------------------------------------------------------------------------
    // FOOTER INTERACTION + ANIMATION
    //--------------------------------------------------------------------------------------------------------------------------------------------------

    function footerScript() {
        // EMAIL ANIMATION
        function trackEmails() {
            let emailWidth = $('.footer-emails-wrapper').width();
            let duration;
            if ($(window).width() >= 767) {
                trackDu = 12;
            } else {
                trackDu = 10;
            }
            gsap.set(".track-inner", {
                x: -emailWidth
            });

            gsap.set(".footer-emails-wrapper", {
                x: (i) => i * emailWidth
            });


            gsap.to(".footer-emails-wrapper", {
                duration: trackDu,
                ease: "none",
                x: "-=" + emailWidth, //move each box 500px to right
                repeat: -1
            });
        }
        //trackEmails()

        // TIMEZONE
        let currentTime = $('#currentTime');
        if ($('.contactpage').length) {
            let currentTimeContact;
        };
        function updateTime() {
            let singaporeTime = moment.tz("Asia/Singapore").format("hh:mma");
            currentTime.html(singaporeTime);
            if ($('.contactpage').length) {
                currentTimeContact = $('#currentTimeContact');
                currentTimeContact.html(singaporeTime);
            };
        };
        updateTime();
        setInterval(function () {
            updateTime();
        }, 60000);
    };
    footerScript();

    //--------------------------------------------------------------------------------------------------------------------------------------------------
    // DETECH PAGE AND LINK
    //--------------------------------------------------------------------------------------------------------------------------------------------------

    function clearActive() {
        $()
        $('.link-scroll').removeClass('active');
        $('.menu-scroll-contact').removeClass('active');
        $('header a.link').removeClass('active');
        $('.footer-link').removeClass('active');
    }
    function detectPage(link) {
        link.removeClass('underline underline-white');
        link.addClass('active');
        //link.css('pointer-events','none');
    };

    function detectLinks() {
        clearActive();
        if ($('.homepage').length) {
            detectPage($('#stickyHome'));
            detectPage($('#topHome'));
            detectPage($('#footerHome'));
        } else if ($('.contactpage').length) {
            detectPage($('#stickyContact'));
            detectPage($('#topContact'));
            detectPage($('#footerContact'));
        } else if ($('.blogspage').length || $('.blogdetailpage').length) {
            detectPage($('#stickyBlogs'));
            detectPage($('#topBlogs'));
            detectPage($('#footerBlogs'));
        } else if ($('.casespage').length) {
            detectPage($('#stickyCases'));
            detectPage($('#topCases'));
            detectPage($('#footerCases'));
        } else if ($('.processpage').length) {
            detectPage($('#stickyProcess'));
            detectPage($('#topProcess'));
            detectPage($('#footerProcess'));
        } else if ($('.joinpage').length) {
            detectPage($('#stickyJoin'));
            detectPage($('#topJoin'));
            detectPage($('#footerJoin'));
        } else if ($('.servicepage').length) {
            detectPage($('#stickyService'));
            detectPage($('#topService'));
            detectPage($('#footerService'));
        } else if ($('.faqpage').length) {
            detectPage($('#stickyFaq'));
            detectPage($('#topFaq'));
            detectPage($('#footerFaq'));
        } else if ($('.testimonialpage').length) {
            detectPage($('#stickyTesti'));
            detectPage($('#topTesti'));
            detectPage($('#footerTesti'));
        };
    };
    detectLinks();

    function initScrollTo() {
        $('[data-scrollto]').on('click', function(e) {
            e.preventDefault();
            let target = $(this).attr('data-scrollto');
            scrollmain.scrollTo(target)
        })
    };
    initScrollTo();


    //--------------------------------------------------------------------------------------------------------------------------------------------------
    // SCRIPT FOR EACH PAGES
    //--------------------------------------------------------------------------------------------------------------------------------------------------
    function scriptAllPage() {
        if ($('.popup-container').length) {
            function formActive() {
                function customInput(field, machine) {
                    let input = document.querySelector(field);
                    let widthMachine = document.querySelector(machine);
                    if (input.value == "") {
                        widthMachine.innerHTML = input.placeholder;
                    } else {
                        widthMachine.innerHTML = input.value;
                    }
                    input.addEventListener("input", () => {
                        widthMachine.innerHTML = input.value;
                        if (input.value == "") {
                            widthMachine.innerHTML = input.placeholder;
                        }
                    });
                };
                customInput(".input-field.name.popup", ".width-machine.name.popup");
                customInput(".input-field.company.popup", ".width-machine.company.popup");
                customInput(".input-field.email.popup", ".width-machine.email.popup");
                //customInput(".input-field.phonenumber", ".width-machine.phonenumber");

                function customDropdown(field, machine) {
                    let dropdown = document.querySelector(field);
                    let widthMachine = document.querySelector(machine);
                    widthMachine.innerHTML = dropdown.value;
                    dropdown.addEventListener('change', () => {
                        widthMachine.innerHTML = dropdown.value;
                        $(machine).removeClass('open');
                    });
                    dropdown.addEventListener('focusin', () => {
                        $(machine).addClass('open');
                    });
                    dropdown.addEventListener('focusout', () => {
                        $(machine).removeClass('open');
                    });
                };
                //customDropdown('.input-dropdown.services', '.width-machine-dropdown.services');
                //customDropdown('.input-dropdown.budget', '.width-machine-dropdown.budget');
                //customDropdown('.input-dropdown.type', '.width-machine-dropdown.type');              

                $('#wf-form-popup-form').submit(function (evt) {
                    evt.preventDefault();
                    //let senderName = $('.form-success-content .text-18').html();
                    setTimeout(() => {
                        $('.form-success-wrap.popup').addClass('show');
                    }, 500);
                    $('.form-success-close.popup').click(() => {
                        $('.form-success-wrap.popup').removeClass('show');
                    })
                    setTimeout(() => {
                        $('.form-success-wrap.popup').removeClass('show');
                    }, 8000);
                });
            };
            formActive();

            if ($('[data-popup]').length >= 1) {
                $('[data-popup]').on('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    $('.popup-container').addClass('show');
                });
                $('.ic-close-wrap.popup').on('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    $('.popup-container').removeClass('show');
                })
            };
        };
        // SPLITTING TEXT
        //--------------------------------------------------------------------------------------------------------------------------------------------------
        function splittingText() {
            Splitting();
        };
        splittingText();

        //Animation for Texts
        const optAniText = {
            stagger: 0.02,
            staggerContent: 0.008,
            duration: 0.7,
            durationContent: 0.4,
            y: '40%'
        };
        // TTOP MENU SCRIPT
        //--------------------------------------------------------------------------------------------------------------------------------------------------
        function scriptTopMenu() {
            let tlTopMenu = gsap.timeline({
                scrollTrigger: {
                    trigger: '.header',
                    scroller: '.scrollmain',
                    start: 'top top',
                    toggleActions: 'play none none none',
                }
            });
            tlTopMenu.from('.header .logo', { y: optAniText.y, opacity: 0, duration: 1.4 }, "0")
                .from('.header .menu ul li a.link', { y: optAniText.y, autoAlpha: 0, duration: optAniText.duration, stagger: 0.1 }, "0.3")
                .from('.header .link-company-status', { y: optAniText.y, autoAlpha: 0, duration: optAniText.duration }, "-=.6")
                .from('.header .contact .contact-links a.contact-link', { y: optAniText.y, autoAlpha: 0, duration: optAniText.duration, stagger: 0.1 }, "0")
                .from('.header .menu-line', { scaleX: 0, transformOrigin: 'bottom right', duration: 0.9 }, "0.3")

            tlTopMenu.play();
        }

        if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
            scriptTopMenu();
        } else {
            if ($('.blogspage').length !== 1) {
                scriptTopMenu();
            }
        };
        // COMMON SCRIPT 
        function clientSection() {
            const clientSwiper = new Swiper('.client-swiper', {
                speed: 400,
                slidesPerView: 2,
                spaceBetween: 0,
                navigation: {
                    nextEl: '.client-nav-next',
                    prevEl: '.client-nav-prev',
                },
                pagination: {
                    el: '.client-nav-pagi',
                    type: 'bullets',
                },
            });
        };
        if ($(window).width() < 768 && $('.scclienthome').length) {
            clientSection();
        }
        // HOME PAGE SCRIPT
        //--------------------------------------------------------------------------------------------------------------------------------------------------
        function scriptHome() {
            if ($('.homepage').length) {
                // Welcome to...
                console.log("Welcome to Home page");

                function animateRevealHome() {
                    const scHero = $('.schero');

                    let tlHero = gsap.timeline({
                        scrollTrigger: {
                            trigger: scHero,
                            scroller: '.scrollmain',
                            start: 'top top',
                            toggleActions: "play none none none",
                            end: 'bottom',
                        }
                    });
                    tlHero.from('.schero .title-head .word', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: optAniText.stagger }, "0")
                        .from('.schero .dynamic-item .word', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: optAniText.stagger }, "-=0.5")
                        .from('.schero .title-tail .word', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: optAniText.stagger }, "-=0.6")
                        .from('.scherohome-content-wrap .text-16 .word', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: optAniText.staggerContent }, "0.5")
                        .from('.scherohome-content-wrap .text-18 .word', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: optAniText.staggerContent }, "-=1")
                        .from('.scherohome .button.scherohome-btn', { y: optAniText.y, opacity: 0, duration: 0.7 }, "-=0.8")
                        .from('.line.scabout', { scaleX: 0, transformOrigin: 'bottom left', duration: 0.7 }, "0.6")
                    tlHero.play();

                    function animationRepeatTextHero() {

                        let vSlide = gsap.timeline({
                            repeat: -1,
                        });

                        let textHero = {
                            slides: document.querySelectorAll('.title-dynamic-wrap .dynamic-item'),
                            list: document.querySelector('.title-dynamic-wrap'),
                            duration: 0.5,
                        }

                        textHero.slides.forEach(function (slide, i) {
                            let label = "slide" + i;
                            vSlide.add(label);

                            vSlide.to(textHero.list, {
                                duration: textHero.duration,
                            }, label);
                            let items = slide;
                            vSlide.from(items, {
                                duration: textHero.duration,
                                autoAlpha: 0,
                            }, label);
                            vSlide.to(items, {
                                duration: textHero.duration,
                                autoAlpha: 0,
                            }, "+=1.2");
                        });
                    }
                    animationRepeatTextHero();

                    function animationAboutHome() {
                        const scAbout = $('.scabout');

                        let tlAbout = gsap.timeline({
                            scrollTrigger: {
                                trigger: scAbout,
                                scroller: '.scrollmain',
                                start: 'top 50%',
                                toggleActions: "play none none none",
                            }
                        });
                        tlAbout.from('.scabout .heading.h3.scabout .word', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: optAniText.stagger }, "0")
                            .from('.scabout .text-16.scabout .word', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: optAniText.staggerContent }, "-=0.7")
                            .from('.scabout .button.scabouthome-btn', { y: optAniText.y, opacity: 0, duration: 0.7 }, "-=0.8")
                            .from('.scabout .about-img-wrapper', { y: optAniText.y, opacity: 0, duration: 0.7 }, "0")

                    };
                    animationAboutHome();

                    function animationHowHome() {
                        const scHow = $('.schowhome');

                        let tlHow = gsap.timeline({
                            scrollTrigger: {
                                trigger: scHow,
                                scroller: '.scrollmain',
                                start: 'top 50%',
                                toggleActions: "play none none none",
                            }
                        });
                        tlHow.from('.schowhome .schow-content-wrapper', { opacity: 0, duration: optAniText.duration, })
                            .from('.schowhome .schow-content-wrapper .text-16.schow .word', { opacity: 0, duration: optAniText.duration, stagger: optAniText.stagger }, "-=0.8")
                            .from('.schowhome .button', { y: optAniText.y, opacity: 0, duration: 0.7 }, "-=0.6")

                    };
                    animationHowHome();

                    function animationProcessHome() {
                        let tl;
                        let processItems = document.querySelectorAll('.process-item');
                        for (i = 0; i < processItems.length; i++) {
                            tl = gsap.timeline({
                                scrollTrigger: {
                                    trigger: processItems[i],
                                    scroller: '.scrollmain',
                                    start: "top 70%",
                                    toggleActions: "play none none none",
                                }
                            });
                            tl.from('#processItem' + i + ' .process-item-number', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: optAniText.stagger })
                                .from('#processItem' + i + ' .h3', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: optAniText.stagger }, "-=.4")
                                .from('#processItem' + i + ' .process-body .word', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: optAniText.staggerContent }, "-=0.7")
                                .from('#processItem' + i + ' .process-item-steps .step-dot', { y: optAniText.y, opacity: 0, duration: optAniText.duration }, "-=0.7")
                                .from('#processItem' + i + ' .process-item-steps .text-14 .word', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: optAniText.stagger }, "-=0.5")
                            if (i !== 2) {
                                tl.from('#processItem' + i + ' .line', { scaleX: 0, transformOrigin: "bottom left", duration: optAniText.duration, }, "0.4")
                            }
                        }
                    };
                    animationProcessHome();

                    function animationCaseHome() {
                        const scCase = $('.sccase');

                        let tlCase = gsap.timeline({
                            scrollTrigger: {
                                trigger: scCase,
                                scroller: '.scrollmain',
                                start: 'top 50%',
                                toggleActions: "play none none none",
                            }
                        });
                        tlCase.from('.sccase .text-14', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: optAniText.stagger }, "0")
                            .from('.sccase .heading.h1 .word', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: 0.07 }, "-=.4")
                    };
                    animationCaseHome();

                    function animationProjectHome() {
                        // Reveal animation - flying
                        let tl;
                        let projectItems = document.querySelectorAll('.animate-fly');

                        for (i = 0; i < projectItems.length; i++) {
                            tl = gsap.timeline({
                                scrollTrigger: {
                                    trigger: projectItems[i],
                                    scroller: '.scrollmain',
                                    start: "top 70%",
                                    toggleClass: "action",
                                    once: true,
                                }
                            });
                        };

                        let tlProjectMore = gsap.timeline({
                            scrollTrigger: {
                                trigger: '.project-more',
                                scroller: '.scrollmain',
                                start: 'top 70%',
                            }
                        });
                        tlProjectMore.from('.project-more', { y: optAniText.y, autoAlpha: 0, duration: optAniText.duration })
                            .from('.project-more .ic-arrows', { y: optAniText.y, autoAlpha: 0, duration: optAniText.duration }, "-=.4")

                    };
                    animationProjectHome();

                };
                animateRevealHome();

                function marqueeHover() {
                    let marqueeWrapper = document.querySelector('.marquee__wrapper');
                    let marqueeLink = document.querySelector('a.marquee__item-link');
                    let marquee = document.querySelector('.marquee');
                    let marqueeInner = document.querySelector('.marquee__inner-wrap');

                    marqueeLink.addEventListener('mouseenter', (ev) => {
                        const edge = findClosestEdge(ev);
                        let EnValue,
                            EnValue2;
                        if (edge == 'top') {
                            EnValue = '-101%';
                            EnValue2 = '101%';
                        } else {
                            EnValue = '101%';
                            EnValue2 = '-101%';
                        }
                        gsap.timeline({ ease: 'expo' })
                            .set(marquee, { y: EnValue }, 0)
                            .set(marqueeInner, { y: EnValue2 }, 0)
                            .to([marquee, marqueeInner], { y: '0%', duration: 0.06 }, 0);
                    });

                    marqueeLink.addEventListener('mouseleave', (ev) => {
                        const edge = findClosestEdge(ev);
                        let EnValue,
                            EnValue2;
                        if (edge == 'top') {
                            EnValue = '101%';
                            EnValue2 = '-101%';
                        } else {
                            EnValue = '101%';
                            EnValue2 = '-101%';
                        }

                        gsap.timeline({ ease: 'expo' })
                            .to(marquee, { y: EnValue, duration: 0.06 }, 0)
                            .to(marqueeInner, { y: EnValue2, duration: 0.06 }, 0);
                    });

                    function findClosestEdge(ev) {
                        const x = ev.pageX - marqueeWrapper.offsetLeft;
                        const y = ev.pageY - marqueeWrapper.offsetTop;
                        return closestEdge(x, y, marqueeWrapper.clientWidth, marqueeWrapper.clientHeight);
                    };

                    const closestEdge = (x, y, w, h) => {
                        const topEdgeDist = distMetric(x, y, w / 2, 0);
                        const bottomEdgeDist = distMetric(x, y, w / 2, h);
                        const min = Math.min(topEdgeDist, bottomEdgeDist);
                        if (min === topEdgeDist) {
                            return 'top';
                        } else {
                            return 'bottom';
                        }
                    };

                    const distMetric = (x, y, x2, y2) => {
                        const xDiff = x - x2;
                        const yDiff = y - y2;
                        return (xDiff * xDiff) + (yDiff * yDiff);
                    };
                };
                //marqueeHover();
            };
        };
        scriptHome();

        // CONTACT PAGE SCRIPT
        //--------------------------------------------------------------------------------------------------------------------------------------------------
        function scriptContact() {
            if ($('.contactpage').length) {
                // Welcome to...
                console.log("Welcome to Contact page");

                function animateRevealContact() {
                    const scHeroContact = $('.scherocontact');

                    let tlHeroContact = gsap.timeline({
                        scrollTrigger: {
                            trigger: scHeroContact,
                            scroller: '.scrollmain',
                            start: 'top top',
                            toggleActions: "play none none none",
                            end: 'bottom',
                        }
                    });
                    tlHeroContact.from('.scherocontact .scherocontact-sub-title .word', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: optAniText.stagger }, "0")
                        .from('.scherocontact .scherocontact-title .word', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: 0.07 }, "-=0.7")
                        .from('.scherocontact .text-14.scherocontact .word', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: optAniText.stagger }, "0.5")
                        .from('.scherocontact #currentTimeContact .word', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: optAniText.stagger }, "0.7")
                        .from('.scherocontact .text-20.scherocontact .word', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: optAniText.stagger }, "0.9")
                        .from('.scherocontact .scherocontact-sub .word', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: optAniText.staggerContent }, "0.8")
                        .from('.scherocontact .scherocontact-link .word', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: optAniText.staggerContent }, "-=0.7")
                        .from('.scherocontact .line.scherocontact', { scaleX: 0, transformOrigin: 'bottom left', duration: 0.9 }, "0.3")
                    tlHeroContact.play();

                };
                //animateRevealContact();

                function formActive() {
                    function customInput(field, machine) {
                        let input = document.querySelector(field);
                        let widthMachine = document.querySelector(machine);
                        if (input.value == "") {
                            widthMachine.innerHTML = input.placeholder;
                        } else {
                            widthMachine.innerHTML = input.value;
                        }
                        input.addEventListener("input", () => {
                            widthMachine.innerHTML = input.value;
                            if (input.value == "") {
                                widthMachine.innerHTML = input.placeholder;
                            }
                        });
                    };
                    customInput(".input-field.name.page", ".width-machine.name.page");
                    customInput(".input-field.company.page", ".width-machine.company.page");
                    customInput(".input-field.email.page", ".width-machine.email.page");
                    //customInput(".input-field.phonenumber", ".width-machine.phonenumber");              

                    let textarea = document.querySelector(".input-textarea.message.page");
                    textarea.rows = "1";
                    textarea.style.height = (textarea.scrollHeight + 2) + "px";
                    textarea.addEventListener('input', () => {
                        if (textarea.scrollHeight < 600) {
                            textarea.style.overflow = "hidden";
                        } else {
                            textarea.style.overflow = "visible";
                        }
                        textarea.style.height = (textarea.scrollHeight + 2) + "px";
                    });

                    $('#wf-form-contact-form').submit(function (evt) {
                        evt.preventDefault();
                        setTimeout(() => {
                            $('.form-success-wrap.page').addClass('show');
                        }, 500);
                        $('.form-success-close.page').click(() => {
                            $('.form-success-wrap.page').removeClass('show');
                        })
                        setTimeout(() => {
                            $('.form-success-wrap.page').removeClass('show');
                        }, 8000);
                    });
                };
                //formActive();
                function newFormActive() {
                    $('.scherocontact-inner').on('submit', function (evt) {
                        console.log('submitttttt')
                        evt.preventDefault();
                        setTimeout(() => {
                            $('.form-success-wrap.page').addClass('show');
                        }, 500);
                        $('.form-success-close.page').click(() => {
                            $('.form-success-wrap.page').removeClass('show');
                        })
                        setTimeout(() => {
                            $('.form-success-wrap.page').removeClass('show');
                        }, 8000);
                    });
                };
                newFormActive();
            }
        };
        scriptContact();

        // CONTACT PAGE SCRIPT
        //--------------------------------------------------------------------------------------------------------------------------------------------------
        function scriptService() {
            if ($('.servicepage').length) {
                // Welcome to...
                console.log("Welcome to Service page");
                function swiperServiceTeam() {
                    const swiperTeam = new Swiper('.team-process', {
                        slidesPerView: 1,
                        spaceBetween: 32,                        
                        navigation: {
                            nextEl: '.nav-right',
                            prevEl: '.nav-left',
                        }
                    });
                    //swiperTeam.slideTo(1,300,false)
                };
                //swiperServiceTeam();
            }
        };
        scriptService();

        function scriptFaq() {
            if ($('.faqpage').length) {
                function accordionFaq() {
                    //$('.faq-ans-wrap').slideUp();

                    $('.faq-ques-wrap').on('click', function(e) {
                        e.preventDefault();
                        if ($(this).hasClass('active')) {
                            $('.faq-ques-wrap').removeClass('active');
                            $('.faq-ans-wrap').slideUp();
                            setTimeout(() => {
                                scrollmain.update();
                            }, 400);
                        } else {
                            $('.faq-ques-wrap').removeClass('active');
                            $('.faq-ans-wrap').slideUp();
                            $(this).addClass('active');
                            $(this).parent().find('.faq-ans-wrap').slideDown();
                            setTimeout(() => {
                                scrollmain.update();
                            }, 400);
                        }
                    })
                }
                accordionFaq();
            }
        }
        scriptFaq();
        // BLOGS PAGE SCRIPT
        //--------------------------------------------------------------------------------------------------------------------------------------------------
        function scriptBlogs() {
            if ($('.blogspage').length) {
                //window.location.replace("https://mission.plus")
                // Welcome to...
                console.log("Welcome to Blogs page");

                let blogTabs = $('.filter-button');
                blogTabs.click(function (e) {
                    e.preventDefault();
                    scrollmain.scrollTo(0, 0);
                    setTimeout(() => {
                        scrollmain.update();
                    }, 300);
                    blogTabs.removeClass('filter-active');
                    $(this).addClass('filter-active');
                });
                $('.pagination-container').on("click", function () {
                    console.log('click')
                    scrollmain.update();
                });

                function fsInit() {
                    // create a new Library instance and store it in a variable called "customBlogPosts"
                    let fsMagic = new FsLibrary('.collection-list-all')
                    // run the loadmore Library component on your instance
                    fsMagic.loadmore({
                        button: ".load-more-button", // class of Webflow Pagination button
                        resetIx: true, // adds Webflow interactions to newly loaded item
                        loadAll: true,
                        paginate: {
                            enable: true,
                            itemsPerPage: 4,
                            insertPagination: '.pagination-container',
                        },
                        animation: {
                            enable: false,
                        }
                    })
                    let myFilters = [
                        {
                            filterWrapper: '.filter-wrapper',
                            filterByClass: ".post-info-categories .category",
                            filterType: 'exclusive'
                        }
                    ]
                    fsMagic.filter({
                        filterArray: myFilters,
                        animation: {
                            enable: false,
                            // duration: 300,
                            // easing: 'ease',
                            // effects: 'fade'
                        }
                    })
                };

                let blogsCategory = $('.post-info-categories');
                blogsCategory.click(function (e) {
                    e.preventDefault();
                    let filter = $(this).text();
                    console.log(filter);
                    document.getElementById('filter' + filter).dispatchEvent(new Event('click'));
                    console.log("clicked");
                });
            }
        };
        scriptBlogs();

        function scriptBlogDetail() {
            if ($('.blogdetailpage').length) {
                let currentUrl = window.location.href;
                $('[data-share=facebook').attr("href", `http://www.facebook.com/sharer.php?u=${currentUrl}`);
                $('[data-share=twitter').attr("href", `http://twitter.com/share?url=${currentUrl}`);
                $('[data-share=linkedin').attr("href", `http://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`);
                function copyText() {
                    let input = document.createElement("textarea");
                    input.value = currentUrl;
                    document.body.appendChild(input);
                    input.select();
                    document.execCommand("Copy");
                    input.remove();
                };
                $('[data-share=url]').on('click', (e) => {
                    e.preventDefault();
                    copyText();
                    $(e.target).find('.button-share-text').text('copied');
                    setTimeout(() => {
                        $(e.target).find('.button-share-text').text('copy link');
                    }, 4000)
                });
            }
        };
        scriptBlogDetail();

        // CASE STUDIES PAGE SCRIPT
        //--------------------------------------------------------------------------------------------------------------------------------------------------
        function scriptCases() {
            if ($('.casespage').length) {
                // Welcome to...
                console.log("Welcome to Case Studies page");

                function animateRevealCases() {

                    const scHeroCases = $('.scherocases');

                    let tlHeroCases = gsap.timeline({
                        scrollTrigger: {
                            trigger: scHeroCases,
                            scroller: '.scrollmain',
                            start: 'top top',
                            toggleActions: "play none none none",
                            end: 'bottom',
                        }
                    });
                    tlHeroCases.from('.scherocases .scherocases-title .word', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: 0.07 }, "0")
                        .from('.scherocases .scherocases-sub .word', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: optAniText.staggerContent }, "0.2")
                        .from('.scherocases .scherocases-btn', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: optAniText.staggerContent }, "-=0.9")
                    //.from('.scherocontact .line.scherocontact', {scaleX: 0, transformOrigin: 'bottom left', duration: 0.9}, "0.3")
                    tlHeroCases.play();
                };
                animateRevealCases();
            }
        };
        scriptCases();

        function scriptProcess() {
            if ($('.processpage').length) {
                //window.location.replace("https://mission.plus")
                // Welcome to...
                console.log("Welcome to Process page");

                let processMenu = $('.contentprocess-menu-item');
                processMenu.click(function (e) {
                    e.preventDefault();
                    let target = $(this).attr('data-item');
                    scrollmain.scrollTo(target);
                });

                function animateRevealProcess() {
                    const scHeroProcess = $('.scheroprocess');

                    let tlHeroProcess = gsap.timeline({
                        scrollTrigger: {
                            trigger: scHeroProcess,
                            scroller: '.scrollmain',
                            start: 'top top',
                            toggleActions: "play none none none",
                            end: 'bottom',
                        }
                    });
                    tlHeroProcess.from('.scheroprocess .scheroprocess-title .word', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: 0.07 }, "0")
                        .from('.scheroprocess .scheroprocess-sub .word', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: optAniText.staggerContent }, "0.2")
                        .from('.scheroprocess .scheroprocess-btn', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: optAniText.staggerContent }, "-=0.9")
                    tlHeroProcess.play();
                };
                animateRevealProcess();
            }
        };
        scriptProcess();

        function scriptCaseDetail() {
            if ($('.casedetailpage').length) {
                // Welcome to...
                console.log("Welcome to Case Detail page");

                function heroSlide() {
                    const swiper = new Swiper('.swiper', {
                        slidesPerView: 1,
                        spaceBetween: 32,
                        loop: true,
                        navigation: {
                            nextEl: '.swiper-next',
                            prevEl: '.swiper-prev',
                        },
                    });
                };
                heroSlide();
                function sidebarScrollTo() {
                    $('.casedetail-cat-link').on('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        let detailTarget = e.target.getAttribute('data-casedetail');
                        console.log(detailTarget);
                        scrollmain.scrollTo(detailTarget);
                        setTimeout(() => {
                            scrollmain.update();
                        }, 500);
                    });
                };
                sidebarScrollTo();

                function prevNext() {
                    console.log('triggered');
                    // create a new Library instance and store it in a variable called "fsPreviousNext"
                    var fsPreviousNext = new FsLibrary('.prevnext-hidden') // Class of your CMS collection list to search for previous/next
                    // run prevNext on our instance
                    fsPreviousNext.prevnext({
                        nextTarget: ".next-box", // the div that the Next item should go
                        previousTarget: ".prev-box", // the div that the Previous item should go
                        contentId: ".post-id", // the unique id that identifies which item in your CMS Collection is the current item
                    });
                };
                prevNext();

                setTimeout(() => {
                    scrollmain.update();
                }, 2000);
            };
        };
        scriptCaseDetail();

        function scriptJoin() {
            if ($('.joinpage').length) {
                console.log('welcome to join page')
                $('.job-main-item-content').slideUp();
                $('.job-main-item-inner').on('click', function (e) {
                    e.preventDefault();
                    scrollmain.update();
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active');
                        $(this).parent().find('.job-main-item-content').slideUp();
                    } else {
                        $('.job-main-item-inner').removeClass('active');
                        $('.job-main-item-content').slideUp();
                        $(this).addClass('active');
                        $(this).parent().find('.job-main-item-content').slideDown();
                    }
                    setTimeout(() => {
                        scrollmain.update();
                    }, 400);
                    setTimeout(() => {
                        scrollmain.update();
                    }, 1000);
                });

                $('.scjobmain-btn').on('click', function (e) {
                    e.preventDefault();
                    let thisJobTitle = $(this).closest('.job-join-main-item').find('.job-join-main-title').text();
                    $('.popup-job .popup-job-title').text(thisJobTitle);
                    $('input.id-position').val(thisJobTitle);
                    $('.popup-job').addClass('show');
                });  
            };
        };
        scriptJoin();
    };
    
    $('.job-popup-close').on('click', function (e) {
        e.preventDefault();
        $('.popup-job').removeClass('show');
        $('.upload-tooltip-text').removeClass('hidden')
        $('.ic-close-file').addClass('hidden');
        $('.upload-file-wrapper').find('input[type=file]').val("");
        $('.upload-file-wrapper').find('.btn-upload-text').text('Upload CV');
        $('.btn-job-form .button-text').text('Submit')
        $('#job-form').trigger('reset')
    });
    const fileEle = initBtnUploadFile();
    $('.scjobform-btn').on('click', function (e) {
        e.preventDefault();
        const file = fileEle.getFile();
        if (file) {
            $('.btn-job-form').find('.button-text').text('Please wait...')
            console.log('loading upload file to gg drive start')
            uploadFile(file, 'career').then(result => {
                const fileUrl = result.url;
                $('.id-url').val(fileUrl);
                //$('.btn-job-form').find('.button-text').text('Submit')
                $('#job-form').submit()
            })
        } else {
            $('#job-form').submit()
        }
    })
    function initBtnUploadFile() {
        const currentTextUpload = $('.upload-file-wrapper').find('.btn-upload-text').clone().text();
        const maxAllowedSize = 10 * 1024 * 1024;
        const resetBtnUploadFile = (ele) => {
            $('.upload-tooltip-text').removeClass('hidden')
            $('.ic-close-file').addClass('hidden');

            ele.find('input[type=file]').val("");
            ele.find('.btn-upload-text').text(currentTextUpload);
        }

        const handleUploadFile = (ele, file) => {
            $('.upload-tooltip-text').addClass('hidden')
            $('.ic-close-file').removeClass('hidden');

            const fileName = shortedFileName(file.name);
            ele.find('.btn-upload-text').text(fileName);
        }
        $(".btn-upload").on("click", function (e) {
            e.preventDefault();
            $(this).find('.btn-upload-text').text('Uploading...')
            $(this).closest(".upload-file-wrapper").find('input[type=file]').click();
        })
        $('.ic-close-file').on("click", function () {
            const wrapper = $(this).closest('.upload-file-wrapper');
            resetBtnUploadFile(wrapper);
        })
        $('input[type=file]').change(function () {
            const file = $(this).get(0).files[0] //the file
            if (file.size > maxAllowedSize) {
                alert('Maximum allowed size file');
                return;
            }
            const wrapper = $(this).closest('.upload-file-wrapper');
            if (!file) {
                resetBtnUploadFile(wrapper);
                return;
            };
            handleUploadFile(wrapper, file)
        })

        return {
            reset: () => resetBtnUploadFile($('.upload-file-wrapper')),
            upload: () => $(".upload-file-wrapper .btn-upload").trigger("click"),
            getFile: () => $('input[type=file]').get(0).files[0]
        }
    };
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
    };
    function shortedFileName(name, size = 16) {
        const splitFile = name.split('.');
        function truncate(source, size) {
            return source.length > size ? source.slice(0, size - 1) + "â€¦" : source;
        }
        return `${truncate(splitFile[0], size)}.${splitFile[1]}`;
    }
    scriptAllPage();

    console.log('all loaded');
    document.getElementById("hideAll").style.display = "none";
    
    
};
window.onload = Script();