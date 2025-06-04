const mainScript = () => {
  window.scrollTo(0, 0);
  gsap.registerPlugin(ScrollTrigger);

  // import { UniformPlugin } from 'https://cdn.skypack.dev/@shader-art/plugin-uniform';
  //Utils
  const parseRem = (input) => {
    return (input / 10) * parseFloat($("html").css("font-size"));
  };
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= -rect.height &&
      rect.left >= 0 &&
      rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) +
      rect.height &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function clearProps(el) {
    gsap.set(el, { clearProps: "all" });
  }

  //End Utils

  $("html").css("scroll-behavior", "auto");
  $("html").css("height", "auto");

  let lenis = new Lenis({});

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  lenis.on("scroll", function (inst) {
    if (inst.scroll > $(".header").height() * 1.5) {
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
  $(".home-header-toggle").on("click", function () {
    $(".header").toggleClass("active");
    if ($(".header").hasClass("active")) {
      lenis.stop();
    } else {
      lenis.start();
    }
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
          newViewportWidth =
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
          newViewportWidth =
            window.innerWidth || document.documentElement.clientWidth;
          if (newViewportWidth < 992) {
            location.reload();
          }
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
  refreshOnBreakpoint();

  const SCRIPT = {};

  function globalScript() {
    if ($(".hide-def-div").length > 0) {
      $(".hide-def-div").removeClass("hide-def-div");
    }
  }
  function headerScript() {
    const homeHeader = $(".header .container");
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".main",
        start: "top top+=10%",
        once: true,
      },
      defaults: { ease: "power1.out" },
    });
    tl.from(
      homeHeader,
      { yPercent: -100, autoAlpha: 0, duration: 0.8, clearProps: "all" },
      "<=0"
    );
  }
  SCRIPT.homeScript = () => {
    function globalMarquee() {
      let marquee_inner = $(".global-marquee-inner");
      let globalMarquee = $(".global-marquee");

      globalMarquee.each(function (index, item) {
        $(item).append(marquee_inner.clone());
      });

      const tlMarquee = gsap.timeline({
        repeat: -1,
      });
      tlMarquee.to(".global-marquee-inner", {
        xPercent: -100,
        duration: 100,
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

    function homeHero() {
      // if ($('[data-home-var="ver1"]').length) {
      //   const titleTop = new SplitType($(".home-hero-title-top"), {
      //     types: "lines, words",
      //     lineClass: "line",
      //   });
      //   const titleBot = new SplitType($(".home-hero-title-bot"), {
      //     types: "lines, words",
      //     lineClass: "line",
      //   });
      //   gsap.set([...titleTop.lines, ...titleBot.lines], { 'overflow': 'hidden' });
      //   const homeHeroImg = $(".home-hero-img");
      //   const homeHeroTitleTab = $(".home-hero-content-tab-item");
      //   const homeTabItem = $(".home-hero-tab-item-wrap .home-hero-tab-item-ic-list-item");
      //   const homeTabItemTxt = $(".home-hero-tab-content-txt");

      //   gsap.set([...homeHeroImg], {
      //     autoAlpha: 0,
      //     yPercent: 5,
      //   });
      //   gsap.set([...homeHeroTitleTab, ...homeTabItem, ...homeTabItemTxt], {
      //     autoAlpha: 0,
      //     yPercent: 30,
      //   });
      //   let tl = gsap.timeline({
      //     scrollTrigger: {
      //       trigger: ".main",
      //       start: "top top+=10%",
      //       once: true,
      //     },

      //     defaults: { ease: "power1.out" },
      //     onComplete: () => {
      //       SplitType.revert(".home-hero-title-top, .home-hero-title-bot");
      //     },
      //   });
      //   let tl2 = gsap.timeline({
      //     scrollTrigger: {
      //       trigger: ".home-hero-tab-content-txt",
      //       start: "top bottom-=10%",
      //       once: true,
      //     },

      //     defaults: { ease: "power1.out" },
      //     onComplete: () => {
      //       slider();
      //     },
      //   });
      //   tl
      //     .from(titleTop.words, { yPercent: 100, autoAlpha: 0, duration: 1, stagger: 0.03 })
      //     .from(titleBot.words, { yPercent: 70, autoAlpha: 0, duration: 1, stagger: 0.02 }, "<=.2")
      //     .to(homeHeroImg, { yPercent: 0, autoAlpha: 1, duration: 1, clearProps: "all" }, "<=.3")
      //   tl2
      //     .to(homeTabItemTxt, { yPercent: 0, autoAlpha: 1, duration: 0.4, clearProps: "all", })
      //     .to(homeHeroTitleTab, { yPercent: 0, autoAlpha: 1, duration: 0.4, stagger: .04, clearProps: "all", }, "<=.0")
      //     .to(homeTabItem, { yPercent: 0, autoAlpha: 1, duration: 0.6, stagger: {
      //         each: 0.03,
      //         from: 'left',
      //         grid: 'auto',
      //       }, clearProps: "all",});
      // } else if ($('[data-home-var="ver2"]').length) {
      const titleTop = new SplitType($(".home-hero-v2-title-top"), {
        types: "lines, words",
        lineClass: "line",
      });
      const titleBot = new SplitType($(".home-hero-v2-title-bot"), {
        types: "lines, words",
        lineClass: "line",
      });
      gsap.set([...titleTop.lines, ...titleBot.lines], { overflow: "hidden" });

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".main",
          start: "top top+=10%",
          once: true,
        },
        defaults: { ease: "power1.out" },
        onComplete: () => {
          SplitType.revert(".home-hero-v2-title-top, .home-hero-v2-title-bot");
        },
      });
      tl.to(".home-hero-v2-canvas-inner", { autoAlpha: 1, duration: 1 })
        .from(
          titleTop.words,
          { yPercent: 100, autoAlpha: 0, duration: 1, stagger: 0.03 },
          "<=.2"
        )
        .from(
          titleBot.words,
          { yPercent: 70, autoAlpha: 0, duration: 1, stagger: 0.02 },
          "<=.2"
        );

      const homeHeroTitleTab = $(".home-hero-content-tab-item");
      const homeTabItem = $(
        ".home-hero-v2-tab-item-wrap .home-hero-tab-item-ic-list-item"
      );
      const homeTabItemTxt = $(".home-hero-tab-content-txt");
      gsap.set([...homeHeroTitleTab, ...homeTabItemTxt], {
        autoAlpha: 0,
        yPercent: 100,
      });
      gsap.set([...homeTabItem], { autoAlpha: 0, yPercent: 30 });
      let tl2 = gsap.timeline({
        defaults: { ease: "power1.out" },
        onComplete: () => {
          sliderv2();
          $(".home-hero-content-tab-item").eq(0).addClass("active");
        },
      });
      tl2
        .to(
          homeTabItemTxt,
          { yPercent: 0, autoAlpha: 1, duration: 0.4, clearProps: "all" },
          "<=1"
        )
        .to(
          homeHeroTitleTab,
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.06,
            clearProps: "all",
          },
          "<=.2"
        )
        .to(
          homeTabItem,
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.6,
            stagger: {
              each: 0.03,
              from: "left",
              grid: "auto",
            },
            clearProps: "all",
          },
          "<=.1"
        );
      // }

      function slider() {
        let titArray = [];
        $(".home-hero-tab-content-txt > .home-hero-content-tab-item")
          .each(function (index, item) {
            var txt = $(this).text();
            titArray.push(txt);
            this.remove();
          })
          .promise()
          .done(function () {
            $(".home-hero-tab-content-txt").append(
              `<span class="home-hero-content-tab-list"></span>`
            );

            let swiper = new Swiper(".home-hero-tab", {
              loop: true,
              slidesPerView: 1,
              centeredSlides: true,
              centeredSlidesBounds: true,
              simulateTouch: false,
              allowSwipeToNext: false,
              allowSwipeToPrev: false,
              speed: 800,
              autoplay: {
                delay: 5000,
                disableOnInteraction: false,
              },
              effect: "fade",
              fadeEffect: {
                crossFade: true,
              },
              pagination: {
                el: ".home-hero-content-tab-list",
                clickable: "true",
                type: "bullets",
                renderBullet: (index, className) => {
                  let tabItem;
                  if (
                    index != titArray.length - 2 &&
                    index != titArray.length - 1
                  ) {
                    tabItem = `<span class="${className} txt txt-12 txt-med home-hero-content-tab-item home-hero-content-tab-item-comma"><span class="bar"></span><span class="sub-bar"></span><span>${titArray[index]}</span></span>`;
                  } else if (index == titArray.length - 1) {
                    tabItem = `<span class="${className} txt txt-12 txt-med home-hero-content-tab-item home-hero-content-tab-item-last"><span class="bar"></span><span class="sub-bar"></span><span>${titArray[index]}</span></span>`;
                  } else {
                    tabItem = `<span class="${className} txt txt-12 txt-med home-hero-content-tab-item"><span class="bar"></span><span class="sub-bar"></span><span>${titArray[index]}</span></span>`;
                  }
                  return tabItem;
                },
              },
            });
          });
      }
      function sliderv2() {
        let swiper = new Swiper(".home-hero-v2-tab", {
          loop: true,
          slidesPerView: 1,
          speed: 800,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          effect: "fade",
          fadeEffect: {
            crossFade: true,
          },
          on: {
            slideChange: function () {
              $(".home-hero-content-tab-item").removeClass("active");
              $(".home-hero-content-tab-item")
                .eq(this.realIndex)
                .addClass("active");
              // let process =
              //   ((this.realIndex + 1) / (this.slides.length - 1)) * 100 - 100;
              // $(".about-milestone-process-current").css(
              //   "transform",
              //   `translate(${process}%)`
              // );
              console.log(this.realIndex);
            },
          },
        });
        $(".home-hero-content-tab-item").on("click", function () {
          var index = $(this).index();
          // console.log(index)
          swiper.slideToLoop(index);
        });
      }
    }

    function homeAbout() {
      if ($('[data-home-var="ver1"]').length) {
        let tlHomeAbtV1Head = gsap.timeline({
          scrollTrigger: {
            trigger: ".home-about-v1-block",
            start: "top top+=60%",
            end: `top top`,
            scrub: "true",
          },
        });
        tlHomeAbtV1Head
          .to(".home-hero-v2-content", {
            autoAlpha: 0,
            duration: 1,
            ease: "none",
          })
          .to(
            ".swiper.home-hero-v2-tab",
            { autoAlpha: 0, duration: 1, ease: "none" },
            "<=0"
          );

        let allSplitText = [];
        let allItems = $(".home-about-v1-item .txt");
        allItems.each((idx, item) => {
          let splitText = new SplitType(item, {
            types: "lines, words",
            lineClass: "line",
          });
          gsap.set(splitText.words, { autoAlpha: 0 });
          allSplitText.push(splitText);
        });
        let tlHomeAbtV1 = gsap.timeline({
          scrollTrigger: {
            trigger: ".home-about-v1-block",
            start: "top top",
            end: `bottom bottom`,
            scrub: "true",
          },
        });
        tlHomeAbtV1
          .to(allSplitText[0].words, {
            color: "#E7CCFF",
            autoAlpha: 1,
            duration: 1,
            stagger: 0.03,
          })
          .to(allItems[0], { autoAlpha: 1, duration: 0.3 })
          .to(allItems[0], { autoAlpha: 0, duration: 0.6 })
          .to(
            allSplitText[1].words,
            { color: "#E7CCFF", autoAlpha: 1, duration: 1, stagger: 0.03 },
            ">=-.2"
          )
          .to(allItems[1], { autoAlpha: 1, duration: 0.3 })
          .to(allItems[1], { autoAlpha: 0, duration: 0.6 })
          .to(
            allSplitText[2].words,
            { color: "#E7CCFF", autoAlpha: 1, duration: 1, stagger: 0.03 },
            ">=-.2"
          )
          .to(allItems[2], { autoAlpha: 1, duration: 0.3 })
          // .to(allItems[2], { autoAlpha: 0, duration: .6})
          .to(
            allSplitText[2].words,
            { color: "#E7CCFF", autoAlpha: 1, duration: 1, stagger: 0.03 },
            ">=-.2"
          );
        let tlHomeAbtV1Extra = gsap.timeline({
          scrollTrigger: {
            trigger: ".home-about-v1-block",
            start: `bottom bottom`,
            endTrigger: ".home-paper.mod-v1",
            end: `bottom bottom+=50%`,
            scrub: "true",
            //markers: true,
          },
        });
        tlHomeAbtV1Extra.to(allItems[2], {
          filter: "blur(.4rem)",
          autoAlpha: 0,
          scale: 0.8,
          duration: 1,
          ease: "power2.easeIn",
        });
        const textInfor = new SplitType(".home-about-v1-item-show p", {
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
            trigger: ".home-about-v1-item-show",
            start: "top-=70% center+=10%",
            end: "bottom-=60% center+=10%",
            scrub: true,
            onComplete() {
              gsap.set(textInfor.lines, { clearProps: "overflow" });
            },
          },
        });
        gsap.from(textInfor.words, {
          autoAlpha: 0,
          yPercent: 80,
          duration: 0.4,
          stagger: 0.014,
          scrollTrigger: {
            trigger: ".home-paper",
            start: "top bottom-=20%",
            onComplete() {
              gsap.set(textInfor.lines, { clearProps: "overflow" });
            },
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
        gsap.from(textInfor.words, {
          autoAlpha: 0,
          yPercent: 60,
          duration: 0.4,
          stagger: 0.014,
          scrollTrigger: {
            trigger: ".home-about-inner",
            start: "top top+=65%",
            onComplete() {
              gsap.set(textInfor.lines, { clearProps: "overflow" });
            },
          },
        });
      }
    }

    function homePaper() {
      if ($('[data-home-var="ver2"]').length) {
        const $card = $(".home-paper-item");
        let bounds;

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

          // element.style.transform = `
          //   scale3d(1.02, 1.02, 1.02)
          //   rotate3d(
          //     ${center.y / 100},
          //     ${-center.x / 100},
          //     0,
          //     ${Math.log(distance) / 1.7}deg
          //   )
          // `;

          let gradient = {
            value: `
          radial-gradient(
            circle at
            ${center.x * 2 + bounds.width / 2}px
            ${center.y * 2 + bounds.height / 2}px,
            #6f00ff,
            #9f71ff
          )
        `,
          },
            target = element.querySelector(".home-paper-item-bg-hover");

          gsap.to(gradient, {
            value: `
          radial-gradient(
            circle at
            ${center.x * 2 + bounds.width / 2}px
            ${center.y * 2 + bounds.height / 2}px,
            #6f00ff,
            #9f71ff
          )
        `,
            ease: "power1.inOut",
            delay: 0.15,
            onUpdate: () => (target.style.backgroundImage = gradient.value),
          });
        }
        function pickColorLineCard() {
          let $colorLine = document.querySelectorAll(
            ".home-paper-item-line-def-color"
          );

          $colorLine.forEach((item) => {
            if (!item.style.backgroundColor) {
              item.style.display = "none";
            }
          });
        }
        pickColorLineCard();
        setup();
        function setup() {
          const headingLeft = new SplitType($(".home-paper-heading-left"), {
            types: "lines, words",
            lineClass: "line",
          });
          const headingRight = new SplitType(".home-paper-heading-right-txt", {
            types: "lines,words",
            lineClass: "line",
          });

          gsap.set([...headingLeft.lines, ...headingRight.lines], {
            overflow: "hidden",
          });

          gsap.set([...headingLeft.words], {
            yPercent: 40,
            autoAlpha: 0,
          });
          gsap.set([...headingRight.words], {
            yPercent: 100,
            autoAlpha: 0,
          });
          gsap.set([...$card], {
            transformOrigin: "center center",
            y: parseRem(80),
            autoAlpha: 0,
          });

          let tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".home-paper-heading-left",
              start:
                $(window).width() > 768 ? "top bottom-=20%" : "top bottom-=30%",
              once: true,
            },
            defaults: { ease: "power1.out" },
            onComplete: () => {
              SplitType.revert(
                ".home-paper-heading-left, .home-paper-heading-right-txt"
              );
            },
          });

          tl.to(headingLeft.words, {
            yPercent: 0,
            duration: 0.6,
            autoAlpha: 1,
            stagger: 0.05,
          }).to(
            headingRight.words,
            { yPercent: 0, duration: 0.3, autoAlpha: 1, stagger: 0.03 },
            "<=0.1 "
          );
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
              duration: 0.3,
              delay: (idx % ($(window).width() > 768 ? 4 : 3)) * 0.1,
              clearProps: "all",
            });
          });
          function cardInteraction(item) {
            if ($(window).width() > 991) {
              // $card.each((idx, item) => {
              item.addEventListener("mouseenter", () => {
                bounds = item.getBoundingClientRect();
                item.addEventListener("mousemove", function (e) {
                  rotateToMouse(e, item);
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
              });
              // })
            }
          }
        }
      } else if ($('[data-home-var="ver1"]').length) {
        const $card = $(".home-paper-item-v2");

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
          const headingLeft = new SplitType($(".home-paper-heading-left"), {
            types: "lines, words",
            lineClass: "line",
          });
          const headingRight = new SplitType(".home-paper-heading-right-txt", {
            types: "lines,words",
            lineClass: "line",
          });

          gsap.set([...headingLeft.lines, ...headingRight.lines], {
            overflow: "hidden",
          });

          gsap.set([...headingLeft.words], {
            yPercent: 40,
            autoAlpha: 0,
          });
          gsap.set([...headingRight.words], {
            yPercent: 100,
            autoAlpha: 0,
          });
          gsap.set([...$card], {
            transformOrigin: "center center",
            y: parseRem(80),
            autoAlpha: 0,
          });

          let tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".home-paper-heading-left",
              start:
                $(window).width() > 768 ? "top bottom-=20%" : "top bottom-=30%",
              once: true,
            },
            defaults: { ease: "power1.out" },
            onComplete: () => {
              SplitType.revert(
                ".home-paper-heading-left, .home-paper-heading-right-txt"
              );
            },
          });

          tl.to(headingLeft.words, {
            yPercent: 0,
            duration: 0.6,
            autoAlpha: 1,
            stagger: 0.05,
          }).to(
            headingRight.words,
            { yPercent: 0, duration: 0.3, autoAlpha: 1, stagger: 0.03 },
            "<=0.1 "
          );
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
              delay: (idx % ($(window).width() > 768 ? 4 : 3)) * 0.1,
            });
          });
          function cardInteraction(item) {
            if ($(window).width() > 991) {
              const img_bg = $(item).find('.img-bg-cus');
              console.log(item)
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
                gsap.to($(item).find('.img-bg-cus'), {
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
    }

    function homeBlog() {
      const homeBlogSwiper = new Swiper(".home-blog-main", {
        spaceBetween: parseRem(18),
        effect: "coverflow",
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
      gsap.set([...blogTitle.lines], { overflow: "hidden" });

      gsap.set([...blogSubtitle.words, ...blogTitle.words], {
        yPercent: 50,
        autoAlpha: 0,
      });

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".home-blog-heading-subtitle",
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

      tl.to(blogSubtitle.words, {
        yPercent: 0,
        duration: 0.5,
        autoAlpha: 1,
        stagger: 0.03,
      })
        .to(
          blogTitle.words,
          { yPercent: 0, duration: 0.6, autoAlpha: 1, stagger: 0.03 },
          "<=.1"
        )
        .from(
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
      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".home-blog-main",
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
      tl2.from(".home-blog-item-inner", {
        yPercent: 20,
        xPercent: 8,
        duration: 0.8,
        autoAlpha: 0,
        stagger: 0.1,
        clearProps: "all",
      });
    }

    function homeCaseStudy() {
      for (let i = 0; i < 2; i++) {
        let mainChild = $(".home-casestudy-gallery-wrap").children().clone();
        $(".home-casestudy-gallery-wrap").append(mainChild);
        let child = $(".home-casestudy-gallery-thumbs-wrap").children().clone();
        $(".home-casestudy-gallery-thumbs-wrap").append(child);
      }
      let mainSwiper = new Swiper(".home-casestudy-gallery-slider-cms", {
        slidesPerView: 1,
        initialSlide: 9,
        loop: true,
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
        // on:{
        //   realIndexChange: function (swiper) {
        //     $('.home-casestudy-gallery-slider-cms .swiper-slide').removeClass('swiper-item-show');
        //     // $(swiper.slides[swiper.realIndex-1]).addClass('swiper-item-show');
        //     console.log(swiper.realIndex - 2)
        //     if(swiper.realIndex - 2>-1  ){
        //     $('.home-casestudy-gallery-slider-cms .swiper-slide').removeClass('swiper-slide-prev-cus');
        //     $(swiper.slides[swiper.realIndex-1]).addClass('swiper-item-show');
        //       $(swiper.slides[swiper.realIndex - 2]).addClass('swiper-item-show');
        //     }
        //     else{
        //     console.log(swiper.slides.length+swiper.realIndex-2)
        //     $(swiper.slides[swiper.slides.length+swiper.realIndex-1]).addClass('swiper-item-show ');
        //     $(swiper.slides[swiper.slides.length+swiper.realIndex-2 ]).addClass('swiper-item-show');
        //     $(swiper.slides[swiper.slides.length+swiper.realIndex-1]).addClass(' swiper-slide-prev-cus');
        //     }
        //   },
        // },
      });
      // $('.home-casestudy-gallery-slider-cms .swiper-slide-prev').addClass('swiper-item-show');
      // $('.home-casestudy-gallery-slider-cms .swiper-slide').eq(2).addClass('swiper-item-show');

      mainSwiper.detachEvents();

      let thumbSwiper = new Swiper(".home-casestudy-gallery-thumbs-cms", {
        initialSlide: 9,
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
          start: "top bottom-=15% ",
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
    }

    function homeCustomer() {
      // function shuffleArray(array) {
      //   for (let i = array.length - 1; i > 0; i--) {
      //     const j = Math.floor(Math.random() * (i + 1));
      //     [array[i], array[j]] = [array[j], array[i]]; // Swap elements
      //   }
      //   return array;
      // }
      // let marquee_col = $(".customer-marquee-col");
      // let marquee_item = $(".customer-marquee-item");
      // let marquee_arr = [];
      // marquee_item.each(function (index, item) {
      //   marquee_arr.push($(item).clone());
      // });
      // marquee_col.each(function (index, item) {
      //   let marquee_arr_shuff = shuffleArray(marquee_arr);
      //   let listContainer = $(item).find(".customer-marquee-list");
      //   let list1 = listContainer.clone().empty().append(marquee_arr_shuff);
      //   let list2 = list1.clone();
      //   let list3 = list1.clone();
      //   let innerContainer = $(item).find(".customer-marquee-inner");
      //   innerContainer.empty();
      //   $(item).find(".customer-marquee-inner").append(list2).append(list3);
      // });
      let marquee_col = $(".customer-marquee-col");
      marquee_col.each(function (index, item) {
        const width = $(item).find(".customer-marquee-list").width();
        const length = Math.floor($(window).width() / width) + 1;
        const time = $(item).find(".customer-marquee-list").width() / 100;
        console.log(Math.floor($(window).width()));
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
      const headingRightMask = new SplitType(".customer-line", {
        types: "lines",
        lineClass: "line-child",
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
          ...headingRightMask.lines,
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

      tl.to(
        headingLeft.words,
        { yPercent: 0, duration: 0.5, autoAlpha: 1, stagger: 0.03 },
        "<=.3"
      )
        .to(
          headingRightMask.lines,
          { yPercent: 0, duration: 0.6, autoAlpha: 1, stagger: 0.05 },
          "<=.2"
        )
        .to(
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

      tlCustomerMarquee.to(marqueeCol, {
        yPercent: 0,
        duration: 0.7,
        autoAlpha: 1,
        stagger: 0.2,
        clearProps: "all",
      });
    }

    function stopHomeTesti() {
      isRunning = false;
    }
    function homeTestiNew() {
      const width = $(".home-testi-marquee-list").width();
      const length = Math.floor($(window).width() / width) + 1;
      for (var i = 0; i < length; i++) {
        let $originalListBrand = $(".home-testi-marquee-list").eq(0);
        let $clonedListBrand = $originalListBrand.clone();
        $(".home-testi-marquee-inner").append($clonedListBrand);
      }
      // $('.home-testi-marquee-inner').append($clonedListBrand);
      // $('.home-testi-marquee-list').addClass('anim');
      if ($(window).width() < 768) {
        $(".home-testi-slider").addClass("swiper");
        $(".home-testi-slider-list").addClass("swiper-wrapper");
        $(".home-testi-slider-item").addClass("swiper-slide");

        $(
          ".home-testi-slider"
        ).innerHtml += `<div class="swiper-pagination"></div>`;

        let swiper = new Swiper(".home-testi-slider", {
          slidesPerView: "auto",
          grabCursor: true,
          spaceBetween: parseRem(16),
          pagination: {
            el: ".home-testi-slider-pagination",
            clickable: true,
          },
        });
      } else {
        let centerGap =
          ($(window).height() - $(".home-testi-main-outer").height()) / 2;
        let top =
          $(".home-testi-main-outer").offset().top -
          $(".home-testi-wrap").offset().top;
        let topGap = centerGap - top;
        let bot =
          $(".home-testi-service").outerHeight(true) +
          $(".home-testi-marquee").outerHeight(true) -
          centerGap;

        let distance =
          $(".home-testi-slider-list").outerHeight() -
          $(".home-testi-slider").height();
        $(".home-testi").css("top", `${topGap}px`);
        let tlScroll = gsap.timeline({
          scrollTrigger: {
            trigger: ".home-testi-wrap",
            start: `top+=${top - centerGap}px top`,
            end: `bottom-=${bot}px bottom`,
            scrub: true,
          },
        });
        let progDistance =
          $(".home-testi-progress").height() -
          $(".home-testi-progress-inner").height();
        tlScroll
          .to(".home-testi-slider-list", {
            y: -distance,
            ease: "none",
            duration: 1,
          })
          .to(
            ".home-testi-progress-inner",
            { y: progDistance, ease: "none", duration: 1 },
            0
          );

        $(window).on("resize", function () {
          centerGap =
            ($(window).height() - $(".home-testi-main-outer").height()) / 2;
          top =
            $(".home-testi-main-outer").offset().top -
            $(".home-testi-wrap").offset().top;
          topGap = centerGap - top;
          bot =
            $(".home-testi-service").outerHeight(true) +
            $(".home-testi-marquee").outerHeight(true) -
            centerGap;
          $(".home-testi").css("top", `${topGap}px`);
          tlScroll.scrollTrigger.start = `top+=${top - centerGap}px top`;
          tlScroll.scrollTrigger.end = `bottom-=${bot}px bottom`;
          tlScroll.scrollTrigger.refresh();
        });
      }
      const titleHead = new SplitType($(".home-testi-heading"), {
        types: "lines, words",
        lineClass: "line",
      });
      const titleMain = new SplitType($(".home-testi-main-content-txt"), {
        types: "lines, words",
        lineClass: "line",
      });
      const labelMain = $(".home-testi-main-content-ic");
      const labelHead = $(".home-testi-heading-subtitle");
      const testiItem = $(".home-testi-slider-item");
      const infAvt = $(".home-testi-main-content-author-img");
      const infName = $(".home-testi-main-content-author-identity-name");
      const infLabel = $(".home-testi-main-content-author-identity-role-label");
      gsap.set([...titleHead.lines, ...titleMain.lines], {
        overflow: "hidden",
      });
      gsap.set([...labelHead, ...labelMain], {
        autoAlpha: 0,
        yPercent: 15,
      });
      if ($(window).width() > 767) {
        gsap.set([...testiItem], {
          autoAlpha: 0,
          yPercent: 15,
        });
      }
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".home-testi-heading-subtitle",
          start: "top bottom-=10%",
          once: true,
        },
        defaults: { ease: "power1.out" },
        onComplete: () => {
          SplitType.revert(".home-testi-heading");
        },
      });
      tl.to(labelHead, {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.6,
        stagger: 0.06,
        clearProps: "all",
      }).from(
        titleHead.words,
        { yPercent: 40, autoAlpha: 0, duration: 0.6, stagger: 0.06 },
        "<=.2"
      );
      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".home-testi-main-content-ic",
          start: "top bottom-=10%",
          once: true,
        },
        defaults: { ease: "power1.out" },
        onComplete: () => {
          SplitType.revert(".home-testi-main-content-txt");
        },
      });
      tl2
        .to(labelMain, {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.06,
          clearProps: "all",
        })
        .from(
          titleMain.words,
          { yPercent: 50, autoAlpha: 0, duration: 0.6, stagger: 0.02 },
          "<=.2"
        )
        .from(infAvt, {
          yPercent: 50,
          autoAlpha: 0,
          duration: 0.6,
          clearProps: "all",
        })
        .from(
          infName,
          { yPercent: 100, autoAlpha: 0, duration: 0.4, clearProps: "all" },
          "<=.0"
        )
        .from(
          infLabel,
          { yPercent: 100, autoAlpha: 0, duration: 0.4, clearProps: "all" },
          "<=.0"
        );
      if ($(window).width() > 767) {
        tl2.to(
          testiItem,
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1,
            stagger: 0.1,
            clearProps: "all",
          },
          "<=-1"
        );
      }

      const titleHeadService = new SplitType($(".home-testi-service-heading"), {
        types: "lines, words",
        lineClass: "line",
      });
      if ($(window).width() > 767) {
        let tl3 = gsap.timeline({
          scrollTrigger: {
            trigger: ".home-testi-slider-list",
            start: "bottom+=15% bottom",
            once: true,
          },
          defaults: { ease: "power1.out" },
          onComplete: () => {
            SplitType.revert(".home-testi-service-heading");
          },
        });
        let itemService = $(".home-testi-service-item");
        gsap.set([...titleHeadService.lines], { overflow: "hidden" });

        tl3.from(titleHeadService.words, {
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
          tl3
            .from(
              itemIcon,
              { yPercent: 40, autoAlpha: 0, duration: 0.5, clearProps: "all" },
              `<=${idx == 0 ? 0 : idx * -0.3}`
            )
            .from(
              itemTitle,
              { yPercent: 70, autoAlpha: 0, duration: 0.5, clearProps: "all" },
              "<=.1"
            )
            .from(
              itemDesc,
              { yPercent: 50, autoAlpha: 0, duration: 0.5, clearProps: "all" },
              "<=0"
            );
          if (line) {
            tl3.from(line, { autoAlpha: 0, duration: 0.3, clearProps: "all" });
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
            SplitType.revert(".home-testi-service-heading");
          },
        });
        let itemService = $(".home-testi-service-item");
        gsap.set([...titleHeadService.lines], { overflow: "hidden" });
        itemService.each((idx, item) => {
          let tlItem = gsap.timeline({
            scrollTrigger: {
              trigger: $(item),
              start: "bottom bottom-=10%",
              once: true,
            },
            defaults: { ease: "power1.out" },
          });
          const itemIcon = $(item).find(".home-testi-service-item-icon");
          const itemTitle = $(item).find(".home-testi-service-item-title");
          const itemDesc = $(item).find(".home-testi-service-item-subtitle");
          const line = $(".testi-service-line").eq(idx);
          tlItem
            .from(itemIcon, {
              yPercent: 40,
              autoAlpha: 0,
              duration: 0.5,
              clearProps: "all",
            })
            .from(
              itemTitle,
              { yPercent: 30, autoAlpha: 0, duration: 0.5, clearProps: "all" },
              "<=.2"
            )
            .from(
              itemDesc,
              { yPercent: 50, autoAlpha: 0, duration: 0.5, clearProps: "all" },
              "<=.2"
            );
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
      tl4.from(itemLogo, {
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

    function footerForm() {
      $(document).on("submit", "#email-form", function () {
        $("#email-form")[0].reset();
        setTimeout(() => {
          $(".w-form-done").css("display", "none");
        }, 7000);
      });
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
          yPercent: 100,
          autoAlpha: 0,
          duration: 0.3,
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

    homeHero();
    homeAbout();
    homePaper();
    homeCaseStudy();
    homeCustomer();
    homeTestiNew();
    homeBlog();
    globalMarquee();
    footerForm();
    if ($(window).width() < 767) {
      homePaperMob();
    }
  };

  lenis.scrollTo(0, {
    duration: 0.001,
    onComplete: () => {
      console.log("first scroll");
      window.scrollTo("0", "0");
      globalScript();
      headerScript();
      const pageName = $(".main").attr("name-space");
      if (pageName) {
        SCRIPT[`${pageName}Script`]();
      }
    },
  });
};
window.onload = mainScript;
