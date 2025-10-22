// ============================================
// UTILITIES & HELPERS
// ============================================
const parseRem = (input) => input / 10 * parseFloat($('html').css('font-size'));

const viewport = {
    get w() { return window.innerWidth; },
    get h() { return window.innerHeight; },
};

const device = { desktop: 991, tablet: 767, mobile: 479 };

const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), timeout);
    };
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================
// LENIS SMOOTH SCROLL
// ============================================
let lenis = null;

const initLenis = () => {
    if (lenis) return lenis;

    lenis = new Lenis({});
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return lenis;
};
const scrollToTop = () => {
    if (lenis) {
        lenis.scrollTo(0, { duration: 0, immediate: true });
    }
};

// ============================================
// GSAP SETUP
// ============================================
const initGSAP = () => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({
        invalidateOnRefresh: true,
    });

    if (lenis) {
        lenis.on('scroll', ScrollTrigger.update);
    }
};

const killAllScrollTriggers = () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

const refreshScrollTriggers = () => {
    ScrollTrigger.refresh();
};

// ============================================
// WEBFLOW HELPERS
// ============================================

const updateCurrentNav = (url) => {
    const currentPath = new URL(url).pathname.replace(/\/$/, '') || '/';

    // Remove all w--current
    document.querySelectorAll('.w--current').forEach(el => {
        el.classList.remove('w--current');
        el.removeAttribute('aria-current');
    });

    // Add w--current to matching links
    document.querySelectorAll('a[href]').forEach(link => {
        const linkPath = link.getAttribute('href');
        if (!linkPath || linkPath.startsWith('#') || linkPath.startsWith('http') || linkPath.startsWith('mailto:') || linkPath.startsWith('tel:')) return;

        const normalizedLinkPath = linkPath.replace(/\/$/, '') || '/';
        if (normalizedLinkPath === currentPath) {
            link.classList.add('w--current');
            link.setAttribute('aria-current', 'page');
        }
    });
};

const reinitializeWebflow = () => {
    if (!window.Webflow) return;

    try {
        window.Webflow.destroy();
        window.Webflow.ready();
        const ix2 = window.Webflow.require('ix2');
        if (ix2 && typeof ix2.init === 'function') {
            ix2.init();
        }
        const forms = window.Webflow.require('forms');
        if (forms && typeof forms.ready === 'function') {
            forms.ready();
        }
        ['slider', 'tabs', 'dropdown', 'navbar'].forEach(module => {
            try {
                const mod = window.Webflow.require(module);
                if (mod && typeof mod.ready === 'function') {
                    mod.ready();
                }
            } catch (e) {}
        });
        if (window.Webflow.redraw) {
            window.Webflow.redraw.up();
        }
    } catch (e) {
        console.warn('Webflow reinit failed:', e);
    }
};

// ============================================
// CUSTOM WEB COMPONENTS
// ============================================

// Loading Component
class Loading extends HTMLElement {
    constructor() {
        super();
        this.el = this;
        this.isAnimating = false;
    }

    connectedCallback() {
        // Initial page load animation
        this.initialLoad();
    }

    initialLoad() {
        const tl = gsap.timeline({
            onComplete: () => {
                this.querySelector('.loading').classList.add('loaded');
            }
        });

        tl
          .to('.loading-logo', { opacity: 0, duration: 0.6 }, '<=0.6');
    }

    show() {
        console.log('show');
        if (this.isAnimating) return Promise.resolve();
        this.isAnimating = true;

        return new Promise((resolve) => {
            this.querySelector('.loading').classList.remove('loaded');

            gsap.timeline({
                onComplete: () => {
                    this.isAnimating = false;
                    resolve();
                }
            })
            .to('.loading-logo', {
                opacity: 1,
                duration: 0.3
            });
        });
    }

    hide() {
        console.log('hide');
        if (this.isAnimating) return Promise.resolve();
        this.isAnimating = true;

        return new Promise((resolve) => {
            this.tl = gsap.timeline({
                onComplete: () => {
                    this.isAnimating = false;
                    this.querySelector('.loading').classList.add('loaded');
                    resolve();
                }
            })
            .to('.loading-logo', {
                opacity: 0,
                duration: 0.3
            })
        });
    }

    destroy() {
        gsap.killTweensOf(this);
        gsap.killTweensOf('.loading-logo');
        gsap.killTweensOf('.loading-logo-path');
    }
}
if (!customElements.get('loading-wrap')) {
    customElements.define('loading-wrap', Loading);
}
// Header Component
class Header extends HTMLElement {
    constructor() {
        super();
        this.el = this;
        this.navEl = this.querySelector('.header-act');
        this.toggle = this.querySelector('.header-toggle-btn');
        this.allLinks = this.querySelectorAll('.header-link[data-link="section"]');
        this.allFooterLinks = document.querySelectorAll('.footer-link[href^="/#"]');
        this.currentPage = null;
        this.headerEl = this.querySelector('.header');
    }

    connectedCallback() {
        this.currentPage = document.querySelector('[data-barba-namespace]')?.getAttribute('data-barba-namespace');
        this.setup();
        this.interact();
    }

    setup() {
    }
    interact() {
    }
    updatePage(pageName) {
        this.currentPage = pageName;
    }
    toggleSticky(state) {
        if (state) {
            this.headerEl.classList.add('on-scroll')
        } else {
            this.headerEl.classList.remove('on-scroll')
        }
    }
    destroy() {
    }
}


if (!customElements.get('header-component')) {
    customElements.define('header-component', Header);
}

// ============================================
// PAGE COMPONENTS
// ============================================

    const HomePage = {
        'home-hero-wrap': class extends HTMLElement {
            constructor() {
                super();
                this.tlTrigger = null;
            }

            connectedCallback() {
                this.tlTrigger = gsap.timeline({
                    scrollTrigger: {
                        trigger: this,
                        start: 'top bottom+=50%',
                        end: 'bottom top-=50%',
                        once: true,
                        onEnter: () => {
                            this.onTrigger();
                        }
                    }
                });
            }

            onTrigger() {
                this.setup();
                this.interact();
            }

            setup() {
                // Component setup
            }

            interact() {
                // Component interactions
            }

            destroy() {
                if (this.tlTrigger) {
                    this.tlTrigger.kill();
                }
            }
        }
    };

    const PricingPage = {
        'pricing-hero-wrap': class extends HTMLElement {
            constructor() {
                super();
                this.tlTrigger = null;
            }
        }
    };
// ============================================
// PAGE MANAGER
// ============================================

class PageManager {
    constructor(page) {
        if (!page || typeof page !== 'object') {
            throw new Error('Invalid page configuration');
        }

        this.registeredComponents = new Set();
        this.sections = [];

        Object.entries(page).forEach(([name, Component]) => {
            if (typeof Component !== 'function') {
                throw new Error(`Section "${name}" must be a class constructor`);
            }

            if (!customElements.get(name)) {
                try {
                    customElements.define(name, Component);
                    this.registeredComponents.add(name);
                } catch (error) {
                    console.warn(`Custom element "${name}" is already registered`);
                }
            }

            // Collect all instances
            const elements = document.querySelectorAll(name);
            elements.forEach(el => {
                if (!el._instance) {
                    el._instance = el;
                    this.sections.push(el);
                }
            });
        });
    }

    destroy() {
        this.sections.forEach(section => {
            if (typeof section.destroy === 'function') {
                section.destroy();
            }
            section._instance = null;
        });
        this.sections = [];
    }
}

const pageConfig = {
    home: HomePage,
    pricing: PricingPage,
    // Add more pages here
};

// ============================================
// BARBA.JS SETUP
// ============================================

let currentPageManager = null;
let headerComponent = null;

const initPage = (namespace) => {
    // Destroy previous page manager
    if (currentPageManager) {
        currentPageManager.destroy();
        currentPageManager = null;
    }

    // Initialize new page
    if (pageConfig[namespace]) {
        currentPageManager = new PageManager(pageConfig[namespace]);
    }

    // Update header
    headerComponent = document.querySelector('header-component');
    if (headerComponent) {
        headerComponent.updatePage(namespace);
        if (lenis) {
            lenis.on('scroll', (inst) => {
                if (headerComponent) {
                    headerComponent.toggleSticky(inst.scroll >= headerComponent.clientHeight);
                }
            });
        }
    }
};

const initBarba = () => {
    // Get loading element
    const loadingElement = document.querySelector('loading-wrap');

    barba.init({
        preventRunning: true,
        sync: false,
        timeout: 5000,

        transitions: [{
            name: 'default-transition',

            // First page load
            once({ next }) {
                updateCurrentNav(next.url.href);
                // Loading animation handled by connectedCallback
                return Promise.resolve();
            },

            // Before leaving current page
            async leave({ current }) {
                const done = this.async();
                if (lenis) lenis.stop();

                killAllScrollTriggers();

                if (loadingElement) {
                    await loadingElement.show();
                }

                done();
            },

            // After leave
            async afterLeave({ current }) {
                if (currentPageManager) {
                    currentPageManager.destroy();
                }
                current.container.remove();
            },
            async beforeEnter({ next }) {
                scrollToTop();
                const namespace = next.namespace;
                initPage(namespace);
            },

            // Enter new page
            async enter({ next }) {
                if (lenis) lenis.start();
                await delay(50);

                if (loadingElement) {
                    await loadingElement.hide();
                }
                refreshScrollTriggers();
            },

            async after({ next }) {
                updateCurrentNav(next.url.href);
                reinitializeWebflow();
                await delay(100);
                refreshScrollTriggers();
            }
        }]
    });
};

// ============================================
// INITIALIZATION
// ============================================

const init = () => {
    // Initialize Lenis
    initLenis();

    // Initialize GSAP
    initGSAP();

    // Initialize Barba
    initBarba();

    // Initialize first page
    const initialNamespace = document.querySelector('[data-barba-namespace]')?.getAttribute('data-barba-namespace') || 'home';
    initPage(initialNamespace);
};

// Run on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
