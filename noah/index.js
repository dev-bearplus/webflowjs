const script = () => {
    console.log("run")
    $('.scroll__container').css('position', 'fixed');

    (function () {
        window.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "both",
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        })

        window.lenis.on('scroll', (e) => {
        })

        window.lenis.on('scroll', ScrollTrigger.update)

        gsap.ticker.add((time)=>{
          window.lenis.raf(time * 1000)
        })

        gsap.ticker.lagSmoothing(0)

        function raf(time) {
            window.lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    })()

    gsap.registerPlugin(ScrollTrigger);

    let direction='x';
    let totalSize=0;
    let offsetSlide = [];
    offsetSlide = [0];

    let sections = gsap.utils.toArray("section");
    let numSlides = sections.length;
    horizontalLayout(sections);

    function horizontalLayout(sections){
        offsetSlide=[0];
        totalSize = 0;
        console.log('Number of sections:', sections.length);

        sections.forEach(function (slide, index) {
            if (index < sections.length - 1) {
                offsetSlide[index+1]=offsetSlide[index] + slide.offsetWidth;
                totalSize = totalSize + slide.offsetWidth;
            }
        });
        document.querySelector('.false--scroll').style.height=totalSize+'px';
        window.animation=[];
        let sectionsd = gsap.utils.toArray("section");
            sectionsd.forEach(function(slide, index) {

            gsap.set(slide, {'x': offsetSlide[index], 'y':index*window.innerHeight *(-1)})
            window.animation[index]=gsap.to(slide,
                {
                    scrollTrigger: {
                        trigger: '.false--scroll',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: true,
                        //markers:true,
                        invalidateOnRefresh: true,
                        anticipatePin:1,
                        fastScrollEnd:true
                    },
                    x:(offsetSlide[index] - totalSize),
                    transformOrigin: "top",
                    ease: "none",
                    onUpdate:()=>{

                    },
                    onComplete: () => {
                        ScrollTrigger.refresh();
                    }
                }
            )
        })
    }
}

window.onload = script;