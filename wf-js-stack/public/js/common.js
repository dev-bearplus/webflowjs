import gsap from 'gsap';

// public/js/common.js
export function logMessage(msg) {
    console.log(msg);
}

export function initGlobal() {
    console.log('Global init ran');
}

export class Cursor {
    constructor() {
        console.log('Cursor class initialized');
    }
}

export class Loader {
    constructor() {
        this.element = document.createElement('div');
        this.element.id = 'loader';
        this.element.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000; z-index: 9999;';
        this.hasRun = false;
    }
    start() {
        if (this.hasRun) return Promise.resolve();
        document.body.appendChild(this.element);
        return new Promise((resolve) => {
            console.log('Loader started');
            gsap.to(this.element, {
                opacity: 0,
                duration: 1,
                delay: 1,
                onComplete: () => {
                    console.log('Loader finished');
                    this.element.remove();
                    this.hasRun = true;
                    resolve();
                },
            });
        });
    }
}

export class PageTransition {
    constructor(fromNameSpace, toNameSpace) {
        this.from = fromNameSpace;
        this.to = toNameSpace;
        this.leaveTl = gsap.timeline({paused: true});
        this.enterTl = gsap.timeline({paused: true});
    }
    leaveAnim(containerOut, containerIn) {
        if (this.from === 'home' && this.to === 'about') {
            this.leaveTl
            .to(containerOut, { x: '-50%', duration: 5 })
            .fromTo(containerIn, { x: '100%' }, { x: '50%', duration: 5 }, 0);
        } else if (this.from === 'about' && this.to === 'home') {
            this.leaveTl
            .to(containerOut, { x: '50%', duration: 5 })
            .fromTo(containerIn, { x: '-50%' }, { x: '100%', duration: 5 }, 0);
        } else {
            this.leaveTl
            .to(containerOut, { x: '0%', duration: 5 })
            .fromTo(containerIn, { x: '0%' }, { x: '0%', duration: 5 }, 0);
        }
        return this.leaveTl.play();
    }
    enterAnim(containerOut, containerIn) {
        if (this.from === 'home' && this.to === 'about') {
            this.enterTl
            .to(containerOut, { x: '-100%', duration: 5 })
            .fromTo(containerIn, { x: '50%' }, { x: '0%', duration: 5 }, 0);
        } else {
            this.enterTl
            .to(containerOut, { x: '0%', duration: 5 })
            .fromTo(containerIn, { x: '0%' }, { x: '0%', duration: 5 }, 0);
        }
        return this.enterTl.play();
    }
}