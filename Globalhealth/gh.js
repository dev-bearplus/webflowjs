const mainScript = () => {
    // Smooth Scroll
    $('html').css('scroll-behavior', 'initial')
    function easing(x) {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
    }
    const lenis = new Lenis({
        duration: 1.2,
        easing: easing,
        smooth: true,
        direction: 'vertical',
    })

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Header
    function handleHeader() {
        // Handle dropdown
        $('.header-link-inner').on('mouseenter', function (e) {
            e.preventDefault();
            if ($(this).parent().find('.header-dropdown').length) {
                $(this).parent().find('.header-dropdown').addClass('show');
                $(this).parent().find('.ic-header-link').addClass('show');
                addAltStyleRow('.header', '.header-dropdown.id-specs', '.txt-14.header-spec-link');
            }
        })
        $('.header-link-inner').on('mouseleave', function (e) {
            e.preventDefault();
            if ($(this).parent().find('.header-dropdown').length) {
                if ($(this).parent().find('.header-dropdown').is(':hover')) {
                } else {
                    $(this).parent().find('.header-dropdown').removeClass('show')
                    setTimeout(() => {
                        allHiddenSpecHeader.removeClass('visible');
                        $('.header #showMore').removeClass('hidden');
                        $('.header-dropdown.id-specs').removeClass('extend');
                        addAltStyleRow('.header', '.header-dropdown.id-specs', '.txt-14.header-spec-link');
                    }, 300);
                    $(this).parent().find('.ic-header-link').removeClass('show')
                }
            }
        });
        $('.header-dropdown').on('mouseleave', function (e) {
            e.preventDefault();
            $('.header-dropdown').removeClass('show');
            $('.ic-header-link').removeClass('show');
            if ($(this).parent().is(':hover')) {
            } else {
                setTimeout(() => {
                    allHiddenSpecHeader.removeClass('visible');
                    $('.header #showMore').removeClass('hidden');
                    $('.header-dropdown.id-specs').removeClass('extend');
                    addAltStyleRow('.header', '.header-dropdown.id-specs', '.txt-14.header-spec-link');
                }, 300);
            }
        })
        //Specialties remap
        const allHiddenSpecHeader = $('.header .id-specs .header-spec-link.w-condition-invisible');
        $(`<a id="showMore" class="txt-14 header-spec-link-underline" href="#">${allHiddenSpecHeader.length} more</a>`).appendTo('.header .id-specs .header-spec-inner');
        $('.header #showMore').on('click', function (e) {
            e.preventDefault();
            allHiddenSpecHeader.addClass('visible');
            $(this).addClass('hidden')
            $('.header-dropdown.id-specs').addClass('extend');
            addAltStyleRow('.header', '.header-dropdown.id-specs', '.txt-14.header-spec-link');
        })
        //Locations Remap
        getAdditionalHeader();
    };
    function handleHeaderTablet() {
        //Handle Header
        $('.header-links').slideUp(0);
        $('.header-trigger').on('click', function (e) {
            e.preventDefault();
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $('.header-links').slideUp().removeClass('active');
                $('.ic-header-link').removeClass('show')
                $('.header-dropdown').removeClass('show').slideUp();
                allHiddenSpecHeader.removeClass('visible');
                $('#seeMore').removeClass('hidden')
            } else {
                $(this).addClass('active');
                $('.header-links').slideDown().addClass('active');
            }
        });

        //Handle dropdown
        $('.header .header-dropdown').slideUp();
        $('.header-link-inner').on('click', function (e) {
            if ($(this).parent().find('.header-dropdown').length) {
                e.preventDefault();
                if ($(this).parent().find('.header-dropdown').hasClass('show')) {
                    $(this).parent().find('.header-dropdown').removeClass('show').slideUp();
                    $(this).parent().find('.ic-header-link').removeClass('show')
                    allHiddenSpecHeader.removeClass('visible');
                    $('#seeMore').removeClass('hidden')
                } else {
                    $(this).parent().find('.header-dropdown').addClass('show').slideDown();
                    $(this).parent().find('.ic-header-link').addClass('show')
                }
            }
        })
        const allHiddenSpecHeader = $('.header .id-specs .header-spec-link.w-condition-invisible');
        $(`<a id="showMore" class="txt-14 header-spec-link-underline" href="#">${allHiddenSpecHeader.length} more</a>`).appendTo('.header .id-specs .header-spec-inner');
        $('.header #showMore').on('click', function (e) {
            e.preventDefault();
            allHiddenSpecHeader.addClass('visible');
            $(this).addClass('hidden');
        })
        getAdditionalHeader();
    };
    function handleHeaderMobile() {
        //$('.nav').slideUp(0);
        //Locations remap
        getAdditionalHeader();

        // Trigger menu
        $('.header-trigger').on('click', function (e) {
            e.preventDefault();
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $('.header-act').removeClass('hidden');
                $('.ft-socials.mod-header').addClass('hidden');
                $('.nav').slideUp().removeClass('active');
                $('body').css('overflow', 'auto')
                $('.header').removeClass('active')
                $('.nav').get(0).scrollTo(0, 0)
            } else {
                $(this).addClass('active');
                $('.header-act').addClass('hidden')
                $('.ft-socials.mod-header').removeClass('hidden');
                $('.nav').slideDown().addClass('active');
                $('body').css('overflow', 'hidden')
                $('.header').addClass('active')
            }
        });

        //Specialties remap
        addHeaderSpecMobile();

        // Topic remap
        addHeaderTopicMobile();

        // Event remap
        addHeaderEventMobile();
    }

    function setupGlobal() {
        let pageList = ['event', 'eventdtl', 'join'];
        if (!pageList.includes($('.main').attr('data-namespace'))) {
            $('[data-footer="specialties"]').attr('href', '#').attr('data-bot-bar', 'specialties');
        }
    }
    if ($(window).width() < 768) {
        setupGlobal();
    }

    function handleBottomBar() {
        botBarSpec();
        botBarLocs();
        // Trigger
        $('[data-bot-bar]').on('click', function (e) {
            if ($(this).attr('data-bot-bar') != 'blog') {
                e.preventDefault();
            }
            $('.header-trigger').removeClass('active');
            $('.nav').slideUp().removeClass('active');
            $('.btbar-item').removeClass('active');
            let type = $(this).attr('data-bot-bar');
            $('.bot-bar-wrap').removeClass('active')
            $(`.bot-bar [data-bot-bar=${type}]`).addClass('active')
            $(`[data-bot-bar-content=${type}]`).addClass('active')
            noBottomBar();
        })
    }
    function botBarSpec() {
        let specHtml = $('.header .header-spec-inner').html();
        $('.bot-bar-wrap .bot-bar-main.id-spec').html(specHtml);
        $('.bot-bar-wrap .header-spec-link').addClass('txt-dark').removeClass('w-condition-invisible');

        //Setup searchOnType
        $('.bot-bar-wrap .bot-bar-main.id-spec .header-spec-item').attr('data-search', 'item-wrap')
        $('.bot-bar-wrap .header-spec-link').each(function () {
            let spec = $(this).text();
            $(this).attr('data-search', 'item')
            $(this).attr('href', `${currDomain}/search-result?type=Hospital%2CClinic&specialties=${encodeURIParam(spec)}`)
        })
    }
    function botBarLocs() {
        const allCity = $('.header .id-locs .header-reg-wrap').html();
        $('.bot-bar-wrap .id-loc').append(allCity)

        //Setup searchOnType
        $('.bot-bar-wrap .id-loc .header-spec-link, .bot-bar-wrap .id-loc .header-spec-title').attr('data-search', 'item')
        $('.bot-bar-wrap .id-loc .header-spec-link').parent().attr('data-search', 'item-wrap')
        $('.bot-bar-wrap .id-loc .header-spec-title').each(function () {
            let parent = $(this).closest('.header-reg-item');
            let countryWrap = $(document.createElement('div')).addClass('data-search-country-wrap').attr('data-search', 'item-wrap');
            countryWrap.append($(this))
            parent.prepend(countryWrap)
        })

    }
    function addHeaderSpecMobile() {
        let specHtml = $('.header .header-spec-inner').html();
        $('.nav .id-specs .nav-item-inner').html(specHtml);
        const allHiddenSpecNav = $('.nav .id-specs .header-spec-link.w-condition-invisible').parent();
        allHiddenSpecNav.remove();
        $(`<a id="showMore" class="txt-14 header-spec-link-underline" data-bot-bar="specialties" href="#">${allHiddenSpecNav.length} more specialties</a>`).appendTo('.nav .id-specs');
        $('.nav .id-specs .header-spec-link').each(function () {
            let spec = $(this).text();
            $(this).attr('href', `${currDomain}/search-result?type=Hospital%2CClinic&specialties=${encodeURIParam(spec)}`)
        })
    }
    function addHeaderTopicMobile() {
        fetch('https://healthcare-global.webflow.io/header')
            .then(res => res.text())
            .then(addHeader => {
                const html = new DOMParser().parseFromString(addHeader, "text/html");
                const allTopic = $(html).find('.home-topic-item')
                const showCount = 4;
                let hiddenCount = allTopic.length - showCount;
                allTopic.each(function (index) {
                    if (index < showCount) {
                        let href = $(this).find('.home-topic-item-link').attr('href');
                        let name = $(this).find('.home-topic-txt').text();
                        let item = $(document.createElement('a')).addClass('txt-14 header-spec-link').text(name).attr('href', href);
                        $('.nav .id-topic .nav-item-inner').append(item);
                    }
                })
                $(`<a id="showMore" class="txt-14 header-spec-link-underline" href="/health-a-z">${hiddenCount} more popular topics</a>`).appendTo('.nav .id-topic');
            });
    }
    function addHeaderEventMobile() {
        let allEvent = $('.home-evt-cms .home-evt-item-inner');
        const showCount = 2;
        allEvent.each(function (index) {
            if (index < showCount) {
                let name = $(this).find('.home-evt-item-title').text();
                let url = $(this).attr('href');
                let html = $(document.createElement('a')).addClass('txt-14 header-spec-link').text(name).attr('href', url);
                $('.nav .id-event .nav-item-inner').append(html)
            }
        })
    }

    //Additional Header 
    function getAdditionalHeader() {
        fetch('https://healthcare-global.webflow.io/header')
            .then(res => res.text())
            .then(addHeader => {
                const html = new DOMParser().parseFromString(addHeader, "text/html");
                const dropdown = $(html).find('.header-dropdown').html();
                $('.loading-wrap.mod-header').remove();
                $('.header-dropdown.id-locs').append(dropdown);
                requestAnimationFrame(() => {
                    locationRemap();
                    //Conditions Page
                    condHospitalFilter();
                    //Contact Page
                    contactAdditionalLocationSelect();

                    headerSearchLinks();
                    if ($(window).width() < 768) {
                        locationRemapMobile();
                        headerSearchLinksMobile();
                        handleBottomBar();
                    }
                })
            });
    }
    function condHospitalFilter() {
        if ($('.main').attr('data-namespace') == 'condition') {
            let headerDropdown = $('.header-dropdown.id-locs').html();
            $('.cond-hos-filter-dropdown').append(headerDropdown);

            //handle dropdown
            $('.cond-hos-input').on('mouseenter', function (e) {
                e.preventDefault();
                $(this).parent().find('.cond-hos-filter-dropdown').addClass('show')
            })
            $('.cond-hos-input').on('mouseleave', function (e) {
                e.preventDefault();
                if (!$(this).parent().find('.cond-hos-filter-dropdown').is(':hover')) {
                    $(this).parent().find('.cond-hos-filter-dropdown').removeClass('show')
                }
            });
            $('.cond-hos-filter-dropdown').on('mouseleave', function (e) {
                e.preventDefault();
                $('.cond-hos-filter-dropdown').removeClass('show')
            })

            $('.cond-hos-filter-dropdown .header-spec-link, .cond-hos-filter-dropdown .header-spec-title').on('click', function (e) {
                e.preventDefault();
                $('.decoy-form.decoy-form-tophos .srch-radio-wrap.decoy-location-reset input').trigger('click');
                let text = $(this).text();
                $('.cond-hos-input-wrap .cond-hos-filter-txt').text(text);
                setTimeout(() => {
                    $(`.sc-srch-hidden .decoy-form span:contains(${text})`).parent().find('.ic-radio').trigger('click');
                }, 1);
                $('.cond-hos-filter-dropdown').removeClass('show');
            })
        }
    }

    function locationRemap() {
        const allCity = $('.header .id-locs .header-reg-item');
        for (let x = 0; x < allCity.length; x++) {
            let country = $('.header .id-locs .header-reg-item').eq(x).find('.hidden-country').eq(0).text();
            $('.header .id-locs .header-reg-item').eq(x).find('.header-spec-title').text(country);
        }
    }
    function locationRemapMobile() {
        const allCity = $('.header .id-locs .header-reg-item .header-loc-item');
        const showCount = 4;
        let hiddenCount = allCity.length - showCount;
        allCity.each(function (index) {
            if (index < showCount) {
                allCity.eq(index).find('.header-spec-link').removeClass('txt-dark mod-bot-bar-loc')
                let locHtml = allCity.eq(index).html();
                let locWrap = $(document.createElement('div')).addClass('nav-loc-wrap').append(locHtml);
                $('.nav .id-locs .nav-item-inner').append(locWrap)
            }
        })
        $(`<a id="showMore" class="txt-14 header-spec-link-underline" data-bot-bar="locations" href="#">${hiddenCount} more locations</a>`).appendTo('.nav .id-locs');
    }
    function headerSearchLinks() {
        const headerSpecs = $('.header .id-specs .header-spec-link')
        $.each(headerSpecs, function (index, spec) {
            spec = $(this).text();
            $(this).attr('href', `${currDomain}/search-result?type=Hospital%2CClinic&specialties=${encodeURIParam(spec)}`)
        });
        const headerCities = $('.header .id-locs .header-spec-link')
        $.each(headerCities, function (index, city, country) {
            city = $(this).text();
            if ($(window).width() < 768) {
                $(this).addClass('txt-dark mod-bot-bar-loc')
            }
            country = $(this).parent().find('.hidden-country').text()
            $(this).attr('href', `${currDomain}/search-result?type=Hospital%2CClinic&countries=${encodeURIParam(country)}&cities=${encodeURIParam(city)}`)
        });
        const headerCountries = $('.header .id-locs .header-spec-title')
        $.each(headerCountries, function (index, country) {
            country = $(this).text();
            if ($(window).width() < 768) {
                $(this).addClass('mod-18')
            }
            $(this).attr('href', `${currDomain}/search-result?type=Hospital%2CClinic&countries=${encodeURIParam(country)}`)
        });
    }
    function headerSearchLinksMobile() {
        const headerCities = $('.nav .id-locs .header-spec-link')
        headerCities.each(function (city, country) {
            city = $(this).text();
            country = $(this).parent().find('.hidden-country').text()
            $(this).attr('href', `${currDomain}/search-result?type=Hospital%2CClinic&countries=${encodeURIParam(country)}&cities=${encodeURIParam(city)}`)
        });
    }

    // Utils 
    function isHovered(selector) {
        return $(selector + ":hover").length > 0
    }
    //encodeURIParam
    function encodeURIParam(str) {
        return encodeURIComponent(str).split('%20').join('+');
    }
    function decodeURIParam(str) {
        return decodeURIComponent((str).split('+').join(' '))
    }
    function openAppointPopup(cardClass) {
        $('[data-popup="true"]').on('click', function (e) {
            let card = $(this).closest(cardClass);
            let hospitals = card.find('.decoy-hos-item');
            let docName = card.find('.home-doc-name').text();
            if (!docName) {
                docName = card.find('.prov-doc-main-name').text();
            }
            if (hospitals.length <= 1) {
                let hosUrl = hospitals.eq(0).find('.hos-ext-link').attr('href');
                let hosEmail = hospitals.eq(0).find('.hos-email').text();
                if ($('.replace-spec').length == 0 || $('.replace-spec').html() == '') {
                    $(this).attr('href', `mailto:${hosEmail}?subject=Appointment`);
                } else {
                    $(this).attr('href', `mailto:${hosEmail}?subject=Appointment with ${docName} for ${$('.replace-spec').html()}`);
                }
            } else {
                e.preventDefault();
                $('.pop-doc-hos-main').html('');
                $('.popup-wrap').addClass('show')
                $('.popup-doc-hos-inner').find('.pop-doc-txt').text(docName)
                hospitals.each(function (index) {
                    let hosName = hospitals.eq(index).find('.home-doc-hos-name').text();
                    let hosUrl = hospitals.eq(index).find('.hos-ext-link').attr('href');
                    let hosEmail = hospitals.eq(index).find('.hos-email').text();
                    let html =
                        `<a href="#" class="txt-14 pop-doc-hos-btn w-inline-block" data-hos-url=${hosUrl} data-hos-email=${hosEmail}>
                            <div class="txt-14 pop-doc-hos-txt-btn">${hosName}</div>
                            <div class="ic-embed ic-14 ic-popup-btn-active w-embed">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" color="currentColor" viewBox="0 0 448 512">
                                <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"></path>
                                </svg>
                            </div>
                        </a>`;
                    $('.pop-doc-hos-main').append(html)
                });
                $('.pop-doc-hos-btn').on('click', function (e) {
                    e.preventDefault();
                    $('.pop-doc-hos-btn').removeClass('active')
                    $(this).addClass('active')
                    let email = $('.pop-doc-hos-btn.active').attr('data-hos-email');
                    if ($('.replace-spec').length == 0 || $('.replace-spec').html() == '') {
                        $('.popup-doc-hos-go-btn').attr('href', `mailto:${email}?subject=Appointment with ${docName}`).attr('target', '_blank');
                    } else {
                        $('.popup-doc-hos-go-btn').attr('href', `mailto:${email}?subject=Appointment with ${docName} ${$('.replace-spec').html()}`).attr('target', '_blank');
                    }
                });
                $('.pop-doc-hos-btn').eq(0).trigger('click');
            }
        })
    };
    function providerdtlOpenAppointPopup(cardClass) {
        $('[data-popup="true"]').on('click', function (e) {
            let card = $(this).closest(cardClass);
            let docName = card.find('[data-setup-blog="docName"]').text();
            let hosEmail = $('.data-email').text();
            let type = $(this).attr('data-popup-type');
            if (type == 'doctor') {
                if ($(window).width() > 768) {
                    if ($('.prov-doc-inner-spec').hasClass('hidden')) {
                        $(this).attr('href', `mailto:${hosEmail}?subject=Appointment with ${docName}`);
                    } else {
                        $(this).attr('href', `mailto:${hosEmail}?subject=Appointment with ${docName} for '${$('.prov-doc-inner-spec').find('.prov-innder-spec-name').text()}'`);
                    }
                } else {
                    if ($('.mb-prov-spec-popup').hasClass('show')) {
                        $(this).attr('href', `mailto:${hosEmail}?subject=Appointment with ${docName} for '${$('.mb-prov-spec-popup').find('.prov-hero-title').text()}'`);
                    } else {
                        if ($('.mb-prov-tab-spec .date-filter-txt').text() == 'All Specialties') {
                            $(this).attr('href', `mailto:${hosEmail}?subject=Appointment with ${docName}`);
                        } else {
                            $(this).attr('href', `mailto:${hosEmail}?subject=Appointment with ${docName} for '${$('.mb-prov-tab-spec .date-filter-txt').text()}'`);
                        }

                    }
                }
            } else if (type == 'specEnquiry') {
                $(this).attr('href', `mailto:${hosEmail}?subject=Enquiry for '${$('.prov-doc-inner-spec').find('.prov-innder-spec-name').text()}'`);
            } else if (type == 'specAppoint') {
                $(this).attr('href', `mailto:${hosEmail}?subject=Appointment for '${$('.prov-doc-inner-spec').find('.prov-innder-spec-name').text()}'`);
            }

        })
    };
    function openAppointPopupPerson() {
        $('[data-popup="true"]').on('click', function (e) {
            let card = $('.doc-main-hos-cms');
            let hospitals = card.find('.doc-main-hos-item');
            let docName = $('.doc-main-info').find('.doc-main-name').text();
            let type = $(this).attr('data-popup-type');
            let typeName;
            let multipleHosBtn = $('.btn.primary.popup-doc-hos-go-btn .txt-14.btn-primary-txt.mod-popup');
            if (type == 'appoint') {
                typeName = 'Appointment';
                multipleHosBtn.text('Make appointment')
            } else if (type == 'enquiry') {
                typeName = 'Enquiry';
                multipleHosBtn.text('Make enquiry')
            }

            //multipleHosBtn.text(typeName)
            if (hospitals.length <= 1) {
                let hosUrl = hospitals.eq(0).find('.hos-ext-link').attr('href');
                let hosEmail = hospitals.eq(0).find('.hos-email').text();
                if ($('.replace-spec').length == 0 || $('.replace-spec').html() == '') {
                    $(this).attr('href', `mailto:${hosEmail}?subject=${typeName}`);
                } else {
                    $(this).attr('href', `mailto:${hosEmail}?subject=${typeName} with ${docName} for ${$('.replace-spec').html()}`);
                }

            } else {
                e.preventDefault();
                $('.pop-doc-hos-main').html('');
                $('.popup-wrap').addClass('show')
                $('.popup-doc-hos-inner').find('.pop-doc-txt').text(docName)
                hospitals.each(function (index) {
                    let hosName = hospitals.eq(index).find('.doc-main-hos-name').text();
                    let hosUrl = hospitals.eq(index).find('.hos-ext-link').attr('href');
                    let hosEmail = hospitals.eq(index).find('.hos-email').text();
                    let html =
                        `<a href="#" class="txt-14 pop-doc-hos-btn w-inline-block" data-hos-url=${hosUrl} data-hos-email=${hosEmail}>
                        <div class="txt-14 pop-doc-hos-txt-btn">${hosName}</div>
                        <div class="ic-embed ic-14 ic-popup-btn-active w-embed">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" color="currentColor" viewBox="0 0 448 512">
                            <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"></path>
                            </svg>
                        </div>
                    </a>`;
                    $('.pop-doc-hos-main').append(html)
                });

                $('.pop-doc-hos-btn').on('click', function (e) {
                    e.preventDefault();
                    $('.pop-doc-hos-btn').removeClass('active')
                    $(this).addClass('active')
                    let email = $('.pop-doc-hos-btn.active').attr('data-hos-email');
                    if ($('.replace-spec').length == 0 || $('.replace-spec').html() == '') {
                        $('.popup-doc-hos-go-btn').attr('href', `mailto:${email}?subject=${typeName} with ${docName}`).attr('target', '_blank');
                    } else {
                        $('.popup-doc-hos-go-btn').attr('href', `mailto:${email}?subject=${typeName} with ${docName} ${$('.replace-spec').html()}`).attr('target', '_blank');
                    }
                });
                $('.pop-doc-hos-btn').eq(0).trigger('click')
            }
        })
    }
    function setupProivderEmail() {
        $('[data-setup-email="wrap"]').each(function () {
            let hosEmail = $(this).find('[data-setup-email="email"]').text();
            if ($('.replace-spec').html() == '') {
                $(this).find('[data-setup-email="appoint"]').attr('href', `mailto:${hosEmail}?subject=Appointment`);
                $(this).find('[data-setup-email="enquiry"]').attr('href', `mailto:${hosEmail}?subject=Enquiry`);
            } else {
                $(this).find('[data-setup-email="appoint"]').attr('href', `mailto:${hosEmail}?subject=Appointment ${$('.replace-spec').html()}`);
                $(this).find('[data-setup-email="enquiry"]').attr('href', `mailto:${hosEmail}?subject=Enquiry ${$('.replace-spec').html()}`);
            }
        })
    }
    setupProivderEmail();

    function closeAppointPopup() {
        $('.popup-close, .popup-doc-hos-go-btn').on('click', function (e) {
            $('.popup-wrap').removeClass('show')
        });
    }
    function handleTab() {
        $('[data-tab-head]').on('click', function (e) {
            e.preventDefault();
            let type = $(this).attr('data-tab-head');
            $('[data-tab-head]').removeClass('active')
            $(this).addClass('active')
            $('[data-tab-content]').removeClass('active')
            $(`[data-tab-content=${type}]`).addClass('active')
        })
    }
    function noBottomBar() {
        let pageList = ['persondtl', 'providerdtl'];
        if (pageList.includes($('.main').attr('data-namespace'))) {
            $('.bot-bar').removeClass('hidden')
        }
    }
    function addTargetBlankToMailTo() {
        $('a[href^="mailto:"]').attr('target', '_blank');
    }

    // Common vars
    const currDomain = window.location.origin;
    //Search terms
    let srchCountry = '';
    let srchCity = '';
    let srchSpec = '';
    let searchSubmit;
    if ($(window).width() > 768) {
        searchSubmit = $('#homeSearch');
    } else {
        searchSubmit = $('#homeSearchMobile');
    }
    function updateHref() {
        let searchHref = `${currDomain}/search-result?type=Hospital%2CClinic&countries=${srchCountry}&cities=${srchCity}&specialties=${srchSpec}`;
        searchSubmit.attr('href', searchHref);
    }
    updateHref();
    function getDataToSrch(item) {
        let currData = item.parent().find('span')
        let value = currData.text();
        let type = currData.attr('data-srch');
        if (type == 'specialties') {
            $('[data-input="specialties"]').val(value)
            srchSpec = encodeURIParam(value);
        } else if (type == 'countries') {
            $('[data-input="locations"]').val(value)
            srchCountry = encodeURIParam(value);
            srchCity = '';
        } else if (type == 'cities') {
            $('[data-input="locations"]').val(value)
            srchCountry = item.parent('.srch-radio-wrap').parent().find('.hidden-country').text();
            srchCity = encodeURIParam(value);
        } else if (type == 'all-specialties') {
            $('[data-input="specialties"]').val(value)
            srchSpec = '';
        } else if (type == 'all-locations') {
            $('[data-input="locations"]').val(value)
            srchCountry = '';
            srchCity = '';
        }
    }

    // Home Page
    // Search input function
    function searchOnType() {
        $('[data-search="input"]').on('input propertychange keyup change', function (e) {
            let query = $.trim($(this).val().toLowerCase());
            if (query) {
                $(this).closest('[data-search="wrap"]').find('.srch-radio-wrap.w-condition-invisible').addClass('visible');
                $(this).closest('[data-search="wrap"]').find('#showMore').addClass('hidden');
                $('[data-search="dropdown"]').removeClass('extend');
                $(this).closest('[data-search="wrap"]').find('[data-search="item"]').each(function (e) {
                    let searchField = $(this).text().toLowerCase();
                    if (searchField.indexOf(query) !== -1) {
                        $(this).closest('[data-search="item-wrap"]').fadeIn();
                    } else {
                        $(this).closest('[data-search="item-wrap"]').fadeOut();
                    }
                })
                $(this).closest('[data-search="wrap"]').find('[data-search="dropdown"]').addClass('typing')
            } else {
                $('[data-search="item"]').closest('[data-search="item-wrap"]').fadeIn();
                $(this).closest('[data-search="wrap"]').find('.srch-radio-wrap.w-condition-invisible').removeClass('visible');
                $(this).closest('[data-search="wrap"]').find('#showMore').removeClass('hidden');
                $(this).closest('[data-search="wrap"]').find('[data-search="dropdown"]').removeClass('typing');
                $(this).closest('[data-search="wrap"]').find('[data-search="dropdown"]').removeClass('extend');
            }

            $('[data-search="item"]').parent().on('click', function (e) {
                $('[data-search="item"]').closest('label').parent().fadeIn();
                $(this).closest('[data-search="wrap"]').find('.srch-radio-wrap.w-condition-invisible').removeClass('visible');
                $(this).closest('[data-search="wrap"]').find('#showMore').removeClass('hidden');
                $('[data-search="dropdown"]').removeClass('extend');
                $('[data-search="dropdown"]').removeClass('typing');
            })

            $('[fs-cmsfilter-element="reset"]').on('click', function (e) {
                $('[data-search="item"]').closest('[data-search="item-wrap"]').fadeIn();
            })

            addAltStyleRow('', '.home-hero-spec.srch-hero-dropdown', '.srch-radio-wrap');
            addAltStyleRow('', '.srch-hero-dropdown.mod-spec', '.srch-radio-wrap');
        })
    }
    searchOnType();

    // Additional Home Content 
    function AdditionalTopics() {
        fetch('https://healthcare-global.webflow.io/header')
            .then(res => res.text())
            .then(addHeader => {
                const html = new DOMParser().parseFromString(addHeader, "text/html");
                const topic = $(html).find('.home-topic-cms-wrap').html();
                $('.sc-home-blog .home-topic-cms-wrap').append(topic);
                removeAdditionalTopic($('.home-topic-cms-wrap .home-topic-item'));
            });
    }
    function removeAdditionalTopic(array) {
        let parent = array.eq(0).parent().parent();
        if ($(window).width() > 768) {
            parentWidth = parent.width();
        } else {
            parentWidth = parent.width() * 8.5 / 10 * 2;
        }
        let itemWidth = 0;
        array.each(function (e, i) {
            itemWidth += $(this).outerWidth(true);
            if (itemWidth > parentWidth) {
                //$(this).remove()
                $(this).css('display', 'hidden')
            } else {
                $(this).css('display', 'block')
            }
        })
        if (itemWidth > parentWidth) {
            addSeeMoreTopic();
        }
        function addSeeMoreTopic() {
            let seeMore = $(`<div role="listitem" class="home-topic-item seemore" style="display: block;"><a href="#" class="home-topic-item-link w-inline-block"><div class="txt-14 home-topic-txt">See more...</div></a></div>`)
            array.eq(0).parent().append(seeMore);
            $('.home-topic-item.seemore').on('click', function(e) {
                e.preventDefault();
                array.css('display','block')
                $(this).remove()
            })   
        }
    }

    // Home Hero search Specialties remap
    function homeHeroDropSpec(allHiddenSpecHero) {
        if ($(window).width() > 768) {
            $('.srch-hero-dropdown.home-hero-spec .group-hos-spec .group-hos-spec-inner').prepend($('.srch-hero-dropdown.home-hero-spec .srch-radio-wrap.decoy-spec-reset'))
        }
        $(`<a id="showMore" class="txt-14 drop-spec-link-underline" href="#">${allHiddenSpecHero.length} more</a>`).appendTo('.home-hero-srch-wrap .group-hos-spec .group-hos-spec-inner');
        $('.home-hero-srch-wrap #showMore').on('click', function (e) {
            e.preventDefault();
            allHiddenSpecHero.addClass('visible');
            $(this).addClass('hidden')
            $('.srch-hero-dropdown.home-hero-spec').addClass('extend');
            addAltStyleRow('', '.home-hero-spec.srch-hero-dropdown', '.srch-radio-wrap');
        })
    }

    // Home Hero search
    function searchHomeHero(allHiddenSpecHero) {
        //Handle dropdown - Open dropdown on click input
        $('.home-hero-srch-wrap .srch-hero-input-field').on('click focus', function (e) {
            $('.srch-hero-dropdown').removeClass('show')
            $(this).parent().find('.srch-hero-dropdown').addClass('show');
            addAltStyleRow('', '.home-hero-spec.srch-hero-dropdown', '.srch-radio-wrap');
        });
        //Handle dropdown - Close dropdown on blur input
        $('.home-hero-srch-wrap .srch-hero-input-field').on('blur', function (e) {
            if (!$(this).parent().find('.srch-hero-dropdown').is(':hover')) {
                $(this).parent().find('.srch-hero-dropdown').removeClass('show');
                allHiddenSpecHero.removeClass('visible');
                if (!$('.srch-hero-dropdown.home-hero-spec').hasClass('typing')) {
                    $('.home-hero-srch-wrap #showMore').removeClass('hidden');
                }
                $('.srch-hero-dropdown.home-hero-spec').removeClass('extend');
                addAltStyleRow('', '.home-hero-spec.srch-hero-dropdown', '.srch-radio-wrap');
            }
        });
        // Close dropdown on click item & get item's value
        $('.home-hero-srch-wrap .srch-hero-dropdown .ic-radio').on('click', function (e) {
            $(this).closest('.srch-hero-dropdown').removeClass('show');
            $('.home-hero-srch-wrap .group-hos-spec .srch-radio-wrap.w-condition-invisible').removeClass('visible');
            $('.srch-hero-dropdown.home-hero-spec #showMore').removeClass('hidden');
            $('.srch-hero-dropdown.home-hero-spec').removeClass('extend');
            addAltStyleRow('', '.home-hero-spec.srch-hero-dropdown', '.srch-radio-wrap');
            getDataToSrch($(this));
            updateHref();
            let currValue = $(this).parent().find('span').text();
            if (currValue == 'All') {
                // If value is "All"
                let currCriteria = $(this).closest('.srch-input-field-wrap').find('.srch-hero-input-field')
                if (currCriteria.hasClass('mod-location')) {
                    $(this).closest('.srch-input-field-wrap').find('.srch-hero-input-field').val('All Locations')
                } else if (currCriteria.hasClass('mod-spec')) {
                    $(this).closest('.srch-input-field-wrap').find('.srch-hero-input-field').val('All Specialties')
                }
            }
        });
    };

    function homeHeroDropLoc() {
        const allCountries = $('.srch-hero-dropdown.home-hero-loc .group-hos-country .w-dyn-item');
        for (let x = 0; x < allCountries.length; x++) {
            let name = allCountries.eq(x).find('span').text()
            //allCountries.eq(x).find('.srch-radio-wrap').attr('data-country-name', name)
            let html = allCountries.eq(x).html();
            let countryWrap = $(document.createElement('div')).attr('data-search', 'item-wrap').append(html)
            let wrapEl = $(document.createElement('div')).addClass('remap-country-item').attr('data-country-name', name).append(countryWrap)
            $('.remap.home-spec').append(wrapEl)
        }

        const allCities = $('.srch-hero-dropdown.home-hero-loc .group-hos-location .w-dyn-item');
        for (let x = 0; x < allCities.length; x++) {
            let countryName = allCities.eq(x).find('.hidden-country').text();
            let html = allCities.eq(x).html();
            let wrapEl = $(document.createElement('div')).addClass('remap-city-item').attr('data-search', 'item-wrap').append(html);
            $(`.remap-country-item:contains("${countryName}")`).append(wrapEl);
        }
        $('.group-hos-country, .group-hos-location').remove();
        //$('.srch-radio-wrap.mod-country span').addClass('txt-12 bold span-country')
    }

    function homemagSearch() {
        // Setup layout
        $('.home-mag-item').removeClass('hidefornow')

        // Remap year/month
        const allYears = [];
        $('.home-mag-year').each(function () {
            allYears.push($(this).text())
        })
        var uniqYears = [];
        $.each(allYears, function (i, el) {
            if ($.inArray(el, uniqYears) === -1) uniqYears.push(el);
        });

        for (x = 0; x < uniqYears.length; x++) {
            let yearTxt = $(document.createElement('div')).addClass('txt-12 bold home-mag-item-year').text(uniqYears[x]);
            let monthsWrap = $(document.createElement('div')).addClass('home-mag-item-months');
            let yearWrap = $(document.createElement('div')).addClass('swiper-slide remap-home-mag-item').attr('data-year', uniqYears[x]).append(yearTxt).append(monthsWrap);
            $('.remap-home-mag-wrap').append(yearWrap);
        }

        const allMonths = $('.date-filter-item');
        for (let x = 0; x < allMonths.length; x++) {
            let year = $('.date-filter-item').eq(x).find('.home-mag-year').text();
            const html = $('.date-filter-item').eq(x).html();
            const wrap = $(document.createElement('div')).addClass('home-mag-month-wrap').append(html)
            $(`.swiper-slide.remap-home-mag-item[data-year=${year}] .home-mag-item-months`).append(wrap);
        }

        // Handle dropdown
        $(".date-input-wrap").on('click', function (e) {
            e.preventDefault();
            if ($(this).parent().find('.date-filter-dropdown').hasClass('show')) {
                $(this).parent().find('.date-filter-dropdown').removeClass('show')
                $('.home-mag-srch-wrap .overlay').removeClass('show')
            } else {
                $(this).parent().find('.date-filter-dropdown').addClass('show')
                $('.home-mag-srch-wrap .overlay').addClass('show')
            }
        })

        $(".date-filter-wrap .home-mag-month").on('click', function (e) {
            $(this).parent().find('.ic-radio').trigger('click')
            $('.date-filter-wrap .date-filter-dropdown').removeClass('show')
            $('.home-mag-srch-wrap .overlay').removeClass('show')
        })
        $(".date-filter-wrap .overlay.show").on('click', function (e) {
            $('.date-filter-wrap .date-filter-dropdown').removeClass('show')
            $('.home-mag-srch-wrap .overlay').removeClass('show')
        })
        $('.remap-home-mag .ic-radio').on('click', function (e) {
            let name = $(this).parent().find('.date-mag-txt').text();
            $('.date-input-wrap').find('.date-filter-txt').text(name);
            $(`.date-fitler-cms .txt-14.date-mag-txt:contains(${name})`).parent().find('.ic-radio').trigger('click')
        })
        $('.date-filter-dropdown .ic-radio').eq(0).trigger('click');

        // Create Swiper 
        const homeMagSwiper = new Swiper('.remap-home-mag', {
            slidesPerView: 1,
            spaceBetween: 32,
            navigation: {
                nextEl: '.date-nav-next',
                prevEl: '.date-nav-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                }
            }
        });
        $('.date-input-wrap').on('blur', function (e) {
            if (!$('.date-filter-dropdown').is(':hover')) {
                $('.date-filter-dropdown').removeClass('show')
                $('.home-mag-srch-wrap .overlay').removeClass('show')
            }
        })
    }

    function homeHospital() {
        const allHosGroup = $('.home-hos-country-wrap');
        allHosGroup.each(function (index) {
            let parentCountry = $(this).find('.home-hos-flag-title').text();
            let hosListByCountry = $(this).find('.data-for-nest');
            hosListByCountry.each(function (i) {
                let country = $(this).text();
                if (country != parentCountry) {
                    $(this).parent('.home-hos-country-item').remove();
                }
            })

            let countAll = $(this).find('.home-hos-country-item');
            let countResult = countAll.length - 4;

            countAll.each(function (i) {
                if (i >= 4) {
                    $(this).remove();
                }
            })
            if (countResult > 0) {
                $(this).find('.span-count').text(countResult)
            } else {
                $(this).find('.home-hos-seemore').addClass('hidden')
            };

            $(this).find('[data-srch-link]').attr('href', `${currDomain}/search-result?type=Hospital%2CClinic&countries=${encodeURIParam(parentCountry)}`)
        })
    }

    // Mobile Homepage search Widget 
    function handleHomeWidgetMobile() {
        // Handle popup
        $('[data-widget]').on('click', function (e) {
            e.preventDefault();
            let type = $(this).attr('data-widget');
            if (type == 'open') {
                $('body').css('overflow', 'hidden')
                $('.home-srch-widget-wrap').addClass('show');
                $('.home-srch-widget-main').addClass('show');

                // Reset active inputs
                $('.srch-widget-head').removeClass('active')
                $('.srch-widget-head').eq(0).addClass('active')
                $('.srch-widget-head').parent().find('.srch-widget-content').slideUp();
                $('.srch-widget-head').eq(0).parent().find('.srch-widget-content').slideDown();

            } else if (type == 'close') {
                $('body').css('overflow', 'auto')
                $('.home-srch-widget-wrap').removeClass('show');
                $('.home-srch-widget-main').removeClass('show');
                $('.srch-widget-content.id-spec #showMore').removeClass('hidden');
                $('.srch-widget-content.id-spec .w-condition-invisible').removeClass('visible');

                $('.srch-widget-head').removeClass('active');
                $('.srch-widget-head').parent().find('.srch-widget-content').slideUp();
            }
        });

        // Setup data
        // Specialties
        let specHtml = $('.group-hos-spec .group-hos-spec-inner').html();
        $('.srch-widget-content.id-spec .srch-widget-content-main').html(specHtml)
        $('.srch-widget-content.id-spec #showMore').on('click', function (e) {
            e.preventDefault();
            $(this).addClass('hidden')
            $('.srch-widget-content.id-spec .w-condition-invisible').addClass('visible');
            addAltStyleRow('', '.home-hero-spec.srch-hero-dropdown', '.srch-radio-wrap');
        })
        // Location
        let locHtml = $('.home-hero-loc .remap.home-spec').html()
        $('.srch-widget-content.id-loc .srch-widget-content-main').html(locHtml)

        // Handle Select between field
        $('.srch-widget-head').on('click', function (e) {
            e.preventDefault();
            if ($(this).hasClass('active')) {
                $(this).removeClass('active')
                $('.srch-widget-item .srch-widget-content').slideUp();
            } else {
                $('.srch-widget-head').removeClass('active')
                $(this).addClass('active')
                $('.srch-widget-item .srch-widget-content').slideUp();
                $(this).parent().find('.srch-widget-content').slideDown();
            }
        })

        //Handle Select Radio
        $('.srch-widget-content .ic-radio').on('click', function (e) {
            let value = $(this).parent().find('span').text();
            if ($(this).closest('.srch-widget-content').hasClass('id-spec')) {
                $('.srch-widget-text.id-spec').text(value);
            } else if ($(this).closest('.srch-widget-content').hasClass('id-loc')) {
                $('.srch-widget-text.id-loc').text(value);
            }
            $('.srch-widget-head').removeClass('active')
            $('.srch-widget-item .srch-widget-content').slideUp();
            getDataToSrch($(this));
            updateHref();
        })

        //Handle Clear all
        $('[data-widget="reset"]').on('click', function (e) {
            e.preventDefault();
            $('.srch-widget-text.id-spec').text('All Specialties');
            $('.srch-widget-text.id-loc').text('All Locations');
            srchCountry = '';
            srchCity = '';
            srchSpec = '';
            updateHref();
        })
    }

    // Mobile Searchpage search Widget
    function handleSrchWidgetMobile() {
        // Handle popup
        $('[data-widget]').on('click', function (e) {
            e.preventDefault();
            let type = $(this).attr('data-widget');
            if (type == 'open') {
                $('body').css('overflow', 'hidden')
                $('.home-srch-widget-wrap').addClass('show');
                $('.home-srch-widget-main').addClass('show');

                // Reset active inputs
                $('.srch-widget-head').removeClass('active')
                $('.srch-widget-head').eq(0).addClass('active')
                $('.srch-widget-head').parent().find('.srch-widget-content').slideUp();
                $('.srch-widget-head').eq(0).parent().find('.srch-widget-content').slideDown();
            } else if (type == 'close') {
                $('body').css('overflow', 'auto')
                $('.home-srch-widget-wrap').removeClass('show');
                $('.home-srch-widget-main').removeClass('show');
                $('.srch-widget-content.id-spec #showMore').removeClass('hidden');
                $('.srch-widget-content.id-spec .w-condition-invisible').removeClass('visible');

                $('.srch-widget-head').removeClass('active');
                $('.srch-widget-head').parent().find('.srch-widget-content').slideUp();
            }
        });

        // Setup data
        // Specialties
        let specHtml = $('.srch-hero-dropdown.mod-spec .srch-hero-spec-inner').html();
        $('.srch-widget-content.id-spec .srch-widget-content-main').html(specHtml)
        const allHiddenSpecHeader = $('.srch-widget-content.id-spec .srch-widget-content-main .srch-radio-wrap.w-condition-invisible');
        $(`<a id="showMore" class="txt-14 drop-spec-link-underline" href="#">${allHiddenSpecHeader.length} more</a>`).appendTo('.srch-widget-content.id-spec .srch-widget-content-main');
        $('.srch-widget-content.id-spec #showMore').on('click', function (e) {
            e.preventDefault();
            $(this).addClass('hidden')
            $('.srch-widget-content.id-spec .w-condition-invisible').addClass('visible');
            addAltStyleRow('', '.home-hero-spec.srch-hero-dropdown', '.srch-radio-wrap');
        })

        // Location
        let locHtml = $('.srch-hero-dropdown.mod-location .remap.home-spec').html();
        $('.srch-widget-content.id-loc .srch-widget-content-main').html(locHtml);
        $('.srch-widget-content.id-loc .srch-widget-content-main .remap-country-item').css('margin-bottom', '8px')
        $('.srch-widget-content.id-loc .srch-widget-content-main .remap-country-item-wrap').css('margin-bottom', '24px')

        // Handle Select between field
        $('.srch-widget-head').on('click', function (e) {
            e.preventDefault();
            if ($(this).hasClass('active')) {
                $(this).removeClass('active')
                $('.srch-widget-item .srch-widget-content').slideUp();
            } else {
                $('.srch-widget-head').removeClass('active')
                $(this).addClass('active')
                $('.srch-widget-item .srch-widget-content').slideUp();
                $(this).parent().find('.srch-widget-content').slideDown();
            }
        });

        //Handle Select Radio
        $('.srch-widget-content .ic-radio').on('click', function (e) {
            let value = $(this).parent().find('span').text();
            if ($(this).closest('.srch-widget-content').hasClass('id-spec')) {
                // Specialties
                let curIndex = $(this).parent().parent().attr('data-index-srch');
                $('.srch-widget-text.id-spec, .widget-txt-spec').text(value);
                $('.replace-spec').text(`for '${value}'`)
                $('.replace-spec.mod-in').text(`in ${value}`)
                $('.main-secondary-form .group-hos-spec').find('.decoy-spec-item').eq(curIndex).find('.ic-radio').trigger('click')
                $('.decoy-form-tophos .group-hos-spec').find('.decoy-spec-item').eq(curIndex).find('.ic-radio').trigger('click')
                $('.decoy-form-topdoc .group-hos-spec').find('.decoy-spec-item').eq(curIndex).find('.ic-radio').trigger('click')
            } else if ($(this).closest('.srch-widget-content').hasClass('id-loc')) {
                // Locations
                let curIndex = $(this).parent().attr('data-index-srch');
                $('.srch-widget-text.id-loc, .widget-txt-loc').text(value);
                $('.replace-location').text(` in ${value}`)
                let type = $(this).parent().parent().attr('class');
                if (type == 'remap-country-item') {
                    // Country
                    resetLocSecondary()
                    $('.decoy-form-tophos .decoy-location-reset').trigger('click')
                    setTimeout(() => {
                        $('.main-secondary-form .group-hos-country').find('.decoy-country-item').eq(curIndex).find('.ic-checkbox').trigger('click')
                        $('.decoy-form-tophos .group-hos-country').find('.decoy-country-item').eq(curIndex).find('.ic-radio').trigger('click')
                    }, 400);
                } else if (type == 'remap-city-item') {
                    // City
                    resetLocSecondary()
                    $('.decoy-form-tophos .decoy-location-reset').trigger('click')
                    setTimeout(() => {
                        $('.decoy-form-tophos .group-hos-location').find('.decoy-location-item').eq(curIndex).find('.ic-radio').trigger('click')
                    }, 400);
                }
            }
            $('.srch-widget-head').removeClass('active')
            $('.srch-widget-item .srch-widget-content').slideUp();
        })

        //Handle submit
        $('#homeSearchMobile').on('click', function (e) {
            e.preventDefault();
            $('[data-widget="close"]').trigger('click');
        })
        //Handle Clear all
        $('[data-widget="reset"]').on('click', function (e) {
            e.preventDefault();
            // Reset text
            $('.srch-widget-text.id-spec, .widget-txt-spec').text('All Specialties');
            $('.srch-widget-text.id-loc, .widget-txt-loc').text('All Locations');

            // Reset Locations
            resetLocSecondary()
            $('.decoy-form-tophos .decoy-location-reset').trigger('click')
            // Reset Specialties
            $('.main-secondary-form .decoy-spec-reset').trigger('click')
            $('.decoy-form-tophos .decoy-spec-reset').trigger('click')
            $('.decoy-form-topdoc .decoy-spec-reset').trigger('click')
        });
    }


    // Search Result Page
    function remapSrchHeroDrop() {
        // Specialties, get index and store in data-attr
        const allSpec = $('.srch-hero-spec-cms-item');
        for (let x = 0; x < allSpec.length; x++) {
            let index = $('.srch-hero-spec-cms-item').eq(x).index();
            $('.srch-hero-spec-cms-item').eq(x).attr('data-index-srch', index);
        }


        if ($(window).width() > 768) {
            $('.srch-hero-dropdown.mod-spec .srch-hero-spec-inner').prepend($('.srch-hero-dropdown.mod-spec .srch-radio-wrap.decoy-spec-reset'))
        }

        // Country
        const allCountries = $('.srch-hero-country-cms-item');
        for (let x = 0; x < allCountries.length; x++) {
            let index = allCountries.eq(x).index();
            allCountries.eq(x).find('label').attr('data-index-srch', index);
            let name = allCountries.eq(x).find('span').text()
            let html = allCountries.eq(x).html() //label
            let CountryEl = $(document.createElement('div')).addClass('remap-country-item').attr('data-search', 'item-wrap').append(html) //Country wrap
            let wrapEl = $(document.createElement('div')).addClass('remap-country-item-wrap').attr('data-country-name', name).append(CountryEl) // Big wrap + country name
            $('.remap.home-spec').append(wrapEl)
        }
        // City
        const allCities = $('.srch-hero-city-cms-item');
        for (let x = 0; x < allCities.length; x++) {
            let index = allCities.eq(x).index();
            allCities.eq(x).find('label').attr('data-index-srch', index);
            let countryName = allCities.eq(x).find('.hidden-country').text();
            let html = allCities.eq(x).html();
            let wrapEl = $(document.createElement('div')).addClass('remap-city-item').attr('data-search', 'item-wrap').append(html);
            $(`.remap-country-item-wrap:contains("${countryName}")`).append(wrapEl);
        };
        $('.srch-hero-dropdown.mod-location .group-hos-country, .srch-hero-dropdown.mod-location .group-hos-location').remove();
    }
    function searchHeroDropSpec(allHiddenSpecHero) {
        $(`<a id="showMore" class="txt-14 drop-spec-link-underline" href="#">${allHiddenSpecHero.length} more</a>`).appendTo('.srch-hero-dropdown.mod-spec .srch-hero-spec-inner');
        $('.srch-hero-dropdown.mod-spec .srch-hero-spec-inner #showMore').on('click', function (e) {
            e.preventDefault();
            allHiddenSpecHero.addClass('visible');
            $(this).addClass('hidden')
            $('.srch-hero-dropdown.mod-spec').addClass('extend');
            addAltStyleRow('', '.srch-hero-dropdown.mod-spec', '.srch-radio-wrap');
        })
    }
    function searchSrchHero() {
        //Main Form Input
        //Handle dropdown - Open dropdown on click input
        $('.srch-hero-form-inner .srch-hero-input-field').on('click', function (e) {
            $(this).parent().find('.srch-hero-dropdown').addClass('show');
            addAltStyleRow('', '.srch-hero-dropdown.mod-spec', '.srch-radio-wrap');
        })
        //Handle dropdown - Close dropdown on blur input
        $('.srch-hero-form-inner .srch-hero-input-field').on('blur', function (e) {
            if (!$(this).parent().find('.srch-hero-dropdown').is(':hover')) {
                $(this).parent().find('.srch-hero-dropdown').removeClass('show');
                $(this).parent().find('.srch-hero-dropdown').removeClass('extend');
                addAltStyleRow('', '.srch-hero-dropdown.mod-spec', '.srch-radio-wrap');
            }
        })
        // Close dropdown on click item & get item's value
        $('.srch-hero-form-inner .srch-hero-dropdown .ic-radio').on('click', function (e) {
            $(this).closest('.srch-hero-dropdown').removeClass('show');
            $(this).closest('.srch-hero-dropdown').removeClass('extend');
            $(this).closest('.srch-hero-dropdown').removeClass('typing');
            addAltStyleRow('', '.srch-hero-dropdown.mod-spec', '.srch-radio-wrap');
            //Get item's value
            let currValue = $(this).parent().find('span').text();
            $(this).closest('.srch-input-field-wrap').find('.srch-hero-input-field').val(currValue)

            //Replace title
            if (currValue == 'All') {
                // If value is "All"
                let currCriteria = $(this).closest('.srch-input-field-wrap').find('.srch-hero-input-field')
                if (currCriteria.hasClass('mod-location')) {
                    $(this).closest('.srch-input-field-wrap').find('.srch-hero-input-field').val('All Locations')
                    $('.replace-location').text('');
                } else if (currCriteria.hasClass('mod-spec')) {
                    $(this).closest('.srch-input-field-wrap').find('.srch-hero-input-field').val('All Specialties')
                    $('.replace-spec').text('');
                }
            } else {
                //If value is not "All"
                let currCriteria = $(this).closest('.srch-input-field-wrap').find('.srch-hero-input-field')
                if (currCriteria.hasClass('mod-location')) {
                    $('.replace-location').text(` in ${currValue}`);
                } else if (currCriteria.hasClass('mod-spec')) {
                    $('.replace-spec').text(`for '${currValue}'`);
                }
            }
        });

        //Decoy form update
        //Hos Type
        $('.srch-hero-form .srch-hos-type-checkbox .w-checkbox-input').on('click', function (e) {
            let curIndex = $(this).parent().index();
            $('.main-secondary-form').find('.group-hos-type .w-checkbox-input').eq(curIndex).trigger('click');
            $('.all-decoy-form').find('.group-hos-type .w-checkbox-input').eq(curIndex).trigger('click');
        })
        //All Country / Location / Reset Location 
        $('.srch-hero-form .decoy-location-reset').on('click', function (e) {
            resetLocSecondary()
            $('.decoy-form-tophos .decoy-location-reset').trigger('click')
        })
        //Country
        $('.srch-hero-form .remap-country-item .ic-radio').on('click', function (e) {
            //If Country
            let curIndex = $(this).parent().attr('data-index-srch');
            // Reset
            resetLocSecondary()
            $('.decoy-form-tophos .decoy-location-reset').trigger('click')
            // Filter
            setTimeout(() => {
                $('.main-secondary-form .group-hos-country').find('.decoy-country-item').eq(curIndex).find('.ic-checkbox').trigger('click')
                $('.decoy-form-tophos .group-hos-country').find('.decoy-country-item').eq(curIndex).find('.ic-radio').trigger('click')
            }, 1);
        })
        //Location
        $('.srch-hero-form .remap-city-item .ic-radio').on('click', function (e) {
            //If Location
            let curIndex = $(this).parent().attr('data-index-srch');
            // Reset
            resetLocSecondary()
            $('.decoy-form-tophos .decoy-location-reset').trigger('click')
            let curCountryIndex = $(this).closest('.remap-country-item-wrap').find('.remap-country-item').find('label').attr('data-index-srch');
            // Filter
            setTimeout(() => {
                $('.main-secondary-form .group-hos-country').find('.decoy-country-item').eq(curCountryIndex).find('.ic-checkbox').trigger('click')
                $('.decoy-form-tophos .group-hos-location').find('.decoy-location-item').eq(curIndex).find('.ic-radio').trigger('click')
            }, 1);
        })

        //All Specialties / Reset Specialties 
        $('.srch-hero-form .decoy-spec-reset').on('click', function (e) {
            $('.main-secondary-form .decoy-spec-reset').trigger('click')
            $('.decoy-form-tophos .decoy-spec-reset').trigger('click')
            $('.decoy-form-topdoc .decoy-spec-reset').trigger('click')
        })
        // Specialties        
        $('.srch-hero-form .group-hos-spec .ic-radio').on('click', function (e) {
            let curIndex = $(this).parent().parent().attr('data-index-srch');
            // Reset Locations from Hero to Secondary form
            resetLocSecondary()
            let currLoc = $('.srch-hero-form-top .mod-loc .srch-hero-dropdown .ic-radio:checked')
            setTimeout(() => {
                updateLocSecondary(currLoc)
            }, 1);
            //Filter
            setTimeout(() => {
                $('.main-secondary-form .group-hos-spec').find('.decoy-spec-item').eq(curIndex).find('.ic-radio').trigger('click')
                $('.decoy-form-tophos .group-hos-spec').find('.decoy-spec-item').eq(curIndex).find('.ic-radio').trigger('click')
                $('.decoy-form-topdoc .group-hos-spec').find('.decoy-spec-item').eq(curIndex).find('.ic-radio').trigger('click')
            }, 1);
        })
    };

    function resetLocSecondary() {
        $('.main-secondary-form .decoy-location-reset .ic-checkbox').prop('checked', true).trigger('click');
    }
    function updateLocSecondary(currLoc) {
        let locType = currLoc.parent().parent();
        if (locType.hasClass('remap-country-item')) {
            let value = currLoc.parent().find('span').text();
            $('.main-secondary-form').find(`span:contains("${value}")`).parent().find('input').trigger('click')
        } else if (locType.hasClass('remap-city-item')) {
            let value = currLoc.parent().parent().find('.hidden-country').text();
            $('.main-secondary-form').find(`span:contains("${value}")`).parent().find('input').trigger('click')
        } else {
        }
    };

    function handleSecondFilter() {
        function initResetCheckbox() {
            const resetEl = $(this);
            let isChecked = resetEl.prop('checked');
            if (isChecked) {
                $('[data-checkbox="sub"]').prop('checked', false).trigger('click');
                resetEl.parent().addClass('fs-cmsfilter_active')
            } else {
                $('[data-checkbox="sub"]').prop('checked', true).trigger('click');
                resetEl.parent().removeClass('fs-cmsfilter_active')
            }
        }

        $('[data-checkbox="reset"]').on('change', initResetCheckbox)

        $('[data-checkbox="sub"]').on('change', function () {
            let isResetChecked = $('[data-checkbox="reset"]').prop('checked');
            if (isResetChecked) {
                $('[data-checkbox="reset"]').off('change', initResetCheckbox)
                $('[data-checkbox="reset"]').prop('checked', true).trigger('click');
                $('[data-checkbox="reset"]').parent().removeClass('fs-cmsfilter_active')
                setTimeout(() => {
                    $('[data-checkbox="reset"]').on('change', initResetCheckbox)
                }, 100);
            }
        })
    }

    function checkSrchUI(srchParam) {
        if (srchParam) {
            if (srchParam.get('type')) {
                if (srchParam.get('type').split(',').length < 2) {
                    // single
                    $(`.srch-hero-form-inner .srch-hos-type-checkbox span:contains(${srchParam.get('type')})`).parent().find('input').trigger('click');
                } else {
                    // both
                    $('.srch-hero-hos-type-inner .srch-hos-type-checkbox').trigger('click');
                }

            }
            if (srchParam.get('cities')) {

                $('.srch-hero-input-field.mod-location').val(srchParam.get('cities'))
                $('.replace-location').text(` in ${srchParam.get('cities')}`)
                $('.srch-hero-form-top .mod-loc .srch-hero-dropdown').find(`span:contains(${srchParam.get('cities')})`).parent().find('input').prop('checked', true)

                // let thisCountry = $('.srch-hero-form-top .mod-loc .srch-hero-dropdown').find(`span:contains(${srchParam.get('cities')})`).closest('.remap-country-item-wrap').attr('data-country-name');
                // $(`.main-secondary-form-inner .srch-checkbox-wrap`).find(`span:contains(${decodeURIParam(srchParam.countries)})`).parent().find('input').trigger('click')
                // $('.main-secondary-form').find(`.decoy-country-item span:contains(${thisCountry})`).closest('label').find('input').trigger('click');

                $('.widget-txt-loc').text(srchParam.get('cities'))
                $('.srch-widget-text.id-loc').text(srchParam.get('cities'))
                //$('.srch-widget-content.id-loc .srch-widget-content-main').find(`span:contains(${decodeURIParam(srchParam.cities)})`).parent().find('input').prop('checked', true)
            } else if (srchParam.get('countries')) {
                $('.srch-hero-input-field.mod-location').val(srchParam.get('countries').replaceAll(',', ', '))
                $('.replace-location').text(` in ${srchParam.get('countries').replaceAll(',', ', ')}`)
                $('.srch-hero-form-top .mod-loc .srch-hero-dropdown').find(`span:contains(${srchParam.get('countries')})`).parent().find('input').prop('checked', true)

                $('.widget-txt-loc').text(srchParam.get('countries'))
                $('.srch-widget-text.id-loc').text(srchParam.get('countries'))
            } else {
                $('.replace-location').text('')
                $('.srch-hero-form-top .mod-loc .srch-hero-dropdown .decoy-location-reset').find('input').prop('checked', true)
                $('.srch-hero-form-top .mod-loc .srch-hero-input-field.mod-location').val('All Locations')

                $('.widget-txt-loc').text('All Locations')
                $('.srch-widget-text.id-loc').text('All Locations')
            }
            if (srchParam.get('specialties')) {
                $('.srch-hero-input-field.mod-spec').val(srchParam.get('specialties'))
                $('.replace-spec').text(`for '${srchParam.get('specialties')}'`)
                $('.replace-spec.mod-in').text(`in ${srchParam.get('specialties')}`)
                $('.srch-hero-form-top .mod-spec .srch-hero-dropdown .group-hos-spec').find(`span:contains(${srchParam.get('specialties')})`).parent().find('input').prop('checked', true)

                $('.widget-txt-spec').text(srchParam.get('specialties'))
                $('.srch-widget-text.id-spec').text(srchParam.get('specialties'))
            } else {
                $('.replace-spec').text('')
                $('.srch-hero-form-top .mod-spec .srch-hero-dropdown .decoy-spec-reset').find('input').prop('checked', true)
                $('.srch-hero-form-top .mod-spec .srch-hero-input-field.mod-spec').val('All Specialties')

                $('.widget-txt-spec').text('All Specialties')
                $('.srch-widget-text.id-spec').text('All Specialties')
            }
        }

    }
    function controlCheckboxes() {
        $('.srch-hero-form .srch-hos-type-checkbox input').on('click', function (e) {
            // Match from Hero to Secondary
            let thisBool = !$(this).is(':checked');
            let index = $(this).parent().index();
            let target = $('.main-secondary-form .group-hos-type .w-checkbox').eq(index).find('input');
            let targetBool = target.is(':checked');
            if (thisBool == targetBool) {
                target.trigger('click')
            } else {
                target.prop('checked', thisBool).trigger('click')
            }

            // Check to match from sibling
            let sibling = $(this).parent().siblings()
            let siblingBool = sibling.find('input').is(':checked')
            let targetSibling = target.parent().siblings();

            targetSibling.find('input').prop('checked', !siblingBool).trigger('click')
        })
    }
    function HandlePagination() {
        // Handle show/hide pagination
        if ($('.btn-pagi-btn').length > 1) {
            // unhide
            $('.btn-pagi-paging').removeClass('hidden')
        } else {
            // hide
            $('.btn-pagi-paging').addClass('hidden')
        }
        // Handle visible counts
        let currPage = parseInt($('.btn-pagi-btn.w--current').text());
        $('.count-start').text(`${(currPage - 1) * 10 + 1}`);
        if ($('.main').attr('data-namespace') == 'search') {
            $('.count-end').text(`${(currPage - 1) * 10 + $('.srch-hos-cms .srch-hos-inner .srch-hos-item.mod-srch-mb.mod-srchpage').length}`)
        } else if ($('.main').attr('data-namespace') == 'doctors') {
            $('.count-end').text(`${(currPage - 1) * 10 + $('.prov-doc-main-inner .prov-doc-main-item').length}`)
        }
        requestAnimationFrame(HandlePagination)
    }

    function addScrollToPagination() {
        $('.btn-pagi-btn, .btn-pagi-next, .btn-pagi-prev').on('click', function () {
            $('html, body').animate({
                scrollTop: $('#resultList').offset().top - 100
            }, 0)
        })
    }
    function layoutOnResize() {
        if ($(window).width() > 768) {
            $(window).on('resize', () => {
                let newMargin = ($(window).width() - $('.container').width()) / 2;
                $('[data-resize]').each(function () {
                    let type = $(this).attr('data-resize');
                    $(this).css(`margin-${type}`, `-${newMargin}px`);
                })
            });
            $(window).resize();
        }
        if ($('.layout-change').length >= 1) {
            $('.layout-change').removeClass('hide-for-now')
        }
    }

    //Provider Detail
    function providerdtlFilterDoctors() {
        let resetFilter = $('.srch-radio-wrap.doc-spec-reset');
        $('.prov-doc-filters .prov-doc-filters-cms .ic-radio').on('click', function (e) {
            if ($(window).width() > 768) {
                let currSpec = $(this).parent().find('span').text();
                $('.prov-doc-inner-spec').removeClass('hidden');
                $('.prov-doc-inner-spec .prov-innder-spec-name').text(currSpec);
            } else {
                let currSpec = $(this).parent().find('span').text();
                $('.mb-prov-tab-spec .date-filter-txt').text(currSpec);
                $('.mb-prov-doc-filters-drop').removeClass('show');
                $('body').css('overflow', 'auto')
                $('.overlay').removeClass('show')
            }
            resetFilter.removeClass('fs-cmsfilter_active');
            setTimeout(() => {
                providerdtlOpenAppointPopup('.prov-doc-main-item');
            }, 10);
        })
        $('.prov-doc-filters .doc-spec-reset').on('click', function (e) {
            resetFilter.addClass('fs-cmsfilter_active');
            $('.prov-doc-filters .prov-doc-filters-item .fs-cmsfilter_active').removeClass('fs-cmsfilter_active')
            if ($(window).width() > 768) {
                $('.prov-doc-inner-spec').addClass('hidden')
            } else {
                $('.mb-prov-tab-spec .date-filter-txt').text('All Specialties');
                $('.mb-prov-doc-filters-drop').removeClass('show');
                $('body').css('overflow', 'auto')
                $('.overlay').removeClass('show')
            }
        })
    };
    function doctorAppointLink() {
        let hosEmail = $('.sc-prov-hero .srch-hos-btn-main.mod-doc-spec').attr('href');
        $('.sc-prov-doc .srch-hos-btn-main.mod-doc-spec').attr('href', hosEmail);
        $('.sc-prov-hero .prov-doc-main-cms .prov-doc-main-act .srch-hos-btn-main.mod-doc-spec').attr('href', hosEmail);
    }
    function providerdtlHourDropdown() {

        if ($(window).width() > 768) {
            $('.prov-hero-dtl-txt-link.mod-dropdown').on('pointerenter', function (e) {
                e.preventDefault();
                $('.prov-hours-dropdown').addClass('show');
                $('.prov-hero-dtl-txt-link.mod-dropdown .dropdown-ic').addClass('show')
            });
            $('.prov-hero-dtl-txt-link.mod-dropdown').on('pointerleave', function (e) {
                e.preventDefault();
                if (!isHovered('.prov-hours-dropdown.show')) {
                    $('.prov-hours-dropdown').removeClass('show')
                    $('.prov-hero-dtl-txt-link.mod-dropdown .dropdown-ic').removeClass('show')
                }
            });
            $('.prov-hours-dropdown').on('pointerleave', function (e) {
                e.preventDefault();
                $('.prov-hours-dropdown').removeClass('show')
                $('.prov-hero-dtl-txt-link.mod-dropdown .dropdown-ic').removeClass('show')
            })
        } else {
            $(window).on('click', function (e) {
                if ($(e.target).hasClass('prov-hero-dtl-txt-link mod-dropdown') || $(e.target).hasClass('prov-hours-dropdown show')) {
                    $('.prov-hours-dropdown').addClass('show');
                    $('.prov-hero-dtl-txt-link.mod-dropdown .dropdown-ic').addClass('show')
                } else {
                    $('.prov-hours-dropdown').removeClass('show')
                    $('.prov-hero-dtl-txt-link.mod-dropdown .dropdown-ic').removeClass('show')
                }
            });
        }
    };
    function handleSearchDoctorDropdown() {
        //Handle Search Dropdown
        $('.mb-prov-tab-spec').on('click', function (e) {
            e.preventDefault();
            $('body').css('overflow', 'hidden')
            $('.overlay').addClass('show')
            $(this).parent().find('.mb-prov-doc-filters-drop').addClass('show');
        })
    }
    function setupAppBottomBarMobile() {
        $('.bot-bar-app [data-popup=true]').attr('data-popup', false).attr('data-link', 'hos');
        $('.bot-bar-app [data-link="hos"]').attr('href', 'https://www.google.com').attr('target', '_blank');
    }
    function handleProvSpecMobile() {
        let currHos = $('.prov-hero-title-wrap .span-main-hos').text();
        $('.mb-prov-spec-popup .prov-hero-inner .popup-hos').text(currHos);
        $('.mb-prov-spec-popup .mb-prov-spec-doc-wrap .popup-hos').text(currHos);

        $('.mb-prov-spec-filters .ic-radio').on('click', function (e) {
            // Handle title
            let currSpec = $(this).parent().find('span').text();
            let currSpecialist = $('.decoy-specialist').find(`[data-replace-spec="specialty"]:contains(${currSpec})`).parent().find('[data-replace-spec="specialist"]').html();
            $('.mb-prov-spec-popup .poup-spec').text(currSpec);
            $('.mb-prov-spec-popup .mb-prov-spec-doc-wrap .popup-spec').text(`'${currSpecialist}'`);

            // Handle popup
            $('.mb-prov-spec-popup').addClass('show');
            $('body').css('overflow', 'hidden');

            // Handle doctor results
            let radioIndex = $(this).parent().parent().index();
            $('[data-tab-content="doctors"] .prov-doc-filters-cms .prov-doc-filters-item').eq(radioIndex).find('.ic-radio').trigger('click')
            setTimeout(() => {
                let doctorsResult = $('[data-tab-content="doctors"] .prov-doc-main-inner').html();
                let doctorsCount = $('[data-tab-content="doctors"] .prov-doc-main-inner .prov-doc-main-item').length;
                $('.mb-prov-spec-popup .popup-count').text(doctorsCount);
                $('.mb-prov-spec-doc-result').html(doctorsResult);
                providerdtlOpenAppointPopup('.mb-prov-spec-popup .prov-doc-main-item');
            }, 200);
        });

        $('[data-popup-spec]').on('click', function (e) {
            e.preventDefault();
            $('.mb-prov-spec-popup').removeClass('show')
            $('[data-tab-content="doctors"] [fs-cmsfilter-element="reset"]').trigger('click')
            let currSpec = $(this).parent().find('span').text();
            $('body').css('overflow', 'auto')
        })
    }
    function providerdtlUpdateArticles() {
        // Get list of authors
        let authors = [];
        $('[data-setup-blog="currDoc"] [data-setup-blog="docName"]').each(function () {
            let docName = $(this).text();
            authors.push(docName)
            let specHtml = $(this).closest('[data-setup-blog="wrap"]').find('[data-setup-blog="specialties"]').html();
            $(`[data-setup-blog="currBlog"] [data-setup-blog="docName"]:contains(${docName})`).closest('.doc-main-blog-date-wrap').find('[data-setup-blog="specialties"]').html(specHtml);
            $('[data-setup-blog="currBlog"]').find('[data-setup-blog="specialties"] .prov-doc-main-txt').removeClass('italic txt-14').addClass('txt-12').css({ 'display': 'inline', 'font-weight': '400' })

            if ($(window).width() < 991 && $(window).width() > 768) {
                $('[data-setup-blog="currBlog"]').find('[data-setup-blog="specialties"] .prov-doc-main-spec-div').removeClass('no-space')
            }
            $('.mb-prov-main-tab-content [data-setup-blog="currBlog"]').find('[data-setup-blog="specialties"] .prov-doc-main-spec-div').removeClass('no-space')
        });

        $('[data-setup-blog="currBlog"] [data-setup-blog="docName"]').each(function () {
            let docName = $(this).text();
            if (!authors.includes(docName)) {
                $(this).closest('[data-setup-blog="wrap"]').remove();
            }
            if (authors.includes(docName)) {
            }
        });

        let allSpecialties = $('[data-setup-blog="currBlog"] .prov-doc-main-txt');
        allSpecialties.each(function () {
            let specialist = $(`[data-replace-spec="specialty"]:contains(${$(this).text()})`).parent().find('[data-replace-spec="specialist"]').text()
            $(this).text(specialist)
        })
    }
    // Event 
    function eventAdditionalAnchorLink() {
        // Handle tab
        $('.event-cats-cms .event-cats-btn').eq(0).attr('href', '#sc-award')
        $('.event-cats-cms .event-cats-btn').eq(1).attr('href', '#sc-conf')
        $('.event-cats-cms .event-cats-btn').eq(2).attr('href', '#sc-conf')
        // Handle ScrollTo
        $('[data-scrollto]').each(function (e) {
            let target = $(this).attr('data-scrollto');
            let originalUrl = $(this).attr('href');
            $(this).attr('href', `${originalUrl}/${target}`)
        })
    }

    // Event Detail
    function eventDtlEventSearch() {
        // Handle dropdown
        $(".date-input-wrap").on('click', function (e) {
            e.preventDefault();
            if ($(this).parent().find('.date-filter-dropdown').hasClass('show')) {
                $(this).parent().find('.date-filter-dropdown').removeClass('show')
                $('.sc-evn-awd-past .overlay').removeClass('show')
            } else {
                $(this).parent().find('.date-filter-dropdown').addClass('show')
                $('.sc-evn-awd-past .overlay').addClass('show')
            }
        })

        let eventSlide;
        if ($(window).width() > 768) {
            eventSlide = new Swiper('.evn-awd-past-cms', {
                slidesPerView: 4,
                spaceBetween: 20,
            });
        }

        // // Remove duplicate year
        // let seen = {};
        // $('.year-filter-item-txt').each(function () {
        //     let txt = $(this).text();
        //     if (seen[txt])
        //         $(this).parent().parent().remove();
        //     else
        //         seen[txt] = true;
        // });

        // $('.year-filter-cms .year-filter-item-txt').on('click', function (e) {
        //     let type = $(this).parent().parent().find('.year-filter-event-type').text();
        //     let name = $(this).text();
        //     $('.date-filter-wrap .date-filter-txt').text(type + ' ' + name)
        //     $(this).parent().find('.ic-radio').trigger('click')
        //     $(this).closest('.date-filter-dropdown').removeClass('show')
        //     $('.sc-evn-awd-past .overlay').removeClass('show')
        //     if ($(window).width() > 768) {
        //         setTimeout(() => {
        //             eventSlide.update();
        //         }, 200);
        //     }
        // });

        // $('.year-filter-event-type').on('click', function (e) {
        //     $(this).parent().find('.year-filter-item-txt').trigger('click')
        // });

        $('.date-input-wrap').on('blur', function (e) {
            if (!$('.date-filter-dropdown').is(':hover')) {
                $('.date-filter-dropdown').removeClass('show')
                $('.sc-evn-awd-past .overlay').removeClass('show')
            }
        });

        // $('.year-filter-cms .year-filter-item-txt').eq(0).click();

    }
    function eventGalaSwiper() {
        const eventGalaSlide = new Swiper('.evn-awd-gala-cms', {
            slidesPerView: 1,
            spaceBetween: 0,
        })
    }
    function eventLightbox() {
        const eventGalaSlide = new Swiper('.gala-popup-cms', {
            slidesPerView: 1,
            spaceBetween: 0,
            navigation: {
                nextEl: '.gala-popup-next',
                prevEl: '.gala-popup-prev',
            },
        })
        $('.evn-awd-gala-item-img').on('click', function (e) {
            e.preventDefault();
            let index = $(this).parent().index();
            eventGalaSlide.slideTo(index, 0);
            $('.gala-popup-wrap').addClass('show');
            $('body').css('overflow', 'hidden')
        })
        $('.gala-popup-close').on('click', function (e) {
            e.preventDefault();
            $('.gala-popup-wrap').removeClass('show')
            $('body').css('overflow', 'auto')
        })
    }
    function hanldeEventJoinDropdown() {
        $('.evn-awd-join-item-head').on('click', function (e) {
            e.preventDefault();
            $('.evn-awd-join-item-body').removeClass('active')
            $(this).parent().find('.evn-awd-join-item-body').addClass('active')
        })
    }
    function getProviderForAwardVote() {
        // Check if award is for hospital or clinic
        let type = $('.award-for-provider-type').text();
        if (type == 'hospital') {
            $('.vote-spec option').text('Please select a hospital')
            $('.award-type-cms').each(function () {
                let optionType = $(this).text();
                if (optionType == 'Clinic') {
                    $(this).parent().remove();
                }
            })
        } else if (type == 'clinic') {
            $('.vote-spec option').text('Please select a clinic')
            $('.award-type-cms').each(function () {
                let optionType = $(this).text();
                if (optionType == 'Hospital') {
                    $(this).parent().remove();
                }
            })
        }
        cmsSelect();
        $('.vote-hospital').select2();
        $('.vote-hospital').on('select2:select', function () {
            let name = $(this).val();
            let nameURI = name.toLowerCase().replaceAll(' ', '-');
            let url = `https://healthcare-global.webflow.io/healthcare-providers/${nameURI}`;
            $('.vote-spec option').text('loading...')
            fetch(url)
                .then(res => res.text())
                .then(hosPage => {
                    const html = new DOMParser().parseFromString(hosPage, "text/html");
                    const specList = $(html).find('.prov-hero-spec-cms .prov-hero-spec-txt')
                    $('.vote-spec').html('');
                    specList.each(function () {
                        let specText = $(this).text();
                        $('.vote-spec').append(`<option value="${specText}">${specText}</option>`)
                    })
                });
        })
    }
    function eventDtlHideSc() {
        if ($('.sc-evn-awd-win-past .cms-empty').length >= 1) {
            $('.sc-evn-awd-win-past').addClass('hidden');
        }
    }

    // Common Scripts
    if ($(window).width() > 991) {
        handleHeader();
    } else if ($(window).width() > 768) {
        handleHeaderTablet();
    } else {
        handleHeaderMobile();
    }

    function additionalFlag() {
        //Setup data-attribute
        if ($('[data-flag="wrap"]').length >= 1) {
            $('[data-flag="wrap"]').each(function () {
                let flagName = $(this).find('[data-flag-name="flag-name"]').text();
                let country = $(this).find('[data-flag-receive]').attr('data-flag-receive', flagName);
            })
        }
        //Get correct flag data
        if ($('[data-namespace="home"]') && $('[data-flag-receive]').length >= 1) {
            $('[data-flag-receive]').each(function (index) {
                let country = $(this).attr('data-flag-receive');
                let imgsrc = $(`[data-flag=${country}]`).attr('src');
                $(this).attr('src', imgsrc)
            })
        }
    }
    additionalFlag();

    function ObserChanges() {
        //targetToObserve
        const targets = $('[data-observer="wrap"]');
        const config = { attributes: false, childList: true, subtree: true };
        const callback = () => {
            //additionalFlag();
            if ($('[data-namespace="search"]').length) {
                setTimeout(() => {
                    openAppointPopup('.srch-doc-item');
                    setupProivderEmail();
                    addTargetBlankToMailTo();
                    addScrollToPagination();
                }, 200)
            }
        };
        const observer = new MutationObserver(callback);
        targets.each(function () {
            observer.observe($(this).get(0), config);
        })
    };
    ObserChanges();

    function updateBreadcrumbLink(pageName) {
        let allBcrbLinks = $('[data-bcrb-link]');
        if (pageName == 'persondtl') {
            if (sessionStorage.length > 0) {
                // Country
                $('[data-bcrb-link="country"]').text(sessionStorage.getItem('country')).attr('href', `${currDomain}/search-result?type=Hospital%2CClinic&countries=${encodeURIParam(sessionStorage.getItem('country'))}`)
                // City 
                $('[data-bcrb-link="city"]').text(sessionStorage.getItem('city')).attr('href', `${currDomain}/search-result?type=Hospital%2CClinic&cities=${encodeURIParam(sessionStorage.getItem('city'))}&countries=${encodeURIParam(sessionStorage.getItem('country'))}`)
                // Provider
                $('[data-bcrb-link="provider"]').text(sessionStorage.getItem('provider')).attr('href', sessionStorage.getItem('providerUrl'))

                //Clear Session when done
                sessionStorage.clear();
            } else {
                allBcrbLinks.each(function () {
                    let type = $(this).attr('data-bcrb-link');
                    if (type == 'country') {
                        $(this).attr('href', `${currDomain}/search-result?type=Hospital%2CClinic&countries=${encodeURIParam($('[data-bcrb-link-text="country"]').eq(0).text())}`)
                        $(this).text($('[data-bcrb-link-text="country"]').eq(0).text())
                    } else if (type == 'city') {
                        $(this).attr('href', `${currDomain}/search-result?type=Hospital%2CClinic&cities=${encodeURIParam($('[data-bcrb-link-text="city"]').eq(0).text())}&countries=${encodeURIParam($('[data-bcrb-link-text="country"]').eq(0).text())}`)
                        $(this).text($('[data-bcrb-link-text="city"]').eq(0).text())
                    } else if (type == 'provider') {
                        $(this).attr('href', $('[data-bcrb-link-text="provider"]').eq(0).attr('href'))
                        $(this).text($('[data-bcrb-link-text="provider"]').eq(0).text())
                    }
                })
            }

        } else if (pageName == 'providerdtl') {
            allBcrbLinks.each(function () {
                let text = $(this).text();
                let type = $(this).attr('data-bcrb-link');
                if (type == 'country') {
                    $(this).attr('href', `${currDomain}/search-result?type=Hospital%2CClinic&countries=${encodeURIParam(text)}`)
                } else if (type == 'city') {
                    $(this).attr('href', `${currDomain}/search-result?type=Hospital%2CClinic&cities=${encodeURIParam(text)}&countries=${encodeURIParam($('[data-session="country"]').text())}`)
                }
            });

            //Handle Session Storage
            sessionStorage.clear();
            $('[data-session]').each(function () {
                let type = $(this).attr('data-session');
                let value = $(this).text();
                sessionStorage.setItem(type, value);
            });
            sessionStorage.setItem('providerUrl', window.location.href)
        };
    };
    function personGetSpecs() {
        let html = $('.decoy-doc-spec').html();
        $('.append-doc-spec').html(html);
        let commaHtml = '<div class="txt-14 doc-main-hos-add-div">,</div>'
        $('.append-doc-spec .w-dyn-item').each(function () {
            if ($(this).index() != $('.decoy-doc-spec .w-dyn-item').length - 1) {
                $(this).append(commaHtml)
            }
        })
        $('.append-doc-spec').children().addClass('dp-inline')
        $('.append-doc-spec').css('pointer-events', 'none')
    }
    function providerdtlHideSection() {
        if ($('.prov-body-right .prov-body-socials-wrap .prov-social-media-ic.w-condition-invisible').length >= 3) {
            $('.prov-body-socials-wrap').addClass('hidden')
            $('.prov-body-right .prov-body-bg-title').addClass('hidden')
        }
        if ($('.clin-body-rel-wrap .prov-body-socials-wrap .prov-social-media-ic.mod-clinic.w-condition-invisible').length >= 3) {
            $('.prov-body-socials-wrap.mod-clinic').addClass('hidden')
            $('.clin-body-rel-wrap .prov-body-bg-title.mod-clinic').addClass('hidden')
        }
        if (!$('.prov-clinic-body-wrap').hasClass('w-condition-invisible')) {
            if ($('.clin-rel-hos-item[data-similar-clinic="spec-city"]').length < 1) {
                $('.clin-rel-hos-title[data-similar-clinic="spec-city"]').addClass('hidden');
            }
            if ($('.clin-rel-hos-item[data-similar-clinic="spec"]').length < 1) {
                $('.clin-rel-hos-title[data-similar-clinic="spec"]').addClass('hidden');
            }
            if ($(window).width() > 768) {
                if ($('.prov-clinic-body-wrap .prov-doc-main-item[data-hide-title="doctor"]').length < 1) {
                    $('.prov-clinic-body-wrap .clin-doc-title-wrap[data-hide-title="doctor"]').addClass('hidden')
                }
            } else {
                if ($('.mb-prov-clinic-main .prov-doc-main-item[data-hide-title="doctor"]').length < 1) {
                    $('.mb-prov-clinic-main .mb-doc-tab-txt[data-hide-title="doctor"').addClass('hidden').removeClass('active');
                    $('[data-tab-content="doctors-clinic"]').removeClass('active');
                    $('[data-tab-head="background-clinic"]').addClass('active');
                    $('[data-tab-content="background-clinic"]').addClass('active');
                }
            }
            if ($(window).width() < 768) {
                if ($('.clin-rel-hos-item[data-similar-clinic="spec-city"]').length < 1 && $('.clin-rel-hos-item[data-similar-clinic="spec"]').length < 1 && $('.clin-rel-hos-item[data-similar-clinic="branch"]').length < 1)
                    $('.prov-clinic-body-wrap').addClass('hidden');
            }
        }
    }
    function personHideSection() {
        if ($(window).width() > 768) {
            if ($('.doc-main-blog-cms .w-dyn-empty').length) {
                $('.doc-main-blog-title-wrap').addClass('hidden')
            }
        } else {
            if ($('[data-tab-content="blog"] .w-dyn-empty').length) {
                $('[data-tab-head="blog"]').addClass('hidden')
            }
        }
    }
    function blogDtlHideSection() {
        if ($('.blogdtl-main-rel .w-dyn-empty').length) {
            $('.blogdtl-rel-title').addClass('hidden')
        }
        if ($('.sc-blogdtl-doc .w-dyn-empty').length) {
            $('.topic-doc-title-wrap').addClass('hidden')
        }
    }
    function faqHandleFaq() {
        $('.faq-main-item-head').on('click', function (e) {
            e.preventDefault();
            if ($(this).parent().hasClass('active')) {
                $(this).parent().find('.faq-main-item-body').slideUp();
                $(this).parent().removeClass('active')
            } else {
                $('.faq-main-item-body').slideUp();
                $('.faq-main-item').removeClass('active')
                $(this).parent().find('.faq-main-item-body').slideDown();
                $(this).parent().addClass('active')
            }
        })
    }
    function contactAdditionalLocationSelect() {
        if ($('.main').attr('data-namespace') == 'contact') {
            let allCountries = $('.header .header-reg-wrap .header-reg-item .header-spec-title');
            $('#destination').html('');
            allCountries.each(function (e) {
                let country = $(this).text();
                let newCountryItem = $(document.createElement('optgroup')).attr('label', country);
                $('#destination').append(newCountryItem)
            })
            let allCities = $('.header .header-reg-wrap .header-reg-item .header-loc-item');
            allCities.each(function (e) {
                let city = $(this).find('.header-spec-link').text();
                let country = $(this).find('.hidden-country').text();
                $('#destination').find(`[label=${country}]`).append($(document.createElement('option')).text(city).val(city));
            })
        }
    }
    function doctorsFilterDoctors() {
        let resetFilter = $('.srch-radio-wrap.doc-spec-reset');
        $('.prov-doc-filters .prov-doc-filters-cms .ic-radio').on('click', function (e) {
            if ($(window).width() < 768) {
                let currSpec = $(this).parent().find('span').text();
                $('.mb-prov-tab-spec .date-filter-txt').text(currSpec);
                $('.mb-prov-doc-filters-drop').removeClass('show');
                $('body').css('overflow', 'auto')
                $('.overlay').removeClass('show')
            }
            resetFilter.removeClass('fs-cmsfilter_active');
            setTimeout(() => {
                openAppointPopup('.prov-doc-main-item');
            }, 100);
        })
        $('.doctors-main-inner .doc-spec-reset').on('click', function (e) {
            $('.doctors-main-inner .prov-doc-filters-item .fs-cmsfilter_active').removeClass('fs-cmsfilter_active')
            if ($(window).width() < 768) {
                $('.mb-prov-tab-spec .date-filter-txt').text('All Specialties');
                $('.mb-prov-doc-filters-drop').removeClass('show');
                $('body').css('overflow', 'auto')
                $('.overlay').removeClass('show')
            }
            resetFilter.addClass('fs-cmsfilter_active');
            setTimeout(() => {
                openAppointPopup('.prov-doc-main-item');
            }, 100);
        })
    };

    function eventDtlWinners() {
        if (!$('.sc-evn-awd-win-past').hasClass('w-condition-invisible')) {
            //Utils
            const getWinnerByYear = (year) => {
                return $(`[data-win="item"][data-year="${year}"]`);
            }
            const getWinnerByCate = (cate, year) => {
                return $(`[data-win="item"][data-cate="${cate}"][data-year="${year}"]`);
            }

            let cateTitleHtml = $('.awd-win-cate-title-wrap');
            const createHtmlForCate = (winnerByCateEl, cate, year) => {
                winnerByCateEl.each(function (i) {
                    if (winnerByCateEl.length == 1) {
                        $(`[data-tab-body="${year}"] [data-cate-title="${cate}"]`).addClass('one-item')
                    }
                    $(`[data-tab-body="${year}"] [data-cate-title="${cate}"]`).append($(this))
                })
            }

            //Get all item and data
            let allWinners = $('[data-win="item"]');
            //Clear current Html
            $('[data-win="tab-head"]').html('')
            $('[data-win="tab-body"]').html('')
            let allYears = [];
            let lastYear;
            allWinners.each(function (i) {
                let year = $(this).find('[data-win="year"]').text();
                $(this).attr('data-year', year);
                let cate = $(this).find('[data-win="cate"]').text();
                $(this).attr('data-cate', cate);
                let cateOrder = $(this).find('[data-win="order"]').text();
                $(this).attr('data-cate-order', cateOrder);
                if (year != lastYear) {
                    allYears.push(year)
                    lastYear = year
                }
            })
            allYears = allYears.sort().reverse();

            for (let x = 0; x < allYears.length; x++) {
                let year = allYears[x];
                createTabHeadItem(allYears[x])
                let winnerByYear = getWinnerByYear(year);

                let allCate = [];
                let lastCate;

                winnerByYear.each(function (i) {
                    let cate = $(this).attr('data-cate');
                    let cateOrder = Number($(this).attr('data-cate-order'));
                    if (cate != lastCate) {
                        allCate.push({ order: cateOrder, name: cate });
                        lastCate = cate;
                    }
                })

                // Re-order categories
                allCate.sort((a, b) => a.order - b.order);

                for (let x = 0; x < allCate.length; x++) {
                    let cateTitle = cateTitleHtml.clone();
                    cateTitle.find('.awd-win-cate-title').text(allCate[x].name);
                    let cateInner = $(document.createElement('div')).addClass('evn-awd-win-inner').attr('data-cate-title', allCate[x].name);
                    let cateWrapper = $(document.createElement('div')).addClass('awd-win-cate-item');
                    cateWrapper.append(cateTitle)
                    cateWrapper.append(cateInner)
                    let tabBody = $(`[data-tab-body="${year}"]`);
                    tabBody.append(cateWrapper)
                }

                winnerByYear.each(function (i) {
                    let cate = $(this).attr('data-cate');
                    let winnerByCate = getWinnerByCate(cate, year);
                    console.log(winnerByCate)
                    createHtmlForCate(winnerByCate, cate, year);
                })
            }

            $('.evn-awd-win-cms').remove();

            //Setup Tab
            function createTabHeadItem(year) {
                let tabHead = $(document.createElement('a')).addClass('awd-win-past-head-item').attr('data-tab-head', year).attr('href', '#');
                tabHead.append($(document.createElement('div')).addClass('txt-18 awd-win-tab-head-txt').text(year))
                $('[data-win="tab-head"]').append(tabHead);

                let tabBody = $(document.createElement('div')).addClass('awd-win-past-body-item').attr('data-tab-body', year);
                $('[data-win="tab-body"]').append(tabBody);
            }

            // Setup tab interaction
            $('.awd-win-past-head-item').eq(0).addClass('active')
            $('.awd-win-past-body-item').eq(0).addClass('active')

            $('.awd-win-past-head-item').on('click', function (e) {
                e.preventDefault();
                let year = $(this).attr('data-tab-head');
                $('.awd-win-past-head-item').removeClass('active')
                $('.awd-win-past-body-item').removeClass('active')
                $(this).addClass('active');
                $(`[data-tab-body="${year}"]`).addClass('active')
            })

        }

    }

    // Page Scripts
    const SCRIPT = {};
    SCRIPT.homeScript = function () {
        //inputSearch()
        removeAdditionalTopic($('.home-topic-cms-wrap .home-topic-item'));
        let allHiddenSpecHero = $('.home-hero-srch-wrap .group-hos-spec .srch-radio-wrap.w-condition-invisible');
        homeHeroDropSpec(allHiddenSpecHero);
        homeHeroDropLoc();
        searchHomeHero(allHiddenSpecHero);
        setTimeout(() => {
            homemagSearch();
        }, 200)
        closeAppointPopup();
        openAppointPopup('.home-doc-item');
        window.fsAttributes.push([
            'cmsnest',
            (listInstances) => {
                homeHospital();
            },
        ]);
        if ($(window).width() < 768) {
            handleHomeWidgetMobile()
        }
        addTargetBlankToMailTo();
    }
    SCRIPT.searchScript = function () {
        $('.srch-hos-pagi-empty').addClass('hidden');
        $('html, body').css('scroll-behavior', 'unset');
        let loaders = $('.srch-loading-outer');
        let checkLoaders = setInterval(() => {
            loaders.each(function () {
                if ($(this).css('display') == 'none') {
                    $(this).closest('[data-loader="wrap"]').find('.srch-hos-pagi-empty').removeClass('hidden')
                } else {
                    $(this).closest('[data-loader="wrap"]').find('.srch-hos-pagi-empty').addClass('hidden')
                }
            })
        }, 100);
        window.fsAttributes.push([
            'cmsload',
            (listInstances) => {
                clearInterval(checkLoaders)
            },
        ]);
        //const srchParam = JSON.parse('{"' + decodeURI(window.location.search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
        const srchParam = new URLSearchParams(window.location.search);
        setTimeout(() => {
            remapSrchHeroDrop();
            handleSecondFilter();
            requestAnimationFrame(HandlePagination);
            checkSrchUI(srchParam);
        }, 100);
        let allHiddenSpecHero = $('.srch-hero-dropdown.mod-spec .srch-hero-spec-inner .w-condition-invisible');
        //allHiddenSpecHero.addClass('visible');
        if ($(window).width() > 768) {
            searchHeroDropSpec(allHiddenSpecHero);
        }
        setTimeout(() => {
            // Setup the UI first then init filter interactions
            searchSrchHero();
            controlCheckboxes();
            if ($(window).width() < 768) {
                handleSrchWidgetMobile();
            }
        }, 200);
        closeAppointPopup();
        addTargetBlankToMailTo();
    }
    SCRIPT.providerdtlScript = function () {
        window.fsAttributes.push([
            'cmsfilter',
            (listInstances) => {
                providerdtlFilterDoctors();
                doctorAppointLink();
            },
        ]);
        updateBreadcrumbLink('providerdtl');
        providerdtlHourDropdown();
        providerdtlUpdateArticles();
        if ($(window).width() < 768) {
            handleTab();
            handleSearchDoctorDropdown();
            $('.bot-bar').addClass('hidden');
            handleProvSpecMobile();
            setupAppBottomBarMobile();
        }
        providerdtlHideSection();
        providerdtlOpenAppointPopup('.prov-doc-main-item');
        //Bring home search widget to this page
        if ($(window).width() < 768) {
            let allHiddenSpecHero = $('.home-hero-srch-wrap .group-hos-spec .srch-radio-wrap.w-condition-invisible');
            homeHeroDropSpec(allHiddenSpecHero);
            homeHeroDropLoc();
            searchHomeHero(allHiddenSpecHero);
            handleHomeWidgetMobile()
        }
        addTargetBlankToMailTo();
    }
    SCRIPT.eventScript = function () {
        eventAdditionalAnchorLink();
        addTargetBlankToMailTo();
    }
    SCRIPT.eventdtlScript = function () {
        eventDtlEventSearch();
        eventLightbox();
        getProviderForAwardVote();
        eventDtlHideSc();
        if ($(window).width() < 768) {
            eventGalaSwiper();
            hanldeEventJoinDropdown();
        }
        layoutOnResize();
        addTargetBlankToMailTo();
        eventDtlWinners();
    }
    SCRIPT.conditionScript = function () {
        closeAppointPopup();
        openAppointPopup('.srch-doc-item');
        //Bring home search widget to this page
        if ($(window).width() < 768) {
            let allHiddenSpecHero = $('.home-hero-srch-wrap .group-hos-spec .srch-radio-wrap.w-condition-invisible');
            homeHeroDropSpec(allHiddenSpecHero);
            homeHeroDropLoc();
            searchHomeHero(allHiddenSpecHero);
            handleHomeWidgetMobile()
        }
        addTargetBlankToMailTo();
    }
    SCRIPT.blogScript = function () {
        $('[data-bot-bar]').removeClass('active')
        $('[data-bot-bar="blog"]').addClass('active')
        removeAdditionalTopic($('.home-topic-cms .home-topic-item'));
        //Bring home search widget to this page
        if ($(window).width() < 768) {
            let allHiddenSpecHero = $('.home-hero-srch-wrap .group-hos-spec .srch-radio-wrap.w-condition-invisible');
            homeHeroDropSpec(allHiddenSpecHero);
            homeHeroDropLoc();
            searchHomeHero(allHiddenSpecHero);
            handleHomeWidgetMobile()
        }
    }
    SCRIPT.topicScript = function () {
        closeAppointPopup();
        openAppointPopup('.srch-doc-item');
        //Bring home search widget to this page
        if ($(window).width() < 768) {
            let allHiddenSpecHero = $('.home-hero-srch-wrap .group-hos-spec .srch-radio-wrap.w-condition-invisible');
            homeHeroDropSpec(allHiddenSpecHero);
            homeHeroDropLoc();
            searchHomeHero(allHiddenSpecHero);
            handleHomeWidgetMobile()
        }
        addTargetBlankToMailTo();
        if ($(window).width() < 768) {
            removeAdditionalTopic($('.home-topic-cms .home-topic-item'));
        } else {
            $('.home-topic-cms .home-topic-item').css('display', 'block')
        }
    }
    SCRIPT.blogdtlScript = function () {
        closeAppointPopup();
        openAppointPopup('.srch-doc-item');
        openAppointPopup('.blogdtl-main-author');
        blogDtlHideSection();
        // Rearrange html
        if ($(window).width() < 768) {
            $('.blogdtl-author-infor-wrap').append($('.blogdtl-author-infor-wrap .blogdtl-author-hos-wrap'))
        }
        //Bring home search widget to this page
        if ($(window).width() < 768) {
            let allHiddenSpecHero = $('.home-hero-srch-wrap .group-hos-spec .srch-radio-wrap.w-condition-invisible');
            homeHeroDropSpec(allHiddenSpecHero);
            homeHeroDropLoc();
            searchHomeHero(allHiddenSpecHero);
            handleHomeWidgetMobile()
        }
        addTargetBlankToMailTo();
    }
    SCRIPT.persondtlScript = function () {
        closeAppointPopup();
        openAppointPopupPerson();
        updateBreadcrumbLink('persondtl');
        personGetSpecs();
        personHideSection();
        if ($(window).width() < 768) {
            handleTab();
            $('.bot-bar').addClass('hidden');
        }
        //Bring home search widget to this page
        if ($(window).width() < 768) {
            let allHiddenSpecHero = $('.home-hero-srch-wrap .group-hos-spec .srch-radio-wrap.w-condition-invisible');
            homeHeroDropSpec(allHiddenSpecHero);
            homeHeroDropLoc();
            searchHomeHero(allHiddenSpecHero);
            handleHomeWidgetMobile()
        }
        addTargetBlankToMailTo();
    }
    SCRIPT.joinScript = function () {
    }
    SCRIPT.siteScript = function () {
        //Bring home search widget to this page
        if ($(window).width() < 768) {
            let allHiddenSpecHero = $('.home-hero-srch-wrap .group-hos-spec .srch-radio-wrap.w-condition-invisible');
            homeHeroDropSpec(allHiddenSpecHero);
            homeHeroDropLoc();
            searchHomeHero(allHiddenSpecHero);
            handleHomeWidgetMobile()
        }
    }
    SCRIPT.faqScript = function () {
        faqHandleFaq();
        //Bring home search widget to this page
        if ($(window).width() < 768) {
            let allHiddenSpecHero = $('.home-hero-srch-wrap .group-hos-spec .srch-radio-wrap.w-condition-invisible');
            homeHeroDropSpec(allHiddenSpecHero);
            homeHeroDropLoc();
            searchHomeHero(allHiddenSpecHero);
            handleHomeWidgetMobile()
        }
    }
    SCRIPT.contactScript = function () {
        //Bring home search widget to this page
        if ($(window).width() < 768) {
            let allHiddenSpecHero = $('.home-hero-srch-wrap .group-hos-spec .srch-radio-wrap.w-condition-invisible');
            homeHeroDropSpec(allHiddenSpecHero);
            homeHeroDropLoc();
            searchHomeHero(allHiddenSpecHero);
            handleHomeWidgetMobile()
        }
    }
    SCRIPT.specialtiesScript = function () {
        function addLinkToSearchSpec() {
            const allSpecItem = $('.sc-spec-main [data-search="item"]');
            allSpecItem.each(function (e) {
                let spec = $(this).text();
                $(this).attr('href', `${currDomain}/search-result?type=Hospital%2CClinic&specialties=${encodeURIParam(spec)}`)
            })
        }
        if ($(window).width() > 768) {
            addLinkToSearchSpec();
        } else {
            // Setup for mobile
            $('.bot-bar .btbar-item').removeClass('active');
            $('[data-bot-bar="specialties"]').addClass('active');
            $('[data-bot-bar-content="specialties"]').addClass('active');
        }
        //Bring home search widget to this page
        if ($(window).width() < 768) {
            let allHiddenSpecHero = $('.home-hero-srch-wrap .group-hos-spec .srch-radio-wrap.w-condition-invisible');
            homeHeroDropSpec(allHiddenSpecHero);
            homeHeroDropLoc();
            searchHomeHero(allHiddenSpecHero);
            handleHomeWidgetMobile()
        }
    }
    SCRIPT.doctorsScript = function () {
        window.fsAttributes.push([
            'cmsfilter',
            (listInstances) => {
                doctorsFilterDoctors();
                openAppointPopup('.prov-doc-main-item');
                closeAppointPopup();
            },
        ]);
        let loaders = $('.srch-loading-outer');
        let checkLoaders = setInterval(() => {
            if (loaders.css('display') == 'none') {
                loaders.closest('[data-loader="wrap"]').find('.srch-hos-pagi-empty').removeClass('hidden')
            } else {
                loaders.closest('[data-loader="wrap"]').find('.srch-hos-pagi-empty').addClass('hidden')
            }
        }, 100);
        window.fsAttributes.push([
            'cmsload',
            (listInstances) => {
                clearInterval(checkLoaders)
            },
        ]);
        requestAnimationFrame(HandlePagination);
        if ($(window).width() < 768) {
            handleSearchDoctorDropdown();
        }
        //Bring home search widget to this page
        if ($(window).width() < 768) {
            let allHiddenSpecHero = $('.home-hero-srch-wrap .group-hos-spec .srch-radio-wrap.w-condition-invisible');
            homeHeroDropSpec(allHiddenSpecHero);
            homeHeroDropLoc();
            searchHomeHero(allHiddenSpecHero);
            handleHomeWidgetMobile()
        }
    }

    const pageName = $('.main').attr('data-namespace');
    if (pageName) {
        SCRIPT[`${pageName}Script`]();
    }

    if ($('.loading-screen-wrap').length) {
        $('.loading-screen-wrap').remove();
    }
}
window.onload = mainScript;

$('.header .header-dropdown.id-specs .header-spec-link').css({
    'margin': '0 -6px',
    'padding': '4px 6px',
})
$('.header .header-dropdown.id-specs .header-spec-link-underline').css({
    'margin': '0 -6px',
    'padding': '4px 6px',
})


function addAltStyleRow(wrapper, inner, el) {
    if ($(window).width() > 991) {
        $('.w-condition-invisible').removeClass('alt-style')
        let shortList = $(`${wrapper} ${inner} ${el}:not(.w-condition-invisible)`);
        let longList = $(`${wrapper} ${inner} ${el}`);
        let isExtend = $(`${inner}`).hasClass('extend');
        if (isExtend) {
            shortList.removeClass('alt-style')
            longList.each(function (i) {
                if (i % 2 == 0) {
                    $(this).addClass('alt-style');
                }
            })
        } else {
            longList.removeClass('alt-style')
            shortList.each(function (i) {
                if (i % 2 == 0) {
                    $(this).addClass('alt-style');
                }
            })
        }
        let isTyping = $(`${inner}`).hasClass('typing')
        if (isTyping) {
            $('.alt-style').removeClass('alt-style')
        }
    }
}

