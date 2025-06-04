//init scollmain

const main = () => {
  if (window.isDev) return;
  window.isDev = true;
  $("input[required], select[required]").attr("oninvalid", "this.setCustomValidity('Vui lòng nhập thông tin')");
  $("input[required], select[required]").attr("oninput", "setCustomValidity('')");
  const addForceEventListener = (type, cb,) => {
    window.addEventListener(type, cb);
    if (window.registeredEvent && window.registeredEvent[type]) {
      window.removeEventListener(type, window.registeredEvent[type].eventFunc);
    }
    window.registeredEvent = {
      ...(window.registeredEvent || {}),
      [type]: {
        eventFunc: cb,
      },
    };
    return;
  }

  const removeAllForceEventListener = () => {
    if (!window.registeredEvent) return;
    Object.keys(window.registeredEvent).forEach((type) => {
      window.removeEventListener(type, window.registeredEvent[type].eventFunc)
    })
    window.registeredEvent = {};
  }

  window.addForceEventListener = addForceEventListener;
  window.removeAllForceEventListener = removeAllForceEventListener;

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

  function detechDevice() {
    const windowWidth = $(window).width();
    const isMobile = windowWidth < 769;
    const isTablet = windowWidth < 992;
    const isDesktop = windowWidth > 991;
    if (isMobile) {
      animProps.scaleLogo = 257 / 151;
      animProps.marginHomeHeroTitle = 120;
      return 'mobile';
    }
    if (isTablet) {
      animProps.scaleLogo = 500 / 151;
      animProps.marginHomeHeroTitle = 160;
      return 'tablet';
    }
    if (isDesktop) {
      animProps.scaleLogo = 755 / 151;
      animProps.marginHomeHeroTitle = 218;
      return 'desktop';
    }
  }

  function uploadFile(file, folder) {
    // https://script.google.com/macros/s/AKfycbxgNkKGjXAbBTuKWhFHqI7H8exMhvogXDm7XKejDvdanYbEKM7Na6QJQZD4zzm2ThtldA/exec
    const idScript = 'AKfycbxgNkKGjXAbBTuKWhFHqI7H8exMhvogXDm7XKejDvdanYbEKM7Na6QJQZD4zzm2ThtldA'
    const endpoint = `https://script.google.com/macros/s/${idScript}/exec`
    return new Promise((res, rej) => {
      if (!file) res({});
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        const rawLog = reader.result.split(',')[1];
        const dataSend = {
          dataReq: {
            data: rawLog,
            name: file.name,
            type: file.type,
            folderName: folder
          },
          fname: "uploadFilesToGoogleDrive"
        };
        fetch(endpoint, { method: "POST", body: JSON.stringify(dataSend) })
          .then(res => res.json()).then((a) => {
            res(a)
          }).catch(e => rej(e))
      }
    })
  }

  let isLockedScroll = false;

  function lockScroll() {
    const device = detechDevice();

    if (device === 'desktop') return;
    if (isLockedScroll) return;

    isLockedScroll = true;
    console.log('lockScroll')
    $html = $('html');
    $body = $('body');
    let initWidth = $body.outerWidth();
    let initHeight = $body.outerHeight();

    let scrollPosition = [
      self.pageXOffset ||
      document.documentElement.scrollLeft ||
      document.body.scrollLeft,
      self.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop,
    ];

    $html.data('scroll-position', scrollPosition);
    $html.data('previous-overflow', $html.css('overflow'));
    $html.css('overflow', 'hidden');
    // window.scrollTo(scrollPosition[0], scrollPosition[1]);

    let marginR = $body.outerWidth() - initWidth;
    let marginB = $body.outerHeight() - initHeight;

    // $body.addClass('lock-scroll');
    $body.css({ 'margin-right': marginR, 'margin-bottom': marginB });
  }

  function unlockScroll() {
    const device = detechDevice();
    console.log(device, isLockedScroll)

    if (device === 'desktop') return;
    if (!isLockedScroll) return;

    isLockedScroll = false;
    console.log('unlockScroll')
    $html = $('html');
    $body = $('body');
    $html.css('overflow', $html.data('previous-overflow'));
    let scrollPosition = $html.data('scroll-position');
    // window.scrollTo(scrollPosition[0], scrollPosition[1]);

    // $body.removeClass('lock-scroll');
    $body.css({ 'margin-right': 0, 'margin-bottom': 0 });
  }

  let drawSVG = {
    homeAbodosVi: 'https://uploads-ssl.webflow.com/62296e664b543c8690a15ab5/624185eda3fe3b53a666fa39_home-abodos-vi.svg.txt',
    homeProj: 'https://uploads-ssl.webflow.com/62296e664b543c8690a15ab5/624185ed6a2a9a1034453167_home-project-vi.svg.txt',
    homeProjVi: 'https://uploads-ssl.webflow.com/62296e664b543c8690a15ab5/624185ed6a2a9a1034453167_home-project-vi.svg.txt',
    homeProjEn: 'https://uploads-ssl.webflow.com/62296e664b543c8690a15ab5/6241891c36358430a07a4fd4_home-project-en.svg.txt',
    aboutAbodosVi: 'https://uploads-ssl.webflow.com/62296e664b543c8690a15ab5/62418c28ea248ce2bccb1f0d_about-abodos-vi.svg.txt',
    projDetailFaci: 'https://uploads-ssl.webflow.com/62296e664b543c8690a15ab5/62555f64534e7807be6ae19d_draw-ultility.svg.txt',
    projDetailFaciVi: 'https://uploads-ssl.webflow.com/62296e664b543c8690a15ab5/62555f64534e7807be6ae19d_draw-ultility.svg.txt',
    projDetailFaciEn: 'https://uploads-ssl.webflow.com/62296e664b543c8690a15ab5/62a83efa2723ea3068844684_draw-ult-en.svg.txt'
  }

  let animProps = {
    scaleLogo: 1,
    marginHomeHeroTitle: 218
  }

  //Scrolltrigger with smooth scroll
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
  let curAnimDone = 0;
  let scrolled = false;
  let doneHomeScript = false;
  $('.page-trans-wrap').css('z-index', '1001');
  let pathW = $(window).width();
  let pathH = $(window).height();
  let homeVid = document.querySelector('#homeVid');
  function detectHome() {

  }
  function mapFormToObject(ele) {
    return (parsedFormData = [...new FormData(ele).entries()].reduce(
      (prev, cur) => {
        const name = cur[0];
        const val = cur[1];
        return { ...prev, [name]: val };
      },
      {}
    ));
  }

  function contactForm() {
    $('.form-success-wrap').removeClass('hidden');

    function handleSubmit() {
      $('.contact-form').on('submit', (e) => {
        e.preventDefault();
        const formObject = mapFormToObject(e.target);
        const data = {
          fields: [
            {
              name: 'firstname',
              value: formObject.name,
            },
            {
              name: 'email',
              value: formObject.email,
            },
            {
              name: 'phone',
              value: formObject.phone,
            },
            {
              name: 'needs',
              value: formObject.message,
            }
          ],
          context: {
            pageUri: window.location.href,
            pageName: 'Contact Page',
          },
        };
        const sendSubmitURL = `https://api.hsforms.com/submissions/v3/integration/submit/21700290/17abaada-1755-4965-9443-295cbadb27c8`;
        const final_data = JSON.stringify(data);
        $.ajax({
          url: sendSubmitURL,
          method: 'POST',
          data: final_data,
          dataType: 'json',
          headers: {
            accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          contentType: 'application/json',
          success: function (response) {
            formSuccess();
            console.log('done');
          },
          error: function (error) {
            let errors = error.responseJSON.errors;
            for (x = 0; x < errors.length; x++) {
              let errType = errors[x].errorType
              if (errType == 'BLOCKED_EMAIL' || errType == 'INVALID_EMAIL') {
                alert('Try again with a valid email');
                return;
              } else if (errType == 'NUMBER_OUT_OF_RANGE') {
                alert('Try again with a valid phone number');
                return;
              }
            }
          },
        });
      });
    }
    handleSubmit();

    $('.success-close').on('click', (e) => {
      e.preventDefault();
      $('.success-content-wrap').removeClass('show');
    })

    function formSuccess() {
      $('.success-content-wrap').addClass('show');
      setTimeout(() => {
        $('.success-content-wrap').removeClass('show');
      }, 5000);
    }
    function inputCheck(ele) {
      let parent = ele.parent();
      let value = ele.val();
      if (value != '') {
        parent.addClass('filled');
      } else {
        parent.removeClass('filled');
      }
    }
    $('.contact-form-input, .contact-form-textarea').on('keyup change focus blur', (e) => {
      inputCheck($(e.target));
    })
    $("textarea").each(function () {
      this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
      this.setAttribute("rows", "2");
    }).on("input", function () {
      this.style.height = "auto";
      this.style.height = (this.scrollHeight) + "px";
    });
  }


  function setMarginTopCetner(ele) {
    const h = $(ele).height();
    const hWindow = $(window).height();

    const marginTop = (hWindow - h) / 2;
    $(ele).css({ marginTop: `${marginTop}px` })
  }

  function getMarginTopCetner(ele) {
    const h = $(ele).height();
    const hWindow = $(window).height();

    const marginTop = (hWindow - h) / 2;
    return marginTop
  }

  //on scroll
  function hideHeader() {
    console.log('hide header init')
    let lastScroll = 0;
    const footer = document.querySelector('.footer');

    if (detechDevice() === 'desktop') {
      scrollmain.on("scroll", (inst) => {
        if ($('.contactpage').length) {
          return;
        }
        if ((inst.limit - inst.scroll.y) <= 170) {
          $('.header').addClass('scrollup')
        } else {
          $('.header').removeClass('scrollup')
        }
      });
    } else {
      window.addForceEventListener('scroll', (e) => {
        const hasScrolledUp = lastScroll < window.scrollY;

        const top = footer.getBoundingClientRect().top;
        if ($('.contactpage').length) {
          return;
        }
        if (lastScroll < window.scrollY && window.scrollY > $('.header').height()) {
          $('.header').addClass('scrollup')
        } else {
          if (lastScroll > window.scrollY)
            $('.header').removeClass('scrollup')
        }
        lastScroll = window.scrollY;
      });
    }
  };
  hideHeader();

  //Page Transition animation
  let transitionLeavePage = (data) => {
    const currentContainer = data.current.container;
    console.log("leavingTransition");
    pathW = $(window).width();
    pathH = $(window).height();
    const tlLeave = gsap.timeline();
    tlLeave.set(".page-trans-wrap", { autoAlpha: 1, 'clip-path': `path('m 0 ${pathH * 2} v -${pathH / 2} q ${pathW / 2} -${pathH / 2} ${pathW} 0 v ${pathH / 2} z')` })
      .set(".page-trans-main", { autoAlpha: 1 }, 0)
      .set(".page-trans-mask", { autoAlpha: 0 }, 0)
      //.fromTo(currentContainer, { y: '0px', duration: 0.8 }, { y: '-200px' })
      .fromTo(
        ".page-trans-wrap",
        { 'clip-path': `path('m 0 ${pathH * 2} v -${pathH / 2} q ${pathW / 2} -${pathH / 2} ${pathW} 0 v ${pathH / 2} z')`, duration: 0.8, delay: 0.2, ease: 'power2.in' },
        { 'clip-path': `path('m 0 ${pathH * 2} v -${pathH * 2} q ${pathW / 2} 0 ${pathW} 0 v ${pathH * 2} z')` },
        0
      )
      .to(
        ".page-trans-mask",
        { autoAlpha: 1, duration: 0.6, delay: 0.2 },
        0
      )
    return tlLeave;
  };

  // 'clip-path': `path('m 0 -${pH} v ${pH / 2} q ${pW / 2} ${pH} ${pW} 0 v -${pH / 2} z')`
  // 'clip-path': `path('m 0 -${pH} v ${pH * 2} q ${pW / 2} 0 ${pW} 0 v -${pH * 2} z)`
  let transitionEnterPage = (data) => {
    const nextContainer = data.next.container;
    pathW = $(window).width();
    pathH = $(window).height();
    console.log("enteringTransition");
    const tlEnter = gsap.timeline({
      delay: 1,
    });
    tlEnter.set('.page-trans-wrap', { 'clip-path': `path('m 0 -${pathH} v ${pathH * 2} q ${pathW / 2} 0 ${pathW} 0 v -${pathH * 2} z')` })
      .to(".page-trans-wrap", { 'clip-path': `path('m 0 -${pathH} v ${pathH / 2} q ${pathW / 2} ${pathH} ${pathW} 0 v -${pathH / 2} z')`, duration: 0.6 }, 0)
      .to(
        ".page-trans-mask",
        { autoAlpha: 0, duration: 0.6, ease: 'power2.out', delay: -0.2 },
        0
      )
      //.from(nextContainer, { y: '200', duration: 0.8, delay: -0.2 }, 0)
      .set(".page-trans-wrap", { autoAlpha: 0, 'clip-path': `path('m 0 ${pathH * 2} v -${pathH / 2} q ${pathW / 2} -${pathH / 2} ${pathW} 0 v ${pathH / 2} z')` })
      .set(".page-trans-mask", { autoAlpha: 0, });
    return tlEnter;
  };

  //barba hooks
  barba.hooks.before(() => {
  });
  barba.hooks.leave(() => {
    window.fsAttributes = null;
  })
  barba.hooks.after((data) => {
  });
  //barba init
  barba.init({
    sync: true,
    timeout: 5000,
    transitions: [
      {
        once(data) {
          detectLinks(data.next.namespace);
          console.log("Once barba: ", data.next.namespace);
          detectLang(data.next.namespace);
          if (data.next.namespace == 'home') {
            gsap.to('.cursor-main', { autoAlpha: 0, duration: 1, delay: 2 });
            console.log('play-intro');
            homeIntro();
            //homedev();
          } else {
            resetHeader();
          }
        },
        async afterLeave(data) {
          //when leave
          const done = this.async();
          window.removeAllForceEventListener();
          $('.menu-toggle').removeClass('active');
          $('.menu-wrap').removeClass('active');
          animCloseMenu(pathW, pathH);
          const tlafter = transitionLeavePage(data);
          tlafter.then(() => {
            done();
          });
        },
        async enter(data) {
          //when enter
          window.scrollTo(0, 0);
          $('.cursor-main').removeClass('active');
          detectLang(data.next.namespace);
          const tlEnter = transitionEnterPage(data);
          tlEnter.then(() => {
            detectLinks(data.next.namespace)
            hideHeader();
          });

          scrollmain.scrollTo(0, 0);
          // $('.wrapper').imagesLoaded(function () {
          //   scrollmain.update();
          //   console.log('All img are loaded');
          // });
          if (data.next.namespace == 'home') {
            transToHome();
          } else {
            $('.load-wrap').addClass('hidden');
            resetHeader();
          }
        },
        async beforeEnter(data) {
          scrollmain.destroy();
          scrollmain.init();
        },
        async after(data) {
          if (data.next.namespace == 'home') {
            let triggers = ScrollTrigger.getAll();
            triggers.forEach(trigger => {
              trigger.kill();
            });
          }

          scrollmain.update();
          if (data.next.namespace == 'home') {
            scrollmain.stop();
            lockScroll();
            $('.c-scrollbar').addClass('hide')
          }
          let curPage = data.current.namespace;
          if (curPage == 'home') {
            doneHomeScript = false;
          }
        }
      },
    ],
    views: [
      {
        namespace: "home",
        beforeEnter() {

        },
        beforeLeave() {

        },
      },
      {
        namespace: "about",
        beforeEnter() {
          gsap.to('.cursor-main', { autoAlpha: 1, duration: 1, delay: 2 });
          aboutScript();
        },
        afterEnter() {
        },
      },
      {
        namespace: "projects",
        beforeEnter() {
          gsap.to('.cursor-main', { autoAlpha: 1, duration: 1, delay: 2 });
          projectsScript();
        },
      },
      {
        namespace: "project-detail",
        beforeEnter() {
          gsap.to('.cursor-main', { autoAlpha: 1, duration: 1, delay: 2 });
          projdetailScript();
          detechDevice() === 'desktop' && $('.form-success-wrap').addClass('hidden');
        },
        afterEnter() { },
        beforeLeave() {
          $('.success-content-wrap').removeClass('show');
        },
      },
      {
        namespace: "contact",
        beforeEnter() {
          gsap.to('.cursor-main', { autoAlpha: 1, duration: 1, delay: 2 });
          contactScript();
        },
        afterEnter() { },
        beforeLeave() {
          $('.success-content-wrap').removeClass('show');
        },
      },
      {
        namespace: "blog",
        beforeEnter() {
          gsap.to('.cursor-main', { autoAlpha: 1, duration: 1, delay: 2 });
          blogScript();
        },
        afterEnter() { },
        beforeLeave() {
          $('.success-content-wrap').removeClass('show')
        }
      },
      {
        namespace: "blogdtl",
        beforeEnter() {
          gsap.to('.cursor-main', { autoAlpha: 1, duration: 1, delay: 2 });
          blogdtlScript();
        },
        afterEnter() { },
        beforeLeave() {
          $('.success-content-wrap').removeClass('show')
        }
      },
      {
        namespace: "gallery",
        beforeEnter() {
          gsap.to('.cursor-main', { autoAlpha: 1, duration: 1, delay: 2 });
          galleryScript();
        },
        afterEnter() { },
        beforeLeave() {
          $('.success-content-wrap').removeClass('show')
        }
      },
      {
        namespace: "news",
        beforeEnter() {
          gsap.to('.cursor-main', { autoAlpha: 1, duration: 1, delay: 2 });
          newsScript();
        },
        afterEnter() { },
        beforeLeave() {
          $('.success-content-wrap').removeClass('show')
        }
      },
      {
        namespace: "newsdtl",
        beforeEnter() {
          gsap.to('.cursor-main', { autoAlpha: 1, duration: 1, delay: 2 });
          newsdtlScript();
        },
        afterEnter() { },
        beforeLeave() {
          $('.success-content-wrap').removeClass('show')
        }
      },
      {
        namespace: "job",
        beforeEnter() {
          gsap.to('.cursor-main', { autoAlpha: 1, duration: 1, delay: 2 });
          jobScript();
        },
        afterEnter() { },
        beforeLeave() {
          $('.success-content-wrap').removeClass('show')
        }
      },
      {
        namespace: "author",
        beforeEnter() {
          gsap.to('.cursor-main', { autoAlpha: 1, duration: 1, delay: 2 });
          authorScript();
        },
        afterEnter() { },
        beforeLeave() {
          $('.success-content-wrap').removeClass('show')
        }
      }
    ],
  });
  function homedev() {
    resetHeader();
    transToHome();
  }
  // Detect Page and Link
  function clearActive() {
    $('[data-link]').addClass('link-hover');
    $('[data-link]').removeClass('active');
  }
  function detectLinks(curPage) {
    clearActive();
    $(`[data-link="${curPage}"]`).addClass('active');
    $(`[data-link="${curPage}"]`).removeClass('link-hover');
  }
  function detectLang(curPage) {
    let path = window.location.pathname;
    let lang = path.slice(1, 3);
    $('[data-lang]').removeClass('active');
    if (lang == 'vi' || lang == '' || lang != 'en') {
      console.log('vietnamese');
      drawSVG.homeProj = drawSVG.homeProjVi;
      drawSVG.projDetailFaci = drawSVG.projDetailFaciVi;
      $('[data-lang="vi"]').addClass('active');
      langChangeContent('vi');
      langChangeLink('vi');
      langCurPageChange(curPage);
    } else if (lang == 'en') {
      console.log('english');
      drawSVG.homeProj = drawSVG.homeProj;
      drawSVG.projDetailFaci = drawSVG.projDetailFaciVi;
      $('[data-lang="en"]').addClass('active');
      langChangeContent('en');
      langChangeLink('en');
      langCurPageChange(curPage);
    }
  };

  function langCurPageChange(curPage) {
    let langEle = {
      vi: $('[data-lang="vi"]'),
      en: $('[data-lang="en"]')
    }
    // Switch lang if on tablet or mobile
    const device = detechDevice();
    if (device === 'tablet' || device === 'mobile') {
      langEle = {
        vi: $('[data-lang="en"]'),
        en: $('[data-lang="vi"]')
      }
    }

    if (curPage == 'home') {
      langEle.vi.attr('href', '/')
      langEle.en.attr('href', '/en/home')
    } else if (curPage == 'about') {
      langEle.vi.attr('href', '/about-us')
      langEle.en.attr('href', '/en/about-us')
    } else if (curPage == 'contact') {
      langEle.vi.attr('href', '/contact')
      langEle.en.attr('href', '/en/contact')
    } else if (curPage == 'project-detail') {
      const pathName = window.location.pathname;
      const slugProjDetail = pathName.split('/')[2];
      langEle.vi.attr('href', `/vi-projects/${slugProjDetail}`)
      langEle.en.attr('href', `/en-projects/${slugProjDetail}`)
    }

    if (curPage == 'contact') {
      $('.body').addClass('mod-contact');
    } else {
      $('.body').removeClass('mod-contact');
    }

  }

  function langChangeContent(curLang) {
    if (curLang == 'vi') {
      $('.logo-slogan').text('Để tự nhiên dẫn lối');
      $('.logo-slogan').removeClass('mod-en')
      $('.logo-slogan').addClass('mod-vi')
      $('.ft-logo-slogan').text('Để tự nhiên dẫn lối');
      $('.ft-logo-slogan').removeClass('mod-en')
      $('.ft-logo-slogan').addClass('mod-vi')
      $('.load-wrap .sc-home-vid-title-1').text('Mang đến những trải nghiệm du lịch đáng giá nhất Việt Nam');
      $('.load-wrap .sc-home-vid-title-2').text('Tôn vinh, bảo tồn vẻ đẹp tự nhiên và bản sắc từng vùng đất');
      $('.footer .ft-title').text('Tôn vinh, bảo tồn vẻ đẹp tự nhiên và bản sắc từng vùng đất');
      $('.footer .ft-contact-label').text('Liên hệ với chúng tôi:');
      $('.ft-add-txt').text('406 Ung Văn Khiêm, P.25, Q. Bình Thạnh, TP. Hồ Chí Minh');
      $('.menu-toggle-text').text('Danh mục');
      $('.menu-toggle-text-close').text('Đóng');
      $('.italic-projdetail-ult').text('đặc quyền');

    } else if (curLang == 'en') {
      $('.logo-slogan').text('Inspiration comes naturally');
      $('.logo-slogan').removeClass('mod-vi')
      $('.logo-slogan').addClass('mod-en')
      $('.ft-logo-slogan').text('Inspiration comes naturally');
      $('.ft-logo-slogan').removeClass('mod-en')
      $('.ft-logo-slogan').addClass('mod-vi')
      $('.load-wrap .sc-home-vid-title-1').text('Respect and preserve the natural beauty and identity of each land');
      $('.load-wrap .sc-home-vid-title-2').text('Making the most attractive travel experience in Vietnam.');
      $('.footer .ft-title').text('A Combination of Nature with Luxury Service');
      $('.footer .ft-contact-label').text('Connect with us:');
      $('.ft-add-txt').text('406 Ung Van Khiem, Ward 25, Binh Thanh, Ho Chi Minh City');
      $('.menu-toggle-text').text('Menu');
      $('.menu-toggle-text-close').text('Close');
      $('.italic-projdetail-ult').text('Amenites');
    }
  }
  function langChangeLink(curLang) {
    if (curLang == 'vi') {
      $('.header-logo-wrap').attr('href', '/')
      $('a[data-link="home"]').attr('href', '/')
      $('a[data-link="liv"]').attr('href', '/vi-projects/liv-village-cuc-phuong')
      $('a[data-link="about"]').attr('href', '/about-us')
      $('a[data-link="projects"]').attr('href', '/projects')
      $('a[data-link="contact"]').attr('href', '/contact')
      $('a[data-link="news"]').attr('href', '/news')
      $('a[data-link="gallery"]').attr('href', '/gallery')
      $('a[data-link="career"]').attr('href', '/careers')
      $('.text-call').text('Liên hệ')

      $('a[data-link="home"]').find('.menu-txt-link').text('Trang chủ');
      $('a[data-link="about"]').find('.menu-txt-link').text('Về Abodos');
      $('a[data-link="projects"]').find('.menu-txt-link').text('Dự án');
      $('a[data-link="gallery"]').find('.menu-txt-link').text('Thư Viện');
      $('a[data-link="news"]').find('.menu-txt-link').text('Tin Tức');
      $('a[data-link="career"]').find('.menu-txt-link').text('Tuyển Dụng');
      $('a[data-link="contact"]').find('.menu-txt-link').text('Liên hệ');

      $('a.ft-menu-link[data-link="home"]').text('Trang chủ');
      $('a.ft-menu-link[data-link="about"]').text('Về Abodos');
      $('a.ft-menu-link[data-link="projects"]').text('Dự án');
      $('a.ft-menu-link[data-link="gallery"]').text('Thư Viện');
      $('a.ft-menu-link[data-link="news"]').text('Tin Tức');
      $('a.ft-menu-link[data-link="career"]').text('Tuyển Dụng');
      $('a.ft-menu-link[data-link="contact"]').text('Liên hệ');
    } else if (curLang == 'en') {
      $('.header-logo-wrap').attr('href', '/en/home')
      $('a[data-link="home"]').attr('href', '/en/home')
      $('a[data-link="liv"]').attr('href', '/en-projects/liv-village-cuc-phuong')
      $('a[data-link="about"]').attr('href', '/en/about-us')
      $('a[data-link="projects"]').attr('href', '/en/projects')
      $('a[data-link="contact"]').attr('href', '/en/contact')
      $('a[data-link="news"]').attr('href', '/news')
      $('a[data-link="gallery"]').attr('href', '/gallery')
      $('a[data-link="career"]').attr('href', '/careers')
      $('.text-call').text('Call us')

      $('a[data-link="home"]').find('.menu-txt-link').text('Home');
      $('a[data-link="about"]').find('.menu-txt-link').text('About');
      $('a[data-link="projects"]').find('.menu-txt-link').text('Projects');
      $('a[data-link="gallery"]').find('.menu-txt-link').text('Gallery');
      $('a[data-link="news"]').find('.menu-txt-link').text('News');
      $('a[data-link="career"]').find('.menu-txt-link').text('Careers');
      $('a[data-link="contact"]').find('.menu-txt-link').text('Contact');

      $('a.ft-menu-link[data-link="home"]').text('Home');
      $('a.ft-menu-link[data-link="about"]').text('About');
      $('a.ft-menu-link[data-link="projects"]').text('Projects');
      $('a.ft-menu-link[data-link="gallery"]').text('Gallery');
      $('a.ft-menu-link[data-link="news"]').text('News');
      $('a.ft-menu-link[data-link="career"]').text('Careers');
      $('a.ft-menu-link[data-link="contact"]').text('Contact');
    }
  }

  //magic cursor
  function initMagicMouse() {
    const cursor = $(".cursor-main");

    gsap.set(cursor, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.2;

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");

    window.addEventListener("pointermove", e => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    gsap.ticker.add(() => {

      // adjust speed for higher refresh monitors
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    });
  }
  initMagicMouse();

  function handleSlideMagicMouse(className) {
    const hoveredEle = $(className);
    hoveredEle.hover(() => {
      $('.cursor-main').addClass('active');
    }, () => {
      $('.cursor-main').removeClass('active');
    })
  }


  //Handle Layout;
  $('.menu-wrap').removeClass('hidden');
  $('.cursor-wrap').css('z-index', '1002');

  //Header Handle
  function headerHandle() {
    gsap.set('.menu-wrap', { 'clip-path': `path('m 0 -${pathH} v ${pathH / 2} q ${pathW / 2} ${pathH} ${pathW} 0 v -${pathH / 2} z')` });

    $('.menu-toggle').on('click', (e) => {
      e.preventDefault();
      pathW = $(window).width();
      pathH = $(window).height();
      if ($(e.target).hasClass('active')) {
        animCloseMenu(pathW, pathH);
      } else {
        animOpenMenu(pathW, pathH);
      }
    })
  };
  headerHandle();
  function animOpenMenu(pW, pH) {
    lockScroll();
    $('.menu-toggle').addClass('active');
    //gsap.to('#bodyWrap', { y: '200px', duration: .9, ease: 'easeAnim1' });
    $('.menu-wrap').addClass('active');
    gsap.set('.menu-wrap', { 'clip-path': `path('m 0 -${pH} v ${pH / 2} q ${pW / 2} ${pH} ${pW} 0 v -${pH / 2} z')` });
    gsap.to('.menu-wrap', { 'clip-path': `path('m 0 -${pH} v ${pH * 2} q ${pW / 2} 0 ${pW} 0 v -${pH * 2} z`, duration: 1, ease: 'easeAnim1' });
    gsap.from('.menu-link-wrap .menu-link', { y: '-100%', autoAlpha: 0, duration: .6, stagger: .05, clearProps: 'all', delay: .3, ease: 'easeAnim1' })
  }
  function animCloseMenu(pW, pH) {
    console.log('closemenu')
    unlockScroll();
    $('.menu-toggle').removeClass('active');
    $('.menu-wrap').removeClass('active');
    gsap.to('.menu-wrap', { 'clip-path': `path('m 0 -${pH} v ${pH / 2} q ${pW / 2} ${pH} ${pW} 0 v -${pH / 2} z')`, duration: 1, ease: 'easeAnim1' });
    //gsap.fromTo('#bodyWrap', { y: '200px', duration: .9, clearProps: 'all', ease: 'easeAnim1' }, { y: '0px' })
    gsap.set('.menu-link-wrap .menu-link', { y: '0px', autoAlpha: 1 })
    gsap.to('.menu-link-wrap .menu-link', { y: '-100%', autoAlpha: 0, duration: .6, stagger: -.05, clearProps: 'all', ease: 'easeAnim1' })
  }

  // Create Home animations

  CustomEase.create("easeAnim1", ".5,-0.01,.38,.99");
  function loadAnim1() {
    scrolled = true;
    const tlAnim1 = new gsap.timeline({
      onComplete: () => {
        $('.header-logo-wrap').removeClass('hidden');
        setTimeout(() => {
          $('.load-logo-wrap').css('opacity', 0);
          $('.logo-slogan').addClass('show');
        }, 200)
        gsap.to('.cursor-main', { autoAlpha: 1, duration: 1, delay: 2 });
        scrolled = false;
        setTimeout(() => {
          loadAnim2();
          homeVid.play();
        }, 1600)
      }
    });
    tlAnim1.to('.logo-letter.logo-letter-1', { autoAlpha: 1, scale: 1, duration: .4, delay: .5, ease: Power1.easeIn })
      .to('.logo-letter.logo-letter-1', { autoAlpha: 0, duration: .2 })
      .to('.logo-letter.logo-letter-2', { autoAlpha: 1, scale: 1, duration: .4, ease: Power1.easeIn }, "-=0.2")
      .to('.logo-letter.logo-letter-2', { autoAlpha: 0, duration: .2 })
      .to('.logo-letter.logo-letter-3', { autoAlpha: 1, scale: 1, duration: .4, ease: Power1.easeIn }, "-=0.2")
      .to('.logo-letter.logo-letter-3', { autoAlpha: 0, duration: .2 })
      .to('.logo-letter.logo-letter-4', { autoAlpha: 1, scale: 1, duration: .4, ease: Power1.easeIn }, "-=0.2")
      .to('.logo-letter.logo-letter-4', { autoAlpha: 0, duration: .2 })
      .to('.logo-letter.logo-letter-5', { autoAlpha: 1, scale: 1, duration: .4, ease: Power1.easeIn }, "-=0.2")
      .to('.logo-letter.logo-letter-5', { autoAlpha: 0, duration: .2 })
      .to('.logo-letter.logo-letter-6', { autoAlpha: 1, scale: 1, duration: .4, ease: Power1.easeIn }, "-=0.2")
      .to('.logo-letter.logo-letter-1', { autoAlpha: 1, left: '8px', duration: .6, ease: "easeAnim1", delay: .2 })
      .to('.logo-letter.logo-letter-2', { autoAlpha: 1, left: '140px', duration: .6, ease: "easeAnim1" }, '<')
      .to('.logo-letter.logo-letter-3', { autoAlpha: 1, left: '247px', duration: .6, ease: "easeAnim1" }, '<')
      .to('.logo-letter.logo-letter-4', { autoAlpha: 1, left: '376px', duration: .6, ease: "easeAnim1" }, '<')
      .to('.logo-letter.logo-letter-5', { autoAlpha: 1, left: '493px', duration: .6, ease: "easeAnim1" }, '<')
      .to('.logo-letter.logo-letter-6', { autoAlpha: 1, left: '622px', duration: .6, ease: "easeAnim1" }, '<')
  }

  function loadAnim2() {
    scrolled = true;
    const tlAnim2 = gsap.timeline({
      onComplete: () => {
        curAnimDone = 2;
        scrolled = false;
      }
    })
    let propCenter = getMarginTopCetner('.sc-home-vid-title-2') - animProps.marginHomeHeroTitle;
    const hHeader = $('.header').height();
    // tlAnim2.to('.load-wrap .header-fake', { height: `${hHeader}px`, duration: 1, ease: "easeAnim1" })
    //   .to('.load-wrap .header-fake .header-logo-wrap', { scale: 1, duration: 1, ease: "easeAnim1" }, 0)
    //   .to('.sc-home-vid-title-1', { y: '0px', autoAlpha: 1, duration: .6 }, '-=0.1');
    tlAnim2.to('.load-wrap .header-fake', { height: `${hHeader}px`, duration: 1, ease: "easeAnim1" })
      .to('.load-wrap .header-fake .header-logo-wrap', { scale: 1, duration: 1, ease: "easeAnim1" }, 0)
      .fromTo('.sc-home-vid-title-1', { y: propCenter + 50, autoAlpha: 0, duration: .8 }, { y: propCenter, autoAlpha: 1 })

    $('.video-wrap').removeClass('hidden');
    setTimeout(() => {
      $('.header').addClass('show');
      $('.header-fake').addClass('show');
    }, 1000)
    setTimeout(() => {
      $('.load-btn-wrap').addClass('active');
    }, 1000);
  }

  function loadAnim3() {
    scrolled = true;
    const tlAnim3 = gsap.timeline({
      onComplete: () => {
        curAnimDone = 3;
        scrolled = false;
      }
    })
    let propCenter = getMarginTopCetner('.sc-home-vid-title-2') - animProps.marginHomeHeroTitle;
    // tlAnim3.to('.sc-home-vid-title-1', { y: '-50px', autoAlpha: 0, duration: .8 })
    //   .to('.sc-home-vid-title-2', { y: '0px', autoAlpha: 1, duration: .8 }, '-=.4');
    tlAnim3.fromTo('.sc-home-vid-title-1', { y: propCenter, autoAlpha: 1, duration: .8 }, { y: propCenter - 50, autoAlpha: 0 })
      .fromTo('.sc-home-vid-title-2', { y: propCenter + 50, duration: .8, autoAlpha: 0 }, { y: propCenter, autoAlpha: 1 })

    $('.video-wrap').addClass('widden');
    $('.vid-overlay').css('opacity', '0');
  }

  function loadAnim3Rev() {
    scrolled = true;
    const tlAnim3Rev = gsap.timeline({
      onComplete: () => {
        curAnimDone = 2;
        scrolled = false;
      }
    })
    let propCenter = getMarginTopCetner('.sc-home-vid-title-2') - animProps.marginHomeHeroTitle;
    // tlAnim3Rev.to('.sc-home-vid-title-2', { y: '50px', autoAlpha: 0, duration: .8 })
    //   .to('.sc-home-vid-title-1', { y: '0', autoAlpha: 1, duration: .8 }, '-=.4')
    tlAnim3Rev.fromTo('.sc-home-vid-title-2', { y: propCenter, duration: .8, autoAlpha: 1 }, { y: propCenter + 50, autoAlpha: 0 })
      .fromTo('.sc-home-vid-title-1', { y: propCenter - 50, autoAlpha: 0, duration: .8 }, { y: propCenter, autoAlpha: 1 })
    $('.video-wrap').removeClass('widden');
    $('.vid-overlay').css('opacity', '1');
  }

  function loadAnim4() {
    scrolled = true;

    const tlAnim4 = gsap.timeline({
      onComplete: () => {
        curAnimDone = 4;
        scrolled = false;
        scrollmain.start();
        unlockScroll();
        $('.c-scrollbar').removeClass('hide')
        scrollmain.update();
        $('.main').removeClass('inactive');
        $('.main').addClass('active');
        //$('.load-wrap').addClass('hidden');
        homeVid.pause();
        console.log('load anim 4')
        homeScript();
      }
    })
    $('.load-wrap').addClass('collapse');
    let propCenter = getMarginTopCetner('.sc-home-vid-title-2') - animProps.marginHomeHeroTitle;
    // tlAnim4.to('.sc-home-vid-title-2', { marginTop: animProps.marginHomeHeroTitle, duration: 1, ease: "easeAnim1" })
    //   .to('.sc-home-hero-title', { marginTop: animProps.marginHomeHeroTitle, duration: 1, ease: "easeAnim1" }, 0);
    tlAnim4.fromTo('.sc-home-vid-title-2', { y: propCenter, duration: 1, ease: "easeAnim1" }, { y: 0 })
      .fromTo('.sc-home-hero-title', { y: propCenter, duration: 1, ease: "easeAnim1" }, { y: 0 }, '0')
      .fromTo('.sc-home-hero-sub', { y: propCenter, duration: 1, ease: "easeAnim1" }, { y: 0 }, '0')
      .fromTo('.sc-home-hero .text-link', { y: propCenter, duration: 1, ease: "easeAnim1" }, { y: 0 }, '0')
      .fromTo('.sc-home-why-bg', { y: propCenter, duration: 1, ease: "easeAnim1" }, { y: 0 }, '0')
      .fromTo('.sc-home-why', { y: propCenter, duration: 1, ease: "easeAnim1" }, { y: 0 }, '0')
    setTimeout(() => {
      $('.header').addClass('done');
    }, 1000);
  }

  function loadAnim4Rev() {
    homeVid.play();
    const tlAnim4Rev = gsap.timeline({
      onStart: () => {
        scrollmain.stop();
        lockScroll();
        $('.c-scrollbar').addClass('hide');
        console.log('start4Rev');
        scrolled = true;
        $('.main').addClass('inactive');
        $('.main').removeClass('active');
        $('.header').removeClass('done');
      },
      onComplete: () => {
        curAnimDone = 3;
        scrolled = false;
        scrollmain.update();
      }
    })
    $('.load-wrap').removeClass('collapse');
    let propCenter = getMarginTopCetner('.sc-home-vid-title-2') - animProps.marginHomeHeroTitle;
    let midTop = document.documentElement.clientHeight / 2 - 102;
    let midTop1 = getMarginTopCetner('.sc-home-hero-title');
    let midTop2 = getMarginTopCetner('.sc-home-vid-title-2');
    // tlAnim4Rev.fromTo('.sc-home-hero-title', { marginTop: animProps.marginHomeHeroTitle, duration: 1, ease: "easeAnim1" }, { marginTop: `${midTop1}px` })
    //   .fromTo('.sc-home-vid-title-2', { marginTop: animProps.marginHomeHeroTitle, duration: 1, ease: "easeAnim1" }, { marginTop: `${midTop2}px` }, 0);
    tlAnim4Rev.fromTo('.sc-home-vid-title-2', { y: 0, duration: 1, ease: "easeAnim1" }, { y: propCenter })
      .fromTo('.sc-home-hero-title', { y: 0, duration: 1, ease: "easeAnim1" }, { y: propCenter }, '0')
      .fromTo('.sc-home-hero-sub', { y: 0, duration: 1, ease: "easeAnim1" }, { y: propCenter }, '0')
      .fromTo('.sc-home-hero .text-link', { y: 0, duration: 1, ease: "easeAnim1" }, { y: propCenter }, '0')
      .fromTo('.sc-home-why-bg', { y: 0, duration: 1, ease: "easeAnim1" }, { y: propCenter }, '0')
      .fromTo('.sc-home-why', { y: 0, duration: 1, ease: "easeAnim1" }, { y: propCenter }, '0')
  }

  // Home intro
  function homeIntro() {
    let touchPos;
    const handleTouchStart = (e) => {
      touchPos = e.changedTouches[0].clientY;
    };
    const down = () => {
      if (curAnimDone == 1) {
        loadAnim2();
      } else if (curAnimDone == 2) {
        loadAnim3();
      } else if (curAnimDone == 3) {
        loadAnim4();
      } else {
        return;
      }
    }
    const up = () => {
      if (curAnimDone == 3) {
        loadAnim3Rev();
      } else if (curAnimDone == 4) {
        loadAnim4Rev();
      } else {
        return;
      }
    }
    const handleWheelAnim = (event) => {
      if (scrolled) { return; }
      if ($('#bodyWrap').offset().top != '0' || window.scrollY != '0') { return; }
      if (Math.sign(event.deltaY) === 1) {
        down()
      } else if (Math.sign(event.deltaY) === -1) {
        up();
      }

    }
    const handleTouchAnim = (event) => {
      if (scrolled) { return; }
      if ($('#bodyWrap').offset().top != '0' || window.scrollY != '0') { return; }
      console.log('touch');
      let newTouchPos = event.changedTouches[0].clientY;
      if (newTouchPos > touchPos) {
        up();
      }
      if (newTouchPos < touchPos) {
        down()
      }
    }
    gsap.set('.load-wrap .header-fake', { height: '100%' });
    gsap.set('.load-wrap .header-fake .header-logo-wrap', { scale: animProps.scaleLogo });
    $('.load-wrap').removeClass('hidden');
    $('.logo-slogan').removeClass('show');
    // setMarginTopCetner('.sc-home-vid-title-1')
    // setMarginTopCetner('.sc-home-vid-title-2')
    // setMarginTopCetner('.sc-home-hero-title')

    let propCenter = getMarginTopCetner('.sc-home-vid-title-2') - animProps.marginHomeHeroTitle;
    gsap.set('.sc-home-vid-title-1', { y: propCenter })
    gsap.set('.sc-home-vid-title-2', { y: propCenter + 50 })
    gsap.set('.sc-home-hero-title', { y: propCenter })

    scrollmain.stop();
    lockScroll();
    $('.c-scrollbar').addClass('hide');
    loadAnim1();
    window.addForceEventListener("wheel", handleWheelAnim);
    window.addForceEventListener("touchstart", handleTouchStart);
    window.addForceEventListener("touchmove", handleTouchAnim);
    $('.load-btn-wrap').on('click', (e) => {
      if (scrolled) { return; }
      else {
        e.preventDefault();
        if (curAnimDone == 2) {
          loadAnim3();
        } else if (curAnimDone == 3) {
          loadAnim4();
        }
      }
    })
  }

  function transToHome() {
    $('.video-wrap').removeClass('widden');
    $('.load-wrap').removeClass('hidden');
    $('.vid-overlay').css('opacity', '1');
    scrollmain.scrollTo(0, 0);
    window.scrollTo(0, 0);
    scrollmain.stop();
    lockScroll();
    $('.c-scrollbar').addClass('hide');
    $('.main').addClass('inactive');
    $('.main').removeClass('active');
    $('.header').removeClass('done');
    homeVid.play();
    curAnimDone = 2;
    scrolled = false;
    $('.load-wrap').removeClass('collapse');
    // let midTop1 = getMarginTopCetner('.sc-home-hero-title');
    // let midTop2 = getMarginTopCetner('.sc-home-vid-title-2');
    // gsap.set('.sc-home-hero-title', { marginTop: `${midTop1}px`, duration: 1, ease: "easeAnim1" })
    // gsap.set('.sc-home-vid-title-2', { marginTop: `${midTop2}px`, duration: 1, ease: "easeAnim1" }, 0);
    // gsap.set('.sc-home-vid-title-2', { y: '50px', autoAlpha: 0, duration: .8 })
    // gsap.set('.sc-home-vid-title-1', { y: '0', autoAlpha: 1, duration: .8 }, '-=.4')
    $('.video-wrap').removeClass('widden');
    // gsap.set('.header', { height: '100px', duration: 1, ease: "easeAnim1" })
    gsap.set('.header-logo-wrap', { scale: 1, duration: 1, ease: "easeAnim1" }, 0)
    //gsap.set('.sc-home-vid-title-1', { y: '0px', autoAlpha: 1, duration: .6 }, '-=0.1');

    let propCenter = getMarginTopCetner('.sc-home-vid-title-2') - animProps.marginHomeHeroTitle;
    gsap.set('.sc-home-vid-title-1', { y: propCenter, autoAlpha: 1 })
    gsap.set('.sc-home-vid-title-2', { y: propCenter + 50, autoAlpha: 0 })
    gsap.set('.sc-home-hero-title', { y: propCenter })

    $('.video-wrap').removeClass('hidden');
    $('.header').addClass('show');
    $('.load-btn-wrap').addClass('active');
    setTimeout(() => {
      $('.load-btn-wrap').addClass('active');
    }, 1000);

    const down = () => {
      if (curAnimDone == 2) {
        loadAnim3();
      } else if (curAnimDone == 3) {
        loadAnim4();
      } else {
        return;
      }
    }
    const up = () => {
      if (curAnimDone == 3) {
        loadAnim3Rev();
      } else if (curAnimDone == 4) {
        loadAnim4Rev();
      } else {
        return;
      }
    }
    const handleWheelAnim = (event) => {
      if (scrolled) { return; }
      if ($('#bodyWrap').offset().top != '0' || window.scrollY != '0') { return; }
      if (Math.sign(event.deltaY) === 1) {
        down()
      } else if (Math.sign(event.deltaY) === -1) {
        up();
      }
    }
    const handleTouchAnim = (event) => {
      console.log('touch');
      if (scrolled) { return; }
      if ($('#bodyWrap').offset().top != '0' || window.scrollY != '0') { return; }
      let newTouchPos = event.changedTouches[0].clientY;
      if (newTouchPos > touchPos) {
        up();
      }
      if (newTouchPos < touchPos) {
        down()
      }
    }
    let touchPos;
    const handleTouchStart = (e) => {
      touchPos = e.changedTouches[0].clientY;
    };
    window.addForceEventListener("wheel", handleWheelAnim);
    window.addForceEventListener("touchstart", handleTouchStart);
    window.addForceEventListener("touchmove", handleTouchAnim);
  }
  function resetHeader() {
    $('.header').addClass('show done');
    $('.load-wrap .header-fake').addClass('show');
    $('.logo-slogan').addClass('show');
    $('.header-logo-wrap').removeClass('hidden');
    $('.header').removeClass('scrollup')
  }

  //Update Scroll
  // setInterval(() => {
  //   scrollmain.update();
  // }, 3000);
  // Page Script
  function homeScript() {
    if ($(".homepage").length) {
      if (doneHomeScript) {
        return;
      } else {
        console.log('welcome Home');

        // $.ajax({
        //   type: "post",
        //   url: "https://uploads-ssl.webflow.com/62296e664b543c8690a15ab5/62306a4022877e9d3a211fc6_Proj.svg.txt",
        //   dataType: "html",
        //   success: function (data) {
        //     //$('#drawsvgproj').append(new XMLSerializer().serializeToString(data));
        //     $('#drawsvgproj').append(data);
        //     scrollmain.update();
        //     projDrawSVG();
        //   },
        //   error: function (data) {
        //     $('.text-proj-2').removeClass('hiddenlogo');
        //   }
        // })

        $.get(drawSVG.homeAbodosVi, function (data) {
          $('#drawsvghomewhy').append(data);
          scrollmain.update();
          homeWhyDrawSVG();
        });
        $.get(drawSVG.homeProj, function (data) {
          $('#drawsvgproj').append(data);
          scrollmain.update();
          projDrawSVG();
        });

        $('.main').addClass('inactive');
        handleSlideMagicMouse('.home-proj-img-swiper');
        const projImgHome = new Swiper('.home-proj-img-swiper', {
          slidesPerView: 1,
          spaceBetween: 0,
          pagination: {
            el: '.proj-img-pagi',
            type: 'bullets',
            clickable: true,
          },
        });
        const device = detechDevice();
        if (device === 'desktop') {
          let whyBgTop = ($(window).height() - $('.why-bg-wrap').offset().top);
          if (whyBgTop < 0) {
            whyBgTop = 0;
          }
          console.log(whyBgTop);
          gsap.to(".why-bg-wrap", {
            scrollTrigger: {
              scroller: '.scrollmain',
              trigger: '.sc-home-why-bg',
              start: `top bottom-=${whyBgTop}`,
              end: 'bottom top',
              scrub: true,
            },
            y: '-30vh',
            ease: 'none',
          });
        }


        function homeWhyDrawSVG() {
          let txtWhyTitle = new SplitText('.sc-home-why .italic-home-why', { type: 'words' });
          let svgHomeWhy = $("#drawsvghomewhy svg path");
          const tlHomePrjTitle = new gsap.timeline({
            scrollTrigger: {
              scroller: '.scrollmain',
              trigger: '.italic-home-why',
              start: 'top 65%',
              end: 'bottom bottom',
            },
            onComplete: () => {
              txtWhyTitle.revert();
            }
          })
          tlHomePrjTitle.from(txtWhyTitle.words, { yPercent: 40, autoAlpha: 0, duration: .8, stagger: 0.2 })
            .from(svgHomeWhy, { duration: 1, stagger: 0.2, drawSVG: '50% 50%', ease: 'easeAnim1' }, '-=1');
        }
        function projDrawSVG() {
          let txtProjTitle = new SplitText('.sc-home-proj .italic-home-proj', { type: 'words' });
          let svgProj = $("#drawsvgproj svg path");
          const tlHomePrjTitle = new gsap.timeline({
            scrollTrigger: {
              scroller: '.scrollmain',
              trigger: '.sc-home-proj',
              start: 'top 65%',
              end: 'bottom bottom',
            },
            onComplete: () => {
              txtProjTitle.revert();
            }
          })
          tlHomePrjTitle.from(svgProj, { duration: 2, stagger: 0.2, drawSVG: '50% 50%', ease: 'easeAnim1' })
            .from(txtProjTitle.words, { yPercent: 40, autoAlpha: 0, duration: .8, stagger: 0.2 }, '.8')
        }

        let whyItem = $('.home-why-item');
        for (let x = 0; x < whyItem.length; x++) {
          let txtWhyTitle = new SplitText($('.home-why-item').eq(x).find('.home-why-title'), { type: "words" })
          let txtWhyContent = new SplitText($('.home-why-item').eq(x).find('.text-content-why'), { type: "words" })
          let tlHomeWhy = new gsap.timeline({
            scrollTrigger: {
              scroller: '.scrollmain',
              trigger: $('.home-why-item').eq(x),
              start: 'top 65%',
              end: 'bottom bottom',
            },
            onComplete: () => {
              txtWhyTitle.revert();
              txtWhyContent.revert();
            }
          });
          tlHomeWhy.from($('.home-why-img-wrap').eq(x), { yPercent: 20, autoAlpha: 0, duration: 1, clearProps: 'all' })
            .from(txtWhyTitle.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.1 }, '-=.8')
            .from(txtWhyContent.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.02 }, '-=.8')
        }

        const tlHomePrjMain1 = new gsap.timeline({
          scrollTrigger: {
            scroller: '.scrollmain',
            trigger: '.home-proj-img-wrap',
            start: 'top 65%',
            end: 'bottom bottom',
          },
        })
        tlHomePrjMain1.from('.home-proj-img-swiper-wrap', { yPercent: 40, autoAlpha: 0, duration: 1, })

        let txtProjMainTitle = new SplitText('.home-proj-fea-title-wrap .heading', { type: 'words' });
        let txtProjMainContent = new SplitText('.home-proj-fea-sub .text-content', { type: 'words' });
        let txtProjMainLink = new SplitText('.home-proj-fea-sub-wrap .text-link', { type: 'words' });
        const tlHomePrjMain2 = new gsap.timeline({
          scrollTrigger: {
            scroller: '.scrollmain',
            trigger: '.home-proj-fea-title-wrap',
            start: 'top 65%',
            end: 'bottom bottom',
          },
          onComplete: () => {
            txtProjMainTitle.revert();
            txtProjMainContent.revert();
            txtProjMainLink.revert();
            scrollmain.update();
          }
        })
        tlHomePrjMain2.from('.home-proj-fea-title-wrap .home-proj-fea-label', { yPercent: 40, autoAlpha: 0, duration: .4, })
          .from(txtProjMainTitle.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.1 }, '-=.2')
          .from(txtProjMainContent.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.02 }, '-=.4')
          .from(txtProjMainLink.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.04 }, '-=.6')
          .from('.home-proj-fea-sub-wrap .underline', { '--scaleValue': 'scaleX(0)', clearProps: 'all' }, '-=.4');

        let txtHomeProjUpMain = new SplitText('.home-proj-up-title-wrap .home-proj-up-title', { type: 'words' });
        let txtHomeProjUpTitle = new SplitText('.proj-up-slide .proj-up-title', { type: "words" });
        let tlHomeProjUp = new gsap.timeline({
          scrollTrigger: {
            scroller: '.scrollmain',
            trigger: '.home-proj-up-title-wrap',
            start: 'top 65%',
            end: 'bottom bottom',
          },
          onComplete: () => {
            txtHomeProjUpMain.revert();
            txtHomeProjUpTitle.revert();
          }
        });
        tlHomeProjUp.from(txtHomeProjUpMain.words, { yPercent: 40, autoAlpha: 0, duration: .6, stagger: 0.1 })
          .from('.proj-up-slide', { yPercent: 20, autoAlpha: 0, duration: 1, clearProps: 'all', stagger: 0.1 }, '-=.5')
          .from(txtHomeProjUpTitle.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.1 }, '-=.8')

        let txtHomePnTitle = new SplitText('.sc-home-partner .home-partner-title', { type: 'words' });
        let txtHomePnSub = new SplitText('.sc-home-partner .home-partner-wrap-title', { type: 'words' });
        let homePnItem = $('.home-partner-item');
        let tlHomePartner = new gsap.timeline({
          scrollTrigger: {
            scroller: '.scrollmain',
            trigger: '.sc-home-partner',
            start: 'top 65%',
            end: 'bottom bottom',
          },
          onComplete: () => {
            txtHomePnTitle.revert();
            txtHomePnSub.revert();
          }
        });
        tlHomePartner.from(txtHomePnTitle.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.1 })
          .from(txtHomePnSub.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.1 }, '-=.4')
          .from(homePnItem, { yPercent: 20, autoAlpha: 0, duration: 1, clearProps: 'all', stagger: 0.1 }, '-=.8');

        doneHomeScript = true;
      }
    }
  }

  function aboutScript() {
    if ($(".aboutpage").length) {
      console.log('Welcome to About Abodos')
      handleSlideMagicMouse('.about-hero-img-swiper .swiper-wrapper');
      $.get(drawSVG.aboutAbodosVi, function (data) {
        $('#drawsvgabouthero').append(data);
        scrollmain.update();
        aboutHeroDrawSVG();
      });

      function aboutHeroDrawSVG() {
        let svgAboutHero = $("#drawsvgabouthero svg path");
        let txtAboutHeroTitle = new SplitText('.sc-about-hero-title', { type: "words" });
        const tlAboutHeroSvg = new gsap.timeline({
          onComplete: () => {
            txtAboutHeroTitle.revert();
            scrollmain.update();
          }
        })
        tlAboutHeroSvg.from(svgAboutHero, { duration: 3, drawSVG: '50% 50%', ease: 'easeAnim1' })
          .from(txtAboutHeroTitle.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.1 }, '-=1.5');
      }

      const aboutHeroImg = new Swiper('.about-hero-img-swiper', {
        slidesPerView: 1,
        spaceBetween: 18,
        loop: true,
        loopAdditionalSlides: 2,
        breakpoints: {
          991: {
            spaceBetween: 32
          }
        },
        pagination: {
          el: '.about-hero-img-swiper-pagi',
          clickable: true,
        }
      });

      const tlImgHero = new gsap.timeline({
        scrollTrigger: {
          scroller: '.scrollmain',
          trigger: '.about-hero-img-swiper',
          start: 'top 65%',
          end: 'bottom bottom',
        },
      });
      tlImgHero.from('.swiper-slide.about-hero-img-wrap', { y: 50, autoAlpha: 0, duration: .8, stagger: .2 });

      let valueItem = $('.about-value-item');
      for (let x = 0; x < valueItem.length; x++) {
        let txtAboutValueTitle = new SplitText($('.about-value-item').eq(x).find('.about-value-title'), { type: "words" });
        let txtAboutValueBody = new SplitText($('.about-value-item').eq(x).find('.about-value-sub'), { type: "words" });
        let tlAboutValue = new gsap.timeline({
          scrollTrigger: {
            scroller: '.scrollmain',
            trigger: $('.about-value-item').eq(x),
            start: 'top 65%',
            end: 'bottom bottom',
          },
          onComplete: () => {
            txtAboutValueTitle.revert();
            txtAboutValueBody.revert();
          }
        });
        tlAboutValue.from(txtAboutValueTitle.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.1 })
          .from(txtAboutValueBody.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.02 }, '-=.8')
      }

      let txtAboutTeamTitle = new SplitText('.about-team-title', { type: "words" })
      let tlAboutTeam = new gsap.timeline({
        scrollTrigger: {
          scroller: '.scrollmain',
          trigger: '.sc-about-team',
          start: 'top 65%',
          end: 'bottom bottom',
        },
        onComplete: () => {
          txtAboutTeamTitle.revert();
          scrollmain.update();
        }
      });
      tlAboutTeam.from(txtAboutTeamTitle.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.1 })

      let teamItem = $('.about-team-item');
      let timedelay;
      for (let x = 0; x < teamItem.length; x++) {
        if (x == 0) {
          timedelay = 0;
        } else {
          timedelay = .8
        }
        let txtAboutTeamLabel = $('.about-team-item').eq(x).find('.about-team-label')
        let txtAboutTeamName = new SplitText($('.about-team-item').eq(x).find('.about-team-item-title'), { type: "words" })
        let txtAboutTeamDesc = new SplitText($('.about-team-item').eq(x).find('.about-team-desc'), { type: "words" })
        let tlAboutTeamItem = new gsap.timeline({
          scrollTrigger: {
            scroller: '.scrollmain',
            trigger: '.sc-about-team',
            start: 'top 65%',
            end: 'bottom bottom',
          },
          onComplete: () => {
            txtAboutTeamName.revert();
            txtAboutTeamDesc.revert();
          }
        });

        tlAboutTeamItem.from(txtAboutTeamLabel, { yPercent: 40, autoAlpha: 0, duration: .4, delay: timedelay })
          .from(txtAboutTeamName.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.1 }, '-=.2')
          .from(txtAboutTeamDesc.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.02 }, '-=.8')
      }

      let txtAboutPnTitle = new SplitText('.sc-about-partner .home-partner-title', { type: 'words' });
      let txtAboutPnSub = new SplitText('.sc-about-partner .home-partner-wrap-title', { type: 'words' });
      let aboutPnItem = $('.home-partner-item');
      let tlAboutPartner = new gsap.timeline({
        scrollTrigger: {
          scroller: '.scrollmain',
          trigger: '.sc-about-partner',
          start: 'top 65%',
          end: 'bottom bottom',
        },
        onComplete: () => {
          txtAboutPnTitle.revert();
          txtAboutPnSub.revert();
        }
      });
      tlAboutPartner.from(txtAboutPnTitle.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.1 })
        .from(txtAboutPnSub.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.1 }, '-=.4')
        .from(aboutPnItem, { yPercent: 20, autoAlpha: 0, duration: 1, clearProps: 'all', stagger: 0.1 }, '-=.8');
    }
  }

  function projectsScript() {
    if ($(".projectspage").length) {
      //blogFeature();
    }
  }

  function projdetailScript() {
    if ($(".projdetailpage").length) {

      let currentlang = window.location.pathname.slice(1, 3);
      if (currentlang == 'vi') {
        let elementToFindDigitsIn = document.querySelectorAll('.projdetail-act-a-title, .projdetail-fac-title, .home-why-title');
        elementToFindDigitsIn.forEach(el => {
          el.innerHTML = el.textContent.replace(/(\$?\d+)/g, '<span class="number">$1</span>').replace('ha', '<span class="unit">ha</span>');
        })
      } else if (currentlang == 'en') {

      }

      console.log('Welcome to project detail page')

      setTimeout(() => {
        console.log($('.projdetail-map-pagination'))
        const projDetailImgMap = new Swiper('.projdetai-swiper-map', {
          slidesPerView: 1,
          spaceBetween: 0,
          speed: 1000,
          loop: true,
          autoplay: {
            delay: 6000,
            disableOnInteraction: false,
            // pauseOnMouseEnter: true
            // waitForTransition: false,
            // reverseDirection: true
          },
          pagination: {
            el: '.projdetail-map-pagination',
            clickable: true,
            type: 'bullets',
          },
        });
      }, 1000)

      handleSlideMagicMouse('.projdetai-swiper-map');
      $('.projdetail-cluster-item.mod-layout2').each(function (i) {
        const baseSelector = (s) => `.cluster-list .projdetail-cluster-item.mod-layout2:nth-child(${i + 1}) ${s}`;
        handleSlideMagicMouse(baseSelector('.cluster-img-swiper'));
        new Swiper(baseSelector('.cluster-img-swiper'), {
          slidesPerView: 1,
          spaceBetween: 0,
          loop: true,
          loopAdditionalSlides: 1,
          pagination: {
            el: baseSelector('.cluster-pagi'),
            type: 'bullets',
            clickable: true,
          },
        });
      })

      $('.projdetail-cluster-item.mod-layout1').each(function (i) {
        const baseSelector = (s) => `.projdetail-cluster-list .projdetail-cluster-item.mod-layout1:nth-child(${i + 1}) ${s}`;
        handleSlideMagicMouse('.cluster-img-wrap');
        new Swiper(baseSelector('.cluster-img-wrap'), {
          pagination: {
            el: baseSelector('.cluster-pagi'),
            type: 'bullets',
            clickable: true,
          },
          slidesPerView: 1,
          spaceBetween: 0,
          loop: true,
          loopAdditionalSlides: 1,
          breakpoints: {
            991: {
              slidesPerView: 2,
              spaceBetween: 32,
              loop: false,
              loopAdditionalSlides: 0,
            }
          },
        });
      })

      contactForm()

      // handleSlideMagicMouse('.projdetail-act-a-img-item');
      const projDetailActA = new Swiper('.projdetail-act-a-img-wrap', {
        slidesPerView: 3,
        spaceBetween: 32,
        speed: 6000,
        loop: true,
        loopAdditionalSlides: 4,
        allowTouchMove: false,
        autoplay: {
          delay: 1,
          disableOnInteraction: false,
          // pauseOnMouseEnter: true
          // waitForTransition: false,
          // reverseDirection: true
        }
      });
      handleSlideMagicMouse('.swiper-projdetail-act');
      new Swiper('.swiper-projdetail-act', {
        slidesPerView: 1,
        spaceBetween: 32,
        loop: true,
        loopAdditionalSlides: 1,
        pagination: {
          el: '.swiper-projdetail-act-pagi',
          clickable: true
        }
      });
      var transformValue;
      $('.projdetail-act-a-img-wrap .swiper-wrapper').on('mouseover', function () {
        // transformValue = this.style.transform;
        // this.style.transitionDuration = "0ms";
        // this.style.transform = "translate3d(" + projDetailActA.translate + "px, 0px, 0px)";
        projDetailActA.autoplay.stop();
        // projDetailActA.destroy(false, false);
      })
      $('.projdetail-act-a-img-wrap .swiper-wrapper').on('mouseleave', function () {
        // this.style.transitionDuration = projDetailActA.params.speed + "ms";
        // this.style.transform = transformValue;
        projDetailActA.autoplay.start();
      })


      const projDetailUlt = new Swiper('.prjdetail-ult-swiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        loopAdditionalSlides: 6,
        speed: 3000,
        autoplay: {
          delay: 0,
        }
      });
      // $('.projdetail-ult-item-wrap').on('mouseover', (e) => {
      //   projDetailUlt.autoplay.stop();
      // })
      // $('.projdetail-ult-item-wrap').on('mouseleave', (e) => {
      //   projDetailUlt.autoplay.start();
      // })

      $.get(drawSVG.projDetailFaciVi, function (data) {
        $('.layout-vi #drawsvgprojult').append(data);
        scrollmain.update();
        projDrawSVGVi();
        console.log('append svg')
      });

      $.get(drawSVG.projDetailFaciEn, function (data) {
        $('.layout-en #drawsvgprojult').append(data);
        scrollmain.update();
        projDrawSVGEn();
        console.log('append svg')
      });

      function projDrawSVGVi() {
        let txtProjTitle = new SplitText('.layout-vi .italic-projdetail-ult', { type: 'words' });
        let svgProj = $(".layout-vi #drawsvgprojult svg path");
        const tlHomePrjTitle = new gsap.timeline({
          scrollTrigger: {
            scroller: '.scrollmain',
            trigger: '.sc-projdetail-ult-a.layout-vi',
            start: 'top 80%',
            end: 'bottom bottom',
          },
          onComplete: () => {
            txtProjTitle.revert();
          }
        })
        tlHomePrjTitle.from(svgProj, { duration: 2, stagger: 0.2, drawSVG: '50% 50%', ease: 'easeAnim1' })
          .from(txtProjTitle.words, { yPercent: 40, autoAlpha: 0, duration: .8, stagger: 0.2 }, '.8')
      }
      function projDrawSVGEn() {
        let txtProjTitle = new SplitText('.layout-en .italic-projdetail-ult', { type: 'words' });
        let svgProj = $(".layout-en #drawsvgprojult svg path");
        const tlHomePrjTitle = new gsap.timeline({
          scrollTrigger: {
            scroller: '.scrollmain',
            trigger: '.sc-projdetail-ult-a.layout-en',
            start: 'top 80%',
            end: 'bottom bottom',
          },
          onComplete: () => {
            txtProjTitle.revert();
          }
        })
        tlHomePrjTitle.from(svgProj, { duration: 2, stagger: 0.2, drawSVG: '50% 50%', ease: 'easeAnim1' })
          .from(txtProjTitle.words, { yPercent: 40, autoAlpha: 0, duration: .8, stagger: 0.2 }, '.8')
      }

      //Vi version
      let projDetailInfoItems = $('.projdetail-info-item');
      for (let x = 0; x < projDetailInfoItems.length; x++) {
        let txtProjDetailItemTitle = new SplitText($('.projdetail-info-item').eq(x).find('.home-why-title'), { type: "words" })
        let txtProjDetailItemContent = new SplitText($('.projdetail-info-item').eq(x).find('.block-richtext p'), { type: "words" })
        let tlProjDetailInfo = new gsap.timeline({
          scrollTrigger: {
            scroller: '.scrollmain',
            trigger: $('.projdetail-info-item').eq(x),
            start: 'top 65%',
            end: 'bottom bottom',
          },
          onComplete: () => {
            txtProjDetailItemTitle.revert();
            txtProjDetailItemContent.revert();
          }
        });
        tlProjDetailInfo.from($('.projdetail-info-item .projdetail-info-img-wrap').eq(x), { yPercent: 20, autoAlpha: 0, duration: 1 })
          .from(txtProjDetailItemTitle.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.1 }, '-=.8')
          .from(txtProjDetailItemContent.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.02 }, '-=.8')
      }

      let txtProjDetailActATitle = new SplitText('.projdetail-act-a-title', { type: 'words' });
      let txtProjDetailActASub = new SplitText('.projdetail-act-a-sub', { type: 'words' });
      const tlProjDetailActA = new gsap.timeline({
        scrollTrigger: {
          scroller: '.scrollmain',
          trigger: '.sc-projdetail-act-a',
          start: 'top 65%',
        },
        onComplete: () => {
          txtProjDetailActATitle.revert();
          txtProjDetailActASub.revert();
        }
      });
      tlProjDetailActA.from(txtProjDetailActATitle.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.1 })
        .from(txtProjDetailActASub.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.02 }, '-=1.2')
        .from($('.sc-projdetail-act-a .marquee-horizontal .marquee-item').eq(0).find('.projdetail-act-a-marquee-item'), { yPercent: 10, autoAlpha: 0, duration: 1, clearProps: 'all', stagger: .2 }, '-=1')
        .from('.swiper-projdetail-act-slide', { yPercent: 10, autoAlpha: 0, duration: 1, stagger: .2 }, '<=.2')


      let projDetailUltAItems = $('.sc-projdetail-ult-a .projdetail-ult-a-img');

      for (let x = 0; x < projDetailUltAItems.length; x++) {
        let txtProjDetailUltAItemTitle = new SplitText($('.sc-projdetail-ult-a .projdetail-ult-a-img').eq(x).find('.projdetail-fac-title'), { type: "words" })
        let txtProjDetailUltAItemContent = new SplitText($('.sc-projdetail-ult-a .projdetail-ult-a-img').eq(x).find('.block-richtext p'), { type: "words" })
        let tlProjDetailInfo = new gsap.timeline({
          scrollTrigger: {
            scroller: '.scrollmain',
            trigger: $('.sc-projdetail-ult-a .projdetail-ult-a-img').eq(x),
            start: 'top 65%',
          },
          onComplete: () => {
            txtProjDetailUltAItemTitle.revert();
            txtProjDetailUltAItemContent.revert();
          }
        });
        tlProjDetailInfo.from($('.sc-projdetail-ult-a .projdetail-ult-a-img .projdetail-fac-img-wrap').eq(x), { yPercent: 20, autoAlpha: 0, duration: 1, clearProps: 'all' })
          .from(txtProjDetailUltAItemTitle.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.1 }, '-=.8')
          .from(txtProjDetailUltAItemContent.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.02 }, '-=.8')
      }

      if ($('.sc-projdetail-hero.detect-vi').length) {
        const tlProjdetailUltAMarquee = gsap.timeline({
          scrollTrigger: {
            scroller: '.scrollmain',
            trigger: $('.sc-projdetail-ult-a .marquee-horizontal').eq(0),
            start: 'top 65%',
          }
        });
        tlProjdetailUltAMarquee.from($('.sc-projdetail-ult-a .marquee-horizontal').eq(0).find('.projdetail-ult-item-wrap'), { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.1, clearProps: 'all' })
          .from($('.sc-projdetail-ult-a .marquee-horizontal').eq(1).find('.projdetail-ult-item-wrap'), { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.1, clearProps: 'all' }, '<=.2')
      } else {
        const tlProjdetailMarquee = gsap.timeline({
          scrollTrigger: {
            scroller: '.scrollmain',
            trigger: '.sc-projdetail-marquee',
            start: 'top 65%',
          }
        });
        tlProjdetailMarquee.from($('.marquee-item .projdetail-ult-item-wrap '), { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.1, clearProps: 'all' })
      }

      let projDetailClusterItems = $('.sc-projdetail-cluster .projdetail-cluster-item');
      for (let x = 0; x < projDetailClusterItems.length; x++) {
        let txtProjDetailUltAItemTitle = new SplitText($('.projdetail-cluster-item .cluster-content > .h2').eq(x), { type: "words" })
        let txtProjDetailClusterItemContent = new SplitText($('.projdetail-cluster-item .richtext-cluster').eq(x).find('p'), { type: "words" })
        let txtProjDetailClusterItemPlot = new SplitText($('.projdetail-cluster-item').eq(x).find('.cluster-plot-wrap'), { type: "words" })
        let txtProjDetailClusterItemLabel = new SplitText($('.projdetail-cluster-item').eq(x).find('.cluster-info-label'), { type: "words" })
        let txtProjDetailClusterItemLValue = new SplitText($('.projdetail-cluster-item').eq(x).find('.cluster-info-value'), { type: "words" })
        let tlProjDetailInfo = new gsap.timeline({
          scrollTrigger: {
            scroller: '.scrollmain',
            trigger: $('.sc-projdetail-cluster .projdetail-cluster-item').eq(x),
            start: 'top 65%',
          },
          onComplete: () => {
            txtProjDetailUltAItemTitle.revert();
            txtProjDetailClusterItemContent.revert();
            txtProjDetailClusterItemPlot.revert();
            txtProjDetailClusterItemLabel.revert();
            txtProjDetailClusterItemLValue.revert();
          }
        });
        if ($(window).width() > 768) {
          tlProjDetailInfo.from(txtProjDetailUltAItemTitle.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.1 })
            .from(txtProjDetailClusterItemContent.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.02 }, '-=.8')
            .from(txtProjDetailClusterItemPlot.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.02 }, '-=.4')
            .from(txtProjDetailClusterItemLabel.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.02 }, '-=.4')
            .from(txtProjDetailClusterItemLValue.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.02 }, '<=.4')
            .from($('.projdetail-cluster-item').eq(x).find('.cluster-img-item'), { yPercent: 20, autoAlpha: 0, duration: 1, stagger: .1 }, '<=.2')
            .from($('.projdetail-cluster-item').eq(x).find('.cluster-img-swiper'), { yPercent: 20, autoAlpha: 0, duration: 1, stagger: .1 }, '<')
            .from($('.projdetail-cluster-item').eq(x).find('.cluster-pagi'), { yPercent: 20, autoAlpha: 0, duration: 1, stagger: .1 }, '<')
        } else {
          tlProjDetailInfo.from($('.projdetail-cluster-item').eq(x).find('.cluster-img-item'), { yPercent: 20, autoAlpha: 0, duration: 1, stagger: .1 }, '0')
            .from($('.projdetail-cluster-item').eq(x).find('.cluster-img-swiper'), { yPercent: 20, autoAlpha: 0, duration: 1, stagger: .1 }, '<')
            .from($('.projdetail-cluster-item').eq(x).find('.cluster-pagi'), { yPercent: 20, autoAlpha: 0, duration: 1, stagger: .1 }, '<')
            .from(txtProjDetailUltAItemTitle.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.1 }, '-=.2')
            .from(txtProjDetailClusterItemContent.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.02 }, '-=.8')
            .from(txtProjDetailClusterItemPlot.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.02 }, '-=.4')
            .from(txtProjDetailClusterItemLabel.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.02 }, '-=.4')
            .from(txtProjDetailClusterItemLValue.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.02 }, '<=.4')
        }
      }

      let txtProjDetailContactTitle = new SplitText('.projdetail-contact-title', { type: 'words' })
      let txtProjDetailContactSub = new SplitText('.projdetail-contact-form-sub', { type: 'words' })
      const tlProjDetailContact = new gsap.timeline({
        scrollTrigger: {
          trigger: '.sc-projdetail-contact',
          scroller: '.scrollmain',
          start: 'top 65%',
        },
        onComplete: () => {
          txtProjDetailContactTitle.revert();
          txtProjDetailContactSub.revert();
        }
      });
      tlProjDetailContact.from(txtProjDetailContactTitle.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.1 })
        .from(txtProjDetailContactSub.words, { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.02 }, '-=.4')
        .from('.projdetail-contact-item > *', { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.02, clearProps: 'all' }, '-=.8')
        .from('.projdetail-input-wrap', { yPercent: 40, autoAlpha: 0, duration: .4, stagger: 0.1, clearProps: 'all' }, '<=.4')
        .from('.submit-wrap', { yPercent: 40, autoAlpha: 0, duration: .4 }, '-=.4')

      // En version

    }
  }

  function contactScript() {
    if ($('.contactpage').length) {
      console.log('Welcome to contact page');
      contactForm();
      // <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/shell.js"></script>
      // <script>
      //   hbspt.forms.create({
      //   region: "na1",
      //   portalId: "20927141",
      //   formId: "8b9d346a-0224-4330-a748-9a6b2fcc855e"
      // });
      // </script>
    }
  }

  function blogScript() {
    console.log('welcome to blog');
    $('.blog-filters-wrap').on('click', function () {
      console.log('click')
      scrollmain.update();
      scrollmain.scrollTo($('.sc-blog-fea').height() - 100)
      setTimeout(() => {
        scrollmain.update();
      }, 600);
    });
    $('.pagi-wrap').on('click', () => {
      scrollmain.scrollTo($('.sc-blog-fea').height() - 100)
    })
    $('.input-filter-cate .input-radio').on('click', function (e) {
      $('.input-filter-cate .input-radio').removeClass('active');
      $(this).addClass('active');
      let currentCate = $(this).find('span').text();
      $('.input-filter-cate-trigger-text').text(currentCate)
      $('.input-filter-cate').removeClass('dropdown-active')
    })
    $('.input-filter-cate-trigger').on("click", function () {
      const trigger = $(this).parent().find('.input-filter-cate');
      trigger.toggleClass('dropdown-active');
    })
    $('.input-filter-cate-trigger').on("blur", function () {
      const trigger = $(this).parent().find('.input-filter-cate');
      if (!$('.input-filter-cate').is(':hover')) {
        trigger.removeClass('dropdown-active');
      }
    })
    setTimeout(() => {
      cmsLoad();
      cmsFilter();
      cmsSort();
    }, 1000);
    blogFeature()
  }

  function blogdtlScript() {
    console.log('welcome to blogdtl');
    $('.form-success-wrap').removeClass('hidden');
    socialShare()
  }

  function galleryScript() {
    console.log('welcome to gallery');
    setTimeout(() => {
      scrollmain.update();
    }, 1000);
    const swiperGalleryPopup = new Swiper('.gallery-popup-swiper', {
      slidesPerView: 1,
      spaceBetween: 16,
      speed: 800,
      loop: true,
      grabCursor: true,
      navigation: {
        nextEl: '.gallery-popup-btn-next',
        prevEl: '.gallery-popup-btn-prev',
      },
      // allowTouchMove: false,
    });
    $('.w-condition-invisible').remove();

    $('.gal-popup-frac-all').text($('.gal-main-item-inner').length);
    swiperGalleryPopup.on('slideChange', function () {
      $('.gal-popup-frac-each').text(this.realIndex + 1)
    });

    $('.gal-popup-close-wrap').on('click', () => {
      $('.gallery-popup-wrap').removeClass('show')
    })
    $('.gallery-overlay').on('click', () => {
      $('.gallery-popup-wrap').removeClass('show')
    })

    $('.gal-main-item-inner').on("click", function () {
      const myIndex = $(this).index('.gal-main-item-inner');
      galleryModal(myIndex)

    })
    function galleryModal(index) {
      swiperGalleryPopup.slideTo(index + 1, 0, false);
      $('.gallery-popup-wrap').addClass('show');

    };
  }

  function newsScript() {
    console.log('welcome to news');
    $('.news-filters-wrap').on('click', function () {
      console.log('click')
      scrollmain.update();
      scrollmain.scrollTo($('.sc-news-hero').outerHeight() + $('.sc-news-view').outerHeight() + $('.sc-news-month').outerHeight() - 100)
      setTimeout(() => {
        scrollmain.update();
      }, 600);
    });
    $('.pagi-wrap').on('click', () => {
      scrollmain.scrollTo($('.sc-news-hero').outerHeight() + $('.sc-news-view').outerHeight() + $('.sc-news-month').outerHeight() - 100)
      setTimeout(() => {
        scrollmain.update();
      }, 600);
    })
    setTimeout(() => {
      cmsLoad();
      cmsFilter();
      cmsSort();
    }, 1000);
  }
  function newsdtlScript() {
    console.log('welcome to newsdtl');
    $('.form-success-wrap').removeClass('hidden');
    socialShare()
  }
  function authorScript() {
    console.log('welcome to author');
    setTimeout(() => {
      cmsLoad();
      cmsSort();
    }, 1000);
  }
  function jobScript() {
    console.log('welcome to job');
    $('.form-success-wrap').removeClass('hidden');
    $('.sc-job-hero .new-btn').on('click', function (e) {
      e.preventDefault();
      scrollmain.scrollTo('.sc-job-form')
    })
    function inputCheck(ele) {
      let parent = ele.parent();
      let value = ele.val();
      if (value != '') {
        parent.addClass('filled');
      } else {
        parent.removeClass('filled');
      }
    }
    $('.contact-form-input, .contact-form-textarea').on('keyup change focus blur', (e) => {
      inputCheck($(e.target));
    })
    socialShare()

    $('.career-upload-wrap').on("click", function (e) {
      e.preventDefault();
      $('input[type=file]').click();
    });

    const uploadWrapBtn = $('.career-upload-txt');
    const storedTextUpload = uploadWrapBtn.clone().text();
    let storedFile;
    $('input[type=file]').change(function () {
      const maxAllowedSize = 10 * 1024 * 1024;
      const file = $(this).get(0).files[0];

      if (!file) return;
      if (file.size > maxAllowedSize) {
        alert('Maximum allowed size file');
        return;
      }

      storedFile = file;
      function shortedFileName(name, size = 32) {
        const splitFile = name.split('.');
        return `${truncate(splitFile[0], size)}.${splitFile[1]}`
      }
      function truncate(source, size) {
        return source.length > size ? source.slice(0, size - 1) + "…" : source;
      }
      uploadWrapBtn.text(shortedFileName(file.name))
    })
    $('.success-close-carrer').on('click', (e) => {
      e.preventDefault();
      $('.success-content-wrap-carrer').removeClass('show');
    })
    $("#wf-form-Career-Form").on("submit", function (e) {
      e.preventDefault();
      const form = $(this);
      const formObject = { ...mapFormToObject(e.target) };
      if (!storedFile) {
        alert('Vui lòng thêm CV');
        return false;
      }

      const submitBtn = $('.projdetail-form-submit');
      const storedText = submitBtn.clone().val();
      submitBtn.val(submitBtn.attr("data-wait") || 'Please wait ...');
      uploadFile(storedFile).then(({ url }) => {
        const data = {
          fields: [
            {
              name: 'website',
              value: url,
            },
            {
              name: 'jobtitle',
              value: `${formObject.job} - ${formObject.place}`,
            },
            {
              name: 'firstname',
              value: formObject.name,
            },
            {
              name: 'email',
              value: formObject.email,
            },
            {
              name: 'phone',
              value: formObject.phone,
            }
          ],
          context: {
            pageUri: window.location.href,
            pageName: 'Career Page',
          },
        };
        const sendSubmitURL = `https://api.hsforms.com/submissions/v3/integration/submit/21700290/cc940902-379e-4c02-a348-6ddbc9435dcb`;
        const final_data = JSON.stringify(data);
        $.ajax({
          url: sendSubmitURL,
          method: 'POST',
          data: final_data,
          dataType: 'json',
          headers: {
            accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          contentType: 'application/json',
          success: function (response) {
            $('.success-content-wrap-carrer').addClass('show');
            setTimeout(() => {
              $('.success-content-wrap-carrer').removeClass('show');
            }, 5000);
            storedFile = null;
            form.get(0).reset();
            $('.contact-form-input').trigger('change');
            submitBtn.val(storedText);
            uploadWrapBtn.text(storedTextUpload);
          },
          error: function (error) {
            let errors = error.responseJSON.errors;
            submitBtn.val(storedText);
            for (x = 0; x < errors.length; x++) {
              let errType = errors[x].errorType
              if (errType == 'BLOCKED_EMAIL' || errType == 'INVALID_EMAIL') {
                alert('Try again with a valid email');
                return;
              } else if (errType == 'NUMBER_OUT_OF_RANGE') {
                alert('Try again with a valid phone number');
                return;
              }
            }
          },
        });
      })



      return false;
    })
  }

  //Functions
  function blogFeature() {
    const swiperBlogsHero = new Swiper('.blog-fea-cms', {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 2000,
      loop: true,
      // allowTouchMove: false,
      autoplay: {
        delay: 4000,
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
    });
    console.log('trans')
    trans(0);
    swiperBlogsHero.on('activeIndexChange', function () {
      let index = this.realIndex;
      trans(index);
    })

    $('.blog-fea-nav-main').on('click', function () {
      let index = $(this).parent().index();
      console.log(index)
      swiperBlogsHero.slideTo(index);
      trans(index);
    });

    function trans(i) {
      $('.blog-fea-nav-main').removeClass('active')
      $('.blog-fea-nav-main').eq(i).addClass('active')
      gsap.set('.blog-fea-prog-inner', { scaleX: 0, overwrite: true })
      gsap.to($('.blog-fea-prog-inner').eq(i), {
        scaleX: 1, duration: 4, ease: 'none', onComplete: () => {
          swiperBlogsHero.slideNext()
        }
      })
    }
  }
  function socialShare() {
    let currLocation = window.location.href;
    $(`[data-share="fb"]`).attr('href', `https://www.facebook.com/sharer/sharer.php?u=${currLocation}`)
    $('[data-share="url"]').on('click', function (e) {
      e.preventDefault();
      copyClipboard(currLocation);
    })
  };
  function copyClipboard(path) {
    navigator.clipboard.writeText(path)
    $('.success-url-wrap').addClass('show')
    setTimeout(() => {
      $('.success-url-wrap').removeClass('show')
    }, 3000);
    $('.success-close').on('click', (e) => {
      e.preventDefault();
      $('.success-url-wrap').removeClass('show')
    })
  };
}
main();