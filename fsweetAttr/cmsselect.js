function cmsSelect() {
    var D = Object.defineProperty;
    var K = (e, t, o) => (t in e ? D(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : (e[t] = o));
    var y = (e, t, o) => (K(e, typeof t != "symbol" ? t + "" : t, o), o);
    var C = "@finsweet/attributes-cmscore";
    var l = class {
        static activateAlerts() {
            this.alertsActivated = !0;
        }
        static alert(t, o) {
            if ((this.alertsActivated && window.alert(t), o === "error")) throw new Error(t);
        }
    };
    y(l, "alertsActivated", !1);
    var _ = {
        wrapper: "w-dyn-list",
        list: "w-dyn-items",
        item: "w-dyn-item",
        paginationWrapper: "w-pagination-wrapper",
        paginationNext: "w-pagination-next",
        paginationPrevious: "w-pagination-previous",
        pageCount: "w-page-count",
        emptyState: "w-dyn-empty",
    };
    var E = (e) => {
        let t = e.split("-"),
            o = parseInt(t[t.length - 1]);
        if (!isNaN(o)) return o;
    };
    var g = (e, t) => {
        let o = e.getAttribute(t);
        return o ? E(o) : void 0;
    };
    var F = `https://cdn.jsdelivr.net/npm/${C}@1/cmscore.js`,
        S = async () => {
            let { fsAttributes: e } = window;
            e.cms || (e.cms = {});
            let { cms: t } = e;
            if (t.coreImport) return t.coreImport;
            try {
                let o = import(F);
                return (
                    (t.coreImport = o),
                    o.then((n) => {
                        n && (t.coreVersion || (t.coreVersion = n.version));
                    }),
                    o
                );
            } catch (o) {
                l.alert(`${o}`, "error");
                return;
            }
        };
    var d = "fs-attributes";
    var R = "cmsload";
    var m = "cmsselect";
    var j = `${d}-support`,
        H = "https://cdn.jsdelivr.net/npm/@finsweet/attributes-support@1/support.js",
        h = async () => {
            let { fsAttributes: e, location: t } = window,
                { host: o, searchParams: n } = new URL(t.href);
            if (!o.includes("webflow.io") || !n.has(j)) return !1;
            if (e.supportImport) return e.supportImport;
            try {
                e.supportImport = new Promise((s, r) => {
                    let i = document.createElement("script");
                    (i.src = H), (i.onload = () => s(!0)), (i.onerror = r), document.head.append(i);
                });
            } catch (s) {
                return !1;
            }
            return e.supportImport;
        };
    var L = (e) => (t) => `${e}${t ? `-${t}` : ""}`,
        T = (e) => {
            let t = (n, s, r) => {
                let i = e[n],
                    { key: c, values: a } = i,
                    p;
                if (!s) return `[${c}]`;
                let f = a == null ? void 0 : a[s];
                typeof f == "string" ? (p = f) : (p = f(r && "instanceIndex" in r ? r.instanceIndex : void 0));
                let u = r && "caseInsensitive" in r && r.caseInsensitive ? "i" : "";
                if (!(r != null && r.operator)) return `[${c}="${p}"${u}]`;
                switch (r.operator) {
                    case "prefixed":
                        return `[${c}^="${p}"${u}]`;
                    case "suffixed":
                        return `[${c}$="${p}"${u}]`;
                    case "contains":
                        return `[${c}*="${p}"${u}]`;
                }
            };
            function o(n, s) {
                let r = t("element", n, s),
                    i = (s == null ? void 0 : s.scope) || document;
                return s != null && s.all ? i.querySelectorAll(r) : i.querySelector(r);
            }
            return [t, o];
        };
    var b = { preventLoad: { key: `${d}-preventload` }, debugMode: { key: `${d}-debug` }, src: { key: "src", values: { finsweet: "@finsweet/attributes" } }, dev: { key: `${d}-dev` } },
        [A, ht] = T(b);
    var M = () => {
        let { currentScript: e } = document,
            { preventLoad: t, debugMode: o } = b,
            n = typeof (e == null ? void 0 : e.getAttribute(t.key)) == "string";
        return typeof (e == null ? void 0 : e.getAttribute(o.key)) == "string" && l.activateAlerts(), { preventsLoad: n };
    };
    var v = () => {
        if (window.fsAttributes && !Array.isArray(window.fsAttributes)) return;
        let e = {
            cms: {},
            push(...t) {
                var o, n;
                for (let [s, r] of t) (n = (o = this[s]) == null ? void 0 : o.loading) == null || n.then(r);
            },
        };
        q(e), X(e), (window.fsAttributes = e), (window.FsAttributes = window.fsAttributes), h();
    },
        q = (e) => {
            let t = A("src", "finsweet", { operator: "contains" }),
                o = A("dev"),
                s = [...document.querySelectorAll(`script${t}, script${o}`)].reduce((r, i) => {
                    var a;
                    let c = i.getAttribute(b.dev.key) || ((a = i.src.match(/[\w-. ]+(?=(\.js)$)/)) == null ? void 0 : a[0]);
                    return c && !r.includes(c) && r.push(c), r;
                }, []);
            for (let r of s) {
                e[r] = {};
                let i = e[r];
                i.loading = new Promise((c) => {
                    i.resolve = (a) => {
                        c(a), delete i.resolve;
                    };
                });
            }
        },
        X = (e) => {
            let t = Array.isArray(window.fsAttributes) ? window.fsAttributes : [];
            e.push(...t);
        };
    var U = "1.4.7";
    var G = `fs-${m}`,
        Y = "text-value",
        Q = "select",
        x = { element: { key: `${G}-element`, values: { textValue: L(Y), select: Q } } },
        [w, jt] = T(x);
    var O = (e, t) => {
        var i;
        let o = g(e, x.element.key),
            n = k(o),
            s = new Set(),
            r = new Set();
        for (let c of n) {
            B(e, c, r);
            let a = c.closest(`.${_.wrapper}`);
            if (!a) continue;
            let p = (i = t.createCMSListInstance) == null ? void 0 : i.call(t, a);
            !p || s.add(p);
        }
        for (let c of s)
            c.on("additems", (a) => {
                for (let { element: p } of a) {
                    let f = k(o, p);
                    for (let u of f) B(e, u, r);
                }
            });
        return [...s];
    },
        k = (e, t = document) => [...t.querySelectorAll(w("element", "textValue", { instanceIndex: e }))],
        B = (e, { innerText: t }, o) => {
            if (!t || o.has(t)) return;
            let n = new Option(t, t);
            e.options.add(n), o.add(t);
        };
    var I = async () => {
        var s, r, i;
        let e = await S();
        if (!e) return [];
        let t = [...document.querySelectorAll(w("element", "select", { operator: "prefixed" }))],
            o = new Set();
        for (let c of t) {
            if (!(c instanceof HTMLSelectElement)) continue;
            let a = O(c, e);
            for (let p of a) o.add(p);
        }
        let n = [...o];
        return await ((s = window.fsAttributes[R]) == null ? void 0 : s.loading), (i = (r = window.fsAttributes[m]).resolve) == null || i.call(r, n), n;
    };
    v();
    S();
    var V, P;
    (V = window.fsAttributes)[(P = m)] || (V[P] = {});
    var { preventsLoad: z } = M(),
        N = window.fsAttributes[m];
    N.version = U;
    z ? (N.init = I) : (window.Webflow || (window.Webflow = []), window.Webflow.push(I));
}
