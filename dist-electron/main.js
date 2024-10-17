import Ct, { dialog as Ys, Notification as df, app as yn, BrowserWindow as zs, Menu as Jo } from "electron";
import { fileURLToPath as hf } from "node:url";
import at from "node:path";
import Xs from "events";
import Nr from "crypto";
import Ks from "tty";
import eo from "util";
import Nn from "os";
import dt from "fs";
import Pr from "stream";
import Xt from "url";
import pf from "string_decoder";
import mf from "constants";
import Js from "assert";
import ie from "path";
import Pn from "child_process";
import Qs from "zlib";
import gf from "http";
var Ue = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, ci = {}, de = {}, lt = {};
Object.defineProperty(lt, "__esModule", { value: !0 });
lt.CancellationError = lt.CancellationToken = void 0;
const Ef = Xs;
class yf extends Ef.EventEmitter {
  get cancelled() {
    return this._cancelled || this._parent != null && this._parent.cancelled;
  }
  set parent(t) {
    this.removeParentCancelHandler(), this._parent = t, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
  }
  // babel cannot compile ... correctly for super calls
  constructor(t) {
    super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, t != null && (this.parent = t);
  }
  cancel() {
    this._cancelled = !0, this.emit("cancel");
  }
  onCancel(t) {
    this.cancelled ? t() : this.once("cancel", t);
  }
  createPromise(t) {
    if (this.cancelled)
      return Promise.reject(new Ui());
    const r = () => {
      if (n != null)
        try {
          this.removeListener("cancel", n), n = null;
        } catch {
        }
    };
    let n = null;
    return new Promise((i, o) => {
      let a = null;
      if (n = () => {
        try {
          a != null && (a(), a = null);
        } finally {
          o(new Ui());
        }
      }, this.cancelled) {
        n();
        return;
      }
      this.onCancel(n), t(i, o, (s) => {
        a = s;
      });
    }).then((i) => (r(), i)).catch((i) => {
      throw r(), i;
    });
  }
  removeParentCancelHandler() {
    const t = this._parent;
    t != null && this.parentCancelHandler != null && (t.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
  }
  dispose() {
    try {
      this.removeParentCancelHandler();
    } finally {
      this.removeAllListeners(), this._parent = null;
    }
  }
}
lt.CancellationToken = yf;
class Ui extends Error {
  constructor() {
    super("cancelled");
  }
}
lt.CancellationError = Ui;
var Ae = {}, ki = { exports: {} }, en = { exports: {} }, ui, Qo;
function vf() {
  if (Qo) return ui;
  Qo = 1;
  var e = 1e3, t = e * 60, r = t * 60, n = r * 24, i = n * 7, o = n * 365.25;
  ui = function(f, c) {
    c = c || {};
    var h = typeof f;
    if (h === "string" && f.length > 0)
      return a(f);
    if (h === "number" && isFinite(f))
      return c.long ? l(f) : s(f);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(f)
    );
  };
  function a(f) {
    if (f = String(f), !(f.length > 100)) {
      var c = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        f
      );
      if (c) {
        var h = parseFloat(c[1]), p = (c[2] || "ms").toLowerCase();
        switch (p) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return h * o;
          case "weeks":
          case "week":
          case "w":
            return h * i;
          case "days":
          case "day":
          case "d":
            return h * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return h * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return h * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return h * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return h;
          default:
            return;
        }
      }
    }
  }
  function s(f) {
    var c = Math.abs(f);
    return c >= n ? Math.round(f / n) + "d" : c >= r ? Math.round(f / r) + "h" : c >= t ? Math.round(f / t) + "m" : c >= e ? Math.round(f / e) + "s" : f + "ms";
  }
  function l(f) {
    var c = Math.abs(f);
    return c >= n ? d(f, c, n, "day") : c >= r ? d(f, c, r, "hour") : c >= t ? d(f, c, t, "minute") : c >= e ? d(f, c, e, "second") : f + " ms";
  }
  function d(f, c, h, p) {
    var y = c >= h * 1.5;
    return Math.round(f / h) + " " + p + (y ? "s" : "");
  }
  return ui;
}
var fi, Zo;
function Zs() {
  if (Zo) return fi;
  Zo = 1;
  function e(t) {
    n.debug = n, n.default = n, n.coerce = d, n.disable = a, n.enable = o, n.enabled = s, n.humanize = vf(), n.destroy = f, Object.keys(t).forEach((c) => {
      n[c] = t[c];
    }), n.names = [], n.skips = [], n.formatters = {};
    function r(c) {
      let h = 0;
      for (let p = 0; p < c.length; p++)
        h = (h << 5) - h + c.charCodeAt(p), h |= 0;
      return n.colors[Math.abs(h) % n.colors.length];
    }
    n.selectColor = r;
    function n(c) {
      let h, p = null, y, A;
      function _(...S) {
        if (!_.enabled)
          return;
        const $ = _, x = Number(/* @__PURE__ */ new Date()), k = x - (h || x);
        $.diff = k, $.prev = h, $.curr = x, h = x, S[0] = n.coerce(S[0]), typeof S[0] != "string" && S.unshift("%O");
        let G = 0;
        S[0] = S[0].replace(/%([a-zA-Z%])/g, (I, F) => {
          if (I === "%%")
            return "%";
          G++;
          const E = n.formatters[F];
          if (typeof E == "function") {
            const M = S[G];
            I = E.call($, M), S.splice(G, 1), G--;
          }
          return I;
        }), n.formatArgs.call($, S), ($.log || n.log).apply($, S);
      }
      return _.namespace = c, _.useColors = n.useColors(), _.color = n.selectColor(c), _.extend = i, _.destroy = n.destroy, Object.defineProperty(_, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => p !== null ? p : (y !== n.namespaces && (y = n.namespaces, A = n.enabled(c)), A),
        set: (S) => {
          p = S;
        }
      }), typeof n.init == "function" && n.init(_), _;
    }
    function i(c, h) {
      const p = n(this.namespace + (typeof h > "u" ? ":" : h) + c);
      return p.log = this.log, p;
    }
    function o(c) {
      n.save(c), n.namespaces = c, n.names = [], n.skips = [];
      let h;
      const p = (typeof c == "string" ? c : "").split(/[\s,]+/), y = p.length;
      for (h = 0; h < y; h++)
        p[h] && (c = p[h].replace(/\*/g, ".*?"), c[0] === "-" ? n.skips.push(new RegExp("^" + c.slice(1) + "$")) : n.names.push(new RegExp("^" + c + "$")));
    }
    function a() {
      const c = [
        ...n.names.map(l),
        ...n.skips.map(l).map((h) => "-" + h)
      ].join(",");
      return n.enable(""), c;
    }
    function s(c) {
      if (c[c.length - 1] === "*")
        return !0;
      let h, p;
      for (h = 0, p = n.skips.length; h < p; h++)
        if (n.skips[h].test(c))
          return !1;
      for (h = 0, p = n.names.length; h < p; h++)
        if (n.names[h].test(c))
          return !0;
      return !1;
    }
    function l(c) {
      return c.toString().substring(2, c.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function d(c) {
      return c instanceof Error ? c.stack || c.message : c;
    }
    function f() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return n.enable(n.load()), n;
  }
  return fi = e, fi;
}
var ea;
function wf() {
  return ea || (ea = 1, function(e, t) {
    t.formatArgs = n, t.save = i, t.load = o, t.useColors = r, t.storage = a(), t.destroy = /* @__PURE__ */ (() => {
      let l = !1;
      return () => {
        l || (l = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function r() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let l;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (l = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(l[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function n(l) {
      if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const d = "color: " + this.color;
      l.splice(1, 0, d, "color: inherit");
      let f = 0, c = 0;
      l[0].replace(/%[a-zA-Z%]/g, (h) => {
        h !== "%%" && (f++, h === "%c" && (c = f));
      }), l.splice(c, 0, d);
    }
    t.log = console.debug || console.log || (() => {
    });
    function i(l) {
      try {
        l ? t.storage.setItem("debug", l) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function o() {
      let l;
      try {
        l = t.storage.getItem("debug");
      } catch {
      }
      return !l && typeof process < "u" && "env" in process && (l = process.env.DEBUG), l;
    }
    function a() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = Zs()(t);
    const { formatters: s } = e.exports;
    s.j = function(l) {
      try {
        return JSON.stringify(l);
      } catch (d) {
        return "[UnexpectedJSONParseError]: " + d.message;
      }
    };
  }(en, en.exports)), en.exports;
}
var tn = { exports: {} }, di, ta;
function _f() {
  return ta || (ta = 1, di = (e, t = process.argv) => {
    const r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = t.indexOf(r + e), i = t.indexOf("--");
    return n !== -1 && (i === -1 || n < i);
  }), di;
}
var hi, ra;
function Af() {
  if (ra) return hi;
  ra = 1;
  const e = Nn, t = Ks, r = _f(), { env: n } = process;
  let i;
  r("no-color") || r("no-colors") || r("color=false") || r("color=never") ? i = 0 : (r("color") || r("colors") || r("color=true") || r("color=always")) && (i = 1), "FORCE_COLOR" in n && (n.FORCE_COLOR === "true" ? i = 1 : n.FORCE_COLOR === "false" ? i = 0 : i = n.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(n.FORCE_COLOR, 10), 3));
  function o(l) {
    return l === 0 ? !1 : {
      level: l,
      hasBasic: !0,
      has256: l >= 2,
      has16m: l >= 3
    };
  }
  function a(l, d) {
    if (i === 0)
      return 0;
    if (r("color=16m") || r("color=full") || r("color=truecolor"))
      return 3;
    if (r("color=256"))
      return 2;
    if (l && !d && i === void 0)
      return 0;
    const f = i || 0;
    if (n.TERM === "dumb")
      return f;
    if (process.platform === "win32") {
      const c = e.release().split(".");
      return Number(c[0]) >= 10 && Number(c[2]) >= 10586 ? Number(c[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((c) => c in n) || n.CI_NAME === "codeship" ? 1 : f;
    if ("TEAMCITY_VERSION" in n)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(n.TEAMCITY_VERSION) ? 1 : 0;
    if (n.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in n) {
      const c = parseInt((n.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (n.TERM_PROGRAM) {
        case "iTerm.app":
          return c >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(n.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(n.TERM) || "COLORTERM" in n ? 1 : f;
  }
  function s(l) {
    const d = a(l, l && l.isTTY);
    return o(d);
  }
  return hi = {
    supportsColor: s,
    stdout: o(a(!0, t.isatty(1))),
    stderr: o(a(!0, t.isatty(2)))
  }, hi;
}
var na;
function Tf() {
  return na || (na = 1, function(e, t) {
    const r = Ks, n = eo;
    t.init = f, t.log = s, t.formatArgs = o, t.save = l, t.load = d, t.useColors = i, t.destroy = n.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const h = Af();
      h && (h.stderr || h).level >= 2 && (t.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    t.inspectOpts = Object.keys(process.env).filter((h) => /^debug_/i.test(h)).reduce((h, p) => {
      const y = p.substring(6).toLowerCase().replace(/_([a-z])/g, (_, S) => S.toUpperCase());
      let A = process.env[p];
      return /^(yes|on|true|enabled)$/i.test(A) ? A = !0 : /^(no|off|false|disabled)$/i.test(A) ? A = !1 : A === "null" ? A = null : A = Number(A), h[y] = A, h;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : r.isatty(process.stderr.fd);
    }
    function o(h) {
      const { namespace: p, useColors: y } = this;
      if (y) {
        const A = this.color, _ = "\x1B[3" + (A < 8 ? A : "8;5;" + A), S = `  ${_};1m${p} \x1B[0m`;
        h[0] = S + h[0].split(`
`).join(`
` + S), h.push(_ + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        h[0] = a() + p + " " + h[0];
    }
    function a() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function s(...h) {
      return process.stderr.write(n.formatWithOptions(t.inspectOpts, ...h) + `
`);
    }
    function l(h) {
      h ? process.env.DEBUG = h : delete process.env.DEBUG;
    }
    function d() {
      return process.env.DEBUG;
    }
    function f(h) {
      h.inspectOpts = {};
      const p = Object.keys(t.inspectOpts);
      for (let y = 0; y < p.length; y++)
        h.inspectOpts[p[y]] = t.inspectOpts[p[y]];
    }
    e.exports = Zs()(t);
    const { formatters: c } = e.exports;
    c.o = function(h) {
      return this.inspectOpts.colors = this.useColors, n.inspect(h, this.inspectOpts).split(`
`).map((p) => p.trim()).join(" ");
    }, c.O = function(h) {
      return this.inspectOpts.colors = this.useColors, n.inspect(h, this.inspectOpts);
    };
  }(tn, tn.exports)), tn.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? ki.exports = wf() : ki.exports = Tf();
var Sf = ki.exports, Kt = {};
Object.defineProperty(Kt, "__esModule", { value: !0 });
Kt.newError = Cf;
function Cf(e, t) {
  const r = new Error(e);
  return r.code = t, r;
}
var Dr = {};
Object.defineProperty(Dr, "__esModule", { value: !0 });
Dr.ProgressCallbackTransform = void 0;
const bf = Pr;
class $f extends bf.Transform {
  constructor(t, r, n) {
    super(), this.total = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.total * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.total,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, t(null);
  }
}
Dr.ProgressCallbackTransform = $f;
Object.defineProperty(Ae, "__esModule", { value: !0 });
Ae.DigestTransform = Ae.HttpExecutor = Ae.HttpError = void 0;
Ae.createHttpError = Mi;
Ae.parseJson = xf;
Ae.configureRequestOptionsFromUrl = tl;
Ae.configureRequestUrl = ro;
Ae.safeGetHeader = Ht;
Ae.configureRequestOptions = wn;
Ae.safeStringifyJson = _n;
const Of = Nr, If = Sf, Rf = dt, Nf = Pr, el = Xt, Pf = lt, ia = Kt, Df = Dr, ar = (0, If.default)("electron-builder");
function Mi(e, t = null) {
  return new to(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + _n(e.headers), t);
}
const Ff = /* @__PURE__ */ new Map([
  [429, "Too many requests"],
  [400, "Bad request"],
  [403, "Forbidden"],
  [404, "Not found"],
  [405, "Method not allowed"],
  [406, "Not acceptable"],
  [408, "Request timeout"],
  [413, "Request entity too large"],
  [500, "Internal server error"],
  [502, "Bad gateway"],
  [503, "Service unavailable"],
  [504, "Gateway timeout"],
  [505, "HTTP version not supported"]
]);
class to extends Error {
  constructor(t, r = `HTTP error: ${Ff.get(t) || t}`, n = null) {
    super(r), this.statusCode = t, this.description = n, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
Ae.HttpError = to;
function xf(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class vn {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, r = new Pf.CancellationToken(), n) {
    wn(t);
    const i = n == null ? void 0 : JSON.stringify(n), o = i ? Buffer.from(i) : void 0;
    if (o != null) {
      ar(i);
      const { headers: a, ...s } = t;
      t = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": o.length,
          ...a
        },
        ...s
      };
    }
    return this.doApiRequest(t, r, (a) => a.end(o));
  }
  doApiRequest(t, r, n, i = 0) {
    return ar.enabled && ar(`Request: ${_n(t)}`), r.createPromise((o, a, s) => {
      const l = this.createRequest(t, (d) => {
        try {
          this.handleResponse(d, t, r, o, a, i, n);
        } catch (f) {
          a(f);
        }
      });
      this.addErrorAndTimeoutHandlers(l, a, t.timeout), this.addRedirectHandlers(l, t, a, i, (d) => {
        this.doApiRequest(d, r, n, i).then(o).catch(a);
      }), n(l, a), s(() => l.abort());
    });
  }
  // noinspection JSUnusedLocalSymbols
  // eslint-disable-next-line
  addRedirectHandlers(t, r, n, i, o) {
  }
  addErrorAndTimeoutHandlers(t, r, n = 60 * 1e3) {
    this.addTimeOutHandler(t, r, n), t.on("error", r), t.on("aborted", () => {
      r(new Error("Request has been aborted by the server"));
    });
  }
  handleResponse(t, r, n, i, o, a, s) {
    var l;
    if (ar.enabled && ar(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${_n(r)}`), t.statusCode === 404) {
      o(Mi(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const d = (l = t.statusCode) !== null && l !== void 0 ? l : 0, f = d >= 300 && d < 400, c = Ht(t, "location");
    if (f && c != null) {
      if (a > this.maxRedirects) {
        o(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(vn.prepareRedirectUrlOptions(c, r), n, s, a).then(i).catch(o);
      return;
    }
    t.setEncoding("utf8");
    let h = "";
    t.on("error", o), t.on("data", (p) => h += p), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const p = Ht(t, "content-type"), y = p != null && (Array.isArray(p) ? p.find((A) => A.includes("json")) != null : p.includes("json"));
          o(Mi(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

          Data:
          ${y ? JSON.stringify(JSON.parse(h)) : h}
          `));
        } else
          i(h.length === 0 ? null : h);
      } catch (p) {
        o(p);
      }
    });
  }
  async downloadToBuffer(t, r) {
    return await r.cancellationToken.createPromise((n, i, o) => {
      const a = [], s = {
        headers: r.headers || void 0,
        // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
        redirect: "manual"
      };
      ro(t, s), wn(s), this.doDownload(s, {
        destination: null,
        options: r,
        onCancel: o,
        callback: (l) => {
          l == null ? n(Buffer.concat(a)) : i(l);
        },
        responseHandler: (l, d) => {
          let f = 0;
          l.on("data", (c) => {
            if (f += c.length, f > 524288e3) {
              d(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            a.push(c);
          }), l.on("end", () => {
            d(null);
          });
        }
      }, 0);
    });
  }
  doDownload(t, r, n) {
    const i = this.createRequest(t, (o) => {
      if (o.statusCode >= 400) {
        r.callback(new Error(`Cannot download "${t.protocol || "https:"}//${t.hostname}${t.path}", status ${o.statusCode}: ${o.statusMessage}`));
        return;
      }
      o.on("error", r.callback);
      const a = Ht(o, "location");
      if (a != null) {
        n < this.maxRedirects ? this.doDownload(vn.prepareRedirectUrlOptions(a, t), r, n++) : r.callback(this.createMaxRedirectError());
        return;
      }
      r.responseHandler == null ? Uf(r, o) : r.responseHandler(o, r.callback);
    });
    this.addErrorAndTimeoutHandlers(i, r.callback, t.timeout), this.addRedirectHandlers(i, t, r.callback, n, (o) => {
      this.doDownload(o, r, n++);
    }), i.end();
  }
  createMaxRedirectError() {
    return new Error(`Too many redirects (> ${this.maxRedirects})`);
  }
  addTimeOutHandler(t, r, n) {
    t.on("socket", (i) => {
      i.setTimeout(n, () => {
        t.abort(), r(new Error("Request timed out"));
      });
    });
  }
  static prepareRedirectUrlOptions(t, r) {
    const n = tl(t, { ...r }), i = n.headers;
    if (i != null && i.authorization) {
      const o = new el.URL(t);
      (o.hostname.endsWith(".amazonaws.com") || o.searchParams.has("X-Amz-Credential")) && delete i.authorization;
    }
    return n;
  }
  static retryOnServerError(t, r = 3) {
    for (let n = 0; ; n++)
      try {
        return t();
      } catch (i) {
        if (n < r && (i instanceof to && i.isServerError() || i.code === "EPIPE"))
          continue;
        throw i;
      }
  }
}
Ae.HttpExecutor = vn;
function tl(e, t) {
  const r = wn(t);
  return ro(new el.URL(e), r), r;
}
function ro(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class Bi extends Nf.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, r = "sha512", n = "base64") {
    super(), this.expected = t, this.algorithm = r, this.encoding = n, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, Of.createHash)(r);
  }
  // noinspection JSUnusedGlobalSymbols
  _transform(t, r, n) {
    this.digester.update(t), n(null, t);
  }
  // noinspection JSUnusedGlobalSymbols
  _flush(t) {
    if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
      try {
        this.validate();
      } catch (r) {
        t(r);
        return;
      }
    t(null);
  }
  validate() {
    if (this._actual == null)
      throw (0, ia.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, ia.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
Ae.DigestTransform = Bi;
function Lf(e, t, r) {
  return e != null && t != null && e !== t ? (r(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function Ht(e, t) {
  const r = e.headers[t];
  return r == null ? null : Array.isArray(r) ? r.length === 0 ? null : r[r.length - 1] : r;
}
function Uf(e, t) {
  if (!Lf(Ht(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const r = [];
  if (e.options.onProgress != null) {
    const a = Ht(t, "content-length");
    a != null && r.push(new Df.ProgressCallbackTransform(parseInt(a, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const n = e.options.sha512;
  n != null ? r.push(new Bi(n, "sha512", n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && r.push(new Bi(e.options.sha2, "sha256", "hex"));
  const i = (0, Rf.createWriteStream)(e.destination);
  r.push(i);
  let o = t;
  for (const a of r)
    a.on("error", (s) => {
      i.close(), e.options.cancellationToken.cancelled || e.callback(s);
    }), o = o.pipe(a);
  i.on("finish", () => {
    i.close(e.callback);
  });
}
function wn(e, t, r) {
  r != null && (e.method = r), e.headers = { ...e.headers };
  const n = e.headers;
  return t != null && (n.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), n["User-Agent"] == null && (n["User-Agent"] = "electron-builder"), (r == null || r === "GET" || n["Cache-Control"] == null) && (n["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function _n(e, t) {
  return JSON.stringify(e, (r, n) => r.endsWith("Authorization") || r.endsWith("authorization") || r.endsWith("Password") || r.endsWith("PASSWORD") || r.endsWith("Token") || r.includes("password") || r.includes("token") || t != null && t.has(r) ? "<stripped sensitive data>" : n, 2);
}
var Dn = {};
Object.defineProperty(Dn, "__esModule", { value: !0 });
Dn.githubUrl = kf;
Dn.getS3LikeProviderBaseUrl = Mf;
function kf(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function Mf(e) {
  const t = e.provider;
  if (t === "s3")
    return Bf(e);
  if (t === "spaces")
    return jf(e);
  throw new Error(`Not supported provider: ${t}`);
}
function Bf(e) {
  let t;
  if (e.accelerate == !0)
    t = `https://${e.bucket}.s3-accelerate.amazonaws.com`;
  else if (e.endpoint != null)
    t = `${e.endpoint}/${e.bucket}`;
  else if (e.bucket.includes(".")) {
    if (e.region == null)
      throw new Error(`Bucket name "${e.bucket}" includes a dot, but S3 region is missing`);
    e.region === "us-east-1" ? t = `https://s3.amazonaws.com/${e.bucket}` : t = `https://s3-${e.region}.amazonaws.com/${e.bucket}`;
  } else e.region === "cn-north-1" ? t = `https://${e.bucket}.s3.${e.region}.amazonaws.com.cn` : t = `https://${e.bucket}.s3.amazonaws.com`;
  return rl(t, e.path);
}
function rl(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function jf(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return rl(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var no = {};
Object.defineProperty(no, "__esModule", { value: !0 });
no.parseDn = Hf;
function Hf(e) {
  let t = !1, r = null, n = "", i = 0;
  e = e.trim();
  const o = /* @__PURE__ */ new Map();
  for (let a = 0; a <= e.length; a++) {
    if (a === e.length) {
      r !== null && o.set(r, n);
      break;
    }
    const s = e[a];
    if (t) {
      if (s === '"') {
        t = !1;
        continue;
      }
    } else {
      if (s === '"') {
        t = !0;
        continue;
      }
      if (s === "\\") {
        a++;
        const l = parseInt(e.slice(a, a + 2), 16);
        Number.isNaN(l) ? n += e[a] : (a++, n += String.fromCharCode(l));
        continue;
      }
      if (r === null && s === "=") {
        r = n, n = "";
        continue;
      }
      if (s === "," || s === ";" || s === "+") {
        r !== null && o.set(r, n), r = null, n = "";
        continue;
      }
    }
    if (s === " " && !t) {
      if (n.length === 0)
        continue;
      if (a > i) {
        let l = a;
        for (; e[l] === " "; )
          l++;
        i = l;
      }
      if (i >= e.length || e[i] === "," || e[i] === ";" || r === null && e[i] === "=" || r !== null && e[i] === "+") {
        a = i - 1;
        continue;
      }
    }
    n += s;
  }
  return o;
}
var Gt = {};
Object.defineProperty(Gt, "__esModule", { value: !0 });
Gt.nil = Gt.UUID = void 0;
const nl = Nr, il = Kt, qf = "options.name must be either a string or a Buffer", oa = (0, nl.randomBytes)(16);
oa[0] = oa[0] | 1;
const pn = {}, J = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  pn[t] = e, J[e] = t;
}
class bt {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const r = bt.check(t);
    if (!r)
      throw new Error("not a UUID");
    this.version = r.version, r.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, r) {
    return Gf(t, "sha1", 80, r);
  }
  toString() {
    return this.ascii == null && (this.ascii = Vf(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, r = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (pn[t[14] + t[15]] & 240) >> 4,
        variant: aa((pn[t[19] + t[20]] & 224) >> 5),
        format: "ascii"
      } : !1;
    if (Buffer.isBuffer(t)) {
      if (t.length < r + 16)
        return !1;
      let n = 0;
      for (; n < 16 && t[r + n] === 0; n++)
        ;
      return n === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
        version: (t[r + 6] & 240) >> 4,
        variant: aa((t[r + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, il.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const r = Buffer.allocUnsafe(16);
    let n = 0;
    for (let i = 0; i < 16; i++)
      r[i] = pn[t[n++] + t[n++]], (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
    return r;
  }
}
Gt.UUID = bt;
bt.OID = bt.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function aa(e) {
  switch (e) {
    case 0:
    case 1:
    case 3:
      return "ncs";
    case 4:
    case 5:
      return "rfc4122";
    case 6:
      return "microsoft";
    default:
      return "future";
  }
}
var yr;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(yr || (yr = {}));
function Gf(e, t, r, n, i = yr.ASCII) {
  const o = (0, nl.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, il.newError)(qf, "ERR_INVALID_UUID_NAME");
  o.update(n), o.update(e);
  const s = o.digest();
  let l;
  switch (i) {
    case yr.BINARY:
      s[6] = s[6] & 15 | r, s[8] = s[8] & 63 | 128, l = s;
      break;
    case yr.OBJECT:
      s[6] = s[6] & 15 | r, s[8] = s[8] & 63 | 128, l = new bt(s);
      break;
    default:
      l = J[s[0]] + J[s[1]] + J[s[2]] + J[s[3]] + "-" + J[s[4]] + J[s[5]] + "-" + J[s[6] & 15 | r] + J[s[7]] + "-" + J[s[8] & 63 | 128] + J[s[9]] + "-" + J[s[10]] + J[s[11]] + J[s[12]] + J[s[13]] + J[s[14]] + J[s[15]];
      break;
  }
  return l;
}
function Vf(e) {
  return J[e[0]] + J[e[1]] + J[e[2]] + J[e[3]] + "-" + J[e[4]] + J[e[5]] + "-" + J[e[6]] + J[e[7]] + "-" + J[e[8]] + J[e[9]] + "-" + J[e[10]] + J[e[11]] + J[e[12]] + J[e[13]] + J[e[14]] + J[e[15]];
}
Gt.nil = new bt("00000000-0000-0000-0000-000000000000");
var Fr = {}, ol = {};
(function(e) {
  (function(t) {
    t.parser = function(m, u) {
      return new n(m, u);
    }, t.SAXParser = n, t.SAXStream = f, t.createStream = d, t.MAX_BUFFER_LENGTH = 64 * 1024;
    var r = [
      "comment",
      "sgmlDecl",
      "textNode",
      "tagName",
      "doctype",
      "procInstName",
      "procInstBody",
      "entity",
      "attribName",
      "attribValue",
      "cdata",
      "script"
    ];
    t.EVENTS = [
      "text",
      "processinginstruction",
      "sgmldeclaration",
      "doctype",
      "comment",
      "opentagstart",
      "attribute",
      "opentag",
      "closetag",
      "opencdata",
      "cdata",
      "closecdata",
      "error",
      "end",
      "ready",
      "script",
      "opennamespace",
      "closenamespace"
    ];
    function n(m, u) {
      if (!(this instanceof n))
        return new n(m, u);
      var O = this;
      o(O), O.q = O.c = "", O.bufferCheckPosition = t.MAX_BUFFER_LENGTH, O.opt = u || {}, O.opt.lowercase = O.opt.lowercase || O.opt.lowercasetags, O.looseCase = O.opt.lowercase ? "toLowerCase" : "toUpperCase", O.tags = [], O.closed = O.closedRoot = O.sawRoot = !1, O.tag = O.error = null, O.strict = !!m, O.noscript = !!(m || O.opt.noscript), O.state = E.BEGIN, O.strictEntities = O.opt.strictEntities, O.ENTITIES = O.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), O.attribList = [], O.opt.xmlns && (O.ns = Object.create(A)), O.opt.unquotedAttributeValues === void 0 && (O.opt.unquotedAttributeValues = !m), O.trackPosition = O.opt.position !== !1, O.trackPosition && (O.position = O.line = O.column = 0), B(O, "onready");
    }
    Object.create || (Object.create = function(m) {
      function u() {
      }
      u.prototype = m;
      var O = new u();
      return O;
    }), Object.keys || (Object.keys = function(m) {
      var u = [];
      for (var O in m) m.hasOwnProperty(O) && u.push(O);
      return u;
    });
    function i(m) {
      for (var u = Math.max(t.MAX_BUFFER_LENGTH, 10), O = 0, w = 0, Q = r.length; w < Q; w++) {
        var te = m[r[w]].length;
        if (te > u)
          switch (r[w]) {
            case "textNode":
              Y(m);
              break;
            case "cdata":
              H(m, "oncdata", m.cdata), m.cdata = "";
              break;
            case "script":
              H(m, "onscript", m.script), m.script = "";
              break;
            default:
              C(m, "Max buffer length exceeded: " + r[w]);
          }
        O = Math.max(O, te);
      }
      var oe = t.MAX_BUFFER_LENGTH - O;
      m.bufferCheckPosition = oe + m.position;
    }
    function o(m) {
      for (var u = 0, O = r.length; u < O; u++)
        m[r[u]] = "";
    }
    function a(m) {
      Y(m), m.cdata !== "" && (H(m, "oncdata", m.cdata), m.cdata = ""), m.script !== "" && (H(m, "onscript", m.script), m.script = "");
    }
    n.prototype = {
      end: function() {
        P(this);
      },
      write: je,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        a(this);
      }
    };
    var s;
    try {
      s = require("stream").Stream;
    } catch {
      s = function() {
      };
    }
    s || (s = function() {
    });
    var l = t.EVENTS.filter(function(m) {
      return m !== "error" && m !== "end";
    });
    function d(m, u) {
      return new f(m, u);
    }
    function f(m, u) {
      if (!(this instanceof f))
        return new f(m, u);
      s.apply(this), this._parser = new n(m, u), this.writable = !0, this.readable = !0;
      var O = this;
      this._parser.onend = function() {
        O.emit("end");
      }, this._parser.onerror = function(w) {
        O.emit("error", w), O._parser.error = null;
      }, this._decoder = null, l.forEach(function(w) {
        Object.defineProperty(O, "on" + w, {
          get: function() {
            return O._parser["on" + w];
          },
          set: function(Q) {
            if (!Q)
              return O.removeAllListeners(w), O._parser["on" + w] = Q, Q;
            O.on(w, Q);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    f.prototype = Object.create(s.prototype, {
      constructor: {
        value: f
      }
    }), f.prototype.write = function(m) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(m)) {
        if (!this._decoder) {
          var u = pf.StringDecoder;
          this._decoder = new u("utf8");
        }
        m = this._decoder.write(m);
      }
      return this._parser.write(m.toString()), this.emit("data", m), !0;
    }, f.prototype.end = function(m) {
      return m && m.length && this.write(m), this._parser.end(), !0;
    }, f.prototype.on = function(m, u) {
      var O = this;
      return !O._parser["on" + m] && l.indexOf(m) !== -1 && (O._parser["on" + m] = function() {
        var w = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        w.splice(0, 0, m), O.emit.apply(O, w);
      }), s.prototype.on.call(O, m, u);
    };
    var c = "[CDATA[", h = "DOCTYPE", p = "http://www.w3.org/XML/1998/namespace", y = "http://www.w3.org/2000/xmlns/", A = { xml: p, xmlns: y }, _ = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, S = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, $ = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, x = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function k(m) {
      return m === " " || m === `
` || m === "\r" || m === "	";
    }
    function G(m) {
      return m === '"' || m === "'";
    }
    function T(m) {
      return m === ">" || k(m);
    }
    function I(m, u) {
      return m.test(u);
    }
    function F(m, u) {
      return !I(m, u);
    }
    var E = 0;
    t.STATE = {
      BEGIN: E++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: E++,
      // leading whitespace
      TEXT: E++,
      // general stuff
      TEXT_ENTITY: E++,
      // &amp and such.
      OPEN_WAKA: E++,
      // <
      SGML_DECL: E++,
      // <!BLARG
      SGML_DECL_QUOTED: E++,
      // <!BLARG foo "bar
      DOCTYPE: E++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: E++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: E++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: E++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: E++,
      // <!-
      COMMENT: E++,
      // <!--
      COMMENT_ENDING: E++,
      // <!-- blah -
      COMMENT_ENDED: E++,
      // <!-- blah --
      CDATA: E++,
      // <![CDATA[ something
      CDATA_ENDING: E++,
      // ]
      CDATA_ENDING_2: E++,
      // ]]
      PROC_INST: E++,
      // <?hi
      PROC_INST_BODY: E++,
      // <?hi there
      PROC_INST_ENDING: E++,
      // <?hi "there" ?
      OPEN_TAG: E++,
      // <strong
      OPEN_TAG_SLASH: E++,
      // <strong /
      ATTRIB: E++,
      // <a
      ATTRIB_NAME: E++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: E++,
      // <a foo _
      ATTRIB_VALUE: E++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: E++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: E++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: E++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: E++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: E++,
      // <foo bar=&quot
      CLOSE_TAG: E++,
      // </a
      CLOSE_TAG_SAW_WHITE: E++,
      // </a   >
      SCRIPT: E++,
      // <script> ...
      SCRIPT_ENDING: E++
      // <script> ... <
    }, t.XML_ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'"
    }, t.ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'",
      AElig: 198,
      Aacute: 193,
      Acirc: 194,
      Agrave: 192,
      Aring: 197,
      Atilde: 195,
      Auml: 196,
      Ccedil: 199,
      ETH: 208,
      Eacute: 201,
      Ecirc: 202,
      Egrave: 200,
      Euml: 203,
      Iacute: 205,
      Icirc: 206,
      Igrave: 204,
      Iuml: 207,
      Ntilde: 209,
      Oacute: 211,
      Ocirc: 212,
      Ograve: 210,
      Oslash: 216,
      Otilde: 213,
      Ouml: 214,
      THORN: 222,
      Uacute: 218,
      Ucirc: 219,
      Ugrave: 217,
      Uuml: 220,
      Yacute: 221,
      aacute: 225,
      acirc: 226,
      aelig: 230,
      agrave: 224,
      aring: 229,
      atilde: 227,
      auml: 228,
      ccedil: 231,
      eacute: 233,
      ecirc: 234,
      egrave: 232,
      eth: 240,
      euml: 235,
      iacute: 237,
      icirc: 238,
      igrave: 236,
      iuml: 239,
      ntilde: 241,
      oacute: 243,
      ocirc: 244,
      ograve: 242,
      oslash: 248,
      otilde: 245,
      ouml: 246,
      szlig: 223,
      thorn: 254,
      uacute: 250,
      ucirc: 251,
      ugrave: 249,
      uuml: 252,
      yacute: 253,
      yuml: 255,
      copy: 169,
      reg: 174,
      nbsp: 160,
      iexcl: 161,
      cent: 162,
      pound: 163,
      curren: 164,
      yen: 165,
      brvbar: 166,
      sect: 167,
      uml: 168,
      ordf: 170,
      laquo: 171,
      not: 172,
      shy: 173,
      macr: 175,
      deg: 176,
      plusmn: 177,
      sup1: 185,
      sup2: 178,
      sup3: 179,
      acute: 180,
      micro: 181,
      para: 182,
      middot: 183,
      cedil: 184,
      ordm: 186,
      raquo: 187,
      frac14: 188,
      frac12: 189,
      frac34: 190,
      iquest: 191,
      times: 215,
      divide: 247,
      OElig: 338,
      oelig: 339,
      Scaron: 352,
      scaron: 353,
      Yuml: 376,
      fnof: 402,
      circ: 710,
      tilde: 732,
      Alpha: 913,
      Beta: 914,
      Gamma: 915,
      Delta: 916,
      Epsilon: 917,
      Zeta: 918,
      Eta: 919,
      Theta: 920,
      Iota: 921,
      Kappa: 922,
      Lambda: 923,
      Mu: 924,
      Nu: 925,
      Xi: 926,
      Omicron: 927,
      Pi: 928,
      Rho: 929,
      Sigma: 931,
      Tau: 932,
      Upsilon: 933,
      Phi: 934,
      Chi: 935,
      Psi: 936,
      Omega: 937,
      alpha: 945,
      beta: 946,
      gamma: 947,
      delta: 948,
      epsilon: 949,
      zeta: 950,
      eta: 951,
      theta: 952,
      iota: 953,
      kappa: 954,
      lambda: 955,
      mu: 956,
      nu: 957,
      xi: 958,
      omicron: 959,
      pi: 960,
      rho: 961,
      sigmaf: 962,
      sigma: 963,
      tau: 964,
      upsilon: 965,
      phi: 966,
      chi: 967,
      psi: 968,
      omega: 969,
      thetasym: 977,
      upsih: 978,
      piv: 982,
      ensp: 8194,
      emsp: 8195,
      thinsp: 8201,
      zwnj: 8204,
      zwj: 8205,
      lrm: 8206,
      rlm: 8207,
      ndash: 8211,
      mdash: 8212,
      lsquo: 8216,
      rsquo: 8217,
      sbquo: 8218,
      ldquo: 8220,
      rdquo: 8221,
      bdquo: 8222,
      dagger: 8224,
      Dagger: 8225,
      bull: 8226,
      hellip: 8230,
      permil: 8240,
      prime: 8242,
      Prime: 8243,
      lsaquo: 8249,
      rsaquo: 8250,
      oline: 8254,
      frasl: 8260,
      euro: 8364,
      image: 8465,
      weierp: 8472,
      real: 8476,
      trade: 8482,
      alefsym: 8501,
      larr: 8592,
      uarr: 8593,
      rarr: 8594,
      darr: 8595,
      harr: 8596,
      crarr: 8629,
      lArr: 8656,
      uArr: 8657,
      rArr: 8658,
      dArr: 8659,
      hArr: 8660,
      forall: 8704,
      part: 8706,
      exist: 8707,
      empty: 8709,
      nabla: 8711,
      isin: 8712,
      notin: 8713,
      ni: 8715,
      prod: 8719,
      sum: 8721,
      minus: 8722,
      lowast: 8727,
      radic: 8730,
      prop: 8733,
      infin: 8734,
      ang: 8736,
      and: 8743,
      or: 8744,
      cap: 8745,
      cup: 8746,
      int: 8747,
      there4: 8756,
      sim: 8764,
      cong: 8773,
      asymp: 8776,
      ne: 8800,
      equiv: 8801,
      le: 8804,
      ge: 8805,
      sub: 8834,
      sup: 8835,
      nsub: 8836,
      sube: 8838,
      supe: 8839,
      oplus: 8853,
      otimes: 8855,
      perp: 8869,
      sdot: 8901,
      lceil: 8968,
      rceil: 8969,
      lfloor: 8970,
      rfloor: 8971,
      lang: 9001,
      rang: 9002,
      loz: 9674,
      spades: 9824,
      clubs: 9827,
      hearts: 9829,
      diams: 9830
    }, Object.keys(t.ENTITIES).forEach(function(m) {
      var u = t.ENTITIES[m], O = typeof u == "number" ? String.fromCharCode(u) : u;
      t.ENTITIES[m] = O;
    });
    for (var M in t.STATE)
      t.STATE[t.STATE[M]] = M;
    E = t.STATE;
    function B(m, u, O) {
      m[u] && m[u](O);
    }
    function H(m, u, O) {
      m.textNode && Y(m), B(m, u, O);
    }
    function Y(m) {
      m.textNode = N(m.opt, m.textNode), m.textNode && B(m, "ontext", m.textNode), m.textNode = "";
    }
    function N(m, u) {
      return m.trim && (u = u.trim()), m.normalize && (u = u.replace(/\s+/g, " ")), u;
    }
    function C(m, u) {
      return Y(m), m.trackPosition && (u += `
Line: ` + m.line + `
Column: ` + m.column + `
Char: ` + m.c), u = new Error(u), m.error = u, B(m, "onerror", u), m;
    }
    function P(m) {
      return m.sawRoot && !m.closedRoot && b(m, "Unclosed root tag"), m.state !== E.BEGIN && m.state !== E.BEGIN_WHITESPACE && m.state !== E.TEXT && C(m, "Unexpected end"), Y(m), m.c = "", m.closed = !0, B(m, "onend"), n.call(m, m.strict, m.opt), m;
    }
    function b(m, u) {
      if (typeof m != "object" || !(m instanceof n))
        throw new Error("bad call to strictFail");
      m.strict && C(m, u);
    }
    function L(m) {
      m.strict || (m.tagName = m.tagName[m.looseCase]());
      var u = m.tags[m.tags.length - 1] || m, O = m.tag = { name: m.tagName, attributes: {} };
      m.opt.xmlns && (O.ns = u.ns), m.attribList.length = 0, H(m, "onopentagstart", O);
    }
    function D(m, u) {
      var O = m.indexOf(":"), w = O < 0 ? ["", m] : m.split(":"), Q = w[0], te = w[1];
      return u && m === "xmlns" && (Q = "xmlns", te = ""), { prefix: Q, local: te };
    }
    function q(m) {
      if (m.strict || (m.attribName = m.attribName[m.looseCase]()), m.attribList.indexOf(m.attribName) !== -1 || m.tag.attributes.hasOwnProperty(m.attribName)) {
        m.attribName = m.attribValue = "";
        return;
      }
      if (m.opt.xmlns) {
        var u = D(m.attribName, !0), O = u.prefix, w = u.local;
        if (O === "xmlns")
          if (w === "xml" && m.attribValue !== p)
            b(
              m,
              "xml: prefix must be bound to " + p + `
Actual: ` + m.attribValue
            );
          else if (w === "xmlns" && m.attribValue !== y)
            b(
              m,
              "xmlns: prefix must be bound to " + y + `
Actual: ` + m.attribValue
            );
          else {
            var Q = m.tag, te = m.tags[m.tags.length - 1] || m;
            Q.ns === te.ns && (Q.ns = Object.create(te.ns)), Q.ns[w] = m.attribValue;
          }
        m.attribList.push([m.attribName, m.attribValue]);
      } else
        m.tag.attributes[m.attribName] = m.attribValue, H(m, "onattribute", {
          name: m.attribName,
          value: m.attribValue
        });
      m.attribName = m.attribValue = "";
    }
    function z(m, u) {
      if (m.opt.xmlns) {
        var O = m.tag, w = D(m.tagName);
        O.prefix = w.prefix, O.local = w.local, O.uri = O.ns[w.prefix] || "", O.prefix && !O.uri && (b(m, "Unbound namespace prefix: " + JSON.stringify(m.tagName)), O.uri = w.prefix);
        var Q = m.tags[m.tags.length - 1] || m;
        O.ns && Q.ns !== O.ns && Object.keys(O.ns).forEach(function(Vr) {
          H(m, "onopennamespace", {
            prefix: Vr,
            uri: O.ns[Vr]
          });
        });
        for (var te = 0, oe = m.attribList.length; te < oe; te++) {
          var pe = m.attribList[te], ye = pe[0], Je = pe[1], le = D(ye, !0), Fe = le.prefix, ti = le.local, Gr = Fe === "" ? "" : O.ns[Fe] || "", tr = {
            name: ye,
            value: Je,
            prefix: Fe,
            local: ti,
            uri: Gr
          };
          Fe && Fe !== "xmlns" && !Gr && (b(m, "Unbound namespace prefix: " + JSON.stringify(Fe)), tr.uri = Fe), m.tag.attributes[ye] = tr, H(m, "onattribute", tr);
        }
        m.attribList.length = 0;
      }
      m.tag.isSelfClosing = !!u, m.sawRoot = !0, m.tags.push(m.tag), H(m, "onopentag", m.tag), u || (!m.noscript && m.tagName.toLowerCase() === "script" ? m.state = E.SCRIPT : m.state = E.TEXT, m.tag = null, m.tagName = ""), m.attribName = m.attribValue = "", m.attribList.length = 0;
    }
    function W(m) {
      if (!m.tagName) {
        b(m, "Weird empty close tag."), m.textNode += "</>", m.state = E.TEXT;
        return;
      }
      if (m.script) {
        if (m.tagName !== "script") {
          m.script += "</" + m.tagName + ">", m.tagName = "", m.state = E.SCRIPT;
          return;
        }
        H(m, "onscript", m.script), m.script = "";
      }
      var u = m.tags.length, O = m.tagName;
      m.strict || (O = O[m.looseCase]());
      for (var w = O; u--; ) {
        var Q = m.tags[u];
        if (Q.name !== w)
          b(m, "Unexpected close tag");
        else
          break;
      }
      if (u < 0) {
        b(m, "Unmatched closing tag: " + m.tagName), m.textNode += "</" + m.tagName + ">", m.state = E.TEXT;
        return;
      }
      m.tagName = O;
      for (var te = m.tags.length; te-- > u; ) {
        var oe = m.tag = m.tags.pop();
        m.tagName = m.tag.name, H(m, "onclosetag", m.tagName);
        var pe = {};
        for (var ye in oe.ns)
          pe[ye] = oe.ns[ye];
        var Je = m.tags[m.tags.length - 1] || m;
        m.opt.xmlns && oe.ns !== Je.ns && Object.keys(oe.ns).forEach(function(le) {
          var Fe = oe.ns[le];
          H(m, "onclosenamespace", { prefix: le, uri: Fe });
        });
      }
      u === 0 && (m.closedRoot = !0), m.tagName = m.attribValue = m.attribName = "", m.attribList.length = 0, m.state = E.TEXT;
    }
    function K(m) {
      var u = m.entity, O = u.toLowerCase(), w, Q = "";
      return m.ENTITIES[u] ? m.ENTITIES[u] : m.ENTITIES[O] ? m.ENTITIES[O] : (u = O, u.charAt(0) === "#" && (u.charAt(1) === "x" ? (u = u.slice(2), w = parseInt(u, 16), Q = w.toString(16)) : (u = u.slice(1), w = parseInt(u, 10), Q = w.toString(10))), u = u.replace(/^0+/, ""), isNaN(w) || Q.toLowerCase() !== u ? (b(m, "Invalid character entity"), "&" + m.entity + ";") : String.fromCodePoint(w));
    }
    function ce(m, u) {
      u === "<" ? (m.state = E.OPEN_WAKA, m.startTagPosition = m.position) : k(u) || (b(m, "Non-whitespace before first tag."), m.textNode = u, m.state = E.TEXT);
    }
    function V(m, u) {
      var O = "";
      return u < m.length && (O = m.charAt(u)), O;
    }
    function je(m) {
      var u = this;
      if (this.error)
        throw this.error;
      if (u.closed)
        return C(
          u,
          "Cannot write after close. Assign an onready handler."
        );
      if (m === null)
        return P(u);
      typeof m == "object" && (m = m.toString());
      for (var O = 0, w = ""; w = V(m, O++), u.c = w, !!w; )
        switch (u.trackPosition && (u.position++, w === `
` ? (u.line++, u.column = 0) : u.column++), u.state) {
          case E.BEGIN:
            if (u.state = E.BEGIN_WHITESPACE, w === "\uFEFF")
              continue;
            ce(u, w);
            continue;
          case E.BEGIN_WHITESPACE:
            ce(u, w);
            continue;
          case E.TEXT:
            if (u.sawRoot && !u.closedRoot) {
              for (var Q = O - 1; w && w !== "<" && w !== "&"; )
                w = V(m, O++), w && u.trackPosition && (u.position++, w === `
` ? (u.line++, u.column = 0) : u.column++);
              u.textNode += m.substring(Q, O - 1);
            }
            w === "<" && !(u.sawRoot && u.closedRoot && !u.strict) ? (u.state = E.OPEN_WAKA, u.startTagPosition = u.position) : (!k(w) && (!u.sawRoot || u.closedRoot) && b(u, "Text data outside of root node."), w === "&" ? u.state = E.TEXT_ENTITY : u.textNode += w);
            continue;
          case E.SCRIPT:
            w === "<" ? u.state = E.SCRIPT_ENDING : u.script += w;
            continue;
          case E.SCRIPT_ENDING:
            w === "/" ? u.state = E.CLOSE_TAG : (u.script += "<" + w, u.state = E.SCRIPT);
            continue;
          case E.OPEN_WAKA:
            if (w === "!")
              u.state = E.SGML_DECL, u.sgmlDecl = "";
            else if (!k(w)) if (I(_, w))
              u.state = E.OPEN_TAG, u.tagName = w;
            else if (w === "/")
              u.state = E.CLOSE_TAG, u.tagName = "";
            else if (w === "?")
              u.state = E.PROC_INST, u.procInstName = u.procInstBody = "";
            else {
              if (b(u, "Unencoded <"), u.startTagPosition + 1 < u.position) {
                var te = u.position - u.startTagPosition;
                w = new Array(te).join(" ") + w;
              }
              u.textNode += "<" + w, u.state = E.TEXT;
            }
            continue;
          case E.SGML_DECL:
            if (u.sgmlDecl + w === "--") {
              u.state = E.COMMENT, u.comment = "", u.sgmlDecl = "";
              continue;
            }
            u.doctype && u.doctype !== !0 && u.sgmlDecl ? (u.state = E.DOCTYPE_DTD, u.doctype += "<!" + u.sgmlDecl + w, u.sgmlDecl = "") : (u.sgmlDecl + w).toUpperCase() === c ? (H(u, "onopencdata"), u.state = E.CDATA, u.sgmlDecl = "", u.cdata = "") : (u.sgmlDecl + w).toUpperCase() === h ? (u.state = E.DOCTYPE, (u.doctype || u.sawRoot) && b(
              u,
              "Inappropriately located doctype declaration"
            ), u.doctype = "", u.sgmlDecl = "") : w === ">" ? (H(u, "onsgmldeclaration", u.sgmlDecl), u.sgmlDecl = "", u.state = E.TEXT) : (G(w) && (u.state = E.SGML_DECL_QUOTED), u.sgmlDecl += w);
            continue;
          case E.SGML_DECL_QUOTED:
            w === u.q && (u.state = E.SGML_DECL, u.q = ""), u.sgmlDecl += w;
            continue;
          case E.DOCTYPE:
            w === ">" ? (u.state = E.TEXT, H(u, "ondoctype", u.doctype), u.doctype = !0) : (u.doctype += w, w === "[" ? u.state = E.DOCTYPE_DTD : G(w) && (u.state = E.DOCTYPE_QUOTED, u.q = w));
            continue;
          case E.DOCTYPE_QUOTED:
            u.doctype += w, w === u.q && (u.q = "", u.state = E.DOCTYPE);
            continue;
          case E.DOCTYPE_DTD:
            w === "]" ? (u.doctype += w, u.state = E.DOCTYPE) : w === "<" ? (u.state = E.OPEN_WAKA, u.startTagPosition = u.position) : G(w) ? (u.doctype += w, u.state = E.DOCTYPE_DTD_QUOTED, u.q = w) : u.doctype += w;
            continue;
          case E.DOCTYPE_DTD_QUOTED:
            u.doctype += w, w === u.q && (u.state = E.DOCTYPE_DTD, u.q = "");
            continue;
          case E.COMMENT:
            w === "-" ? u.state = E.COMMENT_ENDING : u.comment += w;
            continue;
          case E.COMMENT_ENDING:
            w === "-" ? (u.state = E.COMMENT_ENDED, u.comment = N(u.opt, u.comment), u.comment && H(u, "oncomment", u.comment), u.comment = "") : (u.comment += "-" + w, u.state = E.COMMENT);
            continue;
          case E.COMMENT_ENDED:
            w !== ">" ? (b(u, "Malformed comment"), u.comment += "--" + w, u.state = E.COMMENT) : u.doctype && u.doctype !== !0 ? u.state = E.DOCTYPE_DTD : u.state = E.TEXT;
            continue;
          case E.CDATA:
            w === "]" ? u.state = E.CDATA_ENDING : u.cdata += w;
            continue;
          case E.CDATA_ENDING:
            w === "]" ? u.state = E.CDATA_ENDING_2 : (u.cdata += "]" + w, u.state = E.CDATA);
            continue;
          case E.CDATA_ENDING_2:
            w === ">" ? (u.cdata && H(u, "oncdata", u.cdata), H(u, "onclosecdata"), u.cdata = "", u.state = E.TEXT) : w === "]" ? u.cdata += "]" : (u.cdata += "]]" + w, u.state = E.CDATA);
            continue;
          case E.PROC_INST:
            w === "?" ? u.state = E.PROC_INST_ENDING : k(w) ? u.state = E.PROC_INST_BODY : u.procInstName += w;
            continue;
          case E.PROC_INST_BODY:
            if (!u.procInstBody && k(w))
              continue;
            w === "?" ? u.state = E.PROC_INST_ENDING : u.procInstBody += w;
            continue;
          case E.PROC_INST_ENDING:
            w === ">" ? (H(u, "onprocessinginstruction", {
              name: u.procInstName,
              body: u.procInstBody
            }), u.procInstName = u.procInstBody = "", u.state = E.TEXT) : (u.procInstBody += "?" + w, u.state = E.PROC_INST_BODY);
            continue;
          case E.OPEN_TAG:
            I(S, w) ? u.tagName += w : (L(u), w === ">" ? z(u) : w === "/" ? u.state = E.OPEN_TAG_SLASH : (k(w) || b(u, "Invalid character in tag name"), u.state = E.ATTRIB));
            continue;
          case E.OPEN_TAG_SLASH:
            w === ">" ? (z(u, !0), W(u)) : (b(u, "Forward-slash in opening tag not followed by >"), u.state = E.ATTRIB);
            continue;
          case E.ATTRIB:
            if (k(w))
              continue;
            w === ">" ? z(u) : w === "/" ? u.state = E.OPEN_TAG_SLASH : I(_, w) ? (u.attribName = w, u.attribValue = "", u.state = E.ATTRIB_NAME) : b(u, "Invalid attribute name");
            continue;
          case E.ATTRIB_NAME:
            w === "=" ? u.state = E.ATTRIB_VALUE : w === ">" ? (b(u, "Attribute without value"), u.attribValue = u.attribName, q(u), z(u)) : k(w) ? u.state = E.ATTRIB_NAME_SAW_WHITE : I(S, w) ? u.attribName += w : b(u, "Invalid attribute name");
            continue;
          case E.ATTRIB_NAME_SAW_WHITE:
            if (w === "=")
              u.state = E.ATTRIB_VALUE;
            else {
              if (k(w))
                continue;
              b(u, "Attribute without value"), u.tag.attributes[u.attribName] = "", u.attribValue = "", H(u, "onattribute", {
                name: u.attribName,
                value: ""
              }), u.attribName = "", w === ">" ? z(u) : I(_, w) ? (u.attribName = w, u.state = E.ATTRIB_NAME) : (b(u, "Invalid attribute name"), u.state = E.ATTRIB);
            }
            continue;
          case E.ATTRIB_VALUE:
            if (k(w))
              continue;
            G(w) ? (u.q = w, u.state = E.ATTRIB_VALUE_QUOTED) : (u.opt.unquotedAttributeValues || C(u, "Unquoted attribute value"), u.state = E.ATTRIB_VALUE_UNQUOTED, u.attribValue = w);
            continue;
          case E.ATTRIB_VALUE_QUOTED:
            if (w !== u.q) {
              w === "&" ? u.state = E.ATTRIB_VALUE_ENTITY_Q : u.attribValue += w;
              continue;
            }
            q(u), u.q = "", u.state = E.ATTRIB_VALUE_CLOSED;
            continue;
          case E.ATTRIB_VALUE_CLOSED:
            k(w) ? u.state = E.ATTRIB : w === ">" ? z(u) : w === "/" ? u.state = E.OPEN_TAG_SLASH : I(_, w) ? (b(u, "No whitespace between attributes"), u.attribName = w, u.attribValue = "", u.state = E.ATTRIB_NAME) : b(u, "Invalid attribute name");
            continue;
          case E.ATTRIB_VALUE_UNQUOTED:
            if (!T(w)) {
              w === "&" ? u.state = E.ATTRIB_VALUE_ENTITY_U : u.attribValue += w;
              continue;
            }
            q(u), w === ">" ? z(u) : u.state = E.ATTRIB;
            continue;
          case E.CLOSE_TAG:
            if (u.tagName)
              w === ">" ? W(u) : I(S, w) ? u.tagName += w : u.script ? (u.script += "</" + u.tagName, u.tagName = "", u.state = E.SCRIPT) : (k(w) || b(u, "Invalid tagname in closing tag"), u.state = E.CLOSE_TAG_SAW_WHITE);
            else {
              if (k(w))
                continue;
              F(_, w) ? u.script ? (u.script += "</" + w, u.state = E.SCRIPT) : b(u, "Invalid tagname in closing tag.") : u.tagName = w;
            }
            continue;
          case E.CLOSE_TAG_SAW_WHITE:
            if (k(w))
              continue;
            w === ">" ? W(u) : b(u, "Invalid characters in closing tag");
            continue;
          case E.TEXT_ENTITY:
          case E.ATTRIB_VALUE_ENTITY_Q:
          case E.ATTRIB_VALUE_ENTITY_U:
            var oe, pe;
            switch (u.state) {
              case E.TEXT_ENTITY:
                oe = E.TEXT, pe = "textNode";
                break;
              case E.ATTRIB_VALUE_ENTITY_Q:
                oe = E.ATTRIB_VALUE_QUOTED, pe = "attribValue";
                break;
              case E.ATTRIB_VALUE_ENTITY_U:
                oe = E.ATTRIB_VALUE_UNQUOTED, pe = "attribValue";
                break;
            }
            if (w === ";") {
              var ye = K(u);
              u.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(ye) ? (u.entity = "", u.state = oe, u.write(ye)) : (u[pe] += ye, u.entity = "", u.state = oe);
            } else I(u.entity.length ? x : $, w) ? u.entity += w : (b(u, "Invalid character in entity name"), u[pe] += "&" + u.entity + w, u.entity = "", u.state = oe);
            continue;
          default:
            throw new Error(u, "Unknown state: " + u.state);
        }
      return u.position >= u.bufferCheckPosition && i(u), u;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var m = String.fromCharCode, u = Math.floor, O = function() {
        var w = 16384, Q = [], te, oe, pe = -1, ye = arguments.length;
        if (!ye)
          return "";
        for (var Je = ""; ++pe < ye; ) {
          var le = Number(arguments[pe]);
          if (!isFinite(le) || // `NaN`, `+Infinity`, or `-Infinity`
          le < 0 || // not a valid Unicode code point
          le > 1114111 || // not a valid Unicode code point
          u(le) !== le)
            throw RangeError("Invalid code point: " + le);
          le <= 65535 ? Q.push(le) : (le -= 65536, te = (le >> 10) + 55296, oe = le % 1024 + 56320, Q.push(te, oe)), (pe + 1 === ye || Q.length > w) && (Je += m.apply(null, Q), Q.length = 0);
        }
        return Je;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: O,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = O;
    }();
  })(e);
})(ol);
Object.defineProperty(Fr, "__esModule", { value: !0 });
Fr.XElement = void 0;
Fr.parseXml = Xf;
const Wf = ol, rn = Kt;
class al {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, rn.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!zf(t))
      throw (0, rn.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const r = this.attributes === null ? null : this.attributes[t];
    if (r == null)
      throw (0, rn.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return r;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, r = !1, n = null) {
    const i = this.elementOrNull(t, r);
    if (i === null)
      throw (0, rn.newError)(n || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, r = !1) {
    if (this.elements === null)
      return null;
    for (const n of this.elements)
      if (sa(n, t, r))
        return n;
    return null;
  }
  getElements(t, r = !1) {
    return this.elements === null ? [] : this.elements.filter((n) => sa(n, t, r));
  }
  elementValueOrEmpty(t, r = !1) {
    const n = this.elementOrNull(t, r);
    return n === null ? "" : n.value;
  }
}
Fr.XElement = al;
const Yf = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function zf(e) {
  return Yf.test(e);
}
function sa(e, t, r) {
  const n = e.name;
  return n === t || r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase();
}
function Xf(e) {
  let t = null;
  const r = Wf.parser(!0, {}), n = [];
  return r.onopentag = (i) => {
    const o = new al(i.name);
    if (o.attributes = i.attributes, t === null)
      t = o;
    else {
      const a = n[n.length - 1];
      a.elements == null && (a.elements = []), a.elements.push(o);
    }
    n.push(o);
  }, r.onclosetag = () => {
    n.pop();
  }, r.ontext = (i) => {
    n.length > 0 && (n[n.length - 1].value = i);
  }, r.oncdata = (i) => {
    const o = n[n.length - 1];
    o.value = i, o.isCData = !0;
  }, r.onerror = (i) => {
    throw i;
  }, r.write(e), t;
}
var Fn = {};
Object.defineProperty(Fn, "__esModule", { value: !0 });
Fn.MemoLazy = void 0;
class Kf {
  constructor(t, r) {
    this.selector = t, this.creator = r, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && sl(this.selected, t))
      return this._value;
    this.selected = t;
    const r = this.creator(t);
    return this.value = r, r;
  }
  set value(t) {
    this._value = t;
  }
}
Fn.MemoLazy = Kf;
function sl(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), o = Object.keys(t);
    return i.length === o.length && i.every((a) => sl(e[a], t[a]));
  }
  return e === t;
}
var io = {};
Object.defineProperty(io, "__esModule", { value: !0 });
io.retry = ll;
const Jf = lt;
async function ll(e, t, r, n = 0, i = 0, o) {
  var a;
  const s = new Jf.CancellationToken();
  try {
    return await e();
  } catch (l) {
    if ((!((a = o == null ? void 0 : o(l)) !== null && a !== void 0) || a) && t > 0 && !s.cancelled)
      return await new Promise((d) => setTimeout(d, r + n * i)), await ll(e, t - 1, r, n, i + 1, o);
    throw l;
  }
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.retry = e.MemoLazy = e.newError = e.XElement = e.parseXml = e.ProgressCallbackTransform = e.UUID = e.parseDn = e.githubUrl = e.getS3LikeProviderBaseUrl = e.configureRequestUrl = e.parseJson = e.safeStringifyJson = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.safeGetHeader = e.DigestTransform = e.HttpExecutor = e.createHttpError = e.HttpError = e.CancellationError = e.CancellationToken = void 0, e.asArray = c;
  var t = lt;
  Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } }), Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } });
  var r = Ae;
  Object.defineProperty(e, "HttpError", { enumerable: !0, get: function() {
    return r.HttpError;
  } }), Object.defineProperty(e, "createHttpError", { enumerable: !0, get: function() {
    return r.createHttpError;
  } }), Object.defineProperty(e, "HttpExecutor", { enumerable: !0, get: function() {
    return r.HttpExecutor;
  } }), Object.defineProperty(e, "DigestTransform", { enumerable: !0, get: function() {
    return r.DigestTransform;
  } }), Object.defineProperty(e, "safeGetHeader", { enumerable: !0, get: function() {
    return r.safeGetHeader;
  } }), Object.defineProperty(e, "configureRequestOptions", { enumerable: !0, get: function() {
    return r.configureRequestOptions;
  } }), Object.defineProperty(e, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
    return r.configureRequestOptionsFromUrl;
  } }), Object.defineProperty(e, "safeStringifyJson", { enumerable: !0, get: function() {
    return r.safeStringifyJson;
  } }), Object.defineProperty(e, "parseJson", { enumerable: !0, get: function() {
    return r.parseJson;
  } }), Object.defineProperty(e, "configureRequestUrl", { enumerable: !0, get: function() {
    return r.configureRequestUrl;
  } });
  var n = Dn;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return n.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return n.githubUrl;
  } });
  var i = no;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return i.parseDn;
  } });
  var o = Gt;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return o.UUID;
  } });
  var a = Dr;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return a.ProgressCallbackTransform;
  } });
  var s = Fr;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return s.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return s.XElement;
  } });
  var l = Kt;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return l.newError;
  } });
  var d = Fn;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return d.MemoLazy;
  } });
  var f = io;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return f.retry;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
  function c(h) {
    return h == null ? [] : Array.isArray(h) ? h : [h];
  }
})(de);
var $t = {}, Se = {};
Se.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((r, n) => {
        t.push((i, o) => i != null ? n(i) : r(o)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
Se.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const r = t[t.length - 1];
    if (typeof r != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((n) => r(null, n), r);
  }, "name", { value: e.name });
};
var tt = mf, Qf = process.cwd, mn = null, Zf = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return mn || (mn = Qf.call(process)), mn;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var la = process.chdir;
  process.chdir = function(e) {
    mn = null, la.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, la);
}
var ed = td;
function td(e) {
  tt.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || r(e), e.chown = o(e.chown), e.fchown = o(e.fchown), e.lchown = o(e.lchown), e.chmod = n(e.chmod), e.fchmod = n(e.fchmod), e.lchmod = n(e.lchmod), e.chownSync = a(e.chownSync), e.fchownSync = a(e.fchownSync), e.lchownSync = a(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = s(e.stat), e.fstat = s(e.fstat), e.lstat = s(e.lstat), e.statSync = l(e.statSync), e.fstatSync = l(e.fstatSync), e.lstatSync = l(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(f, c, h) {
    h && process.nextTick(h);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(f, c, h, p) {
    p && process.nextTick(p);
  }, e.lchownSync = function() {
  }), Zf === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(f) {
    function c(h, p, y) {
      var A = Date.now(), _ = 0;
      f(h, p, function S($) {
        if ($ && ($.code === "EACCES" || $.code === "EPERM" || $.code === "EBUSY") && Date.now() - A < 6e4) {
          setTimeout(function() {
            e.stat(p, function(x, k) {
              x && x.code === "ENOENT" ? f(h, p, S) : y($);
            });
          }, _), _ < 100 && (_ += 10);
          return;
        }
        y && y($);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(c, f), c;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(f) {
    function c(h, p, y, A, _, S) {
      var $;
      if (S && typeof S == "function") {
        var x = 0;
        $ = function(k, G, T) {
          if (k && k.code === "EAGAIN" && x < 10)
            return x++, f.call(e, h, p, y, A, _, $);
          S.apply(this, arguments);
        };
      }
      return f.call(e, h, p, y, A, _, $);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(c, f), c;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(f) {
    return function(c, h, p, y, A) {
      for (var _ = 0; ; )
        try {
          return f.call(e, c, h, p, y, A);
        } catch (S) {
          if (S.code === "EAGAIN" && _ < 10) {
            _++;
            continue;
          }
          throw S;
        }
    };
  }(e.readSync);
  function t(f) {
    f.lchmod = function(c, h, p) {
      f.open(
        c,
        tt.O_WRONLY | tt.O_SYMLINK,
        h,
        function(y, A) {
          if (y) {
            p && p(y);
            return;
          }
          f.fchmod(A, h, function(_) {
            f.close(A, function(S) {
              p && p(_ || S);
            });
          });
        }
      );
    }, f.lchmodSync = function(c, h) {
      var p = f.openSync(c, tt.O_WRONLY | tt.O_SYMLINK, h), y = !0, A;
      try {
        A = f.fchmodSync(p, h), y = !1;
      } finally {
        if (y)
          try {
            f.closeSync(p);
          } catch {
          }
        else
          f.closeSync(p);
      }
      return A;
    };
  }
  function r(f) {
    tt.hasOwnProperty("O_SYMLINK") && f.futimes ? (f.lutimes = function(c, h, p, y) {
      f.open(c, tt.O_SYMLINK, function(A, _) {
        if (A) {
          y && y(A);
          return;
        }
        f.futimes(_, h, p, function(S) {
          f.close(_, function($) {
            y && y(S || $);
          });
        });
      });
    }, f.lutimesSync = function(c, h, p) {
      var y = f.openSync(c, tt.O_SYMLINK), A, _ = !0;
      try {
        A = f.futimesSync(y, h, p), _ = !1;
      } finally {
        if (_)
          try {
            f.closeSync(y);
          } catch {
          }
        else
          f.closeSync(y);
      }
      return A;
    }) : f.futimes && (f.lutimes = function(c, h, p, y) {
      y && process.nextTick(y);
    }, f.lutimesSync = function() {
    });
  }
  function n(f) {
    return f && function(c, h, p) {
      return f.call(e, c, h, function(y) {
        d(y) && (y = null), p && p.apply(this, arguments);
      });
    };
  }
  function i(f) {
    return f && function(c, h) {
      try {
        return f.call(e, c, h);
      } catch (p) {
        if (!d(p)) throw p;
      }
    };
  }
  function o(f) {
    return f && function(c, h, p, y) {
      return f.call(e, c, h, p, function(A) {
        d(A) && (A = null), y && y.apply(this, arguments);
      });
    };
  }
  function a(f) {
    return f && function(c, h, p) {
      try {
        return f.call(e, c, h, p);
      } catch (y) {
        if (!d(y)) throw y;
      }
    };
  }
  function s(f) {
    return f && function(c, h, p) {
      typeof h == "function" && (p = h, h = null);
      function y(A, _) {
        _ && (_.uid < 0 && (_.uid += 4294967296), _.gid < 0 && (_.gid += 4294967296)), p && p.apply(this, arguments);
      }
      return h ? f.call(e, c, h, y) : f.call(e, c, y);
    };
  }
  function l(f) {
    return f && function(c, h) {
      var p = h ? f.call(e, c, h) : f.call(e, c);
      return p && (p.uid < 0 && (p.uid += 4294967296), p.gid < 0 && (p.gid += 4294967296)), p;
    };
  }
  function d(f) {
    if (!f || f.code === "ENOSYS")
      return !0;
    var c = !process.getuid || process.getuid() !== 0;
    return !!(c && (f.code === "EINVAL" || f.code === "EPERM"));
  }
}
var ca = Pr.Stream, rd = nd;
function nd(e) {
  return {
    ReadStream: t,
    WriteStream: r
  };
  function t(n, i) {
    if (!(this instanceof t)) return new t(n, i);
    ca.call(this);
    var o = this;
    this.path = n, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var a = Object.keys(i), s = 0, l = a.length; s < l; s++) {
      var d = a[s];
      this[d] = i[d];
    }
    if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0)
        this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end)
        throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        o._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(f, c) {
      if (f) {
        o.emit("error", f), o.readable = !1;
        return;
      }
      o.fd = c, o.emit("open", c), o._read();
    });
  }
  function r(n, i) {
    if (!(this instanceof r)) return new r(n, i);
    ca.call(this), this.path = n, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var o = Object.keys(i), a = 0, s = o.length; a < s; a++) {
      var l = o[a];
      this[l] = i[l];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var id = ad, od = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function ad(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: od(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(r) {
    Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
  }), t;
}
var ne = dt, sd = ed, ld = rd, cd = id, nn = eo, ge, An;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (ge = Symbol.for("graceful-fs.queue"), An = Symbol.for("graceful-fs.previous")) : (ge = "___graceful-fs.queue", An = "___graceful-fs.previous");
function ud() {
}
function cl(e, t) {
  Object.defineProperty(e, ge, {
    get: function() {
      return t;
    }
  });
}
var Tt = ud;
nn.debuglog ? Tt = nn.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (Tt = function() {
  var e = nn.format.apply(nn, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!ne[ge]) {
  var fd = Ue[ge] || [];
  cl(ne, fd), ne.close = function(e) {
    function t(r, n) {
      return e.call(ne, r, function(i) {
        i || ua(), typeof n == "function" && n.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, An, {
      value: e
    }), t;
  }(ne.close), ne.closeSync = function(e) {
    function t(r) {
      e.apply(ne, arguments), ua();
    }
    return Object.defineProperty(t, An, {
      value: e
    }), t;
  }(ne.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    Tt(ne[ge]), Js.equal(ne[ge].length, 0);
  });
}
Ue[ge] || cl(Ue, ne[ge]);
var Ce = oo(cd(ne));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !ne.__patched && (Ce = oo(ne), ne.__patched = !0);
function oo(e) {
  sd(e), e.gracefulify = oo, e.createReadStream = G, e.createWriteStream = T;
  var t = e.readFile;
  e.readFile = r;
  function r(E, M, B) {
    return typeof M == "function" && (B = M, M = null), H(E, M, B);
    function H(Y, N, C, P) {
      return t(Y, N, function(b) {
        b && (b.code === "EMFILE" || b.code === "ENFILE") ? Nt([H, [Y, N, C], b, P || Date.now(), Date.now()]) : typeof C == "function" && C.apply(this, arguments);
      });
    }
  }
  var n = e.writeFile;
  e.writeFile = i;
  function i(E, M, B, H) {
    return typeof B == "function" && (H = B, B = null), Y(E, M, B, H);
    function Y(N, C, P, b, L) {
      return n(N, C, P, function(D) {
        D && (D.code === "EMFILE" || D.code === "ENFILE") ? Nt([Y, [N, C, P, b], D, L || Date.now(), Date.now()]) : typeof b == "function" && b.apply(this, arguments);
      });
    }
  }
  var o = e.appendFile;
  o && (e.appendFile = a);
  function a(E, M, B, H) {
    return typeof B == "function" && (H = B, B = null), Y(E, M, B, H);
    function Y(N, C, P, b, L) {
      return o(N, C, P, function(D) {
        D && (D.code === "EMFILE" || D.code === "ENFILE") ? Nt([Y, [N, C, P, b], D, L || Date.now(), Date.now()]) : typeof b == "function" && b.apply(this, arguments);
      });
    }
  }
  var s = e.copyFile;
  s && (e.copyFile = l);
  function l(E, M, B, H) {
    return typeof B == "function" && (H = B, B = 0), Y(E, M, B, H);
    function Y(N, C, P, b, L) {
      return s(N, C, P, function(D) {
        D && (D.code === "EMFILE" || D.code === "ENFILE") ? Nt([Y, [N, C, P, b], D, L || Date.now(), Date.now()]) : typeof b == "function" && b.apply(this, arguments);
      });
    }
  }
  var d = e.readdir;
  e.readdir = c;
  var f = /^v[0-5]\./;
  function c(E, M, B) {
    typeof M == "function" && (B = M, M = null);
    var H = f.test(process.version) ? function(C, P, b, L) {
      return d(C, Y(
        C,
        P,
        b,
        L
      ));
    } : function(C, P, b, L) {
      return d(C, P, Y(
        C,
        P,
        b,
        L
      ));
    };
    return H(E, M, B);
    function Y(N, C, P, b) {
      return function(L, D) {
        L && (L.code === "EMFILE" || L.code === "ENFILE") ? Nt([
          H,
          [N, C, P],
          L,
          b || Date.now(),
          Date.now()
        ]) : (D && D.sort && D.sort(), typeof P == "function" && P.call(this, L, D));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var h = ld(e);
    S = h.ReadStream, x = h.WriteStream;
  }
  var p = e.ReadStream;
  p && (S.prototype = Object.create(p.prototype), S.prototype.open = $);
  var y = e.WriteStream;
  y && (x.prototype = Object.create(y.prototype), x.prototype.open = k), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return S;
    },
    set: function(E) {
      S = E;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return x;
    },
    set: function(E) {
      x = E;
    },
    enumerable: !0,
    configurable: !0
  });
  var A = S;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return A;
    },
    set: function(E) {
      A = E;
    },
    enumerable: !0,
    configurable: !0
  });
  var _ = x;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return _;
    },
    set: function(E) {
      _ = E;
    },
    enumerable: !0,
    configurable: !0
  });
  function S(E, M) {
    return this instanceof S ? (p.apply(this, arguments), this) : S.apply(Object.create(S.prototype), arguments);
  }
  function $() {
    var E = this;
    F(E.path, E.flags, E.mode, function(M, B) {
      M ? (E.autoClose && E.destroy(), E.emit("error", M)) : (E.fd = B, E.emit("open", B), E.read());
    });
  }
  function x(E, M) {
    return this instanceof x ? (y.apply(this, arguments), this) : x.apply(Object.create(x.prototype), arguments);
  }
  function k() {
    var E = this;
    F(E.path, E.flags, E.mode, function(M, B) {
      M ? (E.destroy(), E.emit("error", M)) : (E.fd = B, E.emit("open", B));
    });
  }
  function G(E, M) {
    return new e.ReadStream(E, M);
  }
  function T(E, M) {
    return new e.WriteStream(E, M);
  }
  var I = e.open;
  e.open = F;
  function F(E, M, B, H) {
    return typeof B == "function" && (H = B, B = null), Y(E, M, B, H);
    function Y(N, C, P, b, L) {
      return I(N, C, P, function(D, q) {
        D && (D.code === "EMFILE" || D.code === "ENFILE") ? Nt([Y, [N, C, P, b], D, L || Date.now(), Date.now()]) : typeof b == "function" && b.apply(this, arguments);
      });
    }
  }
  return e;
}
function Nt(e) {
  Tt("ENQUEUE", e[0].name, e[1]), ne[ge].push(e), ao();
}
var on;
function ua() {
  for (var e = Date.now(), t = 0; t < ne[ge].length; ++t)
    ne[ge][t].length > 2 && (ne[ge][t][3] = e, ne[ge][t][4] = e);
  ao();
}
function ao() {
  if (clearTimeout(on), on = void 0, ne[ge].length !== 0) {
    var e = ne[ge].shift(), t = e[0], r = e[1], n = e[2], i = e[3], o = e[4];
    if (i === void 0)
      Tt("RETRY", t.name, r), t.apply(null, r);
    else if (Date.now() - i >= 6e4) {
      Tt("TIMEOUT", t.name, r);
      var a = r.pop();
      typeof a == "function" && a.call(null, n);
    } else {
      var s = Date.now() - o, l = Math.max(o - i, 1), d = Math.min(l * 1.2, 100);
      s >= d ? (Tt("RETRY", t.name, r), t.apply(null, r.concat([i]))) : ne[ge].push(e);
    }
    on === void 0 && (on = setTimeout(ao, 0));
  }
}
(function(e) {
  const t = Se.fromCallback, r = Ce, n = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((i) => typeof r[i] == "function");
  Object.assign(e, r), n.forEach((i) => {
    e[i] = t(r[i]);
  }), e.exists = function(i, o) {
    return typeof o == "function" ? r.exists(i, o) : new Promise((a) => r.exists(i, a));
  }, e.read = function(i, o, a, s, l, d) {
    return typeof d == "function" ? r.read(i, o, a, s, l, d) : new Promise((f, c) => {
      r.read(i, o, a, s, l, (h, p, y) => {
        if (h) return c(h);
        f({ bytesRead: p, buffer: y });
      });
    });
  }, e.write = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.write(i, o, ...a) : new Promise((s, l) => {
      r.write(i, o, ...a, (d, f, c) => {
        if (d) return l(d);
        s({ bytesWritten: f, buffer: c });
      });
    });
  }, typeof r.writev == "function" && (e.writev = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.writev(i, o, ...a) : new Promise((s, l) => {
      r.writev(i, o, ...a, (d, f, c) => {
        if (d) return l(d);
        s({ bytesWritten: f, buffers: c });
      });
    });
  }), typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})($t);
var so = {}, ul = {};
const dd = ie;
ul.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(dd.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const fl = $t, { checkPath: dl } = ul, hl = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
so.makeDir = async (e, t) => (dl(e), fl.mkdir(e, {
  mode: hl(t),
  recursive: !0
}));
so.makeDirSync = (e, t) => (dl(e), fl.mkdirSync(e, {
  mode: hl(t),
  recursive: !0
}));
const hd = Se.fromPromise, { makeDir: pd, makeDirSync: pi } = so, mi = hd(pd);
var Ve = {
  mkdirs: mi,
  mkdirsSync: pi,
  // alias
  mkdirp: mi,
  mkdirpSync: pi,
  ensureDir: mi,
  ensureDirSync: pi
};
const md = Se.fromPromise, pl = $t;
function gd(e) {
  return pl.access(e).then(() => !0).catch(() => !1);
}
var Ot = {
  pathExists: md(gd),
  pathExistsSync: pl.existsSync
};
const qt = Ce;
function Ed(e, t, r, n) {
  qt.open(e, "r+", (i, o) => {
    if (i) return n(i);
    qt.futimes(o, t, r, (a) => {
      qt.close(o, (s) => {
        n && n(a || s);
      });
    });
  });
}
function yd(e, t, r) {
  const n = qt.openSync(e, "r+");
  return qt.futimesSync(n, t, r), qt.closeSync(n);
}
var ml = {
  utimesMillis: Ed,
  utimesMillisSync: yd
};
const Vt = $t, fe = ie, vd = eo;
function wd(e, t, r) {
  const n = r.dereference ? (i) => Vt.stat(i, { bigint: !0 }) : (i) => Vt.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
}
function _d(e, t, r) {
  let n;
  const i = r.dereference ? (a) => Vt.statSync(a, { bigint: !0 }) : (a) => Vt.lstatSync(a, { bigint: !0 }), o = i(e);
  try {
    n = i(t);
  } catch (a) {
    if (a.code === "ENOENT") return { srcStat: o, destStat: null };
    throw a;
  }
  return { srcStat: o, destStat: n };
}
function Ad(e, t, r, n, i) {
  vd.callbackify(wd)(e, t, n, (o, a) => {
    if (o) return i(o);
    const { srcStat: s, destStat: l } = a;
    if (l) {
      if (xr(s, l)) {
        const d = fe.basename(e), f = fe.basename(t);
        return r === "move" && d !== f && d.toLowerCase() === f.toLowerCase() ? i(null, { srcStat: s, destStat: l, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (s.isDirectory() && !l.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!s.isDirectory() && l.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return s.isDirectory() && lo(e, t) ? i(new Error(xn(e, t, r))) : i(null, { srcStat: s, destStat: l });
  });
}
function Td(e, t, r, n) {
  const { srcStat: i, destStat: o } = _d(e, t, n);
  if (o) {
    if (xr(i, o)) {
      const a = fe.basename(e), s = fe.basename(t);
      if (r === "move" && a !== s && a.toLowerCase() === s.toLowerCase())
        return { srcStat: i, destStat: o, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !o.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && o.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && lo(e, t))
    throw new Error(xn(e, t, r));
  return { srcStat: i, destStat: o };
}
function gl(e, t, r, n, i) {
  const o = fe.resolve(fe.dirname(e)), a = fe.resolve(fe.dirname(r));
  if (a === o || a === fe.parse(a).root) return i();
  Vt.stat(a, { bigint: !0 }, (s, l) => s ? s.code === "ENOENT" ? i() : i(s) : xr(t, l) ? i(new Error(xn(e, r, n))) : gl(e, t, a, n, i));
}
function El(e, t, r, n) {
  const i = fe.resolve(fe.dirname(e)), o = fe.resolve(fe.dirname(r));
  if (o === i || o === fe.parse(o).root) return;
  let a;
  try {
    a = Vt.statSync(o, { bigint: !0 });
  } catch (s) {
    if (s.code === "ENOENT") return;
    throw s;
  }
  if (xr(t, a))
    throw new Error(xn(e, r, n));
  return El(e, t, o, n);
}
function xr(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function lo(e, t) {
  const r = fe.resolve(e).split(fe.sep).filter((i) => i), n = fe.resolve(t).split(fe.sep).filter((i) => i);
  return r.reduce((i, o, a) => i && n[a] === o, !0);
}
function xn(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var Jt = {
  checkPaths: Ad,
  checkPathsSync: Td,
  checkParentPaths: gl,
  checkParentPathsSync: El,
  isSrcSubdir: lo,
  areIdentical: xr
};
const Oe = Ce, Ar = ie, Sd = Ve.mkdirs, Cd = Ot.pathExists, bd = ml.utimesMillis, Tr = Jt;
function $d(e, t, r, n) {
  typeof r == "function" && !n ? (n = r, r = {}) : typeof r == "function" && (r = { filter: r }), n = n || function() {
  }, r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), Tr.checkPaths(e, t, "copy", r, (i, o) => {
    if (i) return n(i);
    const { srcStat: a, destStat: s } = o;
    Tr.checkParentPaths(e, a, t, "copy", (l) => l ? n(l) : r.filter ? yl(fa, s, e, t, r, n) : fa(s, e, t, r, n));
  });
}
function fa(e, t, r, n, i) {
  const o = Ar.dirname(r);
  Cd(o, (a, s) => {
    if (a) return i(a);
    if (s) return Tn(e, t, r, n, i);
    Sd(o, (l) => l ? i(l) : Tn(e, t, r, n, i));
  });
}
function yl(e, t, r, n, i, o) {
  Promise.resolve(i.filter(r, n)).then((a) => a ? e(t, r, n, i, o) : o(), (a) => o(a));
}
function Od(e, t, r, n, i) {
  return n.filter ? yl(Tn, e, t, r, n, i) : Tn(e, t, r, n, i);
}
function Tn(e, t, r, n, i) {
  (n.dereference ? Oe.stat : Oe.lstat)(t, (a, s) => a ? i(a) : s.isDirectory() ? xd(s, e, t, r, n, i) : s.isFile() || s.isCharacterDevice() || s.isBlockDevice() ? Id(s, e, t, r, n, i) : s.isSymbolicLink() ? kd(e, t, r, n, i) : s.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : s.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function Id(e, t, r, n, i, o) {
  return t ? Rd(e, r, n, i, o) : vl(e, r, n, i, o);
}
function Rd(e, t, r, n, i) {
  if (n.overwrite)
    Oe.unlink(r, (o) => o ? i(o) : vl(e, t, r, n, i));
  else return n.errorOnExist ? i(new Error(`'${r}' already exists`)) : i();
}
function vl(e, t, r, n, i) {
  Oe.copyFile(t, r, (o) => o ? i(o) : n.preserveTimestamps ? Nd(e.mode, t, r, i) : Ln(r, e.mode, i));
}
function Nd(e, t, r, n) {
  return Pd(e) ? Dd(r, e, (i) => i ? n(i) : da(e, t, r, n)) : da(e, t, r, n);
}
function Pd(e) {
  return (e & 128) === 0;
}
function Dd(e, t, r) {
  return Ln(e, t | 128, r);
}
function da(e, t, r, n) {
  Fd(t, r, (i) => i ? n(i) : Ln(r, e, n));
}
function Ln(e, t, r) {
  return Oe.chmod(e, t, r);
}
function Fd(e, t, r) {
  Oe.stat(e, (n, i) => n ? r(n) : bd(t, i.atime, i.mtime, r));
}
function xd(e, t, r, n, i, o) {
  return t ? wl(r, n, i, o) : Ld(e.mode, r, n, i, o);
}
function Ld(e, t, r, n, i) {
  Oe.mkdir(r, (o) => {
    if (o) return i(o);
    wl(t, r, n, (a) => a ? i(a) : Ln(r, e, i));
  });
}
function wl(e, t, r, n) {
  Oe.readdir(e, (i, o) => i ? n(i) : _l(o, e, t, r, n));
}
function _l(e, t, r, n, i) {
  const o = e.pop();
  return o ? Ud(e, o, t, r, n, i) : i();
}
function Ud(e, t, r, n, i, o) {
  const a = Ar.join(r, t), s = Ar.join(n, t);
  Tr.checkPaths(a, s, "copy", i, (l, d) => {
    if (l) return o(l);
    const { destStat: f } = d;
    Od(f, a, s, i, (c) => c ? o(c) : _l(e, r, n, i, o));
  });
}
function kd(e, t, r, n, i) {
  Oe.readlink(t, (o, a) => {
    if (o) return i(o);
    if (n.dereference && (a = Ar.resolve(process.cwd(), a)), e)
      Oe.readlink(r, (s, l) => s ? s.code === "EINVAL" || s.code === "UNKNOWN" ? Oe.symlink(a, r, i) : i(s) : (n.dereference && (l = Ar.resolve(process.cwd(), l)), Tr.isSrcSubdir(a, l) ? i(new Error(`Cannot copy '${a}' to a subdirectory of itself, '${l}'.`)) : e.isDirectory() && Tr.isSrcSubdir(l, a) ? i(new Error(`Cannot overwrite '${l}' with '${a}'.`)) : Md(a, r, i)));
    else
      return Oe.symlink(a, r, i);
  });
}
function Md(e, t, r) {
  Oe.unlink(t, (n) => n ? r(n) : Oe.symlink(e, t, r));
}
var Bd = $d;
const we = Ce, Sr = ie, jd = Ve.mkdirsSync, Hd = ml.utimesMillisSync, Cr = Jt;
function qd(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = Cr.checkPathsSync(e, t, "copy", r);
  return Cr.checkParentPathsSync(e, n, t, "copy"), Gd(i, e, t, r);
}
function Gd(e, t, r, n) {
  if (n.filter && !n.filter(t, r)) return;
  const i = Sr.dirname(r);
  return we.existsSync(i) || jd(i), Al(e, t, r, n);
}
function Vd(e, t, r, n) {
  if (!(n.filter && !n.filter(t, r)))
    return Al(e, t, r, n);
}
function Al(e, t, r, n) {
  const o = (n.dereference ? we.statSync : we.lstatSync)(t);
  if (o.isDirectory()) return Qd(o, e, t, r, n);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return Wd(o, e, t, r, n);
  if (o.isSymbolicLink()) return th(e, t, r, n);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function Wd(e, t, r, n, i) {
  return t ? Yd(e, r, n, i) : Tl(e, r, n, i);
}
function Yd(e, t, r, n) {
  if (n.overwrite)
    return we.unlinkSync(r), Tl(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function Tl(e, t, r, n) {
  return we.copyFileSync(t, r), n.preserveTimestamps && zd(e.mode, t, r), co(r, e.mode);
}
function zd(e, t, r) {
  return Xd(e) && Kd(r, e), Jd(t, r);
}
function Xd(e) {
  return (e & 128) === 0;
}
function Kd(e, t) {
  return co(e, t | 128);
}
function co(e, t) {
  return we.chmodSync(e, t);
}
function Jd(e, t) {
  const r = we.statSync(e);
  return Hd(t, r.atime, r.mtime);
}
function Qd(e, t, r, n, i) {
  return t ? Sl(r, n, i) : Zd(e.mode, r, n, i);
}
function Zd(e, t, r, n) {
  return we.mkdirSync(r), Sl(t, r, n), co(r, e);
}
function Sl(e, t, r) {
  we.readdirSync(e).forEach((n) => eh(n, e, t, r));
}
function eh(e, t, r, n) {
  const i = Sr.join(t, e), o = Sr.join(r, e), { destStat: a } = Cr.checkPathsSync(i, o, "copy", n);
  return Vd(a, i, o, n);
}
function th(e, t, r, n) {
  let i = we.readlinkSync(t);
  if (n.dereference && (i = Sr.resolve(process.cwd(), i)), e) {
    let o;
    try {
      o = we.readlinkSync(r);
    } catch (a) {
      if (a.code === "EINVAL" || a.code === "UNKNOWN") return we.symlinkSync(i, r);
      throw a;
    }
    if (n.dereference && (o = Sr.resolve(process.cwd(), o)), Cr.isSrcSubdir(i, o))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
    if (we.statSync(r).isDirectory() && Cr.isSrcSubdir(o, i))
      throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
    return rh(i, r);
  } else
    return we.symlinkSync(i, r);
}
function rh(e, t) {
  return we.unlinkSync(t), we.symlinkSync(e, t);
}
var nh = qd;
const ih = Se.fromCallback;
var uo = {
  copy: ih(Bd),
  copySync: nh
};
const ha = Ce, Cl = ie, Z = Js, br = process.platform === "win32";
function bl(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((r) => {
    e[r] = e[r] || ha[r], r = r + "Sync", e[r] = e[r] || ha[r];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function fo(e, t, r) {
  let n = 0;
  typeof t == "function" && (r = t, t = {}), Z(e, "rimraf: missing path"), Z.strictEqual(typeof e, "string", "rimraf: path should be a string"), Z.strictEqual(typeof r, "function", "rimraf: callback function required"), Z(t, "rimraf: invalid options argument provided"), Z.strictEqual(typeof t, "object", "rimraf: options should be object"), bl(t), pa(e, t, function i(o) {
    if (o) {
      if ((o.code === "EBUSY" || o.code === "ENOTEMPTY" || o.code === "EPERM") && n < t.maxBusyTries) {
        n++;
        const a = n * 100;
        return setTimeout(() => pa(e, t, i), a);
      }
      o.code === "ENOENT" && (o = null);
    }
    r(o);
  });
}
function pa(e, t, r) {
  Z(e), Z(t), Z(typeof r == "function"), t.lstat(e, (n, i) => {
    if (n && n.code === "ENOENT")
      return r(null);
    if (n && n.code === "EPERM" && br)
      return ma(e, t, n, r);
    if (i && i.isDirectory())
      return gn(e, t, n, r);
    t.unlink(e, (o) => {
      if (o) {
        if (o.code === "ENOENT")
          return r(null);
        if (o.code === "EPERM")
          return br ? ma(e, t, o, r) : gn(e, t, o, r);
        if (o.code === "EISDIR")
          return gn(e, t, o, r);
      }
      return r(o);
    });
  });
}
function ma(e, t, r, n) {
  Z(e), Z(t), Z(typeof n == "function"), t.chmod(e, 438, (i) => {
    i ? n(i.code === "ENOENT" ? null : r) : t.stat(e, (o, a) => {
      o ? n(o.code === "ENOENT" ? null : r) : a.isDirectory() ? gn(e, t, r, n) : t.unlink(e, n);
    });
  });
}
function ga(e, t, r) {
  let n;
  Z(e), Z(t);
  try {
    t.chmodSync(e, 438);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  try {
    n = t.statSync(e);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  n.isDirectory() ? En(e, t, r) : t.unlinkSync(e);
}
function gn(e, t, r, n) {
  Z(e), Z(t), Z(typeof n == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? oh(e, t, n) : i && i.code === "ENOTDIR" ? n(r) : n(i);
  });
}
function oh(e, t, r) {
  Z(e), Z(t), Z(typeof r == "function"), t.readdir(e, (n, i) => {
    if (n) return r(n);
    let o = i.length, a;
    if (o === 0) return t.rmdir(e, r);
    i.forEach((s) => {
      fo(Cl.join(e, s), t, (l) => {
        if (!a) {
          if (l) return r(a = l);
          --o === 0 && t.rmdir(e, r);
        }
      });
    });
  });
}
function $l(e, t) {
  let r;
  t = t || {}, bl(t), Z(e, "rimraf: missing path"), Z.strictEqual(typeof e, "string", "rimraf: path should be a string"), Z(t, "rimraf: missing options"), Z.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    r = t.lstatSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    n.code === "EPERM" && br && ga(e, t, n);
  }
  try {
    r && r.isDirectory() ? En(e, t, null) : t.unlinkSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    if (n.code === "EPERM")
      return br ? ga(e, t, n) : En(e, t, n);
    if (n.code !== "EISDIR")
      throw n;
    En(e, t, n);
  }
}
function En(e, t, r) {
  Z(e), Z(t);
  try {
    t.rmdirSync(e);
  } catch (n) {
    if (n.code === "ENOTDIR")
      throw r;
    if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM")
      ah(e, t);
    else if (n.code !== "ENOENT")
      throw n;
  }
}
function ah(e, t) {
  if (Z(e), Z(t), t.readdirSync(e).forEach((r) => $l(Cl.join(e, r), t)), br) {
    const r = Date.now();
    do
      try {
        return t.rmdirSync(e, t);
      } catch {
      }
    while (Date.now() - r < 500);
  } else
    return t.rmdirSync(e, t);
}
var sh = fo;
fo.sync = $l;
const Sn = Ce, lh = Se.fromCallback, Ol = sh;
function ch(e, t) {
  if (Sn.rm) return Sn.rm(e, { recursive: !0, force: !0 }, t);
  Ol(e, t);
}
function uh(e) {
  if (Sn.rmSync) return Sn.rmSync(e, { recursive: !0, force: !0 });
  Ol.sync(e);
}
var Un = {
  remove: lh(ch),
  removeSync: uh
};
const fh = Se.fromPromise, Il = $t, Rl = ie, Nl = Ve, Pl = Un, Ea = fh(async function(t) {
  let r;
  try {
    r = await Il.readdir(t);
  } catch {
    return Nl.mkdirs(t);
  }
  return Promise.all(r.map((n) => Pl.remove(Rl.join(t, n))));
});
function ya(e) {
  let t;
  try {
    t = Il.readdirSync(e);
  } catch {
    return Nl.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = Rl.join(e, r), Pl.removeSync(r);
  });
}
var dh = {
  emptyDirSync: ya,
  emptydirSync: ya,
  emptyDir: Ea,
  emptydir: Ea
};
const hh = Se.fromCallback, Dl = ie, it = Ce, Fl = Ve;
function ph(e, t) {
  function r() {
    it.writeFile(e, "", (n) => {
      if (n) return t(n);
      t();
    });
  }
  it.stat(e, (n, i) => {
    if (!n && i.isFile()) return t();
    const o = Dl.dirname(e);
    it.stat(o, (a, s) => {
      if (a)
        return a.code === "ENOENT" ? Fl.mkdirs(o, (l) => {
          if (l) return t(l);
          r();
        }) : t(a);
      s.isDirectory() ? r() : it.readdir(o, (l) => {
        if (l) return t(l);
      });
    });
  });
}
function mh(e) {
  let t;
  try {
    t = it.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = Dl.dirname(e);
  try {
    it.statSync(r).isDirectory() || it.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") Fl.mkdirsSync(r);
    else throw n;
  }
  it.writeFileSync(e, "");
}
var gh = {
  createFile: hh(ph),
  createFileSync: mh
};
const Eh = Se.fromCallback, xl = ie, nt = Ce, Ll = Ve, yh = Ot.pathExists, { areIdentical: Ul } = Jt;
function vh(e, t, r) {
  function n(i, o) {
    nt.link(i, o, (a) => {
      if (a) return r(a);
      r(null);
    });
  }
  nt.lstat(t, (i, o) => {
    nt.lstat(e, (a, s) => {
      if (a)
        return a.message = a.message.replace("lstat", "ensureLink"), r(a);
      if (o && Ul(s, o)) return r(null);
      const l = xl.dirname(t);
      yh(l, (d, f) => {
        if (d) return r(d);
        if (f) return n(e, t);
        Ll.mkdirs(l, (c) => {
          if (c) return r(c);
          n(e, t);
        });
      });
    });
  });
}
function wh(e, t) {
  let r;
  try {
    r = nt.lstatSync(t);
  } catch {
  }
  try {
    const o = nt.lstatSync(e);
    if (r && Ul(o, r)) return;
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  const n = xl.dirname(t);
  return nt.existsSync(n) || Ll.mkdirsSync(n), nt.linkSync(e, t);
}
var _h = {
  createLink: Eh(vh),
  createLinkSync: wh
};
const ot = ie, vr = Ce, Ah = Ot.pathExists;
function Th(e, t, r) {
  if (ot.isAbsolute(e))
    return vr.lstat(e, (n) => n ? (n.message = n.message.replace("lstat", "ensureSymlink"), r(n)) : r(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const n = ot.dirname(t), i = ot.join(n, e);
    return Ah(i, (o, a) => o ? r(o) : a ? r(null, {
      toCwd: i,
      toDst: e
    }) : vr.lstat(e, (s) => s ? (s.message = s.message.replace("lstat", "ensureSymlink"), r(s)) : r(null, {
      toCwd: e,
      toDst: ot.relative(n, e)
    })));
  }
}
function Sh(e, t) {
  let r;
  if (ot.isAbsolute(e)) {
    if (r = vr.existsSync(e), !r) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const n = ot.dirname(t), i = ot.join(n, e);
    if (r = vr.existsSync(i), r)
      return {
        toCwd: i,
        toDst: e
      };
    if (r = vr.existsSync(e), !r) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: ot.relative(n, e)
    };
  }
}
var Ch = {
  symlinkPaths: Th,
  symlinkPathsSync: Sh
};
const kl = Ce;
function bh(e, t, r) {
  if (r = typeof t == "function" ? t : r, t = typeof t == "function" ? !1 : t, t) return r(null, t);
  kl.lstat(e, (n, i) => {
    if (n) return r(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", r(null, t);
  });
}
function $h(e, t) {
  let r;
  if (t) return t;
  try {
    r = kl.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var Oh = {
  symlinkType: bh,
  symlinkTypeSync: $h
};
const Ih = Se.fromCallback, Ml = ie, Le = $t, Bl = Ve, Rh = Bl.mkdirs, Nh = Bl.mkdirsSync, jl = Ch, Ph = jl.symlinkPaths, Dh = jl.symlinkPathsSync, Hl = Oh, Fh = Hl.symlinkType, xh = Hl.symlinkTypeSync, Lh = Ot.pathExists, { areIdentical: ql } = Jt;
function Uh(e, t, r, n) {
  n = typeof r == "function" ? r : n, r = typeof r == "function" ? !1 : r, Le.lstat(t, (i, o) => {
    !i && o.isSymbolicLink() ? Promise.all([
      Le.stat(e),
      Le.stat(t)
    ]).then(([a, s]) => {
      if (ql(a, s)) return n(null);
      va(e, t, r, n);
    }) : va(e, t, r, n);
  });
}
function va(e, t, r, n) {
  Ph(e, t, (i, o) => {
    if (i) return n(i);
    e = o.toDst, Fh(o.toCwd, r, (a, s) => {
      if (a) return n(a);
      const l = Ml.dirname(t);
      Lh(l, (d, f) => {
        if (d) return n(d);
        if (f) return Le.symlink(e, t, s, n);
        Rh(l, (c) => {
          if (c) return n(c);
          Le.symlink(e, t, s, n);
        });
      });
    });
  });
}
function kh(e, t, r) {
  let n;
  try {
    n = Le.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const s = Le.statSync(e), l = Le.statSync(t);
    if (ql(s, l)) return;
  }
  const i = Dh(e, t);
  e = i.toDst, r = xh(i.toCwd, r);
  const o = Ml.dirname(t);
  return Le.existsSync(o) || Nh(o), Le.symlinkSync(e, t, r);
}
var Mh = {
  createSymlink: Ih(Uh),
  createSymlinkSync: kh
};
const { createFile: wa, createFileSync: _a } = gh, { createLink: Aa, createLinkSync: Ta } = _h, { createSymlink: Sa, createSymlinkSync: Ca } = Mh;
var Bh = {
  // file
  createFile: wa,
  createFileSync: _a,
  ensureFile: wa,
  ensureFileSync: _a,
  // link
  createLink: Aa,
  createLinkSync: Ta,
  ensureLink: Aa,
  ensureLinkSync: Ta,
  // symlink
  createSymlink: Sa,
  createSymlinkSync: Ca,
  ensureSymlink: Sa,
  ensureSymlinkSync: Ca
};
function jh(e, { EOL: t = `
`, finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
  const o = r ? t : "";
  return JSON.stringify(e, n, i).replace(/\n/g, t) + o;
}
function Hh(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var ho = { stringify: jh, stripBom: Hh };
let Wt;
try {
  Wt = Ce;
} catch {
  Wt = dt;
}
const kn = Se, { stringify: Gl, stripBom: Vl } = ho;
async function qh(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Wt, n = "throws" in t ? t.throws : !0;
  let i = await kn.fromCallback(r.readFile)(e, t);
  i = Vl(i);
  let o;
  try {
    o = JSON.parse(i, t ? t.reviver : null);
  } catch (a) {
    if (n)
      throw a.message = `${e}: ${a.message}`, a;
    return null;
  }
  return o;
}
const Gh = kn.fromPromise(qh);
function Vh(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Wt, n = "throws" in t ? t.throws : !0;
  try {
    let i = r.readFileSync(e, t);
    return i = Vl(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (n)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function Wh(e, t, r = {}) {
  const n = r.fs || Wt, i = Gl(t, r);
  await kn.fromCallback(n.writeFile)(e, i, r);
}
const Yh = kn.fromPromise(Wh);
function zh(e, t, r = {}) {
  const n = r.fs || Wt, i = Gl(t, r);
  return n.writeFileSync(e, i, r);
}
const Xh = {
  readFile: Gh,
  readFileSync: Vh,
  writeFile: Yh,
  writeFileSync: zh
};
var Kh = Xh;
const an = Kh;
var Jh = {
  // jsonfile exports
  readJson: an.readFile,
  readJsonSync: an.readFileSync,
  writeJson: an.writeFile,
  writeJsonSync: an.writeFileSync
};
const Qh = Se.fromCallback, wr = Ce, Wl = ie, Yl = Ve, Zh = Ot.pathExists;
function ep(e, t, r, n) {
  typeof r == "function" && (n = r, r = "utf8");
  const i = Wl.dirname(e);
  Zh(i, (o, a) => {
    if (o) return n(o);
    if (a) return wr.writeFile(e, t, r, n);
    Yl.mkdirs(i, (s) => {
      if (s) return n(s);
      wr.writeFile(e, t, r, n);
    });
  });
}
function tp(e, ...t) {
  const r = Wl.dirname(e);
  if (wr.existsSync(r))
    return wr.writeFileSync(e, ...t);
  Yl.mkdirsSync(r), wr.writeFileSync(e, ...t);
}
var po = {
  outputFile: Qh(ep),
  outputFileSync: tp
};
const { stringify: rp } = ho, { outputFile: np } = po;
async function ip(e, t, r = {}) {
  const n = rp(t, r);
  await np(e, n, r);
}
var op = ip;
const { stringify: ap } = ho, { outputFileSync: sp } = po;
function lp(e, t, r) {
  const n = ap(t, r);
  sp(e, n, r);
}
var cp = lp;
const up = Se.fromPromise, Te = Jh;
Te.outputJson = up(op);
Te.outputJsonSync = cp;
Te.outputJSON = Te.outputJson;
Te.outputJSONSync = Te.outputJsonSync;
Te.writeJSON = Te.writeJson;
Te.writeJSONSync = Te.writeJsonSync;
Te.readJSON = Te.readJson;
Te.readJSONSync = Te.readJsonSync;
var fp = Te;
const dp = Ce, ji = ie, hp = uo.copy, zl = Un.remove, pp = Ve.mkdirp, mp = Ot.pathExists, ba = Jt;
function gp(e, t, r, n) {
  typeof r == "function" && (n = r, r = {}), r = r || {};
  const i = r.overwrite || r.clobber || !1;
  ba.checkPaths(e, t, "move", r, (o, a) => {
    if (o) return n(o);
    const { srcStat: s, isChangingCase: l = !1 } = a;
    ba.checkParentPaths(e, s, t, "move", (d) => {
      if (d) return n(d);
      if (Ep(t)) return $a(e, t, i, l, n);
      pp(ji.dirname(t), (f) => f ? n(f) : $a(e, t, i, l, n));
    });
  });
}
function Ep(e) {
  const t = ji.dirname(e);
  return ji.parse(t).root === t;
}
function $a(e, t, r, n, i) {
  if (n) return gi(e, t, r, i);
  if (r)
    return zl(t, (o) => o ? i(o) : gi(e, t, r, i));
  mp(t, (o, a) => o ? i(o) : a ? i(new Error("dest already exists.")) : gi(e, t, r, i));
}
function gi(e, t, r, n) {
  dp.rename(e, t, (i) => i ? i.code !== "EXDEV" ? n(i) : yp(e, t, r, n) : n());
}
function yp(e, t, r, n) {
  hp(e, t, {
    overwrite: r,
    errorOnExist: !0
  }, (o) => o ? n(o) : zl(e, n));
}
var vp = gp;
const Xl = Ce, Hi = ie, wp = uo.copySync, Kl = Un.removeSync, _p = Ve.mkdirpSync, Oa = Jt;
function Ap(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = Oa.checkPathsSync(e, t, "move", r);
  return Oa.checkParentPathsSync(e, i, t, "move"), Tp(t) || _p(Hi.dirname(t)), Sp(e, t, n, o);
}
function Tp(e) {
  const t = Hi.dirname(e);
  return Hi.parse(t).root === t;
}
function Sp(e, t, r, n) {
  if (n) return Ei(e, t, r);
  if (r)
    return Kl(t), Ei(e, t, r);
  if (Xl.existsSync(t)) throw new Error("dest already exists.");
  return Ei(e, t, r);
}
function Ei(e, t, r) {
  try {
    Xl.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return Cp(e, t, r);
  }
}
function Cp(e, t, r) {
  return wp(e, t, {
    overwrite: r,
    errorOnExist: !0
  }), Kl(e);
}
var bp = Ap;
const $p = Se.fromCallback;
var Op = {
  move: $p(vp),
  moveSync: bp
}, ht = {
  // Export promiseified graceful-fs:
  ...$t,
  // Export extra methods:
  ...uo,
  ...dh,
  ...Bh,
  ...fp,
  ...Ve,
  ...Op,
  ...po,
  ...Ot,
  ...Un
}, sr = {}, vt = {}, Ee = {}, mo = {}, ke = {};
function Jl(e) {
  return typeof e > "u" || e === null;
}
function Ip(e) {
  return typeof e == "object" && e !== null;
}
function Rp(e) {
  return Array.isArray(e) ? e : Jl(e) ? [] : [e];
}
function Np(e, t) {
  var r, n, i, o;
  if (t)
    for (o = Object.keys(t), r = 0, n = o.length; r < n; r += 1)
      i = o[r], e[i] = t[i];
  return e;
}
function Pp(e, t) {
  var r = "", n;
  for (n = 0; n < t; n += 1)
    r += e;
  return r;
}
function Dp(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
ke.isNothing = Jl;
ke.isObject = Ip;
ke.toArray = Rp;
ke.repeat = Pp;
ke.isNegativeZero = Dp;
ke.extend = Np;
function Ql(e, t) {
  var r = "", n = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (r += `

` + e.mark.snippet), n + " " + r) : n;
}
function $r(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = Ql(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
$r.prototype = Object.create(Error.prototype);
$r.prototype.constructor = $r;
$r.prototype.toString = function(t) {
  return this.name + ": " + Ql(this, t);
};
var Lr = $r, gr = ke;
function yi(e, t, r, n, i) {
  var o = "", a = "", s = Math.floor(i / 2) - 1;
  return n - t > s && (o = " ... ", t = n - s + o.length), r - n > s && (a = " ...", r = n + s - a.length), {
    str: o + e.slice(t, r).replace(/\t/g, "→") + a,
    pos: n - t + o.length
    // relative position
  };
}
function vi(e, t) {
  return gr.repeat(" ", t - e.length) + e;
}
function Fp(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, n = [0], i = [], o, a = -1; o = r.exec(e.buffer); )
    i.push(o.index), n.push(o.index + o[0].length), e.position <= o.index && a < 0 && (a = n.length - 2);
  a < 0 && (a = n.length - 1);
  var s = "", l, d, f = Math.min(e.line + t.linesAfter, i.length).toString().length, c = t.maxLength - (t.indent + f + 3);
  for (l = 1; l <= t.linesBefore && !(a - l < 0); l++)
    d = yi(
      e.buffer,
      n[a - l],
      i[a - l],
      e.position - (n[a] - n[a - l]),
      c
    ), s = gr.repeat(" ", t.indent) + vi((e.line - l + 1).toString(), f) + " | " + d.str + `
` + s;
  for (d = yi(e.buffer, n[a], i[a], e.position, c), s += gr.repeat(" ", t.indent) + vi((e.line + 1).toString(), f) + " | " + d.str + `
`, s += gr.repeat("-", t.indent + f + 3 + d.pos) + `^
`, l = 1; l <= t.linesAfter && !(a + l >= i.length); l++)
    d = yi(
      e.buffer,
      n[a + l],
      i[a + l],
      e.position - (n[a] - n[a + l]),
      c
    ), s += gr.repeat(" ", t.indent) + vi((e.line + l + 1).toString(), f) + " | " + d.str + `
`;
  return s.replace(/\n$/, "");
}
var xp = Fp, Ia = Lr, Lp = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], Up = [
  "scalar",
  "sequence",
  "mapping"
];
function kp(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(n) {
      t[String(n)] = r;
    });
  }), t;
}
function Mp(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(r) {
    if (Lp.indexOf(r) === -1)
      throw new Ia('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(r) {
    return r;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = kp(t.styleAliases || null), Up.indexOf(this.kind) === -1)
    throw new Ia('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var be = Mp, lr = Lr, wi = be;
function Ra(e, t) {
  var r = [];
  return e[t].forEach(function(n) {
    var i = r.length;
    r.forEach(function(o, a) {
      o.tag === n.tag && o.kind === n.kind && o.multi === n.multi && (i = a);
    }), r[i] = n;
  }), r;
}
function Bp() {
  var e = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, t, r;
  function n(i) {
    i.multi ? (e.multi[i.kind].push(i), e.multi.fallback.push(i)) : e[i.kind][i.tag] = e.fallback[i.tag] = i;
  }
  for (t = 0, r = arguments.length; t < r; t += 1)
    arguments[t].forEach(n);
  return e;
}
function qi(e) {
  return this.extend(e);
}
qi.prototype.extend = function(t) {
  var r = [], n = [];
  if (t instanceof wi)
    n.push(t);
  else if (Array.isArray(t))
    n = n.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
  else
    throw new lr("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(o) {
    if (!(o instanceof wi))
      throw new lr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new lr("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new lr("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), n.forEach(function(o) {
    if (!(o instanceof wi))
      throw new lr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(qi.prototype);
  return i.implicit = (this.implicit || []).concat(r), i.explicit = (this.explicit || []).concat(n), i.compiledImplicit = Ra(i, "implicit"), i.compiledExplicit = Ra(i, "explicit"), i.compiledTypeMap = Bp(i.compiledImplicit, i.compiledExplicit), i;
};
var Zl = qi, jp = be, ec = new jp("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), Hp = be, tc = new Hp("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), qp = be, rc = new qp("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), Gp = Zl, nc = new Gp({
  explicit: [
    ec,
    tc,
    rc
  ]
}), Vp = be;
function Wp(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function Yp() {
  return null;
}
function zp(e) {
  return e === null;
}
var ic = new Vp("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: Wp,
  construct: Yp,
  predicate: zp,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
}), Xp = be;
function Kp(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function Jp(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function Qp(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var oc = new Xp("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: Kp,
  construct: Jp,
  predicate: Qp,
  represent: {
    lowercase: function(e) {
      return e ? "true" : "false";
    },
    uppercase: function(e) {
      return e ? "TRUE" : "FALSE";
    },
    camelcase: function(e) {
      return e ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
}), Zp = ke, em = be;
function tm(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function rm(e) {
  return 48 <= e && e <= 55;
}
function nm(e) {
  return 48 <= e && e <= 57;
}
function im(e) {
  if (e === null) return !1;
  var t = e.length, r = 0, n = !1, i;
  if (!t) return !1;
  if (i = e[r], (i === "-" || i === "+") && (i = e[++r]), i === "0") {
    if (r + 1 === t) return !0;
    if (i = e[++r], i === "b") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (i !== "0" && i !== "1") return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "x") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!tm(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "o") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!rm(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
  }
  if (i === "_") return !1;
  for (; r < t; r++)
    if (i = e[r], i !== "_") {
      if (!nm(e.charCodeAt(r)))
        return !1;
      n = !0;
    }
  return !(!n || i === "_");
}
function om(e) {
  var t = e, r = 1, n;
  if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), n = t[0], (n === "-" || n === "+") && (n === "-" && (r = -1), t = t.slice(1), n = t[0]), t === "0") return 0;
  if (n === "0") {
    if (t[1] === "b") return r * parseInt(t.slice(2), 2);
    if (t[1] === "x") return r * parseInt(t.slice(2), 16);
    if (t[1] === "o") return r * parseInt(t.slice(2), 8);
  }
  return r * parseInt(t, 10);
}
function am(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !Zp.isNegativeZero(e);
}
var ac = new em("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: im,
  construct: om,
  predicate: am,
  represent: {
    binary: function(e) {
      return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
    },
    octal: function(e) {
      return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
    },
    decimal: function(e) {
      return e.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(e) {
      return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), sc = ke, sm = be, lm = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function cm(e) {
  return !(e === null || !lm.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function um(e) {
  var t, r;
  return t = e.replace(/_/g, "").toLowerCase(), r = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : r * parseFloat(t, 10);
}
var fm = /^[-+]?[0-9]+e/;
function dm(e, t) {
  var r;
  if (isNaN(e))
    switch (t) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (sc.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), fm.test(r) ? r.replace("e", ".e") : r;
}
function hm(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || sc.isNegativeZero(e));
}
var lc = new sm("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: cm,
  construct: um,
  predicate: hm,
  represent: dm,
  defaultStyle: "lowercase"
}), cc = nc.extend({
  implicit: [
    ic,
    oc,
    ac,
    lc
  ]
}), uc = cc, pm = be, fc = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), dc = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function mm(e) {
  return e === null ? !1 : fc.exec(e) !== null || dc.exec(e) !== null;
}
function gm(e) {
  var t, r, n, i, o, a, s, l = 0, d = null, f, c, h;
  if (t = fc.exec(e), t === null && (t = dc.exec(e)), t === null) throw new Error("Date resolve error");
  if (r = +t[1], n = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(r, n, i));
  if (o = +t[4], a = +t[5], s = +t[6], t[7]) {
    for (l = t[7].slice(0, 3); l.length < 3; )
      l += "0";
    l = +l;
  }
  return t[9] && (f = +t[10], c = +(t[11] || 0), d = (f * 60 + c) * 6e4, t[9] === "-" && (d = -d)), h = new Date(Date.UTC(r, n, i, o, a, s, l)), d && h.setTime(h.getTime() - d), h;
}
function Em(e) {
  return e.toISOString();
}
var hc = new pm("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: mm,
  construct: gm,
  instanceOf: Date,
  represent: Em
}), ym = be;
function vm(e) {
  return e === "<<" || e === null;
}
var pc = new ym("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: vm
}), wm = be, go = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function _m(e) {
  if (e === null) return !1;
  var t, r, n = 0, i = e.length, o = go;
  for (r = 0; r < i; r++)
    if (t = o.indexOf(e.charAt(r)), !(t > 64)) {
      if (t < 0) return !1;
      n += 6;
    }
  return n % 8 === 0;
}
function Am(e) {
  var t, r, n = e.replace(/[\r\n=]/g, ""), i = n.length, o = go, a = 0, s = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(a & 255)), a = a << 6 | o.indexOf(n.charAt(t));
  return r = i % 4 * 6, r === 0 ? (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(a & 255)) : r === 18 ? (s.push(a >> 10 & 255), s.push(a >> 2 & 255)) : r === 12 && s.push(a >> 4 & 255), new Uint8Array(s);
}
function Tm(e) {
  var t = "", r = 0, n, i, o = e.length, a = go;
  for (n = 0; n < o; n++)
    n % 3 === 0 && n && (t += a[r >> 18 & 63], t += a[r >> 12 & 63], t += a[r >> 6 & 63], t += a[r & 63]), r = (r << 8) + e[n];
  return i = o % 3, i === 0 ? (t += a[r >> 18 & 63], t += a[r >> 12 & 63], t += a[r >> 6 & 63], t += a[r & 63]) : i === 2 ? (t += a[r >> 10 & 63], t += a[r >> 4 & 63], t += a[r << 2 & 63], t += a[64]) : i === 1 && (t += a[r >> 2 & 63], t += a[r << 4 & 63], t += a[64], t += a[64]), t;
}
function Sm(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var mc = new wm("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: _m,
  construct: Am,
  predicate: Sm,
  represent: Tm
}), Cm = be, bm = Object.prototype.hasOwnProperty, $m = Object.prototype.toString;
function Om(e) {
  if (e === null) return !0;
  var t = [], r, n, i, o, a, s = e;
  for (r = 0, n = s.length; r < n; r += 1) {
    if (i = s[r], a = !1, $m.call(i) !== "[object Object]") return !1;
    for (o in i)
      if (bm.call(i, o))
        if (!a) a = !0;
        else return !1;
    if (!a) return !1;
    if (t.indexOf(o) === -1) t.push(o);
    else return !1;
  }
  return !0;
}
function Im(e) {
  return e !== null ? e : [];
}
var gc = new Cm("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: Om,
  construct: Im
}), Rm = be, Nm = Object.prototype.toString;
function Pm(e) {
  if (e === null) return !0;
  var t, r, n, i, o, a = e;
  for (o = new Array(a.length), t = 0, r = a.length; t < r; t += 1) {
    if (n = a[t], Nm.call(n) !== "[object Object]" || (i = Object.keys(n), i.length !== 1)) return !1;
    o[t] = [i[0], n[i[0]]];
  }
  return !0;
}
function Dm(e) {
  if (e === null) return [];
  var t, r, n, i, o, a = e;
  for (o = new Array(a.length), t = 0, r = a.length; t < r; t += 1)
    n = a[t], i = Object.keys(n), o[t] = [i[0], n[i[0]]];
  return o;
}
var Ec = new Rm("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: Pm,
  construct: Dm
}), Fm = be, xm = Object.prototype.hasOwnProperty;
function Lm(e) {
  if (e === null) return !0;
  var t, r = e;
  for (t in r)
    if (xm.call(r, t) && r[t] !== null)
      return !1;
  return !0;
}
function Um(e) {
  return e !== null ? e : {};
}
var yc = new Fm("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: Lm,
  construct: Um
}), Eo = uc.extend({
  implicit: [
    hc,
    pc
  ],
  explicit: [
    mc,
    gc,
    Ec,
    yc
  ]
}), _t = ke, vc = Lr, km = xp, Mm = Eo, ct = Object.prototype.hasOwnProperty, Cn = 1, wc = 2, _c = 3, bn = 4, _i = 1, Bm = 2, Na = 3, jm = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Hm = /[\x85\u2028\u2029]/, qm = /[,\[\]\{\}]/, Ac = /^(?:!|!!|![a-z\-]+!)$/i, Tc = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function Pa(e) {
  return Object.prototype.toString.call(e);
}
function Ge(e) {
  return e === 10 || e === 13;
}
function St(e) {
  return e === 9 || e === 32;
}
function Ie(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function Ut(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function Gm(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function Vm(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function Wm(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function Da(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function Ym(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var Sc = new Array(256), Cc = new Array(256);
for (var Pt = 0; Pt < 256; Pt++)
  Sc[Pt] = Da(Pt) ? 1 : 0, Cc[Pt] = Da(Pt);
function zm(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || Mm, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function bc(e, t) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = km(r), new vc(t, r);
}
function j(e, t) {
  throw bc(e, t);
}
function $n(e, t) {
  e.onWarning && e.onWarning.call(null, bc(e, t));
}
var Fa = {
  YAML: function(t, r, n) {
    var i, o, a;
    t.version !== null && j(t, "duplication of %YAML directive"), n.length !== 1 && j(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(n[0]), i === null && j(t, "ill-formed argument of the YAML directive"), o = parseInt(i[1], 10), a = parseInt(i[2], 10), o !== 1 && j(t, "unacceptable YAML version of the document"), t.version = n[0], t.checkLineBreaks = a < 2, a !== 1 && a !== 2 && $n(t, "unsupported YAML version of the document");
  },
  TAG: function(t, r, n) {
    var i, o;
    n.length !== 2 && j(t, "TAG directive accepts exactly two arguments"), i = n[0], o = n[1], Ac.test(i) || j(t, "ill-formed tag handle (first argument) of the TAG directive"), ct.call(t.tagMap, i) && j(t, 'there is a previously declared suffix for "' + i + '" tag handle'), Tc.test(o) || j(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      o = decodeURIComponent(o);
    } catch {
      j(t, "tag prefix is malformed: " + o);
    }
    t.tagMap[i] = o;
  }
};
function st(e, t, r, n) {
  var i, o, a, s;
  if (t < r) {
    if (s = e.input.slice(t, r), n)
      for (i = 0, o = s.length; i < o; i += 1)
        a = s.charCodeAt(i), a === 9 || 32 <= a && a <= 1114111 || j(e, "expected valid JSON character");
    else jm.test(s) && j(e, "the stream contains non-printable characters");
    e.result += s;
  }
}
function xa(e, t, r, n) {
  var i, o, a, s;
  for (_t.isObject(r) || j(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(r), a = 0, s = i.length; a < s; a += 1)
    o = i[a], ct.call(t, o) || (t[o] = r[o], n[o] = !0);
}
function kt(e, t, r, n, i, o, a, s, l) {
  var d, f;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), d = 0, f = i.length; d < f; d += 1)
      Array.isArray(i[d]) && j(e, "nested arrays are not supported inside keys"), typeof i == "object" && Pa(i[d]) === "[object Object]" && (i[d] = "[object Object]");
  if (typeof i == "object" && Pa(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), n === "tag:yaml.org,2002:merge")
    if (Array.isArray(o))
      for (d = 0, f = o.length; d < f; d += 1)
        xa(e, t, o[d], r);
    else
      xa(e, t, o, r);
  else
    !e.json && !ct.call(r, i) && ct.call(t, i) && (e.line = a || e.line, e.lineStart = s || e.lineStart, e.position = l || e.position, j(e, "duplicated mapping key")), i === "__proto__" ? Object.defineProperty(t, i, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: o
    }) : t[i] = o, delete r[i];
  return t;
}
function yo(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : j(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function se(e, t, r) {
  for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; St(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (Ge(i))
      for (yo(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && n !== 0 && e.lineIndent < r && $n(e, "deficient indentation"), n;
}
function Mn(e) {
  var t = e.position, r;
  return r = e.input.charCodeAt(t), !!((r === 45 || r === 46) && r === e.input.charCodeAt(t + 1) && r === e.input.charCodeAt(t + 2) && (t += 3, r = e.input.charCodeAt(t), r === 0 || Ie(r)));
}
function vo(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += _t.repeat(`
`, t - 1));
}
function Xm(e, t, r) {
  var n, i, o, a, s, l, d, f, c = e.kind, h = e.result, p;
  if (p = e.input.charCodeAt(e.position), Ie(p) || Ut(p) || p === 35 || p === 38 || p === 42 || p === 33 || p === 124 || p === 62 || p === 39 || p === 34 || p === 37 || p === 64 || p === 96 || (p === 63 || p === 45) && (i = e.input.charCodeAt(e.position + 1), Ie(i) || r && Ut(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", o = a = e.position, s = !1; p !== 0; ) {
    if (p === 58) {
      if (i = e.input.charCodeAt(e.position + 1), Ie(i) || r && Ut(i))
        break;
    } else if (p === 35) {
      if (n = e.input.charCodeAt(e.position - 1), Ie(n))
        break;
    } else {
      if (e.position === e.lineStart && Mn(e) || r && Ut(p))
        break;
      if (Ge(p))
        if (l = e.line, d = e.lineStart, f = e.lineIndent, se(e, !1, -1), e.lineIndent >= t) {
          s = !0, p = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = a, e.line = l, e.lineStart = d, e.lineIndent = f;
          break;
        }
    }
    s && (st(e, o, a, !1), vo(e, e.line - l), o = a = e.position, s = !1), St(p) || (a = e.position + 1), p = e.input.charCodeAt(++e.position);
  }
  return st(e, o, a, !1), e.result ? !0 : (e.kind = c, e.result = h, !1);
}
function Km(e, t) {
  var r, n, i;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (st(e, n, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        n = e.position, e.position++, i = e.position;
      else
        return !0;
    else Ge(r) ? (st(e, n, i, !0), vo(e, se(e, !1, t)), n = i = e.position) : e.position === e.lineStart && Mn(e) ? j(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  j(e, "unexpected end of the stream within a single quoted scalar");
}
function Jm(e, t) {
  var r, n, i, o, a, s;
  if (s = e.input.charCodeAt(e.position), s !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (s = e.input.charCodeAt(e.position)) !== 0; ) {
    if (s === 34)
      return st(e, r, e.position, !0), e.position++, !0;
    if (s === 92) {
      if (st(e, r, e.position, !0), s = e.input.charCodeAt(++e.position), Ge(s))
        se(e, !1, t);
      else if (s < 256 && Sc[s])
        e.result += Cc[s], e.position++;
      else if ((a = Vm(s)) > 0) {
        for (i = a, o = 0; i > 0; i--)
          s = e.input.charCodeAt(++e.position), (a = Gm(s)) >= 0 ? o = (o << 4) + a : j(e, "expected hexadecimal character");
        e.result += Ym(o), e.position++;
      } else
        j(e, "unknown escape sequence");
      r = n = e.position;
    } else Ge(s) ? (st(e, r, n, !0), vo(e, se(e, !1, t)), r = n = e.position) : e.position === e.lineStart && Mn(e) ? j(e, "unexpected end of the document within a double quoted scalar") : (e.position++, n = e.position);
  }
  j(e, "unexpected end of the stream within a double quoted scalar");
}
function Qm(e, t) {
  var r = !0, n, i, o, a = e.tag, s, l = e.anchor, d, f, c, h, p, y = /* @__PURE__ */ Object.create(null), A, _, S, $;
  if ($ = e.input.charCodeAt(e.position), $ === 91)
    f = 93, p = !1, s = [];
  else if ($ === 123)
    f = 125, p = !0, s = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), $ = e.input.charCodeAt(++e.position); $ !== 0; ) {
    if (se(e, !0, t), $ = e.input.charCodeAt(e.position), $ === f)
      return e.position++, e.tag = a, e.anchor = l, e.kind = p ? "mapping" : "sequence", e.result = s, !0;
    r ? $ === 44 && j(e, "expected the node content, but found ','") : j(e, "missed comma between flow collection entries"), _ = A = S = null, c = h = !1, $ === 63 && (d = e.input.charCodeAt(e.position + 1), Ie(d) && (c = h = !0, e.position++, se(e, !0, t))), n = e.line, i = e.lineStart, o = e.position, Yt(e, t, Cn, !1, !0), _ = e.tag, A = e.result, se(e, !0, t), $ = e.input.charCodeAt(e.position), (h || e.line === n) && $ === 58 && (c = !0, $ = e.input.charCodeAt(++e.position), se(e, !0, t), Yt(e, t, Cn, !1, !0), S = e.result), p ? kt(e, s, y, _, A, S, n, i, o) : c ? s.push(kt(e, null, y, _, A, S, n, i, o)) : s.push(A), se(e, !0, t), $ = e.input.charCodeAt(e.position), $ === 44 ? (r = !0, $ = e.input.charCodeAt(++e.position)) : r = !1;
  }
  j(e, "unexpected end of the stream within a flow collection");
}
function Zm(e, t) {
  var r, n, i = _i, o = !1, a = !1, s = t, l = 0, d = !1, f, c;
  if (c = e.input.charCodeAt(e.position), c === 124)
    n = !1;
  else if (c === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; c !== 0; )
    if (c = e.input.charCodeAt(++e.position), c === 43 || c === 45)
      _i === i ? i = c === 43 ? Na : Bm : j(e, "repeat of a chomping mode identifier");
    else if ((f = Wm(c)) >= 0)
      f === 0 ? j(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : a ? j(e, "repeat of an indentation width identifier") : (s = t + f - 1, a = !0);
    else
      break;
  if (St(c)) {
    do
      c = e.input.charCodeAt(++e.position);
    while (St(c));
    if (c === 35)
      do
        c = e.input.charCodeAt(++e.position);
      while (!Ge(c) && c !== 0);
  }
  for (; c !== 0; ) {
    for (yo(e), e.lineIndent = 0, c = e.input.charCodeAt(e.position); (!a || e.lineIndent < s) && c === 32; )
      e.lineIndent++, c = e.input.charCodeAt(++e.position);
    if (!a && e.lineIndent > s && (s = e.lineIndent), Ge(c)) {
      l++;
      continue;
    }
    if (e.lineIndent < s) {
      i === Na ? e.result += _t.repeat(`
`, o ? 1 + l : l) : i === _i && o && (e.result += `
`);
      break;
    }
    for (n ? St(c) ? (d = !0, e.result += _t.repeat(`
`, o ? 1 + l : l)) : d ? (d = !1, e.result += _t.repeat(`
`, l + 1)) : l === 0 ? o && (e.result += " ") : e.result += _t.repeat(`
`, l) : e.result += _t.repeat(`
`, o ? 1 + l : l), o = !0, a = !0, l = 0, r = e.position; !Ge(c) && c !== 0; )
      c = e.input.charCodeAt(++e.position);
    st(e, r, e.position, !1);
  }
  return !0;
}
function La(e, t) {
  var r, n = e.tag, i = e.anchor, o = [], a, s = !1, l;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = o), l = e.input.charCodeAt(e.position); l !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, j(e, "tab characters must not be used in indentation")), !(l !== 45 || (a = e.input.charCodeAt(e.position + 1), !Ie(a)))); ) {
    if (s = !0, e.position++, se(e, !0, -1) && e.lineIndent <= t) {
      o.push(null), l = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, Yt(e, t, _c, !1, !0), o.push(e.result), se(e, !0, -1), l = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > t) && l !== 0)
      j(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return s ? (e.tag = n, e.anchor = i, e.kind = "sequence", e.result = o, !0) : !1;
}
function e0(e, t, r) {
  var n, i, o, a, s, l, d = e.tag, f = e.anchor, c = {}, h = /* @__PURE__ */ Object.create(null), p = null, y = null, A = null, _ = !1, S = !1, $;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = c), $ = e.input.charCodeAt(e.position); $ !== 0; ) {
    if (!_ && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, j(e, "tab characters must not be used in indentation")), n = e.input.charCodeAt(e.position + 1), o = e.line, ($ === 63 || $ === 58) && Ie(n))
      $ === 63 ? (_ && (kt(e, c, h, p, y, null, a, s, l), p = y = A = null), S = !0, _ = !0, i = !0) : _ ? (_ = !1, i = !0) : j(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, $ = n;
    else {
      if (a = e.line, s = e.lineStart, l = e.position, !Yt(e, r, wc, !1, !0))
        break;
      if (e.line === o) {
        for ($ = e.input.charCodeAt(e.position); St($); )
          $ = e.input.charCodeAt(++e.position);
        if ($ === 58)
          $ = e.input.charCodeAt(++e.position), Ie($) || j(e, "a whitespace character is expected after the key-value separator within a block mapping"), _ && (kt(e, c, h, p, y, null, a, s, l), p = y = A = null), S = !0, _ = !1, i = !1, p = e.tag, y = e.result;
        else if (S)
          j(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = d, e.anchor = f, !0;
      } else if (S)
        j(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = d, e.anchor = f, !0;
    }
    if ((e.line === o || e.lineIndent > t) && (_ && (a = e.line, s = e.lineStart, l = e.position), Yt(e, t, bn, !0, i) && (_ ? y = e.result : A = e.result), _ || (kt(e, c, h, p, y, A, a, s, l), p = y = A = null), se(e, !0, -1), $ = e.input.charCodeAt(e.position)), (e.line === o || e.lineIndent > t) && $ !== 0)
      j(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return _ && kt(e, c, h, p, y, null, a, s, l), S && (e.tag = d, e.anchor = f, e.kind = "mapping", e.result = c), S;
}
function t0(e) {
  var t, r = !1, n = !1, i, o, a;
  if (a = e.input.charCodeAt(e.position), a !== 33) return !1;
  if (e.tag !== null && j(e, "duplication of a tag property"), a = e.input.charCodeAt(++e.position), a === 60 ? (r = !0, a = e.input.charCodeAt(++e.position)) : a === 33 ? (n = !0, i = "!!", a = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, r) {
    do
      a = e.input.charCodeAt(++e.position);
    while (a !== 0 && a !== 62);
    e.position < e.length ? (o = e.input.slice(t, e.position), a = e.input.charCodeAt(++e.position)) : j(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; a !== 0 && !Ie(a); )
      a === 33 && (n ? j(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), Ac.test(i) || j(e, "named tag handle cannot contain such characters"), n = !0, t = e.position + 1)), a = e.input.charCodeAt(++e.position);
    o = e.input.slice(t, e.position), qm.test(o) && j(e, "tag suffix cannot contain flow indicator characters");
  }
  o && !Tc.test(o) && j(e, "tag name cannot contain such characters: " + o);
  try {
    o = decodeURIComponent(o);
  } catch {
    j(e, "tag name is malformed: " + o);
  }
  return r ? e.tag = o : ct.call(e.tagMap, i) ? e.tag = e.tagMap[i] + o : i === "!" ? e.tag = "!" + o : i === "!!" ? e.tag = "tag:yaml.org,2002:" + o : j(e, 'undeclared tag handle "' + i + '"'), !0;
}
function r0(e) {
  var t, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && j(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !Ie(r) && !Ut(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && j(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function n0(e) {
  var t, r, n;
  if (n = e.input.charCodeAt(e.position), n !== 42) return !1;
  for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !Ie(n) && !Ut(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && j(e, "name of an alias node must contain at least one character"), r = e.input.slice(t, e.position), ct.call(e.anchorMap, r) || j(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], se(e, !0, -1), !0;
}
function Yt(e, t, r, n, i) {
  var o, a, s, l = 1, d = !1, f = !1, c, h, p, y, A, _;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, o = a = s = bn === r || _c === r, n && se(e, !0, -1) && (d = !0, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)), l === 1)
    for (; t0(e) || r0(e); )
      se(e, !0, -1) ? (d = !0, s = o, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)) : s = !1;
  if (s && (s = d || i), (l === 1 || bn === r) && (Cn === r || wc === r ? A = t : A = t + 1, _ = e.position - e.lineStart, l === 1 ? s && (La(e, _) || e0(e, _, A)) || Qm(e, A) ? f = !0 : (a && Zm(e, A) || Km(e, A) || Jm(e, A) ? f = !0 : n0(e) ? (f = !0, (e.tag !== null || e.anchor !== null) && j(e, "alias node should not have any properties")) : Xm(e, A, Cn === r) && (f = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : l === 0 && (f = s && La(e, _))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && j(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), c = 0, h = e.implicitTypes.length; c < h; c += 1)
      if (y = e.implicitTypes[c], y.resolve(e.result)) {
        e.result = y.construct(e.result), e.tag = y.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (ct.call(e.typeMap[e.kind || "fallback"], e.tag))
      y = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (y = null, p = e.typeMap.multi[e.kind || "fallback"], c = 0, h = p.length; c < h; c += 1)
        if (e.tag.slice(0, p[c].tag.length) === p[c].tag) {
          y = p[c];
          break;
        }
    y || j(e, "unknown tag !<" + e.tag + ">"), e.result !== null && y.kind !== e.kind && j(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + y.kind + '", not "' + e.kind + '"'), y.resolve(e.result, e.tag) ? (e.result = y.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : j(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || f;
}
function i0(e) {
  var t = e.position, r, n, i, o = !1, a;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (a = e.input.charCodeAt(e.position)) !== 0 && (se(e, !0, -1), a = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || a !== 37)); ) {
    for (o = !0, a = e.input.charCodeAt(++e.position), r = e.position; a !== 0 && !Ie(a); )
      a = e.input.charCodeAt(++e.position);
    for (n = e.input.slice(r, e.position), i = [], n.length < 1 && j(e, "directive name must not be less than one character in length"); a !== 0; ) {
      for (; St(a); )
        a = e.input.charCodeAt(++e.position);
      if (a === 35) {
        do
          a = e.input.charCodeAt(++e.position);
        while (a !== 0 && !Ge(a));
        break;
      }
      if (Ge(a)) break;
      for (r = e.position; a !== 0 && !Ie(a); )
        a = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(r, e.position));
    }
    a !== 0 && yo(e), ct.call(Fa, n) ? Fa[n](e, n, i) : $n(e, 'unknown document directive "' + n + '"');
  }
  if (se(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, se(e, !0, -1)) : o && j(e, "directives end mark is expected"), Yt(e, e.lineIndent - 1, bn, !1, !0), se(e, !0, -1), e.checkLineBreaks && Hm.test(e.input.slice(t, e.position)) && $n(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Mn(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, se(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    j(e, "end of the stream or a document separator is expected");
  else
    return;
}
function $c(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new zm(e, t), n = e.indexOf("\0");
  for (n !== -1 && (r.position = n, j(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    i0(r);
  return r.documents;
}
function o0(e, t, r) {
  t !== null && typeof t == "object" && typeof r > "u" && (r = t, t = null);
  var n = $c(e, r);
  if (typeof t != "function")
    return n;
  for (var i = 0, o = n.length; i < o; i += 1)
    t(n[i]);
}
function a0(e, t) {
  var r = $c(e, t);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new vc("expected a single document in the stream, but found more");
  }
}
mo.loadAll = o0;
mo.load = a0;
var Oc = {}, Bn = ke, Ur = Lr, s0 = Eo, Ic = Object.prototype.toString, Rc = Object.prototype.hasOwnProperty, wo = 65279, l0 = 9, Or = 10, c0 = 13, u0 = 32, f0 = 33, d0 = 34, Gi = 35, h0 = 37, p0 = 38, m0 = 39, g0 = 42, Nc = 44, E0 = 45, On = 58, y0 = 61, v0 = 62, w0 = 63, _0 = 64, Pc = 91, Dc = 93, A0 = 96, Fc = 123, T0 = 124, xc = 125, _e = {};
_e[0] = "\\0";
_e[7] = "\\a";
_e[8] = "\\b";
_e[9] = "\\t";
_e[10] = "\\n";
_e[11] = "\\v";
_e[12] = "\\f";
_e[13] = "\\r";
_e[27] = "\\e";
_e[34] = '\\"';
_e[92] = "\\\\";
_e[133] = "\\N";
_e[160] = "\\_";
_e[8232] = "\\L";
_e[8233] = "\\P";
var S0 = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], C0 = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function b0(e, t) {
  var r, n, i, o, a, s, l;
  if (t === null) return {};
  for (r = {}, n = Object.keys(t), i = 0, o = n.length; i < o; i += 1)
    a = n[i], s = String(t[a]), a.slice(0, 2) === "!!" && (a = "tag:yaml.org,2002:" + a.slice(2)), l = e.compiledTypeMap.fallback[a], l && Rc.call(l.styleAliases, s) && (s = l.styleAliases[s]), r[a] = s;
  return r;
}
function $0(e) {
  var t, r, n;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    r = "x", n = 2;
  else if (e <= 65535)
    r = "u", n = 4;
  else if (e <= 4294967295)
    r = "U", n = 8;
  else
    throw new Ur("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + Bn.repeat("0", n - t.length) + t;
}
var O0 = 1, Ir = 2;
function I0(e) {
  this.schema = e.schema || s0, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = Bn.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = b0(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Ir : O0, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function Ua(e, t) {
  for (var r = Bn.repeat(" ", t), n = 0, i = -1, o = "", a, s = e.length; n < s; )
    i = e.indexOf(`
`, n), i === -1 ? (a = e.slice(n), n = s) : (a = e.slice(n, i + 1), n = i + 1), a.length && a !== `
` && (o += r), o += a;
  return o;
}
function Vi(e, t) {
  return `
` + Bn.repeat(" ", e.indent * t);
}
function R0(e, t) {
  var r, n, i;
  for (r = 0, n = e.implicitTypes.length; r < n; r += 1)
    if (i = e.implicitTypes[r], i.resolve(t))
      return !0;
  return !1;
}
function In(e) {
  return e === u0 || e === l0;
}
function Rr(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== wo || 65536 <= e && e <= 1114111;
}
function ka(e) {
  return Rr(e) && e !== wo && e !== c0 && e !== Or;
}
function Ma(e, t, r) {
  var n = ka(e), i = n && !In(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      n
    ) : n && e !== Nc && e !== Pc && e !== Dc && e !== Fc && e !== xc) && e !== Gi && !(t === On && !i) || ka(t) && !In(t) && e === Gi || t === On && i
  );
}
function N0(e) {
  return Rr(e) && e !== wo && !In(e) && e !== E0 && e !== w0 && e !== On && e !== Nc && e !== Pc && e !== Dc && e !== Fc && e !== xc && e !== Gi && e !== p0 && e !== g0 && e !== f0 && e !== T0 && e !== y0 && e !== v0 && e !== m0 && e !== d0 && e !== h0 && e !== _0 && e !== A0;
}
function P0(e) {
  return !In(e) && e !== On;
}
function Er(e, t) {
  var r = e.charCodeAt(t), n;
  return r >= 55296 && r <= 56319 && t + 1 < e.length && (n = e.charCodeAt(t + 1), n >= 56320 && n <= 57343) ? (r - 55296) * 1024 + n - 56320 + 65536 : r;
}
function Lc(e) {
  var t = /^\n* /;
  return t.test(e);
}
var Uc = 1, Wi = 2, kc = 3, Mc = 4, Lt = 5;
function D0(e, t, r, n, i, o, a, s) {
  var l, d = 0, f = null, c = !1, h = !1, p = n !== -1, y = -1, A = N0(Er(e, 0)) && P0(Er(e, e.length - 1));
  if (t || a)
    for (l = 0; l < e.length; d >= 65536 ? l += 2 : l++) {
      if (d = Er(e, l), !Rr(d))
        return Lt;
      A = A && Ma(d, f, s), f = d;
    }
  else {
    for (l = 0; l < e.length; d >= 65536 ? l += 2 : l++) {
      if (d = Er(e, l), d === Or)
        c = !0, p && (h = h || // Foldable line = too long, and not more-indented.
        l - y - 1 > n && e[y + 1] !== " ", y = l);
      else if (!Rr(d))
        return Lt;
      A = A && Ma(d, f, s), f = d;
    }
    h = h || p && l - y - 1 > n && e[y + 1] !== " ";
  }
  return !c && !h ? A && !a && !i(e) ? Uc : o === Ir ? Lt : Wi : r > 9 && Lc(e) ? Lt : a ? o === Ir ? Lt : Wi : h ? Mc : kc;
}
function F0(e, t, r, n, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === Ir ? '""' : "''";
    if (!e.noCompatMode && (S0.indexOf(t) !== -1 || C0.test(t)))
      return e.quotingType === Ir ? '"' + t + '"' : "'" + t + "'";
    var o = e.indent * Math.max(1, r), a = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o), s = n || e.flowLevel > -1 && r >= e.flowLevel;
    function l(d) {
      return R0(e, d);
    }
    switch (D0(
      t,
      s,
      e.indent,
      a,
      l,
      e.quotingType,
      e.forceQuotes && !n,
      i
    )) {
      case Uc:
        return t;
      case Wi:
        return "'" + t.replace(/'/g, "''") + "'";
      case kc:
        return "|" + Ba(t, e.indent) + ja(Ua(t, o));
      case Mc:
        return ">" + Ba(t, e.indent) + ja(Ua(x0(t, a), o));
      case Lt:
        return '"' + L0(t) + '"';
      default:
        throw new Ur("impossible error: invalid scalar style");
    }
  }();
}
function Ba(e, t) {
  var r = Lc(e) ? String(t) : "", n = e[e.length - 1] === `
`, i = n && (e[e.length - 2] === `
` || e === `
`), o = i ? "+" : n ? "" : "-";
  return r + o + `
`;
}
function ja(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function x0(e, t) {
  for (var r = /(\n+)([^\n]*)/g, n = function() {
    var d = e.indexOf(`
`);
    return d = d !== -1 ? d : e.length, r.lastIndex = d, Ha(e.slice(0, d), t);
  }(), i = e[0] === `
` || e[0] === " ", o, a; a = r.exec(e); ) {
    var s = a[1], l = a[2];
    o = l[0] === " ", n += s + (!i && !o && l !== "" ? `
` : "") + Ha(l, t), i = o;
  }
  return n;
}
function Ha(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, n, i = 0, o, a = 0, s = 0, l = ""; n = r.exec(e); )
    s = n.index, s - i > t && (o = a > i ? a : s, l += `
` + e.slice(i, o), i = o + 1), a = s;
  return l += `
`, e.length - i > t && a > i ? l += e.slice(i, a) + `
` + e.slice(a + 1) : l += e.slice(i), l.slice(1);
}
function L0(e) {
  for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? i += 2 : i++)
    r = Er(e, i), n = _e[r], !n && Rr(r) ? (t += e[i], r >= 65536 && (t += e[i + 1])) : t += n || $0(r);
  return t;
}
function U0(e, t, r) {
  var n = "", i = e.tag, o, a, s;
  for (o = 0, a = r.length; o < a; o += 1)
    s = r[o], e.replacer && (s = e.replacer.call(r, String(o), s)), (Ke(e, t, s, !1, !1) || typeof s > "u" && Ke(e, t, null, !1, !1)) && (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), n += e.dump);
  e.tag = i, e.dump = "[" + n + "]";
}
function qa(e, t, r, n) {
  var i = "", o = e.tag, a, s, l;
  for (a = 0, s = r.length; a < s; a += 1)
    l = r[a], e.replacer && (l = e.replacer.call(r, String(a), l)), (Ke(e, t + 1, l, !0, !0, !1, !0) || typeof l > "u" && Ke(e, t + 1, null, !0, !0, !1, !0)) && ((!n || i !== "") && (i += Vi(e, t)), e.dump && Or === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = o, e.dump = i || "[]";
}
function k0(e, t, r) {
  var n = "", i = e.tag, o = Object.keys(r), a, s, l, d, f;
  for (a = 0, s = o.length; a < s; a += 1)
    f = "", n !== "" && (f += ", "), e.condenseFlow && (f += '"'), l = o[a], d = r[l], e.replacer && (d = e.replacer.call(r, l, d)), Ke(e, t, l, !1, !1) && (e.dump.length > 1024 && (f += "? "), f += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), Ke(e, t, d, !1, !1) && (f += e.dump, n += f));
  e.tag = i, e.dump = "{" + n + "}";
}
function M0(e, t, r, n) {
  var i = "", o = e.tag, a = Object.keys(r), s, l, d, f, c, h;
  if (e.sortKeys === !0)
    a.sort();
  else if (typeof e.sortKeys == "function")
    a.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new Ur("sortKeys must be a boolean or a function");
  for (s = 0, l = a.length; s < l; s += 1)
    h = "", (!n || i !== "") && (h += Vi(e, t)), d = a[s], f = r[d], e.replacer && (f = e.replacer.call(r, d, f)), Ke(e, t + 1, d, !0, !0, !0) && (c = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, c && (e.dump && Or === e.dump.charCodeAt(0) ? h += "?" : h += "? "), h += e.dump, c && (h += Vi(e, t)), Ke(e, t + 1, f, !0, c) && (e.dump && Or === e.dump.charCodeAt(0) ? h += ":" : h += ": ", h += e.dump, i += h));
  e.tag = o, e.dump = i || "{}";
}
function Ga(e, t, r) {
  var n, i, o, a, s, l;
  for (i = r ? e.explicitTypes : e.implicitTypes, o = 0, a = i.length; o < a; o += 1)
    if (s = i[o], (s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (r ? s.multi && s.representName ? e.tag = s.representName(t) : e.tag = s.tag : e.tag = "?", s.represent) {
        if (l = e.styleMap[s.tag] || s.defaultStyle, Ic.call(s.represent) === "[object Function]")
          n = s.represent(t, l);
        else if (Rc.call(s.represent, l))
          n = s.represent[l](t, l);
        else
          throw new Ur("!<" + s.tag + '> tag resolver accepts not "' + l + '" style');
        e.dump = n;
      }
      return !0;
    }
  return !1;
}
function Ke(e, t, r, n, i, o, a) {
  e.tag = null, e.dump = r, Ga(e, r, !1) || Ga(e, r, !0);
  var s = Ic.call(e.dump), l = n, d;
  n && (n = e.flowLevel < 0 || e.flowLevel > t);
  var f = s === "[object Object]" || s === "[object Array]", c, h;
  if (f && (c = e.duplicates.indexOf(r), h = c !== -1), (e.tag !== null && e.tag !== "?" || h || e.indent !== 2 && t > 0) && (i = !1), h && e.usedDuplicates[c])
    e.dump = "*ref_" + c;
  else {
    if (f && h && !e.usedDuplicates[c] && (e.usedDuplicates[c] = !0), s === "[object Object]")
      n && Object.keys(e.dump).length !== 0 ? (M0(e, t, e.dump, i), h && (e.dump = "&ref_" + c + e.dump)) : (k0(e, t, e.dump), h && (e.dump = "&ref_" + c + " " + e.dump));
    else if (s === "[object Array]")
      n && e.dump.length !== 0 ? (e.noArrayIndent && !a && t > 0 ? qa(e, t - 1, e.dump, i) : qa(e, t, e.dump, i), h && (e.dump = "&ref_" + c + e.dump)) : (U0(e, t, e.dump), h && (e.dump = "&ref_" + c + " " + e.dump));
    else if (s === "[object String]")
      e.tag !== "?" && F0(e, e.dump, t, o, l);
    else {
      if (s === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new Ur("unacceptable kind of an object to dump " + s);
    }
    e.tag !== null && e.tag !== "?" && (d = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? d = "!" + d : d.slice(0, 18) === "tag:yaml.org,2002:" ? d = "!!" + d.slice(18) : d = "!<" + d + ">", e.dump = d + " " + e.dump);
  }
  return !0;
}
function B0(e, t) {
  var r = [], n = [], i, o;
  for (Yi(e, r, n), i = 0, o = n.length; i < o; i += 1)
    t.duplicates.push(r[n[i]]);
  t.usedDuplicates = new Array(o);
}
function Yi(e, t, r) {
  var n, i, o;
  if (e !== null && typeof e == "object")
    if (i = t.indexOf(e), i !== -1)
      r.indexOf(i) === -1 && r.push(i);
    else if (t.push(e), Array.isArray(e))
      for (i = 0, o = e.length; i < o; i += 1)
        Yi(e[i], t, r);
    else
      for (n = Object.keys(e), i = 0, o = n.length; i < o; i += 1)
        Yi(e[n[i]], t, r);
}
function j0(e, t) {
  t = t || {};
  var r = new I0(t);
  r.noRefs || B0(e, r);
  var n = e;
  return r.replacer && (n = r.replacer.call({ "": n }, "", n)), Ke(r, 0, n, !0, !0) ? r.dump + `
` : "";
}
Oc.dump = j0;
var Bc = mo, H0 = Oc;
function _o(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
Ee.Type = be;
Ee.Schema = Zl;
Ee.FAILSAFE_SCHEMA = nc;
Ee.JSON_SCHEMA = cc;
Ee.CORE_SCHEMA = uc;
Ee.DEFAULT_SCHEMA = Eo;
Ee.load = Bc.load;
Ee.loadAll = Bc.loadAll;
Ee.dump = H0.dump;
Ee.YAMLException = Lr;
Ee.types = {
  binary: mc,
  float: lc,
  map: rc,
  null: ic,
  pairs: Ec,
  set: yc,
  timestamp: hc,
  bool: oc,
  int: ac,
  merge: pc,
  omap: gc,
  seq: tc,
  str: ec
};
Ee.safeLoad = _o("safeLoad", "load");
Ee.safeLoadAll = _o("safeLoadAll", "loadAll");
Ee.safeDump = _o("safeDump", "dump");
var jn = {};
Object.defineProperty(jn, "__esModule", { value: !0 });
jn.Lazy = void 0;
class q0 {
  constructor(t) {
    this._value = null, this.creator = t;
  }
  get hasValue() {
    return this.creator == null;
  }
  get value() {
    if (this.creator == null)
      return this._value;
    const t = this.creator();
    return this.value = t, t;
  }
  set value(t) {
    this._value = t, this.creator = null;
  }
}
jn.Lazy = q0;
var zi = { exports: {} };
const G0 = "2.0.0", jc = 256, V0 = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, W0 = 16, Y0 = jc - 6, z0 = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Hn = {
  MAX_LENGTH: jc,
  MAX_SAFE_COMPONENT_LENGTH: W0,
  MAX_SAFE_BUILD_LENGTH: Y0,
  MAX_SAFE_INTEGER: V0,
  RELEASE_TYPES: z0,
  SEMVER_SPEC_VERSION: G0,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const X0 = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var qn = X0;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: i
  } = Hn, o = qn;
  t = e.exports = {};
  const a = t.re = [], s = t.safeRe = [], l = t.src = [], d = t.t = {};
  let f = 0;
  const c = "[a-zA-Z0-9-]", h = [
    ["\\s", 1],
    ["\\d", i],
    [c, n]
  ], p = (A) => {
    for (const [_, S] of h)
      A = A.split(`${_}*`).join(`${_}{0,${S}}`).split(`${_}+`).join(`${_}{1,${S}}`);
    return A;
  }, y = (A, _, S) => {
    const $ = p(_), x = f++;
    o(A, x, _), d[A] = x, l[x] = _, a[x] = new RegExp(_, S ? "g" : void 0), s[x] = new RegExp($, S ? "g" : void 0);
  };
  y("NUMERICIDENTIFIER", "0|[1-9]\\d*"), y("NUMERICIDENTIFIERLOOSE", "\\d+"), y("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${c}*`), y("MAINVERSION", `(${l[d.NUMERICIDENTIFIER]})\\.(${l[d.NUMERICIDENTIFIER]})\\.(${l[d.NUMERICIDENTIFIER]})`), y("MAINVERSIONLOOSE", `(${l[d.NUMERICIDENTIFIERLOOSE]})\\.(${l[d.NUMERICIDENTIFIERLOOSE]})\\.(${l[d.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASEIDENTIFIER", `(?:${l[d.NUMERICIDENTIFIER]}|${l[d.NONNUMERICIDENTIFIER]})`), y("PRERELEASEIDENTIFIERLOOSE", `(?:${l[d.NUMERICIDENTIFIERLOOSE]}|${l[d.NONNUMERICIDENTIFIER]})`), y("PRERELEASE", `(?:-(${l[d.PRERELEASEIDENTIFIER]}(?:\\.${l[d.PRERELEASEIDENTIFIER]})*))`), y("PRERELEASELOOSE", `(?:-?(${l[d.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${l[d.PRERELEASEIDENTIFIERLOOSE]})*))`), y("BUILDIDENTIFIER", `${c}+`), y("BUILD", `(?:\\+(${l[d.BUILDIDENTIFIER]}(?:\\.${l[d.BUILDIDENTIFIER]})*))`), y("FULLPLAIN", `v?${l[d.MAINVERSION]}${l[d.PRERELEASE]}?${l[d.BUILD]}?`), y("FULL", `^${l[d.FULLPLAIN]}$`), y("LOOSEPLAIN", `[v=\\s]*${l[d.MAINVERSIONLOOSE]}${l[d.PRERELEASELOOSE]}?${l[d.BUILD]}?`), y("LOOSE", `^${l[d.LOOSEPLAIN]}$`), y("GTLT", "((?:<|>)?=?)"), y("XRANGEIDENTIFIERLOOSE", `${l[d.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), y("XRANGEIDENTIFIER", `${l[d.NUMERICIDENTIFIER]}|x|X|\\*`), y("XRANGEPLAIN", `[v=\\s]*(${l[d.XRANGEIDENTIFIER]})(?:\\.(${l[d.XRANGEIDENTIFIER]})(?:\\.(${l[d.XRANGEIDENTIFIER]})(?:${l[d.PRERELEASE]})?${l[d.BUILD]}?)?)?`), y("XRANGEPLAINLOOSE", `[v=\\s]*(${l[d.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[d.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[d.XRANGEIDENTIFIERLOOSE]})(?:${l[d.PRERELEASELOOSE]})?${l[d.BUILD]}?)?)?`), y("XRANGE", `^${l[d.GTLT]}\\s*${l[d.XRANGEPLAIN]}$`), y("XRANGELOOSE", `^${l[d.GTLT]}\\s*${l[d.XRANGEPLAINLOOSE]}$`), y("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), y("COERCE", `${l[d.COERCEPLAIN]}(?:$|[^\\d])`), y("COERCEFULL", l[d.COERCEPLAIN] + `(?:${l[d.PRERELEASE]})?(?:${l[d.BUILD]})?(?:$|[^\\d])`), y("COERCERTL", l[d.COERCE], !0), y("COERCERTLFULL", l[d.COERCEFULL], !0), y("LONETILDE", "(?:~>?)"), y("TILDETRIM", `(\\s*)${l[d.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", y("TILDE", `^${l[d.LONETILDE]}${l[d.XRANGEPLAIN]}$`), y("TILDELOOSE", `^${l[d.LONETILDE]}${l[d.XRANGEPLAINLOOSE]}$`), y("LONECARET", "(?:\\^)"), y("CARETTRIM", `(\\s*)${l[d.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", y("CARET", `^${l[d.LONECARET]}${l[d.XRANGEPLAIN]}$`), y("CARETLOOSE", `^${l[d.LONECARET]}${l[d.XRANGEPLAINLOOSE]}$`), y("COMPARATORLOOSE", `^${l[d.GTLT]}\\s*(${l[d.LOOSEPLAIN]})$|^$`), y("COMPARATOR", `^${l[d.GTLT]}\\s*(${l[d.FULLPLAIN]})$|^$`), y("COMPARATORTRIM", `(\\s*)${l[d.GTLT]}\\s*(${l[d.LOOSEPLAIN]}|${l[d.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", y("HYPHENRANGE", `^\\s*(${l[d.XRANGEPLAIN]})\\s+-\\s+(${l[d.XRANGEPLAIN]})\\s*$`), y("HYPHENRANGELOOSE", `^\\s*(${l[d.XRANGEPLAINLOOSE]})\\s+-\\s+(${l[d.XRANGEPLAINLOOSE]})\\s*$`), y("STAR", "(<|>)?=?\\s*\\*"), y("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), y("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(zi, zi.exports);
var kr = zi.exports;
const K0 = Object.freeze({ loose: !0 }), J0 = Object.freeze({}), Q0 = (e) => e ? typeof e != "object" ? K0 : e : J0;
var Ao = Q0;
const Va = /^[0-9]+$/, Hc = (e, t) => {
  const r = Va.test(e), n = Va.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, Z0 = (e, t) => Hc(t, e);
var qc = {
  compareIdentifiers: Hc,
  rcompareIdentifiers: Z0
};
const sn = qn, { MAX_LENGTH: Wa, MAX_SAFE_INTEGER: ln } = Hn, { safeRe: Ya, t: za } = kr, eg = Ao, { compareIdentifiers: Dt } = qc;
let tg = class qe {
  constructor(t, r) {
    if (r = eg(r), t instanceof qe) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Wa)
      throw new TypeError(
        `version is longer than ${Wa} characters`
      );
    sn("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? Ya[za.LOOSE] : Ya[za.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > ln || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > ln || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > ln || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const o = +i;
        if (o >= 0 && o < ln)
          return o;
      }
      return i;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (sn("SemVer.compare", this.version, this.options, t), !(t instanceof qe)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new qe(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof qe || (t = new qe(t, this.options)), Dt(this.major, t.major) || Dt(this.minor, t.minor) || Dt(this.patch, t.patch);
  }
  comparePre(t) {
    if (t instanceof qe || (t = new qe(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], i = t.prerelease[r];
      if (sn("prerelease compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return Dt(n, i);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof qe || (t = new qe(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], i = t.build[r];
      if (sn("build compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return Dt(n, i);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const i = Number(n) ? 1 : 0;
        if (!r && n === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (this.prerelease.length === 0)
          this.prerelease = [i];
        else {
          let o = this.prerelease.length;
          for (; --o >= 0; )
            typeof this.prerelease[o] == "number" && (this.prerelease[o]++, o = -2);
          if (o === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(i);
          }
        }
        if (r) {
          let o = [r, i];
          n === !1 && (o = [r]), Dt(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = o) : this.prerelease = o;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var $e = tg;
const Xa = $e, rg = (e, t, r = !1) => {
  if (e instanceof Xa)
    return e;
  try {
    return new Xa(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Qt = rg;
const ng = Qt, ig = (e, t) => {
  const r = ng(e, t);
  return r ? r.version : null;
};
var og = ig;
const ag = Qt, sg = (e, t) => {
  const r = ag(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var lg = sg;
const Ka = $e, cg = (e, t, r, n, i) => {
  typeof r == "string" && (i = n, n = r, r = void 0);
  try {
    return new Ka(
      e instanceof Ka ? e.version : e,
      r
    ).inc(t, n, i).version;
  } catch {
    return null;
  }
};
var ug = cg;
const Ja = Qt, fg = (e, t) => {
  const r = Ja(e, null, !0), n = Ja(t, null, !0), i = r.compare(n);
  if (i === 0)
    return null;
  const o = i > 0, a = o ? r : n, s = o ? n : r, l = !!a.prerelease.length;
  if (!!s.prerelease.length && !l)
    return !s.patch && !s.minor ? "major" : a.patch ? "patch" : a.minor ? "minor" : "major";
  const f = l ? "pre" : "";
  return r.major !== n.major ? f + "major" : r.minor !== n.minor ? f + "minor" : r.patch !== n.patch ? f + "patch" : "prerelease";
};
var dg = fg;
const hg = $e, pg = (e, t) => new hg(e, t).major;
var mg = pg;
const gg = $e, Eg = (e, t) => new gg(e, t).minor;
var yg = Eg;
const vg = $e, wg = (e, t) => new vg(e, t).patch;
var _g = wg;
const Ag = Qt, Tg = (e, t) => {
  const r = Ag(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var Sg = Tg;
const Qa = $e, Cg = (e, t, r) => new Qa(e, r).compare(new Qa(t, r));
var Me = Cg;
const bg = Me, $g = (e, t, r) => bg(t, e, r);
var Og = $g;
const Ig = Me, Rg = (e, t) => Ig(e, t, !0);
var Ng = Rg;
const Za = $e, Pg = (e, t, r) => {
  const n = new Za(e, r), i = new Za(t, r);
  return n.compare(i) || n.compareBuild(i);
};
var To = Pg;
const Dg = To, Fg = (e, t) => e.sort((r, n) => Dg(r, n, t));
var xg = Fg;
const Lg = To, Ug = (e, t) => e.sort((r, n) => Lg(n, r, t));
var kg = Ug;
const Mg = Me, Bg = (e, t, r) => Mg(e, t, r) > 0;
var Gn = Bg;
const jg = Me, Hg = (e, t, r) => jg(e, t, r) < 0;
var So = Hg;
const qg = Me, Gg = (e, t, r) => qg(e, t, r) === 0;
var Gc = Gg;
const Vg = Me, Wg = (e, t, r) => Vg(e, t, r) !== 0;
var Vc = Wg;
const Yg = Me, zg = (e, t, r) => Yg(e, t, r) >= 0;
var Co = zg;
const Xg = Me, Kg = (e, t, r) => Xg(e, t, r) <= 0;
var bo = Kg;
const Jg = Gc, Qg = Vc, Zg = Gn, eE = Co, tE = So, rE = bo, nE = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return Jg(e, r, n);
    case "!=":
      return Qg(e, r, n);
    case ">":
      return Zg(e, r, n);
    case ">=":
      return eE(e, r, n);
    case "<":
      return tE(e, r, n);
    case "<=":
      return rE(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Wc = nE;
const iE = $e, oE = Qt, { safeRe: cn, t: un } = kr, aE = (e, t) => {
  if (e instanceof iE)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? cn[un.COERCEFULL] : cn[un.COERCE]);
  else {
    const l = t.includePrerelease ? cn[un.COERCERTLFULL] : cn[un.COERCERTL];
    let d;
    for (; (d = l.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || d.index + d[0].length !== r.index + r[0].length) && (r = d), l.lastIndex = d.index + d[1].length + d[2].length;
    l.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], i = r[3] || "0", o = r[4] || "0", a = t.includePrerelease && r[5] ? `-${r[5]}` : "", s = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return oE(`${n}.${i}.${o}${a}${s}`, t);
};
var sE = aE;
class lE {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const r = this.map.get(t);
    if (r !== void 0)
      return this.map.delete(t), this.map.set(t, r), r;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, r) {
    if (!this.delete(t) && r !== void 0) {
      if (this.map.size >= this.max) {
        const i = this.map.keys().next().value;
        this.delete(i);
      }
      this.map.set(t, r);
    }
    return this;
  }
}
var cE = lE, Ai, es;
function Be() {
  if (es) return Ai;
  es = 1;
  const e = /\s+/g;
  class t {
    constructor(C, P) {
      if (P = i(P), C instanceof t)
        return C.loose === !!P.loose && C.includePrerelease === !!P.includePrerelease ? C : new t(C.raw, P);
      if (C instanceof o)
        return this.raw = C.value, this.set = [[C]], this.formatted = void 0, this;
      if (this.options = P, this.loose = !!P.loose, this.includePrerelease = !!P.includePrerelease, this.raw = C.trim().replace(e, " "), this.set = this.raw.split("||").map((b) => this.parseRange(b.trim())).filter((b) => b.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const b = this.set[0];
        if (this.set = this.set.filter((L) => !A(L[0])), this.set.length === 0)
          this.set = [b];
        else if (this.set.length > 1) {
          for (const L of this.set)
            if (L.length === 1 && _(L[0])) {
              this.set = [L];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let C = 0; C < this.set.length; C++) {
          C > 0 && (this.formatted += "||");
          const P = this.set[C];
          for (let b = 0; b < P.length; b++)
            b > 0 && (this.formatted += " "), this.formatted += P[b].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(C) {
      const b = ((this.options.includePrerelease && p) | (this.options.loose && y)) + ":" + C, L = n.get(b);
      if (L)
        return L;
      const D = this.options.loose, q = D ? l[d.HYPHENRANGELOOSE] : l[d.HYPHENRANGE];
      C = C.replace(q, H(this.options.includePrerelease)), a("hyphen replace", C), C = C.replace(l[d.COMPARATORTRIM], f), a("comparator trim", C), C = C.replace(l[d.TILDETRIM], c), a("tilde trim", C), C = C.replace(l[d.CARETTRIM], h), a("caret trim", C);
      let z = C.split(" ").map((V) => $(V, this.options)).join(" ").split(/\s+/).map((V) => B(V, this.options));
      D && (z = z.filter((V) => (a("loose invalid filter", V, this.options), !!V.match(l[d.COMPARATORLOOSE])))), a("range list", z);
      const W = /* @__PURE__ */ new Map(), K = z.map((V) => new o(V, this.options));
      for (const V of K) {
        if (A(V))
          return [V];
        W.set(V.value, V);
      }
      W.size > 1 && W.has("") && W.delete("");
      const ce = [...W.values()];
      return n.set(b, ce), ce;
    }
    intersects(C, P) {
      if (!(C instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((b) => S(b, P) && C.set.some((L) => S(L, P) && b.every((D) => L.every((q) => D.intersects(q, P)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(C) {
      if (!C)
        return !1;
      if (typeof C == "string")
        try {
          C = new s(C, this.options);
        } catch {
          return !1;
        }
      for (let P = 0; P < this.set.length; P++)
        if (Y(this.set[P], C, this.options))
          return !0;
      return !1;
    }
  }
  Ai = t;
  const r = cE, n = new r(), i = Ao, o = Vn(), a = qn, s = $e, {
    safeRe: l,
    t: d,
    comparatorTrimReplace: f,
    tildeTrimReplace: c,
    caretTrimReplace: h
  } = kr, { FLAG_INCLUDE_PRERELEASE: p, FLAG_LOOSE: y } = Hn, A = (N) => N.value === "<0.0.0-0", _ = (N) => N.value === "", S = (N, C) => {
    let P = !0;
    const b = N.slice();
    let L = b.pop();
    for (; P && b.length; )
      P = b.every((D) => L.intersects(D, C)), L = b.pop();
    return P;
  }, $ = (N, C) => (a("comp", N, C), N = T(N, C), a("caret", N), N = k(N, C), a("tildes", N), N = F(N, C), a("xrange", N), N = M(N, C), a("stars", N), N), x = (N) => !N || N.toLowerCase() === "x" || N === "*", k = (N, C) => N.trim().split(/\s+/).map((P) => G(P, C)).join(" "), G = (N, C) => {
    const P = C.loose ? l[d.TILDELOOSE] : l[d.TILDE];
    return N.replace(P, (b, L, D, q, z) => {
      a("tilde", N, b, L, D, q, z);
      let W;
      return x(L) ? W = "" : x(D) ? W = `>=${L}.0.0 <${+L + 1}.0.0-0` : x(q) ? W = `>=${L}.${D}.0 <${L}.${+D + 1}.0-0` : z ? (a("replaceTilde pr", z), W = `>=${L}.${D}.${q}-${z} <${L}.${+D + 1}.0-0`) : W = `>=${L}.${D}.${q} <${L}.${+D + 1}.0-0`, a("tilde return", W), W;
    });
  }, T = (N, C) => N.trim().split(/\s+/).map((P) => I(P, C)).join(" "), I = (N, C) => {
    a("caret", N, C);
    const P = C.loose ? l[d.CARETLOOSE] : l[d.CARET], b = C.includePrerelease ? "-0" : "";
    return N.replace(P, (L, D, q, z, W) => {
      a("caret", N, L, D, q, z, W);
      let K;
      return x(D) ? K = "" : x(q) ? K = `>=${D}.0.0${b} <${+D + 1}.0.0-0` : x(z) ? D === "0" ? K = `>=${D}.${q}.0${b} <${D}.${+q + 1}.0-0` : K = `>=${D}.${q}.0${b} <${+D + 1}.0.0-0` : W ? (a("replaceCaret pr", W), D === "0" ? q === "0" ? K = `>=${D}.${q}.${z}-${W} <${D}.${q}.${+z + 1}-0` : K = `>=${D}.${q}.${z}-${W} <${D}.${+q + 1}.0-0` : K = `>=${D}.${q}.${z}-${W} <${+D + 1}.0.0-0`) : (a("no pr"), D === "0" ? q === "0" ? K = `>=${D}.${q}.${z}${b} <${D}.${q}.${+z + 1}-0` : K = `>=${D}.${q}.${z}${b} <${D}.${+q + 1}.0-0` : K = `>=${D}.${q}.${z} <${+D + 1}.0.0-0`), a("caret return", K), K;
    });
  }, F = (N, C) => (a("replaceXRanges", N, C), N.split(/\s+/).map((P) => E(P, C)).join(" ")), E = (N, C) => {
    N = N.trim();
    const P = C.loose ? l[d.XRANGELOOSE] : l[d.XRANGE];
    return N.replace(P, (b, L, D, q, z, W) => {
      a("xRange", N, b, L, D, q, z, W);
      const K = x(D), ce = K || x(q), V = ce || x(z), je = V;
      return L === "=" && je && (L = ""), W = C.includePrerelease ? "-0" : "", K ? L === ">" || L === "<" ? b = "<0.0.0-0" : b = "*" : L && je ? (ce && (q = 0), z = 0, L === ">" ? (L = ">=", ce ? (D = +D + 1, q = 0, z = 0) : (q = +q + 1, z = 0)) : L === "<=" && (L = "<", ce ? D = +D + 1 : q = +q + 1), L === "<" && (W = "-0"), b = `${L + D}.${q}.${z}${W}`) : ce ? b = `>=${D}.0.0${W} <${+D + 1}.0.0-0` : V && (b = `>=${D}.${q}.0${W} <${D}.${+q + 1}.0-0`), a("xRange return", b), b;
    });
  }, M = (N, C) => (a("replaceStars", N, C), N.trim().replace(l[d.STAR], "")), B = (N, C) => (a("replaceGTE0", N, C), N.trim().replace(l[C.includePrerelease ? d.GTE0PRE : d.GTE0], "")), H = (N) => (C, P, b, L, D, q, z, W, K, ce, V, je) => (x(b) ? P = "" : x(L) ? P = `>=${b}.0.0${N ? "-0" : ""}` : x(D) ? P = `>=${b}.${L}.0${N ? "-0" : ""}` : q ? P = `>=${P}` : P = `>=${P}${N ? "-0" : ""}`, x(K) ? W = "" : x(ce) ? W = `<${+K + 1}.0.0-0` : x(V) ? W = `<${K}.${+ce + 1}.0-0` : je ? W = `<=${K}.${ce}.${V}-${je}` : N ? W = `<${K}.${ce}.${+V + 1}-0` : W = `<=${W}`, `${P} ${W}`.trim()), Y = (N, C, P) => {
    for (let b = 0; b < N.length; b++)
      if (!N[b].test(C))
        return !1;
    if (C.prerelease.length && !P.includePrerelease) {
      for (let b = 0; b < N.length; b++)
        if (a(N[b].semver), N[b].semver !== o.ANY && N[b].semver.prerelease.length > 0) {
          const L = N[b].semver;
          if (L.major === C.major && L.minor === C.minor && L.patch === C.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Ai;
}
var Ti, ts;
function Vn() {
  if (ts) return Ti;
  ts = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(f, c) {
      if (c = r(c), f instanceof t) {
        if (f.loose === !!c.loose)
          return f;
        f = f.value;
      }
      f = f.trim().split(/\s+/).join(" "), a("comparator", f, c), this.options = c, this.loose = !!c.loose, this.parse(f), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
    }
    parse(f) {
      const c = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR], h = f.match(c);
      if (!h)
        throw new TypeError(`Invalid comparator: ${f}`);
      this.operator = h[1] !== void 0 ? h[1] : "", this.operator === "=" && (this.operator = ""), h[2] ? this.semver = new s(h[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(f) {
      if (a("Comparator.test", f, this.options.loose), this.semver === e || f === e)
        return !0;
      if (typeof f == "string")
        try {
          f = new s(f, this.options);
        } catch {
          return !1;
        }
      return o(f, this.operator, this.semver, this.options);
    }
    intersects(f, c) {
      if (!(f instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new l(f.value, c).test(this.value) : f.operator === "" ? f.value === "" ? !0 : new l(this.value, c).test(f.semver) : (c = r(c), c.includePrerelease && (this.value === "<0.0.0-0" || f.value === "<0.0.0-0") || !c.includePrerelease && (this.value.startsWith("<0.0.0") || f.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && f.operator.startsWith(">") || this.operator.startsWith("<") && f.operator.startsWith("<") || this.semver.version === f.semver.version && this.operator.includes("=") && f.operator.includes("=") || o(this.semver, "<", f.semver, c) && this.operator.startsWith(">") && f.operator.startsWith("<") || o(this.semver, ">", f.semver, c) && this.operator.startsWith("<") && f.operator.startsWith(">")));
    }
  }
  Ti = t;
  const r = Ao, { safeRe: n, t: i } = kr, o = Wc, a = qn, s = $e, l = Be();
  return Ti;
}
const uE = Be(), fE = (e, t, r) => {
  try {
    t = new uE(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var Wn = fE;
const dE = Be(), hE = (e, t) => new dE(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var pE = hE;
const mE = $e, gE = Be(), EE = (e, t, r) => {
  let n = null, i = null, o = null;
  try {
    o = new gE(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!n || i.compare(a) === -1) && (n = a, i = new mE(n, r));
  }), n;
};
var yE = EE;
const vE = $e, wE = Be(), _E = (e, t, r) => {
  let n = null, i = null, o = null;
  try {
    o = new wE(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!n || i.compare(a) === 1) && (n = a, i = new vE(n, r));
  }), n;
};
var AE = _E;
const Si = $e, TE = Be(), rs = Gn, SE = (e, t) => {
  e = new TE(e, t);
  let r = new Si("0.0.0");
  if (e.test(r) || (r = new Si("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const i = e.set[n];
    let o = null;
    i.forEach((a) => {
      const s = new Si(a.semver.version);
      switch (a.operator) {
        case ">":
          s.prerelease.length === 0 ? s.patch++ : s.prerelease.push(0), s.raw = s.format();
        case "":
        case ">=":
          (!o || rs(s, o)) && (o = s);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${a.operator}`);
      }
    }), o && (!r || rs(r, o)) && (r = o);
  }
  return r && e.test(r) ? r : null;
};
var CE = SE;
const bE = Be(), $E = (e, t) => {
  try {
    return new bE(e, t).range || "*";
  } catch {
    return null;
  }
};
var OE = $E;
const IE = $e, Yc = Vn(), { ANY: RE } = Yc, NE = Be(), PE = Wn, ns = Gn, is = So, DE = bo, FE = Co, xE = (e, t, r, n) => {
  e = new IE(e, n), t = new NE(t, n);
  let i, o, a, s, l;
  switch (r) {
    case ">":
      i = ns, o = DE, a = is, s = ">", l = ">=";
      break;
    case "<":
      i = is, o = FE, a = ns, s = "<", l = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (PE(e, t, n))
    return !1;
  for (let d = 0; d < t.set.length; ++d) {
    const f = t.set[d];
    let c = null, h = null;
    if (f.forEach((p) => {
      p.semver === RE && (p = new Yc(">=0.0.0")), c = c || p, h = h || p, i(p.semver, c.semver, n) ? c = p : a(p.semver, h.semver, n) && (h = p);
    }), c.operator === s || c.operator === l || (!h.operator || h.operator === s) && o(e, h.semver))
      return !1;
    if (h.operator === l && a(e, h.semver))
      return !1;
  }
  return !0;
};
var $o = xE;
const LE = $o, UE = (e, t, r) => LE(e, t, ">", r);
var kE = UE;
const ME = $o, BE = (e, t, r) => ME(e, t, "<", r);
var jE = BE;
const os = Be(), HE = (e, t, r) => (e = new os(e, r), t = new os(t, r), e.intersects(t, r));
var qE = HE;
const GE = Wn, VE = Me;
var WE = (e, t, r) => {
  const n = [];
  let i = null, o = null;
  const a = e.sort((f, c) => VE(f, c, r));
  for (const f of a)
    GE(f, t, r) ? (o = f, i || (i = f)) : (o && n.push([i, o]), o = null, i = null);
  i && n.push([i, null]);
  const s = [];
  for (const [f, c] of n)
    f === c ? s.push(f) : !c && f === a[0] ? s.push("*") : c ? f === a[0] ? s.push(`<=${c}`) : s.push(`${f} - ${c}`) : s.push(`>=${f}`);
  const l = s.join(" || "), d = typeof t.raw == "string" ? t.raw : String(t);
  return l.length < d.length ? l : t;
};
const as = Be(), Oo = Vn(), { ANY: Ci } = Oo, cr = Wn, Io = Me, YE = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new as(e, r), t = new as(t, r);
  let n = !1;
  e: for (const i of e.set) {
    for (const o of t.set) {
      const a = XE(i, o, r);
      if (n = n || a !== null, a)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, zE = [new Oo(">=0.0.0-0")], ss = [new Oo(">=0.0.0")], XE = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Ci) {
    if (t.length === 1 && t[0].semver === Ci)
      return !0;
    r.includePrerelease ? e = zE : e = ss;
  }
  if (t.length === 1 && t[0].semver === Ci) {
    if (r.includePrerelease)
      return !0;
    t = ss;
  }
  const n = /* @__PURE__ */ new Set();
  let i, o;
  for (const p of e)
    p.operator === ">" || p.operator === ">=" ? i = ls(i, p, r) : p.operator === "<" || p.operator === "<=" ? o = cs(o, p, r) : n.add(p.semver);
  if (n.size > 1)
    return null;
  let a;
  if (i && o) {
    if (a = Io(i.semver, o.semver, r), a > 0)
      return null;
    if (a === 0 && (i.operator !== ">=" || o.operator !== "<="))
      return null;
  }
  for (const p of n) {
    if (i && !cr(p, String(i), r) || o && !cr(p, String(o), r))
      return null;
    for (const y of t)
      if (!cr(p, String(y), r))
        return !1;
    return !0;
  }
  let s, l, d, f, c = o && !r.includePrerelease && o.semver.prerelease.length ? o.semver : !1, h = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  c && c.prerelease.length === 1 && o.operator === "<" && c.prerelease[0] === 0 && (c = !1);
  for (const p of t) {
    if (f = f || p.operator === ">" || p.operator === ">=", d = d || p.operator === "<" || p.operator === "<=", i) {
      if (h && p.semver.prerelease && p.semver.prerelease.length && p.semver.major === h.major && p.semver.minor === h.minor && p.semver.patch === h.patch && (h = !1), p.operator === ">" || p.operator === ">=") {
        if (s = ls(i, p, r), s === p && s !== i)
          return !1;
      } else if (i.operator === ">=" && !cr(i.semver, String(p), r))
        return !1;
    }
    if (o) {
      if (c && p.semver.prerelease && p.semver.prerelease.length && p.semver.major === c.major && p.semver.minor === c.minor && p.semver.patch === c.patch && (c = !1), p.operator === "<" || p.operator === "<=") {
        if (l = cs(o, p, r), l === p && l !== o)
          return !1;
      } else if (o.operator === "<=" && !cr(o.semver, String(p), r))
        return !1;
    }
    if (!p.operator && (o || i) && a !== 0)
      return !1;
  }
  return !(i && d && !o && a !== 0 || o && f && !i && a !== 0 || h || c);
}, ls = (e, t, r) => {
  if (!e)
    return t;
  const n = Io(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, cs = (e, t, r) => {
  if (!e)
    return t;
  const n = Io(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var KE = YE;
const bi = kr, us = Hn, JE = $e, fs = qc, QE = Qt, ZE = og, ey = lg, ty = ug, ry = dg, ny = mg, iy = yg, oy = _g, ay = Sg, sy = Me, ly = Og, cy = Ng, uy = To, fy = xg, dy = kg, hy = Gn, py = So, my = Gc, gy = Vc, Ey = Co, yy = bo, vy = Wc, wy = sE, _y = Vn(), Ay = Be(), Ty = Wn, Sy = pE, Cy = yE, by = AE, $y = CE, Oy = OE, Iy = $o, Ry = kE, Ny = jE, Py = qE, Dy = WE, Fy = KE;
var zc = {
  parse: QE,
  valid: ZE,
  clean: ey,
  inc: ty,
  diff: ry,
  major: ny,
  minor: iy,
  patch: oy,
  prerelease: ay,
  compare: sy,
  rcompare: ly,
  compareLoose: cy,
  compareBuild: uy,
  sort: fy,
  rsort: dy,
  gt: hy,
  lt: py,
  eq: my,
  neq: gy,
  gte: Ey,
  lte: yy,
  cmp: vy,
  coerce: wy,
  Comparator: _y,
  Range: Ay,
  satisfies: Ty,
  toComparators: Sy,
  maxSatisfying: Cy,
  minSatisfying: by,
  minVersion: $y,
  validRange: Oy,
  outside: Iy,
  gtr: Ry,
  ltr: Ny,
  intersects: Py,
  simplifyRange: Dy,
  subset: Fy,
  SemVer: JE,
  re: bi.re,
  src: bi.src,
  tokens: bi.t,
  SEMVER_SPEC_VERSION: us.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: us.RELEASE_TYPES,
  compareIdentifiers: fs.compareIdentifiers,
  rcompareIdentifiers: fs.rcompareIdentifiers
}, Mr = {}, Rn = { exports: {} };
Rn.exports;
(function(e, t) {
  var r = 200, n = "__lodash_hash_undefined__", i = 1, o = 2, a = 9007199254740991, s = "[object Arguments]", l = "[object Array]", d = "[object AsyncFunction]", f = "[object Boolean]", c = "[object Date]", h = "[object Error]", p = "[object Function]", y = "[object GeneratorFunction]", A = "[object Map]", _ = "[object Number]", S = "[object Null]", $ = "[object Object]", x = "[object Promise]", k = "[object Proxy]", G = "[object RegExp]", T = "[object Set]", I = "[object String]", F = "[object Symbol]", E = "[object Undefined]", M = "[object WeakMap]", B = "[object ArrayBuffer]", H = "[object DataView]", Y = "[object Float32Array]", N = "[object Float64Array]", C = "[object Int8Array]", P = "[object Int16Array]", b = "[object Int32Array]", L = "[object Uint8Array]", D = "[object Uint8ClampedArray]", q = "[object Uint16Array]", z = "[object Uint32Array]", W = /[\\^$.*+?()[\]{}|]/g, K = /^\[object .+?Constructor\]$/, ce = /^(?:0|[1-9]\d*)$/, V = {};
  V[Y] = V[N] = V[C] = V[P] = V[b] = V[L] = V[D] = V[q] = V[z] = !0, V[s] = V[l] = V[B] = V[f] = V[H] = V[c] = V[h] = V[p] = V[A] = V[_] = V[$] = V[G] = V[T] = V[I] = V[M] = !1;
  var je = typeof Ue == "object" && Ue && Ue.Object === Object && Ue, m = typeof self == "object" && self && self.Object === Object && self, u = je || m || Function("return this")(), O = t && !t.nodeType && t, w = O && !0 && e && !e.nodeType && e, Q = w && w.exports === O, te = Q && je.process, oe = function() {
    try {
      return te && te.binding && te.binding("util");
    } catch {
    }
  }(), pe = oe && oe.isTypedArray;
  function ye(g, v) {
    for (var R = -1, U = g == null ? 0 : g.length, ee = 0, X = []; ++R < U; ) {
      var ae = g[R];
      v(ae, R, g) && (X[ee++] = ae);
    }
    return X;
  }
  function Je(g, v) {
    for (var R = -1, U = v.length, ee = g.length; ++R < U; )
      g[ee + R] = v[R];
    return g;
  }
  function le(g, v) {
    for (var R = -1, U = g == null ? 0 : g.length; ++R < U; )
      if (v(g[R], R, g))
        return !0;
    return !1;
  }
  function Fe(g, v) {
    for (var R = -1, U = Array(g); ++R < g; )
      U[R] = v(R);
    return U;
  }
  function ti(g) {
    return function(v) {
      return g(v);
    };
  }
  function Gr(g, v) {
    return g.has(v);
  }
  function tr(g, v) {
    return g == null ? void 0 : g[v];
  }
  function Vr(g) {
    var v = -1, R = Array(g.size);
    return g.forEach(function(U, ee) {
      R[++v] = [ee, U];
    }), R;
  }
  function cu(g, v) {
    return function(R) {
      return g(v(R));
    };
  }
  function uu(g) {
    var v = -1, R = Array(g.size);
    return g.forEach(function(U) {
      R[++v] = U;
    }), R;
  }
  var fu = Array.prototype, du = Function.prototype, Wr = Object.prototype, ri = u["__core-js_shared__"], Do = du.toString, He = Wr.hasOwnProperty, Fo = function() {
    var g = /[^.]+$/.exec(ri && ri.keys && ri.keys.IE_PROTO || "");
    return g ? "Symbol(src)_1." + g : "";
  }(), xo = Wr.toString, hu = RegExp(
    "^" + Do.call(He).replace(W, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Lo = Q ? u.Buffer : void 0, Yr = u.Symbol, Uo = u.Uint8Array, ko = Wr.propertyIsEnumerable, pu = fu.splice, pt = Yr ? Yr.toStringTag : void 0, Mo = Object.getOwnPropertySymbols, mu = Lo ? Lo.isBuffer : void 0, gu = cu(Object.keys, Object), ni = Rt(u, "DataView"), rr = Rt(u, "Map"), ii = Rt(u, "Promise"), oi = Rt(u, "Set"), ai = Rt(u, "WeakMap"), nr = Rt(Object, "create"), Eu = Et(ni), yu = Et(rr), vu = Et(ii), wu = Et(oi), _u = Et(ai), Bo = Yr ? Yr.prototype : void 0, si = Bo ? Bo.valueOf : void 0;
  function mt(g) {
    var v = -1, R = g == null ? 0 : g.length;
    for (this.clear(); ++v < R; ) {
      var U = g[v];
      this.set(U[0], U[1]);
    }
  }
  function Au() {
    this.__data__ = nr ? nr(null) : {}, this.size = 0;
  }
  function Tu(g) {
    var v = this.has(g) && delete this.__data__[g];
    return this.size -= v ? 1 : 0, v;
  }
  function Su(g) {
    var v = this.__data__;
    if (nr) {
      var R = v[g];
      return R === n ? void 0 : R;
    }
    return He.call(v, g) ? v[g] : void 0;
  }
  function Cu(g) {
    var v = this.__data__;
    return nr ? v[g] !== void 0 : He.call(v, g);
  }
  function bu(g, v) {
    var R = this.__data__;
    return this.size += this.has(g) ? 0 : 1, R[g] = nr && v === void 0 ? n : v, this;
  }
  mt.prototype.clear = Au, mt.prototype.delete = Tu, mt.prototype.get = Su, mt.prototype.has = Cu, mt.prototype.set = bu;
  function We(g) {
    var v = -1, R = g == null ? 0 : g.length;
    for (this.clear(); ++v < R; ) {
      var U = g[v];
      this.set(U[0], U[1]);
    }
  }
  function $u() {
    this.__data__ = [], this.size = 0;
  }
  function Ou(g) {
    var v = this.__data__, R = Xr(v, g);
    if (R < 0)
      return !1;
    var U = v.length - 1;
    return R == U ? v.pop() : pu.call(v, R, 1), --this.size, !0;
  }
  function Iu(g) {
    var v = this.__data__, R = Xr(v, g);
    return R < 0 ? void 0 : v[R][1];
  }
  function Ru(g) {
    return Xr(this.__data__, g) > -1;
  }
  function Nu(g, v) {
    var R = this.__data__, U = Xr(R, g);
    return U < 0 ? (++this.size, R.push([g, v])) : R[U][1] = v, this;
  }
  We.prototype.clear = $u, We.prototype.delete = Ou, We.prototype.get = Iu, We.prototype.has = Ru, We.prototype.set = Nu;
  function gt(g) {
    var v = -1, R = g == null ? 0 : g.length;
    for (this.clear(); ++v < R; ) {
      var U = g[v];
      this.set(U[0], U[1]);
    }
  }
  function Pu() {
    this.size = 0, this.__data__ = {
      hash: new mt(),
      map: new (rr || We)(),
      string: new mt()
    };
  }
  function Du(g) {
    var v = Kr(this, g).delete(g);
    return this.size -= v ? 1 : 0, v;
  }
  function Fu(g) {
    return Kr(this, g).get(g);
  }
  function xu(g) {
    return Kr(this, g).has(g);
  }
  function Lu(g, v) {
    var R = Kr(this, g), U = R.size;
    return R.set(g, v), this.size += R.size == U ? 0 : 1, this;
  }
  gt.prototype.clear = Pu, gt.prototype.delete = Du, gt.prototype.get = Fu, gt.prototype.has = xu, gt.prototype.set = Lu;
  function zr(g) {
    var v = -1, R = g == null ? 0 : g.length;
    for (this.__data__ = new gt(); ++v < R; )
      this.add(g[v]);
  }
  function Uu(g) {
    return this.__data__.set(g, n), this;
  }
  function ku(g) {
    return this.__data__.has(g);
  }
  zr.prototype.add = zr.prototype.push = Uu, zr.prototype.has = ku;
  function Qe(g) {
    var v = this.__data__ = new We(g);
    this.size = v.size;
  }
  function Mu() {
    this.__data__ = new We(), this.size = 0;
  }
  function Bu(g) {
    var v = this.__data__, R = v.delete(g);
    return this.size = v.size, R;
  }
  function ju(g) {
    return this.__data__.get(g);
  }
  function Hu(g) {
    return this.__data__.has(g);
  }
  function qu(g, v) {
    var R = this.__data__;
    if (R instanceof We) {
      var U = R.__data__;
      if (!rr || U.length < r - 1)
        return U.push([g, v]), this.size = ++R.size, this;
      R = this.__data__ = new gt(U);
    }
    return R.set(g, v), this.size = R.size, this;
  }
  Qe.prototype.clear = Mu, Qe.prototype.delete = Bu, Qe.prototype.get = ju, Qe.prototype.has = Hu, Qe.prototype.set = qu;
  function Gu(g, v) {
    var R = Jr(g), U = !R && af(g), ee = !R && !U && li(g), X = !R && !U && !ee && Xo(g), ae = R || U || ee || X, ue = ae ? Fe(g.length, String) : [], me = ue.length;
    for (var re in g)
      He.call(g, re) && !(ae && // Safari 9 has enumerable `arguments.length` in strict mode.
      (re == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      ee && (re == "offset" || re == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      X && (re == "buffer" || re == "byteLength" || re == "byteOffset") || // Skip index properties.
      ef(re, me))) && ue.push(re);
    return ue;
  }
  function Xr(g, v) {
    for (var R = g.length; R--; )
      if (Vo(g[R][0], v))
        return R;
    return -1;
  }
  function Vu(g, v, R) {
    var U = v(g);
    return Jr(g) ? U : Je(U, R(g));
  }
  function ir(g) {
    return g == null ? g === void 0 ? E : S : pt && pt in Object(g) ? Qu(g) : of(g);
  }
  function jo(g) {
    return or(g) && ir(g) == s;
  }
  function Ho(g, v, R, U, ee) {
    return g === v ? !0 : g == null || v == null || !or(g) && !or(v) ? g !== g && v !== v : Wu(g, v, R, U, Ho, ee);
  }
  function Wu(g, v, R, U, ee, X) {
    var ae = Jr(g), ue = Jr(v), me = ae ? l : Ze(g), re = ue ? l : Ze(v);
    me = me == s ? $ : me, re = re == s ? $ : re;
    var Re = me == $, xe = re == $, ve = me == re;
    if (ve && li(g)) {
      if (!li(v))
        return !1;
      ae = !0, Re = !1;
    }
    if (ve && !Re)
      return X || (X = new Qe()), ae || Xo(g) ? qo(g, v, R, U, ee, X) : Ku(g, v, me, R, U, ee, X);
    if (!(R & i)) {
      var Ne = Re && He.call(g, "__wrapped__"), Pe = xe && He.call(v, "__wrapped__");
      if (Ne || Pe) {
        var et = Ne ? g.value() : g, Ye = Pe ? v.value() : v;
        return X || (X = new Qe()), ee(et, Ye, R, U, X);
      }
    }
    return ve ? (X || (X = new Qe()), Ju(g, v, R, U, ee, X)) : !1;
  }
  function Yu(g) {
    if (!zo(g) || rf(g))
      return !1;
    var v = Wo(g) ? hu : K;
    return v.test(Et(g));
  }
  function zu(g) {
    return or(g) && Yo(g.length) && !!V[ir(g)];
  }
  function Xu(g) {
    if (!nf(g))
      return gu(g);
    var v = [];
    for (var R in Object(g))
      He.call(g, R) && R != "constructor" && v.push(R);
    return v;
  }
  function qo(g, v, R, U, ee, X) {
    var ae = R & i, ue = g.length, me = v.length;
    if (ue != me && !(ae && me > ue))
      return !1;
    var re = X.get(g);
    if (re && X.get(v))
      return re == v;
    var Re = -1, xe = !0, ve = R & o ? new zr() : void 0;
    for (X.set(g, v), X.set(v, g); ++Re < ue; ) {
      var Ne = g[Re], Pe = v[Re];
      if (U)
        var et = ae ? U(Pe, Ne, Re, v, g, X) : U(Ne, Pe, Re, g, v, X);
      if (et !== void 0) {
        if (et)
          continue;
        xe = !1;
        break;
      }
      if (ve) {
        if (!le(v, function(Ye, yt) {
          if (!Gr(ve, yt) && (Ne === Ye || ee(Ne, Ye, R, U, X)))
            return ve.push(yt);
        })) {
          xe = !1;
          break;
        }
      } else if (!(Ne === Pe || ee(Ne, Pe, R, U, X))) {
        xe = !1;
        break;
      }
    }
    return X.delete(g), X.delete(v), xe;
  }
  function Ku(g, v, R, U, ee, X, ae) {
    switch (R) {
      case H:
        if (g.byteLength != v.byteLength || g.byteOffset != v.byteOffset)
          return !1;
        g = g.buffer, v = v.buffer;
      case B:
        return !(g.byteLength != v.byteLength || !X(new Uo(g), new Uo(v)));
      case f:
      case c:
      case _:
        return Vo(+g, +v);
      case h:
        return g.name == v.name && g.message == v.message;
      case G:
      case I:
        return g == v + "";
      case A:
        var ue = Vr;
      case T:
        var me = U & i;
        if (ue || (ue = uu), g.size != v.size && !me)
          return !1;
        var re = ae.get(g);
        if (re)
          return re == v;
        U |= o, ae.set(g, v);
        var Re = qo(ue(g), ue(v), U, ee, X, ae);
        return ae.delete(g), Re;
      case F:
        if (si)
          return si.call(g) == si.call(v);
    }
    return !1;
  }
  function Ju(g, v, R, U, ee, X) {
    var ae = R & i, ue = Go(g), me = ue.length, re = Go(v), Re = re.length;
    if (me != Re && !ae)
      return !1;
    for (var xe = me; xe--; ) {
      var ve = ue[xe];
      if (!(ae ? ve in v : He.call(v, ve)))
        return !1;
    }
    var Ne = X.get(g);
    if (Ne && X.get(v))
      return Ne == v;
    var Pe = !0;
    X.set(g, v), X.set(v, g);
    for (var et = ae; ++xe < me; ) {
      ve = ue[xe];
      var Ye = g[ve], yt = v[ve];
      if (U)
        var Ko = ae ? U(yt, Ye, ve, v, g, X) : U(Ye, yt, ve, g, v, X);
      if (!(Ko === void 0 ? Ye === yt || ee(Ye, yt, R, U, X) : Ko)) {
        Pe = !1;
        break;
      }
      et || (et = ve == "constructor");
    }
    if (Pe && !et) {
      var Qr = g.constructor, Zr = v.constructor;
      Qr != Zr && "constructor" in g && "constructor" in v && !(typeof Qr == "function" && Qr instanceof Qr && typeof Zr == "function" && Zr instanceof Zr) && (Pe = !1);
    }
    return X.delete(g), X.delete(v), Pe;
  }
  function Go(g) {
    return Vu(g, cf, Zu);
  }
  function Kr(g, v) {
    var R = g.__data__;
    return tf(v) ? R[typeof v == "string" ? "string" : "hash"] : R.map;
  }
  function Rt(g, v) {
    var R = tr(g, v);
    return Yu(R) ? R : void 0;
  }
  function Qu(g) {
    var v = He.call(g, pt), R = g[pt];
    try {
      g[pt] = void 0;
      var U = !0;
    } catch {
    }
    var ee = xo.call(g);
    return U && (v ? g[pt] = R : delete g[pt]), ee;
  }
  var Zu = Mo ? function(g) {
    return g == null ? [] : (g = Object(g), ye(Mo(g), function(v) {
      return ko.call(g, v);
    }));
  } : uf, Ze = ir;
  (ni && Ze(new ni(new ArrayBuffer(1))) != H || rr && Ze(new rr()) != A || ii && Ze(ii.resolve()) != x || oi && Ze(new oi()) != T || ai && Ze(new ai()) != M) && (Ze = function(g) {
    var v = ir(g), R = v == $ ? g.constructor : void 0, U = R ? Et(R) : "";
    if (U)
      switch (U) {
        case Eu:
          return H;
        case yu:
          return A;
        case vu:
          return x;
        case wu:
          return T;
        case _u:
          return M;
      }
    return v;
  });
  function ef(g, v) {
    return v = v ?? a, !!v && (typeof g == "number" || ce.test(g)) && g > -1 && g % 1 == 0 && g < v;
  }
  function tf(g) {
    var v = typeof g;
    return v == "string" || v == "number" || v == "symbol" || v == "boolean" ? g !== "__proto__" : g === null;
  }
  function rf(g) {
    return !!Fo && Fo in g;
  }
  function nf(g) {
    var v = g && g.constructor, R = typeof v == "function" && v.prototype || Wr;
    return g === R;
  }
  function of(g) {
    return xo.call(g);
  }
  function Et(g) {
    if (g != null) {
      try {
        return Do.call(g);
      } catch {
      }
      try {
        return g + "";
      } catch {
      }
    }
    return "";
  }
  function Vo(g, v) {
    return g === v || g !== g && v !== v;
  }
  var af = jo(/* @__PURE__ */ function() {
    return arguments;
  }()) ? jo : function(g) {
    return or(g) && He.call(g, "callee") && !ko.call(g, "callee");
  }, Jr = Array.isArray;
  function sf(g) {
    return g != null && Yo(g.length) && !Wo(g);
  }
  var li = mu || ff;
  function lf(g, v) {
    return Ho(g, v);
  }
  function Wo(g) {
    if (!zo(g))
      return !1;
    var v = ir(g);
    return v == p || v == y || v == d || v == k;
  }
  function Yo(g) {
    return typeof g == "number" && g > -1 && g % 1 == 0 && g <= a;
  }
  function zo(g) {
    var v = typeof g;
    return g != null && (v == "object" || v == "function");
  }
  function or(g) {
    return g != null && typeof g == "object";
  }
  var Xo = pe ? ti(pe) : zu;
  function cf(g) {
    return sf(g) ? Gu(g) : Xu(g);
  }
  function uf() {
    return [];
  }
  function ff() {
    return !1;
  }
  e.exports = lf;
})(Rn, Rn.exports);
var xy = Rn.exports;
Object.defineProperty(Mr, "__esModule", { value: !0 });
Mr.DownloadedUpdateHelper = void 0;
Mr.createTempUpdateFile = By;
const Ly = Nr, Uy = dt, ds = xy, wt = ht, _r = ie;
class ky {
  constructor(t) {
    this.cacheDir = t, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
  }
  get downloadedFileInfo() {
    return this._downloadedFileInfo;
  }
  get file() {
    return this._file;
  }
  get packageFile() {
    return this._packageFile;
  }
  get cacheDirForPendingUpdate() {
    return _r.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, r, n, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return ds(this.versionInfo, r) && ds(this.fileInfo.info, n.info) && await (0, wt.pathExists)(t) ? t : null;
    const o = await this.getValidCachedUpdateFile(n, i);
    return o === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = o, o);
  }
  async setDownloadedFile(t, r, n, i, o, a) {
    this._file = t, this._packageFile = r, this.versionInfo = n, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: o,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, a && await (0, wt.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, wt.emptyDir)(this.cacheDirForPendingUpdate);
    } catch {
    }
  }
  /**
   * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
   * @param fileInfo
   * @param logger
   */
  async getValidCachedUpdateFile(t, r) {
    const n = this.getUpdateInfoFile();
    if (!await (0, wt.pathExists)(n))
      return null;
    let o;
    try {
      o = await (0, wt.readJson)(n);
    } catch (d) {
      let f = "No cached update info available";
      return d.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), f += ` (error on read: ${d.message})`), r.info(f), null;
    }
    if (!((o == null ? void 0 : o.fileName) !== null))
      return r.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== o.sha512)
      return r.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${o.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const s = _r.join(this.cacheDirForPendingUpdate, o.fileName);
    if (!await (0, wt.pathExists)(s))
      return r.info("Cached update file doesn't exist"), null;
    const l = await My(s);
    return t.info.sha512 !== l ? (r.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${l}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = o, s);
  }
  getUpdateInfoFile() {
    return _r.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
Mr.DownloadedUpdateHelper = ky;
function My(e, t = "sha512", r = "base64", n) {
  return new Promise((i, o) => {
    const a = (0, Ly.createHash)(t);
    a.on("error", o).setEncoding(r), (0, Uy.createReadStream)(e, {
      ...n,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", o).on("end", () => {
      a.end(), i(a.read());
    }).pipe(a, { end: !1 });
  });
}
async function By(e, t, r) {
  let n = 0, i = _r.join(t, e);
  for (let o = 0; o < 3; o++)
    try {
      return await (0, wt.unlink)(i), i;
    } catch (a) {
      if (a.code === "ENOENT")
        return i;
      r.warn(`Error on remove temp update file: ${a}`), i = _r.join(t, `${n++}-${e}`);
    }
  return i;
}
var Yn = {}, Ro = {};
Object.defineProperty(Ro, "__esModule", { value: !0 });
Ro.getAppCacheDir = Hy;
const $i = ie, jy = Nn;
function Hy() {
  const e = (0, jy.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || $i.join(e, "AppData", "Local") : process.platform === "darwin" ? t = $i.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || $i.join(e, ".cache"), t;
}
Object.defineProperty(Yn, "__esModule", { value: !0 });
Yn.ElectronAppAdapter = void 0;
const hs = ie, qy = Ro;
class Gy {
  constructor(t = Ct.app) {
    this.app = t;
  }
  whenReady() {
    return this.app.whenReady();
  }
  get version() {
    return this.app.getVersion();
  }
  get name() {
    return this.app.getName();
  }
  get isPackaged() {
    return this.app.isPackaged === !0;
  }
  get appUpdateConfigPath() {
    return this.isPackaged ? hs.join(process.resourcesPath, "app-update.yml") : hs.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, qy.getAppCacheDir)();
  }
  quit() {
    this.app.quit();
  }
  relaunch() {
    this.app.relaunch();
  }
  onQuit(t) {
    this.app.once("quit", (r, n) => t(n));
  }
}
Yn.ElectronAppAdapter = Gy;
var Xc = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = r;
  const t = de;
  e.NET_SESSION_NAME = "electron-updater";
  function r() {
    return Ct.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class n extends t.HttpExecutor {
    constructor(o) {
      super(), this.proxyLoginCallback = o, this.cachedSession = null;
    }
    async download(o, a, s) {
      return await s.cancellationToken.createPromise((l, d, f) => {
        const c = {
          headers: s.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(o, c), (0, t.configureRequestOptions)(c), this.doDownload(c, {
          destination: a,
          options: s,
          onCancel: f,
          callback: (h) => {
            h == null ? l(a) : d(h);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(o, a) {
      o.headers && o.headers.Host && (o.host = o.headers.Host, delete o.headers.Host), this.cachedSession == null && (this.cachedSession = r());
      const s = Ct.net.request({
        ...o,
        session: this.cachedSession
      });
      return s.on("response", a), this.proxyLoginCallback != null && s.on("login", this.proxyLoginCallback), s;
    }
    addRedirectHandlers(o, a, s, l, d) {
      o.on("redirect", (f, c, h) => {
        o.abort(), l > this.maxRedirects ? s(this.createMaxRedirectError()) : d(t.HttpExecutor.prepareRedirectUrlOptions(h, a));
      });
    }
  }
  e.ElectronHttpExecutor = n;
})(Xc);
var Br = {}, De = {}, Vy = 1 / 0, Wy = "[object Symbol]", Kc = /[\\^$.*+?()[\]{}|]/g, Yy = RegExp(Kc.source), zy = typeof Ue == "object" && Ue && Ue.Object === Object && Ue, Xy = typeof self == "object" && self && self.Object === Object && self, Ky = zy || Xy || Function("return this")(), Jy = Object.prototype, Qy = Jy.toString, ps = Ky.Symbol, ms = ps ? ps.prototype : void 0, gs = ms ? ms.toString : void 0;
function Zy(e) {
  if (typeof e == "string")
    return e;
  if (tv(e))
    return gs ? gs.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -Vy ? "-0" : t;
}
function ev(e) {
  return !!e && typeof e == "object";
}
function tv(e) {
  return typeof e == "symbol" || ev(e) && Qy.call(e) == Wy;
}
function rv(e) {
  return e == null ? "" : Zy(e);
}
function nv(e) {
  return e = rv(e), e && Yy.test(e) ? e.replace(Kc, "\\$&") : e;
}
var iv = nv;
Object.defineProperty(De, "__esModule", { value: !0 });
De.newBaseUrl = av;
De.newUrlFromBase = Xi;
De.getChannelFilename = sv;
De.blockmapFiles = lv;
const Jc = Xt, ov = iv;
function av(e) {
  const t = new Jc.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function Xi(e, t, r = !1) {
  const n = new Jc.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? n.search = i : r && (n.search = `noCache=${Date.now().toString(32)}`), n;
}
function sv(e) {
  return `${e}.yml`;
}
function lv(e, t, r) {
  const n = Xi(`${e.pathname}.blockmap`, e);
  return [Xi(`${e.pathname.replace(new RegExp(ov(r), "g"), t)}.blockmap`, e), n];
}
var he = {};
Object.defineProperty(he, "__esModule", { value: !0 });
he.Provider = void 0;
he.findFile = fv;
he.parseUpdateInfo = dv;
he.getFileList = Qc;
he.resolveFiles = hv;
const ut = de, cv = Ee, Es = De;
class uv {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  get isUseMultipleRangeRequest() {
    return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
  }
  getChannelFilePrefix() {
    if (this.runtimeOptions.platform === "linux") {
      const t = process.env.TEST_UPDATER_ARCH || process.arch;
      return "-linux" + (t === "x64" ? "" : `-${t}`);
    } else
      return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
  }
  // due to historical reasons for windows we use channel name without platform specifier
  getDefaultChannelName() {
    return this.getCustomChannelName("latest");
  }
  getCustomChannelName(t) {
    return `${t}${this.getChannelFilePrefix()}`;
  }
  get fileExtraDownloadHeaders() {
    return null;
  }
  setRequestHeaders(t) {
    this.requestHeaders = t;
  }
  /**
   * Method to perform API request only to resolve update info, but not to download update.
   */
  httpRequest(t, r, n) {
    return this.executor.request(this.createRequestOptions(t, r), n);
  }
  createRequestOptions(t, r) {
    const n = {};
    return this.requestHeaders == null ? r != null && (n.headers = r) : n.headers = r == null ? this.requestHeaders : { ...this.requestHeaders, ...r }, (0, ut.configureRequestUrl)(t, n), n;
  }
}
he.Provider = uv;
function fv(e, t, r) {
  if (e.length === 0)
    throw (0, ut.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const n = e.find((i) => i.url.pathname.toLowerCase().endsWith(`.${t}`));
  return n ?? (r == null ? e[0] : e.find((i) => !r.some((o) => i.url.pathname.toLowerCase().endsWith(`.${o}`))));
}
function dv(e, t, r) {
  if (e == null)
    throw (0, ut.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let n;
  try {
    n = (0, cv.load)(e);
  } catch (i) {
    throw (0, ut.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return n;
}
function Qc(e) {
  const t = e.files;
  if (t != null && t.length > 0)
    return t;
  if (e.path != null)
    return [
      {
        url: e.path,
        sha2: e.sha2,
        sha512: e.sha512
      }
    ];
  throw (0, ut.newError)(`No files provided: ${(0, ut.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function hv(e, t, r = (n) => n) {
  const i = Qc(e).map((s) => {
    if (s.sha2 == null && s.sha512 == null)
      throw (0, ut.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, ut.safeStringifyJson)(s)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, Es.newUrlFromBase)(r(s.url), t),
      info: s
    };
  }), o = e.packages, a = o == null ? null : o[process.arch] || o.ia32;
  return a != null && (i[0].packageInfo = {
    ...a,
    path: (0, Es.newUrlFromBase)(r(a.path), t).href
  }), i;
}
Object.defineProperty(Br, "__esModule", { value: !0 });
Br.GenericProvider = void 0;
const ys = de, Oi = De, Ii = he;
class pv extends Ii.Provider {
  constructor(t, r, n) {
    super(n), this.configuration = t, this.updater = r, this.baseUrl = (0, Oi.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, Oi.getChannelFilename)(this.channel), r = (0, Oi.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let n = 0; ; n++)
      try {
        return (0, Ii.parseUpdateInfo)(await this.httpRequest(r), t, r);
      } catch (i) {
        if (i instanceof ys.HttpError && i.statusCode === 404)
          throw (0, ys.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        if (i.code === "ECONNREFUSED" && n < 3) {
          await new Promise((o, a) => {
            try {
              setTimeout(o, 1e3 * n);
            } catch (s) {
              a(s);
            }
          });
          continue;
        }
        throw i;
      }
  }
  resolveFiles(t) {
    return (0, Ii.resolveFiles)(t, this.baseUrl);
  }
}
Br.GenericProvider = pv;
var zn = {}, Xn = {};
Object.defineProperty(Xn, "__esModule", { value: !0 });
Xn.BitbucketProvider = void 0;
const vs = de, Ri = De, Ni = he;
class mv extends Ni.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r;
    const { owner: i, slug: o } = t;
    this.baseUrl = (0, Ri.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${o}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new vs.CancellationToken(), r = (0, Ri.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, Ri.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, void 0, t);
      return (0, Ni.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, vs.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Ni.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: r } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${r}, channel: ${this.channel})`;
  }
}
Xn.BitbucketProvider = mv;
var ft = {};
Object.defineProperty(ft, "__esModule", { value: !0 });
ft.GitHubProvider = ft.BaseGitHubProvider = void 0;
ft.computeReleaseNotes = eu;
const ze = de, Mt = zc, gv = Xt, Bt = De, Ki = he, Pi = /\/tag\/([^/]+)$/;
class Zc extends Ki.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, Bt.newBaseUrl)((0, ze.githubUrl)(t, r));
    const i = r === "github.com" ? "api.github.com" : r;
    this.baseApiUrl = (0, Bt.newBaseUrl)((0, ze.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const r = this.options.host;
    return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${t}` : t;
  }
}
ft.BaseGitHubProvider = Zc;
class Ev extends Zc {
  constructor(t, r, n) {
    super(t, "github.com", n), this.options = t, this.updater = r;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, r, n, i, o;
    const a = new ze.CancellationToken(), s = await this.httpRequest((0, Bt.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, a), l = (0, ze.parseXml)(s);
    let d = l.element("entry", !1, "No published versions on GitHub"), f = null;
    try {
      if (this.updater.allowPrerelease) {
        const _ = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((r = Mt.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) || null;
        if (_ === null)
          f = Pi.exec(d.element("link").attribute("href"))[1];
        else
          for (const S of l.getElements("entry")) {
            const $ = Pi.exec(S.element("link").attribute("href"));
            if ($ === null)
              continue;
            const x = $[1], k = ((n = Mt.prerelease(x)) === null || n === void 0 ? void 0 : n[0]) || null, G = !_ || ["alpha", "beta"].includes(_), T = k !== null && !["alpha", "beta"].includes(String(k));
            if (G && !T && !(_ === "beta" && k === "alpha")) {
              f = x;
              break;
            }
            if (k && k === _) {
              f = x;
              break;
            }
          }
      } else {
        f = await this.getLatestTagName(a);
        for (const _ of l.getElements("entry"))
          if (Pi.exec(_.element("link").attribute("href"))[1] === f) {
            d = _;
            break;
          }
      }
    } catch (_) {
      throw (0, ze.newError)(`Cannot parse releases feed: ${_.stack || _.message},
XML:
${s}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (f == null)
      throw (0, ze.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let c, h = "", p = "";
    const y = async (_) => {
      h = (0, Bt.getChannelFilename)(_), p = (0, Bt.newUrlFromBase)(this.getBaseDownloadPath(String(f), h), this.baseUrl);
      const S = this.createRequestOptions(p);
      try {
        return await this.executor.request(S, a);
      } catch ($) {
        throw $ instanceof ze.HttpError && $.statusCode === 404 ? (0, ze.newError)(`Cannot find ${h} in the latest release artifacts (${p}): ${$.stack || $.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : $;
      }
    };
    try {
      let _ = this.channel;
      this.updater.allowPrerelease && (!((i = Mt.prerelease(f)) === null || i === void 0) && i[0]) && (_ = this.getCustomChannelName(String((o = Mt.prerelease(f)) === null || o === void 0 ? void 0 : o[0]))), c = await y(_);
    } catch (_) {
      if (this.updater.allowPrerelease)
        c = await y(this.getDefaultChannelName());
      else
        throw _;
    }
    const A = (0, Ki.parseUpdateInfo)(c, h, p);
    return A.releaseName == null && (A.releaseName = d.elementValueOrEmpty("title")), A.releaseNotes == null && (A.releaseNotes = eu(this.updater.currentVersion, this.updater.fullChangelog, l, d)), {
      tag: f,
      ...A
    };
  }
  async getLatestTagName(t) {
    const r = this.options, n = r.host == null || r.host === "github.com" ? (0, Bt.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new gv.URL(`${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(n, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, ze.newError)(`Unable to find latest version on GitHub (${n}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, Ki.resolveFiles)(t, this.baseUrl, (r) => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, r) {
    return `${this.basePath}/download/${t}/${r}`;
  }
}
ft.GitHubProvider = Ev;
function ws(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function eu(e, t, r, n) {
  if (!t)
    return ws(n);
  const i = [];
  for (const o of r.getElements("entry")) {
    const a = /\/tag\/v?([^/]+)$/.exec(o.element("link").attribute("href"))[1];
    Mt.lt(e, a) && i.push({
      version: a,
      note: ws(o)
    });
  }
  return i.sort((o, a) => Mt.rcompare(o.version, a.version));
}
var Kn = {};
Object.defineProperty(Kn, "__esModule", { value: !0 });
Kn.KeygenProvider = void 0;
const _s = de, Di = De, Fi = he;
class yv extends Fi.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r, this.baseUrl = (0, Di.newBaseUrl)(`https://api.keygen.sh/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new _s.CancellationToken(), r = (0, Di.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, Di.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, Fi.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, _s.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Fi.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: r, platform: n } = this.configuration;
    return `Keygen (account: ${t}, product: ${r}, platform: ${n}, channel: ${this.channel})`;
  }
}
Kn.KeygenProvider = yv;
var Jn = {};
Object.defineProperty(Jn, "__esModule", { value: !0 });
Jn.PrivateGitHubProvider = void 0;
const Ft = de, vv = Ee, wv = ie, As = Xt, Ts = De, _v = ft, Av = he;
class Tv extends _v.BaseGitHubProvider {
  constructor(t, r, n, i) {
    super(t, "api.github.com", i), this.updater = r, this.token = n;
  }
  createRequestOptions(t, r) {
    const n = super.createRequestOptions(t, r);
    return n.redirect = "manual", n;
  }
  async getLatestVersion() {
    const t = new Ft.CancellationToken(), r = (0, Ts.getChannelFilename)(this.getDefaultChannelName()), n = await this.getLatestVersionInfo(t), i = n.assets.find((s) => s.name === r);
    if (i == null)
      throw (0, Ft.newError)(`Cannot find ${r} in the release ${n.html_url || n.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const o = new As.URL(i.url);
    let a;
    try {
      a = (0, vv.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
    } catch (s) {
      throw s instanceof Ft.HttpError && s.statusCode === 404 ? (0, Ft.newError)(`Cannot find ${r} in the latest release artifacts (${o}): ${s.stack || s.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : s;
    }
    return a.assets = n.assets, a;
  }
  get fileExtraDownloadHeaders() {
    return this.configureHeaders("application/octet-stream");
  }
  configureHeaders(t) {
    return {
      accept: t,
      authorization: `token ${this.token}`
    };
  }
  async getLatestVersionInfo(t) {
    const r = this.updater.allowPrerelease;
    let n = this.basePath;
    r || (n = `${n}/latest`);
    const i = (0, Ts.newUrlFromBase)(n, this.baseUrl);
    try {
      const o = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      return r ? o.find((a) => a.prerelease) || o[0] : o;
    } catch (o) {
      throw (0, Ft.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${o.stack || o.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, Av.getFileList)(t).map((r) => {
      const n = wv.posix.basename(r.url).replace(/ /g, "-"), i = t.assets.find((o) => o != null && o.name === n);
      if (i == null)
        throw (0, Ft.newError)(`Cannot find asset "${n}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new As.URL(i.url),
        info: r
      };
    });
  }
}
Jn.PrivateGitHubProvider = Tv;
Object.defineProperty(zn, "__esModule", { value: !0 });
zn.isUrlProbablySupportMultiRangeRequests = tu;
zn.createClient = Ov;
const fn = de, Sv = Xn, Ss = Br, Cv = ft, bv = Kn, $v = Jn;
function tu(e) {
  return !e.includes("s3.amazonaws.com");
}
function Ov(e, t, r) {
  if (typeof e == "string")
    throw (0, fn.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const n = e.provider;
  switch (n) {
    case "github": {
      const i = e, o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return o == null ? new Cv.GitHubProvider(i, t, r) : new $v.PrivateGitHubProvider(i, t, o, r);
    }
    case "bitbucket":
      return new Sv.BitbucketProvider(e, t, r);
    case "keygen":
      return new bv.KeygenProvider(e, t, r);
    case "s3":
    case "spaces":
      return new Ss.GenericProvider({
        provider: "generic",
        url: (0, fn.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...r,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new Ss.GenericProvider(i, t, {
        ...r,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && tu(i.url)
      });
    }
    case "custom": {
      const i = e, o = i.updateProvider;
      if (!o)
        throw (0, fn.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new o(i, t, r);
    }
    default:
      throw (0, fn.newError)(`Unsupported provider: ${n}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var Qn = {}, jr = {}, Zt = {}, It = {};
Object.defineProperty(It, "__esModule", { value: !0 });
It.OperationKind = void 0;
It.computeOperations = Iv;
var At;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(At || (It.OperationKind = At = {}));
function Iv(e, t, r) {
  const n = bs(e.files), i = bs(t.files);
  let o = null;
  const a = t.files[0], s = [], l = a.name, d = n.get(l);
  if (d == null)
    throw new Error(`no file ${l} in old blockmap`);
  const f = i.get(l);
  let c = 0;
  const { checksumToOffset: h, checksumToOldSize: p } = Nv(n.get(l), d.offset, r);
  let y = a.offset;
  for (let A = 0; A < f.checksums.length; y += f.sizes[A], A++) {
    const _ = f.sizes[A], S = f.checksums[A];
    let $ = h.get(S);
    $ != null && p.get(S) !== _ && (r.warn(`Checksum ("${S}") matches, but size differs (old: ${p.get(S)}, new: ${_})`), $ = void 0), $ === void 0 ? (c++, o != null && o.kind === At.DOWNLOAD && o.end === y ? o.end += _ : (o = {
      kind: At.DOWNLOAD,
      start: y,
      end: y + _
      // oldBlocks: null,
    }, Cs(o, s, S, A))) : o != null && o.kind === At.COPY && o.end === $ ? o.end += _ : (o = {
      kind: At.COPY,
      start: $,
      end: $ + _
      // oldBlocks: [checksum]
    }, Cs(o, s, S, A));
  }
  return c > 0 && r.info(`File${a.name === "file" ? "" : " " + a.name} has ${c} changed blocks`), s;
}
const Rv = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function Cs(e, t, r, n) {
  if (Rv && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const o = [i.start, i.end, e.start, e.end].reduce((a, s) => a < s ? a : s);
      throw new Error(`operation (block index: ${n}, checksum: ${r}, kind: ${At[e.kind]}) overlaps previous operation (checksum: ${r}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - o} until ${i.end - o} and ${e.start - o} until ${e.end - o}`);
    }
  }
  t.push(e);
}
function Nv(e, t, r) {
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let o = t;
  for (let a = 0; a < e.checksums.length; a++) {
    const s = e.checksums[a], l = e.sizes[a], d = i.get(s);
    if (d === void 0)
      n.set(s, o), i.set(s, l);
    else if (r.debug != null) {
      const f = d === l ? "(same size)" : `(size: ${d}, this size: ${l})`;
      r.debug(`${s} duplicated in blockmap ${f}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    o += l;
  }
  return { checksumToOffset: n, checksumToOldSize: i };
}
function bs(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    t.set(r.name, r);
  return t;
}
Object.defineProperty(Zt, "__esModule", { value: !0 });
Zt.DataSplitter = void 0;
Zt.copyData = ru;
const dn = de, Pv = dt, Dv = Pr, Fv = It, $s = Buffer.from(`\r
\r
`);
var rt;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(rt || (rt = {}));
function ru(e, t, r, n, i) {
  const o = (0, Pv.createReadStream)("", {
    fd: r,
    autoClose: !1,
    start: e.start,
    // end is inclusive
    end: e.end - 1
  });
  o.on("error", n), o.once("end", i), o.pipe(t, {
    end: !1
  });
}
class xv extends Dv.Writable {
  constructor(t, r, n, i, o, a) {
    super(), this.out = t, this.options = r, this.partIndexToTaskIndex = n, this.partIndexToLength = o, this.finishHandler = a, this.partIndex = -1, this.headerListBuffer = null, this.readState = rt.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
  }
  get isFinished() {
    return this.partIndex === this.partIndexToLength.length;
  }
  // noinspection JSUnusedGlobalSymbols
  _write(t, r, n) {
    if (this.isFinished) {
      console.error(`Trailing ignored data: ${t.length} bytes`);
      return;
    }
    this.handleData(t).then(n).catch(n);
  }
  async handleData(t) {
    let r = 0;
    if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
      throw (0, dn.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const n = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= n, r = n;
    } else if (this.remainingPartDataCount > 0) {
      const n = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= n, await this.processPartData(t, 0, n), r = n;
    }
    if (r !== t.length) {
      if (this.readState === rt.HEADER) {
        const n = this.searchHeaderListEnd(t, r);
        if (n === -1)
          return;
        r = n, this.readState = rt.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === rt.BODY)
          this.readState = rt.INIT;
        else {
          this.partIndex++;
          let a = this.partIndexToTaskIndex.get(this.partIndex);
          if (a == null)
            if (this.isFinished)
              a = this.options.end;
            else
              throw (0, dn.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const s = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (s < a)
            await this.copyExistingData(s, a);
          else if (s > a)
            throw (0, dn.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (r = this.searchHeaderListEnd(t, r), r === -1) {
            this.readState = rt.HEADER;
            return;
          }
        }
        const n = this.partIndexToLength[this.partIndex], i = r + n, o = Math.min(i, t.length);
        if (await this.processPartStarted(t, r, o), this.remainingPartDataCount = n - (o - r), this.remainingPartDataCount > 0)
          return;
        if (r = i + this.boundaryLength, r >= t.length) {
          this.ignoreByteCount = this.boundaryLength - (t.length - i);
          return;
        }
      }
    }
  }
  copyExistingData(t, r) {
    return new Promise((n, i) => {
      const o = () => {
        if (t === r) {
          n();
          return;
        }
        const a = this.options.tasks[t];
        if (a.kind !== Fv.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        ru(a, this.out, this.options.oldFileFd, i, () => {
          t++, o();
        });
      };
      o();
    });
  }
  searchHeaderListEnd(t, r) {
    const n = t.indexOf($s, r);
    if (n !== -1)
      return n + $s.length;
    const i = r === 0 ? t : t.slice(r);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, dn.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
    this.actualPartLength = 0;
  }
  processPartStarted(t, r, n) {
    return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, r, n);
  }
  processPartData(t, r, n) {
    this.actualPartLength += n - r;
    const i = this.out;
    return i.write(r === 0 && t.length === n ? t : t.slice(r, n)) ? Promise.resolve() : new Promise((o, a) => {
      i.on("error", a), i.once("drain", () => {
        i.removeListener("error", a), o();
      });
    });
  }
}
Zt.DataSplitter = xv;
var Zn = {};
Object.defineProperty(Zn, "__esModule", { value: !0 });
Zn.executeTasksUsingMultipleRangeRequests = Lv;
Zn.checkIsRangesSupported = Qi;
const Ji = de, Os = Zt, Is = It;
function Lv(e, t, r, n, i) {
  const o = (a) => {
    if (a >= t.length) {
      e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
      return;
    }
    const s = a + 1e3;
    Uv(e, {
      tasks: t,
      start: a,
      end: Math.min(t.length, s),
      oldFileFd: n
    }, r, () => o(s), i);
  };
  return o;
}
function Uv(e, t, r, n, i) {
  let o = "bytes=", a = 0;
  const s = /* @__PURE__ */ new Map(), l = [];
  for (let c = t.start; c < t.end; c++) {
    const h = t.tasks[c];
    h.kind === Is.OperationKind.DOWNLOAD && (o += `${h.start}-${h.end - 1}, `, s.set(a, c), a++, l.push(h.end - h.start));
  }
  if (a <= 1) {
    const c = (h) => {
      if (h >= t.end) {
        n();
        return;
      }
      const p = t.tasks[h++];
      if (p.kind === Is.OperationKind.COPY)
        (0, Os.copyData)(p, r, t.oldFileFd, i, () => c(h));
      else {
        const y = e.createRequestOptions();
        y.headers.Range = `bytes=${p.start}-${p.end - 1}`;
        const A = e.httpExecutor.createRequest(y, (_) => {
          Qi(_, i) && (_.pipe(r, {
            end: !1
          }), _.once("end", () => c(h)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(A, i), A.end();
      }
    };
    c(t.start);
    return;
  }
  const d = e.createRequestOptions();
  d.headers.Range = o.substring(0, o.length - 2);
  const f = e.httpExecutor.createRequest(d, (c) => {
    if (!Qi(c, i))
      return;
    const h = (0, Ji.safeGetHeader)(c, "content-type"), p = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(h);
    if (p == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${h}"`));
      return;
    }
    const y = new Os.DataSplitter(r, t, s, p[1] || p[2], l, n);
    y.on("error", i), c.pipe(y), c.on("end", () => {
      setTimeout(() => {
        f.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(f, i), f.end();
}
function Qi(e, t) {
  if (e.statusCode >= 400)
    return t((0, Ji.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const r = (0, Ji.safeGetHeader)(e, "accept-ranges");
    if (r == null || r === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var ei = {};
Object.defineProperty(ei, "__esModule", { value: !0 });
ei.ProgressDifferentialDownloadCallbackTransform = void 0;
const kv = Pr;
var jt;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(jt || (jt = {}));
class Mv extends kv.Transform {
  constructor(t, r, n) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = jt.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == jt.COPY) {
      n(null, t);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  beginFileCopy() {
    this.operationType = jt.COPY;
  }
  beginRangeDownload() {
    this.operationType = jt.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
  }
  endRangeDownload() {
    this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    });
  }
  // Called when we are 100% done with the connection/download
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, this.transferred = 0, t(null);
  }
}
ei.ProgressDifferentialDownloadCallbackTransform = Mv;
Object.defineProperty(jr, "__esModule", { value: !0 });
jr.DifferentialDownloader = void 0;
const ur = de, xi = ht, Bv = dt, jv = Zt, Hv = Xt, hn = It, Rs = Zn, qv = ei;
class Gv {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(t, r, n) {
    this.blockAwareFileInfo = t, this.httpExecutor = r, this.options = n, this.fileMetadataBuffer = null, this.logger = n.logger;
  }
  createRequestOptions() {
    const t = {
      headers: {
        ...this.options.requestHeaders,
        accept: "*/*"
      }
    };
    return (0, ur.configureRequestUrl)(this.options.newUrl, t), (0, ur.configureRequestOptions)(t), t;
  }
  doDownload(t, r) {
    if (t.version !== r.version)
      throw new Error(`version is different (${t.version} - ${r.version}), full download is required`);
    const n = this.logger, i = (0, hn.computeOperations)(t, r, n);
    n.debug != null && n.debug(JSON.stringify(i, null, 2));
    let o = 0, a = 0;
    for (const l of i) {
      const d = l.end - l.start;
      l.kind === hn.OperationKind.DOWNLOAD ? o += d : a += d;
    }
    const s = this.blockAwareFileInfo.size;
    if (o + a + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== s)
      throw new Error(`Internal error, size mismatch: downloadSize: ${o}, copySize: ${a}, newSize: ${s}`);
    return n.info(`Full: ${Ns(s)}, To download: ${Ns(o)} (${Math.round(o / (s / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const r = [], n = () => Promise.all(r.map((i) => (0, xi.close)(i.descriptor).catch((o) => {
      this.logger.error(`cannot close file "${i.path}": ${o}`);
    })));
    return this.doDownloadFile(t, r).then(n).catch((i) => n().catch((o) => {
      try {
        this.logger.error(`cannot close files: ${o}`);
      } catch (a) {
        try {
          console.error(a);
        } catch {
        }
      }
      throw i;
    }).then(() => {
      throw i;
    }));
  }
  async doDownloadFile(t, r) {
    const n = await (0, xi.open)(this.options.oldFile, "r");
    r.push({ descriptor: n, path: this.options.oldFile });
    const i = await (0, xi.open)(this.options.newFile, "w");
    r.push({ descriptor: i, path: this.options.newFile });
    const o = (0, Bv.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((a, s) => {
      const l = [];
      let d;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const S = [];
        let $ = 0;
        for (const k of t)
          k.kind === hn.OperationKind.DOWNLOAD && (S.push(k.end - k.start), $ += k.end - k.start);
        const x = {
          expectedByteCounts: S,
          grandTotal: $
        };
        d = new qv.ProgressDifferentialDownloadCallbackTransform(x, this.options.cancellationToken, this.options.onProgress), l.push(d);
      }
      const f = new ur.DigestTransform(this.blockAwareFileInfo.sha512);
      f.isValidateOnEnd = !1, l.push(f), o.on("finish", () => {
        o.close(() => {
          r.splice(1, 1);
          try {
            f.validate();
          } catch (S) {
            s(S);
            return;
          }
          a(void 0);
        });
      }), l.push(o);
      let c = null;
      for (const S of l)
        S.on("error", s), c == null ? c = S : c = c.pipe(S);
      const h = l[0];
      let p;
      if (this.options.isUseMultipleRangeRequest) {
        p = (0, Rs.executeTasksUsingMultipleRangeRequests)(this, t, h, n, s), p(0);
        return;
      }
      let y = 0, A = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const _ = this.createRequestOptions();
      _.redirect = "manual", p = (S) => {
        var $, x;
        if (S >= t.length) {
          this.fileMetadataBuffer != null && h.write(this.fileMetadataBuffer), h.end();
          return;
        }
        const k = t[S++];
        if (k.kind === hn.OperationKind.COPY) {
          d && d.beginFileCopy(), (0, jv.copyData)(k, h, n, s, () => p(S));
          return;
        }
        const G = `bytes=${k.start}-${k.end - 1}`;
        _.headers.range = G, (x = ($ = this.logger) === null || $ === void 0 ? void 0 : $.debug) === null || x === void 0 || x.call($, `download range: ${G}`), d && d.beginRangeDownload();
        const T = this.httpExecutor.createRequest(_, (I) => {
          I.on("error", s), I.on("aborted", () => {
            s(new Error("response has been aborted by the server"));
          }), I.statusCode >= 400 && s((0, ur.createHttpError)(I)), I.pipe(h, {
            end: !1
          }), I.once("end", () => {
            d && d.endRangeDownload(), ++y === 100 ? (y = 0, setTimeout(() => p(S), 1e3)) : p(S);
          });
        });
        T.on("redirect", (I, F, E) => {
          this.logger.info(`Redirect to ${Vv(E)}`), A = E, (0, ur.configureRequestUrl)(new Hv.URL(A), _), T.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(T, s), T.end();
      }, p(0);
    });
  }
  async readRemoteBytes(t, r) {
    const n = Buffer.allocUnsafe(r + 1 - t), i = this.createRequestOptions();
    i.headers.range = `bytes=${t}-${r}`;
    let o = 0;
    if (await this.request(i, (a) => {
      a.copy(n, o), o += a.length;
    }), o !== n.length)
      throw new Error(`Received data length ${o} is not equal to expected ${n.length}`);
    return n;
  }
  request(t, r) {
    return new Promise((n, i) => {
      const o = this.httpExecutor.createRequest(t, (a) => {
        (0, Rs.checkIsRangesSupported)(a, i) && (a.on("error", i), a.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), a.on("data", r), a.on("end", () => n()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(o, i), o.end();
    });
  }
}
jr.DifferentialDownloader = Gv;
function Ns(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function Vv(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(Qn, "__esModule", { value: !0 });
Qn.GenericDifferentialDownloader = void 0;
const Wv = jr;
class Yv extends Wv.DifferentialDownloader {
  download(t, r) {
    return this.doDownload(t, r);
  }
}
Qn.GenericDifferentialDownloader = Yv;
var Ps;
function No() {
  if (Ps) return vt;
  Ps = 1, Object.defineProperty(vt, "__esModule", { value: !0 }), vt.NoOpLogger = vt.AppUpdater = void 0;
  const e = de, t = Nr, r = Nn, n = Xs, i = ht, o = Ee, a = jn, s = ie, l = zc, d = Mr, f = Yn, c = Xc, h = Br, p = er(), y = zn, A = Qs, _ = De, S = Qn;
  let $ = class nu extends n.EventEmitter {
    /**
     * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
     */
    get channel() {
      return this._channel;
    }
    /**
     * Set the update channel. Overrides `channel` in the update configuration.
     *
     * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
     */
    set channel(T) {
      if (this._channel != null) {
        if (typeof T != "string")
          throw (0, e.newError)(`Channel must be a string, but got: ${T}`, "ERR_UPDATER_INVALID_CHANNEL");
        if (T.length === 0)
          throw (0, e.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
      }
      this._channel = T, this.allowDowngrade = !0;
    }
    /**
     *  Shortcut for explicitly adding auth tokens to request headers
     */
    addAuthHeader(T) {
      this.requestHeaders = Object.assign({}, this.requestHeaders, {
        authorization: T
      });
    }
    // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    get netSession() {
      return (0, c.getNetSession)();
    }
    /**
     * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
     * Set it to `null` if you would like to disable a logging feature.
     */
    get logger() {
      return this._logger;
    }
    set logger(T) {
      this._logger = T ?? new k();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * test only
     * @private
     */
    set updateConfigPath(T) {
      this.clientPromise = null, this._appUpdateConfigPath = T, this.configOnDisk = new a.Lazy(() => this.loadUpdateConfig());
    }
    constructor(T, I) {
      super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new p.UpdaterSignal(this), this._appUpdateConfigPath = null, this.clientPromise = null, this.stagingUserIdPromise = new a.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new a.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (M) => {
        this._logger.error(`Error: ${M.stack || M.message}`);
      }), I == null ? (this.app = new f.ElectronAppAdapter(), this.httpExecutor = new c.ElectronHttpExecutor((M, B) => this.emit("login", M, B))) : (this.app = I, this.httpExecutor = null);
      const F = this.app.version, E = (0, l.parse)(F);
      if (E == null)
        throw (0, e.newError)(`App version is not a valid semver version: "${F}"`, "ERR_UPDATER_INVALID_VERSION");
      this.currentVersion = E, this.allowPrerelease = x(E), T != null && (this.setFeedURL(T), typeof T != "string" && T.requestHeaders && (this.requestHeaders = T.requestHeaders));
    }
    //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    getFeedURL() {
      return "Deprecated. Do not use it.";
    }
    /**
     * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
     * @param options If you want to override configuration in the `app-update.yml`.
     */
    setFeedURL(T) {
      const I = this.createProviderRuntimeOptions();
      let F;
      typeof T == "string" ? F = new h.GenericProvider({ provider: "generic", url: T }, this, {
        ...I,
        isUseMultipleRangeRequest: (0, y.isUrlProbablySupportMultiRangeRequests)(T)
      }) : F = (0, y.createClient)(T, this, I), this.clientPromise = Promise.resolve(F);
    }
    /**
     * Asks the server whether there is an update.
     */
    checkForUpdates() {
      if (!this.isUpdaterActive())
        return Promise.resolve(null);
      let T = this.checkForUpdatesPromise;
      if (T != null)
        return this._logger.info("Checking for update (already in progress)"), T;
      const I = () => this.checkForUpdatesPromise = null;
      return this._logger.info("Checking for update"), T = this.doCheckForUpdates().then((F) => (I(), F)).catch((F) => {
        throw I(), this.emit("error", F, `Cannot check for updates: ${(F.stack || F).toString()}`), F;
      }), this.checkForUpdatesPromise = T, T;
    }
    isUpdaterActive() {
      return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
    }
    // noinspection JSUnusedGlobalSymbols
    checkForUpdatesAndNotify(T) {
      return this.checkForUpdates().then((I) => I != null && I.downloadPromise ? (I.downloadPromise.then(() => {
        const F = nu.formatDownloadNotification(I.updateInfo.version, this.app.name, T);
        new Ct.Notification(F).show();
      }), I) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), I));
    }
    static formatDownloadNotification(T, I, F) {
      return F == null && (F = {
        title: "A new update is ready to install",
        body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
      }), F = {
        title: F.title.replace("{appName}", I).replace("{version}", T),
        body: F.body.replace("{appName}", I).replace("{version}", T)
      }, F;
    }
    async isStagingMatch(T) {
      const I = T.stagingPercentage;
      let F = I;
      if (F == null)
        return !0;
      if (F = parseInt(F, 10), isNaN(F))
        return this._logger.warn(`Staging percentage is NaN: ${I}`), !0;
      F = F / 100;
      const E = await this.stagingUserIdPromise.value, B = e.UUID.parse(E).readUInt32BE(12) / 4294967295;
      return this._logger.info(`Staging percentage: ${F}, percentage: ${B}, user id: ${E}`), B < F;
    }
    computeFinalHeaders(T) {
      return this.requestHeaders != null && Object.assign(T, this.requestHeaders), T;
    }
    async isUpdateAvailable(T) {
      const I = (0, l.parse)(T.version);
      if (I == null)
        throw (0, e.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${T.version}"`, "ERR_UPDATER_INVALID_VERSION");
      const F = this.currentVersion;
      if ((0, l.eq)(I, F))
        return !1;
      const E = T == null ? void 0 : T.minimumSystemVersion, M = (0, r.release)();
      if (E)
        try {
          if ((0, l.lt)(M, E))
            return this._logger.info(`Current OS version ${M} is less than the minimum OS version required ${E} for version ${M}`), !1;
        } catch (N) {
          this._logger.warn(`Failed to compare current OS version(${M}) with minimum OS version(${E}): ${(N.message || N).toString()}`);
        }
      if (!await this.isStagingMatch(T))
        return !1;
      const H = (0, l.gt)(I, F), Y = (0, l.lt)(I, F);
      return H ? !0 : this.allowDowngrade && Y;
    }
    async getUpdateInfoAndProvider() {
      await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((F) => (0, y.createClient)(F, this, this.createProviderRuntimeOptions())));
      const T = await this.clientPromise, I = await this.stagingUserIdPromise.value;
      return T.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": I })), {
        info: await T.getLatestVersion(),
        provider: T
      };
    }
    createProviderRuntimeOptions() {
      return {
        isUseMultipleRangeRequest: !0,
        platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
        executor: this.httpExecutor
      };
    }
    async doCheckForUpdates() {
      this.emit("checking-for-update");
      const T = await this.getUpdateInfoAndProvider(), I = T.info;
      if (!await this.isUpdateAvailable(I))
        return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${I.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", I), {
          versionInfo: I,
          updateInfo: I
        };
      this.updateInfoAndProvider = T, this.onUpdateAvailable(I);
      const F = new e.CancellationToken();
      return {
        versionInfo: I,
        updateInfo: I,
        cancellationToken: F,
        downloadPromise: this.autoDownload ? this.downloadUpdate(F) : null
      };
    }
    onUpdateAvailable(T) {
      this._logger.info(`Found version ${T.version} (url: ${(0, e.asArray)(T.files).map((I) => I.url).join(", ")})`), this.emit("update-available", T);
    }
    /**
     * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
     * @returns {Promise<Array<string>>} Paths to downloaded files.
     */
    downloadUpdate(T = new e.CancellationToken()) {
      const I = this.updateInfoAndProvider;
      if (I == null) {
        const E = new Error("Please check update first");
        return this.dispatchError(E), Promise.reject(E);
      }
      if (this.downloadPromise != null)
        return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
      this._logger.info(`Downloading update from ${(0, e.asArray)(I.info.files).map((E) => E.url).join(", ")}`);
      const F = (E) => {
        if (!(E instanceof e.CancellationError))
          try {
            this.dispatchError(E);
          } catch (M) {
            this._logger.warn(`Cannot dispatch error event: ${M.stack || M}`);
          }
        return E;
      };
      return this.downloadPromise = this.doDownloadUpdate({
        updateInfoAndProvider: I,
        requestHeaders: this.computeRequestHeaders(I.provider),
        cancellationToken: T,
        disableWebInstaller: this.disableWebInstaller,
        disableDifferentialDownload: this.disableDifferentialDownload
      }).catch((E) => {
        throw F(E);
      }).finally(() => {
        this.downloadPromise = null;
      }), this.downloadPromise;
    }
    dispatchError(T) {
      this.emit("error", T, (T.stack || T).toString());
    }
    dispatchUpdateDownloaded(T) {
      this.emit(p.UPDATE_DOWNLOADED, T);
    }
    async loadUpdateConfig() {
      return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, o.load)(await (0, i.readFile)(this._appUpdateConfigPath, "utf-8"));
    }
    computeRequestHeaders(T) {
      const I = T.fileExtraDownloadHeaders;
      if (I != null) {
        const F = this.requestHeaders;
        return F == null ? I : {
          ...I,
          ...F
        };
      }
      return this.computeFinalHeaders({ accept: "*/*" });
    }
    async getOrCreateStagingUserId() {
      const T = s.join(this.app.userDataPath, ".updaterId");
      try {
        const F = await (0, i.readFile)(T, "utf-8");
        if (e.UUID.check(F))
          return F;
        this._logger.warn(`Staging user id file exists, but content was invalid: ${F}`);
      } catch (F) {
        F.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${F}`);
      }
      const I = e.UUID.v5((0, t.randomBytes)(4096), e.UUID.OID);
      this._logger.info(`Generated new staging user ID: ${I}`);
      try {
        await (0, i.outputFile)(T, I);
      } catch (F) {
        this._logger.warn(`Couldn't write out staging user ID: ${F}`);
      }
      return I;
    }
    /** @internal */
    get isAddNoCacheQuery() {
      const T = this.requestHeaders;
      if (T == null)
        return !0;
      for (const I of Object.keys(T)) {
        const F = I.toLowerCase();
        if (F === "authorization" || F === "private-token")
          return !1;
      }
      return !0;
    }
    async getOrCreateDownloadHelper() {
      let T = this.downloadedUpdateHelper;
      if (T == null) {
        const I = (await this.configOnDisk.value).updaterCacheDirName, F = this._logger;
        I == null && F.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
        const E = s.join(this.app.baseCachePath, I || this.app.name);
        F.debug != null && F.debug(`updater cache dir: ${E}`), T = new d.DownloadedUpdateHelper(E), this.downloadedUpdateHelper = T;
      }
      return T;
    }
    async executeDownload(T) {
      const I = T.fileInfo, F = {
        headers: T.downloadUpdateOptions.requestHeaders,
        cancellationToken: T.downloadUpdateOptions.cancellationToken,
        sha2: I.info.sha2,
        sha512: I.info.sha512
      };
      this.listenerCount(p.DOWNLOAD_PROGRESS) > 0 && (F.onProgress = (K) => this.emit(p.DOWNLOAD_PROGRESS, K));
      const E = T.downloadUpdateOptions.updateInfoAndProvider.info, M = E.version, B = I.packageInfo;
      function H() {
        const K = decodeURIComponent(T.fileInfo.url.pathname);
        return K.endsWith(`.${T.fileExtension}`) ? s.basename(K) : T.fileInfo.info.url;
      }
      const Y = await this.getOrCreateDownloadHelper(), N = Y.cacheDirForPendingUpdate;
      await (0, i.mkdir)(N, { recursive: !0 });
      const C = H();
      let P = s.join(N, C);
      const b = B == null ? null : s.join(N, `package-${M}${s.extname(B.path) || ".7z"}`), L = async (K) => (await Y.setDownloadedFile(P, b, E, I, C, K), await T.done({
        ...E,
        downloadedFile: P
      }), b == null ? [P] : [P, b]), D = this._logger, q = await Y.validateDownloadedPath(P, E, I, D);
      if (q != null)
        return P = q, await L(!1);
      const z = async () => (await Y.clear().catch(() => {
      }), await (0, i.unlink)(P).catch(() => {
      })), W = await (0, d.createTempUpdateFile)(`temp-${C}`, N, D);
      try {
        await T.task(W, F, b, z), await (0, e.retry)(() => (0, i.rename)(W, P), 60, 500, 0, 0, (K) => K instanceof Error && /^EBUSY:/.test(K.message));
      } catch (K) {
        throw await z(), K instanceof e.CancellationError && (D.info("cancelled"), this.emit("update-cancelled", E)), K;
      }
      return D.info(`New version ${M} has been downloaded to ${P}`), await L(!0);
    }
    async differentialDownloadInstaller(T, I, F, E, M) {
      try {
        if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
          return !0;
        const B = (0, _.blockmapFiles)(T.url, this.app.version, I.updateInfoAndProvider.info.version);
        this._logger.info(`Download block maps (old: "${B[0]}", new: ${B[1]})`);
        const H = async (C) => {
          const P = await this.httpExecutor.downloadToBuffer(C, {
            headers: I.requestHeaders,
            cancellationToken: I.cancellationToken
          });
          if (P == null || P.length === 0)
            throw new Error(`Blockmap "${C.href}" is empty`);
          try {
            return JSON.parse((0, A.gunzipSync)(P).toString());
          } catch (b) {
            throw new Error(`Cannot parse blockmap "${C.href}", error: ${b}`);
          }
        }, Y = {
          newUrl: T.url,
          oldFile: s.join(this.downloadedUpdateHelper.cacheDir, M),
          logger: this._logger,
          newFile: F,
          isUseMultipleRangeRequest: E.isUseMultipleRangeRequest,
          requestHeaders: I.requestHeaders,
          cancellationToken: I.cancellationToken
        };
        this.listenerCount(p.DOWNLOAD_PROGRESS) > 0 && (Y.onProgress = (C) => this.emit(p.DOWNLOAD_PROGRESS, C));
        const N = await Promise.all(B.map((C) => H(C)));
        return await new S.GenericDifferentialDownloader(T.info, this.httpExecutor, Y).download(N[0], N[1]), !1;
      } catch (B) {
        if (this._logger.error(`Cannot download differentially, fallback to full download: ${B.stack || B}`), this._testOnlyOptions != null)
          throw B;
        return !0;
      }
    }
  };
  vt.AppUpdater = $;
  function x(G) {
    const T = (0, l.prerelease)(G);
    return T != null && T.length > 0;
  }
  class k {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(T) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warn(T) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(T) {
    }
  }
  return vt.NoOpLogger = k, vt;
}
var Ds;
function Hr() {
  if (Ds) return sr;
  Ds = 1, Object.defineProperty(sr, "__esModule", { value: !0 }), sr.BaseUpdater = void 0;
  const e = Pn, t = No();
  let r = class extends t.AppUpdater {
    constructor(i, o) {
      super(i, o), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
    }
    quitAndInstall(i = !1, o = !1) {
      this._logger.info("Install on explicit quitAndInstall"), this.install(i, i ? o : this.autoRunAppAfterInstall) ? setImmediate(() => {
        Ct.autoUpdater.emit("before-quit-for-update"), this.app.quit();
      }) : this.quitAndInstallCalled = !1;
    }
    executeDownload(i) {
      return super.executeDownload({
        ...i,
        done: (o) => (this.dispatchUpdateDownloaded(o), this.addQuitHandler(), Promise.resolve())
      });
    }
    // must be sync (because quit even handler is not async)
    install(i = !1, o = !1) {
      if (this.quitAndInstallCalled)
        return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
      const a = this.downloadedUpdateHelper, s = a && a.file ? process.platform === "linux" ? a.file.replace(/ /g, "\\ ") : a.file : null, l = a == null ? null : a.downloadedFileInfo;
      if (s == null || l == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      this.quitAndInstallCalled = !0;
      try {
        return this._logger.info(`Install: isSilent: ${i}, isForceRunAfter: ${o}`), this.doInstall({
          installerPath: s,
          isSilent: i,
          isForceRunAfter: o,
          isAdminRightsRequired: l.isAdminRightsRequired
        });
      } catch (d) {
        return this.dispatchError(d), !1;
      }
    }
    addQuitHandler() {
      this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((i) => {
        if (this.quitAndInstallCalled) {
          this._logger.info("Update installer has already been triggered. Quitting application.");
          return;
        }
        if (!this.autoInstallOnAppQuit) {
          this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
          return;
        }
        if (i !== 0) {
          this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${i}`);
          return;
        }
        this._logger.info("Auto install update on quit"), this.install(!0, !1);
      }));
    }
    wrapSudo() {
      const { name: i } = this.app, o = `"${i} would like to update"`, a = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"), s = [a];
      return /kdesudo/i.test(a) ? (s.push("--comment", o), s.push("-c")) : /gksudo/i.test(a) ? s.push("--message", o) : /pkexec/i.test(a) && s.push("--disable-internal-agent"), s.join(" ");
    }
    spawnSyncLog(i, o = [], a = {}) {
      return this._logger.info(`Executing: ${i} with args: ${o}`), (0, e.spawnSync)(i, o, {
        env: { ...process.env, ...a },
        encoding: "utf-8",
        shell: !0
      }).stdout.trim();
    }
    /**
     * This handles both node 8 and node 10 way of emitting error when spawning a process
     *   - node 8: Throws the error
     *   - node 10: Emit the error(Need to listen with on)
     */
    // https://github.com/electron-userland/electron-builder/issues/1129
    // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
    async spawnLog(i, o = [], a = void 0, s = "ignore") {
      return this._logger.info(`Executing: ${i} with args: ${o}`), new Promise((l, d) => {
        try {
          const f = { stdio: s, env: a, detached: !0 }, c = (0, e.spawn)(i, o, f);
          c.on("error", (h) => {
            d(h);
          }), c.unref(), c.pid !== void 0 && l(!0);
        } catch (f) {
          d(f);
        }
      });
    }
  };
  return sr.BaseUpdater = r, sr;
}
var fr = {}, qr = {};
Object.defineProperty(qr, "__esModule", { value: !0 });
qr.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const xt = ht, zv = jr, Xv = Qs;
class Kv extends zv.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, r = t.size, n = r - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
    const i = iu(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await Jv(this.options.oldFile), i);
  }
}
qr.FileWithEmbeddedBlockMapDifferentialDownloader = Kv;
function iu(e) {
  return JSON.parse((0, Xv.inflateRawSync)(e).toString());
}
async function Jv(e) {
  const t = await (0, xt.open)(e, "r");
  try {
    const r = (await (0, xt.fstat)(t)).size, n = Buffer.allocUnsafe(4);
    await (0, xt.read)(t, n, 0, n.length, r - n.length);
    const i = Buffer.allocUnsafe(n.readUInt32BE(0));
    return await (0, xt.read)(t, i, 0, i.length, r - n.length - i.length), await (0, xt.close)(t), iu(i);
  } catch (r) {
    throw await (0, xt.close)(t), r;
  }
}
var Fs;
function xs() {
  if (Fs) return fr;
  Fs = 1, Object.defineProperty(fr, "__esModule", { value: !0 }), fr.AppImageUpdater = void 0;
  const e = de, t = Pn, r = ht, n = dt, i = ie, o = Hr(), a = qr, s = er(), l = he;
  let d = class extends o.BaseUpdater {
    constructor(c, h) {
      super(c, h);
    }
    isUpdaterActive() {
      return process.env.APPIMAGE == null ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
    }
    /*** @private */
    doDownloadUpdate(c) {
      const h = c.updateInfoAndProvider.provider, p = (0, l.findFile)(h.resolveFiles(c.updateInfoAndProvider.info), "AppImage", ["rpm", "deb"]);
      return this.executeDownload({
        fileExtension: "AppImage",
        fileInfo: p,
        downloadUpdateOptions: c,
        task: async (y, A) => {
          const _ = process.env.APPIMAGE;
          if (_ == null)
            throw (0, e.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
          let S = !1;
          try {
            const $ = {
              newUrl: p.url,
              oldFile: _,
              logger: this._logger,
              newFile: y,
              isUseMultipleRangeRequest: h.isUseMultipleRangeRequest,
              requestHeaders: c.requestHeaders,
              cancellationToken: c.cancellationToken
            };
            this.listenerCount(s.DOWNLOAD_PROGRESS) > 0 && ($.onProgress = (x) => this.emit(s.DOWNLOAD_PROGRESS, x)), await new a.FileWithEmbeddedBlockMapDifferentialDownloader(p.info, this.httpExecutor, $).download();
          } catch ($) {
            this._logger.error(`Cannot download differentially, fallback to full download: ${$.stack || $}`), S = process.platform === "linux";
          }
          S && await this.httpExecutor.download(p.url, y, A), await (0, r.chmod)(y, 493);
        }
      });
    }
    doInstall(c) {
      const h = process.env.APPIMAGE;
      if (h == null)
        throw (0, e.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
      (0, n.unlinkSync)(h);
      let p;
      const y = i.basename(h);
      i.basename(c.installerPath) === y || !/\d+\.\d+\.\d+/.test(y) ? p = h : p = i.join(i.dirname(h), i.basename(c.installerPath)), (0, t.execFileSync)("mv", ["-f", c.installerPath, p]), p !== h && this.emit("appimage-filename-updated", p);
      const A = {
        ...process.env,
        APPIMAGE_SILENT_INSTALL: "true"
      };
      return c.isForceRunAfter ? this.spawnLog(p, [], A) : (A.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, t.execFileSync)(p, [], { env: A })), !0;
    }
  };
  return fr.AppImageUpdater = d, fr;
}
var dr = {}, Ls;
function Us() {
  if (Ls) return dr;
  Ls = 1, Object.defineProperty(dr, "__esModule", { value: !0 }), dr.DebUpdater = void 0;
  const e = Hr(), t = er(), r = he;
  let n = class extends e.BaseUpdater {
    constructor(o, a) {
      super(o, a);
    }
    /*** @private */
    doDownloadUpdate(o) {
      const a = o.updateInfoAndProvider.provider, s = (0, r.findFile)(a.resolveFiles(o.updateInfoAndProvider.info), "deb", ["AppImage", "rpm"]);
      return this.executeDownload({
        fileExtension: "deb",
        fileInfo: s,
        downloadUpdateOptions: o,
        task: async (l, d) => {
          this.listenerCount(t.DOWNLOAD_PROGRESS) > 0 && (d.onProgress = (f) => this.emit(t.DOWNLOAD_PROGRESS, f)), await this.httpExecutor.download(s.url, l, d);
        }
      });
    }
    doInstall(o) {
      const a = this.wrapSudo(), s = /pkexec/i.test(a) ? "" : '"', l = ["dpkg", "-i", o.installerPath, "||", "apt-get", "install", "-f", "-y"];
      return this.spawnSyncLog(a, [`${s}/bin/bash`, "-c", `'${l.join(" ")}'${s}`]), o.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return dr.DebUpdater = n, dr;
}
var hr = {}, ks;
function Ms() {
  if (ks) return hr;
  ks = 1, Object.defineProperty(hr, "__esModule", { value: !0 }), hr.RpmUpdater = void 0;
  const e = Hr(), t = er(), r = he;
  let n = class extends e.BaseUpdater {
    constructor(o, a) {
      super(o, a);
    }
    /*** @private */
    doDownloadUpdate(o) {
      const a = o.updateInfoAndProvider.provider, s = (0, r.findFile)(a.resolveFiles(o.updateInfoAndProvider.info), "rpm", ["AppImage", "deb"]);
      return this.executeDownload({
        fileExtension: "rpm",
        fileInfo: s,
        downloadUpdateOptions: o,
        task: async (l, d) => {
          this.listenerCount(t.DOWNLOAD_PROGRESS) > 0 && (d.onProgress = (f) => this.emit(t.DOWNLOAD_PROGRESS, f)), await this.httpExecutor.download(s.url, l, d);
        }
      });
    }
    doInstall(o) {
      const a = o.installerPath, s = this.wrapSudo(), l = /pkexec/i.test(s) ? "" : '"', d = this.spawnSyncLog("which zypper");
      let f;
      return d ? f = [d, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", a] : f = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", a], this.spawnSyncLog(s, [`${l}/bin/bash`, "-c", `'${f.join(" ")}'${l}`]), o.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return hr.RpmUpdater = n, hr;
}
var pr = {}, Bs;
function js() {
  if (Bs) return pr;
  Bs = 1, Object.defineProperty(pr, "__esModule", { value: !0 }), pr.MacUpdater = void 0;
  const e = de, t = ht, r = dt, n = ie, i = gf, o = No(), a = he, s = Pn, l = Nr;
  let d = class extends o.AppUpdater {
    constructor(c, h) {
      super(c, h), this.nativeUpdater = Ct.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (p) => {
        this._logger.warn(p), this.emit("error", p);
      }), this.nativeUpdater.on("update-downloaded", () => {
        this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
      });
    }
    debug(c) {
      this._logger.debug != null && this._logger.debug(c);
    }
    closeServerIfExists() {
      this.server && (this.debug("Closing proxy server"), this.server.close((c) => {
        c && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
      }));
    }
    async doDownloadUpdate(c) {
      let h = c.updateInfoAndProvider.provider.resolveFiles(c.updateInfoAndProvider.info);
      const p = this._logger, y = "sysctl.proc_translated";
      let A = !1;
      try {
        this.debug("Checking for macOS Rosetta environment"), A = (0, s.execFileSync)("sysctl", [y], { encoding: "utf8" }).includes(`${y}: 1`), p.info(`Checked for macOS Rosetta environment (isRosetta=${A})`);
      } catch (G) {
        p.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${G}`);
      }
      let _ = !1;
      try {
        this.debug("Checking for arm64 in uname");
        const T = (0, s.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
        p.info(`Checked 'uname -a': arm64=${T}`), _ = _ || T;
      } catch (G) {
        p.warn(`uname shell command to check for arm64 failed: ${G}`);
      }
      _ = _ || process.arch === "arm64" || A;
      const S = (G) => {
        var T;
        return G.url.pathname.includes("arm64") || ((T = G.info.url) === null || T === void 0 ? void 0 : T.includes("arm64"));
      };
      _ && h.some(S) ? h = h.filter((G) => _ === S(G)) : h = h.filter((G) => !S(G));
      const $ = (0, a.findFile)(h, "zip", ["pkg", "dmg"]);
      if ($ == null)
        throw (0, e.newError)(`ZIP file not provided: ${(0, e.safeStringifyJson)(h)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
      const x = c.updateInfoAndProvider.provider, k = "update.zip";
      return this.executeDownload({
        fileExtension: "zip",
        fileInfo: $,
        downloadUpdateOptions: c,
        task: async (G, T) => {
          const I = n.join(this.downloadedUpdateHelper.cacheDir, k), F = () => (0, t.pathExistsSync)(I) ? !c.disableDifferentialDownload : (p.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
          let E = !0;
          F() && (E = await this.differentialDownloadInstaller($, c, G, x, k)), E && await this.httpExecutor.download($.url, G, T);
        },
        done: (G) => {
          if (!c.disableDifferentialDownload)
            try {
              const T = n.join(this.downloadedUpdateHelper.cacheDir, k);
              (0, r.copyFileSync)(G.downloadedFile, T);
            } catch (T) {
              this._logger.warn(`Unable to copy file for caching for future differential downloads: ${T.message}`);
            }
          return this.updateDownloaded($, G);
        }
      });
    }
    async updateDownloaded(c, h) {
      var p;
      const y = h.downloadedFile, A = (p = c.info.size) !== null && p !== void 0 ? p : (await (0, t.stat)(y)).size, _ = this._logger, S = `fileToProxy=${c.url.href}`;
      this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${S})`), this.server = (0, i.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${S})`), this.server.on("close", () => {
        _.info(`Proxy server for native Squirrel.Mac is closed (${S})`);
      });
      const $ = (x) => {
        const k = x.address();
        return typeof k == "string" ? k : `http://127.0.0.1:${k == null ? void 0 : k.port}`;
      };
      return await new Promise((x, k) => {
        const G = (0, l.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), T = Buffer.from(`autoupdater:${G}`, "ascii"), I = `/${(0, l.randomBytes)(64).toString("hex")}.zip`;
        this.server.on("request", (F, E) => {
          const M = F.url;
          if (_.info(`${M} requested`), M === "/") {
            if (!F.headers.authorization || F.headers.authorization.indexOf("Basic ") === -1) {
              E.statusCode = 401, E.statusMessage = "Invalid Authentication Credentials", E.end(), _.warn("No authenthication info");
              return;
            }
            const Y = F.headers.authorization.split(" ")[1], N = Buffer.from(Y, "base64").toString("ascii"), [C, P] = N.split(":");
            if (C !== "autoupdater" || P !== G) {
              E.statusCode = 401, E.statusMessage = "Invalid Authentication Credentials", E.end(), _.warn("Invalid authenthication credentials");
              return;
            }
            const b = Buffer.from(`{ "url": "${$(this.server)}${I}" }`);
            E.writeHead(200, { "Content-Type": "application/json", "Content-Length": b.length }), E.end(b);
            return;
          }
          if (!M.startsWith(I)) {
            _.warn(`${M} requested, but not supported`), E.writeHead(404), E.end();
            return;
          }
          _.info(`${I} requested by Squirrel.Mac, pipe ${y}`);
          let B = !1;
          E.on("finish", () => {
            B || (this.nativeUpdater.removeListener("error", k), x([]));
          });
          const H = (0, r.createReadStream)(y);
          H.on("error", (Y) => {
            try {
              E.end();
            } catch (N) {
              _.warn(`cannot end response: ${N}`);
            }
            B = !0, this.nativeUpdater.removeListener("error", k), k(new Error(`Cannot pipe "${y}": ${Y}`));
          }), E.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Length": A
          }), H.pipe(E);
        }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${S})`), this.server.listen(0, "127.0.0.1", () => {
          this.debug(`Proxy server for native Squirrel.Mac is listening (address=${$(this.server)}, ${S})`), this.nativeUpdater.setFeedURL({
            url: $(this.server),
            headers: {
              "Cache-Control": "no-cache",
              Authorization: `Basic ${T.toString("base64")}`
            }
          }), this.dispatchUpdateDownloaded(h), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", k), this.nativeUpdater.checkForUpdates()) : x([]);
        });
      });
    }
    quitAndInstall() {
      this.squirrelDownloadedUpdate ? (this.nativeUpdater.quitAndInstall(), this.closeServerIfExists()) : (this.nativeUpdater.on("update-downloaded", () => {
        this.nativeUpdater.quitAndInstall(), this.closeServerIfExists();
      }), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
    }
  };
  return pr.MacUpdater = d, pr;
}
var mr = {}, Po = {};
Object.defineProperty(Po, "__esModule", { value: !0 });
Po.verifySignature = Zv;
const Hs = de, ou = Pn, Qv = Nn, qs = ie;
function Zv(e, t, r) {
  return new Promise((n, i) => {
    const o = t.replace(/'/g, "''");
    r.info(`Verifying signature ${o}`), (0, ou.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${o}' | ConvertTo-Json -Compress"`], {
      shell: !0,
      timeout: 20 * 1e3
    }, (a, s, l) => {
      var d;
      try {
        if (a != null || l) {
          Li(r, a, l, i), n(null);
          return;
        }
        const f = ew(s);
        if (f.Status === 0) {
          try {
            const y = qs.normalize(f.Path), A = qs.normalize(t);
            if (r.info(`LiteralPath: ${y}. Update Path: ${A}`), y !== A) {
              Li(r, new Error(`LiteralPath of ${y} is different than ${A}`), l, i), n(null);
              return;
            }
          } catch (y) {
            r.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(d = y.message) !== null && d !== void 0 ? d : y.stack}`);
          }
          const h = (0, Hs.parseDn)(f.SignerCertificate.Subject);
          let p = !1;
          for (const y of e) {
            const A = (0, Hs.parseDn)(y);
            if (A.size ? p = Array.from(A.keys()).every((S) => A.get(S) === h.get(S)) : y === h.get("CN") && (r.warn(`Signature validated using only CN ${y}. Please add your full Distinguished Name (DN) to publisherNames configuration`), p = !0), p) {
              n(null);
              return;
            }
          }
        }
        const c = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(f, (h, p) => h === "RawData" ? void 0 : p, 2);
        r.warn(`Sign verification failed, installer signed with incorrect certificate: ${c}`), n(c);
      } catch (f) {
        Li(r, f, null, i), n(null);
        return;
      }
    });
  });
}
function ew(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const r = t.SignerCertificate;
  return r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName), t;
}
function Li(e, t, r, n) {
  if (tw()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || r}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, ou.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && n(t), r && n(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${r}. Failing signature validation due to unknown stderr.`));
}
function tw() {
  const e = Qv.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
var Gs;
function Vs() {
  if (Gs) return mr;
  Gs = 1, Object.defineProperty(mr, "__esModule", { value: !0 }), mr.NsisUpdater = void 0;
  const e = de, t = ie, r = Hr(), n = qr, i = er(), o = he, a = ht, s = Po, l = Xt;
  let d = class extends r.BaseUpdater {
    constructor(c, h) {
      super(c, h), this._verifyUpdateCodeSignature = (p, y) => (0, s.verifySignature)(p, y, this._logger);
    }
    /**
     * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
     * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
     */
    get verifyUpdateCodeSignature() {
      return this._verifyUpdateCodeSignature;
    }
    set verifyUpdateCodeSignature(c) {
      c && (this._verifyUpdateCodeSignature = c);
    }
    /*** @private */
    doDownloadUpdate(c) {
      const h = c.updateInfoAndProvider.provider, p = (0, o.findFile)(h.resolveFiles(c.updateInfoAndProvider.info), "exe");
      return this.executeDownload({
        fileExtension: "exe",
        downloadUpdateOptions: c,
        fileInfo: p,
        task: async (y, A, _, S) => {
          const $ = p.packageInfo, x = $ != null && _ != null;
          if (x && c.disableWebInstaller)
            throw (0, e.newError)(`Unable to download new version ${c.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
          !x && !c.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (x || c.disableDifferentialDownload || await this.differentialDownloadInstaller(p, c, y, h, e.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(p.url, y, A);
          const k = await this.verifySignature(y);
          if (k != null)
            throw await S(), (0, e.newError)(`New version ${c.updateInfoAndProvider.info.version} is not signed by the application owner: ${k}`, "ERR_UPDATER_INVALID_SIGNATURE");
          if (x && await this.differentialDownloadWebPackage(c, $, _, h))
            try {
              await this.httpExecutor.download(new l.URL($.path), _, {
                headers: c.requestHeaders,
                cancellationToken: c.cancellationToken,
                sha512: $.sha512
              });
            } catch (G) {
              try {
                await (0, a.unlink)(_);
              } catch {
              }
              throw G;
            }
        }
      });
    }
    // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
    // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
    // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
    async verifySignature(c) {
      let h;
      try {
        if (h = (await this.configOnDisk.value).publisherName, h == null)
          return null;
      } catch (p) {
        if (p.code === "ENOENT")
          return null;
        throw p;
      }
      return await this._verifyUpdateCodeSignature(Array.isArray(h) ? h : [h], c);
    }
    doInstall(c) {
      const h = ["--updated"];
      c.isSilent && h.push("/S"), c.isForceRunAfter && h.push("--force-run"), this.installDirectory && h.push(`/D=${this.installDirectory}`);
      const p = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
      p != null && h.push(`--package-file=${p}`);
      const y = () => {
        this.spawnLog(t.join(process.resourcesPath, "elevate.exe"), [c.installerPath].concat(h)).catch((A) => this.dispatchError(A));
      };
      return c.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), y(), !0) : (this.spawnLog(c.installerPath, h).catch((A) => {
        const _ = A.code;
        this._logger.info(`Cannot run installer: error code: ${_}, error message: "${A.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), _ === "UNKNOWN" || _ === "EACCES" ? y() : _ === "ENOENT" ? Ct.shell.openPath(c.installerPath).catch((S) => this.dispatchError(S)) : this.dispatchError(A);
      }), !0);
    }
    async differentialDownloadWebPackage(c, h, p, y) {
      if (h.blockMapSize == null)
        return !0;
      try {
        const A = {
          newUrl: new l.URL(h.path),
          oldFile: t.join(this.downloadedUpdateHelper.cacheDir, e.CURRENT_APP_PACKAGE_FILE_NAME),
          logger: this._logger,
          newFile: p,
          requestHeaders: this.requestHeaders,
          isUseMultipleRangeRequest: y.isUseMultipleRangeRequest,
          cancellationToken: c.cancellationToken
        };
        this.listenerCount(i.DOWNLOAD_PROGRESS) > 0 && (A.onProgress = (_) => this.emit(i.DOWNLOAD_PROGRESS, _)), await new n.FileWithEmbeddedBlockMapDifferentialDownloader(h, this.httpExecutor, A).download();
      } catch (A) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${A.stack || A}`), process.platform === "win32";
      }
      return !1;
    }
  };
  return mr.NsisUpdater = d, mr;
}
var Ws;
function er() {
  return Ws || (Ws = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.CancellationToken = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
    const t = de;
    Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
      return t.CancellationToken;
    } });
    const r = ht, n = ie;
    var i = Hr();
    Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
      return i.BaseUpdater;
    } });
    var o = No();
    Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
      return o.AppUpdater;
    } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
      return o.NoOpLogger;
    } });
    var a = he;
    Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
      return a.Provider;
    } });
    var s = xs();
    Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
      return s.AppImageUpdater;
    } });
    var l = Us();
    Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
      return l.DebUpdater;
    } });
    var d = Ms();
    Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
      return d.RpmUpdater;
    } });
    var f = js();
    Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
      return f.MacUpdater;
    } });
    var c = Vs();
    Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
      return c.NsisUpdater;
    } });
    let h;
    function p() {
      if (process.platform === "win32")
        h = new (Vs()).NsisUpdater();
      else if (process.platform === "darwin")
        h = new (js()).MacUpdater();
      else {
        h = new (xs()).AppImageUpdater();
        try {
          const _ = n.join(process.resourcesPath, "package-type");
          if (!(0, r.existsSync)(_))
            return h;
          console.info("Checking for beta autoupdate feature for deb/rpm distributions");
          const S = (0, r.readFileSync)(_).toString().trim();
          switch (console.info("Found package-type:", S), S) {
            case "deb":
              h = new (Us()).DebUpdater();
              break;
            case "rpm":
              h = new (Ms()).RpmUpdater();
              break;
            default:
              break;
          }
        } catch (_) {
          console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", _.message);
        }
      }
      return h;
    }
    Object.defineProperty(e, "autoUpdater", {
      enumerable: !0,
      get: () => h || p()
    }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
    class y {
      constructor(S) {
        this.emitter = S;
      }
      /**
       * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
       */
      login(S) {
        A(this.emitter, "login", S);
      }
      progress(S) {
        A(this.emitter, e.DOWNLOAD_PROGRESS, S);
      }
      updateDownloaded(S) {
        A(this.emitter, e.UPDATE_DOWNLOADED, S);
      }
      updateCancelled(S) {
        A(this.emitter, "update-cancelled", S);
      }
    }
    e.UpdaterSignal = y;
    function A(_, S, $) {
      _.on(S, $);
    }
  }(ci)), ci;
}
var zt = er();
const au = at.dirname(hf(import.meta.url));
process.env.APP_ROOT = at.join(au, "..");
const Zi = process.env.VITE_DEV_SERVER_URL, bw = at.join(process.env.APP_ROOT, "dist-electron"), su = at.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Zi ? at.join(process.env.APP_ROOT, "public") : su;
let Xe;
function lu() {
  Xe = new zs({
    icon: at.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      webSecurity: !1,
      contextIsolation: !0,
      preload: at.join(au, "preload.mjs")
    },
    width: 800,
    height: 600
  });
  const e = [
    {
      label: "帮助",
      submenu: [
        {
          label: "关于",
          click() {
            Ys.showMessageBox({
              type: "info",
              title: "关于",
              message: "大胆我真想给你🔪了1.0.3必须🔪🔪🔪🔪了你",
              buttons: ["确定"]
            });
          }
        }
      ]
    }
  ], t = Jo.buildFromTemplate(e);
  Jo.setApplicationMenu(t), Xe.webContents.openDevTools(), Xe.webContents.on("did-finish-load", () => {
    Xe && Xe.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), Zi ? Xe.loadURL(Zi) : Xe.loadFile(at.join(su, "index.html"));
}
zt.autoUpdater.on("update-available", async (e) => {
  (await Ys.showMessageBox(Xe, {
    type: "info",
    title: "更新可用",
    message: `新版本 ${e.version} 可用，您想要下载吗？`,
    buttons: ["下载", "取消"]
  })).response === 0 && zt.autoUpdater.downloadUpdate();
});
zt.autoUpdater.on("download-progress", (e) => {
  const { percent: t } = e;
  console.log(`下载进度: ${t}%`);
});
zt.autoUpdater.on("update-downloaded", () => {
  const e = new df({
    title: "更新下载完成",
    body: "新版本将被安装，应用程序将会重新启动。"
  });
  e.on("click", () => {
    zt.autoUpdater.quitAndInstall();
  }), e.show();
});
yn.on("window-all-closed", () => {
  process.platform !== "darwin" && (yn.quit(), Xe = null);
});
yn.on("activate", () => {
  zs.getAllWindows().length === 0 && lu();
});
yn.whenReady().then(() => {
  lu(), zt.autoUpdater.checkForUpdatesAndNotify();
});
export {
  bw as MAIN_DIST,
  su as RENDERER_DIST,
  Zi as VITE_DEV_SERVER_URL
};
