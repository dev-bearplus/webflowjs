import { updateMagicMouse } from '../common/magic-mouse';
import { toggleNavigation } from '../common/navigation';

const lenis = new Lenis();
const initLenis = () => {
    $("html").css("scroll-behavior", "auto");
	$("html").css("height", "auto");
	function easing(x) {
		return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
	}
	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
    requestAnimationFrame(raf);

    lenis.on("scroll", ({ scroll, limit, velocity, direction, progress }) => {
        toggleNavigation(scroll);
		updateMagicMouse(scroll)
    });

    return lenis;
}
export {
	lenis,
	initLenis
};