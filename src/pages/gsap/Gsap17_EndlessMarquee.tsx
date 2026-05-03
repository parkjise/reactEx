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
  position: relative;
`;

const Spacer = styled.div`
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const MarqueeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  overflow: hidden;
  /* 가로로 나란히 배치되도록 white-space nowrap 설정 */
  white-space: nowrap;
`;

const MarqueeTextWrapper = styled.div`
  display: flex;
  position: absolute;
`;

const MarqueeText = styled.div`
  font-size: 5rem;
  font-weight: 900;
  text-transform: uppercase;
  color: white;
  padding-right: 50px; /* 텍스트 간격 */
`;

export const Gsap17_EndlessMarquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 텍스트를 담은 두 개의 Wrapper가 이어져서 굴러가게 됩니다.
    // 1. 무한 루프 롤링 애니메이션 (xPercent를 0에서 -50%로 이동. 텍스트가 2번 반복되었으므로 -50%가 되면 초기 상태와 동일)
    const marqueeTween = gsap.to('.marquee-wrapper', {
      xPercent: -50,
      repeat: -1,         // 무한 반복
      duration: 10,       // 10초에 걸쳐서 한 사이클
      ease: 'linear',     // 가속도 없이 일정하게 굴러가야 함
    }).totalProgress(0.5); // 처음 시작부터 자연스럽게 하기 위해 중간(0.5)부터 시작

    // 2. 스크롤 방향을 감지하여 역방향 롤링 처리
    let direction = 1;

    gsap.to('.marquee-container', {
      scrollTrigger: {
        trigger: '.marquee-container',
        scroller: scrollerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          // self.direction: 스크롤 내리면 1, 올리면 -1
          if (self.direction !== direction) {
            direction = self.direction;
            // timeScale에 음수를 주면 애니메이션이 역재생(반대로 굴러감) 됩니다!
            gsap.to(marqueeTween, { timeScale: direction, overwrite: true });
          }
        }
      }
    });

  }, { scope: containerRef });

  const codeString = `useGSAP(() => {
  // 1. 선형(linear)으로 계속 흘러가는 무한 반복 애니메이션 생성
  // xPercent -50은 두 세트의 텍스트 중 첫 세트가 지나가면 다시 초기화되는 매직넘버입니다.
  const marqueeTween = gsap.to('.marquee-wrapper', {
    xPercent: -50,
    repeat: -1,      // 무한 반복
    duration: 10,
    ease: 'linear',  // 감속 없이 일정하게
  }).totalProgress(0.5);

  let direction = 1; // 스크롤 방향 (1: 정방향, -1: 역방향)

  // 2. ScrollTrigger의 onUpdate 이벤트를 잡아 스크롤 방향에 따라 롤링 방향 변경
  gsap.to('.marquee-container', {
    scrollTrigger: {
      trigger: '.marquee-container',
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        // 스크롤 방향이 바뀌었을 때만
        if (self.direction !== direction) {
          direction = self.direction;
          // 기존 굴러가던 트윈의 timeScale 값을 1(정상) 또는 -1(역재생)로 전환
          gsap.to(marqueeTween, { timeScale: direction, overwrite: true });
        }
      }
    }
  });
});`;

  return (
    <SamplePageLayout
      title="17. 무한 롤링 티커 (Endless Marquee)"
      description="텍스트가 옆으로 끊임없이 흘러가는 효과(티커)이며, 사용자가 스크롤을 내리거나 올릴 때 그 스크롤 방향에 반응하여 글자가 흐르는 방향이 즉각적으로 바뀌는 고급 인터랙션입니다."
      learningPoints={[
        '무한 롤링을 만들 때는 똑같은 텍스트 그룹을 2개 연달아 붙이고 부모를 전체 너비의 절반(xPercent: -50)만큼 선형(linear)으로 이동시킨 뒤 무한 반복(repeat: -1) 시킵니다.',
        'ScrollTrigger의 onUpdate 콜백에서 self.direction 값을 통해 마우스 휠을 내렸는지 올렸는지 정확히 알 수 있습니다.',
        '애니메이션 인스턴스(marqueeTween)의 timeScale 속성에 양수(1)를 주면 정방향, 음수(-1)를 주면 역방향 재생이 되는 GSAP의 초강력 기능 중 하나입니다.'
      ]}
      whyImportant="크리에이티브 에이전시, 쇼핑몰, 이벤트 프로모션 페이지 등에서 멈춰있는 텍스트 대신 동적인 느낌을 주고자 할 때, 단순 CSS 애니메이션보다 스크롤 연동형 GSAP 티커가 압도적인 몰입감을 제공합니다."
    >
      <StyledCard>
        <p style={{ color: 'red', fontWeight: 'bold', marginBottom: '10px' }}>
          * 아래 박스를 스크롤 위/아래로 움직여보세요. 텍스트 흐르는 방향이 바뀝니다!
        </p>
        <div ref={containerRef}>
          <WindowScroller ref={scrollerRef}>
            <Spacer>아래로 스크롤 하세요 ↓</Spacer>

            <MarqueeContainer className="marquee-container">
              {/* xPercent: -50 을 달성하기 위해 자식들을 가로로 묶습니다 */}
              <MarqueeTextWrapper className="marquee-wrapper">
                {/* 첫 번째 세트 */}
                <MarqueeText>Creative GSAP Animation ✦ Advanced Marquee ✦</MarqueeText>
                {/* 두 번째 세트 (연결부가 매끄럽게 이어지도록 동일한 내용 반복) */}
                <MarqueeText>Creative GSAP Animation ✦ Advanced Marquee ✦</MarqueeText>
              </MarqueeTextWrapper>
            </MarqueeContainer>

            <Spacer>위로 스크롤 하세요 ↑</Spacer>
          </WindowScroller>
        </div>

        <div style={{ marginTop: '30px' }}>
          <CodeViewer rawCode={codeString} language="tsx" filename="Gsap17_EndlessMarquee.tsx" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
