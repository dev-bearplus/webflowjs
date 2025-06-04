const mainScript = () => {
  const SCRIPT = {};
  const parseRem = (input) => {
    return (input / 10) * parseFloat($("html").css("font-size"));
  };
   $('.header-ham').on('click',function(){
    $('.header-menu-wrap').toggleClass('active');
    $(this).find('.ic').removeClass('active');
    if($('.header-menu-wrap').hasClass('active')){
      $(this).find('.ic-ham-close').addClass('active');
    }
    else{
      $(this).find('.ic-ham-open').addClass('active');
    }
   })
  SCRIPT.homeScript = () => {
    var swiperLogo = new Swiper(".home-logo-swiper", {
      slidesPerView: 2,
      loop: true,
      spaceBetween: parseRem(50),
      speed: 2000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      breakpoints: {
        767: {
          slidesPerView: 4,
          spaceBetween: parseRem(50),
        },
        991: {
          slidesPerView: 6,
          spaceBetween: parseRem(79),
        },
      },
    });
    var swiperFeedback = new Swiper(".home-feedback-list", {
      slidesPerView: 1,
      on: {
        slideChange: function () {
          $(".home-feedback-control-number-active").text(this.activeIndex + 1);
        },
      },
    });
    $(".home-feedback-control-number-toggle").text(
      swiperFeedback.slides.length
    );
    $(".home-feedback-control-next").on("click", function () {
      swiperFeedback.slideNext(700);
      $(".home-feedback-control-number-active").text(
        swiperFeedback.activeIndex + 1
      );
    });
    $(".home-feedback-control-prev").on("click", function () {
      swiperFeedback.slidePrev(700);
      $(".home-feedback-control-number-active").text(
        swiperFeedback.activeIndex + 1
      );
    });
  };
  SCRIPT.aboutScript = () => {
    var swiperImg = new Swiper(".about-swiper-img", {
      slidesPerView: 2,
      centeredSlides: true,
      spaceBetween: parseRem(44),
      loop: true,
      speed: 5000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      breakpoints: {
        767: {
          slidesPerView: 4,
          spaceBetween: parseRem(34),
        },
        991: {
          centeredSlides: true,
          slidesPerView: 4,
          spaceBetween: parseRem(64),
        },
      },
    });

    var swiperMilestone = new Swiper(".about-swiper-milestone", {
      slidesPerView: 1,
      spaceBetween: parseRem(20),
      speed: 700,
      on: {
        slideChange: function () {
          let process =
            ((this.activeIndex + 1) / (this.slides.length - 1)) * 100 - 100;
          $(".about-milestone-process-current").css(
            "transform",
            `translate(${process}%)`
          );
          console.log(process);
        },
      },
      pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
      },
      breakpoints: {
        767: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
      },
    });
    let processInit = (1 / (swiperMilestone.slides.length - 1)) * 100 - 100;
    $(".about-milestone-process-current").css(
      "transform",
      `translate(${processInit}%)`
    );
  };
  SCRIPT.contactScript = () => {
    $(".contact-hero-form-input").on("change", function () {
      let value = $(this).val();
      if (value !== "") {
        $(this).removeClass("no-value");
      } else {
        $(this).addClass("no-value");
      }
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
      onlyWorkOnThisFormName: "Contact Form",
      onSuccess: () => {
             $('.contact-hero-form form')[0].reset('');
          // $('.contact-hero-form form input').val('');
          $('.contact-hero-form form select').addClass("no-value");
        setTimeout(() => {

          // $('.contact-hero-form form textarea').val('');
          $('.contact-hero-form-success').hide(1000);
        }, 5000);
      },
      onFail: () => {
        console.log("fail");
      },
    });
  };
  const pageName = $(".main").attr("name-space");
  if (pageName) {
    SCRIPT[`${pageName}Script`]();
  }
};
window.onload = mainScript;