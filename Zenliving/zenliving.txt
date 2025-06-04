console.log('dev mode');


function globalScript() {
    const handleScroll = () => {
        let lastScroll = 0;
        const eleSticky = $('[data-sticky="null"]');
        const currentStickyTop = parseInt(eleSticky.css('top'))
        const eleStickyBtn = $('[data-sticky="btn"]');
        const currentStickyBtnTop = parseInt(eleStickyBtn.css('top'))
        const eleStickySide = $('[data-sticky="side"]');
        const eleStickySideTop = parseInt(eleStickySide.css('top'))

        return () => {
            const isHoverDropdown = !!$('.header-navlink.dropdown:hover').length;
            const currentScroll = window.scrollY;
            const headerHeight = $('header.header').height();
            if (currentScroll <= headerHeight) {
                $('header.header').addClass('show');
            }
            else {
                if (currentScroll < lastScroll) {
                    eleSticky.css({
                        top: currentStickyTop + headerHeight
                    })
                    $('.primary-btn.career-apply-btn').css('top', '14.25rem')
                    if (eleStickyBtn.find('.career-item-ic').hasClass('active')) {
                        console.log('active')
                        eleStickyBtn.css({
                            top: currentStickyBtnTop + headerHeight
                        })
                    }
                    if (eleStickySide != null) {
                        eleStickySide.css({
                            top: eleStickySideTop + headerHeight
                        })
                    }
                    $("header.header").addClass("show");
                } else if (currentScroll > lastScroll && !isHoverDropdown) {
                    eleSticky.css({
                        top: currentStickyTop
                    })
                    $('.primary-btn.career-apply-btn').css('top', '8rem')
                    if (eleStickyBtn.find('.career-item-ic').hasClass('active')) {
                        eleStickyBtn.css({
                            top: currentStickyBtnTop
                        })
                    }
                    if (eleStickySide != null) {
                        eleStickySide.css({
                            top: eleStickySideTop
                        })
                    }
                    $("header.header").removeClass("show");
                }
            }
            lastScroll = currentScroll;
        }
    }

    const backToTop = () => {
        $('.back-to-top').on('click', (e) => {
            e.preventDefault();
            window.scrollTo(0, 0);
        })
    }

    const handleModal = () => {
        $('.modal-close').on("click", () => {
            $('.modal').removeClass("show");
            unlockBodyScroll();
            $('.modal').trigger('closeModal');
        });
    }

    const handleHeader = () => {
        const kitchenSlug = $("[link-kitchen]").attr('link-kitchen');
        const homeSlug = $("[link-home]").attr('link-home');
        console.log(kitchenSlug)
        const buildHref = (slug) => `${window.location.origin}/${slug}`;

        $("[link-kitchen]").attr('href', buildHref(kitchenSlug))
        $("[link-home]").attr('href', buildHref(homeSlug))


        if ($(window).width() < 991) {
            $('#header-trigger').on('click', (e) => {
                if ($(e.target).hasClass('active')) {
                    $(e.target).removeClass('active')
                    $('.nav').removeClass('active')
                    unlockBodyScroll()
                } else {
                    $(e.target).addClass('active')
                    $('.nav').addClass('active')
                    lockBodyScroll()
                }

            })
            $('.nav .nav-link').on('click', (e) => {
                if (!$(e.target).hasClass('not-accor')) {
                    e.preventDefault();
                    if ($(e.target).hasClass('active')) {
                        let content = $(e.target).next('.subnav-link-wrap');
                        $(e.target).removeClass('active');
                        $(e.target).parent('.nav-link-item').removeClass('active');
                        content.slideUp();
                    } else {
                        let content = $(e.target).next('.subnav-link-wrap');
                        $('.subnav-link-wrap').slideUp();
                        $('.nav .nav-link').removeClass('active');
                        $('.nav .nav-link-item').removeClass('active');
                        $(e.target).parent('.nav-link-item').addClass('active');
                        $(e.target).addClass('active')
                        content.slideDown();
                    }
                }
            })
        }
    }
    const accorFooter = () => {
        $('.footer-add-body').eq(0).slideDown();
        $('.footer-add-head').on('click', (e) => {
            console.log('click');
            e.preventDefault();
            let content = $(e.target).next('.footer-add-body');
            if ($(e.target).hasClass('active')) {
                $(e.target).removeClass('active');
                content.slideUp();
            } else {
                $('.footer-add-body').slideUp();
                $('.footer-add-head').removeClass('active');
                $(e.target).addClass('active')
                content.slideDown();
            }
        })
    }
    const newsletterSubmit = () => {
        if ($('.scnews').length) {
            $('.btn-submit-home-news').on('click', (e) => {
                $('.scnews-form-wrap').submit();
            })
            $('.scnews-form-wrap').on('submit', (e) => {
                $('.scnews-form-wrap').css('display', 'flex');
                $('.scnews-form .w-form-done, .scnews-form .w-form-fail').css('display', 'none');
                $('.success-wrap').addClass('show');
                setTimeout(() => {
                    document.querySelector('.scnews-form-wrap form').reset();
                    $('.success-wrap').removeClass('show');
                }, 5000);
                $('.ic-success-close').on('click', (e) => {
                    e.preventDefault();
                    $('.success-wrap').removeClass('show');
                })
            })
        }
    }

    handleHeader();
    handleModal();
    backToTop();
    //accorFooter();
    hoverLarge();
    newsletterSubmit();
    window.addEventListener('scroll', handleScroll())
}

const SCRIPT = {};

SCRIPT.homeScript = function () {
    $('.schome-gallery-tab-text').eq(0).addClass('active');
    $('.schome-gallery-item').eq(0).addClass('active');

    const hasViewPopup = sessionStorage.getItem('view_popup');
    if (!hasViewPopup) {
        if ($('.discount-popup').hasClass('de-active')) {
            
        } else {
            setTimeout(() => {
                $('.discount-popup').addClass('show')
                console.log('popup')
                sessionStorage.setItem('view_popup', true);
                lockBodyScroll();
            }, 3000);
        }  
    }
    $('.modal-close.mod-dsc').on('click', function (e) {
        e.preventDefault();
        $('.discount-popup').removeClass('show')
        unlockBodyScroll();
    })

    let btnGallery;
    if ($(window).width() > 991) {
        btnGallery = $('.schome-gallery-top .animate-btn')
    } else {
        btnGallery = $('.schome-gallery-btn-mobile .primary-btn')
    }
    //btnGallery.attr('href', $("[link-kitchen]").attr('href'));
    btnGallery.attr('href', '/kitchen-gallery/contemporary-kitchens');
    $('.schome-gallery-tab-text').click(function () {
        $('.schome-gallery-tab-text.active').removeClass('active');
        $('.schome-gallery-item.active').removeClass('active');
        $(this).addClass('active');
        let myIndex = $(this).closest('.schome-gallery-tab-item').index();
        if (myIndex === 0) {
            //btnGallery.attr('href', $("[link-kitchen]").attr('/kitchen-gallery/contemporary-kitchens'));
            btnGallery.attr('href', '/kitchen-gallery/contemporary-kitchens');
        } else {
            //btnGallery.attr('href', $("[link-home]").attr('/homespace-gallery/bathrooms'));
            btnGallery.attr('href', '/homespace-gallery/bathrooms');
        }
        $('.schome-gallery-item').eq(myIndex).addClass('active');
    });

    $('.schome-gallery-item').each(function (index) {
        const galleryBullet = $('.schome-gallery-thumb-bullet').eq(index).clone();
        const baseSelector = `.schome-gallery-list .schome-gallery-item:nth-child(${index + 1})`;
        const gallerySwiper = new Swiper(`${baseSelector} .schome-gallery-swiper`, {
            spaceBetween: 30,
            slidesPerView: 1,
            loopAdditionalSlides: 1,
            loop: true,
            speed: 800,
            navigation: {
                nextEl: `${baseSelector} .schome-gallery-swiper-btn.next`,
                prevEl: `${baseSelector} .schome-gallery-swiper-btn.prev`,
            },
            pagination: {
                el: `${baseSelector} .schome-gallery-thumb-pagination`,
                clickable: true,
                renderBullet: function (indexB, className) {
                    const srcImage = $(`${baseSelector} [data-swiper-slide-index=${indexB}] img`).attr('src');
                    galleryBullet.addClass(className);
                    galleryBullet.find('img').attr('src', srcImage);
                    return galleryBullet.prop('outerHTML');
                }
            }
        });
    })

    if ($(window).width() > 991) {
        $('.schome-product-item').eq(0).addClass('active');
        $('.schome-product-img-inner').eq(0).addClass('active');

        $('.schome-product-item').hover(function () {
            $('.schome-product-item.active').removeClass('active');
            $('.schome-product-img-inner.active').removeClass('active');
            $(this).addClass('active');
            let myIndex = $(this).closest('.schome-product-item-inner').index();
            $('.schome-product-img-inner').eq(myIndex).addClass('active');
        });
    }

    const testimonialSwiper = new Swiper('.schome-testimonial-swiper', {
        spaceBetween: 20,
        slidesPerView: 1,
        loopAdditionalSlides: 1,
        loop: true,
        freeMode: false,
        grabCursor: true,
        breakpoints: {
            768: {
                spaceBetween: 32,
                slidesPerView: 2,
                freeMode: true,
            },
            991: {
                spaceBetween: 32,
                slidesPerView: 3,
                freeMode: true,
            }
        }
    });
    playListVideo(".schome-process-item-video video");
    renameElement($('form a.primary-btn'), 'button');
    $('button.primary-btn').attr('type', 'submit');
    const form = initForm('#contact-form', {
        onSuccess: () => {
            //createFloat('Thank you for contacting us.', 5000);
            // formSuccess('#contact-form');
            redirectThankyou();
        },
        submitEle: {
            ele: 'button[type=submit]',
            textEle: '.primary-btn-text'
        },
        handleSubmit: (value, done) => {
            console.log('?')
            try {
                $.ajax({
                    url: "https://live.zen-living.ca/imports/email_notification.php",
                    type: "POST",
                    async: true,
                    data: {
                        ...value,
                        body: 'style1'
                    },
                    success: function (data, textStatus, jqXHR) {
                        redirectThankyou();
                        done();
                    }
                });
            } catch (error) {
                done();
            }
        },
        // hubspot: {
        //     portalId: '21858718',
        //     formId: 'c548fa42-8d74-4f40-8f4b-737883e3764b'
        // },

        pageName: 'Find us page',
        fields: [
            {
                name: 'lastname',
                value: (data) => data.name,
            },
            {
                name: 'email',
            },
            {
                name: 'phone',
            },
            {
                name: 'message',
            },
        ]
    });
}

SCRIPT.galleryScript = function () {
    $('[data-link="gallery"').addClass('active');
    const getShareUrl = (ele) => {
        const url = ele.closest('.scgallery-main-slide').find('.scgallery-main-link').attr('href');
        return `${window.location.origin}${url}`;
    }
    checkInView('.scgallery-main-grid-item');
    checkInView('.scgallery-main-item-title');
    let marginGap;
    if ($(window).width() > 991) {
        marginGap = 30;
    } else {
        marginGap = 20;
    }
    const macyInstance = Macy({
        container: '.scgallery-main-grid',
        trueOrder: true,
        margin: marginGap,
        columns: 3,
        debug: true,
        mobileFirst: false,
        breakAt: {
            1200: 3,
            940: 2,
            512: 1
        }
    });
    macyInstance.runOnImageLoad(function () { macyInstance.recalculate(true); }, true)
    const galleryThumbSwiper = new Swiper(".scgallery-main-swiper-thumb", {
        slidesPerView: 'auto',
        spaceBetween: 6,
        freeMode: true,
        watchSlidesProgress: true,
    });
    const gallerySwiper = new Swiper('.scgallery-main-swiper', {
        loop: true,
        watchSlidesProgress: true,
        spaceBetween: 20,
        slidesPerView: 1,
        navigation: {
            nextEl: `.scgallery-swiper-btn.next`,
            prevEl: `.scgallery-swiper-btn.prev`,
        },
        thumbs: {
            swiper: galleryThumbSwiper,
        },
        breakpoints: {
            768: {
                spaceBetween: 30,
            }
        },
        on: {
            slideChange: function () {
                // const currentSlug = $(this.slides[this.realIndex]);
                if ($('.modal').hasClass('show')) {
                    const currentSlug = $('.scgallery-main-grid-item').eq(this.realIndex).find('.img-slug').attr('data-slug');
                    updateQS({ img: currentSlug })
                }
            }
        }
    })
    $('.printerest-btn a').each(function () {
        const currentUrl = $(this).attr('href');
        $(this).attr('href', currentUrl + "&url=" + window.location.href)
    });
    $('.printerest-btn a').on("click", function (e) {
        e.stopPropagation();
    });
    $('.scgallery-main-slide-social-icon.toggle').on("click", () => {
        $('.scgallery-main-slide-social-share').toggleClass('show')
    })
    $('.scgallery-main-slide-social-icon[data-like]').on("click", function () {
        $(this).toggleClass('liked')
    })
    $('.scgallery-main-slide-social-icon:not(.toggle)').on("click", function () {
        const ele = $(this);

        const shareUrl = getShareUrl(ele);
        const type = ele.attr('data-share');

        if (!type) return;
        switch (type) {
            case "link":
                createFloat('Copied to clipboard');
                navigator.clipboard.writeText(shareUrl);
                break;
            case "facebook":
                const urlFb = createShareFacebookUrl(shareUrl);
                openWindow(urlFb);
                break;
            case "linkedin":
                const urlLinkedin = createShareLinkedinUrl(shareUrl);
                openWindow(urlLinkedin);
                break;
            case "mail":
                const urlMail = createShareMailUrl(shareUrl);
                openWindow(urlMail);
                break;
            case "hhh":
                const urlHouzz = createShareHouzzUrl(shareUrl);
                openWindow(urlHouzz);
                break;
            default:
                break;
        }
    });

    function loadModal(index) {
        gallerySwiper.slideTo(index + 1, 0, false);
        $('.modal').addClass('show');

        $('.modal').on('closeModal', () => {
            updateQS({}, true)
            $('.modal').off('closeModal');
        })
        lockBodyScroll();
    }


    $('.scgallery-main-grid-item').on("click", function () {
        const myIndex = $(this).index('.scgallery-main-grid-item');
        const imgSlug = $(this).find('.img-slug').attr('data-slug');
        updateQS({ img: imgSlug })

        loadModal(myIndex)
    })

    if (getQS().img) {
        const currentImg = $(`.img-slug[data-slug=${getQS().img}]`)
        const myIndex = currentImg.closest('.scgallery-main-grid-item').index();
        loadModal(myIndex)
    }

    // if ($(window).width() < 991) {
    //     $('.scgallery-tab-head').on('click', (e) => {
    //         e.preventDefault();
    //         if (!$(e.target).hasClass('active')) {
    //             $(e.target).addClass('active');
    //             $(e.target).next('.scgallery-tab-wrapper').slideDown(300)
    //         } else {
    //             $(e.target).removeClass('active');
    //             $(e.target).next('.scgallery-tab-wrapper').slideUp(300)
    //         }
    //     })
    // }
    dropdownSubMenu('.scgallery-tab-head', '.scgallery-tab-wrapper');
    let width = $('.scgallery-main-swiper-thumb-wrapper .scgallery-main-swiper-thumb-slide').width() * $('.scgallery-main-swiper-thumb-wrapper .scgallery-main-swiper-thumb-slide').length;
    if (width < $(window).width()) {
        $('.scgallery-main-swiper-thumb-wrapper').css('justify-content', 'center')
    } else {
        $('.scgallery-main-swiper-thumb-wrapper').css('justify-content', 'start')
    }
}

SCRIPT.galleryImageScript = function () {
    $(".sccate-main-filter").removeClass('hidden');
    let redirectUrl;
    const slugImage = $('[data-slug-img]').attr('data-slug-img');

    const linkHome = $('.link-home').attr('href');
    const linkKitchen = $('.link-kitchen').attr('href');

    if (linkHome === "#") {
        redirectUrl = `${window.location.origin}/${linkKitchen}?img=${slugImage}`;
    } else {
        redirectUrl = `${window.location.origin}/${linkHome}?img=${slugImage}`;
    }
    setTimeout(() => {
        if (redirectUrl) {
            window.location.href = redirectUrl;
        }
    }, 800)
}

SCRIPT.productScript = function () {
    if (window.location.pathname == '/products/door-profiles') {
        $('.sccate-main-filter').remove();
        $('.sccate-main-list-head-filter').remove();
    }
    $('[data-link="products"').addClass('active');
    let currentFilter = [];
    $('.filter-header-count-text').text(``);
    $('.head-filter-count-wrap').removeClass('show');
    $('.head-filter-count-wrap .filter-count-text').text('0');
    $('.modal-overlay').on('click', (e) => {
        e.preventDefault();
        $('.modal').removeClass('show');
        unlockBodyScroll();
    })
    let $itemPerPage;
    if ($(window).width() > 991) {
        $itemPerPage = 20;
    } else if ($(window).width() > 768) {
        $itemPerPage = 14;
    } else {
        $itemPerPage = 10;
    }
    const productCMS = initCMS({
        selector: '.sccate-product-list',
        pagination: {
            itemPerPage: $itemPerPage,
        },
        setupFilter: (listEle) => {
            // console.log(listEle)
            const vari = getVariants(listEle);
            console.log(vari)
            // cons
            mapVariantsToEle(vari);
        }
    })
    function getVariants(listEle) {
        let result = [];
        if (!$(listEle).length) return null;
        $(listEle).find('.variant-item').each(function () {
            const type = $(this).find('[data-filter-type]').attr('data-filter-type')
            const value = $(this).find('[data-filter-value]').attr('data-filter-value')

            const exist = result.find((val) => val && val.type === type)
            if (!exist) {
                result.push({ type, data: [value] })
            }
            else {
                const newArr = [...(exist.data || []), value];
                exist.data = [...new Set(newArr)]
            }
        });
        return result;
    }

    function addNewFilter(type, data) {
        const existFilter = currentFilter.find((val) => val && val.type === type);
        if (!existFilter) {
            currentFilter.push({
                type,
                data: [data]
            })
        } else {
            existFilter.data = [...(existFilter.data || []), data]
        }
    }

    function removeFilter(type, data) {
        const existFilter = currentFilter.find((val) => val && val.type === type)
        if (!existFilter) return;
        if (existFilter.data.length === 1) {
            currentFilter = currentFilter.filter((el) => el.type !== type);
        }
        else {
            existFilter.data = existFilter.data.filter((el) => el !== data);
        }
    }

    function updateDisplayTextFilter(type) {
        const existFilter = currentFilter.find((val) => val && val.type === type)
        const displayText = existFilter ? `${type} (${existFilter.data.length})` : type;

        $(`[data-type='${type}']`).find('.sccate-main-select-trigger .text-md').text(displayText);
    }
    const eleCheckbox = $('.sccate-main-selection-option');
    $('[data-remove]').remove();

    const selectFilter = $('.sccate-main-filter').find('.sccate-main-select').first();
    if ($(window).width() > 991) {
        $('.sccate-main-filter').empty();
    } else {
        $('.filter-inner-main .filter-inner-scroll').empty();
    }
    function mapVariantsToEle(variants) {

        if (!variants) return;
        variants.forEach((val) => {
            const { type, data } = val;
            const cloneSelectFilter = selectFilter.clone();
            cloneSelectFilter.attr('data-type', type);
            cloneSelectFilter.find('.sccate-main-select-trigger .text-md').text(type);
            data.forEach((name) => {
                eleCheckbox.find('.checkbox-label').text(name);
                eleCheckbox.find('input').attr('name', name)
                eleCheckbox.find('input').attr('data-name', name)
                eleCheckbox.find('input').attr('id', name)
                cloneSelectFilter.find('.sccate-main-select-list').append(eleCheckbox.clone());
            })
            if ($(window).width() > 991) {
                $('.sccate-main-filter').append(cloneSelectFilter);
            } else {
                $('.filter-inner-main .filter-inner-scroll').append(cloneSelectFilter);
            }
        })

        $('.sccate-main-select').on("click", function () {
            $('.sccate-main-select').removeClass('active');
            $(this).addClass('active');
        })

        $('.sccate-main-selection-option').on("click", function (e) {
            e.preventDefault();
            const target = $(this);
            target.find('.checkbox').toggleClass('w--redirected-checked');
            target.find('input').attr('checked', !target.find('input').attr("checked"));
            const type = target.closest('.sccate-main-select').attr("data-type");
            const data = target.find('input').attr('name');
            const isChecked = target.find('input').attr("checked");
            if (isChecked) {
                addNewFilter(type, data)
            }
            else {
                removeFilter(type, data);
            }
            updateDisplayTextFilter(type)
            updateTagFilter();
            productCMS.onFilter(currentFilter);
            console.log('ON FILTER', currentFilter);
        })
    }

    const tagFilter = $('.sccate-main-tag-item').first();
    const mainTag = $('.sccate-main-tag');
    $('.sccate-main-tag-list').empty();

    function updateTagFilter() {
        $('.sccate-main-tag-list').empty();
        if (currentFilter.length) {
            currentFilter.forEach(({ type, data }) => {
                data.forEach((val) => {
                    tagFilter.attr('data-tag-type', type);
                    tagFilter.attr('data-tag-data', val);
                    tagFilter.find('.sccate-main-tag-name').text(val);
                    const clone = tagFilter.clone()
                    requestAnimationFrame(() => {
                        clone.addClass('show');
                    })
                    $('.sccate-main-tag-list').append(clone);

                })
            })
            $('.sccate-main-tag-item').find('.sccate-main-tag-del-ic').on("click", function () {
                const data = $(this).closest('.sccate-main-tag-item').attr('data-tag-data');
                $(`.sccate-main-selection-option input[name='${data}']`).trigger("click")
            });
            mainTag.addClass('show');
        } else {
            mainTag.removeClass('show');
        }
    }

    if ($(window).width() > 991) {
        $('.tag-clear-all').on("click", () => {
            currentFilter = [];
            $('.sccate-main-selection-option .w--redirected-checked').closest('.sccate-main-selection-option').trigger('click');
        })
    } else {
        $('.filter-header-count-text').on("click", (e) => {
            console.log('click')
            $('.filter-header-count-text').text('');
            currentFilter = [];
            $('.sccate-main-selection-option .w--redirected-checked').closest('.sccate-main-selection-option').trigger('click');
        })
    }

    $(document).on('click', function (e) {
        if ($(e.target).closest(".sccate-main-select").length === 0) {
            $(".sccate-main-select").removeClass('active');
        }
    });
    $('.modal').removeClass('.anim-down');
    // setTimeout(() => {
    //     const check = $('.sccate-modal-img-inner');
    //     console.log(getViewportOffset(check));
    // }, 1000)

    $('.scgallery-main-slide-social-icon.toggle').on("click", () => {
        $('.scgallery-main-slide-social-share').toggleClass('show')
    })
    $('.scgallery-main-slide-social-icon[data-like]').on("click", function () {
        $(this).toggleClass('liked')
    })
    $('.scgallery-main-slide-social-icon:not(.toggle)').on("click", function () {
        const ele = $(this);
        const shareUrl = $(this).closest('.modal').find('.sccate-main-href').attr('data-share');
        const imageUrl = $(this).closest('.modal').find('img').attr('src');

        const type = ele.attr('data-share');

        if (!type) return;
        switch (type) {
            case "link":
                createFloat('Copied to clipboard');
                navigator.clipboard.writeText(shareUrl);
                break;
            case "facebook":
                const urlFb = createShareFacebookUrl(shareUrl);
                openWindow(urlFb);
                break;
            case "linkedin":
                const urlLinkedin = createShareLinkedinUrl(shareUrl);
                openWindow(urlLinkedin);
                break;
            case "mail":
                const urlMail = createShareMailUrl(shareUrl);
                openWindow(urlMail);
                break;
            case "hhh":
                const urlHouzz = createShareHouzzUrl(imageUrl);
                openWindow(urlHouzz);
                break;
            default:
                break;
        }
    });

    dropdownSubMenu('.sccate-main-list-head-drop', '.sccate-main-sidebar-wrapper');
    $('.sccate-main-list-head-filter').on('click', (e) => {
        e.preventDefault();
        $('.filter-wrap').addClass('show');
        lockBodyScroll()
    })
    $('.filter-close').on('click', (e) => {
        e.preventDefault();
        $('.filter-wrap').removeClass('show');
        unlockBodyScroll()
    })
}

SCRIPT.aboutScript = function () {
    $('[data-link="about"').addClass('active');
    const multiProjSwiper = new Swiper('.scabt-proj-main', {
        spaceBetween: 20,
        slidesPerView: 1,
        loopAdditionalSlides: 1,
        pagination: {
            el: '.scabt-proj-swiper-pagi',
            type: 'bullets',
        },
        breakpoints: {
            768: {
                spaceBetween: 32,
                slidesPerView: 2,
            },
            991: {
                spaceBetween: 64,
                slidesPerView: 3,
            }
        }
    });
    const testimonialSwiper = new Swiper('.schome-testimonial-swiper', {
        spaceBetween: 20,
        slidesPerView: 1,
        loopAdditionalSlides: 1,
        loop: true,
        freeMode: false,
        grabCursor: true,
        breakpoints: {
            991: {
                spaceBetween: 32,
                slidesPerView: 3,
                freeMode: true,
            }
        }
    });
}
SCRIPT.howitworksScript = function () {
    $('[data-link="howitworks"').addClass('active');
    if ($(window).width() < 768) {
        activeAccor('.scwork-main-item-content-wrap');
    }

}
SCRIPT.facilitiesScript = function () {
    $('[data-link="about"').addClass('active');
    let inner = $('.scfal-feat-main').eq(0).html();
    $('.scfal-feat-main').eq(0).append(inner);
    $('.scfal-feat-main').eq(0).append(inner);
    $('.scfal-feat-main').eq(0).append(inner);
    $('.scfal-feat-main').eq(0).append(inner);
    $('.scfal-feat-inner').addClass('anim');
    // if ($(window).width() > 768) {
    //     const falFeatSwiper = new Swiper('.scfal-feat-main', {
    //         // spaceBetween: 20,
    //         slidesPerView: 4,
    //         loop: true,
    //         loopAdditionalSlides: 2,
    //         // grabCursor: true,
    //         breakpoints: {
    //             991: {
    //                 // spaceBetween: 30,
    //                 slidesPerView: 6
    //             }
    //         }
    //     });
    // } else {
    //     const falFeatSwiper = new Swiper('.scfal-feat-main.mobile', {
    //         // spaceBetween: 20,
    //         slidesPerView: 3,
    //         // grabCursor: true,
    //     });
    // }

}
SCRIPT.multiFamilyScript = function () {
    $('[data-link="about"').addClass('active');

    let x = document.querySelectorAll(".scmulti-main-item-swiper");
    x.forEach(function (ele, i) {
        console.log(ele, i)
        ele.className += ` swiper-${i}`;
    });
    let y = document.querySelectorAll(".swiper-pagination");
    y.forEach(function (ele, i) {
        console.log(ele, i)
        ele.className += ` swiper-pagination-${i}`;
    });
    let z = document.querySelectorAll(".scmulti-main-item-next");
    z.forEach(function (ele, i) {
        console.log(ele, i)
        ele.className += ` scmulti-main-item-next-${i}`;
    });
    let a = document.querySelectorAll(".scmulti-main-item-prev");
    a.forEach(function (ele, i) {
        console.log(ele, i)
        ele.className += ` scmulti-main-item-prev-${i}`;
    });

    x.forEach(function (ele, i) {
        const multiFamilySwiper = new Swiper(`.swiper-${i}`, {
            slidesPerView: 1,
            loop: true,
            grabCursor: true,
            spaceBetween: 10,
            loopAdditionalSlides: 2,
            pagination: {
                el: `.swiper-pagination-${i}`,
                type: 'bullets',
            },
            navigation: {
                nextEl: `.scmulti-main-item-next-${i}`,
                prevEl: `.scmulti-main-item-prev-${i}`,
            },
            breakpoints: {
                768: {
                    spaceBetween: 0,
                    loopAdditionalSlides: 0,
                }
            }
        })

    });
}
SCRIPT.findUsScript = function () {
    $('[data-link="findus"').addClass('active');
    $('.scfind-notif-toggle').on('click', (e) => {
        e.preventDefault();
        $('.scfind-notif').slideUp(400);
    });
    console.log('Findus')
    $('[href="#contactForm"]').on('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('click')
        $('#contactForm').get(0).scrollIntoView({
            behavior: "smooth",
        });
    })
    $('#gmap-holder').click(function (e) {
        $(this).find('iframe').css('pointer-events', 'all');
        console.log('enter')
    }).mouseleave(function (e) {
        $(this).find('iframe').css('pointer-events', 'none');
        console.log('leave')
    });
    renameElement($('form a.primary-btn'), 'button');
    $('button.primary-btn').attr('type', 'submit');

    const form = initForm('#contact-form', {
        onSuccess: () => {
            //createFloat('Thank you for contacting us.', 5000);
            // formSuccess('#contact-form');
            redirectThankyou();
        },
        submitEle: {
            ele: 'button[type=submit]',
            textEle: '.primary-btn-text'
        },
        handleSubmit: (value, done) => {
            try {
                $.ajax({
                    url: "https://live.zen-living.ca/imports/email_notification.php",
                    type: "POST",
                    async: true,
                    data: {
                        ...value,
                        body: 'style1'
                    },
                    success: function (data, textStatus, jqXHR) {
                        redirectThankyou();
                        done();
                    }
                });
            } catch (error) {
                done();
            }
        },
        // hubspot: {
        //     portalId: '21858718',
        //     formId: 'c548fa42-8d74-4f40-8f4b-737883e3764b'
        // },

        pageName: 'Find us page',
        fields: [
            {
                name: 'lastname',
                value: (data) => data.name,
            },
            {
                name: 'email',
            },
            {
                name: 'phone',
            },
            {
                name: 'message',
            },
        ]
    });
}
SCRIPT.catalogsScript = function () {
    console.log('catalog')
    $('[data-link="resources"').addClass('active');
}
SCRIPT.productShareScript = function () {
    const p = window.location.pathname;
    const productPage = $('a').attr('href');

    setTimeout(() => {
        window.location.href = `${window.location.origin}${productPage}?p=${p}`
    }, 800)
}
SCRIPT.careerScript = function () {
    $('[data-link="about"').addClass('active');

    let careerTitle = document.querySelectorAll(".career-item-title");
    let careerIntersect = document.querySelectorAll(".intersection-top");
    for (let x = 0; x < careerTitle.length; x++) {
        let observer = new IntersectionObserver(function (entries) {
            if (careerTitle[x].querySelector('.career-item-ic').classList.contains('active')) {
                if (entries[0].intersectionRatio === 0)
                    careerTitle[x].classList.add("on-sticky");
                else if (entries[0].intersectionRatio === 1)
                    careerTitle[x].classList.remove("on-sticky");
            }
        }, { threshold: [0, 1] });
        observer.observe(careerIntersect[x]);
    }

    // $('.career-item-ic').on("click", function (e) {
    //     e.preventDefault();
    //     const $this = $(this);
    //     const target = $this.closest('.career-item').find('.career-item-info-wrapper');
    //     const line = $this.closest('.career-item').find('.career-line');
    //     $this.toggleClass('active');

    //     if (target.is(":hidden")) {
    //         $this.addClass('active');
    //         target.slideDown(400, () => {
    //             line.addClass('active');
    //         });
    //     } else {
    //         $this.removeClass('active');
    //         $this.closest('.career-item-title').removeClass('on-sticky');
    //         target.slideUp(400, () => {
    //             line.removeClass('active');
    //         });
    //     }
    // })
    $('.career-item-title').on("click", function (e) {
        e.preventDefault();
        const $this = $(this);
        const target = $this.closest('.career-item').find('.career-item-info-wrapper');
        const line = $this.closest('.career-item').find('.career-line');
        const icon = $this.find('.career-item-ic');
        $this.toggleClass('active');

        if (target.is(":hidden")) {
            $this.addClass('active');
            icon.addClass('active');
            target.slideDown(400, () => {
                line.addClass('active');
            });
        } else {
            $this.removeClass('active');
            icon.removeClass('active');
            $this.closest('.career-item-title').removeClass('on-sticky');
            target.slideUp(400, () => {
                line.removeClass('active');
            });
        }
    })

    $('.sidebar-close').on('click', function () {
        $('.sidebar').removeClass('show')
        unlockBodyScroll()
    })

    $('.career-item .primary-btn').on("click", function (e) {
        e.preventDefault();

        const careerItem = $(this).closest('.career-item');
        const job = careerItem.find('.career-item-heading').text();
        const location = careerItem.find('[data-location] .text-md').text();
        const type = careerItem.find('[data-type] .text-md').text();

        $('.sidebar-career-title').text(job);
        $('[data-sidebar-location] .text-md').text(location);
        $('[data-sidebar-type] .text-md').text(type);

        $('.sidebar').addClass('show')
        lockBodyScroll()

    })

    const fileEle = initBtnUploadFile();

    const form = initForm('#career-form', {
        onSuccess: () => {
            //createFloat(`Thank you for your application. Please waiting our contact in short time!`, 5000)
            formSuccess('#career-form');
            $('.sidebar').removeClass('show')
            unlockBodyScroll()
        },
        hubspot: {
            portalId: '21858718',
            formId: '0865ed6d-5ed6-4f6a-b2bf-445ef4d7ba28'
        },
        pageName: 'Career page',
        prepareMap: (ele) => {
            const job = $('.sidebar-career-title').text();
            const location = $('[data-sidebar-location] .text-md').text();
            const type = $('[data-sidebar-type] .text-md').text();

            ele.find('input[name=job]').val(job);
            ele.find('input[name=location]').val(location);
            ele.find('input[name=type]').val(type);
        },
        fileOptions: {
            fileEle: fileEle,
            required: true,
            folder: 'career'
        },
        fields: [
            {
                name: 'city',
                value: (data) => data.location,
            },
            {
                name: 'jobtitle',
                value: (data) => `${data.job} (${data.type})`,
            },
            {
                name: 'lastname',
                value: (data) => data.name,
            },
            {
                name: 'website',
                value: (data) => data.fileUrl,
            },
            {
                name: 'email',
            },
            {
                name: 'phone',
            },
            {
                name: 'message',
            },
        ]
    })
}
SCRIPT.consultingScript = function () {
    const fileEle = initBtnUploadFile();
    $('.sccslt-form-wrap form').append('<input type="hidden" name="consultant" >');
    $('.form-consulting-item').on('click', function (e) {
        e.preventDefault();
        if ($(e.target).hasClass('active')) {
            $(e.target).removeClass('active');
        } else {
            $('.form-consulting-item').removeClass('active');
            $(e.target).addClass('active');
        }


        // $('input[name="consultant"]').val($(this).find('.form-consulting-name'))
    })
    const form = initForm('.sccslt-form-wrap form', {
        onSuccess: () => {
            //createFloat(`We will get back to you as soon as possible!`, 5000);
            // formSuccess('#email-form');
            redirectThankyou();
        },
        // hubspot: {
        //     portalId: '21858718',
        //     formId: '85b36111-eed9-4e22-9a1d-e46627682462'
        // },
        handleSubmit: (data, done) => {
            try {
                const contact = $('input[name=contact]:checked').closest('.radio-select-grp').find('.radio-btn-text').text()
                const place = $('input[name=place]:checked').closest('.radio-select-grp').find('.radio-btn-text').text()
                $.ajax({
                    url: 'https://live.zen-living.ca/imports/email_notification.php',
                    type: "POST",
                    async: true,
                    data: {
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        location: place,
                        salesperson: data.consultant,
                        address: data.address,
                        message: data.message || '',
                        contact: contact,
                        uploads: data.fileUrl || '',
                        body: 'style2'
                    },
                    success: function (data, textStatus, jqXHR) {
                        redirectThankyou();
                        done();
                    }
                });

            } catch (error) {
                done();
            }
        },
        pageName: 'Consultant page',
        prepareMap: (ele) => {
            const consultant = $('.form-consulting-item.active').find('.form-consulting-name').text();

            $('input[name="consultant"]').val(consultant)
        },
        fileOptions: {
            fileEle: fileEle,
            required: false,
            folder: 'consultant'
        },
        fields: [
            {
                name: 'lastname',
                value: (data) => data.name,
            },
            {
                name: 'phone',
            },
            {
                name: 'jobtitle',
                value: (data) => {
                    const contact = $('input[name=contact]:checked').closest('.radio-select-grp').find('.radio-btn-text').text()
                    const place = $('input[name=place]:checked').closest('.radio-select-grp').find('.radio-btn-text').text()
                    return `${contact} / ${place}`
                }
            },
            {
                name: 'company',
                value: (data) => data.consultant,

            },
            {
                name: 'address',
            },
            {
                name: 'email',
            },
            {
                name: 'website',
                value: (data) => data.fileUrl,
            },

        ],

    })
    $('#openSidebar').on('click', (e) => {
        e.preventDefault();
        $('.sidebar').addClass('show');
        lockBodyScroll();
    })
    $('.sidebar-close').on('click', (e) => {
        e.preventDefault();
        $('.sidebar').removeClass('show');
        unlockBodyScroll();
    })
}

SCRIPT.zenlivingOfferScript = function () {
    const fileEle = initBtnUploadFile();
    const form = initForm('.scoffer-form-wrap form', {
        onSuccess: () => {
            //createFloat(`We will get back to you as soon as possible!`, 5000);
            // formSuccess('#email-form');
            redirectThankyou();
        },
        // hubspot: {
        //     portalId: '21858718',
        //     formId: 'b537bdb4-8843-4fcf-9892-bc66c74a6b98'
        // },
        handleSubmit: (data, done) => {
            try {
                $.ajax({
                    url: 'https://live.zen-living.ca/imports/email_notification.php',
                    type: "POST",
                    async: true,
                    data: {
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        message: data.message || '',
                        body: 'style1'
                    },
                    success: function (data, textStatus, jqXHR) {
                        redirectThankyou();
                        done();
                    }
                });

            } catch (error) {
                done();
            }
        },
        pageName: 'Offer page',
        fileOptions: {
            fileEle: fileEle,
            required: false,
            folder: 'offer'
        },
        fields: [
            {
                name: 'lastname',
                value: (data) => data.name,
            },
            {
                name: 'email',
            },
            {
                name: 'phone',
            },
            {
                name: 'website',
                value: (data) => data.fileUrl,
            },

        ],
    })
}
SCRIPT.reviewScript = function () {
    // let reviewList = '.screv-main-content';
    // let customReviewList = new FsLibrary(reviewList);
    // if ($('.screv-main-item').length >= 4) {
    //     customReviewList.loadmore({
    //         button: '.load-more-btn',
    //         resetIx: false,
    //         animation: {
    //             enable: true,
    //             duration: .3,
    //             easing: 'ease',
    //             effect: 'fade',
    //         }
    //     });
    // } else {
    //     $('.w-pagination-wrapper').remove();
    // }
}

SCRIPT.faqScript = function () {
    activeAccor('.scfaq-main-content-inner');
    dropdownSubMenu('.scfaq-main-list-head', '.scfaq-main-sidebar-list');
}
SCRIPT.careScript = function () {
    activeAccor('.scfaq-main-content-inner');
    dropdownSubMenu('.scfaq-main-list-head', '.scfaq-main-sidebar-list');
    $('[data-tab-head]').on('click', (e) => {
        e.preventDefault();
        let index = $(e.target).attr('data-tab-head')
        $('[data-tab-head], [data-tab-content]').removeClass('active');
        $(`[data-tab-head="${index}"], [data-tab-content="${index}"]`).addClass('active')
    })
}
SCRIPT.warrantyScript = function () {
    dropdownSubMenu('.scfaq-main-list-head', '.scfaq-main-sidebar-list');

    $('.scwarr-sub-content-wrap .primary-btn').on("click", function (e) {
        e.preventDefault();
        $('.sidebar').addClass('show')
        lockBodyScroll()
    });
    $('.sidebar-close').on('click', (e) => {
        e.preventDefault();
        $('.sidebar').removeClass('show');
        unlockBodyScroll();
    });
    if ($(window).width() > 768) {
        $('.form-input-dropdown-group').on('mouseover', (e) => {
            console.log('hover')
            e.preventDefault();
            $('.dropdown-input-wrap').addClass('show');
            $('.ic-input-drop').addClass('show');
        });
        $('.form-input-dropdown-group').on('mouseleave', (e) => {
            e.preventDefault();
            if ($('.dropdown-input-wrap').is(':hover')) {
                return;
            } else {
                $('.dropdown-input-wrap').removeClass('show');
                $('.ic-input-drop').removeClass('show');
            }
        });
    } else {
        $('.form-input-dropdown-group').on('click', (e) => {
            e.preventDefault();
            console.log($(e.target))
            if ($(e.target).hasClass('dropdown-input-link')) {
                $('.dropdown-input-wrap').addClass('show');
                $('.ic-input-drop').addClass('show');
            }
            if ($('.dropdown-input-wrap').hasClass('show')) {
                $('.dropdown-input-wrap').removeClass('show');
                $('.ic-input-drop').removeClass('show');
            } else {
                $('.dropdown-input-wrap').addClass('show');
                $('.ic-input-drop').addClass('show');
            }
        });
    };
    $('.dropdown-input-link').on('click', (e) => {
        e.preventDefault();
        let inputVal = $(e.target).text();
        $('.form-input-dropdown-group input').val(inputVal);
        $('.dropdown-input-wrap').removeClass('show');
        $('.ic-input-drop').removeClass('show');
    });

    const fileEle = initBtnUploadFile();
    const form = initForm('.sidebar form', {
        onSuccess: () => {
            //createFloat(`We will get back to you as soon as possible!`, 5000);
            formSuccess('.sidebar form');
            $('.sidebar').removeClass('show')
            unlockBodyScroll()
        },
        handleSubmit: (data, done) => {
            try {
                const contact = $('input[name=contact]:checked').closest('.radio-select-grp').find('.radio-btn-text').text()
                const place = $('input[name=place]:checked').closest('.radio-select-grp').find('.radio-btn-text').text()
                $.ajax({
                    url: "https://live.zen-living.ca/imports/email_notification.php",
                    type: "POST",
                    async: false,
                    data: {
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        address: data.address,
                        zipcode: data.zip_code,
                        quotenumber: data.quatation,
                        productline: data.product,
                        message: data.message,
                        uploads: data.fileUrl || '',
                        body: 'style3'
                    },
                    success: function (data, textStatus, jqXHR) {
                        formSuccess('.sidebar form');
                        $('.sidebar').removeClass('show');
                        unlockBodyScroll();
                        done();
                    }
                });
            } catch (error) {
                done();
            }
        },
        // hubspot: {
        //     portalId: '21858718',
        //     formId: '853cf806-2e4b-496a-bd1d-9d5ad62a9a8b'
        // },
        pageName: 'Warranty page',
        fileOptions: {
            fileEle: fileEle,
            required: false,
            folder: 'warranty'
        },
        fields: [
            {
                name: 'firstname',
                value: (data) => data.name,
            },
            {
                name: 'email',
            },
            {
                name: 'phone',
            },
            {
                name: 'address',
            },
            {
                name: 'zip_code',
            },
            {
                name: 'quatation',
            },
            {
                name: 'product',
            },
            {
                name: 'message',
            },
            {
                name: 'file_url',
                value: (data) => data.fileUrl,
            },

        ]
    })
}
SCRIPT.termScript = function () {
    dropdownSubMenu('.scfaq-main-list-head', '.scfaq-main-sidebar-list');
}
SCRIPT.blogScript = function () {
    $('[data-link="resources"').addClass('active');
    $('[fs-cmsfilter-element="reset"]').on('click', function(e) {
        $('.filter-reset-wrap').addClass('fs-cmsfilter_active');
    })
    $('.heading.h6.scgallery-tab-text-wrapper').on('click', function (e) {
        if (!$(this).parent('.scgallery-tab-item').hasClass('filter-reset-wrap')) {
            $('.filter-reset-wrap').removeClass('fs-cmsfilter_active')
        }
        let currentTag = $(e.target).text();            
        $('.scblog-main-title').text(currentTag);
        if ($(window).width() < 991) {
            $('.scgallery-tab-head-txt').text(currentTag);
            $('.scblog-tab-head').removeClass('active');
            $('.scblog-tab-head').next('.scblog-main-tab-wrap').slideUp(300);
        }
    })

    if ($(window).width() < 991) {
        $('.scblog-tab-head').on('click', (e) => {
            e.preventDefault();
            if (!$(e.target).hasClass('active')) {
                $(e.target).addClass('active');
                $(e.target).next('.scblog-main-tab-wrap').slideDown(300)
            } else {
                $(e.target).removeClass('active');
                $(e.target).next('.scblog-main-tab-wrap').slideUp(300)
            }
        })   
    }
}
SCRIPT.blogdetailScript = function () {
    function createToc() {
        let observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute("id");
                if (entry.isIntersecting) {
                    document.querySelectorAll(".active").forEach((z) => {
                        z.classList.remove("active")
                    });
                    document.querySelector(`a[href="#${id}"]`).classList.add("active");
                    $(".toc-mobile-head-txt").text($('.toc-item.active').text());
                }
            });
        }, { rootMargin: '0px 0px -75% 0px' });
        document.querySelector(".sckgdetail-main-1-richtext").querySelectorAll("h2").forEach(function (heading, i) {
            observer.observe(heading);
            heading.setAttribute("id", "toc-" + i);
            const item = document.createElement("a");
            item.innerHTML = heading.innerHTML
            item.setAttribute("class", "text-sm bold toc-item");
            item.setAttribute("href", "#toc-" + i);
            document.querySelector(".toc-nav").appendChild(item);
        });
        $('a.toc-item').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            let target = $(this).attr('href');
            console.log(target);
            document.querySelector(target).scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        })
    };
    createToc();
    shareMedia();

    if ($(window).width() < 768) {
        $(".toc-mobile-head-txt").text($('#toc-0').text());
        $(".toc-header").on('click', (e) => {
            e.preventDefault();
            $('.toc-nav-wrapper').slideToggle();
            $('.ic-arrow-nav.ic-arrow-nav').toggleClass('down')
        })
        $('.text-sm.bold.toc-item').on('click', (e) => {
            $('.toc-nav-wrapper').slideUp();
            $('.ic-arrow-nav.ic-arrow-nav').removeClass('down')
        })
    }
}
SCRIPT.videoScript = function () {
    $('[data-link="resources"').addClass('active');
    $('[fs-cmsfilter-element="reset"]').on('click', function(e) {
        $('.filter-reset-wrap').addClass('fs-cmsfilter_active');
    })
    $('.heading.h6.scgallery-tab-text-wrapper').on('click', function (e) {
        setTimeout(() => {
            handleVideoPopup();
        }, 600);
        if (!$(this).parent('.scgallery-tab-item').hasClass('filter-reset-wrap')) {
            $('.filter-reset-wrap').removeClass('fs-cmsfilter_active')
        }
        
        let currentTag = $(e.target).text();            
        $('.scblog-main-title').text(currentTag);
        if ($(window).width() < 991) {
            $('.scgallery-tab-head-txt').text(currentTag);
            $('.scblog-tab-head').removeClass('active');
            $('.scblog-tab-head').next('.scblog-main-tab-wrap').slideUp(300);
        }
    })

    if ($(window).width() < 991) {
        $('.scblog-tab-head').on('click', (e) => {
            e.preventDefault();
            $('.video-embed iframe').remove();
            if (!$(e.target).hasClass('active')) {
                $(e.target).addClass('active');
                $(e.target).next('.scblog-main-tab-wrap').slideDown(300)
            } else {
                $(e.target).removeClass('active');
                $(e.target).next('.scblog-main-tab-wrap').slideUp(300)
            }
        })   
    }

    function handleVideoPopup() {
        $('.scvideo-main-item-img-wrap, .scvideo-main-item-title, .scvideo-main-item .text-link-arr-wrap').on('click', (e) => {
            e.preventDefault();
            let videoId = $(e.target).parent().find('.scvideo-video-id').text();
            let videoTitle = $(e.target).parent().find('.scvideo-main-item-title').text();
            let $iframe = $("<iframe>").attr({
                "src": `https://www.youtube.com/embed/${videoId}`,
                'title': `${videoTitle}`,
                'frameborder': '0',
                'allow': 'autoplay',
                'allowfullscreen': '1'
            }).css({ "width": '100%', "height": '100%' });
            console.log(videoId);
            $('.modal-video').addClass('show');
            if ($('.video-embed iframe').length >= 1) {
                return;
            } else {
                $('.video-embed').append($iframe);
            }
        });
        $('.video-close').on('click', (e) => {
            e.preventDefault();
            $('.video-embed iframe').remove();
            $('.modal-video').removeClass('show');
            unlockBodyScroll();
        });
    };
    handleVideoPopup();

    $('.load-more-btn, .sort-trigger-wrap').on('click', (e) => {
        console.log('load more');
        $('.video-embed iframe').remove();
        setTimeout(() => {
            handleVideoPopup();
        }, 600);
    })

}
SCRIPT.kitchenGuideScript = function () {
    $('[data-link="resources"').addClass('active');
    shareMedia();
}
SCRIPT.trackOrderScript = function () {
    const form = initForm('#track-form', {
        handleSubmit: (value, done) => {
            try {
                const result = $.ajax({
                    url: "https://live.zen-living.ca/imports/orderstatuslink.php",
                    type: "POST",
                    async: false,
                    data: {
                        order: value.orderNumber,
                        id: "0813"
                    },
                });
                const data = result.responseText;
                if (data == "ERR") {
                    alert("You entered an invalid order number");
                } else {
                    $(`<a href="${data}" target="_blank">&nbsp;</a>`)[0].click();
                }
                done();
            } catch (error) {
                done();
            }
        }
    })
}
const page = $('body').attr('data-page');
globalScript()
if (page) {
    SCRIPT[`${page}Script`]();
}