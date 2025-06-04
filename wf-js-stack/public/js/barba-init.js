// public/js/barba-init.js
const BASE_URL = 'http://localhost:5173'; // Adjust this based on your environment

import barba from '@barba/core';
import { initGlobal, Loader, PageTransition } from './common.js';

console.log('Barba init script loaded'); // Confirm this runs


const pageScripts = {
    home: () => import(`./home.js`).then(module => {module.initHome()}).catch(err => console.error('Failed to load home.js:', err)),
    about: () => import(`./about.js`).then(module => {module.initAbout()}).catch(err => console.error('Failed to load about.js:', err)),
};
const loader = new Loader();

let transition = null;

barba.init({
    preventRunning: true,
    timeout: 5000,
    debug: true,
    transitions: [{
        name: 'default-transition',
        sync: true,
        async once(data) {
            const namespace = data.next.namespace || 'home';
            console.log('Initial load, namespace:', namespace);
            initGlobal();
            await loader.start();
            if (pageScripts[namespace]) {
                await pageScripts[namespace]();
            } else {
                console.log('No script for namespace:', namespace);
            }
        },
        async leave(data) {
            console.log('Leaving page:', data.current.namespace);
            transition = new PageTransition(data.current.namespace, data.next.namespace);
            await transition.leaveAnim(data.current.container, data.next.container).then(async () => {
                await new Promise(resolve => setTimeout(resolve, 2000));
                await transition.enterAnim(data.current.container, data.next.container);
            })
        },
        async enter(data) {
            console.log('Entering page:', data.next.namespace);
            // await transition.enterAnim(data.current.container, data.next.container);
        },
        async after(data) {
            const namespace = data.next.namespace || 'home';
            console.log('After transition, namespace:', namespace);
            if (pageScripts[namespace]) {
                await pageScripts[namespace]();
            } else {
                console.log('No script for namespace:', namespace);
            }
        },
    }],
});