// components.jsx — shared interactive UI: Button, Confetti, ProgressBar, XPBadge, etc.

const { useState, useEffect, useRef, useCallback } = React;

// ─── Sound-free haptic-style "tap" wrapper ───
const Tappable = ({ children, onTap, style, className = '', disabled, as = 'button', ...rest }) => {
  const Comp = as;
  return (
    <Comp
      className={`tappable ${className}`}
      onClick={(e) => !disabled && onTap && onTap(e)}
      disabled={disabled}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer', ...style }}
      {...rest}
    >
      {children}
    </Comp>
  );
};

// ─── 3D candy-button (Duolingo-style) ───
const CButton = ({ children, color = '#FF8A3D', dark, textColor = '#fff', size = 'md', onTap, disabled, style, full, icon, iconRight }) => {
  const dk = dark || shade(color, -.25);
  const sizes = {
    sm: { p: '10px 18px', f: 14, r: 14, bb: 4 },
    md: { p: '14px 26px', f: 15, r: 16, bb: 5 },
    lg: { p: '18px 36px', f: 18, r: 20, bb: 6 },
  }[size];
  return (
    <button
      onClick={(e) => !disabled && onTap && onTap(e)}
      disabled={disabled}
      className="cbtn"
      style={{
        position: 'relative',
        background: color,
        color: textColor,
        padding: sizes.p,
        borderRadius: sizes.r,
        border: 'none',
        borderBottom: `${sizes.bb}px solid ${dk}`,
        fontFamily: 'inherit',
        fontWeight: 800,
        fontSize: sizes.f,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? .5 : 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: full ? '100%' : undefined,
        transition: 'transform .08s ease, border-bottom-width .08s ease, filter .15s',
        ...style,
      }}
    >
      {icon}
      <span>{children}</span>
      {iconRight}
    </button>
  );
};

// CSS for press effect
const tweakCss = `
.cbtn { will-change: transform; }
.cbtn:not(:disabled):active { transform: translateY(3px); border-bottom-width: 1px !important; }
.cbtn:not(:disabled):hover { filter: brightness(1.05); }
`;

const shade = (hex, p) => {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map(c => c+c).join('') : h, 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  if (p < 0) { r = Math.max(0, r * (1 + p)); g = Math.max(0, g * (1 + p)); b = Math.max(0, b * (1 + p)); }
  else { r = Math.min(255, r + (255 - r) * p); g = Math.min(255, g + (255 - g) * p); b = Math.min(255, b + (255 - b) * p); }
  return '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
};

// ─── Progress bar ───
const ProgressBar = ({ value, max = 100, color = '#FF8A3D', height = 12, bg, animated = true }) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div style={{
      background: bg || 'var(--track)',
      borderRadius: 999,
      height,
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{
        width: `${pct}%`,
        height: '100%',
        background: color,
        borderRadius: 999,
        transition: animated ? 'width .7s cubic-bezier(.5,1.4,.5,1)' : 'none',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 2, left: 4, right: 4, height: 3,
          background: 'rgba(255,255,255,.45)', borderRadius: 99,
        }}/>
      </div>
    </div>
  );
};

// ─── XP badge in top bar ───
const XPBadge = ({ value, dark }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: dark ? 'rgba(255,255,255,.08)' : '#fff',
    border: `1.5px solid ${dark ? 'rgba(255,255,255,.12)' : 'var(--cream-dk)'}`,
    padding: '8px 16px', borderRadius: 99, fontWeight: 800, fontSize: 14,
    color: dark ? '#FFD9A0' : '#C77B3A',
  }}>
    <Icon name="star" size={16} color="#FFC93C"/>
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>{value.toLocaleString('ar-EG')}</span>
  </div>
);

// ─── Streak flame ───
const StreakBadge = ({ days, dark }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    background: dark ? 'rgba(232,106,142,.18)' : '#FFE3E0',
    padding: '6px 12px', borderRadius: 99, fontWeight: 800, fontSize: 13,
    color: dark ? '#FFB0BD' : '#C0392B',
  }}>
    <span style={{ fontSize: 14 }}>🔥</span>
    <span>{days.toLocaleString('ar-EG')} يوم</span>
  </div>
);

// ─── Heart life ───
const Hearts = ({ count, max = 5, dark }) => (
  <div style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
    {Array.from({ length: max }).map((_, i) => (
      <Icon key={i} name={i < count ? 'heart' : 'heart-o'} size={20} color={i < count ? '#E86A8E' : (dark ? '#3A2A4D' : '#E0C8D0')}/>
    ))}
  </div>
);

// ─── Confetti burst (canvas-free, lightweight DOM) ───
const Confetti = ({ active, originX = '50%', originY = '50%' }) => {
  if (!active) return null;
  const colors = ['#FF8A3D', '#FFC93C', '#4FB286', '#5BA3D9', '#E86A8E', '#9B7EDE'];
  const pieces = Array.from({ length: 36 }).map((_, i) => {
    const ang = (i / 36) * 2 * Math.PI + Math.random();
    const dist = 180 + Math.random() * 220;
    const dx = Math.cos(ang) * dist;
    const dy = Math.sin(ang) * dist - 80;
    const rot = (Math.random() - .5) * 720;
    const shape = i % 3;
    const sz = 8 + Math.random() * 8;
    return (
      <span
        key={i}
        style={{
          position: 'absolute',
          left: originX, top: originY,
          width: sz, height: sz * (shape === 0 ? 1 : .5),
          background: colors[i % colors.length],
          borderRadius: shape === 0 ? '50%' : 2,
          animation: 'confettiFly 1.2s cubic-bezier(.2,.6,.4,1) forwards',
          '--dx': `${dx}px`,
          '--dy': `${dy}px`,
          '--rot': `${rot}deg`,
          animationDelay: `${Math.random() * .15}s`,
          pointerEvents: 'none',
        }}
      />
    );
  });
  return <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 999 }}>{pieces}</div>;
};

// ─── Toast (auto-dismiss) ───
const Toast = ({ show, children, color = '#4FB286' }) => (
  <div style={{
    position: 'absolute', top: 24, left: '50%',
    transform: `translateX(-50%) translateY(${show ? 0 : -20}px)`,
    opacity: show ? 1 : 0,
    background: color, color: '#fff',
    padding: '12px 22px', borderRadius: 99,
    fontWeight: 800, fontSize: 14,
    boxShadow: '0 8px 30px rgba(0,0,0,.18)',
    transition: 'all .35s cubic-bezier(.5,1.4,.5,1)',
    pointerEvents: 'none', zIndex: 1000,
  }}>{children}</div>
);

// ─── Animated number ───
const AnimatedNumber = ({ value, format = (v) => v.toLocaleString('ar-EG') }) => {
  const [v, setV] = useState(value);
  const ref = useRef(value);
  useEffect(() => {
    const start = ref.current;
    const delta = value - start;
    if (delta === 0) return;
    const dur = 700;
    const t0 = performance.now();
    let raf;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = Math.round(start + delta * eased);
      setV(cur);
      ref.current = cur;
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{format(v)}</span>;
};

// ─── Decorative floating blobs ───
const Blobs = ({ colors = ['#FFE8A3', '#D6EAF8', '#DFF3E9', '#FCE3EA'], opacity = .5 }) => (
  <>
    <div className="blob" style={{ width: 220, height: 220, background: colors[0], opacity, top: -80, left: -80 }}/>
    <div className="blob" style={{ width: 150, height: 150, background: colors[1], opacity, top: 40, right: 60 }}/>
    <div className="blob" style={{ width: 180, height: 180, background: colors[2], opacity, bottom: 50, left: -50 }}/>
    <div className="blob" style={{ width: 120, height: 120, background: colors[3], opacity: opacity * .8, bottom: 100, right: -30 }}/>
  </>
);

Object.assign(window, {
  Tappable, CButton, ProgressBar, XPBadge, StreakBadge, Hearts,
  Confetti, Toast, AnimatedNumber, Blobs, shade, tweakCss,
});
