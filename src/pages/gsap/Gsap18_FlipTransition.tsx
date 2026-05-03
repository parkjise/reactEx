import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { CodeViewer } from '../../components/CodeViewer';
import { gsap, Flip } from '../../utils/gsapPlugins';
import { useGSAP } from '@gsap/react';

const GalleryContainer = styled.div`
  position: relative;
  min-height: 400px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  padding: 20px;
  
  /* 그리드 모드일 때와 풀스크린 모드일 때 컨테이너 레이아웃 변경 */
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

// 이 박스가 그리드 상태일 때와 확장(Detail) 상태일 때 두 가지 모습을 가집니다.
const Box = styled.div<{ $isExpanded: boolean }>`
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  
  /* 상태에 따른 CSS 클래스 적용보다 빠르고 확실한 조건부 렌더링 스타일링 */
  ${({ $isExpanded }) => 
    $isExpanded 
    ? `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      border-radius: 12px;
    ` 
    : `
      width: calc(33.333% - 10px);
      height: 150px;
      position: relative;
    `}
`;

export const Gsap18_FlipTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 확장된 박스의 ID 상태를 저장 (-1 이면 모두 축소 상태)
  const [expandedId, setExpandedId] = useState<number>(-1);

  // useGSAP에서 Flip을 사용할 때는 layout이 바뀌는 순간을 캐치해야 합니다.
  const { contextSafe } = useGSAP({ scope: containerRef });

  const toggleExpand = contextSafe((id: number) => {
    // 1. [F]irst: 상태가 변경되기 전, 박스들의 현재 DOM 크기와 위치 상태를 기록합니다.
    const state = Flip.getState('.flip-box');

    // 2. 상태 변경 (React 리렌더링을 유발하여 CSS 클래스/인라인 스타일이 바뀜)
    setExpandedId(expandedId === id ? -1 : id);

    // 3. 리렌더링이 완료된 직후(setTimeout 등으로 콜스택을 미룸)에 
    //    [L]ast (변경된 상태)를 기반으로 [I]nvert(역연산) 한 후 [P]lay(애니메이션 재생) 합니다.
    // React 환경에서는 렌더링 주기를 기다리기 위해 requestAnimationFrame 또는 setTimeout(..., 0) 사용 권장
    setTimeout(() => {
      Flip.from(state, {
        duration: 0.6,
        ease: 'power3.inOut',
        absolute: true, // 레이아웃 점프 방지
        zIndex: 10,
      });
    }, 0);
  });

  const codeString = `import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

const toggleExpand = contextSafe((id: number) => {
  // 1. [F]irst: 상태 변경 전 위치/크기 캡처
  const state = Flip.getState('.flip-box');

  // 2. React 상태 업데이트 (CSS 레이아웃 변경 유발: Grid -> Absolute Full)
  setExpandedId(expandedId === id ? -1 : id);

  // 3. React 리렌더링 직후, [L]ast 상태 캡처 및 [I]nvert -> [P]lay 수행
  setTimeout(() => {
    Flip.from(state, {
      duration: 0.6,
      ease: 'power3.inOut',
      absolute: true, // Grid에서 빠질 때 다른 요소들이 깜빡이지 않게 절대 좌표계로 전환 연산
      zIndex: 10,
    });
  }, 0);
});`;

  return (
    <SamplePageLayout
      title="18. FLIP 레이아웃 트랜지션 (Flip Plugin)"
      description="리스트 아이템(썸네일)을 클릭했을 때 전체화면(상세)으로 변하는 것처럼, CSS 레이아웃 구조가 완전히 바뀌는 상황에서 두 요소 사이를 끊김없이 부드럽게 이어주는 마법 같은 기법입니다."
      learningPoints={[
        'FLIP은 First(이전 상태 기록) -> Last(CSS 변경 후 상태 확인) -> Invert(이전 상태로 강제 위치 이동) -> Play(현재 상태로 애니메이션)의 약자입니다.',
        'React의 상태(State)를 변경하여 CSS 레이아웃을 바꾼 직후, Flip.from()을 호출하면 브라우저가 레이아웃 변경을 시각적으로 자연스러운 애니메이션으로 렌더링해 줍니다.',
        '애플(Apple) 앱스토어의 카드 클릭 후 상세 화면 진입 모션, 또는 쇼핑몰 썸네일 클릭 시 화면 확대 효과의 핵심 원리입니다.'
      ]}
      whyImportant="기존 방식대로 width, height, top, left 속성을 수동으로 애니메이션 하면 CSS Grid나 Flexbox 환경에서 레이아웃이 붕괴됩니다. FLIP은 이러한 복잡한 레이아웃 전이(Transition)를 가장 완벽하게 해결합니다."
    >
      <StyledCard>
        <p style={{ marginBottom: '20px' }}>박스를 클릭하여 썸네일/풀스크린 토글을 테스트해보세요.</p>
        
        <div ref={containerRef}>
          <GalleryContainer>
            {[1, 2, 3].map((id) => (
              <Box 
                key={id} 
                className="flip-box" 
                $isExpanded={expandedId === id}
                onClick={() => toggleExpand(id)}
                style={{ 
                  // 다른 박스가 확장되어 있을 때는 나머지는 숨김 처리
                  display: expandedId !== -1 && expandedId !== id ? 'none' : 'flex' 
                }}
              >
                Card {id}
              </Box>
            ))}
          </GalleryContainer>
        </div>

        <div style={{ marginTop: '30px' }}>
          <CodeViewer rawCode={codeString} language="tsx" filename="Gsap18_FlipTransition.tsx" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
