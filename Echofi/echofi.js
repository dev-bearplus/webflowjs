const script = () => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({
        invalidateOnRefresh: true,
    });
    const parseRem = (input) => {
        return input / 10 * parseFloat($('html').css('font-size'))
    }

    class HomeNFT extends HTMLElement {
        constructor() {
            super();
            this.el = this;
            this.allLeft = this.el.querySelectorAll('.home-nft-main-left-item');
            this.allRight = this.el.querySelectorAll('.home-nft-main-right-item');
        }
        connectedCallback() {
            console.log('connected')
            let duration = 8;
            this.allLeft.forEach((item, i) => {
                let tlLeft = gsap.timeline({
                    repeat: -1,
                    delay: i * (-duration / 7),
                })
                gsap.set(item, {
                    'transform': 'translate3d(100%, 0px, 0px)',
                    autoAlpha: 1,
                })
                tlLeft.to(item, {
                    keyframes: [
                        {
                            'transform': 'translate3d(100%, 0px, 0px)',
                            autoAlpha: 1,
                            ease: 'power2.inOut',
                        },
                        {
                            'transform': 'translate3d(0%, 0px, 0px)',
                            autoAlpha: 1,
                            ease: 'power2.inOut',
                        },
                        {
                            'transform': 'translate3d(-47%, 0px, -83.8px)',
                            autoAlpha: 1,
                            ease: 'power2.inOut',
                        },
                        {
                            'transform': 'translate3d(-108%, 0px, -200.2px)',
                            autoAlpha: 1,
                            ease: 'power2.inOut',
                        },
                        {
                            'transform': 'translate3d(-198%, 0px, -373px)',
                            autoAlpha: 1,
                            ease: 'power2.inOut',
                        },  
                        {
                            'transform': 'translate3d(-340%, 0%, -667px)',
                            autoAlpha: 1,
                            ease: 'power2.inOut',
                        },
                        {
                            'transform': 'translate3d(-604%, 0px, -1253.4px)',
                            autoAlpha: 0,
                            ease: 'power2.inOut',
                        },
                    ],
                    duration: duration,
                    ease: 'none',
                })
            })
            this.allRight.forEach((item, i) => {
                let tlRight = gsap.timeline({
                    repeat: -1,
                    delay: i * (-duration / 7),
                })
                gsap.set(item, {
                    'transform': 'translate3d(-100%, 0px, 0px)',
                    autoAlpha: 1,
                })
                tlRight.to(item, {
                    keyframes: [
                        {
                            'transform': 'translate3d(-100%, 0px, 0px)',
                            autoAlpha: 1,
                            ease: 'power2.inOut',
                        },
                        {
                            'transform': 'translate3d(0%, 0px, 0px)',
                            autoAlpha: 1,
                            ease: 'power2.inOut',
                        },
                        {
                            'transform': 'translate3d(47%, 0px, -83.8px)',
                            autoAlpha: 1,
                            ease: 'power2.inOut',
                        },
                        {
                            'transform': 'translate3d(108%, 0px, -200.2px)',
                            autoAlpha: 1,
                            ease: 'power2.inOut',
                        },
                        {
                            'transform': 'translate3d(198%, 0px, -373px)',
                            autoAlpha: 1,
                            ease: 'power2.inOut',
                        },  
                        {
                            'transform': 'translate3d(340%, 0%, -667px)',
                            autoAlpha: 1,
                            ease: 'power2.inOut',
                        },
                        {
                            'transform': 'translate3d(604%, 0px, -1253.4px)',
                            autoAlpha: 0,
                            ease: 'power2.inOut',
                        },
                    ],
                    duration: duration,
                    ease: 'none',
                })
            })
        }
    }

    customElements.define('home-nft-wrap', HomeNFT);
}

window.onload = script