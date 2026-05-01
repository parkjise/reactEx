// src/pages/styled/StyledGlobalSample.tsx
import React from 'react';
import styled from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { CodeViewer } from '../../components/CodeViewer';

const SampleContainer = styled.div`
  padding: 20px;
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: 8px;
`;

export const StyledGlobalSample: React.FC = () => {
  const globalStyleCode = `import { createGlobalStyle } from 'styled-components';
import { variables } from './variables';

export const GlobalStyle = createGlobalStyle\`
  /* 1. CSS Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* 2. Theme 변수 매핑 (CSS 변수로 변환) */
  :root {
    --background: \${({ theme }) => theme.colors.background};
    --surface: \${({ theme }) => theme.colors.surface};
    --primary: \${({ theme }) => theme.colors.primary};
    --text: \${({ theme }) => theme.colors.text};
    --border: \${({ theme }) => theme.colors.border};
    --spacing-md: \${variables.spacing.md};
  }

  /* 3. 기본 스타일 셋업 */
  body {
    font-family: 'Inter', -apple-system, sans-serif;
    background-color: var(--background);
    color: var(--text);
    line-height: 1.5;
  }

  a {
    color: var(--primary);
    text-decoration: none;
  }
\`;
`;

  return (
    <SamplePageLayout
      title="1. GlobalStyle / Reset 설정"
      description="styled-components의 createGlobalStyle을 사용하여 프로젝트 전체의 기본 스타일과 CSS 초기화(Reset)를 적용하는 실무 패턴입니다."
    >
      <StyledCard>
        <h3>GlobalStyle 적용의 핵심</h3>
        <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          실무에서는 <code>GlobalStyle</code>을 통해 단순히 margin/padding을 초기화하는 것을 넘어서,<br/>
          테마 시스템의 색상이나 공통 spacing 값을 <b>CSS 변수(:root)</b>로 등록하여,<br/>
          styled-components 외부(예: 일반 css 파일이나 인라인 스타일)에서도 테마 값을 접근할 수 있도록 구성합니다.
        </p>

        <SampleContainer>
          <h4>이 박스는 CSS 변수를 사용하여 스타일링 되었습니다.</h4>
          <p>var(--background), var(--border) 등이 사용됨</p>
        </SampleContainer>

        <div style={{ marginTop: '24px' }}>
          <CodeViewer 
            rawCode={globalStyleCode} 
            language="typescript" 
            filename="src/styles/GlobalStyle.ts"
          />
        </div>
      </StyledCard>
    </SamplePageLayout>
  );
};
