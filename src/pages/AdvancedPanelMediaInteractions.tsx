import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../layouts/SamplePageLayout';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';
import { CodeViewer } from '../components/CodeViewer';

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PanelPair = styled.div`
  display: flex;
  gap: 10px;
  align-items: stretch;
  margin-top: 12px;
`;

const ResizablePane = styled.div<{ $width: number }>`
  width: ${({ $width }) => $width}%;
  min-height: 130px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  padding: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

const ProgressTrack = styled.div`
  height: 9px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $value: number }>`
  width: ${({ $value }) => $value}%;
  height: 100%;
  background: linear-gradient(90deg, #316aff, #05cd99);
`;

const ScrollBox = styled.div`
  height: 230px;
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  position: relative;
  background: ${({ theme }) => theme.colors.surface};
`;

const Sticky = styled.div<{ $compact: boolean }>`
  position: sticky;
  top: 0;
  padding: ${({ $compact }) => ($compact ? '9px 14px' : '18px 14px')};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 800;
  transition: 0.2s ease;
  z-index: 2;
`;

const ContextMenu = styled.div<{ $x: number; $y: number }>`
  position: fixed;
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
  z-index: 2000;
  min-width: 150px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.16);
  padding: 6px;
`;

const ContextButton = styled.button`
  width: 100%;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  padding: 9px 10px;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;

const SlidePanel = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: min(380px, 90vw);
  height: 100vh;
  z-index: 1900;
  transform: translateX(${({ $open }) => ($open ? '0' : '105%')});
  transition: 0.25s ease;
  background: ${({ theme }) => theme.colors.surface};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: -14px 0 36px rgba(15, 23, 42, 0.18);
  padding: 22px;
`;

const BottomSheet = styled.div<{ $open: boolean }>`
  position: fixed;
  left: 50%;
  bottom: 0;
  z-index: 1950;
  width: min(520px, calc(100% - 24px));
  transform: translate(-50%, ${({ $open }) => ($open ? '0' : '110%')});
  transition: 0.25s ease;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 0;
  border-radius: 14px 14px 0 0;
  background: ${({ theme }) => theme.colors.surface};
  padding: 18px;
  box-shadow: 0 -16px 50px rgba(15, 23, 42, 0.18);
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
`;

const Tag = styled.button`
  border: 0;
  border-radius: 999px;
  padding: 6px 9px;
  background: #dbeafe;
  color: #1d4ed8;
  cursor: pointer;
  font-weight: 800;
`;

const DropZone = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 24px;
  text-align: center;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;

  h3 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;
  }

  p {
    margin: 6px 0 0;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.5;
    font-size: 0.9rem;
  }

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

interface DemoCardProps {
  title: string;
  description: string;
  codeSnippet: string;
  children: React.ReactNode;
}

const DemoCard: React.FC<DemoCardProps> = ({ title, description, codeSnippet, children }) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <Card padding="18px">
      <HeaderRow>
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <Button
          variant="outline"
          size="small"
          onClick={() => setShowCode((prev) => !prev)}
          icon={showCode ? 'ri-eye-off-line' : 'ri-code-s-slash-line'}
        >
          {showCode ? '코드 숨기기' : '옵션 코드 보기'}
        </Button>
      </HeaderRow>
      {children}
      {showCode && (
        <CodeViewer rawCode={codeSnippet} filename={`${title}.tsx`} />
      )}
    </Card>
  );
};

const RESIZABLE_CODE = `const PanelPair = styled.div\`
  display: flex;
  gap: 10px;
  align-items: stretch;
  margin-top: 12px;
\`;

const ResizablePane = styled.div<{ $width: number }>\`
  width: \${({ $width }) => $width}%;
  min-height: 130px;
  border: 1px solid \${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: \${({ theme }) => theme.colors.background};
  padding: 14px;
  color: \${({ theme }) => theme.colors.text};
\`;

const [panelWidth, setPanelWidth] = useState(56);
const [splitOpen, setSplitOpen] = useState(true);

<input
  type="range"
  min={35}
  max={80}
  value={panelWidth}
  onChange={(event) => setPanelWidth(Number(event.target.value))}
/>
<Button onClick={() => setSplitOpen((prev) => !prev)}>
  Split {splitOpen ? '닫기' : '열기'}
</Button>
<div style={{ display: 'flex', gap: 10 }}>
  <ResizablePane $width={splitOpen ? panelWidth : 100}>
    메인 패널
  </ResizablePane>
  {splitOpen && (
    <ResizablePane $width={100 - panelWidth}>
      보조 패널
    </ResizablePane>
  )}
</div>`;

const STEP_CODE = `const ProgressTrack = styled.div\`
  height: 9px;
  background: \${({ theme }) => theme.colors.border};
  border-radius: 999px;
  overflow: hidden;
\`;

const ProgressFill = styled.div<{ $value: number }>\`
  width: \${({ $value }) => $value}%;
  height: 100%;
  background: linear-gradient(90deg, #316aff, #05cd99);
\`;

const [step, setStep] = useState(1);
const [progress, setProgress] = useState(46);
const [seconds, setSeconds] = useState(90);

useEffect(() => {
  const interval = window.setInterval(() => {
    setSeconds((prev) => (prev <= 0 ? 90 : prev - 1));
  }, 1000);
  return () => window.clearInterval(interval);
}, []);

<ProgressTrack>
  <ProgressFill $value={progress} />
</ProgressTrack>`;

const SCROLL_CODE = `const ScrollBox = styled.div\`
  height: 230px;
  overflow-y: auto;
  border: 1px solid \${({ theme }) => theme.colors.border};
  border-radius: 8px;
  position: relative;
  background: \${({ theme }) => theme.colors.surface};
\`;

const Sticky = styled.div<{ $compact: boolean }>\`
  position: sticky;
  top: 0;
  padding: \${({ $compact }) => ($compact ? '9px 14px' : '18px 14px')};
  background: \${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid \${({ theme }) => theme.colors.border};
  color: \${({ theme }) => theme.colors.text};
  font-weight: 800;
  transition: 0.2s ease;
  z-index: 2;
\`;

const scrollRef = useRef<HTMLDivElement>(null);
const [compactHeader, setCompactHeader] = useState(false);
const [showTop, setShowTop] = useState(false);
const [activeSection, setActiveSection] = useState('개요');

<ScrollBox
  ref={scrollRef}
  onScroll={() => {
    const top = scrollRef.current?.scrollTop || 0;
    setCompactHeader(top > 35);
    setShowTop(top > 100);
    setActiveSection(top > 160 ? '상세' : '개요');
  }}
>
  <Sticky $compact={compactHeader}>현재 섹션: {activeSection}</Sticky>
  {showTop && (
    <Button onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}>
      Top
    </Button>
  )}
</ScrollBox>`;

const IMAGE_CODE = `const ProgressTrack = styled.div\`
  height: 9px;
  background: \${({ theme }) => theme.colors.border};
  border-radius: 999px;
  overflow: hidden;
\`;

const ProgressFill = styled.div<{ $value: number }>\`
  width: \${({ $value }) => $value}%;
  height: 100%;
  background: linear-gradient(90deg, #316aff, #05cd99);
\`;

const [imageUrl, setImageUrl] = useState('');
const [progress, setProgress] = useState(46);

<Input
  type="url"
  placeholder="이미지 URL 입력"
  value={imageUrl}
  onChange={(event) => setImageUrl(event.target.value)}
/>
{imageUrl && (
  <img src={imageUrl} alt="preview" />
)}
<ProgressTrack>
  <ProgressFill $value={progress} />
</ProgressTrack>`;

const TAG_DATE_CODE = `const TagList = styled.div\`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
\`;

const Tag = styled.button\`
  border: 0;
  border-radius: 999px;
  padding: 6px 9px;
  background: #dbeafe;
  color: #1d4ed8;
  cursor: pointer;
  font-weight: 800;
\`;

const [tags, setTags] = useState(['React', 'UI']);
const [tagInput, setTagInput] = useState('');
const [date, setDate] = useState('2026-04-26');
const [range, setRange] = useState({ start: '2026-04-01', end: '2026-04-30' });

const addTag = () => {
  const value = tagInput.trim();
  if (!value || tags.includes(value)) return;
  setTags((prev) => [...prev, value]);
  setTagInput('');
};

<input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
<input type="date" value={range.start} onChange={(event) => setRange((prev) => ({ ...prev, start: event.target.value }))} />
<input type="date" value={range.end} onChange={(event) => setRange((prev) => ({ ...prev, end: event.target.value }))} />`;

const OVERLAY_CODE = `const DropZone = styled.div\`
  border: 2px dashed \${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: \${({ theme }) => theme.colors.background};
  color: \${({ theme }) => theme.colors.textMuted};
  padding: 24px;
  text-align: center;
\`;

const ContextMenu = styled.div<{ $x: number; $y: number }>\`
  position: fixed;
  left: \${({ $x }) => $x}px;
  top: \${({ $y }) => $y}px;
  z-index: 2000;
  min-width: 150px;
  border: 1px solid \${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: \${({ theme }) => theme.colors.surface};
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.16);
  padding: 6px;
\`;

const SlidePanel = styled.div<{ $open: boolean }>\`
  position: fixed;
  top: 0;
  right: 0;
  width: min(380px, 90vw);
  height: 100vh;
  z-index: 1900;
  transform: translateX(\${({ $open }) => ($open ? '0' : '105%')});
  transition: 0.25s ease;
  background: \${({ theme }) => theme.colors.surface};
  border-left: 1px solid \${({ theme }) => theme.colors.border};
  box-shadow: -14px 0 36px rgba(15, 23, 42, 0.18);
  padding: 22px;
\`;

const BottomSheet = styled.div<{ $open: boolean }>\`
  position: fixed;
  left: 50%;
  bottom: 0;
  z-index: 1950;
  width: min(520px, calc(100% - 24px));
  transform: translate(-50%, \${({ $open }) => ($open ? '0' : '110%')});
  transition: 0.25s ease;
  border: 1px solid \${({ theme }) => theme.colors.border};
  border-bottom: 0;
  border-radius: 14px 14px 0 0;
  background: \${({ theme }) => theme.colors.surface};
  padding: 18px;
  box-shadow: 0 -16px 50px rgba(15, 23, 42, 0.18);
\`;

const [context, setContext] = useState({ open: false, x: 0, y: 0 });
const [slideOpen, setSlideOpen] = useState(false);
const [sheetOpen, setSheetOpen] = useState(false);

<DropZone
  onContextMenu={(event) => {
    event.preventDefault();
    setContext({ open: true, x: event.clientX, y: event.clientY });
  }}
>
  이 영역에서 우클릭
</DropZone>
{context.open && <ContextMenu $x={context.x} $y={context.y} />}
<SlidePanel $open={slideOpen}>슬라이드 패널</SlidePanel>
<BottomSheet $open={sheetOpen}>바텀시트</BottomSheet>`;

export const AdvancedPanelMediaInteractions: React.FC = () => {
  const [panelWidth, setPanelWidth] = useState(56);
  const [splitOpen, setSplitOpen] = useState(true);
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(46);
  const [seconds, setSeconds] = useState(90);
  const [compactHeader, setCompactHeader] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeSection, setActiveSection] = useState('개요');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState(['React', 'UI']);
  const [tagInput, setTagInput] = useState('');
  const [date, setDate] = useState('2026-04-26');
  const [range, setRange] = useState({ start: '2026-04-01', end: '2026-04-30' });
  const [context, setContext] = useState({ open: false, x: 0, y: 0 });
  const [slideOpen, setSlideOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSeconds((prev) => (prev <= 0 ? 90 : prev - 1));
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const close = () => setContext((prev) => ({ ...prev, open: false }));
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const addTag = () => {
    const value = tagInput.trim();
    if (!value || tags.includes(value)) return;
    setTags((prev) => [...prev, value]);
    setTagInput('');
  };

  return (
    <SamplePageLayout
      title="고급 패널/미디어 인터랙션"
      icon="ri-sparkling-line"
      description="리사이즈 패널, split view, 스텝 진행, 진행바, 타이머, sticky 헤더, Top 버튼, 현재 섹션 active, 이미지 미리보기, 업로드 진행률, 태그, 날짜/기간, 컨텍스트 메뉴, 슬라이드 패널, 바텀시트를 다룹니다."
      learningPoints={[
        'range 입력값으로 패널 너비와 진행률을 조절',
        '스크롤 위치에 따라 sticky 헤더, Top 버튼, active 섹션 상태 변경',
        '오버레이 계층인 컨텍스트 메뉴, 슬라이드 패널, 바텀시트 구현',
      ]}
      whyImportant="고급 인터랙션은 화면 품질을 크게 끌어올립니다. 특히 데이터가 많은 화면에서는 패널 분할, 빠른 이동, 미리보기, 모바일 친화적 바텀시트가 실무에서 자주 필요합니다."
    >
      <Stack>
        <DemoCard
          title="리사이즈 패널 / Split view"
          description="range 값으로 왼쪽 패널의 너비를 바꾸고, 보조 패널을 열고 닫습니다."
          codeSnippet={RESIZABLE_CODE}
        >
          <input type="range" min={35} max={80} value={panelWidth} onChange={(event) => setPanelWidth(Number(event.target.value))} />
          <Button size="small" variant="outline" style={{ marginLeft: 8 }} onClick={() => setSplitOpen((prev) => !prev)}>
            Split {splitOpen ? '닫기' : '열기'}
          </Button>
          <PanelPair>
            <ResizablePane $width={splitOpen ? panelWidth : 100}>메인 패널 {splitOpen ? `${panelWidth}%` : '100%'}</ResizablePane>
            {splitOpen && <ResizablePane $width={100 - panelWidth}>보조 패널</ResizablePane>}
          </PanelPair>
        </DemoCard>

        <DemoCard
          title="스텝 / 진행 상태바 / 타이머"
          description="현재 단계, 진행률, 카운트다운 시간을 각각 상태로 관리합니다."
          codeSnippet={STEP_CODE}
        >
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            {[1, 2, 3].map((number) => (
              <Button key={number} size="small" variant={step === number ? 'primary' : 'outline'} onClick={() => setStep(number)}>{number}</Button>
            ))}
          </div>
          <ProgressTrack><ProgressFill $value={progress} /></ProgressTrack>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 12 }}>
            <input type="range" min={0} max={100} value={progress} onChange={(event) => setProgress(Number(event.target.value))} />
            <strong>{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}</strong>
          </div>
        </DemoCard>

        <DemoCard
          title="Sticky 헤더 / Top 버튼 / 현재 섹션"
          description="스크롤 위치에 따라 헤더 크기, Top 버튼, 현재 섹션 표시를 바꿉니다."
          codeSnippet={SCROLL_CODE}
        >
          <ScrollBox
            ref={scrollRef}
            onScroll={() => {
              const top = scrollRef.current?.scrollTop || 0;
              setCompactHeader(top > 35);
              setShowTop(top > 100);
              setActiveSection(top > 160 ? '상세' : '개요');
            }}
          >
            <Sticky $compact={compactHeader}>현재 섹션: {activeSection}</Sticky>
            <div style={{ height: 430, padding: 16, color: '#64748b' }}>스크롤하면 헤더가 축소되고 Top 버튼이 표시됩니다.</div>
            {showTop && <Button size="small" style={{ position: 'absolute', right: 14, bottom: 14 }} onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}>Top</Button>}
          </ScrollBox>
        </DemoCard>

        <DemoCard
          title="이미지 미리보기 / 업로드 진행률"
          description="입력한 이미지 URL을 즉시 미리보기로 렌더링하고 진행률 바를 함께 보여줍니다."
          codeSnippet={IMAGE_CODE}
        >
          <Input type="url" placeholder="이미지 URL 입력" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} />
          {imageUrl && <img src={imageUrl} alt="preview" style={{ width: '100%', maxHeight: 160, objectFit: 'cover', borderRadius: 8, marginTop: 12 }} />}
          <div style={{ marginTop: 12 }}><ProgressTrack><ProgressFill $value={progress} /></ProgressTrack></div>
        </DemoCard>

        <DemoCard
          title="복수 태그 / 캘린더 / 기간 선택"
          description="태그 배열, 단일 날짜, 시작/종료 기간을 각각 상태로 관리합니다."
          codeSnippet={TAG_DATE_CODE}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8 }}>
            <Input value={tagInput} placeholder="태그 입력 후 Enter" onChange={(event) => setTagInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') addTag(); }} />
            <Button size="small" onClick={addTag}>추가</Button>
          </div>
          <TagList>
            {tags.map((tag) => <Tag key={tag} onClick={() => setTags((prev) => prev.filter((item) => item !== tag))}>{tag} x</Tag>)}
          </TagList>
          <div style={{ display: 'grid', gap: 8, marginTop: 12 }}>
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
            <input type="date" value={range.start} onChange={(event) => setRange((prev) => ({ ...prev, start: event.target.value }))} />
            <input type="date" value={range.end} onChange={(event) => setRange((prev) => ({ ...prev, end: event.target.value }))} />
          </div>
        </DemoCard>

        <DemoCard
          title="컨텍스트 메뉴 / 슬라이드 패널 / 바텀시트"
          description="우클릭 좌표 기반 메뉴와 화면 밖에서 들어오는 오버레이 패널을 구현합니다."
          codeSnippet={OVERLAY_CODE}
        >
          <DropZone
            onContextMenu={(event) => {
              event.preventDefault();
              setContext({ open: true, x: event.clientX, y: event.clientY });
            }}
          >
            이 영역에서 우클릭
          </DropZone>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <Button size="small" variant="outline" onClick={() => setSlideOpen(true)}>슬라이드 패널</Button>
            <Button size="small" onClick={() => setSheetOpen(true)}>바텀시트</Button>
          </div>
        </DemoCard>
      </Stack>

      {context.open && (
        <ContextMenu $x={context.x} $y={context.y}>
          <ContextButton><i className="ri-file-copy-line" /> 복사</ContextButton>
          <ContextButton><i className="ri-external-link-line" /> 새 탭에서 열기</ContextButton>
          <ContextButton><i className="ri-delete-bin-line" /> 삭제</ContextButton>
        </ContextMenu>
      )}

      <SlidePanel $open={slideOpen}>
        <h3>슬라이드 패널</h3>
        <p style={{ color: '#64748b' }}>상세 정보나 설정을 오른쪽에서 열어 보여줍니다.</p>
        <Button size="small" onClick={() => setSlideOpen(false)}>닫기</Button>
      </SlidePanel>

      <BottomSheet $open={sheetOpen}>
        <h3 style={{ marginTop: 0 }}>바텀시트</h3>
        <p style={{ color: '#64748b' }}>모바일에서 자주 쓰는 하단 액션 패널입니다.</p>
        <Button size="small" onClick={() => setSheetOpen(false)}>닫기</Button>
      </BottomSheet>
    </SamplePageLayout>
  );
};
