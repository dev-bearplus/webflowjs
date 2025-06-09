const script = () => {
    const childSelect = (parent) => {
        return (child) => child ? $(parent).find(child) : parent;
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
    function marquee(list) {
        const cloneAmount = Math.ceil($(window).width() / list.width()) + 1;
        list.css('animation-duration', `${Math.ceil(list.width() / 40)}s`);

        new Array(cloneAmount).fill().forEach(() => {
            let itemClone = list.find('[data-marquee="item"]').clone();
            list.append(itemClone);
        });
        list.addClass('anim-marquee');
    }

    let ratioScrollHeader = $(window).width() > 767 ? 1 : .5;
    let lastScrollTop = 0;

    const HEADER = {
        toggleHide: (inst) => {
            const scrollTop = document.documentElement.scrollTop || window.scrollY
            if ($('.header').hasClass('active')) return;
            const isScrollHeader = scrollTop > $('.header').height() * ($(window).width() > 767 ? 4 : 1.5)
            let debounceTimer;

            debounceTimer && clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                if (isScrollHeader) {
                    if (scrollTop > lastScrollTop) {
                        $('.header').addClass('on-hide');
                    }
                    else {
                        $('.header').removeClass('on-hide');
                    }
                }
                else {
                    $('.header').removeClass('on-hide');
                }
                lastScrollTop = scrollTop;
            }, 100);
        },
        toggleOnScroll: (inst) => {
            const scrollTop = document.documentElement.scrollTop || window.scrollY
            const isScrollHeader = scrollTop > $('.header').height() * ratioScrollHeader
            let debounceTimer;
            debounceTimer && clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                if (isScrollHeader) {
                    $('.header').addClass('on-scroll');
                } else {
                    $('.header').removeClass('on-scroll');
                }
            }, 100);
        },
        toggleNav: () => {
            $('.header').toggleClass('on-active-nav');
        }
    }

    $('.header-ham').on('click', function () {
        HEADER.toggleNav();
    })

    HEADER.toggleOnScroll(window.pageYOffset);
    $(window).on("scroll", function () {
        if ($('.header').hasClass('on-active-nav')) {
            HEADER.toggleNav();
        }
		HEADER.toggleOnScroll();
		HEADER.toggleHide();
	});

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
    SCRIPT.storyScript = () => {
        console.log("story");
    }
    SCRIPT.portalScript = () => {
        console.log("portal");
        // let headings = $('.portal-main-content-richtext h1');
        // let tocWrap = $('.portal-main-toc-body');

        // function setupTOC() {
        //     if (headings.length <= 1) {
        //         tocWrap.parent().remove();
        //     }

        //     let cloneTOC = $('.portal-main-toc-item').eq(0).clone();
        //     tocWrap.html('');
        //     headings.each((idx, heading) => {
        //         $(heading).attr('id', `toc-${idx}`);
        //         let clone = cloneTOC.clone();
        //         clone.find('.portal-main-toc-item-txt').attr('href', `#${$(heading).attr('id')}`).text($(heading).text());
        //         idx === 0 && clone.addClass('active');
        //         tocWrap.append(clone);
        //     })
        // }

        // function handleScrollDesktop() {
        //     $(window).on('scroll', function (e) {
        //         const scrollTop = document.documentElement.scrollTop || window.scrollY
        //         headings.each((idx, heading) => {
        //             if (scrollTop > $(heading).offset().top - 200) {
        //                 $(`.portal-main-toc-item-txt[href="#${$(heading).attr('id')}"]`).parent().addClass('active');;
        //                 $(`.portal-main-toc-item-txt[href="#${$(heading).attr('id')}"]`).parent().siblings().removeClass('active');

        //                 if ($(window).width() < 767) {
        //                     $('.portal-main-toc-curr-txt').text($(heading).text());
        //                 }
        //             }
        //         })
        //     })
        // }

        // setupTOC();
        // handleScrollDesktop();

        // if ($(window).width() < 767) {
        //     let stickyTop = $('.header').outerHeight();
        //     $('.portal-main-stick').css('top', stickyTop);
        // }

        // $(window).on('scroll', function (e) {
        //     const scrollTop = document.documentElement.scrollTop || window.scrollY
        //     if ($(window).width() < 767 && scrollTop > $('.header').height() * ratioScrollHeader) {
        //         // handleScrollMobile();
        //         $('.portal-main-stick-wrap').addClass('active');
        //     }
        //     else {
        //         $('.portal-main-stick-wrap').removeClass('active');
        //     }
        // })
    }

    scrollTop();
    $('.loader').animate({ opacity: 0 }, 5000, () => $('.loader').remove());
    marquee($('.last-cta-strip-marquee-list'));
    const pageName = $('main.main').attr('data-namespace');
    if (pageName) {
        SCRIPT[`${pageName}Script`]();
    }
}


window.onload = script;