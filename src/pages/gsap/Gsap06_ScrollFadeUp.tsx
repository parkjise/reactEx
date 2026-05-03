import React, { useRef } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { CodeViewer } from '../../components/CodeViewer';
import { gsap } from '../../utils/gsapPlugins';
import { useGSAP } from '@gsap/react';

const ScrollContainer = styled.div`
  height: 600px;
  overflow-y: auto;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.surface};
  
  /* 내부 스크롤바 꾸미기 */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
  }
`;

const Spacer = styled.div`
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: gray;
  font-size: 1.2rem;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  margin-bottom: 50px;
  border-radius: 8px;
`;

const FadeBox = styled.div`
  background: rgba(49, 106, 255, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 50px;
  opacity: 0; /* 초기 상태를 CSS에서도 숨겨두면 깜빡임을 방지할 수 있습니다 */
`;

export const Gsap06_ScrollFadeUp: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 내부 스크롤 영역을 감지해야 하므로 scroller 옵션 지정 필수
  const scrollerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // '.fade-box' 클래스를 가진 요소들을 배열로 찾아 각각 ScrollTrigger를 매핑합니다.
    const boxes = gsap.utils.toArray('.fade-box');

    boxes.forEach((box: any) => {
      gsap.to(box, {
        scrollTrigger: {
          trigger: box, // 애니메이션이 시작될 트리거 요소
          scroller: scrollerRef.current, // 스크롤이 발생하는 부모 컨테이너 (브라우저 창 전체 스크롤 시 생략 가능)
          start: 'top 80%', // 트리거의 상단(top)이 스크롤러의 80% 지점에 닿을 때 실행
          end: 'top 20%', // 트리거의 상단이 스크롤러의 20% 지점에 닿으면 애니메이션 종료 지점
          toggleActions: 'play none none reverse', // 진입 시 play, 뒤로 갈 때 reverse
          markers: true // 개발자 도구 마커 표시 (실무에서는 false)
        },
        y: -50,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      });
    });
  }, { scope: containerRef });

  const codeString = `useGSAP(() => {
  // 문서 내의 모든 .fade-box 요소들을 찾아 배열로 반환
  const boxes = gsap.utils.toArray('.fade-box');

  boxes.forEach((box: any) => {
    gsap.to(box, {
      scrollTrigger: {
        trigger: box,
        scroller: scrollerRef.current, // (중요) 스크롤바가 생기는 영역이 html,body가 아닌 div일 경우 반드시 명시!
        start: 'top 80%', // 박스의 top이 컨테이너 높이의 80% 지점에 닿을 때 실행
        toggleActions: 'play none none reverse', // 위/아래 방향 스크롤에 따른 상태 정의
        markers: true, // 디버깅용 선 표시 (배포 시 삭제)
      },
      y: -50,
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    });
  });
}, { scope: containerRef });`;

  return (
    <SamplePageLayout
      title="6. ScrollTrigger 기본 (Fade-up 등장)"
      description="사용자가 스크롤을 내려 특정 요소가 화면 뷰포트 내에 들어올 때 애니메이션을 시작하게 만드는 ScrollTrigger의 가장 기초적이고 많이 쓰이는 Fade-up 예제입니다."
      learningPoints={[
        'scrollTrigger 속성을 애니메이션 설정 객체 안에 넣으면 즉시 실행되지 않고, 스크롤 위치 조건에 맞을 때 트리거됩니다.',
        'start: "top 80%" 설정은 매우 직관적입니다. "트리거 요소의 가장 윗부분(top)"이 "스크롤러 뷰포트 높이의 80% 지점"에 도달했을 때 실행하라는 의미입니다.',
        'toggleActions 속성을 "play none none reverse"로 지정하면, 스크롤을 다시 올려서 요소가 화면 아래로 벗어났을 때 원래(숨겨진) 상태로 리셋(역재생)됩니다.',
        '스크롤 기준 영역이 window 브라우저 창 전체가 아니라 특정 컨테이너(div) 안쪽 스크롤인 경우, scroller 옵션에 해당 DOM 참조를 반드시 넣어줘야 합니다.'
      ]}
      whyImportant="마케팅 랜딩 페이지, 회사 소개 페이지, 포트폴리오 사이트에서 텍스트와 이미지가 스르륵 올라오는 Fade-up/Reveal 애니메이션은 99% ScrollTrigger 플러그인으로 구현됩니다."
    >
      <StyledCard>
        <p style={{ marginBottom: '20px' }}>아래 박스를 스크롤 해보세요. (우측에 생성된 붉은색/초록색 마커 선을 통해 스크롤 교차 시점을 확인할 수 있습니다.)</p>

        <div ref={containerRef}>
          <ScrollContainer ref={scrollerRef}>
            <Spacer>스크롤을 아래로 내려보세요 ↓</Spacer>
            
            <FadeBox className="fade-box" style={{ transform: 'translateY(50px)' }}>
              1번째 Fade-up 섹션 등장!
            </FadeBox>
            
            <Spacer>더 내려보세요 ↓</Spacer>

            <FadeBox className="fade-box" style={{ transform: 'translateY(50px)' }}>
              2번째 Fade-up 섹션 등장!
            </FadeBox>

            <Spacer>더 내려보세요 ↓</Spacer>

            <FadeBox className="fade-box" style={{ transform: 'translateY(50px)' }}>
              3번째 Fade-up 섹션 등장!
            </FadeBox>
          </ScrollContainer>
        </div>

        <div style={{ marginTop: '30px' }}>
          <CodeViewer rawCode={codeString} language="tsx" filename="ScrollFadeUp.tsx" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
