const script = () => {
    function easing(x) {
		return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
	}

	const lenis = new Lenis({
		easing: easing,
    })

    function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
    requestAnimationFrame(raf);

    const initPopup = (name) => {
        let popupWrap = $(`[data-popup-${name}='wrap']`);
        const popupAction = {
            open: () => {
                popupWrap.addClass('active');
                /*lenis.stop();*/
            },
            close: () => {
                if (!popupWrap.hasClass('active')) return;
                setTimeout(() => {
                    popupWrap.removeClass('active');
                }, 100)
                /*lenis.start();*/
            }
        }
        $(`[data-popup-${name}]`).on('click', function (e) {
            if ($(this).attr(`data-popup-${name}`) === 'open') {
                e.preventDefault();
                popupAction.open();
            }
            else if ($(this).attr(`data-popup-${name}`) === 'close') {
                e.preventDefault();
                popupAction.close();
            }
            else return;
        })
        $(window).on('click', (e) => {
            if (!$(`[data-popup-${name}='wrap'] .popup--inner>div:hover`).length)
                if (!$(`[data-popup-${name}='open']:hover`).length)
                    popupAction.close();
        })
    }
    const initFormContact = (formID) => {
        $(`#${formID} .input-field-group .input-field`).on('focus', function(e) {
        $(this).closest('.input-field-group').addClass('active');
        })
        $(`#${formID} .input-field-group .input-field`).on('blur', function (e) {
        $(this).closest('.input-field-group').removeClass('active');

        if ($(this).val() != '') {
            $(this).closest('.input-field-group').addClass('filled')
        }
        else {
            $(this).closest('.input-field-group').removeClass('filled')
        }
        })
    }

    initFormContact('wf-form-Contact-form');
    initPopup('contact');
}

window.onload = script;