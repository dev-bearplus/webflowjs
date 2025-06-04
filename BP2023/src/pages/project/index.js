import { showViewCursor } from "../../common/magic-mouse";
import { splitTextFadeUpSetup, waveAnimSetup } from "../../utils/animation";
import { useRem, viewportBreak } from "../../utils/viewport";
import { childrenSelect } from "../../utils";
import { lenis } from '../../libs/lenis';
import marquee from "../../libs/marquee";
import swiper from '../../libs/swiper'

const project = {
	namespace: "project",
	afterEnter(data) {
		console.log(`enter ${this.namespace}`);

		let bpopIntroAnim;

		function reOrderGallery() {
			if ($(window).width() > 768) {
				let allGalImgs = $('.proj-gal-item');
				allGalImgs.each((index, el) => {
					let spanAmount = $(el).find('.img-basic').attr('alt')
					$(el).css({
						'grid-column-start': `span ${spanAmount}`,
						'grid-column-end': `span ${spanAmount}`
					})
				})
			}
		}
		// reOrderGallery()

		const playAllVideo = (video) => {
			$(video).each(function(){
				$(this).get(0).play();
			});
		}
		playAllVideo('.proj-vid-embed');

		gsap.set('.sc-proj-next', { autoAlpha: 0 });
		gsap.to('.sc-proj-next', { autoAlpha: 1, delay: 1.5 });

		const initHero = () => {
			const DOM = {
				stage: $('.sc-proj-hero'),
				title: $('.proj-hero-title'),
				sub: $('.proj-hero-sub'),
				image: $('.proj-hero-img-wrap'),
				imageInner: $('.proj-hero-img'),
				backgroundOverlay: $('.sc-proj-main-bg'),
			}

			const optAniText = {
				stagger: 0.02,
				staggerContent: 0.008,
				duration: 0.7,
				durationContent: 0.4,
				yPercent: 100
			}

			if ((DOM.stage.length)) {
				let tlProjectHero = gsap.timeline({
					delay: 0.8,
					onStart: () => lenis.stop(),
					onComplete: () => lenis.start()
				});

				const projectHeroTitle = splitTextFadeUpSetup(DOM.title);
				const projectHeroSub = splitTextFadeUpSetup(DOM.sub);
				gsap.set(DOM.image, { clipPath: 'inset(20%)' });
				gsap.set(DOM.imageInner, { scale: 1.4, autoAlpha: 0 });
				gsap.set(DOM.backgroundOverlay, {
					y: viewportBreak({
						desktop: Math.abs(parseInt($(DOM.image).css('margin-bottom'))),
						mobile: $(window).height() / 2
					}),
					autoAlpha: 0
				});

				tlProjectHero
					.from(projectHeroTitle.words, {
						yPercent: optAniText.yPercent, autoAlpha: 0, duration: optAniText.duration, stagger: optAniText.stagger,
					})
					.from(projectHeroSub.words, {
						yPercent: optAniText.yPercent, autoAlpha: 0, duration: optAniText.duration, stagger: optAniText.stagger,
					}, '-=.6')
					.to(DOM.image, {
						clipPath: 'inset(0%)', duration: 1.5, ease: 'expo.out', clearProps: 'all'
					}, '-=0.8')
					.to(DOM.imageInner, {
						scale: 1, duration: 1.5, autoAlpha: 1, ease: 'expo.out', clearProps: 'all'
					}, '<=0')
					.to(DOM.backgroundOverlay, {
						y: 0, duration: 1.5, ease: 'power2.inOut', autoAlpha: 1, clearProps: 'all'
					}, '-=1.2')
			}
		}

		// from Proj - to Proj
		if (data.current.namespace !== data.next.namespace) {
			initHero();
		}
		const nextProjImgParallax = () => {
			let nextProjImgTl = gsap.timeline({
				scrollTrigger: {
					trigger: '.sc-proj-main',
					start: `bottom top+=20%`,
					end: 'bottom top',
					scrub: true,
					onEnter: () => {
						console.log('enter')
						$('.nav-trigger-wrap').addClass('force-hide')
					},
					onLeaveBack: () => {
						console.log('leave back')
						$('.nav-trigger-wrap').removeClass('force-hide')
					}

				}
			})
			nextProjImgTl.from('.sc-proj-next .proj-next-img-wrap', {'margin-top': '0rem', ease: 'none'})

			$('[loading="lazy"]').on('load', (e) => {
				nextProjImgTl.scrollTrigger.refresh()
			})
		}
		setTimeout(() => {
			nextProjImgParallax()
		}, 0);

		const projsScript = []
		projsScript.smarttv = () => {
			const waveCircle = () => {
				waveAnimSetup({
					waveItem: '.smarttv-cir-other',
					waveWrap: '.smarttv-cir-other-wrap',
					waveCount: 6,
					waveDelay: 15
				})
			}
			waveCircle();

			const screenMarquee = () => {
				let originPadding = parseFloat($('.smarttv-marquee').css('padding-bottom'));
				$('.smarttv-marquee').css('padding-bottom', `${originPadding + $(window).height() * 0.75}px`)
				let smartTvMarqueeTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.smarttv-marquee-stick',
                        start: 'top bottom',
                        end: `bottom+=${ originPadding / 2 + $(window).height() * 0.75} top`,
						scrub: true
                    }
                })
				let distanceLeft = $('.smarttv-marquee-list.from-left .smarttv-marquee-inner').width() - $(window).width();
                let distanceRight = $('.smarttv-marquee-list.from-right .smarttv-marquee-inner').width() - $(window).width();
                smartTvMarqueeTl
                .to('.smarttv-marquee-stick', {y: originPadding / 2 + $(window).height() * 0.75, duration: 10, ease: 'none'}, '0')
                .fromTo('.smarttv-marquee-list.from-left .smarttv-marquee-inner', { x: 0 }, { x: -distanceLeft, duration: 10, ease: 'none' }, '0')
				.fromTo('.smarttv-marquee-list.from-right .smarttv-marquee-inner', { x: 0 }, { x: distanceRight, duration: 10, ease: 'none' }, '0')
			}
			screenMarquee();

			const scaleInsetTV = () => {
				const DOM = {
					stage: $('.stv-img-outside'),
					imageInner: $('.stv-img-outside img')
				}
				gsap.set(DOM.imageInner, { scale: 1.675, yPercent: -2.8 });
				let tlScale = gsap.timeline({
					scrollTrigger: {
						trigger: DOM.stage,
						start: 'top top'
					}
				})
				tlScale
					.to(DOM.imageInner, { scale: 1, yPercent: 0, transformOrigin: "50% 48%", duration: 2, ease: 'expo.out' })
			}
			// scaleInsetTV();

			const tvScrollInside = () => {
				let rectTVFrame = document.querySelector('.smarttv-shop-tv-frame').getBoundingClientRect();
				let rectPage = document.querySelector('.smarttv-tv-border .proj-main-img').getBoundingClientRect();
				let distScroll = rectPage.height - rectTVFrame.height;
				console.log("distScroll: " + distScroll)
				// let offsetTop = (($(window).height() - rectTVFrame.height) / 2) - (rectTVFrame.height * 8.5 / 100);
				// $('.smarttv-shop-stick').css('height', distScroll);
				const tlInside = gsap.timeline({
					scrollTrigger: {
						trigger: '.smarttv-shop-wrap',
						start: 'top-=5% top',
						end: 'bottom+=10% bottom',
						scrub: 1.4,
						scrub: true,
						onEnter: () => {
							rectTVFrame = document.querySelector('.smarttv-shop-tv-frame').getBoundingClientRect();
							rectPage = document.querySelector('.smarttv-tv-border .proj-main-img').getBoundingClientRect();
							distScroll = rectPage.height - rectTVFrame.height;
							console.log("distScroll: " + distScroll)
							animTv()
						}
					}
				})
				const animTv = () => {
					tlInside
					// .to('.smarttv-shop-stick-tv',  { y: -offsetTop, ease: 'none' })
					.fromTo('.smarttv-tv-border .proj-main-img', { y: 0, ease: "none" }, { y: -distScroll, ease: "none" }, 0)
				}
				
			}
			viewportBreak({
				desktop: () => {
					tvScrollInside();
				}
			})
		}
		projsScript.zen = () => {
			viewportBreak({
				mobile: () => {
					$('.zen-mb-gallery').removeAttr('data-anim');
				}
			})
			const marqueeShowcase = () => {
				const parent = childrenSelect('.proj-marquee');
				marquee(parent, {
					interleaved: true,
					hoverStop: true
				})
			}
			marqueeShowcase();
		}
		projsScript.yikez = () => {
			const marqueeShowcase = () => {
				const parent = childrenSelect('.proj-marquee');
				marquee(parent, {
					duration: 20,
					hoverStop: true
				})
			}

			const mockupChangeTheme = () => {
				const setupSwiperMarquee = () => {
					const parent = childrenSelect('.yikez-change-theme');

					swiper.initClassName(parent);
					swiper.setup(parent, {
						onView: 1.5,
						centeredSlides: true,
						autoplay: {
							delay: 1,
							disableOnInteraction: false
						},
						loop: true,
						loopedSlides: 2,
						speed: 6000,
						breakpoints: {
							768: {
								slidesPerView: 3,
								loopedSlides: 3,
							}
						}
					})
				}
				const setupSwiperBg = () => {
					const parent = childrenSelect('.yikez-mockup-theme-wrapper');

					swiper.initClassName(parent);
					swiper.setup(parent, {
						onView: 1,
						autoplay: {
							delay: 201,
							disableOnInteraction: false
						},
						effect: "fade",
						fadeEffect: {
							crossFade: true,
						},
						loop: true,
						speed: 6000,
					})
				}

				setupSwiperMarquee();
				setupSwiperBg();
			}

			// marqueeShowcase();
			mockupChangeTheme();
		}
		projsScript.bearpop = () => {
			const marqueeShowcase = () => {
				const parent = childrenSelect('.proj-marquee');
				marquee(parent, {
					duration: 20,
					interleaved: true,
				})
			}

			const fadeUpMarqueeHero = () => {
				const parent = childrenSelect('.bpop-hero-marquee');
                gsap.set(parent('.proj-marquee-item'), { autoAlpha: 0, yPercent: 40, xPercent: 30, rotate: -2 });
                gsap.set('.bpop-marquee-bg', { yPercent: 100 });

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: '.bpop-hero-marquee',
						start: 'top top+=65%',
					}
				})

				tl
					.to(parent('.proj-marquee-item'), { autoAlpha: 1, yPercent: 0, xPercent: 0, rotate: 0, duration: 1.2, stagger: .05, ease: 'power2.inOut' })
					.to('.bpop-marquee-bg', { yPercent: 0, duration: 2.1, ease: 'power2.inOut' }, '>-1.8')
			}

			const animShowcase = () => {
				const homeIntro = () => {
					let DOM = {
						line: $('.bpop-home-intro-line-inside'),
						image: $('.bpop-home-intro-img-wrap .proj-main-img'),
						sub: $('.bpop-home-intro-sub'),
						arrow: $('.bpop-home-intro-arrow')
					}

					const tl = gsap.timeline({
						repeat: -1,
					});
					gsap.set(DOM.line, { scaleX: 0, transformOrigin: "left" })
					gsap.set(DOM.image, { autoAlpha: 0, scale: 1.1 })
					gsap.set(DOM.sub, { autoAlpha: 0 })
					gsap.set(DOM.arrow, { autoAlpha: 0, xPercent: -40 })

					$('.bpop-home-intro-line-inside').each((i, item) => {
						tl
							.to(item, { scaleX: 1, ease: 'power2.inOut', duration: 0.4 })
							.to(DOM.arrow.eq(i), { autoAlpha: 1, xPercent: 0, ease: 'power2.inOut', duration: 0.4 }, ">-0.2")
							.to(DOM.image.eq(i), { autoAlpha: 1, scale: 1, ease: 'linear', duration: 0.4 }, ">-0.2")
							.to(DOM.sub.eq(i), { autoAlpha: 1, ease: 'linear', duration: 0.4 }, ">-0.2")

							.to(item, { scaleX: 0, ease: 'power2.inOut', duration: 0.3, delay: 1.8 })
							.to(DOM.arrow.eq(i), { autoAlpha: 0, xPercent: -40, ease: 'power2.inOut', duration: 0.3 }, ">-0.2")
							.to(DOM.image.eq(i), { autoAlpha: 0, scale: 1.1, ease: 'linear', duration: 0.4 }, ">-0.2")
							.to(DOM.sub.eq(i), { autoAlpha: 0, ease: 'linear', duration: 0.3 }, ">-0.2")
					});
				}
				homeIntro();

				const featureBuilder = () => {
					const tl = gsap.timeline({
						repeat: -1,
					});
					$('.fea-builder-item').each((i, item) => {
						tl
							.to(item, { onComplete: () => $(item).addClass('active')})
							.to(item, { delay: 1.8, onComplete: () => $(item).removeClass('active')})
					})
				}
				featureBuilder();

				const templateScroll = () => {
					let vid = document.getElementById("bearpop-scroll-vid");
					vid.playbackRate = 0.5;
				}
				templateScroll();
			}
			animShowcase();
			// fadeUpMarqueeHero();
			marqueeShowcase();
		}
		projsScript.vaultbox = () => {
			const scrollStickMarquee = () => {
				let offsetTop = ($(window).height() - $('.vb-marquee-list').height())/2
				let offsetMove = ($('.vb-marquee-list').outerWidth() - $('.vb-marquee-wrap').width())
				gsap.set('.vb-sticky', {top: offsetTop})
				const fractal = 2
				gsap.set('.vb-sticky-wrap', {height: 2 * offsetMove - $('.vb-marquee-list').height()})
				gsap.to('.vb-marquee-list', {
					scrollTrigger: {
						trigger: '.vb-sticky-wrap',
						start: 'top top',
						end: 'bottom top+=65%',
						scrub: .1,
						// markers: true,
					},
					x: -1 * (offsetMove),
					ease: 'sine.inOut'
				})
			}
			scrollStickMarquee()
		}

		projsScript.cargokite = () => {
			const thumbParalax1 = () => {
				const target = $('[data-cargo-thumb1]')
				let tlPara = gsap.timeline({
					scrollTrigger: {
						trigger: target.closest('.proj-parallax-img'),
						start: 'top bottom',
						end: 'bottom top',
						scrub: true,
					},
				})

				tlPara
				.fromTo(target, {
					yPercent: -22,
				}, {
					yPercent: 24, ease: 'none'
				})
			}
			if ($(window).width() > 991) {
				thumbParalax1()
			}

			const thumbParalax2 = () => {
				const target = $('[data-cargo-thumb2]')
				const parent = target.closest('.container')
				let tlPara = gsap.timeline({
					scrollTrigger: {
						trigger: parent,
						start: 'top bottom',
						end: 'bottom top',
						scrub: true,
					},
				})
				tlPara
				.to(target, {y: target.outerHeight() - parent.outerHeight(), ease: 'none'})
			}
			// thumbParalax2()

			const thumbParalax3 = () => {
				const target = $('[data-cargo-thumb3]')

				let tlPara = gsap.timeline({
					scrollTrigger: {
						trigger: target,
						start: 'top bottom',
					},
				})
				tlPara
				.from(target.get(0), {y: 200, autoAlpha: 0, duration: 1, ease: 'Power2.out'})
			}
			if ($(window).width() > 991) {
				thumbParalax3()
			}

			const thumbParalax4 = () => {
				const target = $('[data-cargo-thumb4]')

				let tlPara = gsap.timeline({
					scrollTrigger: {
						trigger: target,
						start: 'top top+=80%',
						// markers: true
					},
				})
				tlPara
				.from(target, {y: 200, autoAlpha: 0, duration: 1, ease: 'Power2.out'})
			}
			if ($(window).width() > 991) {
				thumbParalax4()
			}
		}

		let projsName = $('[data-bp-project]').attr('data-bp-project')
		console.log(projsName)
		if (projsScript[projsName]) {
			projsScript[projsName]();
		}

		showViewCursor($('a.proj-next-item'))
	},
	beforeLeave(data) {
		console.log(`leave ${this.namespace}`);
		clearInterval(bpopIntroAnim);
	}
};
export default project;
