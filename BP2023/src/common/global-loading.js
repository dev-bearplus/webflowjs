const globalLoading = (loadBarba) => {
	let doneStateDocument = true;
	const DOM = {
		loader: $('.loader'),
		loaderInner: $('.loader-inner'),
		loaderProgress: $('.loader-progress-in'),
		loaderNumber: $('.loader-number-txt-val')
	}
	gsap.set(DOM.loader, { autoAlpha: 1 })
	gsap.set(DOM.loaderInner, { scaleY: 1, transformOrigin: 'bottom' })

	$('body').imagesLoaded()
		.progress(function (instance, image) {
			let value = Math.floor((instance.progressedCount / $('img').length) * 100);
			const convertProgress = () => {
				DOM.loaderNumber.html(value);
				DOM.loaderProgress.css("width", `${value}%`);
			}
			if (value < 75) {
				convertProgress();
			}
			if (value >= 75) {
				if (doneStateDocument) convertProgress()
				else return
			}
		})
		.always(function (instance) {
			console.log('all images loaded');
		})
		.fail(function () {
			loadBarba();
			console.log('all images loaded, at least one is broken');
		})
		.done(function (instance) {
			loadBarba();
			console.log('all images successfully loaded');
		});

	// document.onreadystatechange = function () {
	// 	// bearConcept.initSceneAndCamera();
	// 	// await bearConcept.loadWebGL();
	// 	doneStateDocument = true;
	// };
}
export default globalLoading;