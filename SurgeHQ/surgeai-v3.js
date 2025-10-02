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
    }

    SCRIPT.postScript = () => {
        if ($(window).width() > 991) {
            let headings = $('.post-content-richtext h2');
            let tocWrap = $('.post-content-toc-list');

            let tocClone = $('.post-content-toc-item').eq(0).clone();
            tocWrap.html('');
            headings.each(function (idx, heading) {
                let text = $(heading).text().replace(/^\d+\.\s*/, '').replace(/\s*\([^)]*\)/g, '');
                let id = text.toLowerCase().trim().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '');
                let link = tocClone.clone();

                $(heading).attr('id', id);
                link.attr('href', `#${id}`);
                link.find('.txt').text(text);
                idx === 0 && link.addClass('w--current');

                tocWrap.append(link);
            })
            $(window).on('scroll', function (e) {
                const scrollTop = document.documentElement.scrollTop || window.scrollY
                headings.each((idx, heading) => {
                    if (scrollTop > $(heading).offset().top - ($(window).height() * .5)) {
                        $(`.post-content-toc-item[href="#${$(heading).attr('id')}"]`).addClass('w--current');
                        $(`.post-content-toc-item[href="#${$(heading).attr('id')}"]`).siblings().removeClass('w--current');
                    }
                })
            })

            const currToc = window.location.hash;
            if ($(currToc).length) {
                setTimeout(() => $(`.post-content-toc-item[href="${currToc}"]`).trigger('click'), 400);
                setTimeout(() => $(`.post-content-toc-item[href="${currToc}"]`).trigger('click'), 800);
            }
        }
    }

    scrollTop();

    const pageName = $('main.main').attr('data-namespace');
    if (pageName) {
        SCRIPT[`${pageName}Script`]();
    }
}
window.onload = script;