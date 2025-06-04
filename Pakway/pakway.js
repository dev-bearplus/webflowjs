const mainScript = () => {
    function globalScript() {
        if ($(".active-firstchild").length > 0) {
          $(".active-firstchild").removeClass("active-firstchild");
        }
        if ($(".hide-def-div").length > 0) {
            $(".hide-def-div").removeClass("hide-def-div");
        }
        $('[data-cursor="btn-outline"]').each((idx, el) => {
            $(el).find('.txt').css({
                'position': 'relative',
                'z-index': '2'
            })
            $(el).find('.ic-embed:not(.ic-arr-main):not(.ic-arr-clone)').css({
                'position': 'relative',
                'z-index': '2'
            })
            if($(this).find('.btn-dot').length ==0){
                let btnDot = $(document.createElement('div')).addClass('btn-dot');
                let btnDotInner = $(document.createElement('div')).addClass('btn-dot-inner');
                btnDot.append(btnDotInner)
                $(el).append(btnDot)
            }

        })
        function debounce(func, delay = 100) {
            let timer;
            return function (event) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, delay, event);
            };
        }
        $(window).on(
            "resize",
            debounce(function () {
              let newViewportWidth =
                window.innerWidth || document.documentElement.clientWidth;
                console.log(newViewportWidth)
              // if (newViewportWidth < 992) {
                // location.reload();
              // }
            })
          );
        header.setup();
        // footer.setTrigger();
      }
      function counterNumber(selector, duration = 1000) {
        $(selector).each(function () {
            var $this = $(this);
            var startNumber = parseInt($this.text(), 10) || 0; 
            $this.text(''); 
            $({ count: 0 }).animate(
                { count: startNumber },
                {
                    duration: duration,
                    easing: "swing",
                    step: function (now) {
                        $this.text(Math.floor(now)); 
                    },
                    complete: function () {
                        $this.text(startNumber); 
                    }
                }
            );
        });
    }
    function updateMarquee(className) {
        let dir = -1;
        let velo = 0;
        if ($(className).length && isInViewport(className)) {
            let x = gsap.getProperty(className, 'backgroundPositionX');
            velo = lenis.velocity;
            dir = lenis.direction == 0 ? dir : -lenis.direction;
            gsap.quickSetter(className, 'backgroundPositionX', 'px')(viewport.w > 991 ?  `${x + (1 + velo * .25 * -dir) * dir}` : `${x + (.5 + velo * .25 * -dir) * dir}`)
        }
        requestAnimationFrame(() => updateMarquee(className));
    }
    function truncateToTwoLines(className, line) {
        $(className).each(function () {
            let element = $(this);
            let originalText = element.text().trim();
            let words = originalText.split(' ');
            let tempText = '';
            if(parseInt(element.height()) > parseInt(element.css('line-height')) * line + 1){
                element.text('');
                for (let i = 0; i < words.length; i++) {
                    let testText = tempText + words[i] + ' ';
                    element.text(testText + '...');
                    console.log(parseInt(element.height()) )
                    console.log(parseInt(element.css('line-height')) * line)
                    if (parseInt(element.height()) > parseInt(element.css('line-height')) * line + 1) {
                        break;
                    }
                    tempText += words[i] + ' ';
                }
                element.text(tempText.trim() + '...');
            }
        });
    }
    function spanGreen(className){
    $(className).each((index, item) => {
        let $this = $(item);
        let text = $this.text();
        let classList = $this.attr('class');
        let words = text.split(' ');
        let wrappedText = words
            .map((word, idx) => {
                if ( idx === words.length - 1) {
                    return `<span class="${classList} sp-special">${word} </span>`;
                } else {
                    return `<span class="${classList}">${word}</span>`;
                }
            })
            .join(' ');
        $this.replaceWith(wrappedText);
    });
    }
    function addSpaceToText(className){
    $(className).each((idx, item) => {
        // $(item).html($(item).text()+'&nbsp;')
    })
    }
    function replaceHyphen(className) {
    $(className).html(function (idx,oldHtml) {
        return oldHtml.replaceAll("-", "<span>-</span>");
    });
    }
    function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
    }
    function initTermlyScript() {
        // if (!document.getElementById('termly-jssdk') ) {
            var js, tjs = document.getElementsByTagName('script')[0];
            js = document.createElement('script');
            js.id = 'termly-jssdk';
            js.src = "https://app.termly.io/embed-policy.min.js";
            tjs.parentNode.insertBefore(js, tjs);
        // }
    }
    function initTermlyScriptAsync() {
        return new Promise((resolve, reject) => {
            try {
                initTermlyScript();
                resolve(); // Resolve immediately after the function executes
            } catch (error) {
                reject(error); // Reject in case of errors
            }
        });
    }
    function reinitializeWebflow() {
        console.log('reinitialize webflow');
        window.Webflow && window.Webflow.destroy();
        window.Webflow && window.Webflow.ready();
    }
    let old = performance.now()
    let delta = 1000 / 60;
    function time() {
        delta = performance.now() - old;
        old = performance.now()
        requestAnimationFrame(time)
    }
    requestAnimationFrame(time)
    const parseRem = (input) => {
        return input / 10 * parseFloat($('html').css('font-size'))
    }
    const degToRad = (deg) => {
        return deg * Math.PI / 180;
    }
    function activeItem(elArr, index) {
        elArr.forEach((el, idx) => {
            $(el).removeClass('active').eq(index).addClass('active')
        })
    }
    const lerp = (a,b,t = 0.08) => {
        return a + (b - a) * t;
    }
    function multilineText(els) {
        console.log('klhjhaklsjdfkashdjfkahjsdfkjahsdkfhjakjsdfhh')
        $(els).each((idx, el) => {
            if ($(el).find('.txt').height() <= parseFloat($(el).find('.txt').css('line-height')) * 1.25) {
                return;
            }
            console.log('multi')
            let linesArr = new SplitType($(el).find('.txt'), {types: 'lines', lineClass: 'line'}).lines.map((line) => line.textContent);
            SplitType.revert($(el).find('.txt'));
            console.log(linesArr)
            let lineTemp = $(el).find('.hover-un-inner').clone();
            $(el).empty();
            linesArr.forEach((txt, idx) => {
                let newLine = lineTemp.clone();
                newLine.find('.txt').text(txt);
                $(el).append(newLine)
            })
        })
    }
    multilineText($('.hover-un'))
    const xSetter = (el) => gsap.quickSetter(el, 'x', `px`);
    const ySetter = (el) => gsap.quickSetter(el, 'y', `px`);
    const xGetter = (el) => gsap.getProperty(el, 'x');
    const yGetter = (el) => gsap.getProperty(el, 'y');

    function isInViewport(el) {
        if (!$(el).length) return;
        const rect = document.querySelector(el).getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
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
    barba.use(barbaPrefetch);
    const lenis = new Lenis()
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
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

    const pointer = {
        x: $(window).width() / 2,
        y: $(window).height() / 2,
        xNor: $(window).width() / 2 / $(window).width(),
        yNor: $(window).height() / 2 / $(window).height()
    }
    $(window).on('pointermove', function (e) {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
    })

    const pointerCurr = () => {
        return pointer
    }
    function isInHeaderCheck(el) {
        const rect = $(el).get(0).getBoundingClientRect();
        const headerRect = $('.header').get(0).getBoundingClientRect();
        return (
            rect.bottom >= 0 &&
            rect.top - headerRect.height / 2 <=0
        );
    }
    const isTouchDevice = () => {
        return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
    }
    if (!isTouchDevice()) {
        $('html').attr('data-has-cursor', 'true')
        window.addEventListener('pointermove', function(e) {
            updatePointer(e)
        })
    } else {
        $('html').attr('data-has-cursor', 'false')
        window.addEventListener('pointerdown', function(e) {
            updatePointer(e)
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
    function resetScroll() {
        console.log(window.location)
        console.log("resetScroll")
        if (window.location.hash !== '') {
            console.log('has hash')
            if ($(window.location.hash).length >=1) {
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
                setTimeout(function(){
                    console.log($('.footer-menu-item-link.w--current').length)
                    $('.footer-menu-item-link').removeClass('w--current')
                    $('.footer-menu-item-link').each(function () {
                        const link = $(this).attr('href');
                        if (link && link.includes(searchObj.sc)) {
                            $(this).addClass('w--current');
                        }
                    });
                },1000)
                if ($(`#${searchObj.sc}`).length >=1) {
                    console.log('dom search')
                    window.scrollTo(0, $(`#${searchObj.sc}`).offset().top)
                    setTimeout(() => {
                        window.scrollTo(0, $(`#${searchObj.sc}`).offset().top)
                    }, 300);
                } else {
                    scrollTop()
                }
            }
        } else {
            scrollTop()
        }
    }
    function updateNavActive(data){
        $('[data-nav]').removeClass('active');
    }
    function removeAllScrollTrigger() {
        let triggers = ScrollTrigger.getAll();
        triggers.forEach(trigger => {
            trigger.kill();
        });
    }
    function updateBeforeTrans(data) {
        if (data.current.container) {
            $(data.current.container).css('z-index', 2)
        }
    }
    function updateAfterTrans(data) {
        cursor.reset()
        window.scrollTo(0, 0);
        if (data.current.container) {
            data.current.container.remove()
        }
        resetScroll()
        removeAllScrollTrigger()
        reinitializeWebflow()
        updateNavActive(data)
    }
    class PageTransition {
        constructor() {
            this.tlLeave;
            this.tlEnter;
        }
        setup() {

        }
        leaveAnim(data) {
            this.tlLeave = gsap.timeline({
                onStart: () => {
                    updateBeforeTrans(data)
                },
                onComplete: () => {
                    updateAfterTrans(data)
                },
            })

            this.tlLeave
            .to('.trans-wrap', {autoAlpha: 1, duration: .6, ease: 'none'})
            return this.tlLeave
        }
        enterAnim(data) {
            this.tlEnter = gsap.timeline({
                onComplete: () => {
                    loading.animHero();
                },
            })

            this.tlEnter
            .to('.trans-wrap', {autoAlpha: 0, duration: .6, ease: 'none'})
            return this.tlEnter
        }
    }
    let pageTrans = new PageTransition();
    class Loading {
        constructor() {
            this.tlLoading;
            this.isLoaded = sessionStorage.getItem("isLoaded") == 'true' ? true : false;
        }
        init() {
           this.tlLoading = new gsap.timeline({
            onStart: () => {
                lenis.stop();
                $('.loading-wrap').removeClass('on-loaded')
            },
            onComplete: () => {
                lenis.start();
                sessionStorage.getItem("isLoaded") == 'true' ? null : sessionStorage.setItem("isLoaded", 'true')
                $('.loading-wrap').addClass('on-loaded')
                this.animHero()
            }
           })
           this.tlLoading
                    .from('.loading-inner', {autoAlpha: 0, duration: .6, ease: 'none'})
                    .to('.loading-inner', {delay:1, autoAlpha: 0, duration: .6, ease: 'none'})
        }
        animHero(){
            console.log('hero loaded')
            if ($('[data-barba-namespace="home"]').length) {
                homeHeroCanvas.init();
                homeHero.play();
            }
            else if ($('[data-barba-namespace="about"]').length) {
                aboutHero.play()
            }
            else if ($('[data-barba-namespace="capality-rpet-flake"]').length || $('[data-barba-namespace="capality-rpet-extrusion"]').length || $('[data-barba-namespace="capality-rpet-color"]').length) {
                capalityHero.play()
            }
            else if ($('[data-barba-namespace="app-rpet"]').length || $('[data-barba-namespace="app-pet"]').length ) {
                appHero.play()
            }
            else if ($('[data-barba-namespace="product-rpet"]').length || $('[data-barba-namespace="product-pet"]').length ) {
                prHero.play()
            }
            else if ($('[data-barba-namespace="customer"]').length ) {
                customerHero.play()
            }
            else if ($('[data-barba-namespace="blog"]').length ) {
                blogHeroAnim.play()
            }
            else if ($('[data-barba-namespace="contact"]').length ) {
                contactHero.play()
            }
        }
    }
    let loading = new Loading()
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

            if (Math.hypot(this.targetX - targetInnerX ,this.targetY - targetInnerY) > 1 || Math.abs(lenis.velocity) > .1) {
                xSetter('.cursor-main')(lerp(targetInnerX, this.targetX, 0.1))
                ySetter('.cursor-main')(lerp(targetInnerY, this.targetY - lenis.velocity / 16 , 0.1))
            }
        }
        onHover() {
            let type = $('[data-cursor]:hover').attr('data-cursor');
            let gotBtnSize = false;
            if ($('[data-cursor]:hover').length) {
                switch (type) {
                    case 'txtlink':
                        let targetEl;
                        let targetGap = 6;
                        $('.cursor-inner').addClass('on-hover-md')
                        if ($('[data-cursor]:hover').attr('data-cursor-txtLink') == 'parent') {
                            targetEl = $('[data-cursor]:hover').parent()
                        } else if ($('[data-cursor]:hover').attr('data-cursor-txtlink') == 'child') {
                            targetEl = $('[data-cursor]:hover').find('[data-cursor-txtlink-child]')
                            if (targetEl.attr('data-cursor-txtlink-child') == 'md') {
                                targetGap = 2;
                            }
                        } else {
                            targetEl = $('[data-cursor]:hover')
                        }

                        if ($('[data-cursor]:hover').attr('data-cursor-txtlink-gap')) {
                            targetGap = $('[data-cursor]:hover').attr('data-cursor-txtlink-gap')
                        }
                        let getLineheight
                        if (targetEl.find('.txt').eq(0).length) {
                            getLineheight = parseInt(targetEl.find('.txt').eq(0).css('line-height'))
                        } else {
                            getLineheight = parseInt(targetEl.css('line-height'))
                        }
                        let padding = parseInt(targetEl.css('padding-top'))

                        this.targetX = targetEl.get(0).getBoundingClientRect().left - parseRem(targetGap) - $('.cursor-inner').width() / 2;

                        this.targetY = targetEl.get(0).getBoundingClientRect().top + getLineheight / 2 + parseRem(padding) * .85 - parseRem(1);
                        break;
                    case 'btn-outline':
                        $('.cursor-inner').addClass('on-hide')
                        let targetBtn = $('[data-cursor]:hover');
                        let btnDotX, btnDotY;
                        if (!gotBtnSize) {
                            let targetRect = targetBtn.get(0).getBoundingClientRect();
                            gsap.set('html', {
                                '--cursor-width': `${targetRect.width}px`,
                                '--cursor-height': `${targetRect.height}px`
                            });
                            btnDotX = (pointerCurr().x - targetBtn.get(0).getBoundingClientRect().left)
                            btnDotY = (pointerCurr().y - targetBtn.get(0).getBoundingClientRect().top)
                            xSetter('[data-cursor]:hover .btn-dot')(lerp(btnDotX, (pointerCurr().x - targetBtn.get(0).getBoundingClientRect().left)), .09)
                            ySetter('[data-cursor]:hover .btn-dot')(lerp(btnDotY, (pointerCurr().y - targetBtn.get(0).getBoundingClientRect().top)), .09)
                            gotBtnSize = true
                        } else {
                            btnDotX = xGetter('[data-cursor]:hover .btn-dot')
                            btnDotY = yGetter('[data-cursor]:hover .btn-dot')
                            xSetter('[data-cursor]:hover .btn-dot')(lerp(btnDotX, (pointerCurr().x - targetBtn.get(0).getBoundingClientRect().left)), .09)
                            ySetter('[data-cursor]:hover .btn-dot')(lerp(btnDotY, (pointerCurr().y - targetBtn.get(0).getBoundingClientRect().top)), .09)
                        }
                        break;
                    case 'hide':
                        $('.cursor-inner').addClass('on-hide')
                        let targetElHide = $('[data-cursor]:hover');
                        // this.targetX = targetElHide.get(0).getBoundingClientRect().left + targetElHide.width() / 2;
                        // this.targetY = targetElHide.get(0).getBoundingClientRect().top + targetElHide.height() / 2;
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
            $('.cursor-inner').removeClass('on-hover-md on-hide')
        }
    }
    let cursor = new Cursor;
    class Header {
        constructor() {
            this.header = $('.header');
            this.headerHeight = this.header.height();
        }
        setup(){
            if(viewport.w < 992){
                $('.home-header-toggle').off('click').on('click', function(){
                    $('.header').toggleClass('active');
                })
                $('.header-menu-item.has-sub-menu').off('click').on('click', function(e){
                    e.preventDefault();
                    if($(this).closest('.header-menu-item-wrap').hasClass('active')){
                        $('.header-menu-item-wrap').removeClass('active')
                        $(this).next('.header-menu-drop').slideUp();
                        console.log('up')
                    }
                    else{
                        $('.header-menu-drop').slideUp();
                        $('.header-menu-item-wrap').removeClass('active')
                        $(this).closest('.header-menu-item-wrap').addClass('active')
                        $(this).next('.header-menu-drop').slideDown();
                        console.log('down')
                    }

                })

            }
            else {
                $('.header-menu-item.has-sub-menu').off('click').on('click', function(e){
                    e.preventDefault();
                    console.log('check' +$(this).hasClass('active'))
                    if(!$(this).hasClass('active')){
                        $('.header-menu-item.has-sub-menu').removeClass('active')
                        $(this).addClass('active');
                    }
                    else{
                        $(this).removeClass('active');
                    }
                })
                $(document).on('click', function(e){
                    if (!$(e.target).closest('.header-menu-drop, .header-menu-item').length) {
                        $('.header-menu-item.has-sub-menu').removeClass('active')
                    }
                })
            }

        }
        updateOnScroll(lenis) {
            if (lenis.scroll > $(".header").height() * 1.5) {
            if (lenis.direction >= 1) {
                $(".header").addClass("on-hide");
                $('.header-menu-sub-wrap').removeClass('active');
                $('.header-menu-sub-wrap').slideUp()
            } else {
                $(".header").removeClass("on-hide");
            }
            $(".header").addClass("on-scroll");

            } else {
            $(".header").removeClass("on-scroll");
            $(".header").removeClass("on-hide");
            }
            let elArr = Array.from(document.querySelectorAll('[data-section="dark"]'));
            if (elArr.some(function(el) {return isInHeaderCheck(el)})) {
                $('.header').addClass('on-dark');
            } else {
                $('.header').removeClass('on-dark');
            }
        }
    }
    let header = new Header();
    header.updateOnScroll(lenis);
    lenis.on('scroll', (inst) => {
        header.updateOnScroll(inst);
    })
    // Animation
    class HomeHero {
        constructor() {
            this.tl;
            this.tlFade;
        }
        setup() {
            this.tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-hero',
                    start: 'top top-=10%',
                    endTrigger: '.home-hero-content',
                    end: 'bottom top',
                    scrub: true,
                }
            })
            this.tl
            .to('.home-hero-ph-cage.mid-left', {rotation: '65deg'})
            .to('.home-hero-ph-cage.mid-right', {rotation: '-65deg'}, 0)
            requestAnimationFrame(this.updateGrind.bind(this))
            const title = new SplitType('.home-hero-title', {types: 'lines, words', lineClass: 'bp-line heading-line'})
            const sub = new SplitType('.home-hero-sub', {types: 'lines, words', lineClass: 'bp-line'})
            this.tlFadeHead = new gsap.timeline({
                paused: true,
                onComplete : () => {
                    // title.revert();
                    sub.revert();
                }
            })
            this.tlFadeHead
                .set('.home-hero-ph-cage', {autoAlpha : 0, duration: 0,})
                .from(title.words, {autoAlpha: 0, yPercent: 100, stagger: .04, duration: .8, onComplete : () => {
                }})
                .from(sub.words, {autoAlpha: 0, yPercent: 80, stagger: .02, duration: .8}, '<=.4')
            const allSubItems = $('.home-hero-sub-item');
            allSubItems.each((idx, item) => {
                let titleItem = new SplitType($(item).find('.home-hero-sub-item-title'),{types: 'lines, words', lineClass: 'bp-line'});
                let subItem = new SplitType($(item).find('.home-hero-sub-item-body'), {types: 'lines, words', lineClass: 'bp-line'});
                this.tlFadeHead
                    .from(titleItem.words, {autoAlpha: 0, yPercent: 80, stagger: .02, duration: .5, onComplete: () => {titleItem.revert()}},  idx == 0 ?'<=.1': `<=${idx*.05}`)
                    .from(subItem.words, {autoAlpha: 0, yPercent: 80, stagger: .01, duration: .3, onComplete: () => {}}, '<=.2')
            })
        }
        updateGrind() {
            $('.home-hero-mid-grind-svg path').css('stroke-dashoffset', `${parseFloat($('.home-hero-mid-grind-svg path').css('stroke-dashoffset')) + .6}px`)
            requestAnimationFrame(this.updateGrind.bind(this))
        }
        play(){
            this.tlFadeHead.play();
            console.log('homehero play')
        }
    }
    let homeHero = new HomeHero();

    // module aliases
    var Engine = Matter.Engine,
    Render = Matter.Render,
    Events = Matter.Events,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Svg = Matter.Svg,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Composite = Matter.Composite;
    Matter.Common.setDecomp(decomp)
    let valveMaster = false;
    let particleTexture = 'https://cdn.prod.website-files.com/66e944273b06600356c5243e/6708b0ed0938aec44f482e67_particle-sm.svg';
    let particleTextureBgBlack = 'https://cdn.prod.website-files.com/66e944273b06600356c5243e/67511d94e08008ee97f6b623_icon-canvas-bgblack.svg';

    class HomeHeroCanvas {
        constructor() {
            this.bottles = [
                {
                    type: 'svg',
                    url: 'https://cdn.prod.website-files.com/66e944273b06600356c5243e/670e21fbb8ced97b5c004faa_bottle-5.svg',
                    quantity: 1,
                    width: 72,
                    height: 130
                },
                {
                    type: 'svg',
                    url: 'https://cdn.prod.website-files.com/66e944273b06600356c5243e/670e21fb4d33c13aeb323fc1_drinking-bottle-2.svg',
                    quantity: 2,
                    width: 72,
                    height: 152
                },
                {
                    type: 'svg',
                    url: 'https://cdn.prod.website-files.com/66e944273b06600356c5243e/670e21fbd11a2cf8c70a88ff_energy-drink-3.svg',
                    quantity: 1,
                    width: 71,
                    height: 62
                },
                {
                    type: 'svg',
                    url: 'https://cdn.prod.website-files.com/66e944273b06600356c5243e/670e21fb1fefd779d05f49ac_bottle-4.svg',
                    quantity: 1,
                    width: 84,
                    height: 201
                },
                {
                    type: 'svg',
                    url: 'https://cdn.prod.website-files.com/66e944273b06600356c5243e/670e21fbe2d317dba4081dcc_water-bottle-2.svg',
                    quantity: 1,
                    width: 78,
                    height: 202
                },
                {
                    type: 'svg',
                    url: 'https://cdn.prod.website-files.com/66e944273b06600356c5243e/670e21fb74e43240fd96c312_fitness-shaker-3.svg',
                    quantity: 1,
                    width: 52,
                    height: 108
                },
                {
                    type: 'svg',
                    url: 'https://cdn.prod.website-files.com/66e944273b06600356c5243e/670e21fb9b89cec3809f14ae_mayo-3.svg',
                    quantity: 2,
                    width: 67,
                    height: 131
                },
                {
                    type: 'svg',
                    url: 'https://cdn.prod.website-files.com/66e944273b06600356c5243e/670517b4d96a1e643a699de0_bottle%202.svg',
                    quantity: 1,
                    width: 72,
                    height: 130
                },
                {
                    type: 'svg',
                    url: 'https://cdn.prod.website-files.com/66e944273b06600356c5243e/670e21fbcb6fcf7da8a449d0_medication-bottle-1.svg',
                    quantity: 1,
                    width: 82,
                    height: 127
                },
                {
                    type: 'svg',
                    url: 'https://cdn.prod.website-files.com/66e944273b06600356c5243e/6705f68c5aee7ca91401c373_energy-drink%203.svg',
                    quantity: 1,
                    width: 68,
                    height: 93
                },
                {
                    type: 'circle',
                },
                {
                    type: 'rect',
                },
                {
                    type: 'circle',
                },
                {
                    type: 'circle',
                },
                {
                    type: 'rect',
                },
                {
                    type: 'circle',
                },
                {
                    type: 'rect',
                },
                {
                    type: 'circle',
                },
            ]
            this.dynamicBottles = []
            this.dynamicParticles = []
            this.particlesLimit = 1000;
            this.statics = []
            this.loopRandom;
            this.loopRandomParticle;
            this.sensor;
            this.canvas = '#plastic';
            this.render;
            this.engine;
            this.canvas2 = '#powder';
            this.render2;
            this.engine2;
            this.mouse;
            this.mouseConstraint;
            this.tl;
            this.requestId;
        }
        init() {
            this.setup()
            this.setup2()
            this.run()
        }
        setup() {
            this.engine = Engine.create({
                gravity: {
                    scale: 0.001,
                },
            });

            let renderOptions = {
                width: document.querySelector(this.canvas).clientWidth,
                height: document.querySelector(this.canvas).clientHeight,
                wireframes: false,
                background: 'transparent',
                pixelRatio: 1,
                showStats: false,
                showPerformance: false,
            }
            this.render = Render.create({
                canvas: document.querySelector(this.canvas),
                engine: this.engine,
                options: renderOptions
            });

            function createBoxes() {
                this.bottles.forEach((bottle, idx) => {
                    if (this.dynamicBottles.length > this.bottles.length - 1) {
                        return;
                    }
                    Composite.add(this.engine.world, this.createSingleBox.bind(this)(bottle));
                })

            }
            function createRandomBox(limit) {
                if (this.dynamicBottles.length > limit - 1) {
                    return;
                }
                let bottle = this.bottles[Math.floor(Math.random() * this.bottles.length)]
                Composite.add(this.engine.world, this.createSingleBox.bind(this)(bottle));
            }

            function createStatic() {
                $('.home-hero-ph-cage').each((idx, el) => {
                    let rect = $(el)
                    let obj = Bodies.rectangle(rect.offset().left + 1 + rect.width()/2, rect.offset().top + 1 + rect.height()/2, rect.width(), rect.height(), {
                        isStatic: true,
                        chamfer: {radius: rect.height()/2},
                        render: {
                            fillStyle: '#EEE2D4',
                            strokeStyle: '#3D3D3D',
                            lineWidth: parseRem(4),
                        },
                    });

                    if (idx == 1) {
                        Body.setCentre(obj, {x: rect.offset().left + 1 + rect.height()/2, y: rect.offset().top + 1 + rect.height()/2})
                    } else if (idx == 2) {
                        Body.setCentre(obj, {x: rect.offset().left + 1 + rect.width() - rect.height()/2, y: rect.offset().top + 1 + rect.height()/2})
                    }
                    el.style.opacity = 0
                    this.statics.push(obj)
                })
                Composite.add(this.engine.world, this.statics);

                this.sensor = Bodies.rectangle(this.render.options.width/2, this.render.options.height - parseRem(190), parseRem(600), parseRem(50), {
                    isSensor: true,
                    isStatic: true,
                    render: {
                        visible: false
                    }
                });
                Composite.add(this.engine.world, this.sensor);

                Events.on(this.engine, 'collisionStart', this.sensorFunc.bind(this));
            }

            function createMouse() {
                $('.home-hero-canvas-top').css('pointer-events', 'auto')
                this.mouse = Mouse.create(this.render.canvas),
                this.mouseConstraint = MouseConstraint.create(this.engine, {
                    mouse: this.mouse,
                    constraint: {
                        stiffness: 0.4,
                        render: {
                            visible: false
                        }
                    }
                });
                Composite.add(this.engine.world, this.mouseConstraint);
                this.render.mouse = this.mouse;
            }
            function initWorld() {
                createMouse.bind(this)()
                createStatic.bind(this)()
                createBoxes.bind(this)()
                this.loopRandom = setInterval(createRandomBox.bind(this, this.bottles.length), 500)
            }
            function resetWorld() {
                //clearInterval(loopRandom)
                Composite.clear(this.engine.world, true);
                this.dynamicBottles = []
            }
            function reInitWorld() {
                createMouse.bind(this)()
                createBoxes.bind(this)()
            }
            let rotVals = {
                left: 65,
                right: -65
            }
            let isReset = false;
            initWorld.bind(this)()
            this.tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-hero',
                    start: 'top top-=10%',
                    endTrigger: '.home-hero-canvas-top',
                    end: 'bottom top',
                    scrub: true,
                    onLeaveBack: () => {
                        console.log('leaveback')
                        if (isReset) {
                            reInitWorld.bind(this)()
                            isReset = false;
                        }
                    },
                    onLeave: () => {
                        isReset = true;
                        console.log('reset')
                        resetWorld.bind(this)()
                    }
                }
            })
            this.tl
            .from(rotVals, {left: 0, right: 0, onUpdate: () => {
                Body.setAngle(this.statics[1], degToRad(rotVals.left))
                Body.setAngle(this.statics[2], degToRad(rotVals.right))
            }})
        }
        sensorFunc = (e) => {
            let pairs = e.pairs;
            for (let i = 0, j = pairs.length; i != j; ++i) {
                let pair = pairs[i];

                if (pair.bodyB === this.sensor || pair.bodyA === this.sensor) {
                    // }
                    this.createChunkParticle.bind(this)()
                }
            }
        }
        setup2() {
            function updateHtml() {
                $('.home-trans-bg-mid').css({
                    'width': '100%',
                    'margin-bottom': viewport.w > 991 ? `-${$('.home-product-title-wrap').outerHeight(true)}px` : `-${$('.home-product').css('padding-top')}`,
                })
            }
            updateHtml()
            this.engine2 = Engine.create({
                gravity: {
                    scale: 0.0002,
                },
            });
            this.render2 = Render.create({
                canvas: document.querySelector(this.canvas2),
                engine: this.engine2,
                options: {
                    width: document.querySelector(this.canvas2).clientWidth,
                    height: document.querySelector(this.canvas2).clientHeight,
                    wireframes: false,
                    background: 'transparent',
                    showStats: false,
                    showPerformance: false,
                }
            });

            let statics = []
            function createStatic(isVisible = false) {
                const options = (isChamfer = false, rect = null) => {
                    return {
                        isStatic: true,
                        chamfer: {radius: isChamfer ? [rect.height() * .4 ,rect.height() * .6, 0, rect.height() * .6] : 0},
                        render: {
                            visible: isVisible
                        }
                    }
                }
                function createSideSvg(svgEl) {
                    let dirInline = svgEl.attr('class').includes('left') ? -1 : 1;
                    let dirBlock = svgEl.attr('class').includes('top') ? -1 : 1;

                    let vertices = Svg.pathToVertices(svgEl.find('svg path')[0], 15);
                    let terrain = Bodies.fromVertices(0, 0, vertices,
                        options()
                    , true);

                    let dimensions = {
                        x: terrain.bounds.max.x - terrain.bounds.min.x,
                        y: terrain.bounds.max.y - terrain.bounds.min.y
                    }
                    let scaleFactor = {
                        x: svgEl.width() / dimensions.x,
                        y: svgEl.height() / dimensions.y
                    } ;
                    let offsetFactor = {
                        x: (dimensions.x * (dirInline == -1 ? 44 : 62) / 106) * scaleFactor.x,
                        y: (dimensions.y * (dirInline == -1 ? 174 : 166) / 348) * scaleFactor.y
                    }
                    let position = {
                        x: offsetFactor.x + svgEl.offset().left - $('.home-trans-bg-mid').offset().left,
                        y: offsetFactor.y + svgEl.offset().top - $('.home-trans-bg-mid').offset().top,
                    }

                    Body.setPosition(terrain, {x: position.x, y: position.y})
                    Body.scale(terrain, scaleFactor.x, scaleFactor.y)
                    statics.push(terrain)
                }
                function createSvg(svgEl) {
                    let dirInline = svgEl.attr('class').includes('left') ? -1 : 1;
                    let dirBlock = svgEl.attr('class').includes('top') ? -1 : 1;

                    let vertices = Svg.pathToVertices(svgEl.find('svg path')[0], 15);
                    let terrain = Bodies.fromVertices(0, 0, vertices,
                        options()
                    , true);

                    let dimensions = {
                        x: terrain.bounds.max.x - terrain.bounds.min.x,
                        y: terrain.bounds.max.y - terrain.bounds.min.y
                    }
                    let scaleFactor = {
                        x: svgEl.width() / dimensions.x,
                        y: svgEl.height() / dimensions.y
                    } ;
                    let offsetFactor = {
                        x: (dimensions.x * (dirInline == -1 ? 154 : 177) / 330) * scaleFactor.x,
                        y: (dimensions.y * (dirBlock == -1 ? 79 : 162) / 240) * scaleFactor.y
                    }
                    let position = {
                        x: offsetFactor.x + svgEl.offset().left - $('.home-trans-bg-mid').offset().left,
                        y: offsetFactor.y + svgEl.offset().top - $('.home-trans-bg-mid').offset().top,
                    }

                    Body.setPosition(terrain, {x: position.x, y: position.y})
                    Body.scale(terrain, scaleFactor.x, scaleFactor.y)
                    statics.push(terrain)
                }
                $('.home-trans-bg-svg').each((idx, el) => {
                    createSvg($(el))
                })
                if(viewport.w > 991){
                    $('.home-transform-sub-item-ic').each((idx, el) => {
                        let rect = $(el).find('.home-transform-sub-item-ic-inner')
                        let obj = Bodies.rectangle(rect.offset().left - $(this.render2.canvas).offset().left + rect.width() / 2, rect.offset().top - $(this.render2.canvas).offset().top + rect.height() / 2, rect.width() * 1.2, rect.height() * 1.2,
                            options(true, rect)
                        );
                        Body.setAngle(obj, degToRad(45))
                        statics.push(obj)

                        let leftSvg = $(el).find('.home-trans-sub-item-ic-svg-left')
                        let objleft = Bodies.rectangle(leftSvg.offset().left - $(this.render2.canvas).offset().left + leftSvg.width()/2, leftSvg.offset().top - $(this.render2.canvas).offset().top + leftSvg.height() * (3 + (idx != 2 ? .8 : .1)) / 3, leftSvg.width(), leftSvg.height() * (idx != 2 ? 2 : .5) / 3,
                            options()
                        );
                        statics.push(objleft)

                        let rightSvg = $(el).find('.home-trans-sub-item-ic-svg-right')
                        let objright = Bodies.rectangle(rightSvg.offset().left - $(this.render2.canvas).offset().left + rightSvg.width()/2, rightSvg.offset().top - $(this.render2.canvas).offset().top + rightSvg.height() * (3 + (idx != 2 ? .8 : .1)) / 3, rightSvg.width(), rightSvg.height() * (idx != 2 ? 2 : .5) / 3,
                            options()
                        );
                        statics.push(objright)

                        createSideSvg(leftSvg)
                        createSideSvg(rightSvg)

                        if (idx == 0) {
                            let objColLeft = Bodies.rectangle(leftSvg.offset().left - $(this.render2.canvas).offset().left + leftSvg.width()/2, leftSvg.offset().top - $(this.render2.canvas).offset().top - leftSvg.height() * .68, leftSvg.width(), leftSvg.height() * 1.35,
                                options()
                            );
                            statics.push(objColLeft)

                            let objColRight = Bodies.rectangle(rightSvg.offset().left - $(this.render2.canvas).offset().left + rightSvg.width()/2, rightSvg.offset().top - $(this.render2.canvas).offset().top - rightSvg.height() * .68, rightSvg.width(), rightSvg.height() * 1.35,
                                options()
                            );
                            statics.push(objColRight)
                        }
                    })
                }
                else {
                    let midLineRight = $('.home-transform-line-vertical-r');
                    let midLineleft = $('.home-transform-line-vertical-l');
                    let midLinebottom = $('.home-product-line-canvas');
                    let canvasOffset = $(this.render2.canvas).offset();

                    let objright = Bodies.rectangle(
                        midLineRight.offset().left - canvasOffset.left + midLineRight.width() / 2,
                        midLineRight.offset().top - canvasOffset.top + midLineRight.height() / 2,
                        midLineRight.width(),
                        midLineRight.height(),
                        options()
                    );

                    statics.push(objright);
                    let objleft = Bodies.rectangle(
                        midLineleft.offset().left - canvasOffset.left + midLineleft.width() / 2,
                        midLineleft.offset().top - canvasOffset.top + midLineleft.height() / 2,
                        midLineleft.width(),
                        midLineleft.height(),
                        options()
                    );
                    statics.push(objleft);
                    let objBottom = Bodies.rectangle(
                        midLinebottom.offset().left - canvasOffset.left + midLinebottom.width() / 2,
                        midLinebottom.offset().top - canvasOffset.top + midLinebottom.height() / 2,
                        midLinebottom.width(),
                        midLinebottom.height(),
                        options()
                    );
                    statics.push(objBottom);
                }
                let objBottom = Bodies.rectangle(this.render2.options.width / 2, this.render2.options.height + parseRem(1), this.render2.options.width / 2, parseRem(2),
                    options()
                )
                statics.push(objBottom)

                Composite.add(this.engine2.world, statics);
            }
            createStatic.bind(this)()
        }
        createSingleBox(bottle) {
            let obj
            if (bottle.type == 'circle') {
                obj = Bodies.circle((Math.random() * (this.render.options.width / 2)) + this.render.options.width / 4, Math.random() * -100, parseRem(16 + Math.random() * 16), {
                    frictionAir: .003,
                    render: {
                        fillStyle: '#F0E8D8',
                        strokeStyle: '#3D3D3D',
                        lineWidth: parseRem(4),
                    },
                });
            } else if (bottle.type == 'rect') {
                let randomSize = parseRem(32 + Math.random() * 16)
                obj = Bodies.rectangle((Math.random() * (this.render.options.width / 2)) + this.render.options.width / 4, Math.random() * -100, randomSize, randomSize, {
                    frictionAir: .003,
                    chamfer: {radius: parseRem(10)},
                    render: {
                        fillStyle: '#F0E8D8',
                        strokeStyle: '#3D3D3D',
                        lineWidth: parseRem(4),
                    },
                });
            } else if (bottle.type == 'svg') {
                let width = bottle.width;
                let height = bottle.height;
                let svgSize = viewport.w > 767 ? {
                    width: parseRem(width),
                    height: parseRem(height)
                }: {
                    width: parseRem(width/3*2),
                    height: parseRem(height/3*2)
                }
                let svgScale = svgSize.width / width;

                for (let i = 0; i < bottle.quantity ; i++) {
                    obj = Bodies.rectangle((Math.random() * (this.render.options.width / 2)) + this.render.options.width / 4, Math.random() * (-svgSize.height * 2) - 100, svgSize.width, svgSize.height, {
                        chamfer: {radius: width / 3},
                        friction: .2,
                        frictionAir: .003,
                        render: {
                            sprite: {
                                texture: bottle.url,
                                xScale: svgScale,
                                yScale: svgScale
                            }
                        }
                    });
                    Body.setAngle(obj, Math.random() * Math.PI * 2)
                    Body.setAngularVelocity(obj, .06)
                }
            }
            this.dynamicBottles.push(obj);
            return obj;
        }
        createChunkParticle() {
            for (let i = 0; i < 20 + 30 * Math.random(); i++) {
                this.createSingleParticle.bind(this)()
            }
        }
        createSingleParticle() {
            if (this.dynamicParticles.length < this.particlesLimit) {
                let posX = $('.home-hero-mid-grind').offset().left - $('.home-trans-bg-mid').offset().left + parseRem(40) + (($('.home-hero-mid-grind').width() - parseRem(70)) * Math.random());
                let posY = parseRem(35)
                let sizeScale = parseRem(2) / 2;
                let particle = Bodies.circle(posX, posY, Math.ceil(parseRem(3)), {
                    render: {
                        sprite: {
                            texture: particleTexture,
                            xScale: sizeScale,
                            yScale: sizeScale
                        }
                    },
                    friction: 0,
                    frictionAir: .004,
                    restitution: 0.6
                });
                Body.setVelocity(particle, {x: Math.random() * 2 - 1, y: Math.random() * 2 - 1})
                this.dynamicParticles.push(particle);
                Composite.add(this.engine2.world, particle);
            }
        }
        draw() {
            if (isInViewport('.home-hero-canvas-top') || isInViewport('.home-trans-bg-mid')) {
                Engine.update(this.engine, delta);
                for (let i = 0; i < this.dynamicBottles.length; i++) {
                    if (this.isOffScreen(this.dynamicBottles[i], this.render)) {
                        this.removefromWorld(this.dynamicBottles[i], this.engine)
                        this.dynamicBottles.splice(i, 1);
                        i--;
                    }
                }
                Engine.update(this.engine2, delta);
                for (let i = 0; i < this.dynamicParticles.length; i++) {
                    if (this.isOffScreen(this.dynamicParticles[i], this.render2) || this.isOffSide(this.dynamicParticles[i]) || i >= this.particlesLimit) {
                        this.removefromWorld(this.dynamicParticles[i], this.engine2)
                        this.dynamicParticles.splice(i, 1);
                        i--;
                    }
                }
            }
            this.requestId = requestAnimationFrame(this.draw.bind(this))
        }
        run() {
            Render.run(this.render);
            Render.run(this.render2);
            setTimeout(() => {
                this.requestId = requestAnimationFrame(this.draw.bind(this))
            }, 400);
        }
        isOffScreen(obj, render) {
            let pos = obj.position;
            return pos.y > render.options.height + 100 || pos.x < -100 || pos.x > render.options.width + 100;
        }
        isOffSide(obj) {
            let pos = obj.position;
            let result = (
                pos.x < $('.home-transform-sub-item-ic').eq(0).offset().left - $('.home-trans-bg-mid').offset().left ||
                pos.x > $('.home-transform-sub-item-ic').eq(0).offset().left - $('.home-trans-bg-mid').offset().left + $('.home-transform-sub-item-ic').eq(0).width()) &&
                pos.y > $('.home-transform-sub-item-ic').eq(0).offset().top - $('.home-trans-bg-mid').offset().top && pos.y < $('.home-trans-bg-mid').height() - $('.home-product-title-wrap').outerHeight(true)
            if(viewport.w < 992){
                result = false
            }
            return result
        }
        removefromWorld(obj, engine) {
            Composite.remove(engine.world, obj)
        }
        destroy() {
            cancelAnimationFrame(this.requestId)
            clearInterval(this.loopRandom)
            clearInterval(this.loopRandomParticle)
            this.dynamicBottles = []
            this.dynamicParticles = []
            this.statics = []
            this.sensor = null
            Events.off(this.engine, 'collisionStart', this.sensorFunc.bind(this));
            Render.stop(this.render);
            Composite.clear(this.engine.world, false, [true]);
            Engine.clear(this.engine);
            this.render.canvas.remove();
            this.render.canvas = null;
            this.render.context = null;
            this.render.textures = {};

            Render.stop(this.render2);
            Composite.clear(this.engine2.world, false, [true]);
            Engine.clear(this.engine2);
            this.render2.canvas.remove();
            this.render2.canvas = null;
            this.render2.context = null;
            this.render2.textures = {};
            this.tl.kill()
        }
    }
    let homeHeroCanvas = new HomeHeroCanvas();
    class HomeTransform {
        constructor() {
            this.tlTrigger;
            this.allItems;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-transform',
                    start:  'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.setup();
                    }
                }
            })
        }
        setup() {
            this.allItems= $('.home-transform-sub-item');
            const circle = $('.home-trans-prog-bg .process-inner');
            const r = parseInt(circle.attr('cx'));
            const circumference = 2 * Math.PI * r;
            circle.css('stroke-dasharray', circumference);
            gsap.fromTo(circle,{ strokeDashoffset: circumference }, {  strokeDashoffset: 0,
                scrollTrigger: {
                    trigger: '.home-transform',
                    start: `top center`,
                    end: "bottom center",
                    scrub: true,
                    ease: 'none',
                }}
            )
            let elementCount = $('.home-trans-prog-count-item').eq(0).clone();
            $('.home-trans-prog-count').html('');
            let quanlityItem = this.allItems.length;
            $('.home-trans-prog-total').text(quanlityItem)
            for(let i = 0; i <= quanlityItem; i++){
                let elementNew = elementCount.clone().text(i);
                $('.home-trans-prog-count').append(elementNew);
            }
            const title = new SplitType('.home-transform-title', {types: 'lines, words', lineClass: 'bp-line heading-line'})
            const sub = new SplitType('.home-transform-sub', {types: 'lines, words', lineClass: 'bp-line'})
            let tlFadeHead = new gsap.timeline({
                scrollTrigger : {
                    trigger: '.home-transform-title',
                    start: 'top top+=70%',
                    once: true,
                },
                onComplete: () => {
                    // title.revert();
                    sub.revert();
                }
            })
            tlFadeHead
                .from(title.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .8})
                .from(sub.words, {autoAlpha: 0, yPercent: 100, stagger: .01, duration: .6}, '<=0')
            let allItemIc = $('.home-transform-sub-item-ic-inner');
            allItemIc.each((idx, item) => {
                let tlFadeItemIc = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: 'top bottom',
                        once: true
                    }
                })
                tlFadeItemIc
                    .from($(item), {autoAlpha: 0, yPercent: 30, duration:.6, clearProps: 'all'})
            })
            this.allItems.each((idx, item) => {
                let tlItem = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: 'top center',
                        end: 'bottom center',
                        onUpdate: () => {
                            $('.home-trans-prog-count').css('transform', `translateY(${-(idx+1)/(quanlityItem + 1) * 100}%)`)
                        },
                    }
                })
                replaceHyphen($(item).find('.home-transform-sub-item-body'))
                const titleItem = new SplitType($(item).find('.home-transform-sub-item-title'), {types: 'lines, words', lineClass: 'bp-line'})
                const subItem = new SplitType($(item).find('.home-transform-sub-item-body'), {types: 'lines, words', lineClass: 'bp-line'})
                let tlFadeItem = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: 'top top+=75%',
                        end: 'bottom top'
                    },
                    onComplete: () => {
                        titleItem.revert();
                        subItem.revert();
                    }
                })
                tlFadeItem
                    .from(titleItem.words, {autoAlpha: 0, yPercent: 60, stagger: .015, duration:.6})
                    .from(subItem.words, {autoAlpha: 0, yPercent: 70, stagger: .01, duration:.3}, '<=.2')
            })

        }
    }
    let homeTransform = new HomeTransform();
    class HomeProduct {
        constructor() {
            this.tlTrigger;
            this.allItems;
            this.tlFadeHead;
            this.requestId;
        }
        setTrigger() {

            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-product',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.setup()
                    },
                }
            })
        }
        setup() {
            $('.home-product-cate-cms').each((idx, el) => {
                $(el).find('.home-product-cate-item').each((idxProduct, product) => {
                    let number = parseInt($(product).find('.home-product-item-number').text());
                    if ( number + 1 <= 10) {
                        $(product).find('.home-product-item-number').text(`0${number}`)
                    }
                })
            })
            replaceHyphen('.home-product-sub');
            const title = new SplitType('.home-product-title', {types: 'lines, words', lineClass: 'bp-line heading-line'})
            const sub = new SplitType('.home-product-sub', {types: 'lines, words', lineClass: 'bp-line'})
            this.tlFadeHead = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-product',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true,
                },
                onComplete: () => {
                    // title.revert();
                    sub.revert();
                }
            })
            this.tlFadeHead
                .from('.home-product-label', {autoAlpha: 0, yPercent: 100, duration: .8, clearProps: 'all'})
                .from(title.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .8}, '<=.2')
                .from(sub.words, {autoAlpha: 0, yPercent: 80, stagger: .02, duration: .4}, viewport.w > 767 ? '<=0' : '<=.2')

            let tlFadeLine = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-product-line-canvas',
                    start: 'top bottom',
                    once: true,
                },
            })
            tlFadeLine
                .from('.home-product-line-canvas', {autoAlpha: 0, scaleX: 0, transformOrigin: 'left', duration: .8, clearProps: 'all'}, '<=.2')
            let tlItemLine = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-product-list',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true,
                }
            })
            gsap.set('.home-product-item .line-vertical', {scaleY: 0, transformOrigin: 'top'});
            gsap.set('.home-product-item:nth-child(1) .line', {scaleX: 0, transformOrigin: 'right'});
            gsap.set('.home-product-item:nth-child(2) .line', {scaleX: 0, transformOrigin: 'left'});
            tlItemLine
                .to('.home-product-item .line-vertical', {scaleY: 1, duration: 1, clearProps: 'all'})
                .to('.home-product-item .line', {scaleX: 1, duration: 1, clearProps: 'all'}, '<= 0')
            $('.home-product-item').each((idx, item) => {
                let titleItem = new SplitType($(item).find('.home-product-item-title'), {types: 'lines, words', lineClass: 'bp-line heading-line'});
                let subItem = new SplitType($(item).find('.home-product-item-sub'), {types: 'lines, words', lineClass: 'bp-line '});
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60})
                gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80})
                gsap.set($(item).find('.home-product-item-img-wrap'), {autoAlpha: 0, clipPath: 'circle(20% at 50% 50%)'});
                if(viewport.w < 992 ){
                    gsap.set($(item).find('.home-product-item-link'), {autoAlpha: 0, y: 10})
                }
                let tlItem = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                        once: true
                    }
                })
                tlItem
                    .to(titleItem.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
                    .to(subItem.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.2')
                if(viewport.w < 992){
                    tlItem
                        .to($(item).find('.home-product-item-link'), {autoAlpha: 1, y: 0, duration: .6, clearProps: 'all'}, '<=.2')
                }
                tlItem
                    .to($(item).find('.home-product-item-img-wrap'), {autoAlpha: 1, clipPath: 'circle(50% at 50% 50%)', duration: .8, clearProps: 'all', onComplete: () => {
                        subItem.revert();
                    }}, '<=.2')
            })
            let tlAppliHead = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-product-appli',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true,
                },
                onComplete: () => {

                }
            })
            tlAppliHead
                .from('.home-product-appli-title', {autoAlpha: 0, yPercent: 60, duration: .4}, '<=.1')
            let allAppliItem = $('.home-product-appli-item');
            allAppliItem.each((idx, item) => {
                replaceHyphen($(item).find('.home-product-appli-item-desc'))
                let titleItem = new SplitType($(item).find('.home-product-appli-item-title'), {types: 'lines, words', lineClass: 'bp-line'});
                let subItem = new SplitType($(item).find('.home-product-appli-item-desc'), {types: 'lines, words', lineClass: 'bp-line'});
                let linkItem = new SplitType($(item).find('.home-product-appli-item-link .txt'), {types: 'lines, words', lineClass: 'bp-line'});
                let tlAppliItem = new gsap.timeline({
                    scrollTrigger : {
                        trigger: item,
                        start: viewport.w > 767 ? 'top top+=65%' : 'top top+=35%',
                        once: true,
                    },
                    onComplete: () => {
                        titleItem.revert();
                        subItem.revert();
                        linkItem.revert();
                    }
                })
                tlAppliItem
                        .from($(item), {autoAlpha: 0, y: 60,  duration: .6, clearProps: 'all'})
                        .from($(item).find('.home-product-appli-item-img'), {autoAlpha: 0, scale: .6, duration: .6, clearProps: 'all'}, '<=0')
                        .from(titleItem.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .6}, '<=.2')
                        .from(subItem.words, {autoAlpha: 0, yPercent: 80, stagger: .02, duration: .4}, '<=.2')
                        .from(linkItem.words, {autoAlpha: 0, yPercent: 80, stagger: .02, duration: .4}, '<=.4')
            })
            this.interact();
        }
        interact() {
            if(viewport.w > 991){
                $('.home-product-list').hover(
                    function () {
                        $('.home-product-item-ar-inner').addClass('active');
                    },
                    function () {
                        $('.home-product-item-ar-inner').removeClass('active');
                    }
                );
                const mouseTransform = () => {
                    this.mouseX = pointerCurr().x;
                    this.mouseY = pointerCurr().y;
                    this.tarCurrX = xGetter('.home-product-item-ar');
                    this.tarCurrY = yGetter('.home-product-item-ar');
                    xSetter('.home-product-item-ar')(lerp(this.tarCurrX , this.mouseX - $('.home-product-item-ar-inner').width()/2, 0.1));
                    ySetter('.home-product-item-ar')(lerp(this.tarCurrY , this.mouseY - $('.home-product-item-ar-inner').height()/2, 0.1));
                        this.requestId = requestAnimationFrame(mouseTransform);
                };
                    this.requestId = requestAnimationFrame(mouseTransform);
            }
        }
        destroy(){
            if(viewport.w > 991){
                cancelAnimationFrame(requestId);
            }
        }
    }
    let homeProduct = new HomeProduct();
    class HomeBenefit{
        constructor() {
            this.tlTrigger;
        }
        setTrigger() {
            this.tlTrigger = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-benefit-title-wrap',
                    start: 'top bottom+=50%',
                    end: 'bottm top',
                    once: true,
                    onEnter: () => {
                        this.setup();
                    }
                }
            })
        }
        setup() {
            const title = new SplitType('.home-benefit-title', {types: 'lines, words', lineClass: 'bp-line heading-line'});
            let label;
            if($('.home-benefit-label').length > 0){
                label = new SplitType('.home-benefit-label', {types: 'lines, words', lineClass: 'bp-line'});
            }
            let tlFadeHead = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-benefit-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true
                },
                onComplete: () => {
                    // title.revert();
                }
            })
            if($('.home-benefit-label').length > 0){
                tlFadeHead
                    .from(label.words, {autoAlpha: 0, yPercent: 80, duration: .6})
            }
            tlFadeHead
                .from(title.words, {autoAlpha: 0, yPercent: 60, duration: .8, stagger: .03}, '<=.2')
                .from('.home-benefit-title-line', {autoAlpha: 0, scaleX: 0, transformOrigin: 'left', duration: 1, clearProps: 'all'}, '<=.0')

            if(viewport.w > 767){
                let tlFadeTitleTable = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.home-benefit-table-title-wrap',
                        start: 'top top+=65%',
                        once: true
                    },
                    onComplete: () => {
                    }
                })
                let tlSticky = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.home-benefit-table-title-wrap',
                        start: 'top-=30px top',
                        endTrigger:'.home-benefit-content-inner',
                        end: 'bottom top',
                        // once: true,
                        onEnter: () => {
                            $('.home-benefit-table-title-wrap').addClass('sticky')
                            $('.home-benefit-table-title-inner').addClass('sticky')
                        },
                        onLeave: () => {
                            $('.home-benefit-table-title-wrap').removeClass('sticky')
                            $('.home-benefit-table-title-inner').removeClass('sticky')
                        },
                        onEnterBack: () => {
                            $('.home-benefit-table-title-wrap').addClass('sticky')
                            $('.home-benefit-table-title-inner').addClass('sticky')
                        },
                        onLeaveBack: () => {
                            $('.home-benefit-table-title-wrap').removeClass('sticky')
                            $('.home-benefit-table-title-inner').removeClass('sticky')
                        }
                    },
                })
                tlSticky.to('.home-benefit-table-title-wrap', {opacity: 1})
                $('.home-benefit-table-title').each((idx, item) => {
                    let titleTable = new SplitType(item, {types: 'lines, words', lineClass: 'bp-line heading-line'});
                    tlFadeTitleTable
                    .from(titleTable.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .6, onComplete: () => {
                        // titleTable.revert();
                    }}, `<=${idx*.2}`)
                })
                let allItems = $('.home-benefit-content-item');
                allItems.each((idx, item) => {
                    let titleItem = new SplitType($(item).find('.home-benefit-content-title-txt'), {types: 'lines, words', lineClass: 'bp-line'});
                    let titleRpet = new SplitType($(item).find('.home-benefit-content-rpet-txt'), {types: 'lines, words', lineClass: 'bp-line'});
                    let titleTradi = new SplitType($(item).find('.home-benefit-content-tradi-txt'), {types: 'lines, words', lineClass: 'bp-line'});
                    let tlFadeItem = new gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: 'top top+=70%',
                            once: true,
                            onLeave: () => {
                                    titleItem.revert();
                                    titleRpet.revert();
                                    titleTradi.revert();
                            }
                        },
                    })
                    tlFadeItem
                        .from($(item).find('.home-benefit-item-line-top'), {autoAlpha: 0, scaleX: 0, transformOrigin: 'left', duration: 1, clearProps: 'all'})
                        .from($(item).find('.home-benefit-content-title-ic'), {autoAlpha: 0, yPercent: 40, duration: .6, clearProps: 'all'}, '<=0')
                        .from(titleItem.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .6}, '<=0.2')
                        .from($(item).find('.home-benefit-content-rpet-ic'), {autoAlpha: 0, yPercent: 40, duration: .6, clearProps: 'all'}, '<=0')
                        .from(titleRpet.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .4}, '<=0.2')
                        .from($(item).find('.home-benefit-content-tradi-ic'), {autoAlpha: 0, yPercent: 40, duration: .6, clearProps: 'all'}, '<=0')
                        .from(titleTradi.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .4}, '<=0.2')
                    if(idx == allItems.length - 1){
                        tlFadeItem
                            .from($(item).find('.home-benefit-item-line-bot'), {autoAlpha: 0, scaleX: 0, transformOrigin: 'left', duration: 1, clearProps: 'all'}, '<=0')
                    }
                })
            }
            else {
                let titleItem = new SplitType($('.home-benefit-content-item:nth-child(1) .home-benefit-content-title-txt'), {types: 'lines, words', lineClass: 'bp-line'});
                let titleRpet = new SplitType($('.home-benefit-content-item:nth-child(1) .home-benefit-table-title-rpet'), {types: 'lines, words', lineClass: 'bp-line'});
                let contentRpet = new SplitType($('.home-benefit-content-item:nth-child(1) .home-benefit-content-rpet-txt'), {types: 'lines, words', lineClass: 'bp-line'});
                let titleTradi = new SplitType($('.home-benefit-content-item:nth-child(1) .home-benefit-table-title-tradi'), {types: 'lines, words', lineClass: 'bp-line'});
                let contentTradi = new SplitType($('.home-benefit-content-item:nth-child(1) .home-benefit-content-tradi-txt'), {types: 'lines, words', lineClass: 'bp-line'});
                let tlFadeItem = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.home-benefit-content-item:nth-child(1)',
                        start: 'top top+=45%',
                        once: true
                    },
                    onComplete: () => {
                    }
                })
                tlFadeItem
                    .from($('.home-benefit-content-item:nth-child(1)').find('.home-benefit-item-line-top'), {autoAlpha: 0, scaleX: 0, transformOrigin: 'left', duration: 1, clearProps: 'all'})
                    .from(titleItem.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .6}, '<=0.2')
                    .from($('.home-benefit-content-item:nth-child(1)').find('.home-benefit-content-title-ic'), {autoAlpha: 0, yPercent: 40, duration: .6, clearProps: 'all'}, '<=0')
                    .from(titleRpet.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .4}, '<=0.2')
                    .from($('.home-benefit-content-item:nth-child(1)').find('.home-benefit-content-rpet-ic'), {autoAlpha: 0, yPercent: 40, duration: .6, clearProps: 'all'}, '<=0')
                    .from(contentRpet.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .4}, '<=0.2')
                    .from($('.home-benefit-content-item:nth-child(1)').find('.home-benefit-content-tradi-ic'), {autoAlpha: 0, yPercent: 40, duration: .6, clearProps: 'all'}, '<=0')
                    .from(titleTradi.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .4}, '<=0.2')
                    .from(contentTradi.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .4}, '<=0.2')
                    .from($('.home-benefit-content-item:nth-child(1)').find('.home-benefit-item-line-bot'), {scaleX: 0, transformOrigin: 'left',  duration: 1, clearProps: 'all'}, '<=0.2')
                    .from('.home-benefit-scrollbar.swiper-scrollbar', {autoAlpha: 0, y: 40, duration: .6, onComplete: () => {
                        titleItem.revert();
                        titleRpet.revert();
                        titleTradi.revert();
                    }}, '<=0.2')
                $('.home-benefit-content-wrap').addClass('swiper')
                $('.home-benefit-content-inner').addClass('swiper-wrapper')
                $('.home-benefit-content-item').addClass('swiper-slide')
                let swiperContent = new Swiper('.home-benefit-content-wrap', {
                    spaceBetween: parseRem(20),
                    slidesPerView: 1,
                    speed: 500,
                    scrollbar: {
                        el: ".home-benefit-scrollbar",
                      },
                })
            }
        }
    }
    let homeBenefit = new HomeBenefit();

    class HomeService {
        constructor() {
            this.tlTrigger;
            this.allItems;
        }
        setTrigger() {

            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-service',
                    start: viewport.w > 767 ? 'top bottom+=50%' : 'top bottom+=100%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        console.log('trigger enter service');
                        this.setup()
                    },
                }
            })
        }
        setup() {
            this.allItems = $('.home-service-item');
            let tlfadeHead = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-service-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true,
                },
            })
            const title = new SplitType('.home-service-title', {types: 'lines, words', lineClass: 'bp-line heading-line'});
            gsap.set('.home-service-label', {autoAlpha: 0, yPercent: 80})
            gsap.set(title.words, {autoAlpha: 0, yPercent: 60})
            tlfadeHead
                .to('.home-service-label', {autoAlpha: 1, yPercent: 0, duration: .6})
                .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=.2')
            this.allItems.each((idx, item) => {
                replaceHyphen($(item).find('.home-service-item-desc'))
                let titleItem = new SplitType($(item).find('.home-service-item-title'), {types: 'lines, words', lineClass: 'bp-line'});
                let subItem = new SplitType($(item).find('.home-service-item-desc'), {types: 'lines, words', lineClass: 'bp-line'});
                let linkItem = new SplitType($(item).find('.home-service-item-link .txt'), {types: 'lines, words', lineClass: 'bp-line'});
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60})
                gsap.set(subItem.words, {autoAlpha: 0, yPercent: 100})
                gsap.set(linkItem.words, {autoAlpha: 0, yPercent: 100})
                gsap.set('.home-service-item-img', {autoAlpha: 0, clipPath: 'circle(30% at 50% 50%)'})
                let tlItemService = new gsap.timeline({
                    scrollTrigger : {
                        trigger: item,
                        start: viewport.w > 767 ? 'top top+=65%' : 'top top+=35%',
                        once: true,
                    },
                    onComplete: () => {
                        titleItem.revert();
                        subItem.revert();
                        linkItem.revert();
                    }
                })
                tlItemService
                    .to($(item).find('.home-service-item-img'), {autoAlpha: 1, clipPath: 'circle(50% at 50% 50%)', stagger: .02, duration: .6, clearProps: 'all'}, )
                    .to(titleItem.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6},'<=.2' )
                    .to(subItem.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.2')
                    .to(linkItem.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '>=-.4')
            })
            if (viewport.w > 991) {
                    this.allItems.each((idx, el) => {
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
                            .fromTo(el, {y: 150}, {y: -150, duration: 1}, 0)
                        })
                    })
            }
            this.interact()
        }
        interact() {

            // requestAnimationFrame(this.updateCursor.bind(this))
        }
        // updateCursor() {
        //     requestAnimationFrame(this.updateCursor.bind(this))
        // }
        destroy() {
            cancelAnimationFrame(this.updateCursor.bind(this))
        }
    }
    let homeService = new HomeService()
    class HomeMarket {
        constructor() {
            this.tlTrigger;
        }
        setTrigger() {

            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-market',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        console.log('trigger enter ');
                        this.setup()
                    },
                }
            })
        }
        setup() {
            this.toggleItem(0);
            const label = new SplitType($('.home-market-label'), {types: 'lines, words', lineClass: 'bp-line'});
            const title = new SplitType($('.home-market-title'), {types: 'lines, words', lineClass: 'bp-line heading-line'});
            const allItems = $('.home-market-item')
            let tlContent = new gsap.timeline({
                scrollTrigger : {
                    trigger: '.home-market-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true,
                    // markers: true
                },
                onComplete: () => {
                    label.revert();
                }
            })

            if(viewport.w > 767){
                // const borderRadius = $('.home-market-img-wrap').css('border-radius') || '0';
                gsap.set('.home-market-img-wrap', {autoAlpha: 0, scale: .8})
                gsap.set('.home-market-img-list', {autoAlpha: 0, clipPath: 'circle(30% at 50% 50%)'})
                tlContent
                    .to('.home-market-img-wrap', {autoAlpha: 1, scale: 1 , duration: .8, clearProps: 'all'})
                    .to('.home-market-img-list', {autoAlpha: 1, clipPath: 'circle(50% at 50% 50%)' , duration: .8, clearProps: 'all'}, '<=.2')
            }
            tlContent
                .from(label.words, {autoAlpha: 0, yPercent: 100, stagger: .02, duration: .6}, '<=0')
                .from(title.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .6}, '<=.2')
            allItems.each((idx, item) => {
                let titleItem = new SplitType($(item).find('.home-market-item-head-txt'), {types: 'lines, words', lineClass: 'bp-line'});
                tlContent
                    .from($(item).find('.line.home-market-line-top'), {autoAlpha: 0, scaleX: 0, transformOrigin: 'left', duration: .5, clearProps: 'all'},idx==0 ? '<=.1' : `${idx*.2}`)
                    .from($(item).find('.home-market-item-ic-wrap'), {autoAlpha: 0,yPercent: 40, duration: .8, clearProps: 'all'}, '<=.3')
                    .from(titleItem.words, {autoAlpha: 0, yPercent: 50, stagger: .02, duration: .6, onComplete: () => {
                        titleItem.revert();
                    }}, '<=.2')
                    .from($(item).find('.home-market-item-toggle-ic'), {autoAlpha: 0, yPercent: 40, duration: .6, clearProps: 'all'}, '<=0.2')
                if(idx == 0){
                    let subItem = new SplitType($(item).find('.home-market-item-body-txt'), {types: 'lines, words', lineClass: 'bp-line'});
                    let linkItem = new SplitType($(item).find('.home-market-item-link .txt'), {types: 'lines, words', lineClass: 'bp-line'});
                    tlContent
                        .from(subItem.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .4, onComplete: () => {
                            subItem.revert();
                        }}, '<=0.2')
                        .from(linkItem.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .4, onComplete: () => {
                            linkItem.revert();
                        }}, '<=0.2')
                    if(viewport.w < 767){
                        tlContent
                            .from($(item).find('.home-market-item-body-img'), {autoAlpha: 0,scale: .8, duration: 1, clearProps: 'all'},'<=0')
                    }
                }
                if(idx == allItems.length -1){
                    tlContent
                    .from($(item).find('.line.home-market-line-bot'), {autoAlpha: 0, scaleX: 0, transformOrigin: 'left', duration: .5,  clearProps: 'all'}, '<=.2');
                }
            })
            activeItem(['.home-market-img-item'], 0)
            this.interact()
        }
        interact() {
            let allHeads = $('.home-market-item-head')
            allHeads.on('click', function(e) {
                e.preventDefault();
                let index = $(this).closest('.home-market-item').index();
                activeItem(['.home-market-img-item'], index)
                if ($(this).closest('.home-market-item').hasClass('active')) {
                    $(this).closest('.home-market-item').find('.home-market-item-body').slideUp()
                    $(this).closest('.home-market-item').removeClass('active')
                } else {
                    $('.home-market-item').removeClass('active')
                    $('.home-market-item-body').slideUp()
                    $(this).closest('.home-market-item').addClass('active')
                    $(this).closest('.home-market-item').find('.home-market-item-body').slideDown()
                }
            })
        }
        toggleItem(index) {
            $('.home-market-item-head').eq(index).closest('.home-market-item').addClass('active')
            $('.home-market-item-head').eq(index).closest('.home-market-item').find('.home-market-item-body').slideDown({duration: 0})
        }
    }
    let homeMarket = new HomeMarket;
    class HomeRpet {
        constructor() {
            this.tlTrigger;
            this.allItems;
        }
        setTrigger() {

            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-rpet',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        console.log('trigger enter ');
                        this.setup()
                    },
                }
            })
        }
        setup(){
            this.allItems = $('.home-rpet-item')
            const title = new SplitType($('.home-rpet-title'), {types: 'lines, words', lineClass: 'bp-line heading-line'});
            let tlFade = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-rpet-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true
                },
            })
            tlFade
                .from(title.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .6})
            this.allItems.each((idx, item) => {
                let titleItem = new SplitType($(item).find('.home-rpet-item-title'), {types: 'lines, words', lineClass: 'bp-line'});
                let subItem = new SplitType($(item).find('.home-rpet-item-desc'), {types: 'lines, words', lineClass: 'bp-line'});
                let tlItem = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: viewport.w > 767 ? 'top top+=65%' : 'top top+=35%',
                        once: true
                    },
                })
                tlItem
                    .from($(item).find('.home-rpet-item-ic-wrap'), {autoAlpha: 0, yPercent: 50, duration: .8, clearProps: 'all'}, idx*.2)
                    .from(titleItem.words, {autoAlpha: 0, yPercent: 80, stagger: .02, duration: .4, onComplete: () => {
                        titleItem.revert();
                    }}, '<=.2')
                    .from(subItem.words, {autoAlpha: 0, yPercent: 80, stagger: .02, duration: .3, onComplete: () => {
                        subItem.revert();
                    }}, '<=.2')
                if(idx !== this.allItems.length - 1){
                    console.log($(item).find('.home-rpet-line'))
                    tlItem
                        .from($('.home-rpet-line').eq(idx), {autoAlpha: 0, scaleY: 0, transformOrigin: 'bottom', duration: .6}, '<=0')
                }
            })
        }
    }
    let homeRpet = new HomeRpet();
    class HomeTesti {
        constructor() {
            this.tlTrigger;
        }
        setTrigger() {

            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-testi',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        console.log('trigger enter');
                        this.setup()

                    },
                }
            })
        }
        setup() {
            this.toggleItem(0);
            if(viewport.w< 992){
                $('.home-testi-tab-item').eq(0).find('.home-testi-tab-item-body').slideDown();

            }
            gsap.to(".home-testi-ic", {
                scale: 1.2,
                duration: 1.4,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
              });
            const title = new SplitType('.home-testi-title',{types: 'lines, words', lineClass: 'bp-line heading-line'} );
            let tlFadeHead = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-testi-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true,
                }
            })
            tlFadeHead
                .from('.home-testi-label', {autoAlpha: 0, yPercent: 80, duration: .8, clearProps: 'all'})
                .from(title.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .8}, '<=.2')
                .from('.home-testi-ic-inner', {autoAlpha: 0, yPercent: 60, duration: .6, clearProps: 'all'}, '<=0')
                .from('.home-testi-line', {autoAlpha: 0, scaleX: 0, duration: .8, clearProps: 'all'}, '<=-0')
            let allItemsBody =$('.home-testi-body-item-txt p');
            let allItemsTab =$('.home-testi-tab-txt');
            allItemsTab.each((idx, el) => {
                let tab = new SplitType(el, {types: 'lines, words', lineClass: 'bp-line '})
            })
            allItemsBody.each((idx, el) => {
                let body = new SplitType(el, {types: 'lines', lineClass: 'bp-line '})
                let name = new SplitType($(el).closest('.home-testi-body-item').find('.home-testi-item-name'), {types: 'lines ', lineClass: 'bp-line '})
                // let postion = new SplitType($(el).closest('.home-testi-body-item').find('.home-testi-item-position'), {types: 'lines ', lineClass: 'bp-line '})
            })
            let tlTab = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-testi-tab-cms',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%' ,
                    once: true,
                },

            })
            let tlItemBody = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-testi-body',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%' ,
                    once: true,
                    markets: true
                },

            })
                $('.home-testi-tab-item').each((idx, item) => {
                    tlTab
                    .from($(item).find('.home-testi-tab-line'),{autoAlpha: 0, transformOrigin: 'left', duration: .6}, `<=${idx == 0 ? 0 : idx * 0.1}`)
                    .from($(item).find('.ic-embed.ic-arr-main'),{autoAlpha: 0, duration: .4, yPercent: 100, clearProps: 'all'}, `<= .1`)
                    .from($(item).find('.home-testi-tab-txt .word'),{autoAlpha: 0, duration: .8, yPercent: 80, stagger: .03, clearProps: 'all'}, `<= .0`);
                    if(viewport.w <992 ){
                        gsap.set($(item).find('.home-testi-tab-toggle'), {autoAlpha: 0})
                        tlTab.to($(item).find('.home-testi-tab-toggle'),{autoAlpha: 1, duration: .6, clearProps: 'all'}, `<= .1`)
                        if(idx === 0){
                            gsap.set($(item).find('.home-testi-body-item-txt .bp-line'), {autoAlpha: 0, yPercent: 100})
                            gsap.set($(item).find('.home-testi-item-name '), {autoAlpha: 0, yPercent: 100})
                            gsap.set($(item).find('.home-testi-item-position '), {autoAlpha: 0, yPercent: 100})
                            tlTab
                                .to($(item).find('.home-testi-body-item-txt .bp-line'), {autoAlpha: 1, yPercent: 0, stagger: .05, duration: .6 }, '<=.2')
                                .to($(item).find('.home-testi-item-name '), {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .5 }, '>=-.2')
                                .to($(item).find('.home-testi-item-position '), {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .4, onComplete: () =>{
                                    $('.home-testi-tab').removeClass('animating');
                                }}, '>=-.2');
                        }
                        if(idx ===$('.home-testi-tab-item').length - 1) {
                            tlTab.from($(item).find('.home-testi-tab-line-bot'),{scale: 0, transformOrigin: 'left', duration: .6, clearProps: 'all'}, '<=.2')
                        }
                    }
                })
            if(viewport.w > 991){
                gsap.set($('.home-testi-body-item').eq(0).find('.home-testi-body-item-txt .bp-line'), {autoAlpha: 0, yPercent: 100})
                gsap.set($('.home-testi-body-item').eq(0).find('.home-testi-item-name .bp-line'), {autoAlpha: 0, yPercent: 100})
                gsap.set($('.home-testi-body-item').eq(0).find('.home-testi-item-position '), {autoAlpha: 0, yPercent: 100})
                tlItemBody
                    .to($('.home-testi-body-item').eq(0).find('.home-testi-body-item-txt .bp-line'), {autoAlpha: 1, yPercent: 0, stagger: .05, duration: .6 })
                    .to($('.home-testi-body-item').eq(0).find('.home-testi-item-name .bp-line'), {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 }, '<=.5')
                    .to($('.home-testi-body-item').eq(0).find('.home-testi-item-position'), {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .4, onComplete: () =>{
                    $('.home-testi-tab').removeClass('animating');
                }}, '<=.4');
            }
            this.interact();
        }
        interact() {
            if(viewport.w > 991){
                let allItemsTab = $('.home-testi-tab-item');
                let lastIndex;
                allItemsTab.on('click', (e) => {
                    e.preventDefault();
                    if ($(e.currentTarget).hasClass('active') || $('.home-testi-tab').hasClass('animating')) {console.log('return');return;}
                    let index = $(e.currentTarget).index();
                    this.toggleItem(index);
                    this.activeItemBody(index, lastIndex)
                    lastIndex = index;
                })
                lastIndex=0;
            }
            else{
                let allItemsTab = $('.home-testi-tab-item-inner');
                allItemsTab.on('click', (e)=>{
                    e.preventDefault();
                    let index = $(e.currentTarget).closest('.home-testi-tab-item').index();
                    if($('.home-testi-tab-item').eq(index).hasClass('active')){
                        $('.home-testi-tab-item').eq(index).find('.home-testi-tab-item-body').slideUp();
                        $('.home-testi-tab-item').eq(index).removeClass('active');
                    }
                    else{$('.home-testi-tab-item').find('.home-testi-tab-item-body').slideUp()
                        $('.home-testi-tab-item').eq(index).find('.home-testi-tab-item-body').slideDown();
                    this.toggleItem(index);

                    }
                })
            }
        }
        toggleItemMob(index){
            let item = $('.home-testi-tab-item').eq(index);
            item.find('.home-testi-tab-item-body').slideToggle();

        }
        activeItemBody(index, lastIndex, isInit = false) {
            console.log(index)
            if(isInit) {
                gsap.set('.home-testi-body-item:not(.active) .home-testi-body-item-txt .bp-line', {autoAlpha: 0})
            }
            $('.home-testi-tab').addClass('animating');
            let tlbody = gsap.timeline({})
            if(lastIndex !== undefined) {
                tlbody.to($('.home-testi-body-item').eq(lastIndex).find('.home-testi-body-item-txt .bp-line'), { yPercent: -100, stagger: .01, clearProps:'all'});
            }
            tlbody.from($('.home-testi-body-item').eq(index).find('.home-testi-body-item-txt .bp-line'), {autoAlpha: 0, yPercent: 100, stagger: .05, duration: .4}, '<= .1');
            tlbody.from($('.home-testi-body-item').eq(index).find('.home-testi-item-name .bp-line'), {autoAlpha: 0, yPercent: 100, stagger: .02, duration: .4 }, '>=-.3');
            tlbody.from($('.home-testi-body-item').eq(index).find('.home-testi-item-position'), {autoAlpha: 0, yPercent: 100, stagger: .02, duration: .4, onComplete: () =>{
                $('.home-testi-tab').removeClass('animating');
            }}, '>=-.3');
        }
        toggleItem(index) {
            let elArr = ['.home-testi-tab-item', '.home-testi-body-item'];
            activeItem(elArr, index)
        }
    }
    let homeTesti = new HomeTesti();
    class HomeAbout {
        constructor() {
            this.tlTrigger;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-about',
                    start: 'top bottom+=50%',
                    end: 'bottom+=50% top',
                    once: true,
                    onEnter: () => {
                        console.log('trigger enter');
                        this.setup()
                        this.interact()
                    },
                }
            })
        }
        setup() {
                let label = new SplitType('.home-about-label', {types: 'lines, words', lineClass: 'bp-line'});
                let title = new SplitType('.home-about-title', {types: 'lines, words', lineClass: 'bp-line heading-line'});
                let tlFadeHead = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.home-about-title-wrap',
                        start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                        once: true,
                    },
                    onComplete: () => {
                        label.revert();
                    }
                })
                tlFadeHead
                    .from(label.words, {autoAlpha: 0, yPercent: 80, duration: 1, stagger: .02})
                    .from(title.words, {autoAlpha: 0, yPercent: 60, duration: .6, stagger: .02}, '<=.2')
                let sub = new SplitType('.home-about-sub', {types: 'lines, words', lineClass: 'bp-line'});
                let desc = new SplitType('.home-about-desc', {types: 'lines, words', lineClass: 'bp-line '});
                let tlFadeSub = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.home-about-sub-wrap',
                        start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%' ,
                        once: true,
                    },
                    onComplete: () => {
                        sub.revert();
                        desc.revert();
                    }
                })
                tlFadeSub
                    .from(sub.words, {autoAlpha: 0, yPercent: 60, duration: .6, stagger: .02})
                    .from(desc.words, {autoAlpha: 0, yPercent: 80, duration: .4, stagger: .02}, '<=.2')
                let scaleNumber = $('.home-about-wrap').width() / $('.home-about-img').width();
                // let borderRadius = $('.home-about-img-inner').css('border-radius');
                let tlImgScrub = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.home-about-img-wrap',
                        start: 'top bottom',
                        endTrigger: '.home-about-sub',
                        end: 'top bottom',
                        scrub: true,
                    }
                })
                let tlImgMob = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.home-about-img-wrap',
                        start: 'top top+=45%',
                        once: true,
                    }
                })
                if(viewport.w < 767){
                    tlImgMob.from('.home-about-img-inner', {autoAlpha: 0, y: 20, duration: .6, clearProps: 'all'})
                }
                tlImgScrub
                .fromTo($('.home-about-img-inner'), {transformOrigin: 'top', scale : scaleNumber}, {scale : 1, duration: 1, ease: 'none'})
                .fromTo($('.home-about-img img'),  {scale: 1.2}, {scale: 1, duration: 1, ease: 'none'}, '<=0')
        }
        interact() {

        }
    }
    let homeAbout = new HomeAbout()
    class AboutHero {
        constructor (){
            this.tlFadeHead;
            this.tlPath

        }

        setup() {
            // replaceHyphen('.about-hero-sub')
            spanGreen('.about-hero-sub .txt-cl-green')

            const title = new SplitType('.about-hero-title', {types: 'lines, words', lineClass: 'bp-line heading-line'})
            const sub = new SplitType('.about-hero-sub', {types: 'lines, words', lineClass: 'bp-line heading-line'})
            this.tlFadeHead = new gsap.timeline({
                paused: true,
                onComplete: () => {
                    // sub.revert();

                }
            })
            gsap.set(title.words,{autoAlpha: 0, yPercent:  60})
            gsap.set(sub.words,{autoAlpha: 0, yPercent:  80})
            this.tlFadeHead
                .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .7})
                .to(sub.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .5}, '<=.2');
            $('.about-hero-item').each((idx, item)=> {
                gsap.set($(item).find('.about-hero-item-img-wrap'), {autoAlpha: 0, y: 30});
                gsap.set($(item).find('.about-hero-item-img-inner'), {autoAlpha: 0, clipPath: 'circle(30% at 50% 50%)'});
                let txt = new SplitType($(item).find('.about-hero-main-item-txt'), {types: 'lines, words', lineClass: 'bp-line'})
                if(viewport.w <767){
                    gsap.set('.about-hero-item-line-wrap', {scaleY: 0, transformOrigin: 'top'})
                }
                gsap.set(txt.words, {autoAlpha: 0, yPercent: 100})
            })
            gsap.set('.about-hero-main-deco', {autoAlpha: 0, clipPath: 'circle(30% at 50% 50%)', y: 30});
            let titleBot = new SplitType('.about-hero-main-bot-txt', {types: 'lines, words', lineClass: 'bp-line heading-line'})
            gsap.set(titleBot.words, {autoAlpha: 0, yPercent: 80})
            function activeHeroDeco(index){
                if(!$('.about-hero-main-deco').eq(index).hasClass('active')){
                    $('.about-hero-main-deco').eq(index).addClass('active')
                    gsap.to($('.about-hero-main-deco').eq(index), {autoAlpha: 1, clipPath: 'circle(50% at 50% 50%)', y: 0, duration: .6, clearProps: 'all'})
                }
            }
            function activeHeroItem(index){
                if(!$('.about-hero-item').eq(index).hasClass('active')){
                    $('.about-hero-item').eq(index).addClass('active')
                    gsap.to($('.about-hero-item').eq(index).find('.about-hero-item-img-wrap'), {autoAlpha: 1, y: 0, duration: .4, ease: 'power3.out', clearProps: 'all'})
                    gsap.to($('.about-hero-item').eq(index).find('.about-hero-item-img-inner'), {autoAlpha: 1, clipPath: 'circle(50% at 50% 50%)', duration: .5, clearProps: 'al'}, '<=.2')
                    gsap.to($('.about-hero-item').eq(index).find('.about-hero-main-item-txt .word'), {autoAlpha: 1, yPercent: 0, duration: .6, stagger: .02})
                }

            }
            if(viewport.w > 991){
                this.tlPath = new gsap.timeline({
                    scrollTrigger: {
                        paused: true,
                        trigger: '.about-hero-main',
                        start: 'top center',
                        end: 'bottom-=200rem center',
                        scrub: true,
                        onUpdate: self => {
                            gsap.to('.about-hero-path-desk', {strokeDasharray: `${self.progress}, 1`})

                            if(self.progress > 0){
                                activeHeroItem(0)
                            }
                            if(self.progress > 0.065){
                                activeHeroDeco(0)
                            }
                            if(self.progress > 0.3){
                                activeHeroDeco(1);
                            }
                            if(self.progress > 0.6){
                                activeHeroDeco(2);
                            }
                            if(self.progress > 0.135){
                                activeHeroItem(1)
                            }
                            if(self.progress > 0.34){
                                activeHeroItem(2)
                            }
                            if(self.progress > 0.65){
                                activeHeroItem(3)
                            }
                            if(self.progress > 0.86){
                                activeHeroItem(4)
                            }
                            if(self.progress == 1){
                                gsap.to(titleBot.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
                            }
                        }
                    }
                })
            }
            else if(viewport.w > 767){
                this.tlPath = new gsap.timeline({
                    scrollTrigger: {
                        paused: true,
                        trigger: '.about-hero-main',
                        start: 'top center',
                        end: 'bottom-=200rem center',
                        scrub: true,
                        // markers: true,
                        onUpdate: self => {
                            gsap.to('.about-hero-path-tablet', {strokeDasharray: `${self.progress}, 1`})

                            if(self.progress > 0){
                                activeHeroItem(0)
                            }
                            if(self.progress > 0.025){
                                activeHeroDeco(0)
                            }
                            if(self.progress > 0.11){
                                activeHeroDeco(1);
                            }
                            if(self.progress > 0.57){
                                activeHeroDeco(2);
                            }
                            if(self.progress > 0.23){
                                activeHeroItem(1)
                            }
                            if(self.progress > 0.4){
                                activeHeroItem(2)
                            }
                            if(self.progress > 0.6){
                                activeHeroItem(3)
                            }
                            if(self.progress > 0.85){
                                activeHeroItem(4)
                            }

                            if(self.progress == 1){
                                gsap.to(titleBot.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
                            }
                        }
                    }
                })
            }
            else{
                $('.about-hero-item').each((idx, item)=> {
                    let tlFade = new gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start : viewport.w > 767 ? 'top top+=45%': 'top top+=65%',
                            once: true
                        }
                    })
                    tlFade
                        .to($(item).find('.about-hero-item-img-wrap'), {autoAlpha: 1, y: 0, duration: .8})
                        .to($(item).find('.about-hero-item-img-inner'), {autoAlpha: 1, clipPath: 'circle(50% at 50% 50%)', duration: .8}, '<=.2')
                        .to($(item).find('.about-hero-main-item-txt .word'), {autoAlpha: 1, yPercent: 0, duration: .3, stagger: .02}, '<=.3')
                        .to($(item).find('.about-hero-item-line-wrap'), {scaleY: 1, duration: .4}, '<=.3')
                    if(idx == $('.about-hero-item').length - 1 ){


                    }
                })
                let tlFadeLast = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.about-hero-main-bot',
                        start : 'top top+=75%',
                        once: true,
                    }
                })
                gsap.set
                tlFadeLast
                    .to($('.about-hero-main-bot-txt .word'), {autoAlpha: 1, yPercent: 0, duration: .6, stagger: .02})
            }
        }
        play(){
            this.tlFadeHead.play();
        }
    }
    let aboutHero = new AboutHero();
    class AboutProduct{
        constructor(){
            this.tlTrigger,
            this.tlFade,
            this.tlScroll
        }
        setTrigger(){
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-product',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        console.log('trigger enter product');
                        this.setup()
                    },
                }
            })
        }
        setup(){

            spanGreen('.about-product-title .txt-cl-green')
            let title = new SplitType('.about-product-title', {types: 'words lines', lineClass:'bp-line heading-line'})
            addSpaceToText('.about-product-title .sp-special .word')

            gsap.set(title.words, {autoAlpha: 0, yPercent: 80})
            this.tlFade = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-product-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%': 'top top+=45%',
                    once: true,
                },
            })
            this.tlFade
                .to(title.words,{yPercent: 0, autoAlpha: 1, stagger: .02, duration: .6})
            this.interact();

        }
        interact(){
            this.requestId = requestAnimationFrame(()=>updateMarquee('.about-product-bg-top'));
        }
        destroy(){
            cancelAnimationFrame(this.requestId);
        }
    }
    let aboutProduct = new AboutProduct();
    class AboutSol{
        constructor (){
            this.tlTrigger
        }
        setTrigger(){
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-sol',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.setup();
                    },
                }
            })
        }
        setup(){
            activeItem(['.about-sol-main-content-item'], 1)
            // activeItem(['.about-sol-main-thumb-item'], 0)
            let title = new SplitType('.about-sol-title', {types: 'words lines', lineClass: 'bp-line heading-line'});
            let label = new SplitType('.about-sol-label', {types: 'words lines', lineClass: 'bp-line'});
            gsap.set(title.words, {autoAlpha: 0, yPercent: 60})
            gsap.set(label.words, {autoAlpha: 0, yPercent: 80})
            gsap.set('.about-sol-control-inner', {autoAlpha: 0, scale: .6})
            this.tlFade = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-sol-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%': 'top top+=45%',
                    once: true,
                }
            })
            this.tlFade
                .to(label.words, {autoAlpha: 1, yPercent: 0, duration: .7, stagger: .02})
                .to(title.words, {autoAlpha: 1, yPercent: 0, duration: .6, stagger: .02}, '<=.2')
                .to('.about-sol-control-inner ', {autoAlpha: 1, scale: 1, duration: .8}, '<=0.2')
            let tlFadeImg = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-sol-main',
                    start: viewport.w > 767 ? 'top top+=65%': 'top top+=45%',
                    once: true,
                }
            })
            let tlFadeContent = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-sol-main-content-cms',
                    start: viewport.w > 767 ? 'top top+=65%': 'top top+=40%',
                    once: true,
                }
            })
            let allItemsContent = $('.about-sol-main-content-item');
            allItemsContent.each((idx, item) => {
                replaceHyphen($(item).find('.about-sol-main-content-title'))
                let itemTitle = new SplitType($(item).find('.about-sol-main-content-title'), {types: 'words lines', lineClass: 'bp-line heading-line'})
                let itemSub = new SplitType($(item).find('.about-sol-main-content-sub'), {types: 'words lines', lineClass: 'bp-line'})
            })
            gsap.set('.about-sol-main-thumb-item-line', {scaleX: 0, transformOrigin: 'left'})
            gsap.set('.about-sol-main-content-line', {scaleX: 0, transformOrigin: 'left'})
            gsap.set('.about-sol-cover-thumb-item-img', {clipPath: 'circle(20% at 50% 50%)', autoAlpha: 0})
            gsap.set('.about-sol-cover-thumb-item', {scale: .8, autoAlpha: 0})
            gsap.set('.about-sol-main-thumb-item-img', {clipPath: 'circle(35% at 50% 50%)', autoAlpha: 0})
            gsap.set('.about-sol-main-thumb-item', {scale: .8, autoAlpha: 0})
            gsap.set('.about-sol-main-content-item.active .about-sol-main-content-title .word', {autoAlpha: 0, yPercent: 60})
            gsap.set('.about-sol-main-content-item.active .about-sol-main-content-sub .word', {autoAlpha: 0, yPercent: 80})
            gsap.set('.about-sol-main-content-item.active .about-sol-main-content-link-wrap', {autoAlpha: 0, yPercent: 60})
            gsap.set('.about-sol-cover-thumb-deco', {autoAlpha: 0, clipPath: 'circle(30% at 50% 50%)'})
            tlFadeImg
                .to('.about-sol-main-thumb-item-line', {scaleX: 1, duration: .6, clearProps: 'all'}, '<=0')
                .to('.about-sol-main-thumb-item', {scale: 1, autoAlpha: 1, duration: 1, clearProps: 'all'}, '<=0')
                .to('.about-sol-main-thumb-item-img', {clipPath: 'circle(50% at 50% 50%)', autoAlpha: .8, duration: 1, clearProps: 'all'}, '<=0')
                .to('.about-sol-cover-thumb-item', {scale: 1, autoAlpha: 1, duration: .6, clearProps: 'all'}, '<=0')
                .to('.about-sol-cover-thumb-item-img', {clipPath: 'circle(50% at 50% 50%)', autoAlpha: .8, duration: .6, clearProps: 'all'}, '<=0')
                .to('.about-sol-cover-thumb-deco', {clipPath: 'circle(50% at 50% 50%)', autoAlpha: 1, duration: .6, clearProps: 'all'}, '<=0.2')
            if(viewport.w > 767){
                tlFadeContent
                .to('.about-sol-main-content-item.active .about-sol-main-content-title .word', {autoAlpha: 1, yPercent: 0, duration: .6, stagger: .02}, '<=0')
                .to('.about-sol-main-content-line', {scaleX: 1, duration: 1, clearProps: 'all'}, '<=0')
                .to('.about-sol-main-content-item.active .about-sol-main-content-sub .word', {autoAlpha: 1, yPercent: 0, duration: .4, stagger: .015}, '<=.3')
                .to($('.about-sol-main-content-item.active .about-sol-main-content-link-wrap'), {autoAlpha: 1, yPercent: 0, duration: .4}, '<=.5')
            }
            else{
                tlFadeImg
                .to('.about-sol-main-content-item.active .about-sol-main-content-title .word', {autoAlpha: 1, yPercent: 0, duration: .6, stagger: .02}, '<=0')
                .to('.about-sol-main-content-line', {scaleX: 1, duration: 1, clearProps: 'all'}, '<=0')
                .to('.about-sol-main-content-item.active .about-sol-main-content-sub .word', {autoAlpha: 1, yPercent: 0, duration: .4, stagger: .015}, '<=.3')
                .to($('.about-sol-main-content-item.active .about-sol-main-content-link-wrap'), {autoAlpha: 1, yPercent: 0, duration: .4}, '<=.5')
            }

            this.interact();
        }
        interact() {
            let swiperCover = new Swiper('.about-sol-cover-thumb-cms', {
                spaceBetween: 0,
                slidesPerView: 1,
                allowTouchMove: false ,
                speed: 500,
                on: {
                    init: function () {
                        let realIndex = this.realIndex;
                        toggleControl(realIndex);
                    },
                    slideChange: function () {
                        let realIndex = this.realIndex;
                        toggleControl(realIndex);
                    }
                }
            });
            let swiperMain = new Swiper('.about-sol-main-thumb-cms', {
                spaceBetween: 0,
                slidesPerView: 1,
                allowTouchMove: false ,
                speed: 500,
            });
            function toggleControl(realIndex){
                $('.about-sol-control-next,.about-sol-control-prev').addClass('active');
                if (realIndex === ($('.about-sol-cover-thumb-cms .swiper-slide').length -1)) {
                    $('.about-sol-control-next').removeClass('active');
                } else if (realIndex === 0) {
                    $('.about-sol-control-prev').removeClass('active');
                }
            }
            let lastIndex;
            let index = 1;
            $('.about-sol-cover-thumb-item, .about-sol-control-next').on('click', function(e) {
                e.preventDefault();
                if ($('.about-sol-cover-thumb-item').hasClass('animating')) {console.log('return');return;}
                if($('.about-sol-control-next').hasClass('active')){
                    index = (index === 0) ? 1 : 0;
                    activeItemContent(index, lastIndex);
                }
                swiperCover.slideNext();
                swiperMain.slideNext();
                lastIndex = index;
                if(viewport.w < 767){
                    // $('.about-sol-cover-thumb-deco.only-mob').fadeOut(500);
                }
            });
            $('.about-sol-control-prev').on('click', function(e) {
                e.preventDefault();
                if ($('.about-sol-cover-thumb-item').hasClass('animating')) {console.log('return');return;}
                if($(this).hasClass('active')){
                    index = (index === 0) ? 1 : 0;
                    activeItemContent(index, lastIndex);
                }
                if(viewport.w < 767){
                    // $('.about-sol-cover-thumb-deco.only-mob').fadeIn(500);
                }
                // activeItemContent(index, lastIndex);
                swiperCover.slidePrev();
                swiperMain.slidePrev();
                lastIndex = index;
            });
            lastIndex=0;
            function activeItemContent(index, lastIndex, isInit = false) {
                console.log(index)
                activeItem(['.about-sol-main-content-item'], index)
                $('.about-sol-cover-thumb-item').addClass('animating');
                let tlbody = gsap.timeline({})
                if(lastIndex !== undefined) {
                    // tlbody.to($('.about-sol-main-content-item').eq(lastIndex).find('.about-sol-main-content-title .word'), { yPercent: -100, stagger: .01, clearProps:'all'});
                }
                tlbody.from($('.about-sol-main-content-item').eq(index).find('.about-sol-main-content-title .word'), {autoAlpha: 0, yPercent: 80, stagger: .02, duration: .4}, '<= .1')
                      .from($('.about-sol-main-content-item').eq(index).find('.about-sol-main-content-sub .word'), {autoAlpha: 0, yPercent: 80, stagger: .015, duration: .3}, '<= .2')
                      .fromTo($('.about-sol-main-content-item').eq(index).find('.about-sol-main-content-link-wrap'),{autoAlpha: 0, yPercent: 60}, {autoAlpha: 1, yPercent: 0, duration: .4, onComplete: () =>{
                    $('.about-sol-cover-thumb-item').removeClass('animating');
                }}, '<=.3');
            }

        }

    }
    let aboutSol = new AboutSol();
    class AboutQuality {
        constructor() {
            this.tlTrigger;
        }
        setTrigger(){
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-quality',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.setup();
                    },
                }
            })
        }
        setup(){
            let title = new SplitType('.about-quality-title', {types: 'words lines', lineClass: 'bp-line heading-line'});
            let sub = new SplitType('.about-quality-sub', {types: 'words lines', lineClass: 'bp-line'});
            let label = new SplitType('.about-quality-label', {types: 'words lines', lineClass: 'bp-line'});
            let tlHead = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-quality-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%': 'top top+=45%',
                    once: true,
                }
            });
            tlHead
                .from(label.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .02})
                .from(title.words, {autoAlpha: 0, yPercent: 60, duration: .6, stagger: .02}, '<=.2')
                .from(sub.words, {autoAlpha: 0, yPercent: 80, duration: .3, stagger: .015}, '<=.2')
            let allItems = $('.about-quality-item');
            allItems.each((idx, item) => {
                let tlItem = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                        once: true,
                    }
                })
                let titleItem = new SplitType($(item).find('.about-quality-item-title'), {types: 'words lines', lineClass: 'bp-line heading-line'});
                let subItem = new SplitType($(item).find('.about-quality-item-sub'), {types: 'words lines', lineClass: 'bp-line'});
                gsap.set($(item).find('.about-quality-item-ic'), {autoAlpha: 0, scale: .6})
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60})
                gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80})
                if($(item).find('.about-quality-item-line').length >0){
                    gsap.set($(item).find('.about-quality-item-line'), {scaleX: 0, transformOrigin: 'left'})
                }
                tlItem
                    .to($(item).find('.about-quality-item-ic'), {autoAlpha: 1, scale: 1, duration: .8})
                if($(item).find('.about-quality-item-line').length >0){
                tlItem
                    .to($(item).find('.about-quality-item-line'), {scaleX: 1, duration: 1, clearProps: 'all'}, '<=0')
                }
                tlItem
                    .to(titleItem.words, {autoAlpha: 1, yPercent: 0, duration: .6, stagger: .02}, '<=.2')
                    .to(subItem.words, {autoAlpha: 1, yPercent: 0, duration: .4, stagger: .015}, '<=.2')
            })
        }
    }
    let aboutQuality = new AboutQuality();
    class AboutWhale {
        constructor() {
            this.tlTrigger;
        }
        setTrigger(){
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-whale',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.setup();
                    },
                }
            })
        }
        setup(){
            let title = new SplitType('.about-whale-title', {types: 'words lines', lineClass: 'bp-line heading-line'});
            let sub = new SplitType('.about-whale-sub', {types: 'words lines', lineClass: 'bp-line'});
            let label = new SplitType('.about-whale-label', {types: 'words lines', lineClass: 'bp-line'});
            let desc = new SplitType('.about-whale-desc', {types: 'words lines', lineClass: 'bp-line'});
            gsap.set([label.words, sub.words, desc.words], {autoAlpha: 0, yPercent: 100})
            gsap.set(title.words, {autoAlpha: 0, yPercent: 60})
            const borderRadius = $('.about-whale-img').css('border-radius')
            gsap.set('.about-whale-video', {autoAlpha: 0})
            gsap.set('.about-whale-sub-img',{autoAlpha: 0, clipPath: 'circle(20% at 50% 50%)'})
            let tlContent = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-whale-content-wrap',
                    start: viewport.w > 767 ? 'top top+=65%': 'top top+=30%',
                    once: true,
                },
                onComplete: () => {
                    label.revert();
                    // title.revert();
                }
            })
            let tlSub = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-whale-desc',
                    start: viewport.w > 767 ? 'top top+=75%': 'top top+=40%',
                    once: true,
                },
                onComplete: () => {
                    sub.revert();
                    desc.revert();
                }
            })
            tlSub
                .to(sub.words, {autoAlpha: 1, yPercent: 0, duration: .4, stagger: .015})
                .to(desc.words, {autoAlpha: 1, yPercent: 0, duration: .4, stagger: .015}, '<=.2')
                .to('.about-whale-sub-img', {autoAlpha: 1, clipPath: 'circle(50% at 50% 50%)', duration: .8, clearProps: 'all'}, '<=.6')
                console.log('khanh')
            // tlImg
            //     .to('.about-whale-img', {autoAlpha: 1, clipPath: `inset(0% 0% 0% 0% round ${borderRadius})`, duration: 1, clearProps: 'all'})
            tlContent
                .to(label.words, {autoAlpha: 1, yPercent: 0, duration: .6, stagger: .02})
                .to(title.words, {autoAlpha: 1, yPercent: 0, duration: .6, stagger: .02}, '<=.2')
                .to('.about-whale-video', {autoAlpha: 1, duration: .6, clearProps: 'all'}, '<=.2')
        }
    }
    let aboutWhale = new AboutWhale();

    class AboutService {
        constructor() {
            this.tlTrigger;
            this.requestId;
            this.mouseX;
            this.mouseY;
            this.tarCurrX;
            this.tarCurrY;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-service',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.setup()
                    },
                }
            });
        }
        setup() {
            if(viewport.w < 768){
                $('.about-service-main').addClass('swiper')
                $('.about-service-list').addClass('swiper-wrapper')
                $('.about-service-item').addClass('swiper-slide');
                $('.about-service-main').append('<div class="pr-food-cate-scrollbar swiper-scrollbar"></div>');
                $('.about-service-item-ar-wrap').remove();
                let swiperService = new Swiper('.about-service-main', {
                    spaceBetween: 0,
                    slidesPerView: "auto",
                    speed: 500,
                    scrollbar: {
                        el: '.about-service-main .pr-food-cate-scrollbar'
                    }
                })
            }
            const title = new SplitType($('.about-service-title'), {types: 'lines, words', lineClass: 'bp-line heading-line'})
            gsap.set(title.words, {autoAlpha: 0, yPercent: 60});
            let tlFade = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.about-service-title',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true
                }
            })
            tlFade
                .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .03, duration: .6})
            $('.about-service-item').each((idx, item) => {
                replaceHyphen($(item).find('.about-service-item-sub'))
                let titleItem = new SplitType($(item).find('.about-service-item-title'), {types: 'lines, words', lineClass: 'bp-line heading-line'})
                let subItem = new SplitType($(item).find('.about-service-item-sub'), {types: 'lines, words', lineClass: 'bp-line '})
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60})
                gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80})
                gsap.set($(item).find('.about-service-item-img-wrap '), {autoAlpha: 0, clipPath: 'circle(20% at 50% 50%)'})
                if(viewport.w < 767){
                    gsap.set($(item).find('.about-service-item-link'), {autoAlpha: 0, yPercent: 80})
                }
                let tlFadeItem = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: viewport.w > 767 ? 'top top+=65%' : 'top top+=35%',
                        once: true,
                        markets: true
                    }
                })
                tlFadeItem
                    .to($(item).find('.about-service-item-img-wrap'), {autoAlpha: 1, clipPath: 'circle(50% at 50% 50%)', duration: 1, clearProps: 'all'})
                    .to(titleItem.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=.5')
                    .to(subItem.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4, onComplete: () => {
                        if(idx == $('.about-service-item').length - 1){
                            this.interact();
                        subItem.revert();
                        }
                    }}, '<=.2')
                    if(viewport.w < 767){
                        tlFadeItem
                            .to($(item).find('.about-service-item-link'), {autoAlpha: 1, yPercent: 0, duration: .8, clearProps: 'all'},'<=.2')
                    }
            })
        }
        interact() {
            if(viewport.w > 767){
                $('.about-service-item').hover(
                    function () {
                        $(this).closest('.about-service-item').find('.about-service-item-img').addClass('active');
                    },
                    function () {
                        $(this).closest('.about-service-item').find('.about-service-item-img').removeClass('active');
                    }
                );

                $('.about-service-list').hover(
                    function () {
                        $('.about-service-item-ar-inner').addClass('active');
                        $(this).closest('.about-service-item').find('.about-service-item-img').addClass('active');
                    },
                    function () {
                        $('.about-service-item-ar-inner').removeClass('active');
                        $(this).closest('.about-service-item').find('.about-service-item-img').removeClass('active');
                    }
                );
            }

            const mouseTransform = () => {
                this.mouseX = pointerCurr().x;
                this.mouseY = pointerCurr().y;
                this.tarCurrX = xGetter('.about-service-item-ar');
                this.tarCurrY = yGetter('.about-service-item-ar');
                xSetter('.about-service-item-ar')(lerp(this.tarCurrX , this.mouseX - $('.about-service-item-ar-inner').width()/2, 0.1));
                ySetter('.about-service-item-ar')(lerp(this.tarCurrY , this.mouseY - $('.about-service-item-ar-inner').height()/2, 0.1));
                    this.requestId = requestAnimationFrame(mouseTransform);
            };
            if(viewport.w > 991){
                this.requestId = requestAnimationFrame(mouseTransform);
            }
        }

        destroy() {
            cancelAnimationFrame(this.requestId);
        }
    }
    let aboutService = new AboutService();
    class BlogHeroAnim{
        constructor(){
            this.tlFadeFirst;
            this.tlFadeHead;
            this.tlList;
        }
        setup(){
            let title = new SplitType('.sp-hero-title', {types: 'words lines', lineClass: 'bp-line heading-line'});
            let sub = new SplitType(' .sp-hero-sub', {types: 'words lines', lineClass: 'bp-line'});
            gsap.set(title.words, {autoAlpha: 0, yPercent: 60});
            gsap.set(sub.words, {autoAlpha: 0, yPercent: 80});
            gsap.set('.line.sp-hero-title-line', {scaleX: 0, transformOrigin: 'right'})
            this.tlFadeHead = gsap.timeline({
                paused: true,
                scrollTrigger: {
                    once: true,
                }
            })
            this.tlFadeHead
                .to(title.words, { autoAlpha: 1, yPercent: 0, duration: .6, stagger: .02})
                .to(sub.words, { autoAlpha: 1, yPercent: 0, duration: .4, stagger: .015}, '<=.2')
                .to('.line.sp-hero-title-line', {scaleX: 1, duration: 1, clearProps: 'all'}, '<=.4')
            let titleFirst = new SplitType('.blog-hero-first-item:nth-child(1) .blog-hero-first-item-title', {types: 'words lines', lineClass: 'bp-line heading-line'});
            let subFirst = new SplitType(' .blog-hero-first-item:nth-child(1) .blog-hero-first-item-sub', {types: 'words lines', lineClass: 'bp-line'});
            // let dateFirst = new SplitType('.blog-hero-first-item:nth-child(1) .blog-hero-first-item-date', {types: 'words lines', lineClass: 'bp-line'});
            gsap.set(titleFirst.words, {autoAlpha: 0, yPercent: 60});
            gsap.set(subFirst.words, {autoAlpha: 0, yPercent: 80});
            // gsap.set(dateFirst.words, {autoAlpha: 0, yPercent: 80});
            let borderRadius = $('.blog-hero-first-item:nth-child(1) .blog-hero-first-item-thumb').css('border-radius')
            gsap.set('.blog-hero-first-item:nth-child(1) .blog-hero-first-item-thumb', {autoAlpha: 0, clipPath: `inset(0% 0% 100% 100% round ${borderRadius})`});
            this.tlFadeFirst = gsap.timeline({
                paused: true,
                scrollTrigger: {
                    once: true,
                }
            })
            this.tlFadeFirst
                .to('.blog-hero-first-item:nth-child(1) .blog-hero-first-item-thumb', {autoAlpha: 1, clipPath: `inset(0% 0% 0% 0% round ${borderRadius})`, duration: 1, clearProps: 'all'})
                .to(titleFirst.words, { autoAlpha: 1, yPercent: 0, duration: .6, stagger: .02}, '<=.3')
                .to(subFirst.words, { autoAlpha: 1, yPercent: 0, duration: .4, stagger: .015}, '<=.2')
                // .to(dateFirst.words, { autoAlpha: 1, yPercent: 0, duration: .4, stagger: .015}, '<=.2')
            $('.blog-hero-item').each((idx, item) => {
                let titleItem = new SplitType($(item).find('.blog-hero-item-title'), {types: 'words lines', lineClass: 'bp-line heading-line'});
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60})
            })
            this.tlList = gsap.timeline({
                paused: true,
                scrollTrigger: {
                    once: true,
                }
            })
            gsap.set('.blog-hero-item-line-straight', {scaleX : 0, transformOrigin: 'left'})
            gsap.set('.line.blog-hero-item-line-vertical', {scaleY : 0, transformOrigin: 'top'})
            gsap.set('.blog-hero-control', {autoAlpha: 0})
            gsap.set('.blog-hero-cms-wrap .swiper-pagination', {autoAlpha: 0})
            this.tlList
                .to('.blog-hero-item-title .word', {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .4})
                .to('.blog-hero-item-line-straight', {scaleX: 1, duration: 1, stagger: .1}, '<=.2')
                .to('.line.blog-hero-item-line-vertical', {scaleY: 1, duration: 1, stagger: .1}, '<=0')
                .to('.blog-hero-control', {autoAlpha: .8, duration: 1}, '<=.6')
                .to('.blog-hero-cms-wrap .swiper-pagination', {autoAlpha: 1, duration: .6}, '<=.1')
        }
        play(){
            this.tlFadeHead.play();
            setTimeout(()=>{
                this.tlFadeFirst.play();
                this.tlList.play();
            },500)
        }
    }
    let blogHeroAnim = new BlogHeroAnim();
    class BlogHero{
        constructor(){
            this.tlTrigger;
        }
        setTrigger(){
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.blog-hero',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {

                        this.setup();
                    },
                }
            })
        }
        setup(){

            let quanlityItem = 3;
            let swiperNew = new Swiper('.blog-hero-cms', {
                spaceBetween: parseRem(20),
                slidesPerView: 1,
                grid: {
                    rows: quanlityItem,
                  },
                speed: 600,
                effect: "fade",
                fadeEffect: {
                    crossFade: true,
                  },
                // autoHeight: true,
                createElements: true,
                pagination: true,
                paginationClickable: true,
                on: {
                    init: function () {
                        let realIndex = this.realIndex;
                    activeBtnControl(realIndex);
                    },
                    slideChange: function () {
                        let realIndex = this.realIndex;
                        console.log(realIndex)
                    activeBtnControl(realIndex);
                    }
                }
            })
            function activeBtnControl(realIndex){
                console.log(realIndex)
                $('.blog-hero-control-ar-next,.blog-hero-control-ar-prev').addClass('active');
                if (realIndex === (Math.floor($('.blog-hero-cms .swiper-slide').length/3))) {
                    $('.blog-hero-control-ar-next').removeClass('active');
                } else if (realIndex === 0) {
                    $('.blog-hero-control-ar-prev').removeClass('active');
                }
            }
            $('.blog-hero-control-ar-next').on('click', function(){
                swiperNew.slideNext();
            })
            $('.blog-hero-control-ar-prev').on('click', function(){
                swiperNew.slidePrev();
            })
        }
    }
    let blogHero = new BlogHero();
    class BlogArticle{
        constructor(){
            this.tlTrigger;
            this.showInit = 4;
            this.itemsToShow=2;
        }
        setTrigger(){
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.blog-hero',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {

                        this.setup();
                    },
                }
            })
        }
        setup(){
            if(viewport.w > 991 ){
                truncateToTwoLines('.blog-article-item-desc' , 3)
                truncateToTwoLines('.blog-article-item-title', 3)
                truncateToTwoLines('.blog-hero-first-item-title', 3)
                truncateToTwoLines('.blog-hero-first-item-sub', 3)
                truncateToTwoLines('.blog-hero-item-title', 3)
            }
            else {
                truncateToTwoLines('.blog-hero-first-item-title', 2)
                truncateToTwoLines('.blog-hero-first-item-sub', 2)
                truncateToTwoLines('.blog-hero-item-title', 2)
                truncateToTwoLines('.blog-article-item-desc' , 2)
                truncateToTwoLines('.blog-article-item-title', 2)
            }
            $('.blog-article-cate-item-total-all').text($('.blog-article-item').length)
            $('.blog-article-cate-item-total-report').text($('.blog-article-item[category="Industry Reports"]').length)
            $('.blog-article-cate-item-total-new').text($('.blog-article-item[category="Industry News"]').length)
            let title = new SplitType('.blog-article-title', {types: 'lines words', lineClass: 'bp-line heading-line'});
            gsap.set(title.words, {autoAlpha: 0, yPercent: 60});
            gsap.set('.blog-article-cate-item', {autoAlpha: 0, y: 10})
            gsap.set('.blog-article .line', {autoAlpha: 0})
            let tlFade = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.blog-article-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%': 'top top+=60%',
                    once: true,
                }
            })
            tlFade
                .to(title.words, {autoAlpha: 1, yPercent: 0, duration: 1, stagger: .02})
                .to('.blog-article-cate-item', {autoAlpha: 1, y: 0, duration: .7, stagger: .1}, '<=.2')
                .to('.blog-article .line', {autoAlpha: 1, duration: 1, clearProps: 'all'}, '<=.5')
            $('.blog-article-item').each((idx, item) => {
                let borderRadius = $(item).find('.blog-article-item-thumb').css('border-radius')
                let titleItem = new SplitType($(item).find('.blog-article-item-title'), {types: 'words lines', lineClass: 'bp-line '});
                let labelItem = new SplitType($(item).find('.blog-article-item-cate'), {types: 'words lines', lineClass: 'bp-line '});
                let subItem = new SplitType($(item).find('.blog-article-item-desc'), {types: 'words lines', lineClass: 'bp-line '});
                gsap.set($(item).find('.blog-article-item-thumb'), {autoAlpha: 0, clipPath: `inset(0% 0% 100% 100% round ${borderRadius})`})
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60});
                gsap.set(labelItem.words, {autoAlpha: 0, yPercent: 80});
                gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80});
                let tlFadeItem = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: viewport.w > 767 ? 'top top+=65%': 'top top+=70%',
                        once: true,
                    }
                })
                tlFadeItem
                    .to($(item).find('.blog-article-item-thumb'), {autoAlpha: 1, clipPath: `inset(0% 0% 0% 0% round ${borderRadius})`, duration: 1, clearProps: 'all'})
                    .to(labelItem.words, {autoAlpha: 1, yPercent: 0, duration: .6, stagger: .02}, '<=0')
                    .to(titleItem.words, {autoAlpha: 1, yPercent: 0, duration: .6, stagger: .03}, '<=.2')
                    .to(subItem.words, {autoAlpha: 1, yPercent: 0, duration: .4, stagger: .02, onComplete: () => {
                        labelItem.revert();
                        subItem.revert();
                        titleItem.revert();
                    }}, '<=.2')
            })
            let tlFadeLoad = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.blog-article-loadmore-wrap',
                    start: viewport.w > 767 ? 'top top+=65%': 'top top+=50%',
                    once: true,
                }
            })
            gsap.set('.blog-article-loadmore', {autoAlpha: 0, y: 20})
            tlFadeLoad
                .to('.blog-article-loadmore', {autoAlpha: 1, y: 0, duration: 1, clearProps: 'all'})
            this.interact();
        }
        interact(){
            this.initShowItem();
            let hiddenItems = $('.blog-article-item.hidden');
            $('.blog-article-loadmore').on('click',  (e)  => {
                console.log(this.itemsToShow)
                hiddenItems.removeClass('hidden')
                ScrollTrigger.refresh();
                // hiddenItems.slice(0, this.itemsToShow).fadeIn(400).removeClass('hidden');
                // hiddenItems = $('.blog-article-item.hidden'); //update item hidden
                // this.showInit = $('.blog-article-item:not(hidden)').length;
                // if (hiddenItems.length === 0) {
                //     $($(e.currentTarget)).fadeOut(400);
                // }
            });
            $('.blog-article-cate-item').on('click', (e) => {
                let index = $(e.currentTarget).index();
                let cate = $(e.currentTarget).attr('category');
                activeItem(['.blog-article-cate-item'], index);
                this.activeArticle(cate)

            })

        }
        activeArticle(category){
            console.log(category)
            $('.blog-article-loadmore').hide();
            $('.blog-article-item').each((idx, item) => {
                $(item).removeAttr('style')
                if(category== 'all'){
                    $(item).show();
                    $(item).removeAttr('style')
                    this.initShowItem();
                    if(this.showInit < $('.blog-article-item').length )
                    $('.blog-article-loadmore').show();
                }
                else if(category == $(item).attr( 'category')){
                    $(item).show();
                    if($(item).hasClass('hidden')){
                        $(item).removeClass('hidden')
                        this.initShowItem(this.showInit)
                    }
                }
                else{
                    $(item).hide();
                }
            })
        }
        initShowItem(){
            $('.blog-article-item').each((idx, item) => {
                if(idx >= this.showInit){
                    $(item).addClass('hidden');
                }
            })
        }
    }
    let blogArticle = new BlogArticle();
    class SubpageHero{
        constructor(){
            this.data = [
                {
                    uid: 'privacy-policy',
                    title: 'Privacy Policy',
                    termly_id: '319e0d22-20e7-449c-a002-bf22aa177cb8',
                },
                {
                    uid: 'terms-and-conditions',
                    title: 'Terms & Conditions',
                    termly_id: '89061706-a2a2-4217-a4aa-a53ba72a4334',
                }
            ]
        }
        setup(){


            let page_title = $('.main').attr('data-page-title');
            let page_data = this.data.find(item => item.title === page_title);
            let page_id = page_data ? page_data.termly_id : null;
            // console.log(dataTermly)
                    // const cleanedContent = dataTermly.content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
                    // $('.sp-hero-content-inner').html(cleanedContent)
                    // $('.sp-hero-content').find('*').not('table, tr, td').removeAttr('style');
            // $.get(`https://app.termly.io/api/v1/consumer/policies/5e024fe7-a81f-47ee-a26d-ac8d0c4f845e/content?lang=en`, function (response) {
            //     try {

            //         console.log('khanh9283y48932748')
            //         // const parsed = JSON.parse(response);
            //         console.log(response)
            //         const cleanedContent = response.content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
            //         $('.sp-hero-content-inner').html(cleanedContent)
            //         $('.sp-hero-content').find('*').removeAttr('style');
            //     } catch (error) {
            //         console.error('Error parsing JSON:', error);
            //         $('.sp-hero-content-inner').html('')
            //     }
            // });
            $('.sp-hero-content').find('*').not('table, tr, td').removeAttr('style');

            let tocHeadings = $('.sp-hero-content [data-custom-class="heading_1"]');

            let tocWrap = $('.sp-hero-tocs-list-inner');
            if (tocHeadings.length <= 1) {
                tocWrap.parents('.sp-hero-toc-wrap').remove();
            }
            tocWrap.html('');
            for (let i = 0; i < tocHeadings.length; i++) {
                if(tocHeadings.eq(i).text().trim() !== ''){
                    tocHeadings.eq(i).attr('id', `toc-${i}`);
                    console.log(tocHeadings.eq(i).text())
                let tocItem = $('<a></a>').addClass('sp-hero-toc-item-wrap').attr('href', `#toc-${i}`);
                let tocName = $('<div></div>').addClass('txt txt-18 sp-hero-toc-item').text(this.formatText(tocHeadings.eq(i).text().trim()));
                tocName.appendTo(tocItem)
                tocWrap.append(tocItem);
                }
            }
            if(tocWrap.height() > $('.sp-hero-tocs-list-wrap').height()){
            $('.sp-hero-tocs-list-wrap').attr('data-lenis-prevent', true);
            }
            $('.sp-hero-toc-item-wrap').each((idx, el) => {
                gsap.from(el, {
                    autoAlpha: 0, yPercent: 70, duration: .8, stagger: 0.02, delay: idx * .05, clearProps: 'all', onComplete: () => {
                        if (idx == $('.sp-hero-toc-item-wrap').length - 1) {
                            this.interact();
                        }
                    }
                });
            })
            gsap.from('.sp-hero-content', { autoAlpha: 0, y: 30, duration: .6 });
            this.interact();
            }
        interact() {
            let tocHeadings = $('.sp-hero-content [data-custom-class="heading_1"]');

            lenis.on('scroll', function (e) {
                let currScroll = e.scroll;
                for (let i = 0; i < tocHeadings.length; i++) {
                    let top = tocHeadings.eq(i).get(0).getBoundingClientRect().top;
                    if (top > 0 && top < (viewport.h / 5)) {
                        $(`.sp-hero-toc-item-wrap[href="#toc-${i}"]`).addClass('active');
                        $(`.sp-hero-toc-item-wrap`).not(`[href="#toc-${i}"]`).removeClass('active');
                    }
                }
            });

            $('.sp-hero-toc-item-wrap').on('click', function (e) {
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
                    $(`.sp-hero-toc-item-wrap[href='${currToc}']`).trigger('click');
                }, 10)
            }
            else {
                history.replaceState({}, '', window.location.pathname);
            }
        }
        formatText(text) {
            text = text.toLowerCase();
            if (/^\d+\.\s/.test(text)) {
              return text.replace(/(^\d+\.\s*)(\w)(.*)/, (match, prefix, firstLetter, rest) => {
                return prefix + firstLetter.toUpperCase() + rest;
              });
            } else {
              return text.replace(/(^\w)(.*)/, (match, firstLetter, rest) => {
                return firstLetter.toUpperCase() + rest;
              });
            }
        }
    }
    let subpageHero = new SubpageHero();
    class ContactHero {
        constructor(){
            this.errorEmail = true;
            this.tlFade;
        }
        setup(){
            let title = new SplitType('.contact-hero-title', {types: "lines, words", lineClass: "bp-line heading-line"});
            let titleForm = new SplitType('.contact-hero-form-title', {types: "lines, words", lineClass: "bp-line heading-line"});

            this.tlFade = new gsap.timeline({
                paused: true
            })
            gsap.set(title.words, {autoAlpha: 0, yPercent: 60});
            gsap.set(titleForm.words, {autoAlpha: 0, yPercent: 60});
            gsap.set('.contact-hero-img', {autoAlpha: 0, y: 15})
            gsap.set('.contact-hero-form-input-wrap', {autoAlpha : 0})
            gsap.set('.contact-hero-form-title-line', {autoAlpha : 0})
            gsap.set('.contact-hero-line', {scaleX : 0, transformOrigin: 'left'})
            this.tlFade
                .to(title.words , {autoAlpha: 1, yPercent: 0, duration: .6, stagger: .02})
            $('.contact-hero-info-item').each((idx, item) => {
                let titleItem = new SplitType($(item).find('.contact-hero-info-title'), {types: "lines, words", lineClass: "bp-line heading-line"})
                let labelItem = new SplitType($(item).find('.contact-hero-info-label'), {types: "lines, words", lineClass: "bp-line"})
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60})
                gsap.set(labelItem.words, {autoAlpha: 0, yPercent: 80})
                this.tlFade
                    .to(labelItem.words, {autoAlpha: 1, yPercent: 0, duration: .4, stagger: .015}, '<=.2')
                if(idx === 0){
                    this.tlFade
                        .to('.contact-hero-img', {autoAlpha: 1, duration: 1, y: 0, clearProps: 'all'}, '<=0')
                        .to('.contact-hero-line', {scaleX : 1, duration: 1.2, clearProps: 'all'}, '<=0')
                }
                this.tlFade
                    .to(titleItem.words, {autoAlpha: 1, yPercent: 0, duration: .4, stagger: .015}, '<=.2')

            })
            let tlForm = gsap.timeline({
                scrollTrigger: {
                    trigger: '.contact-hero-form-inner',
                    start: viewport.w > 767 ? 'top top+=60%' : 'top top+=45%',
                    once: true,
                }
            })
            tlForm
                .to(titleForm.words, {autoAlpha: 1, yPercent: 0, duration: .7, stagger: .03})
                .to('.contact-hero-form-input-wrap', {autoAlpha: 1, duration: 1, clearProps: 'all'}, '<=.3')
                .to('.contact-hero-form-title-line', {autoAlpha: 1, duration: 1, clearProps: 'all'}, '<=0')
            this.interact();
        }
        play(){
            this.tlFade.play();
        }
        interact(){
            $('.contact-hero-form-input, .contact-hero-form-textarea').on('change', (e)=>{
                if($(e.currentTarget).val() !== ''){
                    $(e.currentTarget).closest('.contact-hero-form-input-inner').addClass('active');
                }
                else{
                    $(e.currentTarget).closest('.contact-hero-form-input-inner').removeClass('active');
                }
            this.checkInputs();

            })
            $('.contact-hero-form-input[name="Email"]').on('blur', (e) =>{
                if($(e.currentTarget).val() !== '' && !isValidEmail($(e.currentTarget).val())) {
                    $(e.currentTarget).closest('.contact-hero-form-input-inner').addClass('error');
                    this.errorEmail = true;
                } else {
                    $(e.currentTarget).closest('.contact-hero-form-input-inner').removeClass('error');
                    this.errorEmail = false;
                }

            });
            $('.contact-hero-form-select-val').on('click', function(){
                $(this).closest('.contact-hero-form-select').toggleClass('active')
            })
            $(document).on('click', function(e) {
                if (!$(this).closest('.contact-hero-form-select-drop, .contact-hero-form-select-val').length) {
                    $('.contact-hero-form-select-drop').removeClass('active');
                }
            });
            $('.contact-hero-form-select-drop-item').on('click', function(){
                if(!$('.contact-hero-form-select-label').hasClass('active')){
                    $('.contact-hero-form-select-label').addClass('active')
                }
                $('.contact-hero-form-select-input').val($(this).text());
                $('.contact-hero-form-select-drop-item').removeClass('active')
                $(this).addClass('active');
                $('.contact-hero-form-select').removeClass('active');
                gsap.from('.contact-hero-form-select-txt', {autoAlpha: 0, duration: .8})
                    $('.contact-hero-form-select-txt').text($(this).text());
            })
            if(viewport.w < 767){
                $('.contact-hero-form-select-txt-wrap').on('click', function(){
                    $('.contact-hero-form-select-drop').slideToggle();
                })
                $(document).on('click', function(e){
                    if(!$(e.target).closest('.contact-hero-form-select').length){
                        $('.contact-hero-form-select-drop').slideUp();
                        $('.contact-hero-form-select-drop').closest('.contact-hero-form-select').removeClass('active')
                    }
                })
                $('.contact-hero-form-select-drop-item').on('click', function(e){
                        $('.contact-hero-form-select-drop').slideUp();
                        $('.contact-hero-form-select-drop').closest('.contact-hero-form-select').removeClass('active')
                })
                $('.contact-hero-form-textarea').on('input', function () {
                    $(this).css('height', 'auto');
                    $(this).css('height', (this.scrollHeight + 1) + 'px');
                })
                $('.contact-hero-form-textarea').on('blur', function(){
                    if($(this).val() == ''){
                        $(this).css('height', 'auto');
                    }
                })
            }
            function checkDisplay() {
                var $element = $('.contact-hero-form-success');
                if ($element.css('display') === 'block') {
                    $('.contact-form-username').text($('.contact-hero-form-input[name="First-Name"]').val() + ' ' + $('.contact-hero-form-input[name="Last-Name"]').val())
                    $('.contact-hero-form-success').addClass('active');
                    $('.contact-hero-form-inner').addClass('hidden')
                    $('html, body').animate({
                        scrollTop: $('.contact-hero-form-success-title-wrap').offset().top
                    }, 1000);
                    return;
                }
                requestAnimationFrame(checkDisplay);
            }
            checkDisplay()
        }
        checkInputs() {
            var allFilled = true;
            $('.contact-hero-form-input.required, .contact-hero-form-textarea').each((idx, item) =>{
                if ($(item).val().trim() === '') {
                    allFilled = false;
                    return;
                }
            });
            if (allFilled && !this.errorEmail) {
                $('.contact-hero-form-submit-inner').addClass('active');
            } else {
                $('.contact-hero-form-submit-inner').removeClass('active');
            }
            requestAnimationFrame(this.checkInputs.bind(this))
        }

    }
    let contactHero = new ContactHero();
    class AppHero{
        constructor() {
            this.tlFade;
        }
        setup(){
            this.tlFade = new gsap.timeline({
                paused: true,
                scrollTrigger: {
                    once: true,
                },
                onComplete: () => {
                    gsap.to(".appr-hero-img-inner.appr-hero-img-main", {
                        y: 10,
                        duration: 2.2,
                        repeat: -1,
                        yoyo: true,
                        ease: "power1.inOut",

                    });
                    gsap.to(".appr-hero-img-inner.appr-hero-img-inner-big", {
                        y: 30,
                        duration: 2.2,
                        repeat: -1,
                        yoyo: true,
                        ease: "power1.inOut",

                        stagger: {
                            amount: 0.2,
                            from: "center"
                        },

                    });
                    gsap.to(".appr-hero-img-inner.appr-hero-img-inner-md", {
                        y: 30,
                        duration: 2,
                        repeat: -1,
                        yoyo: true,
                        ease: "power1.inOut",
                        stagger: {
                            amount: 0.6,
                            from: "center"
                        },

                    });
                    gsap.to(".appr-hero-img-inner.appr-hero-img-inner-sm", {
                        y: 30,
                        duration: 1.6,
                        repeat: -1,
                        yoyo: true,
                        ease: "power1.inOut",
                        stagger: {
                            amount: 0.4,
                            from: "center"
                        },

                    });

                }
            })
            let title = new SplitType('.appr-hero-title', {types: "lines, words", lineClass: "bp-line heading-line"})
            gsap.set(title.words, {autoAlpha: 0, yPercent: 80})
            gsap.set('.appr-hero-img-inner', {autoAlpha: 0, scale: .6 })
            gsap.set('.appr-hero-img-clip-path', {autoAlpha: 0, clipPath: 'circle(20% at 50% 50%)'})
            this.tlFade
                .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
                .to('.appr-hero-img-inner.appr-hero-img-main', {autoAlpha: 1, scale: 1, duration: .8, clearProps: 'all'}, '<=.2')
                .to('.appr-hero-img-main .appr-hero-img-clip-path', {autoAlpha: 1, clipPath: 'circle(50% at 50% 50%)', duration: .6, clearProps: 'all'}, '<=.2')
                .to('.appr-hero-img-inner:not(.appr-hero-img-main)', {autoAlpha: 1, scale: 1, duration: .6, stagger: {from: "random", amount: .3}, clearProps: 'all'}, '<=.4')
                .to('.appr-hero-img-inner:not(.appr-hero-img-main) .appr-hero-img-clip-path', {autoAlpha: 1, clipPath: 'circle(50% at 50% 50%)', duration: .6, clearProps: 'all'}, '<=.4')
        }
        play(){
            this.tlFade.play();
        }
    }
    let appHero = new AppHero();
    class AppPackage{
        constructor(){
            this.tlTrigger;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.appr-package',
                    start: 'top bottom+=50%',
                    end: 'bottom+=50% top',
                    once: true,
                    onEnter: () => {
                        this.setup()
                    },
                }
            })
        }
        setup(){
            $('.appr-package-item').each((idx, item) => {
                let titleItem = new SplitType($(item).find('.appr-package-item-title'), {types: "lines, words", lineClass: "bp-line heading-line"});
                let subItem = new SplitType($(item).find('.appr-package-item-sub'), {types: "lines, words", lineClass: "bp-line"});
                let tlItem = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start : viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                        once: true,
                    }
                })
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60})
                gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80})
                gsap.set($(item).find('.appr-package-item-img'), {autoAlpha: 0, scale : .7})
                gsap.set($(item).find('.appr-package-item-img-inner'), {autoAlpha: 0, clipPath: 'circle(40% at 50% 50%)'})
                tlItem
                    .to(titleItem.words, {autoAlpha : 1, yPercent: 0, stagger: .02, duration: .6})
                    .to(subItem.words, {autoAlpha : 1, yPercent: 0, stagger: .015, duration: .4}, '<=.2')
                    .to($(item).find('.appr-package-item-img'), {autoAlpha: 1, scale: 1, duration: viewport.w > 767 ? 1.2 : .6, clearProps: 'all'}, viewport.w > 767 ? '<=0' : '<=.3')
                    .to($(item).find('.appr-package-item-img-inner'), {autoAlpha: 1, clipPath: 'circle(50% at 50% 50%)', duration: viewport.w > 767 ? 1.2 : .6, clearProps: 'all'}, viewport.w > 767 ? '<=0' : '<=.1')
            })
        }
    }
    let appPackage = new AppPackage();
    class AppValue{
        constructor(){
            this.tlTrigger;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.appr-value',
                    start: 'top bottom+=50%',
                    end: 'bottom+=50% top',
                    once: true,
                    onEnter: () => {
                        this.setup()
                    },
                }
            })
        }
        setup(){
            let title = new SplitType('.appr-value-title', {types: "lines, words", lineClass: "bp-line heading-line"});
            gsap.set(title.words, {autoAlpha: 0, yPercent: 60})
            let tlFade = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.appr-value-title-wrap',
                    start : viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true,
                }
            })
            tlFade
                .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: 0.02, duration: .6})
            $('.appr-value-item').each((idx, item) => {
                let tlItem = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                        once: true,
                    }
                })
                let titleItem = new SplitType($(item).find('.appr-value-item-title'), {types: 'words lines', lineClass: 'bp-line heading-line'});
                let subItem = new SplitType($(item).find('.appr-value-item-sub'), {types: 'words lines', lineClass: 'bp-line'});
                gsap.set($(item).find('.appr-value-item-ic'), {autoAlpha: 0, scale: .6})
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60})
                gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80})
                if($(item).find('.appr-value-item-line').length >0){
                    gsap.set($(item).find('.appr-value-item-line'), {scaleX: 0, transformOrigin: 'left'})
                }
                tlItem
                    .to($(item).find('.appr-value-item-ic'), {autoAlpha: 1, scale: 1, duration: .8})
                if($(item).find('.appr-value-item-line').length >0){
                    tlItem
                        .to($(item).find('.appr-value-item-line'), {scaleX: 1, duration: 1, clearProps: 'all'}, '<=0')
                }
                tlItem
                    .to(titleItem.words, {autoAlpha: 1, yPercent: 0, duration: .6, stagger: .02}, '<=.2')
                    .to(subItem.words, {autoAlpha: 1, yPercent: 0, duration: .4, stagger: .015}, '<=.2')
            })
        }
    }
    let appValue = new AppValue();
    class AppDevelop {
        constructor(){
            this.tlTrigger;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.appr-developer',
                    start: 'top bottom+=50%',
                    end: 'bottom+=50% top',
                    once: true,
                    onEnter: () => {
                        this.setup()
                    },
                }
            })
        }
        setup(){
            let title = new SplitType('.appr-developer-title', {types: "lines, words", lineClass: "bp-line heading-line"});
            let sub = new SplitType('.appr-developer-sub', {types: "lines, words", lineClass: "bp-line "});
            gsap.set(title.words, {autoAlpha: 0, yPercent: 60})
            gsap.set(sub.words, {autoAlpha: 0, yPercent: 80})
            let tlFade = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.appr-developer-title-wrap',
                    start : viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true,
                }
            })
            tlFade
                .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
                .to(sub.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.2')
            $('.appr-developer-item').each((idx, item) => {
                replaceHyphen($(item).find('.appr-developer-item-sub'))
                let titleItem = new SplitType($(item).find('.appr-developer-item-title'), {types: "lines, words", lineClass: "bp-line heading-line"});
                let subItem = new SplitType($(item).find('.appr-developer-item-sub'), {types: "lines, words", lineClass: "bp-line "});
                gsap.set($(item).find('.appr-developer-item-ic'), {autoAlpha: 0, scale: .6})
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60})
                gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80})
                let tlFadeItem = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start : viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                        once: true,
                    }
                })
                tlFadeItem
                    .to($(item).find('.appr-developer-item-ic'), {autoAlpha: 1, scale: 1, duration: .6, clearProps: 'all'})
                    .to(titleItem.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=.2')
                    .to(subItem.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4, onComplete: () => {
                        subItem.revert();
                    }}, '<=.2')
            })
            let titleFood = new SplitType('.appr-developer-food-title', {types: "lines, words", lineClass: "bp-line heading-line"});
            let subFood = new SplitType('.appr-developer-food-sub', {types: "lines, words", lineClass: "bp-line"});
            let tlFood = new gsap.timeline({
                scrollTrigger: {
                    trigger: viewport.w > 767 ? '.appr-developer-food-img' :'.appr-developer-food-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true
                },
                onComplete: () => {
                    subFood.revert();
                }
            })
            gsap.set(titleFood.words, {autoAlpha: 0, yPercent: 60})
            gsap.set(subFood.words, {autoAlpha: 0, yPercent: 80})
            gsap.set('.appr-developer-food-link', {autoAlpha: 0, yPercent: 80})
            tlFood
                .to(titleFood.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
                .to(subFood.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=.2')
                .to('.appr-developer-food-link', {autoAlpha: 1, yPercent: 0,  duration: .6, clearProps: 'all' }, '<=.4')
            gsap.set('.appr-developer-food-img', {autoAlpha: 0, clipPath: 'circle(30% at 50% 50%)'})
            let tlFoodImg = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.appr-developer-food-img',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true
                }
            })
                tlFoodImg
                    .to('.appr-developer-food-img', {autoAlpha: 1, clipPath: 'circle(50% at 50% 50%)', duration: 1, clearProps: 'all'})
        }
    }
    let appDevelop = new AppDevelop();
    class AppKey{
        constructor(){
            this.tlTrigger;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.appr-key',
                    start: 'top bottom+=50%',
                    end: 'bottom+=50% top',
                    once: true,
                    onEnter: () => {
                        this.setup()
                    },
                }
            })
        }
        setup(){
            let title = new SplitType('.appr-key-title', {types: "lines, words", lineClass: "bp-line heading-line"});
            gsap.set(title.words, {autoAlpha: 0, yPercent: 60});
            let tlFade = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.appr-key-title-wrap',
                    start : viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true,
                }
            })
            tlFade
                .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: 0.02, duration: .6})
            $('.appr-key-item').each((idx, item) => {
                let titleItem = new SplitType($(item).find('.appr-key-item-title'), {types: "lines, words", lineClass: "bp-line heading-line"});
                let subItem = new SplitType($(item).find('.appr-key-item-sub'), {types: "lines, words", lineClass: "bp-line"});
                let tlItem = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start : viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                        once: true,
                    }
                })
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60})
                gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80})
                gsap.set($(item).find('.appr-key-item-ic'), {autoAlpha: 0, scale: .6})
                tlItem
                    .to($(item).find('.appr-key-item-ic'), {autoAlpha : 1, scale : 1, duration: .8, clearProps: 'all'})
                    .to(titleItem.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=.2')
                    .to(subItem.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4, onComplete: () => {
                        subItem.revert();
                    }}, '<=.2')
            })
        }
    }
    let appKey = new AppKey();
    class AppConcept{
        constructor(){
            this.tlTrigger;
            this.tlFade;
        }
        setTrigger(){
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.appr-concept',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.setup()
                    },
                }
            })
        }
        setup(){
            $('.appr-concept-title').addClass('heading-has-span')
            spanGreen('.appr-concept-title .txt-cl-green')
            let title = new SplitType('.appr-concept-title', {types: 'words lines', lineClass:'bp-line heading-line'})
            addSpaceToText('.appr-concept-title .sp-special .word')
            gsap.set(title.words, {autoAlpha: 0, yPercent: 80})
            this.tlFade = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.appr-concept-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%': 'top top+=45%',
                    once: true,
                },
            })
            this.tlFade
                .to(title.words,{yPercent: 0, autoAlpha: 1, stagger: .02, duration: .6})

        }
    }
    let appConcept = new AppConcept();
    class AppProduct {
        constructor() {
            this.tlTrigger;
            this.allItems;
            this.tlFadeHead;
            this.requestId;
        }
        setTrigger() {

            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.appr-product',
                    start: 'top bottom+=50%',
                    end: 'bottom+=50% top',
                    once: true,
                    onEnter: () => {
                        this.setup()
                    },
                }
            })
        }
        setup() {
            $('.appr-product-cate-cms').each((idx, item) => {
                $(item).find('.appr-product-cate-item').each((idxCate, itemCate) => {
                    if(idxCate + 1 <= 9){
                        $(itemCate).find('.appr-product-item-number').text(`0${idxCate + 1}`)
                    }
                    else{
                        $(itemCate).find('.appr-product-item-number').text(idxCate + 1)

                    }
                })
            })
            const swiperFood = [];
            if(viewport.w < 992){
                $('.appr-product-cate').each((idx, item) => {
                    $(item).find('.appr-product-cate-cms').addClass('swiper');
                    $(item).find('.appr-product-cate-cms').append('<div class="pr-food-cate-scrollbar swiper-scrollbar"></div>');
                    $(item).find('.appr-product-cate-list').addClass('swiper-wrapper');
                    $(item).find('.appr-product-cate-item').addClass('swiper-slide');
                    swiperFood[idx] = new Swiper($(item).find('.appr-product-cate-cms').get(0), {
                        spaceBetween: 0,
                        slidesPerView: "auto",
                        speed: 500,
                        scrollbar: {
                            el: $(item).find('.pr-food-cate-scrollbar')
                        }
                    })
                })

            }
            const title = new SplitType('.appr-product-title', {types: 'lines, words', lineClass: 'bp-line heading-line'})
            const sub = new SplitType('.appr-product-sub', {types: 'lines, words', lineClass: 'bp-line'})
            gsap.set(title.words, {autoAlpha: 0, yPercent: 60})
            gsap.set(sub.words, {autoAlpha: 0, yPercent: 80})
            this.tlFadeHead = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.appr-product',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true,
                },
                onComplete: () => {
                    // title.revert();
                    sub.revert();
                }
            })
            this.tlFadeHead
                .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .8}, '<=.2')
                .to(sub.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .4}, '<=.2')
            let allCate = $('.appr-product-cate');
            allCate.each((idx, item) => {
                let tlItemCate = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                        once: true
                    },
                })
                let itemCate = $(item).find('.appr-product-cate-item');
                itemCate.each((idx, itemCateInner) => {
                    let itemCateInnerTitle = new SplitType($(itemCateInner).find('.appr-product-item-name'), {types: 'lines, words', lineClass: 'bp-line'});
                    if(viewport.w > 992){
                        tlItemCate
                        .from($(itemCateInner).find('.appr-product-item-number'), {autoAlpha: 0, yPercent: 80, duration: .4, clearProps: 'all'}, '<=0')
                        .from($(itemCateInner).find('.appr-product-item-line'), {autoAlpha: 0, scaleX: 0, transformOrigin: 'left', duration: 1, clearProps: 'all'}, '<=0')
                        .from(itemCateInnerTitle.words, {autoAlpha: 0, yPercent: 80, duration: .4, stagger: .02, onComplete : () => {
                            itemCateInnerTitle.revert();
                        }}, '<=.2')
                    }
                    else{
                        gsap.set($(itemCateInner).find('.appr-product-cate-item-thumb'), {autoAlpha: 0, clipPath: 'circle(30% at 50% 50%)'})
                        tlItemCate
                            .from(itemCateInnerTitle.words, {autoAlpha: 0, yPercent: 80, duration: .4, stagger: .02}, '<=0')
                            .to($(itemCateInner).find('.appr-product-cate-item-thumb'), {autoAlpha: 1, clipPath: 'circle(50% at 50% 50%)', duration: .6, clearProps: 'all', onComplete : () => {
                                itemCateInnerTitle.revert();
                            }}, '<=.2')
                    }
                        // .from($(itemCateInner).find('.appr-product-item-ic'), {autoAlpha: 0, duration: .4,yPercent: 50, clearProps: 'all'}, '<=.2')
                })
            })
            this.interact()

        }
        interact() {
            function initMouseMove() {
                if (isInViewport('.appr-product-cate-cms')) {
                    if ($('.appr-product-cate-item:hover').length > 0) {
                        !$('.appr-product-thumb-inner').hasClass('active') && $('.appr-product-thumb-inner').addClass('active');
                        if (!$(`.appr-product-thumb-item[data-name="${$('.appr-product-cate-item:hover').attr('data-name')}"]`).hasClass('active')) {
                            $('.appr-product-thumb-item').removeClass('active');
                            $(`.appr-product-thumb-item[data-name="${$('.appr-product-cate-item:hover').attr('data-name')}"]`).addClass('active');
                        }
                    } else {
                        $('.appr-product-thumb-inner').hasClass('active') && $('.appr-product-thumb-inner').removeClass('active');
                    }
                    let tarCurrX = xGetter('.appr-product-thumb');
                    let tarCurrY = yGetter('.appr-product-thumb');
                    let tarX = ((pointerCurr().x - $('.appr-product-cate-cms').get(0).getBoundingClientRect().left - $('.appr-product-title-wrap').get(0).getBoundingClientRect().width) / $('.appr-product-cate-cms').get(0).getBoundingClientRect().width) * $('.appr-product-thumb-inner').width() * .25;
                    let tarY = pointerCurr().y - $('.appr-product-cate-cms').get(0).getBoundingClientRect().top;
                    xSetter('.appr-product-thumb')(lerp(tarCurrX, tarX, 0.04));
                    ySetter('.appr-product-thumb')(lerp(tarCurrY, tarY, 0.04));
                }
                requestAnimationFrame(initMouseMove);
            }
            this.requestId = requestAnimationFrame(initMouseMove);
        }
        destroy(){
            cancelAnimationFrame(this.requestId)
        }
    }
    let appProduct = new AppProduct();
    class AppCustomer{
        constructor(){
            this.tlTrigger;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.appr-customer',
                    start: 'top bottom+=50%',
                    end: 'bottom+=50% top',
                    once: true,
                    onEnter: () => {
                        this.setup()
                    },
                }
            })
        }
        setup(){
            let title = new SplitType('.appr-customer-title', {types: "lines, words", lineClass: "bp-line heading-line"})
            gsap.set(title.words, {autoAlpha: 0, yPercent:60});
            let tlFade = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.appr-customer-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=60%',
                    once: true,
                }
            })
            tlFade
                .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6});
            $('.appr-customer-item').each((idx, item) => {
                replaceHyphen($(item).find('.appr-customer-item-sub'));
                $(item).find('.appr-customer-item-sub').addClass('inline')
                let titleItem = new SplitType($(item).find('.appr-customer-item-title'), {types: "lines, words", lineClass: "bp-line heading-line"})
                let subItem = new SplitType($(item).find('.appr-customer-item-sub'), {types: "lines, words", lineClass: "bp-line "})
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60})
                gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80})
                gsap.set($(item).find('.appr-customer-item-ic'), {autoAlpha: 0, scale: .6})
                let tlItem = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                        once: true,
                    }
                })
                tlItem
                    .to($(item).find('.appr-customer-item-ic'), {autoAlpha: 1, scale: 1, duration: .8, clearProps: 'all'})
                    .to(titleItem.words,  {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=.2')
                    .to(subItem.words,  {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .4, onComplete: () => {
                        subItem.revert();
                    }}, '<=.2')
            })
            this.interact();
        }
        interact(){
            this.requestId = requestAnimationFrame(()=>updateMarquee('.appr-customer-bg-top'));
        }
        destroy(){
            cancelAnimationFrame(this.requestId);
        }
    }
    let appCustomer = new AppCustomer();
    class AppBenefit{
        constructor(){
            this.tlTrigger;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.appr-benefit',
                    start: 'top bottom+=50%',
                    end: 'bottom+=50% top',
                    once: true,
                    onEnter: () => {
                        this.setup();
                    },
                }
            })
        }
        setup(){
            let title = new SplitType('.appr-benefit-title', {types: "lines, words", lineClass: "bp-line heading-line"})
            gsap.set(title.words, {autoAlpha: 0, yPercent:60});
            let tlFade = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.appr-benefit-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true,
                }
            })
            tlFade
                .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6});
            $('.appr-benefit-item').each((idx, item) => {
                let titleItem = new SplitType($(item).find('.appr-benefit-item-title'), {types: "lines, words", lineClass: "bp-line heading-line"})
                let subItem = new SplitType($(item).find('.appr-benefit-item-sub'), {types: "lines, words", lineClass: "bp-line "})
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60})
                gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80})
                gsap.set($(item).find('.appr-benefit-item-ic'), {autoAlpha: 0, scale: .6})
                let tlItem = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                        once: true,
                    }
                })
                tlItem
                    .to($(item).find('.appr-benefit-item-ic'), {autoAlpha: 1, scale: 1, duration: .8, clearProps: 'all'})
                    .to(titleItem.words,  {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=.2')
                    .to(subItem.words,  {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .4, onComplete: () => {
                        subItem.revert();
                    }}, '<=.2')
            })
        }
    }
    let appBenefit = new AppBenefit();
    class BlogDetailHero{
        constructor(){
        }
        setup(){
            $('.share-facebook').on('click', function(e) {
                e.preventDefault();
                var currentUrl = window.location.href;
                var facebookShareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(currentUrl);
                window.open(facebookShareUrl, 'facebook-share-dialog', 'width=800,height=600');
            });
                $('.share-linkedin').on('click', function (e) {
                    e.preventDefault();

                    const shareUrl = window.location.href;
                    const metaDescription = document.querySelector('meta[name="description"]');
                    const shareSummary = metaDescription ? metaDescription.content : '';
                    const shareSource = window.location.hostname;
                    const shareTitle = $('.tp-blog-hero-title').text()
                    const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}&summary=${encodeURIComponent(shareSummary)}&source=${encodeURIComponent(shareSource)}`;

                    window.open(linkedinShareUrl, '_blank', 'width=600,height=400');
                });

            $('.share-x').on('click', function (e) {
                e.preventDefault();
                const tweetText = $('.tp-blog-hero-title').text();
                const tweetUrl = window.location.href;
                    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(tweetUrl)}`;
                    window.open(twitterShareUrl, '_blank', 'width=600,height=400');
            });
            if(viewport.w > 991 ){
                truncateToTwoLines('.tp-blog-relate-item-title' , 3)
                truncateToTwoLines('.tp-blog-relate-item-desc', 3)
            }
            else {
                truncateToTwoLines('.tp-blog-relate-item-title' , 2)
                truncateToTwoLines('.tp-blog-relate-item-desc', 2)
            }
        }
    }
    let blogDetailHero = new BlogDetailHero();
    class PrHero{
        constructor() {
            this.tlFade;
        }
        setup(){
            this.tlFade = new gsap.timeline({
                paused: true,
                scrollTrigger: {
                    once: true,
                },
                onComplete: () => {
                    gsap.to(".appr-hero-img-inner.appr-hero-img-main", {
                        y: 10,
                        duration: 2.2,
                        repeat: -1,
                        yoyo: true,
                        ease: "power1.inOut",

                    });
                    gsap.to(".pr-hero-img-inner.pr-hero-img-inner-big", {
                        y: 30,
                        duration: 2.2,
                        repeat: -1,
                        yoyo: true,
                        ease: "power1.inOut",

                        stagger: {
                            amount: 0.2,
                            from: "center"
                        },

                    });
                    gsap.to(".pr-hero-img-inner.pr-hero-img-inner-md", {
                        y: 30,
                        duration: 2,
                        repeat: -1,
                        yoyo: true,
                        ease: "power1.inOut",
                        stagger: {
                            amount: 0.6,
                            from: "center"
                        },

                    });
                    gsap.to(".pr-hero-img-inner.pr-hero-img-inner-sm", {
                        y: 30,
                        duration: 1.6,
                        repeat: -1,
                        yoyo: true,
                        ease: "power1.inOut",
                        stagger: {
                            amount: 0.4,
                            from: "center"
                        },

                    });

                }
            })
            let title = new SplitType('.appr-hero-img-main-title', {types: "lines, words", lineClass: "bp-line heading-line"})
            gsap.set(title.words, {autoAlpha: 0, yPercent: 60})
            gsap.set('.pr-hero-img-inner', {autoAlpha: 0, scale: .6 })
            gsap.set('.appr-hero-img-inner', {autoAlpha: 0, scale: .8 })
            gsap.set('.pr-hero-img-clip-path', {autoAlpha: 0, clipPath: 'circle(20% at 50% 50%)'})
            this.tlFade
                .to('.appr-hero-img-inner.appr-hero-img-main', {autoAlpha: 1, scale: 1, duration: .8, clearProps: 'all'})
                .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .03, duration: .6, clearProps: 'all'}, '<=.2')
                .to('.pr-hero-img-inner:not(.pr-hero-img-main)', {autoAlpha: 1, scale: 1, duration: .6, stagger: {from: "random", amount: .3}, clearProps: 'all'}, '<=.2')
                .to('.pr-hero-img-clip-path', {autoAlpha: 1, clipPath: 'circle(50% at 50% 50%)', duration: .6}, '<=.4')
        }
        play(){
            this.tlFade.play();
        }
    }
    let prHero = new PrHero();
    class PrCustomer{
        constructor(){
            this.tlTrigger;
            this.requestId;
        }
        setTrigger(){
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.pr-customer',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.setup()
                    },
                }
            })
        }
        setup(){
            let title = new SplitType('.pr-customer-title', {types: "lines, words", lineClass: "bp-line heading-line"})
            let sub = new SplitType('.pr-customer-sub', {types: "lines, words", lineClass: "bp-line"})
            gsap.set(title.words, {autoAlpha: 0, yPercent:60});
            gsap.set(sub.words, {autoAlpha: 0, yPercent:80});
            let tlFade = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.pr-customer-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=50%',
                    once: true,
                }
            })
            tlFade
                .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
                .to(sub.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.2');
            gsap.set('.pr-customer-img-inner', {autoAlpha: 0})
            gsap.set('.pr-customer-img', {autoAlpha: 0, clipPath: 'circle(30% at 50% 50%)'})
            gsap.set('.pr-customer-img-deco', {autoAlpha: 0, clipPath: 'circle(20% at 50% 50%)'})
            let tlFadeImg = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.pr-customer-img-wrap',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=50%',
                    once: true,
                }
            })
            tlFadeImg
                .to('.pr-customer-img-inner', {autoAlpha: 1, duration: 1, clearProps: 'all'})
                .to('.pr-customer-img', {autoAlpha: 1, clipPath: 'circle(50% at 50% 50%)', duration: .6, clearProps: 'all'}, '<=.2')
                .to('.pr-customer-img-deco', {autoAlpha: 1, clipPath: 'circle(50% at 50% 50%)', duration: .6, clearProps: 'all'}, '<=.2')
            this.interact();
        }
        interact(){
            this.requestId = requestAnimationFrame(()=>updateMarquee('.pr-customer-bg-top'));
        }
        destroy(){
            cancelAnimationFrame(this.requestId);
        }
    }
    let prCustomer = new PrCustomer();
    class PrSpec {
        constructor(){
            this.tlTrigger;
        }
        setTrigger(){
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.pr-spec',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.setup()
                    },
                }
            })
        }
        setup(){
            let title = new SplitType('.pr-spec-title', {types: "lines, words", lineClass: "bp-line heading-line"})
            let sub = new SplitType('.pr-spec-sub', {types: "lines, words", lineClass: "bp-line"})
            gsap.set(title.words, {autoAlpha: 0, yPercent:60});
            gsap.set(sub.words, {autoAlpha: 0, yPercent:80});
            gsap.set('.pr-spec-title-line', {scaleX : 0, transformOrigin: 'left'})
            gsap.set('.pr-spec-main-content-sub', {autoAlpha : 0})
            let tlFade = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.pr-spec-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true,
                },
                onComplete: () => {
                    sub.revert();
                }
            })
            tlFade
                .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
                .to(sub.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.0')
                .to('.pr-spec-title-line', {scaleX: 1, duration: .4, clearProps: 'all'}, '<=.2')
            $('.pr-spec-main-content-inner').each((idx, item) => {
                let titleItem = new SplitType($(item).find('.pr-spec-main-content-title'), {types: "lines, words", lineClass: "bp-line heading-line"})
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent:60});
                if($(item).find('.pr-spec-main-content-line').length > 0){
                    gsap.set($(item).find('.pr-spec-main-content-line'), {scaleX : 0, transformOrigin: 'left'})
                }
                if($(item).find('.pr-spec-main-content-btn').length > 0){
                    gsap.set($(item).find('.pr-spec-main-content-btn'), {autoAlpha : 0, y: 30,  transformOrigin: 'left'})
                }
                $(item).find('.pr-spec-main-content-sub').each((idxSub, itemSub) => {
                    let itemSubContent = new SplitType(itemSub, {types: "lines, words", lineClass: "bp-line"})
                    gsap.set(itemSubContent.words, {autoAlpha: 0, yPercent:80});

                })
                let tlFadeItem = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                        once: true,
                    },
                })
                tlFadeItem
                    .to(titleItem.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
                    .to($(item).find('.pr-spec-main-content-sub'), {autoAlpha: 1, stagger: .1, duration: .2}, '<=.0')
                    .to($(item).find('.pr-spec-main-content-sub .word'), {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.2')
                if($(item).find('.pr-spec-main-content-line').length > 0){
                    tlFadeItem
                        .to($(item).find('.pr-spec-main-content-line'), {autoAlpha: 1, scaleX: 1, duration: .6, clearProps: 'all'}, '>=-.2')
                }
                if($(item).find('.pr-spec-main-content-btn').length > 0){
                    tlFadeItem
                        .to($(item).find('.pr-spec-main-content-btn'), {autoAlpha: 1, y: 0, duration: .6, clearProps: 'all'}, '>=-.2')
                }
            })
            gsap.set('.pr-spec-main-img', {autoAlpha: 0, clipPath: 'circle(30% at 50% 50%)'})
            let tlFadeImg = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.pr-spec-main-img-wrap',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true,
                }
            })
            tlFadeImg
                .to('.pr-spec-main-img', {autoAlpha: 1,  clipPath: 'circle(50% at 50% 50%)', duration: .6, clearProps: 'all'})
        }
    }
    let prSpec = new PrSpec();
    class PrProduct{
        constructor(){
            this.tlTrigger;
        }
        setTrigger(){
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.pr-product',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.setup()
                    },
                }
            })
        }
        setup(){
            if(viewport.w < 768){
                $('.pr-product-cms').addClass('swiper')
                $('.pr-product-list').addClass('swiper-wrapper')
                $('.pr-product-item').addClass('swiper-slide');
                $('.pr-product-item.hidden').remove();
                let swiperProduct = new Swiper('.pr-product-cms', {
                    spaceBetween: 0,
                    slidesPerView: "auto",
                    speed: 500,
                    scrollbar: {
                        el: ".pr-product-scrollbar",
                      },
                })
            }
            let title = new SplitType('.pr-product-title', {types: "lines, words", lineClass: "bp-line heading-line"})
            gsap.set(title.words, {autoAlpha: 0, yPercent:60});
            gsap.set('.pr-product-item .line', {autoAlpha: 0})
            gsap.set('.pr-product-item .line-vertical', {autoAlpha: 0})
            let tlFade = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.pr-product-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=50%',
                    once: true,
                }
            })
            tlFade
                .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
            let tlFadeLine = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.pr-product-cms',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=50%',
                    once: true,
                }
            })
            tlFadeLine
                .to('.pr-product-item .line', {autoAlpha: 1, duration: .6, clearProps: 'all'})
                .to('.pr-product-item .line-vertical', {autoAlpha: 1, duration: .6, clearProps: 'all'}, "<=.0")
            $('.pr-product-item').each((idx, item) => {
                replaceHyphen($(item).find('.pr-product-item-sub'))
                let titleItem = new SplitType($(item).find('.pr-product-item-title'), {types: "lines, words", lineClass: "bp-line heading-line"})
                let subItem = new SplitType($(item).find('.pr-product-item-sub'), {types: "lines, words", lineClass: "bp-line "})
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60})
                gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80})
                gsap.set($(item).find('.pr-product-item-img'), {autoAlpha: 0, clipPath: 'circle(20% at 50% 50%)',})
                let tlItem = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                        once: true,
                    }
                })
                tlItem
                .to(titleItem.words,  {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
                .to(subItem.words,  {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .4, onComplete: () => {
                    // subItem.revert();
                }}, '<=.2')
                .to($(item).find('.pr-product-item-img'), {autoAlpha: 1, clipPath: 'circle(50% at 50% 50%)', duration: .8, clearProps: 'all'}, '<=.3')
            })

        }
    }
    let prProduct = new PrProduct();
    class PrExcell{
        constructor(){
            this.tlTrigger;
        }
        setTrigger(){
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.pr-excell',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.setup()
                    },
                }
            })
        }
        setup(){
            replaceHyphen('.pr-excell-sub');
            let title = new SplitType('.pr-excell-title', {types: "lines, words", lineClass: "bp-line heading-line"})
            let sub = new SplitType('.pr-excell-sub', {types: "lines, words", lineClass: "bp-line"})
            gsap.set(title.words, {autoAlpha: 0, yPercent:60 });
            gsap.set(sub.words, {autoAlpha: 0, yPercent:60 });
            gsap.set('.pr-excell-inner', {autoAlpha: 0});
            gsap.set('.pr-excell-img-wrap', {autoAlpha: 0, scale: .8})
            gsap.set('.pr-excell-img-inner', {autoAlpha: 0, clipPath: 'circle(35% at 50% 50%)'})

            let tlFade = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.pr-excell-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=50%',
                    once: true,
                },
                onComplete: () => {
                    sub.revert();
                }
            })
            tlFade
                .to('.pr-excell-inner', {autoAlpha: 1, duration: .6, clearProps: 'all'})
                .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=0.1')
                .to(sub.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.2')
            let tlFadeImg = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.pr-excell-img-wrap',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=60%',
                    once: true,
                }
            })
            tlFadeImg
                .to('.pr-excell-img-wrap', {autoAlpha: 1, scale: 1, duration: .6, clearProps: 'all'})
                .to('.pr-excell-img-inner', {autoAlpha: 1, clipPath: 'circle(50% at 50% 50%)', duration: .6, clearProps: 'all'}, '<=.2')
        }
    }
    let prExcell = new PrExcell();
    class PrProcess{
        constructor(){
            this.tlTrigger;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.pr-process',
                    start: 'top bottom+=50%',
                    end: 'bottom+=50% top',
                    once: true,
                    onEnter: () => {
                        this.setup()
                    },
                }
            })
        }
        setup(){
            let title = new SplitType('.pr-process-title', {types: "lines, words", lineClass: "bp-line heading-line"});
            gsap.set(title.words, {autoAlpha: 0, yPercent: 60})
            let tlFade = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.pr-process-title-wrap',
                    start : viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true,
                }
            })
            tlFade
                .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: 0.02, duration: .6})
            $('.pr-process-item').each((idx, item) => {
                let tlItem = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: viewport.w > 767 ? 'top top+=65%' : 'top top+=60%',
                        once: true,
                    }
                })
                let titleItem = new SplitType($(item).find('.pr-process-item-title'), {types: 'words lines', lineClass: 'bp-line heading-line'});
                let subItem = new SplitType($(item).find('.pr-process-item-sub'), {types: 'words lines', lineClass: 'bp-line'});
                let labelItem = new SplitType($(item).find('.pr-process-item-label'), {types: 'words lines', lineClass: 'bp-line'});
                gsap.set($(item).find('.pr-process-item-ic'), {autoAlpha: 0, scale: .6})
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60})
                gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80})
                gsap.set(labelItem.words, {autoAlpha: 0, yPercent: 80})
                if($(item).find('.pr-process-item-line').length >0){
                    gsap.set($(item).find('.pr-process-item-line'), {scaleX: 0, transformOrigin: 'left'})
                }
                if($(item).find('.pr-process-item-line').length >0){
                    tlItem
                        .to($(item).find('.pr-process-item-line'), {scaleX: 1, duration: 1, clearProps: 'all'}, '<=0')
                }
                tlItem
                    .to(labelItem.words, {autoAlpha: 1, yPercent: 0, duration: .6, stagger: .02}, '<=.2')
                    .to(titleItem.words, {autoAlpha: 1, yPercent: 0, duration: .6, stagger: .02}, '<=.2')
                    .to(subItem.words, {autoAlpha: 1, yPercent: 0, duration: .4, stagger: .015, onComplete: () => {
                        subItem.revert();
                    }}, '<=.2')
                    .to($(item).find('.pr-process-item-ic'), {autoAlpha: 1, scale: 1, duration: .8}, '<=.0')
            })
        }
    }
    let prProcess = new PrProcess();
    class PrFood{
        constructor(){
            this.tlTrigger;
            this.requestId;
        }
        setTrigger(){
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.pr-food-cate-title-wrap:first-child',
                    start: 'top bottom+=100%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.setup();
                    },
                }
            })
        }
        setup(){
            $('.pr-food-cate-cms').each((idx, item) => {
                console.log(idx)
                $(item).find('.pr-food-cate-item').each((idxCate, itemCate) => {
                    if(idxCate + 1 <= 9){
                        $(itemCate).find('.pr-food-item-number').text(`0${idxCate + 1}`)
                    }
                    else{
                        $(itemCate).find('.pr-food-item-number').text(idxCate + 1)

                    }
                })
            })
            const swiperFood = [];
            if(viewport.w < 992){
                $('.pr-food-cate').each((idx, item) => {
                    $(item).find('.pr-food-cate-cms').addClass('swiper');
                    $(item).find('.pr-food-cate-cms').append('<div class="pr-food-cate-scrollbar swiper-scrollbar"></div>');
                    $(item).find('.pr-food-cate-list').addClass('swiper-wrapper');
                    $(item).find('.pr-food-cate-item').addClass('swiper-slide');
                    swiperFood[idx] = new Swiper($(item).find('.pr-food-cate-cms').get(0), {
                        spaceBetween: 0,
                        slidesPerView: "auto",
                        speed: 500,
                        scrollbar: {
                            el: $(item).find('.pr-food-cate-scrollbar')
                        }
                    })
                })

            }
            $('.pr-food-cate-title-wrap').each((idx, item) => {
                const title = new SplitType($(item).find('.pr-food-cate-title'), {types: 'lines, words', lineClass: 'bp-line heading-line'})
                const sub = new SplitType($(item).find('.pr-food-cate-sub'), {types: 'lines, words', lineClass: 'bp-line'})
                gsap.set(title.words, {autoAlpha: 0, yPercent: 60})
                gsap.set(sub.words, {autoAlpha: 0, yPercent: 80})
                if ($(item).find('.pr-food-cate-title-link').length > 0){
                    gsap.set($(item).find('.pr-food-cate-title-link'), {autoAlpha : 0 , y: 20})
                }
                this.tlFadeHead = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: 'top top+=65%',
                        once: true,
                    },
                    onComplete: () => {
                        // title.revert();
                        sub.revert();
                    }
                })
                this.tlFadeHead
                    .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .8}, '<=.2')
                    .to(sub.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.3')
                    if ($(item).find('.pr-food-cate-title-link').length > 0){
                        this.tlFadeHead
                            .to($(item).find('.pr-food-cate-title-link'), {autoAlpha : 1 , y: 0, duration: .6, clearProps: 'all'}, '<=.3')
                    }
            })
            let allCate = $('.pr-food-cate');
            allCate.each((idx, item) => {let tlItemCate = new gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=35%',
                    once: true
                },
            })
                if($(item).find('.pr-food-cate-line').length > 0){
                        tlItemCate
                            .from($(item).find('.pr-food-cate-line'), {autoAlpha: 0, scaleX: 0, transformOrigin: 'left', duration: 1, clearProps: 'all'})
                }
                let itemCate = $(item).find('.pr-food-cate-item');
                gsap.set($(item).find('.pr-food-cate-scrollbar'), {autoAlpha: 0});
                itemCate.each((idx, itemCateInner) => {
                    let itemCateInnerTitle = new SplitType($(itemCateInner).find('.pr-food-item-name'), {types: 'lines, words', lineClass: 'bp-line'});
                    gsap.set(itemCateInnerTitle.words, {autoAlpha: 0, yPercent: 80})
                    if(viewport.w > 991){
                        tlItemCate
                            .from($(itemCateInner).find('.pr-food-item-number'), {autoAlpha: 0, yPercent: 60, duration: .4, clearProps: 'all'}, '<=.2')
                            .to(itemCateInnerTitle.words, {autoAlpha: 1, yPercent: 0, duration: .6, onComplete : () => {
                                itemCateInnerTitle.revert();
                            }}, '<=.2')
                            .from($(itemCateInner).find('.pr-food-item-line'), {autoAlpha: 0, scaleX: 0, transformOrigin: 'left', duration: .6, clearProps: 'all'}, '<=-.2')
                    }
                    else{
                        gsap.set($(itemCateInner).find('.pr-food-cate-item-thumb'), {autoAlpha: 0, clipPath: 'circle(35% at 50% 50%)'});
                        tlItemCate
                            .to(itemCateInnerTitle.words, {autoAlpha: 1, yPercent: 0, duration: .6, onComplete : () => {
                                itemCateInnerTitle.revert();
                            }}, '<=.2')
                            .to($(itemCateInner).find('.pr-food-cate-item-thumb'), {autoAlpha: 1, clipPath: 'circle(50% at 50% 50%)', duration: .6, clearProps: 'all'}, '<=.2');
                            if(idx == 1){
                                tlItemCate
                                    .to($(item).find('.pr-food-cate-scrollbar'), {autoAlpha: 1, duration: .6, clearProps: 'all'}, '<=.3')
                            }

                    }
                })
            })
            this.interact()
        }
        interact() {
            function initMouseMove() {
                if (isInViewport('.pr-food-cate-cms')) {
                    if ($('.pr-food-cate-item:hover').length > 0) {
                        !$('.pr-food-thumb-inner').hasClass('active') && $('.pr-food-thumb-inner').addClass('active');
                        if (!$(`.pr-food-thumb-item[data-name="${$('.pr-food-cate-item:hover').attr('data-name')}"]`).hasClass('active')) {
                            $('.pr-food-thumb-item').removeClass('active');
                            $(`.pr-food-thumb-item[data-name="${$('.pr-food-cate-item:hover').attr('data-name')}"]`).addClass('active');
                        }
                    } else {
                        $('.pr-food-thumb-inner').hasClass('active') && $('.pr-food-thumb-inner').removeClass('active');
                    }
                    let tarCurrX = xGetter('.pr-food-thumb');
                    let tarCurrY = yGetter('.pr-food-thumb');
                    let tarX = ((pointerCurr().x - $('.pr-food-cate-cms').get(0).getBoundingClientRect().left - $('.pr-food-cate-title-wrap').get(0).getBoundingClientRect().width) / $('.pr-food-cate-cms').get(0).getBoundingClientRect().width) * $('.pr-food-thumb-inner').width() * .4;
                    console.log()
                    let tarY = pointerCurr().y - $('.pr-food-cate-cms').get(0).getBoundingClientRect().top;
                    xSetter('.pr-food-thumb')(lerp(tarCurrX, tarX, 0.04));
                    ySetter('.pr-food-thumb')(lerp(tarCurrY, tarY, 0.04));
                }
                else{
                    $('.pr-food-thumb-inner').removeClass('active');

                }
                requestAnimationFrame(initMouseMove);
            }
            this.requestId = requestAnimationFrame(initMouseMove);
        }
        destroy(){
            cancelAnimationFrame(this.requestId)
        }
    }
    let prFood = new PrFood();
    class PrManufact{
        constructor(){
            this.tlTrigger;
            this.requestId;
        }
        setTrigger(){
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.pr-manufact',
                    start: 'top bottom+=100%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.setup();
                    },
                }
            })
        }
        setup(){
            let titleFood = new SplitType('.pr-manufact-title', {types: "lines, words", lineClass: "bp-line heading-line"});
            let subFood = new SplitType('.pr-manufact-sub', {types: "lines, words", lineClass: "bp-line"});
            let tlFood = new gsap.timeline({
                scrollTrigger: {
                    trigger: viewport.w > 767 ? '.pr-manufact-img' :'.pr-manufact-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true
                },
                onComplete: () => {
                    subFood.revert();
                }
            })
            gsap.set(titleFood.words, {autoAlpha: 0, yPercent: 60})
            gsap.set(subFood.words, {autoAlpha: 0, yPercent: 80})
            gsap.set('.pr-manufact-link', {autoAlpha: 0, yPercent: 80})
            tlFood
                .to(titleFood.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
                .to(subFood.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=.2')
                .to('.pr-manufact-link', {autoAlpha: 1, yPercent: 0,  duration: .6, clearProps: 'all' }, '<=.4')
            gsap.set('.pr-manufact-img', {autoAlpha: 0, clipPath: 'circle(30% at 50% 50%)'})
            let tlFoodImg = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.pr-manufact-img',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true
                }
            })
                tlFoodImg
                    .to('.pr-manufact-img', {autoAlpha: 1, clipPath: 'circle(50% at 50% 50%)', duration: 1, clearProps: 'all'})
        }
    }
    let prManufact = new PrManufact();
    class CapalityHero {
        constructor() {
            this.tlFade;
            this.tlPath;
            this.animImg = false;
        }
        setup(){
            const title = new SplitType($('.cp-hero-title'), {types: 'lines, words', lineClass: 'bp-line heading-line'})
            const sub = new SplitType($('.cp-hero-sub'), {types: 'lines, words', lineClass: 'bp-line'})
            gsap.set(title.words, {autoAlpha: 0, yPercent: 60});
            gsap.set(sub.words, {autoAlpha: 0, yPercent: 80});
            gsap.set('.cp-hero-img-wrap', {autoAlpha: 0, scale: .7})
            gsap.set('.cp-hero-logo', {autoAlpha: 0, scale: .6})
            this.tlFade = new gsap.timeline({
                paused: true,
                scrollTrigger: {
                    once: true
                }
            })
            this.tlFade
                .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
                .to(sub.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.2')
                .to('.cp-hero-img-wrap', {autoAlpha: 1, scale: 1, duration: .8, clearProps: 'all'}, '<=0')
                .to('.cp-hero-logo', {autoAlpha: 1, scale: 1, duration: .6, clearProps: 'all'}, '<=0.4')
            this.tlPath = new gsap.timeline({
                scrollTrigger: {
                    paused: true,
                    once: true,

                }
            })
            this.tlPath.to('.cp-hero-deco-path', {strokeDashoffset: 0, duration: 3 })
        }
        play(){
            this.tlFade.play();
            this.tlPath.play();
        }
    }
    let capalityHero = new CapalityHero();
    class CapalityReason {
        constructor() {
            this.tlTrigger;
        }

        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.cp-reason',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.setup()
                    },
                }
            });
        }
        setup(){

            replaceHyphen('.cp-reason-sub')
            const title = new SplitType($('.cp-reason-title'), {types: 'lines, words', lineClass: 'bp-line heading-line'})
            const sub = new SplitType($('.cp-reason-sub'), {types: 'lines, words', lineClass: 'bp-line'})
            gsap.set(title.words, {autoAlpha: 0, yPercent: 60});
            gsap.set(sub.words, {autoAlpha: 0, yPercent: 80});
            let tlFade = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.cp-reason-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true
                },
                onComplete: () => {
                    sub.revert()
                }
            })
            tlFade
                .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .03, duration: .6})
                .to(sub.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.2')
            let tlPath =new gsap.timeline({
                scrollTrigger: {
                    trigger: '.cp-reason-deco',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true
                }
            })
            tlPath.to('.cp-reason-deco-path', {strokeDashoffset: 0, duration: 4 })
            const titleContent = new SplitType($('.cp-reason-content-title'), {types: 'lines, words', lineClass: 'bp-line heading-line'})
            const subContent = new SplitType($('.cp-reason-content-sub'), {types: 'lines, words', lineClass: 'bp-line'})
            gsap.set(titleContent.words, {autoAlpha: 0, yPercent: 60});
            gsap.set(subContent.words, {autoAlpha: 0, yPercent: 80});
            let tlFadeSub = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.cp-reason-content',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true
                },
                onComplete: () => {
                    subContent.revert()
                }
            })
            tlFadeSub
                .to(titleContent.words, {autoAlpha: 1, yPercent: 0, stagger: .03, duration: .6})
                .to(subContent.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.2');
            $('.cp-reason-item').each((idx, item) => {
                replaceHyphen($(item).find('.cp-reason-item-sub'))
                const titleItem = new SplitType($(item).find('.cp-reason-item-title'), {types: 'lines, words', lineClass: 'bp-line'})
                const subItem = new SplitType($(item).find('.cp-reason-item-sub'), {types: 'lines, words', lineClass: 'bp-line'})
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60});
                gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80});
                gsap.set($(item).find('.cp-reason-item-ic'), {autoAlpha: 0, scale: .6})
                let tlFadeItem = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: viewport.w > 767 ? 'top top+=55%' : 'top top+=45%',
                        once: true
                    }
                })
                tlFadeItem
                    .to($(item).find('.cp-reason-item-ic'), {autoAlpha: 1, scale: 1, duration: 1, clearProps: 'all'})
                    .to(titleItem.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=.2')
                    .to(subItem.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4, onComplete: () => {
                        titleItem.revert();
                        subItem.revert();
                    }}, '<=.2')
            })
        }
    }
    let capalityReason = new CapalityReason();
    class CapalitSol{
        constructor(){
            this.tlTrigger;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.cp-sol',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.setup()
                    },
                }
            });
        }
        setup(){
            const title = new SplitType($('.cp-sol-title'), {types: 'lines, words', lineClass: 'bp-line heading-line'})
            gsap.set(title.words, {autoAlpha: 0, yPercent: 60});
            let tlFade = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.cp-sol-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true
                },
                onComplete: () => {
                    sub.revert()
                }
            })
            tlFade
                .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .03, duration: .6})
            $('.cp-sol-item').each((idx, item) => {
                let titleItem = new SplitType($(item).find('.cp-sol-item-title'), {types: 'lines, words', lineClass: 'bp-line heading-line'})
                let subItem = new SplitType($(item).find('.cp-sol-item-sub'), {types: 'lines, words', lineClass: 'bp-line '})
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60})
                gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80})
                gsap.set($(item).find('.cp-sol-item-ic'), {autoAlpha: 0, scale: .6})
                gsap.set($(item).find('.cp-sol-item-link'), {autoAlpha: 0, yPercent: 80})

                let tlFadeItem = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: viewport.w > 767 ? 'top top+=65%' : 'top top+=35%',
                        once: true
                    }
                })
                tlFadeItem
                    .to($(item).find('.cp-sol-item-ic'), {autoAlpha: 1, scale: 1, duration: .6, clearProps: 'all'})
                    .to(titleItem.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=.2')
                    .to(subItem.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.2')
                    .to($(item).find('.cp-sol-item-link'), {autoAlpha: 1, yPercent: 0, duration: .8, clearProps: 'all', onComplete: () => {
                        subItem.revert();
                    }}, '<=.2')

            })
        }
    }
    let capalitSol = new CapalitSol();
    class CapalityService {
        constructor() {
            this.tlTrigger;
            this.requestId;
            this.mouseX;
            this.mouseY;
            this.tarCurrX;
            this.tarCurrY;
        }

        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.cp-service',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.setup()
                    },
                }
            });
        }

        setup() {
            if(viewport.w < 768){
                $('.cp-service-main').addClass('swiper')
                $('.cp-service-list').addClass('swiper-wrapper')
                $('.cp-service-item').addClass('swiper-slide');
                $('.cp-service-main').append('<div class="pr-food-cate-scrollbar swiper-scrollbar"></div>');
                $('.cp-service-item-ar-wrap').remove();
                let swiperService = new Swiper('.cp-service-main', {
                    spaceBetween: 0,
                    slidesPerView: "auto",
                    speed: 500,
                    scrollbar: {
                        el: '.cp-service-main .pr-food-cate-scrollbar'
                    }
                })
            }
            const title = new SplitType($('.cp-service-title'), {types: 'lines, words', lineClass: 'bp-line heading-line'})
            gsap.set(title.words, {autoAlpha: 0, yPercent: 60});
            let tlFade = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.cp-service-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true
                },
                onComplete: () => {
                    sub.revert()
                }
            })
            tlFade
                .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .03, duration: .6})
            $('.cp-service-item').each((idx, item) => {
                replaceHyphen($(item).find('.cp-service-item-sub'))
                let titleItem = new SplitType($(item).find('.cp-service-item-title'), {types: 'lines, words', lineClass: 'bp-line heading-line'})
                let subItem = new SplitType($(item).find('.cp-service-item-sub'), {types: 'lines, words', lineClass: 'bp-line '})
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60})
                gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80})
                gsap.set($(item).find('.cp-service-item-img-wrap '), {autoAlpha: 0, clipPath: 'circle(20% at 50% 50%)'})
                if(viewport.w < 767){
                    gsap.set($(item).find('.cp-service-item-link'), {autoAlpha: 0, yPercent: 80})
                }
                let tlFadeItem = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: viewport.w > 767 ? 'top top+=65%' : 'top top+=35%',
                        once: true,
                        markets: true
                    }
                })
                tlFadeItem
                    .to($(item).find('.cp-service-item-img-wrap'), {autoAlpha: 1, clipPath: 'circle(50% at 50% 50%)', duration: 1, clearProps: 'all'})
                    .to(titleItem.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=.5')
                    .to(subItem.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4, onComplete: () => {
                        if(idx == $('.cp-service-item').length - 1){
                            this.interact();
                        subItem.revert();
                        }
                    }}, '<=.2')
                    if(viewport.w < 767){
                        tlFadeItem
                            .to($(item).find('.cp-service-item-link'), {autoAlpha: 1, yPercent: 0, duration: .8, clearProps: 'all'},'<=.2')
                    }
            })
        }

        interact() {
            if(viewport.w > 767){
                $('.cp-service-item').hover(
                    function () {
                        $(this).closest('.cp-service-item').find('.cp-service-item-img').addClass('active');
                    },
                    function () {
                        $(this).closest('.cp-service-item').find('.cp-service-item-img').removeClass('active');
                    }
                );

                $('.cp-service-list').hover(
                    function () {
                        $('.cp-service-item-ar-inner').addClass('active');
                        $(this).closest('.cp-service-item').find('.cp-service-item-img').addClass('active');
                    },
                    function () {
                        $('.cp-service-item-ar-inner').removeClass('active');
                        $(this).closest('.cp-service-item').find('.cp-service-item-img').removeClass('active');
                    }
                );
            }

            const mouseTransform = () => {
                this.mouseX = pointerCurr().x;
                this.mouseY = pointerCurr().y;
                this.tarCurrX = xGetter('.cp-service-item-ar');
                this.tarCurrY = yGetter('.cp-service-item-ar');
                xSetter('.cp-service-item-ar')(lerp(this.tarCurrX , this.mouseX - $('.cp-service-item-ar-inner').width()/2, 0.1));
                ySetter('.cp-service-item-ar')(lerp(this.tarCurrY , this.mouseY - $('.cp-service-item-ar-inner').height()/2, 0.1));
                    this.requestId = requestAnimationFrame(mouseTransform);
            };
            if(viewport.w > 991){
                this.requestId = requestAnimationFrame(mouseTransform);
            }
        }

        destroy() {
            cancelAnimationFrame(this.requestId);
        }
    }

    let capalityService = new CapalityService();
    class CapalityChoose{
        constructor(){
            this.tlTrigger;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.cp-choose',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.setup()
                    },
                }
            })
        }
        setup(){
            if(viewport.w < 768){
                $('.cp-choose-main').addClass('swiper')
                $('.cp-choose-list').addClass('swiper-wrapper')
                $('.cp-choose-item').addClass('swiper-slide');
                $('.cp-choose-main').append('<div class="pr-food-cate-scrollbar swiper-scrollbar"></div>');
                let swiperChoose = new Swiper('.cp-choose-main', {
                    spaceBetween: 0,
                    slidesPerView: "auto",
                    speed: 500,
                    scrollbar: {
                        el: '.cp-choose-main .pr-food-cate-scrollbar'
                    }
                })
            }
            let title = new SplitType($('.cp-choose-title'), {types: 'lines, words', lineClass: 'bp-line heading-line'})
            gsap.set(title.words, {autoAlpha: 0, yPercent: 60})
            gsap.set('.cp-choose .line', {autoAlpha: 0})
            gsap.set('.cp-choose .line-vertical', {autoAlpha: 0})
            let tlFade = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.cp-choose-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=50%',
                    once: true
                }
            })
            let tlFadeMain = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.cp-choose-main',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true
                }
            })
            tlFade
                .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .03, duration: .6})
            tlFadeMain
                .to('.cp-choose .line-vertical', {autoAlpha: 1, duration: 1, clearProps: 'all'}, )
                .to('.cp-choose .line', {autoAlpha: 1, duration: 1, clearProps: 'all'}, '<=0')
            $('.cp-choose-item').each((idx, item) => {
                replaceHyphen($(item).find('.cp-choose-item-sub'))
                let titleItem = new SplitType($(item).find('.cp-choose-item-title'), {types: 'lines, words', lineClass: 'bp-line heading-line'})
                let subItem = new SplitType($(item).find('.cp-choose-item-sub'), {types: 'lines, words', lineClass: 'bp-line '})
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60})
                gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80})
                gsap.set($(item).find('.cp-choose-item-ic'), {autoAlpha: 0, scale: .6})

                let tlFadeItem = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                        once: true
                    }
                })
                tlFadeItem
                    .to($(item).find('.cp-choose-item-ic'), {autoAlpha: 1, scale: 1, duration: .6, clearProps: 'all'})
                    .to(titleItem.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=.2')
                    .to(subItem.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4, onComplete: () => {
                        subItem.revert();
                    }}, '<=.2')

            })

        }
    }
    let capalityChoose = new CapalityChoose();
    class CapalityProcess{
        constructor(){
            this.tlTrigger;
            this.requestId;
        }
        setTrigger(){
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.cp-process',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.setup()
                    },
                }
            })
        }
        setup(){
            let title = new SplitType($('.cp-process-title'), {types: 'lines, words', lineClass: 'bp-line heading-line'})
            let label = new SplitType($('.cp-process-label'), {types: 'lines, words', lineClass: 'bp-line '})
            gsap.set(title.words, {autoAlpha: 0, yPercent: 60})
            gsap.set(label.words, {autoAlpha: 0, yPercent: 80})
            gsap.set('.cp-process-head-ic', {scale: .6, autoAlpha: 0})
            gsap.set('.cp-process-head-line', {scaleX: 0, transformOrigin: 'left'})
            let tlFade = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.cp-process-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true
                }
            })
            tlFade
                .to(label.words, {autoAlpha: 1, yPercent: 1, duration : .5, stagger: .02})
                .to('.cp-process-head-line', { scaleX: 1, duration : 1, clearProps: 'all'}, '<=0.1')
                .to(title.words, {autoAlpha: 1, yPercent: 0, duration : .6, stagger: .04}, '<=0')
                .to('.cp-process-head-ic', {autoAlpha: 1, scale: 1, duration : .8, clearProps: 'all'}, '<=0')
            $('.cp-process-content-item').each((idx, item) => {
                replaceHyphen($(item).find('.cp-process-content-item-sub'))
                let titleItem = new SplitType($(item).find('.cp-process-content-item-title'), {types: 'lines, words', lineClass: 'bp-line heading-line'})
                let subItem = new SplitType($(item).find('.cp-process-content-item-sub'), {types: 'lines, words', lineClass: 'bp-line'})
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60})
                gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80})
                let tlItem = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: viewport.w > 767 ? 'top top+=65%' : 'top top+=55%',
                        once: true
                    }
                })
                tlItem
                    .to(titleItem.words, {autoAlpha: 1, yPercent: 0, stagger: .04, duration: .6})
                    .to(subItem.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .5, onComplete: () => {
                        subItem.revert();
                    }}, '<=.2')
            })
            $('.cp-process-item').each((idx, item) => {
                replaceHyphen($(item).find('.cp-process-item-sub'))
                let titleItem = new SplitType($(item).find('.cp-process-item-title'), {types: 'lines, words', lineClass: 'bp-line heading-line'})
                let subItem = new SplitType($(item).find('.cp-process-item-sub'), {types: 'lines, words', lineClass: 'bp-line'})
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60})
                gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80})
                gsap.set($(item).find('.cp-process-item-img'), {autoAlpha: 0, scale: .7})
                if($(item).find('.cp-process-item-img-label').length > 0){
                    gsap.set($(item).find('.cp-process-item-img-label'), {autoAlpha: 0, scale: .4})
                }
                let tlItem = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                        once: true
                    }
                })
                tlItem
                    .to($(item).find('.cp-process-item-img'), {autoAlpha: 1, scale: 1, duration: .6, clearProps: 'all'})
                    .to(titleItem.words, {autoAlpha: 1, yPercent: 0, stagger: .04, duration: .6}, '<=0.2')
                    .to(subItem.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .5, onComplete: () => {
                        subItem.revert();
                    }}, '<=.2')
                if($(item).find('.cp-process-item-img-label').length > 0){
                    tlItem
                        .to($(item).find('.cp-process-item-img-label'), {autoAlpha: 1, scale: 1, duration: .6, clearProps: 'all'}, '<=0');
                }
            })
            $('.cp-process-detail-item').each((idx, item) => {
                replaceHyphen($(item).find('.cp-process-detail-item-sub'))
                // let numberItem = new SplitType($(item).find('.cp-process-detail-item-number'), {types: 'lines, words', lineClass: 'bp-line'})
                let titleItem = new SplitType($(item).find('.cp-process-detail-item-title'), {types: 'lines, words', lineClass: 'bp-line heading-line'})
                let subItem = new SplitType($(item).find('.cp-process-detail-item-sub'), {types: 'lines, words', lineClass: 'bp-line'})
                gsap.set($(item).find('.cp-process-detail-item-number'), {autoAlpha: 0, yPercent: 30})
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60})
                gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80})
                let tlItem = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                        once: true,
                        onEnter: () => {
                            counterNumber($(item).find('.cp-process-detail-item-number'), 1500)
                        }
                    }
                })
                tlItem
                    .to($(item).find('.cp-process-detail-item-number'), {autoAlpha: 1, yPercent: 0, stagger: .04, duration: .6})
                    .to(titleItem.words, {autoAlpha: 1, yPercent: 0, stagger: .04, duration: .6}, '<=0.2')
                    .to(subItem.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .5, onComplete: () => {
                        subItem.revert();
                    }}, '<=.2')
            })
            this.requestId = requestAnimationFrame(this.updateGrind.bind(this))
        }
        updateGrind() {
            $('.cp-process-cavas-top-grind-svg path').css('stroke-dashoffset', `${parseFloat($('.cp-process-cavas-top-grind-svg path').css('stroke-dashoffset')) + .6}px`)
            requestAnimationFrame(this.updateGrind.bind(this))
        }
        destroy(){
            cancelAnimationFrame(this.requestId);
        }
    }
    let capalityProcess = new CapalityProcess();
    class CapalityCanvas {
        constructor() {
            this.bottles = [
                {
                    type: 'svg',
                    url: 'https://cdn.prod.website-files.com/66e944273b06600356c5243e/670e21fbb8ced97b5c004faa_bottle-5.svg',
                    quantity: 1,
                    width: 48,
                    height: 86
                },
                {
                    type: 'svg',
                    url: 'https://cdn.prod.website-files.com/66e944273b06600356c5243e/670e21fb4d33c13aeb323fc1_drinking-bottle-2.svg',
                    quantity: 2,
                    width: 48,
                    height: 101
                },
                {
                    type: 'svg',
                    url: 'https://cdn.prod.website-files.com/66e944273b06600356c5243e/670e21fbd11a2cf8c70a88ff_energy-drink-3.svg',
                    quantity: 1,
                    width: 47,
                    height: 41.3
                },
                {
                    type: 'svg',
                    url: 'https://cdn.prod.website-files.com/66e944273b06600356c5243e/670e21fb1fefd779d05f49ac_bottle-4.svg',
                    quantity: 1,
                    width: 56,
                    height: 134
                },
                {
                    type: 'svg',
                    url: 'https://cdn.prod.website-files.com/66e944273b06600356c5243e/670e21fbe2d317dba4081dcc_water-bottle-2.svg',
                    quantity: 1,
                    width: 52,
                    height: 134
                },
                {
                    type: 'svg',
                    url: 'https://cdn.prod.website-files.com/66e944273b06600356c5243e/670e21fb74e43240fd96c312_fitness-shaker-3.svg',
                    quantity: 1,
                    width: 35,
                    height: 72
                },
                {
                    type: 'svg',
                    url: 'https://cdn.prod.website-files.com/66e944273b06600356c5243e/670e21fb9b89cec3809f14ae_mayo-3.svg',
                    quantity: 2,
                    width: 44,
                    height: 88
                },
                {
                    type: 'svg',
                    url: 'https://cdn.prod.website-files.com/66e944273b06600356c5243e/670517b4d96a1e643a699de0_bottle%202.svg',
                    quantity: 1,
                    width: 48,
                    height: 86
                },
                {
                    type: 'svg',
                    url: 'https://cdn.prod.website-files.com/66e944273b06600356c5243e/670e21fbcb6fcf7da8a449d0_medication-bottle-1.svg',
                    quantity: 1,
                    width: 55,
                    height: 85
                },
                {
                    type: 'svg',
                    url: 'https://cdn.prod.website-files.com/66e944273b06600356c5243e/6705f68c5aee7ca91401c373_energy-drink%203.svg',
                    quantity: 1,
                    width: 45,
                    height: 62
                },
                {
                    type: 'circle',
                },
                {
                    type: 'rect',
                },
                {
                    type: 'circle',
                },
                {
                    type: 'circle',
                },
                {
                    type: 'rect',
                },
                {
                    type: 'circle',
                },
                {
                    type: 'rect',
                },
                {
                    type: 'circle',
                },
            ]
            this.dynamicBottles = []
            this.dynamicParticles = []
            this.particlesLimit =600;
            this.statics = []
            this.loopRandom;
            this.loopRandomParticle;
            this.sensor;
            this.canvas = '#process-canvas-top';
            this.render;
            this.engine;
            this.canvas2 = '#process-canvas-bot';
            this.render2;
            this.engine2;
            this.mouse;
            this.mouseConstraint;
            this.tl;
            this.requestId;
        }
        init() {
            this.setup()
            this.setup2()
            this.run()
        }
        setup() {
            this.engine = Engine.create({
                gravity: {
                    scale: 0.0006,
                },
            });

            let renderOptions = {
                width: document.querySelector(this.canvas).clientWidth,
                height: document.querySelector(this.canvas).clientHeight,
                wireframes: false,
                background: 'transparent',
                pixelRatio: viewport.w > 767 ? 2 : 1,
                showStats: false,
                showPerformance: false,
            }
            this.render = Render.create({
                canvas: document.querySelector(this.canvas),
                engine: this.engine,
                options: renderOptions
            });

            function createBoxes() {
                this.bottles.forEach((bottle, idx) => {
                    if (this.dynamicBottles.length > this.bottles.length - 5) {
                        return;
                    }
                    Composite.add(this.engine.world, this.createSingleBox.bind(this)(bottle));
                })

            }
            function createRandomBox(limit) {
                if (this.dynamicBottles.length > limit - 1) {
                    return;
                }
                let bottle = this.bottles[Math.floor(Math.random() * this.bottles.length)]
                Composite.add(this.engine.world, this.createSingleBox.bind(this)(bottle));
            }
            function createStatic() {
                this.sensor = Bodies.rectangle(this.render.options.width/2, this.render.options.height - parseRem(190), parseRem(400), parseRem(30), {
                    isSensor: true,
                    isStatic: true,
                    render: {
                        visible: false
                    }
                });
                Composite.add(this.engine.world, this.sensor);

                Events.on(this.engine, 'collisionStart', this.sensorFunc.bind(this));
            }
            function initWorld() {
                createStatic.bind(this)()
                // createBoxes.bind(this)()
                this.loopRandom = viewport.w > 767 ? setInterval(createRandomBox.bind(this, this.bottles.length-3), 300) : setInterval(createRandomBox.bind(this, 5), 300);
            }
            function resetWorld() {
                //clearInterval(loopRandom)
                Composite.clear(this.engine.world, true);
                this.dynamicBottles = []
            }
            function reInitWorld() {
                // createBoxes.bind(this)()
            }
            let isReset = false;
            initWorld.bind(this)()
            this.tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.cp-process-canvas-inner',
                    start: 'top top+=50%',
                    end: 'bottom top',
                    scrub: true,
                    onLeaveBack: () => {
                        console.log('leaveback')
                        if (isReset) {
                            reInitWorld.bind(this)()
                            isReset = false;
                        }
                    },
                    onLeave: () => {
                        isReset = true;
                        console.log('reset')
                        resetWorld.bind(this)()
                    }
                }
            })
        }
        sensorFunc = (e) => {
            let pairs = e.pairs;
            for (let i = 0, j = pairs.length; i != j; ++i) {
                let pair = pairs[i];

                if (pair.bodyB === this.sensor || pair.bodyA === this.sensor) {
                    // }
                    this.createChunkParticle.bind(this)()
                }
            }
        }
        setup2() {
            this.engine2 = Engine.create({
                gravity: {
                    scale: 0.0004,
                },
            });
            this.render2 = Render.create({
                canvas: document.querySelector(this.canvas2),
                engine: this.engine2,
                options: {
                    width: document.querySelector(this.canvas2).clientWidth,
                    height: document.querySelector(this.canvas2).clientHeight,
                    wireframes: false,
                    background: 'transparent',
                    showStats: false,
                    showPerformance: false,
                }
            });

            let statics = []
            function createStatic(isVisible = false) {
                const options = (isChamfer = false, rect = null) => {
                    return {
                        isStatic: true,
                        chamfer: {radius: isChamfer ? [rect.height() * .4 ,rect.height() * .6, 0, rect.height() * .6] : 0},
                        render: {
                            visible: isVisible
                        }
                    }
                }

                let objBottom = Bodies.rectangle(this.render2.options.width / 2, this.render2.options.height + parseRem(1), this.render2.options.width / 2, parseRem(2),
                    options()
                )
                statics.push(objBottom)

                Composite.add(this.engine2.world, statics);
            }
            createStatic.bind(this)()
        }
        createSingleBox(bottle) {
            let obj
            if (bottle.type == 'circle') {
                obj = Bodies.circle((Math.random() * (this.render.options.width / 2)) + this.render.options.width / 4, Math.random() * -100, parseRem(16 + Math.random() * 16), {
                    frictionAir: .003,
                    render: {
                        fillStyle: '#F0E8D8',
                        strokeStyle: '#3D3D3D',
                        lineWidth: parseRem(4),
                    },
                });
            } else if (bottle.type == 'rect') {
                let randomSize = parseRem(32 + Math.random() * 16)
                obj = Bodies.rectangle((Math.random() * (this.render.options.width / 2)) + this.render.options.width / 4, Math.random() * -100, randomSize, randomSize, {
                    frictionAir: .003,
                    chamfer: {radius: parseRem(10)},
                    render: {
                        fillStyle: '#F0E8D8',
                        strokeStyle: '#3D3D3D',
                        lineWidth: parseRem(4),
                    },
                });
            } else if (bottle.type == 'svg') {
                let width = bottle.width;
                let height = bottle.height;
                let svgSize = {
                    width: parseRem(width/3*2),
                    height: parseRem(height/3*2)
                }
                let svgScale = svgSize.width / width;

                for (let i = 0; i < bottle.quantity ; i++) {
                    obj = Bodies.rectangle((Math.random() * (this.render.options.width / 2)) + this.render.options.width / 4, Math.random() * (-svgSize.height * 2) - 100, svgSize.width, svgSize.height, {
                        chamfer: {radius: width / 3},
                        friction: .2,
                        frictionAir: .003,
                        render: {
                            sprite: {
                                texture: bottle.url,
                                xScale: svgScale,
                                yScale: svgScale
                            }
                        }
                    });
                    Body.setAngle(obj, Math.random() * Math.PI * 2)
                    Body.setAngularVelocity(obj, .06)
                }
            }
            this.dynamicBottles.push(obj);
            return obj;
        }
        createChunkParticle() {
            for (let i = 0; i < 20 + 30 * Math.random(); i++) {
                this.createSingleParticle.bind(this)()
            }
        }
        createSingleParticle() {
            if (this.dynamicParticles.length < this.particlesLimit) {
                // let posX = $('.home-hero-mid-grind').offset().left - $('.home-trans-bg-mid').offset().left + parseRem(40) + (($('.home-hero-mid-grind').width() - parseRem(70)) * Math.random());
                let posX = viewport.w > 767 ? $('.cp-process-cavas-top-grind').offset().left - $('.cp-process-cavas-bot').offset().left/2 + (($('.cp-process-cavas-top-grind').width() - $('.cp-process-cavas-bot').offset().left) * Math.random()): $('.cp-process-cavas-top-grind').offset().left - parseRem(60) + (($('.cp-process-cavas-top-grind').width() - parseRem(60) ) * Math.random());
                let posY = parseRem(35)
                let sizeScale = parseRem(2) / 2;
                let particle = Bodies.circle(posX, posY, Math.ceil(parseRem(3)), {
                    render: {
                        sprite: {
                            texture: particleTextureBgBlack,
                            xScale: sizeScale,
                            yScale: sizeScale
                        }
                    },
                    friction: 0,
                    frictionAir: .004,
                    restitution: 0.6
                });
                Body.setVelocity(particle, {x: Math.random() * 2 - 1, y: Math.random() * 2 - 1})
                this.dynamicParticles.push(particle);
                Composite.add(this.engine2.world, particle);
            }
        }
        draw() {
            if (isInViewport('.cp-process-canvas-inner') ) {
                Engine.update(this.engine, delta);
                for (let i = 0; i < this.dynamicBottles.length; i++) {
                    if (this.isOffScreen(this.dynamicBottles[i], this.render)) {
                        this.removefromWorld(this.dynamicBottles[i], this.engine)
                        this.dynamicBottles.splice(i, 1);
                        i--;
                    }
                }
                Engine.update(this.engine2, delta);
                for (let i = 0; i < this.dynamicParticles.length; i++) {
                    if (this.isOffScreen(this.dynamicParticles[i], this.render2) || i >= this.particlesLimit) {
                        this.removefromWorld(this.dynamicParticles[i], this.engine2)
                        this.dynamicParticles.splice(i, 1);
                        i--;
                    }
                }
            }
            this.requestId = requestAnimationFrame(this.draw.bind(this))
        }
        run() {
            Render.run(this.render);
            Render.run(this.render2);
            setTimeout(() => {
                this.requestId = requestAnimationFrame(this.draw.bind(this))
            }, 400);
        }
        isOffScreen(obj, render) {
            let pos = obj.position;
            return pos.y > render.options.height + 100 || pos.x < -100 || pos.x > render.options.width + 100;
        }
        removefromWorld(obj, engine) {
            Composite.remove(engine.world, obj)
        }
        destroy() {
            cancelAnimationFrame(this.requestId)
            clearInterval(this.loopRandom)
            clearInterval(this.loopRandomParticle)
            this.dynamicBottles = []
            this.dynamicParticles = []
            this.statics = []
            this.sensor = null
            Events.off(this.engine, 'collisionStart', this.sensorFunc.bind(this));
            Render.stop(this.render);
            Composite.clear(this.engine.world, false, [true]);
            Engine.clear(this.engine);
            this.render.canvas.remove();
            this.render.canvas = null;
            this.render.context = null;
            this.render.textures = {};

            Render.stop(this.render2);
            Composite.clear(this.engine2.world, false, [true]);
            Engine.clear(this.engine2);
            this.render2.canvas.remove();
            this.render2.canvas = null;
            this.render2.context = null;
            this.render2.textures = {};
            this.tl.kill()
        }
    }
    let capalityCanvas = new CapalityCanvas();
    class CustomerHero {
        constructor() {
            this.tlFade;
            this.requestId = [];
        }
        setup(){
            let title = new SplitType($('.cus-hero-title'), {types: 'lines, words', lineClass: 'bp-line heading-line'})
            let sub = new SplitType($('.cus-hero-sub'), {types: 'lines, words', lineClass: 'bp-line heading-line'})
            gsap.set('.cus-hero-deco-item', {autoAlpha: 0, scale: .6})
            gsap.set('.cus-hero-deco-item-img', {autoAlpha: 0, clipPath: 'circle(20% at 50% 50%)'})
            gsap.set(title.words, {autoAlpha: 0, yPercent: 60})
            gsap.set(sub.words, {autoAlpha: 0, yPercent: 80})
            this.tlFade = new gsap.timeline({
                scrollTrigger: {
                    paused: true,
                    once: true
                },
                onComplete: () => {
                    $('.cus-hero-deco-item').each((idx, el) => {
                        float(el)
                    })
                }
            })
            this.tlFade
                .to(title.words, {autoAlpha: 1, yPercent: 1, duration : .6, stagger: .03})
                .to(sub.words, {autoAlpha: 1, yPercent: 1, duration : .6, stagger: .02}, '<=0.2')
                .to('.cus-hero-deco-item', {autoAlpha: 1, scale: 1, stagger: {from: "random", amount: .5}, duration: .4, clearProps: 'all'}, '<=.4')
                .to('.cus-hero-deco-item-img', {autoAlpha: 1, clipPath: 'circle(50% at 50% 50%)', stagger: {from: "random", amount: .2}, duration: .6}, '<=.2');
                function float(el) {
                    const randomX = random(parseRem(-5), parseRem(5));
                    const randomY = random(parseRem(-5), parseRem(5));
                    const randomTimeX = random(5, 10);
                    const randomTimeY = random(3, 5);

                    function animate() {
                        const xDirection = randomX(1);
                        const yDirection = randomY(1);
                        gsap.to(el, {
                            x: xDirection,
                            y: yDirection,
                            duration: randomTimeX(),
                            ease: "power1.inOut",
                            onComplete: () => {
                                requestAnimationFrame(animate);
                            },
                        });
                    }

                    animate();

                    function random(min, max) {
                        const delta = max - min;
                        return (direction = 1) => (min + delta * Math.random()) * direction;
                    }

                    function parseRem(value) {
                        return value * parseFloat(getComputedStyle(document.documentElement).fontSize);
                    }
                }
        }
        play(){
            this.tlFade.play();
        }
    }
    let customerHero = new CustomerHero();
    class CustomerForward {
        constructor(){
            this.tlTrigger;
            this.requestId;
        }
        setTrigger(){
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.cus-forward',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.setup()
                    },
                }
            })
        }
        setup(){
            let title = new SplitType($('.cus-forward-title'), {types: 'lines, words', lineClass: 'bp-line heading-line'})
            gsap.set(title.words, {autoAlpha: 0, yPercent: 60})
            gsap.set('.cus-forward-item .line', {autoAlpha: 0, transformOrigin: 'left'})
            gsap.set('.cus-forward-item .line-vertical', {autoAlpha: 0, transformOrigin: 'left'})
            let tlFade = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.cus-forward-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true
                }
            })
            tlFade
                .to(title.words, {autoAlpha: 1, yPercent: 0, duration : .6, stagger: .02})
            let tlFadeline = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.cus-forward-main',
                    start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                    once: true
                }
            })
            tlFadeline
                .to('.cus-forward-item .line', {autoAlpha: 1, duration: .3})
                .to('.cus-forward-item .line-vertical', {autoAlpha: 1, duration: .3}, '<=0')
            $('.cus-forward-item').each((idx, item) => {
                replaceHyphen($(item).find('.cus-forward-item-sub'))
                let titleItem = new SplitType($(item).find('.cus-forward-item-title'), {types: "lines, words", lineClass: "bp-line heading-line"});
                let subItem = new SplitType($(item).find('.cus-forward-item-sub'), {types: "lines, words", lineClass: "bp-line "});
                gsap.set($(item).find('.cus-forward-item-ic'), {autoAlpha: 0, scale: .6})
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60})
                gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80})
                let tlFadeItem = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start : viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
                        once: true,
                    }
                })
                tlFadeItem
                    .to($(item).find('.cus-forward-item-ic'), {autoAlpha: 1, scale: 1, duration: .8, clearProps: 'all'})
                    .to(titleItem.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=.2')
                    .to(subItem.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4, onComplete: () => {
                        subItem.revert();
                    }}, '<=.2')
            })
            this.interact();
        }
        interact(){
            this.requestId = requestAnimationFrame(()=>updateMarquee('.appr-customer-bg-top'));
        }
        destroy(){
            cancelAnimationFrame(this.requestId);
        }
    }
    let customerForward = new CustomerForward();
    class CustomerCompet {
        constructor() {
            this.tlTrigger;
        }
        setTrigger(){
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.cus-compet',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.setup();
                    },
                }
            })
        }
        setup(){
            let title = new SplitType('.cus-compet-title', {types: 'words lines', lineClass: 'bp-line heading-line'});
            let tlHead = gsap.timeline({
                scrollTrigger: {
                    trigger: '.cus-compet-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%': 'top top+=50%',
                    once: true,
                }
            });
            tlHead
                .from(title.words, {autoAlpha: 0, yPercent: 60, duration: .6, stagger: .02})
            let allItems = $('.cus-compet-item');
            allItems.each((idx, item) => {
                let tlItem = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: viewport.w > 767 ? 'top top+=65%' : 'top top+=40%',
                        once: true,
                    }
                })
                let titleItem = new SplitType($(item).find('.cus-compet-item-title'), {types: 'words lines', lineClass: 'bp-line heading-line'});
                let subItem = new SplitType($(item).find('.cus-compet-item-sub'), {types: 'words lines', lineClass: 'bp-line'});
                gsap.set($(item).find('.cus-compet-item-ic'), {autoAlpha: 0, scale: .6})
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60})
                gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80})
                if($(item).find('.cus-compet-item-bot').length >0){
                    gsap.set($(item).find('.cus-compet-item-bot'), {scaleX: 0, transformOrigin: 'left'})
                }
                if($(item).find('.cus-compet-item-top').length >0){
                    gsap.set($(item).find('.cus-compet-item-top'), {scaleX: 0, transformOrigin: 'left'})
                }
                tlItem
                    .to($(item).find('.cus-compet-item-ic'), {autoAlpha: 1, scale: 1, duration: .8})
                if($(item).find('.cus-compet-item-top').length >0){
                    tlItem
                        .to($(item).find('.cus-compet-item-top'), {scaleX: 1, duration: 1, clearProps: 'all'}, '<=0')
                }

                tlItem
                    .to(titleItem.words, {autoAlpha: 1, yPercent: 0, duration: .6, stagger: .02}, '<=.2')
                    .to(subItem.words, {autoAlpha: 1, yPercent: 0, duration: .4, stagger: .015}, '<=.2')
                    if($(item).find('.cus-compet-item-bot').length >0){
                        tlItem
                            .to($(item).find('.cus-compet-item-bot'), {scaleX: 1, duration: 1, clearProps: 'all'}, '<=0')
                    }
            })
        }
     }
     let customerCompet = new CustomerCompet();
    class CustomerService{
        constructor(){
            this.tlTrigger;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.cus-service',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.setup()
                    },
                }
            })
        }
        setup(){
            let title = new SplitType('.cus-service-title', {types: 'words lines', lineClass: 'bp-line heading-line'});
            let label = new SplitType('.cus-service-label', {types: 'words lines', lineClass: 'bp-line'});
            gsap.set(label.words, {autoAlpha: 0, yPercent: 80})
            gsap.set(title.words, {autoAlpha: 0, yPercent: 60})
            gsap.set('.cus-service-title-line', {scaleX: 0, transformOrigin: 'left'})
            let tlHead = gsap.timeline({
                scrollTrigger: {
                    trigger: '.cus-service-title-wrap',
                    start: viewport.w > 767 ? 'top top+=65%': 'top top+=50%',
                    once: true,
                }
            });
            tlHead
                .to(label.words, {autoAlpha: 1, yPercent: 0, duration: .6, stagger: .02})
                .to(title.words, {autoAlpha: 1, yPercent: 0, duration: .8, stagger: .02}, '<=.2')
                .to('.cus-service-title-line', {scaleX: 1, duration: .6, clearProps: 'all'}, '<=.2')
            let tlImg = gsap.timeline({
                scrollTrigger: {
                    trigger: '.cus-service-thumb',
                    start: viewport.w > 767 ? 'top top+=50%': 'top top+=45%',
                    once: true,
                }
            });
            gsap.set('.cus-service-thumb-list', {autoAlpha: 0, clipPath: 'circle(35% at 50% 50%)'})
            tlImg
                .to('.cus-service-thumb-list', {autoAlpha: 1, clipPath: 'circle(50% at 50% 50%)', duration: 1, clearProps: 'all'})
            $('.cus-service-content-item').each((idx, item) => {
                replaceHyphen($(item).find('.cus-service-content-item-sub'));

                let titleItem = new SplitType($(item).find('.cus-service-content-item-title'), {types: 'lines, words', lineClass: 'bp-line heading-line'})
                let subItem = new SplitType($(item).find('.cus-service-content-item-sub'), {types: 'lines, words', lineClass: 'bp-line '})
                gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60})
                gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80})
                if(viewport.w < 992){
                    gsap.set($(item).find('.cus-service-content-item-img'), {autoAlpha: 0, clipPath: 'circle(30% at 50% 50%)' })
                }
                gsap.set($(item).find('.cus-service-content-item-ar'), {autoAlpha: 0, scale: .3})
                gsap.set($(item).find('.cus-service-content-item-link'), {autoAlpha: 0, y: 20})
                if($(item).find('.line.cus-service-content-item-line').length > 0){
                    gsap.set($(item).find('.line.cus-service-content-item-line'), {scaleX: 0, transformOrigin: 'left'})
                }
                let tlFadeItem = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: viewport.w > 767 ? 'top top+=80%' : 'top top+=45%',
                        once: true,
                    }
                })
                if($(item).find('.line.cus-service-content-item-line').length > 0){
                    tlFadeItem
                        .to($(item).find('.line.cus-service-content-item-line'), {scaleX : 1, duration: 1, clearProps: 'all'})
                }
                if(viewport.w < 992){
                    tlFadeItem
                        .to($(item).find('.cus-service-content-item-img'), {autoAlpha: 1, clipPath: 'circle(50% at 50% 50%)', duration: 1, clearProps: 'all'}, '<=.2')
                }
                tlFadeItem
                    .to($(item).find('.cus-service-content-item-ar'), {autoAlpha: 1, scale: 1, duration: .6, clearProps: 'all'}, '<=.2')
                    .to(titleItem.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=0')
                    .to(subItem.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4, onComplete: () => {
                        subItem.revert();
                    }}, '<=.2')
                    .to($(item).find('.cus-service-content-item-link'), {autoAlpha: 1, y: 0, stagger: .015, duration: .6, clearProps: 'all'}, '<=.2')

            })
            if(viewport.w > 767){
                activeItem(['.cus-service-thumb-item'], 0)
                $('.cus-service-content-item').on('mouseenter', function(){
                    let index = $(this).index();
                    console.log(index)
                    activeItem(['.cus-service-thumb-item'], index)
                })
            }
        }
    }
    let customerService = new CustomerService()
    class Footer {
        constructor() {
            this.tlTrigger;
            this.requestId;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.footer',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {

                        this.setup()
                    },
                }
            })
        }
        setup() {
            var currentYear = new Date().getFullYear();
            $('.txt-year').text(currentYear)
            if($('.footer-head-label').text() == ''){
                $('.footer-head-label').remove();
            }
            if($('.footer-head-title-hidden').text().trim() !=''){
                $('.footer-head-title').each(function() {
                    // Lấy nội dung của footer-head-title và footer-head-title-hidden
                    let titleText = $(this).text().trim();
                    let hiddenText = $(this).siblings('.footer-head-title-hidden').text().trim();

                    // Nếu hiddenText tồn tại trong titleText, thay thế đoạn đó bằng thẻ span
                    if (titleText.includes(hiddenText)) {
                        let highlightedText = titleText.replace(
                            hiddenText,
                            `<span class="txt-cl-green">${hiddenText}</span>`
                        );
                        $(this).html(highlightedText); // Gán lại nội dung đã thay thế
                    }
                });
            }
            function getLengthPath(id){
                var svgElement = $(`#${id}`).get(0);
                if(svgElement){
                    var svgHeight = svgElement.getBoundingClientRect().height;
                    var viewBoxHeight = svgElement.viewBox.baseVal.height;
                    var scaleFactor = svgHeight / viewBoxHeight;
                    $('.footer-head-deco-line').height(`${scaleFactor*4}px`)
                    var myPath = $(svgElement).find("#footer-path-line").get(0);
                    if(myPath){
                        var pathLength = myPath.getTotalLength();
                        var realLength = pathLength * scaleFactor;
                        return realLength;
                    }

                    return 0;
                }

                return 0;
            }
            let lengthPath = getLengthPath('footer-head-line-svg');
            let lengthLineDiv = $('.footer-head-deco-line').width();
            let time =1;
            let acceler = lengthLineDiv*2/(time*time);
            let timePath = Math.sqrt(lengthPath*2/ acceler);
            if($('.footer-head-title .txt-cl-green').length > 0){
                spanGreen('.footer-head-title .txt-cl-green')
            }
            // $('.footer-head-title').addClass('heading-has-span')
            const title = new SplitType('.footer-head-title', {types: 'lines, words', lineClass: 'bp-line heading-line'});
            let label = '';
            if($('.footer-head-label').length > 0){
                label = new SplitType('.footer-head-label', {types: 'lines, words', lineClass: 'bp-line'})
            }
            addSpaceToText('.footer-head-title .sp-special .word')
            let tlFadeHead = new gsap.timeline({
            scrollTrigger: {
                trigger: '.footer-head',
                start: 'top top+=70%',
                once: true,
            },
            onComplete: () => {
                if (label !==''){
                    label.revert();
                }
            }
           })
           tlFadeHead
                .from('.footer-head-logo', {autoAlpha: 0, y: 50, duration: .8, clearProps: 'all'})
            if($('.footer-head-label').length > 0){
                tlFadeHead
                    .from(label.words, {autoAlpha: 0, yPercent: 80, stagger: .02, duration: .5}, '<=0')
            }
            tlFadeHead
                .from(title.words, {autoAlpha: 0, yPercent: 50, stagger: .02, duration: .6}, '<=.2')
                .from('.footer-head .btn', {autoAlpha: 0, yPercent: 30, duration: .6, clearProps:'all'}, viewport.w > 991 ? '<=0' : '>=-.2')
                .from('.footer-head-deco-line', { scaleX: 0, transformOrigin: 'left', duration: time, ease: 'none'}, '<=.4')
                .fromTo('.footer-head-deco-img #footer-path-line',{ strokeDasharray: `0 1`}, { strokeDasharray: `1 1`, duration: timePath, ease: 'none'}, '>=0')
                .from('.footer-head-deco-img #footer-path-arrow', {autoAlpha: 0, duration: .8, clearProps:'all', ease: 'power3.out'}, '>=.0')
            let tlFadeContact = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.footer-contact',
                    start: 'top top+=70%',
                    once: true,
                }
            })
            tlFadeContact
                .from('.footer-contact-item', {autoAlpha: 0, yPercent: 60, stagger: .1, duration: .6, clearProps: 'all'})
                .from('.footer-contact-social', {autoAlpha: 0, yPercent: 60, duration: .6, clearProps: 'all'}, '<=0')
                .from('.footer-contact .footer-contact-line', {autoAlpha: 0, scaleX: 0, transformOrigin:'left', duration: 1,ease:'power2.out', clearProps: 'all'}, '<=0.4')
            let footerMenuItems = $('.footer-menu-item');
            footerMenuItems.each((idx, item) => {
                gsap.set($(item).find('.footer-menu-item-title'), {autoAlpha: 0, yPercent: 80})
                let tlMenuItem = new gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: viewport.w > 991 ? 'top top+=65%' : 'top top+=75%',
                        once: true,
                    },
                })
                tlMenuItem
                    .to($(item).find('.footer-menu-item-title'), {autoAlpha: 1, yPercent: 0, duration: .8, stagger: .1, clearProps: 'all',})
                if(idx == 0){
                    const menuItemDec = new SplitType($(item).find('.footer-menu-item-label'), {types: 'lines, words', lineClass: 'bp-line'});
                    tlMenuItem
                        .from(menuItemDec.words, {autoAlpha: 0, yPercent: 100, stagger: .02, duration: .4, onComplete: () => {
                            // menuItemDec.revert();
                        }}, '<=.2')
                        .from('.ft-happy-img', {autoAlpha: 0, y: 30, duration: .6, clearProps: 'all'}, '<=.3')
                }
                else {
                    tlMenuItem
                        .from($(item).find('.footer-menu-item-link'), {autoAlpha: 0, yPercent: 80, stagger: .1, duration: .4, clearProps: 'all'}, '<=.2')
                }
                if(idx == footerMenuItems.length - 1)
                tlMenuItem
                    .from('.footer-menu .footer-contact-line', {autoAlpha: 0, scaleX: 0, transformOrigin:'left', duration: 1,ease:'power2.out', clearProps: 'all'}, '<=.3' )

            })
            let footerCopyText = new SplitType('.footer-bot-copy-txt',{types: 'lines, words', lineClass: 'bp-line'})
            let tlFadeFooterBot = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.footer-bot',
                    start: 'top bottom',
                    once: true,
                },
                onComplete: () => {
                    footerCopyText.revert();
                }
            })

            tlFadeFooterBot
                .from(footerCopyText.words, {autoAlpha: 0, yPercent: 100, stagger: .02, duration: .4 })
                .from('.footer-bot-menu .footer-legal-item-link', {autoAlpha: 0, yPercent: 100, stagger: .1, duration: .4, clearProps: 'all'}, ',=.2')
        this.interact();
        }
        interact() {
            this.requestId = requestAnimationFrame(() => updateMarquee('.footer-bg-top'));
        }
        destroy() {
            cancelAnimationFrame(this.requestId)
        }

    }
    let footer = new Footer();

    const SCRIPTS = {
        home: {
            namespace: 'home',
            afterEnter() {
                console.log('home afterEnter');
                if(viewport.w > 991) {
                    homeHero.setup();
                homeTransform.setTrigger();
                homeProduct.setTrigger();
                homeBenefit.setTrigger();
                homeRpet.setTrigger();
                homeService.setTrigger();
                homeMarket.setTrigger();
                // homeTesti.setTrigger();
                homeAbout.setTrigger();
                footer.setTrigger();
                }
                else{
                homeHero.setup();
                homeTransform.setup();
                homeProduct.setup();
                homeBenefit.setup();
                homeRpet.setup();
                homeService.setup();
                homeMarket.setup();
                // homeTesti.setup();
                homeAbout.setup();
                footer.setup();
                }
            },
            beforeLeave() {
                homeHeroCanvas.destroy()
                console.log('home clean')
            }
        },
        about: {
            namespace: 'about',
            afterEnter() {
                if(viewport.w > 991){
                    aboutHero.setup();
                    aboutQuality.setTrigger();
                    aboutProduct.setTrigger();
                    aboutSol.setTrigger();
                    aboutWhale.setTrigger();
                    aboutService.setTrigger();
                    footer.setTrigger();
                }
                else{
                    aboutHero.setup();
                    aboutQuality.setup();
                    aboutProduct.setup();
                    aboutSol.setup();
                    aboutWhale.setup();
                    aboutService.setup();
                    footer.setup();
                }
            },
            beforeLeave(){
                aboutProduct.destroy();
            }

        },
        blog: {
            namespace: 'blog',
            afterEnter() {
                blogHero.setup()
                blogArticle.setup();
                if(viewport.w > 991){
                    footer.setTrigger();
                }
                else{
                    footer.setup();
                }
                blogHeroAnim.setup();
            }
        },
        blogDetail: {
            namespace: 'blog-detail',
            afterEnter() {
                if(viewport.w > 991){
                    blogDetailHero.setup()
                    footer.setTrigger();

                }
                else{
                    blogDetailHero.setup()
                    footer.setup();

                }
            }

        },
        subpage: {
            namespace: 'subpage',
            afterEnter() {
                $('.footer').css('opacity', '0')
                initTermlyScriptAsync()
                    .then(() => {
                        subpageHero.setup();
                        setTimeout(() => {
                            $('.footer').css('opacity', '1')
                            ScrollTrigger.refresh();
                        }, 1000);
                        if (viewport.w > 991) {
                            footer.setTrigger();
                        } else {
                            footer.setup();
                        }
                    })
                    .catch((error) => {
                        console.error("Error initializing Termly Script:", error);
                    });
            },
            beforeLeave() {
                // Any logic before leaving the page
            }
        },
        contact: {
            namespace: 'contact',
            afterEnter() {
                contactHero.setup();
                if(viewport.w > 991){
                    footer.setTrigger();
                }
                else{
                    footer.setup();
                }
            }

        },
        productPet: {
            namespace: 'product-pet',
            afterEnter() {
                if(viewport.w > 991){
                    prCustomer.setTrigger();
                    prProduct.setTrigger();
                    prProcess.setTrigger();
                    prManufact.setTrigger();
                    prSpec.setTrigger();
                    prFood.setTrigger();
                    homeBenefit.setTrigger();
                    footer.setTrigger();
                }
                else{
                    prCustomer.setup();
                    prProduct.setup();
                    prProcess.setup();
                    prSpec.setup();
                    prFood.setup();
                    prManufact.setup();
                    homeBenefit.setup();
                    footer.setup();
                }
                prHero.setup();
            },
            beforeLeave() {
                prFood.destroy();
                prCustomer.destroy();
            }
        },
        productRpet: {
            namespace: 'product-rpet',
            afterEnter() {
                if(viewport.w > 991){
                    prCustomer.setTrigger();
                    prProduct.setTrigger();
                    prProcess.setTrigger();
                    prFood.setTrigger();
                    prManufact.setTrigger();
                    homeBenefit.setTrigger();
                    prExcell.setTrigger();
                    footer.setTrigger();
                }
                else{
                    prCustomer.setup();
                    prExcell.setup();
                    prProcess.setup();
                    prManufact.setup();
                    prProduct.setup();
                    prFood.setup();
                    homeBenefit.setup();
                    footer.setup();
                }
                prHero.setup();
            },
            beforeLeave() {
                prFood.destroy();
                prCustomer.destroy();
            }

        },
        capalityRpetFlake: {
            namespace: 'capality-rpet-flake',
            afterEnter() {
                if(viewport.w > 991){
                    capalityService.setTrigger();
                    capalityChoose.setTrigger();
                    capalityProcess.setTrigger();
                    homeBenefit.setTrigger();
                    capalityReason.setTrigger()
                    capalitSol.setTrigger();
                    prFood.setTrigger();
                    capalityCanvas.init();
                    footer.setTrigger();
                }
                else{
                    capalityCanvas.init();
                    capalityService.setup();
                    capalityChoose.setup();
                    homeBenefit.setup();
                    capalityReason.setup();
                    prFood.setup();
                    capalitSol.setup();
                    capalityProcess.setup();
                    footer.setup();
                }
                capalityHero.setup();
            },
            beforeLeave(){
                capalityCanvas.destroy();
                prFood.destroy();
            }

        },
        capalityRpetColor: {
            namespace: 'capality-rpet-color',
            afterEnter() {
                if(viewport.w > 991){
                    capalityReason.setTrigger()
                    capalityService.setTrigger();
                    capalityChoose.setTrigger();
                    capalityProcess.setTrigger();
                    capalitSol.setTrigger();
                    homeBenefit.setTrigger();
                    prFood.setTrigger();
                    footer.setTrigger();
                }
                else{
                    capalityService.setup();
                    capalityReason.setup();
                    capalityChoose.setup();
                    prFood.setup();
                    capalitSol.setup();
                    homeBenefit.setup();
                    capalityProcess.setup();
                    footer.setup();
                }
                capalityHero.setup();
            },
            beforeLeave() {
                prFood.destroy();
            }

        },
        capalityRpetExtrusion: {
            namespace: 'capality-rpet-extrusion',
            afterEnter() {
                if(viewport.w > 991){
                    capalityService.setTrigger();
                    capalityChoose.setTrigger();
                    capalityProcess.setTrigger();
                    capalitSol.setTrigger();
                    prFood.setTrigger();
                    capalityReason.setTrigger();
                    homeBenefit.setTrigger();
                    footer.setTrigger();
                }
                else{
                    capalityService.setup();
                    capalityChoose.setup();
                    capalityReason.setup();
                    prFood.setup();
                    capalitSol.setup();
                    capalityProcess.setup();
                    homeBenefit.setup();
                    footer.setup();
                }
                capalityHero.setup();
            },
            beforeLeave() {
                prFood.destroy();
            }

        },
        applicationRpet: {
            namespace: 'app-rpet',
            afterEnter() {
                if(viewport.w > 991){
                    appProduct.setTrigger();
                    homeBenefit.setTrigger();
                    appCustomer.setTrigger();
                    appBenefit.setTrigger();
                    footer.setTrigger();
                }
                else{
                    homeBenefit.setup();
                    appProduct.setup();
                    appCustomer.setup();
                    appBenefit.setup();
                    footer.setup();
                }
                appHero.setup();

            },
            beforeLeave(){
                appCustomer.destroy();
                appProduct.destroy();
            }

        },
        applicationPet: {
            namespace: 'app-pet',
            afterEnter() {
                if(viewport.w > 991){
                    appPackage.setTrigger();
                    appKey.setTrigger();
                    appConcept.setTrigger();
                    appValue.setTrigger();
                    appProduct.setTrigger();
                    appDevelop.setTrigger();
                    footer.setTrigger();

                }
                else{
                    appPackage.setup();
                    appKey.setup();
                    appConcept.setup();
                    appValue.setup();
                    appProduct.setup();
                    appDevelop.setup();
                    footer.setup();
                }
                appHero.setup();

            },
            beforeLeave(){
                appCustomer.destroy();
                appProduct.destroy();
            }

        },
        customer: {
            namespace: 'customer',
            afterEnter() {
                if(viewport.w > 991){
                    prFood.setTrigger();
                    customerService.setTrigger();
                    customerForward.setTrigger();
                    customerCompet.setTrigger();
                    footer.setTrigger();
                }
                else{
                    prFood.setup();
                    customerService.setup();
                    customerForward.setup();
                    customerCompet.setup();
                    footer.setup();
                }
                customerHero.setup();
            },
            beforeLeave(){
                prFood.destroy();
                customerForward.destroy();
            }

        }
    }
    const VIEWS = Object.values(SCRIPTS);
    pageTrans.setup()
    barba.init({
        preventRunning: true,
        sync: true,
        debug: true,
        transitions: [{
            name: 'default-transition',
            sync: true,
            once(data) {
                resetScroll();
                globalScript();
                loading.init();
                if(viewport.w < 992){
                    setTimeout(function(){
                        ScrollTrigger.refresh();
                    }, 2000)
                }
            },
            beforeLeave({current}) {
                lenis.stop();
                $('.header.active').removeClass('active');

                if(viewport.w < 992){
                    $('.header-menu-item-wrap.active').removeClass('active');
                    $('.header-menu-drop').slideUp();
                }
            },
            async leave(data) {
                footer.destroy();
                // console.log('leave global')
                await pageTrans.leaveAnim(data).then(() => {
                    console.log('trans enter')
                    pageTrans.enterAnim(data)
                })
            },
            afterLeave(data) {
                console.log('after leave global')
            },
            beforeEnter(data){
                lenis.start();
                console.log('before enter')
            },
            enter(data) {
                console.log('enter global')
                globalScript();

                if(viewport.w < 992){
                    setTimeout(function(){
                        ScrollTrigger.refresh();
                    }, 2000)
                }
            },
            afterEnter(data) {
                console.log('after enter global')
                multilineText($('.hover-un'))
                // footerSocialMouse()
            },
        }],
        views: VIEWS
    })

}
window.onload = mainScript;