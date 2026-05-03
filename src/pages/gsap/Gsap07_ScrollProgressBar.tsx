import React, { useRef } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { CodeViewer } from '../../components/CodeViewer';
import { gsap } from '../../utils/gsapPlugins';
import { useGSAP } from '@gsap/react';

const DemoContainer = styled.div`
  position: relative;
  height: 500px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const ProgressBarWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.border};
  z-index: 10;
`;

const ProgressBar = styled.div`
  width: 0%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  transform-origin: left center;
`;

const ScrollContent = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 30px;
  
  /* 내부 스크롤바 얇게 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.textMuted};
    border-radius: 4px;
  }
`;

const ContentBlock = styled.div`
  height: 300px;
  margin-bottom: 20px;
  background: rgba(5, 205, 153, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.success};
  font-weight: bold;
`;

export const Gsap07_ScrollProgressBar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. 트리거 지점은 내부 스크롤 컨텐츠의 최상단부터 최하단까지 전체 영역으로 잡습니다.
    gsap.to('.progress-bar', {
      width: '100%',
      ease: 'none', // 선형적으로 스크롤을 반영하기 위해 이징(ease) 없음 처리
      scrollTrigger: {
        trigger: '.scroll-content',
        scroller: scrollerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5, // 0~1 사이의 값을 주면 스크롤 움직임에 약간의 부드러운 지연(스무딩) 효과가 들어갑니다.
      }
    });
  }, { scope: containerRef });

  const codeString = `useGSAP(() => {
  gsap.to('.progress-bar', {
    width: '100%',
    ease: 'none', // 스크롤 진행도와 1:1로 매칭되도록 가속도(이징)를 없앰
    scrollTrigger: {
      trigger: '.scroll-content', // 컨텐츠 전체를 감싸는 영역
      scroller: scrollerRef.current, // 부모 스크롤 박스 (창 전체일 경우 생략)
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5, // scrub 속성을 통해 애니메이션이 스크롤바에 종속됨 (0.5는 부드러운 지연 효과)
    }
  });
}, { scope: containerRef });`;

  return (
    <SamplePageLayout
      title="7. 스크롤 진행도 (Progress Bar)"
      description="페이지(또는 특정 영역)를 스크롤 하는 정도에 비례하여 애니메이션 상태가 앞뒤로 이동하도록 연결하는 Scrub 기능의 예제입니다."
      learningPoints={[
        'ScrollTrigger의 scrub: true 속성은 애니메이션이 스스로 동작하는 것이 아니라, 스크롤 막대에 묶여서 스크롤을 내리면 진행되고 올리면 되감기게 만듭니다.',
        'scrub: 0.5 처럼 숫자를 넣으면 스크롤을 멈췄을 때 애니메이션이 목표치를 따라잡는 데 0.5초가 걸려 훨씬 부드러운 효과(Smoothing)를 줍니다.',
        '프로그레스 바 처럼 일정한 속도로 늘어나야 하는 경우 ease: "none"으로 가속도를 지워야 진행도와 100% 매칭됩니다.'
      ]}
      whyImportant="블로그 글 읽기 프로그레스바, 제품 스펙 스크롤 시 게이지가 차오르는 UI 등에서 복잡한 window 스크롤 이벤트 리스너를 작성할 필요 없이 단 5줄로 완벽히 구현 가능합니다."
    >
      <StyledCard>
        <div ref={containerRef}>
          <DemoContainer>
            {/* 고정된 프로그레스 바 영역 */}
            <ProgressBarWrapper>
              <ProgressBar className="progress-bar" />
            </ProgressBarWrapper>

            {/* 실제 스크롤되는 내용 영역 */}
            <ScrollContent ref={scrollerRef}>
              <div className="scroll-content">
                <ContentBlock>Section 1</ContentBlock>
                <ContentBlock>Section 2</ContentBlock>
                <ContentBlock>Section 3</ContentBlock>
                <ContentBlock>Section 4</ContentBlock>
                <ContentBlock style={{ margin: 0 }}>Section 5 (End)</ContentBlock>
              </div>
            </ScrollContent>
          </DemoContainer>
        </div>

        <div style={{ marginTop: '30px' }}>
          <CodeViewer rawCode={codeString} language="tsx" filename="Gsap07_ScrollProgressBar.tsx" />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
