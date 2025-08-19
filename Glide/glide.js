const script = () => {
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
    SCRIPT.subpageScript = () => {
        console.log("run")
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
                        filterData[key] = [...new Set([...filterData[key], ...value])];
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
                if (key === 'charter') {
                    filter[key].find('.drop-list-content').text('');
                    value.forEach((item) => {
                        let radio = radioClone.clone();
                        radio.find('.text-m').text(item);
                        radio.find('input').attr('id', item.toLowerCase().trim().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, ''));
                        filter[key].find('.drop-list-content').append(radio);

                        radio.find('input').on('change', (e) => {
                            if (e.target.checked) {
                                filterCurrent[key] = item;
                                products.forEach((product) => {
                                    let productWrap = $(product).parent();
                                    let data = JSON.parse(productWrap.find('.filter-data').text());
                                    if (data[key].includes(item)) {
                                        productWrap.removeClass(`hidden-${key.toLowerCase()}`);
                                    }
                                    else {
                                        productWrap.addClass(`hidden-${key.toLowerCase()}`);
                                    }
                                })
                            }
                            else {
                                filterCurrent[key] = [];
                                products.forEach((product) => {
                                    $(product).parent().removeClass(`hidden-${key.toLowerCase()}`);
                                })
                            }
                            if (filterCurrent[key].length !== 0) {
                                filter[key].find('.drop-toogle-content-title .text-l').css('display', 'block');
                                filter[key].find('.drop-toggle-title').addClass('is-active');
                                filter[key].find('.drop-toogle-content-title .text-l').text(filterCurrent[key]);
                            }
                            else {
                                filter[key].find('.drop-toogle-content-title .text-l').css('display', 'none');
                                filter[key].find('.drop-toggle-title').removeClass('is-active');
                            }
                            console.log(checkEmpty());
                        })
                    })
                }
                else {
                    filter[key].find('.collection-list').text('');
                    value.forEach((item) => {
                        let checkbox = checkBoxClone.clone();
                        let id = item.replace(/^\d+\.\s*/, '').replace(/\s*\([^)]*\)/g, '').toLowerCase().trim().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '');
                        if ($('.main').attr('id') !== id) {
                            checkbox.find('.text-m').text(item);
                            checkbox.attr('id', id);
                            filter[key].find('.collection-list').append(checkbox);

                            checkbox.find('input').on('change', (e) => {
                                if (e.target.checked) {
                                    filterCurrent[key].push(item);
                                    products.forEach((product) => {
                                        let productWrap = $(product).parent();
                                        let data = JSON.parse(productWrap.find('.filter-data').text());
                                        if (data[key].includes(item)) {
                                            productWrap.removeClass(`hidden-${key.toLowerCase()}`);
                                        }
                                        else {
                                            productWrap.addClass(`hidden-${key.toLowerCase()}`);
                                        }
                                    })
                                }
                                else {
                                    filterCurrent[key].splice(filterCurrent[key].indexOf(item), 1)
                                    products.forEach((product) => {
                                        $(product).parent().removeClass(`hidden-${key.toLowerCase()}`);
                                    })
                                }
                                if (filterCurrent[key].length !== 0) {
                                    filter[key].find('.drop-toogle-content-title .text-l').css('display', 'block');
                                    filter[key].find('.drop-toggle-title').addClass('is-active');
                                    filter[key].find('.drop-toogle-content-title .text-l').text(filterCurrent[key].join(', '));
                                }
                                else {
                                    filter[key].find('.drop-toogle-content-title .text-l').css('display', 'none');
                                    filter[key].find('.drop-toggle-title').removeClass('is-active');
                                }
                                console.log(checkEmpty());
                            })
                        }
                    })
                }
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
}
window.onload = script;
