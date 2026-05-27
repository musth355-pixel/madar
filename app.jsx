// app.jsx — Root App, router state, tweaks integration

const { useState: useStA, useEffect: useEffA, useMemo: useMemoA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primary": "#FF8A3D",
  "font": "playful",
  "dark": false
}/*EDITMODE-END*/;

const PRIMARIES = [
  { value: '#FF8A3D', name: 'برتقالي', dk: '#C04010' },
  { value: '#4FB286', name: 'أخضر',   dk: '#357A5B' },
  { value: '#9B7EDE', name: 'بنفسجي', dk: '#6A4F9E' },
  { value: '#5BA3D9', name: 'أزرق',   dk: '#2E6DA4' },
  { value: '#E86A8E', name: 'وردي',   dk: '#B83A60' },
];

const FONTS = {
  playful:   { display: '"Baloo 2", "Tajawal", system-ui, sans-serif', body: '"Tajawal", "Nunito", system-ui, sans-serif', label: 'مرح' },
  modern:    { display: '"IBM Plex Sans Arabic", system-ui, sans-serif', body: '"IBM Plex Sans Arabic", system-ui, sans-serif', label: 'حديث' },
  classic:   { display: '"Amiri", "Cairo", serif', body: '"Cairo", system-ui, sans-serif', label: 'كلاسيكي' },
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [view, setView] = useStA('home');           // home | journey | lesson | quiz | awards | profile
  const [subject, setSubject] = useStA(SUBJECTS[0]);
  const [toast, setToast] = useStA(null);
  const [user, setUser] = useStA(USER);

  // Update CSS vars on tweak change
  useEffA(() => {
    const root = document.documentElement;
    const primary = t.primary || '#FF8A3D';
    const dk = PRIMARIES.find(p => p.value === primary)?.dk || shade(primary, -.25);
    root.style.setProperty('--primary', primary);
    root.style.setProperty('--primary-dk', dk);
    const font = FONTS[t.font] || FONTS.playful;
    root.style.setProperty('--font-display', font.display);
    root.style.setProperty('--font-body', font.body);
    root.style.setProperty('--cream', t.dark ? '#1A1410' : '#FFF6E9');
    root.style.setProperty('--cream-md', t.dark ? '#28201A' : '#FFE8CC');
    root.style.setProperty('--cream-dk', t.dark ? '#3A2E25' : '#FFD89E');
    root.style.setProperty('--text-main', t.dark ? '#FFF6E9' : '#3A2210');
    root.style.setProperty('--text-muted', t.dark ? '#C0A080' : '#7A5A38');
    root.style.setProperty('--track', t.dark ? 'rgba(255,255,255,.08)' : '#FFE3D6');
    document.body.style.background = t.dark ? '#0E0A07' : 'var(--cream)';
  }, [t.primary, t.font, t.dark]);

  const handleNav = (id) => {
    if (id === 'home')    setView('home');
    if (id === 'journey') { setView('journey'); }
    if (id === 'awards')  setView('awards');
    if (id === 'profile') setView('profile');
  };

  const handlePickSubject = (s) => {
    setSubject(s);
    setView('journey');
  };

  const handleNode = (node) => {
    if (node.state === 'locked') return;
    // open lesson (or quiz, if quiz-type node)
    if (node.type === 'quiz' || node.type === 'boss') {
      setView('quiz');
    } else if (node.type === 'reward') {
      // simple toast
      setToast({ msg: '🎁 فتحت صندوق الكنز! +٥٠ XP', color: '#FFC93C' });
      setUser({ ...user, xp: user.xp + 50 });
      setTimeout(() => setToast(null), 2500);
    } else {
      setView('lesson');
    }
  };

  const handleQuizComplete = ({ xp }) => {
    setUser({ ...user, xp: user.xp + xp });
    setToast({ msg: `+${xp.toLocaleString('ar-EG')} XP حصلت عليها!`, color: '#4FB286' });
    setTimeout(() => setToast(null), 2500);
    setView('journey');
  };

  // ─── Side rail active map ───
  const sideActive = view === 'lesson' || view === 'quiz' || view === 'journey' ? 'journey'
                    : view === 'awards' ? 'awards'
                    : view === 'profile' ? 'profile'
                    : 'home';

  // Hide top bar in lesson/quiz immersive views
  const showTopBar = view !== 'lesson' && view !== 'quiz';

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'row', position: 'relative', overflow: 'hidden' }}>
      <SideRail active={sideActive} onNav={handleNav} dark={t.dark}/>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {showTopBar && (
          <TopBar
            user={user}
            dark={t.dark}
            onAvatar={() => setView('profile')}
            title={view === 'awards' ? 'إنجازاتي' : view === 'profile' ? 'ملفي' : view === 'journey' ? null : null}
            backButton={false}
          />
        )}
        <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
          {view === 'home' && (
            <HomeScreen user={user} dark={t.dark}
              onPick={handlePickSubject}
              onContinue={() => { setSubject(SUBJECTS[0]); setView('lesson'); }}
            />
          )}
          {view === 'journey' && (
            <JourneyScreen
              subject={subject} path={MATH_PATH}
              onBack={() => setView('home')}
              onNode={handleNode}
              dark={t.dark}
            />
          )}
          {view === 'lesson' && (
            <LessonScreen
              lesson={SAMPLE_LESSON} subject={subject}
              onClose={() => setView('journey')}
              onStartQuiz={() => setView('quiz')}
              dark={t.dark}
            />
          )}
          {view === 'quiz' && (
            <QuizScreen
              quiz={QUIZ} subject={subject}
              onClose={() => setView('journey')}
              onComplete={handleQuizComplete}
              dark={t.dark}
            />
          )}
          {view === 'awards' && <AchievementsScreen achievements={ACHIEVEMENTS} dark={t.dark}/>}
          {view === 'profile' && <ProfileScreen user={user} dark={t.dark}/>}
        </div>
      </div>

      <Toast show={!!toast} color={toast?.color}>{toast?.msg}</Toast>

      <TweaksPanel title="إعدادات التصميم">
        <TweakSection label="الألوان"/>
        <TweakColor
          label="اللون الأساسي" value={t.primary}
          options={PRIMARIES.map(p => p.value)}
          onChange={(v) => setTweak('primary', v)}
        />
        <TweakToggle label="الوضع الليلي" value={t.dark}
                     onChange={(v) => setTweak('dark', v)}/>
        <TweakSection label="الخط"/>
        <TweakRadio label="عائلة الخط" value={t.font}
                    options={[
                      { value: 'playful', label: 'مرح' },
                      { value: 'modern',  label: 'حديث' },
                      { value: 'classic', label: 'كلاسيكي' },
                    ]}
                    onChange={(v) => setTweak('font', v)}/>
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App/>);
