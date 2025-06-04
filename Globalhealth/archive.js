function checkSrchParam(srchParam) {
    const allCities = $('.srch-hero-form .group-hos-location .srch-radio-wrap');
    const allCountries = $('.srch-hero-form .group-hos-country .srch-radio-wrap');
    const allSpecialties = $('.srch-hero-form .group-hos-spec .srch-radio-wrap');
    if (srchParam.cities) {
        for (let x = 0; x < allCities.length; x++) {
            if ($('.srch-hero-form .group-hos-location .srch-radio-wrap').eq(x).find('span').text() == srchParam.cities.split('+').join(' ')) {
                $('.srch-hero-form .group-hos-location .srch-radio-wrap').eq(x).find('.ic-radio').trigger('click')
            }
        }
    } else if (srchParam.countries) {
        for (let x = 0; x < allCountries.length; x++) {
            if ($('.srch-hero-form .group-hos-country .srch-radio-wrap').eq(x).find('span').text() == srchParam.countries.split('+').join(' ')) {
                $('.srch-hero-form .group-hos-country .srch-radio-wrap').eq(x).find('.ic-radio').trigger('click')
            }
        }
    }

    if (srchParam.specialties) {
        for (let x = 0; x < allSpecialties.length; x++) {
            if ($('.srch-hero-form .group-hos-spec .srch-radio-wrap').eq(x).find('span').text() == srchParam.specialties.split('+').join(' ')) {
                $('.srch-hero-form .group-hos-spec .srch-radio-wrap').eq(x).find('.ic-radio').trigger('click')
            }
        }
    }
};