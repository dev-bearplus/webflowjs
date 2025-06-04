import { splitTextFadeUpSetup } from "../../utils/animation";
import { viewportBreak } from "../../utils/viewport";
const contact = {
	namespace: "contact",
	afterEnter() {
        console.log(`enter ${this.namespace}`);

        const optAniText = {
			stagger: 0.02,
			staggerContent: 0.008,
			duration: 0.7,
			durationContent: 0.4,
			yPercent: 100
        }

		const initHero = () => {
			const DOM = {
				stage: $('.sc-ctc-hero'),
				title: $('.ctc-hero-title'),
                addressWrap: $('.ctc-hero-add-item')
			}
            DOM.addressWrap.find('.hover-un').css('display', 'inline-block');
			if (DOM.stage.length) {
				let tlContactHero = gsap.timeline({ delay: 0.8 });
				const contactHeroTitle = splitTextFadeUpSetup(DOM.title);
                const contactAddressWrap = splitTextFadeUpSetup(DOM.addressWrap);
				tlContactHero.from(contactHeroTitle.words, {
					yPercent: optAniText.yPercent, autoAlpha: 0, duration: optAniText.duration, stagger: optAniText.stagger
                }).from(contactAddressWrap.words, {
					yPercent: optAniText.yPercent, autoAlpha: 0, duration: optAniText.duration, stagger: optAniText.stagger
                }, '-=.5')

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
							.to(DOM.addressWrap, { yPercent: 250, ease: 'none' }, 0)
                    }
                })
			}
		}
		initHero();

        const initForm = () => {
            // Setup form-bot
            // $('input[name="bot-field"]').css('display', 'none')
            $('input[name="Service"]').attr('readonly', '#').css('cursor', 'pointer')
            $('input[name="Budget"]').attr('readonly', '#').css('cursor', 'pointer')

            const DOM = {
                target: $('.input-grp'),
                dropdown: $('.select-box'),
                submitBtn: $('.ctc-form-submit-wrap')
            }
            function inputInteractionInit(formEl) {
                $(`${formEl} .input-grp .input-field`).on('focus', function(e) {
                    $(this).parents('.input-select-grp').addClass('active');
                    $(this).parent().addClass('active');
                    $(this).parents('.input-select-grp').find('.select-box-inner').addClass('active');
                })
                $(`${formEl} .input-grp .input-field`).on('blur', function(e) {
                    $(this).parent().removeClass('active');
                    $(this).removeClass('focus')
                    if ($('.select-item-wrap:hover').length != 1) {
                        $(this).parents('.input-select-grp').removeClass('active');
                        $(this).parents('.input-select-grp').find('.select-box-inner').removeClass('active');
                    }
                })
                $(`${formEl} .input-grp .input-field`).on('click', function(e) {
                    $('input[name="Service"]').attr('readonly', '')
                    $('input[name="Budget"]').attr('readonly', '')
                    if ($(this).parents('.input-select-grp').find('.select-box-inner').length) {
                        if ($(this).hasClass('focus')) {
                            $(this).removeClass('focus')
                            $(this).parent().removeClass('active');
                            if ($('.select-item-wrap:hover').length != 1) {
                                $(this).parents('.input-select-grp').removeClass('active');
                                $(this).parents('.input-select-grp').find('.select-box-inner').removeClass('active');
                            }
                        } else {
                            $(this).addClass('focus');
                            $(this).parents('.input-select-grp').addClass('active');
                            $(this).parent().addClass('active');
                            $(this).parents('.input-select-grp').find('.select-box-inner').addClass('active');
                        }
                    }
                })
                $(`${formEl} .input-grp .input-field`).on('keyup', function(e) {
                    if ($(this).val() != '') {
                        $(this).parent().addClass('filled');
                    } else {
                        $(this).parent().removeClass('filled');
                    }
                })
                $(`${formEl} .input-grp .input-field`).on('change', function(e) {
                    if ($(this).val() != '') {
                        $(this).parent().addClass('filled');
                    } else {;
                        $(this).parent().removeClass('filled');
                    }
                })

                $(`${formEl} .input-grp .txtarea`).on('change, keyup', function(e) {
                    $(this).css('height', '11rem')
                    $(this).css('height', `${$(this).prop('scrollHeight')}px`)
                    console.log($(this).prop('scrollHeight'))
                    if ($(this).prop('scrollHeight') > parseFloat($(this).css('max-height'))) {
                        console.log('hel')
                        $(this).addClass('input-scrollable').attr('data-lenis-prevent','')
                    } else {
                        $(this).removeClass('input-scrollable').removeAttr('data-lenis-prevent')
                    }
                })

                let servicesVal = [];
                $(`${formEl} .input-select-grp .select-box .select-item-wrap`).on('click', function(e) {
                    e.preventDefault()
                    let selectType = $(this).closest('.select-box').attr('data-select-type')
                    switch (selectType) {
                        case 'multi':
                            if (!$(this).hasClass('active')) {
                                $(this).addClass('active');
                                servicesVal.push($(this).find('.select-item-label').text())
                            } else {
                                $(this).removeClass('active')
                                servicesVal.splice(servicesVal.indexOf($(this).find('.select-item-label').text()), 1);
                            }
                            $(this).closest('.input-select-grp').find('.input-field').val(servicesVal.join(', '))
                            break;
                        case 'single':
                            $(this).closest('.input-select-grp').find('.input-field').val($(this).find('.select-item-label').text())
                            $(this).closest('.select-box').slideUp()
                            $(this).closest('.select-box-inner').removeClass('active')
                            break;
                        default:
                            break;
                    }
                    if ($(this).closest('.input-select-grp').find('.input-field').val() !== '') {
                        $(this).closest('.input-select-grp').find('.input-field').parent('.input-grp').addClass('filled')
                    } else {
                        $(this).closest('.input-select-grp').find('.input-field').parent('.input-grp').removeClass('filled')
                    }
                })

                // Forward users
                $('[data-from-input="user"]').on('change, keyup', function(e) {
                    $('[data-form-success="user"]').text($(this).val())
                })
            }
            inputInteractionInit('#ContactForm');

            DOM.target.on('click', function (e) {
                let dropdownCurr = $(this).siblings(DOM.dropdown);
                if ($(this).hasClass('active')) {
                    dropdownCurr.slideDown();
                    DOM.dropdown.not(dropdownCurr).slideUp();
                }
                else {
                    dropdownCurr.slideUp();
                }
            });
            $('.ctc-main-form').css('min-height', $('#ContactForm').css('height'))

            DOM.submitBtn.on('click', function(e) {
                $('#ContactForm').trigger('submit')
            })

            $(window).on('click', (e) => {
                if (!$('.input-grp:hover').length)
                    if (!$('.select-box:hover').length) {
                        DOM.dropdown.slideUp();
                    }
            })
            console.log('init form interaction')
        }
        initForm()

        const initBearFooter = () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.sc-ctc-main',
                    start: 'top bottom',
                    end: 'bottom bottom',
                    scrub: .6
                }
            })
            tl.from('.ctc-info-bear', {xPercent: -20, ease: 'none'})
        }
        initBearFooter()
        function onSuccess(data) {
            $('#ContactForm').css('display', 'none')
            $('.ctc-form-error').css('display', 'none')
            $('.ctc-form-success').css('display', 'block')
            // console.log('Success:', data)
        }
        function onError(error) {
            $('.ctc-form-error').css('display', 'block')
            // console.error('Error:', error)
        }
        function setupForm() {
            const form = document.getElementById('ContactForm');
            if (!form) return;
            
            $('#ContactForm').on('submit', function(event) {
                event.preventDefault();
                $('input[name="Service"]').removeAttr('readonly')
                $('input[name="Budget"]').removeAttr('readonly')
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }
        
                grecaptcha.ready(function() {
                    grecaptcha.execute('6LdRG_IqAAAAAN-F11k_TMxQtrBjMsVZ-Gxc6fut', { action: 'submit' }).then(function(token) {
                        document.getElementById('bpGCap').value = token;
            
                        const formData = new FormData(form);
                        fetch('https://api.bear.plus/submit', {
                            method: 'POST',
                            body: formData
                        })
                        .then(response => response.json())
                        .then(data => onSuccess(data))
                        .catch(error => onError(error));
                    });
                });
            });
        }
        setupForm();
	},
	beforeLeave()  {
		console.log(`leave ${this.namespace}`);
	}
};
export default contact;
