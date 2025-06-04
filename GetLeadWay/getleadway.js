
const bpScript = () => {
    const lenis = new Lenis()
    const raf = (time) => {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    $isOpenHeader = true;
    $isOpenMenu = false;
    $isLoaded = false;

    const isTablet = $(window).width() > 767 && $(window).width() < 1199
    const isMobile = $(window).width() < 767
    const isDesktop = $(window).width() > 991


    const globalScript = async () => {
        helper.refreshOnBreakpoint();
        handleLoading()
        handleActionHeader()
        handleAnchorRichText()
        handleFrameMask()
        // handleMaskText()


        const listHeaderItems = $('.header-nav-item')
        let preIndex = null


        $('.footer-bottom-btn-gtop-inner').on('click', function () {
            helper.smoothScrollTo(0, 600)
        });

        if (isDesktop) {
            listHeaderItems.each(function (index, item) {
                const $item = $(item);
                const $navWrap = $item.find('.home-nav-item-dropdown');

                $item.on('mouseover', function () {
                    if (preIndex !== index) {
                        $(listHeaderItems[preIndex]).removeClass('active');
                    }
                    $item.addClass('active');
                    preIndex = index;
                });

                $item.on('mouseleave', function () {
                    $item.removeClass('active');
                });

                helper.handleClickOutSide({
                    element: item,
                    action: function () {
                        $item.removeClass('active');
                    }
                });
            });

        } else {
            //Header 
            gsap.set('.header-nav-wrap', { height: 0, opacity: 0, pointerEvents: 'none' })
            helper.handleClickOutSide({
                element: $('.header').get(0),
                action: () => {
                    if ($isOpenMenu) {
                        hideMenu()
                        $isOpenMenu = false
                    }
                }
            });

            $('.header-menu-mb').click(function () {
                $isOpenMenu = !$isOpenMenu;
                if ($isOpenMenu) {
                    showMenu()
                } else {
                    hideMenu()
                }
            })

            $('.home-nav-item-dropdown').slideUp()
            $('.header-nav-item').each(function () {
                const $this = $(this);
                const $accordContent = $this.find('.home-nav-item-dropdown');
                $this.on('click', function () {

                    if ($this.hasClass('active')) {
                        $this.removeClass('active');
                        $accordContent.slideUp();
                    } else {
                        $('.header-nav-item').removeClass('active');
                        $('.home-nav-item-dropdown').slideUp()
                        $this.addClass('active');
                        $accordContent.slideDown();
                    }
                })
            })
        }
        //Footer
        if ($('.footer-bottom-item-col').length && isMobile) {
            $('.footer-bottom-item-listchild').slideUp()
            $('.footer-bottom-item-col').each(function () {
                const $this = $(this);
                const $accordContent = $this.find('.footer-bottom-item-listchild');
                const $icon = $this.find('.btn-icon-rotate');


                $this.on('click', function () {
                    if ($this.hasClass('active')) {
                        $this.removeClass('active');
                        $icon.removeClass('active');
                        $accordContent.slideUp();
                    } else {
                        $('.footer-bottom-item-col').removeClass('active');
                        $('.btn-icon-rotate').removeClass('active');
                        $('.footer-bottom-item-listchild').slideUp()

                        $this.addClass('active');
                        $icon.addClass('active');
                        $accordContent.slideDown();
                    }
                })
            })
        }
    }

    const helper = {
        parseRem: (input) => {
            return input / 10 * parseFloat(window.getComputedStyle(document.querySelector('html')).getPropertyValue("font-size"));
        },
        convertRemToPx: (px) => {
            const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            return px * rootFontSize;
        },
        MathMap: (x, a, b, c, d) => {
            return parseFloat((((x - a) * (d - c)) / (b - a) + c).toFixed(3));
        },
        debounce: (func, delay = 100) => {
            let timer;
            return (event) => {
                if (timer) clearTimeout(timer);
                timer = setTimeout(func, delay, event);
            };
        }, refreshOnBreakpoint: () => {
            let initialViewportWidth =
                window.innerWidth || document.documentElement.clientWidth;
            // portrait mobile viewport initial, any change refresh
            if (initialViewportWidth < 480) {
                $(window).on(
                    "resize",
                    helper.debounce(function () {
                        newViewportWidth =
                            window.innerWidth || document.documentElement.clientWidth;
                        if (newViewportWidth > 479) {
                            location.reload();
                        }
                    })
                );
            }
            // landscape mobile viewport initial, any change refresh
            else if (initialViewportWidth < 768) {
                $(window).on(
                    "resize",
                    helper.debounce(function () {
                        newViewportWidth =
                            window.innerWidth || document.documentElement.clientWidth;
                        if (newViewportWidth > 767) {
                            location.reload();
                        }
                    })
                );
            }
            // tablet viewport initial, any change refresh
            else if (initialViewportWidth > 767 && initialViewportWidth < 992) {
                $(window).on(
                    "resize",
                    helper.debounce(function () {
                        newViewportWidth =
                            window.innerWidth || document.documentElement.clientWidth;
                        if (newViewportWidth < 768 || newViewportWidth > 991) {
                            location.reload();
                        }
                    })
                );
            }
            // web viewport initial, any change refresh
            else if (initialViewportWidth > 991) {
                $(window).on(
                    "resize",
                    helper.debounce(function () {
                        newViewportWidth =
                            window.innerWidth || document.documentElement.clientWidth;
                        if (newViewportWidth < 992) {
                            location.reload();
                        }
                    })
                );
            }
        },
        handleClickOutSide: ({ element, action }) => {
            const listener = (event) => {
                if (!element || element.contains(event.target)) {
                    return;
                }
                action();
            }
            document.addEventListener('mousedown', listener, { passive: true });
            document.addEventListener('touchstart', listener, { passive: true });
        },
        convertPxToRem: (px) => {
            const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            return px / rootFontSize;
        },
        smoothScrollTo: (top, duration) => {
            const start = window.pageYOffset;
            const startTime = performance.now();

            function scroll(timestamp) {
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeInOut = progress < 0.5
                    ? 2 * progress * progress
                    : -1 + (4 - 2 * progress) * progress;

                window.scrollTo(0, start + (top - start) * easeInOut);

                if (elapsed < duration) {
                    requestAnimationFrame(scroll);
                }
            }

            requestAnimationFrame(scroll);
        },
        isLoaded: ({ play, element }) => {
            const rect = element.offset();
            const isInViewPort = rect.top >= 0 && rect.top <= $(window).height()

            let idRequest

            if (isInViewPort) {
                handleLoaded();
            } else {
                play();
            }
            function handleLoaded() {
                if ($isLoaded) {
                    play();
                    idRequest && cancelAnimationFrame(idRequest);
                } else {
                    idRequest = requestAnimationFrame(handleLoaded);
                }
            }
        },
    }

    class BeforeLoad {
        constructor(as) {
            this.cbs = [];
        }
        pushCbs = function (cb) {
            this.cbs.push(cb);
        }
        callCbs = function () {
            if (this.cbs) {
                this.cbs.forEach((cb) => cb());

            }
        }
    }

    class SvgInsert {
        constructor(img, imgWrap) {
            this.img = img
            this.imgWrap = imgWrap
        }
        async initSvg() {
            if (!this.img) return
            const srcSvg = this.img.getAttribute('src')

            await fetch(srcSvg)
                .then((response) => response.text())
                .then((svgContent) => {
                    this.renderSvg(svgContent);
                })
                .catch((error) => console.error('Error loading SVG:', error));
        }
        renderSvg(svgContent) {
            if (!svgContent) return
            const svgWrap = document.createElement('div');
            svgWrap.innerHTML = svgContent;
            svgWrap.classList.add('svg-wrap');
            this.img.parentNode.prepend(svgWrap)
            this.img.remove()
            const svgInner = svgWrap.querySelector('svg');
            svgInner.setAttribute('style', 'width: 100%; height: auto; overflow:visible');
        }
    }
    const _BeforeLoad_ = new BeforeLoad()

    const handleReset = () => {
        setTimeout(() => {
            ScrollTrigger.refresh()
        }, 1000)
    }
    const hideMenu = () => {
        const headerTextWrap = gsap.utils.toArray('.header-menu-mb-inner-txt');

        gsap.to('.header-nav-wrap', {
            ease: 'power3.out',
            duration: 0.8,
            height: 0,
            opacity: 0,
            overwrite: 'auto',
            pointerEvents: 'none'
        })
        gsap.to(headerTextWrap[1], {
            yPercent: -200,
            ease: 'power3.out',
            duration: 0.8,
            overwrite: 'auto',

        })
        gsap.fromTo(headerTextWrap[0], {
            yPercent: 100,
        },
            {
                yPercent: 0,
                ease: 'power3.out',
                duration: 0.8,
                overwrite: 'auto',
            })
    }

    const showMenu = () => {
        const headerTextWrap = gsap.utils.toArray('.header-menu-mb-inner-txt');

        gsap.fromTo('.header-nav-wrap', {
            heigth: 0,
            opacity: 0,
            pointerEvents: 'none'
        }, {
            height: 'auto',
            duration: 0.8,
            ease: 'power3.out',
            opacity: 1,
            overwrite: 'auto',
            pointerEvents: 'all'

        })

        gsap.fromTo(headerTextWrap, {
            yPercent: 0,
        }, {
            yPercent: -100,
            ease: 'power3.out',
            duration: 0.6,
            overwrite: 'auto',
            duration: 0.8,
        })
    }
    const handleActionHeader = () => {
        let lastScrolling = null
        $header = $('.header')
        $sectionSection = $('.main').find('section').eq(1)
        $isDarkMode = $header.data('mode-header') === 'dark'
        // set color header when scolling leave hero
        $isDarkMode && (
            gsap.to($header.find('.header-wrap'), {
                backgroundColor: '#ffffff00',
                duration: 0,
            }),
            ScrollTrigger.create({
                trigger: $sectionSection,
                start: () => {
                    return `top-=${$header.outerHeight()} top`
                },
                scrub: 1,
                onEnter: () => {
                    gsap.to($header.find('.header-wrap'), {
                        backgroundColor: '#041942',
                        duration: 0,
                    })
                },
                onLeaveBack: () => {
                    gsap.to($header.find('.header-wrap'), {
                        backgroundColor: '#ffffff00',
                        duration: 0,
                    })
                }
            })
        )
        window.addEventListener('scroll', () => {
            const currentScrolling = window.pageYOffset || document.documentElement.scrollTop || 0;

            if (lastScrolling < currentScrolling || !$isOpenHeader) {
                $('.header').addClass('hide-header')
                $('.header-nav-item').removeClass('active')
                if ($isOpenMenu) {
                    hideMenu()
                    $isOpenMenu = false
                }

            } else if (lastScrolling > currentScrolling && $isOpenHeader) {
                $('.header').removeClass('hide-header')
            }

            lastScrolling = currentScrolling
        })
    }
    const handleAnchorRichText = () => {
        $('.rich-text-basic').find('a').attr('class', 'hover_line_active txt-medium');
    }

    const handleSwiperCaseStudy =
        ({ section = 'home-casestudy',
            perViewDesktop = 2.4,
            gapDesktop = helper.parseRem(32),
            gapTablet = helper.parseRem(16),
            gapMobile = helper.parseRem(8),
            perViewMobile = 1.022857,
            perViewTablet = 2 }) => {
            const isNonePagination = $(`.${section}-swiper`).attr('data-swiper-pagi')

            $isStoped = false
            const handleSwiperCaseStudy = new Swiper(`.${section}-swiper`, {
                slidesPerView: perViewMobile,
                spaceBetween: gapMobile,
                mousewheel: {
                    forceToAxis: true,
                    enabled: true,

                },
                navigation: {
                    prevEl: `.${section}-btn-prev`,
                    nextEl: `.${section}-btn-next`,
                    disabledClass: 'swiper-button-disabled'
                },
                createElements: true,
                pagination: !isNonePagination && isMobile ? true : false,
                breakpoints: {
                    767: {
                        slidesPerView: perViewTablet,
                        spaceBetween: gapTablet,
                    },
                    992: {
                        slidesPerView: perViewDesktop,
                        spaceBetween: gapDesktop,
                    },
                },

            })
            return handleSwiperCaseStudy
        }
    const handleSetItemFAQ = ({
        wrapItem = 'home-faq-item',
        wrapItemContent = 'home-faq-item-content-decswrap',

    }) => {

        if ($(`.${wrapItem}`).length >= 1) {
            $(`.${wrapItemContent}`).slideUp()
            $(`.${wrapItem}`).each(function () {

                const $this = $(this);
                const $accordContent = $this.find(`.${wrapItemContent}`);
                const $icon = $this.find('.btn-icon-rotate');

                $this.on('click', function () {
                    if ($this.hasClass('active')) {
                        $this.removeClass('active');
                        $icon.removeClass('active');
                        $accordContent.slideUp();
                    } else {
                        $('.btn-icon-rotate').removeClass('active');
                        $(`.${wrapItem}`).removeClass('active');
                        $(`.${wrapItemContent}`).slideUp()
                        $this.addClass('active');
                        $icon.addClass('active');
                        $accordContent.slideDown();
                    }
                })
            })
        }
    }

    const handleMarque = () => {
        $homeMarquee = $('.home-hero-partner-list')
        $homeMarqueeItem = $homeMarquee.children();

        // let totalItems = $homeMarqueeItem.length;
        // for (let i = 0; i < 1; i++) {
        // for (let j = 0; j < totalItems; j++) {
        //     $homeMarqueeItem.eq(j).clone().appendTo($homeMarquee);
        // }
        // } 

        let storeMarquee = {
            scrollWidth: 0,
            velocityScroller: 0,
            refSeter: gsap.quickSetter($homeMarquee, 'x', '%'),
            initialOffset: 100,
            direction: $homeMarquee.data('direction') === 'right' ? 1 : -1

        }
        const onLoop = () => {
            storeMarquee.scrollWidth +=
                0.05 * storeMarquee.direction + storeMarquee.velocityScroller;
            storeMarquee.refSeter(storeMarquee.scrollWidth % storeMarquee.initialOffset);
            requestAnimationFrame(onLoop);
        }

        setTimeout(() => {
            requestAnimationFrame(onLoop);
        }, 1000)

    }
    const _handleHoverCardServices = () => {
        $cardServices = $('.home-services-item')

        $cardServices.each(function () {
            var $btnCardServices = $(this).find('.home-services-content-btn');

            $(this).on('mouseenter', function () {
                const data = $btnCardServices.get(0)
                gsap.fromTo($btnCardServices.get(0), {
                    opacity: 0,
                    yPercent: 50
                }, {
                    opacity: 1,
                    yPercent: 0,
                    ease: 'power3.out',
                    duration: 0.6,
                    pointerEvents: 'auto'
                });
            });

            $(this).on('mouseleave', function () {
                gsap.to($btnCardServices.get(0), {
                    opacity: 0,
                    yPercent: -25,
                    ease: 'power3.out',
                    duration: 0.6,
                    pointerEvent: 'none'
                });
            });
        });

    }

    const handleStackCard = (section = 'home') => {
        let cardHeight = helper.convertRemToPx(22.1);
        const cards = gsap.utils.toArray(`.${section}-factional-content-item`)
        const cardsInner = gsap.utils.toArray(`.${section}-factional-content-item-bdwrap`)
        const animation = gsap.timeline();

        const initCards = () => {
            animation.clear();
            cardHeight = cards[0].offsetHeight;


            const tlWrap = gsap.timeline({
                scrollTrigger: {
                    trigger: `.${section}-factional-content-wrap`,
                    start: 'top top',
                    end: () => {
                        return `bottom center-=${cardHeight}`
                    },
                    scrub: 1,
                }
            })
            cards.forEach((card, index, args) => {
                const cardInner = card.querySelector(`.${section}-factional-content-item-inner-content`)
                const scale = helper.MathMap(index - 1, 0, cards.length - 2, 0.8, 1)

                gsap.set(
                    cards[index],
                    {
                        y: helper.MathMap(index, 0, cards.length - 1, 0, helper.convertRemToPx(12)),
                        duration: index * 0.5,
                        ease: 'none',
                        top: `${window.innerHeight / 2 - cardHeight + helper.convertRemToPx(1.2) - helper.convertRemToPx(9 - 5.6)}px`,
                        willChange: 'transform'
                    },
                );
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: () => {
                            const topStart = (window.innerHeight - cardHeight) / 4
                            // return `top top+=${topStart}`
                            return `top center+=${cardHeight / 2}`
                        },
                        end: `+=${(args.length - index) * cardHeight} `,
                        scrub: 1,
                    }
                })

                tl.to(
                    cardsInner[index],
                    {
                        scale: scale,
                        transformOrigin: 'top center',
                        ease: 'power3',

                    },
                )

                if (index !== cards.length - 1) {
                    tlWrap.to(
                        cardInner,
                        { opacity: 0, willChange: 'opacity', delay: -0.1, ease: 'power3.out' },
                        '>'
                    )
                }

            });
        }

        if (isDesktop) {
            initCards()
            // handle check header services 
            const initPinHeader = ScrollTrigger.create({
                trigger: `.${section}-factional-contennt-tab`,
                pin: true,
                endTrigger: `.${section}-factional-content-lists-inner`,
                start: () => {
                    const heightTabs = document.querySelector(`.${section}-factional-contennt-tab`).clientHeight
                    const topStart = (window.innerHeight - cardHeight) / 4 - heightTabs

                    return `top top+=${topStart}`
                },
                end: () => {
                    const px = helper.convertRemToPx(12);

                    return `bottom center-=${px / 2}`

                },
                scrub: true,
                pinSpacing: false,
                onEnter: () => {
                    $isOpenHeader = false
                },
                onEnterBack: () => {
                    $isOpenHeader = false
                },
                onLeave: () => {
                    $isOpenHeader = true
                },
                onLeaveBack: () => {
                    $isOpenHeader = true
                },
            });


            ScrollTrigger.create({
                trigger: `.${section}-problem`,
                once: true,
                start: 'top top',
                onEnter: () => {
                    initPinHeader.refresh()
                    ScrollTrigger.refresh()
                },
                onEnterBack: () => {
                    initPinHeader.refresh()
                    ScrollTrigger.refresh()
                }
            })

        } else {
            const el = $(`.${section}-factional [data-swiper=swiper]`);
            el.addClass('swiper');
            el.find('[data-swiper=wrapper]').addClass('swiper-wrapper');
            el.find('[data-swiper=slide]').addClass('swiper-slide');

            const swiper = new Swiper(el[0], {
                slidesPerView: 1.0228,
                spaceBetween: helper.parseRem(8),
                pagination: false,
                breakpoints: {
                    767: {
                        slidesPerView: 2.22,
                    },
                }
            });
        }
    }
    const handleProblem = (section = 'home', parent = 'home-problem') => {
        let tlHomeProblem
        let indexCurrent = 0;
        const listInner = $(`.${section}-problem-lists-inner`);
        const listProblemItems = $(`.${section}-problem-item`);
        const textScrolling = $(`.${section}-problem-title`);
        let textSpliter = new SplitText(textScrolling[0], { types: 'chars,words' });
        const groupIconFloat = $(`.home-problem-img-inner-section-item`);
        const listImages = Array.from($('.about-problem-img-item'))


        const isHomePage = section === 'home'

        if (!listInner) return

        const numDistance = () => {
            const listWrap = $(`.${section}-problem-lists`);
            const listItem = listInner.children();
            let totalHeight = 0;
            listItem.each(function () {
                totalHeight += $(this).height();
            });
            totalHeight += helper.convertRemToPx(1.2) * (listItem.length - 1);

            if (totalHeight > listWrap.height()) {
                return (totalHeight - listWrap.height()) / (listItem.length - 1);
            } else {
                return 0;
            }
        };
        const handleClickProblemItem = () => {
            listProblemItems.each(function (index) {
                const progress = helper.MathMap(index, 0, listProblemItems.length - 1, 0.15, 0.85);
                $(this).on('click', function () {
                    if (!tlHomeProblem) return;

                    const controller = tlHomeProblem.scrollTrigger;
                    controller.scroll(controller.start + progress * (controller.end - controller.start));
                });
            });

        };
        const handleClickFloatIcon = (idx) => {
            groupIconFloat.each(function (index) {
                $(this).addClass('active');

                const listIcon = $(this).find(`.${section}-problem-img-inner-ic`);
                if (index === idx) {
                    gsap.killTweensOf([...listIcon]);
                    listIcon && gsap.to(listIcon, {
                        opacity: 1,
                        ease: 'ease',
                        duration: 1.2,
                        overwrite: 'auto',
                        stagger: {
                            each: 0.1,
                            from: 'random'
                        },
                        willChange: 'opacity, transform',

                    });
                } else {
                    gsap.killTweensOf([...listIcon]);

                    listIcon && gsap.to(listIcon, {
                        opacity: 0,
                        ease: 'none',
                        duration: 0.2,
                        overwrite: 'auto',
                        // stagger: 0.025,

                    });
                }
            });
        };
        const handleSetTopPositionWrap = () => {
            // waiting setup show one item, after set calc position 
            setTimeout(() => {
                const wrapPinning = $(`.${parent}-wrap`);
                const heightWrap = wrapPinning.children().first().height();
                const top = (window.innerHeight - heightWrap) / 2;
                wrapPinning.css({
                    top: `${top}px`,
                    marginBottom: `-${top}px`
                });
            }, 300);
        };
        const setIndexCurrent = (newValue) => {
            const distance = numDistance() * newValue;
            listInner && gsap.to(listInner, {
                y: `-${distance}`,
                ease: 'power1.out',
                duration: 0.8,
                willChange: 'transform'
            });

            listProblemItems.each(function (index) {
                const accorItem = $(this).find(`.${section}-problem-item-decs-wrap`);
                const btnLearn = $(this).find(`.${section}-problem-item-btn`);

                const handleShow = () => {
                    accorItem.length > 0 && gsap.to(accorItem, {
                        height: 'auto',
                        opacity: 1,
                        overflow: 'hidden',
                        overwrite: 'auto',
                        duration: 0.8,
                        ease: 'power3',
                        willChange: 'height, opacity'
                    });
                    btnLearn.length > 0 && gsap.to(btnLearn, {
                        height: 'auto',
                        opacity: 1,
                        overflow: 'hidden',
                        overwrite: 'auto',
                        duration: 0.4,
                        ease: 'power3',
                        willChange: 'height, opacity'
                    });
                    if (listImages.length) {
                        gsap.to(listImages[index], {
                            opacity: 1,
                            ease: 'power3',
                            duration: 1.2,
                            overwrite: 'auto',
                            willChange: 'opacity',
                        })
                    }
                };

                const handleHide = () => {
                    accorItem.length > 0 && gsap.to(accorItem, {
                        height: 0,
                        opacity: 0,
                        duration: 1,
                        overflow: 'hidden',
                        overwrite: 'auto',
                        ease: 'power3',
                        willChange: 'height, opacity',

                    });
                    btnLearn.length > 0 && gsap.to(btnLearn, {
                        height: 0,
                        opacity: 0,
                        duration: 0.4,
                        overflow: 'hidden',
                        overwrite: 'auto',
                        ease: 'power3',
                        willChange: 'height, opacity'
                    });
                    if (listImages.length) {
                        gsap.to(listImages[index], {
                            opacity: 0,
                            ease: 'power3',
                            duration: 0.8,
                            overwrite: 'auto',
                            willChange: 'opacity',
                        })
                    }
                };

                if (index === newValue) {
                    $(this).addClass('active');
                    handleShow();
                } else {
                    $(this).removeClass('active');
                    handleHide();
                }
            });
            handleClickFloatIcon(newValue);
        };
        // text Scrolling  
        gsap.from(
            isHomePage ? textSpliter.chars : null,
            {
                color: 'rgb(104, 117, 142)',
                duration: 0.2,
                stagger: 0.05,
                ease: 'power1.out',
                willChange: 'color',
                scrollTrigger: {
                    trigger: textScrolling,
                    start: 'top 90%',
                    end: 'bottom center',
                    scrub: 1,
                }
            },
        )

        if (isDesktop) {
            setIndexCurrent(0)
            handleSetTopPositionWrap()
            tlHomeProblem = gsap.timeline({
                scrollTrigger: {
                    trigger: `.${parent}`,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true,
                    onUpdate: ({ progress }) => {
                        indexCurrent = Math.floor(Math.min(listProblemItems.length - 1, helper.MathMap(progress, 0, 1, 0, listProblemItems.length)));
                        setIndexCurrent(indexCurrent)
                    },
                    onEnter: () => {
                        $isOpenHeader = false
                    },
                    onEnterBack: () => {
                        $isOpenHeader = false
                    },
                    onLeave: () => {
                        $isOpenHeader = true
                    },
                    onLeaveBack: () => {
                        $isOpenHeader = true
                    },
                }
            })
            tlHomeProblem
                .fromTo(
                    `.${section}-problem-item-scroll-progress`,
                    isMobile ? { width: 0, height: '3px' } : { width: "3px", height: 0 },
                    {
                        ...isMobile ? { width: "100%", height: '3px' } : { width: '3px', height: '100%' },
                        ease: "none",
                        duration: 1,
                        stagger: 1,
                        willChange: 'width, height'
                    },
                )
            handleClickProblemItem()

        } else {
            if ($(`.${section}-problem-item`).length) {
                $(`.${section}-problem-item-decs-wrap`).slideUp()
                $(`.${section}-problem-item-btn`).slideUp()
                $(`.${section}-problem-item`).each(function (index) {
                    if (index == 0) {
                        $(this).addClass('active')
                        $(this).find(`.${section}-problem-item-decs-wrap`).slideDown()
                        $(this).find(`.${section}-problem-item-btn`).slideDown()
                        handleClickFloatIcon(index)
                        gsap.set('.about-problem-img-item', {
                            opacity: 0,
                            ease: 'power3',
                            overwrite: 'auto',
                            willChange: 'opacity',
                        })
                        gsap.to(listImages[index], {
                            opacity: 1,
                            ease: 'power3',
                            duration: 1.2,
                            overwrite: 'auto',
                            willChange: 'opacity',
                        })
                    }

                    const $this = $(this);
                    const $accordContent = $this.find(`.${section}-problem-item-decs-wrap`);
                    const $icon = $this.find('.btn-icon-rotate');

                    const $btnLearn = $this.find(`.${section}-problem-item-btn`);

                    $this.on('click', function () {
                        if ($this.hasClass('active')) {
                            $this.removeClass('active');
                            $icon.removeClass('active');
                            $accordContent.slideUp();
                            $btnLearn.slideUp()

                            if (listImages.length) {
                                gsap.to('.about-problem-img-item', {
                                    opacity: 0,
                                    ease: 'power3',
                                    duration: 0.8,
                                    overwrite: 'auto',
                                    willChange: 'opacity',
                                })
                            }
                        } else {
                            $(`.${section}-problem-item`).removeClass('active');
                            $('.btn-icon-rotate').removeClass('active');
                            $(`.${section}-problem-item-btn`).slideUp();
                            $(`.${section}-problem-item-decs-wrap`).slideUp()
                            $this.addClass('active');
                            $icon.addClass('active');
                            $accordContent.slideDown();
                            $btnLearn.slideDown()

                            gsap.set('.about-problem-img-item', {
                                opacity: 0,
                                ease: 'power3',
                                overwrite: 'auto',
                                willChange: 'opacity',
                            })
                            if (listImages.length) {
                                gsap.to(listImages[index], {
                                    opacity: 1,
                                    ease: 'power3',
                                    duration: 1.2,
                                    overwrite: 'auto',
                                    willChange: 'opacity',
                                })
                            }
                        }
                        handleClickFloatIcon(index)
                    })

                })
            }
        }
        setTimeout(() => {
            ScrollTrigger.refresh()
        }, 1000)

    }
    const handleTestimonial = () => {
        if (isMobile) return;

        const $testEl = $('.home-testimo-right-listchild');
        const $childElSecond = $testEl.eq(1).find('.home-testimo-right-listchild-inner');

        gsap.set($childElSecond, {
            y: `${-$childElSecond.height() + $(window).height()}`
        });
        const tlHomeTestimo = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-testimo',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                onEnter: () => {
                    $isOpenHeader = false;
                    tlHomeTestimo.scrollTrigger.refresh();
                },
                onLeave: () => {
                    $isOpenHeader = true;
                },
                onEnterBack: () => {
                    $isOpenHeader = false;
                },
                onLeaveBack: () => {
                    $isOpenHeader = true;
                }
            }
        });
        tlHomeTestimo.fromTo($testEl.eq(0), {
            y: 0
        }, {
            y: `-${$testEl.eq(0).height() - $(window).height()}`,
            ease: 'linear',
            willChange: 'transform'
        }, 0)
            .fromTo($testEl.eq(1), {
                y: 0
            }, {
                y: `${$childElSecond.height() - $(window).height() + helper.convertRemToPx(1.2)}`,
                ease: 'linear',
                willChange: 'transform'
            }, 0);
    }
    const handleSwiperMobile = () => {
        if (isMobile) {
            $('[data-swiper=swiper]').each((idx, el) => {
                const isPagination = $(el).attr('data-swiper-pagi')
                $(el).addClass('swiper')
                $(el).find('[data-swiper=wrapper]').addClass('swiper-wrapper')
                $(el).find('[data-swiper=slide]').addClass('swiper-slide')

                const swiper = new Swiper(el, {
                    slidesPerView: 1.0228,
                    centeredSlides: true,
                    spaceBetween: helper.parseRem(8),
                    pagination: !isPagination,
                    createElements: true,
                });
            })
        }
    }
    const handleCaareAbout = (section = 'about-carer') => {
        if (!isDesktop) {
            const el = $(`.${section}-gr-wrap`)
            el.addClass('swiper');
            el.find(`.${section}-gr-text`).addClass('swiper-wrapper');
            el.find(`.${section}-gr-text-item`).addClass('swiper-slide');

            const swiper = new Swiper(el[0], {
                slidesPerView: 1.0228,
                spaceBetween: helper.parseRem(12),
                pagination: isTablet ? false : true,
                createElements: true,
                breakpoints: {
                    767: {
                        slidesPerView: 2.12,
                    },
                }
            });
            return
        }
        const whiteColor = getComputedStyle(document.body).getPropertyValue('--white');
        const blueDecor = getComputedStyle(document.body).getPropertyValue('--cl-blue-decor');
        const skyBlueColor = getComputedStyle(document.body).getPropertyValue('--cl-skyblue');
        const bgBaseIem = '#a8d9ff4d'
        $index = null

        $listItemCard = $(`.${section}-gr-text-item`);
        $wrapText = $(`.${section}-gr-text`)
        $listItemCard.each((idx, el) => {
            $item = $(el);
            $scale = 484 / 234
            $saleInner = 404 / 484
            $withBase = $item.outerWidth()
            $widthItem = $withBase
            $widthScale = $withBase * $scale
            $witdthScaleOut = ($listItemCard.length * $withBase - $widthScale) / 4

            $item.on('mouseenter', () => {
                $index = idx
                $listItemCard.each((i, e) => {
                    $textEL = $(e).find(`.${section}-gr-text-item-txt`)
                    $subTextEL = $(e).find(`.${section}-gr-text-item-inner-label`)
                    $decsWrap = $(e).find(`.${section}-gr-text-item-inner-decs-wrap`)
                    $itemInner = $(e).find(`.${section}-gr-text-item-inner`)

                    if (i === $index) {
                        $itemNoSpacing = ($textEL.text() === 'R' || $textEL.text() === 'E') ? 1 : 0

                        gsap.to($(e), {
                            opacity: 1,
                            width: `${helper.convertPxToRem($widthScale)}rem`,
                            duration: 0.6,
                            ease: 'power3',
                            background: skyBlueColor,
                            flexShrink: '0'
                        });
                        gsap.to($itemInner, {
                            duration: 0.6,
                            gap: '2rem',
                            ease: 'power3.out',
                        });
                        gsap.to($textEL, {
                            color: whiteColor,
                            duration: 0.6,
                            opacity: 1,
                            ease: 'power3.out',
                            // x: `-${(helper.convertPxToRem($widthScale * $saleInner - $textEL.width()) / 2)}rem`
                            x: `-${helper.convertPxToRem(($widthScale - helper.convertRemToPx(4) * 2) / 2 - $textEL.width() / 2) + $itemNoSpacing}rem`,
                        });
                        gsap.to($subTextEL, {
                            duration: 0.5,
                            ease: 'power2',
                            // x: `-${(helper.convertPxToRem($widthScale * $saleInner - $subTextEL.width()) / 2)}rem`,
                            x: `-${helper.convertPxToRem(($widthScale - helper.convertRemToPx(4) * 2) / 2 - $subTextEL.outerWidth() / 2)}rem`,
                            opacity: 1
                        })
                        gsap.to($decsWrap, {
                            height: 'auto',
                            duration: 0.1,
                            width: `${helper.convertPxToRem($widthScale) - 8 - 1.2}rem`,
                            ease: 'power2',
                            overwrite: 'auto',
                        })
                        gsap.fromTo($decsWrap,
                            {
                                opacity: 0
                            },
                            {
                                duration: 0.6,
                                ease: 'power2',
                                opacity: 1,
                            })
                    } else {
                        gsap.to($(e), {
                            width: `${helper.convertPxToRem($witdthScaleOut)}rem`,
                            duration: 0.6,
                            ease: 'power3.out',
                            background: 'rgba(255, 255, 255, 0.03)',

                        });
                        gsap.to($itemInner, {
                            duration: 0.6,
                            gap: '10.2rem',
                            ease: 'power3.out',
                        });
                        gsap.to($textEL, {
                            color: whiteColor,
                            opacity: 0.3,
                            duration: 0.6,
                            ease: 'power3.out',
                            x: 0
                        });
                        gsap.to($subTextEL, {
                            duration: 0.5,
                            ease: 'power2',
                            opacity: 0,
                            x: 0,
                        })
                        gsap.to($decsWrap, {
                            height: 0,
                            duration: 0.3,
                            width: 'auto',
                            ease: 'power3.out',
                        })
                        gsap.to($decsWrap, {
                            duration: 0.3,
                            ease: 'power3.inOut',
                            opacity: 0,
                        })
                    }
                });
            });

            $item.on('mouseleave', () => {
                $index = null
                $listItemCard.each((_i, e) => {
                    $textEL = $(e).find(`.${section}-gr-text-item-txt`)
                    $subTextEL = $(e).find(`.${section}-gr-text-item-inner-label`)
                    $decsWrap = $(e).find(`.${section}-gr-text-item-inner-decs-wrap`)
                    $itemInner = $(e).find(`.${section}-gr-text-item-inner`)

                    gsap.to($(e), {
                        width: `${helper.convertPxToRem($widthItem)}rem`,
                        opacity: 1,
                        duration: 0.6,
                        ease: 'power3.inOut',
                        background: bgBaseIem,
                        flexShrink: '1'
                    });

                    gsap.to($textEL, {
                        color: blueDecor,
                        opacity: 1,
                        ease: 'power3.inOut',
                        duration: 0.6,
                        x: 0
                    })
                    gsap.to($subTextEL, {
                        duration: 0.5,
                        ease: 'power3.inOut',
                        x: 0,
                        opacity: 1,
                    })
                    gsap.to($itemInner, {
                        duration: 0.6,
                        gap: '10.2rem',
                        ease: 'power3.out',
                    });
                    gsap.to($decsWrap, {
                        height: 0,
                        duration: 0.3,
                        ease: 'power2',
                    })
                    gsap.to($decsWrap, {
                        duration: 0.3,
                        ease: 'power3.inOut',
                        opacity: 0,
                    })
                });
            });
        });
    }

    const handleOurTeamHover = () => {
        $listItemMember = $('.about-mind-left-item')
        $widthItem = $listItemMember.eq(0).outerWidth();
        $scale = 488 / 176
        $isOpenInfo = false;
        $listItemMember.each((_i, e) => {
            const wrapEl = $(e)
            const itemInner = $(e).find('.about-mind-left-item-wrap')
            const infoLabel = $(e).find('.about-mind-left-item-info');
            const socialsWrap = $(e).find('.about-mind-left-item-socials');
            const moreBtn = $(e).find('.about-mind-left-item-social-item-more');
            const imgInner = $(e).find('.about-mind-left-item-inner');
            const socialItems = $(e).find('.about-mind-left-item-social-item')
            const decsItem = $(e).find('.about-mind-left-item-info-decs')
            const icMore = $(e).find('.about-mind-left-item-social-item-more')



            const handleResetCardMember = () => {
                icMore.removeClass('active')

                gsap.to(itemInner, {
                    scale: 1,
                    duration: 0.4,
                    ease: 'power3.out',
                    clearProps: 'transform,borderRadius',
                    overwrite: 'auto',
                })
                gsap.to(imgInner, {
                    scale: 1,
                    duration: 0.6,
                    ease: 'power3',
                    overwrite: 'auto'

                })

                gsap.to(socialItems, {
                    backgroundColor: '#041942',
                    ease: 'power3.out',
                    duration: 0.6,
                    stagger: 0,
                    overwrite: 'auto'
                })

                gsap.to(decsItem, {
                    opacity: 0,
                    ease: 'power3.out',
                    duration: 0.2,
                    delay: -0.3,
                    overwrite: 'auto',
                })

                gsap.fromTo(infoLabel, {
                    opacity: 0,
                    xPercent: -50
                }, {
                    opacity: 1,
                    xPercent: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                    overwrite: 'auto'

                })
            }
            const handleOpenInfo = () => {
                const scaleX = 109 / 408
                const scaleY = scaleX * $(e).outerWidth() / $(e).outerHeight()
                const ratioImg = scaleY / scaleX

                gsap.to(socialItems, {
                    background: '#2A3B5E',
                    ease: 'power3.out',
                    duration: 0.6,
                    stagger: 0
                })
                gsap.to(infoLabel, {
                    opacity: 0,
                    duration: 0.3,
                    xPercent: -50,
                    ease: 'power3.out',
                    overwrite: 'auto'
                })

                gsap.to(itemInner, {
                    transformOrigin: '3rem 3rem',
                    duration: 0.6,
                    borderRadius: '0.6rem 4rem',
                    ease: 'power3.out',
                    scaleX,
                    scaleY,
                })
                gsap.to(imgInner, {
                    scaleX: ratioImg,
                    duration: 0.6,
                    ease: 'power3.out',
                })
                gsap.fromTo(decsItem, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: 'power3.out',
                    duration: 0.6,
                    delay: 0.1,
                    overwrite: 'auto'
                })
            }

            const handleLeave = () => {
                if (wrapEl.hasClass('active')) {
                    wrapEl.removeClass('active')
                    handleResetCardMember()
                }

                gsap.to($(e), {
                    width: `${helper.convertPxToRem($widthItem)}rem`,
                    duration: 0.8,
                    ease: 'power3',
                    overwrite: 'auto'
                });
                gsap.to(infoLabel, {
                    opacity: 0,
                    duration: 0.6,
                    xPercent: -50,
                    ease: 'power3.out',
                    overwrite: 'auto'
                })
                gsap.to(socialsWrap, {
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                    overwrite: 'auto',
                    pointerEvents: 'none',
                    xPercent: 100,
                    overwrite: 'auto'

                })
            }

            const handleEnter = () => {
                gsap.to($(e), {
                    width: `${helper.convertPxToRem($widthItem * $scale)}rem`,
                    duration: 0.8,
                    ease: 'power3',
                    overwrite: 'auto',
                    willChange: 'width'
                });
                gsap.fromTo(infoLabel, {
                    opacity: 0,
                    xPercent: -50
                }, {
                    opacity: 1,
                    duration: 0.6,
                    xPercent: 0,
                    ease: 'power3.out',
                    overwrite: 'auto',
                    willChange: 'transform'
                })

                gsap.fromTo(socialsWrap, {
                    opacity: 0,
                    xPercent: 100,
                }, {
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power3.out',
                    xPercent: 0,
                    pointerEvents: 'all',
                    willChange: 'transform'
                })
            }

            if (isDesktop) {
                $(e).on('mouseenter', handleEnter);
                $(e).on('mouseleave', handleLeave);
            }

            moreBtn.on('click', () => {
                icMore.addClass('active')

                if (wrapEl.hasClass('active')) {
                    wrapEl.removeClass('active')
                    handleResetCardMember()
                } else {
                    wrapEl.addClass('active')
                    handleOpenInfo()
                }
            })
        })
    }
    const handleAccordingCareer = () => {
        if ($('.career-hire-item').length > 0) {
            $('.career-hire-item-inner-detail').slideUp()
            $('.career-hire-item').each(function () {
                const $this = $(this);
                const $accordContent = $this.find('.career-hire-item-inner-detail');
                const $icon = $this.find('.btn-icon-rotate');
                $this.on('click', function () {
                    if ($this.hasClass('active')) {
                        $this.removeClass('active');
                        $icon.removeClass('active');
                        $accordContent.slideUp();
                    } else {
                        $('.career-hire-item').not('.btn-primary').removeClass('active');
                        $('.career-hire-item').removeClass('active');
                        $('.btn-icon-rotate').removeClass('active');
                        $('.career-hire-item-inner-detail').slideUp()
                        $this.addClass('active');
                        $icon.addClass('active');
                        $accordContent.slideDown();
                    }
                })

                $('.btn-primary').on('click', function (e) {
                    e.stopPropagation()
                })
            })
        }
    }
    const handleMotionPath = () => {
        const listItemServices = document.querySelectorAll('.services-process-content-item')
        const $listItemServices = $('.services-process-content-item');
        const $frameWrapper = $('.services-process-inner-frame');
        const $imgSub = $('.services-process-frame-img-sub');
        const $icSubMobile = $('.services-process-inner-frame-mb');
        const $icSubMobileInner = $('.services-process-inner-frame-mb-svg');
        const handleSetPositionImageSub = () => {
            if ($listItemServices.length % 2 === 0) {
                // Img Sub to right;
                $imgSub.css({
                    left: '100%',
                    transform: `translateX(${isDesktop ? '-65%' : '-100%'} )`
                });
                $icSubMobile.css('left', 'calc(0% - 0.5rem)');
                $icSubMobileInner.css('transform', 'rotateY(180deg)');
            } else {
                // Img Sub to left;
                $icSubMobile.css('right', 'calc(0% - 0.5rem)');
                $imgSub.css({
                    right: '100%',
                    transform: `translateX(${isDesktop ? '65%' : '100%'} )`
                });
            }
        };
        const _handleCaculateHeightOfFrame = () => {
            const totalLine = 5;
            const heightGap = 23.5; // 23.5rem
            const heightLine = 7.2; // 7.2rem 
            const calcSpacingGap = (totalLine - $listItemServices.length) * heightLine +
                (totalLine - $listItemServices.length) * heightGap;
            const height = `calc(100% - ${calcSpacingGap}rem)`;

            console.log('frameWrapper', height);
            $frameWrapper.css('height', height);
        };
        handleSetPositionImageSub()
        // handleCaculateHeightOfFrame()
    }

    const handleDropDownSelectForm = () => {

        $listItemField = $('.career-hire-item-label')
        $dropDownWrap = $('.career-form-inner-item-input-select')
        $dropdownInner = $('.career-form-inner-item-input-select-dropdown')
        $listItemField.each(function (_index, item) {
            const $dropDownContent = $(item).html();
            const $dropDown = $('<div>').append($dropDownContent);
            $dropDown.addClass('career-form-inner-item-input-select-dropdown-item txt-16 txt');
            $dropdownInner.append($dropDown);
        })
        // set default
        const $dropDownContent = 'Any position'
        const $dropDown = $('<div>').append($dropDownContent);
        $dropDown.addClass('career-form-inner-item-input-select-dropdown-item txt-16 txt');
        $dropdownInner.append($dropDown)


        if ($('.career-form-inner-item-input-select-dropdown-item').length) {
            $('.career-form-inner-item-input-select-dropdown-item').each(function (index, item) {
                $(item).on('click', function () {
                    $('.career-form-inner-item-label-inner').text($(item).text());
                    $('.career-form-inner-item-hidden').val($(item).text());
                })
            })
        }

        $('.career-form-inner-item-input-select').on('click', function () {
            $dropDownWrap.toggleClass('active')
        })
        helper.handleClickOutSide({
            element: $dropDownWrap.get(0),
            action: () => {
                $dropDownWrap.removeClass('active')
            }
        })
    }
    const handleAddFirstZero = () => {
        const numberCard = document.querySelectorAll('.services-process-content-item-num')

        numberCard.forEach(item => {
            item.innerHTML = item.innerHTML.padStart(2, '0')
        })
    }
    const handleSolutions = () => {
        if (!isDesktop) {
            $('.cases-solutions-item-inner').slideUp()
            $('.cases-solutions-item').each(function () {
                const $this = $(this);
                const $accordContent = $this.find('.cases-solutions-item-inner');
                const $icon = $this.find('.btn-icon-rotate');

                $this.on('click', function () {
                    if ($this.hasClass('active')) {
                        $this.removeClass('active');
                        $icon.removeClass('active');
                        $accordContent.slideUp();
                    } else {
                        $('.cases-solutions-item').removeClass('active');
                        $('.btn-icon-rotate').removeClass('active');
                        $('.cases-solutions-item-inner').slideUp()
                        $this.addClass('active');
                        $icon.addClass('active');
                        $accordContent.slideDown();
                    }
                })
            })
            return
        }

        let $currentIndex = 0;
        let $prevIndex = 0
        const $listItem = $('.cases-solutions-tab-list')
        const $items = $listItem.children()
        const $progressBar = $('.cases-solution-bar')
        const $progressBarInner = $('.cases-solution-bar-progress')
        const $cardSlides = $('.cases-solutions-item')

        const handleAutoSlideProgress = () => {
            const tl = gsap.timeline({ clearProps: true });

            $items.each(function (index, item) {
                if (index === $currentIndex) {

                    const xStart = $listItem.offset().left  // set header  is startpoint
                    const xNext = $items.eq(index).offset().left
                    const $width = $(item).outerWidth()
                    $duration = Math.abs(index - $prevIndex) * 0.1

                    tl.to($progressBar.get(0), {
                        width: $(item).width(),
                        ease: 'linear',
                        duration: $duration,
                        x: xNext - xStart,
                    })
                    tl.to($progressBar.get(0), {
                        width: $width,
                        ease: 'power3',
                        duration: 0.3,
                    }, 0)
                }
            })
            $cardSlides.each(function (index, item) {
                const $content = $(item).find('.cases-solutions-item-content')
                const $image = $(item).find('.cases-solutions-item-img')
                const tl = gsap.timeline({ clearProps: true });
                if (index === $currentIndex) {
                    tl.to(item, {
                        pointerEvents: 'all',
                    }, 0)
                    tl.fromTo($content.get(0), { opacity: 0, y: '5rem' }, {
                        opacity: 1,
                        duration: 1,
                        y: 0,
                        ease: 'power3.out',
                        overwrite: 'auto',
                        pointerEvents: 'all'
                    }, 0)
                    tl.fromTo($image.get(0), { opacity: 0, }, {
                        opacity: 1,
                        duration: 1,
                        ease: 'power3.out',
                        overwrite: 'auto',
                        pointerEvents: 'all'
                    }, 0.2)
                } else {
                    tl.to(item, {
                        pointerEvents: 'none',
                    }, 0)
                    tl.to($content.get(0), {
                        y: 0,
                        opacity: 0,
                        y: 0,
                        duration: 0.6,
                        ease: 'power3.out',
                        pointerEvents: 'none'
                    }, 0)
                    tl.to($image.get(0), {
                        y: 0,
                        opacity: 0,
                        duration: 0.6,
                        ease: 'power3.out',
                        overwrite: 'auto',
                        pointerEvents: 'all'
                    }, 0)
                }
            })
        }
        const handleActionProgressBar = () => {
            const $listItem = $('.cases-solutions-tab-list')
            const $items = $listItem.children()

            $items.each(function (index, item) {
                $(item).on('click', function () {
                    if (index === $currentIndex) return
                    $prevIndex = $currentIndex
                    $currentIndex = index

                    handleAutoSlideProgress()
                })
            })
        }

        handleActionProgressBar()
        handleAutoSlideProgress()
    }
    const handleTeamDisposal = () => {

        if (isDesktop) {
            const $circle = $('.services-diposal-content-circle')
            const $circleBigger = $('.services-diposal-content-circle-sub-2')
            const $circleMedium = $('.services-diposal-content-circle-sub-1')
            const countWave = 2

            let waveArr = $(".services-diposal-content-circle-shadow").eq(0).clone();

            for (let i = 0; i < countWave; i++) {
                let html = waveArr.clone();
                html.css("animation-delay", `${(-4 / countWave) * i}s`);
                html.addClass('wave-anim')
                $(".services-diposal-content-circle-main").append(html);
            }
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.services-disposal',
                    start: "top top",
                    end: "bottom center",
                }
            })

            tl.from($circle.get(0), {
                scale: 0,
                opacity: 0,
                transformOrigin: 'center center',
                duration: 1.2,
                ease: 'power3.out'
            })
            tl.from($circleMedium.get(0), {
                scale: 0,
                duration: 1.2,
                ease: 'power3.out',
                transformOrigin: 'center center',
                opacity: 0
            }, 0)
            tl.from($circleBigger.get(0), {
                scale: 0,
                transformOrigin: 'center center',
                duration: 1.2,
                ease: 'power3.out',
                opacity: 0
            }, 0)

            tl.from('.services-diposal-content-item', {
                opacity: 0,
                yPercent: 50,
                ease: 'power3.out',
                duration: 1.2,
                stagger: 0.1
            }, 0.1)

            $('.circle-move').each(function (index, item) {
                tl.fromTo(item, {
                    opacity: 0
                }, {
                    opacity: 1,
                    duration: 2,
                    ease: "power1",
                    motionPath: {
                        path: `.path-move-${index + 1}`,
                        align: `.path-move-${index + 1}`,
                        alignOrigin: [index % 2 ? 0 : 0.4, index % 2 ? 0 : 0.4],
                        autoRotate: true,
                        start: 0,
                        end: 1
                    },
                    stagger: 0.25,
                    transformOrigin: "50% 50%",
                    onComplete: () => {
                        $(this).addClass('active')
                    }
                }, 0.5);
            });
        } else {
            $('.services-diposal-content-item').each(function () {
                const $this = $(this)
                gsap.fromTo($this, {
                    opacity: 0,
                    y: '10rem'
                }, {
                    opacity: 1,
                    y: 0,
                    ease: 'power3.out',
                    duration: 1.2,
                    scrollTrigger: {
                        trigger: $this,
                        start: 'top bottom',
                        end: 'bottom center',
                    }
                })
            })
        }
    }
    const handleHiddenVacancies = () => {
        $('.career-hire-item').length === 0 && $('.career-hire').remove()
    }
    const handleFaqsFilter = () => {
        const arr = [];
        $idCurrent = 0;

        const handleInitContent = () => {
            if ($('.faqs-question-item').length > 0) {
                $('.faqs-question-item').each((_, item) => {
                    const $isHaventItem = !$(item).find('.faqs-question-item-listchild').find('.faqs-question-item-listchild-inner').length
                    if ($isHaventItem) {
                        $(item).remove()
                    } else {
                        const firstChildText = $(item).children().first().text();
                        arr.push(firstChildText);
                    }
                })

                $('.faqs-question-nav-item').each((index, item) => {
                    const $isHaventItem = arr.some(item =>
                        $(item).find('.faqs-question-nav-item-inner').text().toLowerCase() === item.toLowerCase()
                    );

                    if ($isHaventItem) {
                        $(item).remove()
                    }

                    $(item).on('click', () => {
                        const id = $(item).data('link')
                        lenis.scrollTo(
                            `#${id}`,
                            {
                                duration: 0.6,
                                lock: true,
                                offset: -window.innerHeight / 2 + helper.convertRemToPx(10),
                            }
                        )
                    })
                })
            }
        }
        const handleActiveItem = (id) => {
            $('.faqs-question-nav-item-inner').each((index, item) => {
                if (index === id) {
                    $(item).addClass('active')
                } else {
                    $(item).removeClass('active')
                }
            })
        }
        const initScroll = () => {
            $('.faqs-question-item').each((index, item) => {
                ScrollTrigger.create({
                    trigger: item,
                    start: 'top center',
                    end: 'bottom center',
                    onEnter: () => {
                        $idCurrent = index
                    },
                    onEnterBack: () => {
                        $idCurrent = index
                    },

                })
            })

            if (isDesktop) {
                ScrollTrigger.create({
                    trigger: '.faqs-question-inner',
                    start: 'top center',
                    end: 'bottom top',
                    onEnter: () => {
                        $isOpenHeader = false
                    },
                    onLeave: () => {
                        $isOpenHeader = true
                    },
                    onEnterBack: () => {
                        $isOpenHeader = false
                    },
                    onLeaveBack: () => {
                        $isOpenHeader = true
                    },
                    onUpdate: (self) => {
                        handleActiveItem($idCurrent)
                    },
                })
            }
        }

        handleActiveItem(0) //set default 
        handleInitContent()
        setTimeout(() => {
            initScroll()
            ScrollTrigger.refresh()
            AOS.refresh()
        }, 300)

    }
    const handleSearchFormEbook = (caseStudy) => {
        $('.learn-marketing-btn-input').on('click', () => {
            $('.learn-marketing-btn-input').addClass('active')
        })
        helper.handleClickOutSide({
            action: () => {
                $('.learn-marketing-btn-input').removeClass('active')
            },
            element: $('.learn-marketing-btn-input').get(0)
        })
        const $input = $('.learn-marketing-input')
        const debounceSearch = helper.debounce((value) => {
            $('.learn-marketing-swiper-slide').each((_index, item) => {
                const $title = $(item).find('.learn-marketing-slide-title').text()
                let $titleSplitSpaceing = $title.split(" ").join("").toLowerCase();
                let $searchValue = value.split(" ").join("").toLowerCase()

                const $isSearch = $titleSplitSpaceing.includes($searchValue)

                if ($isSearch) {
                    $(item).removeClass('hidden')
                    $('.learn-marketing-inner').removeClass('is-empty')
                } else {
                    $(item).addClass('hidden')
                    $('.learn-marketing-inner').addClass('is-empty')
                }
                caseStudy.update()
            })
        }, 200)

        $input.on('keyup', function (event) {
            debounceSearch($(this).val())
        })
    }

    const handleDowloadFilePDF = () => {

        const handleLeavePoup = () => {
            gsap.to('.learn-poup', {
                opacity: 0,
                clipPath: 'circle(14.9% at 0 100%)',
                duration: 0.3,
                ease: 'none',
                onComplete: () => {
                    $('.learn-poup').removeClass('active')
                    $('.learn-poup-content-inner').removeClass('is-success')
                    $('.learn-poup-content-form-inner').css('borderColor ', 'transparent')
                    $('.learn-poup-content-form-input').val('')
                    lenis.start()
                }
            })
        }

        helper.handleClickOutSide({
            action: handleLeavePoup,
            element: $('.learn-poup-content').get(0)
        })
        $('.learn-dowload').on('click', function () {
            const $title = $(this).find('.title-pdf-file').text().trim()
            const $imageSrc = $(this).find('.img-pdf-file').attr('src')
            if (!$('.learn-poup').hasClass('active')) {
                $('.learn-poup-content-form-titlebook').text($title)
                $('.learn-poup-content-img').find('img').attr('src', $imageSrc)
                gsap.fromTo('.learn-poup', {
                    opacity: 0,
                    clipPath: 'circle(14.9% at 0 100%)'
                }, {
                    opacity: 1,
                    clipPath: 'circle(141.4% at 0 100%)',
                    duration: 0.3,
                    ease: 'none',
                    onComplete: () => {
                        $('.learn-poup').addClass('active')
                        lenis.stop()
                    }
                })

            }
        })

        $('.learn-poup-close-btn').on('click', handleLeavePoup)
        $('.learn-poup-content-form-inner').on('mouseenter', () => {
            const listArrow = gsap.utils.toArray('.btn-ar')

            gsap.fromTo(listArrow[0], {
                xPercent: -150
            },
                { xPercent: 0, duration: 1, ease: 'power3.out', overwrite: 'auto', })

            gsap.fromTo(listArrow[1],
                { xPercent: 0 },
                { xPercent: 150, duration: 1, ease: 'power3.out', overwrite: 'auto' })
        })

        $('.learn-poup-content-form-btn').on('click', async (e) => {
            e.preventDefault()
            $dataForm = $('.learn-poup-content-form-inner').serializeArray().reduce(function (obj, item) {
                obj[item.name] = item.value;
                return obj;
            }, {});

            const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test($dataForm.email)
            if (!isEmail) {
                $('.learn-poup-content-form-inner').css('borderColor', 'red')
            } else {
                $('.learn-poup-content-form-inner').css('borderColor', 'transparent')
                $dataForm['api_key'] = 'AavcvMtuf-nNje_k48gu9Q'
                // const result = await fetch('https://app.convertkit.com/forms/7014072/subscriptions',
                //     {
                //         method: 'POST',
                //         body: JSON.stringify($dataForm),
                //         headers: {
                //             'Content-Type': 'application/json',
                //         }
                //     }) 

                setTimeout(() => {
                    $('.learn-poup-content-inner').addClass('is-success')
                    $('.learn-poup-content-message-btn').on('click', handleLeavePoup)
                }, 300)
            }

        })
    }
    const handleRollBackForm = () => {
        $('.career-form-inner-form-btn').hover(function () {
            $(this).find('.btn-primary').toggleClass('hover')
        })
        $('.career-form-inner-form').on('submit', function (e) {
            e.preventDefault();

            let isValid = false;
            const firstNameValue = $('.career-form-inner-item-input[data-name="first-name"]').val();
            const lastNameValue = $('.career-form-inner-item-input[data-name="last-name"]').val();
            let form = $(".career-form-inner-form").serialize();

            // validate full value of field after submit
            for (let i = 0; i < form.split('&').length; i++) {
                let value = form.split('&')[i].split('=')[1];
                if (!value) {
                    isValid = false;
                    break;
                }
                isValid = true
            }
            if (!isValid) return

            $('.career-form-message-fullname').text(`${firstNameValue} ${lastNameValue}`)
            $('.career-form-message-success').css('pointerEvents', 'all')
            $('.career-form-message-success').css('opacity', '1')
            $('.career-form-inner-form').css('opacity', '0')
        })

        $('.career-form-message-btn-back').children().first().on('click', function (e) {
            e.preventDefault();
            $('.career-form-message-success').css('opacity', '0')
            $('.career-form-message-success').css('pointerEvents', 'none')
            $('.career-form-inner-form').css("cssText", "opacity: 1!important");
            $('.career-form-inner-form').get(0).reset()
            $('.career-form-inner-item-label-inner').text('Choose position');
            return false
        })
    }
    const handleFrameMask = () => {
        const $frameMask = $('.mask-frame')

        $frameMask.each(function () {
            const $this = $(this)

            gsap.to($this.get(0), {
                clipPath: 'inset(0% 0 0% 0)',
                ease: 'none',
                duration: 1,
                delay: 0.5,
                willChange: 'clip-path',
            }
            )
        })

    }
    const handleMaskText = () => {
        const $listMaskText = $('.mask-text')
        const init = (el, lines) => {
            lines &&
                lines.forEach((line) => {
                    const div = document.createElement('div');
                    div.style.overflow = 'hidden'
                    div.appendChild(line);
                    el.appendChild(div);
                });
            $('.mask-text-line').css('willChange', 'transform')
            gsap.set(lines, {
                y: '100%',
                autoAlpha: 1,
            });
        }
        const play = (lines, options) => {
            gsap.to(lines, {
                y: '0%',
                ease: 'power3',
                duration: 1.2,
                stagger: 0.025,
                ...options
            })
        }

        $listMaskText?.each((_, item) => {
            const $this = $(item)
            const options = {
                scrollTrigger: {
                    trigger: $this.get(0),
                    start: 'top bottom',
                    once: true,
                }
            }
            const slitText = new SplitText($this.get(0), {
                type: 'lines, words',
                linesClass: 'mask-text-line',
            })

            init(item, slitText.lines)
            const playAimation = () => play(slitText.lines, options)
            helper.isLoaded({ element: $this, play: playAimation })
        })

    }
    async function handlePreDraw() {
        return new Promise((resolve) => {
            $('.draw-path').addClass('un-fill')
            $('.js-road').css('opacity', '0')
            const $groupPath = $('.svg-wrap').find('.group-svg')
            $groupPath.each((_, item) => {
                const $this = $(item)
                const $path = $this.find('path')
                $path.each((_, item) => {
                    $(item).addClass('un-fill draw-path')
                })
            })
            gsap.set(".draw-path", {
                drawSVG: "0", duration: 0,
            });
            setTimeout(() => {
                resolve()
            }, 100)
        })
    }
    const handleDrawPath = (elWrap) => {
        $(elWrap).find('.svg-wrap').find('.group-svg').each((_, item) => {
            const $this = $(item)
            const name = $this.attr('class').split(' ')[1]

            handleDrawSinglePath({
                el: $this,
                options: optionsDrawSvg.optionRocket,
                name
            })

        })

        handleDrawSinglePath({
            el: $('.rocket'), name: 'rocket',
            options: optionsDrawSvg.optionRocket.rocket
        })


        function handleDrawSinglePath({ el, name, options }) {
            const $drawPath = $(el).find('.draw-path')

            if (el.hasClass('float-item')) {
                el.removeClass('float-item')
            }
            const { duration, delay, animation } = options[name] || {}
            const durationRandom = Math.random() * 1.5 + 0.5
            const delayRandom = Math.random() * 1 + 0.1

            $drawPath.css('willChange', 'transform, stroke-dasharray, stroke-dashoffset, fill')
            gsap.killTweensOf($drawPath)

            gsap.fromTo($drawPath,
                {
                    drawSVG: '0'
                }, {
                duration: duration || durationRandom,
                stagger: {
                    amount: 0.025,
                    from: 'random'
                },
                drawSVG: '100%',
                ease: "power1.inOut",
                delay: delay || delayRandom,
                clearProps: 'all',
                onComplete: () => {
                    $drawPath.removeClass('un-fill')
                    // el.addClass('float-item').css('animation-delay', (Math.random() * 1.5 + 0.5) + 's');
                    animation && animation()
                    handleFadeImage()
                    if (name === 'rocket') {
                        el.addClass('float-item')
                    }
                }
            });
        }
        function handleFadeImage() {
            const $imageShow = $(elWrap).find('.js-road')
            $imageShow.length && gsap.to($imageShow, {
                opacity: 1,
                duration: 1.2,
                ease: "power3",
                stagger: 0.15
            })
        }
    }
    const handleLoading = () => {
        const $loading = $('.page-loading')
        if (!$loading.length) return

        _BeforeLoad_.pushCbs(async () => {
            const imgHero = document.querySelector('.home-hero-img-inner img')
            const imgAbout = document.querySelector('.home-mission-left-img img')
            // const svgInterHome = new SvgInsert(imgHero, document.querySelector('.home-hero-img-inner'))
            // const svgAbout = new SvgInsert(imgAbout, document.querySelector('.home-mission-left-img'))
            function isPageReloaded() {
                const entries = performance.getEntriesByType('navigation');
                if (entries.length > 0) {
                    return entries[0].type === 'reload';
                }
                return false;
            }

            if (isPageReloaded()) {
                localStorage.setItem('visited', 'false');
            }

            const tasks = [
                handlePageLoading(),
                // svgAbout.initSvg(),
                // svgInterHome.initSvg(),
            ];
            // run pageLoading same time with fetch svg
            await Promise.allSettled(tasks);
            // await handlePreDraw();   // after call redraw, to set un-fill, and no-stroke
            handleSuccess();  // after call success

            // $loading.css("cssText", "opacity: 0.5!important");
            handlePageLoading()
        })
        _BeforeLoad_.callCbs()
        async function handlePageLoading() {
            const isFirstVisit = !localStorage.getItem('visited') || localStorage.getItem('visited') === 'false';

            return new Promise(resolve => {
                if (isFirstVisit) {
                    localStorage.setItem('visited', 'true');
                } else {
                    return resolve()
                }

                const logoHeading = $('.header-logo-link')
                const logoLoading = $('.page-loading-logo svg ')
                const pathFirst = logoLoading.find('path').eq(0);
                const pathSecond = logoLoading.find('path').eq(1);
                const logoWrap = $('.page-loading-swp')
                const scaleTo = 0.5
                const yTo = logoWrap.offset().top - logoHeading.offset().top + logoWrap.height() / 2 - logoHeading.height() / 2
                const xTo = logoWrap.width() * scaleTo - ($('body').innerWidth() / 2 - logoHeading.offset().left)

                const tl = gsap.timeline()

                tl.fromTo(pathFirst, {
                    clipPath: 'inset(0 0% 100% 0%)'
                }, {
                    clipPath: 'inset(0 0% 0% 0%)',
                    duration: 1,
                    ease: "power2.in",
                }, 0)
                tl.fromTo(pathSecond, {
                    clipPath: 'inset(100% 0% 0% 0%)'
                }, {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 1,
                    ease: "power2.in",
                }, 0)
                tl.to('.page-loading-swp', {
                    y: `-${yTo}px`,
                    x: `${xTo}px`,
                    duration: 1,
                    ease: 'power3.inOut'
                }, '+=0.1').to('.page-loading-logo', {
                    scale: scaleTo,
                    transformOrigin: 'left',
                    ease: "power3.out",
                }, '-=0.2')
                    .to('.page-loading-text', {
                        x: 0,
                        opacity: 1,
                        ease: "power3",
                        duration: 0.8,
                        onComplete: () => {
                            resolve()
                        }
                    })

            });

        }
        const handleSuccess = () => {
            console.log('loaded_____ success')
            $loading.addClass('is-loaded')
            $isLoaded = true
            AOS.init({
                once: true,
                duration: 800,
                startEvent: 'DOMContentLoaded',
                ease: 'ease-out-quart',
            })
            AOS.refresh()
        }
        const handlePageEffect = () => {
            $loading.addClass('is-loaded')
            $isLoaded = true
            AOS.init({
                once: true,
                duration: 800,
                startEvent: 'DOMContentLoaded',
                ease: 'ease-out-quart',
            })
            AOS.refresh()
        }

    }
    const handleDrawAbout = () => {
        ScrollTrigger.create({
            trigger: '.home-mission',
            start: 'top center',
            once: true,
            onEnter: () => {
                handleDrawPath('.home-mission')
            },
        })
    }
    const handleDrawIconProblem = () => {
        ScrollTrigger.create({
            trigger: '.home-problem',
            start: 'top center',
            once: true,
            onEnter: () => {
                handleDrawPath('.home-problem')
            },
        })
    }
    const handleCompareSectionServices = () => {
        if (!isMobile) return

        $('.services-marketing-content-item').length > 0 && $('.services-marketing-content-item').each((index, item) => {
            const $title = $(item).find('.services-marketing-content-title')
            const $content = $(item).find('.services-marketing-content-richtext')

            $title.on('click', () => {
                if ($title.hasClass('active')) {
                    return
                } else {
                    $('.services-marketing-content-title').removeClass('active')
                    $('.services-marketing-content-richtext').removeClass('active')

                    $title.addClass('active')
                    $content.addClass('active')
                }
            })
        })
    }

    const handleSubmitForm = () => {
        $('.ct-form-inner-form-btn').hover(function () {
            $(this).find('.btn-primary').toggleClass('hover')
        })
        new FormSubmit(document.querySelector('.ct-hero-form-inner'))
    }
    const handleLottieInteract = ({ parent, id, from, to, loopFrame, speed }) => {
        if ($(id).length === 0 || !$(id).attr('src')) return;
        $('.img-hide').addClass('hide')
        const $roads = $(parent).find('.js-road');
        $roads.each((_index, item) => {
            const $this = $(item)
            gsap.set($this, { opacity: 0 })
        })
        const initLottie = () => {
            const lottie = LottieInteractivity.create({
                player: id,
                mode: 'chain',
                actions: [
                    {
                        state: 'autoplay',
                        transition: 'onComplete',
                        frames: [0, to]
                    },
                    {
                        state: 'loop',
                        frames: [from, loopFrame],
                        speed: speed || 1,
                    },
                ],
            });
            return lottie
        }
        const animIn = () => {
            gsap.killTweensOf($roads)
            $roads.each((_index, item) => {
                const $this = $(item)
                gsap.fromTo($this,
                    {
                        opacity: 0,
                        y: '5rem'
                    }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    delay: (_index + 1) * 0.2 + 0.5,
                    overwrite: 'auto'
                })
            })
            initLottie()
        };
        const animOut = () => {
            gsap.killTweensOf($roads)
            $roads.each((_index, item) => {
                const $this = $(item)
                gsap.to($this, {
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    y: '5rem'
                })
            })
        }

        ScrollTrigger.create({
            trigger: parent,
            start: 'top bottom',
            end: 'bottom top',
            onEnter: animIn,
            onEnterBack: animIn,
            onLeave: animOut,
            onLeaveBack: animOut,
        })

    }
    const tesst = (function (d, s, id) { var js, tjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = "https://app.termly.io/embed-policy.min.js"; tjs.parentNode.insertBefore(js, tjs); }(document, 'script', 'termly-jssdk'));
    const initTerm = () => {
        const $script = `<script type="text/javascript">(function(d, s, id) { var js, tjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = "https://app.termly.io/embed-policy.min.js"; tjs.parentNode.insertBefore(js, tjs); }(document, 'script', 'termly-jssdk'));</script>`;

        $('.privacry-content-embed').append($script);
    }
    class FormSubmit {

        constructor(form) {
            this.DOM = {
                form: form,
                classError: '.ct-form-inner-item-error',
                classItem: '.ct-form-inner-item',
                classInput: '.ct-form-inner-item-input',
                classWrap: '.ct-form-inner-item-wrap',
                classBtn: '.ct-form-inner-form-btn-submit'
            };
            this.fortmatForm = {
                REGEXP: {
                    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/g,
                },

                ERROR_MESSAGE: {
                    required: name => `Please fill the ${name.toLowerCase()} field`,
                    regexp: name => `Your ${name.toLowerCase()} is not in correct format.`,
                },
            };
            this.formHandler();
        }
        required = message => ({
            message,
            required: true,
        });
        regexp = (pattern, message) => ({
            regexp: pattern,
            message,
        });
        handleDropDown() {
            const wrapSelect = this.DOM.form.querySelector('.ct-form-inner-item-input-select')
            const dropDown = this.DOM.form.querySelector('.ct-form-inner-item-input-dropdown')
            const icArrow = wrapSelect.querySelector('.ct-form-inner-item-input-select-ic')
            const listItemDropDown = dropDown.querySelectorAll('.ct-form-inner-item-input-dropdown-item')
            const inputHideDropDown = wrapSelect.parentElement.querySelector('.ct-form-inner-item-hidden')

            const handleActiveDropdown = () => {
                icArrow?.classList.add('active')
                dropDown.classList.add('active')
            }
            const handleCloseDropdown = () => {
                icArrow?.classList.remove('active')
                dropDown.classList.remove('active')
                console.log('inputHideDropDown', inputHideDropDown.value)
            }

            listItemDropDown.forEach((dropItem) => {
                dropItem.addEventListener('click', () => {
                    inputHideDropDown.value = dropItem.textContent
                    wrapSelect.querySelector('.ct-form-inner-item-label-inner').textContent = dropItem.textContent
                    console.log('dropItem.textContent', dropItem.textContent)
                    handleCloseDropdown()
                })
            })
            wrapSelect.addEventListener('click', handleActiveDropdown)

        }
        mapFormToObject(form) {
            const parsedFormData = Array.from(form.elements).reduce((prev, field) => {
                const { name, value } = field;
                const dataName = field.dataset.name;

                return {
                    ...prev,
                    [name]: {
                        value,
                        name: dataName || name,
                        validType: [],
                    },
                };
            }, {});
            return parsedFormData;
        }

        mapObjectFormToValidate(form, obj) {
            const parsedFormData = Object.entries(obj).reduce((prev, cur) => {
                const name = cur[0];
                const val = cur[1];
                let validArr = val.validType;
                const formEl = Array.from(form.elements);
                for (const field of formEl) {
                    const fieldName = field.name;
                    const fieldType = field.type;
                    const fieldRequired = field.required || false;
                    const REGEXP_TYPE = ["email", "phone"];

                    if (name === fieldName) {
                        if (fieldRequired) {
                            const CusMessage = field.getAttribute("mess-required");
                            validArr.unshift(this.required(CusMessage));
                        }
                        if (REGEXP_TYPE.includes(fieldType)) {
                            const CusMessage = field.getAttribute("mess-regexp");
                            const CusRegexp = field.getAttribute("cus-regexp");
                            validArr.unshift(this.regexp(CusRegexp || fieldType, CusMessage));
                        }
                    }
                }
                return { ...prev, [name]: val };
            }, {});
            return parsedFormData;
        }

        validateForm({ formsObj: forms, rules }) {
            const errorObj = {};
            for (let name in rules) {
                for (let rule of rules[name].validType) {
                    if (rule.required) {
                        if (!forms[name].value.trim() || forms[name].value.trim() == "false") {
                            errorObj[name] = rule.message || this.fortmatForm.ERROR_MESSAGE.required(forms[name].name);
                        }
                    }
                    if (rule.regexp && forms[name]) {
                        let regexp = rule.regexp;
                        if (regexp in this.fortmatForm.REGEXP) {
                            regexp = new RegExp(this.fortmatForm.REGEXP[regexp]);
                        }
                        if (!regexp.test(forms[name].value.trim())) {
                            errorObj[name] = rule.message || this.fortmatForm.ERROR_MESSAGE.regexp(forms[name].name);
                        }
                    }
                }
            }
            return {
                errorObj,
                isValidated: Object.keys(errorObj).length === 0,
            };
        }
        submitForm() {
            let success = {
                status: false,
                // title: this.DOM.form.getAttribute('data-title-succ') || '',
                // sub: this.DOM.form.getAttribute('data-sub-succ') || '',
                // cap: this.DOM.form.getAttribute('data-cap-succ') || '',
            };
            const formsObj = this.mapFormToObject(this.DOM.form);
            const rules = this.mapObjectFormToValidate(this.DOM.form, formsObj);

            const { errorObj, isValidated } = this.validateForm({
                formsObj: formsObj,
                rules: rules,
            });

            if (isValidated) {
                success.status = true;
                return { success };
            } else {
                success.status = false;
                return { errorObj, success };
            }
        }

        checkValidateAction(e) {
            const { errorObj: errors, success } = this.submitForm();
            console.log('success.status', success.status)
            if (success.status) {
                this.reset();
            } else {
                e && e.preventDefault(); // check is button submit form skip submit action 
            }
            this.active(errors);

            return success.status
        }
        handleCheckBtnDisabled() {
            const btnStyle = this.DOM.form.querySelector('.btn-primary');
            const form = new FormData(this.DOM.form)
            const entries = Object.fromEntries(form.entries())
            const isEmpty = Object.values(entries).some(value => !!value);


            if (isEmpty) {
                btnStyle.removeAttribute('disabled')
            } else {
                btnStyle.setAttribute('disabled', true)
            }
        }
        formHandler() {
            this.inputInteractionInit();
            const btnSubmit = this.DOM.form.querySelector(this.DOM.classBtn);

            if (!btnSubmit) return;
            btnSubmit.addEventListener("click", (e) => {
                this.checkValidateAction(e)
            });


            this.DOM.form.addEventListener('input', this.handleCheckBtnDisabled.bind(this))
            this.handleCheckBtnDisabled()

        }

        inputInteractionInit() {
            //Init input action 
            this.handleDropDown()
            this.DOM.form?.querySelectorAll(this.DOM.classInput).forEach(item => {

                item.addEventListener("focus", () => {
                    item.parentElement?.classList.add("active");
                });
                item.addEventListener("blur", () => {
                    item.parentElement?.classList.remove("active");
                });
                item.addEventListener("keyup", () => {
                    if (item?.value != "") {
                        item.parentElement?.classList.add("filled");
                    } else {
                        item.parentElement?.classList.remove("filled");
                    }
                });
            });

            //Init error  message
            this.DOM.form.querySelectorAll(this.DOM.classWrap).forEach(item => {
                const errorSpan = document.createElement("div");
                errorSpan.classList.add("txt", "txt-14", "ct-form-inner-item-error");
                errorSpan.innerHTML = "";
                item.appendChild(errorSpan);
                gsap.set(errorSpan, { height: 0 });
            });

            //Phone input validate
            this.DOM.form.querySelector('[type="tel"]')?.addEventListener("input", e => {
                if (!(e.target instanceof HTMLInputElement)) return;
                let newValue = e.currentTarget.value.replace(new new RegExp(/[^\d-.+ ()()]/, "ig"), "");
                e.currentTarget.value = newValue;
            });
        }
        active(errors) {
            if (!this.DOM.form) return;
            const listInput = this.DOM.form.querySelectorAll(this.DOM.classInput)

            listInput.forEach((input, index) => {
                let errorEl = input.parentElement.parentElement?.querySelector(".ct-form-inner-item-error");
                const wrapItem = errorEl.parentElement.querySelector(this.DOM.classItem);


                if (errors?.hasOwnProperty(input.getAttribute("name"))) {
                    wrapItem.classList.add("error");

                    gsap.to(errorEl, {
                        duration: 0.8,
                        ease: "power3",
                        height: "auto",
                        overwrite: 'auto'
                    });
                    errorEl.innerHTML = errors[input.getAttribute("name")];

                } else {
                    if (wrapItem.classList.contains('error')) wrapItem.classList.remove('error')

                    gsap.to(errorEl, {
                        duration: 0.8,
                        ease: "power3",
                        height: "0",
                        overwrite: 'auto',

                        onComplete: () => {
                            if (!errorEl) return
                            errorEl.innerHTML = "";
                        },
                    });
                }
            });
        }
        reset() {
            Array.from(this.DOM.form.querySelectorAll(this.DOM.classInput)).forEach(node => {
                let errorEl = node.parentElement?.lastChild;
                if (!errorEl) return;

                gsap.to(errorEl, {
                    duration: 0.8,
                    ease: "power3",
                    height: "0",
                    onComplete: () => {
                        errorEl.innerHTML = "";
                    },
                });
            });
        }
    }

    const optionsDrawSvg = {
        optionRocket: {
            road_pad: {
                duration: 1.6,
                delay: 0,
            },
            road: {
                duration: 1,
                delay: 0.5
            },
            robot: {
                duration: 1,
                delay: 1.2
            },
            circle_1: {
                duration: 1,
                delay: 1.1
            },
            circle_2: {
                duration: 1,
                delay: 1.3
            },
            circle_3: {
                duration: 1,
                delay: 1.2
            },
            cube: {
                duration: 1.3,
                delay: 0.6
            },
            waves: {
                duration: 1.3,
                delay: 0.8
            },
            chart_bar: {
                duration: 1.3,
                delay: 0.6,
                animation: function handleChartLine() {
                    const svgChart = $('.chart_bar').find('path')
                    const chartsOption = [
                        'M454.396 344.738C454.396 344.138 454.637 343.515 454.933 343.338L463.359 338.467C463.654 338.298 463.896 338.643 463.896 339.242V375.11C463.896 375.709 463.654 376.331 463.359 376.508L454.933 381.381C454.637 381.55 454.396 381.204 454.396 380.605V344.738Z',
                        'M465 338.384C465 337.778 465.248 337.148 465.552 336.969L474.211 332.043C474.514 331.872 474.763 332.221 474.763 332.827V369.095C474.763 369.701 474.514 370.33 474.211 370.509L465.552 375.436C465.248 375.607 465 375.257 465 374.651V338.384Z',
                        'M476 360.384C476 359.778 476.248 359.148 476.552 358.97L485.211 354.043C485.514 353.872 485.763 354.221 485.763 354.828V363.073C485.763 363.679 485.514 364.308 485.211 364.487L476.552 369.414C476.248 369.585 476 369.235 476 368.629V360.384Z',
                        'M486 326.384C486 325.778 486.248 325.148 486.552 324.969L495.211 320.043C495.514 319.872 495.763 320.221 495.763 320.827V357.095C495.763 357.701 495.514 358.33 495.211 358.509L486.552 363.436C486.248 363.607 486 363.257 486 362.651V326.384Z'
                    ]
                    gsap.to(svgChart, {
                        repeat: -1,
                        yoyo: true,
                        duration: 1.5,
                        attr: (index) => {
                            return {
                                d: chartsOption[index]
                            }
                        }
                    })
                }
            },
            chart_cicle: {
                duration: 1.3,
                delay: 0.6
            },
            chart_line: {
                duration: 0.7,
                delay: 0.6,

            },
            chart_dots: {
                duration: 0.9,
                delay: 0.6,
                animation: function handleChartDots() {
                    const dots = $('.chart_dots').find('path:not(.frame_chart_dots)');
                    gsap.fromTo(dots, {
                        opacity: 0
                    }, {
                        opacity: 1,
                        duration: 1.2,
                        ease: "power1.inOut",
                        willChange: "opacity",
                        stagger: {
                            amount: 1,
                            grid: [6, 6],
                            repeat: -1,
                            yoyo: true,
                            from: "random"
                        }
                    });
                }
            },
            chart_wave: {
                duration: 1.3,
                delay: 0.6
            },
            speaker: {
                duration: 1,
                delay: 1.2
            },
            chart: {
                duration: 1,
                delay: 1.15
            },
            chartv2: {
                duration: 1,
                delay: 1.1
            },
            board: {
                duration: 1,
                delay: 0.8
            },
            wave: {
                duration: 1,
                delay: 0.96
            },
            rocket: {
                duration: 2,
                delay: 3
            },
            circle: {
                duration: 1,
                delay: 1.05
            }
        }
    }
    const SCRIPT = {};

    SCRIPT.homeScript = () => {
        handleSwiperMobile()
        handleSwiperCaseStudy({ section: 'home-casestudy' })
        handleDrawIconProblem()
        handleProblem()
        handleSetItemFAQ({
            wrapItem: 'home-faq-item',
            wrapItemContent: 'home-faq-item-content-decswrap',
        })
        handleMarque()
        handleStackCard()
        handleTestimonial()
        // helper.isLoaded({ element: $('.home-hero'), play: () => handleDrawPath('.home-hero') }) 

        handleDrawAbout()
        handleLottieInteract({
            id: '#lottie-about', parent: '.home-mission',
            from: 222, to: 449, loopFrame: 449
        }) // 0, 220, 449
        handleLottieInteract({
            id: '#lottie-compare', parent: '.home-factional-frame', from: 280,
            to: 357, loopFrame: 357,
            speed: 0.8
        })
        helper.isLoaded({
            element: $('.home-hero'), play: () => handleLottieInteract({
                id: '#lottie-hero', parent: '.home-hero', from: 439,
                to: 551, loopFrame: 551,
            })
        })
    }

    SCRIPT.aboutScript = () => {
        handleSwiperMobile()
        handleCaareAbout('about-carer')
        handleProblem('about', 'about-discover')
        handleOurTeamHover()
    }
    SCRIPT.cmoScript = () => {
        handleSwiperMobile()
        handleProblem('cmo', 'cmo-discover')
        handleStackCard('cmo')

    }
    SCRIPT.careerScript = () => {
        handleSwiperMobile()
        handleCaareAbout('career-target')
        handleAccordingCareer()
        handleHiddenVacancies()
        handleDropDownSelectForm()
        handleRollBackForm()
    }
    SCRIPT.usecasesScript = () => {
        handleSolutions()
        handleSwiperCaseStudy({ section: 'cases-casestudy' })
        handleSwiperCaseStudy({ section: 'cases-testimonial-casestudy', perViewDesktop: 3.44871, gapDesktop: helper.parseRem(20) })
    }
    SCRIPT.servicesScript = () => {
        handleSwiperMobile();
        handleMotionPath();
        handleAddFirstZero();
        handleSwiperCaseStudy({ section: 'services-casestudy' })
        handleProblem('services-strategy', 'services-strategy')
        handleTeamDisposal();
        handleCompareSectionServices();
        helper.isLoaded({
            element: $('.services-hero'), play: () => handleLottieInteract({
                id: '#lottie-services-hero', parent: '.services-hero', from: 120,
                to: 360, loopFrame: 360,
            })
        });
    }

    SCRIPT.faqsScript = () => {
        handleSetItemFAQ({
            wrapItem: 'faqs-question-item-listchild-inner-item',
            wrapItemContent: 'faqs-faq-item-content-decswrap',
        })
        handleFaqsFilter()
    }
    SCRIPT.learningScript = () => {
        handleSwiperCaseStudy({ section: 'learn-ebook' })
        handleSwiperCaseStudy({ section: 'learn-casestudy' })
        const caseStudy = handleSwiperCaseStudy({ section: 'learn-marketing' })
        handleSearchFormEbook(caseStudy)
        handleDowloadFilePDF()
    }
    SCRIPT.casestudydetailScript = () => {
        handleSwiperCaseStudy({
            section: 'case-detail-orthers-lists',
            perViewDesktop: 3,
            perViewMobile: 1.022857,
            perViewTablet: 2.18,
        })
    }
    SCRIPT.pricingScript = () => {
    }
    SCRIPT.contactScript = () => {
        handleSubmitForm()
    }
    SCRIPT.termScript = () => {
        initTerm()
    }
    globalScript()

    const pageName = $(".main").attr("name-space")?.split('-').join('');
    if (pageName) {
        console.log(`Running ${pageName} script`)
        SCRIPT[`${pageName}Script`]?.();
        handleReset()
    }

};


document.addEventListener('DOMContentLoaded', () => {
    bpScript()
})
