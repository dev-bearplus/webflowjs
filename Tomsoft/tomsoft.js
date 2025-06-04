const mainScript = () => {
    AOS.init({
        duration: 800,
        disable: 'mobile',
        offset: 40,
    });

    // Handle header
    function handleHeader() {
        let lastScrollY = window.scrollY;
        const $header = $('.header');
        const $subHeader = $('.subheader');
        const $tncTocHead = $('.tnc-toc-sticky');
        let currPage = $('.main-page').attr('data-namespace')
        if (currPage == 'tnc' || currPage == 'news' || currPage == 'contact') {
            $header.addClass('style2')
        }
        if (lastScrollY > 0) {
            $header.addClass('has-scrolled')
            $subHeader.addClass('has-scrolled')
            $header.removeClass('style2')
        }

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const hasScrolled = currentScrollY > 0;
            const hasScrolledDown = currentScrollY > lastScrollY;
            const hasOpenDropdown = !!$('.dropdown.navbar__link:hover').length;

            if (hasScrolled) {
                $header.addClass('has-scrolled')
                $subHeader.addClass('has-scrolled')
                $header.removeClass('style2')
                if (hasOpenDropdown) return;
                if (hasScrolledDown) {
                    $header.addClass('has-scrolled--down');
                    $subHeader.addClass('has-scrolled--down');
                    $tncTocHead.addClass('has-scrolled--down');
                } else {
                    $header.removeClass('has-scrolled--down');
                    $subHeader.removeClass('has-scrolled--down');
                    $tncTocHead.removeClass('has-scrolled--down');
                }
            } else {
                $header.removeClass('has-scrolled')
                $subHeader.removeClass('has-scrolled')
                if (currPage == 'tnc' || currPage == 'news' || currPage == 'contact') {
                    $header.addClass('style2')
                }

            }

            lastScrollY = currentScrollY;
        })

        if ($(window).width() < 991) {
            $('.dropdown-menu-wrapper').removeClass('active');
            $('.nav__toggle').on('click', function (e) {
                if ($header.hasClass('has-open')) {
                    $('.dropdown-trigger.navbar__link').removeClass('active');
                    $(this).closest('.dropdown').find('.dropdown-menu-wrapper').removeClass('active');
                    $header.removeClass('has-open');
                    $(this).removeClass('active');
                    $('.header__navbar').removeClass('active');
                    $('body').css('overflow', 'visible')
                    if (currPage == 'tnc' || currPage == 'news' || currPage == 'contact') {
                        $header.addClass('style2')
                    }
                } else {
                    $header.addClass('has-open');
                    $(this).addClass('active');
                    $('.header__navbar').addClass('active');
                    $('body').css('overflow', 'hidden');
                    $header.removeClass('style2')
                }
                e.preventDefault();

            })
            $('.dropdown-trigger').on('click', function (e) {
                const $ic = $(this).find('.dropdown-ic-wrap');
                // e.preventDefault();
                if (!$ic.closest('.dropdown').find('.dropdown-trigger').hasClass('active')) {
                    $('.dropdown-menu-wrapper').removeClass('active');
                    $('.dropdown-trigger').removeClass('active');
                    $ic.closest('.dropdown').find('.dropdown-menu-wrapper').addClass('active');
                    $ic.closest('.dropdown').find('.dropdown-trigger').addClass('active');
                } else {
                    $('.dropdown-menu-wrapper').removeClass('active');
                    $('.dropdown-trigger').removeClass('active');
                }
            })
            $('.dropdown-menu-wrapper.not-leaving .header__dropdown-link').on('click', function (e) {
                $('.dropdown-trigger.navbar__link').removeClass('active');
                $('.nav__toggle').closest('.dropdown').find('.dropdown-menu-wrapper').removeClass('active');
                $header.removeClass('has-open');
                $('.nav__toggle').removeClass('active');
                $('.header__navbar').removeClass('active');
                $('body').css('overflow', 'visible')
                if (currPage == 'tnc' || currPage == 'news' || currPage == 'contact') {
                    $header.addClass('style2')
                }
            })
        }
    }

    // Handle footer
    function handleFooter() {
        const $footerForm = $('.footer-subscirbe');
        const $footerSuccessForm = $('.footer-form-success');

        const showSuccessForm = () => {
            $footerForm.css({
                display: 'none',
            })
            $footerSuccessForm.css({
                display: 'block',
            })
        }

        const hideSuccessForm = () => {
            $footerForm.css({
                display: 'block',
            })
            $footerSuccessForm.css({
                display: 'none',
            })
        }

        $footerSuccessForm.find('.btn').on("click", hideSuccessForm);

        $footerForm.on('submit', function (e) {
            e.preventDefault();
            $(this).get(0).reset();
            showSuccessForm();
            return false;
        })
    }

    // Home
    function initTestimonial() {
        let allowTouch;
        if ($(window).width() > 991) {
            allowTouch = false;
        } else {
            allowTouch = true;
        }
        const $progress = $('.schome-testi-progress circle.circle-origin');
        const autoPlayDuration = 4000;
        const speedTime = 800;
        let isStopProgress = false;

        const progressAnimation = (duration) => {
            $progress.animate({
                strokeDashoffset: "0%",
            }, duration, "linear", () => {
                testiSwiper.slideNext();
            });
        }

        const resetProgress = () => {
            $progress.stop(true, false);
            $progress.css({
                strokeDashoffset: "-300%"
            })
        }
        $('.schome-testi-outer').hover(() => {
            isStopProgress = true;
            $progress.stop(true, false);
        }, () => {
            isStopProgress = false;
            const cur = parseInt($progress.css('stroke-dashoffset'));
            const duration = autoPlayDuration * -cur / 200;
            progressAnimation(duration);
        })
        // if ($(window).width() > 991) {
        //     $('.schome-testi-outer').hover(() => {
        //         isStopProgress = true;
        //         $progress.stop(true, false);
        //     }, () => {
        //         isStopProgress = false;
        //         const cur = parseInt($progress.css('stroke-dashoffset'));
        //         const duration = autoPlayDuration * -cur / 200;
        //         progressAnimation(duration);
        //     })
        // }

        const testiAvaSwiper = new Swiper('.schome-testi-ava-swiper', {
            loop: true,
            effect: 'fade',
            speed: speedTime,
            allowTouchMove: allowTouch,
            fadeEffect: {
                crossFade: true,
            },
        })

        const testiSwiper = new Swiper('.schome-testi-swiper', {
            loop: true,
            effect: 'fade',
            speed: speedTime,
            allowTouchMove: allowTouch,
            fadeEffect: {
                crossFade: true,
            },
            controller: {
                control: testiAvaSwiper
            },
            navigation: {
                prevEl: '.schome-testi-swiper-btn-prev',
                nextEl: '.schome-testi-swiper-btn-next',
            },
            pagination: {
                el: ".schome-testi-swiper-pagination",
                clickable: true,
            },
            on: {
                slideChange: () => {
                    resetProgress();
                    if (isStopProgress) return;
                    progressAnimation(autoPlayDuration);
                },
            }
        })
    }

    //Supplier / Customer
    function initSubMenu() {
        const subheaderAnimate = $('.subheader-animate');

        function moveLine(target) {
            let linkWidth = target.innerWidth();
            const linkOffset = target.offset().left;
            const menuOffset = $('.subheader-menu-list').offset().left;

            const leftPosition = linkOffset - menuOffset;
            subheaderAnimate.css("width", linkWidth);
            subheaderAnimate.css("left", leftPosition);
        }

        const links = [...document.querySelectorAll('.subheader-menu-link')];
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach((mutation) => {
                const target = mutation.target
                if(target.classList.contains('w--current')) {
                    moveLine($(target));
                }
            })
        })

        links.forEach((link) => {
            observer.observe(link, {
                attributes: true,
                attributeFilter: ['class'],
                childList: false,
                characterData: false
            })
        })
    }
    function initModal() {
        const $modal = $('.modal');
        const $modalLink = $('.scproduct-modal-sidebar-link');

        $modal.removeClass('active');
        $('.scproduct-modal-item').hide();

        $('.modal-ic').on("click", function () {
            $modal.removeClass('active');
            $("body").removeAttr("style");
        })

        $('[data-trigger]').on("click", function (e) {
            e.preventDefault();
            $modal.addClass('active');
            $("body").css("overflow", "hidden");

            const index = $('[data-trigger]').index(this);
            activeSidebarModal(index);
        })

        $modalLink.on("click", function (e) {
            e.preventDefault();

            const index = $(this).index();
            activeSidebarModal(index);
        });

        const activeSidebarModal = (index) => {
            $('.modal-wrapper').scrollTop(0);
            // Handle active tab link

            $modalLink.removeClass('active');
            const $activeItem = $modalLink.eq(index);
            $activeItem.addClass('active');

            //Handle active sidebar content
            $('.scproduct-modal-item').hide();
            $('.scproduct-modal-item').eq(index).fadeIn();
            $('.scproduct-modal-container').scrollTop(0)
        }
    }
    function initTestimonialSupp() {
        const testiSwiperSupp = new Swiper('.scsupp-testi-cms', {
            slidesPerView: 1,
            spaceBetween: 16,
            loop: true,
            loopAdditionalSlides: 2,
            grabCursor: true,
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                    loop: true,
                },
                991: {
                    loop: true,
                    slidesPerView: 3,
                    loopAdditionalSlides: 4,
                }
            }
        })
    }
    function initPricingSupp() {
        if ($(window).width() < 991) {
            const pricingSwiperSupp = new Swiper('.scproduct-pricing-cms', {
                slidesPerView: 1,
                spaceBetween: 16,
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 32,
                    }
                }
            })
            if ($(window).width() < 768) {
                pricingSwiperSupp.slideTo(1);
            }
        }
    }
    function initFaqAccordion() {
        $('.scproduct-faq-item-content').hide();
        $('.scproduct-faq-item-header').on("click", function () {
            const $parent = $(this).parent();
            const $content = $(this).next('.scproduct-faq-item-content');

            $parent.toggleClass('active');
            $('.scproduct-faq-item').not($parent).removeClass('active');

            $content.slideToggle();
            $('.scproduct-faq-item-content').not($content).slideUp();
        })
    }
    function initTncToc() {
        const allH2 = $('.tnc-main-content h2');
        const allTocItem = $('.tnc-toc-inner .tnc-toc-item');
        allH2.each(function (i) {
            $(this).attr('id', `toc${i}`);
            allTocItem.eq(i).attr('href', `#toc${i}`)
        })
        function activeSubheader(target) {
            $(`.tnc-toc-inner .tnc-toc-item`).removeClass('active');
            target.addClass('active');
            $('.tnc-toc-head-txt').text(target.find('.text-sm').text())
        }
        const sectionInViewObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = "#" + entry.target.id;
                    const $inViewLink = $(`.tnc-toc-inner .tnc-toc-item[href='${id}']`);
                    activeSubheader($inViewLink);

                }
            })
        }, {
            root: null,
            rootMargin: '0% 0px -50% 0px',
            threshold: 0.2,
            debug: true
        })
        const sections = [...allH2];
        sections.forEach((section) => {
            sectionInViewObserver.observe(section);
        })

        //Handle toc dropdown in mobile
        if ($(window).width() < 768) {
            $('.btn--outline.tnc-toc-head').on('click', function (e) {
                e.preventDefault();
                $(this).parent().find('.tnc-toc-inner').toggleClass('active');
            })
            $('.tnc-toc-item').on('click', function (e) {
                $('.tnc-toc-inner').removeClass('active');
            })
        }
    }

    const SCRIPT = {};
    SCRIPT.homeScript = function () {
        // Handle init testimonial
        initTestimonial();
    };
    SCRIPT.supplierScript = function () {
        // Handle onview trigger active anchor link
        initSubMenu();

        //Handle open modal for features.
        initModal();

        // Handle FAQ
        initFaqAccordion();

        // Handle init testimonial and pricing
        initTestimonialSupp();
        initPricingSupp();


    }
    SCRIPT.customerScript = function () {
        // Handle onview trigger active anchor link
        initSubMenu();

        //Handle open modal for features.
        initModal();

        // Handle FAQ
        initFaqAccordion();

        // Handle init testimonial and pricing
        initTestimonialSupp();
        initPricingSupp();

    }
    SCRIPT.aboutScript = function () {
        // Handle init testimonial
        initTestimonialSupp();
    }
    SCRIPT.newsScript = function () {

    }
    SCRIPT.newsDtlScript = function () {

    }
    SCRIPT.contactScript = function () {

        $('option[value*=sup]').show();
        $('option[value*=venue]').hide();

        $('input[name=Radio]').on('change', function (e) {
            if(e.target.value === 'venue') {
                $('option[value*=venue]').show();
                $('option[value*=sup]').hide();


            }
            if(e.target.value === 'supplier') {
                $('option[value*=sup]').show();
                $('option[value*=venue]').hide();
            }
            $('select').each(function () {
                $(this).find('option').each(function () {
                    if ($(this).css('display') != 'none') {
                        $(this).prop("selected", true);
                        return false;
                    }
                });
            })

        });


    }
    SCRIPT.tncScript = function () {
        // Init TOC
        initTncToc();
    }

    const pageName = $('.main-page').attr('data-namespace');
    handleHeader();
    handleFooter();
    if (pageName) {
        console.log(pageName + ' Script')
        SCRIPT[`${pageName}Script`]();
    }
}
mainScript();
// window.onload = mainScript;