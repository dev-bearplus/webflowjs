function cmsCombine() {
    var P = Object.defineProperty;
    var _ = (e, t, r) => (t in e ? P(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (e[t] = r));
    var I = (e, t, r) => (_(e, typeof t != "symbol" ? t + "" : t, r), r);
    var m = (e, t, r) =>
        new Promise((n, s) => {
            var o = (i) => {
                try {
                    a(r.next(i));
                } catch (u) {
                    s(u);
                }
            },
                c = (i) => {
                    try {
                        a(r.throw(i));
                    } catch (u) {
                        s(u);
                    }
                },
                a = (i) => (i.done ? n(i.value) : Promise.resolve(i.value).then(o, c));
            a((r = r.apply(e, t)).next());
        });
    var l = class {
        static activateAlerts() {
            this.alertsActivated = !0;
        }
        static alert(t, r) {
            if ((this.alertsActivated && window.alert(t), r === "error")) throw new Error(t);
        }
    };
    I(l, "alertsActivated", !1);
    var y = (e) => (t) => `${e}${t ? `-${t}` : ""}`,
        d = (e) => {
            let t = (n, s, o) => {
                let c = e[n],
                    { key: a, values: i } = c,
                    u;
                if (!s) return `[${a}]`;
                let w = i == null ? void 0 : i[s];
                if ((typeof w == "string" ? (u = w) : (u = w(o && "instanceIndex" in o ? o.instanceIndex : void 0)), !(o != null && o.operator))) return `[${a}="${u}"]`;
                switch (o.operator) {
                    case "prefixed":
                        return `[${a}^="${u}"]`;
                    case "suffixed":
                        return `[${a}$="${u}"]`;
                    case "contains":
                        return `[${a}*="${u}"]`;
                }
            };
            return [
                t,
                (n, s) => {
                    let o = t("element", n, s);
                    return ((s == null ? void 0 : s.scope) || document).querySelector(o);
                },
            ];
        };
    var b = "fs-attributes",
        f = { preventLoad: { key: `${b}-preventload` }, debugMode: { key: `${b}-debug` }, src: { key: "src", values: { finsweet: "@finsweet/attributes" } }, dev: { key: `${b}-dev` } },
        [T, Z] = d(f);
    var g = () => {
        let { currentScript: e } = document,
            { preventLoad: t, debugMode: r } = f,
            n = typeof (e == null ? void 0 : e.getAttribute(t.key)) == "string";
        return typeof (e == null ? void 0 : e.getAttribute(r.key)) == "string" && l.activateAlerts(), { preventsLoad: n };
    };
    var N = `${b}-support`,
        V = "https://cdn.jsdelivr.net/npm/@finsweet/attributes-support@1/support.js",
        x = () =>
            m(void 0, null, function* () {
                let { fsAttributes: e, location: t } = window,
                    { host: r, searchParams: n } = new URL(t.href);
                if (!r.includes("webflow.io") || !n.has(N)) return !1;
                if (e.supportImport) return e.supportImport;
                try {
                    e.supportImport = new Promise((s, o) => {
                        let c = document.createElement("script");
                        (c.src = V), (c.onload = () => s(!0)), (c.onerror = o), document.head.append(c);
                    });
                } catch (s) {
                    return !1;
                }
                return e.supportImport;
            });
    var v = () => {
        if (window.fsAttributes && !Array.isArray(window.fsAttributes)) return;
        let e = {
            cms: {},
            push(...t) {
                var r, n;
                for (let [s, o] of t) (n = (r = this[s]) == null ? void 0 : r.loading) == null || n.then(o);
            },
        };
        B(e), D(e), (window.fsAttributes = e), (window.FsAttributes = window.fsAttributes), x();
    },
        B = (e) => {
            let t = T("src", "finsweet", { operator: "contains" }),
                r = T("dev"),
                s = [...document.querySelectorAll(`script${t}, script${r}`)].reduce((o, c) => {
                    var i;
                    let a = c.getAttribute(f.dev.key) || ((i = c.src.match(/[\w-. ]+(?=(\.js)$)/)) == null ? void 0 : i[0]);
                    return a && !o.includes(a) && o.push(a), o;
                }, []);
            for (let o of s) {
                e[o] = {};
                let c = e[o];
                c.loading = new Promise((a) => {
                    c.resolve = (i) => {
                        a(i), delete c.resolve;
                    };
                });
            }
        },
        D = (e) => {
            let t = Array.isArray(window.fsAttributes) ? window.fsAttributes : [];
            e.push(...t);
        };
    var O = "https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmscore@1/cmscore.js",
        A = () =>
            m(void 0, null, function* () {
                let { fsAttributes: e } = window;
                e.cms || (e.cms = {});
                let { cms: t } = e;
                if (t.coreImport) return t.coreImport;
                try {
                    let r = import(O);
                    return (
                        (t.coreImport = r),
                        r.then((n) => {
                            n && (t.coreVersion || (t.coreVersion = n.version));
                        }),
                        r
                    );
                } catch (r) {
                    l.alert(`${r}`, "error");
                    return;
                }
            });
    var h = "1.6.0";
    var p = "cmscombine",
        F = `fs-${p}`,
        K = "list",
        q = "items-count",
        E = { element: { key: `${F}-element`, values: { list: y(K), itemsCount: y(q) } } },
        [$, M] = d(E);
    var R = (e) => {
        var r;
        let t = [];
        for (let n of e) {
            let s = n.getInstanceIndex(E.element.key),
                o = t[(r = s || 0)] || (t[r] = { lists: [], target: n, instanceIndex: s });
            n !== o.target && o.lists.push(n);
        }
        return (t = t.filter((n) => n && n.lists.length)), t;
    };
    var S = (e, t) =>
        m(void 0, null, function* () {
            let r = t.map(({ element: n }) => n);
            yield e.addItems(r);
        });
    var C = () =>
        m(void 0, null, function* () {
            var s, o;
            let e = yield A();
            if (!e) return [];
            let t = e.createCMSListInstances([$("element", "list", { operator: "prefixed" })]),
                r = R(t),
                n = yield Promise.all(r.map(W));
            return (o = (s = window.fsAttributes[p]).resolve) == null || o.call(s, n), n;
        }),
        W = (n) =>
            m(void 0, [n], function* ({ lists: e, target: t, instanceIndex: r }) {
                if (!t.itemsCount) {
                    let s = M("itemsCount", { instanceIndex: r });
                    s && t.addItemsCount(s);
                }
                for (let s of e)
                    s.on("additems", (o) =>
                        m(void 0, null, function* () {
                            return yield S(t, o);
                        })
                    );
                return (
                    yield Promise.all(
                        e.map((c) =>
                            m(void 0, [c], function* ({ wrapper: s, items: o }) {
                                s.remove(), yield S(t, o);
                            })
                        )
                    ),
                    t
                );
            });
    v();
    A();
    var k, L;
    (k = window.fsAttributes)[(L = p)] || (k[L] = {});
    var { preventsLoad: X } = g(),
        U = window.fsAttributes[p];
    U.version = h;
    X ? (U.init = C) : (window.Webflow || (window.Webflow = []), window.Webflow.push(C));
}

