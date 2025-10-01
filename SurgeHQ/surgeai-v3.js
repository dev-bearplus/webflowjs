const script = () => {
    function scrollTop() {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        } else {
            window.addEventListener('pageshow', function(event) {
                if (!event.persisted) {
                    window.scrollTo(0, 0);
                }
            });
        }
        window.scrollTo(0, 0);
    }

    const HEADER = {
        toggleNav: () => {
            $('.header').toggleClass('on-open-nav');
            $('.header-ham').toggleClass('active');
        }
    }

    $('.header-ham').on('click', function () {
        HEADER.toggleNav();
    })

    const SCRIPT = {}

    SCRIPT.homeScript = () => {
        console.log("home");
    }

    scrollTop();

    const pageName = $('main.main').attr('data-namespace');
    if (pageName) {
        SCRIPT[`${pageName}Script`]();
    }
}
window.onload = script;