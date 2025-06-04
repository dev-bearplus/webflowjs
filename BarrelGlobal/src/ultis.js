const useRem = (maxWidth) => {
    let unit = 10;
    let widthSC = $(window).width();
    const calcVW = (unit / maxWidth) * 100;

    unit = widthSC < maxWidth ? (calcVW * widthSC) / 1000 : unit / 10;

    return (value) => value * unit;
};

const preloadImages = (selector = "img") => {
	return new Promise((resolve) => {
		imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
	});
};

export {
    useRem,
    preloadImages
};