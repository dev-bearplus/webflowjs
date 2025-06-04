
const marquee = (inner, wrap, duration, start = "right") => {
    const direction = {
        right: "-=",
        left: "+=",
    };

    gsap.set(inner, {
        x: (i) => (i - 1) * inner.eq(0).width(),
    });

    let tl = gsap.timeline({});

    tl.to(wrap, {
		duration: duration,
		x: direction[start] + `${inner.eq(0).width()}`,
		ease: "none",
		repeat: -1,
	});

    return tl;
};

export { marquee };