import { isTouchDevice, viewportBreak } from "../utils/viewport";

const MathUtils = {
  lerp: (a,b,t = 0.08) => {
    return a + (b - a) * t;
  },
  distance: (x1, y1, x2, y2) => {
    return Math.hypot(x2 - x1, y2 - y1)
  },
  degToRad: (deg) => {
    return deg * (Math.PI / 180);
  }
}
const getMouseDegrees = (x, y, degreeLimit) => {
  let dx = 0,
  dy = 0,
  xdiff,
  xPercentage,
  ydiff,
  yPercentage;
  let w = { x: window.innerWidth, y: window.innerHeight };
  if (x <= w.x / 2) {
  xdiff = w.x / 2 - x;
  xPercentage = (xdiff / (w.x / 2)) * 100;
  dx = ((degreeLimit * xPercentage) / 100) * -1;
  }
  if (x >= w.x / 2) {
  xdiff = x - w.x / 2;
  xPercentage = (xdiff / (w.x / 2)) * 100;
  dx = (degreeLimit * xPercentage) / 100;
  }
  if (y <= w.y / 2) {
  ydiff = w.y / 2 - y;
  yPercentage = (ydiff / (w.y / 2)) * 100;
  dy = ((degreeLimit * 0.5 * yPercentage) / 100) * -1;
  }
  if (y >= w.y / 2) {
  ydiff = y - w.y / 2;
  yPercentage = (ydiff / (w.y / 2)) * 100;
  dy = (degreeLimit * yPercentage) / 100;
  }
  return { x: dx, y: dy };
};
const xSetter = (el) => gsap.quickSetter(el, 'x', `px`);
const ySetter = (el) => gsap.quickSetter(el, 'y', `px`);

const xGetter = (el) => gsap.getProperty(el, 'x');
const yGetter = (el) => gsap.getProperty(el, 'y');

let mouse = {x: 0, y: 0};
let lastMouse = {...mouse};
let cacheMouse = {...mouse};

window.addEventListener("pointermove", e => {
  mouse = {x: e.clientX, y: e.clientY}
});

const getRawMousePos = () => {
  return mouse;
}

const normalize = (mousePos, maxDis) => (mousePos / maxDis - 0.5) * 2;
const normalizeElement = (el) => {
  let rect = $(el).get(0).getBoundingClientRect();
  return {
    x: normalize((mouse.x - rect.left), rect.width),
    y: normalize((mouse.y - rect.top), rect.height)
  }
}

const initMagicMouse = () => {
  viewportBreak({
    desktop: () => {
      //Update mouse position
      function moveCursor() {
        let iconsX = xGetter('.cursor');
        let iconsY = yGetter('.cursor');
        if ($('.cursor').length) {
            xSetter('.cursor')(MathUtils.lerp(iconsX, mouse.x));
            ySetter('.cursor')(MathUtils.lerp(iconsY, mouse.y));
            requestAnimationFrame(moveCursor)
        }
      }
      requestAnimationFrame(moveCursor);
      if (isTouchDevice()) $('.cursor-wrap').addClass('hidden');
    },
    tablet: () => $('.cursor-wrap').addClass('hidden'),
    mobile: () => $('.cursor-wrap').addClass('hidden')
  })
}

const getMouseDistance = () => MathUtils.distance(mouse.x, mouse.y, lastMouse.x, lastMouse.y)

let workHeroImgList = [];
const initWorkHeroMouse = {
  init: () => {
    let wrapper = $('.ser-hero-hover-wrap');
    wrapper.find('.ser-hero-hover-img').each((index, el) => {
      workHeroImgList.push(el)
    })
    let totalImgs = workHeroImgList.length;
    let imgPosition = 0;
    let zIndexValue = 1;
    let threshold = 100;

    const showNextImg = () => {
      const img = workHeroImgList[imgPosition]

      if (img) {
        gsap.killTweensOf(img);
        let tl = gsap.timeline({})
        let imgRect = img.getBoundingClientRect();
        tl
        .set(img, {
          startAt: {opacity: 0, scale: 1},
          opacity: 1,
          scale: 1,
          zIndex: zIndexValue,
          x: cacheMouse.x - imgRect.width/2,
          y: cacheMouse.y - imgRect.height/2,
        },)
        .to(img, {
          x: mouse.x - imgRect.width/2,
          y: mouse.y - imgRect.height/2,
          ease: 'expo.out',
          duration: .9
        }, 0)
        .to(img, {
          opacity: 0,
          ease: 'power1.out',
          duration: 1
        }, .4)
        .to(img, {
          scale: .2,
          ease: 'quint.out',
          duration: 1
        }, .4)
      }
    }

    const render = ()  => {
      if ($('[data-barba-namespace="work"]').length) {
        let distance = getMouseDistance();
        cacheMouse.x = MathUtils.lerp(cacheMouse.x || mouse.x, mouse.x, 0.1);
        cacheMouse.y = MathUtils.lerp(cacheMouse.y || mouse.y, mouse.y, 0.1);
        if (distance > threshold) {
          showNextImg();
          zIndexValue++;
          imgPosition = imgPosition < (totalImgs - 1) ? imgPosition + 1 : 0;

          lastMouse = {...mouse};
        }

        let isIdle = true;
        for (let img of workHeroImgList) {
            if (gsap.isTweening((img) || img.css('opacity') != 0 )) {
                isIdle = false;
                break;
            }
        }
        // reset z-index initial value
        if ( isIdle && zIndexValue !== 1 ) {
            zIndexValue = 1;
        }

        requestAnimationFrame(render)
      }
    }
    requestAnimationFrame(render)
  },
  destroy: () => {
    workHeroImgList = [];
  }
}

const initHomeValueMouse = () => {
  let allValueItems = $('.abt-value-item-img-wrap');
  let allItemMouse = [];
  let offsetValue = '-6rem';
  let outerEl = $(document.createElement('div')).addClass('hover-outer').css({
    'position': 'absolute',
    'top': offsetValue,
    'left': offsetValue,
    'right': offsetValue,
    'bottom': offsetValue,
    'z-index': '10',
  })

  allValueItems.each((index, el) => {
    $(el).append(outerEl.clone())
    let itemMousePos = {x: 0, y: 0};
    allItemMouse.push(itemMousePos)
    $(el).find('.hover-outer').on('pointermove', function(e) {
      allItemMouse[index] = normalizeElement(this)
    })
    $(el).find('.hover-outer').on('pointerleave', function(e) {
      allItemMouse[index] = {x: 0, y: 0}
    })
  })

  let offset = Math.abs(parseFloat(getComputedStyle($('.hover-outer').get(0)).top))
  function customHover() {
    allValueItems.each((index, el) => {
      if (allItemMouse[index]) {
        let iconsX = xGetter(el.querySelector('.abt-value-embed'));
        let iconsY = yGetter(el.querySelector('.abt-value-embed'));
        if ($(el.querySelector('.abt-value-embed')).length) {
          xSetter(el.querySelector('.abt-value-embed'))(MathUtils.lerp(iconsX, allItemMouse[index].x * offset));
          ySetter(el.querySelector('.abt-value-embed'))(MathUtils.lerp(iconsY, allItemMouse[index].y * offset));
        }

      }
    })
    requestAnimationFrame(customHover)
  }
  requestAnimationFrame(customHover)
}

//Global magic mouse
const updateMagicMouse = (scrollPos, quickset = false) => {
  let progress = Math.ceil(100 - (scrollPos / ($('[data-barba="container"]').height() - $(window).height()) * 100))
  let curr = gsap.getProperty('.cursor-prog circle', 'stroke-dashoffset');
  if (quickset) {
    gsap.to('.cursor-prog circle', {'stroke-dashoffset': progress, duration: .65, ease: 'power2.inout'})
  } else {
    gsap.quickSetter('.cursor-prog circle', 'stroke-dashoffset', '')(MathUtils.lerp(curr, progress))
  }
}

const showViewCursor = (el) => {
  el.on('pointerenter', function(e) {
    $('.cursor-hover').addClass('active')
  })
  el.on('pointerleave', function(e) {
    $('.cursor-hover').removeClass('active')
  })
}

export {
  initMagicMouse,
  updateMagicMouse,
  showViewCursor,
  initWorkHeroMouse,
  initHomeValueMouse,
  MathUtils,
  getMouseDegrees,
  getRawMousePos
}
