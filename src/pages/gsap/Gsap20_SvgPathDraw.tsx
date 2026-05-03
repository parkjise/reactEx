import React, { useRef } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { CodeViewer } from '../../components/CodeViewer';
import { gsap } from '../../utils/gsapPlugins';
import { useGSAP } from '@gsap/react';

const WindowScroller = styled.div`
  height: 600px;
  overflow-y: auto;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Spacer = styled.div`
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: gray;
`;

const SvgContainer = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  
  svg {
    width: 300px;
    height: 300px;
    overflow: visible;
  }
`;

export const Gsap20_SvgPathDraw: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. 그려질 SVG 선 요소 가져오기
    const path = document.querySelector('.draw-path') as SVGPathElement;
    
    // 2. SVG 선의 총 길이 구하기 (핵심 메서드)
    const length = path.getTotalLength();

    // 3. 초기 상태: 선을 길게 늘리고, 그 여백(offset)을 선 길이만큼 주어 화면에서 숨김
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    // 4. 스크롤 연동: offset을 0으로 만들어 선이 점차 나타나도록(그려지도록) 함
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.svg-section',
        scroller: scrollerRef.current,
        start: 'top 70%',   // 화면 70% 지점에 도달하면 그리기 시작
        end: 'top 20%',     // 화면 20% 지점에 닿으면 그리기 완료
        scrub: 1,           // 마우스 스크롤 휠에 맞춰 애니메이션 동기화 (1초 지연으로 부드럽게)
      }
    });

  }, { scope: containerRef });

  const codeString = `useGSAP(() => {
  // 1. Path 요소 취득
  const path = document.querySelector('.draw-path') as SVGPathElement;
  
  // 2. 자바스크립트의 기본 SVG API로 패스 총 길이 측정
  const length = path.getTotalLength();

  // 3. 선의 길이와 공백 길이를 모두 총 길이로 셋팅한 후, 공백을 밀어서(offset) 안보이게 초기화
  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length, 
  });

  // 4. 스크롤을 내릴 때 offset을 0으로 만들어 마치 펜으로 그리는 듯한 효과 창출
  gsap.to(path, {
    strokeDashoffset: 0,
    ease: 'none', // 일정한 속도로 그려짐
    scrollTrigger: {
      trigger: '.svg-section',
      start: 'top 70%',
      end: 'top 20%',
      scrub: 1, // 스크롤 진행도와 동기화 (값이 있을 경우 부드러운 딜레이 적용)
    }
  });
});`;

  return (
    <SamplePageLayout
      title="20. 스크롤 연동 SVG 선 그리기 (DrawSVG 패턴)"
      description="복잡한 유료 DrawSVGPlugin 없이, 순수 SVG의 strokeDasharray와 strokeDashoffset 속성을 제어하여 스크롤 휠에 맞춰 선이 스스로 그려지는 효과입니다."
      learningPoints={[
        '바닐라 JS의 SVGPathElement.getTotalLength() 메서드를 사용하여 패스 선의 정확한 픽셀 길이를 알아냅니다.',
        'CSS의 stroke-dasharray(점선 길이)를 전체 길이로 맞추고, stroke-dashoffset(시작점 밀기)을 동일하게 주면 선이 완전히 사라진 상태가 됩니다.',
        'ScrollTrigger의 scrub에 연동시켜 offset을 0으로 줄이면, 펜으로 캘리그라피를 쓰거나 통계 차트 선이 그려지는 고급 모션을 만들 수 있습니다.'
      ]}
      whyImportant="핀테크 앱의 랜딩페이지에서 수익률 그래프가 스크롤에 맞춰 그려지거나, 스타트업 홈페이지에서 브랜드 로고가 브랜딩 스토리에 맞춰 그려지는 필수 연출 기법입니다."
    >
      <StyledCard>
        <div ref={containerRef}>
          <WindowScroller ref={scrollerRef}>
            <Spacer>아래로 스크롤하여 차트가 그려지는 모습을 확인하세요 ↓</Spacer>
            
            <SvgContainer className="svg-section">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* 배경 가이드 선 (연한 회색) */}
                <path 
                  d="M10,90 Q30,10 50,50 T90,10" 
                  stroke="rgba(49, 106, 255, 0.2)" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                />
                
                {/* 실제로 그려지는 파란색 선 */}
                <path 
                  className="draw-path"
                  d="M10,90 Q30,10 50,50 T90,10" 
                  stroke="#316AFF" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                />

                {/* 차트 데코레이션 닷 */}
                <circle cx="10" cy="90" r="4" fill="#316AFF" />
                <circle cx="90" cy="10" r="4" fill="#EE5D50" />
              </svg>
            </SvgContainer>

            <Spacer>위로 올리면 선이 지워집니다 ↑</Spacer>
          </WindowScroller>
        </div>

        <div style={{ marginTop: '30px' }}>
          <CodeViewer rawCode={codeString} language="tsx" filename="Gsap20_SvgPathDraw.tsx" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
