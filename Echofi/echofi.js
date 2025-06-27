const script = () => {
    gsap.registerPlugin(ScrollTrigger,SplitText)
    ScrollTrigger.defaults({
        invalidateOnRefresh: true,
        // scroller: '.main-inner',
    });
    const parseRem = (input) => {
        return input / 10 * parseFloat($('html').css('font-size'))
    }

    const lenis = new Lenis({
        // wrapper: document.querySelector('.main-inner'),
        // smoothTouch: false,
    })
    gsap.ticker.add((time) => {
        if (lenis) {
            lenis.raf(time * 1000);
        }
    });
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', ScrollTrigger.update)
    lenis.on('scroll', () => {
        document.querySelector('.prog-wrap').update();
        document.querySelector('header-inner').update();
    })
    class Header extends HTMLElement {
        constructor() {
            super();
            this.el = this;
            this.stickyEls = this.el.querySelectorAll('.header-grid, .header-links, .header-logo, .header-link');
            this.allItem = this.el.querySelectorAll('.header-link');
            this.currentIndex = 0;
        }
        connectedCallback() {
            this.setup();
            this.active(0);
            this.update();
        }
        setup() {
            this.allItem.forEach((item, i) => {
                let width = item.offsetWidth;
                item.style.setProperty('--max-width', width + 'px');
                item.addEventListener('mouseenter', () => {
                    this.active(i);
                })
                item.addEventListener('mouseleave', () => {
                    this.active(this.currentIndex);
                })
            })
        }
        toggleSticky(state) {
            if (state) {
                this.stickyEls.forEach((item) => {
                    item.classList.add('on-sticky');
                })
            } else {
                this.stickyEls.forEach((item) => {
                    item.classList.remove('on-sticky');
                })
            }
        }
        active(index) {
            this.allItem.forEach((item, i) => {
                if (i === index) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            })
        }
        update() {
            if (lenis.scroll > this.el.offsetHeight) {
                this.toggleSticky(true);
            } else {
                this.toggleSticky(false);
            }
        }
    }
    customElements.define('header-inner', Header);

    class PageProgress extends HTMLElement {
        constructor() {
            super();
            this.el = this;
            this.scrubber = this.el.querySelector('.prog-inner');
        }
        connectedCallback() {
            this.update();
        }
        update() {
            gsap.set(this.scrubber, {scaleX: lenis.scroll / lenis.limit})
        }
    }
    customElements.define('prog-wrap', PageProgress);
    class HomeHero extends HTMLElement {
        constructor() {
            super();
            this.el = this;
            this.uiScreen = this.el.querySelector('.home-hero-ui-inner');
        }
        connectedCallback() {

            let tlBg = gsap.timeline({
                scrollTrigger: {
                    trigger: this.el.querySelector('.home-hero-bg'),
                    start: `top top`,
                    end: 'bottom top',
                    scrub: true,
                }
            })
            tlBg.to(this.el.querySelector('.home-hero-bg-main'), {
                yPercent: 40,
                autoAlpha: .8,
                ease: 'none',
            })
            .to([this.el.querySelector('.home-hero-title-wrap'), this.el.querySelector('.home-hero-partner')], {
                y: this.el.querySelector('.home-hero-bg-main').offsetHeight * .25,
                ease: 'none',
            }, '<')
            .to([this.uiScreen], {
                yPercent: 40,
                ease: 'none',
            }, '<')
        }
    }
    customElements.define('home-hero-wrap', HomeHero);
    class HomeCoin extends HTMLElement {
        constructor() {
            super();
            this.el = this;
            this.textEl = this.el.querySelector('.home-coin-sub .txt');
        }
        connectedCallback() {
            console.log('connected')
            let splitEl = SplitText.create(this.textEl, {
                type: "words, lines",
            });
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: this.el.querySelector('.home-coin-sub'),
                    start: 'top bottom',
                    end: 'bottom 35%',
                    scrub: .5,
                }
            })
            console.log(splitEl)
            tl.to(splitEl.words, {
                color: '#fff',
                duration: 1,
                stagger: 0.1,
                ease: 'none',
            })
        }
    }
    customElements.define('home-coin-wrap', HomeCoin);

    class HomeNFT extends HTMLElement {
        constructor() {
            super();
            this.el = this;
            this.allLeft = this.el.querySelectorAll('.home-nft-main-left-item');
            this.allRight = this.el.querySelectorAll('.home-nft-main-right-item');
        }
        connectedCallback() {
            console.log('connected')
            let duration = 6;
            this.allLeft.forEach((item, i) => {
                let tlLeft = gsap.timeline({
                    repeat: -1,
                    delay: i * (-duration / this.allLeft.length),
                })
                gsap.set(item, {
                    'transform': 'translate3d(80%, 0px, 0px)',
                    autoAlpha: 1,
                })
                tlLeft.to(item, {
                    keyframes: [
                        
                        {
                            'transform': 'translate3d(0%, 0px, 0px)',
                            autoAlpha: 1,
                            ease: 'power3.out',
                        },
                        {
                            'transform': 'translate3d(-47%, 0px, -83.8px)',
                            autoAlpha: 1,
                            ease: 'power3.out',
                        },
                        {
                            'transform': 'translate3d(-108%, 0px, -200.2px)',
                            autoAlpha: 1,
                            ease: 'power3.out',
                        },
                        {
                            'transform': 'translate3d(-198%, 0px, -373px)',
                            autoAlpha: 1,
                            ease: 'power3.out',
                        },  
                        {
                            'transform': 'translate3d(-340%, 0%, -667px)',
                            autoAlpha: 1,
                            ease: 'power3.out',
                        },
                        {
                            'transform': 'translate3d(-604%, 0px, -1253.4px)',
                            autoAlpha: 0,
                            ease: 'power3.out',
                        },
                    ],
                    duration: duration,
                    ease: 'none',
                })
            })
            this.allRight.forEach((item, i) => {
                let tlRight = gsap.timeline({
                    repeat: -1,
                    delay: i * (-duration / this.allRight.length),
                })
                gsap.set(item, {
                    'transform': 'translate3d(-80%, 0px, 0px)',
                    autoAlpha: 1,
                })
                tlRight.to(item, {
                    keyframes: [
                        
                        {
                            'transform': 'translate3d(0%, 0px, 0px)',
                            autoAlpha: 1,
                            ease: 'power3.out',
                        },
                        {
                            'transform': 'translate3d(47%, 0px, -83.8px)',
                            autoAlpha: 1,
                            ease: 'power3.out',
                        },
                        {
                            'transform': 'translate3d(108%, 0px, -200.2px)',
                            autoAlpha: 1,
                            ease: 'power3.out',
                        },
                        {
                            'transform': 'translate3d(198%, 0px, -373px)',
                            autoAlpha: 1,
                            ease: 'power3.out',
                        },  
                        {
                            'transform': 'translate3d(340%, 0%, -667px)',
                            autoAlpha: 1,
                            ease: 'power3.out',
                        },
                        {
                            'transform': 'translate3d(604%, 0px, -1253.4px)',
                            autoAlpha: 0,
                            ease: 'power3.out',
                        },
                    ],
                    duration: duration,
                    ease: 'none',
                })
            })
        }
    }

    customElements.define('home-nft-wrap', HomeNFT);

    class HomeRoad extends HTMLElement {
        constructor() {
            super();
            this.el = this;
        }
        connectedCallback() {
            console.log('connected')
            let containerWidth = this.el.querySelector('.container').offsetWidth - (parseRem(160));
            let totalWidth = this.el.querySelector('.home-road-sub-wrap').offsetWidth + ((this.el.querySelector('.home-road-main-item').offsetWidth + parseRem(16)) * 5);
            let distance = totalWidth - containerWidth;
            console.log(distance / $(window).height())
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: this.el.querySelector('.home-road-stick-wrap'),
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: .5,
                }
            })
            tl
            .fromTo(this.el.querySelector('.home-road-stick'),{x: containerWidth/2}, {x: `-${distance + containerWidth/2}px`, ease: 'none' })
            .fromTo(this.el.querySelector('.home-road-line-vert'), {x: -containerWidth/2}, {x: `${((this.el.querySelector('.home-road-main-item').offsetWidth + parseRem(16)) * 5) + containerWidth/2}px`, ease: 'none' }, '<=0')
        }
    }
    customElements.define('home-road-wrap', HomeRoad);

}

window.onload = script