const viewport = {
  w: window.innerWidth,
  h: window.innerHeight
}
let lastScrollTop = 0;
let direction = 1
const xSetter = (el) => gsap.quickSetter(el, 'x', `px`);
const ySetter = (el) => gsap.quickSetter(el, 'y', `px`);
const xGetter = (el) => gsap.getProperty(el, 'x');
const yGetter = (el) => gsap.getProperty(el, 'y');
const mainScript = () => {
  function footerForm() {
    $(document).on("submit", "#email-form", function () {
      $("#email-form")[0].reset();
      setTimeout(() => {
        $(".w-form-done").css("display", "none");
      }, 7000);
    });
    $('.footer-content-message-contact-form-input').on('blur', function () {
      if ($(this).val() != '') {
        $(this).closest('.footer-content-message-contact-form').addClass('active');
      }
      else {
        $(this).closest('.footer-content-message-contact-form').removeClass('active');
      }
    })
    const titleFooter = new SplitType($(".footer-brand-title"), {
      types: "lines, words",
      lineClass: "line",
    });
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".footer-brand",
        start: "top bottom-=10%",
        once: true,
      },
      defaults: { ease: "power1.out" },
      onComplete: () => {
        SplitType.revert(".footer-brand-title");
      },
    });

    tl.from(".footer-brand-wrap-link", {
      yPercent: 60,
      autoAlpha: 0,
      duration: 0.5,
      clearProps: "all",
    })
      .from(
        titleFooter.words,
        { yPercent: 100, autoAlpha: 0, duration: 0.5, stagger: 0.03 },
        "<=0"
      )
      .from(
        ".footer-brand-social-btn-ic",
        {
          yPercent: 60,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.03,
          clearProps: "all",
        },
        "<=0"
      );

    const titleFooterContent = new SplitType($(".footer-content-title"), {
      types: "lines, words",
      lineClass: "line",
    });
    gsap.set([...titleFooterContent.lines], { overflow: "hidden" });

    let tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".footer-content-title",
        start: "top bottom-=10%",
        once: true,
      },
      defaults: { ease: "power1.out" },
      onComplete: () => {
        SplitType.revert(".footer-content-title");
      },
    });
    tl2
      .from(titleFooterContent.words, {
        yPercent: 60,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.03,
      })
      .from(
        ".footer-content-btn",
        { yPercent: 60, autoAlpha: 0, duration: 0.6 },
        "<=.2"
      );

    const descFooterContent = new SplitType(
      $(".footer-content-message-subtitle"),
      {
        types: "lines, words",
        lineClass: "line",
      }
    );
    let tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".footer-content-message",
        start: "top bottom-=10%",
        once: true,
      },
      defaults: { ease: "power1.out" },
      onComplete: () => {
        SplitType.revert(".footer-content-message-subtitle");
      },
    });
    tl3
      .from(".footer-content-message-subscribe", {
        yPercent: 60,
        autoAlpha: 0,
        duration: 0.6,
      })
      .from(
        descFooterContent.words,
        { yPercent: 100, autoAlpha: 0, duration: 0.3, stagger: 0.03 },
        "<=.2"
      )
      .from(
        ".footer-content-message-contact",
        { yPercent: 30, autoAlpha: 0, duration: 0.4 },
        "<=.2"
      );
    const listMenu = $(".footer-menu-list");
    listMenu.each((idx, item) => {
      const title = $(item).find(".footer-menu-list-inner-link");
      let tlItem = gsap.timeline({
        scrollTrigger: {
          trigger: $(item),
          start: "top bottom-=10%",
          once: true,
        },
        defaults: { ease: "power1.out" },
        onComplete: () => { },
      });
      tlItem
        .from($(item).find(".footer-menu-list-title"), {
          yPercent: 100,
          autoAlpha: 0,
          duration: 0.8,
          clearProps: "all",
        })
        .from(
          title,
          {
            yPercent: 100,
            autoAlpha: 0,
            duration: 0.6,
            stagger: 0.04,
            clearProps: "all",
          },
          "<=.1"
        );
    });
    let tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: ".footer-bottom",
        start: "top bottom",
        once: true,
      },
      defaults: { ease: "power1.out" },
      onComplete: () => { },
    });
    tl4
      .from($(".footer-bottom-license"), {
        yPercent: 100,
        autoAlpha: 0,
        duration: 0.6,
        clearProps: "all",
      })
      .from(
        $(".footer-bottom-menu-item"),
        {
          yPercent: 100,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.06,
          clearProps: "all",
        },
        "<=.0"
      )
      .from(
        $(".footer-bottom-menu-go-top"),
        {
          yPercent: 100,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.06,
          clearProps: "all",
        },
        "<=.0"
      )
      .from($(".slash"), {
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.06,
        clearProps: "all",
      });
  }
  gsap.registerPlugin(ScrollTrigger);
  const parseRem = (input) => {
    return (input / 10) * parseFloat($("html").css("font-size"));
  };

  const handleScroll = () => {
    const currentScrollTop = window.scrollY;
    direction = currentScrollTop > lastScrollTop ? 1 : -1;
    lastScrollTop = currentScrollTop;
  }
  $(window).on("scroll", function () {
    handleScroll()
    if ($(window).scrollTop() > $(".bp-header").height() * 1.5) {
      if (direction >= 1) {
        $(".bp-header").addClass("on-hide");
        $('.header-menu-sub-wrap').removeClass('active');
        $('.header-menu-sub-wrap').slideUp()
      } else {
        $(".bp-header").removeClass("on-hide");
      }
      $(".bp-header").addClass("on-scroll");

    } else {
      $(".bp-header").removeClass("on-scroll");
      $(".bp-header").removeClass("on-hide");
    }
  });
  $(".home-header-toggle").on("click", function () {
    $(".bp-header").toggleClass("active");
  });

  function debounce(func, delay = 100) {
    let timer;
    return function (event) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, delay, event);
    };
  }

  function refreshOnBreakpoint() {
    let initialViewportWidth =
      window.innerWidth || document.documentElement.clientWidth;
    // portrait mobile viewport initial, any change refresh
    if (initialViewportWidth < 480) {
      $(window).on(
        "resize",
        debounce(function () {
          let newViewportWidth =
            window.innerWidth || document.documentElement.clientWidth;
          if (newViewportWidth > 479) {
            location.reload();
          }
        })
      );
    }
    // landscape mobile viewport initial, any change refresh
    else if (initialViewportWidth < 768) {
      $(window).on(
        "resize",
        debounce(function () {
          newViewportWidth =
            window.innerWidth || document.documentElement.clientWidth;
          if (newViewportWidth > 767) {
            location.reload();
          }
        })
      );
    }
    // tablet viewport initial, any change refresh
    else if (initialViewportWidth > 767 && initialViewportWidth < 992) {
      $(window).on(
        "resize",
        debounce(function () {
          newViewportWidth =
            window.innerWidth || document.documentElement.clientWidth;
          if (newViewportWidth < 768 || newViewportWidth > 991) {
            location.reload();
          }
        })
      );
    }
    // web viewport initial, any change refresh
    else if (initialViewportWidth > 991) {
      $(window).on(
        "resize",
        debounce(function () {
          let newViewportWidth =
            window.innerWidth || document.documentElement.clientWidth;
          console.log(newViewportWidth)
          // if (newViewportWidth < 992) {
          location.reload();
          // }
        })
      );
    }
  }
  if ($(window).width() < 991) {
    $(".footer-menu-list-title-wrap").on("click", function () {
      $(".footer-menu-list-inner")
        .not($(this).siblings(".footer-menu-list-inner"))
        .slideUp()
        .removeClass("active");

      $(".footer-menu-list-title-wrap").not($(this)).removeClass("active");
      $(this).toggleClass("active");

      var submenu = $(this).siblings(".footer-menu-list-inner");
      submenu.toggleClass("active");

      if (!submenu.hasClass("active")) {
        submenu.slideUp();
      } else {
        submenu.slideDown();
      }
    });
  }
  // Replace use-case link 
  if ($('.header-menu-sub-bot-menu-item').length > 0) {
    $('.header-menu-sub-bot-menu-item').each((_index, nav) => {
      $(nav).attr('href', function (index, href) {
        const pathname = window.location.pathname
        let prefix = ''
        if (pathname !== '/use-cases') {
          prefix = '/use-cases/'
        }
        return href?.replace('/use-case-large-language-modes/', `${prefix}#`);
      });
    })
  }
  refreshOnBreakpoint();

  const SCRIPT = {};

  function globalScript() {
    if ($(".hide-def-div").length > 0) {
      $(".hide-def-div").removeClass("hide-def-div");
    }
  }
  function headerScript() {
    if (viewport.w < 767) {
      $('.header-menu-links-item.has-menu-sub').on('click', function (e) {
        e.preventDefault();
        $(this).next('.header-menu-sub-wrap').slideToggle();
        // $(this).find('.header-menu-links-item').toggleClass('active')
      })
    }

    $('.bp-header').on('mouseenter', function () {
      if (viewport.w > 767) {
        $('.header-menu-sub-wrap').css("cssText", "display: block!important");
      }
    })
    $('.header-menu-sub-bot-menu-item-title').each(function () {
      let formattedText = $(this).text().replace(/\/n/g, '');
      $(this).html(formattedText);
    });
    ;
    const homeHeader = $(".bp-header ");
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".main",
        start: "top top+=10%",
        once: true,
      },
      defaults: { ease: "power1.out" },
    });
    // gsap.set(homeHeader, {yPercent: -100})
    // tl
    // .to(homeHeader,{ yPercent: 0, duration: 0.5, clearProps: "all" })
    // .to('.global-marquee-top',{ yPercent: 100, duration: 0.6},"<=0");
  }
  SCRIPT.homeScript = () => {

    function globalMarquee() {
      let marquee_inner = $(".global-marquee-inner");
      let globalMarquee = $(".global-marquee");

      if (globalMarquee.length) {
        globalMarquee.each(function (index, item) {
          $(item).append(marquee_inner.clone());
        });
        gsap.set('.global-marquee-inner', {
          xPercent: -100,
        })
        const tlMarquee = gsap.timeline({
          repeat: -1,
        });
        tlMarquee.to(".global-marquee-inner", { // to right
          xPercent: 0,
          duration: 50,
          ease: "none",
        });
        $(".global-marquee").on("pointerenter", function (e) {
          gsap.to(tlMarquee, {
            timeScale: 0,
            duration: 1,
            ease: "none",
          });
        });
        $(".global-marquee").on("pointerleave", function (e) {
          gsap.to(tlMarquee, {
            timeScale: 1,
            duration: 1,
            ease: "none",
          });
        });
      }
    }

    function homeHero() {
      const width = $(".home-hero-v2-tab-item").width();
      const length = Math.floor($(window).width() / width) + 1;
      function initShaderArt() {
        const $shaderArt = $('.home-hero-v2 shader-art');
        if ($shaderArt.length) {
          $shaderArt.attr('autoplay', '');
          console.log('Shader has been initialized.');
        } else {
          console.error('Shader element not found!');
        }
      }
      // const titleTop = new SplitType($(".home-hero-v2-title-top"), {
      //   types: "lines, words",
      //   lineClass: "line",
      // });
      // const titleBot = new SplitType($(".home-hero-v2-title-bot"), {
      //   types: "lines, words",
      //   lineClass: "line",
      // });
      // const homeTabItemTxt = new SplitType(".home-hero-tab-content-txt", { types: 'lines, words', lineClass: 'lines' });
      // gsap.set([...titleTop.lines, ...titleBot.lines], { overflow: "hidden" });
      // gsap.set(homeTabItemTxt.words, {autoAlpha: 0 , yPercent: 100})
      // gsap.set(titleTop.words, {autoAlpha: 0, yPercent: 100})
      // gsap.set(titleBot.words, {autoAlpha: 0, yPercent: 70})
      // gsap.set('.home-hero-marquee', {autoAlpha: 0, y: 40})
      // let tl = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: ".main-wrap",
      //     start: "top top+=10%",
      //     once: true,
      //   },
      //   defaults: { ease: "power1.out" },
      //   onComplete: () => {
      //     SplitType.revert(".home-hero-v2-title-top, .home-hero-v2-title-bot");
      //   },
      // });
      // tl
      //   .to(".home-hero-v2-canvas-inner", { autoAlpha: 1, duration: .6 })
      //   .to(titleTop.words,{ yPercent: 0, autoAlpha: 1, duration: .6, stagger: 0.02 },"<=.0")
      //   .to(titleBot.words,{ yPercent: 0, autoAlpha: 1, duration: .6, stagger: 0.02 },"<=.2")
      //   .to(homeTabItemTxt.words, {autoAlpha: 1, yPercent: 0, duration: .4, stagger: .015}, '<=.2')
      //   .to('.home-hero-marquee', {
      //     autoAlpha: 1, y: 0, duration: .6, clearProps: 'all'}, '<=.1')
    }
    function homeAbout() {
      if ($('[data-home-var="ver1"]').length) {
        let tlHomeAbtV1Head = gsap.timeline({
          scrollTrigger: {
            trigger: ".home-about-v1-block",
            start: "top top+=30%",
            end: `top top`,
            // scrub: "true",
          },
        });
        let allSplitText = [];
        // let allItems = $(".home-about-v1-item .txt");
        // allItems.each((idx, item) => {
        //   let splitText = new SplitType(item, {
        //     types: "lines, words",
        //     lineClass: "line",
        //   });
        //   gsap.set(splitText.words, { autoAlpha: 0, yPercent: 60 });
        // });
        // let tlHomeAbtV1 = gsap.timeline({
        //   scrollTrigger: {
        //     trigger: ".home-about-v1 .bp-container:nth-child(1)",
        //     start: viewport.w > 767 ? "top top+=70%" : "top top+=45%",
        //     // end: `bottom bottom`,
        //     // scrub: "true",
        //   },
        // });
        // tlHomeAbtV1.to('.home-about-v1-item .word', { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
        // tlHomeAbtV1
        //   .to(allSplitText[0].words, {
        //     color: '#E7CCFF',
        //     duration: 1, 
        //     stagger: {
        //       each: .5, 
        //       ease: "none", 
        //     },
        //   })
        let tlHomeAbtV1Extra = gsap.timeline({
          scrollTrigger: {
            trigger: ".home-about-v1-block",
            start: `bottom bottom`,
            endTrigger: ".home-paper.mod-v1",
            end: `bottom bottom+=50%`,
            scrub: "true",
          },
        });
      } else if ($('[data-home-var="ver2"]').length) {
        const textInfor = new SplitType(".home-about-content", {
          wordClass: "split-word",
          types: "lines, words",
        });

        gsap.set(textInfor.lines, { overflow: "hidden" });
        gsap.set(textInfor.words, { color: "rgba(255, 255, 255, 0.15)" });

        gsap.to(textInfor.words, {
          color: "#E7CCFF",
          ease: "power4.inOut",
          duration: 1,
          stagger: 0.133,
          scrollTrigger: {
            trigger: ".home-about-inner",
            start: "top top+=70%",
            end: "bottom center",
            scrub: true,
          },
        });
      }
    }

    function homePaper() {
      const $card = $(".home-paper-item-v2");
      let bounds

      function rotateToMouse(event, element) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;
        const center = {
          x: leftX - bounds.width / 2,
          y: topY - bounds.height / 2,
        };
        const distance = Math.sqrt(center.x ** 2 + center.y ** 2);
        gsap.to(element, {
          rotationX: (center.y / 100) * (Math.log(distance) / 1.7),
          rotationY: (-center.x / 100) * (Math.log(distance) / 1.7),
          duration: 0.05,
          ease: "power2.in",
        });
      }
      function rotateToImgBg(event, element) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;
        const center = {
          x: leftX - bounds.width / 2,
          y: topY - bounds.height / 2,
        };
        const distance = Math.sqrt(center.x ** 2 + center.y ** 2);
        gsap.to(element, {
          rotationX: -(center.y / 100) * (Math.log(distance) * 1.2),
          rotationY: -(-center.x / 100) * (Math.log(distance) * 1.2),
          duration: 0.05,
          ease: "power2.in",
        });
      }
      setup();
      function setup() {
        gsap.set([...$card], {
          transformOrigin: "center center",
          y: parseRem(80),
          autoAlpha: 0,
          onComplete: () => {
            //remove dive-hide
            $card.removeClass('div-hide')
          }
        });
        $card.each((idx, item) => {
          const tlCard = gsap.timeline({
            scrollTrigger: {
              trigger: $(item),
              start:
                $(window).width() > 768
                  ? "top bottom-=15%"
                  : "top bottom+=10%",
              once: true,
            },
            defaults: { ease: "power1.out" },
            onComplete: () => {
              cardInteraction(item);
            },
          });
          tlCard.to(item, {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            delay: (idx % ($(window).width() > 768 ? 3 : 2)) * 0.1,
          });
        });
        function cardInteraction(item) {
          if ($(window).width() > 991) {
            const img_bg = $(item).find('.img-bg-cus-v2');
            item.addEventListener("mouseenter", () => {
              bounds = item.getBoundingClientRect();
              item.addEventListener("mousemove", function (e) {
                rotateToMouse(e, item);
                rotateToImgBg(e, img_bg);
              });
            });

            item.addEventListener("mouseleave", () => {
              gsap.to(item, {
                rotationX: 0,
                rotationY: 0,
                backgroundImage: "",
                duration: 0.05,
                ease: "power3.out",
              });
              $(item).find('.img-bg-cus').length && gsap.to($(item).find('.img-bg-cus'), {
                rotationX: 0,
                rotationY: 0,
                duration: 0.05,
                ease: "power3.out",
              });
            });
            // })
          }
        }
      }
    }
    function homeBlog() {
      const homeBlogSwiper = new Swiper(".home-blog-main", {
        spaceBetween: parseRem(18),
        effect: "coverflow",
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        coverflowEffect: {
          rotate: 0,
          slideShadows: true,
        },
        slidesPerView: 1.1,
        breakpoints: {
          768: {
            spaceBetween: parseRem(16),
            slidesPerView: "auto",
          },
          991: {
            spaceBetween: parseRem(20),
            slidesPerView: 4,
          },
        },
        navigation: {
          prevEl: ".home-blog-nav-prev",
          nextEl: ".home-blog-nav-next",
        },
      });

      const blogTitle = new SplitType($(".home-blog-heading-txt"), {
        types: "lines, words",
        lineClass: "line",
      });
      const blogSubtitle = new SplitType($(".home-blog-heading-subtitle"), {
        types: "lines, words",
        lineClass: "line",
      });
      blogTitle.lines.length && gsap.set([...blogTitle.lines], { overflow: "hidden" });

      blogSubtitle.words && gsap.set([...blogSubtitle.words, ...blogTitle.words], {
        yPercent: 50,
        autoAlpha: 0,
      });
      if ($('.home-blog-wrap').length) {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".home-blog-wrap",
            start: "top bottom-=10%",
            once: true,
          },
          defaults: { ease: "power1.out" },
          onComplete: () => {
            SplitType.revert(
              ".home-blog-heading-subtitle, .home-blog-heading-txt"
            );
          },
        });

        blogSubtitle.words.length && tl.to(blogSubtitle.words, {
          yPercent: 0,
          duration: 0.5,
          autoAlpha: 1,
          stagger: 0.03,
        })
        blogTitle.words.length
          && tl.to(
            blogTitle.words,
            { yPercent: 0, duration: 0.6, autoAlpha: 1, stagger: 0.03 },
            "<=.1"
          )
        $('.home-blog-nav-control .btn-ic').length && tl.from(
          ".home-blog-nav-control .btn-ic",
          {
            yPercent: 10,
            duration: 1,
            autoAlpha: 0,
            stagger: 0.1,
            clearProps: "all",
          },
          "<=0"
        );
      };

      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".home-blog-main",
          start: "top bottom-=10%",
          end: "bottom bottom",
          once: true,
        },
        defaults: { ease: "power1.out" },
        onComplete: () => {
          SplitType.revert(
            ".home-blog-heading-subtitle, .home-blog-heading-txt"
          );
        },
      });
      tl2.from(".home-blog-item", {
        yPercent: 20,
        xPercent: 8,
        duration: 0.8,
        autoAlpha: 0,
        stagger: 0.1,
      });
      if ($(window).width() < 768) {
        tl2.from('.home-blog-nav-control-mob', { autoAlpha: 0, yPercent: 100, duration: .7 }, '<=.5')
      }
    }

    function homeCaseStudy() {
      let totalItem = $(".home-casestudy-gallery-wrap .swiper-slide").length;
      const initialSlide = totalItem
      for (let i = 0; i < 2; i++) {
        let mainChild = $(".home-casestudy-gallery-wrap").children().clone();
        $(".home-casestudy-gallery-wrap").append(mainChild);
        let child = $(".home-casestudy-gallery-thumbs-wrap").children().clone();
        $(".home-casestudy-gallery-thumbs-wrap").append(child);
      }

      let mainSwiper = new Swiper(".home-casestudy-gallery-slider-cms", {
        slidesPerView: 1,
        initialSlide: initialSlide,
        loop: true,
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
      });
      mainSwiper.detachEvents();
      let thumbSwiper = new Swiper(".home-casestudy-gallery-thumbs-cms", {
        initialSlide: initialSlide,
        loop: true,
        slidesPerView: 5,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        centeredSlides: true,
        loopAdditionalSlides: 5,
        breakpoints: {
          768: {
            slidesPerView: 7,
            loopAdditionalSlides: 7,
          },
        },
        navigation: {
          nextEl: ".home-casestudy-nav-next",
          prevEl: ".home-casestudy-nav-prev",
        },
        on: {
          realIndexChange: function (swiper) {
            mainSwiper.slideTo(swiper.realIndex);
          },
        },
      });
      const casestudyTitle = new SplitType($(".home-casestudy-title-content"), {
        types: "lines, words",
        lineClass: "line",
      });
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".home-casestudy-title-content",
          start: "top bottom-=25%",
          once: true,
        },
        defaults: { ease: "power1.out" },
        onComplete: () => {
          SplitType.revert(".home-casestudy-title-content");
        },
      });
      gsap.set([...casestudyTitle.lines], { overflow: "hidden" });

      tl.from(casestudyTitle.words, {
        yPercent: 100,
        autoAlpha: 0,
        duration: 0.4,
        stagger: 0.02,
      });
      const gallerySlide = $(".home-casestudy-gallery-slider-cms");
      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".home-casestudy-gallery-slider-cms",
          start: "top bottom-=10%",
          once: true,
        },
        defaults: { ease: "power1.out" },
      });
      tl2.from(gallerySlide, {
        yPercent: 20,
        autoAlpha: 0,
        duration: 0.8,
        clearProps: "all",
      });
      const galleryThumbsItem = $(".home-casestudy-gallery-thumbs-item");
      const casestudySwiperDeco = $(".home-casestudy-swiper-deco");
      gsap.set(casestudySwiperDeco, {
        scale: 0,
      });

      gsap.set([...galleryThumbsItem], {
        yPercent: 40,
        autoAlpha: 0,
      });
      let tlGalleryThumbs = gsap.timeline({
        scrollTrigger: {
          trigger: ".home-casestudy-gallery-thumbs-cms",
          start: "top bottom-=7% ",
          once: true,
        },
        defaults: { ease: "power1.out" },
        onComplete: () => { },
      });

      tlGalleryThumbs
        .to(galleryThumbsItem, {
          yPercent: 0,
          duration: 0.4,
          autoAlpha: 1,
          stagger: {
            from: $(window).width() > 768 ? 11 : 9,
            each: 0.06,
          },
        })
        .to(
          casestudySwiperDeco,
          { scale: 1, duration: 0.4, clearProps: "all" },
          "<=.2"
        )
        .from(
          ".home-casestudy-gallery-slider-control-prev",
          { autoAlpha: 0, duration: 0.4, clearProps: "all" },
          "<=-.4"
        )
        .from(
          ".home-casestudy-gallery-slider-control-next",
          { autoAlpha: 0, duration: 0.4, clearProps: "all" },
          "<=0"
        );
      if ($(window).width() < 768) {
        tlGalleryThumbs.from('.home-casestudy-slider-control-mob', { autoAlpha: 0, yPercent: 40, duration: .7 }, '<=.3')
      }
    }

    function homeCustomer() {
      let marquee_col = $(".customer-marquee-col");
      marquee_col.each(function (index, item) {
        const width = $(item).find(".customer-marquee-list").width();
        const length = Math.floor($(window).width() / width) + 1;
        const time = viewport.w > 767 ? $(item).find(".customer-marquee-list").width() / 100 : $(item).find(".customer-marquee-list").width() / 50;
        for (var i = 0; i < length; i++) {
          let $originalListLogo = $(item).find(".customer-marquee-list").eq(0);
          let $clonedListLogo = $originalListLogo.clone();
          $(item).find(".customer-marquee-inner").append($clonedListLogo);
        }
        $(item)
          .find(".customer-marquee-list")
          .css("animation-duration", `${time}s`);
        $(item).find(".customer-marquee-list").addClass("anim");
      });

      const headingLeft = new SplitType($(".home-customer-content-heading"), {
        types: "lines, words",
        lineClass: "line",
      });
      const headingRight = new SplitType(
        ".home-customer-content-subtitle-txt",
        {
          types: "lines",
          lineClass: "customer-line",
        }
      );
      gsap.set([...headingLeft.lines, ...headingRight.lines], {
        overflow: "hidden",
      });
      const headingRightLink = new SplitType(
        ".home-customer-content-subtitle-link",
        {
          types: "lines",
          lineClass: "customer-line",
        }
      );

      const marqueeCol = $(".customer-marquee-col");

      gsap.set(
        [
          ...headingLeft.words,
          // ...headingRightMask.lines,
          ...headingRightLink.lines,
          ...marqueeCol,
        ],
        {
          yPercent: 80,
          autoAlpha: 0,
        }
      );

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".home-customer-content-heading",
          start: "top bottom-=10%",
          once: true,
        },
        defaults: { ease: "power1.out" },
        onComplete: () => {
          SplitType.revert(
            ".home-customer-content-heading, .customer-line, .home-customer-content-subtitle-link"
          );
        },
      });

      headingLeft.words.length && tl.to(
        headingLeft.words,
        { yPercent: 0, duration: 0.5, autoAlpha: 1, stagger: 0.03 },
        "<=.3"
      )
      headingRightLink.lines.length && tl.to(
        headingRightLink.lines,
        { yPercent: 0, duration: 0.6, autoAlpha: 1, stagger: 0.05 },
        "<=.1"
      );

      let tlCustomerMarquee = gsap.timeline({
        scrollTrigger: {
          trigger: ".customer-marquee-col",
          start:
            $(window).width() > 768 ? "top bottom-=20%" : "top bottom-=30%",
          once: true,
        },
        defaults: { ease: "power1.out" },
        onComplete: () => { },
      });

      marqueeCol.length && tlCustomerMarquee.to(marqueeCol, {
        yPercent: 0,
        duration: 0.7,
        autoAlpha: 1,
        stagger: 0.2,
        clearProps: "all",
      });
    }
    function homeTestiNew() {
      const width = $(".home-testi-marquee-list").width();
      const length = Math.floor($(window).width() / width) + 1;

      for (var i = 0; i < length; i++) {
        let $originalListBrand = $(".home-testi-marquee-list").eq(0);
        let $clonedListBrand = $originalListBrand.clone();
        $(".home-testi-marquee-inner").append($clonedListBrand);
      }
      if ($(window).width() > 767) {
        const titleHeadService = new SplitType($(".home-testi-service-heading"), { types: "lines, words", lineClass: "line", });

        let tl3 = gsap.timeline({
          scrollTrigger: {
            trigger: ".home-testi-wrap",
            start: "bottom bottom+=10%%",
            once: true,
          },
          defaults: { ease: "power1.out" },
          onComplete: () => {
            SplitType.revert(".home-testi-service-heading");
          },
        });
        let itemService = $(".home-testi-service-item");
        titleHeadService.lines.length && gsap.set(titleHeadService.lines, { overflow: "hidden" });

        titleHeadService.words && tl3.from(titleHeadService.words, {
          yPercent: 100,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.02,
        });
        itemService.each((idx, item) => {
          const itemIcon = $(item).find(".home-testi-service-item-icon");
          const itemTitle = $(item).find(".home-testi-service-item-title");
          const itemDesc = $(item).find(".home-testi-service-item-subtitle");
          const line = $(".testi-service-line").eq(idx);
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: $(item),
              start:
                "bottom bottom-=20%",
              once: true,
            },
            delay: idx * 0.15,
          });
          itemIcon.length && tl
            .from(
              itemIcon,
              { yPercent: 40, autoAlpha: 0, duration: 0.5, clearProps: "all" },
              `<=0`
            )
          itemTitle.length && tl.from(
            itemTitle,
            { yPercent: 70, autoAlpha: 0, duration: 0.5, clearProps: "all" },
            "<=0"
          )
          itemDesc.length && tl.from(
            itemDesc,
            { yPercent: 50, autoAlpha: 0, duration: 0.5, clearProps: "all" },
            "<=0.05"
          );
          if (line.length > 0) {
            tl.from(line, { autoAlpha: 0, duration: 0.3, clearProps: "all" });
          }
        });
      } else {
        let tl3 = gsap.timeline({
          scrollTrigger: {
            trigger: ".home-testi-service-heading",
            start: "bottom bottom-=10%",
            once: true,
          },
          defaults: { ease: "power1.out" },
          onComplete: () => {
          },
        });
        let itemService = $(".home-testi-service-item");
        tl3.from('.home-testi-service-heading', { opacity: 0, yPercent: 40, duration: 1 })
        itemService.each((idx, item) => {
          let tlItem = gsap.timeline({
            scrollTrigger: {
              trigger: $(item),
              start: "center bottom-=10%",
              once: true,
            },
            defaults: { ease: "power1.out" },
          });

          tlItem
            .from(item, {
              yPercent: 40,
              autoAlpha: 0,
              duration: 1,
              clearProps: "all",
            })
        });
      }

      let tl4 = gsap.timeline({
        scrollTrigger: {
          trigger: ".home-blog",
          start: "top-=10% bottom",
          once: true,
        },
        defaults: { ease: "power1.out" },
        onComplete: () => {
          $(".home-testi-marquee-list").addClass("anim");
        },
      });
      const itemLogo = $(".home-testi-marquee-item");
      itemLogo.length && tl4.from(itemLogo, {
        yPercent: 60,
        xPercent: 10,
        autoAlpha: 0,
        stagger: 0.03,
        duration: 0.6,
        clearProps: "all",
      });
    }

    function homePaperMob() {
      $(".home-paper-cms").addClass("swiper");
      $(".home-paper-control-number-txt-toggle").text(
        $(".home-paper-item-wrap").length
      );
      $(".home-paper-list").addClass("swiper-wrapper");
      $(".home-paper-item-wrap").addClass("swiper-slide");
      var swiperPaper = new Swiper(".home-paper-cms", {
        slidesPerView: "auto",
        spaceBetween: parseRem(16),
        on: {
          slideChange: function () {
            $(".home-paper-control-number-txt-active").text(
              swiperPaper.realIndex + 1
            );
          },
        },
      });
      $(".home-paper-nav-prev").on("click", function () {
        swiperPaper.slidePrev();
      });
      $(".home-paper-nav-next").on("click", function () {
        swiperPaper.slideNext();
      });
    }
    function fadeCardRLHFSection() {
      const rlhfTitle = new SplitType($(".home-rlhf-heading-title"), {
        types: "lines, words",
        lineClass: "line",
      });
      rlhfTitle.lines.length && gsap.set([...rlhfTitle.lines], { overflow: "hidden" });
      $('.home-rlhf-cards-item').length && gsap.set('.home-rlhf-cards-item', { opacity: 0, yPercent: 100 })
      $('.home-rlhf-heading-decs').length && gsap.set('.home-rlhf-heading-decs', { opacity: 0, yPercent: 50 })
      $('.home-rlhf-heading-title-ic').length && gsap.set('.home-rlhf-heading-title-ic', {
        opacity: 0
      });
      if ($('.home-rlhf-inner').length) {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".home-rlhf-inner",
            start: "top bottom-=20%",
            once: true,
          },
          defaults: { ease: "power1.out" },
        });

        rlhfTitle.words.length && tl.from(rlhfTitle.words, {
          yPercent: 100,
          autoAlpha: 0,
          duration: 0.4,
          stagger: 0.02,
          onComplete: () => {
            gsap.to('.home-rlhf-heading-title-ic', {
              opacity: 1,
              duration: 0.6,
              ease: 'power1.out'
            })
            rlhfTitle.lines.forEach(line => {
              line.style.overflow = 'visible'
            })
          }
        }, 0);
        $('.home-rlhf-heading-decs').length && tl.to('.home-rlhf-heading-decs', {
          yPercent: 0,
          opacity: 1,
          duration: 0.8
        }, 0.1).to('.home-rlhf-cards-item', {
          opacity: 1,
          yPercent: 0,
          stagger: 0.1,
          duration: 0.8,
        }, 0.2)
      }
    }

    homeHero();
    homeAbout();
    homePaper();
    homeCaseStudy();
    homeCustomer();
    homeTestiNew();
    homeBlog();
    globalMarquee();
    footerForm();
    fadeCardRLHFSection()
  };
  SCRIPT.customersScript = () => {
    function customerPaper() {
      const $card = $(".customer-case-study");
      function rotateToMouse(event, element) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;
        const center = {
          x: leftX - bounds.width / 2,
          y: topY - bounds.height / 2,
        };

        const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

        gsap.to(element, {
          rotationX: (center.y / 100) * (Math.log(distance) / 1.7),
          rotationY: (-center.x / 100) * (Math.log(distance) / 1.7),
          duration: 0.05,
          ease: "power2.in",
        });
      }
      function rotateToImgBg(event, element) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;
        const center = {
          x: leftX - bounds.width / 2,
          y: topY - bounds.height / 2,
        };

        const distance = Math.sqrt(center.x ** 2 + center.y ** 2);
        gsap.to(element, {
          rotationX: -(center.y / 100) * (Math.log(distance) * 1.6),
          rotationY: -(-center.x / 100) * (Math.log(distance) * 1.6),
          duration: 0.05,
          ease: "power2.in",
        });
      }
      setup();
      function setup() {
        gsap.set([...$card], {
          transformOrigin: "center center",
          y: parseRem(80),
          autoAlpha: 0,
        });
        if ($(window).width() < 768) {
          gsap.set('.home-paper-control', { autoAlpha: 0, yPercent: 100 })
        }
        $card.each((idx, item) => {
          const tlCard = gsap.timeline({
            scrollTrigger: {
              trigger: $(item),
              start:
                $(window).width() > 768
                  ? "top bottom-=15%"
                  : "top bottom-=30%",
              once: true,
            },
            defaults: { ease: "power1.out" },
            onComplete: () => {
              cardInteraction(item);
            },
          });
          tlCard.to(item, {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            delay: (idx % ($(window).width() > 768 ? 3 : 2)) * 0.1,
          });
          if ($(window).width() < 768 && idx === $card.length - 1) {
            tlCard.to('.home-paper-control', { autoAlpha: 1, yPercent: 0, duration: .7 }, '<=.3')
          }
        });

        function cardInteraction(item) {
          if ($(window).width() > 991) {
            const img_bg = $(item).find('.image-cover');
            console.log('img_bg', img_bg)
            // const img_bg = $(item).find('.img-bg-cus');
            // $card.each((idx, item) => {
            item.addEventListener("mouseenter", () => {
              bounds = item.getBoundingClientRect();
              item.addEventListener("mousemove", function (e) {
                rotateToMouse(e, item);
                rotateToImgBg(e, img_bg);
              });
            });

            item.addEventListener("mouseleave", () => {
              gsap.to(item, {
                rotationX: 0,
                rotationY: 0,
                backgroundImage: "",
                duration: 0.05,
                ease: "power3.out",
              });
              gsap.to($(item).find('.image-cover'), {
                rotationX: 0,
                rotationY: 0,
                duration: 0.05,
                ease: "power3.out",
              });
            });
            // })
          }
        }
      }
    }

    customerPaper()
  }
  SCRIPT.usecaseScript = () => {
    ScrollTrigger.create({
      trigger: '.uc-mode-list-inner',
      start: "top center",
      bottom: 'bottom center',
      onUpdate: ({ progress }) => {
        const id = Math.round(progress * $('.uc-mode-list-item').length);
        handleActiveSideBar(id)
      }
    })
    $('.uc-mode-sidebar-inner').css('top', ($(window).height() - $('.uc-mode-sidebar-inner').height()) / 2)
    const handleActiveSideBar = (id) => {
      if ($('.uc-mode-sidebar-item').length) {
        $('.uc-mode-sidebar-item').each((index, item) => {
          if (id === index) {
            $(item).addClass('active')
          } else {
            if ($(item).hasClass('active')) {
              $(item).removeClass('active')
            }
          }
        })
      }
    }

  }
  SCRIPT.carrerScript = () => {


    function carrerHero() {
      let title = new SplitType($('.carrer-hero-title'), { types: 'lines words', lineClass: 'bp-line-ov bp-heading-line' });
      // let sub = new SplitType($('.carrer-hero-sub'),{types: 'lines words', lineClass: 'bp-line-ov'} )
      let label = new SplitType($('.carrer-hero-partner-label'), { types: 'lines words', lineClass: 'bp-line-ov' })
      let tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger: '.carrer-hero',
          start: viewport.w > 767 ? 'top top+=65%' : 'top top+=35%',
          once: true,
        },
        onComplete: () => {
          // title.revert();
          label.revert();
        }
      })
      if (viewport.w > 767) {
        let tlBtn = new gsap.timeline({
          scrollTrigger: {
            trigger: '.carrer-hero-btn',
            start: 'top top',
            end: 'bottom-=20% top',
            scrub: true,
            onEnterBack: () => {
              $('.carrer-btn-role-fix').removeClass('active')
            }
          },
          onComplete: () => {
            $('.carrer-btn-role-fix').addClass('active')
          },
        })
        tlBtn.from('.carrer-hero-btn', { autoAlpha: 1 })
      }
      gsap.set(title.words, { autoAlpha: 0, yPercent: 60 })
      // gsap.set(sub.words, {autoAlpha: 0, yPercent: 80})
      gsap.set(label.words, { autoAlpha: 0, yPercent: 80 })
      gsap.set('.carrer-hero-btn', { autoAlpha: 0, y: 20 })
      tlFade
        .to(title.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 })
        // .to(sub.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.3')
        .to('.carrer-hero-btn', { autoAlpha: 1, y: 0, duration: .6 }, '<=.3')
        .to(label.words, { autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4 }, '<=.4')
        .from('.carrer-hero-partner-item', { autoAlpha: 0, yPercent: 50, duration: .5, stagger: .17, }, '<=.2')
        .from('.carrer-hero-img', { autoAlpha: 0, y: 50, duration: .6 }, '<=.5')

    }
    function carrerMission() {
      let itemImg = $('.carrer-hero-img');
      let tlImg = new gsap.timeline({
        scrollTrigger: {
          trigger: '.carrer-hero-img',
          start: 'top top+=35%',
          endTrigger: '.carrer-reason',
          end: 'bottom top+=35%',
          scrub: true,
        }
      })
      let title = new SplitType($('.carrer-mission-title'), { types: 'lines words', lineClass: 'bp-line-ov bp-heading-line' });
      gsap.set(title.words, { autoAlpha: 0, yPercent: 60 })
      let tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger: '.carrer-mission-title-wrap',
          start: viewport.w > 767 ? 'top top+=90%' : 'top top+=75%',
          once: true,
        },
        onComplete: () => {
          // title.revert();
        }
      })
      tlFade
        .to(title.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .7 })
      // .to(sub.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .6}, '<=.3')
    }
    function carrerReason() {
      let title = new SplitType($('.carrer-reason-title'), { types: 'lines words', lineClass: 'bp-line-ov bp-heading-line' });
      let sub = new SplitType($('.carrer-reason-sub'), { types: 'lines words', lineClass: 'bp-line-ov' });
      let tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger: '.carrer-reason-title-wrap',
          start: 'top top+=65%',
          once: true
        },
        onComplete: () => {
          title.revert();
          sub.revert();
        }
      })
      gsap.set(title.words, { autoAlpha: 0, yPercent: 60 })
      gsap.set(sub.words, { autoAlpha: 0, yPercent: 80 })
      tlFade
        .to(title.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 })
        .to(sub.words, { autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4 }, '<=.2')
      if (viewport.w > 767) {
        let allItems = $('.carrer-reason-item');
        allItems.each((idx, item) => {
          let titleItem = new SplitType($(item).find('.carrer-reason-item-title'), { types: 'lines words', lineClass: 'bp-line-ov' })
          let subItem = new SplitType($(item).find('.carrer-reason-item-sub'), { types: 'lines words', lineClass: 'bp-line-ov' })
          let tlFadeItem = new gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top top+=65%',
              once: true
            },
            onComplete: () => {
              titleItem.revert();
              subItem.revert();
            }

          })
          gsap.set(titleItem.words, { autoAlpha: 0, yPercent: 60 })
          gsap.set(subItem.lines, { autoAlpha: 0, yPercent: 80 })
          tlFadeItem
            .from($(item).find('.carrer-reason-item-ic'), { autoAlpha: 0, yPercent: 60, duration: .6, clearProps: 'all' })
            .to(titleItem.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 }, '<=.2')
            .to(subItem.lines, { autoAlpha: 1, yPercent: 0, stagger: .07, duration: .35 }, '<=.2')
          let tlItem = new gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top-=30% bottom-=35%',
              end: 'bottom-=30% bottom-=35%',
              scrub: true,
            }
          })

          if (idx % 2 == 0) {
            tlItem
              .from(item, { transformOrigin: 'top left', rotate: '15deg', x: -100, autoAlpha: 0, ease: 'power1.out', })
          }
          else {
            tlItem
              .from(item, { transformOrigin: 'top right', rotate: '-15deg', x: 100, autoAlpha: 0, ease: 'power1.out', })
          }
        })
      }
      else {
        $('.carrer-reason-list').addClass('swiper');
        $('.carrer-reason-list-inner').addClass('swiper-wrapper');
        $('.carrer-reason-item').addClass('swiper-slide');
        $('.carrer-reason-control-total').text($('.carrer-reason-item').length)
        let swiperReason = new Swiper(".carrer-reason-list ", {
          slidesPerView: 1,
          spaceBetween: parseRem(16),
          on: {
            init: function () {
              checkButtonState(this);
            },
            slideChange: function () {
              $('.carrer-reason-control-current').text((this.activeIndex + 1));
              checkButtonState(this);
            },
          },
        });
        $('.carrer-reason-item').each((idx, item) => {
          if (idx <= 1) {
            let titleItem = new SplitType($(item).find('.carrer-reason-item-title'), { types: 'lines words', lineClass: 'bp-line-ov' })
            let subItem = new SplitType($(item).find('.carrer-reason-item-sub'), { types: 'lines words', lineClass: 'bp-line-ov' })
            let tlFadeItem = new gsap.timeline({
              scrollTrigger: {
                trigger: item,
                start: viewport.w > 767 ? 'top top+=65%' : 'top top+=55%',
                once: true
              },
              onComplete: () => {
                titleItem.revert();
                subItem.revert();
              }

            })
            gsap.set(titleItem.words, { autoAlpha: 0, yPercent: 60 })
            gsap.set(subItem.words, { autoAlpha: 0, yPercent: 80 })
            tlFadeItem
              .from($(item).find('.carrer-reason-item-ic'), { autoAlpha: 0, yPercent: 60, duration: .6, clearProps: 'all' })
              .to(titleItem.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 }, '<=.2')
              .to(subItem.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .4 }, '<=.2')
          }
        })
        $('.carrer-reason-control-prev').on('click', function () {
          swiperReason.slidePrev();
        })
        $('.carrer-reason-control-next').on('click', function () {
          swiperReason.slideNext();
        })
        function checkButtonState(swiper) {
          if (swiper.activeIndex === 0) {
            $('.carrer-reason-control-prev').addClass('disable');
          } else {
            $('.carrer-reason-control-prev').removeClass('disable');
          }
          if (swiper.activeIndex === swiper.slides.length - 1) {
            $('.carrer-reason-control-next').addClass('disable');
          } else {
            $('.carrer-reason-control-next').removeClass('disable');
          }
        }
      }
    }
    function carrerJob() {
      let title = new SplitType($('.carrer-job-title'), { types: 'lines words', lineClass: 'bp-line-ov bp-heading-line-h3' });
      let sub = new SplitType($('.carrer-job-sub'), { types: 'lines words', lineClass: 'bp-line-ov ' });
      let tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger: '.carrer-job-head',
          start: viewport.w > 767 ? 'top top+=65%' : 'top top+=45%',
          once: true,
        },
        onComplete: () => {
          sub.revert();
        }
      })
      gsap.set(title.words, { autoAlpha: 0, yPercent: 60 })
      gsap.set(sub.words, { autoAlpha: 0, yPercent: 80 })
      tlFade
        .to(title.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 })
        .to(sub.words, { autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4 }, '<=.2')
        .from('.carrer-job-label-inner', { autoAlpha: 0, yPercent: 80, stagger: .1, duration: .4 }, '<=.2')
      let duplicate = Math.floor(viewport.w / ($('.carrer-bg-label-title').width())) + 1;
      console.log(duplicate)
      for (let i = 0; i < duplicate; i++) {
        let $originalListBrand = $(".carrer-bg-label-title").eq(0);
        let $clonedListBrand = $originalListBrand.clone();
        console.log($(".carrer-bg-label-title-wrap"))
        $(".carrer-bg-label-title-wrap").append($clonedListBrand);
      }
      $('.carrer-bg-label-title').addClass('anim');
      if (viewport.w < 768) {
        let tlFadeItem = new gsap.timeline({
          scrollTrigger: {
            trigger: $('.carrer-job-sub').eq(0),
            start: 'top top+=45%',
            once: true,
          },
          onComplete: () => {
          }
        })
        tlFadeItem
          .from('.carrer-job-cms-wrap', { autoAlpha: 0, y: 50, stagger: .1, duration: .6 })
        $('.carrer-job-cms-title-wrap').on('click', function () {
          $(this).toggleClass('active');
          $('.carrer-job-cms-title-arrow').removeClass('active')
          $(this).find('.carrer-job-cms-title-arrow').toggleClass('active')
          $('.carrer-job-cms').slideUp();
          if ($(this).hasClass('active')) {
            $(this).next('.carrer-job-cms').slideDown();
          }
          else {
            $(this).find('.carrer-job-cms-title-arrow').removeClass('active')

          }
        })
      }
      else {
        let allCms = $('.carrer-job-cms-wrap');
        let tlFadeItem = new gsap.timeline({
          scrollTrigger: {
            trigger: $('.carrer-job-cms-wrap').eq(0),
            start: 'top top+=65%',
            once: true,
          },
          onComplete: () => {
            // titleItem.revert();
          }
        })
        allCms.each((idx, item) => {
          let titleItem = new SplitType($(item).find('.carrer-job-cms-title'), { types: 'lines words', lineClass: 'bp-line-ov ' });
          gsap.set(titleItem.words, { autoAlpha: 0, yPercent: 60 })
          tlFadeItem
            .to(titleItem.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 }, `>= ${idx * .1}`)
            .from($(item).find('.carrer-job-cms-line-top'), { scaleX: 0, transformOrigin: 'left', duration: 1.3 }, '<=-.2')
            .from($(item).find('.carrer-job-item-wrap'), { autoAlpha: 0, y: 80, stagger: .1, duration: .6 }, '<=0')
        })
      }
      $('.carrer-job-item-opening-txt , .carrer-job-item-openings-number-txt').each(function () {
        let textValue = $(this).text().trim(); // Lấy nội dung và loại bỏ khoảng trắng
        if (!isNaN(textValue) && parseInt(textValue) < 10) { // Kiểm tra nếu là số và nhỏ hơn 10
          $(this).text('0' + textValue); // Thêm số 0 ở trước
        }
      });

    }
    function carrerTesti() {
      if (viewport.w > 767) {
        let tlProcess = new gsap.timeline({
          scrollTrigger: {
            trigger: '.carrer-testi-content-list',
            start: 'top center',
            bottom: 'bottom center',
            scrub: true,
          }
        })
        const circle = $('svg .carrer-testi-card-process');
        const r = parseInt(circle.attr('cx'));
        const circumference = 2 * Math.PI * r;
        circle.css('stroke-dasharray', circumference);
        tlProcess
          .fromTo(circle, { strokeDashoffset: circumference }, { strokeDashoffset: 0, })
        activeItem('.carrer-testi-card-item', 0)
        let heightItemLast = $('.carrer-testi-content-item:last-child').outerHeight();
        console.log(heightItemLast)
        let spacePadding = $(window).innerHeight() - parseInt($('.carrer-testi-card').css('top')) - heightItemLast;
        console.log(spacePadding)
        $('.carrer-testi-content').css('margin-bottom', `${spacePadding}px`)
        $('.carrer-testi-content-item').each((idx, item) => {
          let titleItem = new SplitType($(item).find('.carrer-testi-content-item-title'), { types: 'lines words', lineClass: 'bp-line-ov ' });
          let subItem = new SplitType($(item).find('.carrer-testi-content-item-sub'), { types: 'lines words', lineClass: 'bp-line-ov ' });
          gsap.set(titleItem.words, { autoAlpha: 0, yPercent: 60 })
          gsap.set(subItem.words, { autoAlpha: 0, yPercent: 80 })

          let tlItemFade = new gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top top+=75%',
              once: true
            },
            onComplete: () => {
              titleItem.revert();
              subItem.revert();
            }
          })
          tlItemFade
            .to(titleItem.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 })
            .to(subItem.words, { autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4 }, '<=.2')
          let tlItemActive = new gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top bottom-=20%',
              end: 'bottom bottom-=20%',
              scrub: true,
            },
            onUpdate: function () {
              let progress = tlItemActive.progress() * 100;
              if (direction >= 1) {
                if (progress >= 95) {
                  activeItem('.carrer-testi-card-item', idx);
                }
              } else { // cuộn ngược
                if (idx == 2) {
                  console.log(progress)
                }
                if (progress <= 40) {
                  if (idx > 0) {
                    activeItem('.carrer-testi-card-item', idx - 1);
                  }
                }
              }
            }
          })
          tlItemActive
            .fromTo(item, { 'filter': 'blur(3px)', '-webkit-filter': 'blur(3px)', x: 108, y: 40 }, { 'filter': 'blur(0px)', '-webkit-filter': 'blur(0px)', x: 0, y: 0 })
        })
      }
      else {
        $('.carrer-testi-content-cms').addClass('swiper');
        $('.carrer-testi-content-list').addClass('swiper-wrapper');
        $('.carrer-testi-content-item').addClass('swiper-slide');
        $('.carrer-testi-control-total').text($('.carrer-testi-content-item').length)
        let swiperTesti = new Swiper(".carrer-testi-content-cms ", {
          slidesPerView: 1,
          spaceBetween: parseRem(16),
          on: {
            init: function () {
              checkButtonState(this);
            },
            slideChange: function () {
              $('.carrer-testi-control-current').text((this.activeIndex + 1));
              checkButtonState(this);
            },
          },
        });
        $('.carrer-testi-content-item').each((idx, item) => {
          if (idx <= 1) {
            let titleItem = new SplitType($(item).find('.carrer-testi-content-item-title'), { types: 'lines words', lineClass: 'bp-line-ov' })
            let subItem = new SplitType($(item).find('.carrer-testi-content-item-sub'), { types: 'lines words', lineClass: 'bp-line-ov' })
            let tlFadeItem = new gsap.timeline({
              scrollTrigger: {
                trigger: item,
                start: 'top top+=45%',
                once: true
              },
              onComplete: () => {
                titleItem.revert();
                subItem.revert();
              }

            })
            gsap.set(titleItem.words, { autoAlpha: 0, yPercent: 60 })
            gsap.set(subItem.words, { autoAlpha: 0, yPercent: 80 })
            gsap.set('.carrer-testi-content-card-name', { autoAlpha: 0, yPercent: 80 })
            gsap.set('.carrer-testi-content-card-position', { autoAlpha: 0, yPercent: 80 })
            tlFadeItem
              .from($(item).find('.carrer-testi-content-card-img'), { autoAlpha: 0, y: 60, duration: .6, clearProps: 'all' })
              .to('.carrer-testi-content-card-name', { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 }, '<=0')
              .to('.carrer-testi-content-card-position', { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 }, '<=.2')
              .to(titleItem.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 }, '<=.2')
              .to(subItem.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .4 }, '<=.2')
          }
        })
        $('.carrer-testi-control-prev').on('click', function () {
          swiperTesti.slidePrev();
        })
        $('.carrer-testi-control-next').on('click', function () {
          swiperTesti.slideNext();
        })
        function checkButtonState(swiper) {
          if (swiper.activeIndex === 0) {
            $('.carrer-testi-control-prev').addClass('disable');
          } else {
            $('.carrer-testi-control-prev').removeClass('disable');
          }
          if (swiper.activeIndex === swiper.slides.length - 1) {
            $('.carrer-testi-control-next').addClass('disable');
          } else {
            $('.carrer-testi-control-next').removeClass('disable');
          }
        }
      }

    }
    function activeItem(className, index) {
      $(className).removeClass('active');
      $(className).eq(index).addClass('active')
    }
    carrerJob();
    carrerHero();
    carrerReason();
    carrerMission()
    carrerTesti();
    footerForm();
    console.log($("[data-bg='light']"))
    let bottomBtnFix = parseInt($('.carrer-btn-role-fix').css('bottom'));
    let heightTopBgLight = $("[data-bg='light-top'] .carrer-img-bg").height();
    let heightBottomBgLight = $("[data-bg='light-bottom'] .carrer-img-bg").height();
    console.log(heightBottomBgLight)
    console.log(heightTopBgLight)
    $("[data-bg='light']").each((idx, item) => {

      let tlBtn = new gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: `top bottom -= ${bottomBtnFix}px`,
          end: `bottom bottom -= ${bottomBtnFix}px`,
          scrub: true,
          onEnter: () => {
            $('.carrer-btn-role-fix').addClass('on-light');
          },
          onEnterBack: () => {
            $('.carrer-btn-role-fix').addClass('on-light');
          },
          onLeaveBack: () => {
            $('.carrer-btn-role-fix').removeClass('on-light');
          },
          onLeave: () => {
            $('.carrer-btn-role-fix').removeClass('on-light');
          }
        }
      })
      tlBtn.from('.btn-fix', { autoAlpha: 1 })
    })
    $("[data-bg='light-top']").each((idx, item) => {

      let tlBtn = new gsap.timeline({
        scrollTrigger: {
          trigger: $(item).find('.carrer-img-bg'),
          start: `top bottom -= ${bottomBtnFix}px`,
          end: `top += 50 % bottom-=${bottomBtnFix}px`,
          scrub: true,
          onEnter: () => {
            $('.carrer-btn-role-fix').addClass('on-light');
          },
          onEnterBack: () => {
            $('.carrer-btn-role-fix').addClass('on-light');
          },
          onLeaveBack: () => {
            $('.carrer-btn-role-fix').removeClass('on-light');
          },
          onLeave: () => {
            $('.carrer-btn-role-fix').removeClass('on-light');
          }
        }
      })
      tlBtn.from('.btn-fix', { autoAlpha: 1 })
    })
    $("[data-bg='light-bottom']").each((idx, item) => {

      let tlBtn = new gsap.timeline({
        scrollTrigger: {
          trigger: $(item).find('.carrer-img-bg'),
          start: `top bottom -= ${bottomBtnFix}px`,
          end: `top += 50 % bottom-=${bottomBtnFix}px`,
          scrub: true,
          onEnter: () => {
            $('.carrer-btn-role-fix').addClass('on-light');
          },
          onEnterBack: () => {
            $('.carrer-btn-role-fix').addClass('on-light');
          },
          onLeaveBack: () => {
            $('.carrer-btn-role-fix').removeClass('on-light');
          },
          onLeave: () => {
            $('.carrer-btn-role-fix').removeClass('on-light');
          }
        }
      })
      tlBtn.from('.btn-fix', { autoAlpha: 1 })
    })
  }
  $('.footer-bottom-menu-go-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1000);
    return false;
  });

  globalScript();
  headerScript();
  const pageName = $(".main").attr("name-space");
  if (pageName) {
    SCRIPT[`${pageName}Script`]();
  }
};

window.onload = mainScript;
