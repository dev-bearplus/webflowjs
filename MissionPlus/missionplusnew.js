const mainScript = () => {
  gsap.registerPlugin(ScrollTrigger);

  $("html").css("scroll-behavior", "auto");
  $("html").css("height", "auto");
  function replaceHyphenWithSpan(el) {
    $(el).html(function (index, oldHtml) {
      return oldHtml.replaceAll("-", "<span>-</span>");
    });
  }
  let lenis = new Lenis({});
  function hasReachedTop(element, offset = 0) {
    console.log(element.offset().top);
    const scrollY = window.scrollY || window.pageYOffset;
    console.log(scrollY);
    return scrollY >= element.offset().top - offset;
  }
  function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  const viewport = {
    w: window.innerWidth,
    h: window.innerHeight,
  };
  const pointer = {
    x: $(window).width() / 2,
    y: $(window).height() / 2,
    xNor: $(window).width() / 2 / $(window).width(),
    yNor: $(window).height() / 2 / $(window).height(),
  };
  const xSetter = (el) => gsap.quickSetter(el, "x", `px`);
  const ySetter = (el) => gsap.quickSetter(el, "y", `px`);
  const xGetter = (el) => gsap.getProperty(el, "x");
  const yGetter = (el) => gsap.getProperty(el, "y");
  const lerp = (a, b, t = 0.08) => {
    return a + (b - a) * t;
  };
  function resetScrollPopup() {
    setTimeout(() => {
      $('[data-popup="popup-item"]').animate(
        {
          scrollTop: 0,
        },
        0
      );
    }, 500);
  }
  function setupIframe() {
    let iframes = $("iframe");
    iframes.each(function (idx, item) {
      const src = $(item).attr("data-src");

      // Kiểm tra xem src có chứa "youtube"
      if (src && src.includes("youtube")) {
        $(item).closest(".w-iframe").addClass("iframe-youtube");
      }

      // Gán src mới từ data-src nếu có
      const dataSrc = $(item).attr("data-src");
      if (dataSrc) {
        $(item).attr("src", dataSrc);
      }
    });
  }
  function setupImg() {
    $(".w-richtext-figure-type-image").each((idx, item) => {
      let link = $(item).find("a").attr("href");
      if (link && link.includes("img-logo")) {
        $(item).addClass("img-logo-richtext");
      }
    });
  }

  function isInHeaderCheck(el) {
    const rect = $(el).get(0).getBoundingClientRect();
    const headerRect = $(".header").get(0).getBoundingClientRect();
    return rect.bottom >= 0 && rect.top - headerRect.height <= 0;
  }
  const distance = (x1, y1, x2, y2) => {
    return Math.hypot(x2 - x1, y2 - y1);
  };
  const isTouchDevice = () => {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  };
  window.addEventListener("pageshow", function (event) {
    event.preventDefault();
    var historyTraversal =
      event.persisted ||
      (typeof window.performance != "undefined" &&
        window.performance.navigation.type === 2);
    if (historyTraversal) {
      $(".header-menu-inner").removeAttr("style");
      $(".header-menu-inner").removeClass("active");
      $(".header-lang").removeClass("active");
    }
  });
  function activeItem(elArr, index) {
    elArr.forEach((el, idx) => {
      $(el).removeClass("active").eq(index).addClass("active");
    });
  }
  window.addEventListener("popstate", function (event) {
    location.reload();
  });

  if (!isTouchDevice()) {
    $("html").attr("data-has-cursor", "true");
    window.addEventListener("pointermove", function (e) {
      updatePointer(e);
    });
  } else {
    $("html").attr("data-has-cursor", "false");
    window.addEventListener("pointerdown", function (e) {
      updatePointer(e);
    });
  }
  function updatePointer(e) {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.xNor = (e.clientX / $(window).width() - 0.5) * 2;
    pointer.yNor = (e.clientY / $(window).height() - 0.5) * 2;
    if (cursor.userMoved != true) {
      cursor.userMoved = true;
      cursor.init();
    }
  }
  const parseRem = (input) => {
    return (input / 10) * parseFloat($("html").css("font-size"));
  };
  const lettersAndSymbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  function shuffleChars($chars) {
    // lấy tập ký tự gốc có trong item => array gồm các character khác nhau
    const originalChars = [...new Set($chars.map((i, c) => $(c).text()).get())];

    $chars.each(function(idx, char){
        gsap.killTweensOf(char);
        gsap.fromTo(char,
            { opacity: 1 },
            {
                duration: 0.045,
                innerHTML: () => originalChars[Math.floor(Math.random() * originalChars.length)],
                repeat: 4,
                repeatRefresh: true,
                opacity: 1,
                repeatDelay: 0.02,
                onComplete: () => gsap.set(char, { innerHTML: $(char).data('initial'), delay: 0.03 }),
            }
        );
    });
}


  function initShuffleHover() {
    let hover_shuffle_txt = new SplitType('[data-hover="hover-shuffle"] [data-hover="hover-shuffle-child"]', {types: 'lines, words, chars', lineClass: 'bp-line'});
    $('[data-hover="hover-shuffle"]').each(function () {
      const $el    = $(this);
      const $chars = $el.find('.char');
      $chars.each(function(_,c){
          $(c).data('initial', $(c).text());
      });

      $el.on('mouseenter', function(){
          shuffleChars($chars);
      });
    });
  }
  initShuffleHover();
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }  
  class TriggerSetup {
    constructor(triggerEl) {
      this.tlTrigger;
      this.triggerEl = triggerEl;
    }
    setTrigger(setup) {
      if (viewport.w > 767) {
        this.tlTrigger = gsap.timeline({
          scrollTrigger: {
            trigger: this.triggerEl,
            start: "top bottom+=50%",
            end: "bottom top",
            once: true,
            onEnter: () => setup(),
          },
        });
      } else {
        setup();
      }
    }
  }
  class Loading {
    constructor() {}
    isDoneLoading() {
      return true;
    }
  }
  let load = new Loading();
  class Cursor {
    constructor() {
      this.targetX = pointer.x;
      this.targetY = pointer.y;
      this.userMoved = false;
      xSetter(".cursor-main")(this.targetX);
      ySetter(".cursor-main")(this.targetY);
    }
    init() {
      requestAnimationFrame(this.update.bind(this));
      $(".cursor-main .cursor-inner").addClass("active");
    }
    isUserMoved() {
      return this.userMoved;
    }
    update() {
      if (this.userMoved || load.isDoneLoading()) {
        this.updatePosition();
      }
      requestAnimationFrame(this.update.bind(this));
    }
    updatePosition() {
      this.targetX = pointer.x;
      this.targetY = pointer.y;
      let targetInnerX = xGetter(".cursor-main");
      let targetInnerY = yGetter(".cursor-main");

      if ($("[data-cursor]:hover").length) {
        this.onHover();
      } else {
        this.reset();
      }

      if (
        Math.hypot(this.targetX - targetInnerX, this.targetY - targetInnerY) >
          1 ||
        Math.abs(lenis.velocity) > 0.1
      ) {
        xSetter(".cursor-main")(lerp(targetInnerX, this.targetX, 0.1));
        ySetter(".cursor-main")(
          lerp(targetInnerY, this.targetY - lenis.velocity / 16, 0.1)
        );
      }
      ['blue', 'black'].forEach(color => {
        const inSectionColor = $(`[data-section="${color}"]`).toArray().some(el => this.isMouseInSection(el));
        if(inSectionColor) {
          $('.cursor-inner').addClass(`on-${color}`);
        } else {
          $('.cursor-inner').removeClass(`on-${color}`);
        }
      });
      if ($('[data-cursor="drag"]:hover').length) {
        const midX = viewport.w / 2;
        let controlPrev = $('[data-cursor="drag"]:hover').attr('data-control-prev');
        let controlNext = $('[data-cursor="drag"]:hover').attr('data-control-next');
        if (pointer.x > midX) {
          if ($(`.${controlNext}`).hasClass("swiper-button-disabled")) {
            $(".cursor").removeClass("right").addClass("left");

          } else {
            $(".cursor").removeClass("left").addClass("right");
          }
        } else {
      
          if ($(`.${controlPrev}`).hasClass("swiper-button-disabled")) {
            $(".cursor").removeClass("left").addClass("right");
          } else {
            $(".cursor").removeClass("right").addClass("left");
          }
        }
      } else {
        $(".cursor").removeClass("left right disabled");
      }      
    }
    isMouseInSection(el) {
      const rect = el.getBoundingClientRect();
      return (
        pointer.x >= rect.left &&
        pointer.x <= rect.right &&
        pointer.y >= rect.top &&
        pointer.y <= rect.bottom
      );
    }
    
    onHover() {
      let type = $("[data-cursor]:hover").attr("data-cursor");
      let gotBtnSize = false;
      if ($("[data-cursor]:hover").length) {
        switch (type) {
          case "hidden":
            $(".cursor").addClass("on-hover-hidden");
            break;
          case "arrow":
            $(".cursor").addClass("on-hover-arrow");
            break;
          case "drag":
            $(".cursor").addClass("on-hover-drag");
            break;
          case "txtLink":
            $(".cursor-inner").addClass("on-hover-sm");
            let targetEl;
            if (
              $("[data-cursor]:hover").attr("data-cursor-txtLink") == "parent"
            ) {
              targetEl = $("[data-cursor]:hover").parent();
            } else if (
              $("[data-cursor]:hover").attr("data-cursor-txtLink") == "child"
            ) {
              targetEl = $("[data-cursor]:hover").find(
                "[data-cursor-txtLink-child]"
              );
            } else {
              targetEl = $("[data-cursor]:hover");
            }

            let targetGap = 8;
            if ($("[data-cursor]:hover").attr("data-cursor-txtLink-gap")) {
              targetGap = $("[data-cursor]:hover").attr(
                "data-cursor-txtLink-gap"
              );
            }
            this.targetX =
              targetEl.get(0).getBoundingClientRect().left -
              parseRem(targetGap) -
              $(".cursor-inner.on-hover-sm").width() / 2;
            this.targetY =
              targetEl.get(0).getBoundingClientRect().top +
              targetEl.get(0).getBoundingClientRect().height / 2;
            break;
          default:
            break;
        }
      } else {
        gotBtnSize = false;
      }
    }
    reset() {
      $(".cursor").removeClass("on-hover-hidden");
      $(".cursor").removeClass("on-hover-arrow");
      $(".cursor").removeClass("on-hover-drag");
    }
  }
  let cursor = new Cursor();
  class TriggerSetupHero {
    constructor() {}
    init(play) {
      let tl = gsap.timeline({
        onStart: () => {
          setTimeout(() => play(), viewport.w > 767 ? 2000 : 1200);
        },
      });
    }
  }
  class HomeHero extends TriggerSetupHero {
    constructor() {
      super();
      this.tl = null;
    }
    trigger() {
      this.setup();
      super.init(this.play.bind(this));
    }
    setup() {
      // replaceHyphenWithSpan($(".home-hero-title"));
      new MasterTimeline({
        timeline: this.tl,
        allowMobile: true,
        tweenArr: [
          new FadeSplitText({ el: $(".home-hero-title").get(0), isFast: true, onMask: true, delay: "<=0",}),
          new FadeSplitText({ el: $(".home-hero-sub").get(0), isFast: true, onMask: true, delay: "<=.1",}),
          new FadeIn({el: $(".home-hero-btn"),delay: '<=.1'})
        ],
      });
    }
    play() {
      this.tl.play();
    }
  }
  const homeHero = new HomeHero();
  class HomeTesti extends TriggerSetup {
    constructor(triggerEl) {
      super(triggerEl);
      this.swiperTesti;
    }
    trigger() {
      super.setTrigger(this.setup.bind(this));
      this.interact();
    }
    setup() {
      this.swiperTesti = new Swiper(".home-testi-cms", {
        slidesPerView: 'auto',
        speed: 1000,
        navigation: {
          prevEl: ".home-testi-control-item-prev",
          nextEl: ".home-testi-control-item-next",
        },
        pagination: {
          el: '.home-testi-control-pagi',
          bulletClass: 'home-testi-control-pagi-item',
          bulletActiveClass: 'active',
          clickable: true,
          
      },
      });
    }
    interact() {
      $(document).on("click", (e) =>{
        if ($('.home-testi-cms[data-cursor="drag"]:hover').length) {
          const midX = viewport.w/ 2;
          if ($('.cursor').hasClass('right')) {
            this.swiperTesti.slideNext();
          } 
          else {
            this.swiperTesti.slidePrev();
          }
        }
      });
    }
  }
  const homeTesti = new HomeTesti('.home-testi');
  class Header extends TriggerSetupHero {
    constructor() {
      super();
      this.tl = null;
      this.menuItem = new SplitType(".header-menu-item-txt", {
        types: "lines, words",
        lineClass: "bp-line",
      });
      this.menuTitle = new SplitType(".header-menu-title", {
        types: "lines, words",
        lineClass: "bp-line",
      });
      this.langText = new SplitType(".header-lang-item-txt", {
        types: "lines, words",
        lineClass: "bp-line",
      });
      this.init = false;
      this.debounceTimer = null;
      this.timeDebouce = viewport.w > 991 ? 10 : 20;
    }
    trigger() {
      this.setup();
      super.init(this.play.bind(this));
      this.interact();
    }
    setup() {}
    play() {
      this.tl.play();
    }
    interact() {
      $(".header-menu-item.has-submenu").on("click", function () {
        $(this).toggleClass("active");
      });
      $(document).on("click", function (e) {
        if (!$(e.target).closest(".header-menu-item.has-submenu").length) {
          $(".header-menu-item.has-submenu").removeClass("active");
        }
      });
    }
    toggleColorMode = (color) => {
      let elArr = Array.from($(`[data-section="${color}"]`));
      if (
        elArr.some(function (el) {
          return isInHeaderCheck(el);
        })
      ) {
        $(".header").addClass(`on-${color}`);
      } else if (!$(".header").hasClass("on-show-menu")) {
        $(".header").removeClass(`on-${color}`);

      }
    };
  }
  const header = new Header();
  class Footer extends TriggerSetup {
    constructor(triggerEl) {
      super(triggerEl);
    }
    trigger() {
      super.setTrigger(this.setup.bind(this));
      this.interact();
    }
    setup() {}
    interact() {
      $('.footer-form-input').on('input', function() {
        let val = $(this).val();
        let check = isValidEmail(val);
        if(check){
          $('.footer-form-input-submit').addClass('active');
        }
        else {
          $('.footer-form-input-submit').removeClass('active');
        }
      })
    }
  }
  const footer = new Footer(".footer-wrap");
  const SCRIPT = {
    homeScript: () => {
      homeHero.trigger();
      homeTesti.trigger();
      footer.trigger();
    },
  };
  const initGlobal = () => {
    cursor.init();
    header.trigger();
    const pageName = $(".main").attr("data-barba-namespace");
    if (pageName) {
      SCRIPT[`${pageName}Script`]();
    }
    // header.toggleOnScroll(lenis);
    // header.toggleColorMode('white');
    header.toggleColorMode("blue");
    lenis.on("scroll", function (inst) {
      header.toggleColorMode("blue");
      // header.toggleOnScroll(lenis);
      // header.toggleOnHide(inst);
    });
  };
  if (window.scrollY > 0) {
    lenis.scrollTo(0, {
      duration: 0.001,
      onComplete: () => initGlobal(),
    });
  } else {
    initGlobal();
    ScrollTrigger.refresh();
  }
};
window.onload = mainScript;
