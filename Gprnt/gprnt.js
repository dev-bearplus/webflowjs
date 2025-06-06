const mainScript = () => {
  console.log("init bp");
  let lenis = new Lenis();
  gsap.registerPlugin(ScrollTrigger);
  if ($(".main").attr("name-space") !== 'login') {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", function (inst) {
      if (inst.scroll > $(".header").height() * 0.5) {
        if (inst.direction >= 1) {
          $(".header").addClass("on-hide");
        } else {
          $(".header").removeClass("on-hide");
        }
        $(".header").addClass("on-scroll");
      } else {
        $(".header").removeClass("on-scroll");
        $(".header").removeClass("on-hide");
      }
    });
  }
  else {
    $(".header").addClass("on-scroll");
  }

  $('.footer-links-label-wrap').on('click', function () {
    $(this).toggleClass('active');
    $('.footer-links-col-arrow').removeClass('active')
    $(this).find('.footer-links-col-arrow').toggleClass('active')
    $('.footer-links-listing-wrap').slideUp();
    if ($(this).hasClass('active')) {
      $(this).next('.footer-links-listing-wrap').slideDown();
      $('.footer-links-label-wrap').removeClass('active')
      $(this).addClass('active')
    }
    else {
      $(this).find('.footer-links-col-arrow').removeClass('active')
      $('.footer-links-label-wrap').removeClass('active')

    }
  })
  $('.header-item-link.has-submenu').on('click', function (e) {
    e.preventDefault();
    if (viewport.w < 767) {
      $(this).toggleClass('active');
      $('.header-item-link.has-submenu .header-item-link-ic').removeClass('active')
      $(this).find('.header-item-link-ic').toggleClass('active')
      $('.header-item-drop-wrap').slideUp();
      if ($(this).hasClass('active')) {
        $(this).next('.header-item-drop-wrap').slideDown();
        $('.header-item-link.has-submenu').removeClass('active')
        $(this).addClass('active')
      }
      else {
        $(this).find('.ic-embed').removeClass('active')
        $('.header-item-link.has-submenu').removeClass('active')
      }
    }
  })

  $('.home-header-toggle').on('click', () => {
    $('.header').toggleClass('active')
  })
  function activeItem(elArr, index) {
    elArr.forEach((el, idx) => {
      $(el).removeClass('active').eq(index).addClass('active')
    })
  }
  const viewport = {
    w: window.innerWidth,
    h: window.innerHeight
  }
  const parseRem = (input) => {
    return (input / 10) * parseFloat($("html").css("font-size"));
  };
  function platformHero() {
    let elArr = ['.plat-hero-role-item', '.plat-body-inner'];
    // $('.plat-hero-role-item').on('click', function () {
    //   let index = $(this).index();
    //   activeItem(elArr, index);
    // })
    if (viewport.w < 767) {
      $('.plat-hero-role-wrap').addClass('swiper');
      $('.plat-hero-role-inner').addClass('swiper-wrapper');
      $('.plat-hero-role-item').addClass('swiper-slide');
      let index = $('.plat-hero-role-item.w--current').index();
      console.log(index);
      let platHeroSwiper = new Swiper(".plat-hero-role-wrap", {
        slidesPerView: 1.1,
        spaceBetween: parseRem(20),
        on: {
          init: function () {
            this.slideTo(index);
            // activeItem(elArr, index);
          },
        },
      })
      // $('.plat-testi-wrap').addClass('swiper');
      // $('.plat-testi-inner').addClass('swiper-wrapper');
      // $('.plat-testi-item').addClass('swiper-slide');
      // let elArrTesti = ['.plat-testi-item']
      // activeItem(elArrTesti, 0);
      // let platTestiSwiper = new Swiper(".plat-testi-wrap", {
      //   slidesPerView: 1.1,
      //   spaceBetween: parseRem(20),
      //   on: {

      //     slideChange: function () {
      //       activeItem(elArrTesti, this.activeIndex);
      //       console.log(this.activeIndex)
      //     },
      //   },
      // })
    }
  }
  function handleSwiperMobile({ swiper, wrap, slide }) {
    if (viewport.w < 767) {
      $(swiper).addClass('swiper');
      $(wrap).addClass('swiper-wrapper');
      $(slide).addClass('swiper-slide');

      const swiperM = new Swiper(swiper, {
        slidesPerView: 1.1,
        spaceBetween: parseRem(16),
        createElements: true,
        pagination: true
      })
      return swiperM
    }
  }
  const generateSlug = (text) => {
    return text
      ?.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')         // Replace spaces with hyphens
      .replace(/-+/g, '-')          // Replace multiple hyphens with single hyphen
      .trim()                      // Remove leading/trailing spaces
  };

  function handleSwiperFullSize({ swiper, wrap, slide, button, isCenter, hidePagination, ...props }) {
    //cs-testi-slide
    $(swiper).addClass('swiper');
    $(wrap).addClass('swiper-wrapper');
    $(slide).addClass('swiper-slide');
    $(wrap).css('flex-wrap', 'nowrap')
    setTimeout(() => {
      const $disabled = $(swiper).parent().find('.cs-testi-disabled');

      if ($disabled.length === 2) {
        $(button).addClass('is-hide');
        $(swiper).find('.swiper-pagination').remove()
      }
      if ($(swiper).find('.swiper-pagination').children().length < 2) {
        $(swiper).find('.swiper-pagination').remove()
        $(`${button}-prev`).remove()
        $(`${button}-next`).remove()
      }
    }, 1000);


    let siwperCustom = new Swiper(swiper, {
      navigation: {
        enabled: true,
        nextEl: `${button}-next`,
        prevEl: `${button}-prev`,
        disabledClass: 'cs-testi-disabled'
      },
      createElements: true,
      observer: true,
      slidesPerView: 1,
      observeParents: true,
      pagination: !hidePagination,
      breakpoints: {
        0: {
          slidesPerView: 1.1,
          spaceBetween: parseRem(16),
        },
        768: {
          slidesPerView: 2,
          spaceBetween: parseRem(24),
        },
        991: {
          slidesPerView: 3,
          centeredSlides: isCenter ? true : false,
          centeredSlidesBounds: isCenter ? true : false,
          spaceBetween: parseRem(24),
          ...props
        },
      }
    })
    return siwperCustom
  }
  let SCRIPT = {};
  SCRIPT.homeScript = () => {

    const handleMoveCursor = () => {
      $('.home-resol-content-gr-center-circle-wrap').each((idx, item) => {
        const $item = $(item);
        const $itemInner = $item.find('.home-resol-content-gr-center-circle');
        const $btn = $(item).find('.home-resol-content-gr-center-circle-link');
        const $btnInner = $btn.find('.btn-ic-inner');
        const xSetter = gsap.quickSetter($btn.get(0), 'left', `px`);
        const ySetter = gsap.quickSetter($btn.get(0), 'top', `px`);

        $itemInner.on('mousemove', function (e) {
          let x = e.pageX - $item.offset().left - $btnInner.width() / 2;
          let y = e.pageY - $item.offset().top - $btnInner.height() / 2;

          xSetter(x);
          ySetter(y);
        })

        $item.on('mouseenter', function () {
          console.log('mouseenter')
          $btnInner.addClass('active');
        })
        $item.on('mouseleave', function () {
          $btnInner.removeClass('active');
          console.log('mouseleave')
        })
      })
    }
    const handleActiveTabMobile = () => {
      if ($(window).width() < 767) {
        $('.home-resol-content-grps').length > 0 && $('.home-resol-content-grps').each((_i, item) => {
          const btnHead = $(item).find('.home-resol-content-grps-head');
          const titleHead = $(item).find('.home-resol-content-grps-head-title');
          const grContent = $(item).find('.home-resol-content-gr');
          btnHead.on('click', () => {

            if (!btnHead.hasClass('active')) {
              $('.home-resol-content-grps-head').removeClass('active')
              $('.home-resol-content-grps-head-title').removeClass('active')
              $('.home-resol-content-gr').removeClass('active')

              btnHead.addClass('active')
              titleHead.addClass('active')
              grContent.addClass('active')
            }
          })
        })
      }
    }


    handleMoveCursor();
    handleActiveTabMobile()
    // handleSwiperMobile({
    //   swiper: '.home-reprob-list-wrap',
    //   wrap: '.home-reprob-list',
    //   slide: '.home-reprob-item'
    // })
    handleSwiperFullSize({
      swiper: '.home-user-cms',
      wrap: '.home-user-list',
      slide: '.home-user-item',
      button: '.home-user-wrap-btn',
      hidePagination: true
    })

  }
  SCRIPT.platformScript = () => {
    platformHero();
    console.log('kaka')
    handleSwiperFullSize({
      swiper: '.plat-testi-wrap',
      wrap: '.plat-testi-inner',
      slide: '.plat-testi-item',
      button: '.plat-testi-wrap-btn',
    })
  }

  SCRIPT.ecosystemScript = () => {
    function ecosystemHero() {
      let elArr = ['.eco-network-global-tab', '.eco-network-global-thumb-item'];
      $('.eco-network-global-tab').on('click', function () {
        let index = $(this).index();
        activeItem(elArr, index);
      })
    }
    ecosystemHero();
    $('.eco-strategic-cms').addClass('swiper');
    if (viewport.w < 767) {
      $('.eco-strategic-list').addClass('swiper-wrapper');
      $('.eco-strategic-item').addClass('swiper-slide');
      let ecoStrategicSwiper = new Swiper(".eco-strategic-cms", {
        slidesPerView: 1,
        spaceBetween: parseRem(20),
      })
    }
    handleSwiperFullSize({
      slide: '.eco-hub-list-item',
      wrap: '.eco-hub-list-wrap',
      swiper: '.eco-hub-list',
      button: '.eco-hub-wrap-btn',
      isCenter: false,
      slidesPerGroup: window.innerWidth > 991 ? 3 : 1
    })
  }
  SCRIPT.aboutScript = () => {

    if (viewport.w < 767) {
      $('.about-list-filter').addClass('swiper');
      $('.about-list-filter-inner').addClass('swiper-wrapper');
      $('.about-list-filter-item').addClass('swiper-slide');
      new Swiper('.about-list-filter', {
        slidesPerView: 'auto',
        spaceBetween: parseRem(12),
        observer: true,
        observeParents: true,
        centerSlide: true,
      })

      $(window).on('scroll', function () {
        if ($(window).scrollTop() > $(".header").height()) {
          $('.about-list-scroll-top').addClass('active');
        } else {
          $('.about-list-scroll-top').removeClass('active');
        }
        $('.about-list-scroll-top').on('click', function () {
          lenis.scrollTo(0, {
            duration: 1,
            lock: true

          })
        })
      });
    }
    const handlePaginationClick = () => {
      $('.about-list-post-pagi-item')?.each((idx, item) => {
        $(item).on('click', function () {
          if (!$(item).hasClass("w--current")) {
            lenis.scrollTo(0, {
              duration: 0.8,
              lock: true,
              force: true,
              delay: 0.1,
              onComplete: () => {
                console.log('complete')
              }
            })
          }
        })
      })
    }

    // Initial binding
    handlePaginationClick();

    // Watch for DOM changes
    const observer = new MutationObserver(() => {
      handlePaginationClick();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    // set link pdf newroom 
    if ($('.about-news-list-item').length > 0) {
      $('.about-news-list-item').each((_idx, item) => {
        const pdfLink = $(item).find('.about-news-list-clone-link').attr('href');
        function isValidLink(link) {
          const urlPattern = /https?:\/\/[^\s]+/;
          return urlPattern.test(link);
        };
        if (isValidLink(pdfLink)) {
          $(item).find('.about-news-list-item-inner').attr('href', pdfLink);
          $(item).find('.about-news-list-item-inner').attr('target', '_blank');
        } else {
          const hrefInner = $(item).find('.about-news-list-item-inner').attr('href');
          if (!hrefInner || hrefInner === '#') {
            const title = $(item).find('.heading.txt-20').text().split(',')[0].trim();
            const slug = generateSlug(title);
            $(item).find('.about-news-list-item-inner').attr('href', `${document.location.href}/${slug}`);
          }
        }
      })
    }

    $('.about-history-main').each((idx, item) => {
      let tl = new gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: viewport.w > 767 ? 'top center' : 'top bottom-=20%',
          end: 'bottom center',
          onEnter: () => {
            // $('.about-history-time-img').removeClass('active');
            // $('.about-history-time-year-l').removeClass('active')
            // $('.about-history-time-deco').removeClass('active');
            $(item).find('.about-history-time-deco').addClass('active');
            $(item).find('.about-history-time-year-l').addClass('active');
            $(item).find('.about-history-time-img').addClass('active');
          },
          onEnterBack: () => {
            // $('.about-history-time-img').removeClass('active');
            // $(item).find('.about-history-time-img').addClass('active')
            // $('.about-history-time-deco').removeClass('active');
            // $(item).find('.about-history-time-deco').addClass('active');
            // $('.about-history-time-year-l').removeClass('active');
            // $(item).find('.about-history-time-year-l').addClass('active')
          }
        }
      })
    })
    //FAQS

    //Remove Button When No Item
    $('.about-faqs-content-list').each((idx, item) => {
      if ($(item).find('.about-faqs-content-list-inner').children().length === 0) {
        const attrList = $(item).attr('data-faqs-list');
        $('.about-faqs-filter-item').each((_id, btn) => {
          if ($(btn).attr('faqs-cate') === attrList) {
            $(btn).remove()
          }
        })
      };

      $(item).find('.about-faqs-content-item').each((id, faq) => {
        $(faq).on('click', () => {
          if ($(faq).hasClass('active')) {
            handleSetHeight(idx, faq, true);
          } else {
            handleSetHeight(idx, faq);
          }
        })
      })

    })
    if ($('.about-faqs-content-item').length > 0) {
      $('.about-faqs-content-item').on('click', function () {
        if (!$(this).hasClass('active')) {
          $('.about-faqs-content-item').removeClass('active');
          $(this).addClass('active');
        } else {
          $('.about-faqs-content-item').removeClass('active');
        }
      })
    }
    if ($('.about-faqs-filter-item').length > 0) {
      $('.about-faqs-filter-item').each((id, item) => {
        $(item).on('click', function () {
          const title = $('.about-faqs-content-title');
          const attr = $(this).attr('faqs-cate');
          if (!$(this).hasClass('active')) {
            $('.about-faqs-filter-item').removeClass('active');
            $(this).addClass('active');
            title.text($(this).find('.about-faqs-filter-item-txt').text());
            handleSetHeight(id,)
            $('.about-faqs-content-list').each((_idx, item) => {
              if ($(item).attr('data-faqs-list') === attr) {
                $(item).addClass('active');
              } else {
                $(item).removeClass('active');
              }
            })
          }
        });
      })
    }


    // Set Height; 
    const handleSetHeight = (id, elChild, isReset) => {
      $('.about-faqs-content-list-inner').each((index, item) => {
        if (id === index) {

          const $heightRemove = elChild && !isReset ? 0 : $(elChild)?.find('.bp-richtext').outerHeight(true);

          $('.about-faqs-content-wrap').css('min-height', $(item).outerHeight(true) + 'px');
          $('.about-faqs-content-wrap').css('max-height', $(item).outerHeight(true) - $heightRemove + $(elChild)?.find('.bp-richtext').outerHeight(true) || 0 + 'px');
        }
      })
    }
    handleSetHeight(0)
    //END FAQS

    handleSwiperMobile({
      swiper: '.about-team-meet-list',
      wrap: '.about-team-meet-list-wrap',
      slide: '.about-team-meet-list-item',
    })

    handleSwiperMobile({
      swiper: '.about-comp-list',
      wrap: '.about-comp-list-wrap',
      slide: '.about-comp-list-item'
    })

    handleSwiperFullSize({
      slide: '.about-news-list-item',
      wrap: '.about-news-list-wrap',
      swiper: '.about-news-list',
      button: '.about-news-wrap-btn',
      isCenter: true,
      slidesPerGroup: window.innerWidth > 991 ? 3 : 1
    })
    handleSwiperFullSize({
      slide: '.about-lead-list-item',
      swiper: '.about-lead-list',
      wrap: '.about-lead-list-wrap',
      button: '.about-lead-wrap-btn',
      isCenter: true
    })
  }
  SCRIPT.subpageScript = () => {
    class SubsContent {
      constructor() {
        this.tlTrigger;
        this.tlFade;
      }
      setTrigger() {
        if (viewport.w <= 767) {
          this.setup();
        }
        else {
          this.tlTrigger = gsap.timeline({
            scrollTrigger: {
              trigger: '.subs-content',
              start: 'top bottom+=50%',
              end: 'bottom top',
              once: true,
              onEnter: () => {
                this.setup();
              },
            }
          })
        }
      }
      setup() {
        let tocHeadings = $('.subs-content-main-richtxt h2');

        let tocWrap = $('.subs-content-tocs-inner');
        if (tocHeadings.length <= 1) {
          tocWrap.parents('.subs-content-toc-wrap').remove();
        }
        tocWrap.html('');

        for (let i = 0; i < tocHeadings.length; i++) {
          tocHeadings.eq(i).attr('id', `toc-${i}`);
          let tocItem = $('<a></a>').addClass('subs-content-toc').attr('href', `#toc-${i}`);
          let tocName = $('<div></div>').addClass('txt txt-16 txt-med subs-toc-txt').text(tocHeadings.eq(i).text());

          tocName.appendTo(tocItem)
          tocWrap.append(tocItem);
        }
        if (tocWrap.height() > $('.subs-content-tocs').height()) {
          $('.subs-content-tocs').attr('data-lenis-prevent', true);
        }
        $('.subs-content-toc').each((idx, el) => {
          gsap.from(el, {
            autoAlpha: 0, yPercent: 70, duration: .8, stagger: 0.02, delay: idx * .05, clearProps: 'all', onComplete: () => {
              if (idx == $('.subs-content-toc').length - 1) {
                this.interact();
              }
            }
          });
        })
        gsap.from('.subs-content-inner', { autoAlpha: 0, y: 20, duration: .6 });
      }
      interact() {
        let tocHeadings = $('.subs-content-main-richtxt h2');

        lenis.on('scroll', function (e) {
          let currScroll = e.scroll;
          for (let i = 0; i < tocHeadings.length; i++) {
            let top = tocHeadings.eq(i).get(0).getBoundingClientRect().top;
            console.log(top)

            if (top > 0 && top < (viewport.h / 5)) {
              $(`.subs-content-toc[href="#toc-${i}"]`).addClass('active');
              $(`.subs-content-toc`).not(`[href="#toc-${i}"]`).removeClass('active');
            }
          }
        });

        $('.subs-content-toc').on('click', function (e) {
          e.preventDefault();
          let target = $(this).attr('href');

          lenis.scrollTo(target, {
            offset: -100,
          })

          history.replaceState({}, '', `${window.location.pathname + target}`);
          return false;
        })

        const currToc = window.location.hash;
        if ($(currToc).length) {
          setTimeout(() => {
            $(`.subs-content-toc[href='${currToc}']`).trigger('click');
          }, 10)
        }
        else {
          history.replaceState({}, '', window.location.pathname);
        }
      }
    }
    let subsContent = new SubsContent();
    subsContent.setTrigger();
  }
  SCRIPT.partnerScript = () => {
    console.log('partner')
    $('.partner-mark-cms').each((idx, item) => {
      let duplicate = Math.floor(viewport.w / ($(item).find('.partner-mark-list').width())) + 1;
      console.log(duplicate)
      for (let i = 0; i < duplicate; i++) {
        let $originalListBrand = $(item).find(".partner-mark-list").eq(0);
        let $clonedListBrand = $originalListBrand.clone();
        // console.log($(".partner-mark-cms"))
        $(item).append($clonedListBrand);
      }
      $(item).find('.partner-mark-list').addClass('anim');
    })
  }

  SCRIPT.customersScript = () => {
    platformHero(); //reuse
    handleSwiperFullSize({
      swiper: '.cs-testi-wrap',
      button: '.cs-test-wrap-btn',
      wrap: '.cs-testi-slide-wrap',
      slide: '.cs-testi-item',
    })
    handleSwiperMobile({
      swiper: '.cs-usecase-list',
      wrap: '.cs-usecase-list-inner',
      slide: '.cs-usecase-list-item'
    })
  }
  SCRIPT.blogDetailScript = () => {
    $('[btn-type="facebook"]').attr('href', `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`);
    $('[btn-type="x"]').attr('href', `https://twitter.com/intent/tweet?url=${window.location.href}`);
    $('[btn-type="linkedin"]').attr('href', `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`);


    // check reference
    const ref = document.referrer;

    const btnBack = $('.blog-dt-main-side-btn')
    if (ref) {
      btnBack.attr('href', ref)
    } else {
      btnBack.attr('href', '/newsroom')
    }
  }


  const pageName = $(".main").attr("name-space");
  if (pageName) {
    SCRIPT[`${pageName}Script`]();
  }
};
window.onload = mainScript;

