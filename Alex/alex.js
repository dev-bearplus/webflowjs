const mainScript = () => {
  window.scrollTo(0, 0);
  let timeShow = 800;
  gsap.registerPlugin(ScrollTrigger);
  //Utils
  const parseRem = (input) => {
    return (input / 10) * parseFloat($("html").css("font-size"));
  };
  //End Utils

  $("html").css("scroll-behavior", "auto");
  $("html").css("height", "auto");

  let lenis = new Lenis({});

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  lenis.on("scroll", function (inst) {
    if (inst.scroll > $(".header").height() * 0.75) {
      console.log(inst.direction)
      if (inst.direction >= 1) {
        $(".header").addClass("on-hide");
      } else if(inst.direction<=-1 ) {
        $(".header").removeClass("on-hide");
      }
      $(".header").addClass("on-scroll");
    } else {
      $(".header").removeClass("on-scroll");
      $(".header").removeClass("on-hide");
    }
  });

  $(".header-toggle").on("click", function (e) {
    e.preventDefault();
    if ($(this).hasClass("active")) {
      $(".header").removeClass("on-open");
      $(".header-toggle, .header-menu").removeClass("active");
    } else {
      $(".header").addClass("on-open");
      $(".header-toggle, .header-menu").addClass("active");
    }
  });
  function debounce(func, delay = 100) {
    let timer;
    return function (event) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, delay, event);
    };
  }
  function loadVideoIframe(className){
    lenis.on('scroll',function(inst){
      if(inst.scroll>0){
      $(className).each(function() {
        var iframe = $(this);
        if (iframe.attr('data-src')) {
            iframe.attr('src', iframe.attr('data-src'));
            iframe.removeAttr('data-src');
        }
    });
  }
    })
   
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

  refreshOnBreakpoint();
  function updateCounter(element) {
    console.log("true");
    let counter = 0;
    const targetNumber = parseInt(element.textContent);
    console.log(targetNumber);
    const increment = targetNumber / 100;
    const counting = setInterval(() => {
      if (counter < targetNumber) {
        counter += increment;
        element.textContent = Math.floor(counter);
      } else {
        clearInterval(counting);
        element.textContent = targetNumber;
      }
    }, 10);
  }
  function startCountersWhenVisible() {
    const counterElements = document.querySelectorAll(".txt-counter-number");
    console.log(counterElements);
    if (counterElements.length > 0) {
      function getElementPosition(element) {
        return element.getBoundingClientRect().top;
      }
      function isElementInViewport(element) {
        return getElementPosition(element) <= window.innerHeight;
      }

      counterElements.forEach(function (element) {
        if (isElementInViewport(element)) {
          updateCounter(element);
        } else {
          window.addEventListener("scroll", function () {
            if (isElementInViewport(element)) {
              updateCounter(element);
              window.removeEventListener("scroll", arguments.callee);
            }
          });
        }
      });
    }
  }
  function replaceHyphenWithSpan(className) {
    $(className).html(function (index, oldHtml) {
      return oldHtml.replaceAll("-", "<span>-</span>");
    });
  }
  function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
  }
  function setSessionCookie(name, value) {
    document.cookie =
      name + "=" + (value ? "true" : "false") + "; path=/; expires=0";
  }
  function getSessionCookie(name) {
    // Get all cookies and split them into an array
    let cookies = document.cookie.split(";");

    // Loop through each cookie
    for (let i = 0; i < cookies.length; i++) {
      // Trim any leading spaces from the cookie name
      let cookie = cookies[i].trim();

      // If the cookie starts with the desired name
      if (cookie.startsWith(name + "=")) {
        // Return the value of the cookie
        return cookie.substring(name.length + 1) === "true";
      }
    }

    // Return false if the cookie was not found
    return false;
  }

  function popupBook() {
    let popupShow = getSessionCookie("popupShow");
    if (!popupShow) {
      setTimeout(() => {
        $(".popup-book").addClass("active");
        // set session storage flase
        setSessionCookie("popupShow", true);
        popupShow = true;
      }, 3000);
    }
    $(".popup-book .popup-book-close-wrap").on("click", function () {
      $(".popup-book").removeClass("active");
    });
    $(".popup-book-btn").on("click", function (event) {
      event.preventDefault(); // Ngăn chặn hành vi mặc định của form

      let email = $(".popup-book #your-email").val().trim();
      let name = $(".popup-book #your-name").val().trim();
      let isValidate = false;
      console.log(email);
      if (email == "") {
        isValidate = true;
        $(".popup-form-email-error-txt").show(500);
        $(".popup-form-email-error-format").hide(500);
      } else if (!validateEmail(email)) {
        isValidate = true;
        $(".popup-form-email-error-txt").hide(500);
        $(".popup-form-email-error-format").show(500);
      } else {
        $(".popup-form-email-error-txt").hide(500);
        $(".popup-form-email-error-format").hide(500);
      }
      if (name == "") {
        isValidate = true;
        $(".popup-form-name-txt").show(500);
      } else {
        $(".popup-form-name-txt").hide(500);
      }
      if (!isValidate) {
        $(this).find(".popup-book-btn-txt").text("Please wait...");
        setTimeout(() => {
          $(this).find(".popup-book-btn-txt").text("Download e-book");
        }, 1500);
        fetch("https://app.convertkit.com/forms/6758910/subscriptions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api_key: "1YFL5C61nkwih97lyC_8og",
            email_address: email,
            first_name: name,
          }),
        })
          .then((response) => {
            // Ghi lại phản hồi đầy đủ để debug
            console.log("Response:", response);
            return response;
          })
          .then((data) => {
            if (data.status == 200) {
              $(".popup-book-form").hide(500);
              $(".popup-form-success-txt").show(500);
              console.log("Subscriber added successfully!");
            } else {
              // Xử lý lỗi
              console.error("Error adding subscriber:", data);
            }
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      }
    });
  }
  popupBook();
  const SCRIPT = {};

  function homeTestiHover() {
    let $originalListTestiLeft = $(".home-testi-cms.left .home-testi-list");
    let $clonedListTestiLeft = $originalListTestiLeft.clone();
    $(".home-testi-cms.left").append($clonedListTestiLeft);

    let $originalListTestiRight = $(".home-testi-cms.right .home-testi-list");
    let $clonedListTestiRight = $originalListTestiRight.clone();
    $(".home-testi-cms.right").append($clonedListTestiRight);
    $(".home-testi-list").addClass("anim");

    let arrayColor = ["#00D9C080", "#1789FC80", "#F9C80E80", "#F8662480"];
    let lastColor = 0;
    let slides = $(".home-testi-cms .home-testi-item");
    slides.on("pointerenter", function (e) {
      let randomColor = arrayColor[lastColor];
      $(this).css({
        "background-color": randomColor,
        "border-color": randomColor,
      });
      if (lastColor == arrayColor.length - 1) {
        lastColor = 0;
      } else {
        lastColor++;
      }
    });
    slides.on("pointerleave", function (e) {
      $(this).css({
        "background-color": "",
        "border-color": "",
      });
    });
    $(".home-testi-cms.left").on("pointerenter", function (e) {
      gsap.to($(this).find(".home-testi-item"), {
        x: -parseRem(30),
        duration: 1,
        ease: "power2.out",
      });
    });
    $(".home-testi-cms.left").on("pointerleave", function (e) {
      gsap.to($(this).find(".home-testi-item"), {
        x: 0,
        duration: 1,
        ease: "none",
      });
    });
    $(".home-testi-cms.right").on("pointerenter", function (e) {
      gsap.to($(this).find(".home-testi-item"), {
        x: parseRem(30),
        duration: 1,
        ease: "power2.out",
      });
    });
    $(".home-testi-cms.right").on("pointerleave", function (e) {
      gsap.to($(this).find(".home-testi-item"), {
        x: 0,
        duration: 1,
        ease: "none",
      });
    });
  }
  function homeTesti() {
    // swiper mobile
    if ($(window).width() < 768 && $(".myswiper").length > 0) {
      let swiper = new Swiper(".myswiper ", {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        speed: 9000,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
      });
    }

    if ($(window).width() > 767) {
      gsap.set(".home-testi-list.left, .home-testi-list.right", {
        "pointer-events": "none",
      });
      gsap.set(".home-testi-list.left .home-testi-item", {
        xPercent: 40,
        autoAlpha: 0,
      });
      gsap.set(".home-testi-list.right .home-testi-item", {
        xPercent: -40,
        autoAlpha: 0,
      });

      let tlTesti = gsap.timeline({
        scrollTrigger: {
          trigger: ".home-testi-main",
          start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
        },
        onComplete: () => {
          gsap.set(".home-testi-list.left, .home-testi-list.right", {
            "pointer-events": "auto",
          });
        },
      });
      tlTesti
        .to(".home-testi-list.left .home-testi-item", {
          xPercent: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power1.inOut",
        })
        .to(
          ".home-testi-list.right .home-testi-item",
          {
            xPercent: 0,
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power1.inOut",
          },
          "<=.2"
        );
    }
    const titleFea = new SplitType($(".home-testi-fea-title"), {
      wordClass: "split-word",
      types: "words",
    });
    gsap.set(titleFea.words, { opacity: 0, yPercent: 20 });
    gsap.set(".home-testi-fea-item", { opacity: 0, yPercent: 20 });

    let tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".home-testi-fea",
        start: $(window).width() > 767 ? "top top+=65%" : "top bottom-=30%",
      },
      onComplete: () => {
        SplitType.revert(".home-testi-fea-title");
      },
    });
    tl2
      .to(titleFea.words, {
        yPercent: 0,
        stagger: 0.04,
        duration: 0.3,
        opacity: 1,
        ease: "power1.out",
      })
      .to(
        ".home-testi-fea-item",
        {
          yPercent: 0,
          stagger: 0.06,
          duration: 0.8,
          opacity: 1,
          ease: "power1.out",
          clearProps: "all",
        },
        "<=.1"
      );
  }
  function animCTA() {
    if($(window).width()>991){
    const homeTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".home-cta",
        start: "top bottom",
        end: "bottom top",
        once: true,
        onEnter: () => {
          setup();
        },
      },
    });
  }
  else{
        setup();
  }
    function setup() {
      const title = new SplitType($(".home-cta-title"), {
        wordClass: "split-word",
        types: "words",
      });
      const sub = new SplitType($(".home-cta-sub"), {
        wordClass: "split-word",
        types: "words",
      });
      gsap.set(title.words, { opacity: 0, yPercent: 60 });
      gsap.set(sub.words, { opacity: 0, yPercent: 100 });
      gsap.set(".home-cta .home-cta-sub-inner .btn", { opacity: 0, y: 40 });

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".heading.h0.home-cta-title",
          start: $(window).width() > 767 ? "top top+=75%" : "top bottom-=35%",
        },
        onComplete: () => {
          SplitType.revert(".home-cta-title, .home-cta-sub");
        },
      });
      tl.to(title.words, {
        yPercent: 0,
        stagger: 0.02,
        duration: 0.8,
        opacity: 1,
        ease: "power1.out",
      })
        .to(
          sub.words,
          {
            yPercent: 0,
            stagger: 0.02,
            duration: 0.8,
            opacity: 1,
            ease: "power1.out",
          },
          ">=-.2"
        )
        .to(
          ".home-cta .home-cta-sub-inner .btn",
          {
            y: 0,
            duration: 0.6,
            opacity: 1,
            ease: "power1.out",
            clearProps: "all",
          },
          "<=.1"
        );
    }
  }
  function animFooter() {
  // $(window).on('load',function(){
  // console.log('khanh')
  // })
    if($(window).width()>991){
    const homeTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".footer",
        start: "top bottom",
        end: "bottom top",
        once: true,
        onEnter: () => {
          setup();
        },
      },
    });
        }
    else{
          setup();
    }
    function setup() {
      const title = new SplitType($(".heading.h5.footer-content-title"), {
        wordClass: "split-word",
        types: "words",
      });
      const listMenu = $(".footer-menu-item");
      // const sub = new SplitType($('.home-cta-sub'), { wordClass: 'split-word', types: 'words' });
      gsap.set(title.words, { opacity: 0, yPercent: 20 });
      // gsap.set(sub.words, { opacity: 0, yPercent: 20 })
      gsap.set(".footer-logo-link", { opacity: 0, y: 40 });
      gsap.set(".footer-input-wrap", { opacity: 0, y: 30 });
      gsap.set(".footer-social-item", { opacity: 0, y: 10 });

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".footer",
          start: $(window).width() > 767 ? "top top+=65%" : "top bottom-=40%",
        },
        onComplete: () => {
          SplitType.revert(".heading.h5.footer-content-title");
        },
      });
      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".footer-menu",
          start: $(window).width() > 767 ? "top top+=65%" : "top bottom-=40%",
        },
      });
      listMenu.each((idx, item) => {
        const number = new SplitType($(item).find(".footer-menu-item-num"), {
          wordClass: "split-word",
          types: "words",
        });
        const title = new SplitType($(item).find(" .heading.h3"), {
          wordClass: "split-word",
          types: "words",
        });
        gsap.set(number.words, { opacity: 0, yPercent: 20 });
        gsap.set(title.words, { opacity: 0, yPercent: 20 });
        gsap.set(".line.footer-menu-item-line", { opacity: 0, y: 10 });
        tl2
          .to(
            number.words,
            {
              yPercent: 0,
              stagger: 0.02,
              duration: 0.3,
              opacity: 1,
              ease: "power1.out",
              onComplete: () => number.revert(),
            },
            `${idx == 0 ? "<=" : ""}${0 + idx * 0.2}`
          )
          .to(
            title.words,
            {
              yPercent: 0,
              stagger: 0.02,
              duration: 0.4,
              opacity: 1,
              ease: "power1.out",
              onComplete: () => title.revert(),
            },
            "<=.1"
          )
          .to(
            ".line.footer-menu-item-line",
            {
              y: 0,
              duration: 0.4,
              opacity: 1,
              ease: "power1.out",
              clearProps: "all",
            },
            "<=.1"
          );
      });
      tl.to(".footer-logo-link", {
        y: 0,
        duration: 0.6,
        opacity: 1,
        ease: "power1.out",
        clearProps: "all",
      })
        .to(
          title.words,
          {
            yPercent: 0,
            stagger: 0.02,
            duration: 0.3,
            opacity: 1,
            ease: "power1.out",
          },
          ">=-.2"
        )
        .to(
          ".footer-input-wrap",
          {
            y: 0,
            duration: 0.3,
            opacity: 1,
            ease: "power1.out",
            clearProps: "all",
          },
          "<=.1"
        )
        .to(".footer-social-item", {
          y: 0,
          duration: 0.3,
          opacity: 1,
          ease: "power1.out",
          stagger: 0.05,
          clearProps: "all",
        });
    }
  }

  function footerForm() {
    $(".footer-input-submit").on("click", (event) => {
      event.preventDefault(); // Ngăn chặn hành vi mặc định của form

      let email = $("#Email-Footer").val().trim();
      let isValidate = false;
      console.log(email);
      if (email == "") {
        isValidate = true;
        $(".footer-form-error-txt").show(500);
        $(".footer-form-error-format").hide(500);
      } else if (!validateEmail(email)) {
        isValidate = true;
        $(".footer-form-error-txt").hide(500);
        $(".footer-form-error-format").show(500);
      } else {
        isValidate = false;
        $(".footer-form-error-txt").hide(500);
        $(".footer-form-error-format").hide(500);
      }
      if (!isValidate) {
        fetch("https://app.convertkit.com/forms/6729264/subscriptions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api_key: "1YFL5C61nkwih97lyC_8og",
            email_address: email,
          }),
        })
          .then((response) => {
            // Ghi lại phản hồi đầy đủ để debug
            console.log("Response:", response);
            return response;
          })
          .then((data) => {
            if (data.status == 200) {
              $(".footer-input-wrap").hide(500);
              $(".footer-form-success-txt").show(500);
              console.log("Subscriber added successfully!");
            } else {
              // Xử lý lỗi
              console.error("Error adding subscriber:", data);
            }
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      }
    });
  }

  function globalScript() {
    if ($(".global-ovelay").length > 0) {
      setTimeout(() => {
        console.log($(".global-ovelay"));
        $(".global-ovelay").addClass("none");
      }, timeShow);
    }
    if ($(".hide-def-div").length > 0) {
      $(".hide-def-div").removeClass("hide-def-div");
    }
    startCountersWhenVisible();
    animCTA();
    animFooter();
    footerForm();
  }

  SCRIPT.homeScript = () => {
    loadVideoIframe('.speaking-vid-source')
    // const video = $(".speaking-vid-source")[0];
    // ScrollTrigger.create({
    //   trigger: '.home-vid-wrap',
    //   start:'top bottom',
    //   onEnter: () => {
    //     video.play();
    //   },
    // })
    // lenis.on("scroll", () => {
    //   const videoTop = $(".speaking-vid-source").offset().top;
    //   const videoBottom = videoTop + $(".speaking-vid-source").height();
    //   const scrollTop = $(window).scrollTop();
    //   const windowBottom = scrollTop + $(window).height();

    //   if (windowBottom > videoTop && scrollTop < videoBottom) {
    //     video.play();
    //   }
    // });
    function homeHero() {
      replaceHyphenWithSpan(".home-hero-sub");
      const title = new SplitType(".home-hero-title", {
        wordClass: "split-word",
        types: "words",
      });
      const sub = new SplitType(".home-hero-sub", {
        wordClass: "split-word",
        types: "words",
      });
      const sublabel = new SplitType(".home-hero-sub-label", {
        wordClass: "split-word",
        types: "words",
      });
      const subtxt = new SplitType(".home-hero-sub-txt", {
        wordClass: "split-word",
        types: "words",
      });

      gsap.set(
        [...title.words, ...sub.words, ...sublabel.words, ...subtxt.words],
        { autoAlpha: 0, yPercent: 20 }
      );
      gsap.set(".home-hero .home-hero-btn", { autoAlpha: 0, y: 30 });
      gsap.set(".home-hero-bg img", { autoAlpha: 0, y: parseRem(30) });
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".main",
          start: "top top+=10%",
        },
        defaults: { ease: "power1.out" },
        onComplete: () => {
          SplitType.revert(
            ".home-hero-title, .home-hero-sub, .home-hero-sub-label, .home-hero-sub-txt"
          );
        },
      });
      tl.to(title.words, {
        yPercent: 0,
        stagger: 0.03,
        duration: 0.5,
        autoAlpha: 1,
        delay: `${(timeShow + 200) / 1000}`,
      })
        .to(
          sub.words,
          { yPercent: 0, stagger: 0.015, duration: 0.3, autoAlpha: 1 },
          "<=.2"
        )
        .to(
          ".home-hero .home-hero-btn",
          { y: 0, duration: 0.4, autoAlpha: 1, clearProps: "all" },
          "<=.2"
        )
        .to(
          ".home-hero-bg img",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            clearProps: "all",
            delay: `${(timeShow + 200) / 1000}`,
          },
          "0"
        )
        .to(
          sublabel.words,
          {
            yPercent: 0,
            stagger: 0.02,
            duration: 0.4,
            autoAlpha: 1,
            delay: `${(timeShow + 200) / 1000}`,
          },
          ".2"
        )
        .to(
          subtxt.words,
          { yPercent: 0, stagger: 0.02, duration: 0.4, autoAlpha: 1 },
          "<=.2"
        );
    }
    function homeVideoHandle() {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".home-vid",
          start: "top bottom",
          endTrigger: ".home-vid-wrap",
          end: "center center",
          scrub: true,
        },
      });
      if ($(window).width() > 767) {
        tl.to(".home-vid-inner", {
          scale: 1,
          borderRadius: parseRem(30),
          ease: "none",
        });
      }
    }
    function homeStatMarquee() {
      if($(window).width()>991){
        ScrollTrigger.create( {
          trigger: ".home-stat",
          start: "top bottom",
          end: "bottom top",
          once: true,
          onEnter: () => {
            setup();
          },
        })
      }
      else{
            setup();
      }
      function setup() {
        let $originalListBrand = $(".home-stat-brand-list");
        let $clonedListBrand = $originalListBrand.clone();
        $(".home-stat-brand-cms").append($clonedListBrand);
        $(".home-stat-brand-list").addClass("anim");

        $(".home-stat-brand-cms").on("pointerenter", function (e) {
          gsap.to(".home-stat-brand-cms", {
            x: -parseRem(30),
            duration: 1.2,
            ease: "power1.out",
          });
        });
        $(".home-stat-brand-cms").on("pointerleave", function (e) {
          gsap.to(".home-stat-brand-cms", {
            x: 0,
            duration: 1.2,
            ease: "none",
          });
        });
      }
    }
    function homeStat() {
      if($(window).width()>991){
      const homeTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".home-stat",
          start: "top bottom",
          end: "bottom top",
          once: true,
          onEnter: () => {
            setup();
          },
        },
      });
    }
    else{
          setup();
    }
      function setup() {
        const title = new SplitType(".home-stat-top-title", {
          wordClass: "split-word",
          types: "words",
        });
        const sub = new SplitType(".home-stat-top-sub", {
          wordClass: "split-word",
          types: "words",
        });
        const itemsub = new SplitType(".home-stat-item-sub", {
          wordClass: "split-word",
          types: "words",
        });
        gsap.set([...title.words, ...sub.words, ...itemsub.words], {
          autoAlpha: 0,
          yPercent: 20,
        });
        gsap.set(".home-stat-top-logo, .home-stat-item-title", {
          autoAlpha: 0,
          yPercent: 30,
        });

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".home-stat-top",
            start: "top top+=65%",
          },
          defaults: { ease: "power1.out" },
          onComplete: () => {
            SplitType.revert(
              ".home-stat-top-title, .home-stat-top-sub, .home-stat-item-sub"
            );
          },
        });
        tl.to(".home-stat-top-logo", {
          yPercent: 0,
          stagger: 0.05,
          duration: 0.2,
          autoAlpha: 1,
          clearProps: "all",
        })
          .to(
            title.words,
            { yPercent: 0, stagger: 0.05, duration: 0.2, autoAlpha: 1 },
            "<=.1"
          )
          .to(
            sub.words,
            { yPercent: 0, stagger: 0.05, duration: 0.2, autoAlpha: 1 },
            "<=.1"
          )
          .to(
            ".home-stat-item-title",
            {
              yPercent: 0,
              stagger: 0.1,
              duration: 0.5,
              autoAlpha: 1,
              clearProps: "all",
            },
            "<=.1"
          )
          .to(
            itemsub.words,
            { yPercent: 0, stagger: 0.04, duration: 0.2, autoAlpha: 1 },
            "<=.1"
          );

        const lable = new SplitType(".home-stat-label-txt", {
          wordClass: "split-word",
          types: "words",
        });
        gsap.set(lable.words, { autoAlpha: 0, yPercent: 20 });
        gsap.set(".home-stat-brand-item", { x: parseRem(30), autoAlpha: 0 });
        let tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: ".home-stat-label",
            start: "top top+=75%",
          },
          defaults: { ease: "power1.out" },
          onComplete: () => {
            SplitType.revert(".home-stat-label-txt");
          },
        });
        tl2
          .to(lable.words, {
            yPercent: 0,
            stagger: 0.05,
            duration: 0.2,
            autoAlpha: 1,
          })
          .to(
            ".home-stat-brand-item",
            {
              x: 0,
              stagger: 0.04,
              duration: 0.5,
              autoAlpha: 1,
              ease: "none",
              clearProps: "all",
            },
            "<=.1"
          );
      }
    }
    function homeQuote() {
     if($(window).width()>991){
      const homeTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".home-quote",
          start: "top bottom",
          end: "bottom top",
          once: true,
          onEnter: () => {
            setup();
          },
        },
      });
     }
    else{
          setup();
    }

      function setup() {
        const title = $(".home-quote-content-txt .heading");
        const infoAuthName = new SplitType(".home-quote-author-name", {
          wordClass: "split-word",
          types: "words",
        });
        const infoAuthSub = new SplitType(".home-quote-author-job", {
          wordClass: "split-word",
          types: "words",
        });

        gsap.set([...infoAuthName.words, ...infoAuthSub.words], {
          opacity: 0,
          yPercent: 20,
        });
        gsap.set(".home-quote-content .ic-quote, .home-quote-logo-wrap", {
          opacity: 0,
          yPercent: 30,
        });
        gsap.set(".home-quote-img-wrap", { autoAlpha: 0, y: -parseRem(30) });

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".home-quote-content-txt ",
            start: $(window).width() > 767 ? "top top+=65%" : "top bottom-=20%",
          },
          onComplete: function () {
            SplitType.revert(
              ".home-quote-author-name, .home-quote-author-job, .home-quote-content-txt .heading, .home-quote-author-name, .home-quote-author-job"
            );
            
          },
        });
        tl.to(".home-quote-img-wrap", {
          y: 0,
          duration: 0.6,
          autoAlpha: 1,
          ease: "power1.out",
          clearProps: "all",
        }).to(
          ".home-quote-content .ic-quote",
          {
            yPercent: 0,
            duration: 0.4,
            opacity: 0.3,
            ease: "power1.out",
            clearProps: "all",
          },
          0.2
        );

        title.each((idx, titleItem) => {
          const title = new SplitType(titleItem, {
            wordClass: "split-word",
            types: "words",
          });
          gsap.set(title.words, { opacity: 0, yPercent: 20 });
          if ($(window).width() > 767) {
            tl.to(
              title.words,
              {
                yPercent: 0,
                stagger: 0.03,
                duration: 0.3,
                opacity: 1,
                ease: "power1.out",
              },
              `<=${idx == 0 ? 0 : idx * 0.3}`
            );
          } else {
            tl.to(
              title.words,
              {
                yPercent: 0,
                stagger: 0.02,
                duration: 0.2,
                opacity: 1,
                ease: "power1.out",
              },
              `<=${idx == 0 ? 0 : idx * 0.3}`
            );
          }
        });
        tl.to(
          ".home-quote-logo-wrap",
          {
            yPercent: 0,
            stagger: 0.01,
            duration: 0.2,
            opacity: 1,
            ease: "power1.out",
            clearProps: "all",
          },
          ">=-.2"
        )
          .to(
            infoAuthName.words,
            {
              yPercent: 0,
              stagger: 0.03,
              duration: 0.2,
              opacity: 1,
              ease: "power1.out",
            },
            "<=.1"
          )
          .to(
            infoAuthSub.words,
            {
              yPercent: 0,
              stagger: 0.03,
              duration: 0.2,
              opacity: 1,
              ease: "power1.out",
            },
            "<=.1"
          );
      }
    }
    function homePain() {
      if($(window).width()>991){
      const homeTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".home-pain",
          start: "top bottom",
          end: "bottom top",
          once: true,
          onEnter: () => {
            setup();
          },
        },
      });
    }
    else{
          setup();
    }
      function setup() {
        const title = new SplitType(".heading.h1.home-pain-title ", {
          wordClass: "split-word",
          types: "words",
        });
        gsap.set(title.words, { autoAlpha: 0, yPercent: 20 });

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".home-pain-title",
            start: $(window).width() > 767 ? "top 65%" : "top bottom-=30%",
          },
          onComplete: () => {
            SplitType.revert(".heading.h1.home-pain-title");
          },
        });

        tl.to(title.words, {
          yPercent: 0,
          stagger: 0.04,
          duration: 0.5,
          autoAlpha: 1,
          ease: "power1.out",
        });

        let tlBoxIcon = gsap.timeline({
          scrollTrigger: {
            trigger: ".home-pain-main",
            start: $(window).width() > 767 ? "top 65%" : "top bottom-=35%",

          },
          onComplete: function () {
            SplitType.revert(
              ".home-pain-main-item-title, .home-pain-main-item-sub"
            );
          },
        });
        let staticItem = $(".home-pain .home-pain-main-item");
        staticItem.each((idx, el) => {
          const titleIcon = new SplitType(
            $(el).find(".home-pain-main-item-title"),
            { wordClass: "split-word", types: "words" }
          );
          const subIcon = new SplitType(
            $(el).find(".home-pain-main-item-sub"),
            { wordClass: "split-word", types: "words" }
          );
          gsap.set([...titleIcon.words, ...subIcon.words], {
            autoAlpha: 0,
            yPercent: 20,
          });
          gsap.set($(el).find(".home-pain-main-item-ic"), {
            autoAlpha: 0,
            y: parseRem(20),
          });
          tlBoxIcon
            .to(
              ".home-pain-main-item-ic",
              {
                y: 0,
                duration: 0.5,
                autoAlpha: 1,
                ease: "power1.out",
                clearProps: "all",
              },
              `${idx == 0 ? 0 : idx * 0.2}`
            )
            .to(
              titleIcon.words,
              {
                yPercent: 0,
                stagger: 0.03,
                duration: 0.2,
                autoAlpha: 1,
                ease: "power1.out",
              },
              "<=.1"
            )
            .to(
              subIcon.words,
              {
                yPercent: 0,
                stagger: 0.03,
                duration: 0.2,
                autoAlpha: 1,
                ease: "power1.out",
              },
              "<=.2"
            );
        });
      }
    }
    function homeSol() {
      // if ($(window).width() > 767) {
      //   let tlImg = gsap.timeline({
      //     scrollTrigger: {
      //       trigger: ".home-sol-bg-wrap",
      //       start: "top bottom",
      //       end: 'bottom top',
      //       scrub: true,
      //     },
      //   })
      //   tlImg.to('.home-sol-img-bg', { y: $('.home-sol-bg-wrap').height() * -.3, ease: 'none' })
      // }
      if($(window).width()>991){
      const homeTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".home-sol",
          start: "top bottom",
          end: "bottom top",
          once: true,
          onEnter: () => {
            setup();
          },
        },
      });
    }
    else{
          setup();
    }
      function setup() {
        replaceHyphenWithSpan(".home-sol-item-list-item-body");
        replaceHyphenWithSpan(".home-sol-item-para");
        replaceHyphenWithSpan(".home-sol-title");
        const title = new SplitType(".home-sol-title", {
          wordClass: "split-word",
          types: "words",
        });
        const sub = new SplitType(".home-sol-sub", {
          wordClass: "split-word",
          types: "words",
        });
        gsap.set([...title.words, ...sub.words], {
          autoAlpha: 0,
          yPercent: 20,
        });
        gsap.set(".home-sol-btn-top", { autoAlpha: 0, y: 40 });

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".home-sol-title",
            start: $(window).width() > 767 ? "top top+=65%" : "top bottom-=30%",
          },
          defaults: { ease: "power1.out" },
          onComplete: () => {
            SplitType.revert(".home-sol-title, .home-sol-sub");
            $(".home-sol-title .span-hl-wrap.span-hl-default").addClass(
              "anim_grow"
            );
          },
        });
        tl.to(title.words, {
          yPercent: 0,
          stagger: 0.04,
          duration: 0.3,
          autoAlpha: 1,
        })
          .to(
            sub.words,
            { yPercent: 0, stagger: 0.02, duration: 0.3, autoAlpha: 1 },
            "<=.2"
          )
          .to(
            ".home-sol-btn-top",
            { y: 0, duration: 0.6, autoAlpha: 1, clearProps: "all" },
            "<=.1"
          );

        let solItems = $(".home-sol-item");
        solItems.each((idx, el) => {
          const titleItem = $(el).find(".home-sol-item-head-title");
          const subItem = new SplitType($(el).find(".home-sol-item-para"), {
            wordClass: "split-word",
            types: "words",
          });
          gsap.set([titleItem, ...subItem.words], {
            autoAlpha: 0,
            yPercent: 20,
          });
          gsap.set($(el).find(".btn-outline.hidden-on-mobile"), {
            autoAlpha: 0,
            y: 20,
          });

          let tlSolItem = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start:
                $(window).width() > 767 ? "top top+=55%" : "top bottom-=30%",
            },
            onComplete: () => {
              // titleItem.revert();
              subItem.revert();
              $(el).addClass("anim_grow");
            },
          });
          tlSolItem.to(titleItem, {
            yPercent: 0,
            stagger: 0.03,
            duration: 0.5,
            autoAlpha: 1,
            ease: "power1.out",
          });
          if ($(window).width() > 767) {
            tlSolItem.to(
              $(el).find(".btn"),
              {
                y: 0,
                duration: 0.5,
                autoAlpha: 1,
                ease: "power1.out",
                clearProps: "all",
              },
              "<=.1"
            );
          }
          tlSolItem.to(
            subItem.words,
            {
              yPercent: 0,
              stagger: 0.03,
              duration: 0.2,
              autoAlpha: 1,
              ease: "power1.out",
            },
            "<=.1"
          );

          let solItems = $(el).find(
            ".home-sol-item-list-item:not(.w-condition-invisible)"
          );
          solItems.each((idxItem, elItem) => {
            const solItemBoxTitle = new SplitType(
              $(elItem).find(".home-sol-item-list-item-title"),
              { wordClass: "split-word", types: "words" }
            );
            let solItemBoxsub;
            let tlSolItemMob = gsap.timeline({
              scrollTrigger: {
                trigger: elItem,
                start:
                  $(window).width() > 767 ? "top top+=55%" : "top bottom-=30%",
              },
              onComplete: () => {
                // titleItem.revert();
                subItem.revert();
                $(el).addClass("anim_grow");
              },
            });
            gsap.set($(elItem).find(".home-sol-item-list-item-num"), {
              autoAlpha: 0,
              yPercent: 20,
            });
            gsap.set(solItemBoxTitle.words, { autoAlpha: 0, yPercent: 20 });
            if ($(window).width() > 767) {
              tlSolItem
                .to(
                  $(elItem).find(".home-sol-item-list-item-num"),
                  {
                    yPercent: 0,
                    duration: 0.3,
                    autoAlpha: 1,
                    ease: "power1.out",
                    clearProps: "opacity",
                  },
                  `${idxItem == 0 ? "<=" : ""}${0 + idxItem * 0.2}`
                )
                .to(
                  solItemBoxTitle.words,
                  {
                    yPercent: 0,
                    duration: 0.8,
                    autoAlpha: 1,
                    ease: "power1.out",
                    onComplete: () => {
                      solItemBoxTitle.revert();
                    },
                  },
                  `<=.1`
                );
              if (
                !$(elItem)
                  .find(".home-sol-item-list-item-body")
                  .hasClass("w-condition-invisible")
              ) {
                solItemBoxsub = new SplitType(
                  $(elItem).find(".home-sol-item-list-item-body"),
                  { wordClass: "split-word", types: "words" }
                );
                gsap.set(solItemBoxsub.words, { autoAlpha: 0, yPercent: 20 });
                tlSolItem.to(
                  solItemBoxsub.words,
                  {
                    yPercent: 0,
                    duration: 0.5,
                    autoAlpha: 1,
                    ease: "power1.out",
                    onComplete: () => {
                      solItemBoxsub.revert();
                    },
                  },
                  "<=.1"
                );
              }
            } else {
              tlSolItemMob
                .to(
                  $(elItem).find(".home-sol-item-list-item-num"),
                  {
                    yPercent: 0,
                    duration: 0.5,
                    autoAlpha: 1,
                    ease: "power1.out",
                    clearProps: "opacity",
                  },
                  `${idxItem == 0 ? "<=" : ""}${0 + idxItem * 0.2}`
                )
                .to(
                  solItemBoxTitle.words,
                  {
                    yPercent: 0,
                    duration: 0.6,
                    autoAlpha: 1,
                    ease: "power1.out",
                    onComplete: () => {
                      solItemBoxTitle.revert();
                    },
                  },
                  `<=.1`
                );
              if (
                !$(elItem)
                  .find(".home-sol-item-list-item-body")
                  .hasClass("w-condition-invisible")
              ) {
                solItemBoxsub = new SplitType(
                  $(elItem).find(".home-sol-item-list-item-body"),
                  { wordClass: "split-word", types: "words" }
                );
                gsap.set(solItemBoxsub.words, { autoAlpha: 0, yPercent: 20 });
                tlSolItemMob.to(
                  solItemBoxsub.words,
                  {
                    yPercent: 0,
                    duration: 0.3,
                    autoAlpha: 1,
                    stagger: 0.02,
                    ease: "power1.out",
                    onComplete: () => {
                      solItemBoxsub.revert();
                    },
                  },
                  "<=.1"
                );
              }
            }
          });
        });
        if ($(window).width() < 767) {
          $(".home-sol-item-btn-mb").each((idx, item) => {
            gsap.from(
              item,
              {
                scrollTrigger: {
                  trigger: item,
                  start: "top bottom-=20%",
                },
                y: 30,
                duration: 0.5,
                autoAlpha: 0,
                ease: "power1.out",
              },
              "<=.1"
            );
          });
        }
      }
    }
    function homeBene() {
      if($(window).width()>991){
      const homeTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".home-bene",
          start: "top bottom",
          end: "bottom top",
          once: true,
          onEnter: () => {
            setup();
          },
        },
      });
    }
    else{
          setup();
    }
      function setup() {
        const title = new SplitType(".home-bene-title", {
          wordClass: "split-word",
          types: "words",
        });
        const sub = new SplitType(".home-bene-sub", {
          wordClass: "split-word",
          types: "words",
        });

        gsap.set([...title.words, ...sub.words], { opacity: 0, yPercent: 20 });
        gsap.set(".home-bene .home-bene-title-wrap .btn", {
          opacity: 0,
          yPercent: 20,
        });
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".home-bene-title-wrap",
            start: $(window).width() > 767 ? "top top+=65%" : "top bottom-=35%",
          },
          onComplete: () => {
            SplitType.revert(".home-bene-title, .home-bene-sub");
            $(".home-bene-title .span-hl-wrap.span-hl-default").addClass(
              "anim_grow"
            );
          },
        });

        tl.to(title.words, {
          yPercent: 0,
          stagger: 0.06,
          duration: 0.6,
          opacity: 1,
          ease: "power1.out",
        })
          .to(
            sub.words,
            {
              yPercent: 0,
              stagger: 0.03,
              duration: 0.2,
              opacity: 1,
              ease: "power1.out",
            },
            ">=-.6"
          )
          .to(
            ".home-bene .home-bene-title-wrap .btn",
            {
              yPercent: 0,
              duration: 0.4,
              opacity: 1,
              ease: "power1.out",
              clearProps: "all",
            },
            "<=.1"
          );

        let tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: ".home-bene-cms",
            start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
            onEnter: () => {
              $(".home-bene-list").css("--before-translate-y", "0");
              $(".home-bene-list").css("--before-opacity", "1");
            },
          },
        });
        tl2.from(".home-bene-item", {
          y: parseRem(60),
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power1.out",
        });
      }
    }
    function homeAbt() {
      if($(window).width()>991){
      const homeTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".home-abt",
          start: "top bottom",
          end: "bottom top",
          once: true,
          onEnter: () => {
            setup();
          },
        },
      });
    }
    else{
          setup();
    }
      function setup() {
        $(".home-abt-sub").text($(".home-abt-sub").text().replace(/-/g, "‑"));
        const title = new SplitType($(".home-abt-title"), {
          wordClass: "split-word",
          types: "words",
        });
        const sub = new SplitType($(".home-abt-sub"), {
          wordClass: "split-word",
          types: "words",
        });
        gsap.set(".home-abt-img", { scale: 0.8, autoAlpha: 0 });
        gsap.set(".home-abt-img img", { scale: 1.2 });

        gsap.set([...title.words, ...sub.words], {
          autoAlpha: 0,
          yPercent: 20,
        });
        gsap.set(".home-abt-content-wrap .btn-outline", {
          autoAlpha: 0,
          y: 40,
        });

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: $(window).width() > 767 ? ".home-abt-img" : ".home-abt",
            start: $(window).width() > 767 ? "top top+=65%" : "top top+=50%",
          },
          onComplete: () => {
            SplitType.revert(".home-abt-sub");
          },
        });
        tl.to(title.words, {
          yPercent: 0,
          stagger: 0.02,
          duration: 0.8,
          autoAlpha: 1,
          ease: "power1.out",
          onComplete: () => {
            SplitType.revert(".home-abt-title");
            $(".home-abt-title .span-hl-wrap.span-hl-default").addClass(
              "anim_grow"
            );
          },
        });
        if ($(window).width() > 767) {
          tl.to(
            ".home-abt-img",
            {
              scale: 1,
              autoAlpha: 1,
              duration: 0.6,
              ease: "power1.out",
              clearProps: "all",
            },
            "<=.4"
          )
            .to(
              ".home-abt-img img",
              {
                scale: 1,
                duration: 0.6,
                ease: "power1.out",
                clearProps: "all",
              },
              "<=0"
            )
            .to(
              sub.words,
              {
                yPercent: 0,
                stagger: 0.02,
                duration: 0.3,
                autoAlpha: 1,
                ease: "power1.out",
              },
              "<=.1"
            )
            .to(
              ".home-abt .btn-outline",
              { y: 0, duration: 0.8, autoAlpha: 1, ease: "power1.out" },
              "<=.7"
            );
        } else {
          tl.to(
            sub.words,
            {
              yPercent: 0,
              stagger: 0.02,
              duration: 0.3,
              autoAlpha: 1,
              ease: "power1.out",
            },
            "<=.1"
          )
            .to(
              ".home-abt .btn-outline",
              {
                y: 0,
                duration: 0.8,
                autoAlpha: 1,
                ease: "power1.out",
                clearProps: "all",
              },
              "<=.4"
            )
            // .from('.btn-meet',{yPercent:30,duration: .8, autoAlpha: 1, ease: "power1.out", clearProps: 'all'})
            .to(
              ".home-abt-img",
              {
                scale: 1,
                autoAlpha: 1,
                duration: 0.6,
                ease: "power1.out",
                clearProps: "all",
              },
              "<=.4"
            )
            .to(
              ".home-abt-img img",
              {
                scale: 1,
                duration: 0.6,
                ease: "power1.out",
                clearProps: "all",
              },
              "<=0"
            );
        }
      }
    }
    function homeTestiTitle() {
      if($(window).width()>991){
      const homeTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".home-testi",
          start: "top bottom",
          end: "bottom top",
          once: true,
          onEnter: () => {
            setup();
          },
        },
      });
    }
    else{
          setup();
      
    }
      function setup() {
        const title = new SplitType($(".home-testi-title"), {
          wordClass: "split-word",
          types: "words",
        });
        const sub = new SplitType($(".home-testi-sub"), {
          wordClass: "split-word",
          types: "words",
        });
        gsap.set([...title.words, ...sub.words], { opacity: 0, yPercent: 20 });

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".home-testi-title-wrap",
            start: $(window).width() > 767 ? "top top+=65%" : "top bottom-=30%",
            // markers:true
          },
          onComplete: () => {
            SplitType.revert(".home-testi-sub");
          },
        });
        tl.to(title.words, {
          yPercent: 0,
          stagger: 0.02,
          duration: 0.3,
          opacity: 1,
          ease: "power1.out",
          onComplete: () => {
            SplitType.revert(".home-testi-title");
            $(".home-testi-title .span-hl-wrap.span-hl-default").addClass(
              "anim_grow"
            );
          },
        })
          .to(
            sub.words,
            {
              yPercent: 0,
              stagger: 0.02,
              duration: 0.3,
              opacity: 1,
              ease: "power1.out",
            },
            "<=.1"
          )
          .from(
            ".home-testi .btn.hidden-on-desktop",
            { opacity: 0, yPercent: 20 },
            "<=.3"
          );
      }
    }

    homeHero();
    homeVideoHandle();
    homeStatMarquee();
    homeStat();
    homeQuote();
    homePain();
    homeSol();
    homeBene();
    homeAbt();
    homeTestiHover();
    requestAnimationFrame(() => {
      homeTestiTitle();
      homeTesti();
    });
  };
  SCRIPT.speakingScript = () => {
    // const video = $(".speaking-vid-source")[0];
    // ScrollTrigger.create({
    //   trigger: '.home-vid-wrap',
    //   start:'top bottom',
    //   onEnter: () => {
    //     video.play();
    //   },
    // })
    loadVideoIframe('.speaking-vid-source')
    function speakingHero() {
      replaceHyphenWithSpan('.speaking-hero-content-sub')
      const title = new SplitType(".speaking-hero-sub-title", {
        wordClass: "split-word",
        types: "words",
      });
      const sub = new SplitType(".speaking-hero-content-sub", {
        wordClass: "split-word",
        types: "words",
      });

      gsap.set(title.words, { autoAlpha: 0, yPercent: 30 });
      gsap.set(sub.words, { autoAlpha: 0, yPercent: 20 });
      gsap.set(".speaking-hero-content-wrap .btn", { autoAlpha: 0, y: 30 });
      gsap.set(".speaking-hero-bg img", { autoAlpha: 0, y: parseRem(30) });

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".main",
          start: "top top+=10%",
        },
        onComplete: () => {
          SplitType.revert(
            ".speaking-hero-sub-title, .speaking-hero-content-sub"
          );
        },
      });
      tl.to(title.words, {
        yPercent: 0,
        duration: 0.6,
        autoAlpha: 1,
        ease: "power1.out",
        delay: `${(timeShow + 200) / 1000}`,
      })
        .to(
          sub.words,
          {
            yPercent: 0,
            stagger: 0.02,
            duration: 0.3,
            autoAlpha: 1,
            ease: "power1.out",
          },
          "<=.2"
        )
        .to(
          ".speaking-hero-content-wrap .btn",
          { y: 0, duration: 0.5, autoAlpha: 1, ease: "power1.out" },
          "<=.2"
        )
        .to(
          ".speaking-hero-bg img",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            clearProps: "all",
            delay: `${(timeShow + 200) / 1000}`,
          },
          "0"
        );
    }
    function speakingPresentation() {
    if($(window).width()>991){
      const speakingTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".speaking-present",
          start: "top bottom",
          end: "bottom top",
          once: true,
          onEnter: () => {
            setup();
          },
        },
      });
          }
      else{
            setup();
      }
      function setup() {
      if ($(window).width() > 767) {
        let tlImg = gsap.timeline({
          scrollTrigger: {
            trigger: ".speaking-present-top",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
        tlImg.to(".speaking-present-top img", {
          y: $(".speaking-present-top").height() * -0.3,
          ease: "none",
        });
      }

      requestAnimationFrame(() => {
        const title = new SplitType(".content-presentation", {
          wordClass: "split-word",
          types: "words",
        });
        const infoAuthName = new SplitType(".name-auth-presentation", {
          wordClass: "split-word",
          types: "words",
        });
        const infoAuthSub = new SplitType(".sub-auth-presentation", {
          wordClass: "split-word",
          types: "words",
        });

        gsap.set(
          [...title.words, ...infoAuthName.words, ...infoAuthSub.words],
          { autoAlpha: 0, yPercent: 30 }
        );
        gsap.set(
          ".speaking-presentation-wrap .img-quote, .img-auth-presentation",
          { autoAlpha: 0, y: 30 }
        );
        gsap.set(".speaking-present-auth-wrap img", {
          autoAlpha: 0,
          y: parseRem(30),
        });

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".speaking-present-auth-wrap",
            start: $(window).width() > 767 ? "top top+=45%" : "top bottom-=30%",
          },
          onComplete: () => {
            // SplitType.revert('.content-presentation, .name-auth-presentation, .sub-auth-presentation');
          },
        });

        tl.to(".speaking-present-auth-wrap img", {
          y: 0,
          duration: 0.8,
          autoAlpha: 1,
          ease: "power1.out",
          clearProps: "all",
        }).to(
          ".speaking-presentation-wrap .img-quote",
          { y: 0, duration: 0.3, autoAlpha: 0.5, ease: "power1.out" },
          ".2"
        );
        if ($(window).width() > 767) {
          tl.to(
            ".img-auth-presentation",
            {
              y: 0,
              duration: 0.8,
              autoAlpha: 1,
              ease: "power1.out",
              clearProps: "all",
            },
            "<=-.1"
          )
            .to(
              infoAuthName.words,
              {
                yPercent: 0,
                stagger: 0.03,
                duration: 0.6,
                autoAlpha: 1,
                ease: "power1.out",
              },
              "<=0.2"
            )
            .to(
              infoAuthSub.words,
              {
                yPercent: 0,
                stagger: 0.03,
                duration: 0.8,
                autoAlpha: 1,
                ease: "power1.out",
              },
              "<=.1"
            );
        }

        let tlText = gsap.timeline({
          scrollTrigger: {
            trigger: ".img-basic.img-quote",
            start: $(window).width() > 767 ? "top top+=65%" : "top bottom-=30%",
          },
          onComplete: () => {
            SplitType.revert(
              ".content-presentation, .name-auth-presentation, .sub-auth-presentation"
            );
          },
        });
        tlText.to(title.words, {
          yPercent: 0,
          stagger: 0.03,
          duration: 0.3,
          autoAlpha: 1,
          ease: "power1.out",
        });
        if ($(window).width() < 767) {
          tlText
            .to(
              ".img-auth-presentation",
              {
                y: 0,
                duration: 0.3,
                autoAlpha: 1,
                ease: "power1.out",
                clearProps: "all",
              },
              ">=-.2"
            )
            .to(
              infoAuthName.words,
              {
                yPercent: 0,
                stagger: 0.03,
                duration: 0.2,
                autoAlpha: 1,
                ease: "power1.out",
              },
              "<=.1"
            )
            .to(
              infoAuthSub.words,
              {
                yPercent: 0,
                stagger: 0.03,
                duration: 0.2,
                autoAlpha: 1,
                ease: "power1.out",
              },
              "<=.1"
            );
        }
      });
    }
    }
    function speakingEmpower() {
    if($(window).width()>991){
      const speakingTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".speaking-empower",
          start: "top bottom",
          end: "bottom top",
          once: true,
          onEnter: () => {
            setup();
          },
        },
      });
          }
      else{
            setup();
      }
      function setup() {
      const title = new SplitType(".empower-heading", {
        wordClass: "split-word",
        types: "words",
      });
      gsap.set(title.words, { opacity: 0, yPercent: 20 });

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".empower-heading",
          start: $(window).width() > 767 ? "top top+=65%" : "top bottom-=25%",
        },
        onComplete: () => {
          SplitType.revert(".empower-heading");
          $(".empower-heading .span-hl-wrap.span-hl-default").addClass(
            "anim_grow"
          );
        },
      });
      tl.to(title.words, {
        yPercent: 0,
        stagger: 0.05,
        duration: 0.4,
        opacity: 1,
        ease: "power1.out",
      });

      const titleWorkshop = new SplitType(".workshop-heading", {
        wordClass: "split-word",
        types: "words",
      });
      const subWorkshop = new SplitType(".sub-workshop", {
        wordClass: "split-word",
        types: "words",
      });
      gsap.set(titleWorkshop.words, { opacity: 0, yPercent: 20 });
      gsap.set(subWorkshop.words, { opacity: 0, yPercent: 20 });
      gsap.set(".empower-workshop-img-wrap", { scale: 0.8, autoAlpha: 0 });
      gsap.set(".empower-workshop-img-wrap img", { scale: 1.2 });

      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".workshop-heading",
          start: $(window).width() > 767 ? "top top+=65%" : "top bottom-=25%",
        },
        onComplete: () => {
          SplitType.revert(".workshop-heading, .sub-workshop");
        },
      });
      tl2
        .to(".empower-workshop-img-wrap", {
          scale: 1,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power1.out",
        })
        .to(
          ".empower-workshop-img-wrap img",
          { scale: 1, duration: 0.6, ease: "power1.out" },
          "<=0"
        )
        .to(
          titleWorkshop.words,
          {
            yPercent: 0,
            stagger: 0.03,
            duration: 0.6,
            opacity: 1,
            ease: "power1.out",
          },
          "<=.1"
        )
        .to(
          subWorkshop.words,
          {
            yPercent: 0,
            stagger: 0.02,
            duration: 0.3,
            opacity: 1,
            ease: "power1.out",
          },
          "<=.2"
        );

      const titleTalking = new SplitType(".empower-talking-heading", {
        wordClass: "split-word",
        types: "words",
      });
      const subTalking = new SplitType(".speaking-talking-sub", {
        wordClass: "split-word",
        types: "words",
      });
      gsap.set(titleTalking.words, { opacity: 0, yPercent: 20 });
      gsap.set(subTalking.words, { opacity: 0, yPercent: 20 });
      gsap.set(".empower-talking-img-wrap", { scale: 0.8, autoAlpha: 0 });
      gsap.set(".empower-talking-img-wrap img", { scale: 1.2 });

      let tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: ".empower-talking-heading",
          start: $(window).width() > 767 ? "top top+=65%" : "top bottom-=25%",
        },
        onComplete: () => {
          SplitType.revert(".empower-talking-heading, .speaking-talking-sub");
        },
      });
      tl3
        .to(".empower-talking-img-wrap", {
          scale: 1,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power1.out",
        })
        .to(
          ".empower-talking-img-wrap img",
          { scale: 1, duration: 0.6, ease: "power1.out" },
          "<=0"
        )
        .to(titleTalking.words, {
          yPercent: 0,
          stagger: 0.03,
          duration: 0.6,
          opacity: 1,
          ease: "power1.out",
        })
        .to(
          subTalking.words,
          {
            yPercent: 0,
            stagger: 0.02,
            duration: 0.3,
            opacity: 1,
            ease: "power1.out",
          },
          "<=.1"
        );
      }
    }
    function speakingBluePrint() {
    if($(window).width()>991){
      const speakingTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".speaking-blueprint",
          start: "top bottom",
          end: "bottom top",
          once: true,
          onEnter: () => {
            setup();
          },
        },
      });
          }
      else{
            setup();
      }
      function setup() {
      const title = new SplitType(".speaking-blueprint-header-title", {
        wordClass: "split-word",
        types: "words",
      });
      const sub = new SplitType(".speaking-blueprint-header-sub", {
        wordClass: "split-word",
        types: "words",
      });

      gsap.set([...title.words, ...sub.words], { autoAlpha: 0, yPercent: 20 });
      gsap.set(".speaking-blueprint-header .btn", { autoAlpha: 0, y: 20 });

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".speaking-blueprint-header-title",
          start: $(window).width() > 767 ? "top top+=65%" : "top bottom-=25%",
        },
        onComplete: () => {
          SplitType.revert(
            ".speaking-blueprint-header-title, .speaking-blueprint-header-sub"
          );
        },
      });

      tl.to(title.words, {
        yPercent: 0,
        stagger: 0.05,
        duration: 0.6,
        autoAlpha: 1,
        ease: "power1.out",
      })
        .to(
          sub.words,
          {
            yPercent: 0,
            stagger: 0.03,
            duration: 0.3,
            autoAlpha: 1,
            ease: "power1.out",
          },
          "<=.3"
        )
        .to(
          ".speaking-blueprint-header .btn",
          {
            y: 0,
            duration: 0.3,
            autoAlpha: 1,
            ease: "power1.out",
            clearProps: "all",
          },
          "<=.4"
        );

      const item = $(".speaking-blueprint-item");
      item.each((idx, el) => {
        const titleItem = new SplitType(
          $(el).find(".h3.speaking-blueprint-item-title"),
          { wordClass: "split-word", types: "words" }
        );
        const titleItem2 = new SplitType(
          $(el).find(".h6.speaking-blueprint-item-title"),
          { wordClass: "split-word", types: "words" }
        );
        const subItem = new SplitType(
          $(el).find(".speaking-blueprint-item-box-sub"),
          { wordClass: "split-word", types: "words" }
        );
        gsap.set([...titleItem.words, ...subItem.words, ...titleItem2.words], {
          autoAlpha: 0,
          yPercent: 20,
        });

        let tlItem = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: $(window).width() > 767 ? "top top+=65%" : "top bottom-=25%",
          },
          onComplete: () => {
            titleItem2.revert();
            subItem.revert();
          },
        });

        tlItem
          .to(titleItem.words, {
            yPercent: 0,
            stagger: 0.03,
            duration: 0.5,
            autoAlpha: 1,
            ease: "power1.out",
            onComplete: () => {
              titleItem.revert();
              $(el)
                .find(".speaking-blueprint-item-title")
                .addClass("anim_grow");
            },
          })
          .to(
            titleItem2.words,
            {
              yPercent: 0,
              stagger: 0.03,
              duration: 0.5,
              autoAlpha: 1,
              ease: "power1.out",
            },
            "<=.1"
          )
          .to(
            subItem.words,
            {
              yPercent: 0,
              stagger: 0.03,
              duration: 0.3,
              autoAlpha: 1,
              ease: "power1.out",
            },
            "<=.1"
          );
      });
    }
    }
    function speakingCommunity() {
    if($(window).width()>991){
      const speakingTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".speaking-comunity",
          start: "top bottom",
          end: "bottom top",
          once: true,
          onEnter: () => {
            setup();
          },
        },
      });
          }
      else{
            setup();
      }
      function setup() {
      const title = new SplitType(".speaking-comunity-heading", {
        wordClass: "split-word",
        types: "words",
      });
      const sub = new SplitType(".speaking-community-header .txt", {
        wordClass: "split-word",
        types: "words",
      });

      gsap.set(title.words, { opacity: 0, yPercent: 20 });
      gsap.set(sub.words, { opacity: 0, yPercent: 20 });

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".speaking-community",
          start: $(window).width() > 767 ? "top top+=65%" : "top bottom-=25%",
        },
        onComplete: () => {
          SplitType.revert(
            ".speaking-comunity-heading, .speaking-community-header .txt"
          );
          $(".speaking-comunity-heading .span-hl-wrap").addClass("anim_grow");
        },
      });
      tl.to(title.words, {
        yPercent: 0,
        stagger: 0.05,
        duration: 0.6,
        opacity: 1,
        ease: "power1.out",
      }).to(
        sub.words,
        {
          yPercent: 0,
          stagger: 0.03,
          duration: 0.3,
          opacity: 1,
          ease: "power1.out",
        },
        "<=.1"
      );
    }
    }
    function speakingService() {
    if($(window).width()>991){
      const speakingTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".speaking-service",
          start: "top bottom",
          end: "bottom top",
          once: true,
          onEnter: () => {
            setup();
          },
        },
      });
          }
      else{
            setup();
      }
      function setup() {
      const title = new SplitType(".speaking-service-heading", {
        wordClass: "split-word",
        types: "words",
      });
      gsap.set(".speaking-service-item", {
        opacity: 0,
        "pointer-events": "none",
      });
      gsap.set(title.words, { opacity: 0, yPercent: 20 });
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".speaking-service",
          start: $(window).width() > 767 ? "top top+=65%" : "top bottom-=25%",
        },
        onComplete: () => {
          SplitType.revert(".speaking-service-heading");
        },
      });
      tl.to(title.words, {
        yPercent: 0,
        stagger: 0.05,
        duration: 0.6,
        opacity: 1,
        ease: "power1.out",
      }).to(
        ".speaking-service-item",
        {
          stagger: 0.2,
          duration: 0.6,
          opacity: 1,
          ease: "power1.out",
          clearProps: "all",
        },
        "<=.1 "
      );
    }
    }
    function speakingServiceHover() {
    if($(window).width()>991){
      const speakingTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".speaking-service",
          start: "top bottom",
          end: "bottom top",
          once: true,
          onEnter: () => {
            setup();
          },
        },
      });
          }
      else{
            setup();
      }
      function setup() {
      const boxContent = $(".speaking-service-item");
      boxContent.hover(
        function () {
          if ($(this).hasClass("speaking-service1")) {
            boxContent.addClass("speaking-service1-hover");
          } else if ($(this).hasClass("speaking-service2")) {
            boxContent.addClass("speaking-service2-hover");
          } else if ($(this).hasClass("speaking-service3")) {
            boxContent.addClass("speaking-service3-hover");
          }
        },
        function () {
          boxContent.removeClass("speaking-service1-hover");
          boxContent.removeClass("speaking-service2-hover");
          boxContent.removeClass("speaking-service3-hover");
        }
      );
    }
    }
    function speakingVideoHandle() {
    if($(window).width()>991){
      const speakingTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".speaking-vid",
          start: "top bottom",
          end: "bottom top",
          once: true,
          onEnter: () => {
            setup();
          },
        },
      });
          }
      else{
            setup();
      }
      function setup() {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".speaking-vid",
          start: "top bottom",
          endTrigger: ".speaking-vid-wrap",
          end: "center center",
          scrub: true,
        },
      });
      if ($(window).width() > 767) {
        tl.to(".speaking-vid-inner", {
          scale: 1,
          borderRadius: parseRem(30),
          ease: "none",
        });
      }
    }
    }
    speakingHero();
    speakingVideoHandle();
    speakingPresentation();
    speakingEmpower();
    speakingBluePrint();
    homeTestiHover();
    requestAnimationFrame(() => {
      speakingCommunity();
      homeTesti();
    });
    speakingService();
    speakingServiceHover();
  };
  SCRIPT.aboutScript = () => {
    console.log("khanh");
    function aboutHero() {
      const title = new SplitType(".about-hero-sub-title", {
        wordClass: "split-word",
        types: "words",
      });
      const sub = new SplitType(".about-hero-sub", {
        wordClass: "split-word",
        types: "words",
      });

      gsap.set(title.words, { opacity: 0, yPercent: 30 });
      gsap.set(sub.words, { opacity: 0, yPercent: 20 });
      gsap.set(".about-hero-sub-inner .btn", { opacity: 0, y: 30 });
      gsap.set(".about-hero-bg img", { autoAlpha: 0, y: parseRem(30) });

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".main",
          start: "top top+=10%",
        },
        defaults: { ease: "power1.out" },
        onComplete: () => {
          SplitType.revert(".about-hero-sub-title, .about-hero-sub");
        },
      });

      tl.to(title.words, {
        yPercent: 0,
        stagger: 0.04,
        duration: 0.6,
        opacity: 1,
        ease: "power1.out",
        delay: `${(timeShow + 200) / 1000}`,
      })
        .to(
          sub.words,
          {
            yPercent: 0,
            stagger: 0.02,
            duration: 0.5,
            opacity: 1,
            ease: "power1.out",
          },
          "<=.2"
        )
        .to(
          ".about-hero-sub-inner .btn",
          { y: 0, duration: 0.5, opacity: 1, ease: "power1.out" },
          "<=-.2"
        )
        .to(
          ".about-hero-bg img",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            clearProps: "all",
            delay: `${(timeShow + 200) / 1000}`,
          },
          "0"
        );
    }
    function aboutJourney() {
    if($(window).width()>991){
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-journey",
          start: "top bottom",
          end: "bottom top",
          once: true,
          onEnter: () => {
            setup();
          },
        },
      });
          }
      else{
            setup();
      }
      function setup() {
      const title = new SplitType(".about-journey-title", {
        wordClass: "split-word",
        types: "words",
      });
      const sub = new SplitType(".about-journey-content-dec", {
        wordClass: "split-word",
        types: "words",
      });

      gsap.set(title.words, { autoAlpha: 0, yPercent: 20 });
      gsap.set(sub.words, { autoAlpha: 0, yPercent: 20 });
      gsap.set(".about-journey-img-inner", { scale: 0.8, autoAlpha: 0 });
      gsap.set(".about-journey-img-inner img", { scale: 1.2 });

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-journey-content",
          start: $(window).width() > 767 ? "top top+=65%" : "top bottom-=25%",
        },
        onComplete: () => {
          SplitType.revert(".about-journey-content-dec");
        },
      });
      tl.to(".about-journey-img-inner", {
        scale: 1,
        autoAlpha: 1,
        duration: 0.6,
        ease: "power1.out",
        clearProps: "all",
      })
        .to(
          ".about-journey-img-inner img",
          { scale: 1, duration: 0.6, ease: "power1.out", clearProps: "all" },
          "<=0"
        )
        .to(
          title.words,
          {
            yPercent: 0,
            stagger: 0.05,
            duration: 0.6,
            autoAlpha: 1,
            ease: "power1.out",
            onComplete: () => {
              SplitType.revert(".about-journey-title");
              $(".about-journey-title .span-hl-wrap").addClass("anim_grow");
            },
          },
          ".2"
        )
        .to(
          sub.words,
          {
            yPercent: 0,
            stagger: 0.02,
            duration: 0.3,
            autoAlpha: 1,
            ease: "power1.out",
          },
          "<=.5"
        );

      const sub2 = new SplitType(
        ".about-journey-sub .about-journey-sub-content-txt",
        { wordClass: "split-word", types: "words" }
      );
      gsap.set(sub2.words, { autoAlpha: 0, yPercent: 20 });
      gsap.set(".about-journey-sub .about-journey-sub-content-btn", {
        autoAlpha: 0,
        y: 20,
      });

      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-journey-sub",
          start: $(window).width() > 767 ? "top top+=65%" : "top bottom-=35%",
        },
        onComplete: () => {
          SplitType.revert(".about-journey-sub .about-journey-sub-content-txt");
        },
      });
      tl2
        .to(sub2.words, {
          yPercent: 0,
          stagger: 0.02,
          duration: 0.2,
          autoAlpha: 1,
          ease: "power1.out",
        })
        .to(
          ".about-journey-sub .about-journey-sub-content-btn",
          {
            y: 0,
            duration: 0.4,
            autoAlpha: 1,
            ease: "power1.out",
            clearProps: "all",
          },
          ">=-.2"
        );
      }
    }
    function aboutFounder() {
    if($(window).width()>991){
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-fouder",
          start: "top bottom",
          end: "bottom top",
          once: true,
          onEnter: () => {
            setup();
          },
        },
      });
          }
      else{
            setup();
      }
      function setup() {
      const title = new SplitType(
        ".about-fouder-title-wrap .about-fouder-title",
        { wordClass: "split-word", types: "words" }
      );
      const sub1 = new SplitType(".about-fouder-title-wrap .fouder-sub", {
        wordClass: "split-word",
        types: "words",
      });
      const sub2 = new SplitType(".about-fouder-title-wrap .fouder-sub2", {
        wordClass: "split-word",
        types: "words",
      });

      gsap.set(title.words, { autoAlpha: 0, yPercent: 20 });
      gsap.set([sub1.words, sub2.words], { autoAlpha: 0, yPercent: 20 });
      // gsap.set('.about-fouder-content-wrap .btn', { autoAlpha: 0, y: 20 })

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-fouder-title",
          start: $(window).width() > 767 ? "top top+=65%" : "top bottom-=25%",
        },
        onComplete: () => {
          SplitType.revert(
            " .about-fouder-title-wrap .fouder-sub, .about-fouder-title-wrap .fouder-sub2"
          );
        },
      });
      tl.to(title.words, {
        yPercent: 0,
        stagger: 0.04,
        duration: 0.6,
        autoAlpha: 1,
        ease: "power1.out",
        onComplete: () => {
          $(".about-fouder-title .heading .span-hl-wrap").addClass("anim_grow");
        },
      }).to(
        [sub1.words, sub2.words],
        {
          yPercent: 0,
          stagger: 0.02,
          duration: 0.4,
          autoAlpha: 1,
          ease: "power1.out",
        },
        "<=.2"
      );
      if ($(window).width() <= 767) {
        gsap.set(".about-fouder-btn-top", { autoAlpha: 0, y: 20 });

        tl.to(
          ".about-fouder-btn-top",
          {
            y: 0,
            duration: 0.6,
            autoAlpha: 1,
            ease: "power1.out",
            clearProps: "all",
          },
          ">=-.2"
        );
      }

      const sub3 = new SplitType(".txt.txt-content-fouder", {
        wordClass: "split-word",
        types: "words",
      });
      gsap.set(sub3.words, { autoAlpha: 0, yPercent: 20 });
      gsap.set(".about-fouder-content-wrap .btn", { autoAlpha: 0, y: 20 });

      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-fouder-content-wrap",
          start: $(window).width() > 767 ? "top top+=50%" : "top bottom-=25%",
        },
        onComplete: () => {
          SplitType.revert(".txt-content-fouder");
        },
      });
      tl2
        .to(sub3.words, {
          yPercent: 0,
          stagger: 0.02,
          duration: 0.3,
          autoAlpha: 1,
          ease: "power1.out",
        })
        .to(
          ".about-fouder-content-wrap .btn",
          { y: 0, duration: 0.6, autoAlpha: 1, ease: "power1.out" },
          ">=-.2"
        );
      }
    }
    function aboutStory() {
    if($(window).width()>991){
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-story",
          start: "top bottom",
          end: "bottom top",
          once: true,
          onEnter: () => {
            setup();
          },
        },
      });
          }
      else{
            setup();
      }
      function setup() {
      const title = new SplitType(".about-story .title-story", {
        wordClass: "split-word",
        types: "words",
      });
      const sub = new SplitType(".about-story-dec", {
        wordClass: "split-word",
        types: "words",
      });

      gsap.set(title.words, { autoAlpha: 0, yPercent: 20 });
      gsap.set(sub.words, { autoAlpha: 0, yPercent: 20 });
      gsap.set(".about-story .about-story-btn", { autoAlpha: 0, y: 20 });

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-story-title-wrap",
          start: $(window).width() > 767 ? "top top+=65%" : "top bottom-=25%",
        },
        onComplete: () => {
          SplitType.revert(".about-story .title-story, .about-story-dec");
        },
      });
      tl.to(title.words, {
        yPercent: 0,
        stagger: 0.04,
        duration: 0.6,
        autoAlpha: 1,
        ease: "power1.out",
      })
        .to(
          sub.words,
          {
            yPercent: 0,
            stagger: 0.02,
            duration: 0.2,
            autoAlpha: 1,
            ease: "power1.out",
          },
          "<=.2"
        )
        .to(
          ".about-story .about-story-btn",
          {
            y: 0,
            duration: 0.6,
            autoAlpha: 1,
            ease: "power1.out",
            clearProps: "all",
          },
          ">=-.2"
        );

      const sub2 = new SplitType(".about-story-content .txt", {
        wordClass: "split-word",
        types: "words",
      });
      gsap.set(sub2.words, { autoAlpha: 0, yPercent: 20 });
      gsap.set(".about-story-image-wrap", { scale: 0.8, autoAlpha: 0 });
      gsap.set(".about-story-image-wrap img", { scale: 1.2 });

      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-story-content",
          start: $(window).width() > 767 ? "top top+=65%" : "top bottom-=25%",
        },
        onComplete: () => {
          SplitType.revert(".about-story-content .txt");
        },
      });

      tl2
        .to(".about-story-image-wrap", {
          scale: 1,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power1.out",
        })
        .to(
          ".about-story-image-wrap img",
          { scale: 1, duration: 0.6, ease: "power1.out" },
          "<=0"
        )
        .to(
          sub2.words,
          {
            yPercent: 0,
            stagger: 0.02,
            duration: 0.4,
            autoAlpha: 1,
            ease: "power1.out",
          },
          ".2"
        );
      }
    }
    function aboutAchievement() {
    if($(window).width()>991){
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-achievement",
          start: "top bottom",
          end: "bottom top",
          once: true,
          onEnter: () => {
            setup();
          },
        },
      });
          }
      else{
            setup();
      }
      function setup() {
      const title = new SplitType(".about-achievement-title", {
        wordClass: "split-word",
        types: "words",
      });
      const sub = new SplitType(".about-achievenment-sub", {
        wordClass: "split-word",
        types: "words",
      });
      const sub2 = new SplitType(".about-speaker-sub", {
        wordClass: "split-word",
        types: "words",
      });
      gsap.set(title.words, { autoAlpha: 0, yPercent: 20 });
      gsap.set(sub.words, { autoAlpha: 0, yPercent: 20 });
      gsap.set(sub2.words, { autoAlpha: 0, yPercent: 20 });

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-achievement-title",
          start: $(window).width() > 767 ? "top top+=50%" : "top bottom-=25%",
        },
        onComplete: () => {
          SplitType.revert(
            ".about-achievement-title, .about-achievenment-sub, .about-speaker-sub, .about-achievenmet-box-title"
          );
        },
      });

      tl.to(title.words, {
        yPercent: 0,
        stagger: 0.05,
        duration: 0.6,
        autoAlpha: 1,
        ease: "power1.out",
      })
        .to(
          sub.words,
          {
            yPercent: 0,
            stagger: 0.03,
            duration: 0.6,
            autoAlpha: 1,
            ease: "power1.out",
          },
          "<=.1"
        )
        .to(
          sub2.words,
          {
            yPercent: 0,
            stagger: 0.03,
            duration: 0.3,
            autoAlpha: 1,
            ease: "power1.out",
          },
          "<=.7"
        );
      }
    }
    function aboutBrand() {
    if($(window).width()>991){
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-brand",
          start: "top bottom",
          end: "bottom top",
          once: true,
          onEnter: () => {
            setup();
          },
        },
      });
          }
      else{
            setup();
      }
      function setup() {
      const title = new SplitType(".about-brand-title", {
        wordClass: "split-word",
        types: "words",
      });

      gsap.set(".about-brand-item img", { opacity: 0, scale: 0 });
      gsap.set(title.words, { autoAlpha: 0, yPercent: 20 });

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-brand",
          start: $(window).width() > 767 ? "top top+=65%" : "top bottom-=25%",
          onComplete: () => {
            SplitType.revert(".heading.h3.about-brand-title");
          },
        },
      });

      tl.to(title.words, {
        yPercent: 0,
        stagger: 0.05,
        duration: 0.9,
        autoAlpha: 1,
        ease: "power1.out",
      }).to(
        ".about-brand-item img",
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          clearProps: "all",
        },
        "<=.2"
      );
    }
    }

    aboutHero();
    aboutJourney();
    aboutFounder();
    aboutStory();
    aboutAchievement();
    aboutBrand();
  };
  SCRIPT.contactScript = () => {
    function contactHero() {
      const title = new SplitType(".contact-form-header-title", {
        wordClass: "split-word",
        types: "words",
      });
      const sub1 = new SplitType(".contact-form-header-sub1", {
        wordClass: "split-word",
        types: "words",
      });
      const sub2 = new SplitType(".contact-form-header-sub2", {
        wordClass: "split-word",
        types: "words",
      });

      gsap.set(title.words, { autoAlpha: 0, yPercent: 30 });
      gsap.set([sub1.words, sub2.words], { autoAlpha: 0, yPercent: 20 });
      gsap.set(".contact-img-wrap", { autoAlpha: 0, y: 60 });
      gsap.set(".contact-form-main", { autoAlpha: 0, y: 30 });
      gsap.set(".contact-btn-more", { autoAlpha: 0, y: 30 });

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".main",
          start: "top top+=10%",
        },
        onComplete: () => {
          SplitType.revert(
            ".contact-form-header-title, .contact-form-header-sub1, .contact-form-header-sub2"
          );
        },
      });

      tl.to(title.words, {
        yPercent: 0,
        duration: 0.6,
        autoAlpha: 1,
        ease: "power1.out",
        delay: `${(timeShow + 200) / 1000}`,
      })
        .to(
          [sub1.words, sub2.words],
          {
            yPercent: 0,
            stagger: 0.02,
            duration: 0.3,
            autoAlpha: 1,
            ease: "power1.out",
          },
          "<=.2"
        )
        .to(
          ".contact-form-main",
          { autoAlpha: 1, y: 0, duration: 0.8, ease: "power1.out" },
          "<=0"
        )
        .to(
          ".contact-btn-more",
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power1.out" },
          "<=.3"
        )
        .to(
          ".contact-img-wrap",
          { autoAlpha: 1, y: 0, duration: 0.7, ease: "power1.out" },
          "<=0"
        );
    }

    function actionForm() {
      $(".contact-form-input").on("focusin", function () {
        $(this)
          .parent()
          .find(".contact-form-label")
          .addClass("contact-input-focus");
      });

      $(".contact-form-input").on("focusout", function () {
        if (!this.value) {
          $(this)
            .parent()
            .find(".contact-form-label")
            .removeClass("contact-input-focus");
        }
      });
      $(".contact-form-lable-select").on("click", function () {
        $(this)
          .parent()
          .find(".contact-form-select-box-item")
          .toggleClass("active");
        $(this)
          .closest(".contact-form-box-select")
          .find(".contact-form-lable-select-ic")
          .toggleClass("on-select");
      });
      $(".contact-form-select-item").on("click", function () {
        $(this)
          .closest(".contact-form-box-select")
          .find(".contact-form-select-txt")
          .text($(this).text());
        //get input has attr 'khanh'
        $(this)
          .closest(".contact-form-box-select")
          .find(".contact-form-input-hidden")
          .val($(this).text());
        $(this)
          .closest(".contact-form-box-select")
          .find(".contact-form-label")
          .addClass("contact-input-focus");
        console.log($(".contact-form-input-hidden").val());
        $(this)
          .closest(".contact-form-box-select")
          .find(".contact-form-lable-select-ic")
          .removeClass("on-select");

        console.log($(this).text());
        $(this).parent().removeClass("active");
      });
      $(document).on("click", function (event) {
        if (
          !$(event.target).closest(".contact-form-select-box-item").length &&
          !$(event.target).closest(".contact-form-lable-select").length
        ) {
          $(".contact-form-select-box-item").removeClass("active");
        }
      });
    }
    $(".contact-form-success-close").on("click", function () {
      $(".contact-form-success").removeClass("show");
    });
    const formSubmitEvent = (function () {
      const init = ({ onlyWorkOnThisFormName, onSuccess, onFail, onStart }) => {
        $(document).ajaxStart(function () {
          onStart?.();
        });
        $(document).ajaxComplete(function (event, xhr, settings) {
          if (settings.url.includes("https://webflow.com/api/v1/form/")) {
            const isSuccessful = xhr.status === 200;
            const isWorkOnAllForm = onlyWorkOnThisFormName == undefined;
            const isCorrectForm =
              !isWorkOnAllForm &&
              settings.data.includes(
                getSanitizedFormName(onlyWorkOnThisFormName)
              );

            if (isWorkOnAllForm) {
              if (isSuccessful) {
                onSuccess?.();
              } else {
                onFail?.();
              }
            } else if (isCorrectForm) {
              if (isSuccessful) {
                onSuccess?.();
              } else {
                onFail?.();
              }
            }
          }
        });
      };
      function getSanitizedFormName(name) {
        return name.replaceAll(" ", "+");
      }
      return {
        init,
      };
    })();
    formSubmitEvent.init({
      onlyWorkOnThisFormName: "contact form",
      onStart: function () {
        $(".contact-form-box-submit .contact-form-box-submit-title").text(
          "Please wait..."
        );
      },
      onSuccess: () => {
        $(".contact-form-box-submit .contact-form-box-submit-title").text(
          "Send"
        );
        console.log("success");
        $(".contact-form-success").addClass("show");
        setTimeout(() => {
          $(".contact-form-success").removeClass("show");
          $(".contact-form-box-submit .contact-form-box-submit-title").text(
            "Submit"
          );
        }, 6000);
        $(".contact-form-box").find("input, select, textarea").val("");
        $(".contact-form-box").find(".contact-form-select-txt").text("");
      },
      onFail: () => {
        console.log("fail");
      },
    });
    contactHero();
    actionForm();
  };
  lenis.scrollTo(0, {
    duration: 0.001,
    onComplete: () => {
      console.log("first scroll");
      window.scrollTo("0", "0");
      globalScript();
      const pageName = $(".main").attr("name-space");
      if (pageName) {
        SCRIPT[`${pageName}Script`]();
      }
    },
  });
};
window.onload = mainScript;
