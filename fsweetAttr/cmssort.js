function cmsSort() {
    var bt = Object.defineProperty,
        wt = Object.defineProperties;
    var yt = Object.getOwnPropertyDescriptors;
    var j = Object.getOwnPropertySymbols;
    var gt = Object.prototype.hasOwnProperty,
        xt = Object.prototype.propertyIsEnumerable;
    var k = (t, e, o) => (e in t ? bt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (t[e] = o)),
        G = (t, e) => {
            for (var o in e || (e = {})) gt.call(e, o) && k(t, o, e[o]);
            if (j) for (var o of j(e)) xt.call(e, o) && k(t, o, e[o]);
            return t;
        },
        q = (t, e) => wt(t, yt(e));
    var W = (t, e, o) => (k(t, typeof e != "symbol" ? e + "" : e, o), o);
    var X = "@finsweet/attributes-cmscore";
    var u = class {
        static activateAlerts() {
            this.alertsActivated = !0;
        }
        static alert(e, o) {
            if ((this.alertsActivated && window.alert(e), o === "error")) throw new Error(e);
        }
    };
    W(u, "alertsActivated", !1);
    var U = "w--current";
    var L = { dropdown: "w-dropdown", dropdownToggle: "w-dropdown-toggle", dropdownList: "w-dropdown-list" };
    var N = (t, e) => (Array.isArray(e) || (e = [e]), e.map((r) => t.dispatchEvent(new Event(r, { bubbles: !0 }))).every((r) => r));
    var B = (t, e) => !!t && e.includes(t);
    var z = (t, e = !0) => {
        e && t.focus(), N(t, ["click", "mouseup"]);
    };
    function A(t) {
        return t == null ? void 0 : t.trim().toLowerCase();
    }
    var Ct = `https://cdn.jsdelivr.net/npm/${X}@1/cmscore.js`,
        x = async () => {
            let { fsAttributes: t } = window;
            t.cms || (t.cms = {});
            let { cms: e } = t;
            if (e.coreImport) return e.coreImport;
            try {
                let o = import(Ct);
                return (
                    (e.coreImport = o),
                    o.then((r) => {
                        r && (e.coreVersion || (e.coreVersion = r.version));
                    }),
                    o
                );
            } catch (o) {
                u.alert(`${o}`, "error");
                return;
            }
        };
    var It = "https://cdn.jsdelivr.net/npm/@finsweet/attributes-animation@1/functions.js",
        R = async () => {
            let { fsAttributes: t } = window;
            if (t.animationImport) return t.animationImport;
            try {
                let e = import(It);
                return (t.animationImport = e), e;
            } catch (e) {
                u.alert(`${e}`, "error");
                return;
            }
        };
    var b = "fs-attributes";
    var E = "cmssort";
    var Lt = `${b}-support`,
        Rt = "https://cdn.jsdelivr.net/npm/@finsweet/attributes-support@1/support.js",
        Q = async () => {
            let { fsAttributes: t, location: e } = window,
                { host: o, searchParams: r } = new URL(e.href);
            if (!o.includes("webflow.io") || !r.has(Lt)) return !1;
            if (t.supportImport) return t.supportImport;
            try {
                t.supportImport = new Promise((n, s) => {
                    let i = document.createElement("script");
                    (i.src = Rt), (i.onload = () => n(!0)), (i.onerror = s), document.head.append(i);
                });
            } catch (n) {
                return !1;
            }
            return t.supportImport;
        };
    var P = async (t, { durationKey: e, easingKey: o }) => {
        let r = await R();
        if (!r) return;
        let {
            animations: { fade: n },
            easings: s,
        } = r,
            { listAnimation: i } = t,
            a = t.getAttribute(e),
            p = t.getAttribute(o);
        if (i && !a && !p) return;
        let c = B(p, s) ? p : void 0,
            m = a ? parseFloat(a) / 2e3 : 0.1;
        if (!i) {
            t.listAnimation = q(G({}, n), { options: { easing: c, duration: m } });
            return;
        }
        let { options: l } = i;
        if (!l) {
            i.options = { easing: c, duration: m };
            return;
        }
        l.easing || (l.easing = c), a && (l.duration = m);
    };
    var _ = (t) => (e) => `${t}${e ? `-${e}` : ""}`,
        D = (t) => {
            let e = (r, n, s) => {
                let i = t[r],
                    { key: a, values: p } = i,
                    c;
                if (!n) return `[${a}]`;
                let m = p == null ? void 0 : p[n];
                typeof m == "string" ? (c = m) : (c = m(s && "instanceIndex" in s ? s.instanceIndex : void 0));
                let l = s && "caseInsensitive" in s && s.caseInsensitive ? "i" : "";
                if (!(s != null && s.operator)) return `[${a}="${c}"${l}]`;
                switch (s.operator) {
                    case "prefixed":
                        return `[${a}^="${c}"${l}]`;
                    case "suffixed":
                        return `[${a}$="${c}"${l}]`;
                    case "contains":
                        return `[${a}*="${c}"${l}]`;
                }
            };
            function o(r, n) {
                let s = e("element", r, n),
                    i = (n == null ? void 0 : n.scope) || document;
                return n != null && n.all ? i.querySelectorAll(s) : i.querySelector(s);
            }
            return [e, o];
        };
    var C = { preventLoad: { key: `${b}-preventload` }, debugMode: { key: `${b}-debug` }, src: { key: "src", values: { finsweet: "@finsweet/attributes" } }, dev: { key: `${b}-dev` } },
        [V, eo] = D(C);
    var J = () => {
        let { currentScript: t } = document,
            { preventLoad: e, debugMode: o } = C,
            r = typeof (t == null ? void 0 : t.getAttribute(e.key)) == "string";
        return typeof (t == null ? void 0 : t.getAttribute(o.key)) == "string" && u.activateAlerts(), { preventsLoad: r };
    };
    var Z = () => {
        if (window.fsAttributes && !Array.isArray(window.fsAttributes)) return;
        let t = {
            cms: {},
            push(...e) {
                var o, r;
                for (let [n, s] of e) (r = (o = this[n]) == null ? void 0 : o.loading) == null || r.then(s);
            },
        };
        Dt(t), vt(t), (window.fsAttributes = t), (window.FsAttributes = window.fsAttributes), Q();
    },
        Dt = (t) => {
            let e = V("src", "finsweet", { operator: "contains" }),
                o = V("dev"),
                n = [...document.querySelectorAll(`script${e}, script${o}`)].reduce((s, i) => {
                    var p;
                    let a = i.getAttribute(C.dev.key) || ((p = i.src.match(/[\w-. ]+(?=(\.js)$)/)) == null ? void 0 : p[0]);
                    return a && !s.includes(a) && s.push(a), s;
                }, []);
            for (let s of n) {
                t[s] = {};
                let i = t[s];
                i.loading = new Promise((a) => {
                    i.resolve = (p) => {
                        a(p), delete i.resolve;
                    };
                });
            }
        },
        vt = (t) => {
            let e = Array.isArray(window.fsAttributes) ? window.fsAttributes : [];
            t.push(...e);
        };
    var tt = "1.9.4";
    var d = `fs-${E}`,
        Mt = "list",
        Kt = "trigger",
        Ot = "dropdown-label",
        kt = "scroll-anchor",
        Ut = "field",
        Nt = "type",
        Bt = "easing",
        Pt = "duration",
        Vt = "asc",
        $t = "desc",
        Ft = "reverse",
        f = {
            element: { key: `${d}-element`, values: { list: _(Mt), trigger: _(Kt), dropdownLabel: _(Ot), scrollAnchor: _(kt) } },
            field: { key: `${d}-${Ut}` },
            type: { key: `${d}-${Nt}`, values: { date: "date" } },
            easing: { key: `${d}-${Bt}` },
            duration: { key: `${d}-${Pt}` },
            ascClass: { key: `${d}-${Vt}` },
            descClass: { key: `${d}-${$t}` },
            reverse: { key: `${d}-${Ft}`, values: { true: "true" } },
        },
        [v, h] = D(f),
        et = `${d}_asc`,
        ot = `${d}_desc`;
    var {
        field: { key: Yt },
        type: { key: Ht },
    } = f,
        rt = (t, e) => {
            t.on("shouldcollectprops", async (o) => {
                for (let r of o) r.collectProps({ fieldKey: Yt, typeKey: Ht });
            }),
                t.on("shouldsort", async () => {
                    await e(!0);
                });
        };
    var I = "role",
        w = { slider: "slider", listbox: "listbox", option: "option", columnheader: "columnheader", link: "link" },
        st = "tabindex";
    var $ = "aria-selected",
        nt = "aria-haspopup",
        it = "aria-multiselectable";
    var at = "aria-sort",
        F = { ascending: "ascending", descending: "descending" };
    var y = async (t, { direction: e, sortKey: o, addingItems: r }) => {
        let { items: n } = t;
        e && o && n.some(({ props: i }) => o in i)
            ? n.sort((i, a) => {
                let p = i.props[o],
                    c = a.props[o],
                    [m] = (p == null ? void 0 : p.values) || [],
                    [l] = (c == null ? void 0 : c.values) || [];
                if (!m) return 1;
                if (!l) return -1;
                let { type: g } = p,
                    S = g === "date";
                if (S || g === "number") {
                    let [K, O] = [m, l].map((H) => (S ? new Date(H).getTime() : parseFloat(H)));
                    return isNaN(K) ? 1 : isNaN(O) ? -1 : e === "asc" ? K - O : O - K;
                }
                let T = { numeric: !0, sensitivity: "base" };
                return e === "asc" ? m.localeCompare(l, void 0, T) : l.localeCompare(m, void 0, T);
            })
            : t.restoreItemsOrder(),
            r || (await t.switchPage(1, !1), t.scrollToAnchor(), await t.renderItems());
    };
    var {
        ascClass: { key: jt },
        descClass: { key: Gt },
        reverse: { key: qt, values: Wt },
    } = f,
        pt = (t, e, o) => {
            let r = new Map(),
                n = !1,
                s,
                i,
                a,
                p = async (c) => {
                    await y(e, { sortKey: a, direction: i, addingItems: c });
                };
            for (let c of t)
                Xt(c, r, o),
                    c.addEventListener("click", async (m) => {
                        if ((m.preventDefault(), n)) return;
                        n = !0;
                        let l = r.get(c);
                        if (!l) {
                            n = !1;
                            return;
                        }
                        (a = l.sortKey), (i = zt(l.direction, l.reverse)), s && c !== s && ct(s, void 0, r), (s = c), ct(c, i, r), await p(), (n = !1);
                    });
            return p;
        },
        Xt = (t, e, o) => {
            let r = t.getAttribute(f.field.key);
            if (!r) return;
            let n = A(r),
                s = t.getAttribute(qt) === Wt.true,
                i = t.getAttribute(jt),
                a = t.getAttribute(Gt),
                p = { sortKey: n, reverse: s, cssClasses: { asc: i || o.asc, desc: a || o.desc } };
            t.setAttribute(I, w.columnheader), t.setAttribute(st, "0"), mt(t), e.set(t, p), lt(t, p);
        },
        lt = (...[t, { cssClasses: e }]) => {
            for (let o of Object.values(e)) t.classList.remove(o);
        },
        mt = (t, e) => {
            t.setAttribute(at, e ? (e === "asc" ? F.ascending : F.descending) : "none");
        },
        ct = (t, e, o) => {
            let r = o.get(t);
            if (!r) return;
            let { cssClasses: n } = r;
            lt(t, r), e && t.classList.add(n[e]), mt(t, e), (r.direction = e);
        },
        zt = (t, e) => (t ? (t === "desc" ? "asc" : "desc") : e ? "desc" : "asc");
    var { dropdownToggle: Qt, dropdownList: Jt } = L,
        ut = (t, e) => {
            let o = t.querySelector(`.${Qt}`),
                r = t.querySelector(`.${Jt}`);
            if (!o || !r) {
                u.alert("The cmssort Dropdown is missing a toggle or a list.", "error");
                return;
            }
            ee(o, r);
            let n = te(o),
                s = Zt(r);
            if (!s) {
                u.alert("The cmssort Dropdown doesn't have any option.", "error");
                return;
            }
            let i = !1,
                a,
                p,
                c = async (m) => {
                    await y(e, { direction: p, sortKey: a, addingItems: m });
                };
            return (
                r.addEventListener("click", async (m) => {
                    if ((m.preventDefault(), i)) return;
                    i = !0;
                    let { target: l } = m;
                    if (!(l instanceof Element)) {
                        i = !1;
                        return;
                    }
                    let g = l.closest("a");
                    if (!g) {
                        i = !1;
                        return;
                    }
                    let S = s.find(({ element: T }) => T === g);
                    if (!S || S.selected) {
                        i = !1;
                        return;
                    }
                    let M = s.find(({ selected: T }) => T);
                    M && (M.selected = !1), (S.selected = !0), ({ sortKey: a, direction: p } = S), oe(s), n == null || n.updateContent(S), z(o), await c(), (i = !1);
                }),
                c
            );
        },
        Zt = (t) => {
            let e = [],
                o = t.querySelectorAll("a");
            if (!!o.length) {
                for (let r of o) {
                    r.setAttribute(I, w.option);
                    let n = r.getAttribute(f.field.key),
                        s,
                        i;
                    n && (n.endsWith("-asc") ? ((i = "asc"), (s = n.slice(0, -4))) : n.endsWith("-desc") ? ((i = "desc"), (s = n.slice(0, -5))) : ((i = "asc"), (s = n))),
                        s && (s = A(s)),
                        e.push({ element: r, sortKey: s, direction: i, selected: !1 });
                }
                return e;
            }
        },
        te = (t) => {
            let e = h("dropdownLabel", { operator: "prefixed", scope: t });
            if (!e) return;
            let o = e.innerHTML;
            return {
                element: e,
                originalHTML: o,
                updateContent: ({ element: n, sortKey: s }) => {
                    e.innerHTML = s ? n.innerHTML : o;
                },
            };
        },
        ee = (t, e) => {
            t.setAttribute(nt, w.listbox), e.setAttribute(I, w.listbox), e.setAttribute(it, "false");
        },
        oe = (t) => {
            for (let { element: e, selected: o } of t) {
                if (o) {
                    e.setAttribute($, "true"), e.classList.add(U);
                    continue;
                }
                e.removeAttribute($), e.classList.remove(U);
            }
        };
    var ft = async (t, e) => {
        let o = t.closest("form");
        o == null || o.addEventListener("submit", re);
        let [r, n] = dt(t.value),
            s = !1,
            i = async (a) => {
                await y(e, { direction: n, sortKey: r, addingItems: a });
            };
        return (
            t.addEventListener("change", async () => {
                s || ((s = !0), ([r, n] = dt(t.value)), await i(), (s = !1));
            }),
            r && (await i()),
            i
        );
    },
        re = (t) => (t.preventDefault(), t.stopImmediatePropagation(), !1),
        dt = (t) => {
            let e, o;
            return t.endsWith("-asc") ? ((o = "asc"), (e = t.slice(0, -4))) : t.endsWith("-desc") ? ((o = "desc"), (e = t.slice(0, -5))) : ((o = "asc"), (e = t)), (e = A(e)), [e, o];
        };
    var {
        element: { key: se },
        field: { key: ne },
        type: { key: ie },
        duration: { key: ae },
        easing: { key: ce },
        ascClass: { key: pe },
        descClass: { key: le },
    } = f,
        St = async (t) => {
            let e = t.getInstanceIndex(se),
                o = document.querySelectorAll(v("element", "trigger", { instanceIndex: e }));
            if (!o.length) return;
            let { items: r } = t;
            for (let c of r) c.collectProps({ fieldKey: ne, typeKey: ie });
            if ((P(t, { durationKey: ae, easingKey: ce }), !t.scrollAnchor)) {
                let c = h("scrollAnchor", { instanceIndex: e });
                c && (t.scrollAnchor = c);
            }
            let n = { asc: t.getAttribute(pe) || et, desc: t.getAttribute(le) || ot },
                [s] = o,
                i = s instanceof HTMLSelectElement,
                a = s.closest(`.${L.dropdown}`),
                p = i ? await ft(s, t) : a ? ut(a, t) : pt(o, t, n);
            !p || rt(t, p);
        };
    var Y = async () => {
        var o, r;
        let t = await x();
        if (!t) return [];
        let e = t.createCMSListInstances([v("element", "list", { operator: "prefixed" })]);
        return await Promise.all(e.map(St)), (r = (o = window.fsAttributes[E]).resolve) == null || r.call(o, e), e;
    };
    Z();
    x();
    R();
    var At, Et;
    (At = window.fsAttributes)[(Et = E)] || (At[Et] = {});
    var { preventsLoad: me } = J(),
        Tt = window.fsAttributes[E];
    Tt.version = tt;
    me ? (Tt.init = Y) : (window.Webflow || (window.Webflow = []), window.Webflow.push(Y));
};

