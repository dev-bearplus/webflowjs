import { initWorkHeroMouse, showViewCursor } from "../../common/magic-mouse";
import { splitTextFadeUpSetup } from "../../utils/animation";
import { viewportBreak } from "../../utils/viewport";

const work = {
	namespace: "work",
	afterEnter() {
		console.log(`enter ${this.namespace}`);
		const optAniText = {
			stagger: 0.02,
			staggerContent: 0.008,
			duration: 0.7,
			durationContent: 0.4,
			yPercent: 100
		}

		const scHero = {
			scrollEffect: () => {
				const DOM = {
					stage: $('.sc-work-hero'),
					title: $('.work-hero-title-wrap .heading'),
					heading: $('.marquee-title-item')
				}

				if (DOM.stage.length) {
					const tlWorkHero = gsap.timeline({ delay: 0.8 });
					const workHeroTitle = splitTextFadeUpSetup('.work-hero-title-wrap .heading');
					tlWorkHero.from(workHeroTitle.words, {
						yPercent: optAniText.yPercent, autoAlpha: 0, duration: optAniText.duration, stagger: optAniText.stagger,
					}).to(DOM.heading, { duration: 6, xPercent: -20 }, '=-1')

					const tlScrollHero = gsap.timeline({
						scrollTrigger: {
							trigger: DOM.stage,
							start: 'top top',
							end: 'bottom top',
							scrub: true,
						}
					})

					tlScrollHero
						.to(DOM.title, { yPercent: 100, ease: 'none' })
						.to(DOM.heading, { xPercent: -120, yPercent: 80, ease: 'none' }, 0)
				}
			},
			imageFollowMouse: () => initWorkHeroMouse.init()
		}

		const scMain = {
			scrollEffect: () => {
				const DOM = {
					prj: $('.work-main-item'),
					prjLabel: $('.work-main-item-label'),
					prjTitle: $('.work-main-item-title'),
					prjService: $('.work-main-ser-item'),
					prjLink: $('.txt-link-arr'),
					prjImage: $('.work-main-img-wrap'),
					prjImageInner: $('.work-main-img-inner')
				}

				gsap.set([
					DOM.prjLabel,
					DOM.prjTitle,
					DOM.prjService,
					DOM.prjLink], { autoAlpha: 0, y: 50 });

					gsap.set(DOM.prjImage, { clipPath: 'inset(20%)' });
					gsap.set(DOM.prjImageInner, { scale: 1.4, autoAlpha: 0 });

				ScrollTrigger.batch('.work-main-item', {
					start: `top top+=60%`,
					batchMax: 1,
					onEnter: batch => {
						batch.forEach((item, index) => {
							let label = item.querySelector('.work-main-item-label')
							let title = item.querySelector('.work-main-item-title')
							let service = item.querySelectorAll('.work-main-ser-item')
							let link = item.querySelector('.txt-link-arr')
							let image = item.querySelector('.work-main-img-wrap')
							let imageInner = item.querySelector('.work-main-img-inner')

							let delayItem = (index, initDelay) => index != 0 ? initDelay * (index + 1) : initDelay;

							let tlProj_item = gsap.timeline();
							tlProj_item
								.to(image, { clipPath: 'inset(0%)', duration: 1.5, ease: 'expo.out', clearProps:'all' }, 0)
								.to(imageInner, { scale: 1, duration: 1.5, autoAlpha: 1, ease: 'expo.out', clearProps:'all' }, '<=0')
								.to(label, { autoAlpha: 1, y: 0, stagger: 0.2, duration: 1, ease: 'power2.out', clearProps: 'all' }, 0)
								.to(title, { autoAlpha: 1, y: 0, stagger: 0.2, duration: 1.8, ease: 'power2.out', clearProps: 'all' }, '<= .5')
								.to(service, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 1.2, ease: 'power2.out', clearProps: 'all' }, '<= .4')
								.to(link, { autoAlpha: 1, y: 0, stagger: 0.2, duration: 1, ease: 'power2.out', clearProps: 'all' }, '-=.5')
						})
					}
				})
			}
		}
		viewportBreak({
			desktop: () => {
				showViewCursor($('.work-main-img-wrap'));
				scHero.scrollEffect();
				scHero.imageFollowMouse();
				scMain.scrollEffect();
			}
		})
	},
	beforeLeave()  {
		initWorkHeroMouse.destroy()
		console.log(`leave ${this.namespace}`);
	}
};
export default work;
