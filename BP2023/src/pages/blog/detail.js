import { lenis } from "../../libs/lenis";

const blogDetail = {
    namespace: 'blogDetail',
    afterEnter() {
        console.log(`enter ${this.namespace}`);
        Prism.highlightAll();
        const createToc = (richtextEl) => {
            let headings = $(richtextEl).find('h2');
            let tocWrap = $('.toc-inner');

            if (headings.length <= 1) {
                tocWrap.parent().remove();
            }

            tocWrap.html('');
            for (let i = 0; i < headings.length; i++) {
                headings.eq(i).attr('id', `toc-${i}`);
                let tocItem = $('<a></a>').addClass('toc-item-link').attr('href', `#toc-${i}`);
                let tocOrdinal =  $('<div></div>').addClass('txt txt-12 toc-item-ordinal').text(`${i + 1 < 10 ? `0${i + 1}` : i + 1}`).appendTo(tocItem);
                let [ordinal, ...[title]] = headings.eq(i).text().split('. ');
                let tocName = $('<div></div>').addClass('txt txt-14 toc-item-txt').text(`${[ordinal].join('')}`).appendTo(tocItem);

                tocWrap.append(tocItem);
            }

            lenis.on('scroll', function ({ scroll }) {
                for (let i = 0; i < headings.length; i++) {
                    let top = headings.eq(i).get(0).getBoundingClientRect().top;
                    if (top > 0 && top < ($(window).height() / 5)) {
                        $(`.toc-item-link[href="#toc-${i}"]`).addClass('active');
                        $(`.toc-item-link`).not(`[href="#toc-${i}"]`).removeClass('active');
                    }
                }
            })

            $('.toc-item-link').on('click', function (e) {
                e.preventDefault();
                let target = $(this).attr('href');

                lenis.scrollTo(target, {
                    offset: -100
                })
                history.replaceState({}, '', `${window.location.pathname + target}`)
                return false;
            })

            function updateToc() {
                const currentToc = window.location.hash;
                if (!currentToc) return;
                if ($(currentToc).length) {
                    setTimeout(() => {
                        $(`.toc-item-link[href="${currentToc}"]`).trigger('click');
                    }, 10);
                } else {
                    history.replaceState({}, '', window.location.pathname)
                }
            }
            updateToc();
        }

        createToc('.bldetail-main-richtext');

        const socialShare = (btnList) => {
            let slug = window.location.pathname.split("/").slice(1);
            if (slug.length > 1) {
                const url = window.location.href;

                for (let i = 0; i < $(btnList).length; i++) {
                    let href, options;

                    const typeBtn = $(btnList).eq(i).attr("data-social");

                    switch (typeBtn) {
                        case 'fb':
                            href = "https://www.facebook.com/sharer/sharer.php?u=";
                            options = "%3F";
                            break;
                        case 'tw':
                            href = "https://twitter.com/share?url=";
                            options = "&summary=";
                            break;
                        case "link":
                            href = "https://www.linkedin.com/shareArticle?mini=true&url=";
                            options = "&summary=";
                            break;
                        default: break;
                    }
                    $(btnList).eq(i).attr("href", `${href}${url}%2F${options}`);
                }
            }
        }

        socialShare('.bldetail-social-ic');

        const heroParallaxImage = () => {
            let scaleTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.sc-bldetail-hero',
                    start: 'top top',
                    end: 'bottom top',
                    endTrigger: '.bldetail-hero-parallax',
                    scrub: true
                }
            })
            scaleTl.fromTo('.bldetail-hero-img', { scale: 1.4 }, { scale: 1 })

            let hideTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.bldetail-hero-dumy-parallax',
                    start: 'top bottom',
                    scrub: true
                }
            })
            hideTl.fromTo('.bldetail-hero-parallax', { yPercent: 0, opacity: 1 }, { yPercent: -50, opacity: 0 });
        }
        heroParallaxImage();

        const progressBar = () => {
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.bldetail-main-wrapper',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true
                }
            })
            tl.fromTo('.bldetail-hero-progress-bar', { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1 });
        }
        progressBar();
    },
    beforeLeave() {  }
}
export default blogDetail;