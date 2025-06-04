import { viewportBreak } from "../../utils/viewport";
import { MathUtils, getMouseDegrees, getRawMousePos, initHomeValueMouse } from "../../common/magic-mouse";
import { lenis } from "../../libs/lenis";

const home = {
	namespace: "home",
	afterEnter() {
		console.log(`enter ${this.namespace}`);
		let object = (app, name) => {
			return app.findObjectByName(name);
		};
		const getObjThree = (object, name) => {
			let result;
			object.traverse(child => {
					if (child.name == name) result = child;
				})

			return result;
		}
		const scHero = {
			initHomeBearHeroLoader: () => {
				let mousePos = {x: 0, y: 0};
				window.addEventListener("pointermove", e => {
					mousePos = {x: e.clientX, y: e.clientY}
				});

				let _spline, array, array_2;
				const wrapper = document.querySelector('.home-hero-canvas-wrap');

				const anim_hovering = (stuff, time, type) => {
					if (type === 1) {
						stuff.position.y += Math.sin(time / 1000) / 1200;
					} else {
						stuff.position.y -= Math.sin(time / 1000) / 1000;
					}
					stuff.rotation.x += (Math.sin(time / 1000) * Math.PI) / 2000;
					stuff.rotation.y += (Math.cos(time / 1000) * Math.PI) / 3000;
					stuff.rotation.z += (Math.sin(time / 1000) * Math.PI) / 4000;
				};
				const idleStuff = (time) => {
					array.forEach((el) => {anim_hovering(el, time, 1);});
					array_2.forEach((el) => {anim_hovering(el, time, 2);});
				};

				const idleBearAnim = (time) => {
					getObjThree(_spline,"chair").position.y -= Math.sin(time / 1000) / 2400;
					getObjThree(_spline,"root").position.y -= Math.sin(time / 1000) / 1400;
					getObjThree(_spline,"thighL").position.y -= Math.sin(time / 1000) / 1000;
					getObjThree(_spline,"thighR").position.y -= Math.sin(time / 1000) / 1000;
				};
				const moveJointHead = (mouse, joint, degreeLimit) => {
					let degrees = getMouseDegrees(mouse.x, mouse.y, degreeLimit);
					joint.rotation.z = MathUtils.lerp(
					joint.rotation.z,
					((0.0405 + MathUtils.degToRad(degrees.x)) * Math.PI) / 10,
					0.1
					);
					joint.rotation.x =
					0.14 +
					MathUtils.lerp(
						joint.rotation.x,
						((0.2 - MathUtils.degToRad(degrees.y)) * Math.PI) / 10,
						0.1
					);
				};
				const moveJointNeck = (mouse, joint, degreeLimit) => {
					let degrees = getMouseDegrees(mouse.x, mouse.y, degreeLimit);
					joint.rotation.y = MathUtils.lerp(
					joint.rotation.y,
					(MathUtils.degToRad(degrees.x) * Math.PI) / 10,
					0.1
					);
					joint.rotation.x =
					0.05 +
					MathUtils.lerp(
						joint.rotation.x,
						((0.8767 - MathUtils.degToRad(degrees.y)) * Math.PI) / 10,
						0.1
					);
				};
				const moveJointBase = (mouse, joint, degreeLimit) => {
					let degrees = getMouseDegrees(mouse.x, mouse.y, degreeLimit);
					joint.rotation.y = MathUtils.lerp(
					joint.rotation.y,
					(MathUtils.degToRad(degrees.x) * Math.PI) / 10,
					0.08
					);
					joint.rotation.x = MathUtils.lerp(
					joint.rotation.x,
					(MathUtils.degToRad(degrees.y) * Math.PI) / 10,
					0.08
					);
				};

				// camera
				const camera = new THREE.PerspectiveCamera(24, window.innerWidth / window.innerHeight, 70, 100000);
				camera.position.set(0, 0.06, 334.04);
				camera.quaternion.setFromEuler(new THREE.Euler(0, 0, 0));

				// scene
				const scene = new THREE.Scene();

				// spline scene
				const loader = new SplineLoader();
				loader.load(
				'https://draft.spline.design/LixvsovqLdIHv6qw/scene.splinecode',
				(splineScene) => {
					_spline = splineScene;
					array = [
						getObjThree(_spline,"chat"),getObjThree(_spline,"cup"),getObjThree(_spline,"mac"),getObjThree(_spline,"pen"),getObjThree(_spline,"pen"),getObjThree(_spline,"phone")
					];
					array_2 = [
						getObjThree(_spline,"book"),getObjThree(_spline,"color"),getObjThree(_spline,"musicnote_1"),getObjThree(_spline,"musicnote_2")
					];
					scene.add(_spline);
					const bearTl = gsap.timeline({
						scrollTrigger: {
							trigger: '.home-hero-canvas-outer',
							start: 'top top',
							end: 'bottom bottom',
							scrub: true,
							onLeave() {
								$('.home-hero-canvas-wrap').addClass('hidden')
							},
							onEnterBack() {
								$('.home-hero-canvas-wrap').removeClass('hidden')
							}
						},
						defaults: {
							ease: 'none'
						}
					})
					bearTl.fromTo(getObjThree(_spline,'bear-group').rotation, {y: 0}, {y: Math.PI, duration: 3})
					.to(camera.position, {z: 120, duration: 2.5}, '.5')
					.fromTo('.home-hero-grad', {yPercent: 0}, {yPercent: -100, duration: 1}, '0')
					.to('.home-hero-canvas-wrap', {autoAlpha: 0, duration: .5}, '2.5')
					.to('.home-hero-bear-stick-bg', {yPercent: -100, duration: 1}, '2')
				}
				);

				// renderer
				const renderer = new THREE.WebGLRenderer({
					antialias: true,
					alpha: true,
					canvas: document.getElementById('homeHeroBear')
				});
				renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
				renderer.setAnimationLoop(animate);

				// scene settings
				renderer.shadowMap.enabled = true;
				renderer.shadowMap.type = THREE.PCFShadowMap;

				window.addEventListener('resize', onWindowResize);
				function onWindowResize() {
				camera.aspect = wrapper.clientWidth / wrapper.clientHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
				}

				function animate(time) {
					if (_spline) {
						idleBearAnim(time)
						idleStuff(time)
						moveJointHead(mousePos, getObjThree(_spline,"head"), -60);
						moveJointNeck(mousePos, getObjThree(_spline,"neck"), 15);
						moveJointBase(mousePos, getObjThree(_spline,"bp2023-new"), 24);
						moveJointBase(mousePos, getObjThree(_spline,"stuff_controller"), -12);
					}
				renderer.render(scene, camera);
				}
			},
			initHomeMarquee: () => {
				let direction = 1;
				const roll1 = roll(".home-marquee-wrap .home-marquee-txt", { duration: 26 });

				const scroll = ScrollTrigger.create({
					trigger: $('html'),
					onUpdate(self) {
						let velo = gsap.utils.clamp(1, 2, lenis.velocity).toFixed(2)
						if (self.direction !== direction) {
							direction *= -1;
						}
						gsap.set([roll1], {timeScale: velo * direction, overwrite: true})
					}
				})

				function roll(targets, vars, reverse) {
					vars = vars || {};
					vars.ease || (vars.ease = "none");
					const tl = gsap.timeline({
						repeat: -1,
						onReverseComplete() {
							this.totalTime(this.rawTime() + this.duration()); // otherwise when the playhead gets back to the beginning, it'd stop. So push the playhead forward 10 iterations (it could be any number)
						}
					});
					const elements = gsap.utils.toArray(targets);
					const clones = elements.map(el => {
						let clone = el.cloneNode(true);
						el.parentNode.appendChild(clone);
						return clone;
					});
					const positionClones = () => {
						elements.forEach((el, i) => {
							gsap.set(clones[i], {
								position: "absolute",
								overwrite: false,
								left: el.offsetLeft + (reverse ? -el.offsetWidth : el.offsetWidth),
							})
						})
					};
					positionClones();
					elements.forEach((el, i) => {
						tl.to([el, clones[i]], {
							xPercent: reverse ? 100 : -100,
							...vars
						}, 0)
					});
					window.addEventListener("resize", () => {
						let time = tl.totalTime();
						tl.totalTime(0);
						positionClones();
						tl.totalTime(time)
					})
					return tl;
				}
			},
			initHomeContent: () => {
				const allContentWraps = $('.home-abt-content');
				let abtTitle = [];
				for (let x = 0; x < allContentWraps.length; x++) {
					abtTitle[x] = new SplitText(allContentWraps.eq(x).find('.home-abt-txt'), { type: 'chars'});
				}
				const t1 = allContentWraps[0];
				const t2 = allContentWraps[1];
				const t3 = allContentWraps[2];
				gsap.set(abtTitle[0].chars, { autoAlpha: 0, 'filter': 'blur(10px)', '-webkit-filter': 'blur(10px)' })
				gsap.set(abtTitle[1].chars, { autoAlpha: 0, 'filter': 'blur(10px)', '-webkit-filter': 'blur(10px)' })
				gsap.set(abtTitle[2].chars, { autoAlpha: 0, 'filter': 'blur(10px)', '-webkit-filter': 'blur(10px)' })
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: '.sc-home-abt',
						start: "top top",
						end: "bottom bottom",
						scrub: 1,
					},
				})

				tl.fromTo(t1, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1 })
				.to(abtTitle[0].chars, { autoAlpha: 1, 'filter': 'blur(0px)', '-webkit-filter': 'blur(0px)', stagger: 0.01 }, 0)
				.to(t1, { autoAlpha: 0 })
				.fromTo(t2, { autoAlpha: 0 }, { autoAlpha: 1 })
				.to(abtTitle[1].chars, { autoAlpha: 1, 'filter': 'blur(0px)', '-webkit-filter': 'blur(0px)', stagger: 0.01 }, '<0')
				.to(t2, { autoAlpha: 0 })
				.fromTo(t3, { autoAlpha: 0 }, { autoAlpha: 1 })
				.to(abtTitle[2].chars, { autoAlpha: 1, 'filter': 'blur(0px)', '-webkit-filter': 'blur(0px)', stagger: 0.01 }, '<0')
				.to(t3, { autoAlpha: 0, 'filter': 'blur(10px)', scale: .8 }, '>-=20%')
				// allContentWraps.each((index, el) => {
				// 	if (true) {
				// 		let abtTitle = new SplitText($(el).find('.home-abt-txt'), { type: 'chars'});
				// 		gsap.set(abtTitle.chars, {autoAlpha: 0, 'filter': 'blur(10px)', '-webkit-filter': 'blur(10px)'})
				// 		const tl = gsap.timeline({
				// 			scrollTrigger: {
				// 				trigger: el,
				// 				start: 'top top',
				// 				end: 'bottom bottom',
				// 				scrub: 1,
				// 			}
				// 		})
				// 		tl
				// 		.fromTo($(el).find('.home-abt-txt'), {autoAlpha: 0, scale: index == 0 ? 0 : 1}, {autoAlpha: 1, scale: 1, duration: 1})
				// 		.to(abtTitle.chars, {autoAlpha: 1, 'filter': 'blur(0px)', '-webkit-filter': 'blur(0px)', stagger: 0.01, }, 0).duration(2)
				// 		.to($(el).find('.home-abt-txt'), {autoAlpha: 0, duration: .8}, '2')
				// 	}
				// })
			},
			initHomeProj: () => {
				const scroll = ScrollTrigger.create({
					trigger: document.querySelector('.sc-home-proj .home-proj-title-wrap'),
					start: 'top bottom-=40%',
					end: "bottom bottom-=20%",
					onEnter: () => setState(true, true),
					onLeaveBack: () => setState(false, true),
				})
				function setState(active, flip) {
					const state = Flip.getState('.sc-home-proj .home-proj-title-wrap img');
					if (active) {
						document.querySelector('.sc-home-proj .home-proj-title-wrap').classList.add('end-state');
					} else {
						document.querySelector('.sc-home-proj .home-proj-title-wrap').classList.remove('end-state');
					}
					if (flip) {
						Flip.from(state, {
							absolute: false,
							duration: .9,
							ease: "Power3.easeInOut",
							//ease: CustomEase.create("custom", "M0,0 C0.528,0 0.569,0.319 0.616,0.552 0.69,0.92 0.876,1 1,1 "),
						})
					}
				}
			},
			initHomeImgGrid: () => {
				const gridItems = document.querySelectorAll('.home-abt-grid-item')
				gridItems.forEach(item => {
					const image = item.querySelector('.home-abt-grid-img');
					const yPercentRandomVal = gsap.utils.random(-100, 100);
					const tl = gsap.timeline({
						scrollTrigger: {
							trigger: item,
							start: "top bottom",
							end: "bottom top",
							scrub: true,
						}
					})

					tl.set(image, {
						transformOrigin: `50% 50%`
					})
					tl
						.from(image, {
							yPercent: 0,
							ease: 'none',
							autoAlpha: 0,
							scale: 0,
						})
						.to(image, {
							yPercent: yPercentRandomVal / 2,
							ease: 'none',
							//scale: 1,
							autoAlpha: 1,
							scale: 1,
						})
						.to(image, {
							yPercent: yPercentRandomVal,
							ease: 'none',
							autoAlpha: 0,
							scale: 0,
						})
				});
			},
			initHomeBearTransLoader: () => {
				// camera
				const camera = new THREE.PerspectiveCamera(18, window.innerWidth / window.innerHeight, 0.1, 50000);
				camera.position.set(0, -2, 480.04);
				camera.quaternion.setFromEuler(new THREE.Euler(0, 0, 0));

				// scene
				const scene = new THREE.Scene();
				let _spline;
				let wrapper = document.querySelector('.home-trans-3d-canvas')

				// spline scene
				const loader = new SplineLoader();
				loader.load(
				'https://prod.spline.design/b7jHB9Owi6WoYEcQ/scene.splinecode',
				(splineScene) => {
					_spline = splineScene
					scene.add(_spline);

					const tl = gsap.timeline({
						scrollTrigger: {
							trigger: '.home-trans-3d-wrap',
							start: 'top top',
							end: 'bottom bottom',
							scrub: true,
						},
						defaults: {
							ease: 'none'
						}
					})
					tl.fromTo(getObjThree(_spline,'bp-main').rotation, {y: Math.PI * .35}, {y: 0, duration: 3})
					.fromTo(getObjThree(_spline,'bp-main').scale, {x: 3, y: 3, z: 3}, {x: 1, y: 1, z: 1, duration: 3},0)
					.fromTo(getObjThree(_spline,'bp-main').position, {y: -320}, {y: -50, duration: 3}, 0)
					.fromTo('.home-trans-3d-canvas', {'filter': 'blur(0px)'}, {'filter': 'blur(8px)', duration: 2}, 1)
					.fromTo('.home-trans-bg', {autoAlpha: 0}, {autoAlpha: 1, duration: 1} , 2)
				});

				// renderer
				const renderer = new THREE.WebGLRenderer({
					antialias: true,
					alpha: true,
					canvas: document.getElementById('homeTransBear')
				});
				renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
				renderer.setAnimationLoop(animate);

				// scene settings
				renderer.shadowMap.enabled = true;
				renderer.shadowMap.type = THREE.PCFShadowMap;

				window.addEventListener('resize', onWindowResize);
				function onWindowResize() {
				camera.aspect = wrapper.clientWidth / wrapper.clientHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
				}

				function animate(time) {
				renderer.render(scene, camera);
				}
			}
		};
		const scValue = {
			init3dIcon: () => {
				const all3dIcons = document.querySelectorAll('.abt-value-item-img-wrap');
				const allSplineSrc = [
					{
						src: 'https://prod.spline.design/lFNrUlyWFGWQL7TB/scene.splinecode',
						objName: 'rocket',
						cameraPos: {x: 227.44, y: 1.98, z: -2.07},
						objectPos: {x: 0, y: 0, z: -3},
						objectScale: 70
					},
					{
						src: 'https://prod.spline.design/cTYDcXDv3lghXzUW/scene.splinecode',
						objName: 'hat+wand',
						cameraPos: {x: 227.44, y: 2.48, z: -1.62},
						objectPos: {x: 0, y: -45, z: -45},
						objectScale: 80
					},
					{
						src: 'https://prod.spline.design/DlEHH-4NrMQxNYuK/scene.splinecode',
						objName: 'arrow',
						cameraPos: {x: 227.44, y: 1.98, z: -2.07},
						objectPos: {x: -19.54, y: -0.03, z: -32.57},
						objectScale: 88
					},
					{
						src: 'https://prod.spline.design/5c-0CbW3nGiP99NJ/scene.splinecode',
						objName: 'bomb',
						cameraPos: {x: 227.44, y: 1.98, z: -2.07},
						objectPos: {x: -13.29, y: -10.12, z: -1.36},
						objectScale: 90
					},
					{
						src: 'https://prod.spline.design/8rVAECq7WZ1VcsnV/scene.splinecode',
						objName: 'thumb-2',
						cameraPos: {x: 227.44, y: 1.98, z: -2.07},
						objectPos: {x: 0.79, y: -8.17, z: -3.33},
						objectScale: 85
					},
					{
						src: 'https://prod.spline.design/FA5gVTlci4d3ogxf/scene.splinecode',
						objName: 'metaball-2',
						cameraPos: {x: 227.44, y: 1.98, z: -2.07},
						objectPos: {x: -7.21, y: -1.73, z: -4.10},
						objectScale: 90
					},
					{
						src: 'https://prod.spline.design/C4YNskzQcvnnONHh/scene.splinecode',
						objName: 'fire',
						cameraPos: {x: 227.44, y: 1.98, z: -2.07},
						objectPos: {x: 3.59, y: -5.27, z: -1.0},
						objectScale: 90
					},
				]
				all3dIcons.forEach((el, index) => {
					const wrapper = el;
					el.querySelector('.img-basic').classList.add('mod-hidden')
					const canvas = el.querySelector('.abt-value-canvas.mod-1');
					// camera
					const camera = new THREE.OrthographicCamera(el.clientWidth / - 2, el.clientWidth / 2, el.clientHeight / 2, el.clientHeight / - 2,  0, 1000);
					let cameraPos = allSplineSrc[index].cameraPos;
					camera.position.set(cameraPos.x,cameraPos.y,cameraPos.z);
					camera.rotation.set(0, Math.PI /2 , 0)

					// scene
					const scene = new THREE.Scene();

					// spline scene
					let _spline;
					let mainObj, childMain, childSub;
					const loader = new SplineLoader();
					loader.load(
						allSplineSrc[index].src, (splineScene) => {
							_spline = splineScene;
							mainObj = getObjThree(_spline, allSplineSrc[index].objName);
							if (index == 1) {
								childMain = getObjThree(_spline, "tophat.001");
								childSub = getObjThree(_spline, "wand");
							}
							let objPos = allSplineSrc[index].objectPos;
							let objScale = allSplineSrc[index].objectScale;
							mainObj.position.set(objPos.x, objPos.y, objPos.z)
							mainObj.scale.set(objScale, objScale, objScale)
							scene.add(_spline);
						}
					);

					// renderer
					const renderer = new THREE.WebGLRenderer({
						antialias: true,
						canvas: canvas,
						alpha: true
					});
					console.log('hello')
					renderer.setSize(el.clientWidth, el.clientHeight);
					renderer.setAnimationLoop(animate);

					// scene settings
					renderer.shadowMap.enabled = true;
					renderer.shadowMap.type = THREE.PCFShadowMap;

					window.addEventListener('resize', onWindowResize);
					function onWindowResize() {
						camera.left = el.clientWidth / - 2;
						camera.right = el.clientWidth / 2;
						camera.top = el.clientHeight / 2;
						camera.bottom = el.clientHeight / - 2;
						camera.updateProjectionMatrix();
						renderer.setSize(el.clientWidth, el.clientHeight);
					}

					let random = Math.random();
					let dir = random > 0.5 ? 1 : -1;
					function animate(time) {
						if (mainObj) {
							if (index == 1) {
								childMain.rotation.x += (Math.PI / 2880 * (index != 2 ? (random + 1) : 1)) * Math.sin(time * 0.001) * dir;
								childMain.rotation.y += (Math.PI / 2400 * (index != 2 ? (random + 1) : 1)) * Math.cos(time * 0.001) * dir;
								childSub.rotation.x +=(Math.PI / 2880) * Math.sin(time * 0.001) * dir;
							} else {
								mainObj.rotation.x += (Math.PI / 2880 * (index != 2 ? (random + 1) : 1)) * Math.sin(time * 0.001) * dir;
								mainObj.rotation.y += (Math.PI / 2400 * (index != 2 ? (random + 1) : 1)) * Math.cos(time * 0.001) * dir;
							}
						}
						renderer.render(scene, camera);
					}
				})
			},
			swiperSlide: () => {
				$('.abt-value-main-wrap').addClass('swiper')
				$('.abt-value-main').addClass('swiper-wrapper')
				$('.abt-value-item-wrap').addClass('swiper-slide')
				const parent = childrenSelect('.sc-abt-value');
				swiper.setup(parent, {
					observer: true,
					observeParents: true,
					touchMove: true,
					on: {
						slideChange: (slide) => {
							let index = slide.activeIndex;
							swiper.activePagination(parent, index);
						},
						beforeInit: () => swiper.initPagination(parent)
					}
				})
			}
		}
		const scTesti = {
			swiperSlide: () => {
				$('.abt-testi-cms').addClass('swiper')
				$('.abt-testi-list').addClass('swiper-wrapper')
				$('.abt-testi-item').addClass('swiper-slide')

				const parent = childrenSelect('.sc-abt-testi');
				swiper.setup(parent, {
					observer: true,
					observeParents: true,
					touchMove: true,
					on: {
						slideChange: (slide) => {
							let index = slide.activeIndex;
							swiper.activePagination(parent, index);
						},
						beforeInit: () => swiper.initPagination(parent)
					}
				})
			}
		}

		const initAllSection = () => {
			viewportBreak({
				desktop: () => {
					// scHero.initHomeBearHeroLoader();
					scHero.initHomeMarquee();
					scHero.initHomeContent();
					scHero.initHomeImgGrid();
					// scHero.initHomeBearTransLoader();
					scHero.initHomeProj();
					// scValue.init3dIcon();
					initHomeValueMouse()
				},
				mobile: () => {
					scValue.swiperSlide();
					scTesti.swiperSlide();
				}
			})
		}
		initAllSection();
	},
	beforeLeave()  {
		console.log(`leave ${this.namespace}`);
	}
};
export default home;

