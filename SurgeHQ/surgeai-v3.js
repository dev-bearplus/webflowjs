const script = () => {
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

    const HEADER = {
        toggleNav: () => {
            $('.header').toggleClass('on-open-nav');
            $('.header-ham').toggleClass('active');
        }
    }

    $('.header-ham').on('click', function () {
        HEADER.toggleNav();
    })

    const SCRIPT = {}

    SCRIPT.homeScript = () => {
        console.log("home");
        $('.home-search-marquee-list').each((idx, el) => {
            marquee($(el));
            idx % 2 === 1 && $(el).css('animation-direction', 'reverse');
        })
        $('.home-faq-list-wrap').each((idx, el) => {
            let parent = childSelect(el);

            parent('.home-faq-item').on('click', function (e) {
                $(this).toggleClass('active');
                parent('.home-faq-item').not(this).removeClass('active');
            })
        })

        if ($(window).width() > 767) {
            $('.home-search-answer-stick').css('top', ($(window).height() - $('.home-search-answer-stick').height()) / 2);
        }
        else {
            requestAnimationFrame(() => {
                $('.home-search-answer-list-wrap').css('display', 'block');
                requestAnimationFrame(() => {
                    $('.home-search-answer-list-wrap').css({
                        '--grid-row-height': `${$('.home-search-answer-list-inner').height()}px`,
                        'display': 'grid'
                    });
                    requestAnimationFrame(() => {
                        $('.home-search-answer-list-wrap').css({
                            'grid-template-rows': `${$('.home-search-answer-list').height()}px`,
                        });
                    })
                })
            })
            $('.home-search-answer-more-btn').on('click', function (e) {
                $('.home-search-answer-list-wrap').addClass('active');
            })
        }
    }

    scrollTop();

    const pageName = $('main.main').attr('data-namespace');
    if (pageName) {
        SCRIPT[`${pageName}Script`]();
    }
}
window.onload = script;