const mainScript = () => {
    gsap.registerPlugin(ScrollTrigger);

    //Smooth Scroll
    $('html').css('scroll-behavior', 'auto');
    $('html').css('height', 'auto');

    function easing(x) {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
    }

    let lenis = new Lenis({
        easing: easing,
    })

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Variables and Ultilities
    let slideUpDownTime = 400;
    let unit;
    if ($(window).width() > 1920) {
        unit = 10;
    } else if ($(window).width() > 991) {
        unit = (0.5208333333 * $(window).width()) / 100;
    } else if ($(window).width() > 767) {
        unit = (1.1990407674 * $(window).width()) / 100;
    } else if ($(window).width() > 479) {
        //unit = (1.3037809648 * $(window).width()) / 100; // True 10px
        unit = (1.9556714472 * $(window).width()) / 100; // x1.5 = 15px
    } else {
        unit = (2.5445292621 * $(window).width()) / 100;
    }

    function debounce(func, delay = 100){
        let timer;
        return function(event) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, delay, event);
        };
    }
    function isTouchDevice() {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    }
    function updateInterestRate(wrapper) {
        let bigRate = $('[data-rate-source="big"]').text();
        let smallRate = $('[data-rate-source="small"]').text();
        let otherRate = $('[data-rate-source="other"]').text();
        let amount = $('[data-rate-source="amount"]').text();
        let date = $('[data-rate-source="date"]').text();
        let allRates = $(wrapper).find('[data-rate]');
        if ($('.sc-home-hero.hero-v4').length) {
            allRates.each(function(e) {
                let type = $(this).attr('data-rate');
                if (type == 'big') {
                    $(this).html(`<strong>${bigRate}</strong>`)
                } else if (type == 'small') {
                    $(this).text(smallRate)
                } else if (type == 'amount') {
                    $(this).html(`<strong>${amount}</strong>`)
                } else if (type == 'date') {
                    $(this).text(date)
                } else if (type == 'other') {
                    $(this).text(otherRate)
                }
            })
        } else {
            allRates.each(function(e) {
                let type = $(this).attr('data-rate');
                if (type == 'big') {
                    $(this).text(bigRate)
                } else if (type == 'small') {
                    $(this).text(smallRate)
                } else if (type == 'amount') {
                    $(this).text(amount)
                } else if (type == 'date') {
                    $(this).text(date)
                } else if (type == 'other') {
                    $(this).text(otherRate)
                }
            })
        }
        if ($('.sc-term-main').length) {
            let allRichText = $('.term-main-richtxt.w-richtext')
            console.log(allRichText.length)
            allRichText.each(function(e) {
                let newContent = $(this).html()
                    .replaceAll('dataRateBig', bigRate)
                    .replaceAll('dataRateSmall', smallRate)
                    .replaceAll('dataRateAmount', amount)
                    .replaceAll('dataRateDate', date)
                    .replaceAll('dataRateOther', otherRate)
                $(this).html(newContent)
            })
        }
    }
    updateInterestRate('.main')
    function updateCurrentYear() {
        $('[data-year="current"]').text(new Date().getFullYear())
    }
    updateCurrentYear()
    function updateRichtextFaqClass(faqHtml) {
        let ans = faqHtml.find('.home-faq--itemans');
        // Paragraphs
        ans.find('p:not(.block-img)').addClass('txt-16 art-para-sm-sub');
        // Lists
        ans.find('ul').addClass('art-txt-ul mod-faq-ans');
        ans.find('li').addClass('txt-16 art-txt-li');
        // Links
        ans.find('a').addClass('span-txt-link hover-un');
        // Images
        ans.find('.block-img img').addClass('img-basic art-main-img');
        ans.find('.block-img').removeClass('block-img').addClass('art-img-lg-wrap mod-faq');
        // data-rate Tags
        ans.find('.big-rate').attr('data-rate','big');
        ans.find('.small-rate').attr('data-rate','small');
        ans.find('.other-rate').attr('data-rate','other');
        ans.find('.limit-amount').attr('data-rate','amount');
        ans.find('.limit-date').attr('data-rate','date');
        // Embed
        ans.find('[data-oembed]').addClass('art-embed-wrap mod-faq');
        
        return ans.closest('.home-faq-item')
    }
    function createFaq(el,isRichtext = false) {
        if (isRichtext) {
            let ans = '';
            let richTextArray = el.data.content_richtext;
            for (const block of richTextArray) {
                switch (block.type) {
                case 'paragraph':
                        let string = block.text;
                        for (const span of block.spans) {
                            switch (span.type) {
                                case 'strong':
                                string = string.replace(block.text.substring(span.start, span.end),`<strong>${block.text.substring(span.start, span.end)}</strong>`);
                                break;
                                case 'em':
                                string = string.replace(block.text.substring(span.start, span.end),`<em>${block.text.substring(span.start, span.end)}</em>`);
                                break;
                                case 'hyperlink':
                                string = string.replace(block.text.substring(span.start, span.end),`<a href="${span.data.url}" ${span.data.target ? "target='_blank'" : ''} class="span-txt-link hover-un">${block.text.substring(span.start, span.end)}</a>`);
                                break;
                                case 'label':
                                if (span.data.label == 'big-rate' || span.data.label == 'small-rate' || span.data.label == 'limit-amount' || span.data.label == 'limit-date' || span.data.label == 'other-rate') {
                                    let tag;
                                    switch (span.data.label) {
                                        case 'big-rate':
                                        tag = "big"
                                        break;
                                        case 'small-rate':
                                        tag = "small"
                                        break;
                                        case 'other-rate':
                                        tag = "other"
                                        break;
                                        case 'limit-amount':
                                        tag = "amount"
                                        break;
                                        case 'limit-date':
                                        tag = "date"
                                        break;
                                        default:
                                        break;
                                    }
                                    string = string.replace(block.text.substring(span.start, span.end), `<span data-rate=${tag}>${block.text.substring(span.start,span.end)}</span>`)
                                }
                                break;
                                default:
                                break;
                            }
                        }
                        ans += `<p class="txt-16 art-para-sm-sub">${string}</p>`;
                    break;
                case 'image':
                    ans += `<div class="art-img-lg-wrap mod-faq">
                    <img class="img-basic art-main-img" src="${block.url}" alt="${block.alt}" width="${block.dimensions.width}" height="${block.dimensions.height}"/>
                    </div>`;
                    //${block.alt != null ? `<div class="txt-14 art-img-cap">${block.alt}</div>` : "" }
                    break;
                case 'embed':
                    ans += `<div class="art-embed-wrap mod-faq">${block.oembed.html}</div>`
                    break;
                case 'list-item':
                    let listString = block.text;
                        for (const span of block.spans) {
                            switch (span.type) {
                                case 'strong':
                                listString = listString.replace(block.text.substring(span.start, span.end),`<strong>${block.text.substring(span.start, span.end)}</strong>`);
                                break;
                                case 'em':
                                listString = listString.replace(block.text.substring(span.start, span.end),`<em>${block.text.substring(span.start, span.end)}</em>`);
                                break;
                                case 'hyperlink':
                                listString = listString.replace(block.text.substring(span.start, span.end),`<a href="${span.data.url}" ${span.data.target ? "target='_blank'" : ''} class="span-txt-link hover-un">${block.text.substring(span.start, span.end)}</a>`);
                                break;
                                case 'label':
                                    if (span.data.label == 'big-rate' || span.data.label == 'small-rate' || span.data.label == 'limit-amount' || span.data.label == 'limit-date' || span.data.label == 'other-rate') {
                                        let tag;
                                        switch (span.data.label) {
                                            case 'big-rate':
                                            tag = "big"
                                            break;
                                            case 'small-rate':
                                            tag = "small"
                                            break;
                                            case 'other-rate':
                                            tag = "other"
                                            break;
                                            case 'limit-amount':
                                            tag = "amount"
                                            break;
                                            case 'limit-date':
                                            tag = "date"
                                            break;
                                            default:
                                            break;
                                        }
                                        listString = listString.replace(block.text.substring(span.start, span.end), `<span data-rate=${tag}>${block.text.substring(span.start,span.end)}</span>`)
                                    }
                                break;
                                default:
                                break;
                            }
                        }
                    ans += `<li class="txt-16 art-txt-li">${listString}</li>`;
                    break;
                default:
                    console.error(`Unsupported block type: ${block.type}`);
                    break;
                }
            }
            let faqItem = $(`
                <div class="home-faq-item" id="${el.uid.replaceAll('.','')}">
                    <a href="#" class="home-faq-item-head w-inline-block">
                        <div class="txt-16 home-faq-item-ques">${el.data.question}</div>
                        <div class="ic-plus-wrap">
                            <div class="ic-plus-inner"></div>
                            <div class="ic-plus-inner mod-rotate"></div>
                        </div>
                    </a>
                    <div class="home-faq-item-body">
                        <div class="txt-16 home-faq--itemans">${ans}</div>
                    </div>
                    <div class="home-faq-bar">
                        <div class="home-faq-bar-inner"></div>
                    </div>
                </div>
            `);
            ans = updateUlLi($(faqItem).find('.home-faq--itemans'))
            function updateUlLi(wraper) {
                const wraperEl = wraper;
                const liEls = wraperEl.find('li');
                liEls.each((i) => {
                    let ulTemplate = $('<ul class="art-txt-ul mod-faq-ans"></ul>')
                    if (liEls.eq(i).prev().get(0) != liEls.eq(i - 1).get(0)) {
                        ulTemplate.clone().insertBefore(liEls.eq(i))
                    }
                })
                liEls.each((i) => {
                    if (liEls.eq(i).prev().prop('tagName') == 'UL') {
                        liEls.eq(i).appendTo(liEls.eq(i).prev())
                    }
                })
            }
            return faqItem;
            // let faqItem = $(`<div class="txt-16">Richtext</div>`)
            // return faqItem;
        } else {
            let faqItem = $(`
                <div class="home-faq-item" id="${el.uid.replaceAll('.','')}">
                    <a href="#" class="home-faq-item-head w-inline-block">
                        <div class="txt-16 home-faq-item-ques">${el.data.question}</div>
                        <div class="ic-plus-wrap">
                            <div class="ic-plus-inner"></div>
                            <div class="ic-plus-inner mod-rotate"></div>
                        </div>
                    </a>
                    <div class="home-faq-item-body">
                        <p class="txt-16 home-faq--itemans">${el.data.answer}</p>
                    </div>
                    <div class="home-faq-bar">
                        <div class="home-faq-bar-inner"></div>
                    </div>
                </div>
            `);
            return faqItem
        }
    }
    function createFaqNew(el) {
        let richTextArray = el.data.content_richtext;
            let ans = PrismicDOM.RichText.asHtml(richTextArray);
            let faqItem = $(`
                <div class="home-faq-item" id="${el.uid.replaceAll('.','')}">
                    <a href="#" class="home-faq-item-head w-inline-block">
                        <div class="txt-16 home-faq-item-ques">${el.data.question}</div>
                        <div class="ic-plus-wrap">
                            <div class="ic-plus-inner"></div>
                            <div class="ic-plus-inner mod-rotate"></div>
                        </div>
                    </a>
                    <div class="home-faq-item-body">
                        <div class="txt-16 home-faq--itemans">${ans}</div>
                    </div>
                    <div class="home-faq-bar">
                        <div class="home-faq-bar-inner"></div>
                    </div>
                </div>
            `);
            faqItem = updateRichtextFaqClass(faqItem)
            return faqItem;
    }
    function createRecommendContent(richtext) {
        let body = '';
        for (const block of richtext) {
            switch (block.type) {
            case 'paragraph':
                    let string = block.text;
                    for (const span of block.spans) {
                        switch (span.type) {
                            case 'strong':
                            string = string.replace(block.text.substring(span.start, span.end),`<strong>${block.text.substring(span.start, span.end)}</strong>`);
                            break;
                            case 'em':
                            string = string.replace(block.text.substring(span.start, span.end),`<em>${block.text.substring(span.start, span.end)}</em>`);
                            break;
                            case 'hyperlink':
                            string = string.replace(block.text.substring(span.start, span.end),`<a href="${span.data.url}" ${span.data.target ? "target='_blank'" : ''} class="span-txt-link hover-un">${block.text.substring(span.start, span.end)}</a>`);
                            break;
                            default:
                            break;
                        }
                    }
                    body += `<p class="txt-16 art-para-sm-sub">${string}</p>`;
                break;
            case 'heading4':
                let h4 = block.text;
                body += `<h4 class="heading h6" style="margin-bottom: 1.2rem">${h4}</h4>`;
                break;
            case 'image':
                let imgAlt;
                if (block.alt != null) {
                    if (block.alt.includes('desktop')) {
                        imgAlt = 'hidden-tb'
                    } else if (block.alt.includes('mobile')) {
                        imgAlt = 'hidden-dk'
                    } else {
                        imgAlt = ''
                    }
                }  else {
                    imgAlt = ''
                }
                body += `<div class="art-img-lg-wrap ${imgAlt}">
                <img class="img-basic" src="${block.url}" alt="${block.alt}" width="${block.dimensions.width}" height="${block.dimensions.height}"/>
                </div>`;
                //${block.alt != null ? `<div class="txt-14 art-img-cap">${block.alt}</div>` : "" }
                break;
            case 'list-item':
                let listString = block.text;
                    for (const span of block.spans) {
                        switch (span.type) {
                            case 'strong':
                            listString = listString.replace(block.text.substring(span.start, span.end),`<strong>${block.text.substring(span.start, span.end)}</strong>`);
                            break;
                            case 'em':
                            listString = listString.replace(block.text.substring(span.start, span.end),`<em>${block.text.substring(span.start, span.end)}</em>`);
                            break;
                            case 'hyperlink':
                            listString = listString.replace(block.text.substring(span.start, span.end),`<a href="${span.data.url}" ${span.data.target ? "target='_blank'" : ''} class="span-txt-link hover-un">${block.text.substring(span.start, span.end)}</a>`);
                            break;
                            default:
                            break;
                        }
                    }
                body += `<li class="txt-16 art-txt-li art-txt-li-sm">${listString}</li>`;
                break;
            default:
                console.error(`Unsupported block type: ${block.type}`);
                break;
            }
        }
        let bodyWrap = $(`<div class="richtext">${body}</div>`)
        let updatedBody = updateUlLi(bodyWrap)
        function updateUlLi(wrapper) {
            const wrapperEl = wrapper;
            const liEls = wrapperEl.find('li');
            liEls.each((i) => {
                let ulTemplate = $('<ul class="art-txt-ul"></ul>')
                if (liEls.eq(i).prev().get(0) != liEls.eq(i - 1).get(0)) {
                    ulTemplate.clone().insertBefore(liEls.eq(i))
                }
            })
            liEls.each((i) => {
                if (liEls.eq(i).prev().prop('tagName') == 'UL') {
                    liEls.eq(i).appendTo(liEls.eq(i).prev())
                }
            })
            return wrapperEl
        }
        return updatedBody;
    }
    function pushFaqTracking(item) {
        let id = $(item).closest('.home-faq-item').attr('id')
        let ques = $(item).find('.home-faq-item-ques').text();
        dataLayer.push({
            'event':'page_view',
            'faq_id':id,
            'faq_name':ques
        });
    }
    function animateFaq() {
        $('.home-faq-item-head').on('click', function(e) {
            e.preventDefault();
            if ($(this).hasClass('active')) {
                $('.home-faq-item-head').removeClass('active');
                $('.home-faq-item').removeClass('active');
                $('.home-faq-item-body').slideUp();
            } else {
                $('.home-faq-item-head.active').parent().find('.home-faq-item-body').slideUp();
                $('.home-faq-item-head').removeClass('active');
                $('.home-faq-item').removeClass('active');
                $(this).addClass('active');
                $(this).parent('.home-faq-item').addClass('active');
                $(this).parent().find('.home-faq-item-body').slideDown();
            }
            pushFaqTracking(this)
        })

        if ($('.faq-page').length) {
            $('.home-faq-item-body .span-txt-link').on('click', function(e) {
                let target = $(this).attr('href');
                if (target.includes(`${window.location.pathname}`)) {
                    e.preventDefault();
                    let newTarget = new URL(target).searchParams.get('id')

                    $(`#${newTarget}`).find('.home-faq-item-head').trigger('click');
                    setTimeout(() => {
                        lenis.scrollTo(`#${newTarget}`, {offset: -$(window).height() / 2})
                    }, 200);
                }
            })
        } else {
            $('.home-faq-item-body .span-txt-link').on('click', function(e) {
                e.preventDefault()
                let target = $(this).attr('href');
                let url = new URL(target);
                let newURL = `${window.location.origin}${url.pathname}${url.search}`
                if ($(this).attr('target') == '_blank') {
                    window.open(newURL,'_blank').focus()
                } else {
                    window.location = newURL
                }

            })
        }
    }
    function checkConsent() {
        const consentName = 'terms_of_use_consent'
        let consent = getCookie(consentName);
        if (consent == '' || !consent) {
            console.log('empty')
            setTimeout(() => {
                lenis.stop()
                $('html').addClass('scroll-lock')
                $('.consent-wrap').addClass('active')
            }, 2000);
        } else if (consent == 'true') {
            console.log('consented')
        }

        $('.consent-close').on('click', function(e) {
            e.preventDefault();
            lenis.start()
            $('html').removeClass('scroll-lock')
            $('.consent-wrap').removeClass('active')
        })
        $('.consent-btn').on('click', function(e) {
            e.preventDefault();
            lenis.start()
            $('html').removeClass('scroll-lock')
            $('.consent-wrap').removeClass('active')
            setCookie(consentName, 'true', 30)
        })
    }
    if ($('.consent-wrap').length) {
        if (!(window.location.href.includes('/app-'))) {
            checkConsent()
        } else {
            $('.consent-wrap').remove();
        }
    }
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }

    // Scroll Events
    let header;
    if ($('.header').length) {
        header = $('.header');
    } else {
        header = $('.header-haven');
    }
    function scrollDown() {
        header.addClass('on-hide')
        if ($('.header-haven').length) {
            $('.header-haven').addClass('on-hide')
        }
        if ($('.blog-page').length) {
            $('.blog-header').removeClass('on-scroll')
        }
        if ($('.faq-page').length) {
            $('.faq-stick-wrap').removeClass('on-hide')
        }
        if ($(window).width() < 991) {
            if ($('.faq-page').length) {
                $('.faq-toc-inner').removeClass('on-scroll')
            }
        }
        if ($(window).width() < 767) {
            if ($('.term-page').length) {
                $('.term-toc-wrap-overlay').removeClass('on-scroll')
            }
        } else {
            if ($('.term-page').length) {
                $('.term-toc-wrap-overlay').addClass('on-scroll')
            }
        }
    }
    function scrollUp() {
        header.removeClass('on-hide')
        if ($('.header-haven').length) {
            $('.header-haven').removeClass('on-hide')
        }
        if ($('.blog-page').length) {
            $('.blog-header').addClass('on-scroll')
        }
        if ($('.faq-page').length) {
            $('.faq-stick-wrap').addClass('on-hide')
        }
        if ($(window).width() < 991) {
            if ($('.faq-page').length) {
                $('.faq-toc-inner').addClass('on-scroll')
            }
        }
        if ($(window).width() < 767) {
            if ($('.term-page').length) {
                $('.term-toc-wrap-overlay').addClass('on-scroll')
            }
        } else {
            if ($('.term-page').length) {
                $('.term-toc-wrap-overlay').removeClass('on-scroll')
            }
        }

    }
    function isHeaderDarkMode() {
        if ($('.dark-header').length) {
            $('.header').addClass('dark-mode');
            if ($('.header-haven').length) {
                $('.header-haven').addClass('dark-mode');
            }
            if ($('.sc-home-hero').length) {
                if (lenis.scroll > $('.sc-home-hero').height()) {
                    $('.header').removeClass('dark-mode');
                    if ($('.header-haven').length) {
                        $('.header-haven').removeClass('dark-mode');
                    }
                } else {
                    $('.header').addClass('dark-mode');
                    if ($('.header-haven').length) {
                        $('.header-haven').addClass('dark-mode');
                    }
                }
                if (lenis.scroll > $('.header').height()) {
                    $('.header').addClass('on-scroll');
                    if ($('.header-haven').length) {
                        $('.header-haven').addClass('on-scroll');
                    }
                    $('.header').removeClass('dark-mode');
                    if ($('.header-haven').length) {
                        $('.header-haven').removeClass('dark-mode');
                    }
                } else {
                    $('.header').removeClass('on-scroll');
                    if ($('.header-haven').length) {
                        $('.header-haven').removeClass('on-scroll');
                    }
                }
            } else if ($('.sc-faq-hero').length) {
                if (lenis.scroll > $('.sc-faq-hero').height()) {
                    $('.header').removeClass('dark-mode');
                    $('.header').addClass('on-scroll');
                    if ($('.header-haven').length) {
                        $('.header-haven').removeClass('dark-mode');
                        $('.header-haven').addClass('on-scroll');
                    }

                    $('.faq-stick-wrap').addClass('on-stick')
                    $('.faq-stick-wrap').removeClass('on-hide')
                } else {
                    $('.header').addClass('on-scroll');
                    $('.header').removeClass('dark-mode');
                    if ($('.header-haven').length) {
                        $('.header-haven').removeClass('dark-mode');
                        $('.header-haven').addClass('on-scroll');
                    }
                    $('.faq-stick-wrap').removeClass('on-stick')
                    $('.faq-stick-wrap').addClass('on-hide')
                }
                if (lenis.scroll > $('.header').height()) {
                    $('.header').addClass('on-scroll');
                    $('.header').removeClass('dark-mode');
                    if ($('.header-haven').length) {
                        $('.header-haven').removeClass('dark-mode');
                        $('.header-haven').addClass('on-scroll');
                    }
                } else {
                    $('.header').removeClass('on-scroll');
                    $('.header').addClass('dark-mode');
                    if ($('.header-haven').length) {
                        $('.header-haven').addClass('dark-mode');
                        $('.header-haven').removeClass('on-scroll');
                    }
                }
            }
            return true;
        }
    }
    isHeaderDarkMode();
    function setNavMargin() {
        marginAuto = ($(window).width() - $('.container').width()) / 2;
        //Update nav
        if ($(window).width() > 991) {
            $('.nav-left-wrap').css('margin-left',`-${marginAuto}px`)
            $('.nav-right-bg-overflow').css('right',`-${marginAuto}px`)
        }
    }
    setNavMargin()
    $(window).on('resize', debounce(function() {
        setNavMargin();
    }))
    // Nav
    $('.nav-toggle').on('click', function(e) {
        e.preventDefault();
        if ($('.header').hasClass('on-open') || $('.header-haven').hasClass('on-open')) {
            closeNavmenu();
        } else {
            openNavMenu();
        }
    })
    $('.nav .nav-left-close').on('click', function(e) {
        e.preventDefault();
        closeNavmenu();
    })
    function openNavMenu() {
        const openNavTl = gsap.timeline({
            onStart() {
                gsap.set('.nav-right-wrap', {xPercent: 100})
                gsap.set('.nav-link', {xPercent: 40, autoAlpha: 0})
                gsap.set('.nav .mod-add .txt-16.nav-info-label, .nav .mod-add .txt-14.nav-info-item-label, .nav .mod-add .txt-14.nav-info-txt, .nav .mod-add .txt-14.nav-info-item-link', {autoAlpha: 0, x: 60})
                gsap.set('.nav .mod-down .txt-16.nav-info-label, .nav .mod-down .nav-qr-wrap, .nav .mod-down .nav-download-wrap', {autoAlpha: 0, x: 60})
                gsap.set('.nav .mod-down .nav-download-item-wrap', {x: 30})
                gsap.set('.nav-copy-wrap .txt-14.nav-copy-txt, .footer-social-wrap .txt-14.nav-social-label', {autoAlpha: 0, x: 60})
                gsap.set('.footer-social-wrap .footer-social-link.mod-nav', {autoAlpha: 0, x: 20})
                gsap.set('.nav .nav-bottom-line', {scaleX: 0, autoAlpha: 0})

                $('.nav').addClass('active');
                $('.header').addClass('on-open');
                $('.header-haven').addClass('on-open');
                if (!isTouchDevice()) {
                    lenis.stop();
                } else {
                    header.removeClass('on-hide')
                    $('body').css('overflow', 'hidden')
                }
                console.clear()
            },
            onComplete() {
                console.clear()
            }
        })
        openNavTl.defaultEase = Power1.easeInOut;
        openNavTl
        .to('.nav-right-wrap', {xPercent: 0, duration: .6}, '0')
        .to('.nav-link', {xPercent: 0, autoAlpha:1, duration: .4, stagger: .04}, '<+=.3')

        .to('.nav .mod-add .txt-16.nav-info-label', {x: 0, autoAlpha: 1, duration: .3}, '.6')
        .to('.nav .mod-add .txt-14.nav-info-item-label', {x: 0, autoAlpha: 1, duration: .3}, '<=.06')
        .to('.nav .mod-add .txt-14.nav-info-txt, .nav .mod-add .txt-14.nav-info-item-link', {x: 0, autoAlpha: 1, duration: .3, stagger: .04}, '<=0')

        .to('.nav .mod-down .txt-16.nav-info-label', {x: 0, autoAlpha: 1, duration: .3}, '.6')
        .to('.nav .mod-down .nav-qr-wrap, .nav .mod-down .nav-download-wrap', {x: 0, autoAlpha: 1, duration: .3, stagger: .04, clearProps: 'opacity'}, '<=.06')
        .to('.nav .mod-down .nav-download-item-wrap', {x: 0, duration: .3, stagger: .04, clearProps: 'opacity'}, '<=.06')
        .to('.nav-copy-wrap .txt-14.nav-copy-txt', {x: 0, autoAlpha: 1, duration: .3}, '.6')
        .to('.nav .nav-bottom-line', {scaleX: 1, autoAlpha: 1, duration: .6}, '<=0')
        .to('.footer-social-wrap .txt-14.nav-social-label', {x: 0, autoAlpha: 1, duration: .3}, '<=.06')
        .to('.footer-social-wrap .footer-social-link.mod-nav', {x: 0, autoAlpha: 1, duration: .15, stagger: .008}, '<-=.06')

    }
    function closeNavmenu() {
        const closeNavTl = gsap.timeline({
            onStart() {
                if ($(window).width() > 991 ) {
                    setTimeout(() => {
                        $('.nav').removeClass('active');
                        $('.header').removeClass('on-open');
                    }, 300);
                } else {
                    setTimeout(() => {
                        $('.nav').removeClass('active');
                    }, 300);
                    $('.header').removeClass('on-open');
                    $('.header-haven').removeClass('on-open')
                }
                if (!isTouchDevice()) {
                    lenis.start();
                } else {
                    $('body').css('overflow', 'unset')
                }
            }
        })
        closeNavTl
        .to('.nav-right-wrap', {xPercent: 100, ease: Power1.easeInOut, duration: .6}, '0')
    }
    function refreshOnBreakpoint() {
        let initialViewportWidth = window.innerWidth || document.documentElement.clientWidth;
        // portrait mobile viewport initial, any change refresh
        if (initialViewportWidth < 480) {
            $(window).on('resize', debounce(function() {
                newViewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (newViewportWidth > 479) {
                    location.reload();
                }
            }))
        }
        // landscape mobile viewport initial, any change refresh
        else if (initialViewportWidth < 768) {
            $(window).on('resize', debounce(function() {
                newViewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (newViewportWidth > 767) {
                    location.reload();
                }
            }))
        }
        // tablet viewport initial, any change refresh
        else if (initialViewportWidth > 767 && initialViewportWidth < 992)  {
            $(window).on('resize', debounce(function() {
                newViewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (newViewportWidth < 768 || newViewportWidth > 991) {
                    location.reload();
                }
            }))
        }
        // web viewport initial, any change refresh
        else if (initialViewportWidth > 991) {
            $(window).on('resize', debounce(function() {
                newViewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (newViewportWidth < 992) {
                    location.reload();
                }
            }))
        }
    }
    refreshOnBreakpoint();

    lenis.on('scroll', function (inst) {
        if (inst.scroll > header.height()) {
            header.addClass('on-scroll')
            if ($('.header-haven').length) {

                $('.header-haven').addClass('on-hide')
            }
            if (inst.direction == 1) {
                // down
                scrollDown()
            } else if (inst.direction == -1) {
                // up
                scrollUp()
            }
            if ($('.dark-header').length) {
                header.removeClass('dark-mode')
                if ($('.header-haven').length) {
                    $('.header-haven').addClass('dark-mode')
                }
            }
        } else {
            header.removeClass('on-scroll on-hide')
            if ($('.header-haven').length) {
                $('.header-haven').removeClass('on-scroll on-hide')
            }
            if ($('.dark-header').length) {
                header.addClass('dark-mode')
                if ($('.header-haven').length) {
                    $('.header-haven').addClass('dark-mode')
                }
            }
        };

        if ($('.faq-page').length) {
            if ($('.faq-stick-wrap').offset().top > $('.sc-faq-hero').height() + 1) {
                $('.faq-stick-wrap').addClass('on-stick')
            } else {
                $('.faq-stick-wrap').removeClass('on-stick')
            }
        }
    });

    if ($('.intro-wrap').length) {
        if ($('.faq-page').length || $('.doc-page').length || $('.home-page').length) {
        } else {
            setTimeout(() => {
                $('.intro-wrap').addClass('loaded')
            }, 300);
        }
    }
    function sortAsc(arr, isHome = false, isFaq = false) {
        if (isFaq) {
            console.log(isFaq)
            if (isHome) {
                console.log('isHome')
                return arr.sort((a,b) => {
                    if (a.data.core_config[0]?.order_on_homepage === null || a.data.core_config[0]?.order_on_homepage === undefined) {
                        return 1;
                    }
                    if (b.data.core_config[0]?.order_on_homepage === null || b.data.core_config[0]?.order_on_homepage === undefined) {
                        return -1;
                    }
                    if (a.data.core_config[0]?.order_on_homepage === b.data.core_config[0]?.order_on_homepage) {
                        return 0;
                    }
                    return a.data.core_config[0]?.order_on_homepage < b.data.core_config[0]?.order_on_homepage ? -1 : 1;
                })
            } else {
                console.log('isNotHome')
                return arr.sort((a,b) => {
                    if (a.data.core_config[0]?.order_on_faqs === null || a.data.core_config[0]?.order_on_faqs === undefined) {
                        return 1;
                    }
                    if (b.data.core_config[0]?.order_on_faqs === null || b.data.core_config[0]?.order_on_faqs === undefined) {
                        return -1;
                    }
                    if (a.data.core_config[0]?.order_on_faqs === b.data.core_config[0]?.order_on_faqs) {
                        return 0;
                    }
                    return a.data.core_config[0]?.order_on_faqs < b.data.core_config[0]?.order_on_faqs ? -1 : 1;
                })
            }
        } else {
            if (isHome) {
                console.log('isHome')
                return arr.sort((a,b) => {
                    if (a.data.order_home === null) {
                        return 1;
                    }
                    if (b.data.order_home === null) {
                        return -1;
                    }
                    if (a.data.order_home === b.data.order_home) {
                        return 0;
                    }
                    return a.data.order_home < b.data.order_home ? -1 : 1;
                })
            } else {
                console.log('isNotHome')
                return arr.sort((a,b) => {
                    if (a.data.order === null) {
                        return 1;
                    }
                    if (b.data.order === null) {
                        return -1;
                    }
                    if (a.data.order === b.data.order) {
                        return 0;
                    }
                    return a.data.order < b.data.order ? -1 : 1;
                })
            }
        }
    }
    function detectOS() {
        let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
        if (!isSafari) {
            $('video[data-os-depend] [data-ext="mov"]').remove()
            $('video[data-os-depend]').each(function(index) {
                $(this).get(0).load()
            })
        }
        return isSafari
    }
    detectOS()
    const SCRIPT = {};
    SCRIPT.homeScript = () => {
        function homeGetFaq() {
            getAllDataByType('faq').then((res) => {
                if (res) {
                    let allFaq = sortAsc(res, true, true)
                    $('.home-faq-main').html('')
                    allFaq.forEach((i) => {
                        if (i.data.display_on[0]?.display_on_the_core_account) {
                            if (i.data.core_config[0]?.show_on_hompage) {
                                createFaqNew(i).appendTo($('.home-faq-main'))
                            }
                        }
                    });
                    updateInterestRate('.faq-main-wrap');
                    animateFaq();
                    if ($('.intro-wrap').length >= 1) {
                        $('.intro-wrap').addClass('loaded')
                    }
                }
            });
        }
        homeGetFaq();
    }
    SCRIPT.faqsScript = () => {
        console.log('in faqs')
        function faqGetFaq() {
            getAllDataByType('faq_category').then((res) => {
                let allFaqCate = sortAsc(res)
                updateUICate(allFaqCate)
                updateAllFaq();
            })
        }
        faqGetFaq();
        function updateUICate(allFaqCate) {
            $('.faq-cate-list').html('');
            const faqListTemplate = $('.faq-cate-wrap').eq(0).clone();
            const faqTabTemplate = $('.faq-cate-btn-wrap').eq(0).clone();
            const stickySearchIcon = $('.faq-cate-inner .faq-stick-srch').eq(0).clone();
            $('.faq-cate-inner').html('');
            $('.faq-cate-inner').append(stickySearchIcon)
            $('.faq-main-wrap').html('');

            allFaqCate.forEach((faqCate, i) => {
                if (faqCate.data.display_on[0]?.display_on_the_core_account) {
                    //Tab
                    let faqTabHtml = faqTabTemplate.clone();
                    faqTabHtml.find('.faq-cate-btn').text(faqCate.data.name).attr('href',`#${faqCate.uid}`).attr('data-scrollTo', faqCate.uid)
                    $('.faq-cate-inner').append(faqTabHtml)
                    //List
                    let faqListHtml = faqListTemplate.clone().attr('id',`${faqCate.uid}`);
                    faqListHtml.find('.faq-cate-title').text(faqCate.data.name)
                    $('.faq-main-wrap').append(faqListHtml)    
                }
            })

            requestAnimationFrame(() => {
                // init Swiper for sticky categories
                let faqCateSwiper;
                faqCateSwiper = new Swiper('.faq-cate-list-wrap.swiper', {
                    slidesPerView: 'auto',
                    mousewheel: true,
                    on: {
                        afterInit: () => {
                            $('.faq-stick-srch.mod-tb').addClass('after-init')
                        }
                    }
                })

                // active on scroll
                let allTitle = $('.faq-main-wrap .faq-cate-title');
                console.log(allTitle)
                lenis.on('scroll', function(e) {
                    for (let x = 0; x < allTitle.length; x++) {
                        let top = allTitle.eq(x).get(0).getBoundingClientRect().top;
                        if (top > 0 && top < ($(window).height() / 4)) {
                            $('.faq-cate-list-contain .faq-cate-btn').eq(x).addClass('active');
                            $('.faq-cate-list-contain .faq-cate-btn').not(`:eq(${x})`).removeClass('active');
                            faqCateSwiper.slideTo(x + 1)
                        }
                    }
                })
                $('.txt-16.home-faq-empty').hide();
            })
        }
        function updateAllFaq() {
            const faqSearchItemTemplate = $('.faq-srch-item').eq(0).clone();
            $('.faq-srch-drop-inner').html('')

            getAllDataByType('faq').then((res) => {
                let allFaqItem = sortAsc(res, false, true)
                
                allFaqItem.forEach((i) => {
                    if (i.data.display_on[0]?.display_on_the_core_account) {
                        //Faq into their Category
                        let parentSlot = $(`.faq-cate-wrap[id="${i.data.faq_category.uid}"]`).find('.faq-cate-list')
                        createFaqNew(i).appendTo(parentSlot)
                        //Search
                        let faqSearchHtml = faqSearchItemTemplate.clone().attr('data-scrollto',`${i.uid}`)
                        faqSearchHtml.find('.txt-16').text(i.data.question);
                        // Search item answer
                        faqSearchHtml.find('.hidden.data-faq-srch-body').append($(createFaqNew(i)).find('.home-faq--itemans').text().replaceAll('\n', ' '))
                        $('.faq-srch-drop-inner').append(faqSearchHtml)
                    }
                })

                animateFaq();
                updateInterestRate('.faq-main-wrap');
                faqInteraction();
                cleanupEmptyCate();
                $('.intro-wrap').addClass('loaded')
            });
        }
        function cleanupEmptyCate() {
            let cateItem = $('.faq-cate-wrap')
            cateItem.each((index, el) => {
                if ($(el).find('.faq-cate-list').text() == '') {
                    $(el).remove();
                    $(`.faq-cate-btn[href="#${$(el).attr('id')}"]`).closest('.faq-cate-btn-wrap').remove()
                }
            })

        }
        function faqInteraction() {
            setTimeout(() => {
                scrollToCategoryOnClick()
                scrollToFaqOnClick();
                searchFaqOnType();
                addFaqIdToURL();
                searchOnSticky();
                pushSearchTerm();
            }, slideUpDownTime + 1);
        }
        function addFaqIdToURL() {
            $('.home-faq-item-head').on('click', function(e) {
                e.preventDefault()
                let id = $(this).parent().attr('id');
                let cateId = $(this).closest('.faq-cate-wrap').attr('id')
                const url = new URL(window.location);
                url.searchParams.set('id', id);
                url.searchParams.set('category', cateId);
                history.replaceState({},'', url)
            })
        }
        function scrollToCategoryOnClick() {
            $('.faq-cate-inner .faq-cate-btn').on('click', function(e) {
                e.preventDefault();
                e.stopImmediatePropagation()
                let cateId = $(this).attr('data-scrollto')
                lenis.scrollTo(`#${cateId}`, {offset: -100})
                const url = new URL(window.location);
                url.search = '';
                url.searchParams.set('category', cateId);
                history.replaceState({},'', url)
            })
        }
        function scrollToFaqOnClick() {
            let search = window.location.search.substring(1);

            if (search.includes('=')) {
                let param = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
                if ($(`#${param.id}`).length) {
                    let scrollOffset = $(window).height() * 2 / 10;
                    $(`#${param.id}`).find('.home-faq-item-head').trigger('click')
                    lenis.scrollTo(`#${param.id}`, {offset: -100})
                    return;
                } else if ($(`#${param.category}`).length) {
                    lenis.scrollTo(`#${param.category}`);
                    return;
                } else {
                    const url = new URL(window.location);
                    url.search = '';
                    history.replaceState({},'', url)
                }
            } else {
                const url = new URL(window.location);
                url.search = '';
                history.replaceState({},'', url)
            }
        };
        function searchFaqOnType() {
            let faqs = $('.faq-srch-item');
            let input = $('#faq-search');
            let dropdown = $('.faq-srch-drop-wrap');
            let form = $('#faq-search-form');
            form.attr('action','')

            form.on('submit', function(e) {
                e.preventDefault();
                return false;
            })

            input.on('keyup change', function(e) {
                e.preventDefault();
                if (e.keyCode == '13') {
                    return false;
                }
                let value = $(this).val()

                let compValue = value.toLowerCase().trim();

                faqs.each((e) => {
                    let ques = faqs.eq(e).find('.txt-16').text()
                    let compQues = ques.toLowerCase().trim()
                    let ans = faqs.eq(e).find('.hidden.data-faq-srch-body').text()
                    let compAns = ans.toLowerCase().trim()

                    if (compQues.includes(compValue) || compAns.includes(compValue)) {
                        faqs.eq(e).removeClass('hidden');
                    } else {
                        faqs.eq(e).addClass('hidden');
                    }

                    // rel tag
                    if (compAns.includes(compValue) && !compQues.includes(compValue)) {
                        faqs.eq(e).addClass('rele');
                    } else {
                        faqs.eq(e).removeClass('rele');
                    }

                    //Highlight text
                    let maskedText = new RegExp("(" + value + ")","gi");
                    const newQues = faqs.eq(e).find('.txt-16').text().replace(maskedText, "<span class='hl'>$1</span>")
                    faqs.eq(e).find('.txt-16').html(newQues)
                })

                if (dropdown.find('.faq-srch-drop-inner').height() == 0) {
                    dropdown.find('.faq-srch-empty').slideDown();
                } else {
                    dropdown.find('.faq-srch-empty').slideUp();
                }

                if (input.val() != '') {
                    dropdown.addClass('open');
                } else {
                    dropdown.removeClass('open');
                }
            })
            input.on('focus', function(e) {
                if (input.val() != '') {
                    dropdown.addClass('open');
                }
            })
            input.on('blur', function(e) {
                if (!dropdown.is(':hover')) {
                    dropdown.removeClass('open')
                }
            })
            $('.faq-srch-item').on('click',function(e) {
                e.preventDefault();
                let faqId = $(this).attr('data-scrollto');
                dropdown.removeClass('open')
                let scrollOffset = $(window).height() * 2 / 10;
                if (!$(`#${faqId}`).find('.home-faq-item-head').hasClass('active')) {
                    $(`#${faqId}`).find('.home-faq-item-head').trigger('click')
                }
                lenis.scrollTo(`#${faqId}`, {offset: -scrollOffset})
            })
        }
        function searchOnSticky() {
            if ($(window).width() > 991) {
                $('.faq-stick-srch').on('click', function(e) {
                    e.preventDefault();
                    lenis.scrollTo('#faq-search-form', {offset: -40 * unit})
                    $('#faq-search-form').find('input').trigger('focus')
                })
            } else {
                $('.faq-cate-inner .faq-stick-srch').on('click', function(e) {
                    e.preventDefault();
                    lenis.scrollTo('#faq-search-form', {offset: -40 * unit})
                    $('#faq-search-form').find('input').trigger('focus')
                })
            }
        }
        function pushSearchTerm() {
            window.dataLayer = window.dataLayer || [];
            let input = $('#faq-search');
            input.on('keyup', debounce(function(e) {
                let searchTerm = $(e.currentTarget).val()
                window.dataLayer.push({
                    'event' : 'search',
                    'search_term' : searchTerm
                });
                console.log(searchTerm)
            }, 1000))
        }

    }
    SCRIPT.termScript = () => {
        const hash = window.location.hash;
        function updateURL() {
            let newPath;
            newPath = window.location.pathname.replace('/terms-and-policy','')
            console.log(newPath)
            history.replaceState({},'',`${newPath + hash}`)

            if ((newPath == '/app-terms-and-conditions') || (newPath == '/app-privacy-policy')) {
                $('.header').remove();
                $('.nav').remove();
                $('.sc-footer').remove();
            }
        }
        updateURL();

        let isAppTerm = !$('.sc-term-sub-nav').hasClass('w-condition-invisible');
        console.log(isAppTerm)

        function createToc() {
            // Create toc items
            $('.term-main-richtxt').each((index, el) => {
                let allTitle = $(el).find('h2');
                $('.term-toc-inner').eq(index).html('')

                let tocWrap = $('.term-toc-inner').eq(index);
                for (let x = 0; x < allTitle.length; x++) {
                    allTitle.eq(x).attr('id', `toc${index}-${x}`);
                    let tocItem = $('<a></a>').addClass('term-toc-item-link').attr('href', `#toc${index}-${x}`);
                    let tocNumber = $('<div></div>').addClass('txt-14 term-toc-item-number').text(`${x + 1}.`).appendTo(tocItem)
                    let [head, ...[tail]] = allTitle.eq(x).text().split('. ')
                    let tocName = $('<div></div>').addClass('txt-14 term-toc-item-txt').text(`${[tail].join('')}`).appendTo(tocItem)
                    tocWrap.append(tocItem)
                }

                //Mobile
                $('.term-toc-head-txt').eq(index).text($(`.term-toc-item-link[href="#toc${index}-${0}"]`).text().replace('.', '. '))

                lenis.on('scroll', function(e) {
                    let currScroll = e.scroll;
                    for (let x = 0; x < allTitle.length; x++) {
                        let top = allTitle.eq(x).get(0).getBoundingClientRect().top;
                        if (top > 0 && top < ($(window).height() / 5)) {
                            $(`.term-toc-item-link[href="#toc${index}-${x}"]`).addClass('active');
                            $(`.term-toc-item-link`).not(`[href="#toc${index}-${x}"]`).removeClass('active');
                            // mobile
                            $('.term-toc-head-txt').eq(index).text($(`.term-toc-item-link[href="#toc${index}-${x}"]`).text().replace('.', '. '))
                        }
                    }
                })
            })
        }
        createToc();

        function termTabInit() {
            $('.sc-term-main-inner-item').eq(0).fadeIn()

            const activeTab = (index) => {
                $('.mod-term-subnav').removeClass('active');
                $('.mod-term-subnav').eq(index).addClass('active');
                $(`.sc-term-main-inner-item`).fadeOut()
                $(`.sc-term-main-inner-item[data-subnav="${index}"]`).fadeIn();
            }

            $('.mod-term-subnav').on('click', function(e) {
                e.preventDefault();
                if (!$(this).hasClass('active')) {
                    let index = $(this).attr('data-subnav');
                    activeTab(index);
                }
            })

            if (isAppTerm) {
                lenis.on('scroll', function(inst) {
                    $('.term-toc-wrap-overlay').removeClass('on-scroll')
                    if ($(window).width() > 768) {
                        if (inst.scroll > $('.term-outer-wrap').offset().top) {
                            $('.sc-term-sub-nav, .sc-term-subnav-inner').addClass('on-scroll')
                            $('.term-toc-wrap-overlay').addClass('on-cus-scroll')
                            // console.log('add onscroll')
                        } else {
                            $('.sc-term-sub-nav, .sc-term-subnav-inner').removeClass('on-scroll')
                            $('.term-toc-wrap-overlay').removeClass('on-cus-scroll')
                            // console.log('remove onscroll')
                        }
                    } else {
                        $('.term-toc-wrap-overlay').addClass('on-cus-scroll')
                        // if (inst.scroll > $('.term-outer-wrap').offset().top) {
                        //     //$('.sc-term-sub-nav').addClass('on-scroll')
                        // } else {
                        //     //$('.term-toc-wrap-overlay').removeClass('on-cus-scroll')
                        //     //$('.sc-term-sub-nav').removeClass('on-scroll')
                        // }
                    }
                })
            }

            let tabIndex = hash.replace('#toc', '').charAt(0);
            if (hash) {
                activeTab(tabIndex)
            } else {
                activeTab(0);
            }

        }
        termTabInit()

        function scrollToTocHash(hash, immediate = true) {
            if (hash) {
                if ($(window).width() > 768) {
                    lenis.scrollTo(hash, {
                        offset: -100,
                        immediate: immediate
                    })
                } else {
                    lenis.scrollTo(hash, {
                        offset: -150,
                        immediate: immediate
                    })
                }

            }
        }
        setTimeout(() => {
            scrollToTocHash(hash)
        }, 100);

        function termTocNav() {
            if ($(window).width() < 767) {
                $('.term-toc-head').on('click', function(e) {
                    e.preventDefault();
                    if ($(this).hasClass('on-open')) {
                        $(this).removeClass('on-open');
                        $('.term-toc-inner').removeClass('on-open')
                    } else {
                        $(this).addClass('on-open');
                        $('.term-toc-inner').addClass('on-open')
                    }
                })
            }
            $('.term-toc-item-link').on('click', function(e) {
                e.preventDefault();
                $('.term-toc-head').removeClass('on-open');
                $('.term-toc-inner').removeClass('on-open');
                let target = $(this).attr('href');
                scrollToTocHash(target, false)
                history.replaceState({},'',`${window.location.pathname + target}`)
                return false;
            })
            $('.term-main').on('click', function(e) {
                $('.term-toc-head').removeClass('on-open');
                $('.term-toc-inner').removeClass('on-open');
            })
        }
        termTocNav();
    }
    SCRIPT.documentsScript = () => {
        $('.term-toc-wrap-overlay').addClass('hide-header')
        function getAllDocs() {
            const getApi = [getAllDataByType('document_category'), getAllDataByType('fund_document')];
            Promise.all(getApi).then(([categories, docs]) => {
                let allCate = sortAsc(categories);
                let allDoc = sortAsc(docs);
                updateDocUI(allCate, allDoc);
                docInteraction();
                $('.intro-wrap').addClass('loaded');
            })
        }
        getAllDocs()
        function updateDocUI(allCate, allDoc) {
            let cateItemTemplate = $('.doc-main-item-wrap').eq(0).clone();
            $('.doc-main-items').html('')
            let cateMainTemplate = $('.doc-main-group').eq(0).clone();
            $('.doc-main-wrap').html('')
            let cateStickyTemplate = $('.term-toc-item-link').eq(1).clone();
            $('.term-toc-inner').html('')
            allCate.forEach((cateEl, i) => {
                let cateName = cateEl.data.category_name;
                let cateUID = cateEl.uid.replaceAll('.','');

                let cateMainHtml = cateMainTemplate.clone();
                cateMainHtml.attr('id', cateUID)
                cateMainHtml.find('[data-doc="title"]').text(cateName)
                $('.doc-main-wrap').append(cateMainHtml)

                let cateStickyHtml = cateStickyTemplate.clone();
                cateStickyHtml.find('.term-toc-item-number').text(`${i + 1}.`)
                cateStickyHtml.find('.term-toc-item-txt').text(cateName)
                cateStickyHtml.attr('href', `#${cateUID}`)
                $('.term-toc-inner').append(cateStickyHtml)
            });
            allDoc.forEach((docEl, i) => {
                let docName = docEl.data.name;
                let docParent = docEl.data.document_category.uid.replaceAll('.','');
                let docURL = docEl.data.pdf_file.url;

                let cateItemHtml = cateItemTemplate.clone();
                cateItemHtml.find('.doc-item-title').text(docName)
                cateItemHtml.attr('href', docURL)
                $(`.doc-main-group#${docParent}`).find('.doc-main-items').append(cateItemHtml)
            })
        }
        function docInteraction() {
            let allCateGroups = $('.doc-main-group');
            lenis.on('scroll', function(e) {
                for (let x = 0; x < allCateGroups.length; x++) {
                    let top = allCateGroups.eq(x).get(0).getBoundingClientRect().top;
                    if (top > 0 && top < ($(window).height() / 5)) {
                        $('.term-toc-item-link').eq(x).addClass('active');
                        $('.term-toc-item-link').not(`:eq(${x})`).removeClass('active');
                        $('.term-toc-head-txt').text($('.term-toc-item-link.active .term-toc-item-txt').text())
                    }
                }
            })
            docTocNav();
        }
        function docTocNav() {
            if ($(window).width() < 767) {
                $('.term-toc-head').on('click', function(e) {
                    e.preventDefault();
                    if ($(this).hasClass('on-open')) {
                        $(this).removeClass('on-open');
                        $('.term-toc-inner').removeClass('on-open')
                    } else {
                        $(this).addClass('on-open');
                        $('.term-toc-inner').addClass('on-open')
                    }
                })
            }
            $('.term-toc-item-link').on('click', function (e) {
                $('.term-toc-head').removeClass('on-open');
                $('.term-toc-inner').removeClass('on-open');
                lenis.scrollTo($(this).attr('href'),{offset: -100})
            })
            $('.term-main').on('click', function(e) {
                $('.term-toc-head').removeClass('on-open');
                $('.term-toc-inner').removeClass('on-open');
            })
        }
    }
    SCRIPT.waitlistScript = () => {
    }
    SCRIPT.interimHomeScript = () => {
        lenis.destroy()
    }
    SCRIPT.recommendScript = () => {
        console.log('enter recommend')
        let param = window.location.search;
        if (window.location.host.includes('webflow') || window.location.host.includes('thecore')) {
            console.log(param)
            let values;
            try {
                values = JSON.parse('{"' + decodeURI(param.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
                if (param != '') {
                    let firmName = values.firm;
                    let convertFirmName = firmName.toLowerCase().replaceAll(' ','-')
                    getDetail('recommendation', convertFirmName).then((res) => {
                        console.log(res)
                        $('.doc-main-group-single').html(createRecommendContent(res.data.content))
                        $('[data-firm="replace"]').text(res.data.firm_name);
                    }).catch((e) => {
                        $('[data-firm="replace"]').text(firmName);
                    })
                }
            } catch (e) {
                values = JSON.parse('{"' + decodeURI(param.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
                let firmName = values.firm
                $('[data-firm="replace"]').text(firmName);
            }
        } else {
            if (param != '') {
                let values = JSON.parse('{"' + decodeURI(param.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
                console.log(values)
                let firmName
                if (window.location.host.includes('webflow')) {
                    firmName = values.firm.replaceAll('+',' ')
                } else {
                    firmName = values.firm;
                }
                $('[data-firm="replace"]').text(firmName);
            }
        }


    }
    SCRIPT.comingScript = () => {
        console.log('enter coming')
        if ($('.intro-wrap').length >= 1) {
            $('.intro-wrap').addClass('loaded')
        }
    }
    const pageName = $('.main').attr('data-barba-namespace');
    if (pageName) {
        console.log(pageName)
        SCRIPT[(`${pageName}Script`)]();
    }
}

window.onload = mainScript;