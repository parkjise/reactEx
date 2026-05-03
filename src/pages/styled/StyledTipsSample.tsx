// src/pages/styled/StyledTipsSample.tsx
import React from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { CodeViewer } from '../../components/CodeViewer';

const TipSection = styled.div`
  margin-bottom: 40px;
  
  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    
    &::before {
      content: '💡';
    }
  }

  p {
    line-height: 1.6;
    margin-bottom: 16px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const StyledTipsSample: React.FC = () => {
  const codeTip1 = `/* [설명]
styled 컴포넌트는 렌더링 함수 밖에 선언해야 합니다.
컴포넌트 내부에서 매 렌더마다 새 styled 컴포넌트를 만들면 성능 저하와 input focus loss 같은 문제가 생길 수 있습니다.
*/
// ❌ 잘못된 패턴 (컴포넌트 내부에 styled 선언)
const MyComponent = () => {
  // 렌더링 될 때마다 새로운 클래스가 생성되어 성능 저하 및 포커스 잃음 현상 발생
  const BadButton = styled.button\`color: red;\`;
  
  return <BadButton>클릭</BadButton>;
};

// ✅ 올바른 패턴 (컴포넌트 외부에 선언)
const GoodButton = styled.button\`color: red;\`;

const MyComponent = () => {
  return <GoodButton>클릭</GoodButton>;
};`;

  const codeTip2 = `/* [설명]
Transient props는 스타일 계산에만 쓰는 props가 실제 DOM 속성으로 내려가지 않게 막는 styled-components 문법입니다.
$ prefix를 붙이면 React unknown prop warning을 피하면서 타입 기반 스타일링을 유지할 수 있습니다.
*/
// ❌ DOM에 불필요한 props가 전달되어 React Warning 발생
const CustomBox = styled.div<{ isError: boolean }>\`
  color: \${({ isError }) => isError ? 'red' : 'black'};
\`;

// ✅ Transient props ($ prefix) 사용
// $ 기호를 붙이면 styled-components 내부에서만 소비되고 DOM으로 전달되지 않음
const CustomBox = styled.div<{ $isError: boolean }>\`
  color: \${({ $isError }) => $isError ? 'red' : 'black'};
\`;

<CustomBox $isError={true}>에러 박스</CustomBox>`;

  const codeTip3 = `/* [설명]
styled(Component)는 React Router Link나 외부 UI 컴포넌트를 기존 기능은 유지한 채 스타일만 확장할 때 사용합니다.
단, 대상 컴포넌트가 className을 루트 DOM에 전달해야 styled-components 스타일이 적용됩니다.
*/
// 기존 컴포넌트나 서드파티 라이브러리 컴포넌트 스타일 오버라이딩
import { Link } from 'react-router-dom';

// 컴포넌트를 styled() 함수로 감싸기
const StyledLink = styled(Link)\`
  text-decoration: none;
  color: \${({ theme }) => theme.colors.primary};
  font-weight: bold;
  
  &:hover {
    text-decoration: underline;
  }
\`;`;

  return (
    <SamplePageLayout
      title="20. styled-components 실무 팁 및 안티패턴"
      description="실무에서 styled-components를 다룰 때 자주 하는 실수(Anti-patterns)와 이를 해결하기 위한 모범 사례(Best Practices)를 정리했습니다."
    >
      <StyledCard>
        <TipSection>
          <h3>컴포넌트 렌더링 함수 외부에 선언하기</h3>
          <p>
            가장 흔한 실수 중 하나는 렌더링 함수 내부에 <code>styled</code> 컴포넌트를 선언하는 것입니다. 
            이렇게 하면 상태가 변경되어 리렌더링 될 때마다 완전히 새로운 컴포넌트로 인식되어 DOM에서 unmount 후 다시 mount 되기 때문에 
            <strong>성능 저하</strong>와 <strong>인풋 포커스 잃음(Focus loss)</strong> 현상이 발생합니다.
          </p>
          <CodeViewer rawCode={codeTip1} language="tsx" filename="Anti-pattern 1" />
        </TipSection>

        <TipSection>
          <h3>Transient Props ($ 기호) 사용하기</h3>
          <p>
            스타일링 목적으로만 사용하는 props가 HTML DOM의 표준 속성이 아닐 경우 (예: <code>isError</code>, <code>active</code> 등), 
            React는 브라우저 콘솔에 <code>Unknown prop warning</code> 경고를 출력합니다.
            styled-components v5.1부터 지원하는 <strong>Transient props (<code>$</code>)</strong>를 사용하면 DOM으로 속성이 전달되는 것을 막을 수 있습니다.
          </p>
          <CodeViewer rawCode={codeTip2} language="tsx" filename="Transient Props" />
        </TipSection>

        <TipSection>
          <h3>기존 컴포넌트 확장 (Extending Styles)</h3>
          <p>
            React Router의 <code>Link</code>나 외부 라이브러리 컴포넌트(UI 프레임워크 등)에 커스텀 스타일을 입히고 싶을 때는 
            <code>styled(Component)</code> 문법을 사용합니다. 단, 해당 컴포넌트가 내부적으로 <code>className</code> prop을 
            루트 DOM 엘리먼트에 전달하도록 구현되어 있어야 스타일이 정상적으로 적용됩니다.
          </p>
          <CodeViewer rawCode={codeTip3} language="tsx" filename="Extending Components" />
        </TipSection>
      </StyledCard>
    </SamplePageLayout>
  );
};
