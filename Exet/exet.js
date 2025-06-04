const script = () => {
    console.log("run");
    
    let lenis = new Lenis({
    });
    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    lenis.on('scroll', function(inst) {
        if (inst.scroll > $('.header').height()) {
        $('.header').addClass('on-scroll')
        if (inst.direction >= 0) {
            //$('.header').addClass('on-hide')
        } else {
            //$('.header').removeClass('on-hide')
        }
        } else {
        $('.header').removeClass('on-scroll')
        //$('.header').removeClass('on-hide')
        }
    })


    const childrenSelect = (parent) => (child) => $(parent).find(child);
	const swiper = {
        setup: (parent, options = {}) => {
            return new Swiper(parent('.swiper').get(), {
                slidesPerView: options.onView || 1,
                spaceBetween: options.spacing || 0,
                allowTouchMove: options.touchMove || false,
                navigation: options.nav ? ({
                    nextEl: parent('.next').get(),
                    prevEl: parent('.prev').get(),
                    disabledClass: "disabled"
                }) : false,
                ...options,
                on: options.on
            })
        },
        changeCurrentItem: function (parent, index, callback) {
            parent(".curr-item").html(index);
            if (callback) callback();
        },
        initTotalSlide: function (parent) {
            let totalSlide = parent(".swiper-slide").length;
            parent(".total-slide").html(totalSlide);
        },
	}
    const productSlide = () => {
        const parent = childrenSelect('.home-product-main-outer');
        parent('[data-swiper]').each((_, item) => {
            if ($(item).attr('data-swiper') == 'swiper')
                $(item).addClass('swiper')
            else
                $(item).addClass(`swiper-${$(item).attr('data-swiper')}`)
        })
        swiper.setup(parent, {
            touchMove: true,
            spacing: 20,
            pagination: {
                el: parent('.pagin-dot').get(),
                type: "bullets",
            },
        })
    }
    function toggleNav() {
        $('.header-ham-wrap').on('click', function (e) {
            e.preventDefault();
            if ($('body').hasClass('open-nav')) {
                $('body').removeClass('open-nav');
                lenis.start();
            }
            else {
                $('body').addClass('open-nav');
                lenis.stop();
            }
        })
    }

    if ($(window).width() <= 991) {
        toggleNav();
    }
    if ($(window).width() <= 767) {
        productSlide();
    }

    $('[data-popup="open"]').on('click', function(e) {
        e.preventDefault();
        console.log('open')
        $('.popup-wrap').addClass('active')
        lenis.stop()
    })
    $('[data-popup="close"]').on('click', function(e) {
        e.preventDefault();
        console.log('close')
        $('.popup-wrap').removeClass('active')
        lenis.start()
    })
    function popupCheck() {
        if ($('.popup-main').height() < 400) {
        $('.popup-main').addClass('hidden')
        $('.popup-suc').addClass('active')
        } else {
        $('.popup-main').removeClass('hidden')
        $('.popup-suc').removeClass('active')
        }
        requestAnimationFrame(popupCheck)  
    }
    requestAnimationFrame(popupCheck)

    setTimeout(() => {
        $('.loader-wrap').addClass('done-loading')
        setTimeout(() => {
            AOS.init({
                duration: 800, 
            });        
        }, 400);
    }, 1000);
}

window.onload = script;