const script = () => {
    const isInViewport = (el, orientation = 'vertical') => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (orientation == 'horizontal') {
            return (
                rect.left <= (window.innerWidth) &&
                rect.right >= 0
            );
        } else {
            return (
                rect.top <= (window.innerHeight) &&
                rect.bottom >= 0
            );
        }
    }
    const debounce = (func, timeout = 300) => {
        let timer

        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(() => { func.apply(this, args) }, timeout)
        }
    }
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
            $('.post-content-toc').addClass('active');
            $('.post-content-stick').css('margin-top', (($('.post-hero').outerHeight() + $('.header').height() + $('.post-content-toc').offset().left + 10) > $(window).height() ? ($('.post-hero').outerHeight() + $('.header').height() + $('.post-content-toc').offset().left + 10) : $(window).height()) * -1);
            setTimeout(() => {
                $('.post-content-toc-list-wrap').slideDown('slow');
            }, 500);

            let currentActiveId = null;

            $(window).on('scroll', function (e) {
                const scrollTop = document.documentElement.scrollTop || window.scrollY;
                const threshold = $(window).height() * 0.5;

                // Tìm heading cuối cùng đã vượt qua ngưỡng (từ dưới lên)
                let activeHeading = null;
                headings.each((idx, heading) => {
                    if (scrollTop > $(heading).offset().top - threshold) {
                        activeHeading = heading;
                    }
                });

                // Chỉ update khi có sự thay đổi
                if (activeHeading) {
                    const activeId = $(activeHeading).attr('id');

                    if (activeId !== currentActiveId) {
                        currentActiveId = activeId;
                        $('.post-content-toc-item').removeClass('w--current');
                        $(`.post-content-toc-item[href="#${activeId}"]`).addClass('w--current');
                    }
                }
            });

            const currToc = window.location.hash;
            if ($(currToc).length) {
                // setTimeout(() => $(`.post-content-toc-item[href="${currToc}"]`).trigger('click'), 400);
                // setTimeout(() => $(`.post-content-toc-item[href="${currToc}"]`).trigger('click'), 800);
            }
        }
    }
    SCRIPT.legalScript = () => {
        if ($(window).width() > 991) {
            let headings = $('.legal-content-richtext h2');
            let tocWrap = $('.legal-content-toc-list');

            let tocClone = $('.legal-content-toc-item').eq(0).clone();
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
            $('.legal-content-toc').addClass('active');
            $('.legal-content-stick').css('margin-top', $(window).height() * -1);
            setTimeout(() => {
                $('.legal-content-toc-list-wrap').slideDown('slow');
            }, 500);

            let currentActiveId = null;

            $(window).on('scroll', function (e) {
                const scrollTop = document.documentElement.scrollTop || window.scrollY;
                const threshold = $(window).height() * 0.5;

                // Tìm heading cuối cùng đã vượt qua ngưỡng (từ dưới lên)
                let activeHeading = null;
                headings.each((idx, heading) => {
                    if (scrollTop > $(heading).offset().top - threshold) {
                        activeHeading = heading;
                    }
                });

                // Chỉ update khi có sự thay đổi
                if (activeHeading) {
                    const activeId = $(activeHeading).attr('id');

                    if (activeId !== currentActiveId) {
                        currentActiveId = activeId;
                        $('.legal-content-toc-item').removeClass('w--current');
                        $(`.legal-content-toc-item[href="#${activeId}"]`).addClass('w--current');
                    }
                }
            });

            const currToc = window.location.hash;
            if ($(currToc).length) {
                setTimeout(() => $(`.legal-content-toc-item[href="${currToc}"]`).trigger('click'), 400);
                setTimeout(() => $(`.legal-content-toc-item[href="${currToc}"]`).trigger('click'), 800);
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