const script = () => {
    const lngs = {
        en: {
            nativeName: 'English',
            flag: 'https://uploads-ssl.webflow.com/64e4796fb8fd2d6c9b20436d/64ec25b84172089051731101_United%20States%20of%20America%20(US).png'
        },
        de: {
            nativeName: 'Deutsch',
            flag: 'https://uploads-ssl.webflow.com/64e4796fb8fd2d6c9b20436d/64ec25b7c3c6540c9b17e82e_Germany%20(DE).png'
        }
    };
    let defaultLang = localStorage.getItem("currentlng")
    if (!defaultLang) {
        defaultLang = 'en'
        localStorage.setItem('currentlng','en')
    }
    const path = {
        local: 'http://127.0.0.1:5500',
        bitbucket: 'https://bitbucket.org/bear-plus/webflowjs/raw/master',
    }
    const isDev = false;
    const rootPath = isDev ? path.local : path.bitbucket;
    const pageName = $("body").attr("data-namespace");
    const dataPath = `${rootPath}/Nestegg/locales/{{ns}}/{{lng}}.json`
    const backend = i18nextHttpBackend || {};
    const i18nOptions = {
        debug: isDev, // remove for production
        fallbackLng: 'en',
        lng: defaultLang,
        preload: ['en', 'de'],
        load: 'languageOnly', // Prevents backend from trying to load ./en-US/...
        ns: [pageName, 'global', 'project'],
        interpolation: {
            escapeValue: false
        },
        backend: {
            loadPath: dataPath,
            allowMultiLoading: true
        },
        getAsync: false
    };

    let lenis = new Lenis({});
    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf);

    const childSelect = (parent) => {
		return (child) => child ? $(parent).find(child) : parent;
    }
    const toKebabCase = str => str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).join('-').toLowerCase();

    const getAllKeys = (obj, parentKey = '') => {
        let keys = [];
        for (let key in obj) {
            if (typeof obj[key] === 'object') {
            const childKeys = getAllKeys(obj[key], parentKey ? `${parentKey}.${key}` : key);
            keys = keys.concat(childKeys);
            } else {
            keys.push(parentKey ? `${parentKey}.${key}` : key);
            }
        }
        return keys;
    }

    const loaderTransition = () => {
        $("a").on('click', function (e) {
            const href = $(this).attr('href');
            if ($(this).attr('target') === '_blank') return;
            if (href && href === '#') return;
            e.preventDefault();

            if (href && href.includes('/about')) {
                gsap.set('.loader', { backgroundColor: '#fff' });
            }
            const tl = gsap.timeline({
                onComplete: () => {
                    window.history.pushState({ url: window.location.href }, '');
                    window.location.href = href;
                }
            });
            tl
                .set('.loader', { autoAlpha: 1 })
                .fromTo('.loader', { yPercent: 100 }, { yPercent: 0 })
        })

        window.addEventListener("pageshow", function (event) {
            event.preventDefault();
            var historyTraversal = event.persisted ||
                                ( typeof window.performance != "undefined" &&
                                        window.performance.navigation.type === 2 );
            if (historyTraversal) {
                const href = window.location.href;
                if (href && href.includes('/about')) {
                    gsap.set('.loader', { backgroundColor: '#fff' });
                }
                gsap.fromTo('.loader', { yPercent: 0 }, { yPercent: 100, delay: 0.5 })
            }
        })
    }

    const initSelectDropdown = (formID) => {
        let servicesArr = [];

        // check to hidden or visible button clear all
        const checkClearAll = (selector) => {
            if (servicesArr.length > 0)
                selector('.dropdown-clear-all').addClass('active')
            else
                selector('.dropdown-clear-all').removeClass('active');
        }

        const dropdownAction = {
            open: (parent) => {
                const selector = (child) => parent ? parent(child) : $(`${formID} ${child}`);
                selector().addClass('active');
                selector('.dropdown-list').addClass('active');
                selector('.dropdown-toggle').addClass('active');
                selector('.dropdown-select').slideDown();

                checkClearAll(selector);
            },
            close: (parent) => {
                const selector = (child) => parent ? parent(child) : $(`${formID} ${child}`);
                selector().removeClass('active');
                selector('.dropdown-list').removeClass('active');
                selector('.dropdown-toggle').removeClass('active');
                selector('.dropdown-select').slideUp();

                checkClearAll(selector);
            },
            toggle: (parent) => {
                parent().toggleClass('active');
                $(`${formID} .dropdown-field`).not(parent()).removeClass('active');

                parent('.dropdown-list').toggleClass('active');
                $(`${formID} .dropdown-list`).not(parent('.dropdown-list')).removeClass('active');

                parent('.dropdown-toggle').toggleClass('active');
                $(`${formID} .dropdown-toggle`).not(parent('.dropdown-toggle')).removeClass('active');

                parent('.dropdown-select').slideToggle();
                $(`${formID} .dropdown-select`).not(parent('.dropdown-select')).slideUp();

                checkClearAll(parent);
            }
        }

        //disable keydown in dropdown field
        $(`${formID} .text-field.dropdown-field`).keydown(function(e) {
            e.preventDefault();
            return false;
        });
        $(`${formID} .text-field.dropdown-field`).prop('readonly', true);

        // on click the input field and toggle the dropdown
        $(`${formID} .dropdown-toggle`).on('click', function (e) {
            let parent = childSelect($(this).parents('.dropdown-field'));
            dropdownAction.toggle(parent);
        })

        // close all dropdown when click outside [!important close]
        $(window).on('click', (e) => {
            if (!$('.dropdown-toggle:hover').length)
                if (!$('.dropdown-select:hover').length)
                    dropdownAction.close();
        })

        // handle when choose select dropdown option
        $(`${formID} .dropdown-link`).on('click', function(e) {
            e.preventDefault();
            const parent = childSelect($(this).parents('.dropdown-field'));
            let selectType = parent('.dropdown-select').attr('data-select-type');
            let valText = $(this).find('.dropdown-link-text').text();
            switch (selectType) {
                case 'single': {
                    parent('.text-field.dropdown-field').val(valText);
                    dropdownAction.close(parent);
                    break;
                }
                case 'multi': {
                    if (!$(this).hasClass('active')) {
                        $(this).addClass('active');
                        servicesArr.push(valText);
                    }
                    else {
                        $(this).removeClass('active');
                        servicesArr.splice(servicesArr.indexOf(valText), 1)
                    }
                    checkClearAll(parent);
                    parent('.text-field.dropdown-field').val(servicesArr.join(',  '));
                    break;
                }
                default: break;
            }
        })

        //handle clear all button
        $(`${formID} .dropdown-clear-all`).on('click', function (e) {
            const parent = childSelect($(this).parents('.dropdown-field'));

            parent('.text-field.dropdown-field').val('');
            parent('.dropdown-link').removeClass('active');
            $(this).removeClass('active');
            servicesArr.length = 0;
        })
    }

    const translateForm = () => {
        if (!$('#contact-form').length) return;
        $('#contact-form .w-input').each((index, el) => {
            let id = $(el).get(0).id;
            $(el).attr('placeholder', $.t(`form.${id}`));
        })
        $('input[type="submit"]').val($.t(`form.${$('input[type="submit"]').get(0).id}`))
        $('input[type="submit"]').attr('data-wait', $.t('form.submit_wait'));
    }

    const breakLineHandle = (chosenLng) => {
        const allKeys = getAllKeys(i18next.store.data[chosenLng]);
        const masterKeys = Object.keys(i18next.store.data[chosenLng]);

        const parsedI18nKeys = allKeys.map(item => {
            const parts = item.split('.');
            const key = parts[0];
            const value = parts.slice(1).join('.');
            return `${key}:${value}`;
        });

        parsedI18nKeys.forEach((key) => {
            const translatedText = $.t(key);
            if (translatedText.includes('\n')) {
                const selectorEl = (key) => $(`[data-i18n="${key}"]`);

                let splitKey = key.split(":")[1];
                let resultEl;
                if (selectorEl(splitKey).length !== 0) {
                    resultEl = selectorEl(splitKey)
                }
                else if (selectorEl(key).length !== 0) {
                    resultEl = selectorEl(key)
                }
                else return;
                const lines = resultEl.text().split('\n');
                resultEl.html('');
                lines.forEach((line, index) => {
                    const br = document.createElement('br');
                    const textNode = document.createTextNode(line);

                    $(resultEl).append(textNode);
                    if (index < lines.length - 1) {
                        $(resultEl).append(br);
                    }
                });

            }
        });
    }

    const initI18n = () => {
        const rerender = (chosenLng) => {
            $('body').localize();

            $('title').text($.t('meta.title'));
            $('meta[name=description]').attr('content', $.t('meta.description'));
            breakLineHandle(chosenLng);
            translateForm();
        }
        $(function () {
            i18next.use(backend).init(i18nOptions, (err, t) => {
                if (err) return console.error(err);
                jqueryI18next.init(i18next, $, { useOptionsAttr: true });
                $('[data-lang]').removeClass('active');
                Object.keys(lngs).map((lng) => {
                    if (lng === i18next.resolvedLanguage) {
                        $(`[data-lang='${lng}']`).addClass('active');
                        requestAnimationFrame(() => {
                            breakLineHandle(lng);
                            translateForm();
                        })
                    }
                });
                $('[data-lang]').on('click', function() {
                    let chosenLng = $(this).attr('data-lang');
                    $('[data-lang]').removeClass('active');
                    $(this).addClass('active');
                    localStorage.setItem('currentlng', chosenLng)

                    i18next.changeLanguage(chosenLng, () => {
                        rerender(chosenLng);
                    });
                })
                rerender();
            });
        });;
    }

    const updateDataI18n = () => {
        $('[data-project-slug]').each(function(index, el) {
            let slug = $(el).attr('data-project-slug')
            let allDataAttr = $(el).find('[data-i18n]');
            allDataAttr.each(function(index, el) {
                let original = $(el).attr('data-i18n');
                $(el).attr('data-i18n', original.replace('{{ proj-slug }}', slug))
            })
        })

        $('[data-heading-letter]').each((index, el) => $(el).attr('data-i18n', `hero.heading_letter_${index + 1}`));
        $('[data-process-step]').each((index, el) => $(el).attr('data-i18n', `process.step_${Math.ceil((index + 1) / 2)}.${$(el).attr('data-process-step')}`));
        $("[data-project-desc]").each((index, el) => $(el).attr('data-i18n', `project:${pageName}.desc`));
        $("[data-project-scope]").each((index, el) => $(el).attr('data-i18n', `global:scope.${toKebabCase($(el).text())}`));
        $("[data-project-service]").each((index, el) => {
            $(el).attr('data-i18n', `global:service.${toKebabCase($(el).text())}.title`);
            const service_desc = $(el).siblings('[data-project-service-desc]');
            if (service_desc.length === 0) return;

            service_desc.attr('data-i18n', `global:service.${toKebabCase($(el).text())}.desc`)
        });
    }

    loaderTransition();
    initSelectDropdown('#contact-form');
    updateDataI18n();
    initI18n();
}

window.onload = function () {
    console.log("loaded")
    script();
}