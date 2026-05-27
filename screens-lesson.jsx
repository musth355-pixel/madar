// screens-learn.jsx — Lesson player + Quiz screen

const { useState: useStLearn, useEffect: useEffLearn, useRef: useRefLearn, useMemo: useMemLearn } = React;

// ═══════════════════════════════════════════════════════════════════
//  LESSON PLAYER — chapter list + content + mascot dialog
// ═══════════════════════════════════════════════════════════════════
const LessonScreen = ({ lesson, subject, onClose, onStartQuiz, dark }) => {
  const [chapIdx, setChapIdx] = useStLearn(2);
  const [stepIdx, setStepIdx] = useStLearn(0);

  const chap = lesson.chapters[chapIdx];
  const ex = lesson.example;
  const totalSteps = ex.steps.length;
  const isExampleChap = chapIdx === 2;

  return (
    <div style={{ height: '100%', display: 'flex', gap: 18, padding: 24, position: 'relative' }}>
      <Blobs colors={dark ? ['#3a2d1f', '#1f2d3a', '#1f3a2d', '#3a1f2d'] : [subject.tint, '#FFE8A3', '#DFF3E9', '#FCE3EA']} opacity={dark ? .25 : .4}/>

      {/* ── Sidebar with chapters ── */}
      <div style={{
        width: 260,
        background: dark ? 'rgba(255,255,255,.05)' : '#fff',
        border: `2px solid ${dark ? 'rgba(255,255,255,.06)' : 'var(--cream-dk)'}`,
        borderRadius: 24, padding: '18px 16px',
        display: 'flex', flexDirection: 'column', gap: 12,
        boxShadow: dark ? 'none' : '0 5px 0 var(--cream-dk)',
        position: 'relative', zIndex: 2,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: subject.tint,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name={subject.icon} size={24} color={subject.color}/>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#A8895F', fontWeight: 800 }}>{subject.ar}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, color: dark ? '#FFE3D6' : 'var(--text-main)', lineHeight: 1.1 }}>{lesson.title}</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {lesson.chapters.map((c, i) => {
            const isCurrent = i === chapIdx;
            const isDone = c.done;
            return (
              <Tappable key={c.id} onTap={() => setChapIdx(i)} style={{
                background: isCurrent ? subject.tint : 'transparent',
                border: 'none', borderRadius: 14, padding: '10px 12px',
                display: 'flex', alignItems: 'center', gap: 10,
                color: dark ? '#FFE3D6' : 'var(--text-main)',
                textAlign: 'start',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 10,
                  background: isDone ? '#4FB286' : (isCurrent ? subject.color : (dark ? 'rgba(255,255,255,.06)' : '#FFF6E9')),
                  border: !isDone && !isCurrent ? `1.5px solid ${dark ? 'rgba(255,255,255,.1)' : '#FFD89E'}` : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isDone || isCurrent ? '#fff' : '#A8895F',
                  fontWeight: 800, fontSize: 12, flexShrink: 0,
                }}>
                  {isDone ? <Icon name="check" size={14} stroke={3.5} color="#fff"/> : (i + 1).toLocaleString('ar-EG')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 800 }}>{c.title}</div>
                  <div style={{ fontSize: 10, color: '#A8895F' }}>{c.mins} دقائق</div>
                </div>
              </Tappable>
            );
          })}
        </div>
        <div style={{ flex: 1 }}/>
        <div style={{
          background: dark ? 'rgba(255,255,255,.04)' : '#FFF6E9',
          border: `1.5px solid ${dark ? 'rgba(255,255,255,.08)' : '#FFD89E'}`,
          borderRadius: 16, padding: '12px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ fontSize: 11, color: '#A8895F', fontWeight: 700, flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 800, color: dark ? '#FFE3D6' : 'var(--text-main)' }}>
              نقاطك في هذا الدرس
            </div>
            <div>اربح ٥٠ XP بإكماله</div>
          </div>
          <Icon name="star" size={26} color="#FFC93C"/>
        </div>
      </div>

      {/* ── Main lesson area ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', zIndex: 2 }}>
        {/* Top: close + title + progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Tappable onTap={onClose} style={{
            width: 44, height: 44, borderRadius: 14,
            background: dark ? 'rgba(255,255,255,.06)' : '#fff',
            border: `1.5px solid ${dark ? 'rgba(255,255,255,.08)' : 'var(--cream-dk)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="x" size={20} stroke={2.4} color={dark ? '#FFE3D6' : 'var(--text-main)'}/>
          </Tappable>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: '#A8895F' }}>الفصل {(chapIdx + 1).toLocaleString('ar-EG')} من {lesson.chapters.length.toLocaleString('ar-EG')}</span>
              <span style={{ fontSize: 12, fontWeight: 800, color: subject.color }}>{Math.round(((chapIdx + (isExampleChap ? (stepIdx + 1) / (totalSteps + 1) : 0)) / lesson.chapters.length) * 100).toLocaleString('ar-EG')}٪</span>
            </div>
            <ProgressBar value={(chapIdx + (isExampleChap ? (stepIdx + 1) / (totalSteps + 1) : 0)) / lesson.chapters.length * 100} color={subject.color} height={10}/>
          </div>
        </div>

        {/* Main content card */}
        <div style={{
          flex: 1,
          background: dark ? 'rgba(255,255,255,.05)' : '#fff',
          border: `2px solid ${dark ? 'rgba(255,255,255,.06)' : 'var(--cream-dk)'}`,
          borderRadius: 28, padding: '28px 32px',
          boxShadow: dark ? 'none' : '0 5px 0 var(--cream-dk)',
          display: 'flex', flexDirection: 'column', gap: 18,
          position: 'relative', overflow: 'hidden',
        }}>
          {/* decorative corner */}
          <div style={{
            position: 'absolute', top: -40, insetInlineEnd: -40,
            width: 200, height: 200, borderRadius: '50%',
            background: subject.tint, opacity: dark ? .15 : .4, pointerEvents: 'none',
          }}/>
          <div style={{
            position: 'absolute', bottom: -50, insetInlineStart: -30,
            width: 140, height: 140, borderRadius: '50%',
            background: '#FFE8A3', opacity: dark ? .1 : .35, pointerEvents: 'none',
          }}/>

          <div style={{ position: 'relative', display: 'flex', gap: 18, alignItems: 'flex-start' }}>
            <Mascot size={90} mood="happy" color={subject.color} wave/>
            <div style={{
              flex: 1, background: dark ? 'rgba(255,255,255,.04)' : '#FFF6E9',
              border: `2px dashed ${subject.color}`,
              borderRadius: 20, padding: '14px 18px',
              position: 'relative',
            }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: subject.color, marginBottom: 4 }}>{MASCOT.name} يقول:</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: dark ? '#FFE3D6' : 'var(--text-main)', lineHeight: 1.4 }}>
                {chap.title === 'أمثلة محلولة'
                  ? lesson.hero.headline
                  : (chap.title === 'الفكرة الأساسية' ? lesson.hero.body : `هيا نبدأ بـ "${chap.title}"`)}
              </div>
            </div>
          </div>

          {/* Step content */}
          <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {isExampleChap ? (
              <ColumnAddDemo
                a={ex.operands[0]} b={ex.operands[1]} ans={ex.answer}
                stepIdx={stepIdx} stepText={ex.steps[stepIdx]} color={subject.color} dark={dark}
              />
            ) : (
              <ContentPlaceholder text={chap.title} color={subject.color} dark={dark}/>
            )}
          </div>

          {/* Footer controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
            <Tappable onTap={() => {
              if (stepIdx > 0) setStepIdx(stepIdx - 1);
              else if (chapIdx > 0) { setChapIdx(chapIdx - 1); setStepIdx(0); }
            }} style={{
              width: 50, height: 50, borderRadius: 16,
              background: dark ? 'rgba(255,255,255,.06)' : '#fff',
              border: `2px solid ${dark ? 'rgba(255,255,255,.08)' : 'var(--cream-dk)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="arrow" size={20} stroke={2.4} color={dark ? '#FFE3D6' : 'var(--text-main)'}/>
            </Tappable>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 6 }}>
              {isExampleChap && ex.steps.map((_, i) => (
                <div key={i} style={{
                  width: i === stepIdx ? 28 : 8, height: 8, borderRadius: 99,
                  background: i <= stepIdx ? subject.color : (dark ? 'rgba(255,255,255,.1)' : '#FFE3D6'),
                  transition: 'width .3s, background .3s',
                }}/>
              ))}
            </div>
            <CButton color={subject.color} dark={shade(subject.color, -.2)} size="md"
                     onTap={() => {
                       if (isExampleChap && stepIdx < ex.steps.length - 1) setStepIdx(stepIdx + 1);
                       else if (chapIdx < lesson.chapters.length - 1) { setChapIdx(chapIdx + 1); setStepIdx(0); }
                       else onStartQuiz();
                     }}
                     iconRight={<Icon name="back" size={18} stroke={2.6} color="#fff" style={{ transform: 'scaleX(-1)' }}/>}>
              {isExampleChap && stepIdx < ex.steps.length - 1 ? 'التالي' : (chapIdx < lesson.chapters.length - 1 ? 'الفصل التالي' : 'ابدأ الاختبار')}
            </CButton>
          </div>
        </div>
      </div>
    </div>
  );
};

// Column-addition demo visual (used in the lesson)
const ColumnAddDemo = ({ a, b, ans, stepIdx, stepText, color, dark }) => {
  const aT = Math.floor(a / 10), aU = a % 10;
  const bT = Math.floor(b / 10), bU = b % 10;
  const total = a + b;
  const totT = Math.floor(total / 10), totU = total % 10;
  const carry = aU + bU >= 10;

  const numStyle = {
    fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 800,
    color: dark ? '#FFE3D6' : 'var(--text-main)',
    fontVariantNumeric: 'tabular-nums',
    transition: 'color .3s',
  };
  const colHL = (active) => ({
    ...numStyle,
    color: active ? color : (dark ? '#FFE3D6' : 'var(--text-main)'),
    transform: active ? 'scale(1.15)' : 'scale(1)',
    transition: 'transform .3s, color .3s',
    display: 'inline-block',
  });

  const showU = stepIdx >= 1;
  const showCarry = stepIdx >= 1 && carry;
  const showT = stepIdx >= 2;
  const showAns = stepIdx >= 3;

  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flex: 1, position: 'relative' }}>
      {/* visual columns of dots + rods */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        background: dark ? 'rgba(255,255,255,.04)' : '#FFF6E9',
        border: `2px solid ${dark ? 'rgba(255,255,255,.06)' : '#FFD89E'}`,
        borderRadius: 22, padding: '20px 24px', minWidth: 220,
        direction: 'ltr',
      }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
          {showCarry && (
            <div style={{
              fontSize: 14, fontWeight: 800, color: color,
              background: `${color}22`, padding: '2px 8px', borderRadius: 8,
              marginInlineEnd: 4, animation: 'pop .4s ease-out',
            }}>+١</div>
          )}
          <span style={colHL(stepIdx === 2)}>{aT.toLocaleString('ar-EG')}</span>
          <span style={colHL(stepIdx === 1)}>{aU.toLocaleString('ar-EG')}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ ...numStyle, fontSize: 32, color: color }}>+</span>
          <span style={colHL(stepIdx === 2)}>{bT.toLocaleString('ar-EG')}</span>
          <span style={colHL(stepIdx === 1)}>{bU.toLocaleString('ar-EG')}</span>
        </div>
        <div style={{ width: '100%', height: 3, background: color, borderRadius: 2, marginTop: 4 }}/>
        <div style={{ display: 'flex', gap: 8, opacity: showAns ? 1 : 0, transition: 'opacity .4s', minHeight: 60 }}>
          <span style={{ ...numStyle, color: color, animation: showAns ? 'pop .5s ease-out' : 'none' }}>{totT.toLocaleString('ar-EG')}</span>
          <span style={{ ...numStyle, color: color, animation: showAns ? 'pop .5s .1s ease-out backwards' : 'none' }}>{totU.toLocaleString('ar-EG')}</span>
        </div>
      </div>

      {/* visual rods/dots */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <RowOfBlocks t={aT} u={aU} highlightT={stepIdx === 2} highlightU={stepIdx === 1} color={color}/>
        <RowOfBlocks t={bT} u={bU} highlightT={stepIdx === 2} highlightU={stepIdx === 1} color={color}/>
        <div style={{ height: 2, background: color, borderRadius: 2, opacity: .4 }}/>
        {showAns && <RowOfBlocks t={totT} u={totU} color={color} bright/>}
      </div>

      {/* step caption */}
      <div style={{
        position: 'absolute', bottom: -10, left: 0, right: 0,
        textAlign: 'center', padding: '0 20px',
      }}>
        <span style={{
          display: 'inline-block',
          background: dark ? 'rgba(255,255,255,.06)' : '#fff',
          border: `2px solid ${color}`,
          padding: '8px 18px', borderRadius: 99,
          fontSize: 14, fontWeight: 800,
          color: dark ? '#FFE3D6' : 'var(--text-main)',
        }}>
          الخطوة {(stepIdx + 1).toLocaleString('ar-EG')}: {stepText}
        </span>
      </div>
    </div>
  );
};

const RowOfBlocks = ({ t, u, highlightT, highlightU, color, bright }) => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
    <div style={{ display: 'flex', gap: 3, padding: '4px 6px', borderRadius: 8,
                  background: highlightT ? `${color}22` : 'transparent' }}>
      {Array.from({ length: t }).map((_, i) => (
        <div key={i} style={{
          width: 8, height: 32, borderRadius: 3,
          background: bright ? color : '#FFC93C',
          border: `1.5px solid ${bright ? color : '#D4A800'}`,
        }}/>
      ))}
    </div>
    <div style={{ display: 'flex', gap: 3, padding: '4px 6px', borderRadius: 8,
                  background: highlightU ? `${color}22` : 'transparent' }}>
      {Array.from({ length: u }).map((_, i) => (
        <div key={i} style={{
          width: 8, height: 8, borderRadius: '50%',
          background: bright ? color : '#FF8A3D',
        }}/>
      ))}
    </div>
  </div>
);

const ContentPlaceholder = ({ text, color, dark }) => (
  <div style={{
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexDirection: 'column', gap: 16, padding: 40,
  }}>
    <div style={{
      width: 120, height: 120, borderRadius: 30,
      background: `${color}22`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Icon name="play-o" size={50} color={color} stroke={2.5}/>
    </div>
    <div style={{
      fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800,
      color: dark ? '#FFE3D6' : 'var(--text-main)',
    }}>
      {text}
    </div>
    <div style={{ fontSize: 14, color: '#A8895F' }}>اضغط على "التالي" لمتابعة الشرح</div>
  </div>
);

Object.assign(window, { LessonScreen });
