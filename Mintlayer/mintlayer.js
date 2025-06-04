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
    async function updateDownloadButton() {
        const repo = "mintlayer/mintlayer-core"; // Thay repo nếu cần
        const apiUrl = `https://api.github.com/repos/${repo}/releases/latest`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.assets && data.assets.length > 0) {
                const latestVersion = data.tag_name; // Lấy version mới nhất (vd: v0.5.1)
                $('.footer-download-link').attr('href', `https://github.com/mintlayer/mintlayer-core/releases/tag/${latestVersion}`);
            } else {
                console.error("No assets found for the latest release.");
            }
        } catch (error) {
            console.error("Error fetching latest release:", error);
        }
    }
    updateDownloadButton();

    function loadVideoIframe(className) {
        $(className).each(function () {
            var iframe = $(this);
            let links = $('.stake-wallet-vid-inner').attr('href') + '?&autoplay=1&mute=1';
            if (links) {
                iframe.attr('src', links);
            }
        });
    }
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

    function handleRenderAssetDownload({ data, version }) {
        const dowloadFilesList = document.querySelector('.download-hero-file-list')

        const handleConvertOs = (os) => {
            switch (os) {
                case 'linux':
                    return 'Linux'
                case 'macos':
                    return 'MacOS';
                case 'win':
                    return 'Windows';
                default:
                    return 'all'
            }
        }
        function extractChipFromFilename(url, os) {
            const urlSegments = url.split('/');
            const filename = urlSegments[urlSegments.length - 1];

            const chipRegex = /_(\w+)(?=\.\w+$|(?=\.\w+\.\w+$))/;
            const match = filename.match(chipRegex);

            const renderChip = (chip, os) => {
                switch (chip) {
                    case 'Setup':
                        return ''
                    case 'aarch64':
                        if (os === 'macos') {
                            return 'M1/2'
                        } else {
                            return 'aarch64'
                        }
                    default:
                        return chip
                }
            }

            if (match) {
                // return match[1] === 'Setup' ? 'Setup' : match[1];
                return renderChip(match[1], os)

            } else {
                return null;
            }
        }


        data.forEach(asset => {
            let $assetClone = $('.download-hero-file-item').eq(0).clone();
            const iconsWrap = $assetClone.find('.download-hero-file-item-ic-wrap');
            const { interface: inter, os, type, } = formatName(asset.name);

            const chip = extractChipFromFilename(asset.browser_download_url, os);

            iconsWrap.each(function () {
                const listIcons = $(this).find('.download-hero-file-item-ic');
                const z = $(this).data('ic-os');

                listIcons.each(function () {
                    if ($(this).data('ic-os') === os) {
                        $(this).removeClass('ic-hide');
                    } else {
                        $(this).addClass('ic-hide');
                    }
                });
            });

            $assetClone.attr('data-package', type);
            $assetClone.attr('data-system', handleConvertOs(os));
            $assetClone.attr('data-interface', inter);

            $assetClone.find('.dowload_interface').text(inter);
            $assetClone.find('.dowload_hash').text(asset.sha_256);
            $assetClone.find('.dowload_type').text(type);
            $assetClone.find('.dowload_chip').text(chip);
            $assetClone.find('.dowload_version').text(version.replace("v", ""));
            $assetClone.find('.dowload_tootltip_hash').text(asset.sha_256);
            $assetClone.find('.download-btn-link').attr('href', asset.browser_download_url);
            $assetClone.find('.dowload_size').text(fileSizeSI(asset.size));
            $assetClone.find('.dowload_date').text(new Date(asset.updated_at).toLocaleDateString('en-GB'));

            $('.download-hero-file-list').append($assetClone);
        });

        $('.download-hero-file-list').children().first().remove();
        // dowloadFilesList.removeChild(dowloadFilesList.firstChild);
    }
    function fileSizeSI(a, b, c, d, e) {
        return (b = Math, c = b.log, d = 1e3, e = c(a) / c(d) | 0, a / b.pow(d, e)).toFixed(2)
            + ' ' + (e ? 'kMGTPEZY'[--e] + 'B' : 'Bytes')
    }


    function drawHomeSvg() {

        const origin = { x: $(window).width() > 991 ? parseRem(118) : parseRem(50), y: 0 };

        const titleTop = $('.home-tech-top-title-wrap');
        const homeTechTop = $('.home-tech-top')
        const homeTechMid = $('.home-tech-mid')
        const homeTechBot = $('.home-tech-bot')
        const widthPath = $(window).width() > 991 ? parseRem(1075) : $(window).width() < 768 ? parseRem(270) : parseRem(710)

        const dataDk = [
            { x: origin.x + parseRem(190), y: origin.y },
            { x: origin.x + parseRem(190), y: titleTop.height() + parseRem(180) },
            { x: origin.x, y: titleTop.height() + parseRem(180) },
            { x: origin.x, y: parseRem(200) + homeTechTop.height() },
            { x: origin.x + widthPath, y: parseRem(200) + homeTechTop.height() },
            { x: origin.x + widthPath, y: parseRem(290) + homeTechMid.height() + homeTechTop.height() },
            { x: origin.x, y: parseRem(290) + homeTechMid.height() + homeTechTop.height() },
            { x: origin.x, y: parseRem(550) + homeTechMid.height() + homeTechTop.height() + homeTechBot.height() },
            { x: origin.x + widthPath / 2, y: parseRem(550) + homeTechMid.height() + homeTechTop.height() + homeTechBot.height() },
            { x: origin.x + widthPath / 2, y: parseRem(550) + homeTechMid.height() + homeTechTop.height() + homeTechBot.height() + parseRem(250) },
        ]
        const dataTb = [
            { x: origin.x + parseRem(90), y: origin.y },
            { x: origin.x + parseRem(90), y: titleTop.height() + parseRem(290) },
            { x: origin.x, y: titleTop.height() + parseRem(290) },
            { x: origin.x, y: parseRem(200) + homeTechTop.height() },
            { x: origin.x + widthPath, y: parseRem(200) + homeTechTop.height() },
            { x: origin.x + widthPath, y: parseRem(280) + homeTechMid.height() + homeTechTop.height() },
            { x: origin.x, y: parseRem(280) + homeTechMid.height() + homeTechTop.height() },
            { x: origin.x, y: parseRem(450) + homeTechMid.height() + homeTechTop.height() + homeTechBot.height() },
            { x: origin.x + widthPath / 2, y: parseRem(450) + homeTechMid.height() + homeTechTop.height() + homeTechBot.height() },
            { x: origin.x + widthPath / 2, y: parseRem(450) + homeTechMid.height() + homeTechTop.height() + homeTechBot.height() + parseRem(250) },
        ]
        const dataMb = [
            { x: origin.x + parseRem(140), y: origin.y },
            { x: origin.x + parseRem(140), y: parseRem(180) },
            { x: origin.x, y: parseRem(180) },
            { x: origin.x, y: parseRem(400) + homeTechTop.height() },
            { x: origin.x + widthPath, y: parseRem(400) + homeTechTop.height() },
            { x: origin.x + widthPath, y: parseRem(550) + homeTechMid.height() + homeTechTop.height() },
            { x: origin.x, y: parseRem(550) + homeTechMid.height() + homeTechTop.height() },
            { x: origin.x, y: parseRem(650) + homeTechMid.height() + homeTechTop.height() + homeTechBot.height() },
            { x: origin.x + widthPath / 2, y: parseRem(650) + homeTechMid.height() + homeTechTop.height() + homeTechBot.height() },
            { x: origin.x + widthPath / 2, y: parseRem(650) + homeTechMid.height() + homeTechTop.height() + homeTechBot.height() + parseRem(230) },
        ]

        let data
        let divide
        let strokeWidth
        let radius
        if ($(window).width() > 991) {
            data = dataDk
            divide = 'dk'
            strokeWidth = 60
            radius = 100
        } else if ($(window).width() > 767) {
            data = dataTb
            divide = 'tb'
            strokeWidth = 44
            radius = 45
        } else {
            data = dataMb
            divide = 'mb'
            strokeWidth = 42
            radius = 74
        }

        setUpDrawSvg({
            strokeWidth, dataPath: data, svgElement: '.home-tech-bg-svg',
            divide, radius, wrapper: '.home-tech-bg'
        })
    }

    function drawTechSvg() {
        const origin = { x: $(window).width() > 991 ? parseRem(118) : parseRem(50), y: 0 };

        const homeTechItemFirst = $('.tech-road-item').eq(0)
        const homeTechItemSecond = $('.tech-road-item').eq(1)
        console.log('homeTechItemFirst', homeTechItemFirst)
        const widthPath = $(window).width() > 991 ? parseRem(1075) : $(window).width() < 768 ? parseRem(270) : parseRem(710)

        const dataDk = [
            { x: origin.x + widthPath / 2 - parseRem(60) / 2, y: origin.y },
            { x: origin.x + widthPath / 2 - parseRem(60) / 2, y: parseRem(180) },
            { x: origin.x, y: parseRem(180) },
            { x: origin.x, y: parseRem(180) + homeTechItemFirst.height() + parseRem(270) },
            { x: origin.x + widthPath, y: parseRem(180) + homeTechItemFirst.height() + parseRem(270) },
            { x: origin.x + widthPath, y: parseRem(180) + homeTechItemFirst.height() + parseRem(270) + homeTechItemSecond.height() },
            { x: origin.x + widthPath - parseRem(200), y: parseRem(180) + homeTechItemFirst.height() + parseRem(270) + homeTechItemSecond.height() },
            { x: origin.x + widthPath - parseRem(200), y: parseRem(180) + homeTechItemFirst.height() + parseRem(270) + homeTechItemSecond.height() + parseRem(240) },
            { x: origin.x + widthPath / 2 - parseRem(240), y: parseRem(180) + homeTechItemFirst.height() + parseRem(270) + homeTechItemSecond.height() + parseRem(240) },
            { x: origin.x + widthPath / 2 - parseRem(240), y: parseRem(180) + homeTechItemFirst.height() + parseRem(270) + homeTechItemSecond.height() + parseRem(460) },

        ]
        const dataTb = [
            { x: origin.x + widthPath / 2, y: origin.y },
            { x: origin.x + widthPath / 2, y: parseRem(140) },
            { x: origin.x, y: parseRem(140) },
            { x: origin.x, y: parseRem(140) + homeTechItemFirst.height() + parseRem(200) },
            { x: origin.x + widthPath + parseRem(20), y: parseRem(140) + homeTechItemFirst.height() + parseRem(200) },
            { x: origin.x + widthPath + parseRem(20), y: parseRem(140) + homeTechItemFirst.height() + parseRem(300) + homeTechItemSecond.height() },
            { x: origin.x + widthPath - parseRem(85), y: parseRem(140) + homeTechItemFirst.height() + parseRem(300) + homeTechItemSecond.height() },
            { x: origin.x + widthPath - parseRem(85), y: parseRem(140) + homeTechItemFirst.height() + parseRem(300) + homeTechItemSecond.height() + parseRem(120) },
            { x: origin.x + widthPath / 2 - parseRem(150), y: parseRem(140) + homeTechItemFirst.height() + parseRem(300) + homeTechItemSecond.height() + parseRem(120) },
            { x: origin.x + widthPath / 2 - parseRem(150), y: parseRem(140) + homeTechItemFirst.height() + parseRem(300) + homeTechItemSecond.height() + parseRem(120) + parseRem(180) },
        ]

        const dataMb = [
            { x: origin.x + widthPath / 2 + parseRem(10), y: origin.y },
            { x: origin.x + widthPath / 2 + parseRem(10), y: parseRem(180) },
            { x: origin.x, y: parseRem(180) },
            { x: origin.x, y: parseRem(180) + homeTechItemFirst.height() + parseRem(130) },
            { x: origin.x + widthPath, y: parseRem(180) + homeTechItemFirst.height() + parseRem(130) },
            { x: origin.x + widthPath, y: parseRem(180) + homeTechItemFirst.height() + parseRem(260) + homeTechItemSecond.height() },
            { x: origin.x + widthPath - parseRem(140), y: parseRem(180) + homeTechItemFirst.height() + parseRem(260) + homeTechItemSecond.height() },
            { x: origin.x + widthPath - parseRem(140), y: parseRem(180) + homeTechItemFirst.height() + parseRem(260) + homeTechItemSecond.height() + parseRem(220) },
        ]

        let data
        let divide
        let strokeWidth
        let radius
        if ($(window).width() > 991) {
            data = dataDk
            divide = 'dk'
            strokeWidth = 60
            radius = 100
        } else if ($(window).width() > 767) {
            data = dataTb
            divide = 'tb'
            strokeWidth = 44
            radius = 45
        } else {
            data = dataMb
            divide = 'mb'
            strokeWidth = 42
            radius = 74
        }

        setUpDrawSvg({
            strokeWidth, dataPath: data, svgElement: '.tech-bg-svg',
            divide, radius, wrapper: '.tech-road-bg'
        })
    }
    function drawRoadSvg() {
        const origin = { x: $(window).width() > 991 ? parseRem(118) : parseRem(50), y: 0 };


        const widthPath = $(window).width() > 991 ? parseRem(1075) : $(window).width() < 768 ? parseRem(270) : parseRem(710)
        const $road_year_1 = $('.road-year-grp').eq(0)
        const $road_year_2 = $('.road-year-grp').eq(1)
        const $road_year_3 = $('.road-year-grp').eq(2)
        const $road_year_4 = $('.road-year-grp').eq(3)
        const $road_year_5 = $('.road-year-grp').eq(4)
        const $road_year_6 = $('.road-year-grp').eq(5)

        const dataDk = [
            { x: origin.x + widthPath / 2 - parseRem(30), y: origin.y },
            { x: origin.x + widthPath / 2 - parseRem(30), y: parseRem(190) },
            { x: origin.x + parseRem(70), y: parseRem(190) },
            { x: origin.x + parseRem(70), y: parseRem(190) + $road_year_1.height() + parseRem(230) },
            { x: origin.x + widthPath - parseRem(100), y: parseRem(200) + $road_year_1.height() + parseRem(230) },
            { x: origin.x + widthPath - parseRem(100), y: parseRem(200) + $road_year_1.height() + parseRem(230) + $road_year_2.height() / 2 + parseRem(100) },
            { x: origin.x + widthPath - parseRem(100) - parseRem(320), y: parseRem(200) + $road_year_1.height() + parseRem(230) + $road_year_2.height() / 2 + parseRem(100) },
            { x: origin.x + widthPath - parseRem(100) - parseRem(320), y: parseRem(200) + $road_year_1.height() + parseRem(230) + $road_year_2.height() + parseRem(200) },
            { x: origin.x + parseRem(70), y: parseRem(200) + $road_year_1.height() + parseRem(230) + $road_year_2.height() + parseRem(200) },
            { x: origin.x + parseRem(70), y: parseRem(200) + $road_year_1.height() + parseRem(230) + $road_year_2.height() + $road_year_3.height() + parseRem(200) + parseRem(220) },
            { x: origin.x + widthPath - parseRem(100), y: parseRem(200) + $road_year_1.height() + parseRem(230) + $road_year_2.height() + $road_year_3.height() + parseRem(200) + parseRem(220) },
            { x: origin.x + widthPath - parseRem(100), y: parseRem(200) + $road_year_1.height() + parseRem(230) + $road_year_2.height() + $road_year_3.height() + parseRem(200) + parseRem(220) + $road_year_4.height() + parseRem(390) },
            { x: origin.x + widthPath / 2 - parseRem(50), y: parseRem(200) + $road_year_1.height() + parseRem(230) + $road_year_2.height() + $road_year_3.height() + parseRem(200) + parseRem(220) + $road_year_4.height() + parseRem(390) },
            { x: origin.x + widthPath / 2 - parseRem(50), y: parseRem(200) + $road_year_1.height() + parseRem(230) + $road_year_2.height() + $road_year_3.height() + parseRem(200) + parseRem(220) + $road_year_4.height() + parseRem(185) },
            { x: origin.x + parseRem(70), y: parseRem(200) + $road_year_1.height() + parseRem(230) + $road_year_2.height() + $road_year_3.height() + parseRem(200) + parseRem(220) + $road_year_4.height() + parseRem(185) },
            { x: origin.x + parseRem(70), y: parseRem(200) + $road_year_1.height() + parseRem(230) + $road_year_2.height() + $road_year_3.height() + parseRem(200) + parseRem(220) + $road_year_4.height() + parseRem(160) + $road_year_5.height() + parseRem(330) },
            { x: origin.x + widthPath - parseRem(100), y: parseRem(200) + $road_year_1.height() + parseRem(230) + $road_year_2.height() + $road_year_3.height() + parseRem(200) + parseRem(220) + $road_year_4.height() + parseRem(160) + $road_year_5.height() + parseRem(330) },
            { x: origin.x + widthPath - parseRem(100), y: parseRem(200) + $road_year_1.height() + parseRem(230) + $road_year_2.height() + $road_year_3.height() + parseRem(200) + parseRem(220) + $road_year_4.height() + parseRem(160) + $road_year_5.height() + parseRem(330) + $road_year_6.height() + parseRem(190) },
        ]
        const dataTb = [
            { x: origin.x + widthPath / 2, y: origin.y },
            { x: origin.x + widthPath / 2, y: parseRem(190) },
            { x: origin.x, y: parseRem(190) },
            { x: origin.x, y: parseRem(190) + $road_year_1.height() + parseRem(190) },
            { x: origin.x + widthPath, y: parseRem(190) + $road_year_1.height() + parseRem(190) },
            { x: origin.x + widthPath, y: parseRem(190) + $road_year_1.height() + parseRem(190) + $road_year_2.height() / 2 + parseRem(120) },
            { x: origin.x + widthPath - parseRem(140), y: parseRem(190) + $road_year_1.height() + parseRem(190) + $road_year_2.height() / 2 + parseRem(150) },
            { x: origin.x + widthPath - parseRem(140), y: parseRem(190) + $road_year_1.height() + parseRem(190) + $road_year_2.height() + parseRem(210) },
            { x: origin.x, y: parseRem(190) + $road_year_1.height() + parseRem(190) + $road_year_2.height() + parseRem(200) },
            { x: origin.x, y: parseRem(190) + $road_year_1.height() + parseRem(190) + $road_year_2.height() + parseRem(200) + $road_year_3.height() + parseRem(220) },
            { x: origin.x + widthPath, y: parseRem(180) + $road_year_1.height() + parseRem(190) + $road_year_2.height() + parseRem(200) + $road_year_3.height() + parseRem(220) },
            { x: origin.x + widthPath, y: parseRem(180) + $road_year_1.height() + parseRem(190) + $road_year_2.height() + parseRem(200) + $road_year_3.height() + parseRem(220) + $road_year_4.height() + parseRem(290) },
            { x: origin.x + widthPath - parseRem(340), y: parseRem(180) + $road_year_1.height() + parseRem(190) + $road_year_2.height() + parseRem(200) + $road_year_3.height() + parseRem(220) + $road_year_4.height() + parseRem(290) },
            { x: origin.x + widthPath - parseRem(340), y: parseRem(180) + $road_year_1.height() + parseRem(190) + $road_year_2.height() + parseRem(200) + $road_year_3.height() + parseRem(220) + $road_year_4.height() + parseRem(185) },
            { x: origin.x, y: parseRem(180) + $road_year_1.height() + parseRem(190) + $road_year_2.height() + parseRem(200) + $road_year_3.height() + parseRem(220) + $road_year_4.height() + parseRem(185) },
            { x: origin.x, y: parseRem(180) + $road_year_1.height() + parseRem(190) + $road_year_2.height() + parseRem(200) + $road_year_3.height() + parseRem(220) + $road_year_4.height() + parseRem(185) + $road_year_5.height() + parseRem(280) },
            { x: origin.x + widthPath, y: parseRem(180) + $road_year_1.height() + parseRem(190) + $road_year_2.height() + parseRem(200) + $road_year_3.height() + parseRem(220) + $road_year_4.height() + parseRem(185) + $road_year_5.height() + parseRem(280) },
            { x: origin.x + widthPath, y: parseRem(180) + $road_year_1.height() + parseRem(190) + $road_year_2.height() + parseRem(200) + $road_year_3.height() + parseRem(220) + $road_year_4.height() + parseRem(185) + $road_year_5.height() + parseRem(280) + parseRem(530) },

        ]
        const dataMb = [
            { x: origin.x + widthPath / 2 + parseRem(15), y: origin.y },
            { x: origin.x + widthPath / 2 + parseRem(15), y: parseRem(180) },
            { x: origin.x, y: parseRem(180) },
            { x: origin.x, y: parseRem(180) + $road_year_1.height() + parseRem(140) },
            { x: origin.x + widthPath, y: parseRem(180) + $road_year_1.height() + parseRem(140) },
            { x: origin.x + widthPath, y: parseRem(180) + $road_year_1.height() + parseRem(140) + $road_year_2.height() + parseRem(120) },
            { x: origin.x, y: parseRem(180) + $road_year_1.height() + parseRem(140) + $road_year_2.height() + parseRem(120) },
            { x: origin.x, y: parseRem(180) + $road_year_1.height() + parseRem(140) + $road_year_2.height() + parseRem(120) + $road_year_3.height() + parseRem(110) },
            { x: origin.x + widthPath, y: parseRem(180) + $road_year_1.height() + parseRem(140) + $road_year_2.height() + parseRem(120) + $road_year_3.height() + parseRem(110) },
            { x: origin.x + widthPath, y: parseRem(180) + $road_year_1.height() + parseRem(140) + $road_year_2.height() + parseRem(120) + $road_year_3.height() + parseRem(110) + $road_year_4.height() + parseRem(140) },
            { x: origin.x, y: parseRem(180) + $road_year_1.height() + parseRem(140) + $road_year_2.height() + parseRem(120) + $road_year_3.height() + parseRem(110) + $road_year_4.height() + parseRem(140) },
            { x: origin.x, y: parseRem(180) + $road_year_1.height() + parseRem(140) + $road_year_2.height() + parseRem(120) + $road_year_3.height() + parseRem(110) + $road_year_4.height() + parseRem(140) + $road_year_5.height() + parseRem(150) },
            { x: origin.x + widthPath, y: parseRem(180) + $road_year_1.height() + parseRem(140) + $road_year_2.height() + parseRem(120) + $road_year_3.height() + parseRem(110) + $road_year_4.height() + parseRem(140) + $road_year_5.height() + parseRem(150) },
            { x: origin.x + widthPath, y: parseRem(180) + $road_year_1.height() + parseRem(140) + $road_year_2.height() + parseRem(120) + $road_year_3.height() + parseRem(110) + $road_year_4.height() + parseRem(140) + $road_year_5.height() + parseRem(150) + $road_year_6.height() + parseRem(160) },
        ]

        let data
        let divide
        let strokeWidth
        let radius
        if ($(window).width() > 991) {
            data = dataDk
            divide = 'dk'
            strokeWidth = 60
            radius = 80
        } else if ($(window).width() > 767) {
            data = dataTb
            divide = 'tb'
            strokeWidth = 44
            radius = 55
        } else {
            data = dataMb
            divide = 'mb'
            strokeWidth = 42
            radius = 74
        }

        setUpDrawSvg({
            strokeWidth, dataPath: data, svgElement: '.road-bg-svg',
            divide, radius, wrapper: '.road-year-bg'
        })
    }

    function initDrawSvg(data, svgPath, options = { strokeWidth: 60, radius: 100 }) {
        let totalHeight = data[data.length - 1]?.y
        console.log('totalHeight', totalHeight)
        console.log('$(svgPath)', $(svgPath))
        if (!totalHeight) return
        $(svgPath).find('linearGradient').attr('y2', totalHeight) // set gradient color full path

        const svg = d3.select(svgPath);

        const line = d3.line()
            .x(d => d.x)
            .y(d => d.y)
            .curve((context) => stepRound(context, options.radius));

        svg.append("path")
            .datum(data)
            .attr("d", line)
            .attr('stroke-width', options.strokeWidth)
            // .attr('stroke', 'url(#paint0_linear_807_26)')
            .attr('stroke', 'transparent')
            .attr('fill', 'transparent')
        // .attr('stroke', 'red') // show when debug

        const pathD = svg.select("path").attr("d");
        //draw after get d from path
        return {
            path: pathD,
            height: totalHeight,
        }
    }


    function setUpDrawSvg({ strokeWidth, dataPath, svgElement, divide, radius, wrapper }) {
        const { path, height } = initDrawSvg(dataPath, svgElement, { strokeWidth, radius }) || {}
        const svg = $(wrapper).find('[data-part]').parent().find('svg')
        console.log('svg', svg)
        if (!path) return

        svg.attr('width', '100%')
        svg.attr('height', '100%')

        // hide if debug
        svg.find('linearGradient').attr('y2', height)
        svg.removeAttr('viewBox')
        $(wrapper).find(`[data-part-device=${divide}]`).find('path[data-part="path"]').attr('d', path)
    }
    function initParticleAlongPath(triggerOptions, hideWhenComplete = true, reverse = false) {
        const { target: wrapEl } = triggerOptions;

        ScrollTrigger.create({
            trigger: wrapEl,
            start: 'top bottom',
            once: true,
            onEnter: () => onInitParticle()
        })

        function onInitParticle() {
            let device;
            if ($(window).width() > 991) {
                device = 'dk'
            } else if ($(window).width() > 767) {
                device = 'tb'
            } else {
                device = 'mb'
            }

            let isEntered = false;
            gsap.set(`${wrapEl} [data-part-device=${device}] [data-part="target"]`, {
                opacity: 0,
            })
            function setOpacity(isEntered) {
                gsap.to(`${wrapEl} [data-part-device=${device}] [data-part="target"]`, {
                    opacity: isEntered ? 1 : 0,
                    duration: .6,
                })
            }

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapEl,
                    start: 'top center',
                    end: 'bottom center',
                    scrub: 1,
                    onEnter: () => {
                        isEntered = true;
                        setOpacity(isEntered);
                    },
                    onEnterBack: () => {
                        isEntered = true;
                        setOpacity(isEntered);
                    },
                    onLeave: () => {
                        if (hideWhenComplete) {
                            isEntered = false;
                            setOpacity(isEntered);
                        }
                    },
                    onLeaveBack: () => {
                        isEntered = false;
                        setOpacity(isEntered);
                    },
                    ...triggerOptions,
                },
                defaults: { ease: "none" }
            })
            if (reverse) {
                tl
                    .from(`${wrapEl} [data-part-device=${device}] [data-part="target"]`, {
                        motionPath: {
                            path: `${wrapEl} [data-part-device=${device}] [data-part="path"]`,
                            align: `${wrapEl} [data-part-device=${device}] [data-part="path"]`,
                            alignOrigin: [0.5, 0.5],
                            autoRotate: true
                        }
                    },)
            } else {
                tl
                    .to(`${wrapEl} [data-part-device=${device}] [data-part="target"]`, {
                        motionPath: {
                            path: `${wrapEl} [data-part-device=${device}] [data-part="path"]`,
                            align: `${wrapEl} [data-part-device=${device}] [data-part="path"]`,
                            alignOrigin: [0.5, 0.5],
                            autoRotate: true
                        }
                    },)
            }

            let canvas = $(`${wrapEl} [data-part-device=${device}]`).find('[data-part="canvas"]').get(0);

            let ctx = canvas.getContext("2d");

            function setCanvasSize() {
                ctx.canvas.width = canvas.clientWidth;
                ctx.canvas.height = canvas.clientHeight;
            }
            setCanvasSize()

            $(window).resize(function () {
                setCanvasSize()
            })

            let particles = [];

            let spawnTimer = 0;
            let spawnFreq = 100; // how often should particles spawn (ms)
            let spawnRate = 2; // how many should spawn

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
                const x = $(`${wrapEl} [data-part-device=${device}] [data-part="target"]`).offset().left - $(`${wrapEl} [data-part-device=${device}] [data-part="canvas"]`).offset().left + $(`${wrapEl} [data-part-device=${device}] [data-part="target"]`).get(0).getBoundingClientRect().width / 2;
                const y = $(`${wrapEl} [data-part-device=${device}] [data-part="target"]`).offset().top - $(`${wrapEl} [data-part-device=${device}] [data-part="canvas"]`).offset().top + $(`${wrapEl} [data-part-device=${device}] [data-part="target"]`).get(0).getBoundingClientRect().height / 2

                spawnTimer -= deltaTime;

                while (spawnTimer <= 0) {

                    spawnTimer += spawnFreq;

                    let i = spawnRate;
                    while (i--) {
                        if (!isEntered) return;
                        particles.push(new Particle(x, y, ctx));
                    }
                }
            });
        }
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
    function handleOpenJobPosition() {
        const jobPosition = window.location.href.split('#')
        if (jobPosition.length < 2) return

        if ($('.accord-item-wrap').length > 1) {
            $('.accord-item-wrap').each((_, item) => {
                const text = $(item).find('.accord-item-head-main').text().trim().toLowerCase().replace(/\s+/g, '-');
                const $accordContent = $(item).find('.accord-item-body');
                if (jobPosition[1].includes(text)) {

                    $('.accord-item-wrap').removeClass('active');
                    $('.accord-item-body').slideUp()
                    $(item).addClass('active');
                    $accordContent.slideDown();
                }
            })
            AOS.refresh()
        }
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
    function formatNumber(number) {
        const roundedNumber = Math.ceil(number);
        const formattedNumber = roundedNumber.toLocaleString('en-US');
        return formattedNumber;
    }
    function formatNumberWithSpaces(number) {
        const roundedNumber = Math.ceil(number);
        if (number > 1000) {
            const formattedNumber = new Intl.NumberFormat('fr-FR', {
                useGrouping: true
            }).format(number);

            return formattedNumber;
        }
        else {
            return number;
        }
    }
    const SERVICE_ACCOUNT = {
        "type": "service_account",
        "project_id": "minlayer",
        "private_key_id": "624ebff39c4b8b35d608b2c0f041866df136d09a",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDBQ0t4+sYw9i0q\nI4hPopJuW/nsBP3wV/SRvvSZEqvi71XdUSjtJfv/J99WF8MdkHUTkniQFzraoYcp\nloQsksoms3v+ri5b1l3or2uBlUz6OO+Idz7BD05a8oa17VF+PvwpnbYw0HroNolR\nqHWsZy02bDMgZsrUF6bhaPrd/7VZDFrz0hUvnlGXTb187W0Qx7PAVba6rI2EkJoM\nyxHXeyW7WphZOcT0KOsGsxy67eI9tE81Dx19WW/NjU3zoe/F7P+bJssT60ulMmBY\nwIAHk4oi3SZ963HuF/Q/LB34eIWylz5AUXeogyyGg1XmqUjjjqGj7+Q6j2bIU95x\nXSrzglc5AgMBAAECggEAF9+oAlcaJgC3FhJDG7FFvPfEMQVx2B+JYPqxjPo7PQKb\nPQZyU49CaKPkiSZQzkVizQrmNUiFVu4mu/qxs67jZXH9EnoyVFpwCdcnpN+MXYms\nf1NZr3AkWgRFI1KgY0PFEx/+GlwanrZj8rAobyZktakajLld+2K7lPNKsCNPI+N1\nNzHxptNjKEOwLxq6+HMbPVpKhMd1LAafOGna5tHGxND+hcNgF8g4itmPLgToQZ6b\n0kplrrA8XmRpurrHrFzFjBaETCn4Youtbziie2vafw9UMWRnAv32m4MaPsPmuDPb\nOGEXTm/I+hi5vbeJ8jWb49MUWXfk+b6vW0K2lcW1gQKBgQD7gwp/lubxGbu/jOPz\nKvsKR1CRWRTAKTiqbfJXT8sMUKfaq9MDZ0FG5JNsBre/3Re2BL3K+t0INrgWUQoN\ndPoNDo62fQMYjKkQz0p6mHQb0VglgBerh49pwJ61zBQMeA9UGj8WtEUOBCVHTYRB\nPBcZ4D60wbS3axBPesJuvyH2eQKBgQDEtij9zf9TB982ni3zAJ63xFdz+WysBTR/\nDfxpVhNziwnpKB6v7qcjhrt9FE55YhgjPl3UWFI8S5akcr3hYP2jbbzB0oNXV237\nf3+AUkwLKfl1PbctJm3tpv9g66KF/BFuY/H+Do6JE9oGxhHq3OHAdsQM0j+dZBbN\niT9ARbo2wQKBgQDF0I38RdqDvIKfKJfMlHx33BkxCEg6zvEDko/tPhPsLq+mXEgN\nwDNmJ7cPWsVAwQq6HUaNE/uuTyNAYiKu7NcSV+XE/9PkhhUe5Hqmq6t+iYtziyiS\nv377ZQUu5UDLgc5EjpQaLlS1rmsHhp9Dk5hzwJxxHH0fWbStXlb4NZnnuQKBgEzv\ncdjSWKoAyixycUY5V9pH0GxrgTVGU+Hddns8Tx9Bof6u0lG85WHfsDSbXJXc59Pg\n8JG8eW1bou9ucRVU+d6RbOHhk7z1VO6oTxXBGjzDje1s1dey0AvC5N7jSg1dKPQj\n4uGaj+TM/tjnXtqcyS6dRNA+6uKD4udAZpycqNgBAoGBAKa+oBAJyrrjo3IuFgJn\nT1gDPro7ByNyI5BtIlnghjQV6EJu7TM1oPGPCQDWXsIGQ9blTheFHdt/srQSjc18\nVeqakczdcE3Jfu1Ejn5Jcbx/dHNFdvtELqv0ICh5u+c1B5t3eFm5zqwgpEeK/Xpv\nakWJN/0wpq2on3qZYOjC4MVo\n-----END PRIVATE KEY-----\n",
        "client_email": "minlayer@minlayer.iam.gserviceaccount.com",
        "client_id": "110317719097150919932",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/minlayer%40minlayer.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
    };
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


    async function uploadFile(file) {
        try {
            const accessToken = await getAccessToken();
            const metadata = {
                name: file.name,
                mimeType: file.type,
                parents: ["1KlXjm6T725YTbb3YaMPemhjyVPMWR4tw"]
            };
            const formData = new FormData();
            formData.append(
                "metadata",
                new Blob([JSON.stringify(metadata)], { type: "application/json" })
            );
            formData.append("file", file);
            const response = await fetch(
                "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
                {
                    method: "POST",
                    headers: { Authorization: `Bearer ${accessToken}` },
                    body: formData
                }
            );
            const data = await response.json();
            let link_file = 'https://drive.google.com/file/d/' + data.id;
            return link_file;
        } catch (error) {
            console.error("Error uploading file:", error);
            return false;
        }
    }
    const MAX_FILE_SIZE = 15 * 1024 * 1024;
    function validateFileUpload(inputElement, files) {
        let flag = true;
        let fileNameValidation = '';
        if (files.length > 5) {
            $(inputElement).closest('.file-input-wrap').find('.f-input-error').text('You can only upload a maximum of 5 files.');
            flag = false;
        } else {
            Array.from(files).forEach((item) => {
                if (item.size > MAX_FILE_SIZE) {
                    fileNameValidation += item.name + ', ';
                    flag = false;
                }
            });
            if (fileNameValidation) {
                $(inputElement).closest('.file-input-wrap').find('.f-input-error').text('The following files are larger than 15MB: ' + fileNameValidation);
            } else {
                $(inputElement).closest('.file-input-wrap').find('.f-input-error').text('');
            }
        }

        return flag;
    }
    const fileItemTemplate = $(".file-input-data-item").eq(0).clone();
    $(".file-input-data-item").remove();
    $('.file-input').each((idx, item) => {
        $(item).on('change', function (event) {
            const fileWrap = $(item).closest('.file-input-wrap').find(".file-input-data-wrap");
            fileWrap.empty();
            let inputElement = event.target;
            let files = event.target.files;
            let validationUpload = validateFileUpload(inputElement, files);
            $(inputElement).data('valid', validationUpload);
            if (validationUpload) {
                Array.from(files).forEach((file, index) => {
                    const newItem = fileItemTemplate.clone();
                    $(newItem).find('.file-input-data-item-txt').text(file.name);
                    $(newItem).attr('data-file-index', index);
                    fileWrap.append(newItem);
                });
            }

        });
        $(document).on('click', '.file-input-data-item-ic', function () {
            const fileWrap = $(this).closest('.file-input-data-wrap');
            const index = $(this).closest('.file-input-data-item').data('file-index'); // Lấy index của file

            // Xóa item khỏi giao diện
            $(this).closest('.file-input-data-item').remove();

            // Cập nhật lại danh sách file của input
            const inputElement = fileWrap.closest('.file-input-wrap').find('.file-input')[0];
            const dt = new DataTransfer();
            const currentFiles = inputElement.files;

            for (let i = 0; i < currentFiles.length; i++) {
                if (i !== index) {
                    dt.items.add(currentFiles[i]);
                }
            }
            inputElement.files = dt.files;
        });
    })

    class FormSubmit {
        constructor(form) {
            this.DOM = {
                form: form,
            };
            this.fortmatForm = {
                REGEXP: {
                    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                },

                ERROR_MESSAGE: {
                    required: name => `Please fill the ${name} field`,
                    regexp: "Field not like format",
                },
            };
            this.isLastStep = false
            this.formHandler();
            this.validUpload = false;
        }
        required = message => ({
            message,
            required: true,
        });
        regexp = (pattern, message) => ({
            regexp: pattern,
            message,
        });
        mapFormToObject(form) {
            const parsedFormData = Array.from(form.elements).reduce((prev, field) => {
                const { name, value } = field;
                const dataName = field.dataset.name;

                return {
                    ...prev,
                    [name]: {
                        value,
                        name: dataName || name,
                        validType: [],
                    },
                };
            }, {});
            return parsedFormData;
        }

        mapObjectFormToValidate(form, obj) {
            const parsedFormData = Object.entries(obj).reduce((prev, cur) => {
                const name = cur[0];
                const val = cur[1];
                let validArr = val.validType;
                const formEl = Array.from(form.elements);
                for (const field of formEl) {
                    const fieldName = field.name;
                    const fieldType = field.type;
                    const fieldRequired = field.required || false;
                    const REGEXP_TYPE = ["email", "phone"];

                    if (name === fieldName) {
                        if (fieldRequired) {
                            const CusMessage = field.getAttribute("mess-required");
                            validArr.unshift(this.required(CusMessage));
                        }
                        if (REGEXP_TYPE.includes(fieldType)) {
                            const CusMessage = field.getAttribute("mess-regexp");
                            const CusRegexp = field.getAttribute("cus-regexp");
                            validArr.unshift(this.regexp(CusRegexp || fieldType, CusMessage));
                        }
                    }
                }
                return { ...prev, [name]: val };
            }, {});
            return parsedFormData;
        }

        validateForm({ formsObj: forms, rules }) {
            const errorObj = {};
            for (let name in rules) {
                for (let rule of rules[name].validType) {
                    if (rule.required) {
                        if (!forms[name].value.trim() || forms[name].value.trim() == "false") {
                            errorObj[name] = rule.message || this.fortmatForm.ERROR_MESSAGE.required(forms[name].name);
                        }
                    }
                    if (rule.regexp && forms[name]) {
                        let regexp = rule.regexp;
                        if (regexp in this.fortmatForm.REGEXP) {
                            regexp = new RegExp(this.fortmatForm.REGEXP[regexp]);
                        }
                        if (!regexp.test(forms[name].value.trim())) {
                            errorObj[name] = rule.message || this.fortmatForm.ERROR_MESSAGE.regexp;
                        }
                    }
                }
            }
            return {
                errorObj,
                isValidated: Object.keys(errorObj).length === 0,
            };
        }
        submitForm(reInit) {
            reInit?.();


            let success = {
                status: false,
                // title: this.DOM.form.getAttribute('data-title-succ') || '',
                // sub: this.DOM.form.getAttribute('data-sub-succ') || '',
                // cap: this.DOM.form.getAttribute('data-cap-succ') || '',
            };
            const formsObj = this.mapFormToObject(this.DOM.form);
            const rules = this.mapObjectFormToValidate(this.DOM.form, formsObj);

            const { errorObj, isValidated } = this.validateForm({
                formsObj: formsObj,
                rules: rules,
            });

            if (isValidated) {
                success.status = true;
                return { success };
            } else {
                success.status = false;
                return { errorObj, success };
            }
        }
        reInitForm() {
            const listFormSubmit = this.DOM?.form?.querySelectorAll('.f-input-hide')
            listFormSubmit.forEach(inputHide => {
                const listInputRadio = inputHide.parentElement.querySelectorAll('input[type="radio"]');
                const listInputCheckbox = inputHide.parentElement.querySelectorAll('input[type="checkbox"]');

                if (listInputRadio.length > 0) {
                    const checkedRadio = Array.from(listInputRadio).find(radio => radio.checked);
                    const checkBoxOrther = inputHide.parentElement.querySelector('.f-input-orther-sp');

                    if (checkedRadio) {
                        const label = checkedRadio?.parentElement.querySelector('.w-form-label');
                        if (label) {
                            if (checkBoxOrther) {
                                inputHide.value = label.textContent + ' ' + checkBoxOrther.value;
                            } else {
                                inputHide.value = label.textContent;
                            }
                        }
                    } else {
                        inputHide.value = '';
                    }
                }
                if (listInputCheckbox.length > 0) {
                    const checkboxData = [];
                    const checkedCheckbox = Array.from(listInputCheckbox).filter(checkbox => checkbox.checked);
                    if (checkedCheckbox.length > 0) {
                        checkedCheckbox.forEach((checkbox) => {
                            const checkBoxOrther = inputHide.parentElement.querySelector('.f-input-orther-sp');
                            let label = checkbox?.parentElement.querySelector('.w-form-label')?.textContent;


                            if (checkbox.name = 'orther-checkbox') {
                                if (label === 'Other (Please specify):') {
                                    label = checkBoxOrther.value ? label += checkBoxOrther.value : '';
                                }
                                inputHide.value = label;
                            } else {
                                inputHide.value = checkboxData.join(',');
                            }
                            checkboxData.push(label);
                        });
                    } else {
                        inputHide.value = '';
                    }
                }
            });
        }
        async checkValidateAction(e) {
            const { errorObj: errors, success } = this.submitForm(this.reInitForm.bind(this));
            let isValid = true;
            $('.file-input').each((idx, item) => {
                const validStatus = $(item).data('valid') ?? false;
                if ($(item).data('valid') === false) {
                    isValid = false;
                }
            });
            console.log(isValid)
            console.log(this.isLastStep)
            if (isValid && this.isLastStep && !this.validUpload) {
                $(".f-form-heading-action-btn-submit .btn-mint").text('Uploading...');
                $('.f-form-loading').addClass('active')
                e && e.preventDefault()
                await Promise.all(
                    $(".file-input")
                        .map(async (idx, item) => {
                            const files = item.files;
                            const links = [];

                            for (const file of files) {
                                const link = await uploadFile(file); // Gọi API upload file
                                if (link) {
                                    links.push(link); // Thêm link vào mảng
                                }
                            }

                            // Gắn link vào input kế tiếp
                            $(item).next(".fileInputLink").val(links.join(", "));
                        })
                        .get()
                );

                // Sau khi upload xong, kiểm tra trạng thái submit form
                if (success.status) {
                    $(".fileInputLink").each((idx, item) => {
                        console.log($(item).val()); // In ra tất cả các link
                    });
                }
                this.validUpload = true;
                $(".f-form-heading-action-btn-submit .btn-mint").text('Sending...');
                this.DOM.form.querySelector(".f-form-btn-submit").click();
            }

            if (success.status && this.validUpload) {
                // console.log('---------------')
                $(".fileInputLink").each((idx, item) => {
                    console.log($(item).val())
                })
                if (this.isLastStep) {
                    const inputs = this.DOM.form.querySelectorAll('input[type="checkbox"], input[type="radio"], input[name="Checkbox-Other"]');
                    let inputFile = $('.file-input');
                    inputs.forEach(input => {
                        input.remove()
                    });
                    inputFile.each((idx, item) => {
                        item.remove();
                    })
                    this.reset();

                    setTimeout(() => {
                        this.DOM.form.reset();
                        $(".f-form-heading-action-btn-submit .btn-mint").text('Sent');
                        $('.f-form-loading').removeClass('active')
                        document.querySelector('.f-form-success-txt-inner').classList.add('anim-inside')
                        document.querySelector('.f-heading').remove()
                    }, 300);
                }
            } else {
                e && e.preventDefault(); // check is button submit form skip submit action

            }
            this.active(errors);

            return success.status
        }
        formHandler() {
            this.inputInteractionInit();

            const btnSubmit = this.DOM.form.querySelector(".f-form-btn-submit");
            if (!btnSubmit) return;
            btnSubmit.addEventListener("click", (e) => {
                this.isLastStep = true
                this.checkValidateAction(e)
            });

        }

        inputInteractionInit() {
            //Init input action
            this.DOM.form?.querySelectorAll(".f-input-wrap .f-input-inner").forEach(item => {

                item.addEventListener("focus", () => {
                    item.parentElement?.classList.add("active");
                });
                item.addEventListener("blur", () => {
                    item.parentElement?.classList.remove("active");
                });
                item.addEventListener("keyup", () => {
                    if (item?.value != "") {
                        item.parentElement?.classList.add("filled");
                    } else {
                        item.parentElement?.classList.remove("filled");
                    }
                });
                item.addEventListener("change", () => {
                    if (item?.value != "") {
                        item.parentElement?.classList.add("filled");
                    } else {
                        item.parentElement?.classList.remove("filled");
                    }
                });
            });

            //follow list check box

            const listCheckBoxs = this.DOM.form.querySelectorAll('.f-input-checkbox-wrap')

            listCheckBoxs.forEach(listCheckBox => {
                listCheckBox.querySelectorAll('input[type="checkbox"]').forEach((item, _, args) => {
                    item.addEventListener("change", () => {
                        if (item.name === 'orther-checkbox' && item.checked) {
                            args.forEach((arg) => {
                                if (arg.name !== 'orther-checkbox') {
                                    const icWrap = arg.parentElement.querySelector('.f-input-checkbox-item-ic')
                                    arg.checked = false;
                                    icWrap.classList.remove('w--redirected-checked')
                                }
                            })
                        } else if (item.name !== 'orther-checkbox' && item.checked) {
                            args.forEach((arg) => {
                                if (arg.name === 'orther-checkbox') {
                                    const icWrap = arg.parentElement.querySelector('.f-input-checkbox-item-ic')
                                    arg.checked = false;
                                    icWrap.classList.remove('w--redirected-checked')
                                }
                            })
                        }
                    });
                })
            })

            //Init error  message
            this.DOM.form.querySelectorAll(".f-input-wrap").forEach(item => {
                item.id = item.getAttribute("name");
                const errorSpan = document.createElement("div");
                errorSpan.classList.add("txt-semi", "txt-12", "f-input-error");
                errorSpan.innerHTML = "";
                item.appendChild(errorSpan);
                gsap.set(errorSpan, { height: 0 });
            });

            //Phone input validate
            this.DOM.form.querySelector('[type="tel"]')?.addEventListener("input", e => {
                if (!(e.target instanceof HTMLInputElement)) return;
                let newValue = e.currentTarget.value.replace(new RegExp(/[^\d-.+ ]/, "ig"), "");
                e.currentTarget.value = newValue;
            });
        }
        active(errors) {
            if (!this.DOM.form) return;
            let firstErrorInput = null;
            const listInput = this.DOM.form.querySelectorAll(".f-input-wrap .f-input-inner")

            listInput.forEach((input, index) => {
                let errorEl = input.parentElement?.querySelector(".f-input-error");

                if (errors?.hasOwnProperty(input.getAttribute("name"))) {
                    if (!firstErrorInput) {
                        firstErrorInput = input;
                    }
                    gsap.to(errorEl, {
                        duration: 0.8,
                        ease: "power3",
                        height: "auto",
                        overwrite: 'auto'
                    });
                    errorEl.innerHTML = errors[input.getAttribute("name")];
                    input.style.borderColor = "var(--red)";

                } else {
                    gsap.to(errorEl, {
                        duration: 0.8,
                        ease: "power3",
                        height: "0",
                        overwrite: 'auto',

                        onComplete: () => {
                            if (!errorEl) return
                            errorEl.innerHTML = "";
                        },
                    });
                    input.style.borderColor = "var(--border-lm-sf-03)";
                }
                if (firstErrorInput) {
                    lenis.scrollTo(firstErrorInput, {
                        offset: parseRem(-300),
                        duration: 0.6, onComplete: () => {
                            firstErrorInput = null
                        }
                    });
                }
            });
        }
        reset() {
            Array.from(this.DOM.form.querySelectorAll(".f-input-wrap .f-input-inner")).forEach(node => {
                let errorEl = node.parentElement?.lastChild;
                if (!errorEl) return;

                gsap.to(errorEl, {
                    duration: 0.8,
                    ease: "power3",
                    height: "0",
                    onComplete: () => {
                        errorEl.innerHTML = "";
                    },
                });
            });
        }
    }



    const SCRIPT = {};
    SCRIPT.homeScript = () => {
        let videoPlayed = false
        getEarnAPI();
        $('.home-hero-vid-inner').on('click', function (e) {
            e.preventDefault();
            if (!videoPlayed) {
                $(this).find('video').attr('controls', 'true').removeAttr('muted').css('pointer-events', 'auto')
                $(this).removeClass('hover-img').css('pointer-events', 'none')
                $(this).find('.stake-wrallet-vid-ic').addClass('de-active')
                $(this).find('video').get(0).volume = 0.8;
                $(this).find('video').get(0).muted = !$(this).find('video').get(0).muted;
                videoPlayed = true;
            }
        })
        // if ( $(window).width() > 767 ) {
        const homeNewsSwiper = new Swiper('.home-news-cms', {
            slidesPerView: 1,
            spaceBetween: parseRem(16),
            navigation: {
                prevEl: '.home-news-nav-prev',
                nextEl: '.home-news-nav-next',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: parseRem(16),
                },
            },
        })
        // }

        drawHomeSvg()

        initParticleAlongPath({ target: '.home-token-bg' }, true, true);
        initParticleAlongPath({ target: '.home-tech-bg' }, false);

        $('.home-token-bg-wrap svg circle').each((_, item) => {
            gsap.set(item, { opacity: 0 })
            gsap.to(item, {
                opacity: 1, duration: .3, ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top center',
                    end: 'bottom center',
                    scrub: 1
                }
            })
        })

        $('.home-cta-main').addClass('default')
        ScrollTrigger.create({
            trigger: '.home-cta-main',
            start: 'top center',
            end: 'bottom center',
            onEnter: () => $('.home-cta-main').removeClass('default'),
            onEnterBack: () => $('.home-cta-main').removeClass('default'),
            onLeave: () => $('.home-cta-main').addClass('default'),
            onLeaveBack: () => $('.home-cta-main').addClass('default'),
            scrub: true
        })

        gsap.set('.home-tech', { "background-color": '#454646' })
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-tech',
                start: 'top center',
                end: 'bottom bottom',
                scrub: 1,
            },
            defaults: { ease: "none" }
        })
        tl
            .to('.home-tech', {
                "background-color": '#202120'
            })
            .to('.home-tech', {
                "background-color": '#000000'
            })

        const joinCommunityMode = {
            dark: () => {
                if ($('.home-join').hasClass('dark-mode')) {
                    $('.home-join').removeClass('dark-mode');
                    $('.home-news').removeClass('dark-mode');
                    $('.home-news-main-grad').removeClass('dark-mode');
                    $('.home-news-item-title-link').removeClass('dark-mode');
                    $('.home-news-item-sub').removeClass('dark-mode');
                    $('.btn-ic-grey-light').removeClass('dark-mode')
                    $('.footer-custom-bg').removeClass('bg-black');
                    $('.home-tech').addClass('light-mode');
                }
            },
            light: () => {
                if (!$('.home-join').hasClass('dark-mode')) {
                    $('.home-join').addClass('dark-mode');
                    $('.home-news').addClass('dark-mode');
                    $('.home-news-main-grad').addClass('dark-mode');
                    $('.home-news-item-title-link').addClass('dark-mode');
                    $('.home-news-item-sub').addClass('dark-mode');
                    $('.btn-ic-grey-light').addClass('dark-mode')
                    $('.footer-custom-bg').addClass('bg-black');
                    $('.home-tech').removeClass('light-mode');
                }
            }
        }

        ScrollTrigger.create({
            trigger: '.home-join',
            start: 'top center',
            end: 'bottom center',
            endTrigger: '.footer',
            scrub: true,
            onEnter: joinCommunityMode.dark,
            onEnterBack: joinCommunityMode.dark,
            onLeave: joinCommunityMode.light,
            onLeaveBack: joinCommunityMode.light
        })

        let all = $('.home-val-cus-ic-inner')
        gsap.to(all, { rotation: 360, duration: 3, stagger: .15, repeat: -1, ease: 'expo.inOut' })

        let doneInit = false;
        function initLoop() {
            console.log('checking')
            if ($('.home-hero-title').hasClass('anim-inside')) {
                setTimeout(() => {
                    // console.log('anim')
                    // let tl = gsap.timeline({
                    //     repeat: -1
                    // })
                    // tl
                    // .fromTo($('.home-hero-title .ic-lock path').eq(1), {x: 0, rotation: '0deg'}, {x: -1, rotation: '29deg', duration: .5})

                }, 1000);
            } else {
                requestAnimationFrame(initLoop)
            }
        }
        requestAnimationFrame(initLoop)
    }
    SCRIPT.aboutScript = () => {
        initAnimPath('.abt-hero-bg', { duration: 8, delay: 2 });
        initAnimPath('.abt-abt-bg', { duration: 8, delay: 1.5 });
        initAnimPath('.abt-ques-bg', { duration: 6, delay: 1.5 });

        function particleIllus() {
            let canvas = $(`.abt-abt-illu [data-part="canvas"]`).get(0);
            let ctx = canvas.getContext("2d");

            function setCanvasSize() {
                ctx.canvas.width = canvas.clientWidth;
                ctx.canvas.height = canvas.clientHeight;
            }
            setCanvasSize()

            $(window).resize(function () {
                setCanvasSize()
            })
            let particles = [];
            let spawnTimer = 0;
            let spawnFreq = 100; // how often should particles spawn (ms)
            let spawnRate = 2; // how many should spawn

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
                const x = $(`.abt-abt-illu [data-part="target"]`).offset().left - $('.abt-abt-illu [data-part="canvas"]').offset().left + $('.abt-abt-illu [data-part="target"]').get(0).getBoundingClientRect().width / 2;
                const y = $(`.abt-abt-illu [data-part="target"]`).offset().top - $('.abt-abt-illu [data-part="canvas"]').offset().top + $('.abt-abt-illu [data-part="target"]').get(0).getBoundingClientRect().height / 2

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
        particleIllus();
    }
    SCRIPT.stakingScript = () => {
        loadVideoIframe('.stake-wallet-vid-iframe');
        initAnimPath('.stak-tool-link-img', { duration: 6, delay: 3, fade: true });
        getEarnAPI();
    }
    SCRIPT.blogScript = () => {
        initAnimPath('.blog-hero-bg-left', { duration: 15, delay: 3 })
        initAnimPath('.blog-hero-bg-right', { duration: 10, delay: 5 })
        initAnimPath('.glob-cta-illu', {
            duration: 10, delay: 1.5,
            onUpdate: function () {
                const FadingByIndex = (index, { start, end }) => {
                    let el = this.targets()[0];
                    if (index == el.getAttribute('data-dot-index')) {
                        if (this.ratio > start || this.ratio < end) gsap.to(el, { opacity: 1, duration: 0.3, scale: 1, ease: 'linear' })
                        else gsap.to(el, { opacity: 0, duration: 0.3, scale: 0, ease: 'linear' })
                    }
                }
                FadingByIndex(1, { start: .85, end: .62 });
                FadingByIndex(2, { start: .85, end: .62 });
                FadingByIndex(3, { start: .58, end: .35 });
            }
        })
        // const blogSwiperAll = new Swiper('.blog-main-cms', {
        //     slidesPerView: 1,
        //     spaceBetween: parseRem(16),
        //     slidesPerGroup: 1,
        //     speed: 800,
        //     grid: {
        //         rows: 6,
        //       },
        //     mousewheel: {
        //         enabled: true,
        //         forceToAxis: true,
        //     },
        //     loopFillGroupWithBlank: true,
        //     pagination: {
        //         el: $('.blog-hero .blog-main-pagi ').get(0),
        //         renderBullet: function (index, className) {
        //          return '<span class="' + className + '">' + (index + 1) + "</span>";
        //            },
        //         clickable: true,
        //     },
        //     breakpoints: {
        //         768: {
        //         slidesPerView: 3,
        //         slidesPerGroup: 3,
        //             grid: {
        //                 rows: 2,
        //               },
        //         },
        //     },

        // })
    }
    SCRIPT.ecosystemScript = () => {
        initAnimPath('.eco-hero-illu-wrap', {
            duration: 10, delay: 2,
            onUpdate: function () {
                let dot = this.targets()[0];
                if (this.ratio > 0.02 && this.ratio < 0.96) gsap.to(dot, { opacity: 1, duration: 0.4, scale: 1, ease: 'linear' })
                else gsap.to(dot, { opacity: 0, duration: 0.4, scale: .3, ease: 'linear' })

                if (this.ratio > .97) {
                    $('#paint5_linear_1241_19634').addClass('active');
                    setTimeout(() => {
                        $('#paint5_linear_1241_19634').removeClass('active');
                    }, 500);
                }
            }
        })
    }
    SCRIPT.communityScript = () => {
        console.log('khanhaksdfja')
        let totalApy = 0;
        async function getCoinApi() {
            try {
                const dataAPI = await $.get('https://explorer.mintlayer.org/api/summary');
                console.log(dataAPI)
                if (dataAPI) {
                    totalApy = formatNumberWithSpaces(dataAPI.staking.total_apy)
                }
            } catch (error) {
                console.error('Error fetching rate data:', error);
            }
            $('.token-mainnet-spy-number').text(totalApy);
        }
        getCoinApi();
        let videoPlayed = false
        initAnimPath('.tmp-wallet-down-bg', { duration: 10, delay: 2 });
        $('.tmp-wallet-hero-vid-inner').on('click', function (e) {
            e.preventDefault();
            if (!videoPlayed) {
                $(this).find('video').attr('controls', 'true').removeAttr('muted').css('pointer-events', 'auto')
                $(this).removeClass('hover-img').css('pointer-events', 'none')
                $(this).find('.stake-wrallet-vid-ic').addClass('de-active')
                $(this).find('video').get(0).volume = 0.8;
                $(this).find('video').get(0).muted = !$(this).find('video').get(0).muted;
                videoPlayed = true;
            }
        })
        const formSubmitEvent = (function () {
            const init = ({
                onlyWorkOnThisFormName,
                onSuccess,
                onFail
            }) => {
                $(document).ajaxComplete(function (event, xhr, settings) {
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
        })()
        let originText = $('.com-ctc-acts .txt.txt-16').text();
        $('.com-ctc-submit-btn').on('click', function () {
            $('.com-ctc-acts .txt.txt-16').text('Sending...');
        })
        formSubmitEvent.init({
            onlyWorkOnThisFormName: "Contact form",
            onSuccess: () => {
                $('.com-ctc-success').addClass('active');
                $('.com-ctc-form-inner').trigger('reset');
                $('.com-ctc-acts .txt.txt-16').text(originText);
                setTimeout(() => {
                    $('.com-ctc-success').removeClass('active');
                }, 3000);
            },
            onFail: () => {
                alert("Something went wrong! Please try again.");
                $('.com-ctc-acts .txt.txt-16').text(originText);
            }
        })
    }
    SCRIPT.learnScript = () => {
        let videoPlayed = false
        $('.learn-wallet-vid').on('click', function (e) {
            e.preventDefault();
            if (!videoPlayed) {
                $(this).find('video').attr('controls', 'true').removeAttr('muted').css('pointer-events', 'auto')
                $(this).removeClass('hover-img').css('pointer-events', 'none')
                $(this).find('.learn-wrallet-vid-ic').addClass('de-active')
                $(this).find('video').get(0).volume = 0.8;
                $(this).find('video').get(0).muted = !$(this).find('video').get(0).muted;
                videoPlayed = true;
            }
        })
        $('.learn-faq-main-category.active .learn-faq-main').slideDown();
        $('.learn-faq-main-category').on('click', function (event) {
            if (!$(event.target).closest('.learn-faq-main').length) {
                $(this).toggleClass('active')
                if ($(this).hasClass('active')) {
                    $(this).find('.learn-faq-main').slideDown();
                }
                else {
                    $(this).find('.learn-faq-main').slideUp();

                }
                // Chỉ thực hiện khi click vào phần tử chính, không phải thẻ con
                console.log('Clicked on the parent element');
            }
        });
        if ($(window).width() > 991) {
            $('.learn-why-head-item-inner').removeClass('active').eq(0).addClass('active');
            $('.learn-why-main-item-body-inner').removeClass('active').eq(0).addClass('active');

            $('.learn-why-head-item-inner').on('mouseover', function () {
                const $this = $(this);
                const index = $this.closest('.learn-why-head-item').index();
                $('.learn-why-head-item-inner').removeClass('active');
                $this.addClass('active');
                $('.learn-why-main-item-body-inner').removeClass('active').eq(index).addClass('active');
            });
        } else {
            $('.learn-why-main-item-head').on('click', function (e) {
                e.preventDefault();
                if (!$(this).hasClass('active')) {
                    $('.learn-why-main-item-head').removeClass('active')
                    $(this).addClass('active')
                    $('.learn-why-main-item-body').slideUp()
                    $(this).parents('.learn-why-main-item').find('.learn-why-main-item-body').slideDown()
                } else {
                    $('.learn-why-main-item-head').removeClass('active')
                    $('.learn-why-main-item-body').slideUp()
                }

            })
        }
    }
    SCRIPT.mediaScript = () => {
        initAnimPath('.media-down-bg', { duration: 6, delay: 1.5, reverse: true });
        if ($(window).width() > 767) {
            // $('.media-main').each((idx, el) => {
            //     const mediaSwiper = new Swiper($(el).find('.media-main-cms').get(0), {
            //         slidesPerView: 3,
            //         spaceBetween: parseRem(16),
            //         slidesPerGroup: 3,
            //         speed: 800,
            //         // effect: "fade",
            //         // fadeEffect: {
            //         //     crossFade: true,
            //         //   },
            //         mousewheel: {
            //             enabled: true,
            //             forceToAxis: true,
            //         },
            //         pagination: {
            //             el: $(el).find('.media-main-pagi').get(0),
            //             renderBullet: function (index, className) {
            //                 return '<span class="' + className + '">' + (index + 1) + "</span>";
            //             },
            //             clickable: true,
            //         }
            //     })
            // })
            // const mediaSwiperAll = new Swiper('.media-blogs-all .media-blog-all-cms', {
            //     slidesPerView: 3,
            //     spaceBetween: parseRem(16),
            //     slidesPerGroup: 3,
            //     speed: 800,
            //     grid: {
            //         rows: 2,
            //       },
            //     mousewheel: {
            //         enabled: true,
            //         forceToAxis: true,
            //     },
            //       loopFillGroupWithBlank: true,
            //     pagination: {
            //         el: $('.media-blogs-all .media-main-pagi ').get(0),
            //         renderBullet: function (index, className) {
            //          return '<span class="' + className + '">' + (index + 1) + "</span>";
            //            },
            //         clickable: true,
            //     }
            // })
        }
    }
    SCRIPT.eventScript = () => {
        $('.event-main-table-body').each((idx, el) => {
            let itemLength = $(el).find('.event-main-table-row').length;
            let parent =  $(el).closest('.event-main-wrap');
            if (itemLength === 0) {
                if (parent.hasClass('event-main-upcoming')) {
                    parent.find('.event-main-desc').text("We don't have any events scheduled right now. Check back soon!");
                    parent.find('.event-main-table').remove();
                }
                else if (parent.hasClass('event-main-past')) {
                    parent.remove();
                }
                else return;
            }
        })

        
        function ActiveEvent(type, timeEvent) {
            let currentTime = new Date(); // current time in user local
            switch (type) {
                case 'past':
                    return timeEvent > currentTime;
                case 'upcoming':
                    return timeEvent < currentTime;
            }
        }
        
        $('.event-main-upcoming-cms').each((idx, el) => {
            let eventType = $(el).attr('data-event-type');
        
            $(el).find('.event-main-table-row-inner').each((idx, item) => {
                let timeEnd = new Date($(item).attr('time-end')); 
                if (ActiveEvent(eventType, timeEnd)) {
                    $(item).hide();
                }
            })
        });
    }
    SCRIPT.techScript = () => {
        initAnimPath('.tech-build-illu', {
            duration: 8, delay: 1.5, reverse: true,
            onUpdate: function () {
                const FadingByIndex = (index, { start, end }) => {
                    let el = this.targets()[0];
                    if (index == el.getAttribute('data-dot-index')) {
                        if (this.ratio > start || this.ratio < end) gsap.to(el, { opacity: 1, duration: 0.3, scale: 1, ease: 'linear' })
                        else gsap.to(el, { opacity: 0, duration: 0.3, scale: 0, ease: 'linear' })
                    }
                }
                FadingByIndex(1, { start: .65, end: .4 });
                FadingByIndex(2, { start: .65, end: .4 });
                FadingByIndex(3, { start: .925, end: .65 });
            }
        }
        );
        initAnimPath('.tech-inspi-illu', { duration: 10, delay: 2, fade: true })
        initAnimPath('.tech-ques-bg', { duration: 8, delay: 2 });
        if ($(window).width() > 991) {

            $('.tech-fea-head-item-inner').removeClass('active').eq(0).addClass('active');
            $('.tech-fea-main-item-body-inner').removeClass('active').eq(0).addClass('active');
            $('.tech-fea-head-item-inner').on('mouseover', function (e) {
                const $this = $(this);
                const index = $this.closest('.tech-fea-head-item').index();
                $('.tech-fea-head-item-inner').removeClass('active');
                $this.addClass('active');
                $('.tech-fea-main-item-body-inner').removeClass('active').eq(index).addClass('active');
            });
        } else {
            $('.tech-fea-main-item-body').css('display', 'none')
            const activeIdx = {
                active: (el) => {
                    $('.tech-fea-main-item-head').removeClass('active')
                    $(el).addClass('active')

                    $('.tech-fea-main-item-body').removeClass('active').slideUp()
                    $(el).parents('.tech-fea-main-item-inner').find('.tech-fea-main-item-body').addClass('active').slideDown()
                },
                deactive: () => {
                    $('.tech-fea-main-item-body').removeClass('active').slideUp()
                    $('.tech-fea-main-item-head').removeClass('active')
                }
            }
            activeIdx.active($('.tech-fea-main-item-head')[0])
            $('.tech-fea-main-item-head').on('click', function (e) {
                e.preventDefault();
                console.log('object');
                if (!$(this).hasClass('active')) {
                    activeIdx.active($(this))
                } else {
                    activeIdx.deactive()
                }
            })
        }

        drawTechSvg()

        setTimeout(() => {
            initParticleAlongPath({ target: '.tech-road' });
        }, 800)
    }
    SCRIPT.careerScript = () => {
        initAnimPath('.career-main-bg', { duration: 10, delay: 2 });
        handleOpenJobPosition()
    }
    SCRIPT.teleScript = () => {
        if ($(window).width() < 768) {
            $('[data-swiper=swiper]').each((idx, el) => {
                $(el).addClass('swiper')
                $(el).find('[data-swiper=wrapper]').addClass('swiper-wrapper')
                $(el).find('[data-swiper=slide]').addClass('swiper-slide')

                const swiper = new Swiper(el, {
                    slidesPerView: 1,
                    centeredSlides: true,
                    speed: 400,
                    spaceBetween: parseRem(16),
                    pagination: {
                        el: '.tele-benefit-pagi',
                        bulletClass: 'tele-main-pagi-bullet',
                        bulletActiveClass: 'tele-main-pagi-bullet-active',
                    },
                });
            })
        }
    }
    SCRIPT.roadScript = () => {
        gsap.set('.road-year', { "background-color": '#454646' })
        gsap.to($('.dot-rotate-ic-inner'), { rotation: 360, transformOrigin: "center", duration: 3, stagger: .15, repeat: -1, ease: 'expo.inOut' })
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.road-year',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
            },
            defaults: { ease: "none" }
        })
        tl
            .to('.road-year', {
                "background-color": '#202120'
            })
            .to('.road-year', {
                "background-color": '#000000'
            })

        drawRoadSvg()
        initParticleAlongPath({ target: '.road-year', start: `top ${$('.road-year').offset().top}px` });
        if ($(window).width() > 767) {
            const homeNewsSwiper = new Swiper('.home-news-cms', {
                slidesPerView: 2,
                spaceBetween: parseRem(16),
                navigation: {
                    prevEl: '.home-news-nav-prev',
                    nextEl: '.home-news-nav-next',
                },
            })
        } else {
            $('[data-swiper=swiper]').each((idx, el) => {
                $(el).addClass('swiper')
                $(el).find('[data-swiper=wrapper]').addClass('swiper-wrapper')
                $(el).find('[data-swiper=slide]').addClass('swiper-slide')

                const swiper = new Swiper(el, {
                    slidesPerView: 1,
                    centeredSlides: true,
                    speed: 400,
                    spaceBetween: parseRem(16),
                    pagination: {
                        el: '.road-now-pagi',
                        bulletClass: 'road-now-pagi-bullet',
                        bulletActiveClass: 'road-now-pagi-bullet-active',
                    },
                });
            })
        }
    }
    SCRIPT.tokenScript = () => {
        function getThreeDecimalPlaces(number) {
            return Math.floor(number * 10000) / 10000;
        }
        async function getCoinApi() {
            function setCookie(name, value, seconds) {
                const now = new Date();
                let expires;
                const d = new Date(now.getTime() + seconds * 1000);
                expires = "expires=" + d.toUTCString();
                console.log(expires)
                document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
            }

            function getCookie(name) {
                const nameEQ = name + "=";
                const ca = document.cookie.split(';');
                for (let i = 0; i < ca.length; i++) {
                    let c = ca[i];
                    while (c.charAt(0) === ' ') c = c.substring(1);
                    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
                }
                return null;
            }

            function isCookieValid(name) {
                const cookie = getCookie(name);
                if (cookie) {
                    try {
                        const data = JSON.parse(cookie);
                        return data && data.timestamp && (Date.now() - data.timestamp < 24 * 60 * 60 * 1000);
                    } catch (e) {
                        console.error('Cookie parsing error:', e);
                        return false;
                    }
                }
                return false;
            }
            function removeCommasAndSpaces(numberString) {
                return Number(String(numberString).replace(/[, ]/g, ''));
            }
            function processHandel(value, total, className) {
                let process = removeCommasAndSpaces(value) / removeCommasAndSpaces(total) * 100 - 100;
                $(className).find('.token-hero-calc-detail-item-line-active').css('transform', `translateX(${process}%)`);
                $(className).find('.token-hero-calc-detail-item-picker').css('left', `${process - .5 + 100}%`);

            }

            const cacheName = 'coinApiCache';

            // if (isCookieValid(cacheName)) {
            //     const cachedData = JSON.parse(getCookie(cacheName));
            //     $('.token-hero-calc-num').text(cachedData.usdNumber);
            //     $('.token-mainnet-cir-number').text(cachedData.numberMainCirSupply);
            //     $('.token-ether-cir-number').text(cachedData.numberEtherCirSupply);
            //     $('.token-total-cir-number').text(cachedData.totalCirSupply);
            //     $('.token-mainnet-spy-number').text(cachedData.totalApy);
            //     $('.token-mainnet-pool-number').text(cachedData.totalPool);
            //     $('.token-mainnet-delegation-number').text(cachedData.totalDelegation);
            //     $('.token-mainnet-stake-number').text(cachedData.totalStake);
            //     $('.token-mainne-effect-number').text(cachedData.totalEffect);
            //     $('.ml-total-supply').text(cachedData.mlTotalCircle);
            //     $('.er-total-supply').text(cachedData.erTotalCircle);
            //     processHandel(cachedData.numberMainCirSupply,600000000,'.token-hero-calc-detail-item-mainnet')
            //     processHandel(cachedData.numberEtherCirSupply,600000000,'.token-hero-calc-detail-item-ethereum')
            //     processHandel(cachedData.totalCirSupply,600000000,'.token-hero-calc-detail-item-circulating')
            // } else {
            let usdNumber = 0;
            let numberMainCirSupply = 0;
            let numberEtherCirSupply = 0;
            let totalCirSupply = 0;
            let totalApy = 0;
            let totalPool = 0;
            let totalDelegation = 0;
            let totalStake = 0;
            let totalEffect = 0;
            let mlTotalCircle = 0;
            let mlPercent = 0;
            let marketCapPercent = 0;
            let marketCap24h = 0;
            let marketCapNumber = 0;
            let volume24Number = 0;
            let volume24Percent = 0;
            let fullyDilutedMarketCap = 0;
            let mlMaxSupply = 0;
            let erTotalCircle = 0;
            try {
                const dataAPI = await $.get('https://explorer.mintlayer.org/api/summary');
                if (dataAPI) {
                    usdNumber = getThreeDecimalPlaces(dataAPI.cmc_info.price);
                    mlPercent = getThreeDecimalPlaces(dataAPI.cmc_info.percent_change_24h);
                    marketCap24h = getThreeDecimalPlaces(Math.ceil(dataAPI.cmc_info.volume_24h) / Math.ceil(dataAPI.cmc_info.market_cap) * 100);
                    marketCapNumber = formatNumber(Math.ceil(dataAPI.circulating_supply.total * dataAPI.cmc_info.price));
                    volume24Percent = getThreeDecimalPlaces(dataAPI.cmc_info.volume_change_24h);
                    volume24Number = formatNumber(Math.ceil(dataAPI.cmc_info.volume_24h));
                    fullyDilutedMarketCap = formatNumber(Math.ceil(dataAPI.cmc_info.fully_diluted_market_cap));
                    mlMaxSupply = formatNumber(Math.ceil(dataAPI.max_supply.ml));
                    usdNumber = getThreeDecimalPlaces(dataAPI.cmc_info.price);
                    mlTotalCircle = formatNumber(Math.ceil(dataAPI.total_supply.total));
                    erTotalCircle = formatNumber(Math.ceil(dataAPI.total_supply.total));
                    numberMainCirSupply = formatNumber(dataAPI.circulating_supply.ml);
                    numberEtherCirSupply = formatNumber(dataAPI.circulating_supply.erc20);
                    totalCirSupply = formatNumber(Math.ceil(dataAPI.circulating_supply.ml) + Math.ceil(dataAPI.circulating_supply.erc20))
                    totalApy = formatNumberWithSpaces(dataAPI.staking.total_apy)
                    totalPool = formatNumberWithSpaces(dataAPI.staking.validators_count)
                    totalDelegation = formatNumberWithSpaces(dataAPI.staking.delegation_count)
                    totalStake = formatNumberWithSpaces(dataAPI.staking.total_amount)
                    totalEffect = formatNumberWithSpaces(dataAPI.staking.total_effective_amount)
                    processHandel(numberMainCirSupply, 600000000, '.token-hero-calc-detail-item-mainnet')
                    processHandel(numberEtherCirSupply, 600000000, '.token-hero-calc-detail-item-ethereum')
                    processHandel(totalCirSupply, 600000000, '.token-hero-calc-detail-item-circulating')
                }
            } catch (error) {
                console.error('Error fetching rate data:', error);
            }

            if (parseInt(mlPercent) > 0) {
                $('.ml-percent-wrap').addClass('active')
            }
            if (parseInt(marketCap24h) > 0) {
                $('.volume24-percent-wrap').addClass('active')
            }
            $('.ml-percent').text(mlPercent);
            $('.market-cap-number').text(marketCapNumber);
            $('.market-cap24h').text(marketCap24h);
            $('.volume24-percent').text(volume24Percent);
            $('.volume24-number').text(volume24Number);
            $('.fully-diluted-market-cap').text(fullyDilutedMarketCap);
            $('.ml-max-supply').text(mlMaxSupply);
            // $('.').text(usdNumber);
            $('.token-hero-calc-num').text(usdNumber);
            $('.token-mainnet-cir-number').text(numberMainCirSupply);
            $('.token-ether-cir-number').text(numberEtherCirSupply);
            $('.token-total-cir-number').text(totalCirSupply);
            $('.token-mainnet-spy-number').text(totalApy);
            $('.token-mainnet-pool-number').text(totalPool);
            $('.token-mainnet-delegation-number').text(totalDelegation);
            $('.token-mainnet-stake-number').text(totalStake);
            $('.token-mainne-effect-number').text(totalEffect);
            $('.ml-total-supply').text(mlTotalCircle);
            $('.er-total-supply').text(erTotalCircle);
            // setCookie(cacheName, JSON.stringify({
            //     timestamp: Date.now(),
            //     mlTotalCircle,
            //     erTotalCircle,
            //     usdNumber,
            //     numberMainCirSupply,
            //     numberEtherCirSupply,
            //     totalCirSupply,
            //     totalApy,
            //     totalPool,
            //     totalDelegation,
            //     totalStake,
            //     totalEffect
            // }), 3600);
            // }
        }
        function getSurroundingData(currentDate, unlockData) {
            const parsedData = unlockData.map(entry => {
                const dateStr = Object.keys(entry)[0];
                const value = Object.values(entry)[0];
                const dateParts = dateStr.split('/');
                const date = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);
                return { date, value };
            });

            // Sắp xếp dữ liệu theo ngày tháng
            parsedData.sort((a, b) => a.date - b.date);

            let previousData = null;
            let nextData = null;

            for (let i = 0; i < parsedData.length; i++) {
                if (parsedData[i].date > currentDate) {
                    nextData = parsedData[i];
                    break;
                }
                previousData = parsedData[i];
            }

            return {
                previousData,
                nextData
            };
        }

        function formatDate(date) {
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const year = date.getFullYear();
            return `${month}/${day}/${year}`;
        }

        const currentDate = new Date();
        const result = getSurroundingData(currentDate, unlockData);
        $('.unlock-amount-total').text(totalUnlockData); //

        if (result.nextData != null) {
            $('.unlock-date-next').text(formatDate(result.nextData.date));
            $('.unlock-amount-next').text(result.nextData.value); //
        }

        if (result.previousData != null) {
            $('.unlock-date-last').text(formatDate(result.previousData.date));
            $('.unlock-amount-last').text(result.previousData.value); //

        }
        getCoinApi();
        getEarnAPI();
        initTokenChart();
        initAnimPath('.token-hero-bg-left', { duration: 12, delay: 3 });
        initAnimPath('.token-hero-bg-right', { duration: 8, delay: 5 });
        initAnimPath('.token-staking-bg', { duration: 10, delay: 2 });
        initAnimPath('.token-faq-bg', { duration: 10, delay: 2 });
        // $('.token-intro-chart-wrap').on('mouseenter', function(){
        //     lenis.stop();
        // })
        // $('.token-intro-chart-wrap').on('mouseleave', function(){
        //     lenis.start();
        // })
        const tokenIntroMode = {
            light: () => {
                $('.token-hero').attr('data-section', '')
                $('.token-hero').removeClass('dark-mode');
                $('.token-intro').removeClass('dark-mode');
                $('.token-intro').attr('data-section', '');
                $('.token-staking').removeClass('dark-mode');
                $('.footer-custom-bg').removeClass('bg-black');
            },
            dark: () => {
                $('.token-hero').attr('data-section', 'dark');
                $('.token-hero').addClass('dark-mode');
                $('.token-intro').addClass('dark-mode');
                $('.token-intro').attr('data-section', 'dark');
                $('.token-staking').addClass('dark-mode');
                $('.footer-custom-bg').addClass('bg-black');
            }
        }

        ScrollTrigger.create({
            trigger: '.token-intro',
            start: 'top-=200px top',
            end: 'bottom center',
            scrub: true,
            onEnter: tokenIntroMode.dark,
            onEnterBack: tokenIntroMode.dark,
            onLeave: tokenIntroMode.light,
            onLeaveBack: tokenIntroMode.light
        })

    }
    SCRIPT.downloadScript = async () => {
        const { data, version } = await handleCrawContent()
        handleRenderAssetDownload({ data, version })

        initAnimPath('.download-hero-bg-left', { duration: 12, delay: 3 });
        initAnimPath('.download-hero-bg-right', { duration: 8, delay: 5 });
        $('.anim-opacity').addClass('show');
        $('.footer-inner').attr('data-aos', '');
        $('.btn-reset-all').on('click', function (e) {
            e.preventDefault();
            $('.download-hero-filter-input').each((index, item) => {
                $(item).next('.download-hero-filter-choice').find('.download-hero-choice-item').eq(0).click();
            })
        })

        function updateFileShow() {
            let system = $('.download-hero-filter-input-so').attr('data-system-active');
            let interface = $('.download-hero-filter-input-inter').attr('data-interface-active');
            let package = $('.download-hero-filter-input-pack').attr('data-package-active');

            // Lặp qua tất cả các list items
            $('.download-hero-file-item').each(function () {
                let itemSystem = $(this).attr('data-system');
                let itemInterface = $(this).attr('data-interface');
                let itemPackage = $(this).attr('data-package');

                // Kiểm tra điều kiện hiển thị dựa trên các thuộc tính
                let showItem = true;

                if (system !== 'all' && system !== itemSystem) {
                    showItem = false;
                }

                if (interface !== 'all' && interface !== itemInterface) {
                    showItem = false;
                }

                if (package !== 'all' && package !== itemPackage) {
                    showItem = false;
                }

                // Hiển thị hoặc ẩn item
                if (showItem) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }

        $(document).on('click', function (event) {
            if (!$(event.target).closest('.download-hero-filter-input, .download-hero-filter-choice').length) {
                $('.download-hero-filter-choice').slideUp();
            }
        });
        $('.download-hero-filter-input').on('click', function () {
            $('.download-hero-filter-choice').not($(this).next('.download-hero-filter-choice')).slideUp();
            $(this).find('.download-hero-filter-ic').toggleClass('active')
            $(this).next('.download-hero-filter-choice').slideToggle();
        })
        $('.download-hero-choice-item').on('click', function () {
            $(this).closest('.download-hero-filter-item').find('.download-hero-filter-input-txt').text($(this).text());
            $(this).closest('.download-hero-filter-choice').slideUp();
            let nameFilter = $(this).closest('.download-hero-filter-choice').attr('name-filter');
            let attr = $(this).attr(nameFilter);
            $(this).closest('.download-hero-filter-choice').prev('.download-hero-filter-input').attr(`${nameFilter}-active`, attr);
            updateFileShow();
            // $('.download-hero-file-item').show();
            $(this).find('.download-hero-filter-ic').removeClass('active')

        })

        $('.download-hero-file-item-child-hash-ic').on('click', function () {
            let textToCopy = $(this).parent().find('.dowload_hash').text();
            let item = $(this);
            var tempInput = $('<input>');
            $('body').append(tempInput);
            tempInput.val(textToCopy).select();
            document.execCommand('copy');
            tempInput.remove();
            item.find('.tooltip-hash').text('Copied!')
            item.addClass('active');
            setTimeout(function () {
                item.removeClass('active');
            }, 200)
            setTimeout(function () {
                item.find('.tooltip-hash').text('Copy Hashtag')
            }, 2000)
        });



    }
    SCRIPT.termPrivacyScript = () => {

    }
    SCRIPT.blogsScript = () => {

        const figure = $('.term-privacy-hero-content').find('figure')

        if (figure.length > 0) {
            figure.eq(0).append(`<div id="elevenlabs-audionative-widget" data-height="90" data-width="100%" data-frameborder="no" data-scrolling="no" data-publicuserid="ab48332d81a433131c20b00c5c10990401d078df86fa1f4dfa00ea9a01ba1c47" data-playerurl="https://elevenlabs.io/player/index.html" >Loading the <a href="https://elevenlabs.io/text-to-speech" target="_blank" rel="noopener">Elevenlabs Text to Speech</a> AudioNative Player...</div>
    <script src="https://elevenlabs.io/player/audioNativeHelper.js" type="text/javascript"></script>`)
        }
    }
    SCRIPT.formScript = () => {
        const formInnovaiton = new FormSubmit(document.querySelector('#wf-form-Ecosystem-form'))

        let stepCurrent = 1
        const $listStepForms = $('.f-form-step')
        const $btnBack = $('.f-form-heading-action-back')
        const $btnSkip = $('.f-form-heading-action-skip')
        const $btnNext = $('.f-form-heading-action-next')
        const $btnSubmit = $('.f-form-heading-action-btn-submit')
        const $progressBar = $('.f-form-heading-progress-bar-run')
        const $listCountStepProgress = $('.f-form-heading-txt-count')
        const $listCount = $('.f-form-heading-count-wrap').find('.f-form-heading-count-inner')
        const $formInner = $('.f-form-inner')
        const $btnReload = $('.f-form-success-btn-submit-anorther')

        ScrollTrigger.create({
            trigger: $formInner.get(0),
            start: () => {
                return `top-=${parseRem(200)} top`
            },
            end: 'bottom center',

            onEnter: () => {
                $isMatchSticky = true
            },
            onLeave: () => {
                $isMatchSticky = false
            },
            onLeaveBack: () => {
                $isMatchSticky = false
            },
            onEnterBack: () => {
                $isMatchSticky = true
            }
        })


        const handleUpdateStep = (id) => {
            if (id > $listStepForms.length || id < 1) return
            if (id > 1) {
                $btnBack.addClass('active')
            } else {
                $btnBack.removeClass('active')
            }
            if (id === $listStepForms.length) {
                $btnSubmit.addClass('active')
                $btnSkip.addClass('pre-none')
                $btnNext.addClass('pre-none')
            } else {
                $btnSubmit.removeClass('active')
                $btnSkip.removeClass('pre-none')
                $btnNext.removeClass('pre-none')
            }

            $listStepForms.each((index, stepForm) => {
                if (index + 1 === id) {
                    $(stepForm).addClass('is-active')

                } else {
                    if ($(stepForm).hasClass('is-active')) {
                        $(stepForm).removeClass('is-active')
                    }
                }
            })
            const scaleMap = id / ($listStepForms.length)

            gsap.to($progressBar.get(0), {
                scaleX: scaleMap,
                ease: 'power3.out',
                duration: 1
            })

            $formInner.css('height', $listStepForms.eq(id - 1).height() + 'px')
            handleCount(id)

        }
        const handleCount = (id) => {

            const heightMap = (id - 1) / ($listStepForms.length) * 100
            gsap.to($listCount.get(0), {
                yPercent: `-${heightMap}`,
                ease: 'power3.out',
                duration: 0.8,
            })

            gsap.to($listCountStepProgress.get(0), {
                yPercent: `-${heightMap}`,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.1
            })
        }

        const nextStep = () => {
            const status = formInnovaiton.checkValidateAction()
            if (!status) return

            stepCurrent += 1
            lenis.scrollTo($('.f-form').get(0), { duration: 0.8 });


        }
        const preStep = () => {
            formInnovaiton.checkValidateAction()
            stepCurrent -= 1

            lenis.scrollTo($('.f-form').get(0), { duration: 0.8 });
        }

        function update() {
            handleUpdateStep(stepCurrent)
            requestAnimationFrame(update);
        }
        update();

        $btnNext.on('click', nextStep)
        $btnSkip.on('click', nextStep)
        $btnBack.on('click', preStep)
        $btnSubmit.on('mouseover', function () {
            $(this).find('.btn-mint').addClass('hover');
        }).on('mouseout', function () {
            $(this).find('.btn-mint').removeClass('hover');
        });
        $btnReload.on('click', () => {
            window.location.reload()
        })
    }
    SCRIPT.landingpageScript = () => {
        getEarnAPI();
        let videoPlayed = false;
        $('.ld-hero-vid-inner').on('click', function (e) {
            e.preventDefault();
            if (!videoPlayed) {
                $(this).find('video').attr('controls', 'true').removeAttr('muted').css('pointer-events', 'auto')
                $(this).removeClass('hover-img').css('pointer-events', 'none')
                $(this).find('.ld-hero-video-ic').addClass('de-active')
                $(this).find('video').get(0).volume = 0.8;
                $(this).find('video').get(0).muted = !$(this).find('video').get(0).muted;
                videoPlayed = true;
            }
        })
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
    SCRIPT.thankyouScript = () => {
        console.log('SCRIPT.thankyouScript  called');
        initAnimPath('.thank-main-deco-r', { duration: 15, delay: 3 })
        initAnimPath('.thank-main-deco-l', { duration: 15, delay: 3 })
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


