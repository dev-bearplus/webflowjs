import { splitTextFadeUpSetup } from "../../utils/animation";
import { viewportBreak } from "../../utils/viewport";
const services = {
	namespace: "services",
	afterEnter() {
		console.log(`enter ${this.namespace}`);

		const scHero = {
			scrollEffect: () => {
				const DOM = {
					stage: $('.sc-ser-hero'),
					title: $('.ser-hero-title'),
					heading: $('.marquee-title-item'),
					parallaxWrap: $('.ser-hero-title-wrap')
				}

				const optAniText = {
					stagger: 0.02,
					staggerContent: 0.008,
					duration: 0.7,
					durationContent: 0.4,
					yPercent: 100
				}

				if (DOM.stage.length) {
					let tlServiceHero = gsap.timeline({ delay: 0.8 });
					const serviceHeroTitle = splitTextFadeUpSetup(DOM.title);
					tlServiceHero.from(serviceHeroTitle.words, {
						yPercent: optAniText.yPercent, autoAlpha: 0, duration: optAniText.duration, stagger: optAniText.stagger,
					}).to(DOM.heading,
						{ duration: 6, xPercent: -70 }, '=-1')

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
			}
		}

		const scHow = {
			scrollEffect: () => {
				const DOM = {
					stage: $('.sc-ser-how'),
					bearConcept: $('.ser-how-img-inner')
				}

				const tlScrollHow = gsap.timeline({
					scrollTrigger: {
						trigger: DOM.stage,
						start: 'top bottom',
						end: 'bottom top',
						scrub: true,
					}
				});

				requestAnimationFrame(() => {
					tlScrollHow.fromTo(DOM.bearConcept,
						{ y: '-14rem' },
						{ y: '10rem', ease: 'none' })
				})
			}
		}
		viewportBreak({
			desktop: () => {
				scHero.scrollEffect();
				scHow.scrollEffect();
			}
		})
	},
	beforeLeave()  {
		console.log(`leave ${this.namespace}`);
	}
};
export default services;

