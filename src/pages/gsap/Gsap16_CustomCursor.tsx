import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { CodeViewer } from '../../components/CodeViewer';
import { gsap } from '../../utils/gsapPlugins';
import { useGSAP } from '@gsap/react';

// 시연용 컨테이너 (실제 환경에서는 body 전체에 걸어줌)
const InteractiveArea = styled.div`
  height: 400px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  
  /* 시스템 마우스를 숨김 */
  cursor: none;

  /* 호버 대상 자식들도 커서 숨김 상속 */
  * {
    cursor: none;
  }
`;

const CustomCursorDot = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 16px;
  height: 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  pointer-events: none; /* 중요: 커서가 마우스 이벤트를 가로채지 않도록 함 */
  z-index: 9999;
  transform: translate(-50%, -50%); /* 중심점 정렬 */
`;

const CustomCursorRing = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
`;

const HoverTarget = styled.div`
  padding: 30px 40px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const Gsap16_CustomCursor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  // 1. 마우스 이동에 따른 커서 좌표 업데이트
  const handleMouseMove = contextSafe((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // 브라우저 뷰포트 좌표 기준이 아닌 현재 컨테이너 상대 좌표 계산
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 점 커서는 마우스를 즉시 따라감 (duration: 0 혹은 매우 짧게)
    gsap.to(cursorDotRef.current, {
      x,
      y,
      duration: 0.1,
      ease: 'power2.out'
    });

    // 링 커서는 약간의 지연(delay/duration)을 두고 부드럽게 쫓아감
    gsap.to(cursorRingRef.current, {
      x,
      y,
      duration: 0.5,
      ease: 'power3.out'
    });
  });

  // 2. 특정 요소 Hover 시 커서 스케일 업 애니메이션
  const handleHoverEnter = contextSafe(() => {
    gsap.to(cursorDotRef.current, { scale: 0, duration: 0.2 }); // 점은 숨기고
    gsap.to(cursorRingRef.current, {
      scale: 2.5,
      backgroundColor: 'rgba(49, 106, 255, 0.1)',
      borderColor: 'rgba(49, 106, 255, 0.5)',
      duration: 0.3,
      ease: 'back.out(1.5)'
    });
  });

  const handleHoverLeave = contextSafe(() => {
    gsap.to(cursorDotRef.current, { scale: 1, duration: 0.2 }); // 점 원복
    gsap.to(cursorRingRef.current, {
      scale: 1,
      backgroundColor: 'transparent',
      borderColor: '#316AFF',
      duration: 0.3,
      ease: 'power2.out'
    });
  });

  // 영역 벗어날 때 커서 숨김
  const handleMouseLeave = contextSafe(() => {
    gsap.to([cursorDotRef.current, cursorRingRef.current], { opacity: 0, duration: 0.3 });
  });

  const handleMouseEnterArea = contextSafe(() => {
    gsap.to([cursorDotRef.current, cursorRingRef.current], { opacity: 1, duration: 0.3 });
  });

  const codeString = `// 점(Dot)과 링(Ring) 두 개의 커서 요소를 분리하여 제작
const handleMouseMove = contextSafe((e) => {
  const x = e.clientX;
  const y = e.clientY;

  // Dot은 즉각적으로 마우스를 추적
  gsap.to(cursorDotRef.current, { x, y, duration: 0.1, ease: 'power2.out' });
  
  // Ring은 duration을 길게 주어 마우스를 지연되면서 따라가게 함 (Fluid 느낌)
  gsap.to(cursorRingRef.current, { x, y, duration: 0.5, ease: 'power3.out' });
});

// 버튼이나 특정 요소에 마우스가 올라갔을 때 링을 크게 팽창시킴
const handleHoverEnter = contextSafe(() => {
  gsap.to(cursorDotRef.current, { scale: 0, duration: 0.2 });
  gsap.to(cursorRingRef.current, {
    scale: 2.5,
    backgroundColor: 'rgba(49, 106, 255, 0.1)',
    duration: 0.3,
    ease: 'back.out(1.5)'
  });
});`;

  return (
    <SamplePageLayout
      title="16. 커스텀 마우스 커서 (Custom Cursor)"
      description="브라우저의 기본 마우스 포인터를 숨기고, 커서가 부드러운 물리 궤적을 그리며 쫓아오거나 Hover 시 모양이 변하는 모던 포트폴리오 트렌드입니다."
      learningPoints={[
        '기본 CSS cursor: none 속성을 사용하여 운영체제의 기본 마우스 포인터를 숨깁니다.',
        '커서 요소(div)에 반드시 pointer-events: none 속성을 주어야 합니다. 그렇지 않으면 커서 div가 클릭/호버 이벤트를 가로채서 하위 요소들이 이벤트를 받지 못합니다.',
        '내부 점(Dot)과 외부 링(Ring)의 GSAP 애니메이션 속도(duration)를 다르게 주면, 링이 고무줄처럼 부드럽게 지연되어 쫓아오는 유려한 연출이 가능합니다.'
      ]}
      whyImportant="Awwwards에 올라오는 수많은 크리에이티브 웹사이트의 90% 이상이 커스텀 커서를 채택합니다. 브랜드의 톤앤매너를 마우스 끝단에서부터 전달할 수 있습니다."
    >
      <StyledCard>
        <p style={{ marginBottom: '20px', color: 'red', fontWeight: 'bold' }}>
          * 아래 점선 박스 안으로 마우스를 올려보세요!
        </p>
        
        <div ref={containerRef}>
          <InteractiveArea 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnterArea}
          >
            {/* GSAP으로 움직일 커스텀 커서 DOM */}
            <CustomCursorDot ref={cursorDotRef} style={{ opacity: 0 }} />
            <CustomCursorRing ref={cursorRingRef} style={{ opacity: 0 }} />

            {/* Hover 인터랙션을 줄 타겟 엘리먼트들 */}
            <HoverTarget 
              className="hover-target"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              Hover Me!
            </HoverTarget>
            <HoverTarget 
              className="hover-target"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              Hover Me Too!
            </HoverTarget>
          </InteractiveArea>
        </div>

        <div style={{ marginTop: '30px' }}>
          <CodeViewer rawCode={codeString} language="tsx" filename="Gsap16_CustomCursor.tsx" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
