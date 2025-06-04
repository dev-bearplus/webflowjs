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
    function refreshTrigger() { 
        gsap.globalTimeline.getChildren().forEach((el) => {
            if (el.scrollTrigger && el.scrollTrigger.progress === 0) {
                el?.scrollTrigger?.refresh();
            }
        });
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
            let iframeSpotifySrc ='https://open.spotify.com/embed/playlist/1bhxiHUsBUQPTaYOyt8gUi?utm_source=generator&theme=0'
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
                    start: "top top+=75%",
                },
            })
            $('.home-featured-right-item').each((idx, el) => {
                let linkInner = $(el).find('.home-featured-right-item-inner')
                let dataLinkDetail = linkInner.attr('data-link-detail');
                let dataLinkType = linkInner.attr('data-link-type');
                let linkCurrent = linkInner.attr('href');
                linkInner.attr('href', `${linkCurrent}?detail=${dataLinkDetail}&type=${dataLinkType}`);
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
                        .to(title.words, {yPercent: 0, duration: .6, stagger: 0.025, ease: "power1.out"})
                    }
    
                    $(el).find('.home-featured-time-item').each((i, item) => {
                        console.log($(item).find('.home-featured-time-label'));
                        let itemLabel = new SplitType($(item).find('.home-featured-time-item-label'), {types: 'words, lines', lineClass: 'bp-line'});
                        let itemTitle = new SplitType($(item).find('.home-featured-time-item-title'), {types: 'words, lines', lineClass: 'bp-line'});
                        gsap.set(itemLabel.words, {yPercent: 100});
                        gsap.set(itemTitle.words, {yPercent: 100});
                        if(idx === 0) {
                            tl
                            .to(itemLabel.words, {yPercent: 0, duration: .4, stagger: 0.01, ease: "power1.out"}, `<=${i*0.1}`)
                            .to(itemTitle.words, {yPercent: 0, duration: .4, stagger: 0.01, ease: "power1.out"}, '<=.2')
                        }
                    })
                    if(idx === 0) {
                        tl
                        .to(sub.words, {yPercent: 0, duration: .4, stagger: 0.01, ease: "power1.out"}, `<=.2`)
                        .to(desc.words, {yPercent: 0, duration: .4, stagger: 0.01, ease: "power1.out"}, '<=.2')
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
                $('.home-featured-img-wrap').append('<div class="global-swiper-pagination"></div>')
                let swiper = new Swiper(".home-featured-img-wrap", {
                    slidesPerView: 1,
                    spaceBetween: parseRem(40),
                    initialSlide: 1,
                    pagination: {
                        el: '.global-swiper-pagination',
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
                            activeItem(['.home-featured-left-inner'], index)
                        }
                    }

                });
                
            }
        }
        activeContent(index){
            if(lenis.direction == 1) {
                if(index!=0) {
                    gsap.to($('.home-featured-left-inner').eq(index-1).find('.home-featured-title .word'),{yPercent: -100, stagger: .02, duration: .6, ease: "power1.out"} )
                    $('.home-featured-left-inner').eq(index-1).find('.home-featured-time-item').each((i, item) => {
                        gsap.to($(item).find('.home-featured-time-item-label .word'),{yPercent: -100, stagger:.02, duration:.4, ease: "power1.out"})
                        gsap.to($(item).find('.home-featured-time-item-title .word'),{yPercent: -100, stagger:.02, duration:.4, ease: "power1.out"})
                    })
                    gsap.to($('.home-featured-left-inner').eq(index-1).find('.home-featured-info-label .word'),{yPercent: -100, stagger: .01, duration: .4, ease: "power1.out"})
                    gsap.to($('.home-featured-left-inner').eq(index-1).find('.home-featured-info-body .word'),{yPercent: -100, stagger: .01, duration: .4, ease: "power1.out"})

                    gsap.to($('.home-featured-left-inner').eq(index).find('.home-featured-title .word'),{yPercent: 0, stagger: .02, duration: .6, delay: '.15', ease: "power1.out"})
                    $('.home-featured-left-inner').eq(index).find('.home-featured-time-item').each((i, item) => {
                        gsap.to($(item).find('.home-featured-time-item-label .word'),{yPercent: 0, stagger:.02, duration:.4, delay: '.1', ease: "power1.out"})
                        gsap.to($(item).find('.home-featured-time-item-title .word'),{yPercent: 0, stagger:.02, duration:.4, delay: '.1', ease: "power1.out"})
                    })
                    gsap.to($('.home-featured-left-inner').eq(index).find('.home-featured-info-label .word'),{yPercent: 0, stagger: .01, delay: '.1', duration: .4, ease: "power1.out"})
                    gsap.to($('.home-featured-left-inner').eq(index).find('.home-featured-info-body .word'),{yPercent: 0, stagger: .01, delay: '.1', duration: .4, ease: "power1.out"})
                } 
            }
            else {
                gsap.to($('.home-featured-left-inner').eq(index+1).find('.home-featured-title .word'),{yPercent: 100, stagger: .02, duration: .6, ease: "power1.out"} )
                $('.home-featured-left-inner').eq(index+1).find('.home-featured-time-item').each((i, item) => {
                    gsap.to($(item).find('.home-featured-time-item-label .word'),{yPercent: 100, stagger:.02, duration:.4, ease: "power1.out"})
                    gsap.to($(item).find('.home-featured-time-item-title .word'),{yPercent: 100, stagger:.02, duration:.4, ease: "power1.out"})
                })
                gsap.to($('.home-featured-left-inner').eq(index+1).find('.home-featured-info-label .word'),{yPercent: 100, stagger: .01, duration: .4, ease: "power1.out"})
                gsap.to($('.home-featured-left-inner').eq(index+1).find('.home-featured-info-body .word'),{yPercent: 100, stagger: .01, duration: .4, ease: "power1.out"})

                gsap.to($('.home-featured-left-inner').eq(index).find('.home-featured-title .word'),{yPercent: 0, stagger: .02, duration: .6, delay: '.15', ease: "power1.out"})
                $('.home-featured-left-inner').eq(index).find('.home-featured-time-item').each((i, item) => {
                    gsap.to($(item).find('.home-featured-time-item-label .word'),{yPercent: 0, stagger:.02, duration:.4, delay: '.1', ease: "power1.out"})
                    gsap.to($(item).find('.home-featured-time-item-title .word'),{yPercent: 0, stagger:.02, duration:.4, delay: '.1', ease: "power1.out"})
                })
                gsap.to($('.home-featured-left-inner').eq(index).find('.home-featured-info-label .word'),{yPercent: 0, stagger: .01, delay: '.1', duration: .4, ease: "power1.out"})
                gsap.to($('.home-featured-left-inner').eq(index).find('.home-featured-info-body .word'),{yPercent: 0, stagger: .01, delay: '.1', duration: .4, ease: "power1.out"})
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
            setupMarquee($(".home-thumb-main"));
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
            if(viewport.w > 991) {
                let zIndexVal = 1;
                let urlImgItemFirtst = $('.home-service-img img').eq(0).attr('src');
                console.log(urlImgItemFirtst);
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
                $('.home-service-right-wrap').addClass('swiper')
                $('.home-service-right').addClass('swiper-wrapper')
                $('.home-service-item').addClass('swiper-slide')
                let swiper = new Swiper(".home-service-right-wrap", {
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
            
            // on: {
            //     slideChange: function () {
            //         let currentIndex = swiper.realIndex + 1;
            //         $(".home-testi-pagi-item.current").text(
            //         currentIndex < 10 ? "0" + currentIndex : currentIndex
            //         );

            //         if (swiper.realIndex === 0) {
            //         $(".home-testi-navi-item-wrap.item-prev").addClass("hidden");
            //         } else {
            //         $(".home-testi-navi-item-wrap.item-prev").removeClass("hidden");
            //         }
            //         if (swiper.realIndex === lengthSlide - 1) {
            //         $(".home-testi-navi-item-wrap.item-next").addClass("hidden");
            //         } else {
            //         $(".home-testi-navi-item-wrap.item-next").removeClass("hidden");
            //         }
            //     },
            // },
        });
        $(".home-testi-navi-item-wrap.item-prev").on("click", function () {
            swiper.slidePrev();
        });

        $(".home-testi-navi-item-wrap.item-next").on("click", function () {
            swiper.slideNext();
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
            super.init(this.play.bind(this));
        }
        setup() {
            if(viewport.w > 991) {
                let lengthSlide = $(".mb-hero-card-item").length;
                let stickyBot =  viewport.h - $('.mb-hero-card-main').height();
                $('.mb-hero-card-main').css('margin-bottom', `${stickyBot}px`)
                $('.mb-hero-content-wrap').css('margin-top', `-${stickyBot}px`)
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
                $('.mb-hero-content-wrap').addClass('swiper')
                $('.mb-hero-content-inner').addClass('swiper-wrapper')
                $('.mb-hero-content-row').addClass('swiper-slide')
                let swiper = new Swiper(".mb-hero-content-wrap", {
                    slidesPerView: 'auto',
                    spaceBetween: 0,
                })
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
                        $(".mb-hero-card-wrap").removeClass('on-sticky');
                        ScrollTrigger.refresh();
                    }
                },
            });
            tl.play(); 
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
                    }, 5000)
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
            this.initContentPopup();
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
                if($(e.target).closest('.service-hero-popup-inner').length == 0) {
                    $(this).removeClass('active');
                    lenis.start();
                    resetScrollPopup();
                }
            })
            $('.service-hero-popup-inner').on('scroll', ()=> {
                this.ItemContentActiveCheck('.service-hero-popup-inner.active h6');
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
                gsap.set('.game-hero-title-ic img', {yPercent: 100, opacity: 0});
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
                        new FadeSplitText({ el: $('.game-hero-machine').eq(0).find('.game-hero-machine-label').get(0), onMask: true }),
                        new ScaleInset({ el: $('.game-hero-img-item').get(0), onMask: true }),
                        new FadeIn({ el: $('.game-hero-right-link'), onMask: true, onStart: () => {
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
        }
        activeTitle(index, direction) {
            activeItem(['.game-hero-machine-title'], index);
            if(direction == 1) {
                gsap.to($('.game-hero-machine-title').eq(index - 1).find('.word'), {yPercent: -100, opacity: 0, duration:.4, stagger:.015, ease: 'power1.out'})
                gsap.to($('.game-hero-machine-title').eq(index -1).find('.game-hero-title-ic').find('img'), {yPercent: -100, opacity: 0, duration:.4, stagger:.015, ease: 'power1.out'})
                gsap.to($('.game-hero-machine-title').eq(index).find('.word'), {yPercent: 0, opacity: 1, duration:.4, stagger:.015, delay: '.1', ease: 'power1.out'})
                gsap.to($('.game-hero-machine-title').eq(index ).find('.game-hero-title-ic').find('img'), {yPercent: 0, opacity: 1, duration:.4, delay: '.1', ease: 'power1.out'})
            }
            else if( direction == -1) {
                gsap.to($('.game-hero-machine-title').eq(index + 1).find('.word'), {yPercent: 100, opacity: 0, duration:.4, stagger:.015, ease: 'power1.out'})
                gsap.to($('.game-hero-machine-title').eq(index + 1).find('.game-hero-title-ic').find('img'), {yPercent: 100, opacity: 0, duration:.4, ease: 'power1.out'})
                gsap.to($('.game-hero-machine-title').eq(index).find('.word'), {yPercent: 0, opacity: 1, delay: '.1', duration:.4, stagger:.015, ease: 'power1.out'})
                gsap.to($('.game-hero-machine-title').eq(index).find('.game-hero-title-ic').find('img'), {yPercent: 0, opacity: 1, delay: '.1', duration:.4, ease: 'power1.out'})
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
          this.limitBall = viewport.w > 767 ? 35 : 29;
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
                this._dropInitialBalls(this.limitBall - 5);
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
                const r = d/2;
                const x = this.center ;
                const y = d/2;
                const ball = Bodies.circle(x, y, r, {
                    frictionAir: 0.0000001,
                    restitution: 0.8,
                    friction: viewport.w > 767? 0.04 : 0.08,
                    render: {
                        fillStyle: "#002b8d"
                    }
              });
              World.add(this.world, ball);
              ball._scale = 1;
              this.balls.push(ball);
              gsap.to({ scale: 0 }, {
                scale: 1,
                duration: viewport.w > 767? 2 : 1,
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
                  duration: .5,
                  ease: "power1.in",
                  onUpdate: function () {
                    const s = this.targets()[0].scale;
                    Matter.Body.scale(oldBall, s / (oldBall._scale || 1), s / (oldBall._scale || 1));
                    oldBall._scale = s;
                  },
                  onComplete: function () {
                    Composite.remove(this.world, oldBall);
                  }.bind(this)
                });
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
                    trigger: '.game-jackpot-main-ball',
                    start: "top top+=50%",
                },
                onComplete: () => {
                }
            })
            tl.to($('.game-jackpot-main-ball-txt').eq(0).find('.word'), {yPercent: 0, duration:.6, stagger:.015, ease: 'power1.out'})
            let animingFlag = false;
            $('.game-jackpot-main-control-txt').on('click', function(e) {
                e.preventDefault();
                if(animingFlag) return;
                animingFlag = true;
                $('.game-jackpot-main-control-txt').removeClass('active');
                $(this).addClass('active');
                let dataType = $(this).attr('data-type');
                console.log(dataType)
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
                console.log($(`.event-hero-card-item[data-link-detail=${itemDetail}] `))
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
            
        }
        activeTab(tagName) {
            $('.event-hero-card-item').fadeOut(400);
            $('.event-hero-card-item').each((i, el) => {
                if($(el).attr('data-tag') == tagName) {
                    $(el).fadeIn(400);
                }
            })
        }
        initActiveTab(tagName) {
            $('.event-hero-card-item').hide();
            $('.event-hero-card-item').each((i, el) => {
                if($(el).attr('data-tag') == tagName) {
                    $(el).show();
                }
            })
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
            $('.work-popup-item').on('scroll', ()=> {
                this.ItemContentActiveCheck('.work-popup-item.active .work-popup-item-content h5');
            })
            $('.work-popup-item-left-content').on('click', '.work-popup-item-left-title', function(e) {
                e.preventDefault();
                $('.work-popup-item-left-title').removeClass('active');
                $(this).addClass('active');
                let dataHeader = $(this).attr('data-title');
                var scrollTop =  $('.work-popup-inner').scrollTop() - $('.work-popup-inner').offset().top + $(`.work-popup-item-left-content .work-popup-item-left-title[data-title="${dataHeader}"]`).offset().top   - parseFloat($('.work-popup-item-left-content').css('top'));
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
                $(item).find('.work-popup-item-content h5').each((i, el) => {
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
                // velocity thường là số dương nhỏ, có thể âm nếu scroll ngược
                // Chúng ta lấy trị tuyệt đối, giới hạn speed từ 0.5 đến 3 để không quá nhanh/chậm
                const speed = Math.min(Math.max(Math.abs(velocity) * 2, 0.5), 3)
                tl.timeScale(speed) // điều chỉnh tốc độ timeline theo scroll velocity
              })
        }
    }
    let workOffice = new WorkOffice(".work-office-wrap");
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
                    console.log('click');   
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
            // gsap.to('.header-menu-inner', {duration: .8, opacity: 1, ease: "power2.out"});
            gsap.fromTo('.header-menu-label',{scale: 1.2}, {duration: .8, scale: 1, ease: "circ.inOut"});
            gsap.fromTo('.header-menu-list',{scale: 1.2}, {duration: 1, scale: 1, ease: "circ.inOut"});
            // gsap.fromTo('.header-menu-bot',{scale: 1.2}, {duration: .8, scale: 1, ease: "circ.inOut"});
            gsap.fromTo('.header-menu-inner',{clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'}, {duration: 1, clipPath: 'polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)', ease: "circ.inOut", onUpdate: function(){
                console.log(this.progress());
                if(this.progress() > .7) {
                    $('.header').removeClass('on-white');
                }
            }});
        }
        deactiveMenuTablet = () => {
            gsap.fromTo('.header-menu-label',{scale: 1}, {duration: .8, scale: .8, ease: "circ.inOut"});
            gsap.fromTo('.header-menu-list',{scale: 1}, {duration: 1, scale: .8, ease: "circ.inOut"});
            // gsap.fromTo('.header-menu-bot',{scale: 1}, {duration: .8, scale: .8, ease: "circ.inOut"});
            gsap.fromTo('.header-menu-inner',{clipPath: 'polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)'}, {duration: 1, clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', ease: "circ.inOut", onComplete: () => {
            $('.header').removeClass('on-mode');
            }, onUpdate: function() {
                if(this.progress() > .7){
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
                    } else {
                        $header.removeClass('on-hide');
                    }
                } else {
                    $header.removeClass('on-hide');
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
            
            
        }
        interact() {
            let zIndexVal = 1;
            $('.footer-app-link').hover(
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
            footer.trigger();
        }
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
        lenis.on("scroll", function (inst) {
            header.toggleColorMode('white');
            header.toggleColorMode('blue');
            header.toggleOnScroll(lenis);
            header.toggleOnHide(inst);
        });
    };
    /** (💡)  - START PAGE */
    if (window.scrollY > 0) {
        lenis.scrollTo(0, {
        duration: 0.001,
        onComplete: () => initGlobal(),
        });
    } else {
        initGlobal();
    }
    /** (💡) **/
};
window.onload = mainScript;
