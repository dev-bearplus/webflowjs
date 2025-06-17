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
    const formatter = (value, decimal = true) => {
        return new Intl.NumberFormat('en-SG', {
            style: 'currency',
            currency: 'SGD',
            minimumFractionDigits: decimal ? 2 : 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
        }).format(value)
    };
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
        return new Date(date).toLocaleDateString("en-GB", {
            day: 'numeric',
            month: "short",
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
    function updateUrl(title, type, desc, ogImg) {
        history.replaceState({},'',`/${type}/${title}`)
        $('title').text(`${toTitle(title)} | Chocolate Finance`)
        $('meta[property="og:title"]').attr('content', `${toTitle(title)} | Chocolate Finance`)
        $('meta[property="twitter:title"]').attr('content', `${toTitle(title)} | Chocolate Finance`)
        $('meta[property="og:url"]').attr('content',`${window.location.href}`)
        $('link[rel="canonical"]').attr('href', `https://chocolatefinance.webflow.io/article/${title}`)
        if (desc) {
            $('meta[property="og:type"]').attr('content','article')
            $('meta[name="description"]').attr('content', desc)
            $('meta[property="og:description"]').attr('content', desc)
            $('meta[property="twitter:description"]').attr('content', desc)
        }
        if (ogImg) {
            $('meta[property="og:image"]').attr('content', ogImg)
            $('meta[property="twitter:image"]').attr('content', ogImg)
        }
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
    // detectOS()

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
    // let namespace = $('.main').attr('data-barba-namespace');
    // let rateExtent ='';
    // if (isStagging()) {
    //     rateExtent = '-sgd';
    //     if (namespace === 'usd') {
    //         rateExtent = '-usd';
    //     }
    // }
    function updateRichtextFaqClass(faqHtml) {
        let ans = faqHtml.find('.home-faq--itemans');
        // Paragraphs
        ans.find('p:not(.block-img)').addClass('txt-16 art-para-sm-sub');
        // Lists
        ans.find('ul').addClass('art-txt-ul mod-faq-ans');
        ans.find('li').addClass('txt-16 art-txt-li');
        // Links
        ans.find('a').addClass('span-txt-link');
        // Images
        ans.find('.block-img img').addClass('img-basic art-main-img');
        ans.find('.block-img').removeClass('block-img').addClass('art-img-lg-wrap mod-faq');
        // data-rate Tags
        ans.find('.big-rate-sgd').attr('data-rate-sgd','big');
        ans.find('.small-rate-sgd').attr('data-rate-sgd','small');
        ans.find('.other-rate-sgd').attr('data-rate-sgd','other');
        ans.find('.limit-amount-sgd').attr('data-rate-sgd','amount');
        ans.find('.limit-date-sgd').attr('data-rate-sgd','date');
        ans.find('.big-rate-usd').attr('data-rate-usd','big');
        ans.find('.small-rate-usd').attr('data-rate-usd','small');
        ans.find('.other-rate-usd').attr('data-rate-usd','other');
        ans.find('.limit-amount-usd').attr('data-rate-usd','amount');
        ans.find('.limit-date-usd').attr('data-rate-usd','date');
        // Embed
        ans.find('[data-oembed]').addClass('art-embed-wrap mod-faq');

        return ans.closest('.home-faq-item')
    }
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
    function createFaqNew(el) {
        let richTextArray = el.data.content_richtext;
            let ans = PrismicDOM.RichText.asHtml(richTextArray);
            let faqItem = $(`
                <div class="home-faq-item" id="${el.uid.replaceAll('.','')}" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                    <a href="#" class="home-faq-item-head w-inline-block">
                        <div class="txt-16 home-faq-item-ques" itemprop="name">${el.data.question}</div>
                        <div class="ic-plus-wrap">
                            <div class="ic-plus-inner"></div>
                            <div class="ic-plus-inner mod-rotate"></div>
                        </div>
                    </a>
                    <div class="home-faq-item-body" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                        <div class="txt-16 home-faq--itemans" itemprop="text">${ans}</div>
                    </div>
                    <div class="home-faq-bar">
                        <div class="home-faq-bar-inner"></div>
                    </div>
                </div>
            `);
            faqItem = updateRichtextFaqClass(faqItem)
            return faqItem;
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
    function createHtml(template, blog, hideAuthor = false) {
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
            html.find('[data-blog-dou="author-link"]').attr('href', hideAuthor ? '#' : `/blog-author/${res.uid}`)
        }));
        changeText(html.find('[data-blog="sum"]'), blog.data.short_description)
        changeText(html.find('[data-blog="date"]'), toDateFormat(blog.last_publication_date))
        return html;
    }
    function createPartnerHTML(template, partner) {
        const html = template.clone();
        if (!partner.visibility) html.addClass('hidden');
        let imgurl = partner.image.url.includes('gif') ? partner.image.url.replace('?auto=format,compress', '') : partner.image.url;
        console.log(imgurl)
        html.find('[data-partner="img"]').attr('src',imgurl);
        html.find('[data-partner="label"]').text(partner.label);
        return html;
    }
    function createCEOProfileHTML(template, profile) {
        const html = template.clone();
        if (!profile.visibility) html.addClass('hidden');
        html.find('[data-ceo-profile="img"]').attr('src', profile.logo.url);
        html.find('[data-ceo-profile="label"]').text(profile.label[0].text);
        return html;
    }
    function createTestiHTML(template, testi) {
        const html = template.clone();
        html.find('[data-testi="avatar"]').attr('src',testi.data.avatar.url);
        html.find('[data-testi="platform"]').attr('src',testi.data.platform.url);
        html.find('[data-testi="rate"]').text(testi.data.rating);
        html.find('[data-testi="content"]').text(testi.data.content[0].text);
        html.find('[data-testi="author"]').text(testi.data.author[0].text);
        html.find('[data-testi="date"]').text(testi.data.date ? `${toDateFormat(testi.data.date).replace(',','')}` : '');
        return html;
    }
    function openFaqItem() {
        $('[data-faq-open]').on('click', function(e) {
            e.preventDefault();
            let targetId = $(this).attr('data-faq-open');
            $(`#${targetId}`).find('.home-faq-item-head').trigger('click');
            setTimeout(() => {
                lenis.scrollTo(`#${targetId}`, {offset: -20 * unit})
            }, 200);
        })
    }
    openFaqItem()
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
        if ($(window).width() <= 991) {
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
        if ($(window).width() <= 991) {
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
        if ($('.topbar').length) {
            threshold = inst.scroll > header.height() + $('.topbar').height();
        }
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
                $(this).closest('.topbar-item').find('.topbar-body-inner').slideDown();
            })
        }
    }
    topbar();

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
                gsap.set('.nav-link-mb-info > *', {x: 60, autoAlpha: 0})
                gsap.set('.nav .mod-add .txt-16.nav-info-label, .nav .mod-add .txt-14.nav-info-item-label, .nav .mod-add .txt-14.nav-info-txt, .nav .mod-add .txt-14.nav-info-item-link', {autoAlpha: 0, x: 60})
                gsap.set('.nav .mod-down .txt-16.nav-info-label, .nav .mod-down .nav-qr-wrap, .nav .mod-down .nav-download-wrap', {autoAlpha: 0, x: 60})
                gsap.set('.nav .mod-down .nav-download-item-wrap', {x: 30})
                gsap.set('.nav-copy-wrap .txt-14.nav-copy-txt, .footer-social-wrap .txt-14.nav-social-label', {autoAlpha: 0, x: 60})
                gsap.set('.footer-social-wrap .footer-social-link.mod-nav', {autoAlpha: 0, x: 20})
                gsap.set('.nav .nav-bottom-line', {scaleX: 0, autoAlpha: 0})

                $('.nav').addClass('active');
                $('.header').addClass('on-open');
                if ($('.topbar').length) {
                    $('.sticky-wrap').addClass('on-open');
                    $('.body').css('--open-top', `${$('.topbar').outerHeight() * -1}px`)
                }
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
                if ($('.topbar').length) {
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
        // let SGDfixedRate = $('[data-rate-source-sgd="fixed"]').text();
        let SGDamount = $('[data-rate-source-sgd="amount"]').text();
        let SGDdate = $('[data-rate-source-sgd="date"]').text();
        let SGDwidthdrawal = $('[data-rate-source-sgd="withdrawal"]').text();
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
            } else if (type == 'fixed') {
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
        let USDwidthdrawal = $('[data-rate-source-sgd="withdrawal"]').text();
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
            } else if (type == 'fixed') {
                // $(this).text(USDfixedRate)
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

    if ($('.intro-wrap').length) {
        console.log('intro-wrap')
        // Termporary code, to be removed
        // if ( $('[data-barba-namespace="blogAuth"]').length) {
        //     if (!window.location.href.includes('webflow.io')) {
        //         handle404();
        //         return;
        //     }
        // }
        // End
        setTimeout(() => $('.intro-wrap').addClass('loaded'), 50);
    }

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
        function homeBenefSetup() {
            if ($(window).outerWidth() > 991) {
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
        // homeBenefHanlde();
        function homeBenefHandleMobile() {
            gsap.set(".home-benef-img-wrap .img-basic", {
                x: (i) => (i - 1) * $('.home-benef-img-wrap .img-basic').eq(0).width()
            });

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
            if ($(window).outerWidth() <= 767) {
                $('.home-benef-main-bar.mod-mb .home-benef-item-wrap').on('click', function (e) {
                    let index = $(this).index();
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active');

                        $(this).find('.home-benef-item-sub').slideUp("slow");
                    }
                    else {
                        $('.home-benef-main-bar.mod-mb .home-benef-item-wrap').not($(this)).removeClass('active');
                        $(this).addClass('active')

                        $('.home-benef-main-bar.mod-mb .home-benef-item-wrap').not($(this)).find('.home-benef-item-sub').slideUp("slow");
                        $(this).find('.home-benef-item-sub').slideDown("slow");
                    }
                })
                $('.home-benef-main-bar.mod-mb .home-benef-item-wrap').eq(0).trigger('click');
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
                $('.home-secu-main-wrap').addClass('swiper')
                $('.home-secu-main').addClass('swiper-wrapper')
                $('.home-secu-item').addClass('swiper-slide')
                const homeSecuSwiper = new Swiper('.swiper.home-secu-main-wrap', {
                    slidesPerView: "auto",
                    spaceBetween: 2.4 * unit,
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
            let isFixed = false;
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

            const limitAmount = parseInt($('[data-rate-source-sgd="amount"]').text().replace(',','')) * 1000;
            const bigRate = parseFloat($('[data-rate-source-sgd="big"]').text()) / 100;
            const smallRate = parseFloat($('[data-rate-source-sgd="small"]').text()) / 100;
            const otherRate = parseFloat($('[data-rate-source-sgd="other"]').text()) / 100;
            const fixedRate = parseFloat($('[data-rate-source-sgd="fixed"]').text()) / 100;
            // const fixedRate = parseFloat(2) / 100;

            const style = {
                chocoFin: {
                    color: 'rgba(228, 32, 130, 1)',
                    bg: chocoFin_bg,
                },
                other: {
                    color: 'rgba(112, 29, 27, 1)'
                },
                fixed: {
                    color: 'rgba(61, 25, 18, 1)'
                }
            }
            const data = {
                time: [],
                chocoFin: [],
                other: [],
                fixed: [],
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
                        {
                            data: data.fixed,
                            borderColor: style.fixed.color,
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
                clip: false,
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
                            stepSize: 1000
                        },
                        grid: {
                            drawOnChartArea: false,
                            //display: false,
                            drawTicks: false,
                        },
                        //grace: '1%',
                        // beginAtZero: false,
                        offset: false,
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

            requestAnimationFrame(() => {
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
                            updateChart(parseInt($('#chartBalance').val()), parseInt($('#chartTime').val()));
                            setTimeout(() => {
                                lineChart.options.animation = false;
                            }, 400);
                        }
                    }
                })
                requestAnimationFrame(() => {
                    homeChartInitTl.from('.chart-tip-box', {autoAlpha: 0, yPercent: 100, duration: .4, ease: 'Power1.easeInOut', stagger: 0.1, clearProps: 'all'})
                    // .from('.home-chart-txt-top', {autoAlpha: 0, yPercent: 60, duration: .6, ease: 'Power1.easeInOut', clearProps: 'all'}, 0)
                    // .from('.home-chart-txt-bot', {autoAlpha: 0, yPercent: 60, duration: .6, ease: 'Power1.easeInOut', clearProps: 'all'}, '<=.2')
                    .from('.homt-chart-balance-start', {autoAlpha: 0, yPercent: 60, duration: .6, ease: 'Power1.easeInOut', clearProps: 'all'}, '<=.2')
                })
            })


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

                data.fixed = [balance];
                for (let x = 1; x <= time; x++) {
                    let formular = balance * (1 + ((fixedRate / 12) * x));
                    data.fixed.push(formular)
                }
            }

            function updateChart(balance, time) {
                fomularCf(balance,time)
                //c_Options.animation = false;
                lineChart.data.labels = data.time;
                lineChart.data.datasets[0].data = data.chocoFin;
                lineChart.data.datasets[1].data = data.other;
                lineChart.data.datasets[2].data = data.fixed;

                c_Options.scales.y.min = data.chocoFin[0];
                c_Options.scales.y.max = data.chocoFin[time];
                c_Options.elements.point.pointRadius = data.pointRadius;
                c_Options.elements.point.hitRadius = data.pointRadius;
                c_Options.elements.point.hoverRadius = data.pointRadius;
                lineChart.options.scales.y = c_Options.scales.y;

                lineChart.update();
                let data_Cf = data.chocoFin[time];
                let data_other = data.other[time];
                let data_fixed = data.fixed[time];
                $('.chart-tip-amount.amount-cf').text(` S${formatter(data_Cf)} `)
                // $('.span-choco-white.re-total-cf').text(` ${formatter(data_Cf)} `)
                $('.chart-tip-amount.amount-other').text(` S${formatter(data_other)} `)
                $('.chart-tip-amount.amount-fixed').text(` S${formatter(data_fixed)} `)
                // $('.chart-tip-amount.amount-fixed').text(` ${formatter(data_fixed)} `)
                // $('.span-choco-white.re-total-other').text(` ${isFixed == true ? formatter(data_fixed) : formatter(data_other)} `)
                let difference = data_Cf - data.chocoFin[0];
                $('.span-txt-link.re-earn-cf').text(` S${formatter(difference)} `);

                if ($(window).width() > 991) {
                    let bottomOther = (data_other - data.chocoFin[0]) / (data_Cf - data.chocoFin[0]) * 100;
                    let bottomFixed = (data_fixed - data.chocoFin[0]) / (data_Cf - data.chocoFin[0]) * 100;
                    // $('.chart-tip-box.box-other').css('bottom', `calc(${bottomOther}%)`)
                    // $('.chart-tip-box.box-fixed').css('bottom', `calc(${bottomFixed}%)`)
                    if (balance <= 200) {
                        //$('.chart-tip-box.box-cf').addClass('box-cf-low')
                    } else {
                        //$('.chart-tip-box.box-cf').removeClass('box-cf-low')
                    }
                }
            }
            // Input events - Update chart

            // $('input.input-slider').on('input', function() {
            //     let balanceVal = $('#chartBalance').val();
            //     let timeVal = $('#chartTime').val();
            //     let timeYear = Math.floor(timeVal / 12);
            //     let timeMonth = timeVal % 12;
            //     let minVal = $(this).attr('min');
            //     let maxVal = $(this).attr('max');
            //     let percent = (($(this).val() - minVal) / (maxVal - minVal)) * 100;
            //     $(this).css('background', 'linear-gradient(to right, #e42082 0%, #e42082 ' + percent + '%, #f0f0f0 ' + percent + '%, #f0f0f0 100%)');
            //     if ($(this).attr('id') == 'chartBalance') {
            //         balanceVal = 'S' + formatter($(this).val())
            //         $('.homt-chart-balance-start').text(balanceVal)
            //         $(this).parent().parent().find('.home-chart-ctrl-number').text(balanceVal)
            //     } else if ($(this).attr('id') == 'chartTime') {
            //         timeVal = $(this).val()
            //         timeYear = Math.floor(timeVal / 12);
            //         timeMonth = timeVal % 12;

            //         let monthUnit, yearUnit, unitExtra;

            //         if (timeYear == 1) {
            //             yearUnit = 'year'
            //         } else {
            //             yearUnit = 'years'
            //         }

            //         if (timeMonth == 1) {
            //             monthUnit = 'month'

            //         } else {
            //             monthUnit = 'months'
            //         }

            //         if (timeMonth == 0) {
            //             if (timeYear == 1) {
            //                 unitExtra = "'s"
            //             } else {
            //                 unitExtra = "'"
            //             }
            //         } else {
            //             if (timeMonth == 1) {
            //                 unitExtra = "'s"
            //             } else {
            //                 unitExtra = "'"
            //             }
            //         }
            //         if (timeVal <= 244) {
            //             $('.homt-chart-balance-start').addClass('mod-lift')
            //         } else {
            //             $('.homt-chart-balance-start').removeClass('mod-lift')
            //         }
            //         $('.home-chart-time-txt').text(`${timeYear == 0 ? '' : timeYear + ' ' + yearUnit}${timeMonth == 0 ? '' : ' ' + timeMonth + ' ' + monthUnit}${unitExtra} time`)
            //         //$(this).parent().parent().find('.home-chart-ctrl-number').text(`${timeVal} ${monthUnit}`)
            //         $(this).parent().parent().find('.home-chart-ctrl-number').text(`${timeYear == 0 ? '' : timeYear + ' ' + yearUnit} ${timeMonth == 0 ? '' : timeMonth + ' ' + monthUnit}`)
            //     }
            //     updateChart(parseInt($('#chartBalance').val()), parseInt($('#chartTime').val()));
            // });
            $('input.input-slider').on('input', function(e) {
                let minVal = $(e.target).attr('min');
                let maxVal = $(e.target).attr('max');
                let percent = (($(e.target).val() - minVal) / (maxVal - minVal)) * 100;
                $(e.target).css('background', 'linear-gradient(to right, #e42082 0%, #e42082 ' + percent + '%, #f0f0f0 ' + percent + '%, #f0f0f0 100%)');
                let balanceVal = $('#chartBalance').val();
                let timeVal = $('#chartTime').val();
                let timeYear = Math.floor(timeVal / 12);
                let timeMonth = timeVal % 12;
                if ($(e.target).attr('id') == 'chartBalance') {
                    balanceVal = 'S' + formatter($(e.target).val(), false)
                    $('.homt-chart-balance-start').text(balanceVal)
                    $(e.target).parent().parent().find('.home-chart-ctrl-number').text(balanceVal)
                } else if ($(e.target).attr('id') == 'chartTime') {
                    timeVal = $(e.target).val()
                    timeYear = Math.floor(timeVal / 12);
                    timeMonth = timeVal % 12;

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
                    if (timeVal <= 244) {
                        $('.homt-chart-balance-start').addClass('mod-lift')
                    } else {
                        $('.homt-chart-balance-start').removeClass('mod-lift')
                    }
                    $('.home-chart-time-txt').text(`${timeYear == 0 ? '' : timeYear + ' ' + yearUnit}${timeMonth == 0 ? '' : ' ' + timeMonth + ' ' + monthUnit}${unitExtra} time`)
                    //$(e.target).parent().parent().find('.home-chart-ctrl-number').text(`${timeVal} ${monthUnit}`)
                    $(e.target).parent().parent().find('.home-chart-ctrl-number').text(`${timeYear == 0 ? '' : timeYear + ' ' + yearUnit} ${timeMonth == 0 ? '' : timeMonth + ' ' + monthUnit}`)
                }
            })
            $('input.input-slider').on('input', debounce(function(e) {
                updateChart(parseInt($('#chartBalance').val()), parseInt($('#chartTime').val()));
            }, 100))

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
        if ($('.home-comp').length >= 1) {
            homeChartHandle();
        }
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
                    $('.home-testi-col-inner').find('.load-ske').addClass('loaded')
                    homeTestiHandleNew();
                }
            });
        }
        getHomeTesti();
        function homeTestiHandleNew() {
            console.log('init new testi')
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
            if ($(window).width() > 991) {
                $('.home-testi-main').on('mouseenter', function(e) {
                    lenis.stop();
                })
                $('.home-testi-main').on('mouseleave', function(e) {
                    lenis.start();
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
            }
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
                // gsap.set('.sc-home-testi', {top: offsetVal})
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
                        },
                    }
                });
                homeTestiTl.to('.home-testi-bar-inner', {scaleX: 1, ease: 'none'})
                .fromTo('.home-testi-col-inner.mod-left', {yPercent: 0, ease: 'none'}, {y: -distanceVal, ease: 'none'},'0')
                .fromTo('.home-testi-col-inner.mod-right', {yPercent: 0, ease: 'none'}, {y: distanceVal, ease: 'none'},'0')
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
            }
            ScrollTrigger.create({
                trigger: '.home-card-title',
                start: 'center center',
                end: 'center center',
                once: true,
                onEnter: () => {
                    homeCardHandle()
                }
            })
        };
        function homeGraphHandle() {
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-graph-main',
                    start: 'top center',
                }
            });
            tl
            .from('.home-graph-main-item', {autoAlpha: 0, yPercent: 50, stagger: .14, duration: .6})

            $('.home-graph-note-txt [href="#FAQs"]').on('click', function(e) {
                let faqEl = $('.home-faq-item#what-is-the-chocolate-top-up-programme-and-its-qualifying-period');
                if (!faqEl.hasClass('active')) {
                    faqEl.find('.home-faq-item-head').trigger('click')
                }
            })
        }
        homeGraphHandle();

        function homeClimateHandle() {
            let vid = document.querySelector('.vid-home-climate');

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
                vid.currentTime = 0.;
            }
            const homeClimateVideoTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-climate-vid-inner',
                    start: `top top+=45%`,
                    onEnter: () => {
                        vid.currentTime = 0.;
                        vid.play();
                    },
                    // onEnterBack: () => {
                    //     vid.currentTime = 0.;
                    //     vid.play();
                    // }
                }
            });


        };
        //homeClimateHandle();
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
        //homeQrMove()
        function homeCardHandle() {
            console.log('init home card')
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
            getAllDataByType('faq').then((res) => {
                if (res) {
                    let activeFaqItem = res.filter(i => i.data.cf_config[0]?.show_on_homepage)
                    let allFaq = sortAsc(activeFaqItem, true, 'order_on_homepage', true)
                    $('.home-faq-main').html('').attr(schemaFAQParentAttrs);
                    allFaq.forEach((i) => {
                        createFaqNew(i).appendTo($('.home-faq-main'))
                    })
                    updateInterestRate('.home-faq-main');
                    $('.home-faq-main').find('.load-ske').addClass('loaded')
                    animateFaq();
                    scrollToFaq();
                }
            });
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
        // if ($(window).width() < 767) {
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
        // }
        function homeGetFaq() {
            getAllDataByType('faq').then((res) => {
                if (res) {
                    let activeFaqItem = res.filter(i => i.data.cf_config[0]?.show_on_how_it_works)
                    let allFaq = sortAsc(activeFaqItem, true, 'order_on_how_it_works', true)
                    $('.home-faq-main').html('').attr(schemaFAQParentAttrs)
                    allFaq.forEach((i) => {
                        createFaqNew(i).appendTo($('.home-faq-main'))
                    })
                    updateInterestRate('.home-faq-main');
                    $('.home-faq-main').find('.load-ske').addClass('loaded')
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
                // console.log(allHeight)
                $('.how-expect-card').on('click', function(e) {
                    e.preventDefault()
                    let target = $(this).index()
                    if ($(this).hasClass('active')) {
                        // $('.how-expect-card-wrap').removeClass('active-1 active-2 active-3')
                        // $('.how-expect-card .how-expect-card-sub').attr('style', '')
                        // $('.how-expect-card-wrap').attr('style', '')
                        // $('.how-expect-card').attr('style', '')
                        // $('.how-expect-card').removeClass('active')
                        // $('.how-expect-card').removeClass('de-active')
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

            if ($(window).width() <= 991) {
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

        function getCEOProfiles() {
            getAllDataByType('ceo_profiles').then((res) => {
                if (res) {
                    let allProfile = sortAsc(res, true, 'order');
                    let template = $('.abt-hero-logo-wrap').eq(0).clone();
                    $('.abt-hero-logos').html('')
                    allProfile.forEach(({ data }, i) => {
                        if (i < 3) createCEOProfileHTML(template, data).appendTo($('.abt-hero-logos'))
                    })
                    $('.abt-hero-logos').removeClass('on-hide')
                    $('.abt-hero-logos').find('.load-ske').addClass('loaded')
                }
            });
        }
        getCEOProfiles();

        //aboutClimateHanlde();
        function aboutGetFaq() {
            getAllDataByType('faq').then((res) => {
                if (res) {
                    let activeFaqItem = res.filter(i => i.data.cf_config[0]?.show_on_about_us)
                    let allFaq = sortAsc(activeFaqItem, true, 'order_on_about_us', true)
                    $('.home-faq-main').html('').attr(schemaFAQParentAttrs)
                    allFaq.forEach((i) => {
                        createFaqNew(i).appendTo($('.home-faq-main'))
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
                $(item).attr('href', '#').css('pointer-events', 'none').on('click', function(e) {e.preventDefault});
                $(item).closest('p').attr('data-tab-table', idx).addClass('tab-table-item').css('cursor', 'pointer');
            })
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
            if (isStagging) {
                updateTabTable();
            }
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
            // console.log(newPath)
            //Require 301 Redirect on Webflow
            history.replaceState({},'',`${newPath + hash}`)

            if ((newPath == '/app-terms-and-conditions') || (newPath == '/privacy-policy')) {
                //$('.header').remove();
                //$('.nav').remove();
                // $('.sc-home-cta-waitlist').remove();
                // $('.sc-footer').remove();
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
            // $('.sc-term-main-inner-item').eq(0).fadeIn()

            const activeTab = (index) => {
                $('.mod-term-subnav').removeClass('active');
                $('.mod-term-subnav').eq(index).addClass('active');
                // $(`.sc-term-main-inner-item`).fadeOut()
                // $(`.sc-term-main-inner-item[data-subnav="${index}"]`).fadeIn();
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
                    // $('.term-toc-wrap-overlay').addClass('on-scroll')
                    if ($('.header').hasClass('on-scroll') && !$('.header').hasClass('on-hide')) {
                        $('.sc-term-sub-nav, .term-toc-wrap-overlay').addClass('on-scroll')
                    } else {
                        $('.sc-term-sub-nav, .term-toc-wrap-overlay').removeClass('on-scroll')
                    }
                    // if (inst.scroll > $('.term-outer-wrap').offset().top) {
                    //     //$('.sc-term-sub-nav').addClass('on-scroll')
                    // } else {
                    //     //$('.term-toc-wrap-overlay').removeClass('on-cus-scroll')
                    //     //$('.sc-term-sub-nav').removeClass('on-scroll')
                    // }
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
                if (true) {
                    //Tab
                    let faqTabHtml = faqTabTemplate.clone();
                    faqTabHtml.find('.faq-cate-btn').text(faqCate.data.name).attr('href',`#${faqCate.uid.replaceAll('.','')}`).attr('data-scrollTo', faqCate.uid.replaceAll('.',''))
                    $('.faq-cate-inner').append(faqTabHtml)
                    //List
                    let faqListHtml = faqListTemplate.clone().attr('id',`${faqCate.uid.replaceAll('.','')}`);
                    faqListHtml.find('.faq-cate-title-wrap').find('.faq-cate-title').text(faqCate.data.name)
                    $('.faq-main-wrap').append(faqListHtml)
                }
                $('.sc-faq-main').find('.load-ske').addClass('loaded')
            })
        }
        function updateAllFaq() {
            const faqSearchItemTemplate = $('.faq-srch-item').eq(0).clone();
            $('.faq-srch-drop-inner').html('')

            getAllDataByType('faq').then((res) => {
                let activeFaqItem = res.filter(i => i.data.cf_config[0])
                let allFaqItem = sortAsc(activeFaqItem, true, 'order_on_faqs', true)
                allFaqItem.forEach((i) => {
                    if (true) {
                        //Faq into their Category
                        let parentSlot;
                        if (i.data.faq_category.uid) {
                            parentSlot = $(`.faq-cate-wrap[id="${i.data.faq_category.uid.replaceAll('.','')}"]`).find('.faq-cate-list')
                            createFaqNew(i).appendTo(parentSlot)
                        }

                        //Search
                        let faqSearchHtml = faqSearchItemTemplate.clone().attr('data-scrollto',`${i.uid.replaceAll('.','')}`)
                        faqSearchHtml.find('.txt-16').text(i.data.question);
                        //Search item answer
                        faqSearchHtml.find('.hidden.data-faq-srch-body').append($(createFaqNew(i)).find('.home-faq--itemans').text().replaceAll('\n', ' '))
                        $('.faq-srch-drop-inner').append(faqSearchHtml)
                    }
                })
                animateFaq();
                updateInterestRate('.faq-main-wrap');
                faqInteraction();
                cleanupEmptyCate();
                $('.faq-main-wrap').find('.load-ske').addClass('loaded')

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
                        let top = allTitle.eq(x).get(0).getBoundingClientRect().top - parseFloat(allTitle.eq(x).css('padding-top'));
                        if (top > 0 && top < ($(window).height() / 5 + 100)) {
                            $('.faq-cate-list-contain .faq-cate-btn').eq(x).addClass('active');
                            $('.faq-cate-list-contain .faq-cate-btn').not(`:eq(${x})`).removeClass('active');
                            faqCateSwiper.slideTo(x)
                        }
                    }
                })
                $('.txt-16.home-faq-empty').hide();
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
            onSuccess,
            onFail,
            onStart
            }) => {
            $(document).ajaxStart(function () {
              // onStart?.();
              const valInputCheck=$('form[data-name="contactUs"] .bp-trap').val();
              console.log(valInputCheck)
              if(valInputCheck=='' || valInputCheck== undefined){
                onStart?.();
              } else {
                $(document).ajaxSend(function(event, jqxhr, settings) {
                    jqxhr.abort();
                });
              }
            });
            $(document).ajaxComplete(function (event, xhr, settings) {
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
        })()
        formSubmitEvent.init({
            onlyWorkOnThisFormName: "contactUs",
            onStart: function () {
                $('form.ctc-form [data-form="submit"]').val('Please wait...')
            },
            onSuccess: () => {
                triggerFormSuccess('contact', 'contactUs');
                $('form.ctc-form [data-form="submit"]').val('Submit')
                $(this).trigger('reset')
            },
            onFail: () => {
                console.log('fail')
            }
        });
        // $('form.ctc-form').on('submit', function(e) {
        //     e.preventDefault();
        //     let formName = $(this).attr('data-name');
        //     triggerContactBlueShift();
        //     triggerFormSuccess('contact', formName);
        //     $(this).trigger('reset')
        //     return false;
        // })
        // $('form.ctc-form').find('[data-form="submit"]').on('click', function(e) {
        //     e.preventDefault();
        //     $('form.ctc-form').submit()
        // })

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
        // updateParam();

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
        getAllDocs()
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
        $('.doc-main-tab-wrap').on('click', '.doc-main-tab', function(e) {
            e.preventDefault();
            console.log('click');
            let target = $(this).attr('id');
            // lenis.scrollTo(`#${target}`, { offset: -100 });
            $('.doc-main-tab').removeClass('active');
            $(this).addClass('active');
            $('.doc-main-content-inner').removeClass('active');
            $(`.doc-main-content-inner#${target}`).addClass('active');
            updateTocUI();
            $('.term-toc-head-txt').text($('.term-toc-inner .term-toc-item-link').eq(0).find('.term-toc-item-txt').text())
        });
    }

    SCRIPT.waitlistScript = () => {

    }
    SCRIPT.referralRewardScript = () => {

    }
    SCRIPT.usdScript = () => {
        $('.home-graph-note-txt [href="#FAQs"], .usd-benef-sub-new-link[href="#FAQs"]').on('click', function(e) {
            let faqEl = $('.home-faq-item#what-is-the-chocolate-top-up-programme-and-its-qualifying-period');
            if (!faqEl.hasClass('active')) {
                faqEl.find('.home-faq-item-head').trigger('click')
            }
        })
        function usdGetFaq() {
            getAllDataByType('faq').then((res) => {
                console.log(res)
                if (res) {
                    let activeFaqItem = res.filter(i => i.data.cf_config[0]?.show_on_usd_page)
                    let allFaq = sortAsc(activeFaqItem, true, 'order_on_usd_page', true)
                    $('.home-faq-main').html('').attr(schemaFAQParentAttrs)
                    allFaq.forEach((i) => {
                        createFaqNew(i).appendTo($('.home-faq-main'))
                    })
                    updateInterestRate('.home-faq-main');
                    $('.home-faq-main').find('.load-ske').addClass('loaded')
                    animateFaq();
                    scrollToFaq();
                }
            });
            function scrollToFaq() {
                $('[data-scroll-faq]').on('click', function(e) {
                    e.preventDefault();
                    console.log('click')
                    e.preventDefault();
                    let target = $(this).attr('data-scroll-faq');
                    console.log(target)
                    if ($(`#${target}`).length >= 1) {
                        lenis.scrollTo(target)
                        $(`#${target}`).find('.home-faq-item-head').trigger('click')
                    } else {
                        lenis.scrollTo(`${$(this).attr('href')}`)
                    }

                })
            }
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
            getAllDataByType('faq').then((res) => {
                if (res) {
                    let activeFaqItem = res.filter(i => i.data.cf_config[0]?.show_on_corporate_page)
                    let allFaq = sortAsc(activeFaqItem, true, 'order_on_corporate_page', true)
                    $('.home-faq-main').html('').attr(schemaFAQParentAttrs)
                    allFaq.forEach((i) => {
                        createFaqNew(i).appendTo($('.home-faq-main'))
                    })
                    updateInterestRate('.home-faq-main');
                    $('.home-faq-main').find('.load-ske').addClass('loaded')
                    animateFaq();
                }
            });
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
            getAllDataByType('faq').then((res) => {
                console.log(res)
                if (res) {
                    let activeFaqItem = res.filter(i => i.data.cf_config[0]?.show_on_card_page)
                    let allFaq = sortAsc(activeFaqItem, true, 'order_on_card_page', true)
                    $('.home-faq-main').html('').attr(schemaFAQParentAttrs)
                    allFaq.forEach((i) => {
                        createFaqNew(i).appendTo($('.home-faq-main'))
                    })
                    updateInterestRate('.home-faq-main');
                    $('.home-faq-main').find('.load-ske').addClass('loaded')
                    animateFaq();
                }
            });
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
            let tlHeart = gsap.timeline({
                scrollTrigger: {
                    trigger: '.thank-hero-ic-heart',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                }
            });
            requestAnimationFrame(() => {
                tlHeart
                .fromTo('.thank-hero-ic-heart', { yPercent: -40 }, {yPercent: 40})    
            })
            let tlHand = gsap.timeline({
                scrollTrigger: {
                    trigger: '.thank-hero-ic-hand',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
            requestAnimationFrame(() => {
                tlHand
                .fromTo('.thank-hero-ic-hand', { yPercent: -40 }, {yPercent: 40})    
            })
        }
        thankHero();
        function thankReview() {
            let gapSlide = parseRem(20);
            let slideView = 5;
            if(viewport.w < 991 && viewport.w > 479){
                slideView = 2.4;
            }
            else if(viewport.w < 479){
                slideView= 1.2;
                gapSlide = parseRem(24);
            }
            let maxHeightSlide = parseRem(1200);
            console.log(maxHeightSlide)
            let widthSwiperSlide = ($('.thank-review-main').width() - gapSlide*(slideView -1))/slideView;
            let avtAnonymous = 'https://cdn.prod.website-files.com/6385cd39c09f99658407a3ec/6837d7eedcaaae5738e36587_icon-anonymous.svg'
            let swiperSlide = $('.thank-review-list').eq(0).clone();
            let itemReview = swiperSlide.find('.thank-review-item').eq(0).clone();
            let icRateGood = swiperSlide.find('.thank-review-item-rate-item.item-good').eq(0).clone();
            let icRateBad = swiperSlide.find('.thank-review-item-rate-item.item-bad').eq(0).clone();
            itemReview.find('.thank-review-item-rate-item').remove();
            swiperSlide.css('width', widthSwiperSlide)
            swiperSlide.find('.thank-review-item').remove();
            $('.thank-review-inner').html('');
            $('.thank-review-inner').append(swiperSlide.clone());
            let i = 0;
            getAllDataByType('user_review').then((res) => {
                console.log(res)
                if (res) {
                    res.forEach((item, idx) => {
                        let itemHtml = itemReview.clone();
                        console.log(item.id)
                        let newItem = createItemReview(item, itemHtml);
                        if(viewport.w > 479){
                            $('.thank-review-inner .thank-review-list').eq(i).append(newItem.clone());
                            let currentHeigthSwiper = $('.thank-review-inner .thank-review-list').eq(i).height();
                            if (currentHeigthSwiper > maxHeightSlide) {
                                //$('.thank-review-inner .thank-review-list').eq(i) remove item last child
                                $('.thank-review-inner .thank-review-list').eq(i).find('.thank-review-item').last().remove();
                                $('.thank-review-inner').append(swiperSlide.clone())
                                i++;
                                $('.thank-review-inner .thank-review-list').eq(i).append(newItem.clone());
                            }
                        }
                        else {
                            if (idx < 11) {
                                $('.thank-review-inner .thank-review-list').eq(i).append(newItem.clone());
                                i++;
                                if(i < 10) {
                                    $('.thank-review-inner').append(swiperSlide.clone())
                                }
                            }
                        }
                           
                    })
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
                    $('.thank-review-main').find('.load-ske').addClass('loaded');
                    ScrollTrigger.refresh();
                }
            });
            function createItemReview(item, itemHtml ){
                itemHtml.attr('key', item.id)
                if(!item.data.platform_icon.url ){
                    console.log('anonymous')
                    itemHtml.find('.thank-review-item-avt img').attr('src', avtAnonymous);
                    itemHtml.find('.thank-review-item-platform').remove();
                    itemHtml.find('.thank-review-item-rate').remove();
                }else{
                    itemHtml.find('.thank-review-item-platform-ic img').attr('src', item.data.platform_icon.url);
                    if(item.data.avatar.url !== ''){
                        itemHtml.find('.thank-review-item-avt img').attr('src', item.data.avatar.url);
                    }
                }
                itemHtml.find('.thank-review-item-content').text(item.data.review_content[0].text);
                if(item.data.user_name[0] && item.data.user_name[0].text !== ''){
                    if(item.data.date) {
                        itemHtml.find('.thank-review-item-name').text(`${item.data.user_name[0].text},`)
                    }
                    else {
                        itemHtml.find('.thank-review-item-name').text(`${item.data.user_name[0].text}`)
                    }
                }
                else {
                    itemHtml.find('.thank-review-item-name').remove();
                }
                if(item.data.date){
                    itemHtml.find('.thank-review-item-date').text(toDateFormat(item.data.date))
                }
                else {
                    itemHtml.find('.thank-review-item-date').remove();
                }
                if(item.data.number_rating !== null){
                    for(let i = 0; i < item.data.number_rating; i++){
                        itemHtml.find('.thank-review-item-rate').append(icRateGood.clone());
                    }
                    for(let i = 0; i < (5 - item.data.number_rating); i++){
                        itemHtml.find('.thank-review-item-rate').append(icRateBad.clone());
                    }
                }
                return itemHtml;
            }
        }
        thankReview();
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
               .fromTo('.thank-community-fashion-row.item1 .thank-community-fashion-item', { yPercent: -20 }, {yPercent: 20})
               .fromTo('.thank-community-fashion-row.item2 .thank-community-fashion-item', { yPercent: 20 }, {yPercent: -20}, '<=0')
               .fromTo('.thank-community-fashion-row.item3 .thank-community-fashion-item', { yPercent: -20 }, {yPercent: 20}, '<=0')
        }
        homeCommunity();
        function thankGetFaq() {
            getAllDataByType('faq').then((res) => {
                if (res) {
                    let activeFaqItem = res.filter(i => i.data.cf_config[0]?.show_on_homepage)
                    let allFaq = sortAsc(activeFaqItem, true, 'order_on_homepage', true)
                    $('.home-faq-main').html('').attr(schemaFAQParentAttrs)
                    allFaq.forEach((i) => {
                        createFaqNew(i).appendTo($('.home-faq-main'))
                    })
                    updateInterestRate('.home-faq-main');
                    $('.home-faq-main').find('.load-ske').addClass('loaded')
                    animateFaq();
                    scrollToFaq();
                }
            });
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
        }
        thankGetFaq();
    }
    SCRIPT.guaranteeScript = () => {
        if (!isStagging) return;
        const sgdToUsd = parseFloat($('.sgd-to-usd').text());
        const usdToSgd = 1/sgdToUsd;
        function guaranteeFee() {
            $('.guarantee-fee-form-input').on('input', function () {
                let fee = $(this).val();
                // clean all text
                let cleanedFee = fee.replace(/[^\d.,]/g, '');
                const lastComma = cleanedFee.lastIndexOf(',');
                const lastDot = cleanedFee.lastIndexOf('.');
                // function only get one dot or one comma
                if (lastComma > -1 && lastDot > -1) {
                    if (lastComma > lastDot) {
                        cleanedFee = cleanedFee.replace(/\./g, ''); 
                        cleanedFee = cleanedFee.replace(/(,)(?=.*\,)/g, '');
                    } else {
                        cleanedFee = cleanedFee.replace(/\,/g, ''); 
                        cleanedFee = cleanedFee.replace(/(\.)(?=.*\.)/g, '');
                    }
                } else {
                    cleanedFee = cleanedFee
                        .replace(/,/g, (match, offset) => offset === 0 ? '' : ',') 
                        .replace(/(,)(?=.*\,)/g, '') 
                        .replace(/\./g, (match, offset) => offset === 0 ? '' : '.') 
                        .replace(/(\.)(?=.*\.)/g, ''); 
                }
                if (cleanedFee.startsWith(',') || cleanedFee.startsWith('.')) {
                    cleanedFee = cleanedFee.substring(1);
                }
                // update value input
                if (fee !== cleanedFee) {
                    $(this).val(cleanedFee);
                    fee = cleanedFee;
                }
                $('.guarantee-fee-form-input-val').text(fee);
            });
            $('.guarantee-fee-convert-ic').on('click', function () {
                
            })
        }
        function sgdToUsdFunc(value) {
            return parseFloat(value) * 0.000043;
        }
        guaranteeFee();
    }
    const pageName = $('.main').attr('data-barba-namespace');
    if (pageName) {
        detectPage(pageName)
        SCRIPT[(`${pageName}Script`)]();
    }
}

window.onload = mainScript;