const mainScript = () => {
    const childSelect = (parent) => {
        return (child) => child ? $(parent).find(child) : parent;
    }
    const parseRem = (input) => {
        return input / 10 * parseFloat(window.getComputedStyle(document.querySelector('html')).getPropertyValue("font-size"));
    }
    const lenis = new Lenis()
    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', function (inst) {
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

    const chainIdHex = '0x108d'; // 4237 in hex

    const networkData = {
        chainId: chainIdHex,
        chainName: 'Mintlayer Testnet ZKThunder',
        nativeCurrency: {
            name: 'Mintlayer',
            symbol: 'ML',
            decimals: 18
        },
        rpcUrls: ['https://rpc.testnet.zkthunder.fi'],
        blockExplorerUrls: ['https://explorer.testnet.zkthunder.fi']
    };

    async function switchOrAddNetwork() {
        if (!window.ethereum) {
            alert('MetaMask is not installed.');
            return;
        }

        try {
            // Try switching first
            await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainIdHex }]
            });
            alert('Network is already added and selected!');
        } catch (switchError) {
            // Error 4902 = network not added yet
            if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [networkData]
                });

                // After adding, try switching again
                await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chainIdHex }]
                });

                alert('Network added and switched successfully!');
            } catch (addError) {
                console.error('Error adding network:', addError);
                alert('Failed to add the network.');
            }
            } else {
            console.error('Error switching network:', switchError);
            alert('Failed to switch network.');
            }
        }
    }

    $('[data-add-meta]').on('click', async function (e) {
        await switchOrAddNetwork();
    })

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
            console.log(parent('[data-anim-path="line"]').get(0))
            parent('[data-anim-path="dot"]').each((i, dot) => {
            console.log(parent('[data-anim-path="dot"]'))

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

    $('.header-menu-item-link').on('click', function (e) {
        if ($('.header').hasClass('on-open')) {
            handleHeader.close();
        }
    })

    gsap.to('.footer-ic-main', { rotation: 360, duration: 4, repeat: -1, ease: 'power3.inOut' })

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
    });
    initAnimPath('.tech-inspi-illu', { duration: 10, delay: 2, fade: true })

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

    if ($(window).width() > 991) {
        let cloneCard = $('.tech-fea-main-item').eq(0).clone();
        $('.tech-fea-main-item').eq(0).remove();

        $('.tech-fea-head-item').each((i, item) => {
            let html = cloneCard.clone();
            let parent = childSelect(html);
            parent('.tech-fea-main-item-body-inner-ic').html($(item).find('[data-icon]').html());
            parent('.tech-fea-main-item-body-txt').text($(item).find('[data-desc]').text());
            parent('.tech-fea-main-item-body-btn .btn').attr('href', $(item).find('[data-cta]').attr('href'));
            parent('.tech-fea-main-item-body-btn .btn .txt').text($(item).find('[data-cta]').text());
            parent('.tech-fea-main-item-body-inner').toggleClass('active', i === 0);
            $('.tech-fea-main-list').append(html);
        });
        $('.tech-fea-head-item-inner').removeClass('active').eq(0).addClass('active');
        $('.tech-fea-head-item-inner').on('mouseover', function (e) {
            const $this = $(this);
            const index = $this.closest('.tech-fea-head-item').index();
            $('.tech-fea-head-item-inner').removeClass('active');
            $this.addClass('active');
            $('.tech-fea-main-cms .tech-fea-main-item-body-inner').removeClass('active').eq(index).addClass('active');
        });
    }
    else {
        console.log("run")

        // activeIdx.active($('.tech-fea-main-item-head')[0])
        $('.tech-fea-head-item-inner').on('click', function (e) {
            e.preventDefault();
            $(this).toggleClass('active');
            $('.tech-fea-head-item-inner').not(this).removeClass('active');

            $(this).siblings('.tech-fea-main-item-body').slideToggle();
            $('.tech-fea-main-item-body').not($(this).siblings('.tech-fea-main-item-body')).slideUp();

            // if (!$(this).hasClass('active')) {
            //     activeIdx.active($(this))
            // } else {
            //     activeIdx.deactive()
            // }
        })
    }
}
window.document.addEventListener('DOMContentLoaded', mainScript);