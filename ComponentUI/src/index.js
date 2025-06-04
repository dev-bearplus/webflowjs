import { home, about, contact } from "./pages/index";

const script = () => {
	barba.use(barbaPrefetch);

	const select = (e) => document.querySelector(e);
	const selectAll = (e) => document.querySelectorAll(e);

	const SCRIPT = {};

	SCRIPT.homeScript = {
		namespace: "home",
		afterEnter() {
			home();
		},
	};
	SCRIPT.aboutScript = {
		namespace: "about",
		afterEnter() {
			about();
		},
	};
	SCRIPT.contactScript = {
		namespace: "contact",
		afterEnter() {
			contact();
		},
	};
	const VIEWS = [SCRIPT.homeScript, SCRIPT.aboutScript, SCRIPT.contactScript];

	const updateCurrentClass = () => {
		$(".w--current").removeClass("w--current");
		$(".hover-line").removeClass("hover-line");
		$(".header-link").each(function (index) {
			if ($(this).attr("href") === window.location.pathname) {
				$(this).addClass("hover-line");
				$(this).addClass("w--current");
			}
		});
	};

	const introInit = () => {
		let itemLoading = 6;

		let itemLoadingArr = $(".loading-item").eq(0).clone();

		$(".loading").html("");
		for (let i = 0; i < itemLoading; i++) {
			let html = itemLoadingArr.clone();
			html.css("width", `${100 / itemLoading}%`);
			$(".loading").append(html);
		}
	};

	const enterTransition = () => {
		return gsap.to(".loading-item", {
			yPercent: -100,
			stagger: 0.2,
			duration: 0.8,
			ease: "easeInOut",
			onComplete: () => {
				pointerEvents: "auto";
			},
		});
	};

	const leaveTransition = (data) => {
		const tl = gsap.timeline({});

		tl.set(".loading-item", {
			yPercent: -100,
			autoAlpha: 1,
			pointerEvents: "none",
		}).to(".loading-item", {
			yPercent: 0,
			stagger: 0.2,
			duration: 0.8,
			ease: "easeInOut",
			onComplete: () => {
				$(window).scrollTop(0);
				data.current.container.remove();
			},
		});
		return tl;
	};

	barba.init({
		transitions: [
			{
				name: "opacity-transition",
				preventRunning: true,
				once(data) {
					introInit();
				},
				async leave(data) {
					await leaveTransition(data);
				},
				async enter(data) {
					updateCurrentClass();
					await enterTransition(data);
				},
			},
		],
		views: VIEWS,
	});
};

window.onload = () => {
	script();
	console.log("run");
};
