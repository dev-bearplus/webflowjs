import { getAllScrollTrigger } from "../utils/scrollTrigger";
import { viewportBreak } from '../utils/viewport';

const initAnimation = () => {
    console.log("initAnimation 👉️")
    const animGeneration = {
        initSelfSTrigger: (attr, fn) => {
            let listAttr = $(`[data-anim=${attr}]`);
            listAttr.each((_, item) => fn(item));
        },
        initStaggerSTrigger: (fn) => {
            let listTriggerWrap = $(`[data-anim-stagger-el="wrapper"]`);
            listTriggerWrap.each((_, item) => fn(item));
        },
        start: (item, { START }) => Number($(item).attr('data-anim-start')) || START,
        stagger: (item, { STAGGER }) => Number($(item).attr('data-anim-stagger-distance')) || STAGGER,
        delay: (item, { DELAY }) => Number($(item).attr('data-anim-delay')) || DELAY,
        duration: (item, { DUR }) => Number($(item).attr('data-anim-dur')) || DUR,
        scrub: (item, { SCRUB }) => Number($(item).attr('data-anim-scrub')) || SCRUB,
        scale: (item, { SCALE }) => Number($(item).attr('data-anim-scale')) || SCALE,
        fromY: (item, { Y, Y_PERCENT }) => {
            let fromY = $(item).attr('data-anim-y') ?
                            Number($(item).attr('data-anim-y')) || Y :
                        $(item).attr('data-anim-yp') ?
                            Number($(item).attr('data-anim-yp')) : Y_PERCENT;
            return fromY;
        },
        typeOfY: (type, trigger, ORIGIN) => {
            let result;
            if ($(trigger).attr('data-anim-y')) {
                switch (type) {
                    case 'y':
                        result = animGeneration.fromY(trigger, ORIGIN);
                        break;
                    case 'yPercent':
                        result = 0;
                        break;
                }
            }
            else {
                switch (type) {
                    case 'y':
                        result = 0;
                        break;
                    case 'yPercent':
                        result = animGeneration.fromY(trigger, ORIGIN);
                        break;
                }
            }
            return result;
        },
        inset: (item, { INSET }) => Number($(item).attr('data-anim-inset')) || INSET
    }

    function animFadeUp() {
        const ANIM_ATTR = "fade-up";
        const ORIGIN = {
            START: 85,
            STAGGER: .1,
            Y: 45,
            Y_PERCENT: 30,
            DELAY: 0,
            DUR: .8
        }
        const fadeUpType = {
            self: () => {
                animGeneration.initSelfSTrigger(ANIM_ATTR, (item) => {
                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: `top top+=${viewportBreak({ desktop: animGeneration.start(item, ORIGIN), mobile: 75 })}%`,
                        },
                        delay: animGeneration.delay(item, ORIGIN)
                    })
                    requestAnimationFrame(() => {
                        tl.fromTo(item,
                            {
                                y: viewportBreak({ desktop: animGeneration.typeOfY('y', item, ORIGIN), mobile: 20 }),
                                yPercent: viewportBreak({ desktop: animGeneration.typeOfY('yPercent', item, ORIGIN), mobile: 20 }),
                                autoAlpha: 0
                            },
                            { y: 0, yPercent: 0, autoAlpha: 1, opacity: 1, duration: animGeneration.duration(item, ORIGIN), ease: "power1.out", clearProps:'all' });
                    })
                })
            },
            stagger: () => {
                animGeneration.initStaggerSTrigger((stage) => {
                    let triggerItem = $(stage).find(`[data-anim-stagger-el="item"][data-anim-stagger=${ANIM_ATTR}]`);
                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: stage,
                            start: `top top+=${animGeneration.start(stage, ORIGIN)}%`,
                        },
                    })
                    requestAnimationFrame(() => {
                        tl.fromTo(triggerItem,
                            {
                                y: viewportBreak({ desktop: animGeneration.typeOfY('y', triggerItem, ORIGIN), mobile: 20 }),
                                yPercent: viewportBreak({ desktop: animGeneration.typeOfY('yPercent', triggerItem, ORIGIN), mobile: 20 }),
                                autoAlpha: 0
                            },
                        {  y: 0, yPercent: 0, autoAlpha: 1, duration: animGeneration.duration(stage, ORIGIN), stagger: animGeneration.stagger(stage, ORIGIN), clearProps:'all' })
                    })
                });
            }
        }
        fadeUpType.self();
        fadeUpType.stagger();
    }

    function animFadeLeft() {
        const ANIM_ATTR = "fade-left";
        const ORIGIN = {
            START: 90,
            DELAY: 0
        }
        const fadeUpType = {
            self: () => {
                animGeneration.initSelfSTrigger(ANIM_ATTR, (item) => {
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: `top top+=${animGeneration.start(item, ORIGIN)}%`,
                        },
                        delay: animGeneration.delay(item, ORIGIN)
                    }).fromTo(item,
                        { x: -10, autoAlpha: 0, opacity: 0 },
                        { x: 0, autoAlpha: 1, opacity: 1, duration: .8, ease: "power1.out", clearProps:'all' });
                })
            },
            stagger: () => {}
        }
        fadeUpType.self();
        fadeUpType.stagger();
    }

    function animFadeRight() {
        const ANIM_ATTR = "fade-right";
        const ORIGIN = {
            START: 100,
            DELAY: 0
        }
        const fadeUpType = {
            self: () => {
                animGeneration.initSelfSTrigger(ANIM_ATTR, (item) => {
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: `top top+=${animGeneration.start(item, ORIGIN)}%`,
                        },
                        delay: animGeneration.delay(item, ORIGIN)
                    }).fromTo(item,
                        { xPercent: 20, autoAlpha: 0, opacity: 0 },
                        { xPercent: 0, autoAlpha: 1, opacity: 1, duration: .8, ease: "power1.out", clearProps:'all' });
                })
            },
            stagger: () => {}
        }
        fadeUpType.self();
        fadeUpType.stagger();
    }

    function animFadeUpSplitText() {
        const ANIM_ATTR = "fade-up-splitext";
        const ORIGIN = {
            START: 100,
            STAGGER: .15,
            DELAY: 0,
            DUR: .8,
        }
        const fadeUpSplitTextType = {
            self: () => {
                animGeneration.initSelfSTrigger(ANIM_ATTR, (item) => {
                    let splitItem = new SplitText(item, { type: 'lines, words', linesClass: "splittext-lines" });
                    gsap.set(splitItem.lines, { overflow: 'hidden' });
                    gsap.set(splitItem.words, { yPercent: 100 });
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: `top top+=${viewportBreak({ desktop: animGeneration.start(item, ORIGIN), mobile: 75 })}%`,
                        },
                        delay: animGeneration.delay(item, ORIGIN)
                    }).to(splitItem.words, {
                        yPercent: 0,
                        duration: animGeneration.duration(item, ORIGIN), stagger: .04, ease: 'power2.out',
                        onComplete: () => {
                            splitItem.revert();
                        }
                    })
                })
            },
            stagger: () => {
                animGeneration.initStaggerSTrigger((stage) => {
                    let triggerItem = $(stage).find(`[data-anim-stagger-el="item"][data-anim-stagger=${ANIM_ATTR}]`);
                    gsap.set(triggerItem, { autoAlpha: 0 });

                    ScrollTrigger.batch(triggerItem, {
                        start: `top top+=${animGeneration.start(stage, ORIGIN)}%`,
                        onEnter: batch => {
                            batch.forEach((item, index) => {
                                let splitItem = new SplitText(item, { type: 'lines, words', linesClass: "splittext-lines" });
                                gsap.set(item, { autoAlpha: 1 });
                                gsap.set(splitItem.lines, { overflow: 'hidden' });
                                gsap.set(splitItem.words, { yPercent: 100, autoAlpha: 0 });
                                let delayItem = (index, initDelay) => index != 0 ? initDelay * (index + 1) : initDelay;
                                gsap.to(splitItem.words, {
                                    autoAlpha: 1,
                                    yPercent: 0,
                                    duration: animGeneration.duration(item, ORIGIN),
                                    ease: 'power2.out',
                                    delay: delayItem(animGeneration.stagger(stage, ORIGIN), .5),
                                    onComplete: () => {
                                        splitItem.revert();
                                    }
                                })
                            })
                        }
                    })
                })
            }
        }
        fadeUpSplitTextType.self();
        fadeUpSplitTextType.stagger();
    }

    function animScaleX() {
        const ANIM_ATTR = "scale-x";
        const ORIGIN = {
            START: 100,
            DELAY: 0
        }

        const scaleXType = {
            self: () => {
                animGeneration.initSelfSTrigger(ANIM_ATTR, (item) => {
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: `top top+=${animGeneration.start(item, ORIGIN)}%`,
                        },
                        delay: animGeneration.delay(item, ORIGIN)
                    }).fromTo(item,
                        { scaleX: 0, transformOrigin: 'left', autoAlpha: 0, opacity: 0 },
                        { scaleX: 1, autoAlpha: 1, opacity: 1, duration: 1, ease: 'power1.inOut', clearProps: 'all' })
                })
            },
            stagger: () => {}
        }
        scaleXType.self();
    }

    function animScaleInset() {
        const ANIM_ATTR = "scale-inset";
        const ORIGIN = {
            START: 70,
            INSET: 20,
            DELAY: 0,
            SCALE: 1.4
        }

        const scaleInsetType = {
            self: () => {
                animGeneration.initSelfSTrigger(ANIM_ATTR, (item) => {
                    let innerOfItem = $(item).find('[data-anim-inset="inner"]');

                    gsap.set(item, { clipPath: `inset(${animGeneration.inset(item, ORIGIN)}%)` });
                    gsap.set(innerOfItem, { scale: animGeneration.scale(item, ORIGIN) });
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: `top top+=${animGeneration.start(item, ORIGIN)}%`,
                        },
                        delay: animGeneration.delay(item, ORIGIN)
                    })
                    .to(item, { clipPath: 'inset(0%)', duration: 1.5, ease: 'expo.out', clearProps:'all' })
                    .to(innerOfItem, { scale: 1, duration: 1.5, ease: 'expo.out', clearProps:'all' }, 0)
                })
            },
            stagger: () => {}
        }
        scaleInsetType.self();
        scaleInsetType.stagger();
    }

    function animImgParallax() {
        const ANIM_ATTR = "img-para";
        const ORIGIN = { DELAY: 0 }
        const imgParallax = {
            self: () => {
                animGeneration.initSelfSTrigger(ANIM_ATTR, (item) => {
                    gsap.set(item, { willChange: "transform" })
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true
                        },
                        delay: animGeneration.delay(item, ORIGIN)
                    })
                        .fromTo(item,
                            { yPercent: -30 },
                            { yPercent: 42, ease: 'linear' })
                })
            },
            stagger: () => {}
        }
        imgParallax.self();
    }

    function animScrubParallax() {
        const ANIM_ATTR = "scrub-para";
        const ORIGIN = {
            Y: 45,
            Y_PERCENT: 30,
            DELAY: 0,
            SCRUB: true,
        }
        const scrubParallax = {
            self: () => {
                animGeneration.initSelfSTrigger(ANIM_ATTR, (item) => {
                    const negative = (val) => val * -1;
                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: animGeneration.scrub(item, ORIGIN)
                        },
                        delay: animGeneration.delay(item, ORIGIN)
                    })
                    requestAnimationFrame(() => {
                        tl.fromTo(item,
                            {
                                y: viewportBreak({ desktop: animGeneration.typeOfY('y', item, ORIGIN), mobile: 20 }),
                                yPercent: viewportBreak({ desktop: animGeneration.typeOfY('yPercent', item, ORIGIN), mobile: 20 }),
                                ease: "none",
                            },
                            {
                                y: negative(viewportBreak({ desktop: animGeneration.typeOfY('y', item, ORIGIN), mobile: 20 })),
                                yPercent: negative(viewportBreak({ desktop: animGeneration.typeOfY('yPercent', item, ORIGIN), mobile: 20 })),
                                // y: 0, yPercent: 0,
                                ease: "none",
                            }
                        );
                    })
                })
            }
        }
        scrubParallax.self();
    }
    getAllScrollTrigger("refresh");
    setTimeout(() => {
        if ($(window).width() > 767) {
            animFadeUp();
        }
        animFadeLeft();
        animFadeRight();
        animFadeUpSplitText();
        animScaleX();
        animScaleInset();
        animImgParallax();
        animScrubParallax();
    }, 200);
}

export default initAnimation;