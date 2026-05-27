// screens-shell.jsx — TopBar, SideRail, and frame components shared across screens

const { useState: useSt2, useEffect: useEf2 } = React;

// ─── Side rail nav (right side in RTL) ───
const SideRail = ({ active, onNav, dark }) => {
  const items = [
    { id: 'home',     label: 'الرئيسية',  icon: 'home' },
    { id: 'journey',  label: 'مغامراتي',  icon: 'map' },
    { id: 'awards',   label: 'إنجازاتي',  icon: 'trophy' },
    { id: 'profile',  label: 'ملفي',      icon: 'user' },
  ];
  return (
    <div style={{
      width: 92, height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', padding: '18px 0',
      gap: 6,
      background: dark ? 'rgba(255,255,255,.04)' : 'rgba(255,255,255,.6)',
      backdropFilter: 'blur(20px)',
      borderInlineEnd: `1px solid ${dark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.05)'}`,
      flexShrink: 0,
    }}>
      <div style={{ marginBottom: 12 }}>
        <Logo size={44} variant="mark" color="var(--primary)"/>
      </div>
      {items.map(it => {
        const isActive = active === it.id;
        return (
          <Tappable
            key={it.id}
            onTap={() => onNav(it.id)}
            style={{
              width: 72, padding: '12px 0', borderRadius: 18,
              background: isActive ? 'var(--primary)' : 'transparent',
              color: isActive ? '#fff' : (dark ? 'rgba(255,255,255,.55)' : '#A8895F'),
              border: 'none', display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 4,
              transition: 'background .2s, color .2s, transform .15s',
              borderBottom: isActive ? `4px solid var(--primary-dk)` : '4px solid transparent',
              transform: isActive ? 'translateY(-2px)' : 'none',
            }}
          >
            <Icon name={it.icon} size={26} color="currentColor" stroke={2.2}/>
            <span style={{ fontSize: 11, fontWeight: 800 }}>{it.label}</span>
          </Tappable>
        );
      })}
      <div style={{ flex: 1 }}/>
      <Tappable
        onTap={() => onNav('settings')}
        style={{
          width: 56, height: 56, borderRadius: 18,
          background: dark ? 'rgba(255,255,255,.06)' : '#fff',
          color: dark ? 'rgba(255,255,255,.55)' : '#A8895F',
          border: `1.5px solid ${dark ? 'rgba(255,255,255,.08)' : 'var(--cream-dk)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Icon name="gear" size={22} stroke={2}/>
      </Tappable>
    </div>
  );
};

// ─── Top bar ───
const TopBar = ({ user, dark, onAvatar, title, backButton, onBack, rightSlot }) => (
  <div style={{
    height: 72, padding: '0 28px',
    display: 'flex', alignItems: 'center', gap: 16,
    flexShrink: 0,
    background: dark ? 'rgba(255,255,255,.03)' : 'rgba(255,255,255,.55)',
    backdropFilter: 'blur(20px)',
    borderBottom: `1px solid ${dark ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.04)'}`,
    position: 'relative', zIndex: 5,
  }}>
    {backButton && (
      <Tappable onTap={onBack} style={{
        width: 44, height: 44, borderRadius: 14,
        background: dark ? 'rgba(255,255,255,.06)' : '#fff',
        border: `1.5px solid ${dark ? 'rgba(255,255,255,.08)' : 'var(--cream-dk)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--primary)',
      }}>
        <Icon name="back" size={20} stroke={2.4}/>
      </Tappable>
    )}
    {title ? (
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: dark ? '#FFE3D6' : 'var(--text-main)' }}>{title}</h1>
      </div>
    ) : (
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: dark ? '#C0A080' : '#A8895F' }}>{greeting()}،</span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--primary)' }}>{user.name}</span>
        <span style={{ fontSize: 22 }}>👋</span>
      </div>
    )}
    <div style={{ flex: 1 }}/>
    {rightSlot}
    <XPBadge value={user.xp} dark={dark}/>
    <StreakBadge days={user.streak} dark={dark}/>
    <Tappable
      onTap={onAvatar}
      style={{
        width: 48, height: 48, borderRadius: 16,
        background: '#FFE3D6', overflow: 'hidden',
        border: '3px solid #fff',
        boxShadow: '0 3px 0 var(--cream-dk)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 0,
      }}
    >
      <FoxAvatar size={42}/>
    </Tappable>
  </div>
);

function greeting() {
  const h = new Date().getHours();
  if (h < 11) return 'صباح الخير';
  if (h < 17) return 'أهلاً';
  return 'مساء الخير';
}

Object.assign(window, { SideRail, TopBar });
