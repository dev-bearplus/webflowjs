import globalLoading from './common/global-loading';
import { initLenis } from './libs/lenis';
import initBarba from './libs/barba';
import { initMagicMouse } from './common/magic-mouse';
import { viewportBreak } from './utils/viewport';

const main = () => {
	initLenis();
	globalLoading(initBarba);
	initMagicMouse();
};

window.onload = () => {
	if (window.isRunScript) return;
	window.isRunScript = true
	main();
};

