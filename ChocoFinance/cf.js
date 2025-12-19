const mainScript = () => {
    // CircleType
    !function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.CircleType=n():t.CircleType=n()}(window,(function(){return function(t){var n={};function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)e.d(r,i,function(n){return t[n]}.bind(null,i));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=28)}([function(t,n,e){var r=e(13)("wks"),i=e(12),o=e(1).Symbol,u="function"==typeof o;(t.exports=function(t){return r[t]||(r[t]=u&&o[t]||(u?o:i)("Symbol."+t))}).store=r},function(t,n){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},function(t,n){var e=t.exports={version:"2.6.11"};"number"==typeof __e&&(__e=e)},function(t,n,e){var r=e(4),i=e(11);t.exports=e(6)?function(t,n,e){return r.f(t,n,i(1,e))}:function(t,n,e){return t[n]=e,t}},function(t,n,e){var r=e(5),i=e(33),o=e(34),u=Object.defineProperty;n.f=e(6)?Object.defineProperty:function(t,n,e){if(r(t),n=o(n,!0),r(e),i)try{return u(t,n,e)}catch(t){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(t[n]=e.value),t}},function(t,n,e){var r=e(10);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,n,e){t.exports=!e(18)((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}))},function(t,n){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},function(t,n){var e=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:e)(t)}},function(t,n){t.exports=function(t){if(null==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n){var e=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+r).toString(36))}},function(t,n,e){var r=e(2),i=e(1),o=i["__core-js_shared__"]||(i["__core-js_shared__"]={});(t.exports=function(t,n){return o[t]||(o[t]=void 0!==n?n:{})})("versions",[]).push({version:r.version,mode:e(16)?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},function(t,n){t.exports={}},function(t,n,e){var r=e(13)("keys"),i=e(12);t.exports=function(t){return r[t]||(r[t]=i(t))}},function(t,n){t.exports=!1},function(t,n,e){var r=e(1),i=e(2),o=e(3),u=e(20),c=e(21),a=function(t,n,e){var f,s,l,p,h=t&a.F,v=t&a.G,d=t&a.S,y=t&a.P,m=t&a.B,g=v?r:d?r[n]||(r[n]={}):(r[n]||{}).prototype,_=v?i:i[n]||(i[n]={}),x=_.prototype||(_.prototype={});for(f in v&&(e=n),e)l=((s=!h&&g&&void 0!==g[f])?g:e)[f],p=m&&s?c(l,r):y&&"function"==typeof l?c(Function.call,l):l,g&&u(g,f,l,t&a.U),_[f]!=l&&o(_,f,p),y&&x[f]!=l&&(x[f]=l)};r.core=i,a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,n,e){var r=e(10),i=e(1).document,o=r(i)&&r(i.createElement);t.exports=function(t){return o?i.createElement(t):{}}},function(t,n,e){var r=e(1),i=e(3),o=e(7),u=e(12)("src"),c=e(35),a=(""+c).split("toString");e(2).inspectSource=function(t){return c.call(t)},(t.exports=function(t,n,e,c){var f="function"==typeof e;f&&(o(e,"name")||i(e,"name",n)),t[n]!==e&&(f&&(o(e,u)||i(e,u,t[n]?""+t[n]:a.join(String(n)))),t===r?t[n]=e:c?t[n]?t[n]=e:i(t,n,e):(delete t[n],i(t,n,e)))})(Function.prototype,"toString",(function(){return"function"==typeof this&&this[u]||c.call(this)}))},function(t,n,e){var r=e(36);t.exports=function(t,n,e){if(r(t),void 0===n)return t;switch(e){case 1:return function(e){return t.call(n,e)};case 2:return function(e,r){return t.call(n,e,r)};case 3:return function(e,r,i){return t.call(n,e,r,i)}}return function(){return t.apply(n,arguments)}}},function(t,n,e){var r=e(42),i=e(9);t.exports=function(t){return r(i(t))}},function(t,n){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},function(t,n,e){var r=e(8),i=Math.min;t.exports=function(t){return t>0?i(r(t),9007199254740991):0}},function(t,n){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,n,e){var r=e(4).f,i=e(7),o=e(0)("toStringTag");t.exports=function(t,n,e){t&&!i(t=e?t:t.prototype,o)&&r(t,o,{configurable:!0,value:n})}},function(t,n,e){var r=e(9);t.exports=function(t){return Object(r(t))}},function(t,n,e){e(29);var r=e(54).default;t.exports=r},function(t,n,e){e(30),e(47),t.exports=e(2).Array.from},function(t,n,e){"use strict";var r=e(31)(!0);e(32)(String,"String",(function(t){this._t=String(t),this._i=0}),(function(){var t,n=this._t,e=this._i;return e>=n.length?{value:void 0,done:!0}:(t=r(n,e),this._i+=t.length,{value:t,done:!1})}))},function(t,n,e){var r=e(8),i=e(9);t.exports=function(t){return function(n,e){var o,u,c=String(i(n)),a=r(e),f=c.length;return a<0||a>=f?t?"":void 0:(o=c.charCodeAt(a))<55296||o>56319||a+1===f||(u=c.charCodeAt(a+1))<56320||u>57343?t?c.charAt(a):o:t?c.slice(a,a+2):u-56320+(o-55296<<10)+65536}}},function(t,n,e){"use strict";var r=e(16),i=e(17),o=e(20),u=e(3),c=e(14),a=e(37),f=e(26),s=e(46),l=e(0)("iterator"),p=!([].keys&&"next"in[].keys()),h=function(){return this};t.exports=function(t,n,e,v,d,y,m){a(e,n,v);var g,_,x,b=function(t){if(!p&&t in S)return S[t];switch(t){case"keys":case"values":return function(){return new e(this,t)}}return function(){return new e(this,t)}},w=n+" Iterator",O="values"==d,j=!1,S=t.prototype,M=S[l]||S["@@iterator"]||d&&S[d],T=M||b(d),P=d?O?b("entries"):T:void 0,A="Array"==n&&S.entries||M;if(A&&(x=s(A.call(new t)))!==Object.prototype&&x.next&&(f(x,w,!0),r||"function"==typeof x[l]||u(x,l,h)),O&&M&&"values"!==M.name&&(j=!0,T=function(){return M.call(this)}),r&&!m||!p&&!j&&S[l]||u(S,l,T),c[n]=T,c[w]=h,d)if(g={values:O?T:b("values"),keys:y?T:b("keys"),entries:P},m)for(_ in g)_ in S||o(S,_,g[_]);else i(i.P+i.F*(p||j),n,g);return g}},function(t,n,e){t.exports=!e(6)&&!e(18)((function(){return 7!=Object.defineProperty(e(19)("div"),"a",{get:function(){return 7}}).a}))},function(t,n,e){var r=e(10);t.exports=function(t,n){if(!r(t))return t;var e,i;if(n&&"function"==typeof(e=t.toString)&&!r(i=e.call(t)))return i;if("function"==typeof(e=t.valueOf)&&!r(i=e.call(t)))return i;if(!n&&"function"==typeof(e=t.toString)&&!r(i=e.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},function(t,n,e){t.exports=e(13)("native-function-to-string",Function.toString)},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,n,e){"use strict";var r=e(38),i=e(11),o=e(26),u={};e(3)(u,e(0)("iterator"),(function(){return this})),t.exports=function(t,n,e){t.prototype=r(u,{next:i(1,e)}),o(t,n+" Iterator")}},function(t,n,e){var r=e(5),i=e(39),o=e(25),u=e(15)("IE_PROTO"),c=function(){},a=function(){var t,n=e(19)("iframe"),r=o.length;for(n.style.display="none",e(45).appendChild(n),n.src="javascript:",(t=n.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),a=t.F;r--;)delete a.prototype[o[r]];return a()};t.exports=Object.create||function(t,n){var e;return null!==t?(c.prototype=r(t),e=new c,c.prototype=null,e[u]=t):e=a(),void 0===n?e:i(e,n)}},function(t,n,e){var r=e(4),i=e(5),o=e(40);t.exports=e(6)?Object.defineProperties:function(t,n){i(t);for(var e,u=o(n),c=u.length,a=0;c>a;)r.f(t,e=u[a++],n[e]);return t}},function(t,n,e){var r=e(41),i=e(25);t.exports=Object.keys||function(t){return r(t,i)}},function(t,n,e){var r=e(7),i=e(22),o=e(43)(!1),u=e(15)("IE_PROTO");t.exports=function(t,n){var e,c=i(t),a=0,f=[];for(e in c)e!=u&&r(c,e)&&f.push(e);for(;n.length>a;)r(c,e=n[a++])&&(~o(f,e)||f.push(e));return f}},function(t,n,e){var r=e(23);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,n,e){var r=e(22),i=e(24),o=e(44);t.exports=function(t){return function(n,e,u){var c,a=r(n),f=i(a.length),s=o(u,f);if(t&&e!=e){for(;f>s;)if((c=a[s++])!=c)return!0}else for(;f>s;s++)if((t||s in a)&&a[s]===e)return t||s||0;return!t&&-1}}},function(t,n,e){var r=e(8),i=Math.max,o=Math.min;t.exports=function(t,n){return(t=r(t))<0?i(t+n,0):o(t,n)}},function(t,n,e){var r=e(1).document;t.exports=r&&r.documentElement},function(t,n,e){var r=e(7),i=e(27),o=e(15)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=i(t),r(t,o)?t[o]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,n,e){"use strict";var r=e(21),i=e(17),o=e(27),u=e(48),c=e(49),a=e(24),f=e(50),s=e(51);i(i.S+i.F*!e(53)((function(t){Array.from(t)})),"Array",{from:function(t){var n,e,i,l,p=o(t),h="function"==typeof this?this:Array,v=arguments.length,d=v>1?arguments[1]:void 0,y=void 0!==d,m=0,g=s(p);if(y&&(d=r(d,v>2?arguments[2]:void 0,2)),null==g||h==Array&&c(g))for(e=new h(n=a(p.length));n>m;m++)f(e,m,y?d(p[m],m):p[m]);else for(l=g.call(p),e=new h;!(i=l.next()).done;m++)f(e,m,y?u(l,d,[i.value,m],!0):i.value);return e.length=m,e}})},function(t,n,e){var r=e(5);t.exports=function(t,n,e,i){try{return i?n(r(e)[0],e[1]):n(e)}catch(n){var o=t.return;throw void 0!==o&&r(o.call(t)),n}}},function(t,n,e){var r=e(14),i=e(0)("iterator"),o=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||o[i]===t)}},function(t,n,e){"use strict";var r=e(4),i=e(11);t.exports=function(t,n,e){n in t?r.f(t,n,i(0,e)):t[n]=e}},function(t,n,e){var r=e(52),i=e(0)("iterator"),o=e(14);t.exports=e(2).getIteratorMethod=function(t){if(null!=t)return t[i]||t["@@iterator"]||o[r(t)]}},function(t,n,e){var r=e(23),i=e(0)("toStringTag"),o="Arguments"==r(function(){return arguments}());t.exports=function(t){var n,e,u;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(e=function(t,n){try{return t[n]}catch(t){}}(n=Object(t),i))?e:o?r(n):"Object"==(u=r(n))&&"function"==typeof n.callee?"Arguments":u}},function(t,n,e){var r=e(0)("iterator"),i=!1;try{var o=[7][r]();o.return=function(){i=!0},Array.from(o,(function(){throw 2}))}catch(t){}t.exports=function(t,n){if(!n&&!i)return!1;var e=!1;try{var o=[7],u=o[r]();u.next=function(){return{done:e=!0}},o[r]=function(){return u},t(o)}catch(t){}return e}},function(t,n,e){"use strict";e.r(n);var r=function(t){var n=t.getBoundingClientRect();return{height:n.height,left:n.left+window.pageXOffset,top:n.top+window.pageYOffset,width:n.width}};function i(t){return function(t){if(Array.isArray(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var o=Math.PI/180,u=function(t){return t*o},c=function(t,n){return t*(1-Math.cos(u(n/2)))},a=180/Math.PI,f=function(t,n){return t.reduce((function(t,e){var r=e.width,i=r/n*a;return{"θ":t.θ+i,rotations:t.rotations.concat([t.θ+i/2])}}),{"θ":0,rotations:[]})};function s(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var l=Math.PI,p=Math.max,h=Math.min,v=function(){function t(n,e){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this.element=n,this.originalHTML=this.element.innerHTML;var o=document.createElement("div"),u=document.createDocumentFragment();o.setAttribute("aria-label",n.innerText),o.style.position="relative",this.container=o,this._letters=function(t,n){var e=document.createElement("span");e.style.display="inline-block";var r=t.innerText.trim();return(n?n(r):i(r)).map((function(t){var n=e.cloneNode();return n.insertAdjacentHTML("afterbegin"," "===t?"&nbsp;":t),n}))}(n,e),this._letters.forEach((function(t){return u.appendChild(t)})),o.appendChild(u),this.element.innerHTML="",this.element.appendChild(o);var c=window.getComputedStyle(this.element),a=c.fontSize,f=c.lineHeight;this._fontSize=parseFloat(a),this._lineHeight=parseFloat(f)||this._fontSize,this._metrics=this._letters.map(r);var s=this._metrics.reduce((function(t,n){return t+n.width}),0);this._minRadius=s/l/2+this._lineHeight,this._dir=1,this._forceWidth=!1,this._forceHeight=!0,this._radius=this._minRadius,this._invalidate()}var n,e,o;return n=t,(e=[{key:"radius",value:function(t){return void 0!==t?(this._radius=p(this._minRadius,t),this._invalidate(),this):this._radius}},{key:"dir",value:function(t){return void 0!==t?(this._dir=t,this._invalidate(),this):this._dir}},{key:"forceWidth",value:function(t){return void 0!==t?(this._forceWidth=t,this._invalidate(),this):this._forceWidth}},{key:"forceHeight",value:function(t){return void 0!==t?(this._forceHeight=t,this._invalidate(),this):this._forceHeight}},{key:"refresh",value:function(){return this._invalidate()}},{key:"destroy",value:function(){return this.element.innerHTML=this.originalHTML,this}},{key:"_invalidate",value:function(){var t=this;return cancelAnimationFrame(this._raf),this._raf=requestAnimationFrame((function(){t._layout()})),this}},{key:"_layout",value:function(){var t=this,n=this._radius,e=this._dir,r=-1===e?-n+this._lineHeight:n,i="center ".concat(r/this._fontSize,"em"),o=n-this._lineHeight,a=f(this._metrics,o),s=a.rotations,l=a.θ;if(this._letters.forEach((function(n,r){var o=n.style,u=(-.5*l+s[r])*e,c=-.5*t._metrics[r].width/t._fontSize,a="translateX(".concat(c,"em) rotate(").concat(u,"deg)");o.position="absolute",o.bottom=-1===e?0:"auto",o.left="50%",o.transform=a,o.transformOrigin=i,o.webkitTransform=a,o.webkitTransformOrigin=i})),this._forceHeight){var p=l>180?c(n,l):c(o,l)+this._lineHeight;this.container.style.height="".concat(p/this._fontSize,"em")}if(this._forceWidth){var v=function(t,n){return 2*t*Math.sin(u(n/2))}(n,h(180,l));this.container.style.width="".concat(v/this._fontSize,"em")}return this}}])&&s(n.prototype,e),o&&s(n,o),t}();n.default=v}])}));

    gsap.registerPlugin(ScrollTrigger);
    const viewport = {
        w: window.innerWidth,
        h: window.innerHeight
    }
    //Smooth Scroll
    $('html').css('scroll-behavior', 'auto');
    $('html').css('height', 'auto');

    function easing(x) {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
    }

    const lenis = new Lenis({
        easing: easing,
        duration: .6
    })

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    if ($('.intro-wrap').length) {
        $('.intro-wrap').addClass('loaded')
    }
    const parseRem = (input) => {
        return (input / 10) * parseFloat($("html").css("font-size"));
      };
    const schemaFAQParentAttrs = {
        itemscope: true,
        itemtype: 'https://schema.org/FAQPage'
    };   
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
    function toTitle(slug) {
        return slug.replace(/-/g, " ").replace(/\b[a-z]/g, function() {
            return arguments[0].toUpperCase();
        });
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
    function detectPage(pageName) {
        // Header link
        $('[data-link]').removeClass('active');
        $(`[data-link="${pageName}"]`).addClass('active');
        $('.nav-logo-ic-outer').css({
            '--i': $(`[data-link="${pageName}"]`).index()
        })
    }

    function checkOS() {
        if (typeof window == "undefined") return {};

        if (typeof deviceInfo == "undefined") {
            var unknown = "-";

            // screen
            var screenSize = "";
            if (screen.width) {
                var width = screen.width ? screen.width : "";
                var height = screen.height ? screen.height : "";
                screenSize += "" + width + " x " + height;
            }

            // browser
            var nVer = navigator.appVersion;
            var nAgt = navigator.userAgent;
            var browser = navigator.appName;
            var version = "" + parseFloat(navigator.appVersion);
            var majorVersion = parseInt(navigator.appVersion, 10);
            var nameOffset, verOffset, ix;

            // Opera
            if ((verOffset = nAgt.indexOf("Opera")) != -1) {
                browser = "Opera";
                version = nAgt.substring(verOffset + 6);
                if ((verOffset = nAgt.indexOf("Version")) != -1) {
                    version = nAgt.substring(verOffset + 8);
                }
            }
            // Opera Next
            if ((verOffset = nAgt.indexOf("OPR")) != -1) {
                browser = "Opera";
                version = nAgt.substring(verOffset + 4);
            }
            // Edge
            else if ((verOffset = nAgt.indexOf("Edge")) != -1) {
                browser = "Microsoft Edge";
                version = nAgt.substring(verOffset + 5);
            }
            // MSIE
            else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
                browser = "Microsoft Internet Explorer";
                version = nAgt.substring(verOffset + 5);
            }
            // Chrome
            else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
                browser = "Chrome";
                version = nAgt.substring(verOffset + 7);
            }
            // Safari
            else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
                browser = "Safari";
                version = nAgt.substring(verOffset + 7);
                if ((verOffset = nAgt.indexOf("Version")) != -1) {
                    version = nAgt.substring(verOffset + 8);
                }
            }
            // Firefox
            else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
                browser = "Firefox";
                version = nAgt.substring(verOffset + 8);
            }
            // MSIE 11+
            else if (nAgt.indexOf("Trident/") != -1) {
                browser = "Microsoft Internet Explorer";
                version = nAgt.substring(nAgt.indexOf("rv:") + 3);
            }
            // Other browsers
            else if ((nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/"))) {
                browser = nAgt.substring(nameOffset, verOffset);
                version = nAgt.substring(verOffset + 1);
                if (browser.toLowerCase() == browser.toUpperCase()) {
                    browser = navigator.appName;
                }
            }
            // Detect Instagram in-app browser
            if (nAgt.indexOf("Instagram") != -1) {
                browser = "Instagram";
                version = nAgt.substring(nAgt.indexOf("Instagram") + 10);
            }
            // trim the version string
            if ((ix = version.indexOf(";")) != -1) version = version.substring(0, ix);
            if ((ix = version.indexOf(" ")) != -1) version = version.substring(0, ix);
            if ((ix = version.indexOf(")")) != -1) version = version.substring(0, ix);

            majorVersion = parseInt("" + version, 10);
            if (isNaN(majorVersion)) {
                version = "" + parseFloat(navigator.appVersion);
                majorVersion = parseInt(navigator.appVersion, 10);
            }

            // mobile version
            var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

            // cookie
            var cookieEnabled = navigator.cookieEnabled ? true : false;

            if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
                document.cookie = "testcookie";
                cookieEnabled = document.cookie.indexOf("testcookie") != -1 ? true : false;
            }

            // system
            var os = unknown;
            var clientStrings = [
                { s: "Windows 10", r: /(Windows 10.0|Windows NT 10.0)/ },
                { s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/ },
                { s: "Windows 8", r: /(Windows 8|Windows NT 6.2)/ },
                { s: "Windows 7", r: /(Windows 7|Windows NT 6.1)/ },
                { s: "Windows Vista", r: /Windows NT 6.0/ },
                { s: "Windows Server 2003", r: /Windows NT 5.2/ },
                { s: "Windows XP", r: /(Windows NT 5.1|Windows XP)/ },
                { s: "Windows 2000", r: /(Windows NT 5.0|Windows 2000)/ },
                { s: "Windows ME", r: /(Win 9x 4.90|Windows ME)/ },
                { s: "Windows 98", r: /(Windows 98|Win98)/ },
                { s: "Windows 95", r: /(Windows 95|Win95|Windows_95)/ },
                { s: "Windows NT 4.0", r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
                { s: "Windows CE", r: /Windows CE/ },
                { s: "Windows 3.11", r: /Win16/ },
                { s: "Android", r: /Android/ },
                { s: "Open BSD", r: /OpenBSD/ },
                { s: "Sun OS", r: /SunOS/ },
                { s: "Linux", r: /(Linux|X11)/ },
                { s: "iOS", r: /(iPhone|iPad|iPod)/ },
                { s: "Mac OS X", r: /Mac OS X/ },
                { s: "Mac OS", r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
                { s: "QNX", r: /QNX/ },
                { s: "UNIX", r: /UNIX/ },
                { s: "BeOS", r: /BeOS/ },
                { s: "OS/2", r: /OS\/2/ },
                { s: "Search Bot", r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ },
            ];
            for (var id in clientStrings) {
                var cs = clientStrings[id];
                if (cs.r.test(nAgt)) {
                    os = cs.s;
                    break;
                }
            }

            var osVersion = unknown;

            if (/Windows/.test(os)) {
                const _osv = /Windows (.*)/.exec(os) || [];
                osVersion = _osv[1] || "unknown";
                os = "Windows";
            }

            switch (os) {
                case "Mac OS X":
                    const _osvx = /Mac OS X (10[\.\_\d]+)/.exec(nAgt);
                    osVersion = _osvx?.[1] || "unknown";
                    break;

                case "Android":
                    osVersion = /Android ([\.\_\d]+)/.exec(nAgt)?.[1] || "unknown";
                    break;

                case "iOS":
                    const _osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer) || [0, 0, 0];
                    osVersion = (_osVersion[1] || 0) + "." + (_osVersion[2] || 0) + "." + (_osVersion[3] || 0);
                    break;
            }

            const _deviceInfo = {
                screen: screenSize,
                browser: browser,
                browserVersion: version,
                browserMajorVersion: majorVersion,
                mobile: mobile,
                os: os,
                osVersion: osVersion,
                cookies: cookieEnabled,
            };

            deviceInfo = _deviceInfo;
        }

        return deviceInfo;
    };

    

    function updateVideoSrc() {
        if (checkOS().browser === 'Safari' || checkOS().browser === 'Instagram' || checkOS().browser === 'IABMV') {
            $('video[data-os-depend] [data-ext="webm"]').remove()
        } else {
            $('video[data-os-depend] [data-ext="mov"]').remove()
        }
        $('video[data-os-depend]').each(function(index) {
            $(this).get(0).load()
        })
    }
    updateVideoSrc();

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

    function updateDynamicCopyrightYear() {
        if ($('[data-copyright-year]').length) {
            $('[data-copyright-year]').html(new Date().getFullYear())
        }
    }
    updateDynamicCopyrightYear();
    function isStagging() {
        let currentUrl = window.location.href;
        return currentUrl.includes('webflow.io')
    }
    function scrollToFaq() {
        $('[data-scroll-faq]').on('click', function(e) {
            e.preventDefault();
            let target = $(this).attr('data-scroll-faq');
            if ($(`#${target}`).length >= 1) {
                lenis.scrollTo(target)
                $(`#${target}`).find('.home-faq-item-head').trigger('click')
            } else {
                lenis.scrollTo(`${$(this).attr('href')}`)
            }

        })
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
                let target = $(this).attr('href');
                let url = new URL(target);
                if (window.location.origin == url.origin) {
                    e.preventDefault();
                    let newURL = `${window.location.origin}${url.pathname}${url.search}`
                    if ($(this).attr('target') == '_blank') {
                        window.open(newURL,'_blank').focus()
                    } else {
                        window.location = newURL
                    }
                }
            })
        }
    }
    
    function createPartnerHTML(template, partner) {
        const html = template.clone();
        if (!partner.visibility) html.addClass('hidden');
        let imgurl = partner.image.url.includes('gif') ? partner.image.url.replace('?auto=format,compress', '') : partner.image.url;
        html.find('[data-partner="img"]').attr('src',imgurl);
        html.find('[data-partner="label"]').text(partner.label);
        return html;
    }
    let isScrolling = false;
    function openFaqItem() {
        $('[data-faq-open]').on('click', function(e) {
            e.preventDefault();
            let targetId = $(this).attr('data-faq-open');
            console.log('openFaqItem', $(`#${targetId}`));
            $(`#${targetId}`).find('.home-faq-item-head').trigger('click');
            setTimeout(() => {
                isScrolling = true;
                lenis.start();
                lenis.scrollTo(`#${targetId}`, {
                    offset: -20 * unit,
                    onComplete: () => {
                        isScrolling = false;
                    }
                })
            }, 200);
        })
    }
    openFaqItem()
    
    // Scroll Events
    let header = $('.header');
    
    function suggestLanguage() {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase();
        if (userTimeZone.includes('asia') && (userTimeZone.includes('hong_kong') || userTimeZone.includes('shanghai') || userTimeZone.includes('beijing') || userTimeZone.includes('macau'))) {
          return 'zh-HK'; 
        } else if (userTimeZone.includes('asia') && (userTimeZone.includes('tokyo') || userTimeZone.includes('japan') || userTimeZone.includes('osaka'))) {
          return 'ja-JP'; 
        } else if (userTimeZone.includes('asia') && (userTimeZone.includes('dubai') || userTimeZone.includes('riyadh') || userTimeZone.includes('qatar') || userTimeZone.includes('bahrain'))) {
          return 'ar-AE'; 
        } else {
          return 'en-SG';
        }
    }
    if (localStorage.getItem('preferredLanguage') !== null) {
        localStorage.removeItem('preferredLanguage');
    }
    if (localStorage.getItem('selectedLanguage') !== null) {
        localStorage.removeItem('selectedLanguage');
    }
    function redirectCurrentLanguage(language) {
        let urlCurrentLanguage = $(`.header-lang-content-item[data-lang-code= ${language}]`).attr('href');
            if(urlCurrentLanguage){
                window.location.href = urlCurrentLanguage;
            }
    }
    function activeLanguage() {
        const $headerLangBtn = $('.header-lang-btn');
        const $headerLangMain = $('.header-lang-main');
        const $headerLangNationItems = $('.header-lang-nation-item');
        const $headerLangContentInner = $('.header-lang-content-inner');
        const $headerLangContentLists = $('.header-lang-content-list');
        const $headerLangContentItems = $('.header-lang-content-item');
        const $html = $('html');
        const $header = $('.header');
        const langPaths = ['hk-zh-hant', 'hk-en'];
        const pathname = window.location.pathname;
        const lastSegment = pathname.split('/').pop();
        const allowedRoutesLive = ['privacy-policy', 'app-terms-and-conditions', 'app-risk-disclosures', 'app-fund-documents', '/documents', 'faqs', 'about-us', 'waitlist', 'contact-us'];
        const allowedRoutesStagging = ['privacy-policy', 'app-terms-and-conditions', 'app-risk-disclosures', 'app-fund-documents', '/documents', 'faqs', 'about-us', 'waitlist', 'contact-us'];
        const allowedRoutes = isStagging() ? allowedRoutesStagging : allowedRoutesLive;
        // pathname.includes('hk-en') hoặc  pathname.includes('hk-zh-hant') for shouldSkipRedirect should not redirect

        const shouldSkipRedirect = (pathname.includes('hk-en') || pathname.includes('hk-zh-hant')) && allowedRoutes.some(route => route.startsWith('/') ? pathname.includes(route) : lastSegment === route);
        if (!shouldSkipRedirect) {
            const matchedLang = langPaths.find(lang => new RegExp(`^/${lang}/.+`).test(pathname));
            if (matchedLang) {
                window.location.replace(`/${matchedLang}`);
                return;
            }
        }

        $headerLangBtn.on('click', function(e) {
            e.preventDefault();
            $(this).toggleClass('active');
            $headerLangMain.toggleClass('active');
        });

        const animateHeight = (index) => {
            const $targetList = $headerLangContentLists.eq(index);
            const heightCurrent = $headerLangContentInner.height();
            const heightWillChange = $targetList.height();

            $headerLangContentLists.removeClass('active');

            if (heightCurrent > heightWillChange) {
                $targetList.addClass('active');
                setTimeout(() => $headerLangContentInner.height(heightWillChange), 200);
            } else {
                $headerLangContentInner.height(heightWillChange);
                setTimeout(() => $targetList.addClass('active'), 200);
            }
        };

        const handleNationItemInteraction = function() {
            if ($(this).hasClass('active')) return;

            const index = $(this).index();
            $headerLangNationItems.removeClass('active');
            $(this).addClass('active');
            animateHeight(index);
        };
        if (viewport.w > 991) {
            $headerLangNationItems.hover(handleNationItemInteraction);
        } else {
            $headerLangNationItems.on('click', function(e) {
                e.preventDefault();
                handleNationItemInteraction.call(this, e);
            });
        }

        const initLang = () => {
            const langCodes = $headerLangContentItems.map(function() {
                return $(this).data('lang-subdomain');
            }).get().filter(Boolean);

            const langPattern = new RegExp(`^/(${langCodes.join('|')})(/|$)`);
            const baseUrl = window.location.origin;
            const search = window.location.search || '';
            const hash = window.location.hash || '';
            $headerLangContentItems.each(function() {
                const $this = $(this);
                const langSubDomain = $this.data('lang-subdomain');
                const isDefault = $this.data('lang-default');
                const languageCodeItem = $this.attr('data-lang-code');
                let cleanPathname = pathname.replace(langPattern, '').replace(/^\/+/, '');

                const newUrl = langSubDomain
                    ? `${baseUrl}/${langSubDomain}${cleanPathname ? '/' + cleanPathname : ''}${search}${hash}`
                    : `${baseUrl}/${cleanPathname}${search}${hash}`;

                $this.attr('href', newUrl);

                if (isDefault) {
                    const indexParent = $this.closest('.header-lang-content-list').index();
                    $headerLangNationItems.eq(indexParent)
                        .attr('href', newUrl)
                        .attr('data-lang-code', languageCodeItem);
                }

                $this.on('click', function(e) {
                    if ($this.hasClass('active')) {
                        e.preventDefault();
                    }
                });
            });

            const currentLang = $html.attr('lang');
            if (!currentLang) return;
            if (currentLang !== 'en-SG' && $('.language-coming').length) {
                $header.addClass('dark-mode');
            }
            const $activeLangItem = $headerLangContentItems.filter(`[data-lang-code="${currentLang}"]`);
            if (!$activeLangItem.length) return;

            $activeLangItem.addClass('active');
            const displayName = $activeLangItem.attr('data-lang-name');
            const flagUrl = $activeLangItem.attr('data-flag');
            const indexList = $activeLangItem.closest('.header-lang-content-list').index();

            $('.header-lang-txt').text(displayName);
            $('.header-lang-ic img').attr('src', flagUrl);
            $headerLangContentInner.height($headerLangContentLists.eq(indexList).height());
            $headerLangContentLists.eq(indexList).addClass('active');
            $headerLangNationItems.eq(indexList).addClass('active');
        };

        initLang();
    }
    activeLanguage();
    function checkFirstPathIsHK() {
        var segments = window.location.pathname.split("/").filter(function(s) {
            return s.length > 0;
        });
        return segments.length > 0 && segments[0].toLowerCase() === "hk-en";
    }
    let firstLoad = sessionStorage.getItem('firstLoad');
    if(!firstLoad && !checkFirstPathIsHK()){
        let currentLang = $('html').attr('lang');
        let suggestedLanguage = suggestLanguage();
        if(currentLang != suggestedLanguage){
            redirectCurrentLanguage(suggestedLanguage);
        }
        sessionStorage.setItem('firstLoad', true)
    }
    function scrollDown() {
        header.addClass('on-hide')
        if($('.header-lang-main').length) {
            $('.header-lang-main').removeClass('active');
        }
        if($('.header-lang-btn').length) {
            $('.header-lang-btn').removeClass('active');
        }
        if ($('.blog-page').length) {
            $('.blog-header').removeClass('on-scroll')
        }
        if ($('.faq-page').length) {
            $('.faq-stick-wrap').removeClass('on-hide')
        }
        if ($(window).width() <= 991) {
            if ($('.faq-page').length) {
                $('.faq-toc-inner').removeClass('on-scroll')
            }
        }
        if ($(window).width() < 767) {
            if ($('.term-page').length ) {
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
        if ($(window).width() <= 991) {
            if ($('.faq-page').length) {
                $('.faq-toc-inner').addClass('on-scroll')
            }
        }
        if ($(window).width() < 767) {
            if ($('.term-page').length && !$('.sc-term-sub-nav').hasClass('w-condition-invisible')) {
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
    scrollUp()
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
    function sortAsc(arr, isSubpage = false, orderType, isFaq = false) {
        if (isSubpage) {
            if (isFaq) {
                return arr.sort((a,b) => {
                    if (a.data.cf_config[0][orderType] === null || a.data.cf_config[0][orderType] === undefined) {
                        return 1;
                    }
                    if (b.data.cf_config[0][orderType] === null || b.data.cf_config[0][orderType] === undefined) {
                        return -1;
                    }
                    if (a.data.cf_config[0][orderType] === b.data.cf_config[0][orderType]) {
                        return 0;
                    }
                    return a.data.cf_config[0][orderType] < b.data.cf_config[0][orderType] ? -1 : 1;
                })
            } else {
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
            }
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
        let threshold = inst.scroll > header.height();
        if ($('.announcement').length) {
            threshold = inst.scroll > header.height() + $('.announcement').height();
        }
         if ($('.topbar').length) {
            threshold = inst.scroll > header.height() + $('.topbar').height();
        }
        console.log(threshold)
        if (threshold) {
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
    function announcement() {
        $('.body').css('--open-top', `${$('.announcement').outerHeight() * -1}px`)
        console.log(`${$('.announcement').outerHeight() * -1}px`)
        $(window).on('resize', debounce(function() {
            if ($('.home-hero').length) {
                resizeHomeHero();
            }
            $('.body').css('--open-top', `${$('.announcement').outerHeight() * -1}px`)
        }))
    }
    if($('.announcement').length > 0) {
        announcement();
    }
    function topbar() {
        if ($('.topbar').length) {
            let pagiEl = $('<div class="topbar-pagi"></div>');
            $('.topbar-wrap').append(pagiEl);

            $('.topbar-wrap').addClass('swiper')
            $('.topbar-inner').addClass('swiper-wrapper')
            $('.topbar-item').addClass('swiper-slide')
            let topbarSwiper = new Swiper('.topbar-wrap', {
                slidesPerView: 1,
                pagination: {
                    el: '.topbar-pagi',
                    clickable: true,
                }
            })

            $('.body').css('--open-top', `${$('.topbar').outerHeight() * -1}px`)
            $(window).on('resize', debounce(function() {
                if ($('.home-hero').length) {
                    resizeHomeHero();
                }
                $('.body').css('--open-top', `${$('.topbar').outerHeight() * -1}px`)
            }))
            $('.topbar .topbar-item .trigger').on('click', function(e) {
                e.preventDefault();
                $(this).css('display','none');
                $(this).closest('.topbar-item').find('.topbar-body-inner').slideDown().addClass('active');
            })
        }
    }
    topbar();
    if (isTouchDevice()) {
        let lastScrollTop = 0;
        $(window).on('scroll', function(e) {
            let st = $(this).scrollTop();
            if (st > lastScrollTop && st > $('.announcement').height()){
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
                gsap.set('.nav-link-mb-info > *', {x: 60, autoAlpha: 0})
                gsap.set('.nav .mod-add .txt-16.nav-info-label, .nav .mod-add .txt-14.nav-info-item-label, .nav .mod-add .txt-14.nav-info-txt, .nav .mod-add .txt-14.nav-info-item-link', {autoAlpha: 0, x: 60})
                gsap.set('.nav .mod-down .txt-16.nav-info-label, .nav .mod-down .nav-qr-wrap, .nav .mod-down .nav-download-wrap', {autoAlpha: 0, x: 60})
                gsap.set('.nav .mod-down .nav-download-item-wrap', {x: 30})
                gsap.set('.nav-copy-wrap .txt-14.nav-copy-txt, .footer-social-wrap .txt-14.nav-social-label', {autoAlpha: 0, x: 60})
                gsap.set('.footer-social-wrap .footer-social-link.mod-nav', {autoAlpha: 0, x: 20})
                gsap.set('.nav .nav-bottom-line', {scaleX: 0, autoAlpha: 0})

                $('.nav').addClass('active');
                $('.header').addClass('on-open');
                if ( $('.announcement').length) {
                    $('.sticky-wrap').addClass('on-open');
                    $('.body').css('--open-top', `${$('.announcement').outerHeight() * -1}px`)
                }
                if ($('.topbar').length ) {
                    $('.sticky-wrap').addClass('on-open');
                    $('.body').css('--open-top', `${$('.topbar').outerHeight() * -1}px`)
                }
                if (!isTouchDevice()) {
                    lenis.stop();
                } else {
                    header.removeClass('on-hide')
                    $('body').css('overflow', 'hidden');
                }
            }
        })
        openNavTl.defaultEase = Power1.easeInOut;
        openNavTl
        .to('.nav-right-wrap', {xPercent: 0, duration: .6}, '0')
        .to('.nav-link', {xPercent: 0, autoAlpha:1, duration: .4, stagger: .04}, '<+=.3')

        .to('.nav-link-mb-info > *', {x: 0, autoAlpha: 1, stagger: .04, duration: .3}, '.65')

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
                if ($('.topbar').length || $('.announcement').length) {
                    $('.sticky-wrap').removeClass('on-open');
                    // $('.body').css('--open-top', `0px`)
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
        if ($(window).width() <= 991) {
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
                if ($(window).width() > 991) {
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
                }
            })
        }
        if ($('[data-video]').length >= 1) {
            $('[data-video]').on('click', function (e) {
                e.preventDefault();
                if ($(this).attr('data-video') === 'open') {
                    lenis.stop();
                    $('.popup-wrap-vid').addClass('active');
                } else if ($(this).attr('data-video') === 'close') {
                    lenis.start();
                    $('.popup-wrap-vid').removeClass('active');
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
        if ($('.footer-marquee-txt').length >= 1) {
            let ftMarqueeTxt = $('.footer-marquee-txt');
            $('.footer-marquee-txt-wrap').append(ftMarqueeTxt.clone());
            $('.footer-marquee-txt-wrap').append(ftMarqueeTxt.clone());
            $('.footer-marquee-txt-wrap').append(ftMarqueeTxt.clone());
            $('.footer-marquee-txt-wrap').append(ftMarqueeTxt.clone());


            gsap.to(".footer-marquee-txt-wrap", {
                duration: 16,
                ease: 'none',
                x: `-=${$('.footer-marquee-txt-wrap .footer-marquee-txt').eq(0).outerWidth()}`,
                repeat: -1
            });
        }
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
        let SGDbigRate = $('[data-rate-source-sgd="big"]').text();
        let SGDmediumRate = $('[data-rate-source-sgd="medium"]').text();
        let SGDsmallRate = $('[data-rate-source-sgd="small"]').text();
        let SGDotherRate = $('[data-rate-source-sgd="other"]').text();
        let SGDamount = $('[data-rate-source-sgd="amount"]').text();
        let SGDdate = $('[data-rate-source-sgd="date"]').text();
        let SGDwidthdrawal = $('[data-rate-source-sgd="withdrawal"]').text();
        let SGDminimumsum = $('[data-rate-source-sgd="minimum-sum"]').text();

        let SGDallRates = $(wrapper).find('[data-rate-sgd]');
        SGDallRates.each(function(e) {
            let type = $(this).attr('data-rate-sgd');
            if (type == 'big') {
                $(this).text(SGDbigRate)
            } else if (type == 'medium') {
                $(this).text(SGDmediumRate)
            } else if (type == 'small') {
                $(this).text(SGDsmallRate)
            } else if (type == 'amount') {
                $(this).text(SGDamount)
            } else if (type == 'date') {
                $(this).text(SGDdate)
            } else if (type == 'other') {
                $(this).text(SGDotherRate)
            } else if (type == 'withdrawal') {
                $(this).text(SGDwidthdrawal)
            }else if (type == 'minimum-sum') {
                $(this).text(SGDminimumsum)
            }else if (type == 'fixed') {
                // $(this).text(fixedRate)
            }
        })

        let USDbigRate = $('[data-rate-source-usd="big"]').text();
        let USDmediumRate = $('[data-rate-source-usd="medium"]').text();
        let USDsmallRate = $('[data-rate-source-usd="small"]').text();
        let USDotherRate = $('[data-rate-source-usd="other"]').text();
        // let USDfixedRate = $('[data-rate-source-usd="fixed"]').text();
        let USDamount = $('[data-rate-source-usd="amount"]').text();
        let USDdate = $('[data-rate-source-usd="date"]').text();
        let USDwidthdrawal = $('[data-rate-source-usd="withdrawal"]').text();
        let USDminimiumsum = $('[data-rate-source-usd="minimum-sum"]').text();
        let USDallRates = $(wrapper).find('[data-rate-usd]');
        USDallRates.each(function(e) {
            let type = $(this).attr('data-rate-usd');
            if (type == 'big') {
                $(this).text(USDbigRate)
            } else if (type == 'medium') {
                $(this).text(USDmediumRate)
            } else if (type == 'small') {
                $(this).text(USDsmallRate)
            } else if (type == 'amount') {
                $(this).text(USDamount)
            } else if (type == 'date') {
                $(this).text(USDdate)
            } else if (type == 'other') {
                $(this).text(USDotherRate)
            } else if (type == 'withdrawal') {
                $(this).text(USDwidthdrawal)
            }else if (type == 'minimum-sum') {
                $(this).text(USDminimiumsum)
            }else if (type == 'fixed') {
                // $(this).text(USDfixedRate)
            }
        })
    }
    function getAllDynamicData(richtextClass) {
        let wrapper = $(richtextClass)
        let allLink = wrapper.find('a')

        allLink.each(function(idx, item) {
            let href = $(item).attr('href')
            if (href.includes('https://[data-rate')) {
                let type = href.replace('https://', '').replace('http://', '').replace('[data-rate-', '').replace(']', '').includes('usd') ? 'usd' : 'sgd'
                let rate = href.replace('https://', '').replace('http://', '').replace(`[data-rate-${type}=`, '').replace(']', '')
                let newDom = $('<span></span>');
                if($(item).html().includes('strong')){
                    newDom = $('<strong></strong>');
                } 
                
                let span = newDom
                    .html($(item).html())
                    .attr(`data-rate-${type}`, rate);
                console.log(span.html())
                $(item).replaceWith(span);
            }
        })
        updateInterestRate(richtextClass)
    }
    getAllDynamicData('.main')
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
            blueshift.track("lead_submitted", {
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
            blueshift.track("lead_submitted", {
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
                el.find('.float-title').text('The link to download the app is on its way to you.')
                el.find('.float-sub').removeClass('hidden')
                el.find('.float-sub').text('Check your SMS inbox and sign up now!')
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
            // console.log($('.popup-content-form-inner .popup-input[name="phone-popup"]').val())
            // if (window.location.href.includes('webflow.io')) {
            let phone_number_input=$('.popup-content-form-inner .popup-input.phone-region').text() +' '+ $('.popup-content-form-inner .popup-input[name="phone-popup"]').val();
            $('.popup-success-sub span[data-popup="tel"]').text(phone_number_input)
            // }
            setTimeout(() => {
                $('.popup-content-form-inner').css('display','none')
                $('.popup-form-success').css('display','block')
                $('.popup-wrap').find('[data-form="form"]').trigger('reset')
            }, 1000);
        }
        // if (window.location.href.includes('webflow.io')) {
        $('.popup-succes-redirect-wrap').on('click', function(e){
            e.preventDefault();
            $('.popup-content-form-inner').css('display','block')
            $('.popup-form-success').css('display','none')
            $('.popup-wrap').find('[data-form="form"]').trigger('reset')
        })
        // }
    }
    function formSubscribeTrigger() {
        //Submit
        let allForm = $('[data-form="form"]');
        allForm.each(function(i, form) {
            $(form).on('submit', function(e) {
                const valInputCheck=$(this).find('.bp-trap').val();
                console.log(valInputCheck)
                e.preventDefault();
                if(valInputCheck=='' || valInputCheck== undefined){
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
                }
                else{
                return;
                }

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
            $(form).find('.popup-input, #PhoneNumber-2').on('input', function() {
                let value = $(this).val().replace(/\s+/g, ''); // Remove existing spaces
                value = value.match(/.{1,4}/g)?.join(' ') || value; // Add spaces every 4 characters
                $(this).val(value);
            });

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
    function resetScroll() {
        let hash = window.location.hash;
        let param = window.location.search;
        let target;
        if (hash) {
            if ($(hash).length) {
                target = $(hash).offset().top;
            } else {
                target = 0;
            }
        } else {
            target = 0;
        }
        if (param === '?risk=readdisclosure') {
            target = $('#risk-and-disclaimer').offset().top;
        }
        if (!isTouchDevice()) {
            lenis.stop()
            requestAnimationFrame(() => {
                // lenis.scrollTo(target, {duration: .001, force: true, immediate: true})
                window.scrollTo({
                    top: target,
                    left: 0,
                    behavior: "instant",
                });
                requestAnimationFrame(() => {
                    lenis.start()
                })
            })
        } else {
            window.scrollTo({
                top: target,
                left: 0,
                behavior: "instant",
            });
        }
    }
    resetScroll();

    const SCRIPT = {};
    SCRIPT.homeScript = () => {
        function homeViewportHandle() {
            if ($('.sc-home-hero').length && $(window).width() > 991) {
                let originalHeroHeight = $('.sc-home-hero').height();

                function resizeHomeHero() {
                    $('.sc-home-hero').removeClass('on-vp-sm');
                    originalHeroHeight = $('.sc-home-hero').height();
                    let winHeight = $(window).height();
                    winHeight = $(window).height() - parseRem(80);
                    if (originalHeroHeight > winHeight) {
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
            gsap.set('.sc-home-hero .home-hero-img-human img', {y: $(window).width() > 767 ? 40 : 0, duration: .6}, '<=.3')
            homeIntroTl.from('.home-hero-content .home-hero-title', {y: 40, autoAlpha: 0, duration: .8, clearProps: 'all'}, '0')
            .from('.home-hero-content .home-hero-sub', {y: 40, autoAlpha: 0, duration: .8, clearProps: 'all'}, '0')
            .from('.home-hero-content .btn.mod-home-hero', {y: 40, autoAlpha: 0, duration: .8, clearProps: 'all'}, '0')
            // Human first
            .to('.sc-home-hero .home-hero-img-human img', {y: 0, autoAlpha: 1, duration: .6}, '<=.3')
            //.from('.sc-home-hero .home-hero-rate-wrap', {y: 40, autoAlpha: 0, duration: .6}, '>=0')
            .to('.sc-home-hero .home-hero-img-c-bg, .sc-home-hero .home-hero-rate-wrap', {opacity: 1, duration: .6}, '>=0')
            .from('.sc-home-hero .home-hero-img-c-bg img, .sc-home-hero .home-hero-rate-wrap', {y: 40, duration: .6}, '<=0')
        }
        homeHeroIntro();
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
            .to('.home-hero-img-human img', {y: $(window).width() > 767 ? humanOffset * unit : 0, ease: 'none'}, '0')
            .to('.home-hero-img-c-bg img', {y: $(window).width() > 767 ? -humanOffset * unit : 0, ease: 'none'}, '0')

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
        function homeRich() {
            var TxtType = function (el, toRotate, period) {
                this.toRotate = toRotate;
                this.el = el;
                this.loopNum = 0;
                this.period = parseInt(period, 10) || 2000;
                this.txt = "";
                this.isDeleting = false;
                this.tick();
            };
            
            TxtType.prototype.tick = function () {
                var i = this.loopNum % this.toRotate.length;
                var fullTxt = this.toRotate[i];
                
                if (this.isDeleting) {
                    this.txt = fullTxt.substring(0, this.txt.length - 1);
                } else {
                    this.txt = fullTxt.substring(0, this.txt.length + 1);
                }
                
                // Tạo HTML với từng ký tự trong span và thêm cursor
                var html = '';
                for (var j = 0; j < this.txt.length; j++) {
                    html += '<span class="char-typing">' + this.txt[j] + '</span>';
                }
                // Thêm cursor nháy
                html += '<span class="typing-cursor"></span>';
                
                this.el.innerHTML = html;
                
                var that = this;
                var delta = 100;
                
                if (this.isDeleting) {
                    delta = 50;
                }
                
                if (!this.isDeleting && this.txt === fullTxt) {
                    delta = this.period;
                    this.isDeleting = true;
                } else if (this.isDeleting && this.txt === "") {
                    this.isDeleting = false;
                    this.loopNum++;
                    delta = 400;
                }
                
                setTimeout(function () {
                    that.tick();
                }, delta);
            };
            
            $('.sc-home-rich-title.item-underline').each(function() {
                var $element = $(this);
                var dataText = $element.attr('data-text-typing');
                var period = $element.attr('data-period') || 2000;
                
                if (dataText) {
                    var toRotate = $.map(dataText.split(','), $.trim);
                    new TxtType(this, toRotate, period);
                }
            });
        }
        function homeEnjoy() {
            if($('.sc-home-enjoy').length == 0) return;
            let tlScroll = gsap.timeline({
                scrollTrigger: {
                  trigger: '.sc-home-enjoy',
                  start:  'top-=50% bottom' ,
                  end:  'bottom top' ,
                  scrub: 1,
                }
            });
            let tlFirst = gsap.timeline({
                onComplete: () => {
                    tlScroll
                        .fromTo('.sc-home-enjoy-deco', { yPercent: 20 }, { yPercent: -55 , ease: 'none'}, 0)
                }
            })
        }
        homeEnjoy();
        homeRich();
        function homeBenefSetup() {
            if ($(window).outerWidth() > 991) {
                let cloneSwiper = $('.home-benef-main.swiper').clone().removeClass('mod-bot').addClass('mod-top');
                $('.home-benef-main-wrap').append(cloneSwiper);
            } 
        }
        homeBenefSetup();
        function homeBenefHandleMobile() {
            if ($(window).outerWidth() <= 991 && $(window).outerWidth() > 767) {
                console.log('init swiper')
                let homeBenefSwiper = new Swiper('.home-benef-main.mod-bot', {
                    slidesPerView: "auto",
                    spaceBetween: 1.4 * unit,
                    scrollbar: {
                        el: '.home-benef-bar-outer',
                    },
                    breakpoints: {
                        767: {
                            slidesPerView: 2,
                        },
                        479: {
                            slidesPerView: 1,
                            spaceBetween: 0,
                        }
                    }
                });
            }
            if ($(window).outerWidth() <= 480) {
                $('.home-benef-item').on('click', function (e) {
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active');
                        $(this).find('.home-benef-item-sub').slideUp();
                    }
                    else {
                        $('.home-benef-item').not($(this)).removeClass('active');
                        $(this).addClass('active')

                        $('.home-benef-item').not($(this)).find('.home-benef-item-sub').slideUp();
                        $(this).find('.home-benef-item-sub').slideDown();
                    }
                })
                $('.home-benef-item').eq(0).trigger('click');
            }
        }
        homeBenefHandleMobile()
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
                if($('.home-secu-main-wrap').length > 0){
                    $('.home-secu-main-wrap').addClass('swiper')
                    $('.home-secu-main').addClass('swiper-wrapper')
                    $('.home-secu-item').addClass('swiper-slide')
                    const homeSecuSwiper = new Swiper('.swiper.home-secu-main-wrap', {
                        slidesPerView: "auto",
                        spaceBetween: 2.4 * unit,
                    })
                }
                if($('.home-secu-hk-main-wrap').length > 0){
                    $('.home-secu-hk-main-wrap').addClass('swiper')
                    $('.home-secu-hk-main').addClass('swiper-wrapper')
                    $('.home-secu-hk-item').addClass('swiper-slide')
                    const homeSecuSwiper = new Swiper('.swiper.home-secu-hk-main-wrap', {
                        slidesPerView: "auto",
                        spaceBetween: 2.4 * unit,
                    })
                }
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
        function homeVisa() {
            if(viewport.w > 480){
                var swiper = new Swiper(".home-visa-card-inner", {
                    direction: "vertical",
                    slidesPerView: 4,
                    spaceBetween: parseRem(20),
                    loop: true,
                    duration: 600,
                    autoplay: {
                        delay: 2000, 
                        disableOnInteraction: false, 
                        reverseDirection: true,
                    },
                    allowTouchMove: false, 
                });
            }
            else {
                var swiper = new Swiper(".home-visa-card-inner", {
                    direction: "vertical",
                    slidesPerView: 4,
                    spaceBetween: parseRem(20),
                    loop: true,
                    duration: 600,
                    allowTouchMove: false, 
                });
            }
        }
        if($('.sc-home-visa').length > 0){
            homeVisa();
        }
        homeTestiHandleNew();
        function homeTestiHandleNew() {
            console.log('init new testi')
            $('.home-testi-item').each(function(e) {
                let rate = Number($(this).find('.data-rate').text());
                let stars = $(this).find('.ic-star');
                for (let x = 0; x < rate; x++) {
                    stars.eq(x).addClass('rate-true')
                }
            })
            if ($(window).width() > 991) {
                $('.home-testi-main').on('mouseenter', function(e) {
                    if (!isScrolling) {
                        lenis.stop();
                    }
                })
                $('.home-testi-main').on('mouseleave', function(e) {
                    if (!isScrolling) {
                        lenis.start();
                    }
                })

                let distanceVal;
                if ($('.home-testi-col-inner.mod-right').height() >= $('.home-testi-col-inner.mod-left').height()) {
                    distanceVal = $('.home-testi-col-inner.mod-right').outerHeight() - $('.home-testi-bg-wrap.background').height();
                } else {
                    distanceVal = $('.home-testi-col-inner.mod-left').outerHeight() - $('.home-testi-bg-wrap.background').height();
                }

                const homeTestiTl = new gsap.timeline({
                    paused: true,
                });
                homeTestiTl.to('.home-testi-bar-inner', {scaleX: 1, ease: 'none'})
                .fromTo('.home-testi-col-inner.mod-left', {yPercent: 0, ease: 'none'}, {y: -distanceVal, ease: 'none'},'0')
                .fromTo('.home-testi-col-inner.mod-right', {yPercent: 0, ease: 'none'}, {y: distanceVal, ease: 'none'},'0')

                let currProg = 0;
                $('.home-testi-main').on('wheel', function(e) {
                    currProg = currProg + e.originalEvent.deltaY > distanceVal ? distanceVal : currProg + e.originalEvent.deltaY < 0 ? 0 : currProg + e.originalEvent.deltaY;
                    let prog = currProg / distanceVal > 1 ? 1 : currProg / distanceVal < 0 ? 0 : currProg / distanceVal;
                    gsap.to(homeTestiTl, { duration: .8 * gsap.utils.clamp(.5,1,Math.abs(e.originalEvent.deltaY / 110)), progress: prog, ease: Power2.easeOut, overwrite: true});
                })

                // Extra scub video
                let homeTestiVid = document.querySelector('.mod-home-testi video')
                let isPlayed = false;
                const homeTestiVidTl = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.sc-home-testi-wrap',
                        start: 'top top+=60%',
                        end: 'bottom top+=40%',
                        onEnter() {
                            if (!isPlayed) {
                                homeTestiVid.play()
                                isPlayed = true
                            }
                        },
                    }
                });
            } else {
                const homeTestiSwiperMb = new Swiper('.swiper.home-testi-col-wrapper', {
                    slidesPerView: "auto",
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

                $('.home-testi-col-wrapper .load-ske').removeClass('load-ske')
            }
            if($('.home-card-title').length > 0){
                ScrollTrigger.create({
                    trigger: '.home-card-title',
                    start: 'center center',
                    end: 'center center',
                    once: true,
                    onEnter: () => {
                        homeCardHandle()
                    }
                })
            }
        }
        
        function homeGraphHandle() {
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-graph-main',
                    start: 'top center',
                }
            });
            tl
                .from('.home-graph-main-item', {autoAlpha: 0, yPercent: 50, stagger: .14, duration: .6})
                .from('.home-graph-note', {autoAlpha: 0, yPercent: 50, stagger: .14, duration: .6}, '< =.2')
            
            $('.home-graph-note-txt [href="#FAQs"]').on('click', function(e) {
                let faqEl = $('.home-faq-item#what-is-the-chocolate-top-up-programme-and-its-qualifying-period');
                if (!faqEl.hasClass('active')) {
                    faqEl.find('.home-faq-item-head').trigger('click')
                }
            })
            if($('.sc-home-graph-tab-item ').length > 0) {
                $('.sc-home-graph-content').css('height', $('.sc-home-graph-item').eq(0).outerHeight())
                $('.sc-home-graph-tab-item').on('click', function(e){
                    e.preventDefault();
                    let index = $(this).index();
                    let heigthItem = $('.sc-home-graph-item').eq(index).outerHeight();
                    $('.sc-home-graph-content').css('height', heigthItem)
                    $('.sc-home-graph-tab-item').removeClass('active');
                    $(this).addClass('active');
                    $('.sc-home-graph-item').removeClass('active')
                    $('.sc-home-graph-item').eq(index).addClass('active')
                })
            }
        }
        homeGraphHandle();
        function homeWork() {
            const homeWorkSwiper = new Swiper('.home-work-main-wrap', {
                slidesPerView: 1,
                spaceBetween:parseRem(20),
                breakpoints: {
                    767: {
                        slidesPerView: 2,
                        spaceBetween: parseRem(40),
                    },
                    991: {
                        slidesPerView: 4,
                        spaceBetween: parseRem(40),
                        },
                }
    
            });
        }
        if( $('.sc-home-work').length > 0){ 
            homeWork();
        }
        function homeCardHandle() {
            let allowPlay = true;
            const vidAction = {
                reset: () => {
                    $('#homeCardVidHead').get(0).pause();
                    $('#homeCardVidTail').get(0).pause();
                    $('#homeCardVidHead').get(0).currentTime = 0;
                    $('#homeCardVidTail').get(0).currentTime = 0;
                    $('#homeCardVidTail').addClass('hidden')
                    $('#homeCardVidHead').removeClass('hidden')
                },
                play: () => {
                    setTimeout(() => {
                        allowPlay = false
                        $('#homeCardVidHead').get(0).play()
                        $('#homeCardVidHead').get(0).addEventListener('ended',() => {
                            $('#homeCardVidHead').addClass('hidden')
                            $('#homeCardVidTail').get(0).play()
                            $('#homeCardVidTail').removeClass('hidden')
                            setTimeout(() => {
                                // allowPlay = true
                            }, $('#homeCardVidTail').get(0).duration * 500);
                        }, false);
                    }, 1);
                }
            }
            if (allowPlay) {
                vidAction.reset();
                vidAction.play();
            }
        }

        function homeGetFaq() {
                console.log('faq stagging')
                animateFaq();
                scrollToFaq();
        }
        homeGetFaq();

        function homeSocial() {
            $.fn.hasAttr = function(name) {
                return this.attr(name) !== undefined;
            };

            let requestId;
            const loop = (time) => {
                requestId = undefined;

                preventLenis();
                start();
                if ($('.eapps-instagram-feed-popup-inner').hasAttr('data-lenis-prevent')) {
                    stop();
                }
            }
            const start = () => {
                if (!requestId) {
                    requestId = window.requestAnimationFrame(loop);
                }
            }
            const stop = () => {
                    if (requestId) {
                    window.cancelAnimationFrame(requestId);
                    requestId = undefined;
                }
            }
            const preventLenis = () => {
                if ($('.eapps-widget.eapps-instagram-feed-popup-visible').length !== 0) {
                    $('.eapps-instagram-feed-popup-inner').attr('data-lenis-prevent', '');
                }
            }

            const instaFeed = document.querySelector(".home-insta-feed")
            const observerInsta = new IntersectionObserver(
                ([e]) => {
                    if (e.isIntersecting) {
                        start();
                        observerInsta.unobserve(e.target);
                    }
            });

            observerInsta.observe(instaFeed);
        }
        homeSocial();
        function homeWithDraw(){
            if($(window).outerWidth() < 479){
                $('.sc-home-withdraw-item').on('click', function (e) {
                    console.log('khanh')
                    let index = $(this).index();
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active');

                        $(this).find('.sc-home-withdraw-item-sub-wrap').slideUp();
                    }
                    else {
                        $('.sc-home-withdraw-item').not($(this)).removeClass('active');
                        $(this).addClass('active')

                        $('.sc-home-withdraw-item').not($(this)).find('.sc-home-withdraw-item-sub-wrap').slideUp();
                        $(this).find('.sc-home-withdraw-item-sub-wrap').slideDown();
                    }
                })
                $('.sc-home-withdraw-item').eq(0).trigger('click');
            }
        }
        homeWithDraw();
    }
    SCRIPT.howItWorksScript = () => {
        const howWorkSwiper = new Swiper('.how-work-main-wrap', {
            slidesPerView: 1,
            spaceBetween: 4 * unit,
            scrollbar: {
                el: '.how-work-progress-bar'
            },
            breakpoints: {
                767: {
                    slidesPerView: 2,
                    spaceBetween: parseRem(40),
                },
                991: {
                    slidesPerView: 4,
                    spaceBetween: parseRem(40),
                    },
            }

        });
        function homeGetFaq() {
            animateFaq();
            scrollToFaq();
            
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

        function howExpect() {
            if ($(window).width() > 991) {
                let allWidth = []
                let allHeight = []
                function getAllHeight() {
                    $('.how-expect-card-wrap, .how-expect-card-wrap *').css('transition', 'none')
                    allWidth = []
                    allHeight = []
                    $('.how-expect-card-wrap').css('--default-height', ``)
                    $('.how-expect-card-sub').each((idx, el) => {
                        $('.how-expect-card-wrap').removeClass('active-1 active-2 active-3')
                        $('.how-expect-card-wrap').addClass(`active-${idx+1}`)
                        $('.how-expect-card').removeClass('active')
                        $('.how-expect-card').addClass('de-active')
                        $('.how-expect-card').eq(idx).addClass('active')
                        $('.how-expect-card').eq(idx).removeClass('de-active')
                        allWidth.push($(el).width())
                        allHeight.push($(el).height())
                    })
                    $('.how-expect-card-wrap, .how-expect-card-wrap *').attr('style', '')
                    $('.how-expect-card-wrap').removeClass('active-1 active-2 active-3')
                    $('.how-expect-card').removeClass('active')
                    $('.how-expect-card').removeClass('de-active')
                    // console.log(Math.max(...allHeight))
                    $('.how-expect-card-wrap').css('--default-height', `${Math.max(...allHeight)}px`)
                }
                getAllHeight()
                $(window).on('resize', debounce(function() {
                    getAllHeight()
                }, 100))
                $('.how-expect-card').on('click', function(e) {
                    e.preventDefault()
                    let target = $(this).index()
                    if ($(this).hasClass('active')) {
                    } else {
                        activeBox(target, this)
                    }
                })
                function activeBox(index, el) {
                    $('.how-expect-card-wrap').removeClass('active-1 active-2 active-3')
                    $('.how-expect-card-wrap').addClass(`active active-${index+1}`)
                    $('.how-expect-card-wrap').css('--default-height', `${allHeight[index]}px`)
                    $('.how-expect-card .how-expect-card-sub').attr('style', '')
                    $(el).find('.how-expect-card-sub').css('--default-width', `${allWidth[index]}px`)
                    $('.how-expect-card').attr('style', '')
                    $('.how-expect-card').removeClass('active')
                    $('.how-expect-card').addClass('de-active')
                    $(el).addClass('active')
                    $(el).removeClass('de-active')
                }
                activeBox(0, $('.how-expect-card').eq(0))
            } else {
                $('.how-expect-card-trigger').on('click', function(e) {
                    if ($(this).closest('.how-expect-card').hasClass('active')) {
                        $('.how-expect-card').removeClass('active')
                        $(this).closest('.how-expect-card').find('.how-expect-card-sub').slideUp()
                    } else {
                        $('.how-expect-card').removeClass('active')
                        $('.how-expect-card-sub').slideUp()
                        $(this).closest('.how-expect-card').addClass('active')
                        $(this).closest('.how-expect-card').find('.how-expect-card-sub').slideDown()
                    }
                })
            }
        }
        howExpect()
        function howDraw() {
            
            if(viewport.w > 991) {
                let widthItem = $('.sc-home-withdraw-item-avai.active').width();
                let widthItemTitle = $('.sc-home-withdraw-item-avai.active .sc-home-withdraw-item-avai-title-wrap').width();
                let widhtItemSubInner  = widthItem - widthItemTitle - parseFloat($('.sc-home-withdraw-item-avai-sub-wrap').css('padding-left'));
                $('.sc-home-withdraw-item-avai-sub-inner').css('width', widhtItemSubInner);
            }
            else {
                $('.sc-home-withdraw-item-avai').eq(0).find('.sc-home-withdraw-item-avai-sub-wrap').show();
                let indexActiveTab = $('.sc-home-withdraw-tab-item.active').index();
                $('.sc-home-withdraw-item-wrap').eq(indexActiveTab).show();
            }
            $('.sc-home-withdraw-tab-item').on('click', function(){
                if($(this).hasClass('active')) return;
                
                let $parent = $(this).closest('.sc-home-withdraw');
                
                $parent.find('.sc-home-withdraw-tab-item').removeClass('active');
                $(this).addClass('active');
                
                let index = $(this).index();
                $parent.find('.sc-home-withdraw-item-wrap').removeClass('active');
                $parent.find('.sc-home-withdraw-item-wrap').eq(index).addClass('active');
                
                if(viewport.w < 992){
                    $parent.find('.sc-home-withdraw-item-wrap').hide();
                    $parent.find('.sc-home-withdraw-item-wrap').eq(index).show();
                }
            })
            
            $(".sc-home-withdraw-item-avai").on('click', function(){
                let $parent = $(this).closest('.sc-home-withdraw');
                
                if(viewport.w > 991){
                    if($(this).hasClass('active')) return;
                    $parent.find(".sc-home-withdraw-item-avai").removeClass('active');
                    $(this).addClass('active');
                }
                else {
                    $(this).toggleClass('active');
                }
                
                if(viewport.w < 992){
                    $(this).find('.sc-home-withdraw-item-avai-sub-wrap').slideToggle(400);
                }
            })
            
            $(".sc-home-withdraw-item").on('click', function(){
                if(viewport.w < 992){
                    $(this).toggleClass('active');
                    $(this).find('.sc-home-withdraw-item-sub-wrap').slideToggle(400);
                }
            })
        }
        if(isStagging()){
            howDraw();
        }
    }
    SCRIPT.whyUsScript = () => {
        function aboutImpact() {
            $('.sc-abt-impact-item').on('click', function(){
                $(this).find('.sc-abt-impact-item-sub').slideToggle();
                $(this).toggleClass('active');
            })
            if(viewport.w < 480) {
                $('.sc-abt-impact-item').eq(0).click();
            }
        }
        if($('.sc-abt-impact').length > 0) {
            aboutImpact();
        }
        function aboutGetFaq() {
            animateFaq();
            scrollToFaq();
        }
        aboutGetFaq();

        function aboutTeamHandle() {
            const aboutTeamSwiper = new Swiper('.swiper.abt-team-cms', {
                slidesPerView: 1,
                spaceBetween: 2.8 * unit,
                mousewheel: {
                    enabled: true,
                    forceToAxis: true,
                },
                freeMode: true,
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
            requestAnimationFrame(() => {
                $('.abt-team-cms').removeClass('on-hide')
            })
            console.log('handleMobileDownload')
        }
        aboutTeamHandle()


        function aboutNameVideo() {
            $('.abt-name-vid-wrap').addClass('active')
            $('.abt-name-vid-wrap .el-video').get(0).currentTime = 1.84;
            $('.abt-name-vid-trigger-link').on('click', function(e) {
                e.preventDefault();
                $('.abt-name-vid-trigger').addClass('hidden')
                $('.abt-name-vid-wrap .el-video').attr('controls', true)
                $('.abt-name-vid-wrap .el-video').get(0).play();
            })
        }
        aboutNameVideo()
    }
    SCRIPT.blogScript = () => {
        function latestUpdate() {
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
        latestUpdate();
    }
    SCRIPT.blogCatScript = () => {
    }
    SCRIPT.blogAuthScript = () => {
    }
    SCRIPT.articleScript = () => {
        function updateMobileTable() {
            if ($(window).width() < 767) {
                $('.w-embed:has(.embed-tab)').css({
                    'padding-inline': '2rem',
                    'margin-inline':'-2rem',
                    'overflow':'scroll'
                })   
            }
        }
        function socialShare() {
            let currentUrl = window.location.href;
            let allLink = $('[blog-share]');
            allLink.each(function(i) {
                let type = $(this).attr('blog-share');
                if (type == 'linkedin') {
                    $(this).attr("href", `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`);
                } else if (type == 'facebook') {
                    $(this).attr("href", `https://www.facebook.com/sharer.php?u=${currentUrl}`);
                } else if (type == 'twitter') {
                    $(this).attr("href", `https://twitter.com/share?url=${currentUrl}`);
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
        function updateTabTable () {
            //Setup HTML
            let richtextEl = $('.art-layout-main-rictxt');

            richtextEl.find('a[href*="tab-table"]').each((idx, item) => {
                $(item)
                    .attr('href', '#')
                    .css('pointer-events', 'none')
                    .on('click', function(e) { e.preventDefault(); });

                $(item)
                    .closest('p')
                    .attr('data-tab-table', idx)
                    .addClass('tab-table-item')
                    .css('cursor', 'pointer');
            });

            const $tabItems = richtextEl.find('.tab-table-item');
            const $wrapItems = $('<div class="tab-table-item-wrapper"></div>');

            $tabItems.each(function(idx) {
                const $clone = $(this).clone(true);
                $clone.attr('data-tab-table', idx);
                $wrapItems.append($clone);
            });

            $tabItems.last().after($wrapItems);
            $tabItems.remove();

            richtextEl.find('.tab-table-content').each((idx, item) => {
                $(item).closest('.w-embed').attr('data-tab-table', idx).addClass('tab-table-content');
            })
            
            function activeTabTable(index) {
                $('.tab-table-item').removeClass('active');
                $('.tab-table-content').closest('.w-embed').hide();
                $('.tab-table-item').eq(index).addClass('active');
                $('.tab-table-content').closest('.w-embed').eq(index).show();
            }
            activeTabTable(0);
            richtextEl.find('.tab-table-item').on('click', function(e) {
                e.preventDefault();
                let index = $(this).attr('data-tab-table');
                activeTabTable(index);
            })
        }
        
        function currentUpdate() {
            console.log('update')
            socialShare();
            updateMobileTable();
            updateTabTable();
        }
        currentUpdate();
        
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

            if (url.includes('/article/')) {
                console.log('go')
                window.location.href = `/${page}?id=` + uid
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
                $('.sc-notfound-hero').remove()
                $('.notfound-wrap').removeClass('hidden')
                $('.sc-notfound').addClass('active')

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
            history.replaceState({},'',`${newPath + hash}`)
        }
        updateURL();

        let isAppTerm = !$('.sc-term-sub-nav').hasClass('w-condition-invisible') && $('.sc-term-sub-nav').length > 0;
        console.log('isAppTerm' + isAppTerm)
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
            $('.term-toc-wrap-inner.on-temp').addClass('active')
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

                        } else {
                            $('.sc-term-sub-nav, .sc-term-subnav-inner').removeClass('on-scroll')
                            $('.term-toc-wrap-overlay').removeClass('on-cus-scroll')
                        }
                        if ($('.header').hasClass('on-scroll') && !$('.header').hasClass('on-hide')) {
                            $('.sc-term-sub-nav, .term-toc-wrap-overlay').addClass('on-scroll-pushed')
                        } else {
                            $('.sc-term-sub-nav, .term-toc-wrap-overlay').removeClass('on-scroll-pushed')
                        }
                    } else {
                        $('.term-toc-wrap-overlay').addClass('on-cus-scroll')
                        if ($('.header').hasClass('on-scroll') && !$('.header').hasClass('on-hide')) {
                            $('.sc-term-sub-nav, .term-toc-wrap-overlay').addClass('on-scroll-pushed')
                        } else {
                            $('.sc-term-sub-nav, .term-toc-wrap-overlay').removeClass('on-scroll-pushed')
                        }
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
        termTabInit() //Hide for now

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
    SCRIPT.cardsTermsScript = () => {
        console.log('page card term')
        const hash = window.location.hash;
        function createToc() {
            console.log('create toc')
            // Create toc items
            $('[data-el="richtext"]').each((index, el) => {
                let allTitle = $(el).find('h2');
                console.log(allTitle)
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
            $('.term-toc-wrap-inner.on-temp').addClass('active')
        }
        createToc();

        function termTabInit() {

            const activeTab = (index) => {
                $('.mod-term-subnav').removeClass('active');
                $('.mod-term-subnav').eq(index).addClass('active');
            }

            $('.mod-term-subnav').on('click', function(e) {
                e.preventDefault();
                if (!$(this).hasClass('active')) {
                    let index = $(this).attr('data-subnav');
                    activeTab(index);
                }
            })

            lenis.on('scroll', function(inst) {
                $('.term-toc-wrap-overlay').removeClass('on-scroll')
                if ($(window).width() > 768) {
                    if (inst.scroll > $('.term-outer-wrap').offset().top) {
                        $('.sc-term-sub-nav, .sc-term-subnav-inner').addClass('on-scroll')

                    } else {
                        $('.sc-term-sub-nav, .sc-term-subnav-inner').removeClass('on-scroll')
                        $('.term-toc-wrap-overlay').removeClass('on-cus-scroll')
                    }
                    if ($('.header').hasClass('on-scroll') && !$('.header').hasClass('on-hide')) {
                        $('.sc-term-sub-nav, .term-toc-wrap-overlay').addClass('on-scroll-pushed')
                    } else {
                        $('.sc-term-sub-nav, .term-toc-wrap-overlay').removeClass('on-scroll-pushed')
                    }
                } else {
                    if ($('.header').hasClass('on-scroll') && !$('.header').hasClass('on-hide')) {
                        $('.sc-term-sub-nav, .term-toc-wrap-overlay').addClass('on-scroll')
                    } else {
                        $('.sc-term-sub-nav, .term-toc-wrap-overlay').removeClass('on-scroll')
                    }
                }
            })

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
        updateUICateNew();
        faqInteraction();
        animateFaq();
        $('.faq-main-wrap').attr(schemaFAQParentAttrs);
        function updateUICateNew() {
            const stickySearchIcon = $('.faq-cate-inner .faq-stick-srch').eq(0);
            const itemSearch = $('.faq-srch-item').eq(0).clone();
            const listSearch = $('.faq-srch-drop-inner');
            listSearch.html('')
            $('.faq-cate-btn-list').prepend(stickySearchIcon);
            faqCateSwiper = new Swiper('.faq-cate-btn-wrap.swiper', {
                slidesPerView: 'auto',
                mousewheel: true,
                on: {
                    afterInit: () => {
                        $('.faq-stick-srch.mod-tb').addClass('after-init')
                    }
                }
            })
            $('.faq-cate-wrap').each((idx, faq) => {
                $(faq).find('.faq-cate-list-item').each((idx, item) => {
                    let newItemSearch  = itemSearch.clone();
                    let dataScroll = $(item).find('.home-faq-item').attr('id');
                    let title = $(item).find('.home-faq-item-ques').text();
                    newItemSearch.attr('data-scrollto', dataScroll);
                    newItemSearch.find('.txt-16').text(title);
                    listSearch.append(newItemSearch);
                })
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
                    setTimeout(() => {
                        lenis.scrollTo(`#${param.id}`, {offset: -scrollOffset})
                    }, 410);
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
                let compValue = value.toLowerCase().trim().replaceAll(' ','').replaceAll('-','');

                faqs.each((e) => {
                    let ques = faqs.eq(e).find('.txt-16').text()
                    let compQues = ques.toLowerCase().trim().replaceAll(' ','').replaceAll('-','');
                    let ans = faqs.eq(e).find('.hidden.data-faq-srch-body').text()
                    let compAns = ans.toLowerCase().trim().replaceAll(' ','').replaceAll('-','');
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
                if (!$(`#${faqId}`).find('.home-faq-item-head').hasClass('active')) {
                    $(`#${faqId}`).find('.home-faq-item-head').trigger('click')
                }
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
        const formSubmitEvent = (function () {
            const init = ({
                onlyWorkOnThisFormName,
                onStart,
                onSuccess,
                onFail
                }) => {
                    $(document).on('ajaxSend', function (event, xhr, settings) {
                        // onStart?.();
                        console.log('start send .....');
                        if (settings.url.includes("https://webflow.com/api/v1/form/")) {
                            const valInputCheck=$('form[data-name="contactUs"] .bp-trap').val();
                            console.log(valInputCheck)
                            if(valInputCheck=='' || valInputCheck== undefined){
                                onStart?.();
                            } 
                        }
                    });
                    $(document).on('ajaxComplete', function (event, xhr, settings) {
                        if (settings.url.includes("https://webflow.com/api/v1/form/")) {
                            const isSuccessful = xhr.status === 200
                            const isWorkOnAllForm = onlyWorkOnThisFormName == undefined
                            const isCorrectForm = !isWorkOnAllForm && settings.data.includes(getSanitizedFormName(onlyWorkOnThisFormName));
                            if (isWorkOnAllForm) {
                                if (isSuccessful) {
                                onSuccess?.()
                                } else {
                                onFail?.()
                                }
                            } else if (isCorrectForm) {
                                if (isSuccessful) {
                                onSuccess?.()
                                } else {
                                onFail?.()
                                }
                            }
                        }
                    });
            }
            function getSanitizedFormName(name) {
                return name.replaceAll(" ", "+")
            }
            return {
                init
            }
        })();
        formSubmitEvent.init({
            onlyWorkOnThisFormName: "contactUs",
            onStart:  () =>{
                $('form.ctc-form [data-form="submit"]').val('Please wait...')
            },
            onSuccess: () => {
                triggerFormSuccess('contact', 'contactUs');
                $('form.ctc-form [data-form="submit"]').val('Submit');
                $('form.ctc-form').trigger('reset')
            },
            onFail: () => {
                console.log('fail')
            }
        });
        $('.input-head').on('click', function(e) {
            if ($(this).closest('.input-select-wrap').find('.input-drop-wrap').hasClass('active')) {
                $(this).closest('.input-select-wrap').find('.input-drop-wrap').removeClass('active')
                $(this).closest('.input-select-wrap').find('.input-select-ic').removeClass('active')
            } else {
                $(this).closest('.input-select-wrap').find('.input-drop-wrap').addClass('active')
                $(this).closest('.input-select-wrap').find('.input-select-ic').addClass('active')
            }
        })
        $('.input-drop-link-wrap').on('click', function(e) {
            e.preventDefault();
            let text = $(this).find('.txt-16').text();
            $(this).closest('.input-select-wrap').find('.input-head').text(text)
            $(this).closest('.input-select-wrap').find('.input-field-line.input-hidden').val(text)
            $(this).closest('.input-select-wrap').find('.input-drop-wrap').removeClass('active')
            $(this).closest('.input-select-wrap').find('.input-select-ic').removeClass('active')
            $(this).closest('.input-select-wrap').find('.input-head').removeClass('no-value')
        })
        $(document).click(function(event) {
            var $target = $(event.target);
            if(!$target.closest('.input-select-wrap').length &&
            $('.input-drop-wrap').hasClass("active")) {
                $('.input-select-wrap').find('.input-drop-wrap').removeClass('active')
                $('.input-select-wrap').find('.input-select-ic').removeClass('active')
                if ($('.input-select-wrap').find('.input-head').text() != 'Subject') {
                    $('.input-select-wrap').find('.input-head').removeClass('no-value')
                } else {
                    $('.input-select-wrap').find('.input-head').addClass('no-value')
                }
            }
        });
    }
    SCRIPT.documentsScript = () => {
        function getAllDocs() {
            const getApi = [getAllDataByType('document_category'), getAllDataByType('fund_document')];
            Promise.all(getApi).then(([categories, docs]) => {
                let allCate = sortAsc(categories);
                let allDoc = sortAsc(docs);
                updateDocUI(allCate, allDoc);
                docInteraction();
                $('.sc-doc-main').find('.load-ske').addClass('loaded')
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
            $('.term-toc-head-txt').text($('.term-toc-item-link .term-toc-item-txt').eq(0).text())
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
    SCRIPT.documentsNewScript = () => {
        let cateStickyTemplate = $('.term-toc-item-link').eq(1).clone();
        function getAllDocs() {
            const getApi = [getAllDataByType('fund_document_category_parent'),getAllDataByType('document_category'), getAllDataByType('fund_document')];
            Promise.all(getApi).then(([category_parent,categories, docs]) => {
                let allCate = sortAsc(categories);
                let allDoc = sortAsc(docs);
                let categoryParent = sortAsc(category_parent);
                updateDocUI(categoryParent, allCate, allDoc);
                docInteraction();
                $('.sc-doc-main').find('.load-ske').addClass('loaded')
            })
        }
        // if(!isStagging()){
        //     getAllDocs();
        // }
        // else {
            updateTocUINew();
            docInteractionNew();
        // }
        function updateTocUINew() {
            $('.term-toc-inner').html('');
            let allCategories = $('.doc-main-content.active .doc-group-title');
            allCategories.each((index, el) => {
                let cateName = $(el).text();
                let cateUID = $(el).attr('data-title');
                console.log(el)
                let cateStickyHtml = cateStickyTemplate.clone();
                cateStickyHtml.find('.term-toc-item-number').text(`${index + 1}.`)
                cateStickyHtml.find('.term-toc-item-txt').text(cateName)
                cateStickyHtml.attr('data-toc', `${cateUID}`)
                console.log(cateStickyHtml)
                $('.term-toc-inner').append(cateStickyHtml)
            })
        }
        function updateDocUI(categoryParent,allCate, allDoc) {
            let cateItemTemplate = $('.doc-main-item-wrap').eq(0).clone();
            $('.doc-main-items').html('')
            let cateMainTemplate = $('.doc-main-group').eq(0).clone();
            let contentInner = $('.doc-main-content-inner').html('').removeClass('active').eq(0).clone();
            $('.doc-main-content').html('')
            // let cateStickyTemplate = $('.term-toc-item-link').eq(1).clone();
            $('.term-toc-inner').html('');
            let categoryParentItem = $('.doc-main-tab').eq(0).clone();
            $('.doc-main-tab-wrap').html('');
            categoryParent.forEach((item, idx) => {
                let cateParentName = item.data.category_name_parent;
                let cateParentUID = item.uid;
                let cateParentHtml = categoryParentItem.clone();
                cateParentHtml.find('.doc-main-tab-txt').text(cateParentName)
                cateParentHtml.attr('id', cateParentUID)
                let contentInnerClone = contentInner.clone();
                contentInnerClone.attr('id', cateParentUID)
                $('.doc-main-content').append(contentInnerClone)
                $('.doc-main-tab-wrap').append(cateParentHtml)
            })
            $('.doc-main-tab').eq(0).addClass('active');
            $('.doc-main-content-inner').eq(0).addClass('active');
            allCate.forEach((cateEl, i) => {
                let cateName = cateEl.data.category_name;
                let cateUID = cateEl.uid;
                let cateMainHtml = cateMainTemplate.clone();
                cateMainHtml.attr('id', cateUID)
                cateMainHtml.find('[data-doc="title"]').text(cateName)
                let cateParent = cateEl.data.category_parent.uid;
                console.log(cateParent);
                $(`.doc-main-content-inner#${cateParent}`).append(cateMainHtml)
                // let cateStickyHtml = cateStickyTemplate.clone();
                // cateStickyHtml.find('.term-toc-item-number').text(`${i + 1}.`)
                // cateStickyHtml.find('.term-toc-item-txt').text(cateName)
                // cateStickyHtml.attr('href', `#${cateUID}`)
                // $('.term-toc-inner').append(cateStickyHtml)
            });
            updateTocUI();
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
        function updateTocUI(){
            $('.term-toc-inner').html('');
            let allCateGroups = $('.doc-main-content-inner.active .doc-main-group');
            allCateGroups.each((index, el) => {
                let cateName = $(el).find('[data-doc="title"]').text();
                let cateUID = $(el).attr('id');
                let cateStickyHtml = cateStickyTemplate.clone();
                cateStickyHtml.find('.term-toc-item-number').text(`${index + 1}.`)
                cateStickyHtml.find('.term-toc-item-txt').text(cateName)
                cateStickyHtml.attr('href', `#${cateUID}`)
                console.log(cateStickyHtml)
                $('.term-toc-inner').append(cateStickyHtml)
            })
            $('.term-toc-item-link').removeClass('load-ske');
        }
        function docInteraction() {
            let allCateGroups = $('.doc-main-content-inner.active .doc-main-group');
            $('.term-toc-head-txt').text($('.term-toc-item-link .term-toc-item-txt').eq(0).text())
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
            $('.term-toc-inner').on('click','.term-toc-item-link', function (e) {
                e.preventDefault();
                $('.term-toc-head').removeClass('on-open');
                $('.term-toc-inner').removeClass('on-open');
                // lenis.scrollTo(`#${$(this).attr('href')}`,{offset: -400})
            })
            $('.term-main').on('click', function(e) {
                $('.term-toc-head').removeClass('on-open');
                $('.term-toc-inner').removeClass('on-open');
            })
        }
        function docInteractionNew() {
            let allCateGroups = $('.doc-main-content.active .doc-main-group');
            $('.term-toc-head-txt').text($('.term-toc-item-link .term-toc-item-txt').eq(0).text())
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
            docTocNavNew();
        }
        function docTocNavNew() {
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
            $('.term-toc-inner').on('click','.term-toc-item-link', function (e) {
                e.preventDefault();
                let target = $(this).attr('data-toc');
                console.log(`.doc-main-group[data-toc=${target}`)
                lenis.scrollTo(`.doc-main-group[data-toc=${target}]`, { offset: -100, duration: 1.4})
            })
        }
        // if(!isStagging()){
        //     $('.doc-main-tab-wrap').on('click', '.doc-main-tab', function(e) {
        //         e.preventDefault();
        //         console.log('click');
        //         let target = $(this).attr('id');
        //         // lenis.scrollTo(`#${target}`, { offset: -100 });
        //         $('.doc-main-tab').removeClass('active');
        //         $(this).addClass('active');
        //         $('.doc-main-content-inner').removeClass('active');
        //         $(`.doc-main-content-inner#${target}`).addClass('active');
        //         updateTocUI();
        //         $('.term-toc-head-txt').text($('.term-toc-inner .term-toc-item-link').eq(0).find('.term-toc-item-txt').text())
        //     });
        // }
        // else {
            $('.doc-main-tab-wrap').on('click', '.doc-main-tab', function(e) {
                e.preventDefault();
                let target = $(this).attr('data-category-parent');
                // lenis.scrollTo(`#${target}`, { offset: -100 });
                $('.doc-main-tab').removeClass('active');
                $(this).addClass('active');
                $('.doc-main-content').removeClass('active');
                $(`.doc-main-content[data-category-parent=${target}]`).addClass('active');
                updateTocUINew();
                $('.term-toc-head-txt').text($('.term-toc-inner .term-toc-item-link').eq(0).find('.term-toc-item-txt').text())
            });
        // }
    }

    SCRIPT.waitlistScript = () => {
        // check current url is /waitlist và language current is en-SG
        if(window.location.pathname === '/waitlist' && $('html').attr('lang') === 'en-SG'){
            window.location.href = '/404';
        }
    }
    SCRIPT.referralRewardScript = () => {

    }
    SCRIPT.usdScript = () => {
        function formatNumber(num) {
            const str = num.toString();
            if (/e[+-]/i.test(str)) {
                const fullNumber = Number(num).toLocaleString('fullwide', { useGrouping: false });
                return formatNumberNormal(fullNumber);
            }
            
            return formatNumberNormal(str);
        }
        
        function formatNumberNormal(str) {
            const match = str.match(/^([^0-9-]*)(-?\d[\d,]*\.?\d*)/);
            if (!match) return str;
            
            const symbol = match[1];
            let number = match[2].replace(/,/g, '');
            const parts = number.split('.');
            const integerPart = parts[0];
            const decimalPart = parts[1];
            
            const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return symbol + formattedInteger + (decimalPart ? '.' + decimalPart : '');
        }
        function guaranteeFee() {
            let textUnitInit = $('.unit-init').text();
            let textUnitWillChange = $('.unit-will-change').text();
            let flagChangeSgdToUsd = true;
            function validInputUsd(sgdValue) {
                let cleanedSgdValue = sgdValue.replace(/[^\d.,]/g, '');
                const lastComma = cleanedSgdValue.lastIndexOf(',');
                const lastDot = cleanedSgdValue.lastIndexOf('.');
                // function only get one dot or one comma
                if (lastComma > -1 && lastDot > -1) {
                if (lastComma > lastDot) {
                    cleanedSgdValue = cleanedSgdValue.replace(/\./g, '');
                    cleanedSgdValue = cleanedSgdValue.replace(/(,)(?=.*\,)/g, '');
                } else {
                    cleanedSgdValue = cleanedSgdValue.replace(/\,/g, '');
                    cleanedSgdValue = cleanedSgdValue.replace(/(\.)(?=.*\.)/g, '');
                }
                } else {
                cleanedSgdValue = cleanedSgdValue
                    .replace(/,/g, (match, offset) => offset === 0 ? '' : ',')
                    .replace(/(,)(?=.*\,)/g, '')
                    .replace(/\./g, (match, offset) => offset === 0 ? '' : '.')
                    .replace(/(\.)(?=.*\.)/g, '');
                }
                if (cleanedSgdValue.startsWith(',') || cleanedSgdValue.startsWith('.')) {
                cleanedSgdValue = cleanedSgdValue.substring(1);
                }
                // Remove leading zeros, but keep '0' if value is just zeros or has decimal
                if (cleanedSgdValue.length > 0) {
                    const hasDecimal = cleanedSgdValue.includes('.') || cleanedSgdValue.includes(',');
                    if (hasDecimal) {
                        cleanedSgdValue = cleanedSgdValue.replace(/^0+(?=\d)/, '');
                    } else {
                        cleanedSgdValue = cleanedSgdValue.replace(/^0+(?=\d)/, '');
                    }
                    if (cleanedSgdValue === '' || cleanedSgdValue === '.' || cleanedSgdValue === ',') {
                        cleanedSgdValue = '0';
                    }
                }
                if (sgdValue !== cleanedSgdValue) {
                $(this).val(cleanedSgdValue);
                sgdValue = cleanedSgdValue;
                }
                return sgdValue;
            }
            function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                clearTimeout(timeout);
                func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
            }
        
            const handleInput = debounce(function(sgdAmount) {
            if (!sgdAmount || parseFloat(sgdAmount) <= 0) {
                resetDisplay();
                return;
            }
        
            if (!currentRateData) {
                return;
            }
        
            convertAmount(sgdAmount);
            }, 500);
        
            $('.guarantee-fee-form-input').on('input', function() {
            let sgdAmount = $(this).val();
            let cleanedFee = validInputUsd(sgdAmount);
            $(this).val(cleanedFee);
            $('.guarantee-fee-form-input-val').text(formatNumber(cleanedFee));
            handleInput(sgdAmount);
            });
            function convertAmount(sgdAmount) {
                console.log(sgdAmount);
                if(sgdAmount <=0){
                    resetDisplay();
                    return;
                }
                $.ajax({
                    url: 'https://data.chocolate-technologies.io/api/fx/convert-amount-and-fee',
                    method: 'POST',
                    contentType: 'application/json',
                    headers: {
                    'cf-turnstile-response': turnstileToken
                    },
                    data: JSON.stringify({
                    offeredRate: currentRateData.rate,
                    amount: {
                        currency: 'SGD',
                        quantity: sgdAmount
                    },
                    action: 'buy',
                    pair: 'USD:SGD',
                    midMarketRate: currentRateData.midMarketRate.original
                    }),
                    success: function(data) {
                    updateDisplay(data);
                    },
                    error: function(xhr, status, error) {
                    console.log('Lỗi: ' + error);
                    }
                });
            }
            function updateDisplay( data) {
                console.log('khanh',data);
            $('.sgd-to-usd-total').text(formatNumber(data.totalAmount.quantity));
            $('.sgd-to-usd-fee').text(formatNumber(Math.abs(data.fee.quantity)));
            $('.guarantee-fee-form-input-result').text(formatNumber(data.convertedAmount.quantity));
            }
            function resetDisplay() {
            $('.sgd-to-usd-total').text('0');
            $('.sgd-to-usd-fee').text('0');
            $('.guarantee-fee-form-input-result').text('0');
            }
            $('.guarantee-fee-form-input').on('click focus', function() {
                const length = $(this).val().length;
                this.setSelectionRange(length, length);
              });
            $('.guarantee-fee-convert-ic').on('click', function () {
            if (flagChangeSgdToUsd) {
                $('.unit-init').text(textUnitWillChange);
                $('.unit-will-change').text(textUnitInit);
                $('.sgd-to-usd').text(usdToSgd)
                flagChangeSgdToUsd = false;
            }
            else {
                $('.unit-init').text(textUnitInit);
                $('.unit-will-change').text(textUnitWillChange);
                $('.sgd-to-usd').text(sgdToUsd)
                flagChangeSgdToUsd = true;
            }
            })
        }
        guaranteeFee();
        $('.home-graph-note-txt [href="#FAQs"], .usd-benef-sub-new-link[href="#FAQs"]').on('click', function(e) {
            let faqEl = $('.home-faq-item#what-is-the-chocolate-top-up-programme-and-its-qualifying-period');
            if (!faqEl.hasClass('active')) {
                faqEl.find('.home-faq-item-head').trigger('click')
            }
        })

        function usdGetFaq() {
            animateFaq();
            scrollToFaq();
            
        }

        usdGetFaq();
        function usdBenefit(){
            $('.usd-benefit-item').eq(0).addClass('active');
            $('.usd-benefit-item').eq(0).find('.usd-benefit-item-body').slideDown();;
            $('.usd-benefit-item').on('click', function(){
                if($(this).hasClass('active')){
                    $('.usd-benefit-item').removeClass('active')
                    $(this).find('.usd-benefit-item-body').slideUp();
                }
                else{
                    $('.usd-benefit-item-body').slideUp();
                    $('.usd-benefit-item').removeClass('active')
                    $(this).addClass('active')
                    $(this).find('.usd-benefit-item-body').slideDown();
                }
            })
        }
        usdBenefit();
        function usdSecu(){
            let textCir;
            textCir = new CircleType(document.querySelector('.mod-circletext.usd-secu-rate-txt'));
            $('.mod-circletext').css('display','flex')
            $('.text-cir-wrap').addClass('anim-rotate')
        }
        usdSecu();
    }
    SCRIPT.corporateScript = () => {
        function corporateHero(){
            let initialViewportWidth = window.innerWidth || document.documentElement.clientWidth;
            if( initialViewportWidth < 480){
                $('.co-hero-content-cms').addClass('swiper')
                $('.co-hero-content-list').addClass('swiper-wrapper')
                $('.co-hero-content-item').addClass('swiper-slide')
                let swiperHero = new Swiper('.co-hero-content-cms',{
                    spaceBetween: parseRem(8),
                    slidesPerView: 'auto',
                })
            }
        }
        corporateHero();
        function corporateGetFaq() {
                animateFaq();
                scrollToFaq();
        }
        corporateGetFaq();
        function getHomePartners() {
            getAllDataByType('partners_logo').then((res) => {
                if (res) {
                    let allPartner = sortAsc(res, true, 'order');
                    let template = $('.home-partner-inner').find('.home-partner-item').eq(0).clone();
                    $('.home-partner-inner').html('')
                    allPartner.forEach(({ data }, i) => {
                        if (i < 5) createPartnerHTML(template, data).appendTo($('.home-partner-inner'))
                    })
                    $('.home-partner-inner').find('.load-ske').addClass('loaded')
                }
            });
        }
        getHomePartners()
    }
    SCRIPT.cardScript = () => {
        console.log('card script')
        function stickyCard(){
            lenis.on('scroll', function(inst) {
                if ($('.card-debit-wrap').length) {
                    if (inst.scroll > $('.card-hero').height() * .66) {
                        $('.card-debit-wrap').removeClass('on-hide')
                    } else {
                        $('.card-debit-wrap').addClass('on-hide')
                    }
                }
            })
        }
        stickyCard();
        function cardHero(){
            let itemMarquee =  $('.card-hero-marquee-txt').eq(0).clone();
            const width = $('.card-hero-marquee-txt').eq(0).width();
            if(width <= 0) return;
            const length = Math.floor($(window).width() / width) + 1;
            console.log(width)
            for (let i = 0; i < length; i++) {
                $('.card-hero-marquee-wrap').append(itemMarquee.clone());
            }
            $('.card-hero-marquee-wrap .card-hero-marquee-txt').addClass('anim');

        }
        cardHero();
        function cardFee(){
            const iconShortDurVid = $('.card-fee-title-img .mod-short-dur video').get(0);
            const iconShortDurTrigger = new ScrollTrigger({
                trigger: '.card-fee-title-img .mod-short-dur',
                start: 'center center',
                onEnter() {
                    iconShortDurVid.play();
                }
            })
        }
        cardFee();
        function cardGetFaq() {
                animateFaq();
                scrollToFaq();
        }
        cardGetFaq();
        function cardReason(){
            if(viewport.w < 991){
                $('.card-reason-item').eq(0).find('.card-reason-item-sub-inner').slideDown();
                $('.card-reason-item').eq(0).addClass('active');
                $('.card-reason-item').on('click', function(){
                    if($(this).hasClass('active')){
                        $('.card-reason-item').removeClass('active')
                        $(this).find('.card-reason-item-sub-inner').slideUp();
                    }
                    else{
                        $('.card-reason-item-sub-inner').slideUp();
                        $('.card-reason-item').removeClass('active')
                        $(this).addClass('active')
                        $(this).find('.card-reason-item-sub-inner').slideDown();
                    }
                })
            }
        }
        cardReason();
        function cardfee(){
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.card-fee',
                    start: 'bottom-=30% center',
                    end: 'bottom+=20% center',
                    scrub: 1,
                }
            });
            gsap.set('.card-spent-plus',{yPercent: -100})
            gsap.set('.card-fee-plus',{yPercent: 0})
            tl
                .to('.card-fee-plus',{yPercent: 100})
                .to('.card-spent-plus', {yPercent: 0 }, '<=0')
        }
        cardfee();
    }

    SCRIPT.noteScript = () => {

    }
    SCRIPT.thankyouScript = () => {
        function thankHero() {
            let tlScroll = gsap.timeline({
                scrollTrigger: {
                  trigger: '.thank-hero',
                  start: viewport.w > 991 ? 'top+=50% bottom-=50%' : 'top+=70% bottom-=70%',
                  end: viewport.w > 991 ? 'bottom-=60% top-=60%' : 'bottom-=40% top-=40%',
                  scrub: 1,
                }
            });
            let tlFirst = gsap.timeline({
                onComplete: () => {
                    tlScroll
                        .fromTo('.thank-hero-ic', { yPercent: 0 }, { yPercent: -55 , ease: 'none'}, 0)
                }
            })
            gsap.set('.thank-hero-title', { autoAlpha: 0})
            gsap.set('.thank-hero-ic', { autoAlpha: 0, y: -40})
            tlFirst
                .to('.thank-hero-title', { autoAlpha: 1, duration: 1 })
                .to('.thank-hero-ic', { autoAlpha: 1, y:0, duration: .8, clearProps: "all"}, '<=.6')
              
        }
        thankHero();
        function thankReview() {
            let gapSlide = parseRem(20);
            let slideView = 'auto';
            let itemsArray = $('.thank-review-item').toArray();
            let icRateGood = $(itemsArray[0]).find('.thank-review-item-rate-item.item-good').eq(0);
            let icRateBad = $(itemsArray[0]).find('.thank-review-item-rate-item.item-bad').eq(0);
            gsap.set('.thank-review-title', {autoAlpha: 0, yPercent: 40})
            gsap.set('.thank-review-sub', {autoAlpha: 0, yPercent: 40})
            gsap.set('.thank-review-list', {autoAlpha: 0, x: 40})
            let tlReview = gsap.timeline({
                scrollTrigger: {
                  trigger: '.thank-review-inner',
                  start: 'top top+=65%'
                }
            });
            let tlTitle = gsap.timeline({
                scrollTrigger: {
                  trigger: '.thank-review-title-wrap',
                  start: 'top top+=75%'
                }
            });
            if(viewport.w < 991 && viewport.w > 479){
                slideView = 2.4;
            }
            else if(viewport.w < 479){
                slideView = 1.2;
                gapSlide = parseRem(24);
            }
            itemsArray.forEach(function(item) {
                let rateWrapper = $(item).find('.thank-review-item-rate');
                rateWrapper.find('.thank-review-item-rate-item').remove();
                if(!rateWrapper.hasClass('w-condition-invisible')){
                    let itemRate = parseInt($(item).attr('data-rate'));
                    for(let i = 1 ; i <= 5; i ++){
                        if(i <= itemRate) {
                            rateWrapper.append(icRateGood.clone());
                        }
                        else {
                            rateWrapper.append(icRateBad.clone());
                        }
                    }
                }
            });
            if(viewport.w > 479){
                let maxHeightSlide = parseRem(1054);
                let widthSwiperSlide = parseRem(320);
                let baseSlide = $('.thank-review-list').eq(0).clone().empty().css('width', widthSwiperSlide);
                let swiperWrapper = $('.thank-review-inner').eq(0).empty();
                let currentSlide = baseSlide.clone();
                swiperWrapper.append(currentSlide);
                itemsArray.forEach(function(item) {
                    currentSlide.append(item);
                    let currentHeight = currentSlide.height();
                    if (currentHeight > maxHeightSlide) {
                        $(item).detach();
                        currentSlide = baseSlide.clone();
                        swiperWrapper.append(currentSlide);
                        currentSlide.append(item);
                    }
                });
            }
            let swiper = new Swiper('.thank-review-main', {
                spaceBetween: gapSlide,
                slidesPerView: slideView,
                mousewheel: {
                    enabled: true,
                    forceToAxis: true,
                },
                freeMode: true,
                scrollbar: {
                    el: ".thank-review-process",
                    draggable: true,
                    },
            });
            ScrollTrigger.refresh();
            tlTitle
                .to('.thank-review-title', {autoAlpha: 1, yPercent: 0, duration: 1})
                .to('.thank-review-sub', {autoAlpha: 1, yPercent: 0, duration: .8}, '<=.4')
            tlReview
                .to('.thank-review-list', {autoAlpha: 1, x: 0, duration: 1, stagger: .06})
        }
        thankReview();
        function thankTeam() {
            let isVideoAutoplay = true;
            $('.thank-team-video-inner .el-video').get(0).currentTime = 1.84;
            if(isVideoAutoplay) {
                ScrollTrigger.create({
                    trigger: '.thank-team',
                    start: 'top top+=75%',
                    onEnter: () => {
                        $('.thank-team-video-trigger').addClass('hidden');
                        $('.thank-team-video-inner .el-video')
                        .prop('autoplay', true)
                        .prop('muted', true)
                        .prop('playsinline', true)
                        .get(0).play();
                    }
                });
            }
            else {
                $('.thank-team-video-trigger').on('click', function(e) {
                    e.preventDefault();
                    $('.thank-team-video-trigger').addClass('hidden')
                    $('.thank-team-video-inner .el-video').attr('controls', true);
                    $('.thank-team-video-inner .el-video').get(0).play();
                })
            }
        }
        thankTeam()
        function thankResult() {
            let tlScroll = gsap.timeline({
                scrollTrigger: {
                  trigger: '.thank-result',
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1,
                }
            });
            let tlFirst = gsap.timeline({
                scrollTrigger: {
                    trigger: '.thank-result-title-wrap',
                    start: 'top top+=75%'
                },
                onComplete: () => {
                    tlScroll
                        .fromTo('.thank-result-ic', { yPercent: 0 }, { yPercent: -55 , ease: 'none'}, 0)
                }
            })
            gsap.set('.thank-result-label', { autoAlpha: 0})
            gsap.set('.thank-result-title', { autoAlpha: 0})
            gsap.set('.thank-result-sub', { autoAlpha: 0})
            gsap.set('.thank-result-ic', { autoAlpha: 0, y: -60})
            tlFirst
                .to('.thank-result-label', { autoAlpha: 1, duration: .6 })
                .to('.thank-result-title', { autoAlpha: 1, duration: 1 }, '<=.6')
                .to('.thank-result-ic', { autoAlpha: 1, y:0, duration: .8}, '<=0')
                .to('.thank-result-sub', { autoAlpha: 1, duration: .8 },'<=.6' )
              
        }
        thankResult();
        function thankMention() {
            if(viewport.w < 767) {
                $('.thank-mention-cms').addClass('swiper');
                $('.thank-mention-list').addClass('swiper-wrapper');
                $('.thank-mention-item').addClass('swiper-slide');
                let swiper = new Swiper('.thank-mention-cms', {
                    spaceBetween: parseRem(24),
                    slidesPerView: 'auto',
                });
            }
        }
        thankMention();
        function homeCommunity () {
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.thank-community',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                }
            });
            tl
               .fromTo('.thank-community-fashion-row.item1 .thank-community-fashion-item', { yPercent: -50 }, {yPercent: 50})
               .fromTo('.thank-community-fashion-row.item2 .thank-community-fashion-item', { yPercent: 30 }, {yPercent: -30}, '<=0')
               .fromTo('.thank-community-fashion-row.item3 .thank-community-fashion-item', { yPercent: -50 }, {yPercent: 40}, '<=0')
        }
        homeCommunity();
        function thankGetFaq() {
            animateFaq();
            scrollToFaq();
        }
        thankGetFaq();
    }
    SCRIPT.guaranteeScript = () => {
        function formatNumber(num) {
            const str = num.toString();
            if (/e[+-]/i.test(str)) {
                const fullNumber = Number(num).toLocaleString('fullwide', { useGrouping: false });
                return formatNumberNormal(fullNumber);
            }
            
            return formatNumberNormal(str);
        }
        
        function formatNumberNormal(str) {
            const match = str.match(/^([^0-9-]*)(-?\d[\d,]*\.?\d*)/);
            if (!match) return str;
            
            const symbol = match[1];
            let number = match[2].replace(/,/g, '');
            const parts = number.split('.');
            const integerPart = parts[0];
            const decimalPart = parts[1];
            
            const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return symbol + formattedInteger + (decimalPart ? '.' + decimalPart : '');
        }
        function guaranteeFee() {
            let textUnitInit = $('.unit-init').text();
            let textUnitWillChange = $('.unit-will-change').text();
            let flagChangeSgdToUsd = true;
            function validInputUsd(sgdValue) {
                let cleanedSgdValue = sgdValue.replace(/[^\d.,]/g, '');
                const lastComma = cleanedSgdValue.lastIndexOf(',');
                const lastDot = cleanedSgdValue.lastIndexOf('.');
                // function only get one dot or one comma
                if (lastComma > -1 && lastDot > -1) {
                if (lastComma > lastDot) {
                    cleanedSgdValue = cleanedSgdValue.replace(/\./g, '');
                    cleanedSgdValue = cleanedSgdValue.replace(/(,)(?=.*\,)/g, '');
                } else {
                    cleanedSgdValue = cleanedSgdValue.replace(/\,/g, '');
                    cleanedSgdValue = cleanedSgdValue.replace(/(\.)(?=.*\.)/g, '');
                }
                } else {
                cleanedSgdValue = cleanedSgdValue
                    .replace(/,/g, (match, offset) => offset === 0 ? '' : ',')
                    .replace(/(,)(?=.*\,)/g, '')
                    .replace(/\./g, (match, offset) => offset === 0 ? '' : '.')
                    .replace(/(\.)(?=.*\.)/g, '');
                }
                if (cleanedSgdValue.startsWith(',') || cleanedSgdValue.startsWith('.')) {
                cleanedSgdValue = cleanedSgdValue.substring(1);
                }
                // Remove leading zeros, but keep '0' if value is just zeros or has decimal
                if (cleanedSgdValue.length > 0) {
                    const hasDecimal = cleanedSgdValue.includes('.') || cleanedSgdValue.includes(',');
                    if (hasDecimal) {
                        cleanedSgdValue = cleanedSgdValue.replace(/^0+(?=\d)/, '');
                    } else {
                        cleanedSgdValue = cleanedSgdValue.replace(/^0+(?=\d)/, '');
                    }
                    if (cleanedSgdValue === '' || cleanedSgdValue === '.' || cleanedSgdValue === ',') {
                        cleanedSgdValue = '0';
                    }
                }
                if (sgdValue !== cleanedSgdValue) {
                $(this).val(cleanedSgdValue);
                sgdValue = cleanedSgdValue;
                }
                return sgdValue;
            }
            function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                clearTimeout(timeout);
                func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
            }
        
            const handleInput = debounce(function(sgdAmount) {
            if (!sgdAmount || parseFloat(sgdAmount) <= 0) {
                resetDisplay();
                return;
            }
        
            if (!currentRateData) {
                return;
            }
        
            convertAmount(sgdAmount);
            }, 500);
        
            $('.guarantee-fee-form-input').on('input', function() {
            let sgdAmount = $(this).val();
            let cleanedFee = validInputUsd(sgdAmount);
            $(this).val(cleanedFee);
            $('.guarantee-fee-form-input-val').text(formatNumber(cleanedFee));
            handleInput(sgdAmount);
            });
            function convertAmount(sgdAmount) {
                console.log(sgdAmount);
                if(sgdAmount <=0){
                    resetDisplay();
                    return;
                }
                $.ajax({
                    url: 'https://data.chocolate-technologies.io/api/fx/convert-amount-and-fee',
                    method: 'POST',
                    contentType: 'application/json',
                    headers: {
                    'cf-turnstile-response': turnstileToken
                    },
                    data: JSON.stringify({
                    offeredRate: currentRateData.rate,
                    amount: {
                        currency: 'SGD',
                        quantity: sgdAmount
                    },
                    action: 'buy',
                    pair: 'USD:SGD',
                    midMarketRate: currentRateData.midMarketRate.original
                    }),
                    success: function(data) {
                    updateDisplay(data);
                    },
                    error: function(xhr, status, error) {
                    console.log('Lỗi: ' + error);
                    }
                });
            }
            function updateDisplay( data) {
                console.log('khanh',data);
            $('.sgd-to-usd-total').text(formatNumber(data.totalAmount.quantity));
            $('.sgd-to-usd-fee').text(formatNumber(Math.abs(data.fee.quantity)));
            $('.guarantee-fee-form-input-result').text(formatNumber(data.convertedAmount.quantity));
            }
            function resetDisplay() {
            $('.sgd-to-usd-total').text('0');
            $('.sgd-to-usd-fee').text('0');
            $('.guarantee-fee-form-input-result').text('0');
            }
            $('.guarantee-fee-form-input').on('click focus', function() {
                const length = $(this).val().length;
                this.setSelectionRange(length, length);
              });
            $('.guarantee-fee-convert-ic').on('click', function () {
            if (flagChangeSgdToUsd) {
                $('.unit-init').text(textUnitWillChange);
                $('.unit-will-change').text(textUnitInit);
                $('.sgd-to-usd').text(usdToSgd)
                flagChangeSgdToUsd = false;
            }
            else {
                $('.unit-init').text(textUnitInit);
                $('.unit-will-change').text(textUnitWillChange);
                $('.sgd-to-usd').text(sgdToUsd)
                flagChangeSgdToUsd = true;
            }
            })
        }
        if(isStagging()){
            guaranteeFee();
        }
        function usdSecu(){
            let textCir;
            textCir = new CircleType(document.querySelector('.mod-circletext.usd-secu-rate-txt'));
            $('.mod-circletext').css('display','flex')
            $('.text-cir-wrap').addClass('anim-rotate')
        }
        usdSecu();
        function homeGetFaq() {
            animateFaq();
            scrollToFaq();

        }
        homeGetFaq();
        
        function usdBenefit(){
            $('.usd-benefit-item').eq(0).addClass('active');
            $('.usd-benefit-item').eq(0).find('.usd-benefit-item-body').slideDown();;
            $('.usd-benefit-item').on('click', function(){
                if($(this).hasClass('active')){
                    $('.usd-benefit-item').removeClass('active')
                    $(this).find('.usd-benefit-item-body').slideUp();
                }
                else{
                    $('.usd-benefit-item-body').slideUp();
                    $('.usd-benefit-item').removeClass('active')
                    $(this).addClass('active')
                    $(this).find('.usd-benefit-item-body').slideDown();
                }
            })
        }
        usdBenefit();
    }
    const pageName = $('.main').attr('data-barba-namespace');
    if (pageName) {
        detectPage(pageName)
        SCRIPT[(`${pageName}Script`)]();
    }
}

window.onload = mainScript;