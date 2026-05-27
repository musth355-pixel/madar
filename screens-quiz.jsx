// screens-quiz.jsx — Interactive Quiz with MC + drag-match + tile-build

const { useState: useStQ, useEffect: useEffQ, useRef: useRefQ, useMemo: useMemQ } = React;

const QuizScreen = ({ quiz, subject, onClose, onComplete, dark }) => {
  const [idx, setIdx] = useStQ(0);
  const [chosen, setChosen] = useStQ(null);     // for multiple choice
  const [verified, setVerified] = useStQ(false);
  const [hearts, setHearts] = useStQ(5);
  const [xpEarned, setXpEarned] = useStQ(0);
  const [correctCount, setCorrectCount] = useStQ(0);
  const [done, setDone] = useStQ(false);
  const [shakeKey, setShakeKey] = useStQ(0);
  const [confetti, setConfetti] = useStQ(false);
  // drag-match state
  const [pairs, setPairs] = useStQ([]);   // for q kind=drag-match -> [{leftIdx, rightIdx, color}]
  // tile-build state
  const [tilesPicked, setTilesPicked] = useStQ([]); // array of indexes picked

  const q = quiz.questions[idx];

  // Reset per-question
  useEffQ(() => {
    setChosen(null);
    setVerified(false);
    setPairs([]);
    setTilesPicked([]);
  }, [idx]);

  // Determine correctness
  const isCorrect = useMemQ(() => {
    if (!q) return false;
    if (q.kind === 'multiple-choice') return chosen === q.answer;
    if (q.kind === 'drag-match')      return pairs.length === q.pairs.length &&
                                              pairs.every(p => q.pairs[p.leftIdx].right === q.pairs[p.rightIdx].right);
    if (q.kind === 'tap-tiles')        return tilesPicked.reduce((s, i) => s + q.tiles[i].v, 0) === q.target;
    return false;
  }, [q, chosen, pairs, tilesPicked]);

  const canCheck = useMemQ(() => {
    if (!q) return false;
    if (q.kind === 'multiple-choice') return chosen !== null;
    if (q.kind === 'drag-match')      return pairs.length === q.pairs.length;
    if (q.kind === 'tap-tiles')        return tilesPicked.length > 0;
    return false;
  }, [q, chosen, pairs, tilesPicked]);

  const handleCheck = () => {
    setVerified(true);
    if (isCorrect) {
      setCorrectCount(c => c + 1);
      setXpEarned(x => x + 10);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 1300);
    } else {
      setHearts(h => Math.max(0, h - 1));
      setShakeKey(k => k + 1);
    }
  };

  const handleNext = () => {
    if (idx < quiz.questions.length - 1) {
      setIdx(idx + 1);
    } else {
      setDone(true);
      // big confetti
      setConfetti(true);
      setTimeout(() => setConfetti(false), 1800);
    }
  };

  const progress = ((idx + (verified ? 1 : 0)) / quiz.questions.length) * 100;

  if (done) {
    return <QuizComplete
              correct={correctCount}
              total={quiz.questions.length}
              xp={xpEarned + 50}
              subject={subject}
              onContinue={() => onComplete({ xp: xpEarned + 50, correct: correctCount })}
              dark={dark}/>;
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '20px 28px 24px', gap: 16, position: 'relative' }}>
      <Confetti active={confetti}/>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Tappable onTap={onClose} style={{
          width: 44, height: 44, borderRadius: 14,
          background: dark ? 'rgba(255,255,255,.06)' : '#fff',
          border: `1.5px solid ${dark ? 'rgba(255,255,255,.08)' : 'var(--cream-dk)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="x" size={20} stroke={2.4} color={dark ? '#FFE3D6' : 'var(--text-main)'}/>
        </Tappable>
        <div style={{ flex: 1 }}>
          <div style={{ background: dark ? 'rgba(255,255,255,.06)' : '#FFE3D6', borderRadius: 99, height: 16, overflow: 'hidden' }}>
            <div style={{
              width: `${progress}%`, height: '100%',
              background: '#4FB286',
              borderRadius: 99,
              transition: 'width .5s cubic-bezier(.4,1.4,.5,1)',
              position: 'relative',
            }}>
              <div style={{ position: 'absolute', top: 3, left: 6, right: 6, height: 4, background: 'rgba(255,255,255,.5)', borderRadius: 99 }}/>
            </div>
          </div>
        </div>
        <Hearts count={hearts} max={5} dark={dark}/>
      </div>

      {/* Question card */}
      <div key={`shake-${shakeKey}`} style={{
        flex: 1,
        animation: verified && !isCorrect ? 'shake .4s' : 'none',
      }}>
        <div style={{
          height: '100%',
          background: dark ? 'rgba(255,255,255,.05)' : '#fff',
          border: `2px solid ${dark ? 'rgba(255,255,255,.06)' : 'var(--cream-dk)'}`,
          borderRadius: 28, padding: '28px 32px',
          boxShadow: dark ? 'none' : '0 6px 0 var(--cream-dk)',
          display: 'flex', flexDirection: 'column', gap: 18,
          overflow: 'hidden', position: 'relative',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              fontSize: 12, fontWeight: 800,
              background: subject.tint, color: subject.tone,
              padding: '5px 12px', borderRadius: 99,
            }}>سؤال {(idx + 1).toLocaleString('ar-EG')} من {quiz.questions.length.toLocaleString('ar-EG')}</span>
            <span style={{ fontSize: 12, color: '#A8895F', fontWeight: 700 }}>{quiz.title}</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800,
            color: dark ? '#FFE3D6' : 'var(--text-main)', lineHeight: 1.3,
          }}>{q.prompt}</h2>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {q.kind === 'multiple-choice' && (
              <MCQuestion q={q} chosen={chosen} setChosen={setChosen} verified={verified} dark={dark}/>
            )}
            {q.kind === 'drag-match' && (
              <DragMatch q={q} pairs={pairs} setPairs={setPairs} verified={verified} dark={dark}/>
            )}
            {q.kind === 'tap-tiles' && (
              <TapTiles q={q} picked={tilesPicked} setPicked={setTilesPicked} verified={verified} dark={dark}/>
            )}
          </div>
        </div>
      </div>

      {/* Footer feedback bar */}
      <FeedbackBar
        show={verified}
        correct={isCorrect}
        explanation={isCorrect ? 'ممتاز! إجابة صحيحة 🎉' : `الإجابة الصحيحة: ${(q.kind === 'multiple-choice' ? q.options[q.answer] : 'حاول مرة أخرى')}.${q.hint ? ' تلميح: ' + q.hint : ''}`}
        onNext={handleNext}
        onCheck={handleCheck}
        canCheck={canCheck}
        dark={dark}
      />
    </div>
  );
};

// ─── Multiple choice ───
const MCQuestion = ({ q, chosen, setChosen, verified, dark }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
    {/* Optional visual */}
    {q.visual === 'cols-add' || q.visual === 'cols-sub' ? (
      <div style={{
        background: dark ? 'rgba(255,255,255,.04)' : '#FFF6E9',
        border: `2px dashed ${dark ? 'rgba(255,255,255,.1)' : '#FFD89E'}`,
        borderRadius: 22, padding: '18px 30px',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        minHeight: 130, gap: 30,
      }}>
        <ColumnVisual op={q.visual === 'cols-add' ? '+' : '−'} a={q.operands[0]} b={q.operands[1]} dark={dark}/>
      </div>
    ) : q.visual === 'word-problem' ? (
      <div style={{
        background: dark ? 'rgba(255,255,255,.04)' : '#DFF3E9',
        border: `2px solid ${dark ? 'rgba(255,255,255,.06)' : '#B7D8C5'}`,
        borderRadius: 22, padding: '14px 18px',
        display: 'flex', gap: 14, alignItems: 'center',
      }}>
        <GardenIllustration/>
        <div style={{ fontSize: 13, color: dark ? '#B7D8C5' : '#357A5B', fontWeight: 700 }}>
          🌸 في الحديقة ٤٣ زهرة جميلة... هيا ساعد سارة في العدّ!
        </div>
      </div>
    ) : null}

    {/* Options grid */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, flex: 1, alignContent: 'start' }}>
      {q.options.map((opt, i) => {
        const isChosen = chosen === i;
        const isAnswer = i === q.answer;
        const showCorrect = verified && isAnswer;
        const showWrong   = verified && isChosen && !isAnswer;
        const baseBg = dark ? 'rgba(255,255,255,.05)' : '#fff';
        const baseBorder = dark ? 'rgba(255,255,255,.1)' : '#FFD89E';
        let bg = baseBg, border = baseBorder, color = dark ? '#FFE3D6' : 'var(--text-main)';
        if (showCorrect) { bg = '#DFF3E9'; border = '#4FB286'; color = '#357A5B'; }
        else if (showWrong) { bg = '#FFE3E0'; border = '#E86A8E'; color = '#B83A60'; }
        else if (isChosen) { bg = dark ? 'rgba(255,138,61,.18)' : '#FFE3D6'; border = '#FF8A3D'; color = 'var(--primary)'; }

        return (
          <Tappable key={i} onTap={() => !verified && setChosen(i)} disabled={verified} style={{
            background: bg, color, border: `2.5px solid ${border}`,
            borderBottom: `5px solid ${border}`,
            borderRadius: 20, padding: '20px 16px',
            fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800,
            position: 'relative', overflow: 'hidden',
            transition: 'all .2s',
            transform: showCorrect ? 'scale(1.02)' : 'scale(1)',
            minHeight: 80,
          }}>
            <span style={{
              position: 'absolute', top: 8, insetInlineStart: 12,
              fontSize: 12, fontWeight: 800, color: '#A8895F', opacity: .8,
            }}>{['أ','ب','ج','د'][i]}</span>
            {opt}
            {showCorrect && (
              <span style={{ position: 'absolute', top: 10, insetInlineEnd: 12 }}>
                <Icon name="check" size={22} stroke={3.5} color="#4FB286"/>
              </span>
            )}
            {showWrong && (
              <span style={{ position: 'absolute', top: 10, insetInlineEnd: 12 }}>
                <Icon name="x" size={22} stroke={3.5} color="#E86A8E"/>
              </span>
            )}
          </Tappable>
        );
      })}
    </div>
  </div>
);

const ColumnVisual = ({ a, b, op, dark }) => {
  const fmt = (n) => n.toLocaleString('ar-EG');
  const numS = { fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 800, color: dark ? '#FFE3D6' : 'var(--text-main)', fontVariantNumeric: 'tabular-nums' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
      <span style={numS}>{fmt(a)}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <span style={{ ...numS, color: 'var(--primary)' }}>{op}</span>
        <span style={numS}>{fmt(b)}</span>
      </span>
      <span style={{ width: 90, height: 3, background: 'var(--primary)', borderRadius: 2, marginTop: 4 }}/>
      <span style={{ ...numS, color: 'var(--primary)' }}>؟</span>
    </div>
  );
};

const GardenIllustration = () => (
  <svg width="90" height="90" viewBox="0 0 100 100" fill="none">
    <ellipse cx="50" cy="85" rx="40" ry="10" fill="#4FB286" opacity=".4"/>
    <g>
      <circle cx="25" cy="62" r="6" fill="#E86A8E"/>
      <circle cx="20" cy="65" r="5" fill="#E86A8E"/>
      <circle cx="30" cy="65" r="5" fill="#E86A8E"/>
      <circle cx="25" cy="68" r="5" fill="#E86A8E"/>
      <circle cx="25" cy="65" r="3" fill="#FFC93C"/>
      <path d="M25 70v15" stroke="#357A5B" strokeWidth="2"/>
    </g>
    <g transform="translate(28 0)">
      <circle cx="25" cy="52" r="6" fill="#FF8A3D"/>
      <circle cx="20" cy="55" r="5" fill="#FF8A3D"/>
      <circle cx="30" cy="55" r="5" fill="#FF8A3D"/>
      <circle cx="25" cy="58" r="5" fill="#FF8A3D"/>
      <circle cx="25" cy="55" r="3" fill="#FFC93C"/>
      <path d="M25 60v25" stroke="#357A5B" strokeWidth="2"/>
    </g>
    <g transform="translate(56 8)">
      <circle cx="25" cy="62" r="6" fill="#9B7EDE"/>
      <circle cx="20" cy="65" r="5" fill="#9B7EDE"/>
      <circle cx="30" cy="65" r="5" fill="#9B7EDE"/>
      <circle cx="25" cy="68" r="5" fill="#9B7EDE"/>
      <circle cx="25" cy="65" r="3" fill="#FFC93C"/>
      <path d="M25 70v15" stroke="#357A5B" strokeWidth="2"/>
    </g>
    <circle cx="78" cy="20" r="8" fill="#FFC93C"/>
  </svg>
);

// ─── Drag-match: connect left items to right answers ───
const DragMatch = ({ q, pairs, setPairs, verified, dark }) => {
  const [draggedLeft, setDraggedLeft] = useStQ(null);
  const colors = ['#FF8A3D', '#4FB286', '#9B7EDE', '#5BA3D9'];

  const usedLeft = new Set(pairs.map(p => p.leftIdx));
  const usedRight = new Set(pairs.map(p => p.rightIdx));

  const handleDrop = (rightIdx) => {
    if (draggedLeft === null) return;
    if (usedRight.has(rightIdx)) return;
    setPairs([...pairs, { leftIdx: draggedLeft, rightIdx, color: colors[pairs.length % colors.length] }]);
    setDraggedLeft(null);
  };

  const clearPair = (leftIdx) => {
    if (verified) return;
    setPairs(pairs.filter(p => p.leftIdx !== leftIdx));
  };

  // Shuffle right side once
  const rightOrder = useMemQ(() => {
    const order = q.pairs.map((_, i) => i);
    // simple deterministic shuffle (reverse halves + interleave)
    return [order[2], order[0], order[3], order[1]];
  }, [q]);

  return (
    <div style={{ display: 'flex', gap: 30, alignItems: 'center', justifyContent: 'center', flex: 1, padding: '0 20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        {q.pairs.map((p, i) => {
          const paired = pairs.find(pp => pp.leftIdx === i);
          return (
            <div key={i}
              draggable={!verified && !paired}
              onDragStart={() => setDraggedLeft(i)}
              onDragEnd={() => setDraggedLeft(null)}
              onClick={() => paired && clearPair(i)}
              style={{
                padding: '18px 22px',
                background: paired ? `${paired.color}22` : (dark ? 'rgba(255,255,255,.06)' : '#fff'),
                border: `2.5px solid ${paired ? paired.color : (dark ? 'rgba(255,255,255,.12)' : '#FFD89E')}`,
                borderBottom: `5px solid ${paired ? paired.color : (dark ? 'rgba(255,255,255,.12)' : '#FFD89E')}`,
                borderRadius: 18,
                fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800,
                color: paired ? paired.color : (dark ? '#FFE3D6' : 'var(--text-main)'),
                cursor: verified ? 'default' : (paired ? 'pointer' : 'grab'),
                userSelect: 'none', textAlign: 'center',
                opacity: draggedLeft === i ? .4 : 1,
              }}
            >{p.left}</div>
          );
        })}
      </div>

      {/* connecting lines svg */}
      <svg width="80" height="280" style={{ overflow: 'visible' }}>
        {pairs.map((pair, i) => {
          const leftY = pair.leftIdx * (280 / q.pairs.length) + 30;
          const rightY = rightOrder.indexOf(pair.rightIdx) * (280 / q.pairs.length) + 30;
          return (
            <path key={i}
              d={`M 0 ${leftY} Q 40 ${(leftY + rightY) / 2} 80 ${rightY}`}
              stroke={pair.color} strokeWidth="4" fill="none"
              strokeLinecap="round" strokeDasharray={verified && q.pairs[pair.leftIdx].right !== q.pairs[pair.rightIdx].right ? '6 4' : 'none'}
            />
          );
        })}
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        {rightOrder.map((origIdx) => {
          const p = q.pairs[origIdx];
          const paired = pairs.find(pp => pp.rightIdx === origIdx);
          return (
            <div key={origIdx}
              onDragOver={(e) => { e.preventDefault(); }}
              onDrop={() => handleDrop(origIdx)}
              onClick={() => {
                // touch fallback: tap right after selecting an unpaired left
                if (draggedLeft !== null) handleDrop(origIdx);
              }}
              style={{
                padding: '18px 22px',
                background: paired ? `${paired.color}22` : (dark ? 'rgba(255,255,255,.06)' : '#fff'),
                border: `2.5px dashed ${paired ? paired.color : (dark ? 'rgba(255,255,255,.12)' : '#FFD89E')}`,
                borderRadius: 18,
                fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800,
                color: paired ? paired.color : (dark ? '#FFE3D6' : 'var(--text-main)'),
                textAlign: 'center', userSelect: 'none',
                transition: 'background .15s',
              }}
            >{p.right}</div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Tap-tiles: pick tiles that add up to target ───
const TapTiles = ({ q, picked, setPicked, verified, dark }) => {
  const total = picked.reduce((s, i) => s + q.tiles[i].v, 0);
  const toggle = (i) => {
    if (verified) return;
    if (picked.includes(i)) setPicked(picked.filter(p => p !== i));
    else setPicked([...picked, i]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center', flex: 1 }}>
      <div style={{
        background: dark ? 'rgba(255,255,255,.05)' : '#FFF6E9',
        border: `2px dashed ${dark ? 'rgba(255,255,255,.1)' : '#FFD89E'}`,
        borderRadius: 22, padding: '14px 24px',
        display: 'flex', gap: 24, alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: 12, color: '#A8895F', fontWeight: 700 }}>المجموع الآن</div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800,
            color: total === q.target ? '#4FB286' : 'var(--primary)',
          }}>{total.toLocaleString('ar-EG')}</div>
        </div>
        <div style={{ fontSize: 22, color: '#A8895F' }}>/</div>
        <div>
          <div style={{ fontSize: 12, color: '#A8895F', fontWeight: 700 }}>الهدف</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: dark ? '#FFE3D6' : 'var(--text-main)' }}>
            {q.target.toLocaleString('ar-EG')}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', maxWidth: 500 }}>
        {q.tiles.map((t, i) => {
          const isPicked = picked.includes(i);
          const isRod = t.c === 'rod';
          return (
            <Tappable key={i} onTap={() => toggle(i)} style={{
              width: isRod ? 32 : 50, height: isRod ? 100 : 50,
              borderRadius: isRod ? 10 : 14,
              background: isPicked ? (isRod ? '#FFC93C' : '#FF8A3D') : (dark ? 'rgba(255,255,255,.06)' : '#fff'),
              border: `2.5px solid ${isPicked ? (isRod ? '#D4A800' : '#C04010') : '#FFD89E'}`,
              borderBottom: `5px solid ${isPicked ? (isRod ? '#D4A800' : '#C04010') : '#FFD89E'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontSize: isRod ? 14 : 18, fontWeight: 800,
              color: isPicked ? '#fff' : '#A8895F',
              transition: 'all .15s',
              transform: isPicked ? 'scale(1.05)' : 'scale(1)',
            }}>
              {t.v.toLocaleString('ar-EG')}
            </Tappable>
          );
        })}
      </div>
    </div>
  );
};

// ─── Feedback bar at bottom ───
const FeedbackBar = ({ show, correct, explanation, onNext, onCheck, canCheck, dark }) => {
  if (!show) {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CButton color="#4FB286" dark="#357A5B" size="lg" disabled={!canCheck} onTap={onCheck}>
          تحقّق ✓
        </CButton>
      </div>
    );
  }
  const bg = correct ? '#DFF3E9' : '#FFE3E0';
  const border = correct ? '#4FB286' : '#E86A8E';
  const color = correct ? '#357A5B' : '#B83A60';
  return (
    <div style={{
      background: bg, border: `2px solid ${border}`,
      borderRadius: 22, padding: '16px 22px',
      display: 'flex', alignItems: 'center', gap: 16,
      animation: 'slideUp .3s ease-out',
    }}>
      <div style={{
        width: 50, height: 50, borderRadius: 16,
        background: border, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon name={correct ? 'check' : 'x'} size={26} stroke={3.5} color="#fff"/>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 800, color }}>
          {correct ? 'رائع! 🎉' : 'ليست الإجابة الصحيحة'}
        </div>
        <div style={{ fontSize: 13, color: color, opacity: .85, marginTop: 2 }}>{explanation}</div>
      </div>
      <CButton color={border} dark={shade(border, -.25)} size="md" onTap={onNext}
               iconRight={<Icon name="back" size={16} stroke={2.8} color="#fff" style={{ transform: 'scaleX(-1)' }}/>}>
        التالي
      </CButton>
    </div>
  );
};

// ─── End-of-quiz celebration ───
const QuizComplete = ({ correct, total, xp, subject, onContinue, dark }) => {
  const [bigC, setBigC] = useStQ(true);
  useEffQ(() => { const t = setTimeout(() => setBigC(false), 2200); return () => clearTimeout(t); }, []);
  const pct = Math.round((correct / total) * 100);
  const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : 1;

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: 40, position: 'relative', gap: 24,
    }}>
      <Confetti active={bigC}/>
      <div style={{ animation: 'pop .6s cubic-bezier(.4,1.6,.5,1)' }}>
        <Mascot size={140} mood="wow" color={subject.color} wave/>
      </div>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800,
        color: subject.color, textAlign: 'center',
      }}>عمل ممتاز!</h2>
      <div style={{ display: 'flex', gap: 10 }}>
        {[1,2,3].map(i => (
          <div key={i} style={{ animation: `pop .5s ${i * .15}s cubic-bezier(.4,1.6,.5,1) backwards` }}>
            <Icon name={i <= stars ? 'star' : 'star-o'} size={56}
                  color={i <= stars ? '#FFC93C' : (dark ? 'rgba(255,255,255,.15)' : '#E0C8A0')}
                  style={{ filter: i <= stars ? 'drop-shadow(0 4px 0 #B8860B)' : 'none' }}/>
          </div>
        ))}
      </div>
      <div style={{
        background: dark ? 'rgba(255,255,255,.05)' : '#fff',
        border: `2px solid ${dark ? 'rgba(255,255,255,.06)' : 'var(--cream-dk)'}`,
        borderRadius: 24, padding: '20px 36px',
        display: 'flex', gap: 36, alignItems: 'center',
        boxShadow: dark ? 'none' : '0 5px 0 var(--cream-dk)',
      }}>
        <Stat label="إجابات صحيحة" value={`${correct.toLocaleString('ar-EG')}/${total.toLocaleString('ar-EG')}`} color="#4FB286" dark={dark}/>
        <Stat label="الدقة" value={`${pct.toLocaleString('ar-EG')}٪`} color="#5BA3D9" dark={dark}/>
        <Stat label="نقاط الخبرة" value={`+${xp.toLocaleString('ar-EG')}`} color="#FFC93C" dark={dark} icon="star"/>
      </div>
      <CButton color={subject.color} dark={shade(subject.color, -.2)} size="lg" onTap={onContinue}>
        🎯 تابع المغامرة
      </CButton>
    </div>
  );
};

const Stat = ({ label, value, color, dark, icon }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
      {icon && <Icon name={icon} size={20} color={color}/>}
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color }}>{value}</span>
    </div>
    <div style={{ fontSize: 12, fontWeight: 700, color: '#A8895F', marginTop: 4 }}>{label}</div>
  </div>
);

Object.assign(window, { QuizScreen });
