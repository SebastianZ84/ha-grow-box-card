var ei = Object.defineProperty;
var Bn = (e) => {
  throw TypeError(e);
};
var ti = (e, t, n) => t in e ? ei(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var M = (e, t, n) => ti(e, typeof t != "symbol" ? t + "" : t, n), _n = (e, t, n) => t.has(e) || Bn("Cannot " + n);
var u = (e, t, n) => (_n(e, t, "read from private field"), n ? n.call(e) : t.get(e)), C = (e, t, n) => t.has(e) ? Bn("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), p = (e, t, n, r) => (_n(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), P = (e, t, n) => (_n(e, t, "access private method"), n);
var ir;
typeof window < "u" && ((ir = window.__svelte ?? (window.__svelte = {})).v ?? (ir.v = /* @__PURE__ */ new Set())).add("5");
const ni = 1, ri = 2, ii = 16, si = 1, ai = 2, sr = "[", ln = "[!", Nn = "]", $t = {}, D = Symbol(), li = "http://www.w3.org/1999/xhtml", oi = "http://www.w3.org/2000/svg", ar = !1;
var On = Array.isArray, fi = Array.prototype.indexOf, Rn = Array.from, Kt = Object.keys, bt = Object.defineProperty, _t = Object.getOwnPropertyDescriptor, ui = Object.getOwnPropertyDescriptors, ci = Object.prototype, di = Array.prototype, lr = Object.getPrototypeOf, Wn = Object.isExtensible;
function or(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function hi() {
  var e, t, n = new Promise((r, i) => {
    e = r, t = i;
  });
  return { promise: n, resolve: e, reject: t };
}
const ne = 2, jn = 4, fr = 8, Ct = 16, Re = 32, We = 64, In = 128, oe = 256, Jt = 512, V = 1024, fe = 2048, Xe = 4096, pe = 8192, ft = 16384, Mn = 32768, Ft = 65536, Xn = 1 << 17, vi = 1 << 18, ut = 1 << 19, _i = 1 << 20, mn = 1 << 21, Pn = 1 << 22, rt = 1 << 23, Ut = Symbol("$state"), pi = Symbol("legacy props"), gi = Symbol(""), Dn = new class extends Error {
  constructor() {
    super(...arguments);
    M(this, "name", "StaleReactionError");
    M(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}(), mi = 1, Ln = 3, qt = 8;
function yi(e) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function wi() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function $i(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function bi() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Ei(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function xi() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function ki() {
  throw new Error("https://svelte.dev/e/hydration_failed");
}
function Ti() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Ci() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function qi() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Si() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function on(e) {
  console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Ai() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
let $ = !1;
function B(e) {
  $ = e;
}
let k;
function L(e) {
  if (e === null)
    throw on(), $t;
  return k = e;
}
function Et() {
  return L(
    /** @type {TemplateNode} */
    /* @__PURE__ */ ke(k)
  );
}
function Te(e) {
  if ($) {
    if (/* @__PURE__ */ ke(k) !== null)
      throw on(), $t;
    k = e;
  }
}
function Ni(e = 1) {
  if ($) {
    for (var t = e, n = k; t--; )
      n = /** @type {TemplateNode} */
      /* @__PURE__ */ ke(n);
    k = n;
  }
}
function Zt(e = !0) {
  for (var t = 0, n = k; ; ) {
    if (n.nodeType === qt) {
      var r = (
        /** @type {Comment} */
        n.data
      );
      if (r === Nn) {
        if (t === 0) return n;
        t -= 1;
      } else (r === sr || r === ln) && (t += 1);
    }
    var i = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ ke(n)
    );
    e && n.remove(), n = i;
  }
}
function ur(e) {
  if (!e || e.nodeType !== qt)
    throw on(), $t;
  return (
    /** @type {Comment} */
    e.data
  );
}
function cr(e) {
  return e === this.v;
}
function Oi(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function dr(e) {
  return !Oi(e, this.v);
}
let Ri = !1, re = null;
function xt(e) {
  re = e;
}
function Fn(e, t = !1, n) {
  re = {
    p: re,
    c: null,
    e: null,
    s: e,
    x: null,
    l: null
  };
}
function zn(e) {
  var t = (
    /** @type {ComponentContext} */
    re
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      Or(r);
  }
  return e !== void 0 && (t.x = e), re = t.p, e ?? /** @type {T} */
  {};
}
function hr() {
  return !0;
}
let He = [], Qt = [];
function vr() {
  var e = He;
  He = [], or(e);
}
function ji() {
  var e = Qt;
  Qt = [], or(e);
}
function Ii() {
  return He.length > 0 || Qt.length > 0;
}
function fn(e) {
  if (He.length === 0 && !Nt) {
    var t = He;
    queueMicrotask(() => {
      t === He && vr();
    });
  }
  He.push(e);
}
function Mi() {
  He.length > 0 && vr(), Qt.length > 0 && ji();
}
const Pi = /* @__PURE__ */ new WeakMap();
function _r(e) {
  var t = T;
  if (t === null)
    return x.f |= rt, e;
  if ((t.f & Mn) === 0) {
    if ((t.f & In) === 0)
      throw !t.parent && e instanceof Error && pr(e), e;
    t.b.error(e);
  } else
    kt(e, t);
}
function kt(e, t) {
  for (; t !== null; ) {
    if ((t.f & In) !== 0)
      try {
        t.b.error(e);
        return;
      } catch (n) {
        e = n;
      }
    t = t.parent;
  }
  throw e instanceof Error && pr(e), e;
}
function pr(e) {
  const t = Pi.get(e);
  t && (bt(e, "message", {
    value: t.message
  }), bt(e, "stack", {
    value: t.stack
  }));
}
const pn = /* @__PURE__ */ new Set();
let I = null, yn = /* @__PURE__ */ new Set(), lt = [], un = null, wn = !1, Nt = !1;
var jt, mt, De, It, Mt, Ze, yt, Qe, Le, wt, Pt, Dt, ge, gr, Vt, $n;
const rn = class rn {
  constructor() {
    C(this, ge);
    /**
     * The current values of any sources that are updated in this batch
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Source, any>}
     */
    M(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any sources that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Source, any>}
     */
    C(this, jt, /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<() => void>}
     */
    C(this, mt, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    C(this, De, 0);
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    C(this, It, null);
    /**
     * True if an async effect inside this batch resolved and
     * its parent branch was already deleted
     */
    C(this, Mt, !1);
    /**
     * Async effects (created inside `async_derived`) encountered during processing.
     * These run after the rest of the batch has updated, since they should
     * always have the latest values
     * @type {Effect[]}
     */
    C(this, Ze, []);
    /**
     * The same as `#async_effects`, but for effects inside a newly-created
     * `<svelte:boundary>` — these do not prevent the batch from committing
     * @type {Effect[]}
     */
    C(this, yt, []);
    /**
     * Template effects and `$effect.pre` effects, which run when
     * a batch is committed
     * @type {Effect[]}
     */
    C(this, Qe, []);
    /**
     * The same as `#render_effects`, but for `$effect` (which runs after)
     * @type {Effect[]}
     */
    C(this, Le, []);
    /**
     * Block effects, which may need to re-run on subsequent flushes
     * in order to update internal sources (e.g. each block items)
     * @type {Effect[]}
     */
    C(this, wt, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Effect[]}
     */
    C(this, Pt, []);
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Effect[]}
     */
    C(this, Dt, []);
    /**
     * A set of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`
     * @type {Set<Effect>}
     */
    M(this, "skipped_effects", /* @__PURE__ */ new Set());
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(t) {
    var i;
    lt = [];
    for (const s of t)
      P(this, ge, gr).call(this, s);
    if (u(this, Ze).length === 0 && u(this, De) === 0) {
      P(this, ge, $n).call(this);
      var n = u(this, Qe), r = u(this, Le);
      p(this, Qe, []), p(this, Le, []), p(this, wt, []), I = null, Gn(n), Gn(r), I === null ? I = this : pn.delete(this), (i = u(this, It)) == null || i.resolve();
    } else
      P(this, ge, Vt).call(this, u(this, Qe)), P(this, ge, Vt).call(this, u(this, Le)), P(this, ge, Vt).call(this, u(this, wt));
    for (const s of u(this, Ze))
      gt(s);
    for (const s of u(this, yt))
      gt(s);
    p(this, Ze, []), p(this, yt, []);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(t, n) {
    u(this, jt).has(t) || u(this, jt).set(t, n), this.current.set(t, t.v);
  }
  activate() {
    I = this;
  }
  deactivate() {
    I = null;
    for (const t of yn)
      if (yn.delete(t), t(), I !== null)
        break;
  }
  neuter() {
    p(this, Mt, !0);
  }
  flush() {
    lt.length > 0 ? mr() : P(this, ge, $n).call(this), I === this && (u(this, De) === 0 && pn.delete(this), this.deactivate());
  }
  increment() {
    p(this, De, u(this, De) + 1);
  }
  decrement() {
    if (p(this, De, u(this, De) - 1), u(this, De) === 0) {
      for (const t of u(this, Pt))
        te(t, fe), Tt(t);
      for (const t of u(this, Dt))
        te(t, Xe), Tt(t);
      p(this, Qe, []), p(this, Le, []), this.flush();
    } else
      this.deactivate();
  }
  /** @param {() => void} fn */
  add_callback(t) {
    u(this, mt).add(t);
  }
  settled() {
    return (u(this, It) ?? p(this, It, hi())).promise;
  }
  static ensure() {
    if (I === null) {
      const t = I = new rn();
      pn.add(I), Nt || rn.enqueue(() => {
        I === t && t.flush();
      });
    }
    return I;
  }
  /** @param {() => void} task */
  static enqueue(t) {
    fn(t);
  }
};
jt = new WeakMap(), mt = new WeakMap(), De = new WeakMap(), It = new WeakMap(), Mt = new WeakMap(), Ze = new WeakMap(), yt = new WeakMap(), Qe = new WeakMap(), Le = new WeakMap(), wt = new WeakMap(), Pt = new WeakMap(), Dt = new WeakMap(), ge = new WeakSet(), /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 */
gr = function(t) {
  var v;
  t.f ^= V;
  for (var n = t.first; n !== null; ) {
    var r = n.f, i = (r & (Re | We)) !== 0, s = i && (r & V) !== 0, a = s || (r & pe) !== 0 || this.skipped_effects.has(n);
    if (!a && n.fn !== null) {
      if (i)
        n.f ^= V;
      else if ((r & jn) !== 0)
        u(this, Le).push(n);
      else if ((r & V) === 0)
        if ((r & Pn) !== 0) {
          var l = (v = n.b) != null && v.is_pending() ? u(this, yt) : u(this, Ze);
          l.push(n);
        } else vn(n) && ((n.f & Ct) !== 0 && u(this, wt).push(n), gt(n));
      var o = n.first;
      if (o !== null) {
        n = o;
        continue;
      }
    }
    var f = n.parent;
    for (n = n.next; n === null && f !== null; )
      n = f.next, f = f.parent;
  }
}, /**
 * @param {Effect[]} effects
 */
Vt = function(t) {
  for (const n of t)
    ((n.f & fe) !== 0 ? u(this, Pt) : u(this, Dt)).push(n), te(n, V);
  t.length = 0;
}, /**
 * Append and remove branches to/from the DOM
 */
$n = function() {
  if (!u(this, Mt))
    for (const t of u(this, mt))
      t();
  u(this, mt).clear();
};
let Oe = rn;
function we(e) {
  var t = Nt;
  Nt = !0;
  try {
    for (var n; ; ) {
      if (Mi(), lt.length === 0 && !Ii() && (I == null || I.flush(), lt.length === 0))
        return un = null, /** @type {T} */
        n;
      mr();
    }
  } finally {
    Nt = t;
  }
}
function mr() {
  var e = pt;
  wn = !0;
  try {
    var t = 0;
    for (Zn(!0); lt.length > 0; ) {
      var n = Oe.ensure();
      if (t++ > 1e3) {
        var r, i;
        Di();
      }
      n.process(lt), Ve.clear();
    }
  } finally {
    wn = !1, Zn(e), un = null;
  }
}
function Di() {
  try {
    xi();
  } catch (e) {
    kt(e, un);
  }
}
let Ce = null;
function Gn(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (ft | pe)) === 0 && vn(r) && (Ce = [], gt(r), r.deps === null && r.first === null && r.nodes_start === null && (r.teardown === null && r.ac === null ? Mr(r) : r.fn = null), (Ce == null ? void 0 : Ce.length) > 0)) {
        Ve.clear();
        for (const i of Ce)
          gt(i);
        Ce = [];
      }
    }
    Ce = null;
  }
}
function Tt(e) {
  for (var t = un = e; t.parent !== null; ) {
    t = t.parent;
    var n = t.f;
    if (wn && t === T && (n & Ct) !== 0)
      return;
    if ((n & (We | Re)) !== 0) {
      if ((n & V) === 0) return;
      t.f ^= V;
    }
  }
  lt.push(t);
}
function Li(e) {
  let t = 0, n = ot(0), r;
  return () => {
    Zi() && (w(n), Hn(() => (t === 0 && (r = Vn(() => e(() => Ot(n)))), t += 1, () => {
      fn(() => {
        t -= 1, t === 0 && (r == null || r(), r = void 0, Ot(n));
      });
    })));
  };
}
var Fi = Ft | ut | In;
function zi(e, t, n) {
  new Yi(e, t, n);
}
var ve, Q, Lt, $e, et, be, ae, G, Ee, Fe, tt, ze, nt, Ye, sn, an, F, yr, wr, Bt, Wt, bn;
class Yi {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   */
  constructor(t, n, r) {
    C(this, F);
    /** @type {Boundary | null} */
    M(this, "parent");
    C(this, ve, !1);
    /** @type {TemplateNode} */
    C(this, Q);
    /** @type {TemplateNode | null} */
    C(this, Lt, $ ? k : null);
    /** @type {BoundaryProps} */
    C(this, $e);
    /** @type {((anchor: Node) => void)} */
    C(this, et);
    /** @type {Effect} */
    C(this, be);
    /** @type {Effect | null} */
    C(this, ae, null);
    /** @type {Effect | null} */
    C(this, G, null);
    /** @type {Effect | null} */
    C(this, Ee, null);
    /** @type {DocumentFragment | null} */
    C(this, Fe, null);
    C(this, tt, 0);
    C(this, ze, 0);
    C(this, nt, !1);
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    C(this, Ye, null);
    C(this, sn, () => {
      u(this, Ye) && en(u(this, Ye), u(this, tt));
    });
    C(this, an, Li(() => (p(this, Ye, ot(u(this, tt))), () => {
      p(this, Ye, null);
    })));
    p(this, Q, t), p(this, $e, n), p(this, et, r), this.parent = /** @type {Effect} */
    T.b, p(this, ve, !!u(this, $e).pending), p(this, be, dn(() => {
      if (T.b = this, $) {
        const i = u(this, Lt);
        Et(), /** @type {Comment} */
        i.nodeType === qt && /** @type {Comment} */
        i.data === ln ? P(this, F, wr).call(this) : P(this, F, yr).call(this);
      } else {
        try {
          p(this, ae, ee(() => r(u(this, Q))));
        } catch (i) {
          this.error(i);
        }
        u(this, ze) > 0 ? P(this, F, Wt).call(this) : p(this, ve, !1);
      }
    }, Fi)), $ && p(this, Q, k);
  }
  /**
   * Returns `true` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_pending() {
    return u(this, ve) || !!this.parent && this.parent.is_pending();
  }
  has_pending_snippet() {
    return !!u(this, $e).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   */
  update_pending_count(t) {
    P(this, F, bn).call(this, t), p(this, tt, u(this, tt) + t), yn.add(u(this, sn));
  }
  get_effect_pending() {
    return u(this, an).call(this), w(
      /** @type {Source<number>} */
      u(this, Ye)
    );
  }
  /** @param {unknown} error */
  error(t) {
    var n = u(this, $e).onerror;
    let r = u(this, $e).failed;
    if (u(this, nt) || !n && !r)
      throw t;
    u(this, ae) && (K(u(this, ae)), p(this, ae, null)), u(this, G) && (K(u(this, G)), p(this, G, null)), u(this, Ee) && (K(u(this, Ee)), p(this, Ee, null)), $ && (L(
      /** @type {TemplateNode} */
      u(this, Lt)
    ), Ni(), L(Zt()));
    var i = !1, s = !1;
    const a = () => {
      if (i) {
        Ai();
        return;
      }
      i = !0, s && Si(), Oe.ensure(), p(this, tt, 0), u(this, Ee) !== null && it(u(this, Ee), () => {
        p(this, Ee, null);
      }), p(this, ve, this.has_pending_snippet()), p(this, ae, P(this, F, Bt).call(this, () => (p(this, nt, !1), ee(() => u(this, et).call(this, u(this, Q)))))), u(this, ze) > 0 ? P(this, F, Wt).call(this) : p(this, ve, !1);
    };
    var l = x;
    try {
      Y(null), s = !0, n == null || n(t, a), s = !1;
    } catch (o) {
      kt(o, u(this, be) && u(this, be).parent);
    } finally {
      Y(l);
    }
    r && fn(() => {
      p(this, Ee, P(this, F, Bt).call(this, () => {
        p(this, nt, !0);
        try {
          return ee(() => {
            r(
              u(this, Q),
              () => t,
              () => a
            );
          });
        } catch (o) {
          return kt(
            o,
            /** @type {Effect} */
            u(this, be).parent
          ), null;
        } finally {
          p(this, nt, !1);
        }
      }));
    });
  }
}
ve = new WeakMap(), Q = new WeakMap(), Lt = new WeakMap(), $e = new WeakMap(), et = new WeakMap(), be = new WeakMap(), ae = new WeakMap(), G = new WeakMap(), Ee = new WeakMap(), Fe = new WeakMap(), tt = new WeakMap(), ze = new WeakMap(), nt = new WeakMap(), Ye = new WeakMap(), sn = new WeakMap(), an = new WeakMap(), F = new WeakSet(), yr = function() {
  try {
    p(this, ae, ee(() => u(this, et).call(this, u(this, Q))));
  } catch (t) {
    this.error(t);
  }
  p(this, ve, !1);
}, wr = function() {
  const t = u(this, $e).pending;
  t && (p(this, G, ee(() => t(u(this, Q)))), Oe.enqueue(() => {
    p(this, ae, P(this, F, Bt).call(this, () => (Oe.ensure(), ee(() => u(this, et).call(this, u(this, Q)))))), u(this, ze) > 0 ? P(this, F, Wt).call(this) : (it(
      /** @type {Effect} */
      u(this, G),
      () => {
        p(this, G, null);
      }
    ), p(this, ve, !1));
  }));
}, /**
 * @param {() => Effect | null} fn
 */
Bt = function(t) {
  var n = T, r = x, i = re;
  ue(u(this, be)), Y(u(this, be)), xt(u(this, be).ctx);
  try {
    return t();
  } catch (s) {
    return _r(s), null;
  } finally {
    ue(n), Y(r), xt(i);
  }
}, Wt = function() {
  const t = (
    /** @type {(anchor: Node) => void} */
    u(this, $e).pending
  );
  u(this, ae) !== null && (p(this, Fe, document.createDocumentFragment()), Hi(u(this, ae), u(this, Fe))), u(this, G) === null && p(this, G, ee(() => t(u(this, Q))));
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 */
bn = function(t) {
  var n;
  if (!this.has_pending_snippet()) {
    this.parent && P(n = this.parent, F, bn).call(n, t);
    return;
  }
  p(this, ze, u(this, ze) + t), u(this, ze) === 0 && (p(this, ve, !1), u(this, G) && it(u(this, G), () => {
    p(this, G, null);
  }), u(this, Fe) && (u(this, Q).before(u(this, Fe)), p(this, Fe, null)));
};
function Hi(e, t) {
  for (var n = e.nodes_start, r = e.nodes_end; n !== null; ) {
    var i = n === r ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ ke(n)
    );
    t.append(n), n = i;
  }
}
function Ui(e, t, n) {
  const r = cn;
  if (t.length === 0) {
    n(e.map(r));
    return;
  }
  var i = I, s = (
    /** @type {Effect} */
    T
  ), a = Vi(), l = $;
  Promise.all(t.map((o) => /* @__PURE__ */ Bi(o))).then((o) => {
    i == null || i.activate(), a();
    try {
      n([...e.map(r), ...o]);
    } catch (f) {
      (s.f & ft) === 0 && kt(f, s);
    }
    l && B(!1), i == null || i.deactivate(), $r();
  }).catch((o) => {
    kt(o, s);
  });
}
function Vi() {
  var e = T, t = x, n = re, r = I, i = $;
  if (i)
    var s = k;
  return function() {
    ue(e), Y(t), xt(n), r == null || r.activate(), i && (B(!0), L(s));
  };
}
function $r() {
  ue(null), Y(null), xt(null);
}
// @__NO_SIDE_EFFECTS__
function cn(e) {
  var t = ne | fe, n = x !== null && (x.f & ne) !== 0 ? (
    /** @type {Derived} */
    x
  ) : null;
  return T === null || n !== null && (n.f & oe) !== 0 ? t |= oe : T.f |= ut, {
    ctx: re,
    deps: null,
    effects: null,
    equals: cr,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      D
    ),
    wv: 0,
    parent: n ?? T,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function Bi(e, t) {
  let n = (
    /** @type {Effect | null} */
    T
  );
  n === null && wi();
  var r = (
    /** @type {Boundary} */
    n.b
  ), i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), s = ot(
    /** @type {V} */
    D
  ), a = null, l = !x;
  return ts(() => {
    try {
      var o = e();
      a && Promise.resolve(o).catch(() => {
      });
    } catch (d) {
      o = Promise.reject(d);
    }
    var f = () => o;
    i = (a == null ? void 0 : a.then(f, f)) ?? Promise.resolve(o), a = i;
    var v = (
      /** @type {Batch} */
      I
    ), _ = r.is_pending();
    l && (r.update_pending_count(1), _ || v.increment());
    const c = (d, h = void 0) => {
      a = null, _ || v.activate(), h ? h !== Dn && (s.f |= rt, en(s, h)) : ((s.f & rt) !== 0 && (s.f ^= rt), en(s, d)), l && (r.update_pending_count(-1), _ || v.decrement()), $r();
    };
    if (i.then(c, (d) => c(null, d || "unknown")), v)
      return () => {
        queueMicrotask(() => v.neuter());
      };
  }), new Promise((o) => {
    function f(v) {
      function _() {
        v === i ? o(s) : f(i);
      }
      v.then(_, _);
    }
    f(i);
  });
}
// @__NO_SIDE_EFFECTS__
function Kn(e) {
  const t = /* @__PURE__ */ cn(e);
  return Lr(t), t;
}
// @__NO_SIDE_EFFECTS__
function Wi(e) {
  const t = /* @__PURE__ */ cn(e);
  return t.equals = dr, t;
}
function br(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      K(
        /** @type {Effect} */
        t[n]
      );
  }
}
function Xi(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & ne) === 0)
      return (
        /** @type {Effect} */
        t
      );
    t = t.parent;
  }
  return null;
}
function Yn(e) {
  var t, n = T;
  ue(Xi(e));
  try {
    br(e), t = Hr(e);
  } finally {
    ue(n);
  }
  return t;
}
function Er(e) {
  var t = Yn(e);
  if (e.equals(t) || (e.v = t, e.wv = zr()), !ct) {
    var n = (Ue || (e.f & oe) !== 0) && e.deps !== null ? Xe : V;
    te(e, n);
  }
}
const Ve = /* @__PURE__ */ new Map();
function ot(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: cr,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function H(e, t) {
  const n = ot(e);
  return Lr(n), n;
}
// @__NO_SIDE_EFFECTS__
function xr(e, t = !1, n = !0) {
  const r = ot(e);
  return t || (r.equals = dr), r;
}
function O(e, t, n = !1) {
  x !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!_e || (x.f & Xn) !== 0) && hr() && (x.f & (ne | Ct | Pn | Xn)) !== 0 && !(W != null && W.includes(e)) && qi();
  let r = n ? St(t) : t;
  return en(e, r);
}
function en(e, t) {
  if (!e.equals(t)) {
    var n = e.v;
    ct ? Ve.set(e, t) : Ve.set(e, n), e.v = t;
    var r = Oe.ensure();
    r.capture(e, n), (e.f & ne) !== 0 && ((e.f & fe) !== 0 && Yn(
      /** @type {Derived} */
      e
    ), te(e, (e.f & oe) === 0 ? V : Xe)), e.wv = zr(), kr(e, fe), T !== null && (T.f & V) !== 0 && (T.f & (Re | We)) === 0 && (se === null ? is([e]) : se.push(e));
  }
  return t;
}
function Ot(e) {
  O(e, e.v + 1);
}
function kr(e, t) {
  var n = e.reactions;
  if (n !== null)
    for (var r = n.length, i = 0; i < r; i++) {
      var s = n[i], a = s.f, l = (a & fe) === 0;
      l && te(s, t), (a & ne) !== 0 ? kr(
        /** @type {Derived} */
        s,
        Xe
      ) : l && ((a & Ct) !== 0 && Ce !== null && Ce.push(
        /** @type {Effect} */
        s
      ), Tt(
        /** @type {Effect} */
        s
      ));
    }
}
function St(e) {
  if (typeof e != "object" || e === null || Ut in e)
    return e;
  const t = lr(e);
  if (t !== ci && t !== di)
    return e;
  var n = /* @__PURE__ */ new Map(), r = On(e), i = /* @__PURE__ */ H(0), s = st, a = (l) => {
    if (st === s)
      return l();
    var o = x, f = st;
    Y(null), er(s);
    var v = l();
    return Y(o), er(f), v;
  };
  return r && n.set("length", /* @__PURE__ */ H(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(l, o, f) {
        (!("value" in f) || f.configurable === !1 || f.enumerable === !1 || f.writable === !1) && Ti();
        var v = n.get(o);
        return v === void 0 ? v = a(() => {
          var _ = /* @__PURE__ */ H(f.value);
          return n.set(o, _), _;
        }) : O(v, f.value, !0), !0;
      },
      deleteProperty(l, o) {
        var f = n.get(o);
        if (f === void 0) {
          if (o in l) {
            const v = a(() => /* @__PURE__ */ H(D));
            n.set(o, v), Ot(i);
          }
        } else
          O(f, D), Ot(i);
        return !0;
      },
      get(l, o, f) {
        var d;
        if (o === Ut)
          return e;
        var v = n.get(o), _ = o in l;
        if (v === void 0 && (!_ || (d = _t(l, o)) != null && d.writable) && (v = a(() => {
          var h = St(_ ? l[o] : D), g = /* @__PURE__ */ H(h);
          return g;
        }), n.set(o, v)), v !== void 0) {
          var c = w(v);
          return c === D ? void 0 : c;
        }
        return Reflect.get(l, o, f);
      },
      getOwnPropertyDescriptor(l, o) {
        var f = Reflect.getOwnPropertyDescriptor(l, o);
        if (f && "value" in f) {
          var v = n.get(o);
          v && (f.value = w(v));
        } else if (f === void 0) {
          var _ = n.get(o), c = _ == null ? void 0 : _.v;
          if (_ !== void 0 && c !== D)
            return {
              enumerable: !0,
              configurable: !0,
              value: c,
              writable: !0
            };
        }
        return f;
      },
      has(l, o) {
        var c;
        if (o === Ut)
          return !0;
        var f = n.get(o), v = f !== void 0 && f.v !== D || Reflect.has(l, o);
        if (f !== void 0 || T !== null && (!v || (c = _t(l, o)) != null && c.writable)) {
          f === void 0 && (f = a(() => {
            var d = v ? St(l[o]) : D, h = /* @__PURE__ */ H(d);
            return h;
          }), n.set(o, f));
          var _ = w(f);
          if (_ === D)
            return !1;
        }
        return v;
      },
      set(l, o, f, v) {
        var y;
        var _ = n.get(o), c = o in l;
        if (r && o === "length")
          for (var d = f; d < /** @type {Source<number>} */
          _.v; d += 1) {
            var h = n.get(d + "");
            h !== void 0 ? O(h, D) : d in l && (h = a(() => /* @__PURE__ */ H(D)), n.set(d + "", h));
          }
        if (_ === void 0)
          (!c || (y = _t(l, o)) != null && y.writable) && (_ = a(() => /* @__PURE__ */ H(void 0)), O(_, St(f)), n.set(o, _));
        else {
          c = _.v !== D;
          var g = a(() => St(f));
          O(_, g);
        }
        var b = Reflect.getOwnPropertyDescriptor(l, o);
        if (b != null && b.set && b.set.call(v, f), !c) {
          if (r && typeof o == "string") {
            var m = (
              /** @type {Source<number>} */
              n.get("length")
            ), q = Number(o);
            Number.isInteger(q) && q >= m.v && O(m, q + 1);
          }
          Ot(i);
        }
        return !0;
      },
      ownKeys(l) {
        w(i);
        var o = Reflect.ownKeys(l).filter((_) => {
          var c = n.get(_);
          return c === void 0 || c.v !== D;
        });
        for (var [f, v] of n)
          v.v !== D && !(f in l) && o.push(f);
        return o;
      },
      setPrototypeOf() {
        Ci();
      }
    }
  );
}
var Jn, Tr, Cr, qr;
function En() {
  if (Jn === void 0) {
    Jn = window, Tr = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    Cr = _t(t, "firstChild").get, qr = _t(t, "nextSibling").get, Wn(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), Wn(n) && (n.__t = void 0);
  }
}
function xe(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function Be(e) {
  return Cr.call(e);
}
// @__NO_SIDE_EFFECTS__
function ke(e) {
  return qr.call(e);
}
function Ie(e, t) {
  if (!$)
    return /* @__PURE__ */ Be(e);
  var n = (
    /** @type {TemplateNode} */
    /* @__PURE__ */ Be(k)
  );
  if (n === null)
    n = k.appendChild(xe());
  else if (t && n.nodeType !== Ln) {
    var r = xe();
    return n == null || n.before(r), L(r), r;
  }
  return L(n), n;
}
function Gi(e, t = !1) {
  if (!$) {
    var n = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ Be(
        /** @type {Node} */
        e
      )
    );
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ ke(n) : n;
  }
  if (t && (k == null ? void 0 : k.nodeType) !== Ln) {
    var r = xe();
    return k == null || k.before(r), L(r), r;
  }
  return k;
}
function Xt(e, t = 1, n = !1) {
  let r = $ ? k : e;
  for (var i; t--; )
    i = r, r = /** @type {TemplateNode} */
    /* @__PURE__ */ ke(r);
  if (!$)
    return r;
  if (n && (r == null ? void 0 : r.nodeType) !== Ln) {
    var s = xe();
    return r === null ? i == null || i.after(s) : r.before(s), L(s), s;
  }
  return L(r), /** @type {TemplateNode} */
  r;
}
function Sr(e) {
  e.textContent = "";
}
function Ar() {
  return !1;
}
function Nr(e) {
  var t = x, n = T;
  Y(null), ue(null);
  try {
    return e();
  } finally {
    Y(t), ue(n);
  }
}
function Ki(e) {
  T === null && x === null && Ei(), x !== null && (x.f & oe) !== 0 && T === null && bi(), ct && $i();
}
function Ji(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function je(e, t, n, r = !0) {
  var i = T;
  i !== null && (i.f & pe) !== 0 && (e |= pe);
  var s = {
    ctx: re,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: e | fe,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: i,
    b: i && i.b,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0,
    ac: null
  };
  if (n)
    try {
      gt(s), s.f |= Mn;
    } catch (o) {
      throw K(s), o;
    }
  else t !== null && Tt(s);
  if (r) {
    var a = s;
    if (n && a.deps === null && a.teardown === null && a.nodes_start === null && a.first === a.last && // either `null`, or a singular child
    (a.f & ut) === 0 && (a = a.first), a !== null && (a.parent = i, i !== null && Ji(a, i), x !== null && (x.f & ne) !== 0 && (e & We) === 0)) {
      var l = (
        /** @type {Derived} */
        x
      );
      (l.effects ?? (l.effects = [])).push(a);
    }
  }
  return s;
}
function Zi() {
  return x !== null && !_e;
}
function xn(e) {
  Ki();
  var t = (
    /** @type {Effect} */
    T.f
  ), n = !x && (t & Re) !== 0 && (t & Mn) === 0;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      re
    );
    (r.e ?? (r.e = [])).push(e);
  } else
    return Or(e);
}
function Or(e) {
  return je(jn | _i, e, !1);
}
function Qi(e) {
  Oe.ensure();
  const t = je(We | ut, e, !0);
  return () => {
    K(t);
  };
}
function es(e) {
  Oe.ensure();
  const t = je(We | ut, e, !0);
  return (n = {}) => new Promise((r) => {
    n.outro ? it(t, () => {
      K(t), r(void 0);
    }) : (K(t), r(void 0));
  });
}
function Rr(e) {
  return je(jn, e, !1);
}
function ts(e) {
  return je(Pn | ut, e, !0);
}
function Hn(e, t = 0) {
  return je(fr | t, e, !0);
}
function Me(e, t = [], n = []) {
  Ui(t, n, (r) => {
    je(fr, () => e(...r.map(w)), !0);
  });
}
function dn(e, t = 0) {
  var n = je(Ct | t, e, !0);
  return n;
}
function ee(e, t = !0) {
  return je(Re | ut, e, !0, t);
}
function jr(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = ct, r = x;
    Qn(!0), Y(null);
    try {
      t.call(null);
    } finally {
      Qn(n), Y(r);
    }
  }
}
function Ir(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const i = n.ac;
    i !== null && Nr(() => {
      i.abort(Dn);
    });
    var r = n.next;
    (n.f & We) !== 0 ? n.parent = null : K(n, t), n = r;
  }
}
function ns(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & Re) === 0 && K(t), t = n;
  }
}
function K(e, t = !0) {
  var n = !1;
  (t || (e.f & vi) !== 0) && e.nodes_start !== null && e.nodes_end !== null && (rs(
    e.nodes_start,
    /** @type {TemplateNode} */
    e.nodes_end
  ), n = !0), Ir(e, t && !n), tn(e, 0), te(e, ft);
  var r = e.transitions;
  if (r !== null)
    for (const s of r)
      s.stop();
  jr(e);
  var i = e.parent;
  i !== null && i.first !== null && Mr(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes_start = e.nodes_end = e.ac = null;
}
function rs(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ ke(e)
    );
    e.remove(), e = n;
  }
}
function Mr(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function it(e, t) {
  var n = [];
  Un(e, n, !0), Pr(n, () => {
    K(e), t && t();
  });
}
function Pr(e, t) {
  var n = e.length;
  if (n > 0) {
    var r = () => --n || t();
    for (var i of e)
      i.out(r);
  } else
    t();
}
function Un(e, t, n) {
  if ((e.f & pe) === 0) {
    if (e.f ^= pe, e.transitions !== null)
      for (const a of e.transitions)
        (a.is_global || n) && t.push(a);
    for (var r = e.first; r !== null; ) {
      var i = r.next, s = (r.f & Ft) !== 0 || (r.f & Re) !== 0;
      Un(r, t, s ? n : !1), r = i;
    }
  }
}
function hn(e) {
  Dr(e, !0);
}
function Dr(e, t) {
  if ((e.f & pe) !== 0) {
    e.f ^= pe, (e.f & V) === 0 && (te(e, fe), Tt(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, i = (n.f & Ft) !== 0 || (n.f & Re) !== 0;
      Dr(n, i ? t : !1), n = r;
    }
    if (e.transitions !== null)
      for (const s of e.transitions)
        (s.is_global || t) && s.in();
  }
}
let pt = !1;
function Zn(e) {
  pt = e;
}
let ct = !1;
function Qn(e) {
  ct = e;
}
let x = null, _e = !1;
function Y(e) {
  x = e;
}
let T = null;
function ue(e) {
  T = e;
}
let W = null;
function Lr(e) {
  x !== null && (W === null ? W = [e] : W.push(e));
}
let U = null, Z = 0, se = null;
function is(e) {
  se = e;
}
let Fr = 1, Rt = 0, st = Rt;
function er(e) {
  st = e;
}
let Ue = !1;
function zr() {
  return ++Fr;
}
function vn(e) {
  var _;
  var t = e.f;
  if ((t & fe) !== 0)
    return !0;
  if ((t & Xe) !== 0) {
    var n = e.deps, r = (t & oe) !== 0;
    if (n !== null) {
      var i, s, a = (t & Jt) !== 0, l = r && T !== null && !Ue, o = n.length;
      if ((a || l) && (T === null || (T.f & ft) === 0)) {
        var f = (
          /** @type {Derived} */
          e
        ), v = f.parent;
        for (i = 0; i < o; i++)
          s = n[i], (a || !((_ = s == null ? void 0 : s.reactions) != null && _.includes(f))) && (s.reactions ?? (s.reactions = [])).push(f);
        a && (f.f ^= Jt), l && v !== null && (v.f & oe) === 0 && (f.f ^= oe);
      }
      for (i = 0; i < o; i++)
        if (s = n[i], vn(
          /** @type {Derived} */
          s
        ) && Er(
          /** @type {Derived} */
          s
        ), s.wv > e.wv)
          return !0;
    }
    (!r || T !== null && !Ue) && te(e, V);
  }
  return !1;
}
function Yr(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !(W != null && W.includes(e)))
    for (var i = 0; i < r.length; i++) {
      var s = r[i];
      (s.f & ne) !== 0 ? Yr(
        /** @type {Derived} */
        s,
        t,
        !1
      ) : t === s && (n ? te(s, fe) : (s.f & V) !== 0 && te(s, Xe), Tt(
        /** @type {Effect} */
        s
      ));
    }
}
function Hr(e) {
  var g;
  var t = U, n = Z, r = se, i = x, s = Ue, a = W, l = re, o = _e, f = st, v = e.f;
  U = /** @type {null | Value[]} */
  null, Z = 0, se = null, Ue = (v & oe) !== 0 && (_e || !pt || x === null), x = (v & (Re | We)) === 0 ? e : null, W = null, xt(e.ctx), _e = !1, st = ++Rt, e.ac !== null && (Nr(() => {
    e.ac.abort(Dn);
  }), e.ac = null);
  try {
    e.f |= mn;
    var _ = (
      /** @type {Function} */
      e.fn
    ), c = _(), d = e.deps;
    if (U !== null) {
      var h;
      if (tn(e, Z), d !== null && Z > 0)
        for (d.length = Z + U.length, h = 0; h < U.length; h++)
          d[Z + h] = U[h];
      else
        e.deps = d = U;
      if (!Ue || // Deriveds that already have reactions can cleanup, so we still add them as reactions
      (v & ne) !== 0 && /** @type {import('#client').Derived} */
      e.reactions !== null)
        for (h = Z; h < d.length; h++)
          ((g = d[h]).reactions ?? (g.reactions = [])).push(e);
    } else d !== null && Z < d.length && (tn(e, Z), d.length = Z);
    if (hr() && se !== null && !_e && d !== null && (e.f & (ne | Xe | fe)) === 0)
      for (h = 0; h < /** @type {Source[]} */
      se.length; h++)
        Yr(
          se[h],
          /** @type {Effect} */
          e
        );
    return i !== null && i !== e && (Rt++, se !== null && (r === null ? r = se : r.push(.../** @type {Source[]} */
    se))), (e.f & rt) !== 0 && (e.f ^= rt), c;
  } catch (b) {
    return _r(b);
  } finally {
    e.f ^= mn, U = t, Z = n, se = r, x = i, Ue = s, W = a, xt(l), _e = o, st = f;
  }
}
function ss(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = fi.call(n, e);
    if (r !== -1) {
      var i = n.length - 1;
      i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
    }
  }
  n === null && (t.f & ne) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (U === null || !U.includes(t)) && (te(t, Xe), (t.f & (oe | Jt)) === 0 && (t.f ^= Jt), br(
    /** @type {Derived} **/
    t
  ), tn(
    /** @type {Derived} **/
    t,
    0
  ));
}
function tn(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      ss(e, n[r]);
}
function gt(e) {
  var t = e.f;
  if ((t & ft) === 0) {
    te(e, V);
    var n = T, r = pt;
    T = e, pt = !0;
    try {
      (t & Ct) !== 0 ? ns(e) : Ir(e), jr(e);
      var i = Hr(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = Fr;
      var s;
      ar && Ri && (e.f & fe) !== 0 && e.deps;
    } finally {
      pt = r, T = n;
    }
  }
}
function w(e) {
  var t = e.f, n = (t & ne) !== 0;
  if (x !== null && !_e) {
    var r = T !== null && (T.f & ft) !== 0;
    if (!r && !(W != null && W.includes(e))) {
      var i = x.deps;
      if ((x.f & mn) !== 0)
        e.rv < Rt && (e.rv = Rt, U === null && i !== null && i[Z] === e ? Z++ : U === null ? U = [e] : (!Ue || !U.includes(e)) && U.push(e));
      else {
        (x.deps ?? (x.deps = [])).push(e);
        var s = e.reactions;
        s === null ? e.reactions = [x] : s.includes(x) || s.push(x);
      }
    }
  } else if (n && /** @type {Derived} */
  e.deps === null && /** @type {Derived} */
  e.effects === null) {
    var a = (
      /** @type {Derived} */
      e
    ), l = a.parent;
    l !== null && (l.f & oe) === 0 && (a.f ^= oe);
  }
  if (ct) {
    if (Ve.has(e))
      return Ve.get(e);
    if (n) {
      a = /** @type {Derived} */
      e;
      var o = a.v;
      return ((a.f & V) === 0 && a.reactions !== null || Ur(a)) && (o = Yn(a)), Ve.set(a, o), o;
    }
  } else n && (a = /** @type {Derived} */
  e, vn(a) && Er(a));
  if ((e.f & rt) !== 0)
    throw e.v;
  return e.v;
}
function Ur(e) {
  if (e.v === D) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (Ve.has(t) || (t.f & ne) !== 0 && Ur(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function Vn(e) {
  var t = _e;
  try {
    return _e = !0, e();
  } finally {
    _e = t;
  }
}
const as = -7169;
function te(e, t) {
  e.f = e.f & as | t;
}
const Vr = /* @__PURE__ */ new Set(), kn = /* @__PURE__ */ new Set();
function ls(e) {
  for (var t = 0; t < e.length; t++)
    Vr.add(e[t]);
  for (var n of kn)
    n(e);
}
let tr = null;
function Ht(e) {
  var q;
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, i = ((q = e.composedPath) == null ? void 0 : q.call(e)) || [], s = (
    /** @type {null | Element} */
    i[0] || e.target
  );
  tr = e;
  var a = 0, l = tr === e && e.__root;
  if (l) {
    var o = i.indexOf(l);
    if (o !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e.__root = t;
      return;
    }
    var f = i.indexOf(t);
    if (f === -1)
      return;
    o <= f && (a = o);
  }
  if (s = /** @type {Element} */
  i[a] || e.target, s !== t) {
    bt(e, "currentTarget", {
      configurable: !0,
      get() {
        return s || n;
      }
    });
    var v = x, _ = T;
    Y(null), ue(null);
    try {
      for (var c, d = []; s !== null; ) {
        var h = s.assignedSlot || s.parentNode || /** @type {any} */
        s.host || null;
        try {
          var g = s["__" + r];
          if (g != null && (!/** @type {any} */
          s.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === s))
            if (On(g)) {
              var [b, ...m] = g;
              b.apply(s, [e, ...m]);
            } else
              g.call(s, e);
        } catch (y) {
          c ? d.push(y) : c = y;
        }
        if (e.cancelBubble || h === t || h === null)
          break;
        s = h;
      }
      if (c) {
        for (let y of d)
          queueMicrotask(() => {
            throw y;
          });
        throw c;
      }
    } finally {
      e.__root = t, delete e.currentTarget, Y(v), ue(_);
    }
  }
}
function os(e) {
  var t = document.createElement("template");
  return t.innerHTML = e.replaceAll("<!>", "<!---->"), t.content;
}
function at(e, t) {
  var n = (
    /** @type {Effect} */
    T
  );
  n.nodes_start === null && (n.nodes_start = e, n.nodes_end = t);
}
// @__NO_SIDE_EFFECTS__
function dt(e, t) {
  var n = (t & si) !== 0, r = (t & ai) !== 0, i, s = !e.startsWith("<!>");
  return () => {
    if ($)
      return at(k, null), k;
    i === void 0 && (i = os(s ? e : "<!>" + e), n || (i = /** @type {Node} */
    /* @__PURE__ */ Be(i)));
    var a = (
      /** @type {TemplateNode} */
      r || Tr ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (n) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Be(a)
      ), o = (
        /** @type {TemplateNode} */
        a.lastChild
      );
      at(l, o);
    } else
      at(a, a);
    return a;
  };
}
function fs() {
  if ($)
    return at(k, null), k;
  var e = document.createDocumentFragment(), t = document.createComment(""), n = xe();
  return e.append(t, n), at(t, n), e;
}
function Ae(e, t) {
  if ($) {
    T.nodes_end = k, Et();
    return;
  }
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
const us = ["touchstart", "touchmove"];
function cs(e) {
  return us.includes(e);
}
const ds = (
  /** @type {const} */
  ["textarea", "script", "style", "title"]
);
function hs(e) {
  return ds.includes(
    /** @type {typeof RAW_TEXT_ELEMENTS[number]} */
    e
  );
}
function vs(e, t) {
  var n = t == null ? "" : typeof t == "object" ? t + "" : t;
  n !== (e.__t ?? (e.__t = e.nodeValue)) && (e.__t = n, e.nodeValue = n + "");
}
function Br(e, t) {
  return Wr(e, t);
}
function _s(e, t) {
  En(), t.intro = t.intro ?? !1;
  const n = t.target, r = $, i = k;
  try {
    for (var s = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ Be(n)
    ); s && (s.nodeType !== qt || /** @type {Comment} */
    s.data !== sr); )
      s = /** @type {TemplateNode} */
      /* @__PURE__ */ ke(s);
    if (!s)
      throw $t;
    B(!0), L(
      /** @type {Comment} */
      s
    );
    const a = Wr(e, { ...t, anchor: s });
    return B(!1), /**  @type {Exports} */
    a;
  } catch (a) {
    if (a instanceof Error && a.message.split(`
`).some((l) => l.startsWith("https://svelte.dev/e/")))
      throw a;
    return a !== $t && console.warn("Failed to hydrate: ", a), t.recover === !1 && ki(), En(), Sr(n), B(!1), Br(e, t);
  } finally {
    B(r), L(i);
  }
}
const vt = /* @__PURE__ */ new Map();
function Wr(e, { target: t, anchor: n, props: r = {}, events: i, context: s, intro: a = !0 }) {
  En();
  var l = /* @__PURE__ */ new Set(), o = (_) => {
    for (var c = 0; c < _.length; c++) {
      var d = _[c];
      if (!l.has(d)) {
        l.add(d);
        var h = cs(d);
        t.addEventListener(d, Ht, { passive: h });
        var g = vt.get(d);
        g === void 0 ? (document.addEventListener(d, Ht, { passive: h }), vt.set(d, 1)) : vt.set(d, g + 1);
      }
    }
  };
  o(Rn(Vr)), kn.add(o);
  var f = void 0, v = es(() => {
    var _ = n ?? t.appendChild(xe());
    return zi(
      /** @type {TemplateNode} */
      _,
      {
        pending: () => {
        }
      },
      (c) => {
        if (s) {
          Fn({});
          var d = (
            /** @type {ComponentContext} */
            re
          );
          d.c = s;
        }
        if (i && (r.$$events = i), $ && at(
          /** @type {TemplateNode} */
          c,
          null
        ), f = e(c, r) || {}, $ && (T.nodes_end = k, k === null || k.nodeType !== qt || /** @type {Comment} */
        k.data !== Nn))
          throw on(), $t;
        s && zn();
      }
    ), () => {
      var h;
      for (var c of l) {
        t.removeEventListener(c, Ht);
        var d = (
          /** @type {number} */
          vt.get(c)
        );
        --d === 0 ? (document.removeEventListener(c, Ht), vt.delete(c)) : vt.set(c, d);
      }
      kn.delete(o), _ !== n && ((h = _.parentNode) == null || h.removeChild(_));
    };
  });
  return Tn.set(f, v), f;
}
let Tn = /* @__PURE__ */ new WeakMap();
function ps(e, t) {
  const n = Tn.get(e);
  return n ? (Tn.delete(e), n(t)) : Promise.resolve();
}
function Xr(e) {
  re === null && yi(), xn(() => {
    const t = Vn(e);
    if (typeof t == "function") return (
      /** @type {() => void} */
      t
    );
  });
}
function At(e, t, n = !1) {
  $ && Et();
  var r = e, i = null, s = null, a = D, l = n ? Ft : 0, o = !1;
  const f = (d, h = !0) => {
    o = !0, c(h, d);
  };
  var v = null;
  function _() {
    v !== null && (v.lastChild.remove(), r.before(v), v = null);
    var d = a ? i : s, h = a ? s : i;
    d && hn(d), h && it(h, () => {
      a ? s = null : i = null;
    });
  }
  const c = (d, h) => {
    if (a === (a = d)) return;
    let g = !1;
    if ($) {
      const N = ur(r) === ln;
      !!a === N && (r = Zt(), L(r), B(!1), g = !0);
    }
    var b = Ar(), m = r;
    if (b && (v = document.createDocumentFragment(), v.append(m = xe())), a ? i ?? (i = h && ee(() => h(m))) : s ?? (s = h && ee(() => h(m))), b) {
      var q = (
        /** @type {Batch} */
        I
      ), y = a ? i : s, S = a ? s : i;
      y && q.skipped_effects.delete(y), S && q.skipped_effects.add(S), q.add_callback(_);
    } else
      _();
    g && B(!0);
  };
  dn(() => {
    o = !1, t(f), o || c(null, null);
  }, l), $ && (r = k);
}
function gs(e, t, n) {
  for (var r = e.items, i = [], s = t.length, a = 0; a < s; a++)
    Un(t[a].e, i, !0);
  var l = s > 0 && i.length === 0 && n !== null;
  if (l) {
    var o = (
      /** @type {Element} */
      /** @type {Element} */
      n.parentNode
    );
    Sr(o), o.append(
      /** @type {Element} */
      n
    ), r.clear(), ye(e, t[0].prev, t[s - 1].next);
  }
  Pr(i, () => {
    for (var f = 0; f < s; f++) {
      var v = t[f];
      l || (r.delete(v.k), ye(e, v.prev, v.next)), K(v.e, !l);
    }
  });
}
function ms(e, t, n, r, i, s = null) {
  var a = e, l = { flags: t, items: /* @__PURE__ */ new Map(), first: null };
  {
    var o = (
      /** @type {Element} */
      e
    );
    a = $ ? L(
      /** @type {Comment | Text} */
      /* @__PURE__ */ Be(o)
    ) : o.appendChild(xe());
  }
  $ && Et();
  var f = null, v = !1, _ = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ Wi(() => {
    var b = n();
    return On(b) ? b : b == null ? [] : Rn(b);
  }), d, h;
  function g() {
    ys(
      h,
      d,
      l,
      _,
      a,
      i,
      t,
      r,
      n
    ), s !== null && (d.length === 0 ? f ? hn(f) : f = ee(() => s(a)) : f !== null && it(f, () => {
      f = null;
    }));
  }
  dn(() => {
    h ?? (h = /** @type {Effect} */
    T), d = /** @type {V[]} */
    w(c);
    var b = d.length;
    if (v && b === 0)
      return;
    v = b === 0;
    let m = !1;
    if ($) {
      var q = ur(a) === ln;
      q !== (b === 0) && (a = Zt(), L(a), B(!1), m = !0);
    }
    if ($) {
      for (var y = null, S, N = 0; N < b; N++) {
        if (k.nodeType === qt && /** @type {Comment} */
        k.data === Nn) {
          a = /** @type {Comment} */
          k, m = !0, B(!1);
          break;
        }
        var X = d[N], A = r(X, N);
        S = Cn(
          k,
          l,
          y,
          null,
          X,
          A,
          N,
          i,
          t,
          n
        ), l.items.set(A, S), y = S;
      }
      b > 0 && L(Zt());
    }
    if ($)
      b === 0 && s && (f = ee(() => s(a)));
    else if (Ar()) {
      var ce = /* @__PURE__ */ new Set(), J = (
        /** @type {Batch} */
        I
      );
      for (N = 0; N < b; N += 1) {
        X = d[N], A = r(X, N);
        var ht = l.items.get(A) ?? _.get(A);
        ht || (S = Cn(
          null,
          l,
          null,
          null,
          X,
          A,
          N,
          i,
          t,
          n,
          !0
        ), _.set(A, S)), ce.add(A);
      }
      for (const [Ge, Ke] of l.items)
        ce.has(Ge) || J.skipped_effects.add(Ke.e);
      J.add_callback(g);
    } else
      g();
    m && B(!0), w(c);
  }), $ && (a = k);
}
function ys(e, t, n, r, i, s, a, l, o) {
  var f = t.length, v = n.items, _ = n.first, c = _, d, h = null, g = [], b = [], m, q, y, S;
  for (S = 0; S < f; S += 1) {
    if (m = t[S], q = l(m, S), y = v.get(q), y === void 0) {
      var N = r.get(q);
      if (N !== void 0) {
        r.delete(q), v.set(q, N);
        var X = h ? h.next : c;
        ye(n, h, N), ye(n, N, X), gn(N, X, i), h = N;
      } else {
        var A = c ? (
          /** @type {TemplateNode} */
          c.e.nodes_start
        ) : i;
        h = Cn(
          A,
          n,
          h,
          h === null ? n.first : h.next,
          m,
          q,
          S,
          s,
          a,
          o
        );
      }
      v.set(q, h), g = [], b = [], c = h.next;
      continue;
    }
    if ((y.e.f & pe) !== 0 && hn(y.e), y !== c) {
      if (d !== void 0 && d.has(y)) {
        if (g.length < b.length) {
          var ce = b[0], J;
          h = ce.prev;
          var ht = g[0], Ge = g[g.length - 1];
          for (J = 0; J < g.length; J += 1)
            gn(g[J], ce, i);
          for (J = 0; J < b.length; J += 1)
            d.delete(b[J]);
          ye(n, ht.prev, Ge.next), ye(n, h, ht), ye(n, Ge, ce), c = ce, h = Ge, S -= 1, g = [], b = [];
        } else
          d.delete(y), gn(y, c, i), ye(n, y.prev, y.next), ye(n, y, h === null ? n.first : h.next), ye(n, h, y), h = y;
        continue;
      }
      for (g = [], b = []; c !== null && c.k !== q; )
        (c.e.f & pe) === 0 && (d ?? (d = /* @__PURE__ */ new Set())).add(c), b.push(c), c = c.next;
      if (c === null)
        continue;
      y = c;
    }
    g.push(y), h = y, c = y.next;
  }
  if (c !== null || d !== void 0) {
    for (var Ke = d === void 0 ? [] : Rn(d); c !== null; )
      (c.e.f & pe) === 0 && Ke.push(c), c = c.next;
    var zt = Ke.length;
    if (zt > 0) {
      var Yt = f === 0 ? i : null;
      gs(n, Ke, Yt);
    }
  }
  e.first = n.first && n.first.e, e.last = h && h.e;
  for (var E of r.values())
    K(E.e);
  r.clear();
}
function Cn(e, t, n, r, i, s, a, l, o, f, v) {
  var _ = (o & ni) !== 0, c = (o & ii) === 0, d = _ ? c ? /* @__PURE__ */ xr(i, !1, !1) : ot(i) : i, h = (o & ri) === 0 ? a : ot(a), g = {
    i: h,
    v: d,
    k: s,
    a: null,
    // @ts-expect-error
    e: null,
    prev: n,
    next: r
  };
  try {
    if (e === null) {
      var b = document.createDocumentFragment();
      b.append(e = xe());
    }
    return g.e = ee(() => l(
      /** @type {Node} */
      e,
      d,
      h,
      f
    ), $), g.e.prev = n && n.e, g.e.next = r && r.e, n === null ? v || (t.first = g) : (n.next = g, n.e.next = g.e), r !== null && (r.prev = g, r.e.prev = g.e), g;
  } finally {
  }
}
function gn(e, t, n) {
  for (var r = e.next ? (
    /** @type {TemplateNode} */
    e.next.e.nodes_start
  ) : n, i = t ? (
    /** @type {TemplateNode} */
    t.e.nodes_start
  ) : n, s = (
    /** @type {TemplateNode} */
    e.e.nodes_start
  ); s !== null && s !== r; ) {
    var a = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ ke(s)
    );
    i.before(s), s = a;
  }
}
function ye(e, t, n) {
  t === null ? e.first = n : (t.next = n, t.e.next = n && n.e), n !== null && (n.prev = t, n.e.prev = t && t.e);
}
function ws(e, t, n, r, i, s) {
  let a = $;
  $ && Et();
  var l, o, f = null;
  $ && k.nodeType === mi && (f = /** @type {Element} */
  k, Et());
  var v = (
    /** @type {TemplateNode} */
    $ ? k : e
  ), _;
  dn(() => {
    const c = t() || null;
    var d = c === "svg" ? oi : null;
    c !== l && (_ && (c === null ? it(_, () => {
      _ = null, o = null;
    }) : c === o ? hn(_) : K(_)), c && c !== o && (_ = ee(() => {
      if (f = $ ? (
        /** @type {Element} */
        f
      ) : d ? document.createElementNS(d, c) : document.createElement(c), at(f, f), r) {
        $ && hs(c) && f.append(document.createComment(""));
        var h = (
          /** @type {TemplateNode} */
          $ ? /* @__PURE__ */ Be(f) : f.appendChild(xe())
        );
        $ && (h === null ? B(!1) : L(h)), r(f, h);
      }
      T.nodes_end = f, v.before(f);
    })), l = c, l && (o = l));
  }, Ft), a && (B(!0), L(v));
}
function Gr(e, t) {
  Rr(() => {
    var n = e.getRootNode(), r = (
      /** @type {ShadowRoot} */
      n.host ? (
        /** @type {ShadowRoot} */
        n
      ) : (
        /** @type {Document} */
        n.head ?? /** @type {Document} */
        n.ownerDocument.head
      )
    );
    if (!r.querySelector("#" + t.hash)) {
      const i = document.createElement("style");
      i.id = t.hash, i.textContent = t.code, r.appendChild(i);
    }
  });
}
function $s(e, t, n) {
  var r = e == null ? "" : "" + e;
  return t && (r = r ? r + " " + t : t), r === "" ? null : r;
}
function bs(e, t) {
  return e == null ? null : String(e);
}
function qe(e, t, n, r, i, s) {
  var a = e.__className;
  if ($ || a !== n || a === void 0) {
    var l = $s(n, r);
    (!$ || l !== e.getAttribute("class")) && (l == null ? e.removeAttribute("class") : t ? e.className = l : e.setAttribute("class", l)), e.__className = n;
  }
  return s;
}
function Pe(e, t, n, r) {
  var i = e.__style;
  if ($ || i !== t) {
    var s = bs(t);
    (!$ || s !== e.getAttribute("style")) && (s == null ? e.removeAttribute("style") : e.style.cssText = s), e.__style = t;
  }
  return r;
}
const Es = Symbol("is custom element"), xs = Symbol("is html");
function Kr(e, t, n, r) {
  var i = ks(e);
  $ && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === "LINK") || i[t] !== (i[t] = n) && (t === "loading" && (e[gi] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && Jr(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function nr(e, t, n) {
  var r = x, i = T;
  let s = $;
  $ && B(!1), Y(null), ue(null);
  try {
    // `style` should use `set_attribute` rather than the setter
    t !== "style" && // Don't compute setters for custom elements while they aren't registered yet,
    // because during their upgrade/instantiation they might add more setters.
    // Instead, fall back to a simple "an object, then set as property" heuristic.
    (qn.has(e.getAttribute("is") || e.nodeName) || // customElements may not be available in browser extension contexts
    !customElements || customElements.get(e.getAttribute("is") || e.tagName.toLowerCase()) ? Jr(e).includes(t) : n && typeof n == "object") ? e[t] = n : Kr(e, t, n == null ? n : String(n));
  } finally {
    Y(r), ue(i), s && B(!0);
  }
}
function ks(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ?? (e.__attributes = {
      [Es]: e.nodeName.includes("-"),
      [xs]: e.namespaceURI === li
    })
  );
}
var qn = /* @__PURE__ */ new Map();
function Jr(e) {
  var t = e.getAttribute("is") || e.nodeName, n = qn.get(t);
  if (n) return n;
  qn.set(t, n = []);
  for (var r, i = e, s = Element.prototype; s !== i; ) {
    r = ui(i);
    for (var a in r)
      r[a].set && n.push(a);
    i = lr(i);
  }
  return n;
}
function rr(e, t) {
  return e === t || (e == null ? void 0 : e[Ut]) === t;
}
function Ts(e = {}, t, n, r) {
  return Rr(() => {
    var i, s;
    return Hn(() => {
      i = s, s = [], Vn(() => {
        e !== n(...s) && (t(e, ...s), i && rr(n(...i), e) && t(null, ...i));
      });
    }), () => {
      fn(() => {
        s && rr(n(...s), e) && t(null, ...s);
      });
    };
  }), e;
}
function Se(e, t, n, r) {
  var i = (
    /** @type {V} */
    r
  ), s = !0, a = () => (s && (s = !1, i = /** @type {V} */
  r), i), l;
  l = /** @type {V} */
  e[t], l === void 0 && r !== void 0 && (l = a());
  var o;
  o = () => {
    var c = (
      /** @type {V} */
      e[t]
    );
    return c === void 0 ? a() : (s = !0, c);
  };
  var f = !1, v = /* @__PURE__ */ cn(() => (f = !1, o())), _ = (
    /** @type {Effect} */
    T
  );
  return (
    /** @type {() => V} */
    (function(c, d) {
      if (arguments.length > 0) {
        const h = d ? w(v) : c;
        return O(v, h), f = !0, i !== void 0 && (i = h), c;
      }
      return ct && f || (_.f & ft) !== 0 ? v.v : w(v);
    })
  );
}
function Cs(e) {
  return new qs(e);
}
var Ne, le;
class qs {
  /**
   * @param {ComponentConstructorOptions & {
   *  component: any;
   * }} options
   */
  constructor(t) {
    /** @type {any} */
    C(this, Ne);
    /** @type {Record<string, any>} */
    C(this, le);
    var s;
    var n = /* @__PURE__ */ new Map(), r = (a, l) => {
      var o = /* @__PURE__ */ xr(l, !1, !1);
      return n.set(a, o), o;
    };
    const i = new Proxy(
      { ...t.props || {}, $$events: {} },
      {
        get(a, l) {
          return w(n.get(l) ?? r(l, Reflect.get(a, l)));
        },
        has(a, l) {
          return l === pi ? !0 : (w(n.get(l) ?? r(l, Reflect.get(a, l))), Reflect.has(a, l));
        },
        set(a, l, o) {
          return O(n.get(l) ?? r(l, o), o), Reflect.set(a, l, o);
        }
      }
    );
    p(this, le, (t.hydrate ? _s : Br)(t.component, {
      target: t.target,
      anchor: t.anchor,
      props: i,
      context: t.context,
      intro: t.intro ?? !1,
      recover: t.recover
    })), (!((s = t == null ? void 0 : t.props) != null && s.$$host) || t.sync === !1) && we(), p(this, Ne, i.$$events);
    for (const a of Object.keys(u(this, le)))
      a === "$set" || a === "$destroy" || a === "$on" || bt(this, a, {
        get() {
          return u(this, le)[a];
        },
        /** @param {any} value */
        set(l) {
          u(this, le)[a] = l;
        },
        enumerable: !0
      });
    u(this, le).$set = /** @param {Record<string, any>} next */
    (a) => {
      Object.assign(i, a);
    }, u(this, le).$destroy = () => {
      ps(u(this, le));
    };
  }
  /** @param {Record<string, any>} props */
  $set(t) {
    u(this, le).$set(t);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(t, n) {
    u(this, Ne)[t] = u(this, Ne)[t] || [];
    const r = (...i) => n.call(this, ...i);
    return u(this, Ne)[t].push(r), () => {
      u(this, Ne)[t] = u(this, Ne)[t].filter(
        /** @param {any} fn */
        (i) => i !== r
      );
    };
  }
  $destroy() {
    u(this, le).$destroy();
  }
}
Ne = new WeakMap(), le = new WeakMap();
let Zr;
typeof HTMLElement == "function" && (Zr = class extends HTMLElement {
  /**
   * @param {*} $$componentCtor
   * @param {*} $$slots
   * @param {*} use_shadow_dom
   */
  constructor(t, n, r) {
    super();
    /** The Svelte component constructor */
    M(this, "$$ctor");
    /** Slots */
    M(this, "$$s");
    /** @type {any} The Svelte component instance */
    M(this, "$$c");
    /** Whether or not the custom element is connected */
    M(this, "$$cn", !1);
    /** @type {Record<string, any>} Component props data */
    M(this, "$$d", {});
    /** `true` if currently in the process of reflecting component props back to attributes */
    M(this, "$$r", !1);
    /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    M(this, "$$p_d", {});
    /** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
    M(this, "$$l", {});
    /** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
    M(this, "$$l_u", /* @__PURE__ */ new Map());
    /** @type {any} The managed render effect for reflecting attributes */
    M(this, "$$me");
    this.$$ctor = t, this.$$s = n, r && this.attachShadow({ mode: "open" });
  }
  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  addEventListener(t, n, r) {
    if (this.$$l[t] = this.$$l[t] || [], this.$$l[t].push(n), this.$$c) {
      const i = this.$$c.$on(t, n);
      this.$$l_u.set(n, i);
    }
    super.addEventListener(t, n, r);
  }
  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  removeEventListener(t, n, r) {
    if (super.removeEventListener(t, n, r), this.$$c) {
      const i = this.$$l_u.get(n);
      i && (i(), this.$$l_u.delete(n));
    }
  }
  async connectedCallback() {
    if (this.$$cn = !0, !this.$$c) {
      let t = function(i) {
        return (s) => {
          const a = document.createElement("slot");
          i !== "default" && (a.name = i), Ae(s, a);
        };
      };
      if (await Promise.resolve(), !this.$$cn || this.$$c)
        return;
      const n = {}, r = Ss(this);
      for (const i of this.$$s)
        i in r && (i === "default" && !this.$$d.children ? (this.$$d.children = t(i), n.default = !0) : n[i] = t(i));
      for (const i of this.attributes) {
        const s = this.$$g_p(i.name);
        s in this.$$d || (this.$$d[s] = Gt(s, i.value, this.$$p_d, "toProp"));
      }
      for (const i in this.$$p_d)
        !(i in this.$$d) && this[i] !== void 0 && (this.$$d[i] = this[i], delete this[i]);
      this.$$c = Cs({
        component: this.$$ctor,
        target: this.shadowRoot || this,
        props: {
          ...this.$$d,
          $$slots: n,
          $$host: this
        }
      }), this.$$me = Qi(() => {
        Hn(() => {
          var i;
          this.$$r = !0;
          for (const s of Kt(this.$$c)) {
            if (!((i = this.$$p_d[s]) != null && i.reflect)) continue;
            this.$$d[s] = this.$$c[s];
            const a = Gt(
              s,
              this.$$d[s],
              this.$$p_d,
              "toAttribute"
            );
            a == null ? this.removeAttribute(this.$$p_d[s].attribute || s) : this.setAttribute(this.$$p_d[s].attribute || s, a);
          }
          this.$$r = !1;
        });
      });
      for (const i in this.$$l)
        for (const s of this.$$l[i]) {
          const a = this.$$c.$on(i, s);
          this.$$l_u.set(s, a);
        }
      this.$$l = {};
    }
  }
  // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
  // and setting attributes through setAttribute etc, this is helpful
  /**
   * @param {string} attr
   * @param {string} _oldValue
   * @param {string} newValue
   */
  attributeChangedCallback(t, n, r) {
    var i;
    this.$$r || (t = this.$$g_p(t), this.$$d[t] = Gt(t, r, this.$$p_d, "toProp"), (i = this.$$c) == null || i.$set({ [t]: this.$$d[t] }));
  }
  disconnectedCallback() {
    this.$$cn = !1, Promise.resolve().then(() => {
      !this.$$cn && this.$$c && (this.$$c.$destroy(), this.$$me(), this.$$c = void 0);
    });
  }
  /**
   * @param {string} attribute_name
   */
  $$g_p(t) {
    return Kt(this.$$p_d).find(
      (n) => this.$$p_d[n].attribute === t || !this.$$p_d[n].attribute && n.toLowerCase() === t
    ) || t;
  }
});
function Gt(e, t, n, r) {
  var s;
  const i = (s = n[e]) == null ? void 0 : s.type;
  if (t = i === "Boolean" && typeof t != "boolean" ? t != null : t, !r || !n[e])
    return t;
  if (r === "toAttribute")
    switch (i) {
      case "Object":
      case "Array":
        return t == null ? null : JSON.stringify(t);
      case "Boolean":
        return t ? "" : null;
      case "Number":
        return t ?? null;
      default:
        return t;
    }
  else
    switch (i) {
      case "Object":
      case "Array":
        return t && JSON.parse(t);
      case "Boolean":
        return t;
      // conversion already handled above
      case "Number":
        return t != null ? +t : t;
      default:
        return t;
    }
}
function Ss(e) {
  const t = {};
  return e.childNodes.forEach((n) => {
    t[
      /** @type {Element} node */
      n.slot || "default"
    ] = !0;
  }), t;
}
function Qr(e, t, n, r, i, s) {
  let a = class extends Zr {
    constructor() {
      super(e, n, i), this.$$p_d = t;
    }
    static get observedAttributes() {
      return Kt(t).map(
        (l) => (t[l].attribute || l).toLowerCase()
      );
    }
  };
  return Kt(t).forEach((l) => {
    bt(a.prototype, l, {
      get() {
        return this.$$c && l in this.$$c ? this.$$c[l] : this.$$d[l];
      },
      set(o) {
        var _;
        o = Gt(l, o, t), this.$$d[l] = o;
        var f = this.$$c;
        if (f) {
          var v = (_ = _t(f, l)) == null ? void 0 : _.get;
          v ? f[l] = o : f.$set({ [l]: o });
        }
      }
    });
  }), r.forEach((l) => {
    bt(a.prototype, l, {
      get() {
        var o;
        return (o = this.$$c) == null ? void 0 : o[l];
      }
    });
  }), s && (a = s(a)), e.element = /** @type {any} */
  a, a;
}
let nn = /* @__PURE__ */ H(void 0);
const As = async () => (O(nn, await window.loadCardHelpers().then((e) => e), !0), w(nn)), Ns = () => w(nn) ? w(nn) : As();
var Os = /* @__PURE__ */ dt('<span class="loading svelte-lv9s7p">Loading...</span>'), Rs = /* @__PURE__ */ dt("<div><!> <!></div>");
const js = {
  hash: "svelte-lv9s7p",
  code: `.loading.svelte-lv9s7p {padding:1em;display:block;}.outer-container.svelte-lv9s7p {transition:margin-bottom 0.35s ease;}.outer-container.open.svelte-lv9s7p,
  .outer-container.opening.svelte-lv9s7p {margin-bottom:inherit;}.outer-container.close.svelte-lv9s7p,
  .outer-container.closing.svelte-lv9s7p {margin-bottom:-100%;}.outer-container.opening.svelte-lv9s7p {
    animation: svelte-lv9s7p-fadeInOpacity 0.5s forwards ease;
    -webkit-animation: svelte-lv9s7p-fadeInOpacity 0.5s forwards ease;}.outer-container.closing.svelte-lv9s7p {
      animation: svelte-lv9s7p-fadeOutOpacity 0.5s forwards ease;
      -webkit-animation: svelte-lv9s7p-fadeOutOpacity 0.5s forwards ease;}
  @keyframes svelte-lv9s7p-fadeInOpacity {
      0% {
          opacity: 0;
      }
      100% {
          opacity: 1;
      }
  }
  @-webkit-keyframes svelte-lv9s7p-fadeInOpacity {
      0% {
          opacity: 0;
      }
      100% {
          opacity: 1;
      }
  }
    @keyframes svelte-lv9s7p-fadeOutOpacity {
      0% {
          opacity: 1;
      }
      100% {
          opacity: 0;
      }
  }
  @-webkit-keyframes svelte-lv9s7p-fadeOutOpacity {
      0% {
          opacity: 1;
      }
      100% {
          opacity: 0;
      }
  }`
};
function Sn(e, t) {
  Fn(t, !0), Gr(e, js);
  const n = Se(t, "type", 7, "div"), r = Se(t, "config"), i = Se(t, "hass"), s = Se(t, "marginTop", 7, "0px"), a = Se(t, "open"), l = Se(t, "animationState"), o = Se(t, "clearCardCss", 7, !1);
  let f = /* @__PURE__ */ H(void 0), v = /* @__PURE__ */ H(!0);
  xn(() => {
    w(f) && (w(f).hass = i());
  }), xn(() => {
    var y, S;
    const q = { type: "conditional", conditions: [
      {
        condition: "screen",
        media_query: a() ? "(max-width: 99999px)" : "(max-width: 0px)"
      }
    ], card: r() };
    (S = (y = w(f)) == null ? void 0 : y.setConfig) == null || S.call(y, q);
  }), Xr(async () => {
    const m = await Ns(), y = { type: "conditional", conditions: [
      {
        condition: "screen",
        media_query: a() ? "(max-width: 99999px)" : "(max-width: 0px)"
      }
    ], card: r() }, S = m.createCardElement(y);
    S.hass = i(), w(f) && (o() && new MutationObserver(() => {
      _(S);
    }).observe(S, { childList: !0, subtree: !0 }), w(f).replaceWith(S), O(f, S, !0), O(v, !1));
  });
  function _(m, q = 5) {
    let y = 0;
    const S = () => {
      const N = [];
      function X(A) {
        if (A instanceof Element && A.tagName.toLowerCase() === "ha-card") {
          N.push(A);
          return;
        }
        A.shadowRoot && X(A.shadowRoot), (A instanceof ShadowRoot || A instanceof Element ? Array.from(A.children) : []).forEach(X);
      }
      X(m), N.length > 0 ? N.forEach((A) => {
        A.style.setProperty("border", "none", "important"), A.style.setProperty("background", "transparent", "important"), A.style.setProperty("box-shadow", "none", "important");
      }) : (y++, y < q && requestAnimationFrame(S));
    };
    S();
  }
  var c = {
    get type() {
      return n();
    },
    set type(m = "div") {
      n(m), we();
    },
    get config() {
      return r();
    },
    set config(m) {
      r(m), we();
    },
    get hass() {
      return i();
    },
    set hass(m) {
      i(m), we();
    },
    get marginTop() {
      return s();
    },
    set marginTop(m = "0px") {
      s(m), we();
    },
    get open() {
      return a();
    },
    set open(m) {
      a(m), we();
    },
    get animationState() {
      return l();
    },
    set animationState(m) {
      l(m), we();
    },
    get clearCardCss() {
      return o();
    },
    set clearCardCss(m = !1) {
      o(m), we();
    }
  }, d = Rs(), h = Ie(d);
  ws(h, n, !1, (m, q) => {
    Ts(m, (y) => O(f, y, !0), () => w(f)), qe(m, 0, "svelte-lv9s7p");
  });
  var g = Xt(h, 2);
  {
    var b = (m) => {
      var q = Os();
      Ae(m, q);
    };
    At(g, (m) => {
      w(v) && m(b);
    });
  }
  return Te(d), Me(() => {
    qe(d, 1, `outer-container${a() ? " open" : " close"} ${l() ?? ""}`, "svelte-lv9s7p"), Pe(d, `margin-top: ${(a() ? s() : "0px") ?? ""};`);
  }), Ae(e, d), zn(c);
}
customElements.define("expander-sub-card", Qr(
  Sn,
  {
    type: {},
    config: {},
    hass: {},
    marginTop: {},
    open: {},
    animationState: {},
    clearCardCss: {}
  },
  [],
  [],
  !0
));
const An = {
  gap: "0.0em",
  "expanded-gap": "0.6em",
  padding: "1em",
  clear: !1,
  "clear-children": !1,
  title: " ",
  "overlay-margin": "0.0em",
  "child-padding": "0.0em",
  "child-margin-top": "0.0em",
  "button-background": "transparent",
  "expander-card-background": "var(--ha-card-background,var(--card-background-color,#fff))",
  "header-color": "var(--primary-text-color,#fff)",
  "arrow-color": "var(--arrow-color,var(--primary-text-color,#fff))",
  "expander-card-display": "block",
  "title-card-clickable": !1,
  "min-width-expanded": 0,
  "max-width-expanded": 0,
  icon: "mdi:chevron-down",
  "icon-rotate-degree": "180deg"
};
var Is = /* @__PURE__ */ dt('<button aria-label="Toggle button"><ha-icon></ha-icon></button>', 2), Ms = /* @__PURE__ */ dt('<div id="id1"><div id="id2" class="title-card-container svelte-1jqiztq"><!></div> <!></div>'), Ps = /* @__PURE__ */ dt("<button><div> </div> <ha-icon></ha-icon></button>", 2), Ds = /* @__PURE__ */ dt('<div class="children-wrapper svelte-1jqiztq"><div class="children-container svelte-1jqiztq"></div></div>'), Ls = /* @__PURE__ */ dt("<ha-card><!> <!></ha-card>", 2);
const Fs = {
  hash: "svelte-1jqiztq",
  code: `.expander-card.svelte-1jqiztq {display:var(--expander-card-display,block);gap:var(--gap);padding:var(--padding);background:var(--card-background,#fff);}.children-wrapper.svelte-1jqiztq {overflow:hidden;}.children-container.svelte-1jqiztq {padding:var(--child-padding);display:var(--expander-card-display,block);gap:var(--gap);}.clear.svelte-1jqiztq {background:none !important;background-color:transparent !important;border-style:none !important;}.title-card-header.svelte-1jqiztq {display:flex;align-items:center;justify-content:space-between;flex-direction:row;}.title-card-header-overlay.svelte-1jqiztq {display:block;}.title-card-container.svelte-1jqiztq {width:100%;padding:var(--title-padding);}.header.svelte-1jqiztq {display:flex;flex-direction:row;align-items:center;padding:0.8em 0.8em;margin:2px;background:var(--button-background);border-style:none;width:var(--header-width,auto);color:var(--header-color,#fff);}.header-overlay.svelte-1jqiztq {position:absolute;top:0;right:0;margin:var(--overlay-margin);}.title.svelte-1jqiztq {width:100%;text-align:left;}.ico.svelte-1jqiztq {color:var(--arrow-color,var(--primary-text-color,#fff));transition-property:transform;transition-duration:0.35s;}.flipped.svelte-1jqiztq {transform:rotate(var(--icon-rotate-degree,180deg));}.ripple.svelte-1jqiztq {background-position:center;transition:background 0.8s;border-radius:1em;}.ripple.svelte-1jqiztq:hover {background:#ffffff12 radial-gradient(circle, transparent 1%, #ffffff12 1%) center/15000%;}.ripple.svelte-1jqiztq:active {background-color:#ffffff25;background-size:100%;transition:background 0s;}
    @keyframes svelte-1jqiztq-slide-in {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(0%); }
    }
    @-webkit-keyframes svelte-1jqiztq-slide-in {
        0% { -webkit-transform: translateY(-100%); }
        100% { -webkit-transform: translateY(0%); }
    }
    @keyframes svelte-1jqiztq-slide-out {
        0% { transform: translateY(0%); }
        100% { transform: translateY(-100%); }
    }
    @-webkit-keyframes svelte-1jqiztq-slide-out {
        0% { -webkit-transform: translateY(0%); }
        100% { -webkit-transform: translateY(-100%); }
    }`
};
function zs(e, t) {
  var zt, Yt;
  Fn(t, !0), Gr(e, Fs);
  const n = Se(t, "hass"), r = Se(t, "config", 7, An);
  let i = /* @__PURE__ */ H(!1), s = /* @__PURE__ */ H(!1), a = /* @__PURE__ */ H("idle"), l = /* @__PURE__ */ H(null);
  const o = r()["storage-id"] ?? r()["storgage-id"], f = "expander-open-" + o, v = r()["show-button-users"] === void 0 || ((Yt = r()["show-button-users"]) == null ? void 0 : Yt.includes((zt = n()) == null ? void 0 : zt.user.name));
  function _() {
    w(l) && (clearTimeout(w(l)), O(l, null));
    const E = !w(s);
    O(a, E ? "opening" : "closing", !0), E ? (c(!0), O(
      l,
      setTimeout(
        () => {
          O(a, "idle"), O(l, null);
        },
        350
      ),
      !0
    )) : O(
      l,
      setTimeout(
        () => {
          c(!1), O(a, "idle"), O(l, null);
        },
        350
      ),
      !0
    );
  }
  function c(E) {
    if (O(s, E, !0), o !== void 0)
      try {
        localStorage.setItem(f, w(s) ? "true" : "false");
      } catch (R) {
        console.error(R);
      }
  }
  Xr(() => {
    var me, de;
    const E = r()["min-width-expanded"], R = r()["max-width-expanded"], j = document.body.offsetWidth;
    if (E && R ? r().expanded = j >= E && j <= R : E ? r().expanded = j >= E : R && (r().expanded = j <= R), (de = r()["start-expanded-users"]) != null && de.includes((me = n()) == null ? void 0 : me.user.name))
      c(!0);
    else if (o !== void 0)
      try {
        const z = localStorage.getItem(f);
        z === null ? r().expanded !== void 0 && c(r().expanded) : O(s, z ? z === "true" : w(s), !0);
      } catch (z) {
        console.error(z);
      }
    else
      r().expanded !== void 0 && c(r().expanded);
  });
  const d = (E) => {
    if (w(i))
      return E.preventDefault(), E.stopImmediatePropagation(), O(i, !1), !1;
    _();
  }, h = (E) => {
    const R = E.currentTarget;
    R != null && R.classList.contains("title-card-container") && d(E);
  };
  let g, b = !1, m = 0, q = 0;
  const y = (E) => {
    g = E.target, m = E.touches[0].clientX, q = E.touches[0].clientY, b = !1;
  }, S = (E) => {
    const R = E.touches[0].clientX, j = E.touches[0].clientY;
    (Math.abs(R - m) > 10 || Math.abs(j - q) > 10) && (b = !0);
  }, N = (E) => {
    !b && g === E.target && r()["title-card-clickable"] && _(), g = void 0, O(i, !0);
  };
  var X = {
    get hass() {
      return n();
    },
    set hass(E) {
      n(E), we();
    },
    get config() {
      return r();
    },
    set config(E = An) {
      r(E), we();
    }
  }, A = Ls(), ce = Ie(A);
  {
    var J = (E) => {
      var R = Ms(), j = Ie(R);
      j.__touchstart = y, j.__touchmove = S, j.__touchend = N, j.__click = function(...ie) {
        var he;
        (he = r()["title-card-clickable"] ? h : null) == null || he.apply(this, ie);
      };
      var me = Ie(j);
      {
        let ie = /* @__PURE__ */ Kn(() => r()["clear-children"] || !1);
        Sn(me, {
          get hass() {
            return n();
          },
          get config() {
            return r()["title-card"];
          },
          get type() {
            return r()["title-card"].type;
          },
          open: !0,
          animationState: "idle",
          get clearCardCss() {
            return w(ie);
          }
        });
      }
      Te(j);
      var de = Xt(j, 2);
      {
        var z = (ie) => {
          var he = Is();
          he.__click = d;
          var Je = Ie(he);
          Me(() => nr(Je, "icon", r().icon)), Te(he), Me(() => {
            Pe(he, `--overlay-margin:${r()["overlay-margin"] ?? ""}; --button-background:${r()["button-background"] ?? ""}; --header-color:${r()["header-color"] ?? ""};`), qe(he, 1, `header ripple${r()["title-card-button-overlay"] ? " header-overlay" : ""}${w(s) ? " open" : " close"}`, "svelte-1jqiztq"), Pe(Je, `--arrow-color:${r()["arrow-color"] ?? ""}`), qe(Je, 1, `ico${w(s) ? " flipped open" : " close"}`, "svelte-1jqiztq");
          }), Ae(ie, he);
        };
        At(de, (ie) => {
          v && ie(z);
        });
      }
      Te(R), Me(() => {
        qe(R, 1, `title-card-header${r()["title-card-button-overlay"] ? "-overlay" : ""}`, "svelte-1jqiztq"), Pe(j, `--title-padding:${r()["title-card-padding"] ?? ""}`), Kr(j, "role", r()["title-card-clickable"] ? "button" : void 0);
      }), Ae(E, R);
    }, ht = (E) => {
      var R = fs(), j = Gi(R);
      {
        var me = (de) => {
          var z = Ps();
          z.__click = d;
          var ie = Ie(z), he = Ie(ie, !0);
          Te(ie);
          var Je = Xt(ie, 2);
          Me(() => nr(Je, "icon", r().icon)), Te(z), Me(() => {
            qe(z, 1, `header${r()["expander-card-background-expanded"] ? "" : " ripple"}${w(s) ? " open" : " close"}`, "svelte-1jqiztq"), Pe(z, `--header-width:100%; --button-background:${r()["button-background"] ?? ""};--header-color:${r()["header-color"] ?? ""};`), qe(ie, 1, `primary title${w(s) ? " open" : " close"}`, "svelte-1jqiztq"), vs(he, r().title), Pe(Je, `--arrow-color:${r()["arrow-color"] ?? ""}`), qe(Je, 1, `ico${w(s) && w(a) !== "closing" ? " flipped open" : " close"}`, "svelte-1jqiztq");
          }), Ae(de, z);
        };
        At(j, (de) => {
          v && de(me);
        });
      }
      Ae(E, R);
    };
    At(ce, (E) => {
      r()["title-card"] ? E(J) : E(ht, !1);
    });
  }
  var Ge = Xt(ce, 2);
  {
    var Ke = (E) => {
      var R = Ds(), j = Ie(R);
      ms(j, 20, () => r().cards, (me) => me, (me, de) => {
        {
          let z = /* @__PURE__ */ Kn(() => r()["clear-children"] || !1);
          Sn(me, {
            get hass() {
              return n();
            },
            get config() {
              return de;
            },
            get type() {
              return de.type;
            },
            get marginTop() {
              return r()["child-margin-top"];
            },
            get open() {
              return w(s);
            },
            get animationState() {
              return w(a);
            },
            get clearCardCss() {
              return w(z);
            }
          });
        }
      }), Te(j), Te(R), Me(() => Pe(j, `--expander-card-display:${r()["expander-card-display"] ?? ""};
                --gap:${(w(s) ? r()["expanded-gap"] : r().gap) ?? ""}; --child-padding:${(w(s) ? r()["child-padding"] : "0px") ?? ""};`)), Ae(E, R);
    };
    At(Ge, (E) => {
      r().cards && E(Ke);
    });
  }
  return Te(A), Me(() => {
    qe(A, 1, `expander-card${r().clear ? " clear" : ""}${w(s) ? " open" : " close"}`, "svelte-1jqiztq"), Pe(A, `--expander-card-display:${r()["expander-card-display"] ?? ""};
     --gap:${(w(s) ? r()["expanded-gap"] : r().gap) ?? ""}; --padding:${r().padding ?? ""};
     --expander-state:${w(s) ?? ""};
     --icon-rotate-degree:${r()["icon-rotate-degree"] ?? ""};
     --card-background:${(w(s) && r()["expander-card-background-expanded"] ? r()["expander-card-background-expanded"] : r()["expander-card-background"]) ?? ""}
    `);
  }), Ae(e, A), zn(X);
}
ls(["touchstart", "touchmove", "touchend", "click"]);
customElements.define("expander-card", Qr(zs, { hass: {}, config: {} }, [], [], !0, (e) => class extends e {
  constructor() {
    super(...arguments);
    // re-declare props used in customClass.
    M(this, "config");
  }
  setConfig(n = {}) {
    this.config = { ...An, ...n };
  }
}));
const Ys = "2.7.1";
console.info(
  `%c  Expander-Card 
%c Version ${Ys}`,
  "color: orange; font-weight: bold; background: black",
  "color: white; font-weight: bold; background: dimgray"
);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "expander-card",
  name: "Expander Card",
  preview: !0,
  description: "Expander card"
});
export {
  zs as default
};
//# sourceMappingURL=expander-card.js.map
