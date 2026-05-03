import React, { useRef, useState } from 'react';
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
  border: 2px dashed ${({ theme }) => theme.colors.border};
  padding: 20px;
  border-radius: 8px;
`;

const Box = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
`;

export const Gsap02_UseGsapHook: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [toggle, setToggle] = useState(false);

  // useGSAP은 useEffect를 대체하며, 내부적으로 cleanup(kill) 처리를 자동으로 수행합니다.
  useGSAP(() => {
    // 1. scope 옵션 덕분에 '.box' 선택자가 containerRef 내부의 엘리먼트만 선택합니다. (안전함)
    // 2. 의존성 배열에 toggle 값을 넣어, 값이 바뀔 때마다 애니메이션을 재실행합니다.
    gsap.from('.box', {
      rotation: 180,
      scale: 0.5,
      y: -50,
      opacity: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.3)',
      stagger: 0.2 // 여러 엘리먼트를 시차를 두고 애니메이션
    });
  }, { scope: containerRef, dependencies: [toggle] });

  const codeString = `// ❌ 잘못된 코드 (기존 React 방식)
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const BadExample = () => {
  // 문제 1: React 18 StrictMode에서 useEffect가 2번 실행되어 애니메이션이 중첩/충돌함
  // 문제 2: 컴포넌트 언마운트 시 애니메이션이 메모리에 남아 릭 발생
  useEffect(() => {
    gsap.to('.box', { x: 100 });
  }, []);
};

// ✅ 올바른 코드 (@gsap/react 사용)
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

export const GoodExample = ({ stateValue }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 해결 1: 내부적으로 Context를 생성하여 Cleanup(kill) 자동 수행 (StrictMode 완벽 대응)
    // 해결 2: scope 설정으로 DOM 탐색 범위를 한정하여 타 컴포넌트 간섭 방지
    gsap.from('.box', { 
      rotation: 180, 
      opacity: 0, 
      stagger: 0.2 
    });
  }, { 
    scope: containerRef,        // 컨테이너 제한
    dependencies: [stateValue]  // stateValue 변경 시 자동 재실행 및 이전 애니메이션 정리
  });

  return (
    <div ref={containerRef}>
      <div className="box" />
      <div className="box" />
    </div>
  );
};`;

  return (
    <SamplePageLayout
      title="2. React에서 GSAP 사용법 (useGSAP Hook)"
      description="React 환경에서 기존 useEffect의 단점(StrictMode 더블 렌더링 충돌, Cleanup 누락 등)을 해결하기 위해 고안된 @gsap/react의 공식 useGSAP 훅 사용법입니다."
      learningPoints={[
        'React 18의 StrictMode 환경에서는 컴포넌트가 마운트 -> 언마운트 -> 마운트 과정을 거칩니다. 이 때 GSAP 애니메이션이 2번 중복 실행되는 꼬임 현상이 발생합니다.',
        'useGSAP 훅은 내부적으로 Context를 생성하여 컴포넌트 언마운트 시 발생된 모든 애니메이션과 스크롤 트리거를 자동으로 Kill(정리)합니다.',
        'scope 옵션을 지정하면 document.querySelectorAll 대신 지정한 Ref 내부에서만 요소를 탐색합니다. (CSS Modules나 styled-components와 찰떡궁합)',
        'dependencies 옵션에 상태값(state)을 넣으면, 상태 변경 시 이전 애니메이션을 깔끔히 죽이고 새롭게 애니메이션을 시작합니다.'
      ]}
      whyImportant="GSAP을 React 실무에 도입할 때 가장 많이 겪는 버그가 '애니메이션이 안 멈추고 계속 중첩돼서 이상하게 날아다녀요!' 입니다. useGSAP 하나만 올바르게 써도 이러한 버그의 99%를 예방할 수 있습니다."
    >
      <StyledCard>
        <div style={{ marginBottom: '20px' }}>
          <StyledButton onClick={() => setToggle(!toggle)}>
            상태 변경 (애니메이션 재실행 트리거)
          </StyledButton>
          <span style={{ marginLeft: '15px', color: 'gray' }}>
            현재 상태: {toggle ? 'True' : 'False'}
          </span>
        </div>

        <BoxContainer ref={containerRef}>
          <Box className="box">Box 1</Box>
          <Box className="box">Box 2</Box>
          <Box className="box">Box 3</Box>
        </BoxContainer>

        <CodeViewer rawCode={codeString} language="tsx" filename="Gsap02_UseGsapHook.tsx" />
      </StyledCard>
    </SamplePageLayout>
  );
};
