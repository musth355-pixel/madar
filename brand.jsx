// brand.jsx — Logo (redesigned) + Mascot illustrations

// ╔══════════════════════════════════════════════════════════════╗
// ║  LOGO — "Madaar" means "orbit". Mark is an orbit ring with    ║
// ║  a star traveling on it + a stylized "م" planet at center.    ║
// ╚══════════════════════════════════════════════════════════════╝
const Logo = ({ size = 56, variant = 'mark', color }) => {
  const c = color || '#FF8A3D';
  const dark = '#C04010';
  const accent = '#FFC93C';
  // Mark = just the circular icon
  const mark = (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* outer tilted orbit ring */}
      <ellipse cx="32" cy="32" rx="28" ry="11"
               transform="rotate(-28 32 32)"
               stroke={c} strokeWidth="3.5" fill="none" opacity=".85"/>
      {/* planet body */}
      <circle cx="32" cy="32" r="16" fill={c}/>
      <circle cx="32" cy="32" r="16" fill="url(#planetGlossM)" opacity=".4"/>
      {/* planet shadow on bottom */}
      <path d="M19 35a13 13 0 0 0 26 0" fill={dark} opacity=".25"/>
      {/* sparkle eyes */}
      <circle cx="27" cy="29" r="2" fill="#fff"/>
      <circle cx="37" cy="29" r="2" fill="#fff"/>
      {/* smile that hints at م curve */}
      <path d="M26 35c1.5 3 4 4 6 4s4.5-1 6-4"
            stroke="#fff" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      {/* traveling star on orbit (top) */}
      <g transform="translate(53 16)">
        <path d="m0-5 1.4 3 3 .4-2.2 2 .6 3-2.8-1.4L-2.7 3.4l.6-3-2.2-2 3-.4Z"
              fill={accent} stroke={dark} strokeWidth="1" strokeLinejoin="round"/>
      </g>
      {/* second small star on orbit (bottom-left) */}
      <circle cx="10" cy="46" r="2.5" fill={accent} stroke={dark} strokeWidth="1"/>
      <defs>
        <radialGradient id="planetGlossM" cx=".3" cy=".25" r=".7">
          <stop offset="0" stopColor="#fff" stopOpacity=".75"/>
          <stop offset="1" stopColor="#fff" stopOpacity="0"/>
        </radialGradient>
      </defs>
    </svg>
  );
  if (variant === 'mark') return mark;
  // wordmark = mark + Arabic + English
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
      {mark}
      <div style={{ lineHeight: 1 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: size * 0.7, fontWeight: 800, color: c }}>مدار</div>
        <div style={{ fontSize: size * 0.21, fontWeight: 800, letterSpacing: '.22em', color: '#C77B3A', marginTop: 4 }}>MADAAR</div>
      </div>
    </div>
  );
};

// ╔══════════════════════════════════════════════════════════════╗
// ║  MASCOT — "روبو" — a friendly robot companion                  ║
// ╚══════════════════════════════════════════════════════════════╝
const Mascot = ({ size = 80, mood = 'happy', color = '#FF8A3D', wave = false }) => {
  const accent = '#FFC93C';
  const eye = mood === 'sleep' ? 'closed' : mood === 'wow' ? 'wide' : mood === 'sad' ? 'sad' : 'open';
  const mouth = mood === 'wow' ? 'O' : mood === 'sad' ? 'frown' : 'smile';
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <radialGradient id="bodyG" cx=".4" cy=".3" r=".8">
          <stop offset="0" stopColor="#fff" stopOpacity=".55"/>
          <stop offset="1" stopColor="#fff" stopOpacity="0"/>
        </radialGradient>
      </defs>
      {/* antenna */}
      <line x1="50" y1="14" x2="50" y2="22" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <circle cx="50" cy="11" r="4" fill={accent} stroke={color} strokeWidth="2.5"/>
      {/* head */}
      <rect x="22" y="22" width="56" height="48" rx="18" fill={color}/>
      <rect x="22" y="22" width="56" height="48" rx="18" fill="url(#bodyG)"/>
      {/* screen face */}
      <rect x="30" y="32" width="40" height="28" rx="10" fill="#3A2210"/>
      {/* eyes */}
      {eye === 'open' && <>
        <circle cx="42" cy="46" r="3.5" fill={accent}/>
        <circle cx="58" cy="46" r="3.5" fill={accent}/>
        <circle cx="43" cy="45" r="1.2" fill="#fff"/>
        <circle cx="59" cy="45" r="1.2" fill="#fff"/>
      </>}
      {eye === 'wide' && <>
        <circle cx="42" cy="46" r="4.5" fill={accent}/>
        <circle cx="58" cy="46" r="4.5" fill={accent}/>
      </>}
      {eye === 'closed' && <>
        <path d="M38 46q4 -3 8 0M54 46q4 -3 8 0" stroke={accent} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      </>}
      {eye === 'sad' && <>
        <path d="M38 48q4 -4 8 0M54 48q4 -4 8 0" stroke={accent} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      </>}
      {/* mouth */}
      {mouth === 'smile' && <path d="M44 53q6 4 12 0" stroke={accent} strokeWidth="2.5" strokeLinecap="round" fill="none"/>}
      {mouth === 'O' && <circle cx="50" cy="54" r="2.5" fill={accent}/>}
      {mouth === 'frown' && <path d="M44 56q6 -4 12 0" stroke={accent} strokeWidth="2.5" strokeLinecap="round" fill="none"/>}

      {/* ear knobs */}
      <circle cx="22" cy="46" r="4" fill={color}/>
      <circle cx="78" cy="46" r="4" fill={color}/>

      {/* body */}
      <rect x="32" y="68" width="36" height="22" rx="8" fill={color}/>
      <rect x="32" y="68" width="36" height="22" rx="8" fill="url(#bodyG)"/>
      <circle cx="42" cy="79" r="2.2" fill={accent}/>
      <circle cx="50" cy="79" r="2.2" fill="#fff" opacity=".7"/>
      <circle cx="58" cy="79" r="2.2" fill={accent}/>

      {/* arms */}
      {wave ? (
        <g>
          <path d="M30 70c-6 -2 -10 -10 -8 -16" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none"/>
          <circle cx="21" cy="52" r="5" fill={color}/>
        </g>
      ) : (
        <>
          <path d="M30 72c-4 2 -7 5 -6 10" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none"/>
          <circle cx="23" cy="82" r="5" fill={color}/>
        </>
      )}
      <path d="M70 72c4 2 7 5 6 10" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none"/>
      <circle cx="77" cy="82" r="5" fill={color}/>
    </svg>
  );
};

// Avatar — cute fox character (for user)
const FoxAvatar = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <circle cx="30" cy="30" r="28" fill="#FFE3D6"/>
    {/* ears */}
    <path d="M12 18 18 8l6 8z" fill="#FF8A3D"/>
    <path d="M48 18 42 8l-6 8z" fill="#FF8A3D"/>
    <path d="M14 16 18 11l4 5z" fill="#FFC93C"/>
    <path d="M46 16 42 11l-4 5z" fill="#FFC93C"/>
    {/* face */}
    <path d="M14 26c0 11 7 20 16 20s16-9 16-20-7-14-16-14-16 3-16 14Z" fill="#FF8A3D"/>
    {/* cheeks/snout */}
    <path d="M22 34c0 7 4 11 8 11s8-4 8-11Z" fill="#FFF6E9"/>
    {/* eyes */}
    <circle cx="23" cy="28" r="2.5" fill="#3A2210"/>
    <circle cx="37" cy="28" r="2.5" fill="#3A2210"/>
    <circle cx="23.7" cy="27.3" r="1" fill="#fff"/>
    <circle cx="37.7" cy="27.3" r="1" fill="#fff"/>
    {/* nose */}
    <ellipse cx="30" cy="35" rx="2" ry="1.6" fill="#3A2210"/>
    {/* smile */}
    <path d="M27 38c1 1.5 2 2 3 2s2-.5 3-2" stroke="#3A2210" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

Object.assign(window, { Logo, Mascot, FoxAvatar });
