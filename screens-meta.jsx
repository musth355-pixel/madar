// screens-meta.jsx — Achievements gallery + Profile screen

const { useState: useStM } = React;

// ═══════════════════════════════════════════════════════════════════
//  ACHIEVEMENTS
// ═══════════════════════════════════════════════════════════════════
const AchievementsScreen = ({ achievements, dark }) => {
  const unlocked = achievements.filter(a => a.unlocked).length;
  const total = achievements.length;
  const pct = Math.round((unlocked / total) * 100);

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: '24px 36px 36px', position: 'relative' }}>
      <Blobs colors={dark ? ['#3a2d1f', '#1f2d3a', '#1f3a2d', '#3a1f2d'] : undefined} opacity={dark ? .25 : .35}/>

      {/* Hero summary */}
      <div style={{
        background: 'linear-gradient(135deg, #9B7EDE 0%, #7A5AE0 100%)',
        borderRadius: 30, padding: '24px 28px',
        color: '#fff',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 8px 0 #6A4F9E',
      }}>
        <div style={{ position: 'absolute', insetInlineEnd: -10, top: -30, opacity: .15, fontSize: 200 }}>🏆</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, opacity: .85, letterSpacing: '.06em' }}>إنجازاتك</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, marginTop: 6 }}>
              {unlocked.toLocaleString('ar-EG')} من {total.toLocaleString('ar-EG')} ميدالية
            </h2>
            <div style={{ marginTop: 16, maxWidth: 360 }}>
              <div style={{ background: 'rgba(255,255,255,.25)', borderRadius: 99, height: 10, overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: '#FFC93C', borderRadius: 99 }}/>
              </div>
              <div style={{ marginTop: 8, fontSize: 13, opacity: .85 }}>
                {pct.toLocaleString('ar-EG')}٪ مكتمل · المرتبة <strong>المستكشف</strong>
              </div>
            </div>
          </div>
          <div style={{
            width: 140, height: 140, borderRadius: '50%',
            background: 'rgba(255,255,255,.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <svg width="140" height="140" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
              <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="10"/>
              <circle cx="70" cy="70" r="60" fill="none" stroke="#FFC93C" strokeWidth="10"
                      strokeDasharray={2 * Math.PI * 60}
                      strokeDashoffset={2 * Math.PI * 60 * (1 - pct / 100)}
                      strokeLinecap="round"/>
            </svg>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800 }}>{pct.toLocaleString('ar-EG')}٪</div>
          </div>
        </div>
      </div>

      {/* Section: recent unlocks */}
      <h3 style={{
        fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800,
        color: dark ? '#FFE3D6' : 'var(--text-main)', margin: '28px 0 14px',
      }}>الميداليات</h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {achievements.map((a, i) => (
          <AchievementCard key={a.id} a={a} dark={dark} delay={i * 50}/>
        ))}
      </div>
    </div>
  );
};

const rarityColors = {
  common:    { bg: '#FFF6E9', dot: '#A8895F', label: 'عادية',     border: '#FFD89E' },
  uncommon:  { bg: '#DFF3E9', dot: '#4FB286', label: 'غير عادية', border: '#4FB286' },
  rare:      { bg: '#D6EAF8', dot: '#5BA3D9', label: 'نادرة',      border: '#5BA3D9' },
  epic:      { bg: '#F3E8FB', dot: '#9B7EDE', label: 'ملحمية',     border: '#9B7EDE' },
  legendary: { bg: '#FFE8C0', dot: '#FF8A3D', label: 'أسطورية',    border: '#FF8A3D' },
};

const AchievementCard = ({ a, dark, delay = 0 }) => {
  const r = rarityColors[a.rare] || rarityColors.common;
  const locked = !a.unlocked;
  return (
    <div style={{
      background: locked ? (dark ? 'rgba(255,255,255,.03)' : '#FFF6E9aa') : (dark ? 'rgba(255,255,255,.05)' : '#fff'),
      border: `2px solid ${locked ? (dark ? 'rgba(255,255,255,.06)' : 'var(--cream-dk)') : r.border}`,
      borderRadius: 22, padding: '18px 18px',
      boxShadow: locked ? 'none' : (dark ? 'none' : `0 5px 0 ${r.border}66`),
      display: 'flex', gap: 14, alignItems: 'center',
      position: 'relative', overflow: 'hidden',
      opacity: locked ? .65 : 1,
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: 18,
        background: locked ? (dark ? 'rgba(255,255,255,.04)' : '#FFF0D4') : r.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 36, flexShrink: 0, position: 'relative',
        filter: locked ? 'grayscale(.9)' : 'none',
      }}>
        {a.icon}
        {locked && (
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 18,
            background: 'rgba(0,0,0,.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="lock" size={24} color="#fff" stroke={2.4}/>
          </div>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800,
          color: dark ? '#FFE3D6' : 'var(--text-main)',
        }}>{a.title}</div>
        <div style={{ fontSize: 12, color: '#A8895F', marginTop: 2 }}>{a.sub}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
          <span style={{
            fontSize: 10, fontWeight: 800, color: r.dot,
            background: `${r.dot}22`,
            padding: '2px 8px', borderRadius: 99,
            display: 'inline-flex', alignItems: 'center', gap: 4,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: r.dot }}/>
            {r.label}
          </span>
          {a.date && <span style={{ fontSize: 10, color: '#A8895F' }}>{a.date}</span>}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
//  PROFILE
// ═══════════════════════════════════════════════════════════════════
const ProfileScreen = ({ user, dark, onLogout }) => {
  const xpPct = Math.round((user.xp / user.nextXp) * 100);
  return (
    <div style={{ height: '100%', overflow: 'auto', padding: '24px 36px 40px', position: 'relative' }}>
      <Blobs colors={dark ? ['#3a2d1f', '#1f2d3a', '#1f3a2d', '#3a1f2d'] : undefined} opacity={dark ? .25 : .35}/>

      {/* Hero card */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dk) 100%)',
        borderRadius: 30, padding: '26px 30px',
        color: '#fff', position: 'relative', overflow: 'hidden',
        boxShadow: '0 8px 0 var(--primary-dk)',
        display: 'flex', alignItems: 'center', gap: 22,
      }}>
        <div style={{ position: 'absolute', insetInlineEnd: -50, bottom: -40, opacity: .15 }}>
          <Icon name="orbit" size={280} color="#fff"/>
        </div>
        <div style={{
          width: 110, height: 110, borderRadius: 30,
          background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '5px solid rgba(255,255,255,.5)',
          flexShrink: 0,
        }}>
          <FoxAvatar size={88}/>
        </div>
        <div style={{ flex: 1, position: 'relative' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800 }}>{user.fullname}</h2>
          <div style={{ fontSize: 14, opacity: .85, marginTop: 4 }}>{user.grade} · {user.school}</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
            <span style={{
              background: 'rgba(255,255,255,.18)', padding: '6px 14px', borderRadius: 99,
              fontSize: 13, fontWeight: 800,
            }}>المستوى {user.level.toLocaleString('ar-EG')}</span>
            <span style={{
              background: 'rgba(255,255,255,.18)', padding: '6px 14px', borderRadius: 99,
              fontSize: 13, fontWeight: 800,
            }}>🔥 شعلة {user.streak.toLocaleString('ar-EG')} يوم</span>
            <span style={{
              background: 'rgba(255,255,255,.18)', padding: '6px 14px', borderRadius: 99,
              fontSize: 13, fontWeight: 800,
            }}>⭐ {user.xp.toLocaleString('ar-EG')} نقطة</span>
          </div>
        </div>
        <Tappable onTap={() => {}} style={{
          width: 44, height: 44, borderRadius: 14,
          background: 'rgba(255,255,255,.18)', border: 'none',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="gear" size={22} stroke={2}/>
        </Tappable>
      </div>

      {/* Two-col grid: level progress + week */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 18, marginTop: 22 }}>
        {/* Level progress */}
        <div style={{
          background: dark ? 'rgba(255,255,255,.05)' : '#fff',
          border: `2px solid ${dark ? 'rgba(255,255,255,.06)' : 'var(--cream-dk)'}`,
          borderRadius: 24, padding: '20px 22px',
          boxShadow: dark ? 'none' : '0 5px 0 var(--cream-dk)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: dark ? '#FFE3D6' : 'var(--text-main)' }}>
              تقدم المستوى
            </h3>
            <span style={{ fontSize: 12, color: '#A8895F', fontWeight: 700 }}>{user.xp.toLocaleString('ar-EG')} / {user.nextXp.toLocaleString('ar-EG')} XP</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 18 }}>
            <LevelBadge level={user.level}/>
            <div style={{ flex: 1 }}>
              <ProgressBar value={xpPct} color="#9B7EDE" height={14}/>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: '#A8895F', fontWeight: 700 }}>
                <span>المستوى {user.level.toLocaleString('ar-EG')}</span>
                <span>{(user.nextXp - user.xp).toLocaleString('ar-EG')} XP للمستوى التالي</span>
                <span>المستوى {(user.level + 1).toLocaleString('ar-EG')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Week */}
        <div style={{
          background: dark ? 'rgba(255,255,255,.05)' : '#fff',
          border: `2px solid ${dark ? 'rgba(255,255,255,.06)' : 'var(--cream-dk)'}`,
          borderRadius: 24, padding: '20px 22px',
          boxShadow: dark ? 'none' : '0 5px 0 var(--cream-dk)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: dark ? '#FFE3D6' : 'var(--text-main)' }}>
              هذا الأسبوع
            </h3>
            <span style={{ fontSize: 12, color: '#A8895F', fontWeight: 700 }}>{user.weekDone.toLocaleString('ar-EG')}/{user.weekGoal.toLocaleString('ar-EG')} أيام</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18, gap: 6 }}>
            {['السبت','الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة'].map((d, i) => {
              const done = user.weekDays[i];
              const today = i === 3;
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 }}>
                  <div style={{ fontSize: 10, color: '#A8895F', fontWeight: 700 }}>{d.slice(0, 3)}</div>
                  <div style={{
                    width: 38, height: 50, borderRadius: 12,
                    background: done ? '#FF8A3D' : (dark ? 'rgba(255,255,255,.04)' : '#FFF0D4'),
                    border: today && !done ? `2.5px dashed #FF8A3D` : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: done ? '#fff' : '#A8895F', fontWeight: 800, fontSize: 13,
                    position: 'relative',
                  }}>
                    {done ? <Icon name="flame" size={20} color="#fff" stroke={2.6}/> : (today ? <Icon name="play" size={14} color="#FF8A3D"/> : '')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Subject mastery */}
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: dark ? '#FFE3D6' : 'var(--text-main)', margin: '24px 0 12px' }}>
        تقدمك في المواد
      </h3>
      <div style={{
        background: dark ? 'rgba(255,255,255,.05)' : '#fff',
        border: `2px solid ${dark ? 'rgba(255,255,255,.06)' : 'var(--cream-dk)'}`,
        borderRadius: 24, padding: '20px 24px',
        boxShadow: dark ? 'none' : '0 5px 0 var(--cream-dk)',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 28px',
      }}>
        {SUBJECTS.map(s => {
          const pct = Math.round((s.done / s.lessons) * 100);
          return (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: s.tint, color: s.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon name={s.icon} size={22} color={s.color}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 800, color: dark ? '#FFE3D6' : 'var(--text-main)' }}>{s.ar}</span>
                  <span style={{ fontSize: 11, color: '#A8895F', fontWeight: 700 }}>{pct.toLocaleString('ar-EG')}٪</span>
                </div>
                <ProgressBar value={pct} color={s.color} height={6}/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const LevelBadge = ({ level }) => (
  <div style={{ position: 'relative', flexShrink: 0 }}>
    <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
      <path d="M35 4 60 18v34L35 66 10 52V18Z"
            fill="#9B7EDE" stroke="#6A4F9E" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M35 4 60 18v34L35 66 10 52V18Z"
            fill="url(#lvg)" opacity=".4"/>
      <defs>
        <radialGradient id="lvg" cx=".3" cy=".3" r=".8">
          <stop offset="0" stopColor="#fff" stopOpacity=".7"/>
          <stop offset="1" stopColor="#fff" stopOpacity="0"/>
        </radialGradient>
      </defs>
    </svg>
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-display)',
    }}>
      <div style={{ fontSize: 9, fontWeight: 800, color: '#fff', opacity: .8, letterSpacing: '.1em' }}>LVL</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', lineHeight: 1, marginTop: -2 }}>{level.toLocaleString('ar-EG')}</div>
    </div>
  </div>
);

Object.assign(window, { AchievementsScreen, ProfileScreen });
