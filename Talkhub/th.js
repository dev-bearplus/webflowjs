const mainScript = () => {
    console.log('Talkhub Script')
    /* 
    Common Scripts 
    */

    //Smooth Scroll
    $('html').css('scroll-behavior', 'auto');
    $('html').css('height', 'auto');
    function easing(x) {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
    }
    const lenis = new Lenis({
        easing: easing,
    })

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)


    // Scroll Events
    let header = $('.header');
    let megaMenu = $('.mega-menu');
    lenis.on('scroll', function (inst) {
        if (inst.scroll > header.height()) {
            header.addClass('on-scroll')
            megaMenu.addClass('on-scroll')
        } else {
            header.removeClass('on-scroll')
            megaMenu.removeClass('on-scroll')
        }
    });
    function stopScroll() {
        $('body').css('overflow','hidden')
    }

    function startScroll() {
        $('body').css('overflow', 'inherit')
    }

    //Header 
    function headerDesktop() {
        $('.header-link[data-mega]').on('click', function (e) {
            e.preventDefault();
            let type = $(this).attr('data-mega');
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $('.mega-menu').removeClass('active');
            } else {
                $('.header-link[data-mega]').removeClass('active');
                $(this).addClass('active');
                $('.mega-menu-inner').removeClass('active');
                $(`.mega-menu-inner[data-mega="${type}"]`).addClass('active');
                $('.mega-menu').addClass('active');
            }
        })
    
        $('.main').on('click', function () {
            if (megaMenu.is(':hover') || header.is(':hover')) {
                return;
            } else {
                $('.header .header-link').removeClass('active')
                megaMenu.removeClass('active')
            }
        })
    }

    function headerMobile() {
        $('.nav-toggle').on('click', function() {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $('.nav').removeClass('active');
                header.removeClass('active');
                $('.header-link[data-mega]').removeClass('active');
                $(`.nav-menu-inner[data-mega]`).slideUp();
                $('.nav-inner').scrollTop(0);
                startScroll();
            } else {
                $(this).addClass('active');
                $('.nav').addClass('active');
                header.addClass('active');
                stopScroll();
            }
        });

        $('.header-link[data-mega]').on('click', function (e) {
            e.preventDefault();
            let type = $(this).attr('data-mega');
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(`.nav-menu-inner[data-mega="${type}"]`).slideUp();
            } else {
                $('.header-link[data-mega]').removeClass('active');
                $(`.nav-menu-inner[data-mega]`).slideUp();
                $(this).addClass('active');
                $(`.nav-menu-inner[data-mega="${type}"]`).slideDown();
            }
        })
    }

    function handleFaq() {
        $('.channels-faq-ques').on('click', function (e) {
            e.preventDefault();
            let wrapper = $(this).parent();
            if ($(this).hasClass('active')) {
                wrapper.find('.channels-faq-ans').slideUp();
                $(this).removeClass('active');
            } else {
                $('.channels-faq-ques').removeClass('active');
                $('.channels-faq-ans').slideUp();
                wrapper.find('.channels-faq-ans').slideDown();
                $(this).addClass('active');
            }
        })
    }

    if ($(window).width() > 768) {
        headerDesktop();
    } else {
        headerMobile();
    }

    function getFeatureTable() {
        // fetch('https://msg-website.webflow.io/data-page')
        //     .then(res => res.text())
        //     .then(table => {
        //         const html = new DOMParser().parseFromString(table, "text/html");
        //         const featureTable = $(html).find('.price-fea-main').html();
        //         $('.price-fea-main').append(featureTable);
        //         requestAnimationFrame(() => {
                    
        //         })
        //     });
        hanldeToggleTable();
        handleTabCountries();
    }

    function hanldeToggleTable() {
        $('.btn-main.mod-price-fea').on('click', function(e) {
            e.preventDefault();
            $('.btn-price-fea-inner').removeClass('active')
            if ($(this).hasClass('show')) {
                $(this).removeClass('show')
                $(this).addClass('hide')
                $('.btn-price-fea-inner.hide').addClass('active')
                $('.price-fea-main').slideDown();
            } else if ($(this).hasClass('hide')) {
                $(this).addClass('show')
                $(this).removeClass('hide')
                $('.btn-price-fea-inner.show').addClass('active')
                $('.price-fea-main').slideUp();
            }
        })
    }

    function handleTabCountries() {
        if ($(window).width() < 768) {
            let allCountry = $('.price-usage-country-item .price-usage-country-link');
            allCountry.each(function(e) {
                $('.price-usage-country-wrap-mb .price-usage-country-body-inner').append($(this))
            })

            $('.price-usage-country-body').on('click', function(e) {
                e.preventDefault();
                $('.price-usage-country-head').removeClass('open')
                $('.price-usage-country-body').removeClass('open')
            })

        }

        $('.price-usage-country-head').on('click', function(e) {
            e.preventDefault();
            $('.price-usage-country-head').toggleClass('open')
            $('.price-usage-country-body').toggleClass('open')
        });

        $('.price-usage-country-body .price-usage-country-link').on('click', function(e) {
            e.preventDefault();
            $('.price-usage-country-head').removeClass('open')
            $('.price-usage-country-body').removeClass('open')
        });
    }

    function handleUsageFilter() {
        let allItem = $('[data-filter="item-country"]');
        allItem.each(function(e) {
            let country = $(this).text();
            $(this).closest('[data-filter="item-wrap"]').attr('data-country',country);
        })

        $('.price-usage-country-link').on('click', function(e) {
            e.preventDefault();
            $('.price-usage-country-link').removeClass('active');
            $(this).addClass('active');
            let country = $(this).text();
            console.log(country);
            if ($(this).closest('.price-usage-country-body-inner').length) {
                console.log('inside')
                $('.price-usage-country-head .price-usage-country-head-txt').text(country);
                $('.price-usage-country-head').addClass('chosen');
            } else { 
                console.log('outside')
                $('.price-usage-country-head .price-usage-country-head-txt').text('Other countries');
                $('.price-usage-country-head').removeClass('chosen');
            }
            $('.price-usage-country-head').removeClass('open')
            $('.price-usage-country-body').removeClass('open')
            $('[data-country]').addClass('hidden');
            $('[data-country]').removeClass('mod-bg');
            $(`[data-country="${country}"]`).removeClass('hidden');

            let allGroup = $('.price-usage-cat-wrap');
            allGroup.each((i) => {
                for (let x = 0; x < allGroup.eq(i).find(`[data-country="${country}"]`).length; x++) {
                    if (x % 2 == 0) {
                        allGroup.eq(i).find(`[data-country="${country}"]`).eq(x).addClass('mod-bg')
                    }
                }
            })
        })

        $('.price-usage-country-link').eq(0).trigger('click');
    }

    function handleBlogSharing() {
        $('.blogdtl-share-ic').each(function(e) {
            if ($(this).hasClass('mod-fb')) {
                $(this).attr('href', `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`);
            } else if ($(this).hasClass('mod-tw')) {
                $(this).attr('href', `http://www.twitter.com/share?url=${window.location.href}`)
            } else if ($(this).hasClass('mod-in')) {
                $(this).attr('href', `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`)
            }
        })
    }

    function videoPopup() {
        $('[data-video="open"]').on('click', function(e) {
            e.preventDefault(); 
            document.querySelector('#homeVid').load();
            document.querySelector('#homeVid').play();
            $('.overlay-wrap').addClass('active');

        })
        $('.home-vid-close').on('click', function(e) {
            e.preventDefault();
            document.querySelector('#homeVid').pause();
            $('.overlay-wrap').removeClass('active');
        })
    }
    videoPopup();

    /* 
    Page Scripts 
    */

    const SCRIPT = {}
    SCRIPT.homeScript = () => {
        if ($(window).width() < 767) {
            $('.home-cases-nav').css('height', $('.home-cases-img-wrap').eq(0).height())
            $('.home-cases-tabs').css({
                '-ms-grid-rows': `${$('.home-cases-img-wrap').eq(0).height()}px 48px auto`,
                'grid-template-rows': `${$('.home-cases-img-wrap').eq(0).height()}px 48px auto`
            })
        }
        const homeCasesSwiper = new Swiper('.swiper.home-cases-cms', {
            slidesPerView: 1,
            spaceBetween: 0,
            navigation: {
                nextEl: '.home-cases-right',
                prevEl: '.home-cases-left',
            },
        });
        $('.home-cases-tabs-inner .btn-tab').eq(0).addClass('active');
        $('.home-cases-tabs-inner .btn-tab').on('click', function (e) {
            let index = $(this).index();
            $('.home-cases-tabs-inner .btn-tab').removeClass('active');
            $('.home-cases-tabs-inner .btn-tab').eq(index).addClass('active');
            homeCasesSwiper.slideTo(index)
        });
        homeCasesSwiper.on('activeIndexChange', function () {
            let index = homeCasesSwiper.activeIndex;
            $('.home-cases-tabs-inner .btn-tab').removeClass('active');
            $('.home-cases-tabs-inner .btn-tab').eq(index).addClass('active');
        })

        
    }
    SCRIPT.channelsScript = () => {
        handleFaq();
    }
    SCRIPT.priceScript = () => {
        console.log('pricing');
        $('.price-fea-main').slideUp(0);
        window.fsAttributes.push([
            'cmsnest',
            (listInstances) => {
                console.log('CmsNest done loading')
                handleUsageFilter();
                handleRowHover();
            },
        ]);
        getFeatureTable();

        $('.price-plans-head-inner .price-plans-item').on('click', function(e) {
            e.preventDefault();
            $('.price-plans-head-inner .price-plans-item').removeClass('active');
            $(this).addClass('active');
            let type = $(this).attr('data-tab');
            console.log(type)
            $('.price-plans-price-item').removeClass('active')
            $(`.price-plans-price-item[data-tab="${type}"]`).addClass('active')
            if (type == 'plans-month') {
                $('.price-plans-bg').addClass('active-mo');
                $('.price-plans-label').slideUp();
                console.log('month')
            } else {
                $('.price-plans-bg').removeClass('active-mo')
                $('.price-plans-label').slideDown();
                console.log('year')
            }
        });
        
        handleFaq();

        function handleRowHover() {
            $('.mod-price-fea-item').on('mouseenter', function(e) {
                e.preventDefault();
                let top = $(this).offset().top - $('.price-fea-main').eq(0).offset().top - 1;
                let height = $(this).height();
                $('.price-fea-main .price-row-hover').css('top',`${top}px`)
                $('.price-fea-main .price-row-hover').css('height',`${height}px`)
            });
            
            $('.price-fea-sub-cms').on('mouseenter', () => {
                $('.price-fea-main .price-row-hover').addClass('show')
            });
            $('.price-fea-sub-cms').on('mouseleave', () => {
                $('.price-fea-main .price-row-hover').removeClass('show')
            });
            
            $('.price-fea-main-grid.price-usage-main-item').on('mouseenter', function(e) {
                e.preventDefault();
                let top = $(this).offset().top - $('.price-usage-inner.price-usage-main').eq(0).offset().top - 1;
                let height = $(this).height();
                $('.price-usage-inner .price-row-hover').css('top',`${top}px`)
                $('.price-usage-inner .price-row-hover').css('height',`${height}px`)
            });

            $('.price-usage-cat-wrap').on('mouseenter', () => {
                $('.price-usage-inner .price-row-hover').addClass('show');
            })
            $('.price-usage-cat-wrap').on('mouseleave', () => {
                $('.price-usage-inner .price-row-hover').removeClass('show');
            })
        }

        function handleTooltip() {
            let tooltip = $('.ic-info-wrap');
            let allTitles = $('.txt-14.price-addon-item-richtxt h4');
            let allTooltipText = $('.txt-14.price-addon-item-richtxt p')

            for (let x = 0; x < allTitles.length; x++) {
                let content = allTooltipText.eq(x).text();
                if (content) {
                    allTitles.eq(x).append(tooltip.clone())
                    allTitles.eq(x).find('.txt-14.tooltip-txt').text(content)
                }
            }
        };
        //handleTooltip();

    }

    SCRIPT.featureScript = () => {
        console.log('feature');

        const feaOtherSwiper = new Swiper('.swiper.fea-other-cms', {
            slidesPerView: 1,
            spaceBetween: 24,
            navigation: {
                nextEl: '.fea-other-main-nav-btn.nav-right',
                prevEl: '.fea-other-main-nav-btn.nav-left',
            },
            breakpoints: {
                512: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                }
            }
        });

        let topMargin = ($('.fea-other-item-img-wrap').height() - $('.fea-other-main-nav-btn').height()) / 2;
        $('.fea-other-main-nav-btn').css('margin-top', topMargin);
    }

    SCRIPT.contactScript = () => {
        console.log('contact page')

        $('#CtcPhone').on('input', function(e) {
            let newValue = this.value.replace(new RegExp(/[^\d-. ]/,'ig'), "");
            this.value = newValue;
        });
        $('#RegionCode').on('input', function(e) {
            let newValue = this.value.replace(new RegExp(/[^\d-]/,'ig'), "");
            this.value = '+' + newValue;
        })

        // $('input[type="submit"]').on('click', function(e) {
        //     setTimeout(() => {
        //         lenis.scrollTo(0)
        //     }, 600);
        // })
    }
    SCRIPT.signupScript = () => {
        $('#PhoneSign').on('input', function(e) {
            let newValue = this.value.replace(new RegExp(/[^\d-. ]/,'ig'), "");
            this.value = newValue;
        });
        $('#RegionCodeSign').on('input', function(e) {
            let newValue = this.value.replace(new RegExp(/[^\d-]/,'ig'), "");
            this.value = '+' + newValue;
        })

        // $('input[type="submit"]').on('click', function(e) {
        //     setTimeout(() => {
        //         lenis.scrollTo(0)
        //     }, 600);
        // })
    }
    SCRIPT.blogsScript = () => {
        console.log('Blogs page')
        if (window.location.search == '') {
            $('.blogs-main-tag-txt.mod-reset').addClass('active');
            $('.blogs-main-tag-head .txt-16').text('All Articles');
        } else {
            let curVal = window.location.search.replace('?tag=','').replace('+',' ');
            console.log(curVal)
            $('.blogs-main-tag-head .txt-16').text(curVal);
        }

        $('.blogs-main-tag-wrap.mod-reset input[type="radio"]').on('change', function(e) {
            $(this).parent().find('span').addClass('active')
            let curVal = $(this).parent().find('span').text();
            $('.blogs-main-tag-head .txt-16').text(curVal);
            $('.blogs-main-tag-body').removeClass('active');
            $('.blogs-main-tag-wrap.mod-tag').removeClass('fs-cmsfilter_active');
            setTimeout(() => {
                checkPagiVisible()
            }, 200);
        })
        $('.blogs-main-tag-wrap.mod-tag input[type="radio"]').on('change', function(e) {
            $('.blogs-main-tag-wrap.mod-reset span').removeClass('active');
            let curVal = $(this).parent().find('span').text();
            $('.blogs-main-tag-head .txt-16').text(curVal);
            $('.blogs-main-tag-body').removeClass('active');
            setTimeout(() => {
                checkPagiVisible()
            }, 200);
        })
        $('.blogs-input-srch').on('change keyup', function(e) {
            console.log($(this).val())
            setTimeout(() => {
                checkPagiVisible()
            }, 200);
        })

        if ($(window).width() < 991) {
            $('.blogs-main-tag-head').on('click', function(e) {
                $('.blogs-main-tag-body').addClass('active');
            })
        }

        function checkPagiVisible() {
            if ($('.pagi-page-txt').length > 1) {
                $('.blogs-main-pagination').removeClass('hide')
            } else {
                $('.blogs-main-pagination').addClass('hide')
            }
        }
        
        window.fsAttributes.push([
            'cmsnest',
            (listInstances) => {
                console.log('cmsnest Successfully loaded!');
                for (let x = 0; x < $('.blog-tag-link-wrap').length; x++ ) {
                    let curVal = $('.blog-tag-link-wrap').eq(x).find('.blog-tag-txt').text();
                    console.log(curVal);
                    let curHref = '/blogs?tag=' + curVal.replace(' ','+');
                    $('.blog-tag-link-wrap').eq(x).attr('href',curHref)
                }
            },
        ]);
    }
    SCRIPT.blogdtlScript = () => {
        for (let x = 0; x < $('.blog-tag-link-wrap').length; x++ ) {
            let curVal = $('.blog-tag-link-wrap').eq(x).find('.blog-tag-txt').text();
            console.log(curVal);
            let curHref = '/blogs?tag=' + curVal.replace(' ','+');
            $('.blog-tag-link-wrap').eq(x).attr('href',curHref)
        };
        handleBlogSharing();
    }
    SCRIPT.industryScript = () => {
        console.log('Industry');
        
        const feaOtherSwiper = new Swiper('.swiper.fea-other-cms', {
            slidesPerView: 1,
            spaceBetween: 24,
            navigation: {
                nextEl: '.fea-other-main-nav-btn.nav-right',
                prevEl: '.fea-other-main-nav-btn.nav-left',
            },
            breakpoints: {
                512: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                }
            }
        });

        let topMargin = ($('.fea-other-item-img-wrap').height() - $('.fea-other-main-nav-btn').height()) / 2;
        $('.fea-other-main-nav-btn').css('margin-top', topMargin);
    }
    SCRIPT.aboutScript = () => {
        const feaOtherSwiper = new Swiper('.swiper.fea-other-cms', {
            slidesPerView: 1,
            spaceBetween: 24,
            navigation: {
                nextEl: '.fea-other-main-nav-btn.nav-right',
                prevEl: '.fea-other-main-nav-btn.nav-left',
            },
            breakpoints: {
                512: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                }
            }
        }); 
        let topMargin = ($('.fea-other-item-img-wrap').height() - $('.fea-other-main-nav-btn').height()) / 2;
        $('.fea-other-main-nav-btn').css('margin-top', topMargin);
    }

    const pageName = $('.main').attr('data-namespace');
    if (pageName) {
        SCRIPT[(`${pageName}Script`)]();
    }

}

window.onload = mainScript;