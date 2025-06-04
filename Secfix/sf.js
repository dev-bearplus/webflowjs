const bpScript = () => {
  console.log("init bp");
  let lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  const parseRem = (input) => {
    return (input / 10) * parseFloat($("html").css("font-size"));
  };
  lenis.on("scroll", function (inst) {
    if (inst.scroll > $(".bp-header").height() * 0.75) {
      if (inst.direction >= 1) {
        $(".bp-header").addClass("bp-on-hide");
      } else {
        $(".bp-header").removeClass("bp-on-hide");
      }
      $(".bp-header").addClass("bp-on-scroll");
    } else {
      $(".bp-header").removeClass("bp-on-scroll");
      $(".bp-header").removeClass("bp-on-hide");
    }
  });
  gsap.registerPlugin(ScrollTrigger);
  $('[data-bp-btn="demo"]').on('click', function (e) {
    e.preventDefault();
    $('.bp-home-hero-img').addClass('bp-demo-ready')
  })
  if ($(window).width() > 767) {
    let stickyTop =
      ($(window).height() - $(".bp-home-fea-illus-list").height()) / 2;
    $(".bp-home-fea-illus-list").css("top", `${stickyTop}px`);
    function activeItem(elArr, index) {
      elArr.forEach((el, idx) => {
        $(el).removeClass("active").eq(index).addClass("active");
      });
    }
    $(".wrapper.hero-wrapper.header-wrapper-v2").css(
      "transition",
      "transform 0.5s ease-in-out"
    );
    ScrollTrigger.create({
      trigger: ".bp-home-fea",
      start: "top top",
      end: "bottom top",
      onEnter() {
        $(".wrapper.hero-wrapper.header-wrapper-v2").css(
          "transform",
          "translateY(-100%)"
        );
        console.log("enter");
      },
      onEnterBack() {
        $(".wrapper.hero-wrapper.header-wrapper-v2").css(
          "transform",
          "translateY(-100%)"
        );
      },
      onLeaveBack() {
        $(".wrapper.hero-wrapper.header-wrapper-v2").css(
          "transform",
          "translateY(0%)"
        );
        console.log("leave back");
      },
      onLeave() {
        console.log("leave");
        $(".wrapper.hero-wrapper.header-wrapper-v2").css(
          "transform",
          "translateY(0%)"
        );
      },
    });
    let allFeaItem = $(".bp-home-fea-tabs-item");
    let elArr = [".bp-home-fea-tabs-item", ".bp-home-fea-illus-item"];
    const allFeaItemLength = elArr.length;
    let distance =
      $(".bp-home-fea-tabs-list").height() - $(".bp-home-fea-tabs").height();
    $(".bp-home-fea-tabs-item").on("click", function () {
      let index = $(this).index();
      console.log(index);
      bpHomeFeaTl.paused(true);
      lenis.scrollTo(
        $(".bp-home-fea-stick").offset().top +
        $(".bp-home-fea-stick").height() * ((index * 1) / 6)
      );
    });
    let bpHomeFeaTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".bp-home-fea-stick",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate(self) {
          let itemIndex = Math.floor(self.progress / (1 / allFeaItem.length));
          //   console.log(self.progress % (1 / allFeaItem.length));
          if (itemIndex < 0) {
            itemIndex = 0;
          } else if (itemIndex > allFeaItem.length - 1) {
            itemIndex = allFeaItem.length - 1;
          }
          activeItem(elArr, itemIndex);
        },
      },
    });
    requestAnimationFrame(() => {
      bpHomeFeaTl
        .to(".bp-home-fea-tabs-list", {
          y: -distance,
          ease: "none",
          duration: 3,
          delay: 1,
        })
        .fromTo(
          ".bp-home-fea-tabs-item .bp-home-fea-tabs-item-line-inner",
          { height: "0%" },
          { height: "100%", ease: "none", duration: 1, stagger: 1 },
          0
        );
    });
  } else {
    $(".bp-home-fea-tabs").addClass("swiper");
    $(".bp-home-fea-tabs-list").addClass("swiper-wrapper");
    $(".bp-home-fea-tabs-item").addClass("swiper-slide");
    var swiperTab = new Swiper(".bp-home-fea-tabs", {
      slidesPerView: 1,
      spaceBetween: 10,
      spaceBetween: parseRem(16),
      on: {
        slideChange: function () {
          let index = this.activeIndex;
          $(".bp-home-fea-illus-item")
            .removeClass("active")
            .eq(index)
            .addClass("active");
          $(".bp-home-fea-tabs-item")
            .removeClass("active")
            .eq(index)
            .addClass("active");
          let process =
            ((this.activeIndex + 1) / this.slides.length) * 100 - 100;
          $(".bp-home-fea-illus-process-current").css(
            "transform",
            `translateX(${process}%)`
          );
          console.log(process);
        },
      },
    });
    let processInit = (1 / (swiperTab.slides.length - 1)) * 100 - 100;
    $(".bp-home-fea-illus-process-current").css(
      "transform",
      `translateX(${processInit}%)`
    );
  }
  let $originalListTestiRight = $(".bp-home-hero-logo-list");
  let $clonedListTestiRight = $originalListTestiRight.clone();

  $(".bp-home-hero-slide-logo").append($clonedListTestiRight);

  $(".bp-home-hero-logo-list").addClass("anim");
  var swiperCard = new Swiper(".bp-home-reason-swiper", {
    slidesPerView: 1,
    spaceBetween: parseRem(20),
    mousewheel: {
      enabled: true,
      forceToAxis: true,
    },
    breakpoints: {
      767: {
        slidesPerView: 2,
        spaceBetween: parseRem(20),
      },
      991: {
        slidesPerView: 3,
        spaceBetween: parseRem(24),
      },
    },
  });
  document.addEventListener("DOMContentLoaded", function () {
    const heroTitle = document.getElementById("hero-title-type");
    const delay = heroTitle.getAttribute("data-delay");
    const colors = heroTitle.getAttribute("data-colors").split(",");
    const words = heroTitle.getAttribute("data-words").split(",");
    $(".bp-header-cta-language").on("click", function () {
      $(".bp-header-cta-language-item.bp-no-active").toggleClass("bp-show");
    });
    $(".bp-header-cta-language-item").on("click", function (e) {
      e.preventDefault();
      Weglot.switchTo($(this).attr('lang'));
      $(".bp-header-cta-language-item.no-active").removeClass("bp-show");
      $(".bp-header-cta-language-item ").addClass("bp-no-active");
      $(this).removeClass("bp-no-active");
      $(this).addClass("bp-active");
      $(".bp-header-cta-language-item.no-active").removeClass("bp-show");
      $('.bp-header-cta-language-en').text('EN')
    });
  });
  $(".bp-home-header-toggle").on("click", function () {
    $(".bp-body").toggleClass("bp-overflow");
    $(this).toggleClass("active");
    $(".bp-header-menu-wrap").toggleClass("active");
  });
  if ($(window).width() < 991) {
    $(".bp-header-menu-wrap .bp-header-menu-item-wrap.bp-has-submenu").on(
      "click",
      function () {
        $(".bp-header-menu-item-submenu-wrap")
          .not($(this).find(".bp-header-menu-item-submenu-wrap"))
          .slideUp()
          .removeClass("active");
        var submenu = $(this).find(".bp-header-menu-item-submenu-wrap");
        submenu.toggleClass("active");
  
        if (!submenu.hasClass("active")) {
          submenu.slideUp();
        } else {
          submenu.slideDown();
        }
      }
    );
  }
  
  
  function AnimPulsing(items, scaleInput, time) {
    items.each((idx, el) => {
      gsap.to(el, {
        scale: scaleInput,
        keyframes: { autoAlpha: [0, 1, 1, 1, 1, 0] },
        duration: time,
        repeat: -1,
        ease: 'none',
        delay: -2 * idx,
      });
    });
  }
  let allItemsAnimInte = $(".bp-home-inte-build-anim-block");
  const waveAnim = () => {
    countWave = 5;
    countWave2 = 7;
    let waveArr = $(".bp-home-inte-build-anim-block").eq(0).clone();
    let waveArr2 = $(".bp-home-start-anim-block").eq(0).clone();
    if(waveArr){
      $(".bp-home-inte-build-anim-block-wrap").html("");
      for (let i = 0; i < countWave; i++) {
        let html = waveArr.clone();
        html.css("animation-delay", `${(-15 / countWave) * i}s`);
        $(".bp-home-inte-build-anim-block-wrap").append(html);
      }
    }
    if(waveArr2){
      $(".bp-home-start-anim-wrap").html("");
      for (let i = 0; i < countWave2; i++) {
        let html2 = waveArr2.clone();
        html2.css("animation-delay", `${(-15 / countWave2) * i}s`);
        $(".bp-home-start-anim-wrap").append(html2);
      }
    }
  }
  waveAnim();
  let allItemsAnimCTA = $(".bp-home-start-anim-block");
  AnimPulsing(allItemsAnimCTA, 3.6, 14);
  $('.bp-btn-cta-ldp').on('click', function(e){
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  })
};

const bpScriptLDP = () => {
 
    const parseRem = (input) => {
      return (input / 10) * parseFloat($("html").css("font-size"));
    };
    $(window).on("scroll", function () {
      var scrollTop = $(this).scrollTop();
      var headerHeight = $(".bp-header").height() * 0.75;
  
      if (scrollTop > headerHeight) {
          if (scrollTop > this.previousScrollTop) {
              $(".bp-header").addClass("bp-on-hide");
          } else {
              $(".bp-header").removeClass("bp-on-hide");
          }
          $(".bp-header").addClass("bp-on-scroll");
      } else {
          $(".bp-header").removeClass("bp-on-scroll");
          $(".bp-header").removeClass("bp-on-hide");
      }
  
      this.previousScrollTop = scrollTop;
  });
  
    // gsap.registerPlugin(ScrollTrigger);
    $('[data-bp-btn="demo"]').on('click', function (e) {
      e.preventDefault();
      $('.bp-home-hero-img').addClass('bp-demo-ready')
    })
    let $originalListTestiRight = $(".bp-home-hero-logo-list");
    let $clonedListTestiRight = $originalListTestiRight.clone();
  
    $(".bp-home-hero-slide-logo").append($clonedListTestiRight);
  
    $(".bp-home-hero-logo-list").addClass("anim");
   
    var swiperCard = new Swiper(".bp-home-reason-swiper", {
      slidesPerView: 1,
      spaceBetween: parseRem(20),
      mousewheel: {
        enabled: true,
        forceToAxis: true,
      },
      breakpoints: {
        767: {
          slidesPerView: 2,
          spaceBetween: parseRem(20),
        },
        991: {
          slidesPerView: 3,
          spaceBetween: parseRem(24),
        },
      },
    });

  function AnimPulsing(items, scaleInput, time) {
    items.each((idx, el) => {
      gsap.to(el, {
        scale: scaleInput,
        keyframes: { autoAlpha: [0, 1, 1, 1, 1, 0] },
        duration: time,
        repeat: -1,
        ease: 'none',
        delay: -2 * idx,
      });
    });
  }
  let allItemsAnimInte = $(".bp-home-inte-build-anim-block");
  const waveAnim = () => {
    countWave = 5;
    countWave2 = 7;
    let waveArr = $(".bp-home-inte-build-anim-block").eq(0).clone();
    let waveArr2 = $(".bp-home-start-anim-block").eq(0).clone();
    if(waveArr){
      $(".bp-home-inte-build-anim-block-wrap").html("");
      for (let i = 0; i < countWave; i++) {
        let html = waveArr.clone();
        html.css("animation-delay", `${(-15 / countWave) * i}s`);
        $(".bp-home-inte-build-anim-block-wrap").append(html);
      }
    }
    if(waveArr2){
      $(".bp-home-start-anim-wrap").html("");
      for (let i = 0; i < countWave2; i++) {
        let html2 = waveArr2.clone();
        html2.css("animation-delay", `${(-15 / countWave2) * i}s`);
        $(".bp-home-start-anim-wrap").append(html2);
      }
    }
  }
  waveAnim();
  let allItemsAnimCTA = $(".bp-home-start-anim-block");
  AnimPulsing(allItemsAnimCTA, 3.6, 14);
  $('.bp-btn-cta-ldp').on('click', function(e){
    e.preventDefault();
    // scroll to Top
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  })  
};
if($('.bp-main').attr('name-space')=='landing-page'){
  console.log('ldp')
  bpScriptLDP()
}
else{
  console.log('no ldp')
  bpScript();
}
