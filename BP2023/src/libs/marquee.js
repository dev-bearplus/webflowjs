const marqueeSetup = (options) => {
    const { marqueeWrapper, marqueeList, marqueeItem, duration, interleaved, hoverStop } = options;
    const DOM = {
        marqueeList: $(marqueeWrapper).find(marqueeList),
        marqueeItem: $(marqueeWrapper).find(marqueeItem)
    }
    const index = $(marqueeWrapper).index();
    const isReverse = index % 2 != 0 || false;
    const cloneAmount = Math.ceil($(window).width() / DOM.marqueeItem.width());
    let isHover = false;

    DOM.marqueeItem.addClass('anim-marquee');
    if (duration) gsap.set(DOM.marqueeItem, { animationDuration: `${duration}s` });
    if (isReverse && interleaved) gsap.set(DOM.marqueeItem, { animationDirection: "reverse" });
    for (let i = 0; i < cloneAmount; i++) {
        DOM.marqueeList.append(DOM.marqueeItem.clone());
    };

    let newMarqueeList = $(marqueeWrapper).find(marqueeList).children();
    if (hoverStop) {
        $(marqueeWrapper).on("pointerenter", (event) => {
            isHover = true;
            gsap.set(newMarqueeList, { animationPlayState: "paused" });
        });
        $(marqueeWrapper).on("pointerleave", (event) => {
            isHover = false;
            gsap.set(newMarqueeList, { animationPlayState: "running" });
        });
    }
}

const marquee = (parent, options) => {
    const marqueeDOM = (val) => parent(`[data-marquee='${val}']`);
    console.log("run")
    const startMarquee = (el) => {
        const newMarqueeList = marqueeSetup({
            marqueeWrapper: el,
            marqueeList: marqueeDOM('list'),
            marqueeItem: marqueeDOM('item'),
            ...options
        });
    }
    const observerMarquee = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const el = entry.target;
            if (entry.isIntersecting) {
                startMarquee(el);
                observerMarquee.unobserve(el);
            }
        });
    });
    marqueeDOM('wrapper').each((_, item) => {
        observerMarquee.observe(item);
    });
}

export default marquee;