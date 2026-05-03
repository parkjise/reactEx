import React, { useRef } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { CodeViewer } from '../../components/CodeViewer';
import { gsap } from '../../utils/gsapPlugins';
import { useGSAP } from '@gsap/react';

const WindowScroller = styled.div`
  /* 스크롤트리거를 걸기 위한 임시 윈도우 스크롤 영역을 만들기 위함 
     실무에서는 window 스크롤 기반으로 동작합니다. 여기서는 제한된 영역을 씁니다. */
  height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const SectionBefore = styled.div`
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const HorizontalContainer = styled.div`
  /* 가로 스크롤 섹션이 고정(Pin)될 화면. 화면 뷰포트 높이 100% (vh)로 설정 */
  height: 600px; /* 데모를 위해 고정, 실제론 100vh */
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const HorizontalPanelWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 300%; /* 패널 3개이므로 너비를 컨테이너의 3배로 늘림 */
  flex-wrap: nowrap;
`;

const Panel = styled.div<{ $bg: string }>`
  width: 100%; /* 부모(300%)의 1/3, 즉 화면 1개 너비 */
  height: 100%;
  background-color: ${({ $bg }) => $bg};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 3rem;
  font-weight: 800;
`;

export const Gsap08_ScrollHorizontal: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. 패널 래퍼(300% 너비)를 잡아서 x축으로 -66.66% 이동시키는 애니메이션 생성
    // 2. 이 애니메이션을 스크롤 진행도(scrub)에 연동시키고, 스크롤 중에는 섹션을 고정(pin) 시킴.
    
    // 이동 거리 계산: (총 래퍼 너비) - (보여주는 화면 1개 너비)
    // 쉽게 구현하려면 xPercent를 사용: 패널이 3개면 -(3-1)*100% = -200% 만큼 X축 이동
    
    gsap.to(panelWrapperRef.current, {
      xPercent: -200, 
      ease: 'none',
      scrollTrigger: {
        trigger: triggerRef.current,
        scroller: scrollerRef.current, // 데모용 로컬 스크롤. 실무에선 지우세요 (window)
        pin: true,       // 스크롤이 트리거 영역에 도달하면 화면을 고정시킴
        scrub: 1,        // 스크롤과 애니메이션을 동기화
        start: 'top top',
        // 스크롤을 더 많이 해야 전체가 다 넘어가도록 가짜 공간(end)을 만듬.
        // +=2000 처럼 주면 2000px 스크롤 내리는 동안 패널들이 넘어감.
        end: '+=1500', 
      }
    });

  }, { scope: scrollerRef });

  const codeString = `const HorizontalContainer = styled.div\`
  height: 100vh;
  width: 100%;
  overflow: hidden;
\`;
const HorizontalPanelWrapper = styled.div\`
  display: flex;
  width: 300%; // 패널 3개
\`;

useGSAP(() => {
  gsap.to(panelWrapperRef.current, {
    xPercent: -200, // (패널개수 - 1) * -100
    ease: 'none',
    scrollTrigger: {
      trigger: triggerRef.current,
      pin: true,    // 스크롤 시 해당 컨테이너를 화면에 고정(position: fixed 됨)
      scrub: 1,     // 마우스 휠 스크롤 속도에 맞춰 xPosition 이동
      start: 'top top',
      end: '+=2000' // 2000px 스크롤 내리는 동안 가로 스크롤 동작 수행
    }
  });
});`;

  return (
    <SamplePageLayout
      title="8. ScrollTrigger 응용 (가로 스크롤 기법)"
      description="세로로 스크롤을 내리지만 특정 섹션에 도달하면 화면이 고정(Pin)되고 컨텐츠가 가로로 슬라이드 되는 최신 웹 트렌드(가짜 가로 스크롤) 패턴입니다."
      learningPoints={[
        'pin: true 속성은 trigger 요소가 화면 특정 지점(start)에 도달했을 때, CSS position: fixed 된 것처럼 화면에 고정시킵니다.',
        '세로 스크롤 이벤트를 가로 이동(xPercent) 애니메이션과 scrub으로 연결하여 세로 스크롤 시 마치 가로로 스크롤 되는 듯한 착시를 만듭니다.',
        '이 때 스크롤 할 가짜 높이 공간을 벌려줘야 하는데, end: "+=1500" 처럼 상대값을 지정하여 스크롤 트랙의 길이를 확보합니다.'
      ]}
      whyImportant="최신 IT 기업 채용 사이트나 애플(Apple)의 제품 소개 페이지에서 볼 수 있는 마우스 휠 기반의 풀스크린 가로 스와이프 효과를 이 기술로 완벽하게 구현할 수 있습니다."
    >
      <StyledCard>
        <p style={{ color: 'red', fontWeight: 'bold', marginBottom: '10px' }}>
          * 박스 내부 스크롤을 아래로 쭈욱 내려보세요.
        </p>

        {/* 데모용 로컬 스크롤 영역 */}
        <WindowScroller ref={scrollerRef}>
          <SectionBefore>
            일반적인 세로 스크롤 영역 (더 아래로 내리세요)
          </SectionBefore>

          {/* 가로 스크롤 트리거 영역 */}
          <HorizontalContainer ref={triggerRef}>
            <HorizontalPanelWrapper ref={panelWrapperRef}>
              <Panel $bg="#316AFF">Slide 1</Panel>
              <Panel $bg="#05CD99">Slide 2</Panel>
              <Panel $bg="#EE5D50">Slide 3</Panel>
            </HorizontalPanelWrapper>
          </HorizontalContainer>

          <SectionBefore>
            가로 스크롤이 끝나면 다시 세로 스크롤이 이어집니다.
          </SectionBefore>
        </WindowScroller>

        <div style={{ marginTop: '30px' }}>
          <CodeViewer rawCode={codeString} language="tsx" filename="HorizontalScroll.tsx" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
