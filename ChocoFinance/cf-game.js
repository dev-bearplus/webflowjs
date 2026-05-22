const mainScript = () => {
    // CircleType
    !function (t, n) { "object" == typeof exports && "object" == typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define([], n) : "object" == typeof exports ? exports.CircleType = n() : t.CircleType = n() }(window, (function () { return function (t) { var n = {}; function e(r) { if (n[r]) return n[r].exports; var i = n[r] = { i: r, l: !1, exports: {} }; return t[r].call(i.exports, i, i.exports, e), i.l = !0, i.exports } return e.m = t, e.c = n, e.d = function (t, n, r) { e.o(t, n) || Object.defineProperty(t, n, { enumerable: !0, get: r }) }, e.r = function (t) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 }) }, e.t = function (t, n) { if (1 & n && (t = e(t)), 8 & n) return t; if (4 & n && "object" == typeof t && t && t.__esModule) return t; var r = Object.create(null); if (e.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: t }), 2 & n && "string" != typeof t) for (var i in t) e.d(r, i, function (n) { return t[n] }.bind(null, i)); return r }, e.n = function (t) { var n = t && t.__esModule ? function () { return t.default } : function () { return t }; return e.d(n, "a", n), n }, e.o = function (t, n) { return Object.prototype.hasOwnProperty.call(t, n) }, e.p = "", e(e.s = 28) }([function (t, n, e) { var r = e(13)("wks"), i = e(12), o = e(1).Symbol, u = "function" == typeof o; (t.exports = function (t) { return r[t] || (r[t] = u && o[t] || (u ? o : i)("Symbol." + t)) }).store = r }, function (t, n) { var e = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(); "number" == typeof __g && (__g = e) }, function (t, n) { var e = t.exports = { version: "2.6.11" }; "number" == typeof __e && (__e = e) }, function (t, n, e) { var r = e(4), i = e(11); t.exports = e(6) ? function (t, n, e) { return r.f(t, n, i(1, e)) } : function (t, n, e) { return t[n] = e, t } }, function (t, n, e) { var r = e(5), i = e(33), o = e(34), u = Object.defineProperty; n.f = e(6) ? Object.defineProperty : function (t, n, e) { if (r(t), n = o(n, !0), r(e), i) try { return u(t, n, e) } catch (t) { } if ("get" in e || "set" in e) throw TypeError("Accessors not supported!"); return "value" in e && (t[n] = e.value), t } }, function (t, n, e) { var r = e(10); t.exports = function (t) { if (!r(t)) throw TypeError(t + " is not an object!"); return t } }, function (t, n, e) { t.exports = !e(18)((function () { return 7 != Object.defineProperty({}, "a", { get: function () { return 7 } }).a })) }, function (t, n) { var e = {}.hasOwnProperty; t.exports = function (t, n) { return e.call(t, n) } }, function (t, n) { var e = Math.ceil, r = Math.floor; t.exports = function (t) { return isNaN(t = +t) ? 0 : (t > 0 ? r : e)(t) } }, function (t, n) { t.exports = function (t) { if (null == t) throw TypeError("Can't call method on  " + t); return t } }, function (t, n) { t.exports = function (t) { return "object" == typeof t ? null !== t : "function" == typeof t } }, function (t, n) { t.exports = function (t, n) { return { enumerable: !(1 & t), configurable: !(2 & t), writable: !(4 & t), value: n } } }, function (t, n) { var e = 0, r = Math.random(); t.exports = function (t) { return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++e + r).toString(36)) } }, function (t, n, e) { var r = e(2), i = e(1), o = i["__core-js_shared__"] || (i["__core-js_shared__"] = {}); (t.exports = function (t, n) { return o[t] || (o[t] = void 0 !== n ? n : {}) })("versions", []).push({ version: r.version, mode: e(16) ? "pure" : "global", copyright: "© 2019 Denis Pushkarev (zloirock.ru)" }) }, function (t, n) { t.exports = {} }, function (t, n, e) { var r = e(13)("keys"), i = e(12); t.exports = function (t) { return r[t] || (r[t] = i(t)) } }, function (t, n) { t.exports = !1 }, function (t, n, e) { var r = e(1), i = e(2), o = e(3), u = e(20), c = e(21), a = function (t, n, e) { var f, s, l, p, h = t & a.F, v = t & a.G, d = t & a.S, y = t & a.P, m = t & a.B, g = v ? r : d ? r[n] || (r[n] = {}) : (r[n] || {}).prototype, _ = v ? i : i[n] || (i[n] = {}), x = _.prototype || (_.prototype = {}); for (f in v && (e = n), e) l = ((s = !h && g && void 0 !== g[f]) ? g : e)[f], p = m && s ? c(l, r) : y && "function" == typeof l ? c(Function.call, l) : l, g && u(g, f, l, t & a.U), _[f] != l && o(_, f, p), y && x[f] != l && (x[f] = l) }; r.core = i, a.F = 1, a.G = 2, a.S = 4, a.P = 8, a.B = 16, a.W = 32, a.U = 64, a.R = 128, t.exports = a }, function (t, n) { t.exports = function (t) { try { return !!t() } catch (t) { return !0 } } }, function (t, n, e) { var r = e(10), i = e(1).document, o = r(i) && r(i.createElement); t.exports = function (t) { return o ? i.createElement(t) : {} } }, function (t, n, e) { var r = e(1), i = e(3), o = e(7), u = e(12)("src"), c = e(35), a = ("" + c).split("toString"); e(2).inspectSource = function (t) { return c.call(t) }, (t.exports = function (t, n, e, c) { var f = "function" == typeof e; f && (o(e, "name") || i(e, "name", n)), t[n] !== e && (f && (o(e, u) || i(e, u, t[n] ? "" + t[n] : a.join(String(n)))), t === r ? t[n] = e : c ? t[n] ? t[n] = e : i(t, n, e) : (delete t[n], i(t, n, e))) })(Function.prototype, "toString", (function () { return "function" == typeof this && this[u] || c.call(this) })) }, function (t, n, e) { var r = e(36); t.exports = function (t, n, e) { if (r(t), void 0 === n) return t; switch (e) { case 1: return function (e) { return t.call(n, e) }; case 2: return function (e, r) { return t.call(n, e, r) }; case 3: return function (e, r, i) { return t.call(n, e, r, i) } }return function () { return t.apply(n, arguments) } } }, function (t, n, e) { var r = e(42), i = e(9); t.exports = function (t) { return r(i(t)) } }, function (t, n) { var e = {}.toString; t.exports = function (t) { return e.call(t).slice(8, -1) } }, function (t, n, e) { var r = e(8), i = Math.min; t.exports = function (t) { return t > 0 ? i(r(t), 9007199254740991) : 0 } }, function (t, n) { t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",") }, function (t, n, e) { var r = e(4).f, i = e(7), o = e(0)("toStringTag"); t.exports = function (t, n, e) { t && !i(t = e ? t : t.prototype, o) && r(t, o, { configurable: !0, value: n }) } }, function (t, n, e) { var r = e(9); t.exports = function (t) { return Object(r(t)) } }, function (t, n, e) { e(29); var r = e(54).default; t.exports = r }, function (t, n, e) { e(30), e(47), t.exports = e(2).Array.from }, function (t, n, e) { "use strict"; var r = e(31)(!0); e(32)(String, "String", (function (t) { this._t = String(t), this._i = 0 }), (function () { var t, n = this._t, e = this._i; return e >= n.length ? { value: void 0, done: !0 } : (t = r(n, e), this._i += t.length, { value: t, done: !1 }) })) }, function (t, n, e) { var r = e(8), i = e(9); t.exports = function (t) { return function (n, e) { var o, u, c = String(i(n)), a = r(e), f = c.length; return a < 0 || a >= f ? t ? "" : void 0 : (o = c.charCodeAt(a)) < 55296 || o > 56319 || a + 1 === f || (u = c.charCodeAt(a + 1)) < 56320 || u > 57343 ? t ? c.charAt(a) : o : t ? c.slice(a, a + 2) : u - 56320 + (o - 55296 << 10) + 65536 } } }, function (t, n, e) { "use strict"; var r = e(16), i = e(17), o = e(20), u = e(3), c = e(14), a = e(37), f = e(26), s = e(46), l = e(0)("iterator"), p = !([].keys && "next" in [].keys()), h = function () { return this }; t.exports = function (t, n, e, v, d, y, m) { a(e, n, v); var g, _, x, b = function (t) { if (!p && t in S) return S[t]; switch (t) { case "keys": case "values": return function () { return new e(this, t) } }return function () { return new e(this, t) } }, w = n + " Iterator", O = "values" == d, j = !1, S = t.prototype, M = S[l] || S["@@iterator"] || d && S[d], T = M || b(d), P = d ? O ? b("entries") : T : void 0, A = "Array" == n && S.entries || M; if (A && (x = s(A.call(new t))) !== Object.prototype && x.next && (f(x, w, !0), r || "function" == typeof x[l] || u(x, l, h)), O && M && "values" !== M.name && (j = !0, T = function () { return M.call(this) }), r && !m || !p && !j && S[l] || u(S, l, T), c[n] = T, c[w] = h, d) if (g = { values: O ? T : b("values"), keys: y ? T : b("keys"), entries: P }, m) for (_ in g) _ in S || o(S, _, g[_]); else i(i.P + i.F * (p || j), n, g); return g } }, function (t, n, e) { t.exports = !e(6) && !e(18)((function () { return 7 != Object.defineProperty(e(19)("div"), "a", { get: function () { return 7 } }).a })) }, function (t, n, e) { var r = e(10); t.exports = function (t, n) { if (!r(t)) return t; var e, i; if (n && "function" == typeof (e = t.toString) && !r(i = e.call(t))) return i; if ("function" == typeof (e = t.valueOf) && !r(i = e.call(t))) return i; if (!n && "function" == typeof (e = t.toString) && !r(i = e.call(t))) return i; throw TypeError("Can't convert object to primitive value") } }, function (t, n, e) { t.exports = e(13)("native-function-to-string", Function.toString) }, function (t, n) { t.exports = function (t) { if ("function" != typeof t) throw TypeError(t + " is not a function!"); return t } }, function (t, n, e) { "use strict"; var r = e(38), i = e(11), o = e(26), u = {}; e(3)(u, e(0)("iterator"), (function () { return this })), t.exports = function (t, n, e) { t.prototype = r(u, { next: i(1, e) }), o(t, n + " Iterator") } }, function (t, n, e) { var r = e(5), i = e(39), o = e(25), u = e(15)("IE_PROTO"), c = function () { }, a = function () { var t, n = e(19)("iframe"), r = o.length; for (n.style.display = "none", e(45).appendChild(n), n.src = "javascript:", (t = n.contentWindow.document).open(), t.write("<script>document.F=Object<\/script>"), t.close(), a = t.F; r--;)delete a.prototype[o[r]]; return a() }; t.exports = Object.create || function (t, n) { var e; return null !== t ? (c.prototype = r(t), e = new c, c.prototype = null, e[u] = t) : e = a(), void 0 === n ? e : i(e, n) } }, function (t, n, e) { var r = e(4), i = e(5), o = e(40); t.exports = e(6) ? Object.defineProperties : function (t, n) { i(t); for (var e, u = o(n), c = u.length, a = 0; c > a;)r.f(t, e = u[a++], n[e]); return t } }, function (t, n, e) { var r = e(41), i = e(25); t.exports = Object.keys || function (t) { return r(t, i) } }, function (t, n, e) { var r = e(7), i = e(22), o = e(43)(!1), u = e(15)("IE_PROTO"); t.exports = function (t, n) { var e, c = i(t), a = 0, f = []; for (e in c) e != u && r(c, e) && f.push(e); for (; n.length > a;)r(c, e = n[a++]) && (~o(f, e) || f.push(e)); return f } }, function (t, n, e) { var r = e(23); t.exports = Object("z").propertyIsEnumerable(0) ? Object : function (t) { return "String" == r(t) ? t.split("") : Object(t) } }, function (t, n, e) { var r = e(22), i = e(24), o = e(44); t.exports = function (t) { return function (n, e, u) { var c, a = r(n), f = i(a.length), s = o(u, f); if (t && e != e) { for (; f > s;)if ((c = a[s++]) != c) return !0 } else for (; f > s; s++)if ((t || s in a) && a[s] === e) return t || s || 0; return !t && -1 } } }, function (t, n, e) { var r = e(8), i = Math.max, o = Math.min; t.exports = function (t, n) { return (t = r(t)) < 0 ? i(t + n, 0) : o(t, n) } }, function (t, n, e) { var r = e(1).document; t.exports = r && r.documentElement }, function (t, n, e) { var r = e(7), i = e(27), o = e(15)("IE_PROTO"), u = Object.prototype; t.exports = Object.getPrototypeOf || function (t) { return t = i(t), r(t, o) ? t[o] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? u : null } }, function (t, n, e) { "use strict"; var r = e(21), i = e(17), o = e(27), u = e(48), c = e(49), a = e(24), f = e(50), s = e(51); i(i.S + i.F * !e(53)((function (t) { Array.from(t) })), "Array", { from: function (t) { var n, e, i, l, p = o(t), h = "function" == typeof this ? this : Array, v = arguments.length, d = v > 1 ? arguments[1] : void 0, y = void 0 !== d, m = 0, g = s(p); if (y && (d = r(d, v > 2 ? arguments[2] : void 0, 2)), null == g || h == Array && c(g)) for (e = new h(n = a(p.length)); n > m; m++)f(e, m, y ? d(p[m], m) : p[m]); else for (l = g.call(p), e = new h; !(i = l.next()).done; m++)f(e, m, y ? u(l, d, [i.value, m], !0) : i.value); return e.length = m, e } }) }, function (t, n, e) { var r = e(5); t.exports = function (t, n, e, i) { try { return i ? n(r(e)[0], e[1]) : n(e) } catch (n) { var o = t.return; throw void 0 !== o && r(o.call(t)), n } } }, function (t, n, e) { var r = e(14), i = e(0)("iterator"), o = Array.prototype; t.exports = function (t) { return void 0 !== t && (r.Array === t || o[i] === t) } }, function (t, n, e) { "use strict"; var r = e(4), i = e(11); t.exports = function (t, n, e) { n in t ? r.f(t, n, i(0, e)) : t[n] = e } }, function (t, n, e) { var r = e(52), i = e(0)("iterator"), o = e(14); t.exports = e(2).getIteratorMethod = function (t) { if (null != t) return t[i] || t["@@iterator"] || o[r(t)] } }, function (t, n, e) { var r = e(23), i = e(0)("toStringTag"), o = "Arguments" == r(function () { return arguments }()); t.exports = function (t) { var n, e, u; return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (e = function (t, n) { try { return t[n] } catch (t) { } }(n = Object(t), i)) ? e : o ? r(n) : "Object" == (u = r(n)) && "function" == typeof n.callee ? "Arguments" : u } }, function (t, n, e) { var r = e(0)("iterator"), i = !1; try { var o = [7][r](); o.return = function () { i = !0 }, Array.from(o, (function () { throw 2 })) } catch (t) { } t.exports = function (t, n) { if (!n && !i) return !1; var e = !1; try { var o = [7], u = o[r](); u.next = function () { return { done: e = !0 } }, o[r] = function () { return u }, t(o) } catch (t) { } return e } }, function (t, n, e) { "use strict"; e.r(n); var r = function (t) { var n = t.getBoundingClientRect(); return { height: n.height, left: n.left + window.pageXOffset, top: n.top + window.pageYOffset, width: n.width } }; function i(t) { return function (t) { if (Array.isArray(t)) { for (var n = 0, e = new Array(t.length); n < t.length; n++)e[n] = t[n]; return e } }(t) || function (t) { if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t) }(t) || function () { throw new TypeError("Invalid attempt to spread non-iterable instance") }() } var o = Math.PI / 180, u = function (t) { return t * o }, c = function (t, n) { return t * (1 - Math.cos(u(n / 2))) }, a = 180 / Math.PI, f = function (t, n) { return t.reduce((function (t, e) { var r = e.width, i = r / n * a; return { "θ": t.θ + i, rotations: t.rotations.concat([t.θ + i / 2]) } }), { "θ": 0, rotations: [] }) }; function s(t, n) { for (var e = 0; e < n.length; e++) { var r = n[e]; r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r) } } var l = Math.PI, p = Math.max, h = Math.min, v = function () { function t(n, e) { !function (t, n) { if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function") }(this, t), this.element = n, this.originalHTML = this.element.innerHTML; var o = document.createElement("div"), u = document.createDocumentFragment(); o.setAttribute("aria-label", n.innerText), o.style.position = "relative", this.container = o, this._letters = function (t, n) { var e = document.createElement("span"); e.style.display = "inline-block"; var r = t.innerText.trim(); return (n ? n(r) : i(r)).map((function (t) { var n = e.cloneNode(); return n.insertAdjacentHTML("afterbegin", " " === t ? "&nbsp;" : t), n })) }(n, e), this._letters.forEach((function (t) { return u.appendChild(t) })), o.appendChild(u), this.element.innerHTML = "", this.element.appendChild(o); var c = window.getComputedStyle(this.element), a = c.fontSize, f = c.lineHeight; this._fontSize = parseFloat(a), this._lineHeight = parseFloat(f) || this._fontSize, this._metrics = this._letters.map(r); var s = this._metrics.reduce((function (t, n) { return t + n.width }), 0); this._minRadius = s / l / 2 + this._lineHeight, this._dir = 1, this._forceWidth = !1, this._forceHeight = !0, this._radius = this._minRadius, this._invalidate() } var n, e, o; return n = t, (e = [{ key: "radius", value: function (t) { return void 0 !== t ? (this._radius = p(this._minRadius, t), this._invalidate(), this) : this._radius } }, { key: "dir", value: function (t) { return void 0 !== t ? (this._dir = t, this._invalidate(), this) : this._dir } }, { key: "forceWidth", value: function (t) { return void 0 !== t ? (this._forceWidth = t, this._invalidate(), this) : this._forceWidth } }, { key: "forceHeight", value: function (t) { return void 0 !== t ? (this._forceHeight = t, this._invalidate(), this) : this._forceHeight } }, { key: "refresh", value: function () { return this._invalidate() } }, { key: "destroy", value: function () { return this.element.innerHTML = this.originalHTML, this } }, { key: "_invalidate", value: function () { var t = this; return cancelAnimationFrame(this._raf), this._raf = requestAnimationFrame((function () { t._layout() })), this } }, { key: "_layout", value: function () { var t = this, n = this._radius, e = this._dir, r = -1 === e ? -n + this._lineHeight : n, i = "center ".concat(r / this._fontSize, "em"), o = n - this._lineHeight, a = f(this._metrics, o), s = a.rotations, l = a.θ; if (this._letters.forEach((function (n, r) { var o = n.style, u = (-.5 * l + s[r]) * e, c = -.5 * t._metrics[r].width / t._fontSize, a = "translateX(".concat(c, "em) rotate(").concat(u, "deg)"); o.position = "absolute", o.bottom = -1 === e ? 0 : "auto", o.left = "50%", o.transform = a, o.transformOrigin = i, o.webkitTransform = a, o.webkitTransformOrigin = i })), this._forceHeight) { var p = l > 180 ? c(n, l) : c(o, l) + this._lineHeight; this.container.style.height = "".concat(p / this._fontSize, "em") } if (this._forceWidth) { var v = function (t, n) { return 2 * t * Math.sin(u(n / 2)) }(n, h(180, l)); this.container.style.width = "".concat(v / this._fontSize, "em") } return this } }]) && s(n.prototype, e), o && s(n, o), t }(); n.default = v }]) }));

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
    if ($('.intro-wrap').length) {
        $('.intro-wrap').addClass('loaded')
    }
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

    const lerp = (a, b, t = 0.08) => {
        return a + (b - a) * t;
    }
    function toTitle(slug) {
        return slug.replace(/-/g, " ").replace(/\b[a-z]/g, function () {
            return arguments[0].toUpperCase();
        });
    }
    function debounce(func, delay = 100) {
        let timer;
        return function (event) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, delay, event);
        };
    }
    function initChatbox() {
        let lang = $('html').attr('lang');
        let key;
        if (lang == 'en-HK' || lang == 'zh-HK') {
            key = '39299081-8fb6-4a91-9e77-2feea792353b'
        }
        else {
            key = '828c3b01-7155-4ead-9114-3d244832fa64'
        }
        $('<script/>', {
            id: 'ze-snippet',
            src: `https://static.zdassets.com/ekr/snippet.js?key=${key}`,
            async: true
        }).appendTo('body');
        console.log('chatbox initialized');
    }
    initChatbox();
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
        $('video[data-os-depend]').each(function (index) {
            $(this).get(0).load()
        })
    }
    updateVideoSrc();

    function setNavMargin() {
        marginAuto = ($(window).width() - $('.container').width()) / 2;
        //Update nav
        if ($(window).width() > 991) {
            $('.nav-left-wrap').css('margin-left', `-${marginAuto}px`)
            $('.nav-right-bg-overflow').css('right', `-${marginAuto}px`)
        }
    }
    setNavMargin()
    $(window).on('resize', debounce(function () {
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
    let isScrolling = false;
    // Scroll Events
    let header = $('.header');
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
    function scrollDown() {
        header.addClass('on-hide')
        if ($('.header-lang-main').length) {
            $('.header-lang-main').removeClass('active');
        }
        if ($('.header-lang-btn').length) {
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
        header.removeClass('on-hide');

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
            header.addClass('on-scroll');
            console.log('on-scroll');
            $('.home-sticky').addClass('active');
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
            header.removeClass('on-scroll on-hide');
            $('.home-sticky').removeClass('active');
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
    function refreshOnBreakpoint() {
        let initialViewportWidth = window.innerWidth || document.documentElement.clientWidth;
        // portrait mobile viewport initial, any change refresh
        if (initialViewportWidth < 480) {
            $(window).on('resize', debounce(function () {
                newViewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (newViewportWidth > 479) {
                    location.reload();
                }
            }))
        }
        // landscape mobile viewport initial, any change refresh
        else if (initialViewportWidth < 768) {
            $(window).on('resize', debounce(function () {
                newViewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (newViewportWidth > 767) {
                    location.reload();
                }
            }))
        }
        // tablet viewport initial, any change refresh
        else if (initialViewportWidth > 767 && initialViewportWidth < 992) {
            $(window).on('resize', debounce(function () {
                newViewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (newViewportWidth < 768 || newViewportWidth > 991) {
                    location.reload();
                }
            }))
        }
        // web viewport initial, any change refresh
        else if (initialViewportWidth > 991) {
            $(window).on('resize', debounce(function () {
                newViewportWidth = window.innerWidth || document.documentElement.clientWidth;
                if (newViewportWidth < 992) {
                    location.reload();
                }
            }))
        }
    }
    refreshOnBreakpoint();

    //Mouse move Events
    let mousePos = { x: 0, y: 0 };
    let mousePosRaw = { x: 0, y: 0 };

    $(window).on('mousemove', function (e) {
        mousePosRaw.x = e.clientX;
        mousePosRaw.y = e.clientY;
        mousePos.x = (mousePosRaw.x / $(window).width() - 0.5) * 2;
        mousePos.y = (mousePosRaw.y / $(window).width() - 0.5) * 2;
    })

    // Nav
    $('.nav-toggle').on('click', function (e) {
        e.preventDefault();
        if ($('.header').hasClass('on-open')) {
            closeNavmenu();
        } else {
            openNavMenu();
        }
    })
    $('.nav .nav-left-close').on('click', function (e) {
        e.preventDefault();
        closeNavmenu();
    })
    function openNavMenu() {
        const openNavTl = gsap.timeline({
            onStart() {
                gsap.set('.nav-right-wrap', { xPercent: 100 })
                gsap.set('.nav-link', { xPercent: 40, autoAlpha: 0 })
                gsap.set('.nav-link-mb-info > *', { x: 60, autoAlpha: 0 })
                gsap.set('.nav .mod-add .txt-16.nav-info-label, .nav .mod-add .txt-14.nav-info-item-label, .nav .mod-add .txt-14.nav-info-txt, .nav .mod-add .txt-14.nav-info-item-link', { autoAlpha: 0, x: 60 })
                gsap.set('.nav .mod-down .txt-16.nav-info-label, .nav .mod-down .nav-qr-wrap, .nav .mod-down .nav-download-wrap', { autoAlpha: 0, x: 60 })
                gsap.set('.nav .mod-down .nav-download-item-wrap', { x: 30 })
                gsap.set('.nav-copy-wrap .txt-14.nav-copy-txt, .footer-social-wrap .txt-14.nav-social-label', { autoAlpha: 0, x: 60 })
                gsap.set('.footer-social-wrap .footer-social-link.mod-nav', { autoAlpha: 0, x: 20 })
                gsap.set('.nav .nav-bottom-line', { scaleX: 0, autoAlpha: 0 })

                $('.nav').addClass('active');
                $('.header').addClass('on-open');
                if ($('.announcement').length) {
                    $('.sticky-wrap').addClass('on-open');
                    $('.body').css('--open-top', `${$('.announcement').outerHeight() * -1}px`)
                }
                if ($('.topbar').length) {
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
            .to('.nav-right-wrap', { xPercent: 0, duration: .6 }, '0')
            .to('.nav-link', { xPercent: 0, autoAlpha: 1, duration: .4, stagger: .04 }, '<+=.3')

            .to('.nav-link-mb-info > *', { x: 0, autoAlpha: 1, stagger: .04, duration: .3 }, '.65')

            .to('.nav .mod-add .txt-16.nav-info-label', { x: 0, autoAlpha: 1, duration: .3 }, '.6')
            .to('.nav .mod-add .txt-14.nav-info-item-label', { x: 0, autoAlpha: 1, duration: .3 }, '<=.06')
            .to('.nav .mod-add .txt-14.nav-info-txt, .nav .mod-add .txt-14.nav-info-item-link', { x: 0, autoAlpha: 1, duration: .3, stagger: .04 }, '<=0')

            .to('.nav .mod-down .txt-16.nav-info-label', { x: 0, autoAlpha: 1, duration: .3 }, '.6')
            .to('.nav .mod-down .nav-qr-wrap, .nav .mod-down .nav-download-wrap', { x: 0, autoAlpha: 1, duration: .3, stagger: .04, clearProps: 'opacity' }, '<=.06')
            .to('.nav .mod-down .nav-download-item-wrap', { x: 0, duration: .3, stagger: .04, clearProps: 'opacity' }, '<=.06')
            .to('.nav-copy-wrap .txt-14.nav-copy-txt', { x: 0, autoAlpha: 1, duration: .3 }, '.6')
            .to('.nav .nav-bottom-line', { scaleX: 1, autoAlpha: 1, duration: .6 }, '<=0')
            .to('.footer-social-wrap .txt-14.nav-social-label', { x: 0, autoAlpha: 1, duration: .3 }, '<=.06')
            .to('.footer-social-wrap .footer-social-link.mod-nav', { x: 0, autoAlpha: 1, duration: .15, stagger: .008 }, '<-=.06')
    }
    if (isTouchDevice()) {
        let lastScrollTop = 0;
        $(window).on('scroll', function (e) {
            let st = $(this).scrollTop();
            if (st > lastScrollTop && st > $('.announcement').height()) {
                scrollDown()
            } else {
                scrollUp();
            }
            lastScrollTop = st;
        })
    }
    function closeNavmenu() {
        const closeNavTl = gsap.timeline({
            onStart() {
                if ($(window).width() > 991) {
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
            .to('.nav-right-wrap', { xPercent: 100, ease: Power1.easeInOut, duration: .6 }, '0')
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
            $('[data-popup]').on('click', function (e) {
                if ($(window).width() > 991) {
                    e.preventDefault();
                    if ($(this).attr('data-popup') == 'open') {
                        lenis.stop();
                        $('.popup-wrap').addClass('active')
                    } else if ($(this).attr('data-popup') == 'close') {
                        lenis.start();
                        $('.popup-wrap').removeClass('active')
                        $('.popup-content-form-inner').css('display', 'block')
                        $('.popup-form-success').css('display', 'none')
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
    function updateInterestRateLive(wrapper) {
        let SGDbigRate = $('[data-rate-source-sgd="big"]').text();
        let SGDmediumRate = $('[data-rate-source-sgd="medium"]').text();
        let SGDsmallRate = $('[data-rate-source-sgd="small"]').text();
        let SGDotherRate = $('[data-rate-source-sgd="other"]').text();
        let SGDamount1 = $('[data-rate-source-sgd="amount1"]').text();
        let SGDamount2 = $('[data-rate-source-sgd="amount2"]').text();
        let SGDTupAmount = $('[data-rate-source-sgd="tup-amount"]').text();
        let SGDdate = $('[data-rate-source-sgd="date"]').text();
        let SGDwidthdrawal = $('[data-rate-source-sgd="withdrawal"]').text();
        let SGDminimumsum = $('[data-rate-source-sgd="minimum-sum"]').text();

        let SGDallRates = $(wrapper).find('[data-rate-sgd]');
        SGDallRates.each(function (e) {
            let type = $(this).attr('data-rate-sgd');
            if (type == 'big') {
                $(this).text(SGDbigRate)
            } else if (type == 'medium') {
                $(this).text(SGDmediumRate)
            } else if (type == 'small') {
                $(this).text(SGDsmallRate)
            } else if (type == 'amount1') {
                $(this).text(SGDamount1)
            } else if (type == 'amount2') {
                $(this).text(SGDamount2)
            } else if (type == 'tup-amount') {
                $(this).text(SGDTupAmount)
            } else if (type == 'date') {
                $(this).text(SGDdate)
            } else if (type == 'other') {
                $(this).text(SGDotherRate)
            } else if (type == 'withdrawal') {
                $(this).text(SGDwidthdrawal)
            } else if (type == 'minimum-sum') {
                $(this).text(SGDminimumsum)
            } else if (type == 'fixed') {
                // $(this).text(fixedRate)
            }
        })

        let USDbigRate = $('[data-rate-source-usd="big"]').text();
        let USDmediumRate = $('[data-rate-source-usd="medium"]').text();
        let USDsmallRate = $('[data-rate-source-usd="small"]').text();
        let USDotherRate = $('[data-rate-source-usd="other"]').text();
        // let USDfixedRate = $('[data-rate-source-usd="fixed"]').text();
        let USDamount1 = $('[data-rate-source-usd="amount1"]').text();
        let USDamount2 = $('[data-rate-source-usd="amount2"]').text();
        let USDTupAmount = $('[data-rate-source-usd="tup-amount"]').text();
        let USDdate = $('[data-rate-source-usd="date"]').text();
        let USDwidthdrawal = $('[data-rate-source-usd="withdrawal"]').text();
        let USDminimiumsum = $('[data-rate-source-usd="minimum-sum"]').text();
        let USDallRates = $(wrapper).find('[data-rate-usd]');
        USDallRates.each(function (e) {
            let type = $(this).attr('data-rate-usd');
            if (type == 'big') {
                $(this).text(USDbigRate)
            } else if (type == 'medium') {
                $(this).text(USDmediumRate)
            } else if (type == 'small') {
                $(this).text(USDsmallRate)
            } else if (type == 'amount1') {
                $(this).text(USDamount1)
            } else if (type == 'amount2') {
                $(this).text(USDamount2)
            } else if (type == 'tup-amount') {
                $(this).text(USDTupAmount)
            } else if (type == 'date') {
                $(this).text(USDdate)
            } else if (type == 'other') {
                $(this).text(USDotherRate)
            } else if (type == 'withdrawal') {
                $(this).text(USDwidthdrawal)
            } else if (type == 'minimum-sum') {
                $(this).text(USDminimiumsum)
            } else if (type == 'fixed') {
                // $(this).text(USDfixedRate)
            }
        })
    }
    function getAllDynamicData(richtextClass) {
        let wrapper = $(richtextClass)
        let allLink = wrapper.find('a')

        allLink.each(function (idx, item) {
            let href = $(item).attr('href')
            if (href.includes('https://[data-rate')) {
                let type = href.replace('https://', '').replace('http://', '').replace('[data-rate-', '').replace(']', '').includes('usd') ? 'usd' : 'sgd'
                let rate = href.replace('https://', '').replace('http://', '').replace(`[data-rate-${type}=`, '').replace(']', '')
                let newDom = $('<span></span>');
                if ($(item).html().includes('strong')) {
                    newDom = $('<strong></strong>');
                }

                let span = newDom
                    .html($(item).html())
                    .attr(`data-rate-${type}`, rate);
                console.log(span.html())
                $(item).replaceWith(span);
            }
        })
        // if (!isStagging()) {
        //     updateInterestRate(richtextClass)
        // }
        // else {
        updateInterestRateLive(richtextClass)
        // }
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

                $(selectItem).closest('[data-form="form"]').find('.dial-code-wrap').on('click', function (e) {
                    e.preventDefault();
                    $(selectItem).select2('open');
                })
                $(selectItem).on('select2:select', function (e) {
                    let code = $(this).val();
                    $(selectItem).closest('.dial-code-wrap').find('.phone-region').text(code)
                })
                $(selectItem).on('select2:opening', function (e) {
                    setTimeout(() => {
                        $('.select2-results__options').attr('data-lenis-prevent', '')
                    }, 300);
                })
            }

        })
    }
    if ($('#dialCode').length > 0 && $('#dialPopup').length) {
        setupDialCode(dialCodes, ['#dialCode', '#dialPopup']);
    }
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
            else {
                $('[data-form="form"]').trigger('reset');
            }
            el.addClass('active')
            setTimeout(() => {
                el.removeClass('active')
            }, 5000);
        } else {
            // console.log($('.popup-content-form-inner .popup-input[name="phone-popup"]').val())
            // if (window.location.href.includes('webflow.io')) {
            let phone_number_input = $('.popup-content-form-inner .popup-input.phone-region').text() + ' ' + $('.popup-content-form-inner .popup-input[name="phone-popup"]').val();
            $('.popup-success-sub span[data-popup="tel"]').text(phone_number_input)
            // }
            setTimeout(() => {
                $('.popup-content-form-inner').css('display', 'none')
                $('.popup-form-success').css('display', 'block')
                $('.popup-wrap').find('[data-form="form"]').trigger('reset')
            }, 1000);
        }
        // if (window.location.href.includes('webflow.io')) {
        $('.popup-succes-redirect-wrap').on('click', function (e) {
            e.preventDefault();
            $('.popup-content-form-inner').css('display', 'block')
            $('.popup-form-success').css('display', 'none')
            $('.popup-wrap').find('[data-form="form"]').trigger('reset')
        })
        // }
    }
    function formSubscribeTrigger() {
        //Submit
        let allForm = $('[data-form="form"]');
        allForm.each(function (i, form) {
            $(form).on('submit', function (e) {
                const valInputCheck = $(this).find('.bp-trap').val();
                console.log(valInputCheck)
                e.preventDefault();
                if (valInputCheck == '' || valInputCheck == undefined) {
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
                else {
                    return;
                }

            })
            $(form).find('[data-form="submit"]').on('click', function (e) {
                e.preventDefault();
                let type = $(form).find('[input-type]').attr('input-type');
                if ($(form).find('[data-form="input"]').val() != '') {
                    $(form).submit();
                } else {
                    $(form).find('[data-form="err"]').addClass('active');
                    //alert(`Please fill in your ${type}`)
                }
            })
            $(form).find('.popup-input, #PhoneNumber-2').on('input', function () {
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
            $(form).find('[data-form="input"]').on('blur', (e) => {
                if ($(form).attr('data-name') == 'popup') {
                    $(form).find('.popup-form-input-wrap').removeClass('active');
                } else {
                    $(form).removeClass('active');
                }
            })
            $(form).find('[input-type="phone"]').on('input', function (e) {
                let newValue = this.value.replace(new RegExp(/[^\d-.+ ]/, 'ig'), "");
                this.value = newValue;
            })
        })
        $('.float-close').on('click', function (e) {
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

    SCRIPT.gameScript = () => {
        setTimeout(() => {
            $('.game-popup').addClass('active');
            $('.game-popup-video-inner video')[0].play();
        }, 2000);
        $('[data-popup-game="open"]').on('click', function (e) {
            e.preventDefault();
            $('.game-popup').addClass('active');
        })
        $('[data-popup-game="close"]').on('click', function (e) {
            e.preventDefault();
            $('.game-popup').removeClass('active');
        })

        let $gameVideo = $('.game-popup-video-inner video');
        let $iconPlay = $('.game-popup-control-ic.item-play');
        let $iconSound = $('.game-popup-control-ic.item-sound');
        let $iconPause = $('.game-popup-control-ic.item-pause');
        let isVideoFirstClick = true;

        $('.game-popup-video').on('click', function () {
            let vid = $gameVideo[0];
            if (!vid) return;

            if (isVideoFirstClick) {
                vid.removeAttribute('muted');
                vid.muted = false;
                vid.volume = 1;
                // vid.pause();
                let playPromise = vid.play();
                if (playPromise !== undefined) {
                    playPromise.catch(e => console.log(e));
                }

                $iconSound.removeClass('active');
                $iconPause.addClass('active');
                isVideoFirstClick = false;
            } else {
                if (vid.paused) {
                    vid.play();
                    $iconPlay.removeClass('active');
                    $iconPause.addClass('active');
                } else {
                    vid.pause();
                    $iconPause.removeClass('active');
                    $iconPlay.addClass('active');
                }
            }
        });
        // $('.game-popup').on('click', function (e) {
        //     if (!$(e.target).closest('.game-popup-inner').length && !$(e.target).closest('[data-popup-game="close"]').length) {
        //         e.preventDefault();
        //         $('.game-popup').removeClass('active');
        //     }
        // })
        function gameHeroIntro() {
            let textCir;
            if ($(window).width() > 991) {
                textCir = new CircleType(document.querySelector('.mod-circletext.mod-dk'));
            } else {
                textCir = new CircleType(document.querySelector('.mod-circletext.mod-tb'));
            }
            $('.mod-circletext').css('display', 'flex')
            $('.text-cir-wrap').addClass('anim-rotate')
            //  vid.defaultPlaybackRate = 1.4;
            const gameIntroTl = gsap.timeline({
                default: { ease: Power1.easeIn },
            })
            gsap.set('.game-hero .game-hero-img-human img', { y: $(window).width() > 767 ? 40 : 0, duration: .6 }, '<=.3')
            gameIntroTl.from('.game-hero-content .game-hero-title', { y: 40, autoAlpha: 0, duration: .8, clearProps: 'all' }, '0')
                .from('.game-hero-content .game-hero-sub', { y: 40, autoAlpha: 0, duration: .8, clearProps: 'all' }, '0')
                .from('.game-hero-content .btn.mod-game-hero', { y: 40, autoAlpha: 0, duration: .8, clearProps: 'all' }, '0')
                // Human first
                .to('.game-hero .game-hero-img-human img', { y: 0, autoAlpha: 1, duration: .6 }, '<=.3')
                //.from('.game-hero .game-hero-rate-wrap', {y: 40, autoAlpha: 0, duration: .6}, '>=0')
                .to('.game-hero .game-hero-img-c-bg, .game-hero .game-hero-rate-wrap', { opacity: 1, duration: .6 }, '>=0')
            if (viewport.w < 490) {
                $('.game-hero-info-wrap').addClass('swiper');
                $('.game-hero-info').addClass('swiper-wrapper');
                $('.game-hero-info-item').addClass('swiper-slide');
                new Swiper('.game-hero-info-wrap', {
                    slidesPerView: 'auto',
                    spaceBetween: parseRem(12)
                })
            }
        }
        gameHeroIntro();
        function gameHeroHandle() {
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
            const gameHeroTl = new gsap.timeline({
                scrollTrigger: {
                    trigger: '.game-hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                }
            });
            gameHeroTl.from('.game-rich-bg-img', { y: ribbonOffset * unit, ease: 'none' })
                .to('.game-hero-img-human img', { y: $(window).width() > 767 ? humanOffset * unit : 0, ease: 'none' }, '0')
                .to('.game-hero-img-c-bg img', { y: $(window).width() > 767 ? -humanOffset * unit : 0, ease: 'none' }, '0')

            if ($(window).width() > 991) {
                // gameHeroTl.from('.game-partner-inner', { 'grid-column-gap': '10rem', ease: 'none' }, '0')
                // Mouse move human parallax
                function applyHumanParallax() {
                    let humanX = xGetter('.game-hero-img-human');
                    let humanY = yGetter('.game-hero-img-human');
                    let circleX = xGetter('.game-hero-img-c-bg');
                    let circleY = yGetter('.game-hero-img-c-bg');
                    let rateX = xGetter('.game-hero-rate-wrap .game-hero-rate');
                    let rateY = yGetter('.game-hero-rate-wrap .game-hero-rate');
                    if ($('.game-hero-img-human').length) {
                        xSetter('.game-hero-img-human')(lerp(humanX, -mousePos.x * 1.2));
                        ySetter('.game-hero-img-human')(lerp(humanY, -mousePos.y));

                        xSetter('.game-hero-img-c-bg')(lerp(circleX, mousePos.x));
                        ySetter('.game-hero-img-c-bg')(lerp(circleY, mousePos.y * .8));

                        xSetter('.game-hero-rate-wrap .game-hero-rate')(lerp(rateX, -mousePos.x * 1.6));
                        ySetter('.game-hero-rate-wrap .game-hero-rate')(lerp(rateY, -mousePos.y * 1.4));
                        requestAnimationFrame(applyHumanParallax)
                    }
                }
                requestAnimationFrame(applyHumanParallax)
            }
        }
        gameHeroHandle();
        function gameBenefSetup() {
            if ($(window).outerWidth() > 991) {
                let cloneSwiper = $('.game-benef-main.swiper').clone().removeClass('mod-bot').addClass('mod-top');
                $('.game-benef-main-wrap').append(cloneSwiper);
            }
        }
        gameBenefSetup();
        function gameBenefHandleMobile() {
            console.log('mobile')
            if ($(window).outerWidth() <= 480) {
                $('.game-benef-item').on('click', function (e) {
                    console.log('click')
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active');
                        $(this).find('.game-benef-item-sub').slideUp();
                    }
                    else {
                        $('.game-benef-item').not($(this)).removeClass('active');
                        $(this).addClass('active')

                        $('.game-benef-item').not($(this)).find('.game-benef-item-sub').slideUp();
                        $(this).find('.game-benef-item-sub').slideDown();
                    }
                })
                $('.game-benef-item').eq(0).trigger('click');
            }
        }
        gameBenefHandleMobile();
        gameTestiHandleNew();
        function gameTestiHandleNew() {
            $('.game-testi-item').each(function (e) {
                let rate = Number($(this).find('.data-rate').text());
                let stars = $(this).find('.ic-star');
                for (let x = 0; x < rate; x++) {
                    stars.eq(x).addClass('rate-true')
                }
            })
            if ($(window).width() > 991) {
                $('.game-testi-main').on('mouseenter', function (e) {
                    if (!isScrolling) {
                        lenis.stop();
                    }
                })
                $('.game-testi-main').on('mouseleave', function (e) {
                    if (!isScrolling) {
                        lenis.start();
                    }
                })

                let distanceVal;
                if ($('.game-testi-col-inner.mod-right').height() >= $('.game-testi-col-inner.mod-left').height()) {
                    distanceVal = $('.game-testi-col-inner.mod-right').outerHeight() - $('.game-testi-wrap').height();
                } else {
                    distanceVal = $('.game-testi-col-inner.mod-left').outerHeight() - $('.game-testi-wrap').height();
                }

                const gameTestiTl = new gsap.timeline({
                    paused: true,
                });
                gameTestiTl.to('.game-testi-bar-inner', { scaleX: 1, ease: 'none' })
                    .fromTo('.game-testi-col-inner.mod-left', { yPercent: 0, ease: 'none' }, { y: -distanceVal, ease: 'none' }, '0')
                    .fromTo('.game-testi-col-inner.mod-right', { yPercent: 0, ease: 'none' }, { y: distanceVal, ease: 'none' }, '0')

                let currProg = 0;
                $('.game-testi-main').on('wheel', function (e) {
                    currProg = currProg + e.originalEvent.deltaY > distanceVal ? distanceVal : currProg + e.originalEvent.deltaY < 0 ? 0 : currProg + e.originalEvent.deltaY;
                    let prog = currProg / distanceVal > 1 ? 1 : currProg / distanceVal < 0 ? 0 : currProg / distanceVal;
                    gsap.to(gameTestiTl, { duration: .8 * gsap.utils.clamp(.5, 1, Math.abs(e.originalEvent.deltaY / 110)), progress: prog, ease: Power2.easeOut, overwrite: true });
                })
            } else {
                const gameTestiSwiperMb = new Swiper('.swiper.game-testi-col-wrapper', {
                    slidesPerView: "auto",
                    spaceBetween: 1.6 * unit,
                    breakpoints: {
                        767: {
                            slidesPerView: 2,
                        }
                    }
                })
            }
            if ($('.game-card-title').length > 0) {
                ScrollTrigger.create({
                    trigger: '.game-card-title',
                    start: 'center center',
                    end: 'center center',
                    once: true,
                    onEnter: () => {
                        gameCardHandle()
                    }
                })
            }
        }

    }
    const pageName = $('.main').attr('data-barba-namespace');
    if (pageName) {
        detectPage(pageName)
        SCRIPT[(`${pageName}Script`)]();
    }
}

window.onload = mainScript;