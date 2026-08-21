const mainScript = () => {
  console.log("init bp");
  let lenis = new Lenis();
  gsap.registerPlugin(ScrollTrigger);
  const viewport = {
    w: window.innerWidth,
    h: window.innerHeight
  };

  class Header {
    constructor() {
      this.el = null;
      this.isOpen = false;
      this.listDependent = [];
      this.hideTimeout = null;
    }
    init() {
      this.el = document.querySelector('.header');
      if (viewport.w <= 991) {
        this.toggleNav();
      }
    }
    updateOnScroll(inst) {
      if (!this.el) return;
      this.toggleHide(inst);
      this.toggleScroll(inst);
      this.onHideDependent();
    }
    toggleScroll(inst) {
      if (inst.scroll > $(this.el).height() * 0.5) {
        $(this.el).addClass("on-scroll");
      } else {
        $(this.el).removeClass("on-scroll");
      }
    }
    toggleHide(inst) {
      if (inst.direction === 1) {
        if (inst.scroll > $(this.el).height() * 0.5) {
          $(this.el).addClass('on-hide');
        }
      } else {
        $(this.el).removeClass("on-hide");
      }
    }
    registerDependent(dependentEl) {
      if ($(dependentEl).length > 0 && !this.listDependent.includes(dependentEl)) {
        this.listDependent.push(dependentEl);
        this.onHideDependent();
      }
    }
    unregisterDependent(dependentEl) {
      const dependentNodes = $(dependentEl).toArray();
      this.listDependent = this.listDependent.filter((item) => {
        return !$(item).toArray().some((node) => dependentNodes.includes(node));
      });
    }
    onHideDependent() {
      if (!this.el) return;
      let heightHeader = $(this.el).outerHeight();
      const isVisible = !$(this.el).hasClass('on-hide');

      this.listDependent.forEach((item) => {
        $(item).css('top', isVisible ? heightHeader + 'px' : '0px');
      });
    }
    toggleNav() {
      $(this.el).find('.header-menu-btn').on('click', (e) => {
        e.preventDefault();
        $(e.currentTarget).closest('.header-menu-btn').toggleClass('active');
        $(this.el).find('.header-menu').toggleClass('active');
      });
      if (viewport.w < 991) {
        $(this.el).find('.header-menu-item.has-submenu').on('click', function (e) {
          e.preventDefault();
          $(this).toggleClass('active');
          $(this).next('.header-menu-dropdown').slideToggle();
        });
      }
    }
  }

  const header = new Header();
  header.init();

  if ($(".main").attr("name-space") !== 'login') {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", function (inst) {
      header.updateOnScroll(inst);
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
      if (viewport.w > 767) {
        $('.about-list-post-pagi-item')?.each((idx, item) => {
          $(item).on('click', function () {
            if (!$(item).hasClass("w--current")) {
              handleScrollTop();
            }
          })
        })
        $('.about-list-post-pagi-next').on('click', function () {
          if (!$(this).hasClass("is-list-pagination-disabled")) {
            handleScrollTop();
          }
        })
        $('.about-list-post-pagi-prev').on('click', function () {
          if (!$(this).hasClass("is-list-pagination-disabled")) {
            handleScrollTop();
          }
        })
      }
    }
    const handleScrollTop = () => {
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
    // set link pdf newroom 
    const handleReplaceLink = () => {
      if ($('.about-list-post-item').length > 0) {
        $('.about-list-post-item').each((_idx, item) => {
          const pdfLink = $(item).find('.about-news-list-clone-link').attr('data-href');
          function isValidLink(link) {
            const urlPattern = /https?:\/\/[^\s]+/;
            return urlPattern.test(link);
          };
          if (isValidLink(pdfLink)) {
            $(item).find('.about-list-post-item-inner').attr('href', pdfLink);
            $(item).find('.about-list-post-item-inner').attr('target', '_blank');
          } else {
            const hrefInner = $(item).find('.about-list-post-item-inner').attr('href');
            if (!hrefInner || hrefInner === '#') {
              const title = $(item).find('.heading.txt-20').text().split(',')[0].trim();
              const slug = generateSlug(title);
              $(item).find('.about-list-post-item-inner').attr('href', `${document.location.href}/${slug}`);
            }
          }
        })
      }
    }
    // Initial binding
    handlePaginationClick();
    handleReplaceLink();

    // Watch for DOM changes
    const observer = new MutationObserver(() => {
      handlePaginationClick();
      handleReplaceLink();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });


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
  const initBlogTableOfContents = () => {
    const $table = $('.blog-dt-table');
    const $mobWrap = $('.blog-dt-table-mob');
    const $mobList = $('.blog-dt-table-mob .blog-dt-table-list');
    const $mobTitle = $('.blog-dt-table-title .txt, .blog-dt-table-title [class*="txt"], .blog-dt-table-title div, .blog-dt-table-title');
    const $headings = $('.tp-egc-richtext h3');

    if (($table.length === 0 && $mobWrap.length === 0) || $headings.length === 0) return;

    if ($mobWrap.length > 0) {
      header.registerDependent('.blog-dt-table-mob');
    }

    $table.empty();
    if ($mobList.length > 0) {
      $mobList.empty();
    }

    const headingData = [];

    $headings.each((index, el) => {
      const $h3 = $(el);
      if (!$h3.attr('id')) {
        $h3.attr('id', `heading-toc-${index}`);
      }
      const title = $h3.text().trim();
      const hasNumberPrefix = /^\d+[\.\)]\s*/.test(title);
      const displayText = hasNumberPrefix ? title : `${index + 1}. ${title}`;

      headingData.push({ el, title, displayText });

      const createItem = () => $(`
        <div class="blog-dt-table-item" data-index="${index}">
          <div class="txt-16 txt-med line-lamp-1">${displayText}</div>
        </div>
      `);

      if ($table.length > 0) {
        const $itemDesktop = createItem();
        $itemDesktop.on('click', function () {
          scrollToHeading(el);
        });
        $table.append($itemDesktop);
      }

      if ($mobList.length > 0) {
        const $itemMobile = createItem();
        $itemMobile.on('click', function () {
          scrollToHeading(el);
          $mobList.slideUp();
          $('.blog-dt-table-mob .blog-dt-table-title-wrap').removeClass('active');
        });
        $mobList.append($itemMobile);
      }
    });

    const scrollToHeading = (el) => {
      if (typeof lenis !== 'undefined' && lenis) {
        lenis.scrollTo(el, { offset: -100 });
      } else {
        const targetOffset = $(el).offset().top - 100;
        $('html, body').animate({ scrollTop: targetOffset }, 500);
      }
    };

    $('.blog-dt-table-title-wrap').off('click.mobToc').on('click.mobToc', function () {
      $(this).toggleClass('active');
      // $(this).siblings('.blog-dt-table-list').slideToggle();
    });

    const $desktopItems = $table.find('.blog-dt-table-item');
    const $mobileItems = $mobList.find('.blog-dt-table-item');

    const updateActiveState = () => {
      let activeIndex = -1;
      const threshold = 150;

      $headings.each((index, el) => {
        const top = el.getBoundingClientRect().top;
        if (top <= threshold) {
          activeIndex = index;
        }
      });

      if ($(window).scrollTop() + $(window).height() >= $(document).height() - 50) {
        activeIndex = $headings.length - 1;
      }

      if (activeIndex < 0 && $headings.length > 0) {
        activeIndex = 0;
      }

      $desktopItems.removeClass('active');
      $mobileItems.removeClass('active');

      if (activeIndex >= 0 && activeIndex < headingData.length) {
        $desktopItems.eq(activeIndex).addClass('active');
        $mobileItems.eq(activeIndex).addClass('active');

        const currentHeadingText = headingData[activeIndex].displayText;
        const $titleTxt = $('.blog-dt-table-title .txt, .blog-dt-table-title [class*="txt"]');
        if ($titleTxt.length > 0) {
          $titleTxt.text(currentHeadingText);
        } else if ($mobTitle.length > 0) {
          $mobTitle.eq(0).text(currentHeadingText);
        }
      }
    };

    if (typeof lenis !== 'undefined' && lenis) {
      lenis.on('scroll', updateActiveState);
    }
    $(window).on('scroll', updateActiveState);

    updateActiveState();
  };

  const initSocialShare = () => {
    const currentUrl = encodeURIComponent(window.location.href);

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
      x: `https://twitter.com/intent/tweet?url=${currentUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${currentUrl}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`
    };

    $('.blog-dt-main-side-share-list a[btn-type], [btn-type="facebook"], [btn-type="x"], [btn-type="linkedin"]').each((_, el) => {
      const $btn = $(el);
      const type = $btn.attr('btn-type');
      if (type && shareUrls[type]) {
        $btn.attr('href', shareUrls[type]);
        $btn.attr('target', '_blank');
        $btn.attr('rel', 'noopener noreferrer');

        $btn.off('click.socialShare').on('click.socialShare', function (e) {
          e.preventDefault();
          const width = 600;
          const height = 500;
          const left = (window.innerWidth - width) / 2;
          const top = (window.innerHeight - height) / 2;
          window.open(
            shareUrls[type],
            'socialShareWindow',
            `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
          );
        });
      }
    });
  };

  const handlePageFadeIn = () => {
    if (viewport.w < 767 || window.innerWidth < 767) return;

    if ($('.blog-dt-hero').length || $('.blog-dt-main').length) {
      $('.df-init').removeClass('df-init')
      gsap.from(['.blog-dt-hero', '.blog-dt-main-side-wrap', '.blog-dt-main-content'], {
        autoAlpha: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'all'
      });
    } else {
      gsap.from('.main', {
        autoAlpha: 0,
        y: 15,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }
  };

  SCRIPT.blogDetailScript = () => {
    handlePageFadeIn();
    initSocialShare();

    // check reference
    const ref = document.referrer;

    const btnBack = $('.blog-dt-main-side-btn');
    if (ref) {
      btnBack.attr('href', ref);
    } else {
      btnBack.attr('href', '/newsroom');
    }

    initBlogTableOfContents();
  };

  SCRIPT.egcDetailScript = () => {
    SCRIPT.blogDetailScript();
  };


  const pageName = $(".main").attr("name-space");
  if (pageName && typeof SCRIPT[`${pageName}Script`] === 'function') {
    SCRIPT[`${pageName}Script`]();
  }
};
window.onload = mainScript;

