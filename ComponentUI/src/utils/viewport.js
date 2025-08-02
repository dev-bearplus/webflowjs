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

const isInViewport = (el) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight) &&
        rect.bottom >= 0
    );
}

const documentHeightObserver = (action, data, callback) => {
    let resizeObserver;
    let debounceTimer;
    let observerEl = document.documentElement;
    let previousHeight = observerEl?.scrollHeight;

    function onRefresh() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const currentHeight = observerEl.scrollHeight;

            if (currentHeight !== previousHeight) {
                if (smoothScroll.lenis) {
                    smoothScroll.lenis.resize();
                    ScrollTrigger.getAll().forEach(trigger => {
                        if (trigger.progress === 0) {
                            trigger.refresh();
                        }
                    });
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

export { viewport, device, cvUnit, isInViewport, documentHeightObserver }