const mainScript = () => {
    const unlockData = [
        { '08/21/2024': '291,554,000' },
        { '09/21/2024': '303,535,000' },
        { '10/21/2024': '314,516,000' },
        { '11/21/2024': '325,497,000' },
        { '12/21/2024': '336,478,000' },
        { '01/21/2025': '347,459,000' },
        { '02/21/2025': '358,440,000' },
        { '03/21/2025': '364,796,000' },
        { '04/21/2025': '371,152,000' },
        { '05/21/2025': '377,508,000' },
        { '06/21/2025': '383,864,000' },
        { '07/21/2025': '390,220,000' },
        { '08/21/2025': '396,576,000' },
        { '09/21/2025': '402,932,000' },
        { '10/21/2025': '409,288,000' },
        { '11/21/2025': '415,644,000' },
        { '12/21/2025': '422,000,000' },
    ]
    const totalUnlockData = '400,000,000 '
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)
    console.log('Mintlayer script loaded');

    // const isStaging = window.location.host.includes('webflow') ? true : false

    const parseRem = (input) => {
        return input / 10 * parseFloat(window.getComputedStyle(document.querySelector('html')).getPropertyValue("font-size"));
    }
    const childSelect = (parent) => {
        return (child) => child ? $(parent).find(child) : parent;
    }
    const lenis = new Lenis()
    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    $isMatchSticky = false
    const viewport = {
        w: window.innerWidth,
        h: window.innerHeight,
    };
    lenis.on('scroll', function (inst) {
        $('.header-menu-item-drop').removeClass('active');
        if ($isMatchSticky) {
            $('.header').addClass('on-hide')
            return
        } // check mathc sticky in form page will not show header
        if (inst.direction == 0 && inst.scroll >= $('.header').height()) {
            $('.header').addClass('on-scroll');
        }
        else if (inst.direction == 1) {
            if (inst.scroll >= $('.header').height()) {
                $('.header').addClass('on-hide on-scroll');
            } else {
                $('.header').removeClass('on-hide');
                $('.header').addClass('on-scroll');
            }
        } else if (inst.direction == -1) {
            if (inst.scroll >= $('.header').height()) {
                $('.header').removeClass('on-hide');
                $('.header').addClass('on-scroll');
            } else {
                $('.header').removeClass('on-hide on-scroll');
            }
        }
    })
    $(".download-for-mob").on("click", function (event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định

        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            window.location.href = "https://apps.apple.com/us/app/mojito-wallet/id1620691992";
        } else {
            window.location.href = "https://play.google.com/store/apps/details?id=com.mojitowallet";
        }
    });

    if ($('.accord-item-wrap').length >= 1) {
        $('.accord-item-body').slideUp()
        $('.accord-item-wrap').each(function () {
            const $this = $(this);
            const $accordHead = $this.find('.accord-item-head');
            const $accordContent = $this.find('.accord-item-body');
            $accordHead.on('click', function () {
                if ($this.hasClass('active')) {
                    $this.removeClass('active');
                    $accordContent.slideUp();
                } else {
                    $('.accord-item-wrap').removeClass('active');
                    $('.accord-item-body').slideUp()
                    $this.addClass('active');
                    $accordContent.slideDown();
                }
            })
        })
    }

    const handleHeader = {
        open: () => {
            $('.header-ham-link').addClass('active');
            $('.header').addClass('on-open');
            $('.header-menu').addClass('active');
        },
        close: () => {
            $('.header-ham-link').removeClass('active')
            $('.header').removeClass('on-open');
            $('.header-menu').removeClass('active')
        }
    }
    $('.header-ham-link').on('click', function (e) {
        e.preventDefault()
        if (!$(this).hasClass('active')) {
            handleHeader.open()
        } else {
            handleHeader.close()
        }
    })

    const headerDropdown = () => {
        $('.header-menu-item-drop').each((idx, el) => {
            let rowCount = $(el).find('.header-menu-item-drop-link').length;
            if (rowCount < 5) {
                $(el).css('grid-template-rows', `repeat(${rowCount}, minmax(1px, 1fr))`)
            }
        })
        $('.header-menu-item-link, .header-act .btn.btn-purple').on('click', function (e) {
            e.preventDefault();
            let target = $(this).closest('.header-menu-item').find('.header-menu-item-drop')
            target.toggleClass('active');
            $('.header-menu-item-drop').not(target).removeClass('active');
        })
        $(window).on('click', function () {
            if (!$('.header-menu-item-link:hover').length)
                if (!$('.header-menu-item-drop:hover').length)
                    if (!$('.header-act .btn.btn-purple:hover').length)
                        $('.header-menu-item-drop').removeClass('active');
        })
    }

    const headerDropdownAccordion = () => {
        $('.header-menu-item-drop').hide();

        function activeAccordion(index) {
            $('.header-menu-item-drop').eq(index).slideToggle();
            $('.header-menu-item-link').eq(index).toggleClass("active");

            $('.header-menu-item-drop').not($('.header-menu-item-drop').eq(index)).slideUp();
            $('.header-menu-item-link').not($('.header-menu-item-link').eq(index)).removeClass("active");
        };

        $('.header-menu-item-link, .header-act .btn.btn-purple').on("click", function (e) {
            e.preventDefault();
            let parent = $(this).closest('.header-menu-item');
            let dropdowns = parent.find('.header-menu-item-drop');
            dropdowns.slideToggle();
            parent.toggleClass("active");

            $('.header-menu-item-drop').not(dropdowns).slideUp();
            $('.header-menu-item').not(parent).removeClass("active");
        })
    }
    if ($(window).width() <= 767) {
        headerDropdownAccordion();
    } else {
        headerDropdown();
    }
    const toggleLanguage = () => {
        let domain = ''
        $('.header-menu-language').on('click', function (e) {
            e.preventDefault();
            $('.header-menu-language-drop').toggleClass('active')

        })

        function init(lang) {
            $(`.header-menu-language-item`).show();
            $('.header-menu-language-item[data-lang="it"], .header-menu-language-item[data-lang="ru"], .header-menu-language-item[data-lang="vi"]').hide();
            if (lang == 'en-US') {
                lang = 'en'
            }
            $(`.header-menu-language-item[data-lang=${lang}]`).hide();
            const flag = $(`.header-menu-language-item[data-lang=${lang}] .header-menu-language-ic`).eq(0).clone();
            const name = $(`.header-menu-language-item[data-lang=${lang}] .header-menu-language-item-txt`).eq(0).clone();
            $('.btn-language-webflow ').attr('data-lang', lang)
            $('.btn-language-webflow .header-menu-language-content').html(flag);
            $('.btn-language-webflow .header-menu-language-content ').append(name);
        }
        let currentLanguage = $('html').attr('lang');
        init(currentLanguage);
        function switchLanguage(language) {
            init(language);
            var currentUrl = window.location.href;
            var url = new URL(currentUrl);
            var path = url.pathname.replace(/^\/[a-z]{2}\//, '/'); // Remove any existing language code at the start of the path

            var newUrl;
            var pathCheck;
            if (path.startsWith('/')) {
                pathCheck = path.substring(1);
            }
            if (pathCheck != currentLanguage) {
                if (language == 'en') {
                    newUrl = domain + path + url.search + url.hash;
                } else {
                    newUrl = domain + '/' + language + path + url.search + url.hash;
                }
            }
            else {
                newUrl = domain + '/' + language + url.search + url.hash;
            }
            window.location.href = newUrl;
        }

        $('.header-menu-language-item').on('click', function () {
            const language = $(this).attr('data-lang')
            switchLanguage(language)
        })
    }
    toggleLanguage();

    gsap.to('.footer-ic-main', { rotation: 360, duration: 4, repeat: -1, ease: 'power3.inOut' })
    let currSec = $('section').eq(0);
    $(window).on("scroll", function () {
        let scrollPos = $(window).scrollTop();
        $('section').each((idx, el) => {
            if (scrollPos > $(el).offset().top && scrollPos < $(el).offset().top + $(el).height()) {
                currSec = $(el);
            }
        })
        if (currSec.attr('data-section') == 'dark') {
            $('.header').addClass('on-dark');
        } else {
            $('.header').removeClass('on-dark');
        }
        lastPos = $(window).scrollTop();
    });

    class Particle {
        constructor(x, y, ctx, textureUrl, pointSize = 24) {
            this.alive = 1;
            this.x = x;
            this.y = y;
            this.radius = gsap.utils.random(parseRem(pointSize) * .65, parseRem(pointSize));
            this.color = 'rgb(255 0 0 / 100%)';
            this.opacity = 1;

            gsap.to(this, {
                alive: 0, // when 0, the particle is considered dead
                x: gsap.utils.random(x - 160, x + 160),
                y: gsap.utils.random(y - 160, y + 160),
                radius: 0,
                opacity: 0,
                duration: Math.random() < 0.5 ? 6 : 3 // 50/50 chance
            });
        }

        draw(ctx) {
            if (!this.alive) return; // Ensure the particle is alive

            // Set up the glow effect
            var radgrad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
            radgrad.addColorStop(0, 'rgba(105,238,150,' + this.opacity * .8 + ')'); // Inner color
            radgrad.addColorStop(0.55, 'rgba(186,255,132,' + this.opacity * .55 + ')'); // Middle color
            radgrad.addColorStop(1, 'rgba(227,255,199, .0)'); // Outer color

            // Draw the particle with the gradient blur effect
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = radgrad; // Apply the gradient as the fill style
            ctx.fill();

            // Optionally, reset the shadow properties after drawing the particle
            // This prevents the glow effect from affecting other drawings on the canvas
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
        }
    }
    function getAbsoluteCoordinates(element) {
        const rect = element.getBoundingClientRect();
        return {
            x: rect.left + window.scrollX,
            y: rect.top + window.scrollY
        };
    }
    function sendDataToBrevo(dataToSend) {
        if (typeof jQuery === 'undefined') {
            console.error('jQuery chưa được tải. Hãy đảm bảo rằng jQuery đã được thêm vào dự án.');
            return;
        }
        const apiUrl = "https://cbe4734c.sibforms.com/serve/MUIFAI_dKpCBkcG0YgTWON7UTAtcJXagV-FZjyIABRx8zzm8kmg0QC6lsfAqd6zBLuuv9TsFyWj_BGqeM1FQSDs34ng6sjJ6F6tNORXTIXZMETUUEjq0hig-G9Oa31pA9SRWWJXI7XydHV8CW3jNZAgxjROi4H1ABOCQ4EalU8dZbHtaRyd7yTJQ-W0H_YSI-gbszLHiR9W4gBqw?isAjax=1";
        $.ajax({
            url: apiUrl,
            type: 'POST',
            data: dataToSend,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                $('.form-loader-wrap').removeClass('active');
                $('#error-message').removeClass('active');
                $('#success-message').addClass('active');
                setTimeout(() => {
                    $('.sib-form .footer-input').val('');
                    $('#success-message').removeClass('active');
                }, 3000);
            },
            error: function (error) {
                console.log("API error:", error.responseJSON.errors.EMAIL);
                $('.form-loader-wrap').removeClass('active');
                $('#success-message').removeClass('active');
                $('#error-message').text(error.responseJSON.errors.EMAIL)
                $('#error-message').addClass('active');
            }
        });
    }

    $('.footer-submit-wrap').on('click', function (e) {
        e.preventDefault();
        let email = $('.sib-form .footer-input').val();
        let data = {
            EMAIL: email,
            email_address_check: '',
            locale: 'en'
        }
        const isChecked = $('#footer-form-check').is(':checked'); // Kiểm tra checkbox
        if (email == '') {
            $('#error-message').text('Email field cannot be empty.')
            $('#error-message').addClass('active');
        }
        else if (!isChecked) {
            $('#error-message').text('You must confirm your age, agree to the privacy policy.')
            $('#error-message').addClass('active');
        }

        else {

            $('#error-message').removeClass('active');
            $('.form-loader-wrap').addClass('active');
            sendDataToBrevo(data)
        }
    })
    async function handleCrawContent() {
        const octokit = new Octokit({
            auth: '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'
        })
        /**
         * @type {browser_download_url}: string;
         * @type {content_type}: string;
         * @type {created_at}: string;
         * @type {download_count}: number;
         * @type {id}: number;
         * @type {label}: string;
         * @type {name}: string;
         * @type {node_id}: string;
         * @type {size}: number;
         * @type {state}: string;
         * @type {updated_at}: string;
         * @type {uploader}: {
         *@type {url}: string;
         */
        try {
            const releaseResponse = await octokit.request('GET /repos/mintlayer/mintlayer-core/releases/latest');
            const latestRelease = releaseResponse.data;
            const assets = [...latestRelease.assets];

            const readmeContent = latestRelease.body;
            const codes = readmeContent.split('```')[1].split('\n').map(code => {
                const [codeValue, name] = code.split('  ');
                return { name, code: codeValue };
            });
            assets.forEach(asset => {
                const code = codes.find(code => code.name === asset.name);
                if (code) {
                    asset.sha_256 = code.code;
                }
            });
            return {
                data: assets,
                version: latestRelease.tag_name
            }
        } catch (error) {
            console.error('Error: ', error);
        }


    }
    function formatName(name) {
        const formatPatterns = [
            { type: 'os', patterns: ['linux', 'win', 'macos'] }, // OS
            { type: 'interface', patterns: ['GUI', 'CLI', 'SDK'] }, // Interface
            { type: 'type', patterns: ['TAR.GZ', 'ZIP', 'EXE', 'RPM', 'DEB', 'DMG', 'DEB'] }, // Type File
        ];

        let extractedData = {
            os: null,
            interface: null,
            type: null,
        };

        formatPatterns.forEach(({ type, patterns }) => {
            patterns.forEach(pattern => {
                const isRegex = pattern instanceof RegExp
                const regex = isRegex ? new RegExp(pattern) : new RegExp(`[_-]?${pattern}[_-]?`, 'i');

                if (regex.test(name)) {
                    extractedData[type] = pattern;
                    name = name.replace(regex, '');
                    console.log('extractedData', extractedData['chip'])
                } else {
                    if (type === 'interface' && !extractedData[type]) {
                        // havent text
                        extractedData[type] = 'CLI'
                    }
                }
            });
        });
        return extractedData
    }
    function initAnimPath(target, options = {}) {
        const { delay, reverse, fade, ...newOptions } = options;

        let canvas = $(`${target} [data-part="canvas"]`).get(0);
        let ctx;

        let particles = [];
        let spawnTimer = 0;
        let spawnFreq = 100; // how often should particles spawn (ms)
        let spawnRate = 2; // how many should spawn

        function setCanvasSize(ctx) {
            ctx.canvas.width = canvas.clientWidth;
            ctx.canvas.height = canvas.clientHeight;
        }

        if (canvas) {
            ctx = canvas.getContext("2d");
            setCanvasSize(ctx);

            $(window).resize(function () {
                setCanvasSize();
            })
        }

        $(`${target} [data-anim-path="wrap"]`).each((_, item) => {
            const parent = childSelect(item);
            parent('[data-anim-path="dot"]').each((i, dot) => {

                gsap.set(dot, { opacity: 0 });

                if (canvas) {
                    gsap.ticker.add((time, deltaTime) => {
                        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
                        // loop in reverse to remove particles that aren't alive
                        for (let i = particles.length - 1; i >= 0; i--) {
                            const p = particles[i];
                            if (!p.alive) {
                                // removes dead particle
                                particles.splice(i, 1);
                            } else {
                                p.draw(ctx);
                            }
                        }

                        // emmitter position
                        const x = $(dot).offset().left - $(`${target} [data-part="canvas"]`).offset().left + $(dot).get(0).getBoundingClientRect().width / 2;
                        const y = $(dot).offset().top - $(`${target} [data-part="canvas"]`).offset().top + $(dot).get(0).getBoundingClientRect().height / 2

                        spawnTimer -= deltaTime;

                        while (spawnTimer <= 0) {

                            spawnTimer += spawnFreq;

                            let i = spawnRate;
                            while (i--) {
                                particles.push(new Particle(x, y, ctx));
                            }
                        }
                    });
                }

                const dotAnim = {
                    duration: 3,
                    ease: "linear",
                    delay: i * (delay || .3),
                    repeat: -1,
                    motionPath: {
                        path: parent('[data-anim-path="line"]').get(0),
                        align: parent('[data-anim-path="line"]').get(0),
                        alignOrigin: [0.5, 0.5],
                        autoRotate: true
                    },
                    onStart: () => gsap.set(dot, { opacity: 1 }),
                    onUpdate: function () {
                        if (!fade) return;
                        if (this.ratio > 0.02 && this.ratio < 0.96) gsap.to(dot, { opacity: 1, duration: 0.4, scale: 1, ease: 'linear' })
                        else gsap.to(dot, { opacity: 0, duration: 0.4, scale: .3, ease: 'linear' })
                    },
                    ...newOptions
                }
                gsap[reverse ? "from" : "to"](dot, dotAnim);
            })
        })
    }
    async function getEarnAPI() {
        try {
            const response = await fetch('https://explorer.mintlayer.org/api/pool/summary');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            let numberEarn = 0;
            if (data.total_apy && data.total_apy > 0) {
                numberEarn = data.total_apy;
            }
            document.querySelector('.number-real-earn').textContent = numberEarn;
        } catch (error) {
            console.error('Error:', error);
        }
    }
    async function getAccessToken() {
        const now = Math.floor(Date.now() / 1000);

        // Lấy token và thời gian hết hạn từ sessionStorage
        const cachedData = JSON.parse(sessionStorage.getItem("googleAccessToken"));
        if (cachedData && cachedData.token && now < cachedData.expiry) {
            return cachedData.token;
        }

        // Nếu không có token hợp lệ, tạo token mới
        const header = { alg: "RS256", typ: "JWT" };
        const payload = {
            iss: SERVICE_ACCOUNT.client_email,
            scope: "https://www.googleapis.com/auth/drive.file",
            aud: SERVICE_ACCOUNT.token_uri,
            exp: now + 3600, // Token có hiệu lực trong 1 giờ
            iat: now
        };

        const encodedHeader = KJUR.jws.JWS.readSafeJSONString(JSON.stringify(header));
        const encodedPayload = KJUR.jws.JWS.readSafeJSONString(JSON.stringify(payload));
        const privateKey = SERVICE_ACCOUNT.private_key;
        const signature = KJUR.jws.JWS.sign("RS256", encodedHeader, encodedPayload, privateKey);

        const response = await fetch(SERVICE_ACCOUNT.token_uri, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${signature}`
        });

        const data = await response.json();

        if (data.access_token) {
            // Lưu token và thời gian hết hạn vào sessionStorage
            const newTokenData = {
                token: data.access_token,
                expiry: now + 3600 // Lưu thời gian hết hạn (1 giờ)
            };
            sessionStorage.setItem("googleAccessToken", JSON.stringify(newTokenData));

            return data.access_token;
        } else {
            throw new Error("Failed to fetch access token: " + JSON.stringify(data));
        }
    }
    const SCRIPT = {};
    SCRIPT.landingpageNewScript = () => {
        $('.ldp-hero-tab-item').eq(0).addClass('active');
        $('.ldp-hero-content-item').eq(0).addClass('active');
        initAnimPath('.stak-tool-link-img', { duration: 6, delay: 3, fade: true });
        getEarnAPI();
        let videoPlayed1 = false;
        $('.ldp-vid-main').on('click', function (e) {
            e.preventDefault();
            if (!videoPlayed1) {
                $(this).find('video').attr('controls', 'true').removeAttr('muted').css('pointer-events', 'auto')
                $(this).removeClass('hover-img').css('pointer-events', 'none')
                $(this).find('.ldp-vid-ic').addClass('de-active')
                $(this).find('video').get(0).volume = 0.8;
                $(this).find('video').get(0).muted = !$(this).find('video').get(0).muted;
                videoPlayed1 = true;
            }
        })
        let videoPlayed2 = false;
        $('.ldp-potential-video-inner').on('click', function (e) {
            e.preventDefault();
            if (!videoPlayed2) {
                $(this).find('video').attr('controls', 'true').removeAttr('muted').css('pointer-events', 'auto')
                $(this).removeClass('hover-img').css('pointer-events', 'none')
                $(this).find('.ldp-potential-video-ic').addClass('de-active')
                $(this).find('video').get(0).volume = 0.8;
                $(this).find('video').get(0).muted = !$(this).find('video').get(0).muted;
                videoPlayed2 = true;
            }
        })
        function landingpageHero() {
            if(viewport.w > 991) {
                $('.ldp-hero-tab-item').hover(function() {
                    $('.ldp-hero-tab-item').removeClass('active');
                    $(this).addClass('active');
                    let index = $(this).index();
                    $('.ldp-hero-content-item').removeClass('active');
                    $('.ldp-hero-content-item').eq(index).addClass('active');
                })
            }
            else {
                $('.ldp-hero-tab-item').on('click', function() {
                    $('.ldp-hero-tab-item').removeClass('active');
                    $(this).addClass('active');
                    let index = $(this).index();
                    $('.ldp-hero-content-item').removeClass('active');
                    $('.ldp-hero-content-item').eq(index).addClass('active');
                    $('.ldp-hero-content-wrap').addClass('active');
                })
                $('.ldp-hero-content-close').on('click', function() {
                    $('.ldp-hero-content-wrap').removeClass('active');
                    $('.ldp-hero-tab-item').removeClass('active');
                })
                $('.ldp-hero-content-wrap').click(function(e) {
                    if (!$(e.target).closest('.ldp-hero-content').length) {
                        $(this).removeClass('active');
                        $('.ldp-hero-tab-item').removeClass('active');
                    }
                })
            }
        }
        landingpageHero();
        function landingpageNews() {
            const NewsPr = new Swiper('.ldp-news-pr .ldp-news-cms', {
                slidesPerView: 1,
                spaceBetween: parseRem(16),
                navigation: {
                    prevEl: '.ldp-news-pr .ldp-news-ic-prev',
                    nextEl: '.ldp-news-pr .ldp-news-ic-next',
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                        spaceBetween: parseRem(16),
                    },
                },
            })
            const NewsHub = new Swiper('.ldp-news-hub .ldp-news-cms', {
                slidesPerView: 1,
                spaceBetween: parseRem(16),
                navigation: {
                    prevEl: '.ldp-news-hub .ldp-news-ic-prev',
                    nextEl: '.ldp-news-hub .ldp-news-ic-next',
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                        spaceBetween: parseRem(16),
                    },
                },
            })
        }
        landingpageNews();
        function landingpageKol() {
            let isMobileView = window.innerWidth <= 767;
            $('.ldp-kol-list').addClass('swiper-wrapper');
            let swiperStaking = new Swiper('.ldp-kol-cms', {
                slidesPerView: 'auto',
                spaceBetween: parseRem(16),
                initialSlide: isMobileView ? 1 : 0,
                centeredSlides: isMobileView,
                loop: true,
                navigation: {
                    prevEl: '.ldp-kol-control-prev',
                    nextEl: '.ldp-kol-control-next',
                },
            })
        }

        landingpageKol();
        function landingpageToken() {
            $('.ldp-token-map svg path').hover(
                function () {
                    $('.ldp-token-map svg path').removeClass('active');
                    $(this).addClass('active');
                    let attr = $(this).attr('data-name');
                    $('.ldp-token-map-content-txt').removeClass('active');
                    $(`.ldp-token-map-content-txt[data-name=${attr}]`).addClass('active')
                },
                function () {
                    $('.ldp-token-map svg path').removeClass('active');
                    $('.ldp-token-map-content-txt').removeClass('active');
                    $('.ldp-token-map-content-txt.default').addClass('active')
                }
            )
        }
        if ($(window).innerWidth() > 991) {
            landingpageToken();
        }
        let all = $('.home-val-cus-ic-inner')
        gsap.to(all, { rotation: 360, duration: 3, stagger: .15, repeat: -1, ease: 'expo.inOut' })
        initAnimPath('.ldp-token-bg-top', { duration: 15, delay: 3 })
        initAnimPath('.ldp-token-bg-bot', { duration: 10, delay: 5 })
        initAnimPath('.stak-faq-deco', { duration: 10, delay: 4 })
        $('.ldp-part-main').each((idx, item) => {
            const width = $(item).find('.ldp-part-list').width();
            const length = Math.floor($(window).innerWidth() / width) + 1;
            for (var i = 0; i < length; i++) {
                let $originalListBrand = $(item).find('.ldp-part-list').eq(0);
                let $clonedListBrand = $originalListBrand.clone();
                $(item).append($clonedListBrand);
            }
            $(item).find('.ldp-part-list').addClass('anim')
        })
        lenis.on("scroll", function (inst) {
            if (inst.scroll > $(".ld-header").height() * 1.5) {
                if (inst.direction >= 1) {
                    $(".ld-header").addClass("on-hide");
                } else {
                    $(".ld-header").removeClass("on-hide");
                }
                $(".ld-header").addClass("on-scroll");

            } else {
                $(".ld-header").removeClass("on-scroll");
                $(".ld-header").removeClass("on-hide");
            }
        });
        $('.ldp-kol-item').on('click', function () {
            $('.ldp-kol-item video').each((idx, item) => {
                $(item)[0].pause();
            })
            $('.ldp-kol-item video').removeAttr('controls')
            $(this).find('.ldp-kol-item-control').addClass('de-active');
            $(this).find('video').attr('controls', 'true').removeAttr('muted').css('pointer-events', 'auto').attr('autoplay', 'true');
            $('.ldp-kol-item video').removeAttr('autoplay')
        })
    }
    
    const pageName = $(".main").attr("name-space");
    if (pageName) {
        console.log(`Running ${pageName} script`)
        SCRIPT[`${pageName}Script`]();
    }
    setTimeout(() => {
        AOS.init({
            offset: parseRem(100),
            duration: 600,
            once: true,
        });
    }, 100);

    //stop lenis
    lenis.stop();

    //reload lenis animations
    $(document).ready(function () { lenis.start(); })
}
window.document.addEventListener('DOMContentLoaded', mainScript);


