const mainScript = () => {
    function debounce(func, delay = 100){
        let timer;
        return function(event) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, delay, event);
        };
    }
    function checkOS() {
        if (typeof window == "undefined") return {};

        if (typeof deviceInfo == "undefined") {
            var unknown = "-";

            // screen
            var screenSize = "";
            if (screen.width) {
                var width = screen.width ? screen.width : "";
                var height = screen.height ? screen.height : "";
                screenSize += "" + width + " x " + height;
            }

            // browser
            var nVer = navigator.appVersion;
            var nAgt = navigator.userAgent;
            var browser = navigator.appName;
            var version = "" + parseFloat(navigator.appVersion);
            var majorVersion = parseInt(navigator.appVersion, 10);
            var nameOffset, verOffset, ix;

            // Opera
            if ((verOffset = nAgt.indexOf("Opera")) != -1) {
                browser = "Opera";
                version = nAgt.substring(verOffset + 6);
                if ((verOffset = nAgt.indexOf("Version")) != -1) {
                    version = nAgt.substring(verOffset + 8);
                }
            }
            // Opera Next
            if ((verOffset = nAgt.indexOf("OPR")) != -1) {
                browser = "Opera";
                version = nAgt.substring(verOffset + 4);
            }
            // Edge
            else if ((verOffset = nAgt.indexOf("Edge")) != -1) {
                browser = "Microsoft Edge";
                version = nAgt.substring(verOffset + 5);
            }
            // MSIE
            else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
                browser = "Microsoft Internet Explorer";
                version = nAgt.substring(verOffset + 5);
            }
            // Chrome
            else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
                browser = "Chrome";
                version = nAgt.substring(verOffset + 7);
            }
            // Safari
            else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
                browser = "Safari";
                version = nAgt.substring(verOffset + 7);
                if ((verOffset = nAgt.indexOf("Version")) != -1) {
                    version = nAgt.substring(verOffset + 8);
                }
            }
            // Firefox
            else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
                browser = "Firefox";
                version = nAgt.substring(verOffset + 8);
            }
            // MSIE 11+
            else if (nAgt.indexOf("Trident/") != -1) {
                browser = "Microsoft Internet Explorer";
                version = nAgt.substring(nAgt.indexOf("rv:") + 3);
            }
            // Other browsers
            else if ((nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/"))) {
                browser = nAgt.substring(nameOffset, verOffset);
                version = nAgt.substring(verOffset + 1);
                if (browser.toLowerCase() == browser.toUpperCase()) {
                    browser = navigator.appName;
                }
            }
            // trim the version string
            if ((ix = version.indexOf(";")) != -1) version = version.substring(0, ix);
            if ((ix = version.indexOf(" ")) != -1) version = version.substring(0, ix);
            if ((ix = version.indexOf(")")) != -1) version = version.substring(0, ix);

            majorVersion = parseInt("" + version, 10);
            if (isNaN(majorVersion)) {
                version = "" + parseFloat(navigator.appVersion);
                majorVersion = parseInt(navigator.appVersion, 10);
            }

            // mobile version
            var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

            // cookie
            var cookieEnabled = navigator.cookieEnabled ? true : false;

            if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
                document.cookie = "testcookie";
                cookieEnabled = document.cookie.indexOf("testcookie") != -1 ? true : false;
            }

            // system
            var os = unknown;
            var clientStrings = [
                { s: "Windows 10", r: /(Windows 10.0|Windows NT 10.0)/ },
                { s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/ },
                { s: "Windows 8", r: /(Windows 8|Windows NT 6.2)/ },
                { s: "Windows 7", r: /(Windows 7|Windows NT 6.1)/ },
                { s: "Windows Vista", r: /Windows NT 6.0/ },
                { s: "Windows Server 2003", r: /Windows NT 5.2/ },
                { s: "Windows XP", r: /(Windows NT 5.1|Windows XP)/ },
                { s: "Windows 2000", r: /(Windows NT 5.0|Windows 2000)/ },
                { s: "Windows ME", r: /(Win 9x 4.90|Windows ME)/ },
                { s: "Windows 98", r: /(Windows 98|Win98)/ },
                { s: "Windows 95", r: /(Windows 95|Win95|Windows_95)/ },
                { s: "Windows NT 4.0", r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
                { s: "Windows CE", r: /Windows CE/ },
                { s: "Windows 3.11", r: /Win16/ },
                { s: "Android", r: /Android/ },
                { s: "Open BSD", r: /OpenBSD/ },
                { s: "Sun OS", r: /SunOS/ },
                { s: "Linux", r: /(Linux|X11)/ },
                { s: "iOS", r: /(iPhone|iPad|iPod)/ },
                { s: "Mac OS X", r: /Mac OS X/ },
                { s: "Mac OS", r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
                { s: "QNX", r: /QNX/ },
                { s: "UNIX", r: /UNIX/ },
                { s: "BeOS", r: /BeOS/ },
                { s: "OS/2", r: /OS\/2/ },
                { s: "Search Bot", r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ },
            ];
            for (var id in clientStrings) {
                var cs = clientStrings[id];
                if (cs.r.test(nAgt)) {
                    os = cs.s;
                    break;
                }
            }

            var osVersion = unknown;

            if (/Windows/.test(os)) {
                const _osv = /Windows (.*)/.exec(os) || [];
                osVersion = _osv[1] || "unknown";
                os = "Windows";
            }

            switch (os) {
                case "Mac OS X":
                    const _osvx = /Mac OS X (10[\.\_\d]+)/.exec(nAgt);
                    osVersion = _osvx?.[1] || "unknown";
                    break;

                case "Android":
                    osVersion = /Android ([\.\_\d]+)/.exec(nAgt)?.[1] || "unknown";
                    break;

                case "iOS":
                    const _osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer) || [0, 0, 0];
                    osVersion = (_osVersion[1] || 0) + "." + (_osVersion[2] || 0) + "." + (_osVersion[3] || 0);
                    break;
            }

            const _deviceInfo = {
                screen: screenSize,
                browser: browser,
                browserVersion: version,
                browserMajorVersion: majorVersion,
                mobile: mobile,
                os: os,
                osVersion: osVersion,
                cookies: cookieEnabled,
            };

            deviceInfo = _deviceInfo;
        }
        return deviceInfo;
    };
    function isSafariDesktop() {
        return checkOS().browser == 'Safari' && !checkOS().mobile;
    }
    function refreshOnBreakpoint() {
        let initialViewportWidth = window.innerWidth || document.documentElement.clientWidth;
        let newViewportWidth;
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
    function resetScroll() {
        if (window.location.hash !== '') {
            console.log('has hash')
            if ($(window.location.hash).length >=1) {
                console.log('dom hash')
                window.scrollTo(0, $(window.location.hash).offset().top)
                setTimeout(() => {
                    window.scrollTo(0, $(window.location.hash).offset().top)
                }, 300);
            } else {
                scrollTop()
            }
        } else if (window.location.search !== '') {
            let searchObj = JSON.parse('{"' + decodeURI(location.search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
            console.log('has search')
            if (searchObj.sc) {
                if ($(`#${searchObj.sc}`).length >=1) {
                    console.log('dom search')
                    window.scrollTo(0, $(`#${searchObj.sc}`).offset().top)
                    setTimeout(() => {
                        window.scrollTo(0, $(`#${searchObj.sc}`).offset().top)
                    }, 300);
                } else {
                    scrollTop()
                }
            }
        } else {
            scrollTop()
        }
    }
    resetScroll()
    function scrollTop() {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        } else {
            window.addEventListener('pageshow', function(event) {
                if (!event.persisted) {
                    window.scrollTo(0, 0);
                }
            });
        }
        window.scrollTo(0, 0);
    }
    barba.use(barbaPrefetch);
    gsap.registerPlugin(ScrollTrigger);
    

    const lenis = new Lenis()

    gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Utils
    function replaceHyphenWithSpan(el) {
        $(el).html(function (index, oldHtml) {
          return oldHtml.replaceAll("-", "<span>-</span>");
        });
      }
    function isInViewport(el) {
        const rect = document.querySelector(el).getBoundingClientRect();
        return (
            rect.top >= (window.innerHeight || document.documentElement.clientHeight) * -1 &&
            rect.bottom >= 0
        );
    }
    function isInHeaderCheck(el) {
        const rect = $(el).get(0).getBoundingClientRect();
        const headerRect = $('.header').get(0).getBoundingClientRect();
        return (
            rect.bottom >= 0 &&
            rect.top - headerRect.height / 2 <=0
        );
    }
    const viewport = {
        w: window.innerWidth,
        h: window.innerHeight
    }
    function updateViewportSize() {
        viewport.w = window.innerWidth;
        viewport.h = window.innerHeight;
    }
    $(window).on('resize', updateViewportSize)

    const lerp = (a,b,t = 0.08) => {
        return a + (b - a) * t;
    }
    const xSetter = (el) => gsap.quickSetter(el, 'x', `px`);
    const ySetter = (el) => gsap.quickSetter(el, 'y', `px`);
    const xGetter = (el) => gsap.getProperty(el, 'x');
    const yGetter = (el) => gsap.getProperty(el, 'y');

    const isTouchDevice = () => {
        return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
    }
    const pointer = {
        x: $(window).width() / 2,
        y: $(window).height() / 2,
        xNor: $(window).width() / 2 / $(window).width(),
        yNor: $(window).height() / 2 / $(window).height()
    }
    if (!isTouchDevice()) {
        $('html').attr('data-has-cursor', 'true')
        window.addEventListener('pointermove', function(e) {
            updatePointer(e)
        })
    } else {
        $('html').attr('data-has-cursor', 'false')
        window.addEventListener('pointerdown', function(e) {
            updatePointer(e)
        })
    }
    function updatePointer(e) {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        pointer.xNor = ((e.clientX / $(window).width()) - .5) * 2;
        pointer.yNor = ((e.clientY / $(window).height()) - .5) * 2;
        if (load.isDoneLoading()) {
            if (cursor.userMoved != true) {
                cursor.userMoved = true;
                cursor.init()
            }
        }
    }

    const parseRem = (input) => {
        return input / 10 * parseFloat($('html').css('font-size'))
    }
    function activeItem(elArr, index) {
        elArr.forEach((el, idx) => {
            $(el).removeClass('active').eq(index).addClass('active')
        })
    }
    function clearProps(el) {
        gsap.set(el, {clearProps: 'all'})
    }
    function removeAllScrollTrigger() {
        let triggers = ScrollTrigger.getAll();
        triggers.forEach(trigger => {
            trigger.kill();
        });
    }
    function getVisibility(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
        // Calculate the percentage of the element that is visible
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
    
        // Return the smaller of the height and width percentages, as it represents the limiting factor
        return Math.min(visibleHeight / rect.height, visibleWidth / rect.width);
    }
    function findMostVisibleElement(elements) {
        let mostVisibleElement = null;
        let maxVisibility = 0;
    
        elements.forEach((element) => {
            const visibility = getVisibility(element);
            if (visibility > maxVisibility) {
                maxVisibility = visibility;
                mostVisibleElement = element;
            }
        });
    
        return mostVisibleElement;
    }
    function reinitializeWebflow() {
        console.log('reinitialize webflow');
        window.Webflow && window.Webflow.destroy();
        window.Webflow && window.Webflow.ready();
    }
    const formSubmitEvent = (function () {
        const init = ({
            onlyWorkOnThisFormName,
            onSuccess,
            onFail
        }) => {
            $(document).on('ajaxSend', function (event, xhr, settings) {
                if (settings.url.includes("https://webflow.com/api/v1/form/")) {
                    let form = $('.home-subscr-wrap').find('form')
                    let input = form.find('input.home-subscr-input-wrap')
                    input.val('Please wait...');
                }
            });
            $(document).on('ajaxComplete', function (event, xhr, settings) {
                if (settings.url.includes("https://webflow.com/api/v1/form/")) {
                    const isSuccessful = xhr.status === 200
                    const isWorkOnAllForm = onlyWorkOnThisFormName == undefined
                    const isCorrectForm = !isWorkOnAllForm && settings.data.includes(getSanitizedFormName(onlyWorkOnThisFormName));

                    if (isWorkOnAllForm) {
                        if (isSuccessful) {
                            onSuccess?.()
                        } else {
                            onFail?.()
                        }
                    } else if (isCorrectForm) {
                        if (isSuccessful) {
                            onSuccess?.()
                        } else {
                            onFail?.()
                        }
                    }
                }
            });
        }
        function getSanitizedFormName(name) {
            return name.replaceAll(" ", "+")
        }
        return {
            init
        }
    })();
    formSubmitEvent.init({
        onlyWorkOnThisFormName: "Email Form",
        onSuccess: () => {
            let form = $('.home-subscr-wrap').find('form')
            let input = form.find('input.home-subscr-input-wrap')
            input.val('Thank you for subscribing!')

            setTimeout(() => {
                form.trigger('reset')
            }, 3000);
        },
        onFail: () => {
            let form = $('.home-subscr-wrap').find('form')
            let input = form.find('input.home-subscr-input-wrap')
            input.val('Oops! Something went wrong while submitting the form.');
            input.css('color', '#E00F02')

            setTimeout(() => {
                gsap.set(input, {clearProps: 'color'})
                form.trigger('reset')
            }, 3000);
        }
    });
    formSubmitEvent.init({
        onlyWorkOnThisFormName: "Apply Form",
        onSuccess: () => {
            let form = $('.apply-wrap').find('form')
            let statusWrap = form.find('.apply-status-wrap')
            statusWrap.find('.apply-status-txt').addClass('success')
            statusWrap.find('.apply-status-txt').val('Thank you! Your submission has been received!')
            statusWrap.slideDown()

            setTimeout(() => {
                form.trigger('reset')
                statusWrap.slideUp()
                statusWrap.find('.apply-status-txt').removeClass('success')
            }, 3000);
        },
        onFail: () => {
            let form = $('.apply-wrap').find('form')
            let statusWrap = form.find('.apply-status-wrap')
            statusWrap.find('.apply-status-txt').addClass('error')
            statusWrap.find('.apply-status-txt').val('Oops! Something went wrong while submitting the form.')
            statusWrap.slideDown()

            setTimeout(() => {
                form.trigger('reset')
                statusWrap.slideUp()
                statusWrap.find('.apply-status-txt').removeClass('error')
            }, 3000);
        }
    });
    function copyTextToClipboard(text) {
        if (checkOS().browser == 'Safari' && checkOS().mobile && navigator.share) {
            shareOnIos()
        } else {
            let textArea = document.createElement('textarea');
            textArea.style.display = 'none';
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            navigator.clipboard
            .writeText(text)
            .then(() => {
                console.log('Text copied to clipboard');
            })
            .catch((error) => {
                console.error('Failed to copy text to clipboard:', error);
            });
            document.body.removeChild(textArea);
        }
    }
    function shareOnIos() {
        navigator.share({
            title: window.document.title,
            text: $('meta[name="description"]').attr('content') || 'Check out this job!',
            url: window.location.href
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing:', error));
    }
    // End-Utils

    // JobCount
    let jobCount = $('.data-src-item').length;
    function updateJobCount() {
        let allJobCount = $('[data-job-count]');
        if (allJobCount.length >= 1) {
            allJobCount.each((idx, el) => {
                if ($(el).attr('data-job-count') == 'left') {
                    let currItem = $(el).closest('section').find('[data-job="item"]').length;
                    let newTxt = $(el).html().replaceAll('[job-count]', jobCount - currItem)
                    $(el).html(newTxt)
                } else {
                    let newTxt = $(el).html().replaceAll('[job-count]', jobCount)
                    $(el).html(newTxt)
                }
            })
        }
    }
    updateJobCount()

    // Loading
    class Loading {
        constructor() {
            this.isLoaded = sessionStorage.getItem("isLoaded") == 'true' ? true : false;
            this.doneLoad = false;
            this.tlLoading = gsap.timeline({
                paused: true,
                defaults: {
                    ease: 'none'
                },
                onUpdate() {
                    let progVal = Math.floor(this.progress() * 100)
                    // $('.header .header-counter').text(progVal < 10 ? `00${progVal}` : progVal < 100 ? `0${progVal}` : progVal)
                    $('.header .header-counter').text(progVal)
                }
            })
    
            this.tlLoading
            .fromTo('.header-left-inner', {'margin-left': '100%'}, {x: 0, 'margin-left': '0%', duration: 2}, 0)
            .fromTo('.header-right-inner', {'margin-right': '100%'}, {x: 0, 'margin-right': '0%', duration: 2}, 0);

            this.tlLoadDone = gsap.timeline({
                delay: this.isLoaded ? .3 : 0,
                paused: true,
                onStart: () => {
                    $('.header .header-logo-color').removeClass('on-load')
                },
                onComplete: () => {
                    sessionStorage.getItem("isLoaded") == 'true' ? null : sessionStorage.setItem("isLoaded", 'true')
                    this.doneLoad = true;
                    this.initHeroAnim()
                    setTimeout(() => {
                        updateOnscroll()
                    }, 500)
                }
            })
            if (this.isLoaded) {
                this.tlLoadDone
                .to('.header .header-logo-color', {autoAlpha: 1, duration: 1, 'mask-image': 'radial-gradient(60% 112.5% at 50% 0,rgba(0,0,0,1) 100%,rgba(0,0,0,0)100%)', ease: 'expo.in'}, 0)
                .set('.header-inner-bot', {yPercent: -100, autoAlpha: 0, ease: 'power1.inOut'}, 0)
                .set('.header-inner-top', {y: 0, autoAlpha: 1, ease: 'power1.inOut'}, 0)
            } else {
                this.tlLoadDone
                .to('.header .header-logo-color', {autoAlpha: 1, duration: 1, 'mask-image': 'radial-gradient(60% 112.5% at 50% 0,rgba(0,0,0,1) 100%,rgba(0,0,0,0)100%)', ease: 'expo.in'}, 0)
                .to('.header-inner-bot', {yPercent: -100, autoAlpha: 0, duration: 1, ease: 'power1.inOut'}, 0)
                .to('.header-inner-top', {y: 0, autoAlpha: 1, duration: .8, ease: 'power1.inOut'}, 0)
            }
    
            this.tlLoadMaster = gsap.timeline({
                paused: true,
                delay: this.isLoaded ? 0 : 1,
            })
            if (this.isLoaded) { 
                this.tlLoadMaster
                .to(this.tlLoading, {progress: 1, duration: .1, ease: "power2.easeInOut", onComplete: () => {
                    this.tlLoadDone.play().then(() => {
                        $('.header-left, .header-right').addClass('active')
                    })}}
                )
            } else {
                $('.header-left, .header-right').addClass('active')
                this.tlLoadMaster
                .to(this.tlLoading, {progress: .34, duration: 1.1, ease: "power2.easeInOut"})
                .to(this.tlLoading, {progress: .75, duration: .8, ease: "power2.easeInOut"})
                .to(this.tlLoading, {progress: 1, duration: .6, ease: "power2.easeInOut", onComplete: () => {this.tlLoadDone.play()}})
            }
        }
        
        init() {
            this.tlLoadMaster.play()
        }
        isDoneLoading() {
            return this.doneLoad;
        }
        initHeroAnim() {
            if ($('[data-barba-namespace="home"]').length) {
                homeHeroAnim.play()
            } else if ($('[data-barba-namespace="location"]').length) {
                locHeroAnim.play()
            } else if ($('[data-barba-namespace="careers"]').length) {
                carHeroAnim.play()
            } else if ($('[data-barba-namespace="career-detail"]').length) {
                cardtlHeroAnim.play()
                cardtlMainAnim.play()
            } else if ($('[data-barba-namespace="legal"]').length) {
                legalHeroAnim.play()
                legalMainAnim.play()
            }
            footerAnim.setTrigger()
            gsap.to('.header', {height: parseRem(viewport.w > 767 ? 100 : 80), 'background-color': 'rgba(14,14,14,0)', duration: .8, ease: 'power1.inOut', onComplete: () => {$('.header').css('height', 'auto')}})
            $('.header').addClass('on-ready')
        }
    }
    let load = new Loading();
    // End-Loading

    // Cursor
    class Cursor {
        constructor() {
            this.targetX = pointer.x;
            this.targetY = pointer.y;
            this.userMoved = false;
            if (isSafariDesktop()) {
                $('.cursor-blur').css('display', 'none')
                $('.body-inner').css('position', 'relative')
            }
            xSetter('.cursor-main.main-inner')(this.targetX)
            ySetter('.cursor-main.main-inner')($('.header-logo-color').offset().top)
            xSetter('.cursor-main.main-outer')(this.targetX)
            ySetter('.cursor-main.main-outer')($('.header-logo-color').offset().top)
            xSetter('.cursor-main.main-blur')(this.targetX)
            ySetter('.cursor-main.main-blur')($('.header-logo-color').offset().top)
            xSetter('.cursor-main.main-txt')(this.targetX)
            ySetter('.cursor-main.main-txt')($('.header-logo-color').offset().top)
        }
        init() {
            requestAnimationFrame(this.update.bind(this))
            $('.cursor-outer, .cursor-inner, .cursor-blur').addClass('active')
        }
        isUserMoved() {
            return this.userMoved;
        }
        update() {
            if (this.userMoved || load.isDoneLoading()) {
                this.updatePosition()
            }
            requestAnimationFrame(this.update.bind(this))
        }
        updatePosition() {
            this.targetX = pointer.x;
            this.targetY = pointer.y;
            let targetInnerX = xGetter('.cursor-main.main-inner');
            let targetInnerY = yGetter('.cursor-main.main-inner');
            let targetOuterX = xGetter('.cursor-main.main-outer');
            let targetOuterY = yGetter('.cursor-main.main-outer');
            let targetBlurX = xGetter('.cursor-main.main-blur');
            let targetBlurY = yGetter('.cursor-main.main-blur');
            let targetTextX = xGetter('.cursor-main.main-txt');
            let targetTextY = yGetter('.cursor-main.main-txt');

            if ($('[data-cursor]:hover').length) {
                this.onHover()
            } else {
                this.reset()
            }

            if (Math.hypot(this.targetX - targetOuterX ,this.targetY - targetOuterY) > 1 || Math.abs(lenis.velocity) > .1) {
                xSetter('.cursor-main.main-inner')(lerp(targetInnerX, this.targetX, 0.1))
                ySetter('.cursor-main.main-inner')(lerp(targetInnerY, this.targetY - lenis.velocity / 16 , 0.1))

                xSetter('.cursor-main.main-outer')(lerp(targetOuterX, this.targetX, 0.09))
                ySetter('.cursor-main.main-outer')(lerp(targetOuterY, this.targetY - lenis.velocity / 8, 0.09))

                xSetter('.cursor-main.main-blur')(lerp(targetBlurX, this.targetX, 0.06))
                ySetter('.cursor-main.main-blur')(lerp(targetBlurY, this.targetY - lenis.velocity, 0.06))
                
                xSetter('.cursor-main.main-txt')(lerp(targetTextX, this.targetX, 0.09))
                ySetter('.cursor-main.main-txt')(lerp(targetTextY, this.targetY - lenis.velocity / 8, 0.09))
            }
        }
        onHover() {
            let type = $('[data-cursor]:hover').attr('data-cursor');
            if ($('.home-test-wrap').length >= 1) {
                if (isInViewport('.home-testi-wrap')) {
                    this.reset()
                }   
            }
            switch (type) {
                case 'txtlink':
                    $('.cursor-outer').removeClass('active').addClass('on-hover-txtlink')
                    $('.cursor-inner').removeClass('active')
                    $('.cursor-inner-ic-wrap').addClass('on-hover-txtlink')
                    $('.cursor-blur').removeClass('active').addClass('on-hover')
                    let targetEl;
                    if ($('[data-cursor]:hover').attr('data-cursor-txtLink') == 'parent') {
                        targetEl = $('[data-cursor]:hover').parent()
                    } else if ($('[data-cursor]:hover').attr('data-cursor-txtlink') == 'child') {
                        targetEl = $('[data-cursor]:hover').find('[data-cursor-txtlink-child]')
                        if (targetEl.attr('data-cursor-txtlink-child') == 'md') {
                            $('.cursor-inner-ic-wrap').addClass('on-hover-md')
                        }
                    } else {
                        targetEl = $('[data-cursor]:hover')
                    }

                    let targetGap = 8;
                    if ($('[data-cursor]:hover').attr('data-cursor-txtlink-gap')) {
                        targetGap = $('[data-cursor]:hover').attr('data-cursor-txtlink-gap')
                    }
                    let getLineheight
                    if (targetEl.find('.txt').eq(0).length) {
                        getLineheight = parseInt(targetEl.find('.txt').eq(0).css('line-height'))
                    } else {
                        getLineheight = parseInt(targetEl.css('line-height'))
                    }
                    
                    if (targetEl.attr('data-cursor-txtlink-rev') == 'true') {
                        $('.cursor-inner-ic-wrap').addClass('on-hover-rev')
                        $('.cursor-outer').addClass('on-hover-rev')
                        this.targetX = targetEl.get(0).getBoundingClientRect().left + targetEl.get(0).getBoundingClientRect().width + parseRem(targetGap * 1.2) + $('.cursor-inner-ic-wrap').width() / 2;
                    } else {
                        this.targetX = targetEl.get(0).getBoundingClientRect().left - parseRem(targetGap) - $('.cursor-inner-ic-wrap').width() / 2;
                    }
                    
                    this.targetY = targetEl.get(0).getBoundingClientRect().top + getLineheight / 2;
                    break;
                case 'ext':
                    let targetElExt = $('[data-cursor="ext"]:hover')
                    if (targetElExt.attr('data-cursor-ext')) {
                        $('.cursor-txt-wrap').find('.cursor-inner-txt').text(targetElExt.attr('data-cursor-ext'))
                    } else {
                        $('.cursor-txt-wrap').find('.cursor-inner-txt').text('View')    
                    }
                    $('.cursor-outer').removeClass('active').addClass('on-hover-txtlink')
                    $('.cursor-inner').removeClass('active')

                    $('.cursor-inner-ic-wrap').addClass('on-hover-txtlink').addClass('on-hover-md')
                    $('.cursor-blur').removeClass('active').addClass('on-hover')
                    $('.cursor-txt-wrap').addClass('active')
                    this.targetX = pointer.x;
                    this.targetY = pointer.y;
                    break;
                case 'logo':
                    let targetElLogo = $('[data-cursor="logo"]:hover').find('.header-logo-glow path:nth-child(1)')
                    $('.cursor-inner').removeClass('active')
                    $('.cursor-outer').removeClass('active')
                    this.targetX = targetElLogo.get(0).getBoundingClientRect().left + targetElLogo.get(0).getBoundingClientRect().width / 2;
                    this.targetY = targetElLogo.get(0).getBoundingClientRect().top + $('.cursor-outer').height() / 2;
                    break;
                case 'btn':
                    $('.cursor-outer').removeClass('active').addClass('on-hover-txtlink')
                    $('.cursor-inner').removeClass('active')
                    $('.cursor-inner-ic-wrap').addClass('on-hover-txtlink')
                    $('.cursor-blur').removeClass('active').addClass('on-hover')
                    let targetBtnInner;
                    if ($('[data-cursor="btn"]:hover').find('.txt-btn').length) {
                        targetBtnInner = $('[data-cursor="btn"]:hover').find('.txt-btn')
                    } else if ($('[data-cursor="btn"]:hover').find('.txt').length) {
                        targetBtnInner = $('[data-cursor="btn"]:hover').find('.txt')
                    }
                    
                    this.targetX = targetBtnInner.get(0).getBoundingClientRect().left - parseRem(12) - $('.cursor-main.main-inner').width() / 2;
                    this.targetY = targetBtnInner.get(0).getBoundingClientRect().top + targetBtnInner.get(0).getBoundingClientRect().height / 2;
                    break;
                case 'dot-wrap': 
                    $('.cursor-outer').removeClass('active').addClass('on-hover-dot')
                    $('.cursor-inner').removeClass('active').addClass('on-hover-dot')
                    $('.cursor-blur').removeClass('active').addClass('on-hover')
                    let dotEl;
                    dotEl = $('[data-cursor="dot-wrap"]:hover')
                    if (dotEl.attr('data-cursor-dot') == 'lg') {
                        $('.cursor-outer').addClass('on-hover-dot-lg')
                    }
                    if (dotEl.hasClass('cir-dot-1')) {
                        $('.cursor-outer').addClass('on-hover-top')
                    } else if (dotEl.hasClass('cir-dot-2')) {
                        $('.cursor-outer').addClass('on-hover-right')
                    } else if (dotEl.hasClass('cir-dot-3')) {
                        $('.cursor-outer').addClass('on-hover-bot')
                    } else if (dotEl.hasClass('cir-dot-4')) {
                        $('.cursor-outer').addClass('on-hover-left')
                    }
                    this.targetX = dotEl.get(0).getBoundingClientRect().left + dotEl.get(0).getBoundingClientRect().width / 2;
                    this.targetY = dotEl.get(0).getBoundingClientRect().top + dotEl.get(0).getBoundingClientRect().height / 2;
                    break;
                case 'testi-nav': 
                    $('.cursor-inner').removeClass('active')
                    $('.cursor-inner-ic-wrap').addClass('active')
                    if ($('[data-cursor]:hover').length == 1) {}
                    if (pointer.x >= viewport.w / 2) {
                        $('.cursor-outer').addClass('hover-ic-right').removeClass('hover-ic-left')
                        $('.cursor-inner-ic').addClass('hover-right').removeClass('hover-left')
                    } else {
                        $('.cursor-outer').addClass('hover-ic-left').removeClass('hover-ic-right')
                        $('.cursor-inner-ic').addClass('hover-left').removeClass('hover-right')
                    }
                    break;
                default:
                    break;
            }
        }
        reset() {
            $('.cursor-outer').addClass('active').removeClass('on-hover-txtlink').removeClass('on-hover-dot').removeClass('on-hover-dot-lg').removeClass('.on-hover-rev').removeClass('hover-ic-right').removeClass('hover-ic-left')
            $('.cursor-inner').addClass('active').removeClass('on-hover').removeClass('on-hover-dot')
            $('.cursor-blur').addClass('active').removeClass('on-hover')
            $('.cursor-inner-ic-wrap').removeClass('on-hover-txtlink').removeClass('on-hover-md').removeClass('on-hover-rev').removeClass('hover-right').removeClass('hover-left').removeClass('active')
            $('.cursor-inner-ic').removeClass('hover-right').removeClass('hover-left')
            $('.cursor-outer').removeClass('on-hover-top').removeClass('on-hover-right').removeClass('on-hover-bot').removeClass('on-hover-left')
            $('.cursor-txt-wrap').removeClass('active')
        }
    }
    let cursor = new Cursor();
    // End-Cursor

    // Header
    function updateOnscroll() {
        ScrollTrigger.update()
        if ($('.footer').length) {
            if ($('.footer').get(0).getBoundingClientRect().top < $('.header').outerHeight()) {
                $('.header').addClass('on-footer')
            } else {
                $('.header').removeClass('on-footer')
            }
        } else {
            $('.header').removeClass('on-footer')
        }

        $('[data-section]').each((idx, el) => {
            if (isInHeaderCheck(el)) {
                if ($(el).attr('data-section') == 'light') {
                    $('.header').addClass('on-light');
                } else {
                    $('.header').removeClass('on-light');
                }
            }
        })
    }
    updateOnscroll()
    lenis.on('scroll', function(inst) {
        updateOnscroll()
    })
    class Nav {
        constructor() {
            this.isInit = false;
            this.dist;
            this.oldIdx;
            this.currIdx;
            this.allowNav = true;
            this.allNavItems;
            this.navItemGrp;
        }
        setup(data) {
            this.isInit = true;
            this.dist = Math.floor($('.nav-menu-inner-grp').eq(0).width() + parseFloat($('.nav-menu-inner-grp').eq(0).css('margin-left')))
            this.oldIdx = 0;
            this.currIdx = $(`[data-nav].w--current`).parent('.nav-menu-link-wrap').index();

            this.allowNav = true;
            this.allNavItems = $('.nav-menu-inner-grp').eq(0).find('.nav-menu-link-wrap');
            let scrollerTemp = $('.nav-scroller-inner-grp').clone();
            for (let i = 0; i < 2; i++) {
                $('.nav-scroller-inner').append(scrollerTemp.clone())
            }
            this.setCenterScroller()
            $('.nav-menu-inner-grp').append(this.allNavItems.clone())

            this.navItemGrp = $('.nav-menu-inner-grp').clone();
            for (let i = 0; i < 4; i++) {
                $('.nav-menu-inner').append(this.navItemGrp.clone())
            }
            
            if (data) {
                this.updateNavActive(data)
            } else {
                this.targetPath(1, true)    
            }
            if (!isTouchDevice()) {
                $(window).on('wheel', (e) => {
                    if ($('.nav').hasClass('active')) {
                        if (e.originalEvent.deltaY > 0 || e.originalEvent.deltaX > 0) {
                            this.targetPath(-1)
                        } else if (e.originalEvent.deltaY < 0 || e.originalEvent.deltaX < 0) {
                            this.targetPath(1)
                        }
                    }
                })
            } else {
                const handleMouseDown = (e) => {
                    if ($('.nav').hasClass('active')) {
                        const startX = e.clientX;
                        const startY = e.clientY;
                
                        const handleMouseMove = (e) => {
                            const deltaX = e.clientX - startX;
                            const deltaY = e.clientY - startY;
                
                            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                                if (deltaX > 0) {
                                    this.targetPath(1)
                                } else {
                                    this.targetPath(-1)
                                }
                            }
                        };
                        window.ontouchmove = (e) => handleMouseMove(e.touches[0]);
                    }
                };
                window.ontouchstart = (e) => handleMouseDown(e.touches[0]);
            }``
            
        }
        targetPath(dir, isSet = false) {
            if (!this.allowNav) {return;}
            this.allowNav = false;
            $('[data-nav]').removeClass('active')
            $('.nav-scroller-item').removeClass('active')
            gsap.to('.nav-ang-grad-wrap .ang-grad-wrap', {'opacity': '.7', duration: .4})
            if (isSet) {
                this.currIdx = this.currIdx * -1
                this.oldIdx = this.currIdx;
            } else {
                this.oldIdx = this.currIdx
                if (dir == 1 && this.oldIdx == this.allNavItems.length) {
                    this.oldIdx = 0
                } else if (dir == -1 && this.oldIdx == 0) {
                    this.oldIdx = this.allNavItems.length
                }
                this.currIdx = this.oldIdx + dir
                gsap.set('.nav-menu-inner-grp', {x: this.oldIdx * (this.dist / this.allNavItems.length) - (this.dist * 2), delay: .3})
            }
            requestAnimationFrame(() => {
                gsap.to('.nav-menu-inner-grp', {x: this.currIdx * (this.dist / this.allNavItems.length) - (this.dist * 2), delay: .3, duration: isSet ? 0 : .8, ease: 'power2.inOut', onComplete: () => {
                    $('.nav-menu-link-wrap').each((idx, el) => {
                        let left = el.getBoundingClientRect().left;
                        if (left < (viewport.w / 2 + 20) && left > (viewport.w / 2 - 20)) {
                            $(el).find('.nav-menu-link').addClass('active')
                            this.activeNavItem($(el).index())
                        }
                    })
                    this.allowNav = true;
                    gsap.to('.nav-ang-grad-wrap .ang-grad-wrap', {'opacity': '1', duration: .4})
                }})

                if (dir == 1) {
                    gsap.set('.nav-scroller-inner-grp', {x: 1 * (parseRem(12) * 4), delay: .3})
                    gsap.to('.nav-scroller-inner-grp', {x: 3 * (parseRem(12) * 4), delay: .3, duration: isSet ? 0 : .8, ease: 'power2.inOut', onComplete: () => {
                        this.setCenterScroller()
                    }})    
                } else if (dir == -1) {
                    gsap.set('.nav-scroller-inner-grp', {x: 3 * (parseRem(12) * 4), delay: .3})
                    gsap.to('.nav-scroller-inner-grp', {x: 1 * (parseRem(12) * 4), delay: .3, duration: isSet ? 0 : .8, ease: 'power2.inOut', onComplete: () => {
                        this.setCenterScroller()
                    }})
                }
                
                
            })
        }
        setCenterScroller() {
            $('.nav-scroller-item').each((idx, el) => {
                let left = el.getBoundingClientRect().left + el.getBoundingClientRect().width / 2;
                if (left < (viewport.w / 2 + 2) && left > (viewport.w / 2 - 2)) {
                    $(el).addClass('active')
                }
            })
        }
        activeNavItem(idx) {
            $('.nav-menu-link').removeClass('active');
            $(`.nav-menu-link-wrap:nth-child(${idx + 1})`).find('.nav-menu-link').addClass('active')
        }
        open() {
            if ($('.header').hasClass('animating')) {return;}
            this.init()
            $('.nav').css({
                '--col-1': '0vh',
                '--col-2': '0vh',
                '--col-3': '0vh',
                '--col-4': '0vh',
            }) 
            $('.nav-inner').css({
                'clip-path': 'polygon(0% -2%, 0% var(--col-1), 25% var(--col-1), 25% -2%, 25% var(--col-2), 50% var(--col-2), 50% -2%, 50% var(--col-3), 75% var(--col-3), 75% -2%, 75% var(--col-4), 100% var(--col-4), 100% -2%)',
            })
            gsap.set('.nav-scroller-wrap', {autoAlpha: 0})
            gsap.set('.nav-menu-wrap', {autoAlpha: 0})
            gsap.set('.nav-ang-grad-wrap', {autoAlpha: 0})

            gsap.set('.nav', {autoAlpha: 1, '--nav-grad-deg': '0deg'})
            lenis.stop()
            let tlNavOpen = gsap.timeline({
                onStart: () => {
                    $('.header').addClass('animating')
                    $('.nav').addClass('active')
                    $('.header').addClass('on-open')
                },
                onComplete: () => {
                    $('.header').removeClass('animating')
                }
            })
            tlNavOpen
            
            .to('.main', {autoAlpha: .1,  duration: 1, ease: 'power1.out'}, 0)
            .to('.nav', {'--col-1': '100vh', duration: 1, ease: 'power1.out'}, 0)
            .to('.nav', {'--col-2': '100vh', duration: 1 - .1, ease: 'power1.out'}, `<=${.1}`)
            .to('.nav', {'--col-3': '100vh', duration: 1 - .1 * 2, ease: 'power1.out'}, `<=${.1}`)
            .to('.nav', {'--col-4': '100vh', duration: 1 - .1 * 3, ease: 'power1.out'}, `<=${.1}`)
            .to('.nav-scroller-wrap', {autoAlpha: 1, duration: .6, ease: 'power2.out'}, .4)
            .to('.nav-menu-wrap', {autoAlpha: 1, duration: .6, ease: 'power2.out'}, '<=.2')
            .to('.nav-ang-grad-wrap', {autoAlpha: 1, duration: 1.2}, '<=.2')
            .to('.nav', { '--nav-grad-deg': '24deg', duration: 1.2}, '<=0')
        }
        close() {
            if ($('.header').hasClass('animating')) {return;}
            $('.nav').css({
                '--col-1': '100vh',
                '--col-2': '100vh',
                '--col-3': '100vh',
                '--col-4': '100vh',
            }) 
            $('.nav-inner').css({
                'clip-path': 'polygon(0% -2%, 0% var(--col-1), 25% var(--col-1), 25% -2%, 25% var(--col-2), 50% var(--col-2), 50% -2%, 50% var(--col-3), 75% var(--col-3), 75% -2%, 75% var(--col-4), 100% var(--col-4), 100% -2%)',
            })

            gsap.set('.nav-scroller-wrap', {autoAlpha: 1})
            gsap.set('.nav-menu-wrap', {autoAlpha: 1})
            gsap.set('.nav-ang-grad-wrap', {autoAlpha: 1})
            gsap.set('.nav', {autoAlpha: 1, '--nav-grad-deg': '24deg'})
            lenis.start()
            let tlNavClose = gsap.timeline({
                onStart: () => {
                    $('.header').addClass('animating')
                },
                onComplete: () => {
                    $('.nav').removeClass('active')
                }
            })
            tlNavClose
            .to('.nav', { '--nav-grad-deg': '0deg', duration: 1.2})
            .to('.nav-ang-grad-wrap', {autoAlpha: 0, duration: 1.2}, '<=0')
            .to('.nav-menu-wrap', {autoAlpha: 0, duration: .6, ease: 'power2.out'}, '<=.2')
            .to('.nav-scroller-wrap', {autoAlpha: 0, duration: .6, ease: 'power2.out', onComplete: () => {
                $('.header').removeClass('on-open')
                $('.header').removeClass('animating')
            }}, '<=.2')
            
            .to('.main', {autoAlpha: 1, duration: 1, ease: 'power1.out' }, '<=0')
            .to('.nav', {'--col-1': '0vh', duration: 1, ease: 'power1.out'}, '<=0')
            .to('.nav', {'--col-2': '0vh', duration: 1 - .1, ease: 'power1.out'}, `<=${.1}`)
            .to('.nav', {'--col-3': '0vh', duration: 1 - .1 * 2, ease: 'power1.out'}, `<=${.1}`)
            .to('.nav', {'--col-4': '0vh', duration: 1 - .1 * 3, ease: 'power1.out'}, `<=${.1}`)
            
            // .to('.header-inner-txt.txt-close', {y: 0, duration: .6, ease: 'power2.out'}, 0)
            // .to('.header-inner-txt.txt-open', {yPercent: -100, duration: .6, ease: 'power2.out'}, 0)
        }
        updateNavActive(data) {
            $('[data-nav]').removeClass('active')
            let namespace = data.next.namespace;
            if (namespace == 'career-detail') {
                namespace = 'careers'
            }
            this.currIdx = $(`[data-nav="${namespace}"]`).closest('.nav-menu-link-wrap').index()
            this.targetPath(1, true)
        }
        init(data) {
            if (this.isInit) {
                return;
            } else {
                this.setup()
            }
        }
    }
    let nav = new Nav();

    $('[data-nav="toggle"]').on('click', function(e) {
        e.preventDefault();
        if ($('.nav').hasClass('active')) {
            nav.close()
        } else {
            nav.open()
        }
    })
    // End-Header

    // Page transition
    function updateBeforeTrans(data) {
        // lenis.stop()
        if (data.current.container) {
            $(data.current.container).css('z-index', 2)
        }
    }
    function updateAfterTrans(data) {
        // lenis.start()
        if ($('.nav').hasClass('active')) {
            nav.close()
        }
        if ($('.apply-wrap').hasClass('active')) {
            applyForm.close()
        }
        cursor.reset()
        window.scrollTo(0, 0);
        if (data.current.container) {
            data.current.container.remove()
        }
        resetScroll()
        updateJobCount()
        removeAllScrollTrigger()
        reinitializeWebflow()
        updateOnscroll()
        if (!nav.isInit) {
            nav.setup(data)
        }
        nav.updateNavActive(data)
    }
    class PageTransition {
        constructor() {
            this.tlLeave;
            this.tlEnter;
            this.allItems;
        }
        setup() {
            let itemTemp = $('.trans-item').clone()
            if (viewport.w > 991) {
                for (let i = 0; i < (11 * 10) - 1; i++) {
                    $('.trans-inner').append(itemTemp.clone())
                }
            } else if (viewport.w > 767) {
                for (let i = 0; i < (5 * 8) - 1; i++) {
                    $('.trans-inner').append(itemTemp.clone())
                }
            } else {
                for (let i = 0; i < (4 * 7) - 1; i++) {
                    $('.trans-inner').append(itemTemp.clone())
                }
            }
            this.allItems = $('.trans-item')
        }
        leaveAnim(data) {
            this.tlLeave = gsap.timeline({
                onStart: () => {
                    $('.trans-wrap').addClass('active')
                    updateBeforeTrans(data)
                },
                onComplete: () => {
                    updateAfterTrans(data)
                    setTimeout(() => {
                        updateOnscroll()
                    }, 300);
                },
            })
            
            this.tlLeave
            .set(this.allItems, {scaleY: 0, transformOrigin: 'bottom'})
            .to(this.allItems, {scaleY: 1, duration: 1, ease: 'expo.in', stagger: {
                amount: .4,
                from: 'random'
            }})
            .fromTo('.trans-logo-img-wrap', {autoAlpha: 0}, {autoAlpha: 1, duration: .6, ease: 'expo.in'}, '.4')
            return this.tlLeave
        }
        enterAnim(data) {
            this.tlEnter = gsap.timeline({
                onStart: () => {
                },
                onComplete: () => {
                    $('.trans-wrap').removeClass('active')
                },
            })
            
            this.tlEnter
            .set(this.allItems, {scaleY: 1, transformOrigin: 'top'})
            .to(this.allItems, {delay: 1, scaleY: 0, duration: 1, ease: 'expo.out', stagger: {
                amount: .4,
                from: 'random'
            }})
            .fromTo('.trans-logo-img-wrap', {autoAlpha: 1}, {autoAlpha: 0, duration: .8, ease: 'expo.out'}, .4)
            .to('.main-wrap', {onStart: () => {
                load.initHeroAnim()
            }}, '>=-.2')
            return this.tlEnter
        }
    }
    let pageTrans = new PageTransition();
    // End Page transition
    // Apply Popup
    class ApplyForm {
        constructor() {
            this.form;
        }
        init() {
            this.updateContent()
            this.initEvents()
        }
        updateContent() {
            let allJobSrc = $('[data-job-src]');
            allJobSrc.each((idx, el) => {
                let type = $(el).attr('data-job-src');
                let text = $(el).text();

                $(`[data-job="${type}"]`).each((idx, el) => {
                    $(el).text(text)
                })
                $(`[data-job-input="${type}"]`).each((idx, el) => {
                    $(el).val(text)
                })
            })
        }
        initEvents() {
            $('[data-apply="open"]').on('click', (e) => {
                e.preventDefault();
                this.open()
            })
            $('[data-apply="close"]').on('click', (e) => {
                e.preventDefault();
                this.close()
            })
            $('.apply-main input.txt-input, .apply-main input.txt-area').on('focus', function(e) {
                $(this).closest('.input-wrap').addClass('active')
                $(this).closest('.input-wrap').find('.txt-input-label').addClass('active')
            })
            $('.apply-main input.txt-input, .apply-main textarea.txt-area').on('blur', function(e) {
                if (!$(this).val()) {
                    $(this).closest('.input-wrap').find('.txt-input-label').removeClass('filled')
                } else {
                    $(this).closest('.input-wrap').find('.txt-input-label').addClass('filled')
                }
                $(this).closest('.input-wrap').removeClass('active')
                $(this).closest('.input-wrap').find('.txt-input-label').removeClass('active')
            })
        }
        open() {
            $('.apply-wrap').addClass('active')
            $('.apply-mid').attr('data-lenis-prevent','true')
            lenis.stop()
        }
        close() {
            $('.apply-wrap').removeClass('active')
            $('.apply-mid').removeAttr('data-lenis-prevent')
            lenis.start()
        }
    }
    let applyForm = new ApplyForm();
    // End-Apply Popup
    
    // Animation
    // // Home 
    class HomeHeroAnimate {
        constructor() {
            this.tlTitle;
            this.tlOverlap;

            this.allCols;
            this.activeIndex;
            this.basHeight;
            this.maxHeight;
            this.coreVal;
        }
        setup() {
            console.log('HomeHero setup')
            const sub = new SplitType('.home-hero-label', {types: 'lines, words', lineClass: 'bp-line'})
            const titleTop = new SplitType('.home-hero-title .home-hero-title-top', { types: 'lines, words', lineClass: 'bp-line' });
            // $('.home-hero-title .home-hero-title-bot').css('animation', 'none')
            // $('.home-hero-title .home-hero-title-bot-blur').css('animation', 'none')
            const titleBot = new SplitType('.home-hero-title .home-hero-title-bot', { types: 'lines, words', lineClass: 'bp-line' });
            let titleBlur;
            if (!isSafariDesktop()) {
                titleBlur = new SplitType('.home-hero-title .home-hero-title-bot-blur', { types: 'lines, words', lineClass: 'bp-line' });
            } else {
                $('.home-hero-title .home-hero-title-bot-blur').remove()
            }
            
            const btn = new SplitType('.home-hero .btn .txt-btn', {types: 'lines, words', lineClass: 'bp-line'})
            // let lineWidth = $('.home-hero-title .home-hero-title-bot').width()
            // titleBot.words.concat(titleBlur.words).forEach((word, idx) => {
            //     let offsetLeft = $(word).offset().left - $(word).parent().offset().left;
            //     $(word).css({
            //         'animation': 'none',
            //         'background-size': `${lineWidth * 2}px 100%`,
            //         'background-position-x': `calc(0px - ${offsetLeft}px)`
            //     })
            //     $(word).addClass('txt-grad-anim txt-grad-white')
            // })
            this.tlTitle = gsap.timeline({
                paused: true,
                onStart: () => {
                    this.mouseInteraction();
                    this.lightFall();
                    this.overlap();
                },
                onComplete: () => {
                    // SplitType.revert('.home-hero-label .word, .home-hero-title .home-hero-title-top .word, .home-hero-title .home-hero-title-bot .word,.home-hero-title .home-hero-title-bot-blur .word, .home-hero .btn .txt-btn .word')
                    if (window.w > 991) {
                        titleTop.revert()
                        titleBot.revert()
                        titleBlur.revert()
                    }
                    $('.home-hero-title .home-hero-title-bot, .home-hero-title .home-hero-title-bot-blur').attr('style','')
                }
            })
            this.tlTitle.from(sub.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
            .from(titleTop.words, {autoAlpha: 0, yPercent: 80, duration: .8, stagger: .05}, '<=.1')
            .from(titleBot.words, {autoAlpha: 0, yPercent: 80, duration: .8, stagger: .05}, '<=.1')
            if (!isSafariDesktop()) {
                this.tlTitle
                .from(titleBlur.words, {autoAlpha: 0, yPercent: 80, duration: .8, stagger: .05}, '<=0')
            }
            this.tlTitle
            .from(btn.words, {autoAlpha: 0, yPercent: 100, duration: .4, stagger: .06}, '<=.2')
            .from('.home-hero .btn-bg', {autoAlpha: 0, duration: .4, width: '80%', height: '80%', ease: 'power2.out', clearProps: 'all'}, '<=.1')
        }
        lightFall() {
            if (!isSafariDesktop()) {
                const items = $('.home-hero .home-hero-col-line-inner');
                const tlDur = 4;
                gsap.to(items, {
                    stagger: {amount: 4 * 8, from: 'random'},
                    repeat: -1,
                    ease: Power1.easeIn,
                    keyframes: [
                        {y: viewport.h * 0, autoAlpha: 0, duration: 0},
                        {y: viewport.h *.15, autoAlpha: 1, duration: tlDur *.15},
                        {y: viewport.h *.7, autoAlpha: 1, duration: tlDur *.55},
                        {y: viewport.h * .85, autoAlpha: 1, duration: tlDur *.15},
                        {y: viewport.h * 1, autoAlpha: 0, duration: tlDur * .15}
                    ]
                })
            } else {
                $('.home-hero .home-hero-col-line-inner').remove()
            }
        }
        overlap() {
            if (viewport.w < 991) {
                $('.home-hero-wrap').css({
                    'z-index': 2,
                    'height': '100vh'
                })
                $('.home-hero-mask').remove()
                $('.home-abt-wrap').css('margin-top', '0')
            } else {
                gsap.set('.home-hero', {'--col-1': '100vh', '--col-2': '100vh', '--col-3': '100vh', '--col-4': '100vh'})
                this.tlOverlap = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.home-hero-wrap',
                        start: `top+=${viewport.h * .1} top`,
                        end: 'bottom bottom',
                    
                        scrub: .2,
                        snap: {
                            snapTo: [0, 1],
                            duration: {min: 0.4, max: .8}
                        },
                    }
                })
                this.tlOverlap
                .to('.home-hero .home-hero-content', {yPercent: 8, scale: .8, autoAlpha: .6, duration: 1.1, ease: 'none'}, 0)
                .to('.home-hero .home-hero-pod', {yPercent: 12, duration: 1.1, ease: 'none'}, 0)
                .to('.home-hero', {'--col-4': '0vh', duration: 1, ease: 'none'}, .1)
                .to('.home-hero', {'--col-3': '0vh', duration: .8, ease: 'none'},.3)
                .to('.home-hero', {'--col-2': '0vh', duration: .6, ease: 'none'}, .5)
                .to('.home-hero', {'--col-1': '0vh', duration: .4, ease: 'none'}, .7)    
            }
        }
        mouseInteraction() {
            if (isSafariDesktop()) {
                $('.home-hero-pod-col-head-gra-blur').remove()
            }
            let limit;
            if (viewport.w < 991){
                if (viewport.w >= 767) {
                    limit = 10;
                } else {
                    limit = 7;
                }
                while($('.home-hero .home-hero-pod-col').length > limit) {
                    $('.home-hero .home-hero-pod-col').eq(0).remove();
                    $('.home-hero-bg-col').eq(0).remove();
                }
            }
            this.allCols = $('.home-hero .home-hero-pod-col');
    
            this.activeIndex = Math.floor(pointer.x / (viewport.w / this.allCols.length))
            this.basHeight = .052 * viewport.h;
            this.maxHeight = .325 * viewport.h;
            
            $(window).on('resize', function(e) {
                this.basHeight = .052 * viewport.h;
                this.maxHeight = .325 * viewport.h;
            })
            this.coreVal = 0;
            if (!isTouchDevice()) {
                requestAnimationFrame(this.mouseUpdate.bind(this))
            } else {
                this.clickUpdate()
            }
        }
        active(index) {
            this.allCols.removeClass('active')
            if (load.isDoneLoading()) {
                this.allCols.eq(index).addClass('active')
            }
            this.allCols.each((idx, el) => {
                let height = gsap.getProperty(el, 'height')
                let strength = (1 - Math.abs((idx - index) / 5)) * this.coreVal;
                strength = Math.max(strength, 0);
                gsap.quickSetter(el, 'height', `px`)(lerp(height, (this.basHeight + (this.maxHeight - this.basHeight) * strength), 0.1))
            })
        }
        activeClick(index) {
            this.allCols.removeClass('active')
            if (load.isDoneLoading()) {
                this.allCols.eq(index).addClass('active')
            }
            this.allCols.each((idx, el) => {
                let strength = (1 - Math.abs((idx - index) / 5)) * 1;
                strength = Math.max(strength, 0);
                gsap.to(el, {height: this.basHeight + (this.maxHeight - this.basHeight) * strength, duration: .8, ease: 'power2.inOut'})
            })
        }
        mouseUpdate() {
            if (load.isDoneLoading()) {
                if (this.coreVal <= 1) {
                    this.coreVal = lerp(this.coreVal, 1, 0.04);
                }
                if ($('.home-hero-stage').length) {
                    if (isInViewport('.home-hero-stage')) {
                        this.activeIndex = Math.floor(pointer.x / ($(window).width() / this.allCols.length))
                        this.active(this.activeIndex)
                    } else {
                        this.active(0)
                    }
                }
            }
            if ($('.home-hero-stage').length) {
                requestAnimationFrame(this.mouseUpdate.bind(this))
            } else {
                cancelAnimationFrame(this.mouseUpdate.bind(this))
            }
        }
        clickUpdate() {
            this.activeClick(3)
            $('.home-hero').on('click', (e) => {
                if (isInViewport('.home-hero-stage')) {
                    this.activeIndex = Math.floor(pointer.x / ($(window).width() / this.allCols.length))
                    this.activeClick(this.activeIndex)
                } else {
                    this.activeClick(0)
                }
            })
        }
        play() {
            console.log('HomeHero play')
            this.tlTitle.play()
        }
    }
    let homeHeroAnim = new HomeHeroAnimate();
    class HomeAboutAnimate {
        constructor() {
            this.tlTrigger;
            this.tlTitle;
            this.tlSub;
            this.tlLink;
            this.tlStat;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-abt',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.setup()
                    }
                }
            })
        }
        setup() {
            if ($(window).width() < 768) {
                $(".home-do-content-cms").addClass("swiper");
                $(".home-do-content-list").addClass("swiper-wrapper");
                $(".home-do-content-item").addClass("swiper-slide");
                let swiper = new Swiper(".home-do-content-cms", {
                    slidesPerView: 'auto',
                    spaceBetween: parseRem(24),
                  });
            }
            console.log('HomeAbout setup')
            let titleTop = new SplitType('.home-abt-title .home-abt-title-top', {types: 'lines, words', lineClass: 'bp-line'})
            let titleBot = new SplitType('.home-abt-title .home-abt-title-bot .home-abt-title-line', {types: 'lines, words', lineClass: 'bp-line'})
            let titleWords = [...titleTop.words, $('.home-abt-title-bot-unline-item').eq(0).get(0),...titleBot.words];
            $('.home-abt-title .home-abt-title-bot-unline').addClass('bp-line')
            this.tlTitle = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-abt-title',
                    start: 'top top+=65%',
                    once: true,
                },
                onComplete() {
                    titleTop.revert()
                    titleBot.revert()
                    clearProps('.home-abt-title-bot-unline-item')
                    $('.home-abt-title .home-abt-title-bot-unline').removeClass('bp-line')
                }
            })
            this.tlTitle
            .from(titleWords, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
            .from('.home-abt-title .line-grad', {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, '>=-.3')

            requestAnimationFrame(() => {
                $('.home-abt-sub-wrap .txt').each((idx, el) => {
                    el.innerHTML = el.innerHTML.replace(/\-/g, "<span>-</span>");
                })
                let subText = new SplitType('.home-abt-sub-wrap .txt', {types: 'lines, words', lineClass: 'bp-line'})
                this.tlSub = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.home-abt-sub-wrap',
                        start: 'top top+=70%',
                        once: true,
                    },
                    onComplete() {
                        subText.revert()
                    }
                })
                .from(subText.words, {autoAlpha: 0, yPercent: 80, duration: .4, stagger: .016})

                requestAnimationFrame(() => {
                    this.tlLink = gsap.timeline({
                        scrollTrigger: {
                            trigger: '.home-abt-act-wrap',
                            start: 'top top+=85%',
                        },
                        onComplete() {
                            SplitType.revert('.home-abt-act-wrap .txt')
                            clearProps('.home-abt-act-wrap .ic-embed');
                        }
                    })
                    this.tlLink
                    setupLinkReveal(this.tlLink, '.home-abt-act-wrap .txt', '.home-abt-act-wrap .ic-embed', '.home-abt-act-wrap .txt-link-line')
                    setupAngGrad(this.tlLink, '.home-abt-act-wrap .ang-grad-item.left', '.home-abt-act-wrap .ang-grad-item.right', '<=.3')
                })
            })
            
            let statLabel = new SplitType('.home-abt-stat .home-abt-stat-label', {types: 'lines, words', lineClass: 'bp-line'})
            let allStatItems = $('.home-abt-stat .home-abt-stat-item')
            this.tlStat = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-abt-stat',
                    start: 'top top+=85%',
                    once: true,
                },
                onComplete() {
                    // statLabel.revert()
                    SplitType.revert('.home-abt-stat-item-label, .home-abt-stat-item-val')
                }
            })
            this.tlStat
            .from(statLabel.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
            allStatItems.each((idx, el) => {
                let label = new SplitType($(el).find('.home-abt-stat-item-label').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                let val = new SplitType($(el).find('.home-abt-stat-item-val').get(0), {types: 'lines, words, chars', lineClass: 'bp-line'})
                this.tlStat
                .from($(el).find('.home-abt-stat-item-line'), {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, `${ .2 + idx * .2}`)
                .from(label.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.1')
                .from(val.chars, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.1')
            })
            
            setupImgReveal('.home-abt-img-wrap', '.home-abt-img-inner')
        }
    }
    let homeAboutAnim = new HomeAboutAnimate();
    class HomeDoAnimate {
        constructor() {
            this.tlTrigger;
            this.tlTitle;
            this.tlAngGrad;
            this.tlListTitle;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-do',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        if(viewport.w>767){
                            this.interaction()  
                        }
                        this.setup()
                    }
                }
            })
        }
        setup() {
            console.log('HomeDo setup')
            let titleLabel = new SplitType('.home-do-label', {types: 'lines, words', lineClass: 'bp-line'})
            let titleTop = new SplitType('.home-do-title .home-do-title-top', {types: 'lines, words', lineClass: 'bp-line heading-line'})
            let titleWords = [...titleTop.words, $('.home-do-title .home-do-title-bot-unline-item').eq(0).get(0)];
            $('.home-do-title-bot-unline-item').addClass('bp-line')
            let subTxt = new SplitType('.txt-link-outer.home-do-txt-link.hidden-dk  .txt-link-comp', {types: 'lines, words', lineClass: 'bp-line'})
            let sub = [...subTxt.words, $('.car-faq-sub-wrap .txt-link-comp').get(0)];
            gsap.set(subTxt.lines, {overflow: 'hidden'})
            this.tlTitle = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-do-title-wrap',
                    start: 'top top+=65%',
                    once: true,
                },
                onComplete() {
                    SplitType.revert('.txt-link-outer.home-do-txt-link.hidden-dk  .txt-link-comp,.home-do-label')
                    clearProps('.home-do-title-bot-unline-item')
                    $('.home-do-title-bot-unline-item').removeClass('bp-line')
                }
            })
            .from(titleLabel.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
            .from(titleWords, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')
            .from('.home-do-title .line-grad', {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, '>=-.3')
            if(viewport.w<767){
            this.tlTitle
            .from(sub, {autoAlpha: 0, yPercent: 80, duration: .4, stagger: .016}, '<=.2')
            .from('.txt-link-outer.home-do-txt-link.hidden-dk  .txt-link-line', {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, '>=-.3')
            .from('.txt-link-outer.home-do-txt-link.hidden-dk  .txt-link-ic', { yPercent: 80,autoAlpha:0, duration: .8, clearProps: 'all'}, '<=-.1')
            }
            this.tlAngGrad = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-do-title-grad',
                    start: 'top top+=65%',
                    once: true,
                }
            })
            setupAngGrad(this.tlAngGrad, '.home-do-title-grad .ang-grad-item.left', '.home-do-title-grad .ang-grad-item.right')
            if(viewport.w>767){
                setupImgReveal('.home-do-img-cms', '.home-do-img-list')
            }
            else{
                $('.home-do-img-item-img').each((idx,item)=>{
                    setupImgReveal('.home-do-img-item-img-wrap-mb',item)
                })
            }
            this.tlListTitle = gsap.timeline({
                scrollTrigger: {
                    trigger: viewport.w > 767 ? '.home-do-tab-cms':'.home-do-content-item-title.hidden-dk',
                    start: viewport.w > 767 ?'top top+=65%':'top bottom-=20%',
                    once: true,
                },
                onComplete() {
                    clearProps('.home-do-txt-link .ic-embed')
                }
            })
            
          if(viewport.w>767){
            let allItemsTitle = $('.home-do-tab-item-inner')
            allItemsTitle.each((idx, el) => {
                let title = new SplitType($(el).find('.txt').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                this.tlListTitle
                .from(title.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, idx * .2)
                .from($(el).find('.home-do-tab-item-line'), {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, '<=.1')
            })
            this.tlListTitle
            .from('.home-do-content-item.active .home-do-content-item-txt .word', {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .02, ease: 'power1.inOut'}, .2)
          }
          else{
            let allItemsContent = $('.home-do-content-item')
            allItemsContent.each((idx,item)=>{
                let tabTitle = new SplitType($(item).find('.home-do-content-item-title.hidden-dk').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                let tabSub = new SplitType($(item).find('.home-do-content-item-txt').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                this.tlListTitle
                .from(tabTitle.words, {autoAlpha: 0, yPercent: 80, duration: .4, stagger: .03},`<=${idx == 0 ? 0 : idx * -.1}`)
                .from(tabSub.words, {autoAlpha: 0, yPercent: 80, duration: .2, stagger: .02},'<=.2')
            })
            
          }
            setupLinkReveal(this.tlListTitle, '.home-do-txt-link.hidden-mb .txt', '.home-do-txt-link.hidden-mb .ic-embed', '.home-do-txt-link.hidden-mb .txt-link-line', '<=.2')
        }
        interaction() {
            let elArr = ['.home-do-tab-item-inner', '.home-do-content-item', '.home-do-img-item'];
            let allBodyItems = $('.home-do-content-item-txt');
            let allSplitBodyItem = []
            allBodyItems.each((idx, el) => {
                let body = new SplitType(el, {types: 'lines, words', lineClass: 'bp-line heading-line'})
                allSplitBodyItem.push(body)
            })
            let allCovers = $('.home-do .slider-img-cover-item');
            let allItems = $('.home-do .home-do-img-item')
            let lastIndex;

            $('.home-do-tab-item-inner').on('click', function(e) {
                e.preventDefault();
                if ($(this).hasClass('active') || $('.home-do-tab-list').hasClass('animating')) {return;}
                let index = $(this).closest('.home-do-tab-item').index();
                activeDoItem({index: index, lastIndex: lastIndex})
                lastIndex = index;
            })

            function activeDoItem({index, lastIndex, isInit = false}) {
                if (isInit) {
                    gsap.set('.home-do-img-item:not(.active) .home-do-img-item-img', {autoAlpha: 0, overwrite: true})
                    gsap.set('.home-do-content-item:not(.active) .home-do-content-item-txt .word', {autoAlpha: 0, overwrite: true})
                }
                $('.home-do-tab-list').addClass('animating')
                activeItem(elArr, index)
                let tlCover = gsap.timeline({})
                tlCover
                .to(allCovers, {transformOrigin: '0% 100%', scaleY: 0, duration: 0, overwrite: true, onComplete: () => {
                    if (lastIndex !== undefined) {
                        gsap.fromTo(allItems.eq(lastIndex).find('.home-do-img-item-img').get(0), {scale: 1, autoAlpha: 1}, {scale: 1.2, autoAlpha: 0, duration: isInit ? 0 : .8, ease: 'power1.inOut', overwrite: true})
                        gsap.fromTo($(allSplitBodyItem[lastIndex])[0].words, {autoAlpha: 1, yPercent: 0}, {autoAlpha: 0, yPercent: -100, duration: isInit ? 0 : .4, stagger: isInit ? 0 : .02, ease: 'power1.inOut', overwrite: true})
                    }
                    gsap.fromTo($(allSplitBodyItem[index])[0].words, {autoAlpha: 0, yPercent: 100}, {autoAlpha: 1, yPercent: 0, duration: isInit ? 0 : .4, stagger: isInit ? 0 : .02, ease: 'power1.inOut', overwrite: true, delay: .3})
                }})
                .to(allCovers, {scaleY: 1, duration: isInit ? 0 : .5, stagger: isInit ? 0 : .1, ease: 'power1.inOut', onComplete: () => {
                    gsap.fromTo(allItems.eq(index).find('.home-do-img-item-img').get(0), {scale: 1.2, autoAlpha: 0}, {scale: 1, autoAlpha: 1, duration: isInit ? 0 : .6, ease: 'power1.inOut', overwrite: true})
                }})
                .to(allCovers, {scaleY: 0, transformOrigin: '0% 0%', stagger: isInit ? 0 : .1, duration: .5, ease: 'power1.inOut', onComplete: () => {
                    $('.home-do-tab-list').removeClass('animating')
                }})
            }

            if($(window).width()>767){
            activeItem(elArr, 0)
            activeDoItem({index: 0, isInit: true})
            }
            lastIndex = 0;
        }
    }
    let homeDoAnim = new HomeDoAnimate();

    class HomeValAnimate {
        constructor() {
            this.tlTrigger;
            this.tlTitle;
            this.tlCircle;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-val',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        if (viewport.w < 768) {
                            this.setupMob()
                        } else {
                            this.interaction()
                        }
                        this.setup()
                    }
                }
            })
        } 
        setupMob(){
            // $(".home-val-main-cms").addClass("swiper");
            // $(".home-val-main-list").addClass("swiper-wrapper");
            // $(".home-val-main-item").addClass("swiper-slide");
            // let elArr = ['.home-val-main-item-body', '.home-val-main-cir-dot']
            // activeItem(elArr, 0);
            // let swiperVal = new Swiper(".home-val-main-cms", {
            //     slidesPerView: 1,
            //     spaceBetween: parseRem(24),
            //     on: {
            //         slideChange: function (swiper) {
            //             let currIndex=swiper.realIndex;
            //             gsap.to('.home-val-main-cir-mid-wrap',{
            //                 rotate: currIndex * 25*3.6,
            //                 duration: .6,
            //                 ease: 'power1.inOut'
            //             })
            //             activeItem(elArr, currIndex);
            //         },
            //     },
            //     // pagination: {
            //     //   el: ".home-testi-slider-pagination",
            //     //   clickable: true,
            //     // },
            // });
            // $('.home-val-main-cir-dot-link').on('click', function(e) {
            //     e.preventDefault();
            //     let currIndex = $(this).index();
            //     swiperVal.slideTo(currIndex);
            // })
            let dis = $('.home-val-main-item').outerWidth(true) * $('.home-val-main-item').length - $('.home-val-main-cms').width();
            let offsetTop = (viewport.h - $('.home-val-main').height()) / 2;
            $('.home-val-main').css('top', offsetTop)
            let elArr = ['.home-val-main-item', '.home-val-main-cir-dot']
            activeItem(elArr, 0);
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-val-main-wrap',
                    start: `top-=${offsetTop} top`,
                    end: `bottom+=${offsetTop} bottom`,
                    scrub: true,
                    snap: [0, 1/3, 2/3, 1],
                    onUpdate(self) {
                        let currIndex;
                        if (self.progress >= 0 && self.progress <= 1/6 * 1) {
                            currIndex = 0;
                        } else if (self.progress >= 1/6 * 1 && self.progress <= 1/6 * 3) {
                            currIndex = 1;
                        } else if (self.progress >= 1/6 * 3 && self.progress <= 1/6 * 5){
                            currIndex = 2;
                        } else if (self.progress >= 1/6 * 5) {
                            currIndex = 3;
                        }                        
                        activeItem(elArr, currIndex);
                    }
                }
            })
            tl
            .to('.home-val-main-cms', {x: -dis, duration: 1, ease: 'none'}) 
            .fromTo('.home-val-main-cir-inner', {rotation: 0}, {rotation: 270, duration: 1, ease: 'linear'}, 0)
        }
        setup() {
            console.log('HomeVal setup')
            $('.home-val-title .home-val-title-top, .home-val-title .home-val-title-bot').removeClass('heading-line')

            let titleTop = new SplitType('.home-val-title .home-val-title-top', {types: 'lines, words', lineClass: 'bp-line heading-line'})
            let titleBot = new SplitType('.home-val-title .home-val-title-bot', {types: 'lines, words', lineClass: 'bp-line heading-line'})
            
            let lineWidth = $('.home-val-title .home-val-title-bot').width()
            titleBot.words.forEach((word, idx) => {
                let offsetLeft = $(word).offset().left - $(word).parent().offset().left;
                $(word).css({
                    'animation': 'none',
                    'background-size': `${lineWidth}px 100%`, // was lineWidth * 2, adjust when add gradient animation
                    'background-position-x': `calc(0px - ${offsetLeft}px)`
                })
                $(word).addClass('txt-grad-anim-2')
            })
            this.tlTitle = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-val-title',
                    start: 'top top+=65%',
                    once: true,
                },
                onComplete() {
                    SplitType.revert('.home-val-title .home-val-title-top, .home-val-title .home-val-title-bot')
                    SplitType.create('.home-val-title .home-val-title-top, .home-val-title .home-val-title-bot', {types: 'lines', lineClass: 'bp-line heading-line'})
                }
            })
            this.tlTitle
            .from([...titleTop.words, ...titleBot.words], {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})

            let activeItemTitle = new SplitType('.home-val-main-item-title:not(.hidden-dk):nth-child(1)', {types: 'lines, words', lineClass: 'bp-line'})
            this.tlCircle = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-val-main-cir',
                    start: 'top top+=65%',
                    once: true,
                },
                onComplete() {
                    activeItemTitle.revert()
                }
            })
            this.tlCircle
            .from(activeItemTitle.words, {autoAlpha: 0, yPercent: 80, duration: 1, stagger: .1})
            if (viewport.w > 767) {
                this.tlCircle
                .from('.home-val-main-item.active .home-val-main-item-body-txt .word', {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .02, ease: 'power1.out'}, 0)
            } else {
                this.tlCircle
                .from('.home-val-main-item:nth-child(1) .home-val-main-item-body-txt', {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .02, ease: 'power1.out'}, 0)
            }
            this.tlCircle
            .from('.home-val-main-cir-mid-wrap', {scale: .8, autoAlpha: 0, duration: 1, ease: 'power1.out', clearProps: 'all'}, 0)
            .from('.home-val-main-cir-dot-link.cir-dot-1', {yPercent: -50, autoAlpha: 0, scale: 0, duration: .6, ease: 'power1.out', clearProps: 'all'}, '<=.2')
            .from('.home-val-main-cir-dot-link.cir-dot-2', {xPercent: 50, autoAlpha: 0, scale: 0, duration: .6, ease: 'power1.out', clearProps: 'all'}, '<=.1')
            .from('.home-val-main-cir-dot-link.cir-dot-3', {yPercent: 50, autoAlpha: 0, scale: 0, duration: .6, ease: 'power1.out', clearProps: 'all'}, '<=.1')
            .from('.home-val-main-cir-dot-link.cir-dot-4', {xPercent: -50, autoAlpha: 0, scale: 0, duration: .6, ease: 'power1.out', clearProps: 'all'}, '<=.1')
        }
        interaction() {
            let elArr = ['.home-val-main-item-body', '.home-val-main-cir-dot']
            let currIndex = 0;
            let lastIndex;
            let allSubItems = $('.home-val-main-item-body-txt');
            let allSubSplitItems = [];
            
            allSubItems.each((idx, el) => {
                let sub = new SplitType(el, {types: 'lines, words', lineClass: 'bp-line'})
                allSubSplitItems.push(sub)
            })
            function activeSubItem(lastIndex, index, isInit = false) {
                if  (isInit) {
                    gsap.set('.home-val-main-item-body-txt .word', {autoAlpha: 0, yPercent: 0})
                }
                if (lastIndex !== undefined) {
                    gsap.set(allSubSplitItems[lastIndex].words, {autoAlpha: 1, yPercent: 0})
                    gsap.to(allSubSplitItems[lastIndex].words, {autoAlpha: 0, yPercent: -80, duration: isInit ? 0 : .6, stagger: isInit ? 0 : .02, ease: 'power1.inOut'})
                }
                gsap.set(allSubSplitItems[index].words, {autoAlpha: 0, yPercent: 80})
                gsap.to(allSubSplitItems[index].words, {autoAlpha: 1, yPercent: 0, duration: isInit ? 0 : .6, stagger: isInit ? 0 : .02, ease: 'power1.inOut'})
            }
            activeItem(elArr, currIndex)
            activeSubItem(undefined, currIndex, true);
            lastIndex = 0;

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-val-main-wrap',
                    start: `top top`,
                    end: `bottom-=${viewport.h * .25} bottom`,
                    scrub: .1,
                    snap: {
                        snapTo: (progress) => {
                            if (progress >= 0 && progress <= 1/8 * 1) {
                                return 0;
                            } else if (progress >= 1/8 * 1 && progress <= 1/8 * 3) {
                                return .25;
                            } else if (progress >= 1/8 * 3 && progress <= 1/8 * 5){
                                return .5;
                            } else if (progress >= 1/8 * 5 && progress <= 1/8 * 6) {
                                return .75;
                            } else if (progress >= 1/8 * 6) {
                                return 1;
                            }
                            return null;
                        },
                        directional: true,
                        delay: 0.1,
                        duration: {min: .4, max: .8}
                    },
                    onUpdate(self) {
                        if (self.progress >= 0 && self.progress <= 1/16 * 1) {
                            currIndex = 0;
                        } else if (self.progress >= 1/16 * 3 && self.progress <= 1/16 * 5) {
                            currIndex = 1;
                        } else if (self.progress >= 1/16 * 7 && self.progress <= 1/16 * 9){
                            currIndex = 2;
                        } else if (self.progress >= 1/16 * 11) {
                            currIndex = 3;
                        }
                        if (currIndex !== undefined) {
                            if (lastIndex !== currIndex) {
                                if (!$('.home-val-main-cir-dot-link').hasClass('animating')) {
                                    activeItem(elArr, currIndex);
                                    activeSubItem(lastIndex, currIndex);
                                    lastIndex = currIndex;
                                }
                            }
                        }
                    }
                }
            })
            tl
            .fromTo('.home-val-main-cir-inner', {rotation: 0}, {rotation: 360, duration: 1 * 4/3, ease: 'linear'}, 0)
            .to('.home-val-title-list', {y: -3 * viewport.h, duration: 1, ease: 'linear'}, 0)

            $('.home-val-main-cir-dot-link').on('click', function(e) {
                if ($(this).find('.home-val-main-cir-dot').hasClass('active') || $('.home-do-tab-list').hasClass('animating')) {return;}
                e.preventDefault();
                currIndex = $(this).index();
                $('.home-val-main-cir-dot-link').addClass('animating')
                lastIndex = $('.home-val-main-cir-dot.active').closest('.home-val-main-cir-dot-link').index();
                activeItem(elArr, currIndex);
                activeSubItem(lastIndex, currIndex);
                lastIndex = currIndex;
                tl.paused(true)
                lenis.scrollTo($('.home-val-main-wrap').offset().top + $('.home-val-main').height() * (currIndex * 3/4), {duration: 1.2, onComplete() {
                    $('.home-val-main-cir-dot-link').removeClass('animating')
                }})
            })
            if (viewport.w > 991) {
                let tlEnd = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.home-val-main-wrap',
                        start: `bottom-=${viewport.h * 1.1} bottom`,
                        end: `bottom bottom`,
                        scrub: true,
                    }
                })
                tlEnd.to('.home-val .home-val-main', {yPercent: 0, scale: .8, autoAlpha: .6, duration: 1.1, ease: 'none'}, 0)
            }
        }
    }
    let homeValAnim = new HomeValAnimate();

    class HomeJobAnimate {
        constructor() {
            this.tlTrigger;
            this.tlTitle;
            this.tlSub;
            this.tlList;
            this.tlLink;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-job',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.interaction()
                        this.setup()
                    }
                }
            })
        }
        setup() {
            console.log('HomeJob setup')
            let titleLabel = new SplitType('.home-job-label', {types: 'lines, words', lineClass: 'bp-line'})
            let titleTop = new SplitType('.home-job-title .home-job-title-top', {types: 'lines, words', lineClass: 'bp-line'})
            let titleBot = new SplitType('.home-job-title .home-job-title-bot .home-job-title-line', {types: 'lines, words', lineClass: 'bp-line'})
            let titleWords = [...titleTop.words, $('.home-job-title-bot-unline-item').eq(0).get(0),...titleBot.words];
            $('.home-job-title .home-job-title-bot-unline').addClass('bp-line')
            this.tlTitle = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-job-title-wrap',
                    start: 'top top+=65%',
                    once: true,
                },
                onComplete() {
                    titleTop.revert()
                    titleBot.revert()
                    clearProps('.home-job-title-bot-unline-item')
                    $('.home-job-title .home-job-title-bot-unline').removeClass('bp-line')
                }
            })
            this.tlTitle
            .from(titleLabel.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
            .from(titleWords, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')
            .from('.home-job-title .line-grad', {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, '>=-.3')

            let subText = new SplitType('.home-job-sub', {types: 'lines, words', lineClass: 'bp-line'})
            this.tlSub = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-job-sub',
                    start: 'top top+=65%',
                    once: true,
                },
                onComplete() {
                    subText.revert()
                }
            })
            this.tlSub
            .from(subText.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})

            this.tlList = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-job-main-wrap',
                    start: 'top top+=65%',
                    once: true,
                },
                onStart: () => {
                    gsap.set('.home-job-main-item', {'pointer-events': 'none'})
                },
            })
            let allItems = $('.home-job-main-item')
            allItems.each((idx, el) => {
                let title = new SplitType($(el).find('.home-job-main-item-title').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                let descRole = new SplitType($(el).find('.home-job-main-item-desc:not(.mod-loc) .home-job-main-item-desc-txt').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                let descLoc = new SplitType($(el).find('.home-job-main-item-desc.mod-loc .home-job-main-item-desc-txt').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                let descRoleArr = [$(el).find('.home-job-main-item-desc:not(.mod-loc) .ic-embed'), ...descRole.words];
                let descLocArr = [$(el).find('.home-job-main-item-desc.mod-loc .ic-embed'), ...descLoc.words];
                this.tlList
                .from($('.home-job-main-bg-inner-item-line-top').eq(idx), {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, `${ .2 + idx * .2}`)
                .from(title.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04, onComplete() {
                    title.revert()
                }}, '<=.1')
                .from(descRoleArr, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.1')
                .from(descLocArr, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04, onComplete() {
                    clearProps('.home-job-main-item')
                    descRole.revert()
                    descLoc.revert()
                }}, '<=.1')
                if (idx == allItems.length - 1) {
                    this.tlList
                    .from($('.home-job-main-bg-inner-item-line-bot').eq(idx), {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, `<=.1`)
                }
            })
            this.tlLink = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-job-txt-link',
                    start: 'top top+=85%',
                },
                onComplete() {
                    SplitType.revert('.home-job-txt-link .txt')
                    clearProps('.home-job-txt-link .ic-embed');
                }
            })
            if(viewport.w > 767){
                setupLinkReveal(this.tlLink, '.home-job-txt-link .txt', '.home-job-txt-link .ic-embed', '.home-job-txt-link .txt-link-line')    
            }
            else{
                setupLinkReveal(this.tlLink, '.home-job-txt-link-mb .txt', '.home-job-txt-link-mb .ic-embed', '.home-job-txt-link-mb .txt-link-line')    
            }

        }
        resize() {
            $('.home-job-main-item').each((idx, el) => {
                let height = $(el).height();
                $('.home-job-main-bg-inner-item').eq(idx).css({
                    'height': height,
                    'flex': 'none'
                })
            })
        }
        interaction() {
            function homeJobActive(index) {
                let posVal;
                let height;
                if (index == -1) {
                    posVal = '-101%';
                    height = $('.home-job-main-item').eq(0).height();
                } else if (index == $('.home-job-main-item:not(.load-hidden):not(.filter-hidden-depart):not(.filter-hidden-loc)').length) {
                    posVal = `${$('.home-job-main-bg-inner-cms').height() + 10}px`;
                    height = $('.home-job-main-item').eq($('.home-job-main-item:not(.load-hidden):not(.filter-hidden-depart):not(.filter-hidden-loc)').length).height();
                } else {
                    posVal = `${$('.home-job-main-item:not(.load-hidden):not(.filter-hidden-depart):not(.filter-hidden-loc)').eq(index).offset().top - $('.home-job-main-bg-inner-cms').offset().top}px`;
                    height = $('.home-job-main-item').eq(index).height();
                }
                $('.home-job-main-bg-el').css({
                    'height': height,
                    'transform': `translateY(${posVal})`
                })
            }
            this.resize()
            $(window).on('resize', this.resize)
            let lastActive = 0
            $('.home-job-main-item-inner').on('pointerenter', function(e) {
                let activeIndex = Array.prototype.indexOf.call($('.home-job-main-item:not(.load-hidden):not(.filter-hidden-depart):not(.filter-hidden-loc)'), $(this).closest('.home-job-main-item').get(0))
               
                let height=$(this).height();
                $('.home-job-main-bg-el.bg-anim-grad').height(height)
                if(viewport.w > 991){
                    $('.home-job-main-item-inner').removeClass('active')
                    $(this).addClass('active')
                    homeJobActive(activeIndex)
                }
                lastActive = activeIndex;
            })
            if(viewport.w > 991){
                $('.home-job-main-list').on('pointerleave', function(e) {
                    $('.home-job-main-item-inner').removeClass('active')
                    if ((pointer.y < this.getBoundingClientRect().height / 2 + this.getBoundingClientRect().top)) {
                        homeJobActive(-1)
                    } else {
                        homeJobActive($('.home-job-main-item:not(.load-hidden):not(.filter-hidden-depart):not(.filter-hidden-loc)').length)
                    }
                })
            }
        }
        destroy() {
            console.log('destroy')
            $(window).off('resize', this.resize)
        }
    }
    let homeJobAnim = new HomeJobAnimate();

    class HomeTestiAnimate {
        constructor() {
            this.tlTrigger;
            this.tlTitle;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-testi',
                    start: viewport.w>767?'top bottom+=50%':'top-=40% bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.interaction()
                        this.setup()
                    }
                }
            })
        }
        setup() {
            console.log('HomeTesti setup')
            setupImgReveal('.home-testi-img-wrap', '.home-testi-img-cms')
            gsap.set('.home-testi-main-ic', {'overflow': 'hidden'})
            this.tlItem = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-testi-main-cms',
                    start: 'top top+=65%',
                    once: true,
                },
                onComplete() {
                    clearProps('.home-testi-main-ic')
                }
            })
            this.tlItem
            .from('.home-testi-main-ic .ic-embed', {yPercent: 80, autoAlpha: 0, duration: .6, ease: 'power1.inOut', clearProps: 'all'})
            .from('.home-testi-main-item:nth-child(1) .word', {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .02, ease: 'power1.inOut'}, '<=.2')
            .from('.home-testi-main-item:nth-child(1) .home-testi-main-item-name .word', {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .02, ease: 'power1.inOut'}, '<=.2')
            .from('.home-testi-main-item:nth-child(1) .home-testi-main-item-job .word', {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .02, ease: 'power1.inOut'}, '<=.2')
            .from('.home-testi-img-prog', {scaleY: 0, duration: .8, transformOrigin: 'top', clearProps: 'all'}, '>=-.3')
            setupCurtain('.sc-cur-home-testi-blog','var(--cl-bg-anim-home)', 'var(--white)')
        }
        interaction() {
            let allImgItems = $('.home-testi-img-item');
            let allMainItems = $('.home-testi-main-item');
            let allSplitRictxt = []
            allMainItems.each((idx, el) => {
                let allP = $(el).find('.home-testi-main-item-rictxt p');
                allP.each((idx, p) => {
                    p.innerHTML = p.innerHTML.replace(/\-/g, "<span>-</span>");
                })
                let rictxt = new SplitType($(el).find('.home-testi-main-item-rictxt p'), {types: 'lines, words', lineClass: 'bp-line'})
                allSplitRictxt.push(rictxt)
            })
            let allName = new SplitType('.home-testi-main-item-name', {types: 'lines, words', lineClass: 'bp-line'})
            let allJob = new SplitType('.home-testi-main-item-job', {types: 'lines, words', lineClass: 'bp-line'})

            let currIndex = 0;
            let lastIndex = 1;

            if(!isTouchDevice()){
                $('.home-testi').on('click', function(e) {
                    if ($(this).hasClass('animating')) {return;}
                    if (pointer.x >= viewport.w / 2) {
                        activeTestiItem(currIndex + 1)
                    } else {
                        activeTestiItem(currIndex - 1)
                    }
                    $(this).addClass('animating')
                })
            }
            else{
                $('.home-testi-control-wrap').show(200);
                $('.home-testi-control-prev').on('click',function(){
                    if ($(this).hasClass('animating')) {return;}
                    activeTestiItem(currIndex - 1);
                })
                $('.home-testi-control-next').on('click',function(){
                    if ($(this).hasClass('animating')) {return;}
                    activeTestiItem(currIndex + 1);
                })
            }
            
            let elArr = ['.home-testi-img-item', '.home-testi-main-item'];
            let allCovers = $('.home-testi .slider-img-cover-item');
            let allItems = $('.home-testi .home-testi-img-item')
            let tlLoop;
            activeTestiItem(currIndex, true)
            function activeTestiItem(index, isInit = false) {
                if (isInit) {
                    gsap.set('.home-testi-img-item:not(.active) .home-testi-img-item-img', {autoAlpha: 0, overwrite: true})
                    gsap.set('.home-testi-main-item:not(.active) .home-testi-main-item-name .word', {autoAlpha: 0, overwrite: true})
                    gsap.set('.home-testi-main-item:not(.active) .home-testi-main-item-job .word', {autoAlpha: 0, overwrite: true})
                    gsap.set('.home-testi-main-item:not(.active) .home-testi-main-item-rictxt .word', {autoAlpha: 0, overwrite: true})
                }
                if (index < 0) {
                    currIndex = allImgItems.length - 1;
                } else if (index > allImgItems.length - 1) {
                    currIndex = 0;
                } else {
                    currIndex = index;
                }
                let tlCover = gsap.timeline({
                    onComplete() {
                        $('.home-testi').removeClass('animating')
                    }
                })
                tlCover
                .to(allCovers, {transformOrigin: '0% 100%', scaleY: 0, duration: 0, overwrite: true, onComplete: () => {
                    gsap.fromTo(allItems.eq(lastIndex).find('.home-testi-img-item-img').get(0), {scale: 1, autoAlpha: 1}, {scale: 1.2, autoAlpha: 0, duration: isInit ? 0 : .8, ease: 'power1.inOut', overwrite: true})
                    gsap.fromTo($(allSplitRictxt[lastIndex])[0].words, {autoAlpha: 1, yPercent: 0}, {autoAlpha: 0, yPercent: -100, duration: isInit ? 0 : .4, stagger: isInit ? 0 : .02, ease: 'power1.inOut', overwrite: true})
                    gsap.fromTo($('.home-testi-main-item-name').eq(lastIndex).find('.word'), {autoAlpha: 1, yPercent: 0}, {autoAlpha: 0, yPercent: -100, duration: isInit ? 0 : .4, stagger: isInit ? 0 : .02, ease: 'power1.inOut', overwrite: true})
                    gsap.fromTo($('.home-testi-main-item-job').eq(lastIndex).find('.word'), {autoAlpha: 1, yPercent: 0}, {autoAlpha: 0, yPercent: -100, duration: isInit ? 0 : .4, stagger: isInit ? 0 : .02, ease: 'power1.inOut', overwrite: true, delay: .1})

                    gsap.fromTo($(allSplitRictxt[currIndex])[0].words, {autoAlpha: 0, yPercent: 100}, {autoAlpha: 1, yPercent: 0, duration: isInit ? 0 : .4, stagger: isInit ? 0 : .02 * $(allSplitRictxt[lastIndex])[0].words.length / $(allSplitRictxt[currIndex])[0].words.length, ease: 'power1.inOut', overwrite: true, delay: .3})
                    gsap.fromTo($('.home-testi-main-item-name').eq(currIndex).find('.word'), {autoAlpha: 0, yPercent: 100}, {autoAlpha: 1, yPercent: 0, duration: isInit ? 0 : .4, stagger: isInit ? 0 : .02, ease: 'power1.inOut', overwrite: true})
                    gsap.fromTo($('.home-testi-main-item-job').eq(currIndex).find('.word'), {autoAlpha: 0, yPercent: 100}, {autoAlpha: 1, yPercent: 0, duration: isInit ? 0 : .4, stagger: isInit ? 0 : .02, ease: 'power1.inOut', overwrite: true, delay: .1})
                }})
                .to(allCovers, {scaleY: 1, duration: isInit ? 0 : .5, stagger: isInit ? 0 : .1, ease: 'power2.inOut', onComplete: () => {
                    gsap.fromTo(allItems.eq(currIndex).find('.home-testi-img-item-img').get(0), {scale: 1.2, autoAlpha: 0}, {scale: 1, autoAlpha: 1, duration: isInit ? 0 : .6, ease: 'power1.inOut', overwrite: true})
                }})
                .to(allCovers, {scaleY: 0, transformOrigin: '0% 0%', stagger: isInit ? 0 : -.1, duration: isInit ? 0 : .5, ease: 'power2.inOut', onComplete: () => {
                    
                }})
                if ($('.home-testi').length) {
                    updateNextItem(currIndex)
                } else {
                    if (tlLoop !== undefined) {
                        tlLoop.kill()
                    }
                }
                lastIndex = currIndex;
            }

            function updateNextItem(index) {
                let nextIndex = index + 1;
                if (index > allImgItems.length - 1) {
                    nextIndex = 0;
                }
                if (tlLoop !== undefined) {
                    tlLoop.kill()
                    gsap.to('.home-testi-img-prog-inner', {scaleX: 1, transformOrigin: 'left', duration: .3})
                    gsap.to('.home-testi-img-prog-inner', {scaleX: 0, transformOrigin: 'right', duration: .3, delay: .3})
                }
                setTimeout(() => {
                    tlLoop = gsap.timeline({
                        onComplete() {
                            if ($('.home-testi').length) {
                                activeTestiItem(nextIndex)
                            } else {
                                if (tlLoop !== undefined) {
                                    tlLoop.kill()
                                }
                            }
                        }
                    })
                    tlLoop
                    .set('.home-testi-img-prog-inner', {scaleX: 0, transformOrigin: 'left', overwrite: 'true'})
                    .fromTo('.home-testi-img-prog-inner', {scaleX: 0, transformOrigin: 'left'}, {scaleX: 1, duration: 8, overwrite: 'true'})
                }, 600);
            }
        }
    }
    let homeTestiAnim = new HomeTestiAnimate();

    class HomeBlogAnimate {
        constructor() {
            this.tlTrigger;
            this.tlTitle;
            this.tlAngGrad;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-blog',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.interaction()
                        this.setup()
                    }
                }
            })
        }
        setup() {
            console.log('HomeBlog setup')
            let titleLabel = new SplitType('.home-blog-label', {types: 'lines, words', lineClass: 'bp-line'})
            let titleTop = new SplitType('.home-blog-title .home-blog-title-top', {types: 'lines, words', lineClass: 'bp-line heading-line'})
            let titleWords = [...titleTop.words, $('.home-blog-title .home-blog-title-bot-unline-item').eq(0).get(0)];
            $('.home-blog-title-bot-unline').addClass('bp-line')

            this.tlTitle = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-blog-title-wrap',
                    start: 'top top+=65%',
                    once: true,
                },
                onComplete() {
                    titleTop.revert()
                    SplitType.create('.home-blog-title .home-blog-title-top', {types: 'lines', lineClass: 'bp-line heading-line'})
                    clearProps('.home-blog-title-bot-unline-item')
                    $('.home-blog-title-bot-unline').removeClass('bp-line')
                }
            })
            this.tlTitle
            .from(titleLabel.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
            .from(titleWords, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')
            .from('.home-blog-title .line-grad', {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, '>=-.3')

            this.tlAngGrad = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-blog-title-inner',
                    start: 'top top+=65%',
                    once: true,
                }
            })
            setupAngGrad(this.tlAngGrad, '.home-blog-title-inner .ang-grad-item.left', '.home-blog-title-inner .ang-grad-item.right')
            setupLinkReveal(this.tlAngGrad, '.home-blog-txt-link .txt', '.home-blog-txt-link .ic-embed', '.home-blog-txt-link .txt-link-line', '<=.2')
            let allBlogItems = $('.home-blog-main-item')
            allBlogItems.each((idx, el) => {
                let title = new SplitType($(el).find('.home-blog-main-item-title .txt').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                let cate = new SplitType($(el).find('.home-blog-main-item-cate').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                let minRead = new SplitType($(el).find('.home-blog-main-item-time').get(0), {types: 'lines, words', lineClass: 'bp-line'})

                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: $(el).find('.home-blog-main-item-info').get(0),
                        start: 'top top+=65%',
                        once: true,
                    },
                    onComplete() {
                        title.revert()
                        cate.revert()
                        minRead.revert()
                    }
                })
                tl
                .from(cate.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
                .from(title.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')
                .from(minRead.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')
                .from($(el).find('.home-blog-main-item-info-bg').get(0), {autoAlpha: 0, scaleY: .8, duration: .6, clearProps: 'all'}, 0)
                setupImgReveal($(el).find('.home-blog-main-item-thumb').get(0), $(el).find('.home-blog-main-thumb-img-wrap').get(0))
            })

        }
        interaction() {
            let offset = (viewport.h - $('.home-blog-title-inner').outerHeight()) / 2
            if (viewport.w > 768) {
            $('.home-blog-title-stick').css('top',`${offset}px`).css('padding-bottom', `${offset}px`)
            }
            let tlTitle = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-blog-title-wrap',
                    start: `top+=${offset} top`,
                    end: 'bottom bottom',
                    scrub: true,
                }
            })
            if(viewport.w > 767){
                tlTitle
                .to('.home-blog-title-stick', {scale: .8, duration: 1, ease: 'none'})
                if (!isSafariDesktop()) {
                    tlTitle
                    .to('.home-blog-title-stick .home-blog-title-inner', {'filter': 'blur(.6rem)', duration: 1, ease: 'none'}, 0)
                }
                tlTitle
                .to('.home-blog-title-stick', {autoAlpha: 0, duration: 1, ease: 'Power2.easeIn'}, 0)
            }
        }
    }
    let homeBlogAnim = new HomeBlogAnimate();

    class HomeSubscrAnimate {
        constructor() {
            this.tlTrigger;
            this.tlTitle;
            this.tlForm;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-subscr',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.interaction()
                        this.setup()
                    }
                }
            })
        }
        setup() {
            console.log('HomeSubscr setup')
            let titleLabel = new SplitType('.home-subscr-label', {types: 'lines, words', lineClass: 'bp-line'})
            let titleTop = new SplitType('.home-subscr-title .home-subscr-title-top', {types: 'lines, words', lineClass: 'bp-line'})
            let titleWords = [...titleTop.words, $('.home-subscr-title .home-subscr-title-bot .home-do-subscr-bot-unline-item').eq(0).get(0)];
            $('.home-subscr-title-bot-unline').addClass('bp-line')
            this.tlTitle = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-subscr-title-wrap',
                    start: 'top top+=65%',
                    once: true,
                },
                onComplete() {
                    titleTop.revert()
                    clearProps('.home-subscr-title .home-subscr-title-bot .home-do-subscr-bot-unline-item')
                    $('.home-subscr-title-bot-unline').removeClass('bp-line')
                }
            })
            this.tlTitle
            .from(titleLabel.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
            .from(titleWords, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')
            .from('.home-subscr-title .line-grad', {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, '>=-.3')
            setupAngGrad(this.tlTitle, '.home-subscr-ang-wrap .ang-grad-item.left', '.home-subscr-ang-wrap .ang-grad-item.right', '<=.2')

            let subText = new SplitType('.home-subscr-sub-wrap .home-subscr-sub', {types: 'lines, words', lineClass: 'bp-line'})
            this.tlForm = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-subscr-form-wrap',
                    start: 'top top+=65%',
                    once: true,
                },
                onComplete: () => {
                    subText.revert()
                }
            })
            this.tlForm
            .from('.home-subscr-form-wrap .home-subscr-input-wrap', {autoAlpha: 0, duration: .6 , clearProps: 'all'})
            .from('.home-subscr-form-wrap .home-subscr-input-line', {scaleX: 0, duration: .6, clearProps: 'all'}, '<=.2')
            if (viewport.w < 991) {
                this.tlForm
                .from('.home-subscr-input-submit-wrap', {autoAlpha: 0, duration: .6, clearProps: 'all'}, '<=.2')
            }
            this.tlForm
            .from(subText.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .016}, '<=.1')
        }
        interaction() {

        }
    }
    let homeSubscrAnim = new HomeSubscrAnimate();
    
    class HomeSectionAnimate {
        constructor() {
            if (viewport.w > 991) {
                this.tlScDoVal;
                this.tlNewsFooter;
            }
        }
        setup() {
            if (viewport.w > 991) {
                this.tlScDoVal = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.home-do-wrap',
                        start: `bottom-=${viewport.h} bottom`,
                        end: `bottom bottom`,
                        scrub: true,
                    }
                })
                this.tlScDoVal
                .to('.home-do', {scale: .8, autoAlpha: .6, duration: 1.1, ease: 'none'}, 0)
                this.tlNewsFooter = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.home-subscr-wrap',
                        start: `bottom-=${viewport.h} bottom`,
                        end: `bottom bottom`,
                        scrub: true,
                    }
                })
                this.tlNewsFooter.to('.home-subscr', {scale: .8, autoAlpha: .6, duration: 1.1, ease: 'none'}, 0)
            }
        }
        update() {
            if (viewport.w > 991) {
                this.tlScDoVal.scrollTrigger.refresh()
                this.tlNewsFooter.scrollTrigger.refresh()
            }
        }
        destroy() {
            if (viewport.w > 991) {
                this.tlScDoVal.kill()
                this.tlNewsFooter.kill()
            }
        }
    }
    let homeSectionAnim = new HomeSectionAnimate();
    // // End Home

    // // Location
    class LocHeroAnimate {
        constructor() {
            this.tlTitle;
            this.tlSubItems;
        }
        setup() {
            this.interaction()

            let titleTop = new SplitType('.loc-hero-title .loc-hero-title-top', {types: 'lines, words', lineClass: 'bp-line'})
            let titleBot = new SplitType('.loc-hero-title .loc-hero-title-bot .loc-hero-title-line', {types: 'lines, words', lineClass: 'bp-line'})
            let titleWords = [...titleTop.words, ...titleBot.words, $('.loc-hero-title-bot-unline-item').eq(0).get(0)];
            $('.loc-hero-title .loc-hero-title-bot-unline').addClass('bp-line')
            this.tlTitle = gsap.timeline({
                paused: true,
                onComplete() {
                    titleTop.revert()
                    titleBot.revert()
                    clearProps('.loc-hero-title-bot-unline-item')
                    $('.loc-hero-title .loc-hero-title-bot-unline').removeClass('bp-line')
                }
            })
            this.tlTitle
            .from(titleWords, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
            .from('.loc-hero-title .line-grad', {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, '>=-.3')
            setupLinkReveal(this.tlTitle, '.loc-hero-txt-link .txt', '.loc-hero-txt-link .ic-embed', '.loc-hero-txt-link .txt-link-line', '<=.2')

            let allStatItems = $('.loc-hero-stat-item');
            allStatItems.css('pointer-events', 'none');
            this.tlSubItems = gsap.timeline({
                scrollTrigger: {
                    trigger: '.loc-hero-stat',
                    start:'top top+=65%',
                    once: true,
                },
                onComplete() {
                    SplitType.revert('.loc-hero-stat-item .loc-hero-stat-item-val')
                    SplitType.revert('.loc-hero-stat-item .loc-hero-stat-item-sub')
                    clearProps('.loc-hero-stat-item');
                }
            })
            allStatItems.each((idx, el) => {
                let title = new SplitType($(el).find('.loc-hero-stat-item-val').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                let sub = new SplitType($(el).find('.loc-hero-stat-item-sub').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                this.tlSubItems
                .from($(el).find('.loc-hero-stat-item-line'), {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all', onComplete() {
                    if (idx == 0 ) {
                        activeItem(['.loc-hero-stat-item'], 0)
                    }
                }}, idx * .2)
                .from(title.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')
                .from(sub.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')
            })
        }
        interaction() {
            //default width
            let col = (($('.container.grid').width()) - (parseRem(20) * 19)) / 20;
            let dir = -1;
            // let defWidth = col * 6 + parseRem(20) * 5;
            let fixedPoint = $('.loc-hero-title-wrap').offset().left + $('.loc-hero-gal-img-wrap').width()
            //marquee
            let temp = $('.loc-hero-gal-list .loc-hero-gal-item').clone();
            let raiseDis = $('.loc-hero-gal-cms').height() - $('.loc-hero-gal-list').height();
            $('.loc-hero-gal-list').append(temp);
            let distance = $('.loc-hero-gal-list').width();
            let temp2 = $('.loc-hero-gal-list .loc-hero-gal-item').clone();
            $('.loc-hero-gal-list').append(temp2);
            
            let currIndex = 0;
            let coreVal = 0; 
            
            function updateMarquee() {
                if (load.isDoneLoading()) {
                    if (coreVal <= 1) {
                        coreVal = lerp(coreVal, 1, 0.04);
                    }
                    if ($('.loc-hero-gal-wrap').length) {
                        if (isInViewport('.loc-hero-gal-wrap')) {
                            let x = gsap.getProperty('.loc-hero-gal-cms', 'x');
                            if (x <= -distance) {
                                x = 0;
                            } else if (x >= 0) {
                                x = -distance;
                            }
                            dir = lenis.direction == 0 ? dir : -lenis.direction
                            allItems.each((idx, el) => {
                                let bounding = el.getBoundingClientRect();
                                if (bounding.left < fixedPoint && bounding.right > fixedPoint) {
                                    currIndex = idx;
                                }
                            });
                            active(currIndex)
                            if(viewport.w > 767){
                                gsap.quickSetter('.loc-hero-gal-cms', 'x', 'px')(x + (2 + Math.abs(isTouchDevice() || isSafariDesktop() ? 1 : lenis.velocity * .5)) * dir)
                            }
                            else{
                                gsap.quickSetter('.loc-hero-gal-cms', 'x', 'px')(x + (.75 + Math.abs(isTouchDevice() || isSafariDesktop() ? 1 : lenis.velocity * .5)) * dir)
                            }
                        } else {
                            active(0)
                        }
                    }
                }
                if ($('.loc-hero-gal-wrap').length) {
                    requestAnimationFrame(updateMarquee)
                } else {
                    cancelAnimationFrame(updateMarquee)
                }
            }
            requestAnimationFrame(updateMarquee);
            
            let allItems = $('.loc-hero-gal-item');
            function active(index) {
                allItems.removeClass('active')
                let dupIndex = index < allItems.length / 2 ? index + allItems.length / 2 : index - allItems.length / 2;
                if (load.isDoneLoading()) {
                    allItems.eq(index).addClass('active')
                    allItems.eq(dupIndex).addClass('active')
                }
                allItems.each((idx, el) => {
                    let currY = gsap.getProperty(el, 'y')
                    if (idx == index || idx == dupIndex) {
                        gsap.quickSetter(el, 'y', `px`)(lerp(currY, 0 - (raiseDis * 1) * coreVal, .04)) 
                    } else if (idx == index + 1 || idx == (index + 1) % allItems.length || idx == dupIndex + 1 || idx == (dupIndex + 1) % allItems.length) {
                        gsap.quickSetter(el, 'y', `px`)(lerp(currY, 0 - (raiseDis * .4) * coreVal, .04))     
                    } else if (idx == index - 1 || idx == (index - 1) % allItems.length || idx == dupIndex - 1 || idx == (dupIndex - 1) % allItems.length) {
                        gsap.quickSetter(el, 'y', `px`)(lerp(currY, 0 - (raiseDis * .4) * coreVal, .04)) 
                    } else if ( idx == allItems.length - 1 && index == 0 || idx == allItems.length - 1 && dupIndex == 0) {
                        gsap.quickSetter(el, 'y', `px`)(lerp(currY, 0 - (raiseDis * .4) * coreVal, .04)) 
                    } else {
                        gsap.quickSetter(el, 'y', `px`)(lerp(currY, 0, .08))
                    }
                })
            }

            let allStatItems = $('.loc-hero-stat-item')
            $('.loc-hero-stat-item').on('mouseenter', function(e) {
                e.preventDefault();
                let index = allStatItems.index($(this).get(0));
                activeItem(['.loc-hero-stat-item'], index)
            })
        }
        play() {
            this.tlTitle.play()
        }
    }
    let locHeroAnim = new LocHeroAnimate();
    class LocOffiAnimate {
        constructor() {
            this.tlTrigger;
            this.tlTitle;
            this.tlSub;
            this.tlHorScroll;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.loc-offi-wrap',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        if(viewport.w > 767){
                            this.interaction()
                        }
                        this.setup()
                        this.horScrollReveal()
                    }
                }    
            })
        }
        setup() {
            let label = new SplitType('.loc-offi-label', {types: 'lines, words', lineClass: 'bp-line'})
            let topTitle = new SplitType('.loc-offi-title-top', {types: 'lines, words', lineClass: 'bp-line heading-line'})
            let botTitle = new SplitType('.loc-offi-title-bot', {types: 'lines, words', lineClass: 'bp-line heading-line'})
            let titleWords = [...topTitle.words, $('.loc-offi-title-mid-unline-item').eq(0).get(0), ...botTitle.words];
            this.tlTitle = gsap.timeline({
                scrollTrigger: {
                    trigger: '.loc-offi-title-wrap',
                    start: 'top top+=65%',
                    once: true,
                    onComplete() {
                        topTitle.revert()
                        botTitle.revert()
                        clearProps('.loc-offi-title-mid-unline-item')
                    }
                }
            })
            this.tlTitle
            .from(label.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
            .from(titleWords, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')
            .from('.loc-offi-title .line-grad', {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, '>=-.3')

            this.tlSub = gsap.timeline({
                scrollTrigger: {
                    trigger: '.loc-offi-sub-wrap',
                    start: 'top top+=65%',
                    once: true,
                }
            })
            let allSub = $('.loc-offi-sub-txt');
            allSub.each((idx, el) => {
                let sub = new SplitType(el, {types: 'lines, words', lineClass: 'bp-line'})
                this.tlSub
                .from(sub.words, {autoAlpha: 0, yPercent: 80, duration: .4, stagger: .016, onComplete() {
                    sub.revert()
                }}, idx * .2)
            })

            setupImgReveal('.loc-offi-over-img-wrap', '.loc-offi-over-img')
        }
        interaction() {
            let allchild = $('.loc-offi-main-stick-inner').children();
            let totalWidth = 0
            allchild.each((idx, el) => {
                let width = $(el).outerWidth(true);
                totalWidth += width
            })
            let distance = totalWidth - $('.loc-offi-main-stick').width();
            let prgoDistance = $('.loc-offi-prog-line').width() - $('.loc-offi-prog-line-inner').width();
            this.tlHorScroll = gsap.timeline({
                scrollTrigger: {
                    trigger: '.loc-offi-main-wrap',
                    start:'top top+=10%',
                    end: 'bottom bottom',
                    scrub: true,
                },
            })
            this.tlHorScroll
            .to('.loc-offi-main-stick-inner', {x: -distance, duration: 1, ease: 'none'})
            .to('.loc-offi-prog-line-inner', {x: prgoDistance, duration: 1, ease: 'none'}, 0)
        }
        horScrollReveal() {
            let tlOffiArea = gsap.timeline({
                scrollTrigger: {
                    trigger: '.loc-offi-area-main',
                    start: "left left+=75%",
                    containerAnimation: this.tlHorScroll,
                    once: true,
                }
            })
            let allOffiAreaItems = $('.loc-offi-area-item');
            allOffiAreaItems.each((idx, el) => {
                let label = new SplitType($(el).find('.loc-offi-area-item-label').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                let value = new SplitType($(el).find('.loc-offi-area-item-val').get(0), {types: 'lines, chars', lineClass: 'bp-line'})
                let unit = new SplitType($(el).find('.loc-offi-area-item-unit').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                tlOffiArea
                .from(label.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, idx * .2)
                .from([...value.chars, ...unit.words], {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .02, onComplete: () => {
                    label.revert()
                    value.revert()
                    unit.revert()
                }}, '<=.2')
            })

            let offiRestTitleTop = new SplitType('.loc-offi-rest-title-top', {types: 'lines, words', lineClass: 'bp-line'})
            let offiRestTitleBot = new SplitType($('.loc-offi-rest-title-bot-unline-item').eq(0).get(0), {types: 'lines, words', lineClass: 'bp-line'})
            let offiRestTitleWords = [...offiRestTitleTop.words, ...offiRestTitleBot.words];

            let tlOffiRest = gsap.timeline({
                scrollTrigger: {
                    trigger: '.loc-offi-rest-title',
                    start: "left left+=75%",
                    containerAnimation: this.tlHorScroll,
                    once: true,
                },
                onComplete: () => {
                    offiRestTitleTop.revert()
                    offiRestTitleBot.revert()
                    clearProps('.loc-offi-rest-title-bot-unline-item')
                }
            })
            tlOffiRest
            .from(offiRestTitleWords, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
            .from('.loc-offi-rest-title .line-grad', {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, '>=-.3')

            $('.loc-offi-dine-item').each((idx, el) => {
                let offiDineTitle = new SplitType($(el).find('.loc-offi-dine-item-title').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                let offiDineSub = new SplitType($(el).find('.loc-offi-dine-item-sub').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                let tlOffiDine = gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        start: "left left+=75%",
                        containerAnimation: this.tlHorScroll,
                        once: true,
                    },
                    onComplete: () => {
                        offiDineTitle.revert()
                        offiDineSub.revert()
                    }
                })
                tlOffiDine
                .from(offiDineTitle.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
                .from(offiDineSub.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .016}, '<=.2')
            })

            let offiCopyTitleBot = new SplitType('.loc-offi-copy-title-bot', {types: 'lines, words', lineClass: 'bp-line'})
            let offCopyTitleWords = [$('.loc-offi-copy-title-bot-unline-item').eq(0).get(0), ...offiCopyTitleBot.words];
            let tlOffiCopyTitle = gsap.timeline({
                scrollTrigger: {
                    trigger: '.loc-offi-copy-title',
                    start: "left left+=75%",
                    containerAnimation: this.tlHorScroll,
                    once: true,
                },
                onComplete: () => {
                    offiCopyTitleBot.revert()
                    clearProps('.loc-offi-copy-title-bot-unline-item')
                }
            })
            tlOffiCopyTitle
            .from(offCopyTitleWords, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
            .from('.loc-offi-copy-title .line-grad', {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, '>=-.3')

            let offiWorkTitleTop = new SplitType('.loc-offi-work-title-top', {types: 'lines, words', lineClass: 'bp-line'})
            let offiWorkTitleBot = new SplitType('.loc-offi-work-title-bot', {types: 'lines, words', lineClass: 'bp-line'})
            let offiWorkTitleWords = [...offiWorkTitleTop.words, $('.loc-offi-work-title-mid-unline-item').eq(0).get(0), ...offiWorkTitleBot.words];
            let offiWorkSub = new SplitType('.loc-offi-work-sub', {types: 'lines, words', lineClass: 'bp-line'})
            let tlOffiWork = gsap.timeline({
                scrollTrigger: {
                    trigger: '.loc-offi-work-title-wrap',
                    start: "left left+=75%",
                    containerAnimation: this.tlHorScroll,
                    once: true,
                },
                onComplete: () => {
                    offiWorkTitleTop.revert()
                    offiWorkTitleBot.revert()
                    offiWorkSub.revert()
                    clearProps('.loc-offi-work-title-mid-unline-item')
                }
            })
            tlOffiWork
            .from(offiWorkTitleWords, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
            .from('.loc-offi-work-title .line-grad', {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, '>=-.3')
            .from(offiWorkSub.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .016}, .2)
            setupLinkReveal(tlOffiWork, '.loc-offi-work-txt-link .txt', '.loc-offi-work-txt-link .ic-embed', '.loc-offi-work-txt-link .txt-link-line', '<=.2')

            setupImgReveal('.loc-offi-area-img-wrap', '.loc-offi-area-img', {
                trigger: ".loc-offi-area-img-wrap",
                start: "left left+=75%",
                containerAnimation: this.tlHorScroll,
                once: true,
            })
            setupImgReveal('.loc-offi-area-img-sub', '.loc-offi-area-img-sub-inner', {
                trigger: ".loc-offi-area-img-sub",
                start: "left left+=75%",
                containerAnimation: this.tlHorScroll,
                once: true,
            })
            setupImgReveal('.loc-offi-rest-img-wrap', '.loc-offi-rest-img', {
                trigger: ".loc-offi-rest-img-wrap",
                start: "left left+=75%",
                containerAnimation: this.tlHorScroll,
                once: true,
            })
            setupImgReveal('.loc-offi-dine-img-wrap:not(.mod-sm)', '.loc-offi-dine-img-wrap:not(.mod-sm) .loc-offi-dine-img', {
                trigger: ".loc-offi-dine-img-wrap:not(.mod-sm)",
                start: "left left+=75%",
                containerAnimation: this.tlHorScroll,
                once: true,
            })
            setupImgReveal('.loc-offi-dine-img-wrap.mod-sm', '.loc-offi-dine-img-wrap.mod-sm .loc-offi-dine-img', {
                trigger: ".loc-offi-dine-img-wrap.mod-sm",
                start: "left left+=75%",
                containerAnimation: this.tlHorScroll,
                once: true,
            })
            setupImgReveal('.loc-offi-work-img-wrap', '.loc-offi-work-img', {
                trigger: ".loc-offi-work-img-wrap",
                start: "left left+=75%",
                containerAnimation: this.tlHorScroll,
                once: true,
            })
        }
    }
    let locOffiAnim = new LocOffiAnimate();
    class LocSellAnimate {
        constructor() {
            this.tlTrigger;
            this.tlLabel;
            this.tlList;
            this.tlContent;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.loc-sell',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        // if(viewport.w > 767){
                        this.interaction()
                        // }
                        this.setup()
                    }
                }
            })
        }
        setup() {
            let label = new SplitType('.loc-sell-label', {types: 'lines, words', lineClass: 'bp-line'})
            this.tlLabel = gsap.timeline({
                scrollTrigger: {
                    trigger: '.loc-sell-label-wrap',
                    start: 'top top+=65%',
                    once: true,
                },
                onComplete: () => {
                    label.revert()
                }
            })

            this.tlLabel
            .from(label.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})

            setupImgReveal('.loc-sel-img-list', '.loc-sel-img-item:nth-child(1)')
            setupImgReveal('.loc-sel-thumb-list', '.loc-sel-thumb-item:nth-child(1)')
            
            this.tlList = gsap.timeline({
                scrollTrigger: {
                    trigger: '.loc-sell-tab-cms',
                    start: 'top top+=65%',
                    once: true,
                }
            })
            let allItemsTitle = $('.loc-sell-tab-item-inner')
            allItemsTitle.each((idx, el) => {
                let title = new SplitType($(el).find('.txt').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                this.tlList
                .from(title.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, idx * .2)
                .from($(el).find('.loc-sell-tab-item-line'), {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, '<=.1')
            })
            if(viewport.w < 767){
                $(".loc-sell-content-cms").addClass("swiper");
                $(".loc-sell-content-list").addClass("swiper-wrapper");
                $(".loc-sell-content-item").addClass("swiper-slide");
                let allSubItems = $('.loc-sell-content-item-txt');
                let allSubSplitItems = [];
                allSubItems.each((idx, el) => {
                    let body = new SplitType(el, {types: 'lines, words', lineClass: 'bp-line heading-line'})
                    allSubSplitItems.push(body)
                })
                let lastActiveSlide = 0;
                function hiddenImg(className,index){
                    $(className).each((idx, el) => {
                        if(lastActiveSlide < index){
                            $(el).css('z-index','1')
                            if(lastActiveSlide != idx){
                                $(el).css({
                                    'clip-path': 'polygon(0% 102%, 0% var(--col-1), 25% var(--col-1), 25% 102%, 25% var(--col-2), 50% var(--col-2), 50% 102%, 50% var(--col-3), 75% var(--col-3), 75% 102%, 75% var(--col-4), 100% var(--col-4), 100% 102%)',
                                    '--col-1': '100%',
                                    '--col-2': '100%',
                                    '--col-3': '100%',
                                    '--col-4': '100%',
                                })
                            }
                        }
                        else{
                            if(lastActiveSlide == idx){
                                $(el).css('z-index',`${100 - idx}`)
                            }
                            else if(idx == index){
                                $(el).css('z-index','101')                  
                            } 
                        }
                    })
                }
                function UpdateImgActive(index){
                    let dur = .6;
                    let delay = .1;
                    let scrollParams = {
                        trigger: '.loc-sel-thumb-list',
                        start: 'top bottom',
                        once: true,
                    }
                    hiddenImg('.loc-sel-thumb-item', index);
                    hiddenImg('.loc-sel-img-item', index);
                    setupImgReveal('.loc-sel-img-list', `.loc-sel-img-item:nth-child(${index+1})`,scrollParams,dur,delay)
                    setupImgReveal('.loc-sel-thumb-list', `.loc-sel-thumb-item:nth-child(${index+1})`,scrollParams,dur,delay)
                    lastActiveSlide = index ;
                }
                let swiper = new Swiper(".loc-sell-content-cms", {
                    slidesPerView: 'auto',
                    spaceBetween: parseRem(20),
                    pagination:{
                        el: '.swiper-pagination', // This specifies the element where the pagination will be rendered
                        clickable: true,
                    },
                    on: {
                        slideChange: function (swiper) {
                            let currIndex=swiper.realIndex;
                            UpdateImgActive( currIndex);
                        },
                    },
                  });
            }
            this.tlContent = gsap.timeline({
                scrollTrigger: {
                    trigger: '.loc-sell-content-wrap',
                    start: 'top top+=65%',
                    once: true,
                }
            })
            let tlBtnLinkMb = gsap.timeline({
                scrollTrigger: {
                    trigger: '.loc-sel-img-cms',
                    start: 'top top+=65%',
                    once: true,
                }
            })
            if(viewport.w < 767){
                this.tlContent
                .from('.loc-sell-content-item-title', {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .02, ease: 'power1.inOut'})
            }
            this.tlContent
            .from('.loc-sell-content-item.active .loc-sell-content-item-txt .word', {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .02, ease: 'power1.inOut'},'<=0')
            setupLinkReveal(tlBtnLinkMb, '.hidden-dk .loc-sell-txt-link .txt', '.hidden-dk .loc-sell-txt-link .ic-embed', '.hidden-dk .loc-sell-txt-link .txt-link-line', '<=.2')
            setupLinkReveal(this.tlContent, '.loc-sell-txt-link.hidden-mb .txt', '.loc-sell-txt-link.hidden-mb .ic-embed', '.loc-sell-txt-link.hidden-mb .txt-link-line', '<=.2')
        }
        interaction() {
            let elArr = ['.loc-sell-content-item', '.loc-sell-tab-item-inner'];
            let currIndex = 0;
            let lastIndex;
            let allSubItems = $('.loc-sell-content-item-txt'); 
            let allSubSplitItems = []
            allSubItems.each((idx, el) => {
                let body = new SplitType(el, {types: 'lines, words', lineClass: 'bp-line heading-line'})
                allSubSplitItems.push(body)
            })

            function activeSubItem(lastIndex, index, isInit = false) {
                if  (isInit) {
                    gsap.set('.loc-sell-content-item-txt .word', {autoAlpha: 0, yPercent: 0})
                }
                if (lastIndex !== undefined) {
                    gsap.set(allSubSplitItems[lastIndex].words, {autoAlpha: 1, yPercent: 0})
                    gsap.to(allSubSplitItems[lastIndex].words, {autoAlpha: 0, yPercent: -80, duration: isInit ? 0 : .6, stagger: isInit ? 0 : .02, ease: 'power1.inOut'})
                }
                gsap.set(allSubSplitItems[index].words, {autoAlpha: 0, yPercent: 80})
                gsap.to(allSubSplitItems[index].words, {autoAlpha: 1, yPercent: 0, duration: isInit ? 0 : .6, stagger: isInit ? 0 : .02, ease: 'power1.inOut'})
            }
            if(viewport.w > 767){
                activeItem(elArr, currIndex)
                activeSubItem(undefined, currIndex, true);
            }
            
            lastIndex = 0;
            $('.loc-sel-img-item').each((idx, el) => {
                if (idx != 0) {
                    $(el).css({
                        'clip-path': 'polygon(0% 102%, 0% var(--col-1), 25% var(--col-1), 25% 102%, 25% var(--col-2), 50% var(--col-2), 50% 102%, 50% var(--col-3), 75% var(--col-3), 75% 102%, 75% var(--col-4), 100% var(--col-4), 100% 102%)',
                        '--col-1': '100%',
                        '--col-2': '100%',
                        '--col-3': '100%',
                        '--col-4': '100%',
                    })
                }
            })
            $('.loc-sel-thumb-item').each((idx, el) => {
                if (idx != 0) {
                    $(el).css({
                        'clip-path': 'polygon(0% 102%, 0% var(--col-1), 25% var(--col-1), 25% 102%, 25% var(--col-2), 50% var(--col-2), 50% 102%, 50% var(--col-3), 75% var(--col-3), 75% 102%, 75% var(--col-4), 100% var(--col-4), 100% 102%)',
                        '--col-1': '100%',
                        '--col-2': '100%',
                        '--col-3': '100%',
                        '--col-4': '100%',
                    })
                }
            })
            if(viewport.w > 767){
                let tlScroll = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.loc-sell-inner',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: .2,
                        snap: {
                            snapTo: [0, .5, 1],
                            duration: {min: .2, max: .4}
                        },
                        onUpdate: (self) => {
                            if (self.progress >= 0 && self.progress <= 1/4) {
                                currIndex = 0;
                            } else if (self.progress >= 1/4 && self.progress <= 3/4) {
                                currIndex = 1;
                            } else if (self.progress >= 3/4 && self.progress <= 1) {
                                currIndex = 2;
                            }
                            if (currIndex !== undefined) {
                                if (lastIndex !== currIndex) {
                                    if (!$('.loc-sell-tab-list').hasClass('animating')) {
                                        activeItem(elArr, currIndex);
                                        activeSubItem(lastIndex, currIndex);
                                        lastIndex = currIndex;
                                    }
                                }
                            }
                        }
                    }
                })
    
                $('.loc-sell-tab-item-inner').on('click', function(e) {
                    e.preventDefault();
                    if ($(this).hasClass('active') || $('.loc-sell-tab-list').hasClass('animating')) {return;}
                    currIndex = $(this).closest('.loc-sell-tab-item').index();
                    $('.loc-sell-tab-list').addClass('animating');
                    lastIndex = $('.loc-sell-tab-item-inner.active').closest('.loc-sell-tab-item').index();
                    let gapIndex = Math.abs(currIndex - lastIndex);
                    activeItem(elArr, currIndex);
                    activeSubItem(lastIndex, currIndex);
                    lastIndex = currIndex;
                    tlScroll.paused(true);
                    lenis.scrollTo($('.loc-sell-inner').offset().top + viewport.h * currIndex, {duration: 1.2 * gapIndex, onComplete() {
                        $('.loc-sell-tab-list').removeClass('animating');
                    }})
                    setTimeout(() => {
                        $('.loc-sell-tab-list').removeClass('animating');
                    }, 1200);
                })
                tlScroll
                .to($('.loc-sel-img-item').eq(1).get(0), {'--col-1': '0%', duration: 1, ease: 'power2.out'},0)
                .from($('.loc-sel-img-item .img-basic').eq(1).get(0), {scale: 1.2, duration: 1, ease: 'power2.out'}, '<=0')
                .to($('.loc-sel-img-item').eq(1).get(0), {'--col-2': '0%', duration: .9, ease: 'power2.out'},0.1)
                .to($('.loc-sel-img-item').eq(1).get(0), {'--col-3': '0%', duration: .8, ease: 'power2.out'},0.2)
                .to($('.loc-sel-img-item').eq(1).get(0), {'--col-4': '0%', duration: .7, ease: 'power2.out'},0.3)
                .to($('.loc-sel-img-item').eq(2).get(0), {'--col-1': '0%', duration: 1, ease: 'power2.out'}, 1)
                .from($('.loc-sel-img-item .img-basic').eq(2).get(0), {scale: 1.2, duration: 1, ease: 'power2.out'}, '<=0')
                .to($('.loc-sel-img-item').eq(2).get(0), {'--col-2': '0%', duration: .9, ease: 'power2.out'}, 1.1)
                .to($('.loc-sel-img-item').eq(2).get(0), {'--col-3': '0%', duration: .8, ease: 'power2.out'}, 1.2)
                .to($('.loc-sel-img-item').eq(2).get(0), {'--col-4': '0%', duration: .7, ease: 'power2.out'}, 1.3)
    
                .to($('.loc-sel-thumb-item').eq(1).get(0), {'--col-1': '0%', duration: 1, ease: 'power2.out'},0)
                .from($('.loc-sel-thumb-item .img-basic').eq(1).get(0), {scale: 1.2, duration: 1, ease: 'power2.out'}, '<=0')
                .to($('.loc-sel-thumb-item').eq(1).get(0), {'--col-2': '0%', duration: .9, ease: 'power2.out'},0.1)
                .to($('.loc-sel-thumb-item').eq(1).get(0), {'--col-3': '0%', duration: .8, ease: 'power2.out'},0.2)
                .to($('.loc-sel-thumb-item').eq(1).get(0), {'--col-4': '0%', duration: .7, ease: 'power2.out'},0.3)
                .to($('.loc-sel-thumb-item').eq(2).get(0), {'--col-1': '0%', duration: 1, ease: 'power2.out'}, 1)
                .from($('.loc-sel-thumb-item .img-basic').eq(2).get(0), {scale: 1.2, duration: 1, ease: 'power2.out'}, '<=0')
                .to($('.loc-sel-thumb-item').eq(2).get(0), {'--col-2': '0%', duration: .9, ease: 'power2.out'}, 1.1)
                .to($('.loc-sel-thumb-item').eq(2).get(0), {'--col-3': '0%', duration: .8, ease: 'power2.out'}, 1.2)
                .to($('.loc-sel-thumb-item').eq(2).get(0), {'--col-4': '0%', duration: .7, ease: 'power2.out'}, 1.3)
            }
        }
    }
    let locSellAnim = new LocSellAnimate();
    class LocTourAnimate {
        constructor() {
            this.tlTrigger;
            this.tlScroll;
            this.tlFirstSub;
            this.tlMap;
            this.tlAddboxScroll;
            this.tlAddbox;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.loc-tour',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.interaction()
                        this.setup()
                    }
                }
            })
        }
        setup() {
            this.tlFirstSub = gsap.timeline({
                scrollTrigger: {
                    trigger: '.loc-tour-content-sub-wrap.sub-wrap-head',
                    start: 'top top+=65%',
                    once: true,
                }
            })
            this.tlFirstSub
            .from('.loc-tour-content-sub-wrap.sub-wrap-head .loc-tour-content-sub .word', {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})

            let allItems = $('.loc-tour-main-item');
            allItems.each((idx, el) => {
                let number = new SplitType($(el).find('.loc-tour-main-item-num').get(0), {types: 'lines, chars', lineClass: 'bp-line'})
                let title = new SplitType($(el).find('.loc-tour-main-item-title').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                let tlItem = gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        start: 'top top+=75%',
                        once: true,
                        onComplete() {
                            number.revert()
                            title.revert()
                        }
                    }
                })
                tlItem
                .from($(el).find('.loc-tour-main-item-link'), {autoAlpha: 0, yPercent: 20, duration: .3, clearProps: 'all'}, idx % 2 == 0 ? 0 : .1)
                .from(number.chars, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')
                .from(title.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')
            })

            this.tlMap = gsap.timeline({
                scrollTrigger: {
                    trigger: '.loc-tour-map',
                    start: 'top bottom',
                    end: 'bottom bottom',
                    scrub: true,
                }
            })
            this.tlMap
            .from('.loc-tour-map-img img', {yPercent: -47, scale: 1.2, duration: 1, ease: 'power1.out'})
            .from('.loc-tour-map-img-wrap', {yPercent: -20, duration: 1, ease: 'power1.out'}, '<=0')
            .from('.loc-tour-map-overlay', {yPercent: -20, duration: 1, ease: 'power1.out'}, '<=0')

            if (viewport.w > 991) {
                this.tlAddboxScroll = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.loc-tour-map-add',
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    }
                })
                this.tlAddboxScroll
                .fromTo('.loc-tour-map-add-inner', {yPercent: 20}, {yPercent: -20, duration: 1, ease: 'power1.out'});
            }

            let addBoxLabel = new SplitType('.loc-tour-map-add-label', {types: 'lines, words', lineClass: 'bp-line'})
            let addBoxTitle = new SplitType('.loc-tour-map-add-title', {types: 'lines, words', lineClass: 'bp-line'})
            let addBoxPhoneLabel = new SplitType('.loc-tour-map-add-label-phone', {types: 'lines, words', lineClass: 'bp-line'})
            let addBoxPhoneNum = new SplitType('.loc-tour-map-add-phone-txt', {types: 'lines, words, chars', lineClass: 'bp-line'})
            gsap.set('.loc-tour-map-add-phone-link', {'pointer-events': 'none'})
            this.tlAddbox = gsap.timeline({
                scrollTrigger: {
                    trigger: '.loc-tour-map-add',
                    start: 'top top+=65%',
                },
                onComplete() {
                    addBoxLabel.revert()
                    addBoxTitle.revert()
                    addBoxPhoneLabel.revert()
                    addBoxPhoneNum.revert()
                    clearProps('.loc-tour-map-add-phone-link')
                }
            })
            this.tlAddbox
            .from(addBoxLabel.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
            .from(addBoxTitle.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')
            setupLinkReveal(this.tlAddbox, '.loc-tour-map-txt-link .txt', '.loc-tour-map-txt-link .ic-embed', '.loc-tour-map-txt-link .txt-link-line', '<=.2')
            this.tlAddbox
            .from(addBoxPhoneLabel.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')
            .from(addBoxPhoneNum.chars, {autoAlpha: 0, yPercent: 80, duration: .4, stagger: .016}, '<=.2')
            
        }
        interaction() {
            $('.loc-tour-main-item-link').on('click', function(e) {
                e.preventDefault();
                if (isTouchDevice()) {
                    $('.loc-tour-main-item-link').removeClass('active')
                    $(this).addClass('active')
                }
            })
            $('.loc-tour-main-item-num').each((idx, el) => {
                el.innerHTML = `0${idx + 1}`
            })
            let subTextHead = new SplitType('.loc-tour-content-sub-wrap.sub-wrap-head .loc-tour-content-sub', {types: 'lines, words', lineClass: 'bp-line'})
            let subTextMid = new SplitType('.loc-tour-content-sub-wrap.sub-wrap-mid .loc-tour-content-sub', {types: 'lines, words', lineClass: 'bp-line'})
            let titleText = new SplitType('.loc-tour-content-title-wrap .loc-tour-content-title', {types: 'lines, words', lineClass: 'bp-line'})
            gsap.set('.loc-tour-content-sub-wrap.sub-wrap-mid .loc-tour-content-sub', {autoAlpha: 0})
            this.tlScroll = gsap.timeline({
                scrollTrigger: {
                    trigger: '.loc-tour-top',
                    start: 'top top+=65%',
                    end: `top+=${viewport.h * 3} bottom`,
                    scrub: true,
                }
            })
            this.tlScroll
            .to(subTextHead.words, {color: '#ffffff', duration: 1, stagger: .1, ease: 'none'})
            .to('.loc-tour-content-sub-wrap.sub-wrap-head .loc-tour-content-sub', {autoAlpha: 0, duration: 1})
            .to('.loc-tour-content-sub-wrap.sub-wrap-mid .loc-tour-content-sub', {autoAlpha: 1, duration: 1})
            .to(subTextMid.words, {color: '#ffffff', duration: 1, stagger: .1, ease: 'none'})
            .to('.loc-tour-content-sub-wrap.sub-wrap-mid .loc-tour-content-sub', {autoAlpha: 0, duration: 1})
            .from('.loc-tour-content-title', {autoAlpha: 0, duration: 1})
            .from(titleText.words, {color: 'rgba(255, 255, 255, 0.20)', duration: 1, stagger: .1, ease: 'none'})

            this.tlScrollFade = gsap.timeline({
                scrollTrigger: {
                    trigger: '.loc-tour-top',
                    start: `top+=${viewport.h * 3.25} bottom`,
                    end: 'bottom bottom',
                    scrub: true,
                }
            })
            this.tlScrollFade
            .to('.loc-tour-content-title', {'filter': 'blur(.4rem)', scale: .8, duration: 1, ease: 'none'})
            .to('.loc-tour-content-title', {autoAlpha: 0, duration: 1, ease: 'Power1.easeIn'}, 0)

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.loc-tour-top',
                    start: 'top bottom',
                    end: `top+=${viewport.h * 2.5} bottom`,
                    scrub: true,
                }
            })
            tl.fromTo('.loc-tour-content-bg', {'--bg-deg': '-90deg', autoAlpha: 1}, {'--bg-deg': '90deg', autoAlpha: 0, duration: 1, ease: 'none'}, 0)
        }
    }
    let locTourAnim = new LocTourAnimate();
    class LocSectionAnimate {
        constructor() {
            if (viewport.w > 991) {
                this.tlScHeroOffi;
                this.tlScOffiSell;
                this.tlScSellTour;
                this.tlNewsFooter;
            }
        }
        setup() {
            if (viewport.w > 991) {
                this.tlScHeroOffi = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.loc-hero-wrap',
                        start: `bottom-=${viewport.h} bottom`,
                        end: `bottom bottom`,
                        scrub: true,
                    }
                })
                this.tlScHeroOffi.to('.loc-hero', {scale: .8, autoAlpha: .6, duration: 1.1, ease: 'none'}, 0)
                this.tlScOffiSell = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.loc-offi-wrap',
                        start: `bottom-=${viewport.h} bottom`,
                        end: `bottom bottom`,
                        scrub: true,
                    }
                })
                this.tlScOffiSell
                .to('.loc-offi-main-stick', {scale: .8, autoAlpha: .6, duration: 1.1, ease: 'none'}, 0)
                this.tlScSellTour = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.loc-sell-wrap',
                        start: `bottom-=${viewport.h} bottom`,
                        end: `bottom bottom`,
                        scrub: true,
                    }
                })
                this.tlScSellTour
                .to('.loc-sell-stick', {scale: .8, autoAlpha: .6, duration: 1.1, ease: 'none'}, 0)
                this.tlNewsFooter = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.home-subscr-wrap',
                        start: `bottom-=${viewport.h} bottom`,
                        end: `bottom bottom`,
                        scrub: true,
                    }
                })
                this.tlNewsFooter
                .to('.home-subscr', {scale: .8, autoAlpha: .6, duration: 1.1, ease: 'none'}, 0)
            }
            if (viewport.w < 767) {
                $('.loc-hero-wrap .home-sc-block-100').css('height', '0px')
                $('.loc-offi-wrap').css('margin-top', '0px')
            }
        }
        update() {
            if (viewport.w > 991) {
                this.tlScHeroOffi.scrollTrigger.refresh()
                this.tlScOffiSell.scrollTrigger.refresh()
                this.tlNewsFooter.scrollTrigger.refresh()
            }
        }
        destroy() {
            if (viewport.w > 991) {
                this.tlScHeroOffi.kill()
                this.tlScOffiSell.kill()
                this.tlNewsFooter.kill()
            }
        }
    }
    let locSectionAnim = new LocSectionAnimate();
    // // End Location
    // // Careers
    class CarHeroAnimate {
        constructor() {
            this.tlTrigger;
            this.tlTitle;
            this.tlSub;
            this.tlSubTxt;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.car-hero',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.setup()
                    }
                }
            })
        }
        setup() {
            let titleTop = new SplitType('.car-hero-title-top', {types: 'lines, words', lineClass: 'bp-line heading-line'})
            let titleMid = new SplitType($('.car-hero-title-mid-unline-item').eq(0).get(0), {types: 'lines, words', lineClass: 'bp-line'})
            let titleBot = new SplitType('.car-hero-title-bot', {types: 'lines, words', lineClass: 'bp-line'})
            let title = [...titleTop.words, ...titleMid.words, ...titleBot.words];
            this.tlTitle = gsap.timeline({
                paused: true,
                onComplete() {
                    titleTop.revert()
                    SplitType.create('.car-hero-title-top', {types: 'lines', lineClass: 'heading-line'})
                    titleMid.revert()
                    titleBot.revert()
                    clearProps('.car-hero-img-wrap')
                    clearProps('.car-hero-img')
                }
            })
            this.tlTitle
            .from(title, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .06})
            .from('.car-hero-title .line-grad', {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, '>=-.3')
            setupLinkReveal(this.tlTitle, '.car-hero-title-wrap .txt-link-wrap .txt', '.car-hero-title-wrap .txt-link-wrap .ic-embed', '.car-hero-title-wrap .txt-link-wrap .txt-link-line', '.2')

            $('.car-hero-img-wrap').css({
                'overflow': 'hidden',
                'background-color': 'transparent',
            })
            $('.car-hero-img').css({
                'clip-path': 'polygon(-1% 102%, -1% var(--col-1), 25% var(--col-1), 25% 102%, 25% var(--col-2), 50% var(--col-2), 50% 102%, 50% var(--col-3), 75% var(--col-3), 75% 102%, 75% var(--col-4), 101% var(--col-4), 101% 102%)',
                '--col-1': '100%',
                '--col-2': '100%',
                '--col-3': '100%',
                '--col-4': '100%',
            })
            let dur = 1.2;
            let delay = .1;
            this.tlTitle
            .from($('.car-hero-img').find('img').get(0), {scale: 1.4, duration: dur, ease: 'power1.out'}, .4)
            .to('.car-hero-img', {'--col-1': '0%', duration: dur, ease: 'power1.out'}, '<=0')
            .to('.car-hero-img', {'--col-2': '0%', duration: dur - delay, ease: 'power1.out'}, `<=${delay}`)
            .to('.car-hero-img', {'--col-3': '0%', duration: dur - delay * 2, ease: 'power1.out'}, `<=${delay}`)
            .to('.car-hero-img', {'--col-4': '0%', duration: dur - delay * 3, ease: 'power1.out'}, `<=${delay}`)

            let subLabel = new SplitType('.car-hero-label-txt', {types: 'lines, words', lineClass: 'bp-line'})
            let subTitle = new SplitType('.car-hero-label-title', {types: 'lines, words', lineClass: 'bp-line'}

            )
            this.tlSub = gsap.timeline({
                scrollTrigger: {
                    trigger: '.car-hero-label-wrap',
                    start: 'top top+=80%',
                    once: true,
                },
                onComplete() {
                    subLabel.revert()
                    subTitle.revert()
                }
            })
            this.tlSub
            .from(subLabel.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
            .from(subTitle.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')

            this.tlSubTxt = gsap.timeline({
                scrollTrigger: {
                    trigger: '.car-hero-sub-wrap',
                    start: 'top top+=80%',
                    once: true,
                }
            })
            let allSubTxts = $('.car-hero-sub-txt')
            allSubTxts.each((idx, el) => {
                let subTxt = new SplitType(el, {types: 'lines, words', lineClass: 'bp-line'})
                this.tlSubTxt
                .from(subTxt.words, {autoAlpha: 0, yPercent: 80, duration: .4, stagger: .016, onComplete: () => {
                    subTxt.revert()
                }}, idx * .2 + .2)
            })

        }
        play() {
            this.tlTitle.play()
        }
    }
    let carHeroAnim = new CarHeroAnimate();
    class CarTestiAnimate {
        constructor() {
            this.tlTrigger;
            this.tlInfo;
            this.tlQuote;
            this.tlQuoteScrub;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.car-testi',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.setup()
                    }
                }
            })
        }
        setup() {
            setupImgReveal('.car-testi-info-item-img-wrap', '.car-testi-info-item-img')

            let infoName = new SplitType('.car-testi-info-item-name', {types: 'lines, words', lineClass: 'bp-line'})
            let infoPos = new SplitType('.car-testi-info-item-job', {types: 'lines, words', lineClass: 'bp-line'})
            this.tlInfo = gsap.timeline({
                scrollTrigger: {
                    trigger: '.car-testi-info-item-info-inner',
                    start: 'top top+=45%',
                    once: true,
                }
            })
            this.tlInfo
            .from(infoName.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
            .from(infoPos.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')

            let quote = new SplitType('.car-testi-quote-txt', {types: 'lines, words', lineClass: 'bp-line heading-line'})
            gsap.set(quote.lines, {display: 'inline-block', width: 'auto'})
            this.tlQuote = gsap.timeline({
                scrollTrigger: {
                    trigger: '.car-testi-quote-wrap',
                    start: 'top top+=45%',
                    once: true,
                }
            })
            this.tlQuote
            .from(quote.words, {autoAlpha: 0, yPercent: 80, duration: .4, stagger: .02})

            this.tlQuoteScrub = gsap.timeline({
                scrollTrigger: {
                    trigger: '.car-testi-quote-wrap',
                    start: 'top top+=65%',
                    end: 'bottom top+=45%',
                    scrub: true,
                }
            })
            this.tlQuoteScrub
            .to(quote.words, {color: '#222222', duration: 1, stagger: .4, ease: 'none'})

            setupCurtain('.sc-cur-car-testi-offi', 'var(--white)', 'var(--bg-lm-li-grey)')
        }
    }
    let carTestiAnim = new CarTestiAnimate();
    class CarOffiAnimate {
        constructor() {
            this.tlTrigger;
            this.tlTitle;
            this.tlImgScrub;
            this.allImgItems;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.car-offi',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        if (viewport.w > 991) {
                            this.interaction()
                        }
                        this.setup()
                    }
                }
            })
        }
        setup() {
            let label = new SplitType('.car-offi-label', {types: 'lines, words', lineClass: 'bp-line'})
            let titleTop = new SplitType('.car-offi-title-top', {types: 'lines, words', lineClass: 'bp-line heading-line'})
            let titleBotLeft = new SplitType('.car-offi-title-bot-left', {types: 'lines, words', lineClass: 'bp-line'})
            let titleBotMid = new SplitType($('.car-offi-title-bot-unline-item').eq(0).get(0), {types: 'lines, words', lineClass: 'bp-line'})
            let titleBotRight = new SplitType('.car-offi-title-bot-right', {types: 'lines, words', lineClass: 'bp-line'})
            let title = [...titleTop.words, ...titleBotLeft.words, ...titleBotMid.words, ...titleBotRight.words];
            let sub = new SplitType('.car-offi-sub', {types: 'lines, words', lineClass: 'bp-line'})

            this.tlTitle = gsap.timeline({
                scrollTrigger: {
                    trigger: '.car-offi-title',
                    start: 'top top+=65%',
                    once: true,
                },
                onComplete: () => {
                    label.revert()
                    titleTop.revert()
                    titleBotLeft.revert()
                    titleBotMid.revert()
                    titleBotRight.revert()
                    sub.revert()
                }
            })
            this.tlTitle
            .from(label.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
            .from(title, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')
            .from('.car-offi-title .line-grad', {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, '>=-.3')
            .from(sub.words, {autoAlpha: 0, yPercent: 80, duration: .4, stagger: .016}, .6)
            setupLinkReveal(this.tlTitle, '.car-offi-title-wrap .txt-link-wrap .txt', '.car-offi-title-wrap .txt-link-wrap .ic-embed', '.car-offi-title-wrap .txt-link-wrap .txt-link-line', '<=.2')

            if (viewport.w > 991) {
                let allItems = $('.car-offi-item');
                this.tlImgScrub = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.car-offi',
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    }
                })
                allItems.each((idx, el) => {
                    setupImgReveal($(el).find('.car-offi-item-img-wrap').get(0), $(el).find('.car-offi-item-img').get(0))
                    this.tlImgScrub
                    .fromTo(el, {yPercent: 40}, {yPercent: -20, duration: 1, ease: 'none'}, 0)
                })
            }
        }
        interaction() {
            this.allImgItems = $('.car-offi-item');
            requestAnimationFrame(this.updateCursor.bind(this))
        }
        updateCursor() {
            if (cursor.isUserMoved() || load.isDoneLoading()) {
                if ($('.car-offi-stick').length ) {
                    if (isInViewport('.car-offi-stick')) {
                        this.allImgItems.each((idx, el) => {
                            let targetInnerX = xGetter($(el).find('.car-offi-item-inner').get(0));
                            let targetInnerY = yGetter($(el).find('.car-offi-item-inner').get(0));
                            if (Math.abs(pointer.xNor * $(el).width() * .2 * $(el).width() * .2 - targetInnerX) > 2 && isInViewport('.car-offi-stick')) {
                                xSetter($(el).find('.car-offi-item-inner').get(0))(lerp(targetInnerX, pointer.xNor * $(el).width() * .2, 0.02))
                                ySetter($(el).find('.car-offi-item-inner').get(0))(lerp(targetInnerY, pointer.yNor * $(el).height() * .2, 0.02))
                            }
                        })
                    }
                }
            }
            
            if ($('.car-offi-stick').length) {
                requestAnimationFrame(this.updateCursor.bind(this))
            } else {
                cancelAnimationFrame(this.updateCursor.bind(this))
            }
        }
    }
    let carOffiAnim = new CarOffiAnimate();
    class CarPerkAnimate {
        constructor() {
            this.tlTrigger;
            this.tlTitle;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.car-perk',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.interaction()
                        this.setup()
                    }
                }
            })
        }
        setup() {
            let label = new SplitType('.car-perk-label', {types: 'lines, words', lineClass: 'bp-line'})
            let titleTop = new SplitType('.car-perk-title-top', {types: 'lines, words', lineClass: 'bp-line heading-line'})
            let titleBotLeft = new SplitType('.car-perk-title-bot-left', {types: 'lines, words', lineClass: 'bp-line heading-line'})
            let titleBotRight = new SplitType($('.car-perk-title-bot-unline-item').eq(0).get(0), {types: 'lines, words', lineClass: 'bp-line'})
            let title = [...titleTop.words, ...titleBotLeft.words, ...titleBotRight.words];
            this.tlTitle = gsap.timeline({
                scrollTrigger: {
                    trigger: '.car-perk-title',
                    start: 'top top+=65%',
                    once: true,
                },
                onComplete: () => {
                    label.revert()
                    titleTop.revert()
                    titleBotLeft.revert()
                    titleBotRight.revert()
                }
            })
            this.tlTitle
            .from(label.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
            .from(title, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')
            .from('.car-perk-title .line-grad', {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, '>=-.3')

            let allItems = $('.loc-tour-main-item');
            allItems.each((idx, el) => {
                let number = new SplitType($(el).find('.loc-tour-main-item-num').get(0), {types: 'lines, chars', lineClass: 'bp-line'})
                let title = new SplitType($(el).find('.loc-tour-main-item-title').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                let tlItem = gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        start: 'top top+=75%',
                        once: true,
                        onComplete() {
                            number.revert()
                            title.revert()
                        }
                    }
                })
                tlItem
                .from($(el).find('.loc-tour-main-item-link'), {autoAlpha: 0, yPercent: 20, duration: .3, clearProps: 'all'}, idx % 2 == 0 ? 0 : .1)
                .from(number.chars, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')
                .from(title.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')
            })
        }
        interaction() {
            $('.loc-tour-main-item-num').each((idx, el) => {
                el.innerHTML = `0${idx + 1}`
            })
            $('.loc-tour-main-item-link').on('click', function(e) {
                e.preventDefault();
                if (isTouchDevice()) {
                    $('.loc-tour-main-item-link').removeClass('active')
                    $(this).addClass('active')
                }
            })
        }
    }
    let carPerkAnim = new CarPerkAnimate();
    class CarJobAnimate {
        constructor() {
            this.tlTrigger;
            this.tlTitle;
            this.tlSub;
            this.tlList;
            this.tlLoadBtn;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-job',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.interaction()
                        this.setFilter()
                        requestAnimationFrame(() => {
                            this.setup()
                        })
                        
                    }
                }
            })
        }
        setup() {
            console.log('carJob setup')
            let titleLabel = new SplitType('.car-job-label', {types: 'lines, words', lineClass: 'bp-line'})
            let titleTopLeft = new SplitType('.car-job-title .car-job-title-top-left', {types: 'lines, words', lineClass: 'bp-line'})
            let titleTopRight = new SplitType('.car-job-title .car-job-title-top-right', {types: 'lines, words', lineClass: 'bp-line'})
            let titleTopMid = new SplitType('.car-job-title  .car-job-title-top-unline-item', {types: 'lines, words', lineClass: 'bp-line'})
            let titleBot = new SplitType('.car-job-title .car-job-title-bot', {types: 'lines, words', lineClass: 'bp-line'})
            let titleWords = [...titleTopLeft.words, ...titleTopMid.words, ...titleTopRight.words, ...titleBot.words];
            this.tlTitle = gsap.timeline({
                scrollTrigger: {
                    trigger: '.car-job-title-wrap',
                    start: 'top top+=65%',
                    once: true,
                },
                onComplete() {
                    titleLabel.revert()
                    titleTopLeft.revert()
                    titleTopRight.revert()
                    titleTopMid.revert()
                    titleBot.revert()
                }
            })
            this.tlTitle
            .from(titleLabel.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
            .from(titleWords, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')
            .from('.car-job-title .line-grad', {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, '>=-.3')

            let subText = new SplitType('.car-job-sub', {types: 'lines, words', lineClass: 'bp-line'})
            this.tlSub = gsap.timeline({
                scrollTrigger: {
                    trigger: '.car-job-sub',
                    start: 'top top+=65%',
                    once: true,
                },
                onComplete() {
                    subText.revert()
                }
            })
            this.tlSub
            .from(subText.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
            let allFilters = $('.car-job-filter-grp')
            allFilters.each((idx, el) => {
                let filterLabel = new SplitType($(el).find('.car-job-filter-label').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                let filterVal = new SplitType($(el).find('.car-job-filter-val').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                let filterHead = [...filterLabel.words, ...filterVal.words];
                this.tlSub
                .from(filterHead, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04, onComplete: () => {
                    filterLabel.revert()
                    filterVal.revert()
                }}, `<=${idx * .2}`)
            })

            this.tlList = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-job-main-wrap',
                    start: 'top top+=65%',
                    once: true,
                },
            })
            const btn = new SplitType('.car-job-btn-wrap .btn .txt-btn', {types: 'lines, words', lineClass: 'bp-line'})
            let allItems = $('.home-job-main-item:not(.load-hidden):not(.filter-hidden-depart):not(.filter-hidden-loc)')
            allItems.each((idx, el) => {
                let title = new SplitType($(el).find('.home-job-main-item-title').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                let descRole = new SplitType($(el).find('.home-job-main-item-desc:not(.mod-loc) .home-job-main-item-desc-txt').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                let descLoc = new SplitType($(el).find('.home-job-main-item-desc.mod-loc .home-job-main-item-desc-txt').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                let descRoleArr = [$(el).find('.home-job-main-item-desc:not(.mod-loc) .ic-embed'), ...descRole.words];
                let descLocArr = [$(el).find('.home-job-main-item-desc.mod-loc .ic-embed'), ...descLoc.words];
                this.tlList
                .from($('.home-job-main-bg-inner-item-line-top').eq(idx), {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, `${ .2 + idx * .2}`)
                .from(title.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04, onComplete() {
                    title.revert()
                }}, '<=.1')
                .from(descRoleArr, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.1')
                .from(descLocArr, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04, onComplete() {
                    descRole.revert()
                    descLoc.revert()
                }}, '<=.1')
                if (idx == allItems.length - 1) {
                    this.tlList
                    .from($('.home-job-main-bg-inner-item-line-bot').eq(idx), {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, `<=.1`)
                }
            })
            this.tlList
            .from(btn.words, {autoAlpha: 0, yPercent: 100, duration: .4, stagger: .06}, '<=.2')
            .from('.car-job-btn-wrap .btn .btn-bg', {autoAlpha: 0, duration: .4, width: '80%', height: '80%', ease: 'power2.out', clearProps: 'all'}, '<=.1')
        }
        resize() {
            $('.home-job-main-item').each((idx, el) => {
                let height = $(el).height();
                $('.home-job-main-bg-inner-item').eq(idx).css({
                    'height': height,
                    'flex': 'none'
                })
            })
        }
        interaction() {
            function homeJobActive(index) {
                let posVal;
                let height;
                if (index == -1) {
                    posVal = '-101%';
                    height = $('.home-job-main-item').eq(0).height();
                } else if (index == $('.home-job-main-item:not(.load-hidden):not(.filter-hidden-depart):not(.filter-hidden-loc)').length) {
                    posVal = `${$('.home-job-main-bg-inner-cms').height() + 10}px`;
                    height = $('.home-job-main-item:not(.load-hidden):not(.filter-hidden-depart):not(.filter-hidden-loc)').eq($('.home-job-main-item:not(.load-hidden):not(.filter-hidden-depart):not(.filter-hidden-loc)').length - 1).height();
                } else {
                    posVal = `${$('.home-job-main-item:not(.load-hidden):not(.filter-hidden-depart):not(.filter-hidden-loc)').eq(index).offset().top - $('.home-job-main-bg-inner-cms').offset().top}px`;
                    height = $('.home-job-main-item:not(.load-hidden):not(.filter-hidden-depart):not(.filter-hidden-loc)').eq(index).height();
                }
                $('.home-job-main-bg-el').css({
                    'height': height,
                    'transform': `translateY(${posVal})`
                })
            }
            this.resize()
            $(window).on('resize', this.resize);
            let lastActive = 0
            $('.home-job-main-item-inner').on('pointerenter', function(e) {
                let activeIndex = Array.prototype.indexOf.call($('.home-job-main-item:not(.load-hidden):not(.filter-hidden-depart):not(.filter-hidden-loc)'), $(this).closest('.home-job-main-item').get(0))
                if(viewport.w > 991){
                    $('.home-job-main-item-inner').removeClass('active')
                    $(this).addClass('active')
                    homeJobActive(activeIndex)
                }
                lastActive = activeIndex;
            })
            if(viewport.w > 991){
                $('.home-job-main-list').on('pointerleave', function(e) {
                    $('.home-job-main-item-inner').removeClass('active')
                    if ((pointer.y < this.getBoundingClientRect().height / 2 + this.getBoundingClientRect().top)) {
                        homeJobActive(-1)
                    } else {
                        homeJobActive($('.home-job-main-item:not(.load-hidden):not(.filter-hidden-depart):not(.filter-hidden-loc)').length)
                    }
                })
            }
        }
        setFilter() {
            let allFilterGrps = $('.car-job-filter-grp');
            allFilterGrps.each((idx, el) => {
                let grpType = $(el).attr('data-filter-grp');
                let allFilterItems = $('.home-job-main-list').find(`[data-filter-${grpType}]`);
                let allVals = [];
                allFilterItems.each((idx, el) => {
                    let val = $(el).attr(`data-filter-${grpType}`);
                    if (!allVals.includes(val)) {
                        allVals.push(val)
                    }
                })
                let filterItemTemp = $(el).find('.car-job-filter-drop-item').eq(0).clone().removeClass('active');
                $(el).find('.car-job-filter-drop-inner').html('')
                let filterItemAll = filterItemTemp.clone().addClass('active');
                filterItemAll.find('.car-job-filter-drop-item-txt').text('All')
                filterItemAll.attr('data-filter', '*')
                filterItemAll.appendTo($(el).find('.car-job-filter-drop-inner'))
                allVals.forEach((val, idx) => {
                    let filterItem = filterItemTemp.clone();
                    filterItem.find('.car-job-filter-drop-item-txt').text(val)
                    filterItem.attr('data-filter', val)
                    filterItem.appendTo($(el).find('.car-job-filter-drop-inner'))
                })
            })
            let allJobItems = $('.home-job-main-item');
            let allJobBgItems = $('.home-job-main-bg-inner-item');
            allJobItems.each((idx, el) => {
                let height = $(el).outerHeight(true);
                allJobBgItems.eq(idx).css({
                    'height': height,
                    'flex': 'none'
                })
            })
            let allFilterItems = $('.car-job-filter-drop-item');

            function projListUpdateFilter(target, kind) {
                if ($(target).hasClass('active')) {
                    return
                }
                $(target).closest('.car-job-filter-drop').find('.car-job-filter-drop-item').removeClass('active')
                $(target).addClass('active')

                let type = $(target).attr('data-filter')
                let originalWidth = $(target).closest('.car-job-filter-grp').find('.car-job-filter-val').width()
                $(target).closest('.car-job-filter-grp').find('.car-job-filter-val').text($(target).find('.txt').text())
                let newWidth = $(target).closest('.car-job-filter-grp').find('.car-job-filter-val').width()
                gsap.set($(target).closest('.car-job-filter-grp').find('.car-job-filter-val'), {width: originalWidth, overflow: 'hidden'})
                gsap.to($(target).closest('.car-job-filter-grp').find('.car-job-filter-val'), {width: newWidth, duration: .3, clearProps: 'all', onComplete: () => {
                    $('.car-job-filter-head').removeClass('animating')
                }})

                gsap.to('.home-job-main-wrap', {autoAlpha: 0, duration: .3, onComplete: () => {
                    if (type === '*') {
                        allJobItems.removeClass(`filter-hidden-${kind}`)
                        allJobBgItems.removeClass(`filter-hidden-${kind}`)
                    } else {
                        allJobItems.each((idx, el) => {
                            if ($(el).find(`[data-filter-${kind}]`).text().includes(type)) {
                                $(el).removeClass(`filter-hidden-${kind}`)
                                allJobBgItems.eq(idx).removeClass(`filter-hidden-${kind}`)
                            } else {
                                $(el).addClass(`filter-hidden-${kind}`)
                                allJobBgItems.eq(idx).addClass(`filter-hidden-${kind}`)
                            }
                        })
                    }
                    projListLoadmore()
                    gsap.to('.home-job-main-wrap', {autoAlpha: 1, duration: .3, delay: .1})
                }})
            }

            let itemsLimits = 6;
            function projListLoadmore() {
                let allItems = $('.home-job-main-item:not(.filter-hidden-depart):not(.filter-hidden-loc)');
                let allBgItems = $('.home-job-main-bg-inner-item:not(.filter-hidden-depart):not(.filter-hidden-loc)');
                let newCount = $('.home-job-wrap').find('[data-job-count]').text().replace(/\d+/g, allItems.length)
                $('.home-job-wrap').find('[data-job-count]').text(newCount)
                allItems.removeClass('load-hidden')
                allBgItems.removeClass('load-hidden')
                allItems.each((idx, el) => {
                    if ((idx + 1) > itemsLimits) {
                        $(el).addClass('load-hidden')
                        allBgItems.eq(idx).addClass('load-hidden')
                    }
                })
                if ($('.home-job-main-item.load-hidden:not(.filter-hidden-depart):not(.filter-hidden-loc)').length == 0) {
                    $('.car-job-btn-wrap').addClass('hidden')
                } else {
                    $('.car-job-btn-wrap').removeClass('hidden')
                }
                if ($('.home-job-main-item:not(.load-hidden):not(.filter-hidden-depart):not(.filter-hidden-loc)').length == 0) {
                    $('.home-job-main-empty-wrap').addClass('active')
                    $('.home-job-main-bg-el').addClass('on-empty')
                } else {
                    $('.home-job-main-empty-wrap').removeClass('active')
                    $('.home-job-main-bg-el').removeClass('on-empty')
                }
                // if ($('.home-job-main-item.load-hidden:not(.filter-hidden-depart)').length == 0) {
                //     $('.car-job-btn-wrap .btn').addClass('hidden')
                // }
                carSectionAnim.update()
            }
            $('.car-job-btn-wrap .btn').on('click', function(e) {
                e.preventDefault();
                let allHiddenItems = $('.home-job-main-item.load-hidden:not(.filter-hidden-depart)');
                let allHiddenBgItems = $('.home-job-main-bg-inner-item.load-hidden:not(.filter-hidden-depart)');
                allHiddenItems.each((idx, el) => {
                    if ((idx + 1) <= itemsLimits) {
                        $(el).css('display','none');
                        $(el).removeClass('load-hidden');
                        $(el).slideDown('slow', () => {
                            gsap.set(el, {clearProps: 'all'})
                        })
                        allHiddenBgItems.eq(idx).css('display','none');
                        allHiddenBgItems.eq(idx).removeClass('load-hidden');
                        allHiddenBgItems.eq(idx).slideDown('slow', () => {
                            // gsap.set(allHiddenBgItems.eq(idx), {clearProps: 'all'})
                        })
                    }
                })
                if ($('.home-job-main-item.load-hidden:not(.filter-hidden-depart):not(.filter-hidden-loc)').length == 0) {
                    $('.car-job-btn-wrap').addClass('hidden')
                } else {
                    $('.car-job-btn-wrap').removeClass('hidden')
                }
            })

            $('.car-job-filter-head').on('click', function(e) {
                e.preventDefault();
                if ($(this).hasClass('animating')) {return}
                $(this).addClass('animating')
                if ($(this).closest('.car-job-filter-grp').hasClass('active')) {
                    $('.car-job-filter-grp').removeClass('active')
                    $('.car-job-filter-drop').removeClass('open')
                } else {
                    $('.car-job-filter-grp').removeClass('active')
                    $('.car-job-filter-drop').removeClass('open')
                    $(this).closest('.car-job-filter-grp').addClass('active')
                    $(this).closest('.car-job-filter-grp').find('.car-job-filter-drop').addClass('open')
                }
            })

            allFilterItems.on('click', function(e) {
                e.preventDefault();
                let kind = $(this).closest('.car-job-filter-grp').attr('data-filter-grp')
                projListUpdateFilter(this, kind)
                
                $('.car-job-filter-grp').removeClass('active')
                $('.car-job-filter-drop').removeClass('open')
            })

            requestAnimationFrame(() => {
                projListLoadmore()
            })
        }
        destroy() {
            $(window).off('resize', this.resize);
        }
    }
    let carJobAnim = new CarJobAnimate();
    class CarFaqAnimate {
        constructor() {
            this.tlTrigger;
            this.tlTitle;
            this.tlSub;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.car-faq',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.interaction()
                        this.setup()
                    }
                }
            })
        }
        setup() {
            gsap.set('.car-faq-sub-txt', {display: 'contents'})
            let originalSub = $('.car-faq-sub-wrap').html();
            let label = new SplitType('.car-faq-label', {types: 'lines, words', lineClass: 'bp-line'})
            let title = new SplitType('.car-faq-title', {types: 'lines, words', lineClass: 'bp-line heading-line'})
            let subTxt = new SplitType('.car-faq-sub-txt', {types: 'lines, words', lineClass: 'bp-line'})
            requestAnimationFrame(() => {
                $('.car-faq-sub-txt-link').appendTo('.car-faq-sub-txt .bp-line:last-child')
            })
            let sub = [...subTxt.words, $('.car-faq-sub-wrap .txt-link-comp').get(0)];
            gsap.set('.car-faq-sub-wrap .txt-link-inner', {overflow: 'hidden'})

            this.tlTitle = gsap.timeline({
                scrollTrigger: {
                    trigger: '.car-faq-title-wrap',
                    start: 'top top+=65%',
                    once: true,
                },
                onComplete: () => {
                    SplitType.revert('.car-faq-label')
                    SplitType.revert('.car-faq-title')
                    SplitType.create('.car-faq-title', {types: 'lines', lineClass: 'heading-line'})
                    $('.car-faq-sub-wrap').html(originalSub)
                }
            })
            this.tlTitle
            .from(label.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
            .from(title.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')
            .from(sub, {autoAlpha: 0, yPercent: 80, duration: .4, stagger: .016}, '<=.2')
            .from('.car-faq-title-wrap .txt-link-line', {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, '>=-.3')

            let allItems = $('.car-faq-main-item');
            
            allItems.each((idx, el) => {
                let headTxt = new SplitType($(el).find('.car-faq-main-item-head-txt').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                let iconWrap = $(el).find('.car-faq-main-item-head-ic')
                let icon = $(el).find('.car-faq-main-item-head-ic .ic-embed')
                let tlItem = gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        start: 'top top+=75%',
                        once: true,
                    },
                    onComplete: () => {
                        headTxt.revert()
                    }
                })
                tlItem
                .from(headTxt.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
                .from(iconWrap, {autoAlpha: 0, scale: .8, duration: .6, clearProps: 'all'}, '<=.2')
                .from(icon, {autoAlpha: 0, scale: 1.25, duration: .6, clearProps: 'all'}, '<=0')
                .from($(el).find('.car-faq-main-item-body-line-active').get(0), {scaleX: 0, transformOrigin: 'left', duration: .6, clearProps: 'all'}, '<=.2')
                .from($(el).find('.car-faq-main-item-body-line').get(0), {scaleX: 0, transformOrigin: 'left', duration: .6, clearProps: 'all'}, '<=0')
                if(idx == allItems.length - 1 && viewport.w < 991){
                    tlItem.from('.car-faq-main-more-label',{autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
                    setupLinkReveal(tlItem, '.car-faq-main-more .txt-link-wrap .txt', '.car-faq-main-more .txt-link-wrap .ic-embed', '.car-faq-main-more .txt-link-wrap .txt-link-line', '<=.2')
                }
            })

        }
        interaction() {
            let offsetTop = (viewport.h - $('.car-faq-title-wrap').outerHeight(true)) / 2;
            gsap.set('.car-faq-title-wrap', {top: offsetTop})
            let allFaqs = $('.car-faq-main-item-head');
            allFaqs.on('click', function(e) {
                e.preventDefault();
                if ($(this).closest('.car-faq-main-item').hasClass('active')) {
                    $(this).closest('.car-faq-main-item').find('.car-faq-main-item-body-inner').slideUp({complete: () => {
                        carSectionAnim.update()
                    }});
                    $(this).closest('.car-faq-main-item').removeClass('active').removeClass('active');
                } else {
                    $('.car-faq-main-item.active .car-faq-main-item-body-inner').slideUp({complete: () => {
                        carSectionAnim.update()
                    }});
                    $(this).closest('.car-faq-main-item').find('.car-faq-main-item-body-inner').slideDown();
                    $(this).closest('.car-faq-main-item').addClass('active').siblings().removeClass('active');
                }
            })
        }
    }
    let carFaqAnim = new CarFaqAnimate();
    class CarSectionAnimate {
        constructor() {
            if (viewport.w > 991) {
                this.tlScHeroTesti;
                this.tlOffiPerk;
                this.tlScPerkJob;
                this.tlNewsFooter;    
            }
        }
        setup() {
            if (viewport.w > 991) {
                this.tlOffiPerk = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.car-offi-wrap',
                        start: `bottom-=${viewport.h} bottom`,
                        end: `bottom bottom`,
                        scrub: true,
                    }
                })
                this.tlOffiPerk.to('.car-offi .car-offi-stick', {scale: .8, autoAlpha: .6, duration: 1.1, ease: 'none'}, 0)
                this.tlScHeroTesti = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.car-hero-wrap',
                        start: `bottom-=${viewport.h} bottom`,
                        end: `bottom bottom`,
                        scrub: true,
                    }
                })   
                this.tlScHeroTesti.to('.car-hero .container', {scale: .8, autoAlpha: .6, duration: 1.1, ease: 'none'}, 0)
                this.tlScPerkJob = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.car-perk-wrap',
                        start: `bottom-=${viewport.h} bottom`,
                        end: `bottom bottom`,
                        scrub: true,
                    }
                })   
                this.tlScPerkJob.to('.car-perk .container', {scale: .8, autoAlpha: .6, duration: 1.1, ease: 'none'}, 0)
                this.tlNewsFooter = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.home-subscr-wrap',
                        start: `bottom-=${viewport.h} bottom`,
                        end: `bottom bottom`,
                        scrub: true,
                    }
                })
                this.tlNewsFooter.to('.home-subscr', {scale: .8, autoAlpha: .6, duration: 1.1, ease: 'none'}, 0)
            }
        }
        update() {
            if (viewport.w > 991) {
                this.tlScHeroTesti.scrollTrigger.refresh()
                this.tlOffiPerk.scrollTrigger.refresh()
                this.tlScPerkJob.scrollTrigger.refresh()
                this.tlNewsFooter.scrollTrigger.refresh()    
            }
        }
        destroy() {
            if (viewport.w > 991) {
                this.tlScHeroTesti.kill()
                this.tlOffiPerk.kill()
                this.tlScPerkJob.kill()
                this.tlNewsFooter.kill()   
            }
        }
    }
    let carSectionAnim = new CarSectionAnimate();
    // // End Careers
    
    // // Career Detail
    class CardtllHeroAnimate {
        constructor() {
            this.tlTitle;
        }
        setup() {
            let title = new SplitType('.cardtl-hero-title', {types: 'lines, words', lineClass: 'bp-line heading-line'})
            
            this.tlTitle = gsap.timeline({
                paused: true,
                onComplete: () => {
                    
                }
            })
            this.tlTitle
            .from(title.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
            .from('.line.cardtl-hero-line', {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, '<=.2')
            let allDescItems = $('.cardtl-hero-item-desc')
            allDescItems.each((idx, el) => {
                let descTxt = new SplitType($(el).find('.cardtl-hero-item-desc-txt').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                let descItemArr = [$(el).find('.ic-embed'), ...descTxt.words];
                this.tlTitle
                .from(descItemArr, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04, onComplete() {
                    clearProps($(el).find('.ic-embed').get(0))
                    descTxt.revert()
                }}, `<=${idx * .2}`)
            })

            let allBtns = $('.cardtl-hero-acts .btn-stage')
            allBtns.each((idx, el) => {
                let btnTxt = new SplitType($(el).find('.btn .txt-btn').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                this.tlTitle
                .from(btnTxt.words, {autoAlpha: 0, yPercent: 100, duration: .4, stagger: .04}, `<=${idx * .1}`)
                .from($(el).find('.btn-bg').get(0), {autoAlpha: 0, duration: .8, width: '80%', height: '80%', ease: 'power2.out', clearProps: 'all', onComplete: () => {
                    btnTxt.revert()
                }}, '<=.1')
            })
            if ('.cardtl-hero-acts .btn-stage.hidden-dk'){
                $('.cardtl-hero-acts .btn-stage.hidden-dk .cardtl-hero-acts-btn-share-ic,.cardtl-hero-acts .btn-stage.hidden-dk .cardtl-hero-acts-btn-share-txt').css('overflow','hidden')
                this.tlTitle
                .from('.cardtl-hero-acts .btn-stage.hidden-dk .cardtl-hero-acts-btn-share-ic', {autoAlpha: 0, duration: .6}, '<=.4')
                .from('.cardtl-hero-acts .btn-stage.hidden-dk .cardtl-hero-acts-btn-share-txt', {autoAlpha: 0, duration: .6, clearProps:'all'}, '<0')
            }
            setupLinkReveal(this.tlTitle, '.cardtl-hero-link-wrap .txt-link-wrap .txt', '.cardtl-hero-link-wrap .txt-link-wrap .ic-embed', '.cardtl-hero-link-wrap .txt-link-wrap .txt-link-line', '.2')
        }
        play() {
            this.tlTitle.play()
        }
    }
    let cardtlHeroAnim = new CardtllHeroAnimate();
    class CardtlMainAnimate {
        constructor() {
            this.tlTrigger;
            this.marqueeSpeed = {value: 1};
            this.tlFirstRictxt;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.cardtl-main',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.interaction()
                        this.setup()
                    }
                }
            })
        }
        setup() {
            let allBlocks = $('.cardtl-main-block');
            allBlocks.each((idx, el) => {
                if (idx == 0) {
                    let headTxt = new SplitType($(el).find('.cardtl-main-head-txt').get(0), {types: 'lines, words', lineClass: 'bp-line heading-line'})
                    this.tlFirstRictxt = gsap.timeline({
                        paused: true
                    })
                    this.tlFirstRictxt
                    .from(headTxt.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})

                    let allRictxtEls = $(el).find('.cardtl-main-body-rictxt > *')
                    allRictxtEls.each((idx, el) => {
                        if ($(el).get(0).tagName == 'P') {
                            replaceHyphenWithSpan(el)
                            let rictxt = new SplitType(el, {types: 'lines, words', lineClass: 'bp-line'})
                            this.tlFirstRictxt
                            .from(rictxt.words, {autoAlpha: 0, yPercent: 80, duration: .4, stagger: .016, onComplete() {
                                rictxt.revert()
                            }}, '<=.2')
                        } else if ($(el).get(0).tagName == 'UL') {
                            replaceHyphenWithSpan($(el).find('li'))
                            let allLiEls = $(el).find('li');
                            allLiEls.each((idx, li) => {
                                let liEl = new SplitType(li, {types: 'lines, words', lineClass: 'bp-line'})
                                this.tlFirstRictxt
                                .from(li, {'--li-color': 'rgba(34,34,34,0)', duration: .6}, `${idx * .2}`)
                                .from(liEl.words, {autoAlpha: 0, yPercent: 80, duration: .4, stagger: .016, onComplete() {
                                    liEl.revert()
                                }}, '<=0')
                            })
                        }
                    })
                    
                    this.tlFirstRictxt
                    .from($(el).find('.cardtl-main-block-line'), {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, '<=.2')
                } else {
                    replaceHyphenWithSpan($(el).find('li'))
                    let headTxt = new SplitType($(el).find('.cardtl-main-head-txt').get(0), {types: 'lines, words', lineClass: 'bp-line heading-line'})
                    let tlBlock = gsap.timeline({
                        scrollTrigger: {
                            trigger: el,
                            start: 'top top+=75%',
                            once: true,
                            onComplete() {
                                headTxt.revert()
                            }
                        }
                    })
                    tlBlock
                    .from(headTxt.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})

                    let allRictxtEls = $(el).find('.cardtl-main-body-rictxt > *')
                    allRictxtEls.each((idx, el) => {
                        if ($(el).get(0).tagName == 'P') {
                            let rictxt = new SplitType(el, {types: 'lines, words', lineClass: 'bp-line'})
                            tlBlock
                            .from(rictxt.words, {autoAlpha: 0, yPercent: 80, duration: .4, stagger: .016, onComplete() {
                                rictxt.revert()
                            }}, '<=.2')
                        } else if ($(el).get(0).tagName == 'UL') {
                            let allLiEls = $(el).find('li');
                            allLiEls.each((idx, li) => {
                                let liEl = new SplitType(li, {types: 'lines, words', lineClass: 'bp-line'})
                                tlBlock
                                .from(li, {'--li-color': 'rgba(34,34,34,0)', duration: .6}, `${idx * .2}`)
                                .from(liEl.words, {autoAlpha: 0, yPercent: 80, duration: .4, stagger: .016, onComplete() {
                                    liEl.revert()
                                }}, '<=0')
                            })
                        }
                    })
                    
                    tlBlock
                    .from($(el).find('.cardtl-main-block-line'), {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, '<=.2')
                }
            })

            let btnTxt = new SplitType('.cardtl-main-acts .btn .txt-btn', {types: 'lines, words', lineClass: 'bp-line'})
            this.tlActs = gsap.timeline({
                scrollTrigger: {
                    trigger: '.cardtl-main-acts',
                    start: 'top top+=65%',
                    once: true,
                }
            })
            this.tlActs
            .from(btnTxt.words, {autoAlpha: 0, yPercent: 100, duration: .4, stagger: .04})
            .from('.cardtl-main-acts .btn-bg', {autoAlpha: 0, duration: .8, width: '80%', height: '80%', ease: 'power2.out', clearProps: 'all', onComplete: () => {
                btnTxt.revert()
            }}, '<=.1')
            setupLinkReveal(this.tlActs, '.cardtl-main-acts .txt-link-wrap .txt-link-comp', '.cardtl-main-acts .txt-link-wrap .ic-embed', '.cardtl-main-acts .txt-link-wrap .txt-link-line', '<=.2')
        }
        interaction() {
            $('[data-apply="share"]').on('click', function(e) {
                e.preventDefault();
                if ($(this).hasClass('copied')) {return}
                let url = window.location.href;
                copyTextToClipboard(url)
                $(this).addClass('copied')
                let orginText = $(this).find('.txt').text();
                let orginWidth = $(this).find('.txt').width();
                gsap.to($(this).find('.txt'), {autoAlpha: 0, duration: .3, onComplete: () => {
                    $(this).find('.txt').text('Copied!')
                    let newWidth = $(this).find('.txt').width();
                    gsap.set($(this).find('.txt'), {width: orginWidth, autoAlpha: 1})
                    gsap.to($(this).find('.txt'), {autoAlpha: 1, width: newWidth, duration: .3, clearProps: 'width', onComplete: () => {
                        setTimeout(() => {
                            gsap.set($(this).find('.txt'), {width: newWidth})
                            gsap.to($(this).find('.txt'), {autoAlpha: 0, duration: .3, onComplete: () => {
                                $(this).find('.txt').text(orginText)
                                gsap.to($(this).find('.txt'), {width: orginWidth, autoAlpha: 1, duration: .3, clearProps: 'all'})
                                $(this).removeClass('copied')
                                gsap.set($(this), {clearProps: 'all'})
                            }})
                        }, 1200);
                    }});
                }})
            })
            let marqueeItemTemp = $('.cardtl-main-marquee-item').eq(0).clone();
            for (let i = 0; i < 2; i++) {
                $('.cardtl-main-marquee-grp').append(marqueeItemTemp.clone())
            }
            
            $('.cardtl-main-marquee-item.txt-grad-anim').css('animation', 'none')

            const marqueeTxt = new SplitType('.cardtl-main-marquee-item.txt-grad-anim .cardtl-main-marquee-txt', { types: 'lines, words', lineClass: 'bp-line' });
            let lineWidth = $('.cardtl-main-marquee-item.txt-grad-anim .cardtl-main-marquee-txt').width()
            marqueeTxt.words.forEach((word, idx) => {
                let offsetLeft = $(word).offset().left - $(word).parent().offset().left;
                $(word).css({
                    'animation': 'none',
                    'background-size': `${lineWidth * 2}px 100%`,
                    'background-position-x': `calc(0px - ${offsetLeft}px)`
                })
                $(word).addClass('txt-grad-anim')
            })
            
            requestAnimationFrame(() => {
                this.tlMarquee = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.cardtl-main-marquee',
                        start: 'top top+=65%',
                        once: true,
                    },
                    onComplete: () => {
                        SplitType.revert('.cardtl-main-marquee-item.txt-grad-anim .cardtl-main-marquee-txt')
                        $('.cardtl-main-marquee-item.txt-grad-anim').attr('style','')
                    },
                    onStart: () => {
                        setTimeout(() => {
                            requestAnimationFrame(this.updateMarquee.bind(this))
                        }, 300);
                    }
                })
                this.tlMarquee
                .from(marqueeTxt.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}) 
            })
        }
        updateMarquee() {
            let distance = $('.cardtl-main-marquee-item').eq(0).outerWidth(true);
            let currX = xGetter($('.cardtl-main-marquee-grp').get(0));
            if (currX < -distance) {
                xSetter($('.cardtl-main-marquee-grp').get(0))(0)
            } else if (currX > 0) {
                xSetter($('.cardtl-main-marquee-grp').get(0))(-distance)
            } else {
                let currSpeed = this.marqueeSpeed.value;
                if ($('.cardtl-main-marquee:hover').length) {
                    this.marqueeSpeed.value = lerp(currSpeed, 0, .02);
                } else {
                    this.marqueeSpeed.value = lerp(currSpeed, 1, .02);
                }
                xSetter($('.cardtl-main-marquee-grp').get(0))((currX - (2 + isTouchDevice() ? 1 : lenis.velocity / 2) * this.marqueeSpeed.value))
            }
            requestAnimationFrame(this.updateMarquee.bind(this))
        }
        play() {
            this.tlFirstRictxt.play()
        }
    }
    let cardtlMainAnim = new CardtlMainAnimate();
    class CardtlTestiAnimate {
        constructor() {
            this.tlTrigger;
            this.tlTitle;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.cardtl-testi',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.interaction()
                        this.setup()
                    }
                }
            })
        }
        setup() {
            let allSub = $('.cardtl-testi-main-item-rictxt > p');
            let infoName = new SplitType('.cardtl-testi-main-item-name', {types: 'lines, words', lineClass: 'bp-line'})
            let infoPos = new SplitType('.cardtl-testi-main-item-job', {types: 'lines, words', lineClass: 'bp-line'})
            gsap.set('.cardtl-testi-main-ic', {'overflow': 'hidden'})
            this.tlTitle = gsap.timeline({
                scrollTrigger: {
                    trigger: '.cardtl-testi-main-cms',
                    start: 'top top+=65%',
                    once: true,
                },
                onComplete: () => {
                    clearProps('.cardtl-testi-main-ic')
                }
            })
            this.tlTitle
            .from('.cardtl-testi-main-ic .ic-embed', {yPercent: 80, autoAlpha: 0, duration: .6, ease: 'power1.inOut', clearProps: 'all'})
            allSub.each((idx, el) => {
                let subTxt = new SplitType(el, {types: 'lines, words', lineClass: 'bp-line'})
                this.tlTitle
                .from(subTxt.words, {autoAlpha: 0, yPercent: 80, duration: .4, stagger: .016, onComplete() {
                    subTxt.revert()
                }}, `<=${(idx + 1) * .2}`)
            })
            this.tlTitle
            .from(infoName.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')
            .from(infoPos.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')

            setupImgReveal('.cardtl-testi-img-cms', '.cardtl-testi-img-cms .home-testi-img-item-inner')
        }
        interaction() {
            
        }
    }
    let cardtlTestiAnim = new CardtlTestiAnimate();
    class CardtlProgAnimate {
        constructor() {
            this.tlTrigger;
            this.tlTitle;
            this.tlScroll;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.cardtl-prog',
                    start: 'top bottom',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        if(viewport.w > 767){
                            this.interaction();
                        }
                        this.setup()
                    }
                }
            })
        }
        setup() {
            let label = new SplitType('.cardtl-prog-label', {types: 'lines, words', lineClass: 'bp-line'})
            let title = new SplitType('.cardtl-prog-title', {types: 'lines, words', lineClass: 'bp-line heading-line'})
            this.tlTitle = gsap.timeline({
                scrollTrigger: {
                    trigger: '.cardtl-prog-label',
                    start: 'top top+=65%',
                    once: true,
                },
                onComplete: () => {
                    label.revert()
                    title.revert()
                    SplitType.create('.cardtl-prog-title', {types: 'lines', lineClass: 'heading-line'})
                }
            })
            this.tlTitle
            .from(label.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
            .from(title.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')
            .from('.line.cardtl-prog-line', {scaleX: 0, duration: 1.2, transformOrigin: 'left', clearProps: 'transform, transform-origin'}, .2)

            let allItems = $('.cardtl-prog-main-item');
            allItems.each((idx, el) => {
                let itemNum = new SplitType($(el).find('.cardtl-prog-main-item-step').get(0), {types: 'lines, words, chars', lineClass: 'bp-line'})
                let itemTitle = new SplitType($(el).find('.cardtl-prog-main-item-title').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                let itemSub = new SplitType($(el).find('.cardtl-prog-main-item-sub').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                let tlItem = gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        start: 'left left+=75%',
                        containerAnimation: this.tlScroll,
                        once: true,
                    }
                })
                tlItem
                .from($(el).find('.cardtl-prog-main-item-line'), {scaleY: 0, transformOrigin: 'bottom', duration: .6, clearProps: 'all'})
                .from(itemNum.chars, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '>=-.3')
                .from(itemTitle.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')
                .from(itemSub.words, {autoAlpha: 0, yPercent: 80, duration: .4, stagger: .016, onComplete: () => {
                    itemNum.revert()
                    itemTitle.revert()
                    itemSub.revert()
                }}, '<=.2')
            })
            if(viewport.w <= 767){
                $(".cardtl-prog-main-cms").addClass("swiper");
                $(".cardtl-prog-main-list").addClass("swiper-wrapper");
                $(".cardtl-prog-main-item").addClass("swiper-slide");
                let swiper = new Swiper(".cardtl-prog-main-cms", {
                    slidesPerView: "auto",
                    spaceBetween: parseRem(64),
                    
                  });
            }
        }
        interaction() {
            let allItems = $('.cardtl-prog-main-item');
            allItems.each((idx, el) => {
                $(el).find('.cardtl-prog-main-item-step').get(0).innerHTML = `0${idx + 1}`
            })
            let distance = allItems.length * $('.cardtl-prog-main-item').eq(0).outerWidth(true) - ($('.cardtl-prog-main-list').width() + parseRem(20));
            let contentHeight = $('.cardtl-prog-main-item-content').eq(0).outerHeight(true);
            gsap.set('.line.cardtl-prog-line', {'margin-bottom': `${contentHeight}px`})
            this.tlScroll = gsap.timeline({
                scrollTrigger: {
                    trigger: '.cardtl-prog-wrap',
                    start: 'top top',
                    end: `bottom-=${viewport.h} bottom`,
                    scrub: .1,
                    snap: {
                        snapTo: [0, .34, .67, 1],
                        duration: {min: .2, max: .6}
                    },
                    onUpdate(self) {
                        let progress = self.progress;
                        let index = Math.floor(progress * allItems.length);
                        if (index > allItems.length - 1) {
                            index = allItems.length - 1;
                        }
                        activeItem(['.cardtl-prog-main-item'], index)
                    }
                }
            })
            this.tlScroll
            .to('.cardtl-prog-main-list', {x: -distance, duration: 1, ease: 'none'})
            activeItem(['.cardtl-prog-main-item'], 0)
        }
    }
    let cardtlProgAnim = new CardtlProgAnimate();
    class CardtlFaqAnimate {
        constructor() {
            this.tlTrigger;
            this.tlTitle;
            this.tlSub;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.cardtl-faq',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.interaction()
                        this.setup()
                    }
                }
            })
        }
        setup() {
            let label = new SplitType('.car-faq-label', {types: 'lines, words', lineClass: 'bp-line'})
            let title = new SplitType('.cardtl-faq-title', {types: 'lines, words', lineClass: 'bp-line'})
            let subTxt = new SplitType('.cardtl-faq-sub-wrap.hidden-mb .cardtl-faq-sub-txt', {types: 'lines, words', lineClass: 'bp-line'})
            let subLinkMb = new SplitType('.cardtl-faq-sub-wrap.hidden-dk .cardtl-faq-sub-txt', {types: 'lines, words', lineClass: 'bp-line'})
            this.tlTitle = gsap.timeline({
                scrollTrigger: {
                    trigger: '.car-faq-title-wrap',
                    start: 'top top+=65%',
                    once: true,
                },
                onComplete: () => {
                    label.revert()
                    title.revert()
                    subTxt.revert()
                }
            })

            this.tlTitle
            .from(label.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
            .from(title.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, '<=.2')
            .from(subTxt.words, {autoAlpha: 0, yPercent: 80, duration: .4, stagger: .016}, '<=.2')
            setupLinkReveal(this.tlTitle, '.cardtl-faq-sub-wrap.hidden-mb .car-faq-sub-txt-link .txt-link-wrap .txt', '.cardtl-faq-sub-wrap.hidden-mb .car-faq-sub-txt-link .txt-link-wrap .ic-embed', '.cardtl-faq-sub-wrap.hidden-mb .car-faq-sub-txt-link .txt-link-wrap .txt-link-line', '<=.2')

            let allItems = $('.car-faq-main-item');
            allItems.each((idx, el) => {
                let headTxt = new SplitType($(el).find('.car-faq-main-item-head-txt').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                let iconWrap = $(el).find('.car-faq-main-item-head-ic')
                let icon = $(el).find('.car-faq-main-item-head-ic .ic-embed')
                let tlItem = gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        start: 'top top+=75%',
                        once: true,
                    },
                    onComplete: () => {
                        headTxt.revert();
                    }
                })
                tlItem
                .from(headTxt.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
                .from(iconWrap, {autoAlpha: 0, scale: .8, duration: .6, clearProps: 'all'}, '<=.2')
                .from(icon, {autoAlpha: 0, scale: 1.25, duration: .6, clearProps: 'all'}, '<=0')
                .from($(el).find('.car-faq-main-item-body-line-active').get(0), {scaleX: 0, transformOrigin: 'left', duration: .6, clearProps: 'all'}, '<=.2')
                .from($(el).find('.car-faq-main-item-body-line').get(0), {scaleX: 0, transformOrigin: 'left', duration: .6, clearProps: 'all'}, '<=0')
                if(idx == allItems.length - 1 && viewport.w <=767){
                    tlItem
                    .from(subLinkMb.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04},'<=.3')
                    setupLinkReveal(tlItem, '.cardtl-faq-sub-wrap.hidden-dk .txt-link-comp', '.cardtl-faq-sub-wrap.hidden-dk .ic-embed', '.cardtl-faq-sub-wrap.hidden-dk .txt-link-line', '<=.2')
                } 
            })

        }
        interaction() {
            let offsetTop = (viewport.h - $('.car-faq-title-wrap').outerHeight(true)) / 2;
            gsap.set('.car-faq-title-wrap', {top: offsetTop})
            let allFaqs = $('.car-faq-main-item-head');
            allFaqs.on('click', function(e) {
                e.preventDefault();
                if ($(this).closest('.car-faq-main-item').hasClass('active')) {
                    $(this).closest('.car-faq-main-item').find('.car-faq-main-item-body-inner').slideUp({complete: () => {
                        cardtlSectionAnim.update()
                    }});
                    $(this).closest('.car-faq-main-item').removeClass('active').removeClass('active');
                } else {
                    $('.car-faq-main-item.active .car-faq-main-item-body-inner').slideUp({complete: () => {
                        cardtlSectionAnim.update()
                    }});
                    $(this).closest('.car-faq-main-item').find('.car-faq-main-item-body-inner').slideDown();
                    $(this).closest('.car-faq-main-item').addClass('active').siblings().removeClass('active');
                }
            })
        }
    }
    let cardtlFaqAnim = new CardtlFaqAnimate();
    class CardtlSectionAnimate {
        constructor() {
            if (viewport.w > 991) {
                this.tlScHeroMain;
                this.tlScTestiProg;
                this.tlScProgFaq;
                this.tlScFaqFooter;
            }
        }
        setup() {
            if (viewport.w > 991) {
                this.tlScHeroMain = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.cardtl-hero-wrap',
                        start: `top top`,
                        end: `top top-=${$('.cardtl-hero').outerHeight(true)}`,
                        scrub: true,
                    }
                })
                this.tlScHeroMain.to('.cardtl-hero .container', {scale: .8, yPercent: -30, autoAlpha: .6, duration: 1.1, ease: 'none'}, 0)
    
                this.tlScTestiProg = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.cardtl-main-testi-wrap',
                        start: `bottom-=${viewport.h} bottom`,
                        end: `bottom bottom`,
                        scrub: true,
                    }
                })
                this.tlScTestiProg.to('.cardtl-main-testi', {scale: .8, autoAlpha: .6, duration: 1.1, ease: 'none'}, 0)
                this.tlScProgFaq = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.cardtl-prog-wrap',
                        start: `bottom-=${viewport.h} bottom`,
                        end: `bottom bottom`,
                        scrub: true,
                    }
                })
                this.tlScProgFaq.to('.cardtl-prog .container', {scale: .8, autoAlpha: .6, duration: 1.1, ease: 'none'}, 0)
                this.tlScFaqFooter = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.cardtl-faq-wrap',
                        start: `bottom-=${viewport.h} bottom`,
                        end: `bottom bottom`,
                        scrub: true,
                    }
                })
                this.tlScFaqFooter.to('.cardtl-faq .container', {scale: .8, autoAlpha: .6, duration: 1.1, ease: 'none'}, 0)
            }
            if (viewport.w < 767) {
                $('.cardtl-hero-wrap .home-sc-block-100').css('height', '0px')
                $('.cardtl-main-testi-wrap').css('margin-top', '0px')
            }
        }
        update() {
            if (viewport.w > 991) {
                this.tlScTestiProg.scrollTrigger.refresh()
                this.tlScProgFaq.scrollTrigger.refresh()
                this.tlScFaqFooter.scrollTrigger.refresh()
            }
        }
        destroy() {
            if (viewport.w > 991) {
                this.tlScTestiProg.kill()
                this.tlScProgFaq.kill()
                this.tlScFaqFooter.kill()
            }
        }
    }
    let cardtlSectionAnim = new CardtlSectionAnimate();
    // // End Career Detail
    
    // // Legal
    class LegalHeroAnimate {
        constructor() {
            this.tlTitle;
        }
        setup() {
            let title = new SplitType('.legal-hero-title', {types: 'lines, words', lineClass: 'bp-line'})
            let subTxt = new SplitType('.lega-hero-info-txt', {types: 'lines, words', lineClass: 'bp-line'})
            let subDateTxt = new SplitType('.lega-hero-info-date-txt', {types: 'lines, words', lineClass: 'bp-line'})
            this.tlTitle = gsap.timeline({
                paused: true,
                onComplete: () => {
                    title.revert()
                    subTxt.revert()
                    subDateTxt.revert()
                }
            })
            this.tlTitle
            .from(title.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
            .from([...subTxt.words, ...subDateTxt.words], {autoAlpha: 0, yPercent: 80, duration: .4, stagger: .016}, '<=.2')
        }
        play() {
            this.tlTitle.play()
        }
    }
    let legalHeroAnim = new LegalHeroAnimate();
    class LegalMainAnimate {
        constructor() {
            this.tlTrigger;
            this.tlTabs;
            this.tlFirstRictxt;
            this.boundSetActiveTab = null;
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.legal-main',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.interaction()
                        this.setup()
                    }
                }
            })
        }
        setup() {
            let allItems = $('.legal-main-content-item');
            allItems.each((idx, el) => {
                let title = new SplitType($(el).find('.legal-main-content-title').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                if (idx == 0) {
                    this.tlFirstRictxt = gsap.timeline({
                        paused: true,
                    })
                    this.tlFirstRictxt
                    .from(title.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
                    let allRichTxt = $(el).find('.legal-main-content-rictxt > *')
                    allRichTxt.each((idx, el) => {
                        if ($(el).get(0).tagName == 'P') {
                            let rictxt = new SplitType(el, {types: 'lines, words', lineClass: 'bp-line'})
                            this.tlFirstRictxt
                            .from(rictxt.words, {autoAlpha: 0, yPercent: 80, duration: .4, stagger: .016, onComplete() {
                                rictxt.revert()
                            }}, '<=.2')
                        } else if ($(el).get(0).tagName == 'UL') {
                            let allLiEls = $(el).find('li');
                            allLiEls.each((idx, li) => {
                                let liEl = new SplitType(li, {types: 'lines, words', lineClass: 'bp-line'})
                                this.tlFirstRictxt
                                .from(li, {'--li-color': 'rgba(34,34,34,0)', duration: .6}, `${idx * .2}`)
                                .from(liEl.words, {autoAlpha: 0, yPercent: 80, duration: .4, stagger: .016, onComplete() {
                                    // liEl.revert()
                                }}, '<=.2')
                            })
                        } else {
                            let heading = new SplitType(el, {types: 'lines, words', lineClass: 'bp-line'})
                            this.tlFirstRictxt
                            .from(heading.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04, onComplete: () => {
                                heading.revert()
                            }}, '<=.2')
                        }
                    })
                } else {
                    let tlItem = gsap.timeline({
                        scrollTrigger: {
                            trigger: el,
                            start: 'top top+=75%',
                            once: true,
                            onComplete() {
                                title.revert()
                            },
                        }
                    })
                    tlItem
                    .from(title.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
                    let allRichTxt = $(el).find('.legal-main-content-rictxt > *')
                    allRichTxt.each((idx, el) => {
                        if ($(el).get(0).tagName == 'P') {
                            let rictxt = new SplitType(el, {types: 'lines, words', lineClass: 'bp-line'})
                            tlItem
                            .from(rictxt.words, {autoAlpha: 0, yPercent: 80, duration: .4, stagger: .016, onComplete() {
                                rictxt.revert()
                            }}, '<=.2')
                        } else if ($(el).get(0).tagName == 'UL') {
                            let allLiEls = $(el).find('li');
                            allLiEls.each((idx, li) => {
                                let liEl = new SplitType(li, {types: 'lines, words', lineClass: 'bp-line'})
                                tlItem
                                .from(li, {'--li-color': 'rgba(34,34,34,0)', duration: .6}, `${idx * .2}`)
                                .from(liEl.words, {autoAlpha: 0, yPercent: 80, duration: .4, stagger: .016, onComplete() {
                                    // liEl.revert()
                                }}, '<=.2')
                            })
                        } else {
                            let heading = new SplitType(el, {types: 'lines, words', lineClass: 'bp-line'})
                            tlItem
                            .from(heading.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04, onComplete: () => {
                                heading.revert()
                            }}, '<=.2')
                        }
                    })
                }
                
            })
            this.tlTabs = gsap.timeline({
               paused: true
            })
            let allItemsTitle = $('.legal-main-tab-item-inner')
            allItemsTitle.each((idx, el) => {
                let title = new SplitType($(el).find('.txt').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                this.tlTabs
                .from(title.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04}, idx * .2)
                .from($(el).find('.legal-main-tab-item-line'), {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, '<=.1')
            })
        }
        interaction() {
            if (viewport.w <= 767) {
                $('.legal-main-tab-cms').attr('data-lenis-prevent', 'true')
            }
            let allItems = document.querySelectorAll('.legal-main-content-item');
            allItems.forEach((el, idx) => {
                $(el).attr('id', `tab-${idx + 1}`)
            })
            resetScroll()
            setTimeout(() => {
                legalSectionAnim.update()
            }, 300);
            
            this.boundSetActiveTab = this.setActiveTab.bind(this, allItems);
            window.addEventListener('scroll', this.boundSetActiveTab);
            $('.legal-main-tab-item-inner').on('click', function(e) {
                let index = $(this).closest('.legal-main-tab-item').index();
                let allItems = $('.legal-main-content-item');
                let target = allItems.eq(index);
                let targetTop = target.offset().top - parseRem(80);
                
                lenis.scrollTo(targetTop, {
                    duration: 1.2,
                    force: true,
                })
            })
        }
        checkUrlHash() {
            // let hash = window.location.hash;
            // if (hash) {
            //     let index = parseInt(hash.split('-')[1]) - 1;
            //     let allItems = $('.legal-main-content-item');
            //     let target = allItems.eq(index);
            //     let targetTop = target.offset().top - parseRem(80);
                
            //     lenis.scrollTo(targetTop, {
            //         duration: 1.2,
            //         force: true,
            //     })
            // }
        }
        setActiveTab(allItems) {
            let index = $(findMostVisibleElement(allItems)).index()
            let allTabs = $('.legal-main-tab-item-inner');
            allTabs.removeClass('active')
            allTabs.eq(index).addClass('active')
            this.updateUrlSearch(`?sc=tab-${index + 1}`)
        }
        updateUrlSearch(param) {
            if (history.pushState) {
                history.pushState(null, null, param);
            } else {
                location.search = param;
            }
        }
        play() {
            this.tlTabs.play()
            this.tlFirstRictxt.play()
        }
        destroy() {
            if (this.boundSetActiveTab) {
                window.removeEventListener('scroll', this.boundSetActiveTab);
            }
        }
    }
    let legalMainAnim = new LegalMainAnimate();
    class LegalSectionAnimate {
        constructor() {
            if (viewport > 991) {
                this.tlScHeroMain;
                this.tlScMainFooter;
            }
        }
        setup() {
            if (viewport > 991) {
                this.tlScHeroMain = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.legal-hero-wrap',
                        start: `top top`,
                        end: `top+=${viewport.h} top`,
                        scrub: true,
                    }
                })
                this.tlScHeroMain.to('.legal-hero .container', {scale: .8, autoAlpha: .6, duration: 1.1, ease: 'none'}, 0)
    
                this.tlScMainFooter = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.legal-main-wrap',
                        start: `bottom-=${viewport.h} bottom`,
                        end: `bottom bottom`,
                        scrub: true,
                    }
                })
                this.tlScMainFooter.to('.legal-main .container', {scale: .8, autoAlpha: .6, duration: 1.1, ease: 'none'}, 0)
            }
            if (viewport.w < 767) {
                $('.legal-hero-wrap .home-sc-block-100').css('height', '0px')
                $('.legal-main-wrap').css('margin-top', '0px')
            }
        }
        update() {
            if (viewport > 991) {
                this.tlScHeroMain.scrollTrigger.refresh()
                this.tlScMainFooter.scrollTrigger.refresh()
            }
        }
        destroy() {
            if (viewport > 991) {
                this.tlScHeroMain.kill()
                this.tlScMainFooter.kill()
            }
            
        }
    }
    let legalSectionAnim = new LegalSectionAnimate();
    // // End Legal

    // // Footer
    class FooterAnimate {
        constructor() {
            this.tlTrigger;
            this.tlTitle; 
        }
        setTrigger() {
            this.tlTrigger = gsap.timeline({
                scrollTrigger: {
                    trigger: '.footer',
                    start: 'top bottom+=50%',
                    end: 'bottom top',
                    once: true,
                    onEnter: () => {
                        this.setActiveNav()
                        if (viewport.w > 767) {
                            this.interaction()
                        } else {
                            this.interactionMb()
                        }
                        this.setup()
                    }
                }
            })
        }
        setup() {
            let allItems = $('.ft-item');
            allItems.each((idx, el) => {
                let itemTxt = new SplitType($(el).find('.ft-item-txt').get(0), {types: 'lines, words', lineClass: 'bp-line'})
                let tlItem = gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        start: 'top top+=65%',
                        once: true,
                        onComplete() {
                            itemTxt.revert()
                        }
                    }
                })
                tlItem
                .from(itemTxt.words, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04})
            })
        }
        setActiveNav() {
            $('[data-footer-nav]').removeClass('active')
            if ($(`[data-footer-nav="${$('[data-barba-namespace]').attr('data-barba-namespace')}"]`).length >= 1) {
                $(`[data-footer-nav="${$('[data-barba-namespace]').attr('data-barba-namespace')}"]`).addClass('active')    
            }
        }
        interaction(data) {
            let allCols = $('.footer .home-hero-pod-col');

            let activeIndex = Math.floor(pointer.x / (viewport.w / allCols.length))
            // let basHeight = .028 * viewport.h;
            let basHeight = parseRem(52.4);
            let maxHeight = .3 * viewport.h;
            $(window).on('resize', function(e) {
                basHeight = .028 * viewport.h;
                maxHeight = .3 * viewport.h;
            })
            let validIndices = [3, 4, 5, 6, 7]
            function active(index) {
                allCols.removeClass('active')
                if (validIndices.includes(index)) {
                    allCols.eq(index).addClass('active')
                }

                allCols.each((idx, el) => {
                    let height = gsap.getProperty(el, 'height')
                    let strength = 1 - Math.abs((idx - index) / 5);
                    strength = Math.max(strength, 0);
                    gsap.quickSetter(el, 'height', `px`)(lerp(height, (basHeight + (maxHeight - basHeight) * strength), 0.1))
                })
            }
            function mouseHomeHero() {
                if (isInViewport('.footer')) {
                    activeIndex = Math.floor(pointer.x / (viewport.w / allCols.length))
                    active(activeIndex)
                } else {
                    active(0)
                }
                requestAnimationFrame(mouseHomeHero)
            }
            requestAnimationFrame(mouseHomeHero)
        }
        interactionMb(data) {
            $('.mod-ft-pod-col').eq(0).remove()
            $('.mod-ft-pod-col').eq($('.mod-ft-pod-col').length - 1).remove()
            $('.ft-pod-col-social-ic-inner').css('transform', 'none')
            $('.ft-bg-pod').css('pointer-events', 'auto')
            $('.ft-bg-inner').css('position', 'relative')
            $('.ft-bg-pod-wrap').css({
                'position': 'absolute',
                'inset': '0',
                'width': '20%',
                'overflow': 'visible',
            }).addClass('swiper')
            $('.ft-bg-pod').addClass('swiper-wrapper')
            $('.mod-ft-pod-col').css({
                'flex': 'unset',
                'flex-shrink': '0',
            }).addClass('swiper-slide')

            let allCols = $('.footer .home-hero-pod-col');
            let activeIndex = Math.floor(pointer.x / (viewport.w / allCols.length))
            // let basHeight = .028 * viewport.h;
            let basHeight = parseRem(6);
            let maxHeight = .24 * viewport.h;
            let validIndices = [2, 3, 4, 5, 6]
            function active(index) {
                allCols.removeClass('active')
                $('.ft-pod-col-social-ic-inner').css('opacity', '.2')
                if (validIndices.includes(index)) {
                    allCols.eq(index).addClass('active')
                    allCols.eq(index).find('.ft-pod-col-social-ic-inner').css('opacity', '1')
                }

                allCols.each((idx, el) => {
                    let height = gsap.getProperty(el, 'height')
                    let strength = 1 - Math.abs((idx - index) / 3);
                    strength = Math.max(strength, 0);
                    gsap.to(el, {height: basHeight + (maxHeight - basHeight) * strength, duration: .4})
                })
            }
            let swiper = new Swiper('.ft-bg-pod-wrap', {
                slidesPerView: 1,
                spaceBetween: 0,
                centeredSlides: true,
                initialSlide: 3,
                on: {
                    afterInit: () => {
                        activeIndex = 4
                        active(activeIndex)
                    }
                }
            })
            requestAnimationFrame(() => {
                swiper.slideTo(4)
                swiper.on('touchMove', function () {
                    if (swiper.progress < .25) {
                        swiper.allowTouchMove = false;
                        swiper.slideTo(2)
                    } else if (swiper.progress > .75) {
                        swiper.allowTouchMove = false;
                        swiper.slideTo(6)
                    }  
                })
                swiper.on('touchEnd', function () {
                    if (swiper.progress < .25) {
                        swiper.allowTouchMove = true;
                        swiper.slideTo(2)
                        swiper.allowSlidePrev = true;
                    } else if (swiper.progress > .75) {
                        swiper.allowTouchMove = true;
                        swiper.slideTo(6)
                        swiper.allowSlideNext = true;
                    } 
                    setTimeout(() => {
                        swiper.allowTouchMove = true;
                        swiper.allowSlidePrev = true;
                        swiper.allowSlideNext = true;
                    }, 410);
                })
                swiper.on('slideChange', function() {
                    activeIndex = swiper.activeIndex
                    active(activeIndex)
                })
            })
        }

    }
    let footerAnim = new FooterAnimate();
    // // End Footer

    // End Animation

    //Animation Utils
    function setupLinkReveal(tlObj, linkTextEl, linkIcEl, linkLineEl, tlDelay = 0) {
        let linkText = new SplitType(linkTextEl, {types: 'lines, words', lineClass: 'bp-line'})
        let linkEl = $(linkIcEl).length >= 1 ? [...linkText.words, $(linkIcEl).get(0)] : linkText.words;
        
        tlObj
        .from(linkEl, {autoAlpha: 0, yPercent: 80, duration: .6, stagger: .04, onComplete: () => {
            linkText.revert()
            $(linkIcEl).length >= 1 ? clearProps(linkIcEl) : null
        }}, tlDelay)
        if ($(linkLineEl).length >= 1) {
            tlObj
            .from(linkLineEl, {scaleX: 0, duration: .8, transformOrigin: 'left', clearProps: 'all'}, '<=.3')
        }
    }
    function setupAngGrad(tlObj, leftEl, rightEl, tlDelay = 0) {
        $(leftEl).css({
            'background': 'conic-gradient(from 90deg at var(--xCor) 50%, #D4D4D4 0deg, rgba(255, 255, 255, 0) 360deg)',
            '--xCor': '100%',
            'opacity': '0'
        })
        $(rightEl).css({
            'background': 'conic-gradient(from -90deg at var(--xCor) 50%, rgba(255, 255, 255, 0) 0deg, #D4D4D4 360deg)',
            '--xCor': '0%',
            'opacity': '0'
        })
        tlObj
        .to(leftEl, {'--xCor': '50%', autoAlpha: 1, duration: .8, ease: 'power2.out', clearProps: 'all'}, tlDelay)
        .to(rightEl, {'--xCor': '50%', autoAlpha: 1, duration: .8, ease: 'power2.out', clearProps: 'all'}, '<=0')

    }
    function setupImgReveal(wralEl, innerEl, scrollParams = {
        trigger: wralEl,
        start: 'top top+=65%',
        once: true,
    }, dur = 1.2, delay = .1) {
        if (!scrollParams) {
        }
        $(wralEl).css({
            'overflow': 'hidden',
            'background-color': 'transparent',
            'pointer-events': 'none',
        })
        $(innerEl).css({
            'clip-path': 'polygon(-1% 102%, -1% var(--col-1), 25% var(--col-1), 25% 102%, 25% var(--col-2), 50% var(--col-2), 50% 102%, 50% var(--col-3), 75% var(--col-3), 75% 102%, 75% var(--col-4), 101% var(--col-4), 101% 102%)',
            '--col-1': '100%',
            '--col-2': '100%',
            '--col-3': '100%',
            '--col-4': '100%',
        })
        
        let tlImg = gsap.timeline({
            scrollTrigger: scrollParams,
            onComplete() {
                if (viewport.w > 767) {
                    clearProps(wralEl)
                    clearProps(innerEl)
                }
            }
        })
        tlImg
        .from($(innerEl).find('img').get(0), {scale: 1.4, duration: dur, ease: 'power1.out'})
        .to(innerEl, {'--col-1': '0%', duration: dur, ease: 'power1.out'}, '<=0')
        .to(innerEl, {'--col-2': '0%', duration: dur - delay, ease: 'power1.out'}, `<=${delay}`)
        .to(innerEl, {'--col-3': '0%', duration: dur - delay * 2, ease: 'power1.out'}, `<=${delay}`)
        .to(innerEl, {'--col-4': '0%', duration: dur - delay * 3, ease: 'power1.out'}, `<=${delay}`)
    }
    function setupCurtain(wrapEl, colorTop, colorBot) {
        let temp = $(`${wrapEl} .sc-curtain-item`).clone();
        for (let i = 0; i < 9; i++) {
            $(`${wrapEl} .sc-curtain-wrap`).append(temp.clone())
        }
        $(`${wrapEl} .sc-curtain-item:nth-child(even)`).css({
            'flex-basis': '100%',
            'background': colorTop
        })
        $(`${wrapEl} .sc-curtain-item:nth-child(odd)`).css({
            'flex-basis': '0%',
            'background': colorBot
        })
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: `${wrapEl} .sc-curtain-wrap`,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            }
        })
        tl.to(`${wrapEl} .sc-curtain-item:nth-child(even)`, {'flex-basis': '0%', duration: 1, stagger: {
            each: -.08,
            ease: 'power1.in'
        }, ease: 'none'})
        tl.to(`${wrapEl} .sc-curtain-item:nth-child(odd)`, {'flex-basis': '100%', duration: 1, stagger: {
            each: -.08,
            ease: 'power1.in'
        }, ease: 'none'}, '<=0')
    }
    //End Animation Utils
    
    const SCRIPTS = {
        home: {
          namespace: 'home',
          afterEnter() {
            console.log('home afterEnter');
            homeHeroAnim.setup()
            homeAboutAnim.setTrigger()
            homeDoAnim.setTrigger()
            homeValAnim.setTrigger()
            homeJobAnim.setTrigger()
            homeTestiAnim.setTrigger()
            homeBlogAnim.setTrigger()
            homeSubscrAnim.setTrigger()
            homeSectionAnim.setup()
          },
          beforeLeave() {
            console.log('home CLEAN');
            homeJobAnim.destroy()
          },
        },
        location: {
          namespace: 'location',
          afterEnter() {
            console.log('loc afterEnter');
            locHeroAnim.setup()
            locOffiAnim.setTrigger()
            locSellAnim.setTrigger()
            locTourAnim.setTrigger()
            homeJobAnim.setTrigger()
            homeSubscrAnim.setTrigger()
            locSectionAnim.setup()
          },
          beforeLeave() {
            homeJobAnim.destroy()
            console.log('loc CLEAN');
          },
        },
        careers: {
          namespace: 'careers',
          afterEnter() {
            console.log('car afterEnter');
            carHeroAnim.setup()
            carFaqAnim.setTrigger()
            carTestiAnim.setTrigger()
            carOffiAnim.setTrigger()
            carPerkAnim.setTrigger()
            carJobAnim.setTrigger()
            homeSubscrAnim.setTrigger()
            carSectionAnim.setup()
          },
          beforeLeave() {
            carJobAnim.destroy()
            console.log('car CLEAN');
          },
        },
        careerDetail: {
          namespace: 'career-detail',
          afterEnter() {
            console.log('cardtl afterEnter');
            applyForm.init()
            cardtlHeroAnim.setup()
            cardtlMainAnim.setTrigger()
            cardtlTestiAnim.setTrigger()
            cardtlProgAnim.setTrigger()
            cardtlFaqAnim.setTrigger()
            cardtlSectionAnim.setup()
          },
          beforeLeave() {
            console.log('cardtl CLEAN');
          },
        },
        legal: {
          namespace: 'legal',
          afterEnter() {
            console.log('legal afterEnter');
            legalHeroAnim.setup()
            legalMainAnim.setTrigger()
            legalSectionAnim.setup()
            footerAnim.setTrigger()
          },
          beforeLeave() {
            console.log('legal CLEAN');
            legalMainAnim.destroy()
          },
        },
      };
      const VIEWS = Object.values(SCRIPTS);
    // Global Barbajs
    
    pageTrans.setup()
    barba.init({
        preventRunning: true,
        timeout: 5000,
        debug: true,
        transitions: [{
            name: 'default-transition',
            sync: true,
            once(data) {
                console.log('once global')
                load.init()
                // nav.updateNavActive(data)
                // gsap.set('.header', {height: parseRem(100), 'background-color': 'rgba(14,14,14,0)', onComplete: () => {$('.header').css('height', 'auto')}})
            },
            enter(data) {
                console.log('enter global')
            },
            after(data) {
                console.log('after global')
            },
            afterEnter(data) {
                // Trans
                console.log('after enter global')
                // footerSocialMouse()
            },
            beforeLeave({current}) {
                console.log(current)
                // Reset 
                console.log('before leave global')
            },
            async leave(data) {
                console.log('leave global')
                console.log('trans leave')
                await pageTrans.leaveAnim(data).then(() => {
                    console.log('trans enter')
                    pageTrans.enterAnim(data)
                })
            },
            afterLeave(data) {
                console.log('after leave global')
            }
        }],
        views: VIEWS
    })
    // End Global Barbajs
    // function findElementsWithBlurFilter() {
    //     // Function to check if the computed style of an element includes a blur filter
    //     const hasBlurFilter = (element) => {
    //         const style = window.getComputedStyle(element);
    //         return style.filter === 'blur' || style.filter !== 'none';
    //     };
    
    //     // Find all elements with a blur filter
    //     const elementsWithBlur = Array.from(document.querySelectorAll('*')).filter(hasBlurFilter);
    
    //     return elementsWithBlur;
    // }
    
    // // Example usage
    // const elements = findElementsWithBlurFilter();
    // console.log(`Found ${elements.length} elements with a blur filter.`);
    // elements.forEach(element => console.log(
    //     $(element).css('filter','unset')
    // ));
}
window.onload = mainScript;