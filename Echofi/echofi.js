const script = () => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({
        invalidateOnRefresh: true,
        scroller: '.main-inner',
    });
    const parseRem = (input) => {
        return input / 10 * parseFloat($('html').css('font-size'))
    }

    const lenis = new Lenis({
        wrapper: document.querySelector('.main-inner'),
        smoothTouch: false,
    })
    gsap.ticker.add((time) => {
        if (lenis) {
            lenis.raf(time * 1000);
        }
    });
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', ScrollTrigger.update)

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
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: .5,
                }
            })
            tl
            .to(this.el.querySelector('.home-road-stick'), {x: `-${distance}px`, ease: 'none' })
            .to(this.el.querySelector('.home-road-line-vert'), {x: `${(this.el.querySelector('.home-road-main-item').offsetWidth + parseRem(16)) * 5}px`, ease: 'none' }, '<=0')
        }
    }
    customElements.define('home-road-wrap', HomeRoad);
}

window.onload = script