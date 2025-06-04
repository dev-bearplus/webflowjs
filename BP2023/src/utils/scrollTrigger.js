const getAllScrollTrigger = (fn) => {
    let triggers = ScrollTrigger.getAll();
    triggers.forEach(trigger => {
        trigger[fn]();
    });
}

const lazyImageScrollHandle = (action) => {
    const images = document.querySelectorAll("img[loading='lazy']");
    function refreshScrollTrigger (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                ScrollTrigger.refresh();
                observer.unobserve(image);
            }
        });
    }
    const options = {
        rootMargin: "0% 0% -100% 0%",
        threshold: 0
    };

    const imageLazyObserver = new IntersectionObserver(refreshScrollTrigger, { threshold: 0 });
    if (action == "init") {
        images.forEach(image => {
            imageLazyObserver.observe(image);
        });
    }
    else if (action == "disconnect") {
        console.log("disconnect observer image")
        imageLazyObserver.disconnect();
    }
}

export {
    getAllScrollTrigger,
    lazyImageScrollHandle
};