const mainScript = () => {
    gsap.registerPlugin(ScrollTrigger);

    $("html").css("scroll-behavior", "auto");
    $("html").css("height", "auto");

    let lenis = new Lenis({});

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    const viewport = {
        w: window.innerWidth,
        h: window.innerHeight,
    };
    const pointer = {
        x: $(window).width() / 2,
        y: $(window).height() / 2,
        xNor: $(window).width() / 2 / $(window).width(),
        yNor: $(window).height() / 2 / $(window).height(),
    };
    const xSetter = (el) => gsap.quickSetter(el, "x", `px`);
    const ySetter = (el) => gsap.quickSetter(el, "y", `px`);
    const xGetter = (el) => gsap.getProperty(el, "x");
    const yGetter = (el) => gsap.getProperty(el, "y");
    const lerp = (a, b, t = 0.08) => {
        return a + (b - a) * t;
    };
    function setupIframe() {
        let iframes = $("iframe");
        iframes.each(function (idx, item) {
            const src = $(item).attr('data-src');
        
            // Kiểm tra xem src có chứa "youtube"
            if (src && src.includes('youtube')) {
                $(item).closest('.w-iframe').addClass('iframe-youtube');
            }
        
            // Gán src mới từ data-src nếu có
            const dataSrc = $(item).attr("data-src");
            if (dataSrc) {
                $(item).attr("src", dataSrc);
            }
        });        
    }
    function setupImg() {
        $('.w-richtext-figure-type-image').each((idx, item) => {
            let link = $(item).find('a').attr('href');
            if(link && link.includes('img-logo')){
                $(item).addClass('img-logo-richtext');
            }
        })
    }
    
    function isInHeaderCheck(el) {
        const rect = $(el).get(0).getBoundingClientRect();
        const headerRect = $('.header').get(0).getBoundingClientRect();
        return (
            rect.bottom >= 0 &&
            rect.top - headerRect.height/3  <= 0
        );
    }
    const distance= (x1,y1,x2,y2) => {
        return Math.hypot(x2-x1, y2-y1);
    }
    const isTouchDevice = () => {
        return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
        );
    };
    window.addEventListener("pageshow", function (event) {
        event.preventDefault();
        var historyTraversal = event.persisted ||
            (typeof window.performance != "undefined" &&
                window.performance.navigation.type === 2);
                console.log(historyTraversal)
        if (historyTraversal) {
            $('.header-menu-inner').removeAttr('style');
            $('.header-menu-inner').removeClass('active');
        }
    })
    if (!isTouchDevice()) {
        $("html").attr("data-has-cursor", "true");
        window.addEventListener("pointermove", function (e) {
        updatePointer(e);
        });
    } else {
        $("html").attr("data-has-cursor", "false");
        window.addEventListener("pointerdown", function (e) {
        updatePointer(e);
        });
    }
    function multiLineText(el){
        let line = $(el).find('.line');
            let textMapLine = $(el).find('.bp-line');
            let lineClone = line.clone();
            console.log(lineClone)
            if(textMapLine.length >1){
                line.remove();
                textMapLine.each((idx, item) => {
                    $(item).css({
                        position: 'relative',
                        width: 'max-content'
                      });
                    $(item).append(lineClone.clone());
                })
            }
    }
    function activeItem(elArr, index) {
        elArr.forEach((el, idx) => {
            $(el).removeClass('active').eq(index).addClass('active')
        })
    }
    function activeImage(els, index, zIndexVal) {  
        $(els).eq(index).css('z-index', zIndexVal);
        $(els).removeClass('active');
        $(els).eq(index).addClass('active');
        gsap.fromTo($(els).eq(index), {scale:0}, {duration: .8, scale: 1.2, ease: "power4.out"})
    }
    function customLinkRichText(el) {
        $(el)
        .find("a")
        .each(function (idx, item) {
            $(item).attr("data-link-prevent", "true");
        });
    }
    function updatePointer(e) {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        pointer.xNor = (e.clientX / $(window).width() - 0.5) * 2;
        pointer.yNor = (e.clientY / $(window).height() - 0.5) * 2;
        if (cursor.userMoved != true) {
        cursor.userMoved = true;
        cursor.init();
        }
    }
    const parseRem = (input) => {
        return (input / 10) * parseFloat($("html").css("font-size"));
    };
    function setupMarquee(marqueeClass) {
        marqueeClass.each(function (index, item) {
        const width = $(item).find("[data-marquee = inner]").width();
        const length = Math.floor($(item).width() / width) + 1;
        for (var i = 0; i < length; i++) {
            let $originalList = $(item).find("[data-marquee = inner]").eq(0);
            let $clonedList = $originalList.clone();
            $(item).append($clonedList);
        }
        });
    }

    class TriggerSetup {
        constructor(triggerEl) {
        this.tlTrigger;
        this.triggerEl = triggerEl;
        }
        setTrigger(setup) {
            if(viewport.w > 767){
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.triggerEl,
                        start: "top bottom+=50%",
                        end: "bottom top",
                        once: true,
                        onEnter: () => setup(),
                    },
                });
            }
            else {
                setup();
            }
        }
    }
    class Loading {
        constructor() {}
        isDoneLoading() {
        return true;
        }
    }
    let load = new Loading();
    class Cursor {
        constructor() {
        this.targetX = pointer.x;
        this.targetY = pointer.y;
        this.userMoved = false;
        xSetter(".cursor-main")(this.targetX);
        ySetter(".cursor-main")(this.targetY);
        }
        init() {
        requestAnimationFrame(this.update.bind(this));
        $(".cursor-main .cursor-inner").addClass("active");
        }
        isUserMoved() {
        return this.userMoved;
        }
        update() {
        if (this.userMoved || load.isDoneLoading()) {
            this.updatePosition();
        }
        requestAnimationFrame(this.update.bind(this));
        }
        updatePosition() {
        this.targetX = pointer.x;
        this.targetY = pointer.y;
        let targetInnerX = xGetter(".cursor-main");
        let targetInnerY = yGetter(".cursor-main");

        if ($("[data-cursor]:hover").length) {
            this.onHover();
        } else {
            this.reset();
        }

        if (
            Math.hypot(this.targetX - targetInnerX, this.targetY - targetInnerY) >
            1 ||
            Math.abs(lenis.velocity) > 0.1
        ) {
            xSetter(".cursor-main")(lerp(targetInnerX, this.targetX, 0.1));
            ySetter(".cursor-main")(
            lerp(targetInnerY, this.targetY - lenis.velocity / 16, 0.1)
            );
        }
        }
        onHover() {
        let type = $("[data-cursor]:hover").attr("data-cursor");
        let gotBtnSize = false;
        if ($("[data-cursor]:hover").length) {
            switch (type) {
            case "explore": 
                $(".cursor").addClass("on-hover-explore");
                break;
            case "drag": 
                $(".cursor").addClass("on-hover-drag");
            break;
            case "detail": 
                $(".cursor").addClass("on-hover-detail");
            break;
            case "hidden": 
                $(".cursor").addClass("on-hover-hidden");
                break;
            default:
                break;
            }
        } else {
            gotBtnSize = false;
        }
        }
        reset() {
        $(".cursor").removeClass("on-hover-explore");
        $(".cursor").removeClass("on-hover-hidden");
        $(".cursor").removeClass("on-hover-drag");
        $(".cursor").removeClass("on-hover-detail");
        }
    }
    let cursor = new Cursor();
    class TriggerSetupHero {
        constructor() {}
        init(play) {
            let tl = gsap.timeline({
                onStart: () => {
                setTimeout(() => play(), viewport.w > 767 ? 2000 : 1200);
                },
            });
        }
    }
    class Image {
        constructor(el) {
            this.DOM = { el: el };
            this.defaultStyle = {
                scale: 0,
                x: 0,
                y: 0,
                opacity: 0
            };
            this.getRect();
            this.initEvents();
        }

        initEvents() {
            window.addEventListener('resize', () => this.resize());
        }

        resize() {
            gsap.set(this.DOM.el, this.defaultStyle);
            this.getRect();
        }

        getRect() {
            this.rect = this.DOM.el.getBoundingClientRect();
        }

        isActive() {
            return gsap.isTweening(this.DOM.el) || parseFloat(this.DOM.el.style.opacity) !== 0;
        }
    }
    let mousePos = lastMousePos = cacheMousePos = {x: 0, y: 0};
    const getMouseDistance = () => distance(mousePos.x,mousePos.y,lastMousePos.x,lastMousePos.y);
    class ImageTrail {
        constructor(wrapperSelector = '.home-explore') {
            this.DOM = { content: document.querySelector(wrapperSelector) };
            this.wrapperSelector = wrapperSelector;
            this.images = [];
            [...this.DOM.content.querySelectorAll('.home-explore-img')].forEach(img => this.images.push(new Image(img)));
            this.imagesTotal = this.images.length;
            this.imgPosition = 0;
            this.zIndexVal = 1;
            this.threshold = 90;
            this.isInside = false;
            this.idleInterval = null;
            this.bindHoverArea();
            requestAnimationFrame(() => this.render());
        }
    
        bindHoverArea() {
            const wrapper = document.querySelector(this.wrapperSelector);
            wrapper.addEventListener('mouseenter', () => {
                this.isInside = true;
            });
            wrapper.addEventListener('mouseleave', () => {
                this.isInside = false;
            });
        }
    
        render() {
            if (!this.isInside) {
                requestAnimationFrame(() => this.render());
                if (this.idleInterval) {
                    clearInterval(this.idleInterval);
                    this.idleInterval = null;
                }
                return;
            }
    
            let distance = getMouseDistance();
            mousePos = { x: xGetter('.cursor-main'), y: yGetter('.cursor-main') };
            cacheMousePos.x = lerp(cacheMousePos.x || mousePos.x, mousePos.x, 0.2);
            cacheMousePos.y = lerp(cacheMousePos.y || mousePos.y, mousePos.y, 0.2);
    
            if (distance > this.threshold) {
                this.showNextImage();
                this.zIndexVal++;
                this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
                lastMousePos = mousePos;
                if (this.idleInterval) {
                    clearInterval(this.idleInterval);
                    this.idleInterval = null;
                }
            }
            else {
                if (!this.idleInterval && distance == 0) {
                    this.idleInterval = setInterval(() => {
                        this.showNextImage();
                        this.zIndexVal++;
                        this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
                        lastMousePos = mousePos;
                    }, 600);
                }
            }
    
            let isIdle = true;
            for (let img of this.images) {
                if (img.isActive()) {
                    isIdle = false;
                    break;
                }
            }
    
            if (isIdle && this.zIndexVal !== 1) {
                this.zIndexVal = 1;
            }
    
            requestAnimationFrame(() => this.render());
        }
    
        showNextImage() {
            const img = this.images[this.imgPosition];
            gsap.killTweensOf(img.DOM.el);
    
            gsap.timeline()
                .set(img.DOM.el, {
                    opacity: 0,
                    scale: 0,
                    zIndex: this.zIndexVal,
                    x: cacheMousePos.x - img.rect.width / 2,
                    y: cacheMousePos.y - img.rect.height / 2,
                    rotate: gsap.utils.random(-30, 30)
                })
                .to(img.DOM.el, {
                    duration: .8,
                    ease: "expo.out",
                    opacity: 1,
                    scale: 1,
                    x: mousePos.x - img.rect.width / 2,
                    y: mousePos.y - img.rect.height / 2,
                    
                }, 0)
                .to(img.DOM.el, {
                    duration: 1,
                    ease: "power1.in",
                    opacity: 0,
                    
                }, 0.7)
                .to(img.DOM.el, {
                    duration: 1,
                    ease: "power1.in",
                    scale: 0
                }, 0.9);
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
            new MasterTimeline({
                timeline: this.tl,
                allowMobile: true,
                tweenArr: [
                    new FadeSplitText({ el: $('.home-hero-year').get(0), onMask: true }),
                    new FadeSplitText({ el: $('.home-hero-title').get(0), onMask: true, headingType: true, delay: '<=0' }),
                    new FadeSplitText({ el: $('.home-hero-intro-label').get(0), onMask: true, delay: '<=.1' }),
                    new FadeSplitText({ el: $('.home-hero-intro-body').get(0), onMask: true, delay: '<=.1' }),
                    
                ]
            });
        }
        play() {
            this.tl.play();
        }
    }
    const homeHero = new HomeHero();
    class HomeExplore extends TriggerSetup {
        constructor(triggerEl) {
            super(triggerEl);
        }
        trigger() {
        super.setTrigger(this.setup.bind(this));
        }
        setup() {
            const $container = $('.home-explore-img-inner');
            const $items = $container.find('.home-explore-img');
            const totalItemsNeeded = 28;
        
            if ($items.length > 0) {
                let index = 0;
                while ($container.find('.home-explore-img').length < totalItemsNeeded) {
                    const $clone = $items.eq(index).clone();
                    $container.append($clone);
                    index = (index + 1) % $items.length; // Lặp lại từ đầu nếu hết danh sách
                }
            }
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: this.triggerEl,
                    start: "top top+=55%",
                    once: true,
                },
            });
            new MasterTimeline({
                timeline: tl,
                tweenArr: [
                    new FadeSplitText({ el: $('.home-explore-title').get(0), onMask: true })
                ]
            })
           viewport.w > 991 && new ImageTrail('.home-explore');
        }
    }
    let homeExplore = new HomeExplore(".home-explore-wrap");
    class HomeSenses extends TriggerSetup {
        constructor(triggerEl) {
        super(triggerEl);
        }
        trigger() {
            super.setTrigger(this.setup.bind(this));
            this.interact();
        }
        setup() {
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: this.triggerEl,
                    start: "top top+=45%",
                    once: true,
                },
            })
            new MasterTimeline({
                timeline: tl,
                tweenArr: [
                    ...Array.from($('.home-senses-menu-item-txt')).flatMap((el, idx) => new FadeSplitText({ el: el, onMask: true, delay: idx == 0? '<=0' : '<=.1' })),
                ]
            })
            if(viewport.w > 991) {
                this.initContentPopup();
                activeItem(['.home-senses-menu-item'], 0);
                let listBg = $(".home-senses-bg-item");
                let listItemMenu = ['.home-senses-menu-item'];
                let triggered = new Array(listBg.length).fill(false);
                let wasFullyScaled = new Array(listBg.length).fill(false);
                gsap.set(listBg, {scale: 0});
                gsap.set(listBg[0], {scale: 1});
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: $(".home-senses"),
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                        onUpdate: (self) => {
                            if(self.progress == 1 ){
                                activeItem(listItemMenu, listBg.length -1);
                            }
                            listBg.each((i, el) => {
                                const currentScale = gsap.getProperty(el, "scale");
                                if (!triggered[i] && currentScale >= .3) {
                                    triggered[i] = true;
                                    wasFullyScaled[i] = true;
                                    console.log(`➡ Element ${i} scaled to 1`);
                                    activeItem(listItemMenu, i);
                                }
                                if (wasFullyScaled[i] && currentScale < .3) {
                                    wasFullyScaled[i] = false;
                            
                                    const prevIndex = i - 1;
                                    if (prevIndex >= 0 && triggered[prevIndex]) {
                                        console.log(`⬅ Scroll up: Element ${i} scaling down — trigger previous index ${prevIndex}`);
                                        activeItem(listItemMenu, prevIndex);
                                    }
                                    triggered[i] = false;
                                }
                            });
                            
                        }
                    },
                })
                listBg.each((i, el) => {
                    switch (i) {
                        case 0:
                            tl.to(el, {
                                scale: 2,
                                ease: "none",
                                duration: 0.5,
                            });
                            break;
                        case listBg.length - 1:
                            tl.to(el, {
                                scale: 1,
                                ease: "none",
                                duration: 0.5,
                            }, '-=0.5');
                            break;
                        default:
                            tl.to(el, {
                                scale: 2,
                                ease: "none",
                                duration: 1,
                            }, '-=0.5');
                            break;
                        }
                })
            }
            else {
                
                let listBg = $(".home-senses-bg-item-inner");
                listBg.each((i, el) => {
                    let tl = new gsap.timeline({
                        scrollTrigger: {
                            trigger: el,
                            start: "top bottom",
                            end: "bottom+=100% bottom",
                            scrub: 1,
                        },
                    });
                    tl.to(el, { yPercent: -20, duration: 1, ease: "none"})

                })
            }
            
        }
        interact() {
            if(viewport.w > 991) {
                $(".home-senses").on('click', function(e){
                    console.log('click');
                    let target = e.target;
                    if (!target.closest('.home-senses-popup')) {
                        $(this).attr('data-cursor', 'hidden');
                        $('.header').addClass('on-hidden')
                        let indexActive = $('.home-senses-menu-item.active').index();
                        activeItem(['.home-popup-item'], indexActive);
                        $('.global-popup-wrap').addClass('has-popup');
                        lenis.stop();
                        cursor.reset();
                    }
                })
            } 
            else {
                $('.home-senses-bg-item-content-link').on('click', function(e){
                    let index = $(this).closest('.home-senses-bg-item').index();
                    $('.header').addClass('on-hide');
                    lenis.stop();
                    activeItem(['.home-popup-item'], index);
                    $(".global-popup-wrap").addClass('has-popup');
                    lenis.stop();
                })
                $('.home-popup-item').on('scroll', function(e){
                    if($(this).scrollTop()  < -80 ){
                        $('.global-popup-wrap').removeClass('has-popup');
                        lenis.start();
                        cursor.reset();
                    }
                })
            }
            $('.home-senses-popup-close').on('click', function(e){
                e.preventDefault();
                $('.header').removeClass('on-hidden')
                $('.global-popup-wrap').removeClass('has-popup');
                $('.home-senses').attr('data-cursor', 'explore');
                viewport.w < 991 && lenis.start();
                cursor.reset();
                lenis.start();
            })
            $('.home-senses-popup').on('click', function(e){
                let target = e.target;
                if($('.global-popup-wrap').hasClass('has-popup')){
                    if (!target.closest('.home-senses-popup-inner')) {
                        $('.header').removeClass('on-hidden')
                        $('.global-popup-wrap').removeClass('has-popup');
                        $('.home-senses').attr('data-cursor', 'explore');
                        viewport.w < 991 && lenis.start();
                        cursor.reset();
                        lenis.start();
                    }
                }
            })
            $('.home-popup-item').on('scroll', ()=> {
                this.ItemContentActiveCheck('.home-popup-item.active .home-popup-item-content h6');
            })
            $('.home-popup-item.active  .home-popup-item-left-inner').on('click', '.home-popup-item-left-content', function(e) {
                e.preventDefault();
                console.log('click');
                $('.home-popup-item-left-content').removeClass('active');
                $(this).addClass('active');
                let dataHeader = $(this).attr('data-title');
                var scrollTop =  $(`.home-popup-item.active .home-popup-item-content h6[data-title="${dataHeader}"]`).offset().top + $('.home-popup-item.active').scrollTop() - $('.home-popup-item.active').offset().top - parseFloat($('.home-popup-item.active .home-popup-item-left-inner').css('top'));
                console.log($('.home-popup-item.active').offset().top )
                $('.home-popup-item.active').animate({
                    scrollTop: scrollTop
                }, 2000);
            })
        }
        ItemContentActiveCheck(el) {
            for (let i = 0; i < $(el).length; i++) {
                let top = $(el).eq(i).get(0).getBoundingClientRect().top;
                if (top > 0 && top + $(el).eq(i).height() < viewport.h/4*3 ) {
                    $('.home-popup-item.active .home-popup-item-left-content').removeClass('active');
                    $('.home-popup-item.active .home-popup-item-left-content').eq(i).addClass('active');
                }
                }
        }
        initContentPopup() {
            let titleLeft = $('.home-popup-item-left-content').eq(0).clone();
            $('.home-popup-item-left-content').remove();
            $('.home-popup-item').each((idx, item) => {
                $(item).find('.home-popup-item-content h6').each((i, el) => {
                    $(el).attr('data-title', `toch-${i}`);
                    let titleLeftClone = titleLeft.clone();
                    if(i == 0) {
                        titleLeftClone.addClass('active');
                    }
                    titleLeftClone.find('.home-popup-item-left-title').text($(el).text());
                    titleLeftClone.attr('data-title', `toch-${i}`);
                    $(item).find('.home-popup-item-left-inner').append(titleLeftClone);
                })
            })

        }
    }
    let homeSenses = new HomeSenses(".home-senses-wrap");
    class HomeFeatured extends TriggerSetup {
        constructor(triggerEl) {
        super(triggerEl);
        }
        trigger() {
            super.setTrigger(this.setup.bind(this));
        }
        setup() {
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-featured',
                    start: "top top+=55%",
                },
            })
            $('.home-featured-right-item').each((idx, el) => {
                let linkInner = $(el).find('.home-featured-right-item-inner')
                let dataLinkDetail = linkInner.attr('data-link-detail');
                let dataLinkType = linkInner.attr('data-link-type');
                let linkCurrent = linkInner.attr('href');
                linkInner.attr('href', `${linkCurrent}?detail=${dataLinkDetail}&type=${dataLinkType}`);
            })
            $('.home-featured-left-inner').each((idx, el) => {
                let linkInner = $(el).find('.home-featured-left-inner-link')
                let dataLinkDetail = linkInner.attr('data-link-detail');
                let dataLinkType = linkInner.attr('data-link-type');
                let linkCurrent = linkInner.attr('href');
                linkInner.attr('href', `${linkCurrent}&detail=${dataLinkDetail}`);
            })
            $('.home-featured-img-item').each((idx, el) => {
                let tlItem = gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        start: "top top+=75%",
                    },
                })
                new MasterTimeline({
                    timeline: tlItem,
                    tweenArr: [
                        new ScaleInset({ el: $(el).find('.home-featured-img-item-inner').get(0)}),
                    ]
                })
            })
            let tlLabel = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-featured',
                    start: "top top+=65%",
                },
            })
            new MasterTimeline({
                timeline: tlLabel,
                tweenArr: [
                   ...Array.from($('.home-featured-label')).flatMap((el, idx) => new FadeSplitText({ el: el, onMask: true})),
                ]
            })
            if(viewport.w > 768 ) {
                $('.home-featured-left-inner').each((idx, el) => {
                    let title = new SplitType($(el).find('.home-featured-title'), {types: 'words, lines', lineClass: 'bp-line'});
                    let sub = new SplitType($(el).find('.home-featured-info-label'), {types: 'words, lines', lineClass: 'bp-line'});
                    let desc = new SplitType($(el).find('.home-featured-info-body'), {types: 'words, lines', lineClass: 'bp-line'});
                    gsap.set(title.words, {yPercent: 100});
                    gsap.set(sub.words, {yPercent: 100});
                    gsap.set(desc.words, {yPercent: 100});
                    if(idx === 0) {
                        tl
                        .to(title.words, {yPercent: 0, duration: .4, stagger: 0.015, ease: "power1.out"})
                    }
    
                    $(el).find('.home-featured-time-item').each((i, item) => {
                        console.log($(item).find('.home-featured-time-label'));
                        let itemLabel = new SplitType($(item).find('.home-featured-time-item-label'), {types: 'words, lines', lineClass: 'bp-line'});
                        let itemTitle = new SplitType($(item).find('.home-featured-time-item-title'), {types: 'words, lines', lineClass: 'bp-line'});
                        gsap.set(itemLabel.words, {yPercent: 100});
                        gsap.set(itemTitle.words, {yPercent: 100});
                        if(idx === 0) {
                            tl
                            .to(itemLabel.words, {yPercent: 0, duration: .4, stagger: 0.015, ease: "power1.out"}, `<=0`)
                            .to(itemTitle.words, {yPercent: 0, duration: .4, stagger: 0.015, ease: "power1.out"}, '<=0')
                        }
                    })
                    if(idx === 0) {
                        tl
                        .to(sub.words, {yPercent: 0, duration: .3, stagger: 0.01, ease: "power1.out"}, `<=0`)
                        .to(desc.words, {yPercent: 0, duration: .3, stagger: 0.01, ease: "power1.out"}, '<=0')
                    }
                })
                let itemLeft = $(".home-featured-left");
                let innerImg = $(".home-featured-img-inner");
                const leftInners = $('.home-featured-left-inner');
                const linkItemRight = $('.home-featured-right-item');
                let heightInnerImg = innerImg.height();
                let stickyTopInnerImg = (viewport.h - heightInnerImg)/2;
                innerImg.css('top', stickyTopInnerImg);
                let heightLeft = itemLeft.height();
                let stickyTopLeft = (viewport.h - heightLeft)/2;
                itemLeft.css('top', stickyTopLeft);
                const items = $('.home-featured-img-item');
                const count = items.length;
                const radius = window.innerWidth ; 
                const totalAngle = 30* (count - 1); 
                gsap.set('.home-featured-img-inner', {rotate: totalAngle, x: -radius})
                $('.home-featured-img-wrap').css('height', `${count}00vh`);
                let previousIndex = 0;
                items.each((i, el) => {
                    const baseAngle = (totalAngle / (count - 1)) * i - totalAngle/(count - 1) ;
                    el.style.transform = `rotate(-${baseAngle}deg) translateX(${radius}px)`;
                    gsap.to(el, {
                        scrollTrigger: {
                        trigger: '.home-featured',
                        start: 'top bottom+=10%',
                        end: 'bottom-=10% bottom',
                        scrub: 1,
                        snap: 1 / count,
                        onUpdate: self => {
                            const progress = self.progress; 
                            const dynamicAngle = baseAngle + progress * totalAngle + progress*totalAngle/(count - 1);
                            el.style.transform = `
                                rotate(-${dynamicAngle}deg)
                                translateX(${radius}px)
                            `;
                            const index = Math.floor(progress * (count -1) + progress*.3);
                            if (index !== previousIndex) {  
                                previousIndex = index;  
                                leftInners.removeClass('active');
                                leftInners.eq(index).addClass('active');
                                this.activeContent(index);
                                linkItemRight.removeClass('active');
                                linkItemRight.eq(index).addClass('active');
                            }
                        },
                        },
                    });
                });
            }
            else {
                $('.home-featured-img-wrap').addClass('swiper');
                $('.home-featured-img-inner').addClass('swiper-wrapper');
                $('.home-featured-img-item').addClass('swiper-slide');
                $('.home-featured-img-wrap').append('<div class="home-featured-pagination"></div>')
                let totalSlide = $('.home-featured-img-item').length;
                let swiper = new Swiper(".home-featured-img-wrap", {
                    slidesPerView: 1,
                    spaceBetween: parseRem(40),
                    initialSlide: 1,
                    pagination: {
                        el: '.home-featured-pagination',
                        bulletClass: 'global-swiper-pagination-item',
                        bulletActiveClass: 'active',
                        clickable: true,
                        
                    },
                    on: {
                        init: function() {
                            activeItem(['.home-featured-left-inner'], 1)
                        },
                        slideChange: function(){
                            let index = this.realIndex;
                            activeItem(['.home-featured-left-inner'], totalSlide - index - 1);
                        }
                    }

                });
                
            }
        }
        activeContent(index){
            if(lenis.direction == 1) {
                if(index!=0) {
                    gsap.to($('.home-featured-left-inner').eq(index-1).find('.home-featured-title .word'),{yPercent: -100, stagger: .01, duration: .4, ease: "power1.out"} )
                    $('.home-featured-left-inner').eq(index-1).find('.home-featured-time-item').each((i, item) => {
                        gsap.to($(item).find('.home-featured-time-item-label .word'),{yPercent: -100, stagger:.01, duration:.4, ease: "power1.out"})
                        gsap.to($(item).find('.home-featured-time-item-title .word'),{yPercent: -100, stagger:.01, duration:.4, ease: "power1.out"})
                    })
                    gsap.to($('.home-featured-left-inner').eq(index-1).find('.home-featured-info-label .word'),{yPercent: -100, stagger: .01, duration: .3, ease: "power1.out"})
                    gsap.to($('.home-featured-left-inner').eq(index-1).find('.home-featured-info-body .word'),{yPercent: -100, stagger: .01, duration: .3, ease: "power1.out"})

                    gsap.to($('.home-featured-left-inner').eq(index).find('.home-featured-title .word'),{yPercent: 0, stagger: .01, duration: .4, delay: '.1', ease: "power1.out"})
                    $('.home-featured-left-inner').eq(index).find('.home-featured-time-item').each((i, item) => {
                        gsap.to($(item).find('.home-featured-time-item-label .word'),{yPercent: 0, stagger:.01, duration:.4, delay: '.1', ease: "power1.out"})
                        gsap.to($(item).find('.home-featured-time-item-title .word'),{yPercent: 0, stagger:.01, duration:.4, delay: '.1', ease: "power1.out"})
                    })
                    gsap.to($('.home-featured-left-inner').eq(index).find('.home-featured-info-label .word'),{yPercent: 0, stagger: .01, delay: '.1', duration: .3, ease: "power1.out"})
                    gsap.to($('.home-featured-left-inner').eq(index).find('.home-featured-info-body .word'),{yPercent: 0, stagger: .01, delay: '.1', duration: .3, ease: "power1.out"})
                } 
            }
            else {
                gsap.to($('.home-featured-left-inner').eq(index+1).find('.home-featured-title .word'),{yPercent: 100, stagger: .01, duration: .4, ease: "power1.out"} )
                $('.home-featured-left-inner').eq(index+1).find('.home-featured-time-item').each((i, item) => {
                    gsap.to($(item).find('.home-featured-time-item-label .word'),{yPercent: 100, stagger:.01, duration:.3, ease: "power1.out"})
                    gsap.to($(item).find('.home-featured-time-item-title .word'),{yPercent: 100, stagger:.01, duration:.3, ease: "power1.out"})
                })
                gsap.to($('.home-featured-left-inner').eq(index+1).find('.home-featured-info-label .word'),{yPercent: 100, stagger: .01, duration: .4, ease: "power1.out"})
                gsap.to($('.home-featured-left-inner').eq(index+1).find('.home-featured-info-body .word'),{yPercent: 100, stagger: .01, duration: .4, ease: "power1.out"})

                gsap.to($('.home-featured-left-inner').eq(index).find('.home-featured-title .word'),{yPercent: 0, stagger: .01, duration: .4, delay: '.1', ease: "power1.out"})
                $('.home-featured-left-inner').eq(index).find('.home-featured-time-item').each((i, item) => {
                    gsap.to($(item).find('.home-featured-time-item-label .word'),{yPercent: 0, stagger:.01, duration:.3, delay: '.1', ease: "power1.out"})
                    gsap.to($(item).find('.home-featured-time-item-title .word'),{yPercent: 0, stagger:.01, duration:.3, delay: '.1', ease: "power1.out"})
                })
                gsap.to($('.home-featured-left-inner').eq(index).find('.home-featured-info-label .word'),{yPercent: 0, stagger: .01, delay: '.1', duration: .3, ease: "power1.out"})
                gsap.to($('.home-featured-left-inner').eq(index).find('.home-featured-info-body .word'),{yPercent: 0, stagger: .01, delay: '.1', duration: .3, ease: "power1.out"})
            }
        }
    }
    let homeFeatured = new HomeFeatured(".home-featured-wrap");
    class HomeThumb extends TriggerSetup {
        constructor(triggerEl) {
        super(triggerEl);
        this.listThumb = $(".home-thumb-main");
        }
        trigger() {
            super.setTrigger(this.setup.bind(this));
        }
        setup() {
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-thumb',
                    start: "top top+=70%",
                },
            })
            setupMarquee($(".home-thumb-main"));
            $('.home-thumb-item').each((idx, el) => {
                new MasterTimeline({
                    timeline: tl,
                    tweenArr: [
                        new ScaleInset({el: el})
                    ]
                })
            })
            let isStartTranslate = false;
            let scrollWidth = -80;
            const handleSetter = (el, x) => {
                const setterXFirst = gsap.quickSetter(el, "x", "%");
                setterXFirst(x);
            };
            
        handleSetter(this.listThumb, -20)
            lenis.on("scroll", (e) => {
                if (isStartTranslate) {
                    const velocity = viewport.w > 991 ? Math.abs(e.velocity / 1.8) : Math.abs(e.velocity / 5);
                    let velocityScroller = Math.abs(velocity / window.innerWidth) * 100;
                    if(e.direction > 0) {
                        scrollWidth += velocityScroller;
                    }
                    else {
                    scrollWidth -= velocityScroller;
                    }
                    const translateWithVelocity = scrollWidth % 100;

                    handleSetter(this.listThumb, translateWithVelocity);
                }
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: $(".home-thumb-main"),
                    start: "top bottom",
                    end: "bottom top",
                    onEnter: () => {
                    isStartTranslate = true;
                    },
                    onLeave: () => {
                    isStartTranslate = false;
                    },
                    onEnterBack: () => {
                    isStartTranslate = true;
                    },
                    onLeaveBack: () => {
                    isStartTranslate = false;
                    },
                },
            });
        }
    }
    let homeThumb = new HomeThumb(".home-thumb-wrap");
    class HomeService extends TriggerSetup {
        constructor(triggerEl) {
        super(triggerEl);
        }
        trigger() {
            super.setTrigger(this.setup.bind(this));
        }
        setup() {
            let tlLabel = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-service',
                    start: "top top+=55%",
                },
            })
            new MasterTimeline({
                timeline: tlLabel,
                tweenArr: [
                   ...Array.from($('.home-service-label')).flatMap((el, idx) => new FadeSplitText({ el: el, onMask: true})),
                ]
            })
            let tlTitle = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-service-title-wrap',
                    start: "top top+=65%",
                },
            })
            new MasterTimeline({
                timeline: tlTitle,
                tweenArr: [
                  new FadeSplitText({ el: $('.home-service-title').get(0), onMask: true}),
                ]
            })

            $('.home-service-item').each((idx, el) => {
                let linkItem = $(el).find('.home-service-item-link');
                let linkItemHref = linkItem.attr('href');
                let dataLinkItem = linkItem.attr('data-link-item');
                linkItem.attr('href', `${linkItemHref}?detail=${dataLinkItem}`);
                let number = idx <=9 ? `0${idx+1}` : idx+1;
                $(el).find('.home-service-item-number').text(`(${number})`);
                let tlItem = gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        start: 'top top+=65%',
                    }
                 })
                new MasterTimeline({
                    timeline: tlItem,
                    tweenArr: [
                        new FadeSplitText({ el: $(el).find('.home-service-item-number').get(0), onMask: true}),
                        new FadeSplitText({ el: $(el).find('.home-service-item-title').get(0), onMask: true}),
                        new FadeSplitText({ el: $(el).find('.home-service-item-sub').get(0), onMask: true}),
                        new FadeIn({ el: $(el).find('.home-service-item-link')}),
                        new ScaleLine({ el: $(el).find('.home-service-item-line-wrap')}),
                    ]
                })

            })
            let tlImg = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-service-img-cms',
                    start: 'top top+=80%',
                }
            })
            new MasterTimeline({
                timeline: tlImg,
                tweenArr: [
                    new FadeIn({ el: $('.home-service-img-list')})
                ]
            })
            if(viewport.w > 991) {
                let zIndexVal = 1;
                let urlImgItemFirtst = $('.home-service-img img').eq(0).attr('src');
                activeItem(['.home-service-img'], 0)
                $('.home-service-img-inner').css('background-image', `url(${urlImgItemFirtst})`);
                $('.home-service-item').hover(
                    function(){
                        let index = $(this).index();
                        zIndexVal++;
                        activeImage('.home-service-img', index, zIndexVal);
                    },
                    function(){
                    }
                )
            }
            else {
                $('.home-service-cms').addClass('swiper')
                $('.home-service-list').addClass('swiper-wrapper')
                $('.home-service-item').addClass('swiper-slide')
                let swiper = new Swiper(".home-service-cms", {
                    slidesPerView: 'auto',
                    spaceBetween: parseRem(20),
                    pagination: {
                        el: '.global-swiper-pagination',
                        bulletClass: 'global-swiper-pagination-item',
                        bulletActiveClass: 'active',
                        clickable: true,
                    },
                    breakpoints: {
                        768: {
                            spaceBetween: parseRem(16)
                        }
                    }
                });
            }

        }
    }
    let homeService = new HomeService(".home-service-wrap");
    class HomeFaq extends TriggerSetup {
        constructor(triggerEl) {
        super(triggerEl);
        }
        trigger() {
        super.setTrigger(this.setup.bind(this));
        }
        setup() {
            let tlTitle = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-faq-title-wrap',
                    start: "top top+=75%",
                },
            })
            new MasterTimeline({
                timeline: tlTitle,
                tweenArr: [
                  new FadeSplitText({ el: $('.home-faq-label').get(0), onMask: true}),
                  new FadeSplitText({ el: $('.home-faq-title').get(0), onMask: true}),
                  new FadeIn({ el: $('.home-faq-view-all').get(0)}),
                  new FadeSplitText({ el: $('.home-faq-view-all-txt').get(0), onMask: true}),
                ]
            })
            let tlItem = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-faq-cms',
                    start: "top top+=75%",
                },
            })
            $('.home-faq-item').each((idx, el) => {
                let number = idx <=9? `0${idx+1}` : idx+1;
                $(el).find('.home-faq-item-number').text(`(${number})`);
                new MasterTimeline({
                    timeline: tlItem,
                    tweenArr: [
                        new ScaleLine({ el: $(el).find('.home-faq-item-line')}),   
                        new FadeIn({ el: $(el).find('.home-faq-item-number')}),
                        new FadeSplitText({ el: $(el).find('.home-faq-item-title').get(0), onMask: true}),
                        new FadeIn({ el: $(el).find('.home-faq-item-ic')}),
                    ]
                })
            })
            $('.home-faq-item').on('click', function(){
                if($(this).hasClass('active')){
                    $(this).removeClass('active')
                    $(this).find('.home-faq-item-sub-wrap').slideUp();
                }
                else {
                    $('.home-faq-item').removeClass('active')
                    $(this).addClass('active')
                    $('.home-faq-item-sub-wrap').slideUp();
                    $(this).find('.home-faq-item-sub-wrap').slideDown();
                }
            })
        }
    }
    let homeFaq = new HomeFaq(".home-faq-wrap");
    class HomeTesti extends TriggerSetup {
        constructor(triggerEl) {
        super(triggerEl);
        }
        trigger() {
        super.setTrigger(this.setup.bind(this));
        }
        setup() {
            let lengthSlide = $(".home-testi-item").length;
            $(".home-testi-pagi-item.total").text(
                lengthSlide < 10 ? "0" + lengthSlide : lengthSlide
            );
            let tl = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-testi',
                    start: "top top+=55%",
                },
            })
            new MasterTimeline({
                timeline: tl,
                tweenArr: [
                    new FadeSplitText({ el: $('.home-testi-label').get(0), onMask: true}),
                    new FadeSplitText({ el: $('.home-testi-title').get(0), onMask: true}),
                    ...Array.from($('.home-testi-item')).flatMap((el, idx) => {
                        return [
                            new FadeIn({ el: $(el).find('.home-testi-item-ic')}),
                            new FadeSplitText({ el: $(el).find('.home-testi-item-time').get(0), onMask: true}),
                            new FadeSplitText({ el: $(el).find('.home-testi-item-body').get(0), onMask: true}),
                            new FadeSplitText({ el: $(el).find('.home-testi-item-name').get(0), delay:1, onMask: true}),
                            new FadeSplitText({ el: $(el).find('.home-testi-item-position').get(0), onMask: true}),
                        ]
                    }),
                ]
            })
            let swiper = new Swiper(".home-testi-cms", {
                loop: true,
                autoplay: {
                    delay: 0,
                    disableOnInteraction:false,
                },
                centeredSlides: true,
                slidesPerView: 'auto',
                speed: 5000,
                loopedSlides: 4,
            });
        }
    }
    let homeTesti = new HomeTesti(".home-testi-wrap");
    class HomeArticle extends TriggerSetup {
        constructor(triggerEl) {
        super(triggerEl);
        this.listThumb = $(".home-thumb-main");
        }
        trigger() {
            super.setTrigger(this.setup.bind(this));
        }
        setup() {
            let tlTitle = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-article-title-wrap',
                    start: "top top+=75%",
                },
            })
            new MasterTimeline({
                timeline: tlTitle,
                tweenArr: [
                  new FadeSplitText({ el: $('.home-article-label').get(0), onMask: true}),
                  new FadeSplitText({ el: $('.home-article-title').get(0), onMask: true}),
                  new FadeIn({ el: $('.home-article-view-all').get(0)}),
                  new FadeSplitText({ el: $('.home-article-view-all-txt').get(0), onMask: true}),
                ]
            })
            let tlItem = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-article-cms',
                    start: 'top top+=65%',
                }
             })
             $('.home-article-item').each((idx, el) => {
                console.log(el)
                new MasterTimeline({
                    timeline: tlItem,
                    tweenArr: [
                        new ScaleInset({ el: $(el).find('.home-article-item-img').get(0)}),
                        new FadeSplitText({ el: $(el).find('.home-article-item-title').get(0), onMask: true}),
                        new FadeSplitText({ el: $(el).find('.home-article-item-sub').get(0), onMask: true}),
                        new FadeIn({ el: $(el).find('.home-article-item-link').get(0)}),
                        new FadeSplitText({ el: $(el).find('.home-article-item-link-txt').get(0), onMask: true}),
                    ]
                })
             })
             
            $('.home-article-item').each((idx, el) => {
                let linkInner = $(el).find('.home-article-item-link')
                let dataLinkDetail = linkInner.attr('data-link-detail');
                let dataLinkType = linkInner.attr('data-link-type');
                let linkCurrent = linkInner.attr('href');
                linkInner.attr('href', `${linkCurrent}?detail=${dataLinkDetail}&type=${dataLinkType}`);
            })
            if(viewport.w < 991) {
                $('.home-article-cms').addClass('swiper')
                $('.home-article-list').addClass('swiper-wrapper')
                $('.home-article-item').addClass('swiper-slide')
                let swiper = new Swiper(".home-article-cms", {
                    slidesPerView: 'auto',
                    spaceBetween: parseRem(16),
                    pagination: {
                        el: '.global-swiper-pagination',
                        bulletClass: 'global-swiper-pagination-item',
                        bulletActiveClass: 'active',
                        clickable: true,
                    },
                });
            }

        }
    }
    let homeArticle = new HomeArticle(".home-article-wrap");
    class MembershipHero extends TriggerSetupHero {
        constructor() {
            super();
            this.tl = null;
        }
        trigger() {
            this.setup();
            this.interact();
            super.init(this.play.bind(this));
        }
        setup() {
            this.tl = new gsap.timeline(
                {
                    onStart: () => {
                        $('[data-init-df]').removeAttr('data-init-df');
                    },
                }
            );
                let lengthSlide = $(".mb-hero-card-item").length;
                $('.mb-hero-content-process').css('width', `${$('.mb-hero-content-inner').width()}px`)
                let swiper = new Swiper(".mb-hero-card-wrap", {
                    slidesPerView: 'auto',
                    spaceBetween: parseRem(0),
                    on: {
                        slideChange: function () {
                            console.log('Slide index changed to: ', swiper.realIndex);
                            if (swiper.realIndex === 0) {
                            $(".mb-hero-control-item-wrap.item-prev").addClass("disable");
                            } else {
                            $(".mb-hero-control-item-wrap.item-prev").removeClass("disable");
                            }
                            if (swiper.realIndex === lengthSlide - 2) {
                            $(".mb-hero-control-item-wrap.item-next").addClass("disable");
                            } else {
                            $(".mb-hero-control-item-wrap.item-next").removeClass("disable");
                            }
                        },
                    },

                });
                if(viewport.w > 991) {
                    new MasterTimeline({
                        timeline: this.tl,
                        tweenArr: [
                          new FadeSplitText({ el: $('.mb-hero-title').get(0), onMask: true }),
                          ...Array.from($('.mb-hero-control-item')).flatMap((el, idx) => new FadeSplitText({ el: el, onMask: true, delay: idx ==0 ? .3 : 0.2 })),
                          ...Array.from($('.mb-hero-card-item-inner')).flatMap((el, idx) => new ScaleInset({ el: $(el).get(0), delay: idx ==0? 0 : 0.2 })),
                          ...Array.from($('.mb-hero-content-item-txt')).flatMap((el, idx) => new FadeSplitText({ el: $(el).get(0), onMask: true, delay: idx ==0? 0 : 0.1 })),
                        ]
                    })
                    let widthProgressInner = $('.mb-hero-content-process').width()/swiper.slides.length;
                    $('.mb-hero-content-process-inner').css('width', widthProgressInner);
                    let widthContentTranslate = $('.mb-hero-content-inner').width() - $('.mb-hero-content-wrap').width() + parseRem(40);
                    console.log(widthContentTranslate);
                    swiper.on('slideChangeTransitionStart', (self) => {
                        console.log('Progress:', self.progress  ); // 0 → 1
                        gsap.to('.mb-hero-content-process-inner', {x: self.progress*($('.mb-hero-content-inner').width() - widthProgressInner) , duration: .4, ease: 'none'})
                        gsap.to('.mb-hero-content-process', {x: -self.progress*widthContentTranslate, duration: .4, ease: 'none'})
                        gsap.to('.mb-hero-content-item:not(:first-child)', {x: -self.progress*widthContentTranslate, duration: .4, ease: 'none'})
                    });
                    $(".mb-hero-control-item-wrap.item-prev").on("click", function () {
                        swiper.slidePrev();
                    });
                    $(".mb-hero-control-item-wrap.item-next").on("click", function () {
                        swiper.slideNext();
                    });
                }
                else {
                    activeContent(1)
                    $(".mb-hero-content-item").eq(1).addClass('active');
                    swiper.on('slideChange', (self) => {
                        console.log(self.realIndex);
                        activeContent(self.realIndex + 1)
                    });
                    $('.mb-hero-card-item').on('click', function(){
                        let index = $(this).index();
                        swiper.slideTo(index);
                    })
                    function activeContent(index) {
                        $('.mb-hero-content-row').each((idx, el) => {
                            console.log($(el).find('.mb-hero-content-item').eq(index));
                            $(el).find('.mb-hero-content-item').removeClass('active');
                            $(el).find('.mb-hero-content-item').eq(index).addClass('active');
                        })
                    }
                }
            
            let tl = gsap.timeline({
                paused: true,
                scrollTrigger: {
                    trigger: ".mb-hero-card-main",
                    start: "top top",
                    endTrigger: ".mb-hero-content-wrap",
                    end: "bottom+=5% bottom",
                    onEnter: () => {
                        $(".mb-hero-card-wrap").addClass('on-sticky');
                        ScrollTrigger.refresh();
                    },
                    onEnterBack: () => {
                        $(".mb-hero-card-wrap").addClass('on-sticky');
                        ScrollTrigger.refresh();
                    },
                    onLeaveBack: () => {
                        $(".mb-hero-card-wrap").removeClass('on-sticky');
                        ScrollTrigger.refresh();
                    },
                    onLeave: () => {
                        // $(".mb-hero-card-wrap").removeClass('on-sticky');
                        ScrollTrigger.refresh();
                    }
                },
            });
            tl.play(); 
        }
        interact() {
            if(viewport.w < 768) {
                let itemHeaderToggle = $('.mb-hero-content-row.mb-hero-content-grid:not(.row-child) .mb-hero-content-item:first-child');
                itemHeaderToggle.on('click', function(){
                    $(this).toggleClass('active');
                    if($(this).closest('.mb-hero-content-row').hasClass('no-line')) {
                        $(this).closest('.mb-hero-content-row').toggleClass('active');
                        slideToggleNextUntilEnd( $(this).closest('.mb-hero-content-row'), '.mb-hero-content-row', '.row-child-end');
                    }
                    else {
                        $(this).siblings('.mb-hero-content-item').slideToggle();
                    }
                })
                function slideToggleNextUntilEnd(clickedEl, itemSelector, stopClass) {
                    const $clicked = $(clickedEl);
                    const $nextItems = $clicked.nextAll(itemSelector);
                    const collected = [];
                  
                    for (let i = 0; i < $nextItems.length; i++) {
                      const $item = $($nextItems[i]);
                      collected.push($item);
                  
                      if ($item.hasClass(stopClass.replace('.', ''))) {
                        break;
                      }
                    }
                  
                    // Áp dụng slideToggle
                    collected.forEach($el => {
                      $el.stop(true, true).slideToggle(200);
                    });
                  }
                  
            }
        }
        play() {
            this.tl.play();
        }
    }
    let membershipHero = new MembershipHero();
    class ContactHero extends TriggerSetupHero {
        constructor() {
            super();
            this.tl = null;
        }
        trigger() {
            this.setup();
            super.init(this.play.bind(this));
        }
        setup() {
            let txtMap = new SplitType('.contact-hero-right-item-link .contact-hero-right-item-link-txt', {types: 'lines, words', lineClass: 'bp-line'});
            multiLineText('.contact-hero-right-item-link');
            new MasterTimeline({
                timeline: this.tl,
                tweenArr: [
                    new FadeSplitText({ el: $('.contact-hero-title').get(0), onMask: true }),
                    
                    new FadeSplitText({ el: $('.contact-hero-label').get(0), onMask: true }),
                    new FadeSplitText({ el: $('.contact-hero-required').get(0), onMask: true }),
                    ...Array.from($('.contact-hero-form-label')).flatMap((el, idx) => new FadeSplitText({ el: $(el).get(0), onMask: true, delay: idx == 0 ? 0 : 0.2 })),
                    ...Array.from($('.contact-hero-form-input-group')).flatMap((el, idx) => new FadeIn({ el: $(el).get(0),  delay: idx == 0 ? 0 : 0.2 })),
                    ...Array.from($('.contact-hero-form-textarea-group')).flatMap((el, idx) => new FadeIn({ el: $(el).get(0),  delay: idx == 0 ? 0 : 0.2 })),
                    new FadeIn({ el: $('.contact-hero-form-submit-wrap'), delay: .2 }),
                    ...Array.from($('.contact-hero-info-social .txt')).flatMap((el, idx) => new FadeIn({ el: $(el).get(0),  delay: idx == 0 ? 0 : 0.2 })),
                    ...Array.from($('.contact-hero-info-social .contact-hero-social-item-link')).flatMap((el, idx) => new FadeIn({ el: $(el).get(0),  delay: idx == 0 ? 0 : 0.2 })),
                    ...Array.from($('.contact-hero-content-bot .txt')).flatMap((el, idx) => new FadeSplitText({ el: $(el).get(0), onMask: true,  delay: idx == 0 ? 0 : 0.2 })),
                    ...Array.from($('.contact-hero-right-content .txt')).flatMap((el, idx) => new FadeIn({ el: $(el).get(0) })),
                ]
            })
            this.autosize();
            this.validation();
        }
        play() {
            this.tl.play();
        }         
        autosize() {
            let messageInput = $('.contact-hero-form-textarea');

            messageInput.each(function(){
                $(this).attr('rows',1);
                $(this).attr('maxlength',200);
                resize($(this));
            });
            $('input, textarea').on('input', function() {
                if ($(this).val()) { // Kiểm tra nếu có giá trị trong input
                    $(this).prev('.contact-hero-form-label').addClass('has-content');
                } else {
                    $(this).prev('.contact-hero-form-label').removeClass('has-content');
                }
              });
            messageInput.on('input', function(){
                var textLength = $(this).val().length;
                $('.contact-hero-form-textarea-control-current').text(textLength);
                resize($(this));
            });
            
            function resize ($text) {
                $text.css('height', 'auto');
                $text.css('height', $text[0].scrollHeight+'px');
            }
        }
        validation (){
            let inputEmail =  $('input[name="Email"]');
            let inputMessage =  $('textarea[name="Message"]');
            let flag;
            $('.contact-hero-form-submit').on('click', (e) => {
                flag = false;
                console.log(this.validateEmail(inputEmail.val()))
                if(inputEmail.val().trim() == '' || !this.validateEmail(inputEmail.val())) {
                    inputEmail.closest('.contact-hero-form-input-group').addClass('error');
                    flag = true;
                }
                else {
                    inputEmail.closest('.contact-hero-form-input-group').removeClass('error');
                }
                
                if(inputMessage.val() == '') {
                    inputMessage.closest('.contact-hero-form-textarea-group').addClass('error');
                    flag = true;
                }
                else {
                    inputMessage.closest('.contact-hero-form-textarea-group').removeClass('error');
                }
                
                if(flag){
                    e.preventDefault();
                    $('.contact-hero-form-valid').addClass('active')
                }
                else {
                    $('.contact-hero-form-valid').removeClass('active');
                    $('.contact-hero-form-submit-wrap').addClass('disabled');
                    setTimeout(function() {
                        $('input:not([type="submit"])').val('');
                        $('textarea').val('');
                        $('.contact-hero-form-success').fadeOut(300);
                        $('.contact-hero-form-submit-wrap').removeClass('disabled');
                    }, 10000)
                }
                
            })
        }
        validateEmail(email) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(email);
        }
          
    }
    let contactHero = new ContactHero();
    class FbHero extends TriggerSetupHero {
        constructor() {
            super();
            this.tl = null;
        }
        trigger() {
            this.setup();
            super.init(this.play.bind(this));
        }
        setup() {
            new MasterTimeline({
                timeline: this.tl,
                tweenArr: [
                    ...Array.from($('.fb-hero-title-wrap .heading')).flatMap((el, idx) => new FadeSplitText({ el: $(el).get(0), onMask: true, delay: idx == 0? 0 : 0.2 })),
                    ...Array.from($('.fb-hero-item')).flatMap((el, idx) => new ScaleInset({ el: $(el).get(0), delay: idx == 0? 0 : 0.2 })),
                ]
            })
            if(viewport.w > 991 || viewport.w < 768) {
                let paddingLeftContainer = parseFloat($('.fb-hero .container').css('padding-left'));
                const initThumb = () => {
                    lenis.scrollTo(0,{
                        duration: .4
                    });
                    gsap.set('.fb-hero-cms-inner .fb-hero-list', {clearProps: 'all',})
                    let widthListThumb = $('.fb-hero-cms-inner.active .fb-hero-list').width();
                    let heightHero = viewport.h + widthListThumb - $('.fb-hero-cms-inner.active').width() - paddingLeftContainer;
                    // if(heightHero > $('.fb-hero-main').height()) {
                        $('.fb-hero-main').css('height', `${heightHero}px`);
                        this.tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: ".fb-hero-main",
                                start: "top top",
                                end: "bottom bottom",
                                scrub: true,
                            },
                        })
                        this.tl.to('.fb-hero-cms-inner.active .fb-hero-list', {
                            x: -widthListThumb + $('.fb-hero-cms-inner.active').width(),
                            ease: 'none'
                        })
                    // }
                }
                viewport.w> 991 && initThumb();
                $('.fb-hero-title').on('click', function(){
                    let dataTab = $(this).attr('data-tab');
                    $('.fb-hero-title').removeClass('active');
                    $(this).addClass('active');
                    $('.fb-hero-cms-inner').removeClass('active');
                    $(`.fb-hero-cms-inner[data-tab="${dataTab}"]`).addClass('active');
                    viewport.w> 991 && initThumb();
                    $('.fb-hero-cms').height(($('.fb-hero-cms-inner.active').height()))
                })
            }
            else {
                $('.fb-hero-cms').height(($('.fb-hero-cms-inner.active').height()))
                $('.fb-hero-tab-title-tablet').on('click', function(){
                    lenis.scrollTo(0,{
                        duration:1
                    });
                    let dataTab = $(this).attr('data-tab');
                    $('.fb-hero-tab-title-tablet').removeClass('active');
                    $(this).addClass('active');
                    $('.fb-hero-cms-inner').removeClass('active');
                    $(`.fb-hero-cms-inner[data-tab="${dataTab}"]`).addClass('active');
                    $('.fb-hero-cms').height(($('.fb-hero-cms-inner.active').height()))
                })  
            }
            $('.fb-hero-back-top').on('click', function(e) {
                e.preventDefault();
                lenis.scrollTo(0,{
                    duration: 1.5,
                });
            })
        }
        play() {
            this.tl.play();
        }
        
    }
    let fbHero = new FbHero();
    class ServiceHero extends TriggerSetupHero {
        constructor() {
            super();
            this.tl = null;
        }
        trigger() {
            this.setup();
            super.init(this.play.bind(this));
            this.interact();
        }
        setup() {
            new MasterTimeline({
                timeline: this.tl,
                tweenArr: [
                  new FadeSplitText({ el: $('.service-hero-title').get(0), onMask: true })
                ]
            })
            this.tl = gsap.timeline ({
                onStart: () => {
                    $('[data-init-df]').removeAttr('data-init-df');
                }
            })
            $('.service-hero-content-item').each((idx, el) => {
                let tlItem = new gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        start: "top top+=65%"
                    },
                })
                new MasterTimeline({
                    timeline: tlItem,
                    tweenArr: [
                      new ScaleInset({ el: $(el).find('.service-hero-content-item-img').get(0)}),
                      new FadeSplitText({ el: $(el).find('.service-hero-content-item-title .txt').get(0), onMask: true, delay: 0.2 }),
                      new FadeSplitText({ el: $(el).find('.service-hero-content-item-sub').get(0), onMask: true, delay: 0.2 }),
                      new FadeSplitText({ el: $(el).find('.service-hero-content-item-link-txt').get(0), onMask: true })
                    ]
                })
            })
            this.initContentPopup();
            let currentUrl = window.location.href;
            let url = new URL(currentUrl);
            let itemDetail = url.searchParams.get("detail");
            if(itemDetail) {
                $('.service-hero-popup-inner').removeClass('active');
                $(`.service-hero-popup-inner[data-link-item="${itemDetail}"]`).addClass('active');
                $('.service-hero-popup').addClass('active');
                lenis.stop();
            }
        }
        play() {
            this.tl.play();
        }
        interact() {
            $('[data-link= "open-popup"]').on('click', function(e) {
                e.preventDefault();
                let index = $(this).closest('.service-hero-content-item').index();
                activeItem(['.service-hero-popup-inner'], index)
                $('.service-hero-popup').addClass('active');
                lenis.stop();
            })
            $('.service-hero-popup-close').on('click', function(e) {
                e.preventDefault();
                $('.service-hero-popup').removeClass('active');
                lenis.start();
                resetScrollPopup();
            })
            $('.service-hero-popup').on('click', function(e) {
                console.log('khánhdfas');
                if($(e.target).closest('.service-hero-popup-inner').length == 0) {
                    $(this).removeClass('active');
                    lenis.start();
                    resetScrollPopup();
                }
            })
            $('.service-hero-popup-inner').on('scroll', (e)=> {
                this.ItemContentActiveCheck('.service-hero-popup-inner.active h6');
                if($(e.target).scrollTop()  < -80 && viewport.w < 768) {
                    $('.service-hero-popup').removeClass('active');
                    lenis.start();
                    cursor.reset();
                }
            })
            function resetScrollPopup() {
                
                setTimeout(() => {
                    $('.service-hero-popup-inner').animate({
                        scrollTop: 0
                    }, 0);
                }, 500);
            }
            $('.service-hero-popup-menu-inner').on('click', '.service-hero-popup-menu-item', function(e) {
                e.preventDefault();
                $('.service-hero-popup-menu-item').removeClass('active');
                $(this).addClass('active');
                let dataHeader = $(this).attr('data-title');
                var scrollTop =  $('.service-hero-popup-inner').scrollTop() - $('.service-hero-popup-inner').offset().top + $(`.service-hero-popup-content-txt h6[data-title="${dataHeader}"]`).offset().top  - parseFloat($('.service-hero-popup-menu-inner').css('top'));
                console.log(scrollTop )
                $('.service-hero-popup-inner.active').animate({
                    scrollTop: scrollTop
                }, 1000);
            })
        }
        ItemContentActiveCheck(el) {
            for (let i = 0; i < $(el).length; i++) {
                let top = $(el).eq(i).get(0).getBoundingClientRect().top;
                console.log(top)
                if (top > 0 && top - $(el).eq(i).height()   < ($(window).height() / 3)) {
                    $('.service-hero-popup-inner.active .service-hero-popup-menu-item').removeClass('active');
                    $('.service-hero-popup-inner.active .service-hero-popup-menu-item').eq(i).addClass('active');
                }
                }
        }
        initContentPopup() {
            let titleLeft = $('.service-hero-popup-menu-item').eq(0).clone();
            console.log(titleLeft)
            $('.service-hero-popup-menu-item').remove();
            $('.service-hero-popup-inner[popup-type="Room"]').each((idx, item) => {
                $(item).find('.service-hero-popup-content-txt h6').each((i, el) => {
                    $(el).attr('data-title', `toch-${i}`);
                    let titleLeftClone = titleLeft.clone();
                    if(i == 0) {
                        titleLeftClone.addClass('active');
                    }
                    titleLeftClone.find('.service-hero-popup-menu-item-txt').text($(el).text());
                    titleLeftClone.attr('data-title', `toch-${i}`);
                    $(item).find('.service-hero-popup-menu-inner').append(titleLeftClone);
                })
            })
        }
    }
    let serviceHero = new ServiceHero();
    class GameHero extends TriggerSetupHero {
        constructor() {
            super();
            this.tl = null;
            this.flag = false;
        }
        trigger() {
            this.setup();
            this.interact();
            super.init(this.play.bind(this));
        }
        setup() {    
            if( viewport.w > 767) {
                let machineTitle = new SplitType('.game-hero-machine-title .txt-inline', {types: 'lines, words', lineClass: 'bp-line'});
                let currentIndex = -1;
                activeItem(['.game-hero-machine-title'], 0);
                gsap.set(machineTitle.words, {yPercent: 100, opacity: 0});
                viewport.w> 991 && gsap.set('.game-hero-title-ic img', {yPercent: 100, opacity: 0});
                this.tl = gsap.timeline({
                    onStart: () => {
                        $('[data-init-df]').removeAttr('data-init-df');
                    },
                    onComplete: () => {
                        this.flag = true;
                    },
                })
                new MasterTimeline({
                    timeline: this.tl,
                    allowMobile: true,
                    tweenArr: [
                        new FadeSplitText({ el: $('.game-hero-sub').get(0), onMask: true }),
                        new FadeIn({ el: $('.game-hero-title').get(0) }),
                        new FadeSplitText({ el: $('.game-hero-machine').eq(0).find('.game-hero-machine-label').get(0), onMask: true }),
                        new ScaleInset({ el: $('.game-hero-img-item').get(0), duration: .6}),
                        new FadeIn({ el: $('.game-hero-right-link'), onStart: () => {
                            gsap.to($('.game-hero-machine-title').eq(0).find('.word'), {yPercent: 0, opacity: 1, duration: .35, stagger: .015, ease: 'power1.out'})
                            gsap.to($('.game-hero-machine-title').eq(0).find('.game-hero-title-ic img'), {yPercent: 0, opacity: 1, duration: .4, ease: 'power1.out'},'<=.1')
                        } }),

                    ]
                });
                $('.game-hero-img-item').each(function(i, el) {
                    ScrollTrigger.create({
                        trigger: el,
                        start: "top center",
                        end: "bottom center",
                        onEnter: () => changeTitle(i, lenis.direction),
                        onEnterBack: () => changeTitle(i, lenis.direction),
                        scrub: true,
                    });
                });
                const changeTitle = (index, direction) => {
                    if(index !== currentIndex && this.flag) {
                        currentIndex = index;
                        console.log(index)
                        this.activeTitle(index, direction);
                    }
                }
                let tlImg = new gsap.timeline({
                    scrollTrigger: {
                        trigger: ".game-hero-img-wrap",
                        start: `top-=${parseRem(80)} top`,
                        end: "bottom bottom",
                        scrub: true,
                    },
                })
                let lengthImg = $('.game-hero-img-item').length;
                tlImg.to('.game-hero-img-item', {
                    yPercent: -(lengthImg - 1)*100,
                    ease: 'none'
                })
            }
            else {
                $('.game-hero-right-content-wrap').addClass('swiper');
                $('.game-hero-right-content').addClass('swiper-wrapper');
                $('.game-hero-machine-title').addClass('swiper-slide');
                $('.game-hero-left').addClass('swiper');
                $('.game-hero-left-inner').addClass('swiper-wrapper');
                $('.game-hero-machine').addClass('swiper-slide');
                $('.game-hero-left').append('<div class="global-swiper-pagination"></div>')
                let swiper = new Swiper(".game-hero-right-content-wrap", {
                    slidesPerView: 1,
                    spaceBetween: parseRem(20),
                    freeMode: true,
                    allowTouchMove: false,
                })
                let swiperLeft = new Swiper(".game-hero-left", {
                    slidesPerView: 1,
                    spaceBetween: parseRem(20),
                    pagination: {
                        el: '.global-swiper-pagination',
                        bulletClass: 'global-swiper-pagination-item',
                        bulletActiveClass: 'active',
                        clickable: true,
                    },
                    thumbs: {
                        swiper: swiper,
                    },
                })
            }
            this.initContentPopup();
        }
        interact() {
            $('.game-hero-img-item').on('click', function(e) {
                e.preventDefault();
                let index = $(this).index() ;
                console.log(index)
                activeItem(['.work-popup-item'], index)
                $('.global-popup-wrap').addClass('has-popup');
                lenis.stop();
            })
            $('.game-hero-right-link').on('click', function(e) {
                e.preventDefault();
                let index = $('.game-hero-machine-title.active').index() ;
                console.log(index)
                activeItem(['.work-popup-item'], index)
                $('.global-popup-wrap').addClass('has-popup');
                lenis.stop();
            })
            $('.work-popup-close').on('click', function(e) {
                e.preventDefault();
                $('.global-popup-wrap').removeClass('has-popup');
                lenis.start();
                resetScrollPopup();
            })
            $('.global-popup-wrap').on('click', function(e) {
                if($(e.target).closest('.work-popup-inner').length == 0) {
                    $(this).removeClass('has-popup');
                    lenis.start();
                    resetScrollPopup();
                }
            }) 
            $('.work-popup-item').on('scroll', (e)=> {
                this.ItemContentActiveCheck('.work-popup-item.active .work-popup-item-content h6');
                console.log($(e.target).scrollTop())
                if($(e.target).scrollTop()  < -80 && viewport.w < 768) {
                    console.log('close')
                    $('.global-popup-wrap').removeClass('has-popup');
                    lenis.start();
                    cursor.reset();
                }
            })
            $('.work-popup-item-left-content').on('click', '.work-popup-item-left-title', function(e) {
                e.preventDefault();
                $('.work-popup-item-left-title').removeClass('active');
                $(this).addClass('active');
                let dataHeader = $(this).attr('data-title');
                var scrollTop =  $('.work-popup-item.active').scrollTop() - $('.work-popup-item.active').offset().top + $(`.work-popup-item.active .work-popup-item-content h6[data-title="${dataHeader}"]`).offset().top   - parseFloat($('.work-popup-item-left-inner').css('top'));
                $('.work-popup-item.active').animate({
                    scrollTop: scrollTop
                }, 1000);
            })
            function resetScrollPopup() {
                setTimeout(() => {
                    $('.service-hero-popup-inner').animate({
                        scrollTop: 0
                    }, 0);
                }, 500);
            }
        }
        activeTitle(index, direction) {
            activeItem(['.game-hero-machine-title'], index);
            if(direction == 1) {
                gsap.to($('.game-hero-machine-title').eq(index - 1).find('.word'), {yPercent: -100, opacity: 0, duration:.4, stagger:.01, ease: 'power1.out'})
                gsap.to($('.game-hero-machine-title').eq(index -1).find('.game-hero-title-ic').find('img'), {yPercent: -100, opacity: 0, duration:.4, stagger:.015, ease: 'power1.out'})
                gsap.to($('.game-hero-machine-title').eq(index).find('.word'), {yPercent: 0, opacity: 1, duration:.4, stagger:.01, delay: '.1', ease: 'power1.out'})
                gsap.to($('.game-hero-machine-title').eq(index ).find('.game-hero-title-ic').find('img'), {yPercent: 0, opacity: 1, duration:.4, delay: '.1', ease: 'power1.out'})
            }
            else if( direction == -1) {
                gsap.to($('.game-hero-machine-title').eq(index + 1).find('.word'), {yPercent: 100, opacity: 0, duration:.4, stagger:.01, ease: 'power1.out'})
                gsap.to($('.game-hero-machine-title').eq(index + 1).find('.game-hero-title-ic').find('img'), {yPercent: 100, opacity: 0, duration:.4, ease: 'power1.out'})
                gsap.to($('.game-hero-machine-title').eq(index).find('.word'), {yPercent: 0, opacity: 1, delay: '.1', duration:.4, stagger:.01, ease: 'power1.out'})
                gsap.to($('.game-hero-machine-title').eq(index).find('.game-hero-title-ic').find('img'), {yPercent: 0, opacity: 1, delay: '.1', duration:.4, ease: 'power1.out'})
            }
        }
        initContentPopup() {
            let titleLeft = $('.work-popup-item-left-title').eq(0).clone();
            $('.work-popup-item-left-title').remove();
            $('.work-popup-item').each((idx, item) => {
                let titlePopupHeight = $(item).find('.work-popup-item-title').outerHeight(true);
                let heightLeftInner = viewport.h - titlePopupHeight;
                $(item).find('.work-popup-item-left-inner').css('height', heightLeftInner);
                $(item).find('.work-popup-item-left-inner').css('top', titlePopupHeight);
                $(item).find('.work-popup-item-content h6').each((i, el) => {
                    $(el).attr('data-title', `toch-${i}`);
                    let titleLeftClone = titleLeft.clone();
                    if(i == 0) {
                        titleLeftClone.addClass('active');
                    }
                    $(item).find('.work-popup-item-left-content').append(titleLeftClone.text($(el).text()).attr('data-title', `toch-${i}`));
                })
            })
        }
        ItemContentActiveCheck(el) {
            for (let i = 0; i < $(el).length; i++) {
                let top = $(el).eq(i).get(0).getBoundingClientRect().top;
                if (top > 0 && top + $(el).eq(i).height() < viewport.h/4*3 ) {
                    $('.work-popup-item.active .work-popup-item-left-content .work-popup-item-left-title').removeClass('active');
                    $('.work-popup-item.active .work-popup-item-left-content .work-popup-item-left-title').eq(i).addClass('active');
                }
                }
        }
        play() {
            this.tl.play();
        }
       
    }
    let gameHero = new GameHero();
    class FallingBubbles {
        constructor(canvasId, containerSelector) {
          this.canvas = document.getElementById(canvasId);
          this.container = document.querySelector(containerSelector);
          this.engine = Matter.Engine.create();
          this.world = this.engine.world;
          this.render = null;
          this.center = 0;
          this.radius = 0;
          this.balls = [];
          this.limitBall = viewport.w > 767 ? 40 : 29;
        }
      
        init() {
            const width = this.container.clientWidth;
            const height = this.container.clientHeight;
            const dpr = window.devicePixelRatio || 1;
            this.center = width / 2;
            this.radius = this.center -1;
        
            // Setup render
            this.render = Matter.Render.create({
                canvas: this.canvas,
                engine: this.engine,
                options: {
                width,
                height,
                wireframes: false,
                background: "transparent",
                }
            });
            this.canvas.width = width * dpr;
            this.canvas.height = height * dpr;
            this.canvas.style.width = width + "px";
            this.canvas.style.height = height + "px";
            this.render.context.setTransform(dpr, 0, 0, dpr, 0, 0);
            this._createWorld();
            Matter.Render.run(this.render);
            Matter.Runner.run(this.engine);
            requestAnimationFrame(() => {
                this._dropInitialBalls(this.limitBall - 20);
            })
        }
        _createWorld() {
          const { Bodies, World } = Matter;
          const d = viewport.w > 767 ? parseRem(296) : parseRem(140);
          const centerBall = Bodies.circle(this.center, this.center, d/2, {
            isStatic: true,
            render: { fillStyle: "#002b8d" }
          });
          const boundaries = [];
          const segments = 100;
          for (let i = 0; i < segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            const x = this.center + Math.cos(angle) * this.radius;
            const y = this.center + Math.sin(angle) * this.radius;
            const wall = Bodies.rectangle(x, y, 1, 30, {
              isStatic: true,
              angle,
              render: { fillStyle: "#ccc" }
            });
            boundaries.push(wall);
          }
      
          World.add(this.world, [centerBall, ...boundaries]);
        }
      
        _startDropping() {
            const { Bodies, World, Composite } = Matter;
            const d = viewport.w > 767 ? parseRem(80) : parseRem(40);
            setInterval(() => {
                const r = d / 2;
                const y = d / 2;
              
                const numberOfBalls = Math.floor(Math.random() * 2) + 2; // 2 hoặc 3 bóng
              
                for (let i = 0; i < numberOfBalls; i++) {
                  setTimeout(() => {
                    const offset = (Math.random() - .5) * d;
                    const x = this.center + offset;
              
                    const ball = Matter.Bodies.circle(x, y, r, {
                      frictionAir: 0.0000001,
                      restitution: 0.8,
                      friction: viewport.w > 767 ? 0.04 : 0.08,
                      render: {
                        fillStyle: "#002b8d"
                      }
                    });
              
                    Matter.World.add(this.world, ball);
                    ball._scale = 1;
                    this.balls.push(ball);
              
                    // Animate scale with GSAP
                    gsap.to({ scale: 0 }, {
                      scale: 1,
                      duration: viewport.w > 767 ? 2 : 1,
                      ease: "power1.out",
                      onUpdate() {
                        const s = this.targets()[0].scale;
                        Matter.Body.scale(ball, s / ball._scale || s, s / ball._scale || s);
                        ball._scale = s;
                      }
                    });
                    if (this.balls.length > this.limitBall) {
                      const oldBall = this.balls.shift();
                      gsap.to({ scale: 1 }, {
                        scale: 0,
                        duration: 0.5,
                        ease: "power1.in",
                        onUpdate: function () {
                          const s = this.targets()[0].scale;
                          Matter.Body.scale(oldBall, s / (oldBall._scale || 1), s / (oldBall._scale || 1));
                          oldBall._scale = s;
                        },
                        onComplete: function () {
                          Matter.Composite.remove(this.world, oldBall);
                        }.bind(this)
                      });
                    }
              
                  }, i * 100);
                }
              
              }, 400); 
              
          }
        _dropInitialBalls(count) {
            const { Bodies, World, Composite } = Matter;
            const d = viewport.w > 767 ? parseRem(80) : parseRem(40);
            for (let i = 0; i < count; i++) {
                const r = d / 2;
                const x = this.center + (Math.random() * 20 - 10); 
                const y = Math.random() * this.canvas.height / 2;
            
                const ball = Bodies.circle(x, y, r, {
                restitution: 0.9,
                friction: 0.01,
                frictionAir: 0.01,
                render: {
                    fillStyle: "#002b8d",
                    strokeStyle: "#ffffff",
                    lineWidth: 1,
                }
                });
            
                World.add(this.world, ball);
                this.balls.push(ball);
                gsap.to({ scale: 0 }, {
                    scale: 1,
                    duration: 2,
                    ease: "power2.out",
                    onComplete: () => {
                        if(i == count - 1) {
                            this._startDropping();
                        }
                    },
                    onUpdate() {
                      const s = this.targets()[0].scale;
                      Matter.Body.scale(ball, s / ball._scale || s, s / ball._scale || s);
                      ball._scale = s;
                    }
                  });
                
            
            }
            
        }
          
          
    }
    
    class GameJackpot extends TriggerSetup {
        constructor(triggerEl) {
        super(triggerEl);
        }
        trigger() {
            super.setTrigger(this.setup.bind(this));
        }
        setup() {
            let content = new SplitType('.game-jackpot-main-ball-txt', {types: 'lines, words', lineClass: 'bp-line'});
            gsap.set(content.words, {yPercent: 100});
            
            let fallingBubbles = new FallingBubbles( "game-jackpot-main-ball-canvas", ".game-jackpot-main-ball" );
            fallingBubbles.init();
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".game-jackpot",
                    start: "top top+=65%",
                },
            })
            new MasterTimeline({
                timeline: tl,
                tweenArr : [
                    new FadeSplitText({el: $('.game-jackpot-title').get(0), onMask: true})
                ]
            })
            let tlBall = gsap.timeline({
                scrollTrigger: {
                    trigger: ".game-jackpot-main",
                    start: "top top+=65%",
                },
                onComplete: () => {
                    gsap.to($(`.game-jackpot-main-ball-txt.active .word`), {yPercent: 0, duration:.6, ease: 'power1.out'})
                }
            })
            new MasterTimeline({
                timeline: tlBall,
                tweenArr : [
                    new FadeIn({el: $('.game-jackpot-main-ball').get(0)}),
                ]
            })
            let tlControl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".game-jackpot-main-control",
                    start: "top-=50% top+=80%",
                },
            })
            new MasterTimeline({
                timeline: tlControl,
                tweenArr : [
                    ...Array.from($('.game-jackpot-control-wrap .txt')).flatMap((el, index) => new FadeSplitText({el: $(el).get(0), onMask: true}))
                ]
            })
            let tlSubLabel = gsap.timeline({
                scrollTrigger: {
                    trigger: ".game-jackpot-sub",
                    start: "top-=50% top+=80%",
                },
            })
            new MasterTimeline({
                timeline: tlSubLabel,
                tweenArr : [
                    new FadeSplitText({el: $('.game-jackpot-sub').get(0), onMask: true})
                ]
            })
            let animingFlag = false;
            $('.game-jackpot-main-control-txt').on('click', function(e) {
                e.preventDefault();
                if(animingFlag) return;
                animingFlag = true;
                $('.game-jackpot-main-control-txt').removeClass('active');
                $(this).addClass('active');
                let dataType = $(this).attr('data-type');
                gsap.to($(`.game-jackpot-main-ball-txt.active .word`), {yPercent: -100, duration:.6, ease: 'power1.out', onComplete: () => {
                    gsap.set($(`.game-jackpot-main-ball-txt.active .word`), {yPercent: 100})
                    $('.game-jackpot-main-ball-txt.active').removeClass('active');
                    $(`.game-jackpot-main-ball-txt[data-type="${dataType}"]`).addClass('active');
                    animingFlag = false;
                }})
                gsap.to($(`.game-jackpot-main-ball-txt[data-type="${dataType}"] .word`), {yPercent: 0, duration:.6, ease: 'power1.out'})
            })
        }
    }
    let gameJackpot = new GameJackpot('.game-jackpot');
    class EventHero extends TriggerSetupHero {
        constructor() {
            super();
            this.tl = null;
        }
        trigger() {
            this.setup();
            super.init(this.play.bind(this));
            this.interact();
        }
        setup() {
            new MasterTimeline({
                timeline: this.tl,
                tweenArr : [
                    new FadeSplitText({el: $('.event-hero-title').get(0), onMask: true}),
                    new FadeSplitText({el: $('.event-hero-tag-title').get(0), onMask: true}),
                    ...Array.from($('.event-hero-card-item')).flatMap((el, index) => {
                        return [
                            new ScaleInset({el: $(el).find('.event-hero-card-item-img').get(0)}),
                            new FadeIn({el: $(el).find('.event-hero-card-item-tag').get(0)}),
                            new FadeIn({el: $(el).find('.event-hero-card-item-title').get(0)}),
                            new FadeIn({el: $(el).find('.event-hero-card-item-time').get(0)}),
                            new FadeIn({el: $(el).find('.event-hero-card-item-read').get(0), delay:.2}),
                        ]
                    }),
                    ...Array.from($('.event-hero-tag-item')).flatMap((el, index) => new FadeIn({el: $(el), delay: .2})),
                    new FadeSplitText({el: $('.event-hero-date-title').get(0), onMask: true}),
                    new FadeIn({el: $('.event-hero-date-reset').get(0), delay: .2}),
                    ...Array.from($('.event-hero-date-filter-item')).flatMap((el, index) => new FadeIn({el: $(el), delay: .2})),
                    ...Array.from($('.event-calendar-item')).flatMap((el, index) => new FadeIn({el: $(el), delay: .2})),
                ]
            })

            $('.event-calendar-item').each((i, el) => {
                this.calendar($(el));
            })
            this.filterByTab();
            $('[data-link= "open-popup"]').on('click', function(e) {
                e.preventDefault();
                let index = $(this).closest('.event-hero-card-item').index();
                activeItem(['.event-popup-item'], index)
                $('.global-popup-wrap').addClass('has-popup');
                lenis.stop();
            })
            $('.event-popup-close').on('click', function(e) {
                e.preventDefault();
                $('.global-popup-wrap').removeClass('has-popup');
                lenis.start();
            })
            $('.global-popup-wrap').on('click', function(e) {
                if($(e.target).closest('.event-popup-inner').length == 0) {
                    $(this).removeClass('has-popup');
                    lenis.start();
                }
            })
            let currentUrl = window.location.href;
            let url = new URL(currentUrl);
            let tagName = url.searchParams.get("type");
            let itemDetail = url.searchParams.get("detail");
            if(itemDetail) {
                $(`.event-hero-card-item[data-link-detail=${itemDetail}] [data-link= "open-popup"]`).eq(0).click();
            }
            if(tagName) {
                $('.event-hero-tag-item').removeClass('active');
                $(`.event-hero-tag-item[data-tag="${tagName}"]`).addClass('active');
                this.initActiveTab(tagName);
            }
            else {
                activeItem(['.event-hero-tag-item', '.event-popup-item'], 0)
                let tagNameInit = $('.event-hero-tag-item.active').attr('data-tag');
                this.initActiveTab(tagNameInit);
            }
        }
        play() {
            this.tl.play();
        }
        interact() {
            $('.event-hero-tag-item').on('click', (e) => {
                e.preventDefault();
                if($(e.target).closest('.event-hero-tag-item').hasClass('active')) return;
                lenis.scrollTo('.event-hero-card-cms',{
                    duration: .8,
                    offset: -parseRem(80)
                });
                let index = $(e.target).closest('.event-hero-tag-item').index();
                activeItem(['.event-hero-tag-item'], index)
                let tagName  = $(e.target).closest('.event-hero-tag-item').attr('data-tag');
                this.activeTab(tagName);
            })
            $('.event-hero-date-reset').on('click', (e) => {
                e.preventDefault();
                this.filterReset();
            })
            $('.event-popup-item').on('scroll', (e)=> {
                if($(e.target).scrollTop()  < -80 && viewport.w < 768) {
                    $('.global-popup-wrap').removeClass('has-popup');
                    lenis.start();
                    cursor.reset();
                }
            })
        }
        activeTab(tagName) {
            $('.event-hero-date-filter-item').removeClass('active');
            $('.event-calendar-item-date-txt').removeClass('active');
            $('.event-hero-card-item').each((i, el) => {
                if($(el).attr('data-tag') == tagName) {
                    $(el).fadeIn(400);
                    $(el).addClass('active');
                }
                else {
                    $(el).fadeOut(400);
                    $(el).removeClass('active');
                }
            })
        }
        initActiveTab(tagName) {
            $('.event-hero-card-item').each((i, el) => {
                console.log($(el).attr('data-tag'))
                if($(el).attr('data-tag') === tagName) {
                    $(el).show();
                    $(el).addClass('active');
                }
                else {
                    $(el).hide();
                    $(el).removeClass('active');
                }
            })
        }
        calendar($container) {
            let dataCalendar = $container.attr('date-calendar');
            
            const $dateHeader = $container.find(".calendar-header-date span");
            const $days = $container.find(".event-calendar-item-date");
            let date = new Date();
            if (dataCalendar === 'next-month') {
                date.setMonth(date.getMonth() + 1);
            }
            const year = date.getFullYear();
            console.log(year)
            const month = date.getMonth();
            const monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ];
              $container.find(".event-calendar-item-head-month").text(monthNames[month]);
              $container.find(".event-calendar-item-head-year").text(year);
            $days.html("");
            const displayCalendar = () => {
                const firstDay = new Date(year, month, 1);
                const lastDay = new Date(year, month + 1, 0);
                const firstDayIndex = firstDay.getDay();
                const numberOfDays = lastDay.getDate();
        
                const formattedDate = new Date(year, month).toLocaleString("en-US", {
                    month: "long",
                    year: "numeric"
                });
                $dateHeader.html(formattedDate);
                for (let x = 1; x <= firstDayIndex; x++) {
                    const $div = $('<div class=" txt txt-16 txt-label event-calendar-item-date-txt no-value"></div>');
                    $days.append($div);
                }
                for (let i = 1; i <= numberOfDays; i++) {
                    const today = new Date();
                    const currentDate = new Date(year, month, i);
                    const $div = $('<div class="txt txt-16 txt-label event-calendar-item-date-txt"></div>');
                    $div.attr("data-date", formatDate(currentDate));
                    let arrDateFilter=[];
                    $div.append(i);
                    if (currentDate < today) {
                        $div.addClass("disable");
                    }
                    $days.append($div);
                    $div.on("click",  () =>  {
                        if ($div.hasClass("disable")) return;
                        $('.event-calendar-item-date-txt').removeClass("active");
                        $div.addClass("active");
                        arrDateFilter.push(formatDate(currentDate));
                        $('.event-hero-date-filter-item').removeClass('active');
                        if(viewport.w < 991) {
                            $('.event-calendar-list').removeClass('active');
                        }
                        this.filterEvents(arrDateFilter);
                    });
        
                    if (
                        currentDate.getFullYear() === today.getFullYear() &&
                        currentDate.getMonth() === today.getMonth() &&
                        currentDate.getDate() === today.getDate()
                    ) {
                        $div.addClass("current-date").removeClass("disable");
                    }
                }
            };
        
            displayCalendar();
            function formatDate(date) {
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0'); // tháng bắt đầu từ 0
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            }
        }
        filterEvents(filterDates) {
            $('.event-hero-card-item.active').each((i, el) => {
                const dateFilterRaw = $(el).attr('data-date-filter'); // "22/06/2025, 25/06/2025"
                const dateFilterList = dateFilterRaw
                    ? dateFilterRaw.split(',').map(d => d.trim())
                    : [];
                const isMatch = filterDates.some(d => dateFilterList.includes(d));
                if (isMatch) {
                    $(el).fadeIn().addClass('show');
                } else {
                    $(el).fadeOut().removeClass('show');
                }
            });
        }
        filterByTab() {
            $('.event-hero-date-filter-item').on('click',  (e) => {
                $('.event-hero-date-filter-item').removeClass('active');
                $(e.currentTarget).addClass('active');
                const range = $(e.currentTarget).data('filter-fast');
                const today = new Date();
                const year = today.getFullYear();
                const month = today.getMonth();
                const day = today.getDate();
                $('.event-calendar-item-date-txt').removeClass('active');
            
                $('.event-calendar-item-date-txt').each( (i, el) => {
                    const itemDateStr = $(el).attr('data-date');
                    if (!itemDateStr) return;
                    const parts = itemDateStr.split('/');
                    const itemDate = new Date(+parts[2], parts[1] - 1, +parts[0]);
            
                    if (range === 'today') {
                        if (
                            itemDate.getFullYear() === year &&
                            itemDate.getMonth() === month &&
                            itemDate.getDate() === day
                        ) {
                            $(el).addClass('active');
                        }
                        this.filterEvents(getDateRangeArray(today, today));
                    }
            
                    if (range === 'this-week') {
                        activateThisWeekAcrossCalendars();
                    }
                    if (range === 'month') {
                        const endOfMonth = new Date(year, month + 1, 0);
                        if (itemDate.getFullYear() === year &&
                            itemDate.getMonth() === month &&
                            itemDate.getDate() === day || itemDate >= today && itemDate <= endOfMonth) {
                            $(el).addClass('active');
                        }
                        this.filterEvents(getDateRangeArray(today, endOfMonth));
                    }
                    if (range === 'optional') {
                        $('.header').addClass('on-hide')
                        $('.event-calendar-list').addClass('active');
                    }
                });
            });
            $('.event-calendar-close').on('click',  (e) => {
                hideAllCalendars();
            })
            if(viewport.w < 992){
                $(document).on('click', function (e) {
                    if (!$(e.target).closest('.event-calendar-item-date-txt').length 
                    && !$(e.target).closest('.event-calendar-close').length && !$(e.target).closest('.event-calendar-inner').length 
                    && !$(e.target).closest('.event-hero-date-filter-item.only-tablet').length) {
                        hideAllCalendars();
                    }
                })
            }
            function hideAllCalendars() {
                $('.header').removeClass('on-hide')
                $('.event-calendar-list').removeClass('active');
                $('.event-calendar-item-date-txt').removeClass('active');
                $('.event-hero-date-filter-item').removeClass('active');
            }
            const activateThisWeekAcrossCalendars = () =>{
                const today = new Date();
                const startOfWeek = new Date(today);
                const endOfWeek = new Date(today);
                const day = today.getDay();
                const diffToMonday = day === 0 ? -6 : 1 - day;
                startOfWeek.setDate(today.getDate() + diffToMonday);
                endOfWeek.setDate(startOfWeek.getDate() + 6);
                this.filterEvents(getDateRangeArray(startOfWeek, endOfWeek));
                $('.event-calendar-item-date-txt').each(function (e) {
                    const $item = $(this);
                    const dateStr = $item.attr('data-date'); 
                    if (!dateStr) return;
            
                    const [d, m, y] = dateStr.split('/').map(Number);
                    const itemDate = new Date(y, m - 1, d);
            
                    if (itemDate >= startOfWeek && itemDate <= endOfWeek) {
                        $item.addClass('active');
                    } else {
                        $item.removeClass('active');
                    }
                });
            }
            function getDateRangeArray(start, end) {
                let result = [];
                let current = new Date(start);
            
                while (current <= end) {
                    const day = String(current.getDate()).padStart(2, '0');
                    const month = String(current.getMonth() + 1).padStart(2, '0');
                    const year = current.getFullYear();
                    result.push(`${day}/${month}/${year}`);
                    current.setDate(current.getDate() + 1);
                }
                return result;
            }
        }
        filterReset() {
            $('.event-hero-date-filter-item').removeClass('active');
            $('.event-calendar-item-date-txt').removeClass('active');
            let tagActive = $('.event-hero-tag-item.active').attr('data-tag');
            this.activeTab(tagActive);
        }
    }
    let eventHero = new EventHero();
    class WorkHero extends TriggerSetupHero {
        constructor() {
            super();
            this.tl = null;
        }
        trigger() {
            this.setup();
            super.init(this.play.bind(this));
        }
        setup() {
            new MasterTimeline({
                timeline: this.tl,
                tweenArr : [
                    new FadeSplitText({el: $('.work-hero-title').get(0), onMask: true}),
                    new FadeSplitText({el: $('.work-hero-label').get(0), onMask: true}),
                    new ScaleInset({el: $('.work-hero-sub-img-inner').get(0), delay: .2}),
                ]
            })

            $('.work-hero-sub-item').each((i, el) => {
                let tlItem = gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        start: "top top+=75%",
                    },
                })
                new MasterTimeline({
                    timeline: tlItem,
                    tweenArr : [
                        new  FadeSplitText({el: $(el).find('.work-hero-sub-item-num').get(0), onMask: true}),
                        new  FadeSplitText({el: $(el).find('.work-hero-sub-item-title').get(0), onMask: true}),
                        new  FadeSplitText({el: $(el).find('.work-hero-sub-item-sub').get(0), onMask: true}),
                    ]
                })
            })
            if(viewport.w < 768) {
                $('.work-hero-sub-wrap').addClass('swiper')
                $('.work-hero-sub-inner').addClass('swiper-wrapper')
                $('.work-hero-sub-item').addClass('swiper-slide')
                let swiper = new Swiper(".work-hero-sub-wrap", {
                    slidesPerView: 'auto',
                    spaceBetween: parseRem(20),
                    pagination: {
                        el: '.global-swiper-pagination',
                        bulletClass: 'global-swiper-pagination-item',
                        bulletActiveClass: 'active',
                        clickable: true,
                    }
                });
            }
        }
        play() {
            this.tl.play();
        }
        
    }
    let workHero = new WorkHero();
    class WorkThumb extends TriggerSetup {
        constructor(triggerEl) {
        super(triggerEl);
        }
        trigger() {
            super.setTrigger(this.setup.bind(this));
        }
        setup() {
            let tlInit = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.work-thumb',
                    start: 'bottom-=5% bottom',
                    once: true,
                }
            })
            new MasterTimeline({
                timeline: tlInit,
                tweenArr : [
                    ...Array.from($('.work-thumb-content-txt')).flatMap((el,i) => new FadeSplitText({el: $(el).get(0), onMask: true})),
                    ...Array.from($('.work-thumb-people')).flatMap((el,i) => new ScaleInset({el: $(el).get(0)})),
                ]
            })
            tlInit
                .fromTo('.work-thumb-people',{scale: 1.2, opacity: 0},{scale: 1, opacity: 1, duration: 1, ease: 'power1.out'}, '<=0')
                .fromTo('.work-enviroment-people.item1',{scale: 1.2, opacity: 0},{scale: 1, opacity: 1, duration: 1, ease: 'power1.out'}, '<=0')
            const $section = $('.work-thumb');
            const $peoples = $section.find('.work-thumb-people');
            $peoples.each((idx, el) => {
                let tlImgScrub = gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    }
                })
                requestAnimationFrame(() => {
                    tlImgScrub
                    .fromTo(el, {y: 70}, {y: -30, duration: 1}, 0)
                })
            })
            let tlImgDeco = gsap.timeline({
                scrollTrigger: {
                    trigger: '.work-enviroment-deco',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                }
            })
            requestAnimationFrame(() => {
                tlImgDeco
                .fromTo('.work-enviroment-deco', {y: 50}, {y: -50, duration: 1}, 0)
            })
            let insetInline; ;
            if(viewport.w > 991) {
                insetInline = 19.6
            }
            else if(viewport.w > 768) {
                insetInline = 25.1
            }
            else {
                insetInline = 23
            }
            let tlThumb = new gsap.timeline({
                scrollTrigger: {
                    trigger: ".work-thumb",
                    start: viewport.w > 991 ? "top-=20% center-=20%" : "top-=20% center-=20%",
                    end: viewport.w > 991 ? "bottom+=20% bottom" : "bottom+=100% bottom",
                    scrub: 1,
                },
            })
            tlThumb
                .fromTo('.work-thumb-img-inner', {clipPath: "inset(0% 0% 0 0%)"}, {clipPath: `inset(6% ${insetInline}% 0 ${insetInline}%)`, ease: 'none'}) 
                .to('.work-thumb-label', {right: insetInline + "%", ease: 'none'}, 0)

        }
    }
    let workThumb = new WorkThumb(".work-thumb");
    class WorkEnviroment extends TriggerSetup {
        constructor(triggerEl) {
        super(triggerEl);
        }
        trigger() {
            super.setTrigger(this.setup.bind(this));
        }
        setup() {
            let tlInit = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.work-enviroment',
                    start: 'top top+=60%',
                    once: true,
                }
            })
            tlInit
               .fromTo('.work-enviroment-people:not(.item1)',{scale: 1.2, opacity: 0},{scale: 1, opacity: 1, duration: 1,stagger: {
                amount: 2,
                from: "random"
              }, ease: 'power1.out'},)
              .fromTo('.work-enviroment-deco',{scale: 1.2, opacity: 0}, {scale: 1, opacity: 1, duration: 1, ease: 'power1.out'}, '<=0')
            const $section = $('.work-enviroment');
            const $peoples = $section.find('.work-enviroment-people');
            let yBlock = viewport.w > 991 ? 50 : 30;
            $peoples.each((idx, el) => {
                let tlImgScrub = gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    }
                })
                requestAnimationFrame(() => {
                    tlImgScrub
                    .fromTo(el, {y: yBlock}, {y: `-${yBlock}`, duration: 1}, 0)
                })
            })
            let tlContent = gsap.timeline({
                scrollTrigger: {
                    trigger: '.work-enviroment',
                    start: "top top+=50%",
                },
            })
            new MasterTimeline({
                timeline: tlContent,
                tweenArr: [
                    new FadeSplitText({ el: $('.work-enviroment-title').get(0), onMask: true })
                ]
            });
        }
    }
    let workEnviroment = new WorkEnviroment(".work-enviroment");
    class WorkWorkSpace extends TriggerSetup {
        constructor(triggerEl) {
        super(triggerEl);
        }
        trigger() {
            super.setTrigger(this.setup.bind(this));
        }
        setup() {
            let tlRight = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.work-workspace-right',
                    start: 'top top+=65%',
                    once: true,
                }
            })
            new MasterTimeline({
                timeline: tlRight,
                tweenArr: [
                    new FadeSplitText({ el: $('.work-workspace-right-label').get(0), onMask: true }),
                    new FadeIn({el: '.work-workspace-right-inner'})
                ]
            });
            $('.work-workspace-left-item').each((i, el) => {
                let tlItem = gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        start: "top top+=75%",
                    },
                })
                new MasterTimeline({
                    timeline: tlItem,
                    tweenArr : [
                        new  FadeSplitText({el: $(el).find('.work-workspace-left-item-num').get(0), onMask: true}),
                        new  FadeSplitText({el: $(el).find('.work-workspace-left-item-title').get(0), onMask: true}),
                        new  FadeSplitText({el: $(el).find('.work-workspace-left-item-sub').get(0), onMask: true}),
                    ]
                })
            })
            if(viewport.w < 768) {
                $('.work-workspace-left').addClass('swiper')
                $('.work-workspace-left-inner').addClass('swiper-wrapper')
                $('.work-workspace-left-item').addClass('swiper-slide')
                let swiper = new Swiper(".work-workspace-left", {
                    slidesPerView: 'auto',
                    spaceBetween: parseRem(16),
                    pagination: {
                        el: '.global-swiper-pagination',
                        bulletClass: 'global-swiper-pagination-item',
                        bulletActiveClass: 'active',
                        clickable: true,
                    }
                });
            }
            else {
                let listBg = $(".work-workspace-right-img-item");
                gsap.set(listBg, {scale: 0});
                gsap.set(listBg[0], {scale: 1});
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: $(".work-workspace"),
                        start: viewport.w > 991 ? "top-=20% top" : "top center",
                        end: viewport.w > 991 ? "bottom+=20% bottom" : "bottom+=60% bottom",
                        scrub: 1
                    },
                })
                listBg.each((i, el) => {
                    switch (i) {
                        case 0:
                            tl.to(el, {
                                scale: 2,
                                ease: "none",
                                duration: 0.5,
                            });
                            break;
                        case listBg.length - 1:
                            tl.to(el, {
                                scale: 1,
                                ease: "none",
                                duration: 0.5,
                            }, '-=0.5');
                            break;
                        default:
                            tl.to(el, {
                                scale: 2,
                                ease: "none",
                                duration: 1,
                            }, '-=0.5');
                            break;
                        }
                })
            }
        }
    }
    let workWorkSpace = new WorkWorkSpace(".work-workspace-wrap");
    class WorkJob extends TriggerSetup {
        constructor(triggerEl) {
        super(triggerEl);
        }
        trigger() {
        super.setTrigger(this.setup.bind(this));
        this.interact();
        }
        setup() {
            let tlInit = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.work-job',
                    start: 'top top+=55%',
                    once: true,
                }
            })
            new MasterTimeline({
                timeline: tlInit,
                tweenArr: [
                    new FadeSplitText({ el: $('.work-job-label').get(0), onMask: true }),
                    new FadeSplitText({ el: $('.work-job-title').get(0), onMask: true }),
                ]
            })
            $('.work-job-item').each((i, el) => {
                new MasterTimeline({
                    timeline: tlInit,
                    tweenArr : [
                        new  ScaleLine({el: $(el).find('.work-job-item-line').get(0), delay: i==0 ? 0: i*.1}),
                        new FadeSplitText({el: $(el).find('.work-job-item-label').get(0), onMask: true, delay: i==0 ? 0: i*.2}),
                        ...Array.from($(el).find('.work-job-item-title')).flatMap((el,i) => new FadeSplitText({el: $(el).get(0), onMask: true, delay: .2})),
                    ]
                })
            })
            this.initContentPopup();
        }
        interact() {
            $('[data-link= "open-popup"]').on('click', function(e) {
                e.preventDefault();
                let index = $(this).closest('.work-job-item-wrap').index();
                console.log(index)
                activeItem(['.work-popup-item'], index)
                $('.global-popup-wrap').addClass('has-popup');
                lenis.stop();
            })
            $('.work-popup-close').on('click', function(e) {
                e.preventDefault();
                $('.global-popup-wrap').removeClass('has-popup');
                lenis.start();
                resetScrollPopup();
            })
            $('.global-popup-wrap').on('click', function(e) {
                if($(e.target).closest('.work-popup-inner').length == 0) {
                    $(this).removeClass('has-popup');
                    lenis.start();
                    resetScrollPopup();
                }
            }) 
            $('.work-popup-item').on('scroll', (e)=> {
                this.ItemContentActiveCheck('.work-popup-item.active .work-popup-item-content h6');
                if($(e.target).scrollTop()  < -80 && viewport.w < 768) {
                    $('.global-popup-wrap').removeClass('has-popup');
                    lenis.start();
                    cursor.reset();
                }
            })
            $('.work-popup-item-left-content').on('click', '.work-popup-item-left-title', function(e) {
                e.preventDefault();
                $('.work-popup-item-left-title').removeClass('active');
                $(this).addClass('active');
                let dataHeader = $(this).attr('data-title');
                var scrollTop =  $('.work-popup-item.active').scrollTop() - $('.work-popup-item.active').offset().top + $(`.work-popup-item.active .work-popup-item-content h6[data-title="${dataHeader}"]`).offset().top   - parseFloat($('.work-popup-item-left-inner').css('top'));
                $('.work-popup-item.active').animate({
                    scrollTop: scrollTop
                }, 1000);
            })
            function resetScrollPopup() {
                setTimeout(() => {
                    $('.service-hero-popup-inner').animate({
                        scrollTop: 0
                    }, 0);
                }, 500);
            }
        }
        initContentPopup() {
            let titleLeft = $('.work-popup-item-left-title').eq(0).clone();
            $('.work-popup-item-left-title').remove();
            $('.work-popup-item').each((idx, item) => {
                let titlePopupHeight = $(item).find('.work-popup-item-title').outerHeight(true);
                let heightLeftInner = viewport.h - titlePopupHeight;
                $(item).find('.work-popup-item-left-inner').css('height', heightLeftInner);
                $(item).find('.work-popup-item-left-inner').css('top', titlePopupHeight);
                $(item).find('.work-popup-item-content h6').each((i, el) => {
                    $(el).attr('data-title', `toch-${i}`);
                    let titleLeftClone = titleLeft.clone();
                    if(i == 0) {
                        titleLeftClone.addClass('active');
                    }
                    $(item).find('.work-popup-item-left-content').append(titleLeftClone.text($(el).text()).attr('data-title', `toch-${i}`));
                })
            })
        }
        ItemContentActiveCheck(el) {
            for (let i = 0; i < $(el).length; i++) {
                let top = $(el).eq(i).get(0).getBoundingClientRect().top;
                if (top > 0 && top + $(el).eq(i).height() < viewport.h/4*3 ) {
                    $('.work-popup-item.active .work-popup-item-left-content .work-popup-item-left-title').removeClass('active');
                    $('.work-popup-item.active .work-popup-item-left-content .work-popup-item-left-title').eq(i).addClass('active');
                }
                }
        }
    }
    let workJob = new WorkJob(".work-job-wrap");
    class WorkOffice extends TriggerSetup {
        constructor(triggerEl) {
        super(triggerEl);
        }
        trigger() {
            super.setTrigger(this.setup.bind(this));
        }
        setup() {
            let heightImage = $('.work-office-img').height();
            let transformSpace = (viewport.h - heightImage)/2;
            
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".work-office-wrap",
                    start: `top-=${transformSpace} center`,
                    end: `bottom+=${transformSpace} center`,
                    scrub: 1,
                },
            })
            tl.to('.work-office-img', {
                y: -heightImage*.2,
                ease: 'none'
            })
            lenis.on('scroll', ({ velocity }) => {
                const speed = Math.min(Math.max(Math.abs(velocity) * 2, 0.5), 3)
                tl.timeScale(speed)
              })
        }
    }
    let workOffice = new WorkOffice(".work-office-wrap");
    class WorkInfo extends TriggerSetup {
        constructor(triggerEl) {
        super(triggerEl);
        }
        trigger() {
            super.setTrigger(this.setup.bind(this));
        }
        setup() {
            let tlInit = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.work-info',
                    start: 'top top+=65%',
                    once: true,
                }
            })
            new MasterTimeline(
            {
                timeline: tlInit,
                tweenArr: [
                    new FadeSplitText({ el: $('.work-info-label').get(0), onMask: true }),
                ]
            })
            $('.work-info-content-item').each((i, el) => {
                new MasterTimeline({
                    timeline: tlInit,
                    tweenArr : [
                        new FadeSplitText({el: $(el).find('.work-info-content-item-label').get(0), onMask: true, delay: i==0? 0: i*.1}),
                        ...Array.from($(el).find('.work-info-content-item-name')).flatMap((el,i) => new FadeSplitText({el: $(el).get(0), onMask: true, delay:.2})),
                        ...Array.from($(el).find('.work-info-content-item-link')).flatMap((el,i) => new FadeIn({el: $(el).get(0)})),
                        new FadeSplitText({el: $(el).find('.work-info-content-item-title').get(0), onMask: true, delay:.2})
                    ]
                })
            })
        }
    }
    let workInfo = new WorkInfo(".work-info-wrap");
    class FaqsHero extends TriggerSetupHero {
        constructor() {
            super();
            this.tl = null;
        }
        trigger() {
            this.setup();
            super.init(this.play.bind(this));
        }
        setup() {
            new MasterTimeline({
                timeline: this.tl,
                tweenArr: [
                    new FadeSplitText({ el: $('.faq-hero-title').get(0), onMask: true }),
                    ...Array.from($('.faq-hero-item')).flatMap((el,i) => new FadeIn({el: $(el).get(0)})),
                ]
            })
            $('.faq-hero-item').each((idx, el) => {
                let number = idx <=9? `0${idx+1}` : idx+1;
                $(el).find('.faq-hero-item-number').text(`(${number})`);
            })
            $('.faq-hero-item').on('click', function(){
                if($(this).hasClass('active')){
                    $(this).removeClass('active')
                    $(this).find('.faq-hero-item-sub-wrap').slideUp();
                }
                else {
                    $('.faq-hero-item').removeClass('active')
                    $(this).addClass('active')
                    $('.faq-hero-item-sub-wrap').slideUp();
                    $(this).find('.faq-hero-item-sub-wrap').slideDown();
                }
            })
        }
        play() {
            this.tl.play();
        }
        
    }
    let faqsHero = new FaqsHero();
    class PolicyHero extends TriggerSetupHero {
        constructor() {
            super();
            this.tl = null;
        }
        trigger() {
            this.setup();
            super.init(this.play.bind(this));
        }
        setup() {
            this.interact();
            this.initContentPopup();
        }
        interact() {
            lenis.on('scroll', ()=> {
                this.ItemContentActiveCheck('.policy-hero-content h6');
            })
            $('.policy-hero-left-inner').on('click', '.policy-hero-menu-item', function(e) {
                e.preventDefault();
                $('.policy-hero-menu-item').removeClass('active');
                $(this).addClass('active');
                let dataHeader = $(this).attr('data-title');
                var scrollTop =  $(`.policy-hero-content h6[data-title="${dataHeader}"]`).offset().top + $('.policy-hero').scrollTop() - $('.policy-hero-content').offset().top + parseFloat($('.policy-hero-left-inner').css('top'));
                console.log(scrollTop)
                $('html').animate({
                    scrollTop: scrollTop
                }, 800);
            })
            lenis.on('scroll', () => {
                this.ItemContentActiveCheck('.policy-hero-content h6');
            })
        }
        ItemContentActiveCheck(el) {
            for (let i = 0; i < $(el).length; i++) {
                let top = $(el).eq(i).get(0).getBoundingClientRect().top;
                if (top > 0 && top + $(el).eq(i).height() < viewport.h/4*3 ) {
                    $('.policy-hero-menu-item').removeClass('active');
                    $('.policy-hero-menu-item').eq(i).addClass('active');
                }
                }
        }
        initContentPopup() {
            console.log('init policy')
            let titleLeft = $('.policy-hero-menu-item').eq(0).clone();
            $('.policy-hero-menu-item').remove();
            $('.policy-hero-content h6').each((i, el) => {
                $(el).attr('data-title', `toch-${i}`);
                let titleLeftClone = titleLeft.clone();
                if(i == 0) {
                    titleLeftClone.addClass('active');
                }
                titleLeftClone.find('.policy-hero-menu-item-number').text(i>9? `(${i+1})` : `(0${i+1})`);
                titleLeftClone.find('.policy-hero-menu-item-title').text($(el).text());
                titleLeftClone.attr('data-title', `toch-${i}`);
                $('.policy-hero-menu').append(titleLeftClone);
            })

        }
        play() {
            this.tl.play();
        }
        
    }
    let policyHero = new PolicyHero();
    class Header extends TriggerSetupHero {
        constructor() {
            super();
            this.tl = null;
            this.menuItem = new SplitType('.header-menu-item-txt', {types: 'lines, words', lineClass: 'bp-line'});
            this.menuTitle = new SplitType('.header-menu-title', {types: 'lines, words', lineClass: 'bp-line'});
            this.langText = new SplitType('.header-lang-item-txt', {types: "lines, words", lineClass: "bp-line"});
            this.init = false;
            
        }
        trigger() {
            this.setup();
            super.init(this.play.bind(this));
            this.interact();
        }
        setup() {
            this.tl = gsap.timeline({
                onStart: () => {
                    console.log('init')
                    $('[data-init-df]').removeAttr('data-init-df');
                    this.init = true
                },
                onComplete(){
                }
            });
            gsap.set('.header-logo', {opacity: 0, yPercent: -100});
            gsap.set(this.langText.words, { yPercent: 100});
            if(viewport.w > 991) {
                gsap.set('.header-menu-title.close .word', { y: "-100%"});
                gsap.set('.header-menu-title-wrap', {opacity: 1});
                gsap.set('.header', {opacity: 0, yPercent: -100});
                this.tl
                    .to('.header-logo', {duration: 1, opacity: 1, yPercent: 0, ease: 'power2.out'})
                    .to('.header', {duration: 1, opacity: 1, yPercent: 0, ease: 'power2.out'}, '<=0')
            }
            else {
                gsap.set('.header-menu-title.close .word', { y: "100%"});
                this.tl
                    .fromTo('.header-logo',{opacity: 0, yPercent: -100}, {duration: .6, opacity: 1, yPercent: 0, ease: 'power2.out'})
                    .fromTo('.header-lang',{opacity: 0, yPercent: -100}, {duration: .6, opacity: 1, yPercent: 0, ease: 'power2.out'},'<=0')
                    .fromTo('.header-contact',{opacity: 0, yPercent: -100}, {duration: .6, opacity: 1, yPercent: 0, ease: 'power2.out'},'<=0')
                    .fromTo('.header-menu-title',{opacity: 0, yPercent: -100}, {duration: .6, opacity: 1, yPercent: 0, ease: 'power2.out'},'<=0')
            }
            
        }
        play() {
            this.tl.play();
        }
        interact() {
            if (viewport.w > 991) {
                const $menuWrap = $(".header-menu-title-wrap");
                const $menuInner = $(".header-menu-inner");
                const $header = $(".header");
            
                const openMenu = () => {
                    $header.addClass("on-show-menu on-white");
                    $menuInner.addClass("active");
                    gsap.to(".header-menu-title.close .word", { duration: 0.8, y: "0%", stagger: 0.015, ease: "power2.out" });
                    gsap.to(".header-menu-title.open .word", { duration: 0.8, y: "100%", stagger: 0.015, ease: "power2.out" });
                };
            
                const closeMenu = () => {
                    $header.removeClass("on-show-menu");
                    header.toggleColorMode('white');
                    $menuInner.removeClass("active");
                    gsap.to(".header-menu-title.close .word", { duration: 0.8, y: "-100%", stagger: 0.015, ease: "power2.out" });
                    gsap.to(".header-menu-title.open .word", { duration: 0.8, y: "0%", stagger: 0.015, ease: "power2.out" });
                };
            
                $menuWrap.on("click", function (e) {
                    e.preventDefault();
                    $menuInner.hasClass("active") ? closeMenu() : openMenu();
                });
            
                // Gán một lần duy nhất
                $(document).on("click", function (e) {
                    if (
                        !$menuInner.is(e.target) && $menuInner.has(e.target).length === 0 &&
                        !$menuWrap.is(e.target) && $menuWrap.has(e.target).length === 0 &&
                        $menuInner.hasClass("active")
                    ) {
                        closeMenu();
                    }
                });
            }
            else {
                $(".header-menu-title-wrap").on("click", (e) => {
                    e.preventDefault();
                    if($('.header-menu-inner').hasClass('active')){
                        
                        $('.header-menu-inner').removeClass('active');
                        gsap.to('.header-menu-title.close .word', {duration: .8, y: "100%", stagger: 0.015, ease: "power2.out"});
                        gsap.to('.header-menu-title.open .word', {duration: .8, y: "0%", stagger: 0.015, ease: "power2.out"});
                        this.deactiveMenuTablet();
                    }
                    else {
                        $('.header-menu-inner').addClass('active');
                        $('.header-menu-inner').addClass('active');
                        gsap.to('.header-menu-title.close .word', {duration: .8, y: "0%", stagger: 0.015, ease: "power2.out"});
                        gsap.to('.header-menu-title.open .word', {duration: .8, y: "-100%", stagger: 0.015, ease: "power2.out"});
                        this.activeMenuTablet();
                    }
                })
            }
            $('.header-lang-title-wrap').on('click', (e) => {
                e.preventDefault();
                $('.header-lang').toggleClass('active');
                this.toggleLang();
            })
        }
        toggleLang(){
            if($('.header-lang').hasClass('active')){
                console.log('active')
                gsap.to(this.langText.words, {yPercent: 0, stagger: .1, duration: .6});
            }
            else {
                gsap.to(this.langText.words, {yPercent: 100, stagger: .1, duration: .6});
            }
        }
        activeMenuTablet = () => {
            lenis.stop();
            gsap.fromTo('.header-menu-label',{scale: 1.2}, {duration: .8, scale: 1, ease: "circ.inOut"});
            gsap.fromTo('.header-menu-list',{scale: 1.2}, {duration: 1, scale: 1, ease: "circ.inOut"});
            gsap.fromTo('.header-menu-inner',{clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'}, {duration: 1, clipPath: 'polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)', ease: "circ.inOut", onUpdate: function(){
                if(this.progress() > .4) {
                    $('.header').removeClass('on-white');
                }
            }});
        }
        deactiveMenuTablet = () => {
            lenis.start();
            gsap.fromTo('.header-menu-label',{scale: 1}, {duration: .8, scale: .8, ease: "circ.inOut"});
            gsap.fromTo('.header-menu-list',{scale: 1}, {duration: 1, scale: .8, ease: "circ.inOut"});
            gsap.fromTo('.header-menu-inner',{clipPath: 'polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)'}, {duration: 1, clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', ease: "circ.inOut", onComplete: () => {
            $('.header').removeClass('on-mode');
            }, onUpdate: function() {
                if(this.progress() > .4){
                    header.toggleColorMode('white');
                }
            }});
        }
        toggleOnScroll = (inst) => {
            if (inst.scroll > $(".header").height() * (viewport.w > 767 ? 1 : 0.5) ) {
                $(".header").addClass("on-scroll");
                // viewport.w> 991 && header.hideMenu();
            } else {
                $(".header").removeClass("on-scroll");
            }
        }
        toggleColorMode = (color) => {
            let elArr = Array.from($(`[data-section="${color}"]`));
            if (elArr.some(function (el) { return isInHeaderCheck(el) })) {
                $('.header').addClass(`on-${color}`);
            } 
            else if( !$('.header').hasClass('on-show-menu')) {
                $('.header').removeClass(`on-${color}`);
            }
        }
        toggleOnHide = (inst) => {
            const scrollTop = document.documentElement.scrollTop || window.scrollY;
            const $header = $('.header');
            const isScrollHeader = scrollTop > $('.header').height() * (viewport.w > 767 ? 4 : 1.5) && !$header.hasClass('on-show-menu');
            let debounceTimer;
            debounceTimer && clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                if (isScrollHeader) {
                    if (inst.direction >= 1) {
                        $header.addClass('on-hide');
                        if($('.mb-hero-card-main').length > 0) {
                            $('.mb-hero-card-main').addClass('on-top');
                        }
                    } else {
                        $header.removeClass('on-hide');
                        if($('.mb-hero-card-main').length > 0) {
                            $('.mb-hero-card-main').removeClass('on-top');
                        }
                    }
                } else {
                    $header.removeClass('on-hide');
                    if($('.mb-hero-card-main').length > 0) {
                        $('.mb-hero-card-main').removeClass('on-top');
                    }
                }
            }, 100);
        }
    }
    const header = new Header('.header'); 
    class Footer extends TriggerSetup {
        constructor(triggerEl) {
            super(triggerEl);
        }
        trigger() {
            super.setTrigger(this.setup.bind(this));
            this.interact();
        }
        setup() {
            let txtMap = new SplitType('.footer-info-link-map .footer-info-link-txt', {types: 'lines, words', lineClass: 'bp-line'});
            multiLineText('.footer-info-link-map');
            viewport.w < 768 && $('.footer-info-link-map .bp-line').css('margin-inline', 'auto')
            let tlImg = gsap.timeline({
                scrollTrigger: {
                    trigger: '.footer-left-img',
                    start: 'top top+=60%',
                    once: true,
                }
            })
            new MasterTimeline({
                timeline: tlImg,
                tweenArr: [
                    new ScaleInset({el: $('.footer-left-img-inner.active').get(0)})
                ]
            })
            let tlMenu = gsap.timeline({
                scrollTrigger: {
                    trigger: '.footer-menu',
                    start: 'top top+=75%',
                    once: true,
                }
            })
            new MasterTimeline({
                timeline: tlMenu,
                tweenArr: [
                    ...Array.from($('.footer-left-social-item-txt')).flatMap((el, idx) => new FadeSplitText({ el: $(el).get(0), onMask: true, delay: idx == 0 ? 0 : .1})),
                    ...Array.from($('.footer-menu-space')).flatMap((el, idx) => new FadeSplitText({ el: $(el).get(0), onMask: true, delay: idx == 0 ? 0 : .1}))
                ]
            })
            let tlPolicy = gsap.timeline({
                scrollTrigger: {
                    trigger: '.footer-policy-wrap',
                    start: 'top top+=75%',
                }
            })
            new MasterTimeline({
                timeline: tlPolicy,
                tweenArr: [
                    ...Array.from($('.footer-policy-item-txt')).flatMap((el, i) => {
                    return [
                        new FadeSplitText({ el: $(el).get(0), onMask: true, delay: i == 0 ? 0 : .1}),
                    ]
                    })
                ]
            })
            let tlApp = gsap.timeline({
                scrollTrigger: {
                    trigger: '.footer-touch-wrap',
                    start: 'top top+=80%',
                    once: true,
                }
            })
            new MasterTimeline({
                timeline: tlApp,
                tweenArr: [
                    ...Array.from($('.footer-app .txt')).flatMap((el, i) => new FadeSplitText({ el: $(el).get(0), onMask: true, delay: i == 0 ? 0 : .2}),),
                    new FadeIn({el: $('.footer-touch-ic').get(0)}),
                    new FadeSplitText({ el: $('.footer-touch-txt').get(0), onMask: true})
                ]
            })
            let tlSocial = gsap.timeline({
                scrollTrigger: {
                    trigger: '.footer-info',
                    start: 'top top+=80%',
                    once: true,
                }
            })
            new MasterTimeline({
                timeline: tlSocial,
                tweenArr: [
                    ...Array.from($('.footer-info .txt')).flatMap((el, i) => {
                        return [
                            new FadeSplitText({ el: $(el).get(0), onMask: true, delay: i == 0? 0 :.1}),
                        ]
                    })  ,
                    ...Array.from($('.footer-info .footer-info-item-social-ic')).flatMap((el, i) => {
                        return [
                            new FadeIn({ el: $(el).get(0), delay: i == 0? 0 :.05}),
                        ]
                    })     
                ]
            })
            let tlBot = gsap.timeline({
                scrollTrigger: {
                    trigger: '.footer-copyright-wrap',
                    start: 'top bottom  ',
                    once: true,
                }
            })
            new MasterTimeline({
                timeline: tlBot,
                tweenArr: [
                    ...Array.from($('.footer-left-social-list .txt')).flatMap((el, i) => {
                        return [
                            new FadeIn({ el: $(el).get(0), delay: i == 0? 0 :.05}),
                        ]
                    }),
                    ...Array.from($('.footer-copyright-wrap .txt')).flatMap((el, i) => {
                        return [
                            new FadeSplitText({ el: $(el).get(0), onMask: true, delay: i == 0? 0 :.1}),
                        ]
                    })  ,
                       
                ]
            })
        }
        interact() {
            let zIndexVal = 1;
            viewport.w > 991 && $('.footer-app-link').hover(
                function() {
                    zIndexVal++;
                    let attr = $(this).attr('data-app');
                    $(`.footer-left-img-inner[data-app="${attr}"]`).css('z-index', zIndexVal);
                    $('.footer-left-img-inner[data-app]').removeClass('active');
                    // $(`.footer-left-img-inner[data-app="${attr}"]`).addClass('active');
                    gsap.fromTo(`.footer-left-img-inner[data-app="${attr}"]`, {scale:0}, {duration: .8, scale: 1.2, ease: "power4.out"})
                },
                function() {
                 
                }
              );
        }
    }
    const footer = new Footer('.footer-wrap');
    const SCRIPT = {
        homeScript: () => {
            homeHero.trigger();
            homeExplore.trigger();
            homeSenses.trigger();
            homeFeatured.trigger();
            homeService.trigger();
            homeTesti.trigger();
            homeThumb.trigger();
            homeFaq.trigger();
            homeArticle.trigger();
            footer.trigger();
        },
        membershipScript: () => {
            membershipHero.trigger();
            footer.trigger();
        },
        contactScript: () => {
            contactHero.trigger();
        },
        serviceScript: () => {
            serviceHero.trigger();
            footer.trigger();
        },
        gameScript: () => {
            gameHero.trigger();
            gameJackpot.trigger();
            footer.trigger();
        },
        fbScript: () => {
            fbHero.trigger();
            footer.trigger();
        },
        eventScript: () => {
            eventHero.trigger();
            footer.trigger();
        },
        workScript: () => {
            workHero.trigger();
            workWorkSpace.trigger();
            workThumb.trigger();
            workEnviroment.trigger();
            workJob.trigger();
            workOffice.trigger();
            workInfo.trigger();
            footer.trigger();
        },
        policyScript: () => { 
            policyHero.trigger();          
            footer.trigger();
        },
        faqsScript: () => { 
            faqsHero.trigger();          
            footer.trigger();
        },
    };
    const initGlobal = () => {
        cursor.init();
        header.trigger();
        
        if ($(".term-content-main-txt").length > 0) {
        customLinkRichText(".term-content-main-txt");
        }
        const pageName = $(".main").attr("data-barba-namespace");
        if (pageName) {
        SCRIPT[`${pageName}Script`]();
        }
        header.toggleOnScroll(lenis);
        header.toggleColorMode('white');
        header.toggleColorMode('blue');
        let isScrolling = false;
        lenis.on("scroll", function (inst) {
            if (!isScrolling) {
                setupIframe();
                setupImg();
                isScrolling = true;
            }
            header.toggleColorMode('white');
            header.toggleColorMode('blue');
            header.toggleOnScroll(lenis);
            header.toggleOnHide(inst);
        });
       
    };
    /** (💡)  - START PAGE */
    // if (window.scrollY > 0) {
    //     lenis.scrollTo(0, {
    //     duration: 0.001,
    //     onComplete: () => initGlobal(),
    //     });
    // } else {
        initGlobal();
    // }
    /** (💡) **/
};
window.onload = mainScript;
