
const mainScript = () => {
    $.easing.lenisEase = function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
    };
    barba.use(barbaPrefetch);
    gsap.registerPlugin(ScrollTrigger);
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    ScrollTrigger.defaults({
        invalidateOnRefresh: true,
        scroller: '.main-inner',
    });
    const applyColors = (elements, colors, reverse) => {
        $(elements).each((i, el) => {
            $(el).css('stroke', reverse ? colors[colors.length - 1 - i] : colors[i]);
        });
    };
    const copyProperty = (el, target, properties) => {
        properties.forEach(property => {
            const value = gsap.getProperty(el, property);
            gsap.set(target, { [property]: value });
        });
    }
    const parseRem = (input) => {
        return input / 10 * parseFloat($('html').css('font-size'))
    }
    function replaceHyphen(el) {
        const oldHtml = el.innerHTML;
        const newHtml = oldHtml.replaceAll("-", "<span>-</span>");
        el.innerHTML = newHtml;
    }
    const debounce = (func, timeout = 300) => {
        let timer

        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(() => { func.apply(this, args) }, timeout)
        }
    }
    const xSetter = (el) => gsap.quickSetter(el, 'x', `px`);
    const ySetter = (el) => gsap.quickSetter(el, 'y', `px`);
    const setFixedWidth = (el) => {
        let width = el.getBoundingClientRect().width;
        el.style.width = width + 'px';
    }
    const lerp = (a, b, t) => (1 - t) * a + t * b;
    const parallaxTimeline = ({triggerEl, offset = {start: 0, end: 0}, triggerOpts = {}, animEls = [{animEl: null, offset: {start: 0, end: 0}, isImage: false}]}) => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerEl,
                horizontal: true, start: `left+=${offset.start}% right`, end: `right+=${offset.end}% left`, scrub: true,
                ...triggerOpts
            },
            defaults: { ease: 'none' }
        })
        animEls.forEach((el) => {
            tl.fromTo(el.animEl, { xPercent: el.offset.start}, { xPercent: el.offset.end}, 0)
            if (el.isImage) {
                gsap.set(el.animEl.querySelector('img'), { scale: 1.2, transformOrigin: 'var(--oriX) 50%', '--oriX': '100%' })
                tl.fromTo(el.animEl.querySelector('img'), {scale: 1.2, '--oriX': '100%' }, {scale: 1, '--oriX': '0%' }, 0)
            }
        })
        return tl;
    }
    const documentHeightObserver = (action, data, callback) => {
        let resizeObserver;
        let debounceTimer;
        let observerEl = data?.next.container.querySelector('.main-content');

        let previousHeight = observerEl?.getBoundingClientRect().height;
        function onRefresh() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const currentHeight = observerEl.getBoundingClientRect().height;

                if (currentHeight !== previousHeight) {
                    if (smoothScroll.lenis) {
                        smoothScroll.lenis.resize();
                        ScrollTrigger.refresh();
                    }
                    if (callback) {
                        callback();
                    }
                    previousHeight = currentHeight;
                }
            }, 200);
        }

        if (action === "init") {
            if (!observerEl) return;
            resizeObserver = new ResizeObserver(onRefresh);
            resizeObserver.observe(observerEl);
        } else if (action === "disconnect") {
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        }
    };
    const distance = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);

    const isInViewport = (el, orientation = 'vertical') => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (orientation == 'horizontal') {
            return (
                rect.left <= (window.innerWidth) &&
                rect.right >= 0
            );
        } else {
            return (
                rect.top <= (window.innerHeight) &&
                rect.bottom >= 0
            );
        }
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
    const mouse = new Mouse();
    class SmoothScroll {
        constructor() {
            this.lenis = null;
            this.scroller = {
                scrollX: window.scrollX,
                scrollY: window.scrollY,
                velocity: 0
            }

            this.lastScroller = {
                scrollX: window.scrollX,
                scrollY: window.scrollY,
                velocity: 0
            }
        }
        init(data) {
            this.reinit(data);
            gsap.ticker.add((time) => {
                if (this.lenis) {
                    this.lenis.raf(time * 1000);
                }
            });
            gsap.ticker.lagSmoothing(0);
        }
        reinit(data) {
            let namespace = data ? data.next.namespace : $('[data-barba="container"]').attr('data-barba-namespace');
            this.lenis = new Lenis({
                wrapper: data ? data.next.container.querySelector('.main-inner') : document.querySelector('.main-inner'),
                orientation: $(window).width() > 991 ? namespace == 'home' ? 'horizontal' : 'vertical' : 'vertical',
                gestureOrientation: $(window).width() > 991 ? "both" : "vertical",
                smoothTouch: false,
                infinite: namespace == 'home' ? true : false,
                syncTouch: $(window).width() > 991 ? false : true
            })
            if (namespace == 'home') {
                if (window.innerWidth > 991) {
                    this.lenis.scrollTo(window.innerWidth + window.innerHeight * .09, {immediate: true});
                } else {
                    this.lenis.scrollTo(window.innerHeight + window.innerWidth * .09, {immediate: true});
                }

            }
            this.lenis.on('scroll', ScrollTrigger.update)
            this.lenis.on('scroll', (e) => {
                this.updateOnScroll(e);
            });
        }
        toggleInfinite() {
            if (!this.lenis.options.infinite) {
                this.lenis.options.infinite = true;
            }
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
            if (header) {
                header.updateOnScroll(smoothScroll.lenis);
            };
        }
    }
    const smoothScroll = new SmoothScroll();
    const Animate = {
        Title: class {
            constructor(el) {
                this.el = el;
                this.init();
            }
            init() {
                this.text = this.el.querySelector('.heading');
                this.setup()
            }
            setup() {
                this.reveal()
            }
            reveal() {
                let title = new SplitType(this.text, {types: 'lines, words, chars', lineClass: 'bp-line', wordClass: 'bp-word'});
                this.revealTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.text.parentElement,
                        horizontal: $(window).width() > 991,
                        start: `${$(window).width() > 991 ? 'left right-=25%' : 'top bottom-=25%'}`,
                        end: `${$(window).width() > 991 ? 'right left+=25%' : 'bottom top+=25%'}`,
                        once: true,
                    },
                    onComplete: () => {
                        title.revert()
                    }
                })
                this.revealTl
                    .fromTo(title.chars, {
                        yPercent: 100, opacity: 0,
                    }, {
                        yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.02,
                    })
            }
            destroy() {
                this.revealTl.kill();
                this.text = null;
                this.el = null;
            }
        },
        DoubleTitle: class {
            constructor(el, parallax = false, startPercent = -35, endPercent = 15) {
                this.el = el;
                this.parallax = parallax;
                this.startPercent = startPercent;
                this.endPercent = endPercent;
                this.init();
            }
            init() {
                this.textMain = this.el.querySelector('[data-dou-text="main"]');
                this.textClone = this.el.querySelector('[data-dou-text="clone"]');
                this.setup()
            }
            setup() {
                this.reveal()
                this.parallax && this.scrub()
            }
            reveal() {
                this.splitTitle = new SplitType(this.textMain, {types: 'lines, words, chars', lineClass: 'bp-line', wordClass: 'bp-word'});
                this.splitClone = new SplitType(this.textClone, {types: 'lines, words, chars', lineClass: 'bp-line', wordClass: 'bp-word'});
                this.revealTl = gsap.timeline({
                    paused: true,
                })
                this.revealTl
                .fromTo(this.splitTitle.chars, {
                    yPercent: 60, opacity: 0
                }, {
                    yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.02,
                })
                .fromTo(this.splitClone.chars, {
                    yPercent: 60, opacity: 0,
                }, {
                    yPercent: 0, duration: 0.5, opacity: 1, stagger: 0.02,
                }, '<=0')
            }
            setTrigger() {
                this.triggerTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.textMain.parentElement,
                        horizontal: $(window).width() > 991,
                        start: `${$(window).width() > 991 ? `left-=35% right-=30%` : 'top bottom-=25%'}`,
                        once: true,
                        onEnter: () => {
                            this.play();
                        }
                    },
                })
            }
            play() {
                this.revealTl.play();
            }
            getEls() {
                return {
                    main: this.splitTitle,
                    clone: this.splitClone
                }
            }
            scrub() {
                this.scrubTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.textMain.parentElement,
                        horizontal: $(window).width() > 991,
                        start: `${$(window).width() > 991 ? `left+=${this.startPercent}% right` : `top+=${this.startPercent}% bottom`}`,
                        end: `${$(window).width() > 991 ? `right+=${this.endPercent}% left` : `bottom+=${this.endPercent}% top`}`,
                        scrub: true
                    },
                    defaults: {
                        ease: 'none',
                    }
                })
                if ($(window).width() > 991) {
                    this.scrubTl
                        .fromTo(this.textMain, {xPercent: this.startPercent}, {xPercent: this.endPercent, duration: 1})
                        .fromTo(this.textClone, {xPercent: this.startPercent}, {xPercent: this.endPercent, duration: 1}, '<=0')
                }
                else {
                    this.scrubTl
                        .fromTo(this.textMain, {yPercent: this.startPercent}, {yPercent: this.endPercent, duration: 1})
                        .fromTo(this.textClone, {yPercent: this.startPercent}, {yPercent: this.endPercent, duration: 1}, '<=0')
                }
            }
            destroy() {
                if (this.triggerTl) {
                    this.triggerTl.kill();
                }
                this.revealTl.kill();
                this.scrubTl.kill();
                this.textMain = null;
                this.textClone = null;
                this.el = null;
            }
        },
        ParallaxImage: class {
            constructor({ el }) {
                this.el = el;
                this.elWrap = null;
                this.init();
            }
            init() {
                this.elWrap = this.el.parentElement;
                this.setup();
            }
            setup() {
                $(window).width() > 991 && gsap.set(this.el, { width: '120%' });
                $(window).width() > 991 && this.scrub();
            }
            scrub() {
                let dist = this.el.offsetWidth - this.elWrap.offsetWidth;
                let total = this.elWrap.getBoundingClientRect().width + window.innerWidth;
                this.updateOnScroll(dist, total);
                smoothScroll.lenis.on('scroll', () => {
                    this.updateOnScroll(dist, total);
                });
            }
            updateOnScroll(dist, total) {
                if (this.el) {
                    if(isInViewport(this.elWrap,'horizontal')){
                        let percent = this.elWrap.getBoundingClientRect().right/total;
                        xSetter(this.el)(-dist * percent * .9);
                    }
                }
            }
        },
        ScaleInset: class {
            constructor({ el, delay = 0 }) {
                this.el = el;
                this.elWrap = null;
                this.tl = null;
                this.revealDelay = delay;
                this.init();
            }
            init() {
                this.elWrap = this.el.parentElement;
                this.setup();
            }
            setup() {
                let borderRad = gsap.getProperty(this.elWrap, 'border-radius');
                this.tl = gsap
                    .timeline({
                        scrollTrigger: {
                            trigger: this.elWrap,
                            start: 'top top+=85%',
                            once: true
                        }
                    })
                    .fromTo(this.elWrap,
                        {clipPath: `inset(20% round ${borderRad}px)` },
                        { clipPath: `inset(0% round ${borderRad}px)`, duration: 2, ease: 'expo.out', clearProps: 'all'})
                    .fromTo(this.el,
                        { scale: 1.4, autoAlpha: 0 },
                        { scale: 1, duration: 2, autoAlpha: 1, ease: 'expo.out', clearProps: 'all' }, "<=0")
            }
        }
    }
    class Image {
        constructor(el) {
            this.el = el;
            this.elInner = this.el.querySelector('img');
            this.defaultStyles = {scale: 1, x: 0, y: 0, opacity: 0}
            this.rect = this.el.getBoundingClientRect();
        }
        destroy() {
            this.el = null;
            this.elInner = null;
            this.rect = null;
            if (this.timeline) {
                this.timeline.kill();
                this.timeline = null;
            }
        }
    }
    class ImagesTrail {
        constructor(el) {
            this.el = el;
            this.threshold = 80;
            this.images = [...this.el.querySelectorAll('.home-photo-trail-item')].map(img => new Image(img));
            this.imagesTotal = this.images.length;
            this.imgPosition = 0;
            this.zIndexVal = 1;
            this.activeImagesCount = 0;
            this.isIdle = true;
            this.idleInterval = null;
            this.raf = requestAnimationFrame(() => this.render());
            this.lastScrollX = smoothScroll.scroller.scrollX;
        }
        render() {
            if (isInViewport(this.el, 'horizontal') && document.querySelectorAll('.home-photo-trail-wrap:hover').length > 0) {
                if (mouse.reachedThreshold(this.threshold)) {
                    this.showNextImage();
                    if (this.idleInterval) {
                        clearInterval(this.idleInterval);
                        this.idleInterval = null;
                    }
                } else if (smoothScroll.reachedThreshold(this.threshold * 1.2)) {
                    this.showNextImage();
                    if (this.idleInterval) {
                        clearInterval(this.idleInterval);
                        this.idleInterval = null;
                    }
                } else {
                    if (!this.idleInterval) {
                        this.idleInterval = setInterval(() => {
                            this.showNextImage();
                        }, 600);
                    }
                }
                if (this.isIdle && this.zIndexVal !== 1) {
                    this.zIndexVal = 1;
                }
            } else {
                requestAnimationFrame(() => this.render());
                if (this.idleInterval) {
                    clearInterval(this.idleInterval);
                    this.idleInterval = null;
                }
                return;
            }

            this.raf = requestAnimationFrame(() => this.render());
        }
        showNextImage() {
            ++this.zIndexVal;
            this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
            const img = this.images[this.imgPosition];
            img.el && gsap.killTweensOf(img.el);

            img.timeline = gsap.timeline({
                onStart: () => this.onImageActivated(),
                onComplete: () => this.onImageDeactivated()
            })

            .fromTo(img.el, {
                opacity: 1,
                scale: 1,
                zIndex: this.zIndexVal,
                x: mouse.cacheMousePos.x - img.rect.width/2 - this.el.getBoundingClientRect().left,
                y: mouse.cacheMousePos.y - img.rect.height/2 - this.el.getBoundingClientRect().top
            }, {
                duration: 0.8,
                scale: .8,
                ease: 'expo.out',
                x: mouse.mousePos.x - img.rect.width/2 - this.el.getBoundingClientRect().left,
                y: mouse.mousePos.y - img.rect.height/2 - this.el.getBoundingClientRect().top,
            }, 0)

            .to(img.el, { duration: 1.2, ease: 'power3.out', opacity: 0, scale: 0}, 0.4)
        }
        onImageActivated = () => {
            this.activeImagesCount++;
            this.isIdle = false;
        }
        onImageDeactivated = () => {
            this.activeImagesCount--;
            if (this.activeImagesCount === 0) {
                this.isIdle = true;
            }
        }
        destroy() {
            cancelAnimationFrame(this.raf);
            this.images.forEach((img) => {
                img.destroy()
            });
            this.images = null;
            this.el = null;
            this.DOM = null;
        }
    }
    class Media {
        constructor({ scene, geometry, renderer, screen, viewport, image, length, index }) {
            this.scene = scene;
            this.geometry = geometry;
            this.renderer = renderer;
            this.screen = screen;
            this.viewport = viewport;
            this.image = image;
            this.length = length;
            this.index = index;
            this.extra = 0;

            this.createShader();
            this.createMesh();
            this.onResize();
        }
        createShader() {
            this.texture = new THREE.TextureLoader().load(this.image, (texture) => {
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                texture.generateMipmaps = false;

                // Update uniforms with image dimensions
                this.material.uniforms.uImageSize.value = [
                    texture.image.naturalWidth,
                    texture.image.naturalHeight
                ];
            });

            this.material = new THREE.ShaderMaterial({
                uniforms: {
                    tMap: { value: this.texture },
                    uPosition: { value: 0 },
                    uPlaneSize: { value: [0, 0] },
                    uImageSize: { value: [0, 0] },
                    uSpeed: { value: 0 },
                    rotationAxis: { value: new THREE.Vector3(0, 1, 0) },
                    distortionAxis: { value: new THREE.Vector3(1, 1, 0) },
                    uDistortion: { value: 3 },
                    uViewportSize: { value: [this.viewport.width, this.viewport.height] },
                    uTime: { value: 0 },
                },
                vertexShader,
                fragmentShader,
                side: THREE.DoubleSide,
                depthTest: false,
                depthWrite: false,
            });
        }
        createMesh() {
            this.plane = new THREE.Mesh(this.geometry, this.material);
            this.scene.add(this.plane);
        }
        setScale(x = 320, y = 300) {
            this.plane.scale.x = (this.viewport.width * x) / this.screen.width;
            this.plane.scale.y = (this.viewport.height * y) / this.screen.height;
            this.material.uniforms.uPlaneSize.value = [
                this.plane.scale.x,
                this.plane.scale.y,
            ];
        }
        setX() {
            this.x = 0;
            this.plane.position.x = -(this.viewport.width / 2) + this.plane.scale.x / 2 + this.x;
        }
        onResize({ screen, viewport } = {}) {
            if (screen) this.screen = screen;
            if (viewport) {
                this.viewport = viewport;
                this.material.uniforms.uViewportSize.value = [
                    this.viewport.width,
                    this.viewport.height,
                ];
            }
            this.setScale();
            this.padding = 0.8;
            this.height = this.plane.scale.y + this.padding;
            this.heightTotal = this.height * this.length;
            this.y = this.height * this.index;
        }
        update(scroll, direction) {
            this.plane.position.y = this.y - scroll.current - this.extra;
            const position = this.remapValue(
                this.plane.position.y,
                -this.viewport.height,
                this.viewport.height,
                5,
                15
            );
            this.material.uniforms.uPosition.value = position;
            this.material.uniforms.uTime.value += 0.04;
            this.material.uniforms.uSpeed.value = smoothScroll.lenis && smoothScroll.lenis.velocity;

            const planeOffset = this.plane.scale.y / 2;
            const viewportOffset = this.viewport.height;
            this.isBefore = this.plane.position.y + planeOffset < -viewportOffset;
            this.isAfter = this.plane.position.y - planeOffset > viewportOffset;

            if (direction === 'up' && this.isBefore) {
                this.extra -= this.heightTotal;
                this.isBefore = false;
                this.isAfter = false;
            }
            if (direction === 'down' && this.isAfter) {
                this.extra += this.heightTotal;
                this.isBefore = false;
                this.isAfter = false;
            }
        }
        remapValue(num, min1, max1, min2, max2, round = false) {
            const num1 = (num - min1) / (max1 - min1);
            const num2 = num1 * (max2 - min2) + min2;

            if (round) return Math.round(num2);

            return num2;
        }
        destroy() {
            this.scene.remove(this.plane);
            this.plane.geometry.dispose();
            this.plane.material.dispose();
            this.texture.dispose();
            this.material.dispose();
            this.geometry.dispose();
        }
    }
    class ImagesGallery {
        constructor(el) {
            this.el = el;
            this.canvas = this.el.querySelector('canvas');
            this.images = Array.from(this.el.querySelectorAll('.home-photo-gallery-item img')).map(img => img.src);
            this.scroll = { ease: 0.1, current: 0, target: 0, last: 0};
            this.init();
        }
        init() {
            this.createRenderer();
            this.createCamera();
            this.createScene();

            this.onResize();

            this.createGeometry();
            this.createMedias();

            this.update.bind(this)();

            this.addEventListeners();
        }
        createRenderer() {
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.canvas,
                alpha: true,
                antialias: true,
            })
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.renderer.setSize(this.el.clientWidth, this.el.clientHeight);
        }
        createCamera() {
            this.camera = new THREE.PerspectiveCamera(45, this.el.clientWidth / this.el.clientHeight, 0.1, 1000);
            this.camera.position.z = 20;
        }
        createScene() {
            this.scene = new THREE.Scene();
        }
        createGeometry() {
            this.planeGeometry = new THREE.PlaneGeometry(1, 1, 100, 1);
        }
        createMedias() {
            this.medias = this.images.map((image, index) => {
                return new Media({
                    scene: this.scene,
                    geometry: this.planeGeometry,
                    renderer: this.renderer,
                    screen: this.screen,
                    viewport: this.viewport,
                    image: image,
                    length: this.images.length,
                    index: index,
                });
            });

        }
        onResize() {
            if (!this.el) return;
            this.screen = {
                width: this.el.clientWidth,
                height: this.el.clientHeight,
            };

            this.renderer.setSize(this.screen.width, this.screen.height);

            this.camera.aspect = this.screen.width / this.screen.height;
            this.camera.fov = 45;
            this.camera.updateProjectionMatrix();

            const fovRad = this.camera.fov * (Math.PI / 180);
            const height = 2 * Math.tan(fovRad / 2) * this.camera.position.z;
            const width = height * this.camera.aspect;

            this.viewport = {
                height,
                width,
            };

            if (this.medias) {
                this.medias.forEach((media) =>
                    media.onResize({
                        screen: this.screen,
                        viewport: this.viewport,
                    })
                );
            }
        }
        onWheel(event) {
            const speed = smoothScroll.scroller.velocity;
            this.scroll.target += speed * 0.1;
        }
        update(data) {
            this.scroll.current += .05 + (smoothScroll.scroller.velocity * .1);
            this.scroll.ease = Math.min(Math.max(smoothScroll.scroller.velocity / 50, .05), .15);

            if (isInViewport(this.canvas, 'horizontal')) {
                if (this.scroll.current > this.scroll.last) {
                    this.direction = 'up';
                } else {
                    this.direction = 'down';
                }

                if (this.medias) {
                    this.medias.forEach((media) => media.update(this.scroll, this.direction));
                }

                this.renderer.render(this.scene, this.camera);

                this.scroll.last = this.scroll.current;
            }
            requestAnimationFrame(this.update.bind(this));
        }
        addEventListeners() {
            window.addEventListener("resize", this.onResize);
            window.addEventListener("wheel", this.onWheel.bind(this));

            // window.addEventListener("mousedown", this.onTouchDown);
            // window.addEventListener("mousemove", this.onTouchMove);
            // window.addEventListener("mouseup", this.onTouchUp);

            // window.addEventListener("touchstart", this.onTouchDown);
            // window.addEventListener("touchmove", this.onTouchMove);
            // window.addEventListener("touchend", this.onTouchUp);
        }
        destroy() {
            window.removeEventListener("resize", this.onResize);
            window.removeEventListener("wheel", this.onWheel);

            // window.removeEventListener("mousedown", this.onTouchDown);
            // window.removeEventListener("mousemove", this.onTouchMove);
            // window.removeEventListener("mouseup", this.onTouchUp);

            // window.removeEventListener("touchstart", this.onTouchDown);
            // window.removeEventListener("touchmove", this.onTouchMove);
            // window.removeEventListener("touchend", this.onTouchUp);

            setTimeout(() => {
                if (this.medias) {
                    this.medias.forEach((media) => media.destroy());
                }
                this.renderer.dispose();
                this.renderer.forceContextLoss();
                this.renderer.domElement = null;
                this.renderer = null;
                this.scene = null;
                this.camera = null;
                this.geometry = null;
                this.material = null;
                this.plane = null;
                this.planeGeometry = null;
                this.texture = null;
                this.material = null;
                this.scene = null;
                this.renderer = null;
                this.screen = null;
                this.viewport = null;
                this.images = null;
                this.canvas = null;
                this.el = null;
            }, 400);
        }
    }
    class ShaderScroll {
        constructor(canvas) {
            this.canvas = canvas;

            this.CAMERA_POS = 500
            this.observer
            this.mediaStore
            this.scene
            this.geometry
            this.material
        }
        init() {
            this.setup();
            this.play()
        }
        setup() {
            // create intersection observer to only render in view elements
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    const index = entry.target.dataset.index
                    if (index) {
                        this.mediaStore[parseInt(index)].isInView = entry.isIntersecting
                    }
                })
            }, { rootMargin: '500px 0px 500px 0px' })

            // scene
            this.scene = new THREE.Scene()

            // camera
            this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 10, 1000)
            this.camera.position.z = this.CAMERA_POS
            this.camera.fov = this.calcFov(this.CAMERA_POS)
            this.camera.updateProjectionMatrix()

            // geometry and material
            this.geometry = new THREE.PlaneGeometry(1, 1, 100, 100)
            this.material = new THREE.ShaderMaterial({
                uniforms: {
                    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                    uTime: { value: 0 },
                    uCursor: { value: new THREE.Vector2(0.5, 0.5) },
                    uScrollVelocity: { value: 0 },
                    uTexture: { value: null },
                    uTextureSize: { value: new THREE.Vector2(100, 100) },
                    uQuadSize: { value: new THREE.Vector2(100, 100) },
                    uBorderRadius: { value: 0 },
                    uMouseEnter: { value: 0 },
                    uMouseOverPos: { value: new THREE.Vector2(0.5, 0.5) }
                },
                vertexShader: effectVertex,
                fragmentShader: effectFragment,
                glslVersion: THREE.GLSL3
            })

            // renderer
            this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true })
            this.renderer.setSize(window.innerWidth, window.innerHeight)
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        }
        play() {
            window.addEventListener('resize', debounce(this.onResize.bind(this)))
            // init
            this.setMediaStore(nav.scroller.scrollY)
            // render loop
            requestAnimationFrame(this.render.bind(this))
            setTimeout(() => {
                this.allMedia.forEach((media, i) => {
                    media.style.opacity = 0
                })
            }, 100);
        }
        handleMouseEnter(index) {
            gsap.to(
                this.mediaStore[index],
                { mouseEnter: 1, duration: 0.6, ease: 'power2.out' }
            )
        }
        handleMousePos(e, index) {
            const bounds = this.mediaStore[index].media.getBoundingClientRect()
            const x = e.offsetX / bounds.width
            const y = e.offsetY / bounds.height
            this.mediaStore[index].mouseOverPos.target.x = x
            this.mediaStore[index].mouseOverPos.target.y = y
        }
        handleMouseLeave (index) {
            gsap.to(
                this.mediaStore[index],
                { mouseEnter: 0, duration: 0.6, ease: 'power2.out' }
            )
            gsap.to(
                this.mediaStore[index].mouseOverPos.target,
                { x: 0.5, y: 0.5, duration: 0.6, ease: 'power2.out' }
            )
        }
        setMediaStore = (scrollY) => {
            this.allMedia = [...document.querySelectorAll('.nav img')]
            this.mediaStore = this.allMedia.map((media, i) => {
                const type = media.getAttribute('data-scroll-img')
                this.observer.observe(media)
                media.dataset.index = String(i)
                media.addEventListener('mouseenter', () => this.handleMouseEnter(i))
                media.addEventListener('mousemove', e => this.handleMousePos(e, i))
                media.addEventListener('mouseleave', () => this.handleMouseLeave(i))

                const bounds = media.getBoundingClientRect()
                const imageMaterial = this.material.clone()
                const imageMesh = new THREE.Mesh(this.geometry, imageMaterial)

                const textureLoader = new THREE.TextureLoader();

                const texture = textureLoader.load(media.getAttribute('src'), () => {
                    imageMaterial.uniforms.uTexture.value = texture;
                }, undefined, (error) => {
                    console.error('Error loading texture:', error);
                });
                imageMaterial.uniforms.uTextureSize.value.x = media.naturalWidth
                imageMaterial.uniforms.uTextureSize.value.y = media.naturalHeight
                imageMaterial.uniforms.uQuadSize.value.x = Math.ceil(bounds.width)
                imageMaterial.uniforms.uQuadSize.value.y = Math.ceil(bounds.height)
                imageMaterial.uniforms.uBorderRadius.value = Math.ceil(getComputedStyle(media.parentElement).borderRadius.replace('px', ''))

                imageMesh.scale.set(Math.ceil(bounds.width), Math.ceil(bounds.height), 1)

                if (!(bounds.top >= 0 && bounds.top <= window.innerHeight)) {
                    imageMesh.position.y = 2 * window.innerHeight
                }

                this.scene.add(imageMesh)

                return {
                    media,
                    type: type,
                    material: imageMaterial,
                    mesh: imageMesh,
                    width: bounds.width,
                    height: bounds.height,
                    top: bounds.top + scrollY,
                    left: bounds.left,
                    isInView: bounds.top >= -500 && bounds.top <= window.innerHeight + 500,
                    mouseEnter: 0,
                    mouseOverPos: {
                        current: {
                            x: 0.5,
                            y: 0.5
                        },
                        target: {
                            x: 0.5,
                            y: 0.5
                        }
                    }
                }
            })
        }
        updateMedia(time) {
            this.mediaStore.forEach((object) => {
                if (object.isInView) {
                    object.mouseOverPos.current.x = lerp(object.mouseOverPos.current.x, object.mouseOverPos.target.x, 0.05)
                    object.mouseOverPos.current.y = lerp(object.mouseOverPos.current.y, object.mouseOverPos.target.y, 0.05)
                    object.material.uniforms.uResolution.value.x = window.innerWidth
                    object.material.uniforms.uResolution.value.y = window.innerHeight
                    object.material.uniforms.uTime.value = time
                    object.material.uniforms.uCursor.value.x = mouse.normalizeMousePos.current.x
                    object.material.uniforms.uCursor.value.y = mouse.normalizeMousePos.current.y
                    object.material.uniforms.uScrollVelocity.value = nav.scroller.velocity
                    object.material.uniforms.uMouseOverPos.value.x = object.mouseOverPos.current.x
                    object.material.uniforms.uMouseOverPos.value.y = object.mouseOverPos.current.y
                    object.material.uniforms.uMouseEnter.value = object.mouseEnter
                } else {
                    object.mesh.position.y = 2 * window.innerHeight
                }
            })
        }
        setPositions() {
            this.mediaStore.forEach((object, index) => {
                if ($('.nav').hasClass('active')) {
                    const navOpacity = parseFloat(window.getComputedStyle(document.querySelector('.nav')).opacity);

                    if (navOpacity > 0.1) {
                        // if vertical
                        object.mesh.position.x = object.left - window.innerWidth / 2 + object.width / 2;
                        object.mesh.position.y = -object.top + window.innerHeight / 2 - object.height / 2 + nav.scroller.scrollY;
                    } else {
                        // Hide the mesh when opacity is low
                        object.mesh.position.x = 2 * window.innerWidth; // Move off-screen
                    }

                    // Original commented code preserved
                    // const bounds = object.media.getBoundingClientRect()
                    // object.mesh.position.x = bounds.left + bounds.width / 2 - window.innerWidth / 2;
                    // object.mesh.position.y = -bounds.top + window.innerHeight / 2 - bounds.height / 2;
                    // object.mesh.scale.set(Math.ceil(bounds.width), Math.ceil(bounds.height), 1);
                    // if horizontal
                    // object.mesh.position.x = object.left - nav.scroller.scrollY + object.width / 2 - window.innerWidth / 2;
                    // object.mesh.position.y = -object.top + window.innerHeight / 2 - object.height / 2;
                }
            })
        }
        render(time = 0) {
            time /= 1000

            this.updateMedia.bind(this)(time)
            this.setPositions()
            this.renderer.render(this.scene, this.camera)
            requestAnimationFrame(this.render.bind(this))
        }
        calcFov(CAMERA_POS) {
            return 2 * Math.atan((window.innerHeight / 2) / CAMERA_POS) * 180 / Math.PI
        }
        resizeThreeCanvas(fov) {
            if (this.camera instanceof THREE.PerspectiveCamera) {
                this.camera.aspect = window.innerWidth / window.innerHeight

                if (fov) {
                    this.camera.fov = fov
                }
            }

            this.camera.updateProjectionMatrix()

            this.renderer.setSize(window.innerWidth, window.innerHeight)
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        }
        onResize() {
            const fov = this.calcFov(this.CAMERA_POS)

            this.resizeThreeCanvas(fov)

            this.mediaStore.forEach((object) => {
                const bounds = object.media.getBoundingClientRect()
                object.mesh.scale.set(bounds.width, bounds.height, 1)
                object.width = bounds.width
                object.height = bounds.height
                object.top = bounds.top + nav.scroller.scrollY
                object.left = bounds.left
                object.isInView = bounds.top >= 0 && bounds.top <= window.innerHeight,
                object.material.uniforms.uTextureSize.value.x = object.media.naturalWidth
                object.material.uniforms.uTextureSize.value.y = object.media.naturalHeight
                object.material.uniforms.uQuadSize.value.x = bounds.width
                object.material.uniforms.uQuadSize.value.y = bounds.height
                object.material.uniforms.uBorderRadius.value = getComputedStyle(object.media.parentElement).borderRadius.replace('px', '')
            })
        }
        destroy() {
            window.removeEventListener('resize', this.onResize.bind(this))
            this.mediaStore.forEach((object) => {
                this.observer.unobserve(object.media)
                this.scene.remove(object.mesh)
                object.material.uniforms.uTexture.value.dispose()
                object.material.dispose()
                object.geometry.dispose()
                object.mesh.geometry.dispose()
                object.mesh.material.dispose()
                object = null
            })
            this.canvas = null
            this.scene = null
            this.geometry = null
            this.material = null
            this.renderer = null
            this.canvas = null
            this.mediaStore = null
            this.observer = null
            this.mousePos = null
            this.mouseEnter = null
            this.mouseOverPos = null
            this.mouseLeave = null
        }
    }
    class Loader {
        constructor() {
            this.isLoaded = sessionStorage.getItem('isLoaded') === 'true' ? true : false;
            this.tlLoadDone = null;
            this.tlLoadMaster = null;
        }
        init(data) {
            gsap.set('.loader-sun', {'filter': 'blur(1px)', yPercent: 7})
            gsap.set('.loader-bg-gradient', {'background-image': 'radial-gradient(circle at 50% 57%, rgba(86,131,255,1) 0%, rgba(86,131,255,0) 100%)'})
            gsap.set('.loader-text', {y: 0, opacity: 1,  filter: 'blur(0px)'})

            this.tlFirst = gsap.timeline({
                paused: true,
                defaults: {ease: 'none'}
            })
            this.tlFirst
            .fromTo('.loader-text-inner', {yPercent: 0}, {yPercent: -1/3 * 100, duration: .6, ease: 'power1.inOut'})

            this.tlProgSun = gsap.timeline({
                paused: true,
                onUpdate() {
                    let count = Math.floor(this.progress() * 100);
                    $('.loader-text-count .txt').text(count < 10 ? '0' + count : count);
                },
                defaults: {ease: 'none'}
            })
            this.tlProgSun
                .to('.loader-sun', {'filter':'blur(0px)', yPercent: -70, duration: 3})
                .to('.loader-light', { yPercent: -52, opacity: 1, scaleX: 1, scaleY: 1, duration: 3}, "<=0")
                .to('.loader-light-clone', { opacity: .1, duration: 3}, "<=0")
                .to('.loader-bg-gradient', { opacity: .6, duration: 3}, "<=0")
                .to('.loader-bg-white', { opacity: .4, duration: 3}, "<=0")
                .to('.loader-sun-wrap', {'--sd-blur': '2rem', '--sd-spread': '0.5rem', '--sd-alpha': '.45', duration: 3}, "<=0")

            this.tlProgLogo = gsap.timeline({
                paused: true,
                defaults: {ease: 'none'}
            })
            this.tlProgLogo
            .to('.loader-sun-inner', {'--mask-top-1': '69%', duration: 1, ease: 'circ.out'})
            .to('.loader-sun-outer', {'--mask-top-2': '99%', duration: .8, ease: 'circ.out'}, '<=.2')
            .to('.loader-text-inner', { yPercent: -2/3 * 100, duration: 1, ease: 'circ.out' }, '<=.5')

            this.tlAfter = gsap.timeline({
                paused: true,
                defaults: {ease: 'none'},
                onStart: () => {
                    this.onceSetup(data);
                }
            })
            .to('.loader-sun-wrap', {'--sd-blur': '3rem', '--sd-spread': '5rem', '--sd-alpha': '1', duration: 2})
            .to('.loader-sun-glow', {scale: 1.4, opacity: 1, duration: 2}, '<=0')
            .to('.loader-light', { opacity: .2, scale: 2.4, duration: 2}, "<=0")
            .to('.loader-light-inner', {'filter': 'saturate(.1) brightness(1.3)' , duration: 2}, '<=0')
            .to('.loader-light-clone', { opacity: .07, scale: 1.2, duration: 2}, "<=0")
            .to('.loader-sun', {scale: 1.1, 'filter':'blur(.3rem)', opacity: 0 , duration: 2}, "<=0")
            .to('.loader-text', { y: 2, opacity: 0, duration: 1, filter: 'blur(.2rem)' }, "<=0")
            .to('.loader-bg-gradient', { opacity: 1, 'background-image': 'radial-gradient(circle at 50% 57%, #FBF1ED 20%, #1C2B71 130%)', duration: 1.5}, "<=.5")
            .to('.loader-bg-white', {opacity: 0, duration: 1.5}, "<=0")
            .to('.loader', {scale: 1.1, duration: 1.5}, "<=0")
            .to('.loader-bg-back', {background: '#869CF9', opacity: 0, duration: 1}, "<=.5")
            .to('.loader-sun', {opacity: 0, duration: .5}, "<=.5")
            .to('.loader-light-inner', { opacity: 0, duration: .5}, "<=0")

            this.tlLoadDone = gsap.timeline({
                paused: true,
                onStart: () => {
                    this.oncePlay(data);
                }
            })
            this.tlLoadDone
                .to('.loader-bg-front', { yPercent: 100, duration: 1, ease: 'power2.inOut'})

            this.tlLoading = gsap.timeline({
                paused: true,
                onStart: () => {
                },
                onComplete: () => {
                }
            })
            this.tlLoading
                .to(this.tlFirst, {duration: this.tlFirst.totalDuration(), progress: 1, ease: 'none' })
                .to(this.tlProgSun, { duration: this.tlProgSun.totalDuration() * (this.isLoaded ? .3 : 1), progress: 1, ease: 'power2.inOut' })
                .to(this.tlProgLogo, {delay: .1, duration: this.tlProgLogo.totalDuration(), progress: 1, ease: 'none' }, '>=-.2')
                .to(this.tlAfter, { duration: this.tlAfter.totalDuration(), progress: 1, ease: 'power2.inOut'})
                .to(this.tlLoadDone, { duration: this.tlLoadDone.totalDuration(), progress: 1, ease: 'none' }, '>=-1')

            this.tlLoadMaster = gsap.timeline({
                paused: true,
                delay: this.isLoaded ? 0 : 1,
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
    class Header {
        constructor() {
            this.el = null;
            this.toggleEl = null;
            this.toggleEl = null;
            this.tl = null;
            this.cloneHeader = null;
        }
        init(data) {
            this.el = document.querySelector('.header');
            this.toggleEl = this.el.querySelector('.header-toggle');
            this.toggleEl = this.el.querySelector('.header-toggle');
            this.updateStyle(data);

            this.tl = gsap.timeline({
                paused: true,
            })
            gsap.set('.header-link, .header-logo-main, .header-logo-sub', { 'overflow': 'hidden' });

            this.tl
                .from('.header-logo-main, .header-logo-sub-dot, .header-logo-sub-txt', { yPercent: 100, duration: 1, autoAlpha: 0, ease: 'power2.out', clearProps: 'all' })
                .from('.header-link-txt', { yPercent: 100, duration: 1, autoAlpha: 0, ease: 'power2.out', stagger: 0.05, clearProps: 'all' }, "<=.3")
                .from('.header-toggle, .header-back', { scale: 1.2, duration: 1, autoAlpha: 0, ease: 'circ.inOut', clearProps: 'all' }, "<=.3")
        }
        updateStyle(data) {
            this.resetStyle();
            let namespace = data.next.namespace;
            if (namespace == 'home') {
            } else if (namespace == 'detail') {
                document.querySelectorAll('.header').forEach((el) => {
                    el.classList.add('on-detail');
                    el.querySelector('.header-inner-page-txt').innerHTML = data.next.container.querySelector('.detail-hero-title').textContent;
                })
            }
        }
        updateOnScroll(inst) {
            if (this.el.classList.contains('on-detail')) {
                if (inst.scroll > this.el.clientHeight * 2) {
                    this.el.classList.add('on-scroll');
                } else {
                    this.el.classList.remove('on-scroll');
                }
            }
            else {
                if ($(window).width() <= 767) {
                    if (inst.scroll > this.el.clientHeight * 2) {
                        this.el.classList.add('on-scroll');
                    } else {
                        this.el.classList.remove('on-scroll');
                    }
                }
            }
        }
        isOpen() {
            return this.el.classList.contains('on-open-nav');
        }
        resetStyle() {
            console.log('reset style');
            document.querySelectorAll('.header').forEach((el) => {
                el.classList.remove('on-scroll');
                el.classList.remove('on-detail');
            })
            // this.el.classList.remove('on-scroll');
            // this.el.classList.remove('on-detail');
        }
        play() {
            this.tl.play();
        }
        addCloneHeader() {
            this.cloneHeader = this.el.cloneNode(true);
            this.cloneHeader.style.zIndex = '100000';
            this.cloneHeader.style.mixBlendMode = 'normal';
            this.cloneHeader.style.filter = 'blur(0px)';
            this.cloneHeader.style.pointerEvents = 'none';
            this.cloneHeader.style.opacity = '0';

            gsap.set([this.el, this.cloneHeader, this.el.querySelectorAll('*'), this.cloneHeader.querySelectorAll('*')], { 'pointer-events': 'none' });
            document.querySelector('.common').appendChild(this.cloneHeader);

            requestAnimationFrame(() => {
                gsap.to(this.cloneHeader, {
                    duration: .6,
                    opacity: 1,
                });
            });
        }

        updateCloneHeader(color) {
            const allElements = this.cloneHeader.querySelectorAll('*');
            allElements.forEach(el => el.style.color = color);

            const toggleOpenItems = this.cloneHeader.querySelectorAll('.header-toggle-open-item, .header-toggle-close-item');
            toggleOpenItems.forEach(item => item.style.backgroundColor = color);

            const toggleBg = this.cloneHeader.querySelector('.header-toggle-bg');
            if (toggleBg) toggleBg.style.color = '--_theme---scrollbar';
        }

        deleteCloneHeader() {
            if (!this.cloneHeader) return;
            gsap.fromTo(this.cloneHeader,
                { opacity: 1 },
                {
                    duration: .6,
                    opacity: 0,
                    onComplete: () => {
                        gsap.set([this.el, this.cloneHeader, this.el.querySelectorAll('*'), this.cloneHeader.querySelectorAll('*')], { clearProps: 'pointer-events' });
                        this.cloneHeader.remove();
                        this.cloneHeader = null;
                    }
                }
            );
        }
    }
    const header = new Header();
    class Nav {
        constructor() {
            this.el = null;
            this.isOpen = false;
            this.isInitEffect = false;
            this.scroller = {
                scrollX: window.scrollX,
                scrollY: window.scrollY,
                velocity: 0
            }
            this.tlToggle = null;
            this.setup();
        }
        setup(data) {
            this.el = document.querySelector('.nav');

            this.initScroller();
            this.animateToggle();
            requestAnimationFrame(this.toggleHandle.bind(this));

            if ($(window).width() > 991) {
                this.handleUpdateTheme();
                this.handleHover();
            }
        }
        initScroller() {
            this.navScroll = new Lenis({
                autoRaf: true,
                duration: 1.2,
                wrapper: document.querySelector('.nav-inner'),
                infinite: $(window).width() > 991,
            })
            this.navScroll.on('scroll', (e) => {
                this.updateOnScroll(e);
            });
        }
        toggleHandle() {
            header.toggleEl.addEventListener('click', this.handleClick.bind(this));
            header.toggleEl.addEventListener('mouseenter', function(e) {
                if (!this.isOpen) {
                    header.toggleEl.classList.remove('force-hover');
                    header.toggleEl.classList.remove('force-hover');
                }
            })
        }
        animateToggle() {
            this.tlToggle = gsap.timeline({
                paused: true,
                onComplete: () => gsap.set(header.toggleEl, { clearProps: 'pointer-events' }),
                onReverseComplete: () => gsap.set(header.toggleEl, { clearProps: 'pointer-events' })
            });
            let tlShowText = gsap.timeline({
                paused: true,
            })
            let tlShowItem = gsap.timeline({
                paused: true,
            })
        }
        animateToggle() {
            this.tlToggle = gsap.timeline({
                paused: true,
                onComplete: () => gsap.set(header.toggleEl, { clearProps: 'pointer-events' }),
                onReverseComplete: () => gsap.set(header.toggleEl, { clearProps: 'pointer-events' })
            });
            let tlShowText = gsap.timeline({
                paused: true,
            })
            let tlShowItem = gsap.timeline({
                paused: true,
            })

            this.title = new SplitType('.nav-title', { types: 'lines, words', lineClass: 'bp-line', wordClass: 'bp-word' });
            this.sub = new SplitType('.nav-sub', { types: 'lines, words', lineClass: 'lines', wordClass: 'bp-word' });
            this.subBot = new SplitType('.nav-bot-txt', { types: 'lines, words', lineClass: 'lines', wordClass: 'bp-word' });

            gsap.set('.nav-logo-ic', { yPercent: 100, autoAlpha: 0 });
            gsap.set('.nav-main', { y: 40 });
            gsap.set('.nav-logo-title-txt', { yPercent: 60, autoAlpha: 0 });
            gsap.set('.nav-bg', { autoAlpha: 0 });

            tlShowText
                .fromTo('.nav-logo-ic', { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: .8, ease: 'power2.out', overwrite: true }, "<=0")
                .fromTo('.nav-logo-title-txt', { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: .8, ease: 'power2.out', overwrite: true }, "<=.2")
                .fromTo(this.title.words, {  yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: .8, stagger: .05, ease: 'power2.out', overwrite: true }, "<=.1")
                .fromTo(this.sub.words, {  yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: .6, stagger: .012, ease: 'power2.out', overwrite: true }, "<=.2")
                .fromTo(this.subBot.words, {  yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: .6, stagger: .02, ease: 'power2.out', overwrite: true }, "<=.1")

            document.querySelectorAll('.nav-main-item').forEach((el, idx) => {
                let labelItem = new SplitType(el.querySelector('.nav-main-item-label'), { types: 'lines, words', lineClass: 'bp-line', wordClass: 'bp-word' });
                let titleItem = new SplitType(el.querySelector('.nav-main-item-title'), { types: 'lines, words', lineClass: 'lines', wordClass: 'bp-word' });
                tlShowItem
                    .fromTo(el.querySelector('.nav-main-item-thumb-inner img'),
                        { yPercent: -100 },
                        { yPercent: 0, duration: .8, ease: 'power2.out', overwrite: true }, 0)
                    .fromTo(el.querySelector('.nav-main-item-thumb-inner'),
                        { yPercent: 100 },
                        { yPercent: 0, duration: .8, ease: 'power2.out', clearProps: 'all', overwrite: true }, 0.2)
                    .fromTo(labelItem.words,
                        { yPercent: 60, autoAlpha: 0 },
                        { yPercent: 0, autoAlpha: 1, duration: .4, ease: 'power2.out', clearProps: 'all', overwrite: true }, .14)
                    .fromTo(titleItem.words,
                        { yPercent: 60, autoAlpha: 0 },
                        { yPercent: 0, autoAlpha: 1, duration: .6, stagger: .012, ease: 'power2.out', clearProps: 'all', overwrite: true }, .14)
            })

            this.tlToggle
                .fromTo('.nav-bg', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1, ease: 'power2.in', overwrite: true })
                .to(tlShowText, { duration: tlShowText.totalDuration(), progress: 1 })
                .fromTo('.nav-main', { y: 40 }, { y: 0, duration: .6, ease: 'power1.inOut', overwrite: true }, "<=0")
                .to(tlShowItem, { duration: tlShowItem.totalDuration(), progress: 1 }, "<=0")
        }
        handleClick(e) {
            e.preventDefault();
            gsap.set(header.toggleEl, { 'pointer-events': 'none' });
            this.isOpen ? this.close() : this.open();
        }
        handleHover() {
            document.querySelectorAll('.nav-main-item').forEach((el, idx) => {
                let imageInner = el.querySelector('img');
                gsap.set(imageInner, { transformOrigin: '50% 50%' });
                el.addEventListener('mouseenter', function (e) {
                    gsap.to(el.querySelector('img'), { scale: 1.2, duration: 1, ease: 'power2.out' })
                });
                el.addEventListener('mouseleave', function (e) {
                    gsap.to(el.querySelector('img'), { scale: 1, duration: 1, ease: 'power2.out' })
                })
            })
            let xMove = 0,
                yMove = 0,
                xCurr = 0,
                yCurr = 0;
            function mouseMove() {
                document.querySelectorAll('.nav-main-item').forEach((el, idx) => {
                    let elRect = el.getBoundingClientRect();
                    let imageInner = el.querySelector('img');
                    if (el.matches(':hover')) {
                        xMove = (mouse.mousePos.x - elRect.left) / elRect.width
                        yMove = (mouse.mousePos.y - elRect.top) / elRect.height
                        xCurr = parseFloat(gsap.getProperty(imageInner, 'transform-origin').split(' ')[0]);
                        yCurr = parseFloat(gsap.getProperty(imageInner, 'transform-origin').split(' ')[1]);
                        gsap.set(el.querySelector('img'), {
                            transformOrigin: `${lerp(xCurr, xMove * 100, .1)}% ${lerp(yCurr, yMove * 100, .1)}%`
                        })
                    }
                })
                requestAnimationFrame(mouseMove.bind(this));
            }
            requestAnimationFrame(mouseMove.bind(this));
        }
        handleUpdateTheme() {
            document.querySelectorAll('.nav-main-item').forEach((item) => {
                let itemInner = item.querySelector('.nav-main-item-inner');
                gsap.set(itemInner, {
                    '--detail-main-bg':$(itemInner).css('--_theme---main-bg'),
                    '--detail-sub-bg': $(itemInner).css('--_theme---sub-bg'),
                    '--detail-title': $(itemInner).css('--_theme---title'),
                    '--_theme---main-bg': 'revert',
                    '--_theme---sub-bg': 'revert',
                    '--_theme---title': 'revert'
                })

                const getColor = (property) => gsap.getProperty(itemInner, `--detail-${property}`);
                item.addEventListener('mouseenter', function (e) {
                    gsap.to(document.querySelector('.nav'), {
                        '--_theme---main-bg': getColor('main-bg'),
                        '--_theme---sub-bg': getColor('sub-bg'),
                        '--_theme---title': getColor('title'),
                        duration: 1,
                        overwrite: true,
                    })
                })
                item.addEventListener('mouseleave', function (e) {
                    gsap.to(document.querySelector('.nav'), {
                        '--_theme---main-bg': $('body').css('--_theme---main-bg'),
                        '--_theme---sub-bg': $('body').css('--_theme---sub-bg'),
                        '--_theme---title': $('body').css('--_theme---title'),
                        duration: 1,
                        overwrite: true,
                        clearProps: 'all'
                    })
                })
            })
        }
        initEffect() {
            const canvas = document.createElement('canvas');
            canvas.classList.add('nav-canvas');
            canvas.style.position = 'fixed';
            canvas.style.pointerEvents = 'none';
            canvas.style.top = 0;
            canvas.style.left = 0;
            canvas.style.zIndex = 5;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            document.querySelector('.nav').appendChild(canvas);

            const shaderScroll = new ShaderScroll(document.querySelector('.nav-canvas'));
            shaderScroll.init();
        }
        open() {
            // if (this.isInitEffect == false) {
            //     this.isInitEffect = true;
            //     this.initEffect();
            // }
            console.log('open nav');
            if (this.isOpen) return;
            $('.header').addClass('on-open-nav');
            $('.nav').addClass('active');
            $('.header-toggle').removeClass('force-hover').addClass('active');
            this.tlToggle.restart();
            this.isOpen = true;
        }
        close() {
            if (!this.isOpen) return;
            this.tlToggle.reverse();
            let duration = this.tlToggle.totalDuration() * 1000;
            setTimeout(() => {
                $('.nav').removeClass('active');
                this.isOpen = false;
            }, duration);
            setTimeout(() => {
                $('.header').removeClass('on-open-nav');
                $('.header-toggle').removeClass('active').addClass('force-hover');
            }, duration * .2);
        }
        updateOnScroll = (e) => {
            this.scroller.scrollY = e.scroll
            this.scroller.velocity = e.velocity * .5
        }
    }
    let nav = new Nav();
    class GlobalChange {
        constructor() {
            this.namespace = null;
        }
        init(data) {
            this.namespace = data.next.namespace;
            this.updateFontSize(data);
            if ($(window).width() > 991) {
                this.updateDecorItemsPos(data);
            }
            header.init(data);
            this.updateTheme(data);
        }
        update(data) {
            this.updateFontSize(data);
            this.updateDecorItemsPos(data);
            this.updateLink(data);
            this.updateTheme(data);
            // header.updateStyle(data);
            header.updateOnScroll(smoothScroll.lenis);
        }
        updateDecorItemsPos(data) {
            return;
            if (data.next.namespace == 'home') {
                let parentEl = data.next.container.querySelector('.main-inner');
                let allItems = data.next.container.querySelectorAll('[data-decor="item"]');
                allItems.forEach((el, i) => {
                    let elRect = el.getBoundingClientRect();
                    let x = elRect.left + parentEl.scrollLeft;
                    let y = elRect.top + parentEl.scrollTop;
                    el.style.position = 'absolute';
                    el.style.zIndex = '1';
                    el.style.left = x + 'px';
                    el.style.top = y + 'px';
                    parentEl.appendChild(el);
                })
            }
        }
        updateFontSize(data) {
            return;
            gsap.set('html', {'transition' : 'font-size .6s cubic-bezier(.66, 0, .15, 1)'})
            if (data.next.namespace == 'home') {
                // gsap.set('html', {'--fs-global': '0.8952551477vh'})
                gsap.set('html', {'--fs-global': '0.7692307692vh'})
            } else {
                gsap.set('html', {'--fs-global': '0.5787037037vw'})
            }
        }
        updateLink(data) {
            document.querySelectorAll('a').forEach((el) => {
                const href = el.getAttribute('href');
                const currentPath = `${window.location.pathname}${window.location.hash}`;
                el.classList.toggle('w--current', href === currentPath);
            })
        }
        updateTheme(data) {
            gsap.set('html', { clearProps: 'all' });
            gsap.set('.nav-bg', { clearProps: 'all' });

            if (data.next.namespace == 'detail') {
                let theme = {
                    mainBG: gsap.getProperty(data.next.container.querySelector('.detail-hero-title'), '--_theme---main-bg'),
                    subBG: gsap.getProperty(data.next.container.querySelector('.detail-hero-title'), '--_theme---sub-bg'),
                    title: gsap.getProperty(data.next.container.querySelector('.detail-hero-title'), '--_theme---title'),
                    decor: gsap.getProperty(data.next.container.querySelector('.detail-hero-title'), '--_theme---decor'),
                    border: gsap.getProperty(data.next.container.querySelector('.detail-hero-title'), '--_theme---border'),
                    scrollbar: gsap.getProperty(data.next.container.querySelector('.detail-hero-title'), '--_theme---scrollbar')
                }
                gsap.set('html', {
                    '--_theme---main-bg': theme.mainBG,
                    '--_theme---sub-bg': theme.subBG,
                    '--_theme---title': theme.title,
                    '--_theme---decor': theme.decor,
                    '--_theme---border': theme.border,
                    '--_theme---scrollbar': theme.scrollbar
                })
            }
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
            this.allCurves = this.el.querySelectorAll('.trans-curve:not(.revert) .dynamic-path');
            this.allCurvesRev = this.el.querySelectorAll('.trans-curve.revert .dynamic-path');
            this.titleEl = this.el.querySelector('.trans-title-text');
            this.titleSplit = null;
            this.homeCurrentScroll = window.innerWidth > 991 ? window.innerWidth + window.innerHeight * .09 : 0;

            this.updateSvg();
            window.addEventListener('resize', debounce(() => {
                this.updateSvg();
            }, 100));
        }
        updateSvg() {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            let count = 5;
            const strokeWidth = vh * 1 / count;

            this.el.querySelectorAll('svg').forEach(svgEl => {
                // Set viewBox once per SVG
                svgEl.setAttribute('viewBox', `0 0 ${vw} ${vh}`);

                // Process all paths at once
                let pathTemplate = svgEl.querySelector('.dynamic-path').cloneNode(true);
                svgEl.innerHTML = ''; // Clear existing paths

                for (let i = 0; i < count; i++) {
                    let newPath = pathTemplate.cloneNode(true);
                    svgEl.appendChild(newPath.cloneNode(true));
                }

                const paths = svgEl.querySelectorAll('.dynamic-path');
                paths.forEach((path, i) => {
                    // Pre-calculate values used multiple times
                    const yPosition = (i + 0.5) * strokeWidth;
                    const xOffset = (i + 0.5) * strokeWidth;
                    const radius = vh - xOffset;
                    const offset = 1; // Constant offset

                    // Create path data more efficiently
                    const pathData = [
                        `M ${-strokeWidth},${yPosition}`,
                        `L ${vw - vh + 200 * offset},${yPosition}`,
                        `A ${radius + 200 * offset} ${radius + 200 * offset} 0 0 1 ${vw - xOffset + 400 * offset} ${vh + 200 * offset}`,
                        `L ${vw - xOffset + 400 * offset} ${vh + 400 * offset}`
                    ].join(' ');

                    // Set attributes efficiently
                    path.setAttribute('d', pathData);
                    path.setAttribute('stroke-width', strokeWidth);
                    path.setAttribute('stroke-linecap', 'round');
                    path.setAttribute('fill', 'transparent');
                    path.setAttribute('pathLength', '1');
                    path.setAttribute('stroke-dasharray', '1');
                    path.setAttribute('stroke-dashoffset', '0');
                });
            });
            this.allCurves = this.el.querySelectorAll('.trans-curve:not(.revert) .dynamic-path');
            this.allCurvesRev = this.el.querySelectorAll('.trans-curve.revert .dynamic-path');
        }
        leaveAnim(data) {
            this.tlLeave = gsap.timeline({
                onStart: () => {
                    header.addCloneHeader();

                    this.updateBeforeTrans.bind(this)(data);
                    const nextNamespace = data.next.namespace;
                    const detailName = nextNamespace === 'home'
                        ? data.current.container.querySelector('[data-detail-namespace]').getAttribute('data-detail-namespace')
                        : data.next.container.querySelector('[data-detail-namespace]').getAttribute('data-detail-namespace');

                    $('.trans-inner').css('transform', nextNamespace === 'home' ? 'scale(-1)' : 'scale(1)');

                    const themes = {
                        brand: { color: '#FFF58C', cls: ['#9C4E23', '#A25829', '#A8612F', '#AD6A35', '#B2723A'], cls2: ['#A8612F', '#B2723A', '#BB8144', '#C38F4C', '#CA9B54'] },
                        typography: { color: '#FFF58C', cls: ['#9C4E23', '#A25829', '#A8612F', '#AD6A35', '#B2723A'], cls2: ['#A8612F', '#B2723A', '#BB8144', '#C38F4C', '#CA9B54'] },
                        voice: { color: '#C4FFB2', cls: ['#164C3B', '#205742', '#2A6149', '#336A4F', '#3C7355'], cls2: ['#205742', '#336A4F', '#447B5B', '#538A65', '#60986E'] },
                        color: { color: '#C4FFB2', cls: ['#164C3B', '#205742', '#2A6149', '#336A4F', '#3C7355'], cls2: ['#205742', '#336A4F', '#447B5B', '#538A65', '#60986E'] },
                        default: { color: '#8DC9F4', cls: ['#070F36', '#0E1840', '#142149', '#1A2952', '#20315A'], cls2: ['#0E1840', '#1A2952', '#253962', '#2F4770', '#3C5A83'] }
                    };

                    const theme = themes[detailName] || themes.default;
                    $(this.titleEl).css('color', theme.color);
                    header.updateCloneHeader(theme.color);

                    applyColors(this.allCurves, theme.cls, nextNamespace !== 'home');
                    applyColors(this.allCurvesRev, theme.cls2, nextNamespace === 'home');

                    gsap.set('.trans', { autoAlpha: 1 });
                    let title = data.next.namespace == 'home' ? 'A New Dawn for Human Potential' : data.next.container.querySelector('.detail-hero-title').textContent;
                    this.titleEl.textContent = title;
                    this.titleSplit = new SplitType(this.titleEl, { types: 'chars', lineClass: 'lines', wordClass: 'bp-word' });
                    gsap.set(this.titleSplit.chars, { yPercent: 60, autoAlpha: 0 });
                    gsap.set(this.el.querySelector('.trans-text'), {opacity: 1});
                    gsap.set(this.allCurves, {'stroke-dashoffset': 'var(--curve-offset)', '--curve-offset': -1});
                    gsap.set(this.allCurvesRev, {'stroke-dashoffset': 'var(--curve-offset)', '--curve-offset': -1});
                    gsap.to(this.titleSplit.chars, { yPercent: 0, autoAlpha: 1, duration: .4, ease: 'power2.inOut', stagger: .008, delay: .4 })
                },
                onComplete: () => {
                    this.updateAfterTrans.bind(this)(data);
                }
            })
            this.allCurves.forEach((curve, i) => {
                this.tlLeave
                .fromTo(curve, { '--curve-offset': -1 }, {'--curve-offset': 0.0, duration: (1 - .15) - (Math.random() * .3), ease: 'power2.out' }, (Math.random() * .3) + .15)
            })
            this.allCurvesRev.forEach((curve, i) => {
                this.tlLeave
                .fromTo(curve, { '--curve-offset': -1 }, {'--curve-offset': 0.0, duration: (1) - (Math.random() * .3), ease: 'power2.out' }, (Math.random() * .3))
            })

            return this.tlLeave;
        }
        enterAnim(data) {
            this.tlEnter = gsap.timeline({
                delay: .4,
                onStart: () => {
                    this.enterSetup(data);
                    gsap.to(this.titleSplit.chars, { yPercent: 60, autoAlpha: 0, duration: .4, ease: 'power2.inOut', stagger: .008, color: '#8DC9F4', onComplete: () => {
                        this.titleSplit.revert();
                        this.titleEl.textContent = '';
                        this.titleSplit = null;
                    }});
                    setTimeout(() => {
                        this.enterPlay(data);
                    }, 100);
                    setTimeout(() => {
                        header.deleteCloneHeader();
                    }, 400);
                },
                onComplete: () => {
                    gsap.set('.trans, .trans-col', { clearProps: 'all' });
                }
            })

            this.tlEnter
            .fromTo(data.next.container, { opacity: 0 }, { duration: .6, opacity: 1, clearProps: 'all' }, 0)
            this.allCurves.forEach((curve, i) => {
                this.tlEnter
                .fromTo(curve, { '--curve-offset': 0 }, {'--curve-offset': 1, duration: (1) - (Math.random() * .3), ease: 'power2.out' }, (Math.random() * .3))
            })
            this.allCurvesRev.forEach((curve, i) => {
                this.tlEnter
                .fromTo(curve, { '--curve-offset': 0 }, {'--curve-offset': 1, duration: (1 - .2) - (Math.random() * .3), ease: 'power2.out' }, (Math.random() * .3))
            })
            return this.tlEnter;
        }
        async play(data) {
            await pageTrans.leaveAnim(data).then(() => {
                pageTrans.enterAnim(data)
            })
        }
        enterSetup(data) {
            homePageManager.hero.switchAnimType();

            homePageManager.brand.switchAnimType();
            globalHooks.triggerEnterSetup(data);
        }
        enterPlay(data) {
            globalHooks.triggerEnterPlay(data);
        }
        updateBeforeTrans(data) {
            if (data.current.namespace == 'home') {
                this.homeCurrentScroll = smoothScroll.scroller.scrollX;
            }
            gsap.set(data.next.container, { opacity: 0, 'pointer-events': 'none', zIndex: 1 })

            header.updateStyle(data);
            if ( header.isOpen() ) {
                nav.close();
            }
            smoothScroll.stop();
            smoothScroll.destroy();
            documentHeightObserver('disconnect');
            if (data.current.container) {
                $(data.current.container).css('z-index', 2);
            }
        }
        updateAfterTrans(data) {
            smoothScroll.reinit(data)
            if (data.next.namespace == 'home') {
                smoothScroll.lenis.scrollTo(this.homeCurrentScroll, 0, { duration: 0 });
            }
            documentHeightObserver('init', data);
            globalChange.update(data)
            if (data.current.container) {
                data.current.container.remove();
            }
        }
    }
    const pageTrans = new PageTrans();

    const HomePage = {
        Hero: class {
            constructor() {
                this.el = null;
                this.tlTrigger = null;
                this.tlHero = null;
                this.tlEnter = null;
                this.tlTriggerEnter = null;
                this.tlParallax = [];
                this.animType = 'load';
            }
            setup(data) {
                this.el = data.next.container.querySelector('.home-hero');
                this.parallax(data);
                if ($(window).width() > 991) {
                } else {
                    data.next.container.querySelectorAll('.home-hero-title-charc-item svg').forEach(svg => {
                        svg.setAttribute('width', '100%');
                        svg.removeAttribute('height');
                    });
                }

                if (this.animType == 'load') {
                    this.setupOnce(data);
                } else {
                    this.setupEnter(data);
                }
            }
            setupOnce(data) {
                console.log('home hero setup once');
                let offsetTitle = ($(window).width() > 767 ? $(window).height() : this.el.getBoundingClientRect().height) - this.el.querySelector('.home-hero-title-wrap').getBoundingClientRect().height - ($(window).width() > 991 ? parseRem(150) : 10);
                let thumbBorderRad = gsap.getProperty(this.el.querySelector('.home-hero-thumb-inner'), 'border-radius');

                gsap.set(this.el.querySelectorAll('.home-hero-title-charc'), { y: offsetTitle, 'overflow': 'hidden'})
                gsap.set(this.el.querySelector('.home-hero-title-decor'), {y: offsetTitle + 30, 'overflow': 'hidden' })
                gsap.set(this.el.querySelector('.home-hero-thumb'), { 'overflow': 'hidden' })
                gsap.set(this.el.querySelector('.home-hero-sub-inner'), { 'overflow': 'hidden' })
                gsap.set(this.el.querySelector('.home-hero-sub-txt'), { yPercent: 100, autoAlpha: 0 })
                gsap.set(this.el.querySelector('.home-hero-thumb-inner'), { yPercent: 100, autoAlpha: 0 });
                gsap.set(this.el.querySelectorAll('.home-hero-title-decor-uline'), { scaleX: 0, transformOrigin: 'left' })

                this.tlHero = gsap.timeline({
                    paused: true,
                    onStart: () => {
                        $('[data-init-hidden]').removeAttr('data-init-hidden');
                    },
                    onComplete: () => {
                        document.querySelectorAll('.home-hero-thumb-video video').forEach((vid) => vid.play());
                    }
                })
                this.tlHero
                    .from(this.el.querySelectorAll('.home-hero-title-charc-item'), {
                        transformOrigin: 'bottom', scale: .8, yPercent: 80, x: -10, autoAlpha: 0, ease: 'expo.out', duration: 2, stagger: .05, delay: .5, clearProps: 'all'
                    })
                    .to(this.el.querySelector('.home-hero-title-charc'), {
                        y: offsetTitle, duration: 2, ease: 'circ.inOut'
                    }, "<=0")
                    .to(this.el.querySelector('.home-hero-title-charc'), {
                        y: offsetTitle + 30, duration: 1, ease: 'back.out(1.3)', overwrite: true
                    }, "<=.5")
                    .from(this.el.querySelector('.home-hero-title-decor-txt'), {
                        transformOrigin: 'bottom', scale: .8, yPercent: 80, x: -10, autoAlpha: 0, ease: 'expo.out', duration: 1.5, clearProps: 'all'
                    }, "<=0")
                    .to(this.el.querySelectorAll('.home-hero-title-decor-uline'), { scaleX: 1, duration: 1, clearProps: 'transform' }, "<=0.8")
                    .to(this.el.querySelector('.home-hero-title-charc'), {
                        y: 0, duration: 1, ease: 'power2.out', clearProps: 'transform'
                    }, "<=0")
                    .to(this.el.querySelector('.home-hero-title-decor'), {
                        y: 0, duration: 1, ease: 'power2.out', clearProps: 'all',
                        onStart: () => {
                            header.play();
                            setTimeout(() => homePageManager.brand.playOnce(), 300);
                        },
                    }, "<=0")
                    .to(this.el.querySelector('.home-hero-thumb-inner'), {
                        yPercent: 0, autoAlpha: 1, duration: 1.2, ease: "power2.out"
                    }, "<=.3")
                    .to(this.el.querySelector('.home-hero-sub-txt'), {
                        yPercent: 0, autoAlpha: 1, duration: 1, ease: "power2.out",
                        onStart: () => $(window).width() > 991 && homePageManager.scrollBar.showUp(),
                        onComplete: () => {
                            gsap.set(this.el.querySelector('.home-hero-sub'), { clearProps: 'all' });
                        }
                    },"<=0")
            }
            setupEnter(data) {
                // animate after transition
                this.tlEnter = gsap.timeline({
                    paused: true
                })
                gsap.set(this.el.querySelector('.home-hero-title-decor'), { 'overflow': 'hidden' });
                gsap.set(this.el.querySelector('.home-hero-title-charc'), { 'overflow': 'hidden' });

                let borderRad = gsap.getProperty(this.el.querySelector('.home-hero-thumb'), 'border-radius');
                let sub = new SplitType(this.el.querySelector('.home-hero-sub-txt'), { types: 'words,chars', lineClass: 'lines', wordClass: 'bp-word' });
                this.tlEnter
                    .fromTo(this.el.querySelectorAll('.home-hero-title-charc-item'),
                        { yPercent: 80, autoAlpha: 0 },
                        { yPercent: 0, autoAlpha: 1, ease: 'expo.out', stagger: .04, duration: 1, clearProps: 'all',
                            onComplete: () => gsap.set('.home-hero-title-charc', { clearProps: 'all' }) })
                    .fromTo(this.el.querySelector('.home-hero-title-decor-txt'),
                        { yPercent: 80, autoAlpha: 0 },
                        { yPercent: 0, autoAlpha: 1, ease: 'expo.out', duration: 1, clearProps: 'all',
                            // onComplete: () => gsap.set('.home-hero-title-decor', { clearProps: 'all' })
                        }, "<=0.5")
                    .fromTo(this.el.querySelectorAll('.home-hero-title-decor-uline'),
                        { scaleX: 0, transformOrigin: 'left'},
                        { scaleX: 1, duration: .6, clearProps: 'transform' }, "<=0.1")
                    .fromTo(this.el.querySelector('.home-hero-thumb'),
                        { clipPath: `inset(20% round ${borderRad}px)` },
                        { clipPath: `inset(0% round ${borderRad}px)`, duration: 2, ease: 'expo.out', clearProps: 'all'}, "<=0")
                    .fromTo(this.el.querySelector('.home-hero-thumb-inner'),
                        { scale: 1.4, autoAlpha: 0 },
                        { scale: 1, duration: 2, autoAlpha: 1, ease: 'expo.out', clearProps: 'all' }, "<=0")
                    .fromTo(sub.words,
                        { yPercent: 60, autoAlpha: 0 },
                        { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.015, onComplete: () => sub.revert(),
                            onStart: () => $(window).width() > 991 && homePageManager.scrollBar.showUp(),
                        }, "<=0")

                if (!isInViewport(this.el, 'horizontal')) {
                    this.tlTriggerEnter = gsap.timeline({
                        scrollTrigger: {
                            trigger: this.el,
                            horizontal: $(window).width() > 991,
                            start: `${$(window).width() > 991 ? 'left right' : 'top bottom+=50% '}`,
                            end: `${$(window).width() > 991 ? 'right left' : 'bottom top '}`,
                            once: true,
                            onEnter: () => {
                                this.tlEnter.play();
                            },
                            onStart: () => {
                                $('[data-init-hidden]').removeAttr('data-init-hidden');
                            }
                        }
                    })
                }
            }
            playOnce() {
                this.tlHero.play();
            }
            playEnter() {
                if (isInViewport(this.el, 'horizontal')) {
                    this.tlEnter.play();
                }
            }
            switchAnimType() {
                this.animType = 'trans';
            }
            parallax(data) {
                let distance = parseRem(298);

                //Head Parallax
                if ($(window).width() > 991) {
                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: document.querySelector('.home-hero-wrap'),
                            horizontal: true,
                            start: `left+=${$(window).width()} left`,
                            triggerEnd: this.el,
                            end: `right left`,
                            scrub: true
                        },
                        defaults: { ease: 'none' }
                    })
                    tl
                        .fromTo(this.el, {x: 0}, {x: distance} )
                        .fromTo(this.el.querySelector('.home-hero-sub-inner'), { x: 0 }, { x: - (distance * 1.5) }, 0)
                        .fromTo(this.el.querySelector('.home-hero-thumb'), { x: 0 }, { x: - (distance * 1.2) }, 0)
                        .fromTo(this.el.querySelector('.home-hero-title-decor'), {x: 0}, {x: -(distance * .4)}, 0)

                    this.tlParallax.push(tl);

                    this.tlParallax.push(gsap.timeline({
                            scrollTrigger: {
                                trigger: document.querySelector('.home-hero-wrap'),
                                horizontal: true,
                                start: 'left left',
                                end: `left+=${$(window).width()} left`,
                                scrub: true
                            },
                            defaults: {
                                ease: 'none'
                            }
                        })
                        .fromTo('.home-hero-wrap section', {x: distance}, {x: 0} )
                        .fromTo('.home-hero-wrap .home-hero-sub-inner', {x: distance * .75}, {x: 0}, 0)
                        .fromTo('.home-hero-wrap .home-hero-thumb', {x: distance * .6}, {x: 0}, 0)
                        .fromTo('.home-hero-wrap .home-hero-title-decor', {x: distance * .2}, {x: 0}, 0)
                        .fromTo('.home-hero-wrap .home-brand-main', {x: distance * -.2}, {x: 0}, 0)
                    )
                } else {
                    this.tlParallax.push(gsap.timeline({
                        scrollTrigger: {
                            trigger: document.querySelector('.home-hero-wrap'),
                            start: `top+=${$(window).height()} top`,
                            triggerEnd: this.el,
                            end: `bottom top`,
                            scrub: true,
                        },
                        defaults: {
                            ease: 'none'
                        }
                    })
                    .fromTo(this.el, {y: 0}, {y: distance} ))

                    this.tlParallax.push(gsap.timeline({
                        scrollTrigger: {
                            trigger: document.querySelector('.home-hero-wrap'),
                            start: 'top top',
                            end: `top+=${$(window).height()} top`,
                            scrub: true,
                        },
                        defaults: {
                            ease: 'none'
                        }
                    })
                    .fromTo('.home-hero-wrap section', {y: distance}, {y: 0} ))
                }
            }
            destroy() {
                if (this.tlHero) {
                    this.tlHero.kill();
                }
                if (this.tlTrigger) {
                    this.tlTrigger.kill();
                }
                if (this.tlEnter) {
                    this.tlEnter.kill();
                }
                if (this.tlTriggerEnter) {
                    this.tlTriggerEnter.kill();
                }
                if (this.tlParallax) {
                    this.tlParallax.forEach(tl => tl.kill());
                }
            }
        },
        Brand: class {
            constructor() {
                this.el = null;
                this.tlTrigger = null;
                this.allCards = null;
                this.tlScrub = null;
                this.tlReveal = null;
                this.tlEnter = null;
                this.tlOnce = null;
                this.tlParallax = [];
                this.animType = 'load';
            }
            setTrigger(data) {
                this.el = data.next.container.querySelector('.home-brand');

                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.home-brand',
                        horizontal: $(window).width() > 991,
                        start: `${$(window).width() > 991 ? `left-=${window.innerWidth} right` : `top-=${window.innerHeight} bottom+=50%`}`,
                        end: `${$(window).width() > 991 ? 'right left' : 'bottom top '}`,
                        once: true,
                        onEnter: () => {
                            this.setup(data);
                        },
                    }
                })
            }
            setup(data) {
                this.common(data)
                if ($(window).width() > 991) {
                    this.desktop(data)
                } else {
                    this.mobile(data)
                }
                if (this.animType == 'load') {
                    this.setupOnce(data);
                } else {
                    this.setupEnter(data);
                }
            }

            setupOnce(data) {
                gsap.set(this.el.querySelector(`.home-brand-${$(window).width() > 991 ? 'main' : 'sub'}-thumb-img`), { yPercent: 100, autoAlpha: 0 });

                this.tlOnce = gsap
                    .timeline({ paused: true, onComplete: () => {
                        this.doubleTitle.play();
                    } })
                    .to(this.el.querySelector(`.home-brand-${$(window).width() > 991 ? 'main' : 'sub'}-thumb-img`), {
                        yPercent: 0, autoAlpha: 1, stagger: .3, duration: 1.2, ease: "power2.out"
                    })
            }
            setupEnter(data) {
                this.tlEnter = gsap.timeline({
                    paused: true,
                })

                this.tlEnter
                    .fromTo(this.el.querySelector('.home-brand-main-thumb-img'),
                        { yPercent: 100 },
                        { yPercent: 0, duration: 2, ease: 'power2.out', clearProps: 'all' })
                    .fromTo(this.el.querySelector('.home-brand-main-thumb-img img'),
                        { yPercent: -100 },
                        { yPercent: 0, duration: 2, ease: 'power2.out', onStart: () => {
                            setTimeout(() => {
                                this.doubleTitle.play()
                            }, 500);
                        } }, "<=0")

            }
            playOnce() {
                this.tlOnce.play();
            }
            playEnter() {
                if (isInViewport(this.el, 'horizontal')) {
                    this.tlEnter.play();
                }
            }

            common(data) {
                this.doubleTitle = new Animate.DoubleTitle(this.el.querySelector('[data-dou-text="wrapper"]'), false, -40, 5);
                this.tlReveal = gsap.timeline({
                    scrollTrigger: {
                        trigger: $(window).width() > 991 ? this.el.querySelector('.home-brand-title.main-txt') : this.el.querySelector('.home-brand-sub-content'),
                        horizontal: $(window).width() > 991,
                        start: $(window).width() > 991 ? `right right-=30%` : `top top+=85%`,
                        once: true
                    }
                })
                setFixedWidth(this.el.querySelector('.home-brand-sub-txt'));
                let sub = new SplitType(this.el.querySelector('.home-brand-sub-txt'), { types: 'lines, words', lineClass: 'lines', wordClass: 'bp-word' });
                this.tlReveal
                    .fromTo(sub.words,
                        { yPercent: 60, autoAlpha: 0 },
                        { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.015, clearProps: 'all', onComplete: () => sub.revert() })
                    .fromTo(this.el.querySelectorAll('.home-brand-sub-line')[0],
                        { scaleX: 0, transformOrigin: 'left' },
                        { scaleX: 1, ease: 'expo.out', duration: 1, clearProps: 'all' }, "<=0.2")
                    .fromTo(this.el.querySelectorAll('.home-brand-sub-link .link-wrap'),
                        { yPercent: 60, autoAlpha: 0 },
                        { yPercent: 0, autoAlpha: 1, duration: 1, clearProps: 'all' }, "<=0.2")
                    .fromTo(this.el.querySelectorAll('.home-brand-sub-line')[1],
                        { scaleX: 0, transformOrigin: 'left' },
                        { scaleX: 1, ease: 'expo.out', duration: 1, clearProps: 'all' }, "<=0.2")
            }
            desktop(data) {
                this.cardScrub(data);
                this.cardReveal(data);
                this.animateHorizontal(data);
            }
            mobile(data) {
                this.animateVertical(data);

                this.el.querySelector('.home-brand-cms').classList.add('swiper');
                this.el.querySelector('.home-brand-list').classList.add('swiper-wrapper');
                this.el.querySelectorAll('.home-brand-item').forEach((el) => el.classList.add('swiper-slide'));
                new Swiper(this.el.querySelector('.home-brand-cms'), {
                    slidesPerView: 'auto',
                    spaceBetween: parseRem(6),
                    breakpoints: {
                        768: {
                            slidesPerView: 1.7,
                            spaceBetween: parseRem(10),
                        }
                    }
                });
            }
            animateHorizontal(data) {
                this.tlParallax.push(parallaxTimeline({
                    triggerEl: this.el.querySelector('.home-brand-main'),
                    offset: { start: 0, end: 20 },
                    animEls: [
                        { animEl: this.el.querySelector('.home-brand-main-inner'), offset: { start: 0, end: 20 }, isImage: true },
                    ]
                }))

                this.tlParallax.push(parallaxTimeline({
                    triggerEl: this.el.querySelector('.home-brand-title.main-txt'),
                    offset: { start: -50, end: -15 },
                    animEls: [
                        { animEl: this.doubleTitle.getEls().main.lines[0], offset: { start: -20, end: -10 }},
                        { animEl: this.doubleTitle.getEls().main.lines[1], offset: { start: -50, end: -15 }},
                        { animEl: this.doubleTitle.getEls().clone.lines[0], offset: { start: -20, end: -10 }},
                        { animEl: this.doubleTitle.getEls().clone.lines[1], offset: { start: -50, end: -15 }},
                    ]
                }))

                this.tlParallax.push(parallaxTimeline({
                    triggerEl: this.el.querySelector('.home-brand-sub-thumb-img'),
                    offset: { start: 80, end: -10 },
                    animEls: [
                        { animEl: this.el.querySelector('.home-brand-sub-thumb-img-inner'), offset: { start: 80, end: -10 }, isImage: true },
                    ]
                }))

                this.tlParallax.push(parallaxTimeline({
                    triggerEl: this.el.querySelector('.home-brand-sub-content.hidden-mb'),
                    offset: { start: 10, end: -14 },
                    animEls: [
                        { animEl: this.el.querySelector('.home-brand-sub-txt'), offset: { start: 10, end: -14 } },
                        { animEl: this.el.querySelector('.home-brand-sub-link'), offset: { start: 4, end: -4 } },
                        { animEl: this.el.querySelectorAll('.line.home-brand-sub-line')[0], offset: { start: 2, end: -2 } },
                        { animEl: this.el.querySelectorAll('.line.home-brand-sub-line')[1], offset: { start: -10, end: 10 } }
                    ]
                }))

            }
            animateVertical(data) {
                new Animate.ScaleInset({ el: this.el.querySelector('.home-brand-main [data-scroll-img]') });
                if ($(window).width() <= 767) {
                    new Animate.ScaleInset({ el: this.el.querySelector('.home-brand-sub [data-scroll-img]') });
                }
                gsap.set(this.el.querySelectorAll('.home-brand-item'), { x: 50, autoAlpha: 0 })
                gsap.to(this.el.querySelectorAll('.home-brand-item'), {
                    scrollTrigger: {
                        trigger: this.el.querySelector('.home-brand-detail'),
                        start: 'top top+=85%'
                    },
                    x: 0, autoAlpha: 1, duration: 1, stagger: 0.04
                })
            }
            cardReveal(data) {
                this.allCards.forEach((el, i) => {
                gsap.set(el.querySelector('.home-brand-item-ic'), { scale: 1.2, autoAlpha: 0 })
                gsap.set(el.querySelector('.home-brand-item-title'), { yPercent: 30, autoAlpha: 0 })
                gsap.set(el.querySelector('.home-brand-item-overlay'), { autoAlpha: 0 })
                replaceHyphen(el.querySelector('.home-brand-item-desc'));
                let desc = new SplitType(el.querySelector('.home-brand-item-desc'), { types: 'lines, words', lineClass: 'lines', wordClass: 'bp-word' });

                let tlRevealItem = gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        horizontal: true,
                        start: `left right-=20%`,
                        once: true
                    },
                    onComplete: () => {
                        desc.revert();
                    }
                })
                let tlScrubItem = gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        horizontal: true,
                        start: `left right-=30%`,
                        end: `right+=10% left`,
                        scrub: true
                    }
                })

                tlRevealItem
                    .to(el.querySelector('.home-brand-item-ic'),
                        { scale: 1, autoAlpha: 1, duration: 1, ease: 'circ.inOut' })
                    .to(el.querySelector('.home-brand-item-title'), { yPercent: 0, autoAlpha: 1, duration: .6, clearProps: 'all' }, "<=0.2")
                    .to(el.querySelector('.home-brand-item-overlay'), { autoAlpha: 1, duration: .6, clearProps: 'all' }, "<=0")
                    .fromTo(desc.words,
                        { yPercent: 60, autoAlpha: 0 },
                        { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.04, clearProps: 'all' }, "<=0.2")
                    .fromTo(el.querySelectorAll('.home-brand-item-ar path'),
                        { 'stroke-dashoffset': 41 },
                        { 'stroke-dashoffset': 81, duration: .6, clearProps: 'all' }, "<=30%")

                tlScrubItem
                    .fromTo(el.querySelector('.home-brand-item-overlay-txt'),
                        { xPercent: -12, autoAlpha: 1 },
                        { xPercent: 8, autoAlpha: 0.2, duration: 1 })
            })
            }
            cardScrub(data) {
                $('.home-brand-cms').css({
                    'width': $('.home-brand-cms').width(),
                    'height': $('.home-brand-cms').height(),
                    'position': 'relative',
                    'display': 'flex',
                })

                this.allCards = this.el.querySelectorAll('.home-brand-item');
                this.allCards.forEach((el, i) => {
                    if (i == this.allCards.length - 1) return;
                    $(el).css('width', '19.8rem')
                })
                let short = $('.home-brand-list').width();
                this.allCards.forEach((el, i) => {
                    $(el).css('width', 'auto')
                })
                let long = $('.home-brand-list').width();

                $('.home-brand-list').css({
                    'position': 'sticky',
                    'left': parseRem(298),
                })
                this.tlScrub = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.home-brand-cms',
                        horizontal: true,
                        start: `left left+=${parseRem(298)}`,
                        end: `left+=${long - short + parseRem(298)} left+=${parseRem(298)}`,
                        scrub: true
                    },
                    defaults: {
                        ease: 'none'
                    }
                })
                this.allCards.forEach((el, i) => {
                    if (i == this.allCards.length - 1) return;
                    this.tlScrub
                        .to(el, {'width': '19.8rem', ease: 'none', duration: 1})
                        .fromTo($(el).find('.home-brand-item-ar'), {xPercent: 0}, {xPercent: -300, duration: .6}, '<=0')
                        .fromTo($(el).find('.home-brand-item-bot'), {opacity: 1, xPercent: 0}, {opacity: 0, xPercent: 4, duration: .6}, '<=.2')
                })

                this.tlParallax
                    .push(gsap.timeline({
                                scrollTrigger: {
                                    trigger: this.el.querySelector('.home-brand-cms'),
                                    horizontal: true, start: `left+=${long - short + parseRem(296)} left+=${parseRem(296)}`, end: `right left`, scrub: true
                                },
                                defaults: { ease: 'none' }
                            })
                            .fromTo(this.el.querySelector('.home-brand-list'), { x: 0 }, { x: 50 }))
            }
            switchAnimType() {
                this.animType = 'trans'
            }
            destroy() {
                if (this.tlTrigger) {
                    this.tlTrigger.kill();
                }
                if (this.tlScrub) {
                    this.tlScrub.kill();
                }
                if (this.tlReveal) {
                    this.tlReveal.kill();
                }
                if (this.tlOnce) {
                    this.tlOnce.kill();
                }
                if (this.tlEnter) {
                    this.tlEnter.kill();
                }
                if (this.tlParallax.length > 0) {
                    this.tlParallax.forEach((tl) => tl.kill());
                }
            }
        },
        Voice: class {
            constructor() {
                this.el = null;
                this.tlTrigger = null;
                this.tlReveal = null;
                this.tlParallax = [];
            }
            setTrigger(data) {
                // setFixedWidth(data.next.container.querySelector('.home-logo'));
                this.el = data.next.container.querySelector('.home-voice');
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
                        horizontal: $(window).width() > 991,
                        start: `${$(window).width() > 991 ? 'left right' : 'top bottom+=50% '}`,
                        end: `${$(window).width() > 991 ? 'right left' : 'bottom top '}`,
                        once: true,
                        onEnter: () => {
                            this.setup(data);
                        },
                    }
                })
            }
            setup(data) {
                if ($(window).width() > 991) {
                    this.animateHorizontal(data);
                    this.scrub(data);
                }
                else {
                    this.animateVertical(data);
                }
                this.animateReveal(data);
            }
            animateReveal(data) {
                let title = new Animate.Title(this.el.querySelector('.home-voice-title'))
                setFixedWidth(this.el.querySelector('.home-voice-sub'));
                let sub = new SplitType(this.el.querySelector('.home-voice-sub'), {types: 'lines, words', lineClass: 'lines', wordClass: 'bp-word'});
                let thumbBorderRad = gsap.getProperty(this.el.querySelector('.home-voice-thumb-inner'), 'border-radius');
                this.tlReveal
                    .fromTo(this.el.querySelector('.home-voice-line-hor'),
                        { scaleX: 0, transformOrigin: 'left' },
                        { scaleX: 1, duration: 1.5, clearProps: 'transform',
                            onStart: () => {
                                gsap.set('.home-logo-line-hor', {scaleX: 0, transformOrigin: 'left' })
                                gsap.set('.home-logo-line-ver', {scaleY: 0, transformOrigin: 'top' })

                                gsap.set(this.el.querySelector('.home-voice-line-ver'), { scaleY: 0, transformOrigin: 'top' });
                                setTimeout(() => {
                                    gsap.to(this.el.querySelector('.home-voice-line-ver'), { scaleY: 1, duration: 1.5, clearProps: 'transform' })
                                }, 800);
                            },
                            onComplete: () => {
                                gsap.to('.home-logo-line-hor', {scaleX: 1, duration: 1.5, clearProps: 'transform' })
                                gsap.to('.home-logo-line-ver', {scaleY: 1, duration: 1.5, clearProps: 'transform' })
                            }
                        })
                    .fromTo(sub.words,
                        { yPercent: 60, autoAlpha: 0 },
                        { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.015, clearProps: 'all', onComplete: () => sub.revert() }, "<=.2")
                    .fromTo(this.el.querySelector('.home-voice-sub-link .link-wrap'),
                        { yPercent: 60, autoAlpha: 0 },
                        { yPercent: 0, autoAlpha: 1, duration: 1, clearProps: 'all' }, "<=50%")
                    .fromTo(this.el.querySelector('.home-voice-thumb-inner'),
                        {clipPath: `inset(20% round ${thumbBorderRad}px)` },
                        { clipPath: `inset(0% round ${thumbBorderRad}px)`, duration: 2, ease: 'expo.out', clearProps: 'all'}, "<=0")
                    .fromTo(this.el.querySelector('.home-voice-thumb-video'),
                        { scale: 1.4, autoAlpha: 0 },
                        { scale: 1, duration: 2, autoAlpha: 1, ease: 'expo.out', clearProps: 'all' }, "<=0")
            }
            animateHorizontal(data) {
                this.tlReveal = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el.querySelector('.home-voice-title'),
                        horizontal: true,
                        start: `left-=20% right-=30%`,
                        once: true
                    }
                })

                this.tlParallax
                    .push(gsap.timeline({
                                scrollTrigger: {
                                    trigger: this.el.querySelector('.home-voice-title'),
                                    horizontal: true, start: `left right`, end: `left left+=${parseRem(218)}`, scrub: true
                                },
                                defaults: { ease: 'none' }
                            })
                            .fromTo(this.el.querySelector('.home-voice-title'), { x: 200 }, { x: 0 })
                            .fromTo(this.el.querySelector('.home-voice-sub-wrap'), { x: 200 }, { x: 0 }, "<=0"))
            }
            animateVertical(data) {
                this.tlReveal = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el.querySelector('.home-voice-grid'),
                        start: `top top+=80%`,
                        once: true
                    }
                })
            }
            scrub(data) {
                setFixedWidth(data.next.container.querySelector('.home-logo'));
                // gsap.set(data.next.container.querySelector('.home-logo-grid'), { 'grid-template-rows': 'calc((1 - var(--row-h)) * 1fr) 1px calc(1fr * var(--row-h))' })
                this.tlScrub = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
                        horizontal: true,
                        start: 'left left',
                        end: 'right right',
                        scrub: true,
                    },
                    defaults: {
                        ease: 'none'
                    }
                })
                this.tlScrub
                .fromTo(this.el.querySelector('.home-voice-grid'), {
                    'padding-left': '21.8rem',
                    // 'grid-template-columns': '64fr 1px 36fr',
                    'grid-template-rows': '62fr 1px 38fr',
                }, {
                    'padding-left': '0rem',
                    // 'grid-template-columns': '31fr 1px 69fr',
                    'grid-template-rows': '29fr 1px 71fr',
                })
                // .fromTo(data.next.container.querySelector('.home-logo-grid'), {
                //     'grid-template-rows': '62fr 1px 38fr',
                // }, {
                //     'grid-template-rows': '29fr 1px 71fr',
                // }, 0)
                .fromTo(this.el.querySelector('.home-voice-title-txt'), {
                    'font-size': '14rem',
                }, {
                    'font-size': '7rem',
                }, 0)
                // .fromTo(this.el.querySelector('.home-voice-sub'), {
                //     'max-width': '80rem',
                // }, {
                //     'max-width': '45.2rem',
                // }, 0)
            }
            destroy() {
                if (this.tlTrigger) {
                    this.tlTrigger.kill();
                }
                if (this.tlScrub) {
                    this.tlScrub.kill();
                }
                if (this.tlReveal) {
                    this.tlReveal.kill();
                }
                if (this.tlParallax.length > 0) {
                    this.tlParallax.forEach((tl) => tl.kill());
                }
            }
        },
        Logo: class {
            constructor() {
                this.el = null;
                this.tlTrigger = null;
                this.tlReveal = null;
                this.tlParallax = [];
            }
            setTrigger(data) {
                this.el = data.next.container.querySelector('.home-logo');
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
                        horizontal: $(window).width() > 991,
                        start: `${$(window).width() > 991 ? 'left right' : 'top bottom+=50% '}`,
                        end: `${$(window).width() > 991 ? 'right left' : 'bottom top '}`,
                        once: true,
                        onEnter: () => {
                            this.setup(data);
                        },
                    }
                })
            }
            setup(data) {
                if ($(window).width() > 991) {
                    this.animateHorizontal(data);
                }
                else {
                    this.animateVertical(data);
                }
                this.animateReveal(data);
            }
            animateReveal(data) {
                this.fetchSvg(data);
                let title = new Animate.Title(this.el.querySelector('.home-logo-title'));
                setFixedWidth(this.el.querySelector('.home-logo-sub'));
                let sub = new SplitType(this.el.querySelector('.home-logo-sub'), { types: 'lines, words', lineClass: 'lines', wordClass: 'bp-word' });

                this.tlReveal
                    .fromTo(sub.words,
                        { yPercent: 60, autoAlpha: 0 },
                        { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.015, clearProps: 'all', onComplete: () => sub.revert() })
                    .fromTo(this.el.querySelector('.home-logo-sub-link .link-wrap'),
                        { yPercent: 60, autoAlpha: 0 },
                        { yPercent: 0, autoAlpha: 1, duration: 1, clearProps: 'all' }, "<=50%")
            }
            animateHorizontal(data) {
                this.tlReveal = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el.querySelector('.home-logo-sub-wrap'),
                        horizontal: true,
                        start: `left-=20% right-=30%`,
                        once: true
                    }
                })
                this.tlParallax
                    .push(gsap.timeline({
                            scrollTrigger: {
                                trigger: this.el.querySelector('.home-logo-grid'),
                                horizontal: true, start: `left right`, end: `right left`, scrub: true
                            },
                            defaults: { ease: 'none' }
                        })
                        .fromTo(this.el.querySelector('.home-logo-title'), { x: 150 }, { x: 0 })
                        .fromTo(this.el.querySelector('.home-logo-sub-wrap'), { x: 180 }, { x: 0 }, "<=0"))
            }
            animateVertical(data) {
                this.tlReveal = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el.querySelector('.home-logo-text-wrap'),
                        start: `top bottom-=30%`,
                        once: true
                    }
                })
            }
            fetchSvg(data) {
                let src = this.el.querySelector('.home-logo-main-img').getAttribute('src');
                fetch(src)
                .then(response => {
                    if (!response.ok) {throw new Error('Failed to fetch SVG')}
                    return response.text();
                })
                .then(svgContent => {
                    const svgContainer = document.createElement('div');
                    svgContainer.className = 'img-default fit abs home-logo-main-img';
                    svgContainer.innerHTML = svgContent;
                    svgContainer.style.display = 'flex';
                    svgContainer.style.alignItems = 'center';
                    svgContainer.style.justifyContent = 'center';
                    this.el.querySelector('.home-logo-main').appendChild(svgContainer);
                    this.el.querySelector('.home-logo-main img.home-logo-main-img').remove();

                    const svgElement = svgContainer.querySelector('svg');
                    if (svgElement) {
                        svgElement.style.width = 'auto';
                        svgElement.style.height = '100%';
                    }

                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: this.el,
                            horizontal: true,
                            start: `left right-=30%`,
                            end: `right right`,
                        },
                        defaults: {
                            ease: 'none'
                        }
                    })
                    let horLine = this.el.querySelectorAll('.home-logo-main-line-hor');
                    let verLine = this.el.querySelectorAll('.home-logo-main-line-ver');

                    let logoPaths = document.querySelector('.home-logo-main').querySelectorAll('.path-logo path');
                    let textPaths = document.querySelector('.home-logo-main').querySelectorAll('.path-text path');
                    let dotPaths = document.querySelector('.home-logo-main').querySelectorAll('.path-dot rect');
                    gsap.set([...logoPaths, ...textPaths], { 'stroke-dashoffset': 'var(--prog)', 'stroke-dasharray': '1px', 'fill-opacity': 0 })
                    gsap.set(dotPaths, {transformOrigin: 'center center'})
                    gsap.set(this.el.querySelector('.circle circle'), { 'stroke-dashoffset': 'var(--prog)', 'stroke-dasharray': '1px'})

                    tl
                    // .fromTo(this.el.querySelector('.home-logo-stick'), {'left': '23.6rem'}, {'left': '0rem', duration: 4} ,0)
                    // .fromTo(this.el.querySelector('.home-logo-sub-wrap'), {x: -parseRem(236) * .5}, {x: 0, duration: 4} ,0)
                    // .fromTo(this.el.querySelector('.home-logo-main'), { x: 0 }, { x: window.innerWidth, duration: 4}, 0)
                    .fromTo(this.el.querySelector('.circle circle'), {'--prog': 1}, {'--prog': 0, duration: 3}, 0)
                    .fromTo(horLine, {scaleX: 0, transformOrigin: 'left'}, {scaleX: 1, duration: 3}, 0)
                    .fromTo(verLine, {scaleY: 0, transformOrigin: 'top'}, {scaleY: 1, duration: 3}, 0)
                    .fromTo([...logoPaths], {'--prog': 1}, {'--prog': 0, duration: 1}, '<=0')
                    .fromTo([...textPaths], {'--prog': 1}, {'--prog': 0, duration: 2}, '>=0')
                    .fromTo(dotPaths, {scale: 0}, {scale: 1, 'fill-opacity': 1, duration: 2}, '<=0')
                    .fromTo([...logoPaths, ...textPaths], {'fill-opacity': 0}, {'fill-opacity': 0.15, duration: 1}, '>=0')
                })
                .catch(error => {
                    console.error('Error fetching SVG:', error);
                });
            }
            destroy() {
                if (this.tlTrigger) {
                    this.tlTrigger.kill();
                }
                if (this.tlReveal) {
                    this.tlReveal.kill();
                }
                if (this.tlParallax.length > 0) {
                    this.tlParallax.forEach((tl) => tl.kill());
                }
            }
        },
        Typo: class {
            constructor() {
                this.el = null;
                this.tlTrigger = null;
                this.tlReveal1 = null;
                this.tlReveal2 = null;
                this.tlParallax = [];
                this.doubleTitle = null;
            }
            setTrigger(data) {
                this.el = data.next.container.querySelector('.home-typo');
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
                        horizontal: $(window).width() > 991,
                        start: `${$(window).width() > 991 ? 'left right' : 'top bottom+=50% '}`,
                        end: `${$(window).width() > 991 ? 'right left' : 'bottom top '}`,
                        once: true,
                        onEnter: () => {
                            this.setup(data);
                        },
                    }
                })
            }
            setup(data) {
                this.doubleTitle = new Animate.DoubleTitle(this.el.querySelector('[data-dou-text="wrapper"]'), false, -50, -20)
                this.doubleTitle.setTrigger();

                if ($(window).width() > 991) {
                    this.animateHorizontal(data);
                }
                else {
                    this.animateVertical(data);
                }
                this.animateReveal(data);
            }
            animateReveal(data) {
                let decorTitle = new Animate.Title(this.el.querySelector('.home-typo-sub-title'));
                setFixedWidth(this.el.querySelector('.home-typo-sub-desc'));
                let sub = new SplitType(this.el.querySelector('.home-typo-sub-desc'), { types: 'lines, words', lineClass: 'lines', wordClass: 'bp-word' });

                this.tlReveal1
                    .fromTo(this.el.querySelector('.home-typo-sub-title-decor'), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1, clearProps: 'opacity, transform' }, .2)
                    .fromTo(sub.words,
                        { yPercent: 60, autoAlpha: 0 },
                        { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.015, clearProps: 'all', onComplete: () => sub.revert() }, "<=.1")
                    .fromTo(this.el.querySelector('.home-typo-sub-desc-link .link-wrap'),
                        { yPercent: 60, autoAlpha: 0 },
                        { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.015, clearProps: 'all' }, "<=0.2")

                this.tlReveal2
                    .fromTo('.home-typo-detail-decor', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1, clearProps: 'opacity, transform' })
                    .fromTo(this.el.querySelector('.home-typo-detail-list-decor'),
                        { autoAlpha: 0, x: -30 },
                        { autoAlpha: 1, x: 0, duration: 1, clearProps: 'opacity, transform' })
            }
            animateHorizontal(data) {
                this.tlReveal1 = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el.querySelector('.home-typo-sub'),
                        horizontal: true,
                        start: `left-=30% right-=30%`,
                        once: true
                    },
                })
                this.tlReveal2 = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el.querySelector('.home-typo-detail'),
                        horizontal: true,
                        start: `left-=30% right-=30%`,
                        once: true
                    },
                })

                // this.el.querySelectorAll('[data-scroll-img]').forEach((el, idx) => new Animate.ParallaxImage({ el }));

                this.tlParallax
                    .push(gsap.timeline({
                            scrollTrigger: {
                                trigger: this.el.querySelector('.home-typo-main'),
                                horizontal: true, start: `left right`, end: `right left`, scrub: true
                            },
                            defaults: { ease: 'none' }
                        })
                        .fromTo('.home-logo-grid', { x: 0 }, { x: 150 }))

                this.tlParallax.push(parallaxTimeline({
                    triggerEl: this.el.querySelector('.home-typo-main'),
                    offset: { start: 0, end: -20 },
                    animEls: [
                        { animEl: this.el.querySelector('.home-typo-main-thumb'), offset: { start: 0, end: -20 }, isImage: true },
                    ]
                }))
                this.tlParallax.push(parallaxTimeline({
                    triggerEl: this.el.querySelector('.home-typo-title.main-txt'),
                    offset: { start: -50, end: -15 },
                    animEls: [
                        { animEl: this.doubleTitle.getEls().main.lines[0], offset: { start: -50, end: -20 }},
                        { animEl: this.doubleTitle.getEls().clone.lines[0], offset: { start: -50, end: -20 }},
                    ]
                }))

                this.tlParallax
                    .push(gsap.timeline({
                            scrollTrigger: {
                                trigger: this.el.querySelector('.home-typo-sub-title'),
                                horizontal: true, start: `left right`, end: `right left`, scrub: true
                            },
                            defaults: { ease: 'none' }
                        })
                        .fromTo(this.el.querySelector('.home-typo-sub-title-main'), { x: -200 }, { x: 50 }, "<=0")
                        .fromTo(this.el.querySelector('.home-typo-sub-title-decor'), { x: -50 }, { x: -180 }, "<=0")
                        .fromTo(this.el.querySelector('.home-typo-sub-desc-wrap'), { x: -200 }, { x: 100 }, "<=0"))

                const itemOffsetParallax = [
                    { start: 20, end: -10 },
                    { start: -50, end: 60 },
                    { start: -80, end: -45 },
                    { start: -30, end: -19 },
                ]
                this.el.querySelectorAll('.home-typo-detail-item').forEach((el, idx) => {
                    this.tlParallax.push(parallaxTimeline({
                        triggerEl: el,
                        offset: itemOffsetParallax[idx],
                        animEls: [
                            { animEl: el.querySelector('.home-typo-detail-item-inner'), offset:itemOffsetParallax[idx], isImage: true },
                        ]
                    }))
                })

                this.tlParallax
                    .push(gsap.timeline({
                            scrollTrigger: {
                                trigger: this.el.querySelector('.home-typo-detail'),
                                horizontal: true, start: `left right`, end: `right left`, scrub: true
                            },
                            defaults: { ease: 'none' }
                        })
                        .fromTo('.home-typo-detail-decor', { xPercent: -10 }, { xPercent: 30 })
                        .fromTo('.home-typo-detail-list-decor', { xPercent: -10 }, { xPercent: -80 }, "<=0"))
            }
            animateVertical(data) {
                this.tlReveal1 = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el.querySelector('.home-typo-sub-desc-wrap'),
                        start: `top top+=80%`,
                        once: true
                    },
                })

                this.tlReveal2 = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el.querySelector('.home-typo-detail'),
                        start: `top top+=80%`,
                        once: true
                    },
                })

                this.tlReveal3 = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el.querySelector('.home-typo-main-thumb'),
                        start: 'top top+=85%',
                        once: true
                    },
                    onComplete: () => {
                        this.doubleTitle.play();
                    }
                })

                let borderRad = gsap.getProperty(this.el.querySelector('.home-typo-main-thumb-inner'), 'border-radius');
                this.tlReveal3
                    .fromTo(this.el.querySelector('.home-typo-main-thumb-inner'),
                        {clipPath: `inset(20% round ${borderRad}px)` },
                        { clipPath: `inset(0% round ${borderRad}px)`, duration: 2, ease: 'expo.out', clearProps: 'all'  })
                    .fromTo(this.el.querySelector('.home-typo-main-thumb-inner img'),
                        { scale: 1.4, autoAlpha: 0 },
                        { scale: 1, duration: 2, autoAlpha: 1, ease: 'expo.out', clearProps: 'all' }, "<=0")

                this.el.querySelectorAll('[data-scroll-img]').forEach((el, idx) => new Animate.ScaleInset({ el }));
            }
            destroy() {
                if (this.tlTrigger) {
                    this.tlTrigger.kill();
                }
                if (this.tlReveal1) {
                    this.tlReveal1.kill();
                }
                if (this.tlReveal2) {
                    this.tlReveal2.kill();
                }
                if (this.tlParallax.length > 0) {
                    this.tlParallax.forEach((tl) => tl.kill());
                }
            }
        },
        Photo: class {
            constructor() {
                this.el = null;
                this.tlTrigger = null;
                this.tlReveal = null;
                this.tlParallax = [];
            }
            setTrigger(data) {
                this.el = data.next.container.querySelector('.home-photo');
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
                        horizontal: $(window).width() > 991,
                        start: `${$(window).width() > 991 ? 'left right' : 'top bottom+=50% '}`,
                        end: `${$(window).width() > 991 ? 'right left' : 'bottom top '}`,
                        once: true,
                        onEnter: () => {
                            this.setup(data);
                        },
                    }
                })
            }
            setup(data) {
                this.effect(data);
                if ($(window).width() > 991) {
                    this.desktop(data);
                } else {
                    this.mobile(data);
                }
                this.animateReveal(data);
            }
            animateReveal(data) {
                let title = new Animate.Title(this.el.querySelector('.home-photo-title'));
                setFixedWidth(this.el.querySelector('.home-photo-sub'));
                let sub = new SplitType(this.el.querySelector('.home-photo-sub'), { types: 'lines, words', lineClass: 'lines', wordClass: 'bp-word' });

                this.tlReveal
                    .fromTo(sub.words,
                        { yPercent: 60, autoAlpha: 0 },
                        { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.015, clearProps: 'all', onComplete: () => {
                            sub.revert()
                        } })
                    .fromTo(this.el.querySelector('.home-photo-sub-link .link-wrap'),
                        { yPercent: 60, autoAlpha: 0 },
                        { yPercent: 0, autoAlpha: 1, duration: 1, clearProps: 'all' }, "<=50%")
            }
            desktop(data) {
                this.tlReveal = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el.querySelector('.home-photo-sub'),
                        horizontal: true,
                        start: `left-=30% right-=30%`,
                        once: true
                    },
                })

                this.tlParallax
                    .push(gsap.timeline({
                            scrollTrigger: {
                                trigger: this.el,
                                horizontal: true, start: `left right`, end: `right left`, scrub: true
                            },
                            defaults: { ease: 'none' }
                        })
                        .fromTo(this.el.querySelector('.home-photo-title'), { x: -200 }, { x: 120 })
                        .fromTo(this.el.querySelector('.home-photo-sub-wrap'), { x: -350 }, { x: 250 }, "<=0")
                        .fromTo(this.el.querySelector('.home-photo-gallery-wrap'), { x: -300 }, { x: 100 }, "<=0"))
            }
            mobile(data) {
                this.tlReveal = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el.querySelector('.home-photo-sub-wrap'),
                        start: `top top+=85%`,
                        once: true
                    },
                })
            }
            effect() {
                if ($(window).width() > 991) {
                    this.imagesTrail = new ImagesTrail(this.el.querySelector('.home-photo-trail-wrap'));
                    this.imagesGallery = new ImagesGallery(this.el.querySelector('.home-photo-gallery-wrap'));
                } else {
                    const cloneAmount = 2;
                    new Array(cloneAmount).fill().forEach(() => {
                        let itemClone = $('.home-photo-gallery-list').clone();
                        $('.home-photo-gallery-cms').append(itemClone);
                    })
                    $('.home-photo-gallery-list').addClass('anim-marquee')
                }
            }
            destroy() {
                if (this.tlTrigger) {
                    this.tlTrigger.kill();
                }
                if (this.tlReveal) {
                    this.tlReveal.kill();
                }
                if (this.tlScrub) {
                    this.tlScrub.kill();
                }
                if (this.imagesTrail) {
                    this.imagesTrail.destroy();
                }
                if (this.imagesGallery) {
                    this.imagesGallery.destroy();
                }
                if (this.tlParallax.length > 0) {
                    this.tlParallax.forEach((tl) => tl.kill());
                }
            }
        },
        Color: class {
            constructor() {
                this.el = null;
                this.tlTrigger = null;
                this.tlReveal = null;
                this.tlParallax = [];
            }
            setTrigger(data) {
                this.el = data.next.container.querySelector('.home-color-wrap');
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
                        horizontal: $(window).width() > 991,
                        start: `${$(window).width() > 991 ? 'left right' : 'top bottom+=50% '}`,
                        end: `${$(window).width() > 991 ? 'right left' : 'bottom top '}`,
                        once: true,
                        onEnter: () => {
                            this.setup(data);
                        },
                    }
                })
            }
            setup(data) {
                if ($(window).width() > 991) {
                    this.animateHorizontal(data);
                } else {
                    this.animateVertical(data);
                }
                this.animateReveal(data)
            }
            animateReveal(data) {
                let title = new Animate.Title(this.el.querySelector('.home-color-title'));
                setFixedWidth(this.el.querySelector('.home-color-sub'));
                let sub = new SplitType(this.el.querySelector('.home-color-sub'), { types: 'lines, words', lineClass: 'lines', wordClass: 'bp-word' });

                this.tlReveal
                    .fromTo(sub.words,
                        { yPercent: 60, autoAlpha: 0 },
                        { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.015, clearProps: 'all', onComplete: () => sub.revert() })
                    .fromTo(this.el.querySelector('.home-color-sub-link .link-wrap'),
                        { yPercent: 60, autoAlpha: 0 },
                        { yPercent: 0, autoAlpha: 1, duration: 1, clearProps: 'all' }, "<=50%")
            }
            animateHorizontal(data) {
                this.tlReveal = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el.querySelector('.home-color-sub'),
                        horizontal: true,
                        start: `left-=30% right-=30%`,
                        once: true
                    },
                })

                let distance = parseRem(298);
                this.tlParallax
                    .push(gsap.timeline({
                            scrollTrigger: {
                                trigger: this.el,
                                horizontal: true,
                                start: 'left left',
                                end: 'right right',
                                scrub: true,
                            },
                            defaults: {
                                ease: 'none'
                            }
                        })
                        .to('.home-color-title', {x: distance * -1 * .8})
                        .to('.home-color-sub-wrap', { x: distance * -1 * 1.2 }, 0))

            }
            animateVertical(data) {
                this.tlReveal = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el.querySelector('.home-color-sub-wrap'),
                        start: `top top+=80%`,
                        once: true
                    },
                })

                let distance = parseRem(100);
                this.tlParallax
                    .push(gsap.timeline({
                            scrollTrigger: {
                                trigger: this.el,
                                start: 'top top',
                                end: 'bottom bottom',
                                scrub: true,
                            },
                            defaults: {
                                ease: 'none'
                            }
                        })
                        .to('.home-color-title', {y: distance * -1 * 1.1})
                        .to('.home-color-sub-wrap', {y: distance * -1 * .9}, 0))

            }
            destroy() {
                if (this.tlTrigger) {
                    this.tlTrigger.kill();
                }
                if (this.tlReveal) {
                    this.tlReveal.kill();
                }
                if (this.tlScrub) {
                    this.tlScrub.kill();
                }
                if (this.tlParallax.length > 0) {
                    this.tlParallax.forEach((tl) => tl.kill());
                }
            }
        },
        TransColor: class {
            constructor() {
                this.el = null;
                this.tlTrigger = null;
                this.columnData = [
                    {value: 28.37},
                    {value: 40.85},
                    {value: 10},
                    {value: 32.23},
                    {value: 13.79},
                    {value: 5.99}
                ];
            }
            setup(data) {
                smoothScroll.lenis.resize();
                this.originWidth = $(window).width() > 991
                    ? window.innerWidth * 1.5 + window.innerHeight * 0.09
                    : window.innerHeight * 1.5 + window.innerWidth * 0.09;

                const isDesktop = $(window).width() > 991;
                ['head', 'tail'].forEach((type) => {
                    const isHead = type === 'head';
                    const container = data.next.container.querySelector(`.home-trans-wrap.${type}`);
                    const timeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: container,
                            horizontal: isDesktop,
                            start: isHead ? (isDesktop ? 'left left' : 'top top') : (isDesktop ? 'left right' : 'top bottom'),
                            end: isHead
                                ? (isDesktop
                                    ? `left+=${window.innerWidth + 0.09 * window.innerHeight} left`
                                    : `top+=${window.innerHeight + 0.09 * window.innerWidth} top`)
                                : (isDesktop
                                    ? `left+=${window.innerWidth + 0.09 * window.innerHeight} right`
                                    : `top+=${window.innerHeight + 0.09 * window.innerWidth} bottom`),
                            scrub: true,
                        },
                        defaults: { ease: 'none' }
                    });

                    this.columnData.forEach((data, index) => {
                        const targetIndex = isHead ? this.columnData.length - index - 1 : index;
                        const column = $(`.home-trans-wrap.${type} .home-trans-col`).eq(targetIndex);

                        timeline.to(column, {
                            keyframes: {
                                "0%": {
                                    [isDesktop ? 'x' : 'y']: isHead
                                        ? `${data.value * (isDesktop ? window.innerWidth : window.innerHeight) * 0.01 * 1}`
                                        : `${(data.value * this.originWidth * 0.01) * 0}`,
                                    [isDesktop ? 'width' : 'height']: isHead
                                        ? `${this.originWidth + (data.value * (isDesktop ? window.innerWidth : window.innerHeight) * 0.01 * 1)}`
                                        : `${this.originWidth + ((data.value * this.originWidth * 0.01) * 0)}`
                                },
                                "100%": {
                                    [isDesktop ? 'x' : 'y']: isHead
                                        ? `${data.value * (isDesktop ? window.innerWidth : window.innerHeight) * 0.01 * 0}`
                                        : `${(data.value * this.originWidth * 0.01) * -1}`,
                                    [isDesktop ? 'width' : 'height']: isHead
                                        ? `${this.originWidth + (data.value * (isDesktop ? window.innerWidth : window.innerHeight) * 0.01 * 0)}`
                                        : `${this.originWidth + ((data.value * this.originWidth * 0.01) * 1)}`
                                }
                            }
                        }, 0);
                    });

                    if (isHead) {
                        this.tlScrubHead = timeline;
                    } else {
                        this.tlScrubTail = timeline;
                    }
                });

                data.next.container.querySelectorAll('.home-trans-wrap.tail .home-trans-col').forEach((el, idx) => {
                    el.addEventListener('click', this.copyTextToClipboard.bind(this));
                });
            }
            copyTextToClipboard(e) {
                e.preventDefault();
                let hexColor = e.target.querySelector('.home-trans-col-val').innerText;

                let textArea = document.createElement('textarea');
                textArea.style.display = 'none';
                textArea.value = hexColor;
                document.body.appendChild(textArea);
                textArea.select();
                navigator.clipboard
                    .writeText(hexColor)
                    .then(() => {
                        console.log('Text copied to clipboard');
                    })
                    .catch((error) => {
                        console.error('Failed to copy text to clipboard:', error);
                    });
                document.body.removeChild(textArea);

                e.target.classList.add('copied');
                setTimeout(() => {
                    e.target.classList.remove('copied');
                }, 2000);
            }
            destroy() {
                if (this.tlTrigger) {
                    this.tlTrigger.kill();
                }
                if (this.tlScrubTail) {
                    this.tlScrubTail.kill();
                }
                if (this.tlScrubHead) {
                    this.tlScrubHead.kill();
                }
            }
        },
        Background: class {
            constructor() {
                this.allSections = null;
            }
            setup(data) {
                this.allSections = data.next.container.querySelectorAll('section');
                this.allSections.forEach((section, index) => {
                    gsap.set(section, {
                        '--section-main-bg': $(section).css('--_theme---main-bg'),
                        '--section-sub-bg': $(section).css('--_theme---sub-bg'),
                        '--section-title': $(section).css('--_theme---title'),
                        '--section-scrollbar': $(section).css('--_theme---scrollbar'),
                        '--section-decor': $(section).css('--_theme---decor'),
                        '--section-border': $(section).css('--_theme---border'),
                        '--_theme---main-bg': 'revert',
                        '--_theme---sub-bg': 'revert',
                        '--_theme---title': 'revert',
                        '--_theme---scrollbar': 'revert',
                        '--_theme---decor': 'revert',
                        '--_theme---border': 'revert',
                    })
                })

                this.updateOnScroll();
                this.updateBackground();
                smoothScroll.lenis.on('scroll', this.updateOnScroll.bind(this));
            }
            updateOnScroll(e) {
                if (this.allSections) {
                    const mostInViewSection = Array.from(this.allSections).reduce((mostInView, section) => {
                        const rect = section.getBoundingClientRect();
                        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
                        const visibleWidth = Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0);
                        const visibleArea = Math.max(0, visibleHeight) * Math.max(0, visibleWidth);

                        if (!mostInView || visibleArea > mostInView.visibleArea) {
                            return { section, visibleArea };
                        }
                        return mostInView;
                    }, null);

                    if (mostInViewSection && this.currentSection !== mostInViewSection.section) {
                        this.currentSection = mostInViewSection.section;
                        this.updateBackground();
                    }
                }
            }
            updateBackground() {
                let themeVars = {
                    '--_theme---main-bg': $(this.currentSection).css('--section-main-bg'),
                    '--_theme---sub-bg': $(this.currentSection).css('--section-sub-bg'),
                    '--_theme---title': $(this.currentSection).css('--section-title'),
                    '--_theme---decor': $(this.currentSection).css('--section-decor'),
                    '--_theme---border': $(this.currentSection).css('--section-border'),
                    '--_theme---scrollbar': $(this.currentSection).css('--section-scrollbar')
                };

                gsap.to('body', themeVars);
            }
            destroy() {
                this.allSections = null;
                this.currentSection = null;
                this.tlScrub = null;
            }
        },
        ScrollBar: class {
            constructor() {
                if ($(window).width() < 991) return;
                this.el = null;
                this.ruler = null;
                this.tlScrub = null;
                this.tlReveal = null;
                this.sections = [];
                this.widths = [];
                this.totalWidth = 0;
                this.rulerWidth = 0;
                this.rulerScuber = null;
                this.ratios = []
            }
            setup(data) {
                if ($(window).width() < 991) return;
                this.el = data.next.container.querySelector('.home-ruler');
                if (!this.el) return;
                this.rulerScuber = this.el.querySelector('.home-ruler-progress');
                this.setupParams(data)
                this.setupRuler(data);
                this.setTl(data);

                this.tlReveal = gsap
                    .timeline({ paused: true })
                    .fromTo(this.el,
                        { autoAlpha: 0, yPercent: 100 }, { autoAlpha: 1, yPercent: 0, duration: 1 })
            }
            setupParams(data) {
                this.ruler = this.el.querySelector('.home-ruler-inner');
                this.rulerWidth = this.ruler.getBoundingClientRect().width;
                this.sections = Array.from(data.next.container.querySelectorAll('[data-sc-name]'))
                // let cloneSc = data.next.container.querySelector('.sc-clone');
                // this.sections.unshift(cloneSc);
                this.sections.forEach((el, i) => {
                    const name = el.getAttribute('data-sc-name');
                    const prevName = this.sections[i - 1]?.getAttribute('data-sc-name');
                    const width = el.getBoundingClientRect().width;
                    //
                    this.widths.push(width);

                    // if (i > 0 && name === prevName) {
                    //     this.widths[this.widths.length - 1] += width;
                    //     this.sections.splice(i, 1);
                    // } else {
                    //     this.widths.push(width);
                    // }
                    this.totalWidth += width;
                });
            }
            setupRuler(data) {
                const cloneItemRuler = this.el.querySelector('.home-ruler-main-item').cloneNode(true);
                cloneItemRuler.querySelector('.home-ruler-main-item-txt').innerText = ''
                const ruler = this.el.querySelector('.home-ruler-main');
                ruler.innerHTML = '';

                const rulerSpace = this.rulerWidth / Math.floor(this.rulerWidth / 10);
                const totalIntervals = Math.floor(this.rulerWidth / rulerSpace);
                this.ratios = this.widths.map(width => width / this.totalWidth);

                let intervals = this.ratios.map(ratio => Math.round(ratio * totalIntervals));
                let total = intervals.reduce((a, b) => a + b, 0);

                let iterationCount = 0;
                const maxIterations = 1000; // Set a limit to prevent infinite loop

                while (total !== totalIntervals) {
                    const index = intervals.indexOf(Math.max(...intervals));
                    intervals[index] += (total < totalIntervals) ? 1 : -1;
                    total = intervals.reduce((a, b) => a + b, 0);

                    iterationCount++;
                    if (iterationCount > maxIterations) {
                        console.warn("Breaking out of loop to prevent infinite iteration.");
                        break;
                    }
                }

                intervals.forEach((interval, index) => {
                    const cloneItem = cloneItemRuler.cloneNode(true);
                    //
                    cloneItem.querySelector('.home-ruler-main-item-txt').innerText = this.sections[index].getAttribute('data-sc-name');
                    if (index === 0 || index === intervals.length - 1) {
                        cloneItem.querySelector('.home-ruler-main-item-line-head').remove();
                        cloneItem.querySelector('.home-ruler-main-item-txt').remove();
                    }
                    // if (index !== 0 ) {
                    //     cloneItem.querySelector('.home-ruler-main-item-txt').innerText = this.sections[index].getAttribute('data-sc-name');
                    //     if (index === 1) {
                    //         cloneItem.classList.add('active');
                    //     }
                    // } else {
                    //     cloneItem.querySelector('.home-ruler-main-item-line-head').remove();
                    //     cloneItem.querySelector('.home-ruler-main-item-txt').remove();
                    // }
                    cloneItem.style.flexBasis = `${interval * rulerSpace}%`;
                    ruler.appendChild(cloneItem);
                });
                gsap.set('.home-ruler-main-item-line', { '--ruler-gap': rulerSpace - 1 });
            }
            setTl(data) {
                let currIndex = 0;
                const onUpdateProgress = (progress, breakpoints) => {
                    for (let i = 0; i < breakpoints.length - 1; i++) {
                        const startPoint = breakpoints[i];
                        const endPoint = breakpoints[i + 1];

                        if (progress >= startPoint && progress < endPoint) {
                            currIndex = i - 1;
                            this.el.querySelectorAll('.home-ruler-main-item-txt').forEach((el, i) => {
                                el.parentElement.classList.toggle('active', i === currIndex);
                            })
                            break;
                        }
                    }
                }

                let breakpoints = this.ratios.reduce((acc, curr, index) => {
                    const prevSum = index === 0 ? 0 : acc[acc.length - 1];
                    acc.push(prevSum + curr);
                    return acc;
                }, [0])

                this.tlScrub = gsap.timeline({
                    scrollTrigger: {
                        trigger: data.next.container.querySelector('.main-content'),
                        horizontal: true,
                        start: 'left-=2px left',
                        end: `right right`,
                        scrub: true,
                        onUpdate: (self) => {
                            onUpdateProgress(self.progress, breakpoints);
                        }
                    },
                    defaults: {
                        ease: 'none'
                    }
                })

                let progressDistance = this.rulerWidth - this.rulerScuber.clientWidth;
                let lastRatio = this.widths[0] / this.totalWidth;
                console.log(this.widths[0])
                this.tlScrub
                    .fromTo('.home-ruler-progress', {
                        x: progressDistance * 0
                    }, { x: progressDistance * 1, duration: 1 })
                    // .to('.home-ruler-progress', { scaleX: 0.8, transformOrigin: 'right', opacity: 0, duration: 0.01, ease: 'power1.in' }, '>-0.01')
                    // .fromTo('.home-ruler-progress', {
                    //     x: progressDistance * 0
                    // }, { x: progressDistance * lastRatio, duration: (lastRatio) * 1 })
            }
            showUp(data) {
                if ($(window).width() < 991) return;
                this.tlReveal.play();
            }
            destroy() {
                if ($(window).width() < 991) return;
                if (this.tlScrub) {
                    this.tlScrub.kill();
                }
                this.el = null;
                this.ruler = null;
                this.sections = [];
                this.widths = [];
                this.totalWidth = 0;
                this.rulerWidth = 0;
            }
        }
    }
    const DetailPage = {
        Hero: class {
            constructor() {
                this.el = null;
                this.tl = null;
            }
            setup(data) {
                this.el = data.next.container.querySelector('.detail-wrap');

                let title = new SplitType(this.el.querySelector('.detail-hero-title'), {types: 'lines, words, chars', lineClass: 'bp-line', wordClass: 'bp-word'});
                let sub = new SplitType(this.el.querySelector('.detail-hero-sub'), {types: 'lines, words', lineClass: 'lines', wordClass: 'bp-word'});

                this.tl = gsap.timeline({
                    paused: true,
                    onStart: () => header.play(),
                    onComplete: () => {
                        title.revert();
                        sub.revert();
                    }
                })
                this.tl
                    .fromTo(title.chars,
                        { yPercent: 100, autoAlpha: 0 },
                        { yPercent: 0, autoAlpha: 1, duration: 0.8, stagger: 0.02 }, "<=0")
                    .fromTo(sub.words,
                        { yPercent: 60, autoAlpha: 0 },
                        { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.015 }, "<=.2")
                    .fromTo(this.el.querySelector('.detail-thumb .detail-main-img'),
                        { clipPath: `inset(20% round ${parseRem(20)}px)` },
                        { clipPath: `inset(0% round ${parseRem(20)}px)`, duration: 2, ease: 'expo.out', clearProps: 'all'}, "<=.3")
                    .fromTo(this.el.querySelector('.detail-thumb img'),
                        { scale: 1.4, autoAlpha: 0 },
                        { scale: 1, duration: 2, autoAlpha: 1, ease: 'expo.out', clearProps: 'all' }, "<=0")
            }
            play() {
                this.tl.play();
                detailPageManager.toc.playAnimReveal();
            }
            destroy() {

            }
        },
        TOC: class {
            constructor() {
                this.el = null;
                this.currentTOC = null;
                this.tlRevealHeroToc = null;
                this.tocItems = null;
                this.contentSections = null;
            }
            setup(data) {
                this.el = data.next.container.querySelector('.detail-wrap');
                this.setupHtml(data);
                this.setupAnimReveal();

                if (window.innerWidth > 767) {
                    this.desktop(data);
                } else {
                    this.mobile(data);
                }
            }
            desktop(data) {
                this.toggleTOC();
                
                this.subTocs = this.el.querySelectorAll('.detail-toc-main-item');
                this.subTocHead = this.el.querySelector('.detail-toc-main-title-wrap');
                this.subTocPrgess = this.el.querySelectorAll('.detail-toc-main-item-progress');
                this.subTocPercent = this.el.querySelectorAll('.detail-toc-main-item-progress-inner');

                //
                // this.el.querySelector('.detail-toc-main-list').style.position = 'relative';
                // this.el.querySelector('.detail-toc-main-list').style.height = `100%`;

                // this.el.querySelectorAll('.detail-toc-main-item').forEach((el, i) => {
                //     el.style.position = 'absolute';
                //     el.style.top = `0`;
                // })
                //
                this.rulerRequestId = requestAnimationFrame(this.scrollDesktopHandler.bind(this));
                gsap.ticker.add(this.scrollDesktopHandler.bind(this));
                // this.demo()
                this.drawRuler(data);
            }
            setupHtml(data) {
                this.contentSections = this.el.querySelectorAll('[data-toc="content"]');
                const mainTOCContainer = this.el.querySelector('.detail-hero-toc-main');
                const subTOCContainer = this.el.querySelector('.detail-toc-main-list');
                const mainTOCTemplate = this.el.querySelector('.detail-toc-item').cloneNode(true);
                const subTOCTemplate = this.el.querySelector('.detail-toc-main-item').cloneNode(true);

                mainTOCContainer.innerHTML = '';
                subTOCContainer.innerHTML = '';

                this.contentSections.forEach((section) => {
                    const title = section.querySelector('h2.hidden').textContent;
                    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    section.setAttribute('data-toc-id', id);

                    // Create and append main TOC item
                    const mainTOCItem = mainTOCTemplate.cloneNode(true);
                    mainTOCItem.querySelector('.txt').textContent = title;
                    mainTOCItem.querySelector('a').setAttribute('href', `#${id}`);
                    mainTOCItem.querySelector('a').addEventListener('click', (e) => this.scrollToID(e));
                    mainTOCContainer.append(mainTOCItem);

                    // Create and append sub TOC item
                    const subTOCItem = subTOCTemplate.cloneNode(true);
                    subTOCItem.querySelector('.txt').textContent = title;
                    subTOCItem.querySelector('a').setAttribute('href', `#${id}`);
                    subTOCItem.querySelector('a').addEventListener('click', (e) => {
                        this.scrollToID(e);
                    });
                    subTOCContainer.append(subTOCItem);

                    // Add progress placeholder
                    const progressDiv = document.createElement('div');
                    progressDiv.classList.add('detail-toc-main-item-progress');
                    progressDiv.style.opacity = 1;
                    progressDiv.style.pointerEvents = 'none';
                    progressDiv.style.width = '100%';
                    progressDiv.style.height = '100%';
                    progressDiv.style.position = 'absolute';
                    progressDiv.style.top = 'calc(50%)';
                    progressDiv.style.background = 'rgba(0,0,100,.25)';
                    const progressDivInner = document.createElement('div');
                    progressDivInner.classList.add('detail-toc-main-item-progress-inner');
                    progressDivInner.style.width = '100%';
                    progressDivInner.style.height = '100%';
                    progressDivInner.style.background = 'rgba(0,0,100,.25)';
                    progressDiv.style.opacity = 0;
                    progressDivInner.style.opacity = 0;
                    progressDiv.appendChild(progressDivInner);
                    subTOCItem.querySelector('.detail-toc-main-item-main').appendChild(progressDiv);

                });
            }
            setupAnimReveal() {
                this.tlRevealHeroToc = gsap.timeline({ paused: true })
                this.tlRevealHeroToc
                .fromTo(this.el.querySelectorAll('.detail-toc-item'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 1.2, stagger: 0.05, ease: 'power1.out', clearProps: 'all' })
            }
            playAnimReveal() {
                this.tlRevealHeroToc.play();
            }

            drawRuler(data) {
                this.ratio = {value: 0};

                this.rulerEl = this.el.querySelector('.detail-ruler-inner');

                this.canvas = document.createElement('canvas');
                this.canvas.classList.add('detail-ruler-canvas');
                this.canvas.style.position = 'absolute';
                this.canvas.style.top = 0;
                this.canvas.style.right = 0;
                this.canvas.style.width = '100%';
                this.canvas.style.height = '100%';
                this.rulerEl.appendChild(this.canvas);
                this.rulerEl.style.background = 'none';
                this.ctx = this.canvas.getContext('2d');

                this.drawRaf = requestAnimationFrame(this.draw.bind(this));

                // function updateOnResize() {
                // }
                // documentHeightObserver('init', data, updateOnResize);
            }
            draw(canvas) {
                // Get container dimensions
                const container = this.canvas.parentElement;
                const width = container.offsetWidth;
                const height = container.offsetHeight;

                // Set canvas dimensions to match container (handle pixel ratio)
                const dpr = window.devicePixelRatio || 1;
                this.canvas.width = width * dpr;
                this.canvas.height = height * dpr;
                this.ctx.scale(dpr, dpr);

                // CSS variables translated to canvas
                const rulerWidth = parseRem(1); // --ruler-width: 0.1rem
                const rulerGap = parseRem(9); // --ruler-gap: 0.9rem
                const rulerColor = 'rgba(86, 122, 139, 0.40)'; // --ruler-cl
                const totalStep = rulerWidth + rulerGap; // Total size of one tick + gap
                const baseLineLength = parseRem(10);
                const maxLineLength = parseRem(42);
                const minLineLength = parseRem(10);
                const maxDistance = totalStep / 2; // From snippet

                // Clear canvas
                this.ctx.clearRect(0, 0, width, height);

                // Set drawing styles
                this.ctx.strokeStyle = rulerColor;
                this.ctx.lineWidth = rulerWidth;

                // Precompute active element positions
                const allActives = Array.from(document.querySelectorAll('.detail-toc-main-title-wrap, .detail-toc-main-item')).map((el, i) => {
                    let offset = i === 0 ? el.querySelector('*').getBoundingClientRect().height / 2 : parseRem(21);
                    return el.querySelector('*').getBoundingClientRect().top + offset;
                });

                // Draw horizontal lines along the right edge
                for (let y = 0; y <= height; y += totalStep) {
                    let scaleX = 1;

                    // Calculate scale based on proximity to active elements
                    allActives.forEach(activeY => {
                        const distance = Math.abs(y - activeY);
                        if (distance < maxDistance) {
                            scaleX *= 1 + 3.2 * this.ratio.value;
                        } else {
                            scaleX *= 1 * this.ratio.value;
                        }
                    });

                    // Calculate line length, enforce min and max limits
                    const lineLength = Math.max(minLineLength, Math.min(maxLineLength, baseLineLength * scaleX));

                    // Draw line
                    this.ctx.beginPath();
                    this.ctx.moveTo(width, y); // Start at the right edge
                    this.ctx.lineTo(width - lineLength, y); // Draw leftward
                    this.ctx.stroke();
                }
                requestAnimationFrame(this.draw.bind(this));

            }
            scrollDesktopHandler(data) {
                if (this.contentSections && this.contentSections.length != 0) {
                    this.contentSections.forEach((section, i) => {
                        let sectionRect = section.getBoundingClientRect();
                        let itemRect = this.subTocs[i].getBoundingClientRect();

                        let calcPercent = (sectionRect.top - window.innerHeight) / (sectionRect.height) * -100;
                        let percent = gsap.utils.clamp(0, 100, calcPercent);

                        let topCalc = sectionRect.top - itemRect.top + parseRem(50) - itemRect.height * .5
                        let maxtop = $('.detail-toc-main').outerHeight() - $('.detail-toc-main-title-wrap').height() - $('.detail-toc-main-list').height() - parseRem(120);

                        let top = gsap.utils.clamp(-1 * maxtop, 0, topCalc);
                        // let top = Math.max(-1 * maxtop, topCalc);
                        // let abc = sectionRect.top + smoothScroll.scroller.scrollY
                        // let top =  (abc / this.el.clientHeight) * $('.detail-toc-main').outerHeight()
                        //

                        this.subTocs[i].querySelector('.detail-toc-main-item-inner').style.transform = `translateY(${top}px)`;
                        let isLast = i !== this.contentSections.length - 1;
                        let marginBottom = isLast ? this.subTocs[i + 1].querySelector('.detail-toc-main-item-inner').getBoundingClientRect().top : window.innerHeight - parseRem(40);
                        let nextSubTransform = marginBottom - this.subTocs[i].querySelector('.detail-toc-main-item-inner').getBoundingClientRect().top;
                        let height = Math.abs(nextSubTransform - (isLast ? itemRect.height / 2 : 0) + (isLast ? this.subTocs[i + 1].getBoundingClientRect().height / 2 : 0))
                        this.subTocPrgess[i].style.height = `${height}px`;
                        this.subTocPercent[i].style.height = `${(percent / 100) * height}px`;
                    })

                    let thumbRect = this.el.querySelector('.detail-thumb').getBoundingClientRect();
                    let thumbItemRect = this.el.querySelector('.detail-toc-main-title-wrap').getBoundingClientRect();
                    let thumbTopCalc = thumbRect.top - thumbItemRect.top - thumbItemRect.height * .5;
                    let thumbMaxTop = $('.detail-toc-main').outerHeight() - $('.detail-toc-main-title-wrap').height() - $('.detail-toc-main-list').height() - parseRem(120);
                    let thumbTop = gsap.utils.clamp(-1 * thumbMaxTop, 0, thumbTopCalc);
                    this.el.querySelector('.detail-toc-main-title-wrap').querySelector('.detail-toc-main-title-inner').style.transform = `translateY(${thumbTop}px)`;
                }

            }
            scrollToID(e) {
                e.preventDefault();
                let href = $(e.target).attr('href');
                smoothScroll.lenis.scrollTo(`[data-toc-id=${href.slice(1)}]`, {
                    offset: -100,
                    force: true,
                })
                barba.history.add(`${window.location.pathname + href}`, 'barba', 'replace');
                if (window.innerWidth <= 768) {
                    this.el.querySelector('.detail-toc-main-list').classList.remove('active');
                }
            }
            demo() {
                this.el.querySelector('.detail-toc-main-list').prepend(this.el.querySelector('.detail-toc-main-title-wrap'))
                $(this.el.querySelector('.detail-toc-main-list')).css({
                    'height': '100%',
                })
                let allTOCItems = this.el.querySelectorAll('.detail-toc-main-title-wrap, .detail-toc-main-item');
                let allContentItems = this.el.querySelectorAll('.detail-thumb, [data-toc="content"]');
                let totalHeight = this.el.querySelector('.detail-thumb').getBoundingClientRect().height + this.el.querySelector('.detail-main').getBoundingClientRect().height;
                allTOCItems.forEach((el, i) => {
                    let percent = (allContentItems[i].getBoundingClientRect().height / totalHeight) * 100;
                    $(el).css({
                        'flex-grow': '1',
                        'flex-basis': `${percent}%`,
                    })
                })
            }
            mobile(data) {
                $('.detail-toc-main-list').attr('data-lenis-prevent', '');
                smoothScroll.lenis.on('scroll', () => this.scrollMobileHandler.bind(this)(data));
                let stickyTop = $('.header').outerHeight() - .5;
                gsap.set('.detail-toc', { top: stickyTop, opacity: 0, height: $(window).height() - stickyTop });

                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: data.next.container.querySelector('.main-content'),
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: true
                    }
                })
                tl.fromTo('.detail-toc-main-prog-inner', { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, ease: 'none' });

                $('.detail-toc-main-curr').on('click', (e) => {
                    e.preventDefault();
                    $('.detail-toc-main-list').toggleClass('active');

                    requestAnimationFrame(() => {
                        if ($('.detail-toc-main-list').hasClass('active')) {
                            $('.detail-toc-main-list').animate({
                                scrollTop: $('.detail-toc-main-item.active').position().top - 5
                            }, 300, 'lenisEase');
                        }
                        else {
                        }
                    })
                });
                $(window).on('click', (e) => {
                    if (!$('.detail-toc-main-curr:hover').length)
                        $('.detail-toc-main-list').removeClass('active');
                })
            }
            scrollMobileHandler(data) {
                this.el.querySelectorAll('[data-toc="content"]').forEach((el, i) => {
                    let id = el.dataset.tocId;
                    let rect = el.getBoundingClientRect();
                    if (rect.top > 0 && rect.top < ($(window).height() / 5)) {
                        if (this.currentTOC === id) return;

                        this.currentTOC = id;
                        const currentTOCEl = this.el.querySelector(`.detail-toc-main-item .detail-toc-main-item-main[href="#${this.currentTOC}"]`);
                        currentTOCEl.parentElement.classList.add('active');

                        const otherTOCItems = this.el.querySelectorAll(`.detail-toc-main-item:not(:has(.detail-toc-main-item-main[href="#${this.currentTOC}"]))`);
                        otherTOCItems.forEach(item => item.classList.remove('active'));

                        this.el.querySelector('.detail-toc-main-curr-title').innerHTML = currentTOCEl.textContent;
                        this.el.querySelector('.detail-toc-main-curr-num').innerHTML = (i + 1).toString().padStart(3, '0');
                    }
                    if (i === 0) {
                        if (rect.top <= ($('.header').outerHeight() + $('.detail-toc-main-inner').outerHeight() + 100)) {
                            gsap.to('.detail-toc', { opacity: 1 });
                        }
                        else {
                            gsap.to('.detail-toc', { opacity: 0 });
                            $('.detail-toc-main-list').removeClass('active');
                        }
                    }
                })
            }
            scrollToID(e) {
                e.preventDefault();
                let href = $(e.target).attr('href');
                smoothScroll.lenis.scrollTo(`[data-toc-id=${href.slice(1)}]`, {
                    offset: -100,
                    force: true,
                })
                barba.history.add(`${window.location.pathname + href}`, 'barba', 'replace');
                return false;
            }
            toggleTOC() {
                this.tlTocProg = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el.querySelector('.detail-thumb'),
                        start: `top-=${parseRem(100)} top`,
                        endTrigger: this.el.querySelector('.detail-next'),
                        end: 'top bottom',
                        scrub: true,
                    }
                })
                this.tlTocProg.fromTo(this.el.querySelector('.detail-ruler-progress'), {
                    y: parseRem(120)
                }, {
                    ease: 'none',
                    y: () => {
                        if (this.el !== null) {
                            let rulerHeight = this.el.querySelector('.detail-ruler-inner').getBoundingClientRect().height;
                            let rulerProgressHeight = this.el.querySelector('.detail-ruler-progress').getBoundingClientRect().height + parseRem(40);
                            let maxHeight = rulerHeight - rulerProgressHeight;
                            return maxHeight;
                        } else {
                            return 0;
                        }
                    }
                })

                let title = new SplitType(this.el.querySelector('.detail-toc-main-title'), {types: 'lines, words', lineClass: 'bp-line', wordClass: 'bp-word'});
                this.el.querySelectorAll('.detail-toc-main-item-txt').forEach((sub) => {
                    new SplitType(sub, { types: 'lines, words', lineClass: 'bp-line', wordClass: 'bp-word' })
                    .lines.forEach((line) => {
                        line.querySelectorAll('.bp-word').forEach((word,index) => {
                            gsap.set(word, { '--trans-delay': `${(index + 1) * .05}s` })
                        })
                    })

                })

                this.triggerTOC.bind(this)()
                smoothScroll.lenis.on('scroll', this.triggerTOC.bind(this));
            }
            triggerTOC() {
                ($('.detail-thumb').get(0).getBoundingClientRect().top < parseRem(100) && this.el.querySelector('.detail-next').getBoundingClientRect().top > window.innerHeight) ? this.openTOC() : this.closeTOC();
            }
            openTOC() {
                if (this.isTOCOpened) return;
                this.isTOCOpened = true;
                this.el.querySelector('.detail-ruler-progress').classList.add('active');
                this.ratio && gsap.to(this.ratio, {value: 1, duration: 1, ease: 'power1.out', overwrite: true})
                this.el.querySelector('.detail-toc').classList.add('active');
            }
            closeTOC() {
                if (!this.isTOCOpened) return;
                this.isTOCOpened = false;
                this.el.querySelector('.detail-ruler-progress').classList.remove('active');
                this.ratio && gsap.to(this.ratio, {value: 0, duration: 1, ease: 'power1.out', overwrite: true})

                this.el.querySelector('.detail-toc').classList.remove('active');
            }

            destroy() {
                if (this.rulerRequestId) {
                    cancelAnimationFrame(this.rulerRequestId);
                }
                if (this.drawRaf) {
                    cancelAnimationFrame(this.drawRaf);
                }
                this.el = null;
                this.currentTOC = null;
                this.tlRevealHeroToc = null;
                this.tocItems = null;
                this.contentSections = null;
                this.rulerEl = null;
            }
        },
        Main: class {
            constructor() {
                this.el = null;
                this.tlTrigger = null;
            }
            setTrigger(data) {
                this.el = data.next.container.querySelector('.detail-main');
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
                        start: 'top bottom+=50%',
                        end: 'bottom top',
                        once: true,
                        onEnter: () => this.setup(data)
                    }
                })
            }
            setup(data) {
                this.el.querySelectorAll('[data-toc="content"]').forEach((section, i) => {
                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: section,
                            start: 'top bottom+=50%',
                            end: 'bottom top',
                            once: true,
                            onEnter: () => {
                                this.animate(section);
                            },
                        }
                    })
                })
            }
            animate(data) {
                const animateType = {
                    fadeUp: (tl, el) => {
                        tl.fromTo(el.children,
                            { y: 100, opacity: 0 },
                            { y: 0, opacity: 1, duration: 1, stagger: 0.05, ease: 'power1.out', clearProps: 'all' })
                    },
                    imageScale: (tl, el) => {
                        const visibleChildren = Array.from(el.children).filter(child => {
                            const style = window.getComputedStyle(child);
                            return style.display !== 'none';
                        });
                        const visibleImages = visibleChildren.flatMap(child => {
                            return window.getComputedStyle(child.querySelector('img')).display !== 'none' ? child.querySelector('img') : child.querySelector('video');
                        });
                        tl.fromTo(visibleImages,
                            { scale: 1.5, opacity: 0 },
                            { scale: 1, opacity: 1, duration: 1, stagger: 0.1, ease: 'expo.out', clearProps: 'all' })
                    }
                }

                data.querySelectorAll('.page-slot-wrap > div').forEach((item) => {
                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: 'top top+=75%',
                        }
                    })
                    if (item.classList.contains('detail-main-img-wrap')) {
                        animateType.imageScale(tl, item);
                    }
                    else {
                        animateType.fadeUp(tl, item);
                    }
                });
            }
            destroy() {
                if (this.tlTocProg) {
                    this.tlTocProg.kill();
                }
                if (this.tlTrigger) {
                    this.tlTrigger.kill();
                }
            }
        },
        Next: class {
            constructor() {
                this.el = null;
                this.tlTrigger = null;
            }
            setTrigger(data) {
                this.el = data.next.container.querySelector('.detail-next');
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
                        start: 'top bottom+=50%',
                        end: 'bottom top',
                        once: true,
                        onEnter: () => this.setup(data),
                    }
                })
            }
            setup(data) {
                let label = new SplitType(this.el.querySelector('.detail-next-label'), { types: 'lines, words', lineClass: 'lines', wordClass: 'bp-word' });
                let title = new SplitType(this.el.querySelector('.detail-next-title'), { types: 'lines, words, chars', lineClass: 'lines', wordClass: 'bp-word' });
                // let links = new SplitType(this.el.querySelectorAll('.detail-next-bot-link .link-inner .txt'), { types: 'lines, words', lineClass: 'lines', wordClass: 'bp-word' });
                // let copyright = new SplitType(this.el.querySelector('.detail-next-bot-copyright .link-inner .txt'), { types: 'lines, words', lineClass: 'lines', wordClass: 'bp-word' });
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: this.el,
                        start: 'top top+=75%',
                    },
                    onComplete: () => {
                        label.revert();
                        title.revert();
                        // links.revert();
                        // copyright.revert();
                    }
                })

                tl
                    .fromTo(this.el.querySelector('.detail-next-bg'),
                        { scale: 1.5 },
                        { scale: 1, duration: 1.2, ease: 'power1.out', clearProps: 'all' })
                    .fromTo(label.words,
                        { yPercent: 100, opacity: 0 },
                        { yPercent: 0, opacity: 1, duration: .6, stagger: 0.02 }, "<=0")
                    .fromTo(title.chars,
                        { yPercent: 60, opacity: 0 },
                        { yPercent: 0, opacity: 1, duration: .6, stagger: 0.02 }, "<=.3")
                    // .fromTo(this.el.querySelector('.detail-next-bot-line'),
                    //     { scaleX: 0, transformOrigin: 'left'  },
                    //     { scaleX: 1, duration: .8 }, "<=.1")
                    // .fromTo(links.words,
                    //     { yPercent: 100, opacity: 0 },
                    //     { yPercent: 0, opacity: 1, duration: .6, stagger: 0.02 }, "<=.2")
                    // .fromTo(copyright.words,
                    //     { yPercent: 100, opacity: 0 },
                    //     { yPercent: 0, opacity: 1, duration: .6, stagger: 0.02 }, "<=.2")
            }
            destroy() {
                if (this.tlTrigger) {
                    this.tlTrigger.kill();
                }
            }
        }
    }
    class HomePageManager {
        constructor() {
            this.background = new HomePage.Background();

            this.hero = new HomePage.Hero();
            this.brand = new HomePage.Brand();
            this.voice = new HomePage.Voice();
            this.logo = new HomePage.Logo();
            this.typo = new HomePage.Typo();
            this.photo = new HomePage.Photo();
            this.color = new HomePage.Color();

            this.transColor = new HomePage.TransColor();
            this.scrollBar = new HomePage.ScrollBar();

            this.boundSetupHandler = this.setupHandler.bind(this);
            this.boundOncePlayHandler = this.oncePlayHandler.bind(this);
            this.boundEnterPlayHandler = this.enterPlayHandler.bind(this);
        }
        init(data) {
            const container = data.next.container;
            container.addEventListener("onceSetup", this.boundSetupHandler);
            container.addEventListener("oncePlay", this.boundOncePlayHandler);
            container.addEventListener("enterSetup", this.boundSetupHandler);
            container.addEventListener("enterPlay", this.boundEnterPlayHandler);
        }
        oncePlayHandler(event) {
            this.hero.playOnce(event.detail);
        }
        enterPlayHandler(event) {
            this.hero.playEnter(event.detail);
            this.brand.playEnter(event.detail);
        }
        destroy(data) {
            const container = data.next.container;
            container.removeEventListener("onceSetup", this.boundSetupHandler);
            container.removeEventListener("oncePlay", this.boundOncePlayHandler);
            container.removeEventListener("enterSetup", this.boundSetupHandler);
            container.removeEventListener("enterPlay", this.boundEnterPlayHandler);
            this.destroyHandler(data);
        }
        setupHandler(event) {
            const data = event.detail;
            this.background.setup(data);

            this.hero.setup(data);
            this.brand.setTrigger(data);
            this.voice.setTrigger(data);
            this.logo.setTrigger(data);
            this.typo.setTrigger(data);
            this.photo.setTrigger(data);
            this.color.setTrigger(data);
            this.transColor.setup(data);
            this.scrollBar.setup(data);
        }
        destroyHandler(data) {
            [this.hero, this.brand, this.voice, this.logo, this.typo, this.photo, this.color, this.background, this.transColor, this.scrollBar].forEach(component => component.destroy());
        }
    }
    class DetailPageManager {
        constructor() {
            this.hero = new DetailPage.Hero();
            this.toc = new DetailPage.TOC();
            this.main = new DetailPage.Main();
            this.next = new DetailPage.Next();

            this.boundSetupHandler = this.setupHandler.bind(this);
            this.boundOncePlayHandler = this.oncePlayHandler.bind(this);
            this.boundEnterPlayHandler = this.enterPlayHandler.bind(this);
        }
        init(data) {
            const container = data.next.container;
            container.addEventListener("onceSetup", this.boundSetupHandler);
            container.addEventListener("oncePlay", this.boundOncePlayHandler);
            container.addEventListener("enterSetup", this.boundSetupHandler);
            container.addEventListener("enterPlay", this.boundEnterPlayHandler);
        }
        oncePlayHandler(event) {
            this.hero.play(event.detail);
        }
        enterPlayHandler(event) {
            this.hero.play(event.detail);
        }
        destroy(data) {
            const container = data.next.container;
            container.removeEventListener("onceSetup", this.boundSetupHandler);
            container.removeEventListener("oncePlay", this.boundOncePlayHandler);
            container.removeEventListener("enterSetup", this.boundSetupHandler);
            container.removeEventListener("enterPlay", this.boundEnterPlayHandler);
            this.destroyHandler(data);
        }
        setupHandler(event) {
            const data = event.detail;
            this.hero.setup(data);
            this.toc.setup(data);
            this.main.setTrigger(data);
            this.next.setTrigger(data);
        }
        destroyHandler(data) {
            [this.hero, this.toc, this.main, this.next].forEach(component => component.destroy());
        }
    }
    const homePageManager = new HomePageManager();
    const detailPageManager = new DetailPageManager();

    const SCRIPT = {
        home: {
            namespace: 'home',
            afterEnter(data) {
                homePageManager.init(data);
            },
            beforeLeave(data) {

                homePageManager.destroy(data);
            }
        },
        detail: {
            namespace: 'detail',
            afterEnter(data) {
                detailPageManager.init(data);
            },
            beforeLeave(data) {
                detailPageManager.destroy(data);
            }
        }
    }
    const VIEWS = Object.values(SCRIPT);

    barba.init({
        preventRunning: true,
        timeout: 5000,
        debug: true,
        transitions: [{
            name: 'default-transition',
            sync: true,
            beforeOnce(data) {
                smoothScroll.init(data);
                documentHeightObserver("init", data)
                globalChange.init(data);
            },
            once(data) {
                loader.init(data);
                loader.play(data);
            },
            async leave(data) {
                await pageTrans.play(data);
            },
        }],
        views: VIEWS
    })
}

window.onload = mainScript;