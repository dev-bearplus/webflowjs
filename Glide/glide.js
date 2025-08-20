const script = () => {
    function checkLocation() {
        if (sessionStorage.getItem("popupShown") === "true") {
            return;
        }

        $.getJSON("https://ipapi.co/json/?key=MQpEwzeaXMdKhgiWlw1dUbaA4BODdDwMtQAVfusqgxhxBW3SWh", function(data) {
            if (data && data.country_code) {
                var countryCode = data.country_code.toLowerCase();
                console.log(data);

                if (countryCode === "id") { // Indonesia
                    sessionStorage.setItem("popupShown", "true");
                    $(".bp-popup").addClass("active");
                }
            } else {
                console.log("Không lấy được thông tin quốc gia.");
            }
        }).fail(function() {
            console.log("Lỗi gọi ipapi");
        });
    }
    checkLocation();
    $('.bp-popup-close').on('click', function() {
        $('.bp-popup').removeClass('active')
    })
    const fetchProduct = (id) => {
        let data = [];
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${window.location.origin}/surf/${id}`).then((html) => html.text());
                const getData = (html) => {
                    const tempDiv = $('<div>').html(response).find('.main');
                    const itemInfo = {
                        slug: id,
                        region: tempDiv.find('.for-nested-regions a').map(function() { return $(this).text().trim(); }).get(),
                        budget: tempDiv.find('.for-nested-budgets a').map(function() { return $(this).text().trim(); }).get(),
                        services: tempDiv.find('.for-nested-services a').map(function() { return $(this).text().trim(); }).get(),
                        surfLevel: tempDiv.find('.for-nested-surf-levels a').map(function () { return $(this).text().trim(); }).get(),
                        boatSizes: tempDiv.find('.for-nested-boat-sizes a').map(function () { return $(this).text().trim(); }).get(),
                        charter: tempDiv.find('.for-nested-charter').text().length > 0 ? [tempDiv.find('.for-nested-charter').text()] : [],
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
    const SCRIPT = {}
    SCRIPT.surfScript = () => {
        console.log("surf");
        window.fsAttributes.push(['cmsfilter', (filterInstances) => {
            const [filter] = filterInstances;
            const dropdowns = document.querySelectorAll('.dropdown.in-filter');
            filter.listInstance.on('renderitems', (renderedItems) => {
                console.log('renderitems event', renderedItems);
                console.log('filter event', filter);
            });

            filter.listInstance.on('additems', (addedItems) => {
                console.log('additems event', addedItems);
            });
            filter.filtersData.forEach((item) => {
                console.log(item)
            })
            dropdowns.forEach(drop => {
                const options = [];
                const title = drop.querySelector('.drop-toogle-content-title .drop-toggle-title');
                const tip = drop.querySelector('.drop-toogle-content-title .text-l');

                const checkboxes = drop.querySelectorAll('.filter-checkbox-field');
                const radios = drop.querySelectorAll('.filter-radio-button-field');

                title.classList.remove('is-active');
                checkboxes.forEach((ch, i) => {
                    const chText = ch.querySelector('span').textContent;
                    let attr = ch.querySelector('span').getAttribute('fs-cmsfilter-field');
                    const count = filter.listInstance.items.filter(item => item.element.querySelector(`[fs-cmsfilter-field='${attr}']`).textContent === chText).length;
                    if (count === 0) {
                        ch.style.display = 'none';
                    }
                })
                drop.addEventListener('change', (e) => {
                    tip.textContent = '';
                    const checkedCheckboxes = drop.querySelectorAll('input:checked');
                    checkedCheckboxes.forEach((ch, i) => {
                        const chText = i === 0 ? ch.parentNode.querySelector('span').textContent : `, ${ch.parentNode.querySelector('span').textContent}`;
                        tip.textContent += chText;
                    })
                    if (tip.textContent) {
                        tip.style.display = 'block';
                        title.classList.add('is-active');
                    } else {
                        tip.style.display = 'none';
                        title.classList.remove('is-active');
                    }
                })
            })
            },
        ]);
    }
    SCRIPT.subpageScript = () => {
        $('.form-block').each(async(_, block) => {
            const products = [...$(block).find('.products-card')];
            const filter = {
                region: $(block).find('[data-filter="region"]'),
                budget: $(block).find('[data-filter="budget"]'),
                services: $(block).find('[data-filter="services"]'),
                surfLevel: $(block).find('[data-filter="surfLevel"]'),
                boatSizes: $(block).find('[data-filter="boatSizes"]'),
                charter: $(block).find('[data-filter="charter"]'),
            }
            const filterData = {
                region: [],
                budget: [],
                services: [],
                surfLevel: [],
                boatSizes: [],
                charter: [],
            }
            const filterCurrent = {
                region: [],
                budget: [],
                services: [],
                surfLevel: [],
                boatSizes: [],
                charter: [],
            }
            let checkBoxClone = $(block).find('.collection-item .filter-checkbox-field').eq(0).clone();
            let radioClone = $(block).find('.filter-radio-button-field').eq(0).clone();

            Object.entries(filterData).forEach(([key, value]) => {
                if (key === 'charter') {
                    let radio = radioClone.clone();
                    radio.text('Loading...');
                    filter[key].find('.drop-list-content').append(radio);
                }
                else {
                    let checkbox = checkBoxClone.clone();
                    checkbox.text('Loading...');
                    filter[key].find('.collection-list').append(checkbox);
                }
            })
            Object.entries(filter).forEach(([key, value]) => {
                if (value.length) {
                    value.find('.collection-item, .filter-radio-button-field').remove();
                }
            });
            let data = await Promise.all(
                products.map(async (product) => {
                    let data = [];
                    if ($(product).attr('id')) {
                        data = await fetchProduct($(product).attr('id'));
                        $(product).parent().find('.filter-data').text(JSON.stringify(data));
                    }
                    return ({ ...data })
                })
            )
            data.forEach((item) => {
                Object.entries(item).forEach(([key, value]) => {
                    if (value.length !== 0 && key !== 'slug') {
                        // Add only unique values using Set
                        filterData[key] =
                            [...new Set([...filterData[key], ...value])].sort((a, b) => {
                                const countA = (a.match(/\$/g) || []).length;
                                const countB = (b.match(/\$/g) || []).length;
                                return countA - countB;
                        });
                    }
                })
            })
            const checkEmpty = () => {
                const hiddenCount = products.reduce((count, product) => {
                    const hiddenClasses = $(product).parent().attr('class')?.match(/hidden-\S+/g) || [];
                    return count + (hiddenClasses.length > 0 ? 1 : 0);
                }, 0);

                $(block).find('.filter-empty').css('display', hiddenCount === products.length ? 'block' : 'none');
            }
            Object.entries(filterData).forEach(([key, value]) => {
                let dropList = key === 'charter' ? filter[key].find('.drop-list-content') : filter[key].find('.collection-list');
                dropList.text('');
                value.forEach((item) => {
                    let cloneItem = key === 'charter' ? radioClone.clone() : checkBoxClone.clone();
                    if (!/^[A-Z]+$/.test(item)) {
                        let id = item.replace(/^\d+\.\s*/, '').replace(/\s*\([^)]*\)/g, '').toLowerCase().trim().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '');
                        cloneItem.find('.text-m').text(item);
                        cloneItem.find('input').attr('id', id);
                        dropList.append(cloneItem);
                    }
                })
                filter[key].on('change', (e) => {
                    const checkedCheckboxes = filter[key].find('input:checked');
                    filterCurrent[key] = [...checkedCheckboxes].map((el) => $(el).parent().find('span').text());

                    if (filterCurrent[key].length !== 0) {
                        filter[key].find('.drop-toogle-content-title .text-l').css('display', 'block');
                        filter[key].find('.drop-toggle-title').addClass('is-active');
                        if (key === 'charter') {
                            filter[key].find('.drop-toogle-content-title .text-l').text(filterCurrent[key]);
                        }
                        else {
                            filter[key].find('.drop-toogle-content-title .text-l').text(filterCurrent[key].join(', '));
                        }
                    }
                    else {
                        filter[key].find('.drop-toogle-content-title .text-l').css('display', 'none');
                        filter[key].find('.drop-toggle-title').removeClass('is-active');
                    }

                    // Reset all products to visible first
                    products.forEach(product => {
                        $(product).parent().removeClass(`hidden-${key.toLowerCase()}`);
                        checkEmpty();
                    });

                    // If no checkboxes are checked, show all products
                    if (checkedCheckboxes.length === 0) {
                        return;
                    }

                    // Hide products that don't match ALL selected filters
                    products.forEach((product) => {
                        let productWrap = $(product).parent();
                        let data = JSON.parse(productWrap.find('.filter-data').text());
                        let selectedValues = [...checkedCheckboxes].map(checkbox => $(checkbox).parent().find('span').text());

                        // Check if product has at least one match with selected filters
                        let hasMatch = selectedValues.some(value =>
                            data[key].some(productValue => productValue === value)
                        );

                        if (!hasMatch) {
                            productWrap.addClass(`hidden-${key.toLowerCase()}`);
                            checkEmpty();
                        }
                    });
                })
            })

            $(block).find('.filter-actions').on('click', (e) => {
                Object.entries(filterCurrent).forEach(([key, value]) => {
                    filter[key].find('.drop-toogle-content-title .text-l').css('display', 'none');
                    filter[key].find('.drop-toggle-title').removeClass('is-active');
                    products.forEach((product) => {
                        $(product).parent().removeClass((index, className) => {
                            return (className.match(/hidden-\S+/g) || []).join(' ');
                        });
                    })
                    filter[key].find('.filter-checkbox-field input, .filter-radio-button-field input').prop('checked', false)
                    filter[key].find('.filter-checkbox-field .filter-checkbox, .filter-radio-button-field .filter-radio-button').removeClass('w--redirected-checked');
                    filterCurrent[key] = [];
                })
            })
        })
    }
    const pageName = $('main.main').attr('data-namespace');
    if (pageName) {
        SCRIPT[`${pageName}Script`]();
    }
};
window.onload = script;