/* @ds-bundle: {"format":3,"namespace":"ProcureWideDesignSystem_019e2f","components":[{"name":"StatusPill","sourcePath":"components/StatusPill/StatusPill.jsx"}],"sourceHashes":{"components/StatusPill/StatusPill.jsx":"7f692621c58b","site/app.js":"257da2d6bb6d","ui_kits/app/AdminMode.jsx":"678f2e157aac","ui_kits/app/CartPage.jsx":"58a8088a6f7a","ui_kits/app/CustomItems.jsx":"3405ceb22769","ui_kits/app/DiscountsPage.jsx":"a2ce6b0fa98b","ui_kits/app/DocViewer.jsx":"e9002e331183","ui_kits/app/DocumentsPage.jsx":"a75ff0a2f8fe","ui_kits/app/HomePage.jsx":"75c29c4082cd","ui_kits/app/InventoryPage.jsx":"44bffe5973f6","ui_kits/app/OrderDetail.jsx":"468f1ad4fe4e","ui_kits/app/OrderPage.jsx":"4787a47315f7","ui_kits/app/OrdersPage.jsx":"b1cf8e7bf3f6","ui_kits/app/OrdersTable.jsx":"b8c018045b7e","ui_kits/app/RequestForm.jsx":"394ebf2fa92c","ui_kits/app/Sidebar.jsx":"12bd28048dd4","ui_kits/app/assets.js":"75cdc4c7d62a","ui_kits/app/kit.jsx":"3750991fe0fd","ui_kits/app/store-cellsbin.jsx":"5b84277c84d0","ui_kits/app/store.jsx":"27a8057b67e5","ui_kits/app/ui.jsx":"984b5c7ee4b5","ui_kits/app/v1_OrderDetail.jsx":"dd83f1bd777b","ui_kits/app/v1_OrdersTable.jsx":"1a1154e09ea5","ui_kits/app/v1_RequestForm.jsx":"a1073de5986f","ui_kits/app/v1_Sidebar.jsx":"e91dcf20b1be","ui_kits/website/ExampleOrderModal.jsx":"e73f944415a0","ui_kits/website/FAQ.jsx":"6e6c395422aa","ui_kits/website/Footer.jsx":"2202188cc171","ui_kits/website/Hero.jsx":"7aed6a5a005d","ui_kits/website/Nav.jsx":"4bfdd9207a56","ui_kits/website/ProcessSteps.jsx":"a02834a0c0a0","ui_kits/website/ValueGrid.jsx":"69ce2b64e0f7","ui_kits/website/VendorCloud.jsx":"a89137cb8fe8","ui_kits/website/ui.jsx":"984b5c7ee4b5","ui_kits/website/v2_CtaBand.jsx":"5623e51034bb","ui_kits/website/v2_FAQ.jsx":"347a02137b58","ui_kits/website/v2_Footer.jsx":"2f4d268963c8","ui_kits/website/v2_Hero.jsx":"0b51e63166c5","ui_kits/website/v2_Nav.jsx":"3d3af4e6f056","ui_kits/website/v2_Outcomes.jsx":"841b5c6f114e","ui_kits/website/v2_Resources.jsx":"4078270752dc","ui_kits/website/v2_Solutions.jsx":"b18685982aba","ui_kits/website/v2_StatBand.jsx":"753cb84cad7c","ui_kits/website/v2_Testimonial.jsx":"91c9b90efb9d","ui_kits/website/v2_VendorCloud.jsx":"877ec453c9e0"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ProcureWideDesignSystem_019e2f = window.ProcureWideDesignSystem_019e2f || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/StatusPill/StatusPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// StatusPill — ProcureWide's small status/label pill.
// Brand-token styled (reads CSS variables from colors_and_type.css), used across
// the portal for order status, invoice paid/unpaid, and filter chips.
//
// This is the design system's canonical exported component: the compiler picks
// it up via the sibling StatusPill.d.ts + the statuspill.html @dsCard preview,
// and exposes it on window.ProcureWideDesignSystem_<ns>.StatusPill.

const PILL_TONES = {
  neutral: {
    bg: 'var(--pw-paper-2)',
    fg: 'var(--pw-ink-500)',
    dot: 'var(--pw-ink-300)',
    bd: 'var(--pw-line)'
  },
  success: {
    bg: 'var(--pw-green-100)',
    fg: 'var(--pw-green-700)',
    dot: 'var(--pw-green)',
    bd: 'var(--pw-green-300)'
  },
  paid: {
    bg: 'var(--pw-green-100)',
    fg: 'var(--pw-green-700)',
    dot: 'var(--pw-green)',
    bd: 'var(--pw-green-300)'
  },
  warning: {
    bg: '#FCEFD3',
    fg: '#8A6308',
    dot: '#D9971B',
    bd: '#E7C98A'
  },
  danger: {
    bg: '#FBE9E6',
    fg: '#A02A1E',
    dot: '#C0392B',
    bd: '#E7B6AE'
  },
  unpaid: {
    bg: '#FBE9E6',
    fg: '#A02A1E',
    dot: '#C0392B',
    bd: '#E7B6AE'
  },
  info: {
    bg: '#E7EEFB',
    fg: '#1E4FB0',
    dot: 'var(--pw-cobalt, #2A6FDB)',
    bd: '#B7CCF0'
  }
};
const PILL_SIZES = {
  sm: {
    padding: '2px 8px',
    fontSize: 11,
    dot: 5,
    gap: 5
  },
  md: {
    padding: '4px 11px',
    fontSize: 12.5,
    dot: 6,
    gap: 6
  },
  lg: {
    padding: '6px 14px',
    fontSize: 14,
    dot: 8,
    gap: 7
  }
};
function StatusPill({
  children,
  tone = 'neutral',
  size = 'md',
  dot = true,
  style,
  ...rest
}) {
  const t = PILL_TONES[tone] || PILL_TONES.neutral;
  const s = PILL_SIZES[size] || PILL_SIZES.md;
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: s.gap,
      padding: s.padding,
      borderRadius: 999,
      background: t.bg,
      color: t.fg,
      border: `1px solid ${t.bd}`,
      fontFamily: 'var(--pw-font-sans)',
      fontSize: s.fontSize,
      fontWeight: 700,
      lineHeight: 1,
      letterSpacing: '0.01em',
      whiteSpace: 'nowrap',
      ...style
    }
  }), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: s.dot,
      height: s.dot,
      borderRadius: 999,
      background: t.dot,
      flexShrink: 0
    }
  }), children);
}
Object.assign(__ds_scope, { StatusPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/StatusPill/StatusPill.jsx", error: String((e && e.message) || e) }); }

// site/app.js
try { (() => {
/* ProcureWide site — minimal progressive enhancement.
   No dependencies. ~2KB. Everything degrades gracefully without JS. */
(function () {
  'use strict';

  /* Mark JS available so reveal styles only apply when we can animate. */
  document.documentElement.classList.add('js');
  document.addEventListener('DOMContentLoaded', function () {
    /* --- Sticky nav shadow on scroll --- */
    var nav = document.querySelector('.nav');
    if (nav) {
      var onScroll = function () {
        nav.classList.toggle('scrolled', window.scrollY > 6);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, {
        passive: true
      });
    }

    /* --- Mobile menu --- */
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.querySelector('.mobile-menu');
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        var open = menu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });
      menu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          menu.classList.remove('open');
        });
      });
    }

    /* --- FAQ accordion (single-open) --- */
    var faqs = document.querySelectorAll('.faq-item');
    faqs.forEach(function (item) {
      var btn = item.querySelector('.faq-q');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        faqs.forEach(function (f) {
          f.classList.remove('open');
          var b = f.querySelector('.faq-q');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    /* --- Hero product walkthrough (autoplay slideshow) --- */
    var demo = document.getElementById('heroDemo');
    if (demo) {
      var scenes = demo.querySelectorAll('.hd-scene');
      var segs = demo.querySelectorAll('.hd-seg');
      var playBtn = demo.querySelector('.hd-play');
      var icPause = demo.querySelector('.ic-pause');
      var icPlay = demo.querySelector('.ic-play');
      var DUR = 3600;
      var idx = 0,
        timer = null,
        paused = false;
      var reduceMo = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var setFill = function (fill, w, ms) {
        fill.style.transition = 'none';
        fill.style.width = w;
        if (ms) {
          void fill.offsetWidth;
          fill.style.transition = 'width ' + ms + 'ms linear';
          fill.style.width = '100%';
        }
      };
      var paint = function (n) {
        scenes.forEach(function (s, k) {
          s.classList.toggle('active', k === n);
        });
        segs.forEach(function (s, k) {
          s.classList.toggle('done', k < n);
          s.classList.toggle('active', k === n);
          var fill = s.querySelector('.hd-seg-fill');
          if (k < n) setFill(fill, '100%');else if (k === n) setFill(fill, '0%', reduceMo ? 0 : DUR - 320);else setFill(fill, '0%');
        });
      };
      var advance = function () {
        idx = (idx + 1) % scenes.length;
        paint(idx);
      };
      var start = function () {
        stop();
        if (!reduceMo) timer = setInterval(advance, DUR);
      };
      var stop = function () {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      };
      demo.classList.add('ready');
      if (reduceMo) {
        // Static: show first scene, fill its segment, no motion.
        scenes.forEach(function (s, k) {
          s.classList.toggle('active', k === 0);
        });
        segs.forEach(function (s, k) {
          var f = s.querySelector('.hd-seg-fill');
          f.style.transition = 'none';
          f.style.width = k === 0 ? '100%' : '0%';
        });
      } else {
        paint(0);
        start();
      }
      if (playBtn) {
        playBtn.addEventListener('click', function () {
          paused = !paused;
          if (paused) {
            stop();
            var af = demo.querySelector('.hd-seg.active .hd-seg-fill');
            if (af) {
              var w = getComputedStyle(af).width;
              af.style.transition = 'none';
              af.style.width = w;
            }
            icPause.style.display = 'none';
            icPlay.style.display = '';
            playBtn.setAttribute('aria-pressed', 'true');
            playBtn.setAttribute('aria-label', 'Play walkthrough');
          } else {
            paint(idx);
            start();
            icPause.style.display = '';
            icPlay.style.display = 'none';
            playBtn.setAttribute('aria-pressed', 'false');
            playBtn.setAttribute('aria-label', 'Pause walkthrough');
          }
        });
      }
    }

    /* --- Scroll reveals --- */
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && reveals.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px'
      });
      reveals.forEach(function (el) {
        io.observe(el);
      });
      /* Failsafe: anything still hidden after 2.5s (observer missed it,
         restored scroll position, print, etc.) is revealed unconditionally,
         so content can never get stuck invisible. */
      setTimeout(function () {
        reveals.forEach(function (el) {
          if (!el.classList.contains('in')) el.classList.add('in');
        });
      }, 2500);
    } else {
      reveals.forEach(function (el) {
        el.classList.add('in');
      });
    }

    /* --- Animated stat counters --- */
    var counters = document.querySelectorAll('[data-count]');
    if ('IntersectionObserver' in window && counters.length) {
      var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var co = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target;
          co.unobserve(el);
          var target = parseFloat(el.getAttribute('data-count'));
          var prefix = el.getAttribute('data-prefix') || '';
          var suffix = el.getAttribute('data-suffix') || '';
          var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
          if (prefersReduced) {
            el.textContent = prefix + format(target, decimals) + suffix;
            return;
          }
          var start = null,
            dur = 1400;
          function step(ts) {
            if (start === null) start = ts;
            var p = Math.min((ts - start) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = prefix + format(target * eased, decimals) + suffix;
            if (p < 1) requestAnimationFrame(step);else el.textContent = prefix + format(target, decimals) + suffix;
          }
          requestAnimationFrame(step);
        });
      }, {
        threshold: 0.5
      });
      counters.forEach(function (el) {
        co.observe(el);
      });
    }
    function format(n, decimals) {
      return n.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    }
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "site/app.js", error: String((e && e.message) || e) }); }

// ui_kits/app/AdminMode.jsx
try { (() => {
// ─────────────────────────────────────────────────────────────────────
// ProcureWide — portal roles, view modes, and operator controls.
//
// TWO DISTINCT ROLES (important for the real build / GitHub):
//
//   1. CATEGORIZE MODE  — available to ANY signed-in user (the member).
//      It is a personal convenience: it lets a member re-file their own
//      order-catalog items into a category so their ordering is organized.
//      No elevated permission required. Backed by `pw_categorize` + the
//      per-item overrides in `pw_cat_overrides`.
//
//   2. SYSTEM ADMIN (ProcureWide)  — ProcureWide staff ONLY.
//      Gates the document *master templates* (contract / NDA / invoice),
//      catalog-item deletion, and other operator-only surfaces.
//      In production this MUST be derived from the authenticated user's
//      role, NOT a client toggle:
//
//        const isSystemAdmin = session.user.role === 'pw_admin';
//
//      The localStorage flag below (`pw_system_admin`) is ONLY a prototype
//      stand-in so the ProcureWide team can demo the operator view. When
//      wiring the backend, delete SystemAdminStore and read the role from
//      the session/JWT instead. Anything gated by useSystemAdmin() should
//      be server-enforced too (RLS / API authz), never trusted from the client.
// ─────────────────────────────────────────────────────────────────────

function makeFlagStore(key) {
  let on = false;
  try {
    on = localStorage.getItem(key) === '1';
  } catch (e) {}
  const subs = new Set();
  return {
    get: () => on,
    set: v => {
      on = !!v;
      try {
        localStorage.setItem(key, on ? '1' : '0');
      } catch (e) {}
      subs.forEach(f => f());
    },
    toggle() {
      this.set(!on);
    },
    sub: f => {
      subs.add(f);
      return () => subs.delete(f);
    }
  };
}
function useFlag(store) {
  const [, force] = React.useReducer(x => x + 1, 0);
  React.useEffect(() => store.sub(force), []);
  return store.get();
}

// 1. Categorize mode (anyone)
const CategorizeStore = makeFlagStore('pw_categorize');
const useCategorize = () => useFlag(CategorizeStore);

// 2. System admin (ProcureWide staff only — prototype stand-in; see header note)
const SystemAdminStore = makeFlagStore('pw_system_admin');
const useSystemAdmin = () => useFlag(SystemAdminStore);

// ───────── A clearly-affordant on/off toggle switch ──────────────────
function ToggleSwitch({
  on,
  onChange,
  label,
  hint,
  tone = 'green',
  icon
}) {
  const accent = tone === 'amber' ? '#B5790B' : '#0A7048';
  const track = tone === 'amber' ? '#D9971B' : '#0E9560';
  const ring = on ? tone === 'amber' ? '#E7C98A' : '#9FD9BC' : PW.line2;
  const bg = on ? tone === 'amber' ? '#FFF6E8' : '#E6F5EC' : '#fff';
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => onChange(!on),
    title: hint || label,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      padding: '5px 13px 5px 7px',
      borderRadius: 999,
      border: `1px solid ${ring}`,
      background: bg,
      cursor: 'pointer',
      transition: 'background 160ms, border-color 160ms'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 21,
      borderRadius: 999,
      flexShrink: 0,
      background: on ? track : '#C8CCC1',
      position: 'relative',
      transition: 'background 180ms'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: on ? 17 : 2,
      width: 17,
      height: 17,
      borderRadius: 999,
      background: '#fff',
      transition: 'left 180ms cubic-bezier(.4,1.3,.6,1)',
      boxShadow: '0 1px 3px rgba(7,17,42,0.35)'
    }
  })), icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 14,
    color: on ? accent : PW.mute
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12.5,
      fontWeight: 700,
      color: on ? accent : PW.ink500,
      whiteSpace: 'nowrap'
    }
  }, label, on ? ' · on' : ''));
}

// Member-facing categorize toggle (catalog). Obvious, labeled, anyone can use it.
function CategorizeSwitch() {
  const on = useCategorize();
  return /*#__PURE__*/React.createElement(ToggleSwitch, {
    on: on,
    icon: "tag",
    label: "Categorize",
    hint: "Turn on to file your catalog items into categories \u2014 just for organizing your orders.",
    onChange: v => {
      CategorizeStore.set(v);
      Toast.show(v ? 'Categorize on — sort items into categories' : 'Categorize off');
    }
  });
}

// ProcureWide operator toggle (prototype). Hidden behind the lock affordance.
function SystemAdminSwitch() {
  const on = useSystemAdmin();
  return /*#__PURE__*/React.createElement(ToggleSwitch, {
    on: on,
    tone: "amber",
    icon: "lock",
    label: "ProcureWide admin",
    hint: "ProcureWide staff only. Reveals master document templates and catalog management.",
    onChange: v => {
      SystemAdminStore.set(v);
      Toast.show(v ? 'ProcureWide admin on' : 'ProcureWide admin off');
    }
  });
}

// ───────── Category overrides (per-item re-filing) ───────────────────
const CAT_KEY = 'pw_cat_overrides';
const CatStore = function () {
  let map = {};
  try {
    map = JSON.parse(localStorage.getItem(CAT_KEY) || '{}');
  } catch (e) {}
  const subs = new Set();
  const persist = () => {
    try {
      localStorage.setItem(CAT_KEY, JSON.stringify(map));
    } catch (e) {}
  };
  return {
    all: () => map,
    get: key => map[key],
    set: (key, val) => {
      map = {
        ...map,
        [key]: val
      };
      persist();
      subs.forEach(f => f());
    },
    sub: f => {
      subs.add(f);
      return () => subs.delete(f);
    }
  };
}();
function useCatOverrides() {
  const [, force] = React.useReducer(x => x + 1, 0);
  React.useEffect(() => CatStore.sub(force), []);
  return CatStore.all();
}

// Inline category selector. `enabled` is decided by the caller (categorize mode
// on the catalog; system-admin on documents), so this primitive stays generic.
function CategoryEditor({
  itemKey,
  value,
  options,
  enabled,
  compact
}) {
  if (!enabled) return null;
  return /*#__PURE__*/React.createElement("label", {
    onClick: e => e.stopPropagation(),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: compact ? '2px 4px 2px 8px' : '3px 4px 3px 9px',
      borderRadius: 4,
      background: '#FFF6E8',
      border: '1px solid #E7C98A'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 10,
      fontWeight: 700,
      color: '#8A6308',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  }, "File as"), /*#__PURE__*/React.createElement("select", {
    value: options.includes(value) ? value : options[0],
    onChange: e => CatStore.set(itemKey, e.target.value),
    style: {
      fontFamily: PW.sans,
      fontSize: compact ? 11.5 : 12,
      fontWeight: 600,
      color: PW.ink,
      background: '#fff',
      border: '1px solid #E7C98A',
      borderRadius: 3,
      padding: '3px 6px',
      cursor: 'pointer',
      outline: 'none'
    }
  }, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o))));
}

// ───────── Catalog item deletion (system admin) ──────────────────────
// Soft-delete: SKUs are hidden from the catalog. In production this is a
// DELETE / soft-delete on the `products` table, gated to role 'pw_admin'.
const DEL_KEY = 'pw_deleted_skus';
const DeletedStore = function () {
  let set = new Set();
  try {
    set = new Set(JSON.parse(localStorage.getItem(DEL_KEY) || '[]'));
  } catch (e) {}
  const subs = new Set();
  const persist = () => {
    try {
      localStorage.setItem(DEL_KEY, JSON.stringify([...set]));
    } catch (e) {}
  };
  return {
    has: sku => set.has(sku),
    list: () => [...set],
    remove: sku => {
      set = new Set(set);
      set.add(sku);
      persist();
      subs.forEach(f => f());
    },
    restore: sku => {
      set = new Set(set);
      set.delete(sku);
      persist();
      subs.forEach(f => f());
    },
    sub: f => {
      subs.add(f);
      return () => subs.delete(f);
    }
  };
}();
function useDeleted() {
  const [, force] = React.useReducer(x => x + 1, 0);
  React.useEffect(() => DeletedStore.sub(force), []);
  return DeletedStore.list();
}

// ───────── Per-page view mode (cards / horizontal / classic) ─────────
function useViewMode(key, def) {
  const [v, setV] = React.useState(() => {
    try {
      return localStorage.getItem('pw_view_' + key) || def;
    } catch (e) {
      return def;
    }
  });
  const set = nv => {
    setV(nv);
    try {
      localStorage.setItem('pw_view_' + key, nv);
    } catch (e) {}
  };
  return [v, set];
}
function ViewSwitch({
  value,
  onChange,
  options
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      gap: 2,
      background: PW.white,
      border: `1px solid ${PW.line2}`,
      borderRadius: 6,
      padding: 2
    }
  }, options.map(([id, label, icon]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => onChange(id),
    title: label,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '6px 11px',
      borderRadius: 4,
      border: 0,
      background: value === id ? '#EAF1FB' : 'transparent',
      color: value === id ? PW.ink : PW.ink500,
      fontFamily: PW.sans,
      fontSize: 12.5,
      fontWeight: value === id ? 700 : 500,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 14,
    color: value === id ? SLDS_BLUE : PW.mute
  }), label)));
}
Object.assign(window, {
  CategorizeStore,
  useCategorize,
  CategorizeSwitch,
  SystemAdminStore,
  useSystemAdmin,
  SystemAdminSwitch,
  ToggleSwitch,
  CatStore,
  useCatOverrides,
  CategoryEditor,
  DeletedStore,
  useDeleted,
  useViewMode,
  ViewSwitch
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/AdminMode.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/CartPage.jsx
try { (() => {
// Cart + checkout. Cart lines grouped by vendor with live spend-tier progress
// and volume discounts. CSV import/export. Checkout: review → details → confirm.

function CartLine({
  line
}) {
  const p = line.p;
  const pending = !!p.pending;
  const unpriced = pending && !p.price;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 132px 110px 36px',
      gap: 12,
      alignItems: 'center',
      padding: '11px 14px',
      borderBottom: `1px solid ${PW.line}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => ItemDetail.open(line.sku),
    title: "View item details",
    style: {
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 13.5,
      color: PW.ink,
      letterSpacing: '-0.005em',
      cursor: 'pointer',
      display: 'inline-block'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      marginTop: 3,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 11.5,
      color: SLDS_BLUE
    }
  }, p.catalog), /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.mute,
      fontSize: 11
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11.5,
      color: PW.mute
    }
  }, p.unit), /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.mute,
      fontSize: 11
    }
  }, "\xB7"), unpriced ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11.5,
      color: PW.mute
    }
  }, "Price TBD") : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 11.5,
      color: PW.ink500
    }
  }, money(p.price), " ea", pending ? ' est.' : ''), pending && /*#__PURE__*/React.createElement(PendingBadge, null), line.offPct > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '0 6px',
      borderRadius: 2,
      background: '#E6F5EC',
      color: '#0A7048',
      fontFamily: PW.sans,
      fontSize: 10.5,
      fontWeight: 700
    }
  }, "\u2212", Math.round(line.offPct * 100), "% volume"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(QtyStepper, {
    value: line.qty,
    onChange: v => v <= 0 ? removeFromCart(line.sku) : setCartQty(line.sku, v),
    min: 0,
    size: "sm"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, unpriced ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 12.5,
      color: PW.mute
    }
  }, "TBD") : /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 14,
      color: PW.ink,
      fontVariantNumeric: 'tabular-nums'
    }
  }, money(line.net), pending ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      color: PW.mute
    }
  }, " est.") : null), line.off > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.mono,
      fontSize: 11,
      color: PW.mute,
      textDecoration: 'line-through'
    }
  }, money(line.gross))), /*#__PURE__*/React.createElement("button", {
    onClick: () => pending ? removeCustomItem(line.sku) : removeFromCart(line.sku),
    title: "Remove",
    style: {
      width: 28,
      height: 28,
      border: 0,
      background: 'transparent',
      color: PW.mute,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 3
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 15
  })));
}
function VendorGroup({
  g
}) {
  const st = g.spend;
  const nextPct = st.next ? Math.min(100, st.total / st.next.at * 100) : 100;
  const isCustom = g.vendor === 'tbd';
  return /*#__PURE__*/React.createElement(SectionCard, {
    title: /*#__PURE__*/React.createElement("span", null, isCustom ? 'Custom requests' : vendor(g.vendor).name),
    icon: isCustom ? 'bolt' : 'building',
    action: /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: PW.sans,
        fontSize: 12,
        color: PW.ink500,
        fontWeight: 600
      }
    }, isCustom ? g.net > 0 ? money(g.net) + ' est.' : 'Priced after sourcing' : money(g.net)),
    style: {
      marginBottom: 14
    }
  }, g.lines.map(l => /*#__PURE__*/React.createElement(CartLine, {
    key: l.sku,
    line: l
  })), isCustom && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '11px 14px',
      background: AMBER.bg,
      borderTop: `1px solid ${AMBER.line}`,
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info",
    size: 14,
    color: AMBER.dot
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: '#6E5510',
      lineHeight: 1.5,
      textWrap: 'pretty'
    }
  }, "These items aren\u2019t in your catalog yet. A ProcureWide admin verifies and sources each one before it\u2019s officialized \u2014 we\u2019ll confirm pricing and availability, typically within 24 hours, before anything ships.")), st.tiers.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 14px',
      background: '#FAFBF7'
    }
  }, g.tierCredit > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      borderRadius: 4,
      background: '#0E9560',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 10,
    color: "#fff",
    stroke: 3
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12.5,
      color: PW.ink
    }
  }, "This order crosses the ", money0(st.current.at), " ", vendor(g.vendor).name, " tier \u2014 ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: '#0A7048'
    }
  }, money0(g.tierCredit), " credited to this order"), ".")), g.tierCredit === 0 && g.spendBase.current && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: st.next ? 8 : 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      borderRadius: 4,
      background: '#0E9560',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 10,
    color: "#fff",
    stroke: 3
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12.5,
      color: PW.ink500
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: '#0A7048'
    }
  }, money0(g.spendBase.guaranteed), " quarterly rebate"), " already earned with ", vendor(g.vendor).name, " this quarter \u2014 credited at quarter close.")), st.next && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.ink500
    }
  }, "Add ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: PW.ink
    }
  }, money0(st.toNext)), " to unlock ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: '#0A7048'
    }
  }, money0(st.next.save), " off this order")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 11,
      color: PW.mute
    }
  }, money0(st.total), " / ", money0(st.next.at), " QTD")), /*#__PURE__*/React.createElement(Progress, {
    pct: nextPct,
    color: SLDS_BLUE
  }))));
}

// ───────── Checkout ─────────────────────────────────────────────────
function CheckoutForm({
  summary,
  onBack,
  onPlaced
}) {
  const [po, setPo] = React.useState('HELIO-2026-' + (115 + Math.floor(Math.random() * 9)));
  const [ship, setShip] = React.useState('Helio Bio, Inc. · 340 Brannan St, San Francisco, CA 94107');
  const [notes, setNotes] = React.useState('');
  const [needBy, setNeedBy] = React.useState('2026-06-20');
  const field = {
    width: '100%',
    padding: '9px 12px',
    fontFamily: PW.sans,
    fontSize: 13,
    color: PW.ink,
    background: PW.white,
    border: `1px solid ${PW.line2}`,
    borderRadius: 4,
    outline: 'none',
    boxSizing: 'border-box'
  };
  const lbl = {
    fontFamily: PW.sans,
    fontSize: 12,
    fontWeight: 600,
    color: PW.ink500,
    marginBottom: 6,
    display: 'block'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 340px',
      gap: 18,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(SectionCard, {
    title: "Shipping & PO details",
    icon: "doc",
    padded: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Ship to"), /*#__PURE__*/React.createElement("input", {
    value: ship,
    onChange: e => setShip(e.target.value),
    style: field
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "PO number"), /*#__PURE__*/React.createElement("input", {
    value: po,
    onChange: e => setPo(e.target.value),
    style: {
      ...field,
      fontFamily: PW.mono,
      fontSize: 12
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Need by"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: needBy,
    onChange: e => setNeedBy(e.target.value),
    style: field
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Notes for ProcureWide (optional)"), /*#__PURE__*/React.createElement("textarea", {
    value: notes,
    onChange: e => setNotes(e.target.value),
    rows: 3,
    placeholder: "Cold-chain requirements, dock hours, substitutions allowed\u2026",
    style: {
      ...field,
      resize: 'vertical'
    }
  })))), /*#__PURE__*/React.createElement(SectionCard, {
    title: `Review — ${summary.itemCount} items`,
    icon: "cart"
  }, summary.vendorGroups.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.vendor
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 14px',
      background: '#FAFBF7',
      borderBottom: `1px solid ${PW.line}`,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(VendorMark, {
    vendorKey: g.vendor,
    height: 13
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 12,
      color: PW.ink500
    }
  }, money(g.net))), g.lines.map(l => /*#__PURE__*/React.createElement("div", {
    key: l.sku,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '8px 14px',
      borderBottom: `1px solid ${PW.line}`,
      fontFamily: PW.sans,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 11.5,
      color: PW.mute,
      width: 28
    }
  }, l.qty, "\xD7"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      color: PW.ink
    }
  }, l.p.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 12,
      color: PW.ink500
    }
  }, money(l.net)))))))), /*#__PURE__*/React.createElement(OrderSummary, {
    summary: summary,
    cta: "Place order",
    onCta: () => onPlaced({
      po,
      ship,
      notes,
      needBy
    }),
    secondary: /*#__PURE__*/React.createElement(AppButton, {
      variant: "ghost",
      icon: "arrowR",
      onClick: onBack,
      style: {
        width: '100%',
        justifyContent: 'center'
      }
    }, "Back to cart")
  }));
}
function OrderSummary({
  summary,
  cta,
  onCta,
  secondary,
  sticky = true
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: sticky ? 'sticky' : 'static',
      top: 90
    }
  }, /*#__PURE__*/React.createElement(SectionCard, {
    title: "Order summary",
    icon: "tag"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement(Row, {
    label: `Items (${summary.itemCount})`,
    value: money(summary.itemsGross)
  }), summary.volumeOff > 0 && /*#__PURE__*/React.createElement(Row, {
    label: "Volume discounts",
    value: '−' + money(summary.volumeOff),
    green: true
  }), summary.spendGuarantee > 0 && /*#__PURE__*/React.createElement(Row, {
    label: "Tier credit (this order)",
    value: '−' + money(summary.spendGuarantee),
    green: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: PW.line,
      margin: '4px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 14,
      fontWeight: 700,
      color: PW.ink
    }
  }, "Total"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 22,
      fontWeight: 800,
      color: PW.ink,
      letterSpacing: '-0.01em',
      fontVariantNumeric: 'tabular-nums'
    }
  }, money(summary.total))), summary.volumeOff + summary.spendGuarantee > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 2,
      padding: '7px 10px',
      borderRadius: 3,
      background: '#E6F5EC',
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      color: '#0A7048',
      textAlign: 'center'
    }
  }, "You're saving ", money(summary.volumeOff + summary.spendGuarantee), " on this order"), summary.itemCount > 0 && (() => {
    const lines = Store.get().cart;
    const days = orderArrivalDays(lines);
    const arrival = addDays(days);
    const meta = Store.get().orderMeta || {};
    const late = meta.needBy && daysBetween(arrival, meta.needBy) > 0;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 10px',
        borderRadius: 3,
        background: late ? '#FBE3E2' : '#FAFBF7',
        border: `1px solid ${late ? '#F0C9C7' : PW.line}`
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "truck",
      size: 15,
      color: late ? '#D6322D' : PW.mute
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: PW.sans,
        fontSize: 12,
        color: late ? '#8B1F1B' : PW.ink500
      }
    }, "Est. arrival ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: late ? '#8B1F1B' : PW.ink
      }
    }, fmtDate(arrival)), " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: PW.mute
      }
    }, "(~", days, " days)"), late && /*#__PURE__*/React.createElement("span", null, " \xB7 after your ", fmtDate(meta.needBy), " need-by")));
  })(), summary.itemCount > 0 && /*#__PURE__*/React.createElement("div", {
    title: "Prices reflect the most recent amount paid for each item. Vendor pricing changes over time, so the final invoiced total may be higher or lower than shown.",
    style: {
      marginTop: 2,
      display: 'flex',
      alignItems: 'flex-start',
      gap: 8,
      padding: '8px 10px',
      borderRadius: 3,
      background: '#FAFBF7',
      border: `1px solid ${PW.line}`,
      cursor: 'help'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      marginTop: 0.5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info",
    size: 14,
    color: PW.mute
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11.5,
      color: PW.ink500,
      lineHeight: 1.45,
      textWrap: 'pretty'
    }
  }, "Prices reflect the last amount paid. Vendor rates fluctuate, so your final invoiced total may be higher or lower.")), /*#__PURE__*/React.createElement(AppButton, {
    variant: "green",
    size: "lg",
    onClick: onCta,
    style: {
      width: '100%',
      justifyContent: 'center',
      marginTop: 6
    }
  }, cta), secondary)));
}
function Row({
  label,
  value,
  green
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 13,
      color: PW.ink500
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 13,
      color: green ? '#0A7048' : PW.ink,
      fontWeight: green ? 700 : 500,
      fontVariantNumeric: 'tabular-nums'
    }
  }, value));
}

// ───────── Order urgency + need-by ──────────────────────────────────
function UrgencyCard() {
  const s = useStore();
  const meta = s.orderMeta || {
    urgency: 'Medium',
    needBy: ''
  };
  const levels = [['High', '#D6322D', '#FBE3E2', '#F0C9C7'], ['Medium', '#E0A60A', '#FBF0CF', '#EAD8A0'], ['Low', '#0E9560', '#E6F5EC', '#9FD9BC']];
  return /*#__PURE__*/React.createElement(SectionCard, {
    title: "Order urgency",
    icon: "bolt",
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      color: PW.ink500,
      marginBottom: 7
    }
  }, "How urgent is this order?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 8
    }
  }, levels.map(([lvl, fg, bg, br]) => {
    const on = meta.urgency === lvl;
    return /*#__PURE__*/React.createElement("button", {
      key: lvl,
      onClick: () => setOrderMeta({
        urgency: lvl
      }),
      style: {
        padding: '9px 8px',
        borderRadius: 4,
        cursor: 'pointer',
        textAlign: 'center',
        background: on ? bg : PW.white,
        border: `1.5px solid ${on ? br : PW.line2}`
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        width: 9,
        height: 9,
        borderRadius: '50%',
        background: fg,
        margin: '0 auto 5px'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: PW.sans,
        fontSize: 12.5,
        fontWeight: on ? 700 : 600,
        color: on ? PW.ink : PW.ink500
      }
    }, lvl));
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      color: PW.ink500,
      marginBottom: 7
    }
  }, "Date needed by"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: meta.needBy || '',
    onChange: e => setOrderMeta({
      needBy: e.target.value
    }),
    style: {
      width: '100%',
      padding: '9px 12px',
      fontFamily: PW.sans,
      fontSize: 13,
      color: PW.ink,
      background: PW.white,
      border: `1px solid ${PW.line2}`,
      borderRadius: 4,
      outline: 'none',
      boxSizing: 'border-box'
    }
  }))));
}

// ───────── Order priority — what matters most ───────────────────────
function PriorityCard() {
  const s = useStore();
  const meta = s.orderMeta || {};
  const sel = meta.priority || '';
  // First three are the buyer's stated choices; the rest are recommended
  // procurement priorities worth surfacing for a lab order.
  const opts = [['leadtime', 'truck', 'Lead time', 'Fastest time to door'], ['price', 'tag', 'Price', 'Lowest total landed cost'], ['speculative', 'box', 'Speculative buy', 'Stock up ahead of need / hedge price'], ['reliability', 'check', 'Supply reliability', 'Avoid backorders & substitutions'], ['consolidation', 'building', 'Fewer vendors', 'Consolidate into a single shipment'], ['other', 'plus', 'Other', 'Tell us what matters']];
  return /*#__PURE__*/React.createElement(SectionCard, {
    title: "What matters most",
    icon: "tag",
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      color: PW.ink500
    }
  }, "What's most important for this order?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7
    }
  }, opts.map(([id, ic, lbl, hint]) => {
    const on = sel === id;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      onClick: () => setOrderMeta({
        priority: on ? '' : id
      }),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 11px',
        borderRadius: 4,
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
        background: on ? '#E6F5EC' : PW.white,
        border: `1.5px solid ${on ? '#9FD9BC' : PW.line2}`
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 26,
        height: 26,
        borderRadius: 5,
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: on ? '#0E9560' : PW.paper2
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 15,
      color: on ? '#fff' : PW.mute
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontFamily: PW.sans,
        fontSize: 13,
        fontWeight: on ? 700 : 600,
        color: PW.ink
      }
    }, lbl), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontFamily: PW.sans,
        fontSize: 11.5,
        color: PW.mute
      }
    }, hint)), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 16,
        height: 16,
        borderRadius: '50%',
        flexShrink: 0,
        border: `1.5px solid ${on ? '#0E9560' : PW.line2}`,
        background: on ? '#0E9560' : 'transparent',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, on && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 10,
      color: "#fff",
      stroke: 3
    })));
  })), sel === 'other' && /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    value: meta.priorityNote || '',
    onChange: e => setOrderMeta({
      priorityNote: e.target.value
    }),
    placeholder: "Please specify what matters most\u2026",
    style: {
      width: '100%',
      padding: '9px 12px',
      fontFamily: PW.sans,
      fontSize: 13,
      color: PW.ink,
      background: PW.white,
      border: `1px solid ${PW.line2}`,
      borderRadius: 4,
      outline: 'none',
      boxSizing: 'border-box'
    }
  })));
}

// ───────── Vendor consolidation note ────────────────────────────────
function ConsolidationNote({
  onNavigate
}) {
  const offer = consolidationOffer();
  if (!offer || offer.vendors < 2) return null;
  const pct = Math.round(offer.rate * 100);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14,
      borderRadius: 6,
      overflow: 'hidden',
      border: '1px solid #C7B98F',
      background: 'linear-gradient(120deg, #FBF7EC, #FDFBF4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '13px 16px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 6,
      background: '#1F6F4A',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bolt",
    size: 16,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 13.5,
      fontWeight: 700,
      color: PW.ink,
      textWrap: 'pretty'
    }
  }, "Consolidation tip: route your entire order through ", vendor(offer.vendor).name, " and save ~", pct, "% (", money0(offer.save), ")."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.ink500,
      marginTop: 3
    }
  }, "You're ordering from ", offer.vendors, " vendors \u2014 ", Math.round(offer.alreadyPct * 100), "% of this order is already with them. Estimate based on their whole-order rate."))));
}

// ───────── Confirmation ─────────────────────────────────────────────
function Confirmation({
  orderId,
  onNavigate
}) {
  const o = Store.get().orders.find(x => x.id === orderId);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 680,
      margin: '40px auto',
      padding: '0 28px'
    }
  }, /*#__PURE__*/React.createElement(SectionCard, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '36px 32px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: '50%',
      background: '#E6F5EC',
      margin: '0 auto 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 28,
    color: "#0E9560",
    stroke: 3
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 22,
      color: PW.ink
    }
  }, "Order placed"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontFamily: PW.sans,
      fontSize: 14,
      color: PW.mute
    }
  }, "Order ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontFamily: PW.mono,
      color: SLDS_BLUE
    }
  }, orderId), " is being processed. You'll get tracking by email."), o && /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '22px auto 0',
      maxWidth: 420,
      textAlign: 'left',
      border: `1px solid ${PW.line}`,
      borderRadius: 4,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 14px',
      borderBottom: `1px solid ${PW.line}`,
      background: '#FAFBF7'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.mute
    }
  }, "Total"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 14,
      fontWeight: 700,
      color: PW.ink
    }
  }, money(o.total))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 14px',
      borderBottom: `1px solid ${PW.line}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.mute
    }
  }, "Saved"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 13,
      fontWeight: 600,
      color: '#0A7048'
    }
  }, money(o.saved))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 14px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.mute
    }
  }, "PO"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 12,
      color: PW.ink
    }
  }, o.po || '—'))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      justifyContent: 'center',
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(AppButton, {
    variant: "primary",
    icon: "clock",
    onClick: () => onNavigate('orders')
  }, "View order history"), /*#__PURE__*/React.createElement(AppButton, {
    variant: "secondary",
    icon: "order",
    onClick: () => onNavigate('order')
  }, "Keep ordering")))));
}

// ───────── Page ──────────────────────────────────────────────────────
function CartPage({
  onNavigate
}) {
  const s = useStore();
  const [step, setStep] = React.useState('cart'); // cart | checkout | confirm
  const [placedId, setPlacedId] = React.useState(null);
  const summary = cartSummary();
  const handleCsv = rows => {
    const res = importCartRows(rows);
    const parts = [];
    if (res.added) parts.push(`${res.added} catalog line${res.added > 1 ? 's' : ''}`);
    if (res.custom) parts.push(`${res.custom} custom (pending review)`);
    if (parts.length) Toast.show(`Imported ${parts.join(' · ')}${res.skipped ? ` · ${res.skipped} skipped` : ''}`);else Toast.show('Nothing usable in that CSV — add an item name or catalog #', {
      tone: 'danger'
    });
  };
  const exportCart = () => {
    if (!s.cart.length) return;
    const rows = s.cart.map(l => ({
      catalog: product(l.sku).catalog,
      sku: l.sku,
      name: product(l.sku).name,
      qty: l.qty
    }));
    downloadText('procurewide-cart.csv', toCSV(rows, [{
      key: 'catalog',
      label: 'catalog #'
    }, {
      key: 'sku',
      label: 'sku'
    }, {
      key: 'name',
      label: 'name'
    }, {
      key: 'qty',
      label: 'qty'
    }]));
    Toast.show('Cart exported to CSV');
  };
  if (step === 'confirm' && placedId) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHeader, {
      icon: "check",
      kicker: "Ordering",
      title: "Order confirmed"
    }), /*#__PURE__*/React.createElement(Confirmation, {
      orderId: placedId,
      onNavigate: onNavigate
    }));
  }
  if (step === 'checkout') {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHeader, {
      icon: "cart",
      kicker: "Ordering \xB7 Checkout",
      title: "Review & place order"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '18px 28px 60px',
        maxWidth: 1100,
        margin: '0 auto'
      }
    }, /*#__PURE__*/React.createElement(CheckoutForm, {
      summary: summary,
      onBack: () => setStep('cart'),
      onPlaced: details => {
        const id = placeOrder(details);
        setPlacedId(id);
        setStep('confirm');
        Toast.show('Order ' + id + ' placed');
      }
    })));
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHeader, {
    icon: "cart",
    kicker: "Ordering",
    title: "Cart"
  }, /*#__PURE__*/React.createElement(AppButton, {
    variant: "secondary",
    icon: "plus",
    onClick: () => CustomRequest.open()
  }, "Request custom item"), /*#__PURE__*/React.createElement(CsvUpload, {
    label: "Upload cart CSV",
    onRows: handleCsv
  }), /*#__PURE__*/React.createElement(AppButton, {
    variant: "ghost",
    icon: "download",
    onClick: exportCart,
    disabled: !s.cart.length
  }, "Export")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 28px 60px',
      maxWidth: 1100,
      margin: '0 auto'
    }
  }, s.cart.length === 0 ? /*#__PURE__*/React.createElement(SectionCard, null, /*#__PURE__*/React.createElement(EmptyState, {
    icon: "cart",
    title: "Your cart is empty",
    sub: "Browse the catalog and add items, request a custom item we'll source for you, or bulk-upload a cart from a CSV file.",
    action: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(AppButton, {
      variant: "primary",
      icon: "order",
      onClick: () => onNavigate('order')
    }, "Browse catalog"), /*#__PURE__*/React.createElement(AppButton, {
      variant: "secondary",
      icon: "plus",
      onClick: () => CustomRequest.open()
    }, "Request custom item"), /*#__PURE__*/React.createElement(CsvUpload, {
      label: "Upload cart CSV",
      onRows: handleCsv
    }))
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 340px',
      gap: 18,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 15,
      color: PW.ink
    }
  }, summary.itemCount, " item", summary.itemCount !== 1 ? 's' : '', " \xB7 ", summary.vendorGroups.length, " vendor", summary.vendorGroups.length !== 1 ? 's' : ''), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      clearCart();
      Toast.show('Cart cleared');
    },
    style: {
      background: 'transparent',
      border: 0,
      color: PW.mute,
      cursor: 'pointer',
      fontFamily: PW.sans,
      fontSize: 12.5,
      fontWeight: 600
    }
  }, "Clear cart")), summary.pendingCount > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12,
      borderRadius: 6,
      overflow: 'hidden',
      border: `1px solid ${AMBER.line}`,
      background: AMBER.bg
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 14px',
      display: 'flex',
      gap: 11,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 6,
      background: AMBER.dot,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 15,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 13,
      fontWeight: 700,
      color: '#5E4708'
    }
  }, summary.pendingCount, " custom item", summary.pendingCount !== 1 ? 's' : '', " pending catalog approval"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12.5,
      color: '#6E5510',
      lineHeight: 1.5,
      marginTop: 2,
      textWrap: 'pretty'
    }
  }, "New items aren\u2019t in your catalog until an admin verifies and sources them. You can place this order \u2014 ProcureWide confirms pricing", summary.hasUnpriced ? ' for items marked TBD' : '', " and availability before anything ships.")))), summary.vendorGroups.map(g => /*#__PURE__*/React.createElement(VendorGroup, {
    key: g.vendor,
    g: g
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(UrgencyCard, null), /*#__PURE__*/React.createElement(PriorityCard, null), /*#__PURE__*/React.createElement(ConsolidationNote, {
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement(OrderSummary, {
    summary: summary,
    cta: "Proceed to checkout",
    onCta: () => setStep('checkout'),
    secondary: /*#__PURE__*/React.createElement(AppButton, {
      variant: "ghost",
      icon: "order",
      onClick: () => onNavigate('order'),
      style: {
        width: '100%',
        justifyContent: 'center'
      }
    }, "Add more items")
  })))));
}
Object.assign(window, {
  CartPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/CartPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/CustomItems.jsx
try { (() => {
// Custom (non-catalog) item requests + item detail drawer.
// ProcureWide sources anything — not just what's already in the catalog. A
// customer can request a brand-new item (SKU #, link, description, qty, optional
// list price); it drops into the cart as a PENDING line and into their custom
// catalog, awaiting an admin to verify and officialize it. Any item — catalog
// or custom — can be clicked to open a full detail drawer.

// ───────── Shared bits ───────────────────────────────────────────────
const AMBER = {
  fg: '#8A6308',
  bg: '#FBF6E6',
  line: '#E6D08C',
  dot: '#E0A60A'
};

// A small "awaiting catalog approval" pill for pending custom items.
function PendingBadge({
  size = 'sm'
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: size === 'sm' ? '1px 7px' : '2px 9px',
      borderRadius: 12,
      background: AMBER.bg,
      color: AMBER.fg,
      border: `1px solid ${AMBER.line}`,
      fontFamily: PW.sans,
      fontSize: size === 'sm' ? 10.5 : 11.5,
      fontWeight: 700,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: AMBER.dot
    }
  }), "Pending catalog approval");
}

// Build a readable description from a catalog product's structured fields,
// or use the custom item's own detail text.
function describeProduct(p) {
  if (!p) return '';
  if (p.detail) return p.detail;
  if (p.pending) {
    return `Custom request — not yet in your catalog. ProcureWide will source “${p.name}” across 100+ vendors, negotiate pricing, and return a line-by-line comparison for your approval, typically within 24 hours. Add specs or a product link to help us match the exact item.`;
  }
  const blurbs = {
    'Cell culture': 'Cell-culture reagent for maintaining, feeding, and passaging mammalian cell lines under sterile conditions.',
    'Antibodies': 'Research-grade antibody, validated for the listed applications and supplied at a working concentration.',
    'Molecular biology': 'Molecular-biology reagent for nucleic-acid workflows — amplification, synthesis, or library prep.',
    'Reagents': 'General laboratory reagent supplied at the stated grade and purity for routine bench use.',
    'Plasticware': 'Labware consumable supplied sterile and ready to use, in case quantities for ongoing bench work.'
  };
  const lead = blurbs[p.cat] || 'Laboratory product sourced through the ProcureWide vendor network.';
  const storage = p.storage && p.storage !== '—' ? `, stored at ${p.storage}` : '';
  return `${lead} Supplied by ${vendor(p.vendor).name} in ${p.unit} units${storage}. Typical lead time ${p.lead}.`;
}
function specRow(label, value) {
  if (value == null || value === '' || value === '—') return null;
  return /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 12,
      padding: '9px 0',
      borderBottom: `1px solid ${PW.line}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12.5,
      color: PW.mute
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12.5,
      color: PW.ink,
      fontWeight: 600,
      textAlign: 'right',
      maxWidth: '62%'
    }
  }, value));
}

// ───────── Item detail drawer ─────────────────────────────────────────
const ItemDetail = function () {
  let push = null;
  function register(fn) {
    push = fn;
  }
  function open(sku) {
    if (push) push(sku);
  }
  return {
    register,
    open
  };
}();
function ItemDetailHost() {
  useStore(); // re-render when custom catalog / cart changes
  const [sku, setSku] = React.useState(null);
  const [qty, setQty] = React.useState(1);
  React.useEffect(() => {
    ItemDetail.register(s => {
      setSku(s);
      setQty(1);
    });
  }, []);
  if (!sku) return null;
  const p = product(sku);
  if (!p) {
    return null;
  }
  const close = () => setSku(null);
  const savePct = !p.pending && p.list ? Math.round((1 - p.price / p.list) * 100) : 0;
  const inv = Store.get().inventory.find(r => r.sku === p.sku);
  const inCart = Store.get().cart.find(l => l.sku === p.sku);
  return /*#__PURE__*/React.createElement("div", {
    onClick: close,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(10,21,48,0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      maxWidth: 480,
      height: '100%',
      background: PW.white,
      boxShadow: '-24px 0 60px -20px rgba(7,17,42,0.4)',
      display: 'flex',
      flexDirection: 'column',
      animation: 'pwDrawerIn 240ms cubic-bezier(0.22,1,0.36,1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px',
      borderBottom: `1px solid ${PW.line}`,
      background: '#F4F6F9',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 6,
      flexWrap: 'wrap'
    }
  }, p.pending ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      color: PW.ink500
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bolt",
    size: 13,
    color: AMBER.dot
  }), " Custom request") : /*#__PURE__*/React.createElement(VendorMark, {
    vendorKey: p.vendor,
    height: 14
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 10,
      fontWeight: 700,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  }, p.cat)), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 18,
      color: PW.ink,
      letterSpacing: '-0.01em',
      lineHeight: 1.25,
      textWrap: 'pretty'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 6,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 12,
      color: SLDS_BLUE
    }
  }, p.catalog), p.pending && /*#__PURE__*/React.createElement(PendingBadge, null))), /*#__PURE__*/React.createElement("button", {
    onClick: close,
    style: {
      width: 30,
      height: 30,
      borderRadius: 6,
      background: 'transparent',
      border: 0,
      cursor: 'pointer',
      color: PW.ink500,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '18px 20px'
    }
  }, p.pending && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16,
      borderRadius: 6,
      overflow: 'hidden',
      border: `1px solid ${AMBER.line}`,
      background: AMBER.bg
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '13px 14px',
      display: 'flex',
      gap: 11,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 6,
      background: AMBER.dot,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 15,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 13,
      fontWeight: 700,
      color: '#5E4708'
    }
  }, "Awaiting catalog approval"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12.5,
      color: '#6E5510',
      lineHeight: 1.5,
      marginTop: 3,
      textWrap: 'pretty'
    }
  }, "This item has never been ordered before, so it isn\u2019t in your catalog yet. A ProcureWide admin needs to verify the details and source it before it\u2019s officialized. You can still add it to this order \u2014 we\u2019ll confirm pricing and availability first.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 13.5,
      color: PW.ink500,
      lineHeight: 1.6,
      textWrap: 'pretty'
    }
  }, describeProduct(p)), p.link && /*#__PURE__*/React.createElement("a", {
    href: p.link,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      marginTop: 14,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      padding: '8px 12px',
      borderRadius: 4,
      border: `1px solid ${PW.line2}`,
      background: PW.white,
      textDecoration: 'none',
      fontFamily: PW.sans,
      fontSize: 12.5,
      fontWeight: 600,
      color: SLDS_BLUE,
      maxWidth: '100%'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrowR",
    size: 14
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, "View product page")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 10.5,
      fontWeight: 700,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.07em',
      marginBottom: 2
    }
  }, "Specifications"), specRow('Vendor', p.pending ? 'To be sourced by ProcureWide' : vendor(p.vendor).name), specRow(p.pending ? 'Reference #' : 'Catalog #', p.catalog), specRow('Unit / size', p.unit), specRow('Storage', p.storage), specRow('Lead time', p.lead), !p.pending && inv && specRow('On hand', `${inv.onHand} · ${inv.location}`), p.badges && p.badges.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 12,
      padding: '9px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12.5,
      color: PW.mute
    }
  }, "Attributes"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 4,
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      maxWidth: '70%'
    }
  }, p.badges.map(b => /*#__PURE__*/React.createElement("span", {
    key: b,
    style: {
      padding: '2px 7px',
      borderRadius: 2,
      background: '#F0EFEB',
      color: PW.ink500,
      fontFamily: PW.sans,
      fontSize: 10.5,
      fontWeight: 500
    }
  }, b))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      padding: '14px 16px',
      borderRadius: 6,
      background: '#FAFBF7',
      border: `1px solid ${PW.line}`
    }
  }, p.pending ? p.price > 0 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.mute
    }
  }, "Your estimated list price"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 22,
      fontWeight: 800,
      color: PW.ink,
      letterSpacing: '-0.01em',
      marginTop: 2
    }
  }, money(p.price), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: PW.mute
    }
  }, "est.")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11.5,
      color: PW.ink500,
      marginTop: 4,
      lineHeight: 1.45
    }
  }, "An estimate you provided. ProcureWide confirms the real negotiated price after sourcing.")) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 22,
      fontWeight: 800,
      color: PW.ink500,
      letterSpacing: '-0.01em'
    }
  }, "Price TBD"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11.5,
      color: PW.ink500,
      marginTop: 4,
      lineHeight: 1.45
    }
  }, "We\u2019ll return a negotiated price after sourcing this item \u2014 typically within 24 hours.")) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 24,
      fontWeight: 800,
      color: PW.ink,
      letterSpacing: '-0.01em'
    }
  }, money(p.price)), savePct > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 12,
      color: PW.mute,
      textDecoration: 'line-through'
    }
  }, money(p.list)), savePct > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      padding: '2px 8px',
      borderRadius: 2,
      background: '#E6F5EC',
      color: '#0A7048',
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 700
    }
  }, savePct, "% off")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11.5,
      color: PW.ink500,
      marginTop: 6,
      lineHeight: 1.45,
      textWrap: 'pretty'
    }
  }, "Reflects the last price paid. Vendor rates fluctuate, so your final price may be higher or lower.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderTop: `1px solid ${PW.line}`,
      background: PW.white,
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(QtyStepper, {
    value: qty,
    onChange: setQty,
    min: 1
  }), /*#__PURE__*/React.createElement(AppButton, {
    variant: "primary",
    icon: "cart",
    style: {
      flex: 1,
      justifyContent: 'center'
    },
    onClick: () => {
      addToCart(p.sku, qty);
      Toast.show(`Added ${qty} × ${p.name}`);
      close();
    }
  }, inCart ? 'Add more to cart' : 'Add to cart'))));
}

// ───────── Request a custom item modal ────────────────────────────────
const CustomRequest = function () {
  let push = null;
  function register(fn) {
    push = fn;
  }
  function open() {
    if (push) push(true);
  }
  return {
    register,
    open
  };
}();
function CustomRequestHost({
  onNavigate
}) {
  const [open, setOpen] = React.useState(false);
  const [f, setF] = React.useState({
    name: '',
    catalog: '',
    link: '',
    unit: '',
    listPrice: '',
    detail: '',
    qty: 1
  });
  React.useEffect(() => {
    CustomRequest.register(() => {
      setF({
        name: '',
        catalog: '',
        link: '',
        unit: '',
        listPrice: '',
        detail: '',
        qty: 1
      });
      setOpen(true);
    });
  }, []);
  if (!open) return null;
  const close = () => setOpen(false);
  const set = (k, v) => setF(x => ({
    ...x,
    [k]: v
  }));
  const canSubmit = f.name.trim() && f.catalog.trim() && f.unit.trim() && f.link.trim() && f.detail.trim();
  const submit = () => {
    if (!canSubmit) return;
    addCustomItem(f);
    close();
    Toast.show('Custom item added — ProcureWide will source it', {
      action: onNavigate ? {
        label: 'View cart',
        onClick: () => onNavigate('cart')
      } : undefined
    });
  };
  const lbl = {
    fontFamily: PW.sans,
    fontSize: 12,
    fontWeight: 600,
    color: PW.ink500,
    marginBottom: 7,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    whiteSpace: 'nowrap'
  };
  const req = /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#D6322D'
    }
  }, "*");
  const opt = /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 500,
      color: PW.mute
    }
  }, "optional");
  const field = {
    width: '100%',
    padding: '9px 12px',
    fontFamily: PW.sans,
    fontSize: 13,
    color: PW.ink,
    background: PW.white,
    border: `1px solid ${PW.line2}`,
    borderRadius: 4,
    outline: 'none',
    boxSizing: 'border-box'
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: close,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(10,21,48,0.55)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      maxWidth: 640,
      maxHeight: '92vh',
      background: PW.white,
      borderRadius: 12,
      boxShadow: PW.shadowLg,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 24px',
      background: PW.ink,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 600,
      color: '#7CD9A7',
      textTransform: 'uppercase',
      letterSpacing: '0.10em'
    }
  }, "New request"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 2,
      fontFamily: PW.sans,
      fontSize: 17,
      fontWeight: 700,
      color: '#fff'
    }
  }, "Request a custom item")), /*#__PURE__*/React.createElement("button", {
    onClick: close,
    style: {
      width: 30,
      height: 30,
      borderRadius: 6,
      background: 'transparent',
      border: 0,
      cursor: 'pointer',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      padding: '11px 13px',
      borderRadius: 6,
      background: '#EEF4FD',
      border: '1px solid #9EBEEC',
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info",
    size: 15,
    color: "#1E4FB0"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12.5,
      color: '#1E4FB0',
      lineHeight: 1.5,
      textWrap: 'pretty'
    }
  }, "Don\u2019t see it in the catalog? Request anything. We\u2019ll source it across 100+ vendors and confirm pricing \u2014 the more detail you give, the faster we match the exact item. It\u2019s added as ", /*#__PURE__*/React.createElement("b", null, "pending"), " until an admin officializes it in your catalog.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Item name ", req), /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    value: f.name,
    onChange: e => set('name', e.target.value),
    placeholder: "e.g. Recombinant Human IL-2, carrier-free, 1 mg",
    style: field
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Vendor SKU # ", req), /*#__PURE__*/React.createElement("input", {
    value: f.catalog,
    onChange: e => set('catalog', e.target.value),
    placeholder: "200-02",
    style: {
      ...field,
      fontFamily: PW.mono,
      fontSize: 12
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Unit / size ", req), /*#__PURE__*/React.createElement("input", {
    value: f.unit,
    onChange: e => set('unit', e.target.value),
    placeholder: "1 mg",
    style: field
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Product link ", req), /*#__PURE__*/React.createElement("input", {
    value: f.link,
    onChange: e => set('link', e.target.value),
    placeholder: "https://vendor.com/product/200-02",
    style: {
      ...field,
      fontFamily: PW.mono,
      fontSize: 12
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      marginBottom: 16,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Quantity ", req), /*#__PURE__*/React.createElement(QtyStepper, {
    value: f.qty,
    onChange: v => set('qty', Math.max(1, v)),
    min: 1
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Est. list price ", opt), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      fontFamily: PW.sans,
      fontSize: 13,
      color: PW.mute
    }
  }, "$"), /*#__PURE__*/React.createElement("input", {
    value: f.listPrice,
    onChange: e => set('listPrice', e.target.value.replace(/[^0-9.]/g, '')),
    inputMode: "decimal",
    placeholder: "0.00",
    style: {
      ...field,
      paddingLeft: 24,
      fontFamily: PW.mono,
      fontSize: 12
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      color: PW.mute,
      marginTop: 5
    }
  }, "Leave blank if unknown \u2014 we\u2019ll price it."))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lbl
  }, "Specs & notes ", req), /*#__PURE__*/React.createElement("textarea", {
    value: f.detail,
    onChange: e => set('detail', e.target.value),
    rows: 3,
    placeholder: "Purity, format, intended use, acceptable substitutes, cold-chain or regulatory requirements\u2026",
    style: {
      ...field,
      resize: 'vertical'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 24px',
      background: PW.paper,
      borderTop: `1px solid ${PW.line}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.mute,
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 13,
    color: PW.mute
  }), " Sourced & priced, typically within 24 hours."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(AppButton, {
    variant: "secondary",
    onClick: close
  }, "Cancel"), /*#__PURE__*/React.createElement(AppButton, {
    variant: "green",
    icon: "plus",
    onClick: submit,
    disabled: !canSubmit
  }, "Add to cart")))));
}
Object.assign(window, {
  PendingBadge,
  describeProduct,
  ItemDetail,
  ItemDetailHost,
  CustomRequest,
  CustomRequestHost
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/CustomItems.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/DiscountsPage.jsx
try { (() => {
// Discounts & forecast — vendor spend-tier guarantees with live progress,
// product volume tiers, and a forecast of what to buy to unlock the next tier.

function VendorTierCard({
  vendorKey
}) {
  const st = spendStatus(vendorKey);
  const v = vendor(vendorKey);
  const maxAt = st.tiers[st.tiers.length - 1].at;
  const pct = Math.min(100, st.total / maxAt * 100);
  return /*#__PURE__*/React.createElement(SectionCard, {
    title: v.name,
    icon: "building",
    action: st.guaranteed > 0 ? /*#__PURE__*/React.createElement(StatusPill, {
      tone: "success"
    }, money0(st.guaranteed), " unlocked") : /*#__PURE__*/React.createElement(StatusPill, {
      tone: "neutral"
    }, "No tier yet")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 16px 18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.display,
      fontWeight: 700,
      fontSize: 26,
      color: PW.ink,
      fontVariantNumeric: 'tabular-nums',
      letterSpacing: '-0.01em'
    }
  }, money0(st.total)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12.5,
      color: PW.mute,
      marginLeft: 6
    }
  }, "spend this quarter")), st.next && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12.5,
      color: PW.ink500
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: PW.ink
    }
  }, money0(st.toNext)), " to next tier")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Progress, {
    pct: pct,
    color: SLDS_BLUE,
    height: 8
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, st.tiers.map((t, i) => {
    const hit = st.total >= t.at;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        flex: 1,
        padding: '8px 10px',
        borderRadius: 4,
        border: `1px solid ${hit ? '#9FD9BC' : PW.line}`,
        background: hit ? '#E6F5EC' : PW.white
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 5
      }
    }, hit && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 14,
        height: 14,
        borderRadius: 3,
        background: '#0E9560',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 9,
      color: "#fff",
      stroke: 3
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: PW.sans,
        fontSize: 11.5,
        fontWeight: 700,
        color: hit ? '#0A7048' : PW.ink500
      }
    }, "Spend ", money0(t.at))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: PW.sans,
        fontSize: 12.5,
        color: hit ? '#0A7048' : PW.mute,
        marginTop: 3,
        fontWeight: 600
      }
    }, "Save ", money0(t.save)));
  })), st.next && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      padding: '9px 12px',
      borderRadius: 4,
      background: '#FAFBF7',
      border: `1px solid ${PW.line}`,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: PW.sans,
      fontSize: 12.5,
      color: PW.ink500
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bolt",
    size: 15,
    color: SLDS_BLUE
  }), "Spend ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: PW.ink
    }
  }, money0(st.toNext)), " more with ", v.name, " and we guarantee ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: '#0A7048'
    }
  }, money0(st.next.save)), " off \u2014 that's ", Math.round(st.next.save / st.next.at * 100), "% back on your tier spend.")));
}
function DiscountsPage({
  onNavigate
}) {
  useStore();
  const vendorKeys = Object.keys(SPEND_TIERS);
  const totalGuaranteed = vendorKeys.reduce((a, k) => a + spendStatus(k).guaranteed, 0);
  const totalPotential = vendorKeys.reduce((a, k) => {
    const st = spendStatus(k);
    return a + (st.next ? st.next.save : st.guaranteed);
  }, 0);

  // Forecast: closest-to-next-tier vendors
  const forecast = vendorKeys.map(k => ({
    k,
    st: spendStatus(k)
  })).filter(x => x.st.next).sort((a, b) => a.st.toNext - b.st.toNext).slice(0, 3);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHeader, {
    icon: "tag",
    kicker: "Operations",
    title: "Discounts & forecast"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 28px 60px',
      maxWidth: 1200,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 14,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(Kpi, {
    label: "Guaranteed savings unlocked",
    value: money0(totalGuaranteed),
    tone: "green",
    icon: "check",
    sub: "this quarter, across vendors"
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Reachable this quarter",
    value: money0(totalPotential),
    tone: "blue",
    icon: "bolt",
    sub: "if you hit the next tier"
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Active programs",
    value: vendorKeys.length,
    icon: "building",
    sub: "vendor spend agreements"
  })), forecast.length > 0 && /*#__PURE__*/React.createElement(SectionCard, {
    title: "Forecast \u2014 closest savings to unlock",
    icon: "bolt",
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      display: 'grid',
      gridTemplateColumns: `repeat(${forecast.length}, 1fr)`,
      gap: 12
    }
  }, forecast.map(({
    k,
    st
  }) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      padding: 14,
      border: `1px solid ${PW.line}`,
      borderRadius: 4,
      background: '#FAFBF7',
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(VendorMark, {
    vendorKey: k,
    height: 15
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 13,
      color: PW.ink500
    }
  }, "Add ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: PW.ink
    }
  }, money0(st.toNext)), " \u2192 save ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: '#0A7048'
    }
  }, money0(st.next.save))), /*#__PURE__*/React.createElement(Progress, {
    pct: Math.min(100, st.total / st.next.at * 100),
    color: SLDS_BLUE
  }), /*#__PURE__*/React.createElement(AppButton, {
    variant: "secondary",
    size: "sm",
    icon: "order",
    onClick: () => onNavigate('order'),
    style: {
      marginTop: 2,
      justifyContent: 'center'
    }
  }, "Shop ", vendor(k).name.split(' ')[0]))))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 700,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      margin: '4px 2px 12px'
    }
  }, "Vendor spend-tier guarantees"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(440px, 1fr))',
      gap: 14,
      marginBottom: 22
    }
  }, vendorKeys.map(k => /*#__PURE__*/React.createElement(VendorTierCard, {
    key: k,
    vendorKey: k
  }))), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Per-order volume discounts",
    icon: "tag"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px',
      fontFamily: PW.sans,
      fontSize: 13,
      color: PW.ink500,
      borderBottom: `1px solid ${PW.line}`
    }
  }, "These apply automatically per line in your cart \u2014 the more units of an item you order, the deeper the discount."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 0
    }
  }, VOLUME_TIERS.default.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '18px 20px',
      textAlign: 'center',
      borderRight: i < VOLUME_TIERS.default.length - 1 ? `1px solid ${PW.line}` : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.display,
      fontWeight: 700,
      fontSize: 34,
      color: PW.green,
      letterSpacing: '-0.01em'
    }
  }, Math.round(t.off * 100), "%"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 13,
      color: PW.ink500,
      marginTop: 2
    }
  }, "off any line of ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: PW.ink
    }
  }, t.qty, "+ units"))))))));
}
Object.assign(window, {
  DiscountsPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/DiscountsPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/DocViewer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Viewable documents — the real ProcureWide / Prodigy artifacts.
//
// • ContractDoc  — Prodigy Scientific "Lab Support Agreement" (the member-facing
//                  procurement agreement). Wording transcribed from the executed
//                  agreement; rendered as a BLANK master template (member name,
//                  address, deposit, dates and signatures left open to fill).
// • NDADoc       — Mutual Confidentiality Agreement (Prodigy Scientific +
//                  counterparty). Wording kept verbatim; counterparty identity,
//                  signers and initials removed so it stands as a blank template.
// • InvoiceDoc   — Order invoice. Billed by ProcureWide LLC (Austin, TX),
//                  fulfilled by Prodigy Scientific (San Diego, CA). Includes a
//                  PAID / UNPAID status section.
//
// NOTE (build): these three TEMPLATES are ProcureWide-operator material and are
// only surfaced to system admins — see DocumentsPage + AdminMode.jsx role notes.
// All inline styles. Opened full-screen via DocViewer.

const PW_GREEN = '#0E9560';
const PW_PAPER_INK = '#07112A';

// Fixed party facts (constants the templates always carry).
const PRODIGY = {
  name: 'Prodigy Scientific',
  addr1: '5414 Oberlin Drive, Ste. 150',
  addr2: 'San Diego, CA 92121',
  tel: '512-581-1996'
};
const PROCUREWIDE = {
  name: 'ProcureWide LLC',
  addr1: '5010 South Congress Ave #1402',
  addr2: 'Austin, TX 78745'
};

// ───────── Shared document primitives ────────────────────────────────
function DvPage({
  children,
  pad = '60px 68px'
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "pw-doc-page",
    style: {
      width: '100%',
      maxWidth: 824,
      margin: '0 auto',
      background: '#fff',
      boxShadow: '0 18px 50px -20px rgba(7,17,42,0.35)',
      borderRadius: 3,
      padding: pad,
      boxSizing: 'border-box',
      fontFamily: PW.sans,
      color: PW.ink500,
      fontSize: 12.5,
      lineHeight: 1.6
    }
  }, children);
}
function DvMark({
  entity
}) {
  const e = entity || PROCUREWIDE;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 4,
      background: PW_GREEN,
      display: 'inline-block',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.display,
      fontWeight: 700,
      fontSize: 19,
      color: PW_PAPER_INK,
      letterSpacing: '-0.02em'
    }
  }, e.name));
}

// Inline fill-in slot — value, or a ruled blank in template mode.
function DvField({
  value,
  w = 150,
  blank,
  mono
}) {
  if (!blank && value != null && value !== '') {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: mono ? PW.mono : PW.sans,
        fontWeight: 600,
        color: PW.ink
      }
    }, value);
  }
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      minWidth: w,
      borderBottom: `1px solid ${PW.line2}`,
      height: '1.05em',
      verticalAlign: 'bottom',
      margin: '0 3px'
    }
  });
}
function DvDocTitle({
  kicker,
  title,
  refNo,
  blank,
  effLabel = 'Effective',
  effValue
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26,
      paddingBottom: 16,
      borderBottom: `2px solid ${PW_PAPER_INK}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.mono,
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: PW_GREEN,
      fontWeight: 600
    }
  }, kicker), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '6px 0 0',
      fontFamily: PW.display,
      fontWeight: 700,
      fontSize: 28,
      letterSpacing: '-0.02em',
      color: PW_PAPER_INK,
      lineHeight: 1.08
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      display: 'flex',
      gap: 22,
      flexWrap: 'wrap',
      fontFamily: PW.mono,
      fontSize: 11,
      color: PW.mute
    }
  }, refNo !== undefined && /*#__PURE__*/React.createElement("span", null, "Ref\xA0 ", /*#__PURE__*/React.createElement(DvField, {
    value: refNo,
    w: 120,
    blank: blank,
    mono: true
  })), /*#__PURE__*/React.createElement("span", null, effLabel, "\xA0 ", /*#__PURE__*/React.createElement(DvField, {
    value: effValue,
    w: 120,
    blank: blank,
    mono: true
  }))));
}

// One numbered legal section (paras may begin with "(a)" etc — kept as written).
function DvLegalSection({
  n,
  title,
  paras
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      marginTop: 18,
      breakInside: 'avoid'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 6px',
      display: 'flex',
      gap: 9,
      alignItems: 'baseline',
      fontFamily: PW.sans,
      fontWeight: 800,
      fontSize: 13,
      color: PW_PAPER_INK
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 12,
      color: PW_GREEN,
      fontWeight: 700
    }
  }, n), /*#__PURE__*/React.createElement("span", null, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingLeft: 24
    }
  }, paras.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      margin: '0 0 7px',
      textWrap: 'pretty',
      whiteSpace: 'pre-wrap'
    }
  }, p))));
}
function DvSig({
  org,
  sub,
  name,
  title,
  date,
  blank
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 230px',
      minWidth: 210
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 32,
      borderBottom: `1px solid ${PW_PAPER_INK}`,
      display: 'flex',
      alignItems: 'flex-end',
      paddingBottom: 3
    }
  }, !blank && name && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"Instrument Serif", Georgia, serif',
      fontStyle: 'italic',
      fontSize: 21,
      color: '#1B2A52',
      lineHeight: 1
    }
  }, name)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontFamily: PW.sans,
      fontWeight: 800,
      fontSize: 12.5,
      color: PW_PAPER_INK
    }
  }, org), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      color: PW.mute
    }
  }, sub), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 7,
      fontSize: 11.5,
      color: PW.ink500,
      lineHeight: 1.9
    }
  }, /*#__PURE__*/React.createElement("div", null, "By:\xA0 ", /*#__PURE__*/React.createElement(DvField, {
    value: name,
    w: 130,
    blank: blank
  })), /*#__PURE__*/React.createElement("div", null, "Name:\xA0 ", /*#__PURE__*/React.createElement(DvField, {
    value: name,
    w: 130,
    blank: blank
  })), /*#__PURE__*/React.createElement("div", null, "Title:\xA0 ", /*#__PURE__*/React.createElement(DvField, {
    value: title,
    w: 120,
    blank: blank
  })), /*#__PURE__*/React.createElement("div", null, "Date:\xA0 ", /*#__PURE__*/React.createElement(DvField, {
    value: date,
    w: 90,
    blank: blank,
    mono: true
  }))));
}

// ═════════ LAB SUPPORT AGREEMENT (contract) ══════════════════════════
const CONTRACT_SECTIONS = [{
  n: '1.',
  title: 'Incubator Membership and Laboratory Bench Access.',
  paras: ['(a) Upon execution of this Agreement, Member becomes a member of Prodigy’s scientific incubator program (an “Incubator Member”) for the term of this Agreement.', '(b) Prodigy grants Member a non-exclusive, revocable right to access and use designated laboratory bench space at Prodigy’s facility at 5414 Oberlin Drive, Ste. 150, San Diego, CA 92121, or such other Prodigy-operated or Prodigy-affiliated site as Prodigy may designate (the “Bench Space”). This right exists for the full term of this Agreement whether or not Member’s personnel are physically present at the Bench Space and regardless of where Member or its personnel are otherwise located. Member may arrange on-site use of the Bench Space upon reasonable advance notice to Prodigy.', '(c) As an Incubator Member, Member is entitled to participate in the vendor, supplier, and procurement programs that Prodigy makes available to its members, and Prodigy may identify Member to vendors as a bona fide member of its incubator program.']
}, {
  n: '2.',
  title: 'Administrative and Purchasing Support.',
  paras: ['Prodigy will provide lab administrative support to enable Member to conduct the Research during the term of this Agreement, including ongoing purchasing and accounting support. These supports include, but are not limited to:', '• Acting as Member’s purchasing agent to negotiate and place orders on Member’s behalf;\n• Opening new accounts with any lawful vendor as requested by Member;\n• Tracking and following up on backorders, late shipments, and similar matters;\n• Processing returns and similar adjustments as needed, although Member will be required to physically process and ship returned products;\n• Providing a detailed invoice with all billbacks and receipts itemized and attached to simplify accounting.']
}, {
  n: '3.',
  title: 'Disclosed Purchasing Agent; No Resale; Title.',
  paras: ['(a) Prodigy acts solely as Member’s disclosed purchasing agent and authorized procurement representative. In every transaction facilitated under this Agreement, Member is the buyer of record, the beneficial owner, and the intended end user of all goods, equipment, materials, and services ordered (“Supplies”).', '(b) Prodigy does not purchase Supplies for resale and does not resell, redistribute, or take a product margin on Supplies. Title to and risk of loss of all Supplies pass directly from the vendor to Member; Prodigy does not take title to, hold inventory of, or acquire any ownership interest in the Supplies. The Administrative Fee described in Section 8 is consideration for Prodigy’s facilitation and administrative services only and is not a markup on, or margin from, the price of any Supplies.', '(c) Member acknowledges that all Supplies are acquired solely for Member’s own internal research use at the Bench Space or at Member’s own registered site, and not for resale, transfer, or redistribution to any third party.', '(d) Member authorizes Prodigy to identify itself to vendors as Member’s purchasing agent and incubator host, and to provide a copy of this Agreement (or an excerpt of Sections 1 and 3) to vendors as evidence of the agency and incubator relationship. In support of the foregoing, Member shall issue a Form W-9 to Prodigy upon activation of this Agreement and shall complete any additional agent-authorization or vendor-onboarding paperwork reasonably requested by vendors while this Agreement is in effect.']
}, {
  n: '4.',
  title: 'Regulated and Controlled Materials.',
  paras: ['(a) Member is solely responsible for all regulatory compliance applicable to its own research and facility, including without limitation any registration, license, or permit required for controlled substances, DEA List I or List II chemicals, hazardous materials, select agents, radioactive materials, or export-controlled items.', '(b) For any Supply that requires a license, registration, or end-user verification (including DEA-regulated controlled substances and listed chemicals), Member shall be the buyer of record under Member’s own account and registration, the order shall ship only to Member’s own registered and verified address, and Prodigy shall not take title to or possession of such Supply. Any vendor end-user verification is performed by the vendor and not by Prodigy.', '(c) Prodigy may decline to place, or may pause, any order that Prodigy reasonably believes is regulated, non-compliant, or outside the scope of Member’s authorizations, without liability to Member.']
}, {
  n: '5.',
  title: 'Member Representations and Compliance.',
  paras: ['Member represents and warrants that it is a bona fide research entity; that it will use all Supplies for lawful research purposes; that it holds and will maintain all licenses, registrations, and a valid ship-to address required for its activities; and that the information it provides to Prodigy and to vendors is accurate. Member is responsible for all regulatory compliance for its own facility, including any DEA registrations required for regulated materials.']
}, {
  n: '6.',
  title: 'Conditions Outside Prodigy’s Control.',
  paras: ['Member expressly acknowledges that Prodigy is not responsible for conditions or losses outside of its control, including but not limited to items lost or damaged during shipping, damages or losses due to delays in receipt of items, delays in order placement due to technical problems, or incorrect items shipped due to vendor error. Under these or similar circumstances, Prodigy will assist Member in placing replacement claims with vendors and shippers as needed.']
}, {
  n: '7.',
  title: 'Personnel Provided by Prodigy.',
  paras: ['Prodigy shall be solely responsible for the personnel necessary to conduct the lab support, which responsibilities shall include but not be limited to: hiring, employment, and termination of said personnel; compensation of said personnel; payment of taxes related to the personnel; and securing insurance relating to the personnel.']
}, {
  n: '8.',
  title: 'Payment Terms.',
  paras: ['(a) Member shall pay Prodigy a Deposit of $TBD based on order amount, due prior to order execution. This amount will be referenced in an invoice to Member. This amount represents the value of goods and services that Prodigy will purchase on behalf of Member between invoices. Prodigy shall return the Deposit to Member, within sixty (60) days of termination of this Agreement, upon Member’s payment of all amounts owed under this Agreement. Return of the Deposit may be delayed beyond sixty (60) days pending Prodigy’s receipt of final invoices attributed to Member and Member’s payment of all amounts owed.', '(b) In addition to the actual costs of goods and services ordered on its behalf, Member shall pay Prodigy a fee of 10% of the total cost of supplies or services (and any additional service fees, taxes, etc. charged by the vendor(s)) ordered on behalf of Member, or 10% of the total cost of durable equipment (and any additional associated fees charged by the vendor(s)) ordered on behalf of Member (the “Administrative Fee”). Prodigy reserves the right to determine whether an order is for a supply/service or durable equipment for purposes of determining the appropriate fee.', '(c) Member will be invoiced either when the total amount of purchases and Administrative Fee reaches or exceeds the value of the Deposit, or on the 25th of the month, whichever comes first. Undisputed invoices shall be paid within ten (10) days of Member’s receipt of an invoice. Prodigy reserves the right to assess a charge equal to 10% of the unpaid invoice if payment is not received within this period. Where invoicing is triggered by the Deposit threshold, Prodigy may, at its sole discretion, pause additional order placement on behalf of Member until payment is received.']
}, {
  n: '9.',
  title: 'Start Date, Automatic Renewal, and Termination.',
  paras: ['This Agreement shall commence as of the Effective Date. On the first day of each month thereafter (the “Record Date”), this Agreement will automatically renew for an additional three-month period unless the terminating party sends written notice to the non-terminating party on or prior to the applicable Record Date, in which case this Agreement shall terminate sixty (60) days after the applicable Record Date.']
}, {
  n: '10.',
  title: 'Proprietary Rights.',
  paras: ['Prodigy agrees and acknowledges that it shall acquire no rights of any kind whatsoever with respect to any Intellectual Property of Member as a result of the Parties’ performance under this Agreement or otherwise. Prodigy agrees that any invention or know-how conceived or first reduced to practice in the performance of its responsibilities by Prodigy or its employees, alone or jointly with others, together with all Intellectual Property related thereto (collectively, “Inventions”), shall be and remain at all times the sole and exclusive property of Member, and Prodigy hereby agrees to assign to Member its entire right, title, and interest in all Inventions. Prodigy shall perform any and all acts necessary to assist Member in perfecting its rights to any such Inventions; to the extent this requires significant work by Prodigy or its staff, Member will reimburse Prodigy at Prodigy’s reasonable consulting rates.']
}, {
  n: '11.',
  title: 'Confidential Information.',
  paras: ['Anything in this Agreement to the contrary notwithstanding, any and all knowledge, know-how, practices, processes, or other information disclosed or submitted in writing or in other tangible form by Member to Prodigy pursuant to this Agreement, or which Prodigy becomes aware of through any means as part of this Agreement (“Confidential Information”), shall be received and maintained by Prodigy in strict confidence. Prodigy shall use its best efforts to ensure that neither it nor its employees disclose Member’s Confidential Information, and in any event will use as much care in protecting Member’s Confidential Information as Prodigy uses in protecting its own. The Inventions shall be considered Member’s Confidential Information. Prodigy shall not use the Confidential Information for any purpose other than those specified in this Agreement and may disclose it solely to employees requiring access for the purposes of this Agreement, provided each such employee is bound by a contractual obligation of confidentiality. The foregoing obligations shall not apply to Confidential Information that Prodigy can establish by competent written proof: (i) was in the public domain at the time of disclosure; (ii) after disclosure, becomes part of the public domain other than by breach of this Agreement by Prodigy; or (iii) was in Prodigy’s possession in documentary form at the time of disclosure.']
}, {
  n: '12.',
  title: 'Indemnification.',
  paras: ['The Parties shall each indemnify the other for any claims, losses, damages, costs, and expenses, including reasonable attorneys’ fees but expressly excluding all foreseeable and unforeseeable consequential damages (“Claims”), arising from any third-party claim resulting from the indemnifying party’s gross negligence or willful misconduct in its performance of this Agreement, except that in no event shall either party be liable to the other to the extent such Claim arises out of the gross negligence or willful misconduct of the indemnified party.']
}, {
  n: '13.',
  title: 'Disclaimer of Warranties.',
  paras: ['PRODIGY PROVIDES NO WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.']
}, {
  n: '14.',
  title: 'Limitation of Liability.',
  paras: ['IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY SPECIAL, INDIRECT, OR CONSEQUENTIAL (WHETHER FORESEEABLE OR UNFORESEEABLE) DAMAGES OF ANY KIND IN CONNECTION WITH THIS AGREEMENT, EVEN IF EITHER PARTY HAS BEEN INFORMED IN ADVANCE OF THE POSSIBILITY OF SUCH DAMAGES.']
}, {
  n: '15.',
  title: 'Material Breach.',
  paras: ['Either party may terminate this Agreement for any material breach which is not cured within thirty (30) days following notice from the non-breaching party specifying such breach. Such termination shall be effective at the end of such thirty (30) days.']
}, {
  n: '16.',
  title: 'Effect of Termination.',
  paras: ['Termination of this Agreement shall be without prejudice to or limitation on any other remedies or any accrued obligations of either party. The obligations under Proprietary Rights and Confidential Information shall survive any termination, expiration, or completion of this Agreement.']
}, {
  n: '17.',
  title: 'No License.',
  paras: ['Nothing in this Agreement shall be construed as conferring on either party an express or implied license or option to license any disclosed Confidential Information, technology, trade secrets, trademarks, copyright, or any patent or patent application owned by the other party.']
}, {
  n: '18.',
  title: 'Independent Contractors.',
  paras: ['The Parties shall perform their obligations under this Agreement as independent contractors, and nothing contained herein shall be construed to be inconsistent with such relationship or status. This Agreement shall not constitute, create, or in any way be interpreted as a joint venture or partnership of any kind.']
}, {
  n: '19.',
  title: 'Non-Solicitation.',
  paras: ['During the term of this Agreement and for one (1) year after termination, neither party shall directly or indirectly, without the prior written consent of the other party, solicit, recruit, encourage, or induce any employees, directors, consultants, contractors, or subcontractors of such party to leave the employ of such party, either on its own behalf or on behalf of any other person or entity. In the event of a breach of this provision and related hiring, the breaching party will pay to the other, as liquidated damages and not as a penalty, an amount equal to 30% of the first year’s salary and bonus(es) ultimately agreed upon between the person solicited and the new employer. Payment of this amount will be the breaching party’s total liability and the other party’s only remedy for a breach of this provision.']
}, {
  n: '20.',
  title: 'Entire Agreement.',
  paras: ['This Agreement sets forth all the covenants, promises, agreements, warranties, representations, conditions, and understandings between the Parties, and supersedes and terminates all prior agreements and understandings between the Parties. There are no binding covenants, promises, agreements, warranties, representations, conditions, or understandings, either oral or written, between the Parties other than as set forth herein. No subsequent alteration, amendment, change, or addition to this Agreement shall be binding upon the Parties unless reduced to writing and signed by the respective authorized officers of each party.']
}, {
  n: '21.',
  title: 'Force Majeure.',
  paras: ['Neither party shall be liable for any failure to perform as required by this Agreement to the extent such failure is caused by any unforeseeable reason beyond its control, including without limitation labor disturbances or disputes of any kind, failure of any required governmental approval, civil disorders, acts of national aggression, acts of God, energy or other conservation measures, failure of utilities, mechanical breakdowns, material shortage, disease, or similar occurrences; provided, however, such party shall, as soon as reasonably practicable, (a) provide written notice to the other party of the nature and extent of such condition, and (b) use commercially reasonable efforts to remove any such causes and resume performance as soon as reasonably practicable.']
}, {
  n: '22.',
  title: 'Dispute Resolution.',
  paras: ['In the event of any dispute, claim, question, or disagreement arising from or relating to this Agreement or an alleged breach thereof (a “Dispute”), the Parties shall use their best efforts to settle the Dispute. The complaining party shall provide written notice to the other party (the “Initial Notice of Dispute”). Following the Initial Notice of Dispute, the Parties shall consult and negotiate in good faith and attempt to reach a just and equitable solution. If the Parties are unable to reach a resolution within thirty (30) days of the Initial Notice of Dispute, the Dispute shall be resolved as follows:', '(a) Mediation. If the Dispute is not resolved through informal negotiations within thirty (30) days of the Initial Notice of Dispute, the Parties agree first to try in good faith to settle the Dispute by mediation administered by JAMS under its mediation rules. Upon written notice to the other party, either party may commence mediation. All offers, promises, conduct, and statements made in the course of the mediation are confidential, privileged, and inadmissible for any purpose in any subsequent proceeding. The Parties will participate in good faith and share the costs of mediation equally; each party will bear its own attorneys’ fees and costs.', '(b) Arbitration. If the Dispute cannot be settled through informal negotiations or mediation, the Parties agree to submit the Dispute to binding arbitration, thereby waiving their right to a jury trial. The arbitration shall be conducted before a panel of three mutually agreed neutral arbitrators in San Diego, California, administered by JAMS in accordance with the JAMS Comprehensive Arbitration Rules and Procedures. The arbitrators shall apply the substantive law of California. All aspects of the arbitration shall be confidential, except as necessary to comply with legal or regulatory requirements. The result of the arbitration shall be binding, and judgment on the award may be entered in any court having jurisdiction. The arbitrators shall award the prevailing party, if any, the costs and attorneys’ fees reasonably incurred in connection with the arbitration.']
}, {
  n: '23.',
  title: 'Governing Law; Severability.',
  paras: ['This Agreement shall be governed by the laws of the State of California as applied to contracts entered into and to be performed entirely in California by California residents. If any provision of this Agreement is determined to be unenforceable, such provision shall be severed and the remaining provisions shall continue in full force and effect.']
}, {
  n: '24.',
  title: 'Counterparts.',
  paras: ['This Agreement may be executed in counterparts, each of which when taken together shall constitute one and the same instrument.']
}];
function ContractDoc({
  blank
}) {
  const filled = !blank;
  return /*#__PURE__*/React.createElement(DvPage, null, /*#__PURE__*/React.createElement(DvMark, {
    entity: PRODIGY
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontFamily: PW.sans,
      fontSize: 11,
      color: PW.mute
    }
  }, PRODIGY.addr1, " \xA0|\xA0 ", PRODIGY.addr2, " \xA0|\xA0 Telephone: ", PRODIGY.tel), /*#__PURE__*/React.createElement(DvDocTitle, {
    kicker: "Lab Support Agreement",
    title: "Lab Support Agreement",
    refNo: filled ? 'PRD-LSA-2026-0142' : '',
    blank: blank,
    effValue: filled ? '11 June 2026' : ''
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      fontSize: 12.5
    }
  }, /*#__PURE__*/React.createElement("div", null, "Date: ", /*#__PURE__*/React.createElement(DvField, {
    value: filled ? '06 / 11 / 2026' : '',
    w: 120,
    blank: blank,
    mono: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement(DvField, {
    value: filled ? 'Helio Bio, Inc.' : '',
    w: 220,
    blank: blank
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(DvField, {
    value: filled ? '' : '',
    w: 240,
    blank: true
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(DvField, {
    value: filled ? '' : '',
    w: 180,
    blank: true
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '12px 0 0'
    }
  }, "Dear ", /*#__PURE__*/React.createElement(DvField, {
    value: filled ? 'Helio Bio, Inc.' : '',
    w: 180,
    blank: blank
  }), ",:"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 0',
      textWrap: 'pretty'
    }
  }, "Pursuant to our recent conversation regarding a Lab Support Agreement (this \u201CAgreement\u201D) to support the scientific pursuits of ", /*#__PURE__*/React.createElement(DvField, {
    value: filled ? 'Helio Bio, Inc.' : '',
    w: 150,
    blank: blank
  }), " (\u201CMember\u201D), the terms set forth below are effective as of ", /*#__PURE__*/React.createElement(DvField, {
    value: filled ? 'June 11th, 2026' : '',
    w: 120,
    blank: blank
  }), " (the \u201CEffective Date\u201D).")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      fontSize: 12.5,
      lineHeight: 1.6
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 7px',
      fontFamily: PW.sans,
      fontWeight: 800,
      fontSize: 13,
      color: PW_PAPER_INK,
      textTransform: 'uppercase',
      letterSpacing: '0.04em'
    }
  }, "Lab Support Agreement"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 7px',
      textWrap: 'pretty'
    }
  }, "WHEREAS, Prodigy Scientific (\u201CProdigy\u201D) operates a scientific incubator and eProcurement program that provides member companies with laboratory bench access, administrative support, and purchasing-agent services; and"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 7px',
      textWrap: 'pretty'
    }
  }, "WHEREAS, Member desires to join Prodigy\u2019s incubator program as a member in order to obtain laboratory bench access and the lab and administrative supports described below, in accordance with the terms set forth herein, in furtherance of Member\u2019s research projects (the \u201CResearch\u201D); and"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 7px',
      textWrap: 'pretty'
    }
  }, "WHEREAS, Prodigy and Member (collectively, the \u201CParties\u201D) seek a mutually beneficial arrangement consistent with these recitals."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 7px',
      textWrap: 'pretty'
    }
  }, "NOW, THEREFORE, in consideration of the covenants and mutual promises set forth herein, and for other good and valuable consideration, the receipt of which is acknowledged, the Parties agree as follows:")), CONTRACT_SECTIONS.map(s => /*#__PURE__*/React.createElement(DvLegalSection, _extends({
    key: s.n
  }, s))), /*#__PURE__*/React.createElement("section", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 6px',
      display: 'flex',
      gap: 9,
      alignItems: 'baseline',
      fontFamily: PW.sans,
      fontWeight: 800,
      fontSize: 13,
      color: PW_PAPER_INK
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 12,
      color: PW_GREEN,
      fontWeight: 700
    }
  }, "25."), /*#__PURE__*/React.createElement("span", null, "Notices.")), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingLeft: 24
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 9px'
    }
  }, "All notices, demands, and other communications under this Agreement shall be in writing and given either by personal delivery or by nationally recognized overnight courier (charges prepaid) and shall be deemed given when actually delivered."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 220px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.mono,
      fontSize: 10,
      color: PW_GREEN,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }
  }, "If to Member"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 5,
      lineHeight: 1.6
    }
  }, /*#__PURE__*/React.createElement(DvField, {
    value: filled ? 'Helio Bio, Inc.' : '',
    w: 180,
    blank: blank
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(DvField, {
    value: "",
    w: 200,
    blank: true
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(DvField, {
    value: "",
    w: 160,
    blank: true
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 220px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.mono,
      fontSize: 10,
      color: PW_GREEN,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }
  }, "If to Prodigy"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 5,
      lineHeight: 1.6
    }
  }, "James Thompson", /*#__PURE__*/React.createElement("br", null), "Prodigy Scientific", /*#__PURE__*/React.createElement("br", null), "5414 Oberlin Drive, Ste. 150", /*#__PURE__*/React.createElement("br", null), "San Diego, CA 92121"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      fontSize: 12.5
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "Please indicate your acceptance of this Agreement by signing below and returning it to our office."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0'
    }
  }, "Sincerely yours,"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '2px 0 0',
      fontFamily: '"Instrument Serif", Georgia, serif',
      fontStyle: 'italic',
      fontSize: 20,
      color: '#1B2A52'
    }
  }, "James Thompson"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontWeight: 700,
      color: PW_PAPER_INK
    }
  }, "CEO, Prodigy Scientific")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      paddingTop: 16,
      borderTop: `1px solid ${PW.line}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 800,
      fontSize: 12,
      color: PW_PAPER_INK,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: 16
    }
  }, "Understood and accepted"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      flexWrap: 'wrap',
      rowGap: 26
    }
  }, /*#__PURE__*/React.createElement(DvSig, {
    org: "Prodigy Scientific",
    name: filled ? 'Ali Darwish' : '',
    title: filled ? 'Program Manager, Prodigy Scientific' : '',
    date: filled ? '11 Jun 2026' : '',
    blank: blank
  }), /*#__PURE__*/React.createElement(DvSig, {
    org: "Member",
    sub: filled ? 'Helio Bio, Inc.' : undefined,
    name: "",
    title: "",
    date: "",
    blank: true
  }))));
}

// ═════════ MUTUAL CONFIDENTIALITY AGREEMENT (NDA) ═════════════════════
const NDA_SECTIONS = [{
  n: '1.',
  title: 'Background.',
  paras: ['The Counterparty named above and Prodigy Scientific intend to engage in discussions concerning the possible establishment of a mutually acceptable business relationship between them (the “Purpose”). In the course of these discussions, each party may disclose or deliver to the other party certain of its Confidential Information (defined below). The party disclosing Confidential Information is referred to in this Agreement as “Discloser” with respect to that Confidential Information; the party receiving that Confidential Information is referred to as “Recipient”.']
}, {
  n: '2.',
  title: 'Definition.',
  paras: ['“Confidential Information” means any and all non-public scientific, technical, financial or business information in whatever form (written, oral or visual) that is furnished or made available to Recipient by or on behalf of Discloser, and that (a) if in tangible form, is labeled in writing as proprietary or confidential; (b) if in oral or visual form, is identified as proprietary or confidential at the time of disclosure or within fifteen (15) days thereafter; or (c) is commonly regarded as confidential or proprietary in the life sciences industry.']
}, {
  n: '3.',
  title: 'Obligations.',
  paras: ['Recipient agrees to (a) hold in confidence all of Discloser’s Confidential Information and not disclose such Confidential Information except as expressly provided in Section 4 below, without the prior written consent of Discloser; (b) use Discloser’s Confidential Information solely for the Purpose; (c) treat Discloser’s Confidential Information with the same degree of care Recipient uses to protect Recipient’s own confidential information but in no event with less than a reasonable degree of care; (d) reproduce Discloser’s Confidential Information solely to the extent necessary to accomplish the Purpose, with all such reproductions being considered Discloser’s Confidential Information; (e) not disclose either the fact that discussions are taking place concerning a possible relationship between the parties or any of the terms, conditions, or other facts with respect to the possible relationship, including, without limitation, the status of such discussions and the exchange of Confidential Information; and (f) promptly notify Discloser of any actual and/or suspected unauthorized use or disclosure of Discloser’s Confidential Information of which Recipient becomes aware and reasonably cooperate with Discloser to mitigate the harmful effects of such unauthorized use and/or disclosure and protect against any further unauthorized use and/or disclosure of Discloser’s Confidential Information.']
}, {
  n: '4.',
  title: 'Permitted Disclosures.',
  paras: ['Recipient may provide Discloser’s Confidential Information solely to its employees or consultants (“Representatives”) who, in each case, (a) have a need to know such Confidential Information to carry out the Purpose; and (b) are bound by written obligations of non-disclosure and non-use at least as restrictive as those set forth in this Agreement. Recipient will be liable to Discloser for the compliance of its Representatives with Recipient’s obligations under this Agreement. If Recipient is required by a governmental authority or by order of a court of competent jurisdiction to disclose any of Discloser’s Confidential Information, Recipient will give Discloser prompt written notice thereof and Recipient will take all reasonable and lawful actions to avoid or minimize the degree of such disclosure. Recipient will cooperate reasonably with Discloser in any efforts to seek a protective order.']
}, {
  n: '5.',
  title: 'Exceptions.',
  paras: ['Recipient’s obligations of non-disclosure and non-use under this Agreement will not apply to any portion of Discloser’s Confidential Information that Recipient can demonstrate, by competent proof:', '(a) is generally known to the public at the time of disclosure or becomes generally known through no wrongful act on the part of Recipient;\n(b) is in Recipient’s possession at the time of disclosure other than as a result of Recipient’s breach of any legal obligation;\n(c) becomes known to Recipient on a non-confidential basis through disclosure by sources other than Discloser having the legal right to disclose such Confidential Information; or\n(d) is independently developed by Recipient without reference to or reliance upon Discloser’s Confidential Information.']
}, {
  n: '6.',
  title: 'Rights and Licenses.',
  paras: ['Recipient agrees that, as between the parties, Discloser is and will remain the exclusive owner of Discloser’s Confidential Information and all patent, copyright, trademark and other intellectual property rights in such Confidential Information. Except for the right to use Discloser’s Confidential Information for the Purpose, no other right or license is granted to Recipient by this Agreement and the disclosure of Confidential Information does not result in any obligation by Discloser to grant Recipient any right in or to such Confidential Information.']
}, {
  n: '7.',
  title: 'Term and Termination.',
  paras: ['This Agreement will be effective for a period of one (1) year following the Effective Date unless earlier terminated by a party upon thirty (30) days’ prior written notice to the other party. The obligations of non-disclosure and non-use in this Agreement will survive any such expiration or termination and continue in full force and effect for a period of five (5) years from the date of expiration or termination. Upon the request of Discloser, Recipient will promptly (a) at Discloser’s option, either destroy or return to Discloser all of Discloser’s Confidential Information, along with any copies of such Confidential Information made by or for Recipient; and (b) if Discloser elects to have Recipient destroy such Confidential Information, provide a written certification to Discloser regarding such destruction. Recipient may, however, retain one (1) copy of Discloser’s Confidential Information in its confidential files, solely for the purpose of monitoring its continuing obligations of non-disclosure and non-use under this Agreement.']
}, {
  n: '8.',
  title: 'Remedies.',
  paras: ['Recipient agrees that (a) Discloser may be irreparably injured by a breach of this Agreement by Recipient; (b) money damages would not be an adequate remedy for any such breach; (c) as a remedy for any such breach Discloser will be entitled to seek equitable relief, including injunctive relief and specific performance, without being required by Recipient to post a bond; and (d) such remedy will not be the exclusive remedy for any breach of this Agreement.']
}, {
  n: '9.',
  title: 'No Warranties.',
  paras: ['Neither party makes any representations or warranties, express or implied, with respect to the accuracy or completeness of its Confidential Information. Discloser will have no liability with respect to the use or reliance upon Discloser’s Confidential Information by Recipient.']
}, {
  n: '10.',
  title: 'Miscellaneous.',
  paras: ['(a) Entire Agreement. This Agreement contains the entire agreement of the parties with regard to its subject matter and supersedes all prior or contemporaneous written or oral representations, agreements and understandings between the parties relating to that subject matter. This Agreement may be changed only by a writing signed by an authorized representative of each party.', '(b) Assignment and Binding Effect. This Agreement may not be assigned or transferred by either party without the prior written consent of the other party; provided, however, that either party may transfer or assign this Agreement without the prior written consent of the other party, but with written notice, to an affiliate or in connection with a merger, consolidation, or a sale or transfer of all or substantially all of the assets to which the Purpose relates. Any purported assignment or transfer in violation of this Section is void.', '(c) Notices. All notices required or permitted under this Agreement must be in writing and must be given by directing the notice to the address for the receiving party set forth in this Agreement or at such other address as the receiving party may specify in writing. Notices to each party will be marked “Attention: Legal”.', '(d) Governing Law. This Agreement and any disputes relating to or arising out of this Agreement will be governed by, construed, and interpreted in accordance with the internal laws of the Commonwealth of Massachusetts, without regard to any choice of law principle that would require the application of the law of another jurisdiction. The parties agree to submit to the exclusive jurisdiction of the state and federal courts located in the Commonwealth of Massachusetts and waive any defense of inconvenient forum.', '(e) Severability; Reformation. Each provision in this Agreement is independent and severable from the others, and no provision will be rendered unenforceable because any other provision is found to be invalid or unenforceable in whole or in part. If any provision is found to be invalid or unenforceable in whole or in part, such provision shall be changed and interpreted so as to best accomplish the objectives of such provision and the intent of the parties, within the limits of applicable law.', '(f) Waivers. Any delay in enforcing a party’s rights under this Agreement, or any waiver as to a particular default or other matter, will not constitute a waiver of such party’s rights to the future enforcement of its rights under this Agreement, except with respect to an express written waiver signed by an authorized representative of the waiving party.', '(g) Counterparts. This Agreement may be executed in one or more counterparts, each of which will be deemed an original, and all of which together will be deemed to be one and the same instrument. A portable document format (“.pdf”) copy or a copy executed using a recognized electronic signature service will each be deemed an original.']
}];
function NDADoc({
  blank
}) {
  const filled = !blank;
  return /*#__PURE__*/React.createElement(DvPage, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.mono,
      fontSize: 10,
      letterSpacing: '0.14em',
      color: PW.mute,
      fontWeight: 600
    }
  }, "CONFIDENTIAL"), /*#__PURE__*/React.createElement(DvMark, {
    entity: PRODIGY
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontFamily: PW.sans,
      fontSize: 11,
      color: PW.mute
    }
  }, PRODIGY.addr1, " \xA0|\xA0 ", PRODIGY.addr2), /*#__PURE__*/React.createElement(DvDocTitle, {
    kicker: "Confidentiality",
    title: "Mutual Confidentiality Agreement",
    refNo: filled ? 'PRD-NDA-2026-0031' : '',
    blank: blank,
    effValue: filled ? '11 June 2026' : ''
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 16,
      textWrap: 'pretty'
    }
  }, "THIS MUTUAL CONFIDENTIALITY AGREEMENT (the \u201CAgreement\u201D) is made as of the Effective Date set out above (the \u201CEffective Date\u201D) by and between ", /*#__PURE__*/React.createElement(DvField, {
    value: filled ? 'Helio Bio, Inc.' : '',
    w: 200,
    blank: blank
  }), ", with an office at ", /*#__PURE__*/React.createElement(DvField, {
    value: "",
    w: 220,
    blank: true
  }), " (the \u201CCounterparty\u201D), and Prodigy Scientific, a California corporation with an office at 5414 Oberlin Drive, Ste. 150, San Diego, CA 92121."), NDA_SECTIONS.map(s => /*#__PURE__*/React.createElement(DvLegalSection, _extends({
    key: s.n
  }, s))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26,
      paddingTop: 16,
      borderTop: `1px solid ${PW.line}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 800,
      fontSize: 12,
      color: PW_PAPER_INK,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: 4
    }
  }, "Executed as of the Effective Date"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      flexWrap: 'wrap',
      rowGap: 26,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(DvSig, {
    org: "Counterparty",
    sub: filled ? 'Helio Bio, Inc.' : undefined,
    name: "",
    title: "",
    date: "",
    blank: true
  }), /*#__PURE__*/React.createElement(DvSig, {
    org: "Prodigy Scientific",
    name: filled ? 'Ali Darwish' : '',
    title: filled ? 'Program Director' : '',
    date: filled ? '11 Jun 2026' : '',
    blank: blank
  }))));
}

// ═════════ ORDER INVOICE ══════════════════════════════════════════════
function PaidStamp({
  paid,
  blank
}) {
  if (blank) {
    // Template: a status section with both options to mark.
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex',
        gap: 16,
        alignItems: 'center',
        padding: '8px 14px',
        border: `1px dashed ${PW.line2}`,
        borderRadius: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: PW.mono,
        fontSize: 10,
        color: PW.mute,
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase'
      }
    }, "Status"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: PW.sans,
        fontSize: 12.5,
        color: PW.ink500,
        fontWeight: 600
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 14,
        height: 14,
        border: `1.5px solid ${PW.line2}`,
        borderRadius: 3,
        display: 'inline-block'
      }
    }), " Paid"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: PW.sans,
        fontSize: 12.5,
        color: PW.ink500,
        fontWeight: 600
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 14,
        height: 14,
        border: `1.5px solid ${PW.line2}`,
        borderRadius: 3,
        display: 'inline-block'
      }
    }), " Unpaid"));
  }
  const ok = paid;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      padding: '7px 14px',
      borderRadius: 6,
      border: `2px solid ${ok ? '#0E9560' : '#C0392B'}`,
      color: ok ? '#0A7048' : '#A02A1E',
      background: ok ? '#E6F5EC' : '#FBE9E6',
      fontFamily: PW.sans,
      fontWeight: 800,
      fontSize: 14,
      letterSpacing: '0.04em',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 99,
      background: ok ? '#0E9560' : '#C0392B'
    }
  }), ok ? 'Paid' : 'Unpaid · Balance due');
}
function InvoiceDoc({
  blank,
  paid,
  meta
}) {
  const m = meta || {};
  const lines = blank ? [] : m.lines || [{
    sku: 'TF-26140',
    name: 'Fetal Bovine Serum (FBS), US-sourced',
    unit: '500 mL',
    qty: 2,
    price: 489.00,
    list: 545.00
  }, {
    sku: 'TF-11965',
    name: 'DMEM, high glucose, no glutamine',
    unit: '500 mL',
    qty: 6,
    price: 56.80,
    list: 63.73
  }, {
    sku: 'CS-4970',
    name: 'β-Actin (13E5) Rabbit mAb',
    unit: '100 µL',
    qty: 1,
    price: 408.00,
    list: 445.00
  }, {
    sku: 'FS-1256',
    name: 'Pipette Tips, 1000 µL, filtered, sterile',
    unit: 'rack ×96 (×10)',
    qty: 4,
    price: 92.00,
    list: 108.00
  }];
  const blankRows = blank ? Array.from({
    length: 6
  }) : [];
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const listTotal = lines.reduce((s, l) => s + l.list * l.qty, 0);
  const savings = listTotal - subtotal;
  const fee = blank ? 0 : +(subtotal * 0.10).toFixed(2); // 10% Administrative Fee per Lab Support Agreement §8(b)
  const total = subtotal + fee;
  const COLS = '86px 1fr 78px 50px 88px 92px';
  return /*#__PURE__*/React.createElement(DvPage, {
    pad: "52px 60px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 20,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DvMark, {
    entity: PROCUREWIDE
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9,
      fontFamily: PW.sans,
      fontSize: 11,
      color: PW.mute,
      lineHeight: 1.55
    }
  }, PROCUREWIDE.name, " \xB7 ", PROCUREWIDE.addr1, /*#__PURE__*/React.createElement("br", null), PROCUREWIDE.addr2, " \xB7 billing@procurewide.com")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.display,
      fontWeight: 700,
      fontSize: 26,
      letterSpacing: '-0.02em',
      color: PW_PAPER_INK
    }
  }, "Invoice"), /*#__PURE__*/React.createElement("table", {
    style: {
      marginTop: 8,
      marginLeft: 'auto',
      fontFamily: PW.mono,
      fontSize: 11,
      color: PW.ink500,
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: {
      color: PW.mute,
      paddingRight: 12,
      textAlign: 'right'
    }
  }, "Invoice #"), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement(DvField, {
    value: blank ? '' : m.invNo || 'INV-2026-0142',
    w: 104,
    blank: blank,
    mono: true
  }))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: {
      color: PW.mute,
      paddingRight: 12,
      textAlign: 'right'
    }
  }, "Order #"), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement(DvField, {
    value: blank ? '' : m.orderNo || 'PW-ORD-3318',
    w: 104,
    blank: blank,
    mono: true
  }))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: {
      color: PW.mute,
      paddingRight: 12,
      textAlign: 'right'
    }
  }, "Issued"), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement(DvField, {
    value: blank ? '' : m.issued || '12 Jun 2026',
    w: 104,
    blank: blank,
    mono: true
  }))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: {
      color: PW.mute,
      paddingRight: 12,
      textAlign: 'right'
    }
  }, "Due"), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement(DvField, {
    value: blank ? '' : m.due || '22 Jun 2026',
    w: 104,
    blank: blank,
    mono: true
  }))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(PaidStamp, {
    paid: paid,
    blank: blank
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 18,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 230px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.mono,
      fontSize: 10,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: PW_GREEN,
      fontWeight: 700
    }
  }, "Bill to"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 5,
      fontSize: 12.5,
      color: PW.ink500,
      lineHeight: 1.55
    }
  }, blank ? /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(DvField, {
    value: "",
    w: 180,
    blank: true
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(DvField, {
    value: "",
    w: 160,
    blank: true
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(DvField, {
    value: "",
    w: 140,
    blank: true
  })) : /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: PW_PAPER_INK
    }
  }, m.billTo || 'Helio Bio, Inc.'), /*#__PURE__*/React.createElement("br", null), "Attn: Research Operations", /*#__PURE__*/React.createElement("br", null), "Member of the Prodigy incubator program"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 230px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.mono,
      fontSize: 10,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: PW_GREEN,
      fontWeight: 700
    }
  }, "Fulfilled by"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 5,
      fontSize: 12.5,
      color: PW.ink500,
      lineHeight: 1.55
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: PW_PAPER_INK
    }
  }, PRODIGY.name), /*#__PURE__*/React.createElement("br", null), PRODIGY.addr1, /*#__PURE__*/React.createElement("br", null), PRODIGY.addr2))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      border: `1px solid ${PW.line}`,
      borderRadius: 4,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: COLS,
      gap: 10,
      padding: '9px 14px',
      background: '#F4F6F9',
      borderBottom: `1px solid ${PW.line}`,
      fontFamily: PW.sans,
      fontSize: 10,
      fontWeight: 800,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  }, /*#__PURE__*/React.createElement("span", null, "SKU"), /*#__PURE__*/React.createElement("span", null, "Description"), /*#__PURE__*/React.createElement("span", null, "Unit"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right'
    }
  }, "Qty"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right'
    }
  }, "Price"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right'
    }
  }, "Amount")), lines.map(l => /*#__PURE__*/React.createElement("div", {
    key: l.sku,
    style: {
      display: 'grid',
      gridTemplateColumns: COLS,
      gap: 10,
      padding: '11px 14px',
      borderBottom: `1px solid ${PW.line}`,
      alignItems: 'baseline',
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 11,
      color: PW.ink500
    }
  }, l.sku), /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW_PAPER_INK,
      fontWeight: 600
    }
  }, l.name), /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.mute,
      fontSize: 11.5
    }
  }, l.unit), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right',
      fontVariantNumeric: 'tabular-nums'
    }
  }, l.qty), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right',
      fontFamily: PW.mono,
      fontSize: 11.5,
      fontVariantNumeric: 'tabular-nums'
    }
  }, money(l.price)), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right',
      fontFamily: PW.mono,
      fontSize: 11.5,
      fontWeight: 700,
      color: PW_PAPER_INK,
      fontVariantNumeric: 'tabular-nums'
    }
  }, money(l.price * l.qty)))), blankRows.map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: COLS,
      gap: 10,
      padding: '14px',
      borderBottom: `1px solid ${PW.line}`
    }
  }, [0, 1, 2, 3, 4, 5].map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    style: {
      borderBottom: `1px solid ${PW.paper2}`,
      height: '1em'
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      minWidth: 290,
      fontFamily: PW.sans,
      fontSize: 12.5,
      color: PW.ink500,
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '4px 0'
    }
  }, "Subtotal (cost of Supplies)"), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'right',
      fontFamily: PW.mono,
      fontVariantNumeric: 'tabular-nums'
    }
  }, blank ? /*#__PURE__*/React.createElement(DvField, {
    value: "",
    w: 80,
    blank: true
  }) : money(subtotal))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '4px 0',
      color: PW_GREEN
    }
  }, "Contract savings vs. list"), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'right',
      fontFamily: PW.mono,
      color: PW_GREEN,
      fontVariantNumeric: 'tabular-nums'
    }
  }, blank ? /*#__PURE__*/React.createElement(DvField, {
    value: "",
    w: 80,
    blank: true
  }) : '−' + money(savings))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '4px 0'
    }
  }, "Administrative Fee (10%)"), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'right',
      fontFamily: PW.mono,
      fontVariantNumeric: 'tabular-nums'
    }
  }, blank ? /*#__PURE__*/React.createElement(DvField, {
    value: "",
    w: 80,
    blank: true
  }) : money(fee))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 0 0',
      borderTop: `2px solid ${PW_PAPER_INK}`,
      fontWeight: 800,
      color: PW_PAPER_INK,
      fontSize: 14
    }
  }, "Total due"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 0 0',
      borderTop: `2px solid ${PW_PAPER_INK}`,
      textAlign: 'right',
      fontFamily: PW.mono,
      fontWeight: 800,
      color: PW_PAPER_INK,
      fontSize: 15,
      fontVariantNumeric: 'tabular-nums'
    }
  }, blank ? /*#__PURE__*/React.createElement(DvField, {
    value: "",
    w: 90,
    blank: true
  }) : money(total))), !blank && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 0 0',
      color: paid ? '#0A7048' : '#A02A1E',
      fontWeight: 700
    }
  }, paid ? 'Amount paid' : 'Balance outstanding'), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 0 0',
      textAlign: 'right',
      fontFamily: PW.mono,
      fontWeight: 800,
      color: paid ? '#0A7048' : '#A02A1E',
      fontVariantNumeric: 'tabular-nums'
    }
  }, paid ? money(total) : money(total)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      paddingTop: 14,
      borderTop: `1px solid ${PW.line}`,
      fontFamily: PW.sans,
      fontSize: 11,
      color: PW.mute,
      lineHeight: 1.6
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: PW.ink500
    }
  }, "Payment"), " \u2014 Undisputed invoices are due within ten (10) days of receipt per the Lab Support Agreement (\xA78c). Remit to ", PROCUREWIDE.name, ", ", PROCUREWIDE.addr1, ", ", PROCUREWIDE.addr2, ", or pay through the portal. Prices reflect the last-paid contract price; vendor rates may vary at fulfillment. Questions: billing@procurewide.com."));
}

// ───────── Full-screen viewer shell ──────────────────────────────────
function DocViewer({
  doc,
  onClose
}) {
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);
  if (!doc) return null;
  const Body = doc.kind === 'contract' ? ContractDoc : doc.kind === 'nda' ? NDADoc : InvoiceDoc;
  const kindLabel = doc.kind === 'contract' ? 'Agreement' : doc.kind === 'nda' ? 'NDA' : 'Invoice';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 9500,
      display: 'flex',
      flexDirection: 'column',
      background: 'rgba(7,17,42,0.55)',
      backdropFilter: 'blur(3px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pw-doc-toolbar",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 18px',
      background: PW_PAPER_INK,
      color: '#fff',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      padding: '3px 8px',
      borderRadius: 3,
      background: 'rgba(255,255,255,0.14)',
      color: doc.blank ? '#FFD27A' : '#7BE0B0'
    }
  }, doc.blank ? 'Master template' : kindLabel), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 14,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, doc.name), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => window.print(),
    style: toolBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 15,
    color: "#fff"
  }), " Print / PDF"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      ...toolBtn,
      background: 'rgba(255,255,255,0.10)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 15,
    color: "#fff"
  }), " Close")), /*#__PURE__*/React.createElement("div", {
    className: "pw-doc-scroll",
    onClick: onClose,
    style: {
      flex: 1,
      overflow: 'auto',
      padding: '32px 20px 64px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement(Body, {
    blank: doc.blank,
    paid: doc.paid,
    meta: doc.meta
  }))));
}
const toolBtn = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '7px 12px',
  borderRadius: 5,
  background: PW_GREEN,
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  fontFamily: PW.sans,
  fontSize: 12.5,
  fontWeight: 700
};
Object.assign(window, {
  ContractDoc,
  NDADoc,
  InvoiceDoc,
  DocViewer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/DocViewer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/DocumentsPage.jsx
try { (() => {
// Documents & forms.
//
// Visibility model (see AdminMode.jsx for the role definitions):
//   • EXECUTED documents (the member's own signed agreement + their invoices)
//     are visible to everyone signed into the member account.
//   • MASTER TEMPLATES (blank contract / NDA / invoice) are ProcureWide operator
//     material and render ONLY when useSystemAdmin() is true. In production gate
//     this server-side on role === 'pw_admin' — do not trust the client flag.

const DOCUMENT_CATEGORIES = ['All', 'Templates', 'Guidelines', 'Compliance', 'Agreements', 'Quotes'];
const DOC_FILE_CATEGORIES = ['Templates', 'Guidelines', 'Compliance', 'Agreements', 'Quotes'];

// Executed / live documents — visible to the member.
const MEMBER_DOCUMENTS = [{
  id: 'agr-0142',
  name: 'Lab Support Agreement — Prodigy Scientific · Helio Bio',
  cat: 'Agreements',
  kind: 'contract',
  blank: false,
  date: '2026-06-11',
  tags: ['executed', 'lab support', 'agency']
}, {
  id: 'nda-0031',
  name: 'Mutual Confidentiality Agreement — Prodigy Scientific · Helio Bio',
  cat: 'Agreements',
  kind: 'nda',
  blank: false,
  date: '2026-06-11',
  tags: ['executed', 'confidentiality']
}, {
  id: 'inv-0142',
  name: 'Order Invoice INV-2026-0142 — Helio Bio',
  cat: 'Quotes',
  kind: 'invoice',
  blank: false,
  paid: true,
  date: '2026-06-12',
  tags: ['invoice', 'paid', 'PW-ORD-3318']
}, {
  id: 'inv-0138',
  name: 'Order Invoice INV-2026-0138 — Helio Bio',
  cat: 'Quotes',
  kind: 'invoice',
  blank: false,
  paid: false,
  date: '2026-05-28',
  tags: ['invoice', 'unpaid', 'PW-ORD-3291'],
  meta: {
    invNo: 'INV-2026-0138',
    orderNo: 'PW-ORD-3291',
    issued: '28 May 2026',
    due: '07 Jun 2026',
    billTo: 'Helio Bio, Inc.',
    lines: [{
      sku: 'BR-1725271',
      name: 'SsoAdvanced SYBR Green Supermix',
      unit: '500 rxn',
      qty: 2,
      price: 312.00,
      list: 358.00
    }, {
      sku: 'TF-18080',
      name: 'SuperScript IV Reverse Transcriptase',
      unit: '10,000 U',
      qty: 1,
      price: 398.00,
      list: 441.00
    }, {
      sku: 'FS-3375',
      name: 'Conical Tubes, 50 mL, sterile',
      unit: 'case ×500',
      qty: 3,
      price: 168.00,
      list: 192.00
    }]
  }
}];

// Master templates — ProcureWide system admin only.
const TEMPLATE_DOCUMENTS = [{
  id: 'tpl-contract',
  name: 'Lab Support Agreement — Master Template',
  cat: 'Templates',
  kind: 'contract',
  blank: true,
  date: '2026-06-01',
  tags: ['template', 'contract']
}, {
  id: 'tpl-nda',
  name: 'Mutual Confidentiality Agreement — Master Template',
  cat: 'Templates',
  kind: 'nda',
  blank: true,
  date: '2026-06-01',
  tags: ['template', 'NDA']
}, {
  id: 'tpl-invoice',
  name: 'Order Invoice — Master Template',
  cat: 'Templates',
  kind: 'invoice',
  blank: true,
  date: '2026-06-01',
  tags: ['template', 'invoice']
}];
const KIND_LABEL = {
  contract: 'Agreement',
  nda: 'NDA',
  invoice: 'Invoice'
};
function DocKindIcon({
  kind,
  blank
}) {
  const color = blank ? '#8A6308' : kind === 'invoice' ? '#0A7048' : '#1E4FB0';
  return /*#__PURE__*/React.createElement(ObjIcon, {
    name: kind === 'invoice' ? 'tag' : 'doc',
    size: 20,
    color: color
  });
}
function DocRow({
  doc,
  effectiveCat,
  onView,
  canRefile
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'grid',
      gridTemplateColumns: '24px 1.7fr 120px 120px 1fr',
      gap: 12,
      alignItems: 'center',
      padding: '12px 16px',
      borderBottom: `1px solid ${PW.line}`,
      background: hover ? '#FAFBF7' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement(DocKindIcon, {
    kind: doc.kind,
    blank: doc.blank
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onView(doc),
    style: {
      background: 'transparent',
      border: 0,
      textAlign: 'left',
      color: SLDS_BLUE,
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 13.5,
      cursor: 'pointer',
      padding: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: '100%'
    }
  }, doc.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      marginTop: 3,
      flexWrap: 'wrap'
    }
  }, doc.blank && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '1px 6px',
      borderRadius: 2,
      background: '#FCEFD3',
      color: '#8A6308',
      fontFamily: PW.sans,
      fontSize: 10.5,
      fontWeight: 700
    }
  }, "BLANK"), doc.kind === 'invoice' && !doc.blank && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '1px 6px',
      borderRadius: 2,
      fontFamily: PW.sans,
      fontSize: 10.5,
      fontWeight: 700,
      background: doc.paid ? '#E6F5EC' : '#FBE9E6',
      color: doc.paid ? '#0A7048' : '#A02A1E'
    }
  }, doc.paid ? 'PAID' : 'UNPAID'), doc.tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      padding: '1px 6px',
      borderRadius: 2,
      background: '#F0F0EC',
      color: PW.ink500,
      fontFamily: PW.sans,
      fontSize: 10.5,
      fontWeight: 500
    }
  }, t)))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11.5,
      color: PW.ink500,
      fontWeight: 600,
      padding: '2px 8px',
      borderRadius: 3,
      background: '#EEF0F4',
      justifySelf: 'start'
    }
  }, effectiveCat), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 12,
      color: PW.mute
    }
  }, doc.date), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      justifyContent: 'flex-end',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(CategoryEditor, {
    itemKey: 'doc:' + doc.id,
    value: effectiveCat,
    options: DOC_FILE_CATEGORIES,
    enabled: canRefile,
    compact: true
  }), /*#__PURE__*/React.createElement(AppButton, {
    variant: "secondary",
    size: "sm",
    onClick: () => onView(doc)
  }, "View")));
}
function DocumentsPage({
  onNavigate
}) {
  const [q, setQ] = React.useState('');
  const [cat, setCat] = React.useState('All');
  const [viewing, setViewing] = React.useState(null);
  const sysAdmin = useSystemAdmin();
  const overrides = useCatOverrides();

  // Templates only appear for ProcureWide system admins.
  const allDocs = sysAdmin ? [...MEMBER_DOCUMENTS, ...TEMPLATE_DOCUMENTS] : MEMBER_DOCUMENTS;
  const catOf = d => overrides['doc:' + d.id] || d.cat;
  let docs = allDocs.filter(d => {
    const c = catOf(d);
    if (cat !== 'All' && c !== cat) return false;
    if (q.trim()) {
      const t = (d.name + ' ' + c + ' ' + (KIND_LABEL[d.kind] || '') + ' ' + d.tags.join(' ')).toLowerCase();
      return t.includes(q.trim().toLowerCase());
    }
    return true;
  });
  const counts = {};
  allDocs.forEach(d => {
    const c = catOf(d);
    counts[c] = (counts[c] || 0) + 1;
  });
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHeader, {
    icon: "doc",
    kicker: "Operations",
    title: "Documents & forms"
  }, /*#__PURE__*/React.createElement(SystemAdminSwitch, null), /*#__PURE__*/React.createElement(AppButton, {
    variant: "primary",
    icon: "upload"
  }, "Upload document")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 28px 60px',
      maxWidth: 1200,
      margin: '0 auto'
    }
  }, sysAdmin && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      marginBottom: 14,
      padding: '10px 14px',
      background: '#FFF6E8',
      border: '1px solid #E7C98A',
      borderRadius: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    size: 15,
    color: "#8A6308"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12.5,
      color: '#6E4F12',
      fontWeight: 600
    }
  }, "ProcureWide admin \u2014 master templates are visible and you can re-file any document with the \u201CFile as\u201D control. Members never see this view.")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: PW.white,
      border: `1px solid ${PW.line}`,
      borderRadius: 4,
      padding: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      color: PW.mute
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 16
  })), /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Search by name, category, or tag\u2026",
    style: {
      width: '100%',
      padding: '11px 14px 11px 38px',
      fontFamily: PW.sans,
      fontSize: 14,
      color: PW.ink,
      background: '#FAFBF7',
      border: `1px solid ${PW.line2}`,
      borderRadius: 4,
      outline: 'none',
      boxSizing: 'border-box'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, DOCUMENT_CATEGORIES.map(c => {
    const n = c === 'All' ? allDocs.length : counts[c] || 0;
    return /*#__PURE__*/React.createElement("button", {
      key: c,
      onClick: () => setCat(c),
      style: {
        padding: '5px 11px',
        borderRadius: 3,
        background: cat === c ? '#DDE7F8' : PW.white,
        color: cat === c ? '#1E4FB0' : PW.ink500,
        border: `1px solid ${cat === c ? '#9EBEEC' : PW.line2}`,
        fontFamily: PW.sans,
        fontSize: 12.5,
        fontWeight: cat === c ? 600 : 500,
        cursor: 'pointer'
      }
    }, c, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: PW.mute,
        fontWeight: 500
      }
    }, n));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 15,
      color: PW.ink
    }
  }, docs.length, " document", docs.length !== 1 ? 's' : ''), (q || cat !== 'All') && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setQ('');
      setCat('All');
    },
    style: {
      background: 'transparent',
      border: 0,
      color: SLDS_BLUE,
      cursor: 'pointer',
      fontFamily: PW.sans,
      fontSize: 12.5,
      fontWeight: 600
    }
  }, "Clear filters")), /*#__PURE__*/React.createElement(SectionCard, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '24px 1.7fr 120px 120px 1fr',
      gap: 12,
      padding: '9px 16px',
      background: '#F4F6F9',
      borderBottom: `1px solid ${PW.line}`,
      fontFamily: PW.sans,
      fontSize: 10.5,
      fontWeight: 700,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null, "Document"), /*#__PURE__*/React.createElement("span", null, "Category"), /*#__PURE__*/React.createElement("span", null, "Updated"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right'
    }
  }, "Action")), docs.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    icon: "doc",
    title: "No documents match",
    sub: "Try a different search term or filter."
  }) : docs.map(d => /*#__PURE__*/React.createElement(DocRow, {
    key: d.id,
    doc: d,
    effectiveCat: catOf(d),
    onView: setViewing,
    canRefile: sysAdmin
  }))), sysAdmin && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 13,
      color: PW.ink,
      marginBottom: 10,
      display: 'flex',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    size: 14,
    color: "#8A6308"
  }), " Master templates ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11.5,
      fontWeight: 500,
      color: PW.mute
    }
  }, "\xB7 ProcureWide admin only")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: 12
    }
  }, [{
    id: 'tpl-contract',
    title: 'Lab Support Agreement',
    sub: 'Blank Prodigy ↔ member agreement.'
  }, {
    id: 'tpl-nda',
    title: 'Mutual NDA',
    sub: 'Blank confidentiality agreement.'
  }, {
    id: 'tpl-invoice',
    title: 'Order Invoice',
    sub: 'Blank invoice, ready to fill.'
  }].map(t => /*#__PURE__*/React.createElement(SectionCard, {
    key: t.id,
    title: t.title,
    icon: "doc",
    padded: true,
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 12px',
      fontFamily: PW.sans,
      fontSize: 13,
      color: PW.ink500
    }
  }, t.sub), /*#__PURE__*/React.createElement(AppButton, {
    variant: "secondary",
    size: "sm",
    onClick: () => setViewing(TEMPLATE_DOCUMENTS.find(d => d.id === t.id))
  }, "Open template")))))), /*#__PURE__*/React.createElement(DocViewer, {
    doc: viewing,
    onClose: () => setViewing(null)
  }));
}
Object.assign(window, {
  DocumentsPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/DocumentsPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/HomePage.jsx
try { (() => {
// Home — operational overview: KPIs, discount progress, low-stock reorder,
// recent orders, quick actions. No AI, just signal the customer acts on.

function QuickAction({
  icon,
  label,
  sub,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 16px',
      textAlign: 'left',
      background: PW.white,
      border: `1px solid ${hover ? PW.line2 : PW.line}`,
      borderRadius: 4,
      cursor: 'pointer',
      boxShadow: hover ? PW.shadowMd : 'none',
      transition: 'all 140ms ease'
    }
  }, /*#__PURE__*/React.createElement(ObjIcon, {
    name: icon,
    size: 34,
    color: SLDS_BLUE
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 14,
      color: PW.ink
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.mute,
      marginTop: 1
    }
  }, sub)), /*#__PURE__*/React.createElement(Icon, {
    name: "arrowR",
    size: 16,
    color: PW.mute
  }));
}
function HomePage({
  onNavigate
}) {
  const s = useStore();
  const lows = s.inventory.filter(r => invStatus(r) !== 'ok');
  const cartCount = s.cart.reduce((a, l) => a + l.qty, 0);
  const openOrders = s.orders.filter(o => o.status === 'Processing' || o.status === 'In transit');
  const qtdSpend = Object.values(s.spend).reduce((a, b) => a + b, 0);
  const savedQtr = Object.keys(SPEND_TIERS).reduce((a, k) => a + spendStatus(k).guaranteed, 0);

  // Best next-tier opportunity
  const nextOpp = Object.keys(SPEND_TIERS).map(k => ({
    k,
    st: spendStatus(k)
  })).filter(x => x.st.next).sort((a, b) => a.st.toNext - b.st.toNext)[0];
  const recent = s.orders.slice(0, 4);

  // KPI breakdown data
  const spendDetails = Object.entries(s.spend).map(([k, v]) => ({
    label: vendor(k).name,
    value: money0(v),
    raw: v
  })).sort((a, b) => b.raw - a.raw);
  const savingsDetails = Object.keys(SPEND_TIERS).map(k => ({
    k,
    g: spendStatus(k).guaranteed
  })).filter(x => x.g > 0).sort((a, b) => b.g - a.g).map(x => ({
    label: vendor(x.k).name,
    value: money0(x.g),
    tone: '#0A7048'
  }));
  const openDetails = openOrders.map(o => ({
    label: o.id + ' · ' + o.status,
    value: money(o.total),
    dot: o.status === 'In transit' ? SLDS_BLUE : '#E0A60A',
    onClick: () => onNavigate('orders')
  }));
  const lowDetails = lows.map(r => {
    const p = product(r.sku);
    return {
      label: p ? p.name : r.sku,
      value: r.onHand + ' on hand',
      tone: r.onHand <= 0 ? '#8B1F1B' : '#8A6308',
      dot: r.onHand <= 0 ? '#D6322D' : '#E0A60A',
      onClick: () => onNavigate('inventory')
    };
  });
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHeader, {
    icon: "home",
    kicker: `${s.account.name} · ${s.account.quarter}`,
    title: "Welcome back"
  }, /*#__PURE__*/React.createElement(AppButton, {
    variant: "primary",
    icon: "order",
    onClick: () => onNavigate('order')
  }, "New order")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 28px 60px',
      maxWidth: 1280,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 14,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Kpi, {
    label: "Spend this quarter",
    value: money0(qtdSpend),
    icon: "tag",
    sub: "across all vendors",
    details: spendDetails,
    viewAll: {
      label: 'Discounts & forecast',
      cta: 'Open Discounts & forecast',
      onClick: () => onNavigate('discounts')
    }
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Guaranteed savings",
    value: money0(savedQtr),
    tone: "green",
    icon: "bolt",
    sub: "tiers unlocked",
    details: savingsDetails,
    viewAll: {
      label: 'Discounts & forecast',
      cta: 'Open Discounts & forecast',
      onClick: () => onNavigate('discounts')
    }
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Open orders",
    value: openOrders.length,
    tone: openOrders.length ? 'blue' : undefined,
    icon: "truck",
    sub: "in transit or processing",
    details: openDetails,
    viewAll: {
      label: 'Order history',
      cta: 'Open Order history',
      onClick: () => onNavigate('orders')
    }
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Low on stock",
    value: lows.length,
    tone: lows.length ? 'danger' : undefined,
    icon: "alert",
    sub: "below reorder point",
    details: lowDetails,
    viewAll: {
      label: 'Inventory',
      cta: 'Open Inventory',
      onClick: () => onNavigate('inventory')
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 360px',
      gap: 18,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, nextOpp && /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 6,
      overflow: 'hidden',
      background: 'linear-gradient(120deg, #07112A 0%, #0B2A4A 60%, #0A5C3D 130%)',
      padding: '20px 22px',
      color: '#fff',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: '#7CD9A7'
    }
  }, "Savings within reach"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 19,
      fontWeight: 700,
      marginTop: 6,
      letterSpacing: '-0.01em',
      textWrap: 'pretty'
    }
  }, "Spend ", money0(nextOpp.st.toNext), " more with ", vendor(nextOpp.k).name, " and we guarantee ", money0(nextOpp.st.next.save), " off your order."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement(Progress, {
    pct: Math.min(100, nextOpp.st.total / nextOpp.st.next.at * 100),
    color: "#28B57A",
    track: "rgba(255,255,255,0.18)",
    height: 7
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 12,
      color: 'rgba(255,255,255,0.75)'
    }
  }, money0(nextOpp.st.total), " / ", money0(nextOpp.st.next.at), " this quarter"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(AppButton, {
    variant: "green",
    size: "sm",
    icon: "order",
    onClick: () => onNavigate('order')
  }, "Shop ", vendor(nextOpp.k).name.split(' ')[0]), /*#__PURE__*/React.createElement(AppButton, {
    size: "sm",
    onClick: () => onNavigate('discounts'),
    style: {
      background: 'rgba(255,255,255,0.14)',
      color: '#fff'
    }
  }, "All programs")))), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Reorder \u2014 low on stock",
    icon: "box",
    action: /*#__PURE__*/React.createElement("button", {
      onClick: () => onNavigate('inventory'),
      style: {
        background: 'transparent',
        border: 0,
        color: SLDS_BLUE,
        fontFamily: PW.sans,
        fontSize: 12,
        fontWeight: 600,
        cursor: 'pointer'
      }
    }, "View inventory")
  }, lows.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    icon: "check",
    title: "Everything's stocked",
    sub: "No items are below their reorder point."
  }) : lows.slice(0, 5).map((r, i) => {
    const p = product(r.sku);
    const need = Math.max(1, r.reorder * 2 - r.onHand);
    return /*#__PURE__*/React.createElement("div", {
      key: r.sku,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '11px 16px',
        borderBottom: i === Math.min(lows.length, 5) - 1 ? 0 : `1px solid ${PW.line}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: PW.sans,
        fontWeight: 600,
        fontSize: 13.5,
        color: PW.ink
      }
    }, p.name), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        marginTop: 2
      }
    }, /*#__PURE__*/React.createElement(VendorMark, {
      vendorKey: p.vendor,
      height: 11,
      nameStyle: {
        fontSize: 11.5
      }
    }))), /*#__PURE__*/React.createElement(StatusPill, {
      tone: invStatus(r) === 'out' ? 'danger' : 'warning'
    }, r.onHand, " on hand"), /*#__PURE__*/React.createElement(AppButton, {
      variant: "primary",
      size: "sm",
      icon: "cart",
      onClick: () => {
        addToCart(r.sku, need);
        Toast.show(`Added ${need} × ${p.name} to cart`, {
          action: {
            label: 'Cart',
            onClick: () => onNavigate('cart')
          }
        });
      }
    }, "Reorder ", need));
  })), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Recent orders",
    icon: "clock",
    action: /*#__PURE__*/React.createElement("button", {
      onClick: () => onNavigate('orders'),
      style: {
        background: 'transparent',
        border: 0,
        color: SLDS_BLUE,
        fontFamily: PW.sans,
        fontSize: 12,
        fontWeight: 600,
        cursor: 'pointer'
      }
    }, "View all")
  }, recent.map((o, i) => {
    const itemCount = o.lines.reduce((a, l) => a + l.qty, 0);
    return /*#__PURE__*/React.createElement("div", {
      key: o.id,
      onClick: () => onNavigate('orders'),
      style: {
        display: 'grid',
        gridTemplateColumns: '110px 1fr 110px 110px',
        gap: 10,
        alignItems: 'center',
        padding: '11px 16px',
        borderBottom: i === recent.length - 1 ? 0 : `1px solid ${PW.line}`,
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: PW.mono,
        fontSize: 12.5,
        color: SLDS_BLUE
      }
    }, o.id), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: PW.sans,
        fontSize: 12.5,
        color: PW.ink500
      }
    }, itemCount, " items \xB7 ", o.date), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: PW.sans,
        fontWeight: 700,
        fontSize: 13,
        color: PW.ink,
        fontVariantNumeric: 'tabular-nums'
      }
    }, money(o.total)), /*#__PURE__*/React.createElement("span", {
      style: {
        justifySelf: 'start'
      }
    }, /*#__PURE__*/React.createElement(StatusPill, {
      tone: statusTone(o.status)
    }, o.status)));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      position: 'sticky',
      top: 90
    }
  }, cartCount > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: PW.white,
      border: `1px solid ${PW.line}`,
      borderRadius: 4,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(ObjIcon, {
    name: "cart",
    size: 30,
    color: SLDS_BLUE
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 14,
      color: PW.ink
    }
  }, cartCount, " items in cart"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.mute
    }
  }, money(cartSummary().total), " \xB7 ", cartSummary().vendorGroups.length, " vendors"))), /*#__PURE__*/React.createElement(AppButton, {
    variant: "green",
    size: "md",
    icon: "arrowR",
    onClick: () => onNavigate('cart'),
    style: {
      width: '100%',
      justifyContent: 'center',
      marginTop: 12
    }
  }, "Go to cart")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 700,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      margin: '4px 2px 0'
    }
  }, "Quick actions"), /*#__PURE__*/React.createElement(QuickAction, {
    icon: "order",
    label: "Order catalog",
    sub: "Browse & add items",
    onClick: () => onNavigate('order')
  }), /*#__PURE__*/React.createElement(QuickAction, {
    icon: "upload",
    label: "Upload a cart",
    sub: "Bulk add from CSV",
    onClick: () => onNavigate('cart')
  }), /*#__PURE__*/React.createElement(QuickAction, {
    icon: "box",
    label: "Inventory",
    sub: `${lows.length} need reorder`,
    onClick: () => onNavigate('inventory')
  }), /*#__PURE__*/React.createElement(QuickAction, {
    icon: "tag",
    label: "Discounts & forecast",
    sub: `${money0(savedQtr)} unlocked`,
    onClick: () => onNavigate('discounts')
  })))));
}
Object.assign(window, {
  HomePage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/HomePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/InventoryPage.jsx
try { (() => {
// Inventory management — stock on hand, reorder points, low-stock alerts,
// one-click reorder to cart, manual adjust, lot/expiry, CSV sync.

function InvRow({
  row,
  onNavigate,
  onEdit
}) {
  const p = product(row.sku);
  if (!p) return null;
  const status = invStatus(row);
  const tone = status === 'out' ? 'danger' : status === 'low' ? 'warning' : 'success';
  const label = status === 'out' ? 'Out of stock' : status === 'low' ? 'Low' : 'In stock';
  const suggest = Math.max(p ? 1 : 1, row.reorder * 2 - row.onHand);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2.4fr 1fr 0.9fr 1.1fr 1.3fr 190px',
      gap: 12,
      alignItems: 'center',
      padding: '11px 16px',
      borderBottom: `1px solid ${PW.line}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 13.5,
      color: PW.ink,
      letterSpacing: '-0.005em'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      marginTop: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 11.5,
      color: SLDS_BLUE
    }
  }, p.catalog), /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.mute,
      fontSize: 11
    }
  }, "\xB7"), /*#__PURE__*/React.createElement(VendorMark, {
    vendorKey: p.vendor,
    height: 11,
    withName: true,
    nameStyle: {
      fontSize: 11.5
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(StatusPill, {
    tone: tone
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 11,
      color: PW.mute
    }
  }, "reorder @ ", row.reorder)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(QtyStepper, {
    value: row.onHand,
    onChange: v => adjustInventory(row.sku, v),
    min: 0,
    size: "sm"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.mono,
      fontSize: 12,
      color: PW.ink500
    }
  }, row.lot), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      color: PW.mute
    }
  }, row.expiry !== '—' ? 'exp ' + row.expiry : 'no expiry')), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.ink500
    }
  }, row.location), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onEdit(row),
    title: "Edit item",
    style: {
      width: 30,
      height: 30,
      border: `1px solid ${PW.line2}`,
      background: PW.white,
      borderRadius: 3,
      color: PW.ink500,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "doc",
    size: 14
  })), status !== 'ok' ? /*#__PURE__*/React.createElement(AppButton, {
    variant: "primary",
    size: "sm",
    icon: "cart",
    onClick: () => {
      addToCart(row.sku, suggest);
      Toast.show(`Added ${suggest} × ${p.name} to cart`, {
        action: {
          label: 'Cart',
          onClick: () => onNavigate('cart')
        }
      });
    }
  }, "Reorder ", suggest) : /*#__PURE__*/React.createElement(AppButton, {
    variant: "secondary",
    size: "sm",
    icon: "cart",
    onClick: () => {
      addToCart(row.sku, 1);
      Toast.show(`Added 1 × ${p.name} to cart`);
    }
  }, "Order")));
}
function InventoryPage({
  onNavigate
}) {
  const s = useStore();
  const [filter, setFilter] = React.useState('all'); // all | low | ok
  const [q, setQ] = React.useState('');
  const [editing, setEditing] = React.useState(null); // row being edited
  const [adding, setAdding] = React.useState(false);
  let rows = s.inventory.filter(r => {
    const p = product(r.sku);
    if (!p) return false;
    if (filter === 'low' && invStatus(r) === 'ok') return false;
    if (filter === 'ok' && invStatus(r) !== 'ok') return false;
    if (q.trim()) {
      const t = (p.name + ' ' + p.catalog + ' ' + vendor(p.vendor).name + ' ' + r.location).toLowerCase();
      return t.includes(q.trim().toLowerCase());
    }
    return true;
  });
  // low first
  rows = [...rows].sort((a, b) => {
    const order = {
      out: 0,
      low: 1,
      ok: 2
    };
    return order[invStatus(a)] - order[invStatus(b)];
  });
  const lows = s.inventory.filter(r => invStatus(r) !== 'ok');
  const outs = s.inventory.filter(r => invStatus(r) === 'out');
  const totalValue = s.inventory.reduce((a, r) => {
    const p = product(r.sku);
    return a + (p ? p.price * r.onHand : 0);
  }, 0);
  const reorderAll = () => {
    let n = 0;
    lows.forEach(r => {
      const need = Math.max(1, r.reorder * 2 - r.onHand);
      addToCart(r.sku, need);
      n += need;
    });
    if (n) Toast.show(`Added ${n} units across ${lows.length} low items to cart`, {
      action: {
        label: 'View cart',
        onClick: () => onNavigate('cart')
      }
    });
  };
  const handleCsv = rows => {
    // expects sku/catalog + onhand (and optional reorder)
    let n = 0;
    rows.forEach(r => {
      let p = r.sku && BY_SKU[r.sku.trim()] || CATALOG.find(x => x.catalog.toLowerCase() === String(r.catalog || r.sku || '').trim().toLowerCase());
      if (!p) return;
      const onHand = r.onhand != null ? parseInt(r.onhand, 10) : r['on hand'] != null ? parseInt(r['on hand'], 10) : null;
      if (onHand != null && !isNaN(onHand)) {
        adjustInventory(p.sku, onHand);
        n++;
      }
      if (r.reorder != null && !isNaN(parseInt(r.reorder, 10))) setReorderPoint(p.sku, parseInt(r.reorder, 10));
    });
    Toast.show(n ? `Synced ${n} inventory item${n > 1 ? 's' : ''} from CSV` : 'No matching items in that CSV', {
      tone: n ? undefined : 'danger'
    });
  };
  const exportInv = () => {
    const data = s.inventory.map(r => {
      const p = product(r.sku);
      return {
        catalog: p.catalog,
        sku: r.sku,
        name: p.name,
        onhand: r.onHand,
        reorder: r.reorder,
        lot: r.lot,
        expiry: r.expiry,
        location: r.location,
        status: invStatus(r)
      };
    });
    downloadText('procurewide-inventory.csv', toCSV(data, [{
      key: 'catalog',
      label: 'catalog #'
    }, {
      key: 'sku',
      label: 'sku'
    }, {
      key: 'name',
      label: 'name'
    }, {
      key: 'onhand',
      label: 'on hand'
    }, {
      key: 'reorder',
      label: 'reorder'
    }, {
      key: 'lot',
      label: 'lot'
    }, {
      key: 'expiry',
      label: 'expiry'
    }, {
      key: 'location',
      label: 'location'
    }, {
      key: 'status',
      label: 'status'
    }]));
    Toast.show('Inventory exported to CSV');
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHeader, {
    icon: "box",
    kicker: "Operations",
    title: "Inventory"
  }, /*#__PURE__*/React.createElement(AppButton, {
    variant: "primary",
    icon: "plus",
    onClick: () => setAdding(true)
  }, "Add item"), /*#__PURE__*/React.createElement(CsvUpload, {
    label: "Sync from CSV",
    onRows: handleCsv
  }), /*#__PURE__*/React.createElement(AppButton, {
    variant: "ghost",
    icon: "download",
    onClick: exportInv
  }, "Export")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 28px 60px',
      maxWidth: 1320,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 14,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Kpi, {
    label: "Tracked SKUs",
    value: s.inventory.length,
    icon: "box"
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Low stock",
    value: lows.length - outs.length,
    tone: lows.length - outs.length ? 'blue' : undefined,
    icon: "alert",
    sub: "below reorder point"
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Out of stock",
    value: outs.length,
    tone: outs.length ? 'danger' : undefined,
    icon: "alert"
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "On-hand value",
    value: money0(totalValue),
    icon: "tag",
    sub: "at contract price"
  })), lows.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 16px',
      marginBottom: 16,
      background: '#FBE3E2',
      border: `1px solid #F0C9C7`,
      borderRadius: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "alert",
    size: 18,
    color: "#D6322D"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontFamily: PW.sans,
      fontSize: 13,
      color: '#8B1F1B'
    }
  }, /*#__PURE__*/React.createElement("b", null, lows.length, " item", lows.length > 1 ? 's are' : ' is', " at or below reorder point."), " Push the suggested quantities straight to your cart."), /*#__PURE__*/React.createElement(AppButton, {
    variant: "ink",
    size: "sm",
    icon: "cart",
    onClick: reorderAll
  }, "Reorder all low items")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flex: 1,
      minWidth: 220
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 11,
      top: '50%',
      transform: 'translateY(-50%)',
      color: PW.mute
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 15
  })), /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Search inventory\u2026",
    style: {
      width: '100%',
      padding: '9px 12px 9px 34px',
      fontFamily: PW.sans,
      fontSize: 13,
      color: PW.ink,
      background: PW.white,
      border: `1px solid ${PW.line2}`,
      borderRadius: 4,
      outline: 'none',
      boxSizing: 'border-box'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 2,
      background: PW.white,
      border: `1px solid ${PW.line2}`,
      borderRadius: 4,
      padding: 2
    }
  }, [['all', 'All'], ['low', 'Needs reorder'], ['ok', 'In stock']].map(([id, lbl]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => setFilter(id),
    style: {
      padding: '6px 12px',
      borderRadius: 3,
      border: 0,
      background: filter === id ? '#EAF1FB' : 'transparent',
      color: filter === id ? PW.ink : PW.ink500,
      fontFamily: PW.sans,
      fontSize: 12.5,
      fontWeight: filter === id ? 600 : 500,
      cursor: 'pointer'
    }
  }, lbl)))), /*#__PURE__*/React.createElement(SectionCard, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2.4fr 1fr 0.9fr 1.1fr 1.3fr 190px',
      gap: 12,
      padding: '9px 16px',
      background: '#F4F6F9',
      borderBottom: `1px solid ${PW.line}`,
      fontFamily: PW.sans,
      fontSize: 10.5,
      fontWeight: 700,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Item"), /*#__PURE__*/React.createElement("span", null, "Status"), /*#__PURE__*/React.createElement("span", null, "On hand"), /*#__PURE__*/React.createElement("span", null, "Lot / expiry"), /*#__PURE__*/React.createElement("span", null, "Location"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right'
    }
  }, "Action")), rows.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    icon: "box",
    title: "No items match",
    sub: "Try a different filter or search, or add a new item.",
    action: /*#__PURE__*/React.createElement(AppButton, {
      variant: "primary",
      icon: "plus",
      onClick: () => setAdding(true)
    }, "Add item")
  }) : rows.map(r => /*#__PURE__*/React.createElement(InvRow, {
    key: r.sku,
    row: r,
    onNavigate: onNavigate,
    onEdit: setEditing
  })))), editing && /*#__PURE__*/React.createElement(InventoryEditModal, {
    row: editing,
    onClose: () => setEditing(null)
  }), adding && /*#__PURE__*/React.createElement(InventoryAddModal, {
    onClose: () => setAdding(false)
  }));
}

// ───────── Shared field styles ───────────────────────────────────────
const invField = {
  width: '100%',
  padding: '9px 12px',
  fontFamily: 'inherit',
  fontSize: 13,
  color: '#0E1525',
  background: '#fff',
  border: '1px solid #D7DAD0',
  borderRadius: 4,
  outline: 'none',
  boxSizing: 'border-box'
};
function InvLabel({
  children
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      color: PW.ink500,
      marginBottom: 6,
      display: 'block'
    }
  }, children);
}
function InvModalShell({
  title,
  icon,
  onClose,
  children,
  footer
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 5000,
      background: 'rgba(7,17,42,0.45)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      overflowY: 'auto',
      padding: '50px 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      maxWidth: 520,
      background: PW.white,
      borderRadius: 8,
      overflow: 'hidden',
      boxShadow: '0 30px 80px -20px rgba(7,17,42,0.6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 22px',
      borderBottom: `1px solid ${PW.line}`,
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(ObjIcon, {
    name: icon,
    size: 26
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      flex: 1,
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 17,
      color: PW.ink
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      width: 30,
      height: 30,
      border: 0,
      background: 'transparent',
      color: PW.mute,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 17
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 22px'
    }
  }, children), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 22px',
      borderTop: `1px solid ${PW.line}`,
      background: '#FAFBF7',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, footer)));
}
const STOCK_OPTS = [['in', 'In stock'], ['low', 'Low'], ['backorder', 'Backorder']];

// ───────── Edit existing inventory item ──────────────────────────────
function InventoryEditModal({
  row,
  onClose
}) {
  const p = product(row.sku);
  const [onHand, setOnHand] = React.useState(row.onHand);
  const [reorder, setReorder] = React.useState(row.reorder);
  const [location, setLocation] = React.useState(row.location || '');
  const [lot, setLot] = React.useState(row.lot || '');
  const [expiry, setExpiry] = React.useState(row.expiry && row.expiry !== '—' ? row.expiry : '');
  const [stock, setStock] = React.useState(vendorStockOf(p));
  const save = () => {
    updateInventory(row.sku, {
      onHand: Math.max(0, parseInt(onHand, 10) || 0),
      reorder: Math.max(0, parseInt(reorder, 10) || 0),
      location: location.trim() || '—',
      lot: lot.trim() || '—',
      expiry: expiry || '—'
    });
    if (p) p.vendorStock = stock; // reflect vendor stock on the catalog product
    Toast.show(`Updated ${p ? p.name : row.sku}`);
    onClose();
  };
  const del = () => {
    removeInventoryItem(row.sku);
    Toast.show(`Removed ${p ? p.name : row.sku} from inventory`, {
      tone: 'danger'
    });
    onClose();
  };
  return /*#__PURE__*/React.createElement(InvModalShell, {
    title: "Edit inventory item",
    icon: "box",
    onClose: onClose,
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppButton, {
      variant: "danger",
      icon: "trash",
      onClick: del
    }, "Remove"), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(AppButton, {
      variant: "secondary",
      onClick: onClose
    }, "Cancel"), /*#__PURE__*/React.createElement(AppButton, {
      variant: "primary",
      icon: "check",
      onClick: save
    }, "Save changes"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 14,
      color: PW.ink
    }
  }, p ? p.name : row.sku), p && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      marginTop: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 12,
      color: SLDS_BLUE
    }
  }, p.catalog), /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.mute
    }
  }, "\xB7"), /*#__PURE__*/React.createElement(VendorMark, {
    vendorKey: p.vendor,
    height: 12
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InvLabel, null, "On hand"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    value: onHand,
    onChange: e => setOnHand(e.target.value),
    style: invField
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InvLabel, null, "Reorder point"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    value: reorder,
    onChange: e => setReorder(e.target.value),
    style: invField
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement(InvLabel, null, "Location"), /*#__PURE__*/React.createElement("input", {
    value: location,
    onChange: e => setLocation(e.target.value),
    placeholder: "e.g. Freezer \u221220 \xB7 Rack 2",
    style: invField
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InvLabel, null, "Lot #"), /*#__PURE__*/React.createElement("input", {
    value: lot,
    onChange: e => setLot(e.target.value),
    placeholder: "\u2014",
    style: {
      ...invField,
      fontFamily: PW.mono,
      fontSize: 12
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InvLabel, null, "Expiry"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: expiry,
    onChange: e => setExpiry(e.target.value),
    style: invField
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement(InvLabel, null, "Vendor stock status"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, STOCK_OPTS.map(([id, lbl]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => setStock(id),
    style: {
      flex: 1,
      padding: '8px',
      borderRadius: 4,
      cursor: 'pointer',
      background: stock === id ? '#EAF1FB' : PW.white,
      border: `1.5px solid ${stock === id ? '#9EBEEC' : PW.line2}`,
      fontFamily: PW.sans,
      fontSize: 12.5,
      fontWeight: stock === id ? 700 : 500,
      color: stock === id ? PW.ink : PW.ink500
    }
  }, lbl))))));
}

// ───────── Add a new inventory item ──────────────────────────────────
function InventoryAddModal({
  onClose
}) {
  const inInv = new Set(Store.get().inventory.map(r => r.sku));
  const options = CATALOG.filter(p => !inInv.has(p.sku));
  const [sku, setSku] = React.useState(options[0] ? options[0].sku : '');
  const [onHand, setOnHand] = React.useState(1);
  const [reorder, setReorder] = React.useState(2);
  const [location, setLocation] = React.useState('');
  const [lot, setLot] = React.useState('');
  const [expiry, setExpiry] = React.useState('');
  const p = product(sku);
  const add = () => {
    if (!sku) {
      Toast.show('Pick a catalog item first', {
        tone: 'danger'
      });
      return;
    }
    addInventoryItem({
      sku,
      onHand: Math.max(0, parseInt(onHand, 10) || 0),
      reorder: Math.max(0, parseInt(reorder, 10) || 0),
      location: location.trim() || '—',
      lot: lot.trim() || '—',
      expiry: expiry || '—'
    });
    Toast.show(`Added ${p ? p.name : sku} to inventory`);
    onClose();
  };
  if (options.length === 0) {
    return /*#__PURE__*/React.createElement(InvModalShell, {
      title: "Add inventory item",
      icon: "plus",
      onClose: onClose,
      footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1
        }
      }), /*#__PURE__*/React.createElement(AppButton, {
        variant: "secondary",
        onClick: onClose
      }, "Close"))
    }, /*#__PURE__*/React.createElement(EmptyState, {
      icon: "check",
      title: "Everything's already tracked",
      sub: "All catalog items are in your inventory."
    }));
  }
  return /*#__PURE__*/React.createElement(InvModalShell, {
    title: "Add inventory item",
    icon: "plus",
    onClose: onClose,
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(AppButton, {
      variant: "secondary",
      onClick: onClose
    }, "Cancel"), /*#__PURE__*/React.createElement(AppButton, {
      variant: "primary",
      icon: "plus",
      onClick: add
    }, "Add to inventory"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement(InvLabel, null, "Catalog item"), /*#__PURE__*/React.createElement("select", {
    value: sku,
    onChange: e => setSku(e.target.value),
    style: {
      ...invField,
      cursor: 'pointer'
    }
  }, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.sku,
    value: o.sku
  }, o.name, " \u2014 ", o.catalog))), p && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.mute
    }
  }, vendor(p.vendor).name, " \xB7 ", p.unit, " \xB7 ", money(p.price))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InvLabel, null, "On hand"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    value: onHand,
    onChange: e => setOnHand(e.target.value),
    style: invField
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InvLabel, null, "Reorder point"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0",
    value: reorder,
    onChange: e => setReorder(e.target.value),
    style: invField
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement(InvLabel, null, "Location"), /*#__PURE__*/React.createElement("input", {
    value: location,
    onChange: e => setLocation(e.target.value),
    placeholder: "e.g. Cold room A \xB7 Shelf 2",
    style: invField
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InvLabel, null, "Lot # (optional)"), /*#__PURE__*/React.createElement("input", {
    value: lot,
    onChange: e => setLot(e.target.value),
    placeholder: "\u2014",
    style: {
      ...invField,
      fontFamily: PW.mono,
      fontSize: 12
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InvLabel, null, "Expiry (optional)"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: expiry,
    onChange: e => setExpiry(e.target.value),
    style: invField
  }))));
}
Object.assign(window, {
  InventoryPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/InventoryPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/OrderDetail.jsx
try { (() => {
// Right drawer — Salesforce record page chrome + Juicebox profile content.

function ProfileKV({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '120px 1fr',
      gap: 12,
      padding: '8px 14px',
      borderBottom: `1px solid ${PW.line}`,
      fontFamily: PW.sans,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: PW.mute
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      color: PW.ink,
      fontWeight: 500
    }
  }, children));
}
function HighlightField({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 90
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 10,
      fontWeight: 700,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 2,
      fontFamily: PW.sans,
      fontSize: 13,
      color: PW.ink,
      fontWeight: 600
    }
  }, children));
}
function SectionCard({
  title,
  action,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: PW.white,
      border: `1px solid ${PW.line}`,
      borderRadius: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '7px 14px',
      background: '#F4F6F9',
      borderBottom: `1px solid ${PW.line}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 700,
      color: PW.ink,
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), action), children);
}
function PathStage({
  label,
  state,
  first
}) {
  const colors = {
    done: {
      bg: '#0A7048',
      fg: '#fff'
    },
    current: {
      bg: '#1B96FF',
      fg: '#fff'
    },
    todo: {
      bg: '#FFFFFF',
      fg: '#5A6A8E',
      border: '#C8CCC1'
    }
  };
  const c = colors[state];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '6px 8px 6px 18px',
      background: c.bg,
      color: c.fg,
      border: c.border ? `1px solid ${c.border}` : 'none',
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 600,
      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%, 8px 50%)',
      whiteSpace: 'nowrap',
      paddingLeft: first ? 10 : 18
    }
  }, label);
}
function OrderDetail({
  order,
  onClose
}) {
  const [tab, setTab] = React.useState('Match');
  if (!order) return null;
  const SLDS_BLUE = window.SLDS_BLUE || '#1B96FF';
  const stages = window.STAGES || ['Sourcing', 'Quoting', 'Quoted', 'Ordered', 'Received'];
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      background: 'rgba(10,21,48,0.30)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      width: 'min(600px, 100vw)',
      background: '#F3F3F3',
      borderLeft: `1px solid ${PW.line}`,
      boxShadow: '0 16px 48px -8px rgba(10,21,48,0.20)',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 18px 0',
      background: PW.white,
      borderBottom: `1px solid ${PW.line}`,
      position: 'sticky',
      top: 0,
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(SqIcon, {
    kind: "orders",
    size: 22
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontWeight: 600
    }
  }, "Order candidate"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.mute,
      fontSize: 12
    }
  }, "\u203A"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 12,
      color: SLDS_BLUE,
      fontWeight: 500
    }
  }, order.id), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    title: "Close",
    style: {
      width: 24,
      height: 24,
      borderRadius: 3,
      background: 'transparent',
      border: 0,
      color: PW.mute,
      cursor: 'pointer',
      fontSize: 18,
      lineHeight: 1
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '8px 0 6px',
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 18,
      color: PW.ink,
      letterSpacing: '-0.005em'
    }
  }, order.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.ink500
    }
  }, order.vendorLogo && /*#__PURE__*/React.createElement("img", {
    src: `../../assets/vendors/${order.vendorLogo}`,
    alt: "",
    style: {
      height: 13,
      objectFit: 'contain'
    }
  }), /*#__PURE__*/React.createElement("span", null, order.vendor), /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.mute
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      color: SLDS_BLUE
    }
  }, order.catalog), /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.mute
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, order.qty)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      paddingTop: 12,
      borderTop: `1px solid ${PW.line}`,
      display: 'flex',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(HighlightField, {
    label: "Match"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: order.score >= 90 ? '#0A7048' : order.score >= 80 ? '#1E4FB0' : '#8A6308'
    }
  }, "\u25CF ", order.score, "/100")), /*#__PURE__*/React.createElement(HighlightField, {
    label: "Price"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontVariantNumeric: 'tabular-nums'
    }
  }, "$", order.price.toFixed(2))), /*#__PURE__*/React.createElement(HighlightField, {
    label: "Savings"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      color: '#0A7048',
      fontVariantNumeric: 'tabular-nums'
    }
  }, "+$", order.savings.toFixed(2))), /*#__PURE__*/React.createElement(HighlightField, {
    label: "Lead"
  }, order.lead)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 1,
      padding: '12px 0'
    }
  }, stages.map((s, i) => /*#__PURE__*/React.createElement(PathStage, {
    key: s,
    label: s,
    state: i < order.stage ? 'done' : i === order.stage ? 'current' : 'todo',
    first: i === 0
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      paddingBottom: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      padding: '7px 14px',
      background: SLDS_BLUE,
      color: '#fff',
      border: 0,
      borderRadius: 3,
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      cursor: 'pointer'
    }
  }, "Order now"), /*#__PURE__*/React.createElement("button", {
    style: {
      padding: '7px 12px',
      background: PW.white,
      color: PW.ink,
      border: `1px solid ${PW.line2}`,
      borderRadius: 3,
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      cursor: 'pointer'
    }
  }, "Shortlist"), /*#__PURE__*/React.createElement("button", {
    style: {
      padding: '7px 12px',
      background: PW.white,
      color: PW.ink,
      border: `1px solid ${PW.line2}`,
      borderRadius: 3,
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      cursor: 'pointer'
    }
  }, "Request alternate"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      padding: '7px 8px',
      background: PW.white,
      color: PW.ink500,
      border: `1px solid ${PW.line2}`,
      borderRadius: 3,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "12",
    r: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "12",
    r: "1.5"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 0,
      marginBottom: -1
    }
  }, ['Match', 'Specs', 'History', 'Activity'].map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => setTab(t),
    style: {
      padding: '8px 0',
      marginRight: 20,
      background: 'transparent',
      border: 0,
      borderBottom: tab === t ? `2px solid ${SLDS_BLUE}` : '2px solid transparent',
      fontFamily: PW.sans,
      fontSize: 13,
      fontWeight: tab === t ? 700 : 500,
      color: tab === t ? PW.ink : PW.ink500,
      cursor: 'pointer'
    }
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      flex: 1
    }
  }, tab === 'Match' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(SectionCard, {
    title: "AI summary",
    action: /*#__PURE__*/React.createElement("span", {
      style: {
        padding: '2px 6px',
        borderRadius: 2,
        background: '#E6F5EC',
        color: '#0A7048',
        fontFamily: PW.sans,
        fontSize: 10,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.04em'
      }
    }, "Einstein")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 14px',
      fontFamily: PW.sans,
      fontSize: 13,
      lineHeight: 1.55,
      color: PW.ink500
    }
  }, order.summary)), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Why this matches"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 12,
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, order.highlights.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '8px 10px',
      background: h.miss ? '#FBE3E2' : '#E6F5EC',
      borderRadius: 3,
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 16,
      height: 16,
      borderRadius: 2,
      flexShrink: 0,
      background: h.miss ? '#D6322D' : '#0E9560',
      color: '#fff'
    }
  }, h.miss ? /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6l-12 12"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 700,
      color: h.miss ? '#8B1F1B' : '#064A30',
      textTransform: 'uppercase',
      letterSpacing: '0.04em'
    }
  }, h.why), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 2,
      fontFamily: PW.sans,
      fontSize: 13,
      color: PW.ink
    }
  }, h.phrase)))))), /*#__PURE__*/React.createElement(SectionCard, {
    title: "Certifications"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 12,
      display: 'flex',
      gap: 4,
      flexWrap: 'wrap'
    }
  }, order.badges.map(b => /*#__PURE__*/React.createElement("span", {
    key: b,
    style: {
      padding: '3px 8px',
      borderRadius: 2,
      background: '#F0EFEB',
      color: PW.ink500,
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 500
    }
  }, b))))), tab === 'Specs' && /*#__PURE__*/React.createElement(SectionCard, {
    title: "Item information"
  }, /*#__PURE__*/React.createElement(ProfileKV, {
    label: "Catalog #"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      color: SLDS_BLUE
    }
  }, order.catalog)), /*#__PURE__*/React.createElement(ProfileKV, {
    label: "Supplier"
  }, order.vendor), /*#__PURE__*/React.createElement(ProfileKV, {
    label: "Item"
  }, order.name), /*#__PURE__*/React.createElement(ProfileKV, {
    label: "Quantity"
  }, order.qty), /*#__PURE__*/React.createElement(ProfileKV, {
    label: "Unit price"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono
    }
  }, "$", (order.price / 6).toFixed(2))), /*#__PURE__*/React.createElement(ProfileKV, {
    label: "Total"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontWeight: 700
    }
  }, "$", order.price.toFixed(2))), /*#__PURE__*/React.createElement(ProfileKV, {
    label: "Lead time"
  }, order.lead), /*#__PURE__*/React.createElement(ProfileKV, {
    label: "Storage"
  }, "2\u20138 \xB0C \xB7 ships on ice"), /*#__PURE__*/React.createElement(ProfileKV, {
    label: "SDS"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: SLDS_BLUE,
      textDecoration: 'none'
    }
  }, "SDS_DMEM_11965.pdf")), /*#__PURE__*/React.createElement(ProfileKV, {
    label: "Certificate of analysis"
  }, "Available on request"), /*#__PURE__*/React.createElement(ProfileKV, {
    label: "Lot tracking"
  }, "Auto-recorded in inventory")), tab === 'History' && /*#__PURE__*/React.createElement(SectionCard, {
    title: "Past orders (4)"
  }, [['Mar 18, 2026', '6 × 500 mL', '$340.80', 'Received'], ['Feb 02, 2026', '4 × 500 mL', '$227.20', 'Received'], ['Dec 14, 2025', '6 × 500 mL', '$338.40', 'Received'], ['Oct 30, 2025', '4 × 500 mL', '$226.00', 'Received']].map(([date, qty, price, status], i, arr) => /*#__PURE__*/React.createElement("div", {
    key: date,
    style: {
      padding: '10px 14px',
      borderBottom: i === arr.length - 1 ? 0 : `1px solid ${PW.line}`,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gap: 8,
      fontFamily: PW.sans,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.mute
    }
  }, date), /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.ink
    }
  }, qty), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      color: PW.ink,
      fontWeight: 600
    }
  }, price), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '2px 8px',
      borderRadius: 12,
      background: '#E6F5EC',
      color: '#0A7048',
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 600,
      justifySelf: 'start'
    }
  }, status)))), tab === 'Activity' && /*#__PURE__*/React.createElement(SectionCard, {
    title: "Activity feed"
  }, [['D. Cuadros', 'Approved vendor switch to Thermo Fisher', '14:02'], ['ProcureWide AI', 'Quote returned: $340.80 (save $41.60, 10.88%)', '10:34'], ['ProcureWide AI', 'Searched 47 vendors matching prompt criteria', '09:18'], ['D. Cuadros', 'Requested DMEM, high glucose ×6 cases', '09:12']].map(([who, what, when], i, arr) => /*#__PURE__*/React.createElement("div", {
    key: what,
    style: {
      padding: '11px 14px',
      borderBottom: i === arr.length - 1 ? 0 : `1px solid ${PW.line}`,
      display: 'grid',
      gridTemplateColumns: '52px 1fr',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.mono,
      fontSize: 11,
      color: PW.mute
    }
  }, when), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 13,
      color: PW.ink
    }
  }, what), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      color: PW.mute,
      marginTop: 1
    }
  }, who))))))));
}
Object.assign(window, {
  OrderDetail
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/OrderDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/OrderPage.jsx
try { (() => {
// Order catalog — browse/search the catalog, add to cart, bulk-upload via CSV.

// Categories derive from the active catalog so this page works for any store.
function catalogCategories() {
  const seen = [];
  CATALOG.forEach(p => {
    if (!seen.includes(p.cat)) seen.push(p.cat);
  });
  return ['All', ...seen];
}
function ProductCard({
  p,
  qty,
  onQty,
  onAdd,
  priority,
  recommended,
  catLabel,
  catOptions,
  onDelete
}) {
  const inv = Store.get().inventory.find(r => r.sku === p.sku);
  const categorize = useCategorize();
  const sysAdmin = useSystemAdmin();
  const savePct = Math.round((1 - p.price / p.list) * 100);
  const hasSaving = savePct > 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: PW.white,
      border: `1px solid ${PW.line}`,
      borderRadius: 4,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '7px 12px',
      background: '#F4F6F9',
      borderBottom: `1px solid ${PW.line}`
    }
  }, /*#__PURE__*/React.createElement(VendorMark, {
    vendorKey: p.vendor,
    height: 13,
    withName: false
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      color: PW.ink500,
      fontWeight: 500
    }
  }, vendor(p.vendor).name), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 10,
      fontWeight: 600,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.04em'
    }
  }, catLabel || p.cat)), (categorize || sysAdmin) && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 12px',
      background: '#FFFBF2',
      borderBottom: `1px solid ${PW.line}`,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(CategoryEditor, {
    itemKey: 'sku:' + p.sku,
    value: catLabel || p.cat,
    options: catOptions,
    enabled: categorize,
    compact: true
  }), sysAdmin && /*#__PURE__*/React.createElement("button", {
    onClick: () => onDelete && onDelete(p),
    title: "Delete catalog item (ProcureWide admin)",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '4px 9px',
      borderRadius: 4,
      background: '#FBE9E6',
      border: '1px solid #E7B6AE',
      color: '#A02A1E',
      cursor: 'pointer',
      fontFamily: PW.sans,
      fontSize: 11.5,
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 13,
    color: "#A02A1E"
  }), " Delete")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 14px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => ItemDetail.open(p.sku),
    title: "View item details",
    style: {
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 14.5,
      color: PW.ink,
      letterSpacing: '-0.005em',
      lineHeight: 1.3,
      textWrap: 'pretty',
      cursor: 'pointer'
    }
  }, p.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 5
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      ItemDetail.open(p.sku);
    },
    style: {
      fontFamily: PW.mono,
      fontSize: 12,
      color: SLDS_BLUE,
      textDecoration: 'none'
    }
  }, p.catalog), /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.mute,
      fontSize: 11
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.ink500
    }
  }, p.unit), /*#__PURE__*/React.createElement("button", {
    onClick: () => ItemDetail.open(p.sku),
    style: {
      marginLeft: 'auto',
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'pointer',
      fontFamily: PW.sans,
      fontSize: 11.5,
      fontWeight: 600,
      color: SLDS_BLUE,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3
    }
  }, "Details")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      marginTop: 9,
      flexWrap: 'wrap'
    }
  }, p.badges.map(b => /*#__PURE__*/React.createElement("span", {
    key: b,
    style: {
      padding: '2px 7px',
      borderRadius: 2,
      background: '#F0EFEB',
      color: PW.ink500,
      fontFamily: PW.sans,
      fontSize: 10.5,
      fontWeight: 500
    }
  }, b))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 11,
      flexWrap: 'wrap',
      fontFamily: PW.sans,
      fontSize: 11.5,
      color: PW.mute
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "truck",
    size: 13,
    color: PW.mute
  }), " ", p.lead), inv && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "box",
    size: 12,
    color: PW.mute
  }), " ", inv.onHand, " on hand"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(VendorStockPill, {
    sku: p.sku
  }))), recommended && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      alignSelf: 'flex-start',
      padding: '3px 9px',
      borderRadius: 3,
      background: '#EAF1FB',
      border: '1px solid #9EBEEC'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bolt",
    size: 12,
    color: SLDS_BLUE
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 700,
      color: '#1E4FB0'
    }
  }, recommended)), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      paddingTop: 12,
      borderTop: `1px solid ${PW.line}`,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 19,
      color: PW.ink,
      letterSpacing: '-0.01em',
      fontVariantNumeric: 'tabular-nums'
    }
  }, money(p.price)), hasSaving && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 11,
      color: PW.mute,
      textDecoration: 'line-through'
    }
  }, money(p.list))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 3,
      display: 'inline-block',
      padding: '1px 7px',
      borderRadius: 2,
      background: hasSaving ? '#E6F5EC' : '#EDEFF3',
      color: hasSaving ? '#0A7048' : PW.ink500,
      fontFamily: PW.sans,
      fontSize: 10.5,
      fontWeight: 700
    }
  }, hasSaving ? `${window.PW_PRICE_LABEL || 'Contract price'} · ${savePct}% off` : window.PW_PRICE_LABEL || 'Contract price'))), /*#__PURE__*/React.createElement("div", {
    title: "This is the most recent price paid for this item. Vendor pricing changes over time, so the final price when your order is placed may be higher or lower.",
    style: {
      marginTop: 8,
      display: 'flex',
      alignItems: 'flex-start',
      gap: 6,
      fontFamily: PW.sans,
      fontSize: 10.5,
      lineHeight: 1.45,
      color: PW.mute,
      cursor: 'help'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      marginTop: 0.5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info",
    size: 11,
    color: PW.mute
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      textWrap: 'pretty'
    }
  }, "Reflects the last price paid. Vendor rates fluctuate \u2014 your final price may be higher or lower.")), p.alt && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      padding: '9px 11px',
      borderRadius: 4,
      border: `1px solid ${p.alt.tone === 'success' ? '#9FD9BC' : '#9EBEEC'}`,
      background: p.alt.tone === 'success' ? '#EAF7F0' : '#EEF4FD'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bolt",
    size: 13,
    color: p.alt.tone === 'success' ? '#0A7048' : '#1E4FB0'
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11.5,
      fontWeight: 700,
      color: p.alt.tone === 'success' ? '#0A7048' : '#1E4FB0'
    }
  }, p.alt.label), p.alt.vendor && p.alt.vendor !== p.vendor && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(VendorMark, {
    vendorKey: p.alt.vendor,
    height: 11,
    withName: true,
    nameStyle: {
      fontSize: 11
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11.5,
      color: PW.ink500,
      marginTop: 4,
      lineHeight: 1.45,
      textWrap: 'pretty'
    }
  }, p.alt.detail)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(QtyStepper, {
    value: qty,
    onChange: onQty,
    min: 1,
    size: "sm"
  }), /*#__PURE__*/React.createElement(AppButton, {
    variant: "primary",
    size: "md",
    icon: "cart",
    style: {
      flex: 1
    },
    onClick: onAdd
  }, "Add to cart"))));
}
const pwDeleteBtn = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 5,
  padding: '5px 8px',
  borderRadius: 4,
  background: '#FBE9E6',
  border: '1px solid #E7B6AE',
  color: '#A02A1E',
  cursor: 'pointer',
  fontFamily: PW.sans,
  fontSize: 11.5,
  fontWeight: 700
};

// Horizontal (wide list) row
function ProductRow({
  p,
  qty,
  onQty,
  onAdd,
  catLabel,
  catOptions,
  onDelete
}) {
  const categorize = useCategorize();
  const sysAdmin = useSystemAdmin();
  const savePct = Math.round((1 - p.price / p.list) * 100);
  const hasSaving = savePct > 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2.3fr 120px 130px minmax(280px, auto)',
      gap: 14,
      alignItems: 'center',
      padding: '12px 16px',
      borderBottom: `1px solid ${PW.line}`,
      background: PW.white
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(VendorMark, {
    vendorKey: p.vendor,
    height: 14,
    withName: false
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => ItemDetail.open(p.sku),
    title: "View item details",
    style: {
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 13.5,
      color: PW.ink,
      cursor: 'pointer',
      textWrap: 'pretty',
      lineHeight: 1.3
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 3,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      ItemDetail.open(p.sku);
    },
    style: {
      fontFamily: PW.mono,
      fontSize: 11.5,
      color: SLDS_BLUE,
      textDecoration: 'none'
    }
  }, p.catalog), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11.5,
      color: PW.ink500
    }
  }, p.unit), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 10,
      fontWeight: 600,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.04em'
    }
  }, vendor(p.vendor).name, " \xB7 ", catLabel || p.cat)))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11.5,
      color: PW.mute,
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "truck",
    size: 13,
    color: PW.mute
  }), " ", p.lead), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 16,
      color: PW.ink,
      fontVariantNumeric: 'tabular-nums'
    }
  }, money(p.price)), hasSaving && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 10.5,
      color: PW.mute,
      textDecoration: 'line-through'
    }
  }, money(p.list))), hasSaving && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 10,
      fontWeight: 700,
      color: '#0A7048'
    }
  }, savePct, "% off list")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      justifyContent: 'flex-end',
      flexWrap: 'wrap'
    }
  }, categorize && /*#__PURE__*/React.createElement(CategoryEditor, {
    itemKey: 'sku:' + p.sku,
    value: catLabel || p.cat,
    options: catOptions,
    enabled: true,
    compact: true
  }), sysAdmin && /*#__PURE__*/React.createElement("button", {
    onClick: () => onDelete && onDelete(p),
    title: "Delete catalog item",
    style: pwDeleteBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 13,
    color: "#A02A1E"
  })), /*#__PURE__*/React.createElement(QtyStepper, {
    value: qty,
    onChange: onQty,
    min: 1,
    size: "sm"
  }), /*#__PURE__*/React.createElement(AppButton, {
    variant: "primary",
    size: "sm",
    icon: "cart",
    onClick: onAdd
  }, "Add")));
}

// Classic (dense table) view
function ClassicTable({
  items,
  getQty,
  onAdd,
  catOf,
  catOptions,
  onDelete
}) {
  const categorize = useCategorize();
  const sysAdmin = useSystemAdmin();
  const cols = '78px 1.35fr 120px 180px 58px 84px 110px';
  return /*#__PURE__*/React.createElement(SectionCard, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: cols,
      gap: 10,
      padding: '9px 14px',
      background: '#F4F6F9',
      borderBottom: `1px solid ${PW.line}`,
      fontFamily: PW.sans,
      fontSize: 10,
      fontWeight: 800,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  }, /*#__PURE__*/React.createElement("span", null, "SKU"), /*#__PURE__*/React.createElement("span", null, "Item"), /*#__PURE__*/React.createElement("span", null, "Vendor"), /*#__PURE__*/React.createElement("span", null, "Category"), /*#__PURE__*/React.createElement("span", null, "Lead"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right'
    }
  }, "Price"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right'
    }
  }, "Add")), items.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.sku,
    style: {
      display: 'grid',
      gridTemplateColumns: cols,
      gap: 10,
      padding: '9px 14px',
      borderBottom: `1px solid ${PW.line}`,
      alignItems: 'center',
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 11,
      color: PW.ink500
    }
  }, p.sku), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => ItemDetail.open(p.sku),
    style: {
      color: PW.ink,
      fontWeight: 600,
      cursor: 'pointer'
    }
  }, p.name)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.ink500,
      fontSize: 11.5,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, vendor(p.vendor).name), /*#__PURE__*/React.createElement("span", null, categorize ? /*#__PURE__*/React.createElement(CategoryEditor, {
    itemKey: 'sku:' + p.sku,
    value: catOf(p),
    options: catOptions,
    enabled: true,
    compact: true
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.mute,
      fontSize: 11.5
    }
  }, catOf(p))), /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.mute,
      fontSize: 11.5,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, p.lead), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right',
      fontFamily: PW.mono,
      fontWeight: 700,
      color: PW.ink,
      fontVariantNumeric: 'tabular-nums'
    }
  }, money(p.price)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 6,
      justifyContent: 'flex-end',
      alignItems: 'center'
    }
  }, sysAdmin && /*#__PURE__*/React.createElement("button", {
    onClick: () => onDelete(p),
    title: "Delete",
    style: {
      ...pwDeleteBtn,
      padding: '4px 7px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 12,
    color: "#A02A1E"
  })), /*#__PURE__*/React.createElement(AppButton, {
    variant: "primary",
    size: "sm",
    icon: "cart",
    onClick: () => onAdd(p)
  }, "Add")))));
}
function OrderPage({
  onNavigate
}) {
  useStore();
  const [q, setQ] = React.useState('');
  const [cat, setCat] = React.useState('All');
  const [sort, setSort] = React.useState('relevance');
  const [priority, setPriority] = React.useState('');
  const [qtys, setQtys] = React.useState({});
  const [view, setView] = useViewMode('catalog', 'cards');
  const deleted = useDeleted();
  const sysAdmin = useSystemAdmin();
  const overrides = useCatOverrides();
  const catOf = p => overrides['sku:' + p.sku] || p.cat;
  const baseCats = (() => {
    const s = [];
    CATALOG.forEach(p => {
      if (!s.includes(p.cat)) s.push(p.cat);
    });
    return s;
  })();
  const effectiveCats = (() => {
    const s = [];
    CATALOG.forEach(p => {
      const c = catOf(p);
      if (!s.includes(c)) s.push(c);
    });
    return ['All', ...s];
  })();
  const getQty = sku => qtys[sku] || 1;
  const setQty = (sku, v) => setQtys(x => ({
    ...x,
    [sku]: Math.max(1, v)
  }));
  const choosePriority = p => {
    setPriority(p);
    setSort(p === 'cost' ? 'savings' : p === 'speed' ? 'speed' : p === 'setup' ? 'setup' : 'relevance');
  };
  const recommendFor = p => {
    if (priority === 'cost') return Math.round((1 - p.price / p.list) * 100) >= 25 ? 'Best value' : null;
    if (priority === 'speed') return lineArrivalDays(p) <= 3 && vendorStockOf(p) === 'in' ? 'Fastest to arrive' : null;
    if (priority === 'setup') return setupEaseOf(p) === 3 ? 'Easy setup' : null;
    return null;
  };
  let items = CATALOG.filter(p => {
    if (deleted.includes(p.sku)) return false;
    if (cat !== 'All' && catOf(p) !== cat) return false;
    if (q.trim()) {
      const t = (p.name + ' ' + p.catalog + ' ' + vendor(p.vendor).name + ' ' + p.cat + ' ' + p.badges.join(' ')).toLowerCase();
      return t.includes(q.trim().toLowerCase());
    }
    return true;
  });
  if (sort === 'price') items = [...items].sort((a, b) => a.price - b.price);
  if (sort === 'savings') items = [...items].sort((a, b) => 1 - a.price / a.list < 1 - b.price / b.list ? 1 : -1);
  if (sort === 'speed') items = [...items].sort((a, b) => lineArrivalDays(a) - lineArrivalDays(b) || (vendorStockOf(a) === 'in' ? -1 : 1));
  if (sort === 'setup') items = [...items].sort((a, b) => setupEaseOf(b) - setupEaseOf(a));
  if (sort === 'name') items = [...items].sort((a, b) => a.name.localeCompare(b.name));
  const handleAdd = p => {
    addToCart(p.sku, getQty(p.sku));
    Toast.show(`Added ${getQty(p.sku)} × ${p.name}`, {
      action: {
        label: 'View cart',
        onClick: () => onNavigate('cart')
      }
    });
    setQty(p.sku, 1);
  };

  // ProcureWide system admin only — soft-delete a catalog item.
  const handleDelete = p => {
    DeletedStore.remove(p.sku);
    Toast.show(`Removed ${p.name} from the catalog`, {
      action: {
        label: 'Undo',
        onClick: () => DeletedStore.restore(p.sku)
      }
    });
  };
  const handleCsv = (rows, name) => {
    const res = importCartRows(rows);
    const parts = [];
    if (res.added) parts.push(`${res.added} catalog line${res.added > 1 ? 's' : ''}`);
    if (res.custom) parts.push(`${res.custom} custom (pending review)`);
    if (parts.length) Toast.show(`Imported ${parts.join(' · ')}${res.skipped ? ` · ${res.skipped} skipped` : ''}`, {
      action: {
        label: 'View cart',
        onClick: () => onNavigate('cart')
      }
    });else Toast.show('Nothing usable in that CSV — add an item name or catalog #', {
      tone: 'danger'
    });
  };
  const downloadTemplate = () => {
    const sample = [{
      'catalog #': '11965-092',
      sku: 'TF-11965',
      name: '',
      link: '',
      'list price': '',
      qty: '6'
    }, {
      'catalog #': '4970S',
      sku: 'CS-4970',
      name: '',
      link: '',
      'list price': '',
      qty: '2'
    }, {
      'catalog #': '',
      sku: '',
      name: 'Recombinant Human IL-2, carrier-free, 1 mg',
      link: 'https://vendor.com/il-2',
      'list price': '320',
      qty: '1'
    }];
    downloadText('procurewide-cart-template.csv', toCSV(sample, [{
      key: 'catalog #',
      label: 'catalog #'
    }, {
      key: 'sku',
      label: 'sku'
    }, {
      key: 'name',
      label: 'name'
    }, {
      key: 'link',
      label: 'link'
    }, {
      key: 'list price',
      label: 'list price'
    }, {
      key: 'qty',
      label: 'qty'
    }]));
    Toast.show('Template downloaded — rows without a catalog match become custom requests');
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHeader, {
    icon: "order",
    kicker: "Ordering",
    title: "Order catalog"
  }, /*#__PURE__*/React.createElement(CategorizeSwitch, null), /*#__PURE__*/React.createElement(AppButton, {
    variant: "secondary",
    icon: "plus",
    onClick: () => CustomRequest.open()
  }, "Request custom item"), /*#__PURE__*/React.createElement(CsvUpload, {
    label: "Upload cart CSV",
    onRows: handleCsv
  }), /*#__PURE__*/React.createElement(AppButton, {
    variant: "ghost",
    icon: "download",
    onClick: downloadTemplate
  }, "Template")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 28px 60px',
      maxWidth: 1320,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'linear-gradient(120deg, #07112A, #122F52)',
      borderRadius: 6,
      padding: '14px 16px',
      marginBottom: 14,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 13.5,
      fontWeight: 700,
      color: '#fff'
    }
  }, "What matters most for this order?"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: 'rgba(255,255,255,0.65)',
      marginTop: 1
    }
  }, "We'll prioritize the catalog and flag the best picks.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginLeft: 'auto',
      flexWrap: 'wrap'
    }
  }, [['cost', 'tag', 'Cost', 'Lowest price'], ['speed', 'truck', 'Speed', 'Fastest delivery'], ['setup', 'flask', 'Setup', 'Easiest to use']].map(([id, ic, lbl, hint]) => {
    const on = priority === id;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      onClick: () => choosePriority(on ? '' : id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        padding: '9px 13px',
        borderRadius: 4,
        cursor: 'pointer',
        background: on ? '#fff' : 'rgba(255,255,255,0.10)',
        border: `1px solid ${on ? '#fff' : 'rgba(255,255,255,0.22)'}`,
        textAlign: 'left'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 16,
      color: on ? SLDS_BLUE : '#fff'
    }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontFamily: PW.sans,
        fontSize: 13,
        fontWeight: 700,
        color: on ? PW.ink : '#fff'
      }
    }, lbl), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontFamily: PW.sans,
        fontSize: 11,
        color: on ? PW.mute : 'rgba(255,255,255,0.6)'
      }
    }, hint)));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: PW.white,
      border: `1px solid ${PW.line}`,
      borderRadius: 4,
      padding: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      color: PW.mute
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 16
  })), /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Search by item, catalog #, vendor, or category\u2026",
    style: {
      width: '100%',
      padding: '11px 14px 11px 38px',
      fontFamily: PW.sans,
      fontSize: 14,
      color: PW.ink,
      background: '#FAFBF7',
      border: `1px solid ${PW.line2}`,
      borderRadius: 4,
      outline: 'none',
      boxSizing: 'border-box'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, effectiveCats.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setCat(c),
    style: {
      padding: '5px 11px',
      borderRadius: 3,
      background: cat === c ? '#DDE7F8' : PW.white,
      color: cat === c ? '#1E4FB0' : PW.ink500,
      border: `1px solid ${cat === c ? '#9EBEEC' : PW.line2}`,
      fontFamily: PW.sans,
      fontSize: 12.5,
      fontWeight: cat === c ? 600 : 500,
      cursor: 'pointer'
    }
  }, c)), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.mute,
      marginRight: 2
    }
  }, "Sort"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 2
    }
  }, [['relevance', 'Relevance'], ['price', 'Price'], ['savings', 'Savings'], ['speed', 'Speed'], ['setup', 'Setup'], ['name', 'A–Z']].map(([id, lbl]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => setSort(id),
    style: {
      padding: '5px 9px',
      borderRadius: 3,
      border: 0,
      background: sort === id ? '#F0F0EC' : 'transparent',
      color: sort === id ? PW.ink : PW.ink500,
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: sort === id ? 600 : 500,
      cursor: 'pointer'
    }
  }, lbl))))), sysAdmin && deleted.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      marginBottom: 14,
      padding: '10px 14px',
      background: '#FBE9E6',
      border: '1px solid #E7B6AE',
      borderRadius: 6,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 15,
    color: "#A02A1E"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12.5,
      color: '#7A2018',
      fontWeight: 600
    }
  }, deleted.length, " item", deleted.length > 1 ? 's' : '', " removed from the catalog"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => deleted.forEach(sku => DeletedStore.restore(sku)),
    style: {
      background: 'transparent',
      border: 0,
      color: '#A02A1E',
      cursor: 'pointer',
      fontFamily: PW.sans,
      fontSize: 12.5,
      fontWeight: 700
    }
  }, "Restore all")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      margin: '18px 2px 12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 15,
      color: PW.ink
    }
  }, items.length, " item", items.length !== 1 ? 's' : ''), (q || cat !== 'All') && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setQ('');
      setCat('All');
    },
    style: {
      background: 'transparent',
      border: 0,
      color: SLDS_BLUE,
      cursor: 'pointer',
      fontFamily: PW.sans,
      fontSize: 12.5,
      fontWeight: 600
    }
  }, "Clear filters"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(ViewSwitch, {
    value: view,
    onChange: setView,
    options: [['cards', 'Cards', 'grid'], ['rows', 'Horizontal', 'rows'], ['classic', 'Classic', 'table']]
  })), items.length === 0 ? /*#__PURE__*/React.createElement(SectionCard, null, /*#__PURE__*/React.createElement(EmptyState, {
    icon: "search",
    title: "No items match",
    sub: "Try a different search term, clear your filters, or request it as a custom item \u2014 we'll source anything.",
    action: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(AppButton, {
      variant: "secondary",
      onClick: () => {
        setQ('');
        setCat('All');
      }
    }, "Clear filters"), /*#__PURE__*/React.createElement(AppButton, {
      variant: "primary",
      icon: "plus",
      onClick: () => CustomRequest.open()
    }, "Request a custom item"))
  })) : view === 'classic' ? /*#__PURE__*/React.createElement(ClassicTable, {
    items: items,
    getQty: getQty,
    onAdd: handleAdd,
    catOf: catOf,
    catOptions: baseCats,
    onDelete: handleDelete
  }) : view === 'rows' ? /*#__PURE__*/React.createElement(SectionCard, null, items.map(p => /*#__PURE__*/React.createElement(ProductRow, {
    key: p.sku,
    p: p,
    qty: getQty(p.sku),
    catLabel: catOf(p),
    catOptions: baseCats,
    onQty: v => setQty(p.sku, v),
    onAdd: () => handleAdd(p),
    onDelete: handleDelete
  }))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
      gap: 14
    }
  }, items.map(p => /*#__PURE__*/React.createElement(ProductCard, {
    key: p.sku,
    p: p,
    qty: getQty(p.sku),
    priority: priority,
    recommended: recommendFor(p),
    catLabel: catOf(p),
    catOptions: baseCats,
    onDelete: handleDelete,
    onQty: v => setQty(p.sku, v),
    onAdd: () => handleAdd(p)
  })))));
}
Object.assign(window, {
  OrderPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/OrderPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/OrdersPage.jsx
try { (() => {
// Order history — past orders, statuses, tracking, reorder, date-range filter,
// CSV import, and a printable "cost to run experiments" spend report.

function statusTone(status) {
  return {
    'Delivered': 'success',
    'In transit': 'info',
    'Processing': 'warning',
    'Cancelled': 'danger'
  }[status] || 'neutral';
}

// Reference "now" anchored to the latest order so date ranges partition seed data
// sensibly regardless of the runtime clock.
function refNow(orders) {
  const ds = orders.map(o => new Date(o.date + 'T00:00:00').getTime()).filter(n => !isNaN(n));
  return Math.max(ds.length ? Math.max(...ds) : Date.now(), Date.now());
}
const RANGES = [['30d', 'Last 30 days', 30], ['60d', 'Last 60 days', 60], ['90d', 'Last 90 days', 90], ['6m', 'Last 6 months', 182], ['1y', 'Last year', 365], ['3y', 'Last 3 years', 1095], ['all', 'All time', Infinity]];
function OrderRow({
  o,
  expanded,
  onToggle,
  onNavigate
}) {
  const vendors = [...new Set(o.lines.map(l => product(l.sku) && product(l.sku).vendor).filter(Boolean))];
  const itemCount = o.lines.reduce((a, l) => a + l.qty, 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: `1px solid ${PW.line}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onToggle,
    style: {
      display: 'grid',
      gridTemplateColumns: '110px 1fr 150px 120px 100px 110px 36px',
      gap: 12,
      alignItems: 'center',
      padding: '12px 16px',
      cursor: 'pointer',
      background: expanded ? '#FAFBF7' : PW.white
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 12.5,
      color: SLDS_BLUE,
      fontWeight: 500
    }
  }, o.id), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, vendors.slice(0, 3).map(v => /*#__PURE__*/React.createElement(VendorMark, {
    key: v,
    vendorKey: v,
    height: 13,
    withName: false
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12.5,
      color: PW.ink500,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, itemCount, " item", itemCount !== 1 ? 's' : '', " \xB7 ", o.lines.length, " line", o.lines.length !== 1 ? 's' : '', o.imported && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 6,
      fontFamily: PW.sans,
      fontSize: 10.5,
      color: PW.mute,
      padding: '1px 5px',
      background: '#F0F0EC',
      borderRadius: 2
    }
  }, "imported"))), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0
    }
  }, o.tracking ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "truck",
    size: 12,
    color: PW.mute
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 11,
      color: PW.ink500,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, o.tracking)) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11.5,
      color: PW.mute
    }
  }, "\u2014")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12.5,
      color: PW.mute
    }
  }, fmtDate(o.date)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 13.5,
      color: PW.ink,
      fontVariantNumeric: 'tabular-nums'
    }
  }, money(o.total)), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(StatusPill, {
    tone: statusTone(o.status)
  }, o.status)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      color: PW.mute,
      transform: expanded ? 'rotate(180deg)' : 'none',
      transition: 'transform 160ms ease'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron",
    size: 16
  }))), expanded && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 16px 16px',
      background: '#FAFBF7'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      alignItems: 'center',
      margin: '6px 0 12px'
    }
  }, o.urgency && /*#__PURE__*/React.createElement(UrgencyPill, {
    level: o.urgency
  }), o.tracking && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '3px 9px',
      borderRadius: 12,
      background: '#EAF1FB',
      fontFamily: PW.sans,
      fontSize: 11.5,
      color: '#1E4FB0',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "truck",
    size: 12
  }), " ", o.carrier ? o.carrier + ' · ' : '', o.tracking), o.needBy && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.mute
    }
  }, "Needed by ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: PW.ink500
    }
  }, fmtDate(o.needBy))), o.arrival && o.status !== 'Delivered' && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.mute
    }
  }, "Est. arrival ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: PW.ink500
    }
  }, fmtDate(o.arrival)))), /*#__PURE__*/React.createElement("div", {
    style: {
      border: `1px solid ${PW.line}`,
      borderRadius: 4,
      overflow: 'hidden',
      background: PW.white
    }
  }, o.lines.map((l, i) => {
    const p = product(l.sku);
    return /*#__PURE__*/React.createElement("div", {
      key: l.sku,
      style: {
        display: 'grid',
        gridTemplateColumns: '40px 1fr 130px 90px',
        gap: 10,
        alignItems: 'center',
        padding: '9px 14px',
        borderBottom: i === o.lines.length - 1 ? 0 : `1px solid ${PW.line}`,
        fontFamily: PW.sans,
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: PW.mono,
        fontSize: 12,
        color: PW.mute
      }
    }, l.qty, "\xD7"), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: PW.ink,
        fontWeight: 500
      }
    }, p ? p.name : l.sku), p && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: PW.mono,
        fontSize: 11,
        color: PW.mute,
        marginLeft: 8
      }
    }, p.catalog)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: PW.sans,
        fontSize: 12,
        color: PW.ink500
      }
    }, p ? vendor(p.vendor).name : '—'), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: PW.mono,
        fontSize: 12.5,
        color: PW.ink,
        textAlign: 'right'
      }
    }, p ? money(p.price * l.qty) : '—'));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginTop: 12,
      flexWrap: 'wrap'
    }
  }, o.po && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.mute
    }
  }, "PO ", /*#__PURE__*/React.createElement("b", {
    style: {
      fontFamily: PW.mono,
      color: PW.ink500
    }
  }, o.po)), o.saved > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: '#0A7048',
      fontWeight: 600
    }
  }, "Saved ", money(o.saved)), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(AppButton, {
    variant: "secondary",
    size: "sm",
    icon: "refresh",
    onClick: e => {
      e.stopPropagation();
      const n = reorderToCart(o.id);
      Toast.show(`Re-added ${n} line${n !== 1 ? 's' : ''} to cart`, {
        action: {
          label: 'View cart',
          onClick: () => onNavigate('cart')
        }
      });
    }
  }, "Reorder"))));
}

// Card view for an order (alternative to the table row)
function OrderCard({
  o,
  onNavigate
}) {
  const vendors = [...new Set(o.lines.map(l => product(l.sku) && product(l.sku).vendor).filter(Boolean))];
  const itemCount = o.lines.reduce((a, l) => a + l.qty, 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: PW.white,
      border: `1px solid ${PW.line}`,
      borderRadius: 6,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 14px',
      background: '#F4F6F9',
      borderBottom: `1px solid ${PW.line}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 12.5,
      color: SLDS_BLUE,
      fontWeight: 600
    }
  }, o.id), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(StatusPill, {
    tone: statusTone(o.status)
  }, o.status)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 14px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, vendors.slice(0, 4).map(v => /*#__PURE__*/React.createElement(VendorMark, {
    key: v,
    vendorKey: v,
    height: 13,
    withName: false
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.ink500
    }
  }, itemCount, " item", itemCount !== 1 ? 's' : '', " \xB7 ", o.lines.length, " line", o.lines.length !== 1 ? 's' : '')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 800,
      fontSize: 20,
      color: PW.ink,
      fontVariantNumeric: 'tabular-nums'
    }
  }, money(o.total)), o.saved > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11.5,
      color: '#0A7048',
      fontWeight: 700
    }
  }, "saved ", money(o.saved))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11.5,
      color: PW.mute,
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", null, fmtDate(o.date)), o.tracking && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "truck",
    size: 12
  }), " ", o.tracking)), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(AppButton, {
    variant: "secondary",
    size: "sm",
    icon: "refresh",
    style: {
      flex: 1
    },
    onClick: () => {
      const n = reorderToCart(o.id);
      Toast.show(`Re-added ${n} line${n !== 1 ? 's' : ''} to cart`, {
        action: {
          label: 'View cart',
          onClick: () => onNavigate('cart')
        }
      });
    }
  }, "Reorder"))));
}

// ───────── Spend report (cost to run experiments) ───────────────────
function aggregateOrders(orders) {
  let total = 0,
    saved = 0,
    units = 0;
  const byVendor = {},
    byCategory = {},
    byMonth = {};
  orders.forEach(o => {
    total += o.total || 0;
    saved += o.saved || 0;
    o.lines.forEach(l => {
      const p = product(l.sku);
      if (!p) return;
      const amt = p.price * l.qty;
      units += l.qty;
      byVendor[p.vendor] = (byVendor[p.vendor] || 0) + amt;
      byCategory[p.cat] = (byCategory[p.cat] || 0) + amt;
      const m = o.date.slice(0, 7);
      byMonth[m] = (byMonth[m] || 0) + amt;
    });
  });
  return {
    total,
    saved,
    units,
    byVendor,
    byCategory,
    byMonth,
    orderCount: orders.length
  };
}
function ReportTable({
  title,
  rows,
  total
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 700,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      marginBottom: 8
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      border: `1px solid ${PW.line}`,
      borderRadius: 4,
      overflow: 'hidden'
    }
  }, rows.map((r, i) => {
    const pct = total > 0 ? r.value / total * 100 : 0;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '9px 14px',
        borderBottom: i === rows.length - 1 ? 0 : `1px solid ${PW.line}`
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 180,
        fontFamily: PW.sans,
        fontSize: 13,
        color: PW.ink,
        fontWeight: 500,
        flexShrink: 0
      }
    }, r.label), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(Progress, {
      pct: pct,
      color: SLDS_BLUE,
      height: 6
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 44,
        textAlign: 'right',
        fontFamily: PW.sans,
        fontSize: 11.5,
        color: PW.mute
      }
    }, Math.round(pct), "%"), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 90,
        textAlign: 'right',
        fontFamily: PW.mono,
        fontSize: 12.5,
        color: PW.ink,
        fontWeight: 600
      }
    }, money0(r.value)));
  })));
}
function SpendReport({
  orders,
  rangeLabel,
  account,
  onClose
}) {
  const agg = aggregateOrders(orders);
  const vendorRows = Object.entries(agg.byVendor).map(([k, v]) => ({
    label: vendor(k).name,
    value: v
  })).sort((a, b) => b.value - a.value);
  const catRows = Object.entries(agg.byCategory).map(([k, v]) => ({
    label: k,
    value: v
  })).sort((a, b) => b.value - a.value);
  const monthRows = Object.entries(agg.byMonth).map(([k, v]) => ({
    label: fmtDate(k + '-01', {
      month: 'short',
      year: 'numeric'
    }),
    value: v
  })).sort((a, b) => a.label < b.label ? 1 : -1);
  const avg = agg.orderCount ? agg.total / agg.orderCount : 0;
  const exportCsv = () => {
    const rows = [];
    orders.forEach(o => o.lines.forEach(l => {
      const p = product(l.sku);
      if (!p) return;
      rows.push({
        order: o.id,
        date: o.date,
        vendor: vendor(p.vendor).name,
        category: p.cat,
        catalog: p.catalog,
        item: p.name,
        qty: l.qty,
        unit: p.price.toFixed(2),
        total: (p.price * l.qty).toFixed(2)
      });
    }));
    downloadText('procurewide-spend-report.csv', toCSV(rows, [{
      key: 'order',
      label: 'order id'
    }, {
      key: 'date',
      label: 'date'
    }, {
      key: 'vendor',
      label: 'vendor'
    }, {
      key: 'category',
      label: 'category'
    }, {
      key: 'catalog',
      label: 'catalog #'
    }, {
      key: 'item',
      label: 'item'
    }, {
      key: 'qty',
      label: 'qty'
    }, {
      key: 'unit',
      label: 'unit price'
    }, {
      key: 'total',
      label: 'line total'
    }]));
    Toast.show('Spend report exported to CSV');
  };
  const printReport = () => {
    const w = window.open('', '_blank');
    if (!w) {
      Toast.show('Allow pop-ups to print', {
        tone: 'danger'
      });
      return;
    }
    const row = (label, val, pct) => `<tr><td>${label}</td><td class="bar"><span style="width:${pct}%"></span></td><td class="n">${money0(val)}</td></tr>`;
    const vendorHtml = vendorRows.map(r => row(r.label, r.value, agg.total ? r.value / agg.total * 100 : 0)).join('');
    const catHtml = catRows.map(r => row(r.label, r.value, agg.total ? r.value / agg.total * 100 : 0)).join('');
    const monthHtml = monthRows.map(r => row(r.label, r.value, agg.total ? r.value / agg.total * 100 : 0)).join('');
    w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>ProcureWide — Cost to Run Experiments</title>
      <style>
        * { box-sizing: border-box; }
        body { font-family: -apple-system, Segoe UI, Roboto, sans-serif; color: #0E1525; margin: 40px; }
        h1 { font-size: 22px; margin: 0; letter-spacing: -0.01em; }
        .sub { color: #6B7280; font-size: 13px; margin-top: 4px; }
        .kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 24px 0; }
        .kpi { border: 1px solid #E5E7EB; border-radius: 6px; padding: 12px 14px; }
        .kpi .l { font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: #9CA3AF; font-weight: 700; }
        .kpi .v { font-size: 24px; font-weight: 800; margin-top: 4px; letter-spacing: -0.01em; }
        h2 { font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #9CA3AF; margin: 22px 0 8px; }
        table { width: 100%; border-collapse: collapse; border: 1px solid #E5E7EB; border-radius: 6px; overflow: hidden; }
        td { padding: 8px 12px; border-bottom: 1px solid #F0F0EC; font-size: 13px; }
        td.n { text-align: right; font-variant-numeric: tabular-nums; font-weight: 700; width: 110px; }
        td.bar { width: 50%; } td.bar span { display: block; height: 7px; background: #1B96FF; border-radius: 99px; }
        tr:last-child td { border-bottom: 0; }
        .foot { margin-top: 28px; color: #9CA3AF; font-size: 11px; border-top: 1px solid #E5E7EB; padding-top: 12px; }
        @media print { body { margin: 16px; } }
      </style></head><body>
      <h1>Cost to Run Experiments</h1>
      <div class="sub">${account.name} · ${rangeLabel} · ${agg.orderCount} orders · generated ${fmtDate(new Date().toISOString().slice(0, 10))}</div>
      <div class="kpis">
        <div class="kpi"><div class="l">Total spend</div><div class="v">${money0(agg.total)}</div></div>
        <div class="kpi"><div class="l">Total saved</div><div class="v" style="color:#0A7048">${money0(agg.saved)}</div></div>
        <div class="kpi"><div class="l">Orders</div><div class="v">${agg.orderCount}</div></div>
        <div class="kpi"><div class="l">Avg order</div><div class="v">${money0(avg)}</div></div>
      </div>
      <h2>Spend by vendor</h2><table>${vendorHtml}</table>
      <h2>Spend by category</h2><table>${catHtml}</table>
      <h2>Spend by month</h2><table>${monthHtml}</table>
      <div class="foot">ProcureWide · ${agg.units} units across ${agg.orderCount} orders · This document summarizes procurement spend for the selected period.</div>
      </body></html>`);
    w.document.close();
    setTimeout(() => {
      w.focus();
      w.print();
    }, 350);
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 5000,
      background: 'rgba(7,17,42,0.45)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      overflowY: 'auto',
      padding: '40px 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      maxWidth: 760,
      background: PW.white,
      borderRadius: 8,
      overflow: 'hidden',
      boxShadow: '0 30px 80px -20px rgba(7,17,42,0.6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 26px',
      borderBottom: `1px solid ${PW.line}`,
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(ObjIcon, {
    name: "doc",
    size: 34
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 19,
      color: PW.ink,
      letterSpacing: '-0.01em'
    }
  }, "Cost to run experiments"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12.5,
      color: PW.mute,
      marginTop: 2
    }
  }, account.name, " \xB7 ", rangeLabel, " \xB7 ", agg.orderCount, " orders")), /*#__PURE__*/React.createElement(AppButton, {
    variant: "secondary",
    size: "sm",
    icon: "download",
    onClick: exportCsv
  }, "Export CSV"), /*#__PURE__*/React.createElement(AppButton, {
    variant: "primary",
    size: "sm",
    icon: "doc",
    onClick: printReport
  }, "Print / PDF"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      width: 30,
      height: 30,
      border: 0,
      background: 'transparent',
      color: PW.mute,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 17
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '22px 26px 28px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 12
    }
  }, [['Total spend', money0(agg.total), PW.ink], ['Total saved', money0(agg.saved), '#0A7048'], ['Orders', String(agg.orderCount), PW.ink], ['Avg order', money0(avg), PW.ink]].map(([l, v, c]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      border: `1px solid ${PW.line}`,
      borderRadius: 6,
      padding: '12px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 10,
      fontWeight: 700,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  }, l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.display,
      fontWeight: 700,
      fontSize: 23,
      color: c,
      marginTop: 4,
      letterSpacing: '-0.01em'
    }
  }, v)))), vendorRows.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    icon: "doc",
    title: "No spend in this period",
    sub: "Pick a wider date range to see your experiment costs."
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ReportTable, {
    title: "Spend by vendor",
    rows: vendorRows,
    total: agg.total
  }), /*#__PURE__*/React.createElement(ReportTable, {
    title: "Spend by category",
    rows: catRows,
    total: agg.total
  }), /*#__PURE__*/React.createElement(ReportTable, {
    title: "Spend by month",
    rows: monthRows,
    total: agg.total
  })))));
}
function OrdersPage({
  onNavigate
}) {
  const s = useStore();
  const [expanded, setExpanded] = React.useState(null);
  const [status, setStatus] = React.useState('all');
  const [range, setRange] = React.useState('all');
  const [report, setReport] = React.useState(false);
  const [view, setView] = useViewMode('orders', 'table');
  const now = refNow(s.orders);
  const rangeDef = RANGES.find(r => r[0] === range) || RANGES[6];
  const cutoff = rangeDef[2] === Infinity ? -Infinity : now - rangeDef[2] * 86400000;
  const inRange = s.orders.filter(o => new Date(o.date + 'T00:00:00').getTime() >= cutoff);
  const orders = inRange.filter(o => status === 'all' || o.status === status);
  const totalSpend = inRange.reduce((a, o) => a + (o.total || 0), 0);
  const totalSaved = inRange.reduce((a, o) => a + (o.saved || 0), 0);
  const openCount = inRange.filter(o => o.status === 'Processing' || o.status === 'In transit').length;
  const rangeLabel = rangeDef[1];
  const statuses = ['all', 'Processing', 'In transit', 'Delivered'];
  const handleCsv = rows => {
    const res = importOrderRows(rows);
    if (res.lines) Toast.show(`Imported ${res.orders} order${res.orders !== 1 ? 's' : ''} (${res.lines} lines)`);else Toast.show('No matching catalog items found in that CSV', {
      tone: 'danger'
    });
  };
  const downloadTemplate = () => {
    const sample = [{
      'order id': 'HIST-001',
      date: '2026-03-18',
      'catalog #': CATALOG[0].catalog,
      qty: '6'
    }, {
      'order id': 'HIST-001',
      date: '2026-03-18',
      'catalog #': CATALOG[1].catalog,
      qty: '4'
    }, {
      'order id': 'HIST-002',
      date: '2026-02-02',
      'catalog #': CATALOG[2].catalog,
      qty: '2'
    }];
    downloadText('procurewide-past-orders-template.csv', toCSV(sample, [{
      key: 'order id',
      label: 'order id'
    }, {
      key: 'date',
      label: 'date'
    }, {
      key: 'catalog #',
      label: 'catalog #'
    }, {
      key: 'qty',
      label: 'qty'
    }]));
    Toast.show('Template downloaded');
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHeader, {
    icon: "clock",
    kicker: "Ordering",
    title: "Order history"
  }, /*#__PURE__*/React.createElement(AppButton, {
    variant: "primary",
    icon: "doc",
    onClick: () => setReport(true)
  }, "Spend report"), /*#__PURE__*/React.createElement(CsvUpload, {
    label: "Upload past orders",
    onRows: handleCsv
  }), /*#__PURE__*/React.createElement(AppButton, {
    variant: "ghost",
    icon: "download",
    onClick: downloadTemplate
  }, "Template")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 28px 60px',
      maxWidth: 1240,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 14,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Kpi, {
    label: `Spend · ${rangeLabel.toLowerCase()}`,
    value: money0(totalSpend),
    icon: "tag",
    sub: `${inRange.length} orders`
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Saved vs. list",
    value: money0(totalSaved),
    tone: "green",
    icon: "bolt",
    sub: "in this period"
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Open orders",
    value: openCount,
    tone: openCount ? 'blue' : undefined,
    icon: "truck",
    sub: "processing or in transit"
  })), /*#__PURE__*/React.createElement("div", {
    onClick: () => setReport(true),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 18px',
      marginBottom: 16,
      cursor: 'pointer',
      borderRadius: 6,
      background: 'linear-gradient(120deg, #07112A, #0B2A4A)',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement(ObjIcon, {
    name: "doc",
    size: 32,
    color: "#1B96FF",
    glyph: "#fff"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 14.5,
      fontWeight: 700
    }
  }, "This is what it costs to run experiments"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12.5,
      color: 'rgba(255,255,255,0.7)',
      marginTop: 1
    }
  }, money0(totalSpend), " across ", inRange.length, " orders \xB7 ", rangeLabel.toLowerCase(), " \u2014 full breakdown by vendor, category & month.")), /*#__PURE__*/React.createElement(AppButton, {
    variant: "primary",
    size: "sm",
    icon: "arrowR",
    onClick: e => {
      e.stopPropagation();
      setReport(true);
    }
  }, "Open report")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 2,
      background: PW.white,
      border: `1px solid ${PW.line2}`,
      borderRadius: 4,
      padding: 2
    }
  }, statuses.map(st => /*#__PURE__*/React.createElement("button", {
    key: st,
    onClick: () => setStatus(st),
    style: {
      padding: '6px 12px',
      borderRadius: 3,
      border: 0,
      background: status === st ? '#EAF1FB' : 'transparent',
      color: status === st ? PW.ink : PW.ink500,
      fontFamily: PW.sans,
      fontSize: 12.5,
      fontWeight: status === st ? 600 : 500,
      cursor: 'pointer'
    }
  }, st === 'all' ? 'All orders' : st))), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(ViewSwitch, {
    value: view,
    onChange: setView,
    options: [['table', 'Classic', 'table'], ['cards', 'Cards', 'grid']]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.mute
    }
  }, "Period"), /*#__PURE__*/React.createElement("select", {
    value: range,
    onChange: e => setRange(e.target.value),
    style: {
      padding: '7px 10px',
      fontFamily: PW.sans,
      fontSize: 12.5,
      color: PW.ink,
      fontWeight: 600,
      background: PW.white,
      border: `1px solid ${PW.line2}`,
      borderRadius: 4,
      outline: 'none',
      cursor: 'pointer'
    }
  }, RANGES.map(([id, lbl]) => /*#__PURE__*/React.createElement("option", {
    key: id,
    value: id
  }, lbl))))), view === 'cards' ? orders.length === 0 ? /*#__PURE__*/React.createElement(SectionCard, null, /*#__PURE__*/React.createElement(EmptyState, {
    icon: "clock",
    title: "No orders in this period",
    sub: "Try a wider date range, or import past orders from a CSV."
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: 14
    }
  }, orders.map(o => /*#__PURE__*/React.createElement(OrderCard, {
    key: o.id,
    o: o,
    onNavigate: onNavigate
  }))) : /*#__PURE__*/React.createElement(SectionCard, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '110px 1fr 150px 120px 100px 110px 36px',
      gap: 12,
      padding: '9px 16px',
      background: '#F4F6F9',
      borderBottom: `1px solid ${PW.line}`,
      fontFamily: PW.sans,
      fontSize: 10.5,
      fontWeight: 700,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Order"), /*#__PURE__*/React.createElement("span", null, "Items"), /*#__PURE__*/React.createElement("span", null, "Tracking"), /*#__PURE__*/React.createElement("span", null, "Date"), /*#__PURE__*/React.createElement("span", null, "Total"), /*#__PURE__*/React.createElement("span", null, "Status"), /*#__PURE__*/React.createElement("span", null)), orders.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    icon: "clock",
    title: "No orders in this period",
    sub: "Try a wider date range, or import past orders from a CSV."
  }) : orders.map(o => /*#__PURE__*/React.createElement(OrderRow, {
    key: o.id,
    o: o,
    expanded: expanded === o.id,
    onToggle: () => setExpanded(expanded === o.id ? null : o.id),
    onNavigate: onNavigate
  })))), report && /*#__PURE__*/React.createElement(SpendReport, {
    orders: inRange,
    rangeLabel: rangeLabel,
    account: s.account,
    onClose: () => setReport(false)
  }));
}
Object.assign(window, {
  OrdersPage,
  statusTone
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/OrdersPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/OrdersTable.jsx
try { (() => {
// Procure-GPT search — Juicebox AI flow inside Salesforce card chrome.
// Square corners (3-4px), gray-header card sections, colored object icons,
// path-stage row, status pills, Salesforce blue accent.

const SLDS_BLUE = '#1B96FF'; // Salesforce primary blue
const SLDS_BLUE_HOVER = '#0F7BD1';
const SEARCH_PROMPT = 'Find cheapest DMEM, high glucose, 500 mL — GMP grade, lead time under 5 days, exclude Amazon';
const CRITERIA = [{
  label: 'GMP grade',
  active: true,
  count: 47
}, {
  label: 'Lead time < 5 days',
  active: true,
  count: 38
}, {
  label: 'Cold-chain OK',
  active: false
}, {
  label: 'Exclude Amazon',
  active: true
}, {
  label: 'In stock',
  active: false,
  count: 124
}, {
  label: 'Net 30 terms',
  active: false
}];
const RESULTS = [{
  id: 'PW-04821',
  score: 96,
  scoreLabel: 'Excellent',
  name: 'DMEM, high glucose, no glutamine · 500 mL',
  catalog: '11965-092',
  vendor: 'Thermo Fisher Scientific',
  vendorLogo: 'thermo-fisher.png',
  qty: '6 × 500 mL',
  price: 340.80,
  listPrice: 382.40,
  savings: 41.60,
  savingsPct: 10.88,
  lead: '3–5 days',
  badges: ['GMP', 'ISO 9001', 'Cold-chain'],
  summary: 'High-glucose DMEM with sodium pyruvate and HEPES, manufactured at the Grand Island facility. Matches your prior order pattern (Q1: 4 cases, Q2: 6 cases) and ships from Pittsburgh — within your typical 3-day lab receive window.',
  highlights: [{
    phrase: 'GMP-grade manufacturing',
    why: 'GMP grade'
  }, {
    phrase: '3–5 day lead time from PA warehouse',
    why: 'Lead time < 5 days'
  }, {
    phrase: 'Save $41.60 vs. list (10.88%)',
    why: 'Lowest price found'
  }],
  stage: 2 // 0:Sourcing 1:Quoting 2:Quoted 3:Ordered 4:Received
}, {
  id: 'PW-04820',
  score: 89,
  scoreLabel: 'Strong match',
  name: 'DMEM, high glucose, w/ L-glutamine · 500 mL',
  catalog: 'SH30022.01',
  vendor: 'Cytiva (HyClone)',
  vendorLogo: null,
  qty: '6 × 500 mL',
  price: 318.00,
  listPrice: 360.00,
  savings: 42.00,
  savingsPct: 11.67,
  lead: '4–6 days',
  badges: ['GMP', 'ISO 13485'],
  summary: 'HyClone formulation with built-in L-glutamine, popular for cell-line maintenance work. Slightly longer lead time than the Thermo option but $22.80 cheaper for the same quantity.',
  highlights: [{
    phrase: 'GMP manufacturing under ISO 13485',
    why: 'GMP grade'
  }, {
    phrase: '4–6 day lead time',
    why: 'Lead time < 5 days (edge)'
  }, {
    phrase: '$22.80 cheaper than top match',
    why: 'Lowest price found'
  }],
  stage: 1
}, {
  id: 'PW-04819',
  score: 74,
  scoreLabel: 'Good match',
  name: 'DMEM, high glucose · 500 mL',
  catalog: 'D6429-500ML',
  vendor: 'Sigma-Aldrich',
  vendorLogo: null,
  qty: '6 × 500 mL',
  price: 388.00,
  listPrice: 414.00,
  savings: 26.00,
  savingsPct: 6.28,
  lead: '2–3 days',
  badges: ['Sterile-filtered'],
  summary: 'Sigma-Aldrich standard high-glucose DMEM, faster ship time than the top match but priced higher. Not GMP-grade — flagged as a partial criteria match.',
  highlights: [{
    phrase: '2–3 day lead time (fastest)',
    why: 'Lead time < 5 days'
  }, {
    phrase: 'Sterile-filtered, not GMP-grade',
    why: 'GMP grade — partial match',
    miss: true
  }],
  stage: 0
}];
const STAGES = ['Sourcing', 'Quoting', 'Quoted', 'Ordered', 'Received'];

// ───────── Page header (Salesforce object header) ──────────────────
function ObjectHeader() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: PW.white,
      borderBottom: `1px solid ${PW.line}`,
      padding: '12px 24px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.mute,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(SqIcon, {
    kind: "search",
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 2
    }
  }, "Searches"), /*#__PURE__*/React.createElement("span", null, "\u203A"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.ink500
    }
  }, "Saved May 23"), /*#__PURE__*/React.createElement("span", null, "\u203A"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.ink,
      fontWeight: 600
    }
  }, "DMEM \xB7 GMP \xB7 <5 days"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      padding: '4px 10px',
      border: `1px solid ${PW.line2}`,
      background: PW.white,
      color: PW.ink500,
      borderRadius: 3,
      fontSize: 12,
      fontWeight: 500,
      fontFamily: PW.sans,
      cursor: 'pointer'
    }
  }, "Share"), /*#__PURE__*/React.createElement("button", {
    style: {
      padding: '4px 10px',
      border: `1px solid ${PW.line2}`,
      background: PW.white,
      color: PW.ink500,
      borderRadius: 3,
      fontSize: 12,
      fontWeight: 500,
      fontFamily: PW.sans,
      cursor: 'pointer'
    }
  }, "Duplicate"), /*#__PURE__*/React.createElement("button", {
    style: {
      padding: '4px 10px',
      border: 0,
      background: SLDS_BLUE,
      color: '#fff',
      borderRadius: 3,
      fontSize: 12,
      fontWeight: 600,
      fontFamily: PW.sans,
      cursor: 'pointer'
    }
  }, "+ Save as agent")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(SqIcon, {
    kind: "search",
    size: 32
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      color: PW.mute,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }
  }, "Search"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '2px 0 0',
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 20,
      color: PW.ink,
      letterSpacing: '-0.01em'
    }
  }, "DMEM \xB7 GMP \xB7 <5 days")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18
    }
  }, [['Candidates evaluated', '47'], ['Top match score', '96'], ['Est. savings', '$41.60']].map(([l, v], i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: l
  }, i > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 28,
      background: PW.line
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 10,
      color: PW.mute,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }
  }, l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 16,
      color: PW.ink,
      marginTop: 1,
      fontVariantNumeric: 'tabular-nums',
      letterSpacing: '-0.005em'
    }
  }, v)))))));
}

// ───────── AI prompt card (Salesforce-shaped) ──────────────────────
function PromptCard() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: PW.white,
      border: `1px solid ${PW.line}`,
      borderRadius: 4,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 14px',
      background: '#F4F6F9',
      borderBottom: `1px solid ${PW.line}`
    }
  }, /*#__PURE__*/React.createElement(SqIcon, {
    kind: "agents",
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 700,
      color: PW.ink,
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }
  }, "Procure-GPT prompt"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '2px 6px',
      borderRadius: 2,
      background: '#DDE7F8',
      color: '#1E4FB0',
      fontFamily: PW.sans,
      fontSize: 10,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.04em'
    }
  }, "Einstein-style"), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 3,
      background: 'transparent',
      border: 0,
      color: PW.mute,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "12",
    r: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "12",
    r: "1.5"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("textarea", {
    defaultValue: SEARCH_PROMPT,
    rows: 2,
    style: {
      flex: 1,
      padding: '8px 10px',
      fontFamily: PW.sans,
      fontSize: 14,
      color: PW.ink,
      lineHeight: 1.5,
      background: '#FAFBF7',
      border: `1px solid ${PW.line2}`,
      borderRadius: 3,
      outline: 'none',
      resize: 'none',
      boxSizing: 'border-box'
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      padding: '9px 14px',
      background: PW.ink,
      color: '#fff',
      border: 0,
      borderRadius: 3,
      fontFamily: PW.sans,
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      flexShrink: 0
    }
  }, "Search", /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.mute
    }
  }, [['Find similar', true], ['Job spec', false], ['Boolean', false], ['Paste catalog #', false]].map(([m, on]) => /*#__PURE__*/React.createElement("button", {
    key: m,
    style: {
      padding: '3px 0',
      background: 'transparent',
      border: 0,
      color: on ? PW.ink : PW.mute,
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: on ? 600 : 500,
      cursor: 'pointer',
      borderBottom: on ? `1.5px solid ${SLDS_BLUE}` : '1.5px solid transparent'
    }
  }, m)), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 11
    }
  }, "\u2318 + \u21B5"))));
}

// ───────── Filter chips (Salesforce style) ──────────────────────────
function CriteriaChip({
  c
}) {
  return /*#__PURE__*/React.createElement("button", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 8px',
      borderRadius: 3,
      background: c.active ? '#DDE7F8' : PW.white,
      color: c.active ? '#1E4FB0' : PW.ink500,
      border: `1px solid ${c.active ? '#9EBEEC' : PW.line2}`,
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 500,
      lineHeight: 1.4,
      cursor: 'pointer'
    }
  }, c.active && /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#1E4FB0',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5"
  }))), c.label, c.count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      color: c.active ? '#1E4FB0' : PW.mute,
      fontFamily: PW.mono,
      fontSize: 11,
      opacity: 0.7
    }
  }, c.count), /*#__PURE__*/React.createElement("span", {
    style: {
      color: c.active ? '#1E4FB0' : PW.mute,
      marginLeft: 1,
      opacity: 0.6,
      fontSize: 13
    }
  }, "\xD7"));
}

// ───────── Match score badge ─────────────────────────────────────────
function MatchScore({
  score,
  label
}) {
  const tier = score >= 90 ? 'excellent' : score >= 80 ? 'strong' : score >= 70 ? 'good' : 'fair';
  const colors = {
    excellent: {
      ring: '#0E9560',
      bg: '#E6F5EC',
      fg: '#064A30'
    },
    strong: {
      ring: '#1B96FF',
      bg: '#DDE7F8',
      fg: '#1E4FB0'
    },
    good: {
      ring: '#E0A60A',
      bg: '#FBF0CF',
      fg: '#8A6308'
    },
    fair: {
      ring: '#D6322D',
      bg: '#FBE3E2',
      fg: '#8B1F1B'
    }
  };
  const c = colors[tier];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
      minWidth: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 4,
      background: c.bg,
      border: `2px solid ${c.ring}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 800,
      fontSize: 18,
      color: c.fg,
      letterSpacing: '-0.01em'
    }
  }, score), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.mono,
      fontSize: 9,
      color: c.fg,
      fontWeight: 600,
      marginTop: 1,
      letterSpacing: '0.04em'
    }
  }, "/ 100")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 10,
      fontWeight: 600,
      color: c.fg,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      whiteSpace: 'nowrap'
    }
  }, label));
}
function PathStage({
  label,
  state,
  first,
  last
}) {
  const colors = {
    done: {
      bg: '#0A7048',
      fg: '#fff'
    },
    current: {
      bg: '#1B96FF',
      fg: '#fff'
    },
    todo: {
      bg: '#FFFFFF',
      fg: '#5A6A8E',
      border: '#C8CCC1'
    }
  };
  const c = colors[state];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '5px 8px 5px 18px',
      background: c.bg,
      color: c.fg,
      border: c.border ? `1px solid ${c.border}` : 'none',
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 600,
      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%, 8px 50%)',
      whiteSpace: 'nowrap',
      paddingLeft: first ? 10 : 18,
      letterSpacing: '-0.005em'
    }
  }, label);
}
function Highlight({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'linear-gradient(180deg, transparent 55%, #FFF1A8 55%)',
      padding: '0 2px',
      color: PW.ink,
      fontWeight: 500
    }
  }, children);
}

// ───────── Result card ──────────────────────────────────────────────
function ResultCard({
  r,
  active,
  onClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => onClick && onClick(r),
    style: {
      background: PW.white,
      border: `1px solid ${active ? SLDS_BLUE : PW.line}`,
      boxShadow: active ? `0 0 0 1px ${SLDS_BLUE}` : 'none',
      borderRadius: 4,
      overflow: 'hidden',
      cursor: 'pointer',
      transition: `all 100ms ${PW.ease}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '7px 14px',
      background: '#F4F6F9',
      borderBottom: `1px solid ${PW.line}`
    }
  }, /*#__PURE__*/React.createElement(SqIcon, {
    kind: "orders",
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 12,
      color: SLDS_BLUE,
      fontWeight: 500
    }
  }, r.id), /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.mute,
      fontSize: 11
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.ink500
    }
  }, r.vendor), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '2px 8px',
      borderRadius: 12,
      background: '#E6F5EC',
      color: '#0A7048',
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 600
    }
  }, STAGES[r.stage]), /*#__PURE__*/React.createElement("button", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 22,
      height: 22,
      borderRadius: 3,
      background: 'transparent',
      border: 0,
      color: PW.mute,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "12",
    r: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "12",
    r: "1.5"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '64px 1fr 180px',
      gap: 16,
      padding: '14px 16px',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(MatchScore, {
    score: r.score,
    label: r.scoreLabel
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 15,
      color: PW.ink,
      letterSpacing: '-0.005em'
    }
  }, r.name), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      fontFamily: PW.mono,
      fontSize: 12,
      color: SLDS_BLUE,
      textDecoration: 'none'
    }
  }, r.catalog)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.ink500
    }
  }, r.vendorLogo ? /*#__PURE__*/React.createElement("img", {
    src: `../../assets/vendors/${r.vendorLogo}`,
    alt: "",
    style: {
      height: 13,
      objectFit: 'contain'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: 13,
      height: 13,
      borderRadius: 2,
      background: '#F0EFEB',
      display: 'inline-block'
    }
  }), /*#__PURE__*/React.createElement("span", null, r.qty), /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.mute
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, "Lead ", r.lead)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      marginTop: 8,
      flexWrap: 'wrap'
    }
  }, r.badges.map(b => /*#__PURE__*/React.createElement("span", {
    key: b,
    style: {
      padding: '2px 7px',
      borderRadius: 2,
      background: '#F0EFEB',
      color: PW.ink500,
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 500
    }
  }, b))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      padding: '10px 12px',
      background: '#FAFBF7',
      borderLeft: `3px solid #0E9560`,
      borderRadius: '0 3px 3px 0',
      fontFamily: PW.sans,
      fontSize: 12,
      lineHeight: 1.55,
      color: PW.ink500
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 10,
      fontWeight: 700,
      color: '#0A7048',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      marginBottom: 4,
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2l1.7 4.3L18 8l-4.3 1.7L12 14l-1.7-4.3L6 8l4.3-1.7z"
  })), "AI summary"), r.summary), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, r.highlights.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 8,
      fontFamily: PW.sans,
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 14,
      height: 14,
      borderRadius: 2,
      flexShrink: 0,
      background: h.miss ? '#D6322D' : '#0E9560',
      color: '#fff',
      marginTop: 1
    }
  }, h.miss ? /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "9",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6l-12 12"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "9",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      color: PW.ink500
    }
  }, /*#__PURE__*/React.createElement(Highlight, null, h.phrase), /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.mute,
      marginLeft: 6,
      fontSize: 11
    }
  }, "\u21B3 ", h.why)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 22,
      color: PW.ink,
      letterSpacing: '-0.01em',
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 1
    }
  }, "$", r.price.toFixed(2)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.mono,
      fontSize: 11,
      color: PW.mute,
      textDecoration: 'line-through'
    }
  }, "$", r.listPrice.toFixed(2)), r.savings && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '2px 8px',
      borderRadius: 2,
      background: '#E6F5EC',
      color: '#0A7048',
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 700,
      fontVariantNumeric: 'tabular-nums'
    }
  }, "Save $", r.savings.toFixed(2), " \xB7 ", r.savingsPct, "%"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: e => e.stopPropagation(),
    title: "Shortlist",
    style: {
      width: 28,
      height: 28,
      borderRadius: 3,
      background: PW.white,
      border: `1px solid ${PW.line2}`,
      color: PW.ink500,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: e => e.stopPropagation(),
    style: {
      padding: '6px 12px',
      background: SLDS_BLUE,
      color: '#fff',
      border: 0,
      borderRadius: 3,
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      cursor: 'pointer'
    }
  }, "Order")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: 'flex',
      gap: 1,
      width: '100%'
    }
  }, STAGES.map((s, i) => /*#__PURE__*/React.createElement(PathStage, {
    key: s,
    label: s.slice(0, 3),
    state: i < r.stage ? 'done' : i === r.stage ? 'current' : 'todo',
    first: i === 0,
    last: i === STAGES.length - 1
  }))))));
}

// ───────── Main view ────────────────────────────────────────────────
function OrdersTable({
  onRowClick
}) {
  const [active, setActive] = React.useState(RESULTS[0].id);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ObjectHeader, null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 24px 60px',
      maxWidth: 1200
    }
  }, /*#__PURE__*/React.createElement(PromptCard, null), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 700,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      marginRight: 4
    }
  }, "Filters from prompt"), CRITERIA.map(c => /*#__PURE__*/React.createElement(CriteriaChip, {
    key: c.label,
    c: c
  })), /*#__PURE__*/React.createElement("button", {
    style: {
      padding: '4px 8px',
      borderRadius: 3,
      background: 'transparent',
      border: `1px dashed ${PW.line2}`,
      color: PW.mute,
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 500,
      cursor: 'pointer'
    }
  }, "+ Add filter")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginTop: 20,
      marginBottom: 10,
      paddingBottom: 8,
      borderBottom: `1px solid ${PW.line}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 16,
      color: PW.ink,
      letterSpacing: '-0.005em'
    }
  }, "3 matches"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.mute
    }
  }, "\xB7 est. avg savings ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: '#0A7048'
    }
  }, "\u2191 9.6%"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.ink500
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.mute,
      marginRight: 6
    }
  }, "Sort:"), [['Best match', true], ['Price', false], ['Lead time', false]].map(([label, on]) => /*#__PURE__*/React.createElement("button", {
    key: label,
    style: {
      padding: '4px 8px',
      background: on ? '#F0F0EC' : 'transparent',
      border: 0,
      borderRadius: 3,
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: on ? 600 : 500,
      color: on ? PW.ink : PW.ink500,
      cursor: 'pointer'
    }
  }, label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, RESULTS.map(r => /*#__PURE__*/React.createElement(ResultCard, {
    key: r.id,
    r: r,
    active: active === r.id,
    onClick: rec => {
      setActive(rec.id);
      onRowClick && onRowClick(rec);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      background: PW.white,
      border: `1px solid ${PW.line}`,
      borderRadius: 4,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '7px 14px',
      background: '#F4F6F9',
      borderBottom: `1px solid ${PW.line}`
    }
  }, /*#__PURE__*/React.createElement(SqIcon, {
    kind: "agents",
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 700,
      color: PW.ink,
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }
  }, "Suggested next step")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 14,
      color: PW.ink,
      letterSpacing: '-0.005em'
    }
  }, "Turn this into a recurring agent"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.ink500,
      marginTop: 2
    }
  }, "Re-run weekly and surface new vendors matching these criteria \u2014 including newly added vendors as we onboard them.")), /*#__PURE__*/React.createElement("button", {
    style: {
      padding: '7px 14px',
      background: SLDS_BLUE,
      color: '#fff',
      border: 0,
      borderRadius: 3,
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      cursor: 'pointer'
    }
  }, "Create agent")))));
}
Object.assign(window, {
  OrdersTable,
  RESULTS,
  STAGES,
  SLDS_BLUE
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/OrdersTable.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/RequestForm.jsx
try { (() => {
// "Request item" modal — denser enterprise form pattern.

function RequestForm({
  open,
  onClose
}) {
  const [lines, setLines] = React.useState([{
    id: 1
  }, {
    id: 2
  }]);
  const [priority, setPriority] = React.useState('normal');
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(10,21,48,0.55)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      maxWidth: 720,
      background: PW.white,
      borderRadius: 12,
      boxShadow: PW.shadowLg,
      overflow: 'hidden',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 24px',
      background: PW.ink,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 600,
      color: '#7CD9A7',
      textTransform: 'uppercase',
      letterSpacing: '0.10em'
    }
  }, "New request"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 2,
      fontFamily: PW.sans,
      fontSize: 17,
      fontWeight: 700,
      color: '#fff'
    }
  }, "Request item")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      width: 30,
      height: 30,
      borderRadius: 6,
      background: 'transparent',
      border: 0,
      cursor: 'pointer',
      fontSize: 20,
      color: '#fff',
      lineHeight: 1
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.10em',
      color: PW.mute,
      marginBottom: 10
    }
  }, "Line items"), /*#__PURE__*/React.createElement("div", {
    style: {
      border: `1px solid ${PW.line}`,
      borderRadius: 8,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr 0.6fr 36px',
      gap: 0,
      padding: '10px 12px',
      background: PW.paper,
      borderBottom: `1px solid ${PW.line}`,
      fontFamily: PW.sans,
      fontSize: 10,
      fontWeight: 700,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.10em'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Item description"), /*#__PURE__*/React.createElement("span", null, "Catalog #"), /*#__PURE__*/React.createElement("span", null, "Qty"), /*#__PURE__*/React.createElement("span", null)), lines.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: l.id,
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr 0.6fr 36px',
      gap: 0,
      padding: '8px 12px',
      borderBottom: i === lines.length - 1 ? 0 : `1px solid ${PW.line}`,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "DMEM, high glucose, 500 mL",
    style: lineInput()
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "11965-092",
    style: {
      ...lineInput(),
      fontFamily: PW.mono,
      fontSize: 12
    }
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "6",
    style: lineInput()
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setLines(lines.filter(x => x.id !== l.id)),
    style: {
      width: 28,
      height: 28,
      border: 0,
      background: 'transparent',
      color: PW.mute,
      cursor: 'pointer',
      fontSize: 16
    }
  }, "\xD7")))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setLines([...lines, {
      id: Date.now()
    }]),
    style: {
      marginTop: 10,
      padding: '8px 12px',
      background: 'transparent',
      border: `1px dashed ${PW.line2}`,
      borderRadius: 6,
      cursor: 'pointer',
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 12,
      color: PW.ink500,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, "+ Add line item"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      color: PW.ink500,
      marginBottom: 6
    }
  }, "Priority"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 0,
      border: `1px solid ${PW.line2}`,
      borderRadius: 6,
      overflow: 'hidden'
    }
  }, [['low', 'Low'], ['normal', 'Normal'], ['high', 'High'], ['rush', 'Rush']].map(([id, label], i, arr) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => setPriority(id),
    style: {
      flex: 1,
      padding: '8px 6px',
      background: priority === id ? PW.ink : PW.white,
      color: priority === id ? '#fff' : PW.ink500,
      border: 0,
      borderRight: i === arr.length - 1 ? 0 : `1px solid ${PW.line}`,
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      cursor: 'pointer'
    }
  }, label)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      color: PW.ink500,
      marginBottom: 6
    }
  }, "Vendor preference"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("select", {
    style: {
      width: '100%',
      padding: '8px 32px 8px 12px',
      fontFamily: PW.sans,
      fontSize: 13,
      color: PW.ink,
      background: PW.white,
      border: `1px solid ${PW.line2}`,
      borderRadius: 6,
      outline: 'none',
      appearance: 'none',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("option", null, "No preference \u2014 find lowest price"), /*#__PURE__*/React.createElement("option", null, "Stay with current vendor"), /*#__PURE__*/React.createElement("option", null, "Avoid Amazon"), /*#__PURE__*/React.createElement("option", null, "Lab-grade only")), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 10,
      top: '50%',
      transform: 'translateY(-50%)',
      color: PW.mute,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement(IconChevronDown, {
    size: 14
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      color: PW.ink500,
      marginBottom: 6
    }
  }, "Required by"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    defaultValue: "2026-05-30",
    style: {
      width: '100%',
      padding: '8px 12px',
      fontFamily: PW.sans,
      fontSize: 13,
      color: PW.ink,
      background: PW.white,
      border: `1px solid ${PW.line2}`,
      borderRadius: 6,
      outline: 'none',
      boxSizing: 'border-box'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      color: PW.ink500,
      marginBottom: 6
    }
  }, "Project code (optional)"), /*#__PURE__*/React.createElement("input", {
    placeholder: "HELIO-DMEM-2026",
    style: {
      width: '100%',
      padding: '8px 12px',
      fontFamily: PW.mono,
      fontSize: 12,
      color: PW.ink,
      background: PW.white,
      border: `1px solid ${PW.line2}`,
      borderRadius: 6,
      outline: 'none',
      boxSizing: 'border-box'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      color: PW.ink500,
      marginBottom: 6
    }
  }, "Notes for ProcureWide"), /*#__PURE__*/React.createElement("textarea", {
    placeholder: "Anything we should know \u2014 substitutions, cold-chain requirements, regulatory\u2026",
    style: {
      width: '100%',
      minHeight: 64,
      padding: '10px 12px',
      fontFamily: PW.sans,
      fontSize: 13,
      color: PW.ink,
      background: PW.white,
      border: `1px solid ${PW.line2}`,
      borderRadius: 6,
      outline: 'none',
      resize: 'vertical',
      boxSizing: 'border-box'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 24px',
      background: PW.paper,
      borderTop: `1px solid ${PW.line}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.mute
    }
  }, "You'll receive a price comparison within 24 hours."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      padding: '8px 14px',
      fontFamily: PW.sans,
      fontSize: 13,
      fontWeight: 600,
      background: 'transparent',
      color: PW.ink500,
      border: `1px solid ${PW.line2}`,
      borderRadius: 6,
      cursor: 'pointer'
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      padding: '8px 14px',
      fontFamily: PW.sans,
      fontSize: 13,
      fontWeight: 600,
      background: PW.green,
      color: '#fff',
      border: 0,
      borderRadius: 6,
      cursor: 'pointer'
    }
  }, "Submit request")))));
}
function lineInput() {
  return {
    width: '100%',
    padding: '8px 10px',
    fontFamily: PW.sans,
    fontSize: 13,
    color: PW.ink,
    background: PW.white,
    border: `1px solid transparent`,
    borderRadius: 4,
    outline: 'none',
    boxSizing: 'border-box'
  };
}
Object.assign(window, {
  RequestForm
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/RequestForm.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Sidebar.jsx
try { (() => {
// Sidebar — ProcureWide app nav. Salesforce object rail: slate square icons,
// blue active bar/background, grouped sections, account card at the base.

const SIDE_NAV = [{
  items: [{
    id: 'home',
    label: 'Home',
    icon: 'home'
  }]
}, {
  sec: 'Ordering',
  items: [{
    id: 'order',
    label: 'Order catalog',
    icon: 'order'
  }, {
    id: 'cart',
    label: 'Cart',
    icon: 'cart',
    cart: true
  }, {
    id: 'orders',
    label: 'Order history',
    icon: 'clock'
  }]
}, {
  sec: 'Operations',
  items: [{
    id: 'inventory',
    label: 'Inventory',
    icon: 'box'
  }, {
    id: 'discounts',
    label: 'Discounts & forecast',
    icon: 'tag'
  }, {
    id: 'documents',
    label: 'Documents & forms',
    icon: 'doc'
  }]
}];
function NavRow({
  item,
  active,
  count,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  const isActive = active === item.id;
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => onClick(item.id),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      width: '100%',
      padding: '6px 8px',
      background: isActive ? '#EAF1FB' : hover ? '#F2F1ED' : 'transparent',
      color: isActive ? PW.ink : PW.ink500,
      border: 0,
      borderRadius: 3,
      fontFamily: PW.sans,
      fontSize: 13,
      fontWeight: isActive ? 600 : 500,
      cursor: 'pointer',
      textAlign: 'left',
      position: 'relative'
    }
  }, isActive && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: -12,
      top: 5,
      bottom: 5,
      width: 3,
      background: SLDS_BLUE,
      borderRadius: '0 2px 2px 0'
    }
  }), /*#__PURE__*/React.createElement(ObjIcon, {
    name: item.icon,
    size: 20,
    color: isActive ? SLDS_BLUE : '#5A6A8E'
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      letterSpacing: '-0.005em'
    }
  }, item.label), item.cart && count > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 18,
      height: 18,
      padding: '0 5px',
      borderRadius: 9,
      background: SLDS_BLUE,
      color: '#fff',
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 700,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontVariantNumeric: 'tabular-nums'
    }
  }, count));
}
function NewOrderItem({
  icon,
  title,
  sub,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      width: '100%',
      padding: '10px 11px',
      background: hover ? '#F2F1ED' : PW.white,
      border: 0,
      borderBottom: `1px solid ${PW.line}`,
      cursor: 'pointer',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement(ObjIcon, {
    name: icon,
    size: 26,
    color: hover ? SLDS_BLUE : '#5A6A8E'
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: PW.sans,
      fontSize: 13,
      fontWeight: 700,
      color: PW.ink
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: PW.sans,
      fontSize: 11.5,
      color: PW.mute
    }
  }, sub)));
}
function Sidebar({
  view,
  onNavigate
}) {
  const s = useStore();
  const cartCount = s.cart.reduce((a, l) => a + l.qty, 0);
  const lowCount = lowStockRows().length;
  const [newOpen, setNewOpen] = React.useState(false);

  // Quarter savings booked so far (sum of guaranteed tiers across vendors)
  const savedQtr = Object.keys(SPEND_TIERS).reduce((a, k) => a + spendStatus(k).guaranteed, 0);
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 224,
      minHeight: '100vh',
      background: '#FAFAF7',
      borderRight: `1px solid ${PW.line}`,
      display: 'flex',
      flexDirection: 'column',
      padding: '14px 12px',
      position: 'sticky',
      top: 0,
      alignSelf: 'flex-start',
      maxHeight: '100vh',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      padding: '4px 8px 12px',
      borderBottom: `1px solid ${PW.line}`
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.PW_ASSETS && window.PW_ASSETS['procurewide-logo'] || '../../assets/brand/procurewide-logo.png',
    alt: "",
    style: {
      width: 22,
      height: 22,
      objectFit: 'contain'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 800,
      fontSize: 13,
      color: PW.ink,
      letterSpacing: '-0.01em'
    }
  }, "ProcureWide"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 9,
      color: PW.mute,
      padding: '2px 5px',
      background: '#F0F0EC',
      borderRadius: 3,
      letterSpacing: '0.02em'
    }
  }, s.account.quarter)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      margin: '12px 0 6px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setNewOpen(o => !o),
    style: {
      width: '100%',
      padding: '9px 12px',
      background: SLDS_BLUE,
      color: '#fff',
      border: 0,
      borderRadius: 3,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: PW.sans,
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 14,
    stroke: 2.4
  }), "New order", /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      transform: newOpen ? 'rotate(180deg)' : 'none',
      transition: 'transform 160ms ease'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron",
    size: 14,
    stroke: 2.4
  }))), newOpen && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onClick: () => setNewOpen(false),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 40
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      marginTop: 6,
      zIndex: 41,
      background: PW.white,
      border: `1px solid ${PW.line2}`,
      borderRadius: 6,
      boxShadow: '0 16px 40px -12px rgba(7,17,42,0.32)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 11px',
      background: '#F4F6F9',
      borderBottom: `1px solid ${PW.line}`,
      fontFamily: PW.sans,
      fontSize: 10,
      fontWeight: 700,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }
  }, "Start an order"), /*#__PURE__*/React.createElement(NewOrderItem, {
    icon: "order",
    title: "From catalog",
    sub: "Browse & compare items",
    onClick: () => {
      setNewOpen(false);
      onNavigate('order');
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: -1
    }
  }, /*#__PURE__*/React.createElement(NewOrderItem, {
    icon: "plus",
    title: "Custom item",
    sub: "Request something new\u2014we'll source it",
    onClick: () => {
      setNewOpen(false);
      CustomRequest.open();
    }
  }))))), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      marginTop: 8,
      flex: 1
    }
  }, SIDE_NAV.map((grp, gi) => /*#__PURE__*/React.createElement("div", {
    key: gi
  }, grp.sec && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 8px 4px',
      fontFamily: PW.sans,
      fontSize: 10,
      fontWeight: 700,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.08em'
    }
  }, grp.sec), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, grp.items.map(it => /*#__PURE__*/React.createElement(NavRow, {
    key: it.id,
    item: it,
    active: view,
    count: cartCount,
    onClick: onNavigate
  })))))), lowCount > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('inventory'),
    style: {
      margin: '4px 0 8px',
      padding: '9px 10px',
      textAlign: 'left',
      background: '#FBE3E2',
      border: `1px solid #F0C9C7`,
      borderRadius: 4,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "alert",
    size: 15,
    color: "#D6322D"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      color: '#8B1F1B'
    }
  }, lowCount, " item", lowCount > 1 ? 's' : '', " low on stock")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      padding: 10,
      background: PW.white,
      border: `1px solid ${PW.line}`,
      borderRadius: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 4,
      background: 'linear-gradient(135deg, #0E9560, #07112A)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 10,
      color: '#fff'
    }
  }, s.account.initials), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 12,
      color: PW.ink,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, s.account.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      color: PW.mute
    }
  }, s.account.plan, " plan"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9,
      paddingTop: 9,
      borderTop: `1px solid ${PW.line}`,
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      color: PW.mute
    }
  }, "Guaranteed savings"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 13,
      fontWeight: 600,
      color: '#0A7048'
    }
  }, money0(savedQtr)))));
}
Object.assign(window, {
  Sidebar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/assets.js
try { (() => {
// Auto-generated data-URI asset map so the app is fully self-contained
// (works in the bundled standalone HTML — no external image requests).
window.PW_ASSETS = {
  "procurewide-logo": "data:image/png;base64,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",
  "thermo-fisher.png": "data:image/png;base64,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aAYAAAAAAAAAAAAAAAAAAMIINAMAAAAAAAAAAAAAAAAAAGEEmgEAAAAAAAAAAAAAAAAAgDACzQAAAAAAAAAAAAAAAAAAQBiBZgAAAAAAAAAAAAAAAAAAIIxAMwAAAAAAAAAAAAAAAAAAEEagGQAAAAAAAAAAAAAAAAAACCPQDAAAAAAAAAAAAAAAAAAAhBFoBgAAAAAAAAAAAAAAAAAAwgg0AwAAAAAAAAAAAAAAAAAAYQSaAQAAAAAAAAAAAAAAAACAMALNAAAAAAAAAAAAAAAAAABAGIFmAAAAAAAAAAAAAAAAAAAgjEAzAAAAAAAAAAAAAAAAAAAQRqAZAAAAAAAAAAAAAAAAAAAII9AMAAAAAAAAAAAAAAAAAACEEWgGAAAAAAAAAAAAAAAAAADCCDQDAAAAAAAAAAAAAAAAAABhBJoBAAAAAAAAAAAAAAAAAIAwAs0AAAAAAAAAAAAAAAAAAEAYgWYAAAAAAAAAAAAAAAAAACCMQDMAAAAAAAAAAAAAAAAAABBGoBkAAAAAAAAAAAAAAAAAAAgj0AwAAAAAAAAAAAAAAAAAAIQRaAYAAAAAAAAAAAAAAAAAAMIINAMAAAAAAAAAAAAAAAAAAGEEmgEAAAAAAAAAAAAAAAAAgDACzQAAAAAAAAAAAAAAAAAAQBiBZgAAAAAAAAAAAAAAAAAAIIxAMwAAAAAAAAAAAAAAAAAAEEagGQAAAAAAAAAAAAAAAAAACCPQDAAAAAAAAAAAAAAAAAAAhBFoBgAAAAAAAAAAAAAAAAAAwgg0AwAAAAAAAAAAAAAAAAAAYQSaAQAAAAAAAAAAAAAAAACAMALNAAAAAAAAAAAAAAAAAABAGIFmAAAAAAAAAAAAAAAAAAAgjEAzAAAAAAAAAAAAAAAAAAAQRqAZAAAAAAAAAAAAAAAAAAAII9AMAAAAAAAAAAAAAAAAAACEEWgGAAAAAAAAAAAAAAAAAADCCDQDAAAAAAAAAAAAAAAAAABhBJoBAAAAAAAAAAAAAAAAAIAwAs0AAAAAAAAAAAAAAAAAAEAYgWYAAAAAAAAAAAAAAAAAACCMQDMAAAAAAAAAAAAAAAAAABBGoBkAAAAAAAAAAAAAAAAAAAgj0AwAAAAAAAAAAAAAAAAAAIQRaAYAAAAAAAAAAAAAAAAAAMIINAMAAAAAAAAAAAAAAAAAAGEEmgEAAAAA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",
  "fisher-scientific.png": "data:image/png;base64,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",
  "biorad.png": "data:image/png;base64,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",
  "cell-signaling.png": "data:image/png;base64,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CIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIg+gKM/T89PHqJEsgQxwAAAABJRU5ErkJggg==",
  "Abcam.png": "data:image/png;base64,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",
  "agilent.png": "data:image/png;base64,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",
  "genscript.avif": "data:image/avif;base64,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",
  "takara.webp": "data:image/webp;base64,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",
  "stemcell.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAS8AAADtCAYAAADuifPTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEcmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDIzLTAzLTAyPC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPjgwZmY1NDgwLTQ2ODgtNDhiZi1iZjhiLTcyNWFiNWFjZWY2NDwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5TVEVNQ0VMTF8zMDN4MjM3IC0gMTwvcmRmOmxpPgogICA8L3JkZjpBbHQ+CiAgPC9kYzp0aXRsZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6cGRmPSdodHRwOi8vbnMuYWRvYmUuY29tL3BkZi8xLjMvJz4KICA8cGRmOkF1dGhvcj5Db21tcyBUZWFtPC9wZGY6QXV0aG9yPgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczp4bXA9J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8nPgogIDx4bXA6Q3JlYXRvclRvb2w+Q2FudmE8L3htcDpDcmVhdG9yVG9vbD4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSdyJz8+Oin4LwAAIABJREFUeJzsvXmcXkWV///+1L3P1mv2hLDvEAiLgLKIbLIvQiAJq4KOy+DM6OioMzo64zjj9nXH5ccw7qIsQgANgkAEAUFAliA7IUAIIVt3p9dnubfO7497n04HknQnoDJjvfO6r+5+8tyqulV1T1Wdc+oUBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoHAnwKN/OP42bOZGe3GGuvjRb+cWA7JMNPLvvl6wZAJw/DO09/aQjFNsdRzw49//JcuXCAQ+BMSj/yjIy7zO38nFVUYF3fKmxeAZH+Z0o0FGQIig4ldXd5LOBf9pUsVCAT+xMTr/mlERDgcBkZ2/a/B1Lxel9PEQCDwGrKO8Kr5lOmaTmqehiWzhY4FGmRCTKxdPNoYPhsp+DblPkbcO5b7AAome6ZRKn/NYUNYEF6BwP911hFeTqJudTIVl44Ee1dTpwQggVkuPQQM68IMy+WVRsiWdSRQPpVDIMsTGyHfmpKp+cdaNVue6XB2GpHYOhLyCef9/ycY0iuFZyAQ+D/GOsLLzJCEDAzrR8JkS8z4vmBb4EygZHAvZlcDx2G8BVHH7OdgTxtcAGwDWgn2I4NWxFmgTrCFeH5q4jDMjgWlYL8Guwt0lsEegh7DfmimFHQB2HjgSeCnGHsZdlJe7luAm4G5wBuAbshl6GZYF4488khmznkPX3vvXI4/5VTiSpmCHPIpmCM14aKUHoltZ51EaXUfj1x3HXfccMPm137gdcP555/PY088SZqmTJowgahYJoojFEfECANSCXzK8qTOB6+ex71XXMF1//VfPLVw4V+6+H+VrPOWzzrzbGQGEoZ9CdOHwb4ZF+O/T6uN6eZ0E7CTYe8oRNFlSZoeC7oe9IRP/QmlUunZRlL7KuiDwHeX3bL43Xet6rFZc/e9VXCYx94Xx4WL03r9DTh3L7AqNY6sRNEjdZ++T9J3zOzmQ4+YffQ/vm8Ws+ae9QvgJOAjkYu/lCbJrnL80mB7M3+Yiwp3mk/fAfoB8vel+KMFPcJp3mWXjTrzOuaEEzhg/6O4+zfX0LLFdAomyTnFxQJbuFb/7MBKrD4E9RILH4zZ96gycVJ3CWCGpZZYvWU8laFeSFPAUFRw0p9m2tecTnozG9fSZo2kQb9E5BwMDQg5vZop53D6Ht/84JorfgbAaXPOHk7Xydz69AL5/Ng01G8mQamFyDxXXnnlJpfl5LPPpq+QzeTHVU2uOWEfkW/2u+HT1BcKBRC8tGQJt99++6jpz549m8FCgZ5dJjDliVWQGOaQcHLOUa6U7NLvfc/eevrJdKgIqbGkvcKOaYTz3tXM8D41zFu1O+bUf92W67++GGKPz1cKhShyygXf5jD8rIZNmiF7an7KuO3EvCsv422nzWbNyj4KRUf7pE5JwwucbM0j+WYK8y772Sble+SRRzJp2nTkjOrAIFGx5JorqqauJk1LXkpxLmXe5T/dYFoHHXEEW03fEpNRrVYpuIJyG1vzIW3V44tt4m7bSUjevI/iAj3dVTo6ChIIM9/8+tVXXj58qxtD1e1YHRyYZGIGMElQlDHzpe41ZdDMPI2Jctq9v9Y3AbRT/qC7TDly251Onb3XPsDUfBm4R9/KvjJy+0hyQJuDN3T39LeB7ZXnu8VtN1+++6lnzN1VsHVeYXvW0to4Is00MV4QSdp7sLamDOyxtonH2DrAcae8jSee/COXXPpFxm21DeUokiWpAV6SLwGJzOGTiNS7xS8N4ORw4AFvYMdNO5pGYwgPyCwT/Pn/A16v4TUyXcMsShvIPDhly/lsbb3Zea+b/isFYPaZmlPbdfJh3csa5clMPvU4kmpCb29p7I0ygloUsecKz4zltaaSYIN5CsPMMG/EcbyxZAE45vjjufLKK1ly311M/ONyaERSXFCaesPMS87HccHMjLpPnTMfgbllaRXnorwPmAczF5XVvmWDW767mFK7H365cyHymrQHmK0qDjG+vzyslvEe6n2iMTQss9a9p2m02gzjVa1Ww7mIyBUyN6lXtrGHiOzaOFapZP3UPDg3XFYb8WytLjMQGvgkTZEck3ccj2VvtI/McLxyPbX+ls5eQpcruY6N49KDiArGBACc/mlSR/t5wCQAYVMQPytFpX5gei73Do3kbkfEoIm5KHxfy/jKacD4PKcWie+0dlQ+C0wzDEl7uMjdlj/lZGWVf25MdDRm7UB7/rZ+sVJo+xgwbdQaHMHxxx9Ppb2dgWovW06bxNZbz1AjqySTc52Y37NWre3xpGo7FV1hKq3jS7TQmDWn0u8b1WV1eA7jWeCZCy96z5Jjzz53RL1RAPYEOoB0PfX9ajGyNltsLnoOs5HW1W2A7Xi1kz7DAw8DvS9PKdd+dgIzWf+zOWAlKj8anX8h7he3UXp6500uwulnnMEaORwpX7/hNk6be/QewGQgWU++qcHjEl0gGo3GBtM97rjjaJ+yBfW0wXEnnkBr+3ht176VLep+wZTV5TiknX2a7NDX07vD6WeePX1SsbPDQxFI35iof4jqS4YtdsbTkp5xLlomNWdXzQHfAPKBlVZeXZs4YHnZucd75GkOBcIy/yBnAmasrR9zQF3wkMFQU1+8KShXbhsG5otkfbodSMEi0BpMD44lLavVsv4pwHwrctuD4iwtYmDAJ8mTGNuCtTunRd77oZ0u3IY//vsj22C0gx7Lhd06rF94Nefj2R8DYPfKNNWwgyz7vxXAncAbkXawrIKeAJYCb7VMyNSB+4EWsEPMiIEu4A7Q3hi757k9B/wROFJokpklBg8I86CjzKwA9AJ3AzsCe+f5vZCnfxgwfSwVCdA+fjxpWuOC06/i6l9fKPOJVQf7W0rlynmK3ZnAvpI6m5M5IXDZyN40Npjod7Bk1tyzvj+U1r9SUuSrhcgEEyL4OnAgMMhGZ7abjkEq6HDoU/XU/ivxuMJgYk6yVO5c4JNk9b45QtMQETDgsFOBu0COvNM4mSMbMfcGriXrO76Zl2Uzhoqhe6O057Tl5525Mi470p2ehkc3rSCqV2mPYz3fGdtpZ711C+d1MdgbWbdODYhAvVL0Tm+6AXAdHR2v6OQAp8+di2+bSK06iFLPhGnbqT7Qaz2qgrO98Ta76OK3ALsCU5QPClpnUm9IoGwZ0QMsTtPqfD/kvgp0GY5IyBEZ2DShb5MJ+gab0SbDdSpdNvXZKe94frsXmKw2AKJCxMRpBZyLiohPA7MMeoSKwArv/fHK3slN1iRMnDiRJE1R6ikUChMMfQfYx2BAqBX4vcV9R2Q6640/VntrK/isDLGiXYT7DI5tBQVgCPTQmqlbvLPFuY8LmxNb/I5CHF13778tbG+NCv8N7FTH9hX0vTyvDbxcInetB+znB21z0Glm6TuBpzESpP8otJTPMuOf83ZdlJq928WdszAuyxO5yuo6yxq104B78xnUl1pcfJb59P154l3e7D0d7Z1zMb6YjxJ31dPGbGvU5grdliVlF7nO0ung30sm7LyHfywW47OBz68t9MaZPXs21dQYf/lVXH79e5SYt3qa7FouV34q6VuSDjepU5luNpGUIlJMqaRUKEFKJFWA3YG9timOS3GRMuOGhGgBFZDabYzXWL4Lake0g5xQKY0KmItQ2hyTVBYqm9ShTch7bfq0k3XMNkEk1nVOVn45iAWdJrVJ6miWH6kTqQh6oxxvK6hE5ApuMO3n6DPOGK1phjnj7ecjOYSTJJznIGQHIhUQnSPy60BqzX5SkBySW+/M65TZsyl0TiVq1HBJTZU1fUhmSdqY2d2z4iInux7xCeBQSVOydlciswSRmvL2lxKhRFkf6AT2Bc4xY6KtnXplRq9M8LcDlbysm9ge+XNmwqiyQ9941rTUsLxNXGSU2o1ii4FoBSlvg1agHTO3uZ6axWIR7xOStAHZoNWGVER05j/bTIlQOqoD+9KFCymUSlYuV/D15Alv6flmXALyHt7lU/5l5+0mesEU0Dik8/qWDUStcXws4hBggjlXyGZv666B1y+8RnpVQemp3kdJvcVAESk2o0XeI6yUOTBQFLi4VANlM1tBS+qqZooioJhXYrmKB7lynngkKDUG+kG05OvzYsFFzijIsHJWXlXUDyYXIwpIEpSShgCaaY3aTOWODh68/Gd0n32uXCwjre/s5H6C9DZJDrNEZqmZRWYWmxGZWWSyyGh+ZjFNRzLT4yvSARp4Z4BlCoIC2SzZNV/4DV6GF2Zm5pUnusErSzPK2ySSZVqCES5t+YzDvJl52SjpvTL9ZkrF4ZZfT5fIdROpYGS5m3qaBKyAOHF1b73w3KqqL7WU+VFt4mhNM4wqrSTlCkbN+8ZQCXQKRmRYKuSV2SsMszQrmKXQVI+8on9z1FHnMbEtxqpdpNUBJY2afe/T32Wwt/vdzrlfIP5OYrokLymxfGlkZrGJ2MwiZf1hRPsTW6YbBbQS1G/rVNlwV0ybP/M22ZT2QGvfz9i7BrIom/XlWTRVScP5NOtkbb6bNQfPvA6G69LWpk+ad4I001fQ1IltkNbWVrw36rU6E7ffYTCK4lWYfxbR24h4zMXRsr6BQchmpw8Au5YmFQ7BdBLGk6BFDsVuPbq7DSwbLXc6EGCnrepZc3sURROAbbLKtX+tV+tvQ9ott6xt7aTL6gPVVWRuCwAnxHHpFrLp4cx88voh7/1RTtqBLPFOpO8N+fQ5YO989Nrfyd1MAQPtk3fKv03T2kGCLZCmY4bgIm+NfwD2GuvwsmxVFwecdRZydfMpZYg+DeyPMv2UZYYAYbYUeAjsCaCbTF/YSeYusr2ZdgOrgC2VBzCLssptYDxlWDswxIaXjQZMRUzAZBLOsrXw80D/Ru7zYG1gL6WZcsq0dpAZbl0hZUocXgJ6GFsXtjzfIbLlGSMl48sSkEFeVbl+lHzGkX12UFuJmR2l+H4T7uAJK/wRc+bwmyuuGLUQg92raZETVrTUsRtwYv5MLs9LQtjwW7zhZ3vTm97EtrtE1KsiTRpychbHrvXcL3/gnyX3TxJlcuNLtiK0OF9jLSNbZTxr2FKhQUHBMl3tdma2LbCToYpkNZT2ZYVwL3+Zh8so5Ew2hPEC69fdrQ8DlQyeW6wOOqwP1Lm+7728LjZDZI1ITMosL2sTemX6eccbLaN6FCE8l1/6I8446xwnyWczdFzkqUQdrUPW1wtGhUwN1CH0GaDV4BphJwPrfcU3oLDPmjBvyCJZo3UiNfV/LcAEoC2zygoz6yBrlHy2ZAWMDqBMZlmETHk5zrAOrU2rI79acz1hlOdlgnhtfhpHNh1ulrIjm2bSqqatbZSa3K5SZrXhLHHewXHArLzsyttBZvZTjC8Orl7+cMfkrXxDjVzvBb7hiOSnemw/YH8z/6AsApwvuzpmdNd99AFMFdajYKQ54TJfd7H7d+ACrVVceoyP+9QWSGpj5Oi5Ls6w1W3jxtPXs9rWJ+dMSEbNzL7qUy6TVGKEJnnDeCF5ebes+cHGvz8s8J4na8NxZuYRU2V6a2dLy/0ObOfeBk9EyShJwemnz8VMpHHekCnHgk3Ky+GAKvCcwa4awwu64577Uq8PMlRryPshG2xExdZC8QvA+3OtSJpL4Ch3aXgY+BGwgLoeL44vDdYH6hB5zIQ1jPa9D2HNw3duFcHeyC4ww199+RX9exy0Pztsub3FLl5fubLyG0+Y8V68LQcVxlC/mEyp0v7y2y+k74xPMv6oWaPW4+uJhQsXsnDhQla/9CLtE6fStI0BMZL5WqM59pbMrBe4Q9L3wW7E8zsizRlW272sZtc/wueLorynz6vX00PNNBezJdnH+g9XbRwA9pF8ubTEjLPrdX8wcDlmmDHfzI7D7GjMHsxnUP/PfP1gzN6TP8UaDxdgtTcLvpSPrPel2LHe++PM7Hf5bPGbjXpykJk/H3iRbKR8f61uB2P2WZqDwCivZpd5WLm7dy2rhOlYoASkoOaSb16jUftbueih6Ye81Q8LtdyalHqPwXKHrp9W7PyPriUvLpzS3sanP/lJS1KP5FIyo8XTwDMvvwSLkjR5urVYet7IrGNNZXC+VHjeRVrmPU+t7/78elpYd5Im1Id6kdugTcCEvRhH0RJv/mlg0UbSzC8tAhaTCYnRaW6sgN8Af8z+lOUK7ZOXD/R29A30W2ccs7Uf3YWhZhHmPL5Rs7RRbwE7Nptnyed9YyFwWz4n2Ghr77XXXjxz990M9TsG3SKbd9k1tMbFDwPvz76h3MPFHNBtZp8zbydHPv2SN+53aNBDNu7KhjMbfOE5zOwF59z8Rr369sQnH/vUt/6bR+66j9pA34YLlM1UhlKvpww9B7bePvLyS7BIYvkLL3UzoQyb4/rweiBJKmQOXlk9YKxQ6j1JA7wDbBXQ75PGL8AWGlxupucx65L5VBiydU2nG+j5NizsgJWVcqnb4Z8FBkGpmb2QlgsNcM+TTdGGvPyzLS30YqzMc1j52B9ufXbJU08/DfTkab2guDTk8c8YlgBVS+0ZV2gZMFiS57zm4QcfXzz4zHPPAmuy4trSUqXY77MyVAHvxXPloqqYLR2rTtLMySY+iu+bNBXYe8R+JydoYPbdUqHcK4i7/vgHGtYwl2BKPGp4inG2bEG4gbRKtVrz5h0nnX403kSSpbXBf17mKqVyNK7cCi9zksmnRQUJoph4Y+kg4QxcFG90LmVQKEaOQhxnypKx/GsuCXKl3Gg1StYdlwO/Hl5iZL/MLLn48ASHR5pSiTj66KM3mNKxxx5Lo5GQedoWiVy8L7CPRqYI14JeysapjZdtr333p33H6RA1VEl34rS5Z56I+BcASc0ZjwNWmHHhuCnjPw56zpxzAmexUesdwGhAQ+ZSQzH4niW4bGkROZ8OluNo8dI/3MeHzryQUmE0AW1yspJHIEVjao9MB6A9rJsVHR1jWKi9Punu7gUzjxlp4u8G/y++OtRfTFPSgsPDZ735H3Ym6Wrzdm5Sb8wrmj2P8aE0TXpT77Fk3cXIhmu7uU3RmJP6pEXSdImdLVNE/xvGYcgOJOvmO0bS95JEz6NhHcXsGfsf0Q60Cw7P0/oc3h8aObcfUMCYGkf6iU/S+4GjEcg4eJ99dv85mRL48Hxo/0efpjMiRTsB2wNy8HUzuxfprcMlHgPKMmkFpmW+PcO7JVcavJiagSX+mquv4sijj2bBTTcN33vU6aezsqPdFqaDdnI1YdKWUxloDHHYwcfyh9//jkcffXSj5Th+9mxrjSuqJo1XfG+tGhYk/NVX/GzU55l15pmjfcVSM2LnfOLrds1meLqPEZ96+1Xk3IfBOoUSMh3haZMOia9b84RZdXlC5/RtNpjA1JmH0rvoYeKO2IrjjMHn/dHABIzEZDGwwlK7RY5jWatIXi+zZ88mjmPaK+NkCZZ6Pz6K9CGgXVKm38xmXCtN9rcdLS1XD67oRZFU9/hqrYGc2Gn6FL71rW+tk/bxp7yNX113rZlZOmv2XEDaqt6wT194OKd84+pRqkmY4TNLjvy8K346ZlvgtVdknuWPPPnzsd7yukIqUS6Xcx1pssqUrkqThME0pcU7qvDHuFBgjRxF9LArV2gMNnCOPxTTzKrpX1ZbGxBeYoS2diJwqmVWvea2kJ0Rk8idTYUiMw4B9hWMy95Ea3XYQd70SGL6durd0hQNgVKMe52sFMtPcfI7RtibEdNyG0HFjGPI8qlIeDOmAaeR6doyNQW2D7CtYAICG0M3kKw5Yrtc5zBSK9kClJDHuUgf+PiHSN042trauG7ePABuueqq4bR+MXp2f00Ul/YsfXCbCVvdgDSXfI+smR264s7GrkhPKJYGkc2ePfsV24UOP/xwnrz8M0w/+HQlvd4a3X47RZo9vETKTJx3L6+teWBaZdzbRitMv0Rj1Wqi1oqcnCmxE4DDLbPsSsNmNPtsyaKrNVRXPfa0drRae6XM0ueWce3VV3LjetL+1XXXctDs2RxywQWovZXGsmV29Q03sOVPvs/S/fZjmx13edWV+X+ROK5mekOgOUZb5Iwo81dV5gtGuRxZWvUCM3PK1gGSNVU366S5/qwMhM9Xjzcn5v/ewR4O9x2DyRhfSbCvxtL5wGcM6xL+72PS+xuK35f6qHd5vf26u1fv+Oxhkx+tfne3S6Mdt6g7JmIIRwr0YYMr4b8WH+o/++Rc7TnhqS22La8+quTSGRHJz5DS1KLvYrYbcKn59N9x0aG5bmwC8DEzuxz0EeDvRixzN4w1DanUcawx2ErNNYgYh+nY1vGVu5c/+1j6Is71rnnER/FLzJ4zh+6BAca3tGzWPr2/AuLdJm+fDKWN+ZidYZmzqxfsiPTmUrH4ROo9Q92rWVMpvuLmRuM4pr1pCi6KAMObHSw0w8wMEZN5jF87c+KW9ZWDA6M6/iaklCsF+TT1pnQc8HaEk2WvSK7fvMH75Htynn4iKpWKpalx8/w7efLJ+zea/l3r6QNLgaV/+EMQXhvgnntuw7kaZob3nilTpthxxxzDsU8/zZm1GlMHBqz3hSWc1dnJVXFsQ08tZr899+TZNLUXJk6hmKa01+vrpLmxmRcAZjwcuejxJG2slLQc1Gmy2wtyL3hvdzuBzB66r3uref+0w21DB3Qu++AbO5Z2AvvUPGfWjN29sXVXl7awLlrJrJde0C9s1Ue3v33pJ3a4/cmK+KPENX/Tc8I3j689xaJkOveu3uIWQ7thPFQoxE83Ul8HrQI6DFsg557H+ztBf8cYrE/ezHyaYGJ1wRWfRNoDG46lAbJ/GOiqPr3N+J0v7fKp7xg/zSWNCZaY2fjSeAYmO04/fS5XXXX5aFm9bhDNWanjtNlnbeBbWahvyXCFKoawpMC8Mbg2DCeAwxK7lViPYewpkRpyyE6pDg38EOeSSqXErPscv37ZzVN3+wNpj5g2cw/rcLvy+P1XnpRrF1OynRlP1r2fv93EcawcHBi1MCUTEREIUkv3EHpL1p2NTONAA+N/ioVKb2Lmbr/tN/6txxzDnTffxHPPPTfWZ94M8qfK368NtYdh2SDrIE09pbZ2hGPNsuf49a9fXnv/e7j77rvX+Xv+/Pmv+M5dI36/54EHNpreRjSMuQeXmGXer45dvD2wC1AU+ghmM5xsNy/3+Sd7J/73L/a5uDytZfCwWP6k7oSDDXZQpvfIUsPWK128Qc2gCjXB819qu/7BtFW/ODRddNvnnvzEJ988YfFjZZe8JUntU8o2gm8HxDJ9BrNbkOZm6Y+u82rUq7S0djrJ9TcatQXCTrPcZ8MyG9kExEXdPtnF+fR/HMUlZkYUOTVcQml53QqtFWafcw5rVq583Xck5dp0i01xHI1qqTJz9ujyAfY9/lzinieZPPk3rFy5cixZWSUuoFJhSf9g/wLBntnyDMx0oAqF/UT8e2Sat3/dWLT2xtmzZ/PAd19gn7O300sPP2RLGw/MkHMHauQywZg/sVhe/i933KRZ287YaDubGbEr4PKdSyk6mGyfoSHl7nQ8iPnfJrUaONn2u+/GsoH+P7HgypFIE6NQltbvVdH8HrhEqOTMulZj8kzcYw94nfe5Pycb8LA38qEYYFtJ/wm8S6iYz1EOBjt4RbX1a1d/+Kcff/Dgb+61ZWv/TyP5eSbeD+wr0YnwEqkyJ1CP8l3z2eeezBculUhd5pm/s8HsSPajYuyve+Gwz7z9F2/5yaW/6936A5jGOTgZKCqzuR6P+BJwwAifsY1ywDvOJU0bliZVSJOrgftkuGzrB5B5WY8HPmUuuq7eqF5o5qf4pnNKqcXV6ujKSy/l/J3mcMqZZzF79uxX3wp/IgyS1Bmp8x5yhd9G/pkZTuCHevD1GjaWSs2JXcRgfx/y/joyi3CUuSPYFIw5reUS5ahArZ5y2uw5w/fVcGx32lbEJhXlwLmjyIwyqTJP9l7DfrXG15k5ectRl4ySkIe0lFrDNRDsm0lxDe/DBLtXilbiIrlINqG1jQV/FnWAzFKrF8oiKshvtC18pqAzsywag4vwL1s2/bWzsWVjs+f+AeNT5tgFs8/LGPLGF+Yt2uerNvefd+m6nssEJytTtIPhRwSVEiOXczZiepT/IjUjyWSrlTxnSexd93yttoqznjno/32+tJKPnLD0vFtb48bnvDED+DLY1aB/sCwg4ajc97MrKRVlNJyiuPBiKvt3zL6HMQVIhZxhPneh2Edy34ginYfZT8y4lkgveBmnzzlbl7443yqlMi4qsvdhh/HQbbeNudL/TMTgjk+876ROYRSThpHthHhpUosuT569J0nqKdXq2Ny9IBN8A+kgLYWW+4FbyZyAU7IB8og1A4NbSCwrFkqqkw4r7pOkQUexrJrJK2W84IQ8TQ+KwO5LG+kD1UadZ3q7/c4t6/UwH6bRaBC5mGighb7+/mK5ky3y7mgyIkTdTA/EMcQ4aklKa+mVerjXmOZScYu4wPvN25qkZpmCb8OYh4Kl6e1xa9s9Qup78cWxjyZ/BWw4qgTNjdncokjXJ6m/r+A4qprGP5jfe8BVvad84N1dQ3xGYiqQeyvjyP3Qmka8vLZt3VVAM4vJm2pXAAAgAElEQVQsDNZw02bbcJoCzJPtbn3ToOfKwYn89/X7/vifD5z3t6duXem+yGNXStHvvfdbCOYyBifViS0VfnjjoZz8xnnWMn4rVRzz+wfWvFPSN4AdRozQLgvmZhHoQMMOdNK7LG18O0m5LEL9He3tGhocNFcoMmPrbWl/85u54447NrshXkOazmsFZGdLOnvst9ojreXytWbWL2DvvffmzjvvHNOdiaV0VsbFOHU3avUrkY4j225lZjbTyR8UxYWrDVO9q9tob+eDH/0oixY9gxPN6cYbhA7LdAAWk+2Aur5YKvd2trZp4I+3GdO222g5oijCO5S6hsVtbgLZTgwyFYjAqJrxdMNbtqnYiyt//iefdWX7qMR2wGfG6quVG5c+Le/vARTHcRBeI9iwk+raZeOxPrW3F50/bFWj/PFfHvyTm7sO/sA3G/Adiaky0myDMS7fotPcbmemzI0q27tHZEaEEcmITERmOCmPX5EHHmu6geafY9myMgYu7Hpe8+8+6DuV3/Zsf27kbDtvdq6kd68t9Mb54Q9/yJzDbqZ93HiSWretWdNHobV9fmp2KujHZjaQb8BVvlDMNjlLXmhfSReXIl1hskNULFjbjN1IyfZETdp2+1fbFq8Zedgek/AyS2XmR7mS3B81cU3HXTMKhcKY8zQD82ZJPcGw28CezH2pUiCWdEr/UI8bGBjwLR0dDDUcX/viFynGJXzkLSpGgE40UcndaQQ8lXp/pSyhJXLGxjzYcxLviWUU5XGkFbKw5SNpmNnqyMB5qG5wF9Zri5FtOJVpLG2SyqwZHmO4gK/nEwj/EqxHeGnEL4bQ3s7Zf/bUW5beetQPFnf1cjHwficiZcLG5e6szRhmqXIvdAxnRoLxNNkWkqsNfmbiShk3IhZi9JnIY6DglLlo2IiCRHnwBC/s0K46V7x02Oe2vnfNVrdE+HcAx0pjUddnDESOKCpQKJZo6SiQDg4pVvRw34qhC/CcC8wHaiZzhrl85iCTeWU66OPldMVQ3+BZpWU9jKsbtSQhtYi3nXb6q2iK144sDpXJkDMpMuFM2shFnNd2CYT32WgylqikI4nkvC87Fca1LRI0YzE33aqOLsctu7aWyhTk1BIbbz3hxCxOho8ZHKxOBY7MZ+2mrPvdUikXnx8qOKZV2qA+uqCxOM5izaaGZZbFl5spDGepd8KcEKPvuXwtyAZzk8nG0iaRiebIETdTsCC91mE9vdPWLtwQyPfUUveBmw77wQNdK3SJZHNzx1Egn/Fng4In01VFlpmiHxDcZJ47zPG896wqGH0DBRoViPC0WOZBPZ0sLtKxBgcB43MhmG0ty3peM7R+irFrV0M/WXzoV2bNvOPv3r1b26r5BjNo7hgZKfbWw/yf/pQZM2Yw8w37E0cxg0mflQqtunjG1ek/dZ97jdUatyiKjgHOJgus2AHNFa6BlAqmg13U3buy1lqOr25TpNWD/VZfseq1apdXg5ENSilmC7N9dLhRKsYs2+f5lNWTpFBweDN6eno2KWMnB9Uavppg2HWgc82spCzo03Tn3Ntw7jHvPcVIWKkIKXIyK0bxkUK75dOLyLA6cH2tkVIAd+aM/fynx1CGOEnwUa489b4O7uUBvqLI1JIbYqnYn+mAYiFM3Qb3ANWNm36bfh1WMvRodvSzmXw4THkk6z09KCPTeRl805XHz+vu4fOSnaOmS2dzx1mm4/K5vguD3wOXAFd46LMIXCYGcQa1CMqexIka0C3HIjNuLw7y7XqFtyDeC5wihsOVoOahRtkyM3XYjK46lzx80jdPPmnBuR8tR+lVZNEoRjjwbphHH32URx99lDnnv5OpjS255M6LTIfHIJwj6jOnqwae67umZeu2YyXeJzjOsIJyPZhlU/mJyH22L0keds4/1VoqSJ3tdvrpp3PVCE/8vyB1zH+jtVj4QVcfrqsv9Y0NTjKEkVJMpnH3774+bGV8eWysUclHshTDxF3OuE9wCGsjZxyfNurf8onvc3GsQhxb15JHfHnc5LjSPulYEyUZdRNF4AEvfw8eDNlux7wtixM7ahmEvM9i15nvJQvxM5IiMD3KHy3RqAbM14JmVIwnfMo7KkWWd/XhVq/ZcFQJkyNKetl16e78arsvUitgv7nJuJb/PT6Gf2rWaTkBkc8c5DArC+747Yotv/zTXb51nsEH8/lYFmuBYZW+t0xwrUb8qzlOLBT57kBCX9pcPuZLyySCjiQ3oK+1RDoTerGPxMUsGBzgHIy3Ix5grUDMVGFNAZaZ0Q/tXsHXfjnnJ7/ypm9LxGuj741ten3FD77Hov5HeNfJH6Vr4Bkaqwe9OSTJnecuTFWMr6duc7zxNxiPm5kzw2d2BFJgVyf3TheBK8fW0tpGtJEY6n9uBFZvwPTxsW9vjZg8no1cjgmT1rAjQB0eumL0E3jWR928lV2sNldcaeKKPL5+M9bhG+SiA0utZQrFSM7FbsI2M6i0T9wLODqb7CvKDUU3Fs2tjBUpxYzu1WMug/dGv3e0TtpiDbB6eFDOfmk1aeawT4IcxxxzzGY962Zig3WY0GF+o+0xzpg0qUJ111XMHH8I+7Yfwk8OvujPWc7XPesIL5MYKBaI6glOtmYgKXxh5alfbq15fcqJUq48d2T7mbMFpnAynjPjfEr8l6+yOm3gijGUwUo9+FbwcYSN+3eY+CkY/ymoD2F992IDK/CRYeMnA6Atv0CimCtdylyM30g0u92we3JuN8LgPJ7ixKcHJn5dxmOxd2XnozzExthYsGAB373ki7Sok8qEcTR6BiypDvlrt/oZeHPFFUk1ityPwC4gCxeTWUTXTktOSutpZ2MoyXbcutfP1N7yzai91UStlYRKmfVfpexnqVxn5+NO5n0f+BBfufHSzcvTe+qWaMjqOPO3ymyJmUW5cqlN6Jj6jB1olGMfy5nLRpvDs6U4qWER8JyZ/dxchOQwbxCPzXgQRRGpGW3yVLtXYcZT+X9lFuQsSugBvep1V4671HApHdO34uSTT96s5910MsN7rSGN1h7lUoTvqDKhtA2TituwZNo9f6Yy/u9g3WVjkhJVE5yrx4mVfv37wW3vWdPDfwjbidxnpxmIIXdlcBiLvPE3rsit8QBKYxgawk/rgLtegH0nQ+nfXpnx1Dzy/NAn4H8cvC+Gp3+Lpf8GroyzCk9R5WyD7yBOFbmeLZNajszZNepu8In5My8+9cJFc3/UGlcbNV+AMavv13LdddcB2Zl1208+gKUvPkpt1Qo/bpsdVAAVXHx31SefE/omUMytkJjZNJzbJ5Zuk6Ra4XVlzjYjOwkdS5l3xWWj3vBqkUQj8f66n1/BISce/8epbePuJj/CToCJU9wDT14Uxe75rcZ32lMvvFQsVConmEBrPeDv+Njx73z4wAuOYfY73mG2CTr1LEJ0FoNLkTNS7iPzwF073hj7tTTa9pzVdfZCKXaJeZ/ELa91VWwAWbMYGzvvMDA66wivwWUv8evHd+HO8670Bx/ec1vfQvZLjDNzBXqzzmVrdVxdZnygGHFrIlSNsdRDvQL9FdirBs+8C+zfYPW/QhSvDR0ZC6qCoQjOSqCvH6a8CfxqSFfi471wJl4yzwedY2tgP4RX5hfWDLNtBm9qK9XP+sXbf/zVG29sdcd+Y4AjDt/8zbELFiyABQs4dvZspm23C7693Rr9PSTykDR+Tlz8ezObOexVJtpk2gZyE8eGgwP+VWBAFDlOn3uOsnmYXSs4neygLgN2UuSOjqPou892DxC3VN5MZrCBbFbrMa79wq9+wKwzz1XS22ca46wLMuE50NdPPK6VPIDdvUhLgS3JZszezLZyMKuj0rGw1hiy7t5edpjUzilnncV1P9u0A1oDfznWedN+fedJvPh33+fgKT32zO0xiec8wVaW6ZiyEHV5KMT81f1qoYP5SpFVMcpQiGHyMvDPQeslMONA6PkMxBXkIxQ7FEcoMVTwqN4F/QWojYfCEojaoWHQNpApOX3Mcw4+amJZPuOypsKM3AdGYnbPH5i4/8Qh3/Vp6eI3rHjVFXPjlVfSP9DD8hUv4cxsoozuVcu7gWWZ8i3/ohFhVvIYXh6XbKKS+/8gXXicGTKPN7sVeCSzRKvpcX/a4NBQyRUB42RggqRGrs9cKPxdjhR8wkBPzyibA17JPoeeSNpoWPfDjzKw5NlFZnZV0wt6eMuT9N7ewTUHJj6xjnLFbb/VLlw3dD+nzRr7SUeBvyzrLhu/+hG6e1F3A+tsT7ZFHGWZ1FL+05p6Loy7zXPxi5fD5BOIJHw8lJ0/MDQVk4euTwCtyCXZffCy9ZxBy1RUrGGpoLErtK4A2w/6e8AZ3oMGellQ6eDHgo+SBRFdW/5MVrzBjDeq4H8lQ1unfRvs7Wec+zeYh4H+PuKiePap+9l+152J1MY1l69ryWnbZgfiZc/grcyQTWD8hEYElBkRxBBIkKqZkUPY62rV+JfhMTwdSWJTt+ykMKV16fI/Lr/asJla6x5wQBQXdksH60sUuSOHb8w62C2FtsoLPknUGKhby9SpNNJNcyRd+exDXHPVz5l99jlOUtqopz/HOA9pPLnTsZlNA31ycLBxTkux0HPXo49Ep7BH+surKxxx8pvZevwb+NGPvrHe9Ge/50J8w9PTt4ZxeNJ6P3LCNhbnIPCas05t93bTFAcWZSf+7N70GFznCL9MEl3iKqycdAIIkubuC2/w6NMwcxdECRLDCv2U6q28ycGBHqZgDERiYWrc5mJWDXoo5cbknu3BVkKxAHRBYSKUx4H3/MTDGWZso3UP8TSgJDhk/BP8qm8vfG3C+jv7l7/8ZX5712+R80yZ1MFQFc3Y80AbTGr09PWyy2GHMqnSihoNdtlxJ1qmTOKxJUuYUMINWbdXXNwd2GH41JzsXRzMY/tnAfg2wVjw5yBzd/JY4jnllNEPb1AkqjVPFDks9fzq+nmbnOee5jjyM1/n9v/8sNPqQY+4gSx2/CRJqZlNQRyhSIuAmcqiRBaAZWZ2TVKrgYlG3WhxCQ02bTb7w0u+TY89wDvO+Jx/7ndL2elN0+70peLPzezdZAowl/sFnlAqxRc10sY/uEKpu9TRobedWadenW6PPPZbAA49/EimTZ5ItVplIIl4abDOysXPMm78OMbHooEol6aQpiCXkCQbU9AN25wwP8b2kKiTcP011yCJQ448kjsXLBhzXZiZTjll1qgjqoB6mrCqdwWRy4weG/yikc1mnMbYrwzJkeJ46He/Y8XKVRx8xFv4zW9uGuW+jbOO8PIRyGVBCDEOwMh8miw/VNyGrX1VwZFWY5yDFQYrBN1At0TX1tPpxmEk4Dx711v5BHAcor3pK+mNmhwL6318YXyNq1saWE8bUWEw8zE0B61d0D0eq9bAOR5rLXAB2TL25UdHOeCF1dOJ1EXKBgx+tVoNl4cOt9zzDzmOKk7hrs6Cm9A+LvsM6OnpY03vY5rUUia11K9ZtcK1T5j690JbkUXIaC6dX6qSPlxGYLLVev3s/BdIqUElUqHSmp8kOQoNo9KamnnQxkK2bIQFV1zBLjvsBWnqUz+EiwoPQPFuw07KI4Ig0zlAbybx8ZbV5z33L+n93VHWT99W02xRXOHxK3/EiSOiUIyVkw77KHesuolTD5uj1MmT2leFDhbsgZTKzFm2Me1cF8VtlqafULH4KHK0TyizfcuebtvtdweywxbiljbGmdHZUVEcx7QWEz8wFAGeNE1JveG0QbetYSQpHUoojisq7iiN/iDeaEniYWPGO9/9/rEKL1nqceWC4rbyGBrSqFjMNltsZRf/z7c5fe7cDa/WBXJO1156OWec/3YXtZdHX254o5ymnHr2LCsWC6zuXpPtuXkVrDvPFaTtUH4MGluwP4DyqJj5bKvpolo24xzBOfmddUSXZWccdne00O1TXsTTgzhFYtc84sTayBFZCJwDgB/WS3RU2/m+q5E2UlA5Uyn17YKVB2FKBVhI0rM3v4XcV2HdYpMKntkGXB0mbWCV8ctf/pIttttJZtia/vqOzrmd07T/7t6SevKlRLY/yfJdBobFxSJdA73t7ROn/Yvg/OEsjTxSDjdPKLmuoaKhPvGRimWFfB1gqJFWIqgUvEtHebHyQcXkiVyUbZd4FcaHp++7ndbOcRSK7UKqpWl6veBEM4szjaHtZ7kZ0Jo6VLPr9tt+ou/TBFWHavb4vHPITiLbdO747U2cdtbpVFe3WevkAbkijyU1/snETzCbKClVNigbxqkSeydDQ99o1OzSzvGTVtaqPX64XprVk2t7naBhJerWmOq87eqTvvskDfrUQbQx44IsbaTV0oQyUaXgbbQ2IXtlsgizGaVyeaxVUItaihTaKhvzTl6bj2VuJgLe+86/ZWX/RvzqDD91+60ac955PnGx4G0MOknDwHss33q2KeGWNsTLPOxhUQPe2A7d2d60qRg7AZ3S8IzRK9u6w7CzKhQNpgHTNCKtphtq5tiZH/ZrIzZuZxFVWxGfVZ2pJm6N4FGgt7nTpzYZdfehaCa29gXL8sjL0/zDntoaakPwluXrf9hJk6ZgPhFgccQ+YBe7uLDkoXToVox7JC227AimIUTBzCYN1Wv7dhRK5wGHKDt/Mou2hCLJXjSzH9WSmChBq+oDtlpjGE3/xOQbs2PQiUm1PpFqPWZs7iMCGoNeVyFepLZuFW8KN998IyecOSfboGeGOW6Q5xnBjpnAkJpnn+QbuJ8287c7n+ARfY//jl1OiXjyus3JPafeQlxJaFRlp5w3kVuuHbxhaLD6McEXzZhAdgp3HpRJ2xv25UJZb+9avXq+md3tpKVm9JCpKWKgVTChUU+2aTSS/SM4HueW+0I8R2hwI1t+mm/P9Likf/DV+hpfrY8WEqdJNEjtsS+ffd78bc6Yw37RxuKH0jRutDi5d1stWVqv9RXGkI8BhSF4cTBpzEMalHOvjNOSTf8Apq1+6sUPA2n6yrnE+tMXhcTr8WdXLr4RTz1qefXvyTo1EcewfQ/o/8HQl/l83xouicXeOA414xhlR1G1mIblks8GTPwIBVSmum4eo5U7FOQaImvemwu3iEwQThN8zqArLvAQKXc4caOv82DawQCZzR1fQXECRYcN1bLM5TJh5gzO/hnQCtW29T9sR3vEQIrI4vBMACZKmoixTy4Qu4VeQgyBFUDThE1u9snct8tyL/C6N/6jrMr9Q7UqKsu23m5bzl/64mY1xGZJiPXflMsuCgZn4bSh2M/ruxXMEjl7kOx8zGHhtTnlWxo32KqOzV+xDKrJ4lnbbncd4h+bhc/UhsPa1BvaGu1PpQUYTPrs0A9dwmf+5oS1zynb5ELErkqaz4Su/XEXO+7QRs+y6Ls99XS5ZF8Bds7T94g0b9d9BfsieYNlOLoEDaEY0QZMxmn48GNBEqFK84+Xn3CTo2xjCtsifXqTVHiZqmaej6bMn8hjaP0nZq/9umQy2kz2sc0443FhWigsAAYjkCxd92kyXzkz2JosEOgmIadfukrlt5jqit1w39pc1hFeUQSxg1oV/DcAYzUxC6JWFiQ9XETEHoijBW82Yw/BFOVSLBdCRmZSam7ryQqttS+BmrqqbJO85VuLmqdRTgCOyK/3uwKPltZwE+K3Bo8QsZIUykVoRChtIJ9iUSMz9PRPhr5joPXF4VXQOvQPlIlavQnDJ0zJv1E35PIyjjcYv/Y+w1CqbHYgpCgfeVYZfHrh5X0X7zHbKJRjorKj0TcAo0XkXFuwZvWkWRWRsomN+bIoA801SCqsuZHd1h4CNWpqlltyh4bTGnHriF8NaPbq5p5FG/6fEUyuF7j74QeZs+8bnZPz1Ub9Fw69S6LdmqFejBix2oz5g61VzMwNrar6uy77yrqZ+0KztzZz8TRD7ozId+RypHlYymlnzMUDixf3cfjBE1hwb88v49QWIz5mZrOQWnNHRp8LLZTNKLY02HJtc6mZSUrm9lH8/9t78zC7qjLR+/eutfc+Q81VqcwJQ0hAZokMMogo9iCiAgaIovTXjt301dZu+/OifqBtf+rl3r5qo5cGW21BGYKKAioIGmZBAYEwDyEhIXOlxnPqnL3Xeu8f+5yqCiR1Kuj3x/2e9XuejE+dddbaw7ve9Y6qGiO2vIc717wnftJjv1elITyQKFpLSHC43Ry3dPJ7FN+sPfGavkd0PO/sKhNaiOy6Dtfo6QN7V6DHq5Ao1LVxgvxTsIvwqlbB1WFlEf7982AauRs+RYEBMdyF467IUM6UwxBOQHkHcJwKpQk5lu9kNAJKGyauXWn+55QzZNNZqeQvcy9wosKJAqNiWUOV3zrlpo2D3N3TRy1rKHDajpBCZT/U/QxGDES/Bt6y63eqjBMX+rTQ3sHIlo1tAIom0jz8km+RTNw3EckTsZsLc8DPvdf/Nm9O792Dx20nMmVEPD5Tfvj9b097sZtf03iucuOFSKEh2e0r70crRAWdNEs1jCESTWi3k8uayWjNH+1gShmWJlOetwhI8rVI0xhT1Eaj2qlf16PKjrRCLa1rPa0TGfN7ExceUTgJyd0BmgfRPDaaVVb3ZuBt0Y/1J9x97ZTzogoUhyAv51VoXMi4scgO8npvuX1oN3Y6b0F9fjr89b0D2NiIMfJ4mo590Eblq1D9a+A0VdobJi0mWjjkvnVtrCwfPF93MwezTaHUWPtUbcIAbY2rGDXD6me8lzRoiIjyGJ4EmUyWF2l8hRGg3LgmSVPg7K18EAClHZnUhfMSxzKxDkTi1zx2/meZKQ/aH8suL0vfF+A6hfO/CJWPgZmNumfQ9oNBbMMykE+ignC/K3O/DPM9LAcJvBU4SeFQEeahE8KpcTqYiC6Y2KUbsZ5K7r2DXIBJQ3r4iY0O2gWOE+U4hA+0dfBkrcbtAncCjxOxmZS8dnkKEoMMv3qx3tXINNZ5R53L8M2XfAOxDwt6ouaNPeaD9pJf4Ig8F69C7oTYjPKIoj/39do9ptQ+sm2kQs/CHqxYDJbhba0L5Wk1gZ4xKHnYFD8IegswRi64HGjTWjfD50PwSZq/W45HUL0JJZvysMyY5vMK1BC2TjzOkz/R/PsWkB+j2pgzbSgP0jMEVYMOTpZUXrVqFSeddhq1tK695W6x1o6M1SvfRnVYoOmWjRWubjNt404tqdS5uzC669zqEUOHvQtSReW9fxDVm8jtUAaoKLqhsQuq201M2E8b8XtnrViJeI9UnWrRSppqGsXcWsvqd8cmOkzEvFnhGGBfcptYJ0oBJAI8aEr+TAwDW4EXQG4xLnsmv3om90Lnl20EzM0K+0qe4LRXh7jJPZ1E4O6bRx/m6PalbKvvBMAbSz3uRFRdUve/acxtrKEx7u29V/KSSE+qc1UAYyJN4hJVn1WscrOqHgDUXss6yEVBwSN3eZ+kqmD+BPrXLsJr0w/g7DOBIowcCdQQff2UH9D8E6nPbVgmQzEMiHCvF+5N6hTqMYeiHAv8hSinqNAu4BqOPMgFujZeDW1kWFttrLAhHHNj/uTyHEwIwV7gBMlLrdQMPEaF+4Gfx0OsZh6VQgTRI69erIjhwFPP50vvfQPv+YXdjJFVKrKqOlYtFIrFhQbmItqOaoSaFBgFtqlLXyp1d4/XhkcpJAVSMG6s4iMLqp5qXfnFL25oebHnv24rT992sq5/ejHLz7r5O2jhOxM7pXpsZvCimJmq5MMp0XuOxm8Zxj344jWU7B+dvOjVkdXy7cPIZDywkUQ9ilF5zEX+LBEzxVlS47Yr3sniA9frgafeATdNjndXo73V+Rf8nUYijGytfF/i6PvN7kACRFmdrBjTW+7k1KWHseneW5iagrxw8Va6eJrHnhG++P+ce6WzyZXN+pPihC4j7NgxiBrVT37yk9x22227XZsho24MxYLQ3lNQ5x2AscZUbBzdr6m5f9lBwuNP1fsj0bkKPSAlgdgrXkRrIoyiDHjvNhaKhYqrZTiiXOtTYdy2qxqDx2xpS0c/LknzId87mhqOAOJS7vnJrWw49FaOOuQMAGY7w6HbShBX09W9yZdUdt+da+bfpRi11LrmEKdKtnmdxo8/QunEE3fWvHziNQ49uQ5VEjI2dW5EY6FntOO1DjnBLsJLxoB7gANBj8i1ple+RqJ5+s4TF6CHfh0kmpTE4qkpPEjCg6R8F2WlKN/Q3KM4Efc2pfCpbdyhhyUPdO1T6Aa6Jc+Fm9xCdOJzfsphvCDwBlXeAJyO8OfdBZ4CZCR9tWT3Xhl65j6+8h/V3DoH5Mqf1IDnged3ZysDk3dwAXEibHpqjZ/T1ws9fVx/3czrK3XNG2bdw4fzEqezPLkJMjtxQVQd4iJE8nz3maAVR7zyzWS/fgJ3/7o8efSP2dBEUKdkzoNR7JR5iMRIMxc/ysh7YzS+K1LWV96PPnwjx7z/1b3E//y0d7B5zRoyVdrnzkOtzY932rgJmbD2kd+ztaOLLVs38sBPdg2M7enNtdq5C8AacDaikawGamiLYjaP1PDG8fa3v/1V39+kaQNbsWIF27dUue3hzSxf1ONnzSk2Vg89XbFCfRvItl2u5W4kgzXg8ldk4gdTKeOiGKeGtno116nNXlqIpiAI0qgIvX0UvNbya+INBw/GFAtV7pgVo9b9keZvMBqRtvdga4qvPYuuXUty8puomYZX7LV+gQjilYiMStsQWoKO+h+fjbDLLdn+KUiPAKmC3UCnKF27mbEAaTFmm6niMoVqJyQ+rwmeCcZYxHjczjHoKvNB4GJg4aS9c8L+U1Plcu/4F4nwxrNAoV/yph5zEOajLCAvl7JAYb5AUadUxNVGjXtVnhXlRIStCCJb0O5vTk76/A9+kEyEDWvX0tfbh1GHl4jcQ6SIsXk0SP4oypTHTVHVLMuwhYS/O/M9/Hz1b3hi3VraS6WJ8XO1UPFqqbqI/v1qxEnKc7/tYfXq7wFw6qnns/B1Q5TbMzY914GYphW3acXMjYU37LuMdzy3hr9uFjkAACAASURBVFji3Dqe5Y1WjcT8dMqLfdZ73wv1rKG+2IbFsLGPNiIAmiErE+d2YCKlncn/b9bwnig21Ngzf3RtrsydufK9COC8Q3Sy7reiqBfSekbqxli032LEGa741rcm5vmuc86h7CNUoC6+4Q6dzLD3IrjxFKdVkkIHiFKr1zClEiJCbafllp9fiQBnnLMSK5NF5VSUzDuSYgEQ3OgopcZaqklCRZVyWxtWhOu/851dHuTly5dz8OGHY+KI7Zu2kLSVyOqCjUTMZC8G8jurgDZOCnnXBVVQayn6MWKbUvHtNOv/C4q3EWjjPsiupp7mNZ9qgJ9M2mDCtpXbWgzPb7+HMw77Mms2/5zrr7mK01euZKic93bsHfc04hInHttd7us0TGSKaF7fzHg3cUTKUKqpoy3J2142vXGtxssvkUy86M3r6FXQaoI6MEXHDT++avrBWrDLVAa/kPebIr8UpwFfY9LTMPEZhVSUjzu4HYPp24Tfsn+j4K5AvAXoQUaH0MhDoZvDgbNFWA50K9REeEqUG+qOX0tCvWjBZbkbyyhgYdhBT0pbBgWJOFSF7wBLGnGkTbuqau7d/G5a4aMCqS2AH4D+S/MJX3zJJTx0128R9XT29FCp10TNKysjO5xrpmAafjpNuZLTTz+dwqw5oEpWrWBMNHmLxGHF68j2BF+P6F86zA8uv37am7DPEUew/KDD0LjAcGWEbmtF4ggxBvUZzgl2pJLH+ZUL/PhH01c+OOOc9024dCLrpbO9TcUIL63bwNy5c6mM1cSbSH3mUPX0LJrL9772tT2Od/755zM0VgGUJIrxiIg1Wih2MuoHqewcpaPUKdYmOjI8Ruo9By5dyDf/5/+cdp4nnXQq85ctAmB4xzClUiJGBaMGFSXVTNuLRUYHhij293LNK4TPbtd+9rlkCoISixUbG5VKFVSpHL2cGz/72ZZjNDnlL/+SJfstZb+ly/jdfXcRmUhEG2WmHfgs1UKhgPOeF555hoceeqjlmCtWrGBclZcrg3RHCV3lLhFERESNeLw34Jw2zf/XXzf9vf7wx97B2k392MjTWarifCw9xx2n0foN7BwZ4rp/v2zaz5913l/xYqGHwuw+5r3wZP5eNBA87Z1t6sfHyRAKPT3TPidvf/vbKXf3YNSRphkmSsTkTQrweNbf9Yju/7634TZsY9UP//hyQLucT7oeI9c98ldxI0I3wjIVlk35cynCwQgf6d6EiWL8znmwMwJbAVcD7cyPnB1d+ckotjwaxXyu+yL+0o7ylsIob6XOxzD8sr+LemQQ7yYOAoZc2bYJyPgsxiRhQIX9RdiPV2wojecUUW63baS2DVNQSKYcqbfs2IGxgrVC6jJolBcQVKUZ7quoND0GLdRjaWonjT+b44j6XBFRsAVPVHK4dPoj4IoVKzjxsNdjVImzOvOLSaP4oqp3rlGEUVVMlDu5ZmQ/2WX+6r3HO48xJg+Yazoic1WTrEX114ndecLbghprqI4NIx3NNMFcFRERjDG4aXP88nXPWzwLX6vhqlUWzO7MvwryWhSoehzVuhMTJYw+u5UVf/3XLVee20wn7D/aXKgK+L1I8D7r7HM54vAjGR0b4bGHfid1V2uMJxP3xHbMxlmDt4YlR7y+ZQPi5R/5SK69aJ2omNHbNqvZtdSrah58jqqKacy59b32Pq8GOsUCqTXvSL2faDQxHeqVapphBncADc+q+sazrFpPs/xR98rA6Oi0Y3XMXtCw/guuup3ckusb/XPR8usWcdaXPvRHH2+b7HrwXNR4cjJwljWR4VfASsnNXE23eK6aCKcNz+fMgnC9s5iOjXlD30InlLthfDi3CfTMAs3ygpi1vwPXSxVLbgoHqYyj3XPQLS9CVIdE0KwL2p4Gtx+mvgO1wv5i+XtyDcuLTDyfrmEbe0bhtyZXfjTrgO5/mlzWYw88wPzZ81A8lcrYnCiJTxbVEnlnZyQPM6iL53Zgq7QwUBhjkHpuezDqZ4t3JytaEhBVwSEPFTvdY0YclZHpK6t6iuAN3gvrOjdy8PhCdfiFeHe8KPspjKnq6v0G+9bce/AG5gy0thWI9w0ZJ/N8yuu2bxm4B6TWPauX4ZGRok2Kb/RZ/fE4jrcCPNVCY9i0aRMds+eAQJpl80X12KxSvb3u3HD3NkvmSdS7Y2r1sWfL7eUtRuDpJ56Ydsx6FFE0+fGio9OSSISqHoxykqLt6nWNoneI6riKEHeWGF8/1Hrt6klyAV30kRxf8/p0Ukg2CvDSo4+2/DwAK1aQjQ5SHRvFeydJnKhxPnaRP0WQw9QxhugdWig/GdVH0VpeGTNrkbqzbPt2MnHUxwdY2rmMOpl677uN6htUZIl68Qb/pFF5AKjP5C3ftqWNrrY6qoqr2QPVutlX/f7Ou5abErPrrdOPamPD+N/fzfOVEWa/7a3LxXMQYAW1HnYODw3dXi6XR4wqG59+usVoeYccjGHMxlGH9yeKsByhDrq6Z+7sx67+4CVoi41tpuyiFlQ095eaGBMZMoGfCIypEDfMJrlmlG+1bQifr1bZLwVf6sFEQ/nna1XYUYOkAG0GhqtovQrjfYDPY8mIQDO0fEw+i0fXgRSgOj93TFcOQAqCnxURi+XzwBH5p3PFSGUXE+It2s7zFBBJmex416C7vx/nM3HeY+OoD+RUhb/QPKr/KwpvU/hzgd6myWG6ixZFEZmKZF5A7HIP/0uR0z3yJuAtouzrncdlfsJ+sCdEDUNjw7T1FDmYgxiupW8XwzUinIcwS4SjRczxTxTGTfsTc3EzCRQyYhpq1dEYvmqLSbctGJQSauI+lC+LlSPFO8Q7Ey9YMO1w1WoVK8ZEYjEqRxsxPzY2uqC3cxajzuGjqAvks2LtkeoyXJZJsbd32jHVQq2a0nfihxhdcAKbto9+QFS+q3CMIotEzP8bS/KNyni1s5SUKHSWuPHl1lUI1BhxUYSLbDfIl63KGyXXzE3PDHM19fnneWCwyvaBAere6eDw4Ky4UL5M4EJgnggnCeZaBl9+/1wpsdglVEdGGq3ipxkXRY2l2LFExnyd1KcnGOy1iPmMIEcY0RMReb+q9uYHAuTNb37ztGPaosd7Y1QNGM4UzEUHD9ft4kIbxRkUcZRCQs/yI6kefYwgfELhMwpv8sipIMcm1pZsPYU0o2POnGnHqo8OEsUR4pWu0qy/NWL+G7BYlNcblTfZLMKaecifqOnJLtt429fghU9BXy8+KsDQID8rJfxKlHeT25lM4yietzqDw63lG6R8VAu8HB2ASVN8ZGFuAut6YOntML9F0PnQ3XDUc1ApQWEraAkjZfzWbdBT4jMC72/ET0izDqDklQisKOu98h9mlFwzKED/fbuOf9O113LmX52vTi3DL617Ku7u/C+3/u4ntTOPX3kVQHdx9nlbBjeUZDAd18xAkk675U0YQ5vXUFjn1X/69bb84p0769ETayL38ksLgW3I8bsJONtlsJS4GMvo8JiKjr1RDF9F/RVDWfXy/s7Z43fdc6Mcueyk5PT3Dfuu9oSVZ8+afjzgFcY8BfVehMxnuV32lefKGRh1m9HGgFHVF0DOGRsbuiOKy/d6V2men/MlvfILdrdsp0Qmlh23X64ePckgn1Xln0t98VU65Kg6f7ARrikWkgujNj5jveH0g/6CG5+4ruXKdzsBEcS31kQA2LSJ447bD9vbRblaYyzz/xU4zHs9J06StX3778/Wp5/+exEu3jA2/BTK7wpihHT652aoVKK95iXOalq3HGSRr6lyq9PsX3/67dKOd79vS0Sxsz0br4w27p/OmT9/+vU2ekNP+q9Qca6l6WMSIbaGwU1rlZ7DY4Efl+vFi9aYYdtei/Vdd77kVy/rZ7Bc54We6fMRoyRBnMen9YKNkver6qWx2P/cirPd45Jc98VDOeyvVrPfvLYZzm16XiUCL/3X3G5VqyJJTE3hWwpDCrbhFJPms9xI0H4HwuWMs0gV7xIkzTA1ge7N8NQRMHAxbLu4aY9o3JaLYcsX4EcfBm6BpAylDEkSjCreD5D0lvgXgc9pIwdywmEzxfGhcIVt55FG1IGOPQpy065rEiDz+a/Lb7/Np364dubx7wMhQ8iGqluZ09c7Xr1jQDEWMdMfzVR3EQ4AGgnZH6jxFvODbMlR8/TrPML/4Bl6/+y4acfyeCQxKpEB4UPAumhOxzc6pDTu6nUTFyMVK7VKtUC1FjN7zvi0402ueMrkBOkgpksSZNLpNfF0y0wy/CdfkAR4CPT3xpoL3fh44htBmLtEFrQY06qgqtrIKVupyqNLj3rdVduf3oEDa419AuX7IKcND1fnj4xWiaPWNX1kl5Xt+reZxlu98ZhjMXEkbusOhoaGFwPHA/8mlrVes2jrs89QNf5SYL0g5xo1eeuqFmsuZA6JIogsFvkwys7vXPvDz0Ym2nH2x+rYtt5Momiw2N6RReU24rb2ltUXdiek9takJADphD3QDRUz6kcucz39Rd/TvYZiaSOFdnh5JjY0UYZHBp0qVeAoU83iXmOcKZrqB776EMcf1c99T73AwoUL93KWr+ZVwutT/wjbRoEMvewiaH+K20T59pTNvNETj4Y2jgKnYbkaz1tdwzaqMVIwyFyfd7BJHFQvgvrnYfgzsL0OZYFTF+bloetp7lE24I2yRBIuVfgMQkKz2UcuN7TpbVTlPoUrdAQij7QlMOeEVy/y9UcdRZKmFNNx/vHss+lK5ouIbeoKRsQwNDpqOt6zgLjHEHVMr26/wv2coSzyar5qnF72YPvKr/cXXjz8rpXd/HblQk5ac/e0Yzn1bNq0lWWL9gFYDDzuto9hYmNrY8P+8GVvxFjhk397A//XeY9y4EHTDveq4UH2iyT+9rjINYO14WuiyF4OzIEpraL3NohSKKv331JYZJP4Q5LVx4FdYwFaHZc9RM6Q5Zf6AIUn1z76LF1zum3mJgqWPAK0Y6QfI+heN5LcVYrP9MNln4K1grEYY/YDVEV/b8WimXdGMG0SZQIvAvsgBtW45YHeeEXbupQ89OAAhCc+tPJ9+HpClsqRwHlG9V0uTRdE1mIjy3il0mKFr/7Wvb1IqVO6Fy0Vctv2GZHPLj1ozYvfiyq1T9166l+yacPRdLX3sKIwveY1XhuH1Eh3x+xMVS8Bjq8X5WacO7/uqu3jYyOMjIwy+Pz9bNiwYS9n+WpepWIs/O+w7Qt5ZcGPfgEZXIYWPF9xlkPJ7ULNaPmmY04RvMAJKlwTZVzmPd/PyjwbjTNR8SErYLxH1IKJIbZox4X44S82vPoWbEp3FnEGyj+IcAhMhAGZZmiQ5NH2lnwj+IwXtiAIMTpWhdHdlK9/6KGHJtzYZ557LkJZ0YmHQhVFRFRiw0+u3+umnoY8xee3qrpVRVSEHb6hokYt7CxqBOlq45Bh4ZlmWzXNJYGJE0wcYbzntLe+AxMJs/pqezM3AQaBX4IOoIgi/QL7sJuNa4YoSGmwun1NT9ucb4J+NC61PwSM5/rwDAcxkBYcUT1BJbMiaKYOaCYqelyeuOf/FH3uFegyEe86+xwg34BuuHb3CQkFuqbEwRkDiDrvnXcgBh81R8zNJ8YqJva4Fi07FZBKgpca5DmD4tVhI4OK7i/IOxQ5QaL484L5niAicfwn8s3tGSMwWKsB7UaEtaq6WpU2FTbOGuji2nffx7tffh1pdc9a/8KDD2Y0yxirDOqC+bOoebmxNlx5xEZ8AJGLEpsc2jFrv0+vf3YD55x33p9m3rv7z1maJ5xVIhSD1C3bgU+r8qiS16vXZiBRw/OneW2uWcDnxHBzPM6/OvgzgYUYiip4csGT/xI8X8UIzEY42ir/NxE3C/w7cAiNVmdTBReCU8EqDKvwaQd3xuNIbR5617shtbBo+tCiV6rhu/5jho/JK37MImw34q42xlxrRa5T2GgxRBKT7rkpMpB33F1Q7uSng+sANgBHLpl7MOoyRyTiTISK4qUMtojzexWZbEC31131SgPXWBtdXaunVwJDTL33M11446cB11HqLj331NgVwPMG8wmaT0Lj6rQaUVEiX262U38KOOql29aIdeqITR4aAscJsoNMX8LRTJpvOblX/FMBIkUzA6PROMNaoxrvueJt0bg8ZiGPHHgOMGLMSUmhRFKMDd77WlovA0sF1uRnjaYVZRokwvtNotkoKM8BR2wcHTM2UeZGhR9n9fQjwOPkR/NJr9TeMeUGzOy+WiPw4pO5CqH8TrHXR9b+ZyTmtsHa7Xxg7f5EGLr1l3sco3rssfRHyuyeAtsqI7hqBW9kfWTsl9TrhcCbBra9uG/v3AiHyIknnrjXC3sluxVecjH0e1j8Oeh3qFWMKo8JfBh4QjUXYLn7hGYCtlFpHOnyOkmfFOEm4OdeucKmfNEoHzfK3+C5QFMuHKzzrQx+hHA78BURjlchbh4LpxjnUck1LlEqwD+NKj8criLSjdoIjr0RZl/UesETkeQ5duIaKLQKkZgY45UvuxIrps04j0pqfr3lGq5afAr/dvh5/Oy66QNUVR2a5qJdVb8HHPjsy4//VzIteUW3DQ/ZtFYr93Z30tnVPqNSw1PNWUBiTdw2mo5ge+djrWkHYqacLlp6yXyzQo5AIw5PxdglB5VVlf8OHCLIESi1iWFbCERXqeJsmqcxe70GOGLhWw7+qO1oJ5W61tPx5cDZqnptUkp2FoqxZNn0BvHmghtTEMCCiihUCp5lEvGegYNZWdifE7Yu3uMYjz6wEJepxklMlMQvKXKvIJ+q12sHRbF1dz53jxRs/I9Al6q7hkjwVqmPTp+cH/mUFCETQdV/F5i9oK39q+OVsZ7NWQ2Jbax5YYBGfE0jA2MaXrEZN+6NINbM2BzgBZg7u/n5ojpL1WBSVxf/F4/Rv3SMj835MVfeuGeBPxzH1JxSqWW4Whp51UVmfMxk6hGRdqAuYqoGk4cr7N2GuVv2uI0XDey8OE/5UcVjEJ/xgER8ELgUWN7w7EypVdSQATJRXygGDiNv5jGZwZB/buL5npIJ0RxmwjTfrOIm+a6wDbiwuoxvL14DA51oVoBkHLp3k4i9O1QVay3eCyijNLw1+Us0s5udGYPVfFNXGAPpVpWvZ4ZRvLS9dfbKWz+w/jf/i/XCGSvO4Ser9nwUlUKR8dq43nT/Km7/p1t+c+ld3/2siPwXTezxkfLy3FKpG/RXO1/a9B1GnC8cMBNPzcQ66sCgKq4QlUiHtiB5tYwhlNSb/CdLLYJUo44O1DVbG0hN0KEIdakbY3b7rAcGK9UrET4oQm3CKdPixemd1cdIparnzY+54GeP33XcUYd8XkQ+Uh8dOV4woxg5BPRHJq1f2kWZIZNqZqotV96sRYWKRxgQlY9n8E5bk7Z1ZM+v7Vx7idTZRveenaJd80apF5XCeIbxCqJfEWPasfZblbF0zZuWnNiPMluVfyp0dj8jAmNbtmmxZYlmg9bHtdw9B6P66Hh1+B9E5NNRUroK2GBUOoAuVDY6AUSJdPrTfSNFq5EHRgVluFCvaToyms+91YzUE1WrLI1LAgwovNPYbInJiDHx6PjdH7x0XdT78GWcIae96xy9eQ/jvHnrVpJSZz6ftD5LMP9sy+UI1RrIwSBXlgrlLS7NUDI9+eSTueeee1rObzr2KLzkYtCLyctIeogzVHJP4G/FcJYq/0OEs8g1Lo9Opixqo0GtyoTansdkaSPMIreUNYWWTKT6MCWfLBeEnjwcAuBRlE93lLi1O4JtScNqUIfaFuiZabaBKqNlQzIuSKbfFC/iY4MYvA7NLHhu69atLNl/qaoqQ8ODD0dR8rdAKZ+2xOCfzysMGlqddEQ95bY2Vpx8Ptc+/xtMYn6YVd2vTWROBu0XGFbP3cvfd47f+OwjbHqqtZQWtKGe6e9VzYW+aoZEBInHKUZ2IPN8zqh/1nsDqJ/fIvJ8uFpljoj3Xsm8vy8xvFRUP9a96XFGDziZtJZ9yyb2TrL6s7ZQABHNhqcPEXGNnL2rNmYcddhSVKL/xKV3iZGTEU0Q+U7frLm/37xuHdvMKEUpszA6EtjT69MYt56qz7ModkbF8ueNsICmRgIDuHQs785t93hjliwZYENcoh2ouQwHW27s/+iHz9j87ycb0UMV7nVZ+utCUtjavrSL7fevy+Ob7PQC2zck+8jwJvbvP5KXKyO/qGt2Zyxygogs8jCK1y88k1WeefyRdt5yiNdlnZumH7NWw7YnCorW05+qmLsfvvV2z+vfxOx501ddBSh4z6kv3ETHCHrjgpWXIvJLcrkgIHWnbEqwiIoO+D3bvPrqdapFocOtJxtasFm73dcQOQYQr3y9Y17fo7/6+r9x7DvPoj2J6e/vbzm3VkxrQJGLQS+DrRvzC68ZPoowYlinNc4nYjXwCVEOaGx4viGkpmjvuXBqCqXGMTCv2dV8fCa1tlwhyz9oGtrWToUrUb5hLc8PjCGlJ9FCEaoKvTsh+fLMF2wLBbo3byBtL0CUrFEP3o7jTUaSzJ7RGPu/7nUMb9sOCOX29oF6Vv9FU0YZFXCGdh9hjDDQwi6ejQxT6JuFCgzt2AyCRHFhs/r0WjEGQy7kv3TBX3HKKaczf35fy/kJE3mb24zotqSriDGe0ZrSHpma2ux+UUUjQA3SQngd+ba3MfLQ43iBOIq2eMOWSOCJpStYWN9ArIUxY+X+ts4OBgYG8VnG8uOO41e33LLHMZ949FH2WXpg7quJYyJB1JgX1OgLKgYjwuMPPMj8fRcRJwWMxmwee7zl2rs7e2hzMd6a+o505wN+yuZhEWIpNbw+e95UVq1axTtWnEP/AQewaf16NHOc8ruv0rdv9x2K3GFViIwQCbLl/nUaRRGCsmPr9ILG4EEM1kas3/4YRhKJ4mQM1VsFsE4hthy570IOOePP0N/dzvjA9FkF7Z2dDNczRCBJ4rVay9Z+4ch38UwHjEczsI+q8mj1aHxfEaw+jpHHm5dGVCkVErKRAVRg2aHHct9Nu2+FpwBxkW3RKZTrT2Oi+A+i+gf1irXKMw++wCkrz0FsQq2W8slPfrL13FrQ0uMkH4PZC3ItpzYOta48yt0VGQMuVXinwhWqbJPcNmYatiqviiOvbz8hq5p7U0O6aaMwgVfJ47hUMAJGlHFVfqnKB3piPuHgeS9Idxktl6EzBgb3TnBBrma7en0yyFTIw22dIDNsGJuoUhchM9IMXBNM/qsZR1UkoiR22pcE4MYbb+S+3/yaJCrQ19mPG5uoG54n7E4cwFLSndsxNtnzYA2aZhKd8i9VTxKX8b5x2BewmufEjSXTjzn07LOYyGKiKBemIDWEJeOPEGuEFPKDvoqQaW62bnVsfPDBB7EuRVWpe0fN1XLrQLP3ASKLD1pC74J9SMolxt0wP7uhdc00EUWNItYDiJrJe4OIRMYQidltxdWp3LTqWrY99yyre/tYZEbpWdiZj9c0Mohhe6WuaZQn0P/ouqtZvXr1tGOuWrWKgjHEUUK53E6c2Ga9bpnym7idw0SPrSaizlh9+rpXqq/o8iQiA50lih0d2Bb3FcAZw1BfN0NR4VXPMiJiI4OmKT6r097fs8dxqlFEjKPH7Mw3RcnvYXNdBy7tZ3ZfB+ViAY3/P4iw3xPysfzPgYtg55EQP4baQcRL3k9R4KPquBx4N3C6KvsLtE8JbHxVZGTjSC+NV6mpeaUCGxVuR/mJq/Ib20PlZY+UgXQEjfeBbAQeeg6OvmLvFzy+cyeVw46htH0LjGzHqiUq9hCZiOHBF2c0xn9cdhkXXPD3OOd47rmn6eyclQtmFerGQeR5Oh5GNGJWKw8UsG7dOl5a+zTz992XQnuB4R07KHR0qGvU366rcvWTT/Lw7bdz7SWXtJ6gz/Amv7h1F2nl5R2Ixszed4xUlaxWUrB5s0Tx3NBCKPzkyis5+0MfwjjHyMgI7ZmoZJ6dmwfpPWIfhjbtJHJWt29cx5L99sMkCV+++OKW01y1ahUrVqxgQCO8U7pspomLEONISbn+hz9AVTnkkEN4okWuZJPn17/AkBtB64595y3VpFEoUFSoiWNHbSvOQJnWLcRWrbqOd557Lg+9oYv2HeMUnxaNjadmHBWnDBpPQaFjLxp6N2uK/c3f/A2FQoEnn3qKtnJZnbU4EfzwCDf94EZUlf3335+1a9dOO97LL73E/MWLURUqo6NoqaRfv/Nq2GcfjjvwwJbzsQJ3vnwJS5bcytzxP6Cav5WigrPKy1t3smjJoVgnfPMfLtjjOD/72c84/fTTiWYpSTmmNjSkGieIEWpVw6qrv4fqTvbd982sWzdDA3UL9toRW/k41BaAlCAegLpFOg5HRx6BdgtD4/SJ5Y1GeAtwIDAP6FPoAoqSe1K85r0eRyQ3Em5BeUGUe3Gs/ut/Zu13L4YsBduOlMbRGxTOOREG74Wei/8kaw8EAv8Hs/dRJMDLF+VtdoYKYIYhLoMKprOIH62TV2OPoPtSGPowPVjavVIWiJtxW17JRKgijMWeQROT1jPIDOzYCHPnYbxHdTv67L5w7HZ4KILl//KnvQCBQOD/TF5TLdb5X5j8+9YLoXtfuOPT+IM+BoU4N9agwCYU2Kl5wP5EjXrYVWo2DGITRv1Zs9Ga4Lv6wZUgehbk8tcy00Ag8P9XXpPm9Ur0YlizHe68BU5/K5TmQuQa3kWbm+4m6tkx4WnUpmnWKFpzEAmUqjA0N6+quuC5ILQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEyK2mXgAAAKxJREFUAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUCgBf8bCgNcym6uDuoAAAAASUVORK5CYII=",
  "goldbio.webp": "data:image/webp;base64,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",
  "beckman-coulter.png": "data:image/png;base64,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"
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/assets.js", error: String((e && e.message) || e) }); }

// ui_kits/app/kit.jsx
try { (() => {
// ProcureWide app — shared UI kit (extends ui.jsx primitives + PW tokens).
// Salesforce-style square object icons (now SVG glyphs in slate tiles),
// qty steppers, toasts, page headers, KPI tiles, CSV upload control.

const SLDS_BLUE = '#1B96FF';
const SLDS_BLUE_HOVER = '#0F7BD1';

// ───────── Icon set ──────────────────────────────────────────────────
const ICON_PATHS = {
  home: 'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10',
  order: 'M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 8H6',
  cart: 'M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 8H6M9 21a1 1 0 1 0 0 .01M18 21a1 1 0 1 0 0 .01',
  box: 'M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8',
  clock: 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
  tag: 'M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0l-7-7A2 2 0 0 1 3 12.2V5a2 2 0 0 1 2-2h7.2a2 2 0 0 1 1.4.6l7 7a2 2 0 0 1 0 2.8zM7.5 7.5h.01',
  truck: 'M1 4h13v11H1zM14 8h4l3 3v4h-7M5.5 18.5a1.5 1.5 0 1 0 0 .01M18.5 18.5a1.5 1.5 0 1 0 0 .01',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
  plus: 'M12 5v14M5 12h14',
  upload: 'M12 16V4M7 9l5-5 5 5M4 20h16',
  download: 'M12 4v12M7 11l5 5 5-5M4 20h16',
  check: 'M20 6L9 17l-5-5',
  x: 'M6 6l12 12M18 6L6 18',
  chevron: 'M6 9l6 6 6-6',
  trash: 'M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6',
  alert: 'M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7l1-8z',
  flask: 'M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3',
  doc: 'M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6',
  refresh: 'M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5',
  arrowR: 'M5 12h14M13 6l6 6-6 6',
  building: 'M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01',
  info: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 11v5M12 7.6h.01',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  rows: 'M3 5h18M3 12h18M3 19h18',
  table: 'M3 4h18v16H3zM3 9h18M9 9v11M3 14h18',
  lock: 'M6 10V8a6 6 0 0 1 12 0v2M5 10h14v10H5zM12 14v3',
  support: 'M12 3a9 9 0 0 0-9 9v5a2 2 0 0 0 2 2h2v-7H5a7 7 0 0 1 14 0h-2v7h2a2 2 0 0 0 2-2v-5a9 9 0 0 0-9-9z',
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7'
};
function Icon({
  name,
  size = 16,
  color = 'currentColor',
  stroke = 2
}) {
  const d = ICON_PATHS[name] || ICON_PATHS.box;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, d.split('M').filter(Boolean).map((seg, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: 'M' + seg
  })));
}

// Square Salesforce-style object tile w/ glyph
function ObjIcon({
  name,
  size = 22,
  color = '#5A6A8E',
  glyph = '#fff'
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: 3,
      background: color,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: name,
    size: Math.round(size * 0.58),
    color: glyph,
    stroke: 2.1
  }));
}

// ───────── Card chrome (Salesforce section card) ─────────────────────
function SectionCard({
  title,
  icon,
  action,
  children,
  style,
  bodyStyle,
  padded = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: PW.white,
      border: `1px solid ${PW.line}`,
      borderRadius: 4,
      overflow: 'hidden',
      ...style
    }
  }, title != null && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 14px',
      background: '#F4F6F9',
      borderBottom: `1px solid ${PW.line}`
    }
  }, icon && /*#__PURE__*/React.createElement(ObjIcon, {
    name: icon,
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 700,
      color: PW.ink,
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), action), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: padded ? 14 : 0,
      ...bodyStyle
    }
  }, children));
}

// ───────── Buttons (app density) ─────────────────────────────────────
function AppButton({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  style,
  disabled,
  title,
  icon
}) {
  const [hover, setHover] = React.useState(false);
  const sizes = {
    sm: {
      padding: '5px 10px',
      fontSize: 12
    },
    md: {
      padding: '7px 14px',
      fontSize: 13
    },
    lg: {
      padding: '10px 18px',
      fontSize: 14
    }
  };
  const variants = {
    primary: {
      background: hover ? SLDS_BLUE_HOVER : SLDS_BLUE,
      color: '#fff',
      border: '1px solid transparent'
    },
    ink: {
      background: hover ? PW.ink700 : PW.ink,
      color: '#fff',
      border: '1px solid transparent'
    },
    green: {
      background: hover ? '#0B7E4A' : PW.green,
      color: '#fff',
      border: '1px solid transparent'
    },
    secondary: {
      background: hover ? '#F4F6F9' : PW.white,
      color: PW.ink,
      border: `1px solid ${PW.line2}`
    },
    ghost: {
      background: hover ? '#F0F0EC' : 'transparent',
      color: PW.ink500,
      border: '1px solid transparent'
    },
    danger: {
      background: hover ? '#FBE3E2' : PW.white,
      color: '#8B1F1B',
      border: `1px solid ${hover ? '#E7A6A6' : PW.line2}`
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    disabled: disabled,
    title: title,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      fontFamily: PW.sans,
      fontWeight: 600,
      borderRadius: 3,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      whiteSpace: 'nowrap',
      lineHeight: 1.2,
      transition: 'background 120ms ease',
      ...sizes[size],
      ...variants[variant],
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: size === 'sm' ? 13 : 14,
    stroke: 2.2
  }), children);
}

// ───────── Status pill ───────────────────────────────────────────────
function StatusPill({
  tone = 'neutral',
  children,
  dot = true
}) {
  const tones = {
    neutral: {
      bg: '#F0EFEB',
      fg: PW.ink500,
      d: PW.mute
    },
    success: {
      bg: '#E6F5EC',
      fg: '#0A7048',
      d: '#0E9560'
    },
    warning: {
      bg: '#FBF0CF',
      fg: '#8A6308',
      d: '#E0A60A'
    },
    danger: {
      bg: '#FBE3E2',
      fg: '#8B1F1B',
      d: '#D6322D'
    },
    info: {
      bg: '#DDE7F8',
      fg: '#1E4FB0',
      d: SLDS_BLUE
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '2px 9px',
      borderRadius: 12,
      background: t.bg,
      color: t.fg,
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 600,
      whiteSpace: 'nowrap'
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: t.d
    }
  }), children);
}

// ───────── Qty stepper ───────────────────────────────────────────────
function QtyStepper({
  value,
  onChange,
  min = 0,
  size = 'md'
}) {
  const h = size === 'sm' ? 26 : 30;
  const w = size === 'sm' ? 38 : 46;
  const btn = {
    width: h,
    height: h,
    border: `1px solid ${PW.line2}`,
    background: PW.white,
    color: PW.ink,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: PW.sans,
    fontSize: 15,
    fontWeight: 600,
    padding: 0
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onChange(Math.max(min, value - 1)),
    style: {
      ...btn,
      borderRadius: '3px 0 0 3px',
      borderRight: 0
    }
  }, "\u2212"), /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: e => {
      const v = parseInt(e.target.value.replace(/\D/g, ''), 10);
      onChange(isNaN(v) ? min : v);
    },
    style: {
      width: w,
      height: h,
      border: `1px solid ${PW.line2}`,
      textAlign: 'center',
      fontFamily: PW.mono,
      fontSize: 13,
      color: PW.ink,
      outline: 'none',
      fontVariantNumeric: 'tabular-nums',
      padding: 0
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => onChange(value + 1),
    style: {
      ...btn,
      borderRadius: '0 3px 3px 0',
      borderLeft: 0
    }
  }, "+"));
}

// ───────── Vendor mark ───────────────────────────────────────────────
function VendorMark({
  vendorKey,
  height = 14,
  withName = true,
  nameStyle
}) {
  const v = vendor(vendorKey);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      minWidth: 0
    }
  }, v.logo ? /*#__PURE__*/React.createElement("img", {
    src: window.PW_ASSETS && window.PW_ASSETS[v.logo] || `../../assets/vendors/${v.logo}`,
    alt: "",
    style: {
      height,
      maxWidth: 84,
      objectFit: 'contain'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      height,
      padding: '0 6px',
      borderRadius: 2,
      background: '#EEF0EA',
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: PW.sans,
      fontSize: Math.max(9, Math.round(height * 0.62)),
      fontWeight: 800,
      color: PW.ink500,
      letterSpacing: '0.02em'
    }
  }, v.abbr || v.name.slice(0, 3).toUpperCase()), withName && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.ink500,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      ...nameStyle
    }
  }, v.name));
}

// ───────── KPI tile ──────────────────────────────────────────────────
function Kpi({
  label,
  value,
  sub,
  tone,
  icon,
  details,
  viewAll,
  maxRows = 5
}) {
  const [open, setOpen] = React.useState(false);
  const toneColors = {
    green: '#0A7048',
    blue: '#1E4FB0',
    danger: '#8B1F1B',
    ink: PW.ink
  };
  const expandable = details && details.length > 0 || !!viewAll;
  const shown = details ? details.slice(0, maxRows) : [];
  const more = details ? details.length - shown.length : 0;
  const iconColor = tone === 'green' ? '#0E9560' : tone === 'danger' ? '#D6322D' : tone === 'blue' ? SLDS_BLUE : '#5A6A8E';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: expandable ? () => setOpen(o => !o) : undefined,
    style: {
      background: PW.white,
      border: `1px solid ${open ? PW.line2 : PW.line}`,
      borderRadius: 4,
      padding: '14px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      minWidth: 0,
      cursor: expandable ? 'pointer' : 'default',
      boxShadow: open ? PW.shadowMd : 'none',
      transition: 'box-shadow 120ms ease, border-color 120ms ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, icon && /*#__PURE__*/React.createElement(ObjIcon, {
    name: icon,
    size: 20,
    color: iconColor
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 700,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  }, label), expandable && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      color: PW.mute,
      display: 'inline-flex',
      transform: open ? 'rotate(180deg)' : 'none',
      transition: 'transform 160ms ease'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron",
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.display,
      fontWeight: 700,
      fontSize: 30,
      lineHeight: 1.05,
      color: toneColors[tone] || PW.ink,
      letterSpacing: '-0.01em',
      fontVariantNumeric: 'tabular-nums',
      marginTop: 2
    }
  }, value), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.mute
    }
  }, sub)), open && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onClick: () => setOpen(false),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 40
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 'auto',
      marginTop: 6,
      zIndex: 41,
      minWidth: '100%',
      width: 'max-content',
      maxWidth: 360,
      background: PW.white,
      border: `1px solid ${PW.line2}`,
      borderRadius: 6,
      boxShadow: '0 16px 40px -12px rgba(7,17,42,0.32)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '9px 13px',
      borderBottom: `1px solid ${PW.line}`,
      background: '#F4F6F9',
      fontFamily: PW.sans,
      fontSize: 10.5,
      fontWeight: 700,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    }
  }, label, " \u2014 breakdown"), shown.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 13px',
      fontFamily: PW.sans,
      fontSize: 13,
      color: PW.mute
    }
  }, "Nothing to show right now.") : shown.map((row, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onClick: row.onClick ? e => {
      e.stopPropagation();
      setOpen(false);
      row.onClick();
    } : undefined,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '9px 13px',
      borderBottom: `1px solid ${PW.line}`,
      cursor: row.onClick ? 'pointer' : 'default'
    }
  }, row.dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: row.dot,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontFamily: PW.sans,
      fontSize: 13,
      color: PW.ink,
      minWidth: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, row.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 12.5,
      fontWeight: 600,
      color: row.tone || PW.ink500,
      whiteSpace: 'nowrap'
    }
  }, row.value))), viewAll && /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      setOpen(false);
      viewAll.onClick();
    },
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      padding: '10px 13px',
      background: '#FAFBF7',
      border: 0,
      cursor: 'pointer',
      fontFamily: PW.sans,
      fontSize: 12.5,
      fontWeight: 700,
      color: SLDS_BLUE
    }
  }, more > 0 ? `View all ${details.length} in ${viewAll.label}` : viewAll.cta || `Open ${viewAll.label}`, /*#__PURE__*/React.createElement(Icon, {
    name: "arrowR",
    size: 14
  })))));
}

// ───────── Progress bar ──────────────────────────────────────────────
function Progress({
  pct,
  color = SLDS_BLUE,
  height = 6,
  track = '#EDEDE8'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      background: track,
      borderRadius: 999,
      overflow: 'hidden',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: Math.max(0, Math.min(100, pct)) + '%',
      height: '100%',
      background: color,
      borderRadius: 999,
      transition: 'width 300ms ease'
    }
  }));
}

// ───────── Page header ───────────────────────────────────────────────
function PageHeader({
  icon,
  kicker,
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: PW.white,
      borderBottom: `1px solid ${PW.line}`,
      padding: '16px 28px',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      position: 'sticky',
      top: 0,
      zIndex: 20
    }
  }, icon && /*#__PURE__*/React.createElement(ObjIcon, {
    name: icon,
    size: 34
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, kicker && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      color: PW.mute,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }
  }, kicker), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '1px 0 0',
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 21,
      color: PW.ink,
      letterSpacing: '-0.01em'
    }
  }, title)), children);
}

// ───────── CSV upload button ─────────────────────────────────────────
function CsvUpload({
  label = 'Upload CSV',
  onRows,
  variant = 'secondary',
  size = 'md',
  icon = 'upload'
}) {
  const ref = React.useRef();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", {
    ref: ref,
    type: "file",
    accept: ".csv,text/csv",
    style: {
      display: 'none'
    },
    onChange: e => {
      const f = e.target.files[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = () => {
        onRows(parseCSV(reader.result), f.name);
        ref.current.value = '';
      };
      reader.readAsText(f);
    }
  }), /*#__PURE__*/React.createElement(AppButton, {
    variant: variant,
    size: size,
    icon: icon,
    onClick: () => ref.current.click()
  }, label));
}

// ───────── Vendor stock + urgency + dates ───────────────────────────
function VendorStockPill({
  sku,
  size = 'sm'
}) {
  const p = product(sku);
  const s = window.vendorStockOf ? vendorStockOf(p) : p && p.vendorStock || 'in';
  const map = {
    in: {
      tone: 'success',
      label: 'In stock at vendor'
    },
    low: {
      tone: 'warning',
      label: 'Low at vendor'
    },
    backorder: {
      tone: 'danger',
      label: 'Backorder'
    }
  };
  const t = map[s] || map.in;
  return /*#__PURE__*/React.createElement(StatusPill, {
    tone: t.tone
  }, t.label);
}
function UrgencyPill({
  level
}) {
  const map = {
    High: {
      tone: 'danger',
      label: 'High urgency'
    },
    Medium: {
      tone: 'warning',
      label: 'Medium urgency'
    },
    Low: {
      tone: 'neutral',
      label: 'Low urgency'
    }
  };
  const t = map[level] || map.Medium;
  return /*#__PURE__*/React.createElement(StatusPill, {
    tone: t.tone
  }, t.label);
}
function fmtDate(iso, opts) {
  if (!iso) return '—';
  const d = new Date(iso + (iso.length === 10 ? 'T00:00:00' : ''));
  if (isNaN(d)) return iso;
  return d.toLocaleDateString('en-US', opts || {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}
function daysBetween(aIso, bIso) {
  const a = new Date(aIso + 'T00:00:00'),
    b = new Date(bIso + 'T00:00:00');
  return Math.round((a - b) / 86400000);
}

// ───────── Toast host ────────────────────────────────────────────────
const Toast = function () {
  let push = null;
  function register(fn) {
    push = fn;
  }
  function show(msg, opts = {}) {
    if (push) push({
      msg,
      ...opts,
      id: Date.now() + Math.random()
    });
  }
  return {
    register,
    show
  };
}();
function ToastHost() {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    Toast.register(t => {
      setItems(x => [...x, t]);
      setTimeout(() => setItems(x => x.filter(i => i.id !== t.id)), t.duration || 2600);
    });
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      bottom: 20,
      right: 20,
      zIndex: 9000,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      alignItems: 'flex-end'
    }
  }, items.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 14px',
      background: PW.ink,
      color: '#fff',
      borderRadius: 6,
      boxShadow: '0 10px 30px -8px rgba(7,17,42,0.5)',
      fontFamily: PW.sans,
      fontSize: 13,
      fontWeight: 500,
      animation: 'pwToastIn 220ms cubic-bezier(0.22,1,0.36,1)',
      maxWidth: 360
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 4,
      flexShrink: 0,
      background: t.tone === 'danger' ? '#D6322D' : '#0E9560',
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: t.tone === 'danger' ? 'x' : 'check',
    size: 11,
    stroke: 3
  })), /*#__PURE__*/React.createElement("span", null, t.msg), t.action && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      t.action.onClick();
      setItems(x => x.filter(i => i.id !== t.id));
    },
    style: {
      marginLeft: 4,
      background: 'transparent',
      border: 0,
      color: SLDS_BLUE,
      fontFamily: PW.sans,
      fontSize: 13,
      fontWeight: 700,
      cursor: 'pointer'
    }
  }, t.action.label))));
}

// ───────── Empty state ───────────────────────────────────────────────
function EmptyState({
  icon = 'box',
  title,
  sub,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '56px 24px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 54,
      height: 54,
      borderRadius: 8,
      background: '#F0F0EC',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 26,
    color: PW.mute
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 16,
      fontWeight: 700,
      color: PW.ink
    }
  }, title), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 13,
      color: PW.mute,
      maxWidth: 360
    }
  }, sub), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, action));
}
Object.assign(window, {
  SLDS_BLUE,
  SLDS_BLUE_HOVER,
  Icon,
  ObjIcon,
  SectionCard,
  AppButton,
  StatusPill,
  QtyStepper,
  VendorMark,
  Kpi,
  Progress,
  PageHeader,
  CsvUpload,
  Toast,
  ToastHost,
  EmptyState,
  VendorStockPill,
  UrgencyPill,
  fmtDate,
  daysBetween
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/kit.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/store-cellsbin.jsx
try { (() => {
// ProcureWide — CellsBin Labs variant store.
// Same engine as store.jsx; data sourced from the CellsBin price comparison
// (Your Price → ProcureWide Price). Same vendors as flagged in the sheet.

// ───────── Vendors ──────────────────────────────────────────────────
const VENDORS = {
  lifetech: {
    name: 'Life Technologies',
    logo: 'thermo-fisher.png'
  },
  // Thermo Fisher brand
  fisher: {
    name: 'Fisher Scientific',
    logo: 'fisher-scientific.png'
  },
  vwr: {
    name: 'VWR International',
    logo: null,
    abbr: 'VWR'
  },
  celltreat: {
    name: 'CELLTREAT',
    logo: null,
    abbr: 'CT'
  }
};

// ───────── Catalog ──────────────────────────────────────────────────
// list = "Your Price" (current), price = "ProcureWide Price" (negotiated).
const CATALOG = [{
  sku: 'CB-C10228',
  vendorStock: 'in',
  setupEase: 3,
  name: 'Countess Cell Counting Chamber Slides & Holder',
  vendor: 'lifetech',
  catalog: 'C10228',
  cat: 'Cell analysis',
  unit: 'disposable kit',
  price: 134.04,
  list: 253.30,
  lead: '3–5 days',
  badges: ['Disposable'],
  storage: 'RT'
}, {
  sku: 'CB-013333',
  vendorStock: 'in',
  setupEase: 2,
  name: 'UltraComp eBeads Plus Compensation Beads',
  vendor: 'lifetech',
  catalog: '01-3333-42',
  cat: 'Flow cytometry',
  unit: '100 tests',
  price: 340.64,
  list: 337.43,
  lead: '3–5 days',
  badges: ['Compensation'],
  storage: '2–8 °C'
}, {
  sku: 'CB-4331348',
  vendorStock: 'backorder',
  setupEase: 1,
  name: 'Custom TaqMan Gene Expression Assay, FAM',
  vendor: 'lifetech',
  catalog: '4331348',
  cat: 'qPCR & assays',
  unit: '360 reactions',
  price: 322.61,
  list: 353.60,
  lead: '7–10 days',
  badges: ['Made to order', 'FAM'],
  storage: '−20 °C'
}, {
  sku: 'CB-SS2661',
  vendorStock: 'in',
  setupEase: 2,
  name: 'Sodium Hydroxide Solution, 1N, Certified',
  vendor: 'fisher',
  catalog: 'SS2661',
  cat: 'Reagents',
  unit: '1 L',
  price: 43.79,
  list: 47.45,
  lead: '2–4 days',
  badges: ['Certified'],
  storage: 'RT'
}, {
  sku: 'CB-720083',
  vendorStock: 'in',
  setupEase: 3,
  name: '6-Well Plate, TC-treated, sterile',
  vendor: 'fisher',
  catalog: '720083',
  cat: 'Plasticware',
  unit: 'case ×50',
  price: 87.21,
  list: 86.66,
  lead: '1–3 days',
  badges: ['TC-treated', 'Sterile'],
  storage: 'RT'
}, {
  sku: 'CB-NC1000861',
  vendorStock: 'low',
  setupEase: 2,
  name: 'G-Rex 24-Well Plate, cell expansion',
  vendor: 'fisher',
  catalog: 'NC1000861',
  cat: 'Plasticware',
  unit: 'each',
  price: 113.89,
  list: 134.60,
  lead: '3–5 days',
  badges: ['Cell expansion'],
  storage: 'RT'
}, {
  sku: 'CB-FB012935',
  vendorStock: 'in',
  setupEase: 3,
  name: '25 cm² TC Flask, vent cap, sterile',
  vendor: 'fisher',
  catalog: 'FB012935',
  cat: 'Plasticware',
  unit: 'case ×200',
  price: 137.31,
  list: 178.74,
  lead: '1–3 days',
  badges: ['TC-treated', 'Vent cap', 'Sterile'],
  storage: 'RT'
}, {
  sku: 'CB-76518',
  vendorStock: 'in',
  setupEase: 3,
  name: 'Nitrile Exam Gloves, Blue, powder-free (S)',
  vendor: 'vwr',
  catalog: '76518-336',
  cat: 'Lab supplies',
  unit: 'pack ×100',
  price: 15.15,
  list: 154.35,
  lead: '1–3 days',
  badges: ['Powder-free', 'ASTM D6319'],
  storage: 'RT',
  alt: {
    tone: 'info',
    label: 'Bulk case saves on reorders',
    detail: 'Same VWR glove as a case of 1,000 (76518-336 series) — $151.59 = $15.16/box. Identical spec, just fewer reorders.',
    vendor: 'vwr'
  }
}, {
  sku: 'CB-77394',
  vendorStock: 'in',
  setupEase: 3,
  name: 'Cryovial, PP, 1.0 mL, internal thread, sterile',
  vendor: 'vwr',
  catalog: '77394-976',
  cat: 'Plasticware',
  unit: 'case ×1000',
  price: 162.59,
  list: 177.81,
  lead: '1–3 days',
  badges: ['Sterile', 'Self-standing'],
  storage: 'RT'
}, {
  sku: 'CB-89428',
  vendorStock: 'low',
  setupEase: 3,
  name: 'Nitrile 200 Exam Gloves, powder-free (S)',
  vendor: 'vwr',
  catalog: '89428-748',
  cat: 'Lab supplies',
  unit: 'pack ×200',
  price: 12.70,
  list: 196.22,
  lead: '1–3 days',
  badges: ['Powder-free'],
  storage: 'RT',
  alt: {
    tone: 'info',
    label: 'Bulk case available',
    detail: 'VWR Nitrile 200, case of 2,000 (89428-752) — $127.00 = $12.70/pk ≈ $0.064/glove. Same glove & vendor, below the name-brand floor.',
    vendor: 'vwr'
  }
}, {
  sku: 'CB-10861-572',
  vendorStock: 'in',
  setupEase: 3,
  name: '50 mL Culture Flask, non-treated, vent cap',
  vendor: 'vwr',
  catalog: '10861-572',
  cat: 'Plasticware',
  unit: 'box ×50',
  price: 269.15,
  list: 312.19,
  lead: '1–3 days',
  badges: ['Non-treated', 'Vent cap', 'Sterile'],
  storage: 'RT',
  alt: {
    tone: 'success',
    label: 'Lower-cost alternative — different vendor',
    detail: 'CELLTREAT 229510 — 50 mL non-treated suspension flask, vent cap, sterile, case/200 = $146.38 ($0.73/flask vs ~$5.38). −86% on absolute cost.',
    vendor: 'celltreat'
  }
}, {
  sku: 'CB-10861-568',
  vendorStock: 'backorder',
  setupEase: 3,
  name: '25 mL Culture Flask, non-treated, vent cap',
  vendor: 'vwr',
  catalog: '10861-568',
  cat: 'Plasticware',
  unit: 'box ×50',
  price: 277.65,
  list: 323.29,
  lead: '1–3 days',
  badges: ['Non-treated', 'Vent cap', 'Sterile'],
  storage: 'RT',
  alt: {
    tone: 'success',
    label: 'Lower-cost alternative — different vendor',
    detail: 'CELLTREAT 229500 — 25 mL non-treated suspension flask, vent cap, sterile, case/200 = $244.15 ($1.22/flask vs ~$5.55). −78% on absolute cost.',
    vendor: 'celltreat'
  }
}];

// ───────── Discount programs ────────────────────────────────────────
const SPEND_TIERS = {
  lifetech: [{
    at: 2500,
    save: 300
  }, {
    at: 5000,
    save: 1000
  }],
  fisher: [{
    at: 1500,
    save: 150
  }, {
    at: 4000,
    save: 600
  }],
  vwr: [{
    at: 1000,
    save: 120
  }, {
    at: 3000,
    save: 480
  }]
};
const VOLUME_TIERS = {
  default: [{
    qty: 5,
    off: 0.05
  }, {
    qty: 10,
    off: 0.10
  }, {
    qty: 25,
    off: 0.16
  }]
};

// Whole-order consolidation rate: route your ENTIRE order through this vendor → % off.
const CONSOLIDATION = {
  lifetech: 0.28,
  fisher: 0.18,
  vwr: 0.12
};

// ───────── Seed state ───────────────────────────────────────────────
function seedInventory() {
  return [{
    sku: 'CB-C10228',
    onHand: 3,
    reorder: 4,
    lot: 'CNT-2207',
    expiry: '2027-04-30',
    location: 'Cell analysis · Bay 1'
  }, {
    sku: 'CB-013333',
    onHand: 1,
    reorder: 2,
    lot: 'EB-5512',
    expiry: '2026-12-31',
    location: 'Fridge 2–8 · Shelf 3'
  }, {
    sku: 'CB-4331348',
    onHand: 2,
    reorder: 2,
    lot: 'TQ-9981',
    expiry: '2027-08-31',
    location: 'Freezer −20 · Box 4'
  }, {
    sku: 'CB-SS2661',
    onHand: 5,
    reorder: 3,
    lot: 'NaOH-118',
    expiry: '2027-02-28',
    location: 'Reagents · Cabinet B'
  }, {
    sku: 'CB-720083',
    onHand: 2,
    reorder: 3,
    lot: '—',
    expiry: '—',
    location: 'Consumables · Bay 2'
  }, {
    sku: 'CB-FB012935',
    onHand: 0,
    reorder: 2,
    lot: '—',
    expiry: '—',
    location: 'Consumables · Bay 2'
  }, {
    sku: 'CB-76518',
    onHand: 6,
    reorder: 4,
    lot: '—',
    expiry: '—',
    location: 'PPE · Bay 4'
  }, {
    sku: 'CB-77394',
    onHand: 1,
    reorder: 2,
    lot: 'CV-3340',
    expiry: '—',
    location: 'Consumables · Bay 1'
  }, {
    sku: 'CB-10861-572',
    onHand: 4,
    reorder: 2,
    lot: '—',
    expiry: '—',
    location: 'Consumables · Bay 3'
  }];
}
function seedOrders() {
  const raw = [{
    id: 'CB-1004',
    date: '2026-05-20',
    status: 'Delivered',
    po: 'CELLSBIN-2026-044',
    tracking: '1Z 47A 882 03 4471 220',
    carrier: 'UPS',
    urgency: 'Medium',
    lines: [{
      sku: 'CB-720083',
      qty: 2
    }, {
      sku: 'CB-FB012935',
      qty: 3
    }]
  }, {
    id: 'CB-1003',
    date: '2026-05-08',
    status: 'In transit',
    po: 'CELLSBIN-2026-041',
    tracking: '7749 1180 4432',
    carrier: 'FedEx',
    urgency: 'High',
    lines: [{
      sku: 'CB-C10228',
      qty: 1
    }, {
      sku: 'CB-4331348',
      qty: 1
    }]
  }, {
    id: 'CB-1002',
    date: '2026-04-25',
    status: 'Delivered',
    po: 'CELLSBIN-2026-037',
    tracking: '1Z 47A 882 03 4188 901',
    carrier: 'UPS',
    urgency: 'Low',
    lines: [{
      sku: 'CB-76518',
      qty: 2
    }, {
      sku: 'CB-77394',
      qty: 1
    }]
  }, {
    id: 'CB-1001',
    date: '2026-04-12',
    status: 'Delivered',
    po: 'CELLSBIN-2026-033',
    tracking: '9261 2910 7733 4401',
    carrier: 'USPS',
    urgency: 'Medium',
    lines: [{
      sku: 'CB-SS2661',
      qty: 1
    }, {
      sku: 'CB-013333',
      qty: 1
    }]
  }, {
    id: 'CB-0992',
    date: '2026-02-18',
    status: 'Delivered',
    po: 'CELLSBIN-2026-021',
    tracking: '1Z 47A 882 03 3902 117',
    carrier: 'UPS',
    urgency: 'Low',
    lines: [{
      sku: 'CB-FB012935',
      qty: 4
    }, {
      sku: 'CB-76518',
      qty: 3
    }, {
      sku: 'CB-720083',
      qty: 2
    }]
  }, {
    id: 'CB-0981',
    date: '2025-12-09',
    status: 'Delivered',
    po: 'CELLSBIN-2025-118',
    tracking: '7740 9921 0034',
    carrier: 'FedEx',
    urgency: 'Medium',
    lines: [{
      sku: 'CB-C10228',
      qty: 2
    }, {
      sku: 'CB-4331348',
      qty: 1
    }]
  }, {
    id: 'CB-0964',
    date: '2025-09-22',
    status: 'Delivered',
    po: 'CELLSBIN-2025-097',
    tracking: '9261 2910 7733 1180',
    carrier: 'USPS',
    urgency: 'Low',
    lines: [{
      sku: 'CB-77394',
      qty: 2
    }, {
      sku: 'CB-10861-572',
      qty: 1
    }]
  }, {
    id: 'CB-0938',
    date: '2025-05-14',
    status: 'Delivered',
    po: 'CELLSBIN-2025-052',
    tracking: '1Z 47A 882 03 2210 884',
    carrier: 'UPS',
    urgency: 'Medium',
    lines: [{
      sku: 'CB-SS2661',
      qty: 2
    }, {
      sku: 'CB-89428',
      qty: 4
    }]
  }];
  const find = sku => CATALOG.find(p => p.sku === sku);
  return raw.map(o => {
    const total = o.lines.reduce((a, l) => {
      const p = find(l.sku);
      return a + (p ? p.price * l.qty : 0);
    }, 0);
    const saved = o.lines.reduce((a, l) => {
      const p = find(l.sku);
      return a + (p ? Math.max(0, p.list - p.price) * l.qty : 0);
    }, 0);
    return {
      ...o,
      total,
      saved
    };
  });
}
function seedSpend() {
  return {
    lifetech: 2680,
    fisher: 1840,
    vwr: 1120
  };
}
function seedState() {
  return {
    account: {
      name: 'CellsBin Labs',
      plan: 'Growth',
      initials: 'CB',
      quarter: 'Q2 2026'
    },
    cart: [],
    inventory: seedInventory(),
    orders: seedOrders(),
    spend: seedSpend(),
    orderMeta: {
      urgency: 'Medium',
      needBy: ''
    },
    nextOrderNum: 1005
  };
}

// ───────── Store singleton ──────────────────────────────────────────
const LS_KEY = 'pw_cellsbin_store_v2';
const Store = function () {
  let state = load();
  const subs = new Set();
  function load() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return seedState();
      return {
        ...seedState(),
        ...JSON.parse(raw)
      };
    } catch (e) {
      return seedState();
    }
  }
  function persist() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch (e) {}
  }
  function set(updater) {
    state = typeof updater === 'function' ? updater(state) : {
      ...state,
      ...updater
    };
    persist();
    subs.forEach(fn => fn());
  }
  function get() {
    return state;
  }
  function subscribe(fn) {
    subs.add(fn);
    return () => subs.delete(fn);
  }
  function reset() {
    set(seedState());
  }
  return {
    get,
    set,
    subscribe,
    reset
  };
}();

// ───────── Lookups ──────────────────────────────────────────────────
const BY_SKU = Object.fromEntries(CATALOG.map(p => [p.sku, p]));
function product(sku) {
  return BY_SKU[sku];
}
function vendor(key) {
  return VENDORS[key] || {
    name: key,
    logo: null
  };
}

// ───────── Cart actions ─────────────────────────────────────────────
function addToCart(sku, qty = 1) {
  Store.set(s => {
    const i = s.cart.findIndex(l => l.sku === sku);
    const cart = [...s.cart];
    if (i >= 0) cart[i] = {
      ...cart[i],
      qty: cart[i].qty + qty
    };else cart.push({
      sku,
      qty
    });
    return {
      ...s,
      cart
    };
  });
}
function setCartQty(sku, qty) {
  Store.set(s => {
    const cart = s.cart.map(l => l.sku === sku ? {
      ...l,
      qty: Math.max(0, qty)
    } : l).filter(l => l.qty > 0);
    return {
      ...s,
      cart
    };
  });
}
function removeFromCart(sku) {
  Store.set(s => ({
    ...s,
    cart: s.cart.filter(l => l.sku !== sku)
  }));
}
function clearCart() {
  Store.set(s => ({
    ...s,
    cart: []
  }));
}
function importCartRows(rows) {
  let added = 0,
    skipped = 0;
  Store.set(s => {
    const cart = [...s.cart];
    rows.forEach(r => {
      const q = parseInt(r.qty, 10) || 0;
      if (q <= 0) {
        skipped++;
        return;
      }
      let p = r.sku && BY_SKU[r.sku.trim()];
      if (!p && r.catalog) p = CATALOG.find(x => x.catalog.toLowerCase() === String(r.catalog).trim().toLowerCase());
      if (!p && r.sku) p = CATALOG.find(x => x.catalog.toLowerCase() === String(r.sku).trim().toLowerCase());
      if (!p) {
        skipped++;
        return;
      }
      const i = cart.findIndex(l => l.sku === p.sku);
      if (i >= 0) cart[i] = {
        ...cart[i],
        qty: cart[i].qty + q
      };else cart.push({
        sku: p.sku,
        qty: q
      });
      added++;
    });
    return {
      ...s,
      cart
    };
  });
  return {
    added,
    skipped
  };
}

// ───────── Discount math ────────────────────────────────────────────
function lineVolumeOff(qty) {
  const tiers = VOLUME_TIERS.default;
  let off = 0;
  for (const t of tiers) if (qty >= t.qty) off = t.off;
  return off;
}
function linePricing(line) {
  const p = product(line.sku);
  if (!p) return {
    gross: 0,
    off: 0,
    net: 0,
    offPct: 0
  };
  const gross = p.price * line.qty;
  const offPct = lineVolumeOff(line.qty);
  const off = gross * offPct;
  return {
    gross,
    off,
    net: gross - off,
    offPct
  };
}
function spendStatus(vendorKey, extra = 0) {
  const tiers = SPEND_TIERS[vendorKey];
  const booked = Store.get().spend[vendorKey] || 0;
  const total = booked + extra;
  if (!tiers) return {
    booked,
    total,
    current: null,
    next: null,
    guaranteed: 0,
    tiers: []
  };
  let current = null,
    next = null;
  for (const t of tiers) {
    if (total >= t.at) current = t;else {
      next = t;
      break;
    }
  }
  return {
    booked,
    total,
    current,
    next,
    guaranteed: current ? current.save : 0,
    toNext: next ? next.at - total : 0,
    tiers
  };
}
function cartSummary() {
  const s = Store.get();
  const groups = {};
  let itemsGross = 0,
    volumeOff = 0,
    itemCount = 0;
  s.cart.forEach(line => {
    const p = product(line.sku);
    if (!p) return;
    const lp = linePricing(line);
    itemsGross += lp.gross;
    volumeOff += lp.off;
    itemCount += line.qty;
    groups[p.vendor] = groups[p.vendor] || {
      vendor: p.vendor,
      lines: [],
      net: 0
    };
    groups[p.vendor].lines.push({
      ...line,
      p,
      ...lp
    });
    groups[p.vendor].net += lp.net;
  });
  let spendGuarantee = 0;
  const vendorGroups = Object.values(groups).map(g => {
    const base = spendStatus(g.vendor, 0);
    const st = spendStatus(g.vendor, g.net);
    const tierCredit = Math.min(Math.max(0, st.guaranteed - base.guaranteed), g.net);
    spendGuarantee += tierCredit;
    return {
      ...g,
      spend: st,
      spendBase: base,
      tierCredit
    };
  });
  const afterVolume = itemsGross - volumeOff;
  const total = Math.max(0, afterVolume - spendGuarantee);
  return {
    vendorGroups,
    itemsGross,
    volumeOff,
    spendGuarantee,
    afterVolume,
    total,
    itemCount
  };
}

// ───────── Lead time, stock, arrival, consolidation ─────────────────
function leadMaxDays(p) {
  if (!p || !p.lead) return 5;
  const m = String(p.lead).match(/(\d+)(?!.*\d)/);
  return m ? parseInt(m[1], 10) : 5;
}
function vendorStockOf(p) {
  return p && p.vendorStock || 'in';
}
function stockPenaltyDays(p) {
  const s = vendorStockOf(p);
  return s === 'backorder' ? 14 : s === 'low' ? 3 : 0;
}
function setupEaseOf(p) {
  if (p && p.setupEase) return p.setupEase;
  const c = p && p.cat || '';
  if (/custom|assay|qpcr/i.test(c)) return 1;
  if (/reagent|culture|cytometry|antibod/i.test(c)) return 2;
  return 3;
}
function lineArrivalDays(p) {
  return leadMaxDays(p) + stockPenaltyDays(p);
}
function orderArrivalDays(lines) {
  let d = 0;
  (lines || []).forEach(l => {
    const p = product(l.sku);
    if (p) d = Math.max(d, lineArrivalDays(p));
  });
  return d;
}
function addDays(n) {
  const dt = new Date();
  dt.setDate(dt.getDate() + (n || 0));
  return dt.toISOString().slice(0, 10);
}

// Best whole-order consolidation opportunity for the current cart.
function consolidationOffer() {
  const sum = cartSummary();
  const sub = sum.afterVolume;
  if (sub <= 0 || sum.vendorGroups.length < 1) return null;
  const cons = typeof CONSOLIDATION !== 'undefined' && CONSOLIDATION || window.CONSOLIDATION || {};
  let best = null;
  Object.entries(cons).forEach(([v, rate]) => {
    const save = sub * rate;
    if (!best || save > best.save) best = {
      vendor: v,
      rate,
      save
    };
  });
  if (!best) return null;
  const grp = sum.vendorGroups.find(g => g.vendor === best.vendor);
  best.alreadyPct = grp ? grp.net / sub : 0;
  best.vendors = sum.vendorGroups.length;
  best.subtotal = sub;
  return best;
}

// ───────── Order meta (urgency / need-by) ───────────────────────────
function setOrderMeta(patch) {
  Store.set(s => ({
    ...s,
    orderMeta: {
      ...(s.orderMeta || {}),
      ...patch
    }
  }));
}

// ───────── Inventory actions ────────────────────────────────────────
function invStatus(row) {
  if (row.onHand <= 0) return 'out';
  if (row.onHand <= row.reorder) return 'low';
  return 'ok';
}
function adjustInventory(sku, onHand) {
  Store.set(s => ({
    ...s,
    inventory: s.inventory.map(r => r.sku === sku ? {
      ...r,
      onHand: Math.max(0, onHand)
    } : r)
  }));
}
function setReorderPoint(sku, reorder) {
  Store.set(s => ({
    ...s,
    inventory: s.inventory.map(r => r.sku === sku ? {
      ...r,
      reorder: Math.max(0, reorder)
    } : r)
  }));
}
function updateInventory(sku, patch) {
  Store.set(s => ({
    ...s,
    inventory: s.inventory.map(r => r.sku === sku ? {
      ...r,
      ...patch
    } : r)
  }));
}
function addInventoryItem(row) {
  Store.set(s => {
    if (s.inventory.some(r => r.sku === row.sku)) return {
      ...s,
      inventory: s.inventory.map(r => r.sku === row.sku ? {
        ...r,
        ...row
      } : r)
    };
    return {
      ...s,
      inventory: [row, ...s.inventory]
    };
  });
}
function removeInventoryItem(sku) {
  Store.set(s => ({
    ...s,
    inventory: s.inventory.filter(r => r.sku !== sku)
  }));
}
function lowStockRows() {
  return Store.get().inventory.filter(r => invStatus(r) !== 'ok');
}

// ───────── Orders ───────────────────────────────────────────────────
function placeOrder(details) {
  const sum = cartSummary();
  const s = Store.get();
  const id = 'CB-' + s.nextOrderNum;
  const lines = s.cart.map(l => ({
    sku: l.sku,
    qty: l.qty
  }));
  const vendorSpendAdd = {};
  sum.vendorGroups.forEach(g => {
    vendorSpendAdd[g.vendor] = (vendorSpendAdd[g.vendor] || 0) + g.net;
  });
  Store.set(st => {
    const spend = {
      ...st.spend
    };
    Object.entries(vendorSpendAdd).forEach(([k, v]) => {
      spend[k] = (spend[k] || 0) + v;
    });
    const inventory = st.inventory.map(r => {
      const cl = lines.find(l => l.sku === r.sku);
      return cl ? {
        ...r,
        onHand: r.onHand + cl.qty
      } : r;
    });
    const arrival = addDays(orderArrivalDays(lines));
    const order = {
      id,
      date: new Date().toISOString().slice(0, 10),
      status: 'Processing',
      po: details.po || '',
      ship: details.ship || '',
      notes: details.notes || '',
      urgency: details.urgency || st.orderMeta && st.orderMeta.urgency || 'Medium',
      needBy: details.needBy || st.orderMeta && st.orderMeta.needBy || '',
      arrival,
      lines,
      total: sum.total,
      saved: sum.volumeOff + sum.spendGuarantee
    };
    return {
      ...st,
      cart: [],
      orders: [order, ...st.orders],
      spend,
      inventory,
      nextOrderNum: st.nextOrderNum + 1
    };
  });
  return id;
}
function reorderToCart(orderId) {
  const o = Store.get().orders.find(x => x.id === orderId);
  if (!o) return 0;
  let n = 0;
  o.lines.forEach(l => {
    if (product(l.sku)) {
      addToCart(l.sku, l.qty);
      n++;
    }
  });
  return n;
}
function importOrderRows(rows) {
  let count = 0;
  const byId = {};
  rows.forEach(r => {
    const q = parseInt(r.qty, 10) || 0;
    let p = r.sku && BY_SKU[r.sku.trim()] || CATALOG.find(x => x.catalog.toLowerCase() === String(r.catalog || r.sku || '').trim().toLowerCase());
    if (!p || q <= 0) return;
    const id = r.id && String(r.id).trim() || 'IMP-' + (r.date || 'misc');
    byId[id] = byId[id] || {
      id,
      date: r.date || new Date().toISOString().slice(0, 10),
      lines: []
    };
    byId[id].lines.push({
      sku: p.sku,
      qty: q
    });
    count++;
  });
  const newOrders = Object.values(byId).map(o => {
    const total = o.lines.reduce((a, l) => a + product(l.sku).price * l.qty, 0);
    return {
      ...o,
      status: 'Delivered',
      po: 'imported',
      total,
      saved: 0,
      imported: true
    };
  });
  if (newOrders.length) Store.set(s => ({
    ...s,
    orders: [...newOrders, ...s.orders]
  }));
  return {
    orders: newOrders.length,
    lines: count
  };
}

// ───────── CSV helpers ──────────────────────────────────────────────
function parseCSV(text) {
  const lines = text.replace(/\r/g, '').split('\n').filter(l => l.trim() !== '');
  if (!lines.length) return [];
  const split = l => {
    const out = [];
    let cur = '',
      q = false;
    for (let i = 0; i < l.length; i++) {
      const c = l[i];
      if (c === '"') {
        if (q && l[i + 1] === '"') {
          cur += '"';
          i++;
        } else q = !q;
      } else if (c === ',' && !q) {
        out.push(cur);
        cur = '';
      } else cur += c;
    }
    out.push(cur);
    return out.map(x => x.trim());
  };
  const header = split(lines[0]).map(h => h.toLowerCase());
  return lines.slice(1).map(l => {
    const cells = split(l);
    const row = {};
    header.forEach((h, i) => {
      row[h] = cells[i];
    });
    return row;
  });
}
function toCSV(rows, columns) {
  const esc = v => {
    v = v == null ? '' : String(v);
    return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
  };
  return columns.map(c => c.label).join(',') + '\n' + rows.map(r => columns.map(c => esc(r[c.key])).join(',')).join('\n');
}
function downloadText(filename, text) {
  const blob = new Blob([text], {
    type: 'text/csv'
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ───────── React hook + formatting ───────────────────────────────────
function useStore() {
  const [, force] = React.useReducer(x => x + 1, 0);
  React.useEffect(() => Store.subscribe(force), []);
  return Store.get();
}
function money(n) {
  return '$' + (n || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
function money0(n) {
  return '$' + Math.round(n || 0).toLocaleString('en-US');
}
Object.assign(window, {
  VENDORS,
  CATALOG,
  SPEND_TIERS,
  VOLUME_TIERS,
  BY_SKU,
  Store,
  useStore,
  product,
  vendor,
  addToCart,
  setCartQty,
  removeFromCart,
  clearCart,
  importCartRows,
  lineVolumeOff,
  linePricing,
  spendStatus,
  cartSummary,
  invStatus,
  adjustInventory,
  setReorderPoint,
  lowStockRows,
  updateInventory,
  addInventoryItem,
  removeInventoryItem,
  placeOrder,
  reorderToCart,
  importOrderRows,
  CONSOLIDATION,
  consolidationOffer,
  setOrderMeta,
  leadMaxDays,
  vendorStockOf,
  stockPenaltyDays,
  setupEaseOf,
  lineArrivalDays,
  orderArrivalDays,
  addDays,
  parseCSV,
  toCSV,
  downloadText,
  money,
  money0
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/store-cellsbin.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/store.jsx
try { (() => {
// ProcureWide — application data + state store.
// Plain JS singleton with localStorage persistence + a tiny React hook.
// No AI. This is an operational ordering platform: catalog, cart, inventory,
// order history, and volume/spend discount guarantees.

// ───────── Vendors ──────────────────────────────────────────────────
const VENDORS = {
  thermo: {
    name: 'Thermo Fisher Scientific',
    logo: 'thermo-fisher.png'
  },
  fisher: {
    name: 'Fisher Scientific',
    logo: 'fisher-scientific.png'
  },
  sigma: {
    name: 'Sigma-Aldrich',
    logo: null
  },
  biorad: {
    name: 'Bio-Rad',
    logo: 'biorad.png'
  },
  cst: {
    name: 'Cell Signaling Technology',
    logo: 'cell-signaling.png'
  },
  abcam: {
    name: 'Abcam',
    logo: 'Abcam.png'
  },
  agilent: {
    name: 'Agilent',
    logo: 'agilent.png'
  },
  genscript: {
    name: 'GenScript',
    logo: 'genscript.avif'
  },
  takara: {
    name: 'Takara Bio',
    logo: 'takara.webp'
  },
  stemcell: {
    name: 'STEMCELL Technologies',
    logo: 'stemcell.png'
  },
  goldbio: {
    name: 'Gold Biotechnology',
    logo: 'goldbio.webp'
  },
  beckman: {
    name: 'Beckman Coulter',
    logo: 'beckman-coulter.png'
  },
  tbd: {
    name: 'ProcureWide will source',
    logo: null,
    abbr: 'NEW'
  }
};

// ───────── Catalog ──────────────────────────────────────────────────
// price = your negotiated price; list = catalog list price.
const CATALOG = [
// Cell culture
{
  sku: 'TF-11965',
  name: 'DMEM, high glucose, no glutamine',
  vendor: 'thermo',
  catalog: '11965-092',
  cat: 'Cell culture',
  unit: '500 mL',
  price: 56.80,
  list: 63.73,
  lead: '3–5 days',
  badges: ['GMP', 'ISO 9001'],
  storage: '2–8 °C'
}, {
  sku: 'TF-26140',
  name: 'Fetal Bovine Serum (FBS), US-sourced',
  vendor: 'thermo',
  catalog: '26140-079',
  cat: 'Cell culture',
  unit: '500 mL',
  price: 489.00,
  list: 545.00,
  lead: '5–7 days',
  badges: ['Heat-inactivated', 'Gamma-irradiated'],
  storage: '−20 °C'
}, {
  sku: 'TF-25200',
  name: 'Trypsin-EDTA (0.25%), phenol red',
  vendor: 'thermo',
  catalog: '25200-056',
  cat: 'Cell culture',
  unit: '100 mL',
  price: 24.40,
  list: 28.10,
  lead: '3–5 days',
  badges: ['Sterile'],
  storage: '−20 °C'
}, {
  sku: 'TF-15140',
  name: 'Penicillin-Streptomycin (10,000 U/mL)',
  vendor: 'thermo',
  catalog: '15140-122',
  cat: 'Cell culture',
  unit: '100 mL',
  price: 31.20,
  list: 35.90,
  lead: '3–5 days',
  badges: ['Sterile'],
  storage: '−20 °C'
}, {
  sku: 'TF-11875',
  name: 'RPMI 1640 Medium, with L-glutamine',
  vendor: 'thermo',
  catalog: '11875-093',
  cat: 'Cell culture',
  unit: '500 mL',
  price: 41.90,
  list: 47.00,
  lead: '3–5 days',
  badges: ['GMP'],
  storage: '2–8 °C'
}, {
  sku: 'SC-07920',
  name: 'mTeSR Plus hPSC Maintenance Medium',
  vendor: 'stemcell',
  catalog: '100-0276',
  cat: 'Cell culture',
  unit: '500 mL kit',
  price: 372.00,
  list: 415.00,
  lead: '4–6 days',
  badges: ['Feeder-free'],
  storage: '−20 °C'
}, {
  sku: 'SI-D8537',
  name: 'DPBS, no calcium, no magnesium',
  vendor: 'sigma',
  catalog: 'D8537-500ML',
  cat: 'Cell culture',
  unit: '500 mL',
  price: 18.60,
  list: 22.40,
  lead: '2–4 days',
  badges: ['Sterile-filtered'],
  storage: 'RT'
},
// Antibodies
{
  sku: 'CS-4970',
  name: 'β-Actin (13E5) Rabbit mAb',
  vendor: 'cst',
  catalog: '4970S',
  cat: 'Antibodies',
  unit: '100 µL',
  price: 408.00,
  list: 445.00,
  lead: '2–3 days',
  badges: ['WB', 'Validated'],
  storage: '−20 °C'
}, {
  sku: 'CS-9664',
  name: 'Cleaved Caspase-3 (Asp175) Rabbit mAb',
  vendor: 'cst',
  catalog: '9664T',
  cat: 'Antibodies',
  unit: '100 µL',
  price: 425.00,
  list: 462.00,
  lead: '2–3 days',
  badges: ['WB', 'IHC'],
  storage: '−20 °C'
}, {
  sku: 'AB-ab8245',
  name: 'Anti-GAPDH antibody [6C5]',
  vendor: 'abcam',
  catalog: 'ab8245',
  cat: 'Antibodies',
  unit: '100 µg',
  price: 389.00,
  list: 432.00,
  lead: '3–5 days',
  badges: ['WB', 'Loading control'],
  storage: '−20 °C'
}, {
  sku: 'AB-ab32124',
  name: 'Anti-PD-L1 antibody [28-8]',
  vendor: 'abcam',
  catalog: 'ab205921',
  cat: 'Antibodies',
  unit: '100 µL',
  price: 510.00,
  list: 565.00,
  lead: '4–6 days',
  badges: ['IHC', 'Validated'],
  storage: '−20 °C'
},
// Molecular biology
{
  sku: 'TK-R001A',
  name: 'TaKaRa Taq DNA Polymerase',
  vendor: 'takara',
  catalog: 'R001A',
  cat: 'Molecular biology',
  unit: '250 U',
  price: 78.00,
  list: 92.00,
  lead: '3–5 days',
  badges: ['Hot-start'],
  storage: '−20 °C'
}, {
  sku: 'BR-1725271',
  name: 'SsoAdvanced SYBR Green Supermix',
  vendor: 'biorad',
  catalog: '1725271',
  cat: 'Molecular biology',
  unit: '500 rxn',
  price: 312.00,
  list: 358.00,
  lead: '3–5 days',
  badges: ['qPCR'],
  storage: '−20 °C'
}, {
  sku: 'GS-SC1696',
  name: 'GenScript Gene Synthesis (per kb)',
  vendor: 'genscript',
  catalog: 'SC1696',
  cat: 'Molecular biology',
  unit: 'per kb',
  price: 89.00,
  list: 99.00,
  lead: '7–10 days',
  badges: ['Sequence-verified'],
  storage: 'RT'
}, {
  sku: 'TF-18080',
  name: 'SuperScript IV Reverse Transcriptase',
  vendor: 'thermo',
  catalog: '18090-010',
  cat: 'Molecular biology',
  unit: '10,000 U',
  price: 398.00,
  list: 441.00,
  lead: '3–5 days',
  badges: ['cDNA'],
  storage: '−20 °C'
}, {
  sku: 'AG-5067',
  name: 'Agilent High Sensitivity DNA Kit',
  vendor: 'agilent',
  catalog: '5067-4626',
  cat: 'Molecular biology',
  unit: '25 assays',
  price: 248.00,
  list: 276.00,
  lead: '4–6 days',
  badges: ['Bioanalyzer'],
  storage: '4 °C'
},
// Reagents
{
  sku: 'GB-A555',
  name: 'IPTG, Dioxane-free (≥99%)',
  vendor: 'goldbio',
  catalog: 'I2481C25',
  cat: 'Reagents',
  unit: '25 g',
  price: 64.00,
  list: 74.00,
  lead: '2–4 days',
  badges: ['Molecular grade'],
  storage: 'RT'
}, {
  sku: 'GB-A777',
  name: 'Ampicillin, Sodium Salt',
  vendor: 'goldbio',
  catalog: 'A-301-25',
  cat: 'Reagents',
  unit: '25 g',
  price: 42.00,
  list: 49.00,
  lead: '2–4 days',
  badges: ['Cell culture tested'],
  storage: '−20 °C'
}, {
  sku: 'SI-E7023',
  name: 'Ethanol, 200 proof, molecular biology',
  vendor: 'sigma',
  catalog: 'E7023-500ML',
  cat: 'Reagents',
  unit: '500 mL',
  price: 38.50,
  list: 44.00,
  lead: '2–4 days',
  badges: ['ACS grade'],
  storage: 'RT'
},
// Plasticware / consumables
{
  sku: 'FS-1256',
  name: 'Pipette Tips, 1000 µL, filtered, sterile',
  vendor: 'fisher',
  catalog: '02-707-404',
  cat: 'Plasticware',
  unit: 'rack ×96 (×10)',
  price: 92.00,
  list: 108.00,
  lead: '1–3 days',
  badges: ['RNase-free', 'Sterile'],
  storage: 'RT'
}, {
  sku: 'FS-3375',
  name: 'Conical Tubes, 50 mL, sterile',
  vendor: 'fisher',
  catalog: '14-432-22',
  cat: 'Plasticware',
  unit: 'case ×500',
  price: 168.00,
  list: 192.00,
  lead: '1–3 days',
  badges: ['Sterile'],
  storage: 'RT'
}, {
  sku: 'FS-1538',
  name: 'Conical Tubes, 15 mL, sterile',
  vendor: 'fisher',
  catalog: '14-959-53A',
  cat: 'Plasticware',
  unit: 'case ×500',
  price: 142.00,
  list: 164.00,
  lead: '1–3 days',
  badges: ['Sterile'],
  storage: 'RT'
}, {
  sku: 'FS-T75',
  name: 'Cell Culture Flask, T75, vented cap',
  vendor: 'fisher',
  catalog: '13-680-65',
  cat: 'Plasticware',
  unit: 'case ×100',
  price: 214.00,
  list: 248.00,
  lead: '1–3 days',
  badges: ['TC-treated', 'Sterile'],
  storage: 'RT'
}, {
  sku: 'FS-96WP',
  name: '96-Well Plate, flat bottom, TC-treated',
  vendor: 'fisher',
  catalog: '12-565-501',
  cat: 'Plasticware',
  unit: 'case ×50',
  price: 186.00,
  list: 210.00,
  lead: '1–3 days',
  badges: ['TC-treated', 'Sterile'],
  storage: 'RT'
}, {
  sku: 'FS-MCT15',
  name: 'Microcentrifuge Tubes, 1.5 mL',
  vendor: 'fisher',
  catalog: '05-408-129',
  cat: 'Plasticware',
  unit: 'bag ×500',
  price: 36.00,
  list: 43.00,
  lead: '1–3 days',
  badges: ['DNase/RNase-free'],
  storage: 'RT'
}, {
  sku: 'FS-NGL',
  name: 'Nitrile Exam Gloves, powder-free (M)',
  vendor: 'fisher',
  catalog: '19-130-1597B',
  cat: 'Plasticware',
  unit: 'box ×200 (×10)',
  price: 118.00,
  list: 134.00,
  lead: '1–3 days',
  badges: ['Powder-free'],
  storage: 'RT'
}];

// ───────── Discount programs ────────────────────────────────────────
// Spend-tier guarantees per vendor (quarter-to-date based).
// "Spend $5,000 on Thermo → we guarantee $1,000 off your order."
const SPEND_TIERS = {
  thermo: [{
    at: 2500,
    save: 300
  }, {
    at: 5000,
    save: 1000
  }, {
    at: 10000,
    save: 2500
  }],
  fisher: [{
    at: 1500,
    save: 150
  }, {
    at: 4000,
    save: 600
  }, {
    at: 8000,
    save: 1600
  }],
  cst: [{
    at: 2000,
    save: 250
  }, {
    at: 5000,
    save: 850
  }],
  abcam: [{
    at: 1500,
    save: 180
  }, {
    at: 4000,
    save: 640
  }],
  biorad: [{
    at: 1500,
    save: 200
  }, {
    at: 4000,
    save: 720
  }],
  sigma: [{
    at: 1000,
    save: 120
  }, {
    at: 3000,
    save: 480
  }]
};

// Per-product volume tiers (buy N+ units, % off your line).
const VOLUME_TIERS = {
  default: [{
    qty: 5,
    off: 0.05
  }, {
    qty: 10,
    off: 0.10
  }, {
    qty: 25,
    off: 0.16
  }]
};

// ───────── Seed state ───────────────────────────────────────────────
function seedInventory() {
  // {sku, onHand, reorder, lot, expiry, location}
  return [{
    sku: 'TF-11965',
    onHand: 2,
    reorder: 6,
    lot: 'L2451-09',
    expiry: '2026-11-30',
    location: 'Cold room A · Shelf 2'
  }, {
    sku: 'TF-26140',
    onHand: 1,
    reorder: 4,
    lot: 'FBS-3318',
    expiry: '2027-02-28',
    location: 'Freezer −20 · Rack 1'
  }, {
    sku: 'TF-25200',
    onHand: 8,
    reorder: 6,
    lot: 'TR-8841',
    expiry: '2026-09-15',
    location: 'Freezer −20 · Rack 2'
  }, {
    sku: 'TF-15140',
    onHand: 3,
    reorder: 5,
    lot: 'PS-2207',
    expiry: '2026-12-01',
    location: 'Freezer −20 · Rack 2'
  }, {
    sku: 'CS-4970',
    onHand: 1,
    reorder: 2,
    lot: 'AB-9914',
    expiry: '2027-06-30',
    location: 'Freezer −20 · Box 7'
  }, {
    sku: 'CS-9664',
    onHand: 2,
    reorder: 2,
    lot: 'AB-7740',
    expiry: '2027-03-31',
    location: 'Freezer −20 · Box 7'
  }, {
    sku: 'BR-1725271',
    onHand: 0,
    reorder: 2,
    lot: 'SG-5521',
    expiry: '2026-10-31',
    location: 'Freezer −20 · Rack 4'
  }, {
    sku: 'FS-1256',
    onHand: 14,
    reorder: 10,
    lot: '—',
    expiry: '—',
    location: 'Consumables · Bay 3'
  }, {
    sku: 'FS-3375',
    onHand: 4,
    reorder: 3,
    lot: '—',
    expiry: '—',
    location: 'Consumables · Bay 1'
  }, {
    sku: 'FS-MCT15',
    onHand: 22,
    reorder: 8,
    lot: '—',
    expiry: '—',
    location: 'Consumables · Bay 3'
  }, {
    sku: 'GB-A777',
    onHand: 1,
    reorder: 2,
    lot: 'AMP-1180',
    expiry: '2027-01-31',
    location: 'Freezer −20 · Box 2'
  }, {
    sku: 'FS-NGL',
    onHand: 6,
    reorder: 4,
    lot: '—',
    expiry: '—',
    location: 'Consumables · Bay 4'
  }];
}
function seedOrders() {
  const raw = [{
    id: 'PW-04812',
    date: '2026-05-18',
    status: 'Delivered',
    po: 'HELIO-2026-114',
    tracking: '1Z 99X 471 02 8841 330',
    carrier: 'UPS',
    urgency: 'Medium',
    lines: [{
      sku: 'TF-11965',
      qty: 6
    }, {
      sku: 'TF-25200',
      qty: 4
    }]
  }, {
    id: 'PW-04801',
    date: '2026-05-12',
    status: 'In transit',
    po: 'HELIO-2026-111',
    tracking: '7712 0049 8830',
    carrier: 'FedEx',
    urgency: 'High',
    lines: [{
      sku: 'BR-1725271',
      qty: 2
    }, {
      sku: 'TK-R001A',
      qty: 3
    }]
  }, {
    id: 'PW-04788',
    date: '2026-05-02',
    status: 'Delivered',
    po: 'HELIO-2026-108',
    tracking: '1Z 99X 471 02 8612 904',
    carrier: 'UPS',
    urgency: 'Low',
    lines: [{
      sku: 'CS-4970',
      qty: 2
    }, {
      sku: 'AB-ab8245',
      qty: 1
    }]
  }, {
    id: 'PW-04760',
    date: '2026-04-21',
    status: 'Delivered',
    po: 'HELIO-2026-101',
    tracking: '9261 2910 4471 9920',
    carrier: 'USPS',
    urgency: 'Medium',
    lines: [{
      sku: 'FS-1256',
      qty: 3
    }, {
      sku: 'FS-3375',
      qty: 2
    }, {
      sku: 'FS-MCT15',
      qty: 4
    }]
  }, {
    id: 'PW-04744',
    date: '2026-04-09',
    status: 'Delivered',
    po: 'HELIO-2026-097',
    tracking: '7712 0033 1180',
    carrier: 'FedEx',
    urgency: 'Low',
    lines: [{
      sku: 'TF-26140',
      qty: 2
    }]
  }, {
    id: 'PW-04702',
    date: '2026-02-16',
    status: 'Delivered',
    po: 'HELIO-2026-061',
    tracking: '1Z 99X 471 02 8013 552',
    carrier: 'UPS',
    urgency: 'Medium',
    lines: [{
      sku: 'TF-11965',
      qty: 4
    }, {
      sku: 'TF-15140',
      qty: 3
    }, {
      sku: 'SI-D8537',
      qty: 2
    }]
  }, {
    id: 'PW-04680',
    date: '2025-12-03',
    status: 'Delivered',
    po: 'HELIO-2025-142',
    tracking: '9261 2910 4471 5521',
    carrier: 'USPS',
    urgency: 'Low',
    lines: [{
      sku: 'CS-9664',
      qty: 2
    }, {
      sku: 'AB-ab32124',
      qty: 1
    }]
  }, {
    id: 'PW-04651',
    date: '2025-09-18',
    status: 'Delivered',
    po: 'HELIO-2025-101',
    tracking: '7712 0019 0042',
    carrier: 'FedEx',
    urgency: 'Medium',
    lines: [{
      sku: 'TF-26140',
      qty: 3
    }, {
      sku: 'TF-18080',
      qty: 1
    }]
  }, {
    id: 'PW-04610',
    date: '2025-05-27',
    status: 'Delivered',
    po: 'HELIO-2025-048',
    tracking: '1Z 99X 471 02 7740 118',
    carrier: 'UPS',
    urgency: 'Low',
    lines: [{
      sku: 'FS-T75',
      qty: 2
    }, {
      sku: 'FS-96WP',
      qty: 2
    }, {
      sku: 'FS-NGL',
      qty: 3
    }]
  }];
  const find = sku => CATALOG.find(p => p.sku === sku);
  return raw.map(o => {
    const total = o.lines.reduce((a, l) => {
      const p = find(l.sku);
      return a + (p ? p.price * l.qty : 0);
    }, 0);
    const saved = o.lines.reduce((a, l) => {
      const p = find(l.sku);
      return a + (p ? (p.list - p.price) * l.qty : 0);
    }, 0);
    return {
      ...o,
      total,
      saved
    };
  });
}

// Quarter-to-date spend already booked per vendor (before anything in cart).
function seedSpend() {
  return {
    thermo: 5240,
    fisher: 1620,
    cst: 2180,
    abcam: 1180,
    biorad: 980,
    sigma: 1090
  };
}
function seedState() {
  return {
    account: {
      name: 'Helio Bio, Inc.',
      plan: 'Growth',
      initials: 'HB',
      quarter: 'Q2 2026'
    },
    cart: [],
    // {sku, qty}
    customCatalog: [],
    // pending, non-catalog items the customer has requested
    nextReqNum: 1,
    inventory: seedInventory(),
    orders: seedOrders(),
    spend: seedSpend(),
    orderMeta: {
      urgency: 'Medium',
      needBy: ''
    },
    nextOrderNum: 4825
  };
}

// Whole-order consolidation rate: route your ENTIRE order through this vendor → % off.
const CONSOLIDATION = {
  thermo: 0.28,
  fisher: 0.18,
  biorad: 0.16,
  cst: 0.15,
  abcam: 0.14,
  sigma: 0.12
};

// ───────── Store singleton ──────────────────────────────────────────
const LS_KEY = 'pw_app_store_v5';
const Store = function () {
  let state = load();
  const subs = new Set();
  function load() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return seedState();
      const parsed = JSON.parse(raw);
      return {
        ...seedState(),
        ...parsed
      };
    } catch (e) {
      return seedState();
    }
  }
  function persist() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch (e) {}
  }
  function set(updater) {
    state = typeof updater === 'function' ? updater(state) : {
      ...state,
      ...updater
    };
    persist();
    subs.forEach(fn => fn());
  }
  function get() {
    return state;
  }
  function subscribe(fn) {
    subs.add(fn);
    return () => subs.delete(fn);
  }
  function reset() {
    set(seedState());
  }
  return {
    get,
    set,
    subscribe,
    reset
  };
}();

// ───────── Lookups ──────────────────────────────────────────────────
const BY_SKU = Object.fromEntries(CATALOG.map(p => [p.sku, p]));
// Resolve a sku to either an official catalog product or a customer-requested
// (pending) custom item. Custom items live in state.customCatalog so they
// persist and flow through cart, totals, and order history just like catalog
// items — but carry `pending: true` until an admin officializes them.
function product(sku) {
  if (BY_SKU[sku]) return BY_SKU[sku];
  const cc = Store && Store.get().customCatalog || [];
  return cc.find(p => p.sku === sku);
}
function vendor(key) {
  return VENDORS[key] || {
    name: key,
    logo: null
  };
}

// ───────── Cart actions ─────────────────────────────────────────────
function addToCart(sku, qty = 1) {
  Store.set(s => {
    const i = s.cart.findIndex(l => l.sku === sku);
    const cart = [...s.cart];
    if (i >= 0) cart[i] = {
      ...cart[i],
      qty: cart[i].qty + qty
    };else cart.push({
      sku,
      qty
    });
    return {
      ...s,
      cart
    };
  });
}
function setCartQty(sku, qty) {
  Store.set(s => {
    const cart = s.cart.map(l => l.sku === sku ? {
      ...l,
      qty: Math.max(0, qty)
    } : l).filter(l => l.qty > 0);
    return {
      ...s,
      cart
    };
  });
}
function removeFromCart(sku) {
  Store.set(s => ({
    ...s,
    cart: s.cart.filter(l => l.sku !== sku)
  }));
}
function clearCart() {
  Store.set(s => ({
    ...s,
    cart: []
  }));
}

// ───────── Custom (non-catalog) item requests ────────────────────
function slugReq(s) {
  const n = Store.get().nextReqNum || 1;
  return {
    sku: 'REQ-' + String(1000 + n),
    n
  };
}
// item: {name, catalog, link, unit, listPrice, detail, qty}
// Returns the synthetic sku of the created request.
function addCustomItem(item) {
  const {
    sku,
    n
  } = slugReq();
  const price = item.listPrice != null && item.listPrice !== '' && !isNaN(parseFloat(item.listPrice)) ? parseFloat(item.listPrice) : 0;
  const rec = {
    sku,
    name: (item.name || '').trim() || 'Custom item',
    vendor: 'tbd',
    catalog: (item.catalog || '').trim() || '—',
    cat: 'Custom request',
    unit: (item.unit || '').trim() || 'Each',
    price,
    // estimate only — actual set after sourcing
    list: price,
    estimated: price > 0,
    lead: 'After sourcing',
    badges: [],
    storage: '—',
    link: (item.link || '').trim(),
    detail: (item.detail || '').trim(),
    pending: true,
    requestedAt: new Date().toISOString().slice(0, 10)
  };
  Store.set(s => ({
    ...s,
    customCatalog: [rec, ...(s.customCatalog || [])],
    nextReqNum: (s.nextReqNum || 1) + 1
  }));
  addToCart(sku, Math.max(1, parseInt(item.qty, 10) || 1));
  return sku;
}
function updateCustomItem(sku, patch) {
  Store.set(s => ({
    ...s,
    customCatalog: (s.customCatalog || []).map(p => p.sku === sku ? {
      ...p,
      ...patch
    } : p)
  }));
}
function removeCustomItem(sku) {
  Store.set(s => ({
    ...s,
    cart: s.cart.filter(l => l.sku !== sku),
    customCatalog: (s.customCatalog || []).filter(p => p.sku !== sku)
  }));
}
function importCartRows(rows) {
  // rows: [{sku?, catalog?, name?, link?, price?, list?, qty}]
  // Matched rows go to cart against the catalog. Unmatched rows that carry
  // enough info (a name/description, or a reference + qty) become PENDING
  // custom items — added to cart and to the customer's custom catalog, awaiting
  // admin approval before they're officialized.
  let added = 0,
    custom = 0,
    skipped = 0;
  const get = (r, ...keys) => {
    for (const k of keys) {
      if (r[k] != null && String(r[k]).trim() !== '') return String(r[k]).trim();
    }
    return '';
  };
  const pendingRecs = [];
  Store.set(s => {
    const cart = [...s.cart];
    let reqN = s.nextReqNum || 1;
    rows.forEach(r => {
      const q = parseInt(get(r, 'qty', 'quantity'), 10) || 0;
      if (q <= 0) {
        skipped++;
        return;
      }
      const skuRef = get(r, 'sku');
      const catRef = get(r, 'catalog', 'catalog #', 'catalog#', 'cat #');
      let p = skuRef && BY_SKU[skuRef];
      if (!p && catRef) p = CATALOG.find(x => x.catalog.toLowerCase() === catRef.toLowerCase());
      if (!p && skuRef) p = CATALOG.find(x => x.catalog.toLowerCase() === skuRef.toLowerCase());
      if (p) {
        const i = cart.findIndex(l => l.sku === p.sku);
        if (i >= 0) cart[i] = {
          ...cart[i],
          qty: cart[i].qty + q
        };else cart.push({
          sku: p.sku,
          qty: q
        });
        added++;
        return;
      }
      // No catalog match — build a pending custom item if we have anything to go on.
      const name = get(r, 'name', 'item', 'description', 'product');
      const ref = catRef || skuRef;
      if (!name && !ref) {
        skipped++;
        return;
      }
      const priceRaw = get(r, 'list price', 'list', 'price', 'unit price');
      const price = priceRaw && !isNaN(parseFloat(priceRaw.replace(/[$,]/g, ''))) ? parseFloat(priceRaw.replace(/[$,]/g, '')) : 0;
      const sku = 'REQ-' + String(1000 + reqN);
      reqN++;
      const rec = {
        sku,
        name: name || 'Item ' + ref,
        vendor: 'tbd',
        catalog: ref || '—',
        cat: 'Custom request',
        unit: get(r, 'unit', 'size') || 'Each',
        price,
        list: price,
        estimated: price > 0,
        lead: 'After sourcing',
        badges: [],
        storage: '—',
        link: get(r, 'link', 'url'),
        detail: get(r, 'notes', 'specs', 'detail'),
        pending: true,
        fromCsv: true,
        requestedAt: new Date().toISOString().slice(0, 10)
      };
      pendingRecs.push(rec);
      cart.push({
        sku,
        qty: q
      });
      custom++;
    });
    return {
      ...s,
      cart,
      customCatalog: [...pendingRecs, ...(s.customCatalog || [])],
      nextReqNum: reqN
    };
  });
  return {
    added,
    custom,
    skipped
  };
}

// ───────── Discount math ────────────────────────────────────────────
// Volume discount on a single cart line.
function lineVolumeOff(qty) {
  const tiers = VOLUME_TIERS.default;
  let off = 0;
  for (const t of tiers) if (qty >= t.qty) off = t.off;
  return off;
}
function linePricing(line) {
  const p = product(line.sku);
  if (!p) return {
    gross: 0,
    off: 0,
    net: 0,
    offPct: 0
  };
  const gross = (p.price || 0) * line.qty;
  const offPct = p.pending ? 0 : lineVolumeOff(line.qty);
  const off = gross * offPct;
  return {
    gross,
    off,
    net: gross - off,
    offPct,
    pending: !!p.pending,
    estimated: !!p.estimated
  };
}

// Spend-tier status for a vendor given booked spend + (optional) cart additions.
function spendStatus(vendorKey, extra = 0) {
  const tiers = SPEND_TIERS[vendorKey];
  const booked = Store.get().spend[vendorKey] || 0;
  const total = booked + extra;
  if (!tiers) return {
    booked,
    total,
    current: null,
    next: null,
    guaranteed: 0,
    tiers: []
  };
  let current = null,
    next = null;
  for (const t of tiers) {
    if (total >= t.at) current = t;else {
      next = t;
      break;
    }
  }
  return {
    booked,
    total,
    current,
    next,
    guaranteed: current ? current.save : 0,
    toNext: next ? next.at - total : 0,
    tiers
  };
}

// Cart grouped by vendor with discount summary.
function cartSummary() {
  const s = Store.get();
  const groups = {};
  let itemsGross = 0,
    volumeOff = 0,
    itemCount = 0,
    pendingCount = 0,
    hasUnpriced = false;
  s.cart.forEach(line => {
    const p = product(line.sku);
    if (!p) return;
    const lp = linePricing(line);
    itemsGross += lp.gross;
    volumeOff += lp.off;
    itemCount += line.qty;
    if (p.pending) {
      pendingCount += 1;
      if (!p.price) hasUnpriced = true;
    }
    groups[p.vendor] = groups[p.vendor] || {
      vendor: p.vendor,
      lines: [],
      net: 0
    };
    groups[p.vendor].lines.push({
      ...line,
      p,
      ...lp
    });
    groups[p.vendor].net += lp.net;
  });
  let spendGuarantee = 0; // tier credit newly unlocked by THIS cart only
  const vendorGroups = Object.values(groups).map(g => {
    const base = spendStatus(g.vendor, 0); // booked QTD, before this cart
    const st = spendStatus(g.vendor, g.net); // including this cart
    // A quarterly rebate already earned is NOT a deduction on this order.
    // Only credit the incremental tier this cart crosses, capped at the
    // vendor's cart subtotal so an order can never go below $0.
    const tierCredit = Math.min(Math.max(0, st.guaranteed - base.guaranteed), g.net);
    spendGuarantee += tierCredit;
    return {
      ...g,
      spend: st,
      spendBase: base,
      tierCredit
    };
  });
  const afterVolume = itemsGross - volumeOff;
  const total = Math.max(0, afterVolume - spendGuarantee);
  return {
    vendorGroups,
    itemsGross,
    volumeOff,
    spendGuarantee,
    afterVolume,
    total,
    itemCount,
    pendingCount,
    hasUnpriced
  };
}

// ───────── Lead time, stock, arrival, consolidation ──────────────────
function leadMaxDays(p) {
  if (!p || !p.lead) return 5;
  const m = String(p.lead).match(/(\d+)(?!.*\d)/);
  return m ? parseInt(m[1], 10) : 5;
}
function vendorStockOf(p) {
  return p && p.vendorStock || 'in';
}
function stockPenaltyDays(p) {
  const s = vendorStockOf(p);
  return s === 'backorder' ? 14 : s === 'low' ? 3 : 0;
}
function setupEaseOf(p) {
  if (p && p.setupEase) return p.setupEase;
  const c = p && p.cat || '';
  if (/custom|assay|molecular/i.test(c)) return 1;
  if (/reagent|culture|cytometry|antibod/i.test(c)) return 2;
  return 3;
}
function lineArrivalDays(p) {
  return leadMaxDays(p) + stockPenaltyDays(p);
}
function orderArrivalDays(lines) {
  let d = 0;
  (lines || []).forEach(l => {
    const p = product(l.sku);
    if (p) d = Math.max(d, lineArrivalDays(p));
  });
  return d;
}
function addDays(n) {
  const dt = new Date();
  dt.setDate(dt.getDate() + (n || 0));
  return dt.toISOString().slice(0, 10);
}
function consolidationOffer() {
  const sum = cartSummary();
  const sub = sum.afterVolume;
  if (sub <= 0 || sum.vendorGroups.length < 1) return null;
  const cons = typeof CONSOLIDATION !== 'undefined' && CONSOLIDATION || window.CONSOLIDATION || {};
  let best = null;
  Object.entries(cons).forEach(([v, rate]) => {
    const save = sub * rate;
    if (!best || save > best.save) best = {
      vendor: v,
      rate,
      save
    };
  });
  if (!best) return null;
  const grp = sum.vendorGroups.find(g => g.vendor === best.vendor);
  best.alreadyPct = grp ? grp.net / sub : 0;
  best.vendors = sum.vendorGroups.length;
  best.subtotal = sub;
  return best;
}
function setOrderMeta(patch) {
  Store.set(s => ({
    ...s,
    orderMeta: {
      ...(s.orderMeta || {}),
      ...patch
    }
  }));
}

// ───────── Inventory actions ────────────────────────────────────────
function invStatus(row) {
  if (row.onHand <= 0) return 'out';
  if (row.onHand <= row.reorder) return 'low';
  return 'ok';
}
function adjustInventory(sku, onHand) {
  Store.set(s => ({
    ...s,
    inventory: s.inventory.map(r => r.sku === sku ? {
      ...r,
      onHand: Math.max(0, onHand)
    } : r)
  }));
}
function setReorderPoint(sku, reorder) {
  Store.set(s => ({
    ...s,
    inventory: s.inventory.map(r => r.sku === sku ? {
      ...r,
      reorder: Math.max(0, reorder)
    } : r)
  }));
}
function updateInventory(sku, patch) {
  Store.set(s => ({
    ...s,
    inventory: s.inventory.map(r => r.sku === sku ? {
      ...r,
      ...patch
    } : r)
  }));
}
function addInventoryItem(row) {
  Store.set(s => {
    if (s.inventory.some(r => r.sku === row.sku)) return {
      ...s,
      inventory: s.inventory.map(r => r.sku === row.sku ? {
        ...r,
        ...row
      } : r)
    };
    return {
      ...s,
      inventory: [row, ...s.inventory]
    };
  });
}
function removeInventoryItem(sku) {
  Store.set(s => ({
    ...s,
    inventory: s.inventory.filter(r => r.sku !== sku)
  }));
}
function lowStockRows() {
  return Store.get().inventory.filter(r => invStatus(r) !== 'ok');
}

// ───────── Orders ───────────────────────────────────────────────────
function placeOrder(details) {
  const sum = cartSummary();
  const s = Store.get();
  const id = 'PW-0' + s.nextOrderNum;
  const lines = s.cart.map(l => ({
    sku: l.sku,
    qty: l.qty
  }));
  const vendorSpendAdd = {};
  sum.vendorGroups.forEach(g => {
    vendorSpendAdd[g.vendor] = (vendorSpendAdd[g.vendor] || 0) + g.net;
  });
  Store.set(st => {
    // bump spend
    const spend = {
      ...st.spend
    };
    Object.entries(vendorSpendAdd).forEach(([k, v]) => {
      spend[k] = (spend[k] || 0) + v;
    });
    // receive into inventory
    const inventory = st.inventory.map(r => {
      const cl = lines.find(l => l.sku === r.sku);
      return cl ? {
        ...r,
        onHand: r.onHand + cl.qty
      } : r;
    });
    const order = {
      id,
      date: new Date().toISOString().slice(0, 10),
      status: 'Processing',
      po: details.po || '',
      ship: details.ship || '',
      notes: details.notes || '',
      tracking: '',
      carrier: '',
      urgency: details.urgency || st.orderMeta && st.orderMeta.urgency || 'Medium',
      needBy: details.needBy || st.orderMeta && st.orderMeta.needBy || '',
      arrival: addDays(orderArrivalDays(lines)),
      lines,
      total: sum.total,
      saved: sum.volumeOff + sum.spendGuarantee
    };
    return {
      ...st,
      cart: [],
      orders: [order, ...st.orders],
      spend,
      inventory,
      nextOrderNum: st.nextOrderNum + 1
    };
  });
  return id;
}
function reorderToCart(orderId) {
  const o = Store.get().orders.find(x => x.id === orderId);
  if (!o) return 0;
  let n = 0;
  o.lines.forEach(l => {
    if (product(l.sku)) {
      addToCart(l.sku, l.qty);
      n++;
    }
  });
  return n;
}
function importOrderRows(rows) {
  // rows: [{id?, date?, sku/catalog, qty}] — group consecutive by id (or single synthetic order)
  let count = 0;
  const byId = {};
  rows.forEach(r => {
    const q = parseInt(r.qty, 10) || 0;
    let p = r.sku && BY_SKU[r.sku.trim()] || CATALOG.find(x => x.catalog.toLowerCase() === String(r.catalog || r.sku || '').trim().toLowerCase());
    if (!p || q <= 0) return;
    const id = r.id && String(r.id).trim() || 'IMP-' + (r.date || 'misc');
    byId[id] = byId[id] || {
      id,
      date: r.date || new Date().toISOString().slice(0, 10),
      lines: []
    };
    byId[id].lines.push({
      sku: p.sku,
      qty: q
    });
    count++;
  });
  const newOrders = Object.values(byId).map(o => {
    const total = o.lines.reduce((a, l) => a + product(l.sku).price * l.qty, 0);
    return {
      ...o,
      status: 'Delivered',
      po: 'imported',
      total,
      saved: 0,
      imported: true
    };
  });
  if (newOrders.length) {
    Store.set(s => ({
      ...s,
      orders: [...newOrders, ...s.orders]
    }));
  }
  return {
    orders: newOrders.length,
    lines: count
  };
}

// ───────── CSV helpers ──────────────────────────────────────────────
function parseCSV(text) {
  const lines = text.replace(/\r/g, '').split('\n').filter(l => l.trim() !== '');
  if (!lines.length) return [];
  const split = l => {
    const out = [];
    let cur = '',
      q = false;
    for (let i = 0; i < l.length; i++) {
      const c = l[i];
      if (c === '"') {
        if (q && l[i + 1] === '"') {
          cur += '"';
          i++;
        } else q = !q;
      } else if (c === ',' && !q) {
        out.push(cur);
        cur = '';
      } else cur += c;
    }
    out.push(cur);
    return out.map(x => x.trim());
  };
  const header = split(lines[0]).map(h => h.toLowerCase());
  return lines.slice(1).map(l => {
    const cells = split(l);
    const row = {};
    header.forEach((h, i) => {
      row[h] = cells[i];
    });
    return row;
  });
}
function toCSV(rows, columns) {
  const esc = v => {
    v = v == null ? '' : String(v);
    return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
  };
  const head = columns.map(c => c.label).join(',');
  const body = rows.map(r => columns.map(c => esc(r[c.key])).join(',')).join('\n');
  return head + '\n' + body;
}
function downloadText(filename, text) {
  const blob = new Blob([text], {
    type: 'text/csv'
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ───────── React hook ───────────────────────────────────────────────
function useStore() {
  const [, force] = React.useReducer(x => x + 1, 0);
  React.useEffect(() => Store.subscribe(force), []);
  return Store.get();
}

// ───────── Formatting ───────────────────────────────────────────────
function money(n) {
  return '$' + (n || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
function money0(n) {
  return '$' + Math.round(n || 0).toLocaleString('en-US');
}
Object.assign(window, {
  VENDORS,
  CATALOG,
  SPEND_TIERS,
  VOLUME_TIERS,
  BY_SKU,
  Store,
  useStore,
  product,
  vendor,
  addToCart,
  setCartQty,
  removeFromCart,
  clearCart,
  importCartRows,
  addCustomItem,
  updateCustomItem,
  removeCustomItem,
  lineVolumeOff,
  linePricing,
  spendStatus,
  cartSummary,
  invStatus,
  adjustInventory,
  setReorderPoint,
  lowStockRows,
  updateInventory,
  addInventoryItem,
  removeInventoryItem,
  placeOrder,
  reorderToCart,
  importOrderRows,
  CONSOLIDATION,
  consolidationOffer,
  setOrderMeta,
  leadMaxDays,
  vendorStockOf,
  stockPenaltyDays,
  setupEaseOf,
  lineArrivalDays,
  orderArrivalDays,
  addDays,
  parseCSV,
  toCSV,
  downloadText,
  money,
  money0
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/store.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/ui.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// UI primitives for the ProcureWide website kit.
// Plain React + inline styles tied to brand tokens. No Tailwind, no CSS-in-JS lib.

const PW = {
  ink: '#0A1530',
  ink700: '#122347',
  ink500: '#1F3360',
  green: '#10A060',
  green700: '#0B7E4A',
  green50: '#E8F7EF',
  paper: '#FAFBF7',
  paper2: '#F2F3EE',
  line: '#E3E5DE',
  line2: '#C8CCC1',
  mute: '#6B7280',
  white: '#FFFFFF',
  sans: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
  serif: '"Instrument Serif", "Iowan Old Style", Georgia, serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
  shadowSm: '0 1px 2px rgba(10,21,48,0.05), 0 1px 1px rgba(10,21,48,0.04)',
  shadowMd: '0 6px 16px -6px rgba(10,21,48,0.12), 0 2px 4px rgba(10,21,48,0.04)',
  shadowLg: '0 18px 40px -12px rgba(10,21,48,0.18), 0 4px 10px rgba(10,21,48,0.05)',
  ease: 'cubic-bezier(0.22, 1, 0.36, 1)'
};

// ───────── Button ────────────────────────────────────────────────────
function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  type = 'button',
  style
}) {
  const [hover, setHover] = React.useState(false);
  const sizes = {
    sm: {
      padding: '8px 12px',
      fontSize: 13,
      borderRadius: 6
    },
    md: {
      padding: '12px 18px',
      fontSize: 14,
      borderRadius: 8
    },
    lg: {
      padding: '16px 22px',
      fontSize: 15,
      borderRadius: 10
    }
  };
  const variants = {
    primary: {
      background: hover ? PW.ink700 : PW.ink,
      color: PW.white,
      border: '1px solid transparent',
      boxShadow: hover ? PW.shadowMd : PW.shadowSm
    },
    green: {
      background: hover ? PW.green700 : PW.green,
      color: PW.white,
      border: '1px solid transparent',
      boxShadow: hover ? PW.shadowMd : PW.shadowSm
    },
    secondary: {
      background: PW.white,
      color: PW.ink,
      border: `1px solid ${hover ? PW.ink : PW.line2}`,
      boxShadow: 'none'
    },
    ghost: {
      background: hover ? PW.paper2 : 'transparent',
      color: PW.ink,
      border: '1px solid transparent',
      boxShadow: 'none'
    },
    inverse: {
      background: hover ? '#fff' : 'rgba(255,255,255,0.92)',
      color: PW.ink,
      border: '1px solid transparent',
      boxShadow: hover ? PW.shadowMd : PW.shadowSm
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: PW.sans,
    fontWeight: 600,
    lineHeight: 1,
    cursor: 'pointer',
    transition: `all 240ms ${PW.ease}`,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    ...sizes[size],
    ...variants[variant],
    ...style
  };
  const Tag = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, {
    type: href ? undefined : type,
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: base
  }, children);
}

// ───────── Eyebrow ───────────────────────────────────────────────────
function Eyebrow({
  children,
  color = PW.green700
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color
    }
  }, children);
}

// ───────── Pill ──────────────────────────────────────────────────────
function Pill({
  children,
  tone = 'neutral'
}) {
  const tones = {
    neutral: {
      bg: PW.paper2,
      fg: PW.ink500,
      dot: PW.mute
    },
    success: {
      bg: PW.green50,
      fg: PW.green700,
      dot: PW.green
    },
    warning: {
      bg: '#FAF1DC',
      fg: '#7A5410',
      dot: '#C4881B'
    },
    danger: {
      bg: '#F7E2E5',
      fg: '#7A2230',
      dot: '#B5384A'
    },
    info: {
      bg: '#E0EBFA',
      fg: '#143E80',
      dot: '#1E5FBF'
    },
    ink: {
      bg: PW.ink,
      fg: '#fff',
      dot: PW.green
    }
  };
  const t = tones[tone];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '5px 10px',
      borderRadius: 999,
      background: t.bg,
      color: t.fg,
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 12,
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: t.dot
    }
  }), children);
}

// ───────── Card ──────────────────────────────────────────────────────
function Card({
  children,
  padding = 24,
  radius = 16,
  style,
  hoverable = false
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: PW.white,
      border: `1px solid ${PW.line}`,
      borderRadius: radius,
      padding,
      boxShadow: hoverable && hover ? PW.shadowMd : PW.shadowSm,
      transition: `box-shadow 240ms ${PW.ease}`,
      ...style
    }
  }, children);
}

// ───────── Field ─────────────────────────────────────────────────────
function Field({
  label,
  hint,
  error,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      color: PW.ink500,
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      padding: '11px 14px',
      fontFamily: PW.sans,
      fontSize: 14,
      color: PW.ink,
      background: PW.white,
      border: `1px solid ${error ? '#B5384A' : focus ? PW.green : PW.line2}`,
      borderRadius: 8,
      outline: 'none',
      boxShadow: focus && !error ? '0 0 0 3px rgba(16,160,96,0.30)' : 'none',
      transition: `all 240ms ${PW.ease}`,
      boxSizing: 'border-box'
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontFamily: PW.sans,
      fontSize: 12,
      color: error ? '#B5384A' : PW.mute
    }
  }, error || hint));
}

// ───────── Section wrapper ───────────────────────────────────────────
function Section({
  children,
  dark = false,
  alt = false,
  id,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    style: {
      background: dark ? PW.ink : alt ? PW.paper2 : PW.paper,
      color: dark ? '#fff' : PW.ink,
      padding: '96px 0',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '0 32px'
    }
  }, children));
}

// ───────── Inline SVG glyphs we use across the site ──────────────────
// (No Lucide CDN injected here — keep the kit self-contained for now.)
function IconArrowRight({
  size = 16,
  color = 'currentColor'
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6"
  }));
}
function IconCheck({
  size = 16,
  color = PW.green
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5"
  }));
}
function IconChevronDown({
  size = 16,
  color = 'currentColor'
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  }));
}
Object.assign(window, {
  PW,
  Button,
  Eyebrow,
  Pill,
  Card,
  Field,
  Section,
  IconArrowRight,
  IconCheck,
  IconChevronDown
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/ui.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/v1_OrderDetail.jsx
try { (() => {
// Right-side drawer with full order detail.

function TimelineRow({
  label,
  when,
  done = true,
  last = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 14,
      height: 14,
      borderRadius: '50%',
      background: done ? PW.green : PW.white,
      border: `2px solid ${done ? PW.green : PW.line2}`,
      marginTop: 4,
      boxShadow: done ? '0 0 0 4px rgba(16,160,96,0.10)' : 'none'
    }
  }), !last && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      width: 2,
      background: done ? PW.green200 || '#BFEBD4' : PW.line,
      marginTop: 4
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: last ? 0 : 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 14,
      fontWeight: 600,
      color: done ? PW.ink : PW.mute
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.mono,
      fontSize: 12,
      color: PW.mute,
      marginTop: 2
    }
  }, when)));
}
function OrderDetail({
  order,
  onClose
}) {
  if (!order) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      background: 'rgba(10,21,48,0.40)',
      backdropFilter: 'blur(2px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      width: 'min(560px, 100vw)',
      background: PW.paper,
      borderLeft: `1px solid ${PW.line}`,
      boxShadow: PW.shadowLg,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 24px',
      borderBottom: `1px solid ${PW.line}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: PW.white,
      position: 'sticky',
      top: 0,
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.mono,
      fontSize: 12,
      color: PW.mute
    }
  }, order.id), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 18,
      color: PW.ink,
      marginTop: 2
    }
  }, order.item)), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      width: 32,
      height: 32,
      borderRadius: 8,
      background: 'transparent',
      border: 0,
      cursor: 'pointer',
      fontSize: 20,
      color: PW.mute
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      display: 'grid',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 20
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      fontWeight: 600
    }
  }, "Vendor"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontFamily: PW.sans,
      fontWeight: 600,
      color: PW.ink
    }
  }, order.vendor)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      fontWeight: 600
    }
  }, "Status"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    tone: STATUS_TONE[order.status]
  }, STATUS_LABEL[order.status]))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      fontWeight: 600
    }
  }, "Quantity"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontFamily: PW.mono,
      color: PW.ink
    }
  }, order.qty)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 11,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      fontWeight: 600
    }
  }, "Total"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontFamily: PW.mono,
      fontWeight: 700,
      color: PW.ink
    }
  }, "$", order.price.toFixed(2)))), order.saved > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      padding: '10px 14px',
      background: PW.green50,
      border: `1px solid ${PW.green200 || '#BFEBD4'}`,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: PW.sans,
      fontSize: 13,
      color: PW.green700
    }
  }, /*#__PURE__*/React.createElement(IconCheck, null), " Saved ", /*#__PURE__*/React.createElement("b", {
    style: {
      marginLeft: 4
    }
  }, "$", order.saved.toFixed(2)), " vs. list price.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: PW.ink,
      marginBottom: 14
    }
  }, "Timeline"), /*#__PURE__*/React.createElement(Card, {
    padding: 20
  }, /*#__PURE__*/React.createElement(TimelineRow, {
    label: "Request received",
    when: order.date + ' · 09:12'
  }), /*#__PURE__*/React.createElement(TimelineRow, {
    label: "Quote negotiated",
    when: order.date + ' · 10:34'
  }), /*#__PURE__*/React.createElement(TimelineRow, {
    label: "Order placed with vendor",
    when: order.date + ' · 14:02',
    done: order.status !== 'review' && order.status !== 'draft'
  }), /*#__PURE__*/React.createElement(TimelineRow, {
    label: "Shipment confirmed",
    when: "Estimated Apr 17",
    done: false,
    last: true
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: PW.ink,
      marginBottom: 14
    }
  }, "Documents"), /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, [{
    name: 'PO_PW-04821.pdf',
    size: '24 KB',
    kind: 'Purchase order'
  }, {
    name: 'Vendor_quote.pdf',
    size: '112 KB',
    kind: 'Quote'
  }, {
    name: 'SDS_DMEM.pdf',
    size: '486 KB',
    kind: 'Safety data sheet'
  }].map((d, i, arr) => /*#__PURE__*/React.createElement("div", {
    key: d.name,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 18px',
      borderBottom: i === arr.length - 1 ? 0 : `1px solid ${PW.line}`
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 14,
      color: PW.ink
    }
  }, d.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.mute,
      marginTop: 2
    }
  }, d.kind, " \xB7 ", d.size)), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Download"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "md"
  }, "Reorder"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "md"
  }, "Print packing slip"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "md"
  }, "Contact ProcureWide")))));
}
Object.assign(window, {
  OrderDetail
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/v1_OrderDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/v1_OrdersTable.jsx
try { (() => {
// Orders table with filter chips above.

const ORDERS = [{
  id: 'PW-04821',
  date: 'Apr 12, 2026',
  item: 'DMEM, high glucose · 6×500mL',
  vendor: 'Thermo Fisher',
  qty: 6,
  price: 382.40,
  saved: 41.60,
  status: 'placed'
}, {
  id: 'PW-04820',
  date: 'Apr 11, 2026',
  item: 'FBS, heat-inactivated · 4×500mL',
  vendor: 'Fisher Scientific',
  qty: 4,
  price: 1284.00,
  saved: 188.00,
  status: 'placed'
}, {
  id: 'PW-04819',
  date: 'Apr 11, 2026',
  item: 'P/S 100x · 1×100mL',
  vendor: 'Thermo Fisher',
  qty: 1,
  price: 38.20,
  saved: 4.10,
  status: 'placed'
}, {
  id: 'PW-04818',
  date: 'Apr 10, 2026',
  item: 'qPCR plate · 96-well · 50ea',
  vendor: 'Bio-Rad',
  qty: 2,
  price: 412.00,
  saved: 60.50,
  status: 'backordered'
}, {
  id: 'PW-04817',
  date: 'Apr 09, 2026',
  item: 'Lab notebook, hardbound',
  vendor: 'Amazon',
  qty: 12,
  price: 168.00,
  saved: 22.80,
  status: 'review'
}, {
  id: 'PW-04816',
  date: 'Apr 09, 2026',
  item: 'Pipette tips · 10–200µL · 96 rack',
  vendor: 'Thermo Fisher',
  qty: 10,
  price: 540.00,
  saved: 78.00,
  status: 'placed'
}, {
  id: 'PW-04815',
  date: 'Apr 08, 2026',
  item: 'qScript cDNA SuperMix',
  vendor: 'Quantabio',
  qty: 2,
  price: 624.00,
  saved: 92.00,
  status: 'placed'
}, {
  id: 'PW-04814',
  date: 'Apr 07, 2026',
  item: 'BSA, fraction V · 100g',
  vendor: 'GoldBio',
  qty: 1,
  price: 89.50,
  saved: 0,
  status: 'draft'
}, {
  id: 'PW-04813',
  date: 'Apr 04, 2026',
  item: '0.22µm filter unit · 50/cs',
  vendor: 'Stemcell',
  qty: 2,
  price: 220.00,
  saved: 18.00,
  status: 'placed'
}];
const STATUS_TONE = {
  placed: 'success',
  backordered: 'warning',
  review: 'info',
  draft: 'neutral',
  cancelled: 'danger'
};
const STATUS_LABEL = {
  placed: 'Placed',
  backordered: 'Backordered',
  review: 'In review',
  draft: 'Draft',
  cancelled: 'Cancelled'
};
function FilterChip({
  active,
  label,
  count,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 14px',
      borderRadius: 999,
      background: active ? PW.ink : PW.white,
      color: active ? '#fff' : PW.ink500,
      border: `1px solid ${active ? PW.ink : PW.line2}`,
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 13,
      cursor: 'pointer',
      transition: `all 140ms ${PW.ease}`
    }
  }, label, count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 11,
      color: active ? 'rgba(255,255,255,0.7)' : PW.mute
    }
  }, count));
}
function OrdersTable({
  onRowClick
}) {
  const [filter, setFilter] = React.useState('all');
  const filtered = filter === 'all' ? ORDERS : ORDERS.filter(o => o.status === filter);
  const counts = ORDERS.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Procurement"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '8px 0 0',
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 32,
      letterSpacing: '-0.02em',
      color: PW.ink
    }
  }, "Orders")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "md"
  }, "Export CSV"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "md"
  }, "+ New request"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(FilterChip, {
    label: "All",
    count: ORDERS.length,
    active: filter === 'all',
    onClick: () => setFilter('all')
  }), /*#__PURE__*/React.createElement(FilterChip, {
    label: "Placed",
    count: counts.placed,
    active: filter === 'placed',
    onClick: () => setFilter('placed')
  }), /*#__PURE__*/React.createElement(FilterChip, {
    label: "In review",
    count: counts.review,
    active: filter === 'review',
    onClick: () => setFilter('review')
  }), /*#__PURE__*/React.createElement(FilterChip, {
    label: "Backordered",
    count: counts.backordered,
    active: filter === 'backordered',
    onClick: () => setFilter('backordered')
  }), /*#__PURE__*/React.createElement(FilterChip, {
    label: "Draft",
    count: counts.draft,
    active: filter === 'draft',
    onClick: () => setFilter('draft')
  })), /*#__PURE__*/React.createElement(Card, {
    padding: 0,
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontFamily: PW.sans,
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: PW.paper,
      color: PW.mute
    }
  }, ['Order', 'Item', 'Vendor', 'Qty', 'Total', 'Saved', 'Status'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: h === 'Qty' || h === 'Total' || h === 'Saved' ? 'right' : 'left',
      fontWeight: 600,
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.10em',
      padding: '12px 16px',
      borderBottom: `1px solid ${PW.line}`
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, filtered.map((o, i) => /*#__PURE__*/React.createElement("tr", {
    key: o.id,
    onClick: () => onRowClick(o),
    style: {
      cursor: 'pointer',
      borderBottom: i === filtered.length - 1 ? 'none' : `1px solid ${PW.line}`
    },
    onMouseEnter: e => e.currentTarget.style.background = PW.paper,
    onMouseLeave: e => e.currentTarget.style.background = 'transparent'
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 16px',
      fontFamily: PW.mono,
      fontSize: 13,
      color: PW.ink500
    }
  }, /*#__PURE__*/React.createElement("div", null, o.id), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: PW.mute,
      marginTop: 2
    }
  }, o.date)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 16px',
      color: PW.ink,
      fontWeight: 500
    }
  }, o.item), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 16px',
      color: PW.ink500
    }
  }, o.vendor), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 16px',
      textAlign: 'right',
      fontFamily: PW.mono,
      color: PW.ink
    }
  }, o.qty), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 16px',
      textAlign: 'right',
      fontFamily: PW.mono,
      fontWeight: 600,
      color: PW.ink
    }
  }, "$", o.price.toFixed(2)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 16px',
      textAlign: 'right',
      fontFamily: PW.mono,
      color: o.saved > 0 ? PW.green700 : PW.mute
    }
  }, o.saved > 0 ? `+$${o.saved.toFixed(2)}` : '—'), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    tone: STATUS_TONE[o.status]
  }, STATUS_LABEL[o.status]))))))));
}
Object.assign(window, {
  OrdersTable,
  ORDERS,
  STATUS_TONE,
  STATUS_LABEL
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/v1_OrdersTable.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/v1_RequestForm.jsx
try { (() => {
// "+ New request" modal — line-items table, vendor preference, urgency.

function LineItemRow({
  idx,
  onRemove
}) {
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px 6px',
      fontFamily: PW.mono,
      fontSize: 12,
      color: PW.mute,
      width: 28
    }
  }, idx + 1), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 6px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "Item name (e.g. DMEM, high glucose)",
    style: inputStyle()
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 6px',
      width: 110
    }
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "Cat #",
    style: inputStyle()
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 6px',
      width: 80
    }
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "Qty",
    style: inputStyle()
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 6px',
      width: 32
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    style: {
      width: 28,
      height: 28,
      border: 0,
      background: 'transparent',
      color: PW.mute,
      cursor: 'pointer',
      fontSize: 16
    }
  }, "\xD7")));
}
function inputStyle() {
  return {
    width: '100%',
    padding: '8px 10px',
    fontFamily: PW.sans,
    fontSize: 13,
    color: PW.ink,
    background: PW.white,
    border: `1px solid ${PW.line}`,
    borderRadius: 6,
    outline: 'none',
    boxSizing: 'border-box'
  };
}
function RequestForm({
  open,
  onClose
}) {
  const [lines, setLines] = React.useState([0, 1]);
  const [urgency, setUrgency] = React.useState('standard');
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(10,21,48,0.55)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      maxWidth: 720,
      background: PW.white,
      borderRadius: 20,
      boxShadow: PW.shadowLg,
      padding: 32,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      position: 'absolute',
      top: 18,
      right: 18,
      width: 32,
      height: 32,
      borderRadius: 8,
      background: 'transparent',
      border: 0,
      cursor: 'pointer',
      fontSize: 20,
      color: PW.mute,
      lineHeight: 1
    }
  }, "\xD7"), /*#__PURE__*/React.createElement(Eyebrow, null, "New request"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '12px 0 6px',
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 24,
      letterSpacing: '-0.01em',
      color: PW.ink
    }
  }, "What would you like us to order?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 22px',
      fontFamily: PW.sans,
      fontSize: 14,
      lineHeight: 1.55,
      color: PW.mute
    }
  }, "We negotiate the price, place the order, and chase the receipt. You approve every change."), /*#__PURE__*/React.createElement("div", {
    style: {
      border: `1px solid ${PW.line}`,
      borderRadius: 12,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: PW.paper
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: th()
  }), /*#__PURE__*/React.createElement("th", {
    style: th()
  }, "Item"), /*#__PURE__*/React.createElement("th", {
    style: th()
  }, "Catalog #"), /*#__PURE__*/React.createElement("th", {
    style: th()
  }, "Qty"), /*#__PURE__*/React.createElement("th", {
    style: th()
  }))), /*#__PURE__*/React.createElement("tbody", null, lines.map((id, i) => /*#__PURE__*/React.createElement(LineItemRow, {
    key: id,
    idx: i,
    onRemove: () => setLines(lines.filter(l => l !== id))
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 14px',
      borderTop: `1px solid ${PW.line}`,
      background: PW.paper
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setLines([...lines, Date.now()]),
    style: {
      background: 'transparent',
      border: 0,
      cursor: 'pointer',
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 13,
      color: PW.green700
    }
  }, "+ Add line"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      color: PW.ink500,
      marginBottom: 8
    }
  }, "Urgency"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, [['standard', 'Standard', '~24 h'], ['rush', 'Rush', 'Same day'], ['scheduled', 'Scheduled', 'Pick date']].map(([id, label, sub]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => setUrgency(id),
    style: {
      flex: 1,
      padding: '10px 8px',
      borderRadius: 8,
      background: urgency === id ? PW.ink : PW.white,
      color: urgency === id ? '#fff' : PW.ink,
      border: `1px solid ${urgency === id ? PW.ink : PW.line2}`,
      fontFamily: PW.sans,
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer',
      transition: `all 140ms ${PW.ease}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 10,
      fontWeight: 400,
      color: urgency === id ? 'rgba(255,255,255,0.7)' : PW.mute
    }
  }, sub))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      color: PW.ink500,
      marginBottom: 8
    }
  }, "Vendor preference"), /*#__PURE__*/React.createElement("select", {
    style: {
      width: '100%',
      padding: '11px 14px',
      fontFamily: PW.sans,
      fontSize: 14,
      color: PW.ink,
      background: PW.white,
      border: `1px solid ${PW.line2}`,
      borderRadius: 8,
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement("option", null, "No preference \u2014 find me the lowest price"), /*#__PURE__*/React.createElement("option", null, "Stay with my current vendor"), /*#__PURE__*/React.createElement("option", null, "Avoid Amazon"), /*#__PURE__*/React.createElement("option", null, "Lab-grade vendors only")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 13,
      color: PW.mute
    }
  }, "You'll receive a quote within 24 hours."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onClose
  }, "Submit request ", /*#__PURE__*/React.createElement(IconArrowRight, {
    size: 14
  }))))));
}
function th() {
  return {
    textAlign: 'left',
    padding: '10px 6px',
    fontFamily: PW.sans,
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.10em',
    color: PW.mute,
    borderBottom: `1px solid ${PW.line}`
  };
}
Object.assign(window, {
  RequestForm
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/v1_RequestForm.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/v1_Sidebar.jsx
try { (() => {
// Vertical sidebar — dark ink background.

const NAV_ITEMS = [{
  id: 'orders',
  label: 'Orders',
  count: 14
}, {
  id: 'requests',
  label: 'Requests',
  count: 3
}, {
  id: 'vendors',
  label: 'Vendors',
  count: 200
}, {
  id: 'invoices',
  label: 'Invoices',
  count: 6
}, {
  id: 'docs',
  label: 'Documents',
  count: null
}, {
  id: 'team',
  label: 'Team',
  count: null
}, {
  id: 'settings',
  label: 'Settings',
  count: null
}];
function NavLink({
  item,
  active,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  const bg = active ? 'rgba(255,255,255,0.07)' : hover ? 'rgba(255,255,255,0.04)' : 'transparent';
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => onClick(item.id),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      padding: '10px 14px',
      borderRadius: 10,
      background: bg,
      border: 0,
      cursor: 'pointer',
      fontFamily: PW.sans,
      fontSize: 14,
      fontWeight: active ? 600 : 500,
      color: active ? '#fff' : '#B6BFD3',
      transition: `all 140ms ${PW.ease}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: active ? PW.green : 'transparent',
      border: active ? 'none' : `1px solid rgba(255,255,255,0.18)`
    }
  }), item.label), item.count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.mono,
      fontSize: 11,
      color: active ? '#fff' : '#7C88A0'
    }
  }, item.count));
}
function Sidebar({
  active,
  onSelect,
  onNewRequest
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 256,
      minHeight: '100vh',
      background: PW.ink,
      color: '#fff',
      padding: '22px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      position: 'sticky',
      top: 0
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      textDecoration: 'none',
      padding: '0 6px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/brand/procurewide-logo.png",
    alt: "",
    style: {
      width: 30,
      height: 30,
      objectFit: 'contain'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 800,
      fontSize: 16,
      color: '#fff'
    }
  }, "ProcureWide")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      padding: '10px 12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.mono,
      fontSize: 10,
      color: '#7C88A0',
      textTransform: 'uppercase',
      letterSpacing: '0.12em'
    }
  }, "Account"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 14,
      color: '#fff',
      marginTop: 2
    }
  }, "Helio Bio, Inc.")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#7C88A0'
    }
  }, /*#__PURE__*/React.createElement(IconChevronDown, {
    size: 16
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: onNewRequest,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      background: PW.green,
      color: '#fff',
      border: 0,
      borderRadius: 10,
      padding: '11px 14px',
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 14,
      cursor: 'pointer',
      boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
      transition: `background 140ms ${PW.ease}`
    },
    onMouseEnter: e => e.currentTarget.style.background = PW.green700,
    onMouseLeave: e => e.currentTarget.style.background = PW.green
  }, "+ New request"), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, NAV_ITEMS.map(it => /*#__PURE__*/React.createElement(NavLink, {
    key: it.id,
    item: it,
    active: active === it.id,
    onClick: onSelect
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(16,160,96,0.10)',
      border: '1px solid rgba(16,160,96,0.30)',
      borderRadius: 12,
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.mono,
      fontSize: 10,
      color: PW.green,
      textTransform: 'uppercase',
      letterSpacing: '0.12em'
    }
  }, "Saved this quarter"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontFamily: PW.serif,
      fontSize: 32,
      color: '#fff',
      lineHeight: 1
    }
  }, "$18,420"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontFamily: PW.sans,
      fontSize: 12,
      color: '#B6BFD3'
    }
  }, "across 47 orders")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: '#7C88A0',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Daniela Cuadros"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.green
    }
  }, "\u25CF Online")));
}
Object.assign(window, {
  Sidebar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/v1_Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ExampleOrderModal.jsx
try { (() => {
// "Submit an example order" — the form revealed from /get-pricing.

function ExampleOrderModal({
  open,
  onClose
}) {
  const [vendor, setVendor] = React.useState('Thermo Fisher');
  const [submitted, setSubmitted] = React.useState(false);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(10,21,48,0.55)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      maxWidth: 560,
      background: PW.white,
      borderRadius: 20,
      boxShadow: PW.shadowLg,
      padding: 32,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      position: 'absolute',
      top: 18,
      right: 18,
      width: 32,
      height: 32,
      borderRadius: 8,
      background: 'transparent',
      border: 0,
      cursor: 'pointer',
      fontSize: 20,
      color: PW.mute,
      lineHeight: 1
    }
  }, "\xD7"), submitted ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: '50%',
      background: PW.green50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(IconCheck, {
    size: 28
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 24,
      letterSpacing: '-0.01em',
      color: PW.ink
    }
  }, "Got it \u2014 we're on it."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      fontFamily: PW.sans,
      fontSize: 15,
      lineHeight: 1.55,
      color: PW.ink500
    }
  }, "We'll email a price comparison within 24 hours. No commitment, no follow-up sales calls."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onClose
  }, "Done"))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Eyebrow, null, "Pricing"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '12px 0 6px',
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 24,
      letterSpacing: '-0.01em',
      color: PW.ink
    }
  }, "Submit an example order"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 22px',
      fontFamily: PW.sans,
      fontSize: 14,
      lineHeight: 1.55,
      color: PW.mute
    }
  }, "Tell us what you'd buy. We'll return a cheaper price range by email."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Company",
    defaultValue: "Helio Bio, Inc."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Item name",
    placeholder: "DMEM, high glucose, 500 mL"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Quantity",
    placeholder: "6"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Catalog #",
    placeholder: "11965-092"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      color: PW.ink500,
      marginBottom: 6
    }
  }, "Current vendor"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: vendor,
    onChange: e => setVendor(e.target.value),
    style: {
      width: '100%',
      padding: '11px 14px',
      fontFamily: PW.sans,
      fontSize: 14,
      color: PW.ink,
      background: PW.white,
      border: `1px solid ${PW.line2}`,
      borderRadius: 8,
      outline: 'none',
      appearance: 'none',
      paddingRight: 36,
      cursor: 'pointer'
    }
  }, ['Thermo Fisher', 'Fisher Scientific', 'Sigma-Aldrich', 'Bio-Rad', 'Cell Signaling', 'Other'].map(v => /*#__PURE__*/React.createElement("option", {
    key: v
  }, v))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      color: PW.mute,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement(IconChevronDown, {
    size: 16
  }))))), /*#__PURE__*/React.createElement(Field, {
    label: "Email for the quote",
    placeholder: "lab@yourcompany.com"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.mono,
      fontSize: 12,
      color: PW.mute
    }
  }, "You can submit once finished"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => setSubmitted(true)
  }, "Submit example order ", /*#__PURE__*/React.createElement(IconArrowRight, {
    size: 14
  }))))));
}
Object.assign(window, {
  ExampleOrderModal
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ExampleOrderModal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/FAQ.jsx
try { (() => {
// FAQ accordion with the photo on the left and questions on the right.

const QS = [{
  q: 'How does the billing process work?',
  a: 'Each month, you receive an itemized invoice with all bill-backs and receipts attached. All receipts are specifically for your company and only include items purchased for your company — no absurd "redacted" receipts.'
}, {
  q: 'What is the purpose of the security deposit?',
  a: 'To ensure the lowest possible cost and fastest onboarding, we use the security deposit to establish a line of credit you can order against. The deposit is returned after you terminate the contract, assuming all outstanding invoices are paid.'
}, {
  q: 'What is the timeline for placing orders?',
  a: 'Most orders go in the same day they are requested. With more than 150 vendors, each has its own cutoff time — orders received close to a vendor\'s cutoff may go out the next day.'
}, {
  q: 'How do you manage backorders?',
  a: 'When an item is backordered we immediately notify you of the projected timeline. If the delay is unacceptable, we attempt to find the exact item from another vendor. We never substitute an item or vendor without your explicit approval.'
}, {
  q: 'Will I lose control?',
  a: 'No. We only order what you request. You approve every change to the order, the vendor, or the timing.'
}, {
  q: 'Are there hidden fees?',
  a: 'No. Pricing is transparent and itemized. No subscription fees. Cancel anytime.'
}];
function FAQRow({
  q,
  a,
  open,
  onClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: `1px solid ${PW.line}`
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      width: '100%',
      background: 'transparent',
      border: 0,
      padding: '20px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      textAlign: 'left',
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 17,
      color: PW.ink
    }
  }, q, /*#__PURE__*/React.createElement("span", {
    style: {
      transform: open ? 'rotate(180deg)' : 'rotate(0)',
      transition: `transform 240ms ${PW.ease}`,
      color: PW.mute
    }
  }, /*#__PURE__*/React.createElement(IconChevronDown, {
    size: 20
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: open ? 400 : 0,
      overflow: 'hidden',
      transition: `max-height 280ms ${PW.ease}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 20,
      fontFamily: PW.sans,
      fontSize: 15,
      lineHeight: 1.65,
      color: PW.ink500,
      maxWidth: 560
    }
  }, a)));
}
function FAQ() {
  const [openIdx, setOpenIdx] = React.useState(0);
  return /*#__PURE__*/React.createElement(Section, {
    id: "faq"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '0.85fr 1.15fr',
      gap: 64,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Got questions?"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '14px 0 18px',
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: PW.ink
    }
  }, "Frequently asked questions"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 24px',
      fontFamily: PW.sans,
      fontSize: 16,
      lineHeight: 1.55,
      color: PW.ink500
    }
  }, "Everything you need to know about our procurement service. Can't find what you're looking for? Reach out."), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 20,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/brand/FAQ.png",
    alt: "",
    style: {
      width: '100%',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      fontFamily: PW.sans,
      fontStyle: 'italic',
      fontSize: 14,
      color: PW.mute
    }
  }, "Our team is here to help.")), /*#__PURE__*/React.createElement("div", null, QS.map((it, i) => /*#__PURE__*/React.createElement(FAQRow, {
    key: it.q,
    q: it.q,
    a: it.a,
    open: openIdx === i,
    onClick: () => setOpenIdx(openIdx === i ? -1 : i)
  })))));
}
Object.assign(window, {
  FAQ
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/FAQ.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
// Dark CTA band + footer.

function CtaBand({
  onCtaClick
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    style: {
      background: PW.ink,
      color: '#fff',
      padding: '96px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '0 auto',
      padding: '0 32px',
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      gap: 64,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    color: PW.green
  }, "Ready when you are"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '14px 0 0',
      fontFamily: PW.serif,
      fontWeight: 400,
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      lineHeight: 1.04,
      letterSpacing: '-0.02em',
      color: '#fff'
    }
  }, "Take control of your procurement."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '20px 0 0',
      maxWidth: 520,
      fontFamily: PW.sans,
      fontSize: 17,
      lineHeight: 1.55,
      color: '#A8B1C7'
    }
  }, "Our team is here to streamline your procurement and answer any questions. Don't hesitate to reach out."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "green",
    size: "lg",
    onClick: onCtaClick
  }, "Join us today ", /*#__PURE__*/React.createElement(IconArrowRight, {
    size: 16
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "inverse",
    size: "lg",
    href: "mailto:cuadrosda21@gmail.com"
  }, "Email the team")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      fontFamily: PW.sans,
      fontSize: 13,
      color: '#A8B1C7'
    }
  }, "Transparent pricing\xA0\xA0\u2022\xA0\xA0No subscription fees\xA0\xA0\u2022\xA0\xA0Cancel anytime")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.10)',
      borderRadius: 20,
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.serif,
      fontSize: 56,
      lineHeight: 1,
      color: PW.green
    }
  }, "89%"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 18,
      color: '#fff'
    }
  }, "Client success rate"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontFamily: PW.sans,
      fontSize: 14,
      color: '#A8B1C7'
    }
  }, "49 of 55 companies. Clients have raised over $900M."), /*#__PURE__*/React.createElement("hr", {
    style: {
      border: 0,
      borderTop: '1px solid rgba(255,255,255,0.10)',
      margin: '22px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.serif,
      fontSize: 32,
      color: '#fff'
    }
  }, "200+"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 13,
      color: '#A8B1C7'
    }
  }, "partner vendors")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.serif,
      fontSize: 32,
      color: '#fff'
    }
  }, "10 / mo"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 13,
      color: '#A8B1C7'
    }
  }, "new vendors added"))))));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: PW.paper2,
      borderTop: `1px solid ${PW.line}`,
      padding: '56px 0 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '0 32px',
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    href: "#home",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/brand/procurewide-logo.png",
    alt: "",
    style: {
      width: 36,
      height: 36,
      objectFit: 'contain'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 800,
      fontSize: 18,
      color: PW.ink
    }
  }, "ProcureWide")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 14,
      maxWidth: 380,
      fontFamily: PW.sans,
      fontSize: 14,
      lineHeight: 1.55,
      color: PW.mute
    }
  }, "Innovative procurement strategies that empower founders to streamline operations and maximize savings."), /*#__PURE__*/React.createElement("a", {
    href: "mailto:cuadrosda21@gmail.com",
    style: {
      display: 'inline-block',
      marginTop: 14,
      fontFamily: PW.mono,
      fontSize: 13,
      color: PW.ink500,
      textDecoration: 'none',
      borderBottom: `1px solid ${PW.line2}`
    }
  }, "cuadrosda21@gmail.com")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: PW.ink
    }
  }, "Company"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '14px 0 0',
      padding: 0,
      listStyle: 'none',
      display: 'grid',
      rowGap: 8
    }
  }, ['About', 'Process', 'FAQ', 'Contact'].map(l => /*#__PURE__*/React.createElement("li", {
    key: l
  }, /*#__PURE__*/React.createElement("a", {
    href: `#${l.toLowerCase()}`,
    style: {
      fontFamily: PW.sans,
      fontSize: 14,
      color: PW.ink500,
      textDecoration: 'none'
    }
  }, l))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: PW.ink
    }
  }, "Resources"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '14px 0 0',
      padding: 0,
      listStyle: 'none',
      display: 'grid',
      rowGap: 8
    }
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#case-studies",
    style: {
      fontFamily: PW.sans,
      fontSize: 14,
      color: PW.ink500,
      textDecoration: 'none'
    }
  }, "Case Studies"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '40px auto 0',
      padding: '0 32px',
      borderTop: `1px solid ${PW.line}`,
      paddingTop: 24,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.mute
    }
  }, "\xA9 2026 The ProcureWide Company, LLC. All rights reserved."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.serif,
      fontStyle: 'italic',
      fontSize: 14,
      color: PW.ink500
    }
  }, "Created by a Founder to Support Founders")));
}
Object.assign(window, {
  CtaBand,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
// Asymmetric hero: editorial headline left, lab photograph right.

function Hero({
  onCtaClick
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "home",
    style: {
      background: PW.paper,
      padding: '64px 0 96px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '0 32px',
      display: 'grid',
      gridTemplateColumns: '1.05fr 1fr',
      gap: 64,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "You are in control"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '14px 0 0',
      fontFamily: PW.serif,
      fontWeight: 400,
      fontSize: 'clamp(3rem, 6vw, 5rem)',
      lineHeight: 1.04,
      letterSpacing: '-0.02em',
      color: PW.ink
    }
  }, "Save\xA0Time.", /*#__PURE__*/React.createElement("br", null), "Save\xA0Money."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '24px 0 0',
      maxWidth: 520,
      fontFamily: PW.sans,
      fontSize: 18,
      lineHeight: 1.55,
      color: PW.ink500
    }
  }, "Pre-launch of a solutions architecture for life-sciences purchasing and procurement support services. Built by scientists, for science."), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '28px 0 0',
      padding: 0,
      listStyle: 'none',
      display: 'grid',
      rowGap: 10
    }
  }, ['Total control of your procurement', 'Major cost savings', 'No hidden fees'].map(t => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      fontFamily: PW.sans,
      fontSize: 16,
      color: PW.ink
    }
  }, /*#__PURE__*/React.createElement(IconCheck, null), t))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    href: "#process"
  }, "Learn More ", /*#__PURE__*/React.createElement(IconArrowRight, {
    size: 16
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: onCtaClick
  }, "Contact Us"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 24,
      overflow: 'hidden',
      aspectRatio: '4 / 5',
      boxShadow: PW.shadowLg
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/brand/hero.png",
    alt: "Scientist at a qPCR thermal cycler",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 18,
      bottom: 18,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(8px)',
      borderRadius: 12,
      padding: '10px 14px',
      fontFamily: PW.mono,
      fontSize: 12,
      color: PW.ink,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: PW.green
    }
  }), "200+ vendors \xB7 89% client success"))));
}
Object.assign(window, {
  Hero
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Nav.jsx
try { (() => {
// Sticky top navigation. Helix logo + wordmark on left,
// link cluster in the middle, Login + Prodigy CTA on the right.

function Nav({
  onCtaClick
}) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 30,
      background: scrolled ? 'rgba(250,251,247,0.82)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
      borderBottom: scrolled ? `1px solid ${PW.line}` : '1px solid transparent',
      transition: `all 240ms ${PW.ease}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '16px 32px',
      display: 'flex',
      alignItems: 'center',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#home",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/brand/procurewide-logo.png",
    alt: "",
    style: {
      width: 36,
      height: 36,
      objectFit: 'contain'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 800,
      fontSize: 18,
      color: PW.ink,
      letterSpacing: '-0.01em'
    }
  }, "ProcureWide")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 28,
      flex: 1
    }
  }, ['Home', 'About', 'Get Pricing', 'Contact'].map(label => /*#__PURE__*/React.createElement("a", {
    key: label,
    href: `#${label.toLowerCase().replace(' ', '-')}`,
    style: {
      fontFamily: PW.sans,
      fontSize: 14,
      fontWeight: 500,
      color: PW.ink500,
      textDecoration: 'none',
      transition: `color 140ms ${PW.ease}`
    },
    onMouseEnter: e => e.target.style.color = PW.ink,
    onMouseLeave: e => e.target.style.color = PW.ink500
  }, label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    href: "#login"
  }, "Login"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: onCtaClick
  }, "Prodigy Platform ", /*#__PURE__*/React.createElement(IconArrowRight, {
    size: 14
  })))));
}
Object.assign(window, {
  Nav
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ProcessSteps.jsx
try { (() => {
// Five-step process timeline with editorial serif numerals.

const STEPS = [{
  t: 'Enroll',
  d: 'Enroll in the system with a simple contract.'
}, {
  t: 'Security Deposit',
  d: 'Establish a line of credit through a security deposit.'
}, {
  t: 'Onboarding',
  d: 'We set you up in our system and walk you and your team through requesting items.'
}, {
  t: 'We Order',
  d: 'We order the product(s) from your requested vendor(s).'
}, {
  t: 'Track & Document',
  d: 'Order number, ship date, final pricing, and regulatory docs — viewable any time.'
}];
function ProcessSteps() {
  return /*#__PURE__*/React.createElement(Section, {
    id: "process",
    alt: true
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Transparent and simple"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '14px 0 18px',
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: PW.ink,
      maxWidth: 720
    }
  }, "We are your ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: 'italic',
      fontFamily: PW.serif,
      fontWeight: 400
    }
  }, "\"Co-Pilot.\"")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 56px',
      maxWidth: 640,
      fontFamily: PW.sans,
      fontSize: 18,
      lineHeight: 1.55,
      color: PW.ink500
    }
  }, "A step-by-step process that's transparent, simple, and designed to save you time and money."), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 32,
      left: '8%',
      right: '8%',
      height: 1,
      background: PW.line,
      zIndex: 0
    }
  }), STEPS.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: it.t,
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: '50%',
      background: PW.paper,
      border: `1px solid ${PW.line}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: PW.serif,
      fontSize: 32,
      color: PW.green,
      boxShadow: PW.shadowSm
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 18,
      color: PW.ink
    }
  }, it.t), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontFamily: PW.sans,
      fontSize: 14,
      lineHeight: 1.55,
      color: PW.mute
    }
  }, it.d)))));
}
Object.assign(window, {
  ProcessSteps
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ProcessSteps.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ValueGrid.jsx
try { (() => {
// Two pattern instances:
// - 4-up "Why founders choose us" — neutral value cards
// - 3-up "How we support you" — clean text blocks

const WHY = [{
  t: 'Total Control',
  d: 'You maintain complete control of your procurement. We only order what you request.'
}, {
  t: 'We Work For You',
  d: 'Our team is dedicated to supporting your business goals and saving you time.'
}, {
  t: 'Cost Savings',
  d: 'Our collective buying power drives major cost savings for your business.'
}, {
  t: 'Exactly What You Need',
  d: 'We order only what you want — no upselling, no unnecessary additions.'
}];
const HOW = [{
  t: 'You Request, We Order',
  d: 'Focus on critical science while we handle all procurement logistics.'
}, {
  t: 'Smooth Supply Chain',
  d: 'We reduce and eliminate backorders, ensuring smooth operations.'
}, {
  t: 'Negotiation Power',
  d: 'We use our expertise to drive major cost savings on every order.'
}, {
  t: 'Accurate Documentation',
  d: 'Ensure accounting and regulatory documents are always accessible.'
}];
function ValueGrid() {
  return /*#__PURE__*/React.createElement(Section, {
    id: "why"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Why ProcureWide?"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '14px 0 18px',
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: PW.ink,
      maxWidth: 720
    }
  }, "Procurement that works for you."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 56px',
      maxWidth: 640,
      fontFamily: PW.sans,
      fontSize: 18,
      lineHeight: 1.55,
      color: PW.ink500
    }
  }, "We save your money, save your time, and help you get more done. Focus on what matters while we handle the rest."), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 24px',
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 16,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: PW.green700
    }
  }, "Why founders choose us"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 16
    }
  }, WHY.map((it, i) => /*#__PURE__*/React.createElement(Card, {
    key: it.t,
    hoverable: true,
    padding: 24
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.serif,
      fontSize: 44,
      lineHeight: 1,
      color: PW.green
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 18,
      color: PW.ink
    }
  }, it.t), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontFamily: PW.sans,
      fontSize: 14,
      lineHeight: 1.55,
      color: PW.mute
    }
  }, it.d)))), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '64px 0 24px',
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 16,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: PW.green700
    }
  }, "How we support you"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 32
    }
  }, HOW.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.t,
    style: {
      paddingLeft: 16,
      borderLeft: `2px solid ${PW.green}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 18,
      color: PW.ink
    }
  }, it.t), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontFamily: PW.sans,
      fontSize: 14,
      lineHeight: 1.55,
      color: PW.mute
    }
  }, it.d)))));
}
Object.assign(window, {
  ValueGrid
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ValueGrid.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/VendorCloud.jsx
try { (() => {
// Vendor-logo cloud — "200+ Vendors: Currently Adding 10 Vendors/Month!"

const VENDORS = ['thermo-fisher.png', 'fisher-scientific.png', 'Abcam.png', 'agilent.png', 'biorad.png', 'beckman-coulter.png', 'cell-signaling.png', 'stemcell.png', 'genscript.avif', 'goldbio.webp', 'Origene-logo.webp', 'Raybiotech.png', 'takara.webp', 'amsbio.png', 'Amazon.png', 'Cisco.png'];
function VendorCloud() {
  return /*#__PURE__*/React.createElement(Section, {
    id: "vendors",
    alt: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      maxWidth: 760,
      margin: '0 auto 48px'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Partner network"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '14px 0 14px',
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
      color: PW.ink
    }
  }, "200+ vendors \u2014 and adding ~10 per month."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: PW.sans,
      fontSize: 16,
      lineHeight: 1.55,
      color: PW.ink500
    }
  }, "We partner with the best in the industry, offering diverse and high-quality products for every need.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(8, 1fr)',
      gap: 10
    }
  }, VENDORS.map(v => /*#__PURE__*/React.createElement("div", {
    key: v,
    style: {
      background: PW.white,
      border: `1px solid ${PW.line}`,
      borderRadius: 12,
      height: 88,
      padding: 12,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `../../assets/vendors/${v}`,
    alt: "",
    style: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
      filter: 'saturate(0.92)'
    }
  })))));
}
Object.assign(window, {
  VendorCloud
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/VendorCloud.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ui.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// UI primitives for the ProcureWide website kit.
// Plain React + inline styles tied to brand tokens. No Tailwind, no CSS-in-JS lib.

const PW = {
  ink: '#0A1530',
  ink700: '#122347',
  ink500: '#1F3360',
  green: '#10A060',
  green700: '#0B7E4A',
  green50: '#E8F7EF',
  paper: '#FAFBF7',
  paper2: '#F2F3EE',
  line: '#E3E5DE',
  line2: '#C8CCC1',
  mute: '#6B7280',
  white: '#FFFFFF',
  sans: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
  serif: '"Instrument Serif", "Iowan Old Style", Georgia, serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
  shadowSm: '0 1px 2px rgba(10,21,48,0.05), 0 1px 1px rgba(10,21,48,0.04)',
  shadowMd: '0 6px 16px -6px rgba(10,21,48,0.12), 0 2px 4px rgba(10,21,48,0.04)',
  shadowLg: '0 18px 40px -12px rgba(10,21,48,0.18), 0 4px 10px rgba(10,21,48,0.05)',
  ease: 'cubic-bezier(0.22, 1, 0.36, 1)'
};

// ───────── Button ────────────────────────────────────────────────────
function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  type = 'button',
  style
}) {
  const [hover, setHover] = React.useState(false);
  const sizes = {
    sm: {
      padding: '8px 12px',
      fontSize: 13,
      borderRadius: 6
    },
    md: {
      padding: '12px 18px',
      fontSize: 14,
      borderRadius: 8
    },
    lg: {
      padding: '16px 22px',
      fontSize: 15,
      borderRadius: 10
    }
  };
  const variants = {
    primary: {
      background: hover ? PW.ink700 : PW.ink,
      color: PW.white,
      border: '1px solid transparent',
      boxShadow: hover ? PW.shadowMd : PW.shadowSm
    },
    green: {
      background: hover ? PW.green700 : PW.green,
      color: PW.white,
      border: '1px solid transparent',
      boxShadow: hover ? PW.shadowMd : PW.shadowSm
    },
    secondary: {
      background: PW.white,
      color: PW.ink,
      border: `1px solid ${hover ? PW.ink : PW.line2}`,
      boxShadow: 'none'
    },
    ghost: {
      background: hover ? PW.paper2 : 'transparent',
      color: PW.ink,
      border: '1px solid transparent',
      boxShadow: 'none'
    },
    inverse: {
      background: hover ? '#fff' : 'rgba(255,255,255,0.92)',
      color: PW.ink,
      border: '1px solid transparent',
      boxShadow: hover ? PW.shadowMd : PW.shadowSm
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: PW.sans,
    fontWeight: 600,
    lineHeight: 1,
    cursor: 'pointer',
    transition: `all 240ms ${PW.ease}`,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    ...sizes[size],
    ...variants[variant],
    ...style
  };
  const Tag = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, {
    type: href ? undefined : type,
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: base
  }, children);
}

// ───────── Eyebrow ───────────────────────────────────────────────────
function Eyebrow({
  children,
  color = PW.green700
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color
    }
  }, children);
}

// ───────── Pill ──────────────────────────────────────────────────────
function Pill({
  children,
  tone = 'neutral'
}) {
  const tones = {
    neutral: {
      bg: PW.paper2,
      fg: PW.ink500,
      dot: PW.mute
    },
    success: {
      bg: PW.green50,
      fg: PW.green700,
      dot: PW.green
    },
    warning: {
      bg: '#FAF1DC',
      fg: '#7A5410',
      dot: '#C4881B'
    },
    danger: {
      bg: '#F7E2E5',
      fg: '#7A2230',
      dot: '#B5384A'
    },
    info: {
      bg: '#E0EBFA',
      fg: '#143E80',
      dot: '#1E5FBF'
    },
    ink: {
      bg: PW.ink,
      fg: '#fff',
      dot: PW.green
    }
  };
  const t = tones[tone];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '5px 10px',
      borderRadius: 999,
      background: t.bg,
      color: t.fg,
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 12,
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: t.dot
    }
  }), children);
}

// ───────── Card ──────────────────────────────────────────────────────
function Card({
  children,
  padding = 24,
  radius = 16,
  style,
  hoverable = false
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: PW.white,
      border: `1px solid ${PW.line}`,
      borderRadius: radius,
      padding,
      boxShadow: hoverable && hover ? PW.shadowMd : PW.shadowSm,
      transition: `box-shadow 240ms ${PW.ease}`,
      ...style
    }
  }, children);
}

// ───────── Field ─────────────────────────────────────────────────────
function Field({
  label,
  hint,
  error,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      color: PW.ink500,
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      padding: '11px 14px',
      fontFamily: PW.sans,
      fontSize: 14,
      color: PW.ink,
      background: PW.white,
      border: `1px solid ${error ? '#B5384A' : focus ? PW.green : PW.line2}`,
      borderRadius: 8,
      outline: 'none',
      boxShadow: focus && !error ? '0 0 0 3px rgba(16,160,96,0.30)' : 'none',
      transition: `all 240ms ${PW.ease}`,
      boxSizing: 'border-box'
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontFamily: PW.sans,
      fontSize: 12,
      color: error ? '#B5384A' : PW.mute
    }
  }, error || hint));
}

// ───────── Section wrapper ───────────────────────────────────────────
function Section({
  children,
  dark = false,
  alt = false,
  id,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    style: {
      background: dark ? PW.ink : alt ? PW.paper2 : PW.paper,
      color: dark ? '#fff' : PW.ink,
      padding: '96px 0',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '0 32px'
    }
  }, children));
}

// ───────── Inline SVG glyphs we use across the site ──────────────────
// (No Lucide CDN injected here — keep the kit self-contained for now.)
function IconArrowRight({
  size = 16,
  color = 'currentColor'
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6"
  }));
}
function IconCheck({
  size = 16,
  color = PW.green
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5"
  }));
}
function IconChevronDown({
  size = 16,
  color = 'currentColor'
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  }));
}
Object.assign(window, {
  PW,
  Button,
  Eyebrow,
  Pill,
  Card,
  Field,
  Section,
  IconArrowRight,
  IconCheck,
  IconChevronDown
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ui.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/v2_CtaBand.jsx
try { (() => {
// v2 CTA band — flat ink panel with green primary, two columns of supporting
// detail (what you get + what to expect next).

function CtaBandV2({
  onCtaClick
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    style: {
      background: PW.ink,
      color: '#fff',
      padding: '112px 0',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      top: -160,
      left: -180,
      width: 520,
      height: 520,
      background: 'radial-gradient(circle, rgba(14,149,96,0.20) 0%, rgba(14,149,96,0) 60%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      bottom: -200,
      right: -140,
      width: 560,
      height: 560,
      background: 'radial-gradient(circle, rgba(37,99,217,0.14) 0%, rgba(37,99,217,0) 60%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 1240,
      margin: '0 auto',
      padding: '0 32px',
      display: 'grid',
      gridTemplateColumns: '1.1fr 0.9fr',
      gap: 80,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: PW.green
    }
  }, "Get started"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '14px 0 0',
      fontFamily: PW.sans,
      fontWeight: 800,
      fontSize: 'clamp(2.25rem, 4.4vw, 3.5rem)',
      lineHeight: 1.04,
      letterSpacing: '-0.025em',
      color: '#fff'
    }
  }, "Send us one order. We'll show you the rest."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '22px 0 0',
      maxWidth: 520,
      fontFamily: PW.sans,
      fontSize: 17,
      lineHeight: 1.6,
      color: '#A8B1C7'
    }
  }, "Submit an example order and we'll come back with a price comparison from our vendor network in two business days. No contract, no commitment \u2014 just the number."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 32,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "green",
    size: "lg",
    onClick: onCtaClick
  }, "Submit an example order ", /*#__PURE__*/React.createElement(IconArrowRight, {
    size: 16
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "inverse",
    size: "lg",
    href: "mailto:cuadrosda21@gmail.com"
  }, "Email the team")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      fontFamily: PW.sans,
      fontSize: 13,
      color: '#A8B1C7'
    }
  }, "Transparent pricing\xA0\xA0\u2022\xA0\xA0No subscription fees\xA0\xA0\u2022\xA0\xA0Cancel anytime")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.10)',
      borderRadius: 0,
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 14,
      color: '#fff',
      letterSpacing: '0.04em',
      textTransform: 'uppercase'
    }
  }, "What happens after you submit"), /*#__PURE__*/React.createElement("ol", {
    style: {
      margin: '20px 0 0',
      padding: 0,
      listStyle: 'none',
      display: 'grid',
      rowGap: 16,
      counterReset: 'step'
    }
  }, [['Within 24h', 'A scientist on our team reviews your example order.'], ['Within 48h', 'You get a side-by-side price comparison and ETA.'], ['When ready', 'We onboard your team and start placing real orders.']].map(([when, what], i) => /*#__PURE__*/React.createElement("li", {
    key: when,
    style: {
      display: 'grid',
      gridTemplateColumns: '36px 1fr',
      gap: 14,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: 'rgba(14,149,96,0.16)',
      color: PW.green,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: PW.serif,
      fontSize: 16,
      fontWeight: 600,
      fontVariantNumeric: 'tabular-nums'
    }
  }, i + 1), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.mono,
      fontSize: 11,
      color: PW.green,
      letterSpacing: '0.10em',
      textTransform: 'uppercase'
    }
  }, when), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontFamily: PW.sans,
      fontSize: 15,
      color: '#fff',
      lineHeight: 1.45
    }
  }, what))))))));
}
Object.assign(window, {
  CtaBandV2
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/v2_CtaBand.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/v2_FAQ.jsx
try { (() => {
// FAQ accordion with the photo on the left and questions on the right.

const QS = [{
  q: 'How does the billing process work?',
  a: 'Each month, you receive an itemized invoice with all bill-backs and receipts attached. All receipts are specifically for your company and only include items purchased for your company — no absurd "redacted" receipts.'
}, {
  q: 'What is the purpose of the security deposit?',
  a: 'To ensure the lowest possible cost and fastest onboarding, we use the security deposit to establish a line of credit you can order against. The deposit is returned after you terminate the contract, assuming all outstanding invoices are paid.'
}, {
  q: 'What is the timeline for placing orders?',
  a: 'Most orders go in the same day they are requested. With more than 150 vendors, each has its own cutoff time — orders received close to a vendor\'s cutoff may go out the next day.'
}, {
  q: 'How do you manage backorders?',
  a: 'When an item is backordered we immediately notify you of the projected timeline. If the delay is unacceptable, we attempt to find the exact item from another vendor. We never substitute an item or vendor without your explicit approval.'
}, {
  q: 'Will I lose control?',
  a: 'No. We only order what you request. You approve every change to the order, the vendor, or the timing.'
}, {
  q: 'Are there hidden fees?',
  a: 'No. Pricing is transparent and itemized. No subscription fees. Cancel anytime.'
}];
function FAQRow({
  q,
  a,
  open,
  onClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: `1px solid ${PW.line}`
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      width: '100%',
      background: 'transparent',
      border: 0,
      padding: '20px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      textAlign: 'left',
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 17,
      color: PW.ink
    }
  }, q, /*#__PURE__*/React.createElement("span", {
    style: {
      transform: open ? 'rotate(180deg)' : 'rotate(0)',
      transition: `transform 240ms ${PW.ease}`,
      color: PW.mute
    }
  }, /*#__PURE__*/React.createElement(IconChevronDown, {
    size: 20
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: open ? 400 : 0,
      overflow: 'hidden',
      transition: `max-height 280ms ${PW.ease}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 20,
      fontFamily: PW.sans,
      fontSize: 15,
      lineHeight: 1.65,
      color: PW.ink500,
      maxWidth: 560
    }
  }, a)));
}
function FAQV2() {
  const [openIdx, setOpenIdx] = React.useState(0);
  return /*#__PURE__*/React.createElement(Section, {
    id: "faq"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '0.85fr 1.15fr',
      gap: 64,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Got questions?"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '14px 0 18px',
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: PW.ink
    }
  }, "Frequently asked questions"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 24px',
      fontFamily: PW.sans,
      fontSize: 16,
      lineHeight: 1.55,
      color: PW.ink500
    }
  }, "Everything you need to know about our procurement service. Can't find what you're looking for? Reach out."), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/brand/FAQ.png",
    alt: "",
    style: {
      width: '100%',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      fontFamily: PW.sans,
      fontStyle: 'italic',
      fontSize: 14,
      color: PW.mute
    }
  }, "Our team is here to help.")), /*#__PURE__*/React.createElement("div", null, QS.map((it, i) => /*#__PURE__*/React.createElement(FAQRow, {
    key: it.q,
    q: it.q,
    a: it.a,
    open: openIdx === i,
    onClick: () => setOpenIdx(openIdx === i ? -1 : i)
  })))));
}
Object.assign(window, {
  FAQV2
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/v2_FAQ.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/v2_Footer.jsx
try { (() => {
// Dark CTA band + footer.

function _UnusedCtaBand({
  onCtaClick
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    style: {
      background: PW.ink,
      color: '#fff',
      padding: '96px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '0 auto',
      padding: '0 32px',
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      gap: 64,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    color: PW.green
  }, "Ready when you are"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '14px 0 0',
      fontFamily: PW.serif,
      fontWeight: 400,
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      lineHeight: 1.04,
      letterSpacing: '-0.02em',
      color: '#fff'
    }
  }, "Take control of your procurement."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '20px 0 0',
      maxWidth: 520,
      fontFamily: PW.sans,
      fontSize: 17,
      lineHeight: 1.55,
      color: '#A8B1C7'
    }
  }, "Our team is here to streamline your procurement and answer any questions. Don't hesitate to reach out."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "green",
    size: "lg",
    onClick: onCtaClick
  }, "Join us today ", /*#__PURE__*/React.createElement(IconArrowRight, {
    size: 16
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "inverse",
    size: "lg",
    href: "mailto:cuadrosda21@gmail.com"
  }, "Email the team")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      fontFamily: PW.sans,
      fontSize: 13,
      color: '#A8B1C7'
    }
  }, "Transparent pricing\xA0\xA0\u2022\xA0\xA0No subscription fees\xA0\xA0\u2022\xA0\xA0Cancel anytime")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.10)',
      borderRadius: 0,
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.serif,
      fontSize: 56,
      lineHeight: 1,
      color: PW.green
    }
  }, "89%"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 18,
      color: '#fff'
    }
  }, "Client success rate"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontFamily: PW.sans,
      fontSize: 14,
      color: '#A8B1C7'
    }
  }, "49 of 55 companies. Clients have raised over $900M."), /*#__PURE__*/React.createElement("hr", {
    style: {
      border: 0,
      borderTop: '1px solid rgba(255,255,255,0.10)',
      margin: '22px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.serif,
      fontSize: 32,
      color: '#fff'
    }
  }, "200+"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 13,
      color: '#A8B1C7'
    }
  }, "partner vendors")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.serif,
      fontSize: 32,
      color: '#fff'
    }
  }, "10 / mo"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 13,
      color: '#A8B1C7'
    }
  }, "new vendors added"))))));
}
function FooterV2() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: PW.paper2,
      borderTop: `1px solid ${PW.line}`,
      padding: '56px 0 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '0 32px',
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    href: "#home",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/brand/procurewide-logo.png",
    alt: "",
    style: {
      width: 36,
      height: 36,
      objectFit: 'contain'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 800,
      fontSize: 18,
      color: PW.ink
    }
  }, "ProcureWide")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 14,
      maxWidth: 380,
      fontFamily: PW.sans,
      fontSize: 14,
      lineHeight: 1.55,
      color: PW.mute
    }
  }, "Innovative procurement strategies that empower founders to streamline operations and maximize savings."), /*#__PURE__*/React.createElement("a", {
    href: "mailto:cuadrosda21@gmail.com",
    style: {
      display: 'inline-block',
      marginTop: 14,
      fontFamily: PW.mono,
      fontSize: 13,
      color: PW.ink500,
      textDecoration: 'none',
      borderBottom: `1px solid ${PW.line2}`
    }
  }, "cuadrosda21@gmail.com")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: PW.ink
    }
  }, "Company"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '14px 0 0',
      padding: 0,
      listStyle: 'none',
      display: 'grid',
      rowGap: 8
    }
  }, ['About', 'Process', 'FAQ', 'Contact'].map(l => /*#__PURE__*/React.createElement("li", {
    key: l
  }, /*#__PURE__*/React.createElement("a", {
    href: `#${l.toLowerCase()}`,
    style: {
      fontFamily: PW.sans,
      fontSize: 14,
      color: PW.ink500,
      textDecoration: 'none'
    }
  }, l))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 600,
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: PW.ink
    }
  }, "Resources"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '14px 0 0',
      padding: 0,
      listStyle: 'none',
      display: 'grid',
      rowGap: 8
    }
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#case-studies",
    style: {
      fontFamily: PW.sans,
      fontSize: 14,
      color: PW.ink500,
      textDecoration: 'none'
    }
  }, "Case Studies"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '40px auto 0',
      padding: '0 32px',
      borderTop: `1px solid ${PW.line}`,
      paddingTop: 24,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      color: PW.mute
    }
  }, "\xA9 2026 The ProcureWide Company, LLC. All rights reserved."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.serif,
      fontStyle: 'italic',
      fontSize: 14,
      color: PW.ink500
    }
  }, "Created by a Founder to Support Founders")));
}
Object.assign(window, {
  FooterV2
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/v2_Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/v2_Hero.jsx
try { (() => {
// v2 Hero — enterprise rhythm. Bold sans headline (not editorial), eyebrow with
// product context, two CTAs, trust strip below. Right column: lab photo plus a
// floating "transparent pricing" card overlay (a glimpse of the work, not just vibes).

function HeroV2({
  onCtaClick
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "home",
    style: {
      position: 'relative',
      background: PW.paper,
      padding: '72px 0 96px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      top: -160,
      right: -160,
      width: 640,
      height: 640,
      background: 'radial-gradient(circle, rgba(14,149,96,0.10) 0%, rgba(14,149,96,0) 60%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      bottom: -200,
      left: -120,
      width: 520,
      height: 520,
      background: 'radial-gradient(circle, rgba(37,99,217,0.08) 0%, rgba(37,99,217,0) 60%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 1240,
      margin: '0 auto',
      padding: '0 32px',
      display: 'grid',
      gridTemplateColumns: '1.1fr 0.95fr',
      gap: 64,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 12px 6px 8px',
      background: '#fff',
      border: `1px solid ${PW.line}`,
      borderRadius: 2,
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 600,
      color: PW.ink500,
      boxShadow: PW.shadowSm
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '3px 8px',
      borderRadius: 2,
      background: PW.green50,
      color: PW.green700,
      fontSize: 11,
      letterSpacing: '0.06em',
      textTransform: 'uppercase'
    }
  }, "New"), "Procurement-as-a-service for life sciences"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '20px 0 0',
      fontFamily: PW.sans,
      fontWeight: 800,
      fontSize: 'clamp(1.625rem, 3.4vw, 2.5rem)',
      lineHeight: 1.08,
      letterSpacing: '-0.02em',
      color: PW.ink
    }
  }, "Procurement that runs", /*#__PURE__*/React.createElement("br", null), "on your behalf \u2014", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.green
    }
  }, "not against you.")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '24px 0 0',
      maxWidth: 540,
      fontFamily: PW.sans,
      fontSize: 18,
      lineHeight: 1.55,
      color: PW.ink500
    }
  }, "ProcureWide is an independent service that absorbs the day-to-day weight of vendor sourcing, negotiations, and documentation \u2014 so your scientists stay focused on the bench. Every order approved by you. No hidden fees."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 32,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "green",
    size: "lg",
    onClick: onCtaClick
  }, "Submit an example order ", /*#__PURE__*/React.createElement(IconArrowRight, {
    size: 16
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    href: "#process"
  }, "See how it works")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      display: 'flex',
      alignItems: 'center',
      gap: 22,
      flexWrap: 'wrap',
      paddingTop: 22,
      borderTop: `1px solid ${PW.line}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.mono,
      fontSize: 11,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: PW.mute
    }
  }, "Trusted by founders building at"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 22,
      alignItems: 'center',
      opacity: 0.85,
      fontFamily: PW.sans,
      fontSize: 13,
      fontWeight: 600,
      color: PW.ink500,
      letterSpacing: '-0.005em'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Prodigy Labs"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.line2
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, "$900M+ raised across portfolio"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.line2
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, "49 / 55 successes")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 0,
      overflow: 'hidden',
      aspectRatio: '4 / 5',
      boxShadow: PW.shadowLg,
      border: `1px solid ${PW.line}`
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/brand/hero.png",
    alt: "Scientist at a qPCR thermal cycler",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(7,17,42,0) 60%, rgba(7,17,42,0.20) 100%)',
      pointerEvents: 'none'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: -28,
      bottom: 36,
      width: 320,
      padding: 18,
      background: '#fff',
      borderRadius: 0,
      border: `1px solid ${PW.line}`,
      boxShadow: PW.shadowLg
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.mono,
      fontSize: 11,
      color: PW.mute,
      letterSpacing: '0.12em',
      textTransform: 'uppercase'
    }
  }, "Price comparison \xB7 ORD-018"), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '3px 8px',
      borderRadius: 2,
      background: PW.green50,
      color: PW.green700,
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase'
    }
  }, "Best price")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 15,
      color: PW.ink
    }
  }, "Pierce\u2122 BCA Protein Assay Kit"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: 'grid',
      rowGap: 8
    }
  }, [{
    v: 'Thermo Fisher',
    a: '$1,184',
    b: '5 days',
    best: false
  }, {
    v: 'Fisher Scientific',
    a: '$1,062',
    b: '3 days',
    best: true
  }, {
    v: 'VWR',
    a: '$1,219',
    b: '7 days',
    best: false
  }].map(r => /*#__PURE__*/React.createElement("div", {
    key: r.v,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto auto',
      alignItems: 'center',
      gap: 12,
      padding: '8px 10px',
      borderRadius: 0,
      background: r.best ? PW.green50 : 'transparent',
      border: `1px solid ${r.best ? '#BFE7CF' : 'transparent'}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 13,
      color: PW.ink,
      fontWeight: r.best ? 700 : 500
    }
  }, r.v), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.mono,
      fontSize: 12.5,
      color: PW.ink,
      fontVariantNumeric: 'tabular-nums',
      fontWeight: r.best ? 700 : 500
    }
  }, r.a), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.mono,
      fontSize: 11.5,
      color: PW.mute
    }
  }, r.b)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      paddingTop: 10,
      borderTop: `1px solid ${PW.line}`,
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: PW.sans,
      fontSize: 12.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.mute
    }
  }, "You save \xB7 this order"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: PW.green700,
      fontWeight: 800
    }
  }, "$157 (13%)"))))));
}
Object.assign(window, {
  HeroV2
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/v2_Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/v2_Nav.jsx
try { (() => {
// v2 Nav — denser, enterprise rhythm: utility row above the main nav, mega-menu hints,
// pill CTAs. Sticks ProcureWide ink + green identity.

function NavV2({
  onCtaClick
}) {
  const [scrolled, setScrolled] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(null);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const NavItem = ({
    label,
    sub
  }) => {
    const open = openMenu === label;
    return /*#__PURE__*/React.createElement("div", {
      onMouseEnter: () => sub && setOpenMenu(label),
      onMouseLeave: () => sub && setOpenMenu(null),
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: `#${label.toLowerCase().replace(/\s+/g, '-')}`,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '8px 2px',
        fontFamily: PW.sans,
        fontSize: 14,
        fontWeight: 600,
        color: open ? PW.ink : PW.ink500,
        textDecoration: 'none',
        transition: `color 140ms ${PW.ease}`
      }
    }, label, sub && /*#__PURE__*/React.createElement("svg", {
      width: "10",
      height: "10",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.4",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: {
        marginTop: 1,
        opacity: 0.65
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "M6 9l6 6 6-6"
    }))), sub && open && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: '100%',
        left: -16,
        marginTop: 6,
        padding: 14,
        minWidth: 280,
        background: '#fff',
        border: `1px solid ${PW.line}`,
        borderRadius: 0,
        boxShadow: PW.shadowLg,
        display: 'grid',
        rowGap: 4,
        zIndex: 40
      }
    }, sub.map(item => /*#__PURE__*/React.createElement("a", {
      key: item.t,
      href: item.href || '#',
      style: {
        display: 'block',
        padding: '10px 12px',
        borderRadius: 0,
        textDecoration: 'none',
        fontFamily: PW.sans
      },
      onMouseEnter: e => e.currentTarget.style.background = PW.paper2,
      onMouseLeave: e => e.currentTarget.style.background = 'transparent'
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: PW.ink
      }
    }, item.t), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        color: PW.mute,
        marginTop: 2,
        lineHeight: 1.45
      }
    }, item.d)))));
  };
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 30,
      background: scrolled ? 'rgba(251,250,246,0.86)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
      borderBottom: scrolled ? `1px solid ${PW.line}` : '1px solid transparent',
      transition: `all 240ms ${PW.ease}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: PW.ink,
      color: '#A8B1C7',
      fontFamily: PW.sans,
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '8px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: PW.green
    }
  }), "Pre-launch \xB7 onboarding biotech teams now")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#prodigy",
    style: {
      color: '#A8B1C7',
      textDecoration: 'none'
    }
  }, "Prodigy Platform"), /*#__PURE__*/React.createElement("a", {
    href: "#contact",
    style: {
      color: '#A8B1C7',
      textDecoration: 'none'
    }
  }, "Contact sales")))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '14px 32px',
      display: 'flex',
      alignItems: 'center',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#home",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/brand/procurewide-logo.png",
    alt: "",
    style: {
      width: 34,
      height: 34,
      objectFit: 'contain'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 800,
      fontSize: 18,
      color: PW.ink,
      letterSpacing: '-0.01em'
    }
  }, "ProcureWide")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 28,
      flex: 1,
      marginLeft: 12
    }
  }, /*#__PURE__*/React.createElement(NavItem, {
    label: "Platform",
    sub: [{
      t: 'How it works',
      d: 'A five-step service: enroll, order, deliver, document.'
    }, {
      t: 'Vendor network',
      d: '200+ partners, adding ~10 per month.'
    }, {
      t: 'Transparency',
      d: 'No hidden fees, every order approved by you.'
    }]
  }), /*#__PURE__*/React.createElement(NavItem, {
    label: "Solutions",
    sub: [{
      t: 'Early-stage biotech',
      d: 'Founders and lab managers running lean.'
    }, {
      t: 'Incubator residents',
      d: 'Prodigy Labs partners and incubator alumni.'
    }, {
      t: 'Series A & beyond',
      d: 'Scale procurement without scaling overhead.'
    }]
  }), /*#__PURE__*/React.createElement(NavItem, {
    label: "Resources",
    sub: [{
      t: 'Pricing',
      d: 'Submit an example order, see a price comparison.'
    }, {
      t: 'About',
      d: 'Made by scientists, for science.'
    }, {
      t: 'FAQ',
      d: 'Common questions, answered directly.'
    }]
  }), /*#__PURE__*/React.createElement(NavItem, {
    label: "Customers"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#login",
    style: {
      fontFamily: PW.sans,
      fontSize: 14,
      fontWeight: 600,
      color: PW.ink,
      textDecoration: 'none'
    }
  }, "Login"), /*#__PURE__*/React.createElement(Button, {
    variant: "green",
    size: "md",
    onClick: onCtaClick
  }, "Get pricing ", /*#__PURE__*/React.createElement(IconArrowRight, {
    size: 14
  })))));
}
Object.assign(window, {
  NavV2
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/v2_Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/v2_Outcomes.jsx
try { (() => {
// v2 Outcomes — split layout, dark ink panel left + light card right. A "before /
// after" framing for what a customer's procurement workflow looks like with PW.

function OutcomesV2() {
  return /*#__PURE__*/React.createElement("section", {
    id: "outcomes",
    style: {
      background: PW.ink,
      color: '#fff',
      padding: '120px 0',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      top: -200,
      right: -180,
      width: 560,
      height: 560,
      background: 'radial-gradient(circle, rgba(14,149,96,0.18) 0%, rgba(14,149,96,0) 60%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 1240,
      margin: '0 auto',
      padding: '0 32px',
      display: 'grid',
      gridTemplateColumns: '0.95fr 1.05fr',
      gap: 80,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 12,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: PW.green
    }
  }, "Outcomes"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '14px 0 0',
      fontFamily: PW.sans,
      fontWeight: 800,
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      lineHeight: 1.05,
      letterSpacing: '-0.025em',
      color: '#fff'
    }
  }, "What changes in the first 30 days."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '22px 0 0',
      maxWidth: 480,
      fontFamily: PW.sans,
      fontSize: 17,
      lineHeight: 1.6,
      color: '#A8B1C7'
    }
  }, "Most teams come to us with the same three problems. Within a month, the shape of the workweek changes \u2014 the requisition queue stops growing, backorders stop landing on a scientist's plate, and the monthly invoice tells a coherent story."), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '32px 0 0',
      padding: 0,
      listStyle: 'none',
      display: 'grid',
      rowGap: 18
    }
  }, [['Requisition load', 'Founder and lab-manager hours on procurement', 'down ~70%'], ['Backorder triage', 'Time scientists spend chasing vendors', 'effectively zero'], ['Spend visibility', 'Itemized billing with regulatory docs', 'one monthly invoice']].map(([t, d, m]) => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: 'grid',
      gridTemplateColumns: '24px 1fr auto',
      gap: 16,
      alignItems: 'flex-start',
      padding: '14px 0',
      borderTop: '1px solid rgba(255,255,255,0.08)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 4,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: 'rgba(14,149,96,0.18)',
      color: PW.green
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 16,
      color: '#fff'
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 2,
      fontFamily: PW.sans,
      fontSize: 13.5,
      color: '#A8B1C7'
    }
  }, d)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.mono,
      fontSize: 12.5,
      color: PW.green,
      whiteSpace: 'nowrap',
      padding: '4px 10px',
      borderRadius: 2,
      background: 'rgba(14,149,96,0.10)',
      border: '1px solid rgba(14,149,96,0.30)'
    }
  }, m))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      color: PW.ink,
      borderRadius: 0,
      padding: 24,
      border: `1px solid ${PW.line}`,
      boxShadow: '0 32px 64px -16px rgba(0,0,0,0.30)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 16,
      borderBottom: `1px solid ${PW.line}`
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.mono,
      fontSize: 11,
      color: PW.mute,
      letterSpacing: '0.12em',
      textTransform: 'uppercase'
    }
  }, "Invoice \xB7 April 2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontFamily: PW.sans,
      fontWeight: 800,
      fontSize: 22,
      color: PW.ink,
      letterSpacing: '-0.01em'
    }
  }, "Helix Bio Co.")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.mono,
      fontSize: 11,
      color: PW.mute,
      textTransform: 'uppercase',
      letterSpacing: '0.12em'
    }
  }, "Total"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.serif,
      fontWeight: 600,
      fontSize: 36,
      color: PW.ink,
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 1,
      marginTop: 4
    }
  }, "$48,210"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, [{
    d: '32 lab orders placed',
    v: '$42,860',
    s: 'across 14 vendors'
  }, {
    d: 'Procurement service fee',
    v: '$4,800',
    s: 'flat monthly'
  }, {
    d: 'Documentation handling',
    v: '$550',
    s: 'COAs + SDS, 28 docs'
  }].map(r => /*#__PURE__*/React.createElement("div", {
    key: r.d,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      alignItems: 'baseline',
      padding: '12px 0',
      borderBottom: `1px dashed ${PW.line}`
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontSize: 14.5,
      color: PW.ink,
      fontWeight: 600
    }
  }, r.d), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 2,
      fontFamily: PW.sans,
      fontSize: 12.5,
      color: PW.mute
    }
  }, r.s)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.mono,
      fontSize: 14,
      color: PW.ink,
      fontVariantNumeric: 'tabular-nums',
      fontWeight: 700
    }
  }, r.v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      padding: 14,
      background: PW.green50,
      border: '1px solid #BFE7CF',
      borderRadius: 0,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 13.5,
      color: PW.green700
    }
  }, "Procurement savings vs. baseline"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 2,
      fontFamily: PW.sans,
      fontSize: 12.5,
      color: PW.green700
    }
  }, "Across 32 orders this month")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.serif,
      fontWeight: 600,
      fontSize: 28,
      color: PW.green700,
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 1
    }
  }, "\u2212$6,420")))));
}
Object.assign(window, {
  OutcomesV2
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/v2_Outcomes.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/v2_Resources.jsx
try { (() => {
// v2 Resources — 3-up "Resources / Insights" card row. Tag pill, title,
// description, "read" link. Standard enterprise insight-hub block.

function ResourcesV2() {
  const items = [{
    tag: 'Guide',
    eyebrow: '8 min read',
    title: 'A founder\'s guide to procurement leverage',
    d: 'How to think about vendor negotiation, line-item savings, and where most lab budgets quietly leak.'
  }, {
    tag: 'Case study',
    eyebrow: 'Helix Bio Co.',
    title: 'From PO spreadsheets to a single monthly invoice',
    d: 'A Series A biotech moved 32 orders/month off the founder\'s plate in their first quarter with ProcureWide.'
  }, {
    tag: 'Playbook',
    eyebrow: 'Operations',
    title: 'Backorder triage without burning a scientist',
    d: 'A repeatable workflow for substitutions, ETA changes, and partial shipments — without losing the bench day.'
  }];
  const tagTone = {
    'Guide': {
      bg: PW.green50,
      fg: PW.green700
    },
    'Case study': {
      bg: '#DDE7F8',
      fg: '#1E4FB0'
    },
    'Playbook': {
      bg: PW.paper2,
      fg: PW.ink
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "resources",
    style: {
      background: PW.paper,
      padding: '120px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '0 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'end',
      gap: 32,
      marginBottom: 48,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Insights"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '14px 0 0',
      fontFamily: PW.sans,
      fontWeight: 800,
      fontSize: 'clamp(1.75rem, 3.4vw, 2.5rem)',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: PW.ink,
      maxWidth: 720
    }
  }, "From the field, not the funnel.")), /*#__PURE__*/React.createElement("a", {
    href: "#all-resources",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: PW.sans,
      fontSize: 14,
      fontWeight: 600,
      color: PW.ink,
      textDecoration: 'none',
      padding: '10px 14px',
      borderRadius: 2,
      border: `1px solid ${PW.line2}`,
      background: '#fff'
    }
  }, "Browse all resources ", /*#__PURE__*/React.createElement(IconArrowRight, {
    size: 14
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 20
    }
  }, items.map(it => {
    const t = tagTone[it.tag];
    return /*#__PURE__*/React.createElement("a", {
      key: it.title,
      href: "#",
      style: {
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        border: `1px solid ${PW.line}`,
        borderRadius: 0,
        overflow: 'hidden',
        boxShadow: PW.shadowSm,
        textDecoration: 'none',
        color: 'inherit',
        transition: `box-shadow 240ms ${PW.ease}, transform 240ms ${PW.ease}`
      },
      onMouseEnter: e => {
        e.currentTarget.style.boxShadow = PW.shadowLg;
        e.currentTarget.style.transform = 'translateY(-2px)';
      },
      onMouseLeave: e => {
        e.currentTarget.style.boxShadow = PW.shadowSm;
        e.currentTarget.style.transform = 'translateY(0)';
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 140,
        background: `repeating-linear-gradient(135deg, ${PW.paper2} 0px, ${PW.paper2} 1px, ${PW.paper} 1px, ${PW.paper} 14px)`,
        borderBottom: `1px solid ${PW.line}`,
        display: 'flex',
        alignItems: 'flex-end',
        padding: 16
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        padding: '5px 10px',
        borderRadius: 2,
        background: t.bg,
        color: t.fg,
        fontFamily: PW.sans,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase'
      }
    }, it.tag)), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: PW.mono,
        fontSize: 11.5,
        color: PW.mute,
        letterSpacing: '0.10em',
        textTransform: 'uppercase'
      }
    }, it.eyebrow), /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: '8px 0 10px',
        fontFamily: PW.sans,
        fontWeight: 700,
        fontSize: 19,
        lineHeight: 1.25,
        letterSpacing: '-0.01em',
        color: PW.ink
      }
    }, it.title), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontFamily: PW.sans,
        fontSize: 14,
        lineHeight: 1.55,
        color: PW.ink500
      }
    }, it.d), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'auto',
        paddingTop: 18,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: PW.sans,
        fontSize: 14,
        fontWeight: 700,
        color: PW.green700
      }
    }, "Read article ", /*#__PURE__*/React.createElement(IconArrowRight, {
      size: 14
    }))));
  }))));
}
Object.assign(window, {
  ResourcesV2
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/v2_Resources.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/v2_Solutions.jsx
try { (() => {
// v2 Solutions — three pillar cards. Stronger structure than v1's value grid.
// Eyebrow + bold H2 + lead, then 3 cards with icon, title, description, and a
// secondary "what's included" list. Enterprise-marketing rhythm.

function SolutionsV2() {
  const pillars = [{
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "22",
      height: "22",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M3 7l9-4 9 4-9 4-9-4z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 12l9 4 9-4M3 17l9 4 9-4"
    })),
    eyebrow: 'Sourcing',
    title: 'Vendor network at your back',
    d: 'Tap a 200+ partner network instead of building it order by order. We run the comparison and place the order — you keep the final say.',
    items: ['Side-by-side price comparison', 'Negotiated pricing on repeat orders', '~10 new vendors added every month']
  }, {
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "22",
      height: "22",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "4",
      width: "18",
      height: "16",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 10h18M9 4v16"
    })),
    eyebrow: 'Operations',
    title: 'Backorder triage, off your plate',
    d: 'We chase shipments, reroute substitutions, and pull documentation from your vendors — so your bench stops being a logistics desk.',
    items: ['Shipment + ETA tracking', 'COAs, SDS, and reg docs centralized', 'Substitution approvals routed to you']
  }, {
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "22",
      height: "22",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 2v20M5 9l7-7 7 7M5 15l7 7 7-7"
    })),
    eyebrow: 'Control',
    title: 'Transparent, on your terms',
    d: 'One monthly invoice. Every order approved by you before it goes out. No upselling, no rebates we pocket, no surprises.',
    items: ['Per-order approval workflow', 'Itemized monthly billing', 'Cancel anytime — no lock-in']
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "platform",
    style: {
      background: PW.paper,
      padding: '120px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '0 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '0.85fr 1fr',
      gap: 64,
      alignItems: 'end',
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "The Platform"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '14px 0 0',
      fontFamily: PW.sans,
      fontWeight: 800,
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      lineHeight: 1.05,
      letterSpacing: '-0.025em',
      color: PW.ink
    }
  }, "One service, three pillars of leverage.")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: PW.sans,
      fontSize: 17,
      lineHeight: 1.55,
      color: PW.ink500
    }
  }, "ProcureWide isn't a tool you log into. It's a team that runs procurement for you \u2014 built around the three points where biotech founders consistently lose time and money.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 20
    }
  }, pillars.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.title,
    style: {
      background: '#fff',
      border: `1px solid ${PW.line}`,
      borderRadius: 0,
      padding: 28,
      boxShadow: PW.shadowSm,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 0,
      background: PW.green50,
      color: PW.green700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, p.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      fontFamily: PW.sans,
      fontSize: 11,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: PW.green700
    }
  }, p.eyebrow), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 22,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      color: PW.ink
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 18px',
      fontFamily: PW.sans,
      fontSize: 14.5,
      lineHeight: 1.6,
      color: PW.ink500
    }
  }, p.d), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 'auto 0 0',
      padding: 0,
      listStyle: 'none',
      paddingTop: 18,
      borderTop: `1px solid ${PW.line}`,
      display: 'grid',
      rowGap: 8
    }
  }, p.items.map(it => /*#__PURE__*/React.createElement("li", {
    key: it,
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 8,
      fontFamily: PW.sans,
      fontSize: 13.5,
      color: PW.ink
    }
  }, /*#__PURE__*/React.createElement(IconCheck, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, it)))))))));
}
Object.assign(window, {
  SolutionsV2
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/v2_Solutions.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/v2_StatBand.jsx
try { (() => {
// v2 StatBand — four-stat marquee, paper background, large numerals, hairline
// dividers. The "by the numbers" enterprise pattern.

function StatBandV2() {
  const stats = [{
    n: '200+',
    l: 'Partner vendors',
    s: 'Adding ~10 every month'
  }, {
    n: '13%',
    l: 'Avg. order savings',
    s: 'Across customer baseline'
  }, {
    n: '$900M+',
    l: 'Raised by clients',
    s: 'Across portfolio companies'
  }, {
    n: '89%',
    l: 'Client success rate',
    s: '49 of 55 supported companies'
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: PW.paper,
      padding: '40px 0',
      borderTop: `1px solid ${PW.line}`,
      borderBottom: `1px solid ${PW.line}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1240,
      margin: '0 auto',
      padding: '0 32px',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)'
    }
  }, stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.l,
    style: {
      padding: '8px 28px',
      borderLeft: i === 0 ? 'none' : `1px solid ${PW.line}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.serif,
      fontWeight: 600,
      fontSize: 'clamp(2rem, 3.6vw, 3rem)',
      lineHeight: 1,
      letterSpacing: '-0.02em',
      color: PW.ink,
      fontVariantNumeric: 'tabular-nums'
    }
  }, s.n), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 14,
      color: PW.ink
    }
  }, s.l), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontFamily: PW.sans,
      fontSize: 13,
      color: PW.mute,
      lineHeight: 1.45
    }
  }, s.s)))));
}
Object.assign(window, {
  StatBandV2
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/v2_StatBand.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/v2_Testimonial.jsx
try { (() => {
// v2 Testimonial — named, attributed, on paper-alt background. Large quote +
// portrait placeholder + company logo line. The "social proof" pattern from
// enterprise marketing sites.

function TestimonialV2() {
  return /*#__PURE__*/React.createElement("section", {
    id: "customers",
    style: {
      background: PW.paper2,
      padding: '120px 0',
      borderTop: `1px solid ${PW.line}`,
      borderBottom: `1px solid ${PW.line}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '0 auto',
      padding: '0 32px',
      display: 'grid',
      gridTemplateColumns: '0.5fr 1fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '4 / 5',
      borderRadius: 0,
      background: `repeating-linear-gradient(135deg, #E3E5DE 0px, #E3E5DE 1px, #F2F3EE 1px, #F2F3EE 12px), ${PW.paper}`,
      border: `1px solid ${PW.line}`,
      display: 'flex',
      alignItems: 'flex-end',
      padding: 16,
      fontFamily: PW.mono,
      fontSize: 11,
      color: PW.mute,
      letterSpacing: '0.10em',
      textTransform: 'uppercase'
    }
  }, "portrait \xB7 drop image here"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Customer story"), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: '20px 0 0',
      fontFamily: PW.serif,
      fontWeight: 500,
      fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
      lineHeight: 1.2,
      letterSpacing: '-0.015em',
      color: PW.ink
    }
  }, "\u201CWe stopped tracking POs in a spreadsheet the day we started with ProcureWide. Our team got a full day back per week. The monthly invoice is the cleanest document in our finance folder.\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 15,
      color: PW.ink
    }
  }, "Dr. Maya Chen"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 2,
      fontFamily: PW.sans,
      fontSize: 13.5,
      color: PW.mute
    }
  }, "Co-founder & CSO, Helix Bio Co.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 12,
      paddingLeft: 16,
      borderLeft: `1px solid ${PW.line2}`,
      fontFamily: PW.mono,
      fontSize: 11,
      color: PW.mute,
      letterSpacing: '0.10em',
      textTransform: 'uppercase'
    }
  }, "Series A \xB7 Prodigy Labs portfolio")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 24,
      paddingTop: 24,
      borderTop: `1px solid ${PW.line2}`
    }
  }, [['1 day/wk', 'Lab-manager time recovered'], ['18%', 'Savings on reagent line items'], ['0', 'Backorders chased by founder']].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PW.serif,
      fontWeight: 600,
      fontSize: 28,
      color: PW.green,
      lineHeight: 1,
      fontVariantNumeric: 'tabular-nums'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontFamily: PW.sans,
      fontSize: 13,
      color: PW.ink500
    }
  }, l)))))));
}
Object.assign(window, {
  TestimonialV2
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/v2_Testimonial.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/v2_VendorCloud.jsx
try { (() => {
// Vendor-logo cloud — "200+ Vendors: Currently Adding 10 Vendors/Month!"

const VENDORS = ['thermo-fisher.png', 'fisher-scientific.png', 'Abcam.png', 'agilent.png', 'biorad.png', 'beckman-coulter.png', 'cell-signaling.png', 'stemcell.png', 'genscript.avif', 'goldbio.webp', 'Origene-logo.webp', 'Raybiotech.png', 'takara.webp', 'amsbio.png', 'Amazon.png', 'Cisco.png'];
function VendorCloudV2() {
  return /*#__PURE__*/React.createElement(Section, {
    id: "vendors",
    alt: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      maxWidth: 760,
      margin: '0 auto 48px'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Partner network"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '14px 0 14px',
      fontFamily: PW.sans,
      fontWeight: 700,
      fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
      color: PW.ink
    }
  }, "200+ vendors \u2014 and adding ~10 per month."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: PW.sans,
      fontSize: 16,
      lineHeight: 1.55,
      color: PW.ink500
    }
  }, "We partner with the best in the industry, offering diverse and high-quality products for every need.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(8, 1fr)',
      gap: 10
    }
  }, VENDORS.map(v => /*#__PURE__*/React.createElement("div", {
    key: v,
    style: {
      background: PW.white,
      border: `1px solid ${PW.line}`,
      borderRadius: 0,
      height: 88,
      padding: 12,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `../../assets/vendors/${v}`,
    alt: "",
    style: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
      filter: 'saturate(0.92)'
    }
  })))));
}
Object.assign(window, {
  VendorCloudV2
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/v2_VendorCloud.jsx", error: String((e && e.message) || e) }); }

__ds_ns.StatusPill = __ds_scope.StatusPill;

})();
