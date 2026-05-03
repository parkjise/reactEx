// src/pages/styled/StyledPropsSample.tsx
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { SamplePageLayout } from '../../layouts/SamplePageLayout';
import { StyledCard } from '../../components/styled/StyledCard';
import { CodeViewer } from '../../components/CodeViewer';
import { StyledButton } from '../../components/styled/StyledButton';

// Props 기반 동적 스타일링 컴포넌트
const StatusBox = styled.div<{ status: 'idle' | 'active' | 'error' }>`
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-weight: 600;
  transition: all 0.3s ease;

  /* 다중 조건 분기 패턴 (Switch-case CSS) */
  ${({ status, theme }) => {
    switch (status) {
      case 'active':
        return css`
          background-color: ${theme.colors.success};
          color: white;
          transform: scale(1.02);
        `;
      case 'error':
        return css`
          background-color: ${theme.colors.error};
          color: white;
          border-left: 8px solid darkred;
        `;
      case 'idle':
      default:
        return css`
          background-color: ${theme.colors.surface};
          color: ${theme.colors.textMuted};
          border: 1px dashed ${theme.colors.border};
        `;
    }
  }}
`;

export const StyledPropsSample: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'active' | 'error'>('idle');

  const codeString = `/* [설명]
Props 기반 스타일링은 React 상태값이 곧 CSS 분기 기준일 때 사용합니다.
status, variant, selected 같은 값을 props로 넘기면 상태별 스타일을 컴포넌트 안에서 명확하게 표현할 수 있습니다.
*/
const StatusBox = styled.div<{ status: 'idle' | 'active' | 'error' }>\`
  padding: 20px;
  border-radius: 8px;
  transition: all 0.3s ease;

  \${({ status, theme }) => {
    switch (status) {
      case 'active':
        return css\`
          background-color: \${theme.colors.success};
          color: white;
        \`;
      case 'error':
        return css\`
          background-color: \${theme.colors.error};
          color: white;
        \`;
      default:
        return css\`
          background-color: \${theme.colors.surface};
        \`;
    }
  }}
\`;`;

  return (
    <SamplePageLayout
      title="5. Props 기반 동적 스타일 변경"
      description="컴포넌트로 전달받은 props의 값에 따라 CSS를 완전히 분기(switch)하여 다이나믹한 상태를 렌더링하는 실무 패턴입니다."
    >
      <StyledCard>
        <h3>현재 상태: {status.toUpperCase()}</h3>
        
        <StatusBox status={status}>
          {status === 'idle' && '대기 중입니다. 버튼을 눌러 상태를 변경해보세요.'}
          {status === 'active' && '활성화되었습니다! 성공적으로 작업이 수행 중입니다.'}
          {status === 'error' && '오류가 발생했습니다! 네트워크 연결을 확인하세요.'}
        </StatusBox>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
          <StyledButton onClick={() => setStatus('idle')} variant={status === 'idle' ? 'primary' : 'outline'}>Idle</StyledButton>
          <StyledButton onClick={() => setStatus('active')} variant={status === 'active' ? 'primary' : 'outline'}>Active</StyledButton>
          <StyledButton onClick={() => setStatus('error')} variant={status === 'error' ? 'primary' : 'outline'}>Error</StyledButton>
        </div>

        <CodeViewer rawCode={codeString} language="tsx" filename="Props Styling Pattern" />
      </StyledCard>
    </SamplePageLayout>
  );
};
