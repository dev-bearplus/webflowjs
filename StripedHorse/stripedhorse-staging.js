const mainScript = () => {
  const isEmail = (value) => /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
  const isPhone = (value) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(value);
  //const isDomain = (value) => /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/.test(value);
  gsap.registerPlugin(ScrollTrigger);

  //init scollmain
  console.log("dev")
  let scrollmain = new LocomotiveScroll({
    el: document.querySelector(".scrollmain"),
    smooth: true,
    getDirection: true,
    tablet: {
      smooth: false,
    },
    mobile: {
      smooth: false,
    }
  });

  scrollmain.on('scroll', ScrollTrigger.update);
  ScrollTrigger.scrollerProxy(".scrollmain", {
    scrollTop(value) {
      return arguments.length ? scrollmain.scrollTo(value, 0, 0) : scrollmain.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector(".scrollmain").style.transform ? "transform" : "fixed"
  });

  //Assign var
  let scrollAllow = true;
  let scrollAllowHover = true;
  // let scrolled = false;
  let scrolledInner = false;
  let scrolledPrj = false;
  let scrolledTesi = false;
  let curSc = 0,
    lastSc = 0;
  let direction;
  let header = $(".header");

  $(window).on("refresh", () => {
    scrollAllow = true;
    scrollAllowHover = true;
    // scrolled = false;
    scrolledInner = false;
    scrolledPrj = false;
    scrolledTesi = false;
    curSc = 0;
    lastSc = 0;
  });

  //on scroll
  scrollmain.on("scroll", (inst) => {
    if ($(".homepage").length != 1) {
      if (inst.scroll.y > header.outerHeight()) {
        $(".nav-trigger").addClass("show");
        $(".header-links").removeClass("show");
      } else {
        $(".nav-trigger").removeClass("show");
        $(".header-links").addClass("show");
      }
    };
  });
  const initLoader = () => {
    let loaderTl = gsap.timeline({
      onComplete: () => {
        $('.loader-wrap').remove()
      }
    })

    loaderTl.set('.loader-logo-dur-outer', {
      background: 'conic-gradient(rgba(256, 256, 256, 100) 0%, rgba(256,256,256, 0.1) 0%)',
    })
    .to('.loader-logo-dur-outer', {
      background: 'conic-gradient(rgba(256, 256, 256, 100) 100%, rgba(256,256,256, 0.1) 100%)',
      duration: 1.2,
    })
    .to(".loader-inner", { yPercent: -100, duration: 1,  ease: 'power2.out'  })
    .to(".loader-mask",{ yPercent: 50, autoAlpha: 0, duration: 1, ease: 'power2.out' }, '<=0')
  }
  const transitionLeavePage = (data) => {
    const currentContainer = data.current.container;
    console.log("leavingTransition");
    const tl = gsap.timeline();
    tl.set(".page-trans-wrap", { autoAlpha: 1 })
      .set('.logo-dur-outer', {
        background: 'conic-gradient(rgba(256, 256, 256, 100) 0%, rgba(256,256,256, 0.1) 0%)',
      })
      .set(".page-trans-main", { autoAlpha: 1 }, 0)
      .set(".page-trans-mask", { autoAlpha: 0 }, 0)
      .to(currentContainer, { y: -200, duration: 0.8 }, 0)
      .fromTo(
        ".page-trans-main",
        { yPercent: 100, duration: 0.6, delay: 0.2, ease: 'power2.in' },
        { yPercent: 0 },
        0
      )
      .to(
        ".page-trans-mask",
        { autoAlpha: 1, duration: 0.6, delay: 0.2 },
        0
      )
      .to('.logo-dur-outer', {
        background: 'conic-gradient(rgba(256, 256, 256, 100) 100%, rgba(256,256,256, 0.1) 100%)',
        duration: .6,
      });
    return tl;
  };

  const transitionEnterPage = (data) => {
    const nextContainer = data.next.container;
    console.log("enteringTransition");
    if ($(window).width() > 991) {
      scrollmain.scrollTo(0, 0);
    }
    const tl = gsap.timeline({
      delay: 1,
    });
    tl.to(".page-trans-main", { yPercent: -100, duration: 0.6 }, 0)
      .to(
        ".page-trans-mask",
        { autoAlpha: 0, duration: 0.6, ease: 'power2.out', delay: -0.2 },
        0
      )
      .from(nextContainer, { y: '200', duration: 0.8, delay: -0.2 }, 0)
      .set(".page-trans-wrap", { autoAlpha: 0 })
      .set(".page-trans-main", { autoAlpha: 0, yPercent: 100 })
      .set(".page-trans-mask", { autoAlpha: 0, });
    return tl;
  };
  function counterAnim() {
    if ($(window).width() > 991) {
      if ($('.aboutpage').length) {
        let tlAbout = gsap.timeline({
          scrollTrigger: {
            id: 'tlAbout',
            trigger: '.abt-statis-content',
            start: 'top +=80%',
            scroller: '.scrollmain',
          },
          onComplete: (e) => {
            tlAbout.kill();
          }
        });

        tlAbout
          .from($('.statis-item-title span').eq(0), {
            textContent: 0,
            duration: 2,
            ease: "power1.in",
            snap: { textContent: 1 },
          })
          .from($('.statis-item-title span').eq(1), {
            textContent: 0,
            delay: 0.4,
            duration: 1.6,
            ease: "power1.in",
            snap: { textContent: 1 },
          }, '0')
          .from($('.statis-item-title span').eq(2), {
            textContent: 0,
            delay: 0.8,
            duration: 1.6,
            ease: "power1.in",
            snap: { textContent: 1 },
          }, '0');
        return tlAbout;
      } else if ($('.reviewpage').length) {
        let tlReview = gsap.timeline({
          scrollTrigger: {
            id: 'tlReview',
            trigger: '.rev-statis-content',
            start: 'top +=80%',
            scroller: '.scrollmain',
          },
          onComplete: (e) => {
            tlReview.kill();
          }
        });
        tlReview
          .from($('.statis-item-title .hl-count').eq(0), {
            textContent: 0,
            duration: 1.6,
            ease: "power1.in",
            snap: { textContent: 10 },
            onUpdate: function () {
              this.targets()[0].innerHTML = numberWithCommas(Math.ceil(this.targets()[0].textContent));
            },
          })
          .from($('.statis-item-title .hl-count').eq(1), {
            textContent: 0,
            delay: 0.4,
            duration: 2,
            ease: "power1.in",
            snap: { textContent: 10 },
            onUpdate: function () {
              this.targets()[0].innerHTML = numberWithCommas(Math.ceil(this.targets()[0].textContent));
            },
          }, '0')
          .from($('.statis-item-title .hl-count').eq(2), {
            textContent: 0,
            delay: 0.8,
            duration: 1.6,
            ease: "power1.in",
            snap: { textContent: 10 },
            onUpdate: function () {
              this.targets()[0].innerHTML = numberWithCommas(Math.ceil(this.targets()[0].textContent));
            },
          }, '0');
        function numberWithCommas(x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };
        return tlReview;
      }
    }
  }

  barba.hooks.before(() => {
    $('.cursor-wrap').removeClass('active');
    if ($(window).width() <= 991) {
      $('.nav-trigger-mobile').removeClass('active');
      $('.nav-main-mobile').removeClass('active');
    }
    scroll.init();
  });
  barba.hooks.after(() => {
    console.log('done');
  });

  barba.init({
    sync: true,
    timeout: 5000,
    transitions: [
      {
        once(data) {
          detectLinks();
          if ($(window).width() > 1920) {
            $('.nav .container').css('maxWidth', '2560px');
          } else {
            $('.nav .container').css('maxWidth', '1920px');
          }
          $('.wrapper').imagesLoaded(function () {
            scrollmain.update();
            console.log('All img are loaded');
          });
          
          detectContact();
          counterAnim();
          initLoader();
        },
        async afterLeave(data) {
          //when leave
          const done = this.async();
          const tlafter = transitionLeavePage(data);
          $(".nav-trigger").removeClass("active");
          $(".nav-main").removeClass("active");
          tlafter.then(() => {
            done();
          });
        },
        async enter(data) {
          //when enter
          const tlEnter = transitionEnterPage(data);
          tlEnter.then(() => {
            detectLinks();
            detectContact();
            counterAnim();
            if ($(window).width() < 768) {
              document.documentElement.scrollTop = 0;
            }
          });
          if ($(window).width() > 991) {
            if (data.next.namespace != 'home') {
              scrollmain.start();
            }
            if (data.next.namespace == 'contact') {
              $('.header').addClass('hidden');
              $('.header.header-contact').addClass('show');

            } else {
              $('.header').removeClass('hidden');
              $('.header.header-contact').removeClass('show');
            }
          } else {
            scrollmain.start();
          };
          if ($(window).width() > 1920) {
            $('.nav .container').css('maxWidth', '2560px');
          } else {
            $('.nav .container').css('maxWidth', '1920px');
          };
          scrollmain.scrollTo(0, 0);
          $(".header-links").addClass("show");
          $('.wrapper').imagesLoaded(function () {
            scrollmain.update();
            console.log('All img are loaded');
          });
          if ($(window).width() < 991) {
            $('.nav-main-mobile-wrap').css('display', 'block');
          }
        },

      },
    ],
    views: [
      {
        namespace: "home",
        beforeEnter() {
          //scrolled = false;
          console.log("beforeEnter");
          //Setup before Home
          if ($(window).width() > 991) {
            $(".body").css("overflow", "hidden");
            scrollmain.stop();
          } else {
            scrollmain.start();
          }
          homeScript();
        },
        beforeLeave() {
          // Reset Home
          scrollAllow = true;
          scrollAllowHover = true;
          // scrolled = false;
          scrolledInner = false;
          scrolledTesi = false;
          scrolledPrj = false;
          curSc = 0;
          lastSc = 0;
          console.log("afterLeave");
          //$('.nav-ic-trigger').css('backgroundColor', 'white');

        },
      },
      {
        namespace: "service",
        beforeEnter() {
          serviceScript();
        },
        afterEnter() {
        },
      },
      {
        namespace: "review",
        beforeEnter() {
          reviewScript();
        },
      },
      {
        namespace: "blog",
        beforeEnter() {
          blogScript();
        },
        afterEnter() { },
      },
      {
        namespace: "blogdetail",
        beforeEnter() {
          blogDetailScript();
        },
        afterEnter() {

        },
      },
      {
        namespace: "portfolio",
        beforeEnter() {
          portfolioScript();
        },
        afterEnter() { },
      },
      {
        namespace: "project",
        beforeEnter() {
          projectScript();
        },
        afterEnter() { },
      },
      {
        namespace: "about",
        beforeEnter() {
          aboutScript();
        },
      },
      {
        namespace: "contact",
        beforeEnter() {
          contactScript();
        },
        afterEnter() { },
      },
    ],
  });
  // Detect Page and Link
  function clearActive() {
    $(".header-link").removeClass("active");
    $(".nav-link").removeClass("active");
    $(".ft-link").removeClass("active");
    $(".nav-trigger-mobile").removeClass("active");
    $(".nav-main-mobile").removeClass("active");
    $('.nav-mobile-link-item').removeClass('active');
  }
  function detectLinks() {
    clearActive();
    if ($(".homepage").length) {
      $('[data-link="home"]').addClass("active");
    } else if ($(".servicepage").length) {
      $('[data-link="service"]').addClass("active");
    } else if ($(".reviewpage").length) {
      $('[data-link="review"]').addClass("active");
    } else if ($(".blogpage").length) {
      $('[data-link="blog"]').addClass("active");
      $('[data-link="blog"]').removeClass("enable");
    } else if ($(".aboutpage").length) {
      $('[data-link="about"]').addClass("active");
    } else if ($(".portfoliopage").length) {
      $('[data-link="portfolio"]').addClass("active");
      $('[data-link="portfolio"]').removeClass("enable");
    } else if ($(".contactpage").length) {
      $('[data-link="contact"]').addClass("active");
    } else if ($(".blogdetailpage").length) {
      $('[data-link="blog"]').addClass("active enable");
    } else if ($(".projectpage").length) {
      $('[data-link="portfolio"]').addClass("active enable");
    }
  }

  function detectContact() {
    if ($('.contactpage').length) {
      console.log('contact');
      
      $('.header').addClass('hidden');
      $('.header-clone.header-contact').addClass('show');
    } else {
      console.log('not contact');
      $('.header').removeClass('hidden');
      $('.header-clone.header-contact').removeClass('show');
    }
  }

  function initMagicMouse() {
    const cursor = $(".cursor-wrap");
    document.addEventListener("mousemove", (e) => {
      cursor.css({
        top: `${e.pageY}px`,
        left: `${e.pageX}px`,
      });
      if ($('.swiper-slide-active:hover').length) {
        $('.cursor-text').text('View');
      } else {
        $('.cursor-text').text('Scroll');
      }
    });
  }
  initMagicMouse();

  function navHandle() {
    let navLinks = $('.nav-link');
    let navFooters = $('.nav-footer-link');
    if ($(window).width() > 991) {
      $(".nav-ic-trigger").on("click", (e) => {
        e.preventDefault();
        if ($(e.target).closest('.nav-trigger').hasClass('active')) {
          $(".nav-trigger").removeClass("active");
          $(".nav-main").removeClass("active");
          gsap.to('.nav-circle', { scale: .9, clearProps: true });
          //scrolled = false;
        } else {
          gsap.set(navLinks, { x: 40, autoAlpha: 0 });
          gsap.set('.nav-footer .line', { scaleX: 0 });
          gsap.set(navFooters, { x: 40, autoAlpha: 0 });
          gsap.set('.nav-footer-content .text-16', { x: 40, autoAlpha: 0 });
          $(".nav-trigger").addClass("active");
          gsap.to(navLinks, { x: 0, autoAlpha: 1, stagger: 0.06, clearProps: true });
          gsap.to(navFooters, { x: 0, autoAlpha: 1, stagger: 0.06, clearProps: true });
          gsap.to('.nav-footer-content .text-16', { x: 0, autoAlpha: 1, clearProps: true });
          gsap.to(".nav-footer .line", { scaleX: 1, clearProps: true });
          gsap.fromTo('.nav-circle', { scale: .9 }, { scale: 1, clearProps: true });
          $(".nav-main").addClass("active");
          //scrolled = true;
        }
      });
      $('.nav-content-wrap [data-link]').on('mouseenter', (e) => {
        e.preventDefault();
        let target = $(e.target).data('link');
        console.log(target);
        $('.nav-img-wrap .nav-img').removeClass('active');
        $(`.nav-img-wrap .nav-img[nav-img=${target}]`).addClass('active');
      });
    }
    else {
      $(".nav-ic-trigger").on("click", (e) => {
        console.log('hello');
        $(".nav-trigger-mobile").toggleClass("active");
        $(".nav-main-mobile").toggleClass("active");
      });
    }
  };
  navHandle();

  function layout() {
    $(".nav").css("z-index", "98");
    $(".page-trans-wrap").css("z-index", "999");
    if ($(window).width() < 991) {
      $('.nav-main-mobile-wrap').css('display', 'block');
    } else {
      $(".header-contact").css('display', 'block');
    }
  }
  layout();

  function testScrollAllowHover() {
    if ($(".homepage").length) {
      if ($(".schome-pj-content").is(":hover") || $(".swiper-wrapper.schome-testi-name-wrap").is(":hover") || $(".schome-testi-content").is(":hover")) {
        scrollAllowHover = false;
        console.log('Hover block scroll')
      } else {
        scrollAllowHover = true;
      }
    } else {
      scrollAllowHover = true;
    }
    requestAnimationFrame(testScrollAllowHover)
  }
  requestAnimationFrame(testScrollAllowHover)

  // Homepage script

  function homeScript() {
    console.log('devvvvvvvv')
    scrollAllow = true;
    scrollAllowHover = true;
    if ($(".homepage").length) {
      //UI Only
      if ($(window).width() < 1440 && $(window).height() < 694 && $(window).width() > 991) {
        $('.schome-wrap').addClass('screen-too-small')
      } else {
        $('.schome-wrap').removeClass('screen-too-small')
      }

      //Define elements
      const circlePos = [
        "circle-s1",
        "circle-s2",
        "circle-s3",
        "circle-s4",
        "circle-s5",
        "circle-s6",
      ];
      const processBars = ["0%", "20%", "40%", "60%", "80%"];
      //const processBars = ["0%", "16.6%", "33.2%", "49.8%", "66.4%", "84%"];

      //Set up
      $(".cursor-container").css("z-index", "1000");

      $(".ser-hover-content").removeClass("active");

      //Layout service sections
      const colW = ($(".container").width() - 472) / 12;
      const serviceW =
        "calc(-" + $(".container").css("margin-left") + " + -60px)";
      const circleL = "calc(" + colW * 5 + "px + 160px)";
      $(".schome-ser-bg").css("margin-left", serviceW);

      function homeSet() {
        //Testimonial content max-height
        document.fonts.ready.then(function () {
          let heightArray = [];
          for (let i = 0; i < $(".schome-testi-content .swiper-slide").length; i++) {
            let itemHeight = $(".schome-testi-content .swiper-slide").eq(i).height();
            console.log($(".schome-testi-content .swiper-slide").eq(i).height());
            heightArray.push(itemHeight);
          };
          let maxHeight = Math.max.apply(Math, heightArray);
          $(".schome-testi-content").css('maxHeight', maxHeight);
          $('.schome-testi-name-swiper').css('maxHeight', $('.schome-testi-name-item').height());
          if ($(window).width() < 991) {
            const swiperTestiContent = new Swiper(".schome-testi-content", {
              direction: "vertical",
              spaceBetween: 0,
              slidesPerView: 1,
              effect: "fade",
              allowTouchMove: false,
              fadeEffect: {
                crossFade: true,
              },
            });
          }
        })
        // Service loop marquee
        document.fonts.ready.then(function () {
          gsap.set('.schome-work-loop', { x: `-${$('.home-work-loop-item').outerWidth()}` });
          gsap.set(".home-work-loop-item", {
            x: (i) => i * ($('.home-work-loop-item').outerWidth()),
          });
          gsap.to(".home-work-loop-item", {
            duration: 20,
            ease: "none",
            x: `-=${$('.home-work-loop-item').outerWidth()}`,
            repeat: -1
          });
        })

        if ($(window).width() > 991) {
          $(".schome").css({
            "pointer-events": "none",
          });
          setTimeout(() => {
            if ($(window).width() >= 1920) {
              $('.schome-testi-name').css('marginTop', $('.schome-testi-title').height() - $('.schome-testi-name').height() - 20);
            } else if ($(window).width() <= 1600 && $(window).width() >= 1366) {
              $('.schome-testi-name').css('marginTop', $('.schome-testi-title').height() - $('.schome-testi-name').height() + 13)
            } else {
              $('.schome-testi-name').css('marginTop', $('.schome-testi-title').height() - $('.schome-testi-name').height());
            }
          }, 1000);
          document.fonts.ready.then(function () {
            swiperSet();
          })
          function swiperSet() {
            const swiperProjInfo = new Swiper('.schome-pj-info-swiper', {
              spaceBetween: 0,
              slidesPerView: 1,
              effect: "fade",
              loop: true,
              loopAdditionalSlides: 1,
              allowTouchMove: false,
              speed: 1000,
              fadeEffect: {
                crossFade: true,
              },
              initialSlide: -1,
              autoplay: {
                delay: 2000,
                disableOnInteraction: true,
              },
            });
            const swiperProj = new Swiper(".schome-pj-slide-contain", {
              direction: "vertical",
              spaceBetween: 60,
              slidesPerView: 1,
              loop: true,
              loopAdditionalSlides: 1,
              speed: 1000,
              allowTouchMove: false,
              autoplay: {
                delay: 2000,
                disableOnInteraction: true,
              },
              on: {
                slideNextTransitionStart() {
                  swiperProjInfo.slideNext();
                  gsap.to("#icEyeLine", {
                    rotation: 90,
                    duration: 1,
                    ease: "power1.out",
                    clearProps: "all",
                  });
                  // if (curSc == 3) {
                  //   //scrolled = true;
                  //   if ($(".schome-pj-content").is(":hover")) {
                  //     return;
                  //   } else {
                  //     setTimeout(() => {
                  //       scrolled = false;
                  //     }, 2000);
                  //   }
                  // };
                },
                slidePrevTransitionStart() {
                  swiperProjInfo.slidePrev();
                  gsap.to("#icEyeLine", {
                    rotation: -90,
                    duration: 1,
                    ease: "power1.out",
                    clearProps: "all",
                  });
                  // if (curSc == 3) {
                  //   //scrolled = true;
                  //   if ($(".schome-pj-content").is(":hover")) {
                  //     return;
                  //   } else {
                  //     setTimeout(() => {
                  //       scrolled = false;
                  //     }, 2000);
                  //   }
                  // };
                },
              },
            });
            document.querySelector(".schome-pj-content").addEventListener("wheel", function (event) {
              if (scrolledPrj) return;
              if (Math.sign(event.deltaY) === 1) {
                console.log('down');
                swiperProj.slideNext();
                scrolledPrj = true;
                setTimeout(() => {
                  scrolledPrj = false;
                }, 1300);
              } else if (Math.sign(event.deltaY) === -1) {
                console.log('up');
                swiperProj.slidePrev();
                scrolledPrj = true;
                setTimeout(() => {
                  scrolledPrj = false;
                }, 1300);
              }
            });

            const swiperTestiName = new Swiper(".schome-testi-name-swiper", {
              direction: "vertical",
              spaceBetween: 0,
              slidesPerView: 1,
              mousewheel: false,
              allowTouchMove: false,
              slideToClickedSlide: true,
              speed: 1000,
              autoplay: {
                delay: 2000,
                disableOnInteraction: true,
              },
              on: {
                slideNextTransitionStart() {
                  swiperTestiAvatar.slideNext();
                  swiperTestiContent.slideNext();
                  // if (curSc == 4) {
                  //   scrolled = true;
                  //   if ($(".schome-testi-name-wrap").is(":hover")) {
                  //     return;
                  //   } else {
                  //     setTimeout(() => {
                  //       scrolled = false;
                  //     }, 1300);
                  //   }
                  // };
                },
                slidePrevTransitionStart() {
                  swiperTestiAvatar.slidePrev();
                  swiperTestiContent.slidePrev();
                  // if (curSc == 4) {
                  //   scrolled = true;
                  //   if ($(".schome-testi-name-wrap").is(":hover")) {
                  //     return;
                  //   } else {
                  //     setTimeout(() => {
                  //       scrolled = false;
                  //     }, 1300);
                  //   }
                  // };
                }
              }
            });
            const swiperTestiContent = new Swiper(".schome-testi-content", {
              direction: "vertical",
              spaceBetween: 0,
              slidesPerView: 1,
              effect: "fade",
              allowTouchMove: false,
              fadeEffect: {
                crossFade: true,
              },
            });
            const swiperTestiAvatar = new Swiper(".schome-testi-avatar", {
              direction: "vertical",
              spaceBetween: 0,
              slidesPerView: 1,
              effect: "fade",
              allowTouchMove: true,
              fadeEffect: {
                crossFade: true,
              },
            });

            document.querySelector(".swiper-wrapper.schome-testi-name-wrap").addEventListener("wheel", function (event) {
              if (scrolledTesi) {
                console.log(scrolledTesi)
                return;
              } else if (Math.sign(event.deltaY) === 1) {
                console.log('down1');
                swiperTestiName.slideNext();
                scrolledTesi = true;
                setTimeout(() => {
                  scrolledTesi = false;
                }, 1300);
              } else if (Math.sign(event.deltaY) === -1) {
                console.log('up1');
                swiperTestiName.slidePrev();
                scrolledTesi = true;
                setTimeout(() => {
                  scrolledTesi = false;
                }, 1300);
              }
            });
            document.querySelector(".schome-testi-content").addEventListener("wheel", function (event) {
              if (scrolledTesi) { return; }
              else if (Math.sign(event.deltaY) === 1) {
                console.log('down2');
                swiperTestiName.slideNext();
                scrolledTesi = true;
                setTimeout(() => {
                  scrolledTesi = false;
                }, 1300);
              } else if (Math.sign(event.deltaY) === -1) {
                console.log('up2');
                swiperTestiName.slidePrev();
                scrolledTesi = true;
                setTimeout(() => {
                  scrolledTesi = false;
                }, 1300);
              }
            });
          }
          // swiperTestiName.controller.control = [
          //   swiperTestiContent,
          //   swiperTestiAvatar,
          // ];
        } else {
          $('.ser-hover-item').addClass('active');
          const swiperProjInfo = new Swiper('.schome-pj-info-swiper', {
            spaceBetween: 0,
            slidesPerView: 1,
            effect: "fade",
            loop: true,
            loopAdditionalSlides: 1,
            allowTouchMove: false,
            speed: 1000,
            fadeEffect: {
              crossFade: true,
            },
            initialSlide: -1,
          });
          const swiperProj = new Swiper(".schome-pj-slide-contain", {
            direction: "horizontal",
            spaceBetween: 0,
            slidesPerView: 1,
            loop: true,
            loopAdditionalSlides: 1,
            speed: 1000,
            breakpoints: {
              768: {
                spaceBetween: 0,
                slidesPerView: 2,
              }
            },
            on: {
              slideNextTransitionStart() {
                swiperProjInfo.slideNext();
              },
              slidePrevTransitionStart() {
                swiperProjInfo.slidePrev();
              }
            }
          });
          const swiperTestiName = new Swiper(".schome-testi-name-swiper", {
            direction: "vertical",
            spaceBetween: 0,
            slidesPerView: 1,
            mousewheel: false,
            slideToClickedSlide: true,
            on: {
              slideNextTransitionStart() {
                swiperTestiAvatar.slideNext();
                swiperTestiContent.slideNext();
              },
              slidePrevTransitionStart() {
                swiperTestiAvatar.slidePrev();
                swiperTestiContent.slidePrev();
              }
            }
          });
          const swiperTestiContent = new Swiper(".schome-testi-content", {
            direction: "vertical",
            spaceBetween: 0,
            slidesPerView: 1,
            effect: "fade",
            allowTouchMove: false,
            fadeEffect: {
              crossFade: true,
            },
          });
          const swiperTestiAvatar = new Swiper(".schome-testi-avatar-mb", {
            direction: "vertical",
            spaceBetween: 0,
            slidesPerView: 1,
            effect: "fade",
            allowTouchMove: false,
            fadeEffect: {
              crossFade: true,
            },
          });
          // swiperTestiName.controller.control = [
          //   swiperTestiContent,
          //   swiperTestiAvatar,
          // ];
        };

      }
      homeSet();

      function homeScroll() {
        if ($(window).width() > 991) {
          scrollIndicatorSet()
          function scrollDown() {
            if (scrollAllow) {
              if (curSc < 5) {
                lastSc = curSc;
                curSc++;
                handleScChange();
                scrollIndicatorSet()
                $(".schome").eq(lastSc).removeClass("active");
                $(".schome").eq(curSc).addClass("active");
                console.log(curSc);
                gsap.to(".schome-container", {
                  y: `-${curSc * 1}00vh`,
                  duration: 1.6,
                  ease: "power2.inOut",
                });
                console.log("Lastsc" + lastSc);
                hanldeCircle();
                handleProcessBar();
                scrolled = true;
                if ($(".schome-pj-content").is(":hover") || $(".swiper-wrapper.schome-testi-name-wrap").is(":hover") || $(".schome-testi-content").is(":hover")) {
                  return;
                } else {
                  setTimeout(() => {
                    scrolled = false;
                  }, 2000);
                }
              }
            }
          };
          function scrollUp() {
            if (scrollAllow) {
              if (curSc > 0) {
                lastSc = curSc;
                curSc--;
                handleScChange();
                scrollIndicatorSet()
                $(".schome").eq(lastSc).removeClass("active");
                $(".schome").eq(curSc).addClass("active");
                console.log(curSc);
                gsap.to(".schome-container", {
                  y: `-${curSc * 1}00vh`,
                  duration: 1.6,
                  ease: "power2.inOut",
                });
                console.log(lastSc);
                hanldeCircle();
                handleProcessBar();
                scrolled = true;
                if ($(".schome-pj-content").is(":hover") || $(".swiper-wrapper.schome-testi-name-wrap").is(":hover") || $(".schome-testi-content").is(":hover")) {
                  return;
                } else {
                  setTimeout(() => {
                    scrolled = false;
                  }, 2000);
                }
              }
            }
          };
          $('[data-scrollto="homeService"]').on('click', function(e) {
            if ($(window).width() > 991) {
              e.preventDefault();
              scrollDown();
            }
          })
          $('.scroll-down').on('click', (e) => {
            e.preventDefault();
            scrollDown();
          })
          $('.scroll-up').on('click', (e) => {
            e.preventDefault();
            scrollUp();
          });
          function scrollIndicatorSet() {
            if (curSc == 0) {
              $('.scroll-up').addClass('inactive');
              setTimeout(() => {
                $('.processbar-wrap').removeClass('s6-hidden');  
              }, 800);
            } else if (curSc == 5) {
              $('.scroll-down').addClass('inactive');
              $('.processbar-wrap').addClass('s6-hidden');
            } else {
              $('.scroll-up').removeClass('inactive');
              $('.scroll-down').removeClass('inactive');
              setTimeout(() => {
                $('.processbar-wrap').removeClass('s6-hidden');  
              }, 800);
              
            }
          }

          window.addEventListener("wheel", function (event) {
            if ($(".homepage").length) {
              if (scrolled) return;
              if (Math.sign(event.deltaY) === 1) {
                scrollDown();
              } else if (Math.sign(event.deltaY) === -1) {
                scrollUp();
              }
            }
          });
        };
        const handleScChange = () => {
          //header changes
          console.log(curSc)
          if (curSc >= 1) {
            $(".nav-trigger").addClass("show");
            $(".header-links").removeClass("show");
          } else {
            $(".nav-trigger").removeClass("show");
            $(".header-links").addClass("show");
          }

          if (curSc == 3) {
            let s4Left = (($('.schome-pj-content').outerWidth() + 60 - 40) / $(window).width()) * 100;
            $('.home-circle').css('left', `${s4Left}%`);
          } else {
            document.querySelector('.home-circle').style.removeProperty('left');
            if (document.querySelector('.home-circle').style.removeProperty) {
              document.querySelector('.home-circle').style.removeProperty('left');
            } else {
              document.querySelector('.home-circle').style.removeProperty('left');
            }
          }
          //each section changes
          if (curSc == 3) {
            $(".schome-pj-content").on("mouseover mousemove", (e) => {
              scrolled = true;
              $(".cursor-wrap").addClass("active");
            });
            $(".schome-pj-content").on("mouseleave", (e) => {
              scrolled = false;
              $(".cursor-wrap").removeClass("active");
            });
          } else if (curSc == 4) {
            $(".schome-testi-name-swiper").on("mouseover mousemove", (e) => {
              scrolled = true;
            });
            $(".schome-testi-name-swiper").on("mouseleave", (e) => {
              scrolled = false;
            });
            $(".schome-testi-content").on("mouseover mousemove", (e) => {
              scrolled = true;
            });
            $(".schome-testi-content").on("mouseleave", (e) => {
              scrolled = false;
            });
          } else if (curSc == 2) {
            $('.discover-wrap').addClass('show');
            $(".schome-ser-web.web").on("mouseenter", (e) => {
              $('.discover-wrap').removeClass('show');
              $('[data-ser="web"]').addClass("active");
              $('.ser-hover-item[data-ser="brand"] .schome-ser-hover-item').addClass("fade");
              if ($('[data-ser="web"]').hasClass("active")) {
                $('[data-ser="web"]').addClass("active");
              }
              $(".schome-service-title").removeClass("active");
              $(".img-home-ser.mid").removeClass("active");
            });
            $(".schome-ser-web.web").on("mouseleave", (e) => {
              $('[data-ser="web"]').removeClass("active");
              $(".schome-service-title").addClass("active");
              $(".img-home-ser.mid").addClass("active");
              $('.discover-wrap').addClass('show');
              $('.ser-hover-item[data-ser="web"] .schome-ser-hover-item').removeClass("fade");
              $('.ser-hover-item[data-ser="brand"] .schome-ser-hover-item').removeClass("fade");
            });
            $(".schome-ser-web.brand").on("mouseenter", (e) => {
              $('.discover-wrap').removeClass('show');
              $('[data-ser="brand"]').addClass("active");
              $('.ser-hover-item[data-ser="web"] .schome-ser-hover-item').addClass("fade");
              $(".schome-service-title").removeClass("active");
              $(".img-home-ser.mid").removeClass("active");
            });
            $(".schome-ser-web.brand").on("mouseleave", (e) => {
              $('[data-ser="brand"]').removeClass("active");
              $(".schome-service-title").addClass("active");
              $(".img-home-ser.mid").addClass("active");
              $('.discover-wrap').addClass('show');
              $('.ser-hover-item[data-ser="brand"] .schome-ser-hover-item').removeClass("fade");
              $('.ser-hover-item[data-ser="web"] .schome-ser-hover-item').removeClass("fade");
            });
          }

          if (curSc == 3) {
            //$(".nav-ic-trigger").css("backgroundColor", "#EBEDEA");
            $(".schome-bg-wrap").addClass("bg-home-s4");
            //$(".home-circle.circle-s4").css("left", circleL);
            $(".schome-pj-bg").addClass("active");
          } else {
            //$(".nav-ic-trigger").css("backgroundColor", "#ffffff");
            $(".schome-bg-wrap").removeClass("bg-home-s4");
            $(".schome-pj-bg").removeClass("active");
          }

          if (curSc == 2) {
            setTimeout(() => {
              $('.schome-ser-hover-item').removeClass('reveal');
            }, 1300);
          } else {
            $('.schome-ser-hover-item').addClass('reveal');
          }

          if (curSc != 2) {
            $('[data-ser="web"]').removeClass("active");
            $('[data-ser="brand"]').removeClass("active");
            $(".schome-service-title").addClass("active");
            $(".img-home-ser.mid").addClass("active");
          }
        };
        const hanldeCircle = () => {
          const curPos = circlePos[curSc];
          const lastPos = circlePos[lastSc];
          $(".home-circle").removeClass(lastPos);
          $(".home-circle").addClass(curPos);
        };
        const handleProcessBar = () => {
          const percent = processBars[curSc];
          $(".processbar-cur").css("top", percent);
        };
      };
      //homeScroll();

      function homeSetTest() {
        //$('.schome-wrap').css('max-height','none');
      }
      homeSetTest();

      function homeScrollTest() {
        scrollIndicatorSet()
        window.addEventListener("wheel", function (e) { 
          if ($(".homepage").length) {
            if (scrollAllow && scrollAllowHover) {
              if (Math.sign(e.deltaY) === 1) {
                scrollDown();
                console.log('down');
              } else if (Math.sign(e.deltaY) === -1) {
                scrollUp();
                console.log('up')
              }
            } else { return }
          }
        });

        $('.scroll-down').on('click', (e) => {
          e.preventDefault();
          scrollDown();
        })
        $('.scroll-up').on('click', (e) => {
          e.preventDefault();
          scrollUp();
        });

        function scrollDown() {
          if (curSc < 5) {
            scrollAllow = false;
            lastSc = curSc;
            curSc++;
            handleScChange();
            scrollIndicatorSet()
            $(".schome").eq(lastSc).removeClass("active");
            $(".schome").eq(curSc).addClass("active");
            console.log(lastSc + ' to ' + curSc);
            gsap.to(".schome-container", {
              y: `-${curSc * 1}00vh`,
              duration: 1.6,
              ease: "power2.inOut", 
              onComplete: () => {
                setTimeout(() => {
                  scrollAllow = true;  
                }, 100);
                
                console.log('stop anim')
              }
            });
            hanldeCircle();
            handleProcessBar();
          }
        }
        function scrollUp() {
          if (curSc > 0) {
            scrollAllow = false;
            lastSc = curSc;
            curSc--;
            console.log(lastSc + ' to ' + curSc);
            handleScChange();
            scrollIndicatorSet()
            $(".schome").eq(lastSc).removeClass("active");
            $(".schome").eq(curSc).addClass("active");
            gsap.to(".schome-container", {
              y: `-${curSc * 1}00vh`,
              duration: 1.6,
              ease: "power2.inOut", 
              onComplete: () => {
                setTimeout(() => {
                  scrollAllow = true;  
                }, 100);
                
                console.log('stop anim')
              }
            });
            hanldeCircle();
            handleProcessBar();
          }
        }

        const hanldeCircle = () => {
          const curPos = circlePos[curSc];
          const lastPos = circlePos[lastSc];
          $(".home-circle").removeClass(lastPos);
          $(".home-circle").addClass(curPos);
        };
        const handleProcessBar = () => {
          const percent = processBars[curSc];
          $(".processbar-cur").css("top", percent);
        };
        const handleScChange = () => {
          //header changes
          console.log(curSc)
          if (curSc >= 1) {
            $(".nav-trigger").addClass("show");
            $(".header-links").removeClass("show");
          } else {
            $(".nav-trigger").removeClass("show");
            $(".header-links").addClass("show");
          }

          if (curSc == 3) {
            console.log('SERVICESS')
            let s4Left = (($('.schome-pj-content').outerWidth() + 60 - 40) / $(window).width()) * 100;
            $('.home-circle').css('left', `${s4Left}%`);
          } else {
            document.querySelector('.home-circle').style.removeProperty('left');
            // if (document.querySelector('.home-circle').style.removeProperty) {
            //   document.querySelector('.home-circle').style.removeProperty('left');
            // } else {
            //   document.querySelector('.home-circle').style.removeProperty('left');
            // }
          }
          //each section changes
          if (curSc == 3) {
            $(".schome-pj-content").on("mouseover mousemove", (e) => {
              //scrolled = true;
              $(".cursor-wrap").addClass("active");
            });
            $(".schome-pj-content").on("mouseleave", (e) => {
              //scrolled = false;
              $(".cursor-wrap").removeClass("active");
            });
          } else if (curSc == 4) {
            // $(".schome-testi-name-swiper").on("mouseover mousemove", (e) => {
            //   scrolled = true;
            // });
            // $(".schome-testi-name-swiper").on("mouseleave", (e) => {
            //   scrolled = false;
            // });
            // $(".schome-testi-content").on("mouseover mousemove", (e) => {
            //   scrolled = true;
            // });
            // $(".schome-testi-content").on("mouseleave", (e) => {
            //   scrolled = false;
            // });
          } else if (curSc == 2) {
            $('.discover-wrap').addClass('show');
            $(".schome-ser-web.web").on("mouseenter", (e) => {
              $('.discover-wrap').removeClass('show');
              $('[data-ser="web"]').addClass("active");
              $('.ser-hover-item[data-ser="brand"] .schome-ser-hover-item').addClass("fade");
              if ($('[data-ser="web"]').hasClass("active")) {
                $('[data-ser="web"]').addClass("active");
              }
              $(".schome-service-title").removeClass("active");
              $(".img-home-ser.mid").removeClass("active");
            });
            $(".schome-ser-web.web").on("mouseleave", (e) => {
              $('[data-ser="web"]').removeClass("active");
              $(".schome-service-title").addClass("active");
              $(".img-home-ser.mid").addClass("active");
              $('.discover-wrap').addClass('show');
              $('.ser-hover-item[data-ser="web"] .schome-ser-hover-item').removeClass("fade");
              $('.ser-hover-item[data-ser="brand"] .schome-ser-hover-item').removeClass("fade");
            });
            $(".schome-ser-web.brand").on("mouseenter", (e) => {
              $('.discover-wrap').removeClass('show');
              $('[data-ser="brand"]').addClass("active");
              $('.ser-hover-item[data-ser="web"] .schome-ser-hover-item').addClass("fade");
              $(".schome-service-title").removeClass("active");
              $(".img-home-ser.mid").removeClass("active");
            });
            $(".schome-ser-web.brand").on("mouseleave", (e) => {
              $('[data-ser="brand"]').removeClass("active");
              $(".schome-service-title").addClass("active");
              $(".img-home-ser.mid").addClass("active");
              $('.discover-wrap').addClass('show');
              $('.ser-hover-item[data-ser="brand"] .schome-ser-hover-item').removeClass("fade");
              $('.ser-hover-item[data-ser="web"] .schome-ser-hover-item').removeClass("fade");
            });
          }

          if (curSc == 3) {
            //$(".nav-ic-trigger").css("backgroundColor", "#EBEDEA");
            $(".schome-bg-wrap").addClass("bg-home-s4");
            //$(".home-circle.circle-s4").css("left", circleL);
            $(".schome-pj-bg").addClass("active");
          } else {
            //$(".nav-ic-trigger").css("backgroundColor", "#ffffff");
            $(".schome-bg-wrap").removeClass("bg-home-s4");
            $(".schome-pj-bg").removeClass("active");
          }

          if (curSc == 2) {
            setTimeout(() => {
              $('.schome-ser-hover-item').removeClass('reveal');
            }, 1300);
          } else {
            $('.schome-ser-hover-item').addClass('reveal');
          }

          if (curSc != 2) {
            $('[data-ser="web"]').removeClass("active");
            $('[data-ser="brand"]').removeClass("active");
            $(".schome-service-title").addClass("active");
            $(".img-home-ser.mid").addClass("active");
          }
        };
        function scrollIndicatorSet() {
          if (curSc == 0) {
            $('.scroll-up').addClass('inactive');
            setTimeout(() => {
              $('.processbar-wrap').removeClass('s6-hidden');  
            }, 800);
          } else if (curSc == 5) {
            $('.scroll-down').addClass('inactive');
            $('.processbar-wrap').addClass('s6-hidden');
          } else {
            $('.scroll-up').removeClass('inactive');
            $('.scroll-down').removeClass('inactive');
            setTimeout(() => {
              $('.processbar-wrap').removeClass('s6-hidden');  
            }, 800);
          }
        }
      }
      if ($(window).width() > 991) {
        homeScrollTest();
      }
    }
  }

  function serviceScript() {
    if ($(".servicepage").length) {
      let tabArray = [1, 2, 3, 4, 5, 6];
      let currentTab = 1;
      function serviceSet() {
        $(".ser-how-step-item").css({
          "grid-column": "1/2",
          "grid-row": "1/2",
          "pointer-events": "none",
          opacity: "0",
        });
        $(".ser-how-step-item .ser-how-content-wrap").css("opacity", 0);
        $(".ser-how-tab-item").eq(0).addClass("active");
        $(".ser-how-step-item").eq(0).addClass("active");

        for (let i = 0; i < tabArray.length; i++) {
          $(".ser-how-tab-item").eq(i).attr("data-tab", tabArray[i]);
          $(".ser-how-step-item").eq(i).attr("data-tab", tabArray[i]);
        }
      }
      serviceSet();

      function serviceEvent() {
        const activeItem = (target) => {
          currentTab = target;
          const tabActiveArr = Array.from({ length: target }, (_, i) => i + 1);
          $(".ser-how-tab-item").removeClass("active");
          $(".ser-how-step-item").removeClass("active");
          const activeStepIndex = tabActiveArr[tabActiveArr.length - 1];
          $(`.ser-how-step-item[data-tab=${activeStepIndex}]`).addClass("active");
          tabActiveArr.forEach((value) => {
            $(`.ser-how-tab-item[data-tab=${value}]`).addClass("active");
          });
          $(".ser-how-line-progress").width(
            `${(tabActiveArr.length / tabArray.length) * 100}%`
          );
        };
        const activeControlBtn = () => {
          currentTab === 1
            ? $(".control-item-prev").addClass("disable")
            : $(".control-item-prev").removeClass("disable");
          currentTab === 6
            ? $(".control-item-next").addClass("disable")
            : $(".control-item-next").removeClass("disable");
        };
        $(".ser-how-tab").on("click", (e) => {
          e.preventDefault();
          let target = $(e.target).parent().attr("data-tab");
          activeItem(target);
        });
        $(".control-item-prev").on("click", (e) => {
          e.preventDefault();
          currentTab--;
          activeControlBtn();
          activeItem(currentTab);
        });
        $(".control-item-next").on("click", (e) => {
          e.preventDefault();
          currentTab++;
          activeControlBtn();
          activeItem(currentTab);
        });
      }
      serviceEvent();
    }
  }

  function reviewScript() {
    if ($('.reviewpage').length) {
      if (window.width() > 991 ) {
        setTimeout(() => {
          console.log('delay')
          gsap.set('.rev-testi-item', { autoAlpha: 0 });
          ScrollTrigger.batch('.rev-testi-item', {
            scroller: '.scrollmain',
            start: 'top 80%',
            onEnter: batch => gsap.to(batch, { autoAlpha: 1, stagger: 0.2 }),
          })
        }, 1000);
      }
    };
  }

  function blogScript() {
    if ($(".blogpage").length) {
      function blogSet() {
        $(".blog-item").removeClass("hidden-load");
        $(".blog-item").removeClass("hidden-filter");
        for (let i = $(".blog-item:not(.hidden-filter)").length; i >= 4; i -= 1) {
          $(".blog-item").eq(i).addClass("hidden-load");
        }
        if ($(".blog-item:not(.hidden-filter)").length > 4) {
          $(".link-load").removeClass("hidden");
        } else {
          $(".link-load").addClass("hidden");
        }
      }
      blogSet();

      function blogEvent() {
        $(".link-load").on("click", (e) => {
          for (let i = 0; i < 4; i++) {
            $(".blog-item.hidden-load").eq(i).removeClass("hidden-load");
          }
          if ($(".blog-item.hidden-load").length < 1) {
            $(e.target).addClass("hidden");
          }
          setTimeout(() => { scrollmain.update(); }, 500)
        });
        $(".filter-blog").on("click", (e) => {
          $(".blog-item").removeClass("hidden-load");
          $(".blog-item").removeClass("hidden-filter");
          $(".filter-blog").removeClass("active");
          $(e.target).addClass("active");
          if ($(e.target).data("filter") == "*") {
            console.log("all");
            $(".blog-main-title").text("Our blog");
            $(".blog-item").removeClass("hidden-filter");
          } else {
            $(".blog-main-title").text($(e.target).data("filter"));
            $(".blog-item").addClass("hidden-filter");
            $(`.info-cate:contains(${$(e.target).data("filter")})`)
              .closest(".blog-item")
              .removeClass("hidden-filter");
          }
          console.log(e.target);
          for (let i = $(".blog-item:not(.hidden-filter)").length; i >= 4; i -= 1) {
            $(".blog-item").eq(i).addClass("hidden-load");
          }
          if ($(".blog-item:not(.hidden-filter)").length > 4) {
            $(".link-load").removeClass("hidden");
          } else {
            $(".link-load").addClass("hidden");
          }
          setTimeout(() => { scrollmain.update(); }, 500)
        });
      }
      blogEvent();
    }
  }
  function blogDetailScript() {
    if ($('.blogdetailpage').length) {
      console.log('blogdetail');
      function createToc() {
        let observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            const id = entry.target.getAttribute("id");
            if (entry.isIntersecting) {
              document.querySelectorAll(".active").forEach((z) => {
                z.classList.remove("active")
              });
              document.querySelector(`a[href="#${id}"]`).classList.add("active");
            }
          });
        }, { rootMargin: '0px 0px -75% 0px' });
        document.querySelector(".blogdetail-content").querySelectorAll("h2").forEach(function (heading, i) {
          observer.observe(heading);
          heading.setAttribute("id", "toc-" + i);
          const item = document.createElement("a");
          item.innerHTML = heading.innerHTML
          item.setAttribute("class", "text-16 toc-item underline underline-gray");
          item.setAttribute("href", "#toc-" + i);
          document.querySelector(".toc-content-wrap").appendChild(item);
        });
        $('a.toc-item').on('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          let target = $(e.target).attr('href');
          console.log(target);
          scrollmain.scrollTo(target);
        })
      };
      setTimeout(() => {
        createToc();
        scrollmain.update();
      }, 1000);
      setTimeout(() => {
        scrollmain.update();
      }, 2000);
    }
  }
  function portfolioScript() {
    if ($(".portfoliopage").length) {
      function portfolioSet() {
        $(".filter-counter").eq(0).text($(".port-item").length);
        $(".filter-counter")
          .eq(1)
          .text(
            $(`.port-cate-text:contains("Branding")`).closest(".port-item").length
          );
        $(".filter-counter")
          .eq(2)
          .text(
            $(`.port-cate-text:contains("UX/UI Design")`).closest(".port-item")
              .length
          );
      }
      portfolioSet();

      function portfolioEvent() {
        $(".filter-port").on("click", (e) => {
          $(".port-filter-counter").removeClass("active");
          $(e.target).closest(".port-filter-counter").addClass("active");
          if ($(e.target).data("filter") == "*") {
            console.log("all");
            $(".port-main-title").text("Portfolio");
            $(".port-item").removeClass("hidden-filter");
          } else {
            $(".port-main-title").text($(e.target).data("filter"));
            $(".port-item").addClass("hidden-filter");
            $(`.port-cate-text:contains("${$(e.target).data("filter")}")`)
              .closest(".port-item")
              .removeClass("hidden-filter");
          }
          setTimeout(() => { scrollmain.update(); }, 500)
        });
      }
      portfolioEvent();
    }
  }
  function projectScript() {
    if ($(".projectpage").length) {
      function projectSet() {
        if ($(window).width() > 767) {
          $(".proj-sol-img-item:first-child").css("grid-column", "1/3");
          $(".proj-more-img-item:first-child").css("grid-column", "1/3");
          $(".proj-more-img-item:last-child").css("grid-column", "1/3");
        }
        const swiperRelate = new Swiper('.proj-relate-main', {
          speed: 400,
          spaceBetween: 20,
          slidesPerView: 1,
          breakpoints: {
            768: {
              slidesPerView: 2,
              spaceBetween: 32,
            }
          }
        });
      }
      projectSet();
    }
  }
  function aboutScript() {
    if ($(".aboutpage").length) {
      // About loop marquee
      document.fonts.ready.then(function () {
        gsap.delayedCall(0, delayAbtLoop);
        function delayAbtLoop() {
          //gsap.set('.abt-loop-wrap', { x: `-${$('.abt-loop-item').outerWidth()}` });
          // gsap.set(".abt-loop-item", {
          //   x: (i) => i * ($('.abt-loop-item').outerWidth()),
          // });
          const tlAbtLoop = new gsap.timeline({
          })
          tlAbtLoop.to(".abt-loop-item", {
            duration: 20,
            ease: "none",
            x: `-=${$('.abt-loop-item').outerWidth()}`,
            repeat: -1,
          })
          // tlAbtLoop.timeScale(0);
          // gsap.to(tlAbtLoop, { timeScale: 1, duration: 4, delay: 1 });
        }
      })
    }
  }
  function contactScript() {
    if ($(".contactpage").length) {
      const showError = (name, message) => {
        const selectorForm = `[data-form-group=${name}]`;
        $(`${selectorForm} .text-error`).text(message);
        $(`${selectorForm} .text-error`).addClass("show");
        $(`${selectorForm} .contact-input`).addClass("has-error");
      };
      const hideError = (name) => {
        const selectorForm = `[data-form-group=${name}]`;
        $(`${selectorForm} .text-error`).text("");
        $(`${selectorForm} .text-error`).removeClass("show");
        $(`${selectorForm} .contact-input`).removeClass("has-error");
      };
      function contactSet() {
        $('.contact-2-item-txt').css('display','none');
        $(".contact-main").css({
          opacity: "0",
          "grid-column": "1/2",
          "grid-row": "1/2",
          "pointer-events": "none",
          "transform": "translate(0px, 40px)",
          "-webkit-transform": "translate(0px, 40px)",
          "-ms-transform": "translate(0px, 40px)",
        });
        setTimeout(() => {
          $('.contact-main').css("transition", "all 0.5s ease")
        }, 500);
        $(".contact-main").eq(0).addClass("active");
        $(".main-form").addClass("hide");
        $("#Service").val($(".contact-1-item").eq(0).text());
        $("#Price").val($(".contact-2-item").eq(0).find('.contact-2-item-txt').text());
        console.log($("#Price").val())
        $(".sccontact-success").css({
          position: "absolute",
          top: 0,
          "z-index": 1,
          "pointer-events": "none",
          opacity: 0,
        });
        setTimeout(() => {
          $('.sccontact-success').css("transition", "opacity 0.5s ease")
        }, 500);
      };

      contactSet();
      scrollmain.update();
      function contactEvent() {
        $('#wf-form-PhStep3').on('keyup keypress', function (e) {
          let keyCode = e.keyCode || e.which;
          if (keyCode === 13) {
            e.preventDefault();
            $('.contact-act-next-wrap').click();
            curCont = 3;
            $(".contact-act-back").removeClass("hide");
            $(".contact-main").removeClass("active");
            $(".contact-process").removeClass("active");
            $(".contact-main").eq(curCont).addClass("active");
            for (let i = 0; i < curCont + 1; i++) {
              $(".contact-process").eq(i).addClass("active");
            }
            if (curCont == 3) {
              $(".contact-act-next-wrap").addClass("hide");
              $(".main-form").removeClass("hide");
            }
            return false;
          }
        });
        $('#wf-form-PhStep4').on('keyup keypress', function (e) {
          let keyCode = e.keyCode || e.which;
          if (keyCode === 13) {
            e.preventDefault();
            $("#email-form").trigger('submit');
            return false;
          }
        });
        let arrayCont1 = [$(".contact-1-item").eq(0).text()];
        $(".contact-1-item").on("click", (e) => {
          let value = $(e.target).text();
          if ($(e.target).hasClass('active')) {
            $(e.target).removeClass('active');
            arrayCont1.splice(arrayCont1.indexOf(value), 1);
          } else {
            $(e.target).addClass('active');
            arrayCont1.push(value);
          }
          console.log(arrayCont1);
          $("#Service").val(arrayCont1.join(', '));
        });
        $(".contact-2-item.mod-min").on("click", function(e) {
          e.preventDefault();
          if (!$(this).hasClass('active')) {
            $('.contact-2-item.active').removeClass('active');
            $(this).addClass('active');
          }
          
          let value = $(this).find('.contact-2-item-txt').text();
          $("#Price").val(value);

          let valueSplit = value.split('-');
          if (valueSplit.length > 1) {
            $('.price-low').text(valueSplit[0])
            $('.price-high').text(valueSplit[1])
            $('.price-to').text('to')
          } else {
            $('.price-low').text(valueSplit[0].replace('+',''))
            $('.price-high').text('above')
            $('.price-to').text('and')
          }
          console.log($("#Price").val())

        });
        $("#PhSite").on("keyup", (e) => {
          let value = $(e.target).val();
          $("#Site").val(value);
          console.log(value);
        });
        $("#PhName").on("keyup", (e) => {
          hideError("Name");
          let value = $(e.target).val();
          $("#Name").val(value);
          console.log(value);
        });
        $("#PhEmail").on("keyup", (e) => {
          hideError("Email");
          let value = $(e.target).val();
          $("#Email").val(value);
          console.log(value);
        });
        $("#PhPhone").on("keyup", (e) => {
          hideError("Phone");
          let value = $(e.target).val();
          $("#Phone").val(value);
          console.log(value);
        });
        $("#PhMessage").on("keyup", (e) => {
          let value = $(e.target).val();
          $("#Message").val(value);
          console.log(value);
        });

        let curCont = 0;

        $(".contact-act-next-wrap").on("click", (e) => {
          e.preventDefault();
          curCont = curCont + 1;
          $('.heading.h4.contact-main-title').removeClass('active');
          $('.heading.h4.contact-main-title').eq(curCont).addClass('active');
          $(".contact-act-back").removeClass("hide");
          $(".contact-main").removeClass("active");
          $(".contact-process").removeClass("active");
          $(".contact-main").eq(curCont).addClass("active");
          for (let i = 0; i < curCont + 1; i++) {
            $(".contact-process").eq(i).addClass("active");
          }
          if (curCont == 2) {
            $(".contact-act-next-wrap").addClass("hide");
            $(".main-form").removeClass("hide");
            console.log(grecaptcha)
            if ($('#g-recaptcha-response').length != 1) {
              $('#googleReCaptcha').empty()
              grecaptcha.render('googleReCaptcha', {'sitekey': '6LdUgggjAAAAAH2u6WxijwqDeXkUb3RMDIlBpA0F'});
              console.log('init g recaptcha')
            }
          }
          scrollmain.update();
        });
        $(".contact-act-back").on("click", (e) => {
          e.preventDefault();
          hideError("Email");
          curCont = curCont - 1;
          $('.heading.h4.contact-main-title').removeClass('active');
          $('.heading.h4.contact-main-title').eq(curCont).addClass('active');
          if (curCont == 0) {
            $(e.target).addClass("hide");
          }
          $(".contact-main").removeClass("active");
          $(".contact-process").removeClass("active");
          $(".contact-main").eq(curCont).addClass("active");
          for (let i = 0; i < curCont + 1; i++) {
            $(".contact-process").eq(i).addClass("active");
          }
          if (curCont < 2) {
            $(".contact-act-next-wrap").removeClass("hide");
            $(".main-form").addClass("hide");
          }
          scrollmain.update();
        });

        $("#email-form").submit((e) => {
          e.preventDefault();
          const formData = new FormData(e.target); // get the form data
          const parsedFormData = {};
          [...formData.entries()].forEach((dataObject) => {
            parsedFormData[dataObject[0]] = dataObject[1];
          });

          // const validateDomain = () => {
          //   let validDomain = true;
          //   if (parsedFormData["Domain"] == '') {
          //     validDomain = true;
          //   } else {
          //     if (!isDomain(parsedFormData["Domain"])) {
          //       showError("Domain", "Invalid domain");
          //       validDomain = false;
          //     } else {
          //       hideError("Domain");
          //       validDomain = true;
          //     }
          //   }
          //   return validDomain;
          // };

          const validateName = () => {
            let validName = true;
            if (parsedFormData["Name"] == '') {
              showError("Name", "Name is required");
              validName = false;
            } else {
              validName = true;
            }
            return validName;
          };

          const validateEmail = () => {
            let validEmail = true;
            if (parsedFormData["Email"] == '') {
              showError("Email", "Email is required");
              validEmail = false;
            } else {
              if (!isEmail(parsedFormData["Email"])) {
                showError("Email", "Invalid email");
                validEmail = false;
              } else {
                hideError("Email");
                validEmail = true;
              }
            }
            return validEmail;
          };

          const validatePhone = () => {
            let validPhone = true;
            if (parsedFormData["Phone"] == '') {
              validPhone = true;
            } else {
              if (!isPhone(parsedFormData["Phone"])) {
                showError("Phone", "Invalid phone number")
                validPhone = false;
              } else {
                hideError("Phone");
                validPhone = true;
              }
            }
            return validPhone;
          };

          const validateRecaptcha = () => {
            if ($("#g-recaptcha-response").length) {
              return $("#g-recaptcha-response").val() !== '';
            } else {
              return true;
            }
          }

          const successName = validateName();
          const successEmail = validateEmail();
          const successPhone = validatePhone();
          //const successDomain = validateDomain();
          const successRecaptcha = validateRecaptcha();
          if (successName && successEmail && successPhone && successRecaptcha) {
            $('.contact-act-submit .contact-act-next').text('Please wait...');
            const serializeData = (data) => { };
            const data = {
              name: "Email Form",
              source: window.location.href,
              test: false,
              "fields[Name]": parsedFormData["Name"],
              "fields[Email]": parsedFormData["Email"],
              "fields[Phone]": parsedFormData["Phone"],
              "fields[Service]": parsedFormData["Service"],
              "fields[Price]": parsedFormData["Price"],
              "fields[Site]": parsedFormData["Site"],
              "fields[Message]": parsedFormData["Message"],
              ...($("#g-recaptcha-response").val() && {
                "fields[g-recaptcha-response]": $("#g-recaptcha-response").val(),
              }),
              
              dolphin: false,
            };
            const final_data = new URLSearchParams(data).toString();
            $.ajax({
              url: "https://webflow.com/api/v1/form/618e3f423d49661f9b1eded5",
              //url: "https://webflow.com/api/v1/form/6375bfdf64d21be14cc2ea64",
              method: "POST",
              data: final_data,
              headers: {
                accept: "application/json, text/javascript, */*; q=0.01",
              },
              success: function (response) {
                // Do what u want after success
                scrollmain.scrollTo(0, 0);
                $(".sccontact-hero").addClass("hidden");
                $(".sccontact-success").addClass("show");
              },
              error: function () {
                alert("Opps. Something went wrongs"); 
                // console.log("error");
              },
            });
          } else {
            if (!successRecaptcha) {
              alert('Please check reCaptcha');
            }
            return false;
          }
          return false;
        });
        
      }
      contactEvent();
    }
  }
  gsap.set('.logo-dur-outer', {
    background: 'conic-gradient(rgba(256, 256, 256, 100) 0%, rgba(256,256,256, 0.1) 0%)',
  })
  gsap.to('.logo-dur-outer', {
    background: 'conic-gradient(rgba(256, 256, 256, 100) 100%, rgba(256,256,256, 0.1) 100%)',
    duration: 1,
  })
};
mainScript();