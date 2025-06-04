import { viewportBreak } from "../utils/viewport";

const DOM = {
    btn: $('.nav-trigger-wrap'),
    headerBtn: $('.header-new-toggle'),
    nav: $('.nav'),
    navMenuLink: $('.nav-mid-link-li'),
    navSocialLink: $('.nav-social-item'),
    navContactLabel: $('.nav-contact-label'),
    navContactLink: $('.nav-contact-link'),
    navAddLabel: $('.nav-add-label'),
    navAddTxt: $('.nav-add-txt'),
    navAddLink: $('.nav-add-link'),
    navSocialIcon: $('.nav-social-ic')
}

const initNavigation = (lenis) => {
    let tl = gsap.timeline();
    let tlOpt = {
        duration: 0.4,
        x: 70,
        stagger: 0.05,
        delay: 0.28
    }
    gsap.set([
        DOM.navMenuLink,
        DOM.navSocialLink,
        DOM.navContactLabel,
        DOM.navContactLink,
        DOM.navAddLabel,
        DOM.navAddTxt,
        DOM.navAddLink,
    ], { autoAlpha: 0 });
    tl
    .fromTo(DOM.navMenuLink,
        { duration: tlOpt.duration, autoAlpha: 0, x: tlOpt.x, stagger: tlOpt.stagger },
        { duration: tlOpt.duration, autoAlpha: 1, x: 0, stagger: tlOpt.stagger, delay: tlOpt.delay })
    .fromTo(DOM.navSocialLink,
        { duration: tlOpt.duration, autoAlpha: 0, x: tlOpt.x, stagger: tlOpt.stagger },
        { duration: tlOpt.duration, autoAlpha: 1, x: 0, stagger: tlOpt.stagger, delay: tlOpt.delay }, '-=0.6')
    .fromTo([DOM.navContactLabel, DOM.navContactLink, DOM.navAddLabel, DOM.navAddTxt, DOM.navAddLink, DOM.navSocialIcon],
        { duration: tlOpt.duration, autoAlpha: 0, x: tlOpt.x, stagger: tlOpt.stagger },
        { duration: tlOpt.duration, autoAlpha: 1, x: 0, stagger: tlOpt.stagger, delay: tlOpt.delay }, `-=0.8`)
    viewportBreak({
        mobile: () => {
            gsap.set(DOM.navSocialIcon, { autoAlpha: 0 })
            tl.fromTo(DOM.navSocialIcon,
                { duration: tlOpt.duration, autoAlpha: 0, x: tlOpt.x, stagger: tlOpt.stagger },
                { duration: tlOpt.duration, autoAlpha: 1, x: 0, stagger: tlOpt.stagger, delay: tlOpt.delay }, `-=1`)
    }})

    DOM.btn.on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("click")
        if (!$(this).hasClass('active')) {
            tl.restart();
            viewportBreak({
                mobile: () => lenis.stop()
            })
        }
        else {
            viewportBreak({
                mobile: () => lenis.start()
            })
        }
        $(this).toggleClass('active');
        DOM.nav.toggleClass('active');
    });
}

const toggleNavigation = (scroll) => {
    if (scroll > $("header").height()) DOM.btn.addClass("show");
    else {
        if (DOM.btn.hasClass('active')) {
            DOM.nav.removeClass('active');
            DOM.btn.removeClass('active');
            DOM.btn.removeClass("show");
        }
        else {
            DOM.btn.removeClass("show");
        }
    };
}

const resetNavigation = () => {
    DOM.btn.removeClass('active');
    DOM.nav.removeClass('active');
}

export {
    initNavigation,
    toggleNavigation,
    resetNavigation,
}