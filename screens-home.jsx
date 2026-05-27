// screens-home.jsx — Home + Adventure Journey (subject path) screens

const { useState: useStHome, useEffect: useEffHome, useRef: useRefHome } = React;

// ═══════════════════════════════════════════════════════════════════
//  HOME — daily goal, continue learning, all subjects
// ═══════════════════════════════════════════════════════════════════
const HomeScreen = ({ user, onPick, onContinue, dark }) => {
  const continueSubj = SUBJECTS[0]; // math
  return (
    <div style={{ padding: '24px 36px 36px', overflow: 'auto', height: '100%', position: 'relative' }}>
      <Blobs colors={dark ? ['#3a2d1f', '#1f2d3a', '#1f3a2d', '#3a1f2d'] : undefined} opacity={dark ? .3 : .4}/>

      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1.5fr', gap: 24, position: 'relative' }}>

        {/* ── Continue card (BIG) ── */}
        <div style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dk) 100%)',
          borderRadius: 30,
          padding: '26px 28px',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 0 var(--primary-dk)',
          minHeight: 220,
        }}>
          <div style={{ position: 'absolute', right: -40, bottom: -30, opacity: .9 }}>
            <Mascot size={170} wave color="#fff"/>
          </div>
          <div style={{ position: 'absolute', top: 14, left: 18, opacity: .35 }}>
            <Icon name="sparkle" size={28} color="#FFC93C"/>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 13, fontWeight: 800, opacity: .8, letterSpacing: '.06em' }}>تابع المغامرة</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, marginTop: 6, lineHeight: 1.1, maxWidth: '70%' }}>
              {SAMPLE_LESSON.title}
            </h2>
            <div style={{ marginTop: 6, fontSize: 13, opacity: .8 }}>{continueSubj.ar} · الوحدة ٣</div>
            <div style={{ marginTop: 18, maxWidth: 280 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 800, opacity: .85, marginBottom: 6 }}>
                <span>التقدم</span>
                <span>٦٨٪</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,.25)', borderRadius: 99, height: 10, overflow: 'hidden' }}>
                <div style={{ width: '68%', height: '100%', background: '#FFC93C', borderRadius: 99 }}/>
              </div>
            </div>
            <div style={{ marginTop: 18 }}>
              <CButton color="#fff" textColor="var(--primary)" dark="#FFD8B8" size="md" onTap={onContinue}
                       icon={<Icon name="play" size={16} color="var(--primary)"/>}>
                هيا نكمل!
              </CButton>
            </div>
          </div>
        </div>

        {/* ── Daily goal + week strip ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <DailyGoal user={user} dark={dark}/>
          <QuickStats user={user} dark={dark}/>
        </div>
      </div>

      {/* ── Subjects grid ── */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 32, marginBottom: 14 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: dark ? '#FFE3D6' : 'var(--text-main)' }}>المواد</h3>
        <span style={{ fontSize: 13, color: dark ? '#C0A080' : '#A8895F' }}>اختر مادتك وانطلق 🚀</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
        {SUBJECTS.map((s, i) => (
          <SubjectTile key={s.id} s={s} onTap={() => onPick(s)} dark={dark} delay={i * 60}/>
        ))}
      </div>
    </div>
  );
};

const DailyGoal = ({ user, dark }) => (
  <div style={{
    background: dark ? 'rgba(255,255,255,.05)' : '#fff',
    border: `2px solid ${dark ? 'rgba(255,255,255,.06)' : 'var(--cream-dk)'}`,
    borderRadius: 26, padding: '20px 22px',
    boxShadow: dark ? 'none' : '0 5px 0 var(--cream-dk)',
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <div>
        <div style={{ fontSize: 13, color: dark ? '#C0A080' : '#A8895F', fontWeight: 700 }}>هدف اليوم</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: dark ? '#FFE3D6' : 'var(--text-main)' }}>
          أكمل ٣ دروس
        </div>
      </div>
      <div style={{
        background: '#FFC93C',
        color: '#7A5000',
        padding: '6px 12px', borderRadius: 99,
        fontSize: 12, fontWeight: 800,
      }}>+٥٠ XP</div>
    </div>
    <div style={{ display: 'flex', gap: 8, marginTop: 14, alignItems: 'center' }}>
      {[true, true, false].map((done, i) => (
        <div key={i} style={{
          flex: 1, height: 44, borderRadius: 14,
          background: done ? '#4FB286' : (dark ? 'rgba(255,255,255,.04)' : '#FFF6E9'),
          border: `2px solid ${done ? '#357A5B' : (dark ? 'rgba(255,255,255,.08)' : '#FFD89E')}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: done ? '#fff' : (dark ? '#7a6a55' : '#C77B3A'),
          fontWeight: 800, fontSize: 14,
          position: 'relative',
        }}>
          {done ? <Icon name="check" size={22} stroke={3} color="#fff"/> : `درس ${['الأول','الثاني','الثالث'][i]}`}
        </div>
      ))}
    </div>
    {/* week strip */}
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18, gap: 6 }}>
      {['س','أ','ث','ث','أ','خ','ج'].map((d, i) => {
        const done = user.weekDays[i];
        const today = i === 3;
        return (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 }}>
            <div style={{ fontSize: 11, color: dark ? '#A8895F' : '#A8895F', fontWeight: 700 }}>{d}</div>
            <div style={{
              width: 32, height: 32, borderRadius: 12,
              background: done ? '#FF8A3D' : (today ? 'transparent' : (dark ? 'rgba(255,255,255,.04)' : '#FFF0D4')),
              border: today ? `2.5px dashed ${dark ? '#FFD8B8' : '#FF8A3D'}` : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: done ? '#fff' : '#A8895F', fontWeight: 800, fontSize: 13,
            }}>
              {done ? <Icon name="check" size={16} stroke={3.5} color="#fff"/> : (today ? '•' : '')}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const QuickStats = ({ user, dark }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
    {[
      { label: 'المستوى', value: user.level, color: '#9B7EDE', tint: '#F3E8FB', icon: 'star', toneDark: '#6A4F9E' },
      { label: 'الشعلة', value: `${user.streak} يوم`, color: '#E5602A', tint: '#FFE3D6', icon: 'flame', toneDark: '#C0392B' },
      { label: 'النجوم', value: '٣٢', color: '#FFC93C', tint: '#FFF0D4', icon: 'star', toneDark: '#A87800' },
    ].map((s, i) => (
      <div key={i} style={{
        background: dark ? 'rgba(255,255,255,.05)' : '#fff',
        border: `2px solid ${dark ? 'rgba(255,255,255,.06)' : 'var(--cream-dk)'}`,
        borderRadius: 22, padding: '14px 12px',
        textAlign: 'center',
        boxShadow: dark ? 'none' : '0 4px 0 var(--cream-dk)',
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 14,
          background: dark ? 'rgba(255,255,255,.05)' : s.tint,
          margin: '0 auto 6px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={s.icon} size={22} color={s.color}/>
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: dark ? '#FFE3D6' : 'var(--text-main)' }}>{typeof s.value === 'number' ? s.value.toLocaleString('ar-EG') : s.value}</div>
        <div style={{ fontSize: 11, color: dark ? '#A8895F' : '#A8895F', fontWeight: 700, marginTop: 2 }}>{s.label}</div>
      </div>
    ))}
  </div>
);

const SubjectTile = ({ s, onTap, dark, delay = 0 }) => {
  const pct = Math.round((s.done / s.lessons) * 100);
  return (
    <Tappable onTap={onTap} style={{
      background: dark ? 'rgba(255,255,255,.05)' : '#fff',
      border: `2px solid ${dark ? 'rgba(255,255,255,.06)' : 'var(--cream-dk)'}`,
      borderRadius: 26, padding: '18px 18px 16px',
      textAlign: 'start',
      boxShadow: dark ? 'none' : `0 5px 0 ${s.color}40`,
      display: 'flex', flexDirection: 'column', gap: 10,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -10, insetInlineStart: -10,
        width: 90, height: 90, borderRadius: '50%',
        background: dark ? `${s.color}22` : s.tint,
      }}/>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end' }}>
        <SubjectIllustration id={s.id} color={s.color} tint={s.tint} size={68}/>
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 800, color: dark ? '#FFE3D6' : 'var(--text-main)' }}>{s.ar}</div>
        <div style={{ fontSize: 12, color: dark ? '#A8895F' : '#A8895F', fontWeight: 700, marginTop: 2 }}>{s.done.toLocaleString('ar-EG')}/{s.lessons.toLocaleString('ar-EG')} درس</div>
      </div>
      <div style={{ marginTop: 4 }}>
        <ProgressBar value={pct} color={s.color} height={8}/>
      </div>
    </Tappable>
  );
};

// ═══════════════════════════════════════════════════════════════════
//  ADVENTURE MAP — Duolingo-style winding path
// ═══════════════════════════════════════════════════════════════════
const JourneyScreen = ({ subject, path, onBack, onNode, dark }) => {
  const containerRef = useRefHome();
  const currentNodeRef = useRefHome();
  // scroll to current node on mount
  useEffHome(() => {
    const t = setTimeout(() => {
      if (currentNodeRef.current && containerRef.current) {
        const c = containerRef.current;
        const n = currentNodeRef.current;
        const cRect = c.getBoundingClientRect();
        const nRect = n.getBoundingClientRect();
        const targetTop = c.scrollTop + (nRect.top - cRect.top) - 240;
        c.scrollTop = Math.max(0, targetTop);
      }
    }, 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={containerRef} style={{
      height: '100%', overflow: 'auto', position: 'relative',
      background: dark ? 'transparent' : `linear-gradient(180deg, ${subject.tint} 0%, transparent 600px)`,
    }}>
      {/* Subject header banner */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 4,
        background: subject.color,
        padding: '20px 36px 22px',
        color: '#fff',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        boxShadow: `0 4px 0 ${shade(subject.color, -.2)}`,
        display: 'flex', alignItems: 'center', gap: 18,
      }}>
        <Tappable onTap={onBack} style={{
          width: 44, height: 44, borderRadius: 14,
          background: 'rgba(255,255,255,.18)',
          color: '#fff', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="back" size={22} stroke={2.6}/>
        </Tappable>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800, opacity: .85 }}>الوحدة الثالثة · الصف الثالث</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, marginTop: 4 }}>
            {subject.ar} — مغامرة الأعداد
          </h2>
        </div>
        <div style={{
          background: 'rgba(255,255,255,.18)', padding: '8px 16px',
          borderRadius: 99, fontWeight: 800, fontSize: 14,
          display: 'inline-flex', alignItems: 'center', gap: 8,
        }}>
          <Icon name="check" size={16} stroke={3} color="#fff"/>
          {subject.done.toLocaleString('ar-EG')}/{subject.lessons.toLocaleString('ar-EG')}
        </div>
      </div>

      {/* Path */}
      <div style={{ padding: '40px 0 80px', position: 'relative', minHeight: 800 }}>
        <PathBackground/>
        <div style={{ position: 'relative', maxWidth: 460, margin: '0 auto' }}>
          {path.map((node, i) => {
            // wobble pattern: -100, -50, 0, 50, 100, 50, 0, -50, repeat
            const offsets = [-80, -30, 30, 80, 30, -30, -80, -30, 30, 80, 30, -30, -80, -30, 30, 80, 30, -30];
            const x = offsets[i % offsets.length];
            const isCurrent = node.state === 'current';
            return (
              <div key={node.id}
                   ref={isCurrent ? currentNodeRef : null}
                   style={{
                     position: 'relative', display: 'flex', justifyContent: 'center',
                     marginBlock: 30, transform: `translateX(${x}px)`,
                   }}>
                <PathNode node={node} subject={subject} onTap={() => onNode(node)} dark={dark}/>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const PathBackground = () => (
  // Dotted background, fixed within the scrollable container
  <div style={{
    position: 'absolute', inset: 0,
    backgroundImage: 'radial-gradient(circle, rgba(168,137,95,.18) 1.5px, transparent 2px)',
    backgroundSize: '24px 24px',
    pointerEvents: 'none',
  }}/>
);

const PathNode = ({ node, subject, onTap, dark }) => {
  const locked = node.state === 'locked';
  const current = node.state === 'current';
  const done = node.state === 'done';
  const isBoss = node.type === 'boss';
  const isReward = node.type === 'reward';
  const isQuiz = node.type === 'quiz';
  const isGame = node.type === 'game';

  const sz = isBoss ? 110 : (isReward ? 86 : 84);
  const colors = current ? { bg: subject.color, dk: shade(subject.color, -.25) }
                : done    ? { bg: '#FFC93C', dk: '#D4A800' }
                : locked  ? { bg: '#E3D5C0', dk: '#C9B89C' }
                : { bg: subject.color, dk: shade(subject.color, -.25) };

  const icon = isBoss ? (node.badge || '👑')
              : isReward ? '🎁'
              : isQuiz ? '⚡'
              : isGame ? '🎮'
              : done ? <Icon name="check" size={36} stroke={4} color="#fff"/>
              : locked ? <Icon name="lock" size={32} stroke={2.5} color="#A8895F"/>
              : <Icon name="star" size={36} color="#fff"/>;

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      {/* current pulse ring */}
      {current && (
        <div style={{
          position: 'absolute', width: sz + 30, height: sz + 30,
          borderRadius: '50%', border: `3px solid ${subject.color}`,
          top: -15, left: '50%', transform: 'translateX(-50%)',
          animation: 'pulse 1.6s ease-out infinite',
          opacity: .5, pointerEvents: 'none',
        }}/>
      )}
      {/* speech bubble for current */}
      {current && (
        <div style={{
          position: 'absolute', top: -54, background: '#fff',
          padding: '6px 14px', borderRadius: 20,
          fontSize: 12, fontWeight: 800, color: subject.color,
          border: `2.5px solid ${subject.color}`,
          boxShadow: `0 3px 0 ${shade(subject.color, -.2)}`,
          whiteSpace: 'nowrap',
        }}>
          هنا الآن!
          <span style={{
            position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '7px solid transparent', borderRight: '7px solid transparent',
            borderTop: `7px solid ${subject.color}`,
          }}/>
        </div>
      )}
      <Tappable onTap={!locked ? onTap : undefined} disabled={locked} style={{
        width: sz, height: sz, borderRadius: isBoss ? 24 : '50%',
        background: colors.bg,
        borderBottom: `7px solid ${colors.dk}`,
        border: 'none', borderBottomWidth: 7, borderBottomStyle: 'solid', borderBottomColor: colors.dk,
        boxShadow: '0 3px 0 rgba(0,0,0,.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: isBoss ? 48 : 38, padding: 0,
        opacity: locked ? .7 : 1,
        position: 'relative',
      }}>
        {icon}
        {/* completion stars */}
        {done && !isBoss && !isReward && (
          <div style={{ position: 'absolute', top: -6, insetInlineEnd: -4, display: 'flex', gap: 1 }}>
            {[1,1,1].map((_, i) => (
              <Icon key={i} name="star" size={14} color="#FFC93C" style={{ filter: 'drop-shadow(0 1px 0 #B8860B)' }}/>
            ))}
          </div>
        )}
      </Tappable>
      {/* label */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 13, fontWeight: 800,
        color: locked ? '#A8895F' : (dark ? '#FFE3D6' : 'var(--text-main)'),
        textAlign: 'center', maxWidth: 160, lineHeight: 1.2,
        marginTop: 4,
      }}>
        {node.title}
      </div>
      {!locked && (
        <div style={{ fontSize: 11, color: '#A8895F', fontWeight: 700 }}>
          +{node.xp.toLocaleString('ar-EG')} XP
        </div>
      )}
    </div>
  );
};

Object.assign(window, { HomeScreen, JourneyScreen });
