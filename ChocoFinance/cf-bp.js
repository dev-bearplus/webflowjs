const mainScript = () => {
    // CircleType
    !function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.CircleType=n():t.CircleType=n()}(window,(function(){return function(t){var n={};function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)e.d(r,i,function(n){return t[n]}.bind(null,i));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=28)}([function(t,n,e){var r=e(13)("wks"),i=e(12),o=e(1).Symbol,u="function"==typeof o;(t.exports=function(t){return r[t]||(r[t]=u&&o[t]||(u?o:i)("Symbol."+t))}).store=r},function(t,n){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},function(t,n){var e=t.exports={version:"2.6.11"};"number"==typeof __e&&(__e=e)},function(t,n,e){var r=e(4),i=e(11);t.exports=e(6)?function(t,n,e){return r.f(t,n,i(1,e))}:function(t,n,e){return t[n]=e,t}},function(t,n,e){var r=e(5),i=e(33),o=e(34),u=Object.defineProperty;n.f=e(6)?Object.defineProperty:function(t,n,e){if(r(t),n=o(n,!0),r(e),i)try{return u(t,n,e)}catch(t){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(t[n]=e.value),t}},function(t,n,e){var r=e(10);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,n,e){t.exports=!e(18)((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}))},function(t,n){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},function(t,n){var e=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:e)(t)}},function(t,n){t.exports=function(t){if(null==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n){var e=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+r).toString(36))}},function(t,n,e){var r=e(2),i=e(1),o=i["__core-js_shared__"]||(i["__core-js_shared__"]={});(t.exports=function(t,n){return o[t]||(o[t]=void 0!==n?n:{})})("versions",[]).push({version:r.version,mode:e(16)?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},function(t,n){t.exports={}},function(t,n,e){var r=e(13)("keys"),i=e(12);t.exports=function(t){return r[t]||(r[t]=i(t))}},function(t,n){t.exports=!1},function(t,n,e){var r=e(1),i=e(2),o=e(3),u=e(20),c=e(21),a=function(t,n,e){var f,s,l,p,h=t&a.F,v=t&a.G,d=t&a.S,y=t&a.P,m=t&a.B,g=v?r:d?r[n]||(r[n]={}):(r[n]||{}).prototype,_=v?i:i[n]||(i[n]={}),x=_.prototype||(_.prototype={});for(f in v&&(e=n),e)l=((s=!h&&g&&void 0!==g[f])?g:e)[f],p=m&&s?c(l,r):y&&"function"==typeof l?c(Function.call,l):l,g&&u(g,f,l,t&a.U),_[f]!=l&&o(_,f,p),y&&x[f]!=l&&(x[f]=l)};r.core=i,a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,n,e){var r=e(10),i=e(1).document,o=r(i)&&r(i.createElement);t.exports=function(t){return o?i.createElement(t):{}}},function(t,n,e){var r=e(1),i=e(3),o=e(7),u=e(12)("src"),c=e(35),a=(""+c).split("toString");e(2).inspectSource=function(t){return c.call(t)},(t.exports=function(t,n,e,c){var f="function"==typeof e;f&&(o(e,"name")||i(e,"name",n)),t[n]!==e&&(f&&(o(e,u)||i(e,u,t[n]?""+t[n]:a.join(String(n)))),t===r?t[n]=e:c?t[n]?t[n]=e:i(t,n,e):(delete t[n],i(t,n,e)))})(Function.prototype,"toString",(function(){return"function"==typeof this&&this[u]||c.call(this)}))},function(t,n,e){var r=e(36);t.exports=function(t,n,e){if(r(t),void 0===n)return t;switch(e){case 1:return function(e){return t.call(n,e)};case 2:return function(e,r){return t.call(n,e,r)};case 3:return function(e,r,i){return t.call(n,e,r,i)}}return function(){return t.apply(n,arguments)}}},function(t,n,e){var r=e(42),i=e(9);t.exports=function(t){return r(i(t))}},function(t,n){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},function(t,n,e){var r=e(8),i=Math.min;t.exports=function(t){return t>0?i(r(t),9007199254740991):0}},function(t,n){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,n,e){var r=e(4).f,i=e(7),o=e(0)("toStringTag");t.exports=function(t,n,e){t&&!i(t=e?t:t.prototype,o)&&r(t,o,{configurable:!0,value:n})}},function(t,n,e){var r=e(9);t.exports=function(t){return Object(r(t))}},function(t,n,e){e(29);var r=e(54).default;t.exports=r},function(t,n,e){e(30),e(47),t.exports=e(2).Array.from},function(t,n,e){"use strict";var r=e(31)(!0);e(32)(String,"String",(function(t){this._t=String(t),this._i=0}),(function(){var t,n=this._t,e=this._i;return e>=n.length?{value:void 0,done:!0}:(t=r(n,e),this._i+=t.length,{value:t,done:!1})}))},function(t,n,e){var r=e(8),i=e(9);t.exports=function(t){return function(n,e){var o,u,c=String(i(n)),a=r(e),f=c.length;return a<0||a>=f?t?"":void 0:(o=c.charCodeAt(a))<55296||o>56319||a+1===f||(u=c.charCodeAt(a+1))<56320||u>57343?t?c.charAt(a):o:t?c.slice(a,a+2):u-56320+(o-55296<<10)+65536}}},function(t,n,e){"use strict";var r=e(16),i=e(17),o=e(20),u=e(3),c=e(14),a=e(37),f=e(26),s=e(46),l=e(0)("iterator"),p=!([].keys&&"next"in[].keys()),h=function(){return this};t.exports=function(t,n,e,v,d,y,m){a(e,n,v);var g,_,x,b=function(t){if(!p&&t in S)return S[t];switch(t){case"keys":case"values":return function(){return new e(this,t)}}return function(){return new e(this,t)}},w=n+" Iterator",O="values"==d,j=!1,S=t.prototype,M=S[l]||S["@@iterator"]||d&&S[d],T=M||b(d),P=d?O?b("entries"):T:void 0,A="Array"==n&&S.entries||M;if(A&&(x=s(A.call(new t)))!==Object.prototype&&x.next&&(f(x,w,!0),r||"function"==typeof x[l]||u(x,l,h)),O&&M&&"values"!==M.name&&(j=!0,T=function(){return M.call(this)}),r&&!m||!p&&!j&&S[l]||u(S,l,T),c[n]=T,c[w]=h,d)if(g={values:O?T:b("values"),keys:y?T:b("keys"),entries:P},m)for(_ in g)_ in S||o(S,_,g[_]);else i(i.P+i.F*(p||j),n,g);return g}},function(t,n,e){t.exports=!e(6)&&!e(18)((function(){return 7!=Object.defineProperty(e(19)("div"),"a",{get:function(){return 7}}).a}))},function(t,n,e){var r=e(10);t.exports=function(t,n){if(!r(t))return t;var e,i;if(n&&"function"==typeof(e=t.toString)&&!r(i=e.call(t)))return i;if("function"==typeof(e=t.valueOf)&&!r(i=e.call(t)))return i;if(!n&&"function"==typeof(e=t.toString)&&!r(i=e.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},function(t,n,e){t.exports=e(13)("native-function-to-string",Function.toString)},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,n,e){"use strict";var r=e(38),i=e(11),o=e(26),u={};e(3)(u,e(0)("iterator"),(function(){return this})),t.exports=function(t,n,e){t.prototype=r(u,{next:i(1,e)}),o(t,n+" Iterator")}},function(t,n,e){var r=e(5),i=e(39),o=e(25),u=e(15)("IE_PROTO"),c=function(){},a=function(){var t,n=e(19)("iframe"),r=o.length;for(n.style.display="none",e(45).appendChild(n),n.src="javascript:",(t=n.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),a=t.F;r--;)delete a.prototype[o[r]];return a()};t.exports=Object.create||function(t,n){var e;return null!==t?(c.prototype=r(t),e=new c,c.prototype=null,e[u]=t):e=a(),void 0===n?e:i(e,n)}},function(t,n,e){var r=e(4),i=e(5),o=e(40);t.exports=e(6)?Object.defineProperties:function(t,n){i(t);for(var e,u=o(n),c=u.length,a=0;c>a;)r.f(t,e=u[a++],n[e]);return t}},function(t,n,e){var r=e(41),i=e(25);t.exports=Object.keys||function(t){return r(t,i)}},function(t,n,e){var r=e(7),i=e(22),o=e(43)(!1),u=e(15)("IE_PROTO");t.exports=function(t,n){var e,c=i(t),a=0,f=[];for(e in c)e!=u&&r(c,e)&&f.push(e);for(;n.length>a;)r(c,e=n[a++])&&(~o(f,e)||f.push(e));return f}},function(t,n,e){var r=e(23);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,n,e){var r=e(22),i=e(24),o=e(44);t.exports=function(t){return function(n,e,u){var c,a=r(n),f=i(a.length),s=o(u,f);if(t&&e!=e){for(;f>s;)if((c=a[s++])!=c)return!0}else for(;f>s;s++)if((t||s in a)&&a[s]===e)return t||s||0;return!t&&-1}}},function(t,n,e){var r=e(8),i=Math.max,o=Math.min;t.exports=function(t,n){return(t=r(t))<0?i(t+n,0):o(t,n)}},function(t,n,e){var r=e(1).document;t.exports=r&&r.documentElement},function(t,n,e){var r=e(7),i=e(27),o=e(15)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=i(t),r(t,o)?t[o]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,n,e){"use strict";var r=e(21),i=e(17),o=e(27),u=e(48),c=e(49),a=e(24),f=e(50),s=e(51);i(i.S+i.F*!e(53)((function(t){Array.from(t)})),"Array",{from:function(t){var n,e,i,l,p=o(t),h="function"==typeof this?this:Array,v=arguments.length,d=v>1?arguments[1]:void 0,y=void 0!==d,m=0,g=s(p);if(y&&(d=r(d,v>2?arguments[2]:void 0,2)),null==g||h==Array&&c(g))for(e=new h(n=a(p.length));n>m;m++)f(e,m,y?d(p[m],m):p[m]);else for(l=g.call(p),e=new h;!(i=l.next()).done;m++)f(e,m,y?u(l,d,[i.value,m],!0):i.value);return e.length=m,e}})},function(t,n,e){var r=e(5);t.exports=function(t,n,e,i){try{return i?n(r(e)[0],e[1]):n(e)}catch(n){var o=t.return;throw void 0!==o&&r(o.call(t)),n}}},function(t,n,e){var r=e(14),i=e(0)("iterator"),o=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||o[i]===t)}},function(t,n,e){"use strict";var r=e(4),i=e(11);t.exports=function(t,n,e){n in t?r.f(t,n,i(0,e)):t[n]=e}},function(t,n,e){var r=e(52),i=e(0)("iterator"),o=e(14);t.exports=e(2).getIteratorMethod=function(t){if(null!=t)return t[i]||t["@@iterator"]||o[r(t)]}},function(t,n,e){var r=e(23),i=e(0)("toStringTag"),o="Arguments"==r(function(){return arguments}());t.exports=function(t){var n,e,u;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(e=function(t,n){try{return t[n]}catch(t){}}(n=Object(t),i))?e:o?r(n):"Object"==(u=r(n))&&"function"==typeof n.callee?"Arguments":u}},function(t,n,e){var r=e(0)("iterator"),i=!1;try{var o=[7][r]();o.return=function(){i=!0},Array.from(o,(function(){throw 2}))}catch(t){}t.exports=function(t,n){if(!n&&!i)return!1;var e=!1;try{var o=[7],u=o[r]();u.next=function(){return{done:e=!0}},o[r]=function(){return u},t(o)}catch(t){}return e}},function(t,n,e){"use strict";e.r(n);var r=function(t){var n=t.getBoundingClientRect();return{height:n.height,left:n.left+window.pageXOffset,top:n.top+window.pageYOffset,width:n.width}};function i(t){return function(t){if(Array.isArray(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var o=Math.PI/180,u=function(t){return t*o},c=function(t,n){return t*(1-Math.cos(u(n/2)))},a=180/Math.PI,f=function(t,n){return t.reduce((function(t,e){var r=e.width,i=r/n*a;return{"θ":t.θ+i,rotations:t.rotations.concat([t.θ+i/2])}}),{"θ":0,rotations:[]})};function s(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var l=Math.PI,p=Math.max,h=Math.min,v=function(){function t(n,e){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this.element=n,this.originalHTML=this.element.innerHTML;var o=document.createElement("div"),u=document.createDocumentFragment();o.setAttribute("aria-label",n.innerText),o.style.position="relative",this.container=o,this._letters=function(t,n){var e=document.createElement("span");e.style.display="inline-block";var r=t.innerText.trim();return(n?n(r):i(r)).map((function(t){var n=e.cloneNode();return n.insertAdjacentHTML("afterbegin"," "===t?"&nbsp;":t),n}))}(n,e),this._letters.forEach((function(t){return u.appendChild(t)})),o.appendChild(u),this.element.innerHTML="",this.element.appendChild(o);var c=window.getComputedStyle(this.element),a=c.fontSize,f=c.lineHeight;this._fontSize=parseFloat(a),this._lineHeight=parseFloat(f)||this._fontSize,this._metrics=this._letters.map(r);var s=this._metrics.reduce((function(t,n){return t+n.width}),0);this._minRadius=s/l/2+this._lineHeight,this._dir=1,this._forceWidth=!1,this._forceHeight=!0,this._radius=this._minRadius,this._invalidate()}var n,e,o;return n=t,(e=[{key:"radius",value:function(t){return void 0!==t?(this._radius=p(this._minRadius,t),this._invalidate(),this):this._radius}},{key:"dir",value:function(t){return void 0!==t?(this._dir=t,this._invalidate(),this):this._dir}},{key:"forceWidth",value:function(t){return void 0!==t?(this._forceWidth=t,this._invalidate(),this):this._forceWidth}},{key:"forceHeight",value:function(t){return void 0!==t?(this._forceHeight=t,this._invalidate(),this):this._forceHeight}},{key:"refresh",value:function(){return this._invalidate()}},{key:"destroy",value:function(){return this.element.innerHTML=this.originalHTML,this}},{key:"_invalidate",value:function(){var t=this;return cancelAnimationFrame(this._raf),this._raf=requestAnimationFrame((function(){t._layout()})),this}},{key:"_layout",value:function(){var t=this,n=this._radius,e=this._dir,r=-1===e?-n+this._lineHeight:n,i="center ".concat(r/this._fontSize,"em"),o=n-this._lineHeight,a=f(this._metrics,o),s=a.rotations,l=a.θ;if(this._letters.forEach((function(n,r){var o=n.style,u=(-.5*l+s[r])*e,c=-.5*t._metrics[r].width/t._fontSize,a="translateX(".concat(c,"em) rotate(").concat(u,"deg)");o.position="absolute",o.bottom=-1===e?0:"auto",o.left="50%",o.transform=a,o.transformOrigin=i,o.webkitTransform=a,o.webkitTransformOrigin=i})),this._forceHeight){var p=l>180?c(n,l):c(o,l)+this._lineHeight;this.container.style.height="".concat(p/this._fontSize,"em")}if(this._forceWidth){var v=function(t,n){return 2*t*Math.sin(u(n/2))}(n,h(180,l));this.container.style.width="".concat(v/this._fontSize,"em")}return this}}])&&s(n.prototype,e),o&&s(n,o),t}();n.default=v}])}));

    gsap.registerPlugin(ScrollTrigger);

    //Smooth Scroll
    $('html').css('scroll-behavior', 'auto');
    $('html').css('height', 'auto');

    function easing(x) {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
    }

    const lenis = new Lenis({
        easing: easing,
    })

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Variables and Ultilities
    let unit;
    let slideUpDownTime = 400;
    if ($(window).width() > 1920) {
        unit = 10;
    } else if ($(window).width() > 991) {
        unit = (0.5208333333 * $(window).width()) / 100;
    } else if ($(window).width() > 767) {
        unit = (1.1990407674 * $(window).width()) / 100;
    } else if ($(window).width() > 479) {
        //unit = (1.3037809648 * $(window).width()) / 100; // True 10px
        unit = (1.9556714472 * $(window).width()) / 100; // x1.5 = 15px
    } else {
        unit = (2.5445292621 * $(window).width()) / 100;
    }
    let marginAuto;

    const lerp = (a,b,t = 0.08) => {
        return a + (b - a) * t;
    }
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    const uniqueArr = (arr) => [...new Set(arr)];
    function toSlug(text) {
        return text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
    }
    function toTitle(slug) {
        return slug.replace(/-/g, " ").replace(/\b[a-z]/g, function() {
            return arguments[0].toUpperCase();
        });
    }
    function toDateFormat(date) {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: 'numeric',
            year: 'numeric'
        });
    }
    function changeText(el, text) {
        if (el.length > 0) {
            el.text(text)
        }
    }
    function debounce(func, delay = 100){
        let timer;
        return function(event) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, delay, event);
        };
    }
    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    function isTouchDevice() {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    }
    function updateUrl(title, type) {
        history.replaceState({},'',`/${type}/${title}`)
        $('title').text(toTitle(title))
    }

    function detectPage(pageName) {
        // Header link
        $('[data-link]').removeClass('active');
        $(`[data-link="${pageName}"]`).addClass('active');
        $('.nav-logo-ic-outer').css({
            '--i': $(`[data-link="${pageName}"]`).index()
        })
    }
    function detectOS() {
        let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
        if (!isTouchDevice()) {
            if (!isSafari) {
                $('video[data-os-depend] [data-ext="mov"]').remove()
            } else {
                $('video[data-os-depend] [data-ext="webm"]').remove()
            }
            $('video[data-os-depend]').each(function(index) {
                $(this).get(0).load()
            })
            return isSafari
        } else {
            if(navigator.userAgent.match(/SAMSUNG|Samsung|SGH-[I|N|T]|GT-[I|N]|SM-[A|N|P|T|Z]|SHV-E|SCH-[I|J|R|S]|SPH-L/i)) {
                if (!isSafari) {
                    $('video[data-os-depend] [data-ext="mov"]').remove()
                } else {
                    $('video[data-os-depend] [data-ext="webm"]').remove()
                }
                $('video[data-os-depend]').each(function(index) {
                    $(this).get(0).load()
                })
                return isSafari
            }
        }
    }
    detectOS()

    function setNavMargin() {
        marginAuto = ($(window).width() - $('.container').width()) / 2;
        //Update nav
        if ($(window).width() > 991) {
            $('.nav-left-wrap').css('margin-left',`-${marginAuto}px`)
            $('.nav-right-bg-overflow').css('right',`-${marginAuto}px`)
        }
    }
    setNavMargin()
    $(window).on('resize', debounce(function() {
        setNavMargin();
    }))

    function createFaq(el,isRichtext = false) {
        if (isRichtext) {
            let ans = '';
            let richTextArray = el.data.content_richtext;
            for (const block of richTextArray) {
                switch (block.type) {
                case 'paragraph':
                        let string = block.text;
                        for (const span of block.spans) {
                            switch (span.type) {
                                case 'strong':
                                string = string.replace(block.text.substring(span.start, span.end),`<strong>${block.text.substring(span.start, span.end)}</strong>`);
                                break;
                                case 'em':
                                string = string.replace(block.text.substring(span.start, span.end),`<em>${block.text.substring(span.start, span.end)}</em>`);
                                break;
                                case 'hyperlink':
                                string = string.replace(block.text.substring(span.start, span.end),`<a href="${span.data.url}" ${span.data.target ? "target='_blank'" : ''} class="span-txt-link hover-un">${block.text.substring(span.start, span.end)}</a>`);
                                break;
                                case 'label':
                                if (span.data.label == 'big-rate' || span.data.label == 'small-rate' || span.data.label == 'limit-amount' || span.data.label == 'limit-date' || span.data.label == 'other-rate') {
                                    let tag;
                                    switch (span.data.label) {
                                        case 'big-rate':
                                        tag = "big"
                                        break;
                                        case 'small-rate':
                                        tag = "small"
                                        break;
                                        case 'other-rate':
                                        tag = "other"
                                        break;
                                        case 'limit-amount':
                                        tag = "amount"
                                        break;
                                        case 'limit-date':
                                        tag = "date"
                                        break;
                                        default:
                                        break;
                                    }
                                    string = string.replace(block.text.substring(span.start, span.end), `<span data-rate=${tag}>${block.text.substring(span.start,span.end)}</span>`)
                                }
                                break;
                                default:
                                break;
                            }
                        }
                        ans += `<p class="txt-16 art-para-sm-sub">${string}</p>`;
                    break;
                case 'image':
                    ans += `<div class="art-img-lg-wrap mod-faq">
                    <img class="img-basic art-main-img" src="${block.url}" alt="${block.alt}" width="${block.dimensions.width}" height="${block.dimensions.height}"/>
                    </div>`;
                    //${block.alt != null ? `<div class="txt-14 art-img-cap">${block.alt}</div>` : "" }
                    break;
                case 'embed':
                    ans += `<div class="art-embed-wrap mod-faq">${block.oembed.html}</div>`
                    break;
                case 'list-item':
                    let listString = block.text;
                        for (const span of block.spans) {
                            switch (span.type) {
                                case 'strong':
                                listString = listString.replace(block.text.substring(span.start, span.end),`<strong>${block.text.substring(span.start, span.end)}</strong>`);
                                break;
                                case 'em':
                                listString = listString.replace(block.text.substring(span.start, span.end),`<em>${block.text.substring(span.start, span.end)}</em>`);
                                break;
                                case 'hyperlink':
                                listString = listString.replace(block.text.substring(span.start, span.end),`<a href="${span.data.url}" ${span.data.target ? "target='_blank'" : ''} class="span-txt-link hover-un">${block.text.substring(span.start, span.end)}</a>`);
                                break;
                                case 'label':
                                    if (span.data.label == 'big-rate' || span.data.label == 'small-rate' || span.data.label == 'limit-amount' || span.data.label == 'limit-date' || span.data.label == 'other-rate') {
                                        let tag;
                                        switch (span.data.label) {
                                            case 'big-rate':
                                            tag = "big"
                                            break;
                                            case 'small-rate':
                                            tag = "small"
                                            break;
                                            case 'other-rate':
                                            tag = "other"
                                            break;
                                            case 'limit-amount':
                                            tag = "amount"
                                            break;
                                            case 'limit-date':
                                            tag = "date"
                                            break;
                                            default:
                                            break;
                                        }
                                        listString = listString.replace(block.text.substring(span.start, span.end), `<span data-rate=${tag}>${block.text.substring(span.start,span.end)}</span>`)
                                    }
                                break;
                                default:
                                break;
                            }
                        }
                    ans += `<li class="txt-16 art-txt-li">${listString}</li>`;
                    break;
                default:
                    console.error(`Unsupported block type: ${block.type}`);
                    break;
                }
            }
            let faqItem = $(`
                <div class="home-faq-item" id="${el.uid.replaceAll('.','')}">
                    <a href="#" class="home-faq-item-head w-inline-block">
                        <div class="txt-16 home-faq-item-ques">${el.data.question}</div>
                        <div class="ic-plus-wrap">
                            <div class="ic-plus-inner"></div>
                            <div class="ic-plus-inner mod-rotate"></div>
                        </div>
                    </a>
                    <div class="home-faq-item-body">
                        <div class="txt-16 home-faq--itemans">${ans}</div>
                    </div>
                    <div class="home-faq-bar">
                        <div class="home-faq-bar-inner"></div>
                    </div>
                </div>
            `);
            ans = updateUlLi($(faqItem).find('.home-faq--itemans'))
            function updateUlLi(wraper) {
                const wraperEl = wraper;
                const liEls = wraperEl.find('li');
                liEls.each((i) => {
                    let ulTemplate = $('<ul class="art-txt-ul mod-faq-ans"></ul>')
                    if (liEls.eq(i).prev().get(0) != liEls.eq(i - 1).get(0)) {
                        ulTemplate.clone().insertBefore(liEls.eq(i))
                    }
                })
                liEls.each((i) => {
                    if (liEls.eq(i).prev().prop('tagName') == 'UL') {
                        liEls.eq(i).appendTo(liEls.eq(i).prev())
                    }
                })
            }
            return faqItem;
            // let faqItem = $(`<div class="txt-16">Richtext</div>`)
            // return faqItem;
        } else {
            let faqItem = $(`
                <div class="home-faq-item" id="${el.uid.replaceAll('.','')}">
                    <a href="#" class="home-faq-item-head w-inline-block">
                        <div class="txt-16 home-faq-item-ques">${el.data.question}</div>
                        <div class="ic-plus-wrap">
                            <div class="ic-plus-inner"></div>
                            <div class="ic-plus-inner mod-rotate"></div>
                        </div>
                    </a>
                    <div class="home-faq-item-body">
                        <p class="txt-16 home-faq--itemans">${el.data.answer}</p>
                    </div>
                    <div class="home-faq-bar">
                        <div class="home-faq-bar-inner"></div>
                    </div>
                </div>
            `);
            return faqItem
        }
    }
    function pushFaqTracking(item) {
        let id = $(item).closest('.home-faq-item').attr('id')
        let ques = $(item).find('.home-faq-item-ques').text();
        window.dataLayer = window.dataLayer || [];
        if (window.dataLayer != undefined) {
            window.dataLayer.push({
                'event':'page_view',
                'faq_id':id,
                'faq_name':ques
            });
        }
    }
    function animateFaq() {
        $('.home-faq-item-head').on('click', function(e) {
            e.preventDefault();
            if ($(this).hasClass('active')) {
                $('.home-faq-item-head').removeClass('active');
                $('.home-faq-item').removeClass('active');
                $('.home-faq-item-body').slideUp();
            } else {
                $('.home-faq-item-head.active').parent().find('.home-faq-item-body').slideUp();
                $('.home-faq-item-head').removeClass('active');
                $('.home-faq-item').removeClass('active');
                $(this).addClass('active');
                $(this).parent('.home-faq-item').addClass('active');
                $(this).parent().find('.home-faq-item-body').slideDown();
            }
            pushFaqTracking(this)
        })

        if ($('.faq-page').length) {
            $('.home-faq-item-body .span-txt-link').on('click', function(e) {
                let target = $(this).attr('href');
                if (target.includes(`${window.location.pathname}`)) {
                    e.preventDefault();
                    let newTarget = new URL(target).searchParams.get('id')

                    $(`#${newTarget}`).find('.home-faq-item-head').trigger('click');
                    setTimeout(() => {
                        lenis.scrollTo(`#${newTarget}`, {offset: -$(window).height() / 2})
                    }, 200);
                }
            })
        } else {
            $('.home-faq-item-body .span-txt-link').on('click', function(e) {
                e.preventDefault()
                let target = $(this).attr('href');
                let url = new URL(target);
                let newURL = `${window.location.origin}${url.pathname}${url.search}`
                if ($(this).attr('target') == '_blank') {
                    window.open(newURL,'_blank').focus()
                } else {
                    window.location = newURL
                }

            })
        }
    }
    function createHtml(template, blog) {
        const html = template.clone();
        html.find('[data-blog="img"]').attr('src',blog.data.thumbnail.url);
        html.find('[data-blog="link"]').attr('href',`/article/${blog.uid}`)
        html.find('[data-blog-dou="link"]').attr('href',`/article/${blog.uid}`)
        changeText(html.find('[data-blog="category"]'), toTitle(blog.data.category.slug))
        html.find('[data-blog="category"]').attr('href',`/blog-category/${blog.data.category.uid}`)
        html.find('[data-blog-dou="category"]').attr('href',`/blog-category/${blog.data.category.uid}`)
        changeText(html.find('[data-blog="title"]'), blog.data.title)
        changeText(html.find('[data-blog="author"]'), toTitle(blog.data.author.uid))
        getDetail('author', blog.data.author.uid).then(((res) => {
            html.find('[data-blog="author-img"]').attr('src', res.data.thumbnail.url);
            html.find('[data-blog-dou="author-link"]').attr('href', `/blog-author/${res.uid}`)
        }));
        changeText(html.find('[data-blog="sum"]'), blog.data.short_description)
        changeText(html.find('[data-blog="date"]'), toDateFormat(blog.last_publication_date))
        return html;
    }
    function createPartnerHTML(template, partner) {
        const html = template.clone();
        html.find('[data-partner="img"]').attr('src',partner.data.image.url);
        html.find('[data-partner="label"]').text(partner.data.label);
        return html;
    }
    function createTestiHTML(template, testi) {
        const html = template.clone();
        html.find('[data-testi="avatar"]').attr('src',testi.data.avatar.url);
        html.find('[data-testi="platform"]').attr('src',testi.data.platform.url);
        html.find('[data-testi="rate"]').text(testi.data.rating);
        html.find('[data-testi="content"]').text(testi.data.content[0].text);
        html.find('[data-testi="author"]').text(testi.data.author[0].text);
        return html;
    }
    function backToBlog() {
        window.location.href = window.location.origin + '/blog'
    }
    function handle404() {
        window.location.href = window.location.origin + '/404'
    }
    // Scroll Events
    let header = $('.header');
    function scrollDown() {
        header.addClass('on-hide')
        if ($('.blog-page').length) {
            $('.blog-header').removeClass('on-scroll')
        }
        if ($('.faq-page').length) {
            $('.faq-stick-wrap').removeClass('on-hide')
        }
        if ($(window).width() < 991) {
            if ($('.faq-page').length) {
                $('.faq-toc-inner').removeClass('on-scroll')
            }
        }
        if ($(window).width() < 767) {
            if ($('.term-page').length) {
                $('.term-toc-wrap-overlay').removeClass('on-scroll')
            }
            if ($('.doc-page').length) {
                $('.term-toc-wrap-overlay').removeClass('on-scroll')
            }
        } else {
            if ($('.term-page').length) {
                $('.term-toc-wrap-overlay').addClass('on-scroll')
            }
            if ($('.doc-page').length) {
                $('.term-toc-wrap-overlay').addClass('on-scroll')
            }
        }
    }
    function scrollUp() {
        header.removeClass('on-hide')
        if ($('.blog-page').length) {
            $('.blog-header').addClass('on-scroll')
        }
        if ($('.faq-page').length) {
            $('.faq-stick-wrap').addClass('on-hide')
        }
        if ($(window).width() < 991) {
            if ($('.faq-page').length) {
                $('.faq-toc-inner').addClass('on-scroll')
            }
        }
        if ($(window).width() < 767) {
            if ($('.term-page').length) {
                $('.term-toc-wrap-overlay').addClass('on-scroll')
            }
            if ($('.doc-page').length) {
                $('.term-toc-wrap-overlay').addClass('on-scroll')
            }
        } else {
            if ($('.term-page').length) {
                $('.term-toc-wrap-overlay').removeClass('on-scroll')
            }
            if ($('.doc-page').length) {
                $('.term-toc-wrap-overlay').removeClass('on-scroll')
            }
        }
    }
    function isHeaderDarkMode() {
        if ($('.dark-header').length) {
            $('.header').addClass('dark-mode')
            if ($('.sc-home-hero').length) {
                if (lenis.scroll > $('.sc-home-hero').height()) {
                    $('.header').removeClass('dark-mode');
                } else {
                    $('.header').addClass('dark-mode');
                }
                if (lenis.scroll > $('.header').height()) {
                    $('.header').addClass('on-scroll');
                    $('.header').removeClass('dark-mode');
                } else {
                    $('.header').removeClass('on-scroll');
                }
            }
            return true;
        }
    }
    isHeaderDarkMode();
    function sortAsc(arr, isSubpage = false, orderType) {
        if (isSubpage) {
            return arr.sort((a,b) => {
                if (a.data[orderType] === null) {
                    return 1;
                }
                if (b.data[orderType] === null) {
                    return -1;
                }
                if (a.data[orderType] === b.data[orderType]) {
                    return 0;
                }
                return a.data[orderType] < b.data[orderType] ? -1 : 1;
            })
        } else {
            return arr.sort((a,b) => {
                if (a.data.order === null) {
                    return 1;
                }
                if (b.data.order === null) {
                    return -1;
                }
                if (a.data.order === b.data.order) {
                    return 0;
                }
                return a.data.order < b.data.order ? -1 : 1;
            })
        }
    }

    lenis.on('scroll', function (inst) {
        if (inst.scroll > header.height()) {
            header.addClass('on-scroll')
            if (inst.direction == 1) {
                // down
                scrollDown()
            } else if (inst.direction == -1) {
                // up
                scrollUp()
            }
            if ($('.dark-header').length) {
                header.removeClass('dark-mode')
            }
        } else {
            header.removeClass('on-scroll on-hide')
            if ($('.dark-header').length) {
                header.addClass('dark-mode')
            }
        };

        // Update blog page
        if ($('.article-page').length) {
            let currentPercent = inst.scroll / inst.limit;
            blogProgressSetter('.art-progress-inner')(currentPercent);
        }

        if ($('.faq-page').length) {
            if ($('.faq-stick-wrap').offset().top > $('.sc-faq-hero').height() + 1) {
                $('.faq-stick-wrap').addClass('on-stick')
            } else {
                $('.faq-stick-wrap').removeClass('on-stick')
            }
        }
    });

    if (isTouchDevice()) {
        let lastScrollTop = 0;
        $(window).on('scroll', function(e) {
            let st = $(this).scrollTop();
            if (st > lastScrollTop){
                scrollDown()
            } else {
                scrollUp();
            }
            lastScrollTop = st;
        })
    }
    function refreshOnBreakpoint() {
        let initialViewportWidth = window.innerWidth || document.documentElement.clientWidth;
        // portrait mobile viewport initial, any change refresh
        if (initialViewportWidth < 480) {
            $(window).on('resize', debounce(function() {
                newViewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (newViewportWidth > 479) {
                    location.reload();
                }
            }))
        }
        // landscape mobile viewport initial, any change refresh
        else if (initialViewportWidth < 768) {
            $(window).on('resize', debounce(function() {
                newViewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (newViewportWidth > 767) {
                    location.reload();
                }
            }))
        }
        // tablet viewport initial, any change refresh
        else if (initialViewportWidth > 767 && initialViewportWidth < 992)  {
            $(window).on('resize', debounce(function() {
                newViewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (newViewportWidth < 768 || newViewportWidth > 991) {
                    location.reload();
                }
            }))
        }
        // web viewport initial, any change refresh
        else if (initialViewportWidth > 991) {
            $(window).on('resize', debounce(function() {
                newViewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (newViewportWidth < 992) {
                    location.reload();
                }
            }))
        }
    }
    refreshOnBreakpoint();

    //Mouse move Events
    let mousePos = {x: 0, y: 0};
    let mousePosRaw = {x: 0, y: 0};

    $(window).on('mousemove', function(e) {
        mousePosRaw.x = e.clientX;
        mousePosRaw.y = e.clientY;
        mousePos.x = (mousePosRaw.x / $(window).width() - 0.5) * 2;
        mousePos.y = (mousePosRaw.y / $(window).width() - 0.5) * 2;
    })

    // Nav
    $('.nav-toggle').on('click', function(e) {
        e.preventDefault();
        if ($('.header').hasClass('on-open')) {
            closeNavmenu();
        } else {
            openNavMenu();
        }
    })
    $('.nav .nav-left-close').on('click', function(e) {
        e.preventDefault();
        closeNavmenu();
    })
    function openNavMenu() {
        const openNavTl = gsap.timeline({
            onStart() {
                gsap.set('.nav-right-wrap', {xPercent: 100})
                gsap.set('.nav-link', {xPercent: 40, autoAlpha: 0})
                gsap.set('.nav .mod-add .txt-16.nav-info-label, .nav .mod-add .txt-14.nav-info-item-label, .nav .mod-add .txt-14.nav-info-txt, .nav .mod-add .txt-14.nav-info-item-link', {autoAlpha: 0, x: 60})
                gsap.set('.nav .mod-down .txt-16.nav-info-label, .nav .mod-down .nav-qr-wrap, .nav .mod-down .nav-download-wrap', {autoAlpha: 0, x: 60})
                gsap.set('.nav .mod-down .nav-download-item-wrap', {x: 30})
                gsap.set('.nav-copy-wrap .txt-14.nav-copy-txt, .footer-social-wrap .txt-14.nav-social-label', {autoAlpha: 0, x: 60})
                gsap.set('.footer-social-wrap .footer-social-link.mod-nav', {autoAlpha: 0, x: 20})
                gsap.set('.nav .nav-bottom-line', {scaleX: 0, autoAlpha: 0})

                $('.nav').addClass('active');
                $('.header').addClass('on-open');
                if (!isTouchDevice()) {
                    lenis.stop();
                } else {
                    header.removeClass('on-hide')
                    $('body').css('overflow', 'hidden')
                }
            }
        })
        openNavTl.defaultEase = Power1.easeInOut;
        openNavTl
        .to('.nav-right-wrap', {xPercent: 0, duration: .6}, '0')
        .to('.nav-link', {xPercent: 0, autoAlpha:1, duration: .4, stagger: .04}, '<+=.3')

        .to('.nav .mod-add .txt-16.nav-info-label', {x: 0, autoAlpha: 1, duration: .3}, '.6')
        .to('.nav .mod-add .txt-14.nav-info-item-label', {x: 0, autoAlpha: 1, duration: .3}, '<=.06')
        .to('.nav .mod-add .txt-14.nav-info-txt, .nav .mod-add .txt-14.nav-info-item-link', {x: 0, autoAlpha: 1, duration: .3, stagger: .04}, '<=0')

        .to('.nav .mod-down .txt-16.nav-info-label', {x: 0, autoAlpha: 1, duration: .3}, '.6')
        .to('.nav .mod-down .nav-qr-wrap, .nav .mod-down .nav-download-wrap', {x: 0, autoAlpha: 1, duration: .3, stagger: .04, clearProps: 'opacity'}, '<=.06')
        .to('.nav .mod-down .nav-download-item-wrap', {x: 0, duration: .3, stagger: .04, clearProps: 'opacity'}, '<=.06')
        .to('.nav-copy-wrap .txt-14.nav-copy-txt', {x: 0, autoAlpha: 1, duration: .3}, '.6')
        .to('.nav .nav-bottom-line', {scaleX: 1, autoAlpha: 1, duration: .6}, '<=0')
        .to('.footer-social-wrap .txt-14.nav-social-label', {x: 0, autoAlpha: 1, duration: .3}, '<=.06')
        .to('.footer-social-wrap .footer-social-link.mod-nav', {x: 0, autoAlpha: 1, duration: .15, stagger: .008}, '<-=.06')
    }
    function closeNavmenu() {
        const closeNavTl = gsap.timeline({
            onStart() {
                if ($(window).width() > 991 ) {
                    setTimeout(() => {
                        $('.nav').removeClass('active');
                        $('.header').removeClass('on-open');
                    }, 300);
                } else {
                    setTimeout(() => {
                        $('.nav').removeClass('active');
                    }, 300);
                    $('.header').removeClass('on-open');
                }
                if (!isTouchDevice()) {
                    lenis.start();
                } else {
                    $('body').css('overflow', 'unset')
                }
            }
        })
        closeNavTl
        .to('.nav-right-wrap', {xPercent: 100, ease: Power1.easeInOut, duration: .6}, '0')
    }
    function getMobileOperatingSystem() {
        let userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/android/i.test(userAgent)) {
            return "Android";
        }
        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }
        return "unknown";
    }
    function handleMobileDownload() {
        if ($(window).width() < 991) {
            switch (getMobileOperatingSystem()) {
                case 'android':
                    $('[data-os="iOS"]').addClass('hidden')
                    break;
                case 'iOS':
                    $('[data-os="android"]').addClass('hidden')
                    break;
                default:
                    break;
            }
        }
    }
    handleMobileDownload();

    function handlePopup() {
        if ($('[data-popup]').length >= 1) {
            $('[data-popup]').on('click', function(e) {
                e.preventDefault();
                if ($(this).attr('data-popup') == 'open') {
                    lenis.stop();
                    $('.popup-wrap').addClass('active')
                } else if ($(this).attr('data-popup') == 'close') {
                    lenis.start();
                    $('.popup-wrap').removeClass('active')
                    $('.popup-content-form-inner').css('display','block')
                    $('.popup-form-success').css('display','none')
                    $('.popup-wrap').find('[data-form="form"]').trigger('reset')
                    $('.popup-wrap').find('[data-form="err"]').removeClass('active');
                } else if ($(this).attr('data-popup') == 'to-home') {
                    if (!$('.home-page').length) {
                        let domain = window.location.host;
                        window.location.href = `https://${domain}`;
                    } else {
                        $('[data-popup="close"]').trigger('click');
                    }
                }
            })
        }
    }
    handlePopup();

    const xSetter = (el) => {
        return gsap.quickSetter(el, 'x', `rem`);
    }
    const ySetter = (el) => gsap.quickSetter(el, 'y', `rem`)

    const xGetter = (el) => gsap.getProperty(el, 'x')
    const yGetter = (el) => gsap.getProperty(el, 'y')
    const blogProgressSetter = (el) => gsap.quickSetter(el, 'scaleX', '');

    function footerHandle() {
        let ftMarqueeTxt = $('.footer-marquee-txt');
        $('.footer-marquee-txt-wrap').append(ftMarqueeTxt.clone());
        $('.footer-marquee-txt-wrap').append(ftMarqueeTxt.clone());

        gsap.to(".footer-marquee-txt-wrap", {
            duration: 16,
            ease: 'none',
            x: `-=${$('.footer-marquee-txt-wrap .footer-marquee-txt').eq(0).outerWidth()}`,
            repeat: -1
        });
    };
    footerHandle();
    function getDeviceType() {
        let device;
        let viewportWidth = $(window).width();
        if (viewportWidth > 991) {
            device = 'desktop'
        } else if (viewportWidth > 768) {
            device = 'tablet'
        } else {
            device = 'mobile'
        }
        return device;
    }
    getDeviceType();
    function updateInterestRate(wrapper) {
        let bigRate = $('[data-rate-source="big"]').text();
        let smallRate = $('[data-rate-source="small"]').text();
        let otherRate = $('[data-rate-source="other"]').text();
        let amount = $('[data-rate-source="amount"]').text();
        let date = $('[data-rate-source="date"]').text();
        let allRates = $(wrapper).find('[data-rate]');
        allRates.each(function(e) {
            let type = $(this).attr('data-rate');
            if (type == 'big') {
                $(this).text(bigRate)
            } else if (type == 'small') {
                $(this).text(smallRate)
            } else if (type == 'amount') {
                $(this).text(amount)
            } else if (type == 'date') {
                $(this).text(date)
            } else if (type == 'other') {
                $(this).text(otherRate)
            }
        })
    }
    updateInterestRate('.main')
    function setupDialCode(data, selectId) {
        //Get data
        let codes = data;
        selectId.forEach((selectItem) => {
            if ($(selectItem).length >= 1) {
                $(selectItem).html('')
                codes.forEach((el) => {
                    let html = `<option value="${el.dial_code}">${el.name} (${el.dial_code})</option>`
                    $(selectItem).append(html)
                })

                $(selectItem).select2()

                $(selectItem).closest('[data-form="form"]').find('.dial-code-wrap').on('click', function(e) {
                    e.preventDefault();
                    $(selectItem).select2('open');
                })
                $(selectItem).on('select2:select', function(e) {
                    let code = $(this).val();
                    $(selectItem).closest('.dial-code-wrap').find('.phone-region').text(code)
                })
                $(selectItem).on('select2:opening', function(e) {
                    setTimeout(() => {
                        $('.select2-results__options').attr('data-lenis-prevent','')
                    }, 300);
                })
            }

        })
    }
    setupDialCode(dialCodes, ['#dialCode', '#dialPopup']);
    function triggerSubscribeBlueShift(type, formName, value) {
        if (type == 'phone') {
            blueshift.identify({
                phone_number: value,
                customer_id: '',
                unsubscribed_sms: false,
            })
            blueshift.track("Lead Submitted", {
                form_name: formName,
                form_type: 'static',
                device: getDeviceType(),
                phone_number: value,
                customer_id: '',
            });

        } else if (type == 'email') {
            blueshift.identify({
                email: value,
                customer_id: '',
                unsubscribed: false,
            })
            blueshift.track("Lead Submitted", {
                form_name: formName,
                form_type: 'sticky',
                device: getDeviceType(),
                email: value,
                customer_id: '',
            });
        }
    }
    function triggerFormSuccess(type, formName) {
        let el = $('.float-inner');
        if (formName != 'popup') {
            if (type == 'phone') {
                $('[data-form="banner"]').find('[data-form="form"]').trigger('reset')
                el.find('.float-title').text('We have sent the link to your phone number!')
                el.find('.float-sub').removeClass('hidden')
                el.find('.float-sub').text('Please check your messages and activate your account.')
            } else if (type == 'email') {
                $('[data-form="banner"]').find('[data-form="form"]').trigger('reset')
                el.find('.float-title').text('You have successfully subscribed to our newsletter!')
                el.find('.float-sub').addClass('hidden')
            } else if (type == 'contact') {
                $('[data-form="banner"]').find('[data-form="form"]').trigger('reset')
                el.find('.float-title').text('Your submission has been sent!')
                el.find('.float-sub').removeClass('hidden')
                el.find('.float-sub').text("We'll reply to you as soon as possible.")
            }
            el.addClass('active')
            setTimeout(() => {
                el.removeClass('active')
            }, 5000);
        } else {
            setTimeout(() => {
                $('.popup-content-form-inner').css('display','none')
                $('.popup-form-success').css('display','block')
                $('.popup-wrap').find('[data-form="form"]').trigger('reset')
            }, 1000);
        }
    }
    function formSubscribeTrigger() {
        //Submit
        let allForm = $('[data-form="form"]');
        allForm.each(function(i, form) {
            $(form).on('submit', function(e) {
                e.preventDefault();
                let type = $(this).find('[input-type]').attr('input-type');
                let formName = $(this).attr('data-name');
                let value;
                if (type == 'phone') {
                    if ($(this).find('[data-form="dial-input"]').length) {
                        value = $(this).find('[data-form="dial-input"]').text() + $(this).find('[data-form="input"]').val();
                        value = value.replaceAll('-', '').replaceAll(' ', '');
                    } else {
                        value = $(this).find('[data-form="input"]').val().replaceAll('-', '').replaceAll(' ', '');
                    }
                } else if (type == 'email') {
                    value = $(this).find('[data-form="input"]').val();
                }
                triggerSubscribeBlueShift(type, formName, value)
                triggerFormSuccess(type, formName)
                return false;
            })
            $(form).find('[data-form="submit"]').on('click', function(e) {
                e.preventDefault();
                let type = $(form).find('[input-type]').attr('input-type');
                if ($(form).find('[data-form="input"]').val() != '') {
                    $(form).submit();
                } else {
                    $(form).find('[data-form="err"]').addClass('active');
                    //alert(`Please fill in your ${type}`)
                }
            })
            $(form).find('[data-form="input"]').on('focus', (e) => {
                if ($(form).attr('data-name') == 'popup') {
                    $(form).find('.popup-form-input-wrap').addClass('active');
                } else {
                    $(form).addClass('active');
                }
                $(form).find('[data-form="err"]').removeClass('active');
            })
            $(form).find('[data-form="input"]').on('blur',(e) => {
                if ($(form).attr('data-name') == 'popup') {
                    $(form).find('.popup-form-input-wrap').removeClass('active');
                } else {
                    $(form).removeClass('active');
                }
            })
            $(form).find('[input-type="phone"]').on('input', function(e) {
                let newValue = this.value.replace(new RegExp(/[^\d-.+ ]/,'ig'), "");
                this.value = newValue;
            })
        })
        $('.float-close').on('click', function(e) {
            e.preventDefault();
            $('.float-inner').removeClass('active')
        })
    }
    formSubscribeTrigger()

    if ($('.intro-wrap').length) {
        $('.intro-wrap').addClass('loaded')
    }
    if (!isTouchDevice()) {
        lenis.scrollTo(0, {duration: .001})
    } else {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
          });
    }

    const SCRIPT = {};
    SCRIPT.homeScript = () => {
        function homeViewportHandle() {
            if ($('.sc-home-hero').length && $(window).width() > 991) {
                let originalHeroHeight = $('.sc-home-hero').height();

                function resizeHomeHero() {
                    $('.sc-home-hero').removeClass('on-vp-sm');
                    originalHeroHeight = $('.sc-home-hero').height();
                    if (originalHeroHeight > $(window).height()) {
                        $('.sc-home-hero').addClass('on-vp-sm');
                    } else {
                        $('.sc-home-hero').removeClass('on-vp-sm');
                    }
                }
                resizeHomeHero();
                $(window).on('resize', debounce(function() {
                    resizeHomeHero();
                }))
            }
        }
        homeViewportHandle();
        function homeHeroIntro() {
            let vid = document.querySelector('.vid-home-hero');
            let textCir;
            if ($(window).width() > 991) {
                textCir = new CircleType(document.querySelector('.mod-circletext.mod-dk'));
            } else {
                textCir = new CircleType(document.querySelector('.mod-circletext.mod-tb'));
            }
            $('.mod-circletext').css('display','flex')
            $('.text-cir-wrap').addClass('anim-rotate')
            //  vid.defaultPlaybackRate = 1.4;
            const homeIntroTl = gsap.timeline({
                default: {ease: Power1.easeIn},
                onStart() {
                    //gsap.set('.sc-home-hero .home-hero-rate-wrap',{'transform-origin': 'center center'})
                    setTimeout(() => {
                        vid.play()
                    }, 1200);
                }
            })
            homeIntroTl.from('.home-hero-content .home-hero-title', {y: 40, autoAlpha: 0, duration: .8, clearProps: 'all'}, '0')
            .from('.home-hero-content .home-hero-sub', {y: 40, autoAlpha: 0, duration: .8, clearProps: 'all'}, '0')
            .from('.home-hero-content .btn.mod-home-hero', {y: 40, autoAlpha: 0, duration: .8, clearProps: 'all'}, '0')
            // Human first
            .from('.sc-home-hero .home-hero-img-human img', {y: 40, autoAlpha: 0, duration: .6, clearProps: 'opacity'}, '<=.3')
            //.from('.sc-home-hero .home-hero-rate-wrap', {y: 40, autoAlpha: 0, duration: .6}, '>=0')
            .from('.sc-home-hero .home-hero-img-c-bg', {opacity: 0, duration: .6, clearProps: 'opacity'}, '>=0')
            .from('.sc-home-hero .home-hero-img-c-bg img, .sc-home-hero .home-hero-rate-wrap', {y: 40, duration: .6}, '<=0')

            //Default
            // .from('.sc-home-hero .home-hero-img-c-bg img', {yPercent: 14, autoAlpha: 0, duration: 1.2}, '<=0')
            // .from('.sc-home-hero .home-hero-img-human img', {yPercent: 14, autoAlpha: 0, duration: .8}, '<=.4')

            // C first, human from bot
            // .from('.sc-home-hero .home-hero-img-c-bg img', {yPercent: 14, autoAlpha: 0, duration: 1.2}, '<=0')
            // .from('.sc-home-hero .home-hero-img-human img', {yPercent: 100, duration: .8}, '<=.4')
        }
        homeHeroIntro();
        function getHomePartners() {
            getAllDataByType('partners_logo').then((res) => {
                if (res) {
                    let allPartner = sortAsc(res, true, 'order')
                    let template = $('.home-partner-inner').find('.home-partner-item').eq(0).clone();
                    $('.home-partner-inner').html('')
                    allPartner.forEach((i) => {
                        createPartnerHTML(template, i).appendTo($('.home-partner-inner'))
                    })
                }
            });
        }
        getHomePartners()
        function homeHeroHandle() {
            let ribbonOffset, humanOffset;
            if ($(window).width() > 991) {
                ribbonOffset = 6.9;
                humanOffset = 10;
                circleOffset = 4;
            } else {
                ribbonOffset = 2.6;
                humanOffset = 6;
                circleOffset = 2;
            }
            const homeHeroTl = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.sc-home-hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                }
            });
            homeHeroTl.from('.home-rich-bg-img', {y: ribbonOffset * unit, ease: 'none'})
            .to('.home-hero-img-human img', {y: humanOffset * unit, ease: 'none'}, '0')
            .to('.home-hero-img-c-bg img', {y: -humanOffset * unit, ease: 'none'}, '0')

            if ($(window).width() > 991) {
                homeHeroTl.from('.home-partner-inner', {'grid-column-gap': '10rem', ease: 'none'}, '0')
                // Mouse move human parallax
                function applyHumanParallax() {
                    let humanX = xGetter('.home-hero-img-human');
                    let humanY = yGetter('.home-hero-img-human');
                    let circleX = xGetter('.home-hero-img-c-bg');
                    let circleY = yGetter('.home-hero-img-c-bg');
                    let rateX = xGetter('.home-hero-rate-wrap .home-hero-rate');
                    let rateY = yGetter('.home-hero-rate-wrap .home-hero-rate');
                    if ($('.home-partner-inner').length) {
                        xSetter('.home-hero-img-human')(lerp(humanX, -mousePos.x * 1.2));
                        ySetter('.home-hero-img-human')(lerp(humanY, -mousePos.y));

                        xSetter('.home-hero-img-c-bg')(lerp(circleX, mousePos.x));
                        ySetter('.home-hero-img-c-bg')(lerp(circleY, mousePos.y * .8));

                        xSetter('.home-hero-rate-wrap .home-hero-rate')(lerp(rateX, -mousePos.x * 1.6));
                        ySetter('.home-hero-rate-wrap .home-hero-rate')(lerp(rateY, -mousePos.y * 1.4));
                        requestAnimationFrame(applyHumanParallax)
                    }
                }
                requestAnimationFrame(applyHumanParallax)
            }
        }
        homeHeroHandle();
        function homeBenefSetup() {
            if ($(window).width() > 991) {
                let cloneSwiper = $('.home-benef-main.swiper').clone().removeClass('mod-bot').addClass('mod-top');
                $('.home-benef-main-wrap').append(cloneSwiper);
            }

            let cloneImg = $('.home-benef-img-wrap img');
            $('.home-benef-img-inner').append(cloneImg.clone());
            // $('.home-benef-img-inner').append(cloneImg.clone());
            // $('.home-benef-img-inner').append(cloneImg.clone());
        }
        homeBenefSetup();
        function homeBenefHanlde() {
            gsap.set(".home-benef-img-wrap .img-basic", {
                x: (i) => (i - 1) * $('.home-benef-img-wrap .img-basic').eq(0).width()
            });

            if ($(window).width() < 991) {
                let homeBenefSwiper = new Swiper('.home-benef-main.mod-bot', {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    scrollbar: {
                        el: '.home-benef-bar-outer',
                    },
                    breakpoints: {
                        767: {
                            slidesPerView: 2,
                        }
                    }
                });
            }

            // const ribbonTl = gsap.timeline({
            // })
            // ribbonTl.to(".home-benef-img-inner", {
            //     duration: 30,
            //     ease: 'none',
            //     x: `+=${$('.home-benef-img-inner .img-basic').eq(0).width()}`,
            //     repeat: -1,
            // });

            // const tlwrap = gsap.timeline({
            //     scrollTrigger: {
            //         trigger: $('.wrapper'),
            //         onUpdate() {
            //             let velo = gsap.utils.clamp(1, 4, Math.abs(lenis.velocity).toFixed(3));
            //             gsap.set(ribbonTl, {timeScale: 1 * velo, overwrite: true});
            //         }
            //     }
            // })

            let homeBenefCardsHigh = $('.home-benef-cards .home-benef-item-wrap.mod-high');
            let homeBenefCardsLow = $('.home-benef-cards .home-benef-item-wrap.mod-low');
            let homeBenefCardOffset = 7.6;
            const homeBenefTl = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.sc-home-benef',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                }
            });
            homeBenefTl
            .fromTo('.home-benef-img-inner', {x: -20 * unit, y: 2.5 * unit}, {x: 20 * unit, y: -2.5 * unit, ease: 'none'})
            .fromTo(homeBenefCardsHigh, {y: homeBenefCardOffset * unit, ease: 'none'}, {y: -2 * unit}, '0')
            .fromTo(homeBenefCardsLow, {y: -homeBenefCardOffset / 2 * unit, ease: 'none'}, {y: 2 * unit}, '0')

            if ($(window).width() > 991) {
                const homeBenefSubTl = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.home-benef-sub-wrap',
                        start: `-=${8 * unit} bottom`,
                        end: `bottom+=${8 * unit} bottom`,
                        scrub: 1,
                        //markers: true,
                    }
                })
                homeBenefSubTl.from('.home-benef-sub-inner', {yPercent: 100, ease: 'none'})
            }
        }
        homeBenefHanlde();
        function homeSecuHover() {
            if ($(window).width() > 991) {
                $('.home-secu-item').on('mouseenter', function(e) {
                    e.preventDefault();
                    $('.home-secu-img-inner').removeClass('active');
                    let item = $(this).attr('data-home-secu');
                    $(`.home-secu-img-inner[data-home-secu="${item}"]`).addClass('active');
                });

                // $('.home-secu-item').on('mouseleave', function(e) {
                //     e.preventDefault();
                //     $('.home-secu-img-inner').removeClass('active');
                // });
            }

            if ($(window).width() < 767) {
                $('.home-secu-main-wrap').addClass('swiper')
                $('.home-secu-main').addClass('swiper-wrapper')
                $('.home-secu-item').addClass('swiper-slide')
                const homeSecuSwiper = new Swiper('.swiper.home-secu-main-wrap', {
                    slidesPerView: 1,
                    spaceBetween: 3.2 * unit,
                })
            }

            if ($(window).width() > 991) {
                let mousePosHomeSecu = {x: 0, y: 0};
                $('.home-secu-main-wrap').on('mousemove', function(e) {
                    mousePosHomeSecu.x = (((e.clientX - $('.home-secu-main-wrap').get(0).getBoundingClientRect().x) / $('.home-secu-main-wrap').width())  - 0.5) * 2;
                    mousePosHomeSecu.y = (((e.clientY - $('.home-secu-main-wrap').get(0).getBoundingClientRect().y) / $('.home-secu-main-wrap').height())  - 0.5) * 2;
                })
                $('.home-secu-main-wrap').on('mouseleave', function(e) {
                    mousePosHomeSecu = {x: 0, y: 0}
                })
                // Mouse move icons parallax
                function applySecuParallax() {
                    let iconsX = xGetter('.home-secu-main-img-wrap');
                    let iconsY = yGetter('.home-secu-main-img-wrap');
                    if ($('.home-secu-main-img-wrap').length) {
                        xSetter('.home-secu-main-img-wrap')(lerp(iconsX, -mousePosHomeSecu.x * 4.2));
                        ySetter('.home-secu-main-img-wrap')(lerp(iconsY, -mousePosHomeSecu.y * 4.2));
                        requestAnimationFrame(applySecuParallax)
                    }
                }
                requestAnimationFrame(applySecuParallax)
            }
        };
        homeSecuHover();
        function homeChartHandle() {
            let c_Canvas = document.getElementById('myChart');
            const ctx = c_Canvas.getContext("2d");
            const chocoFin_bg = ctx.createLinearGradient(0, 0, 0, $('#myChart').height() - (4 * unit));
            chocoFin_bg.addColorStop(0, 'rgba(228, 32, 130, .4)');
            chocoFin_bg.addColorStop(1, 'rgba(228, 32, 130, 0)');
            let dotBorderRad, lineWidth, dotBorderWidth;
            if ($(window).width() > 1920) {
                dotBorderRad = .6;
                dotBorderWidth = .6;
                lineWidth = .2;
            } else if ($(window).width() > 991) {
                dotBorderRad = .6;
                dotBorderWidth = .4;
                lineWidth = .2;
            } else {
                dotBorderRad = .3;
                lineWidth = .1;
                dotBorderWidth = .4;
            }

            const limitAmount = parseInt($('[data-rate-source="amount"]').text().replace(',',''));
            const bigRate = parseFloat($('[data-rate-source="big"]').text()) / 100;
            const smallRate = parseFloat($('[data-rate-source="small"]').text()) / 100;
            const otherRate = parseFloat($('[data-rate-source="other"]').text()) / 100;

            const style = {
                chocoFin: {
                    color: 'rgba(228, 32, 130, 1)',
                    bg: chocoFin_bg,
                },
                other: {
                    color: 'rgba(186, 137, 79, 1)'
                }
            }
            const data = {
                time: [],
                chocoFin: [],
                other: [],
                pointRadius: [],
            };

            fomularCf(100, 360);

            let c_Data = {
                type: 'line',
                data: {
                    labels: data.time,
                    datasets: [
                        {
                            data: data.chocoFin,
                            borderColor: style.chocoFin.color,
                            fill: true,
                            backgroundColor: style.chocoFin.bg,
                        },
                        {
                            data: data.other,
                            borderColor: style.other.color,
                        },
                    ]
                },
            };
            let c_Options = {
                animation: true,
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        text: 'Chart Title',
                        display: false,
                    },
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: false,
                    }
                },
                layout: {
                    padding: 0,
                },
                scales: {
                    x: {
                        display: false,
                        ticks: {
                            padding: 100,
                        },
                        grid: {
                            drawOnChartArea: false,
                            display: false,
                            drawTicks: false,
                        }
                    },
                    y: {
                        display: false,
                        ticks: {
                            padding: 0,
                            //display: false, // display true to get offset top/left for chart
                            stepSize: 100
                        },
                        grid: {
                            drawOnChartArea: false,
                            //display: false,
                            drawTicks: false,
                        },
                        //grace: '1%',
                        //beginAtZero: true,
                        offset: true,
                        max: data.chocoFin[data.time.length - 1],
                        min: data.chocoFin[0]
                    }
                },
                elements: {
                    point: {
                        pointRadius: data.pointRadius,
                        hitRadius: data.pointRadius,
                        hoverRadius: data.pointRadius,
                        hoverBorderWidth: dotBorderWidth * unit,
                        hoverBackgroundColor: 'white',
                        pointBackgroundColor: 'white',
                        pointBorderWidth: dotBorderWidth * unit,
                    },
                    line: {
                        borderWidth: .4 * unit,
                    }
                }
            }

            // Init Chart js + Scrolltrigger
            let lineChart;
            let homeChartInitTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-chart-wrap',
                    start: 'top top+=40%',
                    once: true,
                    onEnter: () => {
                        lineChart = new Chart(c_Canvas, {
                            ...c_Data,
                            options: {
                                ...c_Options
                            }
                        });
                        updateChart(100, 360);
                        setTimeout(() => {
                            lineChart.options.animation = false;
                        }, 400);
                    }
                }
            })
            homeChartInitTl.from('.chart-tip-box', {autoAlpha: 0, yPercent: 100, duration: .4, ease: 'Power1.easeInOut', stagger: 0.1, clearProps: 'all'})

            function fomularCf(balance, time) {
                data.time = [0]
                for (let x = 1; x <= time; x++) {
                    data.time.push(x)
                }

                data.pointRadius = [unit * dotBorderRad]
                for (let x = 1; x <= time; x++) {
                    if (x == time) {
                        data.pointRadius.push(unit * dotBorderRad)
                    } else {
                        data.pointRadius.push(0)
                    }
                }

                data.chocoFin = [balance];

                let lastBalance = balance;
                let result;
                for (let x = 1; x <= time; x++) {
                    if (lastBalance >= limitAmount) {
                        result = (limitAmount * (1 + (bigRate / 12))) + ((lastBalance - limitAmount) * (1 + (smallRate / 12)));
                    } else {
                        result = lastBalance * (1 + (bigRate / 12));
                    }
                    data.chocoFin.push(result)
                    lastBalance = result;
                }

                data.other = [balance];
                for (let x = 1; x <= time; x++) {
                    let formular = balance * Math.pow((1 + (otherRate / 12)), x);
                    data.other.push(formular)
                }
            }

            function updateChart(balance, time) {
                fomularCf(balance,time)
                //c_Options.animation = false;
                lineChart.data.labels = data.time;
                lineChart.data.datasets[0].data = data.chocoFin;
                lineChart.data.datasets[1].data = data.other;
                c_Options.scales.y.min = data.chocoFin[0];
                c_Options.scales.y.max = data.chocoFin[time];
                c_Options.elements.point.pointRadius = data.pointRadius;
                c_Options.elements.point.hitRadius = data.pointRadius;
                c_Options.elements.point.hoverRadius = data.pointRadius;
                lineChart.options.scales.y = c_Options.scales.y;

                lineChart.update();
                let data_Cf = data.chocoFin[time];
                let data_other = data.other[time];
                $('.chart-tip-amount.amount-cf').text(` ${formatter.format(data_Cf)} `)
                $('.span-choco-white.re-total-cf').text(` ${formatter.format(data_Cf)} `)
                $('.chart-tip-amount.amount-other').text(` ${formatter.format(data_other)} `)
                $('.span-choco-white.re-total-other').text(` ${formatter.format(data_other)} `)
                let difference = data_Cf - data.chocoFin[0];
                $('.span-choco-white.re-earn-cf').text(` ${formatter.format(difference)} `);

                if ($(window).width() > 991) {
                    let bottomVal = (data_other - data.chocoFin[0]) / (data_Cf - data.chocoFin[0]) * 100;
                    $('.chart-tip-box.box-other').css('bottom', `calc(${bottomVal}% + 6rem)`)
                }
            }

            // Input events - Update chart
            $('input.input-slider').on('input', function() {
                let balanceVal = $('#chartBalance').val();
                let timeVal = $('#chartTime').val();
                let timeYear = Math.floor(timeVal / 12);
                let timeMonth = timeVal % 12;
                let minVal = $(this).attr('min');
                let maxVal = $(this).attr('max');
                let percent = (($(this).val() - minVal) / (maxVal - minVal)) * 100;
                $(this).css('background', 'linear-gradient(to right, #e42082 0%, #e42082 ' + percent + '%, #f0f0f0 ' + percent + '%, #f0f0f0 100%)');
                if ($(this).attr('id') == 'chartBalance') {
                    balanceVal = formatter.format($(this).val())
                    $('.homt-chart-balance-start').text(balanceVal)
                    $(this).parent().parent().find('.home-chart-ctrl-number').text(balanceVal)
                } else if ($(this).attr('id') == 'chartTime') {
                    timeVal = $(this).val()
                    timeYear = Math.floor(timeVal / 12);
                    timeMonth = timeVal % 12;
                    console.log(`${Math.floor(timeVal / 12)} years ${timeVal % 12} month`)

                    let monthUnit, yearUnit, unitExtra;

                    if (timeYear == 1) {
                        yearUnit = 'year'
                    } else {
                        yearUnit = 'years'
                    }

                    if (timeMonth == 1) {
                        monthUnit = 'month'

                    } else {
                        monthUnit = 'months'
                    }

                    if (timeMonth == 0) {
                        if (timeYear == 1) {
                            unitExtra = "'s"
                        } else {
                            unitExtra = "'"
                        }
                    } else {
                        if (timeMonth == 1) {
                            unitExtra = "'s"
                        } else {
                            unitExtra = "'"
                        }
                    }
                    if (timeVal <= 200) {
                        $('.homt-chart-balance-start').addClass('mod-lift')
                    } else {
                        $('.homt-chart-balance-start').removeClass('mod-lift')
                    }
                    $('.home-chart-time-txt').text(`${timeYear == 0 ? '' : timeYear + ' ' + yearUnit}${timeMonth == 0 ? '' : ' ' + timeMonth + ' ' + monthUnit}${unitExtra} time`)
                    //$(this).parent().parent().find('.home-chart-ctrl-number').text(`${timeVal} ${monthUnit}`)
                    $(this).parent().parent().find('.home-chart-ctrl-number').text(`${timeYear == 0 ? '' : timeYear + ' ' + yearUnit} ${timeMonth == 0 ? '' : timeMonth + ' ' + monthUnit}`)
                }

                updateChart(parseInt($('#chartBalance').val()), parseInt($('#chartTime').val()));
            });

            const homeChartTl = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.sc-home-comp',
                    start: 'top bottom',
                    end: `top+=20% top`,
                    scrub: true,
                }
            });
            homeChartTl.fromTo('.home-benef-coin-wrap.mod-lg', {y: -4 * unit, ease: 'none'}, {y: 12 * unit})
            .fromTo('.home-benef-coin-wrap.mod-sm', {y: -3 * unit, ease: 'none'}, {y: 3 * unit}, '0')
        };
        homeChartHandle();
        function getHomeTesti() {
            getAllDataByType('testi').then((res) => {
                if (res) {
                    let allTesti = sortAsc(res, true, 'order')
                    let template;
                    if ($(window).width() > 991) {
                        template = $('.home-testi-col-inner.mod-left').find('.home-testi-item-wrap').eq(0).clone();
                    } else {
                        template = $('.swiper-wrapper.home-testi-col-inner').find('.swiper-slide.home-testi-item-wrap').eq(0).clone();
                    }
                    $('.home-testi-col-inner.mod-left').html('')
                    $('.home-testi-col-inner.mod-right').html('')
                    $('.swiper-wrapper.home-testi-col-inner').html('')
                    allTesti.forEach((i) => {
                        if ($(window).width() > 991) {
                            createTestiHTML(template, i).appendTo($('.home-testi-col-inner.mod-left'))
                            createTestiHTML(template, i).appendTo($('.home-testi-col-inner.mod-right'))
                        } else {
                            createTestiHTML(template, i).appendTo($('.swiper-wrapper.home-testi-col-inner'))
                        }
                    })
                    homeTestiHanlde();
                }
            });
        }
        getHomeTesti();
        function homeTestiHanlde() {
            // Update rate
            $('.home-testi-item').each(function(e) {
                let rate = Number($(this).find('.data-rate').text());
                let stars = $(this).find('.ic-star');
                for (let x = 0; x < rate; x++) {
                    stars.eq(x).addClass('rate-true')
                }
                let store = $(this).find('.data-store').text();
                if (store == 'Google') {
                    $(this).find('.home-testi-item-rate').addClass('mod-gg')
                } else if (store == 'Apple Store') {
                    $(this).find('.home-testi-item-rate').addClass('mod-apple')
                } else {
                    $(this).find('.home-testi-item-rate').addClass('mod-trust')
                }
            })

            // Animation
            if ($(window).width() > 991) {
                let offsetVal = (($(window).height() - $('.sc-home-testi').height()) / 2) - 1;
                let distanceVal;
                if ($('.home-testi-col-inner.mod-right').height() >= $('.home-testi-col-inner.mod-left').height()) {
                    distanceVal = $('.home-testi-col-inner.mod-right').height() - $('.home-testi-bg-wrap.background').height();
                } else {
                    distanceVal = $('.home-testi-col-inner.mod-left').height() - $('.home-testi-bg-wrap.background').height();
                }

                $('.wrapper').css('overflow', 'visible');
                gsap.set('.sc-home-testi', {top: offsetVal})
                gsap.set('.sc-home-testi-wrap', {height: $('.home-testi-col-inner.mod-right').height() + $('.sc-home-testi').height()})
                // Extra scub video
                let homeTestiVid = document.querySelector('.mod-home-testi video')
                const homeTestiTl = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.sc-home-testi-wrap',
                        start: `-=${$('.sc-home-testi').height() / 2} top`,
                        end: `bottom+=${$('.sc-home-testi').height()} bottom`,
                        scrub: 1,
                        onEnter() {
                            homeTestiVid.play()
                        }
                    }
                });
                homeTestiTl.to('.home-testi-bar-inner', {scaleX: 1, ease: 'none'})
                .fromTo('.home-testi-col-inner.mod-left', {yPercent: 0, ease: 'none'}, {y: -distanceVal, ease: 'none'},'0')
                .fromTo('.home-testi-col-inner.mod-right', {yPercent: 0, ease: 'none'}, {y: distanceVal, ease: 'none'},'0')
            } else {
                const homeTestiSwiperMb = new Swiper('.swiper.home-testi-col-wrapper', {
                    slidesPerView: 1,
                    spaceBetween: 1.6 * unit,
                    breakpoints: {
                        767: {
                            slidesPerView: 2,
                        }
                    }
                })

                let homeTestiVid = document.querySelector('.mod-home-testi video')
                const homeTestiTl = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.sc-home-testi-wrap',
                        start: `top top+=25%`,
                        end: `bottom+=${$('.sc-home-testi').height()} bottom`,
                        onEnter() {
                            homeTestiVid.play()
                        }
                    }
                });
            }
        };

        function homeClimateHandle() {
            ScrollTrigger.create({
                trigger: '.sc-home-climate',
                start: 'top bottom',
                once: true,
                onEnter: () => {
                    let odoSpeed = 3000;
                    let startValue = "1" + "000000" + "1";
                    let endValue = "1" + "451700" + "1";
                    let odometer = new Odometer({
                        el: $('.odometer').get(0),
                        value: startValue,
                        format: '(,ddd).ddd',
                        duration: odoSpeed,
                    })
                    odometer.render(startValue);

                    let vid = document.querySelector('.vid-home-climate');
                    const homeClimateTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: '.sc-home-climate',
                            start: `-=${10 * unit} top`,
                            //markers: true,
                            onEnter: () => {
                                odometer.update(endValue);
                            },
                            onLeaveBack: self => self.disable()
                        }
                    });

                    if ($(window).width() > 991) {
                        console.log(vid.currentTime)
                        vid.currentTime = 0;
                    }

                    const homeClimateVideoTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: '.home-climate-vid-inner',
                            start: `top top+=45%`,
                            onEnter: () => {
                                vid.currentTime = 0;
                                vid.play();
                            },
                            onEnterBack: () => {
                                vid.currentTime = 0.;
                                vid.play();
                            }
                        }
                    });
                }
            })
        };
        homeClimateHandle();
        function homeClimateTl() {
            let vid = document.querySelector('.vid-home-climate');
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.sc-home-climate',
                    start: "top top",
                    end: "bottom+=100% top",
                    //start: `-=${$('.sc-home-climate').height() / 2} top`,
                    //end: `bottom+=${$('.sc-home-climate').height()} bottom`,
                    //markers: true,
                    //scrub: 1,
                    //pin: true
                }
            })
            tl.fromTo(vid, {currentTime: 3.2}, {currentTime: vid.duration, duration: 4.3})
        }
        //homeClimateTl();
        function homeQrMove() {
            $('.home-climate-btn-outer').css('pointer-events','none')
            $('.home-climate-btn-wave-2').css('pointer-events', 'auto')
            $(window).on('mousemove', function(e) {
                e.preventDefault();
                let elRect = $('.home-climate-btn-wave-2').get(0).getBoundingClientRect();
                gsap.set('.home-climate-btn-wave-2', {
                    x: (mousePosRaw.x - elRect.left - elRect.width / 2) / 30,
                    y: (mousePosRaw.y - elRect.top - elRect.height / 2) / 30
                })

            })
        }
        // homeQrMove()
        function homeCardHandle() {
            let isPlayed = false;
            //gsap.set('#homeCardVidHead', {scaleX: 0, scaleY: 0, transformOrigin: '50% 63%'})
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.sc-home-card',
                    start: 'top top',
                    onEnter() {
                        if (isPlayed) return;
                        isPlayed = true
                        //gsap.to('#homeCardVidHead', {scaleX: 1, scaleY: 1, duration: 1.4, ease: Power1.inOut})
                        setTimeout(() => {
                            $('#homeCardVidHead').get(0).play()
                            $('#homeCardVidHead').get(0).addEventListener('ended',() => {
                                console.log('ended')
                                $('#homeCardVidHead').addClass('hidden')
                                $('#homeCardVidTail').get(0).play()
                                $('#homeCardVidTail').removeClass('hidden')
                            }, false);
                        }, 1400);
                    }
                }
            })

        }
        homeCardHandle();
        function homeGetFaq() {
            getAllDataByType('faq').then((res) => {
                if (res) {
                    let allFaq = sortAsc(res, true, 'order_home')
                    $('.home-faq-main').html('')
                    allFaq.forEach((i) => {
                        if (i.data.on_home && !i.data.launch_site_only) {
                            createFaq(i, true).appendTo($('.home-faq-main'))
                        }
                    })
                    updateInterestRate('.home-faq-main');
                    animateFaq();
                }
            });
        }
        homeGetFaq();
    }
    SCRIPT.howItWorksScript = () => {
        if ($(window).width() < 767) {
            const howWorkSwiper = new Swiper('.how-work-main-wrap', {
                slidesPerView: 1,
                spaceBetween: 4 * unit,
                scrollbar: {
                    el: '.how-work-progress-bar'
                }
            });
        }
        function homeGetFaq() {
            getAllDataByType('faq').then((res) => {
                if (res) {
                    let allFaq = sortAsc(res, true, 'order_how_it_work')
                    $('.home-faq-main').html('')
                    allFaq.forEach((i) => {
                        if (i.data.on_how_it_work && !i.data.launch_site_only) {
                            createFaq(i, true).appendTo($('.home-faq-main'))
                        }
                    })
                    updateInterestRate('.home-faq-main');
                    animateFaq();
                }
            });
        }
        homeGetFaq();

        function howTriggerIconAnim() {
            let howHigherReturnVid
            if ($(window).width() > 768) {
                howHigherReturnVid = $('.how-do-img-wrap.hidden-mb video').get(0);
            } else {
                howHigherReturnVid = $('.how-do-img-wrap.hidden-dk video').get(0);
            }
            const howHigherReturnTrigger = new ScrollTrigger({
                trigger: $(window).width() > 768 ? '.how-do-content' : '.how-do-img-wrap.hidden-dk .how-do-vid',
                start: 'center top+=68%',
                onEnter() {
                    howHigherReturnVid.play();
                }
            })

            const iconWeInvestVid = $('.how-make-item-img-wrap .mod-we-invest video').get(0);
            const iconWeInvestTrigger = new ScrollTrigger({
                trigger: '.how-make-item-img-wrap .mod-we-invest',
                start: 'center center',
                onEnter() {
                    iconWeInvestVid.play();
                }
            })

            const iconShortDurVid = $('.how-make-item-img-wrap .mod-short-dur video').get(0);
            const iconShortDurTrigger = new ScrollTrigger({
                trigger: '.how-make-item-img-wrap .mod-short-dur',
                start: 'center center',
                onEnter() {
                    iconShortDurVid.play();
                }
            })

            const iconWePutVid = $('.how-make-item-img-wrap .mod-we-put video').get(0);
            const iconWePutTrigger = new ScrollTrigger({
                trigger: '.how-make-item-img-wrap .mod-we-put',
                start: 'center center',
                onEnter() {
                    iconWePutVid.play();
                }
            })
        }
        howTriggerIconAnim()
    }
    SCRIPT.whyUsScript = () => {
        function aboutClimateHanlde() {
            const aboutClimateTl = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.sc-abt-climate',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                }
            });
            aboutClimateTl
            .fromTo('.abt-climate-img-inner', {x: -20 * unit, y: 2.5 * unit}, {x: 20 * unit, y: -2.5 * unit, ease: 'none'})

            if ($(window).width() < 991) {
                const aboutClimateSwiper = new Swiper('.swiper.abt-climate-swiper', {
                    slidesPerView: 1,
                    spaceBetween: 2.8 * unit,
                    breakpoints: {
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 4 * unit,
                        }
                    }

                })
            }
        }
        //aboutClimateHanlde();
        function aboutGetFaq() {
            getAllDataByType('faq').then((res) => {
                if (res) {
                    let allFaq = sortAsc(res, true, 'order_about')
                    $('.home-faq-main').html('')
                    allFaq.forEach((i) => {
                        if (i.data.on_about_us && !i.data.launch_site_only) {
                            createFaq(i, true).appendTo($('.home-faq-main'))
                        }
                    })
                    updateInterestRate('.home-faq-main');
                    animateFaq();
                }
            });
        }
        aboutGetFaq();

        function aboutTeamHandle() {
            const aboutTeamSwiper = new Swiper('.swiper.abt-team-cms', {
                slidesPerView: 1,
                spaceBetween: 2.8 * unit,
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 4 * unit,
                    },
                    991: {
                        slidesPerView: 3,
                        spaceBetween: 4 * unit,
                    },
                }

            })
        }
        aboutTeamHandle()
    }
    SCRIPT.blogScript = async () => {
        const getApi = [getAllDataByType('category'), getAllDataByType('blog')];
        let idParam = window.location.hash

        Promise.all(getApi).then(([categories, blogs]) => {
            //Remove placeholders
            let subNavItemHtml = $('.blog-header-cates').find('.blog-header-link-txt').eq(0).clone();
            $('.blog-header-cates').html('')
            $('[data-layout]').remove()

            let allCate = categories.sort((cate1, cate2) => cate1.data.order - cate2.data.order);
            let allBlog = blogs;

            let heroBlogs = allBlog.filter(blog => blog.data.isfeatured == true).slice(0,4);
            LAYOUT_FUNCS['layoutFunc_Hero'](heroBlogs)

            allCate.forEach(cateEl => {
                let cateName = cateEl.data.name;
                let cateLayout = cateEl.data.layout_type;
                let cateBlogs = allBlog.filter(blog => blog.data.category.uid == cateEl.uid);
                let cateOrder = cateEl.data.order;
                updateSubNav(cateName,subNavItemHtml);
                updateSection(cateName, cateOrder, cateLayout, cateBlogs);
            });

            if(idParam && $(idParam).length) {
                lenis.scrollTo(idParam)
            }
        })

        function updateSubNav(cateName, subNavItemHtml) {
            let html = subNavItemHtml.clone();
            html.text(cateName)
            html.attr('href', `#${cateName.replaceAll(' ','')}`)
            $('.blog-header-cates').append(html)
            $('.blog-header-link-txt').removeClass('w--current')
        }

        function updateSection(cateName, cateOrder, cateLayout, cateBlogs) {
            let sectionHtml = LAYOUTS[`layoutTemplate_${cateLayout}`].clone();
            let cateId = cateName.replaceAll(' ', '')
            sectionHtml.attr('id', cateId)

            if (cateOrder <= 3) {
                sectionHtml.insertBefore($('.sc-blog-cta-wrap'))
            } else if (cateOrder == 4) {
                sectionHtml.insertAfter($('.sc-blog-cta-wrap'))
            } else {
                sectionHtml.appendTo('.sc-blog-wrap')
            }
            LAYOUT_FUNCS[`layoutFunc_${cateLayout}`](cateBlogs, sectionHtml);
        }

        const LAYOUTS = {
            layoutTemplate_1: $('[data-layout=1]').eq(0).clone(),
            layoutTemplate_2: $('[data-layout=2]').eq(0).clone(),
            layoutTemplate_3: $('[data-layout=3]').eq(0).clone(),
            layoutTemplate_4: $('[data-layout=4]').eq(0).clone(),
        };

        const LAYOUT_FUNCS = {};
        LAYOUT_FUNCS.layoutFunc_Hero = (blogs) => {
            const heroThumbTemplate = $('.swiper-slide.blog-hero-item').eq(0).clone();
            const heroPagiTemplate = $('.blog-nav-item').eq(0).clone();
            $('.swiper-wrapper.blog-hero-wrapper').html('');
            $('.blog-hero-nav-inner').html('');
            blogs.forEach((i) => {
                let heroThumbHtml = createHtml(heroThumbTemplate, i);
                $('.swiper-wrapper.blog-hero-wrapper').append(heroThumbHtml)
                let heroPagiHtml = createHtml(heroPagiTemplate, i);
                $('.blog-hero-nav-inner').append(heroPagiHtml)
            })
            blogHeroInteraction();
        }
        LAYOUT_FUNCS.layoutFunc_1 = (blogs, sectionWrapper) => {
            sectionWrapper.find('[data-blog="cate-name"]').text(toTitle(blogs[0].data.category.uid))
            sectionWrapper.find('[data-blog="more"]').attr('href', `/blog-category/${blogs[0].data.category.uid}`)
            let finFeaTemplate;
            if ($(window).width() > 991) {
                finFeaTemplate = sectionWrapper.find('.hidden-tb .blog-fin-fea-inner').eq(0).clone();
            } else {
                finFeaTemplate = sectionWrapper.find('.hidden-dk .blog-fin-fea-inner').eq(0).clone();
            }
            const finListTemplate = sectionWrapper.find('.blog-fin-item').eq(0).clone();
            sectionWrapper.find('.blog-fin-fea').html('');
            sectionWrapper.find('.blog-fin-list').html('');
            blogs.forEach((i, index) => {
                if (index == 0) {
                    let finFeaHtml = createHtml(finFeaTemplate, i);
                    sectionWrapper.find('.blog-fin-fea').append(finFeaHtml)
                } else if (index <= 3) {
                    let finListHtml = createHtml(finListTemplate, i);
                    sectionWrapper.find('.blog-fin-list').append(finListHtml)
                }
            })
            financialSwiperInteraction(sectionWrapper)
        }
        LAYOUT_FUNCS.layoutFunc_2 = (blogs, sectionWrapper) => {
            sectionWrapper.find('[data-blog="cate-name"]').text(toTitle(blogs[0].data.category.uid))
            sectionWrapper.find('[data-blog="more"]').attr('href', `/blog-category/${blogs[0].data.category.uid}`)
            const ecoListTemplate = sectionWrapper.find('.blog-eco-item').eq(0).clone();
            sectionWrapper.find('.blog-eco-list').html('');
            blogs.forEach((i, index) => {
                if (index <= 3) {
                    let ecoListHtml = createHtml(ecoListTemplate, i);
                    sectionWrapper.find('.blog-eco-list').append(ecoListHtml)
                }
            })
            ecoSwiperInteraction(sectionWrapper)
        }
        LAYOUT_FUNCS.layoutFunc_3 = (blogs, sectionWrapper) => {
            sectionWrapper.find('[data-blog="cate-name"]').text(toTitle(blogs[0].data.category.uid))
            sectionWrapper.find('[data-blog="more"]').attr('href', `/blog-category/${blogs[0].data.category.uid}`)
            const investFeaTemplate = sectionWrapper.find('.blog-invest-fea-inner').eq(0).clone();
            const investListTemplate = sectionWrapper.find('.blog-invest-item').eq(0).clone();
            sectionWrapper.find('.blog-invest-fea').html('');
            sectionWrapper.find('.blog-invest-list').html('');
            blogs.forEach((e, i) => {
                if (i == 0) {
                    let investFeaHtml = createHtml(investFeaTemplate, e);
                    sectionWrapper.find('.blog-invest-fea').append(investFeaHtml);
                } else if (i <= 3) {
                    let investListHtml = createHtml(investListTemplate, e);
                    sectionWrapper.find('.blog-invest-list').append(investListHtml);
                }
            })
            investSwiperInteraction(sectionWrapper)
        }
        LAYOUT_FUNCS.layoutFunc_4 = (blogs, sectionWrapper) => {
            sectionWrapper.find('[data-blog="cate-name"]').text(toTitle(blogs[0].data.category.uid))
            sectionWrapper.find('[data-blog="more"]').attr('href', `/blog-category/${blogs[0].data.category.uid}`)
            const savListTemplate = sectionWrapper.find('.swiper-slide').eq(0).clone();
            sectionWrapper.find('.blog-sav-list-wrap').html('');
            blogs.forEach((i, index) => {
                if (index <= 5) {
                    let savListHtml = createHtml(savListTemplate, i);
                    sectionWrapper.find('.blog-sav-list-wrap').append(savListHtml)
                }
            })
            savingSwiperInteraction(sectionWrapper);
        }

        function blogHeroInteraction() {
            if ($(window).width() > 991) {
                let blogNavItem = $('.blog-nav-item');
                let blogHeroSwiper = new Swiper('.blog-hero-cms', {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    effect: 'fade',
                    fadeEffect: {
                        crossFade: true
                    },
                    allowTouchMove: false,
                    autoplay: {
                        delay: 4000,
                        disableOnInteraction: false,
                    }
                })
                blogHeroSwiper.on('realIndexChange', function(e) {
                    let index = e.activeIndex;
                    playAnim(index)
                })
                $('.hero-nxpv-zone').on('click', function(e) {
                    e.preventDefault();
                    if ($(this).hasClass('nxpv-prev')) {
                        blogHeroSwiper.slidePrev()
                    } else if ($(this).hasClass('nxpv-next')) {
                        blogHeroSwiper.slideNext()
                    }
                })
                function playAnim(index) {
                    if (index == 0) {
                        $('.nxpv-prev').addClass('nxpv-disable')
                        $('.nxpv-next').removeClass('nxpv-disable')
                    } else if (index == blogHeroSwiper.slides.length - 1) {
                        $('.nxpv-next').addClass('nxpv-disable')
                        $('.nxpv-prev').removeClass('nxpv-disable')
                    } else {
                        $('.hero-nxpv-zone').removeClass('nxpv-disable')
                    }
                    blogNavItem.removeClass('active');
                    blogNavItem.eq(index).addClass('active');
                    let el = blogNavItem.eq(index).find('.blog-nav-item-line-inner');
                    if ($(window).width() > 991) {
                        let tl = gsap.timeline({});
                        tl.set(el, {scaleX: 0, overwrite: true})
                        .to(el, {scaleX: 1, ease: Power1.easeOut, duration: 4})
                    } else {
                        gsap.set(el, {scaleX: 1})
                    }
                }
                blogNavItem.on('mouseenter', function(e) {
                    e.preventDefault();
                    blogHeroSwiper.slideTo($(this).index())
                })
                playAnim(0)
            } else {
                $('.blog-nav-item').removeClass('active')
                let blogHeroSwiper = new Swiper('.blog-hero-cms', {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    effect: 'fade',
                    fadeEffect: {
                        crossFade: true
                    },
                })
                let blogNavSwiper = new Swiper('.blog-hero-nav', {
                    slidesPerView: 1.2,
                    spaceBetween: 0,
                    breakpoints: {
                        767: {
                            slidesPerView: 1.4
                        },
                        991: {
                            slidesPerView: 1.6
                        }
                    }
                })
                blogHeroSwiper.on('realIndexChange', function(e) {
                    let index = e.activeIndex;
                    blogNavSwiper.slideTo(index)
                })
                blogNavSwiper.on('realIndexChange', function(e) {
                    let index = e.activeIndex;
                    blogHeroSwiper.slideTo(index)
                })
            }

        }
        function financialSwiperInteraction(sectionWrapper) {
            if ($(window).width() < 991) {
                const financialSwiper = new Swiper(sectionWrapper.find('.blog-fin-list-wrap').get(0),{
                    slidesPerView: 1,
                    spaceBetween: 2.4 * unit,
                    breakpoints: {
                        768: {
                            spaceBetween: 3.2 * unit,
                        }
                    }
                })
            }
        }
        function ecoSwiperInteraction(sectionWrapper) {
            if ($(window).width() < 991) {
                const ecoSwiper = new Swiper(sectionWrapper.find('.blog-eco-list-wrap').get(0),{
                    slidesPerView: 1,
                    spaceBetween: 2.4 * unit,
                    breakpoints: {
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 3.2 * unit,
                        }
                    }
                })
            }
        }
        function investSwiperInteraction(sectionWrapper) {
            if ($(window).width() < 991) {
                const investSwiper = new Swiper(sectionWrapper.find('.blog-invest-list-wrap').get(0),{
                    slidesPerView: 1,
                    spaceBetween: 2.4 * unit,
                    breakpoints: {
                        768: {
                            spaceBetween: 3.2 * unit,
                        }
                    }
                })
            }
        }
        function savingSwiperInteraction(sectionWrapper) {
            let proBar;
            if ($(window).width() > 991) {
                proBar = sectionWrapper.find('.blog-sav-progress.mod-dk').get(0)
            } else {
                proBar = sectionWrapper.find('.blog-sav-progress.mod-tb').get(0)
            }
            const blogSavSwiper = new Swiper(sectionWrapper.find('.blog-sav-list').get(0), {
                slidesPerView: 1,
                spaceBetween: 2.4 * unit,
                grabCursor: true,
                scrollbar: {
                    el: proBar,
                },
                breakpoints: {
                    767: {
                        slidesPerView: 2,
                        spaceBetween: 3.2 * unit,
                    },
                    991: {
                        slidesPerView: 3,
                        spaceBetween: 3.2 * unit,
                    }
                }
            })
        }
    }
    SCRIPT.blogCatScript = () => {
        // Get template
        const heroThumbTemplate = $('.swiper-slide.blog-hero-item').eq(0).clone();
        const heroPagiTemplate = $('.blog-nav-item').eq(0).clone();
        const cateListTemplate = $('.sc-blogcat-list .blog-eco-item').eq(0).clone();

        function getCateId() {
            let param = window.location.search;
            if (param) {
                let uid = param.replace('?id=', '')
                getDetail('category',uid).then((res) => {
                    if (res) {
                        let id = res.id;
                        getAllBlogsByCategory(id).then((res) => {
                            if (res) {
                                updateContent(res, id)
                            } else {
                                handle404()
                            }
                        });
                    } else {
                        handle404()
                    }
                })
            } else {
                backToBlog();
            }
        }
        getCateId();

        function updateContent(blogs, id) {
            let cateName = blogs[0].data.category.uid;
            // Update Url;
            updateUrl(cateName,'blog-category');
            //Title
            let cateTitle = toTitle(blogs[0].data.category.slug)
            $('[data-blog-category="title"]').text(cateTitle)
            //Blog Populate
            cateFeaSection(blogs)
            cateListSection(blogs)
            cateListInteraction(id)
            //cateListSort(id)
        }
        function cateFeaSection(blogs) {
            $('.swiper-wrapper.blog-hero-wrapper').html('');
            $('.blog-hero-nav-inner').html('');
            let featuredBlogs = blogs.filter(blog => blog.data.isfeaturedincategory == true)
            featuredBlogs.forEach((e, i) => {
                if (i <= 2) {
                    let heroThumbHtml = createHtml(heroThumbTemplate, e);
                    $('.swiper-wrapper.blog-hero-wrapper').append(heroThumbHtml)
                    let heroPagiHtml = createHtml(heroPagiTemplate, e);
                    $('.blog-hero-nav-inner').append(heroPagiHtml)
                }
            })
            cateFeaInteraction();
        }
        function cateFeaInteraction() {
            if ($(window).width() > 991) {
                let blogNavItem = $('.blog-nav-item');
                let blogHeroSwiper = new Swiper('.blog-hero-cms', {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    effect: 'fade',
                    fadeEffect: {
                        crossFade: true
                    },
                    allowTouchMove: false,
                    autoplay: {
                        delay: 4000,
                        disableOnInteraction: false,
                    }
                })
                blogHeroSwiper.on('realIndexChange', function(e) {
                    let index = e.activeIndex;
                    playAnim(index)
                })
                $('.hero-nxpv-zone').on('click', function(e) {
                    e.preventDefault();
                    if ($(this).hasClass('nxpv-prev')) {
                        blogHeroSwiper.slidePrev()
                    } else if ($(this).hasClass('nxpv-next')) {
                        blogHeroSwiper.slideNext()
                    }
                })
                function playAnim(index) {
                    if (index == 0) {
                        $('.nxpv-prev').addClass('nxpv-disable')
                        $('.nxpv-next').removeClass('nxpv-disable')
                    } else if (index == blogHeroSwiper.slides.length - 1) {
                        $('.nxpv-next').addClass('nxpv-disable')
                        $('.nxpv-prev').removeClass('nxpv-disable')
                    } else {
                        $('.hero-nxpv-zone').removeClass('nxpv-disable')
                    }
                    blogNavItem.removeClass('active');
                    blogNavItem.eq(index).addClass('active');
                    let el = blogNavItem.eq(index).find('.blog-nav-item-line-inner');
                    if ($(window).width() > 991) {
                        let tl = gsap.timeline({});
                        tl.set(el, {scaleX: 0, overwrite: true})
                        .to(el, {scaleX: 1, ease: Power1.easeOut, duration: 4})
                    } else {
                        gsap.set(el, {scaleX: 1})
                    }
                }
                blogNavItem.on('mouseenter', function(e) {
                    e.preventDefault();
                    blogHeroSwiper.slideTo($(this).index())
                })
                playAnim(0)
            } else {
                $('.blog-nav-item').removeClass('active')
                let blogHeroSwiper = new Swiper('.blog-hero-cms', {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    effect: 'fade',
                    fadeEffect: {
                        crossFade: true
                    },
                })
                let blogNavSwiper = new Swiper('.blog-hero-nav', {
                    slidesPerView: 1.2,
                    spaceBetween: 0,
                    breakpoints: {
                        767: {
                            slidesPerView: 1.4
                        },
                        991: {
                            slidesPerView: 1.6
                        }
                    }
                })
                blogHeroSwiper.on('realIndexChange', function(e) {
                    let index = e.activeIndex;
                    blogNavSwiper.slideTo(index)
                })
                blogNavSwiper.on('realIndexChange', function(e) {
                    let index = e.activeIndex;
                    blogHeroSwiper.slideTo(index)
                })
            }

        }
        function cateListSection(blogs) {
            let cateLimit = 6;
            $('.sc-blogcat-list .blog-eco-list').html('');
            blogs.forEach((e, i) => {
                if (i <= cateLimit - 1) {
                    let cateListHtml = createHtml(cateListTemplate, e);
                    $('.sc-blogcat-list.mod-top .blog-eco-list').append(cateListHtml);
                } else {
                    let cateListHtml = createHtml(cateListTemplate, e);
                    $('.sc-blogcat-list.mod-extend .blog-eco-list').append(cateListHtml);
                }
            })
            if (blogs.length <= cateLimit - 1) {
                $('.sc-blogcat-list.mod-extend').hide();
            } else {
                $('.sc-blogcat-list.mod-extend').show();
            }
            //Hide for now
            $('.blogcat-list-load').addClass('hidden').slideUp()
        }
        function cateListInteraction(id) {
            // Dropdown interaction
            $('.blogcat-act-trigger').on('click', function(e) {
                e.preventDefault();
                if ($(this).hasClass('open')) {
                    $(this).parent('.blogcat-act-item').find('.blogcat-act-drop').removeClass('open');
                    $(this).removeClass('open')
                } else {
                    $(this).parent('.blogcat-act-item').find('.blogcat-act-drop').addClass('open');
                    $(this).addClass('open')
                }
            })

            // Filter/Sort
            $('.blogcat-act-item .txt-14.blogcat-act-drop-txt').on('click', function(e) {
                e.preventDefault()
                $('.blogcat-act-trigger, .blogcat-act-drop').removeClass('open');

                if (!$(this).hasClass('active')) {
                    $(this).closest('.blogcat-act-item').find('.blogcat-sort-txt').text($(this).text())
                    $('[act-type="sort"] .blogcat-act-drop-txt').removeClass('active')
                    $(this).addClass('active')

                    let sortType = $('[act-type="sort"] .blogcat-act-drop-txt.active').attr('data-sort');

                    getAllBlogsByCategory(id, sortType).then((res) => {
                        if (res) {
                            cateListSection(res)
                        } else {
                        }
                    })
                }
            })

        }
    }
    SCRIPT.blogAuthScript = () => {
        //Get template
        const itemTemp = $('.sc-blogauth-list .blog-auth-item').eq(0).clone();

        function blogAuthSetup() {
            function heroImageSetup() {
                let offsetRight = ($(window).width() - $('.container').width()) / 2;
                $('.blogauth-hero-img-wrap').css('margin-right', `${-offsetRight}px`)
            }
            heroImageSetup()
            $(window).on('resize', () => {
                heroImageSetup()
            })
        }
        if ($(window).width() > 991) {
            blogAuthSetup()
        }
        function getAuthorId() {
            let param = window.location.search;
            if (param) {
                let uid = param.replace('?id=', '')
                getDetail('author', uid).then((res) => {
                    if (res) {
                        let id = res.id;
                        getAllBlogsByAuthor(id).then((res) => {
                            if (res) {
                                updateContent(res, id)
                            } else {
                                handle404()
                            }
                        })
                    } else {
                        handle404()
                    }
                })
            } else {
                backToBlog();
            }
        }
        getAuthorId();
        function updateContent(blogs, id) {
            // Author
            let authorName = blogs[0].data.author.uid
            getDetail('author',authorName).then((res) => {
                $('[data-author="name"]').text(res.data.name);
                $('[data-author="img"]').attr('src',res.data.image.url);
                $('[data-author="summary"]').text(res.data.summary);
                $('[data-author="desc"]').text(res.data.description);
            })

            updateUrl(authorName, 'blog-author')
            //Blog Populate
            authListSection(blogs)
            authListInteraction(id, blogs)
        }
        function authListInteraction(id, blogs) {
            //Setup category
            let cateNameList = [];
            let cateIdList = [];
            blogs.forEach((i) => {
                cateNameList.push(i.data.category.slug)
                cateIdList.push(i.data.category.id)
            })
            let uniqueCateNameList = uniqueArr(cateNameList)
            let uniqueCateIdList = uniqueArr(cateIdList)

            $('.blogcat-act-item[act-type="filter"] .blogcat-act-drop-txt.active').attr('data-filter','*')
            let cateDropItem = $('.blogcat-act-drop-txt').eq(1).clone();
            $('.blogcat-act-drop-txt').eq(1).remove();

            uniqueCateNameList.forEach((e, i) => {
                let html = cateDropItem.clone().text(toTitle(e)).attr('data-filter',uniqueCateIdList[i])
                $('.blogcat-act-trigger[data-filter]').parent('.blogcat-act-item').find('.blogcat-act-drop').append(html)
            })

            // Dropdown interaction
            $('.blogcat-act-trigger').on('click', function(e) {
                e.preventDefault();
                if ($(this).hasClass('open')) {
                    $(this).parent('.blogcat-act-item').find('.blogcat-act-drop').removeClass('open');
                    $(this).removeClass('open')
                } else {
                    $('.blogcat-act-drop.open').removeClass('open')
                    $('.blogcat-act-trigger.open').removeClass('open');
                    $(this).parent('.blogcat-act-item').find('.blogcat-act-drop').addClass('open');
                    $(this).addClass('open')
                }
            })

            // Filter/Sort
            $('.blogcat-act-item .txt-14.blogcat-act-drop-txt').on('click', function(e) {
                e.preventDefault()
                let actType = $(this).closest('.blogcat-act-item').attr('act-type')

                if (actType == 'filter') {
                    //filter
                    $('[act-type="filter"] .blogcat-act-drop-txt').removeClass('active')
                } else if (actType == 'sort') {
                    // sort
                    $('[act-type="sort"] .blogcat-act-drop-txt').removeClass('active')
                }
                $(this).closest('.blogcat-act-item').find('.blogcat-sort-txt').text($(this).text())
                $(this).addClass('active')
                $('.blogcat-act-trigger, .blogcat-act-drop').removeClass('open');

                let cateId = $('[act-type="filter"] .blogcat-act-drop-txt.active').attr('data-filter');
                let sortType = $('[act-type="sort"] .blogcat-act-drop-txt.active').attr('data-sort');


                if (cateId == '*') {
                    getAllBlogsByAuthor(id, sortType).then((res) => {
                        if (res) {
                            authListSection(res)
                        } else {
                        }
                    })
                } else {
                    getAllBlogsByAuthorByCategory(id, sortType, cateId).then((res) => {
                        if (res) {
                            authListSection(res)
                        } else {
                        }
                    })
                }
            })
        }
        function authListSection(blogs) {
            let authLimit = 2;
            const authorListTemplate = itemTemp;
            $('.sc-blogauth-list .blogauth-list').html('');
            blogs.forEach((i, index) => {
                if (index <= authLimit - 1) {
                    let authorListHtml = createHtml(authorListTemplate, i);
                    $('.sc-blogauth-list.mod-top .blogauth-list').append(authorListHtml)
                } else {
                    let authorListHtml = createHtml(authorListTemplate, i);
                    $('.sc-blogauth-list.mod-extend .blogauth-list').append(authorListHtml)
                }
            })
            if (blogs.length <= authLimit - 1) {
                $('.sc-blogauth-list.mod-extend').hide();
            } else {
                $('.sc-blogauth-list.mod-extend').show();
            }
            //Hide for now
            $('.blogcat-list-load').addClass('active').slideUp()
        }

    }
    SCRIPT.articleScript = () => {
        // Get article's id
        function getBlogId() {
            let param = window.location.search;
            if (param) {
                let id = param.replace('?id=', '')
                getDetail('blog',`${id}`).then((res) => {
                    if (res) {
                        updateContent(res)
                    } else {
                        handle404();
                    }
                });
            } else {
                backToBlog();
            }
        }
        getBlogId();
        function updateContent(res) {
            updateUrl(res.uid,'article');

            updateRelBlog(res);

            const template = $('.article-page');
            const quoteTemplate = template.find('[data-quote="wrap"]')
            const leadindTemplate = template.find('[data-blog="leading"]')
            const mbSharing = template.find('[data-blog="sharing"]')
            let blog = res;
            let html = toHTML(blog.data.content)
            $('.sc-art-main .container .art-layout-main').html('')
            $('.sc-art-main .container .art-layout-main').prepend(html)
            let outputHtml = $('.sc-art-main .container .art-layout-main');

            updateAttr(template, blog)
            updateLeading(leadindTemplate, blog);
            updateUlLi('.art-layout-main');
            updateQuote(quoteTemplate);
            updateCustomLayout(outputHtml);
            updateInterestRate('.art-layout-main')
            updateSharingMobile(mbSharing)
            socialShare();
        }
        function updateRelBlog(blog) {
            let cateId = blog.data.category.id;
            getAllBlogsByCategory(cateId, pageSize=4).then((res) => {
                const relListTemplate = $('.sc-art-rel .blog-eco-item').eq(0).clone();
                $('.sc-art-rel .blog-eco-list').html('');
                res.forEach((i) => {
                    let relListHtml = createHtml(relListTemplate, i);
                    $('.sc-art-rel .blog-eco-list').append(relListHtml);
                })
            })
        }
        function toHTML(richTextArray) {
            let html = '';
            let isLabeled;
            for (const block of richTextArray) {
                switch (block.type) {
                case 'paragraph':
                        let string = block.text;
                        for (const span of block.spans) {
                            switch (span.type) {
                                case 'strong':
                                string = string.replace(block.text.substring(span.start, span.end),`<strong>${block.text.substring(span.start, span.end)}</strong>`);
                                break;
                                case 'em':
                                string = string.replace(block.text.substring(span.start, span.end),`<em>${block.text.substring(span.start, span.end)}</em>`);
                                break;
                                case 'hyperlink':
                                string = string.replace(block.text.substring(span.start, span.end),`<a href="${span.data.url}" class="span-txt-link hover-un">${block.text.substring(span.start, span.end)}</a>`);
                                break;
                                case 'label':
                                    if (span.data.label == 'big-rate' || span.data.label == 'small-rate' || span.data.label == 'limit-amount' || span.data.label == 'limit-date' || span.data.label == 'other-rate') {
                                        let tag;
                                        switch (span.data.label) {
                                            case 'big-rate':
                                            tag = "big"
                                            break;
                                            case 'small-rate':
                                            tag = "small"
                                            break;
                                            case 'other-rate':
                                            tag = "other"
                                            break;
                                            case 'limit-amount':
                                            tag = "amount"
                                            break;
                                            case 'limit-date':
                                            tag = "date"
                                            break;
                                            default:
                                            break;
                                        }
                                        string = string.replace(block.text.substring(span.start, span.end), `<span data-rate=${tag}>${block.text.substring(span.start,span.end)}</span>`)
                                    }
                                break;
                                default:
                                break;
                            }
                        }
                        isLabeled = block.spans.filter(span => span.type == 'label' && span.data.label != 'big-rate' && span.data.label != 'small-rate');
                        html += `<p class="txt-16 art-para-sm-sub" data-label="${isLabeled.length ? isLabeled[0].data.label : ''}">${string}</p>`;
                    break;
                case 'heading2':
                    html += `<h2 class="heading h5 art-para-lg-title">${block.text}</h2>`;
                    break;
                case 'heading3':
                    isLabeled = block.spans.filter(span => span.type == 'label');
                    html += `<h3 class="heading h6 art-para-sm-title" data-label="${isLabeled.length ? isLabeled[0].data.label : ''}">${block.text}</h3>`;
                    break;
                case 'image':
                    html += `<div class="art-img-lg-wrap">
                        <img class="img-basic art-main-img" src="${block.url}" alt="${block.alt}" width="${block.dimensions.width}" height="${block.dimensions.height}"/>
                        </div>`;
                        //${block.alt != null ? `<div class="txt-14 art-img-cap">${block.alt}</div>` : "" }
                    break;
                case 'embed':
                    html += `<div class="art-embed-wrap">${block.oembed.html}</div>`
                    break;
                case 'preformatted':
                    html += `<pre>${block.text}</pre>`;
                    break;
                case 'list-item':
                    let listString = block.text;
                    for (const span of block.spans) {
                        switch (span.type) {
                            case 'strong':
                            listString = listString.replace(block.text.substring(span.start, span.end),`<strong>${block.text.substring(span.start, span.end)}</strong>`);
                            break;
                            case 'em':
                            listString = listString.replace(block.text.substring(span.start, span.end),`<em>${block.text.substring(span.start, span.end)}</em>`);
                            break;
                            case 'hyperlink':
                            listString = listString.replace(block.text.substring(span.start, span.end),`<a href="${span.data.url}" class="span-txt-link hover-un">${block.text.substring(span.start, span.end)}</a>`);
                            break;
                            case 'label':
                            if (span.data.label == 'big-rate' || span.data.label == 'small-rate' || span.data.label == 'limit-amount' || span.data.label == 'limit-date' || span.data.label == 'other-rate') {
                                let tag;
                                switch (span.data.label) {
                                    case 'big-rate':
                                    tag = "big"
                                    break;
                                    case 'small-rate':
                                    tag = "small"
                                    break;
                                    case 'other-rate':
                                    tag = "other"
                                    break;
                                    case 'limit-amount':
                                    tag = "amount"
                                    break;
                                    case 'limit-date':
                                    tag = "date"
                                    break;
                                    default:
                                    break;
                                }
                                listString = listString.replace(block.text.substring(span.start, span.end), `<span data-rate=${tag}>${block.text.substring(span.start,span.end)}</span>`)
                            }
                            break;
                            default:
                            break;
                        }
                    }
                    html += `<li class="txt-16 art-txt-li">${listString}</li>`;
                    break;
                default:
                    console.error(`Unsupported block type: ${block.type}`);
                }
            }
            return html;
        }
        function updateCustomLayout(html) {
            // dual columns
            html.find('[data-label="dual-columns"]').addClass('para-dual-columns');
            // right align
            let allRightPara = html.find('p[data-label="right-align"]');
            sideAlignLayout(allRightPara, 'right')
            // left align
            let allLeftPara = html.find('p[data-label="left-align"]');
            sideAlignLayout(allLeftPara, 'left')
            // multi images
            updateMultiImage(html);
        }
        function updateMultiImage(wrapper) {
            let wrapperEl = $(wrapper);
            const imgWrappers = wrapperEl.find('img').parent(':not(.mod-side-img)')
            imgWrappers.each((i) => {
                let multiImgTemplate = $(`<div class="art-main-multi-img">
                    <div class="swiper art-img-slide-outer">
                        <div class="swiper-wrapper art-img-slide-wrap"></div>
                    </div>
                    <div class="art-slide-pagination"></div>
                        <div class="txt-14 art-img-cap">Title</div>
                </div>`)
                if (imgWrappers.eq(i).prev().get(0) != imgWrappers.eq(i - 1).get(0) && imgWrappers.eq(i).next().get(0) == imgWrappers.eq(i + 1).get(0)) {
                    multiImgTemplate.clone().insertBefore(imgWrappers.eq(i))
                }
            })
            imgWrappers.each((i) => {
                if (imgWrappers.eq(i).prev().hasClass('art-main-multi-img')) {
                    imgWrappers.eq(i).removeClass('art-img-lg-wrap').addClass('swiper-slide art-img-slide-item');
                    imgWrappers.eq(i).find('img').removeClass('art-main-img').addClass('fill');
                    imgWrappers.eq(i).find('.art-img-cap').remove()
                    imgWrappers.eq(i).appendTo(imgWrappers.eq(i).prev().find('.swiper-wrapper'))
                }
            })
            multiImgInteraction();
        }
        function sideAlignLayout(groups, side) {
            groups.each(function(e) {
                let replaceTarget;
                let title = $(this).prev();
                let img = $(this).next();
                if (img.find('img').length) {
                    let template = $(`
                    <div class="art-layout-sm art-para-${side}">
                        <div class="art-para-side-content mod-${side}"></div>
                    </div>`);
                    if (title.prop('tagName') == 'H3') {
                        replaceTarget = title;
                        template.find('.art-para-side-content').append(title.clone());
                        template.find('.art-para-side-content').append($(this));
                    } else {
                        replaceTarget = $(this);
                        template.find('.art-para-side-content').append($(this).clone());
                    }
                    template.append(img.addClass('mod-side-img'))
                    replaceTarget.replaceWith(template)
                }
            })
        }
        function updateLeading(template, blog) {
            let htmlWrap = template.clone();
            let htmlItem = htmlWrap.find('.art-sum-txt').eq(0).clone();
            template.html('')
            for (const block of blog.data.leading_paragraph) {
                let html = htmlItem.clone().text(block.text);
                template.append(html)
            }
        }
        function updateQuote(template) {
            let data = $('.sc-art-main .container .art-layout-main').find('pre')
            data.each((i) => {
                let html = template.clone();
                html.find('[data-quote="content"]').text(data.eq(i).find('content').text())
                html.find('[data-quote="author"]').text(data.eq(i).find('author').text())
                html.find('[data-quote="job"]').text(data.eq(i).find('job').text())
                data.eq(i).replaceWith(html)
            })
        }
        function updateAttr(template, blog) {
            template.find('[data-blog="img"]').attr('src',blog.data.thumbnail.url);
            template.find('[data-blog="link"]').attr('href',`/article/${blog.uid}`)
            template.find('[data-blog-dou="link"]').attr('href',`/article/${blog.uid}`)
            changeText(template.find('[data-blog="category"]'), toTitle(blog.data.category.uid))
            template.find('[data-blog="category"]').attr('href', `/blog-category/${blog.data.category.uid}`)
            changeText(template.find('[data-blog="title"]'), blog.data.title)
            changeText(template.find('[data-blog="author"]'), toTitle(blog.data.author.uid))
            getDetail('author', blog.data.author.uid).then(((res) => {
                template.find('[data-blog="author-img"]').attr('src', res.data.thumbnail.url);
                template.find('[data-blog-dou="author-link"]').attr('href', `/blog-author/${res.uid}`)
            }));
            changeText(template.find('[data-blog="date"]'), toDateFormat(blog.first_publication_date))
            template.find('[data-blog="more"]').attr('href', `/blog-category/${blog.data.category.uid}`)
        }
        function updateUlLi(wrapper) {
            const wrapperEl = $(wrapper);
            const liEls = wrapperEl.find('li');
            liEls.each((i) => {
                let ulTemplate = $('<ul class="art-txt-ul"></ul>')
                if (liEls.eq(i).prev().get(0) != liEls.eq(i - 1).get(0)) {
                    ulTemplate.clone().insertBefore(liEls.eq(i))
                }
            })
            liEls.each((i) => {
                if (liEls.eq(i).prev().prop('tagName') == 'UL') {
                    liEls.eq(i).appendTo(liEls.eq(i).prev())
                }
            })
        }
        function multiImgInteraction() {
            if ($('.art-main-multi-img').length >= 1) {
                let allSwiper = $('.art-main-multi-img').find('.swiper')
                allSwiper.each((i, el) => {
                    let articleSlideSwiper = new Swiper(el, {
                        slidesPerView: 1,
                        spaceBetween: 0,
                        pagination: {
                            el: $(el).parent().find('.art-slide-pagination').get(0),
                            type: 'bullets'
                        }
                    })
                    articleSlideSwiper.on('realIndexChange', function(e) {
                        let activeEl = articleSlideSwiper.slides[articleSlideSwiper.activeIndex]
                        let altText = $(activeEl).find('img').attr('alt')
                        $('.art-main-multi-img').eq(i).find('.art-img-cap').text(altText)
                    })
                    $('.art-main-multi-img').eq(i).find('.art-img-cap').addClass('hidden')
                    $('.art-main-multi-img').eq(i).find('.art-img-cap').text($(articleSlideSwiper.slides[articleSlideSwiper.activeIndex]).find('img').attr('alt'))
                })
            }
        }
        function socialShare() {
            let currentUrl = window.location.href;
            let allLink = $('[blog-share]');
            allLink.each(function(i) {
                let type = $(this).attr('blog-share');
                if (type == 'linkedin') {
                    $(this).attr("href", `http://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`);
                } else if (type == 'facebook') {
                    $(this).attr("href", `http://www.facebook.com/sharer.php?u=${currentUrl}`);
                } else if (type == 'twitter') {
                    $(this).attr("href", `http://twitter.com/share?url=${currentUrl}`);
                }
            })
            $('[blog-share="url"]').on('click', function(e) {
                navigator.clipboard.writeText(currentUrl).then(function() {
                }, function(err) {
                    console.error('Async: Could not copy text: ', err);
                });
                $(this).find('.blog-tip-wrap').addClass('active')
                setTimeout(() => {
                    $(this).find('.blog-tip-wrap').removeClass('active')
                }, 3000);
            })
        }
        function updateSharingMobile(sharingTemplate) {
            $('.art-layout-main').prepend(sharingTemplate.clone())
        }
    }
    SCRIPT.notFoundScript = () => {
        function checkRedirect() {
            let url = window.location.pathname;
            let param = window.location.search;
            let uid;
            let page, type;

            if (url.includes('/article/')) {
                page = 'article'
                type = 'blog'
            } else if (url.includes('/blog-author/')) {
                page = 'blog-author'
                type = 'author'
            } else if (url.includes('/blog-category/')) {
                page = 'blog-category'
                type = 'category'
            } else {
                notFound();
                return;
            }

            if (param) {
                uid = param.replace('?id=','')
            } else {
                uid = url.replace(`/${page}/`,'')
            }

            getDetail(type, uid).then((res) => {
                if (!res) {
                    notFound()
                } else {
                    window.location.href = `/${page}?id=` + uid
                }
            })

            function notFound() {
                history.replaceState({},'',`/404`)
                $('.notfound-hero-title').text('Not Found')
                $('title').text('Not Found')
                return;
            }
        }
        checkRedirect();
    }
    SCRIPT.termScript = () => {
        const hash = window.location.hash;
        function updateURL() {
            let newPath;
            newPath = window.location.pathname.replace('/terms-and-policy','')
            //Require 301 Redirect on Webflow
            //history.replaceState({},'',`${newPath + hash}`)

            if (newPath == '/app-terms-and-conditions') {
                $('.header').remove();
                $('.nav').remove();
                $('.sc-footer').remove();
            }
        }
        updateURL();

        let isAppTerm = !$('.sc-term-sub-nav').hasClass('w-condition-invisible');

        function createToc() {
            // Create toc items
            $('.term-main-richtxt').each((index, el) => {
                let allTitle = $(el).find('h2');
                $('.term-toc-inner').eq(index).html('')

                let tocWrap = $('.term-toc-inner').eq(index);
                for (let x = 0; x < allTitle.length; x++) {
                    allTitle.eq(x).attr('id', `toc${index}-${x}`);
                    let tocItem = $('<a></a>').addClass('term-toc-item-link').attr('href', `#toc${index}-${x}`);
                    let tocNumber = $('<div></div>').addClass('txt-14 term-toc-item-number').text(`${x + 1}.`).appendTo(tocItem)
                    let [head, ...[tail]] = allTitle.eq(x).text().split('. ')
                    let tocName = $('<div></div>').addClass('txt-14 term-toc-item-txt').text(`${[tail].join('')}`).appendTo(tocItem)
                    tocWrap.append(tocItem)
                }

                //Mobile
                $('.term-toc-head-txt').eq(index).text($(`.term-toc-item-link[href="#toc${index}-${0}"]`).text().replace('.', '. '))

                lenis.on('scroll', function(e) {
                    let currScroll = e.scroll;
                    for (let x = 0; x < allTitle.length; x++) {
                        let top = allTitle.eq(x).get(0).getBoundingClientRect().top;
                        if (top > 0 && top < ($(window).height() / 5)) {
                            $(`.term-toc-item-link[href="#toc${index}-${x}"]`).addClass('active');
                            $(`.term-toc-item-link`).not(`[href="#toc${index}-${x}"]`).removeClass('active');
                            // mobile
                            $('.term-toc-head-txt').eq(index).text($(`.term-toc-item-link[href="#toc${index}-${x}"]`).text().replace('.', '. '))
                        }
                    }
                })
            })
        }
        createToc();

        function termTabInit() {
            $('.sc-term-main-inner-item').eq(0).fadeIn()

            const activeTab = (index) => {
                $('.mod-term-subnav').removeClass('active');
                $('.mod-term-subnav').eq(index).addClass('active');
                $(`.sc-term-main-inner-item`).fadeOut()
                $(`.sc-term-main-inner-item[data-subnav="${index}"]`).fadeIn();
            }

            $('.mod-term-subnav').on('click', function(e) {
                e.preventDefault();
                if (!$(this).hasClass('active')) {
                    let index = $(this).attr('data-subnav');
                    activeTab(index);
                }
            })

            if (isAppTerm) {
                lenis.on('scroll', function(inst) {
                    $('.term-toc-wrap-overlay').removeClass('on-scroll')
                    if ($(window).width() > 768) {
                        if (inst.scroll > $('.term-outer-wrap').offset().top) {
                            $('.sc-term-sub-nav, .sc-term-subnav-inner').addClass('on-scroll')
                            $('.term-toc-wrap-overlay').addClass('on-cus-scroll')
                        } else {
                            $('.sc-term-sub-nav, .sc-term-subnav-inner').removeClass('on-scroll')
                            $('.term-toc-wrap-overlay').removeClass('on-cus-scroll')
                        }
                    } else {
                        $('.term-toc-wrap-overlay').addClass('on-cus-scroll')
                        // if (inst.scroll > $('.term-outer-wrap').offset().top) {
                        //     //$('.sc-term-sub-nav').addClass('on-scroll')
                        // } else {
                        //     //$('.term-toc-wrap-overlay').removeClass('on-cus-scroll')
                        //     //$('.sc-term-sub-nav').removeClass('on-scroll')
                        // }
                    }
                })
            }

            let tabIndex = hash.replace('#toc', '').charAt(0);
            if (hash) {
                activeTab(tabIndex)
            } else {
                activeTab(0);
            }

        }
        termTabInit()

        function scrollToTocHash(hash, immediate = true) {
            if (hash) {
                if ($(window).width() > 768) {
                    lenis.scrollTo(hash, {
                        offset: -100,
                        immediate: immediate
                    })
                } else {
                    lenis.scrollTo(hash, {
                        offset: -150,
                        immediate: immediate
                    })
                }

            }
        }
        setTimeout(() => {
            scrollToTocHash(hash)
        }, 100);

        function termTocNav() {
            if ($(window).width() < 767) {
                $('.term-toc-head').on('click', function(e) {
                    e.preventDefault();
                    if ($(this).hasClass('on-open')) {
                        $(this).removeClass('on-open');
                        $('.term-toc-inner').removeClass('on-open')
                    } else {
                        $(this).addClass('on-open');
                        $('.term-toc-inner').addClass('on-open')
                    }
                })
            }
            $('.term-toc-item-link').on('click', function(e) {
                e.preventDefault();
                $('.term-toc-head').removeClass('on-open');
                $('.term-toc-inner').removeClass('on-open');
                let target = $(this).attr('href');
                scrollToTocHash(target, false)
                history.replaceState({},'',`${window.location.pathname + target}`)
                return false;
            })
            $('.term-main').on('click', function(e) {
                $('.term-toc-head').removeClass('on-open');
                $('.term-toc-inner').removeClass('on-open');
            })
        }
        termTocNav();
    }
    SCRIPT.faqsScript = () => {
        function faqGetFaq() {
            getAllDataByType('faq_category').then((res) => {
                let allFaqCate = sortAsc(res)
                updateUICate(allFaqCate)
                updateAllFaq();
            })
        }
        faqGetFaq();
        function updateUICate(allFaqCate) {
            $('.faq-cate-list').html('');
            const faqListTemplate = $('.faq-cate-wrap').eq(0).clone();
            const faqTabTemplate = $('.faq-cate-btn-wrap').eq(0).clone();
            const stickySearchIcon = $('.faq-cate-inner .faq-stick-srch').eq(0).clone();
            $('.faq-cate-inner').html('');
            $('.faq-cate-inner').append(stickySearchIcon)
            $('.faq-main-wrap').html('');

            allFaqCate.forEach((faqCate, i) => {
                if (!faqCate.data.launch_site_only) {
                    //Tab
                    let faqTabHtml = faqTabTemplate.clone();
                    faqTabHtml.find('.faq-cate-btn').text(faqCate.data.name).attr('href',`#${faqCate.uid.replaceAll('.','')}`).attr('data-scrollTo', faqCate.uid.replaceAll('.',''))
                    $('.faq-cate-inner').append(faqTabHtml)
                    //List
                    let faqListHtml = faqListTemplate.clone().attr('id',`${faqCate.uid.replaceAll('.','')}`);
                    faqListHtml.find('.faq-cate-title').text(faqCate.data.name)
                    $('.faq-main-wrap').append(faqListHtml)
                }
            })

            // init Swiper for sticky categories
            let faqCateSwiper;
            faqCateSwiper = new Swiper('.faq-cate-list-wrap.swiper', {
                slidesPerView: 'auto',
                mousewheel: true,
                on: {
                    afterInit: () => {
                        $('.faq-stick-srch.mod-tb').addClass('after-init')
                    }
                }
            })
            // active on scroll
            let allTitle = $('.faq-main-wrap .faq-cate-title');
            lenis.on('scroll', function(e) {
                for (let x = 0; x < allTitle.length; x++) {
                    let top = allTitle.eq(x).get(0).getBoundingClientRect().top;
                    if (top > 0 && top < ($(window).height() / 5)) {
                        $('.faq-cate-list-contain .faq-cate-btn').eq(x).addClass('active');
                        $('.faq-cate-list-contain .faq-cate-btn').not(`:eq(${x})`).removeClass('active');
                        faqCateSwiper.slideTo(x)
                    }
                }
            })
            $('.txt-16.home-faq-empty').hide();
        }
        function updateAllFaq() {
            const faqSearchItemTemplate = $('.faq-srch-item').eq(0).clone();
            $('.faq-srch-drop-inner').html('')

            getAllDataByType('faq').then((res) => {
                let allFaqItem = sortAsc(res)
                allFaqItem.forEach((i) => {
                    if (!i.data.launch_site_only) {
                        //Faq into their Category
                        let parentSlot = $(`.faq-cate-wrap[id="${i.data.faq_category.uid.replaceAll('.','')}"]`).find('.faq-cate-list')
                        createFaq(i,true).appendTo(parentSlot)
                        //Search
                        let faqSearchHtml = faqSearchItemTemplate.clone().attr('data-scrollto',`${i.uid.replaceAll('.','')}`)
                        faqSearchHtml.find('.txt-16').text(i.data.question);
                        //Search item answer
                        faqSearchHtml.find('.hidden.data-faq-srch-body').append($(createFaq(i,true)).find('.home-faq--itemans').text().replaceAll('\n', ' '))
                        $('.faq-srch-drop-inner').append(faqSearchHtml)
                    }
                })
                animateFaq();
                updateInterestRate('.faq-main-wrap');
                faqInteraction();
                cleanupEmptyCate();
                if ($('intro-wrap'.length)) {
                    $('.intro-wrap').addClass('loaded')
                }
            });
        }
        function cleanupEmptyCate() {
            let cateItem = $('.faq-cate-wrap')
            cateItem.each((index, el) => {
                if ($(el).find('.faq-cate-list').text() == '') {
                    $(el).remove();
                    $(`.faq-cate-btn[href="#${$(el).attr('id')}"]`).closest('.faq-cate-btn-wrap').remove()
                }
            })

        }
        function faqInteraction() {
            setTimeout(() => {
                scrollToCategoryOnClick()
                scrollToFaqOnClick();
                searchFaqOnType();
                addFaqIdToURL();
                searchOnSticky();
                pushSearchTerm();
            }, slideUpDownTime + 1);
        }
        function addFaqIdToURL() {
            $('.home-faq-item-head').on('click', function(e) {
                e.preventDefault()
                let id = $(this).parent().attr('id');
                let cateId = $(this).closest('.faq-cate-wrap').attr('id')
                const url = new URL(window.location);
                url.searchParams.set('id', id);
                url.searchParams.set('category', cateId);
                history.replaceState({},'', url)
            })
        }
        function scrollToCategoryOnClick() {
            $('.faq-cate-inner .faq-cate-btn').on('click', function(e) {
                e.preventDefault();
                e.stopImmediatePropagation()
                let cateId = $(this).attr('data-scrollTo')
                lenis.scrollTo(`#${cateId}`, {offset: -100})
                const url = new URL(window.location);
                url.search = '';
                url.searchParams.set('category', cateId);
                history.replaceState({},'', url)
            })
        }
        function scrollToFaqOnClick() {
            let search = window.location.search.substring(1);
            if (search.includes('=')) {
                let param = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
                if ($(`#${param.id}`).length) {
                    let scrollOffset = $(window).height() * 2 / 10;
                    $(`#${param.id}`).find('.home-faq-item-head').trigger('click')
                    lenis.scrollTo(`#${param.id}`, {offset: -scrollOffset})
                } else if ($(`#${param.category}`).length) {
                    lenis.scrollTo(`#${param.category}`);
                } else {
                    const url = new URL(window.location);
                    url.search = '';
                    history.replaceState({},'', url)
                }
            } else {
                const url = new URL(window.location);
                url.search = '';
                history.replaceState({},'', url)
            }
        };
        function searchFaqOnType() {
            let faqs = $('.faq-srch-item');
            let input = $('#faq-search');
            let dropdown = $('.faq-srch-drop-wrap');
            let form = $('#faq-search-form');
            form.attr('action','')

            form.on('submit', function(e) {
                e.preventDefault();
                return false;
            })
            input.on('keyup change', function(e) {
                e.preventDefault();
                if (e.keyCode == '13') {
                    return false;
                }
                let value = $(this).val()
                let compValue = value.toLowerCase().trim();

                faqs.each((e) => {
                    let ques = faqs.eq(e).find('.txt-16').text()
                    let compQues = ques.toLowerCase().trim()
                    let ans = faqs.eq(e).find('.hidden.data-faq-srch-body').text()
                    let compAns = ans.toLowerCase().trim()

                    if (compQues.includes(compValue) || compAns.includes(compValue)) {
                        faqs.eq(e).removeClass('hidden');
                    } else {
                        faqs.eq(e).addClass('hidden');
                    }

                    // rel tag
                    if (compAns.includes(compValue) && !compQues.includes(compValue)) {
                        faqs.eq(e).addClass('rele');
                    } else {
                        faqs.eq(e).removeClass('rele');
                    }

                    //Highlight text
                    let maskedText = new RegExp("(" + value + ")","gi");
                    const newQues = faqs.eq(e).find('.txt-16').text().replace(maskedText, "<span class='hl'>$1</span>")
                    faqs.eq(e).find('.txt-16').html(newQues)
                })

                if (dropdown.find('.faq-srch-drop-inner').height() == 0) {
                    dropdown.find('.faq-srch-empty').slideDown();
                } else {
                    dropdown.find('.faq-srch-empty').slideUp();
                }

                if (input.val() != '') {
                    dropdown.addClass('open');
                } else {
                    dropdown.removeClass('open');
                }
            })
            input.on('focus', function(e) {
                if (input.val() != '') {
                    dropdown.addClass('open');
                }
            })
            input.on('blur', function(e) {
                if (!dropdown.is(':hover')) {
                    dropdown.removeClass('open')
                }
            })
            $('.faq-srch-item').on('click',function(e) {
                e.preventDefault();
                let faqId = $(this).attr('data-scrollto');
                dropdown.removeClass('open')
                let scrollOffset = $(window).height() * 2 / 10;
                $(`#${faqId}`).find('.home-faq-item-head').trigger('click')
                lenis.scrollTo(`#${faqId}`, {offset: -scrollOffset})
            })
        }
        function searchOnSticky() {
            if ($(window).width() > 991) {
                $('.faq-stick-srch').on('click', function(e) {
                    e.preventDefault();
                    lenis.scrollTo('#faq-search-form', {offset: -40 * unit})
                    $('#faq-search-form').find('input').trigger('focus')
                })
            } else {
                $('.faq-cate-inner .faq-stick-srch').on('click', function(e) {
                    e.preventDefault();
                    lenis.scrollTo('#faq-search-form', {offset: -40 * unit})
                    $('#faq-search-form').find('input').trigger('focus')
                })
            }
        }
        function pushSearchTerm() {
            window.dataLayer = window.dataLayer || [];
            let input = $('#faq-search');
            input.on('keyup', debounce(function(e) {
                let searchTerm = $(e.currentTarget).val()
                window.dataLayer.push({
                    'event' : 'search',
                    'search_term' : searchTerm
                });
            }, 1000))
        }

    }
    SCRIPT.contactUsScript = () => {
        $('form.ctc-form').on('submit', function(e) {
            e.preventDefault();
            let formName = $(this).attr('data-name');
            triggerContactBlueShift();
            triggerFormSuccess('contact', formName);
            $(this).trigger('reset')
            return false;
        })
        $('form.ctc-form').find('[data-form="submit"]').on('click', function(e) {
            e.preventDefault();
            $('form.ctc-form').submit()
        })

        function triggerContactBlueShift() {
            // trigger blueshift for contact
        }

        function updateParam() {
            let search = window.location.search.substring(1);
            if (search.includes('=')) {
                let param = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
                if (param.subject == 'suggestion') {
                    $('form.ctc-form').find('[data-name="subject"]').val('Make a suggestion')
                }
            }
        }
        updateParam();
    }
    SCRIPT.documentsScript = () => {
        function getAllDocs() {
            const getApi = [getAllDataByType('document_category'), getAllDataByType('fund_document')];
            Promise.all(getApi).then(([categories, docs]) => {
                let allCate = sortAsc(categories);
                let allDoc = sortAsc(docs);
                updateDocUI(allCate, allDoc);
                docInteraction();
            })
        }
        getAllDocs()
        function updateDocUI(allCate, allDoc) {
            let cateItemTemplate = $('.doc-main-item-wrap').eq(0).clone();
            $('.doc-main-items').html('')
            let cateMainTemplate = $('.doc-main-group').eq(0).clone();
            $('.doc-main-wrap').html('')
            let cateStickyTemplate = $('.term-toc-item-link').eq(1).clone();
            $('.term-toc-inner').html('')
            allCate.forEach((cateEl, i) => {
                let cateName = cateEl.data.category_name;
                let cateUID = cateEl.uid;

                let cateMainHtml = cateMainTemplate.clone();
                cateMainHtml.attr('id', cateUID)
                cateMainHtml.find('[data-doc="title"]').text(cateName)
                $('.doc-main-wrap').append(cateMainHtml)

                let cateStickyHtml = cateStickyTemplate.clone();
                cateStickyHtml.find('.term-toc-item-number').text(`${i + 1}.`)
                cateStickyHtml.find('.term-toc-item-txt').text(cateName)
                cateStickyHtml.attr('href', `#${cateUID}`)
                $('.term-toc-inner').append(cateStickyHtml)
            });
            allDoc.forEach((docEl, i) => {
                let docName = docEl.data.name;
                let docParent = docEl.data.document_category.uid;
                let docURL = docEl.data.pdf_file.url;

                let cateItemHtml = cateItemTemplate.clone();
                cateItemHtml.find('.doc-item-title').text(docName)
                cateItemHtml.attr('href', docURL)
                $(`.doc-main-group#${docParent}`).find('.doc-main-items').append(cateItemHtml)
            })
        }
        function docInteraction() {
            let allCateGroups = $('.doc-main-group');
            lenis.on('scroll', function(e) {
                for (let x = 0; x < allCateGroups.length; x++) {
                    let top = allCateGroups.eq(x).get(0).getBoundingClientRect().top;
                    if (top > 0 && top < ($(window).height() / 5)) {
                        $('.term-toc-item-link').eq(x).addClass('active');
                        $('.term-toc-item-link').not(`:eq(${x})`).removeClass('active');
                        $('.term-toc-head-txt').text($('.term-toc-item-link.active .term-toc-item-txt').text())
                    }
                }
            })
            docTocNav();
        }
        function docTocNav() {
            if ($(window).width() < 767) {
                $('.term-toc-head').on('click', function(e) {
                    e.preventDefault();
                    if ($(this).hasClass('on-open')) {
                        $(this).removeClass('on-open');
                        $('.term-toc-inner').removeClass('on-open')
                    } else {
                        $(this).addClass('on-open');
                        $('.term-toc-inner').addClass('on-open')
                    }
                })
            }
            $('.term-toc-item-link').on('click', function (e) {
                $('.term-toc-head').removeClass('on-open');
                $('.term-toc-inner').removeClass('on-open');
                //lenis.scrollTo($(this).attr('href'),{offset: -100})
            })
            $('.term-main').on('click', function(e) {
                $('.term-toc-head').removeClass('on-open');
                $('.term-toc-inner').removeClass('on-open');
            })
        }
    }

    const pageName = $('.main').attr('data-barba-namespace');
    if (pageName) {
        detectPage(pageName)
        SCRIPT[(`${pageName}Script`)]();
    }
}

window.onload = mainScript;