const Script = () => {
    gsap.registerPlugin(ScrollTrigger);
    //Lenis scroll
    let lenis = new Lenis({
        lerp: false,
        duration: 1.2
    });

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    function splittingText() {
        Splitting();
    };
    splittingText();

    const optAniText = {
        stagger: 0.02,
        staggerContent: 0.008,
        duration: 0.7,
        durationContent: 0.4,
        y: '40%'
    };

    const SCRIPT = {}
    SCRIPT.homeScript = () => {
        console.log('home page');

        function animateRevealHome() {
            let tlHero = gsap.timeline({
                scrollTrigger: {
                    trigger: '.schero',
                    start: 'top top',
                    end: 'bottom',
                }
            });
            tlHero.from('.schero .title-head .word', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: optAniText.stagger }, "0")
                .from('.schero .dynamic-item .word', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: optAniText.stagger }, "-=0.5")
                .from('.schero .title-tail .word', { y: optAniText.y, opacity: 0, duration: optAniText.duration, stagger: optAniText.stagger }, "-=0.6")
                .from('.scherohome .button.scherohome-btn', { y: optAniText.y, opacity: 0, duration: 0.7 }, "-=0.8")
            tlHero.play();
        }
        animateRevealHome();

        function animationRepeatTextHero() {

            let vSlide = gsap.timeline({
                repeat: -1,
            });

            let textHero = {
                slides: document.querySelectorAll('.title-dynamic-wrap .dynamic-item'),
                list: document.querySelector('.title-dynamic-wrap'),
                duration: 0.5,
            }

            textHero.slides.forEach(function (slide, i) {
                let label = "slide" + i;
                vSlide.add(label);

                vSlide.to(textHero.list, {
                    duration: textHero.duration,
                }, label);
                let items = slide;
                vSlide.from(items, {
                    duration: textHero.duration,
                    autoAlpha: 0,
                }, label);
                vSlide.to(items, {
                    duration: textHero.duration,
                    autoAlpha: 0,
                }, "+=1.2");
            });
        }
        animationRepeatTextHero();
    }

    let pageName = $('.main').attr('data-namespace');
    if (pageName) {
        SCRIPT[(`${pageName}Script`)]();
    }

};
window.onload = Script;