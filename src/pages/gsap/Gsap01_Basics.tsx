import React, { useRef } from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { StyledButton } from '../../components/styled/StyledButton';
import { CodeViewer } from '../../components/CodeViewer';
import { gsap } from '../../utils/gsapPlugins';
import { useGSAP } from '@gsap/react';

const BoxContainer = styled.div`
  display: flex;
  gap: 20px;
  margin: 30px 0;
  height: 150px;
  position: relative;
`;

const Box = styled.div<{ $color: string }>`
  width: 80px;
  height: 80px;
  background-color: ${({ $color }) => $color};
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

export const Gsap01_Basics: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const runToAnim = contextSafe(() => {
    // gsap.to(): 현재 상태에서 목표 상태로 애니메이션
    gsap.to('.box-to', {
      x: 200,
      rotation: 360,
      duration: 1,
      ease: 'power2.out',
    });
  });

  const runFromAnim = contextSafe(() => {
    // gsap.from(): 지정한 상태에서 현재(기존 CSS) 상태로 애니메이션
    gsap.from('.box-from', {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'bounce.out',
    });
  });

  const runFromToAnim = contextSafe(() => {
    // gsap.fromTo(): 시작 상태와 끝 상태를 명시적으로 모두 지정
    gsap.fromTo('.box-fromTo',
      { scale: 0, rotation: -180 }, // from
      { scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' } // to
    );
  });

  const runReset = contextSafe(() => {
    gsap.set('.box', { clearProps: 'all' });
  });

  const codeString = `import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

export const GsapBasics = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // useGSAP은 React 18 StrictMode에서도 애니메이션이 중복 실행되지 않도록 내부적으로 cleanup을 수행합니다.
  const { contextSafe } = useGSAP({ scope: containerRef });

  // 클릭 이벤트 등 이벤트 핸들러에서 gsap을 호출할 때는 contextSafe로 감싸야 메모리 릭이 방지됩니다.
  const handleToAnim = contextSafe(() => {
    gsap.to('.box', { x: 200, rotation: 360, duration: 1, ease: 'power2.out' });
  });

  const handleFromAnim = contextSafe(() => {
    gsap.from('.box', { y: -100, opacity: 0, duration: 1, ease: 'bounce.out' });
  });

  const handleFromToAnim = contextSafe(() => {
    gsap.fromTo('.box', 
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' }
    );
  });

  return (
    <div ref={containerRef}>
      <button onClick={handleToAnim}>To 애니메이션</button>
      <div className="box"></div>
    </div>
  );
};`;

  return (
    <SamplePageLayout
      title="1. GSAP 기본 사용법 (to, from, fromTo)"
      description="GSAP의 가장 핵심이 되는 메서드인 to(), from(), fromTo()의 차이점과 React에서 contextSafe를 활용하여 안전하게 애니메이션을 실행하는 방법을 학습합니다."
      learningPoints={[
        'gsap.to(): 엘리먼트를 현재 상태에서 지정한(목표) 상태로 움직일 때 사용합니다.',
        'gsap.from(): 엘리먼트를 지정한 상태에서 기존 CSS 상태로 움직일 때 사용합니다. (주로 등장 애니메이션에 활용)',
        'gsap.fromTo(): 시작점과 끝점을 모두 명시적으로 통제하고 싶을 때 사용합니다.',
        'React 이벤트 핸들러 내부에서 GSAP 애니메이션을 수동 실행할 때는 contextSafe로 감싸서 메모리 누수를 방지해야 합니다.'
      ]}
      whyImportant="바닐라 자바스크립트 환경에서는 gsap.to()만 바로 호출해도 되지만, React에서는 가상 DOM 렌더링 주기와 클린업(Cleanup) 처리가 필수입니다. @gsap/react의 contextSafe를 올바르게 사용하는 것이 모든 React-GSAP 애니메이션의 첫 걸음입니다."
    >
      <StyledCard>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <StyledButton onClick={runToAnim} variant="primary">Run to()</StyledButton>
          <StyledButton onClick={runFromAnim} variant="secondary">Run from()</StyledButton>
          <StyledButton onClick={runFromToAnim} variant="danger">Run fromTo()</StyledButton>
          <StyledButton onClick={runReset} variant="outline">Reset All</StyledButton>
        </div>

        <BoxContainer ref={containerRef}>
          <Box className="box box-to" $color="#316AFF">To</Box>
          <Box className="box box-from" $color="#05CD99">From</Box>
          <Box className="box box-fromTo" $color="#EE5D50">Fr To</Box>
        </BoxContainer>

        <CodeViewer rawCode={codeString} language="tsx" filename="Gsap01_Basics.tsx" />
      </StyledCard>
    </SamplePageLayout>
  );
};
