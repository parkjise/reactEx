import React, { useRef } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { CodeViewer } from '../../components/CodeViewer';
import { gsap } from '../../utils/gsapPlugins';
import { useGSAP } from '@gsap/react';

const ParallaxWindow = styled.div`
  height: 600px;
  overflow-y: auto;
  border-radius: 16px;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: #0b0c10;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
`;

const ScrollSpacer = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.4);
`;

const ParallaxContainer = styled.div`
  position: relative;
  height: 500px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Layer = styled.div<{ $bgImage?: string; $zIndex: number }>`
  position: absolute;
  top: -20%; /* 패럴랙스 이동 반경을 위해 여유 공간 확보 */
  left: -10%;
  width: 120%;
  height: 140%;
  z-index: ${({ $zIndex }) => $zIndex};
  
  ${({ $bgImage }) => $bgImage && `
    background-image: url(${$bgImage});
    background-size: cover;
    background-position: center;
  `}
`;

const LayerText = styled.h2`
  position: relative;
  z-index: 5;
  font-size: 5rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 10px 30px rgba(0,0,0,0.5);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

export const Gsap13_AdvancedParallax: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 배경(원경)은 스크롤 속도보다 아주 조금 늦게 움직이도록 설정
    gsap.to('.parallax-bg', {
      yPercent: 20, // 스크롤 내리는 동안 아래로 20% 이동
      ease: 'none',
      scrollTrigger: {
        trigger: '.parallax-container',
        scroller: scrollerRef.current,
        start: 'top bottom', // 컨테이너가 화면 밑에서 보이기 시작할 때
        end: 'bottom top',   // 화면 위로 사라질 때까지
        scrub: true,
      }
    });

    // 전경(근경)은 스크롤보다 빨리 위로 치고 올라가게 설정
    gsap.to('.parallax-fg', {
      yPercent: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: '.parallax-container',
        scroller: scrollerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    // 텍스트는 중간 속도로 이동시키며 scale 변화 추가
    gsap.to('.parallax-text', {
      yPercent: -15,
      scale: 1.1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.parallax-container',
        scroller: scrollerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
  }, { scope: containerRef });

  const codeString = `useGSAP(() => {
  // 1. 배경 (가장 멀리 있는 요소) - 느리게 이동
  gsap.to('.parallax-bg', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.parallax-container',
      scrub: true, // 스크롤에 동기화
    }
  });

  // 2. 텍스트 (중간 요소) - 약간 빠르게 이동하며 스케일 업
  gsap.to('.parallax-text', {
    yPercent: -15,
    scale: 1.1,
    ease: 'none',
    scrollTrigger: {
      trigger: '.parallax-container',
      scrub: true,
    }
  });

  // 3. 전경 (가장 가까운 요소) - 매우 빠르게 위로 치고 올라감
  gsap.to('.parallax-fg', {
    yPercent: -40,
    ease: 'none',
    scrollTrigger: {
      trigger: '.parallax-container',
      scrub: true,
    }
  });
});`;

  return (
    <SamplePageLayout
      title="13. 다중 레이어 패럴랙스 (Advanced Parallax)"
      description="배경(원경), 텍스트(중경), 사물(전경)의 Y축 이동 속도(yPercent)를 각각 다르게 주어 모니터 안에서 3D 입체감(Depth)을 느끼게 하는 고급 패럴랙스 기법입니다."
      learningPoints={[
        '요소가 사용자에게 가까울수록(전경) 스크롤 시 더 빠르게 위로 이동(음수 yPercent)하도록 설정합니다.',
        '요소가 사용자로부터 멀수록(배경) 스크롤 시 상대적으로 느리게 이동(양수 yPercent 또는 아주 작은 음수)하도록 설정하여 공간감을 만듭니다.',
        '패럴랙스 레이어들은 이동 반경을 고려하여 부모 컨테이너 밖으로 잘리지 않도록 width/height를 120%~140% 정도로 여유 있게 설정하고 top/left를 음수로 당겨놓는 것이 핵심 팁입니다.'
      ]}
      whyImportant="시각적 압도감을 주어야 하는 게임 랜딩 페이지, 영화 홍보 사이트, 고급형 제품 소개 페이지의 메인 섹션에서 필수적으로 요구되는 기법입니다."
    >
      <StyledCard>
        <div ref={containerRef}>
          <ParallaxWindow ref={scrollerRef}>
            <ScrollSpacer>아래로 스크롤하여 패럴랙스 효과를 확인하세요 ↓</ScrollSpacer>

            <ParallaxContainer className="parallax-container">
              {/* 원경 (배경 이미지) */}
              <Layer 
                className="parallax-bg" 
                $zIndex={1} 
                $bgImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" 
              />
              
              {/* 중경 (텍스트) */}
              <LayerText className="parallax-text">
                DEEP SPACE
              </LayerText>
              
              {/* 근경 (앞을 가리는 요소 - 별도 투명 PNG가 없으므로 CSS 그라디언트로 전경 느낌 연출) */}
              <Layer 
                className="parallax-fg" 
                $zIndex={10} 
                style={{ 
                  background: 'linear-gradient(to top, rgba(11,12,16,1) 0%, rgba(11,12,16,0) 100%)',
                  top: '50%',
                  height: '100%'
                }}
              />
            </ParallaxContainer>

            <ScrollSpacer>↑ 위로 스크롤하면 역방향으로 동작합니다.</ScrollSpacer>
          </ParallaxWindow>
        </div>

        <div style={{ marginTop: '30px' }}>
          <CodeViewer rawCode={codeString} language="tsx" filename="Gsap13_AdvancedParallax.tsx" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
