// icons.jsx — clean SVG icon system for مدار
// All icons are 24x24 viewBox, use currentColor stroke, friendly rounded style.

const Icon = ({ name, size = 24, color = 'currentColor', stroke = 2, fill = 'none', style }) => {
  const props = {
    width: size, height: size, viewBox: '0 0 24 24', fill,
    stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round',
    style,
  };
  switch (name) {
    case 'home':
      return <svg {...props}><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10.5V19a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1v-8.5"/></svg>;
    case 'map':
      return <svg {...props}><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z"/><path d="M9 4v14M15 6v14"/></svg>;
    case 'trophy':
      return <svg {...props}><path d="M7 4h10v4a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4a3 3 0 0 0 3 3M17 6h3a3 3 0 0 1-3 3"/><path d="M9 14h6v3l1 4H8l1-4v-3Z"/></svg>;
    case 'user':
      return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>;
    case 'star':
      return <svg {...props} fill={color}><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z"/></svg>;
    case 'star-o':
      return <svg {...props}><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z"/></svg>;
    case 'flame':
      return <svg {...props}><path d="M12 3c.5 4-3 5-3 9a3 3 0 0 0 6 0c0-1.5-1-2-1-3.5 0 0 3 1 3 5a5 5 0 0 1-10 0c0-4 3-5 5-10.5Z"/></svg>;
    case 'play':
      return <svg {...props} fill={color} stroke="none"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l13-7.5a1 1 0 0 0 0-1.72l-13-7.5A1 1 0 0 0 7 4.5Z"/></svg>;
    case 'play-o':
      return <svg {...props}><path d="M7 4.5v15a1 1 0 0 0 1.5.86l13-7.5a1 1 0 0 0 0-1.72l-13-7.5A1 1 0 0 0 7 4.5Z"/></svg>;
    case 'check':
      return <svg {...props}><path d="m4 13 5 5L20 6"/></svg>;
    case 'x':
      return <svg {...props}><path d="M6 6 18 18M18 6 6 18"/></svg>;
    case 'arrow':
      return <svg {...props}><path d="M14 5 21 12l-7 7M21 12H3"/></svg>;
    case 'back':
      return <svg {...props}><path d="m10 5-7 7 7 7M3 12h18"/></svg>;
    case 'lock':
      return <svg {...props}><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>;
    case 'bell':
      return <svg {...props}><path d="M6 9a6 6 0 1 1 12 0c0 5 2 7 2 7H4s2-2 2-7Z"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>;
    case 'heart':
      return <svg {...props} fill={color} stroke="none"><path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6C19 16.5 12 21 12 21Z"/></svg>;
    case 'heart-o':
      return <svg {...props}><path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6C19 16.5 12 21 12 21Z"/></svg>;
    case 'sparkle':
      return <svg {...props}><path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"/></svg>;
    case 'gear':
      return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></svg>;
    case 'plus':
      return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case 'minus':
      return <svg {...props}><path d="M5 12h14"/></svg>;
    case 'pause':
      return <svg {...props} fill={color} stroke="none"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>;
    case 'sound':
      return <svg {...props}><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M16 8a5 5 0 0 1 0 8M19 5a9 9 0 0 1 0 14"/></svg>;
    case 'globe':
      return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    case 'search':
      return <svg {...props}><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>;
    case 'orbit':
      return <svg {...props}><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-25 12 12)"/><circle cx="12" cy="12" r="3" fill={color}/></svg>;

    // SUBJECT ICONS (custom — not emoji)
    case 'math':
      return <svg {...props}>
        <rect x="3" y="3" width="8" height="8" rx="1.5"/>
        <path d="M5.5 7h3M7 5.5v3"/>
        <rect x="13" y="3" width="8" height="8" rx="1.5"/>
        <path d="M15.5 7h3"/>
        <rect x="3" y="13" width="8" height="8" rx="1.5"/>
        <path d="m5.5 15.5 3 3M8.5 15.5l-3 3"/>
        <rect x="13" y="13" width="8" height="8" rx="1.5"/>
        <path d="M17 14.5v1.5M17 18v1.5M15.5 17h3"/>
      </svg>;
    case 'science':
      return <svg {...props}>
        <path d="M9 3v6L4.5 19a2 2 0 0 0 1.8 2.8h11.4A2 2 0 0 0 19.5 19L15 9V3"/>
        <path d="M8 3h8"/>
        <path d="M7.5 14h9"/>
        <circle cx="10" cy="17" r="1" fill={color} stroke="none"/>
        <circle cx="14" cy="18" r=".8" fill={color} stroke="none"/>
      </svg>;
    case 'arabic':
      return <svg {...props}>
        <path d="M4 5h16"/>
        <path d="M7 5v10c0 2 1.5 3 3 3M7 10c0 1.5 1 2.5 2.5 2.5"/>
        <path d="M14 10v5c0 1.5 1.5 3 4 3"/>
        <circle cx="14.5" cy="7" r=".8" fill={color}/>
      </svg>;
    case 'english':
      return <svg {...props}>
        <circle cx="12" cy="12" r="9"/>
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" opacity=".7"/>
        <path d="M9 8h6" strokeWidth="2.2"/>
      </svg>;
    case 'quran':
      return <svg {...props}>
        <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Z"/>
        <path d="M5 17a3 3 0 0 1 3-3h11"/>
        <path d="M9 8h6M9 11h4"/>
      </svg>;
    case 'arts':
      return <svg {...props}>
        <path d="M12 3a9 9 0 0 0 0 18c1.5 0 2-1 2-2 0-2 2-2 2-4 0-3-3-3-4-3"/>
        <circle cx="7.5" cy="10" r="1.2" fill={color} stroke="none"/>
        <circle cx="9" cy="6" r="1.2" fill={color} stroke="none"/>
        <circle cx="14" cy="5.5" r="1.2" fill={color} stroke="none"/>
        <circle cx="17" cy="9" r="1.2" fill={color} stroke="none"/>
      </svg>;
    case 'social':
      return <svg {...props}>
        <circle cx="12" cy="12" r="9"/>
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>
      </svg>;
    case 'tech':
      return <svg {...props}>
        <rect x="3" y="5" width="18" height="12" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <path d="m8 9 2 2-2 2M12 13h4"/>
      </svg>;

    default:
      return <svg {...props}><circle cx="12" cy="12" r="9"/></svg>;
  }
};

// Subject illustration — bigger, more decorative version for tiles
const SubjectIllustration = ({ id, color, tint, size = 96 }) => {
  const common = { width: size, height: size, viewBox: '0 0 100 100', fill: 'none' };
  const stroke = { stroke: color, strokeWidth: 3.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (id) {
    case 'math':
      return <svg {...common}>
        <rect x="14" y="14" width="32" height="32" rx="6" fill="#fff" {...stroke}/>
        <path d="M22 30h16M30 22v16" {...stroke}/>
        <rect x="54" y="14" width="32" height="32" rx="6" fill={color} stroke={color} strokeWidth="3.5"/>
        <path d="M62 30h16" stroke="#fff" strokeWidth="3.5" strokeLinecap="round"/>
        <rect x="14" y="54" width="32" height="32" rx="6" fill={color} stroke={color} strokeWidth="3.5"/>
        <path d="m22 62 16 16M38 62 22 78" stroke="#fff" strokeWidth="3.5" strokeLinecap="round"/>
        <rect x="54" y="54" width="32" height="32" rx="6" fill="#fff" {...stroke}/>
        <path d="M70 60v8M70 72v8M62 70h16" {...stroke}/>
      </svg>;
    case 'science':
      return <svg {...common}>
        <path d="M38 12v22L22 76a6 6 0 0 0 5.4 8.4h45.2A6 6 0 0 0 78 76L62 34V12" {...stroke} fill="#fff"/>
        <path d="M34 12h32" {...stroke}/>
        <path d="M30 55h40" {...stroke}/>
        <circle cx="40" cy="65" r="4" fill={color}/>
        <circle cx="58" cy="70" r="3" fill={color}/>
        <circle cx="48" cy="75" r="2.5" fill={color}/>
      </svg>;
    case 'arabic':
      return <svg {...common}>
        <rect x="10" y="14" width="80" height="72" rx="10" fill="#fff" stroke={color} strokeWidth="3.5"/>
        <path d="M22 32h56" stroke={color} strokeWidth="3.5" strokeLinecap="round" opacity=".25"/>
        <path d="M28 38c0 12 0 24 14 24M28 50c0 8 8 12 14 6" stroke={color} strokeWidth="5" strokeLinecap="round" fill="none"/>
        <path d="M54 38v16c0 8 8 14 18 14" stroke={color} strokeWidth="5" strokeLinecap="round" fill="none"/>
        <circle cx="54" cy="32" r="2.5" fill={color}/>
      </svg>;
    case 'english':
      return <svg {...common}>
        <rect x="10" y="14" width="80" height="72" rx="10" fill="#fff" stroke={color} strokeWidth="3.5"/>
        <circle cx="50" cy="50" r="22" fill="none" stroke={color} strokeWidth="3.5"/>
        <path d="M28 50h44M50 28c8 7 8 37 0 44M50 28c-8 7-8 37 0 44" stroke={color} strokeWidth="2.5" fill="none" opacity=".7"/>
        <text x="50" y="56" textAnchor="middle" fill={color} fontSize="14" fontWeight="800" fontFamily="ui-sans-serif">A</text>
      </svg>;
    case 'quran':
      return <svg {...common}>
        <path d="M18 14h44a14 14 0 0 1 14 14v58H32a14 14 0 0 1-14-14V14Z" fill="#fff" stroke={color} strokeWidth="3.5"/>
        <path d="M18 72a14 14 0 0 1 14-14h44" stroke={color} strokeWidth="3.5" fill="none"/>
        <path d="M30 30h28M30 42h22" stroke={color} strokeWidth="3" strokeLinecap="round" opacity=".5"/>
        <path d="M50 50a8 8 0 1 0 8 8 6 6 0 1 1-8-8Z" fill={color}/>
        <circle cx="62" cy="46" r="2" fill={color}/>
      </svg>;
    case 'arts':
      return <svg {...common}>
        <path d="M50 14a36 36 0 0 0 0 72c6 0 8-4 8-8 0-8 8-8 8-16 0-12-12-12-16-12" fill="#fff" stroke={color} strokeWidth="3.5"/>
        <circle cx="28" cy="42" r="5" fill="#FFC93C"/>
        <circle cx="32" cy="22" r="5" fill="#4FB286"/>
        <circle cx="56" cy="20" r="5" fill="#E86A8E"/>
        <circle cx="72" cy="32" r="5" fill="#5BA3D9"/>
        <circle cx="74" cy="55" r="4" fill="#9B7EDE"/>
      </svg>;
    case 'social':
      return <svg {...common}>
        <circle cx="50" cy="50" r="36" fill="#fff" stroke={color} strokeWidth="3.5"/>
        <path d="M14 50h72M50 14c14 8 14 64 0 72M50 14c-14 8-14 64 0 72" stroke={color} strokeWidth="3" fill="none" opacity=".7"/>
        <path d="M30 30q6 4 14 0t14 4t12-2" stroke={color} strokeWidth="2.5" fill="none" opacity=".4"/>
      </svg>;
    case 'tech':
      return <svg {...common}>
        <rect x="10" y="20" width="80" height="52" rx="6" fill="#fff" stroke={color} strokeWidth="3.5"/>
        <rect x="18" y="28" width="64" height="36" rx="2" fill={tint || color} opacity=".4"/>
        <path d="M30 86h40M50 72v14" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="m30 40 8 6-8 6M44 52h12" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none"/>
      </svg>;
    default:
      return null;
  }
};

Object.assign(window, { Icon, SubjectIllustration });
