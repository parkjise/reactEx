import React, { useRef } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { StyledButton } from '../../components/styled/StyledButton';
import { CodeViewer } from '../../components/CodeViewer';
import { gsap } from '../../utils/gsapPlugins';
import { useGSAP } from '@gsap/react';

const HeroSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  margin-bottom: 30px;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 15px;
  /* 애니메이션을 위해 초기 상태 숨김 처리는 GSAP from()이 해주지만 시각적 깜빡임 방지를 위해 visibility hidden 등을 쓰기도 함 */
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 30px;
`;

const FeatureGrid = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const FeatureCard = styled.div`
  background: rgba(49, 106, 255, 0.1);
  border: 1px solid rgba(49, 106, 255, 0.2);
  padding: 20px;
  border-radius: 8px;
  width: 150px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Gsap03_Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const playTimeline = contextSafe(() => {
    // 1. 타임라인 인스턴스 생성
    const tl = gsap.timeline();

    // 2. 요소들이 순차적으로 실행되도록 체이닝
    tl.from('.hero-title', {
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.5)'
    })
    .from('.hero-subtitle', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.3') // 이전 애니메이션 종료 0.3초 전에 미리 시작 (오버랩)
    .from('.hero-btn', {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      ease: 'back.out(2)'
    }, '-=0.2')
    .from('.feature-card', {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.15, // 여러 카드를 0.15초 간격으로 순차 등장 (스태거)
      ease: 'power3.out'
    }, '-=0.1');
  });

  const codeString = `const playTimeline = contextSafe(() => {
  // 타임라인 생성: 연결된 애니메이션들의 순서와 타이밍을 완벽하게 제어
  const tl = gsap.timeline();

  tl.from('.hero-title', {
    y: 50, opacity: 0, duration: 0.6, ease: 'back.out(1.5)'
  })
  .from('.hero-subtitle', {
    y: 20, opacity: 0, duration: 0.5, ease: 'power2.out'
  }, '-=0.3') // 포지션 파라미터: 앞 애니메이션 종료 0.3초 전에 시작 (부드러운 이어짐)
  .from('.hero-btn', {
    scale: 0.8, opacity: 0, duration: 0.4, ease: 'back.out(2)'
  }, '-=0.2')
  .from('.feature-card', {
    y: 30, opacity: 0, duration: 0.5,
    stagger: 0.15, // 클래스가 동일한 여러 요소를 시차를 두고 등장시킴
    ease: 'power3.out'
  }, '-=0.1');
});`;

  return (
    <SamplePageLayout
      title="3. Timeline 실무 예제 (순차 애니메이션)"
      description="gsap.timeline()을 사용하여 여러 요소가 시간차를 두고 순서대로 등장하거나 퇴장하는 복합적인 애니메이션 시퀀스를 구성합니다."
      learningPoints={[
        'gsap.timeline()을 사용하면 여러 개의 애니메이션을 체이닝(Chaining)하여 순서를 부여할 수 있습니다. (딜레이 계산 지옥 탈출)',
        'Position Parameter (`-=0.3` 등)를 사용하여 이전 애니메이션이 끝나기 전에 미리 시작하거나 뒤로 미룰 수 있어 자연스러운 오버랩을 연출할 수 있습니다.',
        'stagger 옵션은 배열이나 동일한 클래스를 가진 여러 요소를 반복문 없이 간편하게 차례대로 애니메이션화 할 때 핵심적으로 쓰입니다.'
      ]}
      whyImportant="랜딩 페이지의 첫 메인(Hero) 영역이나, 데이터가 로드된 후 카드 리스트가 좌르륵 등장하는 연출은 실무에서 가장 많이 요구되는 패턴입니다. 타임라인 없이 setTimeout이나 delay로 구현하면 유지보수 시 타이밍 수정이 끔찍하게 어려워집니다."
    >
      <StyledCard>
        <div style={{ marginBottom: '20px' }}>
          <StyledButton onClick={playTimeline} variant="primary">
            애니메이션 재생 (Play Timeline)
          </StyledButton>
        </div>

        <div ref={containerRef}>
          <HeroSection>
            <Title className="hero-title">Welcome to GSAP React</Title>
            <Subtitle className="hero-subtitle">Make your UI alive with just a few lines of code.</Subtitle>
            
            <div style={{ marginBottom: '40px' }}>
              <StyledButton className="hero-btn" variant="primary">Get Started</StyledButton>
            </div>

            <FeatureGrid>
              <FeatureCard className="feature-card">Fast</FeatureCard>
              <FeatureCard className="feature-card">Reliable</FeatureCard>
              <FeatureCard className="feature-card">Beautiful</FeatureCard>
              <FeatureCard className="feature-card">Scalable</FeatureCard>
            </FeatureGrid>
          </HeroSection>
        </div>

        <CodeViewer rawCode={codeString} language="tsx" filename="Gsap03_Timeline.tsx" />
      </StyledCard>
    </SamplePageLayout>
  );
};
