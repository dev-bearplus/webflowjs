const script = () => {
    $.easing.exponentialEaseOut = function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
    };
    $.fn.hasAttr = function (name) {
        return this.attr(name) !== undefined;
    };
    barba.use(barbaPrefetch);

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({
        // invalidateOnRefresh: true,
        // fastScrollEnd: true
    });
    const viewport = {
        w: window.innerWidth,
        h: window.innerHeight,
    };
    const device = { desktop: 991, tablet: 767, mobile: 479 }

    const cvUnit = (val, unit) => {
        let result;
        switch (true) {
            case unit === 'vw':
                result = window.innerWidth * (val / 100);
                break;
            case unit === 'vh':
                result = window.innerHeight * (val / 100);
                break;
            case unit === 'rem':
                result = val / 10 * parseFloat($('html').css('font-size'));
                break;
            default: break;
        }
        return result;
    }
    const debounce = (func, timeout = 300) => {
        let timer

        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(() => { func.apply(this, args) }, timeout)
        }
    }
    function reinitializeWebflow() {
        window.Webflow && window.Webflow.destroy();
        window.Webflow && window.Webflow.ready();
    }
    const getAllScrollTrigger = (fn) => {
        let triggers = ScrollTrigger.getAll();
        triggers.forEach(trigger => {
            trigger[fn]();
        });
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
                        smoothScroll.lenis.scrollTo(`#${searchObj.sc}`, {
                            offset: -100
                        })
                    }, 500);
                    barba.history.add(`${window.location.pathname + target}`, 'barba', 'replace');
                } else {
                    scrollTop()
                }
            }
        } else {
            scrollTop()
        }
    }
    function scrollTop(onComplete) {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
        smoothScroll.lenis.scrollTo("top", {
            duration: .0001, lock: true,
            onComplete: () => {
                onComplete?.();
                getAllScrollTrigger("refresh");
            }
        });
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
            this.lenis = new Lenis({})
            this.lenis.on('scroll', ScrollTrigger.update)

            this.gl = new GL();
            this.lenis.on('scroll', (e) => {
                this.updateOnScroll(e);
                this.gl.onScroll(e)
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
            if (header) {
                header.updateOnScroll(smoothScroll.lenis);
            };
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
                duration: .5,
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
        setup(isReverse) {
            const cloneAmount = Math.ceil(viewport.w / this.list.width()) + 1;
            let itemClone = this.list.find('[data-marquee="item"]').clone();
            let itemWidth = this.list.find('[data-marquee="item"]').width();
            this.list.html('');
            new Array(cloneAmount).fill().forEach(() => {
                let html = itemClone.clone()
                html.css('animation-duration', `${Math.ceil(itemWidth / this.duration)}s`);
                if (isReverse) {
                    html.css('animation-direction', 'reverse');
                }
                html.addClass('anim-marquee');
                this.list.append(html);
            });
        }
    }

    class ParallaxImage {
        constructor({ el, scaleOffset = 0.3 }) {
            this.el = el;
            this.elWrap = null;
            this.scaleOffset = scaleOffset;
            this.init();
        }
        init() {
            this.elWrap = this.el.parentElement;
            this.setup();
        }
        setup() {
            gsap.set(this.el, { height: '120%' });
            this.scrub();
        }
        scrub() {
            let dist = this.el.offsetHeight - this.elWrap.offsetHeight;
            let total = this.elWrap.getBoundingClientRect().height + window.innerHeight;
            this.updateOnScroll(dist, total);
            smoothScroll.lenis.on('scroll', () => {
                this.updateOnScroll(dist, total);
            });
        }
        updateOnScroll(dist, total) {
            if (this.el) {
                if (isInViewport(this.elWrap)) {
                    let percent = this.elWrap.getBoundingClientRect().bottom / total;
                    gsap.quickSetter(this.el, 'y', 'px')(-dist * percent * 1.2);
                    gsap.set(this.el, { scale: 1 + (percent * this.scaleOffset) });
                }
            }
        }
    }
    class Media {
        constructor ({ gl, geometry, scene, renderer, screen, viewport, $el, img }) {
            this.gl = gl
            this.geometry = geometry
            this.scene = scene
            this.renderer = renderer
            this.screen = screen
            this.viewport = viewport
            this.img = img
            this.$el = $el
            this.scroll = 0

            this.createShader()
            this.createMesh()

            this.onResize()
        }
        createShader () {
            const texture = new Texture(this.gl, {
            generateMipmaps: false
            })

            this.program = new Program(this.gl, {
            depthTest: false,
            depthWrite: false,
            fragmentShader,
            vertexShader,
            uniforms: {
                tMap: { value: texture },
                uPlaneSize: { value: [0, 0] },
                uImageSize: { value: [0, 0] },
                uViewportSize: { value: [this.viewport.width, this.viewport.height] },
                uTime: { value: 100 * Math.random() },
            },
            transparent: true
            })

            const image = new Image()

            image.src = this.img.src
            image.onload = _ => {
            texture.image = image

            this.program.uniforms.uImageSize.value = [image.naturalWidth, image.naturalHeight]
            }
        }
        createMesh () {
            this.plane = new Mesh(this.gl, {
            geometry: this.geometry,
            program: this.program
            })

            this.plane.setParent(this.scene)
        }
        onScroll (scroll) {
            this.scroll = scroll
            this.setY(this.y)
        }
        update () {
            this.program.uniforms.uTime.value += 0.04
        }
        setScale (x, y) {
            x = x || this.$el.offsetWidth
            y = y || this.$el.offsetHeight
            this.plane.scale.x = this.viewport.width * x / this.screen.width
            this.plane.scale.y = this.viewport.height * y / this.screen.height

            this.plane.program.uniforms.uPlaneSize.value = [this.plane.scale.x, this.plane.scale.y]
        }
        setX(x = 0) {
            this.x = x
            this.plane.position.x = -(this.viewport.width / 2) + (this.plane.scale.x / 2) + (this.x / this.screen.width) * this.viewport.width
        }
        setY(y = 0) {
            this.y = y
            this.plane.position.y = (this.viewport.height / 2) - (this.plane.scale.y / 2) - ((this.y - this.scroll) / this.screen.height) * this.viewport.height
        }
        onResize ({ screen, viewport } = {}) {
            if (screen) {
            this.screen = screen
            }

            if (viewport) {
            this.viewport = viewport
            this.plane.program.uniforms.uViewportSize.value = [this.viewport.width, this.viewport.height]
            }
            this.setScale()

            this.setX(this.$el.offsetLeft)
            this.setY(this.$el.offsetTop)
        }
    }
    class GL {
        constructor () {
            this.images = [...document.querySelectorAll('.home-hero-bg-item')]

            this.createRenderer()
            this.createCamera()
            this.createScene()

            this.onResize()

            this.createGeometry()
            this.createMedias()

            this.update()

            this.addEventListeners()
        }
        createRenderer () {
            this.renderer = new Renderer({
            canvas: document.querySelector('#gl'),
            alpha: true
            })

            this.gl = this.renderer.gl
        }
        createCamera () {
            this.camera = new Camera(this.gl)
            this.camera.fov = 45
            this.camera.position.z = 20
        }
        createScene () {
            this.scene = new Transform()
        }
        createGeometry () {
            this.planeGeometry = new Plane(this.gl, {
            heightSegments: 50,
            widthSegments: 100
            })
        }
        createMedias () {
            this.medias = this.images.map(item => {
            return new Media({
                gl: this.gl,
                geometry: this.planeGeometry,
                scene: this.scene,
                renderer: this.renderer,
                screen: this.screen,
                viewport: this.viewport,
                $el: item,
                img: item.querySelector('img')
            })
            })
        }
        onResize () {
            this.screen = {
            width: window.innerWidth,
            height: window.innerHeight
            }

            this.renderer.setSize(this.screen.width, this.screen.height)

            this.camera.perspective({
            aspect: this.gl.canvas.width / this.gl.canvas.height
            })

            const fov = this.camera.fov * (Math.PI / 180)
            const height = 2 * Math.tan(fov / 2) * this.camera.position.z
            const width = height * this.camera.aspect

            this.viewport = {
            height,
            width
            }
            if (this.medias) {
            this.medias.forEach(media => media.onResize({
                screen: this.screen,
                viewport: this.viewport
            }))
            this.onScroll({scroll: window.scrollY})
            }
        }
        onScroll({scroll}) {
            if (this.medias) {
            this.medias.forEach(media => media.onScroll(scroll))
            }
        }
        update() {
            if (this.medias) {
            this.medias.forEach(media => media.update())
            }

            this.renderer.render({
            scene: this.scene,
            camera: this.camera
            })
            window.requestAnimationFrame(this.update.bind(this))
        }
        addEventListeners () {
            window.addEventListener('resize', this.onResize.bind(this))
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
            $("a").each(function (index, link) {
                if ($(this).attr('data-sub-link') && (!$(this).attr('href').includes('#')) && (!$(this).attr('href').includes('sc'))) {
                    $(this).attr('href', `${$(this).attr('href')}#${$(this).attr('data-sub-link')}`);
                    $(this).attr('data-barba-history', 'replace');
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
                        $(this).attr('href', `${urlPath}?sc=${anchor}`);
                    }
                }
            });
            $('a').on('click', function (e) {
                if ($(this).attr('data-sub-link')) {
                    barba.history.add(`${window.location.pathname + `#${$(this).attr('data-sub-link')}`}`, 'barba', 'replace');

                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            $(`#${$(this).attr('data-sub-link')}`).trigger('click');
                        }, $(this).hasClass('w--current') ? 0 : 1000);

                        $("a").each(function (index, link) {
                            $(link).toggleClass("w--current", $(link).attr('href') == `${window.location.pathname}${window.location.hash}`);
                        });
                    })
                }
            })
        }
        refreshOnBreakpoint() {
            const breakpoints = [479, 767, 991];
            const initialViewportWidth = viewport.w || document.documentElement.clientWidth;
            const breakpoint = breakpoints.find(bp => initialViewportWidth < bp) || breakpoints[breakpoints.length - 1];
            window.addEventListener('resize', debounce(function () {
                const newViewportWidth = viewport.w || document.documentElement.clientWidth;
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
                delay: .5,
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
            scrollTop();
            resetScroll();
            smoothScroll.start();
            reinitializeWebflow();
            if (data.current.container) {
                data.current.container.remove();
            }
        }
    }
    const pageTrans = new PageTrans();

    class TriggerSetup {
        constructor() {
            this.tlTrigger = null;
            this.isPlayed = false;
            this.once = true;
        }
        setTrigger(triggerEl, onTrigger) {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerEl,
                    start: 'clamp(top bottom+=50%)',
                    end: 'bottom top-=50%',
                    onEnter: () => {
                        if (this.isPlayed && this.once) {
                            this.once = false;
                            this.onTrigger();
                        }
                    },
                    onEnterBack: () => {
                        if (this.isPlayed && this.once) {
                            this.once = false;
                            onTrigger();
                        }
                    },
                }
            })
        }
        playTrigger() {
            this.isPlayed = true;
            if (window.scrollY === 0) window.scrollTo(0, 1)
        }
        cleanTrigger() {
            if (this.isPlayed) {
                this.isPlayed = false;
            }
            if (!this.once) {
                this.once = true;
            }
            if (this.tlTrigger) {
                this.tlTrigger.kill();
                this.tlTrigger = null;
            }
        }
    }

    class Header {
        constructor() {
            this.el = null;
            this.isOpen = false;
        }
        init(data) {
            this.el = document.querySelector('.header');
        }
        updateOnScroll(inst) {
            // this.toggleHide(inst);
            // this.toggleScroll(inst);
        }
        toggleScroll(inst) {
            if (inst.scroll > $(this.el).height() * 2) $(this.el).addClass("on-scroll");
            else $(this.el).removeClass("on-scroll");
        }
        toggleHide(inst) {
            if (inst.direction == 1) {
                if (inst.scroll > ($(this.el).height() * 3)) {
                    $(this.el).addClass('on-hide');
                }
            } else if (inst.direction == -1) {
                if (inst.scroll > ($(this.el).height() * 3)) {
                    $(this.el).addClass("on-hide");
                    $(this.el).removeClass("on-hide");
                }
            }
            else {
                $(this.el).removeClass("on-hide");
            }
        }
        toggleNav() {
        }
        handleClick(e) {
            e.preventDefault();
            this.isOpen ? this.close() : this.open();
        }
        open() {
            if (this.isOpen) return;
            $('.header').addClass('on-open-nav');
            $('.header-toggle').addClass('active');
            this.isOpen = true;
            smoothScroll.lenis.stop();
        }
        close() {
            if (!this.isOpen) return;
            $('.header').removeClass('on-open-nav');
            $('.header-toggle').removeClass('active');
            this.isOpen = false;
            smoothScroll.lenis.start();
        }
    }
    const header = new Header();
    class Footer extends TriggerSetup {
        constructor() {
            super();
            this.el = null;
        }
        trigger(data) {
            this.el = data.next.container.querySelector('.footer');
            super.setTrigger(this.el, this.onTrigger.bind(this));
        }
        onTrigger() {
            this.animationReveal();
            this.animationScrub();
        }
        animationReveal() {
        }
        animationScrub() {
        }
        destroy() {
        }
    }
    const footer = new Footer();

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
            }
            setupOnce(data) {
                this.tlOnce = gsap.timeline({
                    paused: true,
                    onStart: () => $('[data-init-hidden]').removeAttr('data-init-hidden')
                })

                // this.animationReveal(this.tlOnce);
            }
            setupEnter(data) {
                this.tlEnter = gsap.timeline({
                    paused: true,
                    onStart: () => $('[data-init-hidden]').removeAttr('data-init-hidden')
                })

                this.tlTriggerEnter = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
                        start: 'top bottom+=50%',
                        end: 'bottom top-=50%',
                        once: true,
                        onEnter: () => this.tlEnter.play(),
                        onEnterBack: () => this.tlEnter.play(),
                        onStart: () => $('[data-init-hidden]').removeAttr('data-init-hidden')
                    }
                })

                // this.animationReveal(this.tlEnter);
            }
            playOnce() {
                this.tlOnce.play();
            }
            playEnter() {
                // if (isInViewport(this.el)) {
                //     this.tlEnter.play();
                // }
            }
            animationReveal(timeline) {
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
    }

    class PageManager {
        constructor(page) {
            this.sections = Object.values(page).map(section => new section());

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
                if (section.playTrigger) {
                    section.playTrigger();
                }
            });
        }

        enterPlayHandler(event) {
            this.sections.forEach(section => {
                if (section.playEnter) {
                    section.playEnter(event.detail);
                }
                if (section.playTrigger) {
                    section.playTrigger();
                }
            });
        }

        setupHandler(event) {
            const data = event.detail;
            const mode = event.mode;
            this.sections.forEach(section => {
                if (section.trigger) {
                    section.trigger(data);
                }
                if (section.setup) {
                    section.setup(data, mode);
                }
            });
        }

        destroy(data) {
            const container = data.next.container;
            container.removeEventListener("onceSetup", this.boundSetupHandler);
            container.removeEventListener("oncePlay", this.boundOncePlayHandler);
            container.removeEventListener("enterSetup", this.boundSetupHandler);
            container.removeEventListener("enterPlay", this.boundEnterPlayHandler);

            this.sections.forEach(section => {
                if (section.destroy) {
                    section.destroy();
                }
                if (section.cleanTrigger) {
                    section.cleanTrigger();
                }
            });
        }
    }
    class HomePageManager extends PageManager {
        constructor(page) { super(page); }
    }
    const PageManagerRegistry = {
        home: new HomePageManager(HomePage),
    };
    const SCRIPT = {
        home: {
            namespace: 'home',
            afterEnter(data) {
                PageManagerRegistry.home.initEnter(data);
            },
            beforeLeave(data) {
                PageManagerRegistry.home.destroy(data);
            }
        }
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
                scrollTop(PageManagerRegistry[namespace]?.initOnce?.(data));
                resetScroll();
                header.init(data);
            },
            async leave(data) {
                await pageTrans.play(data);
            },
        }],
        views: VIEWS
    })
}
window.onload = script