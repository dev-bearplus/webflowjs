const script = () => {
    console.log("run")
    gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

    const lenis = new Lenis({
        lerp: false,
        duration: 1.6
    })
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    let viewport = {
        width: $(window).width(),
        height: $(window).height(),
        pixelRatio: window.devicePixelRatio,
    }

    const lerp = (a, b, t = 0.08) => {
        return a + (b - a) * t;
    }

    let pointer = { x: 0, y: 0 };
    $(window).on('pointermove', function (e) {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
    })

    let typeOpts = {
        lines: { type: 'lines', linesClass: 'g-lines' },
        words: { type: 'words,lines', linesClass: 'g-lines' },
        chars: { type: 'chars,words,lines', linesClass: 'g-lines' }
    };

    const xSetter = (el) => gsap.quickSetter(el, 'x', `px`);
    const ySetter = (el) => gsap.quickSetter(el, 'y', `px`);
    const rotXSetter = (el) => gsap.quickSetter(el, 'rotateY', `deg`);
    const rotYSetter = (el) => gsap.quickSetter(el, 'rotateX', `deg`);
    const rotZSetter = (el) => gsap.quickSetter(el, 'rotateZ', `deg`);

    const xGetter = (el) => gsap.getProperty(el, 'x')
    const yGetter = (el) => gsap.getProperty(el, 'y')
    const rotXGetter = (el) => gsap.getProperty(el, 'rotateY')
    const rotYGetter = (el) => gsap.getProperty(el, 'rotateX')
    const rotZGetter = (el) => gsap.getProperty(el, 'rotateZ')

    const parseRem = (input) => {
        return input / 10 * parseFloat($('html').css('font-size'))
    }

    const debounce = (func, delay = 100) => {
        let timer;
        return (event) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, delay, event);
        };
    }
    const convertCategoryUrlParam = (text) => {
        const category = new URLSearchParams();
        category.append('category', text);
        return category.toString().replace(/%2B/g, '+');
    }
    const childSelect = (parent) => {
        return (child) => child ? $(parent).find(child) : parent;
    }

    const marqueeGS = (data) => {
        const { parent, duration, start, stopWhenScroll } = data;
        const direction = {
            right: "-=",
            left: "+="
        };
        const DOM = {
            wrap: parent('.marquee'),
            list: parent('.marquee-inner'),
            item: parent('.marquee-inner-item')
        }

        let isHover = false;

        let tlMarquee = gsap.timeline({
            repeat: -1,
            // onReverseComplete() {
            //     this.totalTime(this.rawTime() + this.duration() * 10);
            // },
            onUpdate: () => {
                if (!isHover) {
                    let tlDir = lenis.direction >= 0 ? 1 : -1;
                    gsap.to(tlMarquee, { timeScale: tlDir * Math.min(Math.max(lenis.velocity / 2, 1), 4), duration: .1, ease: 'none' })
                }
            }
        })

        ScrollTrigger.create({
            trigger: DOM.wrap,
            start: 'top bottom',
            once: true,
            onEnter: () => {
                let cloneAmount = 2;
                const cloneAdditional = Math.floor(viewport.width / DOM.item.width());
                if (cloneAdditional >= 1) {
                    cloneAmount += cloneAdditional;
                }

                DOM.item.css({ position: "relative", top: 0, left: 0 });
                gsap.set(DOM.item, { x: -1 * DOM.item.eq(0).width() });

                new Array(cloneAmount).fill().forEach((_, index) => {
                    let itemClone = DOM.item.clone();
                    gsap.set(itemClone, { position: "absolute", top: 0, left: 0, x: index * DOM.item.width(), height: '100%' })
                    DOM.list.append(itemClone);
                })

                tlMarquee.seek(28800);
                tlMarquee.to(DOM.list, {
                    x: direction[start || "left"] + `${DOM.item.eq(0).width()}`,
                    duration: DOM.item.eq(0).width() / duration,
                    ease: "linear",
                })
            }
        })

        if (stopWhenScroll) {
            DOM.wrap.on("pointerenter", (event) => {
                isHover = true;
                gsap.to(tlMarquee, { timeScale: 0, ease: 'power1.inOut', duration: 0.3, overwrite: true });
            });
            DOM.wrap.on("pointerleave", (event) => {
                isHover = false;
                gsap.to(tlMarquee, { timeScale: 1, ease: 'power1.inOut', duration: 0.3, overwrite: true });
            });
        }

        return tlMarquee;
    }

    const marqueeCSS = (data) => {
        const { parent, duration, start, delay, stopWhenScroll } = data;
        const direction = {
            right: "reverse",
            left: "normal"
        };
        const DOM = {
            wrap: parent('.marquee'),
            list: parent('.marquee-inner'),
            item: parent('.marquee-inner-item')
        }
        let cloneAmount = 2;
        const cloneAdditional = Math.floor(viewport.width / DOM.item.width());
        if (cloneAdditional >= 1) {
            cloneAmount += cloneAdditional;
        }

        new Array(cloneAmount).fill().forEach((_, index) => {
            let itemClone = DOM.item.clone();
            DOM.list.append(itemClone);
        })
        DOM.list.addClass('anim-marquee');
        gsap.set(parent('.anim-marquee'), {
            '--duration': DOM.item.width() / duration || parent('.anim-marquee').css('--duration'),
            '--direction': direction[start] || parent('.anim-marquee').css('--direction'),
            '--delay': delay || parent('.anim-marquee').css('--delay')
        })
        new Array(1).fill().forEach((_, index) => {
            let itemClone = parent('.marquee-inner').clone();
            DOM.wrap.append(itemClone);
        })
    }

    function refreshOnBreakpoint() {
        let initialViewportWidth = window.innerWidth || document.documentElement.clientWidth;
        let newViewportWidth;
        // portrait mobile viewport initial, any change refresh
        if (initialViewportWidth < 480) {
            $(window).on('resize', debounce(function () {
                newViewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (newViewportWidth > 479) {
                    location.reload();
                }
            }))
        }
        // landscape mobile viewport initial, any change refresh
        else if (initialViewportWidth < 768) {
            $(window).on('resize', debounce(function () {
                newViewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (newViewportWidth > 767) {
                    location.reload();
                }
            }))
        }
        // tablet viewport initial, any change refresh
        else if (initialViewportWidth > 767 && initialViewportWidth < 992) {
            $(window).on('resize', debounce(function () {
                newViewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (newViewportWidth < 768 || newViewportWidth > 991) {
                    location.reload();
                }
            }))
        }
        // web viewport initial, any change refresh
        else if (initialViewportWidth > 991) {
            $(window).on('resize', debounce(function () {
                newViewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (newViewportWidth < 992) {
                    location.reload();
                }
            }))
        }
    }
    refreshOnBreakpoint();

    const isTouchDevice = () => {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    }

    const closestEdge = (x, y, w, h) => {
        const topEdgeDist = distMetric(x, y, w / 2, 0);
        const bottomEdgeDist = distMetric(x, y, w / 2, h);
        const min = Math.min(topEdgeDist, bottomEdgeDist);
        return min === topEdgeDist ? 'top' : 'bottom';
    }
    const distMetric = (x, y, x2, y2) => {
        var xDiff = x - x2;
        var yDiff = y - y2;
        return (xDiff * xDiff) + (yDiff * yDiff);
    }

    const findClosestEdge = (ev, el) => {
        if (!el) return;

        const wrapperRect = el.getBoundingClientRect();
        const x = ev.clientX - wrapperRect.left;
        const y = ev.clientY - wrapperRect.top;

        return closestEdge(x, y, el.clientWidth, el.clientHeight);
    }

    const isObjectEmpty = (objectName) => {
        return (
            objectName &&
            Object.keys(objectName).length === 0 &&
            objectName.constructor === Object
        );
    };

    $.fn.hasAttr = function (name) {
        return this.attr(name) !== undefined;
    };

    const required = (message) => ({ message, required: true });
    const regexp = (pattern, message) => ({ regexp: pattern, message });

    const REGEXP = {
        email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        tel: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
    }

    const ERROR_MESSAGE = {
        required: (name) => `Vui lòng điền ${name}`,
        regexp: 'Field not like format'
    }

    const mapFormToObject = (form, originFormData) => {
        /** -NOTE-
         * read it: https://stackoverflow.com/questions/12077859/difference-between-this-and-event-target
         * form: this property will be
         *          [e.target]: when the form have event
         *       or [$(formID).get(0)]: when the form don't have event
         */

        let formData = originFormData || new FormData(form);

        const parsedFormData = [...formData.entries()].reduce(
            (prev, cur) => {
                const name = cur[0];
                const val = cur[1];
                let dataName;

                for (let field of form) {
                    let fieldDataName = field.dataset.name;
                    let fieldName = field.name;
                    if (name === fieldName) dataName = fieldDataName;
                }

                return {
                    ...prev, [name]: {
                        value: val,
                        name: dataName,
                        validType: []
                    }
                };
            },
            {}
        );
        return parsedFormData;
    }

    const mapObjectFormToValidate = (form, obj) => {
        const parsedFormData = [...Object.entries(obj)].reduce((prev, cur) => {
            const name = cur[0];
            const val = cur[1];
            let validArr = val.validType;

            for (let field of form) {
                let fieldName = field.name;
                let fieldType = field.type;
                let fieldRequired = field.required || false;
                let REGEXP_TYPE = ['email', 'tel'];
                if (name === fieldName) {
                    if (fieldRequired) {
                        let CusMessage = field.getAttribute('mess-required');
                        validArr.unshift(required(CusMessage))
                    }
                    if (REGEXP_TYPE.includes(fieldType)) {
                        let CusMessage = field.getAttribute('mess-regexp');
                        let CusRegexp = field.getAttribute('cus-regexp');
                        validArr.unshift(regexp(CusRegexp || fieldType, CusMessage))
                    }
                }
                continue;
            }
            return {
                ...prev, [name]: val
            }
        }, {})
        return parsedFormData;
    }

    const convertFormatPrice = () => {
        $('[data-price]').each(function () {
            if ($(this).attr('data-price') !== '#') return;

            let numprice = Number($(this).text());
            let price = Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
                minimumFractionDigits: 3
            });
            if ($(this).hasAttr('data-currency')) {
                let convertResult = price.format(numprice).replace('.', ',').replace('₫', $(this).attr('data-currency'));
                $(this).text(convertResult);
                $(this).attr('data-price', convertResult);
            }
            else {
                let convertResult = price.format(numprice).replace('.', ',');
                $(this).text(convertResult);
                $(this).attr('data-price', convertResult);
            }
        })
    }

    const splitTextFadeUpSetup = (className, types) => {
        const splitTextItem = new SplitText(className, { type: 'lines, words', linesClass: "splittext-lines" });
        gsap.set(splitTextItem.lines, { overflow: 'hidden' });
        gsap.set(splitTextItem.words, { yPercent: 100 });
        gsap.set(className, { autoAlpha: 1 });
        return splitTextItem;
    }

    let booksPromise;
    const fetchData = () => {
        let booksData = [];
        if (booksData.length !== 0) return;
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${window.location.origin}/tong-hop-dau-sach`).then((html) => html.text());
                const getItemsArr = (html) => {
                    const itemArray = [];
                    const tempDiv = $('<div>').html(html);
                    const items = tempDiv.find('.books_table-item');
                    items.each(function () {
                        const itemInfo = {
                            slug: $(this).find('[data-prod-slug]').text(),
                            name: $(this).find('[data-prod-name]').text(),
                            category: $(this).find('[data-prod-category]').text(),
                            author: $(this).find('[data-prod-author]').text(),
                            price: $(this).find('[data-prod-price]').text(),
                            cover: $(this).find('[data-prod-cover]').attr('src'),
                            inventory: Number($(this).find('[data-prod-inventory]').text())
                        };
                        itemArray.push(itemInfo);
                    });
                    return itemArray;
                }
                booksData = await getItemsArr(response);
                resolve(booksData);
                return booksData;
            } catch (error) {
                console.error('Error fetching HTML:', error);
                reject(error);
            }
        });
    }
    const fetchBookByCate = (category) => {
        let booksData = [];
        if (booksData.length !== 0) return;
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${window.location.origin}/book-categories/${encodeURI(category)}`).then((html) => html.text());
                const getItemsArr = (html) => {
                    const itemArray = [];
                    const tempDiv = $('<div>').html(html);
                    const items = tempDiv.find('.prod__all-listing-cms-item');
                    items.each(function () {
                        const itemInfo = {
                            slug: $(this).find('[data-prod-slug]').text(),
                            name: $(this).find('[data-prod-name]').text(),
                            category: $(this).find('[data-prod-category]').text(),
                            author: $(this).find('[data-prod-author]').text(),
                            price: $(this).find('[data-prod-price]').text(),
                            cover: $(this).find('[data-prod-cover]').attr('src'),
                            inventory: Number($(this).find('[data-prod-inventory]').text())
                        };
                        itemArray.push(itemInfo);
                    });
                    return itemArray;
                }
                booksData = await getItemsArr(response);
                resolve(booksData);
                return booksData;
            } catch (error) {
                console.error('Error fetching HTML:', error);
                reject(error);
            }
        });
    }

    const fetchBook = (id) => {
        let data = [];
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${window.location.origin}/books/${id}`).then((html) => html.text());
                const getData = (html) => {
                    const tempDiv = $('<div>').html(response).find('.main');
                    const itemInfo = {
                        slug: id,
                        name: tempDiv.find('[data-prod-name]').text(),
                        category: tempDiv.find('[data-prod-category]').text(),
                        author: tempDiv.find('[data-prod-author]').text(),
                        price: Math.round(parseFloat(tempDiv.find('[data-prod-price]').text()).toFixed(3)),
                        cover: tempDiv.find('[data-prod-cover]').attr('src'),
                        inventory: Number(tempDiv.find('[data-prod-inventory]').attr('data-prod-inventory'))
                    };
                    return itemInfo;
                }
                data = await getData(response);
                resolve(data);
                return data;
            } catch (error) {
                console.error('Error fetching HTML:', error);
                reject(error);
            }
        })
    }

    const swiper = {
        setup: (parent, options = {}) => {
            return new Swiper(parent('.swiper').get(), {
                slidesPerView: options.onView || 1,
                spaceBetween: options.spacing || 0,
                allowTouchMove: options.touchMove || false,
                navigation: options.nav ? ({
                    nextEl: parent('.next').get(),
                    prevEl: parent('.prev').get(),
                    disabledClass: "disabled"
                }) : false,
                ...options,
                on: options.on
            })
        },
        changeCurrentItem: (parent, index, callback) => {
            parent(".curr-item").html(index);
            if (callback) callback();
        },
        initTotalSlide: (parent) => {
            let totalSlide = parent(".swiper-slide").length;
            parent(".total-slide").html(totalSlide);
        },
        initPagination: (parent) => {
            let totalSlide = parent(".swiper-slide").length;
            let paginationItem = parent('.bp-swiper-pagi-item');
            gsap.set(paginationItem, { width: `${100 / totalSlide}%`, left: 0 });
        },
        activePagination: (parent, index) => {
            let activeLine = parent('.bp-swiper-pagi-item')
            gsap.to(activeLine, { x: index * activeLine.width(), duration: 0.3, ease: 'expo' })
        },
        initClassName: (parent) => {
            parent('[data-swiper]').each((_, item) => {
                if ($(item).attr('data-swiper') == 'swiper')
                    $(item).addClass('swiper')
                else
                    $(item).addClass(`swiper-${$(item).attr('data-swiper')}`)
            })
        }
    }

    const formSubmitEvent = (function () {
        const init = ({
            onlyWorkOnThisFormName,
            onSuccess,
            onFail
        }) => {
            $(document).ajaxComplete(function (event, xhr, settings) {
                if (settings.url.includes("https://webflow.com/api/v1/form/")) {
                    const isSuccessful = xhr.status === 200
                    const isWorkOnAllForm = onlyWorkOnThisFormName == undefined
                    const isCorrectForm = !isWorkOnAllForm && settings.data.includes(getSanitizedFormName(onlyWorkOnThisFormName));

                    if (isWorkOnAllForm) {
                        if (isSuccessful) {
                            onSuccess?.()
                        } else {
                            onFail?.()
                        }
                    } else if (isCorrectForm) {
                        if (isSuccessful) {
                            onSuccess?.()
                        } else {
                            onFail?.()
                        }
                    }
                }
            });
        }
        function getSanitizedFormName(name) {
            return name.replaceAll(" ", "+")
        }
        return {
            init
        }
    })()

    const initAllFnOfPage = (pages) => {
        pages.forEach((page) => {
            if (isObjectEmpty(page)) return;

            Object.keys(page).forEach(function (key) {
                page[key]();
            });
        })
    }

    let header = $('.header__bar');
    let headerHeight = $(".header__bar").outerHeight();
    let lastScrollTop = 0;
    let currentLink = $('.header__nav-link.w--current')
    $('.header__nav-img').eq(currentLink.index()).addClass('active')

    // if ($(window).width() > 767) {
    //     gsap.set(".header__nav", { 'clip-path': `path("m 0 -${$(window).outerHeight()} v ${$(window).outerHeight() / 2} q ${$(window).outerWidth() / 2} ${$(window).outerHeight()} ${$(window).outerWidth()} 0 v -${$(window).outerHeight()} z")` })

    // } else {
    //     gsap.set(".header__nav", { 'clip-path': `path("m 0 -${$(window).outerHeight()} v ${$(window).outerHeight() / 2} q ${$(window).outerWidth() / 2} ${$(window).outerHeight()} ${$(window).outerWidth() * 2} -${$(window).outerWidth()} v -${$(window).outerHeight()} z")` })
    // }

    gsap.set(".header__nav", { 'clip-path': `path("m 0 -${$(window).outerHeight()} v ${$(window).outerHeight() / 2} q ${$(window).outerWidth() / 2} ${$(window).outerHeight()} ${$(window).outerWidth()} 0 v -${$(window).outerHeight()} z")` })
    gsap.set('.header__nav-footer-item', { autoAlpha: 0 })
    if (window.innerWidth > 767) {
        gsap.set('.header__nav-link--wrap .header__nav-link', { autoAlpha: 0, x: -35 })
        gsap.set(".header__nav-cate-title", { autoAlpha: 0, x: 10 })
        gsap.set(".header__nav-cate-link", { autoAlpha: 0, x: 10 })
    } else {
        gsap.set('.header__nav-link--wrap .header__nav-link', { autoAlpha: 0, y: 10 })
        gsap.set(".header__nav-cate-title", { autoAlpha: 0, y: 10 })
        gsap.set(".header__nav-cate-link", { autoAlpha: 0, y: 10 })
    }

    const HEADER = {
        toggleHide: (e) => {
            let scrollPos = $(this).scrollTop();
            if (scrollPos > lastScrollTop) {
                if (scrollPos > (headerHeight * 3)) {
                    header.addClass('on-hide');
                    $('.header__logo-text-txt').addClass('on-hide')
                }
            } else {
                if (scrollPos > (headerHeight * 3)) {
                    header.addClass("on-hide");
                    header.removeClass("on-hide");
                } else {
                    $('.header__logo-text-txt').removeClass('on-hide')
                }
            }
            lastScrollTop = scrollPos;
        },
        toggleOnScroll: (scrollPos) => {
            if (scrollPos > (headerHeight * 2)) header.addClass("on-scroll");
            else header.removeClass("on-scroll");
        },
        openNav: () => {
            const tlOpen = gsap.timeline();

            // if ($(window).width() > 767) {
            //     tlOpen
            //         .to(".header__nav", { 'clip-path': `path("m 0 -${$(window).outerHeight()} v ${$(window).outerHeight() * 2} q ${$(window).outerWidth() / 2} 0 ${$(window).outerWidth()} 0 v -${$(window).outerHeight()} z")`, duration: .6, ease: 'power4.in', overwrite: true }, 0)
            // } else {
            //     tlOpen
            //         .to(".header__nav", { 'clip-path': `path("m -${$(window).outerWidth()} -${$(window).outerHeight()} v ${$(window).outerHeight() * 2} q ${$(window).outerWidth() / 2} 0 ${$(window).outerWidth() * 2} 0 v -${$(window).outerHeight()} z")`, duration: 0.8, ease: 'power4.in', overwrite: true }, 0)
            // }
            tlOpen.to(".header__nav", { 'clip-path': `path("m 0 -${$(window).outerHeight()} v ${$(window).outerHeight() * 2} q ${$(window).outerWidth() / 2} 0 ${$(window).outerWidth()} 0 v -${$(window).outerHeight()} z")`, duration: .6, ease: 'power4.in', overwrite: true }, 0)

            let navLinks = $('.header__nav-link--wrap .header__nav-link')
            navLinks.each((idx, el) => {
                tlOpen
                    .to(el, { autoAlpha: 1, x: 0, y: 0, duration: .8, ease: "power2.out", overwrite: true }, `${.4 + idx * .1}`)
            })

            tlOpen.to(".header__nav-cate-title", { autoAlpha: 1, x: 0, y: 0, duration: .8, ease: "power4.out", overwrite: true }, .7)
            let cateLinks = $(".header__nav-cate-link")

            cateLinks.each((idx, el) => {
                tlOpen
                    .to(el, { autoAlpha: 1, x: 0, y: 0, duration: .8, ease: "power2.out", overwrite: true }, `${.7 + idx * .05}`)
            })

            gsap.set('.header__nav-img img', { scale: 1.4 })
            gsap.set('.header__nav-img', { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" })
            tlOpen
                .to($('.header__nav-img'), { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1, ease: 'expo.out', overwrite: true }, .8)
                .to($('.header__nav-img img'), { scale: 1, duration: 1.5, ease: 'power3.inOut', overwrite: true }, .2)

            let navFooter = $('.header__nav-footer-item')
            navFooter.each((idx, el) => {
                tlOpen
                .to(el, { autoAlpha: 1, duration: .6, ease: Power2.in, overwrite: true }, `${1 + idx * .09}`)
            })
        },
        closeNav: () => {
            const tlClose = gsap.timeline({});

            tlClose
                .to(".header__nav", { 'clip-path': `path("m 0 -${$(window).outerHeight()} v ${$(window).outerHeight() / 2} q ${$(window).outerWidth() / 2} ${$(window).outerHeight()} ${$(window).outerWidth()} 0 v -${$(window).outerHeight()} z")`, duration: 0.8, ease: 'power4.in', overwrite: true }, 0)

            let navLinks = $('.header__nav-link--wrap .header__nav-link')
            navLinks.each((idx, el) => {
                if (window.innerWidth > 767) {
                    tlClose
                    .to(el, { autoAlpha: 0, x: -35, duration: .6, ease: "power4.out" }, `${idx * .1}`)
                } else {
                    tlClose
                    .to(el, { autoAlpha: 0, y: 10, duration: .6, ease: "power4.out" }, `${idx * .1}`)
                }
            })

            // if ($(window).width() > 767) {
            //     tlClose
            //         .to(".header__nav", { 'clip-path': `path("m 0 -${$(window).outerHeight()} v ${$(window).outerHeight() / 2} q ${$(window).outerWidth() / 2} ${$(window).outerHeight()} ${$(window).outerWidth()} 0 v -${$(window).outerHeight()} z")`, duration: 0.8, ease: 'power4.in', overwrite: true }, 0)
            // } else {
            //     tlClose
            //         .to(".header__nav", { 'clip-path': `path("m -${$(window).outerWidth()} -${$(window).outerHeight()} v ${$(window).outerHeight() / 2} q ${$(window).outerWidth() / 2} ${$(window).outerHeight()} ${$(window).outerWidth() * 2} 0 v -${$(window).outerHeight()} z")`, duration: 0.8, ease: 'power4.in', overwrite: true }, 0)
            // }

            if (window.innerWidth > 767) {
                tlClose.to(".header__nav-cate-title", { autoAlpha: 0, x: 10, overwrite: true }, .2)
                tlClose.to(".header__nav-cate-link", { autoAlpha: 0, x: 10, overwrite: true }, .2)
            } else {
                tlClose.to(".header__nav-cate-title", { autoAlpha: 0, y: 10, overwrite: true }, .2)
                tlClose.to(".header__nav-cate-link", { autoAlpha: 0, y: 10, overwrite: true }, .2)
            }
            tlClose
                .to('.header__nav-img.active', { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)", duration: .4, ease: Power1.out, overwrite: true }, 0)
                .to('.header__nav-img.active img', { scale: 1.4, duration: .6, ease: "power1.out", overwrite: true }, 0)
                .to('.header__nav-footer-item', { autoAlpha: 0, duration: .6, ease: Power2.in, overwrite: true }, 0)
        },
        showImageByLink: () => {
            let nav = $('.header__nav-link');
            if ($(window).outerWidth() > 991) {
                nav.on('mouseenter', function () {
                    $('.header__nav-img').removeClass('active')
                    $('.header__nav-img').eq(nav.index(this)).addClass('active')
                })
                nav.on('mouseleave', function () {
                    $('.header__nav-img').removeClass('active')
                    let currentElement = nav.filter('.w--current');
                    let idx = nav.index(currentElement);
                    $('.header__nav-img').eq(idx).addClass('active')
                })
            }
            else {
                let currentElement = nav.find('.w--current');
                if (currentElement.length !== 0) {
                    let idx = nav.index(currentElement);
                    $('.header__nav-img').eq(idx).addClass('active')
                }
                else {
                    $('.header__nav-img').eq(0).addClass('active')
                }
            }
        },
        URLBooks: () => {
            $('.header__nav-cate-link').each((idx, el) => {
                $(el).attr('href', `${$(el).attr('href')}/?${convertCategoryUrlParam($(el).attr('id'))}`);
            })
        },
        search: () => {
            // Handle On click Search Icon
            const searchBtn = $('.header__search-form-inner')
            searchBtn.on('click', function(e) {
                $('.header__search-form-input').addClass('active')
                $('.header__search-form-input').focus()
            })
            $(window).on('click', function(e) {
                if ($('.header__search-form-input').val() != "") {
                    $('.header__search-form-input').addClass('active')
                } else {
                    if (!searchBtn.is(':hover')) {
                        $('.header__search-form-input').removeClass('active')
                    }
                }
            })

            // Handle On click Search in Mobile
            const searchNavMobile = $('.header__nav-search')
            $('[data-search-nav]').on('click', function(e) {
                e.preventDefault()
                const data = $(this).attr('data-search-nav')
                switch (data) {
                    case 'open':
                        searchNavMobile.addClass('active')
                        lenis.stop()
                        break;
                    case 'close':
                        searchNavMobile.removeClass('active')
                        lenis.start()
                        break;
                }
            })

            // Handle On Enter-Submit search
            const searchTarget = $('#header-search, #header-search-2')
            searchTarget.on('submit', function(e) {
                const searchParam = searchTarget.find('input.header__search-form-input').val() || searchTarget.find('.header__nav-search-form-inner input').val()
                window.location.href = window.location.origin + '/books?name=' + decodeURIComponent(searchParam).replace(/ /g, "+")
            })
        }
    }

    const onWindowResize = () => {
        if ($("body").hasClass('open-nav')) {
            $(".header__nav").css('clip-path', end);
        }
    }
    $(window).on('resize', debounce(onWindowResize))

    const preventLenisOnPopupInsta = (wrap) => {
        let requestId;
        const loop = (time) => {
            requestId = undefined;

            preventLenis();
            start();
            if ($('.eapps-instagram-feed-popup-inner').hasAttr('data-lenis-prevent')) {
                stop();
            }
        }
        const start = () => {
            if (!requestId) {
                requestId = window.requestAnimationFrame(loop);
            }
        }
        const stop = () => {
            if (requestId) {
                window.cancelAnimationFrame(requestId);
                requestId = undefined;
            }
        }
        const preventLenis = () => {
            if ($('.eapps-widget.eapps-instagram-feed-popup-visible').length !== 0) {
                $('.eapps-instagram-feed-popup-inner').attr('data-lenis-prevent', '');
            }
        }

        const instaFeed = document.querySelector(wrap)
        const observerInsta = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    start();
                    observerInsta.unobserve(e.target);
                }
            });

        observerInsta.observe(instaFeed);
    }

    const arrowAnim = (parentClass) => {
        const parent = childSelect(parentClass);
        const ARROW = {
            next: parent('.next'),
            prev: parent('.prev'),
        }

        ARROW.next.on("pointerenter", function () {
            gsap.timeline({
                duration: 0.35, ease: 'power1.easeInOut'
            }).to(ARROW.prev.find('.txt'), {
                xPercent: '-100'
            }, 0).to(ARROW.next.find('.embed-ic'), {
                xPercent: '-10'
            }, 0)
        });

        ARROW.next.on("pointerleave", function () {
            gsap.timeline({
                duration: 0.35, ease: 'power1.easeInOut'
            }).to(ARROW.prev.find('.txt'), {
                xPercent: '0'
            }, 0).to(ARROW.next.find('.embed-ic'), {
                xPercent: '0'
            }, 0)
        });

        ARROW.prev.on("pointerenter", function () {
            gsap.timeline({
                duration: 0.35, ease: 'power1.easeInOut'
            }).to(ARROW.next.find('.txt'), {
                xPercent: '100'
            }, 0).to(ARROW.prev.find('.embed-ic'), {
                xPercent: '10'
            }, 0)
        });

        ARROW.prev.on("pointerleave", function () {
            gsap.timeline({
                duration: 0.35, ease: 'power1.easeInOut'
            }).to(ARROW.next.find('.txt'), {
                xPercent: '0'
            }, 0).to(ARROW.prev.find('.embed-ic'), {
                xPercent: '0'
            }, 0)
        });
    }

    const initCMSProcessing = (formID) => {
        const selectDropdown = {
            open: (target) => {
                let el = target ? target : $(`${formID} .cms__processing--wrap a`);
                let processListing = target ? target.siblings() : $('.cms__processing-listing');

                el.addClass('active');
                processListing.addClass('active');
                el.find('.cms__all-processing-ic').addClass('active');

                gsap.to(processListing,
                    { y: 0, autoAlpha: 1, duration: .4, ease: 'power1.easeInOut' })
            },
            close: (target) => {
                let el = target ? target : $(`${formID} .cms__processing--wrap a`);
                let processListing = target ? target.siblings() : $(`${formID} .cms__processing-listing`);

                el.removeClass('active');
                processListing.removeClass('active');
                el.find('.cms__all-processing-ic').removeClass('active');

                gsap.to(processListing,
                    { y: -30, autoAlpha: 0, duration: .4, ease: 'power1.easeInOut' })
            },
            toggle: (target) => {
                let processListing = target.siblings();

                target.toggleClass('active');
                $(`${formID} .cms__processing--wrap a`).not(target).removeClass('active');

                processListing.toggleClass('active');
                $(`${formID} .cms__processing-listing`).not(processListing).removeClass('active');

                target.find('.cms__all-processing-ic').toggleClass('active');
                $(`${formID} .cms__all-processing-ic`).not(target.find('.cms__all-processing-ic')).removeClass('active');

                requestAnimationFrame(() => {
                    if (target.hasClass('active')) {
                        gsap.to($(`${formID} .cms__processing-listing`).not(processListing),
                            { y: -30, autoAlpha: 0, duration: .4, ease: 'power1.easeInOut' })
                        gsap.to(processListing,
                            { y: 0, autoAlpha: 1, duration: .4, ease: 'power1.easeInOut' })
                    }
                    else {
                        gsap.fromTo(processListing,
                            { y: 0, autoAlpha: 1 },
                            { y: -30, autoAlpha: 0, duration: .4, ease: 'power1.easeInOut' })
                    }
                })
            }
        }
        $(`${formID} .cms__processing--wrap a`).on('click', function (e) {
            e.preventDefault();
            selectDropdown.toggle($(this));
        })

        $(window).on('click', (e) => {
            if (!$(`${formID} .cms__processing--wrap:hover`).length)
                if (!$(`${formID} .cms__processing-listing.active:hover`).length)
                    selectDropdown.close();
        })

        $(`${formID} .cms__processing-checkbox_field input`).on('change', function () {
            let option = $(this).parent();
            requestAnimationFrame(() => {
                let isChecked = $(this).siblings(0).hasClass('w--redirected-checked');
                if (isChecked) {
                    option.addClass('selected');
                    option.checked
                }
                else {
                    option.removeClass('selected');
                }
            })
        })
        $(`${formID} .cms__processing-radio_field #Newest`).prop("checked", true);
        if (viewport.width <= 767) {
            $(`${formID} .cms__processing-radio_field #Newest-2`).prop("checked", true);
        }
        $(`${formID} .cms__processing-radio_field`).on('click', function () {
            requestAnimationFrame(() => {
                $(this).find('input').prop("checked", true);
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                    $(this).parent().removeClass('selected');
                }
                else {
                    $(`${formID} .cms__processing-radio_field`).removeClass('selected');
                    $(this).addClass('selected');

                    $(`${formID} .cms__processing-radio_field`).parent().removeClass('selected');
                    $(this).parent().addClass('selected');
                }
            })
        })
    }

    const validateForm = ({ formsObj: forms, rules }) => {
        const errors = {};
        for (let name in rules) {
            for (let rule of rules[name].validType) {
                if (rule.required && forms[name]) {
                    if (!forms[name].value.trim() || forms[name].value.trim() == "false") {
                        errors[name] = rule.message || ERROR_MESSAGE.required(forms[name].name);
                    }
                }
                if (rule.regexp && forms[name]) {
                    let regexp = rule.regexp;
                    if (regexp in REGEXP) {
                        regexp = new RegExp(REGEXP[regexp]);
                    }
                    else if (!(regexp instanceof RegExp)) {
                        regexp = new RegExp()
                    }
                    if (!regexp.test(forms[name].value.trim())) {
                        errors[name] = rule.message || ERROR_MESSAGE.regexp;
                    }
                }
            }
        }
        return {
            errors,
            isValidated: Object.keys(errors).length === 0
        };
    }

    const validateInput = ({ targetInputObject: input, targetInputRule: rules }) => {
        let errors;
        const isEmpty = (value) => (value == null || (typeof value === "string" && value.trim().length === 0));
        for (let rule of rules.validType) {
            if (rule.required) {
                if (!input.value.trim() || input.value.trim() == "false") {
                    errors = rule.message || ERROR_MESSAGE.required(input.name);
                }
            }
            if (rule.regexp) {
                let regexp = rule.regexp;
                if (regexp in REGEXP) {
                    regexp = new RegExp(REGEXP[regexp]);
                }
                else if (!(regexp instanceof RegExp)) {
                    regexp = new RegExp()
                }
                if (!regexp.test(input.value.trim())) {
                    errors = rule.message || ERROR_MESSAGE.regexp;
                }
            }
        }
        return errors;
    }

    const errorValidation = {
        singleActive: (input, error) => {
            let errorEl = $(input).find('.input-field-error');
            if (error) {
                $(errorEl).find('.txt').html(error);
                $(errorEl).slideDown('fast');
            }
            else {
                $(errorEl).slideUp('fast', () => $(errorEl).find('.txt').html(''));
            }
        },
        active: (form, errors) => {
            Array.from(form.querySelectorAll('.input-field-group input.w-input')).forEach(node => {
                let errorEl = node.parentElement.querySelector('.input-field-error');
                if (errors.hasOwnProperty(node.getAttribute('name'))) {
                    errorEl.querySelector('.txt').innerHTML = errors[node.getAttribute('name')];
                    $(errorEl).slideDown('fast');
                }
                else {
                    $(errorEl).slideUp('fast', () => errorEl.querySelector('.txt').innerHTML = '');
                }
            });
        },
        reset: (form) => {
            Array.from(form.querySelectorAll('.input-field-group input.w-input')).forEach(node => {
                let errorEl = node.parentElement.querySelector('.input-field-error');
                $(errorEl).slideUp('fast', () => errorEl.querySelector('.txt').innerHTML = '');
            });
        }
    }

    const reInitForm = (formID) => {
        // $(`${formID} .radio_field #COD`).prop("checked", true).trigger("click");
        // if (!($(`${formID} + .popup__cart-success.w-form-done`).css('display') == 'none')) {
        //     $(formID).css('display', 'flex');
        //     $(formID).trigger('reset');
        //     $(`${formID} + .popup__cart-success.w-form-done`).css('display', 'none');
        // }
    }

    const submitForm = ({ formsObj, rules }) => {
        let validateInfo = { status: false, resultForm: {} };

        const { errors, isValidated } = validateForm({ formsObj, rules });
        if (isValidated) {
            validateInfo.status = true;
            Object.entries(rules).forEach(([key, { value }]) => {
                validateInfo.resultForm[key.toLowerCase()] = value;
            });
            return { validateInfo };
        }
        else {
            validateInfo.status = false;
            return { errors, validateInfo };
        }
    }
    const validateOnInput = ({ targetInputObject, targetInputRule }) => {
        let validateInfo = { status: false, resultForm: {} };
        const error = validateInput({ targetInputObject, targetInputRule });

        return error;
    }

    const formHandler = (formID, options = {}) => {
        /** -NOTE-
         * read it: https://stackoverflow.com/questions/12077859/difference-between-this-and-event-target
         *  e.target <--> $(formID).get(0)
         *  e.currentTarget <--> $(this) <--> $(formID)
         */
        const formTarget = $(formID).get(0);
        let formsObj = mapFormToObject(formTarget);
        let rules = mapObjectFormToValidate(formTarget, formsObj);

        const validateThisInput = (e) => {
            let targetInputObject = {
                ...formsObj[$(e.target).attr('name')],
                value: $(e.target).val()
            };
            let targetInputRule = { ...rules[$(e.target).attr('name')] }
            const error = validateOnInput({ targetInputObject, targetInputRule });
            errorValidation.singleActive($(e.target).closest('.input-field-group'), error);
        }

        $(`${formID} .input-field-group input`).bind('input', debounce(validateThisInput))

        $(`${formID} [data-form-btn="submit"]`).on('click', function (e) {
            const { onSuccess, onError } = options;
            formsObj = mapFormToObject(formTarget);
            rules = mapObjectFormToValidate(formTarget, formsObj);

            const { errors, validateInfo } = submitForm({ formsObj, rules });
            if (validateInfo.status) {
                onSuccess?.(validateInfo);
                $(this).closest('form').trigger('submit');
                errorValidation.reset($(formID).get(0));
            }
            else {
                e.preventDefault();
                onError?.(errors);
                errorValidation.active($(formID).get(0), errors);
            }
            return false;
        })
    }


    const initFormCheckout = (onSuccess) => {
        requestAnimationFrame(() => {
            $('#checkout-form .radio_field #COD').prop("checked", true).trigger("click");
            $('.popup__cart-form-banking').hide();
        })

        $('#checkout-form .radio_field').on('click', function () {
            requestAnimationFrame(() => {
                if ($(this).find('input').attr('id') == 'Banking') {
                    $('.popup__cart-form-banking').show();
                }
                else {
                    $('.popup__cart-form-banking').hide();
                }
            })
        })

        $('#checkout-form  .input-field-group [type="tel"]').bind('change keydown keyup', function (e) {
            let inputVal = $(this).val();
            $(this).val(inputVal.replace(/\D/g, ''));
        })
        $('#checkout-form .input-field-group .input-field').on('focus', function (e) {
            $(this).closest('.input-field-group').addClass('active');
        })
        $('#checkout-form .input-field-group .input-field').on('blur', function (e) {
            $(this).closest('.input-field-group').removeClass('active');

            if ($(this).val() != '') {
                $(this).closest('.input-field-group').addClass('filled')
            }
            else {
                $(this).closest('.input-field-group').removeClass('filled')
            }
        })

        $('#checkout-form .input-field-group input-field').bind('change keydown keyup', function (e) {
            // if ($(this).attr('id'))
        })

        formHandler('#checkout-form', {
            onSuccess: ({ resultForm }) => {
                formSubmitEvent.init({
                    onlyWorkOnThisFormName: "Checkout form",
                    onSuccess: () => onSuccess?.()
                });
                const formSuccess = childSelect('#checkout-form + .popup__cart-success.w-form-done');
                Object.keys(resultForm).forEach(function (item) {
                    if (item === 'paying-method' && resultForm[item] === 'Cash on delivery (COD)') {
                        formSuccess('[data-order-banking]').hide();
                    }
                    formSuccess(`[data-order-${item}]`).text(resultForm[item]);
                });
            }
        });
        // formHandler('#submission-form', {
        //     onSuccess: ({ resultForm }) => {
        //         formSubmitEvent.init({
        //             onlyWorkOnThisFormName: "Submission form",
        //             onSuccess: () => onSuccess?.()
        //         });
        //         // const formSuccess = childSelect('#submission-form + .footer__content--submission-success.w-form-donee');
        //         // Object.keys(resultForm).forEach(function (item) {
        //         //     if (item === 'paying-method' && resultForm[item] === 'Cash on delivery (COD)') {
        //         //         formSuccess('[data-order-banking]').hide();
        //         //     }
        //         //     formSuccess(`[data-order-${item}]`).text(resultForm[item]);
        //         // });
        //     }
        // });
    }

    const initPopup = (name) => {
        let popupWrap = $(`[data-popup-${name}='wrap']`);
        const popupAction = {
            open: () => {
                popupWrap.addClass('active');
                requestAnimationFrame(() => $('.header-bar').addClass('force'));
                lenis.stop();
            },
            close: () => {
                if (!popupWrap.hasClass('active')) return;
                setTimeout(() => {
                    popupWrap.removeClass('active');
                    $('.header-bar').removeClass('force');
                }, 100)
                lenis.start();
            }
        }
        $(`[data-popup-${name}]`).on('click', function (e) {
            if ($(this).attr(`data-popup-${name}`) === 'open') {
                e.preventDefault();
                popupAction.open();
            }
            else if ($(this).attr(`data-popup-${name}`) === 'close') {
                e.preventDefault();
                popupAction.close();
            }
            else return;
        });

        $(window).on('click', (e) => {
            if (!$(`[data-popup-${name}='open']:hover`).length) {
                if ($(`[data-popup-${name}="wrap"]`).hasClass('active')) return;
                    popupAction.close();
            }
        })

        $(`[data-popup-${name}="wrap"] .popup-overlay`).on('click', function (e) {
            popupAction.close();
        })
    }

    const handleCart = async () => {
        const storedProducts = localStorage.getItem('products');
        const listProducts = storedProducts ? JSON.parse(storedProducts) : [];
        const cartItem = $('.popup__cart-item').eq(0).clone();
        const cartItemSuccess = $('.popup__cart-success--cart-item').eq(0).clone();
        let currentBook = await Promise.all(
            listProducts.map(async ({ slug, quantity }) => {
                let data = await fetchBook(slug);
                // console.log(data)
                return ({ ...data, quantity })
            })
        )

        /** (💡)  - Prepare DOM */
        $('.popup__cart-listing').html('');
        $('.popup__cart-success--cart-list').html('');
        const counterItem = () => {
            let tl = gsap.timeline({});
            tl
                .to($('.header__ic-cart--number'), { scale: 1.3, ease: 'power2.inOut', duration: .3 })
                .to($('.header__ic-cart--number [data-cart-count]'), {
                    yPercent: -100, autoAlpha: 0, ease: 'power2.inOut', duration: .2,
                    onComplete: () => {
                        $('[data-cart-count]').text(listProducts.length)
                        $('[data-cart-count]').attr('data-cart-count', listProducts.length);
                    }
                }, "<= .2")
                .set($('.header__ic-cart--number [data-cart-count]'), { yPercent: 100 }, "<= .2")
                .to($('.header__ic-cart--number [data-cart-count]'), { yPercent: 0, autoAlpha: 1, ease: 'power2.inOut', duration: .2 }, "<= .2")
                .to($('.header__ic-cart--number'), { scale: 1, ease: 'power2.inOut', duration: .3 })
        };
        const checkEmptyCart = () => {
            if (listProducts.length > 0) {
                $('.popup__cart-footer').addClass('active');
                $('.popup__cart-empty').removeClass('active');
            }
            else {
                $('.popup__cart-footer').removeClass('active');
                $('.popup__cart-empty').addClass('active');
            }
        }
        const updateTotalPrice = () => {
            let totalPrice = 0;
            if (currentBook.length > 0) {
                totalPrice = currentBook.reduce((prev, cur) => prev + (Number(cur.price) * (cur.inventory === 0 ? 0 : cur.quantity)), 0);
            }
            // console.log(currentBook.map((el) => el))
            let price = Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
                minimumFractionDigits: 3
            });
            let convertResult = price.format(totalPrice).replace('.', ',').replace('₫', $('[data-cart-total]').attr('data-currency'));
            $('[data-cart-total]').text(() => totalPrice !== 0 ? convertResult : `0 ${$('[data-cart-total]').attr('data-currency')}`);
            $('[data-cart-total]').attr('data-cart-total', totalPrice);
            // console.log(totalPrice)
        };

        const updateTotalQuantity = () => {
            if (currentBook.length < 0) return;
            let totalQuantity = currentBook.reduce((prev, cur) => prev + cur.quantity, 0);
            $('.popup__cart-total-label').text(`Subtotal (${totalQuantity} ${totalQuantity > 1 ? 'items' : 'item'})`);
        }

        const isSlugExists = (slug) => {
            return listProducts.some(prod => prod.slug === slug)
        };

        /** (💡)  - main function */
        const renderListProd = () => {
            currentBook.forEach((item) => {
                createAndPushDOM(item);
            })
            checkEmptyCart();
            counterItem();
            updateTotalPrice();
        }

        const createAndPushDOM = (item, quickBuy) => {
            let itemCartClone = cartItem.clone();
            let itemSuccessClone = cartItemSuccess.clone();

            const setupItem = (itemClone, isCart) => {
                itemClone.attr('data-prod-id', item.slug);

                Object.keys(item).forEach(function (attr) {
                    if (attr == 'cover') {
                        itemClone.find(`[data-prod-${attr}]`).attr('src', item[attr])
                    }
                    else if (attr == 'inventory' && isCart) {
                        let inventory = item[attr];
                        let errorEl = itemClone.find('.popup__cart-item-quantity-err');
                        if (inventory === 0) {
                            errorEl.text('Out of stock');
                            errorEl.css('display', 'inline-block');
                            errorEl.attr('data-prod-quantity-err', 'unavailable');
                            itemClone.find('.popup__cart-item-quantity-wrap').addClass('disable');
                        }
                        else if (0 < inventory && inventory < item.quantity) {
                            errorEl.text(`${inventory} left in stock`);
                            errorEl.css('display', 'inline-block');
                            errorEl.attr('data-prod-quantity-err', 'outOfStock');
                        }
                    } else {
                        itemClone.find(`[data-prod-${attr}]`).text(item[attr])
                    }
                });
            }

            setupItem(itemCartClone, true);
            setupItem(itemSuccessClone);

            requestAnimationFrame(() => {
                if (viewport.width > 767) {
                    let labelWidth = itemCartClone.find('.popup__cart-item-quantity-label').width();
                    gsap.set(itemCartClone.find('.popup__cart-item-quantity'), { x: -labelWidth });
                }
            })

            const btnAction = (action) => itemCartClone.find(`[data-cart-action='${action}']`);
            btnAction('remove').attr('id', item.slug);
            btnAction('remove').on('click', function (e) {
                e.preventDefault();

                buttonAddStatus.remove($(this));
                removeBook(item);
            })

            btnAction('decrease').attr('id', item.slug);
            btnAction('decrease').on('click', function (e) {
                e.preventDefault();

                updateBookQuantity.decrease(item);
            })

            btnAction('increase').attr('id', item.slug);
            btnAction('increase').on('click', function (e) {
                e.preventDefault();
                updateBookQuantity.increase(item);
            })


            $('.popup__cart-listing').append(itemCartClone);
            $('.popup__cart-success--cart-list').append(itemSuccessClone);
            bookQuantityActionDependent(item, item.quantity || 1);
            convertFormatPrice();
        }

        const updateFormInputCart = () => {
            let bookList = currentBook.map((book, index) => `[(${book.quantity}): ${book.name}]`);
            $('#checkout-form #Order').val(bookList.join(' - '));
        }

        const showTooltip = (content) => {
            $('.header__cart-tooltip').text(content);
            setTimeout(() => $('.header__cart-tooltip').addClass('active'), 500);
            setTimeout(() => $('.header__cart-tooltip').removeClass('active'), 2000);
        };

        const buttonAddStatus = {
            init: () => {
                currentBook.forEach((item) => {
                    let btn = $(`[data-cart-action="add"]#${item.slug}`);
                    let btn_text = btn.find('.new-btn-wrap-txt .txt');
                    btn_text.text('Add');
                    btn.addClass('added');
                    setTimeout(() => {
                        btn_text.text('Already added')
                    }, 2000);
                })
            },
            add: (DOM) => {
                let btn_text = DOM.find('.new-btn-wrap-txt .txt');
                if (DOM.hasClass('added')) return;
                btn_text.text('Add');
                DOM.addClass('added');
                DOM.addClass('disable');
                setTimeout(() => {
                    btn_text.text('Already added')
                    DOM.removeClass('disable');
                }, 2000);
            },
            remove: (DOM) => {
                let btn = $(`[data-cart-action="add"]#${DOM.attr('id')}`)
                btn.removeClass('added');
                let btn_text = btn.find('.new-btn-wrap-txt .txt');
                btn_text.text('Add to cart');
            }
        }

        const addBook = (book) => {
            if (!isSlugExists(book.slug)) {

                /** (💡)  - update current book */
                currentBook.push({ ...book, quantity: 1 });

                /** (💡)  - update list slug and localStorage */
                listProducts.push({ slug: book.slug, quantity: 1 });
                console.log('Item added to array:', listProducts);
                localStorage.setItem('products', JSON.stringify(listProducts));

                /** (💡)  - create DOM */
                createAndPushDOM(book);

                /** (💡)  - handleUI */

                if ($('.header__bar').hasClass('on-hide')) {
                    $('.header__bar').removeClass('on-hide');
                    setTimeout(() => counterItem(), 500);
                }
                else {
                    counterItem();
                }
                checkEmptyCart();
                showTooltip('Added book to cart successfully');
            } else {
                // console.log('Item already in array:', listProducts);
                showTooltip('This book already exists in your cart')
            }
            return;
        }

        const removeBook = (book) => {
            if (!isSlugExists(book.slug)) return;

            /** (💡)  - update current book */
            currentBook = currentBook.filter(item => item.slug !== book.slug);

            /** (💡)  - update list slug and localStorage */
            listProducts.splice(listProducts.findIndex(item => item.slug === book.slug), 1);
            localStorage.setItem('products', JSON.stringify(listProducts));
            console.log('Item remove to array:', listProducts);

            /** (💡)  - remove DOM */
            $(`[data-prod-id="${book.slug}"]`).remove();

            /** (💡)  - handleUI */
            if (currentBook.length === 0) {
                setTimeout(() => {
                    if ($('.popup__cart').hasClass('step-2')) {
                        $('.popup__cart').removeClass('step-2')
                        $('.popup__cart-continues').slideDown('fast');
                        $('.popup__cart-form').removeClass('active');
                        setTimeout(() => $('[data-popup-cart="close"').trigger("click"), 200);
                        $('#checkout-form').trigger('reset');
                        $('#checkout-form .input-field-group').removeClass('filled');
                        errorValidation.reset($('#checkout-form').get(0));
                    }
                    else {
                        $('[data-popup-cart="close"').trigger("click")
                    }
                }, 800);
            }
            checkEmptyCart();
            counterItem();
            bookQuantityActionDependent();
        }

        const checkErrorQuantity = () => {
            let quantityErrType
            let error = {};
            let errorContent;

            $('[data-prod-id]').each((idx, el) => {
                let slug = $(el).attr('data-prod-id');
                quantityErrType = $(el).find('[data-prod-quantity-err]').attr('data-prod-quantity-err');
                if (quantityErrType) {
                    if (error[quantityErrType]) {
                        error[quantityErrType] = ++error[quantityErrType];
                    }
                    else {
                        error[quantityErrType] = 1;
                    }
                }
            })
            if (Object.keys(error).length > 0) {
                if (Object.keys(error).length === 2) {
                    errorContent = 'Remove or adjust quantities for unavailable or excess items before checkout.';
                }
                else {
                    if (Object.keys(error)[0] === 'unavailable') {
                        errorContent = 'Remove unavailable product(s) from your cart before checkout.';
                    }
                    else if (Object.keys(error)[0] === 'outOfStock') {
                        errorContent = 'Adjust item quantities to match available stock before checkout.';
                    }
                }
                $('.popup__cart-footer-err').text(errorContent);
                $('.popup__cart-footer-err').slideDown('fast');
                $('.popup__cart-continues').addClass('disable');
            }
            else {
                $('.popup__cart-footer-err').text('');
                $('.popup__cart-footer-err').slideUp('fast');
                $('.popup__cart-continues').removeClass('disable');
            }
        }

        const bookQuantityActionDependent = (book, quantity) => {
            if (book) {
                const bookIndex = (arr) => arr.findIndex(prod => prod.slug === book.slug);
                const bookSelector = childSelect(`[data-prod-id='${book.slug}']`);
                let inventoryItem = currentBook[bookIndex(currentBook)].inventory;
                let quantityText = bookSelector('[data-prod-quantity]');

                //note: handle decrease
                if (quantity === 0) {
                    bookSelector('[data-cart-action="decrease"]').addClass('disable')
                    setTimeout(() => removeBook(book), 350);
                }
                else bookSelector('[data-cart-action="decrease"]').removeClass('disable');

                //note: increase
                if (quantity > inventoryItem) bookSelector('[data-cart-action="increase"]').addClass('disable')
                else bookSelector('[data-cart-action="increase"]').removeClass('disable');

                //note: handle update data
                if (quantity <= inventoryItem) {
                    quantityText.text(quantity);
                    quantityText.text(quantity);

                    if (quantity === 0) return;
                    listProducts[bookIndex(listProducts)].quantity = quantity;
                    localStorage.setItem('products', JSON.stringify(listProducts));

                    currentBook[bookIndex(currentBook)].quantity = quantity;

                    bookSelector('.popup__cart-item-quantity-err').removeAttr('data-prod-quantity-err');
                    bookSelector('.popup__cart-item-quantity-err').css('display', 'none');
                }
                else {
                    bookSelector('.popup__cart-item-quantity-warning').text(`${inventoryItem} lefts in stock`);
                    console.log(bookSelector('.popup__cart-item-quantity-err').text())
                    if (bookSelector('.popup__cart-item-quantity-err').text()) {
                        console.log("none")
                    }
                    bookSelector('.popup__cart-item-quantity-warning').slideDown();

                    setTimeout(() => {
                        bookSelector('.popup__cart-item-quantity-warning').slideUp();
                    }, 1200);
                }
            }
            checkErrorQuantity();
            updateTotalPrice();
            updateTotalQuantity();
            updateFormInputCart();
        }

        const updateBookQuantity = {
            decrease: (book) => {
                if (!book) return;

                const bookSelector = childSelect(`[data-prod-id="${book.slug}"]`);
                let quantity = bookSelector('.popup__cart-item-quantity-txt');
                let currQuantity = quantity.text();
                let nextQuantity = --currQuantity;

                bookQuantityActionDependent(book, nextQuantity);
            },
            increase: (book) => {
                if (!book) return;

                const bookSelector = childSelect(`[data-prod-id="${book.slug}"]`);
                let quantity = bookSelector('.popup__cart-item-quantity-txt');
                let currQuantity = quantity.text();
                let nextQuantity = ++currQuantity;

                bookQuantityActionDependent(book, nextQuantity);
            }
        }

        const onSuccessRefresh = {
            quickBuy: () => {
                $('.popup__cart-heading').addClass('order-success');
                $('[data-popup-cart="close"]').on('click', function (e) {
                    location.reload(true);
                })
                $('.popup__cart-form--inner').css('position', 'static');
            },
            multipleOrder: () => {
                setTimeout(() => {
                    $('.popup__cart-heading').addClass('order-success');
                    localStorage.removeItem('products');
                    $('[data-popup-cart="close"]').on('click', function (e) {
                        location.reload(true);
                    })
                    $('.popup__cart-form--inner').css('position', 'static');
                }, 2000)
            }
        }

        const quickBuy = (book) => {
            const openQuickbuy = () => {
                setTimeout(() => {
                    $('.popup__cart').addClass('step-2 quick-buy');
                    $('.popup__cart-form').addClass('quick-buy');
                    $('.popup__cart-footer').addClass('active')
                }, 200)
                $('.popup__cart-total-label').text('Subtotal (1 item)');
                $('.popup__cart-total[data-cart="cart"]').slideDown('fast');
                $('.popup__cart-empty').removeClass('active');

                if ($(window).outerWidth() > 767) {
                    setTimeout(() => {
                        $('.popup__cart-form').addClass('active');
                    }, 200)
                    $('.popup__cart-continues').css('display', 'none');
                    $('.popup__cart-form--inner').css('display', 'flex');
                    $('.popup__cart-total:not([data-cart="cart"])').hide();
                    $('.popup__cart-heading-buying').css('opacity', '0');
                    $('.popup__cart-heading-order').css('opacity', '1');
                    $('.popup__cart-footer-ship').slideDown('fast');
                } else {
                    $('.popup__cart-heading-txt-wrapper').css('display', 'none');
                    $('.popup__cart-btn--wrap').css('paddingTop', '1rem');
                    $('.popup__cart-footer').removeClass('active');
                    if (viewport.width <= 767) {
                        // $('.popup__cart-form-submit-wrapper').css('pointerEvents', 'auto')
                    }
                }

                $('.popup__cart-footer-err').text('');
                // $('.popup__cart-footer-err').slideUp('fast');
                $('.popup__cart-continues').removeClass('disable');
            }
            openQuickbuy();

            let newBook = { ...book, quantity: 1 };
            const changeInfo = (book) => {
                let price = Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                    minimumFractionDigits: 3
                });
                let totalPrice = book?.price
                let convertResult = price.format(totalPrice).replace('.', ',').replace('₫', $('[data-cart-total]').attr('data-currency'));
                $('[data-cart-total]').text(() => totalPrice !== 0 ? convertResult : `0 ${$('[data-cart-total]').attr('data-currency')}`);
                $('[data-cart-total]').attr('data-cart-total', totalPrice);

                let wrap = $('.popup__quickbuy-item')
                wrap.find('[data-prod-quickbuy-cover]').attr('src', book.cover)
                wrap.find('[data-prod-quickbuy-name]').text(book.name)

                // $('.popup__cart-success--cart-list').html('');
                let itemSuccessQuickBuy = $('.popup__cart-success--cart-single .popup__cart-success--cart-item');
                itemSuccessQuickBuy.attr('data-prod-id', book.slug);
                Object.keys(book).forEach(function (attr) {
                    if (attr == 'cover') {
                        itemSuccessQuickBuy.find(`[data-prod-${attr}]`).attr('src', book[attr])
                    }
                    else {
                        itemSuccessQuickBuy.find(`[data-prod-${attr}]`).text(book[attr])
                    }
                });
                // $('.popup__cart-success--cart-list').append(itemSuccessClone);
            }
            changeInfo(newBook);

            $('#checkout-form #Order').val(`[(1): ${book.name}]`);
            initFormCheckout(onSuccessRefresh.quickBuy);
        }

        /** (💡)  - Init cart */
        renderListProd();
        updateFormInputCart();
        buttonAddStatus.init();

        window.fsAttributes = window.fsAttributes || [];
        window.fsAttributes.push([
        'cmsfilter',
            (filterInstances) => {
                filterInstances.forEach((item, index) => {
                    switch (index) {
                        // filter search render items
                        case 0: {
                            const filterByCategory = filterInstances[index];
                            filterByCategory.listInstance.on('renderitems', (renderedItems) => {
                                $('[data-cart-action="add"]').on('click', function (e) {
                                    fetchBook($(this).attr('id')).then((data) => {
                                        e.preventDefault();

                                        $('.header__bar').addClass('on-atc')
                                        setTimeout(() => {
                                            $('.header__bar').removeClass('on-atc')
                                        }, 2500)
                                        addBook(data);
                                        buttonAddStatus.add($(this));
                                    })
                                })
                            })
                        }
                    }
                })
            },
        ]);

        $('[data-cart-action]').on('click', function (e) {
            // let book = booksData.find(item => item.slug === $(this).attr('id'))
            fetchBook($(this).attr('id')).then((data) => {
                cartAction(data);
            })
            const cartAction = (book) => {
                switch ($(this).attr('data-cart-action')) {
                    case 'add': {
                        e.preventDefault();

                        $('.header__bar').addClass('on-atc')
                        $('.prod__all-processing').addClass('on-atc')

                        setTimeout(() => {
                            $('.header__bar').removeClass('on-atc')
                            $('.prod__all-processing').removeClass('on-atc')
                        }, 2500)
                        addBook(book);
                        buttonAddStatus.add($(this));
                        break;
                    }
                    case 'edit': {
                        gsap.to($(this), { autoAlpha: 0, y: -10 });
                        if (viewport.width > 767) {
                            gsap.to($('[data-cart-action="remove"]'), { autoAlpha: 1, y: 0 });
                        }
                        break;
                    }
                    case 'back': {
                        $('.popup__cart').removeClass('step-2');
                        $('.popup__cart-form').removeClass('active');
                        setTimeout(() => {
                            $('.popup__cart-continues').slideDown('fast');
                            $('.popup__cart-footer-ship').slideUp('fast');
                            if (viewport.width > 767) {
                                gsap.to('.popup__cart-item-quantity', { x: -$('.popup__cart-item-quantity-label').width() });
                                $('.popup__cart-item-decrease').slideDown('fast');
                                $('.popup__cart-item-increase').slideDown('fast');
                            }
                        }, 200);
                        break;
                    }
                    case 'quickBuy': {
                        e.preventDefault();
                        quickBuy(book);
                        break;
                    }
                    default: break;
                }
            }
        })

        $('.popup__cart-continues').on('click', function (e) {
            e.preventDefault();
            $('.popup__cart-continues').slideUp('fast');
            $('.popup__cart-footer-ship').slideDown('fast');
            setTimeout(() => {
                $('.popup__cart').addClass('step-2');
                $('.popup__cart-form').addClass('active');
            }, 200)
            if (viewport.width > 767) {
                gsap.to($('[data-cart-action="remove"]'), { autoAlpha: 0, y: 5 });
                $('.popup__cart-total:not([data-cart="cart"])').hide();
                gsap.to('.popup__cart-item-quantity', { x: 0 })
                $('.popup__cart-item-decrease').slideUp('fast');
                $('.popup__cart-item-increase').slideUp('fast');
            }
            else {
                $('.popup__cart-form-submit-wrapper').css('pointerEvents', 'auto')
                $('.popup__cart-form .popup__cart-form-heading [data-popup-cart]').removeAttr('data-popup-cart').attr('data-cart-action', 'back');
            }

            if ($('.popup__cart').hasClass('quick-buy')) return;
            initFormCheckout(onSuccessRefresh.multipleOrder);
        })

        $('[data-form-btn="submit"]').on('click', function (e) {
            e.preventDefault()
            if ($(window).width() <= 767) {
                $('[data-cart-action="back"]').attr('data-popup-cart', 'close')
                $('[data-cart-action="back"]').removeAttr('data-cart-action')
            }
        })

        $('[data-popup-cart="open"]').on('click', function (e) {
            if (!$(this).hasAttr('data-cart-action')) {
                checkErrorQuantity()
            }
        })

        $('[data-popup-cart="close"]').on('click', function (e) {
            setTimeout(() => {
                if (viewport.width > 767) {
                    $('.popup__cart').removeClass('step-2 quick-buy');
                    $('.popup__cart-form').removeClass('quick-buy');
                    gsap.to('.popup__cart-item-quantity', { x: -$('.popup__cart-item-quantity-label').width() });
                    $('.popup__cart-item-decrease').slideDown('fast');
                    $('.popup__cart-item-increase').slideDown('fast');
                    gsap.to($('[data-cart-action="remove"]'), { autoAlpha: 1, y: 0 });
                    updateTotalQuantity();
                    updateFormInputCart();
                    updateTotalPrice();
                }
                else {
                    $('.popup__cart-form-submit-wrapper').css('pointerEvents', 'none');
                    if ($('.popup__cart').hasClass('quick-buy')) {
                        if ($('.popup__cart-form').hasClass('active')) {
                            $('.popup__cart').removeClass('step-2');
                        }
                        else {
                            $('.popup__cart').removeClass('step-2 quick-buy');
                            $('.popup__cart-form').removeClass('quick-buy');
                            updateTotalQuantity();
                            updateFormInputCart();
                            updateTotalPrice();
                        }
                    }
                    else {
                        // $('.popup__cart-continues').slideDown('fast');
                        // $('.popup__cart-footer-ship').slideUp('fast');
                        // $('.popup__cart-item-quantity-label').slideUp('slow');
                        // $('.popup__cart-item-decrease').css('display', 'block');
                        // $('.popup__cart-item-increase').css('display', 'block');
                        $('.popup__cart').removeClass('step-2');
                        updateTotalQuantity();
                        updateFormInputCart();
                        updateTotalPrice();
                    }
                }

                $('.popup__cart-continues').slideDown('fast');
                $('.popup__cart-footer-ship').slideUp('fast');
                $('.popup__cart-form').removeClass('active');
                $('.popup__cart-heading-buying').css('opacity', '1');
                $('.popup__cart-heading-order').css('opacity', '0');
                errorValidation.reset($('#checkout-form').get(0));
            }, 350);
        })
        $('[data-popup-cart="wrap"] .popup-overlay').on('click', function (e) {
            if ($('[data-popup-cart="wrap"]').hasClass('active')) {
                setTimeout(() => {
                    $('[data-popup-cart="wrap"]').removeClass('active');
                    $('.header-bar').removeClass('force');
                }, 100)
                lenis.start();
            };
        })
    }

    const SCRIPT = {};
    const PAGES = [
        HOME = {},
        BOOK = {},
        BOOK_DETAIL = {},
        BLOG = {},
        BLOG_DETAIL = {},
        FAQ = {},
        POLICY = {},
        AICLASS = {},
        BOOKSOURCE = {}
    ];

    SCRIPT.homeScript = () => {
        console.log("enter home");
        HOME.Hero = () => {
            marqueeCSS({
                parent: childSelect('.home__hero-showcase-marquee'),
                duration: 30
            });
            const swiperHeading = () => {
                const parent = childSelect('.home__hero-heading-second');

                swiper.initClassName(parent);
                swiper.setup(parent, {
                    // touchMove: true,
                    speed: 900,
                    direction: 'vertical',
                    loop: true,
                    autoplay: {
                        delay: 2000,
                        reverseDirection: true,
                        disableOnInteraction: false,
                    }
                })
            }
            swiperHeading();

            const animShowEl = () => {
                const homeHeroTitle = splitTextFadeUpSetup('.home__hero-heading--wrap .heading.display');
                const homeHeroSub = splitTextFadeUpSetup('.home__hero-subheading');

                gsap.set('.home__hero-showcase-item', { autoAlpha: 0, yPercent: 40, xPercent: 30, rotate: -2 });

                const homeHeroTl = gsap.timeline({ delay: 0.5 });
                homeHeroTl
                    .to(homeHeroTitle.words, {
                        yPercent: 0, duration: .8, stagger: .04, ease: 'power2.out',
                        onComplete: () => {
                            homeHeroTitle.revert();
                        }
                    }, '>-.4')
                    .to(homeHeroSub.words, {
                        yPercent: 0, duration: .5, stagger: .01, ease: 'power2.out',
                        onComplete: () => {
                            homeHeroSub.revert();
                        }
                    }, '>-.5')
                    .to('.home__hero-showcase-item', {
                        autoAlpha: 1, yPercent: 0, xPercent: 0, rotate: 0, duration: 1.2, stagger: .05, ease: 'power2.inOut'
                    }, .35)
            }
            animShowEl();
        }

        HOME.Category = () => {
            const flipText = () => {
                const splitText = new SplitText('.home__cate-cms-txt', {
                    type: 'words, chars',
                    tag: 'span',
                    wordsClass: 'g-words',
                    charsClass: 'g-chars',
                    position: "absolute"
                });

                $(".home__cate-cms-link").each(function (index) {
                    let splitMain = $(this).find(".home__cate-cms-txt.txt-main .g-chars");
                    let splitSub = $(this).find(".home__cate-cms-txt.txt-sub .g-chars");
                    // Timeline
                    let tl = gsap.timeline({ paused: true });
                    tl.to(splitMain, {
                        translateY: "-0.2em",
                        rotationY: "-5.7deg",
                        rotationX: "-90deg",
                        stagger: { each: 0.01 },
                        ease: "power1.out",
                        duration: 0.4
                    });
                    tl.from(splitSub, {
                        translateY: "0.2em",
                        rotationY: "5.7deg",
                        rotationX: "90deg",
                        stagger: { each: 0.01 },
                        ease: "power2.out",
                        duration: 0.4
                    }, 0.1)
                    $(this).on("mouseenter", function (e) {
                        e.preventDefault()
                        tl.restart()
                    })

                    $(this).on("mouseleave", function (e) {
                        e.preventDefault()
                    });
                });
            }
            flipText();

            const applyThumb = () => {
                let thumbParentTarget = $('.home__cate-book').eq(0).clone();
                let thumbItemTarget = $('.home__cate-book-item').eq(0).clone();
                $('.home__cate-book').remove();


                $('.home__cate-cms-item').each((idx, el) => {
                    const category = $(el).find('.home__cate-cms-link').attr('id');
                    const categoryString = category.toLowerCase().replace(/[^a-zA-Z ]/g, "").replaceAll(' ', '-').replaceAll('--', '-');

                    let listWrapClone = thumbParentTarget.clone();
                    listWrapClone.attr('data-category', category);
                    listWrapClone.find('.home__cate-book--inner').html('');

                    fetchBookByCate(categoryString).then((data) => {
                        $(data).each((idx, book) => {
                            const { cover } = book;
                            let itemClone = thumbItemTarget.clone();
                            itemClone.find('.home__cate-book-img--inner').attr('src', cover);
                            listWrapClone.find('.home__cate-book--inner').append(itemClone);
                        });
                    });
                    $('.home__cate-listing').append(listWrapClone);
                });
            }
            applyThumb()

            const showOnHover = () => {
                $('.home__cate-cms-link').on("pointerenter", function () {
                    let category = $(this).attr('id');
                    $('.home__cate-book').removeClass('active');
                    $(`.home__cate-book[data-category="${category}"]`).addClass('active');
                });
                $('.home__cate-cms-link').on("pointerleave", function () {
                    let category = $(this).attr('id');
                    $('.home__cate-book').removeClass('active');
                });

            }
            showOnHover();

            const URLBooks = () => {
                $('.home__cate-cms-link').each((idx, el) => {
                    $(el).attr('href', `${$(el).attr('href')}/?${convertCategoryUrlParam($(el).attr('id'))}`);
                })
            }
            URLBooks()
        }

        HOME.Interest = () => {
            const initMarquees = () => {
                marqueeCSS({ parent: childSelect('.home__interest-marquee'), duration: 30 })
                if (viewport.width > 991) {
                    $('.home__interest-disco-cms-link--wrap').each((_, item) => marqueeGS({ parent: childSelect(item), duration: 60 }))
                }
            }
            initMarquees();

            const productAnim = () => {
                const PRODUCT = {
                    wrap: $('.home__interest-disco-cms-item'),
                    marquee: $('.home__interest-disco-cms-marquee'),
                    marqueeWrap: $('.home__interest-disco-cms-marquee-wrap')
                }

                const mouseAction = {
                    Enter: (ev, el) => {
                        const edge = findClosestEdge(ev, el.get(0));
                        const _marquee = el.find(PRODUCT.marquee);
                        const _marqueeWrap = el.find(PRODUCT.marqueeWrap);

                        gsap.timeline({
                            duration: 0.4, ease: 'linear'
                        }).set(_marquee, {
                            y: edge === 'top' ? '-101%' : '101%',
                        }, 0).set(_marqueeWrap, {
                            y: edge === 'top' ? '101%' : '-101%',
                        }, 0).to([_marquee, _marqueeWrap], {
                            y: '0%',
                        }, 0)
                    },
                    Leave: (ev, el) => {
                        const edge = findClosestEdge(ev, el.get(0));
                        const _marquee = el.find(PRODUCT.marquee);
                        const _marqueeWrap = el.find(PRODUCT.marqueeWrap);

                        gsap.timeline({
                            duration: 0.4, ease: 'linear'
                        }).to(_marquee, {
                            y: edge === 'top' ? '-101%' : '101%',
                        }, 0).to(_marqueeWrap, {
                            y: edge === 'top' ? '101%' : '-101%',
                        }, 0)
                    }
                }
                PRODUCT.wrap.on("pointerenter", function (ev) {
                    let index = $(this).index();
                    mouseAction.Enter(ev, PRODUCT.wrap.eq(index));
                });

                PRODUCT.wrap.on("pointerleave", function (ev) {
                    let index = $(this).index();
                    mouseAction.Leave(ev, PRODUCT.wrap.eq(index));
                });
            }
            const interestThumb = () => {
                let target = $('.home__interest-disco-cms-item')
                target.on('mouseenter', function (e) {
                    e.preventDefault()
                    $(this).find('.home__interest-disco-cms-img--wrapper').addClass('active')
                })
                target.on('mouseleave', function (e) {
                    e.preventDefault()
                    $('.home__interest-disco-cms-item .home__interest-disco-cms-img--wrapper').removeClass('active')
                })
                function initMouseMove() {
                    target.each((idx, el) => {
                        let child = $(el).find('[data-thumb]');
                        let imageInner = $(el).find('.home__interest-disco-cms-img').get(1);
                        xPos = xGetter(child.get(0))
                        yPos = yGetter(child.get(0))
                        zRot = rotZGetter(child.get(0))

                        if ($('.home__interest-discover:hover')) {
                            xMove = ($(el).width() - child.width()) * (pointer.x - el.getBoundingClientRect().left) / $(el).width()
                            yMove = -($(el).height() + child.height() / 2) + (pointer.y - el.getBoundingClientRect().top)

                            xSetter(imageInner)(lerp(xGetter(imageInner), (xMove - xPos) * .1, .04));
                            ySetter(imageInner)(lerp(yGetter(imageInner), (yMove - yPos) * .1, .04));

                            xSetter(child.get(0))(lerp(xPos, xMove, .06))
                            ySetter(child.get(0))(lerp(yPos, yMove, .06))
                            rotZSetter(child.get(0))(lerp(zRot, Math.min(Math.max((xMove - xPos) / 30, -8), 8), .04))
                        }
                    })
                    requestAnimationFrame(initMouseMove)
                }
                requestAnimationFrame(initMouseMove)
            }

            const swiperProduct = () => {
                const parent = childSelect('.home__interest-disco-listing');
                swiper.initClassName(parent);
                swiper.setup(parent, {
                    onView: "auto",
                    touchMove: true,
                    nav: true
                })
            }
            if (viewport.width > 991) {
                productAnim();
                interestThumb()

            }
            else if (viewport.width <= 767) {
                swiperProduct();
            }
        }

        HOME.Experience = () => {
            const initMarquees = () => {
                marqueeCSS({ parent: childSelect('.home__exper-marquee'), duration: 30 })
            }
            initMarquees();
        }

        HOME.News = () => {
            arrowAnim('.home__news-listing-control');

            let el = $('.home__news-cms-list.mod-lg').find('.home__news-cms-item').eq(0);
            $('.home__news-cms-list.mod-lg').append(el);

            const swiperNews = () => {
                let parent = childSelect('.home__news-listing');
                swiper.initClassName(parent);
                swiper.setup(parent, {
                    nav: true,
                    speed: 900,
                    parallax: true,
                    watchSlidesProgress: true,
                    on: {
                        beforeInit: () => {
                            parent('.swiper-slide').show();
                        }
                    }
                })
            }
            swiperNews();
        }
    }

    SCRIPT.bookScript = () => {
        console.log("enter books");
        BOOK.Hero = () => {
            const animShowEl = () => {
                const bookHeroTitle = splitTextFadeUpSetup('.prod__hero-heading');
                const bookHeroDesc = splitTextFadeUpSetup('.prod__hero-sub');

                const bookHeroTl = gsap.timeline({
                    delay: .5
                });

                gsap.set('.prod__hero-heading-sub', { autoAlpha: 0, yPercent: 100 });
                gsap.set(['.cms__processing--wrap.hidden-mb', '.cms__all-processing-search.hidden-mb'], { autoAlpha: 0, x: -40 })

                bookHeroTl
                    .to(bookHeroTitle.words, {
                        yPercent: 0, duration: .8, stagger: .035, ease: 'power2.out',
                        onComplete: () => {
                            bookHeroTitle.revert();
                        }
                    }, 0)
                    .to('.prod__hero-heading-sub', {
                        autoAlpha: 1, duration: .8, ease: 'power2.out',
                        yPercent: 0
                    }, .1)
                    .to(bookHeroDesc.words, {
                        yPercent: 0, duration: .8, ease: 'power2.out',
                        onComplete: () => {
                            bookHeroDesc.revert();
                        }
                    }, '< .2')
                    .to(['.cms__processing--wrap.hidden-mb', '.cms__all-processing-search.hidden-mb'], {
                        x: 0, autoAlpha: 1, duration: 1, stagger: .02, ease: 'power2.out'
                    }, '>-.2')
            }
            animShowEl();
        }
        BOOK.Filter = () => {
            initCMSProcessing('#book-processing');
            if (viewport.width > 767) {
                lenis.on('scroll', function (e) {
                    if (lenis.velocity < 0) {
                        $('.prod__all-processing').removeClass('on-scroll')
                    } else if (lenis.velocity > 0) {
                        $('.prod__all-processing').addClass('on-scroll')
                    }
                })
            }
            window.fsAttributes = window.fsAttributes || [];
            window.fsAttributes.push([
                'cmssort',
                (sortInstances) => {
                    sortInstances.forEach((item, index) => {
                        switch (index) {
                            // filter search render items
                            case 0: {
                                item.on('renderitems', (target) => {
                                    convertFormatPrice();
                                })
                            }
                        }
                    })
                },
            ]);
            let searchParam = new URLSearchParams(window.location.search);
            let nameParam = searchParam.get('name');
            let searchInput = $('#Search-template.cms__all-processing-search-input, #Search-template-2.cms__all-processing-search-input');
            if (nameParam) {
                searchInput.val(nameParam);
                searchInput.get(0).dispatchEvent(new Event('input', { bubbles: true }));
            }

            let debounceTimer;
            searchInput.on('input', () => {
                clearTimeout(debounceTimer);

                debounceTimer = setTimeout(() => {
                    const searchedText = searchInput.val();
                    const trimmedSearchText = searchedText.trim();

                    if (searchInput.val() !== trimmedSearchText) {
                        searchInput.val(trimmedSearchText);
                        searchInput.get(0).dispatchEvent(new Event('input', { bubbles: true }));
                    }
                }, 800);
            });

            if ($(window).outerWidth() <= 767) {
                $('.prod__all-processing-mb-form .cms__all-processing-search').addClass('active')
                $('.prod__all-processing-mb-form .cms__all-processing-search').on('click', function (e) {
                    e.preventDefault()
                    $(this).addClass('active')
                })
                $('.prod__all-processing-mb-form .cms__all-processing-search-toggle').on('click', function (e) {
                    if ($('.prod__all-processing-mb-form .cms__all-processing-search').hasClass('active')) {
                        requestAnimationFrame(() => {
                            $('.prod__all-processing-mb-form .cms__all-processing-search').removeClass('active')
                        })
                    }
                })
            }
            ScrollTrigger.create({
                trigger: '.prod__sc-all',
                start: 'bottom top+=60%',
                onEnter: () => {
                    $('.cms__processing-toggle').removeClass('active')
                    $('.expand-ic.cms__all-processing-ic').removeClass('active')

                    gsap.to('.cms__processing-listing', { y: -30, autoAlpha: 0, duration: .4, ease: 'power1.easeInOut' })
                }
            })
        }
        BOOK.Listing = () => {
            $('.prod__all-listing .prod__all-listing-cms-item').each((idx, el) => {
                if (idx < ($(window).width() > 991 ? 3 : 4)) {
                    gsap.from(el, {y: parseRem(25), opacity: 0, ease: "power1.out", duration: .8}, idx * .1 + 1.8)
                } else return
            })
            $('.prod__all-pagination--number-btn, .prod__all-pagination-btn').on('click', function (e) {
                e.preventDefault()
                setTimeout(() => {
                    lenis.scrollTo('.prod__sc-all', { duration: 1, onComplete: () => { convertFormatPrice() } })
                }, 300)
            })
        }
    }

    SCRIPT.bookDetailScript = () => {
        console.log("enter book detail");
        BOOK_DETAIL.Hero = () => {

        }
        BOOK_DETAIL.StickyBar = () => {
            requestAnimationFrame(() => {
                $('.book__cart-bar').removeClass('active');
            })
            const DOM = {
                startStage: document.querySelector(".book__sc-showcase"),
                endStage: document.querySelector(".footer"),
                fixedWrap: document.querySelector('.book__cart-bar')
            }

            ScrollTrigger.create({
                trigger: '.book__sc-showcase',
                start: 'top top+=10%',
                endTrigger: '.footer',
                end: 'top top+=50%',
                toggleClass: {
                    targets: '.book__cart-bar',
                    className: 'active'
                }
            })

            if (viewport.width > 767) {
                lenis.on('scroll', function (e) {
                    if (lenis.direction < 0) {
                        $('.book__cart-bar').addClass('on-scrollup')
                    } else if (lenis.direction > 0) {
                        $('.book__cart-bar').removeClass('on-scrollup')
                    }
                })
            } else {
                lenis.on('scroll', function (e) {
                    $('.book__cart-bar').addClass('on-scrollup')
                })
            }


            $('.book__cart-bar').on('click', function (e) {
                e.preventDefault()
                $('.book__cart-bar').addClass('on-scrollup')

                if ($('.book__cart-bar').hasClass('active')) {
                    $('.header__bar').addClass('on-atc')
                    $('.book__cart-bar').addClass('on-scrollup')
                }
                setTimeout(() => {
                    $('.header__bar').removeClass('on-atc')
                    $('.header__bar').addClass('on-hide')
                    $('.book__cart-bar').removeClass('on-scrollup')
                }, 2500)
            })
        }
        BOOK_DETAIL.Filter = () => {
            const URLBooks = () => {
                $('.book__hero-breadcrumb-txt[data-filter-books]').each((idx, el) => {
                    $(el).attr('href', `${$(el).attr('href')}/?${convertCategoryUrlParam($(el).attr('id'))}`);
                })
            }
            URLBooks()

            const checkRelated = () => {
                if ($(window).width() < 991) {
                    $('.book__sc-related').find('.book__related-cms-item').eq(2).remove()
                }

                if ($('.book__sc-related').find('.w-dyn-empty').length) {
                    $('.book__sc-related').css('display', 'none')
                    $('.book__sc-showcase').css('paddingBottom', '12.38rem')
                }
            }
            checkRelated()
        }
        BOOK_DETAIL.Thumb = () => {
            const swiperShowcase = () => {
                let parent = childSelect('.book__showcase-listing');
                swiper.initClassName(parent);
                swiper.setup(parent, {
                    nav: true,
                    speed: 900,
                    parallax: true,
                    watchSlidesProgress: true,
                    on: {
                        beforeInit: () => {
                            parent('.swiper-slide').show();
                        }
                    }
                })
            }
            swiperShowcase();

            if (viewport.width > 767) {
                arrowAnim('.book__showcase-listing-control');
                $('.book__showcase-listing.hidden-mb .book__showcase-cms-list:not(".mod-lg") .book__showcase-cms-item:last-child').remove();
                $('.book__showcase-listing.hidden-mb .book__showcase-cms-list.mod-lg .book__showcase-cms-item:first-child').remove();
            }
        }
    }

    SCRIPT.blogScript = () => {
        console.log("enter blogs");
        BLOG.Hero = () => {
            const animShowEl = () => {
                const blogHeroTitle = splitTextFadeUpSetup('.blog__hero-heading');
                const blogHeroDesc = splitTextFadeUpSetup('.blog__hero-sub');

                const bookHeroTl = gsap.timeline({
                    delay: .5
                });

                gsap.set('.blog__hero-heading-sub', { autoAlpha: 0, yPercent: 100 });
                gsap.set('.cms__processing--wrap', { autoAlpha: 0, x: -40 })

                bookHeroTl
                    .to(blogHeroTitle.words, {
                        yPercent: 0, duration: .8, stagger: .035, ease: 'power2.out',
                        onComplete: () => {
                            blogHeroTitle.revert();
                        }
                    }, 0)
                    .to('.blog__hero-heading-sub', {
                        autoAlpha: 1, duration: .8, ease: 'power2.out',
                        yPercent: 0
                    }, 0)
                    .to(blogHeroDesc.words, {
                        yPercent: 0, duration: .8, ease: 'power2.out',
                        onComplete: () => {
                            blogHeroDesc.revert();
                        }
                    }, '< .2')
                    .to('.cms__processing--wrap', {
                        x: 0, autoAlpha: 1, duration: 1, stagger: .02, ease: 'power2.out'
                    }, '>-.2')
            }
            animShowEl();
        }

        BLOG.Filter = () => {
            if (viewport.width > 767) {
                lenis.on('scroll', function (e) {
                    if (lenis.velocity < 0) {
                        $('.blog__all-processing').removeClass('on-scroll')
                    } else if (lenis.velocity > 0) {
                        $('.blog__all-processing').addClass('on-scroll')
                    }
                })
            }

            ScrollTrigger.create({
                trigger: '.blog__sc-all',
                start: 'bottom top+=60%',
                onEnter: () => {
                    $('.cms__processing-toggle').removeClass('active')
                    $('.expand-ic.cms__all-processing-ic').removeClass('active')

                    gsap.to('.cms__processing-listing', { y: -30, autoAlpha: 0, duration: .4, ease: 'power1.easeInOut' })
                }
            })
        }

        BLOG.Listing = () => {
            initCMSProcessing('#blog-processing');
        }

        BLOG.Pagination = () => {
            const checkPagination = () => {
                if ($('[role="navigation"]').find('.blog__all-pagination--number').html() === '') {
                    $('[role="navigation"]').css('display', 'none')
                }
            }
            checkPagination()
        }
    }

    SCRIPT.blogdtlScript = () => {
        console.log("enter blogs detail");

        BLOG_DETAIL.Hero = () => {
            const animShowEl = () => {
                const bookHeroBreadcrumb = splitTextFadeUpSetup('.news-sc-bc');
                const bookHeroTitle = splitTextFadeUpSetup('.newsdtl-heading');
                const bookHeroInfo = splitTextFadeUpSetup('.news-hero-info');

                gsap.set('.news-hero-img-wrap', { clipPath: 'inset(20%)', scaleX: 2, yPercent: 50 });
                gsap.set('.news-hero-img-wrap img', { scale: 1.4, autoAlpha: 0 });

                const bookHeroTl = gsap.timeline({
                    delay: .25
                });

                bookHeroTl
                    .to(bookHeroBreadcrumb.words, {
                        yPercent: 0, duration: .5, stagger: .05, ease: 'power2.out',
                        onComplete: () => {
                            bookHeroBreadcrumb.revert();
                            $('.new-link-brc[data-filter-blog]').each((idx, el) => {
                                requestAnimationFrame(() => {
                                    let a = $(el).attr('href')
                                    let b = convertCategoryUrlParam($(el).attr('id'))
                                    let target = `${a}/?${b}`
                                    setTimeout(() => {
                                        $(el).attr('href', target)
                                    }, 2000)
                                })
                            })
                        }
                    })
                    .to(bookHeroTitle.words, {
                        yPercent: 0, duration: .8, stagger: .04, ease: 'power2.out',
                        onComplete: () => {
                            bookHeroTitle.revert();
                            $('.new-link-brc[data-filter-blog]').each((idx, el) => {
                                $(el).attr('href', `${$(el).attr('href')}/?${convertCategoryUrlParam($(el).attr('id'))}`);
                            })
                        }
                    }, '< .2')
                    .to(bookHeroInfo.words, {
                        yPercent: 0, duration: .6, stagger: .05, ease: 'power2.out',
                        onComplete: () => {
                            bookHeroInfo.revert();
                        }
                    }, '<= 0.2')
                    .to('.news-hero-img-wrap', { clipPath: 'inset(0%)', duration: 3, scale: 1, ease: 'expo.out', clearProps: 'all', yPercent: 0 }, 0)
                    .to('.news-hero-img-wrap img', { scale: 1, duration: 3, autoAlpha: 1, ease: 'expo.out', clearProps: 'all' }, '< 0')

            }
            animShowEl();
        }
        BLOG_DETAIL.ShareBtn = () => {
            let title = document.title;
            let url = window.location.href;
            $('[data-share-facebook').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + url + '%2F&title=' + title + '%3F');
            $('[data-share-facebook').attr('target', '_blank');

            $('[data-copy-clipboard]').on('mouseenter', function (e) {
                e.preventDefault()
                $('.copypaste-tooltip').addClass('active')
            })
            $('[data-copy-clipboard]').on('mouseleave', function (e) {
                e.preventDefault()
                $('.copypaste-tooltip').removeClass('active')
                setTimeout(() => {
                    $('.copypaste-tooltip').text('Copy link')
                }, 400)
            })
            $('[data-copy-clipboard]').on("click", function (e) {
                e.preventDefault()
                navigator.clipboard.writeText(url)
                $('.copypaste-tooltip').addClass('active')
                $('.copypaste-tooltip').text('Link copied')
                setTimeout(() => {
                    $('.copypaste-tooltip').removeClass('active')
                }, 1500)
            });
        }

        BLOG_DETAIL.Filter = () => {
            const checkRelated = () => {
                if ($('.home__sc-news').find('.w-dyn-empty').length) {
                    $('.home__sc-news').css('display', 'none')
                    $('.news-body').css('paddingBottom', '12.38rem')
                }
            }
            checkRelated()
        }
    }

    SCRIPT.faqScript = () => {
        console.log("enter faqs");

        FAQ.Hero = () => {
            const animShowEl = () => {
                const faqHeroTitle = splitTextFadeUpSetup('.faq__hero-title-txt');
                const faqHeroDate = splitTextFadeUpSetup('.faq__hero-sub');

                gsap.set('.faq__content-cms-item', { y: 10, autoAlpha: 0 });
                const faqHeroTl = gsap.timeline({ delay: 0.25 });

                faqHeroTl
                    .to(faqHeroTitle.words, {
                        yPercent: 0, duration: .8, stagger: .04, ease: 'power2.out',
                        onComplete: () => {
                            faqHeroTitle.revert();
                        }
                    })
                    .to(faqHeroDate.words, {
                        yPercent: 0, duration: .5, stagger: .05, ease: 'power2.out',
                        onComplete: () => {
                            faqHeroDate.revert();
                        }
                    }, '>-.4')
                    .to('.faq__content-cms-item', {
                        y: 0, autoAlpha: 1, duration: 1, stagger: .1, ease: 'power2.out'
                    })

            }
            animShowEl();
        }

        FAQ.Listing = () => {
            const parent = childSelect('.faq__content-listing');
            const DOM = {
                accordion: parent('.accordion'),
                accordionTitle: parent('.accordion-title'),
                accordionContent: parent('.accordion-content')
            }
            parent(DOM.accordionContent).hide();
            function activeAccordion(index) {
                DOM.accordionContent.eq(index).slideToggle("slow");
                DOM.accordion.eq(index).toggleClass("active");

                DOM.accordionContent.not(DOM.accordionContent.eq(index)).slideUp("slow");
                DOM.accordion.not(DOM.accordion.eq(index)).removeClass("active");
            };

            DOM.accordionTitle.on("click", function () {
                let index = $(this).closest('.faq__content-cms-item').index();
                activeAccordion(index);
            })
        }
    }

    SCRIPT.policyScript = () => {
        console.log("enter policy");
        POLICY.Hero = () => {
            const animShowEl = () => {
                const policyHeroTitle = splitTextFadeUpSetup('.policy__hero-title-txt');
                const policyHeroDate = splitTextFadeUpSetup('.policy__hero-update');

                gsap.set('.policy__content-tab-cms-item', { y: 10, autoAlpha: 0 });
                gsap.set('.policy__content-tab-title', { y: 10, autoAlpha: 0 });
                gsap.set('.policy__content--inner', { y: 20, autoAlpha: 0 });
                const policyHeroTl = gsap.timeline({ delay: 0.25 });

                policyHeroTl
                    .to(policyHeroTitle.words, {
                        yPercent: 0, duration: .8, stagger: .04, ease: 'power2.out',
                        onComplete: () => {
                            policyHeroTitle.revert();
                        }
                    })
                    .to(policyHeroDate.words, {
                        yPercent: 0, duration: .5, stagger: .05, ease: 'power2.out',
                        onComplete: () => {
                            policyHeroDate.revert();
                        }
                    }, '>-.4')
                    .to('.policy__content-tab-title', {
                        y: 0, autoAlpha: 1, duration: .5, stagger: .1, ease: 'power2.out'
                    }, '>-.3')
                    .to('.policy__content-tab-cms-item', {
                        y: 0, autoAlpha: 1, duration: 1, stagger: .1, ease: 'power2.out'
                    }, '>-.3')
                    .to('.policy__content--inner', {
                        y: 0, autoAlpha: 1, duration: 1, ease: 'power2.out'
                    }, "<0.2")

            }
            animShowEl();
        }
        POLICY.Content = () => {
            if (viewport.width <= 767) {
                $('.policy__content-tab-dropdown').on('click', function () {
                    $('.policy__content-tab-dropdown').toggleClass('active');
                    $('.policy__content-tab-cms').slideToggle();
                })

                // $(window).on('click', (e) => {
                //     if (!$('.policy__content-tab-listing:hover').length)
                //         if (!$('.policy__content-tab-dropdown.active:hover').length)
                //             if (!$('policy__content-tab-cms:hover').length)
                //                 $('.policy__content-tab-dropdown').removeClass('active');
                //                 $('.policy__content-tab-cms').slideUp();
                // })
            }
        }
    }

    SCRIPT.aiclassScript = () => {
        console.log("enter Ai Class");
        AICLASS.Hero = () => {
            marqueeCSS({ parent: childSelect('.ai__hero-marquee'), duration: 30 })
            arrowAnim('.ai__sc-gal-control');
        }
        AICLASS.Gallery = () => {
            const openThumbs = () => {
                $('.ai__sc-gal-thumb').addClass('active')
                // lenis.stop()
                $('.header').css('pointerEvents', 'none')
                if ($(window).outerWidth() >= 767) {
                    $('.ai__sc-gal-control').css('opacity', '0')
                }
            }
            const closeThumbs = () => {
                $('.ai__sc-gal-thumb').removeClass('active')
                // lenis.start();
                $('.header').css('pointerEvents', 'auto')
                $('.ai__sc-gal-control').css('opacity', '1')
            }

            const parent = childSelect('.ai__sc-gal');
            swiper.initClassName(parent);

            const swiperImgs = swiper.setup(childSelect('.ai__sc-gal-wrapper'), {
                touchMove: true,
                speed: 900,
                centeredSlides: true,
                loop: true,
                on: {
                    click: (e) => swiperImgs.slideTo(e.clickedIndex)
                },
                autoplay: {
                    delay: 3000
                },
                nav: true,
                breakpoints: {
                    768: {
                        slidesPerView: 'auto',
                    }
                },
            })

            const swiperThumbs = swiper.setup(childSelect('.ai__sc-gal-thumb'), {
                spacing: 10,
                speed: 900,
                effect: "slide",
                parallax: true,
                centeredSlides: true,
                loop: true,
                touchMove: true,
                nav: true,
                breakpoints: {
                    768: {
                        slidesPerView: 'auto',
                    }
                },
            })

            swiperImgs.controller.control = swiperThumbs;
            swiperThumbs.controller.control = swiperImgs;

            $('.ai__sc-gal-img-wrapper').on('click', function (e) {
                e.preventDefault()
                openThumbs();
            })

            $('.ai__sc-gal-thumb').on('click', function (e) {
                e.preventDefault()
                if (!$('.ai__sc-gal-thumb-item .ai__sc-gal-thumb-wrapper:hover').length && !$('.ai__sc-thumb-control:hover').length) {
                    closeThumbs();
                }
            })
        }
    }

    const VIEWS = [
        SCRIPT.homeScript,
        SCRIPT.bookScript,
        SCRIPT.bookDetailScript,
        SCRIPT.blogScript,
        SCRIPT.blogdtlScript,
        SCRIPT.faqScript,
        SCRIPT.policyScript,
        SCRIPT.aiclassScript,
    ]

    const pageName = $('main.main').attr('name-space');
    if (pageName) {
        SCRIPT[`${pageName}Script`]();
    }

    const initGlobal = () => {
        // booksPromise = fetchData();
        /** (💡)  - Header */
        HEADER.showImageByLink();
        HEADER.URLBooks();
        HEADER.search()

        $('.header').addClass('loaded')

        // $('.header__ham').on('click', function(e) {
        // e.preventDefault();
        //     if (!$('.body').hasClass('open-nav')) {
        //         $('.body').addClass('open-nav')
        //         $('.header__nav').addClass('active')
        //         lenis.stop();
        //         HEADER.openNav()
        //     } else {
        //         $('.body').removeClass('open-nav')
        //         HEADER.closeNav()
        //         setTimeout(() => {
        //             lenis.start();
        //         }, 1000)
        //         debounce(function(e) {
        //         $('.header__nav').removeClass('active')
        //         },1000)
        //     }
        // })

        $('.header__menu').on('click', function (e) {
            e.preventDefault();
            let elActive = $('.header__menu-txt.active');
            gsap.to(elActive, {
                y: "-1em", rotationY: "-5.7deg", rotationX: "-90deg", autoAlpha: 0, duration: .55, ease: 'power1.inOut',
                onStart() {
                    elActive.removeClass('active');
                }
            });

            gsap.set($('.header__menu-txt').not(elActive), { y: "1em", rotationY: "5.7deg", rotationX: "90deg", autoAlpha: 0 });
            gsap.to($('.header__menu-txt').not(elActive), {
                y: 0, rotationY: "0deg", rotationX: "0deg", autoAlpha: 1, duration: .55, ease: 'power1.inOut'
            });
            $('.header__menu-txt').not(elActive).addClass('active');

            if (!$('.body').hasClass('open-nav')) {
                $('.body').addClass('open-nav')
                $('.header__nav').addClass('active')
                lenis.stop();
                HEADER.openNav()
            } else {
                $('.body').removeClass('open-nav')
                HEADER.closeNav()
                setTimeout(() => {
                    lenis.start();
                }, 1000)
                debounce(function (e) {
                    $('.header__nav').removeClass('active')
                }, 1000)
            }
        });

        lenis.on('scroll', function (inst) {
            let scrollPos = inst.scroll;
            HEADER.toggleOnScroll(scrollPos);
        })

        if (viewport.width > 767) {
            $(window).on("scroll", function () {
                HEADER.toggleHide();
            });
        }

        // gsap.set('.header', {autoAlpha: 0, yPercent: 50})
        // gsap.to('.header', {autoAlpha: 1, yPercent: 0, duration: 1, delay: .5, ease: 'power1.out'})
        /** (💡)  - End Header */

        /** (💡)  - Popup */
        initPopup('cart');
        /** (💡)  - End Popup */

        /** (💡)  - Main */
        handleCart();
        initAllFnOfPage(PAGES);
        $('.debug-area').remove();
        $('.container-column').remove();
        convertFormatPrice();
        /** (💡)  - End Main */


        /** (💡)  - Footer */
        if ($('.sc__insta-feed').length !== 0) {
            preventLenisOnPopupInsta('.sc__insta-feed');
        }
        marqueeCSS({
            // const { parent, duration, start, delay, stopWhenScroll } = data;
            parent: childSelect('.footer__marquee'),
            duration: 10
        });

        /** (💡)  - End Footer */
    }

    /** (💡)  - START PAGE */
    lenis.scrollTo("top", {
        duration: .001,
        onComplete: () => initGlobal()
    });
    /** (💡) **/
}

window.onload = script;
