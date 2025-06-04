import mainModules from '../pages';
import { initNavigation, resetNavigation } from '../common/navigation';
import { getAllScrollTrigger, lazyImageScrollHandle } from '../utils/scrollTrigger'
import { detectOS, delay, checkSameNamespace } from '../utils';
import initAnimation from '../common/animation';
import { splitTextFadeUpSetup } from "../utils/animation";
import { updateMagicMouse } from '../common/magic-mouse';
import { lenis } from './lenis';
import { viewportBreak } from '../utils/viewport';

barba.use(barbaPrefetch);

let flagPD = false;
const GTAG_ID = 'G-J6NRB4PVE0';

const initJSMain = () => {
	const reloadOnResize = () => {
		if ($(window).width() > 767) {
			if (localStorage.getItem('reload') == 'true') {
				window.location.reload();
				localStorage.setItem('reload', false);
			}
		} else {
			localStorage.setItem('reload', true);
		}
	}
	$(window).on('resize', function () {
		reloadOnResize();
	});
}

const scrollTop = () => {
	console.log('scrolltop')
	lenis.scrollTo("top", {
		duration: .0001, lock: true, onComplete: () => {
			getAllScrollTrigger("refresh");
			updateMagicMouse(0, true);
	} });
}

const isProjectToProject = (current, next) => checkSameNamespace("project", current, next);
const isBlogToBlog = (current, next) => checkSameNamespace("blog", current, next);

const enterTransition = (data) => {
	const DOM = {
		trans: $('.trans-wrap'),
		transMask: $('.trans-mask'),
	}
	const nextContainer = data.next.container;
	const currentContainer = data.current.container;

	const onCompleteTrans = () => {
		$('.cursor-hover').removeClass('active');
		lenis.start();
	}

	if (isProjectToProject(data.current.namespace, data.next.namespace)) {
		//Need re-calculation

		//Temporary  value
		let imgOffset = viewportBreak({ desktop: 200, mobile: $(window).height() / 2 });
		let imgDuration = imgOffset * viewportBreak({ desktop: 0.0075, mobile: 0.00226 });
		const tl = gsap.timeline({
			defaults: {
				duration: 0.65,
				ease: 'power2.inOut'
			},
			onComplete: onCompleteTrans
		});

		if (flagPD == false) {
			tl
				.to('.header', {yPercent: 0, clearProps: 'all'}, 0)
				.from(nextContainer.querySelector('.sc-proj-main-bg'), {autoAlpha: 0, y: imgOffset, duration: imgDuration, ease: 'power2.inOut'}, 0)
				//.from(nextContainer.querySelector('.proj-hero-img-wrap'), {autoAlpha: 0, y: imgOffset, duration: imgDuration, ease: 'power2.out'}, '<+=.1')
		}
		return tl;
	}

	const tl = gsap.timeline({
        defaults: {
            duration: 0.65,
            ease: 'power2.inOut'
		},
		onComplete: onCompleteTrans
    });
    setTimeout(() => {
        initJSMain();
    }, 300); // 500
    if (flagPD == false) {
        tl.to(DOM.trans, { yPercent: -100 })
            .to(DOM.transMask, { yPercent: 80 }, 0)
			.from(nextContainer, { y: 200 }, 0);
        return tl;
    }
};

const introInit = () => {
	const DOM = {
		loader: $('.loader'),
		loaderInner: $('.loader-inner'),
	}

	const tlLoaderIn = gsap.timeline({
		defaults: {
            duration: 0.6,
            ease: 'power2.inOut'
		},
		onComplete: () => scrollTop()
	})

	tlLoaderIn.to(DOM.loaderInner, {
		scaleY: 1,
        transformOrigin: 'bottom',
        ease: 'power1.inOut'
	});

	const tlLoaderOut = gsap.timeline({
        defaults: {
            duration: 1,
            ease: 'power2.inOut'
		},
		onComplete: () => {
			initAnimation();
			lazyImageScrollHandle(viewportBreak({
				desktop: 'init',
				mobile: 'disconnect'
			}));
		}
	});

	tlLoaderOut.to(DOM.loader, {
		yPercent: -100
	}, 0.2).to(DOM.loaderInner, {
		yPercent: 103
	}, 0.2);

	const tlLoader = gsap.timeline();
    tlLoader.add(tlLoaderIn).add(tlLoaderOut);
}

const leaveTransition = (data) => {
	const DOM = {
		trans: $('.trans-wrap'),
		transMask: $('.trans-mask'),
	}
	const nextContainer = data.next.container;
	const currentContainer = data.current.container;

	if (isProjectToProject(data.current.namespace, data.next.namespace)) {
		console.log('proj to proj')
		$('.nav-trigger-wrap').removeClass('show')

		let dist = currentContainer.querySelector('.proj-next-title-wrap .proj-hero-title').getBoundingClientRect().top - parseInt($(currentContainer.querySelector('.proj-hero-title-wrap')).css('margin-top'));
		let imgDist = currentContainer.querySelector('.sc-proj-next .proj-next-img-wrap').getBoundingClientRect().top - currentContainer.querySelector('.sc-proj-hero .proj-hero-img-wrap').offsetTop;
		let contentOffset = $(window).height() - currentContainer.querySelector('.sc-proj-main').getBoundingClientRect().bottom;
		console.log("imgDist 👉️", imgDist);
		const tl = gsap.timeline({
			defaults: {
				duration: 0.75,
				ease: 'power2.inOut'
			},
			onComplete: () => {
				$('.cursor-hover').removeClass('active');
			}
		});

		if (flagPD == false) {
			tl
				.to(currentContainer.querySelector('.proj-next-label'), {autoAlpha: 0, yPercent: 50})
				.to(currentContainer.querySelector('.sc-proj-main'), {autoAlpha: 0, y: -contentOffset}, 0)
				.to(currentContainer.querySelector('.proj-next-title-wrap'), {y: -dist}, 0)
				.to(currentContainer.querySelector('.sc-proj-next .proj-next-img-wrap'), {y: -imgDist, 'filter': 'grayscale(0)'}, 0)
				.to(currentContainer.querySelector('.sc-proj-next .proj-next-img-overlay'), {autoAlpha: 0}, 0)
				.set('.header', {yPercent: -100}, 0)
		}
		return tl;
	}

	const tl = gsap.timeline({
        defaults: {
            duration: 0.65,
            ease: 'power2.inOut'
		},
		onComplete: () => {
			$('.cursor-hover').removeClass('active')
		}
	});
	if (flagPD == false) {
		tl
			.set(DOM.trans, { autoAlpha: 1 })
            .fromTo(DOM.trans, { yPercent: 100 }, { yPercent: 0 })
            .fromTo(DOM.transMask, { yPercent: -80 }, { yPercent: 0 }, 0)
			.to(currentContainer, { y: -200 }, 0);
        return tl;
    }
}

const resetAfterLeave = (data) => {
	resetNavigation();
	getAllScrollTrigger("kill");
	$('.cursor-hover').removeClass('active')
}

const reinitializeWebflow = (data) => {
	console.log('reinitialize webflow');

	window.Webflow && window.Webflow.destroy();
	window.Webflow && window.Webflow.ready();
}

const updateCurrentNav = (data) => {
	let nextPage = data.next.namespace == 'project' ? 'work' : data.next.namespace;
	$('.header-link').removeClass('active');
	$(".nav-mid-link").removeClass('active');

	$(".header-link.w--current").removeClass("active w--current");
	$(`.header-link[data-link="${nextPage}"`).addClass('active');
	$(`.nav-mid-link[data-link="${nextPage}"`).addClass('active');
};

const updateHeaderMode = () => {
	let mode = $('[data-header]').attr('data-header');
	return mode == 'dark' ? $('header').addClass('on-invert') : $('header').removeClass('on-invert')
}

const updateVideoSrc = (isSafari) => {
	if (!isSafari) {
        $('video[data-os-depend] [data-ext="mov"]').remove()
        $('video[data-os-depend]').each(function(index) {
            $(this).get(0).load()
        })
    }
}

//Gtag
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments);}
const updateGtag = {
	once: () => {
		gtag('js', new Date());
		gtag('config', GTAG_ID);
		console.log('hello')
	},
	reinit: () => {
		gtag('config', GTAG_ID, {
			send_page_view: false,
		});
		window.dataLayer.push({
			'event': 'page_view',
			'page_title': (document.title) ? document.title : '',
			'page_URL': (window.location.href) ?  window.location.href : '',
			'page_path': (window.location.pathname) ? window.location.pathname : '',
			'page_hash': (window.location.hash) ? window.location.hash : ''
		});
		console.log(window.dataLayer);
	}
}

const updateDynamicText = () => {
	$('[data-year="current"]').text(new Date().getFullYear())
}

const initOnce = (data) => {
	updateGtag.once();
	introInit();
	initNavigation(lenis);
	updateCurrentNav(data);
	updateHeaderMode();
	updateVideoSrc(detectOS());
	updateDynamicText();
}

const initBarba = () => {
	barba.init({
		sync: true,
		views: mainModules,
		preventRunning: true,
		transitions: [{
			once(data) {
				initOnce(data);
			},
			async beforeEnter(data) {
				updateVideoSrc(detectOS())
				updateDynamicText();
			},
			async enter(data) {
				enterTransition(data);
			},
			async afterEnter(data) {
				initAnimation();
				lazyImageScrollHandle(viewportBreak({
					desktop: 'init',
					mobile: 'disconnect'
				}));
			},
			async beforeLeave(data) {
			},
			async leave(data) {
				const done = this.async();
				await delay(350);
				let leaveTl = leaveTransition(data);
				let time = leaveTl.totalDuration() * 1000;
				console.log(time)
				await delay(time);
				scrollTop();
				$('.nav-trigger-wrap').removeClass('force-hide')
				getAllScrollTrigger("kill");
				lazyImageScrollHandle('disconnect');
				data.current.container.remove();
				done();
			},
			async afterLeave(data) {
				resetAfterLeave();
			},
			async after(data) {
				updateCurrentNav(data);
				updateHeaderMode();
				updateGtag.reinit();
				reinitializeWebflow(data);
			},
		}],
	});
};

export default initBarba;