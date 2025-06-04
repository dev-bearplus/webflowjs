import swiper from "../../libs/swiper";
import { childrenSelect, wrap } from '../../utils/index';
import { splitTextFadeUpSetup } from "../../utils/animation";
import { viewportBreak, isTouchDevice } from "../../utils/viewport";
import { initHomeValueMouse } from "../../common/magic-mouse";

const about = {
	namespace: "about",
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
					stage: $('.sc-abt-hero'),
					title: $('.abt-hero-title')
				}

				if (DOM.stage.length) {
					let tlAboutHero = gsap.timeline({ delay: 0.8 });
					const aboutHeroTitle = splitTextFadeUpSetup(DOM.title);
					tlAboutHero.from(aboutHeroTitle.words, {
						yPercent: optAniText.yPercent, autoAlpha: 0, duration: optAniText.duration, stagger: optAniText.stagger,
					})
					viewportBreak({
						desktop: () => {
							const tlScrollHero = gsap.timeline({
								scrollTrigger: {
									trigger: DOM.stage,
									start: 'top top',
									end: 'bottom top',
									scrub: true,
								}
							})

							tlScrollHero
								.to(DOM.title, { yPercent: 200, ease: 'none' })
						}
					})
				}
			},
			bear3DConcept: () => {
				if ($('#abt-3d').length) {
					const canvasEl = document.getElementById('abt-3d');
					$('.abt-main-bear-wrap img').css('opacity','0')
					const app = new Application(canvasEl);

					app.load('https://prod.spline.design/UCQV9qhRqcohdjeA/scene.splinecode')
						.then(() => {
							const bear = app.findObjectByName('bp-main');
							const bearModel = app.findObjectByName('bear-stand')
							const light = app.findObjectByName('Point Light');
							const light2 = app.findObjectByName('Point Light 2');
							const tl = gsap.timeline({
								scrollTrigger: {
									trigger: '.sc-abt-hero',
									start: 'top top',
									end: 'bottom top',
									scrub: true,
								}
							})
							tl
							.to(bear.rotation, {y: Math.PI / 3, ease: 'none'}, 0)
							.to(light, {intensity: 1.5, ease: 'none'}, 0)
							.to(light2, {intensity: 1.5, ease: 'none'}, 0)
						})
				}
			},
			bear3DConceptNew: () => {
				$('.abt-main-bear-wrap img').css('opacity','0');
				let wrapperEl = $('.canvas-abt-bear');
				let canvasEl = $('#abt-3d')
				// canvasEl.css('background-color','rgba(0,125,125,.6)')
				let bearModel;

				const scene = new THREE.Scene()

				const camera = new THREE.PerspectiveCamera(18, wrapperEl.width() / wrapperEl.height(), .1, 10000)
				camera.position.set(.1,0,5.2)
				scene.add(camera);
				const light = new THREE.PointLight( 0xffffff, 8, 100 );
				light.position.set(3,2,1)
				const light2 = new THREE.PointLight( 0xffffff, 8, 100 );
				light2.position.set(-3,2,1)
				scene.add(light)
				scene.add(light2)
				let gltfLoader = new THREE.GLTFLoader();
				let bearMesh;
				let basicMaterial = new THREE.MeshStandardMaterial({
					color: 0x010101,
					flatShading: true,
					roughness: .85,
				})

				let modelUrl = 'https://cdnwf.bear.plus/bp2023/img/home_hero_2023.gltf';
				let loadModel = gltfLoader.loadAsync(modelUrl);

				loadModel.then((res) => {
					bearModel = res.scene.children[0];

					bearMesh = new THREE.Mesh(bearModel.geometry, basicMaterial)
					bearMesh.position.set(0,-1.26,0);
					bearMesh.scale.set(1,1,1)
					bearMesh.rotation.set(Math.PI/2, 0, Math.PI - Math.PI/11 )
					scene.add(bearMesh)
					bearAnim()
				})

				// renderer
				const renderer = new THREE.WebGLRenderer({
					antialias: true,
					alpha: true,
					canvas: canvasEl.get(0)
				});
				renderer.setSize(wrapperEl.width(), wrapperEl.height());
				renderer.setAnimationLoop(animate);

				// scene settings
				renderer.shadowMap.enabled = true;
				renderer.shadowMap.type = THREE.PCFShadowMap;

				window.addEventListener('resize', onWindowResize);
				function onWindowResize() {
					camera.aspect = wrapperEl.width() / wrapperEl.height();
					camera.updateProjectionMatrix();
					renderer.setSize(wrapperEl.width(), wrapperEl.height());
				}
				function animate(time) {
					renderer.render(scene, camera);
				}
				function bearAnim() {
					const tl = gsap.timeline({
						scrollTrigger: {
							trigger: '.sc-abt-hero',
							start: 'top top',
							end: 'bottom top',
							scrub: true,
						}
					})
					tl
					.to(bearMesh.rotation, {z: Math.PI - Math.PI/11 - Math.PI/2, ease: 'none'}, 0)
					.to(light, {intensity: 12, ease:'none'}, '0')
					.to(light2, {intensity: 12, ease:'none'}, '0')
				}
			}
		}
		const scQuote = {
			scrollEffect: () => {
				// const DOM = {
				// 	stage: $('.sc-abt-quote'),
				// 	targetWrap: $('.abt-quote-wrap')
				// }
				// let offsetTop = ($(window).height() - $('.ser-main-stick-inner').height()) / 2
				// const tlQuoteIn = gsap.timeline({
				// 	scrollTrigger: {
				// 		trigger: DOM.stage,
				// 		start: 'top bottom',
				// 		end: 'bottom bottom',
				// 		scrub: true,
				// 	}
				// })
				// tlQuoteIn
				// 	.fromTo(DOM.targetWrap,
				// 		{ yPercent: -150, ease: 'none' },
				// 		{ yPercent: 0, ease: 'none' })

				// const tlQuoteOut = gsap.timeline({
				// 	scrollTrigger: {
				// 		trigger: DOM.stage,
				// 		start: 'bottom bottom',
				// 		end: 'bottom+=100% bottom',
				// 		scrub: true,
				// 	}
				// })
				// tlQuoteOut
				// 	.to(DOM.targetWrap,
				// 		{ yPercent: 150, ease: 'none' }
				// )

				const DOM = {
					stage: $('.sc-abt-quote'),
					targetWrap: $('.abt-quote-wrap'),
					title: $('.abt-quote-title'),
					sub: $('.abt-quote-sub-wrap .abt-quote-sub-txt'),
					link: $('.abt-quote-sub-wrap .txt-link-arr')
				}

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: DOM.stage,
						start: 'top top',
						end: 'bottom bottom',
						scrub: true
					}
				})
				tl
					.fromTo(DOM.title,
						{ autoAlpha: 0, y: 20 },
						{ autoAlpha: 1, y: 0, duration: 2.5, stagger: 2.5, ease: 'power1.out'})
					.fromTo([DOM.sub, DOM.link],
						{ autoAlpha: 0, y: 20 },
						{ autoAlpha: 1, y: 0, duration: 1.5, stagger: 1.5, ease: 'power1.out' })
			}
		}
		const scValue = {
			init3dDesktop: () => {
				const all3dIcons = document.querySelectorAll('.abt-value-item-img-wrap');
				const allSplineSrc = [
					{
						src: 'https://prod.spline.design/lFNrUlyWFGWQL7TB/scene.splinecode',
						objName: 'rocket'
					},
					{
						src: 'https://prod.spline.design/cTYDcXDv3lghXzUW/scene.splinecode',
						objName: 'hat+wand'
					},
					{
						src: 'https://prod.spline.design/DlEHH-4NrMQxNYuK/scene.splinecode',
						objName: 'arrow'
					},
					{
						src: 'https://prod.spline.design/5c-0CbW3nGiP99NJ/scene.splinecode',
						objName: 'bomb'
					},
					{
						src: 'https://prod.spline.design/8rVAECq7WZ1VcsnV/scene.splinecode',
						objName: 'thumb-2'
					},
					{
						src: 'https://prod.spline.design/FA5gVTlci4d3ogxf/scene.splinecode',
						objName: 'metaball-2'
					},
					{
						src: 'https://prod.spline.design/C4YNskzQcvnnONHh/scene.splinecode',
						objName: 'fire'
					},
				]
				all3dIcons.forEach((el, index) => {
					const canvas = el.querySelector('.abt-value-canvas.mod-1');
					if (true) {
						el.querySelector('.img-basic').classList.add('mod-hidden')
						const app = new Application(canvas);
						app.load(allSplineSrc[index].src)
						.then(() => {
							let mainObj, subObj;
							let random = Math.random();
							let dir = random > 0.5 ? 1 : -1;
							if (index != 1) {
								mainObj = app.findObjectByName(allSplineSrc[index].objName);
							} else {
								mainObj = app.findObjectByName("tophat.001");
								subObj = app.findObjectByName("wand");
							}
							let currPos = {
								rotX: mainObj.rotation.x,
								rotY: mainObj.rotation.y
							};
							let subObjPos;
							if (index == 1) {
								subObjPos = {
									rotX: subObj.rotation.x,
									rotY: subObj.rotation.y,
								}
							}
							function customerender() {
								mainObj.rotation.x = currPos.rotX + (Math.PI / 72 * (index != 2 ? (random + 1) : 1)) * Math.sin(app.time * 0.001) * dir;
								mainObj.rotation.y = currPos.rotY + (Math.PI / 24 * (index != 2 ? (random + 1) : 1)) * Math.cos(app.time * 0.001) * dir;
								if (index == 1) {
									subObj.rotation.x = subObjPos.rotX + (Math.PI / 72) * Math.sin(app.time * 0.001) * dir;
								}
							requestAnimationFrame(customerender);
							}
							requestAnimationFrame(customerender);
						})
					}

				})
			},
			init3dDesktopNew: () => {
				$('.abt-value-item-wrap img').css('visibility','hidden');
				let wrapperEl = $('.abt-value-item-wrap .abt-value-embed');
				let canvasEl = $('.abt-value-item-wrap .abt-value-canvas');
				let canvasData = [
					{
						name: 'rocket',
						url: 'https://cdnwf.bear.plus/bp2023/img/models/rocket.glb',
						pos: {x:0,y:-.1,z:0},
						rot: {x:Math.PI/2,y:Math.PI/6 - Math.PI / 2,z:Math.PI*2.3/5},
						scale: {x: .85, y: .85, z: .85}
					},
					{
						name: 'hatwand',
						url: 'https://cdnwf.bear.plus/bp2023/img/models/magic.glb',
						pos: {x:.4,y:-.35,z:0},
						rot: {x:0,y:-Math.PI/2,z:0},
						scale: {x: .8, y: .8, z: .8},
						subObj: {
							pos: {x:.45,y:-.35,z:0},
							rot: {x:0,y:-Math.PI/2,z:0},
							scale: {x: .75, y: .75, z: .75}
						}
					},
					{
						name: 'arrow',
						url: 'https://cdnwf.bear.plus/bp2023/img/models/arrow.glb',
						pos: {x:.2,y:-.1,z:0},
						rot: {x:0, y:0, z:0},
						scale: {x: -.8, y: .8, z: .8},
					},
					{
						name: 'bomb',
						url: 'https://cdnwf.bear.plus/bp2023/img/models/bomb.glb',
						pos: {x:0,y:-.1,z:0},
						rot: {x:Math.PI/2,y: -Math.PI / 2,z:Math.PI/2},
						scale: {x: 1, y: 1, z: 1}
					},
					{
						name: 'thumb',
						url: 'https://cdnwf.bear.plus/bp2023/img/models/thumb.glb',
						pos: {x:0,y:-.14,z:0},
						rot: {x:0, y:-Math.PI/18, z:Math.PI/18},
						scale: {x: 1, y: 1, z: 1}
					},
					{
						name: 'metalball',
						url: 'https://cdnwf.bear.plus/bp2023/img/models/bond.glb',
						pos: {x:0,y:0,z:0},
						rot: {x:0, y:Math.PI/36 - Math.PI / 2, z:0},
						scale: {x: 1, y: 1, z: 1}
					},
					{
						name: 'fire',
						url: 'https://cdnwf.bear.plus/bp2023/img/models/fire.glb',
						pos: {x:0,y:-.05,z:0},
						rot: {x:0, y:Math.PI/36, z:0},
						scale: {x: 1, y: 1, z: 1}
					}
				]

				wrapperEl.each((index, el) => {
					const scene = new THREE.Scene();
					const camera = new THREE.PerspectiveCamera(18, $(el).width() / $(el).height(), .1, 10000)
					camera.position.set(0,0,9)
					scene.add(camera);

					const light = new THREE.PointLight( 0xffffff, 10, 100 );
					light.position.set(2,1,2)
					const light2 = new THREE.PointLight( 0xffffff, 8, 100 );
					light2.position.set(-2,1.6,1.5)
					const rim1 = new THREE.PointLight( 0xffffff, 8, 100 );
					rim1.position.set(-2,0,-2)
					const rim2 = new THREE.PointLight( 0xffffff, 4, 100 );
					rim2.position.set(2,0,-2.5)

					scene.add(light)
					scene.add(light2)
					scene.add(rim1)
					scene.add(rim2)

					let gltfLoader = new THREE.GLTFLoader();
					let dracoLoader = new THREE.DRACOLoader();
					dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.147.0/examples/js/libs/draco/');
					gltfLoader.setDRACOLoader(dracoLoader);
					let mainMesh, subMesh;
					let basicMaterial = new THREE.MeshStandardMaterial({
						color: 0x030303,
						roughness: .95,
					})
					let data = canvasData[index];
					let loadModel = gltfLoader.loadAsync(data.url);
					loadModel.then((res) => {

						res.scene.traverse((el) => {
							if (el instanceof THREE.Mesh) {
								el.material = basicMaterial
							}
						})
						mainMesh = res.scene.children[0];
						mainMesh.position.set(data.pos.x,data.pos.y,data.pos.z)
						mainMesh.rotation.set(data.rot.x,data.rot.y,data.rot.z)
						mainMesh.scale.set(data.scale.x,data.scale.y,data.scale.z)
						scene.add(mainMesh)

						if (index == 1) {
							// subMesh = res.scene.children[0];
							// subMesh.position.set(data.subObj.pos.x,data.subObj.pos.y,data.subObj.pos.z)
							// subMesh.rotation.set(data.subObj.rot.x,data.subObj.rot.y,data.subObj.rot.z)
							// subMesh.scale.set(data.subObj.scale.x,data.subObj.scale.y,data.subObj.scale.z)
							// scene.add(subMesh)
						}
					})
					const renderer = new THREE.WebGLRenderer({
						antialias: true,
						alpha: true,
						canvas: canvasEl.eq(index).get(0)
					});
					renderer.setPixelRatio(2)
					renderer.setSize($(el).width(), $(el).height())
					renderer.setAnimationLoop(animate);

					window.addEventListener('resize', onWindowResize);
					function onWindowResize() {
						camera.aspect = $(el).width() / $(el).height();
						camera.updateProjectionMatrix();
						renderer.setSize($(el).width(), $(el).height())
					}

					const dir = Math.random() > .5 ? 1 : -1;
					function animate(time) {
						if (mainMesh) {
							if
							(index == 1) {
								mainMesh.rotation.x += (Math.PI / 1440) * Math.sin(time * 0.001);
								mainMesh.rotation.y += (Math.PI / 1440) * Math.cos(time * 0.001) * dir;
								if (subMesh) {
									subMesh.rotation.z += (Math.PI / 720) * Math.cos(time * 0.001) * dir;
								}
								
							} else if (index == 2) {
								mainMesh.rotation.x += (Math.PI / 1440) * Math.sin(time * 0.001);
								mainMesh.rotation.y += (Math.PI / 2880) * Math.cos(time * 0.001) * dir;
							} else if ( index == 5 || index == 6) {
								mainMesh.rotation.x += (Math.PI / 720) * Math.sin(time * 0.001);
								mainMesh.rotation.y += (Math.PI / 1440) * Math.cos(time * 0.001) * dir;
							} else {
								mainMesh.rotation.x += (Math.PI / 1440) * Math.sin(time * 0.001);
								mainMesh.rotation.y += (Math.PI / 1440) * Math.cos(time * 0.001) * dir;
							}

						}
						renderer.render(scene, camera)
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
                    onView: 'auto',
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
					//scHero.scrollEffect();
					scQuote.scrollEffect();

					if (isTouchDevice()) return;
					scHero.bear3DConceptNew();
					scValue.init3dDesktopNew();
					initHomeValueMouse();
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
export default about;
