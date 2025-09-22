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
  function multiLineText(el){
    let line = $(el).find('.line');
    let textMapLine = $(el).find('.bp-line');
    let lineClone = line.clone();
    console.log(lineClone)
    if(textMapLine.length >1){
        line.remove();
        textMapLine.each((idx, item) => {
          if(idx == 0){
            $(item).attr('data-cursor-txtLink-child','')
          }
            $(item).css({
                position: 'relative',
                width: 'max-content'
              });
            $(item).append(lineClone.clone());
        })
    }
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
  viewport.w> 991 && initShuffleHover();
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
          // Bên phải -> prev
          $(".cursor").removeClass("left").addClass("right");
          if ($(`.${controlNext}`).hasClass("swiper-button-disabled")) {
            $(".cursor").addClass("disabled");
          } else {
            $(".cursor").removeClass("disabled");
          }
        } else {
          // Bên trái -> next
          $(".cursor").removeClass("right").addClass("left");
      
          if ($(`.${controlPrev}`).hasClass("swiper-button-disabled")) {
            $(".cursor").addClass("disabled");
          } else {
            $(".cursor").removeClass("disabled");
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

            let targetGap = parseRem(8);
            if ($("[data-cursor]:hover").attr("data-cursor-txtLink-gap")) {
              targetGap = $("[data-cursor]:hover").attr(
                "data-cursor-txtLink-gap"
              );
            }
            if ($("[data-cursor]:hover").attr("data-cursor-txtLink-trans")) {
              $('[data-cursor]:hover[data-cursor-txtLink-trans] .txt').css('transform', `translateX(8px)`)
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
      $('[data-cursor-txtLink-trans] .txt').css('transform', 'translateX(0px)')
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
      this.swiperTesti = new Swiper(".home-hero-post-cms", {
        slidesPerView: 1,
        speed: 600,
        navigation: {
          prevEl: ".home-hero-post-control-item-prev",
          nextEl: ".home-hero-post-control-item-next",
        },
        pagination: {
          el: '.home-hero-post-pagi',
          bulletClass: 'home-service-pagi-item',
          bulletActiveClass: 'active',
          clickable: true,  
        },
        breakpoints: {
          991: {
            pagination: {
              el: '.home-hero-post-pagi',
              type: "fraction",
            },
          }
        },
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
      });
      // new MasterTimeline({
      //   timeline: this.tl,
      //   allowMobile: true,
      //   tweenArr: [
      //     new FadeSplitText({ el: $(".home-hero-title").get(0), isFast: true, onMask: true, delay: "<=0",}),
      //     new FadeSplitText({ el: $(".home-hero-sub").get(0), isFast: true, onMask: true, delay: "<=.1",}),
      //     new FadeIn({el: $(".home-hero-btn"),delay: '<=.1'})
      //   ],
      // });
    }
    play() {
      this.tl.play();
    }
  }
  const homeHero = new HomeHero();
  class HomeProduct extends TriggerSetup {
    constructor(triggerEl) {
      super(triggerEl);
    }
    trigger() {
      super.setTrigger(this.setup.bind(this));
      this.interact();
    }
    setup() {
      let tlImg = gsap.timeline({
        scrollTrigger: {
          trigger: '.home-product-img-inner',
          start: "top-=20% center",
          end: "bottom+=20% center",
          scrub: 1,
        },
      });
      viewport.w > 991 && tlImg.fromTo('.home-product-img-inner img', {objectPosition:'0% 0%' }, {objectPosition: '0 100%', duration: .4, ease: 'none'});
    }
    interact() {
    }
  }
  let homeProduct = new HomeProduct('.home-product')
  class HomeService extends TriggerSetup {
    constructor(triggerEl) {
      super(triggerEl);
    }
    trigger() {
      super.setTrigger(this.setup.bind(this));
      this.interact();
    }
    setup() {
      if(viewport.w < 768){
        $('.home-service-cms').addClass('swiper')
        $('.home-service-cms-inner').addClass('swiper-wrapper')
        $('.home-service-item').addClass('swiper-slide')
        let swiperService = new Swiper(".home-service-cms", {
          slidesPerView: 'auto',
          speed: 600,
          pagination: {
            el: '.home-service-pagi',
            bulletClass: 'home-service-pagi-item',
            bulletActiveClass: 'active',
            clickable: true,
          },
        });
      }
    }
    interact() {
    }
  }
  let homeService = new HomeService('.home-service')
  class HomeIndustry extends TriggerSetup {
    constructor(triggerEl) {
      super(triggerEl);
    }
    trigger() {
      super.setTrigger(this.setup.bind(this));
      this.interact();
    }
    setup() {
      $('.home-industry-item').each((idx, item) => {
        let textLabel = idx+1 <=9 ? `0${idx+1}`: idx+1;
        console.log(textLabel)
        $(item).find('.label-txt').text(textLabel)
      })
      if(viewport.w < 768){
        $('.home-industry-cms').addClass('swiper')
        $('.home-industry-list').addClass('swiper-wrapper')
        $('.home-industry-item').addClass('swiper-slide')
        let swiperService = new Swiper(".home-industry-cms", {
          slidesPerView: 'auto',
          speed: 600,
          pagination: {
            el: '.home-industry-pagi',
            bulletClass: 'home-industry-pagi-item',
            bulletActiveClass: 'active',
            clickable: true,
          },
        });
      }
    }
    interact() {
    }
  }
  let homeIndustry = new HomeIndustry('.home-industry')
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
        speed: 600,
        longSwipesRatio : 0,
        threshold: 10,
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
        breakpoints: {
          991: {
            slidesPerView: 2,
              spaceBetween: parseRem(0),
              pagination: {
                el: '.home-testi-control-number',
                type: "fraction",
                renderFraction: function (currentClass, totalClass) {
                  return '<span class="' + currentClass + '"></span>' +
                         ' / ' +
                         '<span class="' + totalClass + '"></span>';
                },
                formatFractionCurrent: function (number) {
                  return number+1; // ở đây bạn có thể -1 hoặc +0 nếu Swiper đang lệch
                },
                formatFractionTotal: function (number) {
                  return number+1; // có thể chỉnh nếu tổng bị lệch
                }
              },
          }
        }
      });
    }
    interact() {
      
    }
  }
  const homeTesti = new HomeTesti('.home-testi');
  class HomeInsight extends TriggerSetup {
    constructor(triggerEl) {
      super(triggerEl);
      this.swiperTesti;
    }
    trigger() {
      super.setTrigger(this.setup.bind(this));
      this.interact();
    }
    setup() {
      if(viewport.w < 992) {
        $('.home-insight-cms').addClass('swiper')
        $('.home-insight-list').addClass('swiper-wrapper')
        $('.home-insight-item').addClass('swiper-slide')
        this.swiperTesti = new Swiper(".home-insight-cms", {
          slidesPerView: 'auto',
          speed: 600,
          pagination: {
            el: '.home-insight-pagi',
            bulletClass: 'home-insight-pagi-item',
            bulletActiveClass: 'active',
            clickable: true,  
          }
        });
      }
    }
    interact() {
      
    }
  }
  const homeInsight = new HomeInsight('.home-insight');
  class HomeCta extends TriggerSetup {
    constructor(triggerEl) {
      super(triggerEl);
      this.swiperTesti;
    }
    trigger() {
      super.setTrigger(this.setup.bind(this));
      this.interact();
    }
    setup() {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.triggerEl,
          start: "top center",
          end: "bottom-=20% center",
          scrub: 1,
        },
      });
      tl.fromTo('.home-cta-video', {yPercent: 0}, {yPercent: -30, duration: .4, ease: 'none'});
    }
    interact() {
      
    }
  }
  const homeCta = new HomeCta('.home-cta');
  class IndustrySupport extends TriggerSetup {
    constructor(triggerEl) {
      super(triggerEl);
      this.swiperTesti;
    }
    trigger() {
      super.setTrigger(this.setup.bind(this));
      this.interact();
    }
    setup() {
      if(viewport.w > 991){
        let topSticky = (viewport.h - $('.industry-support-title-inner').outerHeight() + $('.header').height())/2;
        $('.industry-support-title-inner').css('top', topSticky)
      }
      else {
        $('.industry-support-cms').addClass('swiper')
        $('.industry-support-list').addClass('swiper-wrapper')
        $('.industry-support-item').addClass('swiper-slide')
        let swiperSupport = new Swiper(".industry-support-cms", {
          slidesPerView: 'auto',
          speed: 400,
          pagination: {
            el: '.industry-support-pagi',
            bulletClass: 'industry-support-pagi-item',
            bulletActiveClass: 'active',
            clickable: true,  
          }
        })
      }
    }
    interact() {
     
    }
  }
  const industrySupport = new IndustrySupport('.industry-support');
  class IndustryCasestudy extends TriggerSetup {
    constructor(triggerEl) {
      super(triggerEl);
      this.swiperTesti;
    }
    trigger() {
      super.setTrigger(this.setup.bind(this));
      this.interact();
    }
    setup() {
      $('.industry-casestudy-item .industry-casestudy-tag-list').each(function () {
        const $list = $(this)
        const $items = $list.children('.industry-casestudy-tag-item').toArray();
        const maxWidth = $(this).closest('.industry-casestudy-tag-cms').width();;
        console.log(maxWidth)
        $list.empty(); // clear list
      
        
        const $more = $(`
          <div class="industry-casestudy-tag-item more">
            <div class="txt txt-font-plex txt-14 industry-casestudy-tag-item-txt">0+</div>
          </div>
        `);
        $list.append($more);
        let hiddenCount = 0;
      
        $items.forEach(item => {
          $more.before(item); 
          console.log($list.width());
          if ($list.width() >= maxWidth) {
            $(item).hide();
            hiddenCount++;
          }
        });
      
        if (hiddenCount > 0) {
          $more.find('.industry-profile-post-item-tag-item-txt').text(`${hiddenCount}+`);
        } else {
          $more.remove(); 
        }
      });
      this.swiperTesti = new Swiper(".industry-casestudy-cms", {
        slidesPerView: 'auto',
        speed: 600,
        longSwipesRatio : 0,
        threshold: 10,
        navigation: {
          prevEl: ".industry-casestudy-control-item-prev",
          nextEl: ".industry-casestudy-control-item-next",
        },
       
        pagination: {
          el: '.industry-casestudy-control-pagi',
          bulletClass: 'industry-casestudy-control-pagi-item',
          bulletActiveClass: 'active',
          clickable: true,  
        },
        breakpoints: {
          991: {
            slidesPerView: 2,
              spaceBetween: parseRem(0),
              pagination: {
                el: '.industry-casestudy-control-number',
                type: "fraction",
                renderFraction: function (currentClass, totalClass) {
                  return '<span class="' + currentClass + '"></span>' +
                         ' / ' +
                         '<span class="' + totalClass + '"></span>';
                },
                formatFractionCurrent: function (number) {
                  return number+1; // ở đây bạn có thể -1 hoặc +0 nếu Swiper đang lệch
                },
                formatFractionTotal: function (number) {
                  return number+1; // có thể chỉnh nếu tổng bị lệch
                }
              },
          }
        }
      });
    }
    interact() {
      
    }
  }
  const industryCasestudy = new IndustryCasestudy('.industry-casestudy');
  class IndustryProfile extends TriggerSetup {
    constructor(triggerEl) {
      super(triggerEl);
      this.swiperTesti;
    }
    trigger() {
      super.setTrigger(this.setup.bind(this));
      this.interact();
    }
    setup() {
      let toggleProfile = 0;
      $('.industry-profile-filter-item-title').each((idx, item) => {
        let widthItem = $(item).width() + 2;
        console.log(widthItem)
        $(item).parent().width(widthItem);
      })
      $('.industry-profile-filter-item').each((idx, item) => {
        let category = $(item).find('.industry-profile-filter-item-ic').attr('data-category');
        let toggleItem =$(`.industry-profile-post-item[data-category=${category}]`).length;
        if(toggleItem>0){
          $(item).find('.label-txt').text(toggleItem);
        }
        else {
          $(item).hide();
        }
        toggleProfile+=toggleItem;
      })
      $(".industry-profile-filter-all").find('.label-txt').text(toggleProfile);
      $(".filter-total-show").text(toggleProfile);
      if(toggleProfile <= 1){
        $('.txt-profile-more').addClass('hidden')
      }
      else {
        $('.txt-profile-more').removeClass('hidden')
      }
    }
    interact() {
      const $all = $('[data-filter-item="all"]');
      const $child = $('[data-filter-item="child"]');
      // Click child
      $('.industry-profile-post-item').each((idx, item) => {
        if(idx > 5){
          $(item).addClass('view-more');
        }
      })
      $('.industry-profile-post-cms-btn').on('click', function(){
        $('.industry-profile-post-item').removeClass('view-more')
        $('.industry-profile-post-cms-line').hide();
        $('.industry-profile-post-cms-btn').hide().addClass('hidden');
        setTimeout(scrollToTop, 100)
        setTimeout(activeItem, 10)
      })
      $child.on('click', function () {
        if(!$('.industry-profile-post-cms-btn').hasClass('hidden')){
          $('.industry-profile-post-cms-line').hide();
        }
        scrollToTop();
        $(this).toggleClass('active');
        const total = $child.length;
        const checked = $child.filter('.active').length;
        $all.removeClass('active has-filter');
        if (checked === 0 || checked === total) {
          $all.addClass('active');
          setTimeout(activeItem, 10)
          $('.industry-profile-post-item').show().addClass('active');
        } else {
          $all.addClass('has-filter');
          $('.industry-profile-post-item').hide().removeClass('active');
          $child.filter('.active').each(function () {
            const cat = $(this).data('category');
            setTimeout(activeItem, 10)
            $('.industry-profile-post-item[data-category="' + cat + '"]').show().addClass('active');
          });
        }
        $(".filter-total-show").text($('.industry-profile-post-item.active').length);
        if($('.industry-profile-post-item.active').length <= 1){
          $('.txt-profile-more').addClass('hidden')
        }
        else {
          $('.txt-profile-more').removeClass('hidden')
        }
        filterTextMob();
      });

      $all.on('click', function () {
        if(!$(this)) return;
        if(!$('.industry-profile-post-cms-btn').hasClass('hidden')){
          $('.industry-profile-post-cms-line').hide();
          $('.industry-profile-post-cms-btn').hide().addClass('hidden');
        }
        scrollToTop();
        $('.industry-profile-post-item').show().addClass('active');       
        if($(this).hasClass('active') || $(this).hasClass('has-filter')){
          $child.removeClass('active');
          $all.removeClass('has-filter').removeClass('active');
          setTimeout(activeItem, 10)
        }
        else {
          $child.addClass('active');
          $all.addClass('active');
          setTimeout(activeItem, 10)
        }
        $(".filter-total-show").text($('.industry-profile-post-item.active').length);
        if($('.industry-profile-post-item.active').length <= 1){
          $('.txt-profile-more').addClass('hidden')
        }
        else {
          $('.txt-profile-more').removeClass('hidden')
        }
        filterTextMob();
      });
      $('.industry-profile-filter-result-ic').on('click', function() {
        $('.industry-profile-filter').toggleClass('active');
      })
      function filterTextMob(){
        let textString;
        if($('.industry-profile-filter-item-ic.active[data-filter-item="child"]').length > 0){
          textString = $('.industry-profile-filter-item-ic.active[data-filter-item="child"]')
            .map(function () {
              return $(this).next('.industry-profile-filter-item-title-wrap').find('.industry-profile-filter-item-title').text().trim();
            })
            .get()
            .join(', ');

        }
        else {
          textString= 'All';
        }
        $('.industry-profile-filter-result-txt').text(textString)
      }
      let heightHeader = -$('.header').outerHeight(); 
      function scrollToTop() {
        let elem = $('.industry-profile-filter-wrap');
        if (elem.length) {
          let elemTop = elem.offset().top;
          let scrollTop = $(window).scrollTop();
          if (elemTop - scrollTop <= Math.abs(heightHeader)) {
            lenis.scrollTo('.industry-profile-filter-wrap', {
              duration: 0.6,
              offset: heightHeader,
            });
          }
        }
      }
      function activeItem() {
        gsap.fromTo('.industry-profile-post-item', {autoAlpha: 0, y: 30}, {autoAlpha: 1, y: 0, duration: .6, stagger: .03})
      }
      if(viewport.w < 992){
        $('.industry-profile-post-item-tag-list').each(function () {
          const $list = $(this);
          const $items = $list.children('.industry-profile-post-item-tag-item').toArray();
          const lineHeight = $($items[0]).outerHeight(true) || 30;
          const maxHeight = lineHeight * 2 + parseRem(10);
        
          $list.empty(); // clear list
        
          
          const $more = $(`
            <div class="industry-profile-post-item-tag-item more">
              <div class="txt txt-14 industry-profile-post-item-tag-item-txt">0+</div>
            </div>
          `);
          $list.append($more);
        
          let hiddenCount = 0;
        
          $items.forEach(item => {
            $more.before(item); 
        
            if ($list.height() > maxHeight) {
              $(item).hide();
              hiddenCount++;
            }
          });
        
          if (hiddenCount > 0) {
            $more.find('.industry-profile-post-item-tag-item-txt').text(`${hiddenCount}+`);
          } else {
            $more.remove(); 
          }
        });
        let tagClone = $('.industry-popup-tag-item').clone();
        let locaClone = $('.industry-popup-location-item').eq(0).clone();
        let locaWrap = $('.industry-popup-location-list');
        let tagWrap = $('.industry-popup-tag-wrap');
        $('.industry-profile-post-item-plus').on('click', function(){
          tagWrap.empty();
          locaWrap.empty();
          let parent = $(this).closest('.industry-profile-post-item');
          let label = parent.find('.label-txt').text();
          let role = parent.find('.industry-profile-post-item-role').text();
          let title = parent.find('.industry-profile-post-item-title').text();
          let sub = parent.find('.industry-profile-post-item-sub').text();
          $('.industry-popup-label .label-txt').text(label);
          $('.industry-popup-role').text(role);
          $('.industry-popup-title').text(title);
          $('.industry-popup-sub').text(sub);
          parent.find('.industry-profile-post-item-tag-item:not(.more').each((idx, item) => {
            let itemClone = tagClone.clone();
            itemClone.find('.industry-popup-tag-item-txt').text($(item).find('.industry-profile-post-item-tag-item-txt').text());
            tagWrap.append(itemClone);
          })
          parent.find('.industry-profile-post-item-loca-item').each((idx, item) => {
            let itemClone = locaClone.clone();
            console.log(itemClone)
            console.log($(item).find('.txt').text())
            itemClone.text($(item).find('.txt').text());
            locaWrap.append(itemClone);
          })
          $('.industry-popup-wrap').addClass('active')
        })
        $('.industry-popup-close').on('click', function() {
          $('.industry-popup-wrap').removeClass('active')
        })
      }
    }
  }
  const industryProfile = new IndustryProfile('.industry-profile');
  class InsightHero extends TriggerSetupHero {
    constructor() {
      super();
      this.tl = null;
    }
    trigger() {
      this.setup();
      this.interact();
      super.init(this.play.bind(this));
    }
    setup() {
      console.log($('.insight-blog-item').length)
      if($('.insight-blog-item').length < 8) $('.insight-blog-viewmore').hide();
      $('.insight-blog-item').each((idx, item) => {
        if(idx > 6){
          $(item).addClass('view-more');
        }
      })
      $('.insight-blog-filter-item[data-filter-item="child"]').each((idx, item) => {
        let category = $(item).attr('data-category');
        if($(`.insight-blog-item[data-category = ${category}]`).length == 0) {
          $(item).hide();
        }
      })
    }
    interact() {
      const $all = $('[data-filter-item="all"]');
      const $child = $('[data-filter-item="child"]');
      
      $('.insight-blog-viewmore').on('click', function(){
        $('.insight-blog-item').removeClass('view-more')
        $(this).hide().addClass('hidden');
        setTimeout(scrollToTop, 100)
        setTimeout(activeItem, 10)
      })
      $child.on('click', function () {
        $('.insight-blog-viewmore').hide();
        $('.insight-blog-item').removeClass('first-item')
        scrollToTop();
        $child.removeClass('active')
        $(this).toggleClass('active');
        const checked = $child.filter('.active').length;
        $all.removeClass('active ');
        if (checked === 0 ) {
          $all.addClass('active');
          setTimeout(activeItem, 10)
          $('.insight-blog-item').show().addClass('active');
        } 
        $('.insight-blog-item').hide().removeClass('active');
        $child.filter('.active').each( (idx, item) => {
          const cat = $(item).data('category');
          setTimeout(activeItem, 10)
          $('.insight-blog-item[data-category="' + cat + '"]').show().addClass('active');
        });
        $('.insight-blog-item.active').eq(0).addClass('first-item')
        filterTextMob();
      });

      $all.on('click', function () {
        if(!$(this)) return;
        $('.insight-blog-viewmore').hide();
        if(!$('.industry-profile-post-cms-btn').hasClass('hidden')){
          $('.industry-profile-post-cms-line').hide();
          $('.industry-profile-post-cms-btn').hide().addClass('hidden');
        }
        scrollToTop();
        $('.insight-blog-item').removeClass('first-item').show().addClass('active');       
        $child.removeClass('active');
        $all.addClass('active');
        setTimeout(activeItem, 10)
        filterTextMob();
      });
      if(viewport.w < 768){
        $('.insight-blog-filter-mob-ic').on('click', function() {
          $('.insight-blog-filter-mob').toggleClass('active')
        })
      }
      function filterTextMob(){
        if(viewport.w > 767) return;
        let textString;
        textString = $('.insight-blog-filter-item.active .insight-blog-filter-item-txt').text();
        $('.insight-blog-filter-mob-txt').text(textString)
        $('.insight-blog-filter-mob').removeClass('active')
      }
      let heightHeader = -$('.header').outerHeight() + parseRem(1)*3; 
      function scrollToTop() {
        let elem = $('.insight-blog');
        if (elem.length) {
          let elemTop = elem.offset().top;
          let scrollTop = $(window).scrollTop();
          if (elemTop - scrollTop <= Math.abs(heightHeader)) {
            lenis.scrollTo('.insight-blog', {
              duration: 0.6,
              offset: heightHeader,
            });
          }
        }
      }
      function activeItem() {
        gsap.fromTo('.insight-blog-item-inner', {autoAlpha: 0, y: 30}, {autoAlpha: 1, y: 0, duration: .6, stagger: .03})
      }
    }
    play() {
      this.tl.play();
    }
  }
  const insightHero = new InsightHero();
  class SubpageHero extends TriggerSetupHero {
    constructor() {
      super();
      this.tl = null;
    }
    trigger() {
      this.setup();
      super.init(this.play.bind(this));
      
    }
    setup() {
      this.initContentPopup();
      if($('.sp-content-table-inner').outerHeight() >= viewport.h){
        $('.sp-content-table-inner').attr('data-lenis-prevent', 'true');
      }
      console.log(viewport.h)
      $(window).on('scroll', (e)=> {
        this.itemContentActiveCheck('.sp-content-main-richtext h3');
      })
      $('.sp-content-table-item-list').on('click', '.sp-content-table-item-wrap', function(e) {
        e.preventDefault();
        if($(this).hasClass('active')) return;
        $('.sp-content-table-item-wrap').removeClass('active');
        $(this).addClass('active');
        let dataHeader = $(this).attr('data-title');
        var scrollTop =  $('.sp-content-main-richtext').scrollTop() - $('.sp-content-main-richtext').offset().top + $(`.sp-content-main-richtext h3[data-title="${dataHeader}"]`).offset().top ;
        lenis.scrollTo(scrollTop, {
          duration: 1
        })
      })
    }
    itemContentActiveCheck(el) {
      for (let i = 0; i < $(el).length; i++) {
          let top = $(el).eq(i).get(0).getBoundingClientRect().top;
          if (top > 0 && top - $(el).eq(i).height()   < ($(window).height()/2)) {
              $('.sp-content-table-item-wrap').removeClass('active');
              $('.sp-content-table-item-wrap').eq(i).addClass('active');
          }
          }
    }
    initContentPopup() {
      let titleLeft = $('.sp-content-table-item-wrap').eq(0).clone();
      $('.sp-content-table-item-wrap').remove();
      $('.sp-content-main-richtext h3').each((i, el) => {
          $(el).attr('data-title', `toch-${i}`);
          let titleLeftClone = titleLeft.clone();
          if(i == 0) {
              titleLeftClone.addClass('active');
          }
          let index = i+1<=9 ?`0${i+1}` : i+1;
          let cleanText = $(el).text().replace(/^\d+\.\s*/, '');
          titleLeftClone.find('.sp-content-table-item-title').text(cleanText);
          titleLeftClone.find('.label-txt').text(index);
          titleLeftClone.attr('data-title', `toch-${i}`);
          $('.sp-content-table-item-list').append(titleLeftClone);
      })
  }
    play() {
      this.tl.play();
    }
  }
  const subpageHero = new SubpageHero();
  class CaseStudyHero extends TriggerSetupHero {
    constructor() {
      super();
      this.tl = null;
    }
    trigger() {
      this.setup();
      this.interact();
      super.init(this.play.bind(this));
      
    }
    setup() {
      let toggleProfile = 0;
      $('.casestudy-profile-filter-item-title').each((idx, item) => {
        let widthItem = $(item).width() + 2;
        console.log(widthItem)
        $(item).parent().width(widthItem);
      })
      $('.casestudy-profile-filter-item').each((idx, item) => {
        let category = $(item).find('.casestudy-profile-filter-item-ic').attr('data-category');
        let toggleItem =$(`.casestudy-profile-post-item[data-category=${category}]`).length;
        if(toggleItem>0){
          $(item).find('.label-txt').text(toggleItem);
        }
        else {
          $(item).hide();
        }
        toggleProfile+=toggleItem;
      })
      $(".casestudy-profile-filter-all").find('.label-txt').text(toggleProfile);
      $(".filter-total-show").text(toggleProfile);
      if(toggleProfile <= 1){
        $('.txt-profile-more').addClass('hidden')
      }
      else {
        $('.txt-profile-more').removeClass('hidden')
      }
      $('.casestudy-profile-post-item-tag-list').each(function () {
        const $list = $(this);
        console.log($list)
        const $items = $list.children('.casestudy-profile-post-item-tag-item').toArray();
        const lineHeight = $($items[0]).outerHeight(true) || 30;
        const maxHeight = lineHeight  + parseRem(10);
        $list.empty(); 
        const $more = $(`
          <div class="casestudy-profile-post-item-tag-item more">
            <div class="txt txt-14 casestudy-profile-post-item-tag-item-txt">0+</div>
          </div>
        `);
        $list.append($more);
      
        let hiddenCount = 0;
      
        $items.forEach(item => {
          $more.before(item); 
      
          if ($list.height() > maxHeight) {
            $(item).hide();
            hiddenCount++;
          }
        });
      
        if (hiddenCount > 0) {
          $more.find('.casestudy-profile-post-item-tag-item-txt').text(`${hiddenCount}+`);
        } else {
          $more.remove(); 
        }
      });
      if($('.casestudy-profile-post-item').length <7){
        $('.casestudy-profile-post-cms-btn').hide().addClass('hidden');
      }
      $('.casestudy-profile-post-item').each((idx, item) => {
        if(idx > 5){
          $(item).addClass('view-more');
        }
      })
    }
    interact() {
      const $all = $('[data-filter-item="all"]');
      const $child = $('[data-filter-item="child"]');
      $('.casestudy-profile-post-item').on('click', function(){
        let link = $(this).find('.casestudy-profile-post-item-link').attr('href');
        window.location.href = link;
      })
      // Click child
      $('.casestudy-profile-post-cms-btn').on('click', function(){
        $('.casestudy-profile-post-item').removeClass('view-more')
        
        $('.casestudy-profile-post-cms-btn').hide().addClass('hidden');
        setTimeout(scrollToTop, 100)
        setTimeout(activeItem, 10)
      })
      $child.on('click', function () {
        if(!$('.casestudy-profile-post-cms-btn').hasClass('hidden')){
          $('.casestudy-profile-post-cms-btn').hide().addClass('hidden');
        }
        scrollToTop();
        $(this).toggleClass('active');
        const total = $child.length;
        const checked = $child.filter('.active').length;
        $all.removeClass('active has-filter');
        if (checked === 0 || checked === total) {
          $all.addClass('active');
          setTimeout(activeItem, 10)
          $('.casestudy-profile-post-item').show().addClass('active');
        } else {
          $all.addClass('has-filter');
          $('.casestudy-profile-post-item').hide().removeClass('active');
          $child.filter('.active').each(function () {
            const cat = $(this).data('category');
            setTimeout(activeItem, 10)
            $('.casestudy-profile-post-item[data-category="' + cat + '"]').show().addClass('active');
          });
        }
        $(".filter-total-show").text($('.casestudy-profile-post-item.active').length);
        if($('.casestudy-profile-post-item.active').length <= 1){
          $('.txt-profile-more').addClass('hidden')
        }
        else {
          $('.txt-profile-more').removeClass('hidden')
        }
        filterTextMob();
      });
      $all.on('click', function () {
        if(!$(this)) return;
        if(!$('.casestudy-profile-post-cms-btn').hasClass('hidden')){
          $('.casestudy-profile-post-cms-btn').hide().addClass('hidden');
        }
        scrollToTop();
        $('.casestudy-profile-post-item').show().addClass('active');       
        if($(this).hasClass('active') || $(this).hasClass('has-filter')){
          $child.removeClass('active');
          $all.removeClass('has-filter').removeClass('active');
          setTimeout(activeItem, 10)
        }
        else {
          $child.addClass('active');
          $all.addClass('active');
          setTimeout(activeItem, 10)
        }
        $(".filter-total-show").text($('.casestudy-profile-post-item.active').length);
        if($('.casestudy-profile-post-item.active').length <= 1){
          $('.txt-profile-more').addClass('hidden')
        }
        else {
          $('.txt-profile-more').removeClass('hidden')
        }
        filterTextMob();
      });
      $('.casestudy-profile-filter-result-ic').on('click', function() {
        $('.casestudy-profile-filter').toggleClass('active');
      })
      function filterTextMob(){
        let textString;
        if($('.casestudy-profile-filter-item-ic.active[data-filter-item="child"]').length > 0){
          textString = $('.casestudy-profile-filter-item-ic.active[data-filter-item="child"]')
            .map(function () {
              return $(this).next('.casestudy-profile-filter-item-title-wrap').find('.casestudy-profile-filter-item-title').text().trim();
            })
            .get()
            .join(', ');
        }
        else {
          textString= 'All';
        }
        $('.casestudy-profile-filter-result-txt').text(textString)
      }
      let heightHeader = -$('.header').outerHeight(); 
      function scrollToTop() {
        let elem = $('.casestudy-profile-filter-wrap');
        if (elem.length) {
          let elemTop = elem.offset().top;
          let scrollTop = $(window).scrollTop();
          if (elemTop - scrollTop <= Math.abs(heightHeader)) {
            lenis.scrollTo('.casestudy-profile-filter-wrap', {
              duration: 0.6,
              offset: heightHeader,
            });
          }
        }
      }
      function activeItem() {
        gsap.fromTo('.casestudy-profile-post-item-inner', {autoAlpha: 0, y: 30}, {autoAlpha: 1, y: 0, duration: .6, stagger: .03})
      }
      
    }
    play() {
      this.tl.play();
    }
  }
  const caseStudyHero = new CaseStudyHero();
   class CsDetailHero extends TriggerSetupHero {
    constructor() {
      super();
      this.tl = null;
    }
    trigger() {
      this.setup();
      super.init(this.play.bind(this));
      
    }
    setup(){
        this.initContent();
    }
    initContent() {
        const $root = $('.cs-detail-hero-richtext-inner');
        const out = [];
        $root.find('h6').each(function () {
          const $h6 = $(this);
          const $block = $h6.nextUntil('h6');
          const $h3 = $block.filter('h3').first();
          const titleText = $h3.length ? $.trim($h3.text()) : '';
          const $bodyNodes = $block.not($h3);
          const bodyHTML = $bodyNodes
            .map(function () {
              return this.outerHTML || $('<div>').append($(this).clone()).html();
            })
            .get()
            .join('');
          const $lastNode = $bodyNodes.last();
          const isImgLast = $lastNode.hasClass("w-richtext-figure-type-image");  
          console.log($lastNode)
          out.push({
            label: $.trim($h6.text()),
            title: titleText,
            body: bodyHTML, 
            isImgLast: isImgLast
          });
        });
        $root.hide();
        let contentItem = $('.cs-detail-hero-content').clone();
        $('.cs-detail-hero-content').remove();
        out.reverse();
        out.forEach((item, idx) => {
          let contentItemClone = contentItem.clone();
          contentItemClone.find('.label-txt').text(item.label);
          contentItemClone.find('.cs-detail-hero-content-left-title').text(item.title);
          contentItemClone.find('.cs-detail-hero-content-right-inner').html(item.body);
          if(viewport.w < 992 && item.isImgLast) {
            contentItemClone.addClass('is-img-last')
          }
          $root.after(contentItemClone);
        });

    }
    play() {
      this.tl.play();
    }
  }
  const csDetailHero = new CsDetailHero();
  class CsDetailBlog extends TriggerSetup {
    constructor(triggerEl) {
      super(triggerEl);
      this.swiperTesti;
    }
    trigger() {
      super.setTrigger(this.setup.bind(this));
      this.interact();
    }
    setup() {
      $('.cs-detail-blog-item-tag-list').each(function () {
        const $list = $(this);
        console.log($list)
        const $items = $list.children('.cs-detail-blog-item-tag-item').toArray();
        const lineHeight = $($items[0]).outerHeight(true) || 30;
        const maxHeight = lineHeight  + parseRem(10);
        $list.empty(); 
        const $more = $(`
          <div class="cs-detail-blog-item-tag-item more">
            <div class="txt txt-14 cs-detail-blog-item-tag-item-txt">0+</div>
          </div>
        `);
        $list.append($more);
      
        let hiddenCount = 0;
      
        $items.forEach(item => {
          $more.before(item); 
      
          if ($list.height() > maxHeight) {
            $(item).hide();
            hiddenCount++;
          }
        });
      
        if (hiddenCount > 0) {
          $more.find('.cs-detail-blog-item-tag-item-txt').text(`${hiddenCount}+`);
        } else {
          $more.remove(); 
        }
      });
      if(viewport.w < 992) {
        $('.cs-detail-blog-cms').addClass('swiper')
        $('.cs-detail-blog-list').addClass('swiper-wrapper')
        $('.cs-detail-blog-item').addClass('swiper-slide')
        let swiperBlog = new Swiper(".cs-detail-blog-cms", {
          slidesPerView: 'auto',
          speed: 600,
          pagination: {
            el: '.cs-detail-blog-pagi',
            bulletClass: 'cs-detail-blog-pagi-item',
            bulletActiveClass: 'active',
            clickable: true,
          },
        });
      }
    }
    interact() {
      
    }
  }
  const csDetailBlog = new CsDetailBlog('.cs-detail-blog');
  class CohostHow extends TriggerSetup {
    constructor(triggerEl) {
      super(triggerEl);
      this.swiperTesti;
    }
    trigger() {
      super.setTrigger(this.setup.bind(this));
      this.interact();
    }
    setup() {
      if(viewport.w < 992) {
        $('.cohost-how-content-cms').addClass('swiper')
        $('.cohost-how-content-list').addClass('swiper-wrapper')
        $('.cohost-how-content-item').addClass('swiper-slide')
        let swiperBlog = new Swiper(".cohost-how-content-cms", {
          slidesPerView: 'auto',
          speed: 600,
          pagination: {
            el: '.cohost-how-pagi',
            bulletClass: 'cohost-how-pagi-item',
            bulletActiveClass: 'active',
            clickable: true,
          },
        });
      }
    }
    interact() {
      
    }
  }
  const cohostHow = new CohostHow('.cohost-how');
  class InsightDetailHero extends TriggerSetupHero {
    constructor() {
      super();
      this.tl = null;
    }
    trigger() {
      this.setup();
      super.init(this.play.bind(this));
      
    }
    setup() {
      this.initContentPopup();
      if($('.tp-insight-content-table-inner').outerHeight() >= viewport.h){
        $('.tp-insight-content-table-inner').attr('data-lenis-prevent', 'true');
      }
      console.log(viewport.h)
      $(window).on('scroll', (e)=> {
        this.itemContentActiveCheck('.tp-insight-content-main-richtext h3');
      })
      $('.tp-insight-content-table-item-list').on('click', '.tp-insight-content-table-item-wrap', function(e) {
        e.preventDefault();
        if($(this).hasClass('active')) return;
        $('.tp-insight-content-table-item-wrap').removeClass('active');
        $(this).addClass('active');
        let dataHeader = $(this).attr('data-title');
        var scrollTop =  $('.tp-insight-content-main-richtext').scrollTop() - $('.tp-insight-content-main-richtext').offset().top + $(`.tp-insight-content-main-richtext h3[data-title="${dataHeader}"]`).offset().top ;
        lenis.scrollTo(scrollTop, {
          duration: 1
        })
      })
    }
    itemContentActiveCheck(el) {
      for (let i = 0; i < $(el).length; i++) {
          let top = $(el).eq(i).get(0).getBoundingClientRect().top;
          if (top > 0 && top - $(el).eq(i).height()   < ($(window).height()/2)) {
              $('.tp-insight-content-table-item-wrap').removeClass('active');
              $('.tp-insight-content-table-item-wrap').eq(i).addClass('active');
          }
          }
    }
    initContentPopup() {
      let titleLeft = $('.tp-insight-content-table-item-wrap').eq(0).clone();
      $('.tp-insight-content-table-item-wrap').remove();
      $('.tp-insight-content-main-richtext h3').each((i, el) => {
          $(el).attr('data-title', `toch-${i}`);
          let titleLeftClone = titleLeft.clone();
          if(i == 0) {
              titleLeftClone.addClass('active');
          }
          let index = i+1<=9 ?`0${i+1}` : i+1;
          let cleanText = $(el).text().replace(/^\d+\.\s*/, '');
          titleLeftClone.find('.tp-insight-content-table-item-title').text(cleanText);
          titleLeftClone.find('.label-txt').text(index);
          titleLeftClone.attr('data-title', `toch-${i}`);
          $('.tp-insight-content-table-item-list').append(titleLeftClone);
      })
  }
    play() {
      this.tl.play();
    }
  }
  const insightDetailHero = new InsightDetailHero();
  class InsightDetailBlog extends TriggerSetup {
    constructor(triggerEl) {
      super(triggerEl);
      this.swiperTesti;
    }
    trigger() {
      super.setTrigger(this.setup.bind(this));
      this.interact();
    }
    setup() {
      console.log('khanh')
      if(viewport.w < 992){
        $('.tp-insight-blog-main').addClass('swiper')
        $('.tp-insight-blog-list').addClass('swiper-wrapper')
        $('.tp-insight-blog-item').addClass('swiper-slide')
        let swiperService = new Swiper(".tp-insight-blog-main", {
          slidesPerView: 'auto',
          speed: 600,
          pagination: {
            el: '.tp-insight-blog-pagi',
            bulletClass: 'tp-insight-blog-pagi-item',
            bulletActiveClass: 'active',
            clickable: true,
          },
        });
      }
    }
    interact() {
      
    }
  }
  const insightDetailBlog = new InsightDetailBlog('.tp-insight-blog');
  class HowPrinciples extends TriggerSetup {
    constructor(triggerEl) {
      super(triggerEl);
      this.swiperTesti;
    }
    trigger() {
      super.setTrigger(this.setup.bind(this));
      this.interact();
    }
    setup() {
      let topSticky = $('.header').height() - parseRem(1);
      console.log($('.how-principles .container').eq(0).outerWidth()/viewport.h)
      if(viewport.w > 767 && viewport.w/viewport.h > 1.8){
        topSticky = $('.how-principles-head-wrap').outerHeight() + parseInt($('.how-principles-head-wrap').css('top'))
        console.log('khanh')
      }
      let dynamicTopSticky =viewport.w > 991;
      let paddingBottom = 0;
      let lastItempaddingBottom = 0;
      let lengthContentWrap = $('.how-principles-content-wrap').length;
      if(!dynamicTopSticky){
        let heightLastItemContent = $('.how-principles-content-wrap').eq(lengthContentWrap -1 ).height();
        $('.how-principles-head-wrap').css('padding-bottom',heightLastItemContent);
        $('.how-principles-content-main').css('margin-top', heightLastItemContent*-1)
      }
      $('.how-principles-content-wrap').each((idx, item) => {
        if(dynamicTopSticky){
          for(let i= idx +1; i< lengthContentWrap; i++){
            paddingBottom += $('.how-principles-content-wrap').eq(i).find('.how-principles-content-head').height() + parseInt($('.how-principles-content-wrap').eq(i).find('.how-principles-content').css('padding-top')) + parseInt($('.how-principles-content-wrap').eq(i).find('.how-principles-content-decs-wrap').css('padding-top'));  
          }
        }
        else {
          paddingBottom = Math.abs($(item).height() - $('.how-principles-content-wrap').eq(lengthContentWrap-1).height());
        }
        if(idx != 0) {
          let heightItem = $('.how-principles-content-wrap').eq(idx - 1).find('.how-principles-content-head').height() + parseInt($('.how-principles-content-wrap').eq(idx - 1).find('.how-principles-content').css('padding-top')) + parseInt($('.how-principles-content-wrap').eq(idx - 1).find('.how-principles-content-decs-wrap').css('padding-top'));  
          if(dynamicTopSticky){
            topSticky+= heightItem;
          }
        }
        else if(dynamicTopSticky){
          paddingBottom += parseInt(20);
        }
        $(item).css('top', topSticky);
        $(item).css('padding-bottom', paddingBottom);
        $(item).css('margin-top', lastItempaddingBottom*-1);
        lastItempaddingBottom = paddingBottom;
        paddingBottom=0;
      })
      
    }
    interact() {
      
    }
  }
  const howPrinciples = new HowPrinciples('.how-principles');
  class HowTesti extends TriggerSetup {
    constructor(triggerEl) {
      super(triggerEl);
      this.swiperTesti;
    }
    trigger() {
      super.setTrigger(this.setup.bind(this));
      this.interact();
    }
    setup() {
      this.swiperTesti = new Swiper(".how-testi-cms", {
        slidesPerView: 'auto',
        speed: 600,
        longSwipesRatio : 0,
        threshold: 10,
        navigation: {
          prevEl: ".how-testi-control-item-prev",
          nextEl: ".how-testi-control-item-next",
        },
       
        pagination: {
          el: '.how-testi-control-pagi',
          bulletClass: 'how-testi-control-pagi-item',
          bulletActiveClass: 'active',
          clickable: true,  
        },
        breakpoints: {
          991: {
            slidesPerView: 2,
              spaceBetween: parseRem(0),
              pagination: {
                el: '.how-testi-control-number',
                type: "fraction",
                renderFraction: function (currentClass, totalClass) {
                  return '<span class="' + currentClass + '"></span>' +
                         ' / ' +
                         '<span class="' + totalClass + '"></span>';
                },
                formatFractionCurrent: function (number) {
                  return number+1; // ở đây bạn có thể -1 hoặc +0 nếu Swiper đang lệch
                },
                formatFractionTotal: function (number) {
                  return number+1; // có thể chỉnh nếu tổng bị lệch
                }
              },
          }
        }
      });
    }
    interact() {
      
    }
  }
  const howTesti = new HowTesti('.how-testi');
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
      $(".header-toggle").on("click",  () => {
        if($('.header').hasClass('active')){
          lenis.start();
          $('.header').removeClass('active');
          this.toggleColorMode('blue');

        }
        else {
          lenis.stop();
          $('.header').removeClass('on-blue');
          $('.header').addClass('active')
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
    }
    toggleHide = (inst) => {
      const scrollTop = document.documentElement.scrollTop || window.scrollY
      if ($('.header').hasClass('active')) return;
      const isScrollHeader = scrollTop > $('.header').height() * (viewport.w > 767 ? 5 : 1.5)
      let debounceTimer;

      debounceTimer && clearTimeout(debounceTimer);

      debounceTimer = setTimeout(() => {
          if (isScrollHeader) {
              if (inst.direction >= 1) {
                  $('.header').addClass('on-hide');
              } else {
                  $('.header').removeClass('on-hide');
              }
          } else {
              $('.header').removeClass('on-hide');
          }
      }, 100);
    }
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
    setup() {
      $('.footer-address-item-title-wrap').each((idx, item) => {
        let txtMap = new SplitType($(item).find('.footer-address-item-title'), {types: 'lines, words', lineClass: 'bp-line'});
        multiLineText($(item));
        
      })
    }
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
      $('.footer-form-inner').on('keypress', function (e) {
        if (e.which === 13 && !isValidEmail($('.footer-form-input').val())) { 
          e.preventDefault(); 
          $('.footer-form-input-group').addClass('error');
        }
        else {
          $('.footer-form-input-group').removeClass('error');
        }
      });
    }
  }
  const footer = new Footer(".footer-wrap");
  const SCRIPT = {
    homeScript: () => {
      homeHero.trigger();
      homeProduct.trigger();
      homeService.trigger();
      homeIndustry.trigger();
      homeInsight.trigger();
      homeTesti.trigger();
    },
    industryScript: () => {
      industryProfile.trigger();
      industryCasestudy.trigger();
      industrySupport.trigger();
    },
    contactScript: () => {
      
    },
    insightScript: () => {
      insightHero.trigger();
    },
    subpageScript: () => {
      subpageHero.trigger();
    },
    hiwScript: () => {
      howPrinciples.trigger();
      howTesti.trigger();
    },
    insightDetailScript: () => {
      insightDetailHero.trigger();
      insightDetailBlog.trigger();
    },
    caseStudyScript: () => {
      caseStudyHero.trigger();
    },
     csDetailScript: () => {
      csDetailHero.trigger();
      csDetailBlog.trigger();
    },
    cohostScript: () => {
      cohostHow.trigger();
    }
  };
  const initGlobal = () => {
    cursor.init();
    header.trigger();
    homeCta.trigger();
    footer.trigger();
    const pageName = $(".main").attr("data-barba-namespace");
    if (pageName) {
      SCRIPT[`${pageName}Script`]();
    }
    // header.toggleOnScroll(lenis);
    // header.toggleColorMode('white');
    header.toggleColorMode("blue");
    lenis.on("scroll", function (inst) {
      header.toggleColorMode("blue");
      // header.toggleHide(inst);
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
